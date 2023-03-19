<script>
import MapTomtom from '../components/Tomtom/MapTomtom.vue';

export default {
    name: 'HomePage',
    components: {
        MapTomtom,
    },
    data() {
        return {
        
        }
    },
}

</script>

<template lang="">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>
                    Welcome to BoolBnB
                </h1>
            </div>
        </div>
    </div>
    <MapTomtom />
</template>

<style lang="scss" scoped>

    #map { 
        height: 50vh; 
        width: 50vw; 
    } 

</style>