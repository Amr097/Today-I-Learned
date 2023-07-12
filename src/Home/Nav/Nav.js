"use client";
import React from "react";
import "./Nav.scss";
import { CATEGORIES } from "../../../data";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";

const Nav = () => {
  const factsCtx = useContext(FactsContext);
  return (
    <navbar className="navegory">
      <button
        className="navegory__btn"
        onClick={() => {
          factsCtx.filterFacts(null);
        }}
      >
        All
      </button>
      {CATEGORIES.map((item) => (
        <button
          key={uuidv4()}
          className="navegory__btn"
          style={{ backgroundColor: item.color }}
          onClick={() => {
            factsCtx.filterFacts(item.name);
          }}
        >
          {item.name}
        </button>
      ))}
    </navbar>
  );
};

export default Nav;
