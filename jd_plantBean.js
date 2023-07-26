/*
种豆得豆 脚本更新地址：jd_plantBean.js
更新时间：2021-08-20
活动入口：京东APP我的-更多工具-种豆得豆
已支持IOS京东多账号,云端多京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
注：会自动关注任务中的店铺跟商品，介意者勿使用。
互助码shareCode请先手动运行脚本查看打印可看到
每个京东账号每天只能帮助3个人。多出的助力码将会助力失败。

=====================================Quantumult X=================================
[task_local]
22 7-21/2 * * * https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, tag=种豆得豆, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdzd.png, enabled=true

=====================================Loon================================
[Script]
cron "22 7-21/2 * * *" script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js,tag=京东种豆得豆

======================================Surge==========================
京东种豆得豆 = type=cron,cronexp="22 7-21/2 * * *",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js

====================================小火箭=============================
京东种豆得豆 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/JDJB/main/jd_plantBean.js, cronexpr="22 7-21/2 * * *", timeout=3600, enable=true

*/
const $ = new Env('种豆得豆');
let IIIllIIi = true,
    l1llIiIl = [],
    iIii1llI = "",
    IllIlIii,
    liIl1Ili,
    i1llIi11,
    iIIiiiI;

const iliI1III = require("crypto-js"),
    iIlIllIi = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
    IlI1lliI = "https://api.m.jd.com/client.action",
    iI1iil1 = require("./function/dylany"),
    Ill1iiIi = {
        "plantBeanIndex": "d246a",
        "receiveNutrients": "b56b8",
        "cultureBean": "6a216",
        "receiveNutrientsTask": "d22ac",
        "plantChannelNutrientsTask": "2424e",
        "shopNutrientsTask": "19c88",
        "productTaskList": "7351b",
        "productNutrientsTask": "a4e2d",
        "receivedBean": "d4a66",
        "collectUserNutr": "14357"
    };

let Ii1li111 = "",
    lIIil1iI = null,
    lIiiiII1 = null,
    I1lIilI = [],
    ilI1i1l1 = "",
    l1lII1il;
$.newShareCode = [];
let iIil11Ii = 0;
!(async () => {
    await Iiiii1II();

    if (!l1llIiIl[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    for (let I1IlIlI1 = 0; I1IlIlI1 < l1llIiIl.length; I1IlIlI1++) {
        if (l1llIiIl[I1IlIlI1]) {
            iIii1llI = l1llIiIl[I1IlIlI1];
            $.UserName = decodeURIComponent(iIii1llI.match(/pt_pin=([^; ]+)(?=;?)/) && iIii1llI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = I1IlIlI1 + 1;
            $.isLogin = true;
            $.nickName = "";
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await IllIlIii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            i1llIi11 = "";
            iIIiiiI = "";
            liIl1Ili = {};
            iIil11Ii++;
            l11lll1i();
            await il1I1li1();
            iIil11Ii == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), iIil11Ii = 0);
        }
    }

    $.isNode() && Ii1li111 && (await IllIlIii.sendNotify("" + $.name, "" + Ii1li111));
})().catch(liI11I1I => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + liI11I1I + "!", "");
}).finally(() => {
    $.done();
});

async function il1I1li1() {
    try {
        console.log("获取任务及基本信息");
        await ll1111l1();

        if ($.plantBeanIndexResult.errorCode === "PB101") {
            console.log("\n活动太火爆了，还是去买买买吧！\n");
            return;
        }

        if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
            for (let I1llill1 = 0; I1llill1 < $.plantBeanIndexResult.data.roundList.length; I1llill1++) {
                if ($.plantBeanIndexResult.data.roundList[I1llill1].roundState === "2") {
                    l1lII1il = I1llill1;
                    break;
                }
            }

            const lIIilIl = $.plantBeanIndexResult.data.jwordShareInfo.shareUrl;
            $.myPlantUuid = IiIIi(lIIilIl, "plantUuid");
            console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.myPlantUuid + "\n");
            I1lIilI = $.plantBeanIndexResult.data.roundList;
            lIIil1iI = I1lIilI[l1lII1il].roundId;
            lIiiiII1 = I1lIilI[l1lII1il - 1].roundId;
            ilI1i1l1 = I1lIilI[l1lII1il - 1].awardState;
            $.taskList = $.plantBeanIndexResult.data.taskList;
            iIIiiiI = "【京东昵称】" + $.plantBeanIndexResult.data.plantUserInfo.plantNickName;
            i1llIi11 += "【上期时间】" + I1lIilI[l1lII1il - 1].dateDesc.replace("上期 ", "") + "\n";
            i1llIi11 += "【上期成长值】" + I1lIilI[l1lII1il - 1].growth + "\n";
            await $.wait(1000);
            await ii1il11();
            await $.wait(2000);
            await lil1ii1l();
            await $.wait(5000);
            await I11liI1i();
            await $.wait(2000);
            await II1iilI();
            await $.wait(1000);
            await Ill1il1l();
            await $.wait(1000);
            await iIil1IIl();
            await $.wait(1000);
            await II11II11();
            await $.wait(1000);
        } else console.log("种豆得豆-初始失败:  " + JSON.stringify($.plantBeanIndexResult));
    } catch (il1i1il1) {
        $.logErr(il1i1il1);
        const lIiii1II = "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n任务执行异常，请检查执行日志 ‼️‼️";
        $.msg($.name, "", "" + lIiii1II);
    }
}

