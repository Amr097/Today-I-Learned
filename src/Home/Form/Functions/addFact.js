import { addDoc } from "firebase/firestore";
import { colRef } from "@/services/firebase";

export function addFact(
  factText,
  sourceText,
  cat,
  factsCtx,
  setFactText,
  setSourceText,
  setCatValue
) {
  const newFact = {
    text: factText,
    source: sourceText,
    category: cat.toLowerCase(),
    votesInteresting: 0,
    votesMindblowing: 0,
    votesFalse: 0,
    createdIn: Date.now(),
    authorId: factsCtx.user.uid,
  };

  factsCtx.setLoadingSmall(true);

  addDoc(colRef, newFact).then((f) => {
    newFact.id = f.id;
    factsCtx.setFacts([newFact, ...factsCtx.userFacts]);
    factsCtx.filterFacts("", [newFact, ...factsCtx.userFacts]);
    factsCtx.setLoadingSmall(false);
  });

  setFactText("");
  setSourceText("");
  setCatValue("");
  document.querySelector("#form").checked = false;
}
