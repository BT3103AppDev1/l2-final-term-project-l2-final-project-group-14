<template>
    <nav class="navbar">
        <div class="left-cont">
            <router-link to="/" class="nav-link-title">GenXEvent</router-link>
            <router-link to="/explore" class="nav-link">Explore</router-link>
            <router-link to="/favourites" class="nav-link">Favourites</router-link>
        </div>
        <div class="right-cont">
            <Button icon="pi pi-search" severity="success" rounded outlined aria-label="Search" @click="handleSearch" />
            <button v-if="loggedIn" @click="logout">Logout</button>
            <button @click="goToSignup" style="font-size: 1rem;">Signup</button>
            <button @click="goToLogin" style="font-size: 1rem;">Login</button>
        </div>
    </nav>
</template>

<script>
import Button from 'primevue/button';
import firebaseTools from '@/firebase';
const auth = firebaseTools.auth;


export default {
    name: 'navbar',
    data() {
        return {
            loggedIn: false
        }
    },
    mounted() {
        firebaseTools.onAuthStateChanged(auth, (user) => {
            if (user) {
                this.loggedIn = true;
            }
        })
    },
    methods: {
        async logout() { 
            signOut(this.auth)
                .then(() => {
                    this.loggedIn = false;
                    this.$router.push('/login'); // redirect to home page?
                })
                .catch((error) => {
                    console.error('Error signing out:', error);
                });
        },
        handleSearch() {
            this.$router.push('/search');
        },
        goToSignup() {
            this.$router.push('/sign-up');
        },
        goToLogin() {
            this.$router.push('/login');
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
    /* is it really text align tho -- or element align */
    text-align: right; 
    display: flex;
}

</style>