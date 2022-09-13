import '../App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './Nav';
import CriminalList from "./CriminalList";

function App() {

  const [criminalList, setCriminalList] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setCriminalList(data));
  }, []);

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
            <p>Reporting new Wanted Criminals is not yet implemented</p>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;