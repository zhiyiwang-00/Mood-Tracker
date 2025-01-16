export function Navbar() {
    // const [count, setCount] = useState(0)
  
    return (
      <>
        {/* <div className="top-bar">
        <div className="title">Welcome to Mood Tracker 😁</div>
        {/* <div className="navigation">
          <a href="#table1">Table 1</a>
          <a href="#table2">Table 2</a>
          <a href="#table3">Table 3</a>
        </div> 
      </div>
      <div className="login-window">
        <input type="text" placeholder="Enter your name" />
        <br /><br />
        <button>Start</button>
      </div> */}
  
      <div className="nav-bar">
          <p className="title">Welcome to Mood Tracker 😁</p>
          <div className="navigation">
            {/* TODO: set startupPage as default page*/}
            <a href="/moodSelector" className="nav_table">Mood Selector</a>
            <a href="/profilePage" className="nav_table">Dean <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
</svg>
            </a> 
            <button id="logout_button">Logout</button> {/*Go back to startup page when click on*/}

      </div> 
      </div>
      </> 
    )
  }
  