<script>
export default {
    name: 'SearchBarTomtom',
    data() {
        return {
            locationQuery: '',
            radius: '20',
        }
    }
}
</script>

<template lang="">
    <div class="form-container input-group mb-3">
        <form class="d-flex align-items-center" @keyup="$emit('location', locationQuery, radius)">
            <div class="d-flex me-2 d-flex align-items-center">
                <label class="text-nowrap me-2">Inserisci una città:</label>
                <input type="text" class="form-control shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                placeholder="Search" v-model="locationQuery">
            </div>
            <div class="d-flex d-flex align-items-center me-2">
                <label class="text-nowrap me-2">Inserisci un raggio (km):</label>
                <input type="number" class="form-control shadow-none" v-model="radius">
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/general.scss" as *;

button {
    @include standard-button;
}

*:focus {
    outline: none;
}
</style>