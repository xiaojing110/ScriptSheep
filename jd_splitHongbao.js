
/*
任务+抽奖
16 5,16 * * * jd_splitHongbao.js
 */

const $ = new Env('年终奖补贴-加密');


const _0x42ec81 = $.isNode() ? require('./sendNotify') : '';
const _0x43cd12 = $.isNode() ? require('./jdCookie.js') : '';

let _0x1ffa77 = true;
let _0x29a1c5 = [],
    _0x264ead = '',
    _0x3851e1 = '';

if ($.isNode()) {
    Object.keys(_0x43cd12).forEach(_0x23ca70 => {
        _0x29a1c5.push(_0x43cd12[_0x23ca70]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    _0x29a1c5 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x1a1fc8($.getdata('CookiesJD') || '[]').map(_0x3ccd0a => _0x3ccd0a.cookie)].filter(_0x189114 => !!_0x189114);
}

!(async () => {
    if (!_0x29a1c5[0x0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }

    for (let _0x581fe5 = 0x0; _0x581fe5 < _0x29a1c5.length; _0x581fe5++) {
        if (_0x29a1c5[_0x581fe5]) {
            _0x264ead = _0x29a1c5[_0x581fe5];
            $.UserName = decodeURIComponent(_0x264ead.match(/pt_pin=([^; ]+)(?=;?)/) && _0x264ead.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
            $.index = _0x581fe5 + 0x1;
            $.isLogin = true;
            $.nickName = '';
            $.UA = require('./USER_AGENTS').UARAM();
            await _0x2b55f2();
            console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                });

                if ($.isNode()) {
                    await _0x42ec81.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
                }

                continue;
            }

            await _0x4b75a6();
            await $.wait(0x1f4);

            for (let _0x289562 of $.tasklist) {
                if (_0x289562.status == 0x1) {
                    let _0x2658bd = _0x289562.shoppingActivityVos;

                    let _0x11b235 = _0x289562.maxTimes - _0x289562.times;

                    console.log('去做 ' + _0x289562.taskName);

                    for (let _0x3846d8 of _0x2658bd) {
                        if (_0x11b235 === 0x0) break;
                        await _0x1c2f2d(_0x3846d8.taskToken, _0x289562.taskId, _0x3846d8.itemId, '1');
                        await $.wait(_0x289562.waitDuration * 0x3e8);
                        await _0x1c2f2d(_0x3846d8.taskToken, _0x289562.taskId, _0x3846d8.itemId, '0');
                        _0x11b235--;
                    }

                    await $.wait(0x3e8);
                }
            }

            await _0x4b75a6();
            await $.wait(0x1f4);
            console.log('领取奖励...');

            for (let _0x3f3d4e of $.tasklist) {
                if (_0x3f3d4e.status === 0x3) {
                    await _0x378a28(_0x3f3d4e.taskId);
                    await $.wait(0x3e8);
                }
            }

            await $.wait(0x7d0);
        }
    }
})().catch(_0x5497dd => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5497dd + '!', '');
}).finally(() => {
    $.done();
});

async function _0x4b75a6() {
    return new Promise(async _0x471b9a => {
        $.post(_0x3ce822('splitHongbao_getHomeData', {
            'appId': '1EFVXyw',
            'taskToken': ''
        }), async (_0x54a3da, _0x55afc1, _0x57c8cf) => {
            try {
                if (_0x54a3da) {
                    console.log('' + JSON.stringify(_0x54a3da));
                    console.log(' API请求失败，请检查网路重试');
                } else {
                    _0x57c8cf = JSON.parse(_0x57c8cf);

                    if (_0x57c8cf.code == 0x0) {
                        $.tasklist = _0x57c8cf.data.result.taskVos;
                    } else {
                        console.log(_0x57c8cf.msg);
                    }
                }
            } catch (_0xd363a0) {
                $.logErr(_0xd363a0, _0x55afc1);
            } finally {
                _0x471b9a(_0x57c8cf);
            }
        });
    });
}

