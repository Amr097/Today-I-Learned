import React from "react";
import "./Header.scss";
import Form from "@/Home/Form/Form";

const Header = () => {
  return (
    <header className="header">
      <img src="/images/logo.png" alt="" className="logo" />
      <h1 className="header__title">today i learned</h1>

      <input type="checkbox" name="" id="form" className="header__toggle" />
      <label htmlFor="form" className="header__btn">
        <p>Share a fact</p>
      </label>
      <Form />
    </header>
  );
};

export default Header;
