// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAnalytics
} from "firebase/analytics";
import {
    getFirestore
} from "firebase/firestore/lite";
import {
    getAuth
} from "firebase/auth";
import {
    getStorage
} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz9EkpRICOoQTUbcXPlS9O18a-TiIu7gw",
    authDomain: "my-todo-665.firebaseapp.com",
    projectId: "my-todo-665",
    storageBucket: "my-todo-665.appspot.com",
    messagingSenderId: "958976319945",
    appId: "1:958976319945:web:abfe5e93efb5d55d9ec818",
    measurementId: "G-FDC36VT0G8"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);