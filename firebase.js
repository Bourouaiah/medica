import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAYMTjkRbVjrf-Z9qZGnK3ePumGJRL1RCU",
    authDomain: "carea-15be8.firebaseapp.com",
    projectId: "carea-15be8",
    storageBucket: "carea-15be8.appspot.com",
    messagingSenderId: "383140398042",
    appId: "1:383140398042:web:fb27f7df1030ec601276e3",
    measurementId: "G-GPWXGLWDSH"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };