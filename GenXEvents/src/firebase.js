// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { doc, getFirestore, setDoc, collection } from "firebase/firestore";
import SampleData from "./data.js";
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
const db = getFirestore(app);

const addSampleData = async () => {
    try {
        const activitiesCollection = collection(db, 'activities'); // Replace 'activities' with your desired collection name

        // Add sample data to test Explore Page
        const data = SampleData;
        
        // Iterate over the data array and add each object as a document
        for (const activity of data) {
            const activityID = activity["Activity ID"];
            const docRef = doc(activitiesCollection, activityID);
            await setDoc(docRef, activity);
        }

        console.log("Data of activities has been added successfully!");
    } catch (error) {
        console.error("Error adding sample data: ", error);
    }
};

addSampleData();

const firebaseTools = { db, analytics };
export default firebaseTools;