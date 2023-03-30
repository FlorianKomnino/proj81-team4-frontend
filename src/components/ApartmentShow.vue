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
            validatedUserEmail: '',
            apartmentId: '',
            userName: '',
            formData: {},
            emailErrorMessages: ''
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

        getApartmentId() {
            this.apartmentId = document.getElementById('apartmentId').value;
        },

        emailValidation() {
            if (!this.userEmail) {
                this.emailErrorMessages = 'L\'email è necessaria';
            } else {
                let regex = /\S+@\S+.\S+/;
                if (!regex.test(this.userEmail)) {
                    this.emailErrorMessages = 'Email non valida';
                } else {
                    this.emailErrorMessages = '';
                    this.validatedUserEmail = this.userEmail;
                }
            }
        },

        getFormData() {
            this.formData['userMessage'] = this.userMessage;
            this.formData['validatedUserEmail'] = this.validatedUserEmail;
            this.formData['apartmentId'] = this.apartmentId;
            this.formData['name'] = this.userName;

            console.log(this.formData);
        },

        sendMessage() {
            const innerFormData = {
                text_content: this.formData['userMessage'],
                email: this.formData['validatedUserEmail'],
                apartment_id: this.formData['apartmentId'],
                name: this.formData['name'],
            };
            axios.post(this.messageBaseUrl, innerFormData)
                .then((response) => {
                    console.log(response);
                    this.$toast.success(`Messaggio inviato con successo`);
                })
                .catch((error) => {
                    console.log(error);
                    this.$toast.error(`Messaggio non inviato`);
                })
        },

        getAndSendFormData() {
            this.getApartmentId();
            this.emailValidation();
            this.getFormData();
            this.sendMessage();
            this.userEmail = '';
            this.validatedUserEmail = '';
            this.userName = '';
            this.userMessage = '';
        }

    },
    mounted() {
        this.initialMap();
        this.getApartmentId();
    }
}
</script>
<template>
    <div class='container py-4'>
        <div class="row mb-4">
            <div class='col-12'>
                <input type="text" name="apartmentId" class="d-none" :value="apartment.id" id="apartmentId">
                <h2 class="fs-2">{{ apartment.title[0].toUpperCase() + apartment.title.slice(1) }}</h2>
                <h6 class="text-decoration-underline">{{ apartment.address }}</h6>
            </div>
        </div>
        <div class="row g-1 imgMap">
            <div class="col-6 d-flex m-0 img-wrapper">
                <img v-if="image.startsWith('http')" :src="image" class="rounded-3 img-fluid" alt="image">
                <img v-else :src="imageBaseURL + 'storage/' + image" class='rounded-3 img-fluid' alt="image">
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
                    Intero Alloggio: <span class="fw-bold">{{ apartment.title[0].toUpperCase() +
                        apartment.title.slice(1) }}</span> - Host: Inserire Host
                </p>
                <p class="fs-6 fw-light">
                    <span> Numero di stanze: {{ apartment.rooms }} &#8226;</span>
                    <span> Numero di letti: {{ apartment.beds }} &#8226;</span>
                    <span> Numero di bagni: {{ apartment.bathrooms }}</span>
                </p>
                <hr>
                <div class='mt-4'>
                    <h3>Cosa troverai</h3>
                    <p v-for="service in apartment.services">
                        <font-awesome-icon :icon="service.icon" />
                        {{ service.name }}
                    </p>
                </div>
            </div>
            <div class="col-4 offset-1">
                <div class="messageContainer rounded-3 access-buttons text-center p-5">
                    <div class="d-flex flex-column text-start mb-1">
                        <label for="">Email:
                            <span id="email-error" class="text-danger">
                                {{ emailErrorMessages }}
                            </span>
                        </label>
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
                        <a id="send-message" @click="getAndSendFormData">
                            Invia messaggio
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
@use "../styles/general.scss" as *;

.imgMap {
    max-height: 420px;

    .img-wrapper {
        max-height: 420px;

        img {
            margin: auto;
            height: 100%;
        }
    }

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

    input {
        background-color: rgb(241, 243, 246);
        height: 40px;
        padding: 15px;

        &:focus {
            outline-color: rgba(255, 55, 92, 0.75);
        }
    }

    textarea {
        max-height: 100px;
        padding: 15px;
        background-color: rgb(241, 243, 246);

        &:focus {
            outline-color: rgba(255, 55, 92, 0.75);
        }
    }

    a#send-message {
        background: linear-gradient(108deg, white 0 45%, $main-bg-color 45% 90%, white 90% 100%);
        background-size: 190%;
        width: 100px;
        padding: 15px 30px;
        border-radius: 30px;
        text-decoration: none;
        color: $main-bg-color;
        width: 110px;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            color: white;
            background-position: right;
        }
    }
}
</style>