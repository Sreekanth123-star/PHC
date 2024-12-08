const firebaseConfig = {
    apiKey: "AIzaSyDCrhK1znYsCH7NxFSaiQsqwKlAPuR6M7U",
    authDomain: "personal-health-consultant.firebaseapp.com",
    databaseURL: "https://personal-health-consultant-default-rtdb.firebaseio.com",
    projectId: "personal-health-consultant",
    storageBucket: "personal-health-consultant.appspot.com",
    messagingSenderId: "490322043201",
    appId: "1:490322043201:web:1d7f017a6f8cbde0e9c1c0"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const doctors=[
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
    
  ]
  
  const addDoctors = async () => {
    for (let doctor of doctors) {
      try {
        const docRef = await db.collection('Doctors').add(doctor);
        console.log(`Doctor ${doctor.name} added with ID: ${docRef.id}`);
      } catch (error) {
        console.error("Error adding doctor: ", error);
      }
    }
  };
  
  addDoctors();
  