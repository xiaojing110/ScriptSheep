/*
店铺签到，有新的店铺直接添加token即可
可设置变量DPSTOKEN='A&B&C'
或DPSTOKEN="A
B
C"
优先使用变量token，没有则使用内置token
每日最多签到22家店铺，超出失败
更新日期:2023-8-21 fix
cron 3 0,23 * * * jd_dpsign.js, tag=店铺签到
*/

var token = [//内置token
    //"72486155DE9716BB143C16A41C96EF26",
    //"4C82289AE45A4CC696232B7A4AF282D3",
    //"CA9FEDDCABD4DA31223441563C163B47",
    //"E00B0DC7738C5662F745A7BC6D137B97",
    //"776D3DAAD242B860E89DF11077F82169",
    //"F95A1A59A36015BE04EE37236DB6CE87",
    //"33D71DB237DA8C9D84DC3B34F74AAC07",
    //"E969CCB6A0DF9392A021E3D604D892A2",
    //"D4A243F51F645969EF77A35C93F686A5",
    //"445AF0A22B42AFE6D6ABADDE2FD161C2",
    //"43B0F3550B339D30B1DC1B85198F5871",
    //"710F970D2C9D83AE4547C6CD97754DCB",
    //"264D069FBD411345AC26F8173FB9ABDB",
]

const $ = new Env('店铺签到');
const _0xd09a1c = $.isNode() ? require("./sendNotify") : "";
const _0x5f4585 = $.isNode() ? require("./jdCookie") : "";
const _0x3e6943 = require("child_process").execSync;
const _0x3ef1af = require("./function/dylany");
const _0x343fa3 = require("fs");
let _0x2e6e62 = [];
let _0x4d4b08 = "";
let _0x4fdae9;
let _0x4c4f3f = 0;
let _0x3d3eba = [];
const _0x505f80 = "https://api.m.jd.com/api?appid=interCenter_shopSign";
$.activityId = "";
$.venderId = "";
$.activityEnd = false;
if ($.isNode()) {
    Object.keys(_0x5f4585).forEach(_0xa5ee79 => {
        _0x2e6e62.push(_0x5f4585[_0xa5ee79]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    let _0x2b0545 = $.getdata("CookiesJD") || "[]";
    _0x2b0545 = _0x17cd2d(_0x2b0545);
    _0x2e6e62 = _0x2b0545.map(_0x4a686b => _0x4a686b.cookie);
    _0x2e6e62.reverse();
    _0x2e6e62.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
    _0x2e6e62.reverse();
    _0x2e6e62 = _0x2e6e62.filter(_0x58d074 => _0x58d074 !== "" && _0x58d074 !== null && _0x58d074 !== undefined);
}
let _0x1c57f9 = [];
let _0x3042b3 = [];
let _0x357772 = 0;
if (process.env.DPSTOKEN) {
    if (process.env.DPSTOKEN.indexOf("\n") > -1 || process.env.DPSTOKEN.indexOf("&") > -1) {
        _0x1c57f9 = process.env.DPSTOKEN.split(/[&\n]/);
    } else {
        _0x1c57f9.push(process.env.DPSTOKEN);
    }
    token = _0x1c57f9;
}
const _0x48d1e3 = require("./USER_AGENTS");
let _0x19fd03 = _0x343fa3.existsSync("/ql/data/config") ? "/ql/data/config/config.sh" : "/ql/config/config.sh";
!(async () => {
    if (!_0x2e6e62[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    $.TokenLists = [];
    $.TokenLists.push(...token);
    $.TokenLists = [...new Set($.TokenLists)].filter(_0xb037d0 => !!_0xb037d0 && _0xb037d0.length === 32);
    if ($.TokenLists.length === 0) {
        console.log("无店铺签到token，退出！");
        return;
    } else {
        console.log("共" + $.TokenLists.length + "个店铺，开始签到...");
    }
    ;
    for (let _0x504a2d = 0; _0x504a2d < _0x2e6e62.length; _0x504a2d++) {
        if (_0x2e6e62[_0x504a2d]) {
            _0x4d4b08 = _0x2e6e62[_0x504a2d];
            $.UserName = decodeURIComponent(_0x4d4b08.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4d4b08.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x504a2d + 1;
            $.isLogin = true;
            $.nickName = "";
            _0x4fdae9 = "";
            if ($.TokenLists.length == 0) {
                break;
            }
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                if ($.isNode()) {
                    await _0xd09a1c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }
                continue;
            }
            $.UA = _0x48d1e3.UARAM ? _0x48d1e3.UARAM() : _0x48d1e3.USER_AGENT;
            await _0x38fd64();
            await $.wait(1000);
            try {
                if ($.index === 1 && _0x1c57f9.length !== 0) {
                    _0x357772 = _0x3042b3.length;
                    for (let _0x18916f of _0x3042b3) {
                        $.TokenLists = $.TokenLists.filter(_0x26f5d6 => _0x26f5d6 != _0x18916f);
                        _0x3e6943("sed -i \"s!" + _0x18916f + "!!g\" " + _0x19fd03);
                    }
                }
            } catch (_0x212536) { }
        }
    }
    console.log("\n" + (_0x357772 > 0 ? _0x357772 + "个失效token，变量已移除" : ""));
})().catch(_0x485705 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x485705 + "!", "");
}).finally(() => {
    $.done();
});
async function _0x38fd64() {
    for (var _0x4aa76f = 0; _0x4aa76f < $.TokenLists.length; _0x4aa76f++) {
        console.log("店铺->" + (_0x4aa76f + 1) + ":" + $.TokenLists[_0x4aa76f]);
        _0x4c4f3f = 0;
        if ($.index == 1) {
            _0x3d3eba[$.TokenLists[_0x4aa76f]] = {};
            await _0xfaa120($.TokenLists[_0x4aa76f]);
            if (_0x3d3eba[$.TokenLists[_0x4aa76f]].vid == "") {
                continue;
            }
            await _0x4e326d($.venderId);
        }
        if (_0x3d3eba[$.TokenLists[_0x4aa76f]].vid == "") {
            continue;
        }
        await _0xacf2c7($.TokenLists[_0x4aa76f], _0x3d3eba[$.TokenLists[_0x4aa76f]].vid, _0x3d3eba[$.TokenLists[_0x4aa76f]].aid);
        await $.wait(500);
        await _0x4b0250($.TokenLists[_0x4aa76f], _0x3d3eba[$.TokenLists[_0x4aa76f]].vid);
    }
}
async function _0xfaa120(_0x228fee) {
    const _0x27fc34 = {
        token: "" + _0x228fee,
        venderId: ""
    };
    let _0x33a0cc = _0x27fc34;
    const _0x347f9 = {
        appId: "4da33"
    };
    _0x347f9.appId = "4da33";
    _0x347f9.fn = "interact_center_shopSign_getActivityInfo";
    _0x347f9.body = _0x33a0cc;
    _0x347f9.apid = "interCenter_shopSign";
    _0x347f9.ver = "11.6.5";
    _0x347f9.cl = "android";
    _0x347f9.user = $.UserName;
    _0x347f9.code = 1;
    _0x347f9.ua = $.UA;
    let _0xae819c = _0x347f9;
    _0x33a0cc = await _0x3ef1af.getbody(_0xae819c);
    return new Promise(_0x31bd7e => {
        const _0x1e9de3 = {
            accept: "*/*",
            ["accept-encoding"]: "gzip, deflate, br",
            ["accept-language"]: "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            cookie: _0x4d4b08,
            referer: "https://h5.m.jd.com/",
            ["User-Agent"]: $.UA
        };
        const _0x25258b = {
            url: "https://api.m.jd.com/api?loginType=2&" + _0x33a0cc,
            headers: _0x1e9de3
        };
        const _0x1bb1bd = _0x25258b;
        $.get(_0x1bb1bd, (_0x48c4cc, _0x565b5b, _0xa9a946) => {
            try {
                if (_0x48c4cc) {
                    console.log("查询店铺API请求失败‼️");
                    console.log(_0x48c4cc);
                } else {
                    _0xa9a946 = JSON.parse(_0xa9a946);
                    if (_0xa9a946.code == 402) {
                        _0x3d3eba[_0x228fee].vid = "";
                        console.log("活动已失效");
                        $.activityEnd = true;
                        _0x3042b3.push(_0x228fee);
                    } else {
                        $.venderId = _0xa9a946.data.venderId;
                        $.activityId = _0xa9a946.data.id;
                        _0x3d3eba[_0x228fee].vid = $.venderId;
                        _0x3d3eba[_0x228fee].aid = $.activityId;
                        let _0x4606b1 = _0xa9a946.data.startTime;
                        let _0x406922 = _0xa9a946.data.endTime;
                        console.log("开始时间：" + _0x128011(new Date(parseInt(_0x4606b1))) + "\n结束时间：" + _0x128011(new Date(parseInt(_0x406922))));
                        let _0xc66f4c = "";
                        for (let _0x241c37 = 0; _0x241c37 < _0xa9a946.data.continuePrizeRuleList.length; _0x241c37++) {
                            const _0x3c7cee = _0xa9a946.data.continuePrizeRuleList[_0x241c37].level;
                            for (let _0x23e05c of _0xa9a946.data.continuePrizeRuleList[_0x241c37].prizeList) {
                                if (_0x23e05c.type == 4) {
                                    if (_0x241c37 != _0xa9a946.data.continuePrizeRuleList.length - 1) {
                                        _0xc66f4c += _0x3c7cee + "天" + _0x23e05c.discount + "豆" + _0x23e05c.number + "份|";
                                    } else {
                                        _0xc66f4c += _0x3c7cee + "天" + _0x23e05c.discount + "豆" + _0x23e05c.number + "份";
                                    }
                                } else if (_0x23e05c.type == 14) {
                                    if (_0x241c37 != _0xa9a946.data.continuePrizeRuleList.length - 1) {
                                        _0xc66f4c += _0x3c7cee + "天" + _0x23e05c.discount / 100 + "红包" + _0x23e05c.number + "份|";
                                    } else {
                                        _0xc66f4c += _0x3c7cee + "天" + _0x23e05c.discount / 100 + "红包" + _0x23e05c.number + "份";
                                    }
                                } else { }
                            }
                        }
                        if (!_0xc66f4c) {
                            _0xc66f4c = "无豆无红包，积分优惠券！";
                        }
                        console.log("奖品：" + _0xc66f4c);
                    }
                }
            } catch (_0x5ea5b2) {
                $.logErr(_0x5ea5b2, _0x565b5b);
            } finally {
                _0x31bd7e(_0xa9a946);
            }
        });
    });
}
async function _0x4e326d(_0x322d2a) {
    return new Promise(_0x243eca => {
        const _0x4d870a = {
            url: "https://api.m.jd.com/client.action?functionId=whx_getMShopDetail&body=%7B%22venderId%22%3A%22" + _0x322d2a + "%22%2C%22stamp%22%3A%221%22%2C%22%24taroTimestamp%22%3A" + new Date().valueOf() + "%2C%22source%22%3A%22m-shop%22%7D&t=" + new Date().valueOf() + "&appid=shop_view&clientVersion=11.0.0&client=wh5&area=1_72_2799_0&uuid=16630119447091257705224",
            headers: {
                accept: "*/*",
                "accept-language": "zh-CN,zh;q=0.9",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                Referer: "https://shop.m.jd.com/",
                "User-Agent": $.UA
            }
        };
        $.get(_0x4d870a, (_0x1a37b8, _0x201cc0, _0x2a6c62) => {
            try {
                if (_0x1a37b8) {
                    console.log("查询店铺名称API请求失败‼️");
                    console.log(_0x1a37b8);
                } else {
                    _0x2a6c62 = JSON.parse(_0x2a6c62);
                    let _0x113528 = _0x2a6c62.data.shopBaseInfo.shopName;
                    console.log("店铺名称：" + _0x113528 + "\n店铺链接：https://shop.m.jd.com/?venderId=" + _0x322d2a);
                    _0x4fdae9 += "【" + _0x113528 + "】";
                }
            } catch (_0x54b186) {
                $.logErr(_0x54b186, _0x201cc0);
            } finally {
                _0x243eca(_0x2a6c62);
            }
        });
    });
}
async function _0xdd0219(_0x3b04df, _0x557830) {
    return new Promise(_0x5692b5 => {
        const _0x54c150 = {
            url: _0x505f80 + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getActivityInfo&body={%22token%22:%22" + _0x3b04df + "%22,%22venderId%22:" + _0x557830 + "}&jsonp=jsonp1005",
            headers: {
                accept: "accept",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                cookie: _0x4d4b08,
                referer: "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x3b04df + "&sceneval=2",
                "User-Agent": $.UA
            }
        };
        $.get(_0x54c150, (_0x261ea8, _0x501c3b, _0x5c5d71) => {
            try {
                if (_0x261ea8) {
                    console.log("查询活动信息API请求失败‼️");
                    console.log(_0x261ea8);
                } else {
                    _0x5c5d71 = JSON.parse(/{(.*)}/g.exec(_0x5c5d71)[0]);
                    $.activityId = _0x5c5d71.data.id;
                    let _0x4d8696 = _0x5c5d71.data.startTime;
                    let _0x1bc0bd = _0x5c5d71.data.endTime;
                    if ($.index == 1) {
                        console.log("开始时间：" + new Date(parseInt(_0x4d8696)).toLocaleString() + "\n结束时间：" + new Date(parseInt(_0x1bc0bd)).toLocaleString());
                        let _0x5edf95 = "";
                        for (let _0x534954 = 0; _0x534954 < _0x5c5d71.data.continuePrizeRuleList.length; _0x534954++) {
                            const _0x1f7513 = _0x5c5d71.data.continuePrizeRuleList[_0x534954].level;
                            for (let _0x522fb7 of _0x5c5d71.data.continuePrizeRuleList[_0x534954].prizeList) {
                                if (_0x522fb7.type == 4) {
                                    if (_0x534954 != _0x5c5d71.data.continuePrizeRuleList.length - 1) {
                                        _0x5edf95 += _0x1f7513 + "天" + _0x522fb7.discount + "豆" + _0x522fb7.number + "份|";
                                    } else {
                                        _0x5edf95 += _0x1f7513 + "天" + _0x522fb7.discount + "豆" + _0x522fb7.number + "份";
                                    }
                                } else if (_0x522fb7.type == 14) {
                                    if (_0x534954 != _0x5c5d71.data.continuePrizeRuleList.length - 1) {
                                        _0x5edf95 += _0x1f7513 + "天" + _0x522fb7.discount / 100 + "红包" + _0x522fb7.number + "份|";
                                    } else {
                                        _0x5edf95 += _0x1f7513 + "天" + _0x522fb7.discount / 100 + "红包" + _0x522fb7.number + "份";
                                    }
                                } else { }
                            }
                        }
                        if (!_0x5edf95) {
                            _0x5edf95 = "无豆无红包，积分优惠券！";
                        }
                        console.log("奖励：" + _0x5edf95);
                    }
                }
            } catch (_0x3c678f) {
                $.logErr(_0x3c678f, _0x501c3b);
            } finally {
                _0x5692b5(_0x5c5d71);
            }
        });
    });
}
async function _0xacf2c7(_0x26e5e9, _0xd8b6b8, _0x135f0c) {
    const _0x1224b3 = {
        token: "" + _0x26e5e9,
        venderId: _0xd8b6b8,
        activityId: _0x135f0c,
        type: 56,
        actionType: 7
    };
    let _0x44765c = _0x1224b3;
    const _0x26aefe = {
        appId: "4da33"
    };
    _0x26aefe.appId = "4da33";
    _0x26aefe.fn = "interact_center_shopSign_signCollectGift";
    _0x26aefe.body = _0x44765c;
    _0x26aefe.apid = "interCenter_shopSign";
    _0x26aefe.ver = "11.6.5";
    _0x26aefe.cl = "android";
    _0x26aefe.user = $.UserName;
    _0x26aefe.code = 1;
    _0x26aefe.ua = $.UA;
    let _0x2ab02b = _0x26aefe;
    _0x44765c = await _0x3ef1af.getbody(_0x2ab02b);
    return new Promise(_0xbf218e => {
        const _0x3c053a = {
            url: "https://api.m.jd.com/api?loginType=2&" + _0x44765c,
            headers: {
                accept: "accept",
                "accept-encoding": "gzip, deflate",
                "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
                cookie: _0x4d4b08,
                referer: "https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=" + _0x26e5e9 + "&sceneval=2",
                "User-Agent": $.UA
            }
        };
        $.get(_0x3c053a, async (_0x23b1df, _0x571dde, _0x35f3b3) => {
            try {
                if (_0x23b1df) {
                    console.log("签到API请求失败‼️");
                    console.log(_0x23b1df);
                } else {
                    _0x35f3b3 = JSON.parse(_0x35f3b3);
                    if (_0x35f3b3.success && _0x35f3b3.success === true) {
                        let _0x2a27c2 = 0;
                        for (let _0x656f40 of _0x35f3b3.data) {
                            for (i of _0x656f40.prizeList) {
                                switch (i.type) {
                                    case 4:
                                        _0x2a27c2 += i.discount;
                                        break;
                                }
                            }
                        }
                        console.log("结果：签到成功! " + (_0x2a27c2 > 0 ? "获得 " + _0x2a27c2 + " 京豆" : ""));
                        _0x4c4f3f = 0;
                    } else if (_0x35f3b3.msg) {
                        console.log("签到失败：" + _0x35f3b3.msg);
                    } else {
                        console.log("签到失败!");
                        console.log(JSON.stringify(_0x35f3b3));
                        _0x4c4f3f++;
                        if (_0x4c4f3f > 6) {
                            return;
                        }
                        await $.wait(100);
                        await _0xacf2c7(_0x26e5e9, _0xd8b6b8, _0x135f0c);
                    }
                }
            } catch (_0x4964b5) {
                $.logErr(_0x4964b5, _0x571dde);
            } finally {
                _0xbf218e(_0x35f3b3);
            }
        });
    });
}
async function _0x4b0250(_0x29ad3a, _0x2462f2) {
    return new Promise(_0x3bd7b0 => {
        const _0x4f0413 = {
            url: _0x505f80 + "&t=" + Date.now() + "&loginType=2&functionId=interact_center_shopSign_getSignRecord&body={%22token%22:%22" + _0x29ad3a + "%22,%22venderId%22:" + _0x2462f2 + ",%22activityId%22:" + $.activityId + ",%22type%22:56}&jsonp=jsonp1006",
            headers: {
                accept: "application/json",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "zh-CN,zh;q=0.9",
                cookie: _0x4d4b08,
                referer: "https://h5.m.jd.com/",
                "User-Agent": $.UA
            }
        };
        $.get(_0x4f0413, (_0x559225, _0x11e056, _0xb50f2f) => {
            try {
                if (_0x559225) {
                    console.log("API请求失败‼️");
                    console.log(_0x559225);
                } else {
                    _0xb50f2f = JSON.parse(/{(.*)}/g.exec(_0xb50f2f)[0]);
                    console.log("当前已签到 " + _0xb50f2f.data.days + " 天");
                    _0x4fdae9 += "已签到：" + _0xb50f2f.data.days + "天\n";
                }
            } catch (_0x20d858) {
                $.logErr(_0x20d858, _0x11e056);
            } finally {
                _0x3bd7b0(_0xb50f2f);
            }
        });
    });
}
async function _0x504790() {
    if ($.isNode()) {
        $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x4fdae9);
        allMessage += "【京东账号" + $.index + "】" + $.nickName + "\n" + _0x4fdae9 + ($.index !== _0x2e6e62.length ? "\n\n" : "");
    }
}
function _0x495f11() {
    return new Promise(_0xdea589 => {
        const _0x5713ca = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: {},
            timeout: 10000
        };
        _0x5713ca.headers.Cookie = _0x4d4b08;
        _0x5713ca.headers.referer = "https://h5.m.jd.com/";
        _0x5713ca.headers["User-Agent"] = $.UA;
        const _0x51adb5 = _0x5713ca;
        $.get(_0x51adb5, (_0x480a87, _0x43cc9d, _0x577edf) => {
            try {
                if (_0x577edf) {
                    _0x577edf = JSON.parse(_0x577edf);
                    if (_0x577edf.islogin === "1") { } else if (_0x577edf.islogin === "0") {
                        $.isLogin = false;
                    }
                }
            } catch (_0x4ab76a) {
                console.log(_0x4ab76a);
            } finally {
                _0xdea589();
            }
        });
    });
}
function _0x128011(_0x121a36) {
    const _0x33b7f1 = _0x121a36.getFullYear();
    const _0x3a06fc = ("0" + (_0x121a36.getMonth() + 1)).slice(-2);
    const _0x24c1b4 = ("0" + _0x121a36.getDate()).slice(-2);
    const _0x371bc7 = ("0" + _0x121a36.getHours()).slice(-2);
    const _0x435ffd = ("0" + _0x121a36.getMinutes()).slice(-2);
    const _0x15fc77 = ("0" + _0x121a36.getSeconds()).slice(-2);
    return _0x33b7f1 + "/" + _0x3a06fc + "/" + _0x24c1b4 + " " + _0x371bc7 + ":" + _0x435ffd + ":" + _0x15fc77;
}
function _0x17cd2d(_0x38c9ad) {
    if (typeof _0x38c9ad == "string") {
        try {
            return JSON.parse(_0x38c9ad);
        } catch (_0x43fb0d) {
            console.log(_0x43fb0d);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function _0x3a17a9(_0xac5c9a) {
    _0xac5c9a = _0xac5c9a || 32;
    let _0x3954f3 = "abcdef0123456789";
    let _0x244d7e = _0x3954f3.length;
    let _0x515ab2 = "";
    for (i = 0; i < _0xac5c9a; i++) {
        _0x515ab2 += _0x3954f3.charAt(Math.floor(Math.random() * _0x244d7e));
    }
    return _0x515ab2;
}
function _0xe3c15() {
    $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + _0x3a17a9(40) + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
;
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }