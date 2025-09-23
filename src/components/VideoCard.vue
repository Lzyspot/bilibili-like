<template>
    <div class="video-card">
        <a :href="'https://www.bilibili.com/video/' + bvid" target="_blank">
            <div class="info-box">
                <img :src="pic" alt="">
                <div class="info">
                    <p class="title" :title="title">{{ (title.length > 26 ? title.slice(0, 26) + '...' : title) }}</p>
                    <p class="up"><span class="bilifont"></span> {{ owner }}</p>
                    <p class="play">{{ (view > 10000) ? (view / 10000).toFixed(1) + '万' : view }}播放</p>
                </div>
            </div>
        </a>
    </div>
</template>

<script lang="ts">
export default {
    name: 'VideoCard',
    props: {
        title: {
            type: String,
            required: true
        },
        pic: {
            type: String,
            required: true
        },
        bvid: {
            type: String,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        view: {
            type: Number,
            required: true
        }
    }
}
</script>

<style scoped lang="less">
.video-card {
    // width: 100%;
    // height: 100%;
    width: 206px;
    height: 116px;

    .info-box {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .bilifont {
            margin-right: 5px;
        }

        .info,
        &::before {
            transition: all .3s;
        }

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 200%;
            // 黑白渐变，下面黑色，50%到透明
            background: linear-gradient(to top, #00000099 0%, #00000099 50%, transparent 75%);
        }

        &:hover {
            &::before {
                top: -100%;
            }


            // background: #00000099;
            .info {
                top: 12px;

                .title {
                    height: 36px;
                    text-overflow: clip;
                    white-space: normal;

                    overflow: visible;
                }
            }
        }

        .info {
            position: absolute;
            z-index: 1;
            width: 100%;
            top: 78px;
            left: 0px;
            transition: top 0.2s;
            padding: 10px;

            p {
                font-size: 14px;
                line-height: 18px;
                height: 18px;
                color: rgb(255, 255, 255);
                margin-bottom: 6px;
                font-weight: 500;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }


            .up,
            .play {
                font-size: 12px;
                color: rgb(224, 224, 224);
                margin-bottom: 3px;
            }
        }
    }
}
</style>