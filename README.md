# BiliBili Like 开发说明

[toc]

## 部署

```bash
git clone git@gitee.com:Lzyspot/bilibili-like.git
cd bilibili-like
npm i
```

> 启动

```bah
npm run dev
```

> 如果需要后端

```bash
ts-node server\serve.ts
```



## URL参数

##### Banner类型

```
?bannerType=interactive | animation | image | promotion
```

##### 自动切换Banner

```
?bannerAutoSwitch=true
?bannerAutoSwitchInterval=5000
```



##### 权重最高，如果有该参数，则其它参数全部失效

```
?bannerDate=20260109
```



```ts
const params = new URLSearchParams(location.search)
const banner = this.$refs.bannerRef as HTMLElement

let bannerDate = params.get('bannerDate')
if (bannerDate) {
    let { mediaResources } = await mediaImportSet['banner_' + bannerDate]()
    console.log('banner_' + bannerDate);

    this.layers = this.initBanner(mediaResources, banner)
} else {
    // banner类型
    // ?bannerType=interactive | animation | image | promotion
    let bannerType: any = params.get('bannerType')
    bannerType = mediaSet[bannerType] ? bannerType : 'interactive'
    let { mediaResources } = await mediaSet[bannerType][Math.floor(Math.random() * mediaSet[bannerType].length)]()

    // 渲染所有元素
    this.layers = this.initBanner(mediaResources, banner)

    // 自动切换Banner
    // ?bannerAutoSwitch=true
    // ?bannerAutoSwitchInterval=5000
    let bannerAutoSwitch = params.get('bannerAutoSwitch')
    let bannerSwitchInterval = Number(params.get('bannerAutoSwitchInterval'))

    if (bannerAutoSwitch && !bannerSwitchInterval) {
        bannerSwitchInterval = 3000
    }

    if (bannerSwitchInterval) {
        // 至少5s切换一次
        bannerSwitchInterval = bannerSwitchInterval >= 5000 ? bannerSwitchInterval : 5000

        setInterval(async () => {
            const { mediaResources } = await mediaSet[bannerType][Math.floor(Math.random() * mediaSet[bannerType].length)]()
            this.layers = this.initBanner(mediaResources, banner)
        }, bannerSwitchInterval)
    }
}
```



## 获取Banner数据，及实现视差滚动

**复制**并在浏览器**执行**以下文件的代码内容

```
tools\getBanner\get.dev.auto.js
```

执行完成会在**控制台**返回



秉持着 `all in one` 的原则，返回的是包含元素`加速度数据`并将其转为`base64`后的数据包，目前全部存放于以下路径

```
src\assets\bannerMediaResources
```

命名随意，通常是`mediaResources`+该banner最早的日期

> 标准可交互视差banner数据格式

```json
const mediaResources = {
    content: [
    	"从浏览器获取到的数据"
	],
    config: (globalConfig: any) => {
        globalConfig.style.bannerHeight = 180
    },
    version: '1.0'
}

export { mediaResources };
```

更新后还需在 `mediaImportSet` 中添加该脚本路径，并在 `mediaSet` 对应的对象中注册后即可使用

```
src\components\MainPage\Banner.vue
```







## 参考

> 参考主页面

![image-20250915195323401](README.assets/image-20250915195323401.png)

![image-20250915195235547](README.assets/image-20250915195235547.png)

![image-20250915195300701](README.assets/image-20250915195300701.png)



> 参考播放页面





## 更新进度

### 2025/09/18

-  加载时
  - 随机切换支持 **视差移动** 的 `banner`
  - 由于b站的跨域策略，无法直接在前端获取b站的api，因此需要后端起到中转作用
    - 不能过于频繁地向b站请求数据，因此后端有设置请求间隔限制
    - b站的图片同样不允许跨域，因此所有的图片实际是由前端向后端发送GET请求后得到的缩放图像(206*116)
  - 使用中
    - 

![image-20250918214348114](README.assets/image-20250918214348114.png)



