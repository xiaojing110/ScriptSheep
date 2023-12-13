/*
天天领红包

cron "25 7 * * *" script-path=jd_ttlhb.js, tag=天天领红包

轮询提现变量：jd_ttlhb_num //轮询提现页数  一般无需填写

 */
const $ = new Env('天天领红包');
const iIIli1 = $.isNode() ? require("./sendNotify") : "",
    Ii1l1i = $.isNode() ? require("./jdCookie.js") : "",
    l1lIl = require("./function/h5st41.js");

let i1Iiil = "l-yLvQMhLwCqYy6_nXUBgg",
    i1Iiii = process.env.jd_ttlhb_num ? process.env.jd_ttlhb_num : "1",
    l1lIi = Date.now(),
    l1lili = [],
    IIlI1l = "",
    lI1I11;

if ($.isNode()) {
    Object.keys(Ii1l1i).forEach(i1lii => {
        l1lili.push(Ii1l1i[i1lii]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else l1lili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ili1Il($.getdata("CookiesJD") || "[]").map(iilIII => iilIII.cookie)].filter(liI1Il => !!liI1Il);

!(async () => {
    if (!l1lili[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let IIlI1I = 0; IIlI1I < l1lili.length; IIlI1I++) {
        if (l1lili[IIlI1I]) {
            IIlI1l = l1lili[IIlI1I];
            $.UserName = decodeURIComponent(IIlI1l.match(/pt_pin=([^; ]+)(?=;?)/) && IIlI1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = IIlI1I + 1;
            $.isLogin = true;
            $.nickName = "";
            lI1I11 = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await iIIli1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            $.jda = "__jda=" + I1iIl("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
            $.UA = await i1lil();
            await IilIl();
            await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
        }
    }
})().catch(I1Ilii => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + I1Ilii + "!", "");
}).finally(() => {
    $.done();
});

async function IilIl() {
    $.txhot = false;
    $.nowcontinue = false;
    await i1liI();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    if ($.nowcontinue) {
        await I1iII();
        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

        for (let l1IIl1 = 0; l1IIl1 < $.remainChance; l1IIl1++) {
            await iilIIi();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }

        console.log("\n当前设置轮询提现页数：" + i1Iiii);

        for (let lIIi1l = 0; lIIi1l < i1Iiii; lIIi1l++) {
            $.pageNum = lIIi1l + 1;
            console.log("\n开始轮询提现" + $.pageNum + "页");
            await iilII1($.pageNum);
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            if ($.txhot) break;
        }
    }
}

function IilIi(iiiII1) {
    try {
        if (typeof JSON.parse(iiiII1) == "object") return true;
    } catch (IiIlI) {
        return console.log(IiIlI), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function Ili1Il(iIlI1i) {
    if (typeof iIlI1i == "string") try {
        return JSON.parse(iIlI1i);
    } catch (iIlI1l) {
        return console.log(iIlI1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

async function i1liI() {
    return new Promise(async iIlI11 => {
        const l1IIlI = {
            "functionId": "lhb4b_home",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "linkId": i1Iiil,
                "inviter": ""
            }
        };
        $.h5st = await i1Iil1("d5a39", l1IIlI);
        let iil111 = {
            "url": "https://api.m.jd.com/",
            "body": "" + $.h5st,
            "headers": {
                "origin": "https://pro.m.jd.com",
                "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(iil111, async (iiiIII, Ill1I1, lIi1ii) => {
            try {
                if (iiiIII) {
                    console.log("" + JSON.stringify(iiiIII));
                } else {
                    lIi1ii = JSON.parse(lIi1ii);

                    if (lIi1ii.code == 0) {
                        $.nowcontinue = true;
                        let IlllI = lIi1ii?.["data"]?.["ongoingOpenDuration"],
                            ll11II = lIi1ii?.["data"]?.["totalAward"] || [];
                        $.remainChance = lIi1ii?.["data"]?.["remainChance"];
                        $.prizeList = "";

                        for (let liIlII = 0; liIlII < ll11II.length; liIlII++) {
                            $.amount = ll11II[liIlII].amount;
                            $.prizeType = ll11II[liIlII].prizeType;

                            switch ($.prizeType) {
                                case 1:
                                    $.prizeType = "[优惠券]";
                                    break;

                                case 2:
                                    $.prizeType = "[红包]";
                                    break;

                                case 3:
                                    $.prizeType = "[实物]";
                                    break;

                                case 4:
                                    $.prizeType = "[现金]";
                                    break;

                                default:
                                    console.log($.prizeType);
                                    return;
                            }

                            if (liIlII != ll11II.length - 1) {
                                $.prizeList += $.prizeType + "：" + $.amount + "，";
                            } else $.prizeList += $.prizeType + "：" + $.amount;
                        }

                        console.log("当前汇总：" + $.prizeList);

                        if (lIi1ii?.["data"]?.["ongoingOpenState"] == 1 || lIi1ii?.["data"]?.["ongoingOpenState"] == 2) {
                            console.log("可以进行" + IlllI + "秒无限开红包");
                            $.lhb4b_open = true;

                            while ($.lhb4b_open) {
                                await iilIIi();
                                await $.wait(parseInt(Math.random() * 1000 + 500, 10));
                            }
                        }
                    } else lIi1ii.code == 402 ? console.log("进入首页失败," + (lIi1ii?.["errMsg"] || "")) : console.log("进入首页失败," + (lIi1ii?.["errMsg"] || ""));
                }
            } catch (iil11l) {
                $.logErr(iil11l, Ill1I1);
            } finally {
                iIlI11();
            }
        });
    });
}

async function iilIIi() {
    return new Promise(async i11iI => {
        const lIiIi = {
            "functionId": "lhb4b_open",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "linkId": i1Iiil,
                "openMode": 0
            }
        };
        $.h5st = await i1Iil1("7af4f", lIiIi);
        let Il1i = {
            "url": "https://api.m.jd.com/",
            "body": "" + $.h5st,
            "headers": {
                "origin": "https://pro.m.jd.com",
                "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(Il1i, async (lIiIl, iiil1l, Il1l) => {
            try {
                if (lIiIl) console.log("" + JSON.stringify(lIiIl)); else {
                    Il1l = JSON.parse(Il1l);
                    if (Il1l.code == 0) switch (Il1l?.["data"]?.["received"]?.["prizeType"]) {
                        case 1:
                            console.log("获得," + Il1l?.["data"]?.["received"]?.["prizeValue"] + "-" + Il1l?.["data"]?.["received"]?.["prizeDesc"] + "-" + Il1l?.["data"]?.["received"]?.["prizeEndTime"]);
                            break;

                        case 2:
                            console.log("获得红包," + Il1l?.["data"]?.["received"]?.["prizeValue"] + "-" + Il1l?.["data"]?.["received"]?.["prizeDesc"] + "-" + Il1l?.["data"]?.["received"]?.["prizeEndTime"]);
                            break;

                        case 4:
                            console.log("获得现金," + Il1l?.["data"]?.["received"]?.["prizeValue"] + "-" + Il1l?.["data"]?.["received"]?.["prizeDesc"] + "-" + Il1l?.["data"]?.["received"]?.["prizeEndTime"]);
                            break;

                        case null:
                            console.log("运气不太好，什么都没有抽到...");
                            break;

                        default:
                            console.log(Il1l?.["data"]?.["received"]?.["prizeType"]);
                            return;
                    } else {
                        if (Il1l.code == 402) console.log("开红包失败," + (Il1l?.["errMsg"] || "")); else {
                            console.log("开红包失败," + (Il1l?.["errMsg"] || ""));
                            $.lhb4b_open = false;
                        }
                    }
                }
            } catch (I1liii) {
                $.logErr(I1liii, iiil1l);
            } finally {
                i11iI();
            }
        });
    });
}

async function I1iII() {
    const l1I11I = {
        "functionId": "apTaskList",
        "appid": "activities_platform",
        "clientVersion": "12.0.1",
        "client": "apple",
        "t": l1lIi,
        "body": {
            "linkId": i1Iiil
        }
    };
    $.h5st = await i1Iil1("d5a39", l1I11I);
    let I1liil = {
        "url": "https://api.m.jd.com/",
        "body": "" + $.h5st,
        "headers": {
            "origin": "https://pro.m.jd.com",
            "Referer": "https://pro.m.jd.com/mall/active/49CfTHN1tUanwyZ6mVHo26hGiqiY/index.html",
            "User-Agent": $.UA,
            "Cookie": IIlI1l,
            "content-type": "application/x-www-form-urlencoded",
            "accept": "application/json, text/plain, */*"
        },
        "timeout": 20 * 1000
    };
    return new Promise(liI1 => {
        $.post(I1liil, async (Ii1I1, i11Il1, IIIlli) => {
            try {
                if (Ii1I1) $.log(Ii1I1); else {
                    IIIlli = JSON.parse(IIIlli);

                    if (IIIlli?.["code"] == 0) {
                        let llli1I = IIIlli?.["data"] || [];

                        for (let IlilI1 = 0; IlilI1 < llli1I.length; IlilI1++) {
                            $.taskTitle = llli1I[IlilI1].taskTitle;
                            $.apTaskListid = llli1I[IlilI1].id;
                            $.taskType = llli1I[IlilI1].taskType;
                            $.taskSourceUrl = llli1I[IlilI1].taskSourceUrl;
                            $.taskDoTimes = llli1I[IlilI1].taskDoTimes;
                            $.taskFinished = llli1I[IlilI1].taskFinished;
                            $.taskShowTitle = llli1I[IlilI1].taskShowTitle;
                            $.timeLimitPeriod = llli1I[IlilI1].timeLimitPeriod;

                            if ($.timeLimitPeriod == null) {
                                if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let iIIIi = 0; iIIIi < 1; iIIIi++) {
                                    console.log("去做 " + $.taskShowTitle);
                                    await Ili1Ii($.taskType, $.apTaskListid, $.taskSourceUrl);
                                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                                }
                            } else {
                                if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let Il1iII = 0; Il1iII < 1; Il1iII++) {
                                    console.log("去做 " + $.taskShowTitle);
                                    await IIlI1i($.apTaskListid, $.taskSourceUrl);
                                    await iiiI1i($.apTaskListid);
                                    await $.wait($.timeLimitPeriod * 1000 + 1500, 10);
                                    await iiiI1l($.apTaskListid);
                                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                                    await Ii1l1I();
                                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                                }
                            }
                        }
                    } else console.log("查询任务失败," + (IIIlli?.["errMsg"] || IIIlli?.["msg"] || ""));
                }
            } catch (liIIli) {
                $.log(liIIli);
            } finally {
                liI1();
            }
        });
    });
}

async function IIlI1i(liIl, llli11) {
    return new Promise(async Iii1il => {
        const lIi1li = {
            "functionId": "apStartTaskTime",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "taskId": liIl,
                "channel": 4,
                "linkId": i1Iiil,
                "itemId": llli11
            }
        };
        $.h5st = await i1Iil1("76674", lIi1li);
        let Ii1Ii = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(Ii1Ii, async (Il1iIl, lIi1ll, l1IIiI) => {
            try {
                if (Il1iIl) console.log("" + JSON.stringify(Il1iIl)); else {
                    l1IIiI = JSON.parse(l1IIiI);

                    if (l1IIiI.code == 0) { } else {
                        if (l1IIiI.code == 402) { } else { }
                    }
                }
            } catch (IlilIl) {
                $.logErr(IlilIl, lIi1ll);
            } finally {
                Iii1il();
            }
        });
    });
}

async function iiiI1i(Iii1l1) {
    return new Promise(async liliI1 => {
        const II1lI = {
            "functionId": "apCheckAndResetTaskTime",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "taskId": Iii1l1,
                "linkId": i1Iiil
            }
        };
        $.h5st = await i1Iil1("76674", II1lI);
        let ilIlil = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(ilIlil, async (Ii1IiI, IIll11, ll1lIl) => {
            try {
                if (Ii1IiI) console.log("" + JSON.stringify(Ii1IiI)); else {
                    ll1lIl = JSON.parse(ll1lIl);

                    if (ll1lIl.code == 0) { } else {
                        if (ll1lIl.code == 402) { } else { }
                    }
                }
            } catch (liliII) {
                $.logErr(liliII, IIll11);
            } finally {
                liliI1();
            }
        });
    });
}

async function iiiI1l(iIiiII) {
    return new Promise(async li11iI => {
        const liii1l = {
            "functionId": "apCheckTaskTimeEnd",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "taskId": iIiiII,
                "linkId": i1Iiil
            }
        };
        $.h5st = await i1Iil1("76674", liii1l);
        let I1iiII = {
            "url": "https://api.m.jd.com/api?" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(I1iiII, async (iIIIi1, lIiIiI, ilIliI) => {
            try {
                if (iIIIi1) console.log("" + JSON.stringify(iIIIi1)); else {
                    ilIliI = JSON.parse(ilIliI);
                    if (ilIliI.code == 0) console.log("浏览时间结束"); else ilIliI.code == 402 ? console.log("浏览时间失败," + (ilIliI?.["errMsg"] || "")) : console.log("浏览时间失败," + (ilIliI?.["errMsg"] || ""));
                }
            } catch (li1iI) {
                $.logErr(li1iI, lIiIiI);
            } finally {
                li11iI();
            }
        });
    });
}

async function Ili1Ii(liii11, lIiIii, i1Ill) {
    return new Promise(async IIlIII => {
        const i1Iil = {
            "functionId": "apsDoTask",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "taskType": liii11,
                "taskId": lIiIii,
                "channel": 4,
                "checkVersion": true,
                "linkId": i1Iiil,
                "itemId": i1Ill
            }
        };
        $.h5st = await i1Iil1("54ed7", i1Iil);
        let lIi11i = {
            "url": "https://api.m.jd.com/",
            "body": "" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(lIi11i, async (i1Iii, IIiI1I, lIi11l) => {
            try {
                if (i1Iii) console.log("" + JSON.stringify(i1Iii)); else {
                    lIi11l = JSON.parse(lIi11l);
                    if (lIi11l.code == 0) $.remainChance++, console.log("完成任务,抽奖次数：" + $.remainChance); else lIi11l.code == 402 ? console.log("完成任务失败," + (lIi11l?.["errMsg"] || "")) : console.log("完成任务失败," + (lIi11l?.["errMsg"] || ""));
                }
            } catch (lIl1Il) {
                $.logErr(lIl1Il, IIiI1I);
            } finally {
                IIlIII();
            }
        });
    });
}

async function Ii1l1I() {
    return new Promise(async lIilI1 => {
        const Ii1Il1 = {
            "functionId": "apDoLimitTimeTask",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "apple",
            "t": l1lIi,
            "body": {
                "linkId": i1Iiil
            }
        };
        $.h5st = await i1Iil1("ebecc", Ii1Il1);
        let iIIIli = {
            "url": "https://api.m.jd.com/",
            "body": "" + $.h5st,
            "headers": {
                "origin": "https://h5platform.jd.com",
                "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
                "User-Agent": $.UA,
                "Cookie": IIlI1l,
                "content-type": "application/x-www-form-urlencoded",
                "accept": "application/json, text/plain, */*"
            },
            "timeout": 20 * 1000
        };
        $.post(iIIIli, async (Ii1Iil, ll1IiI, li1li) => {
            try {
                if (Ii1Iil) console.log("" + JSON.stringify(Ii1Iil)); else {
                    li1li = JSON.parse(li1li);
                    if (li1li.code == 0) $.remainChance++, console.log("完成任务,抽奖次数：" + $.remainChance); else li1li.code == 402 ? console.log("完成任务失败," + (li1li?.["errMsg"] || "")) : console.log("完成任务失败," + (li1li?.["errMsg"] || ""));
                }
            } catch (ll1Ii1) {
                $.logErr(ll1Ii1, ll1IiI);
            } finally {
                lIilI1();
            }
        });
    });
}

async function iilII1(li1ll) {
    return new Promise(async l1lIIl => {
        const i1lIi = {
            "functionId": "superRedBagList",
            "appid": "activities_platform",
            "clientVersion": "12.0.1",
            "client": "ios",
            "body": {
                "linkId": i1Iiil,
                "pageNum": li1ll,
                "pageSize": 100,
                "business": "lhb4b"
            }
        },
            iilIiI = await i1Iil1("f2b1d", i1lIi);
        let III1li = {
            "url": "https://api.m.jd.com/?" + iilIiI,
            "headers": {
                "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
                "origin": "https://pro.m.jd.com",
                "User-Agent": $.UA,
                "Cookie": IIlI1l
            },
            "timeout": 30 * 1000
        };
        $.get(III1li, async (l1ll1I, i1lI1, l1ll11) => {
            try {
                if (l1ll1I) {
                    console.log("" + JSON.stringify(l1ll1I));
                } else {
                    l1ll11 = JSON.parse(l1ll11);

                    if (l1ll11) {
                        if (l1ll11.code == 0 && l1ll11.success == true) {
                            const lIiIil = (l1ll11.data.items || []).filter(llIiii => llIiii.prizeType === 4 && llIiii.state === 0 || llIiii.state === 2);

                            for (let IlII of lIiIil) {
                                console.log("天天领红包提现，去提现" + IlII.amount + "现金");
                                await iiiI11(IlII.id, IlII.poolBaseId, IlII.prizeGroupId, IlII.prizeBaseId);
                                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));

                                if ($.txhot) {
                                    console.log("天天领红包提现失败，当月额度已满");
                                    break;
                                }
                            }
                        } else console.log("天天领红包提现查询奖品：异常:" + JSON.stringify(l1ll11));
                    }
                }
            } catch (l1ll1l) {
                $.logErr(l1ll1l, i1lI1);
            } finally {
                l1lIIl();
            }
        });
    });
}

async function iiiI11(iIIlIl, iIIlIi, iilIll, iilIli) {
    return new Promise(async l1III => {
        const III1l1 = {
            "linkId": i1Iiil,
            "businessSource": "NONE",
            "base": {
                "prizeType": 4,
                "business": "lhb4b",
                "id": iIIlIl,
                "poolBaseId": iIIlIi,
                "prizeGroupId": iilIll,
                "prizeBaseId": iilIli
            }
        },
            Il111 = {
                "url": "https://api.m.jd.com",
                "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(III1l1)) + "&_t=" + +new Date() + "&appid=activities_platform",
                "headers": {
                    "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
                    "origin": "https://pro.m.jd.com",
                    "User-Agent": $.UA,
                    "Cookie": IIlI1l
                },
                "timeout": 30 * 1000
            };
        $.post(Il111, async (lIiIli, IiIII, IiIiii) => {
            try {
                if (lIiIli) console.log("" + JSON.stringify(lIiIli)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    if (IilIi(IiIiii)) {
                        IiIiii = $.toObj(IiIiii);

                        if (IiIiii.code === 0) {
                            if (IiIiii.data.status === "310") console.log("提现现金成功！"); else {
                                console.log("提现现金：失败:" + IiIiii.data.message);

                                if (IiIiii.data.message.includes("上限")) {
                                    $.txhot = true;
                                } else IiIiii.data.message.includes("已存在状态") && (await $.wait(parseInt(Math.random() * 2000 + 5000, 10)), await iiiI11(iIIlIl, iIIlIi, iilIll, iilIli));
                            }
                        } else console.log("提现现金：异常:" + JSON.stringify(IiIiii));
                    }
                }
            } catch (I1IlI1) {
                $.logErr(I1IlI1, IiIII);
            } finally {
                l1III(IiIiii);
            }
        });
    });
}

function l1lilI(iIIlII) {
    iIIlII = iIIlII || 32;
    let IiIiiI = "abcdef0123456789",
        IlIi1i = IiIiiI.length,
        lIllii = "";

    for (i = 0; i < iIIlII; i++) lIllii += IiIiiI.charAt(Math.floor(Math.random() * IlIi1i));

    return lIllii;
}

async function i1Iil1(l1iil1, iiiIiI) {
    try {
        let illl11 = new l1lIl({
            "appId": l1iil1,
            "appid": "activities_platform",
            "clientVersion": iiiIiI?.["clientVersion"],
            "client": iiiIiI?.["client"],
            "pin": $.UserName,
            "ua": $.UA,
            "version": "4.1"
        });
        return await illl11.genAlgo(), body = await illl11.genUrlParams(iiiIiI.functionId, iiiIiI.body), body;
    } catch (iiI1) { }
}

function liI1Ii(Il11l) {
    return Il11l.then(iiiIi1 => {
        return [null, iiiIi1];
    }).catch(IiIIl => [IiIIl]);
}

function l1lil1(IiIIi, li1lli = {}) {
    let I1i1I = [],
        IIl1 = li1lli.connector || "&",
        l1ili = Object.keys(IiIIi);
    if (li1lli.sort) l1ili = l1ili.sort();

    for (let Iil1I of l1ili) {
        let illIIl = IiIIi[Iil1I];
        if (illIIl && typeof illIIl === "object") illIIl = JSON.stringify(illIIl);
        if (illIIl && li1lli.encode) illIIl = encodeURIComponent(illIIl);
        I1i1I.push(Iil1I + "=" + illIIl);
    }

    return I1i1I.join(IIl1);
}

async function i1lil() {
    for (var Ill1ii = "", IllII = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Ill1il = 0; Ill1il < 16; Ill1il++) {
        var IIlI = Math.round(Math.random() * (IllII.length - 1));
        Ill1ii += IllII.substring(IIlI, IIlI + 1);
    }

    return uuid = Buffer.from(Ill1ii, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
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

function I1iIl(l1iilI = "xxxxxxxxxxxxxxxxxxxx") {
    return l1iilI.replace(/[xy]/g, function (Ill1iI) {
        var i1Ii1l = Math.random() * 10 | 0,
            IIll = Ill1iI == "x" ? i1Ii1l : i1Ii1l & 3 | 8;
        return jdaid = IIll.toString(), jdaid;
    });
}

function IilII(i1Ii1i) {
    return new Promise(iilliI => {
        const ilI1ii = {
            "url": "" + i1Ii1i,
            "timeout": 10000,
            "headers": {
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
            }
        };
        $.get(ilI1ii, async (iII1I, iilli1, ilI1l1) => {
            try {
                if (iII1I) { } else ilI1l1 ? ilI1l1 = JSON.parse(ilI1l1) : console.log("未获取到数据,请重新运行");
            } catch (i1i1i1) {
                $.logErr(i1i1i1, iilli1);
                ilI1l1 = null;
            } finally {
                iilliI(ilI1l1);
            }
        });
    });
}

function ili1l(IllIl, IllIi) {
    return Math.floor(Math.random() * (IllIi - IllIl)) + IllIl;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
