/*
京喜特价抽现金
入口：特价版app-百元生活费-赚金币-邀请抽奖
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJTOP='10'
多少助力换下一个，默认50个 ，可调整变量CXJNUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxjhelp.js
updatetime:2023/5/10 
 */

const $ = new Env('京喜特价抽现金');
const illiliII = $.isNode() ? require("./sendNotify") : "",
    I1l1IiIl = $.isNode() ? require("./jdCookie.js") : "",
    IiI1lill = require("./function/dylany"),
    iI1iii = require("./USER_AGENTS");

let i1111ili = true,
    lIIl1li = [],
    lIllliii = [],
    iI1i11i1 = "",
    liIill = "",
    i1ilI = process.env.CXJNUM || "50",
    ll1Ili1I = process.env.CXJtop || "5";

if ($.isNode()) {
    Object.keys(I1l1IiIl).forEach(IlIIlli => {
        lIllliii.push(I1l1IiIl[IlIIlli]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else lIllliii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lilIlll1($.getdata("CookiesJD") || "[]").map(il11Iili => il11Iili.cookie)].filter(Iili1iI1 => !!Iili1iI1);

!(async () => {
    if (!lIllliii[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("当前版本：1.1.0 连续三次优惠券停止");
    console.log("\n执行流程，前" + ll1Ili1I + "CK车头--助力--抽奖--检查提现");
    console.log("问题建议：https://t.me/dylan_jdpro\n");

    for (let llIi1lii = 0; llIi1lii < ll1Ili1I; llIi1lii++) {
        if (lIllliii[llIi1lii]) {
            iI1i11i1 = lIllliii[llIi1lii];
            $.UserName = decodeURIComponent(iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/) && iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = llIi1lii + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = iI1iii.UARAM ? iI1iii.UARAM() : iI1iii.USER_AGENT;
            await i1i1llIl();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await illiliII.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await IIIll1ll(1);
            await $.wait(1000);
        }
    }

    console.log("\n\n开始助力：");
    let llIIiIl1 = 0;

    for (let Ii1I1i11 of lIIl1li) {
        console.log("\n去助力-> " + Ii1I1i11);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let IilliiIi = llIIiIl1; IilliiIi < lIllliii.length; IilliiIi++) {
            if (lIllliii[IilliiIi]) {
                iI1i11i1 = lIllliii[IilliiIi];
                $.UserName = decodeURIComponent(iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/) && iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = IilliiIi + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = iI1iii.UARAM ? iI1iii.UARAM() : iI1iii.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
                await iIIIii(Ii1I1i11);

                if ($.suc > i1ilI) {
                    llIIiIl1 = IilliiIi + 1;
                    break;
                }

                await $.wait(2000);
            }
        }

        if ($.index === lIllliii.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现：");

    for (let l1liIIl1 = 0; l1liIIl1 < lIllliii.length; l1liIIl1++) {
        if (lIllliii[l1liIIl1]) {
            iI1i11i1 = lIllliii[l1liIIl1];
            $.UserName = decodeURIComponent(iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/) && iI1i11i1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = l1liIIl1 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            $.UA = iI1iii.UARAM ? iI1iii.UARAM() : iI1iii.USER_AGENT;
            console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
            await IIIll1ll(0);
            $.log("当前有" + $.times + "次抽奖机会！");

            for (let iIi1I1i1 = 0; iIi1I1i1 < $.times; iIi1I1i1++) {
                $.log("开始第" + (iIi1I1i1 + 1) + "次抽奖:");
                await iiI1li1I();
                await $.wait(500);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    return;
                }
            }

            for (let iI11ilil = 0; iI11ilil < 5; iI11ilil++) {
                await Ili111li(iI11ilil + 1);
                await $.wait(400);
                if ($.baglist.length === 0) break;

                for (let iIlIl1I of $.baglist) {
                    iIlIl1I.prizeType == 4 && iIlIl1I.state == 0 && ($.log("\n开始提现 " + iIlIl1I.prizeConfigName), await I1illII1(iIlIl1I), await $.wait(5000));
                }
            }

            await $.wait(2000);
        }
    }
})().catch(illi1lll => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + illi1lll + "!", "");
}).finally(() => {
    $.done();
});

async function IIIll1ll(llI11IIl) {
    let IiliiiiI = "functionId=inviteFissionHome&body={\"linkId\":\"r6t4R7GyqpQdtgFN9juaQw\",\"inviter\":\"\"}&t=1680164158100&appid=activities_platform&client=android&clientVersion=4.9.0";
    return new Promise(async il1iiI1l => {
        $.post(l1Ilili(IiliiiiI), async (iii1ll1I, IiIi1liI, iIii1ll) => {
            try {
                if (iii1ll1I) {
                    console.log("" + JSON.stringify(iii1ll1I));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    iIii1ll = JSON.parse(iIii1ll);

                    if (iIii1ll.code == 0) {
                        $.times = iIii1ll.data.prizeNum;
                        if (llI11IIl) console.log("助力码：" + iIii1ll.data.inviter);
                        lIIl1li.push(iIii1ll.data.inviter);
                    } else console.log(iIii1ll.errMsg);
                }
            } catch (i1lIiill) {
                $.logErr(i1lIiill, IiIi1liI);
            } finally {
                il1iiI1l(iIii1ll);
            }
        });
    });
}

async function iiI1li1I() {
    let IIillI11 = "functionId=inviteFissionDrawPrize&body={\"linkId\":\"r6t4R7GyqpQdtgFN9juaQw\",\"inviter\":\"\"}&t=1680164158100&appid=activities_platform&client=android&clientVersion=4.9.0";
    return new Promise(async iil1II => {
        $.post(l1Ilili(IIillI11), async (I1IIIiI, I11il1li, iII1ii1l) => {
            try {
                if (I1IIIiI) {
                    console.log("" + JSON.stringify(I1IIIiI));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    iII1ii1l = JSON.parse(iII1ii1l);

                    if (iII1ii1l.code == 0) {
                        const lillli1 = iII1ii1l.data.prizeType;
                        if (!lillli1) fail++;

                        switch (lillli1) {
                            case 1:
                                console.log("----获得优惠券");
                                $.fail++;
                                break;

                            case 4:
                                console.log("----获得现金：" + iII1ii1l.data.prizeValue);
                                $.fail = 0;
                                break;

                            case 2:
                                console.log("----获得红包：" + iII1ii1l.data.prizeValue);
                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(iII1ii1l.data));
                        }
                    } else console.log(iII1ii1l.errMsg);
                }
            } catch (lIIl111) {
                $.logErr(lIIl111, I11il1li);
            } finally {
                iil1II(iII1ii1l);
            }
        });
    });
}

async function Ili111li(iIlilil) {
    let Il11iili = "functionId=superRedBagList&body={\"linkId\":\"r6t4R7GyqpQdtgFN9juaQw\",\"pageNum\":" + iIlilil + ",\"pageSize\":10,\"business\":\"fission\"}&t=1680164158100&appid=activities_platform&client=android&clientVersion=4.9.0";
    return new Promise(async ll1IIiIl => {
        $.get(l1Ilili(Il11iili), async (lilIlili, liIi1I1i, l11lI1l1) => {
            try {
                lilIlili ? (console.log("" + JSON.stringify(lilIlili)), console.log(" API请求失败，请检查网路重试")) : (l11lI1l1 = JSON.parse(l11lI1l1), l11lI1l1.code == 0 ? $.baglist = l11lI1l1.data.items : console.log(l11lI1l1.errMsg));
            } catch (i1Iiliii) {
                $.logErr(i1Iiliii, liIi1I1i);
            } finally {
                ll1IIiIl(l11lI1l1);
            }
        });
    });
}

async function iIIIii(il1ilill) {
    let lllII11I = {
        "linkId": "r6t4R7GyqpQdtgFN9juaQw",
        "isJdApp": true,
        "inviter": il1ilill
    },
        Ii1lIiii = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": lllII11I,
            "apid": "activities_platform",
            "ver": "4.9.0",
            "cl": "android",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    return lllII11I = await IiI1lill.getbody(Ii1lIiii), new Promise(async il11iIl => {
        $.post(l1Ilili(lllII11I), async (lIIIlii1, lili1iii, l1Ili1il) => {
            try {
                if (lIIIlii1) {
                    console.log("" + JSON.stringify(lIIIlii1));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    l1Ili1il = JSON.parse(l1Ili1il);

                    if (l1Ili1il.code == 0) {
                        if (!l1Ili1il.data.helpFlg) {
                            $.log("不能助力自己！");
                            return;
                        }

                        if (l1Ili1il.data.helpResult == 1) {
                            console.log("助力成功！");
                            $.suc++;
                            $.alr = 0;
                        } else {
                            if (l1Ili1il.data.helpResult == 6) {
                                console.log("已经助力过TA！");
                                $.alr++;
                            } else {
                                if (l1Ili1il.data.helpResult == 3) {
                                    console.log("没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (l1Ili1il.data.helpResult == 2) {
                                        $.log("助力黑了！");
                                        $.hot = true;
                                    } else {
                                        if (l1Ili1il.data.helpResult == 4) {
                                            $.log("没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            console.log(JSON.stringify(l1Ili1il));
                                        }
                                    }
                                }
                            }
                        }
                    } else console.log(l1Ili1il.errMsg);
                }
            } catch (illi1l1) {
                $.logErr(illi1l1, lili1iii);
            } finally {
                il11iIl(l1Ili1il);
            }
        });
    });
}

async function I1illII1(IiIii) {
    let IliiiII = "functionId=apCashWithDraw&body={\"linkId\":\"r6t4R7GyqpQdtgFN9juaQw\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + IiIii.id + ",\"business\":\"fission\",\"poolBaseId\":" + IiIii.poolBaseId + ",\"prizeGroupId\":" + IiIii.prizeGroupId + ",\"prizeBaseId\":" + IiIii.prizeBaseId + ",\"prizeType\":" + IiIii.prizeType + "}}&t=1680164158100&appid=activities_platform&client=android&clientVersion=4.9.0";
    return new Promise(async IlllIi1 => {
        $.post(l1Ilili(IliiiII), async (liililIi, i1liilil, il111llI) => {
            try {
                liililIi ? (console.log("" + JSON.stringify(liililIi)), console.log(" API请求失败，请检查网路重试")) : (il111llI = JSON.parse(il111llI), il111llI.code == 0 ? il111llI.data.message.indexOf("提现") > -1 ? console.log("----提现成功！") : console.log(il111llI.data.message) : console.log(il111llI.errMsg));
            } catch (Illii) {
                $.logErr(Illii, i1liilil);
            } finally {
                IlllIi1(il111llI);
            }
        });
    });
}

function l1Ilili(illIIli1) {
    return {
        "url": "https://api.m.jd.com/?" + illIIli1,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": iI1i11i1
        }
    };
}

function i1i1llIl() {
    return new Promise(ilIl1ll1 => {
        const lIIliiil = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": iI1i11i1,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(lIIliiil, (l1IliIl1, ii1IlIii, iIliIl1l) => {
            try {
                if (iIliIl1l) {
                    iIliIl1l = JSON.parse(iIliIl1l);

                    if (iIliIl1l.islogin === "1") { } else iIliIl1l.islogin === "0" && ($.isLogin = false);
                }
            } catch (IIl1IIli) {
                console.log(IIl1IIli);
            } finally {
                ilIl1ll1();
            }
        });
    });
}

function iII1lll() {
    return new Promise(II11lIil => {
        !i1111ili ? $.msg($.name, "", "" + liIill) : $.log("京东账号" + $.index + $.nickName + "\n" + liIill);
        II11lIil();
    });
}

function IIi1lIIi(IIiIliI) {
    try {
        if (typeof JSON.parse(IIiIliI) == "object") return true;
    } catch (IiIiIli) {
        return console.log(IiIiIli), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function lilIlll1(iiIii1i1) {
    if (typeof iiIii1i1 == "string") try {
        return JSON.parse(iiIii1i1);
    } catch (i1iiI1i) {
        return console.log(i1iiI1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }