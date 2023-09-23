/*
第一个账号助力作者 其他依次助力CK1
默认不抽奖，如需要设置变量erport ybdraw='true'
默认不兑换，如需要设置变量erport ybaid='兑换id'
1 1 1 1 * jd_qiuly.js
*/

const $ = new Env("中秋礼遇 酒等你来");
const _0x387bdd = $.isNode() ? require("./jdCookie.js") : "",
    _0x1cb108 = $.isNode() ? require("./sendNotify") : "",
    _0x425f93 = require("./function/dylank.js"),
    _0x5eddd7 = require("./function/dylany"),
    _0x37d2fc = require("crypto-js");

let _0x234b0a = process.env.ybdraw ? process.env.ybdraw : "false",
    _0x4cd601 = [],
    _0x470f11 = "";

if ($.isNode()) {
    Object.keys(_0x387bdd).forEach(_0x2750fd => {
        _0x4cd601.push(_0x387bdd[_0x2750fd]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x4cd601 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x55f44b($.getdata("CookiesJD") || "[]").map(_0xc682a8 => _0xc682a8.cookie)].filter(_0x1038a7 => !!_0x1038a7);
}

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
let _0x3fe202 = ["rr1f46AhKfZc5jmsD3CogsjNhNaYFy2HteErE6izlhTf9nrGY7gBkCdGU4C6z/xD"],
    _0x521037 = 0;
_0x521037 = Math.floor(Math.random() * _0x3fe202.length);

let _0x364007 = _0x3fe202[_0x521037] || "",
    _0x2348c2 = process.env.car_num || "9999";

!(async () => {
    console.log("\n活动入口： https://mpdz-act-dz.isvjcloud.com/jdbeverage/pages/jsxz/draw");
    console.log("月饼可兑换奖品和抽奖！");

    if (!_0x4cd601[0]) {
        const _0x6ae56b = {
            "open-url": "https://bean.m.jd.com/"
        };
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x6ae56b);
        return;
    }

    $.userId = "10299171";
    $.actId = "jd_beverage_union_230915";
    $.inviteNick = _0x364007;
    $.aid = process.env.ybaid ? process.env.ybaid : "";

    for (let _0x47c9af = 0; _0x47c9af < _0x2348c2; _0x47c9af++) {
        _0x470f11 = _0x4cd601[_0x47c9af];

        if (_0x470f11) {
            $.UserName = decodeURIComponent(_0x470f11.match(/pt_pin=([^; ]+)(?=;?)/) && _0x470f11.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x47c9af + 1;
            message = "";
            $.bean = 0;
            $.hotFlag = false;
            $.nickName = false;
            $.nickName = "";
            console.log("\n\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            await _0x29549c();
            await _0xa1c702();

            if ($.outFlag) {
                break;
            }
        }
    }

    if ($.outFlag) {
        let _0x200f1e = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x200f1e);

        if ($.isNode()) {
            await _0x1cb108.sendNotify("" + $.name, "" + _0x200f1e);
        }
    }
})().catch(_0x26676e => $.logErr(_0x26676e)).finally(() => $.done());

async function _0xa1c702() {
    try {
        $.hasEnd = true;
        $.Token = "";
        $.Pin = "";
        $.MixNick = "";

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本");
            return;
        }

        $.Token = await _0x425f93(_0x470f11, "https://mpdz-act-dz.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取token失败！");
            return;
        }

        await _0x43f782("activity_load");

        if ($.MixNick == "") {
            console.log("获取mixnick失败");
            return;
        }

        $.index == 1 && (await _0x43f782("getAwardSettingList"));

        if ($.hotFlag) {
            return;
        }

        await _0x43f782("绑定");
        await _0x43f782("completeState");

        if ($.hasCollectShop == 0) {
            console.log("\n去开卡...");
            $.openList = [1000013169, 1000014485, 1000089246, 1000004718, 1000088849];

            for (let _0x141679 of $.openList) {
                $.openCard = false;
                $.shopactivityId = "";
                $.joinVenderId = _0x141679;

                for (let _0xe4f978 of Array(3)) {
                    await _0x5cd19b();
                    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

                    if ($.errorJoinShop.indexOf("失败") == -1 || $.errorJoinShop.indexOf("火爆") == -1) {
                        break;
                    }
                }

                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                    console.log("可能开卡黑了,跳出");
                    return;
                }

                await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                $.missionType = "openCard";
                await _0x43f782("completeMission");
            }
        } else {
            $.log("\n已全部开卡!");
        }

        console.log("\n开始任务...");

        for (let _0x81c9d7 = 0; _0x81c9d7 < $.taskLists.length; _0x81c9d7++) {
            $.missionType = $.taskLists[_0x81c9d7].type;

            if (!$.taskLists[_0x81c9d7].isComplete) {
                switch ($.missionType) {
                    case "openCard":
                    case "shareAct":
                    case "uniteAddCart":
                        break;

                    case "viewTimes":
                    case "uniteAddCart":
                    case "followChannel":
                    case "viewCommodity":
                    case "uniteCollectShop":
                        console.log("去做  " + $.taskLists[_0x81c9d7].missionName);
                        await _0x43f782("completeMission");
                        await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                        break;

                    default:
                        await _0x43f782("completeMission");
                        await $.wait(1000);
                }
            } else {
                console.log($.taskLists[_0x81c9d7].missionName + "----已完成");
            }
        }

        await _0x43f782("activity_load");
        await $.wait(1000);
        console.log("\n当前有月饼：" + $.remainPoint);
        $.aid ? (console.log("\n去兑换" + $.aid + "..."), await _0x43f782("exchangePost"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10))) : $.log("\n默认不兑换，请设置兑换ID");

        if (_0x234b0a == "true") {
            $.log("\n去抽奖...");

            for (let _0x3b5b83 = 1; _0x3b5b83 < $.remainPoint; _0x3b5b83++) {
                await _0x43f782("drawPost");
                await $.wait(parseInt(Math.random() * 1000 + 2500, 10));

                if (_0x3b5b83 >= 5) {
                    console.log("每次执行抽奖5次！");
                    break;
                }
            }
        } else {
            console.log("默认不抽奖,变量ybdraw='true'");
        }

        console.log("\n助力：" + $.inviteNick);
        $.index == 1 && ($.inviteNick = $.MixNick, console.log("后面的都会助力：" + $.inviteNick));
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    } catch (_0x3463ba) {
        console.log(_0x3463ba);
    }
}

async function _0x43f782(_0x23ec27) {
    if ($.outFlag) {
        return;
    }

    let _0x5185c = "https://mpdz-act-dz.isvjcloud.com",
        _0x43d4a5 = "",
        _0x1f6f8a = "POST",
        _0x11cb18 = "";

    switch (_0x23ec27) {
        case "isvObfuscator":
            const _0x4e6255 = {
                "id": "",
                "url": "https://mpdz-act-dz.isvjcloud.com"
            };

            let _0x26dea8 = await dy.getbody("isvObfuscator", _0x4e6255);

            url = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
            _0x43d4a5 = _0x26dea8;
            break;

        case "activity_load":
            url = _0x5185c + "/dm/front/jdBeverageUnion/activity/load?open_id=&mix_nick=" + $.MixNick + "&push_way=1&user_id=";
            const _0x5936c0 = {
                "jdToken": $.Token,
                "inviteNick": $.inviteNick
            };
            _0x11cb18 = _0x5936c0;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/activity/load", _0x11cb18);
            break;

        case "completeState":
            url = _0x5185c + "/dm/front/jdBeverageUnion/mission/completeState?open_id=&mix_nick=" + $.MixNick;
            _0x11cb18 = {};
            _0x43d4a5 = _0x541908("/jdBeverageUnion/mission/completeState", _0x11cb18);
            break;

        case "绑定":
            url = _0x5185c + "/dm/front/jdBeverageUnion/customer/inviteRelation?open_id=&mix_nick=" + $.MixNick + "&push_way=1&user_id=";
            const _0x34b826 = {
                "missionType": "shareAct",
                "inviterNick": $.inviteNick || ""
            };
            _0x11cb18 = _0x34b826;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/customer/inviteRelation", _0x11cb18);
            break;

        case "助力":
            url = _0x5185c + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            const _0x3ef53e = {
                "missionType": "shareAct",
                "inviterNick": $.inviteNick || "",
                "userId": 10299171
            };
            _0x11cb18 = _0x3ef53e;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/mission/completeMission", _0x11cb18);
            break;

        case "followShop":
            url = _0x5185c + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            const _0x4e5c03 = {
                "missionType": $.missionType,
                "userId": 10299171,
                "shopId": $.userIds,
                "buyerNick": $.inviteNick
            };
            _0x11cb18 = _0x4e5c03;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/mission/completeMission", _0x11cb18);
            break;

        case "addCart":
            url = _0x5185c + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            const _0x3fc56e = {
                "missionType": $.missionType,
                "userId": 10299171,
                "goodsNumId": $.goodsNumId,
                "buyerNick": $.inviteNick
            };
            _0x11cb18 = _0x3fc56e;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/mission/completeMission", _0x11cb18);
            break;

        case "getCusShop":
            url = _0x5185c + "/dm/front/jdBeverageUnion/cusShop/getCusShop?open_id=&mix_nick=" + $.MixNick;
            _0x11cb18 = {};
            _0x43d4a5 = _0x541908("/jdBeverageUnion/cusShop/getCusShop", _0x11cb18);
            break;

        case "getCusShopProduct":
            url = _0x5185c + "/dm/front/jdBeverageUnion/cusShop/getCusShopProduct?open_id=&mix_nick=" + $.MixNick;
            _0x11cb18 = {};
            _0x43d4a5 = _0x541908("/jdBeverageUnion/cusShop/getCusShop", _0x11cb18);
            break;

        case "completeMission":
            url = _0x5185c + "/dm/front/jdBeverageUnion/mission/completeMission?open_id=&mix_nick=" + $.MixNick;
            const _0x216a05 = {
                "missionType": $.missionType
            };
            _0x11cb18 = _0x216a05;
            $.joinVenderId && (_0x11cb18 = {
                ..._0x11cb18,
                "shopId": $.joinVenderId
            });
            _0x43d4a5 = _0x541908("/jdBeverageUnion/mission/completeMission", _0x11cb18);
            break;

        case "playGame":
            url = _0x5185c + "/dm/front/jdBeverageUnion/game/playGame?open_id=&mix_nick=" + $.MixNick;
            const _0x446f06 = {
                "actId": $.actId,
                "carId": $.usecar.id,
                "carName": $.usecar.carName,
                "userId": 10299171,
                "buyerNick": $.inviteNick
            };
            _0x11cb18 = _0x446f06;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/game/playGame", _0x11cb18);
            break;

        case "exchangePost":
            url = _0x5185c + "/dm/front/jdBeverageUnion/interactive/exchangePost?open_id=&mix_nick=" + $.MixNick + "&user_id=";
            const _0x1f0038 = {
                "dataType": "exchange",
                "awardId": $.aid
            };
            _0x11cb18 = _0x11cb18 = _0x1f0038;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/interactive/exchangePost", _0x11cb18);
            break;

        case "getAwardSettingList":
            url = _0x5185c + "/dm/front/jdBeverageUnion/awards/getAwardSettingList?open_id=&mix_nick=" + $.MixNick + "&user_id=";
            const _0x4b6ec1 = {
                "dataType": "exchange"
            };
            _0x11cb18 = _0x11cb18 = _0x4b6ec1;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/awards/getAwardSettingList", _0x11cb18);
            break;

        case "missionInviteList":
            url = _0x5185c + "/dm/front/jdBeverageUnion/customer/inviteList?open_id=&mix_nick=" + $.MixNick;
            const _0xa70594 = {
                "actId": $.actId,
                "userId": 10299171,
                "missionType": "shareAct",
                "inviteNum": 1,
                "buyerNick": $.MixNick
            };
            _0x11cb18 = _0xa70594;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/customer/inviteList", _0x11cb18);
            break;

        case "drawPost":
            url = _0x5185c + "/dm/front/jdBeverageUnion/interactive/drawPost?open_id=&mix_nick=" + $.MixNick + "&bizExtString=&push_way=1&user_id=";
            const _0x552882 = {
                "dataType": "draw"
            };
            _0x11cb18 = _0x552882;
            _0x43d4a5 = _0x541908("/jdBeverageUnion/interactive/drawPost", _0x11cb18);
            break;

        default:
            console.log("错误" + _0x23ec27);
    }

    let _0x220656 = _0x2ba08e(url, _0x43d4a5, _0x1f6f8a);

    return new Promise(async _0x1458f5 => {
        $.post(_0x220656, (_0x551a2e, _0x37ea0c, _0x51377f) => {
            try {
                _0x551a2e ? (_0x37ea0c && _0x37ea0c.statusCode && _0x37ea0c.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x551a2e, _0x551a2e)), console.log(" API请求失败，请检查网路重试")) : _0x261bfc(_0x23ec27, _0x51377f);
            } catch (_0x4b8a65) {
                console.log(_0x4b8a65, _0x37ea0c);
            } finally {
                _0x1458f5();
            }
        });
    });
}

async function _0x261bfc(_0x154b37, _0x305a8e) {
    let _0x20875f = "";

    try {
        (_0x154b37 != "accessLogWithAD" || _0x154b37 != "drawContent") && _0x305a8e && (_0x20875f = JSON.parse(_0x305a8e));
    } catch (_0xb29e77) {
        console.log(_0x154b37 + " 执行任务异常");
        console.log(_0x305a8e);
        $.runFalag = false;
    }

    try {
        switch (_0x154b37) {
            case "isvObfuscator":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.errcode == 0) {
                        if (typeof _0x20875f.token != "undefined") {
                            $.Token = _0x20875f.token;
                        }
                    } else {
                        _0x20875f.message ? console.log("isvObfuscator " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "getCusShop":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.success === true && _0x20875f.data) {
                        _0x20875f.data.status && _0x20875f.data.status == 200 && ($.userIds = _0x20875f.data.data.cusShop.userId);
                    } else {
                        _0x20875f.message ? console.log(_0x154b37 + " " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "getAwardSettingList":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.success === true && _0x20875f.data) {
                        if (_0x20875f.data.status && _0x20875f.data.status == 200) {
                            console.log("兑换列表：");
                            $.awardList = _0x20875f.data.data.awardSettings;

                            for (let _0x41b3e6 of $.awardList) {
                                console.log(_0x41b3e6.awardName + " -> 需月饼：" + _0x41b3e6.awardDes + " id：" + _0x41b3e6.id + " 库存：" + _0x41b3e6.remainNum);
                            }

                            console.log("");
                        }
                    } else {
                        _0x20875f.message ? console.log(_0x154b37 + " " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "completeState":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.success === true && _0x20875f.data) {
                        _0x20875f.data.status && _0x20875f.data.status == 200 && ($.taskLists = _0x20875f.data.data || []);
                    } else {
                        _0x20875f.message ? console.log(_0x154b37 + " " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "drawPost":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.success === true && _0x20875f.data) {
                        _0x20875f.data?.["data"]?.["awardSendLog"]?.["awardName"] ? console.log("获得: " + _0x20875f.data.data.awardSendLog.awardName) : console.log(_0x305a8e);
                    } else {
                        _0x20875f.message ? console.log(_0x154b37 + " " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "exchangePost":
                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.data) {
                        console.log(_0x305a8e);
                    } else {
                        _0x20875f.message ? console.log(_0x154b37 + " " + _0x20875f.message) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            case "accessLogWithAD":
            case "drawContent":
            case "completeMission":
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
                let _0x279a2d = "";

                if (_0x154b37 == "followShop") {
                    _0x279a2d = "关注";
                }

                if (_0x154b37 == "addCart") {
                    _0x279a2d = "加购";
                }

                if (_0x154b37 == "specialSign") {
                    _0x279a2d = "签到";
                }

                if (typeof _0x20875f == "object") {
                    if (_0x20875f.success && _0x20875f.success === true && _0x20875f.data) {
                        if (_0x20875f.data.status && _0x20875f.data.status == 200) {
                            _0x20875f = _0x20875f.data;

                            if (_0x154b37 != "setMixNick" && (_0x20875f.msg || _0x20875f.data.remark)) {
                                if (!_0x20875f.msg.includes("关系")) {
                                    console.log((_0x279a2d && _0x279a2d + ":" || "") + (_0x20875f.msg || _0x20875f.data.isOpenCard || _0x20875f.data.remark || ""));
                                }
                            }

                            if (_0x154b37 == "activity_load") {
                                _0x20875f.data && ($.MixNick = _0x20875f.data.missionCustomer.buyerNick || "", $.hasCollectShop = _0x20875f.data.missionCustomer.hasCollectShop || 0, $.remainPoint = _0x20875f.data.missionCustomer.remainPoint || 0, $.remainChance = _0x20875f.data.missionCustomer.remainChance || 0, $.endTime = _0x20875f.data.cusActivity.endTime || 0, $.actUpLoadId = _0x20875f.data.cusActivity.actUpLoadId, $.usedChance = _0x20875f.data.missionCustomer.usedChance || 0, $.hasAddCart = _0x20875f.data.missionCustomer.hasAddCart);
                            } else {
                                _0x154b37 == "missionInviteList" && console.log("本月已邀请助力(" + _0x20875f.data.total + ")");
                            }
                        } else {
                            if (_0x20875f.data.msg) {
                                console.log(_0x20875f.data.msg);
                            } else {
                                _0x20875f.errorMessage ? console.log(_0x154b37 + " " + _0x20875f.errorMessage) : console.log(_0x305a8e);
                            }
                        }
                    } else {
                        _0x20875f.errorMessage ? console.log(_0x154b37 + " " + _0x20875f.errorMessage) : console.log(_0x305a8e);
                    }
                } else {
                    console.log(_0x305a8e);
                }

                break;

            default:
                console.log(_0x305a8e);
        }

        typeof _0x20875f == "object" && _0x20875f.errorMessage && _0x20875f.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    } catch (_0x47df65) {
        console.log(_0x47df65);
    }
}

function _0x2ba08e(_0x2dd6bd, _0x36d2d0, _0x21707a = "POST") {
    const _0x57a069 = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x470f11,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
    };
    _0x2dd6bd.indexOf("https://mpdz-act-dz.isvjcloud.com") > -1 && (_0x57a069.Origin = "https://mpdz-act-dz.isvjcloud.com", _0x57a069["Content-Type"] = "application/json; charset=utf-8", delete _0x57a069.Cookie);
    const _0x1ba3af = {
        "url": _0x2dd6bd,
        "method": _0x21707a,
        "headers": _0x57a069,
        "body": _0x36d2d0,
        "timeout": 30000
    };
    return _0x1ba3af;
}

async function _0x5cd19b() {
    if (!$.joinVenderId) {
        return;
    }

    return new Promise(async _0x4052d0 => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        $.shopactivityId = "";
        await _0x41b899();
        const _0x4e89f0 = {
            "venderId": "" + $.joinVenderId + "",
            "shopId": "" + $.joinVenderId + "",
            "bindByVerifyCodeFlag": 1,
            "registerExtend": {},
            "writeChildFlag": 0,
            "activityId": "" + $.shopactivityId + "",
            "channel": 406
        };
        let _0x5d8c8e = _0x4e89f0;
        $.shopactivityId == "" && delete _0x5d8c8e.activityId;
        const _0x1d01f8 = {
            "appId": "8adfb",
            "fn": "bindWithVender",
            "body": _0x5d8c8e,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0x5d8c8e = await _0x5eddd7.getbody(_0x1d01f8);
        const _0x2fa0c7 = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x470f11,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x37b393 = {
            "url": "https://api.m.jd.com/client.action?" + _0x5d8c8e + "&uuid=88888",
            "headers": _0x2fa0c7,
            "timeout": 30000
        };
        $.get(_0x37b393, async (_0x36e0f8, _0x4ea6f9, _0x2bac7e) => {
            try {
                _0x2bac7e = _0x2bac7e && _0x2bac7e.match(/jsonp_.*?\((.*?)\);/) && _0x2bac7e.match(/jsonp_.*?\((.*?)\);/)[1] || _0x2bac7e;

                let _0x2dca94 = $.toObj(_0x2bac7e, _0x2bac7e);

                if (_0x2dca94 && typeof _0x2dca94 == "object") {
                    if (_0x2dca94 && _0x2dca94.success === true) {
                        console.log("    " + _0x2dca94.message);
                        $.errorJoinShop = _0x2dca94.message;

                        if (_0x2dca94.result && _0x2dca94.result.giftInfo) {
                            for (let _0x12ad7d of _0x2dca94.result.giftInfo.giftList) {
                                console.log("入会获得:" + _0x12ad7d.discountString + _0x12ad7d.prizeName + _0x12ad7d.secondLineDesc);
                            }
                        }
                    } else {
                        _0x2dca94 && typeof _0x2dca94 == "object" && _0x2dca94.message ? ($.errorJoinShop = _0x2dca94.message, console.log("" + (_0x2dca94.message || ""))) : console.log(_0x2bac7e);
                    }
                } else {
                    console.log(_0x2bac7e);
                }
            } catch (_0x26dda5) {
                $.logErr(_0x26dda5, _0x4ea6f9);
            } finally {
                _0x4052d0();
            }
        });
    });
}

async function _0x41b899() {
    return new Promise(async _0x45ec79 => {
        const _0x272e55 = {
            "venderId": $.joinVenderId,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "ef79a",
            "needSecurity": true,
            "bizId": "shop_view_app",
            "channel": 406
        };
        let _0x4f44af = _0x272e55;
        const _0x1cdc99 = {
            "appId": "ef79a",
            "fn": "getShopOpenCardInfo",
            "body": _0x4f44af,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0x4f44af = await _0x5eddd7.getbody(_0x1cdc99);
        const _0x43875a = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x470f11,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x54bdb2 = {
            "url": "https://api.m.jd.com/client.action?" + _0x4f44af + "&uuid=88888",
            "headers": _0x43875a,
            "timeout": 60000
        };
        $.get(_0x54bdb2, async (_0x23c817, _0x56b3d4, _0x2be5a8) => {
            try {
                _0x2be5a8 = _0x2be5a8 && _0x2be5a8.match(/jsonp_.*?\((.*?)\);/) && _0x2be5a8.match(/jsonp_.*?\((.*?)\);/)[1] || _0x2be5a8;

                let _0x188556 = $.toObj(_0x2be5a8, _0x2be5a8);

                _0x188556 && typeof _0x188556 == "object" ? _0x188556 && _0x188556.success == true && (console.log("去加入 -> " + (_0x188556.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x188556.result[0].interestsRuleList && _0x188556.result[0].interestsRuleList[0] && _0x188556.result[0].interestsRuleList[0].interestsInfo && _0x188556.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x2be5a8);
            } catch (_0xf28679) {
                $.logErr(_0xf28679, _0x56b3d4);
            } finally {
                _0x45ec79();
            }
        });
    });
}

function _0x5dc8bc(_0x563fa1) {
    _0x563fa1 = _0x563fa1 || 32;
    let _0x45a992 = "abcdef0123456789",
        _0xd0cc11 = _0x45a992.length,
        _0x30b23d = "";

    for (i = 0; i < _0x563fa1; i++) {
        _0x30b23d += _0x45a992.charAt(Math.floor(Math.random() * _0xd0cc11));
    }

    return _0x30b23d;
}

function _0x55f44b(_0x535bc6) {
    if (typeof _0x535bc6 == "string") {
        try {
            return JSON.parse(_0x535bc6);
        } catch (_0x30858e) {
            console.log(_0x30858e);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x541908(_0x373369, _0x172b20) {
    const _0x311a96 = {
        "actId": $.actId,
        ..._0x172b20,
        "method": _0x373369,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    d = _0x311a96;
    sign2 = _0xfb10f0(d);
    const _0x1c6db9 = {
        "m": "POST",
        "sign": sign2.sign,
        "timestamp": sign2.timeStamp,
        "userId": $.userId
    };
    const _0x51565d = {
        "actId": $.actId,
        ..._0x172b20,
        "method": _0x373369,
        "userId": $.userId,
        "buyerNick": $.MixNick || ""
    };
    const _0x3afac5 = {
        "commonParameter": _0x1c6db9,
        "admJson": _0x51565d
    };
    const _0x133c78 = {
        "jsonRpc": "2.0",
        "params": _0x3afac5
    };
    _0x373369.indexOf("missionInviteList") > -1 && delete _0x133c78.params.admJson.actId;
    return $.toStr(_0x133c78, _0x133c78);
}

function _0xfb10f0(_0x4a4478) {
    const _0x24a204 = {
        "aa": "ba75b4120884441c916ce2653cc414ee",
        "bb": "801c62fb5ed3404a8b5d2de6e96b4023"
    };
    u = _0x24a204;
    _0x521037 = new Date().valueOf();
    r = u.aa;
    i = u.bb;
    _0x4a4478 = JSON.stringify(_0x4a4478);
    c = encodeURIComponent(_0x4a4478);
    d = new RegExp("'", "g");
    A = new RegExp("~", "g");
    c = c.replace(d, "%27");
    c = c.replace(A, "%7E");
    l = i + "a" + i + "b" + c + "c" + _0x521037 + r;
    p = _0x37d2fc.MD5(l.toLowerCase()).toString();
    const _0x4ab15a = {
        "sign": p,
        "timeStamp": _0x521037
    };
    return _0x4ab15a;
}

async function _0x29549c() {
    $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x5dc8bc(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }