import React from "react";
import { CATEGORIES } from "../../../../data";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";

const Item = ({ fact }) => {
  const factsCtx = useContext(FactsContext);
  const getColor = (category) => {
    return CATEGORIES.find((cat) => cat.name === category).color;
  };

  const updateinteracts = (type) => {
    const docRef = doc(db, "facts", fact.id);

    updateDoc(docRef, {
      [type]: fact[type] + 1,
    });

    const updatedFacts = () => {
      factsCtx.userFacts.forEach((f) =>
        f.id === fact.id ? (f[type] += 1) : f
      );
      return factsCtx.userFacts;
    };
    factsCtx.filterFacts("", [...updatedFacts()]);
  };

  return (
    <li className="item">
      <p className="item__text">
        {fact.text}{" "}
        <a href={fact.source} target="_blank" className="item__source">
          {" "}
          (Source)
        </a>
      </p>
      <div className="item__inter">
        <span
          className="item__tag"
          style={{ backgroundColor: getColor(fact.category) }}
        >
          {fact.category}
        </span>
        <button
          className="item__interact"
          onClick={() => {
            updateinteracts("votesInteresting");
          }}
        >
          👍 <strong>{fact.votesInteresting} </strong>
        </button>
        <button
          className="item__interact"
          onClick={() => {
            updateinteracts("votesMindblowing");
          }}
        >
          🤯 <strong>{fact.votesMindblowing} </strong>
        </button>
        <button
          className="item__interact"
          onClick={() => {
            updateinteracts("votesFalse");
          }}
        >
          ⛔️ <strong>{fact.votesFalse} </strong>
        </button>
      </div>
    </li>
  );
};

export default Item;
