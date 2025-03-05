import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/Nav/Navbar";
import Home from "./components/Pages/Home";
import Signup from "./components/UserAuth/Signup";
import Login from "./components/UserAuth/Login";
import ResetPassword from './components/UserAuth/ForgotPassword';
import ResendVerificationEmail from "./components/UserAuth/ResendVerificationEmail";
import ThemeContextProvider from "./components/themes/ThemeContext";
import Pricing from "./components/Pages/Pricing";
import Dashboard from "./components/userdetails/Dashboard";
import Profile from "./components/userdetails/Profile";
import GithubLogin from "./components/UserAuth/Git";
import Chatbot from "./components/chatbot/index1";
import Chatbotwithmemory from "./components/chatbot/index";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const userStatus = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token");
    const verified = localStorage.getItem("is_verified");
    return userStatus === "true" && token && verified === "true";
  });

  const handleLoginStatusChange = (status) => {
    setIsLoggedIn(status);
    localStorage.setItem("isLoggedIn", status);
  };

  return (
    <ThemeContextProvider>
      <Router>
        <ResponsiveAppBar isLoggedIn={isLoggedIn} setIsLoggedIn={handleLoginStatusChange} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={handleLoginStatusChange} />} />
          <Route path="/resendverifyemail" element={<ResendVerificationEmail />} />
          <Route path="/reset_password/:token" element={<ResetPassword />} />
          <Route path="/github-redirect" element={<GithubLogin setIsLoggedIn={handleLoginStatusChange} />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route
            path="/chat"
            element={isLoggedIn ? <Chatbotwithmemory /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </ThemeContextProvider>
  );
}

export default App;
