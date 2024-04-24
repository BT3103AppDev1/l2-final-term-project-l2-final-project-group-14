<template>
    <div>
      <header>
        <nav>
          <div class="header_logo">
            <img v-show="profileVisible" src="../assets/benjamin-davies-P9BY2joAcwk-unsplash.jpg" alt="">
          </div>
          <div class="header_links">
            <ul class="nav_links">
              <li v-show="profileVisible" class="nav_link"><a href="#">Home</a></li>
              <!-- <li class="nav_link"><a href="#">Shop</a></li> -->
              <!-- <li class="nav_link"><a href="#">Repos</a></li> -->
            </ul>
          </div>
        </nav>
      </header>
  
      <section class="main">
        
        <!-- Conditionally show name and description -->
        <div v-show="profileVisible" id="profile-info" class="profile-info">
          <img src="../assets/ben-o-bro-wpU4veNGnHg-unsplash.jpg" alt="">
          <span>{{ name }}</span>
          <p>{{ description }}</p>
        </div>
  
        <div class="profile-section" v-show="profileVisible">
          <h1>Profile</h1>
          <div v-if="!editing" id="profileDetails">
            <div>
                <h2>Email: {{ email }}</h2>
            </div>
            <div>
                <h2>Date of Birth: {{ dob }}</h2>
            </div>
            <div>
                <h2>Hobbies: {{ hobbies }}</h2>
            </div>
            <div>
                <h2>Phone Number: {{ phoneNumber }}</h2>
            </div>
          </div>
          <div v-else id="editProfileForm">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name">
            <br>
            <label for="dob">Date of Birth:</label>
            <!-- Use the flatpickr component -->
            <flat-pickr v-model="dob" :config="datePickerConfig"></flat-pickr>
            <br>
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" v-model="phoneNumber">
            <br>
            <label for="profdesc">Profile Description:</label>
            <input type="text" id="profdesc" v-model="description">
            <br>
            <button @click="saveProfile">Save</button>
          </div>
          <button @click="toggleEditing" class="secondary">{{ editing ? 'Cancel' : 'Edit Profile' }}</button>
          <button @click="showHobbiesPage" class="secondary">Edit Hobbies</button>
        </div>
      </section>
  
      <!-- Edit Hobbies modal -->
      <div v-if="showHobbies" class="edit-hobbies-overlay">
        <div class="edit-hobbies-modal">
          <h2>Select Hobbies:</h2>
          <div class="hobbies-container">
    <label v-for="(hobby, index) in availableHobbies" :key="index" class="checkbox-label">
        <input type="checkbox" :value="hobby" v-model="selectedHobbies" class="custom-checkbox">
        <span class="checkmark"></span>
        {{ hobby }}
    </label>
