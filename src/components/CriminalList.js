import React from "react";
import Criminal from "./Criminal.js"

function CriminalList({ criminalList }) {

    const displayCriminals = criminalList.map((criminal) => {
        return (
            <Criminal 
                key={criminal.url}
                criminal={criminal}
            />
        )
    })

  return (
  <div className="wrapper">
      {displayCriminals}
  </div>
  );
}

export default CriminalList