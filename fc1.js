import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

// Function to fetch selected diseases from Firestore
async function displaySelectedDiseases(userId) {
    try {
        const userDocRef = doc(db, "Users", userId, "SelectedDiseases", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const selectedDiseases = userDoc.data().diseases;
            displayInContainer(selectedDiseases);
        } else {
            console.log("No selected diseases found for this user.");
        }
    } catch (error) {
        console.error("Error fetching selected diseases:", error);
    }
}

function displayInContainer(diseases) {
    const selectedDiseasesContainer = document.getElementById("selectedDiseasesContainer");

    selectedDiseasesContainer.innerHTML = ""; // Clear previous content

    diseases.forEach(disease => {
        const diseaseElement = document.createElement("div");
        diseaseElement.textContent = disease;
        diseaseElement.classList.add("disease-item"); // Add a class for styling
        selectedDiseasesContainer.appendChild(diseaseElement);
    });
}

  // Listen for authentication state changes
onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userId = user.uid;
      await displaySelectedDiseases(userId);
    } else {
      // User is not logged in
      console.log("No user is signed in.");
    }
  });


// Assuming you have a list of doctors (for testing display)
const doctors = [
    { 
    name: "Dr. Jane Doe", 
    age: 35, 
    experience: "10 years", 
    department: "Cardiology", 
    specializations: ["Hypertension", "Heart Disease", "Stroke"], 
    description: "Dr. Jane Doe is a renowned cardiologist with over a decade of experience in treating heart-related ailments.", 
    image: "doc21.jpg",
    hospital: "Evergreen Hospital",
    location: "Alappuzha"
},
{ 
    name: "Dr. Paul Philip", 
    age: 29, 
    experience: "4 years", 
    department: "Infectious Diseases", 
    specializations: ["Common Cold", "Influenza (Flu)", "Pneumonia", "Tuberculosis", "Hepatitis", "Malaria", "Typhoid Fever", "Cholera", "Dengue Fever", "Zika Virus", "Ebola Virus", "Rabies"], 
    description: "Dr. Paul Philip is dedicated to managing and treating infectious diseases with a focus on patient care and prevention.", 
    image: "doc6.jpg",
    hospital: "Golden Oak Medical Center",
    location: "Alappuzha"
},
{ 
    name: "Dr. Lebron John", 
    age: 30, 
    experience: "9 years", 
    department: "Pediatrics", 
    specializations: ["Chickenpox", "Measles", "Mumps", "Rubella"], 
    description: "Dr. Lebron John specializes in pediatric care, ensuring the health and well-being of children and adolescents.", 
    image: "doc31.jpg",
    hospital: "Unity Hospital",
    location: "Kollam"
},
{ 
    name: "Dr. Henry Parker", 
    age: 40, 
    experience: "20 years", 
    department: "Dermatology", 
    specializations: ["Psoriasis", "Eczema", "Lyme Disease"], 
    description: "With two decades of experience, Dr. Henry Parker is an expert in treating a variety of skin conditions.", 
    image: "doc4.jpg",
    hospital: "Lakeside Health Center",
    location: "Kollam"
},
{ 
    name: "Dr. David Brown", 
    age: 32, 
    experience: "10 years", 
    department: "Neurology", 
    specializations: ["Migraine", "Parkinson's Disease", "Multiple Sclerosis", "Epilepsy"], 
    description: "Dr. David Brown is a skilled neurologist known for his comprehensive care in neurological disorders.", 
    image: "doc5.jpg",
    hospital: "Pineview Clinic",
    location: "Thiruvananthapuram"
},
{ 
    name: "Dr. Mark Anderson", 
    age: 29, 
    experience: "8 years", 
    department: "Psychiatry", 
    specializations: ["Depression", "Anxiety Disorders", "Bipolar Disorder", "Schizophrenia"], 
    description: "Dr. Mark Anderson provides compassionate psychiatric care, specializing in various mental health conditions.", 
    image: "doc94.jpg",
    hospital: "Sunrise Medical Institute",
    location: "Thiruvananthapuram"
},
{
            name: "Dr. Patty Johnson", 
            age: 28, 
            experience: "3 years", 
            department: "Geriatrics", 
            specializations: ["Alzheimer's Disease"], 
            description: "Dr. Patty Johnson focuses on the health and wellness of the elderly, with a specialization in Alzheimer's Disease.", 
            image: "doc11.webp" 
        },
        { 
            name: "Dr. Mia Thomas", 
            age: 32, 
            experience: "20 years", 
            department: "Rheumatology", 
            specializations: ["Arthritis", "Lupus", "Osteoporosis", "Gout"], 
            description: "Dr. Mia Thomas is a veteran rheumatologist dedicated to treating autoimmune and inflammatory diseases.", 
            image: "doc95.jpg" 
        },
        { 
            name: "Dr. Ovan Taylor", 
            age: 38, 
            experience: "18 years", 
            department: "Endocrinology", 
            specializations: ["Diabetes", "Hyperthyroidism", "Hypothyroidism", "Obesity"], 
            description: "Dr. Ovan Taylor is an expert in hormonal and metabolic disorders, with a strong focus on diabetes management.", 
            image: "doc92.jpg" 
        },
        { 
            name: "Dr. Serena Parker", 
            age: 27, 
            experience: "4 years", 
            department: "Oncology", 
            specializations: ["Skin Cancer", "Breast Cancer", "Leukemia", "Lymphoma", "Lung Cancer", "Prostate Cancer", "Colon Cancer"], 
            description: "Dr. Serena Parker is a dedicated oncologist committed to providing comprehensive cancer care.", 
            image: "doc91.jpg" 
        },
        { 
            name: "Dr. Ethan Martinez", 
            age: 31, 
            experience: "12 years", 
            department: "Pulmonology", 
            specializations: ["Asthma", "Chronic Obstructive Pulmonary Disease (COPD)"], 
            description: "Dr. Ethan Martinez is a pulmonologist with extensive experience in treating respiratory disorders.", 
            image: "doc93.jpg" 
        },
        { 
            name: "Dr. Benjamin Wilson", 
            age: 34, 
            experience: "10 years", 
            department: "Nephrology", 
            specializations: ["Kidney Disease"], 
            description: "Dr. Benjamin Wilson specializes in nephrology, providing expert care for patients with kidney diseases.", 
            image: "doc97.jpg" 
        }
    ];

