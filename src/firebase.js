import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyB-9oadp9oO0rOMTfY69klF9_xroHx8eS8",
    authDomain: "booking-syst.firebaseapp.com",
    projectId: "booking-syst",
    storageBucket: "booking-syst.appspot.com",
    messagingSenderId: "985372167796",
    appId: "1:985372167796:web:c91695a889c8bbf9b88b21"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
