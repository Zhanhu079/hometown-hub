import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
const authDomain = import.meta.env.VITE_AUTH_DOMAIN;  // Added VITE_ prefix
const projectId = import.meta.env.VITE_PROJECT_ID;     // Added VITE_ prefix
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET; // Added VITE_ prefix
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID; // Added VITE_ prefix
const appId = import.meta.env.VITE_APP_ID;              // Added VITE_ prefix
const measurementId = import.meta.env.VITE_MEASUREMENT_ID; // Added VITE_ prefix


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };