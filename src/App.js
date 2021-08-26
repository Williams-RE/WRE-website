import './App.css';
import logo from './images/wre-logo.png';
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";
// import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
// import FindAnAgent from './FindAnAgent/FindAnAgent';
import AboutUs from './AboutUs/AboutUs';

function App() {
  return (
    <div class="main">

      <img class="pull-right"
        src="https://www.userbenchmark.com/resources/img/wri/creatives/assets/flame.gif" alt = "fire">

      </img>
      
      <div class="background">
      </div>

      <div class="navigation-bar">
        
        <nav class = "navigation">
          <a href="">
            <img src={ logo } alt="logo" />
          </a>
          <a href="">
            <span class="navlink-text">Buy a Home</span>
          </a> 
          <a href="">
            <span class="navlink-text">Sell a Home</span>
          </a>
          <a href="">
            <span class="navlink-text">Find an Agent</span>
          </a> 
          <a href="">
            <span class="navlink-text">About Us</span>
          </a>
        </nav>

      </div>

      <BuyAHome />
      <SellAHome />
      <AboutUs />

    </div>
  );
}

export default App;
