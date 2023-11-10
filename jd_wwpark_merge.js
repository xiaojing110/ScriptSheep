/*
汪汪乐园合成
7 7 7 7 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_wwpark_merge.js
跑会黑，自己决定！！！
6dy  2023/7/29
*/
const $ = new Env('汪汪乐园合成');
const _0x2ca2d7 = $.isNode() ? require("./jdCookie.js") : "",
    _0x43a7a0 = require("./function/dylany.js"),
    _0x6a3a09 = $.isNode() ? require("./sendNotify") : "";

let _0x1d738b = [],
    _0x3c47ec = "",
    _0x30d7ff = false;

if ($.isNode()) {
    Object.keys(_0x2ca2d7).forEach(_0x3a54a4 => {
        _0x1d738b.push(_0x2ca2d7[_0x3a54a4]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x1d738b = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3c9c8d($.getdata("CookiesJD") || "[]").map(_0x57b7e4 => _0x57b7e4.cookie)].filter(_0x50dc9b => !!_0x50dc9b);
}

$.JOY_COIN_MAXIMIZE = 0;
message = "";
!(async () => {
    if (!_0x1d738b[0]) {
        const _0x471ee4 = {
            "open-url": "https://bean.m.jd.com/"
        };
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x471ee4);
        return;
    }

    console.log("\n跑会黑，风险自担！！！");
    console.log("只前5个CK，TG频道：https://t.me/dylan_jdpro");

    for (let _0x5d222c = 0; _0x5d222c < "5"; _0x5d222c++) {
        _0x3c47ec = _0x1d738b[_0x5d222c];

        if (_0x3c47ec) {
            $.UserName = decodeURIComponent(_0x3c47ec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3c47ec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x5d222c + 1;
            $.isLogin = true;
            $.nickName = "";
            $.maxJoyCount = 10;
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x5cc6d8();

            if (!$.isLogin) {
                const _0x540e7f = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x540e7f);
                $.isNode() && (await _0x6a3a09.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
            $.hasJoyCoin = true;
            await _0x252f22();
            await _0x58f698(true);
            await $.wait(500);

            if (!$.joyBaseInfo) {
                continue;
            }

            if ($.joyBaseInfo.joyCoin == 0) {
                $.log("还未过新手任务，去完成！！！");
                await _0x3ec2eb();
                await $.wait(200);
                await _0x58f698();
                await $.wait(200);
                await _0x179bd5("{\"guideStep\":11,\"joyOneId\":" + $.newjoylist[0].id + ",\"joyTwoId\":" + $.newjoylist[1].id + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}");
                await $.wait(200);
                await _0x179bd5("{\"guideStep\":12,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}");
                await $.wait(200);
                await _0x58f698();
            }

            $.activityJoyList = [];
            $.workJoyInfoList = [];
            await _0x4bc87e(true);
            await $.wait(500);
            await _0x9e514a();
            await $.wait(500);
            await _0x5ce2b5($.workJoyInfoList);

            try {
                await _0x459ed6($.activityJoyList);
                await $.wait(200);
            } catch (_0x18df9a) {
                $.logErr(_0x18df9a);
            }

            await $.wait(2500);
        }
    }
})().catch(_0x54e7de => $.logErr(_0x54e7de)).finally(() => $.done());

async function _0x58f698(_0x134764 = false) {
    return new Promise(async _0x2cd94e => {
        let _0x43d242 = await _0x18093b("joyBaseInfo", "{\"taskId\":\"\",\"inviteType\":\"\",\"inviterPin\":\"\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "4abce");

        $.post(_0x43d242, async (_0x3fdfe0, _0x9d0ef6, _0x236429) => {
            try {
                _0x3fdfe0 ? (console.log("" + JSON.stringify(_0x3fdfe0)), console.log("getJoyBaseInfo API请求失败，请检查网路重试")) : (_0x236429 = JSON.parse(_0x236429), _0x236429.success ? _0x134764 && ($.log("等级:" + _0x236429.data.level + "|金币:" + _0x266911(_0x236429.data.joyCoin)), _0x236429.data.level >= 30 && $.isNode() && (await _0x6a3a09.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x236429.data.level + "\n已达最高30级\n请到京东极速版APP提现6.66\n提现入口：我的->汪汪乐园->点左上角等级"), $.log("\n开始解锁新场景...\n"))) : $.log(_0x236429.errMsg), $.joyBaseInfo = _0x236429.data);
            } catch (_0x101c3f) {
                $.logErr(_0x101c3f, _0x9d0ef6);
            } finally {
                _0x2cd94e($.joyBaseInfo);
            }
        });
    });
}

function _0x4bc87e(_0x3d23e2 = false) {
    return new Promise(async _0x4a4df4 => {
        let _0x26e007 = await _0x273c8a("joyList", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "e18ed");

        $.get(_0x26e007, async (_0x5370d1, _0x38d659, _0x723406) => {
            try {
                if (_0x5370d1) {
                    console.log("" + JSON.stringify(_0x5370d1));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else {
                    _0x723406 = JSON.parse(_0x723406);

                    if (_0x723406.success) {
                        if (_0x3d23e2) {
                            $.log("\n===== JOY 状态 start =====");
                            $.log("在逛街的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");

                            for (let _0x55521c = 0; _0x55521c < _0x723406.data.activityJoyList.length; _0x55521c++) {
                                $.log("id:" + _0x723406.data.activityJoyList[_0x55521c].id + "|name: " + _0x723406.data.activityJoyList[_0x55521c].name + "|level: " + _0x723406.data.activityJoyList[_0x55521c].level);
                                _0x723406.data.activityJoyList[_0x55521c].level >= 30 && $.isNode() && (await _0x6a3a09.sendNotify($.name + " - 账号" + $.index + " - " + $.nickName, "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n当前等级: " + _0x723406.data.level + "\n已达到单次最高等级奖励\n请尽快前往活动查看领取\n活动入口：京东极速版APP->汪汪乐园\n"));
                            }

                            $.log("\n在铲土的JOY ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️");

                            for (let _0x5a0ecc = 0; _0x5a0ecc < _0x723406.data.workJoyInfoList.length; _0x5a0ecc++) {
                                $.log("工位: " + _0x723406.data.workJoyInfoList[_0x5a0ecc].location + " [" + (_0x723406.data.workJoyInfoList[_0x5a0ecc].unlock ? "已开" : "未开") + "]|JOY= " + (_0x723406.data.workJoyInfoList[_0x5a0ecc].joyDTO ? "id:" + _0x723406.data.workJoyInfoList[_0x5a0ecc].joyDTO.id + "|name: " + _0x723406.data.workJoyInfoList[_0x5a0ecc].joyDTO.name + "|level: " + _0x723406.data.workJoyInfoList[_0x5a0ecc].joyDTO.level : "空位"));
                            }

                            $.log("===== JOY 状态  end  =====\n");
                        }
                    } else {
                        $.log(_0x723406.errMsg);
                    }

                    $.activityJoyList = _0x723406.data.activityJoyList;
                    $.workJoyInfoList = _0x723406.data.workJoyInfoList;
                }
            } catch (_0x7706c1) {
                $.logErr(_0x7706c1, _0x38d659);
            } finally {
                _0x4a4df4(_0x723406.data);
            }
        });
    });
}

function _0x9e514a() {
    return new Promise(async _0x1c16f8 => {
        let _0x4b0a1c = await _0x18093b("gameShopList", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x4b0a1c, async (_0x12a6fc, _0x9b7270, _0x1dc7d7) => {
            try {
                _0x12a6fc ? (console.log("" + JSON.stringify(_0x12a6fc)), console.log("getGameShopList API请求失败，请检查网路重试")) : _0x1dc7d7 = JSON.parse(_0x1dc7d7).data.filter(_0x2b3d94 => _0x2b3d94.shopStatus === 1);
            } catch (_0x3a4501) {
                $.logErr(_0x3a4501, _0x9b7270);
            } finally {
                _0x1c16f8(_0x1dc7d7);
            }
        });
    });
}

async function _0x6c0b57(_0x119134, _0xacbdad) {
    let _0x1949dc = _0xacbdad.filter(_0x231bcc => _0x231bcc.unlock && _0x231bcc.joyDTO === null);

    if (_0x119134.length !== 0 && _0x1949dc.length !== 0) {
        let _0x43b253 = Math.max.apply(Math, _0x119134.map(_0x1e8daf => _0x1e8daf.level)),
            _0x54969d = _0x119134.filter(_0x3e3141 => _0x3e3141.level === _0x43b253);

        $.log("下地干活！ joyId= " + _0x54969d[0].id + " location= " + _0x1949dc[0].location);
        await _0x3ca201(_0x54969d[0].id, _0x1949dc[0].location);
        await _0x4bc87e();
        await _0x6c0b57($.activityJoyList, $.workJoyInfoList);
    } else {
        $.JOY_COIN_MAXIMIZE && (await _0x4790ca(_0x1949dc));
    }
}

async function _0x4790ca(_0x551be8) {
    if (_0x551be8.length !== 0 && $.hasJoyCoin) {
        $.log("竟然还有工位挖土？开启瞎买瞎下地模式！");

        let _0x562237 = await _0x58f698(),
            _0x4b51a4 = _0x562237.joyCoin;

        $.log("还有" + _0x4b51a4 + "金币,看看还能买啥下地");

        let _0x5ae02e = await _0x9e514a(),
            _0x99dd15 = false;

        for (let _0x101f45 = _0x5ae02e.length - 1; _0x101f45 >= 0 && _0x101f45 - 3 >= 0; _0x101f45--) {
            if (_0x4b51a4 > _0x5ae02e[_0x101f45].consume) {
                $.log("买一只 " + _0x5ae02e[_0x101f45].userLevel + "级的！");
                _0x4b51a4 = _0x4b51a4 - _0x5ae02e[_0x101f45].consume;

                let _0x4144b4 = await _0x209d51(_0x5ae02e[_0x101f45].userLevel);

                if (!_0x4144b4.success) {
                    break;
                } else {
                    _0x99dd15 = true;
                    $.hasJoyCoin = false;
                    _0x101f45++;
                }
            }
        }

        $.hasJoyCoin = false;
        _0x99dd15 && (await _0x4bc87e(), await $.wait(200), await _0x6c0b57($.activityJoyList, $.workJoyInfoList), await $.wait(200), await _0x58f698());
    }
}

async function _0x5ce2b5(_0x245aa7) {
    if (_0x245aa7.filter(_0x32f0f5 => _0x32f0f5.joyDTO).length === 0) {
        $.log("工位清理完成！");
        return true;
    }

    for (let _0x15e895 = 0; _0x15e895 < _0x245aa7.length; _0x15e895++) {
        _0x245aa7[_0x15e895].unlock && _0x245aa7[_0x15e895].joyDTO && ($.log("从工位移除 => id:" + _0x245aa7[_0x15e895].joyDTO.id + "|name: " + _0x245aa7[_0x15e895].joyDTO.name + "|level: " + _0x245aa7[_0x15e895].joyDTO.level), await _0x3ca201(_0x245aa7[_0x15e895].joyDTO.id, 0));
    }

    await _0x4bc87e();
    await $.wait(200);
    await _0x5ce2b5($.workJoyInfoList);
}

async function _0x459ed6(_0x477bb3) {
    let _0x299483 = Math.min.apply(Math, _0x477bb3.map(_0x20d208 => _0x20d208.level)),
        _0x22c4cb = _0x477bb3.filter(_0x3f7bb5 => _0x3f7bb5.level === _0x299483),
        _0x2f4431 = await _0x58f698();

    await $.wait(1000);
    !_0x2f4431.fastBuyLevel && (await $.wait(2000), _0x2f4431 = await _0x58f698());

    if (!_0x2f4431.fastBuyLevel) {
        $.log("获取信息失败，下地后跳出......");
        await _0x6c0b57($.activityJoyList, $.workJoyInfoList);
        return false;
    }

    let _0x3b6736 = _0x2f4431.fastBuyLevel;

    if (_0x3b6736 > 25) {
        return;
    }

    if (_0x22c4cb.length >= 2) {
        $.log("开始合成" + (_0x299483 + 1) + "级JOY");
        await $.wait(2000);
        await _0x53db47(_0x22c4cb[0].id, _0x22c4cb[1].id);

        if (_0x30d7ff) {
            _0x2f4431 = await _0x58f698();
            await $.wait(200);
            await _0x6c0b57($.activityJoyList, $.workJoyInfoList);
            return false;
        }

        await _0x4bc87e();
        await $.wait(200);
        await _0x459ed6($.activityJoyList);
    } else {
        if (_0x22c4cb.length === 1 && _0x22c4cb[0].level < _0x3b6736) {
            let _0x1819c4 = await _0x209d51(_0x22c4cb[0].level, $.activityJoyList);

            await $.wait(200);
            _0x1819c4.success ? (await _0x4bc87e(), await $.wait(200), await _0x459ed6($.activityJoyList)) : ($.log("完成！"), await _0x6c0b57($.activityJoyList, $.workJoyInfoList));
        } else {
            $.log("没有可合成的JOY开始买买买🛒🛒🛒");
            $.log("最高能买" + _0x3b6736 + "级的JOY，剩余" + _0x266911(_0x2f4431.joyCoin) + "金币");

            let _0x350a34 = await _0x209d51(_0x3b6736, $.activityJoyList);

            await $.wait(1000);
            _0x350a34.success ? (await _0x4bc87e(), await $.wait(200), await _0x459ed6($.activityJoyList)) : ($.log("完成！"), await _0x6c0b57($.activityJoyList, $.workJoyInfoList));
        }
    }
}

function _0x3ca201(_0x5a0cc6, _0x1743ad) {
    return new Promise(async _0x5198f9 => {
        let _0xf178a = await _0x273c8a("joyMove", "{\"joyId\":" + _0x5a0cc6 + ",\"location\":" + _0x1743ad + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "50788");

        $.post(_0xf178a, async (_0x498a4a, _0x3f2a90, _0xbd2ad) => {
            try {
                _0x498a4a ? (console.log("" + JSON.stringify(_0x498a4a)), console.log("doJoyMove请求失败，请检查网路重试")) : (_0x1743ad !== 0 && $.log("下地完成！"), _0xbd2ad = JSON.parse(_0xbd2ad));
            } catch (_0x58755b) {
                $.logErr(_0x58755b, _0x3f2a90);
            } finally {
                _0x5198f9(_0xbd2ad.data);
            }
        });
    });
}

function _0x53db47(_0x315211, _0x2d49a6) {
    return new Promise(async _0xd1cc45 => {
        let _0x16eafa = await _0x273c8a("joyMergeGet", "{\"joyOneId\":" + _0x315211 + ",\"joyTwoId\":" + _0x2d49a6 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "b08cf");

        $.get(_0x16eafa, async (_0x18cdd8, _0x45f95b, _0x2d6651) => {
            try {
                if (_0x18cdd8) {
                    console.log("" + JSON.stringify(_0x18cdd8));
                    console.log("doJoyMerge API请求失败，请检查网路重试");
                    _0x2d6651 = {};
                    _0x30d7ff = true;
                } else {
                    _0x2d6651 = JSON.parse(_0x2d6651);
                    $.log("合成" + (_0x2d6651.success ? "成功！" : "失败！【" + _0x2d6651.errMsg + "】 code=" + _0x2d6651.code));

                    if (_0x2d6651.code == "1006") {
                        _0x30d7ff = true;
                    }
                }
            } catch (_0xeae26) {
                $.logErr(_0xeae26, _0x45f95b);
                _0x30d7ff = true;
            } finally {
                _0xd1cc45(_0x2d6651.data);
            }
        });
    });
}

async function _0x209d51(_0x37e3aa, _0x27e2ae) {
    return new Promise(async _0x1e2667 => {
        let _0x97d05a = await _0x18093b("joyBuy", "{\"level\":" + _0x37e3aa + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "ffb36");

        $.post(_0x97d05a, async (_0x43ecdf, _0x1ee124, _0x9a6246) => {
            try {
                if (_0x43ecdf) {
                    console.log("" + JSON.stringify(_0x43ecdf));
                    console.log("doJoyBuy API请求失败，请检查网路重试");
                } else {
                    _0x9a6246 = JSON.parse(_0x9a6246);
                    let _0x3bd448 = "【不知道啥意思】";

                    switch (_0x9a6246.code) {
                        case 519:
                            _0x3bd448 = "【没钱了】";
                            break;

                        case 518:
                            _0x3bd448 = "【没空位】";

                            if (_0x27e2ae) {
                                $.log("满员了，删掉低级JOY");

                                let _0x8d1589 = Math.min.apply(Math, _0x27e2ae.map(_0x28ba13 => _0x28ba13.level));

                                await _0x4d153b(_0x27e2ae.filter(_0x13eca2 => _0x13eca2.level === _0x8d1589)[0].id);
                            }

                            break;

                        case 0:
                            _0x3bd448 = "【OK】";
                            break;
                    }

                    $.log("购买" + _0x37e3aa + "级JOY " + (_0x9a6246.success ? "成功！" : "失败！code=" + _0x9a6246.code + " 意思是" + _0x3bd448));
                }
            } catch (_0x505a49) {
                $.logErr(_0x505a49, _0x1ee124);
            } finally {
                _0x1e2667(_0x9a6246);
            }
        });
    });
}

function _0x4d153b(_0x34d0b7) {
    return new Promise(async _0x51e8c3 => {
        let _0x56e21f = await _0x18093b("joyRecovery", "body={\"joyId\":" + _0x34d0b7 + ",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x56e21f, async (_0x5a3c6c, _0x489efe, _0x117ec2) => {
            try {
                _0x5a3c6c ? (console.log("" + JSON.stringify(_0x5a3c6c)), console.log("doJoyRecovery API请求失败，请检查网路重试"), _0x117ec2 = {}) : (_0x117ec2 = JSON.parse(_0x117ec2), $.log("回收🐶 " + (_0x117ec2.success ? "成功！" : "失败！【" + _0x117ec2.errMsg + "】 code=" + _0x117ec2.code)));
            } catch (_0x5badeb) {
                $.logErr(_0x5badeb, _0x489efe);
            } finally {
                _0x51e8c3(_0x117ec2);
            }
        });
    });
}

function _0x111708() {
    return new Promise(async _0x2b021a => {
        let _0x1157c4 = await _0x18093b("joyRestart", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x1157c4, async (_0x43bd74, _0x12996d, _0x543e1b) => {
            try {
                _0x43bd74 ? (console.log("" + JSON.stringify(_0x43bd74)), console.log("doJoyRestart API请求失败，请检查网路重试")) : (_0x543e1b = JSON.parse(_0x543e1b), $.log("新场景解锁 " + (_0x543e1b.success ? "成功！" : "失败！【" + _0x543e1b.errMsg + "】 code=" + _0x543e1b.code)));
            } catch (_0x49650b) {
                $.logErr(_0x49650b, _0x12996d);
            } finally {
                _0x2b021a(_0x543e1b);
            }
        });
    });
}

function _0x3ec2eb() {
    return new Promise(async _0xf30bf => {
        let _0x478343 = await _0x18093b("newStartReward", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x478343, async (_0x49320b, _0x40e661, _0x17f185) => {
            try {
                _0x49320b ? (console.log("" + JSON.stringify(_0x49320b)), console.log("newStartReward API请求失败，请检查网路重试")) : (_0x17f185 = JSON.parse(_0x17f185), $.newjoylist = _0x17f185.data);
            } catch (_0x2d1a5a) {
                $.logErr(_0x2d1a5a, _0x40e661);
            } finally {
                _0xf30bf(_0x17f185);
            }
        });
    });
}

function _0x179bd5(_0x438917) {
    return new Promise(async _0x434f5e => {
        let _0x16a0c1 = await _0x18093b("joyGuide", _0x438917, "");

        $.post(_0x16a0c1, async (_0x2b14ed, _0x329289, _0x1b31f3) => {
            try {
                _0x2b14ed ? (console.log("" + JSON.stringify(_0x2b14ed)), console.log("joyGuide API请求失败，请检查网路重试")) : _0x1b31f3 = JSON.parse(_0x1b31f3);
            } catch (_0xf2e8dc) {
                $.logErr(_0xf2e8dc, _0x329289);
            } finally {
                _0x434f5e(_0x1b31f3);
            }
        });
    });
}

function _0x252f22() {
    return new Promise(async _0x5845c6 => {
        let _0x20e3f4 = await _0x18093b("gameMyPrize", "{\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x20e3f4, async (_0x4c55f5, _0xb626e2, _0x23b60b) => {
            try {
                if (_0x4c55f5) {
                    console.log("" + JSON.stringify(_0x4c55f5));
                    console.log("getGameMyPrize API请求失败，请检查网路重试");
                } else {
                    _0x23b60b = JSON.parse(_0x23b60b);

                    if (_0x23b60b.success && _0x23b60b.data) {
                        $.Vos = _0x23b60b.data.gamePrizeItemVos;
                        $.overVos = _0x23b60b.data.gameBigPrizeVO;

                        for (let _0x217a91 = 0; _0x217a91 < $.Vos.length; _0x217a91++) {
                            if ($.Vos[_0x217a91].prizeType == 4 && $.Vos[_0x217a91].status == 1 && $.Vos[_0x217a91].prizeTypeVO.prizeUsed == 0) {
                                $.log("\n当前账号有【" + $.Vos[_0x217a91].prizeName + "】可提现");
                                $.id = $.Vos[_0x217a91].prizeTypeVO.id;
                                $.poolBaseId = $.Vos[_0x217a91].prizeTypeVO.poolBaseId;
                                $.prizeGroupId = $.Vos[_0x217a91].prizeTypeVO.prizeGroupId;
                                $.prizeBaseId = $.Vos[_0x217a91].prizeTypeVO.prizeBaseId;
                                await _0x5f1d04($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
                            }
                        }

                        if ($.overVos) {
                            if ($.overVos.prizeType == 4 && $.overVos.topLevelStatus == 1 && $.overVos.prizeTypeVO.prizeUsed == 0) {
                                $.log("\n当前账号有【" + $.overVos.bigPrizeName + "】可提现");
                                $.id = $.overVos.prizeTypeVO.id;
                                $.poolBaseId = $.overVos.prizeTypeVO.poolBaseId;
                                $.prizeGroupId = $.overVos.prizeTypeVO.prizeGroupId;
                                $.prizeBaseId = $.overVos.prizeTypeVO.prizeBaseId;
                                await _0x5f1d04($.id, $.poolBaseId, $.prizeGroupId, $.prizeBaseId);
                            }
                        }
                    }
                }
            } catch (_0x25f549) {
                $.logErr(_0x25f549, _0xb626e2);
            } finally {
                _0x5845c6(_0x23b60b);
            }
        });
    });
}

function _0x5f1d04(_0x3a7517, _0x229bae, _0x2ca4c7, _0x4c1372) {
    return new Promise(async _0x2a7be0 => {
        let _0x50f6e5 = await _0x18093b("apCashWithDraw", "{\"businessSource\":\"JOY_PARK\",\"base\":{\"id\":" + _0x3a7517 + ",\"business\":\"joyPark\",\"poolBaseId\":" + _0x229bae + ",\"prizeGroupId\":" + _0x2ca4c7 + ",\"prizeBaseId\":" + _0x4c1372 + ",\"prizeType\":4},\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}", "");

        $.post(_0x50f6e5, async (_0x55c422, _0x5a88b0, _0x4af9b8) => {
            try {
                _0x55c422 ? (console.log("" + JSON.stringify(_0x55c422)), console.log("apCashWithDraw API请求失败，请检查网路重试")) : (_0x4af9b8 = JSON.parse(_0x4af9b8), _0x4af9b8.success && _0x4af9b8.data && console.log("提现结果：" + JSON.stringify(_0x4af9b8)));
            } catch (_0xc03542) {
                $.logErr(_0xc03542, _0x5a88b0);
            } finally {
                _0x2a7be0(_0x4af9b8);
            }
        });
    });
}

async function _0x18093b(_0x52f1ac, _0x1f5ef4, _0x1f2dda) {
    let _0x3ff906,
        _0x2e88d4 = $.UA.split(";")[2];

    if (_0x1f2dda) {
        const _0x41282b = {
            appId: _0x1f2dda,
            fn: _0x52f1ac,
            body: _0x1f5ef4,
            apid: "activities_platform",
            ver: _0x2e88d4,
            cl: "android",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
        _0x3ff906 = await _0x43a7a0.getbody(_0x41282b);
    } else {
        _0x3ff906 = "functionId=" + _0x52f1ac + "&body=" + _0x1f5ef4 + "&appid=activities_platform&client=android&clientVersion=" + _0x2e88d4 + "&t=" + Date.now() + "&uuid=";
    }

    const _0x34b21c = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "api.m.jd.com",
        Origin: "https://joypark.jd.com",
        Referer: "https://joypark.jd.com/",
        Cookie: _0x3c47ec
    };
    const _0x106983 = {
        url: "https://api.m.jd.com",
        body: _0x3ff906,
        headers: _0x34b21c
    };
    return _0x106983;
}

async function _0x273c8a(_0x5a606d, _0x435e0b, _0x531d83) {
    let _0x502896,
        _0x5ddc0d = $.UA.split(";")[2];

    if (_0x531d83) {
        const _0x3b9cbc = {
            appId: _0x531d83,
            fn: _0x5a606d,
            body: _0x435e0b,
            apid: "activities_platform",
            ver: _0x5ddc0d,
            cl: "android",
            user: $.UserName,
            code: 1,
            ua: $.UA
        };
        _0x502896 = await _0x43a7a0.getbody(_0x3b9cbc);
    } else {
        _0x502896 = "functionId=" + _0x5a606d + "&body=" + _0x435e0b + "&appid=activities_platform&client=android&clientVersion=" + _0x5ddc0d + "&t=" + Date.now() + "&uuid=";
    }

    const _0x251c57 = {
        "User-Agent": $.UA,
        "Content-Type": "application/x-www-form-urlencoded",
        Host: "api.m.jd.com",
        Origin: "https://joypark.jd.com",
        Referer: "https://joypark.jd.com/",
        Cookie: _0x3c47ec
    };
    const _0x5e37f3 = {
        url: "https://api.m.jd.com/client.action?functionId=" + _0x5a606d + "&" + _0x502896,
        headers: _0x251c57
    };
    return _0x5e37f3;
}

function _0x5cc6d8() {
    return new Promise(_0x27f354 => {
        const _0x510463 = {
            Cookie: _0x3c47ec,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x25a78e = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x510463,
            timeout: 10000
        };
        $.get(_0x25a78e, (_0x4dc62a, _0x25b96f, _0xd1d23) => {
            try {
                if (_0xd1d23) {
                    _0xd1d23 = JSON.parse(_0xd1d23);

                    if (!(_0xd1d23.islogin === "1")) {
                        _0xd1d23.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x11c642) {
                console.log(_0x11c642);
            } finally {
                _0x27f354();
            }
        });
    });
}

function _0x265230(_0x28a8eb) {
    _0x28a8eb = _0x28a8eb || 32;
    let _0x1a8772 = "abcdef0123456789",
        _0x565117 = _0x1a8772.length,
        _0x34b57d = "";

    for (i = 0; i < _0x28a8eb; i++) {
        _0x34b57d += _0x1a8772.charAt(Math.floor(Math.random() * _0x565117));
    }

    return _0x34b57d;
}

function _0x3c9c8d(_0x14ffbd) {
    if (typeof _0x14ffbd == "string") {
        try {
            return JSON.parse(_0x14ffbd);
        } catch (_0x29695d) {
            console.log(_0x29695d);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

function _0x266911(_0xc6209f) {
    const _0x374581 = ["", "", ""];
    let _0x4b6972 = 1000,
        _0x1bc789 = 3,
        _0x13aa79 = "",
        _0x180013 = 1;

    while (_0xc6209f / _0x4b6972 >= 1) {
        _0x4b6972 *= 10;
        _0x1bc789 += 1;
    }

    if (_0x1bc789 <= 4) {
        _0x374581[0] = parseInt(_0xc6209f / 1000) + "";
        _0x374581[1] = "千";
    } else {
        if (_0x1bc789 <= 8) {
            _0x13aa79 = parseInt(_0x1bc789 - 4) / 3 > 1 ? "千万" : "万";
            _0x180013 = _0x13aa79 === "万" ? 10000 : 10000000;
            _0xc6209f % _0x180013 === 0 ? _0x374581[0] = parseInt(_0xc6209f / _0x180013) + "" : _0x374581[0] = parseFloat(_0xc6209f / _0x180013).toFixed(2) + "";
            _0x374581[1] = _0x13aa79;
        } else {
            if (_0x1bc789 <= 16) {
                _0x13aa79 = (_0x1bc789 - 8) / 3 > 1 ? "千亿" : "亿";
                _0x13aa79 = (_0x1bc789 - 8) / 4 > 1 ? "兆" : _0x13aa79;
                _0x13aa79 = (_0x1bc789 - 8) / 7 > 1 ? "千兆" : _0x13aa79;
                _0x180013 = 1;

                if (_0x13aa79 === "亿") {
                    _0x180013 = 100000000;
                } else {
                    if (_0x13aa79 === "千亿") {
                        _0x180013 = 100000000000;
                    } else {
                        if (_0x13aa79 === "兆") {
                            _0x180013 = 1000000000000;
                        } else {
                            _0x13aa79 === "千兆" && (_0x180013 = 1000000000000000);
                        }
                    }
                }

                _0xc6209f % _0x180013 === 0 ? _0x374581[0] = parseInt(_0xc6209f / _0x180013) + "" : _0x374581[0] = parseFloat(_0xc6209f / _0x180013).toFixed(2) + "";
                _0x374581[1] = _0x13aa79;
            }
        }
    }

    _0xc6209f < 1000 && (_0x374581[0] = _0xc6209f + "", _0x374581[1] = "");
    return _0x374581.join("");
}

// prettier-ignore
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }