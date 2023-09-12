/*
3 2 * * * jd_dzz.js
 */
const $ = new Env('宿舍大作战');
const _0x1e296c = $.isNode() ? require("./sendNotify") : "",
    _0x3f1a0a = $.isNode() ? require("./jdCookie.js") : "",
    _0x1cbb57 = require("./function/dylank"),
    _0x3b30d0 = require("./USER_AGENTS");

let _0x2eac40 = [];

if ($.isNode()) {
    if (process.env.jd_szxyun_teamId) {
        $.teamId = process.env.jd_szxyun_teamId;
    }

    if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
        process.exit(0);
    }

    Object.keys(_0x3f1a0a).forEach(_0x301f3e => {
        _0x2eac40.push(_0x3f1a0a[_0x301f3e]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x2eac40 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x3f522c => _0x3f522c.cookie)].filter(_0x1e613d => !!_0x1e613d);
}

let _0x57a957 = "https://xinrui-isv.isvjcloud.com",
    _0xa1b72a = "https://xinrui-isv.isvjcloud.com/school/?share_type=invite&inviter_token=40106&source=&vip=0&sid=&un_area=4_133_58530_0",
    _0x3abe79 = "",
    _0x3101b4 = "6myeMAtP",
    _0x49dd0f = typeof $request !== "undefined";

_0x49dd0f && (GetCookie(), $.done());
!(async () => {
    if (!_0x2eac40[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let _0x335310 = 0; _0x335310 < _0x2eac40.length; _0x335310++) {
        if (_0x2eac40[_0x335310]) {
            _0x3abe79 = _0x2eac40[_0x335310];
            $.ownCookie = _0x2eac40[_0x335310];
            $.UserName = decodeURIComponent(_0x3abe79.match(/pt_pin=(.+?);/) && _0x3abe79.match(/pt_pin=(.+?);/)[1]);
            $.index = _0x335310 + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

            if (!$.isLogin) {
                const _0x4b224f = {
                    "open-url": "https://bean.m.jd.com/"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", _0x4b224f);
                $.isNode() && (await _0x1e296c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            $.UA = _0x3b30d0.UARAM();
            await _0x1d387d();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));

            if ($.hasEnd || $.activityEnd) {
                break;
            }
        }
    }
})().catch(_0x27f871 => {
    $.log("", " " + $.name + ", 失败! 原因: " + _0x27f871 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x1d387d() {
    $.token = "";
    krhot = false;
    kruser = false;
    $.token = await _0x1cbb57(_0x3abe79, _0x57a957);

    if ($.token == "") {
        console.log("获取[token]失败！");
        return;
    }

    await _0x5e24ca();

    if (!krhot) {
        await _0x18c9f0();

        if (!kruser) {
            await _0x18c9f0();
            console.log("抽奖次数为" + $.coins + "次");

            for (m = 1; $.coins--; m++) {
                await _0xfbaa88();

                if (Number($.coins) <= 0) {
                    break;
                }

                if (m >= 5) {
                    break;
                }

                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
        }
    }
}

function _0x5e24ca() {
    return new Promise(_0xfa8095 => {
        const _0x3b0b4c = {
            "url": _0x57a957 + "/auth/jos?token=" + $.token + "&jd_source=01&source=test&is_share=1",
            "headers": {
                "Host": "xinrui-isv.isvjcloud.com",
                "App-Key": _0x3101b4,
                "Content-Type": "application/json",
                "Origin": _0x57a957,
                "User-Agent": $.UA,
                "Referer": _0xa1b72a,
                "Cookie": _0x3abe79
            },
            "timeout": 30000
        };
        $.post(_0x3b0b4c, async (_0x29e8d3, _0x25635, _0x5438e1) => {
            try {
                _0x5438e1 = JSON.parse(_0x5438e1);

                if (_0x5438e1) {
                    if (_0x5438e1.status == 0) {
                        $.Authorization = _0x5438e1?.["body"]?.["access_token"];
                    } else {
                        console.log(_0x5438e1.message);
                        krhot = true;
                    }
                }
            } catch (_0x4a8672) {
                $.logErr(_0x4a8672, _0x25635);
            } finally {
                _0xfa8095();
            }
        });
    });
}

async function _0x18c9f0() {
    let _0x2b360e = {
        "url": _0x57a957 + "/jd-school-room-api/api/info?is_share=0&channel=2",
        "headers": {
            "Host": "xinrui-isv.isvjcloud.com",
            "Accept": "application/json, text/plain, */*",
            "App-Key": _0x3101b4,
            "Content-Type": "application/json",
            "Authorization": "Bearer " + $.Authorization,
            "Origin": "https://pro.m.jd.com",
            "User-Agent": $.UA,
            "Referer": _0xa1b72a,
            "Cookie": _0x3abe79
        },
        "timeout": 30000
    };
    return new Promise(_0x1e6948 => {
        $.get(_0x2b360e, async (_0x2b47a6, _0x433832, _0x4a5212) => {
            try {
                _0x4a5212 = JSON.parse(_0x4a5212);

                if (_0x4a5212) {
                    if (_0x4a5212.status == 0) {
                        $.coins = _0x4a5212?.["body"]?.["user"]?.["coins"] || 0;
                    } else {
                        console.log(_0x4a5212.message);
                        kruser = true;
                    }
                }
            } catch (_0xd4dd15) {
                $.log(_0xd4dd15);
            } finally {
                _0x1e6948();
            }
        });
    });
}

async function _0xfbaa88() {
    const _0x5567b7 = {
        "Host": "xinrui-isv.isvjcloud.com",
        "App-Key": _0x3101b4,
        "Content-Type": "application/json",
        "Authorization": "Bearer " + $.Authorization,
        "Origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Referer": _0xa1b72a,
        "Cookie": _0x3abe79
    };
    const _0x200e23 = {
        "url": _0x57a957 + "/jd-school-room-api/api/prize/lottery?is_share=0&channel=2",
        "body": "",
        "headers": _0x5567b7,
        "timeout": 10000
    };
    return new Promise(_0x7dae8c => {
        $.post(_0x200e23, async (_0x3c8800, _0x1d1893, _0x3a9dec) => {
            try {
                _0x3a9dec = JSON.parse(_0x3a9dec);

                if (_0x3a9dec) {
                    if (_0x3a9dec?.["status"] == 0) {
                        if (_0x3a9dec?.["body"]?.["user_prize"]?.["prize_type"] == 1) {
                            console.log("抽中：[" + _0x3a9dec?.["body"]?.["user_prize"]?.["prize_info"]["quota"] + " " + _0x3a9dec?.["body"]?.["user_prize"]?.["prize_name"] + "]");
                        } else {
                            let _0x45d068 = _0x3a9dec?.["body"]?.["user_prize"] === null ? "空气" : JSON.stringify(_0x3a9dec);

                            console.log("抽中: " + _0x45d068);
                        }
                    } else {
                        console.log(_0x3a9dec.message);
                    }
                }
            } catch (_0x49f8c8) {
                $.log(_0x49f8c8);
            } finally {
                _0x7dae8c();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }