//import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Startup } from "./pages/startup";
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/startup" element={<Startup />} />
        {/* <Route path="/startup" element={<Startup />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}
export default App