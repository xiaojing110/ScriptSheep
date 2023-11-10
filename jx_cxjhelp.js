
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
updatetime:2023/10/11
 */

const $ = new Env('Jx特价抽现金');
const _0x268c7d = $.isNode() ? require("./sendNotify") : "",
    _0x215927 = $.isNode() ? require("./jdCookie.js") : "",
    _0x34a9ac = require("./function/dylanz"),
    _0x4ad26c = require("./USER_AGENTS");

let _0x5d3649 = true,
    _0x305e25 = [],
    _0x105065 = [],
    _0x1f91ba = [],
    _0x16aa1 = [],
    _0x18195a,
    _0x55218e = [],
    _0x236915 = "",
    _0x24b592 = "",
    _0x15d9c0 = "",
    _0x157a0e = "",
    _0x331298,
    _0x5eb0d9 = process.env.JXCXJNUM || "9999",
    _0x322b91 = process.env.JXCXJLTNUM || "-1",
    _0x59d09c = process.env.JXCXJDELAY || "1",
    _0x2f1771 = process.env.TXDELAY || "5",
    _0x2e8d28 = process.env.JXCXJTORED || false,
    _0x2ac531 = process.env.JXCTOPPIN || "",
    _0xcc1cb5 = process.env.TXSILENT || false,
    _0x3f023b = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
    try {
        require("https-proxy-agent");

        _0x18195a = require("./function/proxy.js");
        $.dget = _0x18195a.intoRequest($.get.bind($));
        $.dpost = _0x18195a.intoRequest($.post.bind($));
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
    Object.keys(_0x215927).forEach(_0x3cdc4d => {
        _0x55218e.push(_0x215927[_0x3cdc4d]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x55218e = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x48ac4b($.getdata("CookiesJD") || "[]").map(_0x42eb84 => _0x42eb84.cookie)].filter(_0x259f4b => !!_0x259f4b);
}

$.banip = false;
!(async () => {
    if (!_0x55218e[0]) {
        const _0x1cac6b = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x1cac6b);
        return;
    }

    $.log("\n❗❗❗注意此活动开团是24小时一轮，助力机会0点重置❗❗❗");
    $.log("\n当前版本：20231030 仅车头抽奖提现");
    console.log("执行流程，车头开团--助力--抽奖--提现");
    console.log("TG反馈：https://t.me/dylan_jdpro");
    $.log("\n环境变量清单（可选项）：");
    $.log("  指定PIN车头，不指定默认CK1  JXCTOPPIN='jdpin'\n  多少助力停止，默认9999个  JXCXJNUM='100'\n  运行一次抽奖次数,默认抽完  JXCXJLTNUM='200'\n  每次抽奖间隔，默认1秒，单位秒  JXCXJDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='8'\n  开启提现到上限转红包  JXCXJTORED='true'\n  开启代理api  DY_PROXY='https://api'\n  关闭提现  NOTX='true'\n");

    //   let _0x2ad8e9 = await _0x4c8b77();

    let _0x2ad8e9 = []

    if (_0x2ac531) {
        console.log("\n已指定PIN：" + _0x2ac531);

        let _0xbbac8e = _0x55218e.findIndex(_0x22eb65 => _0x22eb65.includes(_0x2ac531));

        if (_0xbbac8e == -1) {
            console.log("运行的CK中没找到指定的PIN，停止执行");
            return;
        }

        _0x24b592 = _0x55218e[_0xbbac8e];
    } else {
        console.log("\n未指定PIN默认CK1车头");
        _0x24b592 = _0x55218e[0];
    }

    _0x236915 = _0x24b592;
    $.UserName = decodeURIComponent(_0x236915.match(/pt_pin=([^; ]+)(?=;?)/) && _0x236915.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.UA = _0x4ad26c.UARAM ? _0x4ad26c.UARAM(1) : _0x4ad26c.USER_AGENT;
    console.log("\n————————————————————车头开团————————————————————————");
    console.log("账号：" + ($.nickName || $.UserName));
    await _0x2da809();

    if (!$.isLogin) {
        const _0x9fee0f = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x9fee0f);
        $.isNode() && (await _0x268c7d.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
        return;
    }

    await _0x8409a5(1);
    await $.wait(1000);


    console.log("————————————————————————————————————————————————————");
    console.log("\n\n———————————————————开始助力车头—————————————————————");
    _0x331298 = 0;

    for (let _0x30d8c0 of _0x305e25) {
        if ($.banip) {
            break;
        }

        if (_0x55218e.length === 1) {
            console.log("");
            break;
        }

        console.log("\n去助力-> " + _0x30d8c0);
        $.suc = 0;
        $.alr = 0;
        $.nhp = 0;

        for (let _0x368938 = _0x331298; _0x368938 < _0x55218e.length; _0x368938++) {
            if (_0x55218e[_0x368938]) {
                _0x236915 = _0x55218e[_0x368938];
                $.UserName = decodeURIComponent(_0x236915.match(/pt_pin=([^; ]+)(?=;?)/) && _0x236915.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x368938 + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x4ad26c.UARAM ? _0x4ad26c.UARAM(1) : _0x4ad26c.USER_AGENT;
                console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
                await _0x15121c(_0x30d8c0);

                if ($.suc > Number(_0x5eb0d9) + 1) {
                    $.log("已达目标助力数，跳出！");
                    _0x331298 = _0x368938 + 1;
                    break;
                }

                await $.wait(1000);
            }
        }

        if ($.index === _0x55218e.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }

    console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
    _0x322b91 > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x322b91);

    let _0x5161c1 = new Date();

    _0x5161c1.setDate(_0x5161c1.getDate() - 1);

    _0x236915 = _0x24b592;
    $.UserName = decodeURIComponent(_0x236915.match(/pt_pin=([^; ]+)(?=;?)/) && _0x236915.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.isLogin = true;
    $.nickName = "";
    $.fail = 0;
    _0x105065 = [];
    _0x1f91ba = [];
    $.txj = true;
    $.fg = 1;
    $.txfull = false;
    $.nocashnum = 0;
    $.end = false;
    $.hotflag = false;
    $.toredfailnum = 0;
    $.UA = _0x4ad26c.UARAM ? _0x4ad26c.UARAM(1) : _0x4ad26c.USER_AGENT;

    let _0x41b485 = await _0x8409a5(0);

    if (_0x41b485.code != "0") {
        return;
    }

    $.log("本轮已抽奖次数：" + _0x41b485.data.drawPrizeNum);
    $.log("本轮剩余抽奖次数：" + $.times);
    $.log("本轮结束时间： " + _0x3a9b5f(new Date(Date.now() + _0x41b485.data.countDownTime)));

    for (let _0x278aae = 0; _0x278aae < (_0x322b91 > -1 && _0x322b91 < $.times ? _0x322b91 : $.times); _0x278aae++) {
        if ($.banip) {
            break;
        }

        process.stdout.write("\n第" + (_0x278aae + 1) + "次抽奖结果：");

        for (let _0x413570 of Array(3)) {
            await _0x5f00ac(_0x413570 + 1);

            if (!$.hotflag) {
                break;
            }

            await $.wait(Math.random() * 500 + _0x59d09c * 1000);
        }

        if ($.end) {
            break;
        }

        await $.wait(Math.random() * 500 + _0x59d09c * 1000);

        if ($.fail > 2) {
            $.log("连续3次优惠券，不继续抽了");
            break;
        }
    }

    _0x1f91ba.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x1f91ba.reduce((_0x2392fa, _0x6d2256) => _0x2392fa + _0x6d2256 * 100, 0) / 100 + "元");
    _0x105065.length !== 0 && $.log("\n本次抽奖获得现金总计：" + _0x105065.reduce((_0x36fff3, _0xb8769) => _0x36fff3 + _0xb8769 * 100, 0) / 100 + "元");

    if (_0x3f023b != "true") {
        if (new Date().getHours() < 7 && _0xcc1cb5) {
            return;
        }

        $.log("\n——————————开始提现（默认间隔5秒，变量TXDELAY）——————");
        _0x2e8d28 && $.log("\n已开启转红包，提现上限后会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x557f87 = 0; _0x557f87 < 50; _0x557f87++) {
            if ($.nocashnum > 2 || $.toredfailnum > 4) {
                break;
            }

            if ($.txfull && !_0x2e8d28) {
                $.log("\n本月提现到上限!如转红包请设置变量");
                break;
            }

            await _0x2cdd91(_0x557f87 + 1);
            await $.wait(1000);

            if (!$.baglist || $.baglist.length === 0) {
                break;
            }

            for (let _0x26ee76 of $.baglist) {
                if (new Date(_0x26ee76.createTime) < _0x5161c1 || $.toredfailnum > 4) {
                    $.nocashnum = 5;
                    break;
                }

                if (_0x26ee76.prizeType == 4) {
                    if (_0x26ee76.state == 0 || _0x26ee76.state == 2) {
                        process.stdout.write("" + Number(_0x26ee76.amount));

                        let _0x254cfa = await _0x3d388c(_0x26ee76, Number(_0x26ee76.amount));

                        $.txfail && (await $.wait(6000), _0x254cfa = await _0x3d388c(_0x26ee76, Number(_0x26ee76.amount)));

                        if ($.txfull && !_0x2e8d28) {
                            break;
                        }

                        if (_0x254cfa.data.message.includes("上限") && _0x2e8d28 && $.toredfailnum < 5) {
                            await _0x17cfdd(_0x26ee76, Number(_0x26ee76.amount));
                        }

                        await $.wait(_0x2f1771 * 1000);
                    } else {
                        _0x26ee76.state == 8;
                    }
                }
            }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x33345a, _0x442723) => _0x33345a + _0x442723 * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x407e1d, _0x144175) => _0x407e1d + _0x144175 * 100, 0) / 100 + "元");
    } else {
        $.log("\n\n⚠已设置不提现！");
    }

    _0x16aa1 = [];
    await $.wait(2000);
})().catch(_0x4ebb83 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4ebb83 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x8409a5(_0x1f9cd2) {
    const _0x971f30 = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA",
        inviter: ""
    };
    let _0x2ab23f = _0x971f30,
        _0x4f55b3 = {
            appId: "eb67b",
            fn: "inviteFissionHome",
            body: _0x2ab23f,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x2ab23f = await _0x34a9ac.getbody(_0x4f55b3);

    if (!_0x2ab23f) {
        return;
    }

    return new Promise(async _0x31a60d => {
        $.dpost(_0x29ec54(_0x2ab23f), async (_0x3032be, _0x48db45, _0x327919) => {
            try {
                if (_0x3032be) {
                    console.log("" + JSON.stringify(_0x3032be));
                    console.log("homeinfo请求失败，请检查网路重试");
                } else {
                    _0x327919 = JSON.parse(_0x327919);

                    if (_0x327919.code == 0) {
                        $.times = _0x327919.data.prizeNum;

                        if (_0x1f9cd2) {
                            console.log("助力码：" + _0x327919.data.inviter);
                        }

                        _0x305e25.push(_0x327919.data.inviter);
                    } else {
                        console.log(_0x327919.errMsg);
                    }
                }
            } catch (_0x377536) {
                $.logErr(_0x377536, _0x48db45);
            } finally {
                _0x31a60d(_0x327919);
            }
        });
    });
}

async function _0x47cf91() {
    const _0x313d3a = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x4160bf = _0x313d3a,
        _0x3ab3d6 = {
            appId: "b8469",
            fn: "inviteFissionReceive",
            body: _0x4160bf,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x4160bf = await _0x34a9ac.getbody(_0x3ab3d6);

    if (!_0x4160bf) {
        return;
    }

    return new Promise(async _0x14b062 => {
        $.dpost(_0x29ec54(_0x4160bf), async (_0x357e1b, _0x160b1a, _0x2254ff) => {
            try {
                _0x357e1b ? (console.log("" + JSON.stringify(_0x357e1b)), console.log("receive请求失败，请检查网路重试"), _0x357e1b.includes("403") && ($.banip = true)) : (_0x2254ff = JSON.parse(_0x2254ff), _0x2254ff.code == 0 ? process.stdout.write("----提现金：" + _0x2254ff.data.amount) : $.txj = false);
            } catch (_0x3563e2) {
                $.logErr(_0x3563e2, _0x160b1a);
            } finally {
                _0x14b062(_0x2254ff);
            }
        });
    });
}

async function _0x5f00ac(_0x1561fb) {
    const _0x482136 = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA"
    };
    let _0x175b89 = _0x482136,
        _0xfa3b4b = {
            appId: "c02c6",
            fn: "inviteFissionDrawPrize",
            body: _0x175b89,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: $.fg,
            ua: $.UA
        };
    $.fg == 1 && ($.fg = 0);
    _0x175b89 = await _0x34a9ac.getbody(_0xfa3b4b);

    if (!_0x175b89) {
        return;
    }

    return new Promise(async _0x4d012f => {
        $.dpost(_0x29ec54(_0x175b89), async (_0x3262c6, _0x9e7ab6, _0x565281) => {
            try {
                if (_0x3262c6) {
                    console.log("" + JSON.stringify(_0x3262c6));
                    console.log("lottery请求失败，请检查网路重试");
                    _0x3262c6.includes("403") && ($.banip = true);
                } else {
                    _0x565281 = JSON.parse(_0x565281);

                    if (_0x565281.code == 0) {
                        const _0x170dc8 = _0x565281.data.prizeType;

                        if (!_0x170dc8) {
                            fail++;
                        }

                        switch (_0x170dc8) {
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
                                let _0x52f2a4 = parseFloat(_0x565281.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x52f2a4 + "现金💰️");

                                _0x105065.push(_0x52f2a4);

                                const _0x15b83f = {
                                    prizeValue: _0x565281.data.prizeValue,
                                    id: _0x565281.data.id,
                                    poolBaseId: _0x565281.data.poolBaseId,
                                    prizeGroupId: _0x565281.data.prizeGroupId,
                                    prizeBaseId: _0x565281.data.prizeBaseId
                                };

                                _0x16aa1.push(_0x15b83f);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            case 2:
                                let _0x56fd0f = parseFloat(_0x565281.data.prizeValue).toFixed(2);

                                process.stdout.write(_0x56fd0f + "红包🧧");

                                _0x1f91ba.push(_0x56fd0f);

                                $.fail = 0;
                                $.hotflag = false;
                                break;

                            default:
                                $.hotflag = false;
                                console.log(JSON.stringify(_0x565281.data));
                        }
                    } else {
                        if (_0x565281.errMsg.includes("火爆")) {
                            process.stdout.write("未中奖 ");
                            $.hotflag = true;
                        } else {
                            _0x565281.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x565281.errMsg)) : ($.hotflag = false, console.log(_0x565281.errMsg));
                        }
                    }
                }
            } catch (_0x4b156e) {
                $.logErr(_0x4b156e, _0x9e7ab6);
            } finally {
                _0x4d012f(_0x565281);
            }
        });
    });
}

async function _0x2cdd91(_0x1e60b8) {
    const _0x243c04 = {
        pageNum: _0x1e60b8,
        pageSize: 100,
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA",
        business: "fission"
    };
    let _0x1ef49b = _0x243c04,
        _0x4aca8b = {
            appId: "f2b1d",
            fn: "superRedBagList",
            body: _0x1ef49b,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
    _0x1ef49b = await _0x34a9ac.getbody(_0x4aca8b);

    if (!_0x1ef49b) {
        return;
    }

    return new Promise(async _0xb75d18 => {
        $.dget(_0x29ec54(_0x1ef49b), async (_0x3ce1b6, _0x1c8f7f, _0x5ea470) => {
            try {
                if (_0x3ce1b6) {
                    console.log("" + JSON.stringify(_0x3ce1b6));
                    console.log(" API请求失败，请检查网路重试");
                    _0x3ce1b6.includes("403") && ($.banip = true);
                } else {
                    _0x5ea470 = JSON.parse(_0x5ea470);
                    _0x5ea470.code == 0 ? $.baglist = _0x5ea470.data.items : console.log(_0x5ea470.errMsg);
                }
            } catch (_0x4d33f5) {
                $.logErr(_0x4d33f5, _0x1c8f7f);
            } finally {
                _0xb75d18(_0x5ea470);
            }
        });
    });
}

async function _0x15121c(_0x1ab980) {
    const _0x4d74a4 = {
        linkId: "Wvzc_VpNTlSkiQdHT8r7QA",
        isJdApp: true,
        inviter: _0x1ab980
    };
    let _0x2475f4 = _0x4d74a4,
        _0x2927b6 = {
            appId: "c5389",
            fn: "inviteFissionhelp",
            body: _0x2475f4,
            apid: "activities_platform",
            ver: $.UA.split(";")[2],
            cl: "ios",
            user: $.UserName,
            code: 1,
            xcr: 1,
            ua: $.UA
        };
    _0x2475f4 = await _0x34a9ac.getbody(_0x2927b6);

    if (!_0x2475f4) {
        return;
    }

    return new Promise(async _0x218eb1 => {
        $.dpost(_0x29ec54(_0x2475f4), async (_0x9bd868, _0x29891c, _0x68f859) => {
            try {
                if (_0x9bd868) {
                    console.log("" + JSON.stringify(_0x9bd868));
                    console.log("help请求失败，请检查网路重试");
                    _0x9bd868.includes("403") && ($.banip = true);
                } else {
                    _0x68f859 = JSON.parse(_0x68f859);

                    if (_0x68f859.code == 0) {
                        if (!_0x68f859.data.helpFlg) {
                            $.log("结果：不能助力自己！");
                            return;
                        }

                        if (_0x68f859.data.helpResult == 1) {
                            $.suc++;
                            $.alr = 0;
                            console.log("结果：助力成功 ✅ " + ($.suc || ""));
                        } else {
                            if (_0x68f859.data.helpResult == 6) {
                                console.log("结果：已经助力过TA！");
                                $.alr++;
                            } else {
                                if (_0x68f859.data.helpResult == 3) {
                                    console.log("结果：没有次数了！");
                                    $.nohelp = true;
                                    $.nhp++;
                                } else {
                                    if (_0x68f859.data.helpResult == 2) {
                                        $.log("结果：助力黑了 💣");
                                        $.hot = true;
                                    } else {
                                        if (_0x68f859.data.helpResult == 4) {
                                            $.log("结果：没有助力次数！");
                                            $.nhp++;
                                        } else {
                                            _0x68f859.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(_0x68f859));
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        console.log(_0x68f859.errMsg);
                    }
                }
            } catch (_0x296047) {
                $.logErr(_0x296047, _0x29891c);
            } finally {
                _0x218eb1(_0x68f859);
            }
        });
    });
}

async function _0x3d388c(_0x30b2d3, _0x5cbad8) {
    let _0x3e8f71 = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x30b2d3.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x30b2d3.poolBaseId + ",\"prizeGroupId\":" + _0x30b2d3.prizeGroupId + ",\"prizeBaseId\":" + _0x30b2d3.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    return new Promise(async _0xc6ca15 => {
        $.dpost(_0x29ec54(_0x3e8f71), async (_0x2afb99, _0x5f1d87, _0x33d948) => {
            try {
                if (_0x2afb99) {
                    console.log("" + JSON.stringify(_0x2afb99));
                    console.log("apCashWithDraw请求失败，请检查网路重试");
                    _0x2afb99.includes("403") && ($.banip = true);
                } else {
                    _0x33d948 = JSON.parse(_0x33d948);

                    if (_0x33d948.code == 0) {
                        if (_0x33d948.data.message.indexOf("待发放") > -1) {
                            process.stdout.write("❎");
                            $.txfail = true;
                        } else {
                            if (_0x33d948.data.message.includes("上限")) {
                                $.txfull = true;
                            } else {
                                _0x33d948.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x5cbad8), $.txfail = false) : console.log(_0x33d948.data.message);
                            }
                        }
                    } else {
                        console.log(_0x33d948.errMsg);
                    }
                }
            } catch (_0x2f4f63) {
                $.logErr(_0x2f4f63, _0x5f1d87);
            } finally {
                _0xc6ca15(_0x33d948);
            }
        });
    });
}

async function _0x17cfdd(_0x22edb6, _0x5503a2) {
    let _0x4fc12a = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x22edb6.id + ",\"business\":\"fission\",\"poolId\":" + _0x22edb6.poolBaseId + ",\"prizeGroupId\":" + _0x22edb6.prizeGroupId + ",\"prizeId\":" + _0x22edb6.prizeBaseId + ",\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

    const _0x2e8311 = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x236915
    };
    const _0x4d1f82 = {
        url: "https://api.m.jd.com/api",
        body: _0x4fc12a,
        headers: _0x2e8311
    };
    return new Promise(async _0x304b72 => {
        $.dpost(_0x4d1f82, async (_0x168990, _0x2e51d0, _0x3ccf91) => {
            try {
                if (_0x168990) {
                    console.log("" + JSON.stringify(_0x168990));
                    console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
                    _0x168990.includes("403") && ($.banip = true);
                } else {
                    _0x3ccf91 = JSON.parse(_0x3ccf91);

                    if (_0x3ccf91.code == 0) {
                        _0x3ccf91.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x5503a2)) : (process.stdout.write("❎ "), $.toredfailnum++);
                    } else {
                        _0x3ccf91.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3ccf91.errMsg);
                    }
                }
            } catch (_0x29efe8) {
                $.logErr(_0x29efe8, _0x2e51d0);
            } finally {
                _0x304b72(_0x3ccf91);
            }
        });
    });
}

function _0x29ec54(_0x4aef44) {
    const _0x2b7e3d = {
        Host: "api.m.jd.com",
        Origin: "https://prodev.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        Cookie: _0x236915
    };
    const _0x53104a = {
        url: "https://api.m.jd.com/?" + _0x4aef44,
        headers: _0x2b7e3d
    };
    return _0x53104a;
}

function _0x2da809() {
    return new Promise(_0x49361f => {
        const _0x2216f7 = {
            Cookie: _0x236915,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x24106e = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x2216f7,
            timeout: 10000
        };
        $.get(_0x24106e, (_0x10e779, _0x4c40e6, _0x2b6c6b) => {
            try {
                if (_0x2b6c6b) {
                    _0x2b6c6b = JSON.parse(_0x2b6c6b);

                    if (!(_0x2b6c6b.islogin === "1")) {
                        _0x2b6c6b.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x48c3a7) {
                console.log(_0x48c3a7);
            } finally {
                _0x49361f();
            }
        });
    });
}

function _0x2b7b80() {
    return new Promise(_0x6fbd6e => {
        !_0x5d3649 ? $.msg($.name, "", "" + _0x15d9c0) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x15d9c0);

        _0x6fbd6e();
    });
}

function _0x115a95(_0x3ff348) {
    try {
        if (typeof JSON.parse(_0x3ff348) == "object") {
            return true;
        }
    } catch (_0xaaafd2) {
        console.log(_0xaaafd2);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}


function _0x3a9b5f(_0x25ed21) {
    const _0x1f2c16 = _0x25ed21.getFullYear(),
        _0x4fc527 = ("0" + (_0x25ed21.getMonth() + 1)).slice(-2),
        _0x576ba4 = ("0" + _0x25ed21.getDate()).slice(-2),
        _0x2ffba5 = ("0" + _0x25ed21.getHours()).slice(-2),
        _0x546f1f = ("0" + _0x25ed21.getMinutes()).slice(-2),
        _0x3c5872 = ("0" + _0x25ed21.getSeconds()).slice(-2);

    return _0x1f2c16 + "/" + _0x4fc527 + "/" + _0x576ba4 + " " + _0x2ffba5 + ":" + _0x546f1f + ":" + _0x3c5872;
}

function _0x48ac4b(_0x58804c) {
    if (typeof _0x58804c == "string") {
        try {
            return JSON.parse(_0x58804c);
        } catch (_0x558e17) {
            console.log(_0x558e17);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }