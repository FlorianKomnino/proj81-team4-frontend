<script>
import axios from 'axios';
import { store } from '../store.js';
import DashboardComponent from '../components/DashboardComponent.vue'

export default {
    name: 'UserDashboard',
    components:{
        DashboardComponent
    },
    data() {
        return {
            user:{},
        }
    },
    methods: {
        useCookies(){
            if ($cookies.isKey('user_data')) {
                this.user = $cookies.get('user_data')
            } else {
                this.$router.push('/login')
            }
        }
    },
    created() {
        this.useCookies()
    },
}
</script>

<template>
    <DashboardComponent :user="user"/>
</template>

<style lang="scss"></style>