"use client";
import Facts from "@/Home/Facts/Facts";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { useContext, useEffect } from "react";
import { docsFacts } from "@/services/firebase";
import FactsContext from "@/store/factsContext";
import Spinner from "@/Home/Partials/Spinner";

export default function Home() {
  const factsCtx = useContext(FactsContext);

  useEffect(() => {
    factsCtx.setLoading(true);

    docsFacts.then((result) => {
      factsCtx.setFacts(result);
      factsCtx.filterFacts(null, result);
    });
    factsCtx.setLoading(false);
  }, []);

  return (
    <div className="root">
      <Header />
      <main>
        <Nav />
        {factsCtx.loading ? <Spinner /> : <Facts />}
      </main>
    </div>
  );
}
