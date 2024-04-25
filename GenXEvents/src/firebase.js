// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf4xPb5ylT0QvgYpTveEcQqqfUH8_uBRc",
    authDomain: "l2---group-14.firebaseapp.com",
    projectId: "l2---group-14",
    storageBucket: "l2---group-14.appspot.com",
    messagingSenderId: "902310180741",
    appId: "1:902310180741:web:807a36dfe8e4de575a76ec",
    measurementId: "G-LJT4CX2BVT"
};  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const activitiesCollection = collection(db, 'activities');

const firebaseTools = { app, db, analytics, activitiesCollection, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged };
export default firebaseTools;