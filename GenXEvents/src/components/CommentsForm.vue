<template>
  <div class="rating-and-comment">
    <div class="rating-section">
      <Rating v-model="rating" :readonly="readOnly" :cancel="false" class="rating-stars" />
      <Button v-if="!readOnly" label="Submit" @click="submitRating" class="submit-button" />
    </div>

    <!-- Comment Section -->
    <div class="comment-section">
      <label for="comment">Comment</label>
      <Textarea v-model="comment" autoResize rows="5" cols="30" />
      <!-- <InputTextarea v-model="comment" rows="4" placeholder="Enter your comment here" /> -->
      <Button label="Submit" @click="submitComment" class="submit-button" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Rating from 'primevue/rating';
import Button from 'primevue/button';
import InputTextarea from 'primevue/inputtext';
import Textarea from 'primevue/textarea';

export default {
  name: 'RatingAndCommentComponent',
  components: {
    Rating,
    Button,
    InputTextarea,
    Textarea
  },
  props: {
    initialRating: Number,
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const rating = ref(props.initialRating || 0);
    const comment = ref('');

    const submitRating = () => {
      emit('rating-submitted', rating.value);
    };

    const submitComment = () => {
      if (comment.value.trim() === '') {
        alert('Please enter a comment.');
        return;
      }
      emit('comment-submitted', comment.value);
      comment.value = ''; // Clear the comment after submitting
    };

    return {
      rating,
      comment,
      submitRating,
      submitComment
    };
  }
};
</script>

<style scoped>
.rating-section {
  display: flex; /* This creates a flex container */
  align-items: center; /* This vertically centers the items in the container */
  gap: 0.5em; /* This adds some space between the items */
}

.rating-stars {
  with: 100px; /* Set a fixed width for the rating stars */
  margin-right: 0.5em; /* This adds some space to the right of the rating stars, if needed */
}

.comment-section {
  margin-top: 1em;
}

.comment-section textarea {
  margin-top: 10px; /* Adds space above the Textarea. Adjust as needed */
  width: 100%; /* Make the Textarea take up the full width of the container */
  border: lightgrey;
  border-style: groove;
}

.submit-button {
  margin-top: 1em;
  background-color: #ffcc00;
  border: none;
  color: #333; /* Choose a text color that has good contrast with the button color */
  padding-block: 0.5em; /* Add padding to make the button more clickable */
  width: 100%; /* Make the button take up the full width of the container */
}

.submit-button:hover {
  background-color: #ffbb00; /* Change the background color on hover */
}

/* Style the rating component */
:deep(.p-rating .p-rating-icon) {
    color: #ffcc00; /* Use your theme color for the rating stars */
}
</style>