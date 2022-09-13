import React from "react";
import Criminal from "./Criminal.js"

function CriminalList({ items }) {

    const displayCriminals = items.map((criminal) => {
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