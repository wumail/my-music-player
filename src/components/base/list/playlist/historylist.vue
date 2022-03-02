<template>
  <div>
    <ListComp :songlist='songs.songlist' />
  </div>
</template>

<script>
export default {
    name:'HistoryList'
}
</script>
<script setup>
import { reactive, watchEffect } from "vue";

import ListComp from '../index.vue';
import { useStore } from 'vuex';

const store = useStore();

const songs = reactive(
    {
        songlist:[
        ]
    }
)

watchEffect(()=>{
    songs.songlist = store.getters['playerNsong/historyList'];
})
</script>

<style lang="scss">
</style>