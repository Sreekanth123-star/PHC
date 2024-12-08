import { db, auth } from './fc.js';
import { collection, addDoc, serverTimestamp,getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Existing ratings data
var ratingsData = [
    { name: "Dr. Jane Doe", age: 35, experience: "10 years", department: "Cardiology", specializations: ["Hypertension", "Heart Disease", "Stroke"], image: "doc21.jpg" },
    { name: "Dr. Paul Philip", age: 29, experience: "4 years", department: "Infectious Diseases", specializations: ["Common Cold", "Influenza (Flu)", "Pneumonia", "Tuberculosis", "Hepatitis", "Malaria", "Typhoid Fever", "Cholera", "Dengue Fever", "Zika Virus", "Ebola Virus", "Rabies"], image: "doc6.jpg" },
    { name: "Dr. Lebron John", age: 30, experience: "9 years", department: "Pediatrics", specializations: ["Chickenpox", "Measles", "Mumps", "Rubella"], image: "doc31.jpg" },
    { name: "Dr. Henry Parker", age: 40, experience: "20 years", department: "Dermatology", specializations: ["Psoriasis", "Eczema", "Lyme Disease"], image: "doc4.jpg" },
    { name: "Dr. David Brown", age: 32, experience: "10 years", department: "Neurology", specializations: ["Migraine", "Parkinson's Disease", "Multiple Sclerosis", "Epilepsy"], image: "doc5.jpg" },
    { name: "Dr. Mark Anderson", age: 29, experience: "8 years", department: "Psychiatry", specializations: ["Depression", "Anxiety Disorders", "Bipolar Disorder", "Schizophrenia"], image: "doc94.jpg" },
    { name: "Dr. Patty Johnson", age: 28, experience: "3 years", department: "Geriatrics", specializations: ["Alzheimer's Disease"], image: "doc11.webp" },
    { name: "Dr. Mia Thomas", age: 32, experience: "20 years", department: "Rheumatology", specializations: ["Arthritis", "Lupus","Osteoporosis","Gout"], image: "doc95.jpg" },
    { name: "Dr. Ovan Taylor", age: 38, experience: "18 years", department: "Endocrinology", specializations: ["Diabetes", "Hyperthyroidism", "Hypothyroidism","Obesity"], image: "doc92.jpg" },
    { name: "Dr. Serena Parker", age: 27, experience: "4 years", department: "Oncology", specializations: ["Skin Cancer","Breast Cancer","Leukemia", "Lymphoma", "Lung Cancer", "Prostate Cancer", "Colon Cancer"], image: "doc91.jpg" },
    { name: "Dr. Ethan Martinez", age: 31, experience: "12 years", department: "Pulmonology", specializations: ["Asthma", "Chronic Obstructive Pulmonary Disease (COPD)"], image: "doc93.jpg" },
    { name: "Dr. Benjamin Wilson", age: 34, experience: "10 years", department: "Nephrology", specializations: ["Kidney Disease"], image: "doc97.jpg" }
];

// Function to generate rating items dynamically
function generateRatingItems() {
    var ratingItemsContainer = document.getElementById("ratingItems");

    ratingsData.forEach(function(doctor) {
        var ratingItem = document.createElement("div");
        ratingItem.classList.add("rating-item");

        ratingItem.innerHTML += `<img src="${doctor.image}" alt="${doctor.name}" class="doctor-img">`;
        ratingItem.innerHTML += `<h2 class="rating-title">${doctor.name}</h2>`;
        ratingItem.innerHTML += `<div class="rating-details">Age: ${doctor.age}</div>`;
        ratingItem.innerHTML += `<div class="rating-details">Experience: ${doctor.experience}</div>`;
        ratingItem.innerHTML += `<div class="rating-details">Department: ${doctor.department}</div>`;
        ratingItem.innerHTML += `<div class="rating-details">Specializations: ${doctor.specializations.join(", ")}</div>`;

        ratingItem.addEventListener("click", function() {
            openModal(doctor);
        });

        ratingItemsContainer.appendChild(ratingItem);
    });
}

// Function to open the modal and display doctor details
async function openModal(doctor) {
    var modal = document.getElementById("myModal");
    var doctorDetailsContent = document.getElementById("doctorDetailsContent");

    doctorDetailsContent.innerHTML = `
        <img src="${doctor.image}" alt="${doctor.name}" class="doctor-img">
        <h2>${doctor.name}</h2>
        <div>Age: ${doctor.age}</div>
        <div>Experience: ${doctor.experience}</div>
        <div>Department: ${doctor.department}</div>
        <div>Specializations: ${doctor.specializations.join(", ")}</div>
    `;
    
    var userRatingStars = document.getElementById("userRatingStars");
    userRatingStars.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        let star = document.createElement("span");
        star.innerHTML = "&#9733;";
        star.addEventListener("click", function() {
            rateDoctor(i, star);
        });
        userRatingStars.appendChild(star);
    }

    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Function to rate a doctor
function rateDoctor(rating, selectedStar) {
    var userRatingStars = document.getElementById("userRatingStars");
    var stars = userRatingStars.children;
    for (let i = 0; i < stars.length; i++) {
        stars[i].style.color = i < rating ? "#f2b01e" : "#ccc";
    }

    document.getElementById("submitRatingButton").onclick = function() {
        submitRating(rating);
    };
}

// Function to submit rating to Firestore
async function submitRating(rating) {
    var user = auth.currentUser;
    if (user) {
        try {
            await addDoc(collection(db, "Users", user.uid, "ratings"), {
                doctorName: document.getElementById("doctorDetailsContent").children[1].innerText,
                rating: rating,
                timestamp: serverTimestamp()
            });
            alert("Rating submitted successfully!");
            closeModal();
        } catch (error) {
            console.error("Error submitting rating: ", error);
        }
    } else {
        alert("Please sign in to submit your rating.");
    }
}

// Generate rating items on page load
generateRatingItems();

// Close modal when user clicks outside of it
window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

document.querySelector(".close").onclick = closeModal;
