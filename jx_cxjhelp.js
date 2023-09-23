
/*
京喜特价抽现金
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头（只能1个），不指定默认CK1， 变量JXCTOPPIN='jdpin'
多少助力换下一个车头，默认9999次 ，可调整变量 JXCXJNUM='100'
运行一次抽奖次数,默认抽完，控制变量 JXCXJLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JXCXJDELAY='3'
开启提现到上限转红包 JXCXJTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true'
updatetime:2023/9/20
 */

const $ = new Env('Jx特价抽现金');
const _0x552843 = $.isNode() ? require("./sendNotify") : "",
    _0x420e02 = $.isNode() ? require("./jdCookie.js") : "",
    _0x4016dc = require("./function/dylanz"),
    _0x31d0a0 = require("./USER_AGENTS");

let _0x3d8255 = [],
    _0x508a9b = [],
    _0x36c56c = [],
    _0xe2c3d5 = [],
    _0x23f83e,
    _0x6628b2 = [],
    _0x203295 = "",
    _0x13692e = "",
    _0x3977c8 = "",
    _0x4b78be,
    _0x158955 = process.env.JXCXJNUM || "9999",
    _0x5afa80 = process.env.JXCXJLTNUM || "-1",
    _0x49c7db = process.env.JXCXJDELAY || "1",
    _0xf65dec = process.env.JXCXJTORED || false,
    _0x44ece5 = process.env.JXCTOPPIN || "",
    _0x506684 = process.env.TXSILENT || false,
    _0x2b1091 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x23f83e = require("./function/proxy.js");
        $.dget = _0x23f83e.intoRequest($.get.bind($), true);
        $.dpost = _0x23f83e.intoRequest($.post.bind($), true);
    } catch {
        $.log("未安装https-proxy-agent依赖，无法启用代理");
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
}

if ($.isNode()) {
    Object.keys(_0x420e02).forEach(_0x43ab91 => {
        _0x6628b2.push(_0x420e02[_0x43ab91]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x6628b2 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4a009f($.getdata("CookiesJD") || "[]").map(_0x5f1a93 => _0x5f1a93.cookie)].filter(_0x315e1c => !!_0x315e1c);
}

!(async () => {
    if (!_0x6628b2[0]) {
        const _0x27b666 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x27b666);
        return;
    }

    $.log("\n当前版本：4.2.3 未中奖重试2次");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    // let _0x132c33 = await _0x19f5d5();

    if (_0x44ece5) {
        console.log("\n已指定PIN：" + _0x44ece5);

        let _0x157b44 = _0x6628b2.findIndex(_0x55b842 => _0x55b842.includes(_0x44ece5));

        if (_0x157b44 == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x203295 = _0x6628b2[_0x157b44];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x203295 = _0x6628b2[0];
    }

    $.UserName = decodeURIComponent(_0x203295.match(/pt_pin=([^; ]+)(?=;?)/) && _0x203295.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x31d0a0.UARAM ? _0x31d0a0.UARAM(1) : _0x31d0a0.USER_AGENT;
    console.log("\n——————————————车头开团—————————————— \n");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x955d68();

    if (!$.isLogin) {
        const _0x304a30 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x304a30);
        $.isNode() && (await _0x552843.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x17b18d(1);
    await $.wait(1000);

    // if (_0x132c33.length != 0) {
    //     let _0x222eab = _0x132c33[Math.floor(Math.random() * _0x132c33.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x203295.match(/pt_pin=([^; ]+)(?=;?)/) && _0x203295.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x31d0a0.UARAM ? _0x31d0a0.UARAM(1) : _0x31d0a0.USER_AGENT;
    //     await _0x56aa9f(_0x222eab);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————");
    console.log("\n\n开始助力车头...");
    _0x4b78be = 0;

    for (let _0x50af33 of _0x3d8255) {
        if (_0x6628b2.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x50af33);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x3893a0 = _0x4b78be; _0x3893a0 < _0x6628b2.length; _0x3893a0++) {
            if (_0x6628b2[_0x3893a0]) {
                _0x203295 = _0x6628b2[_0x3893a0];
                $.UserName = decodeURIComponent(_0x203295.match(/pt_pin=([^; ]+)(?=;?)/) && _0x203295.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x3893a0 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x31d0a0.UARAM ? _0x31d0a0.UARAM(1) : _0x31d0a0.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x56aa9f(_0x50af33);

                if ($.suc > Number(_0x158955) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x4b78be = _0x3893a0 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x6628b2.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0x5afa80 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x5afa80);

    let _0xb0e17f = new Date();

    _0xb0e17f.setDate(_0xb0e17f.getDate() - 1);

    for (let _0x17f39d = 0; _0x17f39d < _0x6628b2.length; _0x17f39d++) {
        if (_0x6628b2[_0x17f39d]) {
            _0x203295 = _0x6628b2[_0x17f39d];
            $.UserName = decodeURIComponent(_0x203295.match(/pt_pin=([^; ]+)(?=;?)/) && _0x203295.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x17f39d + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x508a9b = [];
            _0x36c56c = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.UA = _0x31d0a0.UARAM ? _0x31d0a0.UARAM(1) : _0x31d0a0.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x4de721 = await _0x17b18d(0);

            if (_0x4de721.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x4de721.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x377c22(new Date(Date.now() + _0x4de721.data.countDownTime)));

            for (let _0x4c463e = 0; _0x4c463e < (_0x5afa80 > -1 && _0x5afa80 < $.times ? _0x5afa80 : $.times); _0x4c463e++) {
                process.stdout.write("\n第" + (_0x4c463e + 1) + "次抽奖结果：");

                for (let _0xf1475f of Array(3)) {
                    await _0x272b28(_0xf1475f + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + _0x49c7db * 1000);
                }

                if ($.end) {
                    break;
                }

                await $.wait(Math.random() * 500 + _0x49c7db * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x36c56c.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x36c56c.reduce((_0x3d73fa, _0x524f67) => _0x3d73fa + _0x524f67 * 100, 0) / 100 + "元");
            _0x508a9b.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x508a9b.reduce((_0x43716d, _0x1dd501) => _0x43716d + _0x1dd501 * 100, 0) / 100 + "元");

            if (_0x2b1091 != "true") {
                if (new Date().getHours() < 7 && _0x506684) {
                    continue;
                }

                $.log("\n开始提现(遍历奖励列表)...");
                _0xf65dec && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

                for (let _0x2a1880 = 0; _0x2a1880 < 50; _0x2a1880++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) {
                        break;
                    }

                    if ($.txfull && !_0xf65dec) {
                        $.log("\n本月提现到上限!如转红包请设置变量");
                        break;
                    }

                    await _0x333246(_0x2a1880 + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0xf8ed42 of $.baglist) {
                        if (new Date(_0xf8ed42.createTime) < _0xb0e17f || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0xf8ed42.prizeType == 4) {
                            if (_0xf8ed42.state == 0 || _0xf8ed42.state == 2) {
                                process.stdout.write("" + Number(_0xf8ed42.amount));

                                let _0x470bf9 = await _0x488b63(_0xf8ed42);

                                if ($.txfail) {
                                    await $.wait(5000);
                                    _0x470bf9 = await _0x488b63(_0xf8ed42);
                                }

                                if ($.txfull && !_0xf65dec) {
                                    break;
                                }

                                await $.wait(1000);

                                if (_0x470bf9.data.message.includes("上限") && _0xf65dec && $.toredfailnum < 5) {
                                    await _0x45216d(_0xf8ed42);
                                }

                                await $.wait(4000);
                            } else {
                                _0xf8ed42.state == 8;
                            }
                        }
                    }
                }
            } else {
                $.log("\n已设置不提现！");
            }

            _0xe2c3d5 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x384c1e => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x384c1e + "!", "");
}).finally(() => {
    $.done();
});

async function _0x17b18d(_0x389949) {
    let _0x5817c7 = "functionId=inviteFissionHome&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x5637ae => {
        $.post(_0x524a10(_0x5817c7), async (_0x2350e0, _0x53a9c0, _0x2b9f0a) => {
            try {
                if (_0x2350e0) {
                    console.log("" + JSON.stringify(_0x2350e0));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x2b9f0a = JSON.parse(_0x2b9f0a);

                    if (_0x2b9f0a.code == 0) {
                        $.times = _0x2b9f0a.data.prizeNum;

                        if (_0x389949) {
                            console.log("助力码：" + _0x2b9f0a.data.inviter);
                        }

                        _0x3d8255.push(_0x2b9f0a.data.inviter);
                    } else {
                        console.log(_0x2b9f0a.errMsg);
                    }
                }
            } catch (_0x43b881) {
                $.logErr(_0x43b881, _0x53a9c0);
            } finally {
                _0x5637ae(_0x2b9f0a);
            }
        });
    });
}

async function _0xcd3086() {
    const _0x5125af = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x27b1d1 = _0x5125af,
        _0x1bb430 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x27b1d1,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x27b1d1 = await _0x2d1f0b(_0x1bb430) //: "functionId=inviteFissionReceive&body=" + _0x27b1d1 + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x27b1d1) {
        return;
    }

    return new Promise(async _0x900040 => {
        $.post(_0x524a10(_0x27b1d1), async (_0x8b3bc8, _0x232f70, _0x2a5eec) => {
            try {
                _0x8b3bc8 ? (console.log("" + JSON.stringify(_0x8b3bc8)), console.log("receive请求失败，请检查网路重试")) : (_0x2a5eec = JSON.parse(_0x2a5eec), _0x2a5eec.code == 0 ? $.log("------提现金：" + _0x2a5eec.data.amount) : $.txj = false);
            } catch (_0x28a93b) {
                $.logErr(_0x28a93b, _0x232f70);
            } finally {
                _0x900040(_0x2a5eec);
            }
        });
    });
}

async function _0x272b28(_0x4d16c9) {
    const _0x597278 = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x34f327 = _0x597278,
        _0x51581e = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x34f327,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x34f327 = await _0x4016dc.getbody(_0x51581e);

    if (!_0x34f327) {
        return;
    }

    return new Promise(async _0x85d172 => {
        $.post(_0x524a10(_0x34f327), async (_0x2ccdb4, _0x1faaf3, _0x4714f4) => {
            try {
                if (_0x2ccdb4) {
                    console.log("" + JSON.stringify(_0x2ccdb4));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x4714f4 = JSON.parse(_0x4714f4);

                    if (_0x4714f4.code == 0) {
                        const _0x4a3aaf = _0x4714f4.data.prizeType;

                        if (!_0x4a3aaf) {
                            fail++;
                        }

                        switch (_0x4a3aaf) {
                            case 1:
                                process.stdout.write("垃圾卷😤");
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 6:
                                process.stdout.write("京喜礼包💩");
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x409569 = parseFloat(_0x4714f4.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x409569 + "现金💰️");

                                _0x508a9b.push(_0x409569);

                                const _0x452370 = {
                                    "prizeValue": _0x4714f4.data.prizeValue,
                                    "id": _0x4714f4.data.id,
                                    "poolBaseId": _0x4714f4.data.poolBaseId,
                                    "prizeGroupId": _0x4714f4.data.prizeGroupId,
                                    "prizeBaseId": _0x4714f4.data.prizeBaseId
                                };

                                _0xe2c3d5.push(_0x452370);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x2b9f0e = parseFloat(_0x4714f4.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x2b9f0e + "红包🧧 ");

                                _0x36c56c.push(_0x2b9f0e);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x4714f4.data));
                        }
                    } else {
                        if (_0x4714f4.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x4714f4.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x4714f4.errMsg)) : ($.hotflag = false, console.log(_0x4714f4.errMsg));
                        }
                    }
                }
            } catch (_0x4709d8) {
                $.logErr(_0x4709d8, _0x1faaf3);
            } finally {
                _0x85d172(_0x4714f4);
            }
        });
    });
}

async function _0x333246(_0x310231) {
    const _0x1092a6 = {
        "pageNum": _0x310231,
        "pageSize": 100,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    };
    let _0x3f3e4a = _0x1092a6,
        _0x1a938d = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x3f3e4a,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x3f3e4a = await _0x4016dc.getbody(_0x1a938d);

    if (!_0x3f3e4a) {
        return;
    }

    return new Promise(async _0x47c02e => {
        $.get(_0x524a10(_0x3f3e4a), async (_0x2cccba, _0x4e4c67, _0x52b9bc) => {
            try {
                _0x2cccba ? (console.log("" + JSON.stringify(_0x2cccba)), console.log(" API请求失败，请检查网路重试")) : (_0x52b9bc = JSON.parse(_0x52b9bc), _0x52b9bc.code == 0 ? $.baglist = _0x52b9bc.data.items : console.log(_0x52b9bc.errMsg));
            } catch (_0x20bcbd) {
                $.logErr(_0x20bcbd, _0x4e4c67);
            } finally {
                _0x47c02e(_0x52b9bc);
            }
        });
    });
}

async function _0x56aa9f(_0x3739de) {
    const _0x49f332 = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "isJdApp": true,
        "inviter": _0x3739de
    };
    let _0x51a89d = _0x49f332,
        _0x33f5de = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x51a89d,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x51a89d = await _0x4016dc.getbody(_0x33f5de);

    if (!_0x51a89d) {
        return;
    }

    return new Promise(async _0x4249b1 => {
        $.dpost(_0x524a10(_0x51a89d), async (_0x4c46be, _0x1d3137, _0xf7162e) => {
            try {
                if (_0x4c46be) {
                    console.log("" + JSON.stringify(_0x4c46be));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0xf7162e = JSON.parse(_0xf7162e);

                    if (_0xf7162e.code == 0) {
                        if (!_0xf7162e.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0xf7162e.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0xf7162e.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0xf7162e.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0xf7162e.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0xf7162e.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0xf7162e.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0xf7162e));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0xf7162e.errMsg);
                    }
                }
            } catch (_0x5e330b) {
                $.logErr(_0x5e330b, _0x1d3137);
            } finally {
                _0x4249b1(_0xf7162e);
            }
        });
    });
}

async function _0x488b63(_0x55a557) {
    let _0x51a755 = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x55a557.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x55a557.poolBaseId + ",\"prizeGroupId\":" + _0x55a557.prizeGroupId + ",\"prizeBaseId\":" + _0x55a557.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x492995 => {
        $.post(_0x524a10(_0x51a755), async (_0x2f5d6d, _0x26e29d, _0x258545) => {
            try {
                if (_0x2f5d6d) {
                    console.log("" + JSON.stringify(_0x2f5d6d));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                } else {
                    _0x258545 = JSON.parse(_0x258545);

                    if (_0x258545.code == 0) {
                        if (_0x258545.data.message.indexOf("提现") > -1) {
                            process.stdout.write("✅ ");
                            $.txfail = false;
                        } else {
                            if (_0x258545.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x258545.data.message.includes("待发放") ? (process.stdout.write("❎ "), $.txfail = true) : console.log(_0x258545.data.message);
                            }
                        }
                    } else {
                        console.log(_0x258545.errMsg);
                    }
                }
            } catch (_0x2b6855) {
                $.logErr(_0x2b6855, _0x26e29d);
            } finally {
                _0x492995(_0x258545);
            }
        });
    });
}

async function _0x45216d(_0x1b93c2) {
    let _0x53047d = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x1b93c2.id + ",\"business\":\"fission\",\"poolId\":" + _0x1b93c2.poolBaseId + ",\"prizeGroupId\":" + _0x1b93c2.prizeGroupId + ",\"prizeId\":" + _0x1b93c2.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0xebe357 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x203295
    };
    const _0x5d30b9 = {
        "url": "https://api.m.jd.com/api",
        "body": _0x53047d,
        "headers": _0xebe357
    };
    return new Promise(async _0x2ebc2f => {
        $.post(_0x5d30b9, async (_0x39721f, _0x1b2a5d, _0x1abe12) => {
            try {
                if (_0x39721f) {
                    console.log("" + JSON.stringify(_0x39721f));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                } else {
                    _0x1abe12 = JSON.parse(_0x1abe12);

                    if (_0x1abe12.code == 0) {
                        _0x1abe12.data.resCode === "0" ? process.stdout.write("🧧 ") : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        if (_0x1abe12.errMsg === "失败") {
                            process.stdout.write("❎ ");
                            $.toredfailnum++;
                        } else {
                            console.log(_0x1abe12.errMsg);
                        }
                    }
                }
            } catch (_0x29db7c) {
                $.logErr(_0x29db7c, _0x1b2a5d);
            } finally {
                _0x2ebc2f(_0x1abe12);
            }
        });
    });
}

function _0x524a10(_0x52fb0d) {
    const _0x4626d7 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x203295
    };
    const _0x5b5b28 = {
        "url": "https://api.m.jd.com/?" + _0x52fb0d,
        "headers": _0x4626d7
    };
    return _0x5b5b28;
}

function _0x955d68() {
    return new Promise(_0x19ea9a => {
        const _0x1b34eb = {
            "Cookie": _0x203295,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x207639 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x1b34eb,
            "timeout": 10000
        };
        $.get(_0x207639, (_0x5dce76, _0x3cb87e, _0x38f50e) => {
            try {
                if (_0x38f50e) {
                    _0x38f50e = JSON.parse(_0x38f50e);

                    if (!(_0x38f50e.islogin === "1")) {
                        _0x38f50e.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x2a79d1) {
                console.log(_0x2a79d1);
            } finally {
                _0x19ea9a();
            }
        });
    });
}

function _0x9847df() {
    return new Promise(_0x121a9e => {
        $.log("京东账号" + $.index + $.nickName + "\n" + _0x13692e);

        _0x121a9e();
    });
}

function _0x26e244(_0x2411fa) {
    try {
        if (typeof JSON.parse(_0x2411fa) == "object") {
            return true;
        }
    } catch (_0x2beec1) {
        console.log(_0x2beec1);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x19f5d5() {
    const _0x835149 = {
        "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jxcxj",
        "timeout": 30000
    };
    return new Promise(_0x59903c => {
        $.get(_0x835149, async (_0x4c528e, _0x166cb7, _0x3c063d) => {
            try {
                if (_0x4c528e) {
                    console.log("\n服务连接失败，终止执行！");
                    process.exit(111);
                } else {
                    if (_0x3c063d) {
                        _0x3c063d = JSON.parse(_0x3c063d);

                        if (_0x3c063d.code === 200) {
                            _0x3977c8 = _0x3c063d.data;
                        }
                    }
                }
            } catch (_0x56642f) {
                $.logErr(_0x56642f, _0x166cb7);
            } finally {
                _0x59903c(_0x3977c8);
            }
        });
    });
}

function _0x377c22(_0x73e399) {
    const _0x17b807 = _0x73e399.getFullYear(),
        _0x281b07 = ("0" + (_0x73e399.getMonth() + 1)).slice(-2),
        _0x29781a = ("0" + _0x73e399.getDate()).slice(-2),
        _0x4cf26d = ("0" + _0x73e399.getHours()).slice(-2),
        _0x5af49e = ("0" + _0x73e399.getMinutes()).slice(-2),
        _0x3f4c76 = ("0" + _0x73e399.getSeconds()).slice(-2);

    return _0x17b807 + "/" + _0x281b07 + "/" + _0x29781a + " " + _0x4cf26d + ":" + _0x5af49e + ":" + _0x3f4c76;
}

function _0x4a009f(_0x3f8a7f) {
    if (typeof _0x3f8a7f == "string") {
        try {
            return JSON.parse(_0x3f8a7f);
        } catch (_0x392c79) {
            console.log(_0x392c79);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x2d1f0b(_0x12e968) {
    const _0x4efe90 = {
        "Content-Type": "application/json"
    };
    let _0x5897aa = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x12e968),
        "headers": _0x4efe90,
        "timeout": 10000
    },
        _0x4efeb2 = "";
    return new Promise(_0x1c60ca => {
        $.post(_0x5897aa, (_0x48098e, _0x49bc95, _0x1827d8) => {
            try {
                _0x48098e ? console.log("连接失败") : (_0x1827d8 = JSON.parse(_0x1827d8), _0x1827d8.code == 200 ? _0x4efeb2 = _0x1827d8.data : $.log(_0x1827d8.msg));
            } catch (_0x51dddb) {
                console.log(_0x51dddb, _0x49bc95);
            } finally {
                _0x1c60ca(_0x4efeb2);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }