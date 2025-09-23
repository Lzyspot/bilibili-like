<template>
    <div class="international-footer">
        <div class="footer-section">
            <div class="footer-title">bilibili</div>
            <ul>
                <li v-for="value in a" :key="value.link">
                    <a :href="value.link" target="_blank">{{ value.txt }}</a>
                </li>
            </ul>
        </div>

        <div class="footer-section">
            <div class="footer-title">传送门</div>
            <ul>
                <li v-for="value in b" :key="value.link">
                    <a :href="value.link" target="_blank">{{ value.txt }}</a>
                </li>
            </ul>
        </div>

        <div class="footer-section">
            <div class="footer-title">社交媒体</div>
            <ul>
                <li v-for="value in social" :key="value.link">
                    <a :href="value.link" target="_blank">{{ value.txt }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
const a = [
    { txt: '关于我们', link: 'https://www.bilibili.com/blackboard/aboutUs.html' },
    { txt: '联系我们', link: 'https://www.bilibili.com/blackboard/contact.html' },
    { txt: '用户协议', link: 'https://www.bilibili.com/protocal/licence.html' },
    { txt: '加入我们', link: 'https://www.bilibili.com/blackboard/join.html' },
    { txt: '友情链接', link: 'https://www.bilibili.com/blackboard/friends-links.html' },
    { txt: '隐私政策', link: 'https://www.bilibili.com/blackboard/privacy-pc.html' },
    { txt: 'bilibili认证', link: 'https://account.bilibili.com/account/official/home' },
    { txt: 'Investor Relations', link: 'http://ir.bilibili.com' },
]

const b = [
    { txt: '帮助中心', link: 'https://www.bilibili.com/blackboard/help.html' },
    { txt: '高级弹幕', link: 'https://www.bilibili.com/video/BV1Xx411c7cH/' },
    { txt: '活动专题页', link: 'https://www.bilibili.com/blackboard/topic_list.html' },
    { txt: '侵权申诉', link: 'https://www.bilibili.com/v/copyright/intro/' },
    { txt: '活动中心', link: 'https://www.bilibili.com/blackboard/x/act_list/' },
    { txt: '用户反馈论坛', link: 'https://t.bilibili.com/topic/name/%E7%94%A8%E6%88%B7%E5%8F%8D%E9%A6%88%E8%AE%BA%E5%9D%9B/feed' },
    { txt: '壁纸站', link: 'https://space.bilibili.com/6823116#/album' },
    { txt: '专车号服务中心', link: 'https://www.bilibili.com/basc' },
    { txt: '名人堂', link: 'https://www.bilibili.com/blackboard/activity-S1jfy69Jz.html' },
]

const social = [
    { txt: '新浪微博', link: 'https://weibo.com/bilibiliweb' },
    { txt: '官方微信', link: 'https://www.bilibili.com/blackboard/wechat.html' },
    { txt: '官方贴吧', link: 'https://tieba.baidu.com/f?ie=utf-8&kw=bilibili' },
]
</script>

<style scoped>
.international-footer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
    background-color: #f6f9fa;
    border-top: 1px solid #e5e9ef;
}

.footer-section {
    margin-bottom: 40px;
    min-width: 200px;
    margin-right: 40px;
}

.footer-section:last-child {
    margin-right: 0;
}

.footer-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #222;
}

ul {
    height: 66px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    white-space: nowrap;
}

li {
    height: 22px;
    margin: 0;
    width: 100px;
    margin-right: 20px;
}

a {
    color: #6d757a;
    text-decoration: none;
    font-size: 14px;
}

a:hover {
    color: #00a1d6;
    text-decoration: underline;
}
</style>