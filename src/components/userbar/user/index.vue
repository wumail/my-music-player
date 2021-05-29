<template>
  <div>
    <User v-if="wrap==='user'" />
    <Favorite v-else-if="wrap==='favorite'" />
    <Songlist v-else-if="wrap==='songlist'" />
  </div>
</template>

<script setup>
import { defineProps, inject, ref, watch } from "vue";
import Favorite from './favorite.vue';
import User from './user.vue';
import Songlist from './songlist.vue';

let wrap = inject('wrap');
</script>
<style lang="scss">
</style>