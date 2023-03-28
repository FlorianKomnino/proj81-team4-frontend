<script>
import MapTomtom from '../components/Tomtom/MapTomtom.vue';
import IconCard from '../components/IconCard.vue';

export default {
    name: 'HomePage',
    components: {
        MapTomtom,
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
            ]
        }
    },
}

</script>

<template lang="">
    <div class="container mt-2">
        <div class="row">
            <div class="col-12 d-flex justify-content-between">
                <IconCard v-for="icon in icons" :iconArgument="icon.title" :faIconString="icon.icon"/>
            </div>
        </div>
    </div>
    <MapTomtom />
</template>

<style lang="scss" scoped></style>