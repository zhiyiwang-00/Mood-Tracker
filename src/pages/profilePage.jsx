import { useEffect, useState } from "react";

export function Profile(){
    let loggedInUser = JSON.parse(localStorage.getItem("user"));
    if(!loggedInUser){
        window.location.href = "/";
    }

    const [moodHistory, setMoodHistory] = useState([]);

    // This useEffect runs once when the component mounts and sets the mood history state if the user is logged in
    useEffect(() => {  
        if(loggedInUser){
            setMoodHistory(loggedInUser.mood_history);
        }
    }, []);

    // This useEffect runs whenever the moodHistory state changes and updates the DOM with the new mood history
    useEffect(() => {
        const moodHistoryList = document.getElementById("mood_history");
        if(moodHistoryList){
            moodHistoryList.innerHTML = "";
            moodHistory.forEach(mood => {
                const li = document.createElement("li");
                li.textContent = mood;
                moodHistoryList.appendChild(li);
            });
        }
    }, [moodHistory]);

    return (
        <>
        <div className="container">
            <div className="mood-history-display">
                <p>Mood Log History</p>
                <ul id="mood_history">
                    {/* <li>😪</li> */}
                </ul>
                <button id="clear_history">Clear Mood Log History</button>
            </div>
            <div className="affirmation-display">
                <span>Your overall mood has been: <span id="mood_overall" style={{color: "white"}}>Positive</span></span>
                <br></br>
                <img id="affirmation_image" src="https://cdn.glitch.global/adbe5892-a5eb-4b05-b388-c0923bb80a52/The%20Introvert%E2%80%99s%20Guide%20to%20Avoiding%20People.png?v=1733472878376" alt="Positive affirmation" style={{width: "80%"}}/>
                <span></span>
            </div>
        </div>
   
        </> 
      )
};