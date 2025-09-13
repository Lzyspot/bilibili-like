// convertToBase64.js
const fs = require('fs');
const path = require('path');

function imageToBase64(filePath) {
    try {
        // 读取图片文件并转换为base64
        const imageData = fs.readFileSync(filePath);
        return imageData.toString('base64');
    } catch (error) {
        console.error(`读取文件 ${filePath} 失败:`, error);
        return null;
    }
}

// 图片文件路径
const flow1Path = path.resolve('./flow1.png');
const flow2Path = path.resolve('./flow2.png');

// 转换图片为base64
const flow1Base64 = imageToBase64(flow1Path);
const flow2Base64 = imageToBase64(flow2Path);

// 构造结果对象
const result = {
    flow1: flow1Base64 ? `data:image/png;base64,${flow1Base64}` : null,
    flow2: flow2Base64 ? `data:image/png;base64,${flow2Base64}` : null
};

// 保存到ret.json文件
try {
    fs.writeFileSync('./ret.json', JSON.stringify(result, null, 2));
    console.log('图片已成功转换为base64并保存到 ./ret.json');
} catch (error) {
    console.error('保存文件失败:', error);
}