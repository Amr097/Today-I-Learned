"use client";
import { createContext, useState } from "react";
import { sortFacts } from "./functions/sortFacts";

const FactsContext = createContext({
  facts: [],
  userFilteredFacts: [],
  filterByCategory: (category) => {},
  setFacts: (facts) => {},
  loading: Boolean,
  setLoading: () => {},
  loadingSmall: Boolean,
  setLoadingSmall: () => {},
  updating: Boolean,
  isUpdating: () => {},
});

export function FactsContextProvider(props) {
  const [facts, setFacts] = useState([]);
  const [filteredFacts, setFilteredFacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSmall, setLoadingSmall] = useState(false);

  function filterByCategory(category, factss, sortMethod) {
    if (!category && !sortMethod) {
      setFilteredFacts(sortFacts(factss));
      return filteredFacts;
    } else if (sortMethod) {
      setFilteredFacts(factss);
    } else {
      const filteredFacts = facts.filter((fact) => fact.category === category);

      setFilteredFacts(sortFacts(filteredFacts));

      return filteredFacts;
    }
  }

  function setUserFacts(factss) {
    setFacts(sortFacts(factss));
  }

  const context = {
    userFacts: facts,
    userFilteredFacts: filteredFacts,
    filterFacts: filterByCategory,
    setFacts: setUserFacts,
    loading: loading,
    setLoading: setLoading,
    loadingSmall: loadingSmall,
    setLoadingSmall: setLoadingSmall,
  };
  return (
    <FactsContext.Provider value={context}>
      {props.children}
    </FactsContext.Provider>
  );
}

export default FactsContext;
