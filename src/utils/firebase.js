import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCn1OQqr73ElZp_ocxdrAdwdafCxfhRuV4",
  authDomain: "bowlcuts-and-dragons.firebaseapp.com",
  projectId: "bowlcuts-and-dragons",
  storageBucket: "bowlcuts-and-dragons.appspot.com",
  messagingSenderId: "916455704727",
  appId: "1:916455704727:web:a87d6c7f240820aeb581d2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//create an instance of google provider
export const provider = new GoogleAuthProvider()
//initialize firebase authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
