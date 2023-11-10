/*
更新时间：2023-9-8
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd免费水果
15 3,13,18 * * * jd_fruit.js, tag=东东农场, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true

变量：
export NO_WATER='true' 完全不浇水，浇水任务不做了
export FRUIT_PIN='pin1&pin2' 不浇水的pin，多个&分隔，使用pin控制就不要使用NO_WATER
export DO_TEN_WATER_AGAIN='true' 攒水滴只交10次水，默认不攒水滴
export FRUIT_FAST_CARD='true' 使用快速浇水卡，水多可开启
epxort FRUIT_DELAY='1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）
*/
const $ = new Env('东东农场-任务');
const retainWater = 100;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水

let _0xb745f9 = [],
    _0x3f2ff7 = "",
    _0x1ac4cf,
    _0x11ab2e,
    _0x517495 = "",
    _0x95de59 = "",
    _0x2dcdac = "",
    _0x145492 = {},
    _0x4cb13b = false,
    _0x12b426;

const _0x4a12a4 = "https://api.m.jd.com/client.action",
    _0x2050fb = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    _0x29dfd4 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 2000,
    _0x2ec2b4 = process.env.FRUIT_PIN ? decodeURIComponent(process.env.FRUIT_PIN) : "",
    _0x243823 = require("./USER_AGENTS"),
    _0x3050d3 = require("fs"),
    _0x40df58 = require("./function/dylany");

if (process.env.DY_PROXY) {
    const _0x359266 = require("./function/proxy.js");

    $.get = _0x359266.intoRequest($.get.bind($));
    $.post = _0x359266.intoRequest($.post.bind($));
}

let _0x238448 = [];
$.reqnum = 1;
const _0x4ab30d = {
    totalWaterTaskForFarm: "102f5",
    gotThreeMealForFarm: "57b30",
    browseAdTaskForFarm: "53f09",
    clockInFollowForFarm: "4a0b4",
    waterFriendForFarm: "673a0",
    awardFirstFriendForFarm: "9b655",
    limitWaterInitForFarm: "6bdc2",
    ddnc_surpriseModal: "e81c1",
    friendInitForFarm: "a5a9c",
    waterGoodForFarm: "0c010",
    firstWaterTaskForFarm: "0cf1e",
    waterFriendGotAwardForFarm: "d08ff",
    ddnc_getTreasureBoxAward: "67dfc",
    orderTaskGotWaterForFarm: "eed5c",
    clockInForFarm: "32b94",
    awardInviteFriendForFarm: "2b5ca",
    awardCallOrInviteFriendForFarm: "b0b03",
    getFullCollectionReward: "5c767",
    getOrderPayLotteryWater: "ef089",
    receiveStageEnergy: "15507",
    exchangeGood: "52963",
    initForFarm: "8a2af",
    userMyCardForFarm: "86ba5",
    getCallUserCardForFarm: "2ca57",
    deleteFriendForFarm: "eaf91",
    gotLowFreqWaterForFarm: "8172b",
    choiceGoodsForFarm: "5f4ca",
    gotCouponForFarm: "b1515",
    gotStageAwardForFarm: "81591",
    followVenderForBrand: "71547",
    clockInInitForFarm: "08dc3",
    guideTaskAward: "59bc4",
    farmAssistInit: "92354",
    myCardInfoForFarm: "157b6",
    gotPopFirstPurchaseTaskForFarm: "d432f",
    gotWaterGoalTaskForFarm: "c901b",
    gotNewUserTaskForFarm: "de8f8"
};
!(async () => {
    await _0x2ad48b();

    if (!_0xb745f9[0]) {
        const _0x32480d = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x32480d);
        return;
    }

    $.log("\n当前版本：2023/11/04 fix保留100水滴");
    $.log("TG反馈：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量：");
    $.log("export DY_PROXY='api_url' 可使用代理api");
    $.log("export NO_WATER='true' 完全不浇水，浇水任务不做了");
    $.log("export FRUIT_PIN='pin1&pin2' 不浇水的pin，多个&分隔，使用pin控制就不要使用NO_WATER");
    $.log("export DO_TEN_WATER_AGAIN='true' 攒水滴只交10次水，默认不攒水滴");
    $.log("epxort FRUIT_DELAY='1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）\n\n");
    process.env.NO_WATER == "true" ? (_0x517495 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && (_0x517495 = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));

    for (let _0x360124 = 0; _0x360124 < _0xb745f9.length; _0x360124++) {
        if (_0xb745f9[_0x360124]) {
            _0x3f2ff7 = _0xb745f9[_0x360124];
            $.UserName = decodeURIComponent(_0x3f2ff7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3f2ff7.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x360124 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            _0x12b426 = 0;
            await _0x22620a();
            console.log("------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

            if (!$.isLogin) {
                const _0x4ac573 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x4ac573);
                $.isNode() && (await _0x1ac4cf.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x95de59 = "";
            _0x2dcdac = "";
            _0x145492 = {};
            $.UA = _0x243823.UARAM ? _0x243823.UARAM() : _0x243823.USER_AGENT;
            await _0x51213b();
            await $.wait(2000);
        }
    }

    _0x3050d3.writeFile("./fruit_helpcode", JSON.stringify(_0x238448), _0x4e717c => {
        _0x4e717c && console.log(_0x4e717c);
    });

    $.isNode() && _0x517495 && $.ctrTemp && (await _0x1ac4cf.sendNotify("" + $.name, "" + _0x517495));
})().catch(_0x56486d => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x56486d + "!", "");
}).finally(() => {
    $.done();
});

async function _0x51213b() {
    _0x2dcdac = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x3867a3();
        await $.wait(500);
        await _0x409240();

        let _0x1543c5 = $.farmInfo.farmUserPro || $.farmInfoI.farmUserPro;

        if (_0x1543c5) {
            _0x95de59 = "【水果名称】" + $.farmInfo.farmUserPro.name + "\n";
            console.log("\n【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.farmUserPro.shareCode);
            console.log("\n【已成功兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次");
            _0x95de59 += "【已兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n";

            _0x238448.push($.farmInfo.farmUserPro.shareCode);

            if ($.farmInfo.farmUserPro.treeState === 2 || $.farmInfo.farmUserPro.treeState === 3) {
                _0x145492["open-url"] = _0x2050fb;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x145492);
                $.isNode() && (await _0x1ac4cf.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看"));
            } else {
                if ($.farmInfo.farmUserPro.treeState === 1) {
                    console.log("\n" + $.farmInfo.farmUserPro.name + "种植中...");
                } else {
                    if ($.farmInfo.farmUserPro.treeState === 0) {
                        _0x145492["open-url"] = _0x2050fb;
                        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", _0x145492);

                        if ($.isNode()) {
                            await _0x1ac4cf.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果");
                        }

                        return;
                    }
                }
            }

            $.farmInfo.farmUserPro.newOldState == "0" && (await _0x395e5d(), $.newtaskinfo.addEnergy && console.log("\n获得" + $.newtaskinfo.addEnergy + "g💧"));
            $.farmInfoI.lowFreqSendWater && (await _0x39dbf7(), $.newtaskinfo.addWater && console.log("\n获得" + $.newtaskinfo.addWater + "g💧"));
            await _0x50b845();
            await _0x1a6940();
            process.env.NO_WATER == "true" || _0x2ec2b4.includes($.UserName) ? $.log("\n已设置完全不浇水\n") : (await _0x363413(), process.env.DO_TEN_WATER_AGAIN != "true" ? ($.log("执行继续浇水..."), await _0x121661()) : $.log("不执行再次浇水，攒水滴!"));
            await _0x4111b0();
            await _0x3c388f();
            await _0x68f83b();
            await _0x3ee63a();
            await $.wait(3000);
            await _0x101779();
        } else {
            JSON.stringify($.farmInfoI).includes("winTexts") ? (console.log("初始化农场数据异常, 请确认此账号是否开通农场\n"), _0x95de59 = "【数据异常】请确认此账号是否开通农场\n\n") : (console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfoI) + "\n"), _0x95de59 = "【数据异常】请手动登录app查看此账号农场是否正常\n\n");
        }
    } catch (_0x29dbe4) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
        $.logErr(_0x29dbe4);
    }

    await _0x2a6814();
}

async function _0x50b845() {
    await _0xfb9dfa();
    console.log("被水滴砸中： " + ($.farmInfo.todayGotWaterGoalTask.canPop ? "是" : "否"));
    $.farmInfo.todayGotWaterGoalTask.canPop && (await _0x632a14(), $.goalResult.code === "0" && console.log("获得" + $.goalResult.addEnergy + "g💧\n"));
    console.log("\n开始日常任务...");

    let _0x58719f = $.farmTask.gotBrowseTaskAdInit.userBrowseTaskAds,
        _0x5b8c64 = $.farmTask.businessImprovementInit ? $.farmTask.businessImprovementInit.busiImproveTasks : [],
        _0x5195ef = 0,
        _0x4e4cf1 = 0,
        _0x5849b8 = 0;

    if (!$.farmTask.gotThreeMealInit.f) {
        await _0x37cf2e();
        $.threeMeal.code === "0" ? (console.log("定时领水 获得" + $.threeMeal.amount + "g💧\n"), _0x5195ef += $.threeMeal.amount, _0x4e4cf1++) : console.log("定时领水失败:  " + JSON.stringify($.threeMeal));
    }

    if ($.farmTask.treasureBoxInit && !$.farmTask.treasureBoxInit.f) {
        console.log("" + $.farmTask.treasureBoxInit.taskMainTitle);

        let _0x556ed1 = await _0x3ba319();

        _0x556ed1.code == 0 && ($.log("完成，获得" + _0x556ed1.waterGram + "g💧\n"), _0x5195ef += _0x556ed1.waterGram, _0x4e4cf1++);
    }

    if ($.farmTask["treasureBoxInit-getBean"] && !$.farmTask["treasureBoxInit-getBean"].f) {
        console.log("" + $.farmTask["treasureBoxInit-getBean"].taskMainTitle);

        let _0x521cff = await _0x1ba478();

        _0x521cff.code == 0 && ($.log("完成，获得" + _0x521cff.waterGram + "g💧\n"), _0x5195ef += _0x521cff.waterGram, _0x4e4cf1++);
    }

    _0x58719f = _0x58719f.concat(_0x5b8c64);

    for (let _0x2aa144 of _0x58719f) {
        if (_0x2aa144.limit <= _0x2aa144.hadFinishedTimes) {
            if (_0x2aa144.mainTitle.includes("领奖")) {
                await _0x438b57(_0x2aa144.advertId, 1, _0x2aa144.adType);
                continue;
            }

            console.log(_0x2aa144.mainTitle + " ---- 已完成");
            continue;
        }

        console.log("去做任务: " + _0x2aa144.mainTitle);
        await _0x438b57(_0x2aa144.advertId, 0, _0x2aa144.adType);
        $.browseResult.code === "0" ? (console.log(_0x2aa144.mainTitle + " 任务完成"), await _0x438b57(_0x2aa144.advertId, 1, _0x2aa144.adType), $.browseRwardResult.code === "0" ? (console.log("领取 " + _0x2aa144.mainTitle + " 任务奖励成功, 获得" + $.browseRwardResult.amount + "g💧"), _0x5195ef += $.browseRwardResult.amount, _0x4e4cf1++) : (_0x5849b8++, console.log("领取奖励结果:  " + JSON.stringify($.browseRwardResult)))) : (_0x5849b8++, console.log("任务结果:   " + JSON.stringify($.browseResult)));
    }

    if (_0x5849b8 > 0) {
        console.log("\n日常任务 完成" + _0x4e4cf1 + "个,失败" + _0x5849b8 + ",获得" + _0x5195ef + "g💧\\n");
    } else {
        _0x4e4cf1 > 0 && console.log("\n日常任务 完成" + _0x4e4cf1 + "个,获得" + _0x5195ef + "g💧\n");
    }

    if (!$.farmTask.waterFriendTaskInit.f) {
        if ($.farmTask.waterFriendTaskInit.waterFriendCountKey < $.farmTask.waterFriendTaskInit.waterFriendMax) {
            await _0x4e61c2();
        }
    } else {
        console.log("给" + $.farmTask.waterFriendTaskInit.waterFriendMax + "个好友浇水任务已完成\n");
    }

    await _0x32456e();
    await _0x3c1002();
    await _0x1012cf();
    await _0x588ad2();
}

async function _0x101779() {
    console.log("开始预测水果成熟时间...\n");
    await _0x409240();

    if (!$.farmInfo.farmUserPro) {
        await _0x409240();
    }

    await _0xfb9dfa();
    let _0x551712 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x95de59 += "【今日共浇水】" + _0x551712 + "次\n";
    _0x95de59 += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    _0x95de59 += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";

    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        _0x95de59 += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else {
        $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x95de59 += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");
    }

    let _0x3c54a5 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

    if (_0x551712 > 2) {
        let _0x36ccb3 = Math.ceil(_0x3c54a5 / _0x551712) || 0;

        _0x95de59 += "【预测】" + (_0x36ccb3 === 1 ? "明天" : _0x36ccb3 === 2 ? "后天" : _0x36ccb3 + "天之后") + "(" + _0x462216(86400000 * _0x36ccb3 + Date.now()) + "日)可兑换水果🍉\n";
    } else {
        _0x95de59 += "【预测】不浇水无限期\n";
    }
}

async function _0x363413() {
    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
    await _0x42860d();
    const {
        fastCard: _0x2a573a,
        doubleCard: _0x277e49,
        beanCard: _0x571a79,
        signCard: _0x19b286
    } = $.myCardInfoRes;

    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && _0x571a79 > 0) {
        console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + _0x571a79 + "张, 跳过10次浇水任务");
        return;
    }

    if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log("\n准备浇水十次");
        let _0x124671 = 0;
        _0x4cb13b = false;

        for (; _0x124671 < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit - $.farmTask.totalWaterTaskInit.totalWaterTaskTimes; _0x124671++) {
            console.log("第" + (_0x124671 + 1) + "次浇水");
            await _0x3b70a4();

            if ($.waterResult.code === "0") {
                console.log("浇水成功，剩余水滴" + $.waterResult.totalEnergy + "g");

                if ($.waterResult.finished) {
                    _0x4cb13b = true;
                    break;
                } else {
                    if ($.waterResult.totalEnergy < 10) {
                        console.log("水滴不够，结束浇水\n");
                        break;
                    }

                    await _0x4f5055();
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水\n");
                break;
            }
        }

        _0x4cb13b && (_0x145492["open-url"] = _0x2050fb, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x145492), $.done(), $.isNode() && (await _0x1ac4cf.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
    } else {
        console.log("\n今日已完成10次浇水任务\n");
    }
}

async function _0x4111b0() {
    await _0xfb9dfa();
    !$.farmTask.firstWaterInit.f && $.farmTask.firstWaterInit.totalWaterTimes > 0 ? (await _0x104448(), $.firstWaterReward.code === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward.amount + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward))) : console.log("首次浇水奖励已领取\n");
}

async function _0x3c388f() {
    if (!$.farmTask.totalWaterTaskInit.f && $.farmTask.totalWaterTaskInit.totalWaterTaskTimes >= $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        await _0x2ba65b();
        $.totalWaterReward.code === "0" ? console.log("10次浇水完成 获得" + $.totalWaterReward.totalWaterTaskEnergy + "g💧\n") : console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward) + "\n");
    } else {
        $.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit && console.log("10次浇水 未完成，今日浇水" + $.farmTask.totalWaterTaskInit.totalWaterTaskTimes + "次\n");
    }

    console.log("finished 水果任务完成!");
}

async function _0x1a6940() {
    await _0x42860d();
    let _0x312044 = $.farmInfo.farmUserPro.totalEnergy;
    const {
        fastCard: _0x13f272,
        doubleCard: _0x232ee7,
        beanCard: _0x37a979,
        signCard: _0x214602
    } = $.myCardInfoRes;
    console.log("\n检查背包道具:\n快速浇水卡:" + (_0x13f272 === -1 ? "未解锁" : _0x13f272 + "张") + "\n水滴翻倍卡:" + (_0x232ee7 === -1 ? "未解锁" : _0x232ee7 + "张") + "\n水滴换京豆卡:" + (_0x37a979 === -1 ? "未解锁" : _0x37a979 + "张") + "\n加签卡:" + (_0x214602 === -1 ? "未解锁" : _0x214602 + "张") + "\n");

    if (_0x312044 >= 100 && _0x232ee7 > 0 && $.farmInfo.farmUserPro.treeState == 1) {
        for (let _0x398677 = 0; _0x398677 < new Array(_0x232ee7).fill("").length; _0x398677++) {
            await _0x3ee830("doubleCard");
            $.userMyCardRes.code == "0" && ($.log("翻倍成功，获得" + $.userMyCardRes.addWater + "g💧"), _0x312044 += $.userMyCardRes.addWater);
        }
    }

    if (_0x214602 > 0 && $.farmInfo.farmUserPro.treeState == 1) {
        $.log("\n使用加签卡...");

        for (let _0x4a7259 = 0; _0x4a7259 < 3; _0x4a7259++) {
            await _0x3ee830("signCard");

            if ($.userMyCardRes.code == 0) {
                $.log("加签成功，获得" + $.userMyCardRes.amount + "g💧");
                _0x312044 += $.userMyCardRes.amount;
            } else {
                if ($.userMyCardRes.code == 20) {
                    $.log("使用上限了!");
                    break;
                } else {
                    if ($.userMyCardRes.code == 8) {
                        $.log("无法加签了!");
                        break;
                    } else {
                        console.log(JSON.stringify($.userMyCardRes) + "\n");
                        break;
                    }
                }
            }
        }
    }

    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);

    if (jdFruitBeanCard == "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
        console.log("\n您设置的是水滴换豆功能,现在为您换豆");

        if (_0x312044 >= 100 && $.myCardInfoRes.beanCard > 0) {
            await _0x3ee830("beanCard");

            if ($.userMyCardRes.code === "0") {
                _0x95de59 += "【水滴换豆卡】获得" + $.userMyCardRes.beanCount + "个京豆\n";
                return;
            }
        } else {
            console.log("您目前水滴:" + _0x312044 + "g,水滴换豆卡" + $.myCardInfoRes.beanCard + "张,暂不满足水滴换豆的条件,为您继续浇水");
        }
    }
}

async function _0x121661() {
    console.log("检查剩余水滴能否继续浇水...\n");
    await _0x409240();
    let _0x345383 = $.farmInfo.farmUserPro.totalEnergy;
    console.log("剩余水滴" + _0x345383 + "g\n");
    const {
        fastCard: _0x146f9b,
        doubleCard: _0x2f2b8f,
        beanCard: _0x27797e,
        signCard: _0x2ee1f7
    } = $.myCardInfoRes;

    let _0x6e1d25 = _0x345383 - retainWater;

    $.log("\n开始浇水...");

    if (_0x345383 > 800 && $.myCardInfoRes.fastCard > 0 && $.farmInfo.farmUserPro.treeState === 1) {
        $.log("\n水比较多去快速浇水...");

        for (let _0x1dfabe = 0; _0x1dfabe < Math.min.apply(null, [new Array(_0x146f9b).fill("").length, parseInt(_0x6e1d25 / 10), ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10]); _0x1dfabe++) {
            await _0x3ee830("fastCard");
            $.log("快速浇水" + (_0x1dfabe + 1) + "次");
            $.userMyCardRes.code === "0" && console.log("快速浇水" + $.userMyCardRes.waterEnergy + "g成功\n");

            if ($.userMyCardRes.treeFinished) {
                $.log("水果已成熟啦！\n");
                break;
            }

            await $.wait(500);
            _0x345383 -= 100;

            if (_0x345383 < 200) {
                break;
            }
        }

        _0x6e1d25 = _0x345383 - retainWater;
    } else {
        if (_0x345383 >= $.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) {
            _0x4cb13b = false;

            for (let _0x5bc0d2 = 0; _0x5bc0d2 < ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10; _0x5bc0d2++) {
                await _0x3b70a4();
                await $.wait(500);
                $.log("浇水" + (_0x5bc0d2 + 1) + "次");

                if ($.waterResult.code === "0") {
                    console.log("浇水10g成功");

                    if ($.waterResult.finished) {
                        _0x4cb13b = true;
                        $.log("水果已成熟啦！\n");
                        break;
                    } else {
                        console.log("剩余水滴" + $.waterResult.totalEnergy + "g,果树已浇水" + $.waterResult.treeEnergy + "g\n");
                    }
                } else {
                    console.log("浇水出现失败异常,跳出不在继续浇水");
                    break;
                }
            }

            _0x4cb13b && (_0x145492["open-url"] = _0x2050fb, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x145492), $.done(), $.isNode() && (await _0x1ac4cf.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
        } else {
            if (_0x6e1d25 > 10) {
                console.log("目前剩余水滴：" + _0x345383 + "g，可继续浇水");
                _0x4cb13b = false;

                for (let _0x3e1177 = 0; _0x3e1177 < parseInt(_0x6e1d25 / 10); _0x3e1177++) {
                    $.log("浇水" + (_0x3e1177 + 1) + "次");
                    await _0x3b70a4();

                    if ($.waterResult.code === "0") {
                        console.log("浇水10g成功,剩余" + $.waterResult.totalEnergy + "g,果树已浇水" + $.waterResult.treeEnergy + "g\n");

                        if ($.waterResult.finished) {
                            _0x4cb13b = true;
                            $.log("水果已成熟啦！\n");
                            break;
                        } else {
                            await _0x4f5055();
                        }
                    } else {
                        console.log("浇水出现失败异常,跳出不在继续浇水");
                        break;
                    }
                }

                _0x4cb13b && (_0x145492["open-url"] = _0x2050fb, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x145492), $.done(), $.isNode() && (await _0x1ac4cf.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
            } else {
                console.log("目前剩余水滴：【" + _0x345383 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
            }
        }
    }
}

function _0x4f5055() {
    return new Promise(async _0x58b871 => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g💧");
            await _0x44961b("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");
        } else {
            if ($.waterResult.waterStatus === 1) {
                console.log("果树开花了,奖励40g💧");
                await _0x44961b("2");
                console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
                $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            } else {
                $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g💧"), await _0x44961b("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
            }
        }

        _0x58b871();
    });
}

async function _0x588ad2() {
    await _0x1c76ef();

    if ($.initForTurntableFarmRes.code === "0") {
        let {
            timingIntervalHours: _0x46e9bf,
            timingLastSysTime: _0x426626,
            sysTime: _0x24e58b,
            timingGotStatus: _0x530e15,
            remainLotteryTimes: _0x4c3ff3,
            turntableInfos: _0x45112f
        } = $.initForTurntableFarmRes;
        !_0x530e15 ? (console.log("领取免费赠送的抽奖机会----" + (_0x24e58b > _0x426626 + 3600 * _0x46e9bf * 1000)), _0x24e58b > _0x426626 + 3600 * _0x46e9bf * 1000 ? (await _0x2241bf(), $.timingAwardRes.code == 0 ? (console.log("领取定时奖励: " + $.timingAwardRes.addTimes + "次抽奖机会🥳"), _0x4c3ff3 = $.timingAwardRes.remainLotteryTimes) : console.log("" + JSON.stringify($.timingAwardRes))) : console.log("免费赠送的抽奖机会未到时间")) : console.log("4小时免费赠送的抽奖机会已领取");

        let _0x194073 = $.initForTurntableFarmRes.turntableBrowserAds.filter(_0x57a45a => !_0x57a45a.status);

        if (_0x194073.length > 0) {
            for (let _0x2f275a = 0; _0x2f275a < _0x194073.length; _0x2f275a++) {
                console.log("\n开始天天抽奖的第" + (_0x2f275a + 1) + "个逛会场任务");
                await _0x2a0330(1, $.initForTurntableFarmRes.turntableBrowserAds[_0x2f275a].adId);

                if ($.browserForTurntableFarmRes.code === "0" && $.browserForTurntableFarmRes.status) {
                    console.log("任务完成，去领取奖励");
                    await _0x2a0330(2, $.initForTurntableFarmRes.turntableBrowserAds[_0x2f275a].adId);
                    $.browserForTurntableFarmRes.code === "0" && (console.log("获得" + $.browserForTurntableFarmRes.addTimes + "次抽奖机会🥳\n"), _0x4c3ff3 = $.browserForTurntableFarmRes.totalTimes);
                }
            }
        } else {
            $.log("\n天天抽奖任务已全部完成！");
        }

        if (_0x4c3ff3 > 0) {
            console.log("\n天天抽奖次数 " + _0x4c3ff3);
            console.log("开始抽奖...");
            let _0x3e7cad = "";

            for (let _0x2e5124 = 0; _0x2e5124 < new Array(_0x4c3ff3).fill("").length; _0x2e5124++) {
                await _0x24b0a7();
                await $.wait(500);
                console.log("第" + (_0x2e5124 + 1) + "次抽奖");

                if ($.lotteryRes.code === "0") {
                    _0x45112f.map(_0x25553a => {
                        if (_0x25553a.type === $.lotteryRes.type) {
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                                _0x3e7cad += _0x25553a.name + "个🥔，";
                            } else {
                                $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? _0x3e7cad += _0x25553a.name + "💧，" : _0x3e7cad += _0x25553a.name + "，";
                            }
                        }
                    });

                    if ($.lotteryRes.remainLotteryTimes === 0) {
                        break;
                    }
                }
            }

            _0x3e7cad && console.log("天天抽奖奖励：" + _0x3e7cad.substr(0, _0x3e7cad.length - 1) + "\n");
        } else {
            console.log("天天抽奖无次数！");
        }
    } else {
        console.log("初始化天天抽奖得好礼失败！");
    }
}

async function _0x1012cf() {
    await _0x25cc8a();

    if ($.farmAssistResult.code === "0") {
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length >= 2) {
            if ($.farmAssistResult.status === 2) {
                let _0x274c77 = 0;

                for (let _0x162543 of Object.keys($.farmAssistResult.assistStageList)) {
                    let _0x26ce00 = $.farmAssistResult.assistStageList[_0x162543];
                    _0x26ce00.stageStaus === 2 && (await _0x37d271(), await $.wait(500), $.receiveStageEnergy.code === "0" && (console.log("成功领取第" + (Number(_0x162543) + 1) + "段助力奖励：【" + $.receiveStageEnergy.amount + "】g💧"), _0x274c77 += $.receiveStageEnergy.amount));
                }

                _0x95de59 += "【额外奖励】" + _0x274c77 + "g💧领取成功\n";
            } else {
                $.farmAssistResult.status === 3 && (console.log("已经领取过8好友助力额外奖励"), _0x95de59 += "【额外奖励】已被领取过\n");
            }
        } else {
            console.log("助力好友未达到2个");
            _0x95de59 += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
        }

        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length > 0) {
            let _0x42bdc1 = "";
            $.farmAssistResult.assistFriendList.map((_0x26bb16, _0x26a5b9) => {
                _0x26a5b9 === $.farmAssistResult.assistFriendList.length - 1 ? _0x42bdc1 += _0x26bb16.nickName || "匿名用户" : _0x42bdc1 += (_0x26bb16.nickName || "匿名用户") + ",";

                let _0x389ceb = new Date(_0x26bb16.time),
                    _0x43591c = _0x389ceb.getFullYear() + "-" + (_0x389ceb.getMonth() + 1) + "-" + _0x389ceb.getDate() + " " + _0x389ceb.getHours() + ":" + _0x389ceb.getMinutes() + ":" + _0x389ceb.getMinutes();

                console.log("【" + (_0x26bb16.nickName || "匿名用户") + "】 在 " + _0x43591c + " 给您助过力");
            });
            _0x95de59 += "【助力您的好友】" + _0x42bdc1 + "\n";
        }

        console.log("\n领取额外奖励水滴结束\n");
    } else {
        await _0x53aac3();

        if ($.masterHelpResult.code === "0") {
            $.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5 ? !$.masterHelpResult.masterGotFinal ? (await _0x3e3f6a(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x95de59 += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), _0x95de59 += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), _0x95de59 += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x4c8037 = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x335422, _0x576306) => {
                    if (_0x576306 === $.masterHelpResult.masterHelpPeoples.length - 1) {
                        _0x4c8037 += _0x335422.nickName || "匿名用户";
                    } else {
                        _0x4c8037 += (_0x335422.nickName || "匿名用户") + ",";
                    }

                    let _0x455752 = new Date(_0x335422.time),
                        _0x5741c9 = _0x455752.getFullYear() + "-" + (_0x455752.getMonth() + 1) + "-" + _0x455752.getDate() + " " + _0x455752.getHours() + ":" + _0x455752.getMinutes() + ":" + _0x455752.getMinutes();

                    console.log("【" + (_0x335422.nickName || "匿名用户") + "】 在 " + _0x5741c9 + " 给您助过力");
                });
                _0x95de59 += "【助力您的好友】" + _0x4c8037 + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x3c1002() {
    let _0x3288ab = !$.farmTask.waterRainInit.f;

    _0x3288ab ? (console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否")), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 10800000 && (_0x3288ab = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n")), _0x3288ab && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x2f2769(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")))) : console.log("【水滴雨】已全部完成\n");
}

async function _0x32456e() {
    console.log("开始打卡领水活动（签到，关注，领券）");
    await _0x1a686b();

    if ($.clockInInit.code === "0") {
        !$.clockInInit.todaySigned && (console.log("开始今日签到"), await _0x3c0d90(), $.clockInForFarmRes.code === "0" ? (console.log("【第" + $.clockInForFarmRes.signDay + "天签到】获得" + $.clockInForFarmRes.amount + "g💧\n"), $.clockInForFarmRes.signDay === 7 && (console.log("开始领取惊喜礼包"), await _0x498ee9(), $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n"))) : console.log("打卡结果" + JSON.stringify($.clockInForFarmRes)));
        $.clockInInit.todaySigned && $.clockInInit.totalSigned === 7 && (console.log("开始领取惊喜礼包"), await _0x498ee9(), $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n"));

        if ($.clockInInit.themes && $.clockInInit.themes.length > 0) {
            for (let _0xa2ceb1 of $.clockInInit.themes) {
                if (!_0xa2ceb1.hadGot) {
                    console.log("去关注" + _0xa2ceb1.name);
                    await _0x1035cf(_0xa2ceb1.id, "theme", "1");

                    if ($.themeStep1.code === "0") {
                        await _0x1035cf(_0xa2ceb1.id, "theme", "2");

                        if ($.themeStep2.code === "0") {
                            console.log("关注 成功，获得" + $.themeStep2.amount + "g💧\n");
                        } else {
                            console.log("themeStep2结果: " + JSON.stringify($.themeStep2));
                        }
                    } else {
                        console.log("themeStep1结果: " + JSON.stringify($.themeStep1));
                    }
                }
            }
        }

        if ($.clockInInit.venderCoupons && $.clockInInit.venderCoupons.length > 0) {
            for (let _0xf24353 of $.clockInInit.venderCoupons) {
                !_0xf24353.hadGot && (console.log("领券的ID" + _0xf24353.id), await _0x1035cf(_0xf24353.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1.code === "0" && (await _0x1035cf(_0xf24353.id, "venderCoupon", "2"), $.venderCouponStep2.code === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + _0xf24353.name + "领券，获得水滴" + $.venderCouponStep2.amount + "g💧"))));
            }
        }
    }

    console.log("打卡领水活动结束\n");
}

async function _0x4e61c2() {
    await _0x2daea4();
    console.log("\n开始给好友浇水...");
    await _0xfb9dfa();
    const {
        waterFriendCountKey: _0x2466df,
        waterFriendMax: _0x27612a
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0x2466df + "个好友浇水");

    if (_0x2466df < _0x27612a) {
        let _0x4b5fcc = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x1c15b3, _0x399c87) => {
                _0x1c15b3.friendState === 1 && _0x4b5fcc.length < _0x27612a - _0x2466df && _0x4b5fcc.push(_0x1c15b3.shareCode);
            });
            _0x4b5fcc.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x4b5fcc));
            _0x4b5fcc.length == 0 && console.log("没有需要浇水的好友!\n");
            let _0x9f585d = 0,
                _0x201ae5 = "";

            for (let _0x188246 = 0; _0x188246 < _0x4b5fcc.length; _0x188246++) {
                await _0x3dde78(_0x4b5fcc[_0x188246]);
                console.log("为第" + (_0x188246 + 1) + "个好友浇水");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x9f585d++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");

                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x201ae5 += "水滴换豆卡,";
                        } else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") {
                                console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                _0x201ae5 += "快速浇水卡,";
                            } else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") {
                                    console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                    _0x201ae5 += "水滴翻倍卡,";
                                } else {
                                    $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x201ae5 += "加签卡,");
                                }
                            }
                        }
                    }
                } else {
                    $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
                }
            }

            _0x9f585d > 0 && console.log("已给" + _0x9f585d + "个好友浇水,消耗" + _0x9f585d * 10 + "g水\n");
            _0x201ae5 && _0x201ae5.length > 0 && console.log("【好友浇水奖励】" + _0x201ae5.substr(0, _0x201ae5.length - 1) + "\n");
        } else {
            console.log("好友列表无好友,快去邀请您的好友吧!\n");
        }
    } else {
        console.log("今日已为" + _0x27612a + "个好友浇水\n");
    }
}

async function _0x68f83b() {
    await _0xfb9dfa();
    const {
        waterFriendCountKey: _0x429b63,
        waterFriendMax: _0xf02983,
        waterFriendSendWater: _0x142280,
        waterFriendGotAward: _0x5a63c2
    } = $.farmTask.waterFriendTaskInit;
    _0x429b63 >= _0xf02983 ? !_0x5a63c2 ? (await _0x2d563c(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n") : console.log("给" + _0xf02983 + "个好友浇水未完成\n");
}

async function _0x5a4588() {
    for (let _0x5f50aa of _0x11ab2e) {
        if (_0x5f50aa === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0x5b968e(_0x5f50aa);

        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
            console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
        } else {
            $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
        }
    }
}

async function _0x3ee63a() {
    for (let _0x238ebb = 0; _0x238ebb < 10; _0x238ebb++) {
        const _0x4ae8f6 = {
            type: 2,
            version: 24,
            channel: 1,
            babelChannel: "121"
        };
        $.duckRes = await _0x10685f("getFullCollectionReward", _0x4ae8f6);

        if ($.duckRes.code === "0") {
            if (!$.duckRes.hasLimit) {
                console.log("小鸭子游戏:" + $.duckRes.title);
            } else {
                console.log("" + $.duckRes.title);
                break;
            }
        } else {
            if ($.duckRes.code === "10") {
                console.log("小鸭子游戏达到上限");
                break;
            }
        }
    }
}

async function _0x2ba65b() {
    $.totalWaterReward = await _0x10685f("totalWaterTaskForFarm");
}

async function _0x104448() {
    $.firstWaterReward = await _0x10685f("firstWaterTaskForFarm");
}

async function _0x395e5d() {
    const _0x89f60e = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.newtaskinfo = await _0x10685f("gotNewUserTaskForFarm", _0x89f60e);
}

async function _0x39dbf7() {
    $.newtaskinfo = await _0x10685f("gotLowFreqWaterForFarm", {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    });
}

async function _0x409240() {
    $.farmInfo = await _0x10685f("gotNewUserTaskForFarm", {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    });
}

async function _0x3867a3() {
    const _0x5dca2b = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.farmInfoI = await _0x10685f("initForFarm", _0x5dca2b);
}

async function _0x2d563c() {
    const _0x54bc15 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterFriendGotAwardRes = await _0x10685f("waterFriendGotAwardForFarm", _0x54bc15);
}

async function _0x42860d() {
    const _0x417379 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.myCardInfoRes = await _0x10685f("myCardInfoForFarm", _0x417379);
}

async function _0x3ee830(_0x1371b0) {
    const _0x5d5799 = {
        cardType: _0x1371b0
    };
    $.userMyCardRes = await _0x10685f("userMyCardForFarm", _0x5d5799);
}

async function _0x44961b(_0x1408e5) {
    const _0x17c9d0 = {
        type: _0x1408e5
    };
    $.gotStageAwardForFarmRes = await _0x10685f("gotStageAwardForFarm", _0x17c9d0);
}

async function _0x3b70a4() {
    await $.wait(1000);
    $.waterResult = await _0x10685f("waterGoodForFarm");
}

async function _0x1c76ef() {
    const _0x4ee651 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.initForTurntableFarmRes = await _0x10685f("initForTurntableFarm", _0x4ee651);
}

async function _0x24b0a7() {
    await $.wait(2000);
    const _0x337793 = {
        type: 1,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.lotteryRes = await _0x10685f("lotteryForTurntableFarm", _0x337793);
}

async function _0x2241bf() {
    const _0x511283 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.timingAwardRes = await _0x10685f("timingAwardForTurntableFarm", _0x511283);
}

async function _0x2a0330(_0x17b607, _0x8d5933) {
    const _0x3625a9 = {
        type: _0x17b607,
        adId: _0x8d5933,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.browserForTurntableFarmRes = await _0x10685f("browserForTurntableFarm", _0x3625a9);
}

async function _0x3c0780(_0x30a133) {
    const _0x1d529e = {
        type: 2,
        adId: _0x30a133,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.browserForTurntableFarm2Res = await _0x10685f("browserForTurntableFarm", _0x1d529e);
}

async function _0x5c1a5e() {
    const _0x3cac49 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-3",
        babelChannel: "3",
        version: 24,
        channel: 1
    };
    $.lotteryMasterHelpRes = await _0x10685f("initForFarm", _0x3cac49);
}

async function _0x3e3f6a() {
    $.masterGotFinished = await _0x10685f("masterGotFinishedTaskForFarm");
}

async function _0x53aac3() {
    $.masterHelpResult = await _0x10685f("masterHelpTaskInitForFarm");
}

async function _0x25cc8a() {
    const _0x2184e5 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.farmAssistResult = await _0x10685f("farmAssistInit", _0x2184e5);
}

async function _0x37d271() {
    const _0x581705 = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.receiveStageEnergy = await _0x10685f("receiveStageEnergy", _0x581705);
}

async function _0x5b968e() {
    const _0xe6fec8 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-inviteFriend",
        version: 4,
        channel: 2
    };
    $.inviteFriendRes = await _0x10685f("initForFarm", _0xe6fec8);
}

async function _0xa2dc13() {
    const _0x208d89 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    };
    $.helpResult = await _0x10685f("initForFarm", _0x208d89);
}

async function _0x2f2769() {
    const _0x46a41d = {
        type: 1,
        hongBaoTimes: 100,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterRain = await _0x10685f("waterRainForFarm", _0x46a41d);
}

async function _0x1a686b() {
    $.clockInInit = await _0x10685f("clockInInitForFarm");
}

async function _0x3c0d90() {
    const _0x352007 = {
        type: 1
    };
    $.clockInForFarmRes = await _0x10685f("clockInForFarm", _0x352007);
}

async function _0x1035cf(_0x4659a8, _0x3a6113, _0x31853f) {
    const _0x3f7f35 = "clockInFollowForFarm",
        _0x35857a = {
            id: _0x4659a8,
            type: _0x3a6113,
            step: _0x31853f
        };

    if (_0x3a6113 === "theme") {
        if (_0x31853f === "1") {
            $.themeStep1 = await _0x10685f(_0x3f7f35, _0x35857a);
        } else {
            _0x31853f === "2" && ($.themeStep2 = await _0x10685f(_0x3f7f35, _0x35857a));
        }
    } else {
        if (_0x3a6113 === "venderCoupon") {
            if (_0x31853f === "1") {
                $.venderCouponStep1 = await _0x10685f(_0x3f7f35, _0x35857a);
            } else {
                _0x31853f === "2" && ($.venderCouponStep2 = await _0x10685f(_0x3f7f35, _0x35857a));
            }
        }
    }
}

async function _0x498ee9() {
    const _0x3db329 = {
        type: 2,
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.gotClockInGiftRes = await _0x10685f("clockInForFarm", _0x3db329);
}

async function _0x37cf2e() {
    $.threeMeal = await _0x10685f("gotThreeMealForFarm");
}

async function _0x438b57(_0x29c1b5, _0x3187cb, _0x4d6f46) {
    if (_0x3187cb === 0) {
        const _0x4f1eb8 = {
            advertId: _0x29c1b5,
            type: _0x3187cb,
            adType: _0x4d6f46,
            version: 24,
            channel: 1,
            babelChannel: "121",
            lat: "0",
            lng: "0"
        };
        $.browseResult = await _0x10685f("browseAdTaskForFarm", _0x4f1eb8);
    } else {
        _0x3187cb === 1 && ($.browseRwardResult = await _0x10685f("browseAdTaskForFarm", {
            advertId: _0x29c1b5,
            type: _0x3187cb,
            adType: _0x4d6f46,
            version: 24,
            channel: 1,
            babelChannel: "121",
            lat: "0",
            lng: "0"
        }));
    }
}

async function _0x632a14() {
    const _0x4da533 = {
        type: 3
    };
    $.goalResult = await _0x10685f("gotWaterGoalTaskForFarm", _0x4da533);
}

async function _0xfb9dfa() {
    $.farmTask = await _0x10685f("taskInitForFarm", {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    });
}

async function _0x9091f() {
    const _0x5ff3a9 = {
        version: 24,
        channel: 1,
        babelChannel: "45",
        lat: "0",
        lng: "0"
    };
    $.farmTask = await _0x10685f("taskInitForFarm", _0x5ff3a9);
}

async function _0x2daea4() {
    const _0xce9655 = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.friendList = await _0x10685f("friendListInitForFarm", _0xce9655);
}

async function _0x198033() {
    $.awardInviteFriendRes = await _0x10685f("awardInviteFriendForFarm");
}

async function _0x3dde78(_0x3024c2) {
    const _0x433678 = {
        shareCode: _0x3024c2,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterFriendForFarmRes = await _0x10685f("waterFriendForFarm", _0x433678);
}

async function _0x2a6814() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else {
        $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";
    }

    $.ctrTemp ? ($.msg($.name, _0x2dcdac, _0x95de59, _0x145492), $.isNode() && (_0x517495 += _0x2dcdac + "\n" + _0x95de59 + ($.index !== _0xb745f9.length ? "\n\n" : ""))) : $.log("\n" + _0x95de59 + "\n");
}

function _0x462216(_0x595291) {
    let _0x5990e2;

    if (_0x595291) {
        _0x5990e2 = new Date(_0x595291);
    } else {
        _0x5990e2 = new Date();
    }

    return _0x5990e2.getFullYear() + "-" + (_0x5990e2.getMonth() + 1 >= 10 ? _0x5990e2.getMonth() + 1 : "0" + (_0x5990e2.getMonth() + 1)) + "-" + (_0x5990e2.getDate() >= 10 ? _0x5990e2.getDate() : "0" + _0x5990e2.getDate());
}

function _0x2ad48b() {
    return new Promise(_0x4c26a6 => {
        console.log("开始获取配置文件\n");
        _0x1ac4cf = $.isNode() ? require("./sendNotify") : "";

        const _0xb4a1c0 = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0xb4a1c0).forEach(_0x5af0ad => {
                _0xb4a1c0[_0x5af0ad] && _0xb745f9.push(_0xb4a1c0[_0x5af0ad]);
            });

            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
                console.log = () => { };
            }
        } else {
            _0xb745f9 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4356e6($.getdata("CookiesJD") || "[]").map(_0x3a8fd8 => _0x3a8fd8.cookie)].filter(_0xaa822b => !!_0xaa822b);
        }

        _0x4c26a6();
    });
}

async function _0x1ba478() {
    await _0x10685f("ddnc_getTreasureBoxAward", {
        type: 1,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    });
    await $.wait(500);
    await _0x1c00ce();
    await $.wait(2000);
    const _0x9debc4 = {
        type: 2,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };

    let _0x5b3825 = await _0x10685f("ddnc_getTreasureBoxAward", _0x9debc4);

    return _0x5b3825;
}

async function _0x3ba319() {
    const _0x50df33 = {
        type: 1,
        babelChannel: "121",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };
    await _0x10685f("ddnc_getTreasureBoxAward", _0x50df33);
    await $.wait(500);
    await _0x9091f();
    await $.wait(2000);
    const _0x44f011 = {
        type: 2,
        babelChannel: "45",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };

    let _0x3c8ab9 = await _0x10685f("ddnc_getTreasureBoxAward", _0x44f011);

    return _0x3c8ab9;
}

function _0x1c00ce() {
    return new Promise(_0x22e0c3 => {
        const _0x5c7547 = {
            Cookie: _0x3f2ff7,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x357b0f = {
            url: "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            headers: _0x5c7547,
            timeout: 10000
        };
        $.get(_0x357b0f, (_0x52bc05, _0x2c696f, _0x593ba2) => {
            _0x22e0c3();
        });
    });
}

function _0x22620a() {
    return new Promise(_0x40cade => {
        const _0x7c9bd5 = {
            Cookie: _0x3f2ff7,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x20c9f9 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x7c9bd5,
            timeout: 10000
        };
        $.get(_0x20c9f9, (_0x476b4e, _0x996370, _0x3caff6) => {
            try {
                if (_0x3caff6) {
                    _0x3caff6 = JSON.parse(_0x3caff6);

                    if (!(_0x3caff6.islogin === "1")) {
                        _0x3caff6.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x563ba8) {
                console.log(_0x563ba8);
            } finally {
                _0x40cade();
            }
        });
    });
}

async function _0x10685f(_0x270317, _0x58e3d8 = {}, _0x1f7d51 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x29dfd4 / 1000 + "秒......\n"), _0x1f7d51 = _0x29dfd4);
    $.reqnum++;

    if (_0x4ab30d[_0x270317]) {
        let _0x4bbd0a = {
            appId: _0x4ab30d[_0x270317],
            fn: _0x270317,
            body: _0x58e3d8,
            apid: "signed_wh5",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
        _0x58e3d8 = await _0x40df58.getbody(_0x4bbd0a);
    } else {
        _0x58e3d8 = "functionId=" + _0x270317 + "&body=" + encodeURIComponent(JSON.stringify(_0x58e3d8)) + "&appid=wh5";
    }

    return new Promise(_0x40731c => {
        setTimeout(() => {
            $.get(_0x9f381b(_0x58e3d8), (_0x25b7a8, _0x23c471, _0x5134fe) => {
                try {
                    _0x25b7a8 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x25b7a8)), console.log("function_id:" + _0x270317), $.logErr(_0x25b7a8)) : _0x448e49(_0x5134fe) && (_0x5134fe = JSON.parse(_0x5134fe));
                } catch (_0x285524) {
                    $.logErr(_0x285524, _0x23c471);
                } finally {
                    _0x40731c(_0x5134fe);
                }
            });
        }, _0x1f7d51);
    });
}

function _0x448e49(_0x1a87d4) {
    try {
        if (typeof JSON.parse(_0x1a87d4) == "object") {
            return true;
        }
    } catch (_0x570a04) {
        console.log(_0x570a04);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x9f381b(_0x123b17 = {}) {
    const _0x4fa439 = {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://carry.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://carry.m.jd.com/",
        Cookie: _0x3f2ff7
    };
    const _0x218e28 = {
        url: _0x4a12a4 + "?" + _0x123b17,
        headers: _0x4fa439,
        timeout: 30000
    };
    return _0x218e28;
}

function _0x4de373(_0x2d1648, _0x50b515 = {}) {
    const _0x2c9e3a = {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://carry.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://carry.m.jd.com/",
        Cookie: _0x3f2ff7
    };
    const _0x29b149 = {
        url: _0x4a12a4 + "?" + _0x50b515,
        headers: _0x2c9e3a,
        timeout: 10000
    };
    return _0x29b149;
}

function _0x4356e6(_0x4abb6e) {
    if (typeof _0x4abb6e == "string") {
        try {
            return JSON.parse(_0x4abb6e);
        } catch (_0x27c7d2) {
            console.log(_0x27c7d2);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }