import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
import AboutUs from "./components/AboutUs.jsx";
import { NavBar } from "./components/NavBar.jsx";
import { ModalButton } from "./components/ModalButton.jsx";
import ListingsManager from "./components/ListingsManager.jsx";
import { Login } from "./components/Login.jsx";
import { AgentsProvider } from "./contexts/AgentContext.js";
import Resources from "./components/Resources.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNavBarDelay, setShowNavBarDelay] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AgentsProvider>
      <Router>
        <AppContent
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          handleLogout={handleLogout}
          showNavBarDelay={showNavBarDelay}
        />
      </Router>
    </AgentsProvider>
  );
}

function AppContent({
  isLoggedIn,
  setIsLoggedIn,
  handleLogout,
  showNavBarDelay,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Create the performance observer.
  const po = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // Logs all server timing https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver/observedata for this response
      console.log("Server Timing", entry.serverTiming);
      console.log("entry is ", entry);
    }
  });

  // Start listening for `navigation` entries to be dispatched.
  po.observe({ type: "resource", buffered: true });

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
      ) : null}
      <div className="content-overlay">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
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
            path="/resources"
            element={
              <Resources
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
