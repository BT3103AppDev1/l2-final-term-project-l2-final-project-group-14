
  <template>
    <div class="profile-container" v-if="user">
      <h2>This is your profile page, {{ user.username }}!</h2>
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
import firebaseTools from '../firebase.js';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';  // Import Firebase Auth
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
    const user = ref(null);
    const editMode = ref(false);
    const selectedHobbies = ref([]);
    const hobbyOptions = ['Nature', 'Guided Tour', 'Cooking', 'Cultural', 'Fitness', 'Wellness', 
    'Art', 'Workshop', 'History', 'Wildlife', 'Entertainment', 'Social', 'Sightseeing', 'Dance', 
    'Food', 'Music', 'Water Sports', 'Culture'];
    
    const auth = getAuth();  // Firebase Auth instance

    const loadUserData = async () => {
      const currentUser = auth.currentUser;  // Get the currently logged-in user
      if (currentUser) {
        try {
          const docRef = doc(firebaseTools.db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            user.value = {
              username: data.username || '',  // Default to empty if undefined
              email: data.email || '',
              birthYear: data.birthYear || '',
              hobbies: data.hobbies || []
            };
            selectedHobbies.value = user.value.hobbies;  // Make sure this is an array
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        console.error("User is not logged in.");
      }
    };

    onMounted(loadUserData);

    const toggleEditMode = () => {
      editMode.value = true;
    };

    const saveProfile = async () => {
      if (!user.value) {
        console.error("Cannot save profile without user being logged in!");
        return;
      }

      try {
        const docRef = doc(firebaseTools.db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { ...user.value, hobbies: selectedHobbies.value });
        editMode.value = false;
      } catch (error) {
        console.error("Error saving user profile:", error);
      }
    };

    const cancelEdit = () => {
      editMode.value = false;
      loadUserData();
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
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10px;
  }
  
  button:hover {
  }
  </style> 

