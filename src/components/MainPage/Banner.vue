<template>
    <div data-v-mainPageBanner ref="wrapperRef">
        <HeaderNav v-if="displayNav"></HeaderNav>
        <div class="animated-banner" ref="bannerRef"></div>
        <div class="taper-line"></div>
    </div>
</template>

<script lang="ts">
import type { MediaResource, BannerPackage } from '@/struct/struct'
import { base64ToBlobUrl, getScaleCompensation } from '@/components/utils/utils'

import defaultLogo from '@/assets/bannerMediaResources/logo'

import { defineComponent, watch } from 'vue';
import HeaderNav from '@/components/MainPage/HeaderNav.vue'


interface GlobalConfig {
    style: {
        bannerHeight: number
    }
}

export const globalConfig: GlobalConfig = {
    style: {
        bannerHeight: 180
    }
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
            layers: [] as HTMLElement[], // 存储所有layer元素
            bannerTitle: null as HTMLElement | null,
            bannerPackage: {} as BannerPackage,
            compensationScale: 1 // 缩放补偿
        };
    },

    props: {
        bannerType: {
            type: String,
            default: 'interactive'
        },
        bannerData: {
            type: Object as () => BannerPackage,
            default: () => ({
                content: [],
                version: '1.1',
                id: ''
            })
        },
        displayNav: {
            type: Boolean,
            default: true
        },
        bannerEaseIn: {
            type: Boolean,
            default: true
        }
    },
    mounted() {
        const banner = this.$refs.bannerRef as HTMLElement

        watch(() => this.bannerData, (newVal, oldVal) => {
            console.log(oldVal.id);

            if (newVal.id != oldVal.id) {
                const layers = this.initBanner(this.bannerData, banner)
                this.applyScaleCompensation()
                this.layers = layers

                if (this.layers.length) {
                    // for (let i = 0; i < (Math.max(this.layers.length, layers.length)); i++) {
                    //     if (this.layers[i]) {
                    //         this.layers[i].remove()
                    //     }
                    // }
                } else {
                }
            }
        })

        // 视差移动
        const wrapper = this.$refs.wrapperRef as HTMLElement;

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
        initBanner(mediaResources: BannerPackage, banner: HTMLElement): HTMLElement[] {
            banner.innerHTML = ''
            this.bannerPackage.unmount && this.bannerPackage.unmount(banner)
            this.bannerPackage = mediaResources

            const version = mediaResources.version
            const config = mediaResources.config

            if (config && version.startsWith('1.')) {
                if (typeof config == 'function') {
                    config(globalConfig)
                } else {
                    Object.assign(globalConfig, config)
                }
            }

            // 判断是否有logo
            let includeLogo = false
            const layers: HTMLElement[] = []
            try {
                for (const [index, item] of this.bannerPackage.content.entries()) {
                    if (item.type == 'LOGO') {
                        includeLogo = true
                        throw new Error('')
                    }
                }
            } catch (err) {
                if (err == '') console.error(err)
            } finally {
                if (!includeLogo) this.bannerPackage.content.push(defaultLogo)
            }

            this.bannerPackage.content.forEach((item: any, index: number) => {
                const layer = document.createElement('div');
                layer.className = 'layer';
                if (this.bannerEaseIn) {
                    setTimeout(() => {
                        let div = document.createElement('div')
                        banner.appendChild(div);
                        div.appendChild(layer)
                        div.style.zIndex = index.toString()
                        div.style.opacity = '0'
                        div.style.willChange = 'opacity'

                        // 强制触发重排（读取布局属性）
                        div.offsetHeight;

                        // 此时再设置过渡和最终透明度
                        div.style.transition = 'opacity 1s'
                        div.style.opacity = '1'
                    }, 100 * index)
                } else {
                    banner.appendChild(layer)
                }

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
                        console.log(item);
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

                item.callback && item.callback(el, banner)
            })

            this.bannerPackage.mount && this.bannerPackage.mount(banner)

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
                const { init, offsetRate, abs } = this.bannerPackage.content[index]

                if (el && offsetRate && init) {
                    el.style.transform = `translate(${offsetX * offsetRate.x + init.translate.x}px, 
                    ${offsetX * offsetRate.y + init.translate.y}px) 
                    rotate(${offsetX * offsetRate.rotate + init.rotate}deg) 
                    scale(${offsetX * offsetRate.scaleX + init.scale.x}, 
                    ${offsetX * offsetRate.scaleY + init.scale.y})`

                    if (offsetRate.blur && init.blur) el.style.filter = `blur(${(abs.includes('b') ? Math.abs(offsetX) : offsetX) * offsetRate.blur + init.blur}px)`

                    if (offsetRate.opacity && init.opacity) el.style.opacity = `${(abs.includes('o') ? Math.abs(offsetX) : offsetX) * offsetRate.opacity + init.opacity}`
                }
            })
        },
        handleBannerLeave() {
            this.isMouseIn = false;

            // 为每个layer中的元素添加缓慢复位动画
            this.layers.forEach((el: HTMLElement, index: number) => {
                const { style, offsetRate } = this.bannerPackage.content[index]

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

                wrapper.style.height = globalConfig.style.bannerHeight * scale + 'px'
                banner.style.height = globalConfig.style.bannerHeight * scale + 'px'
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
        z-index: 0;

        &,
        * {
            -webkit-user-drag: none;
            user-select: none;
        }

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