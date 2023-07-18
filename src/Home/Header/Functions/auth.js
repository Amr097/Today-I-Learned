import { signInWithPopup, signOut } from "firebase/auth";

export function googleLogin(auth, googleProvider, factsCtx) {
  signInWithPopup(auth, googleProvider);
}

export function logout(auth) {
  signOut(auth);
}
