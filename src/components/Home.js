import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Criminal from "./Criminal";

import fbi_seal from "../assets/fbi_seal.png";

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

  const displayCards = suspectList.map((suspect) => <Criminal className="homeCriminal" criminal={suspect} hideHuntBounty="true"/>)
  return (
    <div className="home">
      <div className="image-slider panel">
        <AliceCarousel autoPlay autoPlayInterval={3000} infinite items={displayCards}  keyboardNavigation disableDotsControls >
        </AliceCarousel>
      </div>
      <div className="sidebar panel">
        <div className="fbiBanner"> <h2>FBI's Most Wanted</h2> </div>
        <div className="slogan"> <h3>JUSTICE NEVER SLEEPS<br/>AND IT NEEDS YOUR HELP</h3> </div>
        <div className="seal">
          <img style={{ width: "15rem" }} src={fbi_seal} alt="fbi seal"/>
        </div>
      </div>
    </div>
  )
}

export default Home


