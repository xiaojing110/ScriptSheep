/*
京喜特价抽现金
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，控制变量 JXCXJTOP='10'
多少助力换下一个车头，默认999次 ，可调整变量 JXCXJNUM='100'
运行一次抽奖次数,默认抽完，控制变量 JXCXJLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JXCXJDELAY='3'
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxjhelp.js
updatetime:2023/7/23 fix
 */

const $ = new Env('JX特价抽现金');
const _0x536b5b = $.isNode() ? require("./sendNotify") : "",
    _0x550ce0 = $.isNode() ? require("./jdCookie.js") : "",
    _0x30f3b4 = require("./function/dylanz"),
    _0x383ad1 = require("./USER_AGENTS");

let _0x19a6cd = true,
    _0x5c01e1 = [],
    _0xfa2d7a = [],
    _0x592024 = [],
    _0x19f3b6 = [],
    _0x9da326 = [],
    _0xd23c73 = "",
    _0x1ccba8 = "",
    _0x374232 = "",
    _0x31db2a,
    _0x437a4d = process.env.JXCXJNUM || "999",
    _0x2953f7 = process.env.JXCXJTOP || "5",
    _0xebb34 = process.env.JXCXJLTNUM || "0",
    _0x52a490 = process.env.JXCXJDELAY || "1";

if ($.isNode()) {
    Object.keys(_0x550ce0).forEach(_0x2b92d3 => {
        _0x9da326.push(_0x550ce0[_0x2b92d3]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x9da326 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4a30a2($.getdata("CookiesJD") || "[]").map(_0x3ace2c => _0x3ace2c.cookie)].filter(_0x22ac01 => !!_0x22ac01);
}

!(async () => {
    if (!_0x9da326[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：3.4.0 修复抽奖次数变量bug");
    console.log("执行流程，前" + _0x2953f7 + "CK车头--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    for (let _0x4c9355 = 0; _0x4c9355 < _0x2953f7; _0x4c9355++) {
        if (_0x9da326[_0x4c9355]) {
            _0xd23c73 = _0x9da326[_0x4c9355];
            $.UserName = decodeURIComponent(_0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/) && _0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x4c9355 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = _0x383ad1.UARAM ? _0x383ad1.UARAM(1) : _0x383ad1.USER_AGENT;
            await _0x4f748e();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x536b5b.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0xff8c4a(1);
            await $.wait(1000);
        }
    }

    console.log("\n\n开始内部助力...");
    _0x31db2a = 1;

    for (let _0x116ed4 of _0x5c01e1) {
        console.log("\n去助力-> " + _0x116ed4);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x25cec4 = _0x31db2a; _0x25cec4 < _0x9da326.length; _0x25cec4++) {
            if (_0x9da326[_0x25cec4]) {
                _0xd23c73 = _0x9da326[_0x25cec4];
                $.UserName = decodeURIComponent(_0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/) && _0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x25cec4 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x383ad1.UARAM ? _0x383ad1.UARAM(1) : _0x383ad1.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x2a27fa(_0x116ed4);

                if ($.suc > Number(_0x437a4d) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x31db2a = _0x25cec4 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x9da326.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0xebb34 != 0 && console.log("\n已设置本次运行抽奖次数 " + _0xebb34);

    for (let _0x4e898d = 0; _0x4e898d < _0x9da326.length; _0x4e898d++) {
        if (_0x9da326[_0x4e898d]) {
            _0xd23c73 = _0x9da326[_0x4e898d];
            $.UserName = decodeURIComponent(_0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/) && _0xd23c73.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x4e898d + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0xfa2d7a = [];
            _0x592024 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.UA = _0x383ad1.UARAM ? _0x383ad1.UARAM(1) : _0x383ad1.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x4db76b = await _0xff8c4a(0);

            if (_0x4db76b.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x4db76b.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + new Date(Date.now() + _0x4db76b.data.countDownTime).toLocaleString() + "\n");

            for (let _0x2f30c1 = 0; _0x2f30c1 < (_0xebb34 != 0 && _0xebb34 < $.times ? _0xebb34 : $.times); _0x2f30c1++) {
                await _0x3e97a3(_0x2f30c1 + 1);
                await $.wait(Math.random() * 500 + _0x52a490 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x592024.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x592024.reduce((_0xec6132, _0x2feb89) => _0xec6132 + _0x2feb89 * 100, 0) / 100 + "元");
            _0xfa2d7a.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0xfa2d7a.reduce((_0x3315aa, _0x42383f) => _0x3315aa + _0x42383f * 100, 0) / 100 + "元");

            if (process.env.TXTYPE && new Date().getHours() < 9) {
                if (new Date().getHours() < 7) {
                    continue;
                }

                if (_0x19f3b6.length) {
                    $.log("\n开始提现(遍历奖励列表)...");
                }

                for (let _0x1a5554 = 0; _0x1a5554 < 50; _0x1a5554++) {
                    if ($.nocashnum > 2) {
                        break;
                    }

                    await _0x48aa02(_0x1a5554 + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x1c504b of $.baglist) {
                        if (_0x1c504b.prizeType == 4) {
                            if (_0x1c504b.state == 0) {
                                $.log("\n开始提现 " + _0x1c504b.prizeConfigName);
                                await _0x328d51(_0x1c504b);

                                _0xfa2d7a.push(parseFloat(_0x1c504b.amount));

                                await $.wait(6000);
                                $.nocashnum = 0;
                            } else {
                                $.nocashnum++;
                            }
                        }
                    }
                }
            } else {
                if (_0x19f3b6.length) {
                    $.log("\n开始提现(仅对本次抽奖所得现金)...");
                }

                for (let _0x3c2c59 of _0x19f3b6) {
                    if ($.txfull) {
                        $.log("\n恭喜本月毕业了!");
                        break;
                    }

                    process.stdout.write("" + _0x3c2c59.prizeValue);
                    await _0x328d51(_0x3c2c59);
                    await $.wait(5000);
                }
            }

            _0x19f3b6 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x409191 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x409191 + "!", "");
}).finally(() => {
    $.done();
});

async function _0xff8c4a(_0x571462) {
    let _0x4f7c93 = "functionId=inviteFissionHome&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x316f64 => {
        $.post(_0x2fab7e(_0x4f7c93), async (_0x56c385, _0x50cf4d, _0xa31178) => {
            try {
                if (_0x56c385) {
                    console.log("" + JSON.stringify(_0x56c385));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0xa31178 = JSON.parse(_0xa31178);

                    if (_0xa31178.code == 0) {
                        $.times = _0xa31178.data.prizeNum;

                        if (_0x571462) {
                            console.log("助力码：" + _0xa31178.data.inviter);
                        }

                        _0x5c01e1.push(_0xa31178.data.inviter);
                    } else {
                        console.log(_0xa31178.errMsg);
                    }
                }
            } catch (_0xcea12d) {
                $.logErr(_0xcea12d, _0x50cf4d);
            } finally {
                _0x316f64(_0xa31178);
            }
        });
    });
}

async function _0x4f9f67() {
    let _0x3f9a5b = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x49f75c = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x3f9a5b,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x3f9a5b = await _0x56dc57(_0x49f75c)// : "functionId=inviteFissionReceive&body=" + _0x3f9a5b + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x3f9a5b) {
        return;
    }

    return new Promise(async _0xff95d2 => {
        $.post(_0x2fab7e(_0x3f9a5b), async (_0x47f5f5, _0xa2416e, _0x5857cd) => {
            try {
                _0x47f5f5 ? (console.log("" + JSON.stringify(_0x47f5f5)), console.log("receive请求失败，请检查网路重试")) : (_0x5857cd = JSON.parse(_0x5857cd), _0x5857cd.code == 0 ? $.log("------提现金：" + _0x5857cd.data.amount) : $.txj = false);
            } catch (_0x27c666) {
                $.logErr(_0x27c666, _0xa2416e);
            } finally {
                _0xff95d2(_0x5857cd);
            }
        });
    });
}

async function _0x3e97a3(_0x37fb3d) {
    let _0x11b25c = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x5b339e = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x11b25c,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x11b25c = await _0x30f3b4.getbody(_0x5b339e);

    if (!_0x11b25c) {
        return;
    }

    return new Promise(async _0x5dc0c9 => {
        $.post(_0x2fab7e(_0x11b25c), async (_0x18df02, _0xbc37db, _0x3013cf) => {
            try {
                if (_0x18df02) {
                    console.log("" + JSON.stringify(_0x18df02));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x3013cf = JSON.parse(_0x3013cf);

                    if (_0x3013cf.code == 0) {
                        const _0x493fb4 = _0x3013cf.data.prizeType;

                        if (!_0x493fb4) {
                            fail++;
                        }

                        switch (_0x493fb4) {
                            case 1:
                                console.log("第" + _0x37fb3d + "次抽奖结果：垃圾卷 😤");
                                $.fail++;
                                break;

                            case 6:
                                console.log("第" + _0x37fb3d + "次抽奖结果：京喜礼包 💩");
                                break;

                            case 4:
                                let _0x48ce74 = parseFloat(_0x3013cf.data.prizeValue).toFixed(2);

                                console.log("第" + _0x37fb3d + "次抽奖结果：" + _0x48ce74 + "现金 💴");

                                _0xfa2d7a.push(_0x48ce74);

                                _0x19f3b6.push({
                                    "prizeValue": _0x3013cf.data.prizeValue,
                                    "id": _0x3013cf.data.id,
                                    "poolBaseId": _0x3013cf.data.poolBaseId,
                                    "prizeGroupId": _0x3013cf.data.prizeGroupId,
                                    "prizeBaseId": _0x3013cf.data.prizeBaseId
                                });

                                $.fail = 0;
                                break;

                            case 2:
                                let _0x3e3c52 = parseFloat(_0x3013cf.data.prizeValue).toFixed(2);

                                console.log("第" + _0x37fb3d + "次抽奖结果：" + _0x3e3c52 + "红包 🧧");

                                _0x592024.push(_0x3e3c52);

                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(_0x3013cf.data));
                        }
                    } else {
                        console.log(_0x3013cf.errMsg);
                    }
                }
            } catch (_0x24dcff) {
                $.logErr(_0x24dcff, _0xbc37db);
            } finally {
                _0x5dc0c9(_0x3013cf);
            }
        });
    });
}

async function _0x48aa02(_0x571607) {
    let _0x40e92f = {
        "pageNum": _0x571607,
        "pageSize": 20,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    },
        _0xc29c74 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x40e92f,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x40e92f = await _0x30f3b4.getbody(_0xc29c74);

    if (!_0x40e92f) {
        return;
    }

    return new Promise(async _0x432722 => {
        $.get(_0x2fab7e(_0x40e92f), async (_0x20e4cb, _0x3a1efb, _0x316a6b) => {
            try {
                if (_0x20e4cb) {
                    console.log("" + JSON.stringify(_0x20e4cb));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x316a6b = JSON.parse(_0x316a6b);
                    _0x316a6b.code == 0 ? $.baglist = _0x316a6b.data.items : console.log(_0x316a6b.errMsg);
                }
            } catch (_0xe2b34d) {
                $.logErr(_0xe2b34d, _0x3a1efb);
            } finally {
                _0x432722(_0x316a6b);
            }
        });
    });
}

async function _0x2a27fa(_0x5ec0bd) {
    let _0x3c9b70 = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "isJdApp": true,
        "inviter": _0x5ec0bd
    },
        _0x5638af = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x3c9b70,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x3c9b70 = await _0x30f3b4.getbody(_0x5638af);

    if (!_0x3c9b70) {
        return;
    }

    return new Promise(async _0x45cb6c => {
        $.post(_0x2fab7e(_0x3c9b70), async (_0xb14c6b, _0x51e940, _0xd3c28d) => {
            try {
                if (_0xb14c6b) {
                    console.log("" + JSON.stringify(_0xb14c6b));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0xd3c28d = JSON.parse(_0xd3c28d);

                    if (_0xd3c28d.code == 0) {
                        if (!_0xd3c28d.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0xd3c28d.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0xd3c28d.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0xd3c28d.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0xd3c28d.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0xd3c28d.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0xd3c28d.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0xd3c28d));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0xd3c28d.errMsg);
                    }
                }
            } catch (_0x1f1ae9) {
                $.logErr(_0x1f1ae9, _0x51e940);
            } finally {
                _0x45cb6c(_0xd3c28d);
            }
        });
    });
}

async function _0x328d51(_0x5add2f) {
    let _0x4632de = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x5add2f.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x5add2f.poolBaseId + ",\"prizeGroupId\":" + _0x5add2f.prizeGroupId + ",\"prizeBaseId\":" + _0x5add2f.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x4f2b36 => {
        $.post(_0x2fab7e(_0x4632de), async (_0x45e493, _0x108e5f, _0x1e8402) => {
            try {
                _0x45e493 ? (console.log("" + JSON.stringify(_0x45e493)), console.log("apCashWithDraw请求失败，请检查网路重试")) : (_0x1e8402 = JSON.parse(_0x1e8402), _0x1e8402.code == 0 ? _0x1e8402.data.message.indexOf("提现") > -1 ? process.stdout.write("✅ ") : (console.log(_0x1e8402.data.message), _0x1e8402.data.message.includes("上限") && ($.txfull = true)) : console.log(_0x1e8402.errMsg));
            } catch (_0x2c3cfd) {
                $.logErr(_0x2c3cfd, _0x108e5f);
            } finally {
                _0x4f2b36(_0x1e8402);
            }
        });
    });
}

function _0x2fab7e(_0x58987f) {
    return {
        "url": "https://api.m.jd.com/?" + _0x58987f,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0xd23c73
        }
    };
}


function _0x4f748e() {
    return new Promise(_0x979f7d => {
        const _0x5d56a6 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0xd23c73,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x5d56a6, (_0x1e411e, _0x2eeb1d, _0x514525) => {
            try {
                if (_0x514525) {
                    _0x514525 = JSON.parse(_0x514525);

                    if (!(_0x514525.islogin === "1")) {
                        _0x514525.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x2bffba) {
                console.log(_0x2bffba);
            } finally {
                _0x979f7d();
            }
        });
    });
}


function _0x42b216() {
    return new Promise(_0x5b9d93 => {
        !_0x19a6cd ? $.msg($.name, "", "" + _0x1ccba8) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x1ccba8);

        _0x5b9d93();
    });
}


function _0x2257b7(_0x563a31) {
    try {
        if (typeof JSON.parse(_0x563a31) == "object") {
            return true;
        }
    } catch (_0x2e03c3) {
        console.log(_0x2e03c3);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x4a30a2(_0x2c3841) {
    if (typeof _0x2c3841 == "string") {
        try {
            return JSON.parse(_0x2c3841);
        } catch (_0x19192f) {
            console.log(_0x19192f);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}


function _0x56dc57(_0x5176aa) {
    let _0x448af8 = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x5176aa),
        "headers": {
            "Content-Type": "application/json"
        },
        "timeout": 10000
    },
        _0x43fd68 = "";
    return new Promise(_0x260250 => {
        $.post(_0x448af8, (_0x47809e, _0x39fdee, _0x5b23b5) => {
            try {
                _0x47809e ? console.log("连接失败") : (_0x5b23b5 = JSON.parse(_0x5b23b5), _0x5b23b5.code == 200 ? _0x43fd68 = _0x5b23b5.data : $.log(_0x5b23b5.msg));
            } catch (_0x8c0e82) {
                console.log(_0x8c0e82, _0x39fdee);
            } finally {
                _0x260250(_0x43fd68);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }