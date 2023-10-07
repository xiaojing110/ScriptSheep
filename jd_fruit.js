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

let _0x25d9ff = [],
    _0x759bd8 = '',
    _0x371657,
    _0x44d039,
    _0x2ce417 = '',
    _0x573b56 = '',
    _0x380a87 = '',
    _0x10b465 = {},
    _0x412f56 = false,
    _0x13dfd1;
const _0x337aaf = 'https://api.m.jd.com/client.action',
    _0x349b8e = 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D',
    _0x24de6e = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 2000,
    _0x332d09 = process.env.FRUIT_PIN ? decodeURIComponent(process.env.FRUIT_PIN) : '',
    _0x3d7378 = require('./USER_AGENTS'),
    _0xd4c0b2 = require('fs'),
    _0x46aea6 = require('./function/dylany');
if (process.env.DY_PROXY) {
    const _0x57e4fa = require('./function/proxy.js');
    $.get = _0x57e4fa.intoRequest($.get.bind($)), $.post = _0x57e4fa.intoRequest($.post.bind($));
}
let _0xa238c0 = [];
$.reqnum = 1;
const _0x4be267 = {};
_0x4be267.totalWaterTaskForFarm = '102f5', _0x4be267.gotThreeMealForFarm = '57b30', _0x4be267.browseAdTaskForFarm = '53f09', _0x4be267.clockInFollowForFarm = '4a0b4', _0x4be267.waterFriendForFarm = '673a0', _0x4be267.awardFirstFriendForFarm = '9b655', _0x4be267.limitWaterInitForFarm = '6bdc2', _0x4be267.ddnc_surpriseModal = 'e81c1', _0x4be267.friendInitForFarm = 'a5a9c', _0x4be267.waterGoodForFarm = '0c010', _0x4be267.firstWaterTaskForFarm = '0cf1e', _0x4be267.waterFriendGotAwardForFarm = 'd08ff', _0x4be267.ddnc_getTreasureBoxAward = '67dfc', _0x4be267.orderTaskGotWaterForFarm = 'eed5c', _0x4be267.clockInForFarm = '32b94', _0x4be267.awardInviteFriendForFarm = '2b5ca', _0x4be267.awardCallOrInviteFriendForFarm = 'b0b03', _0x4be267.getFullCollectionReward = '5c767', _0x4be267.getOrderPayLotteryWater = 'ef089', _0x4be267.receiveStageEnergy = '15507', _0x4be267.exchangeGood = '52963', _0x4be267.initForFarm = '8a2af', _0x4be267.userMyCardForFarm = '86ba5', _0x4be267.getCallUserCardForFarm = '2ca57', _0x4be267.deleteFriendForFarm = 'eaf91', _0x4be267.gotLowFreqWaterForFarm = '8172b', _0x4be267.choiceGoodsForFarm = '5f4ca', _0x4be267.gotCouponForFarm = 'b1515', _0x4be267.gotStageAwardForFarm = '81591', _0x4be267.followVenderForBrand = '71547', _0x4be267.clockInInitForFarm = '08dc3', _0x4be267.guideTaskAward = '59bc4', _0x4be267.farmAssistInit = '92354', _0x4be267.myCardInfoForFarm = '157b6', _0x4be267.gotPopFirstPurchaseTaskForFarm = 'd432f', _0x4be267.gotWaterGoalTaskForFarm = 'c901b', _0x4be267.gotNewUserTaskForFarm = 'de8f8';
const _0x11206e = _0x4be267;
!(async () => {
    await _0x4030d8();
    if (!_0x25d9ff[0]) {
        const _0xf8b69b = {};
        _0xf8b69b['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0xf8b69b);
        return;
    }
    $.log('\n当前版本：2023/9/23'), $.log('问题建议：https://t.me/dylan_jdpro\n'), $.log('\n环境变量：'), $.log('export DY_PROXY=\'api_url\' 可使用代理api'), $.log('export NO_WATER=\'true\' 完全不浇水，浇水任务不做了'), $.log('export FRUIT_PIN=\'pin1&pin2\' 不浇水的pin，多个&分隔，使用pin控制就不要使用NO_WATER'), $.log('export DO_TEN_WATER_AGAIN=\'true\' 攒水滴只交10次水，默认不攒水滴'), $.log('export FRUIT_FAST_CARD=\'true\' 使用快速浇水卡，水多可开启'), $.log('epxort FRUIT_DELAY=\'1000\',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）\n\n');
    process.env.NO_WATER == 'true' ? (_0x2ce417 = '【一水不缴模式已开启！】\n\n', $.log('【一水不缴模式已开启！】\n')) : process.env.DO_TEN_WATER_AGAIN == 'true' && (_0x2ce417 = '【攒水滴模式已开启，每天只浇水10次！】\n\n', $.log('【攒水滴模式已开启，每天只浇水10次！】\n'));
    for (let _0x54c30 = 0; _0x54c30 < _0x25d9ff.length; _0x54c30++) {
        if (_0x25d9ff[_0x54c30]) {
            _0x759bd8 = _0x25d9ff[_0x54c30], $.UserName = decodeURIComponent(_0x759bd8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x759bd8.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x54c30 + 1, $.isLogin = true, $.nickName = '', $.farmInfo = '', _0x13dfd1 = 0, await _0xb6bc18(), console.log('------------------【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '-------------------\n');
            if (!$.isLogin) {
                const _0x512e92 = {};
                _0x512e92['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x512e92);
                $.isNode() && (await _0x371657.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            _0x573b56 = '', _0x380a87 = '', _0x10b465 = {}, $.UA = _0x3d7378.UARAM ? _0x3d7378.UARAM() : _0x3d7378.USER_AGENT, await _0x2a0d5b(), await $.wait(2000);
        }
    }
    _0xd4c0b2.writeFile('./fruit_helpcode', JSON.stringify(_0xa238c0), _0x262d07 => {
        _0x262d07 && console.log(_0x262d07);
    }), $.isNode() && _0x2ce417 && $.ctrTemp && (await _0x371657.sendNotify('' + $.name, '' + _0x2ce417));
})().catch(_0x16438a => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x16438a + '!', '');
}).finally(() => {
    $.done();
});
async function _0x2a0d5b() {
    _0x380a87 = '【京东账号' + $.index + '🆔】' + ($.nickName || $.UserName);
    try {
        await _0x262f42(), await $.wait(500), await _0x28d805();
        if ($.farmInfo.farmUserPro) {
            _0x573b56 = '【水果名称】' + $.farmInfo.farmUserPro.name + '\n', console.log('\n【好友互助码】' + $.farmInfo.farmUserPro.shareCode), console.log('\n【已成功兑换水果】' + $.farmInfo.farmUserPro.winTimes + '次'), _0x573b56 += '【已兑换水果】' + $.farmInfo.farmUserPro.winTimes + '次\n', _0xa238c0.push($.farmInfo.farmUserPro.shareCode);
            if ($.farmInfo.farmUserPro.treeState === 2 || $.farmInfo.farmUserPro.treeState === 3) _0x10b465['open-url'] = _0x349b8e, $.msg($.name, '', '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【提醒⏰】' + $.farmInfo.farmUserPro.name + '已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达', _0x10b465), $.isNode() && (await _0x371657.sendNotify($.name + ' - 账号' + $.index + ' - ' + ($.nickName || $.UserName) + '水果已可领取', '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【提醒⏰】' + $.farmInfo.farmUserPro.name + '已可领取\n请去京东APP或微信小程序查看')); else {
                if ($.farmInfo.farmUserPro.treeState === 1) console.log('\n' + $.farmInfo.farmUserPro.name + '种植中...'); else {
                    if ($.farmInfo.farmUserPro.treeState === 0) {
                        _0x10b465['open-url'] = _0x349b8e, $.msg($.name, '', '【京东账号' + $.index + '】 ' + ($.nickName || $.UserName) + '\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达', _0x10b465);
                        $.isNode() && (await _0x371657.sendNotify($.name + ' - 您忘了种植新的水果', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果'));
                        return;
                    }
                }
            }
            $.farmInfo.farmUserPro.newOldState == '0' && (await _0x1a1a62(), $.newtaskinfo.addEnergy && console.log('\n获得' + $.newtaskinfo.addEnergy + 'g💧')), $.farmInfoI.lowFreqSendWater && (await _0x257572(), $.newtaskinfo.addWater && console.log('\n获得' + $.newtaskinfo.addWater + 'g💧')), await _0x508a35(), await _0x2c4bbe(), process.env.NO_WATER == 'true' || _0x332d09.includes($.UserName) ? $.log('\n已设置完全不浇水\n') : (await _0x50c026(), process.env.DO_TEN_WATER_AGAIN != 'true' ? ($.log('执行继续浇水...'), await _0x2df135()) : $.log('不执行再次浇水，攒水滴!')), await _0x42db69(), await _0x18b8d4(), await _0x52e658(), await _0x8d6003(), await $.wait(3000), await _0x465781();
        } else JSON.stringify($.farmInfoI).includes('winTexts') ? (console.log('初始化农场数据异常, 请确认此账号是否开通农场\n'), _0x573b56 = '【数据异常】请确认此账号是否开通农场\n\n') : (console.log('初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: ' + JSON.stringify($.farmInfoI) + '\n'), _0x573b56 = '【数据异常】请手动登录app查看此账号农场是否正常\n\n');
    } catch (_0x18d9a3) {
        console.log('任务执行异常，请检查执行日志 ‼️‼️\n\n'), $.logErr(_0x18d9a3);
        const _0x21b8e9 = '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n任务执行异常，请检查执行日志 ‼️‼️';
    }
    await _0x38e955();
}
async function _0x508a35() {
    await _0x3c032f(), console.log('被水滴砸中： ' + ($.farmInfo.todayGotWaterGoalTask.canPop ? '是' : '否'));
    $.farmInfo.todayGotWaterGoalTask.canPop && (await _0x1611a8(), $.goalResult.code === '0' && console.log('获得' + $.goalResult.addEnergy + 'g💧\n'));
    console.log('\n开始日常任务...');
    {
        let _0x3d438d = $.farmTask.gotBrowseTaskAdInit.userBrowseTaskAds,
            _0x4a4c09 = $.farmTask.businessImprovementInit ? $.farmTask.businessImprovementInit.busiImproveTasks : [],
            _0x4e4009 = 0,
            _0x281bd6 = 0,
            _0x4eceb1 = 0;
        if (!$.farmTask.gotThreeMealInit.f) await _0x4b4a98(), $.threeMeal.code === '0' ? (console.log('定时领水 获得' + $.threeMeal.amount + 'g💧\n'), _0x4e4009 += $.threeMeal.amount, _0x281bd6++) : console.log('定时领水失败:  ' + JSON.stringify($.threeMeal)); else { }
        if ($.farmTask.treasureBoxInit && !$.farmTask.treasureBoxInit.f) {
            console.log('' + $.farmTask.treasureBoxInit.taskMainTitle);
            let _0x516b6c = await _0x309825();
            _0x516b6c.code == 0 && ($.log('完成，获得' + _0x516b6c.waterGram + 'g💧\n'), _0x4e4009 += _0x516b6c.waterGram, _0x281bd6++);
        } else { }
        if ($.farmTask['treasureBoxInit-getBean'] && !$.farmTask['treasureBoxInit-getBean'].f) {
            console.log('' + $.farmTask['treasureBoxInit-getBean'].taskMainTitle);
            let _0x368224 = await _0xaea763();
            _0x368224.code == 0 && ($.log('完成，获得' + _0x368224.waterGram + 'g💧\n'), _0x4e4009 += _0x368224.waterGram, _0x281bd6++);
        } else { }
        _0x3d438d = _0x3d438d.concat(_0x4a4c09);
        for (let _0x3f3159 of _0x3d438d) {
            if (_0x3f3159.limit <= _0x3f3159.hadFinishedTimes) {
                if (_0x3f3159.mainTitle.includes('领奖')) {
                    await _0xaf07d1(_0x3f3159.advertId, 1, _0x3f3159.adType);
                    continue;
                }
                console.log(_0x3f3159.mainTitle + ' ---- 已完成');
                continue;
            }
            console.log('去做任务: ' + _0x3f3159.mainTitle), await _0xaf07d1(_0x3f3159.advertId, 0, _0x3f3159.adType), $.browseResult.code === '0' ? (console.log(_0x3f3159.mainTitle + ' 任务完成'), await _0xaf07d1(_0x3f3159.advertId, 1, _0x3f3159.adType), $.browseRwardResult.code === '0' ? (console.log('领取 ' + _0x3f3159.mainTitle + ' 任务奖励成功, 获得' + $.browseRwardResult.amount + 'g💧'), _0x4e4009 += $.browseRwardResult.amount, _0x281bd6++) : (_0x4eceb1++, console.log('领取奖励结果:  ' + JSON.stringify($.browseRwardResult)))) : (_0x4eceb1++, console.log('任务结果:   ' + JSON.stringify($.browseResult)));
        }
        if (_0x4eceb1 > 0) console.log('\n日常任务 完成' + _0x281bd6 + '个,失败' + _0x4eceb1 + ',获得' + _0x4e4009 + 'g💧\\n'); else _0x281bd6 > 0 && console.log('\n日常任务 完成' + _0x281bd6 + '个,获得' + _0x4e4009 + 'g💧\n');
    }
    !$.farmTask.waterFriendTaskInit.f ? $.farmTask.waterFriendTaskInit.waterFriendCountKey < $.farmTask.waterFriendTaskInit.waterFriendMax && (await _0x2380f2()) : console.log('给' + $.farmTask.waterFriendTaskInit.waterFriendMax + '个好友浇水任务已完成\n'), await _0x385022(), await _0xbbba10(), await _0x226713(), await _0x5c8e64();
}
async function _0x465781() {
    console.log('开始预测水果成熟时间...\n'), await _0x28d805();
    if (!$.farmInfo.farmUserPro) await _0x28d805();
    await _0x3c032f();
    let _0x102b00 = $.farmTask.firstWaterInit.totalWaterTimes;
    _0x573b56 += '【今日共浇水】' + _0x102b00 + '次\n', _0x573b56 += '【剩余水滴】' + $.farmInfo.farmUserPro.totalEnergy + 'g💧\n', _0x573b56 += '【水果进度】' + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + '%，已浇水' + $.farmInfo.farmUserPro.treeEnergy / 10 + '次,还需' + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + '次\n';
    if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x573b56 += '【开花进度】再浇水' + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + '次开花\n'; else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x573b56 += '【结果进度】再浇水' + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + '次结果\n');
    let _0x354805 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;
    if (_0x102b00 > 2) {
        let _0x3d6404 = Math.ceil(_0x354805 / _0x102b00) || 0;
        _0x573b56 += '【预测】' + (_0x3d6404 === 1 ? '明天' : _0x3d6404 === 2 ? '后天' : _0x3d6404 + '天之后') + '(' + _0x1a4e9e(86400000 * _0x3d6404 + Date.now()) + '日)可兑换水果🍉\n';
    } else _0x573b56 += '【预测】不浇水无限期\n';
}
async function _0x50c026() {
    jdFruitBeanCard = $.getdata('jdFruitBeanCard') ? $.getdata('jdFruitBeanCard') : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
    await _0x5a240e();
    const {
        fastCard: _0x3191c3,
        doubleCard: _0x13bdce,
        beanCard: _0x2e5bf9,
        signCard: _0x349f52
    } = $.myCardInfoRes;
    if ('' + jdFruitBeanCard === 'true' && JSON.stringify($.myCardInfoRes).match('限时翻倍') && _0x2e5bf9 > 0) {
        console.log('您设置的是使用水滴换豆卡，且背包有水滴换豆卡' + _0x2e5bf9 + '张, 跳过10次浇水任务');
        return;
    }
    if ($.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) {
        console.log('\n准备浇水十次');
        let _0x210ee1 = 0;
        _0x412f56 = false;
        for (; _0x210ee1 < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit - $.farmTask.totalWaterTaskInit.totalWaterTaskTimes; _0x210ee1++) {
            console.log('第' + (_0x210ee1 + 1) + '次浇水'), await _0x24c1ac();
            if ($.waterResult.code === '0') {
                console.log('浇水成功，剩余水滴' + $.waterResult.totalEnergy + 'g');
                if ($.waterResult.finished) {
                    _0x412f56 = true;
                    break;
                } else {
                    if ($.waterResult.totalEnergy < 10) {
                        console.log('水滴不够，结束浇水\n');
                        break;
                    }
                    await _0x53996d();
                }
            } else {
                console.log('浇水出现失败异常,跳出不在继续浇水\n');
                break;
            }
        }
        _0x412f56 && (_0x10b465['open-url'] = _0x349b8e, $.msg($.name, '', '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【提醒⏰】' + $.farmInfo.farmUserPro.name + '已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达', _0x10b465), $.done(), $.isNode() && (await _0x371657.sendNotify($.name + ' - 账号' + $.index + ' - ' + ($.nickName || $.UserName) + '水果已可领取', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n' + $.farmInfo.farmUserPro.name + '已可领取')));
    } else console.log('\n今日已完成10次浇水任务\n');
}
async function _0x42db69() {
    await _0x3c032f(), !$.farmTask.firstWaterInit.f && $.farmTask.firstWaterInit.totalWaterTimes > 0 ? (await _0x5ba6a3(), $.firstWaterReward.code === '0' ? console.log('【首次浇水奖励】获得' + $.firstWaterReward.amount + 'g💧\n') : console.log('领取首次浇水奖励结果:  ' + JSON.stringify($.firstWaterReward))) : console.log('首次浇水奖励已领取\n');
}
async function _0x18b8d4() {
    if (!$.farmTask.totalWaterTaskInit.f && $.farmTask.totalWaterTaskInit.totalWaterTaskTimes >= $.farmTask.totalWaterTaskInit.totalWaterTaskLimit) await _0x1fc005(), $.totalWaterReward.code === '0' ? console.log('10次浇水完成 获得' + $.totalWaterReward.totalWaterTaskEnergy + 'g💧\n') : console.log('领取10次浇水奖励结果:  ' + JSON.stringify($.totalWaterReward) + '\n'); else $.farmTask.totalWaterTaskInit.totalWaterTaskTimes < $.farmTask.totalWaterTaskInit.totalWaterTaskLimit && console.log('10次浇水 未完成，今日浇水' + $.farmTask.totalWaterTaskInit.totalWaterTaskTimes + '次\n');
    console.log('finished 水果任务完成!');
}
async function _0x2c4bbe() {
    await _0x5a240e();
    let _0x38f6e5 = $.farmInfo.farmUserPro.totalEnergy;
    const {
        fastCard: _0x23ee8e,
        doubleCard: _0x12fb53,
        beanCard: _0x2e5293,
        signCard: _0x310dba
    } = $.myCardInfoRes;
    console.log('\n检查背包道具:\n快速浇水卡:' + (_0x23ee8e === -1 ? '未解锁' : _0x23ee8e + '张') + '\n水滴翻倍卡:' + (_0x12fb53 === -1 ? '未解锁' : _0x12fb53 + '张') + '\n水滴换京豆卡:' + (_0x2e5293 === -1 ? '未解锁' : _0x2e5293 + '张') + '\n加签卡:' + (_0x310dba === -1 ? '未解锁' : _0x310dba + '张') + '\n');
    if (_0x38f6e5 >= 100 && _0x12fb53 > 0 && $.farmInfo.farmUserPro.treeState == 1) for (let _0x17a38d = 0; _0x17a38d < new Array(_0x12fb53).fill('').length; _0x17a38d++) {
        await _0x8c33('doubleCard'), $.userMyCardRes.code == '0' && ($.log('翻倍成功，获得' + $.userMyCardRes.addWater + 'g💧'), _0x38f6e5 += $.userMyCardRes.addWater);
    }
    if (_0x310dba > 0 && $.farmInfo.farmUserPro.treeState == 1) {
        $.log('\n使用加签卡...');
        for (let _0x5b1b89 = 0; _0x5b1b89 < 3; _0x5b1b89++) {
            await _0x8c33('signCard');
            if ($.userMyCardRes.code == 0) $.log('加签成功，获得' + $.userMyCardRes.amount + 'g💧'), _0x38f6e5 += $.userMyCardRes.amount; else {
                if ($.userMyCardRes.code == 20) {
                    $.log('使用上限了!');
                    break;
                } else {
                    if ($.userMyCardRes.code == 8) {
                        $.log('无法加签了!');
                        break;
                    } else {
                        console.log(JSON.stringify($.userMyCardRes) + '\n');
                        break;
                    }
                }
            }
        }
    }
    jdFruitBeanCard = $.getdata('jdFruitBeanCard') ? $.getdata('jdFruitBeanCard') : jdFruitBeanCard;
    $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
    if (jdFruitBeanCard == 'true' && JSON.stringify($.myCardInfoRes).match('限时翻倍')) {
        console.log('\n您设置的是水滴换豆功能,现在为您换豆');
        if (_0x38f6e5 >= 100 && $.myCardInfoRes.beanCard > 0) {
            await _0x8c33('beanCard');
            if ($.userMyCardRes.code === '0') {
                _0x573b56 += '【水滴换豆卡】获得' + $.userMyCardRes.beanCount + '个京豆\n';
                return;
            }
        } else console.log('您目前水滴:' + _0x38f6e5 + 'g,水滴换豆卡' + $.myCardInfoRes.beanCard + '张,暂不满足水滴换豆的条件,为您继续浇水');
    }
}
async function _0x2df135() {
    console.log('检查剩余水滴能否继续浇水...\n'), await _0x28d805();
    let _0x51dd36 = $.farmInfo.farmUserPro.totalEnergy;
    console.log('剩余水滴' + _0x51dd36 + 'g\n');
    const {
        fastCard: _0x1ecdfc,
        doubleCard: _0x5a3087,
        beanCard: _0x3dd04f,
        signCard: _0x17db37
    } = $.myCardInfoRes;
    if (process.env.FRUIT_FAST_CARD == 'true' && _0x51dd36 > 100 && $.myCardInfoRes.fastCard > 0) {
        $.log('\n使用快速浇水卡...');
        for (let _0x50b3c2 = 0; _0x50b3c2 < new Array(_0x1ecdfc).fill('').length; _0x50b3c2++) {
            await _0x8c33('fastCard'), $.log('快速浇水' + (_0x50b3c2 + 1) + '次');
            $.userMyCardRes.code === '0' && console.log('快速浇水' + $.userMyCardRes.waterEnergy + 'g成功\n');
            if ($.userMyCardRes.treeFinished) {
                $.log('水果已成熟啦！\n');
                break;
            }
            await $.wait(500), _0x51dd36 -= 100;
            if (_0x51dd36 < 100) break;
        }
    }
    let _0x1552f9 = _0x51dd36 - retainWater;
    $.log('\n开始浇水...');
    if (_0x51dd36 >= $.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) {
        _0x412f56 = false;
        for (let _0x589e51 = 0; _0x589e51 < ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10; _0x589e51++) {
            await _0x24c1ac(), await $.wait(500), $.log('浇水' + (_0x589e51 + 1) + '次');
            if ($.waterResult.code === '0') {
                console.log('浇水10g成功');
                if ($.waterResult.finished) {
                    _0x412f56 = true, $.log('水果已成熟啦！\n');
                    break;
                } else console.log('剩余水滴' + $.waterResult.totalEnergy + 'g,果树已浇水' + $.waterResult.treeEnergy + 'g\n');
            } else {
                console.log('浇水出现失败异常,跳出不在继续浇水');
                break;
            }
        }
        _0x412f56 && (_0x10b465['open-url'] = _0x349b8e, $.msg($.name, '', '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【提醒⏰】' + $.farmInfo.farmUserPro.name + '已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达', _0x10b465), $.done(), $.isNode() && (await _0x371657.sendNotify($.name + ' - 账号' + $.index + ' - ' + ($.nickName || $.UserName) + '水果已可领取', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n' + $.farmInfo.farmUserPro.name + '已可领取')));
    } else {
        if (_0x1552f9 >= 10) {
            console.log('目前剩余水滴：' + _0x51dd36 + 'g，可继续浇水'), _0x412f56 = false;
            for (let _0xfb30b4 = 0; _0xfb30b4 < parseInt(_0x1552f9 / 10); _0xfb30b4++) {
                $.log('浇水' + (_0xfb30b4 + 1) + '次'), await _0x24c1ac();
                if ($.waterResult.code === '0') {
                    console.log('浇水10g成功,剩余' + $.waterResult.totalEnergy + 'g,果树已浇水' + $.waterResult.treeEnergy + 'g\n');
                    if ($.waterResult.finished) {
                        _0x412f56 = true, $.log('水果已成熟啦！\n');
                        break;
                    } else await _0x53996d();
                } else {
                    console.log('浇水出现失败异常,跳出不在继续浇水');
                    break;
                }
            }
            _0x412f56 && (_0x10b465['open-url'] = _0x349b8e, $.msg($.name, '', '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【提醒⏰】' + $.farmInfo.farmUserPro.name + '已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达', _0x10b465), $.done(), $.isNode() && (await _0x371657.sendNotify($.name + ' - 账号' + $.index + ' - ' + ($.nickName || $.UserName) + '水果已可领取', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n' + $.farmInfo.farmUserPro.name + '已可领取')));
        } else console.log('目前剩余水滴：【' + _0x51dd36 + '】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务');
    }
}
function _0x53996d() {
    return new Promise(async _0x41d10b => {
        if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) console.log('果树发芽了,奖励30g💧'), await _0x345a1d('1'), console.log('浇水阶段奖励1领取结果 ' + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === '0' && console.log('【果树发芽了】奖励' + $.gotStageAwardForFarmRes.addEnergy + '💧\n'); else {
            if ($.waterResult.waterStatus === 1) console.log('果树开花了,奖励40g💧'), await _0x345a1d('2'), console.log('浇水阶段奖励2领取结果 ' + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === '0' && console.log('【果树开花了】奖励' + $.gotStageAwardForFarmRes.addEnergy + 'g💧\n'); else $.waterResult.waterStatus === 2 && (console.log('果树长出小果子啦, 奖励50g💧'), await _0x345a1d('3'), console.log('浇水阶段奖励3领取结果 ' + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === '0' && console.log('【果树结果了】奖励' + $.gotStageAwardForFarmRes.addEnergy + 'g💧\n'));
        }
        _0x41d10b();
    });
}
async function _0x5c8e64() {
    await _0x12d1c8();
    if ($.initForTurntableFarmRes.code === '0') {
        let {
            timingIntervalHours: _0x5c3f06,
            timingLastSysTime: _0x38c092,
            sysTime: _0x19dcef,
            timingGotStatus: _0x76aeef,
            remainLotteryTimes: _0x1233cf,
            turntableInfos: _0x50a734
        } = $.initForTurntableFarmRes;
        !_0x76aeef ? (console.log('领取免费赠送的抽奖机会----' + (_0x19dcef > _0x38c092 + 3600 * _0x5c3f06 * 1000)), _0x19dcef > _0x38c092 + 3600 * _0x5c3f06 * 1000 ? (await _0xd6d049(), $.timingAwardRes.code == 0 ? (console.log('领取定时奖励: ' + $.timingAwardRes.addTimes + '次抽奖机会🥳'), _0x1233cf = $.timingAwardRes.remainLotteryTimes) : console.log('' + JSON.stringify($.timingAwardRes))) : console.log('免费赠送的抽奖机会未到时间')) : console.log('4小时免费赠送的抽奖机会已领取');
        let _0x119076 = $.initForTurntableFarmRes.turntableBrowserAds.filter(_0x5e7b02 => !_0x5e7b02.status);
        if (_0x119076.length > 0) for (let _0x1e54ed = 0; _0x1e54ed < _0x119076.length; _0x1e54ed++) {
            console.log('\n开始天天抽奖的第' + (_0x1e54ed + 1) + '个逛会场任务'), await _0x5e20fd(1, $.initForTurntableFarmRes.turntableBrowserAds[_0x1e54ed].adId), $.browserForTurntableFarmRes.code === '0' && $.browserForTurntableFarmRes.status && (console.log('任务完成，去领取奖励'), await _0x5e20fd(2, $.initForTurntableFarmRes.turntableBrowserAds[_0x1e54ed].adId), $.browserForTurntableFarmRes.code === '0' && (console.log('获得' + $.browserForTurntableFarmRes.addTimes + '次抽奖机会🥳\n'), _0x1233cf = $.browserForTurntableFarmRes.totalTimes));
        } else $.log('\n天天抽奖任务已全部完成！');
        if (_0x1233cf > 0) {
            console.log('\n天天抽奖次数 ' + _0x1233cf), console.log('开始抽奖...');
            let _0x4bd247 = '';
            for (let _0x3d9fc2 = 0; _0x3d9fc2 < new Array(_0x1233cf).fill('').length; _0x3d9fc2++) {
                await _0x2d0f61(), await $.wait(500), console.log('第' + (_0x3d9fc2 + 1) + '次抽奖');
                if ($.lotteryRes.code === '0') {
                    _0x50a734.map(_0x3f1b63 => {
                        if (_0x3f1b63.type === $.lotteryRes.type) {
                            if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === 'bean') _0x4bd247 += _0x3f1b63.name + '个🥔，'; else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === 'water' ? _0x4bd247 += _0x3f1b63.name + '💧，' : _0x4bd247 += _0x3f1b63.name + '，';
                        }
                    });
                    if ($.lotteryRes.remainLotteryTimes === 0) break;
                }
            }
            _0x4bd247 && console.log('天天抽奖奖励：' + _0x4bd247.substr(0, _0x4bd247.length - 1) + '\n');
        } else console.log('天天抽奖无次数！');
    } else console.log('初始化天天抽奖得好礼失败！');
}
async function _0x226713() {
    await _0x1e1815();
    if ($.farmAssistResult.code === '0') {
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length >= 2) {
            if ($.farmAssistResult.status === 2) {
                let _0x58b99a = 0;
                for (let _0x2fe88e of Object.keys($.farmAssistResult.assistStageList)) {
                    let _0x5cff1a = $.farmAssistResult.assistStageList[_0x2fe88e];
                    _0x5cff1a.stageStaus === 2 && (await _0x4d10ad(), await $.wait(500), $.receiveStageEnergy.code === '0' && (console.log('成功领取第' + (Number(_0x2fe88e) + 1) + '段助力奖励：【' + $.receiveStageEnergy.amount + '】g💧'), _0x58b99a += $.receiveStageEnergy.amount));
                }
                _0x573b56 += '【额外奖励】' + _0x58b99a + 'g💧领取成功\n';
            } else $.farmAssistResult.status === 3 && (console.log('已经领取过8好友助力额外奖励'), _0x573b56 += '【额外奖励】已被领取过\n');
        } else console.log('助力好友未达到2个'), _0x573b56 += '【额外奖励】领取失败,原因：给您助力的人未达2个\n';
        if ($.farmAssistResult.assistFriendList && $.farmAssistResult.assistFriendList.length > 0) {
            let _0x4ae0ac = '';
            $.farmAssistResult.assistFriendList.map((_0x2c0f51, _0x212e1d) => {
                _0x212e1d === $.farmAssistResult.assistFriendList.length - 1 ? _0x4ae0ac += _0x2c0f51.nickName || '匿名用户' : _0x4ae0ac += (_0x2c0f51.nickName || '匿名用户') + ',';
                let _0x1612ac = new Date(_0x2c0f51.time),
                    _0x39176f = _0x1612ac.getFullYear() + '-' + (_0x1612ac.getMonth() + 1) + '-' + _0x1612ac.getDate() + ' ' + _0x1612ac.getHours() + ':' + _0x1612ac.getMinutes() + ':' + _0x1612ac.getMinutes();
                console.log('【' + (_0x2c0f51.nickName || '匿名用户') + '】 在 ' + _0x39176f + ' 给您助过力');
            }), _0x573b56 += '【助力您的好友】' + _0x4ae0ac + '\n';
        }
        console.log('\n领取额外奖励水滴结束\n');
    } else {
        await _0x2ead79();
        if ($.masterHelpResult.code === '0') {
            $.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5 ? !$.masterHelpResult.masterGotFinal ? (await _0x1a9505(), $.masterGotFinished.code === '0' && (console.log('已成功领取好友助力奖励：【' + $.masterGotFinished.amount + '】g💧'), _0x573b56 += '【额外奖励】' + $.masterGotFinished.amount + 'g💧领取成功\n')) : (console.log('已经领取过5好友助力额外奖励'), _0x573b56 += '【额外奖励】已被领取过\n') : (console.log('助力好友未达到5个'), _0x573b56 += '【额外奖励】领取失败,原因：给您助力的人未达5个\n');
            if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
                let _0x2e643e = '';
                $.masterHelpResult.masterHelpPeoples.map((_0x30ab47, _0x489b45) => {
                    _0x489b45 === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x2e643e += _0x30ab47.nickName || '匿名用户' : _0x2e643e += (_0x30ab47.nickName || '匿名用户') + ',';
                    let _0x498e37 = new Date(_0x30ab47.time),
                        _0x462d28 = _0x498e37.getFullYear() + '-' + (_0x498e37.getMonth() + 1) + '-' + _0x498e37.getDate() + ' ' + _0x498e37.getHours() + ':' + _0x498e37.getMinutes() + ':' + _0x498e37.getMinutes();
                    console.log('【' + (_0x30ab47.nickName || '匿名用户') + '】 在 ' + _0x462d28 + ' 给您助过力');
                }), _0x573b56 += '【助力您的好友】' + _0x2e643e + '\n';
            }
            console.log('领取额外奖励水滴结束\n');
        }
    }
}
async function _0xbbba10() {
    let _0x19ae42 = !$.farmTask.waterRainInit.f;
    _0x19ae42 ? (console.log('水滴雨任务，每天两次，最多可得10g水滴'), console.log('两次水滴雨任务是否全部完成：' + ($.farmTask.waterRainInit.f ? '是' : '否')), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 10800000 && (_0x19ae42 = false, console.log('【第' + ($.farmTask.waterRainInit.winTimes + 1) + '次水滴雨】还未到时间\n')), _0x19ae42 && (console.log('开始水滴雨任务,这是第' + ($.farmTask.waterRainInit.winTimes + 1) + '次，剩余' + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + '次'), await _0xc27be6(), console.log('水滴雨waterRain'), $.waterRain.code === '0' && (console.log('水滴雨任务执行成功，获得水滴：' + $.waterRain.addEnergy + 'g💧'), console.log('【第' + ($.farmTask.waterRainInit.winTimes + 1) + '次水滴雨】获得' + $.waterRain.addEnergy + 'g💧\n')))) : console.log('【水滴雨】已全部完成\n');
}
async function _0x385022() {
    console.log('开始打卡领水活动（签到，关注，领券）'), await _0x5e6b34();
    if ($.clockInInit.code === '0') {
        !$.clockInInit.todaySigned && (console.log('开始今日签到'), await _0x44f2a0(), $.clockInForFarmRes.code === '0' ? (console.log('【第' + $.clockInForFarmRes.signDay + '天签到】获得' + $.clockInForFarmRes.amount + 'g💧\n'), $.clockInForFarmRes.signDay === 7 && (console.log('开始领取惊喜礼包'), await _0xccd744(), $.gotClockInGiftRes.code === '0' && console.log('【惊喜礼包】获得' + $.gotClockInGiftRes.amount + 'g💧\n'))) : console.log('打卡结果' + JSON.stringify($.clockInForFarmRes)));
        $.clockInInit.todaySigned && $.clockInInit.totalSigned === 7 && (console.log('开始领取惊喜礼包'), await _0xccd744(), $.gotClockInGiftRes.code === '0' && console.log('【惊喜礼包】获得' + $.gotClockInGiftRes.amount + 'g💧\n'));
        if ($.clockInInit.themes && $.clockInInit.themes.length > 0) for (let _0x413abe of $.clockInInit.themes) {
            !_0x413abe.hadGot && (console.log('去关注' + _0x413abe.name), await _0x2a22e9(_0x413abe.id, 'theme', '1'), $.themeStep1.code === '0' ? (await _0x2a22e9(_0x413abe.id, 'theme', '2'), $.themeStep2.code === '0' ? console.log('关注 成功，获得' + $.themeStep2.amount + 'g💧\n') : console.log('themeStep2结果: ' + JSON.stringify($.themeStep2))) : console.log('themeStep1结果: ' + JSON.stringify($.themeStep1)));
        }
        if ($.clockInInit.venderCoupons && $.clockInInit.venderCoupons.length > 0) for (let _0x96a34e of $.clockInInit.venderCoupons) {
            !_0x96a34e.hadGot && (console.log('领券的ID' + _0x96a34e.id), await _0x2a22e9(_0x96a34e.id, 'venderCoupon', '1'), console.log('venderCouponStep1--结果' + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1.code === '0' && (await _0x2a22e9(_0x96a34e.id, 'venderCoupon', '2'), $.venderCouponStep2.code === '0' && (console.log('venderCouponStep2--结果' + JSON.stringify($.venderCouponStep2)), console.log('从' + _0x96a34e.name + '领券，获得水滴' + $.venderCouponStep2.amount + 'g💧'))));
        }
    }
    console.log('打卡领水活动结束\n');
}
async function _0x2380f2() {
    await _0x493394(), console.log('\n开始给好友浇水...'), await _0x3c032f();
    const {
        waterFriendCountKey: _0x4cc59e,
        waterFriendMax: _0x4b911a
    } = $.farmTask.waterFriendTaskInit;
    console.log('今日已给' + _0x4cc59e + '个好友浇水');
    if (_0x4cc59e < _0x4b911a) {
        let _0x59b8d4 = [];
        if ($.friendList.friends && $.friendList.friends.length > 0) {
            $.friendList.friends.map((_0x26f956, _0x170003) => {
                _0x26f956.friendState === 1 && _0x59b8d4.length < _0x4b911a - _0x4cc59e && _0x59b8d4.push(_0x26f956.shareCode);
            }), _0x59b8d4.length > 0 && console.log('需要浇水的好友shareCodes:' + JSON.stringify(_0x59b8d4)), _0x59b8d4.length == 0 && console.log('没有需要浇水的好友!\n');
            let _0x11c4a0 = 0,
                _0x675421 = '';
            for (let _0x1bf7ce = 0; _0x1bf7ce < _0x59b8d4.length; _0x1bf7ce++) {
                await _0x3d291f(_0x59b8d4[_0x1bf7ce]), console.log('为第' + (_0x1bf7ce + 1) + '个好友浇水');
                if ($.waterFriendForFarmRes.code === '0') {
                    _0x11c4a0++;
                    if ($.waterFriendForFarmRes.cardInfo) {
                        console.log('为好友浇水获得道具了');
                        if ($.waterFriendForFarmRes.cardInfo.type === 'beanCard') console.log('获取道具卡:' + $.waterFriendForFarmRes.cardInfo.rule), _0x675421 += '水滴换豆卡,'; else {
                            if ($.waterFriendForFarmRes.cardInfo.type === 'fastCard') console.log('获取道具卡:' + $.waterFriendForFarmRes.cardInfo.rule), _0x675421 += '快速浇水卡,'; else {
                                if ($.waterFriendForFarmRes.cardInfo.type === 'doubleCard') console.log('获取道具卡:' + $.waterFriendForFarmRes.cardInfo.rule), _0x675421 += '水滴翻倍卡,'; else $.waterFriendForFarmRes.cardInfo.type === 'signCard' && (console.log('获取道具卡:' + $.waterFriendForFarmRes.cardInfo.rule), _0x675421 += '加签卡,');
                            }
                        }
                    }
                } else $.waterFriendForFarmRes.code === '11' && console.log('水滴不够,跳出浇水');
            }
            _0x11c4a0 > 0 && console.log('已给' + _0x11c4a0 + '个好友浇水,消耗' + _0x11c4a0 * 10 + 'g水\n'), _0x675421 && _0x675421.length > 0 && console.log('【好友浇水奖励】' + _0x675421.substr(0, _0x675421.length - 1) + '\n');
        } else console.log('好友列表无好友,快去邀请您的好友吧!\n');
    } else console.log('今日已为' + _0x4b911a + '个好友浇水\n');
}
async function _0x52e658() {
    await _0x3c032f();
    const {
        waterFriendCountKey: _0xa630be,
        waterFriendMax: _0x4a8e4f,
        waterFriendSendWater: _0x475b5c,
        waterFriendGotAward: _0x25a77a
    } = $.farmTask.waterFriendTaskInit;
    _0xa630be >= _0x4a8e4f ? !_0x25a77a ? (await _0x321728(), $.waterFriendGotAwardRes.code === '0' && console.log('领取给好友浇水奖励' + $.waterFriendGotAwardRes.addWater + 'g💧\n')) : console.log('给好友浇水的水滴奖励已领取\n') : console.log('给' + _0x4a8e4f + '个好友浇水未完成\n');
}
async function _0xafc0df() {
    for (let _0x41324a of _0x44d039) {
        if (_0x41324a === $.farmInfo.farmUserPro.shareCode) {
            console.log('自己不能邀请自己成为好友噢\n');
            continue;
        }
        await _0x23574a(_0x41324a);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === '0') console.log('接收邀请成为好友结果成功,您已成为' + $.inviteFriendRes.helpResult.masterUserInfo.nickName + '的好友'); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === '17' && console.log('接收邀请成为好友结果失败,对方已是您的好友');
    }
}
async function _0x8d6003() {
    for (let _0x1a2f1a = 0; _0x1a2f1a < 10; _0x1a2f1a++) {
        const _0x2e628e = {};
        _0x2e628e.type = 0x2, _0x2e628e.version = 0x18, _0x2e628e.channel = 0x1, _0x2e628e.babelChannel = '121', $.duckRes = await _0x47c87d('getFullCollectionReward', _0x2e628e);
        if ($.duckRes.code === '0') {
            if (!$.duckRes.hasLimit) console.log('小鸭子游戏:' + $.duckRes.title); else {
                console.log('' + $.duckRes.title);
                break;
            }
        } else {
            if ($.duckRes.code === '10') {
                console.log('小鸭子游戏达到上限');
                break;
            }
        }
    }
}
async function _0x1fc005() {
    const _0x4fe8e4 = arguments.callee.name.toString();
    $.totalWaterReward = await _0x47c87d('totalWaterTaskForFarm');
}
async function _0x5ba6a3() {
    const _0x4abbd2 = arguments.callee.name.toString();
    $.firstWaterReward = await _0x47c87d('firstWaterTaskForFarm');
}
async function _0x1a1a62() {
    const _0x24bdb9 = {};
    _0x24bdb9.version = 0x18, _0x24bdb9.channel = 0x1, _0x24bdb9.babelChannel = '121', _0x24bdb9.lat = '0', _0x24bdb9.lng = '0', $.newtaskinfo = await _0x47c87d('gotNewUserTaskForFarm', _0x24bdb9);
}
async function _0x257572() {
    const _0x55baba = {};
    _0x55baba.version = 0x18, _0x55baba.channel = 0x1, _0x55baba.babelChannel = '121', _0x55baba.lat = '0', _0x55baba.lng = '0', $.newtaskinfo = await _0x47c87d('gotLowFreqWaterForFarm', _0x55baba);
}
async function _0x28d805() {
    const _0xd06df4 = {};
    _0xd06df4.version = 0x18, _0xd06df4.channel = 0x1, _0xd06df4.babelChannel = '121', _0xd06df4.lat = '0', _0xd06df4.lng = '0', $.farmInfo = await _0x47c87d('gotNewUserTaskForFarm', _0xd06df4);
}
async function _0x262f42() {
    const _0x428840 = {};
    _0x428840.version = 0x18, _0x428840.channel = 0x1, _0x428840.babelChannel = '121', _0x428840.lat = '0', _0x428840.lng = '0', $.farmInfoI = await _0x47c87d('initForFarm', _0x428840);
}
async function _0x321728() {
    const _0x4807f4 = arguments.callee.name.toString(),
        _0x1d8409 = {};
    _0x1d8409.version = 0x18, _0x1d8409.channel = 0x1, _0x1d8409.babelChannel = '121', $.waterFriendGotAwardRes = await _0x47c87d('waterFriendGotAwardForFarm', _0x1d8409);
}
async function _0x5a240e() {
    const _0x214785 = arguments.callee.name.toString(),
        _0xfd0cee = {};
    _0xfd0cee.version = 0x18, _0xfd0cee.channel = 0x1, _0xfd0cee.babelChannel = '121', $.myCardInfoRes = await _0x47c87d('myCardInfoForFarm', _0xfd0cee);
}
async function _0x8c33(_0x10ca26) {
    const _0x180c7a = arguments.callee.name.toString(),
        _0x39d387 = {};
    _0x39d387.cardType = _0x10ca26, $.userMyCardRes = await _0x47c87d('userMyCardForFarm', _0x39d387);
}
async function _0x345a1d(_0x431064) {
    const _0x4eb6ca = {};
    _0x4eb6ca.type = _0x431064, $.gotStageAwardForFarmRes = await _0x47c87d('gotStageAwardForFarm', _0x4eb6ca);
}
async function _0x24c1ac() {
    await $.wait(1000);
    const _0x2182c8 = arguments.callee.name.toString();
    $.waterResult = await _0x47c87d('waterGoodForFarm');
}
async function _0x12d1c8() {
    const _0x15cba1 = {};
    _0x15cba1.version = 0x18, _0x15cba1.channel = 0x1, _0x15cba1.babelChannel = '121', $.initForTurntableFarmRes = await _0x47c87d('initForTurntableFarm', _0x15cba1);
}
async function _0x2d0f61() {
    await $.wait(2000);
    const _0x3dabc5 = {};
    _0x3dabc5.type = 0x1, _0x3dabc5.version = 0x18, _0x3dabc5.channel = 0x1, _0x3dabc5.babelChannel = '121', $.lotteryRes = await _0x47c87d('lotteryForTurntableFarm', _0x3dabc5);
}
async function _0xd6d049() {
    const _0x12a5ef = {};
    _0x12a5ef.version = 0x18, _0x12a5ef.channel = 0x1, _0x12a5ef.babelChannel = '121', $.timingAwardRes = await _0x47c87d('timingAwardForTurntableFarm', _0x12a5ef);
}
async function _0x5e20fd(_0x52cc22, _0x25a921) {
    const _0x4053ca = {};
    _0x4053ca.type = _0x52cc22, _0x4053ca.adId = _0x25a921, _0x4053ca.version = 0x18, _0x4053ca.channel = 0x1, _0x4053ca.babelChannel = '121';
    const _0x558d7a = _0x4053ca;
    $.browserForTurntableFarmRes = await _0x47c87d('browserForTurntableFarm', _0x558d7a);
}
async function _0x23dc69(_0x3e1ce1) {
    const _0x485895 = {};
    _0x485895.type = 0x2, _0x485895.adId = _0x3e1ce1, _0x485895.version = 0x18, _0x485895.channel = 0x1, _0x485895.babelChannel = '121';
    const _0x241b6d = _0x485895;
    $.browserForTurntableFarm2Res = await _0x47c87d('browserForTurntableFarm', _0x241b6d);
}
async function _0x4b8d09() {
    const _0x362690 = {};
    _0x362690.imageUrl = '', _0x362690.nickName = '', _0x362690.shareCode = arguments[0] + '-3', _0x362690.babelChannel = '3', _0x362690.version = 0x18, _0x362690.channel = 0x1, $.lotteryMasterHelpRes = await _0x47c87d('initForFarm', _0x362690);
}
async function _0x1a9505() {
    const _0x5e1a91 = arguments.callee.name.toString();
    $.masterGotFinished = await _0x47c87d('masterGotFinishedTaskForFarm');
}
async function _0x2ead79() {
    const _0x37f693 = arguments.callee.name.toString();
    $.masterHelpResult = await _0x47c87d('masterHelpTaskInitForFarm');
}
async function _0x1e1815() {
    const _0x5155e7 = arguments.callee.name.toString(),
        _0x2703a7 = {};
    _0x2703a7.version = 0x18, _0x2703a7.channel = 0x1, _0x2703a7.babelChannel = '121', $.farmAssistResult = await _0x47c87d('farmAssistInit', _0x2703a7);
}
async function _0x4d10ad() {
    const _0x4ea3ed = arguments.callee.name.toString(),
        _0x27b8b4 = {};
    _0x27b8b4.version = 0x18, _0x27b8b4.channel = 0x1, _0x27b8b4.babelChannel = '121', $.receiveStageEnergy = await _0x47c87d('receiveStageEnergy', _0x27b8b4);
}
async function _0x23574a() {
    const _0x23847b = {};
    _0x23847b.imageUrl = '', _0x23847b.nickName = '', _0x23847b.shareCode = arguments[0] + '-inviteFriend', _0x23847b.version = 0x4, _0x23847b.channel = 0x2, $.inviteFriendRes = await _0x47c87d('initForFarm', _0x23847b);
}
async function _0x45e785() {
    const _0x215cf0 = {};
    _0x215cf0.imageUrl = '', _0x215cf0.nickName = '', _0x215cf0.shareCode = arguments[0], _0x215cf0.babelChannel = '3', _0x215cf0.version = 0x2, _0x215cf0.channel = 0x1, $.helpResult = await _0x47c87d('initForFarm', _0x215cf0);
}
async function _0xc27be6() {
    const _0x1725fd = arguments.callee.name.toString(),
        _0x200f7b = {};
    _0x200f7b.type = 0x1, _0x200f7b.hongBaoTimes = 0x64, _0x200f7b.version = 0x18, _0x200f7b.channel = 0x1, _0x200f7b.babelChannel = '121';
    const _0x52c5e8 = _0x200f7b;
    $.waterRain = await _0x47c87d('waterRainForFarm', _0x52c5e8);
}
async function _0x5e6b34() {
    const _0x3a1be0 = arguments.callee.name.toString();
    $.clockInInit = await _0x47c87d('clockInInitForFarm');
}
async function _0x44f2a0() {
    const _0xfdf0d9 = arguments.callee.name.toString(),
        _0x10d7f2 = {};
    _0x10d7f2.type = 0x1, $.clockInForFarmRes = await _0x47c87d('clockInForFarm', _0x10d7f2);
}
async function _0x2a22e9(_0x92e8d, _0xa14cbb, _0x4abf3a) {
    const _0x20e3c0 = 'clockInFollowForFarm',
        _0x1bff18 = {};
    _0x1bff18.id = _0x92e8d, _0x1bff18.type = _0xa14cbb, _0x1bff18.step = _0x4abf3a;
    let _0x382088 = _0x1bff18;
    if (_0xa14cbb === 'theme') {
        if (_0x4abf3a === '1') $.themeStep1 = await _0x47c87d(_0x20e3c0, _0x382088); else _0x4abf3a === '2' && ($.themeStep2 = await _0x47c87d(_0x20e3c0, _0x382088));
    } else {
        if (_0xa14cbb === 'venderCoupon') {
            if (_0x4abf3a === '1') $.venderCouponStep1 = await _0x47c87d(_0x20e3c0, _0x382088); else _0x4abf3a === '2' && ($.venderCouponStep2 = await _0x47c87d(_0x20e3c0, _0x382088));
        }
    }
}
async function _0xccd744() {
    const _0x2f6d9b = {};
    _0x2f6d9b.type = 0x2, _0x2f6d9b.version = 0x18, _0x2f6d9b.channel = 0x1, _0x2f6d9b.babelChannel = '121', _0x2f6d9b.lat = '0', _0x2f6d9b.lng = '0', $.gotClockInGiftRes = await _0x47c87d('clockInForFarm', _0x2f6d9b);
}
async function _0x4b4a98() {
    const _0x37faf2 = arguments.callee.name.toString();
    $.threeMeal = await _0x47c87d('gotThreeMealForFarm');
}
async function _0xaf07d1(_0x2e2935, _0x406562, _0x36e3c7) {
    if (_0x406562 === 0) {
        const _0xca5105 = {};
        _0xca5105.advertId = _0x2e2935, _0xca5105.type = _0x406562, _0xca5105.adType = _0x36e3c7, _0xca5105.version = 0x18, _0xca5105.channel = 0x1, _0xca5105.babelChannel = '121', _0xca5105.lat = '0', _0xca5105.lng = '0', $.browseResult = await _0x47c87d('browseAdTaskForFarm', _0xca5105);
    } else {
        if (_0x406562 === 1) {
            const _0x104242 = {};
            _0x104242.advertId = _0x2e2935, _0x104242.type = _0x406562, _0x104242.adType = _0x36e3c7, _0x104242.version = 0x18, _0x104242.channel = 0x1, _0x104242.babelChannel = '121', _0x104242.lat = '0', _0x104242.lng = '0', $.browseRwardResult = await _0x47c87d('browseAdTaskForFarm', _0x104242);
        }
    }
}
async function _0x1611a8() {
    const _0x3a4302 = {};
    _0x3a4302.type = 0x3, $.goalResult = await _0x47c87d('gotWaterGoalTaskForFarm', _0x3a4302);
}
async function _0x3c032f() {
    const _0xcd60e2 = arguments.callee.name.toString(),
        _0x2427a1 = {};
    _0x2427a1.version = 0x18, _0x2427a1.channel = 0x1, _0x2427a1.babelChannel = '121', _0x2427a1.lat = '0', _0x2427a1.lng = '0', $.farmTask = await _0x47c87d('taskInitForFarm', _0x2427a1);
}
async function _0x5243b6() {
    const _0x2cdcee = {};
    _0x2cdcee.version = 0x18, _0x2cdcee.channel = 0x1, _0x2cdcee.babelChannel = '45', _0x2cdcee.lat = '0', _0x2cdcee.lng = '0', $.farmTask = await _0x47c87d('taskInitForFarm', _0x2cdcee);
}
async function _0x493394() {
    const _0x1a8a98 = {};
    _0x1a8a98.version = 0x18, _0x1a8a98.channel = 0x1, _0x1a8a98.babelChannel = '121', _0x1a8a98.lat = '0', _0x1a8a98.lng = '0', $.friendList = await _0x47c87d('friendListInitForFarm', _0x1a8a98);
}
async function _0x429645() {
    $.awardInviteFriendRes = await _0x47c87d('awardInviteFriendForFarm');
}
async function _0x3d291f(_0x1a9f80) {
    const _0xceb8c = {};
    _0xceb8c.shareCode = _0x1a9f80, _0xceb8c.version = 0x18, _0xceb8c.channel = 0x1, _0xceb8c.babelChannel = '121';
    const _0x3d90d0 = _0xceb8c;
    $.waterFriendForFarmRes = await _0x47c87d('waterFriendForFarm', _0x3d90d0);
}
async function _0x38e955() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = '' + process.env.FRUIT_NOTIFY_CONTROL === 'false'; else $.getdata('jdFruitNotify') ? $.ctrTemp = $.getdata('jdFruitNotify') === 'false' : $.ctrTemp = '' + jdNotify === 'false';
    $.ctrTemp ? ($.msg($.name, _0x380a87, _0x573b56, _0x10b465), $.isNode() && (_0x2ce417 += _0x380a87 + '\n' + _0x573b56 + ($.index !== _0x25d9ff.length ? '\n\n' : ''))) : $.log('\n' + _0x573b56 + '\n');
}
function _0x1a4e9e(_0x207d97) {
    let _0x45a755;
    return _0x207d97 ? _0x45a755 = new Date(_0x207d97) : _0x45a755 = new Date(), _0x45a755.getFullYear() + '-' + (_0x45a755.getMonth() + 1 >= 10 ? _0x45a755.getMonth() + 1 : '0' + (_0x45a755.getMonth() + 1)) + '-' + (_0x45a755.getDate() >= 10 ? _0x45a755.getDate() : '0' + _0x45a755.getDate());
}
function _0x4030d8() {
    return new Promise(_0x1c8e37 => {
        console.log('开始获取配置文件\n'), _0x371657 = $.isNode() ? require('./sendNotify') : '';
        const _0x36178b = $.isNode() ? require('./jdCookie.js') : '';
        if ($.isNode()) {
            Object.keys(_0x36178b).forEach(_0x512428 => {
                _0x36178b[_0x512428] && _0x25d9ff.push(_0x36178b[_0x512428]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
        } else _0x25d9ff = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x91d85e($.getdata('CookiesJD') || '[]').map(_0xc4ec57 => _0xc4ec57.cookie)].filter(_0x2d0b8e => !!_0x2d0b8e);
        _0x1c8e37();
    });
}
async function _0xaea763() {
    const _0x4a9b72 = {};
    _0x4a9b72.type = 0x1, _0x4a9b72.babelChannel = '121', _0x4a9b72.line = 'getBean', _0x4a9b72.version = 0x18, _0x4a9b72.channel = 0x1, _0x4a9b72.lat = '0', _0x4a9b72.lng = '0', await _0x47c87d('ddnc_getTreasureBoxAward', _0x4a9b72), await $.wait(500), await _0x4d42b6(), await $.wait(2000);
    const _0x4d74fa = {};
    _0x4d74fa.type = 0x2, _0x4d74fa.babelChannel = '121', _0x4d74fa.line = 'getBean', _0x4d74fa.version = 0x18, _0x4d74fa.channel = 0x1, _0x4d74fa.lat = '0', _0x4d74fa.lng = '0';
    let _0x1597c6 = await _0x47c87d('ddnc_getTreasureBoxAward', _0x4d74fa);
    return _0x1597c6;
}
async function _0x309825() {
    const _0x354d78 = {};
    _0x354d78.type = 0x1, _0x354d78.babelChannel = '121', _0x354d78.version = 0x18, _0x354d78.channel = 0x1, _0x354d78.lat = '0', _0x354d78.lng = '0', await _0x47c87d('ddnc_getTreasureBoxAward', _0x354d78), await $.wait(500), await _0x5243b6(), await $.wait(2000);
    const _0x290328 = {};
    _0x290328.type = 0x2, _0x290328.babelChannel = '45', _0x290328.version = 0x18, _0x290328.channel = 0x1, _0x290328.lat = '0', _0x290328.lng = '0';
    let _0x4df644 = await _0x47c87d('ddnc_getTreasureBoxAward', _0x290328);
    return _0x4df644;
}
function _0x4d42b6() {
    return new Promise(_0x4185db => {
        const _0x16ec06 = {};
        _0x16ec06.Cookie = _0x759bd8, _0x16ec06.referer = 'https://h5.m.jd.com/', _0x16ec06['User-Agent'] = $.UA;
        const _0x39b638 = {};
        _0x39b638.url = 'https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld', _0x39b638.headers = _0x16ec06, _0x39b638.timeout = 0x2710;
        const _0xa8750b = _0x39b638;
        $.get(_0xa8750b, (_0x130680, _0x4417c2, _0x500407) => {
            _0x4185db();
        });
    });
}
function _0xb6bc18() {
    return new Promise(_0x102e44 => {
        const _0x1984d2 = {};
        _0x1984d2.Cookie = _0x759bd8, _0x1984d2.referer = 'https://h5.m.jd.com/', _0x1984d2['User-Agent'] = $.UA;
        const _0x3f26ae = {};
        _0x3f26ae.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x3f26ae.headers = _0x1984d2, _0x3f26ae.timeout = 0x2710;
        const _0x246e0d = _0x3f26ae;
        $.get(_0x246e0d, (_0x249592, _0x3bed4d, _0x302c84) => {
            try {
                if (_0x302c84) {
                    _0x302c84 = JSON.parse(_0x302c84);
                    if (_0x302c84.islogin === '1') { } else _0x302c84.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x165135) {
                console.log(_0x165135);
            } finally {
                _0x102e44();
            }
        });
    });
}
async function _0x47c87d(_0x268fdb, _0xa4ede2 = {}, _0xaa8723 = 1500) {
    $.reqnum % 5 == 0 && (console.log('\n等待' + _0x24de6e / 1000 + '秒......\n'), _0xaa8723 = _0x24de6e);
    ;
    $.reqnum++;
    if (_0x11206e[_0x268fdb]) {
        let _0x5a1fb7 = {
            'appId': _0x11206e[_0x268fdb],
            'fn': _0x268fdb,
            'body': _0xa4ede2,
            'apid': 'signed_wh5',
            'ver': $.UA.split(';')[2],
            'cl': 'ios',
            'user': $.UserName,
            'code': 0x1,
            'ua': $.UA
        };
        _0xa4ede2 = await _0x46aea6.getbody(_0x5a1fb7);
    } else _0xa4ede2 = 'functionId=' + _0x268fdb + '&body=' + encodeURIComponent(JSON.stringify(_0xa4ede2)) + '&appid=wh5';
    return new Promise(_0x954f24 => {
        setTimeout(() => {
            $.get(_0x425050(_0xa4ede2), (_0x479414, _0x1b0d7a, _0x4edc02) => {
                try {
                    _0x479414 ? (console.log('\n东东农场: API查询请求失败 ‼️‼️'), console.log(JSON.stringify(_0x479414)), console.log('function_id:' + _0x268fdb), $.logErr(_0x479414)) : _0x401a53(_0x4edc02) && (_0x4edc02 = JSON.parse(_0x4edc02));
                } catch (_0x422af4) {
                    $.logErr(_0x422af4, _0x1b0d7a);
                } finally {
                    _0x954f24(_0x4edc02);
                }
            });
        }, _0xaa8723);
    });
}
function _0x401a53(_0xc4851) {
    try {
        if (typeof JSON.parse(_0xc4851) == 'object') return true;
    } catch (_0x4855df) {
        return console.log(_0x4855df), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}
function _0x425050(_0x1af1a6 = {}) {
    const _0x500687 = {};
    _0x500687.Host = 'api.m.jd.com', _0x500687.Accept = '*/*', _0x500687.Origin = 'https://carry.m.jd.com', _0x500687['Accept-Encoding'] = 'gzip, deflate, br', _0x500687['User-Agent'] = $.UA, _0x500687['Accept-Language'] = 'zh-CN,zh-Hans;q=0.9', _0x500687.Referer = 'https://carry.m.jd.com/', _0x500687.Cookie = _0x759bd8;
    const _0x1127ed = {};
    return _0x1127ed.url = _0x337aaf + '?' + _0x1af1a6, _0x1127ed.headers = _0x500687, _0x1127ed.timeout = 0x7530, _0x1127ed;
}
function _0x12b7c5(_0xa0f557, _0x229bff = {}) {
    const _0x227f85 = {};
    _0x227f85.Host = 'api.m.jd.com', _0x227f85.Accept = '*/*', _0x227f85.Origin = 'https://carry.m.jd.com', _0x227f85['Accept-Encoding'] = 'gzip, deflate, br', _0x227f85['User-Agent'] = $.UA, _0x227f85['Accept-Language'] = 'zh-CN,zh-Hans;q=0.9', _0x227f85.Referer = 'https://carry.m.jd.com/', _0x227f85.Cookie = _0x759bd8;
    const _0x5bc861 = {};
    return _0x5bc861.url = _0x337aaf + '?' + _0x229bff, _0x5bc861.headers = _0x227f85, _0x5bc861.timeout = 0x2710, _0x5bc861;
}
function _0x91d85e(_0x523f35) {
    if (typeof _0x523f35 == 'string') try {
        return JSON.parse(_0x523f35);
    } catch (_0x27d558) {
        return console.log(_0x27d558), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }