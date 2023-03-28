<script>
import tt from '@tomtom-international/web-sdk-maps'
export default {
    data() {
        return {
            imageBaseURL: 'http://127.0.0.1:8000/',
            positionUrlAddress: 'https://api.tomtom.com/search/2/geometryFilter.json',
            longitude: 0,
            latitude: 0,
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

            })
            map.addControl(new tt.FullscreenControl());
            map.addControl(new tt.NavigationControl());
        },
    },
    mounted() {
        this.initialMap()
        console.log(this.$props.apartment)        
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class='col-12'>
            <h2>{{apartment.title}}</h2>
            <h6>{{apartment.address}}</h6>
            <div class="img-wrapper col-12">
                <img v-if="image.startsWith('http')" :src="image" class="rounded mx-auto d-block" alt="image">
                <img v-else :src="imageBaseURL+'storage/'+image"  class='rounded mx-auto d-block' alt="image">
            </div>
        <div class='mt-5 col-8'></div>
            <span> Numero di stanze: {{apartment.rooms}} &#8226;</span>
            <span> Numero di letti: {{apartment.beds}} &#8226;</span>
            <span> Numero di bagni: {{apartment.bathrooms}}</span>
        </div>
        <div class='mt-5'>
            <h3>Cosa troverai</h3>
            <p v-for="service in apartment.services">
                <font-awesome-icon :icon="service.icon" />
                {{service.name}}                
            </p>
        </div>
        <div class="map-container col-12">
            <h3>Dove ti troverai</h3>
            <div id="map" class="map mb-3"></div>
        </div>
    </div>
</template>
<style lang="scss">
@use "../styles/general.scss" as *;
#map{
    height: 400px;
    width: 100%;
}
img{
        width: 100%;
    }
</style>