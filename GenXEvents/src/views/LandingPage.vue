<template>
  <div id="app">
    <NavBar />
    <h1>Join GenXEvents now!</h1>
    <p>Find exciting events in Singapore!</p>
    
    <!-- Exciting Upcoming Events Section -->
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
    
    <!-- Choose Events by Your Interests Section -->
    <section class="events-by-interest">
      <h2>Choose events by your interests</h2>
      <div class="events-container">
        <div class="horizontal-scroll-container">
          <div v-for="event in eventsByInterest" :key="event['Activity ID']" class="p-col-12 p-md-4 p-lg-3">
            <Card class="custom-card" @click="accessFilterPage(event)">
              <template #header>
                <img :src="getImage(event['Activity ID'])" alt="Event Image" class="card-image">
              </template>
              <template #content>
                <div class="p-card-title">{{ getCategory(event['Activity ID']) }}</div>
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
      events: [],
      eventsByInterest: [],
      interests: ['Fitness', 'Cultural', 'Workshop', 'Wildlife', 'Food']
    };
  },
  created() {
    this.fetchEvents();
    this.fetchEventsByInterest(this.interests);
  },
  methods: {
    getImage(id) {
      return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
    },

    getCategory(activityId) {
      const index = this.eventsByInterest.findIndex(event => event['Activity ID'] === activityId);
      if (index !== -1) {
        return this.interests[index];
      } else {
        return "Unknown"; // or some default value if the activity ID is not found
      }
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

    accessFilterPage(event) {
      console.log("Directed to the filter page");
      this.$router.push({ 
        name: 'Search and Filter Page', 
        query: {
          filter: this.getCategory(event['Activity ID'])
        } 
      })
    },

    async fetchEventsByInterest(interests) {
      try {
        const querySnapshot = await getDocs(activitiesCollection);  
        const uniqueId = new Set();
        interests.slice(0, 5).forEach(interest => {
          if (uniqueId.size >= 5) return; 
          querySnapshot.forEach(doc => {
            const activity = doc.data();
            if (activity.Tags && activity.Tags.includes(interest)) {
              if (!uniqueId.has(activity['Activity ID'])) {
                this.eventsByInterest.push(activity);
                uniqueId.add(activity['Activity ID']);
                return;
              }
            }
          });
        });
        console.log(this.eventsByInterest);
      } catch (error) {
        console.error('Error fetching events by interest:', error);
      }
    },

    async fetchEvents() {
      const uniqueId = []
      while (this.events.length != 5) {
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
.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
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
  