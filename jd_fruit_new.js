/*
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd新农场
15 6,16 * * * jd_fruit_new.js

*/
const $ = new Env('新农场任务');
const _0x48c28d = 100;

let _0x5aea6b = false,
    _0x4bb719 = [],
    _0x55627d = "",
    _0x597efe,
    _0x2ff805,
    _0x435dee = "",
    _0x467eb1 = "",
    _0xad6af2 = "",
    _0x111400 = {},
    _0x54483e = false,
    _0x180206 = 0;

const _0x20ae1d = "https://api.m.jd.com/client.action",
    _0x3a43e1 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    _0x45720a = process.env.FRUIT_ID ? process.env.FRUIT_ID : "",
    _0x483a5e = require("./USER_AGENTS"),
    _0x1b8329 = require("fs"),
    _0x34d938 = require("./function/dylanz"),
    _0x2ff49c = require("./function/dylanv");

if (process.env.DY_PROXY) {
    const _0x1706d4 = require("./function/proxy.js");

    $.get = _0x1706d4.intoRequest($.get.bind($));
    $.post = _0x1706d4.intoRequest($.post.bind($));
}

let _0x5121e6 = [];
$.reqnum = 1;
const _0x2a715a = {
    "farm_home": "c57f6",
    "farm_do_task": "28981",
    "farm_task_receive_award": "33e0f",
    "farm_water": "28981",
    "farm_assist_receive_award": "c4332"
},
    _0x1fd10d = {
        "wheelsHome": "c06b7",
        "wheelsLottery": "bd6c8",
        "apsDoTask": "54ed7"
    };
!(async () => {
    await _0x4f3a87();

    if (!_0x4bb719[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：2023/11/24 fix ");
    $.log("问题建议：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量（可选项）：");
    $.log("export DY_PROXY='api_url' 可使用代理API");
    $.log("export FRUIT_ID='UID' 未种植可设置商品UID来自动种植\n");
    process.env.NO_WATER == "true" && 0 ? (_0x435dee = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x435dee = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));

    for (let _0x330b2c = 0; _0x330b2c < _0x4bb719.length; _0x330b2c++) {
        if (_0x4bb719[_0x330b2c]) {
            _0x55627d = _0x4bb719[_0x330b2c];
            $.UserName = decodeURIComponent(_0x55627d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x55627d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x330b2c + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            ct = 0;
            await _0x3680a4();
            console.log("------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x597efe.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x467eb1 = "";
            _0xad6af2 = "";
            _0x111400 = {};
            $.UA = _0x483a5e.UARAM();
            await _0x28784e();
            await $.wait(2000);
        }
    }

    _0x1b8329.writeFile("./fruit_helpcode_new", JSON.stringify(_0x5121e6), _0x18dffd => {
        _0x18dffd && console.log(_0x18dffd);
    });

    $.isNode() && _0x435dee && $.ctrTemp && (await _0x597efe.sendNotify("" + $.name, "" + _0x435dee));
})().catch(_0x43417e => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x43417e + "!", "");
}).finally(() => {
    $.done();
});

async function _0x28784e() {
    _0xad6af2 = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x2deb88();
        await $.wait(500);

        if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
            _0x467eb1 = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
            console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
            console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
            _0x467eb1 += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";

            _0x5121e6.push($.farmInfo.data.result.farmHomeShare.inviteCode);

            if ($.farmInfo.data.result.treeFullStage === 5) {
                _0x111400["open-url"] = _0x3a43e1;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x111400);
                $.isNode() && (await _0x597efe.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场记录里下单"));
                console.log("\n继续种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
                await _0x5ff021();

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                    console.log("\n===============1级商品(UID)最快20天种成=================");

                    for (let _0x26c1d6 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                        console.log(_0x26c1d6.skuName + "(" + _0x26c1d6.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                    console.log("\n===============2级商品(UID)最快30天种成=================");

                    for (let _0x34a95c of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                        console.log(_0x34a95c.skuName + "(" + _0x34a95c.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                    console.log("\n===============3级商品(UID)最快41天种成=================");

                    for (let _0x466d41 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                        console.log(_0x466d41.skuName + "(" + _0x466d41.uid + ")");
                    }
                }

                if (_0x45720a) {
                    console.log("\n\n已设置种植目标，开始种植。。。");
                    await _0x2c46f9(_0x45720a);

                    if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
                        console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
                        return;
                    }
                }

                return;
            } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"), _0x467eb1 += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n");

            await _0x29e684();
            await _0x4e1e48();
            await _0x3dc0ac();
            process.env.DO_TEN_WATER_AGAIN != "true" || 1 ? ($.log("执行继续浇水..."), await _0x589c29()) : $.log("不执行再次浇水，攒水滴!");
            _0x467eb1 += "【剩余水滴】" + _0x180206 + "g💧\n";
        } else {
            if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
                console.log("没有种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
                await _0x5ff021();

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                    console.log("\n===============1级商品(UID)最快20天种成=================");

                    for (let _0x5a2709 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                        console.log(_0x5a2709.skuName + "(" + _0x5a2709.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                    console.log("\n===============2级商品(UID)最快30天种成=================");

                    for (let _0x4caa25 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
                        console.log(_0x4caa25.skuName + "(" + _0x4caa25.uid + ")");
                    }
                }

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                    console.log("\n===============3级商品(UID)最快41天种成=================");

                    for (let _0x31f53b of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
                        console.log(_0x31f53b.skuName + "(" + _0x31f53b.uid + ")");
                    }
                }

                if (_0x45720a) {
                    console.log("\n\n已设置种植目标，开始种植。。。");
                    await _0x2c46f9(_0x45720a);

                    if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
                        console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
                        return;
                    }
                }

                $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
                $.isNode() && (await _0x597efe.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
                return;
            } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x467eb1 = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
        }
    } catch (_0x1ca406) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
        $.logErr(_0x1ca406);
    }

    await _0x1bb9ca();
}

async function _0x3dc0ac() {
    await _0x28044c();
    console.log("\n开始日常任务...");

    for (let _0x176487 of $.farmTask.data.result.taskList) {
        if (_0x176487.taskStatus == 3) {
            console.log(_0x176487.mainTitle + "已完成");
            continue;
        }

        console.log("去做 " + _0x176487.mainTitle);

        if (_0x176487.taskStatus == 2) {
            await _0x5c2d5a(_0x176487.taskType, _0x176487.taskId);
            $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
            continue;
        }

        switch (_0x176487.taskType) {
            case "CUMULATIVE_TIMES":
                break;

            case "ORDER_MARK":
                break;

            case "EXTERNAL_BROWSE":
            case "BROWSE_CHANNEL":
            case "BROWSE_PRODUCT":
                if (!_0x176487.taskSourceUrl) {
                    await _0x2e1441(_0x176487.taskType, _0x176487.taskId);
                    let _0x4f84a5 = $.taskDetail.data.result.taskDetaiList;
                    _0x176487.taskSourceUrl = _0x4f84a5[Math.floor(Math.random() * _0x4f84a5.length)].itemId;
                }

                await _0x864691(_0x176487.taskType, _0x176487.taskId, Buffer.from(_0x176487.taskSourceUrl).toString("base64")), await $.wait(_0x176487.timePeriod * 1000), await _0x5c2d5a(_0x176487.taskType, _0x176487.taskId);
                $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
                break;

            default:
                console.log(_0x176487.taskType + " 类型未支持");
                break;
        }
    }

    await _0xd42005();
    await _0x15c939();
}

async function _0x2036a8() {
    console.log("开始预测水果成熟时间...\n");
    await initForFarm();
    if (!$.farmInfo.farmUserPro) await initForFarm();
    await _0x28044c();
    let _0xbde810 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x467eb1 += "【今日共浇水】" + _0xbde810 + "次\n";
    _0x467eb1 += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    _0x467eb1 += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x467eb1 += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n"; else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x467eb1 += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");

    let _0x1c7308 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

    if (_0xbde810 > 2) {
        let _0x2b08ef = Math.ceil(_0x1c7308 / _0xbde810) || 0;

        _0x467eb1 += "【预测】" + (_0x2b08ef === 1 ? "明天" : _0x2b08ef === 2 ? "后天" : _0x2b08ef + "天之后") + "(" + _0x2bbf5c(24 * 60 * 60 * 1000 * _0x2b08ef + Date.now()) + "日)可兑换水果🍉\n";
    } else _0x467eb1 += "【预测】不浇水无限期\n";
}

async function _0x4e1e48() {
    await _0x28044c();

    if ($.farmTask.data.result.taskList[0].taskStatus == 1) {
        console.log("\n准备浇水十次");
        _0x54483e = false;

        for (let _0x29b6c5 = 0; _0x29b6c5 < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x29b6c5++) {
            console.log("第" + (_0x29b6c5 + 1) + "次浇水");
            await _0x9a3ce2(1);

            if ($.waterResult.code === 0) {
                console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);

                if ($.waterResult.data.result.finished) {
                    _0x54483e = true;
                    break;
                } else {
                    if ($.waterResult.data.result.bottleWater < 10) {
                        console.log("水滴不够，结束浇水\n");
                        break;
                    }
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水\n");
                break;
            }

            _0x180206 = $.waterResult.data.result.bottleWater;
        }

        _0x54483e && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP查看"), $.done(), $.isNode() && (await _0x597efe.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
    } else console.log("\n今日已完成10次浇水任务\n");
}

async function _0x589c29() {
    console.log("检查剩余水滴能否继续浇水...\n");
    await _0x2deb88();
    _0x180206 = $.farmInfo.data.result.bottleWater;
    console.log("剩余水滴" + _0x180206 + "g\n");

    let _0x1b3db3 = _0x180206 - _0x48c28d;

    if (_0x1b3db3 >= 10) {
        $.log("\n开始浇水...");
        console.log("目前剩余水滴：" + _0x180206 + "g，可继续浇水");
        _0x54483e = false;

        for (let _0x1f96ca = 0; _0x1f96ca < parseInt(_0x1b3db3 / 10); _0x1f96ca++) {
            $.log("浇水" + (_0x1f96ca + 1) + "次");
            await _0x9a3ce2(1);

            if ($.waterResult.code === 0) {
                console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");

                if ($.waterResult.data.result.finished) {
                    _0x54483e = true;
                    $.log("水果已成熟啦！\n");
                    break;
                } else { }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        _0x180206 = $.waterResult.data.result.bottleWater;
    } else console.log("目前剩余水滴：【" + _0x180206 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");

    _0x54483e && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看"), $.done(), $.isNode() && (await _0x597efe.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
}

function _0x17209d() {
    return new Promise(async _0x259a83 => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g💧");
            await _0xb99afb("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");
        } else {
            if ($.waterResult.waterStatus === 1) console.log("果树开花了,奖励40g💧"), await _0xb99afb("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"); else {
                if ($.waterResult.waterStatus === 2) {
                    console.log("果树长出小果子啦, 奖励50g💧");
                    await _0xb99afb("3");
                    console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
                    $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
                }
            }
        }

        _0x259a83();
    });
}

async function _0x15c939() {
    await _0x1fa45f();

    if ($.initForTurntableFarmRes.code === 0) {
        console.log("\n开始天天抽奖任务...");
        await _0xec46ad();

        if ($.wheeltaskRes.code == 0) {
            for (let _0x244aeb of $.wheeltaskRes.data) {
                if (_0x244aeb.taskFinished) {
                    console.log(_0x244aeb.taskTitle + "----" + _0x244aeb.taskShowTitle + " 已完成");
                    continue;
                }

                await _0x1205d0(_0x244aeb.taskType, _0x244aeb.id, _0x244aeb.taskSourceUrl);
                $.wheeldoRes.code == 0 && console.log("任务完成，获得1次抽奖机会");
                await $.wait(1000);
            }
        }

        await _0x1fa45f();

        if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
            console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
            console.log("开始抽奖...");
            let _0x4ad7ab = "";

            for (let _0x1f9024 = 0; _0x1f9024 < $.initForTurntableFarmRes.data.lotteryChances; _0x1f9024++) {
                await _0x59f713();
                await $.wait(1000);
                console.log("第" + (_0x1f9024 + 1) + "次抽奖");

                if ($.lotteryRes.code === 0) {
                    _0x4ad7ab += $.lotteryRes.data.prizeName + "，";
                    if ($.lotteryRes.data.lotteryChances === 0) break;
                }
            }

            _0x4ad7ab && console.log("天天抽奖奖励：" + _0x4ad7ab.substr(0, _0x4ad7ab.length - 1) + "\n");
        } else console.log("天天抽奖无次数！");
    } else console.log("初始化天天抽奖得好礼失败！");
}

async function _0xd42005() {
    await _0x2d9e78();

    if ($.farmAssistResult.code === 0) {
        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 2) {
            if ($.farmAssistResult.data.result.status === 2) {
                let _0x26224e = 0;

                for (let _0x3dd666 of Object.keys($.farmAssistResult.data.result.assistStageList)) {
                    let _0x5714c9 = $.farmAssistResult.data.result.assistStageList[_0x3dd666];

                    if (_0x5714c9.stageStaus === 2) {
                        await _0x3109d7();
                        await $.wait(500);

                        if ($.receiveStageEnergy.code === 0) {
                            console.log("成功领取第" + (Number(_0x3dd666) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧");
                            _0x26224e += $.receiveStageEnergy.data.result.amount;
                        }
                    }
                }

                _0x467eb1 += "【额外奖励】" + _0x26224e + "g💧领取完成\n";
                console.log("【额外奖励】" + _0x26224e + "g💧领取完成\n");
            } else {
                if ($.farmAssistResult.data.result.status === 3) {
                    console.log("已经领取过好友助力额外奖励");
                    _0x467eb1 += "【额外奖励】已领取过\n";
                }
            }
        } else console.log("助力好友未达到2个"), _0x467eb1 += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
            let _0x37a964 = "";
            $.farmAssistResult.data.result.assistFriendList.map((_0x2e5e96, _0xb467ec) => {
                _0xb467ec === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x37a964 += _0x2e5e96.nickname || "匿名用户" : _0x37a964 += (_0x2e5e96.nickname || "匿名用户") + ",";

                let _0x300264 = new Date(_0x2e5e96.time),
                    _0x10fbfe = _0x300264.getFullYear() + "/" + ("0" + (_0x300264.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x300264.getDate()).slice(-2) + " " + ("0" + _0x300264.getHours()).slice(-2) + ":" + ("0" + _0x300264.getMinutes()).slice(-2) + ":" + ("0" + _0x300264.getSeconds()).slice(-2);

                console.log("【" + (_0x2e5e96.nickname || "匿名用户") + "】 在 " + _0x10fbfe + " 给您助过力");
            });
            _0x467eb1 += "【助力您的好友】" + _0x37a964 + "\n";
        }

        console.log("\n领取额外奖励水滴结束\n");
    } else {
        await _0x5eaf5e();

        if ($.masterHelpResult.code === "0") {
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) !$.masterHelpResult.masterGotFinal ? (await _0x364b27(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x467eb1 += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), _0x467eb1 += "【额外奖励】已被领取过\n"); else {
                console.log("助力好友未达到5个");
                _0x467eb1 += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";
            }

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x43d174 = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x22bbfd, _0x14834c) => {
                    _0x14834c === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x43d174 += _0x22bbfd.nickName || "匿名用户" : _0x43d174 += (_0x22bbfd.nickName || "匿名用户") + ",";

                    let _0x2af2da = new Date(_0x22bbfd.time),
                        _0x5c75e = _0x2af2da.getFullYear() + "-" + (_0x2af2da.getMonth() + 1) + "-" + _0x2af2da.getDate() + " " + _0x2af2da.getHours() + ":" + _0x2af2da.getMinutes() + ":" + _0x2af2da.getMinutes();

                    console.log("【" + (_0x22bbfd.nickName || "匿名用户") + "】 在 " + _0x5c75e + " 给您助过力");
                });
                _0x467eb1 += "【助力您的好友】" + _0x43d174 + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x4ea9dc() {
    let _0x54b4bf = !$.farmTask.waterRainInit.f;

    if (_0x54b4bf) {
        console.log("水滴雨任务，每天两次，最多可得10g水滴");
        console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否"));
        $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x54b4bf = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n"));

        if (_0x54b4bf) {
            console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次");
            await _0x45a4ab();
            console.log("水滴雨waterRain");
            $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n"));
        }
    } else console.log("【水滴雨】已全部完成\n");
}

async function _0x29e684() {
    await _0x465054();

    if ($.clockInInit.code === 0) {
        if ($.clockInInit.data.signInFlag == 0) {
            console.log("开始今日签到");
            await _0x37a99c();
            $.clockInForFarmRes.code === 0 ? console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n") : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
        }
    }
}

async function _0x37f176() {
    await _0x54f770();
    console.log("\n开始给好友浇水...");
    await _0x28044c();
    const {
        waterFriendCountKey: _0xdbd31a,
        waterFriendMax: _0x1d991d
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0xdbd31a + "个好友浇水");

    if (_0xdbd31a < _0x1d991d) {
        let _0x2aee6b = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x4970ee, _0x4171e2) => {
                _0x4970ee.friendState === 1 && _0x2aee6b.length < _0x1d991d - _0xdbd31a && _0x2aee6b.push(_0x4970ee.shareCode);
            });
            _0x2aee6b.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x2aee6b));
            _0x2aee6b.length == 0 && console.log("没有需要浇水的好友!\n");
            let _0x51bbee = 0,
                _0x3c44ff = "";

            for (let _0x48a7fb = 0; _0x48a7fb < _0x2aee6b.length; _0x48a7fb++) {
                await _0x17aebe(_0x2aee6b[_0x48a7fb]);
                console.log("为第" + (_0x48a7fb + 1) + "个好友浇水");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x51bbee++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");
                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x3c44ff += "水滴换豆卡,"; else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x3c44ff += "快速浇水卡,"; else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x3c44ff += "水滴翻倍卡,"; else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x3c44ff += "加签卡,");
                            }
                        }
                    }
                } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
            }

            _0x51bbee > 0 && console.log("已给" + _0x51bbee + "个好友浇水,消耗" + _0x51bbee * 10 + "g水\n");
            _0x3c44ff && _0x3c44ff.length > 0 && console.log("【好友浇水奖励】" + _0x3c44ff.substr(0, _0x3c44ff.length - 1) + "\n");
        } else console.log("好友列表无好友,快去邀请您的好友吧!\n");
    } else console.log("今日已为" + _0x1d991d + "个好友浇水\n");
}

async function _0x369fcd() {
    await _0x28044c();
    const {
        waterFriendCountKey: _0x57d7e8,
        waterFriendMax: _0x398f0f,
        waterFriendSendWater: _0x5564b6,
        waterFriendGotAward: _0x1a2921
    } = $.farmTask.waterFriendTaskInit;
    _0x57d7e8 >= _0x398f0f ? !_0x1a2921 ? (await _0x3bb178(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n") : console.log("给" + _0x398f0f + "个好友浇水未完成\n");
}

async function _0x181eb6() {
    for (let _0xf7675b of _0x2ff805) {
        if (_0xf7675b === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0xf4fdd1(_0xf7675b);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友"); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
}

async function _0x2fefcc() {
    for (let _0x37470e = 0; _0x37470e < 10; _0x37470e++) {
        $.duckRes = await _0x106469("getFullCollectionReward", {
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

async function _0x2a56ed() {
    $.totalWaterReward = await _0x106469("totalWaterTaskForFarm");
}

async function _0x331a9d() {
    $.firstWaterReward = await _0x106469("firstWaterTaskForFarm");
}

async function _0x29b7d1() {
    $.newtaskinfo = await _0x106469("gotNewUserTaskForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x4f9508() {
    $.newtaskinfo = await _0x106469("gotLowFreqWaterForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x2deb88() {
    $.farmInfo = await _0x106469("farm_home", {
        "version": 1
    });
}

async function _0x3bb178() {
    $.waterFriendGotAwardRes = await _0x106469("waterFriendGotAwardForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x43929b() {
    $.myCardInfoRes = await _0x106469("myCardInfoForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    });
}

async function _0x547116(_0x494130) {
    $.userMyCardRes = await _0x106469("userMyCardForFarm", {
        "cardType": _0x494130
    });
}

async function _0xb99afb(_0x463c8d) {
    $.gotStageAwardForFarmRes = await _0x106469("gotStageAwardForFarm", {
        "type": _0x463c8d
    });
}

async function _0x9a3ce2(_0x35270a) {
    await $.wait(1000);
    $.waterResult = await _0x106469("farm_water", {
        "version": 1,
        "waterType": _0x35270a
    });
}

async function _0x1fa45f() {
    $.initForTurntableFarmRes = await _0x5e87c3("wheelsHome", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0xec46ad() {
    $.wheeltaskRes = await _0x5e87c3("apTaskList", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0x1205d0(_0x25319d, _0x37ce02, _0x5f0988) {
    $.wheeldoRes = await _0x5e87c3("apsDoTask", {
        "taskType": _0x25319d,
        "taskId": _0x37ce02,
        "channel": 4,
        "checkVersion": true,
        "linkId": "VssYBUKJOen7HZXpC8dRFA",
        "itemId": _0x5f0988
    });
}

async function _0x59f713() {
    $.lotteryRes = await _0x5e87c3("wheelsLottery", {
        "linkId": "VssYBUKJOen7HZXpC8dRFA"
    });
}

async function _0x5ff021() {
    $.treeboardRes = await _0x106469("farm_tree_board", {
        "version": 1
    });
}

async function _0x2c46f9(_0xfc8ea) {
    $.planttreeRes = await _0x106469("farm_plant_tree", {
        "version": 1,
        "uid": _0xfc8ea
    });
}

async function _0x4d87e6(_0x36d1c4) {
    const _0x5a4669 = {
        "type": 2,
        "adId": _0x36d1c4,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.browserForTurntableFarm2Res = await _0x106469("browserForTurntableFarm", _0x5a4669);
}

async function _0x3ce341() {
    $.lotteryMasterHelpRes = await _0x106469("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 24,
        "channel": 1
    });
}

async function _0x364b27() {
    $.masterGotFinished = await _0x106469("masterGotFinishedTaskForFarm");
}

async function _0x5eaf5e() {
    $.masterHelpResult = await _0x106469("masterHelpTaskInitForFarm");
}

async function _0x2d9e78() {
    $.farmAssistResult = await _0x106469("farm_assist_init_info", {
        "version": 1
    });
}

async function _0x3109d7() {
    $.receiveStageEnergy = await _0x106469("farm_assist_receive_award", {
        "version": 1
    });
}

async function _0xf4fdd1() {
    $.inviteFriendRes = await _0x106469("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 4,
        "channel": 2
    });
}

async function _0x1d6a49() {
    $.helpResult = await _0x106469("initForFarm", {
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0],
        "babelChannel": "3",
        "version": 2,
        "channel": 1
    });
}

async function _0x45a4ab() {
    const _0x1b7307 = {
        "type": 1,
        "hongBaoTimes": 100,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterRain = await _0x106469("waterRainForFarm", _0x1b7307);
}

async function _0x465054() {
    $.clockInInit = await _0x5e87c3("dongDongFarmSignHome", {
        "linkId": "LCH-fV7hSnChB-6i5f4ayw"
    });
}

async function _0x37a99c() {
    $.clockInForFarmRes = await _0x5e87c3("dongDongFarmSignIn", {
        "linkId": "LCH-fV7hSnChB-6i5f4ayw"
    });
}

async function _0x1bab36(_0x469bd6, _0x462742, _0xa5a6f) {
    const _0x38fe2f = "clockInFollowForFarm";
    let _0x266822 = {
        "id": _0x469bd6,
        "type": _0x462742,
        "step": _0xa5a6f
    };

    if (_0x462742 === "theme") {
        if (_0xa5a6f === "1") $.themeStep1 = await _0x106469(_0x38fe2f, _0x266822); else _0xa5a6f === "2" && ($.themeStep2 = await _0x106469(_0x38fe2f, _0x266822));
    } else {
        if (_0x462742 === "venderCoupon") {
            if (_0xa5a6f === "1") $.venderCouponStep1 = await _0x106469(_0x38fe2f, _0x266822); else _0xa5a6f === "2" && ($.venderCouponStep2 = await _0x106469(_0x38fe2f, _0x266822));
        }
    }
}

async function _0x33847c() {
    $.gotClockInGiftRes = await _0x106469("clockInForFarm", {
        "type": 2,
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x1a3a47() {
    $.threeMeal = await _0x106469("gotThreeMealForFarm");
}

async function _0x864691(_0x127dff, _0x56c178, _0x566e01) {
    $.browseResult = await _0x106469("farm_do_task", {
        "version": 1,
        "taskType": _0x127dff,
        "taskId": _0x56c178,
        "taskInsert": true,
        "itemId": _0x566e01,
        "channel": 0
    });
}

async function _0x5c2d5a(_0x3e2ab8, _0x46bf57) {
    $.dotaskResult = await _0x106469("farm_task_receive_award", {
        "version": 1,
        "taskType": _0x3e2ab8,
        "taskId": _0x46bf57,
        "channel": 0
    });
}

async function _0x2e1441(_0x27ca71, _0x1b59a3) {
    $.taskDetail = await _0x106469("farm_task_detail", {
        "version": 1,
        "taskType": _0x27ca71,
        "taskId": _0x1b59a3,
        "channel": 0
    });
}

async function _0x2e7f7f() {
    $.goalResult = await _0x106469("gotWaterGoalTaskForFarm", {
        "type": 3
    });
}

async function _0x28044c() {
    $.farmTask = await _0x106469("farm_task_list", {
        "version": 1,
        "channel": 0
    });
}

async function _0x4eabe0() {
    $.farmTask = await _0x106469("taskInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "45",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x54f770() {
    $.friendList = await _0x106469("friendListInitForFarm", {
        "version": 24,
        "channel": 1,
        "babelChannel": "121",
        "lat": "0",
        "lng": "0"
    });
}

async function _0x1b0207() {
    $.awardInviteFriendRes = await _0x106469("awardInviteFriendForFarm");
}

async function _0x17aebe(_0x1ece82) {
    const _0x4ea98e = {
        "shareCode": _0x1ece82,
        "version": 24,
        "channel": 1,
        "babelChannel": "121"
    };
    $.waterFriendForFarmRes = await _0x106469("waterFriendForFarm", _0x4ea98e);
}

async function _0x1bb9ca() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false"; else {
        if ($.getdata("jdFruitNotify")) {
            $.ctrTemp = $.getdata("jdFruitNotify") === "false";
        } else $.ctrTemp = "" + _0x5aea6b === "false";
    }
    $.ctrTemp ? ($.msg($.name, _0xad6af2, _0x467eb1, _0x111400), $.isNode() && (_0x435dee += _0xad6af2 + "\n" + _0x467eb1 + ($.index !== _0x4bb719.length ? "\n\n" : ""))) : $.log("\n" + _0x467eb1 + "\n");
}

function _0x2bbf5c(_0x31f77a) {
    let _0x26fe24;

    return _0x31f77a ? _0x26fe24 = new Date(_0x31f77a) : _0x26fe24 = new Date(), _0x26fe24.getFullYear() + "-" + (_0x26fe24.getMonth() + 1 >= 10 ? _0x26fe24.getMonth() + 1 : "0" + (_0x26fe24.getMonth() + 1)) + "-" + (_0x26fe24.getDate() >= 10 ? _0x26fe24.getDate() : "0" + _0x26fe24.getDate());
}

function _0x4f3a87() {
    return new Promise(_0x270f1f => {
        console.log("开始获取配置文件\n");
        _0x597efe = $.isNode() ? require("./sendNotify") : "";

        const _0x51d394 = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0x51d394).forEach(_0xd74579 => {
                _0x51d394[_0xd74579] && _0x4bb719.push(_0x51d394[_0xd74579]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else _0x4bb719 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4fdcaf($.getdata("CookiesJD") || "[]").map(_0x445796 => _0x445796.cookie)].filter(_0x3469de => !!_0x3469de);

        _0x270f1f();
    });
}

async function _0x4f8f37() {
    await _0x106469("ddnc_getTreasureBoxAward", {
        "type": 1,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });
    await $.wait(500);
    await _0x2165f9();
    await $.wait(2000);

    let _0xa77d56 = await _0x106469("ddnc_getTreasureBoxAward", {
        "type": 2,
        "babelChannel": "121",
        "line": "getBean",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });

    return _0xa77d56;
}

async function _0x2c89b5() {
    await _0x106469("ddnc_getTreasureBoxAward", {
        "type": 1,
        "babelChannel": "121",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });
    await $.wait(500);
    await _0x4eabe0();
    await $.wait(2000);

    let _0x58d5e0 = await _0x106469("ddnc_getTreasureBoxAward", {
        "type": 2,
        "babelChannel": "45",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    });

    return _0x58d5e0;
}

function _0x2165f9() {
    return new Promise(_0x34760c => {
        const _0x1e0f6f = {
            "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            "headers": {
                "Cookie": _0x55627d,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x1e0f6f, (_0x20084f, _0x20b2e4, _0x3c145e) => {
            _0x34760c();
        });
    });
}

function _0x3680a4() {
    return new Promise(_0x6c505a => {
        const _0xb7cd61 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x55627d,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0xb7cd61, (_0x4f7ce6, _0x1a39f8, _0x2f51e1) => {
            try {
                if (_0x2f51e1) {
                    _0x2f51e1 = JSON.parse(_0x2f51e1);

                    if (_0x2f51e1.islogin === "1") { } else _0x2f51e1.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x54c811) {
                console.log(_0x54c811);
            } finally {
                _0x6c505a();
            }
        });
    });
}

async function _0x106469(_0x4d1ede, _0x51f00c = {}, _0x94fbf9 = 1500) {
    $.reqnum++;

    if (_0x2a715a[_0x4d1ede]) {
        let _0x178057 = {
            "appId": _0x2a715a[_0x4d1ede],
            "fn": _0x4d1ede,
            "body": _0x51f00c,
            "apid": "signed_wh5",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x51f00c = await _0x2ff49c.getbody(_0x178057);
    } else _0x51f00c = "functionId=" + _0x4d1ede + "&body=" + encodeURIComponent(JSON.stringify(_0x51f00c)) + "&appid=signed_wh5";

    return new Promise(_0x227a6 => {
        setTimeout(() => {
            $.get(_0x581414(_0x51f00c), (_0x449a49, _0x1d0b4c, _0x127e14) => {
                try {
                    _0x449a49 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x449a49)), console.log("function_id:" + _0x4d1ede), $.logErr(_0x449a49)) : _0x530aee(_0x127e14) && (_0x127e14 = JSON.parse(_0x127e14));
                } catch (_0x1c67a9) {
                    $.logErr(_0x1c67a9, _0x1d0b4c);
                } finally {
                    _0x227a6(_0x127e14);
                }
            });
        }, _0x94fbf9);
    });
}

async function _0x5e87c3(_0x3e353f, _0x22a7b4 = {}, _0x33f5c9 = 1500) {
    $.reqnum++;

    if (_0x1fd10d[_0x3e353f]) {
        let _0x5d9e0c = {
            "appId": _0x1fd10d[_0x3e353f],
            "fn": _0x3e353f,
            "body": _0x22a7b4,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
        _0x22a7b4 = await _0x34d938.getbody(_0x5d9e0c);
    } else _0x22a7b4 = "functionId=" + _0x3e353f + "&body=" + encodeURIComponent(JSON.stringify(_0x22a7b4)) + "&appid=activities_platform";

    return new Promise(_0x81ce84 => {
        setTimeout(() => {
            $.post(_0x17de14(_0x22a7b4), (_0x10a499, _0x5ecc65, _0x346545) => {
                try {
                    if (_0x10a499) {
                        console.log("\n东东农场: API查询请求失败 ‼️‼️");
                        console.log(JSON.stringify(_0x10a499));
                        console.log("function_id:" + _0x3e353f);
                        $.logErr(_0x10a499);
                    } else _0x530aee(_0x346545) && (_0x346545 = JSON.parse(_0x346545));
                } catch (_0x5aa04c) {
                    $.logErr(_0x5aa04c, _0x5ecc65);
                } finally {
                    _0x81ce84(_0x346545);
                }
            });
        }, _0x33f5c9);
    });
}

function _0x530aee(_0x758520) {
    try {
        if (typeof JSON.parse(_0x758520) == "object") {
            return true;
        }
    } catch (_0x1decc3) {
        return console.log(_0x1decc3), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x581414(_0x145535 = {}) {
    return {
        "url": _0x20ae1d + "?" + _0x145535,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://h5.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://h5.m.jd.com/",
            "Cookie": _0x55627d
        },
        "timeout": 30000
    };
}

function _0x17de14(_0x253b77 = {}) {
    return {
        "url": "" + _0x20ae1d,
        "body": _0x253b77,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://pro.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://pro.m.jd.com/",
            "Cookie": _0x55627d
        },
        "timeout": 30000
    };
}

function _0x139e54(_0x236e44, _0x506161 = {}) {
    return {
        "url": _0x20ae1d + "?" + _0x506161,
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x55627d
        },
        "timeout": 10000
    };
}

function _0x4fdcaf(_0x2cffc8) {
    if (typeof _0x2cffc8 == "string") try {
        return JSON.parse(_0x2cffc8);
    } catch (_0x456d3a) {
        return console.log(_0x456d3a), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }