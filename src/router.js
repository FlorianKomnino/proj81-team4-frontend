import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import AdvancedSearch from './pages/AdvancedSearch.vue';
import RegistrationForm from './pages/RegistrationForm.vue';
import UserDashboard from './pages/UserDashboard.vue';
import LoginForm from './pages/LoginForm.vue';
import SingleApartment from './pages/SingleApartment.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/search/:where?/:radius?/:beds?/:rooms?',
            name: 'search',
            component: AdvancedSearch
        },
        {
            path: '/registration',
            name: 'RegistrationForm',
            component: RegistrationForm
        },
        {
            path: '/userDashboard',
            name: 'UserDashboard',
            component: UserDashboard
        },
        {
            path: '/login',
            name: 'LoginForm',
            component: LoginForm
        },
        {
            path: '/apartment/:slug',
            name: 'apartment',
            component: SingleApartment
        }
    ]
});

export { router };