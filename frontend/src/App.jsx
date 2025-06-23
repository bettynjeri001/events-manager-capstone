import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import RegisterForm from "./pages/RegisterForm";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {/* <Footer /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/admin-dashboard" element={<AdminDashboard/>} />
          <Route path="/organizer-dashboard" element={<OrganizerDashboard />} />
          
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;