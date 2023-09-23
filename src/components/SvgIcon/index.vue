<template>
  <div></div>
  <!-- svg:图标最外层容器节点，内部需要与use标签结合使用 -->
  <svg :style="{ width, height }">
    <!-- xlink:href执行那个图标,属性值必须是#icon-图标名字 -->
    <!-- use标签fill属性可以设置图标颜色 -->
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  // 接收父组件过来的参数
  prefix: {
    //xlink:href属性值前缀
    type: String,
    default: '#icon-',
  },
  //提供使用图标的名字
  name: String,
  //接收父组件传递的颜色
  color: {
    type: String,
    default: '',
  },
  // 接收父组件传递过来的图标的宽度
  width: {
    type: String,
    default: '16px',
  },
  // 接收父组件传递过来的图标的高度
  height: {
    type: String,
    default: '16px',
  },
})
</script>
