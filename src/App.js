import './App.css';
import logo from './images/wre-logo.png';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
import FindAnAgent from './FindAnAgent/FindAnAgent';
import AboutUs from './AboutUs/AboutUs';
import "typeface-roboto";

function App() {
  return (
    <div class="main">
      
      <div class="background">
      </div>

      <div class="navigation-bar">
        
        <HashRouter>
          <nav class = "navigation">
            <NavLink activeClassName="selected-navlink" to="/">
              <img src={ logo } alt="logo" />
            </NavLink>
            <NavLink activeClassName="selected-navlink" to="/Buy">
              <span class="navlink-text">Buy a Home</span>
            </NavLink> 
            <NavLink activeClassName="selected-navlink" to="/Sell">
              <span class="navlink-text">Sell a Home</span>
            </NavLink>
            <NavLink activeClassName="selected-navlink" to="/FindAgent">
              <span class="navlink-text">Find an Agent</span>
            </NavLink> 
            <NavLink activeClassName="selected-navlink" to="/About">
              <span class="navlink-text">About Us</span>
            </NavLink>
          </nav>
          <div class="navigation-content">
            <Route exact path="/" component={ LandingPage } />
            <Route path="/Buy" component={ BuyAHome } />
            <Route path="/Sell" component={ SellAHome } />
            <Route path="/FindAgent" component={ FindAnAgent } />
            <Route path="/About" component={ AboutUs } />
          </div>
        </HashRouter>

      </div>

    </div>
  );
}

export default App;
