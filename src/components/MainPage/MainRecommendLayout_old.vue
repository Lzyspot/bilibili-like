<template>
    <div class="recommend-layout">
        <div class="carousel-wrapper"></div>
        <div class="recommend-list">
            <videoCard v-for="item in recommendList" :key="item.bvid"
                :pic="`http://${hostname}:6600/api/img?url=${item.pic}`" :title="item.title" :bvid="item.bvid"
                :owner="item.owner" :view="item.view"></videoCard>

            <div ref="btnPrev" class="btn-prev bilifont"></div>
            <div ref="btnNext" class="btn-next bilifont"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

import videoCard from '@/components/VideoCard.vue'
import ws from '@/components/utils/websocket';
const hostname = ref<string>(location.hostname)

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

const btnPrev = ref<HTMLElement>()
const btnNext = ref<HTMLElement>()

let carouselIndex = 0
const recommendMap = new Map<number, RecommendItem[]>()

onMounted(async () => {
    flashCarousel();
    (btnNext.value as HTMLElement).onclick = () => {
        if (recommendMap.get(carouselIndex + 1)) {
            recommendList.value = recommendMap.get(++carouselIndex) as RecommendItem[]
        } else {
            flashCarousel()
        }
    }

    (btnPrev.value as HTMLElement).onclick = () => {
        if (recommendMap.get(carouselIndex - 1)) {
            recommendList.value = recommendMap.get(--carouselIndex) as RecommendItem[]
        } else {
            flashCarousel(-1)
        }
    }

    // ws.send("Hello from MainRecommendLayout.vue")
})

function flashCarousel(num = 1) {
    fetch(`http://${hostname.value}:6600/api/rcmd`).then(res => res.json()).then(data => {
        recommendList.value = data.data.item.map((item: any) => {
            return {
                bvid: item.bvid,
                pic: item.pic,
                title: item.title,
                owner: item.owner.name,
                view: item.stat.view
            }
        })

        carouselIndex += num
        recommendMap.set(carouselIndex, recommendList.value)

    })
}
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
        position: relative;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(2, 1fr);
        grid-auto-flow: column;
        grid-gap: 10px;
        margin-left: 20px;

        &:hover {

            .btn-prev,
            .btn-next {
                opacity: 1;
            }
        }

        .btn-prev,
        .btn-next {
            position: absolute;
            color: #fff;
            width: 32px;
            padding: 20px 0;
            top: 50%;
            margin-top: -35px;
            background: rgba(0, 0, 0, .6);
            // background: #000;
            z-index: 3;
            cursor: pointer;
            opacity: 0;
            transition: opacity .2s;


            &::after {
                // position: absolute;
                font-size: 30px;

            }
        }

        .btn-prev {
            left: 0%;

            &::after {
                content: '\E745';
            }
        }

        .btn-next {
            top: 50% !important;
            right: 0 !important;

            &::after {
                content: '\E744';
            }

        }
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