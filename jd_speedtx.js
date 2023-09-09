/*
极速模式-签到
3 3 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_speedtx.js
updatetime:2023/9/9
 */
const $ = new Env('极速模式签到');
const _0x184f67 = $.isNode() ? require("./sendNotify") : "",
    _0x5c5c44 = $.isNode() ? require("./jdCookie.js") : "",
    _0x261e30 = require("./function/dylanz.js"),
    _0x581bbd = require("./USER_AGENTS");

let _0x36e524 = true,
    _0x3b5fa0 = [],
    _0x56b61c = "",
    _0xebbff7 = "";

if ($.isNode()) {
    Object.keys(_0x5c5c44).forEach(_0x48821d => {
        _0x3b5fa0.push(_0x5c5c44[_0x48821d]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x3b5fa0 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1a6fa4($.getdata("CookiesJD") || "[]").map(_0x348f90 => _0x348f90.cookie)].filter(_0xdab8e2 => !!_0xdab8e2);
}

!(async () => {
    if (!_0x3b5fa0[0]) {
        const _0x435330 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x435330);
        return;
    }

    for (let _0xce1c38 = 0; _0xce1c38 < _0x3b5fa0.length; _0xce1c38++) {
        if (_0x3b5fa0[_0xce1c38]) {
            _0x56b61c = _0x3b5fa0[_0xce1c38];
            $.UserName = decodeURIComponent(_0x56b61c.match(/pt_pin=([^; ]+)(?=;?)/) && _0x56b61c.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0xce1c38 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.signInFlag = 0;
            $.tasklist = [];
            $.UA = _0x581bbd.UARAM();
            await _0x156c06();
            console.log("\n--------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------\n");

            if (!$.isLogin) {
                const _0x578a1f = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x578a1f);
                $.isNode() && (await _0x184f67.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x3bf9b0();
            $.signInFlag == 0 && ($.log("\n去签到..."), await _0x449792());
            await _0x2f7a79();

            if ($.tasklist.length != 0) {
                console.log("\n去做任务...");

                for (let _0x1e35c8 of $.tasklist) {
                    if (_0x1e35c8.taskTitle === "下单") {
                        continue;
                    }

                    if (_0x1e35c8.taskFinished) {
                        console.log(_0x1e35c8.taskShowTitle + " ---- 已完成");
                        continue;
                    }

                    console.log("去做任务 " + _0x1e35c8.taskShowTitle);
                    await _0x2375b5(_0x1e35c8.taskType, _0x1e35c8.id, _0x1e35c8.taskSourceUrl);
                    await $.wait(500);
                    await _0x165bdf(_0x1e35c8.taskType, _0x1e35c8.id);
                }
            }

            await $.wait(5000);
        }
    }
})().catch(_0x459f32 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x459f32 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x3bf9b0() {
    const _0x5d3547 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x48fab2 = _0x5d3547;
    _0x48fab2 = await _0x2c2cb8("bSignInHome", _0x48fab2, "76674");

    if (!_0x48fab2) {
        return;
    }

    return new Promise(async _0x49c767 => {
        $.post(_0x37253a(_0x48fab2), async (_0x20a41e, _0x3be64a, _0x11e889) => {
            try {
                _0x20a41e ? (console.log("" + JSON.stringify(_0x20a41e)), console.log(" API请求失败，请检查网路重试")) : (_0x11e889 = JSON.parse(_0x11e889), _0x11e889.code == 0 ? (console.log("余额" + _0x11e889.data.signInCoin + "元"), $.signInFlag = _0x11e889.data.signInFlag) : console.log(_0x11e889.errMsg));
            } catch (_0x55be33) {
                $.logErr(_0x55be33, _0x3be64a);
            } finally {
                _0x49c767(_0x11e889);
            }
        });
    });
}

async function _0x449792() {
    const _0x10be9f = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x434973 = _0x10be9f;
    _0x434973 = await _0x2c2cb8("bSignInDo", _0x434973, "61e2b");

    if (!_0x434973) {
        return;
    }

    return new Promise(async _0x1eff3c => {
        $.post(_0x37253a(_0x434973), async (_0x1460ca, _0x22d792, _0x4cb57b) => {
            try {
                _0x1460ca ? (console.log("" + JSON.stringify(_0x1460ca)), console.log(" API请求失败，请检查网路重试")) : (_0x4cb57b = JSON.parse(_0x4cb57b), _0x4cb57b.code == 0 ? console.log("签到成功：获得：" + _0x4cb57b.data.signInCoin) : console.log(_0x4cb57b.errMsg));
            } catch (_0x15d0c5) {
                $.logErr(_0x15d0c5, _0x22d792);
            } finally {
                _0x1eff3c(_0x4cb57b);
            }
        });
    });
}

async function _0x2375b5(_0x4c79bd, _0x4ff884, _0xf2d529) {
    const _0xc7f8cc = {
        "taskType": _0x4c79bd,
        "taskId": _0x4ff884,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "itemId": _0xf2d529
    };
    let _0x16200d = _0xc7f8cc;
    _0x16200d = await _0x2c2cb8("apsDoTask", _0x16200d, "54ed7");

    if (!_0x16200d) {
        return;
    }

    return new Promise(async _0x42f2a8 => {
        $.post(_0x37253a(_0x16200d), async (_0x3c4a1a, _0x27eb0f, _0x40b10d) => {
            try {
                if (_0x3c4a1a) {
                    console.log("" + JSON.stringify(_0x3c4a1a));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x40b10d = JSON.parse(_0x40b10d);

                    if (!(_0x40b10d.code == 0)) {
                        console.log(_0x40b10d.errMsg);
                    }
                }
            } catch (_0x4273ac) {
                $.logErr(_0x4273ac, _0x27eb0f);
            } finally {
                _0x42f2a8(_0x40b10d);
            }
        });
    });
}

async function _0x165bdf(_0x69ac0a, _0x1f330f) {
    const _0x1c27a3 = {
        "taskType": _0x69ac0a,
        "taskId": _0x1f330f,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    let _0x3cc380 = _0x1c27a3;
    _0x3cc380 = await _0x2c2cb8("apTaskDrawAward", _0x3cc380, "6f2b6");

    if (!_0x3cc380) {
        return;
    }

    return new Promise(async _0x2421d7 => {
        $.post(_0x37253a(_0x3cc380), async (_0x3ef5dc, _0x4f7b5a, _0x2beb32) => {
            try {
                _0x3ef5dc ? (console.log("" + JSON.stringify(_0x3ef5dc)), console.log(" API请求失败，请检查网路重试")) : (_0x2beb32 = JSON.parse(_0x2beb32), _0x2beb32.code == 0 ? console.log("任务完成：获得：" + _0x2beb32.data[0].awardGivenNumber + "\n") : console.log(_0x2beb32.errMsg));
            } catch (_0x4bb67f) {
                $.logErr(_0x4bb67f, _0x4f7b5a);
            } finally {
                _0x2421d7(_0x2beb32);
            }
        });
    });
}

async function _0x2f7a79() {
    const _0xde69bf = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x56b61c
    };
    let _0x42c06b = {
        "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0&loginType=2&loginWQBiz=wegame",
        "headers": _0xde69bf
    };
    return new Promise(async _0x2bbe29 => {
        $.get(_0x42c06b, async (_0x2f0f0f, _0x1e057e, _0x21e10f) => {
            try {
                if (_0x2f0f0f) {
                    console.log("" + JSON.stringify(_0x2f0f0f));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x21e10f = JSON.parse(_0x21e10f);

                    if (_0x21e10f.code == 0) {
                        $.tasklist = _0x21e10f.data;
                    } else {
                        console.log(_0x21e10f.errMsg);
                    }
                }
            } catch (_0x43b8c2) {
                $.logErr(_0x43b8c2, _0x1e057e);
            } finally {
                _0x2bbe29(_0x21e10f);
            }
        });
    });
}

async function _0x2c2cb8(_0x402e14, _0xd9af72, _0x462a03) {
    let _0x3f5bb5 = {
        "appId": _0x462a03,
        "fn": _0x402e14,
        "body": _0xd9af72,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0xd9af72 = await _0x261e30.getbody(_0x3f5bb5);
    return _0xd9af72;
}

function _0x37253a(_0x1afbc2) {
    const _0x5e4d60 = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x56b61c
    };
    const _0x50d1b0 = {
        "url": "https://api.m.jd.com/api",
        "body": _0x1afbc2 + "&loginType=2&loginWQBiz=wegame",
        "headers": _0x5e4d60
    };
    return _0x50d1b0;
}

function _0x156c06() {
    return new Promise(_0xd72118 => {
        const _0x38e0a3 = {
            "Cookie": _0x56b61c,
            "User-Agent": $.UA
        };
        const _0x802632 = {
            "url": "https://api.m.jd.com/client.action",
            "body": "body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&",
            "headers": _0x38e0a3,
            "timeout": 10000
        };
        $.post(_0x802632, (_0x24554c, _0x5c0f47, _0x223afa) => {
            try {
                if (_0x223afa) {
                    _0x223afa = JSON.parse(_0x223afa);

                    if (!(_0x223afa.islogin === "1")) {
                        _0x223afa.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0xca51c6) {
                console.log(_0xca51c6);
            } finally {
                _0xd72118();
            }
        });
    });
}

function _0x53c298() {
    return new Promise(_0x65bef5 => {
        !_0x36e524 ? $.msg($.name, "", "" + _0xebbff7) : $.log("京东账号" + $.index + $.nickName + "\n" + _0xebbff7);

        _0x65bef5();
    });
}

function _0x4cd1cb(_0x50c9a0) {
    try {
        if (typeof JSON.parse(_0x50c9a0) == "object") {
            return true;
        }
    } catch (_0x5c3b36) {
        console.log(_0x5c3b36);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x1a6fa4(_0x4d5f6d) {
    if (typeof _0x4d5f6d == "string") {
        try {
            return JSON.parse(_0x4d5f6d);
        } catch (_0x405731) {
            console.log(_0x405731);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }