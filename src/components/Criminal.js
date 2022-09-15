import React, { useState } from "react";
import Snake from "./Snake";

function Criminal({ criminal: { name, bounty, crimeDesc, suspectDesc, mugshot, id }, yeetSelf, increaseBounty, hideHuntBounty }) {
  const [game, setGame] = useState(null)

  let parsedMugshot = mugshot;
  if (mugshot === "") {
    parsedMugshot = "https://cdn.modrinth.com/placeholder.svg"
  }


  let huntBountyButton;
  huntBountyButton = (<button onClick={()=>{
      setGame( <Snake texture={parsedMugshot} suspectBounty={bounty} suspectName={name}
                success={()=>{yeetSelf()}}
                failure={()=>{increaseBounty()}}
                close={()=>{setGame(null) }}
      />)}}>
      Hunt Bounty
    </button>)

  return (
    <div className="criminal panel">
      <div className="mugshot-container">
        <img src={parsedMugshot} alt={`${name}`}/>
      </div>

      <div>
        <div className="detail-container">
          <h3><strong>Suspect: </strong> {name}</h3>
          <h3>${(parseInt(bounty)).toLocaleString('en-US', {useGrouping: true})} bounty</h3>
          <p><strong>Description of Suspect: </strong>{suspectDesc}</p>
          <br/>
          <p><strong>Description of Crime: </strong>{crimeDesc}</p>
        </div>

        <div className={"criminal-buttons" + (hideHuntBounty === undefined? "" : " hidden")}>
          {huntBountyButton}
          <a href={`/rockPaperScissor?=${id}`}>
            <button>
              get ready to <strong>RUMBLE</strong>
            </button>
          </a>
        </div>
        {game}
      </div>

    </div>
  );
}
export default Criminal