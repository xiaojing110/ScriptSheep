
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
const _0x28f7b2 = $.isNode() ? require("./jdCookie.js") : "",
    _0x23d204 = require("./function/dylanz"),
    _0x2f0af0 = require("./USER_AGENTS");

let _0x1c5b87 = [],
    _0x328f11 = [],
    _0x5d3005 = [],
    _0x173bbc = [],
    _0x279a7e,
    _0x2f446b = [],
    _0x4bf2df = "",
    _0x1617ff = "",
    _0x5c7ef7 = process.env.JXCXJLTNUM || "-1",
    _0x56e6ec = process.env.JXCXJDELAY || "1",
    _0x3571c6 = process.env.TXDELAY || "5",
    _0x4c03e1 = process.env.JXCXJTORED || false,
    _0x570039 = process.env.TXSILENT || false,
    _0x53a7f1 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x279a7e = require("./function/proxy.js");
        $.dget = _0x279a7e.intoRequest($.get.bind($));
        $.dpost = _0x279a7e.intoRequest($.post.bind($));
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
    Object.keys(_0x28f7b2).forEach(_0x13c51b => {
        _0x2f446b.push(_0x28f7b2[_0x13c51b]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x2f446b = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0xe6ad6d($.getdata("CookiesJD") || "[]").map(_0x2235d5 => _0x2235d5.cookie)].filter(_0x584a92 => !!_0x584a92);
}

$.banip = false;
!(async () => {
    if (!_0x2f446b[0]) {
        const _0xff2bb1 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0xff2bb1);
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231031 fix");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  运行一次抽奖次数,默认抽完  JXCXJLTNUM='200'\n  每次抽奖间隔，默认1秒  JXCXJDELAY='3'\n  提现间隔，单位秒  TXDELAY='8'\n  开启提现到上限转红包  JXCXJTORED='true'\n  开启代理API  DY_PROXY='https://api'\n  关闭提现  NOTX='true'\n");
    console.log("\n\n开始抽奖和提现...");
    _0x5c7ef7 > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x5c7ef7);

    let _0x517df8 = new Date();

    _0x517df8.setDate(_0x517df8.getDate() - 1);

    for (let _0x2cba2e = 0; _0x2cba2e < _0x2f446b.length; _0x2cba2e++) {
        if (_0x2f446b[_0x2cba2e]) {
            _0x4bf2df = _0x2f446b[_0x2cba2e];
            $.UserName = decodeURIComponent(_0x4bf2df.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4bf2df.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x2cba2e + 1;
            $.isLogin = true;
            $.nickName = "";
            $.fail = 0;
            _0x328f11 = [];
            _0x5d3005 = [];
            $.txj = true;
            $.fg = 1;
            $.txfull = false;
            $.nocashnum = 0;
            $.end = false;
            $.hotflag = false;
            $.toredfailnum = 0;
            $.UA = _0x2f0af0.UARAM ? _0x2f0af0.UARAM(1) : _0x2f0af0.USER_AGENT;
            console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

            let _0x7a6ffe = await _0xe87139(1);

            if (_0x7a6ffe.code != "0") {
                continue;
            }

            $.log("本轮已抽奖次数：" + _0x7a6ffe.data.drawPrizeNum);
            $.log("本轮剩余抽奖次数：" + $.times);
            $.log("本轮结束时间： " + _0x58eb43(new Date(Date.now() + _0x7a6ffe.data.countDownTime)));

            for (let _0x1e0966 = 0; _0x1e0966 < (_0x5c7ef7 > -1 && _0x5c7ef7 < $.times ? _0x5c7ef7 : $.times); _0x1e0966++) {
                if ($.banip) {
                    break;
                }

                process.stdout.write("\n第" + (_0x1e0966 + 1) + "次抽奖结果：");

                for (let _0x36d0db of Array(3)) {
                    await _0x1983a6(_0x36d0db + 1);

                    if (!$.hotflag) {
                        break;
                    }

                    await $.wait(Math.random() * 500 + _0x56e6ec * 1000);
                }

                if ($.end) {
                    break;
                }

                await $.wait(Math.random() * 500 + _0x56e6ec * 1000);

                if ($.fail > 2) {
                    $.log("连续3次优惠券，不继续抽了");
                    break;
                }
            }

            _0x5d3005.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x5d3005.reduce((_0x116d7e, _0x86e57f) => _0x116d7e + _0x86e57f * 100, 0) / 100 + "元");
            _0x328f11.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x328f11.reduce((_0x4a7fb6, _0x15f4a5) => _0x4a7fb6 + _0x15f4a5 * 100, 0) / 100 + "元");

            if (_0x53a7f1 != "true") {
                if (new Date().getHours() < 7 && _0x570039) {
                    continue;
                }

                $.log("\n开始提现（默认间隔5秒，变量TXDELAY）...");
                _0x4c03e1 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
                $.txsuc = [];
                $.toredsuc = [];

                for (let _0x2b7c41 = 0; _0x2b7c41 < 50; _0x2b7c41++) {
                    if ($.nocashnum > 2 || $.toredfailnum > 4) {
                        break;
                    }

                    if ($.txfull && !_0x4c03e1) {
                        $.log("\n本月提现到上限!如转红包请设置变量");
                        break;
                    }

                    await _0x589d57(_0x2b7c41 + 1);
                    await $.wait(1000);

                    if (!$.baglist || $.baglist.length === 0) {
                        break;
                    }

                    for (let _0x41b281 of $.baglist) {
                        if (new Date(_0x41b281.createTime) < _0x517df8 || $.toredfailnum > 4) {
                            $.nocashnum = 5;
                            break;
                        }

                        if (_0x41b281.prizeType == 4) {
                            if (_0x41b281.state == 0 || _0x41b281.state == 2) {
                                process.stdout.write("" + Number(_0x41b281.amount));

                                let _0x39c0bb = await _0x31b4e0(_0x41b281, Number(_0x41b281.amount));

                                $.txfail && (await $.wait(6000), _0x39c0bb = await _0x31b4e0(_0x41b281, Number(_0x41b281.amount)));

                                if ($.txfull && !_0x4c03e1) {
                                    break;
                                }

                                if (_0x39c0bb.data.message.includes("上限") && _0x4c03e1 && $.toredfailnum < 5) {
                                    await _0x1ce040(_0x41b281, Number(_0x41b281.amount));
                                }

                                await $.wait(_0x3571c6 * 1000);
                            } else {
                                _0x41b281.state == 8;
                            }
                        }
                    }
                }

                $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x421304, _0x2fffeb) => _0x421304 + _0x2fffeb * 100, 0) / 100 + "元");
                $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x242ff6, _0x1c14ca) => _0x242ff6 + _0x1c14ca * 100, 0) / 100 + "元");
            } else {
                $.log("\n\n⚠已设置不提现！");
            }

            _0x173bbc = [];
            await $.wait(2000);
        }
    }
})().catch(_0x1c1618 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1c1618 + "!", "");
}).finally(() => {
    $.done();
});

async function _0xe87139(_0x1c0b5f) {
    const _0x560295 = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA",
        inviter: ""
    };
    let _0x162b5e = _0x560295,
        _0x3b0516 = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x162b5e,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x162b5e = await _0x23d204.getbody(_0x3b0516);

    if (!_0x162b5e) {
        return;
    }

    return new Promise(async _0x56e16f => {
        $.dpost(_0x386739(_0x162b5e), async (_0x5bed76, _0xb2cee1, _0x5b033d) => {
            try {
                if (_0x5bed76) {
                    console.log("" + JSON.stringify(_0x5bed76));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x5b033d = JSON.parse(_0x5b033d);

                    if (_0x5b033d.code == 0) {
                        $.times = _0x5b033d.data.prizeNum;

                        if (_0x1c0b5f) {
                            console.log("我的助力码：" + _0x5b033d.data.inviter);
                        }

                        _0x1c5b87.push(_0x5b033d.data.inviter);
                    } else {
                        console.log(_0x5b033d.errMsg);
                    }
                }
            } catch (_0x5d98a7) {
                $.logErr(_0x5d98a7, _0xb2cee1);
            } finally {
                _0x56e16f(_0x5b033d);
            }
        });
    });
}

async function _0x1563d0() {
    const _0x1dcaa9 = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x49ee14 = _0x1dcaa9,
        _0x1a5355 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x49ee14,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x49ee14 = await _0x23d204.getbody(_0x1a5355);

    if (!_0x49ee14) {
        return;
    }

    return new Promise(async _0x2a701f => {
        $.dpost(_0x386739(_0x49ee14), async (_0x5f2e8d, _0x591606, _0x24bb6c) => {
            try {
                _0x5f2e8d ? (console.log("" + JSON.stringify(_0x5f2e8d)), console.log("receive请求失败，请检查网路重试"), _0x5f2e8d.includes("403") && ($.banip = true)) : (_0x24bb6c = JSON.parse(_0x24bb6c), _0x24bb6c.code == 0 ? process.stdout.write("----提现金：" + _0x24bb6c.data.amount) : $.txj = false);
            } catch (_0x400981) {
                $.logErr(_0x400981, _0x591606);
            } finally {
                _0x2a701f(_0x24bb6c);
            }
        });
    });
}

async function _0x1983a6(_0x23329f) {
    const _0x58ff3a = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x1cb0e4 = _0x58ff3a,
        _0x23e08a = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x1cb0e4,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x1cb0e4 = await _0x23d204.getbody(_0x23e08a);

    if (!_0x1cb0e4) {
        return;
    }

    return new Promise(async _0x3ebc27 => {
        $.dpost(_0x386739(_0x1cb0e4), async (_0x148190, _0x57ece0, _0x732bdb) => {
            try {
                if (_0x148190) {
                    console.log("" + JSON.stringify(_0x148190));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x148190.includes("403") && ($.banip = true);
                } else {
                    _0x732bdb = JSON.parse(_0x732bdb);

                    if (_0x732bdb.code == 0) {
                        const _0x82019a = _0x732bdb.data.prizeType;

                        if (!_0x82019a) {
                            fail++;
                        }

                        switch (_0x82019a) {
                            case 1:
                                process.stdout.write("垃圾卷😤");
                                $.fail++;
                                $.hotflag = false;
                                break;

                            case 6:
                                process.stdout.write("京喜礼包💩");
                                $.hotflag = false;
                                break;

                            case 4:
                                let _0x45fe6d = parseFloat(_0x732bdb.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x45fe6d + "现金💰️");

                                _0x328f11.push(_0x45fe6d);

                                const _0x22ede6 = {
                                    prizeValue: _0x732bdb.data.prizeValue,
                                    id: _0x732bdb.data.id,
                                    poolBaseId: _0x732bdb.data.poolBaseId,
                                    prizeGroupId: _0x732bdb.data.prizeGroupId,
                                    prizeBaseId: _0x732bdb.data.prizeBaseId
                                };

                                _0x173bbc.push(_0x22ede6);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x23f4f9 = parseFloat(_0x732bdb.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x23f4f9 + "红包🧧");

                                _0x5d3005.push(_0x23f4f9);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x732bdb.data));
                        }
                    } else {
                        if (_0x732bdb.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            if (_0x732bdb.errMsg.includes("结束")) {
                                $.end = true;
                                $.hotflag = false;
                                console.log(_0x732bdb.errMsg);
                            } else {
                                $.hotflag = false;
                                console.log(_0x732bdb.errMsg);
                            }
                        }
                    }
                }
            } catch (_0x8e71a5) {
                $.logErr(_0x8e71a5, _0x57ece0);
            } finally {
                _0x3ebc27(_0x732bdb);
            }
        });
    });
}

async function _0x589d57(_0x54f127) {
    const _0x19c54e = {
        pageNum: _0x54f127,
        pageSize: 100,
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA",
        business: "fission"
    };
    let _0x196ab7 = _0x19c54e,
        _0x46248d = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x196ab7,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x196ab7 = await _0x23d204.getbody(_0x46248d);

    if (!_0x196ab7) {
        return;
    }

    return new Promise(async _0x5e619f => {
        $.dget(_0x386739(_0x196ab7), async (_0x41e19e, _0x21ecac, _0xb444c0) => {
            try {
                _0x41e19e ? (console.log("" + JSON.stringify(_0x41e19e)), console.log(" API请求失败，请检查网路重试"), _0x41e19e.includes("403") && ($.banip = true)) : (_0xb444c0 = JSON.parse(_0xb444c0), _0xb444c0.code == 0 ? $.baglist = _0xb444c0.data.items : console.log(_0xb444c0.errMsg));
            } catch (_0x4892c0) {
                $.logErr(_0x4892c0, _0x21ecac);
            } finally {
                _0x5e619f(_0xb444c0);
            }
        });
    });
}

async function _0x31b4e0(_0x1428dd, _0x30c71f) {
    let _0x5e2f13 = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x1428dd.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x1428dd.poolBaseId + ",\"prizeGroupId\":" + _0x1428dd.prizeGroupId + ",\"prizeBaseId\":" + _0x1428dd.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0x2f1fdf => {
        $.dpost(_0x386739(_0x5e2f13), async (_0x3f9f25, _0x1e0250, _0x374b9d) => {
            try {
                if (_0x3f9f25) {
                    console.log("" + JSON.stringify(_0x3f9f25));
                    console.log("apCashWithDraw请求失败，请检查网路重试");

                    if (_0x3f9f25.includes("403")) {
                        $.banip = true;
                    }
                } else {
                    _0x374b9d = JSON.parse(_0x374b9d);

                    if (_0x374b9d.code == 0) {
                        if (_0x374b9d.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x374b9d.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x374b9d.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x30c71f), $.txfail = false) : console.log(_0x374b9d.data.message);
                            }
                        }
                    } else {
                        console.log(_0x374b9d.errMsg);
                    }
                }
            } catch (_0x33ab7d) {
                $.logErr(_0x33ab7d, _0x1e0250);
            } finally {
                _0x2f1fdf(_0x374b9d);
            }
        });
    });
}

async function _0x1ce040(_0x4b37e9, _0x71616d) {
    let _0xdd9e72 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x4b37e9.id + ",\"business\":\"fission\",\"poolId\":" + _0x4b37e9.poolBaseId + ",\"prizeGroupId\":" + _0x4b37e9.prizeGroupId + ",\"prizeId\":" + _0x4b37e9.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x5ee9f7 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4bf2df
    };
    const _0x261aac = {
        url: "https://api.m.jd.com/api",
        body: _0xdd9e72,
        headers: _0x5ee9f7
    };
    return new Promise(async _0x389352 => {
        $.dpost(_0x261aac, async (_0x35b218, _0x5a83cc, _0xdb50e3) => {
            try {
                if (_0x35b218) {
                    console.log("" + JSON.stringify(_0x35b218));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x35b218.includes("403") && ($.banip = true);
                } else {
                    _0xdb50e3 = JSON.parse(_0xdb50e3);

                    if (_0xdb50e3.code == 0) {
                        _0xdb50e3.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x71616d)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0xdb50e3.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0xdb50e3.errMsg);
                    }
                }
            } catch (_0x92287d) {
                $.logErr(_0x92287d, _0x5a83cc);
            } finally {
                _0x389352(_0xdb50e3);
            }
        });
    });
}

function _0x386739(_0x439457) {
    const _0x330180 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x4bf2df
    };
    const _0x397070 = {
        url: "https://api.m.jd.com/?" + _0x439457,
        headers: _0x330180
    };
    return _0x397070;
}

function _0x375606() {
    return new Promise(_0x26f766 => {
        const _0x30920f = {
            Cookie: _0x4bf2df,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x301a86 = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x30920f,
            timeout: 10000
        };
        $.get(_0x301a86, (_0x48e163, _0x1ea440, _0x181177) => {
            try {
                if (_0x181177) {
                    _0x181177 = JSON.parse(_0x181177);

                    if (!(_0x181177.islogin === "1")) {
                        _0x181177.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x4a7835) {
                console.log(_0x4a7835);
            } finally {
                _0x26f766();
            }
        });
    });
}

function _0x52148d() {
    return new Promise(_0x3c75fc => {
        $.log("京东账号" + $.index + $.nickName + "\n" + _0x1617ff);

        _0x3c75fc();
    });
}

function _0xb31382(_0x2efc10) {
    try {
        if (typeof JSON.parse(_0x2efc10) == "object") {
            return true;
        }
    } catch (_0x362912) {
        console.log(_0x362912);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x58eb43(_0x3744d7) {
    const _0x51fc4f = _0x3744d7.getFullYear(),
        _0x1b4efa = ("0" + (_0x3744d7.getMonth() + 1)).slice(-2),
        _0x185bce = ("0" + _0x3744d7.getDate()).slice(-2),
        _0x53322b = ("0" + _0x3744d7.getHours()).slice(-2),
        _0x5c6a0f = ("0" + _0x3744d7.getMinutes()).slice(-2),
        _0x58daec = ("0" + _0x3744d7.getSeconds()).slice(-2);

    return _0x51fc4f + "/" + _0x1b4efa + "/" + _0x185bce + " " + _0x53322b + ":" + _0x5c6a0f + ":" + _0x58daec;
}

function _0xe6ad6d(_0x1e6b69) {
    if (typeof _0x1e6b69 == "string") {
        try {
            return JSON.parse(_0x1e6b69);
        } catch (_0x481ac3) {
            console.log(_0x481ac3);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }