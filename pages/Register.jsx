import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Register.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Successfully registered!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage(result.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("An error occurred!");
    }
  };

  return (
    <div className="auth-box">
      <h2>Register</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;