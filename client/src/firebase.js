// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "serendib-estates.firebaseapp.com",
  projectId: "serendib-estates",
  storageBucket: "serendib-estates.appspot.com",
  messagingSenderId: "50254853709",
  appId: "1:50254853709:web:70997489d7956f8a254e04"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);