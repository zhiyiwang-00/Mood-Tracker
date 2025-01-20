import { useState, useEffect } from "react";
import { MoodButtons } from "../components/moodButtons";

export function MoodSelector() {
  const [isLoading, setIsLoading] = useState(false);

  const [moodData, setMoodData] = useState([]);
  const [selectedMoods, setSelectedMoods] = useState([]);
  const [resetToggle, setResetToggle] = useState(false);
  const url = "https://troubled-fuchsia-crocodile.glitch.me";

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          url + "/moods"
        );
        const data = await response.json();
        setMoodData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };
    fetchMoodData();
  }, []);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  if (!loggedInUser) {
    window.location.href = "/";
  }

  const handleMoodSelection = (moods) => {
    setSelectedMoods(moods);
  };

  const submit = async () => {
    try {
      const moodNames = selectedMoods.map((mood) => mood.name);
      const updatedMoodHistory = loggedInUser.mood_history
        ? [...loggedInUser.mood_history, moodNames]
        : [moodNames];

      const updatedUser = {
        ...loggedInUser,
        mood_history: updatedMoodHistory,
      };

      const response = await fetch(
        url + `/affirmation_users/${loggedInUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mood_history: updatedMoodHistory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update mood history");
      }

      localStorage.setItem("user", JSON.stringify(updatedUser));

      setSelectedMoods([]);
      setResetToggle((prev) => !prev);
    } catch (error) {
      console.error("Error updating mood history:", error);
    }
  };

  const lastMoodEntry = loggedInUser.mood_history.length
    ? loggedInUser.mood_history[loggedInUser.mood_history.length - 1]
    : [];

  const lastMoodEmojis = lastMoodEntry.map((moodName) => {
    const matchingMood = moodData.find((mood) => mood.name === moodName);
    return matchingMood ? matchingMood.emoji : null;
  });

  return (
    <div className="mainContainer">
      <div id="container" className="d-flex flex-column justify-content-around">
        {isLoading ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <MoodButtons
            moodData={moodData}
            onMoodSelectionChange={handleMoodSelection}
            resetToggle={resetToggle}
          />
        )
        }
        <div>
          <p id="lastEntry" className="fs-4">
            Last mood entry: <span>{lastMoodEmojis.join(" ")}</span>
          </p>
        </div>
        <div className="d-flex flex-row justify-content-end">
          <button
            className="btn btn-dark rounded"
            onClick={submit}
            disabled={selectedMoods.length === 0}
          >
            Submit
          </button>
        </div>
      </div>
    </div >
  );
}
