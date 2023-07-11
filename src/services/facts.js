import { store } from "./firebase";

const getFacts = async () => {
  const factSnap = await store.collection("facts").get();
  console.log(factSnap);
};

export { getFacts };
