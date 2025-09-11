<template>
  <div class="bili-header">
    <component :is="currentBanner" class="bili-header__banner"></component>
    <HeaderBar class="bili-header__banner-bar"></HeaderBar>
    <HeaderChannel class="bili-header__channel"></HeaderChannel>
    <div @click="$router.push('404')">1111111111111111</div>
    <router-link to="/404">go to 404</router-link>
    <router-link to="/404" target="_blank">go to 404</router-link>
  </div>
  <MainRecommendLayout></MainRecommendLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderChannel from '@/components/MainPage/HeaderChannel.vue'
import MainRecommendLayout from '@/components/MainPage/MainRecommendLayout.vue'

import HeaderBar from '@/components/MainPage/HeaderBar.vue'

import Banner from '@/components/MainPage/Banner.vue'
import Banner_20240617 from '@/components/MainPage/Banner-20240617.vue'

// 随机选择banner组件
const currentBanner = ref<any>(null)
Math.random() > 0.5 ? currentBanner.value = Banner : currentBanner.value = Banner_20240617

// 随机加载banner，有明显延迟
/* onMounted(async () => {
  const bannerComponents = [
    () => import('@/components/MainPage/Banner.vue'),
    () => import('@/components/MainPage/banner_20240617.vue')
  ]

  const randomIndex = Math.floor(Math.random() * bannerComponents.length)
  // const bannerModule = await bannerComponents[randomIndex]()
  // currentBanner.value = bannerModule.default
  bannerComponents[randomIndex]().then(bannerModule => {
    currentBanner.value = bannerModule.default
  })
}) */
</script>

<style scoped>
.bili-header__channel {
  width: 90%;
  margin: 0 auto;
}
</style>