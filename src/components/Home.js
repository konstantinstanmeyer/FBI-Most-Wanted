import React, { useState, useEffect } from "react"
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function Home() {
   const [suspectList, setSuspectList] = useState([])
   const [index, setIndex] = useState(4)

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
         <div key={suspect.url}>
            <h3 className='sliderAlias'>{suspect.aliases ? suspect.aliases : "Unknown Suspect"}</h3>
            <p className='sliderDescription'>{suspect.description}</p>
            <p className='sliderReward'>{suspect.reward_text}</p>
            <img className='sliderImage' src={suspect.images[0].original} alt={suspect.aliases} />
         </div>
      )
    }) 

 return (

   
    <div className="home">
   <div className="fbiBanner" style={{ display: "flex", alignContent: "flex-end" }}>
    <h2  >FBI's Most Wanted</h2>
    </div>
    <div className="seal">
      <img style={{ width: 200, height: 200 }} src="https://www.fbi.gov/image-repository/fbi-seal.jpg/@@images/5f96981b-2468-4861-81a3-7a2db1de0fa1.jpeg" />
    </div>
    <div id="image-slider">
      <AliceCarousel autoPlay autoPlayInterval={3000} infinite items={displayCards}  keyboardNavigation disableDotsControls autoHeight autoWidth>
      </AliceCarousel>
    </div>
    <div id="select-menu">
      <div id="first">
         <img style={{ width: 500, height: 500 }} src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
      </div>
      <div id="second">
         <img style={{ width: 500, height: 500 }} src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
      </div>
      <div id="third">
         <img style={{ width: 500, height: 500 }} src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
      </div>
    </div>
    </div>
 )
}

export default Home


