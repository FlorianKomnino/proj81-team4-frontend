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
        getHouses(locationQuery) {
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
                        radius: 10000
                        }
                    ]),
                    poiList: JSON.stringify(this.apartmentsList)
                }
                })
                .then((response) => {
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
        },
        getCoordinate(locationQuery) {
            axios.get(this.urlAddress + `${locationQuery}.json`, {
                params: {
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                }
            })
            .then((response) => {
                console.log(response.data.results[0]);
                const map = tt.map({
                key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                container: "map",
                center: response.data.results[0].position,
                zoom: 15
                })
                map.on('load', () => {
                    const iconMarker = document.getElementById('marker');
                    let customPopup = document.createElement('div');
                    customPopup.classList.add("custom-popup");
                    customPopup.innerHTML = '<p style="font-size: 0.9rem" class="m-0 me-2">Posizione esatta fornita dopo la prenotazione.</p>'
                    let popupOffsets = {
                    top: [0, 0],
                    bottom: [0, -50],
                    }
                    let popup = new tt.Popup({ offset: popupOffsets, className: 'custom-popup'}).setDOMContent(customPopup);
                    new tt.Marker({element: iconMarker}).setLngLat(response.data.results[0].position).addTo(map).setPopup(popup).togglePopup()
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
            /* let map = tt.services.fuzzySearch({
                key: 'jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr',
                query: 'milano' //The input gotten from the search
            }).go().then(function (response) {
                map = tt.map({
                    key: API_KEY,
                    container: 'map-div',
                    center: response.results[0].position,
                    zoom: 12
                });
            }) */
        }
    },
    mounted(){
        this.map();
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