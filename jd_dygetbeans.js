/*
1，5，10豆，黑子擦肩
23 2 * * * jd_dygetbeans.js
 */

const $ = new Env('每日抽豆');
const _0x5cde91 = $.isNode() ? require("./sendNotify") : "",
    _0x376e99 = $.isNode() ? require("./jdCookie.js") : "",
    _0x156758 = require("./function/dylanx.js");

let _0x3883e4 = true,
    _0x5b0351 = [],
    _0x549e38 = "",
    _0x11b1bb = "";

if ($.isNode()) {
    Object.keys(_0x376e99).forEach(_0x135ea1 => {
        _0x5b0351.push(_0x376e99[_0x135ea1]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x5b0351 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x521580($.getdata("CookiesJD") || "[]").map(_0x5f0626 => _0x5f0626.cookie)].filter(_0x51a63f => !!_0x51a63f);
}

!(async () => {
    if (!_0x5b0351[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let _0x1123c3 = 0; _0x1123c3 < _0x5b0351.length; _0x1123c3++) {
        if (_0x5b0351[_0x1123c3]) {
            _0x549e38 = _0x5b0351[_0x1123c3];
            $.UserName = decodeURIComponent(_0x549e38.match(/pt_pin=([^; ]+)(?=;?)/) && _0x549e38.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x1123c3 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.black = false;
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x43b3fa();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                const _0x197023 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x197023);
                $.isNode() && (await _0x5cde91.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0xb49f8e();
            await $.wait(2000);
            const _0x2026ad = {
                "authType": "2",
                "awardSource": "1",
                "enAwardK": "ltvTJ/WYFPZcuWIWHCAjR/lUVVYszUqGN+JzEE06dPu7DDzXHNt5Br7i6hYH2826ssuKfHev2yv2\n8HWSugMPNJj0hO0oRf9K9vB1kroDDzT5uSUPG/Z35YJDHw8AyYmqk4Q1u2vSGKS/M+5ruJeepDDb\nGjIC3nIIbIE2I7/kWfG6LEOpCsfjzQD+tTlmq6znidq4bRZoUJ3MOg0BXga8nip79XSe0g5kHG/A\na2pjcqcS+Z0MdH5AoT28E84LptqHeCE6mkMJ/dL3sjRs44o9OuXOZklgdKme+XUAsi2or52idiaj\nejivdFQcDHA7HH3gaHvanKkkE8TU7ESujM2a18EuQglPvG63XuhsjEuTur7Q0q+RCbbzCUJO1qM0\nhM1uGj8RZGTjNPmgGqqkikOxgpl2et5AeQ0y_babel",
                "encryptAssignmentId": "tb5nbUQ7kk45XoAexByamhEHeHy",
                "encryptProjectId": "TmxyMFsNSsUTi1UoGoYd6WM2Bks",
                "lotteryCode": "1271763",
                "riskParam": {},
                "srv": "{\"bord\":\"0\",\"fno\":\"0-0-2\",\"mid\":\"70764372\",\"bi2\":\"2\",\"bid\":\"0\",\"aid\":\"01150161\"}"
            };
            _0x2026ad.riskParam.childActivityUrl = "https://pro.m.jd.com/mall/active/3kmVmayf36Kmoyfq9pLuCSYUfU9t/index.html?babelChannel=ttt1";
            _0x2026ad.riskParam.eid = "";
            _0x2026ad.riskParam.pageClickKey = "Babel_WheelSurf";
            _0x2026ad.riskParam.shshshfpb = "";
            await _0xf8fdba(_0x2026ad);
            await $.wait(2000);
            await _0x5dc0c0();
            await $.wait(10000);
        }
    }
})().catch(_0x1a54d3 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1a54d3 + "!", "");
}).finally(() => {
    $.done();
});

async function _0xf8fdba(_0x2b471e) {
    let _0xd60b76 = await _0x156758.getbody("babelGetLottery", _0x2b471e);

    return new Promise(async _0x486b13 => {
        $.post(_0x3adea3("babelGetLottery", _0xd60b76), async (_0x4327ac, _0x2045d8, _0x479852) => {
            try {
                if (_0x4327ac) {
                    console.log("" + JSON.stringify(_0x4327ac));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x479852 = JSON.parse(_0x479852);

                    if (_0x479852.prizeName) {
                        console.log("恭喜获得：" + _0x479852.prizeName);
                    } else {
                        if (_0x479852.responseMessage.includes("未通过")) {
                            $.log("风险等级未通过！");
                            $.black = true;
                        } else {
                            _0x479852.responseMessage.includes("已完成") ? $.log("103-任务已完成") : $.log(JSON.stringify(_0x479852));
                        }
                    }
                }
            } catch (_0x46ea9c) {
                $.logErr(_0x46ea9c, _0x2045d8);
            } finally {
                _0x486b13(_0x479852);
            }
        });
    });
}

async function _0xb49f8e() {
    let _0x25a4e0 = await _0x156758.getbody("signInWithPrize", {
        "floorId": "83596202"
    });

    return new Promise(async _0x3ad0d5 => {
        $.post(_0x3adea3("signInWithPrize", _0x25a4e0), async (_0x20f2f7, _0x16f6f2, _0x50b5c8) => {
            try {
                if (_0x20f2f7) {
                    console.log("" + JSON.stringify(_0x20f2f7));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x50b5c8 = JSON.parse(_0x50b5c8);

                    if (_0x50b5c8.code == 0) {
                        if (_0x50b5c8.result.signInText.includes("已经")) {
                            $.log("103-任务已完成");
                        } else {
                            if (_0x50b5c8.result.signInText.includes("恭喜")) {
                                $.log("恭喜获得：" + _0x50b5c8.result.beanCount + "京豆");
                            }
                        }
                    } else {
                        console.log(_0x50b5c8.message);
                    }
                }
            } catch (_0x46bb7e) {
                $.logErr(_0x46bb7e, _0x16f6f2);
            } finally {
                _0x3ad0d5(_0x50b5c8);
            }
        });
    });
}

async function _0x5dc0c0() {
    const _0x415992 = {
        "Host": "api.m.jd.com",
        "Origin": "https://h5.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x549e38
    };
    const _0x3d13e5 = {
        "url": "https://api.m.jd.com/api?appid=NewDepartmentStore&functionId=doInteractiveAssignment&body=%7B%22sourceCode%22%3A%22ace20230504MZPD%22%2C%22clientInfo%22%3A%7B%22ip%22%3A%22%22%7D%2C%22encryptProjectId%22%3A%22oRnJWzu84htA5EMrgQohdtjUp8b%22%2C%22encryptAssignmentId%22%3A%22gm9yNeFrcD9KLtZAV1gZQfNX3ux%22%2C%22itemId%22%3A%221%22%2C%22completionFlag%22%3Atrue%2C%22actionType%22%3A0%7D",
        "headers": _0x415992
    };
    return new Promise(async _0x557dee => {
        $.post(_0x3d13e5, async (_0x3f6480, _0x489730, _0x2ad540) => {
            try {
                if (_0x3f6480) {
                    console.log("" + JSON.stringify(_0x3f6480));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    let _0xb3c539 = JSON.parse(_0x2ad540);

                    if (_0xb3c539.subCode == 0) {
                        let _0x475316 = _0x2ad540.match(/"quantity":(\d+?),/i) ? _0x2ad540.match(/"quantity":(\d+?),/i)[1] : 0;

                        $.log("恭喜获得：" + _0x475316 + "京豆");
                    } else {
                        if (_0xb3c539.msg.includes("已完成")) {
                            $.log("103-任务已完成");
                        } else {
                            if (_0xb3c539.msg.includes("未通过")) {
                                $.log("风险等级未通过");
                            }
                        }
                    }
                }
            } catch (_0x27eff3) {
                $.logErr(_0x27eff3, _0x489730);
            } finally {
                _0x557dee(_0x2ad540);
            }
        });
    });
}

function _0x3adea3(_0x4a8f1d, _0x592e32) {
    const _0x4d98e8 = {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x549e38
    };
    const _0x871822 = {
        "url": "https://api.m.jd.com/client.action",
        "body": "functionId=" + _0x4a8f1d + "&" + _0x592e32,
        "headers": _0x4d98e8
    };
    return _0x871822;
}

function _0x43b3fa() {
    return new Promise(_0x2be5be => {
        const _0xd04a16 = {
            "Cookie": _0x549e38,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x5a7475 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0xd04a16,
            "timeout": 10000
        };
        $.get(_0x5a7475, (_0x3ae84a, _0x3779be, _0x39562f) => {
            try {
                if (_0x39562f) {
                    _0x39562f = JSON.parse(_0x39562f);

                    if (!(_0x39562f.islogin === "1")) {
                        _0x39562f.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x277157) {
                console.log(_0x277157);
            } finally {
                _0x2be5be();
            }
        });
    });
}

function _0x4092ea() {
    return new Promise(_0x603057 => {
        const _0x40b375 = {
            "User-Agent": $.UA
        };
        const _0x1e2582 = {
            "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
            "headers": _0x40b375,
            "timeout": 10000
        };
        $.get(_0x1e2582, (_0x3f7590, _0xa7ae2b, _0x252e0f) => {
            try {
                _0x252e0f && (_0x252e0f = JSON.parse(_0x252e0f), $.difftime = Date.now() - _0x252e0f.timestamp);
            } catch (_0x503b8b) {
                console.log(_0x503b8b);
            } finally {
                _0x603057();
            }
        });
    });
}

function _0x2497c3() {
    return new Promise(_0x365390 => {
        !_0x3883e4 ? $.msg($.name, "", "" + _0x11b1bb) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x11b1bb);

        _0x365390();
    });
}

function _0x4d474c(_0xc88957) {
    try {
        if (typeof JSON.parse(_0xc88957) == "object") {
            return true;
        }
    } catch (_0x44614b) {
        console.log(_0x44614b);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x521580(_0x220742) {
    if (typeof _0x220742 == "string") {
        try {
            return JSON.parse(_0x220742);
        } catch (_0x1c6e44) {
            console.log(_0x1c6e44);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }