export function searchFact(text, factsCtx) {
  if (text.length === 0) {
    console.log("works");
    return;
  }

  factsCtx.setLoading(true);

  let factText = {};

  let facts = factsCtx.userFacts;

  let searchResult = [];

  for (let i = 0; i < facts.length; i++) {
    if (!factText[facts[i].text]) {
      factText[facts[i].text] = [facts[i]];
    } else {
      factText[facts[i].text].push(facts[i]);
    }
  }

  let textList = Object.keys(factText);
  for (let i = 0; i < textList.length; i++) {
    if (textList[i].toLowerCase().includes(text)) {
      searchResult.push(factText[textList[i]]);
    }
  }

  factsCtx.filterFacts("", searchResult.flat());

  setTimeout(() => {
    factsCtx.setLoading(false);
  }, 150);
}
