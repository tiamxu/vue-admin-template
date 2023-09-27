<template>
  <div>
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <!-- 渲染layout一级路由组件的子路由 -->
        <component :is="Component" v-if="flag"></component>
      </transition>
    </router-view>
  </div>
</template>
<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import useLayoutSettingStore from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
//控制组件是否销毁
let flag = ref(true)
watch(
  () => layoutSettingStore.refsh,
  () => {
    //点击刷新按钮路由组件销毁
    flag.value = false
    nextTick(() => {
      flag.value = true
    })
  },
)
//监听仓库内数据是否发生变化
</script>

<script lang="ts">
export default {
  name: 'Main1',
}
</script>
<style scoped lang="scss">
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
