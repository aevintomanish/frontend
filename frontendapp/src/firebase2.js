import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYBedijKIqpS3NR3BV5AiOoievgsjcX-s",
    authDomain: "hand-right.firebaseapp.com",
    projectId: "hand-right",
    storageBucket: "hand-right.appspot.com",
    messagingSenderId: "990643741675",
    appId: "1:990643741675:web:dd5c7ba4c4f037996aafae",
    measurementId: "G-TXWKNC21Z4"
};

const app =firebase.initializeApp(firebaseConfig);
 

export const db = getFirestore(app);