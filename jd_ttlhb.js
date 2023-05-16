/*
天天领红包
任务+开红包
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_ttlhb.js
updatetime:2023/4/29
 */

const $ = new Env('天天领红包');
const l1IIl11 = $.isNode() ? require("./sendNotify") : "",
    Iil1iIi = $.isNode() ? require("./jdCookie.js") : "",
    ilIiiII1 = require("./USER_AGENTS");

let iiiiIIil = true,
    ilIiiili = [],
    il1llil1 = "",
    i1lli1ii = "";

if ($.isNode()) {
    Object.keys(Iil1iIi).forEach(iIlI1Il1 => {
        ilIiiili.push(Iil1iIi[iIlI1Il1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else ilIiiili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIi1111($.getdata("CookiesJD") || "[]").map(iIl1lI => iIl1lI.cookie)].filter(iliiIiI => !!iliiIiI);

!(async () => {
    if (!ilIiiili[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    console.log("当前版本：V1.0.0");
    console.log("TG频道：https://t.me/dylan_jdpro\n");

    for (let IiiililI = 0; IiiililI < ilIiiili.length; IiiililI++) {
        if (ilIiiili[IiiililI]) {
            il1llil1 = ilIiiili[IiiililI];
            $.UserName = decodeURIComponent(il1llil1.match(/pt_pin=([^; ]+)(?=;?)/) && il1llil1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = IiiililI + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = ilIiiII1.UARAM ? ilIiiII1.UARAM() : ilIiiII1.USER_AGENT;
            await iIiIIIii();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await l1IIl11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            let IiiiiiI = await l1lii1I();

            for (let liI11l of IiiiiiI) {
                $.log("去做  " + liI11l.taskShowTitle);

                if (liI11l.taskFinished) {
                    $.log("------已完成");
                    continue;
                }

                await l1II1iii(liI11l.taskSourceUrl, liI11l.taskType, liI11l.id);
                await $.wait(1000);
            }

            await iIiiIi1I();
            $.log("\n开始开红包...");

            for (let IIIIliII = 0; IIIIliII < $.remainchance; IIIIliII++) {
                $.log("开红包第" + (IIIIliII + 1) + "次：");
                await Iil1Il1l();
                await $.wait(1000);
            }

            await $.wait(2000);
        }
    }
})().catch(ll11Il => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + ll11Il + "!", "");
}).finally(() => {
    $.done();
});

async function iIiiIi1I() {
    return new Promise(async iliI11Il => {
        $.post(iiIIli("lhb4b_home", {
            "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
            "inviter": ""
        }), async (l1iil11I, i1i1i1I, iI11111) => {
            try {
                if (l1iil11I) {
                    console.log("" + JSON.stringify(l1iil11I));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    iI11111 = JSON.parse(iI11111);
                    iI11111.code == 0 ? ($.remainchance = iI11111.data.remainChance, $.log("\n已领红包 " + iI11111.data.totalAward[0].amount + "，现金 " + iI11111.data.totalAward[1].amount)) : console.log(iI11111.errMsg);
                }
            } catch (llIlIlI1) {
                $.logErr(llIlIlI1, i1i1i1I);
            } finally {
                iliI11Il(iI11111);
            }
        });
    });
}

async function l1lii1I() {
    let l1iill1I = "";
    return new Promise(async lIiiilli => {
        $.post(iiIIli("apTaskList", {
            "linkId": "l-yLvQMhLwCqYy6_nXUBgg"
        }), async (liliilll, iI1li11I, lii1l11I) => {
            try {
                liliilll ? (console.log("" + JSON.stringify(liliilll)), console.log(" API请求失败，请检查网路重试")) : (lii1l11I = JSON.parse(lii1l11I), lii1l11I.code == 0 ? l1iill1I = lii1l11I.data : console.log(lii1l11I.msg));
            } catch (l11lI1li) {
                $.logErr(l11lI1li, iI1li11I);
            } finally {
                lIiiilli(l1iill1I);
            }
        });
    });
}

async function Iil1Il1l() {
    return new Promise(async Il1I => {
        $.post(iiIIli("lhb4b_open", {
            "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
            "openMode": 0
        }), async (Ii11IiII, l1ii11ll, Illil1i1) => {
            try {
                if (Ii11IiII) {
                    console.log("" + JSON.stringify(Ii11IiII));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    Illil1i1 = JSON.parse(Illil1i1);

                    if (Illil1i1.code == 0) {
                        if (Illil1i1.data.received.prizeType === 2) $.log("获得红包 " + Illil1i1.data.received.prizeValue); else Illil1i1.data.received.prizeType === 4 ? $.log("获得现金 " + Illil1i1.data.received.prizeValue) : $.log("获得优惠券！");
                    } else console.log(Illil1i1.msg);
                }
            } catch (liIiiIiI) {
                $.logErr(liIiiIiI, l1ii11ll);
            } finally {
                Il1I();
            }
        });
    });
}

async function l1II1iii(iillllI1, iIlIli1, iii1lIli) {
    return new Promise(async I1iiI1il => {
        $.post(iiIIli("apDoTask", {
            "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
            "taskType": "" + iIlIli1,
            "taskId": iii1lIli,
            "channel": 4,
            "checkVersion": true,
            "cityId": "",
            "provinceId": "",
            "countyId": 61130,
            "itemId": "" + encodeURIComponent(iillllI1)
        }), async (li11Il1, lliIi11i, llIilI1I) => {
            try {
                if (li11Il1) {
                    console.log("" + JSON.stringify(li11Il1));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    llIilI1I = JSON.parse(llIilI1I);
                    llIilI1I.code == 0 ? llIilI1I.data.finished && $.log("成功，抽奖次数 +" + llIilI1I.data.awardInfo[0].factAwardNum) : console.log(llIilI1I.msg);
                }
            } catch (il1liiII) {
                $.logErr(il1liiII, lliIi11i);
            } finally {
                I1iiI1il();
            }
        });
    });
}

function iiIIli(iiiil1Ii, IiIliiI1) {
    return {
        "url": "https://api.m.jd.com",
        "body": "functionId=" + iiiil1Ii + "&body=" + JSON.stringify(IiIliiI1) + "&t=1682736451692&appid=activities_platform&client=android&clientVersion=11.6.4&h5st=20230429104731695%3B5529123896479851%3B7af4f%3Btk02wb64d1c6e18nL2v9lsHEZWo7ugQoBBMXRciipLBqRTXBWeuZc5QzFB72XhHsDveuNXX7aNNgEvcjTNwng9PJZN%2BP%3Baeba0048cb0b1e8c14c98f343eb0cd8e2ced1ae434babde575919e8612e61dd9%3B3.1%3B1682736451695%3B62f4d401ae05799f14989d31956d3c5f0a269d1342e4ecb6ab00268fc69555cdc3295f00e681fd72cd76a48b9fb3faf3579d80b37c85b023e9e8ba94d8d2b852b9cbef42726bbe41ffd8c74540f4a1ced584468ba9e46bfbef62144b678f5532e02456edc95e6131cb12c2dd5fa5c6c0c095af7e1356de3efc87ddab4e52b5bc036c53790ac05383cb12a455322b3bca",
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": il1llil1
        }
    };
}

function iIiIIIii() {
    return new Promise(I11iliiI => {
        const lllliI11 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": il1llil1,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(lllliI11, (Iill1iIl, i1I1IlIl, lIIiI11I) => {
            try {
                if (lIIiI11I) {
                    lIIiI11I = JSON.parse(lIIiI11I);

                    if (lIIiI11I.islogin === "1") { } else lIIiI11I.islogin === "0" && ($.isLogin = false);
                }
            } catch (ii1I1l1l) {
                console.log(ii1I1l1l);
            } finally {
                I11iliiI();
            }
        });
    });
}

function lIiIIIIl() {
    return new Promise(i1Illl1l => {
        !iiiiIIil ? $.msg($.name, "", "" + i1lli1ii) : $.log("京东账号" + $.index + $.nickName + "\n" + i1lli1ii);
        i1Illl1l();
    });
}

function l1I1I1ll(Il1I1lIi) {
    try {
        if (typeof JSON.parse(Il1I1lIi) == "object") return true;
    } catch (lIIlll) {
        return console.log(lIIlll), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function lIi1111(Ii1Il11i) {
    if (typeof Ii1Il11i == "string") try {
        return JSON.parse(Ii1Il11i);
    } catch (ilI1lliI) {
        return console.log(ilI1lliI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }