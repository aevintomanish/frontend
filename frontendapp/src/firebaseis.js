import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBYBedijKIqpS3NR3BV5AiOoievgsjcX-s",
    authDomain: "hand-right.firebaseapp.com",
    projectId: "hand-right",
    storageBucket: "hand-right.appspot.com",
    messagingSenderId: "990643741675",
    appId: "1:990643741675:web:dd5c7ba4c4f037996aafae",
    measurementId: "G-TXWKNC21Z4"
};

 firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };