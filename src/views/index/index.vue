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
import { provide, reactive, ref } from 'vue';
import UserBar from '@/components/userbar/index.vue';
import Player from '@/components/player/index.vue';
import PlayList from '@/components/playlist/index.vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
let showPlayList = ref(false);

const song = reactive(
  {
    
  }
)

provide('showPlayList',showPlayList)

function togglePlayList() {
  showPlayList.value = !showPlayList.value;
  if(!showPlayList.value){
    router.go(-(history.length-1));
    router.replace({ path: "/" });
  }
}

</script>

<style lang="scss" scoped>
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