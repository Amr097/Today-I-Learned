"use client";

import React from "react";
import { CATEGORIES } from "../../../../data";
import { useEffect, useState } from "react";

const Item = ({
  id,
  text,
  source,
  category,
  votesInteresting,
  votesMindblowing,
  votesFalse,
  createdIn,
}) => {
  const getColor = (category) => {
    for (let item of CATEGORIES) {
      if (item.name === category) {
        return item.color;
      }
    }
  };

  return (
    <li className="item">
      <p className="item__text">
        {text}{" "}
        <a href={source} target="_blank" className="item__source">
          {" "}
          (Source)
        </a>
      </p>
      <div className="item__inter">
        <span
          className="item__tag"
          style={{ backgroundColor: getColor(category) }}
        >
          {category}
        </span>
        <button className="item__interact">
          👍 <strong>{votesInteresting} </strong>
        </button>
        <button className="item__interact">
          🤯 <strong>{votesMindblowing} </strong>
        </button>
        <button className="item__interact">
          ⛔️ <strong>{votesFalse} </strong>
        </button>
      </div>
    </li>
  );
};

export default Item;
