import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import CriminalList from "./CriminalList";
import ReportForm from './ReportForm';
import Home from './Home';
import RockPaperScissor from './RockPaperScissor';

function App() {
  const [isLightMode, setIsLightMode] = useState(JSON.parse(localStorage.getItem("isLightMode")))
  const [criminalList, setCriminalList] = useState([])

  useEffect(() => {
    // fetch criminals from database
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCriminalList(data))
      .catch((error) => {
        alert("Server is currently down.")
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("isLightMode", isLightMode)
  }, [isLightMode])

  function handleAddSuspect(newSuspect){
    const updatedSuspectArray = [...criminalList, newSuspect];
   setCriminalList(updatedSuspectArray)
  }

  return (
    <Router>
      <div id="App" className={isLightMode? "light":"dark"}>
        <div id="page">
          <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>

          <Routes>
            <Route path="/" element={
              /* Home Page */
              <Home/>
            }/>
            <Route path="/search" element={
              /* "Most Wanted" page, search bar and a couple filters to browse the database */
              <CriminalList criminalList={criminalList} />
            }/>
            <Route path="/report" element={
              /* Form to add new members to the most wanted page */
              <ReportForm onAddSuspect={handleAddSuspect}/>
            }/>
            <Route path="/rockPaperScissor" element={
              /* Form to add new members to the most wanted page */
              <RockPaperScissor />
            }/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App