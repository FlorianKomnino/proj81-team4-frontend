<script>
import ApartmentShow from '../components/ApartmentShow.vue';
import axios from 'axios';
export default {
    name: 'SingleApartment',
    components: {
        ApartmentShow
    },
    data() {
        return {
            apartment: {},
            position: {},
            urlAddress: 'http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug,
        }
    },
    methods: {
        getApartment(){
            axios.get(this.urlAddress, {
                params: {
                }
            })
            .then((response) => {
                this.apartment = response.data.data;
                this.position = {lat:this.apartment.latitude,lon: this.apartment.longitude , id:this.apartment.id}
            })
            .catch(function (error) {
                console.warn(error);
            });
        },
    },
    
    created() {
        this.getApartment();
    },
}
</script>
<template>
    <div class="container">
        <ApartmentShow  :apartment="apartment" :position="position" />
    </div>
</template>
<style lang="scss">
</style>