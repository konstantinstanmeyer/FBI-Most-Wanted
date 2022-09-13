import React from "react";
import Criminal from "./Criminal.js"
import '../CriminalList.css';


function CriminalList({ criminalList }) {

    const displayCriminals = criminalList.map((criminal) => {
        return (
            <Criminal 
            key={criminal.url}
            alias={criminal.aliases}
            description={criminal.description}
            image={criminal.images[0].original}
            details={criminal.details}
            warning={criminal.warning_message}
            reward={criminal.reward_text}
            caution={criminal.caution}
            missing={criminal.subjects}
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