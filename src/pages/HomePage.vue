<script>
import IconCard from '../components/IconCard.vue';



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

    }
}

</script>

<template lang="">
    <!-- <div class="container">
        <div class="row">
            <div class="col-12 d-flex justify-content-between mb-5">
                <IconCard v-for="icon in icons" :iconArgument="icon.title" :faIconString="icon.icon"/>
            </div>
        </div>
    </div>
    <a :href="'http://localhost:5174/search?where='+locationQuery" class="btn btn-primary">Cerca</a> -->
    <div class="main-container">
        <div class="container-fluid search-bar-container">
            <div class="form-container mb-3">
                <form class="row">
                    <div class="col-6 d-flex d-flex align-items-center search-wrapper">
                        <label class="text-nowrap me-2">Inserisci una città:</label>
                        <input id="address" name="address" type="text" class="form-control shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                        placeholder="Search" v-model="locationQuery">
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