/*
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd新农场
15 6,16 * * * jd_fruit_new.js

*/
const $ = new Env('新农场任务');
const _0x448281 = 100;

let _0x3bc8a0 = false,
    _0x3a1001 = [],
    _0x2dcc2b = "",
    _0x4222c8,
    _0x500bca,
    _0x4e2a6e = "",
    _0x22ed8a = "",
    _0x13f70a = "",
    _0x53c829 = {},
    _0xd54075 = false,
    _0x6ddc5e = 0;

const _0xfd4dd5 = "https://api.m.jd.com/client.action",
    _0xabe58d = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
    _0x223f5a = process.env.FRUIT_ID ? process.env.FRUIT_ID : "",
    _0x4ae99f = require("./USER_AGENTS"),
    _0x473d9b = require("fs"),
    _0x5d1cd4 = require("./function/dylanz"),
    _0x1724ec = require("./function/dylanv");

if (process.env.DY_PROXY) {
    const _0x531c98 = require("./function/proxy.js");

    $.get = _0x531c98.intoRequest($.get.bind($));
    $.post = _0x531c98.intoRequest($.post.bind($));
}

let _0x5a09c9 = [];
$.reqnum = 1;
const _0x45a285 = {
    farm_home: "c57f6",
    farm_do_task: "28981",
    farm_task_receive_award: "33e0f",
    farm_water: "28981",
    farm_assist_receive_award: "c4332"
};
const _0x4606ad = {
    wheelsHome: "c06b7",
    wheelsLottery: "bd6c8",
    apsDoTask: "54ed7"
};
!(async () => {
    await _0x3670aa();

    if (!_0x3a1001[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：2023/11/05 fix");
    $.log("问题建议：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量：");
    $.log("export DY_PROXY='api_url' 可使用代理API");
    $.log("export FRUIT_ID='UID' 未种植可设置作物UID来种\n");
    process.env.NO_WATER == "true" && 0 ? (_0x4e2a6e = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x4e2a6e = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));

    for (let _0x312104 = 0; _0x312104 < _0x3a1001.length; _0x312104++) {
        if (_0x3a1001[_0x312104]) {
            _0x2dcc2b = _0x3a1001[_0x312104];
            $.UserName = decodeURIComponent(_0x2dcc2b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2dcc2b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x312104 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.farmInfo = "";
            ct = 0;
            await _0x11fd92();
            console.log("------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

            if (!$.isLogin) {
                const _0x7d60af = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x7d60af);
                $.isNode() && (await _0x4222c8.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x22ed8a = "";
            _0x13f70a = "";
            _0x53c829 = {};
            $.UA = _0x4ae99f.UARAM();
            await _0x274482();
            await $.wait(2000);
        }
    }

    _0x473d9b.writeFile("./fruit_helpcode_new", JSON.stringify(_0x5a09c9), _0x35a2a9 => {
        _0x35a2a9 && console.log(_0x35a2a9);
    });

    $.isNode() && _0x4e2a6e && $.ctrTemp && (await _0x4222c8.sendNotify("" + $.name, "" + _0x4e2a6e));
})().catch(_0x5e6808 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5e6808 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x274482() {
    _0x13f70a = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x4794d4();
        await $.wait(500);

        if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
            _0x22ed8a = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
            console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
            console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
            _0x22ed8a += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";

            _0x5a09c9.push($.farmInfo.data.result.farmHomeShare.inviteCode);

            if ($.farmInfo.data.result.treeFullStage === 5) {
                _0x53c829["open-url"] = _0xabe58d;
                $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x53c829);
                $.isNode() && (await _0x4222c8.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看"));
                return;
            } else {
                $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"), _0x22ed8a += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n");
            }

            await _0x460014();
            await _0x226d86();
            await _0x3769ea();

            if (process.env.DO_TEN_WATER_AGAIN != "true" || 1) {
                $.log("执行继续浇水...");
                await _0x5df64a();
            } else {
                $.log("不执行再次浇水，攒水滴!");
            }

            _0x22ed8a += "【剩余水滴】" + _0x6ddc5e + "g💧\n";
        } else {
            if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
                console.log("没有种植水果，请在下面列表确定种植的作物，设置变量（作物的UID)再次运行即可种植");
                await _0x29ef5b();

                if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                    console.log("===============商品名称----UID=================");

                    for (let _0x2f0847 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
                        console.log(_0x2f0847.skuName + "----" + _0x2f0847.uid);
                    }
                }

                if (_0x223f5a) {
                    console.log("\n\n已设置种植目标，开始种植。。。");
                    await _0x1a3b11(_0x223f5a);

                    if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
                        console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
                        return;
                    }
                }

                $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
                $.isNode() && (await _0x4222c8.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
                return;
            } else {
                console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n");
                _0x22ed8a = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
            }
        }
    } catch (_0x40e413) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
        $.logErr(_0x40e413);
    }

    await _0x4688f3();
}

async function _0x3769ea() {
    await _0x1d3d40();
    console.log("\n开始日常任务...");

    for (let _0x12b261 of $.farmTask.data.result.taskList) {
        if (_0x12b261.taskStatus == 3) {
            console.log(_0x12b261.mainTitle + "已完成");
            continue;
        }

        console.log("去做 " + _0x12b261.mainTitle);

        if (_0x12b261.taskStatus == 2) {
            await _0x1466c7(_0x12b261.taskType, _0x12b261.taskId);
            $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
            continue;
        }

        switch (_0x12b261.taskType) {
            case "CUMULATIVE_TIMES":
                break;

            case "ORDER_MARK":
                break;

            case "EXTERNAL_BROWSE":
            case "BROWSE_CHANNEL":
            case "BROWSE_PRODUCT":
                if (!_0x12b261.taskSourceUrl) {
                    await _0x4d7a05(_0x12b261.taskType, _0x12b261.taskId);
                    let _0x3f1b83 = $.taskDetail.data.result.taskDetaiList;
                    _0x12b261.taskSourceUrl = _0x3f1b83[Math.floor(Math.random() * _0x3f1b83.length)].itemId;
                }

                await _0x3528f4(_0x12b261.taskType, _0x12b261.taskId, Buffer.from(_0x12b261.taskSourceUrl).toString("base64"));
                await $.wait(_0x12b261.timePeriod * 1000);
                await _0x1466c7(_0x12b261.taskType, _0x12b261.taskId);
                $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
                break;

            default:
                console.log(_0x12b261.taskType + " 类型未支持");
                break;
        }
    }

    await _0x1284a5();
    await _0x21d81d();
}

async function _0x51de84() {
    console.log("开始预测水果成熟时间...\n");
    await initForFarm();

    if (!$.farmInfo.farmUserPro) {
        await initForFarm();
    }

    await _0x1d3d40();
    let _0x29a599 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x22ed8a += "【今日共浇水】" + _0x29a599 + "次\n";
    _0x22ed8a += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
    _0x22ed8a += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";

    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) {
        _0x22ed8a += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";
    } else {
        $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x22ed8a += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");
    }

    let _0x102ac6 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

    if (_0x29a599 > 2) {
        let _0x51b955 = Math.ceil(_0x102ac6 / _0x29a599) || 0;

        _0x22ed8a += "【预测】" + (_0x51b955 === 1 ? "明天" : _0x51b955 === 2 ? "后天" : _0x51b955 + "天之后") + "(" + _0x94ff33(86400000 * _0x51b955 + Date.now()) + "日)可兑换水果🍉\n";
    } else {
        _0x22ed8a += "【预测】不浇水无限期\n";
    }
}

async function _0x226d86() {
    await _0x1d3d40();

    if ($.farmTask.data.result.taskList[0].taskStatus == 1) {
        console.log("\n准备浇水十次");
        _0xd54075 = false;

        for (let _0x6ff471 = 0; _0x6ff471 < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x6ff471++) {
            console.log("第" + (_0x6ff471 + 1) + "次浇水");
            await _0x116c32(1);

            if ($.waterResult.code === 0) {
                console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);

                if ($.waterResult.data.result.finished) {
                    _0xd54075 = true;
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

            _0x6ddc5e = $.waterResult.data.result.bottleWater;
        }

        _0xd54075 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP查看"), $.done(), $.isNode() && (await _0x4222c8.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
    } else {
        console.log("\n今日已完成10次浇水任务\n");
    }
}

async function _0x5df64a() {
    console.log("检查剩余水滴能否继续浇水...\n");
    await _0x4794d4();
    _0x6ddc5e = $.farmInfo.data.result.bottleWater;
    console.log("剩余水滴" + _0x6ddc5e + "g\n");

    let _0x25e6bd = _0x6ddc5e - _0x448281;

    if (_0x25e6bd >= 10) {
        $.log("\n开始浇水...");
        console.log("目前剩余水滴：" + _0x6ddc5e + "g，可继续浇水");
        _0xd54075 = false;

        for (let _0x487f29 = 0; _0x487f29 < parseInt(_0x25e6bd / 10); _0x487f29++) {
            $.log("浇水" + (_0x487f29 + 1) + "次");
            await _0x116c32(1);

            if ($.waterResult.code === 0) {
                console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");

                if ($.waterResult.data.result.finished) {
                    _0xd54075 = true;
                    $.log("水果已成熟啦！\n");
                    break;
                }
            } else {
                console.log("浇水出现失败异常,跳出不在继续浇水");
                break;
            }
        }

        _0x6ddc5e = $.waterResult.data.result.bottleWater;
    } else {
        console.log("目前剩余水滴：【" + _0x6ddc5e + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
    }

    if (_0xd54075) {
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP或微信小程序查看");
        $.done();
        $.isNode() && (await _0x4222c8.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧"));
    }
}

function _0x22af6d() {
    return new Promise(async _0x138895 => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
            console.log("果树发芽了,奖励30g💧");
            await _0x18d983("1");
            console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
            $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");
        } else {
            if ($.waterResult.waterStatus === 1) {
                console.log("果树开花了,奖励40g💧");
                await _0x18d983("2");
                console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
                $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
            } else {
                $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g💧"), await _0x18d983("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
            }
        }

        _0x138895();
    });
}

async function _0x21d81d() {
    await _0x4b70ed();

    if ($.initForTurntableFarmRes.code === 0) {
        console.log("\n开始天天抽奖任务...");
        await _0x3af4d3();

        if ($.wheeltaskRes.code == 0) {
            for (let _0x3ea988 of $.wheeltaskRes.data) {
                if (_0x3ea988.taskFinished) {
                    console.log(_0x3ea988.taskTitle + "----" + _0x3ea988.taskShowTitle + " 已完成");
                    continue;
                }

                await _0xdaf3b0(_0x3ea988.taskType, _0x3ea988.id, _0x3ea988.taskSourceUrl);
                $.wheeldoRes.code == 0 && console.log("任务完成，获得1次抽奖机会");
                await $.wait(1000);
            }
        }

        await _0x4b70ed();

        if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
            console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
            console.log("开始抽奖...");
            let _0x282f92 = "";

            for (let _0x13bb5f = 0; _0x13bb5f < $.initForTurntableFarmRes.data.lotteryChances; _0x13bb5f++) {
                await _0x8ef7b5();
                await $.wait(1000);
                console.log("第" + (_0x13bb5f + 1) + "次抽奖");

                if ($.lotteryRes.code === 0) {
                    _0x282f92 += $.lotteryRes.data.prizeName + "，";

                    if ($.lotteryRes.data.lotteryChances === 0) {
                        break;
                    }
                }
            }

            _0x282f92 && console.log("天天抽奖奖励：" + _0x282f92.substr(0, _0x282f92.length - 1) + "\n");
        } else {
            console.log("天天抽奖无次数！");
        }
    } else {
        console.log("初始化天天抽奖得好礼失败！");
    }
}

async function _0x1284a5() {
    await _0x38aab7();

    if ($.farmAssistResult.code === 0) {
        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 2) {
            if ($.farmAssistResult.data.result.status === 2) {
                let _0x151872 = 0;

                for (let _0x4a40b4 of Object.keys($.farmAssistResult.data.result.assistStageList)) {
                    let _0x4e9b8e = $.farmAssistResult.data.result.assistStageList[_0x4a40b4];
                    _0x4e9b8e.stageStaus === 2 && (await _0x49233d(), await $.wait(500), $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x4a40b4) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x151872 += $.receiveStageEnergy.data.result.amount));
                }

                _0x22ed8a += "【额外奖励】" + _0x151872 + "g💧领取完成\n";
                console.log("【额外奖励】" + _0x151872 + "g💧领取完成\n");
            } else {
                $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x22ed8a += "【额外奖励】已领取过\n");
            }
        } else {
            console.log("助力好友未达到2个");
            _0x22ed8a += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";
        }

        if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
            let _0x5a9692 = "";
            $.farmAssistResult.data.result.assistFriendList.map((_0x579acd, _0x284524) => {
                _0x284524 === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x5a9692 += _0x579acd.nickname || "匿名用户" : _0x5a9692 += (_0x579acd.nickname || "匿名用户") + ",";

                let _0x2299c6 = new Date(_0x579acd.time),
                    _0x5b1a8b = _0x2299c6.getFullYear() + "/" + ("0" + (_0x2299c6.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x2299c6.getDate()).slice(-2) + " " + ("0" + _0x2299c6.getHours()).slice(-2) + ":" + ("0" + _0x2299c6.getMinutes()).slice(-2) + ":" + ("0" + _0x2299c6.getSeconds()).slice(-2);

                console.log("【" + (_0x579acd.nickname || "匿名用户") + "】 在 " + _0x5b1a8b + " 给您助过力");
            });
            _0x22ed8a += "【助力您的好友】" + _0x5a9692 + "\n";
        }

        console.log("\n领取额外奖励水滴结束\n");
    } else {
        await _0x24846e();

        if ($.masterHelpResult.code === "0") {
            $.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5 ? !$.masterHelpResult.masterGotFinal ? (await _0x2ad2fb(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x22ed8a += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), _0x22ed8a += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), _0x22ed8a += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");

            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x32e38a = "";
                $.masterHelpResult.masterHelpPeoples.map((_0x106e3f, _0x5b0f4c) => {
                    _0x5b0f4c === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x32e38a += _0x106e3f.nickName || "匿名用户" : _0x32e38a += (_0x106e3f.nickName || "匿名用户") + ",";

                    let _0xc490b4 = new Date(_0x106e3f.time),
                        _0x2f8c1d = _0xc490b4.getFullYear() + "-" + (_0xc490b4.getMonth() + 1) + "-" + _0xc490b4.getDate() + " " + _0xc490b4.getHours() + ":" + _0xc490b4.getMinutes() + ":" + _0xc490b4.getMinutes();

                    console.log("【" + (_0x106e3f.nickName || "匿名用户") + "】 在 " + _0x2f8c1d + " 给您助过力");
                });
                _0x22ed8a += "【助力您的好友】" + _0x32e38a + "\n";
            }

            console.log("领取额外奖励水滴结束\n");
        }
    }
}

async function _0x5c8e83() {
    let _0x4f4df4 = !$.farmTask.waterRainInit.f;

    _0x4f4df4 ? (console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否")), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 10800000 && (_0x4f4df4 = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n")), _0x4f4df4 && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x252675(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")))) : console.log("【水滴雨】已全部完成\n");
}

async function _0x460014() {
    await _0xcf89b3();
    $.clockInInit.code === 0 && $.clockInInit.data.signInFlag == 0 && (console.log("开始今日签到"), await _0xa5f3dc(), $.clockInForFarmRes.code === 0 ? console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n") : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)));
}

async function _0x12f198() {
    await _0x497f26();
    console.log("\n开始给好友浇水...");
    await _0x1d3d40();
    const {
        waterFriendCountKey: _0x46e947,
        waterFriendMax: _0x839430
    } = $.farmTask.waterFriendTaskInit;
    console.log("今日已给" + _0x46e947 + "个好友浇水");

    if (_0x46e947 < _0x839430) {
        let _0xde7520 = [];

        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x355770, _0x2d74d5) => {
                _0x355770.friendState === 1 && _0xde7520.length < _0x839430 - _0x46e947 && _0xde7520.push(_0x355770.shareCode);
            });
            _0xde7520.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0xde7520));
            _0xde7520.length == 0 && console.log("没有需要浇水的好友!\n");
            let _0x5c8796 = 0,
                _0x47687c = "";

            for (let _0x2c1bb6 = 0; _0x2c1bb6 < _0xde7520.length; _0x2c1bb6++) {
                await _0x46f5cc(_0xde7520[_0x2c1bb6]);
                console.log("为第" + (_0x2c1bb6 + 1) + "个好友浇水");

                if ($.waterFriendForFarmRes.code === "0") {
                    _0x5c8796++;

                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log("为好友浇水获得道具了");

                        if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") {
                            console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                            _0x47687c += "水滴换豆卡,";
                        } else {
                            if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") {
                                console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                _0x47687c += "快速浇水卡,";
                            } else {
                                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") {
                                    console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
                                    _0x47687c += "水滴翻倍卡,";
                                } else {
                                    $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x47687c += "加签卡,");
                                }
                            }
                        }
                    }
                } else {
                    $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
                }
            }

            _0x5c8796 > 0 && console.log("已给" + _0x5c8796 + "个好友浇水,消耗" + _0x5c8796 * 10 + "g水\n");
            _0x47687c && _0x47687c.length > 0 && console.log("【好友浇水奖励】" + _0x47687c.substr(0, _0x47687c.length - 1) + "\n");
        } else {
            console.log("好友列表无好友,快去邀请您的好友吧!\n");
        }
    } else {
        console.log("今日已为" + _0x839430 + "个好友浇水\n");
    }
}

async function _0x2c0d63() {
    await _0x1d3d40();
    const {
        waterFriendCountKey: _0x50e3f2,
        waterFriendMax: _0x5343f0,
        waterFriendSendWater: _0x3216f9,
        waterFriendGotAward: _0x52225d
    } = $.farmTask.waterFriendTaskInit;
    _0x50e3f2 >= _0x5343f0 ? !_0x52225d ? (await _0x1a860f(), $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n")) : console.log("给好友浇水的水滴奖励已领取\n") : console.log("给" + _0x5343f0 + "个好友浇水未完成\n");
}

async function _0x2ee5b0() {
    for (let _0x559767 of _0x500bca) {
        if (_0x559767 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        await _0x4469d1(_0x559767);

        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
            console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
        } else {
            $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
        }
    }
}

async function _0x228d4a() {
    for (let _0x570936 = 0; _0x570936 < 10; _0x570936++) {
        const _0x55d3a9 = {
            type: 2,
            version: 24,
            channel: 1,
            babelChannel: "121"
        };
        $.duckRes = await _0x47401c("getFullCollectionReward", _0x55d3a9);

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

async function _0x4feac9() {
    $.totalWaterReward = await _0x47401c("totalWaterTaskForFarm");
}

async function _0x398ba5() {
    $.firstWaterReward = await _0x47401c("firstWaterTaskForFarm");
}

async function _0x2d17fb() {
    const _0x539123 = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.newtaskinfo = await _0x47401c("gotNewUserTaskForFarm", _0x539123);
}

async function _0x4f7828() {
    const _0x2edb1f = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.newtaskinfo = await _0x47401c("gotLowFreqWaterForFarm", _0x2edb1f);
}

async function _0x4794d4() {
    const _0x5c0826 = {
        version: 1
    };
    $.farmInfo = await _0x47401c("farm_home", _0x5c0826);
}

async function _0x1a860f() {
    const _0x149bee = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterFriendGotAwardRes = await _0x47401c("waterFriendGotAwardForFarm", _0x149bee);
}

async function _0x3045ca() {
    const _0x21fdad = {
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.myCardInfoRes = await _0x47401c("myCardInfoForFarm", _0x21fdad);
}

async function _0x2653de(_0x3cc922) {
    const _0x3b47a0 = {
        cardType: _0x3cc922
    };
    $.userMyCardRes = await _0x47401c("userMyCardForFarm", _0x3b47a0);
}

async function _0x18d983(_0x225e71) {
    const _0x1fa3af = {
        type: _0x225e71
    };
    $.gotStageAwardForFarmRes = await _0x47401c("gotStageAwardForFarm", _0x1fa3af);
}

async function _0x116c32(_0x4db26d) {
    await $.wait(1000);
    const _0x28af9f = {
        version: 1,
        waterType: _0x4db26d
    };
    $.waterResult = await _0x47401c("farm_water", _0x28af9f);
}

async function _0x4b70ed() {
    const _0x440740 = {
        linkId: "VssYBUKJOen7HZXpC8dRFA"
    };
    $.initForTurntableFarmRes = await _0x57e151("wheelsHome", _0x440740);
}

async function _0x3af4d3() {
    const _0x12c5df = {
        linkId: "VssYBUKJOen7HZXpC8dRFA"
    };
    $.wheeltaskRes = await _0x57e151("apTaskList", _0x12c5df);
}

async function _0xdaf3b0(_0x508ffa, _0x4c2209, _0x4cecb0) {
    const _0x1041c6 = {
        taskType: _0x508ffa,
        taskId: _0x4c2209,
        channel: 4,
        checkVersion: true,
        linkId: "VssYBUKJOen7HZXpC8dRFA",
        itemId: _0x4cecb0
    };
    $.wheeldoRes = await _0x57e151("apsDoTask", _0x1041c6);
}

async function _0x8ef7b5() {
    const _0x2c67f7 = {
        linkId: "VssYBUKJOen7HZXpC8dRFA"
    };
    $.lotteryRes = await _0x57e151("wheelsLottery", _0x2c67f7);
}

async function _0x29ef5b() {
    const _0x32197e = {
        version: 1
    };
    $.treeboardRes = await _0x47401c("farm_tree_board", _0x32197e);
}

async function _0x1a3b11(_0x23dfc2) {
    const _0x426cdf = {
        version: 1,
        uid: _0x23dfc2
    };
    $.planttreeRes = await _0x47401c("farm_plant_tree", _0x426cdf);
}

async function _0x380faa(_0x59f651) {
    const _0x46e132 = {
        type: 2,
        adId: _0x59f651,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.browserForTurntableFarm2Res = await _0x47401c("browserForTurntableFarm", _0x46e132);
}

async function _0x448066() {
    const _0x5cb67f = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-3",
        babelChannel: "3",
        version: 24,
        channel: 1
    };
    $.lotteryMasterHelpRes = await _0x47401c("initForFarm", _0x5cb67f);
}

async function _0x2ad2fb() {
    $.masterGotFinished = await _0x47401c("masterGotFinishedTaskForFarm");
}

async function _0x24846e() {
    $.masterHelpResult = await _0x47401c("masterHelpTaskInitForFarm");
}

async function _0x38aab7() {
    const _0x27c451 = {
        version: 1
    };
    $.farmAssistResult = await _0x47401c("farm_assist_init_info", _0x27c451);
}

async function _0x49233d() {
    const _0x357143 = {
        version: 1
    };
    $.receiveStageEnergy = await _0x47401c("farm_assist_receive_award", _0x357143);
}

async function _0x4469d1() {
    $.inviteFriendRes = await _0x47401c("initForFarm", {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-inviteFriend",
        version: 4,
        channel: 2
    });
}

async function _0x53fccc() {
    const _0x602cd9 = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0],
        babelChannel: "3",
        version: 2,
        channel: 1
    };
    $.helpResult = await _0x47401c("initForFarm", _0x602cd9);
}

async function _0x252675() {
    const _0x4cc183 = {
        type: 1,
        hongBaoTimes: 100,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterRain = await _0x47401c("waterRainForFarm", _0x4cc183);
}

async function _0xcf89b3() {
    const _0x37d7c0 = {
        linkId: "LCH-fV7hSnChB-6i5f4ayw"
    };
    $.clockInInit = await _0x57e151("dongDongFarmSignHome", _0x37d7c0);
}

async function _0xa5f3dc() {
    const _0x4212ab = {
        linkId: "LCH-fV7hSnChB-6i5f4ayw"
    };
    $.clockInForFarmRes = await _0x57e151("dongDongFarmSignIn", _0x4212ab);
}

async function _0x34fb6c(_0x20b1ec, _0x2e7830, _0x36af78) {
    const _0x4fd777 = "clockInFollowForFarm",
        _0x1fb6f8 = {
            id: _0x20b1ec,
            type: _0x2e7830,
            step: _0x36af78
        };

    if (_0x2e7830 === "theme") {
        if (_0x36af78 === "1") {
            $.themeStep1 = await _0x47401c(_0x4fd777, _0x1fb6f8);
        } else {
            _0x36af78 === "2" && ($.themeStep2 = await _0x47401c(_0x4fd777, _0x1fb6f8));
        }
    } else {
        if (_0x2e7830 === "venderCoupon") {
            if (_0x36af78 === "1") {
                $.venderCouponStep1 = await _0x47401c(_0x4fd777, _0x1fb6f8);
            } else {
                _0x36af78 === "2" && ($.venderCouponStep2 = await _0x47401c(_0x4fd777, _0x1fb6f8));
            }
        }
    }
}

async function _0x30cbb8() {
    const _0x42a729 = {
        type: 2,
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.gotClockInGiftRes = await _0x47401c("clockInForFarm", _0x42a729);
}

async function _0x58d73c() {
    $.threeMeal = await _0x47401c("gotThreeMealForFarm");
}

async function _0x3528f4(_0x2e0349, _0x1c2a6a, _0x4644f5) {
    const _0x32a6c6 = {
        version: 1,
        taskType: _0x2e0349,
        taskId: _0x1c2a6a,
        taskInsert: true,
        itemId: _0x4644f5,
        channel: 0
    };
    $.browseResult = await _0x47401c("farm_do_task", _0x32a6c6);
}

async function _0x1466c7(_0x71af8b, _0x5ea6fc) {
    const _0x31bed5 = {
        version: 1,
        taskType: _0x71af8b,
        taskId: _0x5ea6fc,
        channel: 0
    };
    $.dotaskResult = await _0x47401c("farm_task_receive_award", _0x31bed5);
}

async function _0x4d7a05(_0x55ad87, _0x455072) {
    const _0x4b94ac = {
        version: 1,
        taskType: _0x55ad87,
        taskId: _0x455072,
        channel: 0
    };
    $.taskDetail = await _0x47401c("farm_task_detail", _0x4b94ac);
}

async function _0x444ede() {
    const _0x4f9b6c = {
        type: 3
    };
    $.goalResult = await _0x47401c("gotWaterGoalTaskForFarm", _0x4f9b6c);
}

async function _0x1d3d40() {
    const _0x12f1d2 = {
        version: 1,
        channel: 0
    };
    $.farmTask = await _0x47401c("farm_task_list", _0x12f1d2);
}

async function _0x2d6a61() {
    const _0x47b177 = {
        version: 24,
        channel: 1,
        babelChannel: "45",
        lat: "0",
        lng: "0"
    };
    $.farmTask = await _0x47401c("taskInitForFarm", _0x47b177);
}

async function _0x497f26() {
    const _0x57bbe7 = {
        version: 24,
        channel: 1,
        babelChannel: "121",
        lat: "0",
        lng: "0"
    };
    $.friendList = await _0x47401c("friendListInitForFarm", _0x57bbe7);
}

async function _0x49e8bb() {
    $.awardInviteFriendRes = await _0x47401c("awardInviteFriendForFarm");
}

async function _0x46f5cc(_0x3b3ab9) {
    const _0x356378 = {
        shareCode: _0x3b3ab9,
        version: 24,
        channel: 1,
        babelChannel: "121"
    };
    $.waterFriendForFarmRes = await _0x47401c("waterFriendForFarm", _0x356378);
}

async function _0x4688f3() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else {
        $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + _0x3bc8a0 === "false";
    }

    $.ctrTemp ? ($.msg($.name, _0x13f70a, _0x22ed8a, _0x53c829), $.isNode() && (_0x4e2a6e += _0x13f70a + "\n" + _0x22ed8a + ($.index !== _0x3a1001.length ? "\n\n" : ""))) : $.log("\n" + _0x22ed8a + "\n");
}

function _0x94ff33(_0xb15d90) {
    let _0x591757;

    _0xb15d90 ? _0x591757 = new Date(_0xb15d90) : _0x591757 = new Date();
    return _0x591757.getFullYear() + "-" + (_0x591757.getMonth() + 1 >= 10 ? _0x591757.getMonth() + 1 : "0" + (_0x591757.getMonth() + 1)) + "-" + (_0x591757.getDate() >= 10 ? _0x591757.getDate() : "0" + _0x591757.getDate());
}

function _0x3670aa() {
    return new Promise(_0x3f1975 => {
        console.log("开始获取配置文件\n");
        _0x4222c8 = $.isNode() ? require("./sendNotify") : "";

        const _0x15d589 = $.isNode() ? require("./jdCookie.js") : "";

        if ($.isNode()) {
            Object.keys(_0x15d589).forEach(_0xb78197 => {
                _0x15d589[_0xb78197] && _0x3a1001.push(_0x15d589[_0xb78197]);
            });

            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
                console.log = () => { };
            }
        } else {
            _0x3a1001 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4cecbc($.getdata("CookiesJD") || "[]").map(_0x512843 => _0x512843.cookie)].filter(_0x463208 => !!_0x463208);
        }

        _0x3f1975();
    });
}

async function _0x3b1ad7() {
    const _0x56dab6 = {
        type: 1,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };
    await _0x47401c("ddnc_getTreasureBoxAward", _0x56dab6);
    await $.wait(500);
    await _0x34cac4();
    await $.wait(2000);
    const _0x16c6ea = {
        type: 2,
        babelChannel: "121",
        line: "getBean",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };

    let _0x3dc07d = await _0x47401c("ddnc_getTreasureBoxAward", _0x16c6ea);

    return _0x3dc07d;
}

async function _0x260a14() {
    const _0x4bd42e = {
        type: 1,
        babelChannel: "121",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };
    await _0x47401c("ddnc_getTreasureBoxAward", _0x4bd42e);
    await $.wait(500);
    await _0x2d6a61();
    await $.wait(2000);
    const _0x229bbd = {
        type: 2,
        babelChannel: "45",
        version: 24,
        channel: 1,
        lat: "0",
        lng: "0"
    };

    let _0x24bbee = await _0x47401c("ddnc_getTreasureBoxAward", _0x229bbd);

    return _0x24bbee;
}

function _0x34cac4() {
    return new Promise(_0x2130bb => {
        const _0x1ac307 = {
            Cookie: _0x2dcc2b,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x509234 = {
            url: "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
            headers: _0x1ac307,
            timeout: 10000
        };
        $.get(_0x509234, (_0x3c4b22, _0x3ddac8, _0x199bb9) => {
            _0x2130bb();
        });
    });
}

function _0x11fd92() {
    return new Promise(_0x356146 => {
        const _0x13625c = {
            Cookie: _0x2dcc2b,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x23e8b1 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x13625c,
            timeout: 10000
        };
        $.get(_0x23e8b1, (_0x4ddd86, _0x4a553d, _0x127f12) => {
            try {
                if (_0x127f12) {
                    _0x127f12 = JSON.parse(_0x127f12);

                    if (!(_0x127f12.islogin === "1")) {
                        _0x127f12.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x4ec829) {
                console.log(_0x4ec829);
            } finally {
                _0x356146();
            }
        });
    });
}

async function _0x47401c(_0x33ab8d, _0x35dea2 = {}, _0x234e9e = 1500) {
    $.reqnum++;

    if (_0x45a285[_0x33ab8d]) {
        let _0x5af9c3 = {
            appId: _0x45a285[_0x33ab8d],
            fn: _0x33ab8d,
            body: _0x35dea2,
            apid: "signed_wh5",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
        _0x35dea2 = await _0x1724ec.getbody(_0x5af9c3);
    } else {
        _0x35dea2 = "functionId=" + _0x33ab8d + "&body=" + encodeURIComponent(JSON.stringify(_0x35dea2)) + "&appid=signed_wh5";
    }

    return new Promise(_0x11d7b0 => {
        setTimeout(() => {
            $.get(_0x133556(_0x35dea2), (_0x536a0e, _0x4f2afe, _0x1fd96d) => {
                try {
                    _0x536a0e ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x536a0e)), console.log("function_id:" + _0x33ab8d), $.logErr(_0x536a0e)) : _0x505861(_0x1fd96d) && (_0x1fd96d = JSON.parse(_0x1fd96d));
                } catch (_0xf0048e) {
                    $.logErr(_0xf0048e, _0x4f2afe);
                } finally {
                    _0x11d7b0(_0x1fd96d);
                }
            });
        }, _0x234e9e);
    });
}

async function _0x57e151(_0xb88676, _0x4d7182 = {}, _0x330514 = 1500) {
    $.reqnum++;

    if (_0x4606ad[_0xb88676]) {
        let _0x1499d9 = {
            appId: _0x4606ad[_0xb88676],
            fn: _0xb88676,
            body: _0x4d7182,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
        _0x4d7182 = await _0x5d1cd4.getbody(_0x1499d9);
    } else {
        _0x4d7182 = "functionId=" + _0xb88676 + "&body=" + encodeURIComponent(JSON.stringify(_0x4d7182)) + "&appid=activities_platform";
    }

    return new Promise(_0x5899c7 => {
        setTimeout(() => {
            $.post(_0x3fabd4(_0x4d7182), (_0x274b34, _0x4664a3, _0x1e5e45) => {
                try {
                    if (_0x274b34) {
                        console.log("\n东东农场: API查询请求失败 ‼️‼️");
                        console.log(JSON.stringify(_0x274b34));
                        console.log("function_id:" + _0xb88676);
                        $.logErr(_0x274b34);
                    } else {
                        _0x505861(_0x1e5e45) && (_0x1e5e45 = JSON.parse(_0x1e5e45));
                    }
                } catch (_0x6ccd5f) {
                    $.logErr(_0x6ccd5f, _0x4664a3);
                } finally {
                    _0x5899c7(_0x1e5e45);
                }
            });
        }, _0x330514);
    });
}

function _0x505861(_0x23e473) {
    try {
        if (typeof JSON.parse(_0x23e473) == "object") {
            return true;
        }
    } catch (_0x3c8575) {
        console.log(_0x3c8575);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x133556(_0x2fc355 = {}) {
    const _0x2509af = {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://h5.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://h5.m.jd.com/",
        Cookie: _0x2dcc2b
    };
    const _0x231b61 = {
        url: _0xfd4dd5 + "?" + _0x2fc355,
        headers: _0x2509af,
        timeout: 30000
    };
    return _0x231b61;
}

function _0x3fabd4(_0x27d523 = {}) {
    const _0x1eb185 = {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://pro.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://pro.m.jd.com/",
        Cookie: _0x2dcc2b
    };
    const _0x23215e = {
        url: "" + _0xfd4dd5,
        body: _0x27d523,
        headers: _0x1eb185,
        timeout: 30000
    };
    return _0x23215e;
}

function _0x555560(_0x140af3, _0x421746 = {}) {
    const _0x503575 = {
        Host: "api.m.jd.com",
        Accept: "*/*",
        Origin: "https://carry.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.UA,
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Referer: "https://carry.m.jd.com/",
        Cookie: _0x2dcc2b
    };
    const _0x523dee = {
        url: _0xfd4dd5 + "?" + _0x421746,
        headers: _0x503575,
        timeout: 10000
    };
    return _0x523dee;
}

function _0x4cecbc(_0x32b133) {
    if (typeof _0x32b133 == "string") {
        try {
            return JSON.parse(_0x32b133);
        } catch (_0x12e455) {
            console.log(_0x12e455);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }