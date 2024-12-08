import { db, auth } from './fc.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// Function to handle comment submission
async function handleCommentSubmit(event, topicId) {
    event.preventDefault();

    // Get the current user
    const user = auth.currentUser;
    if (user) {
        // Get the comment text
        const commentText = document.getElementById(`commentText${topicId}`).value;

        // Create the comment object
        const comment = {
            text: commentText,
            timestamp: new Date()
        };

        try {
            // Create a reference to the user's comments sub-collection
            const commentsCollectionRef = collection(db, `Users/${user.uid}/Comments`);
            // Add the comment to the sub-collection
            await addDoc(commentsCollectionRef, comment);

            alert('Comment added successfully!');
            document.getElementById(`commentText${topicId}`).value = ''; // Clear the input field
            loadComments(topicId); // Reload comments
        } catch (error) {
            console.error('Error adding comment: ', error);
        }
    } else {
        alert('No user is signed in.');
    }
}

// Function to load comments for a specific topic
async function loadComments(topicId) {
    // Clear existing comments
    const commentsDiv = document.getElementById(`comments${topicId}`);
    commentsDiv.innerHTML = '';

    // Get the current user
    const user = auth.currentUser;
    if (user) {
        try {
            // Create a reference to the user's comments sub-collection
            const commentsCollectionRef = collection(db, `Users/${user.uid}/Comments`);
            const querySnapshot = await getDocs(commentsCollectionRef);
            querySnapshot.forEach((doc) => {
                const commentData = doc.data();
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.innerHTML = `<p>${commentData.text}</p><small>${commentData.timestamp.toDate().toLocaleString()}</small>`;
                commentsDiv.appendChild(commentElement);
            });
        } catch (error) {
            console.error('Error loading comments: ', error);
        }
    }
}

// Attach event listeners to comment forms
document.querySelectorAll('.discussion-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
        const topicId = form.parentElement.getAttribute('data-topic');
        handleCommentSubmit(event, topicId);
    });
});

// Check if a user is signed in and load comments for all topics
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in: ', user);
        // Load comments for each topic
        document.querySelectorAll('.discussion-item').forEach((item) => {
            const topicId = item.getAttribute('data-topic');
            loadComments(topicId);
        });
    } else {
        console.log('No user is signed in.');
    }
});