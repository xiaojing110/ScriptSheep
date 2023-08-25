/*
京喜特价抽现金
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头，不指定默认CK1， 变量JXCTOPPIN='jdpin'
多少助力换下一个车头，默认9999次 ，可调整变量 JXCXJNUM='100'
运行一次抽奖次数,默认抽完，控制变量 JXCXJLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JXCXJDELAY='3'
开启提现到上限转红包 JXCXJTORED='true'

1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_cxjhelp.js
updatetime:2023/8/20 fixx
 */

const $ = new Env('JX特价抽现金');
const _0x1bb0f6 = $.isNode() ? require("./sendNotify") : "",
    _0xeca9ca = $.isNode() ? require("./jdCookie.js") : "",
    _0x36dcda = require("./function/dylanz"),
    _0x210626 = require("./USER_AGENTS");

let _0x35f603 = [],
    _0x411e8b = [],
    _0x4e79ea = [],
    _0x4c1a56 = [],
    _0x4745a6 = [],
    _0x5e24c6 = "",
    _0x1b95fc = "",
    _0x572c21 = "",
    _0x196079,
    _0xc1869a = process.env.JXCXJNUM || "9999",
    _0x811b3b = process.env.JXCXJLTNUM || "0",
    _0x11e578 = process.env.JXCXJDELAY || "1",
    _0x22e738 = process.env.JXCXJTORED || false,
    _0x32ca07 = process.env.JXCTOPPIN || "",
    _0x3cb276 = process.env.TXSILENT || false;

if ($.isNode()) {
    Object.keys(_0xeca9ca).forEach(_0x2216e4 => {
        _0x4745a6.push(_0xeca9ca[_0x2216e4]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x4745a6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x5dd3a1($.getdata("CookiesJD") || "[]").map(_0x5fefe5 => _0x5fefe5.cookie)].filter(_0x5defb5 => !!_0x5defb5);
}

!(async () => {
    if (!_0x4745a6[0]) {
        const _0x507377 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x507377);
        return;
    }

    $.log("\n当前版本：4.0.2 修正火爆显示");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    // let _0x5d82e9 = await _0x3cba00();

    if (_0x32ca07) {
        console.log("\n已指定PIN：" + _0x32ca07);

        let _0x207898 = _0x4745a6.findIndex(_0x5b8fb8 => _0x5b8fb8.includes(encodeURIComponent(_0x32ca07)));

        _0x207898 == -1 && (console.log("运行的CK中没找到指定的PIN，CK1为车头"), _0x207898 = 0);
        _0x5e24c6 = _0x4745a6[_0x207898];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x5e24c6 = _0x4745a6[0];
    }

    $.UserName = decodeURIComponent(_0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x210626.UARAM ? _0x210626.UARAM(1) : _0x210626.USER_AGENT;
    console.log("\n——————————————车头开团—————————————— \n");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x17726f();

    if (!$.isLogin) {
        const _0x14d6b0 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x14d6b0);
        $.isNode() && (await _0x1bb0f6.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x47a5dc(1);
    await $.wait(1000);

    // if (_0x5d82e9.length != 0) {
    //     let _0x2cd8c7 = _0x5d82e9[Math.floor(Math.random() * _0x5d82e9.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x210626.UARAM ? _0x210626.UARAM(1) : _0x210626.USER_AGENT;
    //     await _0x131826(_0x2cd8c7);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————");
    console.log("\n\n开始助力车头...");
    _0x196079 = 0;

    for (let _0x229782 of _0x35f603) {
        if (_0x4745a6.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x229782);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x193f5c = _0x196079; _0x193f5c < _0x4745a6.length; _0x193f5c++) {
            if (_0x4745a6[_0x193f5c]) {
                _0x5e24c6 = _0x4745a6[_0x193f5c];
                $.UserName = decodeURIComponent(_0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x193f5c + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x210626.UARAM ? _0x210626.UARAM(1) : _0x210626.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x131826(_0x229782);

                if ($.suc > Number(_0xc1869a) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x196079 = _0x193f5c + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x4745a6.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0x811b3b != 0 && console.log("\n已设置本次运行抽奖次数 " + _0x811b3b);

    let _0x22c4e8 = new Date();

    _0x22c4e8.setDate(_0x22c4e8.getDate() - 1);

    for (let _0x3cbf95 = 0; _0x3cbf95 < _0x4745a6.length; _0x3cbf95++) {
        if (_0x4745a6[_0x3cbf95]) {
            _0x5e24c6 = _0x4745a6[_0x3cbf95];
            $.UserName = decodeURIComponent(_0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5e24c6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x3cbf95 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x411e8b = [];
            _0x4e79ea = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.UA = _0x210626.UARAM ? _0x210626.UARAM(1) : _0x210626.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x37e8c3 = await _0x47a5dc(0);

            if (_0x37e8c3.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x37e8c3.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x854183(new Date(Date.now() + _0x37e8c3.data.countDownTime)) + "\n");

            for (let _0x203246 = 0; _0x203246 < (_0x811b3b != 0 && _0x811b3b < $.times ? _0x811b3b : $.times); _0x203246++) {
                await _0xc0a6fb(_0x203246 + 1);
                await $.wait(Math.random() * 500 + _0x11e578 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x4e79ea.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x4e79ea.reduce((_0x4fc302, _0x226fe1) => _0x4fc302 + _0x226fe1 * 100, 0) / 100 + "元");
            _0x411e8b.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x411e8b.reduce((_0x3599cd, _0x462236) => _0x3599cd + _0x462236 * 100, 0) / 100 + "元");

            if (new Date().getHours() < 7 && _0x3cb276) {
                continue;
            }

            $.log("\n开始提现(遍历奖励列表)...");
            _0x22e738 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

            for (let _0x29bef2 = 0; _0x29bef2 < 50; _0x29bef2++) {
                if ($.nocashnum > 2) {
                    break;
                }

                if ($.txfull && !_0x22e738) {
                    $.log("\n本月提现到上限!如转红包请设置变量");
                    break;
                }

                await _0x593bed(_0x29bef2 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0x3b8767 of $.baglist) {
                    if (new Date(_0x3b8767.createTime) < _0x22c4e8) {
                        $.nocashnum = 5;
                        break;
                    }

                    if (_0x3b8767.prizeType == 4) {
                        if (_0x3b8767.state == 0 || _0x3b8767.state == 2) {
                            process.stdout.write("" + Number(_0x3b8767.amount));

                            let _0x3cf563 = await _0x15719b(_0x3b8767);

                            $.txfail && (await $.wait(5000), _0x3cf563 = await _0x15719b(_0x3b8767));

                            if ($.txfull && !_0x22e738) {
                                break;
                            }

                            await $.wait(1000);

                            if (_0x3cf563.data.message.includes("上限") && _0x22e738) {
                                await _0x306587(_0x3b8767);
                            }

                            await $.wait(4000);
                        } else {
                            _0x3b8767.state == 8;
                        }
                    }
                }
            }

            _0x4c1a56 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x2e0f72 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2e0f72 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x47a5dc(_0x1873a0) {
    let _0x608b8c = "functionId=inviteFissionHome&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x192234 => {
        $.post(_0x212e92(_0x608b8c), async (_0x4befe7, _0x21a15b, _0x2a3d95) => {
            try {
                if (_0x4befe7) {
                    console.log("" + JSON.stringify(_0x4befe7));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x2a3d95 = JSON.parse(_0x2a3d95);

                    if (_0x2a3d95.code == 0) {
                        $.times = _0x2a3d95.data.prizeNum;

                        if (_0x1873a0) {
                            console.log("助力码：" + _0x2a3d95.data.inviter);
                        }

                        _0x35f603.push(_0x2a3d95.data.inviter);
                    } else {
                        console.log(_0x2a3d95.errMsg);
                    }
                }
            } catch (_0x4a7c73) {
                $.logErr(_0x4a7c73, _0x21a15b);
            } finally {
                _0x192234(_0x2a3d95);
            }
        });
    });
}

async function _0x58163c() {
    const _0x49d42a = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x5333c6 = {
        "appId": "b8469",
        "fn": "inviteFissionReceive",
        "body": _0x49d42a,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0x49d42a = __filename.indexOf(false) > -1 ? await _0x1b3c86(_0x5333c6) : "functionId=inviteFissionReceive&body=" + _0x49d42a + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x49d42a) {
        return;
    }

    return new Promise(async _0x363b13 => {
        $.post(_0x212e92(_0x49d42a), async (_0x2b5b2a, _0x22ae9d, _0x3b41f5) => {
            try {
                _0x2b5b2a ? (console.log("" + JSON.stringify(_0x2b5b2a)), console.log("receive请求失败，请检查网路重试")) : (_0x3b41f5 = JSON.parse(_0x3b41f5), _0x3b41f5.code == 0 ? $.log("------提现金：" + _0x3b41f5.data.amount) : $.txj = false);
            } catch (_0x7cd7e1) {
                $.logErr(_0x7cd7e1, _0x22ae9d);
            } finally {
                _0x363b13(_0x3b41f5);
            }
        });
    });
}

async function _0xc0a6fb(_0x38b796) {
    const _0x9ef05 = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x466374 = {
        "appId": "c02c6",
        "fn": "inviteFissionDrawPrize",
        "body": _0x9ef05,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "xcr": $.fg,
        "ua": $.UA
    };
    $.fg == 1 && ($.fg = 0);
    _0x9ef05 = await _0x36dcda.getbody(_0x466374);

    if (!_0x9ef05) {
        return;
    }

    return new Promise(async _0x19f49a => {
        $.post(_0x212e92(_0x9ef05), async (_0x29192c, _0x33cc6c, _0x439190) => {
            try {
                if (_0x29192c) {
                    console.log("" + JSON.stringify(_0x29192c));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x439190 = JSON.parse(_0x439190);

                    if (_0x439190.code == 0) {
                        const _0x354986 = _0x439190.data.prizeType;

                        if (!_0x354986) {
                            fail++;
                        }

                        switch (_0x354986) {
                            case 1:
                                console.log("第" + _0x38b796 + "次抽奖结果：垃圾卷 😤");
                                $.fail++;
                                break;

                            case 6:
                                console.log("第" + _0x38b796 + "次抽奖结果：京喜礼包 💩");
                                break;

                            case 4:
                                let _0x4f7281 = parseFloat(_0x439190.data.prizeValue).toFixed(2);

                                console.log("第" + _0x38b796 + "次抽奖结果：" + _0x4f7281 + "现金 💰️");

                                _0x411e8b.push(_0x4f7281);

                                const _0x3b908a = {
                                    "prizeValue": _0x439190.data.prizeValue,
                                    "id": _0x439190.data.id,
                                    "poolBaseId": _0x439190.data.poolBaseId,
                                    "prizeGroupId": _0x439190.data.prizeGroupId,
                                    "prizeBaseId": _0x439190.data.prizeBaseId
                                };

                                _0x4c1a56.push(_0x3b908a);

                                $.fail = 0;
                                break;

                            case 2:
                                let _0xac5a2c = parseFloat(_0x439190.data.prizeValue).toFixed(2);

                                console.log("第" + _0x38b796 + "次抽奖结果：" + _0xac5a2c + "红包 🧧");

                                _0x4e79ea.push(_0xac5a2c);

                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(_0x439190.data));
                        }
                    } else {
                        _0x439190.errMsg.includes("火爆") ? console.log("第" + _0x38b796 + "次抽奖结果：未中奖！") : console.log(_0x439190.errMsg);
                    }
                }
            } catch (_0xdd55b6) {
                $.logErr(_0xdd55b6, _0x33cc6c);
            } finally {
                _0x19f49a(_0x439190);
            }
        });
    });
}

async function _0x593bed(_0x108d3c) {
    const _0x1ce4d7 = {
        "pageNum": _0x108d3c,
        "pageSize": 100,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    };
    let _0xc5be71 = {
        "appId": "f2b1d",
        "fn": "superRedBagList",
        "body": _0x1ce4d7,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    _0x1ce4d7 = await _0x36dcda.getbody(_0xc5be71);

    if (!_0x1ce4d7) {
        return;
    }

    return new Promise(async _0x3d451c => {
        $.get(_0x212e92(_0x1ce4d7), async (_0x571fce, _0x116854, _0x8fcf88) => {
            try {
                _0x571fce ? (console.log("" + JSON.stringify(_0x571fce)), console.log(" API请求失败，请检查网路重试")) : (_0x8fcf88 = JSON.parse(_0x8fcf88), _0x8fcf88.code == 0 ? $.baglist = _0x8fcf88.data.items : console.log(_0x8fcf88.errMsg));
            } catch (_0x35eb0b) {
                $.logErr(_0x35eb0b, _0x116854);
            } finally {
                _0x3d451c(_0x8fcf88);
            }
        });
    });
}

async function _0x131826(_0x487468) {
    const _0x59ee4e = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "isJdApp": true,
        "inviter": _0x487468
    };
    let _0x108d89 = {
        "appId": "02f8d",
        "fn": "inviteFissionBeforeHome",
        "body": _0x59ee4e,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "xcr": 1,
        "ua": $.UA
    };
    _0x59ee4e = await _0x36dcda.getbody(_0x108d89);

    if (!_0x59ee4e) {
        return;
    }

    return new Promise(async _0x3cac96 => {
        $.post(_0x212e92(_0x59ee4e), async (_0x3df015, _0x57890c, _0x3e35e5) => {
            try {
                if (_0x3df015) {
                    console.log("" + JSON.stringify(_0x3df015));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0x3e35e5 = JSON.parse(_0x3e35e5);

                    if (_0x3e35e5.code == 0) {
                        if (!_0x3e35e5.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x3e35e5.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x3e35e5.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x3e35e5.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x3e35e5.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x3e35e5.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x3e35e5.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x3e35e5));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x3e35e5.errMsg);
                    }
                }
            } catch (_0xeb7a9e) {
                $.logErr(_0xeb7a9e, _0x57890c);
            } finally {
                _0x3cac96(_0x3e35e5);
            }
        });
    });
}

async function _0x15719b(_0x1290fb) {
    let _0x4b55fe = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x1290fb.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x1290fb.poolBaseId + ",\"prizeGroupId\":" + _0x1290fb.prizeGroupId + ",\"prizeBaseId\":" + _0x1290fb.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x54687d => {
        $.post(_0x212e92(_0x4b55fe), async (_0x38fcda, _0x5ab730, _0x4b9ce4) => {
            try {
                if (_0x38fcda) {
                    console.log("" + JSON.stringify(_0x38fcda));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                } else {
                    _0x4b9ce4 = JSON.parse(_0x4b9ce4);

                    if (_0x4b9ce4.code == 0) {
                        if (_0x4b9ce4.data.message.indexOf("提现") > -1) {
                            process.stdout.write("✅ ");
                            $.txfail = false;
                        } else {
                            if (_0x4b9ce4.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                if (_0x4b9ce4.data.message.includes("待发放")) {
                                    process.stdout.write("❎");
                                    $.txfail = true;
                                } else {
                                    console.log(_0x4b9ce4.data.message);
                                }
                            }
                        }
                    } else {
                        console.log(_0x4b9ce4.errMsg);
                    }
                }
            } catch (_0x1d3d1e) {
                $.logErr(_0x1d3d1e, _0x5ab730);
            } finally {
                _0x54687d(_0x4b9ce4);
            }
        });
    });
}

async function _0x306587(_0x2449e5) {
    let _0x2e929c = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x2449e5.id + ",\"business\":\"fission\",\"poolId\":" + _0x2449e5.poolBaseId + ",\"prizeGroupId\":" + _0x2449e5.prizeGroupId + ",\"prizeId\":" + _0x2449e5.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x17333f = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x5e24c6
    };
    const _0x54cb4d = {
        "url": "https://api.m.jd.com/api",
        "body": _0x2e929c,
        "headers": _0x17333f
    };
    return new Promise(async _0x38073b => {
        $.post(_0x54cb4d, async (_0x3328e6, _0x485ea9, _0x369939) => {
            try {
                if (_0x3328e6) {
                    console.log("" + JSON.stringify(_0x3328e6));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                } else {
                    _0x369939 = JSON.parse(_0x369939);

                    if (_0x369939.code == 0) {
                        _0x369939.data.resCode === "0" ? process.stdout.write("🧧 ") : console.log("兑换失败");
                    } else {
                        console.log(_0x369939.errMsg);
                    }
                }
            } catch (_0x37e961) {
                $.logErr(_0x37e961, _0x485ea9);
            } finally {
                _0x38073b(_0x369939);
            }
        });
    });
}

function _0x212e92(_0x2945f8) {
    const _0x5619b3 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x5e24c6
    };
    const _0xd34482 = {
        "url": "https://api.m.jd.com/?" + _0x2945f8,
        "headers": _0x5619b3
    };
    return _0xd34482;
}

function _0x17726f() {
    return new Promise(_0x5b38dc => {
        const _0x7760ac = {
            "Cookie": _0x5e24c6,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x28b415 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x7760ac,
            "timeout": 10000
        };
        $.get(_0x28b415, (_0x4280bc, _0x556f87, _0xa99813) => {
            try {
                if (_0xa99813) {
                    _0xa99813 = JSON.parse(_0xa99813);

                    if (!(_0xa99813.islogin === "1")) {
                        _0xa99813.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x3b82cf) {
                console.log(_0x3b82cf);
            } finally {
                _0x5b38dc();
            }
        });
    });
}

function _0x4e855b() {
    return new Promise(_0x274467 => {
        $.log("京东账号" + $.index + $.nickName + "\n" + _0x1b95fc);

        _0x274467();
    });
}

function _0x4c9cea(_0x4d457b) {
    try {
        if (typeof JSON.parse(_0x4d457b) == "object") {
            return true;
        }
    } catch (_0x3dfb49) {
        console.log(_0x3dfb49);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x3cba00() {
    const _0x3a7863 = {
        "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jxcxj",
        "timeout": 30000
    };
    return new Promise(_0x4d404a => {
        $.get(_0x3a7863, async (_0x168518, _0x3b9202, _0x16dd45) => {
            try {
                if (_0x168518) {
                    console.log("\n服务连接失败，终止执行！");
                    process.exit(111);
                } else {
                    if (_0x16dd45) {
                        _0x16dd45 = JSON.parse(_0x16dd45);

                        if (_0x16dd45.code === 200) {
                            _0x572c21 = _0x16dd45.data;
                        }
                    }
                }
            } catch (_0x186ec3) {
                $.logErr(_0x186ec3, _0x3b9202);
            } finally {
                _0x4d404a(_0x572c21);
            }
        });
    });
}

function _0x5dd3a1(_0x4c911c) {
    if (typeof _0x4c911c == "string") {
        try {
            return JSON.parse(_0x4c911c);
        } catch (_0x51f16a) {
            console.log(_0x51f16a);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x854183(_0x714b0) {
    const _0x408ba6 = _0x714b0.getFullYear(),
        _0x52e10d = ("0" + (_0x714b0.getMonth() + 1)).slice(-2),
        _0x438dff = ("0" + _0x714b0.getDate()).slice(-2),
        _0x196145 = ("0" + _0x714b0.getHours()).slice(-2),
        _0x4c2dd3 = ("0" + _0x714b0.getMinutes()).slice(-2),
        _0x4925a3 = ("0" + _0x714b0.getSeconds()).slice(-2);

    return _0x408ba6 + "/" + _0x52e10d + "/" + _0x438dff + " " + _0x196145 + ":" + _0x4c2dd3 + ":" + _0x4925a3;
}

function _0x1b3c86(_0x5766a5) {
    const _0x3e03a3 = {
        "Content-Type": "application/json"
    };
    let _0x4c60fa = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x5766a5),
        "headers": _0x3e03a3,
        "timeout": 10000
    },
        _0x456c38 = "";
    return new Promise(_0x1008e7 => {
        $.post(_0x4c60fa, (_0x2483c9, _0x3f50bb, _0x23fdf2) => {
            try {
                if (_0x2483c9) {
                    console.log("连接失败");
                } else {
                    _0x23fdf2 = JSON.parse(_0x23fdf2);

                    if (_0x23fdf2.code == 200) {
                        _0x456c38 = _0x23fdf2.data;
                    } else {
                        $.log(_0x23fdf2.msg);
                    }
                }
            } catch (_0x4e3b61) {
                console.log(_0x4e3b61, _0x3f50bb);
            } finally {
                _0x1008e7(_0x456c38);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }