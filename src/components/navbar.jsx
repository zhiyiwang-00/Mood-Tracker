export function Navbar() {

  function logoutUser() {
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  let loggedInUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="nav-bar">
        <p className="title">Welcome to Mood Tracker 😁</p>
        {loggedInUser && (
            <div className="navigation">
              <a href="/moodSelector" className="nav_table">
                Mood Selector
              </a>
              <a href="/profilePage" className="nav_table">
                {loggedInUser ? loggedInUser.username : ""}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                </svg>
              </a>
              <button id="logout_button" onClick={logoutUser}>
                Logout
              </button>
            </div>
          )}
      </div>
    </>
  );
}
