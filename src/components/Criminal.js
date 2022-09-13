import React from "react";

function Criminal({ criminal: { aliases, description, images, details, warning, reward, caution } }) {
  let aliasesNode;
  if (aliases !== null) {
    aliasesNode = (
      <h3>{(aliases.length>1? "Aliases: " : "Alias: ") + aliases}</h3>
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
        <h1>{warning}</h1>
        <h1>{reward}</h1>
        <h4 className="detail-container">

          <p>Description: {description}</p>
          <p>{details}</p>
          <p>{caution}</p>
        </h4>
      </div>

    </div>
  );
}

export default Criminal;