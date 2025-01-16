export function Profile(){
    return (
        <>
        {/* <h1>Login page</h1>
        <div className="login-window">
          <input type="text" placeholder="Enter your name" />
          <br /><br />
          <button>Start</button>
        </div> */}
        
        <div className="container">
            <div className="mood-history-display">
                <p>Mood Log History</p>
                <ul id="mood_history">
                    <li>😪</li>
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