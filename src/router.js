import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import RegistrationForm from './pages/RegistrationForm.vue';
import UserDashboard from './pages/UserDashboard.vue';
import LoginForm from './pages/LoginForm.vue';

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
            component: HomePage
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
    ]
});

export { router };