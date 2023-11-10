/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头(只能1个)，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true' 
updatetime:2023/10/16
 */

const $ = new Env('Jd转赚红包');
const _0x1b6a6e = $.isNode() ? require("./sendNotify") : "",
    _0x613ef9 = $.isNode() ? require("./jdCookie.js") : "",
    _0x7a35d7 = require("./function/dylanz"),
    _0x5c2fde = require("./USER_AGENTS");

let _0x3c462c = true,
    _0x71dca6 = [],
    _0x1aa770 = [],
    _0x181088 = [],
    _0x44022d = [],
    _0x1ca69b,
    _0x5853d9 = [],
    _0x35c74f = "",
    _0x321c8b = "",
    _0x3ed12d = "",
    _0x2a69f9 = "",
    _0x20baa0;

const _0x15b9a3 = process.env.JDZHBNUM || "9999",
    _0x694e01 = process.env.JDZHBLTNUM || "-1",
    _0x346b0a = process.env.JDZHBDELAY || "1",
    _0xe70536 = process.env.TXDELAY || "5",
    _0x4f8b64 = process.env.JDZHBTORED || false,
    _0x421481 = process.env.JDZHBTOPPIN || "",
    _0xa9f08 = process.env.TXSILENT || false,
    _0x4cc70a = process.env.ZZHBCODE || "",
    _0x518293 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x1ca69b = require("./function/proxy.js");
        $.dget = _0x1ca69b.intoRequest($.get.bind($));
        $.dpost = _0x1ca69b.intoRequest($.post.bind($));
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
    Object.keys(_0x613ef9).forEach(_0x5e6bcc => {
        _0x5853d9.push(_0x613ef9[_0x5e6bcc]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x5853d9 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x5c86e6($.getdata("CookiesJD") || "[]").map(_0x53a441 => _0x53a441.cookie)].filter(_0x4d06c4 => !!_0x4d06c4);
}

$.banip = false;
!(async () => {
    if (!_0x5853d9[0]) {
        const _0x5b477f = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x5b477f);
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231030 仅车头抽奖提现");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  指定PIN车头，不指定默认CK1  JDZHBTOPPIN='jdpin'\n  指定助力CODE，都去助力TA  ZZHBCODE='xxx'\n  多少助力停止，默认9999个  JDZHBNUM='100'\n  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  每次抽奖间隔，默认1秒，单位秒  JDZHBDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理api  DY_PROXY='https://api'\n  关闭提现  NOTX='true'\n");

    // let _0x3693b3 = await _0x15dae3();
    _0x3693b3 = []

    if (_0x421481) {
        console.log("\n已指定PIN：" + _0x421481);

        let _0x4c0fc1 = _0x5853d9.findIndex(_0x39a2f7 => _0x39a2f7.includes(_0x421481));

        if (_0x4c0fc1 == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x321c8b = _0x5853d9[_0x4c0fc1];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x321c8b = _0x5853d9[0];
    }

    _0x35c74f = _0x321c8b;
    $.UserName = decodeURIComponent(_0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x5c2fde.UARAM ? _0x5c2fde.UARAM() : _0x5c2fde.USER_AGENT;
    console.log("\n————————————————————车头开团————————————————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x5d7c1c();

    if (!$.isLogin) {
        const _0x2fdc50 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x2fdc50);
        $.isNode() && (await _0x1b6a6e.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x126199(1);
    await $.wait(1000);


    console.log("————————————————————————————————————————————————————");
    console.log("\n\n———————————————————开始助力车头—————————————————————");
    _0x4cc70a && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x71dca6 = [], _0x71dca6.push(_0x4cc70a));
    _0x20baa0 = 0;

    for (let _0x5bfd2d of _0x71dca6) {
        if ($.banip) {
            break;
        }

        if (_0x5853d9.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x5bfd2d);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0xf3cd0a = _0x20baa0; _0xf3cd0a < _0x5853d9.length; _0xf3cd0a++) {
            if (_0x5853d9[_0xf3cd0a]) {
                _0x35c74f = _0x5853d9[_0xf3cd0a];
                $.UserName = decodeURIComponent(_0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0xf3cd0a + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x5c2fde.UARAM ? _0x5c2fde.UARAM() : _0x5c2fde.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x764f6f(_0x5bfd2d);

                if ($.suc > Number(_0x15b9a3) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x20baa0 = _0xf3cd0a + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x5853d9.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
    _0x694e01 > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x694e01);

    let _0x283f3a = new Date();

    _0x283f3a.setDate(_0x283f3a.getDate() - 1);

    _0x35c74f = _0x321c8b;
    $.UserName = decodeURIComponent(_0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x35c74f.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.fail = 0;
    _0x1aa770 = [];
    _0x181088 = [];
    $.txj = true;
    $.fg = 1;
    $.txfull = false;
    $.nocashnum = 0;
    $.end = false;
    $.hotflag = false;
    $.toredfailnum = 0;
    $.UA = _0x5c2fde.UARAM ? _0x5c2fde.UARAM() : _0x5c2fde.USER_AGENT;

    let _0x424c7e = await _0x126199(0);

    if (_0x424c7e.code != "0") {
        return;
    }

    $.log("本轮已抽奖次数：" + _0x424c7e.data.drawPrizeNum);
    $.log("本轮剩余抽奖次数：" + $.times);

    if (_0x424c7e.data.cashVo) {
        if (_0x424c7e.data?.["cashVo"]?.["state"] === 1) {
            $.log("本轮提现金进度：" + _0x424c7e.data.cashVo.amount + "/" + _0x424c7e.data.cashVo.totalAmount);
        } else {
            _0x424c7e.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金进度：" + _0x424c7e.data.cashVo.amount + "/" + _0x424c7e.data.cashVo.totalAmount), $.txj = false);
        }
    } else {
        $.txj = false;
    }

    $.log("本轮结束时间： " + _0x2ff848(new Date(Date.now() + _0x424c7e.data.countDownTime)));

    for (let _0x377041 = 0; _0x377041 < (_0x694e01 > -1 && _0x694e01 < $.times ? _0x694e01 : $.times); _0x377041++) {
        if ($.banip) {
            break;
        }

        process.stdout.write("\n第" + (_0x377041 + 1) + "次抽奖结果：");

        for (let _0x2d32ce of Array(3)) {
            await _0x2662ca(_0x2d32ce + 1);

            if (!$.hotflag) {
                break;
            }

            await $.wait(Math.random() * 500 + _0x346b0a * 1000);
        }

        if ($.end) {
            break;
        }

        $.txj && (await _0x3f3c73());
        await $.wait(Math.random() * 500 + _0x346b0a * 1000);

        if ($.fail > 2) {
            $.log("连续3次优惠券，不继续抽了");
            break;
        }
    }

    _0x181088.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x181088.reduce((_0x3d01cd, _0x142368) => _0x3d01cd + _0x142368 * 100, 0) / 100 + "元");
    _0x1aa770.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x1aa770.reduce((_0x33352f, _0x1ecfad) => _0x33352f + _0x1ecfad * 100, 0) / 100 + "元");

    if (_0x518293 != "true") {
        if (new Date().getHours() < 6 && _0xa9f08) {
            return;
        }

        $.log("\n——————————开始提现（默认间隔5秒，变量TXDELAY）——————");
        _0x4f8b64 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x219102 = 0; _0x219102 < 50; _0x219102++) {
            if ($.nocashnum > 2 || $.toredfailnum > 4) {
                break;
            }

            if ($.txfull && !_0x4f8b64) {
                $.log("\n本月提现到上限!如转红包请设置变量");
                break;
            }

            await _0x4dff9d(_0x219102 + 1);
            await $.wait(1000);

            if (!$.baglist || $.baglist.length === 0) {
                break;
            }

            for (let _0x3d0f9d of $.baglist) {
                if (new Date(_0x3d0f9d.createTime) < _0x283f3a || $.toredfailnum > 4) {
                    $.nocashnum = 5;
                    break;
                }

                if (_0x3d0f9d.prizeType == 4) {
                    if (_0x3d0f9d.state == 0 || _0x3d0f9d.state == 2) {
                        process.stdout.write("" + Number(_0x3d0f9d.amount));

                        let _0x3514d1 = await _0x2fa7d0(_0x3d0f9d, Number(_0x3d0f9d.amount));

                        $.txfail && (await $.wait(6000), _0x3514d1 = await _0x2fa7d0(_0x3d0f9d, Number(_0x3d0f9d.amount)));

                        if ($.txfull && !_0x4f8b64) {
                            break;
                        }

                        if (_0x3514d1.data.message.includes("上限") && _0x4f8b64 && $.toredfailnum < 5) {
                            await _0x2edead(_0x3d0f9d, Number(_0x3d0f9d.amount));
                        }

                        await $.wait(_0xe70536 * 1000);
                    } else {
                        _0x3d0f9d.state == 8;
                    }
                }
            }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x274fde, _0x5c0fd3) => _0x274fde + _0x5c0fd3 * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x4ea8f5, _0x74ed49) => _0x4ea8f5 + _0x74ed49 * 100, 0) / 100 + "元");
    } else {
        $.log("\n\n⚠已设置不提现！");
    }

    _0x44022d = [];
    await $.wait(2000);
})().catch(_0x4e024f => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4e024f + "!", "");
}).finally(() => {
    $.done();
});

async function _0x126199(_0x20cf4a) {
    const _0x9f2cb0 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        inviter: ""
    };
    let _0x250c2f = _0x9f2cb0,
        _0x39fe50 = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x250c2f,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x250c2f = await _0x7a35d7.getbody(_0x39fe50);

    if (!_0x250c2f) {
        return;
    }

    return new Promise(async _0x616bf3 => {
        $.dpost(_0x3f349b(_0x250c2f), async (_0x40d8f1, _0x4345be, _0x144295) => {
            try {
                if (_0x40d8f1) {
                    console.log("" + JSON.stringify(_0x40d8f1));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x144295 = JSON.parse(_0x144295);

                    if (_0x144295.code == 0) {
                        $.times = _0x144295.data.prizeNum;

                        if (_0x20cf4a) {
                            console.log("助力码：" + _0x144295.data.inviter);
                        }

                        _0x71dca6.push(_0x144295.data.inviter);
                    } else {
                        console.log(_0x144295.errMsg);
                    }
                }
            } catch (_0x1860fb) {
                $.logErr(_0x1860fb, _0x4345be);
            } finally {
                _0x616bf3(_0x144295);
            }
        });
    });
}

async function _0x3f3c73() {
    const _0x4a8198 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x3d1837 = _0x4a8198,
        _0xc2dd61 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x3d1837,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x3d1837 = await _0x7a35d7.getbody(_0xc2dd61);

    if (!_0x3d1837) {
        return;
    }

    return new Promise(async _0x36ea1e => {
        $.dpost(_0x3f349b(_0x3d1837), async (_0x5d8584, _0x5ac428, _0x1a5909) => {
            try {
                if (_0x5d8584) {
                    console.log("" + JSON.stringify(_0x5d8584));
                    console.log("receive请求失败，请检查网路重试");
                    _0x5d8584.includes("403") && ($.banip = true);
                } else {
                    _0x1a5909 = JSON.parse(_0x1a5909);

                    if (_0x1a5909.code == 0) {
                        process.stdout.write("----提现金" + _0x1a5909.data.amount);
                        _0x1a5909.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false);
                    } else {
                        if (!(_0x1a5909.code == 80208)) {
                            _0x1a5909.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x1a5909));
                        }
                    }
                }
            } catch (_0x5e6779) {
                $.logErr(_0x5e6779, _0x5ac428);
            } finally {
                _0x36ea1e(_0x1a5909);
            }
        });
    });
}

async function _0x2662ca(_0x17c536) {
    const _0x124c42 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x1c6f60 = _0x124c42,
        _0x5753e5 = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x1c6f60,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x1c6f60 = await _0x7a35d7.getbody(_0x5753e5);

    if (!_0x1c6f60) {
        return;
    }

    return new Promise(async _0x435685 => {
        $.dpost(_0x3f349b(_0x1c6f60), async (_0xe54463, _0x4f30f5, _0x45ecc3) => {
            try {
                if (_0xe54463) {
                    console.log("" + JSON.stringify(_0xe54463));
                    console.log("lottery请求失败，请检查网路重试");

                    if (_0xe54463.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x45ecc3 = JSON.parse(_0x45ecc3);

                    if (_0x45ecc3.code == 0) {
                        const _0x157f78 = _0x45ecc3.data.prizeType;

                        if (!_0x157f78) {
                            fail++;
                        }

                        switch (_0x157f78) {
                            case 1:
                                process.stdout.write("垃圾卷😤");
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x3f3a88 = parseFloat(_0x45ecc3.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x3f3a88 + "现金💰️");

                                _0x1aa770.push(_0x3f3a88);

                                const _0x2f09ae = {
                                    prizeValue: _0x45ecc3.data.prizeValue,
                                    id: _0x45ecc3.data.id,
                                    poolBaseId: _0x45ecc3.data.poolBaseId,
                                    prizeGroupId: _0x45ecc3.data.prizeGroupId,
                                    prizeBaseId: _0x45ecc3.data.prizeBaseId
                                };

                                _0x44022d.push(_0x2f09ae);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x5ca101 = parseFloat(_0x45ecc3.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x5ca101 + "红包🧧");

                                _0x181088.push(_0x5ca101);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x45ecc3.data));
                        }
                    } else {
                        if (_0x45ecc3.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x45ecc3.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x45ecc3.errMsg)) : ($.hotflag = false, console.log(_0x45ecc3.errMsg));
                        }
                    }
                }
            } catch (_0xdd3808) {
                $.logErr(_0xdd3808, _0x4f30f5);
            } finally {
                _0x435685(_0x45ecc3);
            }
        });
    });
}

async function _0x4dff9d(_0x4c1736) {
    const _0x1c3647 = {
        pageNum: _0x4c1736,
        pageSize: 100,
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        business: "fission"
    };
    let _0x2bc64a = _0x1c3647,
        _0x2217a7 = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x2bc64a,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x2bc64a = await _0x7a35d7.getbody(_0x2217a7);

    if (!_0x2bc64a) {
        return;
    }

    return new Promise(async _0x1b68ff => {
        $.dget(_0x3f349b(_0x2bc64a), async (_0x8e480c, _0x5569ca, _0x120e65) => {
            try {
                _0x8e480c ? (console.log("" + JSON.stringify(_0x8e480c)), console.log(" API请求失败，请检查网路重试"), _0x8e480c.includes("403") && ($.banip = true)) : (_0x120e65 = JSON.parse(_0x120e65), _0x120e65.code == 0 ? $.baglist = _0x120e65.data.items : console.log(_0x120e65.errMsg));
            } catch (_0x17ebc5) {
                $.logErr(_0x17ebc5, _0x5569ca);
            } finally {
                _0x1b68ff(_0x120e65);
            }
        });
    });
}

async function _0x764f6f(_0x4c3094) {
    const _0x48075f = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        isJdApp: true,
        inviter: _0x4c3094
    };
    let _0x29750b = _0x48075f,
        _0x14d766 = {
            appId: "c5389",
            fn: "inviteFissionhelp",
            body: _0x29750b,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x29750b = await _0x7a35d7.getbody(_0x14d766);

    if (!_0x29750b) {
        return;
    }

    return new Promise(async _0x6910ea => {
        $.dpost(_0x3f349b(_0x29750b), async (_0xe9f806, _0x586b2b, _0x29aa77) => {
            try {
                if (_0xe9f806) {
                    console.log("" + JSON.stringify(_0xe9f806));
                    console.log("help请求失败，请检查网路重试");
                    _0xe9f806.includes("403") && ($.banip = true);
                } else {
                    _0x29aa77 = JSON.parse(_0x29aa77);

                    if (_0x29aa77.code == 0) {
                        if (!_0x29aa77.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x29aa77.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x29aa77.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x29aa77.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x29aa77.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x29aa77.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x29aa77.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x29aa77));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x29aa77.errMsg);
                    }
                }
            } catch (_0x1acb0c) {
                $.logErr(_0x1acb0c, _0x586b2b);
            } finally {
                _0x6910ea(_0x29aa77);
            }
        });
    });
}

async function _0x2fa7d0(_0x252334, _0x1b8d6c) {
    let _0xaac986 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x252334.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x252334.poolBaseId + ",\"prizeGroupId\":" + _0x252334.prizeGroupId + ",\"prizeBaseId\":" + _0x252334.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x23b915 => {
        $.dpost(_0x3f349b(_0xaac986), async (_0x1f89a3, _0x43296c, _0x52a92d) => {
            try {
                if (_0x1f89a3) {
                    console.log("" + JSON.stringify(_0x1f89a3));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x1f89a3.includes("403") && ($.banip = true);
                } else {
                    _0x52a92d = JSON.parse(_0x52a92d);

                    if (_0x52a92d.code == 0) {
                        if (_0x52a92d.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x52a92d.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x52a92d.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x1b8d6c), $.txfail = false) : console.log(_0x52a92d.data.message);
                            }
                        }
                    } else {
                        console.log(_0x52a92d.errMsg);
                    }
                }
            } catch (_0x45d2c5) {
                $.logErr(_0x45d2c5, _0x43296c);
            } finally {
                _0x23b915(_0x52a92d);
            }
        });
    });
}

async function _0x2edead(_0x4159d9, _0x4954de) {
    let _0x1f0893 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x4159d9.id + ",\"business\":\"fission\",\"poolId\":" + _0x4159d9.poolBaseId + ",\"prizeGroupId\":" + _0x4159d9.prizeGroupId + ",\"prizeId\":" + _0x4159d9.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x1a0627 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x35c74f
    };
    const _0x4b6d81 = {
        url: "https://api.m.jd.com/api",
        body: _0x1f0893,
        headers: _0x1a0627
    };
    return new Promise(async _0x1232fd => {
        $.dpost(_0x4b6d81, async (_0x1e1f36, _0xb14dc4, _0x3cb6a6) => {
            try {
                if (_0x1e1f36) {
                    console.log("" + JSON.stringify(_0x1e1f36));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x1e1f36.includes("403") && ($.banip = true);
                } else {
                    _0x3cb6a6 = JSON.parse(_0x3cb6a6);

                    if (_0x3cb6a6.code == 0) {
                        if (_0x3cb6a6.data.resCode === "0") {
                            process.stdout.write("🧧 ");
                            $.toredsuc.push(_0x4954de);
                        } else {
                            process.stdout.write("❎ ");
                            $.toredfailnum++;
                        }
                    } else {
                        _0x3cb6a6.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3cb6a6.errMsg);
                    }
                }
            } catch (_0x46880c) {
                $.logErr(_0x46880c, _0xb14dc4);
            } finally {
                _0x1232fd(_0x3cb6a6);
            }
        });
    });
}

function _0x3f349b(_0x286a06) {
    const _0x25091d = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x35c74f
    };
    const _0x255825 = {
        url: "https://api.m.jd.com/?" + _0x286a06,
        headers: _0x25091d
    };
    return _0x255825;
}

function _0x5d7c1c() {
    return new Promise(_0x3f987f => {
        const _0x4436ae = {
            Cookie: _0x35c74f,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x597363 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x4436ae,
            timeout: 10000
        };
        $.get(_0x597363, (_0x550acf, _0x457a26, _0x501004) => {
            try {
                if (_0x501004) {
                    _0x501004 = JSON.parse(_0x501004);

                    if (!(_0x501004.islogin === "1")) {
                        _0x501004.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x186fbe) {
                console.log(_0x186fbe);
            } finally {
                _0x3f987f();
            }
        });
    });
}

function _0x4041d7() {
    return new Promise(_0x5dbc3 => {
        !_0x3c462c ? $.msg($.name, "", "" + _0x3ed12d) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x3ed12d);

        _0x5dbc3();
    });
}

function _0xeb4b98(_0x596ad2) {
    try {
        if (typeof JSON.parse(_0x596ad2) == "object") {
            return true;
        }
    } catch (_0xd67753) {
        console.log(_0xd67753);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}


function _0x2ff848(_0x2ae977) {
    const _0x4eb4b8 = _0x2ae977.getFullYear(),
        _0x289c0f = ("0" + (_0x2ae977.getMonth() + 1)).slice(-2),
        _0xbbbd7b = ("0" + _0x2ae977.getDate()).slice(-2),
        _0x2dcbda = ("0" + _0x2ae977.getHours()).slice(-2),
        _0xd9ff4a = ("0" + _0x2ae977.getMinutes()).slice(-2),
        _0x58464c = ("0" + _0x2ae977.getSeconds()).slice(-2);

    return _0x4eb4b8 + "/" + _0x289c0f + "/" + _0xbbbd7b + " " + _0x2dcbda + ":" + _0xd9ff4a + ":" + _0x58464c;
}

function _0x5c86e6(_0x2fc2f8) {
    if (typeof _0x2fc2f8 == "string") {
        try {
            return JSON.parse(_0x2fc2f8);
        } catch (_0xfbe07a) {
            console.log(_0xfbe07a);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }