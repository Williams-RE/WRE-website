import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export const NavBar = ({ isLoggedIn, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      {isMobile && (
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      )}
      <div
        className={`navbar-content ${isMobile ? "mobile" : ""} ${isMenuOpen ? "open" : ""}`}
      >
        <Link
          to="/"
          className="navigation-button"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        {!isMobile && <span className="separator">|</span>}
        <Link
          to="/about"
          className="navigation-button"
          onClick={() => setIsMenuOpen(false)}
        >
          About Us
        </Link>
        {!isMobile && <span className="separator">|</span>}
        <Link
          to="/buyer-broker-compensation"
          className="navigation-button"
          onClick={() => setIsMenuOpen(false)}
        >
          Buyer Broker Compensation
        </Link>
        {!isMobile && <span className="separator">|</span>}
        {isLoggedIn ? (
          <button onClick={onLogout} className="navigation-button">
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="navigation-button"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};
