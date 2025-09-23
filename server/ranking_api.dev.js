const fs = require('fs');
const path = require('path');

const channel = [
    {
        "name": "动画",
        "rid": 1,
        "v2rid": 1005
    },
    {
        "name": "番剧",
        "rid": 33,
        "season_type": 1
    },
    {
        "name": "国创",
        "rid": 167,
        "season_type": 4
    },
    // {
    //     "name": "漫画",
    //     "rid": 171
    // },
    {
        "name": "音乐",
        "rid": 3,
        "v2rid": 1003
    },
    // {
    //     "name": "舞蹈",
    //     "rid": 20
    // },
    {
        "name": "游戏",
        "rid": 4,
        "v2rid": 1008
    },
    {
        "name": "知识",
        "rid": 36,
        "v2rid": 1010
    },
    {
        "name": "数码",
        "rid": 188,
        "v2rid": 1012
    },
    // {
    //     "name": "生活",
    //     "rid": 160
    // },
    {
        "name": "鬼畜",
        "rid": 119,
        "v2rid": 1007
    },
    {
        "name": "时尚",
        "rid": 155,
        "v2rid": 1014
    },
    // {
    //     "name": "资讯",
    //     "rid": 204
    // },
    {
        "name": "娱乐",
        "rid": 5,
        "v2rid": 1002
    },
    // {
    /* 专栏不再有排行榜 */
    //     "name": "专栏",
    //     "rid": 37
    // },
    {
        "name": "电影",
        "rid": 23,
        "season_type": 2
    },
    {
        "name": "TV剧",
        "rid": 11,
        "season_type": 5
    },
    {
        "name": "影视",
        "rid": 181,
        "v2rid": 1001
    },
    {
        "name": "纪录片",
        "rid": 177,
        "season_type": 3
    }
]

const finChannel = [
    {
        "name": "番剧",
        "rid": 33,
        "season_type": 1
    },
    {
        "name": "国创",
        "rid": 167,
        "season_type": 4
    },
    {
        "name": "电影",
        "rid": 23,
        "season_type": 2
    },
    {
        "name": "TV剧",
        "rid": 11,
        "season_type": 5
    },
    {
        "name": "纪录片",
        "rid": 177,
        "season_type": 3
    }
]

/* fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=' + channel[1].rid)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    })

// https://api.bilibili.com/pgc/web/rank/list?day=3&season_type=1&web_location=0.0&w_rid=a908bd4e04cebcaa3f1006a1989cf360&wts=1758607222

fetch('https://api.bilibili.com/pgc/web/rank/list?day=3&season_type=' + channel[1].season_type)
    .then(res => res.json())
    .then(data => {
        console.log(data);
    }) */

// console.log('https://api.bilibili.com/x/web-interface/ranking/v2?type=all&rid=' + channel[0].v2rid);

// v2接口需要用户登录
// fetch('https://api.bilibili.com/x/web-interface/ranking/v2?type=all&rid=1003')
//     .then(res => res.json())
//     .then(data => {
//         console.log(data);
//     })




// 获取全部rid
/* let rid = 0
let regions = {}
async function getRegion() {
    if (rid > 280) return

    try {
        const res = await fetch('https://api.bilibili.com/x/web-interface/dynamic/region?rid=' + rid)
        const data = await res.json()

        if (data.code === 0) {
            regions[rid] = data.data.archives[0].tname
        }
    } catch (error) {
        console.error(error)
    } finally {
        if (rid++ % 10 === 0) console.log(regions, rid)
    }

    await new Promise(resolve => setTimeout(resolve, 400))
    await getRegion()
}


getRegion()
    .then(() => {
        fs.writeFile(path.join(__dirname, './json/regions.json'), JSON.stringify(regions, null, 2), (err) => {
            if (err) {
                console.error('写入文件时出错:', err);
            } else {
                console.log('文件已成功写入');
            }
        });
    }) */

fetch("https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&type=all&web_location=0.0&w_rid=ede1ff50da4515edcb31bf61378fa2d2&wts=1758620485", {
  "headers": {
    "accept": "*/*",
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "cache-control": "no-cache",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"140\", \"Not=A?Brand\";v=\"24\", \"Microsoft Edge\";v=\"140\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "cookie": "buvid3=AB7C82A8-DF46-86D7-EC6E-062148B4CB1C19969infoc; b_nut=1755631819; _uuid=726F29BD-69FB-D110A-10B7C-D98BD1E381FD18124infoc; enable_web_push=DISABLE; buvid4=393F5162-0986-CD8C-821D-F6F4CD3F64EF46310-022093016-TDIcPGmL6%252BDgjShWhnewXw%253D%253D; SESSDATA=2cb4e5cb%2C1771183863%2C83b72%2A81CjCknCFGtd7pchoLYsk6ftpPwKstXHuT_j7ZvJ3PlodJObECz314o77QUDaQH39wvGcSVmRGTURHUHpKcENZSmwtOENPLUFiUXlsNE1ybjZONjRnZzFnaW52blJkQkdIODZLVGROV3NyZDZxSTZuSzFfaUJvSmxJbmNtQ2hiN2FYX3E1SFFMdWVBIIEC; bili_jct=5b001d426ee8cc649acc5ac55709ed21; DedeUserID=396909711; DedeUserID__ckMd5=04c435fbd1a84e31; sid=8q5e2akf; theme-tip-show=SHOWED; CURRENT_QUALITY=120; rpdid=|(J|)k))mm)~0J'u~llYJu)mm; theme-avatar-tip-show=SHOWED; LIVE_BUVID=AUTO1517568600548271; opus-goback=1; hit-dyn-v2=1; PVID=2; fingerprint=c9a0205fdd86575763575dff6f926cdf; buvid_fp_plain=undefined; buvid_fp=c9a0205fdd86575763575dff6f926cdf; INTVER=1; _ga=GA1.1.1351511088.1758214417; _ga_HE7QWR90TV=GS2.1.s1758214417$o1$g0$t1758214417$j60$l0$h0; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NTg3MjE0MjUsImlhdCI6MTc1ODQ2MjE2NSwicGx0IjotMX0.1fGoEDPIBV8gL5KgZ51g-dgKBuYP4eyIrCKd2EfvHJU; bili_ticket_expires=1758721365; timeMachine=0; home_feed_column=5; browser_resolution=1920-975; b_lsid=A101817C4_19975B9AA46; bp_t_offset_396909711=1115748876192579584; CURRENT_FNVAL=4048",
    "Referer": "https://www.bilibili.com/v/popular/rank/all"
  },
  "body": null,
  "method": "GET"
}).then(res => res.json())
    .then(data => console.log(data))