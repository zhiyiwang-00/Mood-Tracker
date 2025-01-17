import { useEffect, useState } from "react";

export function Profile() {
  const [moodData, setMoodData] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [overallMood, setOverallMood] = useState(null);

  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    window.location.href = "/";
  }

  const url = "https://troubled-fuchsia-crocodile.glitch.me";

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await fetch(url + "/moods");
        const data = await response.json();
        setMoodData(data);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();
  }, []);

  useEffect(() => {      
    setMoodHistory(loggedInUser.mood_history);

    if (moodData && moodHistory) {
      const categoryCounts = {};

      moodHistory.flat().forEach((moodName) => {
        const matchingMood = moodData.find((mood) => mood.name === moodName);
        if (matchingMood) {
          const category = matchingMood.category;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });

      const mostOccurred = Object.entries(categoryCounts).reduce(
        (max, entry) => {
          const [category, count] = entry;
          return count > max.count ? { category, count } : max;
        },
        { category: null, count: 0 }
      );

      setOverallMood(mostOccurred.category);
    }
  }, [moodData, moodHistory, loggedInUser.mood_history]);

  async function updateMoodHistoryOnServer(updatedMoodHistory) {
    console.log(updatedMoodHistory);
    console.log(loggedInUser.id);

    try {
      const response = await fetch(
        url + `/affirmation_users/${loggedInUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mood_history: updatedMoodHistory }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update mood history on the server");
      }
    } catch (error) {
      console.error("Error updating mood history:", error);
    }
  }

  const allMoodEmojis = moodHistory.map((moodEntry) => {
    return moodEntry.map((moodName) => {
      const matchingMood = moodData.find((mood) => mood.name === moodName);
      return matchingMood ? matchingMood.emoji : null;
    });
  });

  function clearMoodHistory() {
    const updatedMoodHistory = [];
    setMoodHistory(updatedMoodHistory);
    loggedInUser.mood_history = updatedMoodHistory;
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    updateMoodHistoryOnServer(updatedMoodHistory);
  }

  return (
    <>
      <div className="mainContainer">
        <div className="mood-history-display d-flex justify-content-between">
          <div>
            <p>Mood Log History</p>
            {allMoodEmojis.length > 0 ? (
              allMoodEmojis.map((moodEmojis, index) => (
                <p key={index} className="fs-3">
                  {moodEmojis.join(" ") || "None"}
                </p>
              ))
            ) : (
              <p>No mood history found</p>
            )}
          </div>
          <button id="clear_history" onClick={clearMoodHistory}>
            Clear Mood Log History
          </button>
        </div>
        <div className="affirmation-display">
          <p>
            Your overall mood has been: <span id="mood_overall">{overallMood}</span>
          </p>
          <img
            id="affirmation_image"
            src="https://cdn.glitch.global/adbe5892-a5eb-4b05-b388-c0923bb80a52/The%20Introvert%E2%80%99s%20Guide%20to%20Avoiding%20People.png?v=1733472878376"
            alt="Positive affirmation"
          />
          <span>Affirmation quote</span>
        </div>
      </div>
    </>
  );
}
