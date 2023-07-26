
/*
转赚红包
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头,控制变量 JDZHBTOP='10'
多少助力换下一个车头，默认999个 ，控制变量 JDZHBNUM='100';
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb.js
updatetime:2023/7/23 fix
 */

const $ = new Env('JD转赚红包');
const _0x4a5050 = $.isNode() ? require("./sendNotify") : "",
    _0x22afa9 = $.isNode() ? require("./jdCookie.js") : "",
    _0x23646d = require("./function/dylanz"),
    _0x3f6b11 = require("./USER_AGENTS");

let _0x1afb2c = true,
    _0x247b8c = [],
    _0x125796 = [],
    _0x82452e = [],
    _0x23d2e7 = [],
    _0xd05e76 = [],
    _0x980a7 = "",
    _0x530ef1 = "",
    _0x59e30d = "",
    _0xbb372,
    _0x496983 = process.env.JDZHBNUM || "999",
    _0x4f233b = process.env.JDZHBTOP || "5",
    _0x2d4671 = process.env.JDZHBLTNUM || "0",
    _0x24ad33 = process.env.JDZHBDELAY || "1";

if ($.isNode()) {
    Object.keys(_0x22afa9).forEach(_0x3928b5 => {
        _0xd05e76.push(_0x22afa9[_0x3928b5]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0xd05e76 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4d8ddf($.getdata("CookiesJD") || "[]").map(_0x2630af => _0x2630af.cookie)].filter(_0x1ef069 => !!_0x1ef069);
}

!(async () => {
    if (!_0xd05e76[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：1.1.0 修复抽奖次数变量bug");
    console.log("执行流程，前" + _0x4f233b + "CK车头--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    for (let _0x56164c = 0; _0x56164c < _0x4f233b; _0x56164c++) {
        if (_0xd05e76[_0x56164c]) {
            _0x980a7 = _0xd05e76[_0x56164c];
            $.UserName = decodeURIComponent(_0x980a7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x980a7.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x56164c + 1;
            $.isLogin = true;
            $.nickName = "";
            $.UA = _0x3f6b11.UARAM ? _0x3f6b11.UARAM() : _0x3f6b11.USER_AGENT;
            await _0x3a2ec4();
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x4a5050.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x472b05(1);
            await $.wait(1000);
        }
    }


    console.log("\n\n开始内部助力...");
    _0xbb372 = 1;

    for (let _0x4c7ec8 of _0x247b8c) {
        console.log("\n去助力-> " + _0x4c7ec8);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x50bff3 = _0xbb372; _0x50bff3 < _0xd05e76.length; _0x50bff3++) {
            if (_0xd05e76[_0x50bff3]) {
                _0x980a7 = _0xd05e76[_0x50bff3];
                $.UserName = decodeURIComponent(_0x980a7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x980a7.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x50bff3 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x3f6b11.UARAM ? _0x3f6b11.UARAM() : _0x3f6b11.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0xa0780d(_0x4c7ec8);

                if ($.suc > Number(_0x496983) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0xbb372 = _0x50bff3 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0xd05e76.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0x2d4671 != 0 && console.log("\n已设置本次运行抽奖次数 " + _0x2d4671);

    for (let _0x1b35b1 = 0; _0x1b35b1 < _0xd05e76.length; _0x1b35b1++) {
        if (_0xd05e76[_0x1b35b1]) {
            _0x980a7 = _0xd05e76[_0x1b35b1];
            $.UserName = decodeURIComponent(_0x980a7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x980a7.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x1b35b1 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x125796 = [];
            _0x82452e = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.UA = _0x3f6b11.UARAM ? _0x3f6b11.UARAM() : _0x3f6b11.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x4fb0eb = await _0x472b05(0);

            if (_0x4fb0eb.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x4fb0eb.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + new Date(Date.now() + _0x4fb0eb.data.countDownTime).toLocaleString() + "\n");

            for (let _0x4542a9 = 0; _0x4542a9 < (_0x2d4671 != 0 && _0x2d4671 < $.times ? _0x2d4671 : $.times); _0x4542a9++) {
                await _0x3aaf13(_0x4542a9 + 1);
                await $.wait(Math.random() * 500 + _0x24ad33 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x82452e.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x82452e.reduce((_0x308768, _0x289488) => _0x308768 + _0x289488 * 100, 0) / 100 + "元");
            _0x125796.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x125796.reduce((_0x1c3b3e, _0x16da6d) => _0x1c3b3e + _0x16da6d * 100, 0) / 100 + "元");

            if (process.env.TXTYPE && new Date().getHours() < 9) {
                if (new Date().getHours() < 7) {
                    continue;
                }

                if (_0x23d2e7.length) {
                    $.log("\n开始提现(遍历奖励列表)...");
                }

                for (let _0x2d4f4d = 0; _0x2d4f4d < 50; _0x2d4f4d++) {
                    if ($.nocashnum > 2) {
                        break;
                    }

                    await _0x28971a(_0x2d4f4d + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x534856 of $.baglist) {
                        if (_0x534856.prizeType == 4) {
                            if (_0x534856.state == 0) {
                                $.log("\n开始提现 " + _0x534856.prizeConfigName);
                                await _0x2ba1df(_0x534856);

                                _0x125796.push(parseFloat(_0x534856.amount));

                                await $.wait(6000);
                                $.nocashnum = 0;
                            } else {
                                $.nocashnum++;
                            }
                        }
                    }
                }
            } else {
                if (_0x23d2e7.length) {
                    $.log("\n开始提现(仅对本次抽奖所得现金)...");
                }

                for (let _0x4afb84 of _0x23d2e7) {
                    if ($.txfull) {
                        $.log("\n恭喜本月毕业了!");
                        continue;
                    }

                    process.stdout.write("" + _0x4afb84.prizeValue);
                    await _0x2ba1df(_0x4afb84);
                    await $.wait(5000);
                }
            }

            _0x23d2e7 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x3d4e05 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3d4e05 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x472b05(_0x3d9581) {
    let _0x5f3bf5 = "functionId=inviteFissionHome&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x22fe49 => {
        $.post(_0xd85db0(_0x5f3bf5), async (_0x19ff8b, _0x5d3ee0, _0x5f0eaf) => {
            try {
                if (_0x19ff8b) {
                    console.log("" + JSON.stringify(_0x19ff8b));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x5f0eaf = JSON.parse(_0x5f0eaf);

                    if (_0x5f0eaf.code == 0) {
                        $.times = _0x5f0eaf.data.prizeNum;

                        if (_0x3d9581) {
                            console.log("助力码：" + _0x5f0eaf.data.inviter);
                        }

                        _0x247b8c.push(_0x5f0eaf.data.inviter);
                    } else {
                        console.log(_0x5f0eaf.errMsg);
                    }
                }
            } catch (_0xc04dff) {
                $.logErr(_0xc04dff, _0x5d3ee0);
            } finally {
                _0x22fe49(_0x5f0eaf);
            }
        });
    });
}

async function _0x480a7d() {
    let _0x4c6d86 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x464850 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x4c6d86,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x4c6d86 = await _0x100b6a(_0x464850) //: "functionId=inviteFissionReceive&body=" + _0x4c6d86 + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x4c6d86) {
        return;
    }

    return new Promise(async _0x2c8d91 => {
        $.post(_0xd85db0(_0x4c6d86), async (_0x14e9c9, _0xe3fa42, _0x4adae2) => {
            try {
                _0x14e9c9 ? (console.log("" + JSON.stringify(_0x14e9c9)), console.log("receive请求失败，请检查网路重试")) : (_0x4adae2 = JSON.parse(_0x4adae2), _0x4adae2.code == 0 ? $.log("------提现金：" + _0x4adae2.data.amount) : $.txj = false);
            } catch (_0x3f6aab) {
                $.logErr(_0x3f6aab, _0xe3fa42);
            } finally {
                _0x2c8d91(_0x4adae2);
            }
        });
    });
}

async function _0x3aaf13(_0x34576b) {
    let _0x1a06cf = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x597dc8 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x1a06cf,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x1a06cf = await _0x23646d.getbody(_0x597dc8);

    if (!_0x1a06cf) {
        return;
    }

    return new Promise(async _0x4f7332 => {
        $.post(_0xd85db0(_0x1a06cf), async (_0x119dc2, _0x4aa090, _0x282bf2) => {
            try {
                if (_0x119dc2) {
                    console.log("" + JSON.stringify(_0x119dc2));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x282bf2 = JSON.parse(_0x282bf2);

                    if (_0x282bf2.code == 0) {
                        const _0x2161e7 = _0x282bf2.data.prizeType;

                        if (!_0x2161e7) {
                            fail++;
                        }

                        switch (_0x2161e7) {
                            case 1:
                                console.log("第" + _0x34576b + "次抽奖结果：垃圾卷 😤");
                                $.fail++;
                                break;

                            case 4:
                                let _0x13f1aa = parseFloat(_0x282bf2.data.prizeValue).toFixed(2);

                                console.log("第" + _0x34576b + "次抽奖结果：" + _0x13f1aa + "现金 💴");

                                _0x125796.push(_0x13f1aa);

                                _0x23d2e7.push({
                                    "prizeValue": _0x282bf2.data.prizeValue,
                                    "id": _0x282bf2.data.id,
                                    "poolBaseId": _0x282bf2.data.poolBaseId,
                                    "prizeGroupId": _0x282bf2.data.prizeGroupId,
                                    "prizeBaseId": _0x282bf2.data.prizeBaseId
                                });

                                $.fail = 0;
                                break;

                            case 2:
                                let _0x23f72c = parseFloat(_0x282bf2.data.prizeValue).toFixed(2);

                                console.log("第" + _0x34576b + "次抽奖结果：" + _0x23f72c + "红包 🧧");

                                _0x82452e.push(_0x23f72c);

                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(_0x282bf2.data));
                        }
                    } else {
                        console.log(_0x282bf2.errMsg);
                    }
                }
            } catch (_0x5c1e86) {
                $.logErr(_0x5c1e86, _0x4aa090);
            } finally {
                _0x4f7332(_0x282bf2);
            }
        });
    });
}

async function _0x28971a(_0x139c72) {
    let _0x20b254 = {
        "pageNum": _0x139c72,
        "pageSize": 20,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    },
        _0x3173e3 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x20b254,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x20b254 = await _0x23646d.getbody(_0x3173e3);

    if (!_0x20b254) {
        return;
    }

    return new Promise(async _0x14b1e2 => {
        $.get(_0xd85db0(_0x20b254), async (_0x347d34, _0x125036, _0x45185d) => {
            try {
                if (_0x347d34) {
                    console.log("" + JSON.stringify(_0x347d34));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x45185d = JSON.parse(_0x45185d);

                    if (_0x45185d.code == 0) {
                        $.baglist = _0x45185d.data.items;
                    } else {
                        console.log(_0x45185d.errMsg);
                    }
                }
            } catch (_0x153192) {
                $.logErr(_0x153192, _0x125036);
            } finally {
                _0x14b1e2(_0x45185d);
            }
        });
    });
}

async function _0xa0780d(_0x63e46) {
    let _0x881a38 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "isJdApp": true,
        "inviter": _0x63e46
    },
        _0x999e9a = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x881a38,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x881a38 = await _0x23646d.getbody(_0x999e9a);

    if (!_0x881a38) {
        return;
    }

    return new Promise(async _0x5f5c4e => {
        $.post(_0xd85db0(_0x881a38), async (_0x1c9eec, _0x28dcce, _0x4fafd4) => {
            try {
                if (_0x1c9eec) {
                    console.log("" + JSON.stringify(_0x1c9eec));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0x4fafd4 = JSON.parse(_0x4fafd4);

                    if (_0x4fafd4.code == 0) {
                        if (!_0x4fafd4.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x4fafd4.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x4fafd4.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x4fafd4.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x4fafd4.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x4fafd4.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x4fafd4.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x4fafd4));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x4fafd4.errMsg);
                    }
                }
            } catch (_0x3ff3a3) {
                $.logErr(_0x3ff3a3, _0x28dcce);
            } finally {
                _0x5f5c4e(_0x4fafd4);
            }
        });
    });
}

async function _0x2ba1df(_0x2bb3ee) {
    let _0x48a541 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x2bb3ee.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x2bb3ee.poolBaseId + ",\"prizeGroupId\":" + _0x2bb3ee.prizeGroupId + ",\"prizeBaseId\":" + _0x2bb3ee.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x5367c0 => {
        $.post(_0xd85db0(_0x48a541), async (_0x25feca, _0x29f073, _0x42f943) => {
            try {
                _0x25feca ? (console.log("" + JSON.stringify(_0x25feca)), console.log("apCashWithDraw请求失败，请检查网路重试")) : (_0x42f943 = JSON.parse(_0x42f943), _0x42f943.code == 0 ? _0x42f943.data.message.indexOf("提现") > -1 ? process.stdout.write("✅ ") : (console.log(_0x42f943.data.message), _0x42f943.data.message.includes("上限") && ($.txfull = true)) : console.log(_0x42f943.errMsg));
            } catch (_0x2af382) {
                $.logErr(_0x2af382, _0x29f073);
            } finally {
                _0x5367c0(_0x42f943);
            }
        });
    });
}

return;

function _0xd85db0(_0xcef6b1) {
    return {
        "url": "https://api.m.jd.com/?" + _0xcef6b1,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x980a7
        }
    };
}

return;

function _0x3a2ec4() {
    return new Promise(_0x22571d => {
        const _0x58bbc4 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x980a7,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x58bbc4, (_0x1ab77d, _0x32050a, _0x599c08) => {
            try {
                if (_0x599c08) {
                    _0x599c08 = JSON.parse(_0x599c08);

                    if (!(_0x599c08.islogin === "1")) {
                        _0x599c08.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x37f725) {
                console.log(_0x37f725);
            } finally {
                _0x22571d();
            }
        });
    });
}

return;

function _0x8eca9c() {
    return new Promise(_0xfb0573 => {
        !_0x1afb2c ? $.msg($.name, "", "" + _0x530ef1) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x530ef1);

        _0xfb0573();
    });
}

return;

function _0x1fba29(_0x56e08d) {
    try {
        if (typeof JSON.parse(_0x56e08d) == "object") {
            return true;
        }
    } catch (_0x42cd38) {
        console.log(_0x42cd38);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}


function _0x4d8ddf(_0x5b79d7) {
    if (typeof _0x5b79d7 == "string") {
        try {
            return JSON.parse(_0x5b79d7);
        } catch (_0xe6c16a) {
            console.log(_0xe6c16a);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x100b6a(_0x4357c2) {
    let _0x147839 = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x4357c2),
        "headers": {
            "Content-Type": "application/json"
        },
        "timeout": 10000
    },
        _0x254b5b = "";
    return new Promise(_0x637199 => {
        $.post(_0x147839, (_0x2b189, _0x4cbb2f, _0x527994) => {
            try {
                if (_0x2b189) {
                    console.log("连接失败");
                } else {
                    _0x527994 = JSON.parse(_0x527994);
                    _0x527994.code == 200 ? _0x254b5b = _0x527994.data : $.log(_0x527994.msg);
                }
            } catch (_0x5251fe) {
                console.log(_0x5251fe, _0x4cbb2f);
            } finally {
                _0x637199(_0x254b5b);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }