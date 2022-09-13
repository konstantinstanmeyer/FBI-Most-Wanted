import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import CriminalList from "./CriminalList";
import ReportForm from './ReportForm';

function App() {
  const [isLightMode, setIsLightMode] = useState(false)
  const [criminalList, setCriminalList] = useState([])

  useEffect(() => {
    // fetch criminals from database
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCriminalList(data))
      .then((error) => {
        alert("Server is currently down.")
      });
<<<<<<< HEAD
  }, []);

<<<<<<< HEAD
  function handleAddSuspect(newSuspect){
    const updatedSuspectArray = [...criminalList, newSuspect];
    setPlants(updatedSuspectArray)
  }
=======

>>>>>>> 0d5769528bcb97fe8d91e926f5540ba1f2fe1244
=======
      setIsLightMode(!!localStorage.getItem("isLightMode"))
    }, []);
  
    useEffect(() => {
      localStorage.setItem("isLightMode", isLightMode)
    }, [isLightMode])
>>>>>>> 7edb32272ea5affa342877c6851dfd9ad6645337

  return (
    <Router>
      <div className={isLightMode? "light":"dark"}>
        <Header isLightMode={isLightMode} setIsLightMode={setIsLightMode}/>

        <Routes>
          <Route path="/" element={
            /* Home Page */
            <p>Home Page Not yet implemented</p>
          }/>
          <Route path="/search" element={
            /* "Most Wanted" page, search bar and a couple filters to browse the database */
            <CriminalList criminalList={criminalList} />
          }/>
          <Route path="/report" element={
            /* Form to add new members to the most wanted page */
            <ReportForm onAddSuspect={handleAddSuspect}/>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;