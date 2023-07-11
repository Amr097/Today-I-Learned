import React from "react";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <img src="/images/logo.png" alt="" className="logo" />
      <h1 className="header__title">today i learned</h1>
      <button className="header__btn">Share a fact</button>
    </header>
  );
};

export default Header;
