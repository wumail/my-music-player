<template>
  <div>
    <PlayList :resource='resource.list' />
  </div>
</template>

<script setup>
import { net163_playlist } from "@/api/netease";
import { onMounted, reactive } from "@vue/runtime-core";
import PlayList from './list.vue';

const resource = reactive(
    {
        list:[]
    }
)

onMounted(()=>{
    getPlayList_net163()
})

function getPlayList_net163() {
    net163_playlist().then((response)=>{
        const playlist = response.playlist;
        let userId = playlist[0].userId;
        const userlist = playlist.filter((list)=>{
            return userId===list.userId
        });
        resource.list = userlist;
        console.log(userlist);
    }).catch((err)=>{
        console.log(err);
    })
}
</script>

<style scss>
</style>
