
  <template>
    <div class="profile-container" v-if="user">
      <h2>Welcome back, {{ user.username }}!</h2>
      <div v-if="user">
        <div class="profile-field">
          <label>Username:</label>
          <div v-if="!editMode">{{ user.username }}</div>
          <InputText v-else v-model="user.username" placeholder="Enter your username" />
        </div>
        <div class="profile-field">
          <label>Email:</label>
          <div v-if="!editMode">{{ user.email }}</div>
          <InputText v-else v-model="user.email" placeholder="Enter your email" />
        </div>
        <div class="profile-field">
          <label>Hobbies:</label>
          <div v-if="!editMode">{{ user.hobbies.join(', ') }}</div>
          <div v-else class="hobbies">
            <div v-for="hobby in hobbyOptions" :key="hobby" class="hobby-item">
              <Checkbox v-model="selectedHobbies" :value="hobby" />
              <label>{{ hobby }}</label>
            </div>
          </div>
        </div>

        
        <div class="profile-field">
            <label>Birth Year:</label>
            <!-- Check if birthYear is an object and display the 'year' property -->
            <div v-if="!editMode">{{ user.birthYear.year ? user.birthYear.year : user.birthYear }}</div>
            <InputText v-else v-model.number="user.birthYear" type="number" placeholder="Enter your birth year" />
        </div>

        <Button label="Edit Profile" icon="pi pi-pencil" @click="toggleEditMode" v-if="!editMode" />
        <Button label="Save Changes" icon="pi pi-check" @click="saveProfile" v-if="editMode" />
        <Button label="Cancel" icon="pi pi-times" @click="cancelEdit" v-if="editMode" />
      </div>
      <div v-else>
        <p>Loading profile...</p>
      </div>
    </div>
  </template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import firebaseTools from '../firebase.js';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

export default {
  components: {
    InputText,
    Checkbox,
    Button
  },
  setup() {
    const router = useRouter();
    const user = ref(null);
    const editMode = ref(false);
    const selectedHobbies = ref([]);
    const hobbyOptions = ['Nature', 'Guided Tour', 'Cooking', 'Cultural', 'Fitness', 'Wellness', 
    'Art', 'Workshop', 'History', 'Wildlife', 'Entertainment', 'Social', 'Sightseeing', 'Dance', 
    'Food', 'Music', 'Water Sports', 'Culture'];
    
    const userId = 'H2ndpykRt4enidCVq8Nh3ktTCIj1';  // Replace with actual user ID logic

    onMounted(async () => {
      const docRef = doc(firebaseTools.db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        user.value = docSnap.data();
        selectedHobbies.value = user.value.hobbies;
      } else {
        console.error("No such document!");
      }
    });

    const toggleEditMode = () => {
      editMode.value = true;
    };

    const saveProfile = async () => {
      user.value.hobbies = selectedHobbies.value;
      const docRef = doc(firebaseTools.db, "users", userId);
      await updateDoc(docRef, { ...user.value, hobbies: selectedHobbies.value });
      editMode.value = false;
    };

    const cancelEdit = () => {
      editMode.value = false;
      // Reload user data to reset changes
      onMounted();
    };

    return {
      user,
      editMode,
      selectedHobbies,
      hobbyOptions,
      toggleEditMode,
      saveProfile,
      cancelEdit
    };
  }
};
</script>

  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background: #fff;
  }
  
  .profile-field {
    margin-bottom: 1em;
  }
  
  .profile-field label {
    font-weight: bold;
    margin-bottom: 0.2em; /* Tighter label spacing */
  }
  
  .profile-field div, .profile-field input[type='text'], .profile-field input[type='email'], .profile-field input[type='number'] {
    margin-left: 10px;
  }
  
  /* Styling for hobbies section using checkboxes */
  .hobbies {
    display: flex;
    flex-wrap: wrap;
    align-items: center; /* Aligns items vertically */
    margin-left: 10px; /* Aligns checkboxes with other fields */
  }
  
  .hobby-item {
    width: 33%; /* Makes each item take up one-third of the line */
    display: flex;
    align-items: center; /* Ensures the checkbox and label are aligned vertically */
    margin-bottom: 0.5em; /* Space between rows of checkboxes */
  }
  
  .hobby-item label {
    margin-left: 0.5em; /* Adds space between the checkbox and the label */
    user-select: none; /* Improves UX by preventing text selection */
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px 0;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  
<!-- 

  <style scoped>
  .profile-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  
  .profile-field {
    margin-bottom: 1em;
  }
  
  .profile-field label {
    font-weight: bold;
  }
  
  .profile-field div, input {
    margin-left: 10px;
  }
  </style>
  

 -->
