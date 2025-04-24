// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getAuth, EmailAuthProvider} from "firebase/auth";
import { 
  getReactNativePersistence, 
  initializeAuth, 
} from "firebase/auth";
import {getFirestore, serverTimestamp, deleteDoc, doc} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmxLhst_2XSfP5gDAejnQk9QfyuYn7254",
  authDomain: "empregueib.firebaseapp.com",
  projectId: "empregueib",
  storageBucket: "empregueib.appspot.com",
  messagingSenderId: "316727387560",
  appId: "1:316727387560:web:4639ea9f0b918355c2a99d"
};

// Initialize Firebase
let app, auth;

if  (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    auth = initializeAuth(app,  {
      persistence:  getReactNativePersistence(AsyncStorage),
    });
  } catch (error) {
    console.log("Error ao iniciar o Aplicativo: " + error);
  }
}
else  {
  app = getApp();
  auth = getAuth(app);
}

const provider = new EmailAuthProvider();
const db = getFirestore();
const timestamp = serverTimestamp();


export {  app,auth,provider,db,timestamp };