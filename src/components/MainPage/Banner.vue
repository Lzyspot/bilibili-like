<template>
    <div data-v-mainPageBanner ref="wrapperRef">
        <HeaderNav></HeaderNav>
        <div class="animated-banner" ref="bannerRef"></div>
        <div class="taper-line"></div>
    </div>
</template>

<script lang="ts">
// 视差滚动
import defaultLogo from '../../assets/bannerMediaResources/logo'

//#region 
import { mediaResources as banner_20220723 } from '../../assets/bannerMediaResources/mediaResources_20220723';
import { mediaResources as banner_20230601 } from '../../assets/bannerMediaResources/mediaResources_20230601';
import { mediaResources as banner_20230801 } from '../../assets/bannerMediaResources/mediaResources_20230801';
import { mediaResources as banner_20230912 } from '../../assets/bannerMediaResources/mediaResources_20230912';
import { mediaResources as banner_20231107 } from '../../assets/bannerMediaResources/mediaResources_20231107';
import { mediaResources as banner_20231201 } from '../../assets/bannerMediaResources/mediaResources_20231201';
import { mediaResources as banner_20231212 } from '../../assets/bannerMediaResources/mediaResources_20231212';

import { mediaResources as banner_20240204 } from '../../assets/bannerMediaResources/mediaResources_20240204';
import { mediaResources as banner_20240606 } from '../../assets/bannerMediaResources/mediaResources_20240606';
import { mediaResources as banner_20240610 } from '../../assets/bannerMediaResources/mediaResources_20240610';
import { mediaResources as banner_20241210 } from '../../assets/bannerMediaResources/mediaResources_20241210';

import { mediaResources as banner_20250101 } from '../../assets/bannerMediaResources/mediaResources_20250101';
import { mediaResources as banner_20250501 } from '../../assets/bannerMediaResources/mediaResources_20250501';
import { mediaResources as banner_20250801 } from '../../assets/bannerMediaResources/mediaResources_20250801';
import { mediaResources as banner_20250909 } from '../../assets/bannerMediaResources/mediaResources_20250909';

// 区分距离
import { mediaResources as banner_20230405 } from '../../assets/bannerMediaResources/mediaResources_20230405';

// 区分左右
/* 未完成 */
import { mediaResources as banner_20201130 } from '../../assets/bannerMediaResources/mediaResources_20201130';

// 需要canvas
import { mediaResources as banner_20210301 } from '../../assets/bannerMediaResources/mediaResources_20210301';
import { mediaResources as banner_20210401 } from '../../assets/bannerMediaResources/mediaResources_20210401';

// 普通滚动

// 图片
import { mediaResources as banner_2014 } from '../../assets/bannerMediaResources/mediaResources_2014';
import { mediaResources as banner_2015 } from '../../assets/bannerMediaResources/mediaResources_2015';
import { mediaResources as banner_2016 } from '../../assets/bannerMediaResources/mediaResources_2016';
import { mediaResources as banner_legacy } from '../../assets/bannerMediaResources/mediaResources_legacy';
import { mediaResources as banner_20190601 } from '../../assets/bannerMediaResources/mediaResources_20190601';
import { mediaResources as banner_20190520 } from '../../assets/bannerMediaResources/mediaResources_20190520';
import { mediaResources as banner_20191029 } from '../../assets/bannerMediaResources/mediaResources_20191029';
import { mediaResources as banner_20190620 } from '../../assets/bannerMediaResources/mediaResources_20190620';
import { mediaResources as banner_20190621 } from '../../assets/bannerMediaResources/mediaResources_20190621';
import { mediaResources as banner_20190924 } from '../../assets/bannerMediaResources/mediaResources_20190924';
import { mediaResources as banner_20200201 } from '../../assets/bannerMediaResources/mediaResources_20200201';
import { mediaResources as banner_20200401 } from '../../assets/bannerMediaResources/mediaResources_20200401';
import { mediaResources as banner_20200607 } from '../../assets/bannerMediaResources/mediaResources_20200607';
import { mediaResources as banner_20200817 } from '../../assets/bannerMediaResources/mediaResources_20200817';

import { mediaResources as banner_20210623 } from '../../assets/bannerMediaResources/mediaResources_20210623';
import { mediaResources as banner_20210806 } from '../../assets/bannerMediaResources/mediaResources_20210806';
import { mediaResources as banner_20210816 } from '../../assets/bannerMediaResources/mediaResources_20210816';

import { mediaResources as banner_20220201 } from '../../assets/bannerMediaResources/mediaResources_20220201';
import { mediaResources as banner_20220301 } from '../../assets/bannerMediaResources/mediaResources_20220301';
import { mediaResources as banner_20220303 } from '../../assets/bannerMediaResources/mediaResources_20220303';
import { mediaResources as banner_20220401 } from '../../assets/bannerMediaResources/mediaResources_20220401';
import { mediaResources as banner_20220602 } from '../../assets/bannerMediaResources/mediaResources_20220602';
import { mediaResources as banner_20220720 } from '../../assets/bannerMediaResources/mediaResources_20220720';
import { mediaResources as banner_20220816 } from '../../assets/bannerMediaResources/mediaResources_20220816';
import { mediaResources as banner_20221221 } from '../../assets/bannerMediaResources/mediaResources_20221221';

import { mediaResources as banner_20230101 } from '../../assets/bannerMediaResources/mediaResources_20230101';
import { mediaResources as banner_20230315 } from '../../assets/bannerMediaResources/mediaResources_20230315';
import { mediaResources as banner_20230620 } from '../../assets/bannerMediaResources/mediaResources_20230620';
import { mediaResources as banner_20230703 } from '../../assets/bannerMediaResources/mediaResources_20230703';
import { mediaResources as banner_20231002 } from '../../assets/bannerMediaResources/mediaResources_20231002';


// 红色
import { mediaResources as banner_20221030 } from '../../assets/bannerMediaResources/mediaResources_20221030';
import { mediaResources as banner_20210304 } from '../../assets/bannerMediaResources/mediaResources_20210304';

// 视频
import { mediaResources as banner_20220501 } from '../../assets/bannerMediaResources/mediaResources_20220501';
import { mediaResources as banner_黄绿合战 } from '../../assets/bannerMediaResources/mediaResources_黄绿合战';

//#endregion

import { defineComponent } from 'vue';
import HeaderNav from '../../components/MainPage/HeaderNav.vue'

interface LayerData {
    elem: HTMLElement,
    init: any,
    offsetRate: any
}

// 随机选择banner
const mediaResourcesList = [
    // banner_20220723,
    /* 篝火 */
    // banner_20230601,
    /* 海底世界 */
    // banner_20230801,
    /* 鳄鱼 */
    // banner_20230912,
    // 黄昏森林
    // banner_20231107,
    // banner_20231201,
    // banner_20231212,
    /* 包饺砸 */
    // banner_20240204,
    /* 百花齐放 */
    // banner_20240606,
    /* 海中大厅 */
    // banner_20240610,
    /* 魔法扫帚 */
    // banner_20241210,
    /* 流星海边 */
    // banner_20250909,
    /* 城外草原 */
    // banner_20250501,
    /* 雪山滑雪 */
    // banner_20250101,
    /* 洪涝 */
    // banner_20250801,
    /* 树叶风车 */
    banner_20230405,
    /* 微观世界 */
    // banner_20201130,
    /* 冬 */
    // banner_20210301,
    /* 春 */
    // banner_20210401,
    /* 荧光河道 */
    // banner_20231002,

    // 视频
    /* 四叶草 */
    // banner_20220501,
    // 

    // banner_20210806,

    /* 图片 */
    // banner_2014,
    // banner_2015,
    // banner_2016,
    // banner_legacy,
    // banner_20190601,
    /* 520 */
    // banner_20190520,
    // banner_20191029,
    // banner_20190620,
    // banner_20190621,
    // banner_20200201,
    // banner_20200401,
    // banner_20200607,
    // banner_20200817,
    // banner_20220201,
    // banner_20220301,
    // banner_20220401,
    // banner_20220602,
    // banner_20220816,
    // banner_20221221,
    // banner_20220720,
    // banner_20230101,
    // banner_20230315,
    // banner_20230620,

    // banner_20230703,





    // banner_20210623,
    // banner_20190924,
    // banner_20221030,
    // banner_20220303,
    // banner_20210304,
    // banner_黄绿合战
]

export default defineComponent({
    components: {
        HeaderNav
    },
    data() {
        return {
            HeaderNav: HeaderNav,
            initialMouseX: 0, // 记录鼠标初始位置
            isMouseIn: false, // 标记鼠标是否在banner内
            layers: [] as LayerData[], // 存储所有layer元素
            bannerTitle: null as HTMLElement | null,
        };
    },
    async mounted() {
        const mediaResources = mediaResourcesList[Math.floor(Math.random() * mediaResourcesList.length)]

        // 判断是否有logo
        let includeLogo = false
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



        // 渲染所有元素
        const banner = this.$refs.bannerRef as HTMLElement
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
                item.blob = this.base64ToBlobUrl(item.base64)
            } else {
                item.blob = item.src
            }

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
                        console.log(el);
                        
                    }
                }

                // 方法调用
                item.fn && item.fn(el, banner)

                // 保存layer引用
                this.layers.push({
                    elem: el,
                    init: item.init,
                    offsetRate: item.offsetRate
                })

            }
        });

        // 视差移动
        const wrapper = this.$refs.wrapperRef as HTMLElement;

        // 鼠标进入时记录初始位置
        wrapper.addEventListener('mouseenter', (e) => {
            this.initialMouseX = e.clientX;
            this.isMouseIn = true;

            if (this.bannerTitle) this.bannerTitle.style.opacity = '1'

        })

        // 鼠标移动时计算偏移量并应用到每个layer元素
        wrapper.addEventListener('mousemove', e => {
            if (!this.isMouseIn) return;

            // 计算鼠标相对初始位置的偏移量
            const offsetX = e.clientX - this.initialMouseX;

            // 为每个layer应用不同的视差效果
            this.layers.forEach((layerData: LayerData, index?: number) => {
                // const parallaxFactor = (index + 1) * 0.1; // 每层不同的视差系数
                // const translateX = offsetX * parallaxFactor;
                // if (el) el.style.transform = `translateX(${translateX * Number(rx)}px)`;


                const el = layerData.elem as HTMLElement;
                const init = layerData.init;
                const offsetRate = layerData.offsetRate;

                if (el && offsetRate) {
                    if (offsetRate.rotate) {
                        // el.style.rotate = `${offsetX * offsetRate.rotate}deg`;
                        el.style.transform = `translate(${offsetX * offsetRate.x + init.translate.x}px, 
                    ${offsetX * offsetRate.y + init.translate.y}px) 
                    rotate(${offsetX * offsetRate.rotate + init.rotate}deg) 
                    scale(${offsetX * offsetRate.scaleX + init.scale.x}, 
                    ${offsetX * offsetRate.scaleY + init.scale.y})`;
                    } else {
                        el.style.translate = `${offsetX * offsetRate.x}px ${offsetX * offsetRate.y}px`;
                        el.style.scale = `${offsetX * offsetRate.scaleX + init.scale.x} ${offsetX * offsetRate.scaleY + init.scale.y}`;
                    }


                    // if (offsetRate.blur)
                    if (offsetRate.blur) el.style.filter = `blur(${offsetX * offsetRate.blur + init.blur}px)`


                    if (offsetRate.opacity) el.style.opacity = `${offsetX * offsetRate.opacity + init.opacity}`
                }
            })
        })

        // 鼠标离开时缓慢复位
        wrapper.addEventListener('mouseleave', () => {
            this.isMouseIn = false;

            // 为每个layer中的元素添加缓慢复位动画
            this.layers.forEach((layerData: LayerData, index: number) => {
                const el = layerData.elem;

                // @ts-ignore
                if (el && mediaResources[index]?.offsetRate) {
                    // 复位时间
                    const restoreTime = 360;

                    // 添加过渡效果
                    el.style.transition = `all ${restoreTime}ms ease-out`;

                    // 应用默认样式
                    // @ts-ignore
                    if (mediaResources[index]?.style) {
                        // @ts-ignore
                        for (let k in mediaResources[index].style) {
                            // @ts-ignore
                            el.style[k as any] = mediaResources[index].style[k];
                        }
                    }

                    el.style.translate = 'none'
                    el.style.scale = 'none'
                    el.style.rotate = 'none'

                    // 过渡结束后清除过渡样式
                    setTimeout(() => {
                        el.style.transition = '';
                    }, restoreTime);
                }
            })

            if (this.bannerTitle) this.bannerTitle.style.opacity = '0'
        })
    },
    methods: {
        // 添加base64转blob链接的方法
        base64ToBlobUrl(base64Data: string): string {
            try {
                // 去掉base64数据URL前缀
                const parts = base64Data.split(';base64,');
                const contentType = parts[0].split(':')[1];
                const raw = atob(parts[1]);

                // 创建Uint8Array
                const rawLength = raw.length;
                const uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }

                // 创建blob并返回URL
                const blob = new Blob([uInt8Array], { type: contentType });
                return URL.createObjectURL(blob);
            } catch (error) {
                console.error('Base64 to Blob conversion failed:', error);
                // 转换失败时返回原始base64数据
                return base64Data;
            }
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
    -webkit-user-drag: none;

    .animated-banner {
        position: relative;
        width: 100%;
        height: 180px;
        /* 根据需要调整高度 */
        overflow: hidden;
        background: #000;

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
        width: 220px;
        height: 50%;
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