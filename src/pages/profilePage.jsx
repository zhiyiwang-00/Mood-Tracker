import { useEffect, useState } from "react";

export function Profile(){
    let loggedInUser = JSON.parse(localStorage.getItem("user"));
    if(!loggedInUser){
        window.location.href = "/";
    }

    const [moodHistory, setMoodHistory] = useState([]);

    useEffect(() => {  
        if(loggedInUser){
            setMoodHistory(loggedInUser.mood_history);
        }
    }, []);

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

    async function updateMoodHistoryOnServer(updatedMoodHistory){
        console.log(updatedMoodHistory);
        console.log(loggedInUser.id);

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


    function clearMoodHistory(){
        const updatedMoodHistory = [];
        setMoodHistory(updatedMoodHistory);
        loggedInUser.mood_history = updatedMoodHistory;
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        updateMoodHistoryOnServer(updatedMoodHistory);
    }

    return (
        <>
        <div className="container">
            <div className="mood-history-display">
                <p>Mood Log History</p>
                <ul id="mood_history">
                    {/* <li>😪</li> */}
                </ul>
                <button id="clear_history" onClick={clearMoodHistory}>Clear Mood Log History</button>
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