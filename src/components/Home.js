import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import Criminal from "./Criminal";

import fbi_seal from "../assets/fbi_seal.png";
import usabanner from "../assets/usabanner.png"
import usabanner2 from "../assets/usabanner2.png"
import justice from "../assets/justice.png"
import justiceright from "../assets/justiceright.png"

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
        <p>The Federal Bureau of Investigation needs your help to catch these threats to freedom!</p>
      </div>
        <div className="justiceBlind">
          <div className="sidebar panel">
          <img src={justice} />
          </div>
        </div>
        <div className="justiceBlind2">
          <div className="sidebar panel">
          <img src={justiceright} />
          </div>
        </div>
      
      <div style={{ width: "15rem" }} className="footer">
        <div className="banner">
          <img src={usabanner}/>
        </div>
        <div>
        <img src={usabanner2} style={{ width: "90rem"}} className="banner2"/>
        </div>
      </div>
    </div>
    
  )
}

export default Home


