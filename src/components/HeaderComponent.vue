<script>
export default {

}
</script>

<template lang="">
    <div class="container-fluid header-container">
        <div class="row justify-content-between align-items-center h-100">
            <div class="col-3 h-100 p-0">
                <img src="../assets/imgs/Boolbnb_md_logo.png" class="img-fluid logo p-0" alt="Boolbnb logo">
            </div>
            <div class="col-3 justify-content-end d-flex">
                <button>
                    Accedi
                </button>
                <router-link :to="{name:'RegistrationForm'}" class="btn btn-primary">Sign up</router-link>
                <router-link :to="{name:'LoginForm'}" class="btn btn-primary ms-2">Login</router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .header-container{
        height: 8vh;
        position: fixed;
        z-index: 2;

        button{
            background-color: white;
            border: 1px solid lightgray;
            border-radius: 30px;
            padding: 10px;
        }

        .logo{
            height: 100%;
            transform: scale(0.7);
        }
    }
</style>