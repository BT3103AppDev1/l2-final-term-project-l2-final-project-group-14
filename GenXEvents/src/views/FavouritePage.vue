<template>
  <NavBar />
  <main class="favourite-page">
    <h2 id="Favourite">Your recent favourites</h2>
    <div v-if="activities" class="recommendation-list-wrapper">
    <div class="recommendation-list">
        <div v-for="activity in activities" :key="activity['Activity ID']" class="recommendation-item">
          <Card @click="accessPage(activity)" class="custom-card">
            <template #title>
              <h4>{{ activity.Type }}</h4>
            </template>
            <template #header>
              <div class="image-wrapper">
                <img class="image" alt="activity image" :src="getImage(activity['Activity ID'])"/>
              </div>
            </template>
            <template #content>
              <div class="tags">
                <Tag v-for="tag in activity.Tags.split(',')" :key="tag" :value="tag.trim()" class="tag" severity="secondary"></Tag>
              </div>
              <p style="font-size: small;">{{ activity['Location Estate'] }}</p>
              <p style="font-size: small;">{{ activity.DateTime }}</p>
            </template>
          </Card>
        </div>
    </div>
    </div>
    <div v-else>
      <h4 style="padding: 1em;">You do not have any favourite activities yet!</h4>
    </div>
  </main>
  <Footer />
</template>



<script>
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import firebaseTools from '@/firebase';
import { collection, getDoc, doc } from 'firebase/firestore';
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
      activities: null,
      favouriteIds: null
    };
  },
  mounted() {
    this.loadData();
  },
  methods:{
    async loadData() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await this.getFavourites();
        this.retrieveData(this.favouriteIds);
      }
    },

    async getFavourites() {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            this.favouriteIds = data.favorites;
            console.log(data.favorites);
            console.log(this.favouriteIds)
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

    async retrieveData(favouriteIds) {
      const favourites = []
      for (const id of favouriteIds) {
        const docRef = doc(activityCollection, id);
        const activityDoc = await getDoc(docRef);
        const activity = activityDoc.data();
        favourites.push(activity);
      }
      this.activities = favourites;
      console.log(this.activities);
    },

    // to access page upon clicking the activity
    accessPage(activity) {
      console.log("Directed to the activity page");
      this.$router.push({ 
        name: 'Activity Page', 
        query: {
          id: activity["Activity ID"]
        } 
      })
    }
  }
}
</script>

<style scoped>
@import '@/assets/FavouritePage.css';
</style>