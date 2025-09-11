<template>
    <div data-v-headerChannel>
        <div class="channel-container left-channel-container">
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__dynamic" v-html="headerIcons.dynamic"></div>
                <span class="icon-title">动态</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__popular" v-html="headerIcons.popular"></div>
                <span class="icon-title">热门</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__channer" v-html="headerIcons.channel"></div>
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
        display: flex;
        align-items: center;
        justify-content: center;

        width: 48px;
        height: 48px;
        margin-bottom: 6px;

        border-radius: 50%;

        svg {
            width: 25px;
            height: 25px;
        }
    }

    .icon-bg__dynamic {
        background: #ff9212;
    }

    .icon-bg__popular {
        background: #f07775;
    }

    .icon-bg__channer {
        background: #59ca73;
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