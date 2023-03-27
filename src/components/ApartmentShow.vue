<script>
export default {
    data() {
        return {
            imageBaseURL: 'http://127.0.0.1:8000/',
        }
    },
    props: {
        apartment: Object,
    }
}
</script>
<template lang="">
    <div class='container'>
        <div class='col-12'>
            <h2>{{apartment.title}}</h2>
            <h6>{{apartment.address}}</h6>
            <img :src="imageBaseURL+'storage/'+apartment.image" alt="" class='rounded mx-auto d-block'>
        <div class='mt-5 col-8'></div>
            <span> Numero di stanze: {{apartment.rooms}} &#8226;</span>
            <span> Numero di letti: {{apartment.beds}} &#8226;</span>
            <span> Numero di bagni: {{apartment.bathrooms}}</span>
        </div>
    </div>
</template>
<style lang="scss">
    
</style>