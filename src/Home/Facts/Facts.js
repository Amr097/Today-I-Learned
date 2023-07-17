"use client";
import React from "react";
import Item from "./Components/item";
import { v4 as uuidv4 } from "uuid";
import "./Facts.scss";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";
import SpinnerSmall from "../Partials/SpinnerSmall";

const Facts = () => {
  const factsCtx = useContext(FactsContext);

  return (
    <ul className="facts__container">
      {factsCtx.loadingSmall && <SpinnerSmall />}
      {factsCtx.userFilteredFacts.map((fact) => (
        <Item fact={fact} key={uuidv4()} />
      ))}
      {factsCtx.userFilteredFacts.length > 0 ? (
        <p
          style={{
            color: "grey",
            fontSize: "1.6rem",
            backgroundColor: "transperant",
          }}
        >
          There are {factsCtx.userFilteredFacts.length} facts in the database,
          add your own NOW!
        </p>
      ) : (
        <p
          style={{
            color: "white",
            fontSize: "3rem",
            fontWeight: "bolder",
            backgroundColor: "transperant",
            fontFamily: "coiny",
            textAlign: "center",
          }}
        >
          NO FACTS FOR THIS CATEGORY YET! CREATE THE FIRST ONE ✌️
        </p>
      )}
    </ul>
  );
};

export default Facts;
