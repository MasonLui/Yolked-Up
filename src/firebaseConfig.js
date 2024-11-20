// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBy8T01eYqvxCaYwv7vzd_WheLmitBAxr0",
  authDomain: "yolked-up.firebaseapp.com",
  projectId: "yolked-up",
  storageBucket: "yolked-up.firebasestorage.app",
  messagingSenderId: "956997652934",
  appId: "1:956997652934:web:c19ba84f1034bff54722c7",
  measurementId: "G-CQBR5GMLXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);