<template>
    <div data-v-mainPageBanner ref="wrapperRef">
        <HeaderNav></HeaderNav>
        <div class="animated-banner" ref="bannerRef"></div>
        <div class="taper-line"></div>
    </div>
</template>

<script lang="ts">
import { base64ToBlobUrl, getScaleCompensation } from '@/components/utils'

//#region 
// 视差滚动
import defaultLogo from '../../assets/bannerMediaResources/logo'
const mediaImportSet: any = {
    // 视差滚动
    banner_20201130: () => import('../../assets/bannerMediaResources/mediaResources_20201130'), // 微观世界 双向

    banner_20210301: () => import('../../assets/bannerMediaResources/mediaResources_20210301'), // 【未完成】雪中小屋 长画幅 canvas
    banner_20210401: () => import('../../assets/bannerMediaResources/mediaResources_20210401'), // 【未完成】落花郊游 长画幅 canvas

    banner_20230405: () => import('../../assets/bannerMediaResources/mediaResources_20230405'), // 树叶风车 双向 *2
    banner_20230601: () => import('../../assets/bannerMediaResources/mediaResources_20230601'), // 篝火
    banner_20230703: () => import('../../assets/bannerMediaResources/mediaResources_20230703'), // 洞窟表演
    banner_20230801: () => import('../../assets/bannerMediaResources/mediaResources_20230801'), // 海底世界
    banner_20230912: () => import('../../assets/bannerMediaResources/mediaResources_20230912'), // 鳄鱼 双向
    banner_20231002: () => import('../../assets/bannerMediaResources/mediaResources_20231002'), // 荧光河道
    banner_20231107: () => import('../../assets/bannerMediaResources/mediaResources_20231107'), // 黄昏收获
    banner_20231201: () => import('../../assets/bannerMediaResources/mediaResources_20231201'), // 追叶33
    banner_20231212: () => import('../../assets/bannerMediaResources/mediaResources_20231212'), // 冰湖雪人

    banner_20240204: () => import('../../assets/bannerMediaResources/mediaResources_20240204'), // 包饺砸
    banner_20240606: () => import('../../assets/bannerMediaResources/mediaResources_20240606'), // 百花齐放
    banner_20240610: () => import('../../assets/bannerMediaResources/mediaResources_20240610'), // 海中大厅
    banner_20241210: () => import('../../assets/bannerMediaResources/mediaResources_20241210'), // 魔法扫帚

    banner_20250101: () => import('../../assets/bannerMediaResources/mediaResources_20250101'), // 雪山滑雪
    banner_20250501: () => import('../../assets/bannerMediaResources/mediaResources_20250501'), // 城外草原
    banner_20250801: () => import('../../assets/bannerMediaResources/mediaResources_20250801'), // 洪涝购物
    banner_20250909: () => import('../../assets/bannerMediaResources/mediaResources_20250909'), // 流星海滩

    // 特殊
    banner_20220723: () => import('../../assets/bannerMediaResources/mediaResources_20220723'), // 【未完成】唯一强交互

    // 视频
    banner_20210806: () => import('../../assets/bannerMediaResources/mediaResources_20210806'), // 窗边的2233 区分时间（目前随机） *6
    banner_20210906: () => import('../../assets/bannerMediaResources/mediaResources_20210906'), // 秋日蛋糕 区分时间 *2
    banner_20220106: () => import('../../assets/bannerMediaResources/mediaResources_20220106'), // 极地钓鱼 区分时间 *3
    banner_20220501: () => import('../../assets/bannerMediaResources/mediaResources_20220501'), // 【有彩蛋】四叶草上的2233
    banner_20220816: () => import('../../assets/bannerMediaResources/mediaResources_20220816'), // 2233十周年

    banner_2014: () => import('../../assets/bannerMediaResources/mediaResources_2014'), // 2014合集
    banner_2015: () => import('../../assets/bannerMediaResources/mediaResources_2015'), // 2015合集
    banner_2016: () => import('../../assets/bannerMediaResources/mediaResources_2016'), // 2016合集
    banner_legacy: () => import('../../assets/bannerMediaResources/mediaResources_legacy'), // 早期默认
    banner_20190601: () => import('../../assets/bannerMediaResources/mediaResources_20190601'), // 夏日高铁站
    banner_20190520: () => import('../../assets/bannerMediaResources/mediaResources_20190520'), // 520特供
    banner_20191029: () => import('../../assets/bannerMediaResources/mediaResources_20191029'), // 南瓜热气球
    banner_20190620: () => import('../../assets/bannerMediaResources/mediaResources_20190620'), // 哔哩哔哩十周年
    banner_20200124: () => import('../../assets/bannerMediaResources/mediaResources_20200124'), // 拜年祭
    banner_20200201: () => import('../../assets/bannerMediaResources/mediaResources_20200201'), // 极地2233
    banner_20200401: () => import('../../assets/bannerMediaResources/mediaResources_20200401'), // 搬运花朵
    banner_20200607: () => import('../../assets/bannerMediaResources/mediaResources_20200607'), // 荷塘泳池
    banner_20200817: () => import('../../assets/bannerMediaResources/mediaResources_20200817'), // 2233生日
    banner_20220927: () => import('../../assets/bannerMediaResources/mediaResources_20220927'), // 枫叶林收音
    banner_20230101: () => import('../../assets/bannerMediaResources/mediaResources_20230101'), // 趴桌睡觉
    banner_20230620: () => import('../../assets/bannerMediaResources/mediaResources_20230620'), // 篝火静态版本

    banner_20190621: () => import('../../assets/bannerMediaResources/mediaResources_20190621'), // 十周年活动
    banner_20200421: () => import('../../assets/bannerMediaResources/mediaResources_20200421'), // 读书日
    banner_20200605: () => import('../../assets/bannerMediaResources/mediaResources_20200605'), // 知识区
    banner_20200710: () => import('../../assets/bannerMediaResources/mediaResources_20200710'), // 高考加油
    banner_20210212: () => import('../../assets/bannerMediaResources/mediaResources_20210212'), // 拜年祭
    banner_20210722: () => import('../../assets/bannerMediaResources/mediaResources_20210722'), // 河南加油
    banner_20221221: () => import('../../assets/bannerMediaResources/mediaResources_20221221'), // 足球派对，一起亁杯
    banner_20211113: () => import('../../assets/bannerMediaResources/mediaResources_20211113'), // 年度弹幕
    banner_20220201: () => import('../../assets/bannerMediaResources/mediaResources_20220201'), // 放飞许愿灯
    banner_20220401: () => import('../../assets/bannerMediaResources/mediaResources_20220401'), // 哔哩日报
    banner_20220602: () => import('../../assets/bannerMediaResources/mediaResources_20220602'), // 碧蓝
    banner_20220614: () => import('../../assets/bannerMediaResources/mediaResources_20220614'), // 毕业季
    banner_20220720: () => import('../../assets/bannerMediaResources/mediaResources_20220720'), // 抵制网暴
    banner_20230315: () => import('../../assets/bannerMediaResources/mediaResources_20230315'), // 环境整治海报
    banner_20230622: () => import('../../assets/bannerMediaResources/mediaResources_20230622'), // 周年庆
    banner_20190924: () => import('../../assets/bannerMediaResources/mediaResources_20190924'), // 新中国成立70周年
    banner_20191213: () => import('../../assets/bannerMediaResources/mediaResources_20191213'), // 国家公祭日
    banner_20201005: () => import('../../assets/bannerMediaResources/mediaResources_20201005'), // 国庆
    banner_20210304: () => import('../../assets/bannerMediaResources/mediaResources_20210304'), // 十三届全国人大
    banner_20210623: () => import('../../assets/bannerMediaResources/mediaResources_20210623'), // 中国中产党成立100周年
    banner_20220303: () => import('../../assets/bannerMediaResources/mediaResources_20220303'), // 国庆
    banner_20221030: () => import('../../assets/bannerMediaResources/mediaResources_20221030'), // 国庆
    banner_黄绿合战: () => import('../../assets/bannerMediaResources/mediaResources_黄绿合战'),
}

