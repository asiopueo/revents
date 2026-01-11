// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHlpwrWEDgh-YF8i66TujflHbd8mzWRyE",
  authDomain: "revents-c9b03.firebaseapp.com",
  projectId: "revents-c9b03",
  storageBucket: "revents-c9b03.firebasestorage.app",
  messagingSenderId: "714018951848",
  appId: "1:714018951848:web:c6c59710c76baea306689d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);