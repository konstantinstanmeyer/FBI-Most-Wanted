import React from "react";
import Criminal from "./Criminal.js"

function CriminalList({ criminalList, setCriminalList }) {
    function yeet(criminal) {
        fetch(`http://localhost:3000/items/${criminal.id}`,{
            method: "DELETE"
        }).then(r=>r.json()).then((data)=>{
            setCriminalList(criminalList.filter((item)=>item.id!==criminal.id))
        })
    }
    function increaseBounty(criminal) {
        fetch(`http://localhost:3000/items/${criminal.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({bounty:parseInt(criminal.bounty)+1000})
        }).then(r=>r.json()).then((data)=>{
            setCriminalList(criminalList=> criminalList.map((item)=>{
                if (item.id===data.id) {
                    return data
                }
                return item
            }));
        })
    }

    const displayCriminals = criminalList.map((criminal) => {
        return (
            <Criminal 
                key={criminal.url}
                criminal={criminal}
                yeetSelf={()=>{yeet(criminal)}}
                increaseBounty={()=>{increaseBounty(criminal)}}
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