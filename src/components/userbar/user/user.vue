<template>
  <div class="userInfo">
    <div
      id="neteaseInfo"
      class="infoblock"
    >
      <div class="block-top">
        <div class="music-icon netease"></div>
        <Icon :iconinfo='iconItems.spanner' />
      </div>

    </div>
    <div
      id="qqmusicInfo"
      class="infoblock"
    >
      <div class="block-top">
        <div class="music-icon qqmusic"></div>
        <Icon :iconinfo='iconItems.spanner' />
      </div>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/base/icon/index.vue';
import { reactive } from 'vue';

const iconItems = reactive({
  spanner:{
    type:'spanner-fill1',
    size:28
  }
})

</script>
<style lang="scss">
.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.infoblock {
  width: 240px;
  height: 120px;
  border-radius: 20px;
  margin-top: 20px;
  .block-top {
    margin-top: 8px;
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .iconfont {
      margin-right: 10px;
    }
  }
  .music-icon {
    // background: #000;
    transform: scale(0.8);
  }
}
#neteaseInfo {
  background: #f3f3f3;
  .iconfont {
    color: rgb(134, 134, 134);
    // filter: invert(100%);
  }
  // background: #f9d3d8;
}
#qqmusicInfo {
  background: #2ec584b0;
  .iconfont {
    // 2ec584b0
    // ffdd06
    color: #fff;
    // filter: invert(100%);
  }
}
</style>