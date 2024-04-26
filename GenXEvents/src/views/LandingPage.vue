<!-- <template>
  <div id="app">
    <NavBar />
    <div class="hero-image">
      <h1>Join GenXEvents now!</h1>
      <p>Find exciting events in Singapore!</p>
    </div>
    
    <section class="upcoming-events">
      <h2>Exciting Upcoming Events</h2>
      <div class="events-container">
        <div class="horizontal-scroll-container">
          <div v-for="event in events" :key="event['Activity ID']" class="p-col-12 p-md-4 p-lg-3">
            <Card class="custom-card" @click="accessPage(event)">
              <template #header>
                <img :src="getImage(event['Activity ID'])" alt="Event Image" class="card-image">
              </template>
              <template #content>
                <div class="p-card-title">{{ event.Type }}</div>
                <div class="p-card-subtitle">{{ event.DateTime }}</div>
                <div class="p-card-footer">{{ event.Location }}</div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <Footer />

  </div>
</template> -->

<template>
  <div id="app">
    <NavBar />
    <div class="hero-image">
      <h1>Join GenXEvents now!</h1>
      <p>Find exciting events in Singapore!</p>
    </div>
    
    <!-- Exciting Upcoming Events Section -->
    <section class="upcoming-events">
      <h2>Exciting Upcoming Events</h2>
      <div class="container"> <!-- Bootstrap container for proper alignment and responsiveness -->
        <div class="row g-3"> <!-- Using Bootstrap's row and g-3 for spacing between cards -->
          <div v-for="event in events" :key="event['Activity ID']" class="col-sm-6 col-md-4 col-lg-3">
            <Card @click="accessPage(event)" class="d-flex flex-column" style="height: 100%;">
              <template #header>
                <img :src="getImage(event['Activity ID'])" alt="Event Image" class="w-100" style="height: 200px;"> <!-- Ensured image takes full width of the card and fixed height -->
              </template>
              <template #content>
                <div class="p-card-title">{{ event.Type }}</div>
                <div class="p-card-subtitle">{{ event.DateTime }}</div>
              </template>
              <template #footer>
                <div class="p-card-footer">{{ event.Location }}</div>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </div>
</template>


<script>
import Card from 'primevue/card';
import firebaseTools from '@/firebase';
import NavBar from '@/components/NavBar.vue';
import { getDocs, doc, getDoc } from 'firebase/firestore';
import Footer from '@/components/Footer.vue';
const activitiesCollection = firebaseTools.activitiesCollection;

export default {
  name: 'App',
  components: {
    Card,
    NavBar,
    Footer
  },
  data() {
    return {
      events: []
    };
  },
  created() {
    this.fetchEvents();
  },
  methods: {
    getImage(id) {
      return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
    },

    accessPage(event) {
      console.log("Directed to the activity page");
      this.$router.push({ 
        name: 'Activity Page', 
        query: {
          id: event["Activity ID"]
        } 
      })
    },

    async fetchEvents() {
      const uniqueId = []
      while (this.events.length != 8) {
        const randomIndex = Math.floor(Math.random() * 61);
        const docRef = doc(activitiesCollection, String(randomIndex));
        const activityDoc = await getDoc(docRef);
        const activity = activityDoc.data();
        if (!uniqueId.includes(activity['Activity ID'])) {
          this.events.push(activity);
          uniqueId.push(activity['Activity ID']);
        }
      }
    }
  }
};
</script>

<style>
.hero-image {
  background-image: url('@/assets/joshua-earle-C6duwascOEA-unsplash.jpg'); /* Replace with your image path */
  background-size: cover; /* Cover the entire area of the element */
  background-position: center; /* Center the background image */
  text-align: center; /* Center the text inside the container */
  padding: 50px 0; /* Add some padding around the text */
  color: white; /* Set the text color to white for better visibility */
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.upcoming-events {
  padding: 1.2em;
}

.horizontal-scroll-container {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.p-col-12 {
  flex: 0 0 auto;
}

.custom-card {
  cursor: pointer;
}

.custom-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}
</style>