import { initializeApp } from "firebase/app";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIRE_BASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIRE_BASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIRE_BASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIRE_BASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIRE_BASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIRE_BASE_APP_ID,
};

const app = initializeApp(config);

const db = getFirestore();

const colRef = collection(db, "facts");

const docsFacts = getDocs(colRef)
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

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { docsFacts, colRef, db, auth, googleProvider, facebookProvider };
