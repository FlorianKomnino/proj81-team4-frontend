<script>

export default {
    name: 'ApartmentCard',
    data(){
        return{
            imageBaseURL: 'http://127.0.0.1:8000/',
        }
    },
    props: {
        apartment: {
            type: Object,
            required: true,
        },
        image: String,
        isShow: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    mounted() {
        console.log(this.$props)
    },

}
</script>

<template>
    <div class="card h-100 border-0">
        <img v-if="image.startsWith('http')" :src="image" class="card-img-top rounded rounded-4" alt="image">
        <img v-else :src="imageBaseURL+'storage/'+image" class="card-img-top rounded rounded-4" alt="image">
        <div class="card-body px-0">
            <h5 class="card-title">{{apartment.title}}</h5>
            <p class="card-text">Indirizzo: {{apartment.address}}</p>
            <p class="card-text">Numero di stanze: {{apartment.rooms}}</p>
            <p class="card-text">Numero di letti: {{apartment.beds}}</p>
            <p>distante {{ Math.round(apartment.distance) }}km dal punto richiesto</p>
            <router-link :to="{ name: 'apartment', params: { slug: apartment.slug } }"
                class="btn btn-primary mt-5">View Apartment
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>