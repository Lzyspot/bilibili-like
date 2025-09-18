<template>
    <div class="recommend-layout">
        <div class="carousel-wrapper"></div>
        <div class="recommend-list">
            <videoCard v-for="item in recommendList" :key="item.bvid"
                :pic="'http://localhost:6600/api/img?url=' + item.pic" :title="item.title" :bvid="item.bvid"
                :owner="item.owner" :view="item.view"></videoCard>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import videoCard from '@/components/VideoCard.vue'
import ws from '@/components/utils/websocket';

interface Carousel {
    href: string,
    img: string
}

interface RecommendItem {
    title: string,
    bvid: string,
    pic: string,
    owner: string,
    view: number
}

const carouselList = ref<Carousel[]>([])
const recommendList = ref<RecommendItem[]>([])

onMounted(async () => {
    await fetch("http://localhost:6600/api/rcmd").then(res => res.json()).then(data => {
        recommendList.value = data.data.item.map((item: any) => {
            return {
                bvid: item.bvid,
                pic: item.pic,
                title: item.title,
                owner: item.owner.name,
                view: item.stat.view
            }
        })
    })

    console.log(recommendList.value);

    // ws.send("Hello from MainRecommendLayout.vue")
})
</script>

<style scoped lang="less">
.recommend-layout {
    display: flex;
    width: 100%;
    padding-bottom: 40px;

    .carousel-wrapper {
        width: 550px;
        height: 242px;
        background: #ccc;
        flex-shrink: 0;
    }

    .recommend-list {
        flex: 1;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-auto-flow: column;
        grid-gap: 10px;
        margin-left: 20px;
    }
}

@media (min-width: 1540px) and (max-width: 1800px) {
    .recommend-list {
        grid-template-columns: repeat(4, 1fr);

        :nth-of-type(n + 9) {
            display: none !important;
        }
    }
}

@media (max-width: 1540px) {
    .recommend-list {
        grid-template-columns: repeat(3, 1fr);

        :nth-of-type(n + 7) {
            display: none !important;
        }
    }
}
</style>