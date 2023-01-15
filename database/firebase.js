// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYI0eh4FyTljjh9iq9XmDQ8V51klnmvpI",
  authDomain: "objek211.firebaseapp.com",
  projectId: "objek211",
  storageBucket: "objek211.appspot.com",
  messagingSenderId: "435088981425",
  appId: "1:435088981425:web:85aedc93c1c906487e9190",
  measurementId: "G-91G4X7GLGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebase = getFirestore(app);
export default firebase;