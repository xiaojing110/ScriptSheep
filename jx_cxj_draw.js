
/*
京喜特价抽现金（抽奖+提现）  入口：京喜特价-首页-幸运抽奖
执行流程，抽奖--检查提现
运行一次抽奖次数,默认抽完，控制变量 JXCXJLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JXCXJDELAY='3'
开启提现到上限转红包 JXCXJTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
不提现变量 NOTX='true'
8 8 29 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_cxj_draw.js
 */

const $ = new Env('Jx特价抽现金_抽奖提现');
const _0x90fbef = $.isNode() ? require("./jdCookie.js") : "",
    _0x3cbf28 = require("./function/dylanz"),
    _0x1a1d3a = require("./USER_AGENTS");

let _0x2e7b0d = true,
    _0x3f89bb = [],
    _0x60aecc = [],
    _0x4c11ba = [],
    _0x1c4c7e = [],
    _0x4a060c,
    _0x5b2807 = [],
    _0x1483d4 = "",
    _0x25f07e = "",
    _0x5cc427 = process.env.JXCXJLTNUM || "-1",
    _0x11aea2 = process.env.JXCXJDELAY || "1",
    _0x47dc5b = process.env.TXDELAY || "5",
    _0x57f298 = process.env.TXIVAL || "1",
    _0x26d141 = process.env.JXCXJTORED || false,
    _0x3e7011 = process.env.TXSILENT || false,
    _0x5ea818 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    _0x4a060c = require("./function/proxy.js");
    $.dget = _0x4a060c.intoRequest($.get.bind($));
    $.dpost = _0x4a060c.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
    Object.keys(_0x90fbef).forEach(_0x3d8d6c => {
        _0x5b2807.push(_0x90fbef[_0x3d8d6c]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x5b2807 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0xcd9e21($.getdata("CookiesJD") || "[]").map(_0x4b4a4b => _0x4b4a4b.cookie)].filter(_0x50d46b => !!_0x50d46b);

$.banip = false;
!(async () => {
    if (!_0x5b2807[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
    $.log("\n当前版本：20231117 提现范围可控 ");
    console.log("执行流程：抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  JXCXJLTNUM='200'\n  每次抽奖间隔，默认1秒  JXCXJDELAY='3'\n  提现间隔，默认5秒  TXDELAY='90'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JXCXJTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");
    console.log("\n\n开始抽奖和提现...");
    _0x5cc427 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x5cc427);

    let _0x48f5e1 = new Date();

    _0x48f5e1.setDate(_0x48f5e1.getDate() - _0x57f298);

    for (let _0x4826e2 = 0; _0x4826e2 < _0x5b2807.length; _0x4826e2++) {
        if (_0x5b2807[_0x4826e2]) {
            _0x1483d4 = _0x5b2807[_0x4826e2];
            $.UserName = decodeURIComponent(_0x1483d4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1483d4.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x4826e2 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x60aecc = [];
            _0x4c11ba = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.UA = _0x1a1d3a.UARAM ? _0x1a1d3a.UARAM(1) : _0x1a1d3a.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x2835ee = await _0x19dbcc(1);

            if (_0x2835ee.code != "0") continue;
            $.log("本轮已抽奖次数：" + _0x2835ee.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x3d7974(new Date(Date.now() + _0x2835ee.data.countDownTime)));

            for (let _0x58729a = 0; _0x58729a < (_0x5cc427 > -1 && _0x5cc427 < $.times ? _0x5cc427 : $.times); _0x58729a++) {
                if ($.banip) break;
                process.stdout.write("\n第" + (_0x58729a + 1) + "次抽奖结果：");

                for (let _0x4c8982 of Array(3)) {
                    await _0x1451e3(_0x4c8982 + 1);
                    if (!$.hotflag) break;
                    await $.wait(Math.random() * 500 + _0x11aea2 * 1000);
                }

                if ($.end) break;
                await $.wait(Math.random() * 500 + _0x11aea2 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x4c11ba.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x4c11ba.reduce((_0x1296c0, _0x451471) => _0x1296c0 + _0x451471 * 100, 0) / 100 + "元");
            _0x60aecc.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x60aecc.reduce((_0x286d51, _0x594a79) => _0x286d51 + _0x594a79 * 100, 0) / 100 + "元");

            if (_0x5ea818 != "true") {
                if (new Date().getHours() < 7 && _0x3e7011) continue;
                $.log("\n开始提现（默认间隔5秒，变量TXDELAY）...");
                _0x26d141 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x512dfa = 0; _0x512dfa < 50; _0x512dfa++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) break;
                    await _0x15bb6e(_0x512dfa + 1);
                    await $.wait(1000);
                    if (!$.baglist || $.baglist.length === 0) break;

                    for (let _0x2ca341 of $.baglist) {
                        if (Math.max.apply(null, [new Date(_0x2ca341.createTime), new Date(_0x2ca341.startTime)]) < _0x48f5e1 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x2ca341.prizeType == 4) {
                            if (_0x2ca341.state == 0 || _0x2ca341.state == 2) {
                                process.stdout.write("" + Number(_0x2ca341.amount));

                                let _0x4ef100 = await _0x2afb5c(_0x2ca341, Number(_0x2ca341.amount));

                                $.txfail && (await $.wait(5000), _0x4ef100 = await _0x2afb5c(_0x2ca341, Number(_0x2ca341.amount)));
                                if (_0x4ef100.data.message.includes("上限") && _0x26d141 && $.toredfailnum < 5) await _0x456d10(_0x2ca341, Number(_0x2ca341.amount));
                                await $.wait(_0x47dc5b * 1000);
                            } else {
                                if (_0x2ca341.state == 8) { }
                            }
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x528d7a, _0x4740a8) => _0x528d7a + _0x4740a8 * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x4f54dc, _0x453265) => _0x4f54dc + _0x453265 * 100, 0) / 100 + "元");
            } else $.log("\n\n⚠已设置不提现！");

            _0x1c4c7e = [];
            await $.wait(2000);
        }
    }
})().catch(_0x3fae7c => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3fae7c + "!", "");
}).finally(() => {
    $.done();
});

async function _0x19dbcc(_0x56970f) {
    let _0x43c46e = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "inviter": ""
    },
        _0x5f1c98 = {
            "appId": "eb67b",
            "fn": "inviteFissionHome",
            "body": _0x43c46e,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x43c46e = await _0x3cbf28.getbody(_0x5f1c98);
    if (!_0x43c46e) return;
    return new Promise(async _0x2c373d => {
        $.dpost(_0x10773a(_0x43c46e), async (_0x4a2e4f, _0x10cb72, _0x1b4350) => {
            try {
                if (_0x4a2e4f) console.log("" + JSON.stringify(_0x4a2e4f)), console.log("homeinfo请求失败，请检查网路重试"); else {
                    _0x1b4350 = JSON.parse(_0x1b4350);

                    if (_0x1b4350.code == 0) {
                        $.times = _0x1b4350.data.prizeNum;
                        if (_0x56970f) console.log("我的助力码：" + _0x1b4350.data.inviter);

                        _0x3f89bb.push(_0x1b4350.data.inviter);
                    } else console.log(_0x1b4350.errMsg);
                }
            } catch (_0x4a3b43) {
                $.logErr(_0x4a3b43, _0x10cb72);
            } finally {
                _0x2c373d(_0x1b4350);
            }
        });
    });
}

async function _0x38bb40() {
    let _0x2c361d = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x4f87f1 = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x2c361d,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x2c361d = await _0x3cbf28.getbody(_0x4f87f1);
    if (!_0x2c361d) return;
    return new Promise(async _0x1db7f3 => {
        $.dpost(_0x10773a(_0x2c361d), async (_0xab6f2a, _0x447d93, _0x1ab482) => {
            try {
                if (_0xab6f2a) console.log("" + JSON.stringify(_0xab6f2a)), console.log("receive请求失败，请检查网路重试"), _0xab6f2a.includes("403") && ($.banip = true); else {
                    _0x1ab482 = JSON.parse(_0x1ab482);

                    if (_0x1ab482.code == 0) {
                        process.stdout.write("----提现金：" + _0x1ab482.data.amount);
                    } else $.txj = false;
                }
            } catch (_0x5b8ebb) {
                $.logErr(_0x5b8ebb, _0x447d93);
            } finally {
                _0x1db7f3(_0x1ab482);
            }
        });
    });
}

async function _0x1451e3(_0x1b822c) {
    let _0x29ce7d = {
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
    },
        _0x3989ad = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x29ce7d,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x29ce7d = await _0x3cbf28.getbody(_0x3989ad);
    if (!_0x29ce7d) return;
    return new Promise(async _0x5e940d => {
        $.dpost(_0x10773a(_0x29ce7d), async (_0x413533, _0x5df612, _0x3898ff) => {
            try {
                if (_0x413533) console.log("" + JSON.stringify(_0x413533)), console.log("lottery请求失败，请检查网路重试"), _0x413533.includes("403") && ($.banip = true); else {
                    _0x3898ff = JSON.parse(_0x3898ff);

                    if (_0x3898ff.code == 0) {
                        const _0x333891 = _0x3898ff.data.prizeType;
                        if (!_0x333891) fail++;

                        switch (_0x333891) {
                            case 1:
                                process.stdout.write("垃.圾.券😤"), $.fail++, $.hotflag = false;
                                break;

                            case 6:
                                process.stdout.write("京喜礼包💩"), $.hotflag = false;
                                break;

                            case 4:
                                let _0xe29051 = parseFloat(_0x3898ff.data.prizeValue).toFixed(2);

                                process.stdout.write(_0xe29051 + "现金💰️"), _0x60aecc.push(_0xe29051), _0x1c4c7e.push({
                                    "prizeValue": _0x3898ff.data.prizeValue,
                                    "id": _0x3898ff.data.id,
                                    "poolBaseId": _0x3898ff.data.poolBaseId,
                                    "prizeGroupId": _0x3898ff.data.prizeGroupId,
                                    "prizeBaseId": _0x3898ff.data.prizeBaseId
                                }), $.fail = 0, $.hotflag = false;
                                break;

                            case 2:
                                let _0x1dc0ba = parseFloat(_0x3898ff.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x1dc0ba + "红包🧧"), _0x4c11ba.push(_0x1dc0ba), $.fail = 0, $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false, console.log(JSON.stringify(_0x3898ff.data));
                        }
                    } else {
                        if (_0x3898ff.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true; else {
                            if (_0x3898ff.errMsg.includes("结束")) {
                                $.end = true;
                                $.hotflag = false;
                                console.log(_0x3898ff.errMsg);
                            } else $.hotflag = false, console.log(_0x3898ff.errMsg);
                        }
                    }
                }
            } catch (_0x4df494) {
                $.logErr(_0x4df494, _0x5df612);
            } finally {
                _0x5e940d(_0x3898ff);
            }
        });
    });
}

async function _0x15bb6e(_0x28fb32) {
    let _0x466666 = {
        "pageNum": _0x28fb32,
        "pageSize": 100,
        "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
        "business": "fission"
    },
        _0x45309c = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x466666,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x466666 = await _0x3cbf28.getbody(_0x45309c);
    if (!_0x466666) return;
    return new Promise(async _0x17ad17 => {
        $.dget(_0x10773a(_0x466666), async (_0x5e0140, _0x303697, _0x5225be) => {
            try {
                _0x5e0140 ? (console.log("" + JSON.stringify(_0x5e0140)), console.log(" API请求失败，请检查网路重试"), _0x5e0140.includes("403") && ($.banip = true)) : (_0x5225be = JSON.parse(_0x5225be), _0x5225be.code == 0 ? $.baglist = _0x5225be.data.items : console.log(_0x5225be.errMsg));
            } catch (_0x19693c) {
                $.logErr(_0x19693c, _0x303697);
            } finally {
                _0x17ad17(_0x5225be);
            }
        });
    });
}

async function _0x2afb5c(_0x3cf027, _0x3a98fe) {
    let _0x26dc7a = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x3cf027.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x3cf027.poolBaseId + ",\"prizeGroupId\":" + _0x3cf027.prizeGroupId + ",\"prizeBaseId\":" + _0x3cf027.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x3cb8d2 => {
        $.dpost(_0x10773a(_0x26dc7a), async (_0x498724, _0x53a956, _0x571613) => {
            try {
                if (_0x498724) console.log("" + JSON.stringify(_0x498724)), console.log("apCashWithDraw请求失败，请检查网路重试"), _0x498724.includes("403") && ($.banip = true); else {
                    _0x571613 = JSON.parse(_0x571613);

                    if (_0x571613.code == 0) {
                        if (_0x571613.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x571613.data.message.includes("上限")) !_0x26d141 && console.log("提现到上限"), $.txfull = true, $.txfail = false; else {
                                if (_0x571613.data.message.includes("提现")) {
                                    process.stdout.write("✅ ");
                                    $.txsuc.push(_0x3a98fe);
                                    $.txfail = false;
                                } else console.log(_0x571613.data.message);
                            }
                        }
                    } else {
                        console.log(_0x571613.errMsg);
                    }
                }
            } catch (_0x11ae29) {
                $.logErr(_0x11ae29, _0x53a956);
            } finally {
                _0x3cb8d2(_0x571613);
            }
        });
    });
}

async function _0x456d10(_0x502b7c, _0x10d1ff) {
    let _0x5ddc63 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x502b7c.id + ",\"business\":\"fission\",\"poolId\":" + _0x502b7c.poolBaseId + ",\"prizeGroupId\":" + _0x502b7c.prizeGroupId + ",\"prizeId\":" + _0x502b7c.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
        _0x414bc4 = {
            "url": "https://api.m.jd.com/api",
            "body": _0x5ddc63,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x1483d4
            }
        };

    return new Promise(async _0x55378e => {
        $.dpost(_0x414bc4, async (_0x4ddb9e, _0x2adf47, _0x205ec5) => {
            try {
                if (_0x4ddb9e) console.log("" + JSON.stringify(_0x4ddb9e)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试"), _0x4ddb9e.includes("403") && ($.banip = true); else {
                    _0x205ec5 = JSON.parse(_0x205ec5);

                    if (_0x205ec5.code == 0) {
                        if (_0x205ec5.data.resCode === "0") process.stdout.write("🧧 "), $.toredsuc.push(_0x10d1ff); else {
                            process.stdout.write("❎ ");
                            $.toredfailnum++;
                        }
                    } else _0x205ec5.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x205ec5.errMsg);
                }
            } catch (_0x4f98ea) {
                $.logErr(_0x4f98ea, _0x2adf47);
            } finally {
                _0x55378e(_0x205ec5);
            }
        });
    });
}

function _0x10773a(_0x4dda36) {
    return {
        "url": "https://api.m.jd.com/?" + _0x4dda36,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x1483d4
        }
    };
}

function _0x433eef() {
    return new Promise(_0x586b5e => {
        const _0x49b4f0 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x1483d4,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x49b4f0, (_0x39d52c, _0x26cd01, _0x3c57b6) => {
            try {
                if (_0x3c57b6) {
                    _0x3c57b6 = JSON.parse(_0x3c57b6);

                    if (_0x3c57b6.islogin === "1") { } else _0x3c57b6.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x88011b) {
                console.log(_0x88011b);
            } finally {
                _0x586b5e();
            }
        });
    });
}

function _0x1d374a() {
    return new Promise(_0x324d51 => {
        !_0x2e7b0d ? $.msg($.name, "", "" + _0x25f07e) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x25f07e);

        _0x324d51();
    });
}

function _0x40b520(_0x3945e7) {
    try {
        if (typeof JSON.parse(_0x3945e7) == "object") {
            return true;
        }
    } catch (_0x14b4e3) {
        return console.log(_0x14b4e3), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x3d7974(_0xa26f6f) {
    const _0x2ac7fb = _0xa26f6f.getFullYear(),
        _0x6c703 = ("0" + (_0xa26f6f.getMonth() + 1)).slice(-2),
        _0x3ba7bd = ("0" + _0xa26f6f.getDate()).slice(-2),
        _0x14f448 = ("0" + _0xa26f6f.getHours()).slice(-2),
        _0x2e1d35 = ("0" + _0xa26f6f.getMinutes()).slice(-2),
        _0x18371c = ("0" + _0xa26f6f.getSeconds()).slice(-2);

    return _0x2ac7fb + "/" + _0x6c703 + "/" + _0x3ba7bd + " " + _0x14f448 + ":" + _0x2e1d35 + ":" + _0x18371c;
}

function _0xcd9e21(_0xa6a28a) {
    if (typeof _0xa6a28a == "string") try {
        return JSON.parse(_0xa6a28a);
    } catch (_0x5b8e05) {
        return console.log(_0x5b8e05), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }