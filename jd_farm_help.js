/*
东东农场助力
20 2,6,11 * * * jd_farm_help.js
updatetime:2023/10/29
变量
epxort FRUIT_DELAY='1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）
export FRUITCODES='xxx&xxx' 指定助力码助力，多个用&分割，不指定则自动搜集任务助力码
*/

const $ = new Env('东东农场-助力');
let _0x482d11 = [],
    _0x3cccdb = "",
    _0x408778,
    _0x267004 = [],
    _0x3c259d = [],
    _0x209196 = "",
    _0x25b674 = "",
    _0x13d8fc = "",
    _0x302b2c = [],
    _0xfb66ce = {},
    _0x36827b = 0,
    _0x5924ab = false;

const _0x468a37 = require("fs"),
    _0xc68654 = "https://api.m.jd.com/client.action",
    _0x363043 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
    _0x581d1e = require("./function/dylany");

$.reqnum = 1;
!(async () => {
    await _0x1f63d5();

    if (!_0x482d11[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：2023/10/28");
    $.log("问题建议：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量：");
    $.log("export DY_PROXY='api_url' 可使用代理api");
    $.log("export FRUITCODES = 'xxx&xxx' 指定助力码助力，多个用&分割，不指定则自动搜集任务助力码");
    $.log("epxort FRUIT_DELAY='1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）\n\n");

    for (let _0x563eec = 0; _0x563eec < _0x482d11.length; _0x563eec++) {
        if (_0x482d11[_0x563eec]) {
            _0x3cccdb = _0x482d11[_0x563eec];
            $.UserName = decodeURIComponent(_0x3cccdb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3cccdb.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x563eec + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x8f3bf9();
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await _0x408778.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            _0x25b674 = "";
            _0x13d8fc = "";
            _0xfb66ce = {};
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x5e6f85();

            if (_0x267004.length == 0) {
                $.log("没有助力码,先执行农场任务在跑助力");
                return;
            }

            await _0x15fccd();
            await $.wait(2000);
        }
    }
})().catch(_0x2f8d07 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2f8d07 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x15fccd() {
    _0x13d8fc = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x5484ec("", 1);
        if ($.farmInfo.farmUserPro) await _0x2f98ae(), await _0x13060e(); else JSON.stringify($.farmInfo).includes("winTexts") ? (console.log("初始化农场数据异常, 请确认此账号是否开通农场"), _0x25b674 = "【数据异常】请确认此账号是否开通农场\n") : (console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo)), _0x25b674 = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常");
    } catch (_0x33d7ef) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️");
        $.logErr(_0x33d7ef);
    }

    await _0x4c4e23();
}

async function _0x13060e() {
    await _0x4eff0c();
    await _0xf9cb1a();
}

async function _0xf9cb1a() {
    console.log("\n开始天天抽奖助力...");

    for (let _0x4db9dc of _0x267004) {
        if (_0x4db9dc === $.farmInfo.farmUserPro.shareCode) {
            console.log("跳过自己\n");
            continue;
        }

        await _0xf36301(_0x4db9dc);
        await $.wait(1000);
        if ($.lotteryMasterHelpRes.helpResult === undefined) break;
        if ($.lotteryMasterHelpRes.helpResult.code === "0") console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "成功\n"); else {
            if ($.lotteryMasterHelpRes.helpResult.code === "11") {
                console.log("不要重复助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "\n");
            } else {
                if ($.lotteryMasterHelpRes.helpResult.code === "13") {
                    console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "失败,助力次数耗尽\n");
                    break;
                }
            }
        }
    }
}

async function _0x2f98ae() {
    console.log("\n开始助力好友...");
    let _0x3fde7d = 0,
        _0x305233 = 3,
        _0x3085c0 = "";

    for (let _0x340242 of _0x267004) {
        console.log("去助力: " + _0x340242);
        if (!_0x340242) continue;

        if (_0x340242 === $.farmInfo.farmUserPro.shareCode) {
            console.log("不能为自己助力哦，跳过\n");
            continue;
        }

        await _0x5e2d50(_0x340242);
        await $.wait(2000);

        if ($.helpResult.code === "0") {
            if ($.helpResult.helpResult.code === "0") _0x3fde7d += $.helpResult.helpResult.salveHelpAddWater, console.log("【助力结果】: 助力成功"), console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴"), _0x3085c0 += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ","; else {
                if ($.helpResult.helpResult.code === "8") console.log("【助力结果】: 助力失败，今天助力次数已耗尽"); else {
                    if ($.helpResult.helpResult.code === "9") console.log("【助力结果】: 已经助力过TA了"); else {
                        if ($.helpResult.helpResult.code === "10") {
                            console.log("【助力结果】: 对方已满助力");

                            _0x302b2c.push(_0x340242);
                        } else console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
                    }
                }
            }
            console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
            _0x305233 = $.helpResult.helpResult.remainTimes;

            if ($.helpResult.helpResult.remainTimes === 0) {
                console.log("您当前助力次数已耗尽，跳出助力");
                break;
            }
        } else console.log("助力失败::" + JSON.stringify($.helpResult));
    }

    if ($.isLoon() || $.isQuanX() || $.isSurge()) {
        let _0x316253 = _0x23d2e4() + $.farmInfo.farmUserPro.shareCode;

        !$.getdata(_0x316253) && ($.setdata("", _0x23d2e4(Date.now() - 24 * 60 * 60 * 1000) + $.farmInfo.farmUserPro.shareCode), $.setdata("", _0x316253));
        _0x3085c0 && ($.getdata(_0x316253) ? $.setdata($.getdata(_0x316253) + "," + _0x3085c0, _0x316253) : $.setdata(_0x3085c0, _0x316253));
        _0x3085c0 = $.getdata(_0x316253);
    }

    _0x3fde7d > 0 && console.log("【助力好友👬】获得" + _0x3fde7d + "g💧\n");
    _0x25b674 += "【今日剩余助力👬】" + _0x305233 + "次\n";
    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0x4eff0c() {
    await _0xb6672b();
    $.friendList ? (console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个"), await _0x506e09(), $.friendList.inviteFriendCount > 0 ? $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await _0x55f802(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友")) : console.log("查询好友列表失败\n");
}

async function _0x506e09() {
    for (let _0x1a06f9 of _0x267004) {
        if (_0x1a06f9 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        if (_0x267004.findIndex(_0x660d7d => _0x660d7d === _0x1a06f9) >= 5) break;
        await _0x5fb387(_0x1a06f9);
        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友"); else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
}

async function _0xf36301() {
    $.lotteryMasterHelpRes = await _0x5484ec({
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-3",
        "babelChannel": "3",
        "version": 24,
        "channel": 1
    });
}

async function _0x5fb387() {
    $.inviteFriendRes = await _0x5484ec({
        "imageUrl": "",
        "nickName": "",
        "shareCode": arguments[0] + "-inviteFriend",
        "version": 24,
        "channel": 1
    });
}

async function _0x5e2d50() {
    for (let _0x39377d of Array(3)) {
        $.helpResult = await _0x5484ec({
            "sid": "",
            "mpin": "",
            "shareCode": arguments[0],
            "babelChannel": "121",
            "version": 24,
            "channel": 1,
            "lat": "0",
            "lng": "0"
        });
        if ($.helpResult.code == "0") break;
        await $.wait(2000);
    }
}

async function _0x5484ec(_0x5c7b1a, _0x4996a3, _0x22dd35 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x363043 / 1000 + "秒......\n"), _0x22dd35 = _0x363043);
    $.reqnum++;
    if (_0x36827b > "1") return;
    if (!_0x5c7b1a) _0x5c7b1a = {
        "babelChannel": "121",
        "sid": "",
        "un_area": "",
        "version": 24,
        "channel": 1,
        "lat": "0",
        "lng": "0"
    };

    let _0x1750fe = {
        "appId": "8a2af",
        "fn": "initForFarm",
        "body": _0x5c7b1a,
        "apid": "signed_wh5",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    },
        _0x3ebe84 = await _0x581d1e.getbody(_0x1750fe);

    return new Promise(_0x557799 => {
        const _0x4fd840 = {
            "url": "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x3ebe84,
            "headers": {
                "cookie": _0x3cccdb,
                "origin": "https://carry.m.jd.com",
                "referer": "https://carry.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        setTimeout(() => {
            $.get(_0x4fd840, async (_0x78e448, _0x192e16, _0x59d1b8) => {
                try {
                    if (_0x78e448) console.log("initForFarm: 请求失败 ‼️‼️"), console.log(JSON.stringify(_0x78e448)); else {
                        if (_0x215beb(_0x59d1b8)) {
                            _0x59d1b8 = JSON.parse(_0x59d1b8);

                            if (_0x59d1b8.code != "0") { }

                            _0x4996a3 && ($.farmInfo = _0x59d1b8);
                        }
                    }
                } catch (_0x19baa6) {
                    $.logErr(_0x19baa6, _0x192e16);
                } finally {
                    _0x557799(_0x59d1b8);
                }
            });
        }, _0x22dd35);
    });
}

async function _0xb6672b() {
    $.friendList = await _0x5840a3("friendListInitForFarm", {
        "version": 24,
        "channel": 1
    });
}

async function _0x55f802() {
    $.awardInviteFriendRes = await _0x5840a3("awardInviteFriendForFarm");
}

async function _0x4c4e23() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false"; else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + _0x5924ab === "false";
    $.ctrTemp ? ($.msg($.name, _0x13d8fc, _0x25b674, _0xfb66ce), $.isNode() && (_0x209196 += _0x13d8fc + "\n" + _0x25b674 + ($.index !== _0x482d11.length ? "\n\n" : ""))) : $.log("\n" + _0x25b674 + "\n");
}

function _0x23d2e4(_0x404357) {
    let _0x1decb1;

    return _0x404357 ? _0x1decb1 = new Date(_0x404357) : _0x1decb1 = new Date(), _0x1decb1.getFullYear() + "-" + (_0x1decb1.getMonth() + 1 >= 10 ? _0x1decb1.getMonth() + 1 : "0" + (_0x1decb1.getMonth() + 1)) + "-" + (_0x1decb1.getDate() >= 10 ? _0x1decb1.getDate() : "0" + _0x1decb1.getDate());
}

function _0x5e6f85() {
    return new Promise(async _0x326433 => {
        if ($.shareCodesArr.length != 0) {
            if (_0x267004[$.index - 1]) _0x267004 = $.shareCodesArr[$.index - 1].split("@"); else {
                const _0xf5b6d9 = $.index > _0x3c259d.length ? _0x3c259d.length - 1 : $.index - 1;

                _0x267004 = _0x3c259d[_0xf5b6d9].split("@");
            }
        }

        _0x267004 = _0x267004.filter(_0x4f6f2f => _0x302b2c.indexOf(_0x4f6f2f) == -1 && !!_0x4f6f2f);
        console.log("您提供了" + _0x267004.length + "个农场助力码\n");
        console.log("将要助力的好友" + JSON.stringify(_0x267004));

        _0x326433();
    });
}

function _0x1f63d5() {
    return new Promise(_0x29fa2a => {
        console.log("开始获取配置文件...\n");
        _0x408778 = $.isNode() ? require("./sendNotify") : "";

        const _0x2cc958 = $.isNode() ? require("./jdCookie.js") : "";

        if (process.env.DY_PROXY) {
            const _0x4b2157 = require("./function/proxy.js");

            $.get = _0x4b2157.intoRequest($.get.bind($));
            $.post = _0x4b2157.intoRequest($.post.bind($));
        }

        $.shareCodesArr = [];

        if ($.isNode()) {
            if (process.env.FRUITCODES) _0x267004 = process.env.FRUITCODES.split("&"); else {
                if (process.env.FRUITSHARECODES) {
                    if (process.env.FRUITSHARECODES.indexOf("\n") > -1) _0x3c259d = process.env.FRUITSHARECODES.split("\n"); else {
                        _0x3c259d = process.env.FRUITSHARECODES.split("&");
                    }
                }
            }
        }

        if ($.isNode()) {
            Object.keys(_0x2cc958).forEach(_0x48ff06 => {
                _0x2cc958[_0x48ff06] && _0x482d11.push(_0x2cc958[_0x48ff06]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
        } else _0x482d11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0xd1af67($.getdata("CookiesJD") || "[]").map(_0x30db4a => _0x30db4a.cookie)].filter(_0x64de52 => !!_0x64de52);

        if ($.isNode()) {
            Object.keys(_0x3c259d).forEach(_0x12b5da => {
                _0x3c259d[_0x12b5da] && $.shareCodesArr.push(_0x3c259d[_0x12b5da]);
            });
        } else {
            if ($.getdata("jd_fruit_inviter")) $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x388819 => !!_0x388819);
            console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
        }

        let _0x53c6fc = _0x468a37.existsSync("./fruit_helpcode");

        if (process.env.FRUITSHARECODES) $.log("使用日志搜集的助力码\n"); else {
            if (process.env.FRUITCODES) $.log("使用变量指定的助力码\n"); else {
                if (_0x3c259d.length == 0 && _0x53c6fc) {
                    $.log("使用本地缓存的助力码\n");
                    _0x267004 = _0x468a37.readFileSync("./fruit_helpcode", "utf-8");
                    _0x267004 = JSON.parse(_0x267004);
                } else $.log("没有检测到任何助力码！！！\n");
            }
        }

        _0x29fa2a();
    });
}

function _0x8f3bf9() {
    return new Promise(_0x3e0b01 => {
        const _0x256991 = {
            "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            "headers": {
                "Cookie": _0x3cccdb,
                "referer": "https://h5.m.jd.com/",
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.get(_0x256991, (_0x729c78, _0x2522fc, _0x5ec893) => {
            try {
                if (_0x5ec893) {
                    _0x5ec893 = JSON.parse(_0x5ec893);

                    if (_0x5ec893.islogin === "1") { } else _0x5ec893.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x3019a5) {
                console.log(_0x3019a5);
            } finally {
                _0x3e0b01();
            }
        });
    });
}

function _0x5840a3(_0x52fd3b, _0x48cd43 = {}, _0x469726 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x363043 / 1000 + "秒......\n"), _0x469726 = _0x363043);
    return $.reqnum++, new Promise(_0x1dc9d9 => {
        setTimeout(() => {
            $.get(_0x2c9769(_0x52fd3b, _0x48cd43), (_0x12cf8a, _0x4459c1, _0x3397ad) => {
                try {
                    _0x12cf8a ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x12cf8a)), console.log("function_id:" + _0x52fd3b), $.logErr(_0x12cf8a)) : _0x215beb(_0x3397ad) && (_0x3397ad = JSON.parse(_0x3397ad));
                } catch (_0x32ffd7) {
                    $.logErr(_0x32ffd7, _0x4459c1);
                } finally {
                    _0x1dc9d9(_0x3397ad);
                }
            });
        }, _0x469726);
    });
}

function _0x215beb(_0x130f92) {
    try {
        if (typeof JSON.parse(_0x130f92) == "object") return true;
    } catch (_0x4484e7) {
        return console.log(_0x4484e7), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x2c9769(_0x36fa05, _0x45e825 = {}) {
    return {
        "url": _0xc68654 + "?functionId=" + _0x36fa05 + "&body=" + encodeURIComponent(JSON.stringify(_0x45e825)) + "&appid=wh5",
        "headers": {
            "Host": "api.m.jd.com",
            "Accept": "*/*",
            "Origin": "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            "Referer": "https://carry.m.jd.com/",
            "Cookie": _0x3cccdb
        },
        "timeout": 10000
    };
}

function _0xd1af67(_0x5abbed) {
    if (typeof _0x5abbed == "string") try {
        return JSON.parse(_0x5abbed);
    } catch (_0x25cfc8) {
        return console.log(_0x25cfc8), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }