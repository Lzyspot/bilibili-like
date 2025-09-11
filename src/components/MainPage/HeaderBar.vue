<template>
    <div class="bili-header__banner">
        <div class="bili-header__banner-left">
            <router-link to="/404" class="bili-header__banner-logo" v-html="mainIcons.bilibili_tv"></router-link>
        </div>
        <div class="bili-header__banner-middle">
            <div class="bili-header__banner-nav">
                <router-link to="/404" class="bili-header__banner-nav-item">首页</router-link>
                <router-link to="/404" class="bili-header__banner-nav-item">热门</router-link>
                <router-link to="/404" class="bili-header__banner-nav-item">番剧</router-link>
                <router-link to="/404" class="bili-header__banner-nav-item">直播</router-link>
            </div>
        </div>
        <div class="bili-header__banner-right">
            <router-link to="/404" class="bili-header__banner-user"></router-link>
        </div>
    </div>
    <div class="taper-line"></div>
</template>

<script setup lang="ts">
import mainIcons from '@/assets/icons/main';
</script>

<style scoped lang="less">
.bili-header__banner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    // background: rgba(255, 255, 255, 0.8);
    // backdrop-filter: blur(10px);
    z-index: 100;
}
</style>