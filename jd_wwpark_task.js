/*
13 13 * * * jd_wwpark_task.js
*/
const $ = new Env('汪汪乐园任务');
const _0x5040ba = $.isNode() ? require("./jdCookie.js") : "",
    _0x481e41 = $.isNode() ? require("./sendNotify") : "",
    _0x2c8b29 = require("./function/dylany"),
    _0x528dc7 = require("./USER_AGENTS");

let _0x206cc2 = [],
    _0x5f3404 = "";

if ($.isNode()) {
    Object.keys(_0x5040ba).forEach(_0x189765 => {
        _0x206cc2.push(_0x5040ba[_0x189765]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x206cc2 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x40c72a($.getdata("CookiesJD") || "[]").map(_0x5e36e7 => _0x5e36e7.cookie)].filter(_0x3d22d1 => !!_0x3d22d1);

$.invitePinTaskList = [];
$.invitePin = [];
message = "";
!(async () => {
    if (!_0x206cc2[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let _0x527f90 = 0; _0x527f90 < _0x206cc2.length; _0x527f90++) {
        _0x5f3404 = _0x206cc2[_0x527f90];

        if (_0x5f3404) {
            $.UserName = decodeURIComponent(_0x5f3404.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5f3404.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x527f90 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            $.UA = _0x528dc7.UARAM ? _0x528dc7.UARAM() : _0x528dc7.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x481e41.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x41374f();
            await _0x32bc7a();

            for (const _0x3effcf of $.taskList) {
                if (_0x3effcf.taskFinished && !_0x3effcf.canDrawAwardNum) continue;
                _0x3effcf.taskType === "SIGN" && ($.log("" + _0x3effcf.taskTitle), await _0x53961b(_0x3effcf.id, _0x3effcf.taskType, undefined), $.log(_0x3effcf.taskTitle + " 领取奖励"), await _0x3d7da6(_0x3effcf.id, _0x3effcf.taskType));

                if (_0x3effcf.taskType === "BROWSE_PRODUCT" || _0x3effcf.taskType === "BROWSE_CHANNEL" && _0x3effcf.taskLimitTimes !== 1) {
                    let _0x513eab = await _0x228946(_0x3effcf.id, _0x3effcf.taskType),
                        _0x3e2d81 = 0;

                    if (_0x513eab.length === 0) {
                        let _0x4cdbd4 = await _0x3d7da6(_0x3effcf.id, _0x3effcf.taskType);

                        !_0x4cdbd4.success && ($.log(_0x3effcf.taskTitle + "|" + _0x3effcf.taskShowTitle + " 领取完成!"), _0x513eab = await _0x228946(_0x3effcf.id, _0x3effcf.taskType));
                    }

                    while (_0x3effcf.taskLimitTimes - _0x3effcf.taskDoTimes > 0) {
                        if (_0x513eab.length === 0) {
                            $.log(_0x3effcf.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(_0x3effcf.taskTitle + " " + _0x3effcf.taskDoTimes + "/" + _0x3effcf.taskLimitTimes);

                        let _0x32beb5 = await _0x53961b(_0x3effcf.id, _0x3effcf.taskType, _0x513eab[Math.floor(Math.random() * _0x513eab.length)].itemId);

                        await $.wait(1000);
                        _0x32beb5.code === 2005 || _0x32beb5.code === 0 ? $.log(_0x3effcf.taskTitle + "|" + _0x3effcf.taskShowTitle + " 任务完成！") : $.log(_0x32beb5.echo + " 任务失败！");
                        _0x3effcf.taskDoTimes++;

                        if (!_0x513eab[_0x3e2d81]) {
                            break;
                        }
                    }

                    for (let _0x579549 = 0; _0x579549 < _0x3effcf.taskLimitTimes; _0x579549++) {
                        let _0x5ddc8a = await _0x3d7da6(_0x3effcf.id, _0x3effcf.taskType);

                        if (!_0x5ddc8a.success) {
                            $.log(_0x3effcf.taskTitle + "|" + _0x3effcf.taskShowTitle + " 领取完成!");
                            break;
                        }

                        await $.wait(1000);
                    }
                } else {
                    if (_0x3effcf.taskType === "SHARE_INVITE") {
                        $.yq_taskid = _0x3effcf.id;

                        for (let _0x2eff01 = 0; _0x2eff01 < _0x3effcf.canDrawAwardNum; _0x2eff01++) {
                            let _0x173607 = await _0x3d7da6($.yq_taskid, "SHARE_INVITE");

                            if (!_0x173607.success) {
                                break;
                            }

                            await $.wait(1000);
                            $.log("助力奖励领取成功！");
                        }
                    }
                }

                _0x3effcf.taskType === "BROWSE_CHANNEL" && _0x3effcf.taskLimitTimes === 1 && ($.log(_0x3effcf.taskTitle + "|" + _0x3effcf.taskShowTitle), await _0x53961b(_0x3effcf.id, _0x3effcf.taskType, _0x3effcf.taskSourceUrl), $.log(_0x3effcf.taskTitle + "|" + _0x3effcf.taskShowTitle + " 领取奖励"), await _0x3d7da6(_0x3effcf.id, _0x3effcf.taskType));
                await $.wait(1000);
            }
        }
    }
})().catch(_0x4bb82c => $.logErr(_0x4bb82c)).finally(() => $.done());

async function _0x41374f(_0x6b3468 = {
    "taskId": "",
    "inviteType": "",
    "inviterPin": "",
    "linkId": "jBNXcoiASxGof0f2RFI2Sw"
}) {
    let _0x45f20a = {
        "appId": "4abce",
        "fn": "joyBaseInfo",
        "body": _0x6b3468,
        "apid": "activities_platform",
        "ver": "3.8.20",
        "cl": "ios",
        "user": $.UserName,
        "code": 0,
        "ua": $.UA
    };
    return _0x6b3468 = await _0x2c8b29.getbody(_0x45f20a), new Promise(async _0x244142 => {
        let _0x58ed19 = _0x49c497(_0x6b3468, "joyBaseInfo", "4abce");

        $.post(_0x58ed19, async (_0x11aad7, _0x5a3b81, _0x3856ca) => {
            try {
                if (_0x11aad7) console.log("" + JSON.stringify(_0x11aad7)), console.log("getJoyBaseInfo API请求失败，请检查网路重试"); else {
                    _0x3856ca = JSON.parse(_0x3856ca);

                    if (_0x3856ca.success) {
                        $.invitePin.push(_0x3856ca.data.invitePin);
                    } else $.log(_0x3856ca.errMsg);
                }
            } catch (_0x1b707f) {
                $.logErr(_0x1b707f, _0x5a3b81);
            } finally {
                _0x244142(_0x3856ca);
            }
        });
    });
}

function _0x32bc7a() {
    return new Promise(_0x4d04db => {
        $.post(_0x49c497("body=%7B%22linkId%22%3A%22jBNXcoiASxGof0f2RFI2Sw%22%7D&appid=activities_platform", "apTaskList"), async (_0x3e6fc3, _0x1ca6c2, _0x1a8caa) => {
            $.log("=== 任务列表 start ===");

            try {
                if (_0x3e6fc3) console.log("" + JSON.stringify(_0x3e6fc3)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    _0x1a8caa = JSON.parse(_0x1a8caa);
                    $.taskList = _0x1a8caa.data;

                    for (const _0x49a573 of $.taskList) {
                        $.log(_0x49a573.taskTitle + " " + _0x49a573.taskDoTimes + "/" + _0x49a573.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (_0x1c55ee) {
                $.logErr(_0x1c55ee, _0x1ca6c2);
            } finally {
                _0x4d04db(_0x1a8caa);
            }
        });
    });
}

async function _0x53961b(_0x41de43, _0x2b237a, _0x24c7d1 = "", _0x1d3061 = "activities_platform") {
    let _0x15826f = "{\"taskType\":\"" + _0x2b237a + "\",\"taskId\":" + _0x41de43 + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\",\"itemId\":\"" + _0x24c7d1 + "\"}",
        _0x4fbc0e = {
            "appId": "cd949",
            "fn": "apDoTask",
            "body": _0x15826f,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x15826f = await _0x2c8b29.getbody(_0x4fbc0e);
    if (!_0x15826f) return;
    return new Promise(_0x34d83b => {
        $.post(_0x49c497(_0x15826f, "apDoTask"), async (_0x3728d0, _0x1fb98d, _0x563b0d) => {
            try {
                _0x3728d0 ? (console.log("" + JSON.stringify(_0x3728d0)), console.log($.name + " API请求失败，请检查网路重试")) : _0x563b0d = JSON.parse(_0x563b0d);
            } catch (_0x4f69e3) {
                $.logErr(_0x4f69e3, _0x1fb98d);
            } finally {
                _0x34d83b(_0x563b0d);
            }
        });
    });
}

function _0x33ec9c(_0x5f028f, _0x392894, _0x54b541, _0x14d6b4 = "activities_platform") {
    return new Promise(_0x166b64 => {
        $.post(_0x49c497("body={\"taskType\":\"" + _0x392894 + "\",\"taskId\":" + _0x5f028f + ",\"itemId\":\"" + encodeURIComponent(_0x54b541) + "\",\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=" + _0x14d6b4, "apDoTask"), async (_0x18344c, _0x32a2fa, _0x59f095) => {
            try {
                _0x18344c ? (console.log("" + JSON.stringify(_0x18344c)), console.log($.name + " API请求失败，请检查网路重试")) : _0x59f095 = JSON.parse(_0x59f095);
            } catch (_0x3ed1f1) {
                $.logErr(_0x3ed1f1, _0x32a2fa);
            } finally {
                _0x166b64(_0x59f095);
            }
        });
    });
}

function _0x228946(_0x5779fa, _0x2f1e9e) {
    return new Promise(_0x5253d9 => {
        $.post(_0x49c497("functionId=apTaskDetail&body={\"taskType\":\"" + _0x2f1e9e + "\",\"taskId\":" + _0x5779fa + ",\"channel\":4,\"linkId\":\"jBNXcoiASxGof0f2RFI2Sw\"}&appid=activities_platform", "apTaskDetail"), async (_0xca0661, _0x154b5f, _0x5eb5b0) => {
            try {
                _0xca0661 ? (console.log("" + JSON.stringify(_0xca0661)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x5eb5b0 = JSON.parse(_0x5eb5b0), !_0x5eb5b0.success ? $.taskDetailList = [] : $.taskDetailList = _0x5eb5b0.data.taskItemList);
            } catch (_0x399be4) {
                $.logErr(_0x399be4, _0x154b5f);
            } finally {
                if (!_0x5eb5b0.success) {
                    _0x5253d9([]);
                } else _0x5253d9(_0x5eb5b0.data.taskItemList);
            }
        });
    });
}

async function _0x3d7da6(_0x4030a2, _0x5a0240) {
    let _0x5aafce = "{ \"taskType\": \"" + _0x5a0240 + "\", \"taskId\": " + _0x4030a2 + ",\"linkId\": \"jBNXcoiASxGof0f2RFI2Sw\"}",
        _0x556e58 = {
            "appId": "55276",
            "fn": "apTaskDrawAward",
            "body": _0x5aafce,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x5aafce = await _0x2c8b29.getbody(_0x556e58);
    if (!_0x5aafce) return;
    return new Promise(_0x14c90a => {
        $.post(_0x49c497(_0x5aafce, "apTaskDrawAward"), async (_0x512c63, _0x3f9545, _0x3958a3) => {
            try {
                _0x512c63 ? (console.log("" + JSON.stringify(_0x512c63)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x3958a3 = JSON.parse(_0x3958a3), $.log("领取奖励"));
            } catch (_0x51b76b) {
                $.logErr(_0x51b76b, _0x3f9545);
            } finally {
                _0x14c90a(_0x3958a3);
            }
        });
    });
}

function _0x49c497(_0x3f1cb0, _0x228894) {
    return {
        "url": "https://api.m.jd.com/" + (_0x228894 ? "?functionId=" + _0x228894 : ""),
        "body": _0x3f1cb0,
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/",
            "Cookie": _0x5f3404
        }
    };
}

function _0x20c00a(_0x2806d0) {
    _0x2806d0 = _0x2806d0 || 32;
    let _0x37b51f = "abcdef0123456789",
        _0x3c11c8 = _0x37b51f.length,
        _0x1dd84b = "";

    for (i = 0; i < _0x2806d0; i++) _0x1dd84b += _0x37b51f.charAt(Math.floor(Math.random() * _0x3c11c8));

    return _0x1dd84b;
}

function _0x40c72a(_0x33a0ac) {
    if (typeof _0x33a0ac == "string") {
        try {
            return JSON.parse(_0x33a0ac);
        } catch (_0x5de403) {
            return console.log(_0x5de403), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
        }
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }