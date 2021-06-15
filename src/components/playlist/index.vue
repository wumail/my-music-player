<template>
  <div class="playlist-wrap">
    <div
      class="normalbar"
      :class="{bigwrap:showPlayList,transparent:!showPlayList}"
    >
      <div
        class="playlist-main"
        :class="{hidden:!showPlayList}"
      >
        <div class="playlist-bar">
          <div class="playlist-topbar">
            <Icon
              :iconinfo='iconItems.back'
              @click="back"
            />
            <el-input
              v-model="searchAbout.searchInput"
              class="topbar-input"
              size='small'
              clearable
            ></el-input>
            <Icon
              :iconinfo='iconItems.search'
              @click="search"
            />
          </div>
          <div class="playlist-navbar">
            <Icon
              :iconinfo='iconItems.searchlist'
              :class="{navActive:route.name==='SearchList'}"
              @click="toSearchList"
            />
            <Icon
              :iconinfo='iconItems.playlist'
              :class="{navActive:route.name==='PlayList'}"
              @click="toPlayList"
            />
            <Icon
              :iconinfo='iconItems.historylist'
              :class="{navActive:route.name==='HistoryList'}"
              @click="toHistoryList"
            />
          </div>
        </div>
        <div class="playlist-content">
          <List />
        </div>
        <div
          class="playlist-panel"
          :class="{transparent:!drawer,z_index1:drawer}"
        >
          <div class="panel-content">
            <div
              class="panel-item"
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
</template>

<script setup>
import { ref,defineProps, watch, reactive, provide, onMounted } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";

import Icon from '@/components/base/icon/index.vue';
import List from '@/components/base/list/playlist/index.vue';
import { net163_search } from "@/api/netease.js";

const router = useRouter();
const route = useRoute();
const props = defineProps({
    ifshow:{
        type:Boolean,
        default:false
    }
})
let showPlayList = ref(false);
let drawer = ref(false);
provide('drawer',drawer)

const searchAbout =reactive(
  {
    searchInput:'',
    searchResult:[],
  }
)

provide('searchRes',searchAbout.searchResult)

const iconItems = reactive(
  {
    search:{
      type:'search',
      size:32,
    },
    back:{
      type:'back',
      size:32,
    },
    searchlist:{
      type:'searchlist',
      size:32
    },
    historylist:{
      type:'historylist1',
      size:30
    },
    playlist:{
      type:'playlist',
      size:32
    },
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

watch(
    ()=>props.ifshow,
    (now)=>{
        showPlayList.value = now
    },
    {
        immediate:true
    }
)

onMounted(()=>{
  ifpanel()
})

function ifpanel() {
    document.addEventListener('mouseup',(e)=>{
      const playlist_wrap = document.querySelector('.playlist-wrap');
      const panel_content = document.querySelector('.panel-content');
      if(playlist_wrap && playlist_wrap.contains(e.target) 
         && panel_content && !panel_content.contains(e.target)){
        drawer.value = false
      }
    })
}

function search() {
  net163_search({
    keywords:searchAbout.searchInput
  }).then((res)=>{
    // console.log(res);
    searchAbout.searchResult = res;
    
    // console.log(searchAbout.searchResult);
  }).catch((err)=>{
    console.log(err);
  })
}

function back() {
  if (history.state.back === '/') {
    return
  }
  router.back()
}

function toSearchList() {
  router.push(
    {
      name:'SearchList'
    }
  )
}

function toPlayList() {
  router.push(
    {
      name:'PlayList'
    }
  )
}

function toHistoryList() {
  router.push(
    {
      name:'HistoryList'
    }
  )
}
</script>

<style lang="scss">
.playlist-wrap {
  float: right;
  position: absolute;
  top: -30px;
  right: 30px;
  z-index: 0;
  .playlist-main {
    display: flex;
    // justify-content: space-around;
    flex-direction: column;
    align-items: center;
    height: inherit;
    // width: inherit;
    .playlist-bar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-top: 10px;
      width: 330px;
      height: 80px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;
      .playlist-topbar {
        display: flex;
        justify-content: flex-end;
      }
      .el-input__inner {
        width: 250px;
        border-radius: 100px;
      }
      .playlist-navbar {
        display: flex;
        justify-content: space-around;
        align-items: center;
      }
    }
    .playlist-content {
      height: 500px;
      width: 330px;
      margin-bottom: 10px;
      background: rgb(226, 226, 226);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      // overflow-y: scroll;
    }
    .playlist-panel {
      position: absolute;
      bottom: 10px;
      transition: all 0.2s ease 0s;
      width: 330px;
      height: 500px;
      background: rgba($color: #000000, $alpha: 0.5);
      border-radius: 30px;
      z-index: -1;
      .panel-content {
        padding-top: 10px;
        position: absolute;
        bottom: 0px;
        width: 330px;
        // height: 200px;
        border-radius: 30px;
        background: rgb(250, 250, 250);
        opacity: 1 !important;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        .panel-item {
          display: flex;
          align-items: center;
        }
        .panel-item:last-child {
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
</style>