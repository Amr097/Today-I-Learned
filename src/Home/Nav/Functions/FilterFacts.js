export function filterFacts(factsCtx, item) {
  factsCtx.setLoading(true);
  const filteredFacts = factsCtx.filterFacts(item.name);

  filteredFacts.length > 0
    ? setTimeout(() => {
        factsCtx.setLoading(false);
      }, 400)
    : factsCtx.setLoading(false);
}
