"use client";
import React from "react";
import { CATEGORIES } from "../../../../data";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useContext, useState, useEffect } from "react";
import FactsContext from "@/store/factsContext";
import { getColor } from "./Functions/getColor";
import { updateinteracts } from "./Functions/updateInteracts";

const Item = ({ fact }) => {
  const factsCtx = useContext(FactsContext);
  const [updating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  return (
    <li className="item">
      <p className="item__text">
        {isDisputed ? (
          <span style={{ color: "red" }}> [⛔️DISPUTED!] </span>
        ) : null}
        {fact.text}
        <a href={fact.source} target="_blank" className="item__source">
          (Source)
        </a>
      </p>
      <div className="item__inter">
        <span
          className="item__tag"
          style={{ backgroundColor: getColor(CATEGORIES, fact.category) }}
        >
          {fact.category}
        </span>
        <button
          className="item__interact"
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesInteresting",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setIsUpdating,
              e,
              updating
            );
          }}
        >
          👍 <strong>{fact.votesInteresting} </strong>
        </button>
        <button
          className="item__interact"
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesMindblowing",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setIsUpdating,
              e,
              updating
            );
          }}
        >
          🤯 <strong>{fact.votesMindblowing} </strong>
        </button>
        <button
          className="item__interact"
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesFalse",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setIsUpdating,
              e,
              updating
            );
          }}
        >
          ⛔️ <strong>{fact.votesFalse} </strong>
        </button>
      </div>
    </li>
  );
};

export default Item;
