/**
* 主页banner动画
*/

<template>
    <div data-v-mainPageBanner>
        <div class="animated-banner" ref="bannerRef"></div>
        <div class="taper-line"></div>
    </div>
</template>

<script lang="ts">
import { mediaResources } from '@/assets/bannerMediaResources/mediaResources_20250909.js';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'MainPageBanner',
    data() {
        return {
            initialMouseX: 0, // 记录鼠标初始位置
            isMouseIn: false, // 标记鼠标是否在banner内
            layers: [] as HTMLElement[] // 存储所有layer元素
        };
    },
    mounted() {
        // 渲染所有元素
        mediaResources.forEach((item: any) => {
            const layer = document.createElement('div');
            layer.className = 'layer';
            (this.$refs.bannerRef as HTMLElement).appendChild(layer);

            let el: any;

            if (item.type === 'IMG') {
                el = document.createElement('img');
                el.src = item.base64;
                layer.appendChild(el);
            } else if (item.type === 'VIDEO') {
                el = document.createElement('video');
                el.src = item.base64;
                el.autoplay = true;
                el.loop = true;
                el.muted = true;
                layer.appendChild(el);
            }

            // 应用默认样式
            if (item.originStyle) {
                for (let k in item.originStyle) {
                    el.style[k] = item.originStyle[k]
                }
            }

            // 保存layer引用
            this.layers.push(el);
            // 设置偏移率数据属性
            if (item.offsetRate) {
                el.dataset.offsetRateX = item.offsetRate.x;
                el.dataset.offsetRateY = item.offsetRate.y;
            }
        });

        // 视差移动

        // 获取banner元素
        const banner = this.$refs.bannerRef as HTMLElement;

        // 鼠标进入时记录初始位置
        banner.addEventListener('mouseenter', (e) => {
            this.initialMouseX = e.clientX;
            this.isMouseIn = true;
        });

        // 鼠标移动时计算偏移量并应用到每个layer元素
        banner.addEventListener('mousemove', (e) => {
            if (!this.isMouseIn) return;

            // 计算鼠标相对初始位置的偏移量
            const offsetX = e.clientX - this.initialMouseX;

            // 为每个layer应用不同的视差效果
            this.layers.forEach((el: HTMLElement, index?: number) => {
                // const parallaxFactor = (index + 1) * 0.1; // 每层不同的视差系数
                // const translateX = offsetX * parallaxFactor;
                // if (el) el.style.transform = `translateX(${translateX * Number(rx)}px)`;

                const rx = el.dataset.offsetRateX
                const ry = el.dataset.offsetRateY

                if (el) el.style.transform = `translate(${offsetX * Number(rx)}px, ${offsetX * Number(ry)}px)`;
            });
        });

        // 鼠标离开时缓慢复位
        banner.addEventListener('mouseleave', () => {
            this.isMouseIn = false;

            // 为每个layer中的元素添加缓慢复位动画
            this.layers.forEach((el: HTMLElement) => {
                if (el) {
                    // 复位时间
                    const restoreTime = 360;

                    // 添加过渡效果
                    el.style.transition = `transform ${restoreTime}ms ease-out`;
                    el.style.transform = 'translate(0, 0)';

                    // 过渡结束后清除过渡样式
                    setTimeout(() => {
                        el.style.transition = '';
                    }, restoreTime);
                }
            });
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
                height: 100%;

            }

            video {
                object-fit: cover;
            }
        }
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