import { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css";

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const hasCompletedInitialLoad = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hasCompletedInitialLoad.current) {
      hasCompletedInitialLoad.current = true;
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="app-shell">
        <PageLoader isLoading={isLoading} />
        <Navbar />

        <div className="route-container">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </AnimatePresence>
        </div>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App
