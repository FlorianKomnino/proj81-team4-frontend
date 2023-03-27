<script>
import tt from '@tomtom-international/web-sdk-maps'
export default {
    data() {
        return {
            imageBaseURL: 'http://127.0.0.1:8000/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
        }
    },
    props: {
        apartment: Object,
        position: Object
    },
    methods: {
    initialMap() {
            const iconMarker = document.getElementById('marker');
            let center = [this.$props.position.lon,this.$props.position.lat]
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
        this.initialMap()
        console.log(this.$props)
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class='col-12'>
            <h2>{{apartment.title}}</h2>
            <h6>{{apartment.address}}</h6>
            <img :src="imageBaseURL+'storage/'+apartment.image" alt="" class='rounded mx-auto d-block'>
        <div class='mt-5 col-8'></div>
            <span> Numero di stanze: {{apartment.rooms}} &#8226;</span>
            <span> Numero di letti: {{apartment.beds}} &#8226;</span>
            <span> Numero di bagni: {{apartment.bathrooms}}</span>
        </div>
        <div class="map-container col-12">
            <div id="map" class="map"></div>
        </div>
    </div>
</template>
<style lang="scss">
@use "../styles/general.scss" as *;
#map{
    height: 400px;
    width: 100%;
}
</style>