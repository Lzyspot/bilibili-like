<template>
  <div id="bili-header-wrapper">
    <!-- <component :is="currentBanner" class="bili-header__banner"></component> -->
    <Banner></Banner>

    <!-- <div @click="$router.push('404')">1111111111111111</div>
    <router-link to="/404">go to 404</router-link>
    <router-link to="/404" target="_blank">go to 404</router-link> -->
  </div>
  <div id="bili-container-wrapper" ref="biliContainer">
    <div id="bili-container">
      <HeaderChannel class="bili-header__channel"></HeaderChannel>
      <MainRecommendLayout></MainRecommendLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderChannel from '@/components/MainPage/HeaderChannel.vue'
import MainRecommendLayout from '@/components/MainPage/MainRecommendLayout.vue'

import Banner from '@/components/MainPage/Banner.vue'

import { base64ToBlobUrl, getScaleCompensation } from '@/components/utils'

const biliContainer = ref<HTMLElement | null>(null)

onMounted(() => {
})

</script>

<style scoped lang="less">
#bili-container-wrapper,
#bili-header-wrapper {
  max-width: 2560px;
  min-width: 720px;
  margin: 0 auto;
  background: @bg1;
}

#bili-container {
  max-width: 1630px;
  margin: 0 auto;
}


@media (min-width: 1540px) and (max-width: 1800px) {
  #bili-container {
     max-width: 1400px;
  }
}

@media (max-width: 1540px) {
  #bili-container {
     max-width: 1200px;
  }
}
</style>