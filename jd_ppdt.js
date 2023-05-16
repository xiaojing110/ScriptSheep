/*
18 11,19 * * * jd_ppdt.js
 */

const $ = new Env('超级品牌殿堂');
const Iil1IiIi = $.isNode() ? require("./sendNotify") : "",
    iIiI111 = $.isNode() ? require("./jdCookie.js") : "";
let i1Iiliil = true,
    l1lil111 = [],
    i1IiilI1 = "",
    iIIl1i11 = "";

if ($.isNode()) {
    Object.keys(iIiI111).forEach(Il1ii1Ii => {
        l1lil111.push(iIiI111[Il1ii1Ii]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else l1lil111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIil11I($.getdata("CookiesJD") || "[]").map(IiIi1i => IiIi1i.cookie)].filter(Ill1I111 => !!Ill1I111);

!(async () => {
    if (!l1lil111[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let I1i1il1 = 0; I1i1il1 < l1lil111.length; I1i1il1++) {
        if (l1lil111[I1i1il1]) {
            i1IiilI1 = l1lil111[I1i1il1];
            $.UserName = decodeURIComponent(i1IiilI1.match(/pt_pin=([^; ]+)(?=;?)/) && i1IiilI1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = I1i1il1 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.ban = "";
            $.donep = "";
            $.UA = require("./USER_AGENTS").UARAM();
            await Illil1li();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await Iil1IiIi.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await l1l1();
            let IiiiillI = await iI11Il1i($.activityId);

            if (IiiiillI) {
                console.log("" + IiiiillI.activityName);
                $.pid = IiiiillI.encryptProjectId;
                $.aid = IiiiillI.activityId;
            } else {
                console.log("获取活动信息失败！！");
                continue;
            }

            await $.wait(500);
            await i1iII1II($.aid);
            await $.wait(500);

            for (let i1ill1I of $.tasklist) {
                $.log("去做任务-> " + i1ill1I.assignmentName);

                if (i1ill1I.completionCnt) {
                    $.log("任务已完成");
                    continue;
                }

                let liiI11Il;

                for (let Iill11Il = 0; Iill11Il < i1ill1I.assignmentTimesLimit; Iill11Il++) {
                    liiI11Il = await IiIIlII(i1ill1I.encryptAssignmentId);
                    await $.wait(500);
                }

                liiI11Il ? liiI11Il[0].awardType === 3 ? console.log("----恭喜获得 " + liiI11Il[0].beanNum + " 京豆") : console.log(JSON.stringify(liiI11Il)) : $.log("----空气");
            }

            await $.wait(2000);
        }
    }
})().catch(IlIl111I => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + IlIl111I + "!", "");
}).finally(() => {
    $.done();
});

async function iI11Il1i(illliiII) {
    let i1lI1l1l = {
        "url": "https://api.m.jd.com/?client=wh5&appid=superbrand-main&functionId=superBrandHall1111Page&t=1681289234365&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A" + illliiII + "%7D",
        "headers": {
            "Origin": "https://prodev.m.jd.com",
            "User-Agent": $.UA,
            "Cookie": i1IiilI1
        }
    };
    return new Promise(async liiiliii => {
        let lIIII1il;
        $.post(i1lI1l1l, async (I111IliI, lilIli1, Ill111Ii) => {
            try {
                if (I111IliI) {
                    console.log("" + JSON.stringify(I111IliI));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    Ill111Ii = JSON.parse(Ill111Ii);

                    if (Ill111Ii.code == 0) {
                        if (Ill111Ii.data.bizCode == 0) {
                            lIIII1il = Ill111Ii.data.result.activityBaseInfo || "";
                        }
                    } else console.log(JSON.stringify(Ill111Ii));
                }
            } catch (ill1IIl) {
                $.logErr(ill1IIl, lilIli1);
            } finally {
                liiiliii(lIIII1il);
            }
        });
    });
}

async function i1iII1II(iiliIlll) {
    let IiliiIl1 = {
        "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandTaskList&t=1681289234496&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + iiliIlll + "%7D",
        "headers": {
            "Origin": "https://prodev.m.jd.com",
            "User-Agent": $.UA,
            "Cookie": i1IiilI1
        }
    };
    return new Promise(async iliIIIll => {
        $.post(IiliiIl1, async (II1li1ll, I11i1ll, IlIi11li) => {
            try {
                if (II1li1ll) {
                    console.log("" + JSON.stringify(II1li1ll));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    IlIi11li = JSON.parse(IlIi11li);
                    if (IlIi11li.code == 0) IlIi11li.data.bizCode == 0 ? $.tasklist = IlIi11li.data.result.taskList : console.log(IlIi11li.data.bizMsg); else {
                        console.log(JSON.stringify(IlIi11li));
                    }
                }
            } catch (llIlIi1) {
                $.logErr(llIlIi1, I11i1ll);
            } finally {
                iliIIIll(IlIi11li);
            }
        });
    });
}

async function IiIIlII(I1IliI11) {
    let IIiIli1i = {
        "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1681289234224&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + $.aid + ",%22completionFlag%22:1,%22encryptProjectId%22:%22" + $.pid + "%22,%22encryptAssignmentId%22:%22" + I1IliI11 + "%22,%22assignmentType%22:0,%22actionType%22:0%7D",
        "headers": {
            "Origin": "https://prodev.m.jd.com",
            "Referer": "https://prodev.m.jd.com/",
            "User-Agent": $.UA,
            "Cookie": i1IiilI1
        }
    },
        ii11iIll = "";
    return new Promise(async Ilil1il1 => {
        $.post(IIiIli1i, async (Il1lIi, lllI1il1, ll11I1il) => {
            try {
                if (Il1lIi) {
                    console.log("" + JSON.stringify(Il1lIi));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    ll11I1il = JSON.parse(ll11I1il);
                    if (ll11I1il.code == 0) ll11I1il.data.bizCode == 0 ? ii11iIll = ll11I1il.data?.["result"]?.["rewards"] : console.log(ll11I1il.data.bizMsg); else {
                        console.log(JSON.stringify(ll11I1il));
                    }
                }
            } catch (l1lIll1l) {
                $.logErr(l1lIll1l, lllI1il1);
            } finally {
                Ilil1il1(ii11iIll);
            }
        });
    });
}

function l1l1() {
    let IIiiii1I = {
        "url": "https://prodev.m.jd.com/mall/active/rw8ewMzsDMevpVnuCJ7EgXS4PM9/index.html",
        "headers": {
            "User-Agent": $.UA,
            "Cookie": i1IiilI1
        }
    };
    return new Promise(i1il11i1 => {
        $.get(IIiiii1I, (ii1l1IlI, liiIlIi, iII1ll1i) => {
            try {
                ii1l1IlI ? $.log(JSON.stringify(ii1l1IlI)) : $.activityId = iII1ll1i.match(/"cmsActivityId":"(\d+)"/)[1];
            } catch (iliI1lI1) {
                $.log(JSON.stringify(iliI1lI1));
            } finally {
                i1il11i1();
            }
        });
    });
}

function Illil1li() {
    return new Promise(IIiiIlII => {
        const llll1lI = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": i1IiilI1,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(llll1lI, (IiiiiilI, llllI1lI, i11iIiI) => {
            try {
                if (i11iIiI) {
                    i11iIiI = JSON.parse(i11iIiI);

                    if (i11iIiI.islogin === "1") { } else i11iIiI.islogin === "0" && ($.isLogin = false);
                }
            } catch (I1IIIl1l) {
                console.log(I1IIIl1l);
            } finally {
                IIiiIlII();
            }
        });
    });
}

function lli1lII1() {
    return new Promise(llI1l1l1 => {
        !i1Iiliil ? $.msg($.name, "", "" + iIIl1i11) : $.log("京东账号" + $.index + $.nickName + "\n" + iIIl1i11);
        llI1l1l1();
    });
}

function iIl1111I(I1liI1i1) {
    try {
        if (typeof JSON.parse(I1liI1i1) == "object") return true;
    } catch (Il11i1iI) {
        return console.log(Il11i1iI), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function IIil11I(IIIll) {
    if (typeof IIIll == "string") try {
        return JSON.parse(IIIll);
    } catch (ll11ilI) {
        return console.log(ll11ilI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }