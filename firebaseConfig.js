import { initializeApp } from "firebase/app"
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyBBTyIcj_zenHX1hEG_eiFhlG1Vaa721W0",
    authDomain: "react-chat-app-bdc57.firebaseapp.com",
    projectId: "react-chat-app-bdc57",
    storageBucket: "react-chat-app-bdc57.firebasestorage.app",
    messagingSenderId: "84310626297",
    appId: "1:84310626297:web:ed97778e5ff9e5b6c67728",
    measurementId: "G-X7SZ60N1ER",
    databaseURL: 'https://react-chat-app-bdc57-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)