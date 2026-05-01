<template>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将在这里渲染 -->
  <router-view></router-view>
</template>

<script setup lang="ts">
import config from '@/config/config'

console.log(config);

fetch(config.api + '/ip').then(res => res.text()).then(data => {
  console.log('当前用户IP地址: ', data);
})
</script>

<style lang="less">
@font-face {
  font-family: bilifont;
  // src: url('./src/fonts/Iconochive-Regular.woff');
  src: url('/src/fonts/font1.woff2');
  // src: url('./src/fonts/font2.woff2');
}

* {
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
}

*::selection {
  background: #8bc7e5;
  color: #fff;
}

a {
  color: #000;
  text-decoration: none;
}

img,
svg {
  vertical-align: middle;
}

li {
  list-style-type: none;
}

button {
  cursor: pointer;
}

button,
input {
  border: none;
}

body {
  background: @bg2;
}

.bilifont {
  font-family: bilifont !important;
  -webkit-font-smoothing: antialiased;

  &::after {
    // position: absolute;
    // content: '首页\E738 动态\E732 排行\E739 频道\E760 吃豆人\E73A 刷新\E73C';
    // font-size: 36px;
    // -webkit-text-stroke: 1px white
  }
}

.left-wrapper {
  width: 1286px;
}

@media (max-width: 1286px) {
  .left-wrapper {
    width: 1070px;
  }
}

@media (max-width: 1654px) {
  .left-wrapper {
    width: 854px;
  }
}

@media (max-width: 1438px) {
  .left-wrapper {
    width: 710px;
  }
}
</style>
