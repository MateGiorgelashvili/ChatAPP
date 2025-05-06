import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";  // Import the correct method for Realtime Database

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFkedVDMWOTEOeOCHEKq-0ztK6bXNTvyo",
  authDomain: "chat-app-7afcc.firebaseapp.com",
  databaseURL: "https://chat-app-7afcc-default-rtdb.europe-west1.firebasedatabase.app",  // Use your Realtime Database URL
  projectId: "chat-app-7afcc",
  storageBucket: "chat-app-7afcc.firebasestorage.app",
  messagingSenderId: "219805451804",
  appId: "1:219805451804:web:768997d7341f11662f41d9",
  measurementId: "G-41CGHX80F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize auth and Realtime Database (instead of Firestore)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);  // Use getDatabase for Realtime Database

// Export auth, provider, and db for use in other files
export { auth, provider, db };
