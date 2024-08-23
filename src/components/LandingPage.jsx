import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Fade in the initial message after a short delay
    const initialTimer = setTimeout(() => {
      setShowInitialMessage(true);
    }, 1000);

    // Show the welcome message after 4 seconds
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 8000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <div className="landing-page-main">
      <div className="landing-page-heading">
        {!showWelcome ? (
          <h1
            className={`landing-page-slogan ${showInitialMessage ? "fade-in" : "hidden"}`}
          >
            Find your dream home
          </h1>
        ) : (
          <div className="welcome-text fade-in">
            {/* <h2 className="welcome-to"></h2> */}
            <h1 className="company-name">Williams Real Estates</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
