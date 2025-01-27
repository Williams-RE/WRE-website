import { useState, useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { AgentsProvider } from "./contexts/AgentContext.js";
import LandingPage from "./components/LandingPage.jsx";
import Video from "./components/Video.jsx";

// Lazy load components
const ListingsManager = lazy(() => import("./components/ListingsManager.jsx"));
const Login = lazy(() => import("./components/Login.jsx"));
const Resources = lazy(() => import("./components/Resources.jsx"));
const NavBar = lazy(() => import("./components/NavBar.jsx"));
const ModalButton = lazy(() => import("./components/ModalButton.jsx"));
const AboutUs = lazy(() => import("./components/AboutUs.jsx"));

function App() {
  console.log("React App is running");
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

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: -20,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

function AppContent({
  isLoggedIn,
  setIsLoggedIn,
  handleLogout,
  showNavBarDelay,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

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

      {isHomePage ? <Video /> : null}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className="content-overlay"
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Routes location={location}>
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
                path="/broker-fees"
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
          </Suspense>
        </motion.div>
      </AnimatePresence>

      {isHomePage ? (
        <ModalButton showDelay={showNavBarDelay} />
      ) : (
        <ModalButton showDelay={false} />
      )}
    </div>
  );
}

export default App;
