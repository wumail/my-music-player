<template>
  <div>
    <div
      class="songitem"
      v-for="(song,index) in songs.songlist"
      :key="song.id"
      @dblclick="getItem(song,index)"
    >
      <div class="songindex"> {{index+1}}</div>
      <div class="songname">
        <span>{{song.name}}</span>
        <span class="songartist">{{song.artist}}</span>
      </div>
      <Icon
        :iconinfo='iconItems.more'
        @click='toggleDrawer(song)'
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, onBeforeMount, reactive, ref, watchEffect } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'

import Icon from '@/components/base/icon/index.vue';
import { net163_song_url , net163_song_detail , net163_lyric } from '@/api/netease.js';
import { formatLyricTime } from "@/utils/transTime.js";

const store = useStore();
const route = useRoute();
const router = useRouter();

const props = defineProps(
    {
        songlist:{
            type:Array,
            default:()=>[]
        },
    }
)

const songs = reactive(
    {
        songlist:[
        ]
    }
)

watchEffect(()=>{
  initlist()
})

function initlist() {
    songs.songlist = props.songlist;
}

onBeforeMount(()=>{
    initlist()
})

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
// console.log(drawer);


function toggleDrawer(data) {
    console.log(data);
    drawer.value = !drawer.value
}



async function getItem(data,index) {
  // console.log(data);
  // console.log(data.id);
  let picUrl = await getPicUrl(data.id);
  let song_url = await getDetail(data.id);
  let lyric = await getLyric(data.id);
  lyric = lyricHandler(lyric);
  let newSong = {
        id:data.id,
        song_url:song_url,
        album:data.album?.name||data.album,
        albumImg:picUrl,
        name:data.name,
        artist:data.artist,
        lyric:{
          ...lyric
        }
  }
  // console.log(newSong);
  store.dispatch('playerNsong/selectAddPlay', newSong)
  // console.log(store.getters['playerNsong/playlist']);
  store.dispatch('playerNsong/setHistory',newSong);
  // console.log(store.getters['playerNsong/historyList']);
  // console.log('---------');
  // net163_song_detail({
  //   id:`${data.id}`
  // }).then((result) => {
  //   let picUrl = result.body.songs[0].al.picUrl;
  //   net163_song_url({
  //     id:data.id
  //   }).then((response) => {
  //     if(response.status === 404){
  //       ElMessage.warning({
  //             message: response.body.message,
  //             type: 'warning'
  //       });
  //       return false;
  //     }
  //     // console.log(response);
  //     const res =response.body;
  //     // console.log(res);
  //     let url = res.data[0].url;
  //     let newSong = {
  //       id:data.id,
  //       song_url:url,
  //       album:data.album,
  //       albumImg:picUrl,
  //       name:data.name,
  //       artist:data.artist,
  //     }
  //     store.dispatch('playerNsong/selectAddPlay', newSong)
  //     // console.log(store.getters['playerNsong/playlist']);
  //     store.dispatch('playerNsong/setHistory',newSong);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }).catch((err) => {
  //   console.log(err);
  // });
}

async function getPicUrl(id) {
  try {
    let result = await net163_song_detail({id:`${id}`})
    return result.body.songs[0].al.picUrl;
  } catch (error) {
    console.log(error);
  }
}

async function getDetail(id) {
  try {
    let response = await net163_song_url({
      id
    });
    console.log(response);
    if(response.status === 404){
        ElMessage.warning({
              message: response.body.message,
              type: 'warning'
        });
        return false;
    }
    // console.log(response);
    const res =response.body;
    // console.log(res);
    let url = res.data[0].url;
    return url
  } catch (error) {
    console.log(error);
  }
}

async function getLyric(id) {
  try {
    let result = await net163_lyric({id:`${id}`})
    if(result?.nolyric){
      // console.log(11);
      return {
        lrc:{
          lyric:"[00:00.000]暂无歌词\n"
        },
        tlyric:{
          lyric:"[00:00.000]暂无歌词\n"
        },
      }
    }
    return {
      lrc:result.lrc,
      tlyric:result.tlyric
    }
  } catch (error) {
    console.log(error);
  }
}

function lyricHandler(lyric) {
  // console.log(lyric);
  const reg = /\n/;
  // const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
  const lineArr = {};
  const lyricsObj = {};
  if(!lyric.lrc.lyric) return false
  for(let key in lyric) {
    // console.log(lyric[key]);
    lineArr[key]=lyric[key]?.lyric.split(reg);
    lyricsObj[key] = [];
    lineArr[key].forEach(ele => {
      console.log(ele);
      if (ele === '') return
      const [time,lyric] = ele.split(']');
      // console.log(time,lyric);
      if(time){
        // console.log(time[0]);
        let lyricTime = formatLyricTime(time);
        // console.log(lyric,lyricTime);
        if(lyricTime >= 0){
          lyricsObj[key].push(
            {
              time:lyricTime,
              lyric
            }
          )
          // lyricsObj[key][lyricTime]=lyric;
          // console.log(lyricTime,lyricsObj[key][lyricTime]);
          // console.log('----------');
        }
      }
     });
  }
  // console.log(lyricsObj);
  return lyricsObj;
}

</script>

<style lang="scss">
.songlist {
    height: inherit;
    overflow-y: scroll;
    overflow-x: hidden;
    //   background: #ccc;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    &::-webkit-scrollbar {
      width: 0px;
    }
    .songitem {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: inherit;
      height: 50px;
      border-radius: 3px;
      line-height: 50px;
      border-bottom: 1px solid #cccccc54;
      .iconfont {
        margin-left: 10px;
      }
      // border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
      .songindex {
        margin-left: 5px;
        margin-right: 10px;
        width: 15px;
      }
      .songname {
        line-height: 15px;
        height: 30px; 
        flex: 1;
        // overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 0px;
        }
        .songartist {
          display: block;
          font-size: 10px;
        }
      }
    }
  }

</style>