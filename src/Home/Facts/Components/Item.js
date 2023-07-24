"use client";
import React from "react";
import { CATEGORIES } from "../../../../data";
import { updateDoc, doc, getDocs, collection } from "firebase/firestore";
import { db } from "@/services/firebase";
import { useContext, useState, useEffect } from "react";
import FactsContext from "@/store/factsContext";
import { getColor } from "./Functions/getColor";
import { updateinteracts } from "./Functions/updateInteracts";

const Item = ({ fact }) => {
  const factsCtx = useContext(FactsContext);
  const [currentInteract, setCurrentInteract] = useState("");
  const [updating, setIsUpdating] = useState(false);
  const [votes, setVotes] = useState({
    votesInteresting: fact.votesInteresting,
    votesFalse: fact.votesFalse,
    votesMindblowing: fact.votesMindblowing,
  });
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  useEffect(() => {
    if (factsCtx.user) {
      const interactsRef = collection(
        doc(db, "interactions", factsCtx.user.uid),
        "intedFact"
      );

      try {
        getDocs(interactsRef).then((result) => {
          result.forEach((doc) => {
            if (doc.data()[fact.id]) {
              setCurrentInteract(doc.data()[fact.id]);
              return;
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

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
          style={
            "votesInteresting" === currentInteract.toString()
              ? { backgroundColor: "rgb(226, 204, 204)" }
              : null
          }
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesInteresting",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setCurrentInteract,
              e,
              setIsUpdating,
              currentInteract,
              setVotes
            );
          }}
        >
          👍 <strong>{votes.votesInteresting} </strong>
        </button>
        <button
          className="item__interact"
          style={
            "votesMindblowing" === currentInteract.toString()
              ? { backgroundColor: "rgb(226, 204, 204)" }
              : null
          }
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesMindblowing",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setCurrentInteract,
              e,
              setIsUpdating,
              currentInteract,
              setVotes
            );
          }}
        >
          🤯 <strong>{votes.votesMindblowing} </strong>
        </button>
        <button
          className="item__interact"
          style={
            "votesFalse" === currentInteract.toString()
              ? { backgroundColor: "red" }
              : null
          }
          disabled={updating}
          onClick={(e) => {
            updateinteracts(
              "votesFalse",
              updateDoc,
              doc,
              db,
              fact,
              factsCtx,
              setCurrentInteract,
              e,
              setIsUpdating,
              currentInteract,
              setVotes
            );
          }}
        >
          ⛔️ <strong>{votes.votesFalse} </strong>
        </button>
      </div>
    </li>
  );
};

export default Item;
