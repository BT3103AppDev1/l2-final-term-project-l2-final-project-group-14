<template>
    <nav class="navbar">
        <div class="left-cont">
            <router-link to="/" class="nav-link-title">GenXEvent</router-link>
            <router-link to="/explore" class="nav-link">Explore</router-link>
            <router-link to="/favourite" class="nav-link">Favourites</router-link>
        </div>
        <div class="right-cont">
            <Button icon="pi pi-search" severity="success" rounded outlined aria-label="Search" @click="handleSearch" class="search-button"/>
            <span v-if="loggedIn">
                <Button icon="pi pi-user" :label="username" class="user-profile-button yellow-button" @click="goToProfile" />
                <Button @click="logout" style="font-size: 1rem;" class="yellow-button">Logout</button>
            </span>
            <span v-else>
                <Button @click="goToSignup" style="font-size: 1rem;" class="yellow-button">Signup</button>
                <Button @click="goToLogin" style="font-size: 1rem;" class="yellow-button">Login</button>
            </span>
        </div>
    </nav>
</template>

<script>
import Button from 'primevue/button';
import { useRouter } from 'vue-router'; 
import firebaseTools from '@/firebase';
const auth = firebaseTools.auth;
const onAuthStateChanged = firebaseTools.onAuthStateChanged;
const signOut = firebaseTools.signOut;
const db = firebaseTools.db; 
const doc = firebaseTools.doc;
const getDoc = firebaseTools.getDoc;

export default {
    name: 'navbar',
    data() {
        return {
            loggedIn: false,
            username: '', // Store username
            userId: '',
        }
    },

    setup() {
        const router = useRouter(); // Initialize router instance

        return { router }; // Return router to use it in Options API methods
    },

    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.loggedIn = true;
                // Immediately invoked async function to handle Firestore data fetching
                (async () => {
                    const userDoc = doc(db, 'users', user.uid);
                    try {
                        const docSnapshot = await getDoc(userDoc);
                        if (docSnapshot.exists()) {
                            this.username = docSnapshot.data().username; // Set username from Firestore
                            this.userId = user.uid; // Set userId from Firestore
                        } else {
                            console.error('User data not found in Firestore');
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                })();
            } else {
                this.loggedIn = false;
                this.username = ''; // Clear username
                this.userId = ''; // Clear userId
                
            }
        });
    },


    methods: {
        async logout() { 
            try {
                await signOut(auth);
                this.loggedIn = false;
                this.username = '';
                this.router.push('/login');
                // this.$router.push('/login'); // Redirect to login page after logout
            } catch (error) {
                console.error('Error signing out:', error);
            }
        },
        handleSearch() {
            this.router.push('/search');
        },
        
        goToSignup() {
            this.router.push('/sign-up');
        },
        goToLogin() {
            this.router.push('/login');
        },
        goToProfile() {
        this.router.push('/profile');
    },
    },
    components: {
        Button
    }
};
</script>




<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background-color: #f0f0f0;
    color: #333;
    font-size: 0.8rem;
}

.nav-link-title {
    font-weight: bold;
    font-size: 1.5rem;
    color: #333;
}

.nav-link {
    margin-top: 10px;
    margin-left: 50px;
    color: #333;
    font-size: 1rem;
}

.left-cont {
    margin-right: 10px;
    text-align: left;
    display: flex;
}

.right-cont button {
    margin-right: 10px;
}

.right-cont {
    text-align: right; 
    display: flex;
}

.search-button {
  background-color: #ffcc00; /* Hex code for the yellow color */
  border-color: #ffcc00; /* Make the border the same color for consistency */
}

.yellow-button {
  background-color: #ffcc00; /* Hex code for the yellow color */
  border-color: #ffcc00; /* Make the border the same color for consistency */
  padding: 0.5em; /* Add padding to make the button more clickable */
}

</style>