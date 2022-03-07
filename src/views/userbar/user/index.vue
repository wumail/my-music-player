<template>
  <div>
    <!-- <User
      v-if="wrap==='user'"
      ref="userRef"
    />
    <Favorite
      v-else-if="wrap==='favorite'"
      ref="favoriteRef"
    />
    <Songlist
      v-else-if="wrap==='songlist'"
      ref="songlistRef"
    /> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script setup>
// import { reactive,provide,onMounted, watchEffect, ref } from "vue";
import Favorite from './favorite.vue';
import User from './user.vue';
import Songlist from './songlist.vue';


// let userRef = ref();
// let favoriteRef = ref();
// let songlistRef = ref();

// let wrap = inject('wrap');
</script>
<style lang="scss">
</style>