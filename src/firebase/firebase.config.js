
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbuIMfo2t5w370kojYFWq7j1sAiiwALBc",
  authDomain: "medimart-a0a31.firebaseapp.com",
  projectId: "medimart-a0a31",
  storageBucket: "medimart-a0a31.firebasestorage.app",
  messagingSenderId: "204500473984",
  appId: "1:204500473984:web:63549f6e68b3934eedee65",
  measurementId: "G-QZ04JSR4CL"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);