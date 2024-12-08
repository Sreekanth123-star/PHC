import { db, auth } from './fc.js';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

document.getElementById('personal-details-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const Users = auth.currentUser;
    if (Users) {
        const userProfile = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            age: document.getElementById('age').value,
            gender: document.getElementById('gender').value,
            medicalHistory: document.getElementById('medicalhistory').value,
            notificationPermission: document.getElementById('notification-permission').checked
        };

        try {
            const userDocRef = doc(db, `Users/${Users.uid}`);
            await setDoc(userDocRef, userProfile);
            alert('Profile updated successfully!');
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Error updating profile: ', error);
        }
    } else {
        alert('No user is signed in.');
    }
});

// Check if a user is signed in
onAuthStateChanged(auth, (Users) => {
    if (Users) {
        console.log('User is signed in: ', Users);
    } else {
        console.log('No user is signed in.');
    }
});
