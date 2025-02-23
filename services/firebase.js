// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Importing Firebase Storage
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA26LnAFayHCHFdYSJK3bY0p15UjWnIsv4",
  authDomain: "sober-app-5abfd.firebaseapp.com",
  projectId: "sober-app-5abfd",
  storageBucket: "sober-app-5abfd.appspot.com", // Note: Corrected the domain.
  messagingSenderId: "502657946376",
  appId: "1:502657946376:web:1a14fe7dd0d5dfce2212bd",
  measurementId: "G-WC1C4CX669",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);

export { auth, firestore, storage, database };
