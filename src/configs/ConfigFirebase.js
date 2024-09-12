import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB9IqoloPKtd3wxd51HTjCg7Vwdr8H6s58",
    authDomain: "demoupload-a1c49.firebaseapp.com",
    projectId: "demoupload-a1c49",
    storageBucket: "demoupload-a1c49.appspot.com",
    messagingSenderId: "410073966939",
    appId: "1:410073966939:web:87a0810eb712e542c6127e"
};
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const storage = getStorage();
const auth = getAuth();
export const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};
export const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};