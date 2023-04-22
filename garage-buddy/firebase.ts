// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
//this is all boilerplate straight from firebase
const firebaseConfig = {
    apiKey: "AIzaSyCaFUyx4DFcQlrKBd4EKCljZAriZmLQD2g",
    authDomain: "garage-buddy-8ee7e.firebaseapp.com",
    projectId: "garage-buddy-8ee7e",
    storageBucket: "garage-buddy-8ee7e.appspot.com",
    messagingSenderId: "471885782047",
    appId: "1:471885782047:web:d705e3647d061648e7092a"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }