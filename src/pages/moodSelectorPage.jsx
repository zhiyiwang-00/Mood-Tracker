import { MoodButtons } from "../components/moodButtons";
import { useState } from "react";

export function MoodSelector() {
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  if(!loggedInUser){
      window.location.href = "/";
  }


  const [selectedMoods, setSelectedMoods] = useState([]);
  const [submittedMoods, setSubmittedMoods] = useState([]);
  const [resetToggle, setResetToggle] = useState(false);

  const handleMoodSelection = (moods) => {
    setSelectedMoods(moods); 
  };

  const submit = () => {
    setSubmittedMoods(selectedMoods); 
    setSelectedMoods([]);
    setResetToggle((prev) => !prev); 
  };

  return (
    <div id="mainContainer">
      <div id="container" className="d-flex flex-column justify-content-around">
        <MoodButtons
          onMoodSelectionChange={handleMoodSelection}
          resetToggle={resetToggle} 
        />
        <div>
          <p className="fs-4">
            Last mood entry: <span>{selectedMoods.map((mood) => mood.emoji).join(" ") || "None"}</span>
          </p>
          <p id="moodEntry" className="fs-4">
            Mood entry: <span>{submittedMoods.map((mood) => mood.emoji).join(" ")}</span>
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
    </div>
  );
}
