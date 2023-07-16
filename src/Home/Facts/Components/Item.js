import React from "react";
import { CATEGORIES } from "../../../../data";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";
import { getColor } from "./Functions/getColor";
import { updateinteracts } from "./Functions/updateInteracts";

const Item = ({ fact }) => {
  const factsCtx = useContext(FactsContext);

  return (
    <li className="item">
      <p className="item__text">
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
          onClick={() => {
            updateinteracts(
              "votesInteresting",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx
            );
          }}
        >
          👍 <strong>{fact.votesInteresting} </strong>
        </button>
        <button
          className="item__interact"
          onClick={() => {
            updateinteracts(
              "votesMindblowing",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx
            );
          }}
        >
          🤯 <strong>{fact.votesMindblowing} </strong>
        </button>
        <button
          className="item__interact"
          onClick={() => {
            updateinteracts("votesFalse", updateDoc, doc, db, fact, factsCtx);
          }}
        >
          ⛔️ <strong>{fact.votesFalse} </strong>
        </button>
      </div>
    </li>
  );
};

export default Item;
