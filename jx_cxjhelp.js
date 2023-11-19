
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
updatetime:2023/11/17
 */

const $ = new Env('Jx特价抽现金');
const _0x25ef75 = $.isNode() ? require("./sendNotify") : "",
    _0x178cbe = $.isNode() ? require("./jdCookie.js") : "",
    _0xfe89ce = require("./function/dylanz"),
    _0x526240 = require("./USER_AGENTS");

let _0x384aca = true,
    _0x255f82 = [],
    _0xf2d60a = [],
    _0x14498f = [],
    _0x775f88 = [],
    _0x453b27,
    _0x60e66c = [],
    _0x2ecd1b = "",
    _0x43ce40 = "",
    _0x5d514b = "",
    _0xc67f32 = "",
    _0x17a01d,
    _0x41fd32 = process.env.JXCXJNUM || "9999",
    _0x260fff = process.env.JXCXJLTNUM || "-1",
    _0x442dfc = process.env.JXCXJDELAY || "1",
    _0x15def7 = process.env.TXDELAY || "5",
    _0x252d0b = process.env.TXIVAL || "1",
    _0x4948e4 = process.env.JXCXJTORED || false,
    _0x423dd8 = process.env.JXCTOPPIN || "",
    _0x35ed97 = process.env.TXSILENT || false,
    _0x204cfb = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    _0x453b27 = require("./function/proxy.js");
    $.dget = _0x453b27.intoRequest($.get.bind($));
    $.dpost = _0x453b27.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
    Object.keys(_0x178cbe).forEach(_0x17c3fb => {
        _0x60e66c.push(_0x178cbe[_0x17c3fb]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x60e66c = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x169dfc($.getdata("CookiesJD") || "[]").map(_0x1261af => _0x1261af.cookie)].filter(_0x409fc4 => !!_0x409fc4);

$.banip = false;
!(async () => {
    if (!_0x60e66c[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231117 提现范围可控");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  指定PIN车头，不指定默认CK1  JXCTOPPIN='jdpin'\n  多少助力停止，默认9999个  JXCXJNUM='100'\n  运行一次抽奖次数,默认抽完  JXCXJLTNUM='200'\n  每次抽奖间隔，默认1秒，单位秒  JXCXJDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='8'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JXCXJTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");


    if (_0x423dd8) {
        console.log("\n已指定PIN：" + _0x423dd8);

        let _0x174bd6 = _0x60e66c.findIndex(_0x195cc5 => _0x195cc5.includes(_0x423dd8));

        if (_0x174bd6 == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x43ce40 = _0x60e66c[_0x174bd6];
    } else console.log("\n未指定PIN默认CK1车头"), _0x43ce40 = _0x60e66c[0];

    _0x2ecd1b = _0x43ce40;
    $.UserName = decodeURIComponent(_0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x526240.UARAM ? _0x526240.UARAM(1) : _0x526240.USER_AGENT;
    console.log("\n————————————————————车头开团————————————————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x5ba5f9();

    if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x25ef75.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x2fbe14(1);
    await $.wait(1000);

    console.log("————————————————————————————————————————————————————");
    console.log("\n\n———————————————————开始助力车头—————————————————————");
    _0x17a01d = 0;

    for (let _0x4d1b54 of _0x255f82) {
        if ($.banip) break;

        if (_0x60e66c.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x4d1b54);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x456c90 = _0x17a01d; _0x456c90 < _0x60e66c.length; _0x456c90++) {
            if (_0x60e66c[_0x456c90]) {
                _0x2ecd1b = _0x60e66c[_0x456c90];
                $.UserName = decodeURIComponent(_0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x456c90 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x526240.UARAM ? _0x526240.UARAM(1) : _0x526240.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x4f7058(_0x4d1b54);

                if ($.suc > Number(_0x41fd32) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x17a01d = _0x456c90 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x60e66c.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
    _0x260fff > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x260fff);

    let _0x49c298 = new Date();

    _0x49c298.setDate(_0x49c298.getDate() - _0x252d0b);

    _0x2ecd1b = _0x43ce40;
    $.UserName = decodeURIComponent(_0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ecd1b.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.fail = 0;
    _0xf2d60a = [];
    _0x14498f = [];
    $.txj = true;
    $.fg = 1;
    $.txfull = false;
    $.nocashnum = 0;
    $.end = false;
    $.hotflag = false;
    $.toredfailnum = 0;
    $.UA = _0x526240.UARAM ? _0x526240.UARAM(1) : _0x526240.USER_AGENT;

    let _0x472f2b = await _0x2fbe14(0);

    if (_0x472f2b.code != "0") return;
    $.log("本轮已抽奖次数：" + _0x472f2b.data.drawPrizeNum);
    $.log("本轮剩余抽奖次数：" + $.times);
    $.log("本轮结束时间： " + _0x226a8c(new Date(Date.now() + _0x472f2b.data.countDownTime)));

    for (let _0x1d1bbe = 0; _0x1d1bbe < (_0x260fff > -1 && _0x260fff < $.times ? _0x260fff : $.times); _0x1d1bbe++) {
        if ($.banip) break;
        process.stdout.write("\n第" + (_0x1d1bbe + 1) + "次抽奖结果：");

        for (let _0x279862 of Array(3)) {
            await _0x1b501a(_0x279862 + 1);
            if (!$.hotflag) break;
            await $.wait(Math.random() * 500 + _0x442dfc * 1000);
        }

        if ($.end) break;
        await $.wait(Math.random() * 500 + _0x442dfc * 1000);

        if ($.fail > 2) {
            $.log("连续3次优惠券，不继续抽了");
            break;
        }
    }

    _0x14498f.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x14498f.reduce((_0x48bb01, _0x316d4c) => _0x48bb01 + _0x316d4c * 100, 0) / 100 + "元");
    _0xf2d60a.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0xf2d60a.reduce((_0x446fee, _0x719c4a) => _0x446fee + _0x719c4a * 100, 0) / 100 + "元");

    if (_0x204cfb != "true") {
        if (new Date().getHours() < 7 && _0x35ed97) return;
        $.log("\n——————————开始提现（默认间隔5秒，变量TXDELAY）——————");
        _0x4948e4 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x36ff72 = 0; _0x36ff72 < 50; _0x36ff72++) {
            if ($.nocashnum > 2 || $.toredfailnum > 4) break;
            await _0x4d10f5(_0x36ff72 + 1);
            await $.wait(1000);
            if (!$.baglist || $.baglist.length === 0) break;

            for (let _0x3d1f62 of $.baglist) {
                if (Math.max.apply(null, [new Date(_0x3d1f62.createTime), new Date(_0x3d1f62.startTime)]) < _0x49c298 || $.toredfailnum > 4) {
                    $.nocashnum = 5;
                    break;
                }

                if (_0x3d1f62.prizeType == 4) {
                    if (_0x3d1f62.state == 0 || _0x3d1f62.state == 2) {
                        process.stdout.write("" + Number(_0x3d1f62.amount));

                        let _0xc733a4 = await _0x413c5d(_0x3d1f62, Number(_0x3d1f62.amount));

                        $.txfail && (await $.wait(5000), _0xc733a4 = await _0x413c5d(_0x3d1f62, Number(_0x3d1f62.amount)));
                        if (_0xc733a4.data.message.includes("上限") && _0x4948e4 && $.toredfailnum < 5) await _0x538024(_0x3d1f62, Number(_0x3d1f62.amount));
                        await $.wait(_0x15def7 * 1000);
                    } else {
                        if (_0x3d1f62.state == 8) { }
                    }
                }
            }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x168d17, _0x3e0e5f) => _0x168d17 + _0x3e0e5f * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x8113ee, _0x2783dd) => _0x8113ee + _0x2783dd * 100, 0) / 100 + "元");
    } else $.log("\n\n⚠已设置不提现！");

    _0x775f88 = [];
    await $.wait(2000);
})().catch(_0x36ae6c => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x36ae6c + "!", "");
}).finally(() => {
    $.done();
});

async function _0x2fbe14(_0x2eadf1) {
    let _0x3d7bdd = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "inviter": ""
    },
        _0x18fe3b = {
            "appId": "eb67b",
            "fn": "inviteFissionHome",
            "body": _0x3d7bdd,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x3d7bdd = await _0xfe89ce.getbody(_0x18fe3b);
    if (!_0x3d7bdd) return;
    return new Promise(async _0x4e80b0 => {
        $.dpost(_0x5e37b1(_0x3d7bdd), async (_0x324e89, _0x168087, _0x134b5d) => {
            try {
                if (_0x324e89) console.log("" + JSON.stringify(_0x324e89)), console.log("homeinfo请求失败，请检查网路重试"); else {
                    _0x134b5d = JSON.parse(_0x134b5d);

                    if (_0x134b5d.code == 0) {
                        $.times = _0x134b5d.data.prizeNum;
                        if (_0x2eadf1) console.log("我的助力码：" + _0x134b5d.data.inviter);

                        _0x255f82.push(_0x134b5d.data.inviter);
                    } else {
                        console.log(_0x134b5d.errMsg);
                    }
                }
            } catch (_0x31c655) {
                $.logErr(_0x31c655, _0x168087);
            } finally {
                _0x4e80b0(_0x134b5d);
            }
        });
    });
}

async function _0x5730fa() {
    let _0x64c1c0 = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x2aec3c = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x64c1c0,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x64c1c0 = await _0xfe89ce.getbody(_0x2aec3c);
    if (!_0x64c1c0) return;
    return new Promise(async _0x1a6e6a => {
        $.dpost(_0x5e37b1(_0x64c1c0), async (_0x557847, _0x56ccba, _0x25daaa) => {
            try {
                _0x557847 ? (console.log("" + JSON.stringify(_0x557847)), console.log("receive请求失败，请检查网路重试"), _0x557847.includes("403") && ($.banip = true)) : (_0x25daaa = JSON.parse(_0x25daaa), _0x25daaa.code == 0 ? process.stdout.write("----提现金：" + _0x25daaa.data.amount) : $.txj = false);
            } catch (_0x751171) {
                $.logErr(_0x751171, _0x56ccba);
            } finally {
                _0x1a6e6a(_0x25daaa);
            }
        });
    });
}

async function _0x1b501a(_0x3e53c7) {
    let _0x72290e = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x1be14a = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x72290e,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x72290e = await _0xfe89ce.getbody(_0x1be14a);
    if (!_0x72290e) return;
    return new Promise(async _0x463d5b => {
        $.dpost(_0x5e37b1(_0x72290e), async (_0x12a0c9, _0x2fe1e1, _0x4fd854) => {
            try {
                if (_0x12a0c9) {
                    console.log("" + JSON.stringify(_0x12a0c9));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x12a0c9.includes("403") && ($.banip = true);
                } else {
                    _0x4fd854 = JSON.parse(_0x4fd854);

                    if (_0x4fd854.code == 0) {
                        const _0x9e0884 = _0x4fd854.data.prizeType;
                        if (!_0x9e0884) fail++;

                        switch (_0x9e0884) {
                            case 1:
                                process.stdout.write("垃.圾.券😤"), $.fail++, $.hotflag = false;
                                break;

                            case 6:
                                process.stdout.write("京喜礼包💩"), $.hotflag = false;
                                break;

                            case 4:
                                let _0x715c70 = parseFloat(_0x4fd854.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x715c70 + "现金💰️"), _0xf2d60a.push(_0x715c70), _0x775f88.push({
                                    "prizeValue": _0x4fd854.data.prizeValue,
                                    "id": _0x4fd854.data.id,
                                    "poolBaseId": _0x4fd854.data.poolBaseId,
                                    "prizeGroupId": _0x4fd854.data.prizeGroupId,
                                    "prizeBaseId": _0x4fd854.data.prizeBaseId
                                }), $.fail = 0, $.hotflag = false;
                                break;

                            case 2:
                                let _0x1561c6 = parseFloat(_0x4fd854.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x1561c6 + "红包🧧"), _0x14498f.push(_0x1561c6), $.fail = 0, $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false, console.log(JSON.stringify(_0x4fd854.data));
                        }
                    } else {
                        if (_0x4fd854.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true; else {
                            if (_0x4fd854.errMsg.includes("结束")) {
                                $.end = true;
                                $.hotflag = false;
                                console.log(_0x4fd854.errMsg);
                            } else $.hotflag = false, console.log(_0x4fd854.errMsg);
                        }
                    }
                }
            } catch (_0x565c38) {
                $.logErr(_0x565c38, _0x2fe1e1);
            } finally {
                _0x463d5b(_0x4fd854);
            }
        });
    });
}

async function _0x4d10f5(_0x32070d) {
    let _0xc949d5 = {
        "pageNum": _0x32070d,
        "pageSize": 100,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    },
        _0x1a57c6 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0xc949d5,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0xc949d5 = await _0xfe89ce.getbody(_0x1a57c6);
    if (!_0xc949d5) return;
    return new Promise(async _0x1fdb55 => {
        $.dget(_0x5e37b1(_0xc949d5), async (_0x1c8f99, _0x1e436c, _0x29f43d) => {
            try {
                _0x1c8f99 ? (console.log("" + JSON.stringify(_0x1c8f99)), console.log(" API请求失败，请检查网路重试"), _0x1c8f99.includes("403") && ($.banip = true)) : (_0x29f43d = JSON.parse(_0x29f43d), _0x29f43d.code == 0 ? $.baglist = _0x29f43d.data.items : console.log(_0x29f43d.errMsg));
            } catch (_0x378568) {
                $.logErr(_0x378568, _0x1e436c);
            } finally {
                _0x1fdb55(_0x29f43d);
            }
        });
    });
}

async function _0x4f7058(_0x4a8d38) {
    let _0x301dbd = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "isJdApp": true,
        "inviter": _0x4a8d38
    },
        _0x5528f4 = {
            "appId": "c5389",
            "fn": "inviteFissionhelp",
            "body": _0x301dbd,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x301dbd = await _0xfe89ce.getbody(_0x5528f4);
    if (!_0x301dbd) return;
    return new Promise(async _0x291dfc => {
        $.dpost(_0x5e37b1(_0x301dbd), async (_0x1e45f0, _0x5977e0, _0x19b310) => {
            try {
                if (_0x1e45f0) console.log("" + JSON.stringify(_0x1e45f0)), console.log("help请求失败，请检查网路重试"), _0x1e45f0.includes("403") && ($.banip = true); else {
                    _0x19b310 = JSON.parse(_0x19b310);

                    if (_0x19b310.code == 0) {
                        if (!_0x19b310.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x19b310.data.helpResult == 1) $.suc++, $.alr = 0, console.log("结果：助力成功 ✅ " + ($.suc || "")); else {
                            if (_0x19b310.data.helpResult == 6) console.log("结果：已经助力过TA！"), $.alr++; else {
                                if (_0x19b310.data.helpResult == 3) console.log("结果：没有次数了！"), $.nohelp = true, $.nhp++; else {
                                    if (_0x19b310.data.helpResult == 2) $.log("结果：助力黑了 💣"), $.hot = true; else {
                                        if (_0x19b310.data.helpResult == 4) $.log("结果：没有助力次数！"), $.nhp++; else _0x19b310.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x19b310));
                                    }
                                }
                            }
                        }
                    } else console.log(_0x19b310.errMsg);
                }
            } catch (_0x227729) {
                $.logErr(_0x227729, _0x5977e0);
            } finally {
                _0x291dfc(_0x19b310);
            }
        });
    });
}

async function _0x413c5d(_0x17159e, _0x4d7f52) {
    let _0xd83195 = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x17159e.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x17159e.poolBaseId + ",\"prizeGroupId\":" + _0x17159e.prizeGroupId + ",\"prizeBaseId\":" + _0x17159e.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x27a208 => {
        $.dpost(_0x5e37b1(_0xd83195), async (_0x2ee097, _0x29f59a, _0xf6c998) => {
            try {
                if (_0x2ee097) console.log("" + JSON.stringify(_0x2ee097)), console.log("apCashWithDraw请求失败，请检查网路重试"), _0x2ee097.includes("403") && ($.banip = true); else {
                    _0xf6c998 = JSON.parse(_0xf6c998);

                    if (_0xf6c998.code == 0) {
                        if (_0xf6c998.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0xf6c998.data.message.includes("上限")) {
                                !_0x4948e4 && console.log("提现到上限");
                                $.txfull = true;
                                $.txfail = false;
                            } else _0xf6c998.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x4d7f52), $.txfail = false) : console.log(_0xf6c998.data.message);
                        }
                    } else console.log(_0xf6c998.errMsg);
                }
            } catch (_0x3deaeb) {
                $.logErr(_0x3deaeb, _0x29f59a);
            } finally {
                _0x27a208(_0xf6c998);
            }
        });
    });
}

async function _0x538024(_0x1ffce4, _0x3d2b92) {
    let _0x266ad2 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x1ffce4.id + ",\"business\":\"fission\",\"poolId\":" + _0x1ffce4.poolBaseId + ",\"prizeGroupId\":" + _0x1ffce4.prizeGroupId + ",\"prizeId\":" + _0x1ffce4.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
        _0x45e4e3 = {
            "url": "https://api.m.jd.com/api",
            "body": _0x266ad2,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x2ecd1b
            }
        };

    return new Promise(async _0x28d257 => {
        $.dpost(_0x45e4e3, async (_0x1ea53a, _0x98f6a7, _0x27afa1) => {
            try {
                if (_0x1ea53a) console.log("" + JSON.stringify(_0x1ea53a)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试"), _0x1ea53a.includes("403") && ($.banip = true); else {
                    _0x27afa1 = JSON.parse(_0x27afa1);

                    if (_0x27afa1.code == 0) {
                        _0x27afa1.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x3d2b92)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else _0x27afa1.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x27afa1.errMsg);
                }
            } catch (_0x26d8c2) {
                $.logErr(_0x26d8c2, _0x98f6a7);
            } finally {
                _0x28d257(_0x27afa1);
            }
        });
    });
}

function _0x5e37b1(_0x5dc2eb) {
    return {
        "url": "https://api.m.jd.com/?" + _0x5dc2eb,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x2ecd1b
        }
    };
}

function _0x5ba5f9() {
    return new Promise(_0x470ab4 => {
        const _0x257ea5 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x2ecd1b,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x257ea5, (_0x2b2c6b, _0x5dc16c, _0xdba715) => {
            try {
                if (_0xdba715) {
                    _0xdba715 = JSON.parse(_0xdba715);

                    if (_0xdba715.islogin === "1") { } else _0xdba715.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x3447c2) {
                console.log(_0x3447c2);
            } finally {
                _0x470ab4();
            }
        });
    });
}

function _0x5a221d() {
    return new Promise(_0x36f011 => {
        !_0x384aca ? $.msg($.name, "", "" + _0x5d514b) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x5d514b);

        _0x36f011();
    });
}

function _0x1608a4(_0x225b4c) {
    try {
        if (typeof JSON.parse(_0x225b4c) == "object") {
            return true;
        }
    } catch (_0x362747) {
        return console.log(_0x362747), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}


function _0x226a8c(_0x2a8305) {
    const _0x38b51d = _0x2a8305.getFullYear(),
        _0x429189 = ("0" + (_0x2a8305.getMonth() + 1)).slice(-2),
        _0x57c182 = ("0" + _0x2a8305.getDate()).slice(-2),
        _0x460204 = ("0" + _0x2a8305.getHours()).slice(-2),
        _0x476c87 = ("0" + _0x2a8305.getMinutes()).slice(-2),
        _0x2b894d = ("0" + _0x2a8305.getSeconds()).slice(-2);

    return _0x38b51d + "/" + _0x429189 + "/" + _0x57c182 + " " + _0x460204 + ":" + _0x476c87 + ":" + _0x2b894d;
}

function _0x169dfc(_0x4c0ac6) {
    if (typeof _0x4c0ac6 == "string") {
        try {
            return JSON.parse(_0x4c0ac6);
        } catch (_0xc73a55) {
            return console.log(_0xc73a55), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }