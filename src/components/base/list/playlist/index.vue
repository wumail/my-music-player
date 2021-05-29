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
    <router-view />
  </div>
</template>

<script setup>
// import { reactive } from "vue";

// const includelist=reactive(
//   [
//     'HistoryList',
//     'PlayList',
//     'SearchList',
//   ]
// )
</script>

<style lang="scss">
</style>