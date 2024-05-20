import { initializeApp } from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyB4u7tdEAXjDPTztPniA3SeZt3VKtqrOK8",
  authDomain: "pgrkam-sih23.firebaseapp.com",
  projectId: "pgrkam-sih23",
  storageBucket: "pgrkam-sih23.appspot.com",
  messagingSenderId: "15149464935",
  appId: "1:15149464935:web:4dc594af692cd30060c3c2",
  measurementId: "G-C0F10ER5G7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    return (await signInWithPopup(auth, googleProvider)).user;
  
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

export const logInWithEmailAndPassword = async (email, password) => {
    try {
      return (await signInWithEmailAndPassword(auth, email, password)).user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const registerWithEmailAndPassword = async (email, password) => {
    try {
      return (await createUserWithEmailAndPassword(auth, email, password)).user;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  export const logout = () => {
    return signOut(auth);
  };

