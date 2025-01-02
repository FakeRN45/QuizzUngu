import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Room from "./Room/Room";
import AddFriend from "./components/AddFriend";
import QuizPage from "./pages/Quiz";
import { QuizProvider } from "./context/QuizContext";
import "../src/style/App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <QuizProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="auth-page">
          <h1 className="app-title">Quizz Ungu</h1>
          <div className="auth-container">
            <Routes>
              <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/home" element={<Home />} />
              <Route path="/room" element={<Room />} />
              <Route path="/addfriends" element={<AddFriend />} />
              <Route path="/quiz/:category" element={<QuizPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QuizProvider>
  );
}

export default App;