async function _0x1c2f2d(_0x3634e0, _0x21f48f, _0x3e8f60, _0x2ad797) {
    return new Promise(async _0xcd85b4 => {
        $.post(_0x3ce822('harmony_collectScore', {
            'appId': '1EFVXyw',
            'taskToken': _0x3634e0,
            'taskId': _0x21f48f,
            'itemId': _0x3e8f60,
            'actionType': _0x2ad797
        }), async (_0x1d50e7, _0x269092, _0x1012e4) => {
            try {
                if (_0x1d50e7) {
                    console.log('' + JSON.stringify(_0x1d50e7));
                    console.log(' API请求失败，请检查网路重试');
                } else {
                    _0x1012e4 = JSON.parse(_0x1012e4);

                    if (_0x1012e4.code == 0x0) {
                        _0x2ad797 == 0x0 && console.log(_0x1012e4.data.bizMsg);
                    } else {
                        console.log(_0x1012e4.msg);
                    }
                }
            } catch (_0x18cc93) {
                $.logErr(_0x18cc93, _0x269092);
            } finally {
                _0xcd85b4(_0x1012e4);
            }
        });
    });
}

async function _0x378a28(_0x47d993) {
    return new Promise(async _0x13e962 => {
        $.post(_0x3ce822('splitHongbao_getLotteryResult', {
            'appId': '1EFVXyw',
            'taskId': _0x47d993
        }), async (_0xb60c1a, _0x4fe82e, _0x367c24) => {
            {
                try {
                    if (_0xb60c1a) {
                        console.log('' + JSON.stringify(_0xb60c1a));
                        console.log(' API请求失败，请检查网路重试');
                    } else {
                        _0x367c24 = JSON.parse(_0x367c24);

                        if (_0x367c24.code == 0x0) {
                            if (_0x367c24.data.result.userAwardsCacheDto) {
                                console.log(_0x367c24.data.result.userAwardsCacheDto.jBeanAwardVo ? _0x367c24.data.result.userAwardsCacheDto.jBeanAwardVo.prizeDesc : _0x367c24.data.result.userAwardsCacheDto.redpacketVo.value + '红包');
                            }
                        } else {
                            console.log(_0x367c24.msg);
                        }
                    }
                } catch (_0x27251b) {
                    $.logErr(_0x27251b, _0x4fe82e);
                } finally {
                    _0x13e962(_0x367c24);
                }
            }
        });
    });
}

function _0x3ce822(_0x5c9c92, _0x42ad03) {
    return {
        'url': 'https://api.m.jd.com/client.action',
        'body': 'functionId=' + _0x5c9c92 + '&appid=&area=&body=' + JSON.stringify(_0x42ad03) + '&client=wh5&clientVersion=1.0.0',
        'headers': {
            'Origin': 'https://h5.m.jd.com',
            'Referer': 'https://h5.m.jd.com/',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': $.UA,
            'Cookie': _0x264ead
        }
    };
}

function _0x2b55f2() {
    return new Promise(_0x5478ba => {
        {
            const _0x4f301d = {
                'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
                'headers': {
                    'Cookie': _0x264ead,
                    'referer': 'https://h5.m.jd.com/',
                    'User-Agent': $.UA
                },
                'timeout': 0x2710
            };
            $.get(_0x4f301d, (_0x158fb3, _0x46d485, _0x181cc2) => {
                {
                    try {
                        if (_0x181cc2) {
                            _0x181cc2 = JSON.parse(_0x181cc2);

                            if (_0x181cc2.islogin === '1') { } else if (_0x181cc2.islogin === '0') {
                                $.isLogin = false;
                            }
                        }
                    } catch (_0x4c9589) {
                        console.log(_0x4c9589);
                    } finally {
                        _0x5478ba();
                    }
                }
            });
        }
    });
}

function _0x1da022() {
    return new Promise(_0x3560d8 => {
        if (!_0x1ffa77) {
            $.msg($.name, '', '' + _0x3851e1);
        } else {
            $.log('京东账号' + $.index + $.nickName + '\n' + _0x3851e1);
        }

        _0x3560d8();
    });
}

function _0x47787b(_0x263bbc) {
    try {
        if (typeof JSON.parse(_0x263bbc) == 'object') {
            return true;
        }
    } catch (_0x59a465) {
        console.log(_0x59a465);
        console.log('京东服务器访问数据为空，请检查自身设备网络情况');
        return false;
    }
}

function _0x1a1fc8(_0x59c595) {
    if (typeof _0x59c595 == 'string') {
        try {
            return JSON.parse(_0x59c595);
        } catch (_0x23fb70) {
            console.log(_0x23fb70);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
            return [];
        }
    }
}



// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }