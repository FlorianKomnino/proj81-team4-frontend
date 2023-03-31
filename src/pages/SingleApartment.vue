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
            hasData: false,
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
                this.hasData = true
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
    <ApartmentShow v-if="hasData"  :image='apartment.image' :apartment="apartment" :position="position" />
</template>
<style lang="scss">
</style>