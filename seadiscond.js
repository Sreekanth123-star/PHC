// Import the necessary functions from the Firebase SDKs
import { auth, db } from "./fc.js";  
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

async function handleSubmit() {
    console.log('Submit button clicked');
    
    const selectedDiseases = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one disease before submitting.');
        return; // Exit function if no diseases are selected
    }
    checkboxes.forEach(checkbox => {
        selectedDiseases.push(checkbox.value); // Assuming checkbox value is disease ID/name
    });

    console.log("Selected Diseases:", selectedDiseases);

    const user = auth.currentUser;
    if (user) {
        console.log('User is Signed in:', user);
        try {
            // Reference to the 'SelectedDiseases' subcollection under the current user's document
            const selectedDiseasesCollectionRef = collection(db, `Users/${user.uid}/SelectedDiseases`);
            
            // Add a new document to the 'SelectedDiseases' subcollection
            const newSelectedDiseasesDocRef = await addDoc(selectedDiseasesCollectionRef, {
                diseases: selectedDiseases,
                timestamp: new Date()
            });

            console.log('Your choices have been recorded successfully!!:', newSelectedDiseasesDocRef.id);
            alert('Your choices have been recorded successfully!!');
            window.location.href = 'Doconnect.html'; // Redirect to dashboard after successful submission
        } catch (error) {
            console.error('Error saving selected diseases: ', error);
            alert('Failed to save selected diseases. Check console for error details.');
        }
    } else {
        console.log('No user is signed in.');
        alert('No user is signed in.');
    }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in: ', user);
    } else {
        console.log('No user is signed in.');
    }
});

// Export the handleSubmit function so it can be used in your HTML file
export { handleSubmit };