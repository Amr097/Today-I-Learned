"use client";
import Facts from "@/Home/Facts/Facts";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { useContext, useEffect } from "react";
import { auth, docsFacts } from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
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
