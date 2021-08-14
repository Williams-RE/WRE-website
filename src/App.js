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
            <NavLink to="/"><img src={ logo } alt="logo" /></NavLink>
            <h1><NavLink to="/Buy">Buy a Home</NavLink></h1> 
            <h1><NavLink to="/Sell">Sell a Home</NavLink></h1> 
            <h1><NavLink to="/FindAgent">Find an Agent</NavLink></h1> 
            <h1><NavLink to="/About">About Us</NavLink></h1>
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
