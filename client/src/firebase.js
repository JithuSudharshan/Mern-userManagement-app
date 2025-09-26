// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-usermanagement-app.firebaseapp.com",
  projectId: "mern-usermanagement-app",
  storageBucket: "mern-usermanagement-app.firebasestorage.app",
  messagingSenderId: "1051638951161",
  appId: "1:1051638951161:web:6fe6f8b67e6334187ec628"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);