<template>
  <div class="login_container">
    <!-- <h1>我是一级路由登陆</h1> -->
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          :ref="loginFormRef"
        >
          <h1>Hello</h1>
          <h2>欢迎来到登陆</h2>
          <el-form-item prop="username">
            <el-input
              type="text"
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              :loading="loading"
              type="primary"
              size="default"
              @click="login"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import type { FormInstance } from 'element-plus'

//引入获取当前时间函数
import { getTime } from '@/utils/time'
//引入小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
//获取路由器
let $router = useRouter()
//获取路由对象
let $route = useRoute()
//定义变量控制按钮加载效果
let loading = ref(false)
//收集账户密码数据
const loginForm = reactive({ username: 'admin', password: 'atguigu123' })
const loginFormRef = ref<FormInstance>()
//登陆按钮回调
let login = async () => {
  //保证全部表单校验通过再发请求
  await loginFormRef.value?.validate()
  //加载效果:开始加载
  loading.value = true
  //点击登陆按钮以后干什么？
  //通知仓库(pinia)发登陆请求
  //登陆成功 -> 首页展示数据的地方
  //登陆失败 -> 弹出登陆失败的信息
  try {
    //保证登陆成功
    //可以书写.then语法
    await useStore.userLogin(loginForm)
    //编程式导航跳转到数据首页
    //判断登陆时候,路由路径当中是否有query参数
    let redirect: any = $route.query.redirect

    $router.push({ path: redirect || '/' })
    //登陆成功提示信息
    ElNotification({
      type: 'success',
      message: '登陆成功',
      title: `Hi,${getTime()}好`,
    })
    //登陆成功加载效果消失
    loading.value = false
  } catch (error) {
    //登陆失败加载效果消失
    loading.value = false
    //登陆失败提示信息
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}
//定义表单校验需要配置对象
const rules = {
  username: [
    {
      required: true,
      min: 6,
      max: 10,
      message: '账户长度至少为6位',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 10,
      message: '密码长度至少为6位',
      trigger: 'blur',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
