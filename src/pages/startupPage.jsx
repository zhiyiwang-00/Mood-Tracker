import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/affirmation_users"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // const data = await response.json();
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
  // const data = await response.json();
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

  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");

  async function searchUser(){
    const usernameInput = document.getElementById("user_name").value.trim();;

    const user = data.find(user => user.username === usernameInput);
    if(user){
      setUserId(user.id);
      setMessage("")
      alert(`Welcome back, ${user.username}!`);
    } else {
      const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;

      const newUser = {
        id: newId,
        username: usernameInput,
        affirmations: []
      };

      try {
        await mutation.mutateAsync(newUser);
        setMessage(`User "${newUser.username}" registered successfully with ID: ${newUser.id}!`);
        setUserId(null);
        alert(`Welcome, ${newUser.username}!`);
      } catch (error) {
        console.error(error);
        alert("Failed to register user");
      }
    }
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

    return (
        <>
        <div className="login-window">
          <input type="text" placeholder="Enter your name" id="user_name" />
          <br /><br />
          <button onClick={searchUser}>Start</button>
        </div>
        {userId && <p>User ID: {userId}</p>}
        {message && <p>{message}</p>}
        </> 
      );
};