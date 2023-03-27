<script>
export default {
    name: 'ApartmentCard',
    props: {
        title: String,
        image: String,
        rooms: Number,
        beds: Number,
        address: String,
        apartment: {
            type: Object,
            required: true,
        },
        isShow: {
            type: Boolean,
            required: false,
            default: false,
            }
    },
    data(){
        return{
            imageBaseURL: 'http://127.0.0.1:8000/',
        }
    },
    mounted() {
        console.log(this.apartment)
    }
}
</script>

<template>
    <div class="card h-100 border-0">
        <img v-if="image.startsWith('http')" :src="image" class="card-img-top rounded rounded-4" alt="image">
        <img v-else :src="imageBaseURL+'storage/'+image" class="card-img-top rounded rounded-4" alt="image">
        <div class="card-body px-0">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">Indirizzo: {{address}}</p>
            <p class="card-text">Numero di stanze: {{rooms}}</p>
            <p class="card-text">Numero di letti: {{beds}}</p>
            <router-link v-if="!isShow" :to="{ name: 'apartment', params: { slug: apartment.slug } }"
                class="btn btn-primary mt-5">View Apartment
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>