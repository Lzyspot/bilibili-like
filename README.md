# BiliBili Like 开发说明

[toc]





## URL参数

Banner类型

```
?bannerAutoSwitch=interactive | animation | image | promotion
```

自动切换Banner

```
?bannerAutoSwitch=true
?bannerAutoSwitchInterval=5000
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




