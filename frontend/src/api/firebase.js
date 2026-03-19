import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnux5mbLamh6ghCV_gP8kQmyUl3FqtozQ",
  authDomain: "gapx-19d15.firebaseapp.com",
  projectId: "gapx-19d15",
  storageBucket: "gapx-19d15.firebasestorage.app",
  messagingSenderId: "759484963094",
  appId: "1:759484963094:web:aa14d0c35ae53c8a1b9837",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);