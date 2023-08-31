/*
更新时间：2023-8-29
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd免费水果
15 3,13,18 * * * jd_fruit.js, tag=东东农场, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true

变量：
export NO_WATER='true' 完全不浇水，浇水任务不做了
export DO_TEN_WATER_AGAIN='true' 攒水滴只交10次水，默认不攒水滴
export FRUIT_FAST_CARD='true' 使用快速浇水卡，水多可开启
epxort FRUIT_DELAY = '1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）
*/
const $ = new Env('东东农场-任务');
const retainWater = 100;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let _0x55c140 = [],
    _0x4f424f = "",
    _0x908b14,
    _0x399b0c,
    _0x176590 = "",
    _0x563161 = "",
    _0x327a26 = "",
    _0x4380b6 = {},
    _0x54e947 = false,
    _0x988790 = 0;

const _0x1e2bc8 = "https://api.m.jd.com/client.action",
    _0x3d6f6b = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    _0x207a65 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
    _0x2ac95e = require("./USER_AGENTS"),
    _0xafb1a2 = require("fs"),
    _0x9c13ae = require("./function/dylany");

let _0x49a027 = [];
$.reqnum = 1;
const _0x5f4fc3 = {
    "totalWaterTaskForFarm": "102f5",
    "gotThreeMealForFarm": "57b30",
    "browseAdTaskForFarm": "53f09",
    "clockInFollowForFarm": "4a0b4",
    "waterFriendForFarm": "673a0",
    "awardFirstFriendForFarm": "9b655",
    "limitWaterInitForFarm": "6bdc2",
    "ddnc_surpriseModal": "e81c1",
    "friendInitForFarm": "a5a9c",
    "waterGoodForFarm": "0c010",
    "firstWaterTaskForFarm": "0cf1e",
    "waterFriendGotAwardForFarm": "d08ff",
    "ddnc_getTreasureBoxAward": "67dfc",
    "orderTaskGotWaterForFarm": "eed5c",
    "clockInForFarm": "32b94",
    "awardInviteFriendForFarm": "2b5ca",
    "awardCallOrInviteFriendForFarm": "b0b03",
    "getFullCollectionReward": "5c767",
    "getOrderPayLotteryWater": "ef089",
    "receiveStageEnergy": "15507",
    "exchangeGood": "52963",
    "initForFarm": "8a2af",
    "taskInitForFarm": "fcb5a",
    "userMyCardForFarm": "86ba5",
    "getCallUserCardForFarm": "2ca57",
    "deleteFriendForFarm": "eaf91",
    "gotLowFreqWaterForFarm": "8172b",
    "choiceGoodsForFarm": "5f4ca",
    "gotCouponForFarm": "b1515",
    "gotStageAwardForFarm": "81591",
    "followVenderForBrand": "71547",
    "clockInInitForFarm": "08dc3",
    "guideTaskAward": "59bc4",
    "farmAssistInit": "92354",
    "myCardInfoForFarm": "157b6",
    "gotPopFirstPurchaseTaskForFarm": "d432f",
    "gotWaterGoalTaskForFarm": "c901b",
    "gotNewUserTaskForFarm": "de8f8"
};
!(async () => {
    await _0x21b904();

    if (!_0x55c140[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    process.env.DO_TEN_WATER_AGAIN == "true" && (_0x176590 = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n\n"));
    process.env.NO_WATER == "true" && (_0x176590 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n\n"));

    for (let _0x56310e = 0; _0x56310e < _0x55c140.length; _0x56310e++) {
        if (_0x55c140[_0x56310e]) {
            _0x4f424f = _0x55c140[_0x56310e];
            $.UserName = decodeURIComponent(_0x4f424f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f424f.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x56310e + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            await _0x446e84();
            console.log("--------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "---------------\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x908b14.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x563161 = "";
            _0x327a26 = "";
            _0x4380b6 = {};
            $.UA = _0x2ac95e.UARAM ? _0x2ac95e.UARAM() : _0x2ac95e.USER_AGENT;
            await _0x2f9afe();
            await $.wait(2000);
        }
    }

    _0xafb1a2.writeFile("./fruit_helpcode", JSON.stringify(_0x49a027), _0x31e8f1 => {
        _0x31e8f1 && console.log(_0x31e8f1);
    });

    $.isNode() && _0x176590 && $.ctrTemp && (await _0x908b14.sendNotify("" + $.name, "" + _0x176590));
})().catch(_0x4d87c0 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4d87c0 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2f9afe() {
    _0x327a26 = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x403252();

        if ($.farmInfo.farmUserPro) {
            _0x563161 = "【水果名称】" + $.farmInfo.farmUserPro.name + "\n";
            console.log("\n【好友互助码】" + $.farmInfo.farmUserPro.shareCode);
            console.log("\n【已成功兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次");
            _0x563161 += "【已兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n";

            if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
                _0x4380b6["open-url"] = _0x3d6f6b;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x4380b6);
                $.isNode() && (await _0x908b14.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看"));
            } else {
                if ($.farmInfo.treeState === 1) {
                    console.log("\n" + $.farmInfo.farmUserPro.name + "种植中...");
                } else {
                    if ($.farmInfo.treeState === 0) {
                        _0x4380b6["open-url"] = _0x3d6f6b;
                        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", _0x4380b6);
                        $.isNode() && (await _0x908b14.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
                        return;
                    }
                }
            }

            _0x49a027.push($.farmInfo.farmUserPro.shareCode);

            await _0x4b9d7b();
            await _0x2c5fa8();
            await _0x291433();
            await _0xfae53b();
            await _0x41c1c6();
            await _0x130f80();
            process.env.NO_WATER == "true" ? $.log("\n已设置完全不浇水\n") : !process.env.DO_TEN_WATER_AGAIN ? ($.log("执行再次浇水"), await _0x43b41a()) : $.log("不执行再次浇水，攒水滴");
            await $.wait(3000);
            await _0x1b1b83();
        } else JSON.stringify($.farmInfo).includes("winTexts") ? (console.log("初始化农场数据异常, 请确认此账号是否开通农场\n"), _0x563161 = "【数据异常】请确认此账号是否开通农场") : (console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x563161 = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常");
    } catch (_0x190f41) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️\n");
        $.logErr(_0x190f41);
    }

    await _0x1154aa();
}

async function _0x4b9d7b() {
    await _0x494b40();
    console.log("被水滴砸中： " + ($.farmInfo.todayGotWaterGoalTask.canPop ? "是" : "否"));
    $.farmInfo.todayGotWaterGoalTask.canPop && (await _0x507055(), $.goalResult.code === "0" && console.log("【被水滴砸中】获得" + $.goalResult.addEnergy + "g💧\\n"));
    console.log("签到结束,开始浏览任务");
    let _0x2ae62 = $.farmTask.gotBrowseTaskAdInit.userBrowseTaskAds,
        _0xe0a6e = 0,
        _0x268d10 = 0,
        _0x530d14 = 0;

    for (let _0x195d15 of _0x2ae62) {
        if (_0x195d15.limit <= _0x195d15.hadFinishedTimes) {
            console.log(_0x195d15.mainTitle + "+ ' 已完成");
            continue;
        }

        console.log("正在进行广告浏览任务: " + _0x195d15.mainTitle);
        await _0x38c869(_0x195d15.advertId, 0);

        if ($.browseResult.code === "0") {
            console.log(_0x195d15.mainTitle + "浏览任务完成");
            await _0x38c869(_0x195d15.advertId, 1);
            if ($.browseRwardResult.code === "0") console.log("领取浏览" + _0x195d15.mainTitle + "广告奖励成功,获得" + $.browseRwardResult.amount + "g"), _0xe0a6e += $.browseRwardResult.amount, _0x268d10++; else {
                _0x530d14++;
                console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult));
            }
        } else _0x530d14++, console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult));
    }

    _0x530d14 > 0 ? console.log("【广告浏览】完成" + _0x268d10 + "个,失败" + _0x530d14 + ",获得" + _0xe0a6e + "g💧\\n") : console.log("【广告浏览】完成" + _0x268d10 + "个,获得" + _0xe0a6e + "g💧\n");

    if (!$.farmTask.gotThreeMealInit.f) {
        await _0x41e462();

        if ($.threeMeal.code === "0") {
            console.log("【定时领水】获得" + $.threeMeal.amount + "g💧\n");
        } else console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal));
    } else console.log("当前不在定时领水时间断或者已经领过\n");

    !$.farmTask.waterFriendTaskInit.f ? $.farmTask.waterFriendTaskInit.waterFriendCountKey < $.farmTask.waterFriendTaskInit.waterFriendMax && (await _0x19b578()) : console.log("给" + $.farmTask.waterFriendTaskInit.waterFriendMax + "个好友浇水任务已完成\n");
    $.farmTask["treasureBoxInit-getBean"] && !$.farmTask["treasureBoxInit-getBean"].f ? (console.log("" + $.farmTask["treasureBoxInit-getBean"].taskMainTitle), await _0x452f31()) : console.log("逛领京豆任务已完成\n");
    await _0x2b237c();
    await _0x7cdd5d();
    await _0x9f3d3();
    await _0x42a232();
}

async function _0x1b1b83() {
    console.log("开始预测水果成熟时间\n");
    await _0x403252();
    if (!$.farmInfo.farmUserPro) await _0x403252();
    await _0x494b40();
    let _0x437ec9 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x563161 += "【今日共浇水】" + _0x437ec9 + "次\n";
    _0x563161 += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    _0x563161 += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";

    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        _0x563161 += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x563161 += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");

    let _0x54ed22 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10,
        _0x4f20a6 = Math.ceil(_0x54ed22 / _0x437ec9);

    _0x563161 += "【预测】" + (_0x4f20a6 === 1 ? "明天" : _0x4f20a6 === 2 ? "后天" : _0x4f20a6 + "天之后") + "(" + _0x4b294c(24 * 60 * 60 * 1000 * _0x4f20a6 + Date.now()) + "日)可兑换水果🍉\n";
}

async function _0x2c5fa8() {
    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
    await _0x35de76();
    const {
        fastCard: _0x2369a4,
        doubleCard: _0x326953,
        beanCard: _0x2542ff,
        signCard: _0x1b8cac
    } = $.myCardInfoRes;

    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && _0x2542ff > 0) {
        console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + _0x2542ff + "张, 跳过10次浇水任务");
        return;
    }

    if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log("\n准备浇水十次");
        let _0x4e9e3d = 0;
        _0x54e947 = false;

        for (; _0x4e9e3d < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit - $.farmTask.totalWaterTaskInit.totalWaterTaskTimes; _0x4e9e3d++) {
            console.log("第" + (_0x4e9e3d + 1) + "次浇水");
            await _0x33773b();
            console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

            if ($.waterResult.code === "0") {
                console.log("剩余水滴" + $.waterResult.totalEnergy + "g");

                if ($.waterResult.finished) {
                    _0x54e947 = true;
                    break;
                } else {
                    if ($.waterResult.totalEnergy < 10) {
                        console.log("水滴不够，结束浇水");
                        break;
                    }

                    await _0x2183af();
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        _0x54e947 && (_0x4380b6["open-url"] = _0x3d6f6b, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x4380b6), $.done(), $.isNode() && (await _0x908b14.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
    } else console.log("\n今日已完成10次浇水任务\n");
}

async function _0x291433() {
    await _0x494b40();
    !$.farmTask.firstWaterInit.f && $.farmTask.firstWaterInit.totalWaterTimes > 0 ? (await _0x33d1ef(), $.firstWaterReward.code === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward.amount + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward))) : console.log("首次浇水奖励已领取\n");
}

async function _0xfae53b() {
    if (!$.farmTask.totalWaterTaskInit.f && $.farmTask.totalWaterTaskInit.totalWaterTaskTimes >= $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) await _0x2eae46(), $.totalWaterReward.code === "0" ? console.log("【十次浇水奖励】获得" + $.totalWaterReward.totalWaterTaskEnergy + "g💧\n") : console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward)); else $.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask.totalWaterTaskInit.totalWaterTaskTimes + "次\n");
    console.log("finished 水果任务完成!");
}

async function _0x43b41a() {
    console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
    await _0x403252();
    let _0x195ca9 = $.farmInfo.farmUserPro.totalEnergy;
    console.log("剩余水滴" + _0x195ca9 + "g\n");
    await _0x35de76();
    const {
        fastCard: _0x2e58c8,
        doubleCard: _0x114712,
        beanCard: _0x2e9bf9,
        signCard: _0x2c34dc
    } = $.myCardInfoRes;
    console.log("背包已有道具:\n快速浇水卡:" + (_0x2e58c8 === -1 ? "未解锁" : _0x2e58c8 + "张") + "\n水滴翻倍卡:" + (_0x114712 === -1 ? "未解锁" : _0x114712 + "张") + "\n水滴换京豆卡:" + (_0x2e9bf9 === -1 ? "未解锁" : _0x2e9bf9 + "张") + "\n加签卡:" + (_0x2c34dc === -1 ? "未解锁" : _0x2c34dc + "张") + "\n");

    if (_0x195ca9 >= 100 && _0x114712 > 0) {
        for (let _0x245814 = 0; _0x245814 < new Array(_0x114712).fill("").length; _0x245814++) {
            await _0x41865c("doubleCard");
            console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
        }

        await _0x403252();
        _0x195ca9 = $.farmInfo.farmUserPro.totalEnergy;
    }

    if (_0x2c34dc > 0) {
        for (let _0x4ae551 = 0; _0x4ae551 < 3; _0x4ae551++) {
            await _0x41865c("signCard");
            console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
        }

        await _0x403252();
        _0x195ca9 = $.farmInfo.farmUserPro.totalEnergy;
    }

    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);

    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
        console.log("\n您设置的是水滴换豆功能,现在为您换豆");

        if (_0x195ca9 >= 100 && $.myCardInfoRes.beanCard > 0) {
            await _0x41865c("beanCard");
            console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));

            if ($.userMyCardRes.code === "0") {
                _0x563161 += "【水滴换豆卡】获得" + $.userMyCardRes.beanCount + "个京豆\n";
                return;
            }
        } else console.log("您目前水滴:" + _0x195ca9 + "g,水滴换豆卡" + $.myCardInfoRes.beanCard + "张,暂不满足水滴换豆的条件,为您继续浇水");
    }

    if (process.env.FRUIT_FAST_CARD && _0x195ca9 > 100 && $.myCardInfoRes.fastCard > 0) {
        for (let _0x236967 = 0; _0x236967 < new Array(_0x2e58c8).fill("").length; _0x236967++) {
            await _0x41865c("fastCard");
            console.log("使用快速浇水卡结果:" + JSON.stringify($.userMyCardRes));
            $.userMyCardRes.code === "0" && console.log("已使用快速浇水卡浇水" + $.userMyCardRes.waterEnergy + "g");
            if ($.userMyCardRes.treeFinished) break;
            await $.wait(1000);
            await _0x403252();
            _0x195ca9 = $.farmInfo.farmUserPro.totalEnergy;
            if (_0x195ca9 < 100) break;
        }
    }

    let _0x20003f = _0x195ca9 - retainWater;

    if (_0x195ca9 >= $.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) {
        _0x54e947 = false;

        for (let _0xfca728 = 0; _0xfca728 < ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10; _0xfca728++) {
            await _0x33773b();
            await $.wait(500);
            console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));

            if ($.waterResult.code === "0") {
                console.log("\n浇水10g成功\n");

                if ($.waterResult.finished) {
                    _0x54e947 = true;
                    break;
                } else console.log("目前水滴【" + $.waterResult.totalEnergy + "】g,继续浇水，水果马上就可以兑换了");
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        _0x54e947 && (_0x4380b6["open-url"] = _0x3d6f6b, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x4380b6), $.done(), $.isNode() && (await _0x908b14.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
    } else {
        if (_0x20003f >= 10) {
            console.log("目前剩余水滴：【" + _0x195ca9 + "】g，可继续浇水");
            _0x54e947 = false;

            for (let _0xb0afee = 0; _0xb0afee < parseInt(_0x20003f / 10); _0xb0afee++) {
                await _0x33773b();
                console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

                if ($.waterResult.code === "0") {
                    console.log("\n浇水10g成功,剩余" + $.waterResult.totalEnergy + "\n");

                    if ($.waterResult.finished) {
                        _0x54e947 = true;
                        break;
                    } else await _0x2183af();
                } else {
                    console.log("浇水出现失败异常,跳出不在继续浇水");
                    break;
                }
            }

            _0x54e947 && (_0x4380b6["open-url"] = _0x3d6f6b, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x4380b6), $.done(), $.isNode() && (await _0x908b14.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取")));
        } else console.log("目前剩余水滴：【" + _0x195ca9 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
    }
}

function _0x2183af() {
    return new Promise(async _0x3fd9d8 => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g水滴");
            await _0x4d58c1("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));

            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "\n");
            }
        } else {
            if ($.waterResult.waterStatus === 1) {
                console.log("果树开花了,奖励40g水滴");
                await _0x4d58c1("2");
                console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));

                if ($.gotStageAwardForFarmRes.code === "0") {
                    console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
                }
            } else $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g水滴"), await _0x4d58c1("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
        }

        _0x3fd9d8();
    });
}

async function _0x42a232() {
    await _0x34585a();

    if ($.initForTurntableFarmRes.code === "0") {
        let {
            timingIntervalHours: _0x4a87a3,
            timingLastSysTime: _0x437891,
            sysTime: _0x317a25,
            timingGotStatus: _0x55b29d,
            remainLotteryTimes: _0xc65fec,
            turntableInfos: _0x45dfd6
        } = $.initForTurntableFarmRes;
        !_0x55b29d ? (console.log("是否到了领取免费赠送的抽奖机会----" + (_0x317a25 > _0x437891 + 60 * 60 * _0x4a87a3 * 1000)), _0x317a25 > _0x437891 + 60 * 60 * _0x4a87a3 * 1000 ? (await _0x45ea60(), console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes)), await _0x34585a(), _0xc65fec = $.initForTurntableFarmRes.remainLotteryTimes) : console.log("免费赠送的抽奖机会未到时间")) : console.log("4小时候免费赠送的抽奖机会已领取");
        if ($.initForTurntableFarmRes.turntableBrowserAds && $.initForTurntableFarmRes.turntableBrowserAds.length > 0) for (let _0x3561ae = 0; _0x3561ae < $.initForTurntableFarmRes.turntableBrowserAds.length; _0x3561ae++) {
            if (!$.initForTurntableFarmRes.turntableBrowserAds[_0x3561ae].status) console.log("开始浏览天天抽奖的第" + (_0x3561ae + 1) + "个逛会场任务"), await _0x4fd3c4(1, $.initForTurntableFarmRes.turntableBrowserAds[_0x3561ae].adId), $.browserForTurntableFarmRes.code === "0" && $.browserForTurntableFarmRes.status && (console.log("第" + (_0x3561ae + 1) + "个逛会场任务完成，开始领取水滴奖励\n"), await _0x4fd3c4(2, $.initForTurntableFarmRes.turntableBrowserAds[_0x3561ae].adId), $.browserForTurntableFarmRes.code === "0" && (console.log("第" + (_0x3561ae + 1) + "个逛会场任务领取水滴奖励完成\n"), await _0x34585a(), _0xc65fec = $.initForTurntableFarmRes.remainLotteryTimes)); else {
                console.log("浏览天天抽奖的第" + (_0x3561ae + 1) + "个逛会场任务已完成");
            }
        }
        console.log("\n天天抽奖次数" + _0xc65fec + "次");

        if (_0xc65fec > 0) {
            console.log("开始抽奖");
            let _0x1cd0e7 = "";

            for (let _0x5b252f = 0; _0x5b252f < new Array(_0xc65fec).fill("").length; _0x5b252f++) {
                await _0x3b5d70();
                await $.wait(500);
                console.log("第" + (_0x5b252f + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));

                if ($.lotteryRes.code === "0") {
                    _0x45dfd6.map(_0xfb6a8e => {
                        if (_0xfb6a8e.type === $.lotteryRes.type) {
                            console.log("lotteryRes.type" + $.lotteryRes.type);
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") _0x1cd0e7 += _0xfb6a8e.name + "个，"; else {
                                if ($.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water") {
                                    _0x1cd0e7 += _0xfb6a8e.name + "，";
                                } else _0x1cd0e7 += _0xfb6a8e.name + "，";
                            }
                        }
                    });

                    if ($.lotteryRes.remainLotteryTimes === 0) break;
                }
            }

            _0x1cd0e7 && console.log("【天天抽奖】" + _0x1cd0e7.substr(0, _0x1cd0e7.length - 1) + "\n");
        } else console.log("天天抽奖--抽奖机会为0次");
    } else console.log("初始化天天抽奖得好礼失败");
}

async function _0x9f3d3() {
    await _0xc0653a();

    if ($.farmAssistResult.code === "0") {
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length >= 2) {
            if ($.farmAssistResult.status === 2) {
                let _0x5c949f = 0;

                for (let _0x18b981 of Object.keys($.farmAssistResult.assistStageList)) {
                    let _0x48604c = $.farmAssistResult.assistStageList[_0x18b981];
                    _0x48604c.stageStaus === 2 && (await _0x544443(), await $.wait(500), $.receiveStageEnergy.code === "0" && (console.log("成功领取第" + (Number(_0x18b981) + 1) + "段助力奖励：【" + $.receiveStageEnergy.amount + "】g水"), _0x5c949f += $.receiveStageEnergy.amount));
                }

                _0x563161 += "【额外奖励】" + _0x5c949f + "g水领取成功\n";
            } else $.farmAssistResult.status === 3 && (console.log("已经领取过8好友助力额外奖励"), _0x563161 += "【额外奖励】已被领取过\n");
        } else console.log("助力好友未达到2个"), _0x563161 += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length > 0) {
            let _0x5138ff = "";
            $.farmAssistResult.assistFriendList.map((_0x5495c3, _0x144c0c) => {
                _0x144c0c === $.farmAssistResult.assistFriendList.length - 1 ? _0x5138ff += _0x5495c3.nickName || "匿名用户" : _0x5138ff += (_0x5495c3.nickName || "匿名用户") + ",";

                let _0x73c7cb = new Date(_0x5495c3.time),
                    _0x13fb72 = _0x73c7cb.getFullYear() + "-" + (_0x73c7cb.getMonth() + 1) + "-" + _0x73c7cb.getDate() + " " + _0x73c7cb.getHours() + ":" + _0x73c7cb.getMinutes() + ":" + _0x73c7cb.getMinutes();

                console.log("【" + (_0x5495c3.nickName || "匿名用户") + "】 在 " + _0x13fb72 + " 给您助过力");
            });
            _0x563161 += "【助力您的好友】" + _0x5138ff + "\n";
        }

        console.log("领取额外奖励水滴结束\n");
    } else {
        await _0xf83370();

        if ($.masterHelpResult.code === "0") {
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
                if (!$.masterHelpResult.masterGotFinal) {
                    await _0x143727();

                    if ($.masterGotFinished.code === "0") {
                        console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g水");
                        _0x563161 += "【额外奖励】" + $.masterGotFinished.amount + "g水领取成功\n";
                    }
                } else console.log("已经领取过5好友助力额外奖励"), _0x563161 += "【额外奖励】已被领取过\n";
            } else console.log("助力好友未达到5个"), _0x563161 += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x5e8ab2 = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x409b71, _0x2d39be) => {
                    _0x2d39be === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x5e8ab2 += _0x409b71.nickName || "匿名用户" : _0x5e8ab2 += (_0x409b71.nickName || "匿名用户") + ",";

                    let _0x5e5065 = new Date(_0x409b71.time),
                        _0x12bec7 = _0x5e5065.getFullYear() + "-" + (_0x5e5065.getMonth() + 1) + "-" + _0x5e5065.getDate() + " " + _0x5e5065.getHours() + ":" + _0x5e5065.getMinutes() + ":" + _0x5e5065.getMinutes();

                    console.log("【" + (_0x409b71.nickName || "匿名用户") + "】 在 " + _0x12bec7 + " 给您助过力");
                });
                _0x563161 += "【助力您的好友】" + _0x5e8ab2 + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x415844() {
    console.log("开始助力好友");
    let _0x429672 = 0,
        _0x5b2725 = 3,
        _0x12fe92 = "";

    for (let _0x2ecaa2 of _0x399b0c) {
        console.log("去助力: " + _0x2ecaa2);
        if (!_0x2ecaa2) continue;

        if (_0x2ecaa2 === $.farmInfo.farmUserPro.shareCode) {
            console.log("不能为自己助力哦，跳过自己的shareCode\n");
            continue;
        }

        await _0x2ee770(_0x2ecaa2);
        await $.wait(1000);

        if ($.helpResult.code === "0") {
            if ($.helpResult.helpResult.code === "0") _0x429672 += $.helpResult.helpResult.salveHelpAddWater, console.log("【助力结果】: 助力成功"), console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴"), _0x12fe92 += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ","; else {
                if ($.helpResult.helpResult.code === "8") console.log("【助力结果】: 助力失败，今天助力次数已耗尽"); else {
                    if ($.helpResult.helpResult.code === "9") console.log("【助力结果】: 已经助力过TA了"); else $.helpResult.helpResult.code === "10" ? console.log("【助力结果】: 对方已满助力") : console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
                }
            }
            console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
            _0x5b2725 = $.helpResult.helpResult.remainTimes;

            if ($.helpResult.helpResult.remainTimes === 0) {
                console.log("您当前助力次数已耗尽，跳出助力");
                break;
            }
        } else {
            console.log("助力失败::" + JSON.stringify($.helpResult));
            break;
        }
    }

    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let _0x27fb56 = _0x4b294c() + $.farmInfo.farmUserPro.shareCode;

        !$.getdata(_0x27fb56) && ($.setdata("", _0x4b294c(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo.farmUserPro.shareCode), $.setdata("", _0x27fb56));
        _0x12fe92 && ($.getdata(_0x27fb56) ? $.setdata($.getdata(_0x27fb56) + "," + _0x12fe92, _0x27fb56) : $.setdata(_0x12fe92, _0x27fb56));
        _0x12fe92 = $.getdata(_0x27fb56);
    }

    _0x429672 > 0 && console.log("【助力好友👬】获得" + _0x429672 + "g💧\n");
    _0x563161 += "【今日剩余助力👬】" + _0x5b2725 + "次\n";
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0x7cdd5d() {
    let _0x2ee15c = !$.farmTask.waterRainInit.f;

    if (_0x2ee15c) {
        console.log("水滴雨任务，每天两次，最多可得10g水滴");
        console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));
        $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x2ee15c = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000).toLocaleTimeString() + "再试\n"));
        _0x2ee15c && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x52a493(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g水滴\n")));
    } else { }
}

async function _0x2b237c() {
    console.log("开始打卡领水活动（签到，关注，领券）");
    await _0x5051d6();

    if ($.clockInInit.code === "0") {
        !$.clockInInit.todaySigned && (console.log("开始今日签到"), await _0x1d77e8(), console.log("打卡结果" + JSON.stringify($.clockInForFarmRes)), $.clockInForFarmRes.code === "0" && (console.log("【第" + $.clockInForFarmRes.signDay + "天签到】获得" + $.clockInForFarmRes.amount + "g💧\n"), $.clockInForFarmRes.signDay === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await _0x59ff6e(), $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n"))));
        $.clockInInit.todaySigned && $.clockInInit.totalSigned === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await _0x59ff6e(), $.gotClockInGiftRes.code === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n"));

        if ($.clockInInit.themes && $.clockInInit.themes.length > 0) {
            for (let _0x3689d1 of $.clockInInit.themes) {
                !_0x3689d1.hadGot && (console.log("关注ID" + _0x3689d1.id), await _0x5f3142(_0x3689d1.id, "theme", "1"), console.log("themeStep1--结果" + JSON.stringify($.themeStep1)), $.themeStep1.code === "0" && (await _0x5f3142(_0x3689d1.id, "theme", "2"), console.log("themeStep2--结果" + JSON.stringify($.themeStep2)), $.themeStep2.code === "0" && console.log("关注" + _0x3689d1.name + "，获得水滴" + $.themeStep2.amount + "g")));
            }
        }

        if ($.clockInInit.venderCoupons && $.clockInInit.venderCoupons.length > 0) for (let _0x37b1b2 of $.clockInInit.venderCoupons) {
            !_0x37b1b2.hadGot && (console.log("领券的ID" + _0x37b1b2.id), await _0x5f3142(_0x37b1b2.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1.code === "0" && (await _0x5f3142(_0x37b1b2.id, "venderCoupon", "2"), $.venderCouponStep2.code === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + _0x37b1b2.name + "领券，获得水滴" + $.venderCouponStep2.amount + "g"))));
        }
    }

    console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}

async function _0x2b1a4c() {
    await _0xce2cc9();

    if ($.friendList) {
        console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个");
        console.log("开始删除" + ($.friendList.friends && $.friendList.friends.length) + "个好友,可拿每天的邀请奖励");
        if ($.friendList.friends && $.friendList.friends.length > 0) for (let _0x143c3c of $.friendList.friends) {
            console.log("开始删除好友 [" + _0x143c3c.shareCode + "]");

            const _0x320f79 = await _0x3216ff("deleteFriendForFarm", {
                "shareCode": "" + _0x143c3c.shareCode,
                "version": 24,
                "channel": 1,
                "babelChannel": "121"
            });

            _0x320f79 && _0x320f79.code === "0" && console.log("删除成功！\n");
        }
        await _0x17cbbc();
        $.friendList.inviteFriendCount > 0 ? $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await _0x4eff1b(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友");
    } else console.log("查询好友列表失败\n");
}

async function _0x19b578() {
    await _0xce2cc9();
    console.log("开始给好友浇水...");
    await _0x494b40();
    const {
        waterFriendCountKey: _0xd6ef4b,
        waterFriendMax: _0x4ca4fd
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0xd6ef4b + "个好友浇水");

    if (_0xd6ef4b < _0x4ca4fd) {
        let _0x216d29 = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x3ba75b, _0x6eac2b) => {
                _0x3ba75b.friendState === 1 && _0x216d29.length < _0x4ca4fd - _0xd6ef4b && _0x216d29.push(_0x3ba75b.shareCode);
            });
            console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(_0x216d29));
            let _0x459611 = 0,
                _0x224b5e = "";

            for (let _0x24f750 = 0; _0x24f750 < _0x216d29.length; _0x24f750++) {
                await _0x5bfe83(_0x216d29[_0x24f750]);
                console.log("为第" + (_0x24f750 + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x459611++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");
                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x224b5e += "水滴换豆卡,"; else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x224b5e += "快速浇水卡,"; else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x224b5e += "水滴翻倍卡,"; else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x224b5e += "加签卡,");
                            }
                        }
                    }
                } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
            }

            console.log("【好友浇水】已给" + _0x459611 + "个好友浇水,消耗" + _0x459611 * 10 + "g水\n");
            _0x224b5e && _0x224b5e.length > 0 && console.log("【好友浇水奖励】" + _0x224b5e.substr(0, _0x224b5e.length - 1) + "\n");
        } else console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
    } else console.log("今日已为好友浇水量已达" + _0x4ca4fd + "个");
}

async function _0x41c1c6() {
    await _0x494b40();
    const {
        waterFriendCountKey: _0x456673,
        waterFriendMax: _0x4faa51,
        waterFriendSendWater: _0x5d9137,
        waterFriendGotAward: _0x44adbb
    } = $.farmTask.waterFriendTaskInit;
    _0x456673 >= _0x4faa51 ? !_0x44adbb ? (await _0x4f1ee3(), console.log("领取给" + _0x4faa51 + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes)), $.waterFriendGotAwardRes.code === "0" && console.log("【给" + _0x4faa51 + "好友浇水】奖励" + $.waterFriendGotAwardRes.addWater + "g水滴\n")) : console.log("给好友浇水的" + _0x5d9137 + "g水滴奖励已领取\n") : console.log("暂未给" + _0x4faa51 + "个好友浇水\n");
}

async function _0x17cbbc() {
    for (let _0x2eb065 of _0x399b0c) {
        if (_0x2eb065 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0x1d00a3(_0x2eb065);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友"); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
}

async function _0x130f80() {
    for (let _0x592798 = 0; _0x592798 < 10; _0x592798++) {
        $.duckRes = await _0x3216ff("getFullCollectionReward", {
            "type": 2,
            "version": 24,
            "channel": 1,
            "babelChannel": "121"
        });

        if ($.duckRes.code === "0") {
            if (!$.duckRes.hasLimit) console.log("小鸭子游戏:" + $.duckRes.title); else {
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

async function _0x2eae46() {
    $.totalWaterReward = await _0x3216ff("totalWaterTaskForFarm");
}

async function _0x33d1ef() {
    $.firstWaterReward = await _0x3216ff("firstWaterTaskForFarm");
}

async function _0x4f1ee3() {
    $.waterFriendGotAwardRes = await _0x3216ff("waterFriendGotAwardForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x35de76() {
    $.myCardInfoRes = await _0x3216ff("myCardInfoForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x41865c(_0x30eb90) {
    $.userMyCardRes = await _0x3216ff("userMyCardForFarm", {
        "cardType": _0x30eb90
    });
}

async function _0x4d58c1(_0xa6e164) {
    $.gotStageAwardForFarmRes = await _0x3216ff("gotStageAwardForFarm", {
        "type": _0xa6e164
    });
}

async function _0x33773b() {
    await $.wait(1000);
    console.log("等待了1秒");
    $.waterResult = await _0x3216ff("waterGoodForFarm");
}

async function _0x34585a() {
    $.initForTurntableFarmRes = await _0x3216ff("initForTurntableFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x3b5d70() {
    await $.wait(2000);
    console.log("等待了2秒");
    $.lotteryRes = await _0x3216ff("lotteryForTurntableFarm", {
        "type": 1,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x45ea60() {
    $.timingAwardRes = await _0x3216ff("timingAwardForTurntableFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x4fd3c4(_0x13ec55, _0x45ab81) {
    _0x13ec55 === 1 && console.log("浏览爆品会场");
    _0x13ec55 === 2 && console.log("天天抽奖浏览任务领取水滴");
    const _0x52ace0 = {
        "type": _0x13ec55,
        "adId": _0x45ab81,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.browserForTurntableFarmRes = await _0x3216ff("browserForTurntableFarm", _0x52ace0);
}

async function _0x24f810(_0x7dcaca) {
    const _0x144352 = {
        "type": 2,
        "adId": _0x7dcaca,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.browserForTurntableFarm2Res = await _0x3216ff("browserForTurntableFarm", _0x144352);
}

async function _0x53ba9b() {
    $.lotteryMasterHelpRes = await _0x3216ff("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 24,
        "channel": 1
    });
}

async function _0x143727() {
    $.masterGotFinished = await _0x3216ff("masterGotFinishedTaskForFarm");
}

async function _0xf83370() {
    $.masterHelpResult = await _0x3216ff("masterHelpTaskInitForFarm");
}

async function _0xc0653a() {
    $.farmAssistResult = await _0x3216ff("farmAssistInit", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x544443() {
    $.receiveStageEnergy = await _0x3216ff("receiveStageEnergy", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x1d00a3() {
    $.inviteFriendRes = await _0x3216ff("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 4,
        "channel": 2
    });
}

async function _0x2ee770() {
    $.helpResult = await _0x3216ff("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0],
        "babelChannel": "3",
        "version": 2,
        "channel": 1
    });
}

async function _0x52a493() {
    const _0x28fc7b = {
        "type": 1,
        "hongBaoTimes": 100,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterRain = await _0x3216ff("waterRainForFarm", _0x28fc7b);
}

async function _0x5051d6() {
    $.clockInInit = await _0x3216ff("clockInInitForFarm");
}

async function _0x1d77e8() {
    $.clockInForFarmRes = await _0x3216ff("clockInForFarm", {
        "type": 1
    });
}

async function _0x5f3142(_0x21e2d4, _0x557eb4, _0x3912f2) {
    const _0x252057 = "clockInFollowForFarm";
    let _0x173dab = {
        "id": _0x21e2d4,
        "type": _0x557eb4,
        "step": _0x3912f2
    };

    if (_0x557eb4 === "theme") {
        if (_0x3912f2 === "1") {
            $.themeStep1 = await _0x3216ff(_0x252057, _0x173dab);
        } else _0x3912f2 === "2" && ($.themeStep2 = await _0x3216ff(_0x252057, _0x173dab));
    } else {
        if (_0x557eb4 === "venderCoupon") {
            if (_0x3912f2 === "1") $.venderCouponStep1 = await _0x3216ff(_0x252057, _0x173dab); else _0x3912f2 === "2" && ($.venderCouponStep2 = await _0x3216ff(_0x252057, _0x173dab));
        }
    }
}

async function _0x59ff6e() {
    $.gotClockInGiftRes = await _0x3216ff("gotClockInGift", {
        "type": 2
    });
}

async function _0x41e462() {
    $.threeMeal = await _0x3216ff("gotThreeMealForFarm");
}

async function _0x38c869(_0x47e58c, _0x1fc5d6) {
    if (_0x1fc5d6 === 0) $.browseResult = await _0x3216ff("browseAdTaskForFarm", {
        "advertId": _0x47e58c,
        "type": _0x1fc5d6
    }); else _0x1fc5d6 === 1 && ($.browseRwardResult = await _0x3216ff("browseAdTaskForFarm", {
        "advertId": _0x47e58c,
        "type": _0x1fc5d6
    }));
}

async function _0x507055() {
    $.goalResult = await _0x3216ff("gotWaterGoalTaskForFarm", {
        "type": 3
    });
}

async function _0x1ee2f0() {
    $.signResult = await _0x3216ff("signForFarm");
}

async function _0x403252() {
    await $.wait(1000);
    if (_0x988790 > "1") return;
    let _0xa9ff75 = {
        "babelChannel": "121",
        "sid": "",
        "un_area": "",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    },
        _0x334d0f = {
            "appId": "8a2af",
            "fn": "initForFarm",
            "body": _0xa9ff75,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    return _0xa9ff75 = await _0x9c13ae.getbody(_0x334d0f), new Promise(_0x185a41 => {
        const _0x59a229 = {
            "url": "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0xa9ff75,
            "headers": {
                "cookie": _0x4f424f,
                "origin": "https://carry.m.jd.com",
                "referer": "https://carry.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 30000
        };
        $.get(_0x59a229, async (_0x2515ac, _0x2d58b2, _0x360f1e) => {
            try {
                _0x2515ac ? (console.log("initForFarm: 请求失败 ‼️‼️"), console.log(JSON.stringify(_0x2515ac))) : _0x23f325(_0x360f1e) && ($.farmInfo = JSON.parse(_0x360f1e), $.farmInfo.code != 0 && (_0x988790++, await $.wait(1000), await _0x403252()), _0x988790 = 0);
            } catch (_0x2383f1) {
                $.logErr(_0x2383f1, _0x2d58b2);
            } finally {
                _0x185a41();
            }
        });
    });
}

async function _0x494b40() {
    console.log("\n初始化任务列表");
    $.farmTask = await _0x3216ff("taskInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0xce2cc9() {
    $.friendList = await _0x3216ff("friendListInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x4eff1b() {
    $.awardInviteFriendRes = await _0x3216ff("awardInviteFriendForFarm");
}

async function _0x5bfe83(_0x53f8e1) {
    const _0x545273 = {
        "shareCode": _0x53f8e1,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterFriendForFarmRes = await _0x3216ff("waterFriendForFarm", _0x545273);
}

async function _0x1154aa() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false"; else {
        if ($.getdata("jdFruitNotify")) $.ctrTemp = $.getdata("jdFruitNotify") === "false"; else {
            $.ctrTemp = "" + jdNotify === "false";
        }
    }
    $.ctrTemp ? ($.msg($.name, _0x327a26, _0x563161, _0x4380b6), $.isNode() && (_0x176590 += _0x327a26 + "\n" + _0x563161 + ($.index !== _0x55c140.length ? "\n\n" : ""))) : $.log("\n" + _0x563161 + "\n");
}

function _0x4b294c(_0x118681) {
    let _0x559031;

    return _0x118681 ? _0x559031 = new Date(_0x118681) : _0x559031 = new Date(), _0x559031.getFullYear() + "-" + (_0x559031.getMonth() + 1 >= 10 ? _0x559031.getMonth() + 1 : "0" + (_0x559031.getMonth() + 1)) + "-" + (_0x559031.getDate() >= 10 ? _0x559031.getDate() : "0" + _0x559031.getDate());
}

function _0x21b904() {
    return new Promise(_0x1ad3d5 => {
        console.log("开始获取配置文件\n");
        _0x908b14 = $.isNode() ? require("./sendNotify") : "";

        const _0x5d298d = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0x5d298d).forEach(_0x85b043 => {
                _0x5d298d[_0x85b043] && _0x55c140.push(_0x5d298d[_0x85b043]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else _0x55c140 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x319194($.getdata("CookiesJD") || "[]").map(_0x315634 => _0x315634.cookie)].filter(_0x39df41 => !!_0x39df41);

        _0x1ad3d5();
    });
}

async function _0x452f31() {
    await _0x3216ff("ddnc_getTreasureBoxAward", {
        "type": 1,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });
    await $.wait(500);
    await _0x49a0ee();
    await $.wait(2000);

    let _0x146bf6 = await _0x3216ff("ddnc_getTreasureBoxAward", {
        "type": 2,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "",
        "lng": ""
    });

    _0x146bf6.code == 0 && $.log("完成，获得" + _0x146bf6.waterGram + "g💧\n");
}

function _0x49a0ee() {
    return new Promise(_0x4580b6 => {
        const _0x49b64e = {
            "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            "headers": {
                "Cookie": _0x4f424f,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x49b64e, (_0x65f499, _0xbb1fc, _0x598a7b) => {
            _0x4580b6();
        });
    });
}

function _0x446e84() {
    return new Promise(_0x1f1357 => {
        const _0x35591f = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x4f424f,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x35591f, (_0x1c6b45, _0x4c6308, _0x305a77) => {
            try {
                if (_0x305a77) {
                    _0x305a77 = JSON.parse(_0x305a77);

                    if (_0x305a77.islogin === "1") { } else _0x305a77.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x17e99b) {
                console.log(_0x17e99b);
            } finally {
                _0x1f1357();
            }
        });
    });
}

async function _0x3216ff(_0x912810, _0x14b13d = {}, _0xb132c5 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x207a65 / 1000 + "秒......\n"), _0xb132c5 = _0x207a65);
    $.reqnum++;

    if (_0x5f4fc3[_0x912810]) {
        let _0x5063c1 = {
            "appId": _0x5f4fc3[_0x912810],
            "fn": _0x912810,
            "body": _0x14b13d,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x14b13d = await _0x9c13ae.getbody(_0x5063c1);
    } else _0x14b13d = "functionId=" + _0x912810 + "&body=" + encodeURIComponent(JSON.stringify(_0x14b13d)) + "&appid=wh5";

    return new Promise(_0x594ce6 => {
        setTimeout(() => {
            $.post(_0xae17e0(_0x14b13d), (_0x22cdf8, _0x101ab4, _0x5bfcaa) => {
                try {
                    _0x22cdf8 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x22cdf8)), console.log("function_id:" + _0x912810), $.logErr(_0x22cdf8)) : _0x23f325(_0x5bfcaa) && (_0x5bfcaa = JSON.parse(_0x5bfcaa));
                } catch (_0x1fb212) {
                    $.logErr(_0x1fb212, _0x101ab4);
                } finally {
                    _0x594ce6(_0x5bfcaa);
                }
            });
        }, _0xb132c5);
    });
}

function _0x23f325(_0xb27a86) {
    try {
        if (typeof JSON.parse(_0xb27a86) == "object") return true;
    } catch (_0x71b746) {
        return console.log(_0x71b746), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0xae17e0(_0x3a6d7b = {}) {
    return {
        "url": _0x1e2bc8 + "?" + _0x3a6d7b,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x4f424f
        },
        "timeout": 30000
    };
}

function _0x272747(_0x5edcd8, _0x24852b = {}) {
    return {
        "url": _0x1e2bc8 + "?" + _0x24852b,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x4f424f
        },
        "timeout": 10000
    };
}

function _0x319194(_0x21dee4) {
    if (typeof _0x21dee4 == "string") {
        try {
            return JSON.parse(_0x21dee4);
        } catch (_0x1d3963) {
            return console.log(_0x1d3963), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }