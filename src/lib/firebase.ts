import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwVHchu1YDYU1lq8fgg2BXe1mTEpFZX_E",
  authDomain: "ccml-14df7.firebaseapp.com",
  projectId: "ccml-14df7",
  storageBucket: "ccml-14df7.firebasestorage.app",
  messagingSenderId: "628928118924",
  appId: "1:628928118924:web:0bc6ef97dd420982cf3ba9",
  measurementId: "G-C12JQGGPRY",
};

// Initialize Firebase (Singleton pattern to avoid re-initialization)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };