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
            validatedUserMessage: '',
            userMessageErrors: '',
            userEmail: '',
            validatedUserEmail: '',
            userEmailErrors: '',
            apartmentId: '',
            userName: '',
            formData: {},
            success: false,
        }
    },
    props: {
        apartment: Object,
        image: String,
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
                this.userEmailErrors = 'Inserisci la tua email';
            } else {
                let regex = /\S+@\S+\.\S+/;
                if (this.userEmail.length > 50) {
                    this.userEmailErrors = 'L\'email non deve superare i 50 caratteri'
                } else if (!regex.test(this.userEmail)) {
                    this.userEmailErrors = 'Email non valida';
                } else {
                    this.userEmailErrors = '';
                    this.validatedUserEmail = this.userEmail;
                }
            }
        },

        messageValidation() {
            if (!this.userMessage) {
                this.userMessageErrors = 'Inserisci un messaggio';
            } else if (this.userMessage.length > 300) {
                this.userMessageErrors = 'Il messaggio non deve superare i 300 caratteri';
            } else {
                this.userMessageErrors = '';
                this.validatedUserMessage = this.userMessage;
            }
        },

        getFormData() {
            this.formData['apartmentId'] = this.apartmentId;
            this.formData['name'] = this.userName;
            this.formData['validatedUserEmail'] = this.validatedUserEmail;
            this.formData['validatedUserMessage'] = this.validatedUserMessage;

            console.log(this.formData);
        },

        sendMessage() {
            this.success = false;
            const innerFormData = {
                text_content: this.formData['validatedUserMessage'],
                email: this.formData['validatedUserEmail'],
                apartment_id: this.formData['apartmentId'],
                name: this.formData['name'],
            };
            axios.post(this.messageBaseUrl, innerFormData)
                .then((response) => {
                    console.log(response);
                    this.success = response.data.success;
                    if (this.success) {
                        this.userName = '';
                        this.userEmail = '';
                        this.userMessage = '';
                        this.$toast.success(`Messaggio inviato con successo`);
                    } else {
                        this.$toast.error(`Messaggio non inviato`);
                    }
                })
        },

        getAndSendFormData() {
            this.getApartmentId();
            this.emailValidation();
            this.messageValidation();
            this.getFormData();
            this.sendMessage();
            this.validatedUserEmail = '';
            this.validatedUserMessage = '';
        },

    },
    mounted() {
        this.initialMap();
        this.getApartmentId();
    }
}
</script>

<template>
    <div class='container-fluid container-sm py-4'>
        <div class="row mb-4">
            <div class='col-12'>
                <input type="text" name="apartmentId" class="d-none" :value="apartment.id" id="apartmentId">
                <p class="title">{{ apartment.title[0].toUpperCase() + apartment.title.slice(1) }}</p>
                <p class="text-decoration-underline smTextSize">{{ apartment.address }}</p>
            </div>
        </div>
        <div class="row g-1 imgMap">
            <div class="col-12 col-lg-6 d-flex m-0 img-wrapper mb-1 mb-lg-0">
                <img v-if="image.startsWith('http')" :src="image" class="rounded-3 img-fluid w-100" alt="image">
                <img v-else :src="imageBaseURL + 'storage/' + image" class='rounded-3 img-fluid w-100' alt="image">
            </div>
            <div class="col-12 col-lg-6 m-0 d-flex align-items-center">
                <div id="map" class="rounded-3">
                    <div id="marker" class="d-flex justify-content-center align-items-center">
                        <font-awesome-icon :icon="['fas', 'house']" class="marker-icon" />
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-5 g-0">
            <div class="col-12 col-lg-7 pe-0 pe-lg-5">
                <p class="subTitleSize">
                    Intero <span class="brand-text">Alloggio</span> : {{ apartment.title[0].toUpperCase() +
                        apartment.title.slice(1) }} - <span class="brand-text"> Host</span>: {{ (apartment.user.name != 'nuovo utente') ? apartment.user.name : apartment.user.email }}
                </p>
                <p class="textSize">
                    <span> Numero di stanze: {{ apartment.rooms }} &#8226;</span>
                    <span> Numero di letti: {{ apartment.beds }} &#8226;</span>
                    <span> Numero di bagni: {{ apartment.bathrooms }}</span>
                </p>
                <hr>
                <div class='services mt-0 mt-lg-4'>
                    <p class="subTitleSize">Cosa troverai</p>
                    <p class="textSize mb-2" v-for="service in apartment.services">
                        <span class="icon"><font-awesome-icon :icon="service.icon" /></span>
                        {{ service.name }}
                    </p>
                </div>
                <hr class="d-flex d-lg-none">
            </div>
            <div class="col-12 col-lg-5 col-xl-4 offset-xl-1">
                <div class="messageContainer rounded-3 access-buttons text-center px-5 py-4">
                    <p class="subTitleSize mb-4 fs-5">
                        Invia un messaggio all'host
                    </p>
                    <div class="d-flex flex-column text-start mb-1 textSize">
                        <label for="">Nome:
                        </label>
                        <input ref="userName" type="text" v-model="userName">
                    </div>
                    <div class="d-flex flex-column text-start mb-1">
                        <label for="">Email:*
                        </label>
                        <span class="text-danger">
                            {{ userEmailErrors }}
                        </span>
                        <input ref="userEmail" type="email" v-model="userEmail">
                    </div>
                    <div class="d-flex flex-column text-start">
                        <label for="" class="">Messaggio:*
                        </label>
                        <span class="text-danger">
                            {{ userMessageErrors }}
                        </span>
                        <textarea ref="userMessage" name="" id="" cols="30" rows="10" v-model="userMessage"></textarea>
                    </div>
                    <div class="mt-5">
                        <a id="send-message" @click="getAndSendFormData">
                            Invia messaggio
                        </a>
                    </div>
                    <p class=" mt-5 mb-0 text-secondary fst-italic">i campi contrassegnati da * sono obbligatori</p>
                </div>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@use "../styles/general.scss" as *;
@import "../styles/partials/colors.scss";

.imgMap {

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

.brand-text{
    color: $main-bg-color;
}

.services .icon{
        color: $main-bg-color;
        font-size: 1.7rem;
        padding-right: .3rem;
    }

.messageContainer {
    min-height: 450px;
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
        height: 100px;
        resize: none;
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
        box-shadow: rgba(99, 99, 99, 0.3) 0px 2px 8px 0px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            color: white;
            background-position: right;
        }
    }
}
</style>