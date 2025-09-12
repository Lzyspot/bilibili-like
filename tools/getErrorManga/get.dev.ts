const fs = require("fs");
const path = require("path");

fetch("https://www.bilibili.com/activity/web/view/data/31")
  .then(data => data.json())
  .then(res => {
    // 获取当前日期并格式化为 yyyymmdd
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const dateString = `${year}${month}${day}`;

    // 创建文件名
    const filename = `error-manga-${dateString}.json`;

    // 将res转换为JSON字符串
    const jsonData = JSON.stringify(res, null, 2);

    // 确保目录存在
    const dir = path.join(__dirname);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(path.join(__dirname, filename), jsonData);
    console.log(`文件已保存: ${filename}`);
  });
