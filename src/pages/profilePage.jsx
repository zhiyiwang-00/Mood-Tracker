import { useEffect, useState } from "react";
import { useQuery } from "react-query";

// const url = "https://troubled-fuchsia-crocodile.glitch.me";

const fetchMoodData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/moods"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const fetchAffirmationData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/affirmations"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


export function Profile() {
  const [overallMood, setOverallMood] = useState(null);
  const [affirmationQuote, setAffirmationQuote] = useState(null);
  const [affirmationImg, setAffirmationImg] = useState(null);

  const { data: moodData, isLoading: moodIsLoading, error: moodError } = useQuery("moods", fetchMoodData);
  const { data: affData, isLoading: affIsLoading, error: affError } = useQuery("affirmations", fetchAffirmationData);


  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    window.location.href = "/";
  }

  useEffect(() => {
    if (moodData && loggedInUser.mood_history?.length > 0) {
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

  useEffect(() => {
    if (overallMood && affData) {
      const affirmation = affData.find((affirmation) => affirmation.category === overallMood);
      if (affirmation) {
        const randomIndex = Math.floor(Math.random() * affirmation.quotes.length);
        setAffirmationQuote(affirmation.quotes[randomIndex]);
        setAffirmationImg(affirmation.image);
      }
    }
  }, [affData, overallMood]);

  const allMoods = loggedInUser.mood_history?.map((moodEntry) =>
    moodEntry.map((moodName) => {
      const matchingMood = moodData?.find((mood) => mood.name === moodName);
      return matchingMood ? matchingMood : null;
    })
  );

  async function updateMoodHistoryOnServer(updatedMoodHistory){
    try {
        const response = await fetch(`https://troubled-fuchsia-crocodile.glitch.me/affirmation_users/${loggedInUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({mood_history: updatedMoodHistory }),
        });
        if (!response.ok) {
            throw new Error('Failed to update mood history on the server');            
        }
    } catch (error) {
        console.error('Error updating mood history:', error);
    }
}
  function clearMoodHistory() {
    const updatedMoodHistory = [];
    loggedInUser.mood_history = updatedMoodHistory;
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    updateMoodHistoryOnServer(updatedMoodHistory);
    setOverallMood(null);
  }

  if (moodIsLoading || affIsLoading) return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-secondary" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
  if (moodError || affError)
    return <p>Error: {moodError ? moodError.message : affError.message}</p>;

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
        {overallMood && (
          <>
            <p>
              Your overall mood has been: <span id="mood_overall">{overallMood || "Unknown"}</span>
            </p>
            {affirmationImg && (
              <img
                id="affirmation_image"
                src={affirmationImg}
                alt={`${overallMood} affirmation`}
              />
            )}
            <br />
            <span>{affirmationQuote}</span>
          </>
        )}
      </div>
    </div>
  );
}
