import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCoilJLcNK9rocbD8zgszA5hV5w0qKw1Ac",
  authDomain: "orbit-844b7.firebaseapp.com",
  projectId: "orbit-844b7",
  storageBucket: "orbit-844b7.appspot.com",
  messagingSenderId: "110968855025",
  appId: "1:110968855025:web:1b4cf5bdcf86aed0eb0c50",
  measurementId: "G-9FLCV199J2"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
