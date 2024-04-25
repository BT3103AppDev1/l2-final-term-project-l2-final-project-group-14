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
                          <p>Rating: {{ this.activity.Rating }}</p>
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
                        on-icon="pi pi-heart-fill"
                        off-icon="pi pi-heart"
                        on-label="Remove from Favorite"
                        off-label="Add to Favorite"
                        @change="handleToggle"
                       
                      />
                    </div>
                    <div class="signup">
                      <!-- <Button label="Add to Favourite" icon="pi pi-heart" class="p-button-warning"></Button> -->
                      <Button label="Go to Sign up Page" class="p-button-success signup-button"></Button>
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
import { collection, getDoc, doc } from 'firebase/firestore';
const db = firebaseTools.db;
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import Textarea from 'primevue/textarea';
import CommentsForm from '../components/CommentsForm.vue';
import CommentsSection from '../components/CommentsSection.vue';
import ToggleButton from 'primevue/togglebutton';
import Footer from '@/components/Footer.vue';
import NavBar from '@/components/NavBar.vue';
const activitiesCollection = collection(db, 'activities');

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
          id: null
      }
  },
  mounted() {
      this.fetchActivity();
      console.log(this.activity);
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
              } else {
                  console.error('Activity not found');
              }
          } catch (error) {
              console.error('Error fetching activity:', error);
          }
      },
      getImage(id) {
          return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
      }
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



/* .signup-button {
background-color: grey; 
border-color: grey; 
box-shadow: lightgrey;
} */

.fav,
.signup {
flex-grow: 1; /* Grow to fill available space */
}

.p-togglebutton .p-button {
background-color: aquamarine;
}
.p-togglebutton .p-button .p-button-label, .p-togglebutton .p-button .p-button-icon {
  position: relative;
  font-weight: bold;
  color: pink;
  transition: none;
}

.p-togglebutton:not(.p-disabled):has(.p-togglebutton-input:hover):not(.p-highlight) .p-button {
color: pink;
background-color: aquamarine;
}

.custom-toggle-button,
.signup-button {
flex: 1; /* Occupy available horizontal space */
}
/* For overriding PrimeVue styles specifically, you might need to target inner elements */
.p-button-label {
color: #fff; /* This would make the text color white, for example */
font-weight: bold !important;
}

.category-tags {
margin-top: 10px; /* Add margin to create space between tags and buttons */
}

.category-tags .p-button-rounded {
font-size: small; /* Adjust font size */
padding: 6px 10px; /* Adjust padding */
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
