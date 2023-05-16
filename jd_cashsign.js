/*
入口：app-我的-领现金
3 3 * * * jd_cashsign.js
 */

const $ = new Env('领现金签到');
const ll1lil1 = $.isNode() ? require("./sendNotify") : "",
    l1i11iIl = $.isNode() ? require("./jdCookie") : "",
    IillI1Ii = require("./USER_AGENTS");

let i1lIi11l = true,
    lI111llI = [],
    IilIil1i = "",
    IiI1Iiil = "";

if ($.isNode()) {
    Object.keys(l1i11iIl).forEach(I11i1lii => {
        lI111llI.push(l1i11iIl[I11i1lii]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else lI111llI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iilIliIl($.getdata("CookiesJD") || "[]").map(iliiIiIi => iliiIiIi.cookie)].filter(IiiIlil1 => !!IiiIlil1);

!(async () => {
    if (!lI111llI[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let IIi1i1il = 0; IIi1i1il < lI111llI.length; IIi1i1il++) {
        if (lI111llI[IIi1i1il]) {
            IilIil1i = lI111llI[IIi1i1il];
            $.UserName = decodeURIComponent(IilIil1i.match(/pt_pin=([^; ]+)(?=;?)/) && IilIil1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = IIi1i1il + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = IillI1Ii.UARAM ? IillI1Ii.UARAM() : IillI1Ii.USER_AGENT;
            await IlIiIili();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await ll1lil1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await I1ii1iII();
            await $.wait(2000);
        }
    }
})().catch(lI111iI => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + lI111iI + "!", "");
}).finally(() => {
    $.done();
});

async function lI1lliIi() {
    let iilIIIl = {
        "url": "https://api.m.jd.com/client.action?functionId=cash_sign&body=%7B%22remind%22%3A0%2C%22inviteCode%22%3A%22%22%2C%22type%22%3A0%2C%22breakReward%22%3A0%7D&client=apple&clientVersion=9.0.8&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=7e2f8bcec13978a691567257af4fdce9&st=1596954745073&sv=111",
        "headers": {
            "User-Agent": $.UA,
            "Cookie": IilIil1i
        }
    };
    return new Promise(async Il1lIi11 => {
        $.get(iilIIIl, async (ii1iliil, il11I1lI, iIli1l1) => {
            try {
                if (ii1iliil) {
                    console.log("" + JSON.stringify(ii1iliil));
                    console.log("API请求失败，请检查网路重试");
                } else {
                    const iIiiIliI = JSON.parse(iIli1l1);
                    if (iIiiIliI.data.bizCode == 0) console.log("签到成功：" + iIiiIliI.data.result.signCash); else {
                        if (iIli1l1.match(/已经签过/)) $.log("今日已签过！！！"); else {
                            console.log(iIli1l1);
                        }
                    }
                }
            } catch (I1ii1lil) {
                $.logErr(I1ii1lil, il11I1lI);
            } finally {
                Il1lIi11(iIli1l1);
            }
        });
    });
}

function I1ii1iII() {
    let I1ill1i1 = {
        "version": "1",
        "channel": "applet",
        "remind": 0
    };
    return new Promise(async iilIl1i1 => {
        $.post(Il111ili("cash_mob_sign", I1ill1i1), async (lIillilI, I1l11lii, IilIl1ll) => {
            try {
                if (lIillilI) {
                    console.log("" + JSON.stringify(lIillilI));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    IilIl1ll = JSON.parse(IilIl1ll);

                    if (IilIl1ll.code == 0) {
                        if (IilIl1ll.data.bizCode == 0) $.log("签到成功：获得" + IilIl1ll.data?.["result"]?.["signCash"] + "元！"); else {
                            $.log("" + (IilIl1ll.data.bizMsg.includes("已完成") ? "今日已完成签到！" : IilIl1ll.data.bizMsg));
                        }
                    } else console.log(IilIl1ll.msg);
                }
            } catch (l1lI1iI) {
                $.logErr(l1lI1iI, I1l11lii);
            } finally {
                iilIl1i1(IilIl1ll);
            }
        });
    });
}

function Il111ili(I11iiiiI, liIi1Il) {
    return {
        "url": "https://api.m.jd.com/?g_ty=ls&g_tk=616816427",
        "body": "loginType=2&clientType=wxapp&client=wh5&clientVersion=1.0.0&d_brand=&d_model=&lang=zh_CN&uuid=&appid=signed_mp&t=" + Date.now + "&functionId=" + I11iiiiI + "&body=" + encodeURIComponent(JSON.stringify(liIi1Il)) + "&loginWQBiz=pet-town&h5st=20230428215402232%3B8517094924558639%3Bc8815%3Btk02a8bf41be318pMXgzMWdxUk9FzVTwIa1Y5BN3GYXDFTCU37w9xPVffVC32ViGDe33QLt8JhzryaMoLDnWAMtJulav%3Ba339ec95c0fbabca4fd585fcfce78090d8bbe2672806805600cde4d8bc142ec3%3B3.1%3B1682690042232%3B4a21f21f3b5dd7c0338578afd557db584a2d1619854d3e9c4d89d2beb1b1333d9f6d38da5567917561654a3437b4c71a",
        "headers": {
            "Host": "api.m.jd.com",
            "Referer": "https://servicewechat.com/wx91d27dbf599dff74/706/page-frame.html",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": IilIil1i
        }
    };
}

function IlIiIili() {
    return new Promise(lliIIlI => {
        const illllIiI = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": IilIil1i,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(illllIiI, (liIll1ii, I1i1llIi, iliI11ii) => {
            try {
                if (iliI11ii) {
                    iliI11ii = JSON.parse(iliI11ii);

                    if (iliI11ii.islogin === "1") { } else iliI11ii.islogin === "0" && ($.isLogin = false);
                }
            } catch (i1lIi111) {
                console.log(i1lIi111);
            } finally {
                lliIIlI();
            }
        });
    });
}

function llI11il() {
    return new Promise(l1IIIi1I => {
        !i1lIi11l ? $.msg($.name, "", "" + IiI1Iiil) : $.log("京东账号" + $.index + $.nickName + "\n" + IiI1Iiil);
        l1IIIi1I();
    });
}

function lli1I1i(lilII1I) {
    try {
        if (typeof JSON.parse(lilII1I) == "object") return true;
    } catch (Ilili) {
        return console.log(Ilili), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function iilIliIl(l1I1I1li) {
    if (typeof l1I1I1li == "string") try {
        return JSON.parse(l1I1I1li);
    } catch (liIIiI1I) {
        return console.log(liIIiI1I), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }