/*
https://prodev.m.jd.com/mall/active/3LqDfZ5eB5uqeyZecBgq9kDpnKpB/index.html
1 1 1 1 * jd_3cy.js
*/

const $ = new Env("3C数码国庆出游");

const _0xcbf868 = $.isNode() ? require("./jdCookie.js") : "",
    _0x42ba56 = $.isNode() ? require("./sendNotify") : "",
    _0x592d66 = require("./function/dylank"),
    _0x14fc6d = require("./function/dylany"),
    _0x5d0304 = require("axios");

let _0x57b48b = [],
    _0x39f1a2 = "",
    _0x4880d9 = "",
    _0x3ccb0a = {},
    _0x13dc24 = process.env.opencard_banpin || "",
    _0x22275b = "https://prodev.m.jd.com/mall/active/3LqDfZ5eB5uqeyZecBgq9kDpnKpB/index.html";

$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
$.followShop = 0;
$.addCart = 0;
$.appKey = "O4Tl2qIL";

if ($.isNode()) {
    Object.keys(_0xcbf868).forEach(_0x174b0e => {
        _0x57b48b.push(_0xcbf868[_0x174b0e]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x57b48b = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x4a528a => _0x4a528a.cookie)].filter(_0x5f5029 => !!_0x5f5029);
}

!(async () => {
    if (!_0x57b48b[0]) {
        const _0x48786a = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x48786a);
        return;
    }

    $.log("\n有加购");

    for (let _0x9d14e7 = 0; _0x9d14e7 < _0x57b48b.length; _0x9d14e7++) {
        _0x39f1a2 = _0x57b48b[_0x9d14e7];
        originCookie = _0x57b48b[_0x9d14e7];

        if (_0x39f1a2) {
            $.UserName = decodeURIComponent(_0x39f1a2.match(/pt_pin=([^; ]+)(?=;?)/) && _0x39f1a2.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x9d14e7 + 1;
            $.hotFlag = false;
            $.nickName = "";
            $.isLogin = true;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (_0x13dc24.indexOf($.UserName) > -1) {
                console.log("黑名单pin,跳出！");
                continue;
            }

            _0x5a1ea9();

            await _0x49d130();

            if (!$.isLogin) {
                const _0xf7662e = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0xf7662e);
                $.isNode() && (await _0x42ba56.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x5a7d6a();

            if ($.outFlag || $.activityEnd) {
                break;
            }
        }

        await $.wait(2000);
        $.index % 5 == 0 && (console.log("\n休息一下，可持续发展......"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)));
    }

    if ($.outFlag) {
        let _0x2a8853 = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, "", "" + _0x2a8853);
        $.isNode() && (await _0x42ba56.sendNotify("" + $.name, "" + _0x2a8853));
    }

    _0x4880d9 && $.msg($.name, "", "" + _0x4880d9);
})().catch(_0x472fa9 => {
    return $.logErr(_0x472fa9);
}).finally(() => {
    return $.done();
});

async function _0x5a7d6a() {
    try {
        $.hasEnd = false;
        $.endTime = 0;
        $.followShop = 0;
        $.addCart = 0;
        $.Token = "";
        $.Pin = "";
        activityCookie = "";
        $.Token = await _0x592d66(_0x39f1a2, "https://xinrui-isv.isvjcloud.com");

        if ($.Token == "") {
            console.log("获取Token失败");
            return;
        }

        await _0x42a45e("gtoken");

        if (!$.token) {
            console.log("获取cookie失败");
            return;
        }

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await _0x42a45e("get_user_info");

        if ($.hotFlag == true) {
            console.log("黑子！");
            return;
        }

        if ($.map_list.length >= 1) {
            for (let _0x145716 of $.map_list) {
                $.log("开始" + _0x145716.name + "...");
                $.map_id = _0x145716.id;
                await _0x42a45e("map_info");
                await $.wait(parseInt(Math.random() * 1000 + 500, 10));

                if ($.taskList.length >= 1) {
                    for (let _0x259e06 of $.taskList) {
                        if (_0x259e06.done_count >= _0x259e06.max_count) {
                            console.log(_0x259e06.title + ":已完成");
                        } else {
                            switch (_0x259e06.task_type) {
                                case 5:
                                    console.log("去做" + _0x259e06.title);

                                    for (let _0xb20790 of _0x259e06.item_list) {
                                        $.task_token = _0xb20790.token;
                                        await _0x42a45e("catch_task");
                                        await $.wait(parseInt(Math.random() * 500 + _0x259e06.timer * 1000, 10));
                                        await _0x42a45e("do_map_task");
                                    }

                                    break;

                                case 6:
                                case 4:
                                    console.log("去做" + _0x259e06.title);

                                    for (let _0x44ff30 of _0x259e06.item_list) {
                                        $.task_token = _0x44ff30.token;
                                        await _0x42a45e("catch_task");
                                        await $.wait(parseInt(Math.random() * 500 + _0x259e06.timer * 1000, 10));
                                        await _0x42a45e("do_map_task");
                                    }

                                    break;

                                case 3:
                                    break;

                                case 7:
                                    console.log("去做" + _0x259e06.title);

                                    for (let _0x2b2d9c of _0x259e06.item_list) {
                                        $.task_token = _0x2b2d9c.token;
                                        $.channel = "channel";
                                        await _0x42a45e("do_map_task");
                                        await $.wait(parseInt(Math.random() * 500 + 500, 10));
                                    }

                                    break;

                                default:
                                    console.log("未识别任务类型");
                                    break;
                            }
                        }
                    }
                }

                await $.wait(parseInt(Math.random() * 1500 + 1000, 10));
            }
        }

        await _0x42a45e("lottery_info");
        $.lottery_total > 0 && (await _0x42a45e("lottery"));

        if ($.hotFlag) {
            return;
        }

        $.index == 1 && ($.helpgoal = $.help_token, console.log("后面都会助力 -> " + $.helpgoal));
        await _0x42a45e("do_assist");

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本\n");
            return;
        }

        await $.wait(parseInt(Math.random() * 1000 + 500, 10));
    } catch (_0x568059) {
        console.log(_0x568059);
    }
}

async function _0x42a45e(_0x63a926) {
    if ($.outFlag) {
        return;
    }

    let _0x422e9a = "https://xinrui-isv.isvjcloud.com",
        _0x506be3 = {},
        _0x560c3a = "",
        _0x485757 = "post";

    switch (_0x63a926) {
        case "gtoken":
            _0x560c3a = _0x422e9a + "/auth/jos?token=" + $.Token + "&jd_source=01";
            break;

        case "map_info":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/map_info?id=" + $.map_id;
            _0x485757 = "get";
            break;

        case "get_user_info":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/get_user_info";
            _0x485757 = "get";
            break;

        case "catch_task":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/catch_task?token=" + $.task_token;
            break;

        case "do_map_task":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/do_map_task?token=" + $.task_token + "&map_id=" + $.map_id + "&is_share=0";
            _0x506be3 = {};
            break;

        case "prize_list":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/prize_list?type=beans&page=1";
            _0x485757 = "get";
            break;

        case "do_assist":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/do_assist";
            const _0x135db7 = {
                "token": $.helpgoal
            };
            _0x506be3 = _0x135db7;
            break;

        case "lottery_info":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/lottery_info";
            _0x485757 = "get";
            break;

        case "lottery":
            _0x560c3a = _0x422e9a + "/jd-map-travel-api/lottery";
            _0x485757 = "get";
            break;

        default:
            console.log("错误" + _0x63a926);
    }

    let _0x5a8ade = _0x21fc10(_0x560c3a, _0x506be3, _0x485757);

    return new Promise(async _0x38c77b => {
        $[_0x485757](_0x5a8ade, async (_0x3fac26, _0x13151f, _0x262c48) => {
            try {
                if (_0x3fac26) {
                    if (_0x13151f && typeof _0x13151f.statusCode != "undefined") {
                        _0x13151f.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
                    }

                    _0x13151f.statusCode == 422 || _0x13151f.statusCode == 403 ? ($.hotFlag = true, $.log(JSON.parse(_0x13151f.body).message)) : console.log("" + $.toStr(_0x3fac26, _0x3fac26));
                } else {
                    if (_0x262c48.includes("DOCTYPE")) {
                        await _0x42a45e(_0x63a926);
                        return;
                    }

                    _0xe23f94(_0x63a926, _0x262c48);
                }
            } catch (_0x46e012) {
                console.log(_0x46e012, _0x13151f);
            } finally {
                _0x38c77b();
            }
        });
    });
}

async function _0xe23f94(_0xb43c7f, _0x1a0871) {
    let _0x1b45d0 = "";

    try {
        if (_0xb43c7f != "accessLogWithAD" || _0xb43c7f != "drawContent") {
            if (_0x1a0871) {
                _0x1b45d0 = JSON.parse(_0x1a0871);
            }
        }
    } catch (_0x49a72f) {
        console.log(_0xb43c7f + " 执行任务异常");
    }

    try {
        switch (_0xb43c7f) {
            case "gtoken":
                if (typeof _0x1b45d0 == "object") {
                    if (_0x1b45d0.status == 0) {
                        $.token = _0x1b45d0.body.access_token;
                        $.token_type = _0x1b45d0.body.token_type;
                    }
                }

                break;

            case "get_user_info":
                if (typeof _0x1b45d0 == "object") {
                    _0x1a0871.includes("火爆") ? $.hotFlag = true : $.map_list = _0x1b45d0.map_list || [];
                }

                break;

            case "lottery_info":
                if (typeof _0x1b45d0 == "object") {
                    if (_0x1b45d0) {
                        $.can_lottery = _0x1b45d0.can_lottery || 0;
                        $.lottery_total = _0x1b45d0.lottery_total || 0;
                        $.help_token = _0x1b45d0.invite_info?.["token"] || "";
                    }
                }

                break;

            case "lottery":
                if (typeof _0x1b45d0 == "object") {
                    if (_0x1b45d0) {
                        console.log(_0x1a0871);
                    }
                }

                break;

            case "map_info":
                if (typeof _0x1b45d0 == "object") {
                    $.taskList = _0x1b45d0.task || [];
                }

                break;

            case "do_map_task":
                if (typeof _0x1b45d0 == "object") {
                    _0x1b45d0.prize?.["data"]?.["user_prize"] ? console.log(_0x1b45d0.prize.data.user_prize?.["prize_info"]?.["quota"] + _0x1b45d0.prize.data.user_prize?.["prize_name"]) : $.log("空气");
                }

                break;

            case "prize_list":
                if (typeof _0x1b45d0 == "object") {
                    if (_0x1b45d0) {
                        console.log(_0x1a0871);
                    }
                }

                break;

            case "do_assist":
                if (typeof _0x1b45d0 == "object") {
                    _0x1b45d0 && console.log(_0x1a0871);
                }

                break;

            case "accessLogWithAD":
            case "catch_task":
                break;

            default:
                console.log(_0xb43c7f + " -> " + _0x1a0871);
        }

        if (typeof _0x1b45d0 == "object") {
            if (_0x1b45d0.errorMessage) {
                _0x1b45d0.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
            }
        }
    } catch (_0x1e625d) {
        console.log(_0xb43c7f + " " + _0x1e625d);
    }
}

async function _0xc51268(_0x23fcdd, _0x3a525c, _0x3fb66d) {
    const {
        headers: _0x906974
    } = _0x3fb66d,
        _0x31ce55 = {
            "headers": _0x906974,
            "timeout": 30000
        };

    let _0x5172cd = await _0x5d0304.post(_0x23fcdd, _0x3a525c, _0x31ce55).catch(_0x9ff9a5 => {
        console.log(_0x9ff9a5.response);
    });

    console.log(_0x5172cd);
}

function _0x21fc10(_0x25932b, _0x3e5be3, _0x40751c = "POST") {
    const _0x5d15d1 = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "App-Key": $.appKey,
        "Content-Type": "application/json;charset=UTF-8",
        "Origin": "https://prodev.m.jd.com",
        "Cookie": _0x39f1a2,
        "User-Agent": $.UA
    };

    if ($.token) {
        _0x5d15d1.Authorization = $.token_type + $.token;
    }

    return _0x40751c == "post" ? {
        "url": _0x25932b,
        "method": _0x40751c,
        "headers": _0x5d15d1,
        "json": _0x3e5be3,
        "timeout": 30000
    } : {
        "url": _0x25932b,
        "method": _0x40751c,
        "headers": _0x5d15d1,
        "timeout": 30000
    };
}

function _0x5f3077() {
    return new Promise(async _0x263f2 => {
        const _0x3e437b = {
            "Accept": "application/json, text/plain, */*",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": _0x39f1a2,
            "Referer": _0x22275b,
            "User-Agent": $.UA
        };
        let _0x159e41 = {
            "url": "https://xinrui-isv.isvjcloud.com/wxCommonInfo/token?t=" + Date.now(),
            "followRedirect": false,
            "headers": _0x3e437b,
            "timeout": 30000
        };
        $.get(_0x159e41, async (_0x20a56b, _0x405680, _0x437050) => {
            try {
                if (_0x20a56b) {
                    _0x405680 && typeof _0x405680.statusCode != "undefined" && _0x405680.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
                    console.log("" + $.toStr(_0x20a56b));
                } else {
                    _0x924339(_0x405680);
                }
            } catch (_0x1515ea) {
                $.logErr(_0x1515ea, _0x405680);
            } finally {
                _0x263f2();
            }
        });
    });
}

function _0x924339(_0x5a9795) {
    if (_0x5a9795.headers["set-cookie"]) {
        _0x39f1a2 = originCookie + ";";

        for (let _0x2f7504 of _0x5a9795.headers["set-cookie"]) {
            _0x3ccb0a[_0x2f7504.split(";")[0].substr(0, _0x2f7504.split(";")[0].indexOf("="))] = _0x2f7504.split(";")[0].substr(_0x2f7504.split(";")[0].indexOf("=") + 1);
        }

        for (const _0x4312ed of Object.keys(_0x3ccb0a)) {
            _0x39f1a2 += _0x4312ed + "=" + _0x3ccb0a[_0x4312ed] + ";";
        }

        activityCookie = _0x39f1a2;
    }
}

async function _0x5a1ea9() {
    $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x30b78e(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x30b78e(_0x39bf5f) {
    _0x39bf5f = _0x39bf5f || 32;
    let _0x10ea3a = "abcdef0123456789",
        _0x1f4e8e = _0x10ea3a.length,
        _0x515f48 = "";

    for (i = 0; i < _0x39bf5f; i++) {
        _0x515f48 += _0x10ea3a.charAt(Math.floor(Math.random() * _0x1f4e8e));
    }

    return _0x515f48;
}

function _0x5bdca1(_0x3bd9a3) {
    if (typeof _0x3bd9a3 == "string") {
        try {
            return JSON.parse(_0x3bd9a3);
        } catch (_0x417cd7) {
            console.log(_0x417cd7);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

async function _0x4252da() {
    if (!$.joinVenderId) {
        return;
    }

    return new Promise(async _0x4466cb => {
        $.errorJoinShop = "活动太火爆，请稍后再试";
        $.shopactivityId = "";
        await _0x19e3b1();
        let _0x161bec = {
            "venderId": "" + $.joinVenderId + "",
            "shopId": "" + $.joinVenderId + "",
            "bindByVerifyCodeFlag": 1,
            "registerExtend": {},
            "writeChildFlag": 0,
            "activityId": "" + $.shopactivityId + "",
            "channel": 406
        };
        $.shopactivityId == "" && delete _0x161bec.activityId;
        const _0x42ae9e = {
            "appId": "8adfb",
            "fn": "bindWithVender",
            "body": _0x161bec,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0x161bec = await _0x14fc6d.getbody(_0x42ae9e);
        const _0x3cf863 = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x39f1a2,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x313a4e = {
            "url": "https://api.m.jd.com/client.action?" + _0x161bec + "&uuid=88888",
            "headers": _0x3cf863,
            "timeout": 30000
        };
        $.get(_0x313a4e, async (_0x42442e, _0x2fc700, _0x3d5993) => {
            try {
                _0x3d5993 = _0x3d5993 && _0x3d5993.match(/jsonp_.*?\((.*?)\);/) && _0x3d5993.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3d5993;

                let _0x4578c6 = $.toObj(_0x3d5993, _0x3d5993);

                if (_0x4578c6 && typeof _0x4578c6 == "object") {
                    if (_0x4578c6 && _0x4578c6.success === true) {
                        console.log("    " + _0x4578c6.message);
                        $.errorJoinShop = _0x4578c6.message;

                        if (_0x4578c6.result && _0x4578c6.result.giftInfo) {
                            for (let _0x41938d of _0x4578c6.result.giftInfo.giftList) {
                                console.log("入会获得:" + _0x41938d.discountString + _0x41938d.prizeName + _0x41938d.secondLineDesc);
                            }
                        }
                    } else {
                        _0x4578c6 && typeof _0x4578c6 == "object" && _0x4578c6.message ? ($.errorJoinShop = _0x4578c6.message, console.log("" + (_0x4578c6.message || ""))) : console.log(_0x3d5993);
                    }
                } else {
                    console.log(_0x3d5993);
                }
            } catch (_0x2732bd) {
                $.logErr(_0x2732bd, _0x2fc700);
            } finally {
                _0x4466cb();
            }
        });
    });
}

async function _0x19e3b1() {
    return new Promise(async _0x1a4805 => {
        const _0x3ef643 = {
            "venderId": $.joinVenderId,
            "payUpShop": true,
            "queryVersion": "10.5.2",
            "appid": "ef79a",
            "needSecurity": true,
            "bizId": "shop_view_app",
            "channel": 406
        };
        let _0xe2099b = _0x3ef643;
        const _0x4f2f69 = {
            "appId": "ef79a",
            "fn": "getShopOpenCardInfo",
            "body": _0xe2099b,
            "apid": "jd_shop_member",
            "ver": "9.2.0",
            "cl": "H5",
            "user": $.UserName,
            "code": 0,
            "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        _0xe2099b = await _0x14fc6d.getbody(_0x4f2f69);
        const _0xdf2904 = {
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "cookie": _0x39f1a2,
            "origin": "https://shopmember.m.jd.com/",
            "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        };
        const _0x5f2be2 = {
            "url": "https://api.m.jd.com/client.action?" + _0xe2099b + "&uuid=88888",
            "headers": _0xdf2904,
            "timeout": 60000
        };
        $.get(_0x5f2be2, async (_0x25112d, _0xfce05b, _0x10003e) => {
            try {
                _0x10003e = _0x10003e && _0x10003e.match(/jsonp_.*?\((.*?)\);/) && _0x10003e.match(/jsonp_.*?\((.*?)\);/)[1] || _0x10003e;

                let _0x496bee = $.toObj(_0x10003e, _0x10003e);

                if (_0x496bee && typeof _0x496bee == "object") {
                    _0x496bee && _0x496bee.success == true && (console.log("去加入 -> " + (_0x496bee.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x496bee.result[0].interestsRuleList && _0x496bee.result[0].interestsRuleList[0] && _0x496bee.result[0].interestsRuleList[0].interestsInfo && _0x496bee.result[0].interestsRuleList[0].interestsInfo.activityId || "");
                } else {
                    console.log(_0x10003e);
                }
            } catch (_0x188457) {
                $.logErr(_0x188457, _0xfce05b);
            } finally {
                _0x1a4805();
            }
        });
    });
}

function _0x4cc631(_0x3d3f8c, _0x486fb4) {
    return Math.floor(Math.random() * (_0x486fb4 - _0x3d3f8c)) + _0x3d3f8c;
}

function _0x2ee281(_0x1bb9cf = +new Date()) {
    var _0x121f26 = new Date(_0x1bb9cf + 28800000);

    return _0x121f26.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, ".");
}

function _0x49d130() {
    return new Promise(_0x4a1d09 => {
        const _0x55819a = {
            "Cookie": _0x39f1a2,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x369e34 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x55819a,
            "timeout": 10000
        };
        $.get(_0x369e34, (_0x25efa1, _0x462b08, _0x5b94e2) => {
            try {
                if (_0x5b94e2) {
                    _0x5b94e2 = JSON.parse(_0x5b94e2);

                    if (!(_0x5b94e2.islogin === "1")) {
                        if (_0x5b94e2.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0xef0cbf) {
                console.log(_0xef0cbf);
            } finally {
                _0x4a1d09();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }