export function sortFacts(filteredFacts) {
  if (filteredFacts.length === 0) {
    return [];
  }
  let feedbacks = {};
  for (let i = 0; i < filteredFacts.length; i++) {
    const positiveFeedback =
      filteredFacts[i].votesInteresting + filteredFacts[i].votesMindblowing;

    const total = positiveFeedback - filteredFacts[i].votesFalse;

    if (!feedbacks[total]) {
      feedbacks[total] = [filteredFacts[i]];
    } else {
      feedbacks[total].push(filteredFacts[i]);
    }
  }
  const feedbackValues = Object.keys(feedbacks);

  const sortedValues = feedbackValues.sort(function (a, b) {
    return b - a;
  });

  for (let i = 0; i < sortedValues.length; i++) {
    sortedValues[i] = feedbacks[sortedValues[i]];
  }

  return sortedValues.flat();
}
/////////////////////////////////////////////////////////////////////
export function sortBy(type, factsCtx) {
  if (factsCtx.userFilteredFacts.length === 0 || !type.target.value) {
    return [];
  }

  if (type.target.value === "Most recent") {
    sortByDate(type.target.value, factsCtx);
  }

  if (type.target.value === "Oldest") {
    sortByDate(type.target.value, factsCtx);
  }

  if (type.target.value === "Default") {
    factsCtx.setLoading(true);
    factsCtx.filterFacts("", factsCtx.userFilteredFacts);

    setTimeout(() => {
      factsCtx.setLoading(false);
    }, 250);
  }

  if (
    type.target.value === "Liked" ||
    type.target.value === "MindBlowing" ||
    type.target.value === "False"
  ) {
    sortByInteract(type.target.value, factsCtx.userFilteredFacts, factsCtx);
  }

  document.querySelector(".filter-category").value = "";
}

function sortByDate(type, factsCtx) {
  let dates = {};
  let sortedValues;

  for (let i = 0; i < factsCtx.userFilteredFacts.length; i++) {
    dates[factsCtx.userFilteredFacts[i].createdIn] =
      factsCtx.userFilteredFacts[i];
  }

  const arrValues = Object.keys(dates);

  if (type === "Most recent") {
    sortedValues = arrValues.sort(function (a, b) {
      return b - a;
    });
  } else if (type === "Oldest") {
    sortedValues = arrValues.sort(function (a, b) {
      return a - b;
    });
  }

  for (let i = 0; i < sortedValues.length; i++) {
    sortedValues[i] = dates[sortedValues[i]];
  }

  factsCtx.setLoading(true);
  factsCtx.filterFacts("", sortedValues, 1);

  setTimeout(() => {
    factsCtx.setLoading(false);
  }, 250);
}

function sortByInteract(type, facts, factsCtx) {
  let votes = {};

  if (type === "Liked") {
    facts.forEach((e) => {
      if (!votes[e.votesInteresting]) {
        votes[e.votesInteresting] = [e];
      } else {
        votes[e.votesInteresting].push(e);
      }
    });
  }

  if (type === "False") {
    facts.forEach((e) => {
      if (!votes[e.votesFalse]) {
        votes[e.votesFalse] = [e];
      } else {
        votes[e.votesFalse].push(e);
      }
    });
  }

  if (type === "MindBlowing") {
    facts.forEach((e) => {
      if (!votes[e.votesMindblowing]) {
        votes[e.votesMindblowing] = [e];
      } else {
        votes[e.votesMindblowing].push(e);
      }
    });
  }

  const voteValues = Object.keys(votes);

  const sortedValues = voteValues.sort(function (a, b) {
    return b - a;
  });

  for (let i = 0; i < sortedValues.length; i++) {
    sortedValues[i] = votes[sortedValues[i]];
  }

  factsCtx.setLoading(true);
  factsCtx.filterFacts("", sortedValues.flat(), 1);
  setTimeout(() => {
    factsCtx.setLoading(false);
  }, 250);
}
