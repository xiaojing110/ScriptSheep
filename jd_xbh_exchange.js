/*
新百货大楼兑换
8 8 8 8 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_xbh_exchange.js 
updatetime: 2023/9/1
*/

const $ = new Env("新百货盖楼兑换20豆");
const _0x4b1754 = $.isNode() ? require("./jdCookie.js") : "",
    _0x2c6fd9 = $.isNode() ? require("./sendNotify") : "";

let _0x28954c = [],
    _0x3698d7 = "",
    _0x1ff503;

if ($.isNode()) {
    Object.keys(_0x4b1754).forEach(_0x463b93 => {
        _0x28954c.push(_0x4b1754[_0x463b93]);
    });

    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => { };
    }
} else {
    _0x28954c = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x41a7d3($.getdata("CookiesJD") || "[]").map(_0x169aa1 => _0x169aa1.cookie)].filter(_0x2c5a5f => !!_0x2c5a5f);
}

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let _0x325ffd = ["4708215"],
    _0x2d9098 = 0;
_0x2d9098 = Math.floor(Math.random() * _0x325ffd.length);
!(async () => {
    $.log("\n9月27下线");
    $.log("\nTG：https://t.me/dylan_jdpro");

    if (!_0x28954c[0]) {
        const _0x1c731f = {
            "open-url": "https://bean.m.jd.com/"
        };
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", _0x1c731f);
        return;
    }

    await $.wait(10);

    for (let _0x7f8467 = 0; _0x7f8467 < _0x28954c.length; _0x7f8467++) { }


    await _0x35b9ef();

    for (let _0x26c7c5 = 0; _0x26c7c5 < _0x28954c.length; _0x26c7c5++) {
        _0x3698d7 = _0x28954c[_0x26c7c5];

        if (_0x3698d7) {
            $.UserName = decodeURIComponent(_0x3698d7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3698d7.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x26c7c5 + 1;
            $.hotFlag = false;
            $.uid = "";
            $.nochuzi = false;
            $.notimes = false;
            console.log("\n\n******开始【京东账号" + $.index + "】" + $.UserName + "*********\n");
            await _0x3f2f9d();
            await _0x3334b3();

            if ($.outFlag) {
                break;
            }

            await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
        }
    }

    if ($.outFlag) {
        let _0x1c7e9c = "此ip已被限制，请过10分钟后再执行脚本";
        $.msg($.name, _0x1c7e9c);

        if ($.isNode()) {
            await _0x2c6fd9.sendNotify("" + $.name, "" + _0x1c7e9c);
        }
    }
})().catch(_0x356a89 => $.logErr(_0x356a89)).finally(() => $.done());

async function _0x3334b3() {
    try {
        $.hasEnd = true;
        $.Token = "";
        $.Pin = "";

        if ($.outFlag) {
            console.log("此ip已被限制，请过10分钟后再执行脚本");
            return;
        }

        await _0x4baaed("GetSaveByJos");

        if (Object.keys($.info).length === 0) {
            return;
        }

        if ($.playname.includes("玩家")) {
            $.log("获取玩家信息失败，请手动进游戏一次！");
            return;
        }

        await _0x4baaed("login");
        await $.wait(1000);
        console.log("当前大楼", $.floornum + 1, "层");
        console.log("当前金币", $.score, "个");
        console.log("当前锤子", $.chuizi, "个");

        for (let _0x34fc00 of Array(3)) {
            await _0x4baaed("exchange");
            await $.wait(1000);
        }
    } catch (_0x4fa8e0) {
        console.log(_0x4fa8e0);
    }
}

async function _0x4baaed(_0x20b251, _0x929147) {
    if ($.outFlag) {
        return;
    }

    let _0x2b27eb = "POST";

    switch (_0x20b251) {
        case "token":
            url = "https://jdjoy.jd.com/saas/framework/user/token?appId=f3576dcf13b52805bb78cc02450ffc26&client=m&url=pengyougou.m.jd.com";
            break;

        case "lkToken":
            url = "https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=f3576dcf13b52805bb78cc02450ffc26";
            break;

        case "GetSaveByJos":
            url = "https://jd-bigmall.gamecatstudio.com/g/Save/GetSaveByJos";
            const _0x50cf30 = {
                "lkToken": null,
                "openId": null,
                "xId": null,
                "accessToken": null,
                "version": "2.2.5",
                "channel": "release",
                "env": "jdApp",
                "isPre": false,
                "cuid": null
            };
            const _0x6c434f = {
                "code": $.code,
                "channel": "release",
                "babelChannel": null
            };
            _0x929147 = {
                "meta": _0x50cf30,
                ..._0x404a10(),
                "encrypt": true,
                "data": _0x6c434f,
                "clientReqId": _0x6c60e4()
            };
            break;

        case "login":
            url = "https://jd-bigmall.gamecatstudio.com/s/Api/Main/Login";
            const _0x116589 = {
                "uid": $.uid,
                "lkToken": null,
                "openId": $.openId,
                "xId": $.xId,
                "accessToken": $.accessToken,
                "uv": $.uv,
                "version": "2.2.5",
                "channel": "release",
                "env": "jdApp",
                "isPre": false,
                "cuid": $.uid
            };
            const _0x438db3 = {
                "lkToken": null,
                "pin": $.pin,
                "lkEPin": $.lkEPin,
                "id": $.uid,
                "babelChannel": null,
                "customChannel": null,
                "isValid": false,
                "appVersion": "2.2.5",
                "channel": "release",
                "env": "jdApp",
                "name": $.UserName,
                "avatar": $.avatarUrl,
                "avatarf": 0,
                "platform": "MOBILE_BROWSER",
                "system": "iOS",
                "browser": "Unknown",
                "device": {}
            };
            _0x438db3.device.type = "mobile";
            _0x929147 = {
                "meta": _0x116589,
                ..._0x404a10(),
                "encrypt": true,
                "data": _0x438db3,
                "clientReqId": _0x6c60e4()
            };
            break;

        case "exchange":
            url = "https://jd-bigmall.gamecatstudio.com/g/Lottery/Exchange";
            const _0x1a794 = {
                "uid": $.uid,
                "lkToken": null,
                "openId": $.openId,
                "xId": $.xId,
                "accessToken": $.accessToken,
                "uv": $.uv,
                "version": "2.2.5",
                "channel": "release",
                "env": "jdApp",
                "isPre": false,
                "cuid": $.uid
            };
            const _0x4c803b = {
                "type": "normal",
                "id": "3fa5afb82c4443f2a2fbd0fb2e12227f"
            };
            _0x929147 = {
                "meta": _0x1a794,
                ..._0x404a10(),
                "encrypt": true,
                "data": _0x4c803b,
                "clientReqId": _0x6c60e4()
            };
            break;

        default:
            console.log("错误" + _0x20b251);
    }

    _0x929147 && _0x929147.meta && (_0x929147.meta = _0x2c9d28.aesEncrypt(JSON.stringify(_0x929147.meta), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
    _0x929147 && _0x929147.encrypt && (_0x929147.data = _0x2c9d28.aesEncrypt(JSON.stringify(_0x929147.data), "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));

    let _0x24ad96 = _0x4361b5(url, _0x929147, _0x2b27eb);

    return new Promise(async _0x2caa6a => {
        $.post(_0x24ad96, (_0x2474ef, _0x40816d, _0x440ce7) => {
            try {
                _0x2474ef ? (_0x40816d && _0x40816d.statusCode && _0x40816d.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(_0x2474ef, _0x2474ef)), console.log(" API请求失败，请检查网路重试")) : _0x440ce7 = _0x5bc9c2(_0x20b251, _0x440ce7);
            } catch (_0x317aac) {
                console.log(_0x317aac, _0x40816d);
            } finally {
                _0x2caa6a(_0x440ce7);
            }
        });
    });
}

async function _0x5bc9c2(_0x3ab33d, _0x2ef116) {
    let _0x445bc2 = "";

    try {
        if (_0x2ef116) {
            _0x445bc2 = JSON.parse(_0x2ef116);

            if (_0x445bc2.data) {
                _0x445bc2.data = JSON.parse(_0x2c9d28.aesDecrypt(_0x445bc2.data, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
            }

            if (_0x445bc2.extraData) {
                _0x445bc2.extraData = JSON.parse(_0x2c9d28.aesDecrypt(_0x445bc2.extraData, "8a5e4h2x5d6g9e5a", "h4a1e8h4z1a2g5e8"));
            }
        }
    } catch (_0x25653a) {
        console.log(_0x3ab33d + " 执行任务异常");
        $.runFalag = false;
    }

    try {
        switch (_0x3ab33d) {
            case "token":
                if (typeof _0x445bc2 == "object") {
                    if (_0x445bc2.success) {
                        if (typeof _0x445bc2.data != "undefined") {
                            $.Token = _0x445bc2.data;
                        }
                    } else {
                        _0x445bc2.errorMessage ? console.log("token " + _0x445bc2.errorMessage) : console.log(_0x2ef116);
                    }
                } else {
                    console.log(_0x2ef116);
                }

                break;

            case "login":
                if (typeof _0x445bc2 == "object") {
                    if (_0x445bc2.success) {
                        let _0x46d1f9 = _0x445bc2.currentTime;
                        console.log(Date.now() - _0x46d1f9);
                    } else {
                        console.log(JSON.stringify(_0x445bc2));
                        console.log("与服务器时差：" + ($.tsstr - _0x445bc2.currentTime) + "}");
                    }
                } else {
                    console.log(_0x2ef116);
                }

                break;

            case "GetSaveByJos":
                if (typeof _0x445bc2 == "object") {
                    $.info = {};
                    $.difftime = Date.now() - _0x445bc2.currentTime;

                    if (_0x445bc2.success) {
                        $.info = _0x2c9d28.aesDecrypt(_0x445bc2.data.save, "k4ug8ayehg5a8e96", "g8err4a5g23a5e8g");
                        $.info = JSON.parse($.info);
                        $.score = $.info.items.data[101001001];
                        $.taskstatelist = $.info.task.daySteps;
                        $.chuizi = $.info.items.data[101001002];
                        $.uv = $.info.updateVersion;
                        $.signstate = $.info.signIn.getSignReward;
                        $.signtaskstate = $.info.signIn.getTaskReward;
                        $.floornum = $.info.building.floorNum;
                        $.eggstate = $.info.easterEggTask.completeTask;
                        $.eggTimes = $.info.easterEggTask.getRewardTimes;
                        $.lotterytimes = $.info.lottery.todayRollCount;
                        $.uid = $.info._id;
                        $.accessToken = $.info.accessToken;
                        $.avatarUrl = $.info.avatarUrl;
                        $.openId = $.info.openId;
                        $.xId = $.info.xId;
                        $.lkEPin = $.info.lkEPin;
                        $.pin = $.info.pin;
                        $.playname = $.info.name;
                    } else {
                        console.log("获取信息失败，跳出");
                    }
                } else {
                    console.log(_0x2ef116);
                }

                break;

            case "exchange":
                typeof _0x445bc2 == "object" ? _0x445bc2.success ? ($.uv += 1, _0x445bc2.data.record.consumed && console.log("\n兑换20豆成功,消耗" + _0x445bc2.data.record.cost + "金币")) : console.log(JSON.stringify(_0x445bc2)) : console.log(_0x2ef116);
                break;

            default:
                return _0x445bc2;
        }
    } catch (_0x539047) {
        console.log(_0x539047);
    }
}

function _0x4361b5(_0x5bdca1, _0x324734, _0x44e224 = "POST") {
    const _0xe9e59f = {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": $.UA,
        "X-Requested-With": "com.jingdong.app.mall"
    };
    _0x5bdca1.indexOf("jddl") > -1 && (_0xe9e59f.Origin = "https://jddl.gamecatstudio.com", _0xe9e59f.Referer = "https://jddl.gamecatstudio.com/", delete _0xe9e59f.Cookie);
    return {
        "url": _0x5bdca1,
        "method": _0x44e224,
        "headers": _0xe9e59f,
        "body": JSON.stringify(_0x324734),
        "timeout": 30000
    };
}

function _0x1b7949(_0x3e79de) {
    _0x3e79de = _0x3e79de || 32;
    let _0x115a29 = "abcdef0123456789",
        _0x40bc4e = _0x115a29.length,
        _0x19a617 = "";

    for (let _0x2c3e90 = 0; _0x2c3e90 < _0x3e79de; _0x2c3e90++) {
        _0x19a617 += _0x115a29.charAt(Math.floor(Math.random() * _0x40bc4e));
    }

    return _0x19a617;
}

function _0x18ffa7(_0x3459b7, _0x46eca0) {
    var _0x32f758 = Math.floor(Math.random() * (_0x46eca0 - _0x3459b7 + 1) + _0x3459b7);

    return _0x32f758;
}

function _0x41a7d3(_0x20a271) {
    if (typeof _0x20a271 == "string") {
        try {
            return JSON.parse(_0x20a271);
        } catch (_0x530f27) {
            console.log(_0x530f27);
            $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
            return [];
        }
    }
}

async function _0x35b9ef() {
    $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + _0x1b7949(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x6c60e4() {
    function _0x33d592() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
    }

    return _0x33d592() + _0x33d592() + _0x33d592() + _0x33d592() + _0x33d592() + _0x33d592() + _0x33d592() + _0x33d592();
}

function _0x404a10() {
    $.tsstr = Date.now() - $.difftime || 0;

    let _0x5bc194 = _0x2c9d28.aesEncrypt(String($.tsstr), "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge"),
        _0x1ea679 = _0x2c9d28.aesEncrypt(_0x5bc194 + ($.uid || "") + "2.2.5" + "release" + "jdApp", "a8ge9g5r8a4d1g5r", "5e8g8r6a32z1d5ge");

    const _0x45d47b = {
        "t": _0x5bc194,
        "s": _0x1ea679
    };
    return _0x45d47b;
}

const _0x1f38b1 = require("crypto-js");

var _0x2c9d28 = function () {
    function _0x1576eb() { }

    _0x1576eb.aesEncrypt = function (_0x3b3f6f, _0x3062a4, _0xa13b39) {
        var _0x12b750 = _0x1f38b1.enc.Utf8.parse(_0x3062a4),
            _0x2c4f39 = _0x1f38b1.enc.Utf8.parse(_0xa13b39);

        return _0x1f38b1.AES.encrypt(_0x3b3f6f, _0x12b750, {
            "iv": _0x2c4f39,
            "mode": _0x1f38b1.mode.CBC,
            "padCRng": _0x1f38b1.pad.Pkcs7
        }).toString(_0x1f38b1.format.Hex);
    };

    _0x1576eb.aesDecrypt = function (_0x292ecc, _0x416044, _0x5040c1) {
        var _0x4d53cc = _0x1f38b1.enc.Utf8.parse(_0x416044),
            _0x32f828 = _0x1f38b1.enc.Utf8.parse(_0x5040c1),
            _0x2d0da9 = _0x1f38b1.enc.Hex.parse(_0x292ecc),
            _0x23af14 = _0x1f38b1.enc.Base64.stringify(_0x2d0da9);

        return _0x1f38b1.AES.decrypt(_0x23af14, _0x4d53cc, {
            "iv": _0x32f828,
            "mode": _0x1f38b1.mode.CBC,
            "padCRng": _0x1f38b1.pad.Pkcs7
        }).toString(_0x1f38b1.enc.Utf8);
    };

    return _0x1576eb;
}();



async function _0x3f2f9d() {
    const _0x437fad = {
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": _0x3698d7
    };
    const _0x14b171 = {
        "url": "https://open-oauth.jd.com/oauth2/to_login?app_key=904D7F385D9251D2C565B37ACCAE0D44&response_type=code&scope=snsapi_app_union_login&redirect_uri=https%3A%2F%2Fjddl.gamecatstudio.com%2Fr%2Findex.html&",
        "headers": _0x437fad,
        "followRedirect": false
    };
    return new Promise(async _0x31a775 => {
        $.get(_0x14b171, async (_0x5746f6, _0x3ad76b, _0x140ce8) => {
            try {
                _0x5746f6 ? (console.log("" + JSON.stringify(_0x5746f6)), console.log(" API请求失败，请检查网路重试")) : await _0x40231a(_0x3ad76b.headers.location.replace("to_authorize", "authorize"));
            } catch (_0x503af5) {
                $.logErr(_0x503af5, _0x3ad76b);
            } finally {
                _0x31a775(_0x140ce8);
            }
        });
    });
}

async function _0x40231a(_0x249749) {
    let _0x4571e7 = {
        "url": _0x249749,
        "headers": {
            "Referer": "https://prodev.m.jd.com/",
            "User-Agent": $.UA,
            "Cookie": _0x3698d7 + "language=zh_CN"
        },
        "followRedirect": false
    };
    return new Promise(async _0x4ec58c => {
        $.get(_0x4571e7, async (_0x54f5d6, _0x32cc8b, _0x1520b2) => {
            try {
                _0x54f5d6 ? (console.log("" + JSON.stringify(_0x54f5d6)), console.log(" API请求失败，请检查网路重试")) : $.code = _0x32cc8b.headers.location.match(/code=(.*)/)[1];
            } catch (_0xe0f02c) {
                $.logErr(_0xe0f02c, _0x32cc8b);
            } finally {
                _0x4ec58c(_0x1520b2);
            }
        });
    });
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }