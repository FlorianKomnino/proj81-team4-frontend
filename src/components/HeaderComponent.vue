<script>
export default {

}
</script>

<template lang="">
    <div class="container">
        <div class="row justify-content-between align-items-center">
            <div class="col-3">
                <img src="../assets/imgs/Boolbnb_md_logo.png" class="img-fluid" alt="Boolbnb logo">
            </div>
            <div class="col-3 justify-content-end d-flex">
                <router-link :to="{name:'RegistrationForm'}" class="btn btn-primary">Sign up</router-link>
                <router-link :to="{name:'LoginForm'}" class="btn btn-primary ms-2">Login</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>