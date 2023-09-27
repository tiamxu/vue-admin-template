<template>
  <!-- 顶部左侧静态 -->
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="layoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- 面包屑动态显示路由名字和标题 -->
    <el-breadcrumb-item
      v-for="(item, index) of $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <!-- 图标占位 -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useLayoutSettingStore from '@/store/modules/setting'
//获取layout相关仓库
const layoutSettingStore = useLayoutSettingStore()
//点击图标的方法
const changeIcon = () => {
  //点击图标进行切换
  layoutSettingStore.fold = !layoutSettingStore.fold
}
const $route = useRoute()
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