async function Ill1il1l() {
    console.log("【上轮京豆】" + (ilI1i1l1 === "4" ? "采摘中" : ilI1i1l1 === "5" ? "可收获了" : "已领取"));
    if (ilI1i1l1 === "4") i1llIi11 += "【上期状态】" + I1lIilI[l1lII1il - 1].tipBeanEndTitle + "\n"; else {
        if (ilI1i1l1 === "5") {
            await I111iIlI();
            console.log("开始领取京豆");
            $.getReward && $.getReward.code === "0" ? (console.log("京豆领取成功"), i1llIi11 += "【上期兑换京豆】" + $.getReward.data.awardBean + "个\n", $.msg($.name, iIIiiiI, i1llIi11), Ii1li111 += "京东账号" + $.index + " " + $.nickName + "\n" + i1llIi11 + ($.index !== l1llIiIl.length ? "\n\n" : "")) : console.log("$.getReward 异常：" + JSON.stringify($.getReward));
        } else ilI1i1l1 === "6" && (i1llIi11 += "【上期兑换京豆】" + I1lIilI[l1lII1il - 1].awardBeans + "个\n");
    }
    I1lIilI[l1lII1il].dateDesc.indexOf("本期 ") > -1 && (I1lIilI[l1lII1il].dateDesc = I1lIilI[l1lII1il].dateDesc.substr(I1lIilI[l1lII1il].dateDesc.indexOf("本期 ") + 3, I1lIilI[l1lII1il].dateDesc.length));
    i1llIi11 += "【本期时间】" + I1lIilI[l1lII1il].dateDesc + "\n";
    i1llIi11 += "【本期成长值】" + I1lIilI[l1lII1il].growth + "\n";
}

async function II1iilI() {
    await ll1111l1();

    if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
        const l1lIIil = $.plantBeanIndexResult.data.roundList[l1lII1il];

        if (l1lIIil.roundState === "2") {
            if (l1lIIil.bubbleInfos && l1lIIil.bubbleInfos.length) console.log("开始收取营养液");

            for (let iIiI1iIi of l1lIIil.bubbleInfos) {
                console.log("收取-" + iIiI1iIi.name + "-的营养液");
                await Il1iliI1(l1lIIil.roundId, iIiI1iIi.nutrientsType);
                console.log("收取营养液结果:" + JSON.stringify($.cultureBeanRes));
            }
        }
    } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));
}

async function I11liI1i() {
    await l1ilIlIl();

    if ($.stealFriendList && $.stealFriendList.code === "0") {
        if ($.stealFriendList.data && $.stealFriendList.data.tips) {
            console.log("\n\n今日偷取好友营养液已达上限\n\n");
            return;
        }

        if ($.stealFriendList.data && $.stealFriendList.data.friendInfoList && $.stealFriendList.data.friendInfoList.length > 0) {
            let i1IIl1lI = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000);

            for (let I1Ilii of $.stealFriendList.data.friendInfoList) {
                new Date(i1IIl1lI).getHours() === 20 ? I1Ilii.nutrCount >= 2 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(I1Ilii.paradiseUuid)), await II11IlIi(I1Ilii.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功")) : I1Ilii.nutrCount >= 3 && (console.log("可以偷的好友的信息paradiseUuid::" + JSON.stringify(I1Ilii.paradiseUuid)), await II11IlIi(I1Ilii.paradiseUuid), console.log("偷取好友营养液情况:" + JSON.stringify($.stealFriendRes)), $.stealFriendRes && $.stealFriendRes.code === "0" && console.log("偷取好友营养液成功"));
                await $.wait(1000);
            }
        }
    } else console.log("$.stealFriendList 异常： " + JSON.stringify($.stealFriendList));
}

async function I1IIlIil() {
    await i1Iillll();

    if ($.plantEggLotteryRes && $.plantEggLotteryRes.code === "0") {
        if ($.plantEggLotteryRes.data.restLotteryNum > 0) {
            const lilIllIi = new Array($.plantEggLotteryRes.data.restLotteryNum).fill("");
            console.log("目前共有" + lilIllIi.length + "次扭蛋的机会");

            for (let IilIi1i1 = 0; IilIi1i1 < lilIllIi.length; IilIi1i1++) {
                console.log("开始第" + (IilIi1i1 + 1) + "次扭蛋");
                await Il1li11i();
                console.log("天天扭蛋成功：" + JSON.stringify($.plantEggDoLotteryResult));
            }
        } else console.log("暂无扭蛋机会");
    } else console.log("查询天天扭蛋的机会失败" + JSON.stringify($.plantEggLotteryRes));
}

async function lil1ii1l() {
    if ($.taskList && $.taskList.length > 0) for (let i1l1liil of $.taskList) {
        if (i1l1liil.isFinished === 1) {
            console.log(i1l1liil.taskName + " 任务已完成\n");
            continue;
        } else switch (i1l1liil.taskType) {
            case 92:
                await lI1IiIl();
                continue;

            case 57:
                await iil1iIli("https://m.jingxi.com/jxbfd/user/DoubleSignDeal?g_ty=h5&g_tk=&appCode=msd1188198&__t=1657108409440&dwEnv=7&strDeviceId=a3b4e844090b28d5c38e7529af8115172079be4d&strZone=jxbfd&bizCode=jxbfd&source=jxbfd&_cfd_t=1657108409190&_stk=__t%2C_cfd_t%2CbizCode%2CdwEnv%2Csource%2CstrDeviceId%2CstrZone&_ste=1&h5st=20220706195330228%3B1980457211661562%3B10032%3Btk02w78551ad830nuMcGB4Qsv9QxapLP7gZdOCYE5PVV%2Bna%2Bb4KU21drJq64oP82965Vdc1tGqVU%2Flp7ydcZ5XgH0Feh%3B241b6f1d21bf8e41f380a5dd29a7bac2a6f1f65a0c7ef1b1f751eaea4c40dd9c%3B3.0%3B1657108410228&sceneval=2");
                await $.wait(2000);
                await iil1iIli("https://wq.jd.com/jxjdsignin/SignedInfo?channel=jx_zdddsq&_t=1658021925021&h5st=20220717093845024%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3B7eb86560860f8f60ad3b679c34f89aacf891b5a85580efd0a30c355537bfec54%3B3.0%3B1658021925024&_stk=_t%2Cchannel&_=1658021925027&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
                await $.wait(1000);
                await iil1iIli("https://wq.jd.com/jxjdsignin/IssueReward?channel=jx_zdddsq&_t=1658021926276&h5st=20220717093846279%3B5548444396555217%3B0f6ed%3Btk02w9b851b9c18nin7CZjR7vNSlwRexAOGWbYAbl85d9DiQJ1SufW8ZQEQ%2FSygreq626CVRO2gT8DwUUTLBXGyK6wam%3Be2d7b6810b3bd1b9d9692d354ecbb582e69afc64df19bd8d6c14632b1a65660c%3B3.0%3B1658021926279&_stk=_t%2Cchannel&sceneval=2&g_login_type=1&g_ty=ajax&appCode=msc588d6d5");
                await $.wait(1000);
                continue;

            case 96:
                continue;

            case 94:
                continue;

            case 3:
                console.log("开始做 " + i1l1liil.taskName + "任务");
                let IIIl111i = i1l1liil.totalNum - i1l1liil.gainedNum;
                if (IIIl111i === 0) continue;
                await iiI11ill();
                const {
                    data: I1ilI1l1
                } = $.shopTaskListRes;
                let iiiiili = [],
                    I1l111II = [],
                    i11ll1 = [];
                const {
                    goodShopList: IiIIIliI,
                    moreShopList: IlIlil1
                } = I1ilI1l1;
                if (IiIIIliI) for (let Iili1i1i of IiIIIliI) {
                    Iili1i1i.taskState === "2" && iiiiili.push(Iili1i1i);
                }
                if (IlIlil1) for (let lliIiIli of IlIlil1) {
                    lliIiIli.taskState === "2" && I1l111II.push(lliIiIli);
                }
                i11ll1 = iiiiili.concat(I1l111II);

                for (let iIlliIi of i11ll1) {
                    const {
                        shopId: ii1lliii,
                        shopTaskId: lIl1iIIl
                    } = iIlliIi,
                        lll1iIii = {
                            "monitor_refer": "plant_shopNutrientsTask",
                            "shopId": ii1lliii,
                            "shopTaskId": lIl1iIIl
                        },
                        i1ilii1l = await Il1l11Il("shopNutrientsTask", lll1iIii);
                    console.log("shopRes结果:" + JSON.stringify(i1ilii1l));
                    i1ilii1l && i1ilii1l.code === "0" && i1ilii1l.data && i1ilii1l.data.nutrState && i1ilii1l.data.nutrState === "1" && IIIl111i--;

                    if (IIIl111i <= 0) {
                        console.log(i1l1liil.taskName + "任务已做完\n");
                        break;
                    }
                }

                continue;

            case 5:
                console.log("开始做 " + i1l1liil.taskName + "任务");
                let lI1i1l1I = i1l1liil.totalNum - i1l1liil.gainedNum;
                if (lI1i1l1I === 0) continue;
                await lII1III();
                let llii1iIi = [],
                    II11llII = [];
                const {
                    productInfoList: iIl1l1I
                } = $.productTaskList.data;

                for (let IIi1lIll = 0; IIi1lIll < iIl1l1I.length; IIi1lIll++) {
                    for (let i1i11II1 = 0; i1i11II1 < iIl1l1I[IIi1lIll].length; i1i11II1++) {
                        llii1iIi.push(iIl1l1I[IIi1lIll][i1i11II1]);
                    }
                }

                for (let lI1l1lI1 of llii1iIi) {
                    lI1l1lI1.taskState === "2" && II11llII.push(lI1l1lI1);
                }

                for (let lI1111l1 of II11llII) {
                    const {
                        skuId: il11i1lI,
                        productTaskId: I11IIll
                    } = lI1111l1,
                        I1IIIl1 = {
                            "monitor_refer": "plant_productNutrientsTask",
                            "productTaskId": I11IIll,
                            "skuId": il11i1lI
                        },
                        ilil11il = await Il1l11Il("productNutrientsTask", I1IIIl1);
                    ilil11il && ilil11il.code === "0" && ilil11il.data && ilil11il.data.nutrState && ilil11il.data.nutrState === "1" && lI1i1l1I--;

                    if (lI1i1l1I <= 0) {
                        console.log(i1l1liil.taskName + "任务已做完\n");
                        break;
                    }
                }

                continue;

            case 10:
                console.log("开始做 " + i1l1liil.taskName + "任务");
                let lll1IiIi = i1l1liil.totalNum - i1l1liil.gainedNum;
                if (lll1IiIi === 0) continue;
                await lI1IliIl();
                let i1iI1IiI = [],
                    lIiiiI1l = [],
                    I1i1II1 = [];
                const {
                    goodChannelList: Iil1l1il,
                    normalChannelList: l1l11ili
                } = $.plantChannelTaskList.data;

                for (let lIllil1I of Iil1l1il) {
                    lIllil1I.taskState === "2" && i1iI1IiI.push(lIllil1I);
                }

                for (let IIl1iIII of l1l11ili) {
                    IIl1iIII.taskState === "2" && lIiiiI1l.push(IIl1iIII);
                }

                I1i1II1 = i1iI1IiI.concat(lIiiiI1l);

                for (let lIlllIi of I1i1II1) {
                    const {
                        channelId: li1iliil,
                        channelTaskId: Iiill1lI
                    } = lIlllIi,
                        IililIlI = {
                            "channelId": li1iliil,
                            "channelTaskId": Iiill1lI
                        },
                        i1lIl1Ii = await Il1l11Il("plantChannelNutrientsTask", IililIlI);
                    console.log("channelRes结果:" + JSON.stringify(i1lIl1Ii));
                    i1lIl1Ii && i1lIl1Ii.code === "0" && i1lIl1Ii.data && i1lIl1Ii.data.nutrState && i1lIl1Ii.data.nutrState === "1" && lll1IiIi--;

                    if (lll1IiIi <= 0) {
                        console.log(i1l1liil.taskName + "任务已做完\n");
                        break;
                    }
                }

                continue;

            default:
                console.log("\n开始做 " + i1l1liil.taskName + "任务");
                await iI1i1IlI(i1l1liil.taskType);
                console.log("做 " + i1l1liil.taskName + "任务结果:" + JSON.stringify($.receiveNutrientsTaskRes) + "\n");
                continue;
        }
    }
}

function iIil1IIl() {
    return new Promise(async lIi1I1iI => {
        await ll1111l1();

        if ($.plantBeanIndexResult && $.plantBeanIndexResult.code === "0" && $.plantBeanIndexResult.data) {
            $.taskList = $.plantBeanIndexResult.data.taskList;

            if ($.taskList && $.taskList.length > 0) {
                console.log("     任务   进度");

                for (let lllll11i of $.taskList) {
                    console.log("[" + lllll11i.taskName + "]  " + lllll11i.gainedNum + "/" + lllll11i.totalNum + "   " + lllll11i.isFinished);
                }
            }
        } else console.log("plantBeanIndexResult:" + JSON.stringify($.plantBeanIndexResult));

        lIi1I1iI();
    });
}

function i1iiIll1() {
    $.log("\n" + i1llIi11 + "\n");
    IIIllIIi = $.getdata("jdPlantBeanNotify") ? $.getdata("jdPlantBeanNotify") : IIIllIIi;
    (!IIIllIIi || IIIllIIi === "false") && $.msg($.name, iIIiiiI, i1llIi11);
}

async function lI1IiIl() {
    await Ii1iiIIl();
    await $.wait(500);
    await IIllli1l("gotConfigDataForBrand");
    await $.wait(500);
    await IIllli1l("initForFarm");
    await $.wait(500);
    await IIllli1l("taskInitForFarm");
    await $.wait(500);
    await IIllli1l("farmMarkStatus");
    await $.wait(500);
    await IIllli1l("initForFarm");
    await $.wait(500);
}

async function Ii1iiIIl() {
    const i1I1l1il = {
        "monitor_refer": "plant_receiveNutrientsTask",
        "monitor_source": "plant_app_plant_index",
        "awardType": "92",
        "version": "9.2.4.3"
    };
    await l11llllI("receiveNutrientsTask", i1I1l1il);
}

async function IIllli1l(iii11lI1) {
    let lIiIIll = {
        "version": 17,
        "channel": 1,
        "babelChannel": "45"
    };
    return iii11lI1 == "gotConfigDataForBrand" && (lIiIIll.type = "json", lIiIIll.k = "farmShareConfig"), new Promise(async l11lIIIl => {
        const IIli1Iil = {
            "url": IlI1lliI + "?functionId=" + iii11lI1 + "&body=" + encodeURIComponent(JSON.stringify(lIiIIll)) + "&appid=wh5",
            "headers": {
                "Cookie": iIii1llI,
                "Host": "api.m.jd.com",
                "Accept": "*/*",
                "Connection": "keep-alive",
                "User-Agent": $.UA,
                "Accept-Encoding": "gzip, deflate, br",
                "Referer": "https://h5.m.jd.com"
            },
            "timeout": 20000
        };
        $.get(IIli1Iil, (l1Iiiiil, II1ii1II, IliiIi11) => {
            try {
                l1Iiiiil && (console.log("\n API查询请求失败 ‼️‼️"), $.logErr(l1Iiiiil));
            } catch (li1IIliI) {
                $.logErr(li1IIliI, II1ii1II);
            } finally {
                l11lIIIl();
            }
        });
    });
}

function iil1iIli(I1I1Il1i) {
    let lli1illi = {
        "url": I1I1Il1i,
        "headers": {
            "accept": "application/json",
            "referer": "https://st.jingxi.com/",
            "User-Agent": "jdpingou;iPhone;4.13.0;14.4.2;${randomString(40)};network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/${Math.random * 98 + 1};pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
            "Cookie": "cid=4;" + iIii1llI
        }
    };
    return new Promise(async IiII1Ii => {
        $.get(lli1illi, (ilIlliIi, l11IIi1i, I11ll11l) => {
            try {
                if (ilIlliIi) {
                    console.log("" + JSON.stringify(ilIlliIi));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (I11ll11l) { }
                }
            } catch (IIIIi1) {
                $.logErr(IIIIi1, l11IIi1i);
            } finally {
                IiII1Ii(I11ll11l);
            }
        });
        IiII1Ii();
    });
}

function l1l11I1i(ii1lIiIi) {
    let liI1ill1 = {
        "url": ii1lIiIi,
        "headers": {
            "Accept": "application/json",
            "Referer": "https://wqs.jd.com/",
            "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
            "Cookie": iIii1llI
        }
    };
    return new Promise(async i11l1ii => {
        $.get(liI1ill1, (IiiI1ilI, l1Iilill, iIIlllli) => {
            try {
                if (IiiI1ilI) {
                    console.log("" + JSON.stringify(IiiI1ilI));
                    console.log("tjdoublesign 请求失败，请检查网路重试");
                } else {
                    if (iIIlllli) { }
                }
            } catch (l1Il1I1l) {
                $.logErr(l1Il1I1l, l1Iilill);
            } finally {
                i11l1ii(iIIlllli);
            }
        });
    });
}

async function I111iIlI() {
    const iilIlI11 = {
        "roundId": lIiiiII1
    };
    $.getReward = await l11llllI("receivedBean", iilIlI11);
}

async function Il1iliI1(iI1lIiI1, liIli111) {
    let iIIlII1i = {
        "roundId": iI1lIiI1,
        "nutrientsType": liIli111
    };
    $.cultureBeanRes = await l11llllI("cultureBean", iIIlII1i);
}

async function l1ilIlIl() {
    const i11I1Iil = {
        "pageNum": "1"
    };
    $.stealFriendList = await i1lIlli1("plantFriendList", i11I1Iil);
}

async function II11IlIi(l1l1lii) {
    console.log("开始偷好友");
    const IIlil1II = {
        "paradiseUuid": l1l1lii,
        "roundId": lIIil1iI
    };
    $.stealFriendRes = await l11llllI("collectUserNutr", IIlil1II);
}

async function ii1il11() {
    $.receiveNutrientsRes = await l11llllI("receiveNutrients", {
        "roundId": lIIil1iI,
        "monitor_refer": "plant_receiveNutrients"
    });
}

async function Il1li11i() {
    $.plantEggDoLotteryResult = await Il1l11Il("plantEggDoLottery");
}

async function i1Iillll() {
    $.plantEggLotteryRes = await Il1l11Il("plantEggLotteryIndex");
}

async function lII1III() {
    $.productTaskList = await Il1l11Il("productTaskList", {
        "monitor_refer": "plant_productTaskList"
    });
}

async function lI1IliIl() {
    $.plantChannelTaskList = await i1lIlli1("plantChannelTaskList");
}

async function iiI11ill() {
    $.shopTaskListRes = await i1lIlli1("shopTaskList", {
        "monitor_refer": "plant_receiveNutrients"
    });
}

async function iI1i1IlI(iiI1l1Il) {
    const II1I111l = {
        "monitor_refer": "plant_receiveNutrientsTask",
        "awardType": "" + iiI1l1Il
    };
    $.receiveNutrientsTaskRes = await Il1l11Il("receiveNutrientsTask", II1I111l);
}

async function II11II11() {
    $.shareSupportList = await Il1l11Il("plantShareSupportList", {
        "roundId": ""
    });

    if ($.shareSupportList && $.shareSupportList.code === "0") {
        const {
            data: lI1il1Il
        } = $.shareSupportList,
            IIiIi1l1 = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000,
            iI11lili = parseInt((Date.now() + 28800000) / 86400000) * 86400000 - 28800000 + 24 * 60 * 60 * 1000;
        let li1ii = [];
        lI1il1Il.map(lII1liII => {
            IIiIi1l1 <= lII1liII.createTime && lII1liII.createTime < iI11lili && li1ii.push(lII1liII);
        });
        i1llIi11 += "【助力您的好友】共" + li1ii.length + "人";
    } else console.log("异常情况：" + JSON.stringify($.shareSupportList));
}

async function IlIIIll1(l1i1iII) {
    console.log("\n开始助力好友: " + l1i1iII);
    const liIiIii = {
        "plantUuid": l1i1iII,
        "wxHeadImgUrl": "",
        "shareUuid": "",
        "followType": "1"
    };
    $.helpResult = await l11llllI("plantBeanIndex", liIiIii);
    console.log("助力结果的code:" + ($.helpResult && $.helpResult.code));
}

async function ll1111l1() {
    $.plantBeanIndexResult = await l11llllI("plantBeanIndex");
}

function Iiiii1II() {
    return new Promise(i111lIii => {
        IllIlIii = $.isNode() ? require("./sendNotify") : "";
        const l1lIl1Ii = $.isNode() ? require("./jdCookie.js") : "",
            III1l1li = "";

        if ($.isNode()) {
            Object.keys(l1lIl1Ii).forEach(IiI1iI1i => {
                l1lIl1Ii[IiI1iI1i] && l1llIiIl.push(l1lIl1Ii[IiI1iI1i]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else l1llIiIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiII1l11($.getdata("CookiesJD") || "[]").map(Illi1Iii => Illi1Iii.cookie)].filter(i1l1Illl => !!i1l1Illl);

        console.log("共" + l1llIiIl.length + "个京东账号\n");
        $.shareCodesArr = [];
        if ($.isNode()) Object.keys(III1l1li).forEach(lil1Ilii => {
            III1l1li[lil1Ilii] && $.shareCodesArr.push(III1l1li[lil1Ilii]);
        }); else {
            if ($.getdata("jd_plantbean_inviter")) $.shareCodesArr = $.getdata("jd_plantbean_inviter").split("\n").filter(IIIli1I1 => !!IIIli1I1);
        }
        i111lIii();
    });
}

function i1lIlli1(l11i11Il, i11i1i11 = {}) {
    return new Promise(async IlI1iiII => {
        const lIiliiIl = {
            "url": IlI1lliI + "?functionId=" + l11i11Il + "&body=" + encodeURIComponent(JSON.stringify(i11i1i11)) + "&appid=signed_wh5&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2",
            "headers": {
                "Accept": "*/*",
                "Origin": "https://h5.m.jd.com",
                "Accept-Encoding": "gzip,deflate,br",
                "User-Agent": $.UA,
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Referer": "https://h5.m.jd.com",
                "x-requested-with": "com.jingdong.app.mall",
                "Cookie": iIii1llI
            },
            "timeout": 10000
        };
        $.get(lIiliiIl, (IlI1Ii1I, IIiiiilI, lI1II1II) => {
            try {
                IlI1Ii1I ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), $.logErr(IlI1Ii1I)) : lI1II1II = JSON.parse(lI1II1II);
            } catch (i11I11ll) {
                $.logErr(i11I11ll, IIiiiilI);
            } finally {
                IlI1iiII(lI1II1II);
            }
        });
    });
}

function Il1l11Il(i111i1il, l1lil1il = {}) {
    return new Promise(async li1lIiii => {
        let iill1ll = "";
        if (!Ill1iiIi[i111i1il]) iill1ll = IlI1lliI + "?functionId=" + i111i1il + "&body=" + encodeURIComponent(JSON.stringify(l1lil1il)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2"; else {
            !l1lil1il.version && (l1lil1il.version = "9.2.4.3");
            l1lil1il.monitor_source = "plant_app_plant_index";
            Ill1iiIi[i111i1il] == "shopNutrientsTask" && (headers.referer = "https://plantearth.m.jd.com/", headers["x-requested-with"] = "https://plantearth.m.jd.com/");
            await $.wait(2000);
            let Ii1ll1i1 = {
                "appId": Ill1iiIi[i111i1il],
                "fn": i111i1il,
                "body": l1lil1il,
                "apid": "signed_wh5",
                "ver": $.UA.split(";")[2],
                "cl": "android",
                "user": $.UserName,
                "ua": $.UA
            },
                l11i1II = await iI1iil1.getbody(Ii1ll1i1);
            iill1ll = IlI1lliI + "?" + l11i1II;
        }
        const l1llI111 = {
            "url": iill1ll,
            "headers": {
                "Accept": "*/*",
                "Accept-Encoding": "gzip,deflate,br",
                "User-Agent": $.UA,
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
                "Cookie": iIii1llI
            },
            "timeout": 20000
        };
        $.get(l1llI111, (II1Iii1I, Iil1ii11, lIilIIl1) => {
            try {
                II1Iii1I ? (console.log("\n种豆得豆: API查询请求失败 ‼️‼️"), console.log(II1Iii1I), $.logErr(II1Iii1I)) : lIilIIl1 = JSON.parse(lIilIIl1);
            } catch (I1ll1III) {
                $.logErr(I1ll1III, Iil1ii11);
            } finally {
                li1lIiii(lIilIIl1);
            }
        });
    });
}

function i1IIil() {
    return new Promise(async IilIII11 => {
        const Il1iiIll = {
            "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": iIii1llI,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
            },
            "timeout": 20000
        };
        $.post(Il1iiIll, (lllil1ll, IIi1i1lI, iIiIilII) => {
            try {
                if (lllil1ll) {
                    console.log("" + JSON.stringify(lllil1ll));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    if (iIiIilII) {
                        iIiIilII = JSON.parse(iIiIilII);

                        if (iIiIilII.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }

                        iIiIilII.retcode === 0 ? $.nickName = iIiIilII.base && iIiIilII.base.nickname || $.UserName : $.nickName = $.UserName;
                    } else console.log("京东服务器返回空数据");
                }
            } catch (ii1IiIi) {
                $.logErr(ii1IiIi, IIi1i1lI);
            } finally {
                IilIII11();
            }
        });
    });
}

function l11llllI(i1iIl11I, Ill1Ii1 = {}) {
    return new Promise(async lll11I1l => {
        let iIilIlli = "";
        if (!Ill1iiIi[i1iIl11I]) iIilIlli = IlI1lliI + "?functionId=" + i1iIl11I + "&body=" + encodeURIComponent(JSON.stringify(Ill1Ii1)) + "&appid=ld&client=apple&area=19_1601_50258_51885&build=167490&clientVersion=9.3.2"; else {
            Ill1Ii1.version = "9.2.4.3";
            Ill1Ii1.monitor_source = "plant_app_plant_index";
            !Ill1Ii1.monitor_refer && (Ill1Ii1.monitor_refer = "");
            let iilIIiiI = {
                "appId": Ill1iiIi[i1iIl11I],
                "fn": i1iIl11I,
                "body": Ill1Ii1,
                "apid": "signed_wh5",
                "ver": $.UA.split(";")[2],
                "cl": "android",
                "user": $.UserName,
                "ua": $.UA
            },
                l11ii11I = await iI1iil1.getbody(iilIIiiI);
            iIilIlli = IlI1lliI + "?" + l11ii11I;
        }
        await $.wait(2000);
        let lIili1I1 = {
            "url": iIilIlli,
            "headers": {
                "Accept": "*/*",
                "Accept-Encoding": "gzip,deflate,br",
                "User-Agent": $.UA,
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Referer": "https://plantearth.m.jd.com/plantBean/index?source=lingjingdouqiandaorili&sid=4638f2f389065566747fbdb06702d79w&un_area=4_133_58530_0",
                "Cookie": iIii1llI
            },
            "timeout": 10000
        };
        $.get(lIili1I1, async (l1ill11l, Ilil11i, iIlIilll) => {
            try {
                if (l1ill11l) {
                    console.log("\n种豆得豆: API查询请求失败 ‼️‼️");
                    console.log("function_id:" + i1iIl11I);
                    $.logErr(l1ill11l);
                } else iIlIilll.indexOf("data") > -1 ? iIlIilll = JSON.parse(iIlIilll) : (iIlIilll = JSON.parse(iIlIilll), console.log(iIlIilll.errorMessage));
            } catch (IliIIlIi) {
                $.logErr(IliIIlIi, Ilil11i);
            } finally {
                lll11I1l(iIlIilll);
            }
        });
    });
}

function iIliIl1I(iiilI1l, i1lll11l = "qwertyuiopasdfghjklzxcvbnm") {
    let ilIiIll = "";

    for (let IIl1l1i = 0; IIl1l1i < iiilI1l; IIl1l1i++) {
        ilIiIll += i1lll11l[Math.floor(Math.random() * i1lll11l.length)];
    }

    return ilIiIll;
}

function ii1ll1i(lIIlIill, ilIIIill = {}) {
    let liiii1i1 = [],
        lill1lI = ilIIIill.connector || "&",
        i1lllII1 = Object.keys(lIIlIill);
    if (ilIIIill.sort) i1lllII1 = i1lllII1.sort();

    for (let i1Ii1l1i of i1lllII1) {
        let I1Iii1Il = lIIlIill[i1Ii1l1i];
        if (I1Iii1Il && typeof I1Iii1Il === "object") I1Iii1Il = JSON.stringify(I1Iii1Il);
        if (I1Iii1Il && ilIIIill.encode) I1Iii1Il = encodeURIComponent(I1Iii1Il);
        liiii1i1.push(i1Ii1l1i + "=" + I1Iii1Il);
    }

    return liiii1i1.join(lill1lI);
}

function lii1lili(ll1Iii11) {
    return ll1Iii11[Math.floor(Math.random() * ll1Iii11.length)];
}

function li11lii(III11li = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", liiI11 = "0123456789abcdef") {
    let llii1ill = "";

    for (let l1iiiiiI of III11li) {
        if (l1iiiiiI == "x") llii1ill += liiI11.charAt(Math.floor(Math.random() * liiI11.length)); else l1iiiiiI == "X" ? llii1ill += liiI11.charAt(Math.floor(Math.random() * liiI11.length)).toUpperCase() : llii1ill += l1iiiiiI;
    }

    return llii1ill;
}

function l1IiilI1(II1IIiII) {
    II1IIiII = II1IIiII.replace(/rn/g, "n");
    var IlIIi = "";

    for (var I1i1iIlI = 0; I1i1iIlI < II1IIiII.length; I1i1iIlI++) {
        var i1IIlll1 = II1IIiII.charCodeAt(I1i1iIlI);
        if (i1IIlll1 < 128) IlIIi += String.fromCharCode(i1IIlll1); else i1IIlll1 > 127 && i1IIlll1 < 2048 ? (IlIIi += String.fromCharCode(i1IIlll1 >> 6 | 192), IlIIi += String.fromCharCode(i1IIlll1 & 63 | 128)) : (IlIIi += String.fromCharCode(i1IIlll1 >> 12 | 224), IlIIi += String.fromCharCode(i1IIlll1 >> 6 & 63 | 128), IlIIi += String.fromCharCode(i1IIlll1 & 63 | 128));
    }

    return IlIIi;
}

function Il1IiIlI(iIl1iIII, IIil1iIl) {
    IIil1iIl = IIil1iIl || iIlIllIi;
    var l1lI11ll = "",
        i1ilIIII,
        IlIi1Iii,
        iIiillli,
        i1l1Ii11,
        iilIlIil,
        ll111I1,
        iIIl11i1,
        Il1i1ll1 = 0;
    iIl1iIII = l1IiilI1(iIl1iIII);

    while (Il1i1ll1 < iIl1iIII.length) {
        i1ilIIII = iIl1iIII.charCodeAt(Il1i1ll1++);
        IlIi1Iii = iIl1iIII.charCodeAt(Il1i1ll1++);
        iIiillli = iIl1iIII.charCodeAt(Il1i1ll1++);
        i1l1Ii11 = i1ilIIII >> 2;
        iilIlIil = (i1ilIIII & 3) << 4 | IlIi1Iii >> 4;
        ll111I1 = (IlIi1Iii & 15) << 2 | iIiillli >> 6;
        iIIl11i1 = iIiillli & 63;
        if (isNaN(IlIi1Iii)) ll111I1 = iIIl11i1 = 64; else isNaN(iIiillli) && (iIIl11i1 = 64);
        l1lI11ll = l1lI11ll + IIil1iIl.charAt(i1l1Ii11) + IIil1iIl.charAt(iilIlIil) + IIil1iIl.charAt(ll111I1) + IIil1iIl.charAt(iIIl11i1);
    }

    while (l1lI11ll.length % 4 > 1) l1lI11ll += "=";

    return l1lI11ll;
}

function liI11il1(Iii11l1 = {}) {
    let liIiIi1l = {
        "ciphertype": 5,
        "cipher": {
            "ud": Il1IiIlI(iliI1III.SHA1($.UserName).toString()),
            "sv": Il1IiIlI($.os_ver),
            "iad": ""
        },
        "ts": Date.now(),
        "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
        "version": "1.0.3",
        "appname": "com.360buy.jdmobile",
        "ridx": -1
    };
    $.ep = JSON.stringify(liIiIi1l);
}

function l11lll1i(ii1IIIiI, IilIlll1 = {}) {
    const Il1l1lI = {
        "jd": {
            "app": "jdapp",
            "appBuild": "168392",
            "client": "android",
            "clientVersion": "10.1.0"
        },
        "lite": {
            "app": "jdltapp",
            "appBuild": "1247",
            "client": "ios",
            "clientVersion": "6.0.0"
        }
    },
        Il1l11lI = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
    $.os_ver = lii1lili(Il1l11lI);
    let IIlll1i1 = ii1IIIiI || "jd",
        IiIIll = IilIlll1?.["ep"] ? IilIlll1?.["ep"] : true;

    if (!Il1l1lI[IIlll1i1]) {
        console.log("获取[" + IIlll1i1 + "]UA失败");
        return;
    }

    $.client = IilIlll1?.["client"] ? IilIlll1?.["client"] : Il1l1lI[IIlll1i1].client;
    $.clientVersion = IilIlll1?.["clientVersion"] ? IilIlll1?.["clientVersion"] : Il1l1lI[IIlll1i1].clientVersion;
    $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
    let ll11lllI = "android";
    $.client == "apple" && (ll11lllI = "iPhone");
    liI11il1();
    let IilllllI = [Il1l1lI[IIlll1i1].app, ll11lllI, $.clientVersion, "", "rn/" + li11lii(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + Il1l1lI[IIlll1i1].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", IiIIll ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
    $.UA = IilllllI.join(";");
}

function IiIIi(ililIi11, I1llIlli) {
    const lII1llii = new RegExp("(^|&)" + I1llIlli + "=([^&]*)(&|$)", "i"),
        ll11II1i = ililIi11.match(lII1llii);
    if (ll11II1i != null) return unescape(ll11II1i[2]);
    return null;
}

function iiII1l11(i1II1Ill) {
    if (typeof i1II1Ill == "string") try {
        return JSON.parse(i1II1Ill);
    } catch (lIil1iiI) {
        return console.log(lIil1iiI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
