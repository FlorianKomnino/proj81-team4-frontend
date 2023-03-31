<script>
/* import tomtom */
import tt from '@tomtom-international/web-sdk-maps'
import ApartmentCard from '../ApartmentCard.vue';
import axios from 'axios';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';

export default {
    name: 'MapTomtom',
    components: {
        ApartmentCard,
    },
    data() {
        return {
            route: null,
            firstCall: true,
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
            kitchenElement: null,
            wiFiElement: null,
            poolElement: null,
            parkingElement: null,
            busServiceElement: null,
            loading: false,
            apartmentsUrlAddress: 'http://127.0.0.1:8000/api/apartments/filter/',
            urlAddress: 'https://api.tomtom.com/search/2/search/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
            hasCards: false,
            filterShow: 'hidden',
            overlay: 'none',
        }
    },
    methods: {
        getApartments() {
            document.getElementById('overlay').style.display = 'none';
            this.overlay = 'none'
            document.querySelector('.filters').style.visibility = "hidden";
            this.filterShow = 'hidden'
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
                                        this.foundApartments.forEach((positionApartment, index) => {
                                            this.initialApartments.forEach((filteredApartment) => {
                                                if (filteredApartment.id == positionApartment.position.id) {
                                                    filteredApartment.distance = positionApartment.distance
                                                    this.apartmentsToShow.push(filteredApartment)
                                                    // this if else is needed to have sponsorships not as an array but as a number to be able to sort them at the end of this foreach
                                                   if(this.apartmentsToShow[index].sponsorships.length>0){
                                                    this.apartmentsToShow[index].sponsorships = 1
                                                   } else {
                                                    this.apartmentsToShow[index].sponsorships = 0
                                                   }
                                                }
                                            })
                                        });
                                        // this row sort the apartment to show by sponsorship, the sponsorshiped apartment will be shown first (money money)
                                        this.apartmentsToShow.sort((a,b)=>b.sponsorships-a.sponsorships)
                                        this.hasCards = true
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
        addParamsToLocation(){
            this.$route.params.where = this.locationQuery
            this.$route.params.radius = this.radius
            this.$route.params.beds = this.beds
            this.$route.params.rooms = this.rooms
            this.$router.push({path: '/search', query: 
                {
                    where: this.locationQuery, 
                    radius: this.radius, 
                    beds: this.beds, 
                    rooms: this.rooms,
                    kitchen: this.kitchenElement.checked,
                    wiFi: this.wiFiElement.checked,
                    pool: this.poolElement.checked,
                    parking: this.parkingElement.checked,
                    busService: this.busServiceElement.checked
                }})
        },
        hasUrlValues(){

            let locationFilter = '';
            let radiusFilter = '';
            let bedsFilter = '';
            let roomsFilter = '';

            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            if( urlParams.has('where') ){
                locationFilter = urlParams.get('where');
            }
            if( urlParams.has('radius') ){
                radiusFilter = urlParams.get('radius');
            }
            if( urlParams.has('beds') ){
                bedsFilter = urlParams.get('beds');
            }
            if( urlParams.has('rooms') ){
                roomsFilter = urlParams.get('rooms');
            }

            if (locationFilter != '') {
                this.locationQuery = locationFilter
            }
            if (radiusFilter != '') {
                this.radius = radiusFilter
            }
            if (bedsFilter != '') {
                this.beds = bedsFilter
            }
            if (roomsFilter != '') {
                this.rooms = roomsFilter
            }
            if (urlParams.get('kitchen') == 'true') {
                this.servicesRequired.push(1)
            }
            if (urlParams.get('wiFi') == 'true') {
                this.servicesRequired.push(2)
            }
            if (urlParams.get('pool') == 'true') {
                this.servicesRequired.push(3)
            }
            if (urlParams.get('parking') == 'true') {
                this.servicesRequired.push(4)
            }
            if (urlParams.get('busService') == 'true') {
                this.servicesRequired.push(5)
            }
        },
        autocompleteAddress(){
            const option = {
                idleTimePress: 100,
                minNumberOfCharacters: 0,
                searchOptions: {
                    key: 'jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr',
                    language: 'it-IT',
                    limit: 10,
                },
                autocompleteOptions: {
                    key: 'jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr',
                    language: 'it-IT',
                    resultSet: 'category'
                },
                labels: {
                    noResultsMessage: 'Nessun risultato trovato'
                },
            }
            const ttSearchBox = new SearchBox(services, option);
            const searchBar = document.getElementById('searchbar');
            const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
            searchBar.append(searchBoxHTML);
            const oldInput = this.locationQuery.value;
            const icon = document.querySelector('.tt-search-box-close-icon');
            ttSearchBox.on("tomtom.searchbox.resultselected", this.handleResultSelection);

            icon.addEventListener('click', function () {
                if (oldInput) {
                    this.locationQuery = oldInput
                } else {
                    this.locationQuery = ''
                }
            })
        },
        handleResultSelection(event) {
            if (event.data.result.address.freeformAddress) {
                this.locationQuery = event.data.result.address.freeformAddress
            }
            this.addParamsToLocation()
        },
        getFilterAppear(){
            if (this.overlay == 'none'){
                document.getElementById('overlay').style.display = 'block';
                this.overlay = 'block'
            } else {
                document.getElementById('overlay').style.display = 'none';
                this.overlay = 'none'
            }
            
            if (this.filterShow == "hidden"){
                document.querySelector('.filters').style.visibility = "visible";
                this.filterShow = "visible";
            } else {
                document.querySelector('.filters').style.visibility = "hidden";
                this.filterShow = "hidden";
            }
        }
    },
    mounted() {
        this.kitchenElement = document.getElementById('Cucina')
        this.wiFiElement = document.getElementById('Wi-fi')
        this.poolElement = document.getElementById('Piscina')
        this.parkingElement = document.getElementById('Parcheggio gratuito')
        this.busServiceElement = document.getElementById('Servizio navetta')
        this.hasUrlValues()
        this.initialMap()
        this.autocompleteAddress()
        this.getApartments()
    },
}
</script>

<template lang="">
    <div class="main-container pt-4 ps-3 position-relative">
        <div id='overlay' class='overlay'></div>
        <div class="searchbar-container container-fluid mb-4">
            <div class="col-12 mt-3">
                <p v-if="locationQuery">
                    Abbiamo trovato <span class="brand-color-span">{{apartmentsToShow.length}}</span> alloggi in questa <span class="brand-color-span">località: </span> {{locationQuery}}
                </p>
            </div>
            <form class="row g-0 m-0 align-items-center justify-content-center" @keyup.enter="getApartments">
                <div class="col-12 col-lg-10 col-xxl-8">
                    <div class="row">
                        <div class="col-12 col-md-8">
                            <p v-if="locationQuery" class="m-0">
                                Abbiamo trovato {{apartmentsToShow.length}} alloggi in questa località: <span class="fw-bold">{{locationQuery}}</span> 
                                <br>
                                Se vuoi cambiare destinazione, cercala pure qui sotto!
                            </p>
                            <div id="searchbar" class="me-3">
                                <input id="address" class="d-none" name="address" @keyup="addParamsToLocation" type="text" placeholder="Search" v-model="locationQuery">
                            </div>
                        </div>
                        <div class="col-4 align-items-end d-none d-md-flex p-0">
                            <div role="button" class="customButton mt-auto mb-1 me-2 d-flex align-items-center justify-content-center d-none d-md-flex" @click="getFilterAppear">
                                Filtri
                            </div>
                            <div role="button" class="customButton mt-auto mb-1 d-flex align-items-center justify-content-center d-none d-md-flex" @click="getApartments">
                                Cerca
                            </div>
                        </div>
                    </div>
                    <!-- this is needed for breakpoint md down -->
                    <div class="col-12 justify-content-center d-flex d-md-none mt-4">
                        <div role="button" class="customButton mt-auto mb-1 d-flex align-items-center justify-content-center d-flex d-md-none" @click="getFilterAppear">
                            Filtri
                        </div>
                    </div>
                </div>

                <!-- section for the popup with all the filters -->
                <div class="filters d-flex flex-column align-items-center p-4">
                    <p class="m-0 fw-bold position-relative w-100 text-center">
                        Filtri:
                        <font-awesome-icon :icon="['fas', 'xmark']" @click="getFilterAppear" role="button" class="xIcon"/>
                    </p>
                    <hr>
                    <div class="col-12 col-lg-6 row align-items-center my-3">
                        <label class="col-12">Inserisci un raggio (km):</label>
                        <div class="distance-wrapper col-12">
                            <input @keyup="addParamsToLocation" class="form-control col-12" v-model="radius">
                        </div>
                    </div>
                    <div class="beds-rooms row col-12 col-lg-6">
                        <div class="col-6 my-3">
                            <label for="rooms"> n° Stanze</label>
                            <input @keyup="addParamsToLocation" class="form-control" v-model="rooms">
                        </div>
                        <div class="col-6 my-3">
                            <label for="beds"> n° Letti</label>
                            <input @keyup="addParamsToLocation" class="form-control" v-model="beds">
                        </div>
                    </div>
                    <div class="row col-12 col-lg-6 checkboxes-container justify-content-evenly align-items-center">
                        <label class="col-12" v-for="(service, index) in services" :for="service">
                            <input :value="index+1" :id="service" type="checkbox" @click="addParamsToLocation" v-model="servicesRequired">
                            {{service}}
                        </label>
                    </div>
                    <div role="button" class="customButton h-50 mb-2 text-center mt-4" @click="getApartments">
                        Applica
                    </div>
                </div>
            </form>
        </div>
        
        <!-- section with apartments and Tomtom map -->
        <div class="row cards-map-container justify-content-between mt-5">
            <div class="col-12 col-lg-6 col-xl-8" v-if="apartmentsToShow">
                <div class="row cards-container">
                    <div class="col-12 col-md-6 col-xl-4 col-xxl-3" v-for="apartment in apartmentsToShow">
                        <ApartmentCard v-if="hasCards" :image="apartment.image" :apartment='apartment'/>
                    </div>
                </div>
            </div>
            <div class="map-container d-none d-lg-block col-6 col-xl-4">
                <div id="map" class="map"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/general.scss" as *;

.main-container {

    .filters{
        visibility: hidden;
        z-index: 3;
        position: fixed;
        top: 25%;
        background-color: white;
        border-radius: 10px;
        width: 600px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        .xIcon{
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(0, -50%) scale(1.2);
        }
        hr{
            width: 600px;
        }
    }

    .overlay{
        display: none;
        position: fixed;
        padding:0;
        margin:0;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background:rgba(255,255,255,0.7);
        z-index: 2;
    }
    .map-container{
        position: relative;
        #map{
            position: sticky;
            height: calc(100vh - 95px);
            top: 95px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }
    }
}
</style>