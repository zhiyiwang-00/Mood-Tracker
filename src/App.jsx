//import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

import { Navbar } from "./components/navbar";
import { Startup } from "./pages/startupPage";

import { MoodSelector } from "./pages/moodSelectorPage";
import { Profile } from "./pages/profilePage";

import './App.css'
const queryClient = new QueryClient();

function App() {
  return (
    <>
    <BrowserRouter><QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Startup />} />
        <Route path="/moodSelector" element={<MoodSelector />} />
        <Route path="/profilePage" element={<Profile />} />  
      </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  
    </>
  )
}

export default App