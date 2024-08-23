import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import config from "./config.js";
import LandingPage from "./components/LandingPage.jsx";
import AboutUs from "./components/AboutUs.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { ModalButton } from "./components/ModalButton.jsx";
import posthog from "posthog-js";
import ListingsManager from "./components/ListingsManager.jsx";
import { Login } from "./components/Login.jsx"; // New component to be created

function App() {
  const [agents, setAgents] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getAgents();
    const token = localStorage.getItem("token");
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  posthog.init(`${process.env.REACT_APP_POSTHOG_API_KEY}`, {
    api_host: "https://us.i.posthog.com",
    person_profiles: "always",
    loaded: (posthog) => {
      console.log("PostHog loaded successfully");
    },
  });

  return (
    <Router>
      <AppContent
        agents={agents}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
      />
    </Router>
  );
}

function AppContent({ agents, isLoggedIn, setIsLoggedIn, handleLogout }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  console.log("location is ", location.pathname);

  return (
    <div className="main">
      <NavBar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      {isHomePage ? (
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dnzzm3cnf/video/upload/v1724434526/WRE_Vid_1_k0gomq.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className="solid-background"></div>
      )}
      <div className="content-overlay">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs agents={agents} />} />
          <Route
            path="/listings"
            element={
              isLoggedIn ? (
                <ListingsManager
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/buyer-broker-compensation"
            element={
              <ListingsManager
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/login"
            element={
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/listings" />
              )
            }
          />
        </Routes>
      </div>
      <ModalButton />
    </div>
  );
}

export default App;
