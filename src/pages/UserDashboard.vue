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
            name: '',
            surname: '',
            email: '',
            password: '',
            birth_date: '',
            errors: {},
            success: false,
            apiAddress: 'http://127.0.0.1:8000/api/',
            user:{},
            store
        }
    },
    methods: {
        getUserInfo(){
            axios.get(`${this.apiAddress}user/${this.store.userData.user_id}`).then((response) => {
                this.user = response.data.results;
                console.log(this.user)
                this.success = response.data.success;
                // console.warn(this.success);
                if (this.success) {
                    this.name = "";
                    this.surname = "";
                    this.email = "";
                    this.password = "";
                    this.birth_date = "";
                } else {
                    this.errors = response.data.errors;
                    console.warn(this.errors);
                }
                this.loading = false;
                //  se è andata bene fai a
                // altrimenti fai b
            })
        }
    },
    created() {
        this.getUserInfo()
    },
}
</script>

<template>
    <DashboardComponent :user="user"/>
</template>

<style lang="scss"></style>