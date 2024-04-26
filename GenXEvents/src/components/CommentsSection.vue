<template>
  <div class="comments-section">
    <!-- Loop through each comment -->
    <div class="comment" v-for="(comment, index) in comments" :key="index">
      <div class="avatar">
        <!-- <Avatar image="comment.avatar" class="mr-2" size="xlarge" shape="circle" /> -->
        <!-- This will display the user's avatar -->
        <!-- <img :src="comment.avatar" alt="User avatar" /> -->
      </div>
      <div class="content">
        <div class="rating">
          <Rating v-model="comment.rating" readonly :cancel="false" />
          <!-- <Rating :value="comment.rating" readonly stars="5" :cancel="false" /> -->
        </div>
        <div class="message">{{ comment.message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Rating from 'primevue/rating';
import Avatar from 'primevue/avatar';

import firebaseTools from '@/firebase.js';
import { getDoc, doc, collection } from "firebase/firestore";
const { activitiesCollection } = firebaseTools.activitiesCollection;
// import { app, db, analytics, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, activitiesCollection } from '../firebase';


export default {
  name: 'CommentsSectionAgain',
  components: {
    Rating,
    // Avatar
  },
  setup() {
    // Example comments data
    const comments = ref([
      {
        // avatar: 'avatar-sample-1.png', // Replace with actual image paths
        
        rating: 2,
        message: 'Had fun doing this. Though, my eyesight is not good enough for this activity. very small.'
      },
      {
        // avatar: 'avatar-sample-2.png',
        rating: 5,
        message: 'Roared through this dino origami activity! Very fun. Can bring home to my grandsons. They love it!!!'
      }
      // ... more comments
    ]);
    //     // Fetch comments from Firebase based on activity ID
    //   const fetchComments = async (activityID) => {
    //   try {
    //     // Replace 'ratings' with your actual collection name
    //     const ratingsRef = RatingsCollection.doc(activityID);
    //     const doc = await ratingsRef.get();
    //     if (doc.exists) {
    //       const data = doc.data();
    //       // Map ratings and comments to the expected format
    //       const fetchedComments = Object.keys(data.comments).map(userId => ({
    //         // avatar: '', // Provide user avatar
    //         rating: data.ratings[userId],
    //         message: data.comments[userId]
    //       }));
    //       comments.value = fetchedComments;
    //     } else {
    //       console.log('No ratings found for activity ID:', activityID);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching comments:', error);
    //   }
    // };

    // // Fetch comments when component is mounted
    // onMounted(() => {
    //   const activityID = '2'; // Replace with actual activity ID passed from ActivityPage.vue
    //   fetchComments(activityID);
    // });

    return {
      comments
    };
  }
};
</script>

<style scoped>
.comments-section {
  
  /* Add your styles here */
}

.comment {
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  background: white;
  border-radius: 10px;
  padding: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1em;
}

.content {
  flex: 1;
}

.rating {
  /* Add custom styles if needed */
}

.message {
  margin-top: 0.5em;
  font-size: 0.9rem;
  color: #333;
}

/* Apply your theme color to the rating stars */
:deep(.p-rating .p-rating-icon) {
  color: #ffcc00;
}
</style>
