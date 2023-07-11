import React from "react";
import Item from "./Components/item";
import { initialFacts } from "../../../data";
import { v4 as uuidv4 } from "uuid";
import "./Facts.scss";

const Facts = () => {
  return (
    <ul className="facts__container">
      {initialFacts.map((item) => (
        <Item
          id={item.id}
          text={item.text}
          source={item.source}
          category={item.category}
          votesInteresting={item.votesInteresting}
          votesMindblowing={item.votesMindblowing}
          votesFalse={item.votesFalse}
          createdIn={item.createdIn}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
};

export default Facts;
