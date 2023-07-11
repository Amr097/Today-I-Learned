//import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCF7P83GWJ6IERzelbrOCGtF04EimbiASY",
  authDomain: "share-a-fact.firebaseapp.com",
  projectId: "share-a-fact",
  storageBucket: "share-a-fact.appspot.com",
  messagingSenderId: "495291581425",
  appId: "1:495291581425:web:9dd3dab3d4c47712e53a50",
};

initializeApp(config);

const db = getFirestore();

const colRef = collection(db, "facts");

const docs = getDocs(colRef)
  .then((snapshot) => {
    let facts = [];
    snapshot.docs.forEach((doc) => {
      facts.push({ ...doc.data(), id: doc.id });
    });
    return facts;
  })
  .catch((err) => {
    return err.message;
  });

let result = docs.then((result) => {
  console.log(result);
});

export { result };
