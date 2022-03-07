<template>
  <div
    id="neteaseInfo"
    class="infoblock"
  >
    <div class="usr-block-top">
      <div class="music-icon">
        <i
          class="iconfont icon-user"
          style="font-size: 32px;"
        ></i>
      </div>
      <div class="user-LNR">
        <div @click="toLogin">Login</div> /
        <div @click="toRegister">Register</div>
      </div>

    </div>
    <div
      class="block-content"
      v-if="LOR.flag == 'login'"
    >
      <el-form
        ref="loginRef"
        :inline='true'
        :model="userModel"
        :rules="modelRules"
      >
        <el-form-item
          prop="username"
          label="账号"
          label-width="50px"
        >
          <el-input
            v-model="userModel.username"
            style="width:150px"
            placeholder="Account"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          label-width="50px"
        >
          <el-input
            v-model="userModel.password"
            style="width:150px"
            size="small"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="user-btn">
          <el-form-item>
            <el-button
              :loading="LOR.loading"
              size="small"
              type="primary"
              @click="submitUser"
            >{{LOR.btn}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div
      class="block-content"
      v-if="LOR.flag == 'register'"
    >
      <el-form
        ref="registerRef"
        :inline='true'
        :model="userModel"
        :rules="modelRules"
      >
        <el-form-item
          prop="username"
          label="账号"
          label-width="50px"
        >
          <el-input
            v-model="userModel.username"
            style="width:150px"
            placeholder="Account"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          label-width="50px"
        >
          <el-input
            v-model="userModel.password"
            style="width:150px"
            size="small"
            placeholder="Password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="confirm_password"
          label="确认"
          label-width="50px"
        >
          <el-input
            v-model="userModel.confirm_password"
            style="width:150px"
            size="small"
            placeholder="Confirm password"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="user-btn">
          <el-form-item>
            <el-button
              :loading="LOR.loading"
              size="small"
              type="primary"
              @click="submitUser"
            >{{LOR.btn}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { ElMessage } from "element-plus";

import { userRegister,userLogin } from "@/api/login.js";
import { stripscript,validate_email,validate_pwd } from "@/utils/validate.js";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

let loginRef = ref('');
let registerRef = ref('');


const LOR =reactive(
    {
        flag:'login',
        btn:'登录',
        loading:false
    }
)

console.log(LOR);

const userModel = reactive(
    {
        username:'',
        password:'',
        confirm_password:''
    }
)

const modelRules = {
    username: [
        { validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { validator: validatePassword, trigger: 'blur' }
    ],
    confirm_password:[
        { validator: validateConfrimPwd, trigger: 'blur' }
    ],
}

function clearFrom() {
    userModel.username = '';
    userModel.password = '';
    userModel.confirm_password = '';
}

function toRegister() {
    if(LOR.flag == 'login'){
        LOR.flag = 'register';
        LOR.btn = '注册';
        clearFrom()
    }
}

function toLogin() {
    if(LOR.flag == 'register'){
        LOR.flag = 'login';
        LOR.btn = '登录';
        clearFrom()
    }
}

function submitUser() {
    LOR.flag == 'login'?login():register();
}

function login() {
    loginRef.value.validate((valid) => {
        if (valid) {
            LOR.loading = true;
            let {username,password} = userModel;
            userLogin({
              username,password
            }).then((result) => {
              console.log(result);
              let data = result.body;
              if(!data.login_flag){
                ElMessage.error(
                  {
                    message:data.message,
                    type:'error'
                  }
                )
                return false;
              }
              ElMessage.success(
                {
                  message:data.message,
                  type:'success'
                }
              )
              store.dispatch('playerNsong/setUserName',username);
              store.dispatch('playerNsong/setNet163Userinfo',data.data);
              clearFrom()
              router.replace({
                name:'Account'
              })
              location.reload();
            }).catch((err) => {
              ElMessage.error({
                message: err.message,
                type: 'error'
              });
            }).finally(()=>{
              LOR.loading = false;
            });
        } else {
            console.log('error submit!!');
            return false;
        }
    })
}

function register() {
    registerRef.value.validate((valid) => {
        if (valid) {
            LOR.loading = true;
            let {username,password} = userModel;
            userRegister({
              username,password
            }).then((result) => {
              let data = result.data;
              if(!data.register_flag){
                ElMessage.error(
                  {
                    message:result.data.message,
                    type:'error'
                  }
                )
                return false;
              }
              ElMessage.success(
                {
                  message:result.data.message,
                  type:'success'
                }
              )
              clearFrom()
              LOR.flag == 'login'
            }).catch((err) => {
              console.log(err);
            }).finally(()=>{
              LOR.loading = false;
            });
        } else {
            console.log('error submit!!');
            return false;
        }
    })
}

function validateEmail(rule, value, callback) {
    if (value === '') {
        callback(new Error('请输入邮箱'));
    } else if(!validate_email(value)){
        callback(new Error('邮箱格式不正确'));
    }else{
        callback();
    }
}

function validatePassword (rule, value, callback) {
    const value_bak = value;
    userModel.password = value = stripscript(value);
    // console.log(value);
    if (value === '') {
        callback(new Error('请输入密码'));
    }else if(value_bak !== value){
        userModel.password = '';
        callback(new Error('请重新输入,注意不要输入特殊字符'));
    }else if (!validate_pwd(value)) {
        callback(new Error('请入 >=6 并且 <= 20 位的密码，包含数字、字母"'));
    } else {
        callback();
    }
}

function validateConfrimPwd (rule, value, callback)  {
if(LOR.flag === 'login'){
    callback();
    return false;
}else if (value === '') {
    callback(new Error('请再次密码'));
}else if(userModel.password && value !== userModel.password){
    callback(new Error('两次输入密码不相同'));
} else {
    callback();
}
}
</script>

<style lang='scss'>
.el-form-item {
  margin-bottom: 32px;
}
.usr-block-top {
  margin-top: 8px;
  margin-left: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
  .user-LNR {
    height: 30px;
    margin: 20px 0px;
    div {
      display: inline-block;
      &:hover {
        color: rgb(68, 141, 201);
        font-weight: bold;
      }
    }
  }
}
.user-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}
</style>
