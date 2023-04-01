// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration

const API_KEY = process.env.REACT_FIREBASE_API_KEY

const firebaseConfig = {
  apiKey: `${API_KEY}`,
  authDomain: "todo-app-71205.firebaseapp.com",
  projectId: "todo-app-71205",
  storageBucket: "todo-app-71205.appspot.com",
  messagingSenderId: "8010268749",
  appId: "1:8010268749:web:ef1e4fc9860fbc5ea29c04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);