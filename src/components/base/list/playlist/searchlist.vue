<template>
  <div>
    <ListComp :songlist='songs.songlist' />
  </div>
</template>
<script>
export default {
    name:'SearchList'
}
</script>
<script setup>
import { defineProps, inject, nextTick, onBeforeMount, reactive, ref, watchEffect } from "vue";
import ListComp from '../index.vue';

const props = defineProps(
    {
        searchRes:{
            type:Object,
            default:()=>{}
        }
    }
)

const songs = reactive(
    {
        songlist: []
    }
)

watchEffect(()=>{
    songs.songlist = props.searchRes;
    setData()
})


function setData() {
    // console.log(songs.songlist);
    songs.songlist.forEach(song => {
        let artist = '';
        for(let i = 0 ; i<song?.artists.length;i++){
            artist += `${song?.artists[i].name}/`
        }
        song.artist = artist
    });
}

</script>

<style lang="scss">
</style>