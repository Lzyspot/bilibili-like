<template>
    <div data-v-headerChannel>
        <div class="channel-icons">
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__dynamic" v-html="headerIcons.dynamic"></div>
                <span class="icon-title">动态</span>
            </router-link>
            <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__popular" v-html="headerIcons.popular"></div>
                <span class="icon-title">热门</span>
            </router-link>
            <!-- <router-link to="/404" class="bili-header__channel-link" target="_blank">
                <div class="icon-bg icon-bg__channer" v-html="headerIcons.channel"></div>
                <span class="icon-title">频道</span>
            </router-link> -->
        </div>
        <div class="channel-items__left">
            <router-link v-for="value in leftChannelItems" :to="value.link" target="_blank" class="channel-link"
                :style="`letter-spacing: ${value.name.length < 3 ? 2 : 0}px`">
                {{ value.name }}
                <span v-if="value.icon" v-html="value.icon"></span>
            </router-link>
            <div v-if="more" class="channel-link channel-more" ref='channelMore'>
                {{ more.name }}
                <span v-html="more.icon" ref="iconMore"></span>
            </div>
        </div>
        <div class="channel-items__right">
            <router-link v-for="value in rightChannelItems" :to="value.link" target="_blank" class="channel-link"
                :style="`letter-spacing: ${value.name.length < 3 ? 2 : 0}px`">
                <span v-html="value.icon"></span>
                {{ value.name }}
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import headerIcons from '@/assets/icons/header';
import mainIcons from '@/assets/icons/main';

interface ChannelItem {
    name: string,
    icon?: string,
    desc?: ChannelItem[],
    link: string
}

const leftChannelItems: ChannelItem[] = [
    { name: '番剧', desc: [{ name: '新番时间表', link: '/anime/timeline' }, { name: '新番索引', link: '/anime/index' }], link: '/anime' },
    { name: '电影', link: '/movie' },
    { name: '国创', link: '/guochuang' },
    { name: '电视剧', link: '/tv' },
    { name: '综艺', link: '/variety' },
    { name: '纪录片', link: '/documentary' },
    { name: '动画', link: '/c/douga' },
    { name: '游戏', link: '/c/game' },
    { name: '鬼畜', link: '/c/kichiku' },
    { name: '音乐', link: '/c/music' },
    { name: '舞蹈', link: '/c/dance' },
    { name: '影视', link: '/c/cinephile' },
    { name: '娱乐', link: '/c/ent' },
    { name: '知识', link: '/c/knowledge' },
    { name: '科技数码', link: '/c/tech' },
    { name: '资讯', link: '/c/information' },
    { name: '美食', link: '/c/food' },
    { name: '小剧场', link: '/c/shortplay' },
    { name: '汽车', link: '/c/car' },
    { name: '时尚美妆', link: '/c/fashion' },
    { name: '体育运动', link: '/c/sports' },
    { name: '动物', link: '/c/animal' },
    { name: 'vlog', link: '/c/vlog' },

]

const rightChannelItems: ChannelItem[] = [
    { name: '专栏', link: '/read/home', icon: mainIcons.read },
    { name: '活动', link: '/blackboard/activity-list.html', icon: mainIcons.activity },
    { name: '社区中心', link: '/blackboard/activity-5zJxM3spoS.html', icon: mainIcons.community },

    {
        name: '直播', link: '/live', icon: mainIcons.live, desc: [
            { name: '全部', link: '' },
            { name: '网游', link: '' },
            { name: '手游', link: '' },
            { name: '单机', link: '' },
            { name: '娱乐', link: '' },
            { name: '电台', link: '' },
            { name: '虚拟', link: '' },
            { name: '生活', link: '' },
            { name: '知识', link: '' },
            { name: '赛事', link: '' },
            { name: '聊天室', link: '' },
            { name: '互动玩法', link: '' },
        ]
    },
    {
        name: '课堂', link: '/cheese', icon: mainIcons.cheese, desc: [
            { name: '通识科普', link: '' },
            { name: '兴趣生活', link: '' },
            { name: '语言学习', link: '' },
            { name: '考研', link: '' },
            { name: '考试考证', link: '' },
            { name: '影视·创作', link: '' },
            { name: 'IT互联网', link: '' },
            { name: '职业职场', link: '' },
            { name: '个人成长', link: '' },
            { name: '我的课程', link: '' },
        ]
    },
    { name: '新歌热榜', link: '/pc/music-center', icon: mainIcons.music }
]

const more: ChannelItem = {
    name: '更多', link: '', icon: mainIcons.more, desc: [
        { name: '绘画', link: '/c/painting' },
        { name: '人工智能', link: '/c/ai' },
        { name: '家装房产', link: '/c/home' },

        { name: '户外潮流', link: '/c/outdoors' },
        { name: '健身', link: '/c/gym' },
        { name: '手工', link: '/c/handmake' },

        { name: '旅游出行', link: '/c/travel' },
        { name: '三农', link: '/c/rura' },
        { name: '亲子', link: '/c/parenting' },

        { name: '健康', link: '/c/health' },
        { name: '情感', link: '/c/emotion' },
        { name: '生活兴趣', link: '/c/life_joy' },

        { name: '生活经验', link: '/c/life_experience' },
        { name: '公益', link: '/love' },
        { name: '超高清', link: '/blackboard/era/Vp41b8bsU9Wkog3X.html' },
    ]
}

const channelMore = ref<any>(null)
const iconMore = ref<any>(null)

let iconMore_rotate = 0
onMounted(() => {
    channelMore.value.addEventListener('mouseenter', () => {
        iconMore_rotate += 180
        iconMore.value.style.transform = `rotate(${iconMore_rotate}deg)`

    })
    channelMore.value.addEventListener('mouseleave', () => {
        iconMore_rotate -= 180
        iconMore.value.style.transform = `rotate(${iconMore_rotate}deg)`
    })
})

</script>

<style scope lang="less">
div[data-v-headerChannel] {
    width: 100%;
    height: 80px;

    background: #fff;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    // box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
    /* padding: 0 20px; */
}

.channel-link {
    display: flex;
    justify-content: center;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #61666D;
}

.channel-more {
    cursor: default;

    span {
        margin-left: 5px;
        transition: all .2s ease-out;
    }
}

.channel-items__left {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    width: 100%;
    grid-auto-flow: column;
    grid-gap: 10px;

    border-right: 1px solid #E3E5E7;

    .channel-link {
        box-sizing: content-box;
        text-align: center;
        width: 100%;

        border-radius: 6px;
        background: #F6F7F8;
        border: 1px solid #F6F7F8;

        transition: all 0.2s;

        &:hover {
            background: #fff;
            border-color: #00AEEC;
            color: #00AEEC;
        }
    }
}

.channel-items__right {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-row-gap: 10px;
    // grid-auto-flow: column;
    flex-shrink: 0;
    width: 258px;

    .channel-link {
        display: flex;
        width: 100%;
        height: 100%;
        height: 32px;
        font-size: 14px;

        &:hover {
            color: #00AEEC;
        }

        svg {
            width: 20px;
            height: 20px;
            fill: #61666D;
        }
    }
}

.channel-icons {
    display: flex;
    // width: 100%;

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

@media (min-width: 1700px) {
    div[data-v-headerChannel] {
        height: 120px;

        .bili-header__channel-link {
            margin-right: 24px;
        }
    }

    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(12, 1fr);
    }
}

@media (min-width: 1370px) and (max-width: 1699px) {
    .channel-items__left {
        padding-right: 30px;
        grid-template-columns: repeat(11, 1fr);

        :nth-of-type(n + 22) {
            display: none !important;
        }
    }
}

@media (max-width: 1369px) {
    div[data-v-headerChannel] {
        height: 100px;

        .bili-header__channel-link {
            margin-right: 10px;
        }
    }

    .channel-items__left {
        padding-right: 20px;
        grid-template-columns: repeat(10, 1fr);

        :nth-of-type(n + 20) {
            display: none !important;
        }
    }
}
</style>