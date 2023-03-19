<script>
import axios from 'axios';
import { store } from '../store';

export default {
    name: 'ApartmentCreationForm',

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
            store

        }
    },


    methods: {
        sendApartmentForm() {
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
            const loginData = {
                email: this.email,
                password: this.password
            };
            axios.post(`${this.apiAddress}user`, formData).then((response) => {
                this.success = response.data.success
                if (this.success == undefined) {
                    axios.post('http://127.0.0.1:8000/api/login', loginData)
                        .then((resp) => {
                            console.log(resp["data"]["status"]);
                            //this.loadlist();
                            //reset form
                            console.log('ciao')
                            this.name = "";
                            this.surname = "";
                            this.email = "";
                            this.password = "";
                            this.birth_date = "";
                            this.store.userData = resp.data.data
                            this.goToDashboard()
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                } else {
                    this.errors = response.data.errors;
                    console.warn(this.errors);
                }
                this.loading = false;
                //  se è andata bene fai a
                // altrimenti fai b
            })
        },
        goToDashboard() {
            this.$router.push('/userDashboard')
        }
    },
}

</script>


<!-- 

Titolo riepilogativo che descriva l’appartamento
Numero di stanze
Numero di letti
Numero di bagni
Metri quadrati
Indirizzo completo (con latitudine e longitudine)
Immagine rappresentativa dell’appartamento
uno o più servizi aggiuntivi: 
WiFi, Posto Macchina, Piscina, Portineria, Sauna, Vista Mare…
visibile si/no

-->



<template>
    <div>
        <section class="contact-form">
            <div class="form-input p-3">

                <div class="mb-4">
                    <label for="apartment_title" class="form-label">
                        Titolo
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentTitle" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>

                    <input type="text" class="form-control" id="apartment_title"
                        placeholder="Inserisci un titolo per il tuo appartamento" v-model="apartmentTitle">
                </div>

                <div class="mb-4">
                    <label for="apartment_rooms" class="form-label">
                        Stanze
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentRooms" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="number" class="form-control" id="apartment_rooms"
                        placeholder="Inserisci il numero di stanze del tuo appartamento" v-model="apartmentRooms">
                </div>


                <div class="mb-4">
                    <label for="apartment_beds" class="form-label">
                        Letti
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentBeds" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="number" class="form-control" id="apartment_beds"
                        placeholder="Inserisci il numero di letti presenti nel tuo appartamento" v-model="apartmentBeds">
                </div>

                <div class="mb-4">
                    <label for="apartment_bathrooms" class="form-label">
                        Bagni
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentBathrooms" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="number" class="form-control" id="apartment_bathrooms"
                        placeholder="Inserisci il numero di bagni del tuo appartamento" v-model="apartmentBathrooms">
                </div>

                <div class="mb-4">
                    <label for="apartment_bathrooms" class="form-label">
                        Metri quadrati
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.squareMeteres" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="number" class="form-control" id="apartment_bathrooms"
                        placeholder="Inserisci il numero di metri quadrati del tuo appartamento" v-model="squareMeteres">
                </div>

                <div class="mb-4">
                    <label for="apartment_address" class="form-label">
                        Indirizzo completo
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentAddress" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="text" class="form-control" id="apartment_address"
                        placeholder="Inserisci l'indirizzo completo dell'appartamento(via/numero/città)"
                        v-model="apartmentAddress">
                </div>

                <div class="mb-4">
                    <label for="apartmentPicture" class="form-label">
                        Aggiungi un'immagine
                    </label>
                    <div v-if="errors">
                        <small v-for="error in errors.apartmentPicture" class="is-invalid d-block text-danger ">
                            {{ error }}
                        </small>
                    </div>
                    <input type="file" class="form-control" id="apartmentPicture"
                        placeholder="Carica un'immagine che rappresenti il tuo appartamento" name="apartmentPicture">
                </div>





                <div class="mb-4">
                    <button class="btn btn-primary" @click.prevent="sendApartmentForm"> register </button>
                </div>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped></style>