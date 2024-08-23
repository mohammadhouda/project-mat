import React, { Fragment } from "react";
import logo from "../../assets/Images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <Fragment>
      <header className="header">
        <img src={logo} alt="Company Logo" className="logo-admin" />
        <h1 className="header-title">MANTEQ TRACKER</h1>
      </header>
    </Fragment>
  );
};

export default Header;
