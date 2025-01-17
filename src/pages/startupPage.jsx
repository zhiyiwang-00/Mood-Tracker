import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/affirmation_users"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const registerUser = async(newUser) => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/affirmation_users", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
}

export function Startup(){
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery("affirmation_users", fetchData); // 'moods' is the unique key for this query

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("affirmation_users");
    },
  });

  // const [userId, setUserId] = useState(null);
  // const [message, setMessage] = useState("");
  // const [moodHistory, setMoodHistory] = useState([]);
  const [ableToLogin, setAbleToLogin] = useState(false);

  async function handleUser(){
    if(localStorage.getItem("user") !== null){
      let temp = JSON.parse(localStorage.getItem("user"));
      alert(`User ${temp.username} is logged in!`)
      return;
    }

    const usernameInput = document.getElementById("username").value.trim();;

    const user = data.find(user => user.username === usernameInput);

    if(user){//if user exists
      // setUserId(user.id);
      // setMessage("")
      // setMoodHistory(user.mood_history);

      localStorage.setItem('user', JSON.stringify(user));
      alert(`Welcome back, ${user.username}!`);

      setAbleToLogin(true);
    } else { //else register new user
      const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
      const newUser = {
        id: newId,
        username: usernameInput,
        mood_history: []
      };

      try {
        await mutation.mutateAsync(newUser);

        // setMessage(`User "${newUser.username}" registered successfully with ID: ${newUser.id}!`);
        // setUserId(newUser.id);
        // setMoodHistory(newUser.mood_history);

        localStorage.setItem('user', JSON.stringify(newUser));
        alert(`Welcome, ${newUser.username}!`);

        setAbleToLogin(true);
      } catch (error) {
        console.error(error);
        alert("Failed to register user");
      }
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        document.getElementById("startButton").click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
  };
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if(ableToLogin){
    window.location.href = "/profilePage";
  }

    return (
        <>
        <div className="login-window">
          <input type="text" placeholder="Enter your name" id="username" />
          <br /><br />
          <button  type="submit" onClick={handleUser} id="startButton">Start</button>
        </div>
        {/* {userId && <p>User ID: {userId}</p>}
        
        {message && <p>{message}</p>}
        {moodHistory && <p>{moodHistory}</p>} */}
        </> 
      );
};