<template>
    <div class="recommend-layout">

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import config from '@/config/config'

interface Carousel {
    href: string,
    img: string
}

const carouselList = ref<Carousel[]>([])


onMounted(() => {
    getRcmd()

})




function getRcmd() {
    fetch(config.ws + "/api/rcmd").then(res => res.json()).then(data => {
        console.log(data.data.item);
    })
}
</script>

<style scoped lang="less">
.recommend-layout {
    width: 100%;
}
</style>