import logo from '../assets/logo.svg';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Nav';

function App() {
  return (
    <Router>
      <div>
        <Nav/>

        <Switch>
          <Route path="/">
            {/* Home Page */}
          </Route>
          <Route path="/search">
            {/* "Most Wanted" page, search bar and a couple filters to browse the database */}
          </Route>
          <Route path="/report">
            {/* Form to add new members to the most wanted page */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
