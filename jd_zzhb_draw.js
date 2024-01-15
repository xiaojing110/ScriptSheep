
/*
转赚红包,只抽奖提现
1 1 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb_draw.js
updatetime:2023/11/17
 */

const $ = new Env('Jd转赚红包_抽奖提现');
const _0x50dd88 = $.isNode() ? require("./jdCookie.js") : "",
    _0x432b5b = require("./function/dylano"),
    _0xcd108b = require("./USER_AGENTS");

let _0x1cc9da = true,
    _0x457a05 = [],
    _0x2e13de = [],
    _0x5636d2 = [],
    _0x1099dd = [],
    _0x173d6e,
    _0x395ec6 = [],
    _0x520792 = "",
    _0xfbec86 = "";

const _0x3cf8a7 = process.env.JDZHBLTNUM || "-1",
    _0x51b321 = process.env.JDZHBDELAY || "1",
    _0x3c1e3e = process.env.TXDELAY || "5",
    _0x19fd76 = process.env.TXIVAL || "1",
    _0x1528f6 = process.env.JDZHBTORED || false,
    _0x4af258 = process.env.TXSILENT || false,
    _0x56d958 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
    require("https-proxy-agent");

    _0x173d6e = require("./function/proxy.js");
    $.dget = _0x173d6e.intoRequest($.get.bind($));
    $.dpost = _0x173d6e.intoRequest($.post.bind($));
} catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
    Object.keys(_0x50dd88).forEach(_0x2e8126 => {
        _0x395ec6.push(_0x50dd88[_0x2e8126]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x395ec6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x163474($.getdata("CookiesJD") || "[]").map(_0x32656a => _0x32656a.cookie)].filter(_0x1672d4 => !!_0x1672d4);

!(async () => {
    if (!_0x395ec6[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
    $.log("\n当前版本：20231230 ");
    console.log("执行流程，抽奖--提现");
    console.log("TG频道：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='3'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");
    console.log("\n开始抽奖和提现...");
    _0x3cf8a7 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x3cf8a7);

    let _0xe2dc33 = new Date();

    _0xe2dc33.setDate(_0xe2dc33.getDate() - _0x19fd76);

    for (let _0x2acf09 = 0; _0x2acf09 < _0x395ec6.length; _0x2acf09++) {
        if (_0x395ec6[_0x2acf09]) {
            _0x520792 = _0x395ec6[_0x2acf09];
            $.UserName = decodeURIComponent(_0x520792.match(/pt_pin=([^; ]+)(?=;?)/) && _0x520792.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2acf09 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x2e13de = [];
            _0x5636d2 = [];
            txjscore = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.txjsuc = false;
            $.UA = _0xcd108b.UARAM ? _0xcd108b.UARAM() : _0xcd108b.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x5b8a1c = await _0x4260fb(1);

            await $.wait(1000);
            if (_0x5b8a1c.code != "0") continue;
            $.log("本轮已抽奖次数：" + _0x5b8a1c.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);

            if (_0x5b8a1c.data.cashVo) {
                if (_0x5b8a1c.data?.["cashVo"]?.["state"] === 1) {
                    $.log("本轮提现金进度：" + _0x5b8a1c.data.cashVo.amount + "/" + _0x5b8a1c.data.cashVo.totalAmount + "(-" + _0x5b8a1c.data.cashVo.leftAmount + ")");
                } else _0x5b8a1c.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x5b8a1c.data.cashVo.amount + "/" + _0x5b8a1c.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
            } else $.txj = false;

            $.log("本轮结束时间： " + _0x4f29a1(new Date(Date.now() + _0x5b8a1c.data.countDownTime)));

            for (let _0x25d4ca = 0; _0x25d4ca < (_0x3cf8a7 > -1 && _0x3cf8a7 < $.times ? _0x3cf8a7 : $.times); _0x25d4ca++) {
                process.stdout.write("\n第" + (_0x25d4ca + 1) + "次抽奖结果：");

                for (let _0x1f4af6 of Array(3)) {
                    await _0x1a75aa(_0x1f4af6 + 1);
                    if (!$.hotflag) break;
                    await $.wait(Math.random() * 500 + _0x51b321 * 1000);
                }

                if ($.end) break;
                $.txj && (await _0x5bb552());
                await $.wait(Math.random() * 500 + _0x51b321 * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x5636d2.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x5636d2.reduce((_0x29e3bc, _0x9d5c3) => _0x29e3bc + _0x9d5c3 * 100, 0) / 100 + "元");
            _0x2e13de.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x2e13de.reduce((_0x17be93, _0x57ebb3) => _0x17be93 + _0x57ebb3 * 100, 0) / 100 + "元");

            if (txjscore.length !== 0) {
                let _0x1de276 = txjscore.reduce((_0x6c697, _0xd650f2) => _0x6c697 + _0xd650f2 * 100, 0) / 100;

                $.log("\n\n本次抽奖获得提现金：" + _0x1de276 + "个, 平均" + (_0x1de276 / (_0x3cf8a7 > -1 ? Math.min.apply(null, [_0x3cf8a7, $.times]) : $.times)).toFixed(4) + "个/抽");
            }

            if (_0x56d958 != "true") {
                if (new Date().getHours() < 6 && _0x4af258) continue;
                $.log("\n——————————开始提现（间隔" + _0x3c1e3e + "秒，范围" + _0x19fd76 + "天内）——————");
                _0x1528f6 && $.log("\n已开启转红包，提现上限会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x29f679 = 0; _0x29f679 < 50; _0x29f679++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) break;

                    let _0xd04a05 = await _0x55295f(_0x29f679 + 1);

                    _0xd04a05 == "" && (await $.wait(5000), await _0x55295f(_0x29f679 + 1));
                    if (!$.baglist || $.baglist.length === 0) break;

                    for (let _0x28cb5c of $.baglist) {
                        if (Math.max.apply(null, [new Date(_0x28cb5c.createTime), new Date(_0x28cb5c.startTime)]) < _0xe2dc33 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x28cb5c.prizeType == 4) {
                            if (_0x28cb5c.state == 0 || _0x28cb5c.state == 2) {
                                process.stdout.write("" + Number(_0x28cb5c.amount));

                                let _0x24a019 = await _0x500238(_0x28cb5c, Number(_0x28cb5c.amount));

                                $.txfail && (await $.wait(5000), _0x24a019 = await _0x500238(_0x28cb5c, Number(_0x28cb5c.amount)));
                                if (_0x24a019.data.message.includes("上限") && _0x1528f6 == "true" && $.toredfailnum < 5) await _0x45ef0d(_0x28cb5c, Number(_0x28cb5c.amount));
                                await $.wait(_0x3c1e3e * 1000);
                            } else {
                                if (_0x28cb5c.state == 8) { }
                            }
                        }
                    }

                    await $.wait(2000);
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x3dc81b, _0x24a62e) => _0x3dc81b + _0x24a62e * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x5c0aa3, _0x197565) => _0x5c0aa3 + _0x197565 * 100, 0) / 100 + "元");
            } else $.log("\n\n⚠已设置不提现！");

            _0x1099dd = [];
            await $.wait(2000);
        }
    }
})().catch(_0x4f7143 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4f7143 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x4260fb(_0x7dfc3d) {
    let _0x259706 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "inviter": ""
    },
        _0xa0d3e0 = {
            "appId": "eb67b",
            "fn": "inviteFissionHome",
            "body": _0x259706,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };
    _0x259706 = await _0x432b5b.getbody(_0xa0d3e0);
    if (!_0x259706) return;
    return new Promise(async _0x4c70c1 => {
        $.dpost(_0x21eda9(_0x259706), async (_0x11447e, _0x476ff5, _0x10ef6d) => {
            try {
                if (_0x11447e) console.log("" + JSON.stringify(_0x11447e)), console.log("homeinfo请求失败，请检查网路重试"); else {
                    _0x10ef6d = JSON.parse(_0x10ef6d);

                    if (_0x10ef6d.code == 0) {
                        $.times = _0x10ef6d.data.prizeNum;
                        if (_0x7dfc3d) console.log("我的助力码：" + _0x10ef6d.data.inviter);

                        _0x457a05.push(_0x10ef6d.data.inviter);
                    } else console.log(_0x10ef6d.errMsg);
                }
            } catch (_0x2925f8) {
                $.logErr(_0x2925f8, _0x476ff5);
            } finally {
                _0x4c70c1(_0x10ef6d);
            }
        });
    });
}

async function _0x5bb552() {
    let _0x5b7fde = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x5ceb2f = {
            "appId": "b8469",
            "fn": "inviteFissionReceive",
            "body": _0x5b7fde,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x5b7fde = await _0x432b5b.getbody(_0x5ceb2f);
    if (!_0x5b7fde) return;
    return new Promise(async _0x2abac7 => {
        $.dpost(_0x21eda9(_0x5b7fde), async (_0x6e7635, _0x554769, _0x4dc64b) => {
            try {
                if (_0x6e7635) {
                    console.log("" + JSON.stringify(_0x6e7635));
                    console.log("receive请求失败，请检查网路重试");

                    if (_0x6e7635.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x4dc64b = JSON.parse(_0x4dc64b);
                    if (_0x4dc64b.code == 0) process.stdout.write("----提现金" + _0x4dc64b.data.amount + "(+" + _0x4dc64b.data.receiveList[0].amount + ")"), txjscore.push(_0x4dc64b.data.receiveList[0].amount), _0x4dc64b.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true); else {
                        if (_0x4dc64b.code == 80208) process.stdout.write("----送的抽奖次数没有提现金"); else _0x4dc64b.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x4dc64b));
                    }
                }
            } catch (_0x43424f) {
                $.logErr(_0x43424f, _0x554769);
            } finally {
                _0x2abac7(_0x4dc64b);
            }
        });
    });
}

async function _0x1a75aa(_0x568c37) {
    let _0x4f9678 = {
        "linkId": "3orGfh1YkwNLksxOcN8zWQ"
    },
        _0x3997d3 = {
            "appId": "c02c6",
            "fn": "inviteFissionDrawPrize",
            "body": _0x4f9678,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": $.fg,
            "ua": $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x4f9678 = await _0x432b5b.getbody(_0x3997d3);
    if (!_0x4f9678) return;
    return new Promise(async _0x59d0d7 => {
        $.dpost(_0x21eda9(_0x4f9678), async (_0x28d307, _0x3c412a, _0x88d644) => {
            try {
                if (_0x28d307) console.log("" + JSON.stringify(_0x28d307)), console.log("lottery请求失败，请检查网路重试"), _0x28d307.includes("403") && ($.banip = true); else {
                    _0x88d644 = JSON.parse(_0x88d644);

                    if (_0x88d644.code == 0) {
                        const _0x297391 = _0x88d644.data.prizeType;
                        if (!_0x297391) fail++;

                        switch (_0x297391) {
                            case 1:
                                process.stdout.write("垃.圾.券😤"), $.txjsuc && $.fail++, $.hotflag = false;
                                break;

                            case 4:
                                let _0x498b13 = parseFloat(_0x88d644.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x498b13 + "现金💰️"), _0x2e13de.push(_0x498b13), _0x1099dd.push({
                                    "prizeValue": _0x88d644.data.prizeValue,
                                    "id": _0x88d644.data.id,
                                    "poolBaseId": _0x88d644.data.poolBaseId,
                                    "prizeGroupId": _0x88d644.data.prizeGroupId,
                                    "prizeBaseId": _0x88d644.data.prizeBaseId
                                }), $.fail = 0, $.hotflag = false;
                                break;

                            case 2:
                                let _0x518818 = parseFloat(_0x88d644.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x518818 + "红包🧧"), _0x5636d2.push(_0x518818), $.fail = 0, $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false, console.log(JSON.stringify(_0x88d644.data));
                        }
                    } else {
                        if (_0x88d644.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true; else _0x88d644.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x88d644.errMsg)) : ($.hotflag = false, console.log(_0x88d644.errMsg));
                    }
                }
            } catch (_0x3d6d08) {
                $.logErr(_0x3d6d08, _0x3c412a);
            } finally {
                _0x59d0d7(_0x88d644);
            }
        });
    });
}

async function _0x55295f(_0x4ce4af) {
    let _0x59f8e1 = {
        "pageNum": _0x4ce4af,
        "pageSize": 100,
        "linkId": "3orGfh1YkwNLksxOcN8zWQ",
        "business": "fission"
    },
        _0x392f18 = {
            "appId": "f2b1d",
            "fn": "superRedBagList",
            "body": _0x59f8e1,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "ua": $.UA
        };
    _0x59f8e1 = await _0x432b5b.getbody(_0x392f18);
    if (!_0x59f8e1) return;
    return new Promise(async _0x326522 => {
        $.dget(_0x21eda9(_0x59f8e1), async (_0xfcdd4e, _0x5b8472, _0x5bc7f2) => {
            try {
                _0xfcdd4e ? (console.log("" + JSON.stringify(_0xfcdd4e)), console.log(" API请求失败，请检查网路重试"), _0xfcdd4e.includes("403") && ($.banip = true), _0x5bc7f2 = "") : (_0x5bc7f2 = JSON.parse(_0x5bc7f2), _0x5bc7f2.code == 0 ? $.baglist = _0x5bc7f2.data.items : console.log(_0x5bc7f2.errMsg));
            } catch (_0x19476e) {
                $.logErr(_0x19476e, _0x5b8472);
            } finally {
                _0x326522(_0x5bc7f2);
            }
        });
    });
}

async function _0x500238(_0x4e6c06, _0x4f25d7) {
    let _0x575412 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x4e6c06.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x4e6c06.poolBaseId + ",\"prizeGroupId\":" + _0x4e6c06.prizeGroupId + ",\"prizeBaseId\":" + _0x4e6c06.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x5d19c5 => {
        $.dpost(_0x21eda9(_0x575412), async (_0x414e73, _0x4c8a8a, _0x224862) => {
            try {
                if (_0x414e73) {
                    console.log("" + JSON.stringify(_0x414e73));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x414e73.includes("403") && ($.banip = true);
                } else {
                    _0x224862 = JSON.parse(_0x224862);

                    if (_0x224862.code == 0) {
                        if (_0x224862.data.message.indexOf("待发放") > -1) process.stdout.write("❎"), $.txfail = true; else {
                            if (_0x224862.data.message.includes("上限")) !_0x1528f6 && console.log("提现到上限"), $.txfull = true, $.txfail = false; else _0x224862.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x4f25d7), $.txfail = false) : console.log(_0x224862.data.message);
                        }
                    } else console.log(_0x224862.errMsg);
                }
            } catch (_0x4a4b2f) {
                $.logErr(_0x4a4b2f, _0x4c8a8a);
            } finally {
                _0x5d19c5(_0x224862);
            }
        });
    });
}

async function _0x45ef0d(_0x46baad, _0x1f8e45) {
    let _0x50de43 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x46baad.id + ",\"business\":\"fission\",\"poolId\":" + _0x46baad.poolBaseId + ",\"prizeGroupId\":" + _0x46baad.prizeGroupId + ",\"prizeId\":" + _0x46baad.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
        _0x3a5bf8 = {
            "url": "https://api.m.jd.com/api",
            "body": _0x50de43,
            "headers": {
                "Host": "api.m.jd.com",
                "Origin": "https://prodev.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": $.UA,
                "Cookie": _0x520792
            }
        };

    return new Promise(async _0x30e803 => {
        $.dpost(_0x3a5bf8, async (_0x3661e4, _0x498756, _0x1f27b6) => {
            try {
                if (_0x3661e4) {
                    console.log("" + JSON.stringify(_0x3661e4));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x3661e4.includes("403") && ($.banip = true);
                } else {
                    _0x1f27b6 = JSON.parse(_0x1f27b6);
                    if (_0x1f27b6.code == 0) _0x1f27b6.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x1f8e45)) : (process.stdout.write("❎ "), $.toredfailnum++); else _0x1f27b6.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x1f27b6.errMsg);
                }
            } catch (_0x279dc8) {
                $.logErr(_0x279dc8, _0x498756);
            } finally {
                _0x30e803(_0x1f27b6);
            }
        });
    });
}

function _0x21eda9(_0x3e041b) {
    return {
        "url": "https://api.m.jd.com/?" + _0x3e041b,
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x520792
        }
    };
}

function _0x1438bb() {
    return new Promise(_0x56dc4f => {
        const _0x273a93 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x520792,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x273a93, (_0x30ab21, _0x94dc6c, _0x29b4ce) => {
            try {
                if (_0x29b4ce) {
                    _0x29b4ce = JSON.parse(_0x29b4ce);

                    if (_0x29b4ce.islogin === "1") { } else {
                        if (_0x29b4ce.islogin === "0") {
                            $.isLogin = false;
                        }
                    }
                }
            } catch (_0x33a3c1) {
                console.log(_0x33a3c1);
            } finally {
                _0x56dc4f();
            }
        });
    });
}

function _0x4687e6() {
    return new Promise(_0x33c1b9 => {
        !_0x1cc9da ? $.msg($.name, "", "" + _0xfbec86) : $.log("京东账号" + $.index + $.nickName + "\n" + _0xfbec86);

        _0x33c1b9();
    });
}

function _0x2e87cc(_0x4f256f) {
    try {
        if (typeof JSON.parse(_0x4f256f) == "object") return true;
    } catch (_0x1945e0) {
        return console.log(_0x1945e0), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x4f29a1(_0xaa681a) {
    const _0x909919 = _0xaa681a.getFullYear(),
        _0x2ccc64 = ("0" + (_0xaa681a.getMonth() + 1)).slice(-2),
        _0x317db6 = ("0" + _0xaa681a.getDate()).slice(-2),
        _0x5bace3 = ("0" + _0xaa681a.getHours()).slice(-2),
        _0x3de592 = ("0" + _0xaa681a.getMinutes()).slice(-2),
        _0x38fcb9 = ("0" + _0xaa681a.getSeconds()).slice(-2);

    return _0x909919 + "/" + _0x2ccc64 + "/" + _0x317db6 + " " + _0x5bace3 + ":" + _0x3de592 + ":" + _0x38fcb9;
}

function _0x163474(_0x29721e) {
    if (typeof _0x29721e == "string") try {
        return JSON.parse(_0x29721e);
    } catch (_0x117e29) {
        return console.log(_0x117e29), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }