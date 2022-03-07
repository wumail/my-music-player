<template>
  <div>
    <template
      v-for="list in resource.list"
      :key="list.id"
    >
      <div
        class="list_item"
        @click="getListDetail(list)"
      >
        <img
          :src='list.coverImgUrl'
          alt=""
          class="list_cover"
        >
        <span class="list_name">
          {{list.name}}
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, inject, onMounted, provide, ref, reactive,watchEffect } from "@vue/runtime-core";
import { useStore } from 'vuex';
import { useRouter } from "vue-router";
import { net163_playlist,net163_playlist_detail } from '@/api/netease.js';


// const props = defineProps(
//     {
//         resource:{
//             type:Array,
//             default:()=>{}
//         }
//     }
// )
// console.log(props.resource);

const store = useStore();
const router = useRouter();

let net163UID = JSON.parse(store.getters['playerNsong/net163Userinfo']).net163_username;
// console.log(net163UID);

const resource = reactive(
    {
        list:[]
    }
)

onMounted(()=>{
    getPlayList_net163(net163UID)
})

function getPlayList_net163(net163UID) {
    net163_playlist(
      {username:net163UID
      }).then((response)=>{
        const playlist = response.playlist;
        let userId = playlist[0].userId;
        const userlist = playlist.filter((list)=>{
            return userId===list.userId
        });
        resource.list = userlist;
    }).catch((err)=>{
        console.log(err);
    })
}


function getListDetail(list) {
  router.push(`/songlist/${list.id}`)
  // location.reload();

    // net163_playlist_detail({
    //     id:list.id
    // }).then((response) => {
    //     console.log(response);
    // }).catch((err) => {
        
    // });
}

</script>

<style lang="scss">
.list_item {
  display: flex;
  margin: 10px;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px #ccc;
  .list_cover {
    width: 54px;
    margin: 5px 0px 5px 5px;
    border-radius: 50px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  .list_name {
    margin-left: 10px;
  }
}
</style>
