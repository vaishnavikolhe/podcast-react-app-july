// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBxDPSw7Oor9pT1Xr304ovWseUOqjiFtzw",
    authDomain: "podcast-app-react-july.firebaseapp.com",
    projectId: "podcast-app-react-july",
    storageBucket: "podcast-app-react-july.appspot.com",
    messagingSenderId: "100550496794",
    appId: "1:100550496794:web:1b7b81959e48e5e28277a3",
    measurementId: "G-K6E74VWMPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { auth, db, storage };