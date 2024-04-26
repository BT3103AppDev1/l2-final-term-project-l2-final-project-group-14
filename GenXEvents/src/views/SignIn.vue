<template>
  <NavBar />
  <div class="sign-in-container">
    <h2>Sign In</h2>
    <form @submit.prevent="signIn">
      <div class="p-field">
        <label for="email">Email</label>
        <InputText id="email" v-model="email" type="email" placeholder="Enter your email" />
      </div>

      <div class="p-field">
        <label for="password">Password</label>
        <InputText id="password" v-model="password" type="password" placeholder="Enter your password" />
      </div>

      <!-- <Button label="Sign In" type="Submit" /> -->
      <Button label="Sign In" type="Submit" class="sign-in-button" />
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import firebaseTools from '../firebase.js';
const firebaseAuth  = firebaseTools.auth;
import { signInWithEmailAndPassword } from "firebase/auth";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    InputText,
    Button,
    NavBar
  },

    data() {
      return {
        email: "",
        password: "",
        isWelcomeVisible: false,
        isErrorVisible: false
      };
    },
    methods: {
      async signIn() {
        const email = this.email;
        const password = this.password;
  
        try {
          // Sign in user with email and password
          await firebaseTools.signInWithEmailAndPassword(auth, email, password);
  
          // Signin successful, display welcome message
          this.isWelcomeVisible = true;
          this.isErrorVisible = false;
          console.log("User signed in:", auth.currentUser.uid);

          firebaseTools.onAuthStateChanged(auth, (user) => {
            if (user) {
              this.$router.push({ name: 'Explore Page'})
            }
          })
        } catch (error) {
          // Handle errors
          this.isWelcomeVisible = false;
          this.isErrorVisible = true;
          console.error(error);
        }
      },
      refreshPage() {
        location.reload(); // Refresh the page
      }
    },
  setup() {
    const router = useRouter();
    const email = ref('');
    const password = ref('');
    const errorMessage = ref(''); // Add a reactive property for error messages

    const signIn = async () => {
      console.log("Attempting sign-in...");
      errorMessage.value = ''; // Clear previous errors
      try {
        await signInWithEmailAndPassword(firebaseAuth, email.value, password.value);
        console.log("User signed in successfully.");
        router.push('/'); // Redirect to home page after successful sign-in
      } catch (error) {
        console.error("Sign-in failed:", error);
        errorMessage.value = error.message; // Set the error message to display on the UI
      }
    };

    return {
      email,
      password,
      signIn,
      errorMessage
    };
  }
}
</script>

<style scoped>
.sign-in-container {
  max-width: 360px;
  margin: 50px auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sign-in-button {
  width: 100%;
  margin-top: 1em;
  background-color: #ffcc00;
  padding-block: 0.5em;
}

.p-field {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>