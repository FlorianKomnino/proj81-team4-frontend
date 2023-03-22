<script>
export default {
    name: 'ApartmentCard',
    props: {
        title: String,
        image: String,
        rooms: Number,
        beds: Number,
        address: String,
    },
    data(){
        return{
            imageBaseURL: 'http://127.0.0.1:8000/',
        }
    }
}
</script>

<template>
    <div class="card h-100 border-0">
        <img :src="imageBaseURL+'storage/'+image" class="card-img-top rounded rounded-4" alt="image">
        <div class="card-body px-0">
            <h5 class="card-title">{{title}}</h5>
            <p class="card-text">Indirizzo: {{address}}</p>
            <p class="card-text">Numero di stanze: {{rooms}}</p>
            <p class="card-text">Numero di letti: {{beds}}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    
</style>