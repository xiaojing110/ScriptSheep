/*
13 13 * * * jd_wwpark_task.js
*/
const $ = new Env('汪汪乐园任务');
const _0x19ed9a = $.isNode() ? require("./jdCookie.js") : "",
    _0x4259dc = $.isNode() ? require("./sendNotify") : "",
    _0x278c5d = require("./function/dylany"),
    _0x268d46 = require("./USER_AGENTS");

let _0x3a8744 = [],
    _0x540915 = "";

if ($.isNode()) {
    Object.keys(_0x19ed9a).forEach(_0x424ab2 => {
        _0x3a8744.push(_0x19ed9a[_0x424ab2]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x3a8744 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x34a834($.getdata("CookiesJD") || "[]").map(_0x2f6da3 => _0x2f6da3.cookie)].filter(_0x953a19 => !!_0x953a19);

$.invitePinTaskList = [];
$.invitePin = [];
message = "";
!(async () => {
    if (!_0x3a8744[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let _0x889c8f = 0; _0x889c8f < _0x3a8744.length; _0x889c8f++) {
        _0x540915 = _0x3a8744[_0x889c8f];

        if (_0x540915) {
            $.UserName = decodeURIComponent(_0x540915.match(/pt_pin=([^; ]+)(?=;?)/) && _0x540915.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x889c8f + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            $.UA = _0x268d46.UARAM ? _0x268d46.UARAM() : _0x268d46.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });

                if ($.isNode()) {
                    await _0x4259dc.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
                }

                continue;
            }

            await _0x520799();
            await _0x4421ff();

            for (const _0x3b3b6b of $.taskList) {
                if (_0x3b3b6b.taskFinished && !_0x3b3b6b.canDrawAwardNum) continue;

                if (_0x3b3b6b.taskType === "SIGN") {
                    $.log("" + _0x3b3b6b.taskTitle);
                    await _0x782ab0(_0x3b3b6b.id, _0x3b3b6b.taskType, undefined);
                    $.log(_0x3b3b6b.taskTitle + " 领取奖励");
                    await _0x52a584(_0x3b3b6b.id, _0x3b3b6b.taskType);
                }

                if (_0x3b3b6b.taskType === "BROWSE_PRODUCT" || _0x3b3b6b.taskType === "BROWSE_CHANNEL" && _0x3b3b6b.taskLimitTimes !== 1) {
                    let _0xe4224c = await _0x18c751(_0x3b3b6b.id, _0x3b3b6b.taskType),
                        _0xd86af5 = 0;

                    if (_0xe4224c.length === 0) {
                        let _0x907483 = await _0x52a584(_0x3b3b6b.id, _0x3b3b6b.taskType);

                        !_0x907483.success && ($.log(_0x3b3b6b.taskTitle + "|" + _0x3b3b6b.taskShowTitle + " 领取完成!"), _0xe4224c = await _0x18c751(_0x3b3b6b.id, _0x3b3b6b.taskType));
                    }

                    while (_0x3b3b6b.taskLimitTimes - _0x3b3b6b.taskDoTimes > 0) {
                        if (_0xe4224c.length === 0) {
                            $.log(_0x3b3b6b.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(_0x3b3b6b.taskTitle + " " + _0x3b3b6b.taskDoTimes + "/" + _0x3b3b6b.taskLimitTimes);

                        let _0xaa5b13 = await _0x782ab0(_0x3b3b6b.id, _0x3b3b6b.taskType, _0xe4224c[_0xd86af5].itemId);

                        await $.wait(1000);
                        _0xaa5b13.code === 2005 || _0xaa5b13.code === 0 ? $.log(_0x3b3b6b.taskTitle + "|" + _0x3b3b6b.taskShowTitle + " 任务完成！") : $.log(_0xaa5b13.echo + " 任务失败！");
                        _0xd86af5++;
                        _0x3b3b6b.taskDoTimes++;

                        if (!_0xe4224c[_0xd86af5]) {
                            break;
                        }
                    }

                    for (let _0x41d595 = 0; _0x41d595 < _0x3b3b6b.taskLimitTimes; _0x41d595++) {
                        let _0x55683e = await _0x52a584(_0x3b3b6b.id, _0x3b3b6b.taskType);

                        if (!_0x55683e.success) {
                            $.log(_0x3b3b6b.taskTitle + "|" + _0x3b3b6b.taskShowTitle + " 领取完成!");
                            break;
                        }

                        await $.wait(1000);
                    }
                } else {
                    if (_0x3b3b6b.taskType === "SHARE_INVITE") {
                        $.yq_taskid = _0x3b3b6b.id;

                        for (let _0x521782 = 0; _0x521782 < _0x3b3b6b.canDrawAwardNum; _0x521782++) {
                            let _0x4bc0cd = await _0x52a584($.yq_taskid, "SHARE_INVITE");

                            if (!_0x4bc0cd.success) break;
                            await $.wait(1000);
                            $.log("助力奖励领取成功！");
                        }
                    }
                }

                _0x3b3b6b.taskType === "BROWSE_CHANNEL" && _0x3b3b6b.taskLimitTimes === 1 && ($.log(_0x3b3b6b.taskTitle + "|" + _0x3b3b6b.taskShowTitle), await _0x782ab0(_0x3b3b6b.id, _0x3b3b6b.taskType, _0x3b3b6b.taskSourceUrl), $.log(_0x3b3b6b.taskTitle + "|" + _0x3b3b6b.taskShowTitle + " 领取奖励"), await _0x52a584(_0x3b3b6b.id, _0x3b3b6b.taskType));
                await $.wait(1000);
            }
        }
    }
})().catch(_0x5f2479 => $.logErr(_0x5f2479)).finally(() => $.done());

async function _0x520799(_0x18ccfc = {
    "taskId": "",
    "inviteType": "",
    "inviterPin": "",
    "linkId": "jBNXcoiASxGof0f2RFI2Sw"
}) {
    let _0x57b304 = {
        "appId": "4abce",
        "fn": "joyBaseInfo",
        "body": _0x18ccfc,
        "apid": "activities_platform",
        "ver": $.UA.split(";")[2],
        "cl": "ios",
        "user": $.UserName,
        "code": 1,
        "ua": $.UA
    };
    return _0x18ccfc = await _0x278c5d.getbody(_0x57b304), new Promise(async _0x41c44f => {
        let _0x2a10c0 = _0xc06bda(_0x18ccfc, "joyBaseInfo");

        $.post(_0x2a10c0, async (_0x57bb70, _0x35368c, _0x3e4446) => {
            try {
                if (_0x57bb70) console.log("" + JSON.stringify(_0x57bb70)), console.log("getJoyBaseInfo API请求失败，请检查网路重试"); else {
                    _0x3e4446 = JSON.parse(_0x3e4446);
                    _0x3e4446.success ? $.invitePin.push(_0x3e4446.data.invitePin) : $.log(_0x3e4446.errMsg);
                }
            } catch (_0x317571) {
                $.logErr(_0x317571, _0x35368c);
            } finally {
                _0x41c44f(_0x3e4446);
            }
        });
    });
}

function _0x4421ff() {
    return new Promise(_0x2e6c7d => {
        $.post(_0xc06bda("body=%7B%22linkId%22%3A%22jBNXcoiASxGof0f2RFI2Sw%22%7D&appid=activities_platform", "apTaskList"), async (_0x12b706, _0x5c1c04, _0x5a41f9) => {
            $.log("=== 任务列表 start ===");

            try {
                if (_0x12b706) console.log("" + JSON.stringify(_0x12b706)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    _0x5a41f9 = JSON.parse(_0x5a41f9);
                    $.taskList = _0x5a41f9.data;

                    for (const _0x545be2 of $.taskList) {
                        $.log(_0x545be2.taskTitle + " " + _0x545be2.taskDoTimes + "/" + _0x545be2.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (_0x54aaed) {
                $.logErr(_0x54aaed, _0x5c1c04);
            } finally {
                _0x2e6c7d(_0x5a41f9);
            }
        });
    });
}

async function _0x782ab0(_0x5d186b, _0x21f2ba, _0x391343 = "", _0xeb3ca7 = "activities_platform") {
    let _0x26b93c = "{\"taskType\":\"" + _0x21f2ba + "\",\"taskId\":" + _0x5d186b + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"itemId\":\"" + _0x391343 + "\"}",
        _0x3a7e83 = {
            "appId": "cd949",
            "fn": "apDoTask",
            "body": _0x26b93c,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x26b93c = await _0x278c5d.getbody(_0x3a7e83);
    if (!_0x26b93c) return;
    return new Promise(_0x361ec2 => {
        $.post(_0xc06bda(_0x26b93c, "apDoTask"), async (_0x431299, _0x2a18a9, _0x4d6fc4) => {
            try {
                _0x431299 ? (console.log("" + JSON.stringify(_0x431299)), console.log($.name + " API请求失败，请检查网路重试")) : _0x4d6fc4 = JSON.parse(_0x4d6fc4);
            } catch (_0x4b7da9) {
                $.logErr(_0x4b7da9, _0x2a18a9);
            } finally {
                _0x361ec2(_0x4d6fc4);
            }
        });
    });
}

function _0x3e7f0a(_0x39266e, _0x177ce4, _0x4e9c97, _0x57441f = "activities_platform") {
    return new Promise(_0x1fe063 => {
        $.post(_0xc06bda("body={\"taskType\":\"" + _0x177ce4 + "\",\"taskId\":" + _0x39266e + ",\"itemId\":\"" + encodeURIComponent(_0x4e9c97) + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=" + _0x57441f, "apDoTask"), async (_0x267230, _0x36dfae, _0x4c68d0) => {
            try {
                _0x267230 ? (console.log("" + JSON.stringify(_0x267230)), console.log($.name + " API请求失败，请检查网路重试")) : _0x4c68d0 = JSON.parse(_0x4c68d0);
            } catch (_0x1c515b) {
                $.logErr(_0x1c515b, _0x36dfae);
            } finally {
                _0x1fe063(_0x4c68d0);
            }
        });
    });
}

function _0x18c751(_0x5c9e25, _0x3564df) {
    return new Promise(_0x3b4890 => {
        $.post(_0xc06bda("functionId=apTaskDetail&body={\"taskType\":\"" + _0x3564df + "\",\"taskId\":" + _0x5c9e25 + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=activities_platform", "apTaskDetail"), async (_0x3d615c, _0x30119d, _0x584835) => {
            try {
                _0x3d615c ? (console.log("" + JSON.stringify(_0x3d615c)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x584835 = JSON.parse(_0x584835), !_0x584835.success ? $.taskDetailList = [] : $.taskDetailList = _0x584835.data.taskItemList);
            } catch (_0x39c9c0) {
                $.logErr(_0x39c9c0, _0x30119d);
            } finally {
                !_0x584835.success ? _0x3b4890([]) : _0x3b4890(_0x584835.data.taskItemList);
            }
        });
    });
}

async function _0x52a584(_0x877fca, _0x242e33) {
    let _0x41981c = "{ \"taskType\": \"" + _0x242e33 + "\", \"taskId\": " + _0x877fca + ",\"linkId\": \"jBNXcoiASxGof0f2RFI2Sw\"}",
        _0x37632e = {
            "appId": "55276",
            "fn": "apTaskDrawAward",
            "body": _0x41981c,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x41981c = await _0x278c5d.getbody(_0x37632e);
    if (!_0x41981c) return;
    return new Promise(_0x344c23 => {
        $.post(_0xc06bda(_0x41981c, "apTaskDrawAward"), async (_0x48a4bc, _0xdf26bf, _0x19c93a) => {
            try {
                _0x48a4bc ? (console.log("" + JSON.stringify(_0x48a4bc)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x19c93a = JSON.parse(_0x19c93a), $.log("领取奖励"));
            } catch (_0x5ca022) {
                $.logErr(_0x5ca022, _0xdf26bf);
            } finally {
                _0x344c23(_0x19c93a);
            }
        });
    });
}

function _0xc06bda(_0x1c8b2d, _0x2c6745) {
    return {
        "url": "https://api.m.jd.com/" + (_0x2c6745 ? "?functionId=" + _0x2c6745 : ""),
        "body": _0x1c8b2d,
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/",
            "Cookie": _0x540915
        }
    };
}

function _0xab9a8(_0x1af0e0) {
    _0x1af0e0 = _0x1af0e0 || 32;
    let _0x3a71fe = "abcdef0123456789",
        _0x467301 = _0x3a71fe.length,
        _0x2ac241 = "";

    for (i = 0; i < _0x1af0e0; i++) _0x2ac241 += _0x3a71fe.charAt(Math.floor(Math.random() * _0x467301));

    return _0x2ac241;
}

function _0x34a834(_0x9cdc71) {
    if (typeof _0x9cdc71 == "string") {
        try {
            return JSON.parse(_0x9cdc71);
        } catch (_0x588437) {
            return console.log(_0x588437), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }