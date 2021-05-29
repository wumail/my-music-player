<template>
  <div class="bar-wrap">
    <div
      class="bar_toggle clbtn"
      @click="toggleUserBar"
      :class="{k_roll:k_roll}"
    >
      <div class="k"></div>
    </div>
    <div
      class="userbar normalbar"
      :class="{bigwrap:bigwrap,transparent:!bigwrap}"
    >
      <div :class="{hidden:!bigwrap,transparent:!bigwrap}">
        <div class="userbar-topbar">
          <!-- <Icon :iconinfo='iconItems.back' /> -->
        </div>
        <div class="userbar-main">
          <div class="userbar-sidebar">
            <Icon
              :iconinfo='iconItems.user'
              :class="{sideNavActive:toggleWrap==='user'}"
              @click="toUser"
            />
            <Icon
              :iconinfo='iconItems.favorite'
              :class="{sideNavActive:toggleWrap==='favorite'}"
              @click="toFavorite"
            />
            <Icon
              :iconinfo='iconItems.songlist'
              :class="{sideNavActive:toggleWrap==='songlist'}"
              @click="toSonglist"
            />
          </div>
          <div class="userbar-content songlist">
            <Userbar />
            <div
              class="favorite-panel"
              :class="{transparent:!drawer,z_index1:drawer}"
            >
              <div class="favorite-content">
                <div
                  class="favorite-item"
                  v-for="panel in panelItems"
                  :key="panel.id"
                >
                  <template v-if="panel.route !== route.name">
                    <Icon :iconinfo='panel.item' />
                    <span>{{panel.txt}}</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { inject, onMounted, provide, reactive, ref } from "vue";

import Icon from '@/components/base/icon/index.vue';
import Userbar from './user/index.vue';
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
let bigwrap = ref(false);
let k_roll =ref(false);
let drawer = ref(false);
provide('drawer',drawer)

const iconItems = reactive(
  {
    back:{
      type:'back',
      size:32,
    },
    user:{
      type:'user',
      size:32
    },
    favorite:{
      type:'favorite1',
      size:32
    },
    songlist:{
      type:'list1',
      size:32
    }
  }
)

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


const toggleWrap = ref('user');
provide('wrap',toggleWrap);

onMounted(()=>{
  ifpanel()
})

function toggleUserBar(){
    bigwrap.value = !bigwrap.value;
    k_roll.value = !k_roll.value;
}

function toUser() {
  if(toggleWrap.value!=='user'){
    toggleWrap.value = 'user';
    // console.log(toggleWrap.value);
  }
}

function toFavorite() {
  if(toggleWrap.value!=='favorite'){
    toggleWrap.value = 'favorite';
    // console.log(toggleWrap.value);
  }
}

function toSonglist() {
  if(toggleWrap.value!=='songlist'){
    toggleWrap.value = 'songlist';
    // console.log(toggleWrap.value);
  }
}

function ifpanel() {
    document.addEventListener('mouseup',(e)=>{
      const bar_wrap = document.querySelector('.bar-wrap');
      const favorite_content = document.querySelector('.favorite-content');
      if(bar_wrap && bar_wrap.contains(e.target) 
         && favorite_content && !favorite_content.contains(e.target)){
        drawer.value = false
      }
    })
}
</script>

<style lang="scss">
.bar-wrap {
  float: left;
  // display: inline-block;
  position: absolute;
  // top: 60px;
  left: 60px;
  // margin-left: 60px;
  .bar_toggle {
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: -25px;
    right: -25px;
    z-index: 2;
    color: #000;
    transition: all 0.35s ease 0s !important;
  }

  .k {
    width: 38px;
    height: 10px;
    box-shadow: inset 1px 1px 2px 0 rgba(255, 255, 255, 0.8),
      4px 4px 10px #b6b6b5, -4px -4px 10px #ffffff;
    border-radius: 5px;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
    }
    &::before {
      width: 10px;
      height: 38px;
      left: 20px;
      top: 6px;
      border-radius: inherit;
      background: #eaeae8;
      box-shadow: inherit;
    }
    &::after {
      width: inherit;
      height: inherit;
      border-radius: inherit;
      background: #eaeae8;
    }
  }

  .userbar {
    // opacity: 0;
    position: absolute;
    top: -30px;
    left: -30px;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .userbar-topbar {
      display: flex;
      margin-top: 10px;
      height: 40px;
      width: 330px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
    }
    .userbar-main {
      height: 530px;
      width: 330px;
      // background: #ccc;
      display: flex;
      .userbar-sidebar {
        width: 40px;
        height: inherit;
        // background: #b6b6b5;
        div {
          margin-top: 10px;
          margin-bottom: 10px;
        }
      }
      .userbar-content {
        width: 290px;
        height: inherit;
        border-radius: 10px 10px 30px 10px;
        background: #e2e2e2;
      }
      .favorite-panel {
        position: absolute;
        right: 10px;
        bottom: 10px;
        transition: all 0.2s ease 0s;
        width: 330px;
        height: inherit;
        background: rgba($color: #000000, $alpha: 0.5);
        border-radius: 10px 10px 30px 30px;
        z-index: -1;
        .favorite-content {
          padding-top: 10px;
          position: absolute;
          bottom: 0px;
          width: inherit;
          // height: 200px;
          border-radius: 10px 10px 30px 30px;
          background: rgb(250, 250, 250);
          opacity: 1 !important;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          .favorite-item {
            display: flex;
            align-items: center;
          }
          .favorite-item:last-child {
            margin-bottom: 12px;
          }
          span {
            margin-left: 10px;
          }
          .iconfont {
            margin-left: 10px;
            display: inline-block;
          }
        }
      }
    }
  }

  .k_roll {
    box-shadow: 0px 0px 0px #ffffff;
    @include webkit(transform, translate(285px) rotate(315deg) scale(0.9));
    .k {
      box-shadow: 0px 3px 10px #b6b6b5,
        inset 1px -1px 2px 0 rgba(255, 255, 255, 0.8), 2px 4px 10px #b6b6b5,
        2px 5px 10px #ffffff;
    }
  }
}
</style>