/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力  已屏蔽
export HELP_JOYPARK=""

地址：https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#京东极简版-汪汪乐园助力
1 1 1 1 * jd_jj_wwly_help.js, tag=京东极简版-汪汪乐园助力, enabled=true

*/
const $ = new Env('京东极简版-汪汪乐园助力');
const Iliii = $.isNode() ? require("./jdCookie.js") : "",
    illlii = $.isNode() ? require("./sendNotify") : "",
    l1i1i = require("./function/krgetua");

let I1iI1i = [],
    l1i1l = "";

if ($.isNode()) {
    Object.keys(Iliii).forEach(l11iI1 => {
        I1iI1i.push(Iliii[l11iI1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else I1iI1i = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1i11i($.getdata("CookiesJD") || "[]").map(IliiI => IliiI.cookie)].filter(lI111i => !!lI111i);

$.invitePinTaskList = [];
$.invitePin = [""];
let illlil = Date.now();
message = "";
!(async () => {
    if (!I1iI1i[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let iiI1iI = 0; iiI1iI < I1iI1i.length; iiI1iI++) {
        l1i1l = I1iI1i[iiI1iI];

        if (l1i1l) {
            $.UserName = decodeURIComponent(l1i1l.match(/pt_pin=([^; ]+)(?=;?)/) && l1i1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = iiI1iI + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            UA = await l1i1i($.UserName);
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await illlii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            // if ($.isNode()) {
            //     if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") { 

            //     } else {
            //         $.kgw_invitePin = [""][Math.floor(Math.random() * 11)];
            //         await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            //         let Illll1 = await l1ilI1("", 2, $.kgw_invitePin);
            //         await $.wait(parseInt(Math.random() * 2000 + 3000, 10));

            //         if (Illll1.data && Illll1.data.helpState && Illll1.data.helpState === 1) { } else {
            //             if (Illll1.data && Illll1.data.helpState && Illll1.data.helpState === 3) { } else {
            //                 if (Illll1.data && Illll1.data.helpState && Illll1.data.helpState === 2) $.openIndex++; else { }
            //             }
            //         }
            //     }
            // }

            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            await l1ilI1();
            await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
            if ($.joyBaseInfo && $.joyBaseInfo.invitePin) $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin), $.invitePinTaskList.push($.joyBaseInfo.invitePin); else {
                $.log($.name + " - " + $.UserName + "  助力码: null");
                $.invitePinTaskList.push("");
                $.isLogin = false;
                $.log("服务端异常，尝试手动进入活动，入口：京东极简版-汪汪乐园");
                continue;
            }
            await I1lIIl();
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

            for (const lI1iil of $.taskList) {
                lI1iil.taskType === "SIGN" && ($.log("" + lI1iil.taskTitle), await l1l1Il(lI1iil.id, lI1iil.taskType, undefined), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.log(lI1iil.taskTitle + " 领取奖励"), await IIIIlI(lI1iil.id, lI1iil.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                if (lI1iil.taskType === "BROWSE_PRODUCT" || lI1iil.taskType === "BROWSE_CHANNEL" && lI1iil.taskLimitTimes !== 1) {
                    let iIiiiI = await l1l1Ii(lI1iil.id, lI1iil.taskType);
                    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                    let ilI11i = 0;

                    if (iIiiiI.length === 0) {
                        let li1I = await IIIIlI(lI1iil.id, lI1iil.taskType);
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        !li1I.success && ($.log(lI1iil.taskTitle + "|" + lI1iil.taskShowTitle + " 领取完成!"), iIiiiI = await l1l1Ii(lI1iil.id, lI1iil.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
                    }

                    while (lI1iil.taskLimitTimes - lI1iil.taskDoTimes >= 0) {
                        if (iIiiiI.length === 0) {
                            $.log(lI1iil.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(lI1iil.taskTitle + " " + lI1iil.taskDoTimes + "/" + lI1iil.taskLimitTimes);
                        let ll1liI = await l1l1Il(lI1iil.id, lI1iil.taskType, iIiiiI[ilI11i].itemId, "activities_platform");
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        ll1liI.code === 2005 || ll1liI.code === 0 ? $.log(lI1iil.taskTitle + "|" + lI1iil.taskShowTitle + " 任务完成！") : $.log("任务失败！");
                        ilI11i++;
                        lI1iil.taskDoTimes++;

                        if (!iIiiiI[ilI11i]) {
                            break;
                        }
                    }

                    for (let iIIlll = 0; iIIlll < lI1iil.taskLimitTimes; iIIlll++) {
                        let iiI1il = await IIIIlI(lI1iil.id, lI1iil.taskType);
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

                        if (!iiI1il.success) {
                            $.log(lI1iil.taskTitle + "|" + lI1iil.taskShowTitle + " 领取完成!");
                            break;
                        }
                    }
                } else {
                    if (lI1iil.taskType === "SHARE_INVITE") {
                        $.yq_taskid = lI1iil.id;

                        for (let iiI1ii = 0; iiI1ii < 5; iiI1ii++) {
                            let lilii1 = await IIIIlI($.yq_taskid, "SHARE_INVITE");
                            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            if (!lilii1.success) break;
                            $.log("领取助力奖励成功！");
                        }
                    }
                }

                lI1iil.taskType === "BROWSE_CHANNEL" && lI1iil.taskLimitTimes === 1 && ($.log(lI1iil.taskTitle + "|" + lI1iil.taskShowTitle), await lil1I(lI1iil.id, lI1iil.taskType, lI1iil.taskSourceUrl), $.log(lI1iil.taskTitle + "|" + lI1iil.taskShowTitle + " 领取奖励"), await IIIIlI(lI1iil.id, lI1iil.taskType));
            }
        }
    }

    $.log("\n======汪汪乐园开始内部互助======\n");

    for (let ll1lil = 0; ll1lil < I1iI1i.length; ll1lil++) {
        l1i1l = I1iI1i[ll1lil];

        if (l1i1l) {
            $.UserName = decodeURIComponent(l1i1l.match(/pt_pin=([^; ]+)(?=;?)/) && l1i1l.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = ll1lil + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await illlii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];

            for (const I1Illi of $.newinvitePinTaskList) {
                $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + I1Illi);
                await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
                let IIlilI = await l1ilI1($.yq_taskid, 1, I1Illi);
                await $.wait(parseInt(Math.random() * 2000 + 3000, 10));

                if (IIlilI.success) {
                    if (IIlilI.data.helpState === 1) $.log("助力成功！"); else {
                        if (IIlilI.data.helpState === 0) $.log("自己不能助力自己！"); else {
                            if (IIlilI.data.helpState === 2) $.log("助力过了！"); else {
                                if (IIlilI.data.helpState === 3) {
                                    $.log("没有助力次数了！");
                                    break;
                                } else {
                                    if (IIlilI.data.helpState === 4) {
                                        $.log("这个B助力满了！");
                                    }
                                }
                            }
                        }
                    }
                } else {
                    $.log("数据异常 助力失败！\n\n");
                    break;
                }
            }
        }
    }
})().catch(iiI1l1 => $.logErr(iiI1l1)).finally(() => $.done());

function I1lIIl() {
    return new Promise(iliiI1 => {
        $.post(l1i11l("body={\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=activities_platform", "apTaskList"), async (ilIIii, l1111, lIl1l1) => {
            $.log("=== 任务列表 start ===");

            try {
                if (ilIIii) console.log("" + JSON.stringify(ilIIii)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    lIl1l1 = JSON.parse(lIl1l1);
                    $.taskList = lIl1l1.data;

                    for (const ilIIil of $.taskList) {
                        $.log(ilIIil.taskTitle + " " + ilIIil.taskDoTimes + "/" + ilIIil.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (iliiII) {
                $.logErr(iliiII, l1111);
            } finally {
                iliiI1(lIl1l1);
            }
        });
    });
}

async function l1ilI1(i1111I = "", IliIl1 = "", lIl1lI = "") {
    const lIiliI = {
        "functionId": "joyBaseInfo",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": illlil,
        "appid": "activities_platform",
        "body": "{\"taskId\":\"" + i1111I + "\",\"inviteType\":\"" + IliIl1 + "\",\"inviterPin\":\"" + lIl1lI + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        iIiill = await lllII("4abce", lIiliI);
    return new Promise(lI1ill => {
        $.post(liiil1(iIiill), async (lI1ili, Il1II, i1lll) => {
            try {
                lI1ili ? (console.log("" + JSON.stringify(lI1ili)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (i1lll = JSON.parse(i1lll), $.joyBaseInfo = i1lll.data);
            } catch (I1iill) {
                $.logErr(I1iill, Il1II);
            } finally {
                lI1ill(i1lll);
            }
        });
    });
}

async function l1l1Il(lIilii, lIilil, lIl1ll = "", Ii111 = "activities_platform") {
    const ilIIi1 = {
        "functionId": "apDoTask",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": illlil,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + lIilil + "\",\"taskId\":" + lIilii + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"taskInsert\":true,\"itemId\":\"" + lIl1ll + "\"}"
    },
        l111i = await lllII("4abce", ilIIi1);
    return new Promise(l111l => {
        $.post(liiil1(l111i), async (iIiili, lilill, IilI1) => {
            try {
                iIiili ? (console.log("" + JSON.stringify(iIiili)), console.log($.name + " API请求失败，请检查网路重试")) : IilI1 = JSON.parse(IilI1);
            } catch (liI1II) {
                $.logErr(liI1II, lilill);
            } finally {
                l111l(IilI1);
            }
        });
    });
}

async function lil1I(i1Iii1, l1liii, I1Ili1, l1liil = "activities_platform") {
    const lilI1I = {
        "functionId": "apDoTask",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": illlil,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + l1liii + "\",\"taskId\":" + i1Iii1 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"itemId\":\"" + I1Ili1 + "\"}"
    },
        lI1I1l = await lllII("4abce", lilI1I);
    return new Promise(Ii11i => {
        $.post(liiil1(lI1I1l), async (i1llI, iIIli1, Ii1l1i) => {
            try {
                i1llI ? (console.log("" + JSON.stringify(i1llI)), console.log($.name + " API请求失败，请检查网路重试")) : Ii1l1i = JSON.parse(Ii1l1i);
            } catch (Ii1l1l) {
                $.logErr(Ii1l1l, iIIli1);
            } finally {
                Ii11i(Ii1l1i);
            }
        });
    });
}

async function l1l1Ii(l1lIi, l1lili) {
    const lI1I11 = {
        "functionId": "apTaskDetail",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": illlil,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + l1lili + "\",\"taskId\":" + l1lIi + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        IilIl = await lllII("4abce", lI1I11);
    return new Promise(I1iII => {
        $.post(liiil1(IilIl), async (Ili1Ii, Ii1l1I, iilII1) => {
            try {
                Ili1Ii ? (console.log("" + JSON.stringify(Ili1Ii)), console.log($.name + " API请求失败，请检查网路重试")) : (iilII1 = JSON.parse(iilII1), !iilII1.success ? $.taskDetailList = [] : $.taskDetailList = iilII1?.["data"]?.["taskItemList"]);
            } catch (iiiI11) {
                $.logErr(iiiI11, Ii1l1I);
            } finally {
                !iilII1.success ? I1iII([]) : I1iII(iilII1.data.taskItemList);
            }
        });
    });
}

async function IIIIlI(liI1Ii, l1lil1) {
    const I1iIl = {
        "functionId": "apTaskDrawAward",
        "clientVersion": "10.1.0",
        "client": "ios",
        "t": illlil,
        "appid": "activities_platform",
        "body": "{\"taskType\":\"" + l1lil1 + "\",\"taskId\":" + liI1Ii + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}"
    },
        IilII = await lllII("55276", I1iIl);
    return new Promise(Ili1II => {
        $.post(liiil1(IilII), async (ilI111, I1IllI, IIlI11) => {
            try {
                ilI111 ? (console.log("" + JSON.stringify(ilI111)), console.log($.name + " API请求失败，请检查网路重试")) : (IIlI11 = JSON.parse(IIlI11), $.log("领取奖励"));
            } catch (iIIll1) {
                $.logErr(iIIll1, I1IllI);
            } finally {
                Ili1II(IIlI11);
            }
        });
    });
}

function l1i11l(ilI11I, ili1I) {
    return {
        "url": "https://api.m.jd.com/client.action" + (ili1I ? "?functionId=" + ili1I : ""),
        "body": ilI11I,
        "headers": {
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": l1i1l
        }
    };
}

function liiil1(i1Iili) {
    return {
        "url": "https://api.m.jd.com/?" + i1Iili,
        "headers": {
            "User-Agent": UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/?activityId=jBNXcoiASxGof0f2RFI2Sw&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
            "Cookie": l1i1l
        }
    };
}

async function lllII(l1IiI, l1lill) {
    let iIIllI = {
        "appId": l1IiI,
        ...l1lill,
        "ua": UA,
        "pin": $.UserName
    },
        I1Ill1 = {
            "url": "http://kr.kingran.cf/h5st",
            "body": JSON.stringify(iIIllI),
            "headers": {
                "Content-Type": "application/json"
            },
            "timeout": 30000
        };
    return new Promise(async I1Ilii => {
        $.post(I1Ill1, (iIIlil, IiIiI1, iIIlii) => {
            let llIII1 = "";

            try {
                if (iIIlil) console.log("" + JSON.stringify(iIIlil)), console.log($.name + " geth5st API请求失败，请检查网路重试"); else {
                    iIIlii = JSON.parse(iIIlii);

                    if (typeof iIIlii === "object" && iIIlii && iIIlii.body) {
                        if (iIIlii.body) llIII1 = iIIlii.body || "";
                    } else iIIlii.code == 400 ? console.log("\n" + iIIlii.msg) : console.log("\n可能连接不上接口，请检查网络");
                }
            } catch (III1) {
                $.logErr(III1, IiIiI1);
            } finally {
                I1Ilii(llIII1);
            }
        });
    });
}

function l11iII(l1iiIi) {
    l1iiIi = l1iiIi || 32;
    let I1lI1i = "abcdef0123456789",
        illili = I1lI1i.length,
        iiiII1 = "";

    for (i = 0; i < l1iiIi; i++) iiiII1 += I1lI1i.charAt(Math.floor(Math.random() * illili));

    return iiiII1;
}

function l1i11i(IIIliI) {
    if (typeof IIIliI == "string") try {
        return JSON.parse(IIIliI);
    } catch (l1IIil) {
        return console.log(l1IIil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
