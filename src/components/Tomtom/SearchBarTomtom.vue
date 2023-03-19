<script>
export default {
    name: 'SearchBarTomtom',
    data() {
        return {
            locationQuery: '',
        }
    }
}
</script>

<template lang="">
    <div class="container my-4">
        <div class="row w-50">
            <div class="input-group mb-3 col-3 p-0">
                <input type="text" class="form-control shadow-none" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"
                placeholder="Search" v-model="locationQuery" @keyup.enter="$emit('location', locationQuery)">
                <button href="#" @click="$emit('location', locationQuery)">Submit</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use "../../styles/general.scss" as *;

    button{
        @include standard-button;
    }

    *:focus {
        outline: none;
    }
</style>