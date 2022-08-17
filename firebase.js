import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaRvuzDe2VGA4fEocxhDwOD-Yscc17xXo",
  authDomain: "scannerapp-cf672.firebaseapp.com",
  projectId: "scannerapp-cf672",
  storageBucket: "scannerapp-cf672.appspot.com",
  messagingSenderId: "1036099899940",
  appId: "1:1036099899940:web:95a2c95e135c75928dfeb1",
  measurementId: "G-9DS6B6DMXV",
};

export const app =
  getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
