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
        <!-- <router-view /> -->
        <PlayList :ifshow='showPlayList' />
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import UserBar from '@/components/userbar/index.vue';
import Player from '@/components/player/index.vue';
import PlayList from '@/components/playlist/index.vue';

let showPlayList = ref(true);

const song = reactive(
  {
    
  }
)

function togglePlayList() {
  showPlayList.value = !showPlayList.value;
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