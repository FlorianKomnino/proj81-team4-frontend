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
                <router-link to="/" class="logo-redirect">
                <img src="../assets/imgs/Boolbnb_md_logo-transformed.svg" class="p-0" alt="Boolbnb logo">
                </router-link>
            </div>
            <div class="access-buttons col justify-content-end d-flex">
                <a href="http://127.0.0.1:8000/login">
                    Accedi
                </a>
                <a class="mx-2" href="http://127.0.0.1:8000/register">
                    Registrati
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/colors.scss';

#header-container {
    height: 100%;

    .logo-redirect{
        border: none;
        background-color: rgba(255, 255, 255, 0);
        &:hover{
            border: none;
        }
    }

    .row{
        height: 100%;
        .img-wrapper{
            height: 100%;
            width: 300px;
            img{
                filter: $main-bg-color-filter;
                height: 100%;
            }
        }
    }

    .access-buttons{
        a {
            background: linear-gradient(108deg, white 0 45%, $main-bg-color 45% 90%, white 90% 100%);
            background-size: 190%;
            width: 100px;
            padding: 10px;
            border-radius: 30px;
            text-decoration: none;
            color: $main-bg-color;
            width: 110px;
            box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    
            transition: all .3s;
    
            &:hover {
                color: white;
                background-position: right;
            }
        }
    }

    .logo {
        transform: scale(0.5);
    }
}
</style>