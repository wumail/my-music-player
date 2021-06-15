<template>
  <div class="songlist">
    <!-- <router-view v-slot="{ Component, route }">
      <transition>
        <keep-alive>
          <component
            v-if="route.meta.keepAlive"
            :key="route.name"
            :is="Component"
          />
        </keep-alive>
      </transition>
    </router-view> -->
    <router-view ref="list" />
  </div>
</template>

<script setup>
import { ref } from "vue";

// const includelist=reactive(
//   [
//     'HistoryList',
//     'PlayList',
//     'SearchList',
//   ]
// )
let list = ref('');

</script>

<style lang="scss">
</style>