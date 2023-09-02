/*
京喜特价抽现金
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头，不指定默认CK1， 变量JXCTOPPIN='jdpin'
多少助力换下一个车头，默认9999次 ，可调整变量 JXCXJNUM='100'
运行一次抽奖次数,默认抽完，控制变量 JXCXJLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JXCXJDELAY='3'
开启提现到上限转红包 JXCXJTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_cxjhelp.js
updatetime:2023/9/1 
 */

const $ = new Env('JX特价抽现金');
const _0xb0bd33 = $.isNode() ? require("./sendNotify") : "",
    _0x437807 = $.isNode() ? require("./jdCookie.js") : "",
    _0x35a9ae = require("./function/dylanz"),
    _0x476e29 = require("./USER_AGENTS");

let _0x56b8da = true,
    _0x3dc938 = [],
    _0xc47e49 = [],
    _0x553b55 = [],
    _0x53f2f9 = [],
    _0x3086ae,
    _0x3bc8d6 = [],
    _0x4ebaed = "",
    _0x439175 = "",
    _0x4fa7fd = "",
    _0x442034,
    _0x547f9a = process.env.JXCXJNUM || "9999",
    _0x33f2f3 = process.env.JXCXJLTNUM || "-1",
    _0x4c7a19 = process.env.JXCXJDELAY || "1",
    _0x297e29 = process.env.JXCXJTORED || false,
    _0x46ec66 = process.env.JXCTOPPIN || "",
    _0x3a4b5e = process.env.TXSILENT || false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x3086ae = require("./function/proxy.js");
        $.dget = _0x3086ae.intoRequest($.get.bind($), true);
        $.dpost = _0x3086ae.intoRequest($.post.bind($), true);
    } catch {
        $.log("未安装https-proxy-agent依赖，无法启用代理");
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
}

if ($.isNode()) {
    Object.keys(_0x437807).forEach(_0x3f7b48 => {
        _0x3bc8d6.push(_0x437807[_0x3f7b48]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x3bc8d6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4f43fa($.getdata("CookiesJD") || "[]").map(_0x5c6a4f => _0x5c6a4f.cookie)].filter(_0x1ad2dd => !!_0x1ad2dd);
}

!(async () => {
    if (!_0x3bc8d6[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：4.2.0 可启用代理");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("问题建议：https://t.me/dylan_jdpro");

    // let _0x33160a = await _0x279e13();

    if (_0x46ec66) {
        console.log("\n已指定PIN：" + _0x46ec66);

        let _0x5f1a10 = _0x3bc8d6.findIndex(_0x44d75a => _0x44d75a.includes(encodeURIComponent(_0x46ec66)));

        _0x5f1a10 == -1 && (console.log("运行的CK中没找到指定的PIN，CK1为车头"), _0x5f1a10 = 0);
        _0x4ebaed = _0x3bc8d6[_0x5f1a10];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x4ebaed = _0x3bc8d6[0];
    }

    $.UserName = decodeURIComponent(_0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x476e29.UARAM ? _0x476e29.UARAM(1) : _0x476e29.USER_AGENT;
    console.log("\n——————————————车头开团—————————————— \n");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x4d446a();

    if (!$.isLogin) {
        const _0x105d3f = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x105d3f);
        $.isNode() && (await _0xb0bd33.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x169639(1);
    await $.wait(1000);

    // if (_0x33160a.length != 0) {
    //     let _0x2e61f4 = _0x33160a[Math.floor(Math.random() * _0x33160a.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x476e29.UARAM ? _0x476e29.UARAM(1) : _0x476e29.USER_AGENT;
    //     await _0x131e65(_0x2e61f4);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————");
    console.log("\n\n开始助力车头...");
    _0x442034 = 0;

    for (let _0x17720d of _0x3dc938) {
        if (_0x3bc8d6.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x17720d);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x20c4a0 = _0x442034; _0x20c4a0 < _0x3bc8d6.length; _0x20c4a0++) {
            if (_0x3bc8d6[_0x20c4a0]) {
                _0x4ebaed = _0x3bc8d6[_0x20c4a0];
                $.UserName = decodeURIComponent(_0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x20c4a0 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x476e29.UARAM ? _0x476e29.UARAM(1) : _0x476e29.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x131e65(_0x17720d);

                if ($.suc > Number(_0x547f9a) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x442034 = _0x20c4a0 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x3bc8d6.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n开始抽奖和提现...");
    _0x33f2f3 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x33f2f3);

    let _0x55d9e5 = new Date();

    _0x55d9e5.setDate(_0x55d9e5.getDate() - 1);

    for (let _0x36d98f = 0; _0x36d98f < _0x3bc8d6.length; _0x36d98f++) {
        if (_0x3bc8d6[_0x36d98f]) {
            _0x4ebaed = _0x3bc8d6[_0x36d98f];
            $.UserName = decodeURIComponent(_0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4ebaed.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x36d98f + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0xc47e49 = [];
            _0x553b55 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.toredfailnum = 0;
            $.UA = _0x476e29.UARAM ? _0x476e29.UARAM(1) : _0x476e29.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x3be3ee = await _0x169639(0);

            if (_0x3be3ee.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x3be3ee.data.drawPrizeNum);
            $.log("当前剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x1a7c20(new Date(Date.now() + _0x3be3ee.data.countDownTime)) + "\n");

            for (let _0x276a1c = 0; _0x276a1c < (_0x33f2f3 > -1 && _0x33f2f3 < $.times ? _0x33f2f3 : $.times); _0x276a1c++) {
                await _0x349b40(_0x276a1c + 1);

                if ($.end) {
                    break;
                }

                await $.wait(Math.random() * 500 + _0x4c7a19 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x553b55.length !== 0 && $.log("\n本次抽奖获得红包总计：" + _0x553b55.reduce((_0x2901de, _0x5e388a) => _0x2901de + _0x5e388a * 100, 0) / 100 + "元");
            _0xc47e49.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0xc47e49.reduce((_0x1b58e2, _0x2f27e5) => _0x1b58e2 + _0x2f27e5 * 100, 0) / 100 + "元");

            if (new Date().getHours() < 7 && _0x3a4b5e) {
                continue;
            }

            $.log("\n开始提现(遍历奖励列表)...");
            _0x297e29 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");

            for (let _0x5ab438 = 0; _0x5ab438 < 50; _0x5ab438++) {
                if ($.nocashnum > 2 || $.toredfailnum > 4) {
                    break;
                }

                if ($.txfull && !_0x297e29) {
                    $.log("\n本月提现到上限!如转红包请设置变量");
                    break;
                }

                await _0x495671(_0x5ab438 + 1);
                await $.wait(1000);

                if (!$.baglist || $.baglist.length === 0) {
                    break;
                }

                for (let _0x2e7002 of $.baglist) {
                    if (new Date(_0x2e7002.createTime) < _0x55d9e5 || $.toredfailnum > 4) {
                        $.nocashnum = 5;
                        break;
                    }

                    if (_0x2e7002.prizeType == 4) {
                        if (_0x2e7002.state == 0 || _0x2e7002.state == 2) {
                            process.stdout.write("" + Number(_0x2e7002.amount));

                            let _0x5f302d = await _0x2719a5(_0x2e7002);

                            $.txfail && (await $.wait(5000), _0x5f302d = await _0x2719a5(_0x2e7002));

                            if ($.txfull && !_0x297e29) {
                                break;
                            }

                            await $.wait(1000);

                            if (_0x5f302d.data.message.includes("上限") && _0x297e29 && $.toredfailnum < 5) {
                                await _0x2ed614(_0x2e7002);
                            }

                            await $.wait(4000);
                        } else {
                            _0x2e7002.state == 8;
                        }
                    }
                }
            }

            _0x53f2f9 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x5ae326 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5ae326 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x169639(_0x1f478e) {
    let _0x19ef2b = "functionId=inviteFissionHome&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x3869b8 => {
        $.post(_0x5f16af(_0x19ef2b), async (_0x2b0abe, _0x260558, _0x299481) => {
            try {
                if (_0x2b0abe) {
                    console.log("" + JSON.stringify(_0x2b0abe));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x299481 = JSON.parse(_0x299481);

                    if (_0x299481.code == 0) {
                        $.times = _0x299481.data.prizeNum;

                        if (_0x1f478e) {
                            console.log("助力码：" + _0x299481.data.inviter);
                        }

                        _0x3dc938.push(_0x299481.data.inviter);
                    } else {
                        console.log(_0x299481.errMsg);
                    }
                }
            } catch (_0xb590bb) {
                $.logErr(_0xb590bb, _0x260558);
            } finally {
                _0x3869b8(_0x299481);
            }
        });
    });
}

async function _0xed37dd() {
    const _0x222b9b = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x1497bb = _0x222b9b,
        _0x8ed2aa = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x1497bb,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x1497bb = __filename.indexOf(false) > -1 ? await _0x1ff0e1(_0x8ed2aa) : "functionId=inviteFissionReceive&body=" + _0x1497bb + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();

    if (!_0x1497bb) {
        return;
    }

    return new Promise(async _0x133824 => {
        $.post(_0x5f16af(_0x1497bb), async (_0x25bb30, _0x42adc0, _0x3d7602) => {
            try {
                if (_0x25bb30) {
                    console.log("" + JSON.stringify(_0x25bb30));
                    console.log("receive请求失败，请检查网路重试");
                } else {
                    _0x3d7602 = JSON.parse(_0x3d7602);

                    if (_0x3d7602.code == 0) {
                        $.log("------提现金：" + _0x3d7602.data.amount);
                    } else {
                        $.txj = false;
                    }
                }
            } catch (_0x2b0198) {
                $.logErr(_0x2b0198, _0x42adc0);
            } finally {
                _0x133824(_0x3d7602);
            }
        });
    });
}

async function _0x349b40(_0x4bf8d1) {
    const _0x57e97e = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x42fecf = _0x57e97e,
        _0x407572 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x42fecf,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x42fecf = await _0x35a9ae.getbody(_0x407572);

    if (!_0x42fecf) {
        return;
    }

    return new Promise(async _0x1b5ad5 => {
        $.post(_0x5f16af(_0x42fecf), async (_0x4e72c5, _0x508f22, _0xaa1e46) => {
            try {
                if (_0x4e72c5) {
                    console.log("" + JSON.stringify(_0x4e72c5));
                    console.log("lottery请求失败，请检查网路重试");
                } else {
                    _0xaa1e46 = JSON.parse(_0xaa1e46);

                    if (_0xaa1e46.code == 0) {
                        const _0x5bcde4 = _0xaa1e46.data.prizeType;

                        if (!_0x5bcde4) {
                            fail++;
                        }

                        switch (_0x5bcde4) {
                            case 1:
                                console.log("第" + _0x4bf8d1 + "次抽奖结果：垃圾卷 😤");
                                $.fail++;
                                break;

                            case 6:
                                console.log("第" + _0x4bf8d1 + "次抽奖结果：京喜礼包 💩");
                                break;

                            case 4:
                                let _0x2ed697 = parseFloat(_0xaa1e46.data.prizeValue).toFixed(2);

                                console.log("第" + _0x4bf8d1 + "次抽奖结果：" + _0x2ed697 + "现金 💰️");

                                _0xc47e49.push(_0x2ed697);

                                const _0x467a39 = {
                                    "prizeValue": _0xaa1e46.data.prizeValue,
                                    "id": _0xaa1e46.data.id,
                                    "poolBaseId": _0xaa1e46.data.poolBaseId,
                                    "prizeGroupId": _0xaa1e46.data.prizeGroupId,
                                    "prizeBaseId": _0xaa1e46.data.prizeBaseId
                                };

                                _0x53f2f9.push(_0x467a39);

                                $.fail = 0;
                                break;

                            case 2:
                                let _0x16c590 = parseFloat(_0xaa1e46.data.prizeValue).toFixed(2);

                                console.log("第" + _0x4bf8d1 + "次抽奖结果：" + _0x16c590 + "红包 🧧");

                                _0x553b55.push(_0x16c590);

                                $.fail = 0;
                                break;

                            default:
                                console.log(JSON.stringify(_0xaa1e46.data));
                        }
                    } else {
                        if (_0xaa1e46.errMsg.includes("火爆")) {
                            console.log("第" + _0x4bf8d1 + "次抽奖结果：未中奖！");
                        } else {
                            if (_0xaa1e46.errMsg.includes("结束")) {
                                $.end = true;
                                console.log(_0xaa1e46.errMsg);
                            } else {
                                console.log(_0xaa1e46.errMsg);
                            }
                        }
                    }
                }
            } catch (_0xd2827d) {
                $.logErr(_0xd2827d, _0x508f22);
            } finally {
                _0x1b5ad5(_0xaa1e46);
            }
        });
    });
}

async function _0x495671(_0x51cbed) {
    const _0x4f76ad = {
        "pageNum": _0x51cbed,
        "pageSize": 100,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    };
    let _0x38583f = _0x4f76ad,
        _0x49542d = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x38583f,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x38583f = await _0x35a9ae.getbody(_0x49542d);

    if (!_0x38583f) {
        return;
    }

    return new Promise(async _0x3f8995 => {
        $.get(_0x5f16af(_0x38583f), async (_0x4ecc93, _0x43d603, _0x50c703) => {
            try {
                _0x4ecc93 ? (console.log("" + JSON.stringify(_0x4ecc93)), console.log(" API请求失败，请检查网路重试")) : (_0x50c703 = JSON.parse(_0x50c703), _0x50c703.code == 0 ? $.baglist = _0x50c703.data.items : console.log(_0x50c703.errMsg));
            } catch (_0x9fd9ee) {
                $.logErr(_0x9fd9ee, _0x43d603);
            } finally {
                _0x3f8995(_0x50c703);
            }
        });
    });
}

async function _0x131e65(_0x2b55aa) {
    const _0xb3c40c = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "isJdApp": true,
        "inviter": _0x2b55aa
    };
    let _0x276675 = _0xb3c40c,
        _0x41ed59 = {
            "appId": "02f8d",
            "fn": "inviteFissionBeforeHome",
            "body": _0x276675,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x276675 = await _0x35a9ae.getbody(_0x41ed59);

    if (!_0x276675) {
        return;
    }

    return new Promise(async _0x586142 => {
        $.dpost(_0x5f16af(_0x276675), async (_0x43b488, _0xbf8622, _0x2e6ed1) => {
            try {
                if (_0x43b488) {
                    console.log("" + JSON.stringify(_0x43b488));
                    console.log("help请求失败，请检查网路重试");
                } else {
                    _0x2e6ed1 = JSON.parse(_0x2e6ed1);

                    if (_0x2e6ed1.code == 0) {
                        if (!_0x2e6ed1.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x2e6ed1.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x2e6ed1.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x2e6ed1.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x2e6ed1.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x2e6ed1.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x2e6ed1.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x2e6ed1));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x2e6ed1.errMsg);
                    }
                }
            } catch (_0x5c3c87) {
                $.logErr(_0x5c3c87, _0xbf8622);
            } finally {
                _0x586142(_0x2e6ed1);
            }
        });
    });
}

async function _0x2719a5(_0x47477b) {
    let _0x5bc423 = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x47477b.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x47477b.poolBaseId + ",\"prizeGroupId\":" + _0x47477b.prizeGroupId + ",\"prizeBaseId\":" + _0x47477b.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x3c5520 => {
        $.post(_0x5f16af(_0x5bc423), async (_0x326058, _0x3c8a43, _0x5b764d) => {
            try {
                if (_0x326058) {
                    console.log("" + JSON.stringify(_0x326058));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                } else {
                    _0x5b764d = JSON.parse(_0x5b764d);

                    if (_0x5b764d.code == 0) {
                        if (_0x5b764d.data.message.indexOf("提现") > -1) {
                            process.stdout.write("✅ ");
                            $.txfail = false;
                        } else {
                            if (_0x5b764d.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x5b764d.data.message.includes("待发放") ? (process.stdout.write("❎"), $.txfail = true) : console.log(_0x5b764d.data.message);
                            }
                        }
                    } else {
                        console.log(_0x5b764d.errMsg);
                    }
                }
            } catch (_0xad2a76) {
                $.logErr(_0xad2a76, _0x3c8a43);
            } finally {
                _0x3c5520(_0x5b764d);
            }
        });
    });
}

async function _0x2ed614(_0x4bacd0) {
    let _0xf8b536 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x4bacd0.id + ",\"business\":\"fission\",\"poolId\":" + _0x4bacd0.poolBaseId + ",\"prizeGroupId\":" + _0x4bacd0.prizeGroupId + ",\"prizeId\":" + _0x4bacd0.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x5c4831 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x4ebaed
    };
    const _0x433637 = {
        "url": "https://api.m.jd.com/api",
        "body": _0xf8b536,
        "headers": _0x5c4831
    };
    return new Promise(async _0x1ee8eb => {
        $.post(_0x433637, async (_0x2ec2d2, _0x1f28c2, _0x2ad181) => {
            try {
                if (_0x2ec2d2) {
                    console.log("" + JSON.stringify(_0x2ec2d2));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                } else {
                    _0x2ad181 = JSON.parse(_0x2ad181);

                    if (_0x2ad181.code == 0) {
                        _0x2ad181.data.resCode === "0" ? process.stdout.write("🧧 ") : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        if (_0x2ad181.errMsg === "失败") {
                            process.stdout.write("❎ ");
                            $.toredfailnum++;
                        } else {
                            console.log(_0x2ad181.errMsg);
                        }
                    }
                }
            } catch (_0x152d29) {
                $.logErr(_0x152d29, _0x1f28c2);
            } finally {
                _0x1ee8eb(_0x2ad181);
            }
        });
    });
}

function _0x5f16af(_0x1318c5) {
    const _0x98c828 = {
        "Host": "api.m.jd.com",
        "Origin": "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "Cookie": _0x4ebaed
    };
    const _0x498200 = {
        "url": "https://api.m.jd.com/?" + _0x1318c5,
        "headers": _0x98c828
    };
    return _0x498200;
}

function _0x4d446a() {
    return new Promise(_0xbe0179 => {
        const _0x4476ca = {
            "Cookie": _0x4ebaed,
            "referer": "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x34155d = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": _0x4476ca,
            "timeout": 10000
        };
        $.get(_0x34155d, (_0x555cca, _0x585aa8, _0x4a2f86) => {
            try {
                if (_0x4a2f86) {
                    _0x4a2f86 = JSON.parse(_0x4a2f86);

                    if (!(_0x4a2f86.islogin === "1")) {
                        _0x4a2f86.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x487fa8) {
                console.log(_0x487fa8);
            } finally {
                _0xbe0179();
            }
        });
    });
}

function _0x36f6e2() {
    return new Promise(_0x12fa7e => {
        !_0x56b8da ? $.msg($.name, "", "" + _0x439175) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x439175);

        _0x12fa7e();
    });
}

function _0x5ca8e4(_0x5ddff1) {
    try {
        if (typeof JSON.parse(_0x5ddff1) == "object") {
            return true;
        }
    } catch (_0x422e43) {
        console.log(_0x422e43);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x4f43fa(_0x51aea0) {
    if (typeof _0x51aea0 == "string") {
        try {
            return JSON.parse(_0x51aea0);
        } catch (_0x1aa09e) {
            console.log(_0x1aa09e);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x1a7c20(_0x36d5d6) {
    const _0x5b32c9 = _0x36d5d6.getFullYear(),
        _0x3f125f = ("0" + (_0x36d5d6.getMonth() + 1)).slice(-2),
        _0x37dfdc = ("0" + _0x36d5d6.getDate()).slice(-2),
        _0x4370b0 = ("0" + _0x36d5d6.getHours()).slice(-2),
        _0x198645 = ("0" + _0x36d5d6.getMinutes()).slice(-2),
        _0x5b0fda = ("0" + _0x36d5d6.getSeconds()).slice(-2);

    return _0x5b32c9 + "/" + _0x3f125f + "/" + _0x37dfdc + " " + _0x4370b0 + ":" + _0x198645 + ":" + _0x5b0fda;
}

function _0x1ff0e1(_0xafa806) {
    const _0x1ee0f7 = {
        "Content-Type": "application/json"
    };
    let _0x324e41 = {
        "url": "http://123.57.164.4:8080/cxj",
        "body": JSON.stringify(_0xafa806),
        "headers": _0x1ee0f7,
        "timeout": 10000
    },
        _0x1f7c39 = "";
    return new Promise(_0x341106 => {
        $.post(_0x324e41, (_0x2f08ae, _0x1a7f16, _0x330874) => {
            try {
                _0x2f08ae ? console.log("连接失败") : (_0x330874 = JSON.parse(_0x330874), _0x330874.code == 200 ? _0x1f7c39 = _0x330874.data : $.log(_0x330874.msg));
            } catch (_0x9a592a) {
                console.log(_0x9a592a, _0x1a7f16);
            } finally {
                _0x341106(_0x1f7c39);
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }