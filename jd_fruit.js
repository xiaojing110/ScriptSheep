/*
更新时间：2023-8-25
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd免费水果
15 3,13,18 * * * jd_fruit.js, tag=东东农场, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true

变量：
export NO_WATER='true' 完全不浇水，浇水任务不做了
export DO_TEN_WATER_AGAIN='true' 攒水滴只交10次水，默认不攒水滴
export FRUIT_FAST_CARD='true' 使用快速浇水卡，水多可开启
epxort FRUIT_DELAY = '1000',设置等待时间(毫秒)，默认请求5次接口等待10秒（10000）
*/
const $ = new Env('东东农场-任务');
let cookiesArr = [], cookie = '', jdFruitShareArr = [], isBox = false, notify, newShareCodes, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
let shareCodes = ['']
let message = '', subTitle = '', option = {}, isFruitFinished = false, ct = 0;
const retainWater = 100;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
const _0x102fcb = "https://api.m.jd.com/client.action";
const _0x4e823f = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";
const _0xc6a7f1 = process.env.FRUIT_DELAY || 10000;
const _0x1d87d4 = require("./USER_AGENTS");
const _0xf1c9de = require("fs");
const _0x4918e6 = require("./function/dylany");
let _0x172a70 = [];
$.reqnum = 1;
!(async () => {
    await _0x413617();
    if (!cookiesArr[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }
    if (process.env.DO_TEN_WATER_AGAIN == "true") {
        allMessage = "【攒水滴模式已开启，每天只浇水10次！】\n\n";
        $.log("【攒水滴模式已开启，每天只浇水10次！】\n\n");
    }
    if (process.env.NO_WATER == "true") {
        allMessage = "【一水不缴模式已开启！】\n\n";
        $.log("【一水不缴模式已开启！】\n\n");
    }
    for (let _0x1787f5 = 0; _0x1787f5 < cookiesArr.length; _0x1787f5++) {
        if (cookiesArr[_0x1787f5]) {
            cookie = cookiesArr[_0x1787f5];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x1787f5 + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x3defc4();
            console.log("开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    ["open-url"]: "https://bean.m.jd.com/bean/signIndex.action"
                });
                if ($.isNode()) {
                    await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }
                continue;
            }
            message = "";
            subTitle = "";
            option = {};
            $.UA = _0x1d87d4.UARAM ? _0x1d87d4.UARAM() : _0x1d87d4.USER_AGENT;
            await _0x2b39f1();
        }
    }
    _0xf1c9de.writeFile("./fruit_helpcode", JSON.stringify(_0x172a70), _0x2e51de => {
        if (_0x2e51de) {
            console.log(_0x2e51de);
        }
    });
    if ($.isNode() && allMessage && $.ctrTemp) {
        await notify.sendNotify("" + $.name, "" + allMessage);
    }
})().catch(_0x50c96a => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x50c96a + "!", "");
}).finally(() => {
    $.done();
});
async function _0x2b39f1() {
    subTitle = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);
    try {
        await _0x1b25df();
        if ($.farmInfo.farmUserPro) {
            message = "【水果名称】" + $.farmInfo.farmUserPro.name + "\n";
            console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.farmUserPro.shareCode + "\n");
            console.log("\n【已成功兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n");
            message += "【已兑换水果】" + $.farmInfo.farmUserPro.winTimes + "次\n";
            if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
                option["open-url"] = _0x4e823f;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
                if ($.isNode()) {
                    await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看");
                }
                return;
            } else if ($.farmInfo.treeState === 1) {
                console.log("\n" + $.farmInfo.farmUserPro.name + "种植中...\n");
            } else if ($.farmInfo.treeState === 0) {
                option["open-url"] = _0x4e823f;
                $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", option);
                if ($.isNode()) {
                    await notify.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果");
                }
                return;
            }
            _0x172a70.push($.farmInfo.farmUserPro.shareCode);
            await _0x1f870a();
            await _0x100ada();
            await _0x4bca50();
            await _0xc3ec0d();
            await _0x92dd58();
            await _0x1ed491();
            if (process.env.NO_WATER == "true") {
                $.log("\n已设置完全不浇水\n");
            } else if (!process.env.DO_TEN_WATER_AGAIN) {
                $.log("执行再次浇水");
                await _0xd5b6d4();
            } else {
                $.log("不执行再次浇水，攒水滴");
            }
            await $.wait(3000);
            await _0x17b49f();
        } else if (JSON.stringify($.farmInfo).includes("winTexts")) {
            console.log("初始化农场数据异常, 请确认此账号是否开通农场");
            message = "【数据异常】请确认此账号是否开通农场";
        } else {
            console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo));
            message = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常";
        }
    } catch (_0x3af82a) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️");
        $.logErr(_0x3af82a);
        const _0x7e535f = "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n任务执行异常，请检查执行日志 ‼️‼️";
    }
    await _0x2336e9();
}
async function _0x1f870a() {
    await _0xd7cb27();
    console.log("被水滴砸中： " + ($.farmInfo.todayGotWaterGoalTask.canPop ? "是" : "否"));
    if ($.farmInfo.todayGotWaterGoalTask.canPop) {
        await _0x40a537();
        if ($.goalResult.code === "0") {
            console.log("【被水滴砸中】获得" + $.goalResult.addEnergy + "g💧\\n");
        }
    }
    console.log("签到结束,开始浏览任务");
    if (1) {
        let _0x4642fc = $.farmTask.gotBrowseTaskAdInit.userBrowseTaskAds;
        let _0x8db5dc = 0;
        let _0x20b021 = 0;
        let _0x279fcf = 0;
        for (let _0x540513 of _0x4642fc) {
            if (_0x540513.limit <= _0x540513.hadFinishedTimes) {
                console.log(_0x540513.mainTitle + "+ ' 已完成");
                continue;
            }
            console.log("正在进行广告浏览任务: " + _0x540513.mainTitle);
            await _0x41070d(_0x540513.advertId, 0);
            if ($.browseResult.code === "0") {
                console.log(_0x540513.mainTitle + "浏览任务完成");
                await _0x41070d(_0x540513.advertId, 1);
                if ($.browseRwardResult.code === "0") {
                    console.log("领取浏览" + _0x540513.mainTitle + "广告奖励成功,获得" + $.browseRwardResult.amount + "g");
                    _0x8db5dc += $.browseRwardResult.amount;
                    _0x20b021++;
                } else {
                    _0x279fcf++;
                    console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult));
                }
            } else {
                _0x279fcf++;
                console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult));
            }
        }
        if (_0x279fcf > 0) {
            console.log("【广告浏览】完成" + _0x20b021 + "个,失败" + _0x279fcf + ",获得" + _0x8db5dc + "g💧\\n");
        } else {
            console.log("【广告浏览】完成" + _0x20b021 + "个,获得" + _0x8db5dc + "g💧\n");
        }
    } else {
        console.log("今天已经做过浏览广告任务\n");
    }
    if (!$.farmTask.gotThreeMealInit.f) {
        await _0x34178f();
        if ($.threeMeal.code === "0") {
            console.log("【定时领水】获得" + $.threeMeal.amount + "g💧\n");
        } else {
            console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal));
        }
    } else {
        console.log("当前不在定时领水时间断或者已经领过\n");
    }
    if (!$.farmTask.waterFriendTaskInit.f) {
        if ($.farmTask.waterFriendTaskInit.waterFriendCountKey < $.farmTask.waterFriendTaskInit.waterFriendMax) {
            await _0x4141fa();
        }
    } else {
        console.log("给" + $.farmTask.waterFriendTaskInit.waterFriendMax + "个好友浇水任务已完成\n");
    }
    if ($.farmTask["treasureBoxInit-getBean"] && !$.farmTask["treasureBoxInit-getBean"].f) {
        console.log("" + $.farmTask["treasureBoxInit-getBean"].taskMainTitle);
        await _0x41e321();
    } else {
        console.log("逛领京豆任务已完成\n");
    }
    await _0x28e600();
    await _0x13d939();
    await _0x3e1224();
    await _0x522ea4();
}
async function _0x17b49f() {
    console.log("开始预测水果成熟时间\n");
    await _0x1b25df();
    await _0xd7cb27();
    let _0x3a8249 = $.farmTask.firstWaterInit.totalWaterTimes;
    message += "【今日共浇水】" + _0x3a8249 + "次\n";
    message += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    message += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        message += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else if ($.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        message += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n";
    }
    let _0x384cfc = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;
    let _0x4544a8 = Math.ceil(_0x384cfc / _0x3a8249);
    message += "【预测】" + (_0x4544a8 === 1 ? "明天" : _0x4544a8 === 2 ? "后天" : _0x4544a8 + "天之后") + "(" + _0x3a39e0(_0x4544a8 * 86400000 + Date.now()) + "日)可兑换水果🍉\n";
}
async function _0x100ada() {
    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    if ($.isNode() && process.env.FRUIT_BEAN_CARD) {
        jdFruitBeanCard = process.env.FRUIT_BEAN_CARD;
    }
    await _0x45589e();
    const {
        fastCard: _0x162bdf,
        doubleCard: _0x5304ad,
        beanCard: _0xd300f2,
        signCard: _0x2eb10b
    } = $.myCardInfoRes;
    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && _0xd300f2 > 0) {
        console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + _0xd300f2 + "张, 跳过10次浇水任务");
        return;
    }
    if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log("\n准备浇水十次");
        let _0x5d08d6 = 0;
        isFruitFinished = false;
        for (; _0x5d08d6 < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit - $.farmTask.totalWaterTaskInit.totalWaterTaskTimes; _0x5d08d6++) {
            console.log("第" + (_0x5d08d6 + 1) + "次浇水");
            await _0xa5d534();
            console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
            if ($.waterResult.code === "0") {
                console.log("剩余水滴" + $.waterResult.totalEnergy + "g");
                if ($.waterResult.finished) {
                    isFruitFinished = true;
                    break;
                } else {
                    if ($.waterResult.totalEnergy < 10) {
                        console.log("水滴不够，结束浇水");
                        break;
                    }
                    await _0x4684db();
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }
        if (isFruitFinished) {
            option["open-url"] = _0x4e823f;
            $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
            $.done();
            if ($.isNode()) {
                await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取");
            }
        }
    } else {
        console.log("\n今日已完成10次浇水任务\n");
    }
}
async function _0x4bca50() {
    await _0xd7cb27();
    if (!$.farmTask.firstWaterInit.f && $.farmTask.firstWaterInit.totalWaterTimes > 0) {
        await _0x5a8c72();
        if ($.firstWaterReward.code === "0") {
            console.log("【首次浇水奖励】获得" + $.firstWaterReward.amount + "g💧\n");
        } else {
            console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward));
        }
    } else {
        console.log("首次浇水奖励已领取\n");
    }
}
async function _0xc3ec0d() {
    if (!$.farmTask.totalWaterTaskInit.f && $.farmTask.totalWaterTaskInit.totalWaterTaskTimes >= $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        await _0x31a055();
        if ($.totalWaterReward.code === "0") {
            console.log("【十次浇水奖励】获得" + $.totalWaterReward.totalWaterTaskEnergy + "g💧\n");
        } else {
            console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));
        }
    } else if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask.totalWaterTaskInit.totalWaterTaskTimes + "次\n");
    }
    console.log("finished 水果任务完成!");
}
async function _0xd5b6d4() {
    console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
    await _0x1b25df();
    let _0xa6a00d = $.farmInfo.farmUserPro.totalEnergy;
    console.log("剩余水滴" + _0xa6a00d + "g\n");
    await _0x45589e();
    const {
        fastCard: _0x535826,
        doubleCard: _0x41e945,
        beanCard: _0x24279e,
        signCard: _0xc1a172
    } = $.myCardInfoRes;
    console.log("背包已有道具:\n快速浇水卡:" + (_0x535826 === -1 ? "未解锁" : _0x535826 + "张") + "\n水滴翻倍卡:" + (_0x41e945 === -1 ? "未解锁" : _0x41e945 + "张") + "\n水滴换京豆卡:" + (_0x24279e === -1 ? "未解锁" : _0x24279e + "张") + "\n加签卡:" + (_0xc1a172 === -1 ? "未解锁" : _0xc1a172 + "张") + "\n");
    if (_0xa6a00d >= 100 && _0x41e945 > 0) {
        for (let _0x305960 = 0; _0x305960 < new Array(_0x41e945).fill("").length; _0x305960++) {
            await _0x3df52a("doubleCard");
            console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
        }
        await _0x1b25df();
        _0xa6a00d = $.farmInfo.farmUserPro.totalEnergy;
    }
    if (_0xc1a172 > 0) {
        for (let _0x4259e3 = 0; _0x4259e3 < 3; _0x4259e3++) {
            await _0x3df52a("signCard");
            console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
        }
        await _0x1b25df();
        _0xa6a00d = $.farmInfo.farmUserPro.totalEnergy;
    }
    jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
    if ($.isNode() && process.env.FRUIT_BEAN_CARD) {
        jdFruitBeanCard = process.env.FRUIT_BEAN_CARD;
    }
    if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
        console.log("\n您设置的是水滴换豆功能,现在为您换豆");
        if (_0xa6a00d >= 100 && $.myCardInfoRes.beanCard > 0) {
            await _0x3df52a("beanCard");
            console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));
            if ($.userMyCardRes.code === "0") {
                message += "【水滴换豆卡】获得" + $.userMyCardRes.beanCount + "个京豆\n";
                return;
            }
        } else {
            console.log("您目前水滴:" + _0xa6a00d + "g,水滴换豆卡" + $.myCardInfoRes.beanCard + "张,暂不满足水滴换豆的条件,为您继续浇水");
        }
    }
    if (process.env.FRUIT_FAST_CARD && _0xa6a00d > 100 && $.myCardInfoRes.fastCard > 0) {
        for (let _0x19fcec = 0; _0x19fcec < new Array(_0x535826).fill("").length; _0x19fcec++) {
            await _0x3df52a("fastCard");
            console.log("使用快速浇水卡结果:" + JSON.stringify($.userMyCardRes));
            if ($.userMyCardRes.code === "0") {
                console.log("已使用快速浇水卡浇水" + $.userMyCardRes.waterEnergy + "g");
            }
            if ($.userMyCardRes.treeFinished) {
                break;
            }
            await $.wait(1000);
            await _0x1b25df();
            _0xa6a00d = $.farmInfo.farmUserPro.totalEnergy;
            if (_0xa6a00d < 100) {
                break;
            }
        }
    }
    let _0x4ec9db = _0xa6a00d - retainWater;
    if (_0xa6a00d >= $.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) {
        isFruitFinished = false;
        for (let _0x15b729 = 0; _0x15b729 < ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10; _0x15b729++) {
            await _0xa5d534();
            await $.wait(500);
            console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));
            if ($.waterResult.code === "0") {
                console.log("\n浇水10g成功\n");
                if ($.waterResult.finished) {
                    isFruitFinished = true;
                    break;
                } else {
                    console.log("目前水滴【" + $.waterResult.totalEnergy + "】g,继续浇水，水果马上就可以兑换了");
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }
        if (isFruitFinished) {
            option["open-url"] = _0x4e823f;
            $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
            $.done();
            if ($.isNode()) {
                await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取");
            }
        }
    } else if (_0x4ec9db >= 10) {
        console.log("目前剩余水滴：【" + _0xa6a00d + "】g，可继续浇水");
        isFruitFinished = false;
        for (let _0x2c1142 = 0; _0x2c1142 < parseInt(_0x4ec9db / 10); _0x2c1142++) {
            await _0xa5d534();
            console.log("本次浇水结果:   " + JSON.stringify($.waterResult));
            if ($.waterResult.code === "0") {
                console.log("\n浇水10g成功,剩余" + $.waterResult.totalEnergy + "\n");
                if ($.waterResult.finished) {
                    isFruitFinished = true;
                    break;
                } else {
                    await _0x4684db();
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }
        if (isFruitFinished) {
            option["open-url"] = _0x4e823f;
            $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);
            $.done();
            if ($.isNode()) {
                await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo.farmUserPro.name + "已可领取");
            }
        }
    } else {
        console.log("目前剩余水滴：【" + _0xa6a00d + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
    }
}
function _0x4684db() {
    return new Promise(async _0x3b0abf => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g水滴");
            await _0x1b44e3("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "\n");
            }
        } else if ($.waterResult.waterStatus === 1) {
            console.log("果树开花了,奖励40g水滴");
            await _0x1b44e3("2");
            console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            }
        } else if ($.waterResult.waterStatus === 2) {
            console.log("果树长出小果子啦, 奖励50g水滴");
            await _0x1b44e3("3");
            console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            if ($.gotStageAwardForFarmRes.code === "0") {
                console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            }
        }
        _0x3b0abf();
    });
}
async function _0x522ea4() {
    await _0x2275fe();
    if ($.initForTurntableFarmRes.code === "0") {
        let {
            timingIntervalHours: _0x3b764f,
            timingLastSysTime: _0x32325e,
            sysTime: _0x3d0426,
            timingGotStatus: _0x187e58,
            remainLotteryTimes: _0x184ffb,
            turntableInfos: _0x414f9e
        } = $.initForTurntableFarmRes;
        if (!_0x187e58) {
            console.log("是否到了领取免费赠送的抽奖机会----" + (_0x3d0426 > _0x32325e + _0x3b764f * 3600 * 1000));
            if (_0x3d0426 > _0x32325e + _0x3b764f * 3600 * 1000) {
                await _0x528890();
                console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes));
                await _0x2275fe();
                _0x184ffb = $.initForTurntableFarmRes.remainLotteryTimes;
            } else {
                console.log("免费赠送的抽奖机会未到时间");
            }
        } else {
            console.log("4小时候免费赠送的抽奖机会已领取");
        }
        if ($.initForTurntableFarmRes.turntableBrowserAds && $.initForTurntableFarmRes.turntableBrowserAds.length > 0) {
            for (let _0x1cf210 = 0; _0x1cf210 < $.initForTurntableFarmRes.turntableBrowserAds.length; _0x1cf210++) {
                if (!$.initForTurntableFarmRes.turntableBrowserAds[_0x1cf210].status) {
                    console.log("开始浏览天天抽奖的第" + (_0x1cf210 + 1) + "个逛会场任务");
                    await _0x125300(1, $.initForTurntableFarmRes.turntableBrowserAds[_0x1cf210].adId);
                    if ($.browserForTurntableFarmRes.code === "0" && $.browserForTurntableFarmRes.status) {
                        console.log("第" + (_0x1cf210 + 1) + "个逛会场任务完成，开始领取水滴奖励\n");
                        await _0x125300(2, $.initForTurntableFarmRes.turntableBrowserAds[_0x1cf210].adId);
                        if ($.browserForTurntableFarmRes.code === "0") {
                            console.log("第" + (_0x1cf210 + 1) + "个逛会场任务领取水滴奖励完成\n");
                            await _0x2275fe();
                            _0x184ffb = $.initForTurntableFarmRes.remainLotteryTimes;
                        }
                    }
                } else {
                    console.log("浏览天天抽奖的第" + (_0x1cf210 + 1) + "个逛会场任务已完成");
                }
            }
        }
        console.log("---天天抽奖次数remainLotteryTimes----" + _0x184ffb + "次");
        if (_0x184ffb > 0) {
            console.log("开始抽奖");
            let _0x1e9998 = "";
            for (let _0x4f5293 = 0; _0x4f5293 < new Array(_0x184ffb).fill("").length; _0x4f5293++) {
                await _0x1d828f();
                await $.wait(500);
                console.log("第" + (_0x4f5293 + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));
                if ($.lotteryRes.code === "0") {
                    _0x414f9e.map(_0x414f37 => {
                        if (_0x414f37.type === $.lotteryRes.type) {
                            console.log("lotteryRes.type" + $.lotteryRes.type);
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") {
                                _0x1e9998 += _0x414f37.name + "个，";
                            } else if ($.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water") {
                                _0x1e9998 += _0x414f37.name + "，";
                            } else {
                                _0x1e9998 += _0x414f37.name + "，";
                            }
                        }
                    });
                    if ($.lotteryRes.remainLotteryTimes === 0) {
                        break;
                    }
                }
            }
            if (_0x1e9998) {
                console.log("【天天抽奖】" + _0x1e9998.substr(0, _0x1e9998.length - 1) + "\n");
            }
        } else {
            console.log("天天抽奖--抽奖机会为0次");
        }
    } else {
        console.log("初始化天天抽奖得好礼失败");
    }
}
async function _0x3e1224() {
    await _0x3c2c98();
    if ($.farmAssistResult.code === "0") {
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length >= 2) {
            if ($.farmAssistResult.status === 2) {
                let _0x1fde80 = 0;
                for (let _0x185e43 of Object.keys($.farmAssistResult.assistStageList)) {
                    let _0x570a80 = $.farmAssistResult.assistStageList[_0x185e43];
                    if (_0x570a80.stageStaus === 2) {
                        await _0x2d6115();
                        await $.wait(500);
                        if ($.receiveStageEnergy.code === "0") {
                            console.log("成功领取第" + (Number(_0x185e43) + 1) + "段助力奖励：【" + $.receiveStageEnergy.amount + "】g水");
                            _0x1fde80 += $.receiveStageEnergy.amount;
                        }
                    }
                }
                message += "【额外奖励】" + _0x1fde80 + "g水领取成功\n";
            } else if ($.farmAssistResult.status === 3) {
                console.log("已经领取过8好友助力额外奖励");
                message += "【额外奖励】已被领取过\n";
            }
        } else {
            console.log("助力好友未达到2个");
            message += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
        }
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length > 0) {
            let _0xea6cf9 = "";
            $.farmAssistResult.assistFriendList.map((_0x274bb9, _0x18fe9f) => {
                if (_0x18fe9f === $.farmAssistResult.assistFriendList.length - 1) {
                    _0xea6cf9 += _0x274bb9.nickName || "匿名用户";
                } else {
                    _0xea6cf9 += (_0x274bb9.nickName || "匿名用户") + ",";
                }
                let _0x422b5f = new Date(_0x274bb9.time);
                let _0x100bda = _0x422b5f.getFullYear() + "-" + (_0x422b5f.getMonth() + 1) + "-" + _0x422b5f.getDate() + " " + _0x422b5f.getHours() + ":" + _0x422b5f.getMinutes() + ":" + _0x422b5f.getMinutes();
                console.log("【" + (_0x274bb9.nickName || "匿名用户") + "】 在 " + _0x100bda + " 给您助过力");
            });
            message += "【助力您的好友】" + _0xea6cf9 + "\n";
        }
        console.log("领取额外奖励水滴结束\n");
    } else {
        await _0x3e759f();
        if ($.masterHelpResult.code === "0") {
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
                if (!$.masterHelpResult.masterGotFinal) {
                    await _0x5d8d7c();
                    if ($.masterGotFinished.code === "0") {
                        console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g水");
                        message += "【额外奖励】" + $.masterGotFinished.amount + "g水领取成功\n";
                    }
                } else {
                    console.log("已经领取过5好友助力额外奖励");
                    message += "【额外奖励】已被领取过\n";
                }
            } else {
                console.log("助力好友未达到5个");
                message += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";
            }
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x8381cc = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x4f6e1e, _0x538919) => {
                    if (_0x538919 === $.masterHelpResult.masterHelpPeoples.length - 1) {
                        _0x8381cc += _0x4f6e1e.nickName || "匿名用户";
                    } else {
                        _0x8381cc += (_0x4f6e1e.nickName || "匿名用户") + ",";
                    }
                    let _0x564103 = new Date(_0x4f6e1e.time);
                    let _0x43b976 = _0x564103.getFullYear() + "-" + (_0x564103.getMonth() + 1) + "-" + _0x564103.getDate() + " " + _0x564103.getHours() + ":" + _0x564103.getMinutes() + ":" + _0x564103.getMinutes();
                    console.log("【" + (_0x4f6e1e.nickName || "匿名用户") + "】 在 " + _0x43b976 + " 给您助过力");
                });
                message += "【助力您的好友】" + _0x8381cc + "\n";
            }
            console.log("领取额外奖励水滴结束\n");
        }
    }
}
async function _0x32527c() {
    console.log("开始助力好友");
    let _0xb2404a = 0;
    let _0x4d4735 = 3;
    let _0x3dc4ab = "";
    for (let _0x591c28 of newShareCodes) {
        console.log("去助力: " + _0x591c28);
        if (!_0x591c28) {
            continue;
        }
        if (_0x591c28 === $.farmInfo.farmUserPro.shareCode) {
            console.log("不能为自己助力哦，跳过自己的shareCode\n");
            continue;
        }
        await _0x4c1d61(_0x591c28);
        await $.wait(1000);
        if ($.helpResult.code === "0") {
            if ($.helpResult.helpResult.code === "0") {
                _0xb2404a += $.helpResult.helpResult.salveHelpAddWater;
                console.log("【助力结果】: 助力成功");
                console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴");
                _0x3dc4ab += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ",";
            } else if ($.helpResult.helpResult.code === "8") {
                console.log("【助力结果】: 助力失败，今天助力次数已耗尽");
            } else if ($.helpResult.helpResult.code === "9") {
                console.log("【助力结果】: 已经助力过TA了");
            } else if ($.helpResult.helpResult.code === "10") {
                console.log("【助力结果】: 对方已满助力");
            } else {
                console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
            }
            console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
            _0x4d4735 = $.helpResult.helpResult.remainTimes;
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
        let _0x956446 = _0x3a39e0() + $.farmInfo.farmUserPro.shareCode;
        if (!$.getdata(_0x956446)) {
            $.setdata("", _0x3a39e0(Date.now() - 86400000) + $.farmInfo.farmUserPro.shareCode);
            $.setdata("", _0x956446);
        }
        if (_0x3dc4ab) {
            if ($.getdata(_0x956446)) {
                $.setdata($.getdata(_0x956446) + "," + _0x3dc4ab, _0x956446);
            } else {
                $.setdata(_0x3dc4ab, _0x956446);
            }
        }
        _0x3dc4ab = $.getdata(_0x956446);
    }
    if (_0xb2404a > 0) {
        console.log("【助力好友👬】获得" + _0xb2404a + "g💧\n");
    }
    message += "【今日剩余助力👬】" + _0x4d4735 + "次\n";
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}
async function _0x13d939() {
    let _0x945111 = !$.farmTask.waterRainInit.f;
    if (_0x945111) {
        console.log("水滴雨任务，每天两次，最多可得10g水滴");
        console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));
        if ($.farmTask.waterRainInit.lastTime) {
            if (Date.now() < $.farmTask.waterRainInit.lastTime + 10800000) {
                _0x945111 = false;
                console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask.waterRainInit.lastTime + 10800000).toLocaleTimeString() + "再试\n");
            }
        }
        if (_0x945111) {
            console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次");
            await _0x3e095f();
            console.log("水滴雨waterRain");
            if ($.waterRain.code === "0") {
                console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g");
                console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g水滴\n");
            }
        }
    } else { }
}
async function _0x28e600() {
    console.log("开始打卡领水活动（签到，关注，领券）");
    await _0x1deeb9();
    if ($.clockInInit.code === "0") {
        if (!$.clockInInit.todaySigned) {
            console.log("开始今日签到");
            await _0x1af015();
            console.log("打卡结果" + JSON.stringify($.clockInForFarmRes));
            if ($.clockInForFarmRes.code === "0") {
                console.log("【第" + $.clockInForFarmRes.signDay + "天签到】获得" + $.clockInForFarmRes.amount + "g💧\n");
                if ($.clockInForFarmRes.signDay === 7) {
                    console.log("开始领取--惊喜礼包38g水滴");
                    await _0x5d72a5();
                    if ($.gotClockInGiftRes.code === "0") {
                        console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n");
                    }
                }
            }
        }
        if ($.clockInInit.todaySigned && $.clockInInit.totalSigned === 7) {
            console.log("开始领取--惊喜礼包38g水滴");
            await _0x5d72a5();
            if ($.gotClockInGiftRes.code === "0") {
                console.log("【惊喜礼包】获得" + $.gotClockInGiftRes.amount + "g💧\n");
            }
        }
        if ($.clockInInit.themes && $.clockInInit.themes.length > 0) {
            for (let _0x2f0e1a of $.clockInInit.themes) {
                if (!_0x2f0e1a.hadGot) {
                    console.log("关注ID" + _0x2f0e1a.id);
                    await _0x2b7442(_0x2f0e1a.id, "theme", "1");
                    console.log("themeStep1--结果" + JSON.stringify($.themeStep1));
                    if ($.themeStep1.code === "0") {
                        await _0x2b7442(_0x2f0e1a.id, "theme", "2");
                        console.log("themeStep2--结果" + JSON.stringify($.themeStep2));
                        if ($.themeStep2.code === "0") {
                            console.log("关注" + _0x2f0e1a.name + "，获得水滴" + $.themeStep2.amount + "g");
                        }
                    }
                }
            }
        }
        if ($.clockInInit.venderCoupons && $.clockInInit.venderCoupons.length > 0) {
            for (let _0x415558 of $.clockInInit.venderCoupons) {
                if (!_0x415558.hadGot) {
                    console.log("领券的ID" + _0x415558.id);
                    await _0x2b7442(_0x415558.id, "venderCoupon", "1");
                    console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1));
                    if ($.venderCouponStep1.code === "0") {
                        await _0x2b7442(_0x415558.id, "venderCoupon", "2");
                        if ($.venderCouponStep2.code === "0") {
                            console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2));
                            console.log("从" + _0x415558.name + "领券，获得水滴" + $.venderCouponStep2.amount + "g");
                        }
                    }
                }
            }
        }
    }
    console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}
async function _0x1e3a86() {
    await _0x1e201e();
    if ($.friendList) {
        console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个");
        console.log("开始删除" + ($.friendList.friends && $.friendList.friends.length) + "个好友,可拿每天的邀请奖励");
        if ($.friendList.friends && $.friendList.friends.length > 0) {
            for (let _0x25c49e of $.friendList.friends) {
                console.log("开始删除好友 [" + _0x25c49e.shareCode + "]");
                const _0x3043ee = {
                    shareCode: "" + _0x25c49e.shareCode,
                    version: 8,
                    channel: 1
                };
                const _0x276d70 = await _0x57bb0b("deleteFriendForFarm", _0x3043ee);
                if (_0x276d70 && _0x276d70.code === "0") {
                    console.log("删除成功！\n");
                }
            }
        }
        await _0x10a488();
        if ($.friendList.inviteFriendCount > 0) {
            if ($.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount) {
                console.log("开始领取邀请好友的奖励");
                await _0x36e7ce();
                console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes));
            }
        } else {
            console.log("今日未邀请过好友");
        }
    } else {
        console.log("查询好友列表失败\n");
    }
}
async function _0x4141fa() {
    await _0x1e201e();
    console.log("开始给好友浇水...");
    await _0xd7cb27();
    const {
        waterFriendCountKey: _0x524081,
        waterFriendMax: _0x49dbd0
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0x524081 + "个好友浇水");
    if (_0x524081 < _0x49dbd0) {
        let _0x10eba0 = [];
        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x32cb48, _0x545e89) => {
                if (_0x32cb48.friendState === 1) {
                    if (_0x10eba0.length < _0x49dbd0 - _0x524081) {
                        _0x10eba0.push(_0x32cb48.shareCode);
                    }
                }
            });
            console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(_0x10eba0));
            let _0x5006a1 = 0;
            let _0x171a7e = "";
            for (let _0x13efb5 = 0; _0x13efb5 < _0x10eba0.length; _0x13efb5++) {
                await _0x5ee0a6(_0x10eba0[_0x13efb5]);
                console.log("为第" + (_0x13efb5 + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");
                if ($.waterFriendForFarmRes.code === "0") {
                    _0x5006a1++;
                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");
                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x171a7e += "水滴换豆卡,";
                        } else if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x171a7e += "快速浇水卡,";
                        } else if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x171a7e += "水滴翻倍卡,";
                        } else if ($.waterFriendForFarmRes.cardInfo.type === "signCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x171a7e += "加签卡,";
                        }
                    }
                } else if ($.waterFriendForFarmRes.code === "11") {
                    console.log("水滴不够,跳出浇水");
                }
            }
            console.log("【好友浇水】已给" + _0x5006a1 + "个好友浇水,消耗" + _0x5006a1 * 10 + "g水\n");
            if (_0x171a7e && _0x171a7e.length > 0) {
                console.log("【好友浇水奖励】" + _0x171a7e.substr(0, _0x171a7e.length - 1) + "\n");
            }
        } else {
            console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
        }
    } else {
        console.log("今日已为好友浇水量已达" + _0x49dbd0 + "个");
    }
}
async function _0x92dd58() {
    await _0xd7cb27();
    const {
        waterFriendCountKey: _0x1fa80f,
        waterFriendMax: _0x4799df,
        waterFriendSendWater: _0x153e9e,
        waterFriendGotAward: _0x174959
    } = $.farmTask.waterFriendTaskInit;
    if (_0x1fa80f >= _0x4799df) {
        if (!_0x174959) {
            await _0x5946c5();
            console.log("领取给" + _0x4799df + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes));
            if ($.waterFriendGotAwardRes.code === "0") {
                console.log("【给" + _0x4799df + "好友浇水】奖励" + $.waterFriendGotAwardRes.addWater + "g水滴\n");
            }
        } else {
            console.log("给好友浇水的" + _0x153e9e + "g水滴奖励已领取\n");
        }
    } else {
        console.log("暂未给" + _0x4799df + "个好友浇水\n");
    }
}
async function _0x10a488() {
    for (let _0x25038a of newShareCodes) {
        if (_0x25038a === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }
        await _0x148e50(_0x25038a);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
            console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
        } else if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17") {
            console.log("接收邀请成为好友结果失败,对方已是您的好友");
        }
    }
}
async function _0x1ed491() {
    for (let _0x2ad09a = 0; _0x2ad09a < 10; _0x2ad09a++) {
        await _0x4c4fdc();
        if ($.duckRes.code === "0") {
            if (!$.duckRes.hasLimit) {
                console.log("小鸭子游戏:" + $.duckRes.title);
            } else {
                console.log("" + $.duckRes.title);
                break;
            }
        } else if ($.duckRes.code === "10") {
            console.log("小鸭子游戏达到上限");
            break;
        }
    }
}
async function _0x4c4fdc() {
    return new Promise(_0x1993f5 => {
        const _0x55eccb = {
            type: 2,
            version: 6,
            channel: 2
        };
        $.post(_0x1f1fc3("getFullCollectionReward", _0x55eccb), (_0x535b74, _0x576180, _0x19365c) => {
            try {
                if (_0x535b74) {
                    console.log("\n东东农场: API查询请求失败 ‼️‼️");
                    console.log(JSON.stringify(_0x535b74));
                    $.logErr(_0x535b74);
                } else if (_0x129ab1(_0x19365c)) {
                    $.duckRes = JSON.parse(_0x19365c);
                }
            } catch (_0x490500) {
                $.logErr(_0x490500, _0x576180);
            } finally {
                _0x1993f5();
            }
        });
    });
}
async function _0x31a055() {
    const _0x491c3a = arguments.callee.name.toString();
    $.totalWaterReward = await _0x57bb0b("totalWaterTaskForFarm");
}
async function _0x5a8c72() {
    const _0x145590 = arguments.callee.name.toString();
    $.firstWaterReward = await _0x57bb0b("firstWaterTaskForFarm");
}
async function _0x5946c5() {
    const _0x1cb42e = arguments.callee.name.toString();
    $.waterFriendGotAwardRes = await _0x57bb0b("waterFriendGotAwardForFarm", {
        version: 4,
        channel: 1
    });
}
async function _0x45589e() {
    const _0xc10276 = arguments.callee.name.toString();
    $.myCardInfoRes = await _0x57bb0b("myCardInfoForFarm", {
        version: 5,
        channel: 1
    });
}
async function _0x3df52a(_0x167aee) {
    const _0x331944 = arguments.callee.name.toString();
    const _0x50ecd2 = {
        cardType: _0x167aee
    };
    $.userMyCardRes = await _0x57bb0b("userMyCardForFarm", _0x50ecd2);
}
async function _0x1b44e3(_0x583576) {
    const _0xf84b30 = {
        type: _0x583576
    };
    $.gotStageAwardForFarmRes = await _0x57bb0b("gotStageAwardForFarm", _0xf84b30);
}
async function _0xa5d534() {
    await $.wait(1000);
    console.log("等待了1秒");
    const _0x47263c = arguments.callee.name.toString();
    $.waterResult = await _0x57bb0b("waterGoodForFarm");
}
async function _0x2275fe() {
    $.initForTurntableFarmRes = await _0x57bb0b("initForTurntableFarm", {
        version: 4,
        channel: 1
    });
}
async function _0x1d828f() {
    await $.wait(2000);
    console.log("等待了2秒");
    $.lotteryRes = await _0x57bb0b("lotteryForTurntableFarm", {
        type: 1,
        version: 4,
        channel: 1
    });
}
async function _0x528890() {
    $.timingAwardRes = await _0x57bb0b("timingAwardForTurntableFarm", {
        version: 4,
        channel: 1
    });
}
async function _0x125300(_0x32011b, _0x24952b) {
    if (_0x32011b === 1) {
        console.log("浏览爆品会场");
    }
    if (_0x32011b === 2) {
        console.log("天天抽奖浏览任务领取水滴");
    }
    const _0x19b762 = {
        type: _0x32011b,
        adId: _0x24952b,
        version: 4,
        channel: 1
    };
    const _0x5af3e0 = _0x19b762;
    $.browserForTurntableFarmRes = await _0x57bb0b("browserForTurntableFarm", _0x5af3e0);
}
async function _0x30962c(_0x5dea2b) {
    const _0x5e548d = {
        type: 2,
        adId: _0x5dea2b,
        version: 4,
        channel: 1
    };
    const _0x377b32 = _0x5e548d;
    $.browserForTurntableFarm2Res = await _0x57bb0b("browserForTurntableFarm", _0x377b32);
}
async function _0x2830eb() {
    const _0x3f0223 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-3",
        babelChannel: "3",
        version: 4,
        channel: 1
    };
    $.lotteryMasterHelpRes = await _0x57bb0b("initForFarm", _0x3f0223);
}
async function _0x5d8d7c() {
    const _0x2879e6 = arguments.callee.name.toString();
    $.masterGotFinished = await _0x57bb0b("masterGotFinishedTaskForFarm");
}
async function _0x3e759f() {
    const _0x61a690 = arguments.callee.name.toString();
    $.masterHelpResult = await _0x57bb0b("masterHelpTaskInitForFarm");
}
async function _0x3c2c98() {
    const _0x4197c2 = arguments.callee.name.toString();
    $.farmAssistResult = await _0x57bb0b("farmAssistInit", {
        version: 14,
        channel: 1,
        babelChannel: "120"
    });
}
async function _0x2d6115() {
    const _0x52f9d7 = arguments.callee.name.toString();
    $.receiveStageEnergy = await _0x57bb0b("receiveStageEnergy", {
        version: 14,
        channel: 1,
        babelChannel: "120"
    });
}
async function _0x148e50() {
    const _0x46a09c = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-inviteFriend",
        version: 4,
        channel: 2
    };
    $.inviteFriendRes = await _0x57bb0b("initForFarm", _0x46a09c);
}
async function _0x4c1d61() {
    const _0x16332a = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    };
    $.helpResult = await _0x57bb0b("initForFarm", _0x16332a);
}
async function _0x3e095f() {
    const _0x5e81f0 = arguments.callee.name.toString();
    const _0x493297 = {
        type: 1,
        hongBaoTimes: 100,
        version: 3
    };
    $.waterRain = await _0x57bb0b("waterRainForFarm", _0x493297);
}
async function _0x1deeb9() {
    const _0x2dc310 = arguments.callee.name.toString();
    $.clockInInit = await _0x57bb0b("clockInInitForFarm");
}
async function _0x1af015() {
    const _0xc6ad1f = arguments.callee.name.toString();
    $.clockInForFarmRes = await _0x57bb0b("clockInForFarm", {
        type: 1
    });
}
async function _0x2b7442(_0x38aab0, _0x1f171f, _0x27e0ba) {
    const _0x511f70 = "clockInFollowForFarm";
    const _0x3b58dd = {
        id: _0x38aab0,
        type: _0x1f171f,
        step: _0x27e0ba
    };
    let _0x1c1417 = _0x3b58dd;
    if (_0x1f171f === "theme") {
        if (_0x27e0ba === "1") {
            $.themeStep1 = await _0x57bb0b(_0x511f70, _0x1c1417);
        } else if (_0x27e0ba === "2") {
            $.themeStep2 = await _0x57bb0b(_0x511f70, _0x1c1417);
        }
    } else if (_0x1f171f === "venderCoupon") {
        if (_0x27e0ba === "1") {
            $.venderCouponStep1 = await _0x57bb0b(_0x511f70, _0x1c1417);
        } else if (_0x27e0ba === "2") {
            $.venderCouponStep2 = await _0x57bb0b(_0x511f70, _0x1c1417);
        }
    }
}
async function _0x5d72a5() {
    $.gotClockInGiftRes = await _0x57bb0b("gotClockInGift", {
        type: 2
    });
}
async function _0x34178f() {
    const _0x399ae1 = arguments.callee.name.toString();
    $.threeMeal = await _0x57bb0b("gotThreeMealForFarm");
}
async function _0x41070d(_0x3a5f5b, _0x1aae64) {
    const _0x1ae9b4 = arguments.callee.name.toString();
    if (_0x1aae64 === 0) {
        const _0x2bf2f0 = {
            advertId: _0x3a5f5b,
            type: _0x1aae64
        };
        $.browseResult = await _0x57bb0b("browseAdTaskForFarm", _0x2bf2f0);
    } else if (_0x1aae64 === 1) {
        const _0x5c3755 = {
            advertId: _0x3a5f5b,
            type: _0x1aae64
        };
        $.browseRwardResult = await _0x57bb0b("browseAdTaskForFarm", _0x5c3755);
    }
}
async function _0x40a537() {
    $.goalResult = await _0x57bb0b("gotWaterGoalTaskForFarm", {
        type: 3
    });
}
async function _0x9120e7() {
    const _0x2691ed = arguments.callee.name.toString();
    $.signResult = await _0x57bb0b("signForFarm");
}
async function _0x1b25df() {
    await $.wait(500);
    if (ct > "1") {
        return;
    }
    let _0x4e1a09 = {
        babelChannel: "121",
        sid: "",
        un_area: "",
        version: 24,
        channel: 1,
        lat: "",
        lng: ""
    };
    let _0x4b623f = {
        appId: "8a2af",
        fn: "initForFarm",
        body: _0x4e1a09,
        apid: "signed_wh5",
        ver: $.UA.split(";")[2],
        cl: "ios",
        user: $.UserName,
        code: 1,
        ua: $.UA
    };
    _0x4e1a09 = await _0x4918e6.getbody(_0x4b623f);
    return new Promise(_0x1f632e => {
        const _0x41358f = {
            cookie: cookie,
            origin: "https://carry.m.jd.com",
            referer: "https://carry.m.jd.com/",
            ["User-Agent"]: $.UA
        };
        const _0x102948 = {
            url: "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x4e1a09,
            headers: _0x41358f,
            timeout: 10000
        };
        const _0x9e9f21 = _0x102948;
        $.get(_0x9e9f21, async (_0x3594a8, _0x1e350a, _0x8d0841) => {
            try {
                if (_0x3594a8) {
                    console.log("initForFarm: 请求失败 ‼️‼️");
                    console.log(JSON.stringify(_0x3594a8));
                } else if (_0x129ab1(_0x8d0841)) {
                    $.farmInfo = JSON.parse(_0x8d0841);
                    if ($.farmInfo.code != 0) {
                        ct++;
                        await _0x1b25df();
                    }
                    ct = 0;
                }
            } catch (_0x214dfd) {
                $.logErr(_0x214dfd, _0x1e350a);
            } finally {
                _0x1f632e();
            }
        });
    });
}
async function _0xd7cb27() {
    console.log("\n初始化任务列表");
    const _0x3b29b7 = arguments.callee.name.toString();
    $.farmTask = await _0x57bb0b("taskInitForFarm", {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "",
        lng: ""
    });
}
async function _0x1e201e() {
    $.friendList = await _0x57bb0b("friendListInitForFarm", {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "",
        lng: ""
    });
}
async function _0x36e7ce() {
    $.awardInviteFriendRes = await _0x57bb0b("awardInviteFriendForFarm");
}
async function _0x5ee0a6(_0x25d37d) {
    const _0x74a6e5 = {
        shareCode: _0x25d37d,
        version: 24,
        channel: 1
    };
    const _0x501cae = _0x74a6e5;
    $.waterFriendForFarmRes = await _0x57bb0b("waterFriendForFarm", _0x501cae);
}
async function _0x2336e9() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else if ($.getdata("jdFruitNotify")) {
        $.ctrTemp = $.getdata("jdFruitNotify") === "false";
    } else {
        $.ctrTemp = "" + jdNotify === "false";
    }
    if ($.ctrTemp) {
        $.msg($.name, subTitle, message, option);
        if ($.isNode()) {
            allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : "");
        }
    } else {
        $.log("\n" + message + "\n");
    }
}
function _0x3a39e0(_0x4152ad) {
    let _0x67a13b;
    if (_0x4152ad) {
        _0x67a13b = new Date(_0x4152ad);
    } else {
        _0x67a13b = new Date();
    }
    return _0x67a13b.getFullYear() + "-" + (_0x67a13b.getMonth() + 1 >= 10 ? _0x67a13b.getMonth() + 1 : "0" + (_0x67a13b.getMonth() + 1)) + "-" + (_0x67a13b.getDate() >= 10 ? _0x67a13b.getDate() : "0" + _0x67a13b.getDate());
}

function _0x413617() {
    return new Promise(_0x5b300e => {
        console.log("开始获取配置文件\n");
        notify = $.isNode() ? require("./sendNotify") : "";
        const _0x1b1c55 = $.isNode() ? require("./jdCookie.js") : "";
        if ($.isNode()) {
            if (process.env.FRUITSHARECODES) {
                if (process.env.FRUITSHARECODES.indexOf("\n") > -1) {
                    shareCodes = process.env.FRUITSHARECODES.split("\n");
                } else {
                    shareCodes = process.env.FRUITSHARECODES.split("&");
                }
            }
        }
        if ($.isNode()) {
            Object.keys(_0x1b1c55).forEach(_0x432d91 => {
                if (_0x1b1c55[_0x432d91]) {
                    cookiesArr.push(_0x1b1c55[_0x432d91]);
                }
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
                console.log = () => { };
            }
        } else {
            cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1965fd($.getdata("CookiesJD") || "[]").map(_0x4d8f6e => _0x4d8f6e.cookie)].filter(_0x80fcb8 => !!_0x80fcb8);
        }
        $.shareCodesArr = [];
        if ($.isNode()) {
            Object.keys(shareCodes).forEach(_0x294461 => {
                if (shareCodes[_0x294461]) {
                    $.shareCodesArr.push(shareCodes[_0x294461]);
                }
            });
        } else {
            if ($.getdata("jd_fruit_inviter")) {
                $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x100af9 => !!_0x100af9);
            }
            console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
        }
        _0x5b300e();
    });
}
async function _0x41e321() {
    await _0x57bb0b("ddnc_getTreasureBoxAward", {
        type: 1,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "",
        lng: ""
    });
    await $.wait(500);
    await _0x2a024e();
    await $.wait(2000);
    let _0x27f21d = await _0x57bb0b("ddnc_getTreasureBoxAward", {
        type: 2,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "",
        lng: ""
    });
    if (_0x27f21d.code == 0) {
        $.log("完成，获得" + _0x27f21d.waterGram + "g💧\n");
    }
}
function _0x2a024e() {
    return new Promise(_0x43d74f => {
        const _0xf9738e = {
            Cookie: cookie,
            referer: "https://h5.m.jd.com/",
            ["User-Agent"]: $.UA
        };
        const _0x1d4723 = {
            url: "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            headers: _0xf9738e,
            timeout: 10000
        };
        const _0x1bb09f = _0x1d4723;
        $.get(_0x1bb09f, (_0x518f2b, _0x50ba2c, _0x47fe42) => {
            _0x43d74f();
        });
    });
}
function _0x3defc4() {
    return new Promise(_0x28cdcb => {
        const _0x51a072 = {
            Cookie: cookie,
            referer: "https://h5.m.jd.com/",
            ["User-Agent"]: $.UA
        };
        const _0x2b14d9 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x51a072,
            timeout: 10000
        };
        const _0x464150 = _0x2b14d9;
        $.get(_0x464150, (_0x5c00ad, _0x61314d, _0x354881) => {
            try {
                if (_0x354881) {
                    _0x354881 = JSON.parse(_0x354881);
                    if (_0x354881.islogin === "1") { } else if (_0x354881.islogin === "0") {
                        $.isLogin = false;
                    }
                }
            } catch (_0x31a12b) {
                console.log(_0x31a12b);
            } finally {
                _0x28cdcb();
            }
        });
    });
}
function _0x57bb0b(_0x166e80, _0x3ab535 = {}, _0x4faaf0 = 1000) {
    if ($.reqnum % 5 == 0) {
        console.log("\n等待" + _0xc6a7f1 / 1000 + "秒......\n");
        _0x4faaf0 = _0xc6a7f1;
    }
    ;
    $.reqnum++;
    return new Promise(_0x38e16e => {
        setTimeout(() => {
            $.get(_0x1f1fc3(_0x166e80, _0x3ab535), (_0x315609, _0x52735b, _0x4a77a4) => {
                try {
                    if (_0x315609) {
                        console.log("\n东东农场: API查询请求失败 ‼️‼️");
                        console.log(JSON.stringify(_0x315609));
                        console.log("function_id:" + _0x166e80);
                        $.logErr(_0x315609);
                    } else if (_0x129ab1(_0x4a77a4)) {
                        _0x4a77a4 = JSON.parse(_0x4a77a4);
                    }
                } catch (_0x43894a) {
                    $.logErr(_0x43894a, _0x52735b);
                } finally {
                    _0x38e16e(_0x4a77a4);
                }
            });
        }, _0x4faaf0);
    });
}
function _0x129ab1(_0xc44a8) {
    try {
        if (typeof JSON.parse(_0xc44a8) == "object") {
            return true;
        }
    } catch (_0x5f30eb) {
        console.log(_0x5f30eb);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}
function _0x1f1fc3(_0x32a14e, _0x59f8c9 = {}) {
    return {
        url: _0x102fcb + "?functionId=" + _0x32a14e + "&body=" + encodeURIComponent(JSON.stringify(_0x59f8c9)) + "&appid=wh5",
        headers: {
            Host: "api.m.jd.com",
            Accept: "*/*",
            Origin: "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Referer: "https://carry.m.jd.com/",
            Cookie: cookie
        },
        timeout: 10000
    };
}
function _0x1965fd(_0xfa8216) {
    if (typeof _0xfa8216 == "string") {
        try {
            return JSON.parse(_0xfa8216);
        } catch (_0x31879f) {
            console.log(_0x31879f);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }