// const fetch = require('node-fetch');
const { createCanvas, loadImage } = require('canvas');

// 根据文件URL推断MIME类型，默认为image/jpeg
function getMimeType(url) {
    const ext = url.split('.').pop().split(/\#|\?/)[0].toLowerCase();
    const map = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'bmp': 'image/bmp',
        'ico': 'image/x-icon'
    };
    return map[ext] || 'image/jpeg';
}

async function getImageBase64(url, targetWidth = 206, targetHeight = 116) {
    try {
        // 获取图片数据
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');

        const imgBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imgBuffer);
        const mime = getMimeType(url);

        // 加载图片并创建画布
        const img = await loadImage(buffer);
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');

        // 绘制缩小后的图片
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // 转换为Base64字符串
        const base64 = canvas.toDataURL(mime);

        console.log(base64); // 这里可以对base64做进一步处理或返回

    } catch (error) {
        console.error('Error processing image:', error);
    }
}
async function getImgBuffer(url, targetWidth = 206, targetHeight = 116) {
    try {
        // 获取图片数据
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch image');

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // 加载图片并创建画布
        const img = await loadImage(buffer);
        const canvas = createCanvas(targetWidth, targetHeight);
        const ctx = canvas.getContext('2d');

        // 绘制缩小后的图片
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        return canvas.toBuffer();

    } catch (error) {
        console.error('Error processing image:', error);
    }
}

// 图片URL
const imgUrl = 'http://i0.hdslb.com/bfs/archive/1230a01459df9c6edec82cadeb370ef41c966a9b.jpg';

// 调用函数
// getImageBase64(imgUrl);
// getImgBuffer(imgUrl);

// fetch('https://api.bilibili.com/x/web-show/res/loc?id=336&pf=0')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })

// channel
fetch("https://api.bilibili.com/x/kv-frontend/namespace/data?appKey=333.1339&nscode=10")
    .then(res => res.json()).then(data => console.log(data));


    