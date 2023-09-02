
/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
多少助力换下一个车头，默认999个 ，控制变量 JDZHBNUM='100';
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb.js
updatetime:2023/9/1 
 */

const $ = new Env('Jd转赚红包');
const _0x268748 = $.isNode() ? require("./sendNotify") : "",
    _0x3a52fd = $.isNode() ? require("./jdCookie.js") : "",
    _0x5821b7 = require("./function/dylanz"),
    _0x3a9114 = require("./USER_AGENTS");

let _0x5bf9fa = [],
    _0x367c59 = [],
    _0x34bad3 = [],
    _0x1f643a = [],
    _0x4c5d6c,
    _0xd8001a = [],
    _0x42d5d9 = "",
    _0x393ee7 = "",
    _0x564ab6 = "",
    _0x1e9909,
    _0x5f4f6d = process.env.JDZHBNUM || "9999",
    _0xe3e9bd = process.env.JDZHBLTNUM || "-1",
    _0x1bd4a1 = process.env.JDZHBDELAY || "1",
    _0x1c57b0 = process.env.JDZHBTORED || false,
    _0x4c8945 = process.env.JDZHBTOPPIN || "",
    _0x3da414 = process.env.TXSILENT || false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x4c5d6c = require("./function/proxy.js");
        $.dget = _0x4c5d6c.intoRequest($.get.bind($), true);
        $.dpost = _0x4c5d6c.intoRequest($.post.bind($), true);
    } catch {
        $.log("未安装https-proxy-agent依赖，无法启用代理");
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
}

if ($.isNode()) {
    Object.keys(_0x3a52fd).forEach(_0x299536 => {
        _0xd8001a.push(_0x3a52fd[_0x299536]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0xd8001a = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x564faf($.getdata("CookiesJD") || "[]").map(_0x10aa3c => _0x10aa3c.cookie)].filter(_0x1a4415 => !!_0x1a4415);
}

!(async () => {
    if (!_0xd8001a[0]) {
        const _0x10a920 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x10a920);
        return;
    }

    $.log("\n当前版本：2.5.0 可启用代理");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    // let _0x22ed8d = await _0x1cc24c();

    if (_0x4c8945) {
        console.log("\n已指定PIN：" + _0x4c8945);

        let _0x173ccd = _0xd8001a.findIndex(_0x16fd2e => _0x16fd2e.includes(encodeURIComponent(_0x4c8945)));

        _0x173ccd == -1 && (console.log("运行的CK中没找到指定的PIN，CK1为车头"), _0x173ccd = 0);
        _0x42d5d9 = _0xd8001a[_0x173ccd];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x42d5d9 = _0xd8001a[0];
    }

    $.UserName = decodeURIComponent(_0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x3a9114.UARAM ? _0x3a9114.UARAM() : _0x3a9114.USER_AGENT;
    console.log("\n——————————————车头开团——————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x5d1f66();

    if (!$.isLogin) {
        const _0x1eaa70 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x1eaa70);
        $.isNode() && (await _0x268748.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x2611ed(1);
    await $.wait(1000);

    // if (_0x22ed8d.length != 0) {
    //     let _0x1b59bc = _0x22ed8d[Math.floor(Math.random() * _0x22ed8d.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x3a9114.UARAM ? _0x3a9114.UARAM() : _0x3a9114.USER_AGENT;
    //     await _0x6c1a01(_0x1b59bc);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————");
    console.log("\n\n开始助力车头...");
    _0x1e9909 = 0;

    for (let _0x543f0f of _0x5bf9fa) {
        if (_0xd8001a.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x543f0f);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x28bbdc = _0x1e9909; _0x28bbdc < _0xd8001a.length; _0x28bbdc++) {
            if (_0xd8001a[_0x28bbdc]) {
                _0x42d5d9 = _0xd8001a[_0x28bbdc];
                $.UserName = decodeURIComponent(_0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x28bbdc + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x3a9114.UARAM ? _0x3a9114.UARAM() : _0x3a9114.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x6c1a01(_0x543f0f);

                if ($.suc > Number(_0x5f4f6d) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x1e9909 = _0x28bbdc + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0xd8001a.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0xe3e9bd > -1 && console.log("\n已设置本次运行抽奖次数 " + _0xe3e9bd);

    let _0x5ac68c = new Date();

    _0x5ac68c.setDate(_0x5ac68c.getDate() - 1);

    for (let _0x113f97 = 0; _0x113f97 < _0xd8001a.length; _0x113f97++) {
        if (_0xd8001a[_0x113f97]) {
            _0x42d5d9 = _0xd8001a[_0x113f97];
            $.UserName = decodeURIComponent(_0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x42d5d9.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x113f97 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x367c59 = [];
            _0x34bad3 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.toredfailnum = 0;
            $.UA = _0x3a9114.UARAM ? _0x3a9114.UARAM() : _0x3a9114.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x1d4207 = await _0x2611ed(0);

            if (_0x1d4207.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x1d4207.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x5acf93(new Date(Date.now() + _0x1d4207.data.countDownTime)) + "\n");

            for (let _0x38fe4c = 0; _0x38fe4c < (_0xe3e9bd > -1 && _0xe3e9bd < $.times ? _0xe3e9bd : $.times); _0x38fe4c++) {
                await _0x26668c(_0x38fe4c + 1);

                if ($.end) {
                    break;
                }

                await $.wait(Math.random() * 500 + _0x1bd4a1 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x34bad3.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x34bad3.reduce((_0xd24d52, _0x5ada5e) => _0xd24d52 + _0x5ada5e * 100, 0) / 100 + "元");
            _0x367c59.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x367c59.reduce((_0x132c87, _0xbff201) => _0x132c87 + _0xbff201 * 100, 0) / 100 + "元");

            if (new Date().getHours() < 7 && _0x3da414) {
                continue;
            }

            $.log("\n开始提现(遍历奖励列表)...");
            _0x1c57b0 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

            for (let _0x3cb554 = 0; _0x3cb554 < 50; _0x3cb554++) {
                if ($.nocashnum > 2 || $.toredfailnum > 4) {
                    break;
                }

                if ($.txfull && !_0x1c57b0) {
                    $.log("\n本月提现到上限!如转红包请设置变量");
                    break;
                }

                await _0x531db7(_0x3cb554 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0xccc77e of $.baglist) {
                    if (new Date(_0xccc77e.createTime) < _0x5ac68c || $.toredfailnum > 4) {
                        $.nocashnum = 5;
                        break;
                    }

                    if (_0xccc77e.prizeType == 4) {
                        if (_0xccc77e.state == 0 || _0xccc77e.state == 2) {
                            process.stdout.write("" + Number(_0xccc77e.amount));

                            let _0x1af341 = await _0x4f4ec6(_0xccc77e);

                            $.txfail && (await $.wait(5000), _0x1af341 = await _0x4f4ec6(_0xccc77e));

                            if ($.txfull && !_0x1c57b0) {
                                break;
                            }

                            await $.wait(1000);

                            if (_0x1af341.data.message.includes("上限") && _0x1c57b0 && $.toredfailnum < 5) {
                                await _0x200cd4(_0xccc77e);
                            }

                            await $.wait(4000);
                        } else {
                            _0xccc77e.state == 8;
                        }
                    }
                }
            }

            _0x1f643a = [];
            await $.wait(2000);
        }
    }
})().catch(_0x343e64 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x343e64 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2611ed(_0x5b5535) {
    let _0x2b71b0 = "functionId=inviteFissionHome&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x106c7d => {
        $.post(_0x2021c9(_0x2b71b0), async (_0x57c84d, _0x3a9b97, _0xdcf2ce) => {
            try {
                if (_0x57c84d) {
                    console.log("" + JSON.stringify(_0x57c84d));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0xdcf2ce = JSON.parse(_0xdcf2ce);

                    if (_0xdcf2ce.code == 0) {
                        $.times = _0xdcf2ce.data.prizeNum;

                        if (_0x5b5535) {
                            console.log("助力码：" + _0xdcf2ce.data.inviter);
                        }

                        _0x5bf9fa.push(_0xdcf2ce.data.inviter);
                    } else {
                        console.log(_0xdcf2ce.errMsg);
                    }
                }
            } catch (_0x20dd9d) {
                $.logErr(_0x20dd9d, _0x3a9b97);
            } finally {
                _0x106c7d(_0xdcf2ce);
            }
        });
    });
}

async function _0x1fb504() {
    const _0x26a66d = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x190a15 = _0x26a66d,
        _0x5b9002 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x190a15,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x190a15 = await _0x5b531c(_0x5b9002) //: "functionId=inviteFissionReceive&body=" + _0x190a15 + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x190a15) {
        return;
    }

    return new Promise(async _0x1edc02 => {
        $.post(_0x2021c9(_0x190a15), async (_0x31bc13, _0x17624a, _0x202408) => {
            try {
                if (_0x31bc13) {
                    console.log("" + JSON.stringify(_0x31bc13));
                    console.log("receive请求失败，请检查网路重试");
                } else {
                    _0x202408 = JSON.parse(_0x202408);

                    if (_0x202408.code == 0) {
                        $.log("------提现金：" + _0x202408.data.amount);
                    } else {
                        $.txj = false;
                    }
                }
            } catch (_0x15d1a5) {
                $.logErr(_0x15d1a5, _0x17624a);
            } finally {
                _0x1edc02(_0x202408);
            }
        });
    });
}

async function _0x26668c(_0x22ead0) {
    const _0x225a48 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x136e5a = _0x225a48,
        _0x477851 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x136e5a,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x136e5a = await _0x5821b7.getbody(_0x477851);

    if (!_0x136e5a) {
        return;
    }

    return new Promise(async _0x22066f => {
        $.post(_0x2021c9(_0x136e5a), async (_0x117509, _0x320a7b, _0x3793bc) => {
            try {
                if (_0x117509) {
                    console.log("" + JSON.stringify(_0x117509));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0x3793bc = JSON.parse(_0x3793bc);

                    if (_0x3793bc.code == 0) {
                        const _0x4fbdf4 = _0x3793bc.data.prizeType;

                        if (!_0x4fbdf4) {
                            fail++;
                        }

                        switch (_0x4fbdf4) {
                            case 1:
                                console.log("第" + _0x22ead0 + "次抽奖结果：垃圾卷 😤");
                                $.fail++;
                                break;

                            case 4:
                                let _0x148d72 = parseFloat(_0x3793bc.data.prizeValue).toFixed(2);

                                console.log("第" + _0x22ead0 + "次抽奖结果：" + _0x148d72 + "现金 💰️");

                                _0x367c59.push(_0x148d72);

                                const _0xe8c531 = {
                                    "prizeValue": _0x3793bc.data.prizeValue,
                                    "id": _0x3793bc.data.id,
                                    "poolBaseId": _0x3793bc.data.poolBaseId,
                                    "prizeGroupId": _0x3793bc.data.prizeGroupId,
                                    "prizeBaseId": _0x3793bc.data.prizeBaseId
                                };

                                _0x1f643a.push(_0xe8c531);

                                $.fail = 0;
                                break;

                            case 2:
                                let _0x4d63f2 = parseFloat(_0x3793bc.data.prizeValue).toFixed(2);

                                console.log("第" + _0x22ead0 + "次抽奖结果：" + _0x4d63f2 + "红包 🧧");

                                _0x34bad3.push(_0x4d63f2);

                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(_0x3793bc.data));
                        }
                    } else {
                        if (_0x3793bc.errMsg.includes("火爆")) {
                            console.log("第" + _0x22ead0 + "次抽奖结果：未中奖！");
                        } else {
                            _0x3793bc.errMsg.includes("结束") ? ($.end = true, console.log(_0x3793bc.errMsg)) : console.log(_0x3793bc.errMsg);
                        }
                    }
                }
            } catch (_0x57453c) {
                $.logErr(_0x57453c, _0x320a7b);
            } finally {
                _0x22066f(_0x3793bc);
            }
        });
    });
}

async function _0x531db7(_0x2618d1) {
    const _0x3975f6 = {
        "pageNum": _0x2618d1,
        "pageSize": 100,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    };
    let _0x521e7f = _0x3975f6,
        _0x53cd94 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x521e7f,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x521e7f = await _0x5821b7.getbody(_0x53cd94);

    if (!_0x521e7f) {
        return;
    }

    return new Promise(async _0x18ea1a => {
        $.get(_0x2021c9(_0x521e7f), async (_0x1e930c, _0x36f6d9, _0x2ef072) => {
            try {
                if (_0x1e930c) {
                    console.log("" + JSON.stringify(_0x1e930c));
                    console.log(" API请求失败，请检查网路重试");
                } else {
                    _0x2ef072 = JSON.parse(_0x2ef072);
                    _0x2ef072.code == 0 ? $.baglist = _0x2ef072.data.items : console.log(_0x2ef072.errMsg);
                }
            } catch (_0x1231dc) {
                $.logErr(_0x1231dc, _0x36f6d9);
            } finally {
                _0x18ea1a(_0x2ef072);
            }
        });
    });
}

async function _0x6c1a01(_0x491f92) {
    const _0x19ea71 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "isJdApp": true,
        "inviter": _0x491f92
    };
    let _0x24c8e8 = _0x19ea71,
        _0x368fde = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x24c8e8,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x24c8e8 = await _0x5821b7.getbody(_0x368fde);

    if (!_0x24c8e8) {
        return;
    }

    return new Promise(async _0x5bdd44 => {
        $.dpost(_0x2021c9(_0x24c8e8), async (_0x15a913, _0x2f307b, _0x474bd1) => {
            try {
                if (_0x15a913) {
                    console.log("" + JSON.stringify(_0x15a913));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0x474bd1 = JSON.parse(_0x474bd1);

                    if (_0x474bd1.code == 0) {
                        if (!_0x474bd1.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x474bd1.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x474bd1.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x474bd1.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x474bd1.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x474bd1.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            if (_0x474bd1.data.helpResult == 8) {
                                                $.log("结果：TA未开启新的一轮 💤");
                                            } else {
                                                console.log(JSON.stringify(_0x474bd1));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x474bd1.errMsg);
                    }
                }
            } catch (_0x2a39ee) {
                $.logErr(_0x2a39ee, _0x2f307b);
            } finally {
                _0x5bdd44(_0x474bd1);
            }
        });
    });
}

async function _0x4f4ec6(_0x2755e3) {
    let _0x2dde9f = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x2755e3.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x2755e3.poolBaseId + ",\"prizeGroupId\":" + _0x2755e3.prizeGroupId + ",\"prizeBaseId\":" + _0x2755e3.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0xbbfecc => {
        $.post(_0x2021c9(_0x2dde9f), async (_0x5e139b, _0xc35d96, _0x3bb375) => {
            try {
                if (_0x5e139b) {
                    console.log("" + JSON.stringify(_0x5e139b));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                } else {
                    _0x3bb375 = JSON.parse(_0x3bb375);

                    if (_0x3bb375.code == 0) {
                        if (_0x3bb375.data.message.indexOf("提现") > -1) {
                            process.stdout.write("✅ ");
                            $.txfail = false;
                        } else {
                            if (_0x3bb375.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x3bb375.data.message.includes("待发放") ? (process.stdout.write("❎"), $.txfail = true) : console.log(_0x3bb375.data.message);
                            }
                        }
                    } else {
                        console.log(_0x3bb375.errMsg);
                    }
                }
            } catch (_0x2f3d5c) {
                $.logErr(_0x2f3d5c, _0xc35d96);
            } finally {
                _0xbbfecc(_0x3bb375);
            }
        });
    });
}

function _0x200cd4(_0x5df9ed) {
    let _0x2be870 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x5df9ed.id + ",\"business\":\"fission\",\"poolId\":" + _0x5df9ed.poolBaseId + ",\"prizeGroupId\":" + _0x5df9ed.prizeGroupId + ",\"prizeId\":" + _0x5df9ed.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x1d4c47 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x42d5d9
    };
    const _0x4c1b95 = {
        "url": "https://api.m.jd.com/api",
        "body": _0x2be870,
        "headers": _0x1d4c47
    };
    return new Promise(async _0xac82d4 => {
        $.post(_0x4c1b95, async (_0x247fab, _0x52711c, _0x3e4480) => {
            try {
                if (_0x247fab) {
                    console.log("" + JSON.stringify(_0x247fab));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                } else {
                    _0x3e4480 = JSON.parse(_0x3e4480);

                    if (_0x3e4480.code == 0) {
                        _0x3e4480.data.resCode === "0" ? process.stdout.write("🧧 ") : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x3e4480.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3e4480.errMsg);
                    }
                }
            } catch (_0x5908f3) {
                $.logErr(_0x5908f3, _0x52711c);
            } finally {
                _0xac82d4(_0x3e4480);
            }
        });
    });
}

function _0x2021c9(_0x55664e) {
    const _0x111295 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x42d5d9
    };
    const _0x5aa101 = {
        "url": "https://api.m.jd.com/?" + _0x55664e,
        "headers": _0x111295
    };
    return _0x5aa101;
}

function _0x5d1f66() {
    return new Promise(_0x22203c => {
        const _0x4469f9 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {},
            "timeout": 10000
        };
        _0x4469f9.headers.Cookie = _0x42d5d9;
        _0x4469f9.headers.referer = "https://h5.m.jd.com/";
        _0x4469f9.headers["User-Agent"] = $.UA;
        $.get(_0x4469f9, (_0x2ce6cb, _0x434c62, _0x3bab80) => {
            try {
                if (_0x3bab80) {
                    _0x3bab80 = JSON.parse(_0x3bab80);

                    if (!(_0x3bab80.islogin === "1")) {
                        _0x3bab80.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x85fe6d) {
                console.log(_0x85fe6d);
            } finally {
                _0x22203c();
            }
        });
    });
}

function _0x2c51b5() {
    return new Promise(_0x4d2502 => {
        $.log("京东账号" + $.index + $.nickName + "\n" + _0x393ee7);

        _0x4d2502();
    });
}

function _0x23b7b6(_0x1009d3) {
    try {
        if (typeof JSON.parse(_0x1009d3) == "object") {
            return true;
        }
    } catch (_0x4fad33) {
        console.log(_0x4fad33);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x1cc24c() {
    const _0x559bd4 = {
        "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jd50cxj",
        "timeout": 30000
    };
    return new Promise(_0x442700 => {
        $.get(_0x559bd4, async (_0x82738a, _0x1dac68, _0x342cc7) => {
            try {
                if (_0x82738a) {
                    console.log("\n服务连接失败，终止执行！");
                    process.exit(111);
                } else {
                    if (_0x342cc7) {
                        _0x342cc7 = JSON.parse(_0x342cc7);

                        if (_0x342cc7.code === 200) {
                            _0x564ab6 = _0x342cc7.data;
                        }
                    }
                }
            } catch (_0x11e85e) {
                $.logErr(_0x11e85e, _0x1dac68);
            } finally {
                _0x442700(_0x564ab6);
            }
        });
    });
}

function _0x5acf93(_0x18c910) {
    const _0x18c33e = _0x18c910.getFullYear(),
        _0x4c0e80 = ("0" + (_0x18c910.getMonth() + 1)).slice(-2),
        _0x5ddbde = ("0" + _0x18c910.getDate()).slice(-2),
        _0x5949dd = ("0" + _0x18c910.getHours()).slice(-2),
        _0x28650d = ("0" + _0x18c910.getMinutes()).slice(-2),
        _0x282dd0 = ("0" + _0x18c910.getSeconds()).slice(-2);

    return _0x18c33e + "/" + _0x4c0e80 + "/" + _0x5ddbde + " " + _0x5949dd + ":" + _0x28650d + ":" + _0x282dd0;
}

function _0x564faf(_0x313d37) {
    if (typeof _0x313d37 == "string") {
        try {
            return JSON.parse(_0x313d37);
        } catch (_0xc85007) {
            console.log(_0xc85007);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x5b531c(_0x1a3a14) {
    const _0x1c9d6e = {
        "Content-Type": "application/json"
    };
    let _0x6873f = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0x1a3a14),
        "headers": _0x1c9d6e,
        "timeout": 10000
    },
        _0x504a0e = "";
    return new Promise(_0x2db781 => {
        $.post(_0x6873f, (_0x4f0c0c, _0x32fd32, _0x4466fc) => {
            try {
                _0x4f0c0c ? console.log("连接失败") : (_0x4466fc = JSON.parse(_0x4466fc), _0x4466fc.code == 200 ? _0x504a0e = _0x4466fc.data : $.log(_0x4466fc.msg));
            } catch (_0x1103d0) {
                console.log(_0x1103d0, _0x32fd32);
            } finally {
                _0x2db781(_0x504a0e);
            }
        });
    });
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }