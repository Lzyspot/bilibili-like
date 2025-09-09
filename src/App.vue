<template>
  <div class="bili-header">
    <MainPageBanner></MainPageBanner>
  </div>
  <!-- <MainPageBanner1></MainPageBanner1> -->
  <div class="bili-layout">
    <MainRecommendLayout></MainRecommendLayout>
  </div>
  <div class="bili-footer"></div>

</template>

<script setup lang="ts">
// import { ref } from 'vue'
import MainPageBanner from '@/components/MainPageBanner.vue'
// import MainPageBanner1 from '@/components/MainPageBanner_20240617.vue'

import MainRecommendLayout from './components/MainRecommendLayout.vue';


</script>

<style scoped lang="less">

.bili-layout {
  width: 90%;
  margin: 0 auto;
}


</style>
