<template>
    <div class="container p-5">
        <h3 class="text-center mt-2 mb-5">
            Login to your BoolBnB profile
        </h3>
        <div class="col-md-12">
            <p v-if="error" class="text-danger">please make sure to insert correct data. Not registered? <span @click="goToRegistrationForm" class="text-primary">click here</span> to register</p>
            <form v-on:submit.prevent="login_user">
                <div class="mb-3">
                    <label for="exampleFormControlInput2" class="form-label">
                        Enter Email
                    </label>
                    <input type="text" name="email" class="form-control" id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="Enter Email" v-model="form.email">
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput3" class="form-label">
                        Enter Password
                    </label>
                    <input type="password" name="password" class="form-control" id="exampleInputPass1"
                        aria-describedby="passHelp" placeholder="Enter Password" v-model="form.password">
                </div>                
                <button type="submit" class="btn btn-primary mt-5">log in</button>
            </form>
        </div>
    </div>
</template>



<script>
import axios from 'axios'
import { store } from '../store.js'
export default {

    components: {
    },
    data() {
        return {
            store,
            error: false,
            form: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        //user login function and api call
        login_user() {

            axios.post('http://127.0.0.1:8000/api/login', this.form)
                .then((resp) => {
                    console.log(resp["data"]["status"]);
                    $cookies.set('user_data', resp.data.data, '30s')
                    this.form.email = '';
                    this.form.password = '';
                    if (resp["data"]["status"] == "error") {
                        this.error=true
                        console.log(resp);
                    }
                    else {
                        this.store.userData = resp.data.data
                        this.goToDashboard()
                    }

                })
                .catch((e) => {
                    console.log(e);
                })
        },
        goToDashboard() {
            this.$router.push('/userDashboard')
        },
        goToRegistrationForm(){
            this.$router.push('/registration')
        }
    }
}
</script>

<style lang="scss" scoped>
span{
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
}
</style>