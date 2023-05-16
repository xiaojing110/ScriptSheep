/*
头文字J 
活动快捷入口： 19:/参与头文字J，集能量兑换京豆！P5loICDei3！⇥Jℹng◼倲
日常任务，助力，游戏
第一个账号助力作者 其他依次助力CK1
默认不做加购任务，如需要设置变量erport car_addsku='true'
默认前5个CK，变量car_num='10'
定时随机，一起冲会炸
*/

const $ = new Env("头文字JJJ");
const _0xdfcda = $.isNode() ? require("./jdCookie.js") : "",
    _0x456c8c = $.isNode() ? require("./sendNotify") : "",
    _0x4181b1 = require("./function/dylanx.js");

let _0x5e6789 = [],
    _0x506e7e = "";

if ($.isNode()) {
    Object.keys(_0xdfcda).forEach(_0x561e6b => {
        _0x5e6789.push(_0xdfcda[_0x561e6b]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x5e6789 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x2dd3fb($.getdata("CookiesJD") || "[]").map(_0x23bb58 => _0x23bb58.cookie)].filter(_0x405ffa => !!_0x405ffa);

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
let _0x15ded6 = [""],
    _0x30c0a0 = 0;
_0x30c0a0 = Math.floor(Math.random() * _0x15ded6.length);

let _0x1f300e = _0x15ded6[_0x30c0a0] || "",
    _0x1a6ffe = process.env.car_num || "5";

!(async () => {
    console.log("活动快捷入口： 19:/参与头文字J，集能量兑换京豆！P5loICDei3！⇥Jℹng◼倲");

    if (!_0x5e6789[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    $.userId = "10299171";
    $.actId = "1760007";
    $.inviteNick = _0x1f300e;

    for (let _0x17ae69 = 0; _0x17ae69 < _0x1a6ffe; _0x17ae69++) {
        _0x506e7e = _0x5e6789[_0x17ae69];

        if (_0x506e7e) {
            $.UserName = decodeURIComponent(_0x506e7e.match(/pt_pin=([^; ]+)(?=;?)/) && _0x506e7e.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x17ae69 + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = false;
            $.nickName = "";
            console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            await _0x35c3ce();
            await _0x36fac3();
            if ($.outFlag) break;
        }
    }

    if ($.outFlag) {
        let _0xc47d08 = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0xc47d08);
        if ($.isNode()) await _0x456c8c.sendNotify("" + $.name, "" + _0xc47d08);
    }
})().catch(_0x1ef0df => $.logErr(_0x1ef0df)).finally(() => $.done());

async function _0x36fac3() {
    try {
        $.hasEnd = true;
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本");
            return;
        }

        await _0x9f98b4("isvObfuscator");

        if ($.Token == "") {
            console.log("获取token失败！");
            return;
        }

        await _0x9f98b4("activity_load");
        if ($.nickName) return;

        if ($.MixNick == "") {
            console.log("获取mixnick失败");
            return;
        }

        console.log("助力码：" + $.MixNick + "\n");
        if ($.hotFlag) return;
        await _0x9f98b4("taskList");
        console.log("开始日常任务。。。");

        for (let _0x1bc640 = 0; _0x1bc640 < $.taskLists.length; _0x1bc640++) {
            $.missionType = $.taskLists[_0x1bc640].type;
            if (!$.taskLists[_0x1bc640].isComplete) switch ($.missionType) {
                case "bingCar":
                case "openCard":
                case "shareAct":
                case "viewChannelCommodity":
                    break;

                case "viewCommodity":
                case "viewThemeConference":
                    for (let _0x2674df = 0; _0x2674df < 3; _0x2674df++) {
                        await _0x9f98b4("doTask");
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                    }

                    break;

                case "collectShop":
                    for (let _0x3c34f7 = 0; _0x3c34f7 < 3; _0x3c34f7++) {
                        await _0x9f98b4("getCusShop");
                        await _0x9f98b4("followShop");
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                    }

                    break;

                case "addCart":
                    if (process.env.car_addsku && process.env.car_addsku === "true") {
                        for (let _0x3d3613 = 0; _0x3d3613 < 3; _0x3d3613++) {
                            await _0x9f98b4("getCusShopProduct");
                            await _0x9f98b4("addCart");
                            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        }
                    } else console.log("默认不加购,请设置变量export car_addsku='true'做加购任务");

                    break;

                default:
                    await _0x9f98b4("doTask");
                    await $.wait(1000);
            }
        }

        if ($.remainChance) {
            console.log("\n开始游戏。。。");
            await _0x9f98b4("getCarInfo");

            for (let _0x2ebc8d = 0; _0x2ebc8d < $.remainChance; _0x2ebc8d++) {
                await _0x9f98b4("playGame");
                await $.wait(parseInt(Math.random() * 2000 + 5000));
                await _0x9f98b4("sendGameAward");
                await $.wait(parseInt(Math.random() * 2000 + 1000));
            }
        } else console.log("\n开始游戏：没有游戏币了，明天再来！");

        await _0x9f98b4("activity_load");
        await $.wait(1000);
        console.log("\n当前剩余能量：" + $.remainPoint + "\n");
        await $.wait(1000);
        await _0x9f98b4("missionInviteList");
        await $.wait(1000);
        if ($.index != 1) {
            console.log("去助力：" + $.inviteNick);
            await _0x9f98b4("助力");
        }

        if ($.index == 1) {
            $.inviteNick = $.MixNick;
            console.log("后面的都会助力：" + $.inviteNick);
        }

        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } catch (_0xf15b0b) {
        console.log(_0xf15b0b);
    }
}

async function _0x9f98b4(_0x5ca7f3) {
    if ($.outFlag) return;
    let _0x1c9289 = "https://mpdz-car-dz.isvjcloud.com",
        _0x4d0132 = "",
        _0x44e691 = "POST",
        _0x431762 = "";

    switch (_0x5ca7f3) {
        case "isvObfuscator":
            let _0xdc2ceb = await _0x4181b1.getbody("isvObfuscator", {
                "id": "",
                "url": "https://mpdz-car-dz.isvjcloud.com"
            });

            url = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
            _0x4d0132 = _0xdc2ceb;
            break;

        case "activity_load":
            url = _0x1c9289 + "/dm/front/jdCardRunning/activity/load?open_id=&mix_nick=" + $.MixNick + "&push_way=3&user_id=";
            _0x431762 = {
                "jdToken": $.Token,
                "inviteNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/activity/load", _0x431762);
            break;

        case "taskList":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeState?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {};
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeState", _0x431762);
            break;

        case "绑定":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "missionType": "shareAct",
                "inviterNick": $.inviteNick || ""
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeState", _0x431762);
            break;

        case "助力":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "missionType": "shareAct",
                "inviterNick": $.inviteNick || "",
                "userId": 10299171
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeMission", _0x431762);
            break;

        case "followShop":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "missionType": $.missionType,
                "userId": 10299171,
                "shopId": $.userIds,
                "buyerNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeMission", _0x431762);
            break;

        case "addCart":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "missionType": $.missionType,
                "userId": 10299171,
                "goodsNumId": $.goodsNumId,
                "buyerNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeMission", _0x431762);
            break;

        case "getCusShop":
            url = _0x1c9289 + "/dm/front/jdCardRunning/cusShop/getCusShop?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {};
            _0x4d0132 = _0x5338bf("/jdCardRunning/cusShop/getCusShop", _0x431762);
            break;

        case "getCusShopProduct":
            url = _0x1c9289 + "/dm/front/jdCardRunning/cusShop/getCusShopProduct?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {};
            _0x4d0132 = _0x5338bf("/jdCardRunning/cusShop/getCusShop", _0x431762);
            break;

        case "doTask":
            url = _0x1c9289 + "/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "actId": $.actId,
                "missionType": $.missionType
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/mission/completeMission", _0x431762);
            break;

        case "playGame":
            url = _0x1c9289 + "/dm/front/jdCardRunning/game/playGame?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "actId": $.actId,
                "carId": $.usecar.id,
                "carName": $.usecar.carName,
                "userId": 10299171,
                "buyerNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/game/playGame", _0x431762);
            break;

        case "sendGameAward":
            url = _0x1c9289 + "/dm/front/jdCardRunning/game/sendGameAward?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "actId": $.actId,
                "point": $.point.point || 300,
                "gameLogId": $.gameLogId,
                "userId": 10299171,
                "buyerNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/game/sendGameAward", _0x431762);
            break;

        case "missionInviteList":
            url = _0x1c9289 + "/dm/front/jdCardRunning/customer/inviteList?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "actId": $.actId,
                "userId": 10299171,
                "missionType": "shareAct",
                "inviteNum": 1,
                "buyerNick": $.MixNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/customer/inviteList", _0x431762);
            break;

        case "getCarInfo":
            url = _0x1c9289 + "/dm/front/jdCardRunning/carInfo/getCarInfo?open_id=&mix_nick=" + $.MixNick;
            _0x4d0132 = _0x5338bf("/jdCardRunning/cusShop/getCusShop", {});
            break;

        case "exchange":
            url = _0x1c9289 + "/dm/front/jdCardRunning/exchange/exchangeJdMarket?open_id=&mix_nick=" + $.MixNick;
            _0x431762 = {
                "awardId": "10082bd15b4703",
                "userId": 10299171,
                "actId": 1760007,
                "buyerNick": $.inviteNick
            };
            _0x4d0132 = _0x5338bf("/jdCardRunning/exchange/exchangeJdMarket", _0x431762);
            break;

        default:
            console.log("错误" + _0x5ca7f3);
    }

    let _0x540dcc = _0x458b6a(url, _0x4d0132, _0x44e691);

    return new Promise(async _0x45dd03 => {
        $.post(_0x540dcc, (_0x5b5c25, _0x11a2b4, _0x2bd413) => {
            try {
                if (_0x5b5c25) {
                    _0x11a2b4 && _0x11a2b4.statusCode && _0x11a2b4.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
                    console.log("" + $.toStr(_0x5b5c25, _0x5b5c25));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x472670(_0x5ca7f3, _0x2bd413);
                }
            } catch (_0x437150) {
                console.log(_0x437150, _0x11a2b4);
            } finally {
                _0x45dd03();
            }
        });
    });
}

async function _0x472670(_0x3f0d9c, _0x37d836) {
    let _0xa96f7d = "";

    try {
        if (_0x3f0d9c != "accessLogWithAD" || _0x3f0d9c != "drawContent") {
            _0x37d836 && (_0xa96f7d = JSON.parse(_0x37d836));
        }
    } catch (_0x4abb60) {
        console.log(_0x3f0d9c + " 执行任务异常");
        console.log(_0x37d836);
        $.runFalag = false;
    }

    try {
        switch (_0x3f0d9c) {
            case "isvObfuscator":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.errcode == 0) {
                        if (typeof _0xa96f7d.token != "undefined") $.Token = _0xa96f7d.token;
                    } else _0xa96f7d.message ? console.log("isvObfuscator " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "getCusShop":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) _0xa96f7d.data.status && _0xa96f7d.data.status == 200 && ($.userIds = _0xa96f7d.data.data.cusShop.userId); else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "getCusShopProduct":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) _0xa96f7d.data.status && _0xa96f7d.data.status == 200 && ($.goodsNumId = _0xa96f7d.data.data.cusShopProduct.numId); else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "taskList":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) {
                        _0xa96f7d.data.status && _0xa96f7d.data.status == 200 && ($.taskLists = _0xa96f7d.data.data || []);
                    } else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "getCarInfo":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) {
                        if (_0xa96f7d.data.status && _0xa96f7d.data.status == 200) {
                            $.carlist = _0xa96f7d.data.data || [];
                            $.usecar = $.carlist.reverse().find(_0x11d2fe => _0x11d2fe.isUnlock === true);
                            console.log("使用我最牛X的" + $.usecar.carName + "进行游戏！");
                            let _0x24f724 = [{
                                "id": 1,
                                "point": 100
                            }, {
                                "id": 2,
                                "point": 150
                            }, {
                                "id": 3,
                                "point": 200
                            }, {
                                "id": 4,
                                "point": 300
                            }];
                            $.point = _0x24f724.find(_0x55f4b2 => _0x55f4b2.id === $.usecar.id);
                        }
                    } else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "playGame":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) _0xa96f7d.data.status && _0xa96f7d.data.status == 200 && ($.gameLogId = _0xa96f7d.data.data.gameLogId, console.log("游戏ID： " + $.gameLogId)); else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "sendGameAward":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.data) console.log("游戏完成，获得" + $.point.point + "能量!"); else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "exchange":
                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.data) console.log(_0xa96f7d.data.msg); else _0xa96f7d.message ? console.log(_0x3f0d9c + " " + _0xa96f7d.message) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            case "accessLogWithAD":
            case "drawContent":
                break;

            case "specialSign":
            case "activity_load":
            case "setMixNick":
            case "followShop":
            case "doTask":
            case "addCart":
            case "missionInviteList":
            case "绑定":
            case "助力":
                let _0x221553 = "";
                if (_0x3f0d9c == "followShop") _0x221553 = "关注";
                if (_0x3f0d9c == "addCart") _0x221553 = "加购";
                if (_0x3f0d9c == "specialSign") _0x221553 = "签到";

                if (typeof _0xa96f7d == "object") {
                    if (_0xa96f7d.success && _0xa96f7d.success === true && _0xa96f7d.data) {
                        if (_0xa96f7d.data.status && _0xa96f7d.data.status == 200) {
                            _0xa96f7d = _0xa96f7d.data;
                            _0x3f0d9c != "setMixNick" && (_0xa96f7d.msg || _0xa96f7d.data.remark) && console.log((_0x221553 && _0x221553 + ":" || "") + (_0xa96f7d.msg || _0xa96f7d.data.isOpenCard || _0xa96f7d.data.remark || ""));

                            if (_0x3f0d9c == "activity_load") {
                                if (_0xa96f7d.data) {
                                    $.MixNick = _0xa96f7d.data.missionCustomer.buyerNick || "";
                                    $.hasCollectShop = _0xa96f7d.data.missionCustomer.hasCollectShop || 0;
                                    $.totalPoint = _0xa96f7d.data.missionCustomer.totalPoint || 0;
                                    $.remainPoint = _0xa96f7d.data.missionCustomer.remainPoint || 0;
                                    $.remainChance = _0xa96f7d.data.missionCustomer.remainChance || 0;
                                }
                            } else _0x3f0d9c == "missionInviteList" && console.log("本月已邀请助力(" + _0xa96f7d.data.total + ")");
                        } else {
                            if (_0xa96f7d.data.msg) console.log(_0xa96f7d.data.msg); else _0xa96f7d.errorMessage ? console.log(_0x3f0d9c + " " + _0xa96f7d.errorMessage) : console.log(_0x37d836);
                        }
                    } else _0xa96f7d.errorMessage ? console.log(_0x3f0d9c + " " + _0xa96f7d.errorMessage) : console.log(_0x37d836);
                } else console.log(_0x37d836);

                break;

            default:
                console.log(_0x37d836);
        }

        if (typeof _0xa96f7d == "object") {
            if (_0xa96f7d.errorMessage) {
                if (_0xa96f7d.errorMessage.indexOf("火爆") > -1) {
                    $.hotFlag = true;
                }
            }
        }
    } catch (_0xec1918) {
        console.log(_0xec1918);
    }
}

function _0x458b6a(_0x5d0c1e, _0x3e7b24, _0x792e7c = "POST") {
    let _0x378b89 = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x506e7e,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };

    if (_0x5d0c1e.indexOf("https://mpdz-car-dz.isvjcloud.com") > -1) {
        _0x378b89.Origin = "https://mpdz-car-dz.isvjcloud.com";
        _0x378b89["Content-Type"] = "application/json; charset=utf-8";
        delete _0x378b89.Cookie;
    }

    return {
        "url": _0x5d0c1e,
        "method": _0x792e7c,
        "headers": _0x378b89,
        "body": _0x3e7b24,
        "timeout": 30000
    };
}

function _0x1651bc(_0x24d6b4) {
    _0x24d6b4 = _0x24d6b4 || 32;
    let _0x42eb6a = "abcdef0123456789",
        _0xc8f41 = _0x42eb6a.length,
        _0x267a09 = "";

    for (i = 0; i < _0x24d6b4; i++) _0x267a09 += _0x42eb6a.charAt(Math.floor(Math.random() * _0xc8f41));

    return _0x267a09;
}

function _0x2dd3fb(_0x2088b7) {
    if (typeof _0x2088b7 == "string") try {
        return JSON.parse(_0x2088b7);
    } catch (_0x5b2ec2) {
        return console.log(_0x5b2ec2), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

async function _0x35c3ce() {
    $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x1651bc(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
const _0x802a93 = require('crypto-js');
function _0x5338bf(_0x48a3bb, _0x40c479) {
    let _0x362f99 = { 'actId': $.actId, ..._0x40c479, 'method': _0x48a3bb, 'userId': $.userId, 'buyerNick': $.MixNick || '' };
    let _0x168dc9 = _0x550691(_0x362f99);
    const _0x410204 = { 'jsonRpc': '2.0', 'params': { 'commonParameter': { 'm': 'POST', ..._0x168dc9, 'userId': $.userId }, 'admJson': { 'actId': $.actId, ..._0x40c479, 'method': _0x48a3bb, 'userId': $.userId, 'buyerNick': $.MixNick || '' } } };
    if (_0x48a3bb.indexOf('missionInviteList') > -1) {
        delete _0x410204.params.admJson.actId;
    }
    return $.toStr(_0x410204, 'taskPostUrl');
}
function _0x550691(_0x135459) {
    let _0x1becb7 = new Date().valueOf(), _0x25556c = JSON.stringify(_0x135459), _0x5cf5ba = new RegExp('\'', 'g'), _0x21732b = new RegExp('~', 'g'), _0xfa8925 = encodeURIComponent(_0x25556c);
    _0xfa8925 = _0xfa8925.replace(_0x5cf5ba, '%27'), _0xfa8925 = _0xfa8925.replace(_0x21732b, '%7E');
    let _0x32df53 = 'k9mbrALjx4pLq5sgpO' + _0xfa8925 + 'z' + _0x1becb7 + 'xgwky6n09be8ih0x63s9i5zwdfdmou00';
    return { 'sign': _0x802a93.MD5(_0x32df53.toLowerCase()).toString(), 'timeStamp': _0x1becb7 };
};

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }