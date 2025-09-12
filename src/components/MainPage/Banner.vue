<template>
    <div data-v-mainPageBanner ref="wrapperRef">
        <HeaderNav></HeaderNav>
        <div class="animated-banner" ref="bannerRef"></div>
        <div class="taper-line"></div>
    </div>
</template>

<script lang="ts">
// 视差滚动
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230601';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230801';

// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20250909';

// 区分距离
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230405';

// 区分左右
/* 未完成 */
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20201130';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210301';

// 普通滚动
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210511';

// 图片
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_legacy';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20190601';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20190520';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20191029';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20190924';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20200201';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20200401';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20200607';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20220201';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20220301';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20220720';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210304';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210816';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210623';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230101';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230603';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230703';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20230903';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20231003';
import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20231104';
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20210401';

// 国庆
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20221030';

// 视频
// import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20220501';


import { defineComponent } from 'vue';
import HeaderNav from '@/components/MainPage/HeaderNav.vue'

interface LayerData {
    elem: HTMLElement,
    init: any,
    offsetRate: any
}

export default defineComponent({
    components: {
        HeaderNav
    },
    data() {
        return {
            HeaderNav: HeaderNav,
            initialMouseX: 0, // 记录鼠标初始位置
            isMouseIn: false, // 标记鼠标是否在banner内
            layers: [] as LayerData[] // 存储所有layer元素
        };
    },
    mounted() {

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

            const style = {
                "transform": "translate(0, 0) rotate(0deg) scale(1)",
                "opacity": "1",
                "filter": "blur(0)"
            }

            // 初始化item.init
            for (const key in item.init) {
                if (Object.prototype.hasOwnProperty.call(item.init, key)) {
                    const k = key as keyof typeof init; // 类型断言
                    if (k in init) {
                        // @ts-ignore 或进一步细化类型处理
                        if (typeof init[k] == 'object') {
                            init[k].x = item.init[k].x
                            init[k].y = item.init[k].y
                        } else {
                            init[k] = item.init[k];
                        }
                    }
                }
            }

            if (!item.style) item.style = style


            item.init = init;

            item.blob = this.base64ToBlobUrl(item.base64)

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
                case 'LOGO':
                    let logo = document.createElement('img');
                    logo.className = 'head-logo';
                    // 将base64转为blob链接
                    logo.src = item.blob
                    banner.appendChild(logo);

                    layer.remove()
                    break;

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

                // 方法调用
                item.fn && item.fn(el)

                // 保存layer引用
                this.layers.push({
                    elem: el,
                    init,
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
        });

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
                    // el.style.transform = `translate(${offsetX * offsetRate.x + init.translate.x}px, ${offsetX * offsetRate.y + init.translate.y}px)`;

                    el.style.translate = `${offsetX * offsetRate.x}px ${offsetX * offsetRate.y}px`;
                    el.style.scale = `${offsetX * offsetRate.scaleX + init.scale.x} ${offsetX * offsetRate.scaleY + init.scale.y}`;
                    if (offsetRate.rotate) {
                        // el.style.rotate = `${offsetX * offsetRate.rotate}deg`;
                        el.style.transform = `translate(${offsetRate.x ? offsetX * offsetRate.x + (init.translate.x ?? (init.translate?.x ?? 0)) : 0}px, 
                    ${offsetRate.y ? offsetX * offsetRate.y + (init.translate.y ?? 0) : (init.translate?.y ?? 0)}px) 
                    rotate(${(init.rotate && offsetRate.rotate) ? (offsetX * offsetRate.rotate + init.rotate) : 0}deg) 
                    scale(${(init.scale.x && offsetRate.scaleX) ? offsetX * offsetRate.scaleX + init.scale.x : 1}, 
                    ${(init.scale.y && offsetRate.scaleY) ? offsetX * offsetRate.scaleY + init.scale.y : 1})`;
                    }

                    // if (offsetRate.blur)
                    if (offsetRate.blur) el.style.filter = `blur(${offsetX * offsetRate.blur + init.blur}px)`
                    if (offsetRate.opacity) el.style.opacity = `${offsetX * offsetRate.opacity + init.opacity}`;


                }
            })
        });

        // 鼠标离开时缓慢复位
        wrapper.addEventListener('mouseleave', () => {
            this.isMouseIn = false;

            // 为每个layer中的元素添加缓慢复位动画
            this.layers.forEach((layerData: LayerData, index: number) => {
                const el = layerData.elem;

                if (el && mediaResources[index].offsetRate) {
                    // 复位时间
                    const restoreTime = 360;

                    // 添加过渡效果
                    el.style.transition = `all ${restoreTime}ms ease-out`;

                    // 应用默认样式
                    if (mediaResources[index].style) {
                        for (let k in mediaResources[index].style) {
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
            });
        });
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
        this.layers.forEach((el: HTMLElement) => {
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