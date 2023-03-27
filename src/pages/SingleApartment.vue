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
            urlAddress: 'http://127.0.0.1:8000/api/apartments/' + this.$route.params.slug,
        }
    },
    methods: {
        getApartment(){
            console.log(this.$route);
            axios.get(this.urlAddress, {
                params: {
                }
            })
            .then((response) => {
                this.apartment = response.data.data;
            })
            .catch(function (error) {
                console.warn(error);
            });
        }
    },
    created() {
        this.getApartment();
    },
}
</script>
<template>
    <div class="container">
        <ApartmentShow  :apartment="apartment" />
    </div>
</template>
<style lang="">
</style>