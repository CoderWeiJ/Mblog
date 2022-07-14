<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <img src="@a/img/avatar.jpg" alt="" />
      </div>
      <!-- 登录表单 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" :prefix-icon="UserFilled"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :prefix-icon="Lock" show-password @keyup.enter="login"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="loginValid">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, getCurrentInstance } from 'vue'
// 引入icon
import { Lock, UserFilled } from '@element-plus/icons-vue'
// API
import { login } from '@/api/login'

// 定义变量
const { proxy } = getCurrentInstance() as any
const { $msgTip } = proxy
const loginForm = reactive({ username: 'WeiJ', password: 'CoderWeiJ' })
const loginFormRules = reactive({ username: [{ required: true, message: '请输入用户名', trigger: 'blur' }], password: [{ required: true, message: '请输入密码', trigger: 'blur' }] })
let loginFormRef = ref<HTMLElement | null | any>(null)

// 逻辑处理
const useLogin: Function = () => {
  const resetLoginForm: Function = () => {
    loginFormRef.value.resetFields() // 重置表单
  }
  const loginValid: Function = () => {
    loginFormRef.value.validate(async (valid: any) => {
      if (valid) {
        try {
          let result = await login(loginForm)
          if (result.data.code === '0') $msgTip(result.data.message, 'success')
          // 消息提示
          else $msgTip(result.data.message, 'error')
        } catch (err) {
          $msgTip('登录失败', 'error') // 消息提示
          console.error('登录失败: ', err)
        }
      }
    })
  }
  return { resetLoginForm, loginValid }
}
const { resetLoginForm, loginValid } = useLogin()
</script>

<style lang="less" scoped>
.login_container {
  box-sizing: unset !important;
  height: 100%;
  .login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .avatar_box {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
    .login_form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btns {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
