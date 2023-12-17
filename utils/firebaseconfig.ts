import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB_5UwMK7BAOPjqlEhkd11MiIerdwdDah0",
  authDomain: "next-blogging123.firebaseapp.com",
  projectId: "next-blogging123",
  storageBucket: "next-blogging123.appspot.com",
  messagingSenderId: "240089936638",
  appId: "1:240089936638:web:d3a281c4d467383c84ebaf",
  measurementId: "G-JYHJ20QT37"
};



export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);