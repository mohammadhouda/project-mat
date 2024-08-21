import React, { useState } from "react";
import "./LoginForm.css";
import logo from "./logo.png";

const LoginForm = ({ onLogin }) => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(user, password);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <div className="title-container">
            <h1 className="h-title">Login Page</h1>
          </div>
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
          <div className="input-group">
            <label htmlFor="user">User</label>
            <input
              type="text"
              id="user"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="button-container">
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