</div>
          <button @click="addHobbies">Save Hobbies</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import { updateDoc, doc, setDoc } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js';
  import { firebaseAuth, firestore } from './firebase' 

  export default {
 
    components: {
        flatPickr
    },
    data() {
      return {
        name: "",
        description: "",
        linkedinUrl: "https://www.linkedin.com/in/felix-ivan-taslim-5783b2222/",
        githubUrl: "https://github.com/BT3103AppDev1",
        youtubeUrl: "https://www.youtube.com/watch?v=15d2w0EKuWM&list=RD15d2w0EKuWM&start_radio=1&ab_channel=%E8%8A%92%E6%9E%9CTV%E9%9F%B3%E4%B9%90MangoTVMusic",
        email: "example@example.com",
        dob: "",
        hobbies: "",
        phoneNumber: "+1234567890",
        editing: false,
        showHobbies: false,
        profileVisible: true,
        datePickerConfig: {
            dateFormat: 'Y-m-d', // Set the date format
            // Add more configuration options as needed
        },
        availableHobbies: [
        'Nature', 'Guided Tour', 'Cooking', 'Cultural', 'Fitness', 'Wellness', 'Art', 'Workshop', 'History', 'Wildlife', 'Entertainment', 'Social', 'Sightseeing', 'Dance', 'Food', 'Music', 'Water Sports', 'Culture',
        // Add more hobbies here
        
      ],
      selectedHobbies: []
    };
  },
  methods: {
    toggleEditing() {
        this.editing = !this.editing;
    },
    async saveProfile() {
      try {
        const userEmail = firebaseAuth.currentUser.email;
        const profileRef = doc(firestore, 'userProfiles', userEmail);

        const updatedProfile = {
          email: userEmail,
          name: this.name,
          description: this.description,
          dob: this.dob,
          phoneNumber: this.phoneNumber,
          hobbies: this.hobbies,
          // Add other profile data properties that were edited
        };

        await setDoc(profileRef, updatedProfile, { merge: true });
        console.log('Profile updated successfully');
        this.toggleEditing();
      } catch (error) {
        console.error('Error updating profile:', error);
        // Handle any errors
      }
    },
  showHobbiesPage() {
    this.showHobbies = true;
    this.profileVisible = false; 
  },
  async addHobbies() {
      try {
        const userEmail = firebaseAuth.currentUser.email;
        const profileRef = doc(firestore, 'userProfiles', userEmail);

        await updateDoc(profileRef, {
          hobbies: this.selectedHobbies.join(', ')
        });
        console.log('Hobbies updated successfully');
        this.showHobbies = false;
        this.profileVisible = true;
        this.hobbies = this.selectedHobbies.join(', ');;

      } catch (error) {
        console.error('Error updating hobbies:', error);
        // Handle any errors
      }
    }
  },
};
</script>
  
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    *, *::before, *::after {
        padding: 0;
        margin: 0;
        scroll-behavior: smooth;
    }

    body {
        background-color: #ffcc00;
        background-image: url('../assets/joshua-earle-C6duwascOEA-unsplash.jpg');
        color: #fff;
        font-family: 'Bahnschrift', Arial, Helvetica, sans-serif;
    }

    /* Nav Bar */

    header nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 20px 40px;
        animation: fadeInDown .8s;
    }

    header nav .header_links ul {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }

    header nav .header_links ul li, section.main ul li {
        list-style-type: none;
    }

    header nav .header_links ul li a {
        outline: none;
        text-decoration: none;
        color: #a6a8b8;
        padding: 5px 12px;
        transition: 0.3s all;
        font-size: 15px;
    }

    header nav .header_links ul li a:hover {
        color: black;
    }

    header nav .header_logo img {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        object-fit: cover;
        border: 5px solid black;
        cursor: pointer;
    }

    /* Responsive nav bar */

    @media only screen and (max-width: 630px) {
        header nav {
            display: flex;
            flex-direction: column;
        }
        header nav .header_logo {
            margin-bottom: 20px;
        }
    }

    @media only screen and (max-width: 320px) {
        header nav .header_links ul {
            display: flex;
            justify-content: center;
            text-align: center;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
        }
    }

    /* Main */

    section.main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        min-height: 70vh;
        animation: fadeInUp .8s slideLeft 2s ease-out forwards 2s;
    }

    section.main img {
        width: 200px;
        height: 200px;
        border-radius: 100%;
        object-fit: cover;
        border: 7px solid black;
        cursor: pointer;
        transform: translateY(-100px);
    }

    section.main span {
        color: #fffffe;
        font-size: 30px;
        font-weight: bold;
        transform: translateY(-200px);
    }

    section.main p {
        position: relative;
        top: 50%;
        border-right: 2px solid rgba(255, 255, 255, .75);
        white-space: nowrap;
        overflow: auto;
        color: #94a1b2;
        font-size: 13px;
        animation: typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 530ms steps(44) infinite normal;
        transform: translateY(-100px);
    }

    /* Add this CSS at the end of your existing CSS */
    .hobbies-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start; /* Wrap the items to the next line when there's not enough space */
    }

    .hobbies-container label {
        font-size: 20px;
        font-family: 'Bahnschrift', sans-serif;
        margin-right: 10px;
        margin-bottom: 10px; /* Adjust spacing between checkboxes */
    }
 /* Style the checkboxes */
