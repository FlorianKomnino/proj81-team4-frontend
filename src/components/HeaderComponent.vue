<script>
export default {
    name: 'HeaderComponent',
    data() {
        return {
            
        }
    },
    methods: {
        goToHome(){
            this.$router.push('')
        }
    },
}
</script>

<template lang="">
    <div id="header-container" class="container-fluid">
        <div class="row justify-content-between align-items-center">
            <div class="img-wrapper">
                <router-link :to="'./'" class="logo-redirect">
                <img src="../assets/imgs/Boolbnb_md_logo.png" class="p-0" alt="Boolbnb logo">
                </router-link>
            </div>
            <div class="col-3 justify-content-end d-flex">
                <a href="http://127.0.0.1:8000/login">
                    Accedi
                </a>
                <a href="http://127.0.0.1:8000/register">
                    Registrati
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

#header-container {
    height: 100%;

    .logo-redirect:hover{
        border: 1px solid white;
    }

    .row{
        height: 100%;
        .img-wrapper{
            height: 100%;
            width: 300px;
            img{
                height: 100%;
            }
        }
    }


    a {
        background-color: white;
        padding: 10px;
        border: 1.5px solid transparent;
        text-decoration: none;
        color: black;

        &:hover {
            border: 1.5px solid black;
            border-radius: 30px;

        }
    }

    .logo {
        transform: scale(0.5);
    }
}
</style>