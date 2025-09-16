<template>
    <div data-v-headerChannel>
        <div class="channel-container left-channel-container">
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="bilifont icon-bg icon-bg__home"></div>
                <span class="icon-title">首页</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="bilifont icon-bg icon-bg__dynamic"></div>
                <span class="icon-title">动态</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="bilifont icon-bg icon-bg__ranking"></div>
                <span class="icon-title">排行榜</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="bilifont icon-bg icon-bg__channer"></div>
                <span class="icon-title">频道</span>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import headerIcons from '@/assets/icons/header';
</script>

<style scope lang="less">
a {
    color: #000;
    text-decoration: none;
}

a:visited {
    color: #000;
}

div[data-v-headerChannel] {
    width: 100%;
    height: 80px;
    margin: 20px auto;

    background: #fff;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    /* padding: 0 20px; */
}

.left-channel-container {
    display: flex;
    width: 100%;

    .bili-header__channel-link {
        display: flex;
        flex-direction: column;
    }

    .icon-bg {
        // display: flex;
        // align-items: center;
        // justify-content: center;

        // width: 48px;
        // height: 48px;
        // margin-bottom: 6px;

        // border-radius: 50%;
        position: relative;
        width: 36px;
        height: 36px;
        background: #ff5c7c;
        border-radius: 50%;
        text-align: center;
        margin: 0 auto 4px;

        svg {
            width: 25px;
            height: 25px;
        }

        &::before {
            line-height: 36px;
            font-size: 28px;
            color: #fff;
        }
    }

    .icon-bg__home {
        background: #ff5c7c;

        &::before {
            content: '\E738';
        }
    }

    .icon-bg__dynamic {
        background: #fcba2a;

        &::before {
            content: '\E732';
        }
    }

    .icon-bg__ranking {
        background: #00a1d6;

        &::before {
            content: '\E739';
        }
    }

    .icon-bg__channer {
        background: #59ca73;

        &::before {
            content: '\E760';
        }
    }

    .icon-title {
        font: 400 14px auto;
        line-height: 20px;
        text-align: center;
    }
}



@media (min-width: 1280px) and (max-width: 1920px) {
    div[data-v-headerChannel] {
        height: 120px;

        .bili-header__channel-link {
            margin-right: 24px;
        }
    }
}

@media (max-width: 1279px) {
    div[data-v-headerChannel] {
        height: 100px;

        .bili-header__channel-link {
            margin-right: 10px;
        }
    }
}
</style>