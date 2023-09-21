// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWcEGY7A3_HpaTb2JxXbv_zcSsVRijyNM",
  authDomain: "ecommerce-6f1c8.firebaseapp.com",
  projectId: "ecommerce-6f1c8",
  storageBucket: "ecommerce-6f1c8.appspot.com",
  messagingSenderId: "666618121963",
  appId: "1:666618121963:web:06cc81eb2cbaee968df8ae",
  measurementId: "G-W3W70681RH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
export const db =getFirestore(app)