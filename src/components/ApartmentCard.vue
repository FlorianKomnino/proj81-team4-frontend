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
    <div class="apartment-container mb-3 py-3">
        <div class="apartment-card d-flex p-2 rounded rounded-4 flex-column justify-content-between">
            <div class="img-wrapper rounded rounded-4">
                <img v-if="image.startsWith('http')" :src="image" alt="image">
                <img v-else :src="imageBaseURL+'storage/'+image" alt="image">
            </div>
            <div class="content">
                <h5>{{apartment.title}}</h5>
                <p>Indirizzo: {{apartment.address}}</p>
                <p>Numero di stanze: {{apartment.rooms}}</p>
                <p>Numero di letti: {{apartment.beds}}</p>
                <p>distante {{ Math.round(apartment.distance) }}km dal punto richiesto</p>
            </div>
            <div class="show-element align-self-center">
                <router-link :to="{ name: 'apartment', params: { slug: apartment.slug } }"
                    class="btn btn-primary mt-5">View Apartment
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.apartment-container{
    height: 100%;

    .apartment-card{
        height: 100%;
        background-color: white;
        transition: all .6s;
        .img-wrapper{
            height: 240px;
            width: 100%;
            text-align: center;
            overflow: hidden;
            img{
                width: 100%;
                min-height: 240px;
            }
        }

        &:hover{
            background-color: #f7f4f4;
        }
    }
}
</style>