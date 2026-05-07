import type { MediaResource, MediaPackage, BannerPackage } from '@/struct/struct'

const mediaImportSet: { [key: string]: () => Promise<any> } = {
    // 视差滚动
    banner_20201130: () => import('@/assets/bannerMediaResources/mediaResources_20201130'), // 微观世界 双向

    banner_20210301: () => import('@/assets/bannerMediaResources/mediaResources_20210301'), // 【未完成】雪中小屋 长画幅 canvas
    banner_20210401: () => import('@/assets/bannerMediaResources/mediaResources_20210401'), // 【未完成】落花郊游 长画幅 canvas

    banner_20230405: () => import('@/assets/bannerMediaResources/mediaResources_20230405'), // 树叶风车 双向 *2
    banner_20230601: () => import('@/assets/bannerMediaResources/mediaResources_20230601'), // 篝火
    banner_20230703: () => import('@/assets/bannerMediaResources/mediaResources_20230703'), // 洞窟表演
    banner_20230801: () => import('@/assets/bannerMediaResources/mediaResources_20230801'), // 海底世界
    banner_20230912: () => import('@/assets/bannerMediaResources/mediaResources_20230912'), // 鳄鱼 双向
    banner_20231002: () => import('@/assets/bannerMediaResources/mediaResources_20231002'), // 荧光河道
    banner_20231107: () => import('@/assets/bannerMediaResources/mediaResources_20231107'), // 黄昏收获
    banner_20231201: () => import('@/assets/bannerMediaResources/mediaResources_20231201'), // 追叶33
    banner_20231212: () => import('@/assets/bannerMediaResources/mediaResources_20231212'), // 冰湖雪人

    banner_20240204: () => import('@/assets/bannerMediaResources/mediaResources_20240204'), // 包饺砸
    banner_20240606: () => import('@/assets/bannerMediaResources/mediaResources_20240606'), // 百花齐放
    banner_20240610: () => import('@/assets/bannerMediaResources/mediaResources_20240610'), // 海中大厅
    banner_20241210: () => import('@/assets/bannerMediaResources/mediaResources_20241210'), // 魔法扫帚

    banner_20250101: () => import('@/assets/bannerMediaResources/mediaResources_20250101'), // 雪山滑雪
    banner_20250501: () => import('@/assets/bannerMediaResources/mediaResources_20250501'), // 城外草原
    banner_20250801: () => import('@/assets/bannerMediaResources/mediaResources_20250801'), // 洪涝购物
    banner_20250909: () => import('@/assets/bannerMediaResources/mediaResources_20250909'), // 流星海滩
    banner_20260109: () => import('@/assets/bannerMediaResources/mediaResources_20260109'), // 下雪车站
    banner_20260426: () => import('@/assets/bannerMediaResources/mediaResources_20260426'), // 御燕飞行

    // 特殊
    banner_20220723: () => import('@/assets/bannerMediaResources/mediaResources_20220723'), // 【未完成】唯一强交互

    // 视频
    banner_20210806: () => import('@/assets/bannerMediaResources/mediaResources_20210806'), // 窗边的2233 区分时间（目前随机） *6
    banner_20210906: () => import('@/assets/bannerMediaResources/mediaResources_20210906'), // 秋日蛋糕 区分时间 *2
    banner_20220106: () => import('@/assets/bannerMediaResources/mediaResources_20220106'), // 极地钓鱼 区分时间 *3
    banner_20220501: () => import('@/assets/bannerMediaResources/mediaResources_20220501'), // 【有彩蛋】四叶草上的2233
    banner_20220816: () => import('@/assets/bannerMediaResources/mediaResources_20220816'), // 2233十周年

    banner_2014: () => import('@/assets/bannerMediaResources/mediaResources_2014'), // 2014合集
    banner_2015: () => import('@/assets/bannerMediaResources/mediaResources_2015'), // 2015合集
    banner_2016: () => import('@/assets/bannerMediaResources/mediaResources_2016'), // 2016合集
    banner_legacy: () => import('@/assets/bannerMediaResources/mediaResources_legacy'), // 早期默认
    banner_20190601: () => import('@/assets/bannerMediaResources/mediaResources_20190601'), // 夏日高铁站
    banner_20190520: () => import('@/assets/bannerMediaResources/mediaResources_20190520'), // 520特供
    banner_20191029: () => import('@/assets/bannerMediaResources/mediaResources_20191029'), // 南瓜热气球
    banner_20190620: () => import('@/assets/bannerMediaResources/mediaResources_20190620'), // 哔哩哔哩十周年
    banner_20200124: () => import('@/assets/bannerMediaResources/mediaResources_20200124'), // 拜年祭
    banner_20200201: () => import('@/assets/bannerMediaResources/mediaResources_20200201'), // 极地2233
    banner_20200401: () => import('@/assets/bannerMediaResources/mediaResources_20200401'), // 搬运花朵
    banner_20200607: () => import('@/assets/bannerMediaResources/mediaResources_20200607'), // 荷塘泳池
    banner_20200817: () => import('@/assets/bannerMediaResources/mediaResources_20200817'), // 2233生日
    banner_20220927: () => import('@/assets/bannerMediaResources/mediaResources_20220927'), // 枫叶林收音
    banner_20230101: () => import('@/assets/bannerMediaResources/mediaResources_20230101'), // 趴桌睡觉
    // banner_20230620: () => import('@/assets/bannerMediaResources/mediaResources_20230620'), // 篝火静态版本
    banner_20260507: () => import('@/assets/bannerMediaResources/mediaResources_20260507'), // 御燕飞行

    banner_20190621: () => import('@/assets/bannerMediaResources/mediaResources_20190621'), // 十周年活动
    banner_20200421: () => import('@/assets/bannerMediaResources/mediaResources_20200421'), // 读书日
    banner_20200605: () => import('@/assets/bannerMediaResources/mediaResources_20200605'), // 知识区
    banner_20200710: () => import('@/assets/bannerMediaResources/mediaResources_20200710'), // 高考加油
    banner_20210212: () => import('@/assets/bannerMediaResources/mediaResources_20210212'), // 拜年祭
    banner_20210722: () => import('@/assets/bannerMediaResources/mediaResources_20210722'), // 河南加油
    banner_20221221: () => import('@/assets/bannerMediaResources/mediaResources_20221221'), // 足球派对，一起亁杯
    banner_20211113: () => import('@/assets/bannerMediaResources/mediaResources_20211113'), // 年度弹幕
    banner_20220201: () => import('@/assets/bannerMediaResources/mediaResources_20220201'), // 放飞许愿灯
    banner_20220401: () => import('@/assets/bannerMediaResources/mediaResources_20220401'), // 哔哩日报
    banner_20220602: () => import('@/assets/bannerMediaResources/mediaResources_20220602'), // 碧蓝
    banner_20220614: () => import('@/assets/bannerMediaResources/mediaResources_20220614'), // 毕业季
    banner_20220720: () => import('@/assets/bannerMediaResources/mediaResources_20220720'), // 抵制网暴
    banner_20230315: () => import('@/assets/bannerMediaResources/mediaResources_20230315'), // 环境整治海报
    banner_20230622: () => import('@/assets/bannerMediaResources/mediaResources_20230622'), // 周年庆
    banner_20190924: () => import('@/assets/bannerMediaResources/mediaResources_20190924'), // 新中国成立70周年
    banner_20191213: () => import('@/assets/bannerMediaResources/mediaResources_20191213'), // 国家公祭日
    banner_20201005: () => import('@/assets/bannerMediaResources/mediaResources_20201005'), // 国庆
    banner_20210304: () => import('@/assets/bannerMediaResources/mediaResources_20210304'), // 十三届全国人大
    banner_20210623: () => import('@/assets/bannerMediaResources/mediaResources_20210623'), // 中国中产党成立100周年
    banner_20220303: () => import('@/assets/bannerMediaResources/mediaResources_20220303'), // 国庆
    banner_20221030: () => import('@/assets/bannerMediaResources/mediaResources_20221030'), // 国庆
    banner_黄绿合战: () => import('@/assets/bannerMediaResources/mediaResources_黄绿合战'),
}

const mediaSet: { [key: string]: Array<() => Promise<any>> } = {
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
        mediaImportSet.banner_20260109,
        mediaImportSet.banner_20260426,
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
        // mediaImportSet.banner_20230620,
        mediaImportSet.banner_20260507,
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

const convert2MediaPackage = (data: MediaResource[] | BannerPackage): BannerPackage => {
    let id: string
    if (!('version' in data)) {
        id = `${data.length}${data[0].src}${data[data.length - 1].src}`
        return {
            content: data,
            version: '1.1',
            id: id
        }
    }

    // @ts-ignore
    if (data.version == '1.0') {
        data.id = `${data.content.length}${data.content[0].src}${data.content[data.content.length - 1].src}`
        data.version = '1.1'
        return data
    }

    return data as BannerPackage;

}

function getBannerData(banner: string | null, type?: string): Promise<BannerPackage> {
    // 将所有MediaResource[]类型的bannerData改为MediaPackage类型，包含content和version
    return new Promise((resolve, reject) => {
        const loadModule = (module: () => Promise<any>) => {
            module().then(({ mediaResources }) => {
                const ret = convert2MediaPackage(mediaResources)
                console.log(ret)
                resolve(ret)
            }).catch((error) => {
                console.error('banner数据加载失败！:', error);
                reject(error);
            })
        }

        if (type || (!banner && !type)) {
            // if (!type || !Object.keys(mediaSet).includes(type)) type = Object.keys(mediaSet)[0]
            if (!type || !Object.keys(mediaSet).includes(type)) type = Object.keys(mediaSet)[Math.floor(Math.random() * Object.keys(mediaSet).length)]

            loadModule(mediaSet[type][Math.floor(Math.random() * mediaSet[type].length)])
        } else if (banner && Object.keys(mediaImportSet).includes(banner)) {

            loadModule(mediaImportSet[banner])
        } else {
            reject(new Error('无效的banner或类型'))
        }
    })
}

export { getBannerData }