<script>
/* import tomtom */
import tt from '@tomtom-international/web-sdk-maps'
/* import FuzzySearch */
import FuzzySearch from 'fuzzy-search';

import SearchBarTomtom from './SearchBarTomtom.vue';
import ApartmentCard from '../ApartmentCard.vue';
import axios from 'axios';
import { Marker } from 'mapbox-gl';

export default {
    name: 'MapTomtom',
    components: {
        SearchBarTomtom,
        ApartmentCard,
    },
    data(){
        return{
            locationQuery: '',
            apartments: [],
            initialApartments: [],
            foundApartments: [],
            apartmentsToShow: [],
            loading: false,
            apartmentsUrlAddress: 'http://127.0.0.1:8000/api/apartments',
            urlAddress: 'https://api.tomtom.com/search/2/search/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
        }
    },
    methods: {
        getApartments(){
            this.locationQuery = '';
            this.apartmentsToShow = [];
            this.apartments = [];
            axios.get(this.apartmentsUrlAddress, {
                params: {

                }
            })
            .then((response) => {
                this.initialApartments = response.data.results;
                this.apartmentsToShow = response.data.results;
                let results = response.data.results;
                results.forEach(location => {
                    this.apartments.push({
                        position: {
                            lat: location.latitude,
                            lon: location.longitude,
                            id: location.id
                        },
                        
                    })
                });
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            }); 
        },
        getHouses(locationQuery, radius) {
            this.locationQuery = locationQuery.charAt(0).toUpperCase() + locationQuery.slice(1);
            this.apartmentsToShow = [];
            axios.get(this.urlAddress + `${locationQuery}.json`, {
                params: {
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                }
            })
            .then((response) => {
                let centerCoordinate = response.data.results[0].position;
                let position = `${response.data.results[0].position.lat}, ${response.data.results[0].position.lon}`;
                axios.get(this.positionUrlAddress, {
                params: {
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                    geometryList: JSON.stringify([
                        {
                        type: "CIRCLE",
                        position: position,
                        radius: radius*1000
                        }
                    ]),
                    poiList: JSON.stringify(this.apartments)
                }
                })
                .then((response) => {
                    const map = tt.map({
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                    container: "map",
                    center: centerCoordinate,
                    zoom: 11
                    })
                    map.on('load', () => {
                        this.foundApartments = response.data.results
                        response.data.results.forEach(function (location) {
                            console.log(location)
                            const MarkerEl = document.createElement("div");
                            MarkerEl.classList.add('marker', 'd-flex', 'justify-content-center', 'align-items-center');
                            MarkerEl.innerHTML = "<font-awesome-icon :icon=\"['fas', 'house']\" />";
                            let marker = new tt.Marker().setLngLat([location.position.lon, location.position.lat]).addTo(map) 
                            const popup = new tt.Popup({ anchor: 'top' }).setText('Posizione esatta fornita dopo la prenotazione.')
                            marker.setPopup(popup)
                        })
                        for(let outerI=0 ; outerI<this.foundApartments.length; outerI++ ){
                            for(let innerI=0 ; innerI<this.initialApartments.length; innerI++ ){
                                if(this.foundApartments[outerI].position.id == this.initialApartments[innerI].id){
                                    console.log('presente')
                                    this.apartmentsToShow.push(this.initialApartments[innerI])
                                }
                            }
                        }
                    })
                    map.addControl(new tt.FullscreenControl());
                    map.addControl(new tt.NavigationControl());
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
            })
            
        },
        initialMap(){
            const iconMarker = document.getElementById('marker');
            let center = [9.192771, 45.463273]
            const map = tt.map({
            key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
            container: "map",
            center: center,
            zoom: 12
            })
            map.on('load', () => {
                    
                })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        }
    },
    mounted(){
        this.initialMap();
    },
    created(){
        this.getApartments();
    }
}
</script>

<template lang="">
    <hr class="m-0 mb-3">
    <div class="main-container">
        <div class="container-fluid search-bar-container">
            <SearchBarTomtom @location="getHouses"/>
        </div>
        <div class="container-fluid pe-0">
            <div class="d-flex cards-map-container">
                <div class="card-container pe-4" v-if="apartmentsToShow">
                    <p v-if="locationQuery">
                        Abbiamo trovato {{apartmentsToShow.length}} alloggi in questa località: {{locationQuery}}
                    </p>
                    <div class="row g-4 align-items-stretch" >
                        <div class="col-4" v-for="apartment in apartmentsToShow">
                            <ApartmentCard :title="apartment.title" :image="apartment.image" :rooms="apartment.rooms" :beds="apartment.beds" :address="apartment.address"/>
                        </div>
                    </div>
                </div>
                <div class="map-container">
                    <div id="map" class="map"></div>
                </div>
            </div>
        </div>
    </div>
        
    
</template>

<style lang="scss" scoped>
@use "../../styles/general.scss" as *;

hr{
    border: 0;
    border-top: 1px solid lightgray;
}

.main-container{

    position: fixed;

    .cards-map-container{
    height: 86vh;
    overflow-y: scroll;
    

    .card-container{
    width: 60vw;
    
}

.map-container{
    width: 40vw;
    position: fixed;
    right: 0;
    #map{
        height: 100vh;
        .marker{
            background-color: black;
            border-radius: 50%;
            height: 50px;
            width: 50px;
            padding: 10px;
            .icon{
                color: white;
                font-size: 1.3rem;
                padding: 14px;
            }
        }

    }
}
}

}


    
</style>