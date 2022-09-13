import '../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';
import React, { useState, useEffect } from "react";
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

        <Switch>
          <Route path="/">
            {/* Home Page */}
          </Route>
          <Route path="/search">
            {/* "Most Wanted" page, search bar and a couple filters to browse the database */}
            <CriminalList items={criminalList} />
          </Route>
          <Route path="/report">
            {/* Form to add new members to the most wanted page */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;