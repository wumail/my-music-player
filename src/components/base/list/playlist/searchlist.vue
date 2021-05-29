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
import { reactive } from "vue";
import ListComp from '../index.vue';

const songs = reactive(
    {
        songlist:[
            {
                name:'Shine On You Crazy Diamond',
                artist:'Pink Floyd'
            },
            {
                name:'Jazz Suite No.2:Waltz No.2',
                artist:'The City of Prague Philharmonic Orchestra'
            },
            {
                name:'静止',artist:'杨乃文'
            },
            {
                name:'星星堆满天',artist:'杨乃文'
            },
            {
                name:'Silence',artist:'杨乃文'
            },
        ]
    }
)
</script>

<style lang="scss">
</style>