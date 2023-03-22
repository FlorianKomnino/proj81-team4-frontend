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
.header-container {
    height: 8vh;
    position: fixed;
    z-index: 2;

    a {
        background-color: white;
        padding: 10px;
        border: 1.5px solid transparent;
        text-decoration: none;
        color: black;
        margin: 1rem;

        &:hover {
            border: 1.5px solid black;
            border-radius: 30px;

        }
    }

    .logo {
        height: 100%;
        transform: scale(0.7);
    }
}
</style>