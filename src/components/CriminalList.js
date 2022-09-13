import React from "react";
import Criminal from "./Criminal.js"

function CriminalList({ criminalList }) {

    console.log(criminalList)

    const displayCriminals = criminalList.map((criminal) => {
        return (
            <Criminal 
            key={criminal.url}
            criminal={criminal}
            />
        )
    })



  return (
  <div>
      {displayCriminals}
  </div>
  );
}

export default CriminalList