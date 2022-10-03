// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6M_Bl0UAnU6PP0a8AlIsJEhKNUY5cJvA",
  authDomain: "dblog-dc3a4.firebaseapp.com",
  projectId: "dblog-dc3a4",
  storageBucket: "dblog-dc3a4.appspot.com",
  messagingSenderId: "779875554435",
  appId: "1:779875554435:web:7ec227ef4e530b412477b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider(auth);
const facebookProvider = new FacebookAuthProvider(auth);
const postsRef = collection(database, 'posts');
const usersRef = collection(database, 'users');
export {
  database, auth, storage, googleProvider, facebookProvider, postsRef, usersRef
}