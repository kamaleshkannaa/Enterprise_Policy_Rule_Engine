// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCsma1xASw1bnLauWlSKQJ0RrtRcFNn_Q",
  authDomain: "enterprise-policy-engine-91d9c.firebaseapp.com",
  projectId: "enterprise-policy-engine-91d9c",
  storageBucket: "enterprise-policy-engine-91d9c.firebasestorage.app",
  messagingSenderId: "1071927041048",
  appId: "1:1071927041048:web:5b80679ff721cbf503776d",
  measurementId: "G-MQ92WBWPMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);