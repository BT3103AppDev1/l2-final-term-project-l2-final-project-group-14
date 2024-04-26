<template>
  <div class = "NavBar">
    <NavBar />
          </div>
          <div class= "content-wrapper" v-if="this.activity">
              <div class="activity-details">
              <div class="left-column">
                  <div class="header">
                      <h2>{{ this.activity.Type }}</h2>
                      <div class="rating">
                          <p>Rating: {{ rating }}</p>
                      </div>
                  </div>
    
                  <div class="session-details">
                      <p>Upcoming Date and Time: {{ this.activity.DateTime }}</p>
                      <div class="activity-images">
                          <!-- <img :src="activityImageUrl" alt="Activity Image1" /> -->
                          <img :src="getImage(this.activity['Activity ID'])" alt="Activity Image" />
                      </div>
                          <p>{{ this.activity.Description }}</p>
                          <p> Cost: ${{ this.activity.Cost }}</p>
                          <div class="location">
                              <i class="pi pi-map-marker"></i>
                              <p>Location: {{ this.activity.Location }}, {{ this.activity['Location Estate'] }}</p>
                          </div>
  
                          <div class="other-dates">
                              <h3>Other Upcoming Dates</h3>
                              <p v-for="(date, index) in this.activity['otherDates'] || []" :key="index">{{ date }}</p>
                          </div>
                      </div>
                  </div>
              </div>
  
              <div class="right-column">
                    <div class="fav"> 
                      <ToggleButton
                        v-model="isFavorite"
                        :class="['toggle-button-full', isFavorite ? 'favorite-on' : 'favorite-off']"
                        on-icon="pi pi-heart-fill"
                        off-icon="pi pi-heart"
                        on-label="Remove from Favorite"
                        off-label="Add to Favorite"
                        styleclass="different"
                        @change="handleToggle"
                      />
                    </div>
                    <div class="signup">
                      <Button label="Go to Sign up Page"  @click="goToSignUpPage" class="signup-button"></Button>

                      <!-- <Button label="Add to Favourite" icon="pi pi-heart" class="p-button-warning"></Button> -->
                      <!-- <Button label="Go to Sign up Page" class="p-button-success signup-button"></Button> -->
                    </div>
  
                  <div class="category-tags">
                    <Button v-for="(tag, index) in tags" :key="index" :label="tag" class="p-button-rounded p-button-outlined" disabled></Button>
                    <!-- <Button label="Fitness" class="p-button-rounded p-button-outlined" disabled></Button>
                    <Button label="Cultural" class="p-button-rounded p-button-outlined" disabled></Button> -->
                    <!-- Add more tags as needed -->
                  </div>
              <div class="comments">
                  <h3>Rate this activity and leave a comment</h3>
                  <CommentsForm />
              </div>
              <div class="user-comments">
                  <h3>Users’ rating and comments</h3>
                  <div class="comment">
                      <CommentsSection />
                  </div>
              </div>
            </div>
          </div>
          <div class = "Footer">
            <Footer />
          </div>
    </template>

<script>
import firebaseTools from '../firebase.js';
import { collection, getDoc, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
const db = firebaseTools.db;
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import CommentsForm from '../components/CommentsForm.vue';
import CommentsSection from '../components/CommentsSection.vue';
import Footer from '@/components/Footer.vue';
import NavBar from '@/components/NavBar.vue';
const activitiesCollection = collection(db, 'activities');
import { getAuth } from 'firebase/auth';
import ToggleButton from 'primevue/togglebutton';

export default {
  name: 'Activity Page',
  components: {
    Rating,
    Button,
    Textarea,
    CommentsForm,
    CommentsSection,
    ToggleButton,
    Footer,
    NavBar
  },
  data() {
      return {
          activity: null,
          id: null,
          isFavorite: null,
          tags: ['Fitness', 'Cultural'],
          rating: 4.5,

      }
  },
  mounted() {
    this.fetchActivity().then(() => {
        console.log(this.activity);
        this.checkFavorite();
    }).catch(error => {
        console.error('Failed to fetch activity:', error);
    });
  },

  methods: {
      async fetchActivity() {
          try {
              const activityId = this.$route.query.id;
              console.log(activityId);
              const docRef = doc(activitiesCollection, activityId);
              const activityDoc = await getDoc(docRef);
              console.log(activityDoc.data());
              if (activityDoc.data()) {
                  this.activity = activityDoc.data();
                  this.id = activityId;
                  // this.rating = this.activity.Rating;
                  if (this.activity.Tags && this.activity.Tags.trim().length > 0) {
                // Split the tags string by comma and map to trim any leading/trailing whitespace
                      this.tags = this.activity.Tags.split(',').map(tag => tag.trim());
                  } else {
                      this.tags = []; // Ensure tags is an empty array if there are no tags
                  }
              } else {
                  console.error('Activity not found');
              }
          } catch (error) {
              console.error('Error fetching activity:', error);
          }
      },
      getImage(id) {
          return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
      },

      async checkFavorite() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        if (currentUser) {
            const docRef = doc(db, 'users', currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Check if the favorites array includes this activity ID
                if (data.favorites && data.favorites.includes(this.id)) {
                    this.isFavorite = true;
                } else {
                    this.isFavorite = false;
                }
            } else {
                console.log("No such user document!");
                this.isFavorite = false; // Ensure default is set if the document doesn't exist
            }
        } else {
            console.log("No current user logged in.");
            this.isFavorite = false; // Ensure default is set if no user is logged in
        }
      },

      async handleToggle() {
          const auth = getAuth();
          const currentUser = auth.currentUser;
          if (currentUser) {
              const docRef = doc(db, 'users', currentUser.uid);
              if (this.isFavorite) {
                  await updateDoc(docRef, {
                      favorites: arrayUnion(this.id)
                  });
              } else {
                  await updateDoc(docRef, {
                      favorites: arrayRemove(this.id)
                  });
              }
          }
      },

      goToSignUpPage() {
        if (this.activity && this.activity.Link) {
            window.location.href = this.activity.Link;
        } else {
            console.error('Sign-up link not available');
        }
      },
    
  }
}
</script>

<style scoped>
.content-wrapper {
display: flex;
justify-content: space-between;
gap: 20px; /* Adjust the gap between columns as necessary */
}

.left-column {
flex: 2; /* Adjust the ratio between left and right columns as needed */
max-width: 1000px;
}

.right-column {
flex: 0 1 300px; /* Adjust the ratio between left and right columns as needed */
/* max-width:300px;
padding: 1em; */
margin-right: auto;
display: flex;
flex-direction: column;
}
.activity-details {
  font-family: 'Arial', sans-serif;
  max-width: 800px;
  margin-left: auto;
  border: 1px solid #ddd;
  padding: 1em;
  border-radius: 8px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.rating {
background-color: #f59e0b;
padding: 8px 12px; /* Some padding for spacing */
border-radius: 5px; /* Rounded corners */
display: inline-block; /* Makes the div inline so it only takes up as much space as needed */
margin: 0; /* Adjust the margin as necessary */
line-height: 1; /* Adjust line height to ensure it looks good with your font-size */
}

.rating p {
margin: 0; /* Remove default paragraph margin */
color: white; /* Dark text for contrast */
font-weight: bold; /* Optional: makes the text bold */
}

.session-details {
  margin-top: 1em;
}

.activity-images {
text-align: center;
margin: 16px 0;
width: 100%; /* Adjust to desired maximum width */
max-width: 1000px; /* Set a max-width if necessary */
height: auto; /* Height is set to auto to maintain aspect ratio */
position: relative; /* Positioned relative for absolute positioning of ::before pseudo-element */
overflow: hidden; /* Ensures no spillover if the image is larger than the container */
}

.activity-images::before {
content: '';
display: block;
padding-top: 66.66%; /* This percentage controls the aspect ratio; 66.66% for 3:2 ratio */
/* for a 16:9 ratio, use padding-top: 56.25%; */
}

.activity-images img {
position: absolute; /* Absolute positioning to fit into the container */
top: 0;
left: 0;
width: 100%; /* Image will scale to the width of the container */
height: 100%; /* Image will scale to the height of the container */
object-fit: cover; /* Ensures the image covers the container, maintaining its aspect ratio */
}



.location {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 1em;
}

.pi-map-marker {
  font-size: 1.5em;
  color: #ff9900;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1em;
  color:#ff9900;
}

.sign-up-button {
  width: 100%;
  margin-top: 1em;
  background-color: #ffcc00;
  padding-block: 0.5em;
}

.different.ui-togglebutton.ui-button.ui-state-active {
  background-color: #ffcc00 !important;
  color: #333;

}
/* Newly added, not tested. Custom styles for the toggle button */
.toggle-button-full {
  width: 100%; /* Ensures the button takes the full width of its container */
  font-weight: bolder; /* Makes the font bold */
  font-size: 1.2em; /* Increases the font size */
  padding-block: 1.2em;
  /* background-color: #ffcc00; */
}

/* .favorite-on {
  background-color: grey !important; 
  border-color: grey !important; 
} */
/* 
.favorite-off {
  background-color: #ffcc00 !important; 
  border-color: #ffcc00 !important; 
} */

.fav,
.signup {
flex-grow: 1; /* Grow to fill available space */
}

.signup-button {
  width: 100%; /* Make the button take up the full width */
  background-color: grey ;
  margin-top: 1em; /* Add space above the button */
  padding: 0.5em; /* Add padding to make the button more clickable */
  color: white; /* Choose a text color that has good contrast with the button color */
}

.ui-togglebutton.ui-button.ui-state-active {
  background-color: #ffcc00 !important;
  color: #333;

}

.p-component {
  font-weight: bolder;
}

.p-togglebutton .p-highlight {
background-color: blue !important;
}
/* .input.p-togglebutton-input {
background-color: #ffcc00 !important;

} */


.category-tags .p-button-rounded {
  margin: 0.5em; /* Adjust margin as needed */
font-size: small; /* Adjust font size */
padding: 6px 10px; /* Adjust padding */
background-color: #ffcc00;
}

.comments,
.user-comments {
  margin-top: 2em;
}

.comment {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 0.5em;
  margin-top: 1em;
}

.other-dates {
  margin-top: 1em;
  padding: 1em;
  background-color: #f0f0f0;
  border-radius: 8px;
}
</style>
