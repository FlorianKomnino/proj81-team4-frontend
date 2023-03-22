<script>
/* import tomtom */
import tt from '@tomtom-international/web-sdk-maps'
/* import FuzzySearch */
import FuzzySearch from 'fuzzy-search';

import SearchBarTomtom from './SearchBarTomtom.vue';
import axios from 'axios';
import { Marker } from 'mapbox-gl';

export default {
    name: 'MapTomtom',
    components: {
        SearchBarTomtom,
    },
    data(){
        return{
            apartments: [],
            loading: false,
            apartmentsUrlAddress: 'http://127.0.0.1:8000/api/apartments',
            urlAddress: 'https://api.tomtom.com/search/2/search/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
            apartmentsList: [
                {
                    position: {
                        lat: 9.165437,
                        lon: 45.464718,
                    }
                },
                {
                    position: {
                    lat: 9.163100,
                    lon: 45.478681,
                    }
                },
                {
                    position: {
                    lat: 9.207381,
                    lon: 45.483141,
                    }
                },
                {
                    position: {
                    lat: 9.677238,
                    lon: 45.698168,
                    }
                },
                {
                    position: {
                    lat: 9.661306,
                    lon: 45.682499,
                    }
                }
            ]
        }
    },
    methods: {
        getApartments(){
            axios.get(this.apartmentsUrlAddress, {
                params: {

                }
            })
            .then((response) => {
                console.log(response.data.results)
                let results = response.data.results;
                results.forEach(location => {
                    this.apartments.push({
                        position: {
                            lat: location.longitude,
                            lon: location.latitude,
                        },
                        
                    })
                });
                console.log(this.apartments);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            }); 
        },
        getHouses(locationQuery, radius) {
            console.log(locationQuery)
            axios.get(this.urlAddress + `${locationQuery}.json`, {
                params: {
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                }
            })
            .then((response) => {
                let centerCoordinate = response.data.results[0].position;
                let position = `${response.data.results[0].position.lon},${response.data.results[0].position.lat}`;
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
                    console.log(response)
                    const map = tt.map({
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                    container: "map",
                    center: centerCoordinate,
                    zoom: 13
                    })
                    map.on('load', () => {
                        /* const MarkerEl = document.createElement("div");
                        const iconMarker = document.createElement("div");
                        iconMarker.innerHTML(iconMarker);
                        MarkerEl.classList.add('marker');
                        console.log(MarkerEl); */
                        response.data.results.forEach(function (location) {
                            console.log(location)
                            let marker = new tt.Marker().setLngLat([location.position.lat, location.position.lon]).addTo(map) 
                            const popup = new tt.Popup({ anchor: 'top' }).setText('Posizione esatta fornita dopo la prenotazione.')
                            marker.setPopup(popup)
                        })
                        
                    })
                    map.addControl(new tt.FullscreenControl());
                    map.addControl(new tt.NavigationControl());
                    this.map = Object.freeze(map);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {

                });
            })
            
        },
        map(){
            const iconMarker = document.getElementById('marker');
            let center = [9.192771, 45.463273]
            const map = tt.map({
            key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
            container: "map",
            center: center,
            zoom: 12
            })
            map.on('load', () => {
                    const iconMarker = document.getElementById('marker');
                    let marker = new tt.Marker({element: iconMarker}).setLngLat(center);
                    marker.addTo(map);
                })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        }
    },
    mounted(){
        this.map();
    },
    created(){
        this.getApartments();
    }
}
</script>

<template lang="">
    <div class="container">
        <SearchBarTomtom @location="getHouses"/>
        <div id="map" class="map">
            <div id="marker" class="d-flex justify-content-center align-items-center"><font-awesome-icon icon="fa-solid fa-house" class="icon"/></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/general.scss" as *;

    #map{
        height: 500px;
        .custom-popup{
            border-radius: 20px;
            font-size: 100rem;
        }
        .marker{
            background-color: $main-bg-color;
            border-radius: 50%;
            .icon{
                color: white;
                font-size: 1.3rem;
                padding: 14px;
            }
        }

    }
</style>