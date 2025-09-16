<template>
  <div id="bili-container" ref="biliContainer">

  </div>
  <div class="bili-header">
    <!-- <component :is="currentBanner" class="bili-header__banner"></component> -->
    <Banner></Banner>
    <HeaderChannel class="bili-header__channel"></HeaderChannel>

    <!-- <div @click="$router.push('404')">1111111111111111</div>
    <router-link to="/404">go to 404</router-link>
    <router-link to="/404" target="_blank">go to 404</router-link> -->
  </div>
  <MainRecommendLayout></MainRecommendLayout>
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

<style scoped>
.bili-header {
  max-width: 2560px;
  min-width: 720px;
  margin: 0 auto;
}

.bili-header__channel {
  width: 90%;
  margin: 0 auto;


}
</style>