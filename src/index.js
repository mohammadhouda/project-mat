import React from "react";
import ReactDOM from "react-dom";
import "./components/index.css";
import App from "./App";

export { default as LoginForm } from "./components/LoginForm/LoginForm";
export { default as AdminPage } from "./components/AdminPage/AdminPage";
export { default as UserPage } from "./components/UserPage/UserPage";
export { default as Header } from "./components/Header/Header";
export { default as Footer } from "./components/Footer/Footer";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
