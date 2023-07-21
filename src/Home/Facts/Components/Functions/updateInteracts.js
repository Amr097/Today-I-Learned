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
  updating,
  currentInteract,
  setCurrentInteract
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
      isUpdating((prev) => !prev);
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

      const updatedFacts = () => {
        factsCtx.userFilteredFacts.forEach((f) =>
          f.id === fact.id ? (f[type] += 1) : f
        );

        return factsCtx.userFilteredFacts;
      };

      factsCtx.filterFacts("", [...updatedFacts()]);
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
            const updatedFacts = () => {
              factsCtx.userFilteredFacts.forEach((f) =>
                f.id === fact.id ? (f[type] -= 1) : f
              );

              return factsCtx.userFilteredFacts;
            };
            isUpdating((prev) => !prev);
            factsCtx.filterFacts("", [...updatedFacts()]);
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

        const updatedFacts = () => {
          factsCtx.userFilteredFacts.forEach((f) => {
            if (f.id === fact.id) {
              f[type] += 1;
              f[currentInteract] -= 1;
            }
          });

          return factsCtx.userFilteredFacts;
        };

        factsCtx.filterFacts("", [...updatedFacts()]);
      }
    }
  }
}
