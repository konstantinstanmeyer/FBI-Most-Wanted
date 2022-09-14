import React from "react";

function Criminal({ criminal: { aliases, description, images, details, warning, reward, caution } }) {
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
      </div>

    </div>
  );
}
export default Criminal