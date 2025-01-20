import { useEffect, useState } from "react";


export function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const [moodData, setMoodData] = useState([]);
  const [overallMood, setOverallMood] = useState(null);
  const [affirmationQuote, setAffirmationQuote] = useState(null);
  const [affirmationImg, setAffirmationImg] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    window.location.href = "/";
  }

  const url = "https://troubled-fuchsia-crocodile.glitch.me";

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url + "/moods");
        const data = await response.json();
        setMoodData(data);
        setIsLoading(false);
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

  useEffect(() => {
    const fetchAffirmationData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url + "/affirmations");
        const data = await response.json();

        if (overallMood) {
          const affirmation = data.find((affirmation) => affirmation.category === overallMood);
          const randomIndex = Math.floor(Math.random() * affirmation.quotes.length);
          setAffirmationQuote(affirmation.quotes[randomIndex]);
          setAffirmationImg(affirmation.image);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchAffirmationData();
  }, [overallMood]);

  useEffect(() => {
    const fetchAffirmationData = async () => {
      try {
        const response = await fetch(url + "/affirmations");
        const data = await response.json();

        if (overallMood) {
          const affirmation = data.find(
            (affirmation) => affirmation.category === overallMood
          );
          const randomIndex = Math.floor(
            Math.random() * affirmation.quotes.length
          );
          setAffirmationQuote(affirmation.quotes[randomIndex]);
          setAffirmationImg(affirmation.image);
        }
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchAffirmationData();
  }, [overallMood]);

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
        {overallMood && (
          isLoading ? (
            <div className="spinner-border text-secondary" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            <>
              <p>
                Your overall mood has been: <span id="mood_overall">{overallMood || "Unknown"}</span>
              </p>
              <img
                id="affirmation_image"
                src={affirmationImg}
                alt={`${overallMood} affirmation`}
              />
              <br />
              <span>{affirmationQuote}</span>
            </>
          )
        )}
      </div></div>
      );

}
