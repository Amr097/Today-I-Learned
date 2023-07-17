"use client";
import Facts from "@/Home/Facts/Facts";
import Header from "@/Home/Header/Header";
import Nav from "@/Home/Nav/Nav";
import { useContext, useEffect } from "react";
import { docsFacts } from "@/services/firebase";
import FactsContext from "@/store/factsContext";
import Spinner from "@/Home/Partials/Spinner";
import { sortBy } from "@/store/functions/sortFacts";

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
        factsCtx.setLoading(false);
      });
  }, []);

  return (
    <div className="root">
      <Header />
      <main>
        <select
          name=""
          id=""
          className="filter-category"
          onChange={(e) => {
            sortBy(e, factsCtx);
          }}
        >
          <option value="">Sort by:</option>
          <option value="Default">Total interactions</option>
          <option value="MindBlowing">Most mind blowing</option>
          <option value="False">Most false</option>
          <option value="Liked">Most likes</option>
          <option value="Most recent">Most recent</option>
          <option value="Oldest">Oldest</option>
        </select>
        <Nav />
        {factsCtx.loading ? <Spinner /> : <Facts />}
      </main>
    </div>
  );
}
