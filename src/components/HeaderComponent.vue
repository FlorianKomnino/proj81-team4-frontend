<script>
//import { BDropdown } from 'bootstrap-vue'
//import { BDropdownItem } from 'bootstrap-vue'
export default {
    name: 'HeaderComponent',
    data() {
        return {
            // BDropdown,
            // BDropdownItem
        }
    },
    methods: {
        goToHome() {
            this.$router.push('')
        },

        smartphoneMenuToggle() {
            let menuElement = document.getElementById('submit-menu');
            if (menuElement.classList.contains('visible-class')) {
                menuElement.classList.remove('visible-class');
            } else {
                menuElement.classList.add('visible-class');
            }
        },
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

                <div>
                    <div class="btn d-sm-none" id="custom-menu-button" @click="smartphoneMenuToggle">
                        <font-awesome-icon :icon="['fas', 'bars']" class="custom-dropdown-icon"/>
                    </div>
                </div>
                <div class="smartphone-menu d-sm-none" id="submit-menu">
                    <a class="smarthponeScreenButtons" href="http://127.0.0.1:8000/login">Accedi</a>
                    <a class="smarthponeScreenButtons" href="http://127.0.0.1:8000/register">Registrati</a>

                </div>
                <a class="d-none d-sm-block wideScreenButtons" href="http://127.0.0.1:8000/login">Accedi</a>
                <a class="mx-2 d-none d-sm-block wideScreenButtons" href="http://127.0.0.1:8000/register">Registrati</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../styles/partials/colors.scss';

#header-container {
    height: 100%;

    .logo-redirect {
        border: none;
        background-color: rgba(255, 255, 255, 0);

        &:hover {
            border: none;
        }
    }

    .row {
        height: 100%;

        .img-wrapper {
            height: 100%;
            width: 300px;

            img {
                filter: $main-bg-color-filter;
                height: 100%;
            }
        }
    }

    .access-buttons {
        width: 100px;

        #custom-menu-button {
            position: fixed;
            top: 15px;
            right: 10px;
            z-index: 2;
        }


        .custom-dropdown-icon {
            color: $main-bg-color;
            font-size: 3rem;
        }

        .smartphone-menu {
            z-index: 0;
            position: fixed;
            top: 0;
            right: -220px;
            height: 100vh;
            width: 220px;
            border-left: 2px solid $main-bg-color;
            background-color: #ebdbdfdd;
            transition: all 0.4s;
            padding-top: 75px;

            .smarthponeScreenButtons {
                margin-top: 20px;
                display: block;
                text-decoration: none;
                font-size: 1.5rem;
                color: $main-bg-color;
                border-bottom: 1px solid $main-bg-color;
                padding-left: 30px;
                padding-bottom: 10px;

                &:first-child {
                    border-top: 1px solid $main-bg-color;
                    padding-top: 20px;

                }

            }
        }

        .visible-class {
            right: 0;
        }


        .wideScreenButtons {
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