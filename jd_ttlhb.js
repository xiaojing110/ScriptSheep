/*
天天领红包
任务+开红包
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_ttlhb.js
updatetime:2023/11/07
 */

const $ = new Env('天天领红包');
const _0xdf1034 = $.isNode() ? require("./sendNotify") : "",
    _0x35cdb0 = $.isNode() ? require("./jdCookie.js") : "",
    _0x3f0f50 = require("./USER_AGENTS"),
    _0xa5d10a = require("./function/dylany");

let _0x375726 = true,
    _0x462cfa = [],
    _0x24167d = "",
    _0x2fe8f0 = "";

if ($.isNode()) {
    Object.keys(_0x35cdb0).forEach(_0xc4d9af => {
        _0x462cfa.push(_0x35cdb0[_0xc4d9af]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x462cfa = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x320d8d($.getdata("CookiesJD") || "[]").map(_0x3c6e8d => _0x3c6e8d.cookie)].filter(_0x594cb9 => !!_0x594cb9);
}

!(async () => {
    if (!_0x462cfa[0]) {
        const _0x279068 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x279068);
        return;
    }

    console.log("\n当前版本：20231107");
    console.log("入口：极速模式--我的--天天领红包");
    console.log("TG频道：https://t.me/dylan_jdpro\n");

    for (let _0x5d5f10 = 0; _0x5d5f10 < _0x462cfa.length; _0x5d5f10++) {
        if (_0x462cfa[_0x5d5f10]) {
            _0x24167d = _0x462cfa[_0x5d5f10];
            $.UserName = decodeURIComponent(_0x24167d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x24167d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x5d5f10 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = _0x3f0f50.UARAM ? _0x3f0f50.UARAM() : _0x3f0f50.USER_AGENT;
            await _0x51091a();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                const _0x4fb8a5 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x4fb8a5);
                $.isNode() && (await _0xdf1034.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            let _0x3a1565 = await _0x42218a();

            for (let _0x408646 of _0x3a1565) {
                $.log("去做  " + _0x408646.taskShowTitle);

                if (_0x408646.timeLimitSwitch == 1) {
                    continue;
                }

                if (_0x408646.taskFinished) {
                    $.log("------已完成");
                    continue;
                }

                await _0x17f375(_0x408646.taskSourceUrl, _0x408646.taskType, _0x408646.id);
                await $.wait(1000);
            }

            await _0x2dc765();
            $.log("\n开始开红包...");

            for (let _0x2427ae = 0; _0x2427ae < $.remainchance; _0x2427ae++) {
                $.log("开红包第" + (_0x2427ae + 1) + "次：");
                await _0x2d2919();
                await $.wait(1000);
            }

            await $.wait(2000);
        }
    }
})().catch(_0x28308f => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x28308f + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2dc765() {
    const _0x60ecc2 = {
        linkId: "l-yLvQMhLwCqYy6_nXUBgg",
        inviter: ""
    };
    let _0x3b1164 = _0x60ecc2,
        _0x4d98e6 = {
            appId: "d5a39",
            fn: "lhb4b_home",
            body: _0x3b1164,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x3b1164 = await _0xa5d10a.getbody(_0x4d98e6);

    if (!_0x3b1164) {
        return;
    }

    return new Promise(async _0xc0247 => {
        $.post(_0x4b0f25("lhb4b_home", _0x3b1164), async (_0x3e427c, _0xf7e79a, _0x27a5fe) => {
            try {
                _0x3e427c ? (console.log("" + JSON.stringify(_0x3e427c)), console.log(" API请求失败，请检查网路重试")) : (_0x27a5fe = JSON.parse(_0x27a5fe), _0x27a5fe.code == 0 ? ($.remainchance = _0x27a5fe.data.remainChance, $.log("\n已领红包 " + _0x27a5fe.data.totalAward[0].amount + "，现金 " + _0x27a5fe.data.totalAward[1].amount)) : console.log(_0x27a5fe.errMsg));
            } catch (_0x171873) {
                $.logErr(_0x171873, _0xf7e79a);
            } finally {
                _0xc0247(_0x27a5fe);
            }
        });
    });
}

async function _0x42218a() {
    let _0x355af8 = "";
    return new Promise(async _0x2ba989 => {
        $.post(_0x4b0f25("apTaskList", "functionId=apTaskList&body=%7B%22linkId%22%3A%22l-yLvQMhLwCqYy6_nXUBgg%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0"), async (_0x4f5514, _0x26968f, _0x47ac75) => {
            try {
                if (_0x4f5514) {
                    console.log("" + JSON.stringify(_0x4f5514));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x47ac75 = JSON.parse(_0x47ac75);

                    if (_0x47ac75.code == 0) {
                        _0x355af8 = _0x47ac75.data;
                    } else {
                        console.log(_0x47ac75.msg);
                    }
                }
            } catch (_0x1187ec) {
                $.logErr(_0x1187ec, _0x26968f);
            } finally {
                _0x2ba989(_0x355af8);
            }
        });
    });
}

async function _0x2d2919() {
    const _0x17b2c9 = {
        linkId: "l-yLvQMhLwCqYy6_nXUBgg",
        openMode: 0
    };
    let _0x406110 = _0x17b2c9,
        _0x69a315 = {
            appId: "7af4f",
            fn: "lhb4b_open",
            body: _0x406110,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x406110 = await _0xa5d10a.getbody(_0x69a315);

    if (!_0x406110) {
        return;
    }

    return new Promise(async _0x291b16 => {
        $.post(_0x4b0f25("lhb4b_open", _0x406110), async (_0x27f6ff, _0x40bcbb, _0x51430d) => {
            try {
                if (_0x27f6ff) {
                    console.log("" + JSON.stringify(_0x27f6ff));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x51430d = JSON.parse(_0x51430d);

                    if (_0x51430d.code == 0) {
                        if (_0x51430d.data.received.prizeType === 2) {
                            $.log("获得红包 " + _0x51430d.data.received.prizeValue);
                        } else {
                            _0x51430d.data.received.prizeType === 4 ? $.log("获得现金 " + _0x51430d.data.received.prizeValue) : $.log("获得优惠券！");
                        }
                    } else {
                        console.log(_0x51430d.msg);
                    }
                }
            } catch (_0x4bd1d7) {
                $.logErr(_0x4bd1d7, _0x40bcbb);
            } finally {
                _0x291b16();
            }
        });
    });
}

async function _0x17f375(_0x3e2a4b, _0x298cb0, _0x379d6d) {
    let _0x3fafe8 = {
        linkId: "l-yLvQMhLwCqYy6_nXUBgg",
        taskType: "" + _0x298cb0,
        taskId: _0x379d6d,
        channel: 4,
        checkVersion: true,
        cityId: "",
        provinceId: "",
        countyId: 61130,
        itemId: "" + encodeURIComponent(_0x3e2a4b)
    },
        _0x32c345 = {
            appId: "54ed7",
            fn: "apsDoTask",
            body: _0x3fafe8,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x3fafe8 = await _0xa5d10a.getbody(_0x32c345);

    if (!_0x3fafe8) {
        return;
    }

    return new Promise(async _0x3ef8d5 => {
        $.post(_0x4b0f25("apsDoTask", _0x3fafe8), async (_0x239df0, _0x87adaa, _0x3dc1f9) => {
            try {
                _0x239df0 ? (console.log("" + JSON.stringify(_0x239df0)), console.log(" API请求失败，请检查网路重试")) : (_0x3dc1f9 = JSON.parse(_0x3dc1f9), _0x3dc1f9.code == 0 ? _0x3dc1f9.data.finished && $.log("成功，抽奖次数 +" + _0x3dc1f9.data.awardInfo[0].factAwardNum) : console.log(_0x3dc1f9.msg));
            } catch (_0x149c39) {
                $.logErr(_0x149c39, _0x87adaa);
            } finally {
                _0x3ef8d5();
            }
        });
    });
}

function _0x4b0f25(_0xc6620a, _0x19fe06) {
    const _0x173ae7 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x24167d
    };
    const _0x7b2b69 = {
        url: "https://api.m.jd.com",
        body: _0x19fe06,
        headers: _0x173ae7
    };
    return _0x7b2b69;
}

function _0x51091a() {
    return new Promise(_0x42a1ae => {
        const _0xe4214f = {
            Cookie: _0x24167d,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x542a1b = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0xe4214f,
            timeout: 10000
        };
        $.get(_0x542a1b, (_0x357106, _0xfad19f, _0x102fa7) => {
            try {
                if (_0x102fa7) {
                    _0x102fa7 = JSON.parse(_0x102fa7);

                    if (!(_0x102fa7.islogin === "1")) {
                        if (_0x102fa7.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0x3c47a0) {
                console.log(_0x3c47a0);
            } finally {
                _0x42a1ae();
            }
        });
    });
}

function _0xbd9271() {
    return new Promise(_0x1c7b1b => {
        !_0x375726 ? $.msg($.name, "", "" + _0x2fe8f0) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x2fe8f0);

        _0x1c7b1b();
    });
}

function _0x4904d9(_0x193032) {
    try {
        if (typeof JSON.parse(_0x193032) == "object") {
            return true;
        }
    } catch (_0x3c6927) {
        console.log(_0x3c6927);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x320d8d(_0x2ec8d7) {
    if (typeof _0x2ec8d7 == "string") {
        try {
            return JSON.parse(_0x2ec8d7);
        } catch (_0x28c246) {
            console.log(_0x28c246);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }