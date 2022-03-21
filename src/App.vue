
<template>
  <div class="global-theme">
    <!-- <img
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <router-view />
  </div>
</template>

<script setup>
// import HelloWorld from './components/HelloWorld.vue'

// import { onMounted } from "vue";

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style lang="scss">
.global-theme {
  /* color: aliceblue !important; */
  /* background: #2c3e50; */
  .album,.infoblock{
    filter: invert(100%);
  }
  .list_item{
    img{
      filter: invert(100%);
      
    }
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  
}

</style>
