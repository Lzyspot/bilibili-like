/**
 * 主页banner动画
 * https://gitee.com/u1iz/bilibili-banner
 */

<template>
    <div id="wrapper" ref="wrapper">
        <canvas id="banner" ref="banner"></canvas>
    </div>

    <!-- <div id="fps_display" v-if="config.fpsDisplayInterval">
        <div>
            <span>实时帧率：</span> <span>{{ info.FPS.current.toFixed(2) }}</span>
        </div>
        <div>
            <span>平均帧率：</span> <span>{{ info.FPS.average.toFixed(2) }}</span>
        </div>
        <div>
            <span>每秒平均：</span> <span>{{ info.FPS.interval.toFixed(2) }}</span>
        </div>
    </div> -->

</template>

<script setup>

import { ref, onMounted, reactive } from 'vue'

const config = reactive({
    // 展示帧率
    fpsDisplayInterval: true,
    // 动画帧率 推荐: 240 标: 60 Max: 260
    canvasFPS: 60,
    // 恢复量倍率 推荐: 0.9 标: 0.86 max: 0.9
    restoreSpeed: 0.86,
    // 移动量倍率 推荐: 0.6 标: 0.1 max: 1
    offsetSpeed: 0.1,
    // 区域加载间隔  标: 100 max 500
    loadInterval: 100,
    // 显示帧率的时间间隔 标: 1000
    showFPS_timeout: 1000,

    // 画布缩放
    canvasScale: 1
})

const info = ref({
    FPS: {
        current: 0,
        average: 0,
        averagePerSecond: 0
    }
})


// 设置画布大小
// 依据：b站主页缩放至50%时，Banner显示的最大值
const canvasSize = {
    w: 2560,
    h: 240
}

// 容器
const wrapper = ref(null)
// 画布
const banner = ref(null)


onMounted(() => {

    // 缓存画布，双缓冲解决高频刷新时的画面闪烁问题
    const tempCanvas = document.createElement('canvas')

    const ctx = banner.value.getContext('2d')
    const tempCtx = tempCanvas.getContext('2d')

    banner.value.width = canvasSize.w, banner.value.height = canvasSize.h
    tempCanvas.width = canvasSize.w, tempCanvas.height = canvasSize.h

    // 设置填充色
    ctx.fillStyle = '#7bc6fc';
    // 填充整个 Canvas 画布
    ctx.fillRect(0, 0, canvasSize.w, canvasSize.h);

    // 视频
    const bubble1 = videoNode('./src/528d9376-f0fd-4445-9840-13e7559d6056.webm', {
        playbackRate: 1.5
    })
    const bubble2 = videoNode('./src/528d9376-f0fd-4445-9840-13e7559d6056.webm')

    const bubble3 = videoNode('./src/1671f963-c10d-4558-af99-e20a26c5a1f8.webm', {
        playbackRate: 1.5
    })

    // 获取图片数据
    fetch('./src/base.json')
        .then(res => res.text())
        .then(data => renderBanner(JSON.parse(data), config.loadInterval))


    const imageList = []


    let mouseOriginX = null, mouseOffsetX = 0
    const calcOffset = (weight = 0) => {
        return mouseOffsetX * config.offsetSpeed * weight
    }

    let startTime, endTime, intervalFPS_startTime = Date.now(), intervalFPS_set = []

    function renderBanner(imgSet, duration = null) {
        startTime = performance.now()

        tempCtx.fillStyle = '#7bc6fc'
        tempCtx.fillRect(0, 0, canvasSize.w, canvasSize.h)

        if (duration == Number(duration)) {
            let i = 0
            for (let k in imgSet) {
                imageList[i] = new Image()
                imageList[i].src = imgSet[k]
                imageList[i].id = k

                // 偏移权重
                let offsetWeight = 0, offsetTopWeight = 0, scaleWeight = 0, scaleFactor = 0.8, left = 0, top = 0

                const _init = () => {
                    imageList[i].offsetWeight = offsetWeight
                    imageList[i].offsetTopWeight = offsetTopWeight
                    imageList[i].scaleWeight = scaleWeight
                    imageList[i].scaleFactor = scaleFactor
                    imageList[i].left = left
                    imageList[i].top = top
                }


                switch (k) {
                    case '198efffbc58493300854c04ab0ea8d979a6f9223.png@1c.webp':
                        // 屏幕
                        scaleFactor = 0.81
                        left = -30
                        offsetWeight = 0.88
                        break;
                    case 'ce8c5e45230a6d3805baf60f5916f1cd441aac8e.png@1c.webp':
                        // 33
                        /*  */
                        offsetWeight = 0.4
                        left = -30
                        scaleFactor = 0.81
                        break;
                    case 'cbf19f3682dfb02e62557d07fefaf241a80296a1.png@1c.webp':
                        // 路人
                        offsetWeight = 0.56

                        break;
                    case '8ea0e95a8e5fc85ae227810925dba1ace1e9fcba.png@1c.webp':
                        // 拉行李的路人
                        offsetWeight = 0.36
                        left = -20


                        _init()

                        // 插入泡泡3（被植物覆盖
                        i++
                        imageList[i] = bubble3
                        left = 1980
                        scaleFactor = 0.77
                        imageList[i].id = '1671f963-c10d-4558-af99-e20a26c5a1f8.webm'
                        break;
                    case '7998ca9f0bc267375fb7b45f75626d96806f94d7.png@1c.webp':
                        // 植物 13
                        offsetWeight = 0.9

                        // console.log(imageList[i-1].id);

                        break;
                    case 'd6c941cf2d5fc6c717173f7e3f166dbc444aa15b.png@1c.webp':
                        // 两边背景建筑
                        offsetWeight = 0.06
                        break;
                    case '782d55aeca6cc75f51d2d630005f514a61a0ddfa.png@1c.webp':
                        // 中间背景建筑
                        offsetWeight = 0.07
                        break;
                    case '42485baddbca05d2c4c7710a0b76b74d303e06d7.png@1c.webp':
                        // 22看窗
                        /*  */
                        offsetWeight = 0.26
                        scaleFactor = 0.835
                        left = -72
                        top = -6
                        break;

                    case '09d0855b6b6d6965e8f02404777986237848c6c9.png@1c.webp':
                        // 大鲸鱼
                        offsetWeight = 0.96
                        offsetTopWeight = 0.03
                        left = -16
                        break;

                    case '27e411d92729604aa594858beb5130ed60aad76d.png@1c.webp':
                        // 小鲸鱼
                        offsetWeight = -1.32
                        offsetTopWeight = -0.13
                        left = -34
                        top = -2

                        scaleWeight = 0.001
                        break;

                    case 'cd68251cde11936871237ca94360acb451bf7ed2.png@1c.webp':
                        // 光 最后一张图片
                        left = -180
                        offsetWeight = 1.58
                        _init()

                        // 插入泡泡1
                        i++
                        imageList[i] = bubble1
                        left = 71
                        scaleFactor = 0.8
                        offsetWeight = 0
                        _init()

                        // 插入泡泡2
                        i++
                        imageList[i] = bubble2
                        left = 1489
                        scaleFactor = 1.5
                        offsetWeight = 0

                        break;
                    case '40878bbef514e2d4bf5d660fe1145c869567bec2.png@1c.webp':
                        // 窗上的泡泡
                        left = -15
                        offsetWeight = 0.07
                        break;


                    // 斜向

                    case 'bb6266e1525a51f7920fc8881e47cadeee271b0c.png@1c.webp':
                        // 横滚泡泡
                        offsetWeight = 1.08
                        offsetTopWeight = 0.07
                        left = 142
                        top = -2
                        break;
                    case 'a43c6833d262301373234ffbd6934559d2ce7fb2.png@1c.webp':
                        // 大泡泡
                        offsetWeight = 0.32
                        offsetTopWeight = 0.15
                        left = -14

                        break;
                    case '142a486b8dd500a626a60b68ad993af8dabc8b55.png@1c.webp':
                        // 很多泡泡
                        offsetWeight = 0.91
                        offsetTopWeight = 0.44
                        break;
                    case 'c13ca9c6405c71bf864ed2bc421680cb437f45ef.png@1c.webp':
                        // 小泡泡
                        offsetWeight = 0.2
                        offsetTopWeight = 0.12
                        break;
                    // case 'd6c941cf2d5fc6c717173f7e3f166dbc444aa15b.png@1c.webp':
                    //     offsetWeight = 0.05
                    //     break;

                    default:
                        break;
                }

                const loadImg = index => {
                    // 区域间隔加载
                    setTimeout(() => {
                        switch (imageList[index].id) {
                            case 'cd68251cde11936871237ca94360acb451bf7ed2.png@1c.webp':
                                tempCtx.globalAlpha = 0.5
                                break;

                            default:
                                tempCtx.globalAlpha = 1
                                ctx.globalAlpha = index / imageList.length
                                break;
                        }

                        tempCtx.drawImage(imageList[index],
                            left * config.canvasScale, top * config.canvasScale,
                            imageList[index].width * scaleFactor * config.canvasScale,
                            imageList[index].height * scaleFactor * config.canvasScale)


                        ctx.drawImage(tempCanvas, 0, 0)

                        endTime = performance.now()
                        info.value.FPS.current = (1000 / (endTime - startTime))
                    }, duration * i)
                }

                _init()
                loadImg(i)
                i++
            }


            setTimeout(() => renderBanner(), 1000 / config.canvasFPS + (duration * imageList.length))
        } else {
            imageList.forEach((img, i) => {
                switch (img.id) {
                    case 'cd68251cde11936871237ca94360acb451bf7ed2.png@1c.webp':
                        tempCtx.globalAlpha = 0.5
                        break;

                    default:
                        tempCtx.globalAlpha = 1
                        break;
                }

                // 复原动画
                let left = calcOffset(img.offsetWeight), top = calcOffset(img.offsetTopWeight ?? 0), scale = calcOffset(img.scaleWeight)

                if (img.latest && mouseOriginX != Number(mouseOriginX)) {
                    const trans = val => {
                        const recovery = val * config.restoreSpeed
                        // 根据帧率变化的偏移补偿
                        return recovery + (recovery * (config.canvasFPS - info.value.FPS.average) * 0.001)
                    }

                    left = trans(img.latest.l)
                    img.latest.l = left

                    top = trans(img.latest.t)
                    img.latest.t = top

                    scale = trans(img.latest.s)
                    img.latest.s = scale

                } else {
                    img.latest = {
                        l: calcOffset(img.offsetWeight),
                        t: calcOffset(img.offsetTopWeight ?? 0),
                        s: calcOffset(img.scaleWeight)
                    }
                }

                const w = (img.width == 0 ? img.videoWidth : img.width),
                    h = (img.height == 0 ? img.videoHeight : img.height)
                tempCtx.drawImage(img,
                    img.left * config.canvasScale + left,
                    img.top * config.canvasScale + top,
                    (w * img.scaleFactor + w * scale) * config.canvasScale,
                    (h * img.scaleFactor + h * scale) * config.canvasScale)

                if (i >= imageList.length - 1) {
                    tempCtx.globalAlpha = 1

                    // 最终绘制
                    ctx.drawImage(tempCanvas, 0, 0)

                    setTimeout(() => {
                        endTime = performance.now()
                        info.value.FPS.current = 1000 / (endTime - startTime)

                        info.value.FPS.average = info.value.FPS.average ? (info.value.FPS.current + info.value.FPS.average) / 2 : info.value.FPS.current

                        if (Date.now() - intervalFPS_startTime > config.showFPS_timeout) {
                            info.value.FPS.averagePerSecond = (intervalFPS_set.reduce((sum, currentValue) => sum + currentValue, 0) / intervalFPS_set.length)

                            // 定时器复位
                            intervalFPS_startTime = Date.now()
                            // 清空数组
                            intervalFPS_set.length = 0
                        } else {
                            intervalFPS_set.push(info.value.FPS.current)
                        }
                        renderBanner()
                    }, 1000 / config.canvasFPS)
                }
            })
        }
    }


    window.addEventListener('mousemove', _ => {
        // 判断鼠标进入判定区域
        if (banner.value && _.pageY >= banner.value.offsetTop && _.pageY <= banner.value.offsetTop + banner.value.height) {
            // 获取原始点
            if (mouseOriginX != Number(mouseOriginX)) {
                mouseOriginX = _.pageX
            }


            // 偏移量
            mouseOffsetX = (mouseOffsetX + _.pageX - mouseOriginX) / 2

            // 鼠标移出浏览器时，动画归位
            window.addEventListener('mouseout', e => {
                mouseOriginX = null, mouseOffsetX = 0
            })

        } else {
            mouseOriginX = null, mouseOffsetX = 0
        }

    })


    winResize()
    window.addEventListener('resize', () => {
        winResize()
    })


    // 页面大小变更时触发
    function winResize() {
        const gw = document.documentElement.clientWidth

        if (gw < canvasSize.w) {
            config.canvasScale = gw / canvasSize.w
            tempCanvas.imageSmoothingQuality = 'high'
            tempCanvas.lineWidth = 1
            if (config.canvasScale < 0.3) {
                config.canvasScale = 0.565
            } else if (config.canvasScale < 0.6) {
                config.canvasScale += 0.11
            }
        } else {
            config.canvasScale = 1
        }

        const w = config.canvasScale * canvasSize.w,
            h = config.canvasScale * canvasSize.h

        const widthOffset = gw - w

        if (widthOffset < 0) {
            wrapper.value.style.marginLeft = widthOffset / 2 + 'px'
        } else {
            wrapper.value.style.margin = '0 auto'
        }

        // console.log('浏览器内缩放', window.devicePixelRatio);

        // 画布大小更改
        banner.value.width = w
        banner.value.height = h

        wrapper.value.style.width = w + 'px'


    }
})

function videoNode(vidSrc, options = {}) {
    const video = document.createElement('video')
    document.body.append(video)

    video.src = vidSrc
    video.muted = true
    video.loop = true
    video.autoplay = true
    video.style.opacity = 0
    video.style.position = 'absolute'

    for (let k in options) {
        video[k] = options[k]
    }

    return video
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

html {
    background: #fff;
}

body {
    width: 100%;
    max-width: 2560px;
    margin: 0 auto;
    background: #ccc;
}

canvas {
    object-fit: cover;
    margin: 0 auto;
}
</style>

<style scoped lang="less">
#wrapper {
    position: relative;
    overflow: hidden;
}

#banner {
    // 对比度
    filter: contrast(115%);
}

#fps_display {
    position: absolute;
    top: .2rem;
    left: .2rem;
    padding: .2rem;
    background: #00000022;
    backdrop-filter: blur(.3rem);
    opacity: .86;

    span {
        filter: invert(100%);
        text-shadow: .02rem .02rem .06rem #f43333;
        /* mix-blend-mode: difference */
    }
}

#option_wrapper {

    padding: .5rem 1rem;
    width: 50%;
    min-width: 20rem;
    background: #00000011;
}
</style>
