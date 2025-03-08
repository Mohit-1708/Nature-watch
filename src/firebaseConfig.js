import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBSkQ37axwayovW3yu2Cn1K-cHAosJxDP8",
    authDomain: "forest-fire-detection-a5cf5.firebaseapp.com",
    databaseURL: "https://forest-fire-detection-a5cf5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "forest-fire-detection-a5cf5",
    storageBucket: "forest-fire-detection-a5cf5.firebasestorage.app",
    messagingSenderId: "877904386202",
    appId: "1:877904386202:web:472862755b9f57831da723"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
