/*
发财挖宝助力
更新时间：2023-8-11
活动入口：京东APP-发财挖宝

基本都是火爆 
入口:京东APP-领京豆-转赚红包-悬浮 挖财宝  欢乐淘金

建议手动进入挖一下

变量：
//export krWait="秒" //自行填写变量，延时多长时间。(不填写默认延时0.2秒)

//export fcwbhelpnum="人数" //自行填写变量，需要邀请多少人停止。(不填写默认邀请60停止)

cron:7 7 7 7 *
============Quantumultx===============
[task_local]
#发财挖宝助力
cron:7 7 7 7 * jd_fcwb_help.js, tag=发财挖宝助力, enabled=true

*/
const $ = new Env('发财挖宝助力');
const iI1Ill = $.isNode() ? require("./sendNotify") : "",
    lilI1 = require("./function/jdCommon"),
    IIIi1 = require("./function/h5st41.js"),
    i1llli = $.isNode() ? require("./jdCookie.js") : "",
    i1llll = "https://api.m.jd.com";

let iI1Ili = [],
    llIIiI = "",
    iI1111,
    IIIl1 = [];
$.hasEnd = false;
let ii1ii = "xpEf-M3RyE8Cd8nP8Zd0eA";
let I1I1lI = "0.2";
I1I1lI = $.isNode() ? process.env.krWait ? process.env.krWait : "" + I1I1lI : $.getdata("krWait") ? $.getdata("krWait") : "" + I1I1lI;
CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;

if ($.isNode()) {
    Object.keys(i1llli).forEach(IIIii => {
        iI1Ili.push(i1llli[IIIii]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else iI1Ili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1iI($.getdata("CookiesJD") || "[]").map(iI111i => iI111i.cookie)].filter(I1I1l1 => !!I1I1l1);

let l1iIlI = "60",
    iI111I = "";
l1iIlI = $.isNode() ? process.env.fcwbhelpnum ? process.env.fcwbhelpnum : "" + l1iIlI : $.getdata("fcwbhelpnum") ? $.getdata("fcwbhelpnum") : "" + l1iIlI;
iI111I = $.isNode() ? process.env.nolanh5st_token ? process.env.nolanh5st_token : "" + iI111I : $.getdata("nolanh5st_token") ? $.getdata("nolanh5st_token") : "" + iI111I;
!(async () => {
    console.log("\n【默认全部助力账号一，邀请满" + l1iIlI + "自动停止】\n【加密脚本，不放心可禁用】\n【可能限制时段，留意频道通知】\n");

    if (!iI1Ili[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let I1I1iI = 0; I1I1iI < iI1Ili.length; I1I1iI++) {
        if (iI1Ili[I1I1iI]) {
            llIIiI = iI1Ili[I1I1iI];
            $.UserName = decodeURIComponent(llIIiI.match(/pt_pin=([^; ]+)(?=;?)/) && llIIiI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = I1I1iI + 1;
            $.isLogin = true;
            $.nickName = "";
            iI1111 = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await iI1Ill.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            $.UA = lilI1.genUA($.UserName);
            await IIIlI1();
            I1I1lI && $.index != iI1Ili.length && (console.log("【请求限制，暂时休整等待" + I1I1lI + "秒~~~~~~~】"), await $.wait(parseInt(I1I1lI, 10) * 1000));
            if ($.hasEnd) break;
        }
    }
})().catch(ili1Ii => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + ili1Ii + "!", "");
}).finally(() => {
    $.done();
});

async function IIIlI1() {
    $.personNum = 0;

    try {
        await i1lIiI();

        if ($.index != 1) { }

        await IiiIl();
        if ($.index == 1) $.helpCount = $.personNum; else $.helpok == true && $.helpCount++;
        console.log("【账号" + $.index + "】已邀请人数：" + $.personNum + ($.index != 1 && " 【账号1】已邀请人数：" + $.helpCount || ""));
        if ($.helpCount >= l1iIlI) $.hasEnd = true;
    } catch (Iili) {
        console.log(Iili);
    }
}

function i1lIiI() {
    return new Promise(iiIiIi => {
        let IilI = {
            "linkId": ii1ii
        };
        $.get(IIIil("happyDigHome", IilI), async (Iillll, lllI1, III11I) => {
            try {
                if (Iillll) console.log("" + JSON.stringify(Iillll)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    if (l1iIl1(III11I)) {
                        III11I = JSON.parse(III11I);
                        if ($.index === 1) III11I.success == true && (curRound = III11I.data.curRound, inviteCode = III11I.data.inviteCode, inviter = III11I.data.markedPin, blood = III11I.data.blood, console.log("【当前助力】:" + III11I.data.inviteCode), III11I.data && III11I.data.inviteCode && IIIl1.length === 0 && IIIl1.push({
                            "user": $.UserName,
                            "fcwbinviteCode": III11I.data.inviteCode,
                            "fcwbinviter": III11I.data.markedPin
                        })); else III11I.success == false && console.log("抱歉，貌似账号已黑，跳过！");
                    }
                }
            } catch (l1i11) {
                $.logErr(l1i11, lllI1);
            } finally {
                iiIiIi(III11I);
            }
        });
    });
}

function IiiIl() {
    return new Promise(lil1l => {
        let Iliii = {
            "pageNum": 1,
            "pageSize": 50,
            "linkId": ii1ii
        };
        $.get(IIIil("happyDigHelpList", Iliii), async (l1l1Ii, IIIIlI, l1i11l) => {
            try {
                if (l1l1Ii) {
                    console.log("" + JSON.stringify(l1l1Ii));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (l1iIl1(l1i11l)) {
                        l1i11l = JSON.parse(l1i11l);
                        if (l1i11l.success == true) $.personNum = l1i11l.data.personNum; else l1i11l.success == false && console.log("抱歉，貌似账号已黑，跳过！");
                    }
                }
            } catch (I1lIII) {
                $.logErr(I1lIII, IIIIlI);
            } finally {
                lil1l(l1i11l);
            }
        });
    });
}

function ii1l1l() {
    return new Promise(l11iIi => {
        let IlilI = "{\"linkId\":\"xpEf-M3RyE8Cd8nP8Zd0eA\",\"inviter\":\"" + inviter + "\",\"inviteCode\":\"" + inviteCode + "\"}",
            llIi1 = Date.now(),
            IliIII = {
                "url": "https://api.m.jd.com/?functionId=happyDigHelpPage&body=" + IlilI + "&t=" + llIi1 + "&appid=activities_platform&client=H5&clientVersion=1.0.0",
                "headers": {
                    "Cookie": llIIiI,
                    "Origin": "https://api.m.jd.com",
                    "User-Agent": $.UA
                }
            };
        $.get(IliIII, async (II1l, liiiiI, II1i) => {
            try {
                if (II1l) {
                    console.log("" + JSON.stringify(II1l));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else l1iIl1(II1i) && (II1i = JSON.parse(II1i), console.log(II1i));
            } catch (l1ilII) {
                $.logErr(l1ilII, liiiiI);
            } finally {
                l11iIi(II1i);
            }
        });
    });
}

function l1lli1() {
    return new Promise(async i11iIl => {
        let IIiiI1 = Date.now();
        const IIIIi1 = {
            "functionId": "happyDigHelp",
            "appid": "activities_platform",
            "clientVersion": "10.1.0",
            "client": "android",
            "t": IIiiI1,
            "body": {
                "linkId": ii1ii,
                "inviter": inviter,
                "inviteCode": inviteCode
            }
        },
            ii1IIl = await IiiIi("8dd95", IIIIi1);
        let ii1IIi = {
            "url": "https://api.m.jd.com/?" + ii1IIl,
            "headers": {
                "Cookie": llIIiI,
                "Origin": "https://bnzf.jd.com",
                "User-Agent": $.UA,
                "referer": "https://bnzf.jd.com/?activityId=xpEf-M3RyE8Cd8nP8Zd0eA&inviterId=&inviterCode=&utm_user=plusmember&ad_od=share&utm_source=androidapp&utm_medium=appshare&utm_campaign=t_335139774&utm_term=Wxfriends&lng=106.477132&lat=29.502772&sid=84c83c76030880654e4e98b6bcda688w&un_area=4_50952_106_0"
            }
        };
        $.get(ii1IIi, async (I1ll1l, I1ll1i, i11iII) => {
            try {
                if (I1ll1l) console.log("" + JSON.stringify(I1ll1l)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    if (l1iIl1(i11iII)) {
                        i11iII = JSON.parse(i11iII);
                        $.helpok = i11iII.success;
                        if (i11iII.success == true) console.log("【助力状态】：" + i11iII.errMsg); else {
                            if (i11iII.success == false) {
                                console.log("【助力状态】：" + i11iII.errMsg);
                            }
                        }
                    }
                }
            } catch (i1I1l) {
                $.logErr(i1I1l, I1ll1i);
            } finally {
                i11iIl(i11iII);
            }
        });
    });
}

async function IiiIi(IIiiII, llIiI) {
    try {
        let Ilili = new IIIi1({
            "appId": IIiiII,
            "appid": "activities_platform",
            "clientVersion": llIiI?.["clientVersion"],
            "client": llIiI?.["client"],
            "pin": $.UserName,
            "ua": $.UA,
            "version": "4.1"
        });
        return await Ilili.genAlgo(), body = await Ilili.genUrlParams(llIiI.functionId, llIiI.body), body;
    } catch (I1ll1I) { }
}

function ii1l1i(Iii1I1) {
    Iii1I1 = Iii1I1 || 32;
    let Iii1II = "abcdef0123456789",
        llIlI = Iii1II.length,
        l1iIil = "";

    for (i = 0; i < Iii1I1; i++) l1iIil += Iii1II.charAt(Math.floor(Math.random() * llIlI));

    return l1iIil;
}

function l1iIl1(IIIIii) {
    try {
        if (typeof JSON.parse(IIIIii) == "object") return true;
    } catch (liiili) {
        return console.log(liiili), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function ii1iI(I1ll11) {
    if (typeof I1ll11 == "string") {
        try {
            return JSON.parse(I1ll11);
        } catch (i1i111) {
            return console.log(i1i111), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}

function IIIil(ii1l1I, lI1lII) {
    return {
        "url": i1llll + "/?functionId=" + ii1l1I + "&body=" + escape(JSON.stringify(lI1lII)) + "&t=1635561607124&appid=activities_platform&client=H5&clientVersion=1.2.0",
        "headers": {
            "Cookie": llIIiI,
            "Origin": "https://bnzf.jd.com",
            "User-Agent": $.UA
        }
    };
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }