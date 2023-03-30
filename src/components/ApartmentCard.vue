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
        <div class="apartment-card d-flex rounded rounded-4 flex-column justify-content-between">
            <div class="img-wrapper">
                <img v-if="image.startsWith('http')" :src="image" alt="image">
                <img v-else :src="imageBaseURL+'storage/'+image" alt="image">
            </div>
            <div class="content">
                <h5>{{apartment.title}}</h5>
                <p><span class="brand-color-span">Indirizzo:</span>  {{apartment.address}}</p>
                <p><span class="brand-color-span">Numero di stanze:</span>  {{apartment.rooms}}</p>
                <p><span class="brand-color-span">Numero di letti:</span>  {{apartment.beds}}</p>
                <p><span class="brand-color-span">distante</span>  {{ (Math.round(apartment.distance * 10)/10) }}km dal punto richiesto</p>
            </div>
            <div class="show-element align-self-center">
                <router-link :to="{ name: 'apartment', params: { slug: apartment.slug } }"
                    class="show-button">Visualizza
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/colors.scss';
.apartment-container{
    height: 100%;

    .apartment-card{
        height: 100%;
        background-color: white;
        transition: all .6s;
        border-radius: 25px;
        background: #fafafa;
        box-shadow:  -10px 10px 20px #8d8d8d, 10px -10px 20px #ffffff;
        .img-wrapper{
            position: relative;
            height: 240px;
            width: 100%;
            border-radius: 15px 15px 0 0;
            text-align: center;
            overflow: hidden;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                min-height: 240px;
                min-width: 300px;
            }
        }

        .content{
            padding-left: 12px;
        }

        .show-element{
            padding-bottom: 30px;

            .show-button {
                background: linear-gradient(108deg, white 0 45%, $main-bg-color 45% 92%, white 92% 100%);
                background-size: 200%;
                padding: 10px 30px;
                border-radius: 30px;
                box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
                text-decoration: none;
                color: $main-bg-color;
                transition: all .3s;
    
                &:hover {
                    color: white;
                    background-position: right;
                }
            }
        }

    }
}
</style>