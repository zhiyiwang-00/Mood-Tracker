import { useEffect, useState } from "react";

export function MoodButtons({ onMoodSelectionChange, resetToggle, moodData }) {
  const [selectedMoods, setSelectedMoods] = useState([]);

  useEffect(() => {
    onMoodSelectionChange(selectedMoods); 
  }, [selectedMoods]);

  useEffect(() => {
    setSelectedMoods([]);
    const inputs = document.querySelectorAll(".btn-check");
    inputs.forEach((input) => (input.checked = false));
  }, [resetToggle]);

  const handleToggleMood = (mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m.id !== mood.id));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center flex-wrap">
      {moodData.map((mood) => (
        <div id="box" key={mood.id}>
          <input
            id={`mood-${mood.id}`}
            type="checkbox"
            className="btn-check"
            onChange={() => handleToggleMood(mood)}
          />
          <label
            className="btn btn-light rounded-pill moodBtn py-3"
            htmlFor={`mood-${mood.id}`}
          >
            {mood.name} {mood.emoji}
          </label>
        </div>
      ))}
    </div>
  );
}
