<script>
import axios from 'axios';
import ApartmentCard from '../ApartmentCard.vue';

export default {
    name: 'SponsoredApartment',
    components: {
        ApartmentCard,
    },
    data() {
        return {
            sponsoredApartments: [],
            sponsoredApartmentsUrlAddress: 'http://127.0.0.1:8000/api/sponsoredApartments',
            imageBaseURL: 'http://127.0.0.1:8000/',
        }
    },
    methods: {
        getSponsoredApartments() {
            axios.get(this.sponsoredApartmentsUrlAddress, {
                params: {
                }
            })
            .then((response) => {
                response.data.results.forEach(element => {
                    this.sponsoredApartments.push(element);
                });
            })
        }
    },
    created() {
        this.getSponsoredApartments();
    },
}

</script>

<template>

    <div class="container my-5">
        <div class="row apartment-container" v-if="sponsoredApartments">
            <div class="col-12 col-md-6 col-xl-3" v-for="apartment in sponsoredApartments">
                <ApartmentCard :image="apartment.image" :apartment='apartment'/>
            </div>
        </div>
    </div>
    
</template>

<style lang="scss" scoped>
@import '../../styles/partials/colors.scss';
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