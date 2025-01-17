import { useEffect, useState } from "react";
import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/moods");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
};

export function MoodButtons({ onMoodSelectionChange, resetToggle }) {
  const { data, isLoading, error } = useQuery("moods", fetchData);
  const [selectedMoods, setSelectedMoods] = useState([]);

  useEffect(() => {
    onMoodSelectionChange(selectedMoods); 
  }, [selectedMoods]);

  useEffect(() => {
    setSelectedMoods([]);
    const inputs = document.querySelectorAll(".btn-check");
    inputs.forEach((input) => (input.checked = false));
  }, [resetToggle]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleToggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m.id !== mood.id));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center flex-wrap">
      {data.map((mood) => (
        <div id="box" key={mood.id}>
          <input
            id={`mood-${mood.id}`}
            type="checkbox"
            className="btn-check"
            onChange={() => handleToggleMood(mood)}
          />
          <label
            className="btn btn-light rounded-pill moodBtn"
            htmlFor={`mood-${mood.id}`}
          >
            {mood.name} {mood.emoji}
          </label>
        </div>
      ))}
    </div>
  );
}
