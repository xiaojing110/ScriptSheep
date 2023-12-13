/*
极速模式-签到提现
默认提现，不提现变量JSQDTX='false'
33 3 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_speedtx.js
updatetime:2023/10/01
 */
const $ = new Env('极速模式签到');
const _0x1b5eeb = $.isNode() ? require("./sendNotify") : "",
    _0x2ca3d8 = $.isNode() ? require("./jdCookie.js") : "",
    _0x218c98 = require("./function/dylanz.js"),
    _0x50af07 = require("./USER_AGENTS"),
    _0x370184 = process.env.JSQDTX ? process.env.JSQDTX : true;

let _0x3666db = true,
    _0x58031 = [],
    _0x22b555 = "",
    _0xd3d8f5 = "";

if ($.isNode()) {
    Object.keys(_0x2ca3d8).forEach(_0x1bc013 => {
        _0x58031.push(_0x2ca3d8[_0x1bc013]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x58031 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x254888($.getdata("CookiesJD") || "[]").map(_0xe3bb52 => _0xe3bb52.cookie)].filter(_0x1d7736 => !!_0x1d7736);

!(async () => {
    if (!_0x58031[0]) {
        $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        return;
    }

    $.log("\n当前版本：20231001 ");
    $.log("TG频道：https://t.me/dylan_jdpro");

    for (let _0x91f10e = 0; _0x91f10e < _0x58031.length; _0x91f10e++) {
        if (_0x58031[_0x91f10e]) {
            _0x22b555 = _0x58031[_0x91f10e];
            $.UserName = decodeURIComponent(_0x22b555.match(/pt_pin=([^; ]+)(?=;?)/) && _0x22b555.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x91f10e + 1;
            $.isLogin = true;
            $.nickName = "";
            $.signInFlag = 0;
            $.score = 0;
            $.tasklist = [];
            $.UA = _0x50af07.UARAM();
            await _0x55f2cc();
            console.log("\n--------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x1b5eeb.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x231568();
            $.signInFlag == 0 && ($.log("\n去签到..."), await _0xb8af3e());
            await _0x57b706();

            if ($.tasklist.length != 0) {
                console.log("\n去做任务...");

                for (let _0x11f6f6 of $.tasklist) {
                    if (_0x11f6f6.taskTitle === "下单") continue;

                    if (_0x11f6f6.taskFinished) {
                        console.log(_0x11f6f6.taskShowTitle + " ---- 已完成");
                        continue;
                    }

                    console.log("去做任务 " + _0x11f6f6.taskShowTitle);

                    if (_0x11f6f6.timeLimitPeriod) {
                        await _0xd5d293(_0x11f6f6.id, _0x11f6f6.taskSourceUrl);
                        await _0x1072f4(_0x11f6f6.id);
                        $.log("等待 " + _0x11f6f6.timeLimitPeriod + " 秒...");
                        await $.wait(_0x11f6f6.timeLimitPeriod * 1000 + 100);
                        await _0x29b2fb(_0x11f6f6.id);
                        await _0x55caf3();
                    } else await _0x12452e(_0x11f6f6.taskType, _0x11f6f6.id, _0x11f6f6.taskSourceUrl), await $.wait(500);

                    await _0x2ffaa1(_0x11f6f6.taskType, _0x11f6f6.id);
                }
            }

            if (_0x370184 != "false") {
                if ($.score > 20) $.log("\n去提现20元..."), await _0x3e2615(3); else {
                    if ($.score > 1) $.log("\n去提现1元..."), await _0x3e2615(2); else $.score > 0.3 ? ($.log("\n去提现0.3元..."), await _0x3e2615(1)) : $.log("余额不够提现！");
                }
            } else $.log("已设置不提现！！");

            await $.wait(5000);
        }
    }
})().catch(_0x1b8a3b => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1b8a3b + "!", "");
}).finally(() => {
    $.done();
});

async function _0x231568() {
    let _0x3ece1a = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    _0x3ece1a = await _0x31f249("bSignInHome", _0x3ece1a, "76674");
    if (!_0x3ece1a) return;
    return new Promise(async _0xd56660 => {
        $.post(_0x4af8c0(_0x3ece1a), async (_0x4d619e, _0x4310c9, _0x4b8165) => {
            try {
                _0x4d619e ? (console.log("" + JSON.stringify(_0x4d619e)), console.log(" API请求失败，请检查网路重试")) : (_0x4b8165 = JSON.parse(_0x4b8165), _0x4b8165.code == 0 ? ($.score = _0x4b8165.data.signInCoin, console.log("余额" + _0x4b8165.data.signInCoin + "元"), $.signInFlag = _0x4b8165.data.signInFlag) : console.log(_0x4b8165.errMsg));
            } catch (_0x366051) {
                $.logErr(_0x366051, _0x4310c9);
            } finally {
                _0xd56660(_0x4b8165);
            }
        });
    });
}

async function _0xb8af3e() {
    let _0x5a0386 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    _0x5a0386 = await _0x31f249("bSignInDo", _0x5a0386, "61e2b");
    if (!_0x5a0386) return;
    return new Promise(async _0x3dad8d => {
        $.post(_0x4af8c0(_0x5a0386), async (_0x5f3977, _0xb63824, _0x2d9b0f) => {
            try {
                _0x5f3977 ? (console.log("" + JSON.stringify(_0x5f3977)), console.log(" API请求失败，请检查网路重试")) : (_0x2d9b0f = JSON.parse(_0x2d9b0f), _0x2d9b0f.code == 0 ? console.log("签到成功：获得：" + _0x2d9b0f.data.signInCoin) : console.log(_0x2d9b0f.errMsg));
            } catch (_0x3ebd66) {
                $.logErr(_0x3ebd66, _0xb63824);
            } finally {
                _0x3dad8d(_0x2d9b0f);
            }
        });
    });
}

async function _0x12452e(_0x5e7fbf, _0x112a4c, _0x5d412f) {
    let _0x531027 = {
        "taskType": _0x5e7fbf,
        "taskId": _0x112a4c,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "itemId": _0x5d412f
    };
    _0x531027 = await _0x31f249("apsDoTask", _0x531027, "54ed7");
    if (!_0x531027) return;
    return new Promise(async _0x491bfb => {
        $.post(_0x4af8c0(_0x531027), async (_0x50ad89, _0x51c1cf, _0x39c328) => {
            try {
                if (_0x50ad89) console.log("" + JSON.stringify(_0x50ad89)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x39c328 = JSON.parse(_0x39c328);

                    if (_0x39c328.code == 0) { } else console.log(_0x39c328.errMsg);
                }
            } catch (_0x169bd8) {
                $.logErr(_0x169bd8, _0x51c1cf);
            } finally {
                _0x491bfb(_0x39c328);
            }
        });
    });
}

async function _0xd5d293(_0x58cc07, _0x1ef444) {
    let _0x401fce = {
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "taskId": _0x58cc07,
        "itemId": encodeURIComponent(_0x1ef444),
        "channel": 4
    };
    return _0x401fce = "functionId=apStartTaskTime&body=" + JSON.stringify(_0x401fce) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x11ead9 => {
        $.post(_0x4af8c0(_0x401fce), async (_0x115064, _0x2bfd48, _0x2d4035) => {
            try {
                if (_0x115064) console.log("" + JSON.stringify(_0x115064)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x2d4035 = JSON.parse(_0x2d4035);

                    if (_0x2d4035.code == 0) { } else console.log(_0x2d4035.errMsg);
                }
            } catch (_0xeb314a) {
                $.logErr(_0xeb314a, _0x2bfd48);
            } finally {
                _0x11ead9(_0x2d4035);
            }
        });
    });
}

async function _0x1072f4(_0x1af509) {
    let _0x2de88c = {
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "taskId": _0x1af509
    };
    return _0x2de88c = "functionId=apCheckAndResetTaskTime&body=" + JSON.stringify(_0x2de88c) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x457078 => {
        $.post(_0x4af8c0(_0x2de88c), async (_0x229fbd, _0x3b0545, _0x5efc2a) => {
            try {
                if (_0x229fbd) console.log("" + JSON.stringify(_0x229fbd)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x5efc2a = JSON.parse(_0x5efc2a);

                    if (_0x5efc2a.code == 0) { } else console.log(_0x5efc2a.errMsg);
                }
            } catch (_0x2d1ec3) {
                $.logErr(_0x2d1ec3, _0x3b0545);
            } finally {
                _0x457078(_0x5efc2a);
            }
        });
    });
}

async function _0x55caf3() {
    let _0x3ef994 = {
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    return _0x3ef994 = "functionId=apDoLimitTimeTask&body=" + JSON.stringify(_0x3ef994) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x17f19e => {
        $.post(_0x4af8c0(_0x3ef994), async (_0x5762b1, _0x5a96ca, _0x4e8806) => {
            try {
                if (_0x5762b1) console.log("" + JSON.stringify(_0x5762b1)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x4e8806 = JSON.parse(_0x4e8806);

                    if (_0x4e8806.code == 0) { } else console.log(_0x4e8806.errMsg);
                }
            } catch (_0x29c335) {
                $.logErr(_0x29c335, _0x5a96ca);
            } finally {
                _0x17f19e(_0x4e8806);
            }
        });
    });
}

async function _0x29b2fb(_0x1c1c95) {
    let _0x55d4f0 = {
        "linkId": "FIz2zkvbepstVFm3uqLOUA",
        "taskId": String(_0x1c1c95)
    };
    return _0x55d4f0 = "functionId=apCheckTaskTimeEnd&body=" + JSON.stringify(_0x55d4f0) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x3f2063 => {
        $.post(_0x4af8c0(_0x55d4f0), async (_0x5a01b3, _0x461958, _0x59b88c) => {
            try {
                if (_0x5a01b3) console.log("" + JSON.stringify(_0x5a01b3)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x59b88c = JSON.parse(_0x59b88c);

                    if (_0x59b88c.code == 0) { } else console.log(_0x59b88c.errMsg);
                }
            } catch (_0x4b2ea3) {
                $.logErr(_0x4b2ea3, _0x461958);
            } finally {
                _0x3f2063(_0x59b88c);
            }
        });
    });
}

async function _0x2ffaa1(_0x21bc95, _0x42f24e) {
    let _0x3eeb67 = {
        "taskType": _0x21bc95,
        "taskId": _0x42f24e,
        "channel": 4,
        "checkVersion": true,
        "cityId": 0,
        "provinceId": 0,
        "countyId": 0,
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    _0x3eeb67 = await _0x31f249("apTaskDrawAward", _0x3eeb67, "6f2b6");
    if (!_0x3eeb67) return;
    return new Promise(async _0x10c7f1 => {
        $.post(_0x4af8c0(_0x3eeb67), async (_0x550b45, _0xe01934, _0x25ddde) => {
            try {
                if (_0x550b45) console.log("" + JSON.stringify(_0x550b45)), console.log(" API请求失败，请检查网路重试"); else {
                    _0x25ddde = JSON.parse(_0x25ddde);
                    if (_0x25ddde.code == 0) console.log("任务完成：获得：" + _0x25ddde.data[0].awardGivenNumber + "\n"); else {
                        console.log(_0x25ddde.errMsg);
                    }
                }
            } catch (_0x991603) {
                $.logErr(_0x991603, _0xe01934);
            } finally {
                _0x10c7f1(_0x25ddde);
            }
        });
    });
}

async function _0x3e2615(_0x3829b9) {
    let _0xbaaf98 = {
        "activityId": "FIz2zkvbepstVFm3uqLOUA",
        "awardType": 4,
        "gear": _0x3829b9,
        "linkId": "FIz2zkvbepstVFm3uqLOUA"
    };
    _0xbaaf98 = await _0x31f249("bSignInExchange", _0xbaaf98, "ff179");
    if (!_0xbaaf98) return;
    return new Promise(async _0x21dd72 => {
        $.post(_0x4af8c0(_0xbaaf98), async (_0x4af411, _0x4184bd, _0x290d92) => {
            try {
                if (_0x4af411) {
                    console.log("" + JSON.stringify(_0x4af411));
                    console.log(" API请求失败，请检查网路重试");
                } else _0x290d92 = JSON.parse(_0x290d92), _0x290d92.code == 0 ? _0x290d92.data.msg.includes("提现") && $.log("提现成功！") : console.log(_0x290d92.errMsg);
            } catch (_0x3ba31b) {
                $.logErr(_0x3ba31b, _0x4184bd);
            } finally {
                _0x21dd72(_0x290d92);
            }
        });
    });
}

async function _0x57b706() {
    let _0x42602f = {
        "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0&loginType=2&loginWQBiz=wegame",
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://h5.m.jd.com",
            "User-Agent": $.UA,
            "Cookie": _0x22b555
        }
    };
    return new Promise(async _0x15e97a => {
        $.get(_0x42602f, async (_0x1c363e, _0x43788c, _0x5379c2) => {
            try {
                _0x1c363e ? (console.log("" + JSON.stringify(_0x1c363e)), console.log(" API请求失败，请检查网路重试")) : (_0x5379c2 = JSON.parse(_0x5379c2), _0x5379c2.code == 0 ? $.tasklist = _0x5379c2.data : console.log(_0x5379c2.errMsg));
            } catch (_0x4d4c4d) {
                $.logErr(_0x4d4c4d, _0x43788c);
            } finally {
                _0x15e97a(_0x5379c2);
            }
        });
    });
}

async function _0x31f249(_0x5e0cbe, _0x39236d, _0x109453) {
    let _0x50a8f9 = {
        "appId": _0x109453,
        "fn": _0x5e0cbe,
        "body": _0x39236d,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    return _0x39236d = await _0x218c98.getbody(_0x50a8f9), _0x39236d;
}

function _0x4af8c0(_0x1c6d1b) {
    return {
        "url": "https://api.m.jd.com/api",
        "body": _0x1c6d1b + "&loginType=2&loginWQBiz=wegame",
        "headers": {
            "Host": "api.m.jd.com",
            "Origin": "https://h5.m.jd.com",
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": $.UA,
            "Cookie": _0x22b555
        }
    };
}

function _0x55f2cc() {
    return new Promise(_0xc927cf => {
        const _0x201b7f = {
            "url": "https://api.m.jd.com/client.action",
            "body": "body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&",
            "headers": {
                "Cookie": _0x22b555,
                "User-Agent": $.UA
            },
            "timeout": 10000
        };
        $.post(_0x201b7f, (_0x3c9698, _0x2ed3e2, _0x46f6ad) => {
            try {
                if (_0x46f6ad) {
                    _0x46f6ad = JSON.parse(_0x46f6ad);

                    if (_0x46f6ad.islogin === "1") { } else _0x46f6ad.islogin === "0" && ($.isLogin = false);
                }
            } catch (_0x32eff5) {
                console.log(_0x32eff5);
            } finally {
                _0xc927cf();
            }
        });
    });
}

function _0x313419() {
    return new Promise(_0x5d0a6c => {
        !_0x3666db ? $.msg($.name, "", "" + _0xd3d8f5) : $.log("京东账号" + $.index + $.nickName + "\n" + _0xd3d8f5);

        _0x5d0a6c();
    });
}

function _0x566ac6(_0x1f5c9d) {
    try {
        if (typeof JSON.parse(_0x1f5c9d) == "object") return true;
    } catch (_0x4073b7) {
        return console.log(_0x4073b7), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
    }
}

function _0x254888(_0x28f96d) {
    if (typeof _0x28f96d == "string") try {
        return JSON.parse(_0x28f96d);
    } catch (_0x44a081) {
        return console.log(_0x44a081), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }