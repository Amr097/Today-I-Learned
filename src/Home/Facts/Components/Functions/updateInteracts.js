export function updateinteracts(type, updateDoc, doc, db, fact, factsCtx) {
  const docRef = doc(db, "facts", fact.id);

  updateDoc(docRef, {
    [type]: fact[type] + 1,
  });

  const updatedFacts = () => {
    factsCtx.userFilteredFacts.forEach((f) =>
      f.id === fact.id ? (f[type] += 1) : f
    );
    return factsCtx.userFilteredFacts;
  };
  factsCtx.filterFacts("", [...updatedFacts()]);
}
