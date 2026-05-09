<template>
    <div class="module-wrap">
        <div class="module-content"></div>
        <div class="module-ranking"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import config from '@/config/config'

interface ModuleWrapProps {
    rid: number,
    season_type: number
}

interface ModuleWrapData {
    title: string,
    bvid: string,
    pic: string,
    duration: number,
    owner: {
        mid: number,
        name: string
    },
    stat: {
        view: number,
        like: number
    }
}

interface RankingData {
    title: string,
    url: string,
}

const props = defineProps<ModuleWrapProps>()

const content = ref<ModuleWrapData[]>([])
const ranking = ref<RankingData[]>([])

onMounted(() => {
    fetch(config.api + `/api/channel?rid=${props.rid}`)
        .then(res => res.json())
        .then(data => {
            if (data.code) {
                console.error(data);
            } else {
                content.value = data.data.archives.map((item: any) => {
                    return {
                        title: item.title,
                        bvid: item.bvid,
                        pic: item.pic,
                        duration: item.duration,
                        owner: {
                            mid: item.owner.mid,
                            name: item.owner.name
                        },
                        stat: {
                            view: item.stat.view,
                        }
                    }
                })
            }

            // console.log(content.value);
        })

    // 无法直接获取普通视频排行榜，需要登录
    fetch(config.api + `/api/rank/channel?season_type=${props.season_type}`)
        .then(res => res.json())
        .then(data => {
            if (data.code) {
                console.error(data);
            } else {
                ranking.value = data.result.list.map((item: any, index: number) => {
                    if (index < 10) {
                        return {
                            title: item.title,
                            url: item.url
                        }
                    }
                }).filter((item: any) => item)
            }
        })
})

</script>

<style scoped lang="less">
.module-wrap {
    width: 100%;
    height: 450px;
    background: #eee;
    margin-bottom: 40px;
}
</style>