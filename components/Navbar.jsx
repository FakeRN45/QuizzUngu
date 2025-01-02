import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [showEnterCodeModal, setShowEnterCodeModal] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleEnterCode = () => {
    setShowEnterCodeModal(false);
    console.log(`Joining game with code: ${code}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Quizz Ungu</div>
      <div className="navbar-links">
        {!isLoggedIn ? (
          <>
            <a onClick={() => navigate("/")}>Login</a>
            <a onClick={() => navigate("/register")}>Register</a>
          </>
        ) : (
          <>
            <a onClick={() => setShowEnterCodeModal(true)}>Enter Code</a>
            <a onClick={() => navigate("/room")}>Room</a>
            <a onClick={() => navigate("/profile")}>Profile</a>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>

      {showEnterCodeModal && (
        <div className="code-modal">
          <div className="modal-content">
            <h3>Enter Code</h3>
            <input
              type="text"
              className="code-input"
              placeholder="Enter Game Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button onClick={handleEnterCode}>Join Game</button>
            <button className="modal-close" onClick={() => setShowEnterCodeModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;