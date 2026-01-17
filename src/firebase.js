// Firebase configuration and initialization (Compat mode for v8 syntax)
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Firebase configuration for web-kantawan project
const firebaseConfig = {
  apiKey: "AIzaSyCieAhFTn4dL0FuB-SAC4-gtYBVrJlpHrA",
  authDomain: "web-kantawan.firebaseapp.com",
  projectId: "web-kantawan",
  storageBucket: "web-kantawan.firebasestorage.app",
  messagingSenderId: "281106098218",
  appId: "1:281106098218:web:1d782331286c6b779e7b53",
  measurementId: "G-T4J8H8WN7P"
};

// Check if config is placeholder
const isPlaceholderConfig = firebaseConfig.apiKey === "YOUR_API_KEY_HERE";

// Initialize Firebase
let auth, db;

if (isPlaceholderConfig) {
  console.warn("⚠️ Firebase config not set! Please update src/firebase.js with your Firebase configuration.");
  console.warn("Get your config from: https://console.firebase.google.com/");
  
  // Create mock objects to prevent crashes
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Firebase not configured")),
    signInWithPopup: () => Promise.reject(new Error("Firebase not configured")),
    signOut: () => Promise.resolve()
  };
  
  db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ exists: false }),
        set: () => Promise.resolve(),
        update: () => Promise.resolve()
      }),
      get: () => Promise.resolve({ docs: [] }),
      add: () => Promise.resolve({ id: 'mock-id' })
    })
  };
} else {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  auth = firebase.auth();
  db = firebase.firestore();
}

export { firebase, auth, db };
