/*
任务，抽奖
6 2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/9/23
 */


const wudoutimes = '30';//连续几次没有豆就不抽奖只做任务
const $ = new Env('派对狂欢城');
const _0xef8b96 = $.isNode() ? require("./sendNotify") : "",
    _0x3ba93c = $.isNode() ? require("./jdCookie.js") : "",
    _0x58855d = require("./function/dylany.js"),
    _0x254e4e = require("./USER_AGENTS"),
    _0x106682 = require("crypto-js");

let _0x4ca6ee = true,
    _0x163ed5 = [],
    _0x267661 = "",
    _0x1b7b26 = "",
    _0x5b7d2a = false,
    _0x12a8c9 = false;

if ($.isNode()) {
    Object.keys(_0x3ba93c).forEach(_0x3511f1 => {
        _0x163ed5.push(_0x3ba93c[_0x3511f1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x163ed5 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x271968($.getdata("CookiesJD") || "[]").map(_0x5d4fc6 => _0x5d4fc6.cookie)].filter(_0x5ef9d9 => !!_0x5ef9d9);

!(async () => {
    if (!_0x163ed5[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：2023/11/18 没水关闭抽奖");
    $.log("TG反馈：https://t.me/dylan_jdpro");

    for (let _0xa20a3c = 0; _0xa20a3c < _0x163ed5.length; _0xa20a3c++) {
        if (_0x163ed5[_0xa20a3c]) {
            _0x267661 = _0x163ed5[_0xa20a3c];
            $.UserName = decodeURIComponent(_0x267661.match(/pt_pin=([^; ]+)(?=;?)/) && _0x267661.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0xa20a3c + 1;
            $.isLogin = true;
            $.nickName = "";
            $.notimes = false;
            $.airnum = 0;
            $.UA = _0x254e4e.UARAM ? _0x254e4e.UARAM() : _0x254e4e.USER_AGENT;
            await _0x5671e5();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0xef8b96.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x45d2e8();
            await $.wait(200);
            await _0x49d166();
            await $.wait(200);
            await _0xc4c4ec();
            await $.wait(200);
            await _0x1da6de();
            await $.wait(200);

            if ($.taskList) {
                $.log("去做任务...");

                for (let _0x54667b of $.taskList) {
                    if (!!_0x54667b.assignmentName && _0x54667b.assignmentName !== "积分兑换" && _0x54667b.assignmentName.indexOf("抽奖奖池") == -1 && _0x54667b.assignmentName.indexOf("加购") == -1 && _0x54667b.assignmentName.indexOf("会员") == -1) {
                        $.log("\n----" + _0x54667b.assignmentName);

                        if (_0x54667b.completionFlag) {
                            $.log("----已完成");
                            continue;
                        }

                        if (_0x54667b.ext.shoppingActivity || _0x54667b.ext.followShop) {
                            for (let _0xaa3248 = 0; _0xaa3248 < _0x54667b.assignmentTimesLimit - _0x54667b.completionCnt; _0xaa3248++) {
                                let _0x4cc1d1 = _0x54667b.ext.shoppingActivity ? _0x54667b.ext.shoppingActivity[_0xaa3248]?.["itemId"] : _0x54667b.ext.followShop[_0xaa3248]?.["itemId"];

                                if (!_0x4cc1d1) _0x4cc1d1 = _0x54667b.ext.shoppingActivity ? _0x54667b.ext.shoppingActivity[Math.floor(Math.random(0, _0x54667b.ext.shoppingActivity.length))].itemId : _0x54667b.ext.followShop[Math.floor(Math.random(0, _0x54667b.ext.followShop.length))].itemId;
                                await _0x2f7136(_0x54667b.encryptAssignmentId, _0x4cc1d1);
                                await $.wait(1000);
                            }

                            continue;
                        }

                        await _0x2f7136(_0x54667b.encryptAssignmentId);
                        await $.wait(500);
                    }
                }
            }

            if (_0x12a8c9) {
                $.log("\n\n元宝抽奖...");

                for (let _0x26307f of Array(50)) {
                    if ($.notimes) break;

                    if ($.airnum > wudoutimes) {
                        $.log("\n\n连续无豆达到设定值, 不抽奖只做任务！！！");
                        _0x12a8c9 = false;
                        break;
                    }

                    await _0xe98779();
                    await $.wait(2000);
                }
            }

            await $.wait(5000);
        }
    }
})().catch(_0x4529dc => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4529dc + "!", "");
}).finally(() => {
    $.done();
});

async function _0x45d2e8() {
    return new Promise(async _0x4bf207 => {
        $.post(_0x474a31("arvrMeta2RoomSortListByTemplateId", {
            "templateId": "790088977"
        }), async (_0x5d07a1, _0xf0348, _0x3d11b2) => {
            try {
                if (_0x5d07a1) console.log("" + JSON.stringify(_0x5d07a1)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5b7d2a && console.log(_0x3d11b2);
                    _0x3d11b2 = JSON.parse(_0x3d11b2);
                    if (_0x3d11b2.code == 0) $.roomId = _0x3d11b2.data[0].roomId; else {
                        console.log(_0x3d11b2.msg);
                    }
                }
            } catch (_0x22b9aa) {
                $.logErr(_0x22b9aa, _0xf0348);
            } finally {
                _0x4bf207(_0x3d11b2);
            }
        });
    });
}

async function _0x49d166() {
    return new Promise(async _0x229030 => {
        $.post(_0x474a31("meta2LoginGame", {
            "channel": "1",
            "roomId": $.roomId
        }), async (_0x2d41a3, _0x27d772, _0x554657) => {
            try {
                if (_0x2d41a3) console.log("" + JSON.stringify(_0x2d41a3)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5b7d2a && console.log(_0x554657);
                    _0x554657 = JSON.parse(_0x554657);

                    if (_0x554657.code == 0) { } else console.log(_0x554657.msg);
                }
            } catch (_0x509694) {
                $.logErr(_0x509694, _0x27d772);
            } finally {
                _0x229030(_0x554657);
            }
        });
    });
}

async function _0xc4c4ec() {
    let _0x537600 = {
        "rewardType": 6,
        "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
        "appId": "app_440"
    };
    return _0x537600 = _0x46c04f(_0x537600), new Promise(async _0x2c474e => {
        $.post(_0x474a31("arvr_getRequestToken", _0x537600), async (_0x1bdd1c, _0x33b3df, _0x3070d2) => {
            try {
                if (_0x1bdd1c) console.log("" + JSON.stringify(_0x1bdd1c)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5b7d2a && console.log(_0x3070d2);
                    _0x3070d2 = JSON.parse(_0x3070d2);

                    if (_0x3070d2.code == 200) {
                        $.token = _0x3070d2.data;
                    } else console.log(_0x3070d2.msg);
                }
            } catch (_0x3b65ef) {
                $.logErr(_0x3b65ef, _0x33b3df);
            } finally {
                _0x2c474e(_0x3070d2);
            }
        });
    });
}

async function _0x1da6de() {
    let _0x2b7300 = {
        "projectId": "1563959",
        "sourceCode": 2
    };
    return _0x2b7300 = _0x46c04f(_0x2b7300), new Promise(async _0x5642be => {
        $.post(_0x474a31("arvr_queryInteractiveInfo", _0x2b7300), async (_0x570219, _0x142ea3, _0x3b03e5) => {
            try {
                if (_0x570219) console.log("" + JSON.stringify(_0x570219)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5b7d2a && console.log(_0x3b03e5);
                    _0x3b03e5 = JSON.parse(_0x3b03e5);
                    if (_0x3b03e5.subCode == 0) $.taskList = _0x3b03e5.assignmentList; else {
                        console.log(_0x3b03e5.msg);
                    }
                }
            } catch (_0x4fc774) {
                $.logErr(_0x4fc774, _0x142ea3);
            } finally {
                _0x5642be(_0x3b03e5);
            }
        });
    });
}

async function _0xe98779() {
    let _0xee21e9 = {
        "projectId": "1563959",
        "sourceCode": 2,
        "accessToken": $.token,
        "subTaskId": "o5mVnPZZChSZyaD1qcXXXfWwhEb",
        "subTaskIdSecret": true,
        "exchangeNum": 1
    };
    _0xee21e9 = _0x46c04f(_0xee21e9);

    let _0x3a1ae2 = {
        "appId": "e5749",
        "fn": "arvr_doInteractiveAssignment",
        "body": _0xee21e9,
        "apid": "commonActivity",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    },
        _0x2a4437 = await _0x58855d.getbody(_0x3a1ae2),
        _0xaf315d = {
            "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
            "body": "" + _0x2a4437,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x267661
            }
        };

    return new Promise(async _0x275404 => {
        $.post(_0xaf315d, async (_0x4fa655, _0x156f79, _0x5fcae7) => {
            try {
                if (_0x4fa655) console.log("" + JSON.stringify(_0x4fa655)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5fcae7 = JSON.parse(_0x5fcae7);

                    if (_0x5fcae7.subCode == 0) {
                        if (_0x5fcae7.rewardsInfo.failRewards && _0x5fcae7.rewardsInfo.failRewards.length != 0) {
                            if (_0x5fcae7.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                                process.stdout.write("黑号，不继续抽了！");
                                $.notimes = true;
                                return;
                            }
                        }

                        _0x5fcae7.rewardsInfo.successRewards && JSON.stringify(_0x5fcae7.rewardsInfo.successRewards).includes("京豆") ? (process.stdout.write(Object.values(_0x5fcae7.rewardsInfo.successRewards)[0][0].rewardName + " "), Object.values(_0x5fcae7.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write("💨 "), $.airnum++);
                    } else _0x5fcae7.msg.includes("不足") ? (console.log(_0x5fcae7.msg), $.notimes = true) : console.log(_0x5fcae7.msg);
                }
            } catch (_0x4d2f70) {
                $.logErr(_0x4d2f70, _0x156f79);
            } finally {
                _0x275404(_0x5fcae7);
            }
        });
    });
}

async function _0x2f7136(_0x219b4a, _0x154b4c) {
    let _0x4cad3b = {
        "projectId": "1563959",
        "sourceCode": 2,
        "accessToken": $.token,
        "subTaskId": _0x219b4a,
        "subTaskIdSecret": true,
        "itemId": _0x154b4c
    };
    if (!_0x154b4c) delete _0x4cad3b.itemId;
    _0x4cad3b = _0x46c04f(_0x4cad3b);

    let _0x84782a = {
        "appId": "e5749",
        "fn": "arvr_doInteractiveAssignment",
        "body": _0x4cad3b,
        "apid": "commonActivity",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    },
        _0x969be0 = await _0x58855d.getbody(_0x84782a),
        _0x2c6da8 = {
            "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
            "body": "" + _0x969be0,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Referer": "https://prodev.m.jd.com/",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x267661
            }
        };

    return new Promise(async _0x3a7063 => {
        $.post(_0x2c6da8, async (_0x31fd31, _0x101381, _0x5d98cd) => {
            try {
                if (_0x31fd31) console.log("" + JSON.stringify(_0x31fd31)), console.log("dotask 请求失败，请检查网路重试"); else {
                    _0x5b7d2a && console.log(_0x5d98cd);
                    _0x5d98cd = JSON.parse(_0x5d98cd);

                    if (_0x5d98cd.subCode == 0) {
                        _0x5d98cd.rewardsInfo.successRewards && process.stdout.write("" + _0x5d98cd.rewardsInfo.successRewards[1].quantityDetails[0].quantity + _0x5d98cd.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ");
                    } else console.log(_0x5d98cd.msg);
                }
            } catch (_0x1c6662) {
                $.logErr(_0x1c6662, _0x101381);
            } finally {
                _0x3a7063(_0x5d98cd);
            }
        });
    });
}

function _0x474a31(_0x19dcad, _0x4149a7) {
    return {
        "url": "https://api.m.jd.com/api/" + _0x19dcad,
        "body": "appid=commonActivity&functionId=" + _0x19dcad + "&body=" + encodeURIComponent(JSON.stringify(_0x4149a7)) + "&t=" + Date.now(),
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://pro.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x267661
        }
    };
}

function _0x46c04f(_0x2cc2f4) {
    let _0xe0cc2 = "",
        _0x2f23d4 = Object.keys(_0x2cc2f4).sort(function (_0x1d6256, _0xb556c8) {
            return _0x1d6256.localeCompare(_0xb556c8);
        });

    for (let _0x414129 of _0x2f23d4) {
        _0xe0cc2 = _0xe0cc2.concat(_0x2cc2f4[_0x414129]);
    }

    let _0x4c2496 = Date.now();

    r = "".concat("c4491f13dce9c71f").concat(_0xe0cc2).concat(_0x4c2496);

    let _0x55dcdd = _0x106682.MD5(r).toString();

    return _0x2cc2f4.timestamp = _0x4c2496, _0x2cc2f4.sign = _0x55dcdd, _0x2cc2f4.signKey = "c4491f13dce9c71f", _0x2cc2f4;
}

function _0x5671e5() {
    return new Promise(_0x44f4fe => {
        const _0x1d3ddd = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x267661,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x1d3ddd, (_0x32fbf0, _0x551001, _0x56ec23) => {
            try {
                if (_0x56ec23) {
                    _0x56ec23 = JSON.parse(_0x56ec23);

                    if (_0x56ec23.islogin === "1") { } else _0x56ec23.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0xe8746e) {
                console.log(_0xe8746e);
            } finally {
                _0x44f4fe();
            }
        });
    });
}

function _0x35682b() {
    return new Promise(_0x14aaac => {
        if (!_0x4ca6ee) {
            $.msg($.name, "", "" + _0x1b7b26);
        } else $.log("京东账号" + $.index + $.nickName + "\n" + _0x1b7b26);

        _0x14aaac();
    });
}

function _0x8013df(_0x1132c1) {
    try {
        if (typeof JSON.parse(_0x1132c1) == "object") return true;
    } catch (_0x3f62f3) {
        return console.log(_0x3f62f3), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x271968(_0x4100c9) {
    if (typeof _0x4100c9 == "string") try {
        return JSON.parse(_0x4100c9);
    } catch (_0x26d52e) {
        return console.log(_0x26d52e), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }