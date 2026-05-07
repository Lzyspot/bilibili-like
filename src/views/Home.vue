<template>
  <div id="bili-header-wrapper">
    <!-- <component :is="currentBanner" class="bili-header__banner"></component> -->
    <Banner :displayNav="displayNav" :bannerData="bannerData" :bannerEaseIn="bannerEaseIn"></Banner>
    <!-- <Banner :displayNav="displayNav" :bannerData="bannerData"></Banner> -->

    <!-- <div @click="$router.push('404')">1111111111111111</div>
    <router-link to="/404">go to 404</router-link>
    <router-link to="/404" target="_blank">go to 404</router-link> -->
  </div>
  <div id="bili-container-wrapper" ref="biliContainer">
    <div id="bili-container">
      <HeaderChannel class="bili-header__channel"></HeaderChannel>
      <MainRecommendLayout></MainRecommendLayout>
      <ModuleWrap v-for="value in ChannelList" :rid="value.rid" :season_type="value.season_type"></ModuleWrap>
    </div>
  </div>
  <!-- <Login></Login> -->
  <div id="footer">
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeaderChannel from '@/components/MainPage/HeaderChannel.vue'
// import MainRecommendLayout from '@/components/MainPage/MainRecommendLayout.vue'
import MainRecommendLayout from '@/components/MainPage/MainRecommendLayout_old.vue'

import { getBannerData } from '@/config/banner'
import type { BannerPackage } from '@/struct/struct'

import Login from '@/components/Login.vue'

import Footer from '@/components/MainPage/Footer.vue'

import Banner from '@/components/MainPage/Banner.vue'

import ModuleWrap from '@/components/MainPage/ModuleWrap.vue'

interface ChannelItem {
  name: string,
  rid: number,
  season_type: number
}

const biliContainer = ref<HTMLElement | null>(null)

const ChannelList = ref<ChannelItem[]>([
  {
    "name": "番剧",
    "rid": 33,
    "season_type": 1
  },
  {
    "name": "国创",
    "rid": 167,
    "season_type": 4
  },
  {
    "name": "电影",
    "rid": 23,
    "season_type": 2
  },
  {
    "name": "TV剧",
    "rid": 11,
    "season_type": 5
  },
  {
    "name": "纪录片",
    "rid": 177,
    "season_type": 3
  }
])

const bannerEaseIn = ref<boolean>(true)
const displayNav = ref(true)
const bannerData = ref<BannerPackage>({
  content: [],
  version: '1.1',
  id: ''
})
onMounted(() => {
  const params = new URLSearchParams(location.search)

  const bannerDate = params.get('banner') || params.get('bannerDate')
  const bannerList = params.get('bannerList')
  const easeIn = params.get('easeIn')

  if (easeIn?.toLowerCase() == 'false') {
    bannerEaseIn.value = false
  } else {
    bannerEaseIn.value = true
  }

  if (bannerDate && !bannerList) {
    getBannerData('banner_' + bannerDate).then((mediaResources: BannerPackage) => {
      bannerData.value = mediaResources
    })
  } else {
    // banner类型
    // ?bannerType=interactive | animation | image | promotion
    let bannerType: any = params.get('bannerType')
    const getRangeBannerData = () => {
      return new Promise<BannerPackage>((resolve) => {
        if (bannerList) {
          const bannerListArr = bannerList.split(',')
          if (bannerListArr.length == 1) {
            resolve(getBannerData('banner_' + bannerList))
          }

          const randomIndex = Math.floor(Math.random() * bannerListArr.length)
          resolve(getBannerData('banner_' + bannerListArr[randomIndex]))
        }

        getBannerData(null, bannerType).then((mediaResources: BannerPackage) => {
          // bannerData.value = mediaResources
          resolve(mediaResources)
        })
      })
    }

    getRangeBannerData().then((mediaResources: BannerPackage) => {
      bannerData.value = mediaResources
    })


    // 自动切换Banner
    // ?bannerAutoSwitch!=false
    // ?bannerAutoSwitchInterval=10000
    const minInterval = 10000
    let bannerSwitchInterval = Number(params.get('bannerAutoSwitchInterval') || minInterval)

    if (params.get('bannerAutoSwitch')?.toLowerCase() != 'false' && bannerSwitchInterval) {
      // 至少10s切换一次
      bannerSwitchInterval = bannerSwitchInterval <= minInterval ? minInterval : bannerSwitchInterval

      setInterval(async () => {
        if (!document.hidden) {
          getRangeBannerData().then((mediaResources: BannerPackage) => {
            bannerData.value = mediaResources
          })
        }
      }, bannerSwitchInterval)
    }
  }
})

</script>

<style scoped lang="less">
#bili-container-wrapper,
#bili-header-wrapper,
#footer {
  max-width: 2560px;
  min-width: 1200px;
  margin: 0 auto;
  background: @bg1;
}

#bili-container {
  min-width: 1200px;
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