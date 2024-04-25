<template>
  <div class="sign-up-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signUp">
      <div class="p-field">
        <label for="username">Username</label>
        <InputText id="username" v-model="username" placeholder="Enter your username" />
      </div>

      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" type="email" placeholder="Enter your email" />
      </div>

      <div class="p-field">
        <label for="password">Password</label>
        <InputText id="password" v-model="password" type="password" placeholder="Enter your password" />
      </div>

      <div class="p-field">
        <label for="birthYear">Birth Year</label>
        <Dropdown id="birthYear" v-model="birthYear" :options="yearOptions" optionLabel="year" placeholder="Select your birth year" />
      </div>

      <div class="p-field">
        <label>Hobbies</label>
        <div class="hobbies">
          <div v-for="hobby in hobbyOptions" :key="hobby" class="hobby-item">
            <Checkbox v-model="selectedHobbies" :value="hobby" />
            <label>{{ hobby }}</label>
          </div>
        </div>
      </div>

      <Button label="Sign Up" type="submit" />
    </form>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import firebaseTools from '../firebase.js';
const firebaseAuth = firebaseTools.auth;
const db = firebaseTools.db;
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

export default {
  components: {
    InputText,
    Dropdown,
    Checkbox,
    Button
  },

  setup() {
    const router = useRouter();
    const username = ref('');
    const email = ref('');
    const password = ref('');
    const birthYear = ref(null);
    const selectedHobbies = ref([]);
    const hobbyOptions = ['Nature', 'Guided Tour', 'Cooking', 'Cultural', 'Fitness', 'Wellness', 
    'Art', 'Workshop', 'History', 'Wildlife', 'Entertainment', 'Social', 'Sightseeing', 'Dance', 
    'Food', 'Music', 'Water Sports', 'Culture'];

    const currentYear = new Date().getFullYear();
    const yearOptions = computed(() => {
        let years = [];
        for (let year = currentYear; year >= currentYear - 100; year--) {
          years.push({ year: year });
        }
        return years;
      });

    const signUp = async () => {
      console.log("Attempting signup...");
      try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email.value, password.value);
        console.log("User signed in:", userCredential.user.uid);

        await setDoc(doc(collection(db, 'users'), userCredential.user.uid), {
          username: username.value,
          email: email.value,
          birthYear: birthYear.value,
          hobbies: selectedHobbies.value
        });

        console.log("User data stored successfully.");
        router.push({ path: '/' });
        // this.$router.push({path: '/home'}); // Redirect to home page after successful signup
      } catch (error) {
        console.error("Signup failed:", error);
        alert(error.message);
      }
    };

    return {
      username,
      email,
      password,
      selectedHobbies,
      hobbyOptions,
      birthYear,
      yearOptions,
      signUp
    };
  }
};
</script>

<style scoped>
.sign-up-container {
  max-width: 500px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.p-field {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

.hobbies {
  display: flex;
  flex-wrap: wrap;
  align-items: center; /* Aligns items vertically */
}

.hobby-item {
  width: 33%; /* Makes each item take up one-third of the line */
  display: flex;
  align-items: center; /* Ensures the checkbox and label are aligned vertically */
}

.hobby-item label {
  margin-left: 0.5em; /* Adds space between the checkbox and the label */
}
</style>
