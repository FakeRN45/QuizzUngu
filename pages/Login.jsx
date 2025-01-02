import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";

const Login = ({ setIsLoggedIn }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        localStorage.setItem("token", result.token); // Simpan token
        setMessage("Login successful!");
        setIsLoggedIn(true);
        setTimeout(() => navigate("/room"), 2000);
      } else {
        setMessage(result.message || "Incorrect username/password!");
      }
    } catch (error) {
      setMessage("An error occurred!");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;