<template>
    <div class="container mt-3">
        <h1>ciao!</h1>
        <div class="row">
            <div v-for="element in 20" class="col-3 p-3">
                <div class="img-wrapper rounded-4 mb-3">
                </div>
                <div class="d-flex justify-content-between">
                    <div class="text-container">
                        <p>Riva, Italia</p>
                        <p>3 stanze 8 bagni</p>
                    </div>
                    <div class="rating">
                        <p>5 <font-awesome-icon :icon="['fas', 'star']" /></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ApartmentsIndex'
}
</script>

<style lang="scss" scoped>
    .img-wrapper{
        height: 200px;
        background-image: url('https://a0.muscache.com/im/pictures/53992414/64510035_original.jpg?im_w=1200');
        background-size: cover;
    }
</style>