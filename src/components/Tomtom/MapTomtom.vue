<script>
import tt from '@tomtom-international/web-sdk-maps'
import SearchBarTomtom from './SearchBarTomtom.vue';
import axios from 'axios';

export default {
    name: 'MapTomtom',
    components: {
        SearchBarTomtom,
    },
    data(){
        return{
            urlAddress: 'https://api.tomtom.com/search/2/search/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json'
        }
    },
    methods: {
        /* pippo() {
            const iconMarker = document.getElementById('marker');
            const center = [9.190448, 45.464189];
            const apartment1 = 'Corso Magenta, 2-22, 20121 Milano MI';
            const apartment2 = 'Viale Belisario, 3, 20145 Milano MI';
            const apartment3 = 'Viale Luigi Sturzo, 20154 Milano MI';
            axios.get(this.positionUrlAddress, {
                params: {
                    key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
                    geometryList: [{
                        "type": "CIRCLE",
                        "position": "9.190448, 45.464189",
                        "radius": 10000
                    }
                    ],
                    poiList: [{
                        "poi": {
                            "name": ""
                        },
                        "address": {
                            "freeformAddress": 'Foro Buonaparte, 20121 Milano MI'
                        },
                        "position": {
                        "lat": 9.179457,
                        "lon": 45.467617
                        }
                        },
                        {
                        "poi": {
                            "name": ""
                        },
                        "address": {
                            "freeformAddress": 'Via Leone XIII, 27, 20145 Milano MI'
                        },
                        "position": {
                        "lat": 9.163493,
                        "lon": 45.475231
                        }
                        },
                        {
                        "poi": {
                            "name": ""
                        },
                        "address": {
                            "freeformAddress": 'Via Lipari, 9, 20144 Milano MI'
                        },
                        "position": {
                        "lat": 9.161626,
                        "lon": 45.461156
                        }
                        }
                ],
                }
            })
            .then((response) => {
                console.log(response);
                
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {

            });
        }, */
        map(){
            const iconMarker = document.getElementById('marker');
            let customPopup = '<div class"">Il tuo appartamento</div>';
            let center = [9.192771, 45.463273]
            const map = tt.map({
            key: "jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr",
            container: "map",
            center: center,
            zoom: 12
            })
            map.on('load', () => {
                    let popupOffsets = {
                    top: [0, 0],
                    bottom: [0, -40],
                    }
                    let popup = new tt.Popup({ offset: popupOffsets }).setHTML(customPopup)
                    new tt.Marker({element: iconMarker}).setLngLat(center).addTo(map).setPopup(popup).togglePopup()
                })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        },
        getCoordinate(locationQuery) {
            const iconMarker = document.getElementById('marker');
            let center = [9.192771, 45.463273]
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
                    let popupOffsets = {
                    top: [0, 0],
                    bottom: [0, -50],
                    }
                    let popup = new tt.Popup({ offset: popupOffsets }).setHTML(
                        "Il tuo appartamento"
                    )
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
        this.pippo();
    }
}
</script>

<template lang="">

    
    
    <div class="container">
        <SearchBarTomtom @location="getCoordinate"/>
        <div id="map" class="map">
            <div id="marker"><font-awesome-icon icon="fa-solid fa-house" class="icon"/></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #map{
        height: 500px;
        #marker{
            .icon{
                height: 25px;
            }
        }

    }
</style>