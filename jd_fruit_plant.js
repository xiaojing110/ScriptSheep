/*
8 8 8 11 * jd_fruit_plant.js

变量：
epxort FRUIT_LEVEL = '2' 种植水果等级，默认2级
*/
const $ = new Env('农场自动兑换种植');
let _0x727f31 = [],
    _0x5d6924 = "",
    _0x4cb5e8,
    _0x3742a1,
    _0x486dc6 = 0;

const _0x237b91 = "https://api.m.jd.com/client.action",
    _0x1b4e2f = process.env.FRUIT_DELAY || 5000,
    _0x5c5596 = require("./USER_AGENTS"),
    _0x503e39 = require("./function/dylany");

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
$.reqnum = 1;

let _0x49472f = process.env.FRUIT_LEVEL ? process.env.FRUIT_LEVEL * 1 : 2;

const _0x1e5270 = {
    "totalWaterTaskForFarm": "102f5",
    "gotThreeMealForFarm": "57b30",
    "browseAdTaskForFarm": "53f09",
    "clockInFollowForFarm": "4a0b4",
    "waterFriendForFarm": "673a0",
    "awardFirstFriendForFarm": "9b655",
    "limitWaterInitForFarm": "6bdc2",
    "ddnc_surpriseModal": "e81c1",
    "friendInitForFarm": "a5a9c",
    "waterGoodForFarm": "0c010",
    "firstWaterTaskForFarm": "0cf1e",
    "waterFriendGotAwardForFarm": "d08ff",
    "ddnc_getTreasureBoxAward": "67dfc",
    "orderTaskGotWaterForFarm": "eed5c",
    "clockInForFarm": "32b94",
    "awardInviteFriendForFarm": "2b5ca",
    "awardCallOrInviteFriendForFarm": "b0b03",
    "getFullCollectionReward": "5c767",
    "getOrderPayLotteryWater": "ef089",
    "receiveStageEnergy": "15507",
    "exchangeGood": "52963",
    "initForFarm": "8a2af",
    "taskInitForFarm": "fcb5a",
    "userMyCardForFarm": "86ba5",
    "getCallUserCardForFarm": "2ca57",
    "deleteFriendForFarm": "eaf91",
    "gotLowFreqWaterForFarm": "8172b",
    "choiceGoodsForFarm": "5f4ca",
    "gotCouponForFarm": "b1515",
    "gotStageAwardForFarm": "81591",
    "followVenderForBrand": "71547",
    "clockInInitForFarm": "08dc3",
    "guideTaskAward": "59bc4",
    "farmAssistInit": "92354",
    "myCardInfoForFarm": "157b6",
    "gotPopFirstPurchaseTaskForFarm": "d432f",
    "gotWaterGoalTaskForFarm": "c901b",
    "gotNewUserTaskForFarm": "de8f8"
};
!(async () => {
    await _0x285293();

    if (!_0x727f31[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    if (_0x49472f > 2) {
        $.log("\n目前最大只能种植2级作物，请修改！！！\n");
        return;
    }

    console.log("默认种2级，如需调整请设置变量FRUIT_LEVEL\n使用率不高，指定（desi）运行即可\n");
    console.log("支持代理API\n");

    for (let _0x2653fb = 0; _0x2653fb < _0x727f31.length; _0x2653fb++) {
        if (_0x727f31[_0x2653fb]) {
            _0x5d6924 = _0x727f31[_0x2653fb];
            $.UserName = decodeURIComponent(_0x5d6924.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5d6924.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2653fb + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            await _0x1c495d();
            console.log("--------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "---------------\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await _0x4cb5e8.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            _0x3742a1 = "";
            subTitle = "";
            option = {};
            $.UA = _0x5c5596.UARAM ? _0x5c5596.UARAM() : _0x5c5596.USER_AGENT;
            await _0x1a1e0b();

            if (_0x3742a1) {
                await _0x4cb5e8.sendNotify("" + $.name, "" + _0x3742a1);
            }

            await $.wait(2000);
        }
    }
})().catch(_0x3fe035 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3fe035 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x1a1e0b() {
    try {
        await _0x5cf839();

        if ($.farmInfo.farmUserPro) {
            if ($.farmInfo.farmUserPro.treeState === 1) {
                $.log($.farmInfo.farmUserPro.name + " 已经在种植中...");
                return;
            }

            $.farmInfo.farmUserPro.treeState === 2 && ($.log($.farmInfo.farmUserPro.name + " 已完成,种植时间：" + _0x391406($.farmInfo.farmUserPro.createTime)), await _0xf7e241("gotCouponForFarm", {
                "version": 24,
                "channel": 3,
                "babelChannel": 0
            }), await $.wait(2000), await _0x5cf839());

            if ($.farmInfo.farmUserPro.treeState === 3) {
                _0x3742a1 += "【账号" + $.index + "🆔】" + ($.nickName || $.UserName);
                let _0x385b74 = $.farmInfo.myHongBaoInfo.hongBao;
                $.log("已兑换" + _0x385b74.discount + "元红包，" + _0x391406(_0x385b74.endTime) + "过期");
                _0x3742a1 += "已兑换" + _0x385b74.discount + "元红包，" + _0x391406(_0x385b74.endTime) + "过期";
            }

            let _0x5de9ad = $.farmInfo.farmLevelWinGoods ? $.farmInfo.farmLevelWinGoods[_0x49472f][0] : 0;

            await $.wait(3000);

            if (_0x5de9ad) {
                let _0x484f1b = await _0xf7e241("choiceGoodsForFarm", {
                    "imageUrl": "",
                    "nickName": "",
                    "shareCode": "",
                    "goodsType": _0x5de9ad.type,
                    "type": "0",
                    "version": 24,
                    "channel": 3,
                    "babelChannel": 0
                });

                _0x484f1b.code * 1 === 0 && ($.log("\n再次种植 " + _0x484f1b.farmUserPro.name + " 成功"), _0x3742a1 += "\n再次种植 " + _0x484f1b.farmUserPro.name + " 成功");
                await _0x561298("4");
                await $.wait(1000);
                await _0x397f7c();
                await $.wait(1000);
                await _0x561298("1");
            } else $.log("获取种子信息失败，请重试，如果多次失败，手动进APP查看\n");
        } else JSON.stringify($.farmInfo).includes("winTexts") ? console.log("初始化农场数据异常, 请确认此账号是否开通农场\n") : console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n");
    } catch (_0x30475b) {
        console.log(_0x30475b);
    }
}

function _0x391406(_0x22ae0c) {
    _0x22ae0c = new Date(_0x22ae0c);

    const _0x382d0 = _0x22ae0c.getFullYear(),
        _0x10a244 = ("0" + (_0x22ae0c.getMonth() + 1)).slice(-2),
        _0x9ad92 = ("0" + _0x22ae0c.getDate()).slice(-2),
        _0x559073 = ("0" + _0x22ae0c.getHours()).slice(-2),
        _0x2291f0 = ("0" + _0x22ae0c.getMinutes()).slice(-2),
        _0x6c4333 = ("0" + _0x22ae0c.getSeconds()).slice(-2);

    return _0x382d0 + "/" + _0x10a244 + "/" + _0x9ad92 + " " + _0x559073 + ":" + _0x2291f0 + ":" + _0x6c4333;
}

async function _0x561298(_0x2db637) {
    $.gotStageAwardForFarmRes = await _0xf7e241("gotStageAwardForFarm", {
        "type": _0x2db637
    });
}

async function _0x397f7c() {
    await $.wait(1000);
    $.waterResult = await _0xf7e241("waterGoodForFarm");
}

async function _0x5cf839() {
    await $.wait(1000);
    if (_0x486dc6 > "1") return;
    let _0x363089 = {
        "babelChannel": "121",
        "sid": "",
        "un_area": "",
        "version": 24,
        "channel": 1,
        "lat": "",
        "lng": ""
    },
        _0x24020b = {
            "appId": "8a2af",
            "fn": "initForFarm",
            "body": _0x363089,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    return _0x363089 = await _0x503e39.getbody(_0x24020b), new Promise(_0xe5a980 => {
        const _0x2b380c = {
            "url": "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x363089,
            "headers": {
                "cookie": _0x5d6924,
                "origin": "https://carry.m.jd.com",
                "referer": "https://carry.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 30000
        };
        $.dget(_0x2b380c, async (_0x4a97bb, _0x3d64bf, _0x149902) => {
            try {
                if (_0x4a97bb) {
                    console.log("initForFarm: 请求失败 ‼️‼️");
                    console.log(JSON.stringify(_0x4a97bb));
                } else _0x300813(_0x149902) && ($.farmInfo = JSON.parse(_0x149902), $.farmInfo.code != 0 && (_0x486dc6++, await _0x5cf839()), _0x486dc6 = 0);
            } catch (_0x13f25d) {
                $.logErr(_0x13f25d, _0x3d64bf);
            } finally {
                _0xe5a980();
            }
        });
    });
}

function _0x285293() {
    return new Promise(_0x2ca588 => {
        _0x4cb5e8 = $.isNode() ? require("./sendNotify") : "";

        const _0x159330 = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0x159330).forEach(_0x5dff29 => {
                _0x159330[_0x5dff29] && _0x727f31.push(_0x159330[_0x5dff29]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else _0x727f31 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1f0e28($.getdata("CookiesJD") || "[]").map(_0x25f9a8 => _0x25f9a8.cookie)].filter(_0x3daa26 => !!_0x3daa26);

        _0x2ca588();
    });
}

function _0x1c495d() {
    return new Promise(_0x27835d => {
        const _0x5854ab = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x5d6924,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x5854ab, (_0x34252c, _0x25ff72, _0x125af1) => {
            try {
                if (_0x125af1) {
                    _0x125af1 = JSON.parse(_0x125af1);

                    if (_0x125af1.islogin === "1") { } else _0x125af1.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x17ea48) {
                console.log(_0x17ea48);
            } finally {
                _0x27835d();
            }
        });
    });
}

async function _0xf7e241(_0x20ce0f, _0x244b2f = {}, _0x1bdcb3 = 1000) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x1b4e2f / 1000 + "秒......\n"), _0x1bdcb3 = _0x1b4e2f);
    $.reqnum++;

    if (_0x1e5270[_0x20ce0f]) {
        let _0x13f32a = {
            "appId": _0x1e5270[_0x20ce0f],
            "fn": _0x20ce0f,
            "body": _0x244b2f,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x244b2f = await _0x503e39.getbody(_0x13f32a);
    } else _0x244b2f = "functionId=" + _0x20ce0f + "&body=" + encodeURIComponent(JSON.stringify(_0x244b2f)) + "&appid=wh5";

    return new Promise(_0x54f401 => {
        setTimeout(() => {
            $.dpost(_0x85feff(_0x244b2f), (_0x2a5368, _0x3b46f1, _0x2d99c0) => {
                try {
                    if (_0x2a5368) console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x2a5368)), console.log("function_id:" + _0x20ce0f), $.logErr(_0x2a5368); else {
                        _0x300813(_0x2d99c0) && (_0x2d99c0 = JSON.parse(_0x2d99c0));
                    }
                } catch (_0x5f0942) {
                    $.logErr(_0x5f0942, _0x3b46f1);
                } finally {
                    _0x54f401(_0x2d99c0);
                }
            });
        }, _0x1bdcb3);
    });
}

function _0x300813(_0x1497b0) {
    try {
        if (typeof JSON.parse(_0x1497b0) == "object") return true;
    } catch (_0x3a0550) {
        return console.log(_0x3a0550), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x85feff(_0x23a091 = {}) {
    return {
        "url": _0x237b91 + "?" + _0x23a091,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x5d6924
        },
        "timeout": 30000
    };
}

function _0x1f0e28(_0x5b8819) {
    if (typeof _0x5b8819 == "string") try {
        return JSON.parse(_0x5b8819);
    } catch (_0x3fa182) {
        return console.log(_0x3fa182), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }