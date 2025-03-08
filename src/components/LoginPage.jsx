import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/LoginPage.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const sampleUser = { email: "admin@gmail.com", password: "cii" };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === sampleUser.email && password === sampleUser.password) {
      setIsAuthenticated(true);
      navigate("/area-selection"); // Redirect to AreaSelection
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 id="Title">Flora Protector</h1>
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
