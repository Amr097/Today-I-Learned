"use client";
import React from "react";
import Item from "./Components/item";
import { v4 as uuidv4 } from "uuid";
import "./Facts.scss";
import { useContext } from "react";
import FactsContext from "@/store/factsContext";

const Facts = () => {
  const factsCtx = useContext(FactsContext);
  //const [totalFeedback, setTotalFeedback] = useState([]);

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
  //factsCtx.userFilteredFacts
  return (
    <ul className="facts__container" onClick={calcVotes}>
      {factsCtx.userFilteredFacts.map((fact) => (
        <Item fact={fact} key={uuidv4()} />
      ))}
      {factsCtx.userFilteredFacts.length > 0 && (
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
      )}
    </ul>
  );
};

export default Facts;
