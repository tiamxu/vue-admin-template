<template>
  <div>
    <!-- <p>{{ menuList }}</p> -->
    <template v-for="item in menuList" :key="item.path">
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item
          v-if="!item.meta.hidden"
          :index="item.path"
          @click="goRoute"
        >
          <template #title>
            <!-- <span>图标占位</span> -->
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          v-if="!item.children[0].meta.hidden"
          :index="item.children[0].path"
          @click="goRoute"
        >
          <template #title>
            <!-- <span>图标占位</span> -->
            <span>{{ item.children[0].meta.title }}</span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有多个子路由 -->
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 1"
      >
        <template #title>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归:要起名字 -->
        <Menu1 :menuList="item.children"></Menu1>
      </el-sub-menu>
    </template>
  </div>
</template>

<script lang="ts" name="Menu" setup>
import { useRouter } from 'vue-router'
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])
//获取路由对象
let $router = useRouter()
//点击菜单回调函数
const goRoute = (vc: any) => {
  // console.log(vc)
  //路由跳转
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name: 'Menu1',
}
</script>
<style scoped></style>
