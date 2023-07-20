"use client";
import Facts from "@/Home/Facts/Facts";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { useContext, useEffect } from "react";
import { auth, docsFacts, db } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import FactsContext from "@/store/factsContext";
import Spinner from "@/Home/Partials/Spinner";
import SortMenu from "@/Home/SortMenu/SortMenu";

export default function Home() {
  const factsCtx = useContext(FactsContext);

  useEffect(() => {
    factsCtx.setLoading(true);

    docsFacts
      .then((result) => {
        factsCtx.filterFacts(null, [...result]);
        factsCtx.setFacts([...result]);
      })
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          factsCtx.setUser(currentUser);
        });

        if (factsCtx.user) {
          const interactsRef = collection(
            doc(db, "interactions", factsCtx.user.uid),
            "intedFact"
          );

          let posts = [];

          try {
            getDocs(interactsRef).then((result) => {
              result.forEach((doc) => {
                posts.push(doc.data());
              });

              factsCtx.setUserPosts(posts);
            });
          } catch (error) {
            console.log(error);
          }
        }
        factsCtx.setLoading(false);
        return () => unsubscribe();
      });
  }, [factsCtx.user]);

  return (
    <div className="root">
      <Header factsCtx={factsCtx} />
      <main>
        <SortMenu factsCtx={factsCtx} />
        <Nav />
        {factsCtx.loading ? <Spinner /> : <Facts factsCtx={factsCtx} />}
      </main>
    </div>
  );
}
