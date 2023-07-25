"use client";
import React, { useEffect, useState, useContext } from "react";
import "./Header.scss";
import Form from "@/Home/Form/Form";
import { auth, googleProvider } from "@/services/firebase";
import { googleLogin, logout } from "./Functions/auth";
import FactsContext from "@/store/factsContext";

const Header = () => {
  const factsCtx = useContext(FactsContext);

  const handleLogin = async () => {
    try {
      await googleLogin(auth, googleProvider, factsCtx);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      factsCtx.setLoading(true);
      await logout(auth, factsCtx);
      setTimeout(() => {
        factsCtx.setLoading(false);
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <img src="/images/logo.png" alt="" className="logo" />
      <h1 className="header__title">today i learned</h1>

      {factsCtx.loading ? null : factsCtx.user ? (
        <>
          <button
            className="header__btn header__btn--second"
            onClick={handleLogout}
          >
            {" "}
            <p>Logout</p>{" "}
          </button>

          <input type="checkbox" name="" id="form" className="header__toggle" />

          <label htmlFor="form" className="header__btn header__btn--first">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 576 512"
            >
              <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
            </svg>
            <p>Write</p>
          </label>
        </>
      ) : (
        <button
          className="header__btn header__btn--second"
          onClick={handleLogin}
        >
          <p>Login</p>
        </button>
      )}
      <Form />
    </header>
  );
};

export default Header;
