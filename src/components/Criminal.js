import React from "react";

function Criminal({ alias, description, image, details, warning, reward, caution }) {


  return (
    <div className="criminal">
      <h1>Alias:{alias}</h1>
      <img src={image} alt={alias}/>
      <h1>{warning}</h1>
      <h1>{reward}</h1>  
      <h4 className="criminal-details">
      
        <li>Description: {description}</li>
        <li>{details}</li>
        <li>{caution}</li>
      </h4>
      
    </div>
  );
}

export default Criminal;