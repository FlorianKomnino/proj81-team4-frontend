<script>
import IconCard from '../components/IconCard.vue';
import { services } from '@tomtom-international/web-sdk-services';
import SearchBox from '@tomtom-international/web-sdk-plugin-searchbox';





export default {
    name: 'HomePage',
    components: {
        IconCard,
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
        <div class="container-fluid search-bar-container">
            <div class="form-container mb-3">
                <form class="row">
                    <div class="col-6 d-flex align-items-center search-wrapper">
                        <label class="text-nowrap me-2">Inserisci una città:</label>
                        <div id="searchbar">
                            <input id="address" name="address" type="text" class="form-control d-none shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Search" v-model="locationQuery">
                        </div>
                    </div>
                    <div>
                        <router-link :to="{ name: 'search', query: { where: locationQuery } }" class="btn btn-primary">Cerca
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>