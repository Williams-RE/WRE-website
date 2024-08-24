import React, { useState, useEffect } from "react";
import "./LandingPage.css";

const LandingPage = () => {
  const [showInitialMessage, setShowInitialMessage] = useState(false);
  const [hideInitialMessage, setHideInitialMessage] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowInitialMessage(true);
    }, 1000);

    const startFadeOutTimer = setTimeout(() => {
      setHideInitialMessage(true);
    }, 3000);

    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 6000);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(startFadeOutTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

  return (
    <div className="landing-page-main">
      <div className="landing-page-heading">
        {!showWelcome ? (
          <h1
            className={`landing-page-slogan ${
              showInitialMessage ? "fade-in" : ""
            } ${hideInitialMessage ? "fade-out" : ""}`}
          >
            Find your dream home
          </h1>
        ) : (
          <h1 className={`company-name ${showWelcome ? "fade-in" : ""}`}>
            Williams Real Estates
          </h1>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
