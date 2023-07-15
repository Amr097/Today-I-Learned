"use client";
import React from "react";
import { useRef, useState } from "react";
import { CATEGORIES } from "../../../data";
import { v4 as uuidv4 } from "uuid";
import { addDoc } from "firebase/firestore";
import { colRef, docsFacts } from "@/services/firebase";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";

import "./Form.scss";

const Form = () => {
  const [factText, setFactText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [cat, setCatValue] = useState("");
  const [textLimit, setTextLimit] = useState("");
  const factRef = useRef();
  const sourceRef = useRef();
  const factsCtx = useContext(FactsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFact = {
      text: factText,
      source: sourceText,
      category: cat.toLowerCase(),
      votesInteresting: 0,
      votesMindblowing: 0,
      votesFalse: 0,
      createdIn: Date.now(),
    };

    addDoc(colRef, newFact).then(() => {
      factsCtx.setFacts([newFact, ...factsCtx.userFilteredFacts]);
      factsCtx.filterFacts("", [newFact, ...factsCtx.userFilteredFacts]);
    });

    setFactText("");
    setSourceText("");
    setCatValue("");
    document.querySelector("#form").checked = false;
  };

  return (
    <form action="POST" className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with this world.."
        ref={factRef}
        onChange={() => {
          setFactText(factRef.current.value);
          setTextLimit(200 - factText.length);
        }}
        value={factText}
        required
        maxLength="200"
      />
      <span>{200 - factText.length}</span>
      <input
        type="url"
        placeholder="Trustworthy source.."
        ref={sourceRef}
        onChange={() => {
          setSourceText(sourceRef.current.value);
        }}
        value={sourceText}
        ty
        required
      />
      <select
        value={cat}
        onChange={(e) => {
          setCatValue(e.target.value);
        }}
        required
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((category) => {
          return <option key={uuidv4()}>{category.name.toUpperCase()}</option>;
        })}
      </select>
      <button className="form__btn" type="submit">
        post
      </button>
    </form>
  );
};

export default Form;
