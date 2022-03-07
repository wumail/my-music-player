<template>
  <div ref="listRef" class="list-container" @scroll="vlist.scrollEvent">
    <div class="phantom-list"></div>
    <div class="render-list">
      <div ref="itemRef"
        class="render-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemHeight + 'px',lineHeight: itemHeight + 'px'}"
      >{{ item.value }}</div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject, onBeforeMount, reactive, ref, watchEffect, computed, onMounted, onUpdated } from "vue";
import { useRoute,useRouter } from "vue-router";
import { useStore } from "vuex";
import { ElMessage } from 'element-plus'

import { net163_song_url , net163_song_detail , net163_lyric } from '@/api/netease.js';
import { formatLyricTime } from "@/utils/transTime.js";
import func from "../../../../vue-temp/vue-editor-bridge";

const store = useStore();

const props = defineProps(
  {
    listData: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 50
    },
    estimatedItemSize: {
      type:Number
    },
    bufferScale:{
      type:Number,
      default:1
    }
  }
)

let startOffset = ref(0),
    start = ref(0),
    end = ref(0),
    screenHeight = ref(0),
    listRef = ref(''),
    itemRef = ref('')
    positions = reactive({
      data:[]
    })

const listHeight = computed(() =>  positions.data[positions.data.length - 1].bottom),
      visibleCount = computed(() => Math.ceil(props.contianerHeight / props.itemHeight)),
      offset = computed(() => `translate3d(0,${startOffset.value}px,0)`),
      visibleData = computed(() => {
        let start = start.value - vlist.aboveCount;
        let end = end.value + vlist.belowCount;
        return props.istData.slice(start, end);
      })

(function initPositions(){
  positions.data = props.listData.map((item,index)=>{
    return {
      index,
      height:props.estimatedItemSize,
      top:index * props.estimatedItemSize,
      bottom:(index + 1) * props.estimatedItemSize
    }
  })
})()

let drawer = ref(null);
drawer = inject('drawer');
// console.log(drawer);

function toggleDrawer(data) {
    console.log(data);
    drawer.value = !drawer.value
}

const observer = reactive({
  current:{}
})
const resetObserve = () => {
  observer.current.disconnect()
}

function initObserver(){
  const Observer = new IntersectionObserver(callback);
  const callback = (entries) => {
      entries.forEach(entry => {
          const dataLength = props.listData.length;
          if (entry.isIntersecting && entry.target.id === "bottom") {
              const maxStartIndex = dataLength - 1 - THRESHOLD;
              const maxEndIndex = dataLength - 1;
              const newStart = end.value - 5 <= maxStartIndex ? end.value - 5 : maxStartIndex;
              const newEnd = end.value + 10 <= maxEndIndex ? end.value + 10 : maxEndIndex;
              if(newEnd !== end.value || newStart !== start.value){
                resetObserve()
                start.value = newStart
                end.value = newEnd
              }
          }
          if (entry.isIntersecting && entry.target.id === "top") {
              const newEnd =
                    end.value === visibleCount
              ? visibleCount
              : end.value - 10 > visibleCount
              ? end.value - 10
              : visibleCount;
              const newStart = start.value === 0 ? 0 : start.value - 10 > 0 ? start.value - 10 : 0;

              if(newEnd !== end.value || newStart !== start.value){
                resetObserve()
                start.value = newStart
                end.value = newEnd
              }
              
          }
      });
  };
}

onUpdated(()=>{
  let nodes = itemRef.value.items
  nodes.forEach((node)=>{
    let rect = node.getBoundingClientRect();
    let height = rect.height;
    let index = +node.id.slice(1)
    let oldHeight = positions.data[index].height;
    let dValue = oldHeight - height;
    //存在差值
    if(dValue){
      positions.data[index].bottom = positions.data[index].bottom - dValue;
      positions.data[index].height = height;
      for(let k = index + 1; k<positions.data.length; k++){
        positions.data[k].top = positions.data[k-1].bottom;
        positions.data[k].bottom = positions.data[k].bottom - dValue;
      }
    }
  })
})

onMounted(()=>{
  start.value = 0,
  end.value = start.value + visibleCount
  screenHeight.value = this.$el.clientHeight
})

function useVirtualList(){
  function aboveCount(){
    return Math.min(start.value, props.bufferScale * visibleCount)
  }

  function belowCount(){
    return Math.min(props.listData.length - end.value, props.bufferScale * visibleCount)
  }

  function scrollEvent() {
    //...省略
    if(start.value >= 1){
      startOffset.value = positions.data[start.value - 1].bottom
    }else{
      startOffset.value = 0;
    }
  }

  return {
    scrollEvent,
    aboveCount,
    belowCount,
  }
}

let vlist = useVirtualList()


  //获取列表起始索引
function getStartIndex(scrollTop = 0){
  //二分查找
  return binarySearch(positions.data,scrollTop)
}

//二分查找
function binarySearch(list,value){
  let start = 0;
  let end = list.length - 1;
  let tempIndex = null;
  while(start <= end){
    let midIndex = parseInt((start + end)/2);
    let midValue = list[midIndex].bottom;
    if(midValue === value){
      return midIndex + 1;
    }else if(midValue < value){
      start = midIndex + 1;
    }else if(midValue > value){
      if(tempIndex === null || tempIndex > midIndex){
        tempIndex = midIndex;
      }
      end = end - 1;
    }
  }
  return tempIndex;
}



</script>

<style lang='scss'>

</style>