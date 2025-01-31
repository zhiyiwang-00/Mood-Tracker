import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { LoadingSpinner } from "../components/loadingSpinner";
const url = "https://troubled-fuchsia-crocodile.glitch.me/affirmation_users";

const fetchData = async () => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

const registerUser = async (newUser) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "thisisaapikey",
    },
    body: JSON.stringify(newUser),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
}

export function Startup() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery("affirmation_users", fetchData);

  const mutation = useMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries("affirmation_users");
    },
  });

  const [ableToLogin, setAbleToLogin] = useState(false);

  async function handleUser() {
    if (localStorage.getItem("user") !== null) {
      let temp = JSON.parse(localStorage.getItem("user"));
      alert(`User ${temp.username} is logged in!`)
      return;
    }

    const usernameInput = document.getElementById("username").value.trim();;

    const user = data.find(user => user.username === usernameInput);

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      alert(`Welcome back, ${user.username}!`);

      setAbleToLogin(true);
    } else {
      const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
      const newUser = {
        id: newId,
        username: usernameInput,
        mood_history: []
      };

      try {
        await mutation.mutateAsync(newUser);

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

  if (isLoading) return <LoadingSpinner/>;

  if (error) return <p>Error: {error.message}</p>;

  if (ableToLogin) {
    window.location.href = "/profilePage";
  }

  return (
    <>
      <div className="login-window">
        <input type="text" placeholder="Enter your name" id="username" />
        <button type="submit" onClick={handleUser} id="startButton">Start</button>
      </div>
    </>
  );
};