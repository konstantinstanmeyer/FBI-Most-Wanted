import React, { useState, useEffect } from "react";
import CriminalList from "./CriminalList";

function App() {

  const [items, setItems] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  console.log(items)

  return (
    <div>
      <CriminalList items={items} />
    </div>
  )
}

export default App;
