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

header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 95px;
  z-index: 5;
  background-color: white;
  border-bottom: 1px solid $main-bg-color;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;}

main{
  margin-top: 95px;
  position: relative;

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
}


</style>
