// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWxv3Kax_9X7FloMTi5nyqYFEPO6pEZL0",
  authDomain: "habitstracker-fa80e.firebaseapp.com",
  projectId: "habitstracker-fa80e",
  storageBucket: "habitstracker-fa80e.appspot.com",
  messagingSenderId: "427323112797",
  appId: "1:427323112797:web:8ad9c215d00e24bf087cb4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
