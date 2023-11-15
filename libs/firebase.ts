// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARKknYOHrCP813xlitoXQj8o7HOrS1Uiw",
  authDomain: "next13-october.firebaseapp.com",
  projectId: "next13-october",
  storageBucket: "next13-october.appspot.com",
  messagingSenderId: "441600751874",
  appId: "1:441600751874:web:c8b5251b10c1290f5b2a1b"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;