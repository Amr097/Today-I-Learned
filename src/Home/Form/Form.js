"use client";
import React from "react";
import { useRef, useState } from "react";
import { CATEGORIES } from "../../../data";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";
import { addFact } from "./Functions/addFact";

import "./Form.scss";

const Form = () => {
  const [factText, setFactText] = useState("");
  const [sourceText, setSourceText] = useState("");
  const [cat, setCatValue] = useState("");
  const factRef = useRef();
  const sourceRef = useRef();
  const factsCtx = useContext(FactsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    addFact(
      factText,
      sourceText,
      cat,
      factsCtx,
      setFactText,
      setSourceText,
      setCatValue
    );
  };

  return (
    <form action="POST" className="form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with this world..."
        ref={factRef}
        value={factText}
        maxLength="200"
        required
        onChange={() => {
          setFactText(factRef.current.value);
        }}
      />
      <span>{200 - factText.length}</span>
      <input
        type="url"
        placeholder="Trustworthy source.."
        ref={sourceRef}
        value={sourceText}
        required
        onChange={() => {
          setSourceText(sourceRef.current.value);
        }}
      />
      <select
        value={cat}
        required
        onChange={(e) => {
          setCatValue(e.target.value);
        }}
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
