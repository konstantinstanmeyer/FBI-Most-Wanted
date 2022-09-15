import { Link } from "react-router-dom";
import lightModeIcon from "../assets/sun.svg"
import darkModeIcon from "../assets/moon.svg"

function Header({isLightMode, setIsLightMode}) {
    return (
        <div id="header">
            <div id="logo">

            </div>

            <div id="page-links">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/search">Most Wanted</Link>
                    <Link to="/report">Report</Link>
                    <Link to="/rockPaperScissor">Rock-Paper-Scissor</Link>
                </nav>
            </div>

            <div id="user-controls">
                <button onClick={()=>{setIsLightMode(!isLightMode)}} title="Switch theme">
                    <img src={isLightMode? darkModeIcon: lightModeIcon} alt={isLightMode? "a moon": "a sun"}/>
                </button>
            </div>
        </div>
    )
}

export default Header