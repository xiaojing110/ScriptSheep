
/*
转赚红包,只抽奖提现
1 1 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb_draw.js
updatetime:2023/11/17
 */

const $ = new Env('Jd转赚红包_抽奖提现');
const _0x404713 = $.isNode() ? require("./jdCookie.js") : "",
    _0x388e5c = require("./function/dylanz"),
    _0xb9cefd = require("./USER_AGENTS");

let _0x1db49d = true,
    _0x3abf61 = [],
    _0x46ed40 = [],
    _0x54a94c = [],
    _0x3126a0 = [],
    _0x12eeba,
    _0x379995 = [],
    _0x3afb20 = "",
    _0x18dc72 = "";

const _0x2e42ee = process.env.JDZHBLTNUM || "-1",
    _0x511403 = process.env.JDZHBDELAY || "1",
    _0x1426b0 = process.env.TXDELAY || "5",
    _0x418d92 = process.env.TXIVAL || "1",
    _0x77e9f3 = process.env.JDZHBTORED || false,
    _0xf1a2ef = process.env.TXSILENT || false,
    _0x263ae9 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    _0x12eeba = require("./function/proxy.js");
    $.dget = _0x12eeba.intoRequest($.get.bind($));
    $.dpost = _0x12eeba.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
    Object.keys(_0x404713).forEach(_0x4cbd59 => {
        _0x379995.push(_0x404713[_0x4cbd59]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x379995 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x53b31e($.getdata("CookiesJD") || "[]").map(_0x2da8f3 => _0x2da8f3.cookie)].filter(_0x1e6878 => !!_0x1e6878);

$.banip = false;
!(async () => {
    if (!_0x379995[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
    $.log("\n当前版本：20231117 提现范围变量控制");
    console.log("执行流程，抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒  TXDELAY='90'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");
    console.log("\n开始抽奖和提现...");
    _0x2e42ee > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x2e42ee);

    let _0x703e28 = new Date();

    _0x703e28.setDate(_0x703e28.getDate() - _0x418d92);

    for (let _0x47dad8 = 0; _0x47dad8 < _0x379995.length; _0x47dad8++) {
        if (_0x379995[_0x47dad8]) {
            _0x3afb20 = _0x379995[_0x47dad8];
            $.UserName = decodeURIComponent(_0x3afb20.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3afb20.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x47dad8 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x46ed40 = [];
            _0x54a94c = [];
            txjscore = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.txjsuc = false;
            $.UA = _0xb9cefd.UARAM ? _0xb9cefd.UARAM() : _0xb9cefd.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x1246a4 = await _0x5d8f09(1);

            if (_0x1246a4.code != "0") continue;
            $.log("本轮已抽奖次数：" + _0x1246a4.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);

            if (_0x1246a4.data.cashVo) {
                if (_0x1246a4.data?.["cashVo"]?.["state"] === 1) $.log("本轮提现金进度：" + _0x1246a4.data.cashVo.amount + "/" + _0x1246a4.data.cashVo.totalAmount + "(-" + _0x1246a4.data.cashVo.leftAmount + ")"); else _0x1246a4.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x1246a4.data.cashVo.amount + "/" + _0x1246a4.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
            } else {
                $.txj = false;
            }

            $.log("本轮结束时间： " + _0x3e62c7(new Date(Date.now() + _0x1246a4.data.countDownTime)));

            for (let _0x39541d = 0; _0x39541d < (_0x2e42ee > -1 && _0x2e42ee < $.times ? _0x2e42ee : $.times); _0x39541d++) {
                if ($.banip) break;
                process.stdout.write("\n第" + (_0x39541d + 1) + "次抽奖结果：");

                for (let _0x3ea3df of Array(3)) {
                    await _0x3e280c(_0x3ea3df + 1);
                    if (!$.hotflag) break;
                    await $.wait(Math.random() * 500 + _0x511403 * 1000);
                }

                if ($.end) break;
                $.txj && (await _0x2f865d());
                await $.wait(Math.random() * 500 + _0x511403 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x54a94c.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x54a94c.reduce((_0x554057, _0x303d6c) => _0x554057 + _0x303d6c * 100, 0) / 100 + "元");
            _0x46ed40.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x46ed40.reduce((_0x43186c, _0xfe4c08) => _0x43186c + _0xfe4c08 * 100, 0) / 100 + "元");

            if (txjscore.length !== 0) {
                let _0x5dd0a0 = txjscore.reduce((_0x3e82e5, _0x665102) => _0x3e82e5 + _0x665102 * 100, 0) / 100;

                $.log("\n\n本次抽奖获得提现金：" + _0x5dd0a0 + "个, 平均" + (_0x5dd0a0 / (_0x2e42ee > -1 ? Math.min.apply(null, [_0x2e42ee, $.times]) : $.times)).toFixed(4) + "个/抽");
            }

            if (_0x263ae9 != "true") {
                if (new Date().getHours() < 6 && _0xf1a2ef) continue;
                $.log("\n开始提现（默认间隔5秒，变量TXDELAY）...");
                _0x77e9f3 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x487a01 = 0; _0x487a01 < 50; _0x487a01++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) break;
                    await _0x53a948(_0x487a01 + 1);
                    await $.wait(1000);
                    if (!$.baglist || $.baglist.length === 0) break;

                    for (let _0x553454 of $.baglist) {
                        if (Math.max.apply(null, [new Date(_0x553454.createTime), new Date(_0x553454.startTime)]) < _0x703e28 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x553454.prizeType == 4) {
                            if (_0x553454.state == 0 || _0x553454.state == 2) {
                                process.stdout.write("" + Number(_0x553454.amount));

                                let _0x9239c7 = await _0x4e30af(_0x553454, Number(_0x553454.amount));

                                $.txfail && (await $.wait(5000), _0x9239c7 = await _0x4e30af(_0x553454, Number(_0x553454.amount)));
                                if (_0x9239c7.data.message.includes("上限") && _0x77e9f3 && $.toredfailnum < 5) await _0x14e8ac(_0x553454, Number(_0x553454.amount));
                                await $.wait(_0x1426b0 * 1000);
                            } else {
                                if (_0x553454.state == 8) { }
                            }
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x4b4397, _0x423cb5) => _0x4b4397 + _0x423cb5 * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x29ea00, _0xd497ce) => _0x29ea00 + _0xd497ce * 100, 0) / 100 + "元");
            } else $.log("\n\n⚠已设置不提现！");

            _0x3126a0 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x4c60ca => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4c60ca + "!", "");
}).finally(() => {
    $.done();
});

async function _0x5d8f09(_0x5ad57e) {
    let _0x1ed9cc = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "inviter": ""
    },
        _0x4a87a3 = {
            "appId": "eb67b",
            "fn": "inviteFissionHome",
            "body": _0x1ed9cc,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x1ed9cc = await _0x388e5c.getbody(_0x4a87a3);
    if (!_0x1ed9cc) return;
    return new Promise(async _0x3f5d22 => {
        $.dpost(_0x82540d(_0x1ed9cc), async (_0x251afc, _0x858e13, _0x134279) => {
            try {
                if (_0x251afc) console.log("" + JSON.stringify(_0x251afc)), console.log("homeinfo请求失败，请检查网路重试"); else {
                    _0x134279 = JSON.parse(_0x134279);

                    if (_0x134279.code == 0) {
                        $.times = _0x134279.data.prizeNum;
                        if (_0x5ad57e) console.log("我的助力码：" + _0x134279.data.inviter);

                        _0x3abf61.push(_0x134279.data.inviter);
                    } else console.log(_0x134279.errMsg);
                }
            } catch (_0x5610a0) {
                $.logErr(_0x5610a0, _0x858e13);
            } finally {
                _0x3f5d22(_0x134279);
            }
        });
    });
}

async function _0x2f865d() {
    let _0x278359 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x28125b = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x278359,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x278359 = await _0x388e5c.getbody(_0x28125b);
    if (!_0x278359) return;
    return new Promise(async _0x44a13a => {
        $.dpost(_0x82540d(_0x278359), async (_0x1ddcec, _0x2d3878, _0x5e46f9) => {
            try {
                if (_0x1ddcec) console.log("" + JSON.stringify(_0x1ddcec)), console.log("receive请求失败，请检查网路重试"), _0x1ddcec.includes("403") && ($.banip = true); else {
                    _0x5e46f9 = JSON.parse(_0x5e46f9);
                    if (_0x5e46f9.code == 0) process.stdout.write("----提现金" + _0x5e46f9.data.amount + "(+" + _0x5e46f9.data.receiveList[0].amount + ")"), txjscore.push(_0x5e46f9.data.receiveList[0].amount), _0x5e46f9.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true); else {
                        if (_0x5e46f9.code == 80208) process.stdout.write("----送的抽奖次数没有提现金"); else _0x5e46f9.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x5e46f9));
                    }
                }
            } catch (_0x48f7a8) {
                $.logErr(_0x48f7a8, _0x2d3878);
            } finally {
                _0x44a13a(_0x5e46f9);
            }
        });
    });
}

async function _0x3e280c(_0x3e6065) {
    let _0x3e5c1e = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x3f12b0 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x3e5c1e,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x3e5c1e = await _0x388e5c.getbody(_0x3f12b0);
    if (!_0x3e5c1e) return;
    return new Promise(async _0x52a7a9 => {
        $.dpost(_0x82540d(_0x3e5c1e), async (_0x42a1e9, _0x5c5a1a, _0x4c09fa) => {
            try {
                if (_0x42a1e9) console.log("" + JSON.stringify(_0x42a1e9)), console.log("lottery请求失败，请检查网路重试"), _0x42a1e9.includes("403") && ($.banip = true); else {
                    _0x4c09fa = JSON.parse(_0x4c09fa);

                    if (_0x4c09fa.code == 0) {
                        const _0x4f423c = _0x4c09fa.data.prizeType;
                        if (!_0x4f423c) fail++;

                        switch (_0x4f423c) {
                            case 1:
                                process.stdout.write("垃.圾.券😤"), $.txjsuc && $.fail++, $.hotflag = false;
                                break;

                            case 4:
                                let _0x40f842 = parseFloat(_0x4c09fa.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x40f842 + "现金💰️"), _0x46ed40.push(_0x40f842), _0x3126a0.push({
                                    "prizeValue": _0x4c09fa.data.prizeValue,
                                    "id": _0x4c09fa.data.id,
                                    "poolBaseId": _0x4c09fa.data.poolBaseId,
                                    "prizeGroupId": _0x4c09fa.data.prizeGroupId,
                                    "prizeBaseId": _0x4c09fa.data.prizeBaseId
                                }), $.fail = 0, $.hotflag = false;
                                break;

                            case 2:
                                let _0x30d0bb = parseFloat(_0x4c09fa.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x30d0bb + "红包🧧"), _0x54a94c.push(_0x30d0bb), $.fail = 0, $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false, console.log(JSON.stringify(_0x4c09fa.data));
                        }
                    } else {
                        if (_0x4c09fa.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true; else _0x4c09fa.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x4c09fa.errMsg)) : ($.hotflag = false, console.log(_0x4c09fa.errMsg));
                    }
                }
            } catch (_0x2493fa) {
                $.logErr(_0x2493fa, _0x5c5a1a);
            } finally {
                _0x52a7a9(_0x4c09fa);
            }
        });
    });
}

async function _0x53a948(_0x42543b) {
    let _0x2def6f = {
        "pageNum": _0x42543b,
        "pageSize": 100,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    },
        _0x1dd77b = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x2def6f,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x2def6f = await _0x388e5c.getbody(_0x1dd77b);
    if (!_0x2def6f) return;
    return new Promise(async _0x25c188 => {
        $.dget(_0x82540d(_0x2def6f), async (_0x272c1f, _0x4a80cf, _0x566c23) => {
            try {
                _0x272c1f ? (console.log("" + JSON.stringify(_0x272c1f)), console.log(" API请求失败，请检查网路重试"), _0x272c1f.includes("403") && ($.banip = true)) : (_0x566c23 = JSON.parse(_0x566c23), _0x566c23.code == 0 ? $.baglist = _0x566c23.data.items : console.log(_0x566c23.errMsg));
            } catch (_0x202072) {
                $.logErr(_0x202072, _0x4a80cf);
            } finally {
                _0x25c188(_0x566c23);
            }
        });
    });
}

async function _0x4e30af(_0x5b4fe6, _0x35dc54) {
    let _0x4c9def = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x5b4fe6.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x5b4fe6.poolBaseId + ",\"prizeGroupId\":" + _0x5b4fe6.prizeGroupId + ",\"prizeBaseId\":" + _0x5b4fe6.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x31d136 => {
        $.dpost(_0x82540d(_0x4c9def), async (_0x2572c1, _0x568edb, _0x5ebc66) => {
            try {
                if (_0x2572c1) console.log("" + JSON.stringify(_0x2572c1)), console.log("apCashWithDraw请求失败，请检查网路重试"), _0x2572c1.includes("403") && ($.banip = true); else {
                    _0x5ebc66 = JSON.parse(_0x5ebc66);

                    if (_0x5ebc66.code == 0) {
                        if (_0x5ebc66.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x5ebc66.data.message.includes("上限")) !_0x77e9f3 && console.log("提现到上限"), $.txfull = true, $.txfail = false; else _0x5ebc66.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x35dc54), $.txfail = false) : console.log(_0x5ebc66.data.message);
                        }
                    } else console.log(_0x5ebc66.errMsg);
                }
            } catch (_0x18ceb4) {
                $.logErr(_0x18ceb4, _0x568edb);
            } finally {
                _0x31d136(_0x5ebc66);
            }
        });
    });
}

async function _0x14e8ac(_0x34670f, _0x273b3f) {
    let _0x5daca8 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x34670f.id + ",\"business\":\"fission\",\"poolId\":" + _0x34670f.poolBaseId + ",\"prizeGroupId\":" + _0x34670f.prizeGroupId + ",\"prizeId\":" + _0x34670f.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
        _0x5ddfba = {
            "url": "https://api.m.jd.com/api",
            "body": _0x5daca8,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x3afb20
            }
        };

    return new Promise(async _0x1ca96d => {
        $.dpost(_0x5ddfba, async (_0x247a18, _0x500b2e, _0x2e1fb5) => {
            try {
                if (_0x247a18) console.log("" + JSON.stringify(_0x247a18)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试"), _0x247a18.includes("403") && ($.banip = true); else {
                    _0x2e1fb5 = JSON.parse(_0x2e1fb5);

                    if (_0x2e1fb5.code == 0) {
                        if (_0x2e1fb5.data.resCode === "0") {
                            process.stdout.write("🧧 ");
                            $.toredsuc.push(_0x273b3f);
                        } else process.stdout.write("❎ "), $.toredfailnum++;
                    } else _0x2e1fb5.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x2e1fb5.errMsg);
                }
            } catch (_0x3444ad) {
                $.logErr(_0x3444ad, _0x500b2e);
            } finally {
                _0x1ca96d(_0x2e1fb5);
            }
        });
    });
}

function _0x82540d(_0x5547e1) {
    return {
        "url": "https://api.m.jd.com/?" + _0x5547e1,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x3afb20
        }
    };
}

function _0x157cd2() {
    return new Promise(_0x518f95 => {
        const _0xd05b8e = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x3afb20,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0xd05b8e, (_0x163268, _0x48c5c0, _0x4256b6) => {
            try {
                if (_0x4256b6) {
                    _0x4256b6 = JSON.parse(_0x4256b6);

                    if (_0x4256b6.islogin === "1") { } else _0x4256b6.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x3f819c) {
                console.log(_0x3f819c);
            } finally {
                _0x518f95();
            }
        });
    });
}

function _0x42ae11() {
    return new Promise(_0x8283c6 => {
        !_0x1db49d ? $.msg($.name, "", "" + _0x18dc72) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x18dc72);

        _0x8283c6();
    });
}

function _0x41e064(_0xdb36c5) {
    try {
        if (typeof JSON.parse(_0xdb36c5) == "object") return true;
    } catch (_0x51269d) {
        return console.log(_0x51269d), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x3e62c7(_0x12cef6) {
    const _0x49c2fc = _0x12cef6.getFullYear(),
        _0x50faa4 = ("0" + (_0x12cef6.getMonth() + 1)).slice(-2),
        _0x456447 = ("0" + _0x12cef6.getDate()).slice(-2),
        _0x43ecf9 = ("0" + _0x12cef6.getHours()).slice(-2),
        _0xe5660a = ("0" + _0x12cef6.getMinutes()).slice(-2),
        _0x1bc347 = ("0" + _0x12cef6.getSeconds()).slice(-2);

    return _0x49c2fc + "/" + _0x50faa4 + "/" + _0x456447 + " " + _0x43ecf9 + ":" + _0xe5660a + ":" + _0x1bc347;
}

function _0x53b31e(_0x35e895) {
    if (typeof _0x35e895 == "string") try {
        return JSON.parse(_0x35e895);
    } catch (_0x3f621b) {
        return console.log(_0x3f621b), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }