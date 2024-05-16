import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import { collection, getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


const firebaseConfig = {
  apiKey: "AIzaSyA_Jz2XTaA98PpIuC2E46bDuWE2zs83aRw",
  authDomain: "fir-chat-app-7a6e6.firebaseapp.com",
  projectId: "fir-chat-app-7a6e6",
  storageBucket: "fir-chat-app-7a6e6.appspot.com",
  messagingSenderId: "379939976408",
  appId: "1:379939976408:web:38a599d4e8ae808b0b13ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// for persisting user into local storage
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);

// collections
export const usersRef = collection(db, "users");
export const roomsRef = collection(db, "rooms");
