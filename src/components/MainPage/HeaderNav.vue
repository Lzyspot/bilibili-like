<template>
    <div data-v-bannerNav class="banner-nav">
        <div class="banner-nav-left">
            <ul class="banner-nav-list">
                <li>
                    <router-link to="/404" class="banner-nav-item entry-title bilifont">
                        <span>主站</span>
                    </router-link>
                </li>
                <li class="popover-wrap" v-for="value in leftNav">
                    <router-link to="/404" class="banner-nav-item">{{ value }}</router-link>
                </li>
            </ul>
        </div>
        <div class="search-box">
            <form action="/search" target="_blank">
                <input ref="searchInput" type="text" name="keyword">
                <div class="search-btn">
                    <button type="submit" v-html="mainIcons.search" @click="() => {
                        if (!searchInput?.value) {
                            (searchInput as HTMLInputElement).value = (searchInput as HTMLInputElement).placeholder;
                        }
                    }"></button>
                </div>
            </form>
        </div>
        <div class="nav-user-center">
            <ul class="banner-nav-list">
                <li>
                    <router-link to="/search" target="_blank" class="banner-nav-item">
                        <button class="search-icon" v-html="mainIcons.search"></button>
                    </router-link>
                </li>
                <li class="mini-avatar">
                    <a :href="userSpace">
                        <img :src="userAvatar" alt="">
                    </a>
                </li>
                <li class="popover-wrap" v-for="value in rightNav">
                    <router-link to="/404" class="banner-nav-item">{{ value }}</router-link>
                </li>
                <li>
                    <router-link to="/404" class="upload-btn">
                        <span v-html="mainIcons.upload"></span>
                        <span>投稿</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="taper-line"></div>

    <div class="bilifont">

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import mainIcons from '@/assets/icons/main';

const leftNav = ref<string[]>(['番剧', '游戏中心', '直播', '会员购', '漫画', '赛事'])
const rightNav = ref<string[]>(['大会员', '消息', '动态', '收藏', '历史', '创作中心'])

const userSpace = ref<string>('')
const userAvatar = ref<string>('./src/default_avatar.webp')

const searchInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
    fetch('http://localhost:6600/api/search/default')
        .then(res => res.json())
        .then(data => {
            console.log(data.data.show_name);

            (searchInput.value as HTMLInputElement).placeholder = data.data.show_name

        })
})

</script>

<style scoped lang="less">
.banner-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    line-height: 36px;
    padding: 10px 24px;
    z-index: 1;
}

.banner-nav-left,
.nav-user-center {
    flex-shrink: 0;
}

.nav-user-center {
    .banner-nav-list {
        >li {
            margin-right: 10px;
        }
    }

}

.search-icon {
    display: none;
    opacity: 0;
}

.banner-nav-list {
    display: flex;
    align-items: center;

    >li {
        margin-right: 12px;
        font-size: 14px;
    }

    .banner-nav-item {
        color: #fff;
        // line-height: 64px;
        color: #fff;
        cursor: pointer;
    }

    .banner-logo {
        margin-right: 6px;
    }

    .entry-title {
        display: flex;
        align-items: center;

        &::before {
            position: relative;
            content: '\E72B';
            font-size: 18px;
            margin-right: 6px;
        }
    }

    .popover-wrap:hover {
        animation: bounce-up 300ms;
    }
}

.upload-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: 100px;
    // display: block;
    font-size: 14px;
    color: #fff;
    background: @bg5;
    border-radius: 8px;

    span {
        margin-right: 5px;
    }
}

.mini-avatar {
    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;

    }
}

.search-box {
    position: relative;
    width: 500px;
    margin: 0 10px;
    transition: width .3s;

    form {
        display: flex;
        align-items: center;
        background: #fff;
        border-radius: 6px;
        padding: 0px 38px 0px 16px;

        input {
            width: 100%;
            height: 34px;
            background-color: transparent;
            box-shadow: none;
            // color: #999999;
            color: #000;
            font-size: 14px;
            line-height: 34px;
            opacity: 1;
            transition: 0.2s;
        }

        .search-btn {
            position: absolute;
            right: 0;
            top: 0;
            height: 34px;
            width: 48px;
            background: #e7e7e7;
            border-radius: 0 6px 6px 0;
            overflow: hidden;

            button {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }

            svg {
                background: transparent;
            }

            &:hover {
                * {
                    fill: @bg4;
                }

                svg {
                    background: @bg5;
                }
            }
        }
    }
}

@keyframes bounce-up {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-3px);
    }

    100% {
        transform: translateY(0);
    }
}

@media (max-width: 1000px) {
    .search-box {
        // position: relative;
        width: 0;

        form {
            background: transparent;

            input,
            .search-btn {
                display: none;
            }
        }
    }

    .search-icon {
        // position: absolute;
        // left: 0;
        background: transparent;
        display: inline-block;
        opacity: 1;

        * {
            fill: #fff;
        }
    }
}
</style>
