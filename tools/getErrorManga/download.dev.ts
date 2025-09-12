const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

// 读取本地JSON文件
const jsonData = require("./error-manga-20250911.json");

// 创建图片保存目录
const imgDir = path.join(__dirname, "error-manga");
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 下载图片函数
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, (res: any) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        res.pipe(fileStream);
        fileStream.on("finish", () => {
          fileStream.close();
          console.log(`图片已保存: ${filepath}`);
          resolve();
        });
        fileStream.on("error", (err: any) => {
          console.error(`保存图片失败: ${filepath}`, err);
          reject(err);
        });
      } else {
        reject(new Error(`下载失败，状态码: ${res.statusCode}`));
      }
    });
    
    request.on("error", (err: any) => {
      console.error(`下载图片失败: ${url}`, err);
      reject(err);
    });
  });
}

// 处理图片URL，添加协议前缀
function processImageUrl(url: string): string {
  if (url.startsWith("//")) {
    return `https:${url}`;
  }
  return url;
}

// 下载所有图片
async function downloadAllImages() {
  const mangaList = jsonData.data.list;
  
  for (const manga of mangaList) {
    try {
      const imgUrl = processImageUrl(manga.data.img);
      const filename = path.basename(imgUrl);
      const filepath = path.join(imgDir, filename);
      
      // 检查文件是否已存在
      if (!fs.existsSync(filepath)) {
        await downloadImage(imgUrl, filepath);
      } else {
        console.log(`文件已存在，跳过: ${filepath}`);
      }
      
      // 添加延迟避免请求过于频繁
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`下载失败: ${manga.data.img}`, error);
    }
  }
  
  console.log("所有图片下载完成");
}

downloadAllImages();