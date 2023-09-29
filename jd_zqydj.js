/*
攒券赢大奖任务

cron "25 4,16 * * *" script-path=jd_zqydj.js, tag=攒券赢大奖任务

首页 右下角图标  赌运气，中奖会收到短信

一般是晚上 8点开奖

 */
const $ = new Env('攒券赢大奖任务');
const Iil1IlI = $.isNode() ? require("./sendNotify") : "",
    iIIiIIil = $.isNode() ? require("./jdCookie.js") : "",
    IiIiIli = require("./function/h5st41.js");

let lI111111 = "JC9cthuNqBuYbUp_y8sgBQ",
    ii1i1IIl = "2268",
    iiilili1 = Date.now(),
    lIi1Ii1 = [],
    I1ilIiI1 = "",
    ili11Iil;

if ($.isNode()) {
    Object.keys(iIIiIIil).forEach(iI1liiI => {
        lIi1Ii1.push(iIIiIIil[iI1liiI]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else lIi1Ii1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIil11II($.getdata("CookiesJD") || "[]").map(IilI111i => IilI111i.cookie)].filter(IIIil1Ii => !!IIIil1Ii);

!(async () => {
    if (!lIi1Ii1[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    // authorCodeList = await I1ilIlIi("http://code.kingran.cf/zqydj.json");
    authorCodeList = []
    if (authorCodeList) {
        console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n");
        $.authorCode = authorCodeList[I11lIlI1(0, authorCodeList.length)];
    } else {
        let IiiIli1I = [""];
        $.authorCode = IiiIli1I[I11lIlI1(0, IiiIli1I.length)];
        console.log("❖ 准备就绪...\n");
    }

    $.shareUuid = $.authorCode;

    for (let i11iiii = 0; i11iiii < lIi1Ii1.length; i11iiii++) {
        if (lIi1Ii1[i11iiii]) {
            I1ilIiI1 = lIi1Ii1[i11iiii];
            $.UserName = decodeURIComponent(I1ilIiI1.match(/pt_pin=([^; ]+)(?=;?)/) && I1ilIiI1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = i11iiii + 1;
            $.isLogin = true;
            $.nickName = "";
            ili11Iil = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await Iil1IlI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            $.jda = "__jda=" + IilIiI1I("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
            $.UA = await liilIII();
            await lIliilIi();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }

        if ($.hasEnd) break;
    }
})().catch(iIlIII11 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + iIlIII11 + "!", "");
}).finally(() => {
    $.done();
});

async function lIliilIi() {
    $.nowcontinue = false;
    await lIl11I11();
    if ($.hasEnd) return;
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    if ($.nowcontinue) {
        await lIIII1I1();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        await I11i1ili();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        $.index == 1 && ($.shareUuid = $.userCode);
    }
}

function iIiIIIil(IiiII1l1) {
    try {
        if (typeof JSON.parse(IiiII1l1) == "object") return true;
    } catch (IiII1II1) {
        return console.log(IiII1II1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function iIil11II(IliII1il) {
    if (typeof IliII1il == "string") {
        try {
            return JSON.parse(IliII1il);
        } catch (lI1lii11) {
            return console.log(lI1lii11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}

async function lIl11I11() {
    return new Promise(async iI11IiiI => {
        const IIli1ii1 = {
            "functionId": "scarceGoodsLotteryHome",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": iiilili1,
            "body": {
                "linkId": lI111111,
                "taskId": ii1i1IIl,
                "inviter": $.shareUuid,
                "inJdApp": true
            }
        };
        $.h5st = await lll1il("01d65", IIli1ii1);
        let ll1ili1i = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
                "User-Agent": $.UA,
                "Cookie": I1ilIiI1,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(ll1ili1i, async (IiI1lliI, IllI1li, ii1lIiIi) => {
            try {
                if (IiI1lliI) console.log("" + JSON.stringify(IiI1lliI)); else {
                    ii1lIiIi = JSON.parse(ii1lIiIi);

                    if (ii1lIiIi.code == 0) {
                        $.nowcontinue = true;
                        $.giftCode = ii1lIiIi?.["data"]?.["giftCode"];
                        $.userCode = ii1lIiIi?.["data"]?.["userCode"];
                        $.helpResult = ii1lIiIi?.["data"]?.["helpResult"];
                        let lIi1iiI1 = ii1lIiIi?.["data"]?.["prizeList"] || [],
                            I1IIllI1 = ii1lIiIi?.["data"]?.["lotteryTime"];
                        $.prizeList = "";

                        for (let I1Ill11i = 0; I1Ill11i < lIi1iiI1.length; I1Ill11i++) {
                            $.name = lIi1iiI1[I1Ill11i].name;
                            $.prizeType = lIi1iiI1[I1Ill11i].type;
                            $.originalPrice = lIi1iiI1[I1Ill11i].originalPrice;
                            $.lotteryPrice = lIi1iiI1[I1Ill11i].lotteryPrice;
                            $.prizeValue = lIi1iiI1[I1Ill11i].prizeValue;
                            I1Ill11i != lIi1iiI1.length - 1 ? $.prizeList += $.name + "：" + $.lotteryPrice + "购买\n" : $.prizeList += $.name + "：" + $.lotteryPrice + "购买";
                        }

                        if (I1IIllI1 == null) {
                            $.hasEnd = true;
                            console.log("当期活动已经结束");
                            return;
                        }

                        console.log("开奖时间：" + I1IIllI1 + "\n当前奖品汇总：\n" + $.prizeList);
                    } else ii1lIiIi.code == 402 ? console.log("进入首页失败," + (ii1lIiIi?.["errMsg"] || "")) : console.log("进入首页失败," + (ii1lIiIi?.["errMsg"] || ""));
                }
            } catch (Ii11lii) {
                $.logErr(Ii11lii, IllI1li);
            } finally {
                iI11IiiI();
            }
        });
    });
}

async function I11i1ili() {
    return new Promise(async IIl1IllI => {
        const lIi1illI = {
            "functionId": "scarceGoodsMyLotteryCode",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": iiilili1,
            "body": {
                "linkId": lI111111
            }
        };
        $.h5st = await lll1il("01d65", lIi1illI);
        let lIilii1I = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
                "User-Agent": $.UA,
                "Cookie": I1ilIiI1,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(lIilii1I, async (IIllIil, llii1IiI, i11ilill) => {
            try {
                if (IIllIil) console.log("" + JSON.stringify(IIllIil)); else {
                    i11ilill = JSON.parse(i11ilill);

                    if (i11ilill.code == 0) {
                        let iil1I1I1 = i11ilill?.["data"];
                        $.mycode = "";

                        for (let Iii1llli = 0; Iii1llli < iil1I1I1.length; Iii1llli++) {
                            $.code = iil1I1I1[Iii1llli].code;
                            $.prizeType = iil1I1I1[Iii1llli].codeType;
                            $.desc = iil1I1I1[Iii1llli].desc;
                            Iii1llli != iil1I1I1.length - 1 ? $.mycode += $.code + "-" + $.desc + "\n" : $.mycode += $.code + "-" + $.desc;
                        }

                        console.log("\n当前卷码汇总( " + iil1I1I1.length + " 张)");
                    } else {
                        if (i11ilill.code == 402) console.log("进入首页失败," + (i11ilill?.["errMsg"] || "")); else {
                            console.log("进入首页失败," + (i11ilill?.["errMsg"] || ""));
                        }
                    }
                }
            } catch (Ii1IlIIl) {
                $.logErr(Ii1IlIIl, llii1IiI);
            } finally {
                IIl1IllI();
            }
        });
    });
}

async function lIIII1I1() {
    let ii11llii = {
        "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22" + lI111111 + "%22%7D&t=" + iiilili1 + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
        "headers": {
            "origin": "https://h5platform.jd.com",
            "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
            "User-Agent": $.UA,
            "Cookie": I1ilIiI1,
            "content-type": "application/x-www-form-urlencoded",
            "accept": "application/json, text/plain, */*"
        },
        "timeout": 20 * 1000
    };
    return new Promise(lliI1Il => {
        $.get(ii11llii, async (llil1l1l, lIlI1Iii, illIiii1) => {
            try {
                if (llil1l1l) $.log(llil1l1l); else {
                    illIiii1 = JSON.parse(illIiii1);

                    if (illIiii1?.["code"] == 0) {
                        let lIIlIiii = illIiii1?.["data"] || [];

                        for (let Ii1iIl = 0; Ii1iIl < lIIlIiii.length; Ii1iIl++) {
                            $.taskTitle = lIIlIiii[Ii1iIl].taskTitle;
                            $.apTaskListid = lIIlIiii[Ii1iIl].id;
                            $.taskType = lIIlIiii[Ii1iIl].taskType;
                            $.taskSourceUrl = lIIlIiii[Ii1iIl].taskSourceUrl;
                            $.taskFinished = lIIlIiii[Ii1iIl].taskFinished;
                            $.taskDoTimes = lIIlIiii[Ii1iIl].taskDoTimes;
                            if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let I1ill1Il = 0; I1ill1Il < 1; I1ill1Il++) {
                                console.log("去做 " + $.taskTitle);
                                await l11i11II($.taskType, $.apTaskListid, $.taskSourceUrl);
                                await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                            }
                        }
                    } else console.log("查询任务失败," + (illIiii1?.["errMsg"] || illIiii1?.["msg"] || ""));
                }
            } catch (iIIIll) {
                $.log(iIIIll);
            } finally {
                lliI1Il();
            }
        });
    });
}

async function l11i11II(li1IIlil, II1i1lIl, lIIi1Ili) {
    return new Promise(async i1lI1Ili => {
        const i1Ii1Il = {
            "functionId": "apsDoTask",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": iiilili1,
            "body": {
                "taskType": li1IIlil,
                "taskId": II1i1lIl,
                "channel": 4,
                "checkVersion": true,
                "cityId": "",
                "provinceId": "",
                "countyId": "",
                "linkId": lI111111,
                "itemId": lIIi1Ili
            }
        };
        $.h5st = await lll1il("54ed7", i1Ii1Il);
        let lllIIli = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
                "User-Agent": $.UA,
                "Cookie": I1ilIiI1,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(lllIIli, async (ll1li, I1I1lll1, llIli1l1) => {
            try {
                if (ll1li) {
                    console.log("" + JSON.stringify(ll1li));
                } else {
                    llIli1l1 = JSON.parse(llIli1l1);
                    if (llIli1l1.code == 0) console.log("完成任务,获得一张奖券：" + llIli1l1?.["data"]?.["finishNeed"]), $.drawLotteryNum++; else llIli1l1.code == 402 ? console.log("完成任务失败," + (llIli1l1?.["errMsg"] || "")) : console.log("完成任务失败," + (llIli1l1?.["errMsg"] || ""));
                }
            } catch (li1IiliI) {
                $.logErr(li1IiliI, I1I1lll1);
            } finally {
                i1lI1Ili();
            }
        });
    });
}

function ili11Ill(lIIIIlli) {
    lIIIIlli = lIIIIlli || 32;
    let lIl1111 = "abcdef0123456789",
        IIiilll = lIl1111.length,
        ii1Illii = "";

    for (i = 0; i < lIIIIlli; i++) ii1Illii += lIl1111.charAt(Math.floor(Math.random() * IIiilll));

    return ii1Illii;
}

async function lll1il(iiiIiiii, liiIIlil) {
    try {
        let ll1Ii11i = new IiIiIli({
            "appId": iiiIiiii,
            "appid": "activities_platform",
            "clientVersion": liiIIlil?.["clientVersion"],
            "client": liiIIlil?.["client"],
            "pin": $.UserName,
            "ua": $.UA,
            "version": "4.1"
        });
        return await ll1Ii11i.genAlgo(), body = await ll1Ii11i.genUrlParams(liiIIlil.functionId, liiIIlil.body), body;
    } catch (lI1liI) { }
}

function llli11iI(l1i1iil1) {
    return l1i1iil1.then(ilI1II1I => {
        return [null, ilI1II1I];
    }).catch(l11iIi1I => [l11iIi1I]);
}

function iiiI1lIi(iiiiI1i, IiIll1i = {}) {
    let liiI1l1I = [],
        IiiIIiIi = IiIll1i.connector || "&",
        llI1i1i = Object.keys(iiiiI1i);
    if (IiIll1i.sort) llI1i1i = llI1i1i.sort();

    for (let iiIiIIli of llI1i1i) {
        let iIliiIll = iiiiI1i[iiIiIIli];
        if (iIliiIll && typeof iIliiIll === "object") iIliiIll = JSON.stringify(iIliiIll);
        if (iIliiIll && IiIll1i.encode) iIliiIll = encodeURIComponent(iIliiIll);
        liiI1l1I.push(iiIiIIli + "=" + iIliiIll);
    }

    return liiI1l1I.join(IiiIIiIi);
}

async function liilIII() {
    for (var iii11i1 = "", liiill11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", l11IIii1 = 0; l11IIii1 < 16; l11IIii1++) {
        var iilil1Ii = Math.round(Math.random() * (liiill11.length - 1));
        iii11i1 += liiill11.substring(iilil1Ii, iilil1Ii + 1);
    }

    return uuid = Buffer.from(iii11i1, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "ts": new Date().getTime(),
        "ridx": -1,
        "cipher": {
            "sv": "CJGkEK==",
            "ud": uuid,
            "iad": ""
        },
        "ciphertype": 5,
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile"
    })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}

function IilIiI1I(I1IllIiI = "xxxxxxxxxxxxxxxxxxxx") {
    return I1IllIiI.replace(/[xy]/g, function (I1I1i111) {
        var Illl11ii = Math.random() * 10 | 0,
            iliI1I1i = I1I1i111 == "x" ? Illl11ii : Illl11ii & 3 | 8;
        return jdaid = iliI1I1i.toString(), jdaid;
    });
}

function I1ilIlIi(i1i11111) {
    return new Promise(I11l111l => {
        const Ill1i1ii = {
            "url": "" + i1i11111,
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(Ill1i1ii, async (iiiI11ll, iIl1ili1, IIll1Ill) => {
            try {
                if (iiiI11ll) { } else IIll1Ill ? IIll1Ill = JSON.parse(IIll1Ill) : console.log("未获取到数据,请重新运行");
            } catch (iIlI11) {
                $.logErr(iIlI11, iIl1ili1);
                IIll1Ill = null;
            } finally {
                I11l111l(IIll1Ill);
            }
        });
    });
}

function I11lIlI1(I1iIlll, III11Ii1) {
    return Math.floor(Math.random() * (III11Ii1 - I1iIlll)) + I1iIlll;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
