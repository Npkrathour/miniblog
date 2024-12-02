import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDyr1th0UpoKfYAkf-n0mfsvVI1dmxkRvE",
  authDomain: "miniblog-eca93.firebaseapp.com",
  projectId: "miniblog-eca93",
  storageBucket: "miniblog-eca93.firebasestorage.app",
  messagingSenderId: "423131873228",
  appId: "1:423131873228:web:ed1d11c9804dffb4316769",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
