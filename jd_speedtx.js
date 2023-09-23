/*
极速模式-签到
3 3 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_speedtx.js
updatetime:2023/9/17
 */
const $ = new Env('极速模式签到');
const _0x2b0cbc = $.isNode() ? require("./sendNotify") : "",
    _0x2cc48c = $.isNode() ? require("./jdCookie.js") : "",
    _0x3a25c8 = require("./function/dylanz.js"),
    _0x2999a5 = require("./USER_AGENTS");

let _0x5a88d4 = true,
    _0x3bf6b4 = [],
    _0x2f10fe = "",
    _0x430c0d = "";

if ($.isNode()) {
    Object.keys(_0x2cc48c).forEach(_0x577a80 => {
        _0x3bf6b4.push(_0x2cc48c[_0x577a80]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x3bf6b4 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x480d4a($.getdata("CookiesJD") || "[]").map(_0x3ebd84 => _0x3ebd84.cookie)].filter(_0x1e8c5c => !!_0x1e8c5c);
}

!(async () => {
    if (!_0x3bf6b4[0]) {
        const _0x378fdb = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x378fdb);
        return;
    }

    $.log("\n当前版本：2.0.0 ");
    $.log("TG频道：https://t.me/dylan_jdpro");

    for (let _0x61cb31 = 0; _0x61cb31 < _0x3bf6b4.length; _0x61cb31++) {
        if (_0x3bf6b4[_0x61cb31]) {
            _0x2f10fe = _0x3bf6b4[_0x61cb31];
            $.UserName = decodeURIComponent(_0x2f10fe.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2f10fe.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x61cb31 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.signInFlag = 0;
            $.score = 0;
            $.tasklist = [];
            $.UA = _0x2999a5.UARAM();
            await _0x2f909d();
            console.log("\n--------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------\n");

            if (!$.isLogin) {
                const _0x22dfbb = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x22dfbb);
                $.isNode() && (await _0x2b0cbc.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x12433f();
            $.signInFlag == 0 && ($.log("\n去签到..."), await _0x445d10());
            await _0x4e48fa();

            if ($.tasklist.length != 0) {
                console.log("\n去做任务...");

                for (let _0x444524 of $.tasklist) {
                    if (_0x444524.taskTitle === "下单") {
                        continue;
                    }

                    if (_0x444524.taskFinished) {
                        console.log(_0x444524.taskShowTitle + " ---- 已完成");
                        continue;
                    }

                    console.log("去做任务 " + _0x444524.taskShowTitle);
                    await _0x59d6c1(_0x444524.taskType, _0x444524.id, _0x444524.taskSourceUrl);
                    await $.wait(500);
                    await _0x1c9327(_0x444524.taskType, _0x444524.id);
                }
            }

            if ($.score > 20) {
                $.log("去提现20元...");
                await _0x32329e(3);
            } else {
                if ($.score > 1) {
                    $.log("去提现1元...");
                    await _0x32329e(2);
                } else {
                    $.score > 0.3 ? ($.log("\n去提现0.3元..."), await _0x32329e(1)) : $.log("余额不够提现！");
                }
            }

            await $.wait(5000);
        }
    }
})().catch(_0x5080ae => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5080ae + "!", "");
}).finally(() => {
    $.done();
});

async function _0x12433f() {
    const _0x1ab183 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x159c2f = _0x1ab183;
    _0x159c2f = await _0x4f8a27("bSignInHome", _0x159c2f, "76674");

    if (!_0x159c2f) {
        return;
    }

    return new Promise(async _0x42eb03 => {
        $.post(_0x143950(_0x159c2f), async (_0x218765, _0xe0f78c, _0x3ab52e) => {
            try {
                _0x218765 ? (console.log("" + JSON.stringify(_0x218765)), console.log(" API请求失败，请检查网路重试")) : (_0x3ab52e = JSON.parse(_0x3ab52e), _0x3ab52e.code == 0 ? ($.score = _0x3ab52e.data.signInCoin, console.log("余额" + _0x3ab52e.data.signInCoin + "元"), $.signInFlag = _0x3ab52e.data.signInFlag) : console.log(_0x3ab52e.errMsg));
            } catch (_0x45a8a2) {
                $.logErr(_0x45a8a2, _0xe0f78c);
            } finally {
                _0x42eb03(_0x3ab52e);
            }
        });
    });
}

async function _0x445d10() {
    const _0x393440 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x494005 = _0x393440;
    _0x494005 = await _0x4f8a27("bSignInDo", _0x494005, "61e2b");

    if (!_0x494005) {
        return;
    }

    return new Promise(async _0x486c52 => {
        $.post(_0x143950(_0x494005), async (_0x5387de, _0x5d5c87, _0x1fa4d3) => {
            try {
                _0x5387de ? (console.log("" + JSON.stringify(_0x5387de)), console.log(" API请求失败，请检查网路重试")) : (_0x1fa4d3 = JSON.parse(_0x1fa4d3), _0x1fa4d3.code == 0 ? console.log("签到成功：获得：" + _0x1fa4d3.data.signInCoin) : console.log(_0x1fa4d3.errMsg));
            } catch (_0x4e9d93) {
                $.logErr(_0x4e9d93, _0x5d5c87);
            } finally {
                _0x486c52(_0x1fa4d3);
            }
        });
    });
}

async function _0x59d6c1(_0x289265, _0x4295c4, _0x1d496d) {
    const _0x54a635 = {
        "taskType": _0x289265,
        "taskId": _0x4295c4,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "itemId": _0x1d496d
    };
    let _0x53d32b = _0x54a635;
    _0x53d32b = await _0x4f8a27("apsDoTask", _0x53d32b, "54ed7");

    if (!_0x53d32b) {
        return;
    }

    return new Promise(async _0x261a86 => {
        $.post(_0x143950(_0x53d32b), async (_0x408e41, _0x1126de, _0x275689) => {
            try {
                if (_0x408e41) {
                    console.log("" + JSON.stringify(_0x408e41));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x275689 = JSON.parse(_0x275689);

                    if (!(_0x275689.code == 0)) {
                        console.log(_0x275689.errMsg);
                    }
                }
            } catch (_0x154bc5) {
                $.logErr(_0x154bc5, _0x1126de);
            } finally {
                _0x261a86(_0x275689);
            }
        });
    });
}

async function _0x1c9327(_0xd1674f, _0xbadd9d) {
    const _0x7bc84 = {
        "taskType": _0xd1674f,
        "taskId": _0xbadd9d,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x518555 = _0x7bc84;
    _0x518555 = await _0x4f8a27("apTaskDrawAward", _0x518555, "6f2b6");

    if (!_0x518555) {
        return;
    }

    return new Promise(async _0x1d9a96 => {
        $.post(_0x143950(_0x518555), async (_0x4aefa0, _0x4051c0, _0x2b5f00) => {
            try {
                _0x4aefa0 ? (console.log("" + JSON.stringify(_0x4aefa0)), console.log(" API请求失败，请检查网路重试")) : (_0x2b5f00 = JSON.parse(_0x2b5f00), _0x2b5f00.code == 0 ? console.log("任务完成：获得：" + _0x2b5f00.data[0].awardGivenNumber + "\n") : console.log(_0x2b5f00.errMsg));
            } catch (_0x539a7d) {
                $.logErr(_0x539a7d, _0x4051c0);
            } finally {
                _0x1d9a96(_0x2b5f00);
            }
        });
    });
}

async function _0x32329e(_0x580703) {
    const _0xd41565 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "awardType": 4,
        "gear": _0x580703,
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x1e0831 = _0xd41565;
    _0x1e0831 = await _0x4f8a27("bSignInExchange", _0x1e0831, "ff179");

    if (!_0x1e0831) {
        return;
    }

    return new Promise(async _0x37e14c => {
        $.post(_0x143950(_0x1e0831), async (_0x484eff, _0x5c8260, _0x1f5235) => {
            try {
                _0x484eff ? (console.log("" + JSON.stringify(_0x484eff)), console.log(" API请求失败，请检查网路重试")) : (_0x1f5235 = JSON.parse(_0x1f5235), _0x1f5235.code == 0 ? _0x1f5235.data.msg.includes("提现") && $.log("提现成功！") : console.log(_0x1f5235.errMsg));
            } catch (_0x2b1821) {
                $.logErr(_0x2b1821, _0x5c8260);
            } finally {
                _0x37e14c(_0x1f5235);
            }
        });
    });
}

async function _0x4e48fa() {
    const _0x2c1ee4 = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x2f10fe
    };
    let _0x313ea3 = {
        "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0&loginType=2&loginWQBiz=wegame",
        "headers": _0x2c1ee4
    };
    return new Promise(async _0x36dfaf => {
        $.get(_0x313ea3, async (_0x402bb5, _0x19fa9d, _0x31d71f) => {
            try {
                _0x402bb5 ? (console.log("" + JSON.stringify(_0x402bb5)), console.log(" API请求失败，请检查网路重试")) : (_0x31d71f = JSON.parse(_0x31d71f), _0x31d71f.code == 0 ? $.tasklist = _0x31d71f.data : console.log(_0x31d71f.errMsg));
            } catch (_0x34a6de) {
                $.logErr(_0x34a6de, _0x19fa9d);
            } finally {
                _0x36dfaf(_0x31d71f);
            }
        });
    });
}

async function _0x4f8a27(_0x164bc0, _0x4be3d1, _0x1d0dec) {
    let _0x56d8cc = {
        "appId": _0x1d0dec,
        "fn": _0x164bc0,
        "body": _0x4be3d1,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0x4be3d1 = await _0x3a25c8.getbody(_0x56d8cc);
    return _0x4be3d1;
}

function _0x143950(_0x25827e) {
    const _0x97d51a = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x2f10fe
    };
    const _0x149acc = {
        "url": "https://api.m.jd.com/api",
        "body": _0x25827e + "&loginType=2&loginWQBiz=wegame",
        "headers": _0x97d51a
    };
    return _0x149acc;
}

function _0x2f909d() {
    return new Promise(_0x292aed => {
        const _0x59ff17 = {
            "Cookie": _0x2f10fe,
            "User-Agent": $.UA
        };
        const _0x26662c = {
            "url": "https://api.m.jd.com/client.action",
            "body": "body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&",
            "headers": _0x59ff17,
            "timeout": 10000
        };
        $.post(_0x26662c, (_0x5ce97c, _0x270313, _0xe66c0c) => {
            try {
                if (_0xe66c0c) {
                    _0xe66c0c = JSON.parse(_0xe66c0c);

                    if (!(_0xe66c0c.islogin === "1")) {
                        _0xe66c0c.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x132cc2) {
                console.log(_0x132cc2);
            } finally {
                _0x292aed();
            }
        });
    });
}

function _0x5598b0() {
    return new Promise(_0x3c821e => {
        !_0x5a88d4 ? $.msg($.name, "", "" + _0x430c0d) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x430c0d);

        _0x3c821e();
    });
}

function _0x30b21d(_0x58a96c) {
    try {
        if (typeof JSON.parse(_0x58a96c) == "object") {
            return true;
        }
    } catch (_0x55a6d8) {
        console.log(_0x55a6d8);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x480d4a(_0x18945d) {
    if (typeof _0x18945d == "string") {
        try {
            return JSON.parse(_0x18945d);
        } catch (_0x58416c) {
            console.log(_0x58416c);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }