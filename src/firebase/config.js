import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0SK6VRZ9zhoIKLO1koxIi3izATjH8EIo",
    authDomain: "blog-8ecbf.firebaseapp.com",
    projectId: "blog-8ecbf",
    storageBucket: "blog-8ecbf.appspot.com",
    messagingSenderId: "33070276303",
    appId: "1:33070276303:web:2c6b98824638bba8b661ba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
