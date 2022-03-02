<template>
  <div class="userInfo">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <div v-show="!username">
      <UserWrap @onRefresh='onRefresh' />
    </div>
    <div v-show="username">
      <AccountWrap @onRefresh='onRefresh' /> -->
    <!-- <div
        id="neteaseInfo"
        class="infoblock"
      >
        <div class="block-top">
          <div class="music-icon netease"></div>
          <Icon
            :iconinfo='iconItems.spanner'
            @click="netease_Spanner"
          />
        </div>
        <div class="block-content">
          <div v-show="spanner.netease">
            <el-form
              inline='true'
              :model="formInline"
            >
              <el-form-item
                label="账号"
                label-width="50px"
              >
                <el-input
                  style="width:150px"
                  placeholder="Account"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item
                label="密码"
                label-width="50px"
                label-position='right'
              >
                <el-input
                  style="width:150px"
                  size="small"
                  placeholder="Password"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  @click="onSubmit"
                >确定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="!spanner.netease">
            account
          </div>
        </div>
      </div>
      <div
        id="qqmusicInfo"
        class="infoblock"
      >
        <div class="block-top">
          <div class="music-icon qqmusic"></div>
          <Icon
            :iconinfo='iconItems.spanner'
            @click="qq_Spanner"
          />
        </div>
        <div class="block-content">
          <div v-show="spanner.qq">
            <el-form
              inline='true'
              :model="formInline"
            >
              <el-form-item
                label="cookie"
                label-width="50px"
              >
                <el-input
                  style="width:150px"
                  placeholder="cookie"
                  size="small"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  @click="onSubmit"
                >确定</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="!spanner.qq">
            cookie
          </div>
        </div>

      </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup>
import {  inject, nextTick, provide, reactive, ref, watchEffect } from 'vue';

import AccountWrap from './setting/account.vue';
import UserWrap from './setting/user.vue'

import Icon from '@/components/base/icon/index.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();
let username = inject('username');

if(username){
  router.push({
    name:'Account'
  })
}else{
  router.push({
    name:'Login'
  })
}

const iconItems = reactive({
  spanner:{
    type:'spanner-fill1',
    size:21
  }
})

const spanner = reactive(
  {
    netease:false,
    qq:false,
  }
)



function submitNet163() {
  
}

function submitQQ() {
  
}

function netease_Spanner() {
  spanner.netease = !spanner.netease
}

function qq_Spanner() {
  spanner.qq = !spanner.qq
}

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
  min-height: 120px;
  border-radius: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  // filter: opacity(90%);
  // filter: blur(1px);
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
  .block-content {
    flex: 1;
    margin-top: 16px;
  }
  .music-icon {
    // background: #000;
    transform: scale(0.6);
  }
}
</style>