// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBG9hnv4q08G8IHusVWSBm5JvtOmLBEqyM",
  authDomain: "miniblog-eaa88.firebaseapp.com",
  projectId: "miniblog-eaa88",
  storageBucket: "miniblog-eaa88.appspot.com",
  messagingSenderId: "117692562821",
  appId: "1:117692562821:web:aaa4e9ac3ceb607072d8ec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };