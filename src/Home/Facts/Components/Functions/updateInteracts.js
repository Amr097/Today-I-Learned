export function updateinteracts(
  type,
  updateDoc,
  doc,
  db,
  fact,
  factsCtx,
  isUpdating,
  e,
  updating
) {
  isUpdating(true);
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

  setTimeout(() => {
    isUpdating(false);
    factsCtx.filterFacts("", [...updatedFacts()]);
  }, 200);
}
