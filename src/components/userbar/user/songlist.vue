<template>
</template>

<script setup>
import { net163_playlist } from "@/api/netease";


function getFavorite_net163() {
    net163_playlist().then((response)=>{
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    })
}
</script>

<style scss>
</style>
