/*
头文字J兑换

每日10点刷新库存

变量:export jd_car_play_exchangeid="兑换ID"

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#头文字J
1 1 1 1 * jd_car_exc.js, tag=头文字J兑换, enabled=true
*/
const $ = new Env("头文字J兑换");
const ll11I1 = $.isNode() ? require("./jdCookie.js") : "",
    IiIi1Ii1 = $.isNode() ? require("./sendNotify") : "",
    i1IIl1iI = require("./function/krgetToken");

CryptoJS = $.isNode() ? require("crypto-js") : CryptoJS;
let l11ili1 = [],
    IIIIi1l = "";
$.isNode() ? (Object.keys(ll11I1).forEach(IiiII1Ii => {
    l11ili1.push(ll11I1[IiiII1Ii]);
}), process.env.JD_DEBUG && process.env.JD_DEBUG === "false" && (console.log = () => { })) : l11ili1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1lI11i($.getdata("CookiesJD") || "[]").map(ii1lilI => {
    return ii1lilI.cookie;
})].filter(li1lIi => {
    return !!li1lIi;
});
const Il11iIIi = new Date();
Il11iIIi.setHours(10, 0, 0, 0);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.prizeInfoId = process.env.jd_car_play_exchangeid ? process.env.jd_car_play_exchangeid : "10082bd15b4704";
!(async () => {
    if (!l11ili1[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    $.appkey = "21699045";
    $.userId = "10299171";
    $.actId = "1760007";
    $.MixNicks = "";
    $.inviteNick = "";
    await iII1III();

    for (let i1i1li1 = 0; i1i1li1 < l11ili1.length; i1i1li1++) {
        IIIIi1l = l11ili1[i1i1li1];

        if (IIIIi1l) {
            $.UserName = decodeURIComponent(IIIIi1l.match(/pt_pin=([^; ]+)(?=;?)/) && IIIIi1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i1i1li1 + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            $.UA = await li1llII();
            await lII1ii();

            if ($.outFlag || $.activityEnd) {
                break;
            }
        }
    }

    if ($.outFlag) {
        let iI1li = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + iI1li);
        $.isNode() && (await IiIi1Ii1.sendNotify("" + $.name, "" + iI1li));
    }
})().catch(Il1llIII => {
    return $.logErr(Il1llIII);
}).finally(() => {
    return $.done();
});

async function lII1ii() {
    try {
        $.hasEnd = true;
        $.endTime = 0;
        lz_jdpin_token_cookie = "";
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";
        if ($.activityEnd) return;

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        $.Token = await i1IIl1iI(IIIIi1l, "https://mpdz-car-dz.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取[token]失败！");
            return;
        }

        await l1ll1Iii("activity_load");
        if ($.hotFlag) return;

        if ($.MixNick == "") {
            console.log("获取cookie失败");
            return;
        }

        console.log("目前分值：" + $.remainPoint);

        if ($.index == 1) {
            await l1ll1Iii("exchangeLoad");

            for (const lIilIIl of $.awardSettings) {
                console.log("");
                console.log("奖品：" + lIilIIl.awardName + "  积分：" + lIilIIl.awardDes + "  库存：" + lIilIIl.remainNum + "  兑换ID：" + lIilIIl.id);
            }
        }

        let Il11Iiii = Il11iIIi.getTime() - Date.now() + ($.difftime || 0);
        if (Il11Iiii > 60000) Il11Iiii = 0;
        await $.wait(Il11Iiii);

        if ($.prizeInfoId) {
            console.log("");
            await l1ll1Iii("exchangeJdMarket");
        } else {
            console.log("");
            console.log("未填写兑换ID，退出运行");
            $.activityEnd = true;
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } catch (iiIii1iI) {
        console.log(iiIii1iI);
    }
}

async function l1ll1Iii(Iiil1Ili) {
    if ($.outFlag) return;
    let I1l11i = "https://mpdz-car-dz.isvjcloud.com",
        iiIiIili = "",
        II1lIiii = "POST",
        IIIiI1l1 = "";

    switch (Iiil1Ili) {
        case "activity_load":
            url = I1l11i + "/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "") + "&push_way=1&user_id=" + $.userId;
            IIIiI1l1 = {
                "jdToken": $.Token,
                "inviteNick": $.inviteNick || ""
            };
            $.joinVenderId && (IIIiI1l1 = {
                ...IIIiI1l1,
                "shopId": "" + $.joinVenderId
            });
            iiIiIili = Ili11ll("/jdCardRunning/activity/load", IIIiI1l1);
            break;

        case "exchangeLoad":
            url = I1l11i + "/dm/front/jdCardRunning/exchange/exchangeLoad?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
            IIIiI1l1 = {};
            iiIiIili = Ili11ll("/jdCardRunning/exchange/exchangeLoad", IIIiI1l1);
            break;

        case "exchangeJdMarket":
            url = I1l11i + "/dm/front/jdCardRunning/exchange/exchangeJdMarket?open_id=&mix_nick=" + ($.MixNick || $.MixNicks || "");
            IIIiI1l1 = {
                "awardId": $.prizeInfoId
            };
            iiIiIili = Ili11ll("/jdCardRunning/exchange/exchangeJdMarket", IIIiI1l1);
            break;

        default:
            console.log("错误" + Iiil1Ili);
    }

    let II1IIiIl = i1111iiI(url, iiIiIili, II1lIiii);
    return new Promise(async I1111i1i => {
        $.post(II1IIiIl, (ilil1Il, III1IIi1, lil1liI1) => {
            try {
                ilil1Il ? (III1IIi1 && III1IIi1.statusCode && III1IIi1.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(ilil1Il, ilil1Il)), console.log(Iiil1Ili + " API请求失败，请检查网路重试")) : iII11lII(Iiil1Ili, lil1liI1);
            } catch (l11I1i1) {
                console.log(l11I1i1, III1IIi1);
            } finally {
                I1111i1i();
            }
        });
    });
}

async function iII11lII(Iilil1II, Iil1111) {
    let li1li1il = "";

    try {
        if (Iilil1II != "accessLogWithAD" || Iilil1II != "drawContent") {
            Iil1111 && (li1li1il = JSON.parse(Iil1111));
        }
    } catch (iiilii11) {
        console.log(Iilil1II + " 执行任务异常");
        $.runFalag = false;
    }

    try {
        let i1lI11l = "";

        switch (Iilil1II) {
            case "exchangeLoad":
                if (typeof li1li1il == "object") li1li1il.success && li1li1il.success === true && li1li1il.data ? li1li1il.data.status && li1li1il.data.status == 200 && ($.awardSettings = li1li1il.data.data.awardSettings || []) : li1li1il.message ? console.log(Iilil1II + " " + (li1li1il.message || "")) : console.log(Iil1111); else {
                    console.log(Iil1111);
                }
                break;

            case "accessLogWithAD":
            case "drawContent":
                break;

            case "activity_load":
            case "exchangeJdMarket":
                i1lI11l = "";

                if (typeof li1li1il == "object") {
                    if (li1li1il.success && li1li1il.success === true && li1li1il.data) {
                        if (li1li1il.data.status && li1li1il.data.status == 200) {
                            li1li1il = li1li1il.data;
                            Iilil1II != "setMixNick" && (li1li1il.msg || li1li1il.data.isOpenCard || li1li1il.data.remark) && console.log("" + (i1lI11l && i1lI11l + ":" || "") + (li1li1il.msg || li1li1il.data.isOpenCard || li1li1il.data.remark || ""));

                            if (Iilil1II == "activity_load") {
                                if (li1li1il.data) {
                                    $.endTime = li1li1il.data.cusActivity.endTime || 0;
                                    $.MixNick = li1li1il.data.missionCustomer.buyerNick || "";
                                    $.hasCollectShop = li1li1il.data.missionCustomer.hasCollectShop || 0;
                                    $.totalPoint = li1li1il.data.missionCustomer.totalPoint || 0;
                                    $.remainPoint = li1li1il.data.missionCustomer.remainPoint || 0;
                                    $.remainChance = li1li1il.data.missionCustomer.remainChance || 0;
                                }
                            } else {
                                if (Iilil1II == "shopList") {
                                    $.openList = li1li1il.data.cusShopList || [];
                                    renwulists = li1li1il.data.data || [];
                                } else {
                                    Iilil1II == "missionInviteList" && console.log("邀请人数(" + li1li1il.data.total + ")");
                                }
                            }
                        } else {
                            if (li1li1il.data.msg) {
                                li1li1il.errorMessage.indexOf("活动未开始") > -1 && ($.activityEnd = true);
                                console.log("" + (li1li1il.data.msg || ""));
                            } else {
                                if (li1li1il.errorMessage) {
                                    if (li1li1il.errorMessage.indexOf("火爆") > -1) { }

                                    console.log("" + (li1li1il.errorMessage || ""));
                                } else console.log("" + Iil1111);
                            }
                        }
                    } else li1li1il.errorMessage ? console.log("" + (li1li1il.errorMessage || "")) : console.log("" + Iil1111);
                } else console.log("" + Iil1111);

                break;

            default:
                console.log("" + Iil1111);
        }

        if (typeof li1li1il == "object") {
            if (li1li1il.errorMessage) {
                if (li1li1il.errorMessage.indexOf("火爆") > -1) { }
            }
        }
    } catch (liil1ll1) { }
}

function i1111iiI(i1ii1il1, ll1Ill11, I1I1iill = "POST") {
    let i1I1IIli = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": IIIIi1l,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    return i1ii1il1.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1 && (i1I1IIli.Origin = "https://mpdz-car-dz.isvjcloud.com", i1I1IIli.host = "mpdz-car-dz.isvjcloud.com", i1I1IIli["Content-Type"] = "application/json;charset=utf-8", delete i1I1IIli.Cookie), {
        "url": i1ii1il1,
        "method": I1I1iill,
        "headers": i1I1IIli,
        "body": ll1Ill11,
        "timeout": 60000
    };
}

function Ili11ll(iIil11li, i11ili1l) {
    d = {
        "actId": $.actId,
        ...i11ili1l,
        "method": iIil11li,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    sign2 = IililI1I(d);
    const IlIi1ilI = {
        "jsonRpc": "2.0",
        "params": {
            "commonParameter": {
                "m": "POST",
                "sign": sign2.sign,
                "timestamp": sign2.timeStamp,
                "userId": $.userId
            },
            "admJson": {
                "actId": $.actId,
                ...i11ili1l,
                "method": iIil11li,
                "userId": $.userId,
                "buyerNick": $.MixNick || ""
            }
        }
    };

    if (iIil11li.indexOf("missionInviteList") > -1) {
        delete IlIi1ilI.params.admJson.actId;
    }

    return $.toStr(IlIi1ilI, IlIi1ilI);
}

function lIIi11l1(iIiIiiIi, IlliIi1i) {
    return Math.floor(Math.random() * (IlliIi1i - iIiIiiIi)) + iIiIiiIi;
}

function IililI1I(iillIl) {
    time2 = new Date().valueOf();
    s2 = encodeURIComponent(JSON.stringify(iillIl));
    c = new RegExp("'", "g");
    A = new RegExp("~", "g");
    s2 = s2.replace(c, "%27");
    s2 = s2.replace(A, "%7E");
    signBody = "k9mbrALjx4pLq5sgpO" + s2 + "z" + time2 + "xgwky6n09be8ih0x63s9i5zwdfdmou00";
    sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
    return {
        "sign": sign,
        "timeStamp": time2
    };
}

function iII1III() {
    return new Promise(i1I1IIll => {
        const lIl1I1iI = {
            "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
            "headers": {
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(lIl1I1iI, (lliIi111, llli11l, l1l11liI) => {
            try {
                if (l1l11liI) {
                    l1l11liI = JSON.parse(l1l11liI);
                    $.difftime = Date.now() - l1l11liI.timestamp;
                }
            } catch (IllI1iI) {
                console.log(IllI1iI);
            } finally {
                i1I1IIll();
            }
        });
    });
}

async function li1llII() {
    id = CryptoJS.MD5(Date.now()).toString().substring(0, 16);
    CryptoJS.enc.Base64._map = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";
    const llIIIII = CryptoJS.enc.Utf8.parse(id),
        i111II1 = CryptoJS.enc.Base64.stringify(llIIIII);
    return ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "EG==",
            "ad": i111II1,
            "od": "",
            "ov": "Ctq=",
            "ud": i111II1
        },
        "ciphertype": 5,
        "version": "1.2.0",
        "appname": "com.jingdong.app.mall"
    })), "jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/" + ep + ";jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; Note9 Build/PKQ1.181203.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046010 Mobile Safari/537.36";
}

function i1lI11i(ii1lIii) {
    if (typeof ii1lIii == "string") try {
        return JSON.parse(ii1lIii);
    } catch (l1Il1llI) {
        return console.log(l1Il1llI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

