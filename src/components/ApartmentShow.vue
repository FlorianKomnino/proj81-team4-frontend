<script>
import tt from '@tomtom-international/web-sdk-maps'
import axios from 'axios'

export default {
    data() {
        return {
            imageBaseURL: 'http://127.0.0.1:8000/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
            messageBaseUrl: 'http://127.0.0.1:8000/api/apartments/message',
            longitude: 0,
            latitude: 0,
            userMessage: '',
            userEmail: '',
            apartmentId: '',
            userName: '',
            formData: {},
        }
    },
    props: {
        apartment: Object,
        image: String
    },
    methods: {
        initialMap() {
            //const iconMarker = document.getElementById('marker'); 
            const map = tt.map({
                key: "LtoGeaeU7ePCG0fjKosxHXMarjmLep0U",
                container: "map",
                center: [this.$props.apartment.longitude, this.$props.apartment.latitude],
                zoom: 12
            })
            map.on('load', () => {
                const iconMarker = document.getElementById('marker');
                const popup = new tt.Popup({ anchor: 'top' }).setText('Posizione esatta fornita dopo la prenotazione.')
                let marker = new tt.Marker({ element: iconMarker }).setLngLat([this.$props.apartment.longitude, this.$props.apartment.latitude]).setPopup(popup).addTo(map);
                marker.addTo(map);
            })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        },
        sendMessage() {
            const innerFormData = {
                text_content: this.formData['userMessage'],
                email: this.formData['userEmail'],
                apartment_id: this.formData['apartmentId'],
                name: this.formData['name'],
            };
            axios.post(this.messageBaseUrl, innerFormData)
            .then( (response) => {
                console.log(response);
                this.$toast.success(`Messaggio inviato con successo`);
            })
            .catch((error) => {
                console.log(error);
                this.$toast.error(`Messaggio non inviato`);
            })
        },
        /*.then((response) => {
                    console.log(response);
                    this.success = response.data.success;
                    if (this.success) {
                        this.$toast.success(`Messaggio inviato con successo`);
                    } else {
                        this.errors = response.data.errors;
                        console.warn(this.errors);
                        this.$toast.error(`Messaggio non inviato`);
                    }*/

        /*
        *
        * return: void 
        * 
        */
        getApartmentId() {
            this.apartmentId = document.getElementById('apartmentId').value;
            console.log(this.apartmentId);
        },
        getFormData() {
            this.formData['userMessage'] = this.userMessage;
            this.formData['userEmail'] = this.userEmail;
            this.formData['apartmentId'] = this.apartmentId;
            this.formData['name'] = this.userName;

            console.log(this.formData);
        },
        getAndSendFormData() {
            this.getApartmentId();
            this.getFormData();
            this.sendMessage();
            this.userEmail = '';
            this.userName = '';
            this.userMessage = '';
        }

    },
    mounted() {
        this.initialMap();
        this.getApartmentId();
        this.getFormData();
    }
}
</script>
<template>
    <div class='container py-4'>
        <div class="row mb-4">
            <div class='col-12'>
                <input type="text" name="apartmentId" class="d-none" :value="apartment.id" id="apartmentId">
                <h2 class="fs-2">{{apartment.title[0].toUpperCase() + apartment.title.slice(1)}}</h2>
                <h6 class="text-decoration-underline">{{apartment.address}}</h6>
            </div>
        </div>
        <div class="row g-1 imgMap">
            <div class="col-6 d-flex m-0">
                <img v-if="image.startsWith('http')" :src="image" class="rounded-3 img-fluid" alt="image">
                <img v-else :src="imageBaseURL+'storage/'+image"  class='rounded-3 img-fluid' alt="image">
            </div>
            <div class="col-6 m-0 d-flex align-items-center">
                <div id="map" class="rounded-3">
                    <div id="marker" class="d-flex justify-content-center align-items-center">
                        <font-awesome-icon :icon="['fas', 'house']" class="marker-icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-7 pe-5">
                <p class="mb-0 fs-5">
                    Intero Alloggio: <span class="fw-bold">{{apartment.title[0].toUpperCase() + apartment.title.slice(1)}}</span> - Host: Inserire Host
                </p>
                <p class="fs-6 fw-light">
                    <span> Numero di stanze: {{apartment.rooms}} &#8226;</span>
                    <span> Numero di letti: {{apartment.beds}} &#8226;</span>
                    <span> Numero di bagni: {{apartment.bathrooms}}</span>
                </p>
                <hr>
                <div class='mt-4'>
                    <h3>Cosa troverai</h3>
                    <p v-for="service in apartment.services">
                        <font-awesome-icon :icon="service.icon" />
                        {{service.name}}                
                    </p>
                </div>
            </div>
            <div class="col-4 offset-1">
                <div class="messageContainer rounded-3 access-buttons text-center p-5">
                    <div class="d-flex flex-column text-start mb-1">
                        <label for="">Email:</label>
                        <input ref="userEmail" type="email" v-model="userEmail">
                    </div>
                    <div class="d-flex flex-column text-start mb-1">
                        <label for="">Nome:</label>
                        <input ref="userName" type="text" v-model="userName">
                    </div>
                    <div class="d-flex flex-column text-start">
                        <label for="" class="">Messaggio:</label>
                        <textarea ref="userMessage" name="" id="" cols="30" rows="10" v-model="userMessage"></textarea>
                    </div>
                    <div class="mt-5">
                        <a @click="getAndSendFormData">
                            Invia il messaggio
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.imgMap{
    max-height: 420px;

    #map {
    height: 420px;
    width: 100%;

    #marker {
        background-color: $main-bg-color;
        border-radius: 50%;
        height: 48px;
        width: 48px;
        color: white;

        .marker-icon {
            height: 22px;
            width: 22px;
        }
    }
}

}


.messageContainer {
    height: 450px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    input{
        background-color: rgb(241,243,246);
        height: 40px;
        padding: 15px;
        &:focus{
            outline-color: rgba(255, 55, 92, 0.75);
        }
    }
    textarea{
        max-height: 100px;
        padding: 15px;
        background-color: rgb(241,243,246);
        &:focus{
            outline-color: rgba(255, 55, 92, 0.75);
        }
    }
}
</style>