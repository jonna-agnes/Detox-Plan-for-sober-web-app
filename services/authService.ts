import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signUp = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log("Sign-up successful!");
  } catch (error: any) {
    console.error("Sign Up Error:", error.message);
  }
};

export const logIn = async (email: string, password: string): Promise<void> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful!");
  } catch (error: any) {
    console.error("Login Error:", error.message);
  }
};

export const logOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    console.log("Logout successful!");
  } catch (error: any) {
    console.error("Logout Error:", error.message);
  }
};
