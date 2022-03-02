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