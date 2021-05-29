<template>
  <div>
    <List :songlist='songs.songlist' />
  </div>
</template>

<script setup>
import List from '@/components/base/list/index.vue';
import { reactive } from "vue";

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
                artist:'The City of Prague Philharmonic Orchestra',
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

</script>
<style lang="scss">
</style>