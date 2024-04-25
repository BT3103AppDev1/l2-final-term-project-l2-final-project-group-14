import { createRouter, createWebHistory } from 'vue-router';
import ExplorePage from '@/views/ExplorePage.vue';
import SearchFilterPage from '../views/SearchFilterPage.vue';
import SignIn from '@/views/SignIn.vue';
import ActivityPage from '@/views/ActivityPage.vue';
import SignUp from '@/views/SignUp.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import LandingPage from '@/views/LandingPage.vue';
import FavouritePage from '@/views/FavouritePage.vue';

const routes = [
    {
        path: '/',
        name: 'Landing Page',
        component: LandingPage
    },

    {
        path: '/activity',
        name: 'Activity Page',
        component: ActivityPage
    },

    {
        path: '/explore',
        name: 'Explore Page',
        component: ExplorePage
    },

    {
        path: '/sign-up',
        name: 'Sign Up Page',
        component: SignUp
    },

    {
        path: '/login',
        name: 'Login Page',
        component: SignIn
    },

    {
        path: '/search',
        name: 'Search and Filter Page',
        component: SearchFilterPage
    },
    {

        path: '/favourite',
        name: 'Favourite Page',
        component: FavouritePage
    },

      {
        path: '/profile',
        component: ProfilePage,
        meta: { requiresAuth: true }  // Optional: for route guarding based on auth status
      }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

/* 
Components that require routes:

1. Landing page
2. Explore Page
3. Activity Page
4. Profile Page
5. Sign in and Register pages
6. Favourites page
7. Search and Filter Page
*/