/* Style the custom checkboxes */
.custom-checkbox {
    display: none; /* Hide the default checkbox */
}

/* Style the container for each hobby */
.hobby-container {
    display: flex;
    align-items: center; /* Align checkboxes vertically */
    margin-bottom: 10px; /* Add some spacing between hobbies */
}

/* Style the checkbox */
.custom-checkbox + .checkmark {
    position: relative;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border: 2px solid #333; /* Add border to checkbox */
    border-radius: 4px;
    cursor: pointer; /* Add cursor pointer */
}

/* Style the checked state of the custom checkboxes */
.custom-checkbox:checked + .checkmark {
    background-color: #fff; /* Change background color when checked */
}

/* Style the checkmark inside the checkbox */
.checkmark:after {
    content: "";
    position: absolute;
    display: none; /* Hide the checkmark by default */
}

/* Style the checked state of the checkmark */
.custom-checkbox:checked + .checkmark:after {
    display: block; /* Show the checkmark when checked */
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #000;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}

    .profile-section {
        position: absolute;
        top: 0;
        right: 0;
        top: 140px;
        text-align: left;
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 2s ease, transform 2s ease;
        font-size: 20px;
        line-height: 2;
        width: auto;
        overflow-y: auto;
        z-index: 998;
    }

    .main:hover .profile-section {
        opacity: 1;
        transform: translateX(150%);
    }

    #profileDetails h2 {
        display: inline; /* Add this line */
        white-space: nowrap; 
    }



    section.main ul {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    section.main ul li a {
        color: #a6a8b8;
        display: flex;
        text-decoration: none;
        margin: 20px 5px;
        font-size: 25px;
        padding: 5px;
        transition: 0.2s all;
    }

    section.main ul li a:hover {
        transition: 0.2s all;
        color: #fff;
    }

    @keyframes typewriter {
        from {
            width: 0;
        }
        to {
            width: 20.5em;
        }
    }

    @keyframes blinkTextCursor {
        from {
            border-right-color: rgba(255, 255, 255, .75);
        }
        to {
            border-right-color: transparent;
        }
    }

    @keyframes slideLeft {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-25%);
        }
    }


    @keyframes fadeInUp {
        from {
            transform: translate3d(0, 150px, 0)
        }
        to {
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
    }

    @keyframes fadeInDown {
        from {
            transform: translate3d(0, -150px, 0)
        }
        to {
            transform: translate3d(0, 0, 0);
            opacity: 1
        }
    }

    .edit-hobbies-overlay {
        position: fixed; /* Change to fixed */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: translateX(50px);
        z-index: 999;
    }

    .edit-hobbies-modal {
        background-color: #ffcc00;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 0 100vh rgba(0, 0, 0, 0.5); /* Updated box-shadow */
        width: 30vw; /* Adjust width to cover half the page */
        max-height: 100vh;
        overflow-y: auto;
        position: fixed; /* Ensure it stays fixed even when scrolling */
        top: 50%; /* Center vertically */
        left: 50%; /* Center horizontally */
        transform: translate(-50%, -50%);
        font-family: 'Roboto', sans-serif; /* Center the modal */
    }

    button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        transition-duration: 0.4s;
        cursor: pointer;
        margin-right: 20px;
        border-radius: 10px;
    }

    button:hover {
        background-color: #850911; /* Darker Green */
    }

    button.secondary {
        background-color: #f53333; /* Blue */
    }

    button.secondary:hover {
        background-color: #850911; /* Darker Blue */
    }

    /* Add this CSS for edit profile form styling */

#editProfileForm {
    text-align: left;
}

#editProfileForm label {
    display: block;
    margin-bottom: 10px;
    font-size: 17px;
    color: white;
}

#editProfileForm input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 16px;
    color: black;
}

#editProfileForm button {
    padding: 10px 20px;
    background-color: #ffcc00;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s;
}

#editProfileForm button:hover {
    background-color: #e6b800;
}

</style>