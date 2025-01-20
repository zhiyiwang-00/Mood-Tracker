import { useEffect, useState } from "react";

export function Profile() {
  const [moodData, setMoodData] = useState([]);
  const [overallMood, setOverallMood] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
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
    if (moodData.length > 0 && loggedInUser.mood_history?.length > 0) {
      const categoryCounts = {};

      loggedInUser.mood_history.flat().forEach((moodName) => {
        const matchingMood = moodData.find((mood) => mood.name === moodName);
        if (matchingMood) {
          const category = matchingMood.category;
          categoryCounts[category] = (categoryCounts[category] || 0) + 1;
        }
      });

      const mostOccurred = Object.entries(categoryCounts).reduce(
        (max, [category, count]) =>
          count > max.count ? { category, count } : max,
        { category: null, count: 0 }
      );

      setOverallMood(mostOccurred.category);
    }
  }, [moodData, loggedInUser.mood_history]);

  const allMoods = loggedInUser.mood_history.map((moodEntry) =>
    moodEntry.map((moodName) => {
      const matchingMood = moodData.find((mood) => mood.name === moodName);
      return matchingMood ? matchingMood : null;
    })
  );

  function clearMoodHistory() {
    const updatedMoodHistory = [];
    loggedInUser.mood_history = updatedMoodHistory;
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setOverallMood(null);
  }

  return (
    <div className="mainContainer">
      <div className="mood-history-display d-flex justify-content-between">
        <div>
          <p>Mood Log History</p>
          {allMoods.map((moodObjects, index) => (
            <div key={index}>
              {moodObjects.map((mood, moodIndex) =>
                mood ? (
                  <span key={moodIndex} title={mood.name} className="fs-3 m-2">
                    {mood.emoji}
                  </span>
                ) : null
              )}
            </div>
          ))}
        </div>
        <button id="clear_history" onClick={clearMoodHistory}>
          Clear Mood Log History
        </button>
      </div>
      <div className="affirmation-display">
        <p>
          Your overall mood has been:{" "}
          <span id="mood_overall">{overallMood || "Unknown"}</span>
        </p>
        <img
          id="affirmation_image"
          src="https://cdn.glitch.global/adbe5892-a5eb-4b05-b388-c0923bb80a52/The%20Introvert%E2%80%99s%20Guide%20to%20Avoiding%20People.png?v=1733472878376"
          alt="Positive affirmation"
        />
        <span>Affirmation quote</span>
      </div>
    </div>
  );
}