// Function to display doctors
function displayDoctors(doctors) {
    const doctorList = document.getElementById("doctorList");
    doctorList.innerHTML = ""; // Clear previous list
  
    const doctorSelect = document.getElementById("doctorSelect");
    doctorSelect.innerHTML = ""; // Clear previous options
  
    doctors.forEach((doctor) => {
      const doctorDiv = document.createElement("div");
      doctorDiv.classList.add("doctor");
  
      const image = document.createElement("img");
      image.src = doctor.image;
      image.alt = doctor.name + " Image";
      image.classList.add("img-fluid", "rounded-circle");
      image.style.width = "70%";
      doctorDiv.appendChild(image);
  
      const name = document.createElement("h4");
      name.textContent = doctor.name;
      doctorDiv.appendChild(name);
  
      const dept = document.createElement("p");
      dept.textContent = doctor.department;
      doctorDiv.appendChild(dept);
  
      const age = document.createElement("p");
      age.textContent = "Age: " + doctor.age;
      age.style.display = "none"; // Hide age initially
      doctorDiv.appendChild(age);
  
      const viewProfileBtn = document.createElement("button");
      viewProfileBtn.textContent = "View Profile";
      viewProfileBtn.classList.add("view-profile-button", "btn");
      viewProfileBtn.onclick = function () {
        displayModal(doctor);
      };
      doctorDiv.appendChild(viewProfileBtn);
  
      doctorList.appendChild(doctorDiv);
  
      // Add option to the doctorSelect element
      const option = document.createElement("option");
      option.value = doctor.name;
      option.text = doctor.name;
      doctorSelect.appendChild(option);
    });
  }

// Function to display modal with doctor details
function displayModal(doctor) {
    const modalDoctorHospital = document.getElementById("modalDoctorHospital");
    modalDoctorHospital.textContent = doctor.hospital;

    const modalDoctorLocation = document.getElementById("modalDoctorLocation");
    modalDoctorLocation.textContent = doctor.location;

    const modalDoctorImage = document.getElementById("modalDoctorImage");
    modalDoctorImage.src = doctor.image;

    const modalDoctorName = document.getElementById("modalDoctorName");
    modalDoctorName.textContent = doctor.name;

    const modalDoctorAge = document.getElementById("modalDoctorAge");
    modalDoctorAge.textContent = "Age: " + doctor.age;
    modalDoctorAge.style.display = "block";

    const modalDoctorDept = document.getElementById("modalDoctorDept");
    modalDoctorDept.textContent = "Department: " + doctor.department;

    const modalDoctorExperience = document.getElementById("modalDoctorExperience");
    modalDoctorExperience.textContent = "Experience: " + doctor.experience;

    const modalDoctorSpecializations = document.getElementById("modalDoctorSpecializations");
    modalDoctorSpecializations.textContent = "Specializations: " + doctor.specializations.join(", ");

    const modalDoctorDescription = document.getElementById("modalDoctorDescription");
    modalDoctorDescription.textContent = doctor.description;

    $('#doctorModal').modal('show');
}

// Display initial list of doctors (for testing display)
displayDoctors(doctors);

