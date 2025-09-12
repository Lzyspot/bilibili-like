import express, { Request, Response } from "express";
import bodyParser, { json } from "body-parser";
import cors from "cors";

const app = express();
const port = 6600;

// 使用cors中间件允许跨域
app.use(cors());
// 使用body-parser中间件解析JSON请求体
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// GET
app.get("/api/rcmd", (req: Request, res: Response) => {
  // 生成随机uniq_id (11位数字)
  const randomUniqId = Math.floor(Math.random() * 100000000000)
    .toString()
    .padStart(11, "0");

  fetch(
    "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd" +
      jsonToQueryString({
        feed_version: req.query.feed_version || "V8", // 推荐feed版本，当前使用V8版本算法
        fresh_idx: req.query.fresh_idx || Date.now(), // 刷新索引，表示当前页面刷新次数
        web_location: "1430650", // 网页位置标识，用于追踪用户当前所在页面位置
        y_num: req.query.y_num || "5", // Y轴数量，可能表示纵向推荐内容数量
        fresh_type: req.query.fresh_type || "3", // 刷新类型，3可能表示特定的刷新模式
        fresh_idx_1h: req.query.fresh_idx_1h || "3", // 1小时内刷新索引，用于追踪1小时内刷新次数
        fetch_row: req.query.fetch_row || "1", // 获取行数，表示本次请求获取的数据行数
        brush: req.query.brush || "2", // 刷视频次数，用户刷新/切换内容的次数
        device: req.query.device || "win", // 设备类型，win表示Windows设备
        homepage_ver: req.query.homepage_ver || "1", // 首页版本号
        ps: req.query.ps || "10", // 每页项数(Page Size)，表示一次请求返回10条数据
        last_y_num: req.query.last_y_num || "5", // 上次Y轴数量，用于对比和计算
        screen: req.query.screen || "1920-975", // 屏幕分辨率，宽1920px高975px
        seo_info: req.query.seo_info || "", // SEO信息，搜索引擎优化相关信息
        last_showlist: req.query.last_showlist || "...", // 上次显示列表，记录之前已展示的内容ID列表，用于去重
        uniq_id: req.query.uniq_id || randomUniqId, // 唯一标识符，用户会话的唯一ID
        // w_rid: "5ca3b8d7526d8c758f903ae5a4109633", // 请求标识，用于验证请求合法性
        wts: Date.now() // 时间戳，Unix时间戳格式，用于防止请求重放攻击
      })
  )
    .then(data => data.json())
    .then(recmd => {
      res.send(recmd);
    });
});

/**
 * 搜索建议
 * term: 搜索词
 */
app.get("/api/search/suggest", (req: Request, res: Response) => {
  // 生成随机buvid (格式: XX+16位大写字母数字+infoc)
  const randomBuvid =
    "XX" +
    Array.from({ length: 16 }, () =>
      Math.random().toString(36).toUpperCase().charAt(2)
    ).join("") +
    "infoc";

  fetch(
    "https://s.search.bilibili.com/main/suggest" +
      jsonToQueryString({
        term: req.query.term || " ", // 搜索词：用户输入的搜索关键词
        rnd: req.query.rnd || "0.4939648475000452", // 随机数：用于防止缓存的随机值
        func: req.query.func || "suggest", // 功能类型：搜索建议功能
        tag_num: req.query.tag_num || "10", // 标签数量：最多返回10个标签建议
        suggest_type: req.query.suggest_type || "accurate", // 建议类型：精确匹配
        sub_type: req.query.sub_type || "tag", // 子类型：标签类型搜索
        main_ver: req.query.main_ver || "v1", // 主版本号：v1版本
        highlight: req.query.highlight || "", // 高亮：搜索关键词高亮设置（空表示默认）
        bangumi_acc_num: req.query.bangumi_acc_num || "1", // 番剧精确匹配数量：最多返回1个番剧精确匹配结果
        special_acc_num: req.query.special_acc_num || "1", // 专题精确匹配数量：最多返回1个专题精确匹配结果
        topic_acc_num: req.query.topic_acc_num || "1", // 话题精确匹配数量：最多返回1个话题精确匹配结果
        upuser_acc_num: req.query.upuser_acc_num || "3", // UP主精确匹配数量：最多返回3个UP主精确匹配结果
        special_num: req.query.special_num || "10", // 专题数量：最多返回10个专题建议
        bangumi_num: req.query.bangumi_num || "10", // 番剧数量：最多返回10个番剧建议
        upuser_num: req.query.upuser_num || "3", // UP主数量：最多返回3个UP主建议
        buvid: req.query.buvid || randomBuvid, // 浏览器唯一标识符
        spmid: req.query.spmid || "0", // 位置标识：来源页面标识
        web_location: req.query.web_location || "0.0", // 网页位置：具体页面位置信息
        userid: req.query.userid || "1" // 用户ID：当前用户的唯一标识
      })
  )
    .then(data => data.json())
    .then(suggest => {
      res.send(suggest);
    });
});

app.get("/api/search/default", (req: Request, res: Response) => {
  fetch(
    "https://api.bilibili.com/x/web-interface/wbi/search/default"
  )
    .then(data => data.json())
    .then(data => {
      res.send(data);
    })
});

// post
app.post("/api/get_bilibili_top_feed", (req: Request, res: Response) => {
  const { data } = req.body;

  res.send(data + " from server");
});

// json转get参数
function jsonToQueryString(json: any) {
  return (
    "?" +
    Object.keys(json)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(json[key]))
      .join("&")
  );
}
