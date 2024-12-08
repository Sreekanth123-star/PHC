// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCrhK1znYsCH7NxFSaiQsqwKlAPuR6M7U",
    authDomain: "personal-health-consultant.firebaseapp.com",
    databaseURL: "https://personal-health-consultant-default-rtdb.firebaseio.com",
    projectId: "personal-health-consultant",
    storageBucket: "personal-health-consultant.appspot.com",
    messagingSenderId: "490322043201",
    appId: "1:490322043201:web:1d7f017a6f8cbde0e9c1c0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
