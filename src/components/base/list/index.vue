<template>
  <div>
    <div
      class="songitem"
      v-for="(song,index) in songs.songlist"
      :key="song.id"
    >
      <span class="songindex"> {{index+1}}</span>
      <span class="songname">{{song.name}}
        <span class="songartist">{{song.artist}}</span>
      </span>
      <Icon
        :iconinfo='iconItems.more'
        @click='toggleDrawer(song)'
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useRoute,useRouter } from "vue-router";

import Icon from '@/components/base/icon/index.vue';

const route = useRoute();
const router = useRouter();

const props = defineProps(
    {
        songlist:{
            type:Array,
            default:()=>{}
        },
    }
)

const songs = reactive(
    {
        songlist:[
        ]
    }
)

watchEffect(()=>{
  initlist()
})

function initlist() {
    songs.songlist = props.songlist;
}

onBeforeMount(()=>{
    initlist()
})

const iconItems = reactive(
    {
        more:{
            type:'more',
            size:24
        },
    }
)

let drawer = ref(null);
drawer = inject('drawer');
// console.log(drawer);

function toggleDrawer(data) {
    console.log(data);
    drawer.value = !drawer.value
}

</script>

<style lang="scss">
</style>