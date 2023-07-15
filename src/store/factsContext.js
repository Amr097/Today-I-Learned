"use client";
import { createContext, useState } from "react";

const FactsContext = createContext({
  facts: [],
  userFilteredFacts: [],
  filterByCategory: (category) => {},
  setFacts: (facts) => {},
  loading: Boolean,
  setLoading: () => {},
});

export function FactsContextProvider(props) {
  const [facts, setFacts] = useState([]);
  const [filteredFacts, setFilteredFacts] = useState([]);
  const [loading, setLoading] = useState(true);

  function filterByCategory(category, factss) {
    if (!category) {
      setFilteredFacts(factss);
    } else {
      const filteredFacts = facts.filter((fact) => fact.category === category);
      setFilteredFacts(filteredFacts);
    }
  }

  function setUserFacts(factss) {
    setFacts(factss);
  }

  const context = {
    userFacts: facts,
    userFilteredFacts: filteredFacts,
    filterFacts: filterByCategory,
    setFacts: setUserFacts,
    loading: loading,
    setLoading: setLoading,
  };
  return (
    <FactsContext.Provider value={context}>
      {props.children}
    </FactsContext.Provider>
  );
}

export default FactsContext;