const mediaSet: any = {
    interactive: [
        // mediaImportSet.banner_20201130,
        mediaImportSet.banner_20210301,
        mediaImportSet.banner_20210401,
        mediaImportSet.banner_20230405,
        mediaImportSet.banner_20230601,
        mediaImportSet.banner_20230703,
        mediaImportSet.banner_20230801,
        mediaImportSet.banner_20230912,
        mediaImportSet.banner_20231002,
        mediaImportSet.banner_20231107,
        mediaImportSet.banner_20231201,
        mediaImportSet.banner_20231212,
        mediaImportSet.banner_20240204,
        mediaImportSet.banner_20240606,
        mediaImportSet.banner_20240610,
        mediaImportSet.banner_20241210,
        mediaImportSet.banner_20250101,
        mediaImportSet.banner_20250501,
        mediaImportSet.banner_20250801,
        mediaImportSet.banner_20250909,
        /* mediaImportSet.banner_20220723 */
    ],
    animation: [
        mediaImportSet.banner_20210806,
        mediaImportSet.banner_20210906,
        mediaImportSet.banner_20220106,
        mediaImportSet.banner_20220501,
        mediaImportSet.banner_20220816
    ],
    image: [
        mediaImportSet.banner_2014,
        mediaImportSet.banner_2015,
        mediaImportSet.banner_2016,
        mediaImportSet.banner_legacy,
        mediaImportSet.banner_20190601,
        mediaImportSet.banner_20190520,
        mediaImportSet.banner_20191029,
        mediaImportSet.banner_20190620,
        mediaImportSet.banner_20200124,
        mediaImportSet.banner_20200201,
        mediaImportSet.banner_20200401,
        mediaImportSet.banner_20200607,
        mediaImportSet.banner_20200817,
        mediaImportSet.banner_20220927,
        mediaImportSet.banner_20230101,
        mediaImportSet.banner_20230620,
    ],
    promotion: [
        mediaImportSet.banner_20190621,
        mediaImportSet.banner_20200421,
        mediaImportSet.banner_20200605,
        mediaImportSet.banner_20200710,
        mediaImportSet.banner_20210212,
        mediaImportSet.banner_20210722,
        mediaImportSet.banner_20221221,
        mediaImportSet.banner_20211113,
        mediaImportSet.banner_20220201,
        mediaImportSet.banner_20220401,
        mediaImportSet.banner_20220602,
        mediaImportSet.banner_20220614,
        mediaImportSet.banner_20220720,
        mediaImportSet.banner_20230315,
        mediaImportSet.banner_20230622,
        mediaImportSet.banner_20190924,
        mediaImportSet.banner_20191213,
        mediaImportSet.banner_20201005,
        mediaImportSet.banner_20210304,
        mediaImportSet.banner_20210623,
        mediaImportSet.banner_20220303,
        mediaImportSet.banner_20221030,
        mediaImportSet.banner_黄绿合战,
    ]
}

//#endregion

import { defineComponent } from 'vue';
import HeaderNav from '../../components/MainPage/HeaderNav.vue'

export default defineComponent({
    components: {
        HeaderNav
    },
    data() {
        return {
            HeaderNav: HeaderNav,
            initialMouseX: 0, // 记录鼠标初始位置
            isMouseIn: false, // 标记鼠标是否在banner内
            layers: [] as HTMLElement[], // 存储所有layer元素
            bannerTitle: null as HTMLElement | null,
            mediaResources: [] as any[],
            compensationScale: 1 // 缩放补偿
        };
    },
    async mounted() {
        // banner类型
        // ?bannerAutoSwitch=interactive | animation | image | promotion
        const params = new URLSearchParams(location.search)
        let bannerType: any = params.get('bannerType')
        bannerType = mediaSet[bannerType] ? bannerType : 'interactive'
        let { mediaResources } = await mediaSet[bannerType][Math.floor(Math.random() * mediaSet[bannerType].length)]()

        // 渲染所有元素
        const banner = this.$refs.bannerRef as HTMLElement
        this.layers = this.initBanner(mediaResources, banner)

        // 自动切换Banner
        // ?bannerAutoSwitch=true
        // ?bannerAutoSwitchInterval=5000
        let bannerSwitchInterval = Number(params.get('bannerAutoSwitchInterval'))
        if (params.get('bannerAutoSwitch') || bannerSwitchInterval) {
            // 至少5s切换一次
            bannerSwitchInterval = bannerSwitchInterval >= 5000 ? bannerSwitchInterval : 5000

            setInterval(async () => {
                const { mediaResources } = await mediaSet[bannerType][Math.floor(Math.random() * mediaSet[bannerType].length)]()
                this.layers = this.initBanner(mediaResources, banner)
            }, bannerSwitchInterval)
        }

        // 视差移动
        const wrapper = this.$refs.wrapperRef as HTMLElement;

        this.applyScaleCompensation()
        window.addEventListener('resize', () => {
            this.applyScaleCompensation()
        })

        // 鼠标进入时记录初始位置
        wrapper.addEventListener('mouseenter', (e: MouseEvent) => {
            this.handleBannerEnter(e)
        })

        // 鼠标移动时计算偏移量并应用到每个layer元素
        wrapper.addEventListener('mousemove', (e: MouseEvent) => {
            this.handleBannerMove(e)
        })

        // 鼠标离开时缓慢复位
        wrapper.addEventListener('mouseleave', (e: MouseEvent) => {
            this.handleBannerLeave()
        })
    },
    methods: {
        initBanner(mediaResources: any, banner: any): HTMLElement[] {
            // 清空banner内所有的元素
            banner.innerHTML = ''
            this.mediaResources = mediaResources

            // 判断是否有logo
            let includeLogo = false
            const layers: HTMLElement[] = []
            try {
                for (const [index, item] of mediaResources.entries()) {
                    if (item.type == 'LOGO') {
                        includeLogo = true
                        throw new Error('')
                    }
                }
            } catch (err) {
                if (err == '') console.error(err)
            } finally {
                if (!includeLogo) mediaResources[mediaResources.length] = defaultLogo
            }

            mediaResources.forEach((item: any) => {
                const layer = document.createElement('div');
                layer.className = 'layer';
                banner.appendChild(layer);

                let el: any;

                const init = {
                    "translate": {
                        "x": 0,
                        "y": 0
                    },
                    "scale": {
                        "x": 1,
                        "y": 1
                    },
                    "rotate": 0,
                    "blur": 0,
                    "opacity": 1
                }

                if (!item.init) item.item = init

                if (item.base64) {
                    item.blob = base64ToBlobUrl(item.base64)
                } else {
                    item.blob = item.src
                }

                if (!item.abs) item.abs = []

                switch (item.type) {
                    case 'IMG':
                        el = document.createElement('img');
                        // 将base64转为blob链接
                        el.src = item.blob
                        layer.appendChild(el);
                        break;
                    case 'VIDEO':
                        el = document.createElement('video');
                        // 将base64转为blob链接
                        el.src = item.blob
                        el.autoplay = true;
                        el.loop = true;
                        el.muted = true;
                        // 禁用画中画
                        el.disablePictureInPicture = true;
                        layer.appendChild(el);
                        break;
                    case 'CANVAS':
                        el = document.createElement('canvas');
                        el.width = screen.width;
                        this.$nextTick(() => {
                            el.height = banner.clientHeight;
                        })
                        banner.appendChild(el)
                        layer.remove()

                        break
                    case 'LOGO':
                        el = document.createElement('img');
                        el.className = 'head-logo';
                        // 将base64转为blob链接
                        el.src = item.blob
                        banner.appendChild(el);

                        layer.remove()
                        break;
                    case 'TITLE':
                        el = document.createElement('span')
                        el.className = 'head-title'
                        el.innerText = item.title

                        this.bannerTitle = el

                        banner.appendChild(el)
                        layer.remove()
                        break

                    default:
                        break;
                }

                if (el) {
                    // 应用默认样式
                    if (item.style) {
                        for (let k in item.style) {
                            el.style[k] = item.style[k]
                        }
                    }

                    // 保存layer引用
                    layers.push(el)
                }


                // 方法调用
                item.fn && item.fn(el, banner)
            })

            return layers
        },
        handleBannerEnter(e: MouseEvent) {
            this.initialMouseX = e.clientX;
            this.isMouseIn = true;

            if (this.bannerTitle) this.bannerTitle.style.opacity = '1'
        },
        handleBannerMove(e: MouseEvent) {
            if (!this.isMouseIn) return;

            // 计算鼠标相对初始位置的偏移量
            const offsetX = e.clientX - this.initialMouseX;

            // 为每个layer应用不同的视差效果
            this.layers.forEach((el: HTMLElement, index: number) => {
                const { init, offsetRate, abs } = this.mediaResources[index]

                if (el && offsetRate) {
                    el.style.transform = `translate(${offsetX * offsetRate.x + init.translate.x}px, 
                    ${offsetX * offsetRate.y + init.translate.y}px) 
                    rotate(${offsetX * offsetRate.rotate + init.rotate}deg) 
                    scale(${offsetX * offsetRate.scaleX + init.scale.x}, 
                    ${offsetX * offsetRate.scaleY + init.scale.y})`

                    if (offsetRate.blur) el.style.filter = `blur(${(abs.includes('b') ? Math.abs(offsetX) : offsetX) * offsetRate.blur + init.blur}px)`

                    if (offsetRate.opacity) el.style.opacity = `${(abs.includes('o') ? Math.abs(offsetX) : offsetX) * offsetRate.opacity + init.opacity}`
                }
            })
        },
        handleBannerLeave() {
            this.isMouseIn = false;

            // 为每个layer中的元素添加缓慢复位动画
            this.layers.forEach((el: HTMLElement, index: number) => {
                const { style, offsetRate } = this.mediaResources[index]

                // @ts-ignore
                if (el && offsetRate) {
                    // 复位时间
                    const restoreTime = 360;

                    // 添加过渡效果
                    el.style.transition = `all ${restoreTime}ms ease-out`;

                    // 应用默认样式
                    // @ts-ignore
                    if (style) {
                        // @ts-ignore
                        for (let k in style) {
                            // @ts-ignore
                            el.style[k as any] = style[k];
                        }
                    }

                    // 过渡结束后清除过渡样式
                    setTimeout(() => {
                        el.style.transition = '';
                    }, restoreTime);
                }
            })

            if (this.bannerTitle) this.bannerTitle.style.opacity = '0'
        },
        applyScaleCompensation() {
            getScaleCompensation((scale: number) => {
                const wrapper = this.$refs.wrapperRef as HTMLElement
                const banner = this.$refs.bannerRef as HTMLElement

                wrapper.querySelectorAll('img, video').forEach((el: any) => {
                    el.style.scale = scale
                })

                wrapper.style.height = 180 * scale + 'px'
                banner.style.height = 180 * scale + 'px'
            })
        }
    },
    beforeUnmount() {
        // 组件销毁前释放所有blob URL
        this.layers.forEach((el: any) => {
            if (el instanceof HTMLMediaElement || el instanceof HTMLImageElement) {
                const src = el.src;
                if (src.startsWith('blob:')) {
                    URL.revokeObjectURL(src);
                }
            }
        });
    }
});
</script>

<style lang="less">
div[data-v-mainPageBanner] {
    position: relative;

    .animated-banner {
        position: relative;
        width: 100%;
        height: 180px;
        /* 根据需要调整高度 */
        overflow: hidden;
        background: #000;
        -webkit-user-drag: none;
        user-select: none;

        .layer {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            * {
                position: relative;
            }

            video {
                object-fit: cover;
            }
        }

        canvas {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 100;
        }
    }

    .head-logo {
        position: absolute;
        left: calc(50% - @container-width/2);
        bottom: 10px;
        width: 180px;
        // height: 50%;
        min-height: 60px;
        z-index: 100;
    }

    .head-title {
        position: absolute;
        bottom: 25px;
        left: 380px;
        line-height: 20px;
        background-color: rgba(0, 0, 0, 0.68);
        color: rgb(255, 255, 255);
        font-size: 14px;
        max-width: 350px;
        opacity: 0;
        padding: 6px 10px;
        border-radius: 4px;
        transition: 0.2s;
        z-index: 100;
    }

    .taper-line {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 100px;
        background: linear-gradient(rgba(0, 0, 0, .4), transparent);
        pointer-events: none;
    }
}
</style>