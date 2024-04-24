import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js"; // Import Firestore functions for version 9+

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
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp); 

export { firebaseApp, firebaseAuth, firestore }