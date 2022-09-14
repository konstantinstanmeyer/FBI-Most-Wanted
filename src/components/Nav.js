import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/search">Most Wanted</Link>
        </li>
        <li>
          <Link to="/report">Report</Link>
        </li>
        <li>
          <Link to="/ticTacToe">TicTacToe</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav