/*
12 1,16 * * * jd_qmLottery.js
*/
const $ = new Env('全民大乐透抽奖');
const _0x42703a = $.isNode() ? require("./jdCookie.js") : "",
    _0x3633c0 = $.isNode() ? require("./sendNotify") : "",
    _0x314571 = require("./function/dylanz"),
    _0x43b217 = require("./USER_AGENTS");

let _0x161a3f = [],
    _0x4fafec = "";

if ($.isNode()) {
    Object.keys(_0x42703a).forEach(_0x278553 => {
        _0x161a3f.push(_0x42703a[_0x278553]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x161a3f = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x241de1($.getdata("CookiesJD") || "[]").map(_0x390df8 => _0x390df8.cookie)].filter(_0x32224d => !!_0x32224d);
}

$.invitePinTaskList = [];
$.invitePin = [];
message = "";
!(async () => {
    if (!_0x161a3f[0]) {
        const _0x49c427 = {
            "open-url": "https://bean.m.jd.com/"
        };
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x49c427);
        return;
    }

    $.log("TG反馈：https://t.me/dylan_jdpro");

    for (let _0x31a74c = 0; _0x31a74c < _0x161a3f.length; _0x31a74c++) {
        _0x4fafec = _0x161a3f[_0x31a74c];

        if (_0x4fafec) {
            $.UserName = decodeURIComponent(_0x4fafec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4fafec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x31a74c + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            $.UA = _0x43b217.UARAM ? _0x43b217.UARAM() : _0x43b217.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                const _0x28fbbd = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x28fbbd);

                if ($.isNode()) {
                    await _0x3633c0.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            await _0x19ab94();

            if (!$.taskList) {
                continue;
            }

            for (let _0x1a0767 of $.taskList) {
                if (_0x1a0767.taskFinished == true) {
                    console.log(_0x1a0767.taskShowTitle + "---已完成");
                    continue;
                }

                if (_0x1a0767.taskShowTitle.includes("订单")) {
                    continue;
                }

                console.log("去做 " + _0x1a0767.taskShowTitle);

                for (let _0x248f0a = 0; _0x248f0a < _0x1a0767.taskLimitTimes - _0x1a0767.taskDoTimes; _0x248f0a++) {
                    let _0x5a96e8 = await _0x416ac7(_0x1a0767.taskType, _0x1a0767.id);

                    _0x5a96e8?.["data"]?.["taskItemList"] ? (await _0x15c8b6(_0x1a0767.id, _0x1a0767.taskType, _0x5a96e8.data.taskItemList[_0x248f0a].itemId), await $.wait(1000)) : $.log("获取任务资源失败!");
                }
            }

            await _0x199d8c();
            console.log("\n开始抽奖" + $.lotterytimes + "次...");

            for (let _0x56c318 of Array($.lotterytimes)) {
                await _0x5d5e01();
                await $.wait(2000);
            }
        }
    }

    await $.wait(2000);
})().catch(_0x9acc9b => $.logErr(_0x9acc9b)).finally(() => $.done());

async function _0x199d8c() {
    const _0x45938a = {
        linkId: "p_HAvgmOZnWOyRb-2ZJkVA",
        taskId: "",
        inviter: "",
        inJdApp: true
    };
    let _0x23020e = _0x45938a,
        _0x4d5c40 = {
            appId: "d7439",
            fn: "lotteryMachineHome",
            body: _0x23020e,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x23020e = await _0x314571.getbody(_0x4d5c40);

    if (!_0x23020e) {
        return;
    }

    return new Promise(_0x5d51b4 => {
        $.post(_0x13f04b(_0x23020e, "lotteryMachineHome"), async (_0x1b9346, _0xb725e7, _0x54e94e) => {
            try {
                _0x1b9346 ? (console.log("" + JSON.stringify(_0x1b9346)), console.log("homeinfo请求失败，请检查网路重试")) : (_0x54e94e = JSON.parse(_0x54e94e), $.lotterytimes = _0x54e94e.data.remainTimes);
            } catch (_0x4ceeaa) {
                $.logErr(_0x4ceeaa, _0xb725e7);
            } finally {
                _0x5d51b4(_0x54e94e);
            }
        });
    });
}

function _0x416ac7(_0x394e33, _0x4daa5c) {
    const _0x2b93fd = {
        taskType: _0x394e33,
        taskId: _0x4daa5c,
        channel: 4,
        checkVersion: true,
        cityId: 0,
        provinceId: 0,
        countyId: 0,
        linkId: "p_HAvgmOZnWOyRb-2ZJkVA"
    };
    const _0x6e49ce = {
        "User-Agent": $.UA,
        Host: "api.m.jd.com",
        Origin: "https://pro.m.jd.com",
        Referer: "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
        Cookie: _0x4fafec
    };
    let _0x161125 = {
        url: "https://api.m.jd.com/api?functionId=apTaskDetail&body=" + JSON.stringify(_0x2b93fd) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0",
        headers: _0x6e49ce
    };
    return new Promise(_0x21ffd3 => {
        $.get(_0x161125, async (_0x2f63b, _0x346013, _0xbbc893) => {
            try {
                _0x2f63b ? (console.log("" + JSON.stringify(_0x2f63b)), console.log("homeinfo请求失败，请检查网路重试")) : _0xbbc893 = JSON.parse(_0xbbc893);
            } catch (_0x1ce25d) {
                $.logErr(_0x1ce25d, _0x346013);
            } finally {
                _0x21ffd3(_0xbbc893);
            }
        });
    });
}

function _0x19ab94() {
    const _0x1efbc9 = {
        "User-Agent": $.UA,
        Host: "api.m.jd.com",
        Origin: "https://pro.m.jd.com",
        Referer: "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
        Cookie: _0x4fafec
    };
    let _0x46c34a = {
        url: "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22p_HAvgmOZnWOyRb-2ZJkVA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0",
        headers: _0x1efbc9
    };
    return new Promise(_0x19fc96 => {
        $.get(_0x46c34a, async (_0x865c7f, _0x44f6fb, _0x208027) => {
            try {
                _0x865c7f ? (console.log("" + JSON.stringify(_0x865c7f)), console.log("homeinfo请求失败，请检查网路重试")) : (_0x208027 = JSON.parse(_0x208027), $.taskList = _0x208027.data);
            } catch (_0xdb5663) {
                $.logErr(_0xdb5663, _0x44f6fb);
            } finally {
                _0x19fc96(_0x208027);
            }
        });
    });
}

async function _0x15c8b6(_0x140f83, _0x353e8c, _0x4711ad = "", _0x26e5f7 = "activities_platform") {
    let _0xee33a = "{\"linkId\":\"p_HAvgmOZnWOyRb-2ZJkVA\",\"taskInsert\":true,\"taskType\":\"" + _0x353e8c + "\",\"taskId\":" + _0x140f83 + ",\"channel\":4,\"checkVersion\":true,\"cityId\": 0, \"provinceId\": 0, \"countyId\": 0,\"itemId\":\"" + encodeURIComponent(_0x4711ad) + "\"}",
        _0x1a2efe = {
            appId: "54ed7",
            fn: "apsDoTask",
            body: _0xee33a,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };

    _0xee33a = await _0x314571.getbody(_0x1a2efe);

    if (!_0xee33a) {
        return;
    }

    return new Promise(_0x52267c => {
        $.post(_0x13f04b(_0xee33a, "apsDoTask"), async (_0x5cab0c, _0x9eaa33, _0x3c36d9) => {
            try {
                _0x5cab0c ? (console.log("" + JSON.stringify(_0x5cab0c)), console.log("dotask 请求失败，请检查网路重试")) : (_0x3c36d9 = JSON.parse(_0x3c36d9), _0x3c36d9.code == 0 ? _0x3c36d9.data.finished && console.log("任务完成，获得抽奖次数+1") : console.log(_0x3c36d9.errMsg));
            } catch (_0xe425ab) {
                $.logErr(_0xe425ab, _0x9eaa33);
            } finally {
                _0x52267c(_0x3c36d9);
            }
        });
    });
}

function _0x5d5e01() {
    return new Promise(_0x156de1 => {
        $.post(_0x13f04b("functionId=lotteryMachineDraw&body={\"linkId\":\"p_HAvgmOZnWOyRb-2ZJkVA\"}&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", "lotteryMachineDraw"), async (_0x31e723, _0x4b24a1, _0x31aa5c) => {
            try {
                if (_0x31e723) {
                    console.log("" + JSON.stringify(_0x31e723));
                    console.log("dotask 请求失败，请检查网路重试");
                } else {
                    _0x31aa5c = JSON.parse(_0x31aa5c);

                    if (_0x31aa5c.code == 0) {
                        if (_0x31aa5c.data.prizeConfigName) {
                            if (_0x31aa5c.data.prizeType == 2) {
                                console.log("获得 " + _0x31aa5c.data.prizeConfigName + "🧧");
                            } else {
                                _0x31aa5c.data.prizeType == 1 ? console.log("获得 优惠券") : console.log(JSON.stringify(_0x31aa5c));
                            }
                        }
                    } else {
                        console.log(JSON.stringify(_0x31aa5c));
                    }
                }
            } catch (_0x331547) {
                $.logErr(_0x331547, _0x4b24a1);
            } finally {
                _0x156de1(_0x31aa5c);
            }
        });
    });
}

function _0x13f04b(_0x2d1ad0, _0x41db19) {
    const _0x4cb772 = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "api.m.jd.com",
        Origin: "https://pro.m.jd.com",
        Referer: "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
        Cookie: _0x4fafec
    };
    const _0x5ae7dc = {
        url: "https://api.m.jd.com/api",
        body: _0x2d1ad0,
        headers: _0x4cb772
    };
    return _0x5ae7dc;
}

function _0xcb538(_0x3f1ff4) {
    _0x3f1ff4 = _0x3f1ff4 || 32;
    let _0x10df62 = "abcdef0123456789",
        _0x3628f8 = _0x10df62.length,
        _0x55b24a = "";

    for (i = 0; i < _0x3f1ff4; i++) {
        _0x55b24a += _0x10df62.charAt(Math.floor(Math.random() * _0x3628f8));
    }

    return _0x55b24a;
}

function _0x241de1(_0x54c477) {
    if (typeof _0x54c477 == "string") {
        try {
            return JSON.parse(_0x54c477);
        } catch (_0x4a0980) {
            console.log(_0x4a0980);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }