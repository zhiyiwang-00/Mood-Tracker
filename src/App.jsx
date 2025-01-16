//import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Startup } from "./pages/startupPage";
import { MoodSelector } from "./pages/moodSelectorPage";
// import { Profile } from "./pages/profilePage";
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Startup />} />
        <Route path="/moodSelector" element={<MoodSelector />} />
        {/* <Route path="/profile" element={<Profile />} />  */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App