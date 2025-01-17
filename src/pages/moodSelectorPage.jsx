import { useQuery } from "react-query";

const fetchData = async () => {
  const response = await fetch("https://troubled-fuchsia-crocodile.glitch.me/moods"); // Adjust the URL if needed
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
};

export function MoodSelector() {
  let loggedInUser = JSON.parse(localStorage.getItem("user"));
  if(!loggedInUser){
      window.location.href = "/";
  }


  const { data, isLoading, error } = useQuery("moods", fetchData); // 'moods' is the unique key for this query

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <div id="mainContainer">
        <div
          id="container"
          className="d-flex flex-column justify-content-around"
        >
          <div className="d-flex flex-row justify-content-center flex-wrap">
            {data.map((mood) => (
              <button key={mood.id} className="btn btn-light rounded-pill moodBtn">{mood.name} {mood.emoji}</button>
            ))}
          </div>
          <div>
            <p className="fs-4">
              Last mood entry: <span>😀😀😀</span>
            </p>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <button className="btn btn-dark rounded">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}
