<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将在这里渲染 -->
  <router-view></router-view>
</template>

<script setup lang="ts">
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
  outline: none;
}

img,
svg {
  vertical-align: middle;
}

li {
  list-style-type: none;
}

button {
  border: none;
}

body {
  background: @bg2;
}

#app {
  max-width: 2560px;
  min-height: 100vh;
  margin: 0 auto;
  // background: @bg1;
}
</style>
