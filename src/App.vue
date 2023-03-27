<script>
import HelloWorld from './components/HelloWorld.vue';
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: "App",

  components: {
    HelloWorld,
    HeaderComponent,
  }
}

</script>

<template>
  <header>
    <HeaderComponent />
  </header>
  
  <main>
    <router-view></router-view>
  </main>
</template>

<style lang="scss">
@use "./styles/general.scss" as *;

main{
  padding-top: 8vh;
  position: relative;

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
}


</style>
