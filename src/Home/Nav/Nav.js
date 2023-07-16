"use client";
import React from "react";
import "./Nav.scss";
import { CATEGORIES } from "../../../data";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";
import { filterFacts } from "./Functions/FilterFacts";

const Nav = () => {
  const factsCtx = useContext(FactsContext);
  return (
    <navbar className="navegory">
      <button
        className="navegory__btn"
        onClick={() => {
          factsCtx.setLoading(true);
          factsCtx.filterFacts("", factsCtx.userFacts);
          setTimeout(() => {
            factsCtx.setLoading(false);
          }, 400);
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
            filterFacts(factsCtx, item);
          }}
        >
          {item.name}
        </button>
      ))}
    </navbar>
  );
};

export default Nav;
