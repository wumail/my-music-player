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
      <!-- <Icon :iconinfo='iconItems.favorite' /> -->
      <!-- <Icon :iconinfo='iconItems.play_fill' />
      <Icon :iconinfo='iconItems.add' /> -->
      <Icon
        :iconinfo='iconItems.more'
        @click='toggleDrawer(song)'
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, reactive, ref } from "vue";
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
            {
                name:'Shine On You Crazy Diamond',
                artist:'Pink Floyd',
                scr:'https://music.163.com/song/media/outer/url?id=4235845.mp3',
            },
            {
                name:'Comfotably Numb',
                artist:'Pink Floyd',
                scr:'https://music.163.com/song/media/outer/url?id=28238311.mp3',

            },
            {
                name:'Jazz Suite No.2:Waltz No.2',
                artist:'The City',
                scr:'https://music.163.com/song/media/outer/url?id=518649049.mp3',
            },
            {
                name:'静止',artist:'杨乃文',
                scr:'https://music.163.com/song/media/outer/url?id=316103.mp3',
            },
            {
                name:'星星堆满天',artist:'杨乃文',
                scr:'https://music.163.com/song/media/outer/url?id=316103.mp3',
            },
            {
                name:'Silence',artist:'杨乃文',
                scr:'https://music.163.com/song/media/outer/url?id=316084.mp3',
            },
        ]
    }
)

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

function toggleDrawer(data) {
    console.log(data);
    drawer.value = !drawer.value
}

</script>

<style lang="scss">
</style>