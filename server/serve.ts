import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 6600;

// 使用cors中间件允许跨域
app.use(cors());
// 使用body-parser中间件解析JSON请求体
app.use(bodyParser.json());

app.get("/api/rcmd", (req: Request, res: Response) => {
  fetch("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd")
    .then((data) => data.json())
    .then((recmd) => {
      res.send(recmd);
    })
});

app.post("/api/get_bilibili_top_feed", (req: Request, res: Response) => {
  const { data } = req.body;

  res.send(data + " from server");
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// fetch("https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd")
//   .then((res: Response) => res.json())
//   .then((res: Object) => {
//     console.log("推荐数据", res);
//   });
