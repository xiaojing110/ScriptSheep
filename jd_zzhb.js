/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头(只能1个)，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true' 
updatetime:2023/9/20
 */

const $ = new Env('Jd转赚红包');
const _0x2e675a = $.isNode() ? require("./sendNotify") : "",
    _0x4118ee = $.isNode() ? require("./jdCookie.js") : "",
    _0x220452 = require("./function/dylanz"),
    _0x46d76f = require("./USER_AGENTS");

let _0x3c26cc = [],
    _0x5af619 = [],
    _0x3bcf87 = [],
    _0x1aea06 = [],
    _0x295960,
    _0x144eb4 = [],
    _0x34c240 = "",
    _0x4bddc0 = "",
    _0x53b4d3 = "",
    _0x42cc1f,
    _0x977841 = process.env.JDZHBNUM || "9999",
    _0x3101ff = process.env.JDZHBLTNUM || "-1",
    _0x16925e = process.env.JDZHBDELAY || "1",
    _0x25e141 = process.env.JDZHBTORED || false,
    _0x47412a = process.env.JDZHBTOPPIN || "",
    _0x5daacd = process.env.TXSILENT || false,
    _0xc67763 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x295960 = require("./function/proxy.js");
        $.dget = _0x295960.intoRequest($.get.bind($), true);
        $.dpost = _0x295960.intoRequest($.post.bind($), true);
    } catch {
        $.log("未安装https-proxy-agent依赖，无法启用代理");
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
}

if ($.isNode()) {
    Object.keys(_0x4118ee).forEach(_0x305793 => {
        _0x144eb4.push(_0x4118ee[_0x305793]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x144eb4 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3e8382($.getdata("CookiesJD") || "[]").map(_0x623cf0 => _0x623cf0.cookie)].filter(_0x2d51e8 => !!_0x2d51e8);
}

!(async () => {
    if (!_0x144eb4[0]) {
        const _0x1efc0b = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x1efc0b);
        return;
    }

    $.log("\n当前版本：2.5.2 未中奖重试2次");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    // let _0x39e7ac = await _0x59513c();

    if (_0x47412a) {
        console.log("\n已指定PIN：" + _0x47412a);

        let _0x1711e6 = _0x144eb4.findIndex(_0x44e60b => _0x44e60b.includes(_0x47412a));

        if (_0x1711e6 == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行！");
            return;
        }

        _0x34c240 = _0x144eb4[_0x1711e6];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x34c240 = _0x144eb4[0];
    }

    $.UserName = decodeURIComponent(_0x34c240.match(/pt_pin=([^; ]+)(?=;?)/) && _0x34c240.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x46d76f.UARAM ? _0x46d76f.UARAM() : _0x46d76f.USER_AGENT;
    console.log("\n——————————————车头开团——————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x3cbb7e();

    if (!$.isLogin) {
        const _0x2935aa = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x2935aa);

        if ($.isNode()) {
            await _0x2e675a.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie");
        }

        return;
    }

    await _0x19c425(1);
    await $.wait(1000);

    // if (_0x39e7ac.length != 0) {
    //     let _0x5d9ae4 = _0x39e7ac[Math.floor(Math.random() * _0x39e7ac.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x34c240.match(/pt_pin=([^; ]+)(?=;?)/) && _0x34c240.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x46d76f.UARAM ? _0x46d76f.UARAM() : _0x46d76f.USER_AGENT;
    //     await _0x1f78d7(_0x5d9ae4);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————");
    console.log("\n\n开始助力车头...");
    _0x42cc1f = 0;

    for (let _0x4561a8 of _0x3c26cc) {
        if (_0x144eb4.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x4561a8);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0xac84e6 = _0x42cc1f; _0xac84e6 < _0x144eb4.length; _0xac84e6++) {
            if (_0x144eb4[_0xac84e6]) {
                _0x34c240 = _0x144eb4[_0xac84e6];
                $.UserName = decodeURIComponent(_0x34c240.match(/pt_pin=([^; ]+)(?=;?)/) && _0x34c240.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0xac84e6 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x46d76f.UARAM ? _0x46d76f.UARAM() : _0x46d76f.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x1f78d7(_0x4561a8);

                if ($.suc > Number(_0x977841) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x42cc1f = _0xac84e6 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x144eb4.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0x3101ff > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x3101ff);

    let _0x4ce5e3 = new Date();

    _0x4ce5e3.setDate(_0x4ce5e3.getDate() - 1);

    for (let _0x26baad = 0; _0x26baad < _0x144eb4.length; _0x26baad++) {
        if (_0x144eb4[_0x26baad]) {
            _0x34c240 = _0x144eb4[_0x26baad];
            $.UserName = decodeURIComponent(_0x34c240.match(/pt_pin=([^; ]+)(?=;?)/) && _0x34c240.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x26baad + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x5af619 = [];
            _0x3bcf87 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.UA = _0x46d76f.UARAM ? _0x46d76f.UARAM() : _0x46d76f.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x1e7fa9 = await _0x19c425(0);

            if (_0x1e7fa9.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x1e7fa9.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x20ad20(new Date(Date.now() + _0x1e7fa9.data.countDownTime)) + "\n");

            for (let _0x391e44 = 0; _0x391e44 < (_0x3101ff > -1 && _0x3101ff < $.times ? _0x3101ff : $.times); _0x391e44++) {
                process.stdout.write("\n第" + (_0x391e44 + 1) + "次抽奖结果：");

                for (let _0x535e86 of Array(3)) {
                    await _0x37b7a3(_0x535e86 + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + _0x16925e * 1000);
                }

                if ($.end) {
                    break;
                }

                await $.wait(Math.random() * 500 + _0x16925e * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x3bcf87.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x3bcf87.reduce((_0x4db66a, _0x4a969b) => _0x4db66a + _0x4a969b * 100, 0) / 100 + "元");
            _0x5af619.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x5af619.reduce((_0x303e96, _0x4a75d8) => _0x303e96 + _0x4a75d8 * 100, 0) / 100 + "元");

            if (_0xc67763 != "true") {
                if (new Date().getHours() < 7 && _0x5daacd) {
                    continue;
                }

                $.log("\n开始提现(遍历奖励列表)...");
                _0x25e141 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

                for (let _0x24ffa2 = 0; _0x24ffa2 < 50; _0x24ffa2++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) {
                        break;
                    }

                    if ($.txfull && !_0x25e141) {
                        $.log("\n本月提现到上限!如转红包请设置变量");
                        break;
                    }

                    await _0x3d87fe(_0x24ffa2 + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x4ba334 of $.baglist) {
                        if (new Date(_0x4ba334.createTime) < _0x4ce5e3 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x4ba334.prizeType == 4) {
                            if (_0x4ba334.state == 0 || _0x4ba334.state == 2) {
                                process.stdout.write("" + Number(_0x4ba334.amount));

                                let _0x42c5a4 = await _0x211f9a(_0x4ba334);

                                $.txfail && (await $.wait(5000), _0x42c5a4 = await _0x211f9a(_0x4ba334));

                                if ($.txfull && !_0x25e141) {
                                    break;
                                }

                                await $.wait(1000);

                                if (_0x42c5a4.data.message.includes("上限") && _0x25e141 && $.toredfailnum < 5) {
                                    await _0x26d740(_0x4ba334);
                                }

                                await $.wait(4000);
                            } else {
                                _0x4ba334.state == 8;
                            }
                        }
                    }
                }
            } else {
                $.log("\n已设置不提现！");
            }

            _0x1aea06 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x1727b2 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1727b2 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x19c425(_0x5f2d1a) {
    let _0x28dc56 = "functionId=inviteFissionHome&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x298716 => {
        $.post(_0x1495a7(_0x28dc56), async (_0x46e382, _0x147ef3, _0xdca42e) => {
            try {
                if (_0x46e382) {
                    console.log("" + JSON.stringify(_0x46e382));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0xdca42e = JSON.parse(_0xdca42e);

                    if (_0xdca42e.code == 0) {
                        $.times = _0xdca42e.data.prizeNum;

                        if (_0x5f2d1a) {
                            console.log("助力码：" + _0xdca42e.data.inviter);
                        }

                        _0x3c26cc.push(_0xdca42e.data.inviter);
                    } else {
                        console.log(_0xdca42e.errMsg);
                    }
                }
            } catch (_0x47c673) {
                $.logErr(_0x47c673, _0x147ef3);
            } finally {
                _0x298716(_0xdca42e);
            }
        });
    });
}

async function _0x19e560() {
    const _0x417968 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x22abe0 = _0x417968,
        _0x519304 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x22abe0,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x22abe0 = await _0x4b01bf(_0x519304) //: "functionId=inviteFissionReceive&body=" + _0x22abe0 + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x22abe0) {
        return;
    }

    return new Promise(async _0x220f56 => {
        $.post(_0x1495a7(_0x22abe0), async (_0x5c9757, _0x9ec098, _0x26dca3) => {
            try {
                _0x5c9757 ? (console.log("" + JSON.stringify(_0x5c9757)), console.log("receive请求失败，请检查网路重试")) : (_0x26dca3 = JSON.parse(_0x26dca3), _0x26dca3.code == 0 ? $.log("------提现金：" + _0x26dca3.data.amount) : $.txj = false);
            } catch (_0x4f8c4e) {
                $.logErr(_0x4f8c4e, _0x9ec098);
            } finally {
                _0x220f56(_0x26dca3);
            }
        });
    });
}

async function _0x37b7a3(_0x543f8b) {
    const _0x115674 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x47222d = _0x115674,
        _0x4427c5 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x47222d,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x47222d = await _0x220452.getbody(_0x4427c5);

    if (!_0x47222d) {
        return;
    }

    return new Promise(async _0x38122b => {
        $.post(_0x1495a7(_0x47222d), async (_0x4c38e5, _0x16d4a9, _0x392607) => {
            try {
                if (_0x4c38e5) {
                    console.log("" + JSON.stringify(_0x4c38e5));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x392607 = JSON.parse(_0x392607);

                    if (_0x392607.code == 0) {
                        const _0x390500 = _0x392607.data.prizeType;

                        if (!_0x390500) {
                            fail++;
                        }

                        switch (_0x390500) {
                            case 1:
                                process.stdout.write("垃圾卷😤");
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x184751 = parseFloat(_0x392607.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x184751 + "现金💰️");

                                _0x5af619.push(_0x184751);

                                const _0x33d420 = {
                                    "prizeValue": _0x392607.data.prizeValue,
                                    "id": _0x392607.data.id,
                                    "poolBaseId": _0x392607.data.poolBaseId,
                                    "prizeGroupId": _0x392607.data.prizeGroupId,
                                    "prizeBaseId": _0x392607.data.prizeBaseId
                                };

                                _0x1aea06.push(_0x33d420);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x19645b = parseFloat(_0x392607.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x19645b + "红包🧧 ");

                                _0x3bcf87.push(_0x19645b);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x392607.data));
                        }
                    } else {
                        if (_0x392607.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x392607.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x392607.errMsg)) : ($.hotflag = false, console.log(_0x392607.errMsg));
                        }
                    }
                }
            } catch (_0x53e15) {
                $.logErr(_0x53e15, _0x16d4a9);
            } finally {
                _0x38122b(_0x392607);
            }
        });
    });
}

async function _0x3d87fe(_0x47e107) {
    const _0x12f3f8 = {
        "pageNum": _0x47e107,
        "pageSize": 100,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    };
    let _0x1e8727 = _0x12f3f8,
        _0x23e8c5 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x1e8727,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x1e8727 = await _0x220452.getbody(_0x23e8c5);

    if (!_0x1e8727) {
        return;
    }

    return new Promise(async _0x357cdc => {
        $.get(_0x1495a7(_0x1e8727), async (_0x486b78, _0x2a9a83, _0x2f8524) => {
            try {
                _0x486b78 ? (console.log("" + JSON.stringify(_0x486b78)), console.log(" API请求失败，请检查网路重试")) : (_0x2f8524 = JSON.parse(_0x2f8524), _0x2f8524.code == 0 ? $.baglist = _0x2f8524.data.items : console.log(_0x2f8524.errMsg));
            } catch (_0x527e42) {
                $.logErr(_0x527e42, _0x2a9a83);
            } finally {
                _0x357cdc(_0x2f8524);
            }
        });
    });
}

async function _0x1f78d7(_0x2c5c7c) {
    const _0x468705 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "isJdApp": true,
        "inviter": _0x2c5c7c
    };
    let _0x211023 = _0x468705,
        _0x1be3c6 = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x211023,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x211023 = await _0x220452.getbody(_0x1be3c6);

    if (!_0x211023) {
        return;
    }

    return new Promise(async _0x459773 => {
        $.dpost(_0x1495a7(_0x211023), async (_0xd1d143, _0x3d2eab, _0x466674) => {
            try {
                if (_0xd1d143) {
                    console.log("" + JSON.stringify(_0xd1d143));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0x466674 = JSON.parse(_0x466674);

                    if (_0x466674.code == 0) {
                        if (!_0x466674.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x466674.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x466674.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x466674.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x466674.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x466674.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x466674.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x466674));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x466674.errMsg);
                    }
                }
            } catch (_0x3cc04a) {
                $.logErr(_0x3cc04a, _0x3d2eab);
            } finally {
                _0x459773(_0x466674);
            }
        });
    });
}

async function _0x211f9a(_0x51472b) {
    let _0x911d6a = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x51472b.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x51472b.poolBaseId + ",\"prizeGroupId\":" + _0x51472b.prizeGroupId + ",\"prizeBaseId\":" + _0x51472b.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0xfd3323 => {
        $.post(_0x1495a7(_0x911d6a), async (_0xb1913f, _0x47befd, _0x3612f6) => {
            try {
                if (_0xb1913f) {
                    console.log("" + JSON.stringify(_0xb1913f));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                } else {
                    _0x3612f6 = JSON.parse(_0x3612f6);

                    if (_0x3612f6.code == 0) {
                        if (_0x3612f6.data.message.indexOf("提现") > -1) {
                            process.stdout.write("✅ ");
                            $.txfail = false;
                        } else {
                            if (_0x3612f6.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x3612f6.data.message.includes("待发放") ? (process.stdout.write("❎"), $.txfail = true) : console.log(_0x3612f6.data.message);
                            }
                        }
                    } else {
                        console.log(_0x3612f6.errMsg);
                    }
                }
            } catch (_0x1d7821) {
                $.logErr(_0x1d7821, _0x47befd);
            } finally {
                _0xfd3323(_0x3612f6);
            }
        });
    });
}

function _0x26d740(_0x5d0c83) {
    let _0x3db618 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x5d0c83.id + ",\"business\":\"fission\",\"poolId\":" + _0x5d0c83.poolBaseId + ",\"prizeGroupId\":" + _0x5d0c83.prizeGroupId + ",\"prizeId\":" + _0x5d0c83.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x1cb33d = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x34c240
    };
    const _0x20b5e7 = {
        "url": "https://api.m.jd.com/api",
        "body": _0x3db618,
        "headers": _0x1cb33d
    };
    return new Promise(async _0x3493ae => {
        $.post(_0x20b5e7, async (_0x59d02c, _0x4720e8, _0x4e04a6) => {
            try {
                if (_0x59d02c) {
                    console.log("" + JSON.stringify(_0x59d02c));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                } else {
                    _0x4e04a6 = JSON.parse(_0x4e04a6);

                    if (_0x4e04a6.code == 0) {
                        if (_0x4e04a6.data.resCode === "0") {
                            process.stdout.write("🧧 ");
                        } else {
                            process.stdout.write("❎ ");
                            $.toredfailnum++;
                        }
                    } else {
                        _0x4e04a6.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x4e04a6.errMsg);
                    }
                }
            } catch (_0x15616b) {
                $.logErr(_0x15616b, _0x4720e8);
            } finally {
                _0x3493ae(_0x4e04a6);
            }
        });
    });
}

function _0x1495a7(_0x546204) {
    const _0x5f219b = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x34c240
    };
    const _0x3e9cc7 = {
        "url": "https://api.m.jd.com/?" + _0x546204,
        "headers": _0x5f219b
    };
    return _0x3e9cc7;
}

function _0x3cbb7e() {
    return new Promise(_0x32ed38 => {
        const _0xc84d15 = {
            "Cookie": _0x34c240,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x15cbc4 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0xc84d15,
            "timeout": 10000
        };
        $.get(_0x15cbc4, (_0x5b9c72, _0x26994b, _0x17fdbc) => {
            try {
                if (_0x17fdbc) {
                    _0x17fdbc = JSON.parse(_0x17fdbc);

                    if (!(_0x17fdbc.islogin === "1")) {
                        _0x17fdbc.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x410e6e) {
                console.log(_0x410e6e);
            } finally {
                _0x32ed38();
            }
        });
    });
}

function _0x47210f() {
    return new Promise(_0x3cb80c => {
        $.log("京东账号" + $.index + $.nickName + "\n" + _0x4bddc0);

        _0x3cb80c();
    });
}

function _0x3e1868(_0x5e78e0) {
    try {
        if (typeof JSON.parse(_0x5e78e0) == "object") {
            return true;
        }
    } catch (_0x58e793) {
        console.log(_0x58e793);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x59513c() {
    const _0x19d629 = {
        "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jd50cxj",
        "timeout": 30000
    };
    return new Promise(_0x283bb2 => {
        $.get(_0x19d629, async (_0xd7963b, _0x7962e3, _0x1b7f59) => {
            try {
                if (_0xd7963b) {
                    console.log("\n服务连接失败，终止执行！");
                    process.exit(111);
                } else {
                    if (_0x1b7f59) {
                        _0x1b7f59 = JSON.parse(_0x1b7f59);

                        if (_0x1b7f59.code === 200) {
                            _0x53b4d3 = _0x1b7f59.data;
                        }
                    }
                }
            } catch (_0x2ddff3) {
                $.logErr(_0x2ddff3, _0x7962e3);
            } finally {
                _0x283bb2(_0x53b4d3);
            }
        });
    });
}

function _0x20ad20(_0x1c2bb5) {
    const _0x1fa9b1 = _0x1c2bb5.getFullYear(),
        _0x2d9eaf = ("0" + (_0x1c2bb5.getMonth() + 1)).slice(-2),
        _0x1d8aed = ("0" + _0x1c2bb5.getDate()).slice(-2),
        _0x1f66f4 = ("0" + _0x1c2bb5.getHours()).slice(-2),
        _0x2acbbb = ("0" + _0x1c2bb5.getMinutes()).slice(-2),
        _0x4db84f = ("0" + _0x1c2bb5.getSeconds()).slice(-2);

    return _0x1fa9b1 + "/" + _0x2d9eaf + "/" + _0x1d8aed + " " + _0x1f66f4 + ":" + _0x2acbbb + ":" + _0x4db84f;
}

function _0x3e8382(_0x2179fc) {
    if (typeof _0x2179fc == "string") {
        try {
            return JSON.parse(_0x2179fc);
        } catch (_0x42c68d) {
            console.log(_0x42c68d);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x4b01bf(_0x4c0f96) {
    const _0x2142a9 = {
        "Content-Type": "application/json"
    };
    let _0x37fee1 = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x4c0f96),
        "headers": _0x2142a9,
        "timeout": 10000
    },
        _0x4e7086 = "";
    return new Promise(_0x5197a1 => {
        $.post(_0x37fee1, (_0x3b35bf, _0x5933f5, _0x2d8123) => {
            try {
                if (_0x3b35bf) {
                    console.log("连接失败");
                } else {
                    _0x2d8123 = JSON.parse(_0x2d8123);

                    if (_0x2d8123.code == 200) {
                        _0x4e7086 = _0x2d8123.data;
                    } else {
                        $.log(_0x2d8123.msg);
                    }
                }
            } catch (_0x4df59c) {
                console.log(_0x4df59c, _0x5933f5);
            } finally {
                _0x5197a1(_0x4e7086);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }