/*
京东11.11全民大乐透

cron "55 20 * * *" script-path=jd_lotteryMachine.js, tag=京东11.11全民大乐透

 */
const $ = new Env('京东11.11全民大乐透')
const I1il1i = $.isNode() ? require("./sendNotify") : "",
    IliIIi = $.isNode() ? require("./jdCookie") : "",
    lI1l1i = require("./function/krgetH5st"),
    i1iil = require("./function/jdCommon");

let I1llIl = "p_HAvgmOZnWOyRb-2ZJkVA",
    I1llIi = [],
    IIii1I = "",
    llI11i;

if ($.isNode()) {
    Object.keys(IliIIi).forEach(Ii1iil => {
        I1llIi.push(IliIIi[Ii1iil]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else I1llIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...I11i1I($.getdata("CookiesJD") || "[]").map(Ilil1i => Ilil1i.cookie)].filter(iili1 => !!iili1);

!(async () => {
    if (!I1llIi[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let il1il = 0; il1il < I1llIi.length; il1il++) {
        if (I1llIi[il1il]) {
            IIii1I = I1llIi[il1il];
            $.UserName = decodeURIComponent(IIii1I.match(/pt_pin=([^; ]+)(?=;?)/) && IIii1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = il1il + 1;
            $.isLogin = true;
            $.nickName = "";
            llI11i = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await I1il1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            $.jda = "__jda=" + il1l1("1xxxxxxxx.169xxxxxxxxxxxxxxxxxxx.169xxxxxxx.169xxxxxx.169xxxxxx.1xx");
            $.UA = i1iil.genUA($.UserName);
            await i1iIi1();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
    }
})().catch(iIIili => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + iIIili + "!", "");
}).finally(() => {
    $.done();
});

async function i1iIi1() {
    $.txhot = false;
    $.nowcontinue = false;
    $.lotteryChances = 0;
    await iliIi1();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    if ($.nowcontinue) {
        await Il1i1I();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

        for (let II11I = 0; II11I < $.lotteryChances; II11I++) {
            await l1l1ii();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
    }
}

function l1l1il(il1i1) {
    try {
        if (typeof JSON.parse(il1i1) == "object") return true;
    } catch (liI1lI) {
        return console.log(liI1lI), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function I11i1I(Ii1ili) {
    if (typeof Ii1ili == "string") try {
        return JSON.parse(Ii1ili);
    } catch (IIlI1) {
        return console.log(IIlI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

async function iliIi1() {
    return new Promise(async lliiIi => {
        const IllIl1 = {
            "appId": "d7439",
            "functionId": "lotteryMachineHome",
            "appid": "activities_platform",
            "clientVersion": "12.2.0",
            "client": "ios",
            "body": {
                "linkId": I1llIl,
                "taskId": "",
                "inviter": ""
            },
            "version": "4.1",
            "ua": $.UA,
            "t": true
        },
            ll1Ii = await lI1l1i.getH5st(IllIl1);
        let ll1Il = {
            "url": "https://api.m.jd.com/api",
            "body": ll1Ii.params,
            "headers": {
                "origin": "https://prodev.m.jd.com",
                "Referer": "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
                "User-Agent": $.UA,
                "Cookie": IIii1I,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(ll1Il, async (i1llil, i1llii, l1i1I1) => {
            try {
                if (i1llil) console.log("" + JSON.stringify(i1llil)); else {
                    l1i1I1 = JSON.parse(l1i1I1);
                    if (l1i1I1.code == 0) $.nowcontinue = true, $.lotteryChances = l1i1I1?.["data"]?.["remainTimes"], console.log("当前抽奖次数：" + $.lotteryChances); else l1i1I1.code == 402 ? console.log("进入首页失败," + (l1i1I1?.["errMsg"] || "")) : console.log("进入首页失败," + (l1i1I1?.["errMsg"] || ""));
                }
            } catch (Ii1I1i) {
                $.logErr(Ii1I1i, i1llii);
            } finally {
                lliiIi();
            }
        });
    });
}

async function l1l1ii() {
    return new Promise(async ll1II => {
        const liI1li = {
            "appId": "d7439",
            "functionId": "lotteryMachineDraw",
            "appid": "activities_platform",
            "clientVersion": "12.2.0",
            "client": "ios",
            "body": {
                "linkId": I1llIl
            },
            "version": "4.1",
            "ua": $.UA,
            "t": true
        },
            IllIil = await lI1l1i.getH5st(liI1li);
        let ill1Ii = {
            "url": "https://api.m.jd.com/api",
            "body": IllIil.params,
            "headers": {
                "origin": "https://prodev.m.jd.com",
                "Referer": "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
                "User-Agent": $.UA,
                "Cookie": IIii1I,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(ill1Ii, async (llIIl1, ill1Il, i1lll1) => {
            try {
                if (llIIl1) console.log("" + JSON.stringify(llIIl1)); else {
                    i1lll1 = JSON.parse(i1lll1);
                    if (i1lll1.code == 0) switch (i1lll1?.["data"]?.["prizeType"]) {
                        case 0:
                            console.log("抽中：空气");
                            break;

                        case 1:
                            console.log("抽中优惠券：" + i1lll1?.["data"]?.["prizeConfigName"]);
                            break;

                        case 2:
                            console.log("抽中：" + i1lll1?.["data"]?.["prizeConfigName"]);
                            break;

                        case null:
                            console.log("运气不太好，什么都没有抽到...");
                            break;

                        default:
                            console.log(i1lll1?.["data"]?.["prizeType"] + "-" + i1lll1?.["data"]?.["prizeConfigName"]);
                            return;
                    } else {
                        if (i1lll1.code == 402) {
                            console.log("抽奖失败," + (i1lll1?.["errMsg"] || ""));
                        } else console.log("抽奖失败," + (i1lll1?.["errMsg"] || "")), $.lhb4b_open = false;
                    }
                }
            } catch (l1i1Il) {
                $.logErr(l1i1Il, ill1Il);
            } finally {
                ll1II();
            }
        });
    });
}

async function Il1i1I() {
    const Ii1I11 = {
        "appId": "c06b7",
        "functionId": "apTaskList",
        "appid": "activities_platform",
        "clientVersion": "12.2.0",
        "client": "ios",
        "body": {
            "linkId": I1llIl
        },
        "version": "4.1",
        "ua": $.UA,
        "t": true
    },
        IllIli = await lI1l1i.getH5st(Ii1I11);
    let ii1Ii = {
        "url": "https://api.m.jd.com/api",
        "body": IllIli.params,
        "headers": {
            "origin": "https://prodev.m.jd.com",
            "Referer": "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
            "User-Agent": $.UA,
            "Cookie": IIii1I,
            "content-type": "application/x-www-form-urlencoded",
            "accept": "application/json, text/plain, */*"
        },
        "timeout": 20 * 1000
    };
    return new Promise(IIIlI1 => {
        $.post(ii1Ii, async (IiiIl, ii1l1l, l1lli1) => {
            try {
                if (IiiIl) $.log(IiiIl); else {
                    l1lli1 = JSON.parse(l1lli1);

                    if (l1lli1?.["code"] == 0) {
                        let iI111i = l1lli1?.["data"] || [];

                        for (let I1I1l1 = 0; I1I1l1 < iI111i.length; I1I1l1++) {
                            $.taskTitle = iI111i[I1I1l1].taskTitle;
                            $.apTaskListid = iI111i[I1I1l1].id;
                            $.taskType = iI111i[I1I1l1].taskType;
                            $.taskSourceUrl = iI111i[I1I1l1].taskSourceUrl;
                            $.taskDoTimes = iI111i[I1I1l1].taskDoTimes;
                            $.taskFinished = iI111i[I1I1l1].taskFinished;
                            $.taskShowTitle = iI111i[I1I1l1].taskShowTitle;

                            if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                                if ($.taskSourceUrl) for (let i1lIii = 0; i1lIii < 1; i1lIii++) {
                                    console.log("去做 " + $.taskTitle);
                                    await iIIilI($.taskType, $.apTaskListid, $.taskSourceUrl);
                                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                                } else for (let III11i = 0; III11i < 1; III11i++) {
                                    console.log("去做 " + $.taskTitle);
                                    await Ii1iii($.taskType, $.apTaskListid);
                                }
                            }
                        }
                    } else console.log("查询任务失败," + (l1lli1?.["errMsg"] || l1lli1?.["msg"] || ""));
                }
            } catch (llIl1l) {
                $.log(llIl1l);
            } finally {
                IIIlI1();
            }
        });
    });
}

async function Ii1iii(Iiil, IIIli) {
    return new Promise(async llIl1I => {
        const Iilll1 = {
            "appId": "ebecc",
            "functionId": "apTaskDetail",
            "appid": "activities_platform",
            "clientVersion": "12.2.0",
            "client": "ios",
            "body": {
                "taskType": Iiil,
                "taskId": IIIli,
                "channel": 4,
                "checkVersion": true,
                "linkId": I1llIl
            },
            "version": "4.1",
            "ua": $.UA,
            "t": true
        },
            ll11I = await lI1l1i.getH5st(Iilll1);
        let iIi1I = {
            "url": "https://api.m.jd.com/api",
            "body": ll11I.params,
            "headers": {
                "origin": "https://prodev.m.jd.com",
                "Referer": "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
                "User-Agent": $.UA,
                "Cookie": IIii1I,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(iIi1I, async (liIIl, IlI1lI, liIIi) => {
            try {
                if (liIIl) console.log("" + JSON.stringify(liIIl)); else {
                    liIIi = JSON.parse(liIIi);

                    if (liIIi.code == 0) {
                        $.apTaskDetail = liIIi.data;
                        const IilllI = $.apTaskDetail?.["taskItemList"] || [],
                            iI1lIi = $.apTaskDetail?.["status"]?.["finishNeed"];

                        for (let l1lllI = 0; l1lllI < iI1lIi; l1lllI++) {
                            const llliIi = IilllI[l1lllI];
                            llliIi ? ($.taskSourceUrl = llliIi.itemId, $.taskInsert = llliIi.taskInsert, await iIIilI($.taskType, $.apTaskListid, $.taskSourceUrl, $.taskInsert), await $.wait(3000)) : console.log("> 任务失败，没有获取到任务ID");
                        }
                    } else liIIi.code == 402 ? console.log("获取任务," + (liIIi?.["errMsg"] || "")) : console.log("获取任务," + (liIIi?.["errMsg"] || ""));
                }
            } catch (i1lIll) {
                $.logErr(i1lIll, IlI1lI);
            } finally {
                llIl1I();
            }
        });
    });
}

async function iIIilI(liIlii, llii1l, liIlil, llii1i) {
    return new Promise(async ll11l1 => {
        const ili1II = {
            "appId": "54ed7",
            "functionId": "apsDoTask",
            "appid": "activities_platform",
            "clientVersion": "12.2.0",
            "client": "ios",
            "body": {
                "taskType": liIlii,
                "taskId": llii1l,
                "channel": 4,
                "checkVersion": true,
                "linkId": I1llIl,
                "itemId": liIlil,
                "taskInsert": llii1i
            },
            "version": "4.1",
            "ua": $.UA,
            "t": true
        },
            liIllI = await lI1l1i.getH5st(ili1II);
        let ll11i = {
            "url": "https://api.m.jd.com/api",
            "body": liIllI.params,
            "headers": {
                "origin": "https://prodev.m.jd.com",
                "Referer": "https://prodev.m.jd.com/mall/active/2iAtHEAYAEDiQy6RyH7wNCsiMPr3/index.html",
                "User-Agent": $.UA,
                "Cookie": IIii1I,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(ll11i, async (iI1lI1, I1I1li, l1i11) => {
            try {
                if (iI1lI1) {
                    console.log("" + JSON.stringify(iI1lI1));
                } else {
                    l1i11 = JSON.parse(l1i11);
                    if (l1i11.code == 0) $.lotteryChances++, console.log("完成任务,抽奖次数：" + $.lotteryChances); else l1i11.code == 402 ? console.log("完成任务失败," + (l1i11?.["errMsg"] || "")) : console.log("完成任务失败," + (l1i11?.["errMsg"] || ""));
                }
            } catch (lllIl) {
                $.logErr(lllIl, I1I1li);
            } finally {
                ll11l1();
            }
        });
    });
}

function il1l1(l1i1l = "xxxxxxxxxxxxxxxxxxxx") {
    return l1i1l.replace(/[xy]/g, function (l1l1Ii) {
        var IIIIlI = Math.random() * 10 | 0,
            l1i11l = l1l1Ii == "x" ? IIIIlI : IIIIlI & 3 | 8;
        return jdaid = l1i11l.toString(), jdaid;
    });
}// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
