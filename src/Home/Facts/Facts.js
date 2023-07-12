"use client";
import React from "react";
import Item from "./Components/item";
import { v4 as uuidv4 } from "uuid";
import { docsFacts } from "@/services/firebase";
import { useState, useEffect } from "react";
import "./Facts.scss";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";

const Facts = () => {
  const factsCtx = useContext(FactsContext);

  const [totalFeedback, setTotalFeedback] = useState([]);

  useEffect(() => {
    docsFacts.then((result) => {
      factsCtx.setFacts(result);
      factsCtx.filterFacts(null);
    });
  }, []);

  const calcVotes = () => {
    // let factsRev = [];
    // let isCorrect = true;
    // facts.forEach((fact) => {
    //   const positiveFeedback = fact.votesInteresting + fact.votesMindblowing;
    //   const total = positiveFeedback - fact.votesFalse;
    //   ////////////////////////////
    //   const id = fact.id;
    //   ///////////////////////////
    //   const dateCreated = fact.createdIn.toDate();
    //   const currentDate = Date.now();
    //   const ageInSeconds = currentDate - dateCreated;
    //   const ageInDays = Math.floor(ageInSeconds / (1000 * 3600 * 24));
    //   /////////////////////////////
    //   if (positiveFeedback < fact.votesFalse) isCorrect = false;
    //   factsRev.push({
    //     upVotes: total,
    //     id: id,
    //     isCorrect: isCorrect,
    //     age: ageInDays,
    //   });
    // });
    // setTotalFeedback(factsRev);
    // console.log(totalFeedback);
  };

  return (
    <ul className="facts__container" onClick={calcVotes}>
      {factsCtx.userFilteredFacts.map((facts) => (
        <Item
          id={facts.id}
          text={facts.text}
          source={facts.source}
          category={facts.category}
          votesInteresting={facts.votesInteresting}
          votesMindblowing={facts.votesMindblowing}
          votesFalse={facts.votesFalse}
          createdIn={facts.createdIn}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
};

export default Facts;
