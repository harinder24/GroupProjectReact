import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { EmailAuthProvider , getAuth, FacebookAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCYY5XZjxZYgSgz7AMqB29Cku2p7CN-nKM",
  authDomain: "insta-143ab.firebaseapp.com",
  projectId: "insta-143ab",
  storageBucket: "insta-143ab.appspot.com",
  messagingSenderId: "561367146288",
  appId: "1:561367146288:web:0707e5ccd3d997fae532f5",
  measurementId: "G-3WLDZFYXJF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const emailProvider = new EmailAuthProvider();
const fb = new FacebookAuthProvider()
const db = getFirestore(app);

export { db, emailProvider, auth, fb };
