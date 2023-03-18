<script>
import { store } from '../store.js'
export default {
    name: 'DashboardComponent',
    data() {
        return {
            store,
            userData: []
        }
    },
    created() {
        this.userData = this.store.userData
        console.log(this.store.userData)
    },
}
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col-4 border border-1 border-secondary rounded-5 p-4">
                <div class="img-wrapper m-auto">
                    <font-awesome-icon class="user-icon" icon="fa-solid fa-user" />
                </div>
                <p class="text-center text-decoration-underline my-3">aggiungi/modifica foto</p>
                <h4 class="text-success">Utente registrato</h4>
                <p class="text-secondary">{{ userData.email }}</p>
                <p>benvenuto nella dashboard del tuo profilo</p>

            </div>
            <div class="col-8 px-5 py-4">
                <h2>Ciao {{userData.name}}!</h2>
                <p class="text-secondary">Su Bool BnB dal {{userData.subscribed_from}}</p>
                <p class="text-decoration-underline my-3">modifica il profilo</p>
                <a href="" class="btn btn-secondary">+ aggiungi appartamento</a><br>
                <a href="" class="btn btn-secondary my-3">Messaggi</a><br>
                <a href="" class="btn btn-secondary">&star; Visualizzazioni</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .img-wrapper{
        width: 120px;
        height: 120px;
        border-radius: 100%;

        .user-icon{
            width: 100%;
            height: 100%;
        }
    }
</style>