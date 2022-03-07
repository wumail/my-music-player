<template>
  <div>
    <el-row>
      <el-col
        :span='8'
        class="left"
      >
        <UserBar />
      </el-col>
      <el-col
        :span='8'
        class="main"
      >
        <Player @togglePlayList='togglePlayList' />
      </el-col>
      <el-col
        :span='8'
        class="right"
      >
        <PlayList :ifshow='showPlayList' />
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { onMounted, provide, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Icon from '@/components/base/icon/index.vue';
import UserBar from '@/components/userbar/index.vue';
import Player from '@/components/player/index.vue';
import PlayList from '@/components/playlist/index.vue';

const router = useRouter();
const route = useRoute();
let showPlayList = ref(false);

const panelItems = reactive(
  [
    {
      item:{
        type:'listplay',
        size:32,
      },
      txt:'播放歌曲'
    },
    {
      item:{
        type:'favorite',
        size:32,
      },
      txt:'添加至喜爱',  
    },
    {
      item:{
        type:'add',
        size:32,
      },
      txt:'添加至歌单'
    },
    {
      item:{
        type:'mv1',
        size:32,
      },
      txt:'相关视频'
    },
    {
      item:{
        type:'delete',
        size:32,
      },
      txt:'删除曲目',
      route:'SearchList'
    }
  ]
)


provide('showPlayList',showPlayList)

function togglePlayList() {
  showPlayList.value = !showPlayList.value;
  // if(!showPlayList.value){
  //   router.go(-(history.length-2));
  //   router.replace({ path: "/" });
  // }
}

</script>

<style lang="scss">
.left {
  z-index: 0;
}
.main {
  z-index: 2;
}
.right {
  z-index: 0;
}
</style>