"use client";
import { createContext, useState } from "react";

const FactsContext = createContext({
  facts: [],
  userFilteredFacts: [],
  filterByCategory: (category) => {},
  setFacts: (facts) => {},
});

export function FactsContextProvider(props) {
  const [facts, setFacts] = useState([]);
  const [filteredFacts, setFilteredFacts] = useState([]);

  function filterByCategory(category) {
    if (!category) {
      setFilteredFacts(facts);
    } else {
      const filteredFacts = facts.filter((fact) => fact.category === category);
      setFilteredFacts(filteredFacts);
    }
  }

  function setUserFacts(facts) {
    setFacts(facts);
  }

  const context = {
    userFacts: facts,
    userFilteredFacts: filteredFacts,
    filterFacts: filterByCategory,
    setFacts: setUserFacts,
  };
  return (
    <FactsContext.Provider value={context}>
      {props.children}
    </FactsContext.Provider>
  );
}

export default FactsContext;
