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
    data() {
        return {
            rooms: 1,
            beds: 1,
            locationQuery: 'Milano',
            radius: '20',
            filteredApartments: [],
            apartments: [],
            initialApartments: [],
            foundApartments: [],
            apartmentsToShow: [],
            servicesRequired: [],
            services: ['Cucina', 'Wi-fi', 'Piscina', 'Parcheggio gratuito', 'Servizio navetta'],
            loading: false,
            apartmentsUrlAddress: 'http://127.0.0.1:8000/api/apartments/filter/',
            urlAddress: 'https://api.tomtom.com/search/2/search/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
        }
    },
    methods: {

        addParamsToLocation(params) {
            history.replaceState(
                {},
                null,
                this.$route.path +
                '?' +
                Object.keys(params)
                    .map(key => {
                        return (
                            encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
                        )
                    })
                    .join('&')
            )
        },


        getApartments() {
            this.apartmentsToShow = [];
            this.apartments = [];
            const filters = this.servicesRequired;
            axios.get(this.apartmentsUrlAddress + this.rooms + '/' + this.beds, {
                params: {
                    services: filters
                }
            })
                .then((response) => {
                    this.initialApartments = response.data.data;
                    this.filteredApartments = response.data.data;
                    let results = response.data.data;
                    results.forEach(location => {
                        this.apartments.push({
                            position: {
                                lat: location.latitude,
                                lon: location.longitude,
                                id: location.id
                            },

                        })
                    });
                    const paramQuery = this.locationQuery
                    this.locationQuery = this.locationQuery.charAt(0).toUpperCase() + this.locationQuery.slice(1);
                    this.apartmentsToShow = [];
                    const filteredApartment = this.filteredApartments
                    axios.get(this.urlAddress + `${paramQuery}.json`, {
                        params: {
                            key: "LtoGeaeU7ePCG0fjKosxHXMarjmLep0U",
                        }
                    })
                        .then((response) => {
                            let centerCoordinate = response.data.results[0].position;
                            let position = `${response.data.results[0].position.lat}, ${response.data.results[0].position.lon}`;

                            axios.get(this.positionUrlAddress, {
                                params: {
                                    key: "LtoGeaeU7ePCG0fjKosxHXMarjmLep0U",
                                    geometryList: JSON.stringify([
                                        {
                                            type: "CIRCLE",
                                            position: position,
                                            radius: this.radius * 1000
                                        }
                                    ]),
                                    poiList: JSON.stringify(this.apartments)
                                }
                            })
                                .then((response) => {
                                    const map = tt.map({
                                        key: "LtoGeaeU7ePCG0fjKosxHXMarjmLep0U",
                                        container: "map",
                                        center: centerCoordinate,
                                        zoom: 11
                                    })
                                    map.on('load', () => {
                                        this.foundApartments = response.data.results
                                        response.data.results.forEach(function (location) {
                                            const MarkerEl = document.createElement("div");
                                            MarkerEl.classList.add('marker', 'd-flex', 'justify-content-center', 'align-items-center');
                                            MarkerEl.innerHTML = "<font-awesome-icon :icon=\"['fas', 'house']\" />";
                                            let marker = new tt.Marker().setLngLat([location.position.lon, location.position.lat]).addTo(map)
                                            const popup = new tt.Popup({ anchor: 'top' }).setText('Posizione esatta fornita dopo la prenotazione.')
                                            marker.setPopup(popup)
                                        })
                                        this.foundApartments.forEach((apartment) =>{
                                            apartment.distance = turf.distance([centerCoordinate.lat,centerCoordinate.lon],[apartment.position.lat,apartment.position.lon])
                                        })

                                        this.foundApartments.sort((a,b)=>a.distance-b.distance)
                                        console.log(this.foundApartments)

                                        this.foundApartments.forEach((positionApartment) => {
                                            this.initialApartments.forEach((filteredApartment) => {
                                                if (filteredApartment.id == positionApartment.position.id) {
                                                    this.apartmentsToShow.push(filteredApartment)
                                                }
                                            })
                                        });
                                    })
                                    map.addControl(new tt.FullscreenControl());
                                    map.addControl(new tt.NavigationControl());
                                    this.locationQuery = paramQuery
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                                .finally(function () {
                                });
                        })


                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        initialMap() {
            const iconMarker = document.getElementById('marker');
            let center = [9.192771, 45.463273]
            const map = tt.map({
                key: "LtoGeaeU7ePCG0fjKosxHXMarjmLep0U",
                container: "map",
                center: center,
                zoom: 12
            })
            map.on('load', () => {

            })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        },
    },
    mounted() {
        this.initialMap();
        this.getApartments()
    },
    created() {
    }
}
</script>

<template lang="">
    <hr class="m-0 mb-3">
    <div class="btn" @click="addParamsToLocation('Cucina')">
        params
    </div>
    <div class="main-container">
        <div class="container-fluid search-bar-container">
            <!-- <SearchBarTomtom @location="getHouses"/> -->
            <div class="form-container input-group mb-3">
                <form class="row align-items-center" @keyup.enter="getApartments">
                    <div class="col-6 d-flex me-2 d-flex align-items-center">
                        <label class="text-nowrap me-2">Inserisci una città:</label>
                        <input type="text" class="form-control shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                        placeholder="Search" v-model="locationQuery">
                    </div>
                    <div class="col-5 d-flex d-flex align-items-center me-2">
                        <label class="text-nowrap me-2">Inserisci un raggio (km):</label>
                        <input type="number" class="form-control shadow-none" v-model="radius">
                    </div>
                    <div class="row h-100 col-4 mt-3">
                        <div class="col-6">
                            <label for="rooms"> n° Stanze</label>
                            <input type="number" class="form-control d-inline" v-model="rooms">
                        </div>
                        <div class="col-6">
                            <label for="beds"> n° Letti</label>
                            <input type="number" class="form-control d-inline" v-model="beds">
                        </div>
                    </div>
                    <div class="col-8 h-100 checkboxes-container d-flex justify-content-evenly align-items-center">
                        <label v-for="(service, index) in services" :for="service">
                            <input :value="index+1" :id="service" type="checkbox" v-model="servicesRequired">
                            {{service}}
                        </label>
                    </div>
                </form>
            </div>
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

hr {
    border: 0;
    border-top: 1px solid lightgray;
}

.main-container {

    position: fixed;

    .cards-map-container {
        height: 86vh;
        overflow-y: scroll;


        .card-container {
            width: 60vw;

        }

        .map-container {
            width: 40vw;
            position: fixed;
            right: 0;

            #map {
                height: 100vh;

                .marker {
                    background-color: black;
                    border-radius: 50%;
                    height: 50px;
                    width: 50px;
                    padding: 10px;

                    .icon {
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