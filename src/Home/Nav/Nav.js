import React from "react";
import "./Nav.scss";
import { CATEGORIES } from "../../../data";
import { v4 as uuidv4 } from "uuid";

const Nav = () => {
  return (
    <navbar className="navegory">
      <button className="navegory__btn">All</button>
      {CATEGORIES.map((item) => (
        <button
          key={uuidv4()}
          className="navegory__btn"
          style={{ backgroundColor: item.color }}
        >
          {item.name}
        </button>
      ))}
    </navbar>
  );
};

export default Nav;
