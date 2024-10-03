import { useState, useEffect, lazy, Suspense, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames="page"
          timeout={500} // Duration of the transition
        >
          <div className="content-overlay">
            <Suspense fallback={<div>Loading...</div>}>
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
          </div>
        </CSSTransition>
      </TransitionGroup>
      {isHomePage ? (
        <ModalButton showDelay={showNavBarDelay} />
      ) : (
        <ModalButton showDelay={false} />
      )}
    </div>
  );
}

export default App;
