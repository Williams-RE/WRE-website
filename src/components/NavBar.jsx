import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ isLoggedIn, onLogout, showDelay }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [showNavBar, setShowNavBar] = useState(!showDelay);

  useEffect(() => {
    if (showDelay) {
      const initialTimer = setTimeout(() => {
        setShowNavBar(true);
      }, 4000);

      return () => clearTimeout(initialTimer);
    }
  }, [showDelay]);

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

  if (!showNavBar) {
    return null;
  }

  return (
    <nav className={`navbar ${showNavBar ? "fade-in" : ""}`}>
      {isMobile && (
        <button className="hamburger" onClick={toggleMenu}>
          ☰
          <span
            style={{
              fontWeight: "200",
              fontSize: "16px",
              position: "relative",
              top: "1.5px",
              paddingLeft: "3px",
            }}
          >
            Menu
          </span>
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
          to="/broker-fees"
          className="navigation-button"
          onClick={() => setIsMenuOpen(false)}
        >
          Broker Commission
        </Link>
        {!isMobile && <span className="separator">|</span>}
        <Link
          to="/resources"
          className="navigation-button"
          onClick={() => setIsMenuOpen(false)}
        >
          Resources
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

export default NavBar;
