// dashboard.js
import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // No user is signed in, redirect to login page
    window.location.href = '/login.html';
  }
});
