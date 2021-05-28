<template>
  <div>
    <i
      class="iconfont"
      :class="icon.class"
      :title="icon.title"
      :style="`font-size:${icon.size}px`"
    ></i>
  </div>
</template>
<script setup>
import { defineProps, onBeforeMount, reactive, watch } from "vue";

const props = defineProps(
    {
        iconinfo:{
            type:Object,
            default:()=>{}
        },
    }
)

let icon = reactive(
    {
        class:'',
        type:'',
        size:'',
        // sizeType:'',
        title:'',
    }
)

function setIcon() {
    icon.type = props.iconinfo?.type;
    icon.size = props.iconinfo?.size;
    // icon.sizeType = `icon-${props.size}`;
    // icon.class = `${icon.type}_${icon.size} ${icon.sizeType}`;
    icon.class = `icon-${icon.type}`;
    icon.title = props.iconinfo?.title;
}

watch(
    ()=>props.iconinfo?.type,
    (now)=>{
        icon.type = now;
        // icon.class = `${icon.type}_${icon.size} ${icon.sizeType}`;
        icon.class = `icon-${icon.type}`;
    },
)
watch(
    ()=>props.iconinfo?.title,
    (now)=>{
        icon.title = now;
    },
)

onBeforeMount(()=>{
    setIcon()
})

</script>

<style>
</style>