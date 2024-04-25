<template>
  <NavBar />
  <main class="explore-page">
    <h2 id="Explore">Just For You</h2>
    <div class="recommendation-list-wrapper">
    <div class="recommendation-list">
        <div v-for="recommendation in recommendations" :key="recommendation['Activity ID']" class="recommendation-item">
          <Card @click="accessPage(recommendation)" class="custom-card">
            <template #title>
              <h4>{{ recommendation.Type }}</h4>
            </template>
            <template #header>
              <div class="image-wrapper">
                <img class="image" alt="activity image" :src="getImage(recommendation['Activity ID'])"/>
              </div>
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
      // Need to link with profile page
    };
  },
  mounted() {
    this.loadData();
  },
  methods:{
    async loadData() {
      await this.getHobbies();
      this.retrieveData(this.tags);
    },

    async getHobbies() {
      const q = query(users, where('username', '==', 'username10')) // using sample data
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const userData = doc.data();
        this.tags = userData.hobbies;
        console.log(userData.hobbies);
      })
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

      while (filteredActivities.length != 6) {
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