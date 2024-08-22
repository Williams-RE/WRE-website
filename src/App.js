import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import config from "./config.js";
import LandingPage from "./components/LandingPage/LandingPage.js";
import BuyAHome from "./components/BuyAHome/BuyAHome.js";
import SellAHome from "./components/SellAHome/SellAHome.js";
import AboutUs from "./components/AboutUs/AboutUs.js";

function App() {
  const landingPageRef = useRef();
  const buyAHomeRef = useRef();
  const sellAHomeRef = useRef();
  const aboutUsRef = useRef();

  const [agents, setAgents] = useState({});

  useEffect(() => {
    getAgents();
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
      setAgents(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  return (
    <div class="main">
      <div class="background">
        <div class="content">
          <div ref={landingPageRef}>
            <LandingPage />
          </div>
          <div class="page" ref={buyAHomeRef}>
            <BuyAHome />
          </div>
          <div class="page" ref={sellAHomeRef}>
            <SellAHome />
          </div>
          <div class="page" ref={aboutUsRef}>
            <AboutUs agents={agents} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
