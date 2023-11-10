/*
38 8 * * * jd_joypark_task.js
updatetime:2023/9/24
*/
const $ = new Env('汪汪庄园任务');
const _0x5f162d = $.isNode() ? require("./jdCookie.js") : "",
    _0x5ced98 = $.isNode() ? require("./sendNotify") : "",
    _0x3a8458 = require("./function/dylany"),
    _0x524f09 = require("./USER_AGENTS");

let _0x116be7 = [],
    _0x4a07e6 = "";

if ($.isNode()) {
    Object.keys(_0x5f162d).forEach(_0xcfc076 => {
        _0x116be7.push(_0x5f162d[_0xcfc076]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => { };
} else _0x116be7 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x48e1bf($.getdata("CookiesJD") || "[]").map(_0x577097 => _0x577097.cookie)].filter(_0x3889fa => !!_0x3889fa);

$.invitePinTaskList = [];
$.invitePin = [];
message = "";
!(async () => {
    if (!_0x116be7[0]) {
        $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
            "open-url": "https://bean.m.jd.com/"
        });
        return;
    }

    for (let _0x30aaa4 = 0; _0x30aaa4 < _0x116be7.length; _0x30aaa4++) {
        _0x4a07e6 = _0x116be7[_0x30aaa4];

        if (_0x4a07e6) {
            $.UserName = decodeURIComponent(_0x4a07e6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4a07e6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
            $.index = _0x30aaa4 + 1;
            $.isLogin = true;
            $.nickName = "";
            $.openIndex = 0;
            $.UA = _0x524f09.UARAM ? _0x524f09.UARAM() : _0x524f09.USER_AGENT;
            console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

            if (!$.isLogin) {
                $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
                    "open-url": "https://bean.m.jd.com/bean/signIndex.action"
                });
                $.isNode() && (await _0x5ced98.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
                continue;
            }

            await _0x10c48b();
            await _0x3eca89();

            for (const _0x46be40 of $.taskList) {
                if (_0x46be40.taskFinished && !_0x46be40.canDrawAwardNum) continue;

                if (_0x46be40.taskType === "SIGN") {
                    $.log("" + _0x46be40.taskTitle);
                    await _0xb1f53a(_0x46be40.id, _0x46be40.taskType, undefined);
                    $.log(_0x46be40.taskTitle + " 领取奖励");
                    await _0xe3552b(_0x46be40.id, _0x46be40.taskType);
                }

                if (_0x46be40.taskType === "BROWSE_PRODUCT" || _0x46be40.taskType === "BROWSE_CHANNEL" && _0x46be40.taskLimitTimes !== 1) {
                    let _0x3eff15 = await _0x5ddf24(_0x46be40.id, _0x46be40.taskType),
                        _0x26013d = 0;

                    if (_0x3eff15.length === 0) {
                        let _0x5a5d96 = await _0xe3552b(_0x46be40.id, _0x46be40.taskType);

                        !_0x5a5d96.success && ($.log(_0x46be40.taskTitle + "|" + _0x46be40.taskShowTitle + " 领取完成!"), _0x3eff15 = await _0x5ddf24(_0x46be40.id, _0x46be40.taskType));
                    }

                    while (_0x46be40.taskLimitTimes - _0x46be40.taskDoTimes > 0) {
                        if (_0x3eff15.length === 0) {
                            $.log(_0x46be40.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
                            break;
                        }

                        $.log(_0x46be40.taskTitle + " " + _0x46be40.taskDoTimes + "/" + _0x46be40.taskLimitTimes);

                        let _0x540f67 = await _0xb1f53a(_0x46be40.id, _0x46be40.taskType, _0x3eff15[Math.floor(Math.random() * _0x3eff15.length)].itemId);

                        await $.wait(1000);
                        _0x540f67.code === 2005 || _0x540f67.code === 0 ? $.log(_0x46be40.taskTitle + "|" + _0x46be40.taskShowTitle + " 任务完成！") : $.log(_0x540f67.echo + " 任务失败！");
                        _0x46be40.taskDoTimes++;
                        if (!_0x3eff15[_0x26013d]) break;
                    }

                    for (let _0x59a861 = 0; _0x59a861 < _0x46be40.taskLimitTimes; _0x59a861++) {
                        let _0x32a76f = await _0xe3552b(_0x46be40.id, _0x46be40.taskType);

                        if (!_0x32a76f.success) {
                            $.log(_0x46be40.taskTitle + "|" + _0x46be40.taskShowTitle + " 领取完成!");
                            break;
                        }

                        await $.wait(1000);
                    }
                } else {
                    if (_0x46be40.taskType === "SHARE_INVITE") {
                        $.yq_taskid = _0x46be40.id;

                        for (let _0x146895 = 0; _0x146895 < _0x46be40.canDrawAwardNum; _0x146895++) {
                            let _0xb9fe24 = await _0xe3552b($.yq_taskid, "SHARE_INVITE");

                            if (!_0xb9fe24.success) break;
                            await $.wait(1000);
                            $.log("助力奖励领取成功！");
                        }
                    }
                }

                _0x46be40.taskType === "BROWSE_CHANNEL" && _0x46be40.taskLimitTimes === 1 && ($.log(_0x46be40.taskTitle + "|" + _0x46be40.taskShowTitle), await _0xb1f53a(_0x46be40.id, _0x46be40.taskType, _0x46be40.taskSourceUrl), $.log(_0x46be40.taskTitle + "|" + _0x46be40.taskShowTitle + " 领取奖励"), await _0xe3552b(_0x46be40.id, _0x46be40.taskType));
                await $.wait(1000);
            }
        }
    }

    $.log("\n======开始内部互助======\n");
    $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
    let _0x562f34 = 0;

    for (const _0x5743b7 of $.newinvitePinTaskList) {
        $.suc = 0;
        $.log("\n去助力 " + _0x5743b7);

        for (let _0x3007aa = _0x562f34; _0x3007aa < _0x116be7.length; _0x3007aa++) {
            _0x4a07e6 = _0x116be7[_0x3007aa];

            if (_0x4a07e6) {
                $.UserName = decodeURIComponent(_0x4a07e6.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4a07e6.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x3007aa + 1;
                $.isLogin = true;
                $.nickName = "";
                $.UA = _0x524f09.UARAM ? _0x524f09.UARAM() : _0x524f09.USER_AGENT;
                console.log("\n******开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

                let _0xd7f4aa = await _0x10c48b({
                    "taskId": $.yq_taskid,
                    "inviteType": "1",
                    "inviterPin": _0x5743b7,
                    "linkId": "99DZNpaCTAv8f4TuKXr0Ew"
                });

                if (_0xd7f4aa.success) {
                    if (_0xd7f4aa.data.helpState === 1) {
                        $.log("助力成功 " + ++$.suc);

                        if ($.suc == 5) {
                            _0x562f34 = _0x3007aa + 1;
                            break;
                        }
                    } else {
                        if (_0xd7f4aa.data.helpState === 0) $.log("不能助力自己！"); else {
                            if (_0xd7f4aa.data.helpState === 2) {
                                $.log("已助力过TA！");
                                break;
                            } else {
                                if (_0xd7f4aa.data.helpState === 3) {
                                    $.log("没有助力次数了！");
                                    break;
                                } else {
                                    if (_0xd7f4aa.data.helpState === 4) {
                                        $.log("对方助力已满！");
                                        break;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    $.log("数据异常 助力失败！\n\n");
                    break;
                }

                await $.wait(2000);
            }
        }

        if ($.index === _0x116be7.length) {
            console.log("\n没有可用于助力的ck，跳出！");
            break;
        }
    }
})().catch(_0x281c39 => $.logErr(_0x281c39)).finally(() => $.done());

async function _0x10c48b(_0xd0d6d3 = {
    "taskId": "",
    "inviteType": "",
    "inviterPin": "",
    "linkId": "99DZNpaCTAv8f4TuKXr0Ew"
}) {
    let _0x64cb74 = {
        "appId": "4abce",
        "fn": "joyBaseInfo",
        "body": _0xd0d6d3,
        "apid": "activities_platform",
        "ver": "3.8.20",
        "cl": "ios",
        "user": $.UserName,
        "code": 0,
        "ua": $.UA
    };
    return _0xd0d6d3 = await _0x3a8458.getbody(_0x64cb74), new Promise(async _0x5419f3 => {
        let _0x1b6f3c = _0x28f5a3(_0xd0d6d3, "joyBaseInfo", "4abce");

        $.post(_0x1b6f3c, async (_0x73b6c5, _0x5eb39a, _0x5300d6) => {
            try {
                if (_0x73b6c5) {
                    console.log("" + JSON.stringify(_0x73b6c5));
                    console.log("getJoyBaseInfo API请求失败，请检查网路重试");
                } else _0x5300d6 = JSON.parse(_0x5300d6), _0x5300d6.success ? $.invitePin.push(_0x5300d6.data.invitePin) : $.log(_0x5300d6.errMsg);
            } catch (_0x1c06f9) {
                $.logErr(_0x1c06f9, _0x5eb39a);
            } finally {
                _0x5419f3(_0x5300d6);
            }
        });
    });
}

function _0x3eca89() {
    return new Promise(_0x65bc82 => {
        $.post(_0x28f5a3("body=%7B%22linkId%22%3A%2299DZNpaCTAv8f4TuKXr0Ew%22%7D&appid=activities_platform", "apTaskList"), async (_0x48c0b8, _0x46b244, _0x12c6f9) => {
            $.log("=== 任务列表 start ===");

            try {
                if (_0x48c0b8) console.log("" + JSON.stringify(_0x48c0b8)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    _0x12c6f9 = JSON.parse(_0x12c6f9);
                    $.taskList = _0x12c6f9.data;

                    for (const _0x3df18b of $.taskList) {
                        $.log(_0x3df18b.taskTitle + " " + _0x3df18b.taskDoTimes + "/" + _0x3df18b.taskLimitTimes);
                    }

                    $.log("=== 任务列表 end  ===");
                }
            } catch (_0x2f472e) {
                $.logErr(_0x2f472e, _0x46b244);
            } finally {
                _0x65bc82(_0x12c6f9);
            }
        });
    });
}

async function _0xb1f53a(_0x3adc64, _0x2b989e, _0x7460c = "", _0x2f0719 = "activities_platform") {
    let _0x2cda3e = "{\"taskType\":\"" + _0x2b989e + "\",\"taskId\":" + _0x3adc64 + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"taskInsert\":true,\"itemId\":\"" + _0x7460c + "\"}",
        _0x8ddcc5 = {
            "appId": "cd949",
            "fn": "apDoTask",
            "body": _0x2cda3e,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x2cda3e = await _0x3a8458.getbody(_0x8ddcc5);
    if (!_0x2cda3e) return;
    return new Promise(_0x3114a1 => {
        $.post(_0x28f5a3(_0x2cda3e, "apDoTask"), async (_0x5a8d0a, _0x3d36c6, _0x8e82de) => {
            try {
                if (_0x5a8d0a) {
                    console.log("" + JSON.stringify(_0x5a8d0a));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else _0x8e82de = JSON.parse(_0x8e82de);
            } catch (_0x9a5297) {
                $.logErr(_0x9a5297, _0x3d36c6);
            } finally {
                _0x3114a1(_0x8e82de);
            }
        });
    });
}

function _0x9e3a87(_0x574746, _0x1c6ba7, _0x555af8, _0x26d05a = "activities_platform") {
    return new Promise(_0x2f6d1a => {
        $.post(_0x28f5a3("body={\"taskType\":\"" + _0x1c6ba7 + "\",\"taskId\":" + _0x574746 + ",\"itemId\":\"" + encodeURIComponent(_0x555af8) + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=" + _0x26d05a, "apDoTask"), async (_0x5490ac, _0x226585, _0x1a202c) => {
            try {
                if (_0x5490ac) {
                    console.log("" + JSON.stringify(_0x5490ac));
                    console.log($.name + " API请求失败，请检查网路重试");
                } else _0x1a202c = JSON.parse(_0x1a202c);
            } catch (_0x31b333) {
                $.logErr(_0x31b333, _0x226585);
            } finally {
                _0x2f6d1a(_0x1a202c);
            }
        });
    });
}

function _0x5ddf24(_0xd0778d, _0x2d7be0) {
    return new Promise(_0xc2f270 => {
        $.post(_0x28f5a3("functionId=apTaskDetail&body={\"taskType\":\"" + _0x2d7be0 + "\",\"taskId\":" + _0xd0778d + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=activities_platform", "apTaskDetail"), async (_0x34415b, _0x292aa6, _0x3e6cc5) => {
            try {
                _0x34415b ? (console.log("" + JSON.stringify(_0x34415b)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x3e6cc5 = JSON.parse(_0x3e6cc5), !_0x3e6cc5.success ? $.taskDetailList = [] : $.taskDetailList = _0x3e6cc5.data.taskItemList);
            } catch (_0x5b20d1) {
                $.logErr(_0x5b20d1, _0x292aa6);
            } finally {
                !_0x3e6cc5.success ? _0xc2f270([]) : _0xc2f270(_0x3e6cc5.data.taskItemList);
            }
        });
    });
}

async function _0xe3552b(_0x2a0f20, _0x21c9a5) {
    let _0x2032c2 = "{ \"taskType\": \"" + _0x21c9a5 + "\", \"taskId\": " + _0x2a0f20 + ",\"linkId\": \"99DZNpaCTAv8f4TuKXr0Ew\"}",
        _0x2d6072 = {
            "appId": "55276",
            "fn": "apTaskDrawAward",
            "body": _0x2032c2,
            "apid": "activities_platform",
            "ver": $.UA.split(";")[2],
            "cl": "ios",
            "user": $.UserName,
            "code": 1,
            "xcr": 1,
            "ua": $.UA
        };

    _0x2032c2 = await _0x3a8458.getbody(_0x2d6072);
    if (!_0x2032c2) return;
    return new Promise(_0x3da8ea => {
        $.post(_0x28f5a3(_0x2032c2, "apTaskDrawAward"), async (_0x333660, _0x4d0089, _0x55fc7b) => {
            try {
                _0x333660 ? (console.log("" + JSON.stringify(_0x333660)), console.log($.name + " API请求失败，请检查网路重试")) : (_0x55fc7b = JSON.parse(_0x55fc7b), $.log("领取奖励"));
            } catch (_0x17d025) {
                $.logErr(_0x17d025, _0x4d0089);
            } finally {
                _0x3da8ea(_0x55fc7b);
            }
        });
    });
}

function _0x28f5a3(_0x264b08, _0x76e0a7) {
    return {
        "url": "https://api.m.jd.com/" + (_0x76e0a7 ? "?functionId=" + _0x76e0a7 : ""),
        "body": _0x264b08,
        "headers": {
            "User-Agent": $.UA,
            "Content-Type": "application/x-www-form-urlencoded",
            "Host": "api.m.jd.com",
            "Origin": "https://joypark.jd.com",
            "Referer": "https://joypark.jd.com/",
            "Cookie": _0x4a07e6
        }
    };
}

function _0x487788(_0x1d6ab9) {
    _0x1d6ab9 = _0x1d6ab9 || 32;
    let _0x14a1ac = "abcdef0123456789",
        _0x328404 = _0x14a1ac.length,
        _0x18b062 = "";

    for (i = 0; i < _0x1d6ab9; i++) _0x18b062 += _0x14a1ac.charAt(Math.floor(Math.random() * _0x328404));

    return _0x18b062;
}

function _0x48e1bf(_0xfa79da) {
    if (typeof _0xfa79da == "string") try {
        return JSON.parse(_0xfa79da);
    } catch (_0x6a47fe) {
        return console.log(_0x6a47fe), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }