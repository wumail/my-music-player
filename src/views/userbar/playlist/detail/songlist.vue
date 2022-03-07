<template>
  <div class="songlist">
    <List :songlist='songs.songlist' />
  </div>
</template>

<script setup>
import List from "./index.vue";
import { ref,reactive } from "vue";
import { onMounted, watchEffect } from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";

import { net163_playlist_detail } from '@/api/netease.js';

const router = useRouter();
const route = useRoute();

let id = ref('');

const songs = reactive(
    {
        songlist:[
        ]
    }
)

watchEffect(()=>{
  id.value = route.params.id;
  getListDetail(id.value)
})


function getListDetail(id) {
    net163_playlist_detail({
        id
    }).then((response) => {
        // console.log(response);
        songs.songlist = response.playlist.trackIds.splice(0,20);
    }).catch((err) => {
        
    });
}

</script>


<style lang='scss'>
</style>
