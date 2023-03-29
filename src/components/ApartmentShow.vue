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
                .then((response) => {
                    console.log(response);
                    this.success = response.data.success;
                    if (this.success) {
                    } else {
                        this.errors = response.data.errors;
                        console.warn(this.errors);
                    }
                })
        },

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
        }

    },
    mounted() {
        this.initialMap();
        this.getApartmentId();
        this.getFormData();
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class='col-12'>
            <input type="text" name="apartmentId" class="d-none" :value="apartment.id" id="apartmentId">
            <h2>{{apartment.title}}</h2>
            <h6>{{apartment.address}}</h6>
            <div class="img-wrapper col-12">
                <img :src="imageBaseURL+'storage/'+apartment.image" alt="" class='rounded mx-auto d-block'>
            </div>
        <div class='mt-5 col-8'></div>
            <span> Numero di stanze: {{apartment.rooms}} &#8226;</span>
            <span> Numero di letti: {{apartment.beds}} &#8226;</span>
            <span> Numero di bagni: {{apartment.bathrooms}}</span>
        </div>
        <div class="map-container col-12">
            <div id="map" class="map">
                <div id="marker" class="d-flex justify-content-center align-items-center">
                    <font-awesome-icon :icon="['fas', 'house']" class="marker-icon" />
                </div>
            </div>
        </div>
        <div class="messageContainer my-4">
            <label for="" class="fs-1">Inserisci messaggio</label>
            <textarea name="" id="" cols="30" rows="10" v-model="userMessage"></textarea>
            <label for="">Inserisci la tua email</label>
            <input type="email" v-model="userEmail">
            <label for="">Inserisci il tuo nome</label>
            <input type="text" v-model="userName">
            <button @click="getAndSendFormData">
                invia il messaggio
            </button>
        </div>
    </div>
</template>
<style lang="scss">
@use "../styles/general.scss" as *;

#map {
    height: 400px;
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

img {
    width: 100%;
}

.messageContainer {
    height: 1000px;
    border: 1px solid black;
}
</style>