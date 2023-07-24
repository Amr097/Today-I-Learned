import { collection, getDocs, doc } from "firebase/firestore";
import { db, auth, googleProvider } from "@/services/firebase";
import { googleLogin } from "@/Home/Header/Functions/auth";

export function viewBy(type, factsCtx) {
  if (factsCtx.user) {
    if (
      type.target.value === "All" &&
      factsCtx.userFacts.length !== factsCtx.userFilteredFacts.length
    ) {
      factsCtx.setLoading(true);
      factsCtx.filterFacts("", factsCtx.userFacts);
      setTimeout(() => {
        factsCtx.setLoading(false);
      }, 150);
    }

    if (type.target.value === "My Facts") {
      factsCtx.setLoading(true);
      const userPosts = factsCtx.userFacts.filter(
        (fact) => fact.authorId === factsCtx.user.uid
      );
      factsCtx.filterFacts("", userPosts);
      setTimeout(() => {
        factsCtx.setLoading(false);
      }, 150);
    }

    if (type.target.value === "Upvotes") {
      factsCtx.setLoading(true);
      const userRef = doc(db, "interactions", factsCtx.user.uid);
      const postsCollectionRef = collection(userRef, "intedFact");
      const querySnapshot = getDocs(postsCollectionRef)
        .then((result) => result.docs.map((doc) => doc.data()))
        .then((result) => {
          console.log(result);
          const userInteractedPosts = factsCtx.userFacts.filter((fact) =>
            result.some(
              (res) =>
                res[fact.id] === "votesInteresting" ||
                res[fact.id] === "votesMindblowing"
            )
          );

          factsCtx.filterFacts("", userInteractedPosts);
        });

      setTimeout(() => {
        factsCtx.setLoading(false);
      }, 150);
    }

    if (type.target.value === "Downvotes") {
      factsCtx.setLoading(true);
      const userRef = doc(db, "interactions", factsCtx.user.uid);
      const postsCollectionRef = collection(userRef, "intedFact");
      const querySnapshot = getDocs(postsCollectionRef)
        .then((result) => result.docs.map((doc) => doc.data()))
        .then((result) => {
          console.log(result);
          const userInteractedPosts = factsCtx.userFacts.filter((fact) =>
            result.some((res) => res[fact.id] === "votesFalse")
          );

          factsCtx.filterFacts("", userInteractedPosts);
        });

      setTimeout(() => {
        factsCtx.setLoading(false);
      }, 150);
    }
  } else {
    if (type.target.value && type.target.value !== "All") {
      try {
        googleLogin(auth, googleProvider);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
