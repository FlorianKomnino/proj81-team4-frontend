<script>
import axios from 'axios';


export default {
    name: 'RegistrationForm',
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

        }
    },

    methods: {
        sendContactForm() {
            this.success = false;
            // invio il form
            this.loading = true;
            console.warn(this.name, this.email);
            const formData = {
                name: this.name,
                surname: this.surname,
                password: this.password,
                birth_date: this.birth_date,
                email: this.email,
            };
            axios.post(`${this.apiAddress}user`, formData).then((response) => {
                this.success = response.data.success;
                console.log(this.success);
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
}
</script>

<template lang="">
    <section class="contact-form">
        <div class="form-input p-3">


            <div class="alert alert-success mb-3" v-if="success">
                <p>
                    Your message has been sent succesfully!
                </p>
            </div>

            <div class="mb-4">
                <label for="contact_email" class="form-label">
                    Email
                </label>
                <div v-if="errors">
                    <small v-for="error in errors.email" class="is-invalid d-block text-danger ">
                        {{ error }}
                    </small>
                </div>

                <input type="text" class="form-control" id="contact_email" placeholder="Insert your email" v-model="email">
            </div>

            <div class="mb-4">
                <label for="contact_password" class="form-label">
                    Password
                </label>
                <div v-if="errors">
                    <small v-for="error in errors.password" class="is-invalid d-block text-danger ">
                        {{ error }}
                    </small>
                </div>
                <input type="password" class="form-control" id="contact_password" placeholder="Insert your password" v-model="password">
            </div>

            <div class="mb-4">
                <label for="contact_name" class="form-label">
                    Name
                </label>
                <div v-if="errors">
                    <small v-for="error in errors.name" class="is-invalid d-block text-danger ">
                        {{ error }}
                    </small>
                </div>
                <input type="text" class="form-control" id="contact_name" placeholder="Insert your name" v-model="name">
            </div>


            <div class="mb-4">
                <label for="contact_surname" class="form-label">
                    Surname
                </label>
                <div v-if="errors">
                    <small v-for="error in errors.surname" class="is-invalid d-block text-danger ">
                        {{ error }}
                    </small>
                </div>
                <input type="text" class="form-control" id="contact_surname" placeholder="Insert your surname" v-model="surname">
            </div>

            <div class="mb-4">
                <label for="contact_birth_date" class="form-label">
                    Birth Date
                </label>
                <div v-if="errors">
                    <small v-for="error in errors.birth_date" class="is-invalid d-block text-danger ">
                        {{ error }}
                    </small>
                </div>
                <input type="date" class="form-control" id="contact_birth_date" placeholder="Insert your birth date" v-model="birth_date">
            </div>



            <div class="mb-4">
                <button class="btn btn-primary" @click.prevent="sendContactForm">
                    Send contact form
                </button>
            </div>
        </div>
    </section>
</template>

<style lang="scss"></style>