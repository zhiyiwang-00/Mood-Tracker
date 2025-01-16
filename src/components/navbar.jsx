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
          <div className="title">Welcome to Mood Tracker 😁</div>
          <div className="navigation">
            {/* TODO: set startupPage as default page*/}
            <a href="/moodSelectorPage" className="nav_table">Mood Selector</a>
            <a href="/profilePage" className="nav_table">Dean</a> 
            <button className="logout_button">Logout</button> {/*Go back to startup page when click on*/}
      </div> 
      </div>
      </> 
    )
  }
  