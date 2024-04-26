<template>
  <NavBar />
  <main class="explore-page"> <!-- Existing margin around the main content -->
    <h2 id="Explore">Just For You</h2>
    <div v-if="recommendations" class="recommendation-list-wrapper">
      <!-- Bootstrap container for better control of content width and margins, added bottom margin -->
      <div class="container mb-5"> <!-- Added 'mb-5' for margin-bottom to create space above the footer -->
        <div class="row g-3"> <!-- g-3 provides gaps between the cards -->
          <div v-for="recommendation in recommendations" :key="recommendation['Activity ID']" class="col-sm-6 col-md-4 col-lg-3">
            <Card @click="accessPage(recommendation)" class="d-flex flex-column" style="height: 450px;">
              <template #title>
                <h4>{{ recommendation.Type }}</h4>
              </template>
              <template #header>
                <img class="w-100" alt="activity image" :src="getImage(recommendation['Activity ID'])" style="height: 250px;" />
              </template>
              <template #content>
                <div class="tags">
                  <Tag v-for="tag in recommendation.Tags.split(',')" :key="tag" :value="tag.trim()" class="tag" severity="secondary"></Tag>
                </div>
                <p style="font-size: small;">{{ recommendation['Location Estate'] }}</p>
                <p style="font-size: small;">{{ recommendation.DateTime }}</p>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>





<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import firebaseTools from '@/firebase';
import { collection, getDocs, getDoc, doc, query, where } from 'firebase/firestore';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
const db = firebaseTools.db;
const activityCollection = collection(db, 'activities');
const users = collection(db, 'users');
const auth = firebaseTools.auth;


export default {
  components: {
    Card,
    Tag,
    NavBar,
    Footer
  },
  data() {
    return {
      recommendations: null,
      tags: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods:{
    async loadData() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await this.getHobbies();
        this.retrieveData(this.tags);
      } else {
        await this.retrieveRandomActivities();
      }
    },

    async retrieveRandomActivities() {
      const querySnapshot = await getDocs(activityCollection);
      const activities = [];
      querySnapshot.forEach(doc => {
        activities.push(doc.data());
      });
      const randomActivities = this.shuffleArray(activities).slice(0, 8);
      this.recommendations = randomActivities;
      console.log(this.recommendations);
    },

    shuffleArray(array) {
      // Fisher-Yates shuffle algorithm
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },

    async getHobbies() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            this.tags = data.hobbies
            console.log(this.tags)
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not logged in.");
      }
    },

    getImage(id) {
      return `https://nus-392633763.imgix.net/img_${id}.jpeg`;
    },

    async retrieveData(tags) {
      const querySnapshot = await getDocs(activityCollection);  
      const filteredActivities = [];
      const uniqueId = new Array();
      const recommendationId = new Array();

      for (const tag of tags) {
        querySnapshot.forEach(doc => {
            const activity = doc.data();
            if (activity.Tags && activity.Tags.includes(tag)) {
              if (!uniqueId.includes(activity['Activity ID'])) {
                uniqueId.push(activity['Activity ID']);
                // All possible activities with the relevant tags
              }
            }
        });
      }

      while (filteredActivities.length != 8) {
        const randomIndex = Math.floor(Math.random() * uniqueId.length);
        const id = uniqueId[randomIndex];
        const docRef = doc(activityCollection, id);
        const activityDoc = await getDoc(docRef);
        const activity = activityDoc.data();
        if (!recommendationId.includes(activity['Activity ID'])) {
          filteredActivities.push(activity);
          recommendationId.push(activity['Activity ID']);
          // 6 random activity IDs from uniqueId (ensure no duplicates)
        }
      }
      
      this.recommendations = filteredActivities;
      console.log(uniqueId);
      console.log(filteredActivities);
    },

    // to access page upon clicking the activity
    accessPage(recommendation) {
      console.log("Directed to the activity page");
      this.$router.push({ 
        name: 'Activity Page', 
        query: {
          id: recommendation["Activity ID"]
        } 
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/ExplorePage.css';
</style>