<template>
  <div class="not-found">
    <div class="content">
      <h1>404</h1>
      <p>页面未找到</p>
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="less">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;

  .content {
    text-align: center;

    h1 {
      font-size: 72px;
      color: #ff6699;
      margin-bottom: 20px;
    }

    p {
      font-size: 24px;
      color: #666;
      margin-bottom: 30px;
    }

    a {
      display: inline-block;
      padding: 10px 20px;
      background-color: #00a1d6;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #008ccd;
      }
    }
  }
}
</style>