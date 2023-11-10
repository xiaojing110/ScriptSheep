/*
新农场助力
33 3,9 * * * jd_farm_help_new.js
export NEWFRUITCODES = 'xxx&xxx' 可指定助力码助力，多个用&分割，不指定则自动搜集任务助力码
*/

const $ = new Env('新农场助力');
let _0x5e76a0 = [],
    _0x252203 = [],
    _0x4bd5bc = "",
    _0x5dc6ac,
    _0x497839 = [],
    _0x54c8e5 = "",
    _0x41af5d = "",
    _0x59f215 = "",
    _0x4b0b07 = [],
    _0x3ddca7 = {},
    _0x1cb139 = 0,
    _0x104cc4 = false;

const _0x37f5af = require("fs"),
    _0x26071d = "https://api.m.jd.com/client.action",
    _0x2c1da1 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
    _0x64772 = require("./function/dylanv");

$.reqnum = 1;
!(async () => {
    await _0x29941b();

    if (!_0x252203[0]) {
        const _0x486df4 = {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x486df4);
        return;
    }

    $.log("\n当前版本：2023/10/23");
    $.log("问题建议：https://t.me/dylan_jdpro\n");
    $.log("\n环境变量：");
    $.log("export DY_PROXY='api_url' 可使用代理api");
    $.log("export NEWNEWFRUITCODES = 'xxx&xxx' 可指定助力码助力，多个用&分割，不指定则自动搜集任务助力码");

    for (let _0x42496b = 0; _0x42496b < _0x252203.length; _0x42496b++) {
        if (_0x252203[_0x42496b]) {
            _0x4bd5bc = _0x252203[_0x42496b];
            $.UserName = decodeURIComponent(_0x4bd5bc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4bd5bc.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x42496b + 1;
            $.isLogin = true;
            $.nickName = "";
            await _0x691131();
            console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

            if (!$.isLogin) {
                const _0x145476 = {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                };
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x145476);
                $.isNode() && (await _0x5dc6ac.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            _0x41af5d = "";
            _0x59f215 = "";
            _0x3ddca7 = {};
            $.UA = require("./USER_AGENTS").UARAM();
            await _0x2b5004();

            if (_0x497839.length == 0) {
                $.log("没有助力码,请变量NEWFRUITCODES指定或执行农场任务自动收集助力码");
                return;
            }

            await _0x132d4c();
            await $.wait(2000);
        }
    }
})().catch(_0x4a9077 => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4a9077 + "!", "");
}).finally(() => {
    $.done();
});

async function _0x132d4c() {
    _0x59f215 = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

    try {
        await _0x4964f4();
    } catch (_0x3a66f) {
        console.log("任务执行异常，请检查执行日志 ‼️‼️");
        $.logErr(_0x3a66f);
    }
}

async function _0xf5c258() {
    await _0xb25ee1();
    await _0x399c32();
}

async function _0x399c32() {
    console.log("\n开始天天抽奖助力...");

    for (let _0x4b5d09 of _0x497839) {
        if (_0x4b5d09 === $.farmInfo.farmUserPro.shareCode) {
            console.log("跳过自己\n");
            continue;
        }

        await _0x27c148(_0x4b5d09);
        await $.wait(1000);

        if ($.lotteryMasterHelpRes.helpResult === undefined) {
            break;
        }

        if ($.lotteryMasterHelpRes.helpResult.code === "0") {
            console.log("助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "成功\n");
        } else {
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

async function _0x4964f4() {
    console.log("\n开始助力好友...");
    let _0x5ba2a7 = "";

    for (let _0x313b97 of _0x497839) {
        console.log("去助力: " + _0x313b97);

        if (!_0x313b97) {
            continue;
        }

        let _0x45e8e7 = await _0x2da38c(_0x313b97);

        await $.wait(2000);

        if (_0x45e8e7.code === 0) {
            if (_0x45e8e7.data.bizCode === 0) {
                console.log("【助力结果】: 助力成功");
                _0x5ba2a7 += (_0x45e8e7.data.result.masterInfo.nickname || "匿名用户") + ",";
            } else {
                if (_0x45e8e7.data.bizCode === 5004) {
                    console.log("【助力结果】: 助力失败，今天助力次数已耗尽");
                    break;
                } else {
                    if (_0x45e8e7.data.bizCode === 5003) {
                        console.log("【助力结果】: 已经助力过TA了");
                    } else {
                        if (_0x45e8e7.data.bizCode === 5005) {
                            console.log("【助力结果】: 对方已满助力");

                            _0x4b0b07.push(_0x313b97);
                        } else {
                            if (_0x45e8e7.data.bizCode === 5002) {
                                console.log("【助力结果】: 不能给自己助力");
                            } else {
                                if (_0x45e8e7.data.bizCode === -1001) {
                                    console.log("【助力结果】: " + _0x45e8e7.data.bizMsg);
                                } else {
                                    console.log("助力其他情况：" + JSON.stringify(_0x45e8e7));
                                }
                            }
                        }
                    }
                }
            }
        } else {
            console.log("助力失败::" + JSON.stringify(_0x45e8e7));
        }
    }

    console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0xb25ee1() {
    await _0x2282c0();

    if ($.friendList) {
        console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个");
        await _0x5e3bc8();
        $.friendList.inviteFriendCount > 0 ? $.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount && (console.log("开始领取邀请好友的奖励"), await _0x598f5c(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友");
    } else {
        console.log("查询好友列表失败\n");
    }
}

async function _0x5e3bc8() {
    for (let _0x42f0c7 of _0x497839) {
        if (_0x42f0c7 === $.farmInfo.farmUserPro.shareCode) {
            console.log("自己不能邀请自己成为好友噢\n");
            continue;
        }

        if (_0x497839.findIndex(_0x612c49 => _0x612c49 === _0x42f0c7) >= 5) {
            break;
        }

        await _0x4413db(_0x42f0c7);

        if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
            console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
        } else {
            $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
        }
    }
}

async function _0x27c148() {
    const _0x5c81bc = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-3",
        babelChannel: "3",
        version: 24,
        channel: 1
    };
    $.lotteryMasterHelpRes = await initForFarm(_0x5c81bc);
}

async function _0x4413db() {
    const _0x46fa5d = {
        imageUrl: "",
        nickName: "",
        shareCode: arguments[0] + "-inviteFriend",
        version: 24,
        channel: 1
    };
    $.inviteFriendRes = await initForFarm(_0x46fa5d);
}

async function _0x2c6c0a() {
    for (let _0x1d942b of Array(3)) {
        const _0x3b6db6 = {
            sid: "",
            mpin: "",
            shareCode: arguments[0],
            babelChannel: "121",
            version: 24,
            channel: 1,
            lat: "0",
            lng: "0"
        };
        $.helpResult = await initForFarm(_0x3b6db6);

        if ($.helpResult.code == "0") {
            break;
        }

        await $.wait(2000);
    }
}

async function _0x2da38c(_0x1f38e0, _0x405d03 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x2c1da1 / 1000 + "秒......\n"), _0x405d03 = _0x2c1da1);
    $.reqnum++;
    const _0x5e1492 = {
        version: 1,
        inviteCode: _0x1f38e0,
        shareChannel: "",
        assistChannel: ""
    };

    let _0x55ac9b = {
        appId: "28981",
        fn: "farm_assist",
        body: _0x5e1492,
        apid: "signed_wh5",
        ver: $.UA.split(";")[2],
        cl: "ios",
        user: $.UserName,
        code: 1,
        ua: $.UA
    },
        _0x4e5253 = await _0x64772.getbody(_0x55ac9b);

    return new Promise(_0x7a55bf => {
        const _0x3e2ddd = {
            cookie: _0x4bd5bc,
            origin: "https://h5.m.jd.com",
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x582d63 = {
            url: "https://api.m.jd.com/client.action?functionId=farm_assist&" + _0x4e5253,
            headers: _0x3e2ddd,
            timeout: 30000
        };
        setTimeout(() => {
            $.get(_0x582d63, async (_0x1c16a3, _0x3f790a, _0x5ecd71) => {
                try {
                    if (_0x1c16a3) {
                        console.log("farm_assist: 请求失败 ‼️‼️");
                        console.log(JSON.stringify(_0x1c16a3));
                    } else {
                        _0x5b9220(_0x5ecd71) && (_0x5ecd71 = JSON.parse(_0x5ecd71));
                    }
                } catch (_0x1388ce) {
                    $.logErr(_0x1388ce, _0x3f790a);
                } finally {
                    _0x7a55bf(_0x5ecd71);
                }
            });
        }, _0x405d03);
    });
}

async function _0x2282c0() {
    const _0xd032a9 = {
        version: 24,
        channel: 1
    };
    $.friendList = await _0x3fa9cb("friendListInitForFarm", _0xd032a9);
}

async function _0x598f5c() {
    $.awardInviteFriendRes = await _0x3fa9cb("awardInviteFriendForFarm");
}

async function _0x2c579e() {
    if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
        $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
    } else {
        $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + _0x104cc4 === "false";
    }

    $.ctrTemp ? ($.msg($.name, _0x59f215, _0x41af5d, _0x3ddca7), $.isNode() && (_0x54c8e5 += _0x59f215 + "\n" + _0x41af5d + ($.index !== _0x252203.length ? "\n\n" : ""))) : $.log("\n" + _0x41af5d + "\n");
}

function _0x9ab4b4(_0x12bc5f) {
    let _0x192666;

    _0x12bc5f ? _0x192666 = new Date(_0x12bc5f) : _0x192666 = new Date();
    return _0x192666.getFullYear() + "-" + (_0x192666.getMonth() + 1 >= 10 ? _0x192666.getMonth() + 1 : "0" + (_0x192666.getMonth() + 1)) + "-" + (_0x192666.getDate() >= 10 ? _0x192666.getDate() : "0" + _0x192666.getDate());
}

function _0x2b5004() {
    return new Promise(async _0xfe2ba7 => {
        if ($.shareCodesArr.length != 0) {
            if (_0x497839[$.index - 1]) {
                _0x497839 = $.shareCodesArr[$.index - 1].split("@");
            } else {
                const _0x4936bf = $.index > _0x5e76a0.length ? _0x5e76a0.length - 1 : $.index - 1;

                _0x497839 = _0x5e76a0[_0x4936bf].split("@");
            }
        }

        _0x497839 = _0x497839.filter(_0x5de2e4 => _0x4b0b07.indexOf(_0x5de2e4) == -1 && !!_0x5de2e4);
        console.log("您提供了" + _0x497839.length + "个农场助力码\n");
        console.log("将要助力的好友" + JSON.stringify(_0x497839));

        _0xfe2ba7();
    });
}

function _0x29941b() {
    return new Promise(_0x164933 => {
        console.log("开始获取配置文件...\n");
        _0x5dc6ac = $.isNode() ? require("./sendNotify") : "";

        const _0x4ea92a = $.isNode() ? require("./jdCookie.js") : "";

        if (process.env.DY_PROXY) {
            const _0x157d01 = require("./function/proxy.js");

            $.get = _0x157d01.intoRequest($.get.bind($));
            $.post = _0x157d01.intoRequest($.post.bind($));
        }

        $.shareCodesArr = [];

        if ($.isNode()) {
            if (process.env.NEWFRUITCODES) {
                _0x497839 = process.env.NEWFRUITCODES.split("&");
            } else {
                if (process.env.NEWFRUITSHARECODES) {
                    if (process.env.NEWFRUITSHARECODES.indexOf("\n") > -1) {
                        _0x5e76a0 = process.env.NEWFRUITSHARECODES.split("\n");
                    } else {
                        _0x5e76a0 = process.env.NEWFRUITSHARECODES.split("&");
                    }
                }
            }
        }

        if ($.isNode()) {
            Object.keys(_0x4ea92a).forEach(_0x2c4099 => {
                _0x4ea92a[_0x2c4099] && _0x252203.push(_0x4ea92a[_0x2c4099]);
            });

            if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
                console.log = () => { };
            }
        } else {
            _0x252203 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1726ae($.getdata("CookiesJD") || "[]").map(_0x5e7689 => _0x5e7689.cookie)].filter(_0x19e6db => !!_0x19e6db);
        }

        if ($.isNode()) {
            Object.keys(_0x5e76a0).forEach(_0x78e6e5 => {
                _0x5e76a0[_0x78e6e5] && $.shareCodesArr.push(_0x5e76a0[_0x78e6e5]);
            });
        } else {
            if ($.getdata("jd_fruit_inviter")) {
                $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x52b368 => !!_0x52b368);
            }

            console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
        }

        let _0x522141 = _0x37f5af.existsSync("./fruit_helpcode_new");

        if (process.env.NEWFRUITSHARECODES) {
            $.log("使用日志搜集的助力码\n");
        } else {
            if (process.env.NEWFRUITCODES) {
                $.log("使用变量指定的助力码\n");
            } else {
                _0x5e76a0.length == 0 && _0x522141 ? ($.log("使用本地缓存的助力码\n"), _0x497839 = _0x37f5af.readFileSync("./fruit_helpcode_new", "utf-8"), _0x497839 = JSON.parse(_0x497839)) : $.log("没有检测到任何助力码！！！\n");
            }
        }

        _0x164933();
    });
}

function _0x691131() {
    return new Promise(_0x32d42b => {
        const _0x1953c4 = {
            Cookie: _0x4bd5bc,
            referer: "https://h5.m.jd.com/",
            "User-Agent": $.UA
        };
        const _0x29295f = {
            url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
            headers: _0x1953c4,
            timeout: 10000
        };
        $.get(_0x29295f, (_0x3715bf, _0x59847d, _0x55a9bd) => {
            try {
                if (_0x55a9bd) {
                    _0x55a9bd = JSON.parse(_0x55a9bd);

                    if (!(_0x55a9bd.islogin === "1")) {
                        _0x55a9bd.islogin === "0" && ($.isLogin = false);
                    }
                }
            } catch (_0x8dd34) {
                console.log(_0x8dd34);
            } finally {
                _0x32d42b();
            }
        });
    });
}

function _0x3fa9cb(_0xd46e47, _0x150352 = {}, _0x3f0411 = 1500) {
    $.reqnum % 5 == 0 && (console.log("\n等待" + _0x2c1da1 / 1000 + "秒......\n"), _0x3f0411 = _0x2c1da1);
    $.reqnum++;
    return new Promise(_0x16a58e => {
        setTimeout(() => {
            $.get(_0x511cd9(_0xd46e47, _0x150352), (_0x8bc75b, _0xdab32c, _0x463628) => {
                try {
                    if (_0x8bc75b) {
                        console.log("\n东东农场: API查询请求失败 ‼️‼️");
                        console.log(JSON.stringify(_0x8bc75b));
                        console.log("function_id:" + _0xd46e47);
                        $.logErr(_0x8bc75b);
                    } else {
                        _0x5b9220(_0x463628) && (_0x463628 = JSON.parse(_0x463628));
                    }
                } catch (_0x3a766b) {
                    $.logErr(_0x3a766b, _0xdab32c);
                } finally {
                    _0x16a58e(_0x463628);
                }
            });
        }, _0x3f0411);
    });
}

function _0x5b9220(_0x5b6638) {
    try {
        if (typeof JSON.parse(_0x5b6638) == "object") {
            return true;
        }
    } catch (_0x560903) {
        console.log(_0x560903);
        console.log("京东服务器访问数据为空，请检查自身设备网络情况");
        return false;
    }
}

function _0x511cd9(_0x44b1b9, _0x52b515 = {}) {
    return {
        url: _0x26071d + "?functionId=" + _0x44b1b9 + "&body=" + encodeURIComponent(JSON.stringify(_0x52b515)) + "&appid=wh5",
        headers: {
            Host: "api.m.jd.com",
            Accept: "*/*",
            Origin: "https://carry.m.jd.com",
            "Accept-Encoding": "gzip, deflate, br",
            "User-Agent": $.UA,
            "Accept-Language": "zh-CN,zh-Hans;q=0.9",
            Referer: "https://carry.m.jd.com/",
            Cookie: _0x4bd5bc
        },
        timeout: 10000
    };
}

function _0x1726ae(_0x2ed46e) {
    if (typeof _0x2ed46e == "string") {
        try {
            return JSON.parse(_0x2ed46e);
        } catch (_0x80e072) {
            console.log(_0x80e072);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }