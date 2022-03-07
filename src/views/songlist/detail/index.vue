<template>
  <div class="songlist">
    <SearchList
      v-if="flag ==='SearchList'"
      :searchRes='props.searchResult'
    />
    <PlayList v-else-if="flag ==='PlayList'" />
    <HistoryList v-else-if="flag ==='HistoryList'" />
  </div>
</template>

<script setup>
import { defineProps, inject, ref, watch, watchEffect } from '@vue/runtime-core';
import HistoryList from './historylist.vue';
import PlayList from './playlist.vue';
import SearchList from './searchlist.vue';

const props = defineProps(
  {
    searchResult:{
      type:Object,
      default:()=>{}
    }
  }
)

let flag = inject('flag');

</script>

<style lang="scss">
</style>