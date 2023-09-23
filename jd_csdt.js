/*
入口：我的--更多游戏--超市地图
17 17 * * * jd_csdt.js
*/

const $ = new Env('超市地图挑战');

const _0x4b3155 = $.isNode() ? require("./jdCookie.js") : "",
    _0x3dfe2c = $.isNode() ? require("./sendNotify") : "",
    _0x407419 = require("./function/dylank"),
    _0x589f47 = require("./function/dylany");

let _0x43e8f8 = [],
    _0x5eb18d = "",
    _0x3b2084 = "",
    _0x1eb35b = {},
    _0x1bf31a = process.env.opencard_banpin || "",
    _0x48add7 = "https://cs99znqcjdtdlyh-2068-dz.isvjcloud.com/m/739130/dz3b933dac05ea48bb901b53e15d91";

$.activityId = "dz3b933dac05ea48bb901b53e15d91";
$.userId = "739130";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;

if ($.isNode()) {
    Object.keys(_0x4b3155).forEach(_0x3c5f72 => {
        _0x43e8f8.push(_0x4b3155[_0x3c5f72]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x43e8f8 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x56a8a2 => _0x56a8a2.cookie)].filter(_0x2b1556 => !!_0x2b1556);
}

!(async () => {
    if (!_0x43e8f8[0]) {
        const _0x26b6b7 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x26b6b7);
        return;
    }

    $.log("\nTG：https://t.me/dylan_jdpro");
    $.log("2023-9-30 23:59:59活动结束！");

    for (let _0x11ae1b = 0; _0x11ae1b < _0x43e8f8.length; _0x11ae1b++) {
        _0x5eb18d = _0x43e8f8[_0x11ae1b];
        originCookie = _0x43e8f8[_0x11ae1b];

        if (_0x5eb18d) {
            $.UserName = decodeURIComponent(_0x5eb18d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5eb18d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x11ae1b + 1;
            $.hotFlag = false;
            $.nickName = "";
            $.isLogin = true;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (_0x1bf31a.indexOf($.UserName) > -1) {
                console.log("黑名单pin,跳出！");
                continue;
            }

            _0x4f030d();

            await _0xcb60();

            if (!$.isLogin) {
                const _0x44adf5 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x44adf5);
                $.isNode() && (await _0x3dfe2c.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x11a5e2();

            if ($.outFlag || $.activityEnd) {
                break;
            }
        }

        await $.wait(2000);
        $.index % 5 == 0 && (console.log("\n休息一下，可持续发展......"), await $.wait(parseInt(Math.random() * 2000 + 5000, 10)));
    }

    if ($.outFlag) {
        let _0x1b2dfa = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x1b2dfa);
        $.isNode() && (await _0x3dfe2c.sendNotify("" + $.name, "" + _0x1b2dfa));
    }

    _0x3b2084 && $.msg($.name, "", "" + _0x3b2084);
})().catch(_0x562946 => {
    return $.logErr(_0x562946);
}).finally(() => {
    return $.done();
});

async function _0x11a5e2() {
    try {
        $.hasEnd = false;
        $.endTime = 0;
        $.followShop = 0;
        $.addCart = 0;
        $.Token = "";
        $.Pin = "";
        activityCookie = "";
        $.Token = await _0x407419(_0x5eb18d, "https://cs99znqcjdtdlyh-2068-dz.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取Token失败");
            return;
        }

        for (let _0x32ec6c of Array(3)) {
            await _0x330576();

            if (activityCookie) {
                break;
            }

            await $.wait(1000);
        }

        if (!activityCookie) {
            console.log("获取cookie失败");
            return;
        }

        if ($.activityEnd === true) {
            return;
        }

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await _0xcf02b7("getMyCidPing");

        if (!$.Pin) {
            console.log("获取Pin失败");
            return;
        }

        await _0xcf02b7("getUserInfo");
        await _0xcf02b7("init");
        await _0xcf02b7("accessLogWithAD");
        await _0xcf02b7("activityContent");

        if ($.hasEnd === true || $.endTime && Date.now() > $.endTime) {
            $.activityEnd = true;
            console.log("活动结束！！！");
            return;
        }

        !$.agree && ($.log("开启挑战..."), await _0xcf02b7("agreement"), await _0xcf02b7("viewBill"), await _0xcf02b7("startGame"));
        await _0xcf02b7("lightMap");
        $.log("\n检查领取奖品...");

        for (let _0x5ef70a of $.rewardMap) {
            _0x5ef70a.lqStatus == 1 && ($.prizeId = _0x5ef70a.prizeId, await _0xcf02b7("getReward"), await $.wait(2000));
        }

        if ($.hotFlag == true) {
            console.log("黑子！");
            return;
        }

        $.index == 1;

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    } catch (_0x41f6aa) {
        console.log(_0x41f6aa);
    }
}

async function _0xcf02b7(_0x24f17d) {
    if ($.outFlag) {
        return;
    }

    let _0x5bc479 = "https://cs99znqcjdtdlyh-2068-dz.isvjcloud.com",
        _0x342c38 = {},
        _0x45dbfe = "",
        _0x2a3689 = "post";

    switch (_0x24f17d) {
        case "getUserInfo":
            _0x45dbfe = _0x5bc479 + "/wxActionCommon/getUserInfo";
            _0x342c38 = "pin=" + encodeURIComponent($.Pin);
            break;

        case "getMyCidPing":
            _0x45dbfe = _0x5bc479 + "/customer/getMyCidPing";
            _0x342c38 = "userId=" + ($.userId || "") + "&token=" + $.Token + "&fromType=APP&activityId=" + $.activityId + "&pin=";
            break;

        case "init":
            _0x45dbfe = _0x5bc479 + "/dingzhi/taskact/common/init";
            _0x342c38 = "activityId=" + $.activityId + "&dzActivityType=0&pin=";
            break;

        case "accessLogWithAD":
            _0x45dbfe = _0x5bc479 + "/common/accessLogWithAD";

            let _0x52cc71 = _0x5bc479 + "/m/739130/" + $.activityId + "/?adsource=001&sid=";

            _0x342c38 = "venderId=" + ($.userId || "") + "&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(_0x52cc71) + "&subType=JDApp&adSource=001";
            break;

        case "activityContent":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/activityContent";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&shareUuid=";
            break;

        case "getReward":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/getReward";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&prizeId=" + $.prizeId;
            break;

        case "lightMap":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/lightMap";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
            break;

        case "agreement":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/agreement";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
            break;

        case "viewBill":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/viewBill";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
            break;

        case "startGame":
            _0x45dbfe = _0x5bc479 + "/dingzhi/jdcs/active/startGame";
            _0x342c38 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
            break;

        default:
            console.log("错误" + _0x24f17d);
    }

    let _0x381a96 = _0x97a474(_0x45dbfe, _0x342c38, _0x2a3689);

    return new Promise(async _0x3563c3 => {
        $[_0x2a3689](_0x381a96, async (_0x1d3b8c, _0x3174ad, _0x5b5e5d) => {
            try {
                if (_0x1d3b8c) {
                    _0x3174ad && typeof _0x3174ad.statusCode != "undefined" && _0x3174ad.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
                    console.log("" + $.toStr(_0x1d3b8c, _0x1d3b8c));
                } else {
                    if (_0x5b5e5d.includes("DOCTYPE")) {
                        await _0xcf02b7(_0x24f17d);
                        return;
                    }

                    _0xea96a(_0x3174ad);

                    _0x2ebba3(_0x24f17d, _0x5b5e5d);
                }
            } catch (_0x4b0b0e) {
                console.log(_0x4b0b0e, _0x3174ad);
            } finally {
                _0x3563c3();
            }
        });
    });
}

async function _0x2ebba3(_0x4a748e, _0x565401) {
    let _0x289c29 = "";

    try {
        (_0x4a748e != "accessLogWithAD" || _0x4a748e != "drawContent") && _0x565401 && (_0x289c29 = JSON.parse(_0x565401));
    } catch (_0x3ea60b) {
        console.log(_0x4a748e + " 执行任务异常");
    }

    try {
        switch (_0x4a748e) {
            case "getMyCidPing":
                if (typeof _0x289c29 == "object") {
                    if (_0x289c29.result && _0x289c29.result === true) {
                        _0x289c29.data && typeof _0x289c29.data.secretPin != "undefined" && ($.Pin = _0x289c29.data.secretPin);
                        _0x289c29.data && typeof _0x289c29.data.nickname != "undefined" && ($.nickname = _0x289c29.data.nickname);
                    } else {
                        _0x289c29.errorMessage ? console.log("" + _0x4a748e + (_0x289c29.errorMessage || "")) : console.log("" + _0x4a748e + _0x565401);
                    }
                }

                break;

            case "getUserInfo":
                if (typeof _0x289c29 == "object") {
                    if (_0x289c29.result && _0x289c29.result === true) {
                        _0x289c29.data && typeof _0x289c29.data.yunMidImageUrl != "undefined" && ($.attrTouXiang = _0x289c29.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png");
                    } else {
                        if (_0x289c29.errorMessage) {
                            console.log("" + _0x4a748e + (_0x289c29.errorMessage || ""));
                        } else {
                            console.log("" + _0x4a748e + _0x565401);
                        }
                    }
                }

                break;

            case "activityContent":
                if (typeof _0x289c29 == "object") {
                    _0x289c29.result && _0x289c29.result === true ? ($.activityName = _0x289c29.data.activityName, $.actorUuid = _0x289c29.data.actorUuid || "", $.endTime = _0x289c29.data.endTime || _0x289c29.data.activityVo && _0x289c29.data.activityVo?.["endTime"] || _0x289c29.data.activity?.["endTime"] || 0, $.hasEnd = _0x289c29.data.hasEnd || false, $.shopId = _0x289c29.data.shopId, $.venderId = _0x289c29.data.userId, $.agree = _0x289c29.data.agree) : _0x289c29.errorMessage ? console.log("" + _0x4a748e + (_0x289c29.errorMessage || "")) : console.log("" + _0x4a748e + _0x565401);
                }

                break;

            case "lightMap":
                if (typeof _0x289c29 == "object") {
                    _0x289c29.result == true && _0x289c29.data ? (_0x289c29.data.semdCoupon && console.log("首次进入获得：" + _0x289c29.data.couPonName), $.LightMap = _0x289c29.data.LightMap, $.rewardMap = _0x289c29.data.rewardMap) : console.log(_0x565401);
                }

                break;

            case "init":
                if (_0x289c29.result == true && _0x289c29.data) {
                    $.userId = _0x289c29.data.userId;
                    $.venderId = _0x289c29.data.venderId;
                    $.jdActivityId = _0x289c29.data.jdActivityId;
                    $.activityType = _0x289c29.data.activityType;
                    $.endTime = _0x289c29.data.endTime;
                }

                break;

            case "getReward":
                _0x289c29.result == true && _0x289c29.data ? $.log("获得：" + _0x289c29.data.priceName) : console.log(_0x565401);
                break;

            case "viewBill":
                if (typeof _0x289c29 == "object") {
                    _0x289c29 && console.log(_0x565401);
                }

                break;

            case "accessLogWithAD":
            case "startGame":
            case "agreement":
                break;

            default:
                console.log(_0x4a748e + " -> " + _0x565401);
        }

        typeof _0x289c29 == "object" && _0x289c29.errorMessage && _0x289c29.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
    } catch (_0x2fd2df) {
        console.log(_0x4a748e + " " + _0x2fd2df);
    }
}

function _0x97a474(_0x4954db, _0x3d20fc, _0x11e1b5 = "POST") {
    const _0x9fb82b = {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x5eb18d,
        "User-Agent": $.UA
    };
    _0x4954db.indexOf("https://cs99znqcjdtdlyh-2068-dz.isvjcloud.com") > -1 && (_0x9fb82b.Referer = _0x48add7, _0x9fb82b.Cookie = "AUTH_C_USER=" + ($.Pin || "") + ";" + activityCookie);
    const _0xd4f818 = {
        "url": _0x4954db,
        "method": _0x11e1b5,
        "headers": _0x9fb82b,
        "body": _0x3d20fc,
        "timeout": 30000
    };
    return _0xd4f818;
}

function _0x330576() {
    return new Promise(async _0x502267 => {
        const _0x454ed2 = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": _0x5eb18d,
            "Referer": _0x48add7,
            "User-Agent": $.UA
        };
        let _0x4334e1 = {
            "url": "https://cs99znqcjdtdlyh-2068-dz.isvjcloud.com/wxCommonInfo/token?t=" + Date.now(),
            "followRedirect": false,
            "headers": _0x454ed2,
            "timeout": 30000
        };
        $.get(_0x4334e1, async (_0x4110dc, _0x55c35c, _0x76f0ed) => {
            try {
                if (_0x4110dc) {
                    _0x55c35c && typeof _0x55c35c.statusCode != "undefined" && _0x55c35c.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
                    console.log("" + $.toStr(_0x4110dc));
                } else {
                    _0xea96a(_0x55c35c);
                }
            } catch (_0x29867c) {
                $.logErr(_0x29867c, _0x55c35c);
            } finally {
                _0x502267();
            }
        });
    });
}

function _0xea96a(_0x582923) {
    if (_0x582923.headers["set-cookie"]) {
        _0x5eb18d = originCookie + ";";

        for (let _0x1473a3 of _0x582923.headers["set-cookie"]) {
            _0x1eb35b[_0x1473a3.split(";")[0].substr(0, _0x1473a3.split(";")[0].indexOf("="))] = _0x1473a3.split(";")[0].substr(_0x1473a3.split(";")[0].indexOf("=") + 1);
        }

        for (const _0x4a5d35 of Object.keys(_0x1eb35b)) {
            _0x5eb18d += _0x4a5d35 + "=" + _0x1eb35b[_0x4a5d35] + ";";
        }

        activityCookie = _0x5eb18d;
    }
}

async function _0x4f030d() {
    $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x2ab7c6(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x2ab7c6(_0x334524) {
    _0x334524 = _0x334524 || 32;
    let _0xaacad = "abcdef0123456789",
        _0xf93ce4 = _0xaacad.length,
        _0x23e309 = "";

    for (i = 0; i < _0x334524; i++) {
        _0x23e309 += _0xaacad.charAt(Math.floor(Math.random() * _0xf93ce4));
    }

    return _0x23e309;
}

function _0x5778ce(_0x5c2e67) {
    if (typeof _0x5c2e67 == "string") {
        try {
            return JSON.parse(_0x5c2e67);
        } catch (_0x1097bd) {
            console.log(_0x1097bd);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

async function _0x34f528() {
    if (!$.joinVenderId) {
        return;
    }

    return new Promise(async _0x137082 => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        $.shopactivityId = "";
        await _0x322916();
        let _0x2cfcbd = {
            "venderId": "" + $.joinVenderId + "",
            "shopId": "" + $.joinVenderId + "",
            "bindByVerifyCodeFlag": 1,
            "registerExtend": {},
            "writeChildFlag": 0,
            "activityId": "" + $.shopactivityId + "",
            "channel": 406
        };
        $.shopactivityId == "" && delete _0x2cfcbd.activityId;
        const _0x2394a3 = {
            "appId": "8adfb",
            "fn": "bindWithVender",
            "body": _0x2cfcbd,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0x2cfcbd = await _0x589f47.getbody(_0x2394a3);
        const _0x1947fd = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x5eb18d,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x459bfe = {
            "url": "https://api.m.jd.com/client.action?" + _0x2cfcbd + "&uuid=88888",
            "headers": _0x1947fd,
            "timeout": 30000
        };
        $.get(_0x459bfe, async (_0x19278d, _0x735026, _0x1ee247) => {
            try {
                _0x1ee247 = _0x1ee247 && _0x1ee247.match(/jsonp_.*?\((.*?)\);/) && _0x1ee247.match(/jsonp_.*?\((.*?)\);/)[1] || _0x1ee247;

                let _0x4d805f = $.toObj(_0x1ee247, _0x1ee247);

                if (_0x4d805f && typeof _0x4d805f == "object") {
                    if (_0x4d805f && _0x4d805f.success === true) {
                        console.log("    " + _0x4d805f.message);
                        $.errorJoinShop = _0x4d805f.message;

                        if (_0x4d805f.result && _0x4d805f.result.giftInfo) {
                            for (let _0x323165 of _0x4d805f.result.giftInfo.giftList) {
                                console.log("入会获得:" + _0x323165.discountString + _0x323165.prizeName + _0x323165.secondLineDesc);
                            }
                        }
                    } else {
                        if (_0x4d805f && typeof _0x4d805f == "object" && _0x4d805f.message) {
                            $.errorJoinShop = _0x4d805f.message;
                            console.log("" + (_0x4d805f.message || ""));
                        } else {
                            console.log(_0x1ee247);
                        }
                    }
                } else {
                    console.log(_0x1ee247);
                }
            } catch (_0x254da1) {
                $.logErr(_0x254da1, _0x735026);
            } finally {
                _0x137082();
            }
        });
    });
}

async function _0x322916() {
    return new Promise(async _0x23c5bc => {
        const _0x45a5b4 = {
            "venderId": $.joinVenderId,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "ef79a",
            "needSecurity": true,
            "bizId": "shop_view_app",
            "channel": 406
        };
        let _0xb27647 = _0x45a5b4;
        const _0x3305ce = {
            "appId": "ef79a",
            "fn": "getShopOpenCardInfo",
            "body": _0xb27647,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0xb27647 = await _0x589f47.getbody(_0x3305ce);
        const _0x17bd66 = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x5eb18d,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x15c057 = {
            "url": "https://api.m.jd.com/client.action?" + _0xb27647 + "&uuid=88888",
            "headers": _0x17bd66,
            "timeout": 60000
        };
        $.get(_0x15c057, async (_0x51c788, _0x4f0f13, _0x4a334c) => {
            try {
                _0x4a334c = _0x4a334c && _0x4a334c.match(/jsonp_.*?\((.*?)\);/) && _0x4a334c.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4a334c;

                let _0xa41884 = $.toObj(_0x4a334c, _0x4a334c);

                _0xa41884 && typeof _0xa41884 == "object" ? _0xa41884 && _0xa41884.success == true && (console.log("去加入 -> " + (_0xa41884.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0xa41884.result[0].interestsRuleList && _0xa41884.result[0].interestsRuleList[0] && _0xa41884.result[0].interestsRuleList[0].interestsInfo && _0xa41884.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x4a334c);
            } catch (_0x2bc846) {
                $.logErr(_0x2bc846, _0x4f0f13);
            } finally {
                _0x23c5bc();
            }
        });
    });
}

function _0x4cd69d(_0xa75d1d, _0xc157e1) {
    return Math.floor(Math.random() * (_0xc157e1 - _0xa75d1d)) + _0xa75d1d;
}

function _0x4269dc(_0x3bc2a3 = +new Date()) {
    var _0x32a0eb = new Date(_0x3bc2a3 + 28800000);

    return _0x32a0eb.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
}

function _0xcb60() {
    return new Promise(_0x22829a => {
        const _0x5214e7 = {
            "Cookie": _0x5eb18d,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x4c000e = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x5214e7,
            "timeout": 10000
        };
        $.get(_0x4c000e, (_0x1b8dae, _0x3af7db, _0x491533) => {
            try {
                if (_0x491533) {
                    _0x491533 = JSON.parse(_0x491533);

                    if (!(_0x491533.islogin === "1")) {
                        _0x491533.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x2611dc) {
                console.log(_0x2611dc);
            } finally {
                _0x22829a();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }