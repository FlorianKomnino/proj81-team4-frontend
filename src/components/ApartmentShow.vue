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
    sendMessage(id){
        axios.post(this.messageBaseUrl, {
            params: {
                email: this.userEmail,
                message: this.userMessage,
                //apartmentId: id,
            }
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .finally(function () {
            // always executed
        }); 
    }
    },
    mounted() {
        this.initialMap()        
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class='col-12'>
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
            <button @click="sendMessage">
                invia il messaggio
            </button>
        </div>
    </div>
</template>
<style lang="scss">
@use "../styles/general.scss" as *;
#map{
    height: 400px;
    width: 100%;
    #marker{
            background-color: $main-bg-color;
            border-radius: 50%;
            height: 48px;
            width: 48px;
            color: white;
            .marker-icon{
                height: 22px;
                width: 22px;
            }
    }
}
img{
        width: 100%;
    }

.messageContainer{
    height: 1000px;
    border: 1px solid black;
}
</style>