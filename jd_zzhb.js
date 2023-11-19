/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头(只能1个)，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true' 
updatetime:2023/11/16
 */

const $ = new Env('Jd转赚红包');
const _0x2310ea = $.isNode() ? require("./sendNotify") : "",
    _0x337fc1 = $.isNode() ? require("./jdCookie.js") : "",
    _0x5aca69 = require("./function/dylanz"),
    _0x2b73d9 = require("./USER_AGENTS");

let _0x16470a = true,
    _0x4ac490 = [],
    _0x173ad6 = [],
    _0x545b4d = [],
    _0x1713c6 = [],
    _0xb41fb5,
    _0x2b70ca = [],
    _0x5bb249 = "",
    _0x175209 = "",
    _0x551689 = "",
    _0x23f353 = "",
    _0x124ef4;

const _0x933b9e = process.env.JDZHBNUM || "9999",
    _0x2f2629 = process.env.JDZHBLTNUM || "-1",
    _0x39c42a = process.env.JDZHBDELAY || "1",
    _0x25ea1f = process.env.TXDELAY || "5",
    _0x314526 = process.env.TXIVAL || "1",
    _0x14fda4 = process.env.JDZHBTORED || false,
    _0x3785d3 = process.env.JDZHBTOPPIN || "",
    _0x191fdb = process.env.TXSILENT || false,
    _0x140a50 = process.env.ZZHBCODE || "",
    _0x2cb0aa = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    _0xb41fb5 = require("./function/proxy.js");
    $.dget = _0xb41fb5.intoRequest($.get.bind($));
    $.dpost = _0xb41fb5.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
    Object.keys(_0x337fc1).forEach(_0x1b5530 => {
        _0x2b70ca.push(_0x337fc1[_0x1b5530]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x2b70ca = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x2ad1e3($.getdata("CookiesJD") || "[]").map(_0x244e63 => _0x244e63.cookie)].filter(_0x54d60c => !!_0x54d60c);

$.banip = false;
!(async () => {
    if (!_0x2b70ca[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231117 提现范围变量控制");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  指定PIN车头，不指定默认CK1  JDZHBTOPPIN='jdpin'\n  指定助力CODE，都去助力TA  ZZHBCODE='xxx'\n  多少助力停止，默认9999个  JDZHBNUM='100'\n  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='3'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");

    // let _0x428abc = await _0x4bceb6();

    if (_0x3785d3) {
        console.log("\n已指定PIN：" + _0x3785d3);

        let _0x2e5686 = _0x2b70ca.findIndex(_0x1373f0 => _0x1373f0.includes(_0x3785d3));

        if (_0x2e5686 == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x175209 = _0x2b70ca[_0x2e5686];
    } else console.log("\n未指定PIN默认CK1车头"), _0x175209 = _0x2b70ca[0];

    _0x5bb249 = _0x175209;
    $.UserName = decodeURIComponent(_0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x2b73d9.UARAM ? _0x2b73d9.UARAM() : _0x2b73d9.USER_AGENT;
    console.log("\n————————————————————车头开团————————————————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x332789();

    if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x2310ea.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0xfc61f1(1);
    await $.wait(1000);


    console.log("————————————————————————————————————————————————————");
    console.log("\n\n———————————————————开始助力车头—————————————————————");
    _0x140a50 && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x4ac490 = [], _0x4ac490.push(_0x140a50));
    _0x124ef4 = 0;

    for (let _0x70833d of _0x4ac490) {
        if ($.banip) break;

        if (_0x2b70ca.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x70833d);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x266e16 = _0x124ef4; _0x266e16 < _0x2b70ca.length; _0x266e16++) {
            if (_0x2b70ca[_0x266e16]) {
                _0x5bb249 = _0x2b70ca[_0x266e16];
                $.UserName = decodeURIComponent(_0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x266e16 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x2b73d9.UARAM ? _0x2b73d9.UARAM() : _0x2b73d9.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x133c2c(_0x70833d);

                if ($.suc > Number(_0x933b9e) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x124ef4 = _0x266e16 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x2b70ca.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
    _0x2f2629 > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x2f2629);

    let _0x548a48 = new Date();

    _0x548a48.setDate(_0x548a48.getDate() - _0x314526);

    _0x5bb249 = _0x175209;
    $.UserName = decodeURIComponent(_0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5bb249.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.fail = 0;
    _0x173ad6 = [];
    _0x545b4d = [];
    txjscore = [];
    $.txj = true;
    $.fg = 1;
    $.txfull = false;
    $.nocashnum = 0;
    $.end = false;
    $.hotflag = false;
    $.toredfailnum = 0;
    $.txjsuc = false;
    $.UA = _0x2b73d9.UARAM ? _0x2b73d9.UARAM() : _0x2b73d9.USER_AGENT;

    let _0x48f753 = await _0xfc61f1(0);

    if (_0x48f753.code != "0") return;
    $.log("本轮已抽奖次数：" + _0x48f753.data.drawPrizeNum);
    $.log("本轮剩余抽奖次数：" + $.times);

    if (_0x48f753.data.cashVo) {
        if (_0x48f753.data?.["cashVo"]?.["state"] === 1) $.log("本轮提现金进度：" + _0x48f753.data.cashVo.amount + "/" + _0x48f753.data.cashVo.totalAmount + "(-" + _0x48f753.data.cashVo.leftAmount + ")"); else _0x48f753.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x48f753.data.cashVo.amount + "/" + _0x48f753.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
    } else $.txj = false;

    $.log("本轮结束时间： " + _0x1adb16(new Date(Date.now() + _0x48f753.data.countDownTime)));

    for (let _0xc0d0f4 = 0; _0xc0d0f4 < (_0x2f2629 > -1 && _0x2f2629 < $.times ? _0x2f2629 : $.times); _0xc0d0f4++) {
        if ($.banip) break;
        process.stdout.write("\n第" + (_0xc0d0f4 + 1) + "次抽奖结果：");

        for (let _0x35088b of Array(3)) {
            await _0x145390(_0x35088b + 1);
            if (!$.hotflag) break;
            await $.wait(Math.random() * 500 + _0x39c42a * 1000);
        }

        if ($.end) break;
        $.txj && (await _0xad5669());
        await $.wait(Math.random() * 500 + _0x39c42a * 1000);

        if ($.fail > 2) {
            $.log("连续3次优惠券，不继续抽了");
            break;
        }
    }

    _0x545b4d.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x545b4d.reduce((_0x4f3c21, _0xd77ad0) => _0x4f3c21 + _0xd77ad0 * 100, 0) / 100 + "元");
    _0x173ad6.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x173ad6.reduce((_0x3193eb, _0x225e3d) => _0x3193eb + _0x225e3d * 100, 0) / 100 + "元");

    if (txjscore.length !== 0) {
        let _0x277711 = txjscore.reduce((_0x3124a4, _0x537677) => _0x3124a4 + _0x537677 * 100, 0) / 100;

        $.log("\n\n本次抽奖获得提现金：" + _0x277711 + "个, 平均" + (_0x277711 / (_0x2f2629 > -1 ? Math.min.apply(null, [_0x2f2629, $.times]) : $.times)).toFixed(4) + "个/抽");
    }

    if (_0x2cb0aa != "true") {
        if (new Date().getHours() < 6 && _0x191fdb) return;
        $.log("\n——————————开始提现（默认间隔5秒，变量TXDELAY）——————");
        _0x14fda4 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x146e78 = 0; _0x146e78 < 50; _0x146e78++) {
            if ($.nocashnum > 2 || $.toredfailnum > 4) break;
            await _0x30059f(_0x146e78 + 1);
            await $.wait(1000);
            if (!$.baglist || $.baglist.length === 0) break;

            for (let _0x17d370 of $.baglist) {
                if (Math.max.apply(null, [new Date(_0x17d370.createTime), new Date(_0x17d370.startTime)]) < _0x548a48 || $.toredfailnum > 4) {
                    $.nocashnum = 5;
                    break;
                }

                if (_0x17d370.prizeType == 4) {
                    if (_0x17d370.state == 0 || _0x17d370.state == 2) {
                        process.stdout.write("" + Number(_0x17d370.amount));

                        let _0x230ec3 = await _0x150dfe(_0x17d370, Number(_0x17d370.amount));

                        $.txfail && (await $.wait(5000), _0x230ec3 = await _0x150dfe(_0x17d370, Number(_0x17d370.amount)));
                        if (_0x230ec3.data.message.includes("上限") && _0x14fda4 && $.toredfailnum < 5) await _0x401942(_0x17d370, Number(_0x17d370.amount));
                        await $.wait(_0x25ea1f * 1000);
                    } else {
                        if (_0x17d370.state == 8) { }
                    }
                }
            }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0xa368e2, _0x21a70a) => _0xa368e2 + _0x21a70a * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x5889df, _0x52315d) => _0x5889df + _0x52315d * 100, 0) / 100 + "元");
    } else $.log("\n\n⚠已设置不提现！");

    _0x1713c6 = [];
    await $.wait(2000);
})().catch(_0x240e22 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x240e22 + "!", "");
}).finally(() => {
    $.done();
});

async function _0xfc61f1(_0x401705) {
    let _0x230b9b = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "inviter": ""
    },
        _0x126c16 = {
            "appId": "eb67b",
            "fn": "inviteFissionHome",
            "body": _0x230b9b,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x230b9b = await _0x5aca69.getbody(_0x126c16);
    if (!_0x230b9b) return;
    return new Promise(async _0x32e002 => {
        $.dpost(_0x45a24e(_0x230b9b), async (_0x4c27a0, _0x2b4f6d, _0x581316) => {
            try {
                if (_0x4c27a0) {
                    console.log("" + JSON.stringify(_0x4c27a0));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x581316 = JSON.parse(_0x581316);

                    if (_0x581316.code == 0) {
                        $.times = _0x581316.data.prizeNum;
                        if (_0x401705) console.log("我的助力码：" + _0x581316.data.inviter);

                        _0x4ac490.push(_0x581316.data.inviter);
                    } else console.log(_0x581316.errMsg);
                }
            } catch (_0x461c67) {
                $.logErr(_0x461c67, _0x2b4f6d);
            } finally {
                _0x32e002(_0x581316);
            }
        });
    });
}

async function _0xad5669() {
    let _0x51d532 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0xb46420 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x51d532,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x51d532 = await _0x5aca69.getbody(_0xb46420);
    if (!_0x51d532) return;
    return new Promise(async _0x1156de => {
        $.dpost(_0x45a24e(_0x51d532), async (_0x14c259, _0x566e65, _0x42bf16) => {
            try {
                if (_0x14c259) console.log("" + JSON.stringify(_0x14c259)), console.log("receive请求失败，请检查网路重试"), _0x14c259.includes("403") && ($.banip = true); else {
                    _0x42bf16 = JSON.parse(_0x42bf16);
                    if (_0x42bf16.code == 0) process.stdout.write("----提现金" + _0x42bf16.data.amount + "(+" + _0x42bf16.data.receiveList[0].amount + ")"), txjscore.push(_0x42bf16.data.receiveList[0].amount), _0x42bf16.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true); else {
                        if (_0x42bf16.code == 80208) process.stdout.write("----送的抽奖次数没有提现金"); else _0x42bf16.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x42bf16));
                    }
                }
            } catch (_0x1c9d5a) {
                $.logErr(_0x1c9d5a, _0x566e65);
            } finally {
                _0x1156de(_0x42bf16);
            }
        });
    });
}

async function _0x145390(_0x32d2a5) {
    let _0x2c78a0 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x85e7e6 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x2c78a0,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x2c78a0 = await _0x5aca69.getbody(_0x85e7e6);
    if (!_0x2c78a0) return;
    return new Promise(async _0x52c044 => {
        $.dpost(_0x45a24e(_0x2c78a0), async (_0x4bba80, _0x3f1622, _0x372357) => {
            try {
                if (_0x4bba80) console.log("" + JSON.stringify(_0x4bba80)), console.log("lottery请求失败，请检查网路重试"), _0x4bba80.includes("403") && ($.banip = true); else {
                    _0x372357 = JSON.parse(_0x372357);

                    if (_0x372357.code == 0) {
                        const _0x12396b = _0x372357.data.prizeType;
                        if (!_0x12396b) fail++;

                        switch (_0x12396b) {
                            case 1:
                                process.stdout.write("垃.圾.券😤"), $.txjsuc && $.fail++, $.hotflag = false;
                                break;

                            case 4:
                                let _0x42ebd4 = parseFloat(_0x372357.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x42ebd4 + "现金💰️"), _0x173ad6.push(_0x42ebd4), _0x1713c6.push({
                                    "prizeValue": _0x372357.data.prizeValue,
                                    "id": _0x372357.data.id,
                                    "poolBaseId": _0x372357.data.poolBaseId,
                                    "prizeGroupId": _0x372357.data.prizeGroupId,
                                    "prizeBaseId": _0x372357.data.prizeBaseId
                                }), $.fail = 0, $.hotflag = false;
                                break;

                            case 2:
                                let _0x34ad00 = parseFloat(_0x372357.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x34ad00 + "红包🧧"), _0x545b4d.push(_0x34ad00), $.fail = 0, $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false, console.log(JSON.stringify(_0x372357.data));
                        }
                    } else {
                        if (_0x372357.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true; else _0x372357.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x372357.errMsg)) : ($.hotflag = false, console.log(_0x372357.errMsg));
                    }
                }
            } catch (_0x20f5eb) {
                $.logErr(_0x20f5eb, _0x3f1622);
            } finally {
                _0x52c044(_0x372357);
            }
        });
    });
}

async function _0x30059f(_0x1486ae) {
    let _0x7b8f74 = {
        "pageNum": _0x1486ae,
        "pageSize": 100,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    },
        _0xd01f2e = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x7b8f74,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x7b8f74 = await _0x5aca69.getbody(_0xd01f2e);
    if (!_0x7b8f74) return;
    return new Promise(async _0x2285c4 => {
        $.dget(_0x45a24e(_0x7b8f74), async (_0xc577a, _0x5821a0, _0xaa7b11) => {
            try {
                _0xc577a ? (console.log("" + JSON.stringify(_0xc577a)), console.log(" API请求失败，请检查网路重试"), _0xc577a.includes("403") && ($.banip = true)) : (_0xaa7b11 = JSON.parse(_0xaa7b11), _0xaa7b11.code == 0 ? $.baglist = _0xaa7b11.data.items : console.log(_0xaa7b11.errMsg));
            } catch (_0x5454ff) {
                $.logErr(_0x5454ff, _0x5821a0);
            } finally {
                _0x2285c4(_0xaa7b11);
            }
        });
    });
}

async function _0x133c2c(_0x31843d) {
    let _0x34f330 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "isJdApp": true,
        "inviter": _0x31843d
    },
        _0x3ecebd = {
            "appId": "c5389",
            "fn": "inviteFissionhelp",
            "body": _0x34f330,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x34f330 = await _0x5aca69.getbody(_0x3ecebd);
    if (!_0x34f330) return;
    return new Promise(async _0x15626c => {
        $.dpost(_0x45a24e(_0x34f330), async (_0x508460, _0x518a5c, _0x29fe97) => {
            try {
                if (_0x508460) {
                    console.log("" + JSON.stringify(_0x508460));
                    console.log("help请求失败，请检查网路重试");

                    if (_0x508460.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x29fe97 = JSON.parse(_0x29fe97);

                    if (_0x29fe97.code == 0) {
                        if (!_0x29fe97.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x29fe97.data.helpResult == 1) $.suc++, $.alr = 0, console.log("结果：助力成功 ✅ " + ($.suc || "")); else {
                            if (_0x29fe97.data.helpResult == 6) console.log("结果：已经助力过TA！"), $.alr++; else {
                                if (_0x29fe97.data.helpResult == 3) console.log("结果：没有次数了！"), $.nohelp = true, $.nhp++; else {
                                    if (_0x29fe97.data.helpResult == 2) $.log("结果：助力黑了 💣"), $.hot = true; else {
                                        if (_0x29fe97.data.helpResult == 4) $.log("结果：没有助力次数！"), $.nhp++; else _0x29fe97.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x29fe97));
                                    }
                                }
                            }
                        }
                    } else console.log(_0x29fe97.errMsg);
                }
            } catch (_0x2478e2) {
                $.logErr(_0x2478e2, _0x518a5c);
            } finally {
                _0x15626c(_0x29fe97);
            }
        });
    });
}

async function _0x150dfe(_0x691850, _0x279190) {
    let _0x2ddb18 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x691850.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x691850.poolBaseId + ",\"prizeGroupId\":" + _0x691850.prizeGroupId + ",\"prizeBaseId\":" + _0x691850.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x1c1b7d => {
        $.dpost(_0x45a24e(_0x2ddb18), async (_0x4805dc, _0x16cdf9, _0x185f0d) => {
            try {
                if (_0x4805dc) {
                    console.log("" + JSON.stringify(_0x4805dc));
                    console.log("apCashWithDraw请求失败，请检查网路重试");

                    if (_0x4805dc.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x185f0d = JSON.parse(_0x185f0d);

                    if (_0x185f0d.code == 0) {
                        if (_0x185f0d.data.message.indexOf("待发放") > -1) process.stdout.write("❎"), $.txfail = true; else {
                            if (_0x185f0d.data.message.includes("上限")) !_0x14fda4 && console.log("提现到上限"), $.txfull = true, $.txfail = false; else _0x185f0d.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x279190), $.txfail = false) : console.log(_0x185f0d.data.message);
                        }
                    } else console.log(_0x185f0d.errMsg);
                }
            } catch (_0x13cf23) {
                $.logErr(_0x13cf23, _0x16cdf9);
            } finally {
                _0x1c1b7d(_0x185f0d);
            }
        });
    });
}

async function _0x401942(_0x2d43cf, _0x23a82e) {
    let _0x38aa7a = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x2d43cf.id + ",\"business\":\"fission\",\"poolId\":" + _0x2d43cf.poolBaseId + ",\"prizeGroupId\":" + _0x2d43cf.prizeGroupId + ",\"prizeId\":" + _0x2d43cf.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
        _0x580b27 = {
            "url": "https://api.m.jd.com/api",
            "body": _0x38aa7a,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x5bb249
            }
        };

    return new Promise(async _0x53e18c => {
        $.dpost(_0x580b27, async (_0x53b0e3, _0x206003, _0xd01b15) => {
            try {
                if (_0x53b0e3) console.log("" + JSON.stringify(_0x53b0e3)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试"), _0x53b0e3.includes("403") && ($.banip = true); else {
                    _0xd01b15 = JSON.parse(_0xd01b15);
                    if (_0xd01b15.code == 0) _0xd01b15.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x23a82e)) : (process.stdout.write("❎ "), $.toredfailnum++); else _0xd01b15.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0xd01b15.errMsg);
                }
            } catch (_0x8458d9) {
                $.logErr(_0x8458d9, _0x206003);
            } finally {
                _0x53e18c(_0xd01b15);
            }
        });
    });
}

function _0x45a24e(_0x480d68) {
    return {
        "url": "https://api.m.jd.com/?" + _0x480d68,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x5bb249
        }
    };
}

function _0x332789() {
    return new Promise(_0x59970a => {
        const _0x16f19d = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x5bb249,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x16f19d, (_0x260916, _0x2b1c0c, _0x54bf6d) => {
            try {
                if (_0x54bf6d) {
                    _0x54bf6d = JSON.parse(_0x54bf6d);

                    if (_0x54bf6d.islogin === "1") { } else _0x54bf6d.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x5f0b8f) {
                console.log(_0x5f0b8f);
            } finally {
                _0x59970a();
            }
        });
    });
}

function _0x26aa70() {
    return new Promise(_0x35dc1c => {
        !_0x16470a ? $.msg($.name, "", "" + _0x551689) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x551689);

        _0x35dc1c();
    });
}

function _0x126bb5(_0x2af0e6) {
    try {
        if (typeof JSON.parse(_0x2af0e6) == "object") return true;
    } catch (_0x34dec8) {
        return console.log(_0x34dec8), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}


function _0x1adb16(_0x5b59d3) {
    const _0x43f8e0 = _0x5b59d3.getFullYear(),
        _0x2d22b9 = ("0" + (_0x5b59d3.getMonth() + 1)).slice(-2),
        _0xb03d33 = ("0" + _0x5b59d3.getDate()).slice(-2),
        _0x31b4ec = ("0" + _0x5b59d3.getHours()).slice(-2),
        _0x9faf39 = ("0" + _0x5b59d3.getMinutes()).slice(-2),
        _0x25f987 = ("0" + _0x5b59d3.getSeconds()).slice(-2);

    return _0x43f8e0 + "/" + _0x2d22b9 + "/" + _0xb03d33 + " " + _0x31b4ec + ":" + _0x9faf39 + ":" + _0x25f987;
}

function _0x2ad1e3(_0xc9150c) {
    if (typeof _0xc9150c == "string") {
        try {
            return JSON.parse(_0xc9150c);
        } catch (_0x49308f) {
            return console.log(_0x49308f), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }