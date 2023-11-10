
/*
统计转赚红包和特价抽现金提现金额
1 1 11 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_txtotal.js
updatetime:2023/11/05
 */

const $ = new Env('抽现金提现统计');
const _0xdf3433 = $.isNode() ? require("./jdCookie.js") : "",
    _0x27a34c = require("./function/dylanz"),
    _0x41e40d = require("./USER_AGENTS");

let _0x18aa25 = true,
    _0x397f10 = [],
    _0x2eb406 = "",
    _0x42e0b8 = "";

if (process.env.DY_PROXY) {
    const _0x35a7b4 = require("./function/proxy.js");

    $.get = _0x35a7b4.intoRequest($.get.bind($));
    $.post = _0x35a7b4.intoRequest($.post.bind($));
}

if ($.isNode()) {
    Object.keys(_0xdf3433).forEach(_0x31f980 => {
        _0x397f10.push(_0xdf3433[_0x31f980]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x397f10 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3613e7($.getdata("CookiesJD") || "[]").map(_0x222d52 => _0x222d52.cookie)].filter(_0x3d6668 => !!_0x3d6668);
}

!(async () => {
    if (!_0x397f10[0]) {
        const _0x21a258 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x21a258);
        return;
    }

    $.log("当前版本：3.0.0 新增每日红包统计");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    console.log("\n\n当前统计" + (new Date().getMonth() + 1) + "月份，每月每个微信总提现500额度！！！");
    console.log("数据较多，不代理可能会403，支持代理API");

    for (let _0x458b79 = 0; _0x458b79 < _0x397f10.length; _0x458b79++) {
        if (_0x397f10[_0x458b79]) {
            _0x2eb406 = _0x397f10[_0x458b79];
            $.UserName = decodeURIComponent(_0x2eb406.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2eb406.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x458b79 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            tjtotaltx = [];
            zztotaltx = [];
            mrhbtaltx = [];
            $.txj = true;
            $.fg = 1;
            $.nocashnum = 0;
            $.UA = _0x41e40d.UARAM ? _0x41e40d.UARAM() : _0x41e40d.USER_AGENT;
            await _0x68f464();
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");
            $.linkid = "3orGfh1YkwNLksxOcN8zWQ";
            console.log("开始统计转赚红包已提现...");
            $.bian = false;

            for (let _0x339a86 = 0; _0x339a86 < 500; _0x339a86++) {
                if ($.bian) {
                    break;
                }

                await _0x45ce1e(_0x339a86 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0x24f24b of $.baglist) {
                    if (_0x24f24b.prizeType == 4) {
                        if (!(_0x24f24b.state == 0)) {
                            if (_0x24f24b.state == 3) {
                                new Date(_0x24f24b.startTime).getMonth() == new Date().getMonth() && zztotaltx.push(Number(_0x24f24b.amount));

                                if (new Date(_0x24f24b.startTime).getMonth() < new Date().getMonth()) {
                                    $.bian = true;
                                    break;
                                }
                            } else {
                                if (_0x24f24b.state == 2 || _0x24f24b.state == 4) {
                                    if (new Date(_0x24f24b.startTime).getMonth() < new Date().getMonth()) {
                                        $.bian = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let _0x3abe26 = zztotaltx.reduce((_0x20a70f, _0x1fc651) => _0x20a70f + _0x1fc651 * 100, 0) / 100;

            zztotaltx.length !== 0 && $.log("转赚红包已提现：" + _0x3abe26 + "元");
            $.linkid = "Wvzc_VpNTlSkiQdHT8r7QA";
            console.log("\n开始统计特价抽现金已提现...");
            $.bian = false;

            for (let _0x254c00 = 0; _0x254c00 < 500; _0x254c00++) {
                if ($.bian) {
                    break;
                }

                await _0x45ce1e(_0x254c00 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0xb403ef of $.baglist) {
                    if (_0xb403ef.prizeType == 4) {
                        if (!(_0xb403ef.state == 0)) {
                            if (_0xb403ef.state == 3) {
                                new Date(_0xb403ef.startTime).getMonth() == new Date().getMonth() && tjtotaltx.push(Number(_0xb403ef.amount));

                                if (new Date(_0xb403ef.startTime).getMonth() < new Date().getMonth()) {
                                    $.bian = true;
                                    break;
                                }
                            } else {
                                if (_0xb403ef.state == 2 || _0xb403ef.state == 4) {
                                    if (new Date(_0xb403ef.startTime).getMonth() < new Date().getMonth()) {
                                        $.bian = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let _0x51dec9 = tjtotaltx.reduce((_0x29ac1b, _0x45dc84) => _0x29ac1b + _0x45dc84 * 100, 0) / 100;

            tjtotaltx.length !== 0 && $.log("特价抽现金已提现：" + _0x51dec9 + "元");
            $.linkid = "EcuVpjGGfccY3Ic_1ni83w";
            console.log("\n开始统计每日红包已提现...");
            $.bian = false;

            for (let _0x263947 = 0; _0x263947 < 500; _0x263947++) {
                if ($.bian) {
                    break;
                }

                await _0x45ce1e(_0x263947 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0x4848a3 of $.baglist) {
                    if (_0x4848a3.prizeType == 4) {
                        if (!(_0x4848a3.state == 0)) {
                            if (_0x4848a3.state == 3) {
                                new Date(_0x4848a3.startTime).getMonth() == new Date().getMonth() && mrhbtaltx.push(Number(_0x4848a3.amount));

                                if (new Date(_0x4848a3.startTime).getMonth() < new Date().getMonth()) {
                                    $.bian = true;
                                    break;
                                }
                            } else {
                                if (_0x4848a3.state == 2 || _0x4848a3.state == 4) {
                                    if (new Date(_0x4848a3.startTime).getMonth() < new Date().getMonth()) {
                                        $.bian = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            let _0x138837 = mrhbtaltx.reduce((_0x1bb32f, _0x47c4e1) => _0x1bb32f + _0x47c4e1 * 100, 0) / 100;

            mrhbtaltx.length !== 0 && $.log("特价抽现金已提现：" + _0x138837.toFixed(2) + "元");
            console.log("\n总提现：" + (_0x3abe26 + _0x51dec9 + _0x138837) + "元");
            await $.wait(2000);
        }
    }
})().catch(_0x2d3960 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2d3960 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x45ce1e(_0x103f2e) {
    const _0x26b07e = {
        pageNum: _0x103f2e,
        pageSize: 100,
        linkId: $.linkid,
        business: "fission"
    };
    let _0xfa830b = _0x26b07e,
        _0x2b0ada = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0xfa830b,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0xfa830b = await _0x27a34c.getbody(_0x2b0ada);

    if (!_0xfa830b) {
        return;
    }

    return new Promise(async _0x1bf2d2 => {
        $.get(_0x2e16e6(_0xfa830b), async (_0x1946d3, _0x4b5d00, _0x1bc7b4) => {
            try {
                _0x1946d3 ? (console.log("" + JSON.stringify(_0x1946d3)), console.log(" API请求失败，请检查网路重试")) : (_0x1bc7b4 = JSON.parse(_0x1bc7b4), _0x1bc7b4.code == 0 ? ($.baglist = _0x1bc7b4.data.items, $.totalpage = _0x1bc7b4.data.totalPage) : console.log(_0x1bc7b4.errMsg));
            } catch (_0x276523) {
                $.logErr(_0x276523, _0x4b5d00);
            } finally {
                _0x1bf2d2(_0x1bc7b4);
            }
        });
    });
}

function _0x2e16e6(_0xecde30) {
    const _0x2e5ec0 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x2eb406
    };
    const _0x742def = {
        url: "https://api.m.jd.com/?" + _0xecde30,
        headers: _0x2e5ec0
    };
    return _0x742def;
}

function _0x68f464() {
    return new Promise(_0x44e41e => {
        const _0x3f8672 = {
            Cookie: _0x2eb406,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x36e148 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x3f8672,
            timeout: 10000
        };
        $.get(_0x36e148, (_0x4aee8b, _0x2e3645, _0x355a2c) => {
            try {
                if (_0x355a2c) {
                    _0x355a2c = JSON.parse(_0x355a2c);

                    if (!(_0x355a2c.islogin === "1")) {
                        _0x355a2c.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x5d3ead) {
                console.log(_0x5d3ead);
            } finally {
                _0x44e41e();
            }
        });
    });
}

function _0x9a209b() {
    return new Promise(_0x26220b => {
        !_0x18aa25 ? $.msg($.name, "", "" + _0x42e0b8) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x42e0b8);

        _0x26220b();
    });
}

function _0x48dc10(_0x4da6bd) {
    try {
        if (typeof JSON.parse(_0x4da6bd) == "object") {
            return true;
        }
    } catch (_0x1fa56e) {
        console.log(_0x1fa56e);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x3613e7(_0x5da850) {
    if (typeof _0x5da850 == "string") {
        try {
            return JSON.parse(_0x5da850);
        } catch (_0x39507b) {
            console.log(_0x39507b);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }