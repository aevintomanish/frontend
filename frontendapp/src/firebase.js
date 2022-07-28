import { unstable_unsupportedProp } from "@mui/utils";
import { initializeApp } from "firebase/app";
import { getAuth,signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged, signOut } from "firebase/auth";
import { useState,useEffect } from "react";
const firebaseConfig = {
    apiKey: "AIzaSyBYBedijKIqpS3NR3BV5AiOoievgsjcX-s",
    authDomain: "hand-right.firebaseapp.com",
    projectId: "hand-right",
    storageBucket: "hand-right.appspot.com",
    messagingSenderId: "990643741675",
    appId: "1:990643741675:web:dd5c7ba4c4f037996aafae",
    measurementId: "G-TXWKNC21Z4"
  };
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  export function signup(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
  }
  export function login(email,password){
    return signInWithEmailAndPassword(auth,email,password);
  }
  export function logout() {
    return signOut(auth);
  
  }
// custom react hook
export function useAuth(){
 const [ currentUser, setCurrentUser ] = useState();
useEffect(() => {
      const unsub = onAuthStateChanged(auth,user =>setCurrentUser(user));
       return unsub;
},[])

 return currentUser;
}