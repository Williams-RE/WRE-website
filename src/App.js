import { useState, useEffect } from "react";
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
import ListingsManager from "./components/ListingsManager.jsx";
import { Login } from "./components/Login.jsx";

function App() {
  const [agents, setAgents] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavBarDelay, setShowNavBarDelay] = useState(true);

  useEffect(() => {
    getAgents();
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  async function getAgents() {
    try {
      const response = await fetch(`${config.SERVER_URL}/api/v1/agents`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAgents(data);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <AppContent
        agents={agents}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        handleLogout={handleLogout}
        showNavBarDelay={showNavBarDelay}
      />
    </Router>
  );
}

function AppContent({
  agents,
  isLoggedIn,
  setIsLoggedIn,
  handleLogout,
  showNavBarDelay,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  console.log("location is ", location.pathname);

  return (
    <div className="main">
      {isHomePage ? (
        <NavBar
          showDelay={showNavBarDelay}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      ) : (
        <NavBar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          showDelay={false}
        />
      )}

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
      {isHomePage ? (
        <ModalButton showDelay={showNavBarDelay} />
      ) : (
        <ModalButton showDelay={false} />
      )}
    </div>
  );
}

export default App;
