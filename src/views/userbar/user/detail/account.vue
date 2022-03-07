<template>
  <div
    id="userInfo"
    class="infoblock"
  >
    <div class="block-top">
      <i
        class="iconfont icon-user"
        style="font-size: 21px;color:black"
      ></i>
      <Icon
        :iconinfo='iconItems.logout'
        @click="logout"
      />
    </div>
    <div class="block-content">
      {{username}}
    </div>
  </div>
  <div
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
          ref="net163Ref"
          :rules="net163Rules"
          :inline='true'
          :model="net163Model"
        >
          <el-form-item
            prop="phone"
            label="手机"
            label-width="50px"
          >
            <el-input
              v-model="net163Model.phone"
              placeholder="phone number"
              style="width:150px"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            label="密码"
            label-width="50px"
            label-position='right'
          >
            <el-input
              v-model="net163Model.password"
              placeholder="Password"
              style="width:150px"
              size="small"
              type='password'
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="submitNet163"
              :loading='loading'
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="!spanner.netease">
        {{net163.info.net163_username?net163.info.net163_nickname:'暂无网易云账号'}}
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
          ref="qqRef"
          :rules="qqRules"
          :inline='true'
          :model="qqModel"
        >
          <el-form-item
            prop="cookie"
            label="cookie"
            label-width="50px"
          >
            <el-input
              v-model="qqModel.cookie"
              style="width:150px"
              placeholder="cookie"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              type="primary"
              @click="submitQQ"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="!spanner.qq">
        {{qqmusicCookie?qqmusicCookie:'暂无QQ音乐COOKIE'}}
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject, ref, watchEffect} from "vue"
import { useStore } from "vuex";

import Icon from '@/components/base/icon/index.vue';
import {  useRouter } from "vue-router";
import { net163_login } from "@/api/login.js";
import { ElMessage } from "element-plus";

const store = useStore();
const router = useRouter();
// console.log('refreshed');
let username = inject('username');
let qqmusicCookie = ref('');

let userinfo = reactive(
  {
    username: "未登录",
    net163_nickname: "未登录",
    net163_usercookie: "",
    net163_userid: "未登录",
    net163_username: "未登录"
  }
)

let net163Ref = ref('');
let qqRef = ref('');

let net163 = reactive(
  {
    uid:'',
    cookie:'',
    info:{}
  }
)

watchEffect(()=>{
  qqmusicCookie = store.getters['playerNsong/qqmusicCookie'];
  // net163.uid = store.getters['playerNsong/net163UID'];
  // net163.cookie = store.getters['playerNsong/net163Cookie'];
  try {
    net163.info = JSON.parse(store.getters['playerNsong/net163Userinfo']);
  } catch (error) {
    net163.info = userinfo
  }

  // console.log(net163.info);
})

/*
  net163_nickname: data.profile.nickname,
  net163_username: data.account.userName,
  net163_userid: `${data.account.id}`,
  net163_usercookie: data.cookie,
 */

const iconItems = reactive({
  logout:{
    type:'log-out',
    size:21
  },
  spanner:{
    type:'spanner-fill1',
    size:21
  }
})

let loading = ref(false);

const net163Model = reactive(
    {
        phone:'',
        password:''
    }
)

const net163Rules = {
    phone: [
        { validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' }
    ],
}

function validateEmail(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入手机号'));
    }else{
        callback();
    }
}

function validatePassword (rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        callback();
    }
}

const qqModel = reactive(
    {
        cookie:'',
    }
)

const qqRules = {
    cookie: [
        { validator: validatePassword, trigger: 'blur' }
    ],
}

function validateCookie (rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        callback();
    }
}

const spanner = reactive(
  {
    netease:false,
    qq:false,
  }
)

function logout(){
  store.dispatch('playerNsong/setUserName','');
  store.dispatch('playerNsong/setNet163Userinfo',{});
  router.replace({
    name:'Login'
  })
  // location.reload()
}


function submitNet163() {
  net163Ref.value.validate((valid) => {
    loading.value = true;
    // console.log(
    //   {
    //     username:store.getters['playerNsong/username'],
    //     phone:net163Model.phone,
    //     password:net163Model.password
    //   }
    // );
    let net163_username = store.getters['playerNsong/username'];
    if (valid) {
      net163_login({
        username:net163_username,
        phone:net163Model.phone,
        password:net163Model.password
      }).then((result) => {
        let data = result.body;
        if(!data.flag){
          ElMessage.error({
            message:data.message,
            type:'error'
          })
          return false;
        }
        ElMessage.success({
            message:data.message,
            type:'success'
        })
        
        store.dispatch('playerNsong/setNet163Userinfo',{
          username,
          ...data.data
        })
        net163Model.phone = '';
        net163Model.password = '';
        netease_Spanner()
      }).catch((err) => {
        console.log(err);
      }).finally(()=>{
        loading.value = false;
      });
    } else {
        console.log('error submit!!');
        return false;
    }
  })
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

<style lang='scss'>
#userInfo {
  background: #85c0db;
  .iconfont {
    color: rgb(201, 57, 57);
    // filter: invert(100%);
  }
}
#neteaseInfo {
  background: #f3f3f3;
  .iconfont {
    color: rgb(134, 134, 134);
    // filter: invert(100%);
  }
  // background: #f9d3d8;
}
#qqmusicInfo {
  background: #2ec584b0;
  .iconfont {
    // 2ec584b0
    // ffdd06
    color: #fff;
    // filter: invert(100%);
  }
}
</style>
