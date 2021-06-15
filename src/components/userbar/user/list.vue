<template>
  <div>
    <template
      v-for="list in props.resource"
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
import { defineProps, ref, watchEffect } from "@vue/runtime-core";
import { net163_playlist_detail } from '@/api/netease.js'

const props = defineProps(
    {
        resource:{
            type:Array,
            default:()=>{}
        }
    }
)

function getListDetail(list) {
    net163_playlist_detail({
        id:list.id
    }).then((response) => {
        console.log(response);
    }).catch((err) => {
        
    });
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
