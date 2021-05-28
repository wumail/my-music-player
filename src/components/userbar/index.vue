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
      <div
        class="userbar-content"
        :class="{hidden:!bigwrap}"
      >11111111111111111</div>
    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
let bigwrap = ref(false);
let k_roll =ref(false);

function toggleUserBar(){
    bigwrap.value = !bigwrap.value;
    k_roll.value = !k_roll.value;
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
    .userbar-content {
      height: 100px;
      width: 200px;
      background: #000;
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