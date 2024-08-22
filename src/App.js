import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import config from "./config.js";
import LandingPage from "./components/LandingPage.jsx";
import BuyAHome from "./components/BuyAHome.jsx";
import SellAHome from "./components/SellAHome.jsx";
import AboutUs from "./components/AboutUs.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { ModalButton } from "./components/ModalButton.jsx";
import { Login } from "./components/Login.jsx";
import { BuyerBrokerTable } from "./components/BuyerBrokerTable.jsx";
import AddListing from "./components/AddListing.jsx";

function App() {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();
  const loginRef = useRef();
  const buyerCompRef = useRef();

  const [agents, setAgents] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAgents();
    const token = localStorage.getItem("token");
    console.log("token is ", token);
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  async function getAgents() {
    try {
      const response = await fetch(`${config.SERVER_URL}/get-agents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET",
          "Access-Control-Allow-Headers":
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("data is ", data);
      setAgents(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleListingAdded = () => {
    // Refresh the BuyerBrokerTable
    // You might want to implement a more efficient way to update the table
    // For simplicity, we're just forcing a re-render here
    setIsLoggedIn((prevState) => !prevState);
    setIsLoggedIn((prevState) => !prevState);
  };

  return (
    <div className="main">
      <NavBar
        scrollToLandingPage={() => scrollToRef(landingPageRef)}
        scrollToBuyAHome={() => scrollToRef(buyAHomeRef)}
        scrollToSellAHome={() => scrollToRef(sellAHomeRef)}
        scrollToAboutUs={() => scrollToRef(aboutUsRef)}
        scrollToBuyerBrokerCompensation={() => scrollToRef(buyerCompRef)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <div className="background">
        <div className="content">
          <div ref={landingPageRef}>
            <LandingPage />
          </div>
          <div className="page" ref={buyAHomeRef}>
            <BuyAHome />
          </div>
          <div className="page" ref={sellAHomeRef}>
            <SellAHome />
          </div>
          <div className="page" ref={aboutUsRef}>
            <AboutUs agents={agents} />
          </div>
          <div className="page" ref={loginRef}>
            {!isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <AddListing onListingAdded={handleListingAdded} />
            )}
          </div>
          <div className="page" ref={buyerCompRef}>
            <BuyerBrokerTable />
          </div>
        </div>
      </div>
      <ModalButton />
    </div>
  );
}

export default App;
