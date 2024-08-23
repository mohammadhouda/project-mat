import React, { useState } from "react";
import "./LoginForm.css";
import logo from "../../assets/Images/logo.png";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ userType, setUserType }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user === "admin" && password === "admin") {
      setUserType("admin");
      navigate("/admin");
    } else if (user === "user" && password === "user") {
      setUserType("user");
      navigate("/user");
    } else {
      setShowMessage(true);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="title-container">
          <h1>Login Page</h1>
        </div>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="input-group">
          <label htmlFor="user">User:</label>
          <input
            type="text"
            id="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={`message ${showMessage ? "show" : ""}`}>
          <p>Invalid credentials</p>
        </div>
        <div className="button-container">
          <a href="/forgot-password" className="forgot-password">
            Forgot Password?
          </a>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
