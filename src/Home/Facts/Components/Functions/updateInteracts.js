import { setDoc, deleteDoc } from "firebase/firestore";
import { db, auth, googleProvider } from "@/services/firebase";
import { googleLogin } from "@/Home/Header/Functions/auth";

export async function updateinteracts(
  type,
  updateDoc,
  doc,
  dbs,
  fact,
  factsCtx,
  setCuurentInteract,
  e,
  updating,
  currentInteract,
  setVotes
) {
  if (!factsCtx.user) {
    try {
      googleLogin(auth, googleProvider);
    } catch (error) {
      console.log(err);
    }
  } else {
    const interactsRef = doc(
      db,
      "interactions",
      factsCtx.user.uid,
      "intedFact",
      fact.id
    );

    if (!currentInteract) {
      const docRef = doc(dbs, "facts", fact.id);
      const newInteraction = {
        [fact.id]: type,
      };

      updateDoc(docRef, {
        [type]: fact[type] + 1,
      });

      try {
        setDoc(interactsRef, newInteraction);
      } catch (error) {
        console.log(error);
      }

      setCuurentInteract(type);
      setVotes((prev) => {
        return { ...prev, [type]: prev[type] + 1 };
      });
    } else {
      if (type === currentInteract) {
        const docRef = doc(dbs, "facts", fact.id);

        updateDoc(docRef, {
          [type]: fact[type] - 1,
        });

        try {
          deleteDoc(
            doc(db, "interactions", factsCtx.user.uid, "intedFact", fact.id)
          ).then(() => {
            setCuurentInteract("");
            setVotes((prev) => {
              return { ...prev, [type]: prev[type] - 1 };
            });
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        const docRef = doc(dbs, "facts", fact.id);

        const currentInteraction = {
          [fact.id]: currentInteract,
        };

        updateDoc(docRef, {
          [currentInteract]: fact[currentInteract] - 1,
        });

        updateDoc(docRef, {
          [type]: fact[type] + 1,
        });

        try {
          updateDoc(interactsRef, {
            [fact.id]: type,
          });
        } catch (error) {
          console.log(error);
        }

        setCuurentInteract(type);
        setVotes((prev) => {
          return {
            ...prev,
            [type]: prev[type] + 1,
            [currentInteract]: prev[currentInteract] - 1,
          };
        });
      }
    }
  }
}
