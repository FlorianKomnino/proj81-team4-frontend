<script>
import SponsoredApartment from '../components/SponsoredApartment/SponsoredApartment.vue';
import IconCard from '../components/IconCard.vue';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';





export default {
    name: 'HomePage',
    components: {
        IconCard,
        SponsoredApartment,
    },
    data() {
        return {
            icons: [
                {
                    title: 'In evidenza',
                    icon: 'fa-solid fa-house-flag'
                },
                {
                    title: 'Campings',
                    icon: 'fa-solid fa-tents'
                },
                {
                    title: 'Con piscina',
                    icon: 'fa-solid fa-water-ladder'
                },
                {
                    title: 'Nella natura',
                    icon: 'fa-solid fa-tree'
                },
                {
                    title: 'Vintage',
                    icon: 'fa-solid fa-building-columns'
                },
                {
                    title: 'Apartments',
                    icon: 'fa-regular fa-building'
                },
                {
                    title: 'Panorama',
                    icon: 'fa-solid fa-panorama'
                },
                {
                    title: 'Promozioni',
                    icon: 'fa-solid fa-hand-holding-dollar'
                },
                {
                    title: 'Montagna',
                    icon: 'fa-solid fa-snowflake'
                },
                {
                    title: 'Al mare',
                    icon: 'fa-solid fa-water'
                },
                {
                    title: 'Accesso ai disabili',
                    icon: 'fa-solid fa-wheelchair'
                },
                {
                    title: 'Parcheggio privato',
                    icon: 'fa-solid fa-car'
                },
                {
                    title: 'Regala un soggiorno',
                    icon: 'fa-solid fa-gift'
                },
                {
                    title: 'I più votati',
                    icon: 'fa-regular fa-star'
                },
                {
                    title: 'Preferiti',
                    icon: 'fa-solid fa-heart'
                },
            ],
            locationQuery: ''
        }
    },
    methods: {
        autocompleteAddress(){
            const option = {
                idleTimePress: 100,
                minNumberOfCharacters: 0,
                searchOptions: {
                    key: 'jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr',
                    language: 'it-IT',
                    limit: 10,
                },
                autocompleteOptions: {
                    key: 'jEFhMI0rD5tTkGjuW8dYlC2x3UFxNRJr',
                    language: 'it-IT',
                    resultSet: 'category'
                },
                labels: {
                    noResultsMessage: 'Nessun risultato trovato'
                },
            }
            const ttSearchBox = new SearchBox(services, option);
            const searchBar = document.getElementById('searchbar');
            const searchBoxHTML = ttSearchBox.getSearchBoxHTML();
            searchBar.append(searchBoxHTML);
            const oldInput = this.locationQuery.value;
            const icon = document.querySelector('.tt-search-box-close-icon');
            ttSearchBox.on("tomtom.searchbox.resultselected", this.handleResultSelection);

            icon.addEventListener('click', function () {
                if (oldInput) {
                    this.locationQuery = oldInput
                } else {
                    this.locationQuery = ''
                }
            })
        },
        handleResultSelection(event) {
            // if you click the "X" on the search bar the handleResultSelection's result will be null and the input will have the old value
            if (event.data.result.address.freeformAddress) {
                this.locationQuery = event.data.result.address.freeformAddress
            }
        },
    },
    mounted() {
        this.autocompleteAddress()
    },
}

</script>

<template lang="">
    <div class="main-container">
        <section id="jumbotron">
            <div class="container-fluid search-bar-container">
                <form class="row align-items-center justify-content-center">
                    <div id="searchbar" class="col-9 col-md-7">
                        <input id="address" name="address" type="text" class="form-control d-none shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Search" v-model="locationQuery">
                        <router-link :to="{ name: 'search', query: { where: locationQuery } }" class="my-button">Cerca
                        </router-link>
                    </div>
                </form>
            </div>
        </section>
        <SponsoredApartment />
    </div>
</template>

<style lang="scss" scoped>
@import "../styles/partials/colors.scss";

#jumbotron{
    height: 360px;
    width: 100%;
    background-image: url(https://www.modulnova.it/foto/living/5cac33ee6bb0e201904090555584.jpg);
    background-size: cover;

    .search-bar-container{
        height: 100%;
        width: 100%;
        background-color: #ffffff70;

        form{
            height: 100%;

            #searchbar{
                position: relative;

                .my-button{
                    position: absolute;
                    text-decoration: none;
                    text-align: center;
                    line-height: 2.5rem;
                    background-color: $main-bg-color;
                    color: white;
                    top: 65px;
                    left: 12px;
                    height: 44px;
                    width: calc(100% - 24px);
                    
                    @media screen and (min-width: 576px) {
                        height: 44px;
                        width: 80px;
                        z-index: 1;
                        left: calc(100% - 92px);
                        top: 12px;
                    }
                }
            }
        }
    }
}
</style>