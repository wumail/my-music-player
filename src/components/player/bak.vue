<template>
  <div class="player-wrap">
    <div class="play-main">
      <div class="album">
        <div class="album-cover ">
          <img
            :src='current.song.albumImg ?? asuka'
            alt="image"
          >
        </div>
        <div class="album-info ">
          <span class="artist">
            <i class="iconfont icon-artist"></i>
            {{current.song.artist}}
          </span>
          <span class="collection">
            <i class="iconfont icon-album"></i>
            {{current.song.album?current.song.album:'暂无专辑信息'}}</span>
          <div class="source-from">
            from<span>网易云音乐</span> <i class="music-icon netease"></i>
            <!-- <i class="music-icon netease"></i> -->
          </div>
        </div>
      </div>
      <div class="lyric-info">
        <div class="song">{{current.song.name}}</div>
        <div class="lyric">
          <ul
            v-if="current.song.lyric"
            class="lyric-ul"
            ref="ulRef"
          >
            <li
              v-for="(lyric,index) in current.song.lyric?.lrc"
              :key="lyric.id"
              :class="{curLyric:index == current.index.index-1}"
            >
              <!-- <span> -->
              {{lyric.lyric}}
              <!-- </span> -->
            </li>
          </ul>
          <span v-else>暂无歌词</span>
        </div>
      </div>
    </div>
    <div class="player">
      <div class="play-console">
        <div class="button-group1">
          <Icon
            class="bg pause clbtn"
            :iconinfo='iconItems.pause'
            @click="_player.togglePause"
          />
        </div>
        <div class="button-group2">
          <Icon
            class="sm mode clbtn"
            :iconinfo='iconItems.mode'
            @click="_player.Mode"
          />
          <Icon
            class="md prev clbtn"
            :iconinfo='iconItems.prev'
            @click="_player.prev"
          />
          <Icon
            class="md next clbtn"
            :iconinfo='iconItems.next'
            @click="_player.next"
          />
          <Icon
            class="md list clbtn"
            :iconinfo='iconItems.list'
            @click="_player.togglePlayList"
          />
          <div class="volume">
            <Icon
              class="sm voice clbtn"
              :iconinfo='iconItems.voice'
              @click="_volume.toggleVolume"
            />
            <div
              id="volume_outer"
              :class="{hidden:_volume.volumeHidden}"
              @mousemove="_volume.volume_throttleStart"
              @mouseup="_volume.volume_moveout"
            >
              <div
                id="volume_inner"
                @mousedown="_volume.volume_mousedown"
              >
                <div
                  id="volume_bar"
                  @mousemove="_volume.volume_throttleStart"
                  @mousedown="_volume.volume_movebegin"
                  draggable="true"
                ></div>
                <div id="volume_progress"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <audio
        @canplay='_progress.getDuration'
        @timeupdate="_lyric.updateTime"
        id="music"
        src=""
      ></audio>
      <!-- https://music.163.com/song/media/outer/url?id=518649049.mp3 -->
      <!-- https://music.163.com/song/media/outer/url?id=28238311.mp3 -->
      <div
        id="progress_outer"
        @mousemove="_progress.progress_throttleStart"
        @mouseup="_progress.progress_moveout"
      >
        <span>
          <span class="time-played">{{audioInfo.current}}</span> /
          <span class="time-total">{{audioInfo.total}}</span>
        </span>
        <div
          id="progress_inner"
          @mousedown="_progress.progress_mousedown"
        >
          <div id="progress_buffered">
            <div
              id="progress_bar"
              @mousemove="_progress.progress_throttleStart"
              @mousedown="_progress.progress_movebegin"
              draggable="true"
            ></div>
            <div id="progress_played"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineEmit, defineProps, nextTick, onMounted, reactive, ref, toRefs, watch, watchEffect } from "vue";
import { mapGetters, mapMutations, mapActions, useStore } from 'vuex'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'

import Icon from '@/components/base/icon/index.vue';
import {changeMode} from '@/utils/mode.js';
import {transTime} from '@/utils/transTime.js';
import {throttle} from '@/utils/common.js';
import {playIcon,pauseIcon} from '@/utils/icon.js';
import {getRandom} from '@/utils/random.js';
import asuka from '@/assets/asuka.jpeg';

const store = useStore();
const router = useRouter();
// console.log(store);
const emit = defineEmit(['togglePlayList']);

let outimg = 'https://ae01.alicdn.com/kf/HTB1G5m9qb1YBuNjSszeq6yblFXad/paper-tropical-leaves-monstera-palm-green-photo-backdrop-Vinyl-cloth-High-quality-Computer-print-wall-background.jpg';
let audio = ref(null);

let _lyric = useLyric(),
    _player = usePlayer(),
    _volume = useVolume(),
    _progress = useProgress()

const pauseModel =reactive({
  0:{icon:'play',title:'播放'},
  1:{icon:'pause',title:'暂停'},
})
const playerData =reactive(
  {
    songs:[
      // {
      //   name:'1',
      //   album:'1',
      //   albumImg:outimg,
      //   artist:'1',
      //   id:518649049,
      //   song_url:'https://music.163.com/song/media/outer/url?id=518649049.mp3'
      // },
      // {
      //   name:'2',
      //   album:'2',
      //   albumImg:outimg,
      //   artist:'2',
      //   id:28238311,
      //   song_url:'https://music.163.com/song/media/outer/url?id=28238311.mp3'
      // },
      // {
      //   name:'3',
      //   album:'3',
      //   albumImg:outimg,
      //   artist:'3',
      //   id:316088,
      //   song_url:'https://music.163.com/song/media/outer/url?id=316088.mp3'
      // },
      // {
      //   name:'4',
      //   album:'4',
      //   albumImg:outimg,
      //   artist:'4',
      //   id:316103,
      //   song_url:'https://music.163.com/song/media/outer/url?id=316103.mp3'
      // },
      // {
      //   name:'5',
      //   album:'5',
      //   albumImg:outimg,
      //   artist:'5',
      //   id:4235845,
      //   song_url:'https://music.163.com/song/media/outer/url?id=4235845.mp3'
      // },
      // {
      //   name:'6',
      //   album:'6',
      //   albumImg:outimg,
      //   artist:'6',
      //   id:316084,
      //   song_url:'https://music.163.com/song/media/outer/url?id=316084.mp3'
      // }
    ],
    length:0,
  }
)
const audioInfo = reactive(
    {
        duration:0,
        currentime:0,
        total:'00:00',
        current:'00:00',
        volume:store.getters['playerNsong/volume'],
    }
)
const iconItems = reactive(
  {
    pause:{
      title:'播放',
      type:'play',
      size:48
    },
    mode:{
      title:'列表循环',
      type:'loop',
      size:16
    },
    prev:{
      title:'上一曲',
      type:'prev',
      size:32
    },
    next:{
      title:'下一曲',
      type:'next',
      size:32
    },
    list:{
      title:'播放列表',
      type:'list',
      size:32
    },
    voice:{
      title:'音量',
      type: _volume.volumeCompute(),
      size:16
    },
  }
)

let current = reactive(
  {
    song:{},
    index:{
      time:0,
      index:0
    },
  }
)

let ulRef = ref('');
let WIDTH = 390;
let VOLUME_HIGHT = 158;


async function setSong(cur){
    cur = cur ? cur : store.getters['playerNsong/currentMusic'];
    console.log(cur);
    // console.log(audio.src);
    current.song = cur;
    audio.src = cur.song_url;
}

function setNewSong(n){
    store.commit('playerNsong/SET_CURRENTINDEX',n);
    setSong()
    _progress.progressReset()
    _player.play()
}

watch(
    ()=>audio.duration,
    (now)=>{
        console.log(audio.duration);
        audioInfo.duration = now;
    },
)

watch(
    ()=>audio.volume,
    (now)=>{
        audioInfo.volume = now;
        volume_bar.style.marginBottom = audioInfo.volume*VOLUME_HIGHT + 'px';
    },
)

const list = reactive(
  {
    data:[]
  }
)

watchEffect(()=>{
    list.data = store.getters['playerNsong/currentMusic'];
    playerData.songs = store.getters['playerNsong/historyList'];
    setSong(list.data); 
    _player.play()
    // volume_bar.style.marginBottom = audioInfo.volume*VOLUME_HIGHT + 'px';
})

onMounted(()=>{
    audio = document.querySelector('#music');
    // volume_bar.style.marginBottom = audio.volume*VOLUME_HIGHT + 'px';
    // volume_progress.style.height = audioInfo.volume*VOLUME_HIGHT + 'px';
    // initUser()
    _volume.volumeSet()
    _player.initMode()
    _volume.ifvolume()
    _player.setPlayList()
    setSong()
})


function useLyric(){
  function matchLyricByTime() {
    if(current.song.lyric.lrc){
      let lrc = current.song.lyric?.lrc;
      let currTime  = audio.currentTime;
      for (const key in lrc) {
        if(lrc[key].time >= currTime){
          current.index.time = lrc[key].time;
          current.index.index = key;
          break;
        }
      }
    }
  }

  function updateTime(){
    // audioInfo.currentime = audio.currentTime;
    // audioInfo.current = transTime(audio.currentTime);
    // if(current.index.time <= audioInfo.currentime && current.song.lyric.lrc[current.index.index]){
    //   // console.log(current.index.time,audioInfo.currentime);
    //   current.index.index++;
    //   current.index.time = current.song.lyric.lrc[current.index.index].time;
    //   // console.log(ulRef);
    //   ulRef.value.style.transform = `translateY(${-(100 * (current.index.index-1))}px)`;
    // }
    // // console.log(current.index);
    // if(!ifpause.value && audioInfo.currentime >= audioInfo.duration){
    //   let playmode = store.getters['playerNsong/mode'];
    //   playmode === 0?loop():playmode === 1?single():random();
    // }
    // progressSet();
    audioInfo.currentime = audio.currentTime;
    audioInfo.current = transTime(audio.currentTime);
    // console.log(current.song.lyric);
    if( current.index.time <= audioInfo.currentime && current.song.lyric.lrc[current.index.index]){
      // console.log(current.index.time,audioInfo.currentime);
      current.index.index++;
      current.index.time = current.song.lyric.lrc[current.index.index]?.time || 0;
      // console.log(ulRef);
      ulRef.value.style.transform = `translateY(${-(100 * (current.index.index-1))}px)`;
    }
    // console.log(current.index);
    // console.log(!ifpause.value,audioInfo.currentime ,audioInfo.duration,audioInfo.currentime >= audioInfo.duration);
    if(!_player.ifpause.value && audioInfo.currentime >= audioInfo.duration){
      console.log('will change');
      let playmode = store.getters['playerNsong/mode'];
      _player[_player.curMode]()
      // playmode === 0? loop() : playmode === 1 ? single() : random();
    }
    _progress.progressSet();
  }

  return {
    matchLyricByTime,
    updateTime
  }
}

function usePlayer(){
  let modecount = ref(0);
  let ifpause = ref(true);
  let pauseTarget = ref(null);
  let curMode

  function play(){
    nextTick(()=>{
      _lyric.matchLyricByTime();
      console.log('src:',audio.src);
      audio.play();
    }).catch(err=>{
      console.log(err);
    })
    let flag = 1;
    pauseIconSet(flag)
  }

  function pause(){
      nextTick(()=>{
        audio.pause();
      }).catch(err=>{
        console.log(err);
      })
      let flag = 0;
      pauseIconSet(flag)
  }

  function pauseIconSet(flag){
    iconItems.pause.title=pauseModel[flag].title;
    iconItems.pause.type= pauseModel[flag].icon;
  }

  function loop() {
      console.log('loop');
      let index = store.getters['playerNsong/currentIndex'];
      index +=1;
      if(index>= playerData.length){
        index = 0;
      }
      setNewSong(index)
  }

  function single() {
      console.log('single');
      let index = store.getters['playerNsong/currentIndex'];
      setNewSong(index);
  }

  function random() {
      console.log('random');  
      let n = getRandom(0,playerData.length-1);
      setNewSong(n);
  }

  function setPlayList() {
      playerData.songs = store.getters['playerNsong/historyList'];
      playerData.length = playerData.songs.length;
      store.commit('playerNsong/SET_PLAYLIST',playerData.songs);
    // console.log(store.getters['playerNsong/playlist']);
  }

  function prev(){
    pause()
    let index = store.getters['playerNsong/currentIndex'];
    index = index-1;
    if(index < 0){
      index = playerData.length-1
    }
    audioInfo.currentime = 0;
    setNewSong(index)
  }

  function next(){
    pause()
    let index = store.getters['playerNsong/currentIndex'];
    // changing.value =true;
    index +=1;
    if(index >= playerData.length){
      index = 0;
    }
    audioInfo.currentime = 0;
    setNewSong(index)
  }

  function initMode() {
    modecount.value = store.getters['playerNsong/mode'];
    const v = changeMode(modecount.value);
    iconItems.mode.title = v.title;
    iconItems.mode.type = v.icon;
    curMode = v.icon
  }

  function Mode(){
      modecount.value++;
      modecount.value = modecount.value%3;
      store.commit('playerNsong/SET_PLAYMODE',modecount.value);
      store.dispatch('playerNsong/setPlayMode',modecount.value);
      const v = changeMode(modecount.value);
      iconItems.mode.title = v.title;
      iconItems.mode.type = v.icon;
      curMode = v.icon 
  }

  function togglePause(e){
      pauseTarget = e.target.tagName === 'DIV'? e.target.querySelector('i'):e.target;
      ifpause.value = !ifpause.value;
      ifpause.value? pause() : play();
  }

  function togglePlayList() {
      emit('togglePlayList')
  }

  return {
    curMode,
    ifpause,
    play,
    pause,
    pauseIconSet,
    loop,
    single,
    random,
    prev,
    next,
    initMode,
    Mode,
    togglePause,
    setPlayList,
    togglePlayList,
  }
}

function useVolume(){
  let volumeHidden =ref(true);
  let volume_move = false;
  let volume_clickmove = false;
  let volume_mouseStartY = 0;

  function toggleVolume(){
    volumeHidden.value = !volumeHidden.value
  }

  function ifvolume() {
    document.addEventListener('mouseup',(e)=>{
      const volume_outer = document.querySelector('#volume_outer');
      if(volume_outer && !volume_outer.contains(e.target)) {
        volumeHidden.value = true
      }
    })
  }

  function volumeCompute(){
    if(audioInfo.volume <= 0.05){
      return 'mute'
    }else if(audioInfo.volume >= 0.95){
      return 'sound-max'
    }else{
      return 'sound-min'
    }
  }

  function volumeSet() {
    volume_bar.style.marginBottom = audioInfo.volume*VOLUME_HIGHT + 'px';
    volume_progress.style.height = (166-audioInfo.volume*VOLUME_HIGHT) + 'px';
    audio.volume = audioInfo.volume;
    // console.log(audio.volume);
  }

  function volume_movebegin () {
      volume_move = true
      volume_clickmove = true
  }
  // 滑块松开时
  function volume_moveout () {
      volume_move = false
      if (volume_clickmove) {
        let newPercent = Math.ceil(((volume_mouseStartY) / (VOLUME_HIGHT+6)) * 100)
        let a = newPercent * 0.01; 
        if(a>=0.999){
          a = 1;
          iconItems.voice.type = 'sound-max';
        }else if(a<=0.001){
          a = 0;
          iconItems.voice.type = 'mute';
          iconItems.voice.title = '禁音';
        }else{
          iconItems.voice.type = 'sound-min';
        }
        audio.volume = a;
      }
      volume_clickmove = false;
  }

  // function volunmComput(){
  //   let newPercent = Math.ceil(((volume_mouseStartY) / (VOLUME_HIGHT+6)) * 100)
  //   let newVolume = newPercent * 0.01; 
  //   return newVolume;
  // }

  function volume_throttleStart(e) {
      if (volume_move) {
        throttle(volume_movestart,8)(e);
      }
  }

  function volume_movestart (e) {
      volume_mouseStartY = -(e.clientY - volume_inner.getBoundingClientRect().bottom);
      // console.log(volume_mouseStartY);
      let newPercent = Math.ceil(((volume_mouseStartY+6) / (VOLUME_HIGHT+6)) * 100)
      if(newPercent<=0){
          newPercent=0;
          volume_moveout();
      }
      // 拖拽超过100%松开鼠标
      if (newPercent > 100) {
          newPercent=100;
          volume_moveout();
      }
      if (newPercent <= 100) {
        volume_bar.style.marginBottom = newPercent*0.01*VOLUME_HIGHT + 'px';
        volume_progress.style.height = VOLUME_HIGHT-(newPercent*0.01*VOLUME_HIGHT) + 6+ 'px';
        audioInfo.volume = newPercent*0.01;
      }
  }

  return {
    volumeHidden,
    toggleVolume,
    ifvolume,
    volumeCompute,
    volumeSet,
    volume_movebegin,
    volume_moveout,
    volume_throttleStart,
    volume_movestart,
  }
}

function useProgress(){
  let progress_move = false;
  let progress_clickmove = false;
  let progress_mouseStartX = 0;

  function progressSet(){
      progress_buffered.style.width = `${getBufferd(audio.buffered)*WIDTH}px`;
      progress_played.style.width =`${(audioInfo.currentime/audioInfo.duration)*WIDTH}px`;
      progress_bar.style.marginLeft = `${(audioInfo.currentime/audioInfo.duration)*WIDTH-3}px`
  }

  function progressReset(){
      progress_played.style.width =`0px`;
      progress_bar.style.marginLeft = `3px`
  }

  function progress_movebegin () {
      progress_move = true
      progress_clickmove = true
  }
  // 滑块松开时
  function progress_moveout (e) {
      progress_move = false
      if (progress_clickmove) {
        let newPercent = (progress_mouseStartX / WIDTH) * 100
        let a = newPercent * 0.01 * WIDTH;
        audio.currentTime = a;
        audioInfo.currentime = a;
      }
      progress_clickmove = false;
      _player.play()
  }

  function progress_throttleStart(e) {
      if (progress_move) {
        _player.pause()
        throttle(progress_movestart,8)(e);
      }
  }

  function progress_movestart (e) {
      progress_mouseStartX = e.clientX - progress_inner.getBoundingClientRect().left
      let newPercent = Math.ceil((progress_mouseStartX / WIDTH) * 100)
      if (newPercent <= 100) {
        audioInfo.currentime = newPercent * 0.01 * WIDTH;
        progress_bar.style.marginLeft = newPercent*0.01*WIDTH + 'px'
        progress_played.style.width = newPercent*0.01*WIDTH + 'px'
      }
      // 拖拽超过100%松开鼠标
      if (newPercent > 100) {
        progress_moveout()
      }
  }

  function getDuration() {
    audioInfo.duration = audio.duration;
    audioInfo.total = transTime(audioInfo.duration);
  }

  function getBufferd(buffered){
      let timeRanges = buffered;
      let timeBuffered =null;
      if(timeRanges.length != 0){
          timeBuffered = timeRanges.end(timeRanges.length - 1);
      }
      // console.log(changing.value);
      // let timeBuffered = changing.value?timeRanges.start(0):timeRanges.end(timeRanges.length - 1);
      // if(changing.value === true){
      //   changing.value === false
      // }
      let bufferPercent = timeBuffered / audioInfo.duration;
      return bufferPercent;
  }

  return {
    progressSet,
    progressReset,
    progress_movebegin,
    progress_moveout,
    progress_throttleStart,
    progress_movestart,
    getDuration,
    getBufferd
  }
}

</script>

<style lang="scss">
.player-wrap {
  display: flex;
  justify-content: center;
  z-index: 1;
  .play-main {
    position: absolute;
    width: 500px;
    height: 410px;
    border-radius: 20px;
    box-shadow: $btn_shadow4;
    background: $btn_color;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .album {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 45%;

      .album-cover {
        img {
          width: 120px;
          border-radius: 10px;
          box-shadow: 10px 10px 10px 0 rgba(0, 0, 0, 0.2);
        }
      }

      .album-info {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        font-family: monospace;
        font-weight: bold;
        text-align: left;
        i {
          margin-right: 7px;
        }
        .artist {
          text-shadow: $txt-shadow1;
          margin-top: 10px;
        }
        .collection {
          text-shadow: $txt-shadow1;
          margin-top: 10px;
        }
        .source-from {
          font-weight: 400;
          margin-top: 10px;
          display: flex;
          align-items: center;
          text-shadow: 1px 1px 5px rgba(71, 71, 71, 0.7);
          span {
            margin-left: 10px;
          }
          i {
            display: inline-block;
          }
        }
      }
    }
    .lyric-info {
      width: 45%;
      margin-top: 60px;
      margin-right: 30px;
      font-family: monospace;
      text-align: center;
      .song {
        text-shadow: $txt-shadow1;
        font-weight: bold;
        font-size: 15px;
        margin-bottom: 20px;
      }
      .lyric {
        font-size: 12px;
        // text-shadow: 1px 1px 5px rgba(71, 71, 71, 0.7);
        line-height: 22px;
        // background: #000;
        height: 240px;
        overflow-x: none;
        overflow-y: auto;
        &:hover {
          &::-webkit-scrollbar-thumb {
            visibility: unset;
          }
        }
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          visibility: hidden;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.2);
        }
        &::-webkit-scrollbar-track {
          opacity: 0;
        }
      }
    }
  }
  .player {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: -60vh;
  }
  .play-console {
    display: flex;
    justify-content: space-between;
    width: 500px;
    height: 81px;
    padding: 10px 10px;
    border-radius: 20px;
    //   box-shadow: 41px 25px 82px #c9c9c7, -41px -25px 82px #fffffd;
    box-shadow: $btn_shadow3;
    background: $btn_bkg1;

    .button-group1 {
      color: black;
      div {
        i {
          display: inline-block;
          background-repeat: no-repeat;
        }
      }
      .pause {
        position: relative;
        bottom: 55px;
        left: 40px;
        margin-right: 15px;
      }
    }
    .button-group2 {
      display: flex;
      align-items: center;
      // width: 200px;
      color: black;
      div {
        margin-right: 15px;
        i {
          display: inline-block;
          background-repeat: no-repeat;
        }
      }
      .volume {
        #volume_outer {
          position: absolute;
          right: -10%;
          bottom: 50%;
          width: 20px;
          height: 180px;
          background: #f1f3f4;
          border-radius: 100px;
          box-shadow: -5px -5px 10px rgb(254, 254, 254), 5px 5px 10px #ccc;
          transition: $btn_transition;
          #volume_inner {
            margin: 6px auto 6px auto;
            width: 8px;
            height: 166px;
            background: rgb(85, 85, 85);
            border-radius: 100px;
          }
          #volume_bar {
            position: absolute;
            bottom: 6px;
            right: -11.5px;
            width: 13px !important;
            height: 13px;
            background: rgb(187, 127, 127);
            border-radius: 100px;
          }
          #volume_progress {
            width: inherit;
            height: 0px;
            background: #e3dede;
            box-shadow: inset 4px 4px 3px #ccc;
            border-radius: inherit;
          }
        }
      }
    }
  }
}

#progress_outer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 500px;
  height: 27px;
  background: #f1f3f4;
  border-radius: 100px;
  box-shadow: $btn_shadow4, inset 1px 1px 5px rgb(224, 224, 224);
  transition: $btn_transition;
  // .time-played {
  //   // margin-right: 5px;
  // }
  .time-total {
    margin-right: 10px;
  }
  #progress_inner {
    width: 390px;
    height: 8px;
    background: #e3dede;
    border-radius: 100px;
    box-shadow: inset 1px 3px 3px #ccc;
    #progress_buffered {
      transition: all 0.16s ease 0s;
      width: 1px;
      height: inherit;
      background: #ccc;
      border-radius: 100px;
      box-shadow: inset 1px 3px 3px rgb(184, 184, 184);
      #progress_bar {
        visibility: hidden;
        position: absolute;
        margin-left: 0px;
        bottom: 8px;
        width: 12px !important;
        height: 12px;
        background: rgb(187, 127, 127);
        border-radius: 100px;
      }
      #progress_played {
        width: 0px;
        height: inherit;
        background: #000;
        border-radius: 100px;
      }
      &:hover {
        #progress_bar {
          visibility: visible;
        }
      }
    }
  }
}

.lyric-ul {
  transition: all 0.32s ease;
  margin-top: 120px;
  li {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    // flex-wrap: wrap;
  }
}

.curLyric {
  color: orange;
  font-size: 16px;
  font-weight: bold;
}
</style>