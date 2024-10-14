import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const apiKey = import.meta.env.API_KEY;
const authDomain = import.meta.env.AUTH_DOMAIN;
const projectId = import.meta.env.PROJECT_ID;
const storageBucket = import.meta.env.STORAGE_BUCKET;
const messagingSenderId = import.meta.env.MESSAGING_SENDER_ID;
const appId = import.meta.env.APP_ID;
const measurementId = import.meta.env.MEASUREMENT_ID;


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