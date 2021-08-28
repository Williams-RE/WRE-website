import './App.css';
import { useRef, useState } from 'react';
import logo from './images/wre-logo.png';
// import {
//   Route,
//   NavLink,
//   HashRouter
// } from "react-router-dom";
import LandingPage from './LandingPage/LandingPage';
import BuyAHome from './BuyAHome/BuyAHome';
import SellAHome from './SellAHome/SellAHome';
// import FindAnAgent from './FindAnAgent/FindAnAgent';
import AboutUs from './AboutUs/AboutUs';
import ContactForm from './ContactForm/ContactForm';



function App() {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();
  const [contactFormState, setContactFormState] = useState("display-none");

  function scrollToLandingPage() {
    landingPageRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToBuyAHome() {
    buyAHomeRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToSellAHome() {
    sellAHomeRef.current.scrollIntoView({ behavior: 'smooth'});
  }
  
  function scrollToAboutUs() {
    aboutUsRef.current.scrollIntoView({ behavior: 'smooth'});
  }

  function changeContactFormState(newState) {
    setContactFormState(newState);
  }

  return (
    <div class="main">

      <img class="pull-right"
        src="https://www.userbenchmark.com/resources/img/wri/creatives/assets/flame.gif" alt = "fire">
      </img>
      
      <div class="background">
      </div>

      <div class="navigation-bar">
        
        <nav class = "navigation">
          <button onClick={scrollToLandingPage}>
            <img src={ logo } alt="logo" />
          </button>
          <button onClick={scrollToBuyAHome}>
            <span class="navlink-text">Buy a Home</span>
          </button> 
          <button onClick={scrollToSellAHome}>
            <span class="navlink-text">Sell a Home</span>
          </button>
          <button onClick={scrollToAboutUs}>
            <span class="navlink-text">About Us</span>
          </button>
        </nav>

      </div>

      <div className={contactFormState}>
        <ContactForm changeContactFormState={changeContactFormState}/>
      </div>
      <div class="page">
        <button onClick={() => {changeContactFormState("show-contact-form")}}>
          Contact Us
        </button>
      </div>
      <div class="page" ref={landingPageRef}>
        <LandingPage />
      </div>
      <div class="page" ref={buyAHomeRef}>
        <BuyAHome />
      </div>
      <div class="page" ref={sellAHomeRef}>
        <SellAHome />
      </div>
      <div class="page" ref={aboutUsRef}>
        <AboutUs />
      </div>

    </div>
  );
}

export default App;
