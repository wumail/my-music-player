<template>
  <div>
    <div
      class="songitem"
      v-for="(song,index) in songs.songlist"
      :key="song.id"
      @dblclick="getItem(song,index)"
    >
      <span class="songindex"> {{index+1}}</span>
      <span class="songname">{{song.name}}
        <span class="songartist">{{song.artist}}</span>
      </span>
      <Icon
        :iconinfo='iconItems.more'
        @click='toggleDrawer(song)'
      />
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, nextTick, onBeforeMount, reactive, ref, watchEffect } from "vue";
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
            default:()=>{}
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
  getSongDetail(songs.songlist)
  
}


onBeforeMount(()=>{
    initlist()
    // console.log('----------');
    // console.log(songs.songlist);
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

async function getSongDetail(list){
  try {
    const promises = list.map(baseFetch);
    await Promise.all(promises)
    nextTick(()=>{
      console.log('渲染完成');
    })
    // console.log(songs.songlist);
  } catch (error) {
    console.log(error);
  }
}

async function baseFetch(item) {
  let result = await net163_song_detail({id:`${item.id}`});
  let data = result.body.songs[0];
  item.album = data.al.name;
  item.albumImg = data.al.picUrl;
  item.name = data.name;
  let artist = '';
  for(let i = 0 ; i<data?.ar.length;i++){
      artist += `${data?.ar[i].name}/`
  }
  item.artist = artist;
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
  // console.log(lyric);
  for(let key in lyric) {
    lineArr[key]=lyric[key].lyric.split(reg);
    lyricsObj[key] = [];
    lineArr[key].forEach(ele => {
      // console.log(ele);
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
</style>