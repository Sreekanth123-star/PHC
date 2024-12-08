// register.js
import { auth } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

document.getElementById('RegistrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const PAssword = document.getElementById('Password').value;

  

  createUserWithEmailAndPassword(auth, email, password,PAssword)
    .then((userCredential) => {
      // User created
      const user = userCredential.user;
      console.log('User registered:', user);
      // Redirect to login or dashboard
      window.location.href = '/dashboard.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error: ', errorCode, errorMessage);
      alert(errorMessage);
    });
});
