import React from "react";
import '../Criminal.css';

function Criminal({ missing, alias, description, image, details, warning, reward, caution }) {

    const missingPerson = "Missing Persons"

  return (
    <div className="criminal-wrapper">
      <h1>Alias: {alias ? alias[0] : "Unknown Suspect"}</h1>
      <img className="image" src={image} alt={alias}/>
    </div>
  );
}

export default Criminal;

/*
  <h1>{warning}</h1>
      <h1>{reward}</h1>  
 <h4 className="criminal-details">
      
        <li>Description: {description}</li>
        <li>{details}</li>
        <li>{caution}</li>
      </h4>

*/