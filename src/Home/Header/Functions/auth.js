import { signInWithRedirect, signOut } from "firebase/auth";

export function googleLogin(auth, googleProvider) {
  try {
    signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.log(error);
  }
}

export function logout(auth) {
  signOut(auth);
}
