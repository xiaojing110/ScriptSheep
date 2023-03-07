/*
1或5豆，黑子擦肩
定时随机
 */

const $ = new Env('每日抽豆');
const _0x4a4804 = $.isNode() ? require('./sendNotify') : '';

const _0x160a2c = $.isNode() ? require('./jdCookie.js') : '',
    _0x38f5ff = require('./function/dylanx.js');

let _0x51c444 = true,
    _0x1e7b26 = [],
    _0x318c8d = '',
    _0x59d2c5 = '';

if ($.isNode()) {
    Object.keys(_0x160a2c).forEach(_0x316a23 => {
        _0x1e7b26.push(_0x160a2c[_0x316a23]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x1e7b26 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x24cf3b($.getdata('CookiesJD') || '[]').map(_0x3dd433 => _0x3dd433.cookie)].filter(_0x37c9ef => !!_0x37c9ef);

!(async () => {
    if (!_0x1e7b26[0]) {
        const _0x1168e8 = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x1168e8);
        return;
    }

    for (let _0x4eb4da = 0; _0x4eb4da < _0x1e7b26.length; _0x4eb4da++) {
        if (_0x1e7b26[_0x4eb4da]) {
            _0x318c8d = _0x1e7b26[_0x4eb4da],  
            $.UserName = decodeURIComponent(_0x318c8d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x318c8d.match(/pt_pin=([^; ]+)(?=;?)/)[1]), 
            $.index = _0x4eb4da + 1, 
            $.isLogin = true, 
            $.nickName = '', 
            $.UA = require('./USER_AGENTS').UARAM(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x1b6256 = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x1b6256);
                $.isNode() && (await _0x4a4804.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            await _0xbe589b(), await $.wait(10000);
        }
    }
})().catch(_0x27f983 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x27f983 + '!', '');
}).finally(() => {
    $.done();
});

async function _0xbe589b() {
    let _0x49cbfd = await _0x38f5ff.getbody('babelGetLottery', {
        'authType': '2',
        'awardSource': '1',
        'enAwardK': 'ltvTJ/WYFPZcuWIWHCAjRw8Kj5BYs6onBzKt2n+YkqS7DDzXHNt5Br7i6hYH2826ssuKfHev2yv2\n8HWSugMPNJj0hO0oRf9K9vB1kroDDzT5uSUPG/Z35YJDHw8AyYmqk4Q1u2vSGKS/M+5ruJeepDDb\nGjIC3nIIbIE2I7/kWfG6LEOpCsfjzQD+tTlmq6znidq4bRZoUJ3MOg0BXga8nip79XSe0g5kHG/A\na2pjcqcS+Z0MdH5AoT28E84LptqHeCE6mkMJ/dL3sjRs44o9OuXOZklgdKme+XUAsi2or52idiaj\nejivdFQcDHA7HH3gaHvanKkkE8TU7ESujM2a18EuQglPvG63XuhsjEuTur7Q0q+RCbbzCUJO1qM0\nhM1uGj8RZGTjNPmgGqqkikOxgpl2et5AeQ0y_babel',
        'encryptAssignmentId': 'tb5nbUQ7kk45XoAexByamhEHeHy',
        'encryptProjectId': 'TmxyMFsNSsUTi1UoGoYd6WM2Bks',
        'lotteryCode': '1271763',
        'riskParam': {
            'childActivityUrl': 'https://pro.m.jd.com/mall/active/3kmVmayf36Kmoyfq9pLuCSYUfU9t/index.html',
            'eid': 'eidAb0c08120a9s2wAfbJfUpSVaxB2fAPy/uncAH3Ks4YEn709rDPzIBAWDAM7H3gQWi7HZUYBeIKw0xX/dxxbb6cw60joC04i+QyUA6CI6X4ZVJ92ts',
            'pageClickKey': 'Babel_WheelSurf',
            'shshshfpb': 'JD012145b9ETMmH52CGp167671986621806LEXlhis_kznPgZkkbOqCOAKhvofjw1l4wXoBR5ljtzqBw_ePKHm_GoSMk4me5sCXCGKwYfdaLGCnsLNntqPSFw0qsvqal~z0ely6IENsLJ6AV1yyd0tFMrPOQ9qR5nlTujXYmcrk_n2QKkYUnXxi_07RbvYEZOisYbuMfx2yZqLFicvY0lr3eeXyjv3-pcNXua1Mop9U6S139oDWmqdIcI-ibMU7OpLZLmhgMmdXjFB2_az3urXIQ'
        },
        'srv': '{"bord":"0","fno":"0-0-2","mid":"70764372","bi2":"2","bid":"0","aid":"01150161"}'
    });

    return new Promise(async _0x25b3dc => {
        $.post(_0x38fc7f(_0x49cbfd), async (_0x3af3db, _0x216ba3, _0x145171) => {
            try {
                _0x3af3db ? (console.log('' + JSON.stringify(_0x3af3db)), console.log(' API请求失败，请检查网路重试')) : (_0x145171 = JSON.parse(_0x145171), _0x145171.prizeName ? console.log(_0x145171.prizeName) : console.log(_0x145171.responseMessage));
            } catch (_0x37787a) {
                $.logErr(_0x37787a, _0x216ba3);
            } finally {
                _0x25b3dc(_0x145171);
            }
        });
    });
}

function _0x38fc7f(_0x5c431e) {
    const _0x12f88b = {
        'Host': 'api.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    _0x12f88b['User-Agent'] = $.UA, _0x12f88b.Cookie = _0x318c8d;
    const _0x4bf4ea = {
        'url': 'https://api.m.jd.com/client.action?functionId=babelGetLottery'
    };
    return _0x4bf4ea.body = _0x5c431e, _0x4bf4ea.headers = _0x12f88b, _0x4bf4ea;
}

function _0x5eeb4d() {
    return new Promise(_0x46c1a9 => {
        const _0x2a5ab8 = {
            'timeout': 0x2710,
            'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin'
        };
        _0x2a5ab8.headers = {}, _0x2a5ab8.headers.Cookie = _0x318c8d;
        _0x2a5ab8.headers.referer = 'https://h5.m.jd.com/', _0x2a5ab8.headers['User-Agent'] = $.UA;
        const _0x4d4093 = _0x2a5ab8;
        $.get(_0x4d4093, (_0x4d9be9, _0x35fbe5, _0x7704c8) => {
            try {
                if (_0x7704c8) {
                    _0x7704c8 = JSON.parse(_0x7704c8);

                    if (_0x7704c8.islogin === '1') { } else _0x7704c8.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x59c269) {
                console.log(_0x59c269);
            } finally {
                _0x46c1a9();
            }
        });
    });
}

function _0x435d30() {
    return new Promise(_0x186820 => {
        const _0x2c3a64 = {};
        _0x2c3a64['User-Agent'] = $.UA;
        const _0x1c32a5 = {
            'timeout': 0x2710,
            'url': 'https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1'
        };
        _0x1c32a5.headers = _0x2c3a64;
        const _0x48594c = _0x1c32a5;
        $.get(_0x48594c, (_0x54f7e6, _0x37f897, _0x51b3fc) => {
            try {
                _0x51b3fc && (_0x51b3fc = JSON.parse(_0x51b3fc), $.difftime = Date.now() - _0x51b3fc.timestamp);
            } catch (_0x23f409) {
                console.log(_0x23f409);
            } finally {
                _0x186820();
            }
        });
    });
}

function _0x112d65() {
    return new Promise(_0x2da148 => {
        $.log('京东账号' + $.index + $.nickName + '\n'), _0x2da148();
    });
}

function _0x3bf2e4(_0xc3faf1) {
    try {
        if (typeof JSON.parse(_0xc3faf1) == 'object') return true;
    } catch (_0x4c165d) {
        return console.log(_0x4c165d), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}

function _0x24cf3b(_0x2c11ee) {
    if (typeof _0x2c11ee == 'string') try {
        return JSON.parse(_0x2c11ee);
    } catch (_0x49ca63) {
        return console.log(_0x49ca63), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }