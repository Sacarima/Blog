// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-82c2f.firebaseapp.com",
  projectId: "blog-82c2f",
  storageBucket: "blog-82c2f.appspot.com",
  messagingSenderId: "984125253362",
  appId: "1:984125253362:web:d36bbb1b776c98f349d26b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }