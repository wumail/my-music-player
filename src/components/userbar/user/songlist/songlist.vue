<template>
  <div class="songlist">
    <List :songlist='songs.songlist' />
  </div>
</template>

<script setup>
import List from "./index.vue";
import { ref,reactive } from "vue";
import { onBeforeMount, onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

import { net163_playlist_detail, net163_playlist_all } from '@/api/netease.js';

const router = useRouter();
const route = useRoute();

let id = ref('');

const songs = reactive(
    {
        songlist:[
        ]
    }
)

onBeforeMount(()=>{
  getListDetail(route.params.id)
})

watchEffect(()=>{
  id.value = route.params.id;
  getListDetail(id.value)
})


async function getListDetail(id) {
  if(id){
    await net163_playlist_all({
      id
    }).then((response) => {
        // console.log(response);
        songs.songlist = response.songs;
    }).catch((err) => {
        console.log(err);
    });
  }

    // net163_playlist_detail({
    //     id
    // }).then((response) => {
    //     // console.log(response);
    //     songs.songlist = response.playlist.trackIds.splice(0,50);
    // }).catch((err) => {
        
    // });
}

</script>


<style lang='scss'>
</style>
