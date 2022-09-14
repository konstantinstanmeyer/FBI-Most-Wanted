import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function Home({ isLightMode }) {

   const [suspectList, setSuspectList] = useState([])

   useEffect(() => {
      // fetch criminals from database
      fetch("http://localhost:3000/items")
        .then((response) => response.json())
        .then((data) => setSuspectList(data))
        .catch((error) => {
          alert("Server is currently down.")
        });
    }, []);

    const displayCards = suspectList.map((suspect) => {
      return (
         <div key={suspect.url} style={{ width: "auto", height: 500 }}>
            <h3 className='sliderAlias'>{suspect.aliases ? "Suspect:" : null } {suspect.aliases ? suspect.aliases[0] : "Unknown Suspect"}</h3>
            <h3 className='sliderReward'>{suspect.reward_text ? suspect.reward_text : "Any information provided leading to the arrest of a suspect is appreciated; no monetary reward"}</h3>
            <p className='sliderDescription'>{suspect.description.substring(0,800)}</p>
            <p className='sliderDetails' style={{width: 600, float: "left"}}>{suspect.details ? suspect.details.substring(0,800) + "..." : suspect.caution.substring(0,800) + "..." }
            </p>
            <img style={{ width: 250, height: 250, float: "right", objectFit: "contain" }} className='sliderImage' src={suspect.images[0].original === "https://www.fbi.gov/wanted/seeking-info/lapsus/@@images/image" ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6I_WXH_i53QhjIgv7M1XN1nGB6a7tly63Cftrucc&s" : suspect.images[0].original} alt={suspect.aliases} />
         </div>
      )
    }) 

 return (

   
    <div className="home">
   <div className="topElements" style={{ display: "flex", position: "absolute", flexDirection: "column", marginRight: 900, top: 10, right: -850 }}>
   <div className="fbiBanner" >
    <h2>FBI's Most Wanted</h2>
    </div>
    <div className="slogan">
      <h3>JUSTICE NEVER SLEEPS</h3>
    </div>
    <div className="slogan2">
    <h4>AND IT NEEDS YOUR HELP</h4>
    </div>
    <div className="seal">
      <img style={{ width: 200, height: 200 }} src={isLightMode ? "https://www.fbi.gov/image-repository/fbi-seal.jpg/@@images/5f96981b-2468-4861-81a3-7a2db1de0fa1.jpeg" : "https://www.fbi.gov/wanted/seeking-info/lapsus/@@images/image"} />
    </div>
    </div>
    <div className="image-slider" style={{ width: "auto", height: "auto" }}>
      <AliceCarousel autoPlay autoPlayInterval={3000} infinite items={displayCards}  keyboardNavigation disableDotsControls >
      </AliceCarousel>
    </div>
    </div>
 )
}

export default Home


