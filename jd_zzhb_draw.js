
/*
转赚红包,只抽奖提现
1 1 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb_draw.js
updatetime:2023/10/22
 */

const $ = new Env('Jd转赚红包_抽奖提现');
const _0x58b0dc = $.isNode() ? require("./jdCookie.js") : "",
    _0x505a2d = require("./function/dylanz"),
    _0x2a1a59 = require("./USER_AGENTS");

let _0x2beafa = true,
    _0x2db7aa = [],
    _0x241e0a = [],
    _0x568807 = [],
    _0xf8ef18 = [],
    _0x340af5,
    _0x9c1a94 = [],
    _0x368cea = "",
    _0x5cb1f2 = "";

const _0x3937eb = process.env.JDZHBLTNUM || "-1",
    _0x24f41f = process.env.JDZHBDELAY || "1",
    _0x4ffe38 = process.env.TXDELAY || "5",
    _0x17470f = process.env.JDZHBTORED || false,
    _0x52d4e5 = process.env.TXSILENT || false,
    _0x1cadc1 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x340af5 = require("./function/proxy.js");
        $.dget = _0x340af5.intoRequest($.get.bind($));
        $.dpost = _0x340af5.intoRequest($.post.bind($));
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
    Object.keys(_0x58b0dc).forEach(_0x2a1e53 => {
        _0x9c1a94.push(_0x58b0dc[_0x2a1e53]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x9c1a94 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x51b8d6($.getdata("CookiesJD") || "[]").map(_0x4d9f90 => _0x4d9f90.cookie)].filter(_0x1cb06f => !!_0x1cb06f);
}

$.banip = false;
!(async () => {
    if (!_0x9c1a94[0]) {
        const _0x3a9769 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x3a9769);
        return;
    }

    console.log("执行流程，抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  每次抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，单位秒  TXDELAY='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  助力开启代理api  DY_PROXY='https://api'\n  默认提现设置不提现  NOTX='true'\n");
    console.log("\n\n开始抽奖和提现...");
    _0x3937eb > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x3937eb);

    let _0x1165ce = new Date();

    _0x1165ce.setDate(_0x1165ce.getDate() - 1);

    for (let _0x5b3be7 = 0; _0x5b3be7 < _0x9c1a94.length; _0x5b3be7++) {
        if (_0x9c1a94[_0x5b3be7]) {
            _0x368cea = _0x9c1a94[_0x5b3be7];
            $.UserName = decodeURIComponent(_0x368cea.match(/pt_pin=([^; ]+)(?=;?)/) && _0x368cea.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x5b3be7 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x241e0a = [];
            _0x568807 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.UA = _0x2a1a59.UARAM ? _0x2a1a59.UARAM() : _0x2a1a59.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x35d968 = await _0x43ef44(1);

            if (_0x35d968.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x35d968.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);

            if (_0x35d968.data.cashVo) {
                if (_0x35d968.data?.["cashVo"]?.["state"] === 1) {
                    $.log("本轮提现金进度：" + _0x35d968.data.cashVo.amount + "/" + _0x35d968.data.cashVo.totalAmount);
                } else {
                    _0x35d968.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金进度：" + _0x35d968.data.cashVo.amount + "/" + _0x35d968.data.cashVo.totalAmount), $.txj = false);
                }
            } else {
                $.txj = false;
            }

            $.log("本轮结束时间： " + _0x1dd056(new Date(Date.now() + _0x35d968.data.countDownTime)));

            for (let _0x5a5416 = 0; _0x5a5416 < (_0x3937eb > -1 && _0x3937eb < $.times ? _0x3937eb : $.times); _0x5a5416++) {
                if ($.banip) {
                    break;
                }

                process.stdout.write("\n第" + (_0x5a5416 + 1) + "次抽奖结果：");

                for (let _0x445f6e of Array(3)) {
                    await _0x480d74(_0x445f6e + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + _0x24f41f * 1000);
                }

                if ($.end) {
                    break;
                }

                $.txj && (await _0x5e7464());
                await $.wait(Math.random() * 500 + _0x24f41f * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x568807.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x568807.reduce((_0x3c101b, _0x51977d) => _0x3c101b + _0x51977d * 100, 0) / 100 + "元");
            _0x241e0a.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x241e0a.reduce((_0x372e9e, _0x31949b) => _0x372e9e + _0x31949b * 100, 0) / 100 + "元");

            if (_0x1cadc1 != "true") {
                if (new Date().getHours() < 6 && _0x52d4e5) {
                    continue;
                }

                $.log("\n开始提现（默认间隔5秒，变量TXDELAY）...");
                _0x17470f && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x4a140e = 0; _0x4a140e < 50; _0x4a140e++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) {
                        break;
                    }

                    if ($.txfull && !_0x17470f) {
                        $.log("\n本月提现到上限!如转红包请设置变量");
                        break;
                    }

                    await _0x3c0a37(_0x4a140e + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x284f20 of $.baglist) {
                        if (new Date(_0x284f20.createTime) < _0x1165ce || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x284f20.prizeType == 4) {
                            if (_0x284f20.state == 0 || _0x284f20.state == 2) {
                                process.stdout.write("" + Number(_0x284f20.amount));

                                let _0x18fb74 = await _0x3356e1(_0x284f20, Number(_0x284f20.amount));

                                $.txfail && (await $.wait(3000), _0x18fb74 = await _0x3356e1(_0x284f20, Number(_0x284f20.amount)));

                                if ($.txfull && !_0x17470f) {
                                    break;
                                }

                                if (_0x18fb74.data.message.includes("上限") && _0x17470f && $.toredfailnum < 5) {
                                    await _0x223f36(_0x284f20, Number(_0x284f20.amount));
                                }

                                await $.wait(_0x4ffe38 * 1000);
                            } else {
                                _0x284f20.state == 8;
                            }
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x4aea51, _0x4971a8) => _0x4aea51 + _0x4971a8 * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x3d0972, _0xc08da5) => _0x3d0972 + _0xc08da5 * 100, 0) / 100 + "元");
            } else {
                $.log("\n\n⚠已设置不提现！");
            }

            _0xf8ef18 = [];
            await $.wait(2000);
        }
    }
})().catch(_0x495d4e => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x495d4e + "!", "");
}).finally(() => {
    $.done();
});

async function _0x43ef44(_0x17587d) {
    const _0x3e8a6b = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        inviter: ""
    };
    let _0x102d3a = _0x3e8a6b,
        _0x433d1e = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x102d3a,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x102d3a = await _0x505a2d.getbody(_0x433d1e);

    if (!_0x102d3a) {
        return;
    }

    return new Promise(async _0x21ed59 => {
        $.dpost(_0x3a3475(_0x102d3a), async (_0x23ba6b, _0x4676b8, _0x57b0aa) => {
            try {
                if (_0x23ba6b) {
                    console.log("" + JSON.stringify(_0x23ba6b));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x57b0aa = JSON.parse(_0x57b0aa);

                    if (_0x57b0aa.code == 0) {
                        $.times = _0x57b0aa.data.prizeNum;

                        if (_0x17587d) {
                            console.log("助力码：" + _0x57b0aa.data.inviter);
                        }

                        _0x2db7aa.push(_0x57b0aa.data.inviter);
                    } else {
                        console.log(_0x57b0aa.errMsg);
                    }
                }
            } catch (_0x1e8530) {
                $.logErr(_0x1e8530, _0x4676b8);
            } finally {
                _0x21ed59(_0x57b0aa);
            }
        });
    });
}

async function _0x5e7464() {
    const _0x216896 = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x56fbee = _0x216896,
        _0x1c5106 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x56fbee,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x56fbee = await _0x505a2d.getbody(_0x1c5106);

    if (!_0x56fbee) {
        return;
    }

    return new Promise(async _0x3778c6 => {
        $.dpost(_0x3a3475(_0x56fbee), async (_0x5d4b7e, _0x850d05, _0x28142d) => {
            try {
                if (_0x5d4b7e) {
                    console.log("" + JSON.stringify(_0x5d4b7e));
                    console.log("receive请求失败，请检查网路重试");
                    _0x5d4b7e.includes("403") && ($.banip = true);
                } else {
                    _0x28142d = JSON.parse(_0x28142d);

                    if (_0x28142d.code == 0) {
                        process.stdout.write("----提现金" + _0x28142d.data.amount);
                        _0x28142d.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false);
                    } else {
                        if (!(_0x28142d.code == 80208)) {
                            _0x28142d.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x28142d));
                        }
                    }
                }
            } catch (_0x550e52) {
                $.logErr(_0x550e52, _0x850d05);
            } finally {
                _0x3778c6(_0x28142d);
            }
        });
    });
}

async function _0x480d74(_0xeb2568) {
    const _0x20323a = {
        linkId: "3orGfh1YkwNLksxOcN8zWQ"
    };
    let _0x11e114 = _0x20323a,
        _0x1f3fec = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x11e114,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x11e114 = await _0x505a2d.getbody(_0x1f3fec);

    if (!_0x11e114) {
        return;
    }

    return new Promise(async _0x4a960c => {
        $.dpost(_0x3a3475(_0x11e114), async (_0x65ff39, _0x489626, _0x46b22b) => {
            try {
                if (_0x65ff39) {
                    console.log("" + JSON.stringify(_0x65ff39));
                    console.log("lottery请求失败，请检查网路重试");

                    if (_0x65ff39.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x46b22b = JSON.parse(_0x46b22b);

                    if (_0x46b22b.code == 0) {
                        const _0x22b6ab = _0x46b22b.data.prizeType;

                        if (!_0x22b6ab) {
                            fail++;
                        }

                        switch (_0x22b6ab) {
                            case 1:
                                process.stdout.write("垃圾卷😤");
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x5663fa = parseFloat(_0x46b22b.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x5663fa + "现金💰️");

                                _0x241e0a.push(_0x5663fa);

                                const _0x4a642d = {
                                    prizeValue: _0x46b22b.data.prizeValue,
                                    id: _0x46b22b.data.id,
                                    poolBaseId: _0x46b22b.data.poolBaseId,
                                    prizeGroupId: _0x46b22b.data.prizeGroupId,
                                    prizeBaseId: _0x46b22b.data.prizeBaseId
                                };

                                _0xf8ef18.push(_0x4a642d);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x56c795 = parseFloat(_0x46b22b.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x56c795 + "红包🧧");

                                _0x568807.push(_0x56c795);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x46b22b.data));
                        }
                    } else {
                        if (_0x46b22b.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            if (_0x46b22b.errMsg.includes("结束")) {
                                $.end = true;
                                $.hotflag = false;
                                console.log(_0x46b22b.errMsg);
                            } else {
                                $.hotflag = false;
                                console.log(_0x46b22b.errMsg);
                            }
                        }
                    }
                }
            } catch (_0x112e3b) {
                $.logErr(_0x112e3b, _0x489626);
            } finally {
                _0x4a960c(_0x46b22b);
            }
        });
    });
}

async function _0x3c0a37(_0x3a48ba) {
    const _0x162d4d = {
        pageNum: _0x3a48ba,
        pageSize: 100,
        linkId: "3orGfh1YkwNLksxOcN8zWQ",
        business: "fission"
    };
    let _0x32c9ce = _0x162d4d,
        _0x395536 = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x32c9ce,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x32c9ce = await _0x505a2d.getbody(_0x395536);

    if (!_0x32c9ce) {
        return;
    }

    return new Promise(async _0x14582e => {
        $.dget(_0x3a3475(_0x32c9ce), async (_0x242a82, _0x1c57e8, _0x2e907a) => {
            try {
                if (_0x242a82) {
                    console.log("" + JSON.stringify(_0x242a82));
                    console.log(" API请求失败，请检查网路重试");
                    _0x242a82.includes("403") && ($.banip = true);
                } else {
                    _0x2e907a = JSON.parse(_0x2e907a);

                    if (_0x2e907a.code == 0) {
                        $.baglist = _0x2e907a.data.items;
                    } else {
                        console.log(_0x2e907a.errMsg);
                    }
                }
            } catch (_0x48d07c) {
                $.logErr(_0x48d07c, _0x1c57e8);
            } finally {
                _0x14582e(_0x2e907a);
            }
        });
    });
}

async function _0x3356e1(_0x209378, _0x3f6059) {
    let _0x27b46f = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x209378.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x209378.poolBaseId + ",\"prizeGroupId\":" + _0x209378.prizeGroupId + ",\"prizeBaseId\":" + _0x209378.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x18056e => {
        $.dpost(_0x3a3475(_0x27b46f), async (_0x5781e7, _0x2eb65d, _0x1189ef) => {
            try {
                if (_0x5781e7) {
                    console.log("" + JSON.stringify(_0x5781e7));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x5781e7.includes("403") && ($.banip = true);
                } else {
                    _0x1189ef = JSON.parse(_0x1189ef);

                    if (_0x1189ef.code == 0) {
                        if (_0x1189ef.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x1189ef.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x1189ef.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txfail = false) : console.log(_0x1189ef.data.message);
                            }
                        }
                    } else {
                        console.log(_0x1189ef.errMsg);
                    }
                }
            } catch (_0x187236) {
                $.logErr(_0x187236, _0x2eb65d);
            } finally {
                _0x18056e(_0x1189ef);
            }
        });
    });
}

async function _0x223f36(_0x1537f3, _0x5f2338) {
    let _0xdf2bc4 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x1537f3.id + ",\"business\":\"fission\",\"poolId\":" + _0x1537f3.poolBaseId + ",\"prizeGroupId\":" + _0x1537f3.prizeGroupId + ",\"prizeId\":" + _0x1537f3.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0xde3f35 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x368cea
    };
    const _0x537d25 = {
        url: "https://api.m.jd.com/api",
        body: _0xdf2bc4,
        headers: _0xde3f35
    };
    return new Promise(async _0x28bbc3 => {
        $.dpost(_0x537d25, async (_0x51081a, _0x14971e, _0x1fb3c2) => {
            try {
                if (_0x51081a) {
                    console.log("" + JSON.stringify(_0x51081a));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x51081a.includes("403") && ($.banip = true);
                } else {
                    _0x1fb3c2 = JSON.parse(_0x1fb3c2);

                    if (_0x1fb3c2.code == 0) {
                        _0x1fb3c2.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x5f2338)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x1fb3c2.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x1fb3c2.errMsg);
                    }
                }
            } catch (_0x55f648) {
                $.logErr(_0x55f648, _0x14971e);
            } finally {
                _0x28bbc3(_0x1fb3c2);
            }
        });
    });
}

function _0x3a3475(_0x53a74a) {
    const _0xae2f84 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x368cea
    };
    const _0x6c36d9 = {
        url: "https://api.m.jd.com/?" + _0x53a74a,
        headers: _0xae2f84
    };
    return _0x6c36d9;
}

function _0x393e65() {
    return new Promise(_0x5d59fc => {
        const _0x5497d7 = {
            Cookie: _0x368cea,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x49d43e = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x5497d7,
            timeout: 10000
        };
        $.get(_0x49d43e, (_0x5bf287, _0x387146, _0x25ae96) => {
            try {
                if (_0x25ae96) {
                    _0x25ae96 = JSON.parse(_0x25ae96);

                    if (!(_0x25ae96.islogin === "1")) {
                        _0x25ae96.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0xd4017b) {
                console.log(_0xd4017b);
            } finally {
                _0x5d59fc();
            }
        });
    });
}

function _0x3969f3() {
    return new Promise(_0x2b2f4c => {
        !_0x2beafa ? $.msg($.name, "", "" + _0x5cb1f2) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x5cb1f2);

        _0x2b2f4c();
    });
}

function _0x59912e(_0x5ee0ba) {
    try {
        if (typeof JSON.parse(_0x5ee0ba) == "object") {
            return true;
        }
    } catch (_0x5f1868) {
        console.log(_0x5f1868);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x1dd056(_0x21d924) {
    const _0x14b75b = _0x21d924.getFullYear(),
        _0x9181c0 = ("0" + (_0x21d924.getMonth() + 1)).slice(-2),
        _0x307f51 = ("0" + _0x21d924.getDate()).slice(-2),
        _0x2b5312 = ("0" + _0x21d924.getHours()).slice(-2),
        _0x2faa64 = ("0" + _0x21d924.getMinutes()).slice(-2),
        _0x469e57 = ("0" + _0x21d924.getSeconds()).slice(-2);

    return _0x14b75b + "/" + _0x9181c0 + "/" + _0x307f51 + " " + _0x2b5312 + ":" + _0x2faa64 + ":" + _0x469e57;
}

function _0x51b8d6(_0x1df9e4) {
    if (typeof _0x1df9e4 == "string") {
        try {
            return JSON.parse(_0x1df9e4);
        } catch (_0x36cf8f) {
            console.log(_0x36cf8f);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }