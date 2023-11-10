
/*
每日红包（抽奖+提现）
8 8 29 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_mrhb_draw.js
 */

const $ = new Env('Jd每日红包_抽奖提现');
const _0x313927 = $.isNode() ? require("./jdCookie.js") : "",
    _0x32f80a = require("./function/dylanz"),
    _0x136faa = require("./USER_AGENTS");

let _0x48bd37 = true,
    _0x579404 = [],
    _0x3e6926 = [],
    _0x375e01 = [],
    _0x2e8c8f = [],
    _0x3cb969,
    _0x2c5f91 = [],
    _0x4cc2e0 = "",
    _0x5b8c93 = "";

const _0x354520 = process.env.MRHBLTNUM || "-1",
    _0x32e39a = process.env.MRHBDELAY || "1",
    _0x394651 = process.env.TXDELAY || "5",
    _0x3e46cf = process.env.MRHBTORED || false,
    _0xf60101 = process.env.TXSILENT || false,
    _0x449d6b = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x3cb969 = require("./function/proxy.js");
        $.dget = _0x3cb969.intoRequest($.get.bind($));
        $.dpost = _0x3cb969.intoRequest($.post.bind($));
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
    Object.keys(_0x313927).forEach(_0x3abd47 => {
        _0x2c5f91.push(_0x313927[_0x3abd47]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x2c5f91 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x254fdf($.getdata("CookiesJD") || "[]").map(_0x6e2b8f => _0x6e2b8f.cookie)].filter(_0x2c73dd => !!_0x2c73dd);
}

$.banip = false;
!(async () => {
    if (!_0x2c5f91[0]) {
        const _0xe88a8f = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0xe88a8f);
        return;
    }

    $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
    $.log("\n当前版本：2023/11/05  优化");
    console.log("执行流程，抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  MRHBLTNUM='200'\n  抽奖间隔，默认1秒, 单位秒  MRHBDELAY='3'\n  提现间隔，默认5秒, 单位秒  TXDELAY='3'\n  开启提现到上限转红包  MRHBTORED='true'\n  开启代理API  DY_PROXY='url'\n  关闭提现  NOTX='true'\n");
    console.log("\n开始抽奖和提现...");
    _0x354520 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x354520);

    let _0x52cb93 = new Date();

    _0x52cb93.setDate(_0x52cb93.getDate() - 1);

    for (let _0x2b009d = 0; _0x2b009d < _0x2c5f91.length; _0x2b009d++) {
        if (_0x2c5f91[_0x2b009d]) {
            _0x4cc2e0 = _0x2c5f91[_0x2b009d];
            $.UserName = decodeURIComponent(_0x4cc2e0.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4cc2e0.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2b009d + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x3e6926 = [];
            _0x375e01 = [];
            txjscore = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.txjsuc = false;
            $.UA = _0x136faa.UARAM ? _0x136faa.UARAM() : _0x136faa.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x54e01e = await _0x3f060c(1);

            if (_0x54e01e.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x54e01e.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);

            if (_0x54e01e.data.cashVo) {
                if (_0x54e01e.data?.["cashVo"]?.["state"] === 1) {
                    $.log("本轮提现金进度：" + _0x54e01e.data.cashVo.amount + "/" + _0x54e01e.data.cashVo.totalAmount + "(-" + _0x54e01e.data.cashVo.leftAmount + ")");
                } else {
                    _0x54e01e.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x54e01e.data.cashVo.amount + "/" + _0x54e01e.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
                }
            } else {
                $.txj = false;
            }

            $.log("本轮结束时间： " + _0x111f7f(new Date(Date.now() + _0x54e01e.data.countDownTime)));

            for (let _0x56eb5f = 0; _0x56eb5f < (_0x354520 > -1 && _0x354520 < $.times ? _0x354520 : $.times); _0x56eb5f++) {
                if ($.banip) {
                    break;
                }

                process.stdout.write("\n第" + (_0x56eb5f + 1) + "次抽奖结果：");

                for (let _0x31b61a of Array(3)) {
                    await _0xa0b8b(_0x31b61a + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + _0x32e39a * 1000);
                }

                if ($.end) {
                    break;
                }

                $.txj && (await _0x388377());
                await $.wait(Math.random() * 500 + _0x32e39a * 1000);

                if ($.fail > 2 && $.txjsuc) {
                    $.log("\n\n已达成，要什么垃圾券！！！");
                    break;
                }
            }

            _0x375e01.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x375e01.reduce((_0x3245c2, _0x33036c) => _0x3245c2 + _0x33036c * 100, 0) / 100 + "元");
            _0x3e6926.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x3e6926.reduce((_0x29db6c, _0x30d266) => _0x29db6c + _0x30d266 * 100, 0) / 100 + "元");

            if (txjscore.length !== 0) {
                let _0x1c9013 = txjscore.reduce((_0x3da02c, _0x157112) => _0x3da02c + _0x157112 * 100, 0) / 100;

                $.log("\n\n本次抽奖获得提现金：" + _0x1c9013 + "个, 平均" + (_0x1c9013 / (_0x354520 > -1 ? Math.min.apply(null, [_0x354520, $.times]) : $.times)).toFixed(4) + "个/抽");
            }

            if (_0x449d6b != "true") {
                if (new Date().getHours() < 6 && _0xf60101) {
                    continue;
                }

                $.log("\n\n开始提现（默认间隔5秒，变量TXDELAY）...");
                _0x3e46cf && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x4c20ad = 0; _0x4c20ad < 50; _0x4c20ad++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) {
                        break;
                    }

                    if ($.txfull && !_0x3e46cf) {
                        $.log("\n本月提现到上限!如转红包请设置变量");
                        break;
                    }

                    await _0x2ec36f(_0x4c20ad + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x1e386f of $.baglist) {
                        if (new Date(_0x1e386f.createTime) < _0x52cb93 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x1e386f.prizeType == 4) {
                            if (_0x1e386f.state == 0 || _0x1e386f.state == 2) {
                                process.stdout.write("" + Number(_0x1e386f.amount));

                                let _0x46e365 = await _0x1c34d0(_0x1e386f, Number(_0x1e386f.amount));

                                $.txfail && (await $.wait(6000), _0x46e365 = await _0x1c34d0(_0x1e386f, Number(_0x1e386f.amount)));

                                if ($.txfull && !_0x3e46cf) {
                                    break;
                                }

                                if (_0x46e365.data.message.includes("上限") && _0x3e46cf && $.toredfailnum < 5) {
                                    await _0x2356a(_0x1e386f, Number(_0x1e386f.amount));
                                }

                                await $.wait(_0x394651 * 1000);
                            } else {
                                _0x1e386f.state == 8;
                            }
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x5c5795, _0xd24b6e) => _0x5c5795 + _0xd24b6e * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x3de015, _0x172849) => _0x3de015 + _0x172849 * 100, 0) / 100 + "元");
            } else {
                $.log("\n\n⚠已设置不提现！");
            }

            _0x2e8c8f = [];
            await $.wait(2000);
        }
    }
})().catch(_0xcd67fc => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xcd67fc + "!", "");
}).finally(() => {
    $.done();
});

async function _0x3f060c(_0x1debea) {
    const _0x457726 = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w",
        inviter: ""
    };
    let _0x2cfcdb = _0x457726,
        _0x21023c = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x2cfcdb,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x2cfcdb = await _0x32f80a.getbody(_0x21023c);

    if (!_0x2cfcdb) {
        return;
    }

    return new Promise(async _0x3b586e => {
        $.dpost(_0x540318(_0x2cfcdb), async (_0x2509bd, _0xb43460, _0x3b4c4c) => {
            try {
                if (_0x2509bd) {
                    console.log("" + JSON.stringify(_0x2509bd));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x3b4c4c = JSON.parse(_0x3b4c4c);

                    if (_0x3b4c4c.code == 0) {
                        $.times = _0x3b4c4c.data.prizeNum;

                        if (_0x1debea) {
                            console.log("我的助力码：" + _0x3b4c4c.data.inviter);
                        }

                        _0x579404.push(_0x3b4c4c.data.inviter);
                    } else {
                        console.log(_0x3b4c4c.errMsg);
                    }
                }
            } catch (_0x86b20d) {
                $.logErr(_0x86b20d, _0xb43460);
            } finally {
                _0x3b586e(_0x3b4c4c);
            }
        });
    });
}

async function _0x388377() {
    const _0x485218 = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w"
    };
    let _0x272171 = _0x485218,
        _0x5470c4 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x272171,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x272171 = await _0x32f80a.getbody(_0x5470c4);

    if (!_0x272171) {
        return;
    }

    return new Promise(async _0x1abe08 => {
        $.dpost(_0x540318(_0x272171), async (_0x4894c7, _0x3ca5c6, _0x2e3ed0) => {
            try {
                if (_0x4894c7) {
                    console.log("" + JSON.stringify(_0x4894c7));
                    console.log("receive请求失败，请检查网路重试");
                    _0x4894c7.includes("403") && ($.banip = true);
                } else {
                    _0x2e3ed0 = JSON.parse(_0x2e3ed0);

                    if (_0x2e3ed0.code == 0) {
                        process.stdout.write("----提现金" + _0x2e3ed0.data.amount + "(+" + _0x2e3ed0.data.receiveList[0].amount + ")");
                        txjscore.push(_0x2e3ed0.data.receiveList[0].amount);
                        _0x2e3ed0.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
                    } else {
                        if (_0x2e3ed0.code == 80208) {
                            process.stdout.write("----送的抽奖次数没有提现金");
                        } else {
                            if (_0x2e3ed0.code == 80209) {
                                process.stdout.write("----完成标识");
                                $.txj = false;
                            } else {
                                console.log(JSON.stringify(_0x2e3ed0));
                            }
                        }
                    }
                }
            } catch (_0x1aa120) {
                $.logErr(_0x1aa120, _0x3ca5c6);
            } finally {
                _0x1abe08(_0x2e3ed0);
            }
        });
    });
}

async function _0xa0b8b(_0xc6e468) {
    const _0x4c9cbd = {
        linkId: "EcuVpjGGfccY3Ic_1ni83w"
    };
    let _0x25d129 = _0x4c9cbd,
        _0x257dfd = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x25d129,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x25d129 = await _0x32f80a.getbody(_0x257dfd);

    if (!_0x25d129) {
        return;
    }

    return new Promise(async _0x2d555d => {
        $.dpost(_0x540318(_0x25d129), async (_0x38799d, _0x1a0cc5, _0x4fb8aa) => {
            try {
                if (_0x38799d) {
                    console.log("" + JSON.stringify(_0x38799d));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x38799d.includes("403") && ($.banip = true);
                } else {
                    _0x4fb8aa = JSON.parse(_0x4fb8aa);

                    if (_0x4fb8aa.code == 0) {
                        const _0x3c812c = _0x4fb8aa.data.prizeType;

                        if (!_0x3c812c) {
                            fail++;
                        }

                        switch (_0x3c812c) {
                            case 1:
                                process.stdout.write("垃.圾.券😤");
                                $.txjsuc && $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x1b6701 = parseFloat(_0x4fb8aa.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x1b6701 + "现金💰️");

                                _0x3e6926.push(_0x1b6701);

                                const _0x37a435 = {
                                    prizeValue: _0x4fb8aa.data.prizeValue,
                                    id: _0x4fb8aa.data.id,
                                    poolBaseId: _0x4fb8aa.data.poolBaseId,
                                    prizeGroupId: _0x4fb8aa.data.prizeGroupId,
                                    prizeBaseId: _0x4fb8aa.data.prizeBaseId
                                };

                                _0x2e8c8f.push(_0x37a435);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x3d706f = parseFloat(_0x4fb8aa.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x3d706f + "红包🧧");

                                _0x375e01.push(_0x3d706f);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x4fb8aa.data));
                        }
                    } else {
                        if (_0x4fb8aa.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x4fb8aa.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x4fb8aa.errMsg)) : ($.hotflag = false, console.log(_0x4fb8aa.errMsg));
                        }
                    }
                }
            } catch (_0x3f11c8) {
                $.logErr(_0x3f11c8, _0x1a0cc5);
            } finally {
                _0x2d555d(_0x4fb8aa);
            }
        });
    });
}

async function _0x2ec36f(_0x367e60) {
    const _0x51ab2f = {
        pageNum: _0x367e60,
        pageSize: 100,
        linkId: "EcuVpjGGfccY3Ic_1ni83w",
        business: "fission"
    };
    let _0x56ca47 = _0x51ab2f,
        _0x1b5fdf = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x56ca47,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x56ca47 = await _0x32f80a.getbody(_0x1b5fdf);

    if (!_0x56ca47) {
        return;
    }

    return new Promise(async _0x2dd371 => {
        $.dget(_0x540318(_0x56ca47), async (_0x4c82c3, _0x2bb3cf, _0x329a63) => {
            try {
                _0x4c82c3 ? (console.log("" + JSON.stringify(_0x4c82c3)), console.log(" API请求失败，请检查网路重试"), _0x4c82c3.includes("403") && ($.banip = true)) : (_0x329a63 = JSON.parse(_0x329a63), _0x329a63.code == 0 ? $.baglist = _0x329a63.data.items : console.log(_0x329a63.errMsg));
            } catch (_0x40673f) {
                $.logErr(_0x40673f, _0x2bb3cf);
            } finally {
                _0x2dd371(_0x329a63);
            }
        });
    });
}

async function _0x1c34d0(_0x14b9bd, _0x54851c) {
    let _0xd9c950 = "functionId=apCashWithDraw&body={\"linkId\":\"EcuVpjGGfccY3Ic_1ni83w\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x14b9bd.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x14b9bd.poolBaseId + ",\"prizeGroupId\":" + _0x14b9bd.prizeGroupId + ",\"prizeBaseId\":" + _0x14b9bd.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x2f8e5b => {
        $.dpost(_0x540318(_0xd9c950), async (_0x3c188d, _0x38e769, _0x32c011) => {
            try {
                if (_0x3c188d) {
                    console.log("" + JSON.stringify(_0x3c188d));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x3c188d.includes("403") && ($.banip = true);
                } else {
                    _0x32c011 = JSON.parse(_0x32c011);

                    if (_0x32c011.code == 0) {
                        if (_0x32c011.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x32c011.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                if (_0x32c011.data.message.includes("提现")) {
                                    process.stdout.write("✅ ");
                                    $.txsuc.push(_0x54851c);
                                    $.txfail = false;
                                } else {
                                    console.log(_0x32c011.data.message);
                                }
                            }
                        }
                    } else {
                        console.log(_0x32c011.errMsg);
                    }
                }
            } catch (_0x1f86e5) {
                $.logErr(_0x1f86e5, _0x38e769);
            } finally {
                _0x2f8e5b(_0x32c011);
            }
        });
    });
}

async function _0x2356a(_0x10b5e9, _0x439c0e) {
    let _0x50a849 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x10b5e9.id + ",\"business\":\"fission\",\"poolId\":" + _0x10b5e9.poolBaseId + ",\"prizeGroupId\":" + _0x10b5e9.prizeGroupId + ",\"prizeId\":" + _0x10b5e9.prizeBaseId + ",\"linkId\":\"EcuVpjGGfccY3Ic_1ni83w\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x4d1c18 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4cc2e0
    };
    const _0x35be79 = {
        url: "https://api.m.jd.com/api",
        body: _0x50a849,
        headers: _0x4d1c18
    };
    return new Promise(async _0x1c621f => {
        $.dpost(_0x35be79, async (_0x5bf6b, _0x2b4c8d, _0x148779) => {
            try {
                if (_0x5bf6b) {
                    console.log("" + JSON.stringify(_0x5bf6b));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");

                    if (_0x5bf6b.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x148779 = JSON.parse(_0x148779);

                    if (_0x148779.code == 0) {
                        _0x148779.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x439c0e)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x148779.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x148779.errMsg);
                    }
                }
            } catch (_0x36fdd8) {
                $.logErr(_0x36fdd8, _0x2b4c8d);
            } finally {
                _0x1c621f(_0x148779);
            }
        });
    });
}

function _0x540318(_0x30104f) {
    const _0x6800d3 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4cc2e0
    };
    const _0x1ccf35 = {
        url: "https://api.m.jd.com/?" + _0x30104f,
        headers: _0x6800d3
    };
    return _0x1ccf35;
}

function _0x42d5fb() {
    return new Promise(_0x30b5b3 => {
        const _0x2ae62b = {
            Cookie: _0x4cc2e0,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x553c4b = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x2ae62b,
            timeout: 10000
        };
        $.get(_0x553c4b, (_0x42cee9, _0x187e4b, _0x3b6056) => {
            try {
                if (_0x3b6056) {
                    _0x3b6056 = JSON.parse(_0x3b6056);

                    if (!(_0x3b6056.islogin === "1")) {
                        _0x3b6056.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x25a7db) {
                console.log(_0x25a7db);
            } finally {
                _0x30b5b3();
            }
        });
    });
}

function _0x3a9bfe() {
    return new Promise(_0x144a8f => {
        !_0x48bd37 ? $.msg($.name, "", "" + _0x5b8c93) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x5b8c93);

        _0x144a8f();
    });
}

function _0x4b8db3(_0xa1e6f) {
    try {
        if (typeof JSON.parse(_0xa1e6f) == "object") {
            return true;
        }
    } catch (_0x16a0fb) {
        console.log(_0x16a0fb);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x111f7f(_0x258a6d) {
    const _0x185f3c = _0x258a6d.getFullYear(),
        _0x5e67e = ("0" + (_0x258a6d.getMonth() + 1)).slice(-2),
        _0x1a55ef = ("0" + _0x258a6d.getDate()).slice(-2),
        _0x46901c = ("0" + _0x258a6d.getHours()).slice(-2),
        _0x9c1a73 = ("0" + _0x258a6d.getMinutes()).slice(-2),
        _0x377e32 = ("0" + _0x258a6d.getSeconds()).slice(-2);

    return _0x185f3c + "/" + _0x5e67e + "/" + _0x1a55ef + " " + _0x46901c + ":" + _0x9c1a73 + ":" + _0x377e32;
}

function _0x254fdf(_0x8b9fe8) {
    if (typeof _0x8b9fe8 == "string") {
        try {
            return JSON.parse(_0x8b9fe8);
        } catch (_0x2b0beb) {
            console.log(_0x2b0beb);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }