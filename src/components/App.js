import '../App.css';
import React from 'react'

function App() {
  return (
    <>
      <div id="header">
        <div id="house">🏠</div>
        <p id="contact">Contact</p>
        <p id="help">Help</p>
        <h2>FBI most wanted</h2>
      </div>
      <div id="image-slider">
        <img id="image1" src="https://images.pexels.com/photos/5811066/pexels-photo-5811066.jpeg"/>
        <img src="https://www.fbi.gov/wanted/cei/cristian-rios-mora/@@images/image"/>
        <div id="suspect-info">
          <h4>Suspect</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>read more...</p>
        </div>
      </div>
      <div id="select-menu">
        <div id="first">
          <img src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
        </div>
        <div id="second">
          <img src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
        </div>
        <div id="third">
          <img src="https://gen3marketing.com/wp-content/uploads/2021/05/blue-circle.png"/>
        </div>
      </div>
    </>

  )
}

export default App;
