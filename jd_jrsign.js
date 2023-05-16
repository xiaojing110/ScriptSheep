/*
金融签到，领取双签礼包
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jrsign.js
只运行前10，多了也是黑ip
updatetime:2023/04/19 
* */

const $ = new Env('金融签到');
const _0x4b87bf = $.isNode() ? require("jsdom") : "",
    _0x14ad77 = "https://ms.jr.jd.com/gw/generic/hy/h5/m",
    _0x4236e4 = $.isNode() ? require("./sendNotify") : "",
    _0x1bb28e = $.isNode() ? require("./jdCookie.js") : "";

let _0x4ffc6e = [],
    _0x5641f9 = "";

if ($.isNode()) {
    Object.keys(_0x1bb28e).forEach(_0x148fdf => {
        _0x4ffc6e.push(_0x1bb28e[_0x148fdf]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x4ffc6e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x37b69d($.getdata("CookiesJD") || "[]").map(_0x4e35e5 => _0x4e35e5.cookie)].filter(_0x3e0131 => !!_0x3e0131);
}

!(async () => {
    if (!_0x4ffc6e[0]) {
        const _0x219c80 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x219c80);
        return;
    }

    console.log("只跑前10，多了也是黑ip！！！");
    $.getid = {};
    await _0x6c482c();

    if (JSON.stringify($.getid) == "{}") {
        $.getid.jstub = "BW6T4437AB2RMXKMPMWZOV3PBU6KWRQV2GIOLTKZKUEYGJ44RCKTUZXGZQ7N553SU4HPEDYDHP7B6SWDOVCGYDKRQTC3NGZC2OCTQ5Q";
        $.getid.sdkToken = "";
        $.getid.token = "4NZZKHI4EJTZ5OP4Y7S7B4WZBA243SHJSMLKFKPWIX4G27GYSEZU2XJKGBOQERJIDIIWEUF7ILI2M";
    }

    $.getid.eid = "";

    for (let _0x458d00 = 0; _0x458d00 < "10"; _0x458d00++) {
        if (_0x4ffc6e[_0x458d00]) {
            _0x5641f9 = _0x4ffc6e[_0x458d00];
            $.UserName = decodeURIComponent(_0x5641f9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5641f9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x458d00 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.stopNext = false;
            $.getid.fp = _0x28f325("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x39fa5b();
            console.log("\n***********开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "********\n");

            if (!$.isLogin) {
                const _0x232dd9 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x232dd9);
                $.isNode() && (await _0x4236e4.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x126905();
            await $.wait(10000);
        }
    }
})().catch(_0x1fbe03 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1fbe03 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x126905() {
    await _0x180923();
    await $.wait(500);
    await _0x977cc9();
    await $.wait(500);
    await _0x128fb5();
}

function _0x180923() {
    const _0x29b3bf = {
        "channel": "sy",
        "channelLv": "sy"
    };
    body = _0x29b3bf;
    return new Promise(async _0x15287a => {
        $.post(_0x609fd("getRSAPubKey", body), (_0x2852eb, _0x242266, _0x52ef64) => {
            try {
                _0x2852eb ? (console.log("" + JSON.stringify(_0x2852eb)), console.log("getRSAPubKey API请求失败，请检查网路重试")) : _0x52ef64 ? (_0x52ef64 = JSON.parse(_0x52ef64), _0x52ef64.resultData && _0x52ef64.resultCode === 0 && ($.rsaKey = _0x52ef64.resultData.resBusiData)) : console.log("京东服务器返回空数据");
            } catch (_0x1ba164) {
                $.logErr(_0x1ba164, _0x242266);
            } finally {
                _0x15287a();
            }
        });
    });
}

function _0x56f7c0() {
    const _0x247388 = {
        "channelSource": "JRAPP6.0",
        "riskDeviceParam": "{\"eid\":\"\",\"fp\":\"\",\"sdkToken\":\"\",\"token\":\"\"}",
        "site": "JD_JR_APP",
        "channel": "sy",
        "channelLv": "sy"
    };
    body = _0x247388;
    return new Promise(async _0x2d6051 => {
        $.post(_0x609fd("querySignCalendar", body), (_0x2acacb, _0x34bc53, _0x3ff48c) => {
            try {
                if (_0x2acacb) {
                    console.log("" + JSON.stringify(_0x2acacb));
                    console.log("queryDrawChance API请求失败，请检查网路重试");
                } else {
                    _0x3ff48c ? (_0x3ff48c = JSON.parse(_0x3ff48c), _0x3ff48c.resultData && _0x3ff48c.resultCode === 0 && ($.noa = _0x3ff48c.resultData.resBusiData.noa)) : console.log("京东服务器返回空数据");
                }
            } catch (_0x2e2f71) {
                $.logErr(_0x2e2f71, _0x34bc53);
            } finally {
                _0x2d6051();
            }
        });
    });
}

function _0x977cc9() {
    let _0x59a1dc = $.ar2.nonce(),
        _0x28fb9e = {
            "videoId": "311372930347370496",
            "channelSource": "JRAPP6.0",
            "noa": _0x59a1dc
        };

    $.cry.setPublicKeyString($.rsaKey);
    let _0x12d6d9 = $.cry.encryptData(JSON.stringify(_0x28fb9e)).cipher;
    const _0x5b49c2 = {
        ...$.getid
    };
    let _0xf83a14 = {
        "site": "JD_JR_APP",
        "videoId": "311372930347370496",
        "channelSource": "JRAPP6.0",
        "encryptData": _0x12d6d9,
        "riskDeviceParam": _0x5b49c2,
        "deviceInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "adInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "clientType": "android",
        "arrEncrypt": true
    };
    sign = $.ar2.sign(JSON.stringify(_0xf83a14), _0x59a1dc);
    const _0x5ef5c5 = {
        ...$.getid
    };
    body = {
        "site": "JD_JR_APP",
        "videoId": "311372930347370496",
        "channelSource": "JRAPP6.0",
        "encryptData": _0x12d6d9,
        "riskDeviceParam": JSON.stringify(_0x5ef5c5),
        "deviceInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "adInfo": JSON.stringify({
            "deviceId": "",
            "clientType": "android",
            "user_agent": $.UA,
            "iosType": "android",
            "osv": "12",
            "brand": "Redmi",
            "hwv": "",
            "network": 1,
            "mac": "",
            "androidId": "",
            "oaid": ""
        }),
        "clientType": "android",
        "arrEncrypt": true,
        "signData": JSON.stringify(_0xf83a14),
        "signature": sign,
        "nonce": _0x59a1dc,
        "channel": "sy",
        "channelLv": "sy"
    };
    return new Promise(async _0x4c8555 => {
        $.post(_0x609fd("jrSign", body), (_0x4deba5, _0x1213e0, _0x48d531) => {
            try {
                if (_0x4deba5) {
                    console.log("" + JSON.stringify(_0x4deba5));
                    console.log("jrSign API请求失败，请检查网路重试");
                } else {
                    if (_0x48d531) {
                        _0x48d531 = JSON.parse(_0x48d531);

                        if (_0x48d531.resultData && _0x48d531.resultCode === 0) {
                            if (_0x48d531.resultData.resBusiCode == 0) {
                                console.log("签到成功！");
                            } else {
                                _0x48d531.resultData.resBusiCode == 15 ? console.log("今日已签到！") : console.log(_0x48d531.resultData.resBusiMsg);
                            }
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x59952b) {
                $.logErr(_0x59952b, _0x1213e0);
            } finally {
                _0x4c8555();
            }
        });
    });
}

function _0x128fb5(_0x551717 = false) {
    let _0x1fa8c1 = $.ar2.nonce(),
        _0x1f9963 = Date.now(),
        _0x56a97c = $.ar2.sign(JSON.stringify({
            "t": _0x1f9963
        }), _0x1fa8c1),
        _0x1bd794 = {
            "channel": "JD",
            "actCode": "F68B2C3E71",
            "type": 4,
            "frontParam": {
                "channel": "JD",
                "belong": "jingdou",
                "signData": JSON.stringify({
                    "t": _0x1f9963
                }),
                "nonce": _0x1fa8c1,
                "signature": _0x56a97c,
                "riskDeviceParam": {
                    ...$.getid
                }
            },
            "riskDeviceParam": {}
        },
        _0x247855 = {
            "url": "https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?_=" + new Date().getTime(),
            "headers": {
                "Host": "nu.jr.jd.com",
                "Accept": "application/json",
                "User-Agent": $.UA,
                "Origin": "https://m.jr.jd.com",
                "Referer": "https://m.jr.jd.com/",
                "cookie": _0x5641f9,
                "X-Requested-With": "com.jingdong.app.mall"
            },
            "body": "reqData=" + encodeURIComponent(JSON.stringify(_0x1bd794))
        };

    return new Promise(async _0x206ccf => {
        $.post(_0x247855, (_0x3de34c, _0x712a6f, _0x159586) => {
            try {
                if (_0x3de34c) {
                    console.log("" + JSON.stringify(_0x3de34c));
                    console.log("signaward API请求失败，请检查网路重试");
                } else {
                    if (_0x159586) {
                        _0x159586 = JSON.parse(_0x159586);

                        if (_0x159586.resultData && _0x159586.resultCode === 0) {
                            if (_0x159586.resultData.data.businessData.businessCode == "000sq") {
                                console.log("双签礼包：" + _0x159586.resultData.data.businessData.businessData.awardListVo[0].name);
                            } else {
                                console.log("双签礼包：" + _0x159586.resultData.data.businessData.businessMsg);
                            }
                        }
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x7dcf79) {
                $.logErr(_0x7dcf79, _0x712a6f);
            } finally {
                _0x206ccf();
            }
        });
    });
}

function _0x39fa5b() {
    return new Promise(_0x453d9f => {
        const _0x1a88d6 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {},
            "timeout": 10000
        };
        _0x1a88d6.headers.Cookie = _0x5641f9;
        _0x1a88d6.headers.referer = "https://h5.m.jd.com/";
        _0x1a88d6.headers["User-Agent"] = $.UA;
        $.get(_0x1a88d6, (_0x5d335f, _0xbdd5de, _0x273398) => {
            try {
                if (_0x273398) {
                    _0x273398 = JSON.parse(_0x273398);

                    if (!(_0x273398.islogin === "1")) {
                        if (_0x273398.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0x34c03d) {
                console.log(_0x34c03d);
            } finally {
                _0x453d9f();
            }
        });
    });
}

function _0x609fd(_0x1a7464, _0x300b61) {
    const _0x2539ab = {
        "Host": "ms.jr.jd.com",
        "Accept": "application/json",
        "User-Agent": $.UA,
        "Origin": "https://member.jr.jd.com",
        "Referer": "https://member.jr.jd.com/",
        "cookie": _0x5641f9
    };
    return {
        "url": _0x14ad77 + "/" + _0x1a7464,
        "headers": _0x2539ab,
        "body": "reqData=" + encodeURIComponent(JSON.stringify(_0x300b61))
    };
}

async function _0x6c482c() {
    const {
        JSDOM: _0x32a6f3
    } = _0x4b87bf;

    let _0x53f54e = new _0x4b87bf.ResourceLoader({
        "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
        "referer": "https://u.jr.jd.com/"
    });

    let _0x4b37f5 = new _0x4b87bf.VirtualConsole();

    const _0x523bb1 = {
        "url": "https://u.jr.jd.com/uc-fe-wxgrowing/18-quan-yi-day/index.html",
        "referer": "https://u.jr.jd.com/",
        "userAgent": "Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36",
        "runScripts": "dangerously",
        "resources": _0x53f54e,
        "includeNodeLocations": true,
        "storageQuota": 10000000,
        "pretendToBeVisual": true,
        "virtualConsole": _0x4b37f5
    };

    const _0x3ff914 = new _0x32a6f3("<body>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js\"></script>\n  <script src=\"https://m.jr.jd.com/common/jssdk/jrbridge/2.0.0/jrbridge.js\"></script>\n  <script src=\"https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js\"></script>\n  <script src=\"//gia.jd.com/m.html\"></script>\n  <script src=\"//gias.jd.com/js/m.js\"></script>\n  </body>", _0x523bb1);

    await $.wait(1500);

    try {
        $.getid = _0x3ff914.window.getJdEid();

        _0x3ff914.window.AAR2.init();

        $.ar2 = new _0x3ff914.window.AAR2();
        $.cry = _0x3ff914.window.cryptico;
    } catch (_0x289af4) {
        $.log("\n请求失败，换个时间再试试！！！");
        process.exit(11);
    }
}

function _0x37b69d(_0x19c547) {
    if (typeof _0x19c547 == "string") {
        try {
            return JSON.parse(_0x19c547);
        } catch (_0x53a375) {
            console.log(_0x53a375);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x28f325(_0x51c6aa = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x3a2e85 = 0) {
    return _0x51c6aa.replace(/[xy]/g, function (_0x35d81f) {
        var _0x4fe061 = Math.random() * 16 | 0,
            _0x1d263b = _0x35d81f == "x" ? _0x4fe061 : _0x4fe061 & 3 | 8;

        _0x3a2e85 ? uuid = _0x1d263b.toString(36).toUpperCase() : uuid = _0x1d263b.toString(36);
        return uuid;
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
