import React, { useState } from "react";
import Snake from "./Snake";

function Criminal({ criminal: { name, bounty, crimeDesc, suspectDesc, mugshot } }) {  
  const [game, setGame] = useState(null)

  let parsedMugshot = mugshot;
  if (mugshot === "") {
    parsedMugshot = "https://cdn.modrinth.com/placeholder.svg"
  }

  return (
    <div className="criminal panel">
      <div className="mugshot-container">
        <img src={parsedMugshot} alt={`${name}`}/>
      </div>

      <div>
        <div className="detail-container">
          <h3><strong>Suspect: </strong> {name}</h3>
          <h3>${bounty} bounty</h3>
          <p><strong>Description of Suspect: </strong>{suspectDesc}</p>
          <br/>
          <p><strong>Description of Crime: </strong>{crimeDesc}</p>
        </div>

        <div className="criminal-buttons">
          <button onClick={()=>{
            setGame( <Snake texture={parsedMugshot} suspectBounty={bounty} suspectName={name}
                      success={()=>{/* remove this criminal from the database */}}
                      failure={()=>{/* increase bounty by 1000 */}}
                      close={()=>{/* close game */}}
            />)}}>
            Hunt Bounty
          </button>
        </div>
        {game}
      </div>

    </div>
  );
}
export default Criminal