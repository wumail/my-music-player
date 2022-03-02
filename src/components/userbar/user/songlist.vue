<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <PlayList :resource='resource.list' /> -->
  </div>
</template>

<script setup>
import { inject, onMounted, provide, reactive } from "@vue/runtime-core";
import { useStore } from 'vuex';

import { net163_playlist } from "@/api/netease";
import PlayList from './songlist/playlist.vue';
import { useRouter } from "vue-router";


const store = useStore();
const router = useRouter();

let net163UID = JSON.parse(store.getters['playerNsong/net163Userinfo']).net163_username;
// console.log(net163UID);

const resource = reactive(
    {
        list:[]
    }
)

provide('playlist_list',resource.list)

onMounted(()=>{
    getPlayList_net163(net163UID)
})

function getPlayList_net163(net163UID) {
    net163_playlist({username:net163UID}).then((response)=>{
        const playlist = response.playlist;
        let userId = playlist[0].userId;
        const userlist = playlist.filter((list)=>{
            return userId===list.userId
        });
        resource.list = userlist;
        // console.log(userlist);
        // console.log(resource.list);
    }).catch((err)=>{
        console.log(err);
    })
}
</script>

<style scss>
</style>
