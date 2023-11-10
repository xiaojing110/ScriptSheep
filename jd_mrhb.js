
/*
每日红包（入口：主页-秒杀）
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头，不指定默认CK1， 变量 MRHBTOPPIN='jdpin'
多少助力停止，默认9999个 ，控制变量 MRHBNUM='100';
运行一次抽奖次数,默认抽完，控制变量 MRHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 MRHBDELAY='3'
开启提现到上限转红包 MRHBTORED='true'
代理变量DY_PROXY='https://api'，支持类星空的api 
不提现变量 NOTX='true' 默认提现
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_mrhb.js
 */

const $ = new Env('Jd每日红包');
const _0x567cf7 = $.isNode() ? require("./sendNotify") : "",
    _0x42ab61 = $.isNode() ? require("./jdCookie.js") : "",
    _0x5892ea = require("./function/dylanz"),
    _0x47f628 = require("./USER_AGENTS");

let _0x4f2a7 = true,
    _0x551517 = [],
    _0x1c73a1 = [],
    _0x454884 = [],
    _0x36c1c3 = [],
    _0x54caa8,
    _0x4a589a = [],
    _0x4f3117 = "",
    _0x5d5b98 = "",
    _0x522bd2 = "",
    _0x5e1cf0 = "",
    _0x5a9e61;

const _0x377851 = process.env.MRHBNUM || "9999",
    _0x576c34 = process.env.MRHBLTNUM || "-1",
    _0x42b5dd = process.env.MRHBDELAY || "1",
    _0x373e49 = process.env.TXDELAY || "5",
    _0x492595 = process.env.MRHBTORED || false,
    _0x3abc4f = process.env.MRHBTOPPIN || "",
    _0x5b53f7 = process.env.TXSILENT || false,
    _0x5c359d = process.env.MRHBCODE || "",
    _0x55fdb0 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x54caa8 = require("./function/proxy.js");
        $.dget = _0x54caa8.intoRequest($.get.bind($));
        $.dpost = _0x54caa8.intoRequest($.post.bind($));
    } catch {
        $.log("未安装https-proxy-agent依赖，无法启用代理");
        $.dget = $.get;
        $.dpost = $.post;
    }
} else {
    $.dpost = $.post;
    $.dget = $.get;
}

if ($.isNode()) {
    Object.keys(_0x42ab61).forEach(_0x26fd5f => {
        _0x4a589a.push(_0x42ab61[_0x26fd5f]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x4a589a = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x240192($.getdata("CookiesJD") || "[]").map(_0x2dc726 => _0x2dc726.cookie)].filter(_0x58eaf2 => !!_0x58eaf2);
}

$.banip = false;
!(async () => {
    if (!_0x4a589a[0]) {
        const _0x3bbd34 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x3bbd34);
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231103 ");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  指定PIN车头，不指定默认CK1  MRHBTOPPIN='jdpin'\n  指定助力CODE，都去助力TA  MRHBCODE='xxx'\n  多少助力停止，默认9999个  MRHBNUM='100'\n  运行一次抽奖次数,默认抽完  MRHBLTNUM='200'\n  每次抽奖间隔，默认1秒  MRHBDELAY='3'\n  提现间隔，单位秒  TXDELAY='3'\n  开启提现到上限转红包  MRHBTORED='true'\n  使用代理API  DY_PROXY='https://api'\n  关闭提现  NOTX='true'\n");

    // let _0x485eb4 = await _0x169dc0();

    if (_0x3abc4f) {
        console.log("\n已指定PIN：" + _0x3abc4f);

        let _0x3dd08b = _0x4a589a.findIndex(_0x56b5d0 => _0x56b5d0.includes(_0x3abc4f));

        if (_0x3dd08b == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x5d5b98 = _0x4a589a[_0x3dd08b];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x5d5b98 = _0x4a589a[0];
    }

    _0x4f3117 = _0x5d5b98;
    $.UserName = decodeURIComponent(_0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x47f628.UARAM ? _0x47f628.UARAM() : _0x47f628.USER_AGENT;
    console.log("\n————————————————————车头开团————————————————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x15dc54();

    if (!$.isLogin) {
        const _0x5d6c26 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x5d6c26);

        if ($.isNode()) {
            await _0x567cf7.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie");
        }

        return;
    }

    await _0x2f9208(1);
    await $.wait(1000);

    // if (_0x485eb4.length != 0) {
    //     let _0x41c4d2 = _0x485eb4[Math.floor(Math.random() * _0x485eb4.length)];

    //     console.log("车头去助力 -> 作者");
    //     $.UserName = decodeURIComponent(_0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    //     $.UA = _0x47f628.UARAM ? _0x47f628.UARAM() : _0x47f628.USER_AGENT;
    //     await _0x4ec33a(_0x41c4d2);
    //     await $.wait(2000);
    // }

    console.log("————————————————————————————————————————————————————");
    console.log("\n\n———————————————————开始助力车头—————————————————————");
    _0x5c359d && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x551517 = [], _0x551517.push(_0x5c359d));
    _0x5a9e61 = 0;

    for (let _0x5ddbc2 of _0x551517) {
        if ($.banip) {
            break;
        }

        if (_0x4a589a.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x5ddbc2);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x2fa4b7 = _0x5a9e61; _0x2fa4b7 < _0x4a589a.length; _0x2fa4b7++) {
            if (_0x4a589a[_0x2fa4b7]) {
                _0x4f3117 = _0x4a589a[_0x2fa4b7];
                $.UserName = decodeURIComponent(_0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x2fa4b7 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x47f628.UARAM ? _0x47f628.UARAM() : _0x47f628.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x4ec33a(_0x5ddbc2);

                if ($.suc > Number(_0x377851) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x5a9e61 = _0x2fa4b7 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x4a589a.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
    _0x576c34 > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x576c34);

    let _0x34df50 = new Date();

    _0x34df50.setDate(_0x34df50.getDate() - 1);

    _0x4f3117 = _0x5d5b98;
    $.UserName = decodeURIComponent(_0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f3117.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.fail = 0;
    _0x1c73a1 = [];
    _0x454884 = [];
    txjscore = [];
    $.txj = true;
    $.fg = 1;
    $.txfull = false;
    $.nocashnum = 0;
    $.end = false;
    $.hotflag = false;
    $.toredfailnum = 0;
    $.txjsuc = false;
    $.UA = _0x47f628.UARAM ? _0x47f628.UARAM() : _0x47f628.USER_AGENT;

    let _0x490829 = await _0x2f9208(0);

    if (_0x490829.code != "0") {
        return;
    }

    $.log("本轮已抽奖次数：" + _0x490829.data.drawPrizeNum);
    $.log("本轮剩余抽奖次数：" + $.times);

    if (_0x490829.data.cashVo) {
        if (_0x490829.data?.["cashVo"]?.["state"] === 1) {
            $.log("本轮提现金进度：" + _0x490829.data.cashVo.amount + "/" + _0x490829.data.cashVo.totalAmount + "(-" + _0x490829.data.cashVo.leftAmount + ")");
        } else {
            _0x490829.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x490829.data.cashVo.amount + "/" + _0x490829.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
        }
    } else {
        $.txj = false;
    }

    $.log("本轮结束时间： " + _0x40c1f2(new Date(Date.now() + _0x490829.data.countDownTime)));

    for (let _0x3f2d99 = 0; _0x3f2d99 < (_0x576c34 > -1 && _0x576c34 < $.times ? _0x576c34 : $.times); _0x3f2d99++) {
        if ($.banip) {
            break;
        }

        process.stdout.write("\n第" + (_0x3f2d99 + 1) + "次抽奖结果：");

        for (let _0x256472 of Array(3)) {
            await _0x22f661(_0x256472 + 1);

            if (!$.hotflag) {
                break;
            }

            await $.wait(Math.random() * 500 + _0x42b5dd * 1000);
        }

        if ($.end) {
            break;
        }

        $.txj && (await _0x25b3eb());
        await $.wait(Math.random() * 500 + _0x42b5dd * 1000);

        if ($.fail > 2 && $.txjsuc) {
            $.log("\n\n已达成，要什么垃圾券！！！");
            break;
        }
    }

    _0x454884.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x454884.reduce((_0x1f1180, _0x1724cb) => _0x1f1180 + _0x1724cb * 100, 0) / 100 + "元");
    _0x1c73a1.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x1c73a1.reduce((_0x2231e3, _0x37f741) => _0x2231e3 + _0x37f741 * 100, 0) / 100 + "元");

    if (txjscore.length !== 0) {
        let _0x1db8d5 = txjscore.reduce((_0x2cfd6b, _0x51cca8) => _0x2cfd6b + _0x51cca8 * 100, 0) / 100;

        $.log("\n\n本次抽奖获得提现金：" + _0x1db8d5 + "个, 平均" + (_0x1db8d5 / (_0x576c34 > -1 ? Math.min.apply(null, [_0x576c34, $.times]) : $.times)).toFixed(4) + "个/抽");
    }

    if (_0x55fdb0 != "true") {
        if (new Date().getHours() < 6 && _0x5b53f7) {
            return;
        }

        $.log("\n\n——————————开始提现（默认间隔5秒，变量TXDELAY）——————");
        _0x492595 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x15cd7c = 0; _0x15cd7c < 50; _0x15cd7c++) {
            if ($.nocashnum > 2 || $.toredfailnum > 4) {
                break;
            }

            if ($.txfull && !_0x492595) {
                $.log("\n本月提现到上限!如转红包请设置变量");
                break;
            }

            await _0x55094a(_0x15cd7c + 1);
            await $.wait(1000);

            if (!$.baglist || $.baglist.length === 0) {
                break;
            }

            for (let _0x46bf97 of $.baglist) {
                if (new Date(_0x46bf97.createTime) < _0x34df50 || $.toredfailnum > 4) {
                    $.nocashnum = 5;
                    break;
                }

                if (_0x46bf97.prizeType == 4) {
                    if (_0x46bf97.state == 0 || _0x46bf97.state == 2) {
                        process.stdout.write("" + Number(_0x46bf97.amount));

                        let _0x39efef = await _0x12850c(_0x46bf97, Number(_0x46bf97.amount));

                        $.txfail && (await $.wait(6000), _0x39efef = await _0x12850c(_0x46bf97, Number(_0x46bf97.amount)));

                        if ($.txfull && !_0x492595) {
                            break;
                        }

                        if (_0x39efef.data.message.includes("上限") && _0x492595 && $.toredfailnum < 5) {
                            await _0x49a944(_0x46bf97, Number(_0x46bf97.amount));
                        }

                        await $.wait(_0x373e49 * 1000);
                    } else {
                        _0x46bf97.state == 8;
                    }
                }
            }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x7a6103, _0x5e6e14) => _0x7a6103 + _0x5e6e14 * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x15618c, _0x42c43f) => _0x15618c + _0x42c43f * 100, 0) / 100 + "元");
    } else {
        $.log("\n\n⚠已设置不提现！");
    }

    _0x36c1c3 = [];
    await $.wait(2000);
})().catch(_0x75528c => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x75528c + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2f9208(_0x2ece43) {
    const _0x201f59 = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w",
        inviter: ""
    };
    let _0x35d3d6 = _0x201f59,
        _0x3e5be1 = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x35d3d6,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x35d3d6 = await _0x5892ea.getbody(_0x3e5be1);

    if (!_0x35d3d6) {
        return;
    }

    return new Promise(async _0x4362a2 => {
        $.dpost(_0x337513(_0x35d3d6), async (_0x42d25f, _0x524df0, _0x180377) => {
            try {
                if (_0x42d25f) {
                    console.log("" + JSON.stringify(_0x42d25f));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x180377 = JSON.parse(_0x180377);

                    if (_0x180377.code == 0) {
                        $.times = _0x180377.data.prizeNum;

                        if (_0x2ece43) {
                            console.log("我的助力码：" + _0x180377.data.inviter);
                        }

                        _0x551517.push(_0x180377.data.inviter);
                    } else {
                        console.log(_0x180377.errMsg);
                    }
                }
            } catch (_0x5158e8) {
                $.logErr(_0x5158e8, _0x524df0);
            } finally {
                _0x4362a2(_0x180377);
            }
        });
    });
}

async function _0x25b3eb() {
    const _0x29c732 = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w"
    };
    let _0x166eb0 = _0x29c732,
        _0x564b94 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x166eb0,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x166eb0 = await _0x5892ea.getbody(_0x564b94);

    if (!_0x166eb0) {
        return;
    }

    return new Promise(async _0x53882f => {
        $.dpost(_0x337513(_0x166eb0), async (_0x194d10, _0x1d5177, _0x2453f1) => {
            try {
                if (_0x194d10) {
                    console.log("" + JSON.stringify(_0x194d10));
                    console.log("receive请求失败，请检查网路重试");
                    _0x194d10.includes("403") && ($.banip = true);
                } else {
                    _0x2453f1 = JSON.parse(_0x2453f1);

                    if (_0x2453f1.code == 0) {
                        process.stdout.write("----提现金" + _0x2453f1.data.amount + "(+" + _0x2453f1.data.receiveList[0].amount + ")");
                        txjscore.push(_0x2453f1.data.receiveList[0].amount);
                        _0x2453f1.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
                    } else {
                        if (_0x2453f1.code == 80208) {
                            process.stdout.write("----送的抽奖次数没有提现金");
                        } else {
                            if (_0x2453f1.code == 80209) {
                                process.stdout.write("----完成标识");
                                $.txj = false;
                            } else {
                                console.log(JSON.stringify(_0x2453f1));
                            }
                        }
                    }
                }
            } catch (_0x2aec2e) {
                $.logErr(_0x2aec2e, _0x1d5177);
            } finally {
                _0x53882f(_0x2453f1);
            }
        });
    });
}

async function _0x22f661(_0x20eaf2) {
    const _0x199139 = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w"
    };
    let _0x3a3a76 = _0x199139,
        _0x47b332 = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x3a3a76,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x3a3a76 = await _0x5892ea.getbody(_0x47b332);

    if (!_0x3a3a76) {
        return;
    }

    return new Promise(async _0x1a1275 => {
        $.dpost(_0x337513(_0x3a3a76), async (_0x4b7988, _0x1d555d, _0x1e405a) => {
            try {
                if (_0x4b7988) {
                    console.log("" + JSON.stringify(_0x4b7988));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x4b7988.includes("403") && ($.banip = true);
                } else {
                    _0x1e405a = JSON.parse(_0x1e405a);

                    if (_0x1e405a.code == 0) {
                        const _0x525fb8 = _0x1e405a.data.prizeType;

                        if (!_0x525fb8) {
                            fail++;
                        }

                        switch (_0x525fb8) {
                            case 1:
                                process.stdout.write("垃.圾.券😤");
                                $.txjsuc && $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x211d35 = parseFloat(_0x1e405a.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x211d35 + "现金💰️");

                                _0x1c73a1.push(_0x211d35);

                                const _0x3dc8b4 = {
                                    prizeValue: _0x1e405a.data.prizeValue,
                                    id: _0x1e405a.data.id,
                                    poolBaseId: _0x1e405a.data.poolBaseId,
                                    prizeGroupId: _0x1e405a.data.prizeGroupId,
                                    prizeBaseId: _0x1e405a.data.prizeBaseId
                                };

                                _0x36c1c3.push(_0x3dc8b4);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x88e81f = parseFloat(_0x1e405a.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x88e81f + "红包🧧");

                                _0x454884.push(_0x88e81f);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x1e405a.data));
                        }
                    } else {
                        if (_0x1e405a.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x1e405a.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x1e405a.errMsg)) : ($.hotflag = false, console.log(_0x1e405a.errMsg));
                        }
                    }
                }
            } catch (_0x34311a) {
                $.logErr(_0x34311a, _0x1d555d);
            } finally {
                _0x1a1275(_0x1e405a);
            }
        });
    });
}

async function _0x55094a(_0x459069) {
    const _0x319f6a = {
        pageNum: _0x459069,
        pageSize: 100,
        linkId: "EcuVpjGGfccY3Ic_1ni83w",
        business: "fission"
    };
    let _0x160028 = _0x319f6a,
        _0x4b4e01 = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x160028,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x160028 = await _0x5892ea.getbody(_0x4b4e01);

    if (!_0x160028) {
        return;
    }

    return new Promise(async _0x5caf32 => {
        $.dget(_0x337513(_0x160028), async (_0xee581, _0x275066, _0x4dc028) => {
            try {
                _0xee581 ? (console.log("" + JSON.stringify(_0xee581)), console.log(" API请求失败，请检查网路重试"), _0xee581.includes("403") && ($.banip = true)) : (_0x4dc028 = JSON.parse(_0x4dc028), _0x4dc028.code == 0 ? $.baglist = _0x4dc028.data.items : console.log(_0x4dc028.errMsg));
            } catch (_0x4a3a83) {
                $.logErr(_0x4a3a83, _0x275066);
            } finally {
                _0x5caf32(_0x4dc028);
            }
        });
    });
}

async function _0x4ec33a(_0x3f90d4) {
    const _0x15dbfa = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w",
        isJdApp: true,
        inviter: _0x3f90d4
    };
    let _0x51f2e0 = _0x15dbfa,
        _0x5d5bb4 = {
            appId: "c5389",
            fn: "inviteFissionhelp",
            body: _0x51f2e0,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x51f2e0 = await _0x5892ea.getbody(_0x5d5bb4);

    if (!_0x51f2e0) {
        return;
    }

    return new Promise(async _0x4d224d => {
        $.dpost(_0x337513(_0x51f2e0), async (_0x320f1a, _0x177735, _0x3fad12) => {
            try {
                if (_0x320f1a) {
                    console.log("" + JSON.stringify(_0x320f1a));
                    console.log("help请求失败，请检查网路重试");
                    _0x320f1a.includes("403") && ($.banip = true);
                } else {
                    _0x3fad12 = JSON.parse(_0x3fad12);

                    if (_0x3fad12.code == 0) {
                        if (!_0x3fad12.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x3fad12.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x3fad12.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x3fad12.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x3fad12.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x3fad12.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x3fad12.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x3fad12));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x3fad12.errMsg);
                    }
                }
            } catch (_0x1bd2e0) {
                $.logErr(_0x1bd2e0, _0x177735);
            } finally {
                _0x4d224d(_0x3fad12);
            }
        });
    });
}

async function _0x12850c(_0x42c714, _0x3f0849) {
    let _0x485436 = "functionId=apCashWithDraw&body={\"linkId\":\"EcuVpjGGfccY3Ic_1ni83w\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x42c714.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x42c714.poolBaseId + ",\"prizeGroupId\":" + _0x42c714.prizeGroupId + ",\"prizeBaseId\":" + _0x42c714.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x3bbe17 => {
        $.dpost(_0x337513(_0x485436), async (_0x37322f, _0x265c74, _0x60484a) => {
            try {
                if (_0x37322f) {
                    console.log("" + JSON.stringify(_0x37322f));
                    console.log("apCashWithDraw请求失败，请检查网路重试");

                    if (_0x37322f.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x60484a = JSON.parse(_0x60484a);

                    if (_0x60484a.code == 0) {
                        if (_0x60484a.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x60484a.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x60484a.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x3f0849), $.txfail = false) : console.log(_0x60484a.data.message);
                            }
                        }
                    } else {
                        console.log(_0x60484a.errMsg);
                    }
                }
            } catch (_0x453053) {
                $.logErr(_0x453053, _0x265c74);
            } finally {
                _0x3bbe17(_0x60484a);
            }
        });
    });
}

async function _0x49a944(_0x46b7ea, _0xafe03e) {
    let _0x373d5e = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x46b7ea.id + ",\"business\":\"fission\",\"poolId\":" + _0x46b7ea.poolBaseId + ",\"prizeGroupId\":" + _0x46b7ea.prizeGroupId + ",\"prizeId\":" + _0x46b7ea.prizeBaseId + ",\"linkId\":\"EcuVpjGGfccY3Ic_1ni83w\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x5653df = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4f3117
    };
    const _0x4046a5 = {
        url: "https://api.m.jd.com/api",
        body: _0x373d5e,
        headers: _0x5653df
    };
    return new Promise(async _0x3f870f => {
        $.dpost(_0x4046a5, async (_0x3fcf48, _0x1de054, _0x2c4c29) => {
            try {
                if (_0x3fcf48) {
                    console.log("" + JSON.stringify(_0x3fcf48));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x3fcf48.includes("403") && ($.banip = true);
                } else {
                    _0x2c4c29 = JSON.parse(_0x2c4c29);

                    if (_0x2c4c29.code == 0) {
                        _0x2c4c29.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0xafe03e)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x2c4c29.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x2c4c29.errMsg);
                    }
                }
            } catch (_0x1a3b3e) {
                $.logErr(_0x1a3b3e, _0x1de054);
            } finally {
                _0x3f870f(_0x2c4c29);
            }
        });
    });
}

function _0x337513(_0x216b5f) {
    const _0x3b6e44 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4f3117
    };
    const _0x4ff766 = {
        url: "https://api.m.jd.com/?" + _0x216b5f,
        headers: _0x3b6e44
    };
    return _0x4ff766;
}

function _0x15dc54() {
    return new Promise(_0x174e26 => {
        const _0x1c8308 = {
            Cookie: _0x4f3117,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x3eefa9 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x1c8308,
            timeout: 10000
        };
        $.get(_0x3eefa9, (_0xbcf137, _0x213b81, _0x387015) => {
            try {
                if (_0x387015) {
                    _0x387015 = JSON.parse(_0x387015);

                    if (!(_0x387015.islogin === "1")) {
                        _0x387015.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x533b95) {
                console.log(_0x533b95);
            } finally {
                _0x174e26();
            }
        });
    });
}

function _0x1d3e31() {
    return new Promise(_0x460f22 => {
        !_0x4f2a7 ? $.msg($.name, "", "" + _0x522bd2) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x522bd2);

        _0x460f22();
    });
}

function _0x355385(_0x2b7162) {
    try {
        if (typeof JSON.parse(_0x2b7162) == "object") {
            return true;
        }
    } catch (_0x25dd43) {
        console.log(_0x25dd43);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}


function _0x40c1f2(_0x435e18) {
    const _0x302bd5 = _0x435e18.getFullYear(),
        _0x56bf4e = ("0" + (_0x435e18.getMonth() + 1)).slice(-2),
        _0x2bfbc0 = ("0" + _0x435e18.getDate()).slice(-2),
        _0x10e83f = ("0" + _0x435e18.getHours()).slice(-2),
        _0x5066f5 = ("0" + _0x435e18.getMinutes()).slice(-2),
        _0x20ed2b = ("0" + _0x435e18.getSeconds()).slice(-2);

    return _0x302bd5 + "/" + _0x56bf4e + "/" + _0x2bfbc0 + " " + _0x10e83f + ":" + _0x5066f5 + ":" + _0x20ed2b;
}

function _0x240192(_0x4c2fc3) {
    if (typeof _0x4c2fc3 == "string") {
        try {
            return JSON.parse(_0x4c2fc3);
        } catch (_0x5c2239) {
            console.log(_0x5c2239);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }