"use client";
import React, { useEffect, useState, useContext } from "react";
import "./Header.scss";
import Form from "@/Home/Form/Form";
import { auth, googleProvider } from "@/services/firebase";
import { googleLogin, logout } from "./Functions/auth";
import { onAuthStateChanged } from "firebase/auth";
import FactsContext from "@/store/factsContext";

const Header = () => {
  const factsCtx = useContext(FactsContext);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      factsCtx.setUser(currentUser);
    });

    console.log(factsCtx.user);

    return () => unsubscribe();
  }, [factsCtx.user]);

  const handleLogin = async () => {
    try {
      await googleLogin(auth, googleProvider, factsCtx);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(auth, factsCtx);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <img src="/images/logo.png" alt="" className="logo" />
      <h1 className="header__title">today i learned</h1>

      {!factsCtx.user && (
        <button className="header__btn" onClick={handleLogin}>
          <p>Log in</p>
        </button>
      )}

      {factsCtx.user && (
        <button className="header__btn" onClick={handleLogout}>
          <p>Log out</p>
        </button>
      )}

      <input type="checkbox" name="" id="form" className="header__toggle" />
      <label htmlFor="form" className="header__btn">
        <p>Share a fact</p>
      </label>
      <Form />
    </header>
  );
};

export default Header;
