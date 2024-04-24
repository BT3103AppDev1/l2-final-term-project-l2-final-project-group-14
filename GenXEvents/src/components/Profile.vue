<template>
    <div>
      <header>
        <nav>
          <div class="header_logo">
            <img src="../assets/benjamin-davies-P9BY2joAcwk-unsplash.jpg" alt="">
          </div>
          <div class="header_links">
            <ul class="nav_links">
              <li class="nav_link"><a href="#">Home</a></li>
              <!-- <li class="nav_link"><a href="#">Shop</a></li> -->
              <!-- <li class="nav_link"><a href="#">Repos</a></li> -->
            </ul>
          </div>
        </nav>
      </header>
  
      <section class="main">
        <img src="../assets/ben-o-bro-wpU4veNGnHg-unsplash.jpg" alt="">
        <span>{{ name }}</span>
        <p>{{ description }}</p>
        <ul>
          <li><a target="_blank" :href="linkedinUrl"><i class="fab fa-discord"></i></a></li>
          <li><a target="_blank" :href="githubUrl"><i class="fab fa-github"></i></a></li>
          <li><a target="_blank" :href="youtubeUrl"><i class="fab fa-youtube"></i></a></li>
        </ul>
  
        <div class="profile-section">
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
            <label for="dob">Date of Birth:</label>
            <input type="text" id="dob" v-model="dob">
            <br>
            <label for="hobbies">Hobbies:</label>
            <input type="text" id="hobbies" v-model="hobbies">
            <br>
            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" v-model="phoneNumber">
            <br>
            <button @click="saveProfile">Save</button>
          </div>
          <button @click="toggleEditing">{{ editing ? 'Cancel' : 'Edit Profile' }}</button>
        </div>
      </section>
    </div>
    
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "Felix Ivan Taslim",
        description: "Outdoor enthusiast, foodie and traveller",
        linkedinUrl: "https://www.linkedin.com/in/felix-ivan-taslim-5783b2222/",
        githubUrl: "https://github.com/BT3103AppDev1",
        youtubeUrl: "https://www.youtube.com/watch?v=15d2w0EKuWM&list=RD15d2w0EKuWM&start_radio=1&ab_channel=%E8%8A%92%E6%9E%9CTV%E9%9F%B3%E4%B9%90MangoTVMusic",
        email: "example@example.com",
        dob: "January 1, 1990",
        hobbies: "Hiking, Cooking, Reading",
        phoneNumber: "+1234567890",
        editing: false
      };
    },
    methods: {
      toggleEditing() {
        this.editing = !this.editing;
      },
      saveProfile() {
        // Save profile data to backend or perform necessary actions
        this.toggleEditing();
      }
    }
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
        color: #fff;
        font-family: Roboto, Arial, Helvetica, sans-serif;
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
        border: 5px solid #ffcc00;
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
        min-height: 10vh;
        animation: fadeInUp .8s slideLeft 2s ease-out forwards 2s;
    }

    section.main img {
        width: 150px;
        height: 150px;
        border-radius: 100%;
        object-fit: cover;
        border: 10px solid #ffcc00;
        cursor: pointer;
        margin-bottom: 10px;
        transform: translateX(50vh);
    }

    section.main span {
        color: #fffffe;
        font-size: 30px;
        font-weight: bold;
    }

    section.main p {
        position: relative;
        top: 10%;
        border-right: 2px solid rgba(255, 255, 255, .75);
        white-space: nowrap;
        overflow: hidden;
        color: #94a1b2;
        font-size: 13px;
        animation: typewriter 4s steps(44) 1s 1 normal both, blinkTextCursor 530ms steps(44) infinite normal;
    }

    /* Add this CSS at the end of your existing CSS */

    .profile-section {
        position: absolute;
        top: 0;
        right: 0;
        text-align: left;
        opacity: 0;
        transform: translateX(100%);
        transition: opacity 2s ease, transform 2s ease;
        font-size: 20px;
        line-height: 2;
        width: auto;
        overflow-y: auto;
    }

    .main:hover .profile-section {
        opacity: 1;
        top: 100px;
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
  </style>
  