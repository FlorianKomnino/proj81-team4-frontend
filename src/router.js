import { createRouter, createWebHistory } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import RegistrationForm from './pages/RegistrationForm.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/registration',
            name: 'RegistrationForm',
            component: RegistrationForm
        },
    ]
});

export { router };