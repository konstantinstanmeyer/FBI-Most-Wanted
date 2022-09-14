import React, { useState } from "react";
import Snake from "./Snake";

function Criminal({ criminal: { aliases, description, images, details, warning, reward, caution } }) {  
  const [game, setGame] = useState(null)

  let aliasesNode;
  if (aliases !== null) {
    aliasesNode = (
      <h3>{("Suspect" + aliases.length>1? "Aliases: " : "Alias: ") + aliases.map((alias)=>" " + alias) }</h3>
    ) 
  } else {
    aliasesNode = (
      <h3>Unknown Suspect</h3>
    )
  }

  let mugshot;
  if (images !== undefined) {
    mugshot = images[0].thumb
  }

  return (
    <div className="criminal panel">
      <div className="mugshot-container">
        <img src={mugshot} alt={aliases} />
      </div>

      <div>
        {aliasesNode}
        <h3>WARNING: {warning}</h3>
        <p>{caution}</p>
        <br/>
        <h3>{reward} reward</h3>

        <h4 className="detail-container">
          <p>Description: {description}</p>
          <p>{details}</p>
        </h4>

        <div className="criminal-buttons">
          <button onClick={()=>{
            setGame( <Snake texture="mugshot" suspectBounty="1000" suspectName="Name"
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