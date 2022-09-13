import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import CriminalList from "./CriminalList";
import ReportForm from './ReportForm';

function App() {

  const [criminalList, setCriminalList] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCriminalList(data));
  }, []);

  function handleAddSuspect(newSuspect){
    const updatedSuspectArray = [...criminalList, newSuspect];
    setPlants(updatedSuspectArray)
  }

  return (
    <Router>
      <div>
        <Nav/>

        <Routes>
          <Route path="/" element={
            /* Home Page */
            <p>Home Page Not yet implemented</p>
          }/>
          <Route path="/search" element={
            /* "Most Wanted" page, search bar and a couple filters to browse the database */
            <CriminalList items={criminalList} />
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