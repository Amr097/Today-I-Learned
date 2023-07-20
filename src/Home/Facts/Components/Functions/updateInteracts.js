import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "@/services/firebase";
import { googleLogin } from "@/Home/Header/Functions/auth";

export async function updateinteracts(
  type,
  updateDoc,
  doc,
  dbs,
  fact,
  factsCtx,
  isUpdating,
  e,
  updating
) {
  if (!factsCtx.user) {
    googleLogin(auth, googleProvider, factsCtx);
  } else {
    isUpdating(true);
    const docRef = doc(dbs, "facts", fact.id);
    const newInteraction = {
      [fact.id]: type,
    };

    const interactsRef = doc(
      db,
      "interactions",
      factsCtx.user.uid,
      "intedFact",
      fact.id
    );

    try {
      const interactsSnap = await getDoc(interactsRef);
      console.log(interactsSnap.exists());
      if (interactsSnap.exists()) {
        deleteDoc(interactsRef).then(() => {
          console.log("Entire Document has been deleted successfully.");
        });
      } else {
        setDoc(interactsRef, newInteraction);
      }
    } catch (error) {
      console.log(error);
    }

    updateDoc(docRef, {
      [type]: fact[type] + 1,
    });

    const updatedFacts = () => {
      factsCtx.userFilteredFacts.forEach((f) =>
        f.id === fact.id ? (f[type] += 1) : f
      );

      return factsCtx.userFilteredFacts;
    };

    setTimeout(() => {
      isUpdating(false);
      factsCtx.filterFacts("", [...updatedFacts()]);
    }, 200);
  }
}
