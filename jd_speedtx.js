/*
极速模式-签到提现
默认提现，不提现变量JSQDTX='false'
33 3 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_speedtx.js
updatetime:2023/10/01
 */
const $ = new Env('极速模式签到');
const _0x458b07 = $.isNode() ? require('./sendNotify') : '',
    _0x35a006 = $.isNode() ? require('./jdCookie.js') : '',
    _0x8457b8 = require('./function/dylanz.js'),
    _0x520b9b = require('./USER_AGENTS'),
    _0x25d3ae = process.env.JSQDTX ? process.env.JSQDTX : true;
let _0x1084fe = true,
    _0x478e5f = [],
    _0x16fe21 = '',
    _0x5a7513 = '';
if ($.isNode()) {
    Object.keys(_0x35a006).forEach(_0x4eb934 => {
        _0x478e5f.push(_0x35a006[_0x4eb934]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x478e5f = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x4b3eab($.getdata('CookiesJD') || '[]').map(_0x3a9652 => _0x3a9652.cookie)].filter(_0x479619 => !!_0x479619);
!(async () => {
    if (!_0x478e5f[0]) {
        const _0x4bf295 = {};
        _0x4bf295['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4bf295);
        return;
    }
    $.log('\n当前版本：20231001 '), $.log('TG频道：https://t.me/dylan_jdpro');
    for (let _0x37797c = 0; _0x37797c < _0x478e5f.length; _0x37797c++) {
        if (_0x478e5f[_0x37797c]) {
            _0x16fe21 = _0x478e5f[_0x37797c], $.UserName = decodeURIComponent(_0x16fe21.match(/pt_pin=([^; ]+)(?=;?)/) && _0x16fe21.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x37797c + 1, $.isLogin = true, $.nickName = '', $.signInFlag = 0, $.score = 0, $.tasklist = [], $.UA = _0x520b9b.UARAM(), await _0x4dbbdb(), console.log('\n--------------开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '----------\n');
            if (!$.isLogin) {
                const _0x2baf14 = {};
                _0x2baf14['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x2baf14);
                $.isNode() && (await _0x458b07.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x5228c3();
            $.signInFlag == 0 && ($.log('\n去签到...'), await _0x5d4269());
            await _0x294775();
            if ($.tasklist.length != 0) {
                console.log('\n去做任务...');
                for (let _0x115fd6 of $.tasklist) {
                    if (_0x115fd6.taskTitle === '下单') continue;
                    if (_0x115fd6.taskFinished) {
                        console.log(_0x115fd6.taskShowTitle + ' ---- 已完成');
                        continue;
                    }
                    ;
                    console.log('去做任务 ' + _0x115fd6.taskShowTitle), await _0x5b837f(_0x115fd6.taskType, _0x115fd6.id, _0x115fd6.taskSourceUrl), await $.wait(500), await _0x35be28(_0x115fd6.taskType, _0x115fd6.id);
                }
            }
            if (_0x25d3ae != 'false') {
                if ($.score > 20) $.log('去提现20元...'), await _0x52a753(3); else {
                    if ($.score > 1) $.log('去提现1元...'), await _0x52a753(2); else $.score > 0.3 ? ($.log('\n去提现0.3元...'), await _0x52a753(1)) : $.log('余额不够提现！');
                }
            } else $.log('已设置不提现！！');
            await $.wait(5000);
        }
    }
})().catch(_0x1929c0 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1929c0 + '!', '');
}).finally(() => {
    $.done();
});
async function _0x5228c3() {
    const _0x58f40f = {};
    _0x58f40f.activityId = 'FIz2zkvbepstVFm3uqLOUA', _0x58f40f.linkId = 'FIz2zkvbepstVFm3uqLOUA';
    let _0x32b6d8 = _0x58f40f;
    _0x32b6d8 = await _0x5b0d71('bSignInHome', _0x32b6d8, '76674');
    if (!_0x32b6d8) return;
    return new Promise(async _0x31de00 => {
        $.post(_0x2db49f(_0x32b6d8), async (_0x5e2c80, _0x15f0c1, _0x3a63cf) => {
            try {
                if (_0x5e2c80) console.log('' + JSON.stringify(_0x5e2c80)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x3a63cf = JSON.parse(_0x3a63cf), _0x3a63cf.code == 0 ? ($.score = _0x3a63cf.data.signInCoin, console.log('余额' + _0x3a63cf.data.signInCoin + '元'), $.signInFlag = _0x3a63cf.data.signInFlag) : console.log(_0x3a63cf.errMsg);
                }
            } catch (_0x4b884b) {
                $.logErr(_0x4b884b, _0x15f0c1);
            } finally {
                _0x31de00(_0x3a63cf);
            }
        });
    });
}
async function _0x5d4269() {
    const _0x1bca63 = {};
    _0x1bca63.activityId = 'FIz2zkvbepstVFm3uqLOUA', _0x1bca63.linkId = 'FIz2zkvbepstVFm3uqLOUA';
    let _0x159b98 = _0x1bca63;
    _0x159b98 = await _0x5b0d71('bSignInDo', _0x159b98, '61e2b');
    if (!_0x159b98) return;
    return new Promise(async _0x327960 => {
        $.post(_0x2db49f(_0x159b98), async (_0x3cf8f3, _0x52d7e6, _0xc74c36) => {
            try {
                _0x3cf8f3 ? (console.log('' + JSON.stringify(_0x3cf8f3)), console.log(' API请求失败，请检查网路重试')) : (_0xc74c36 = JSON.parse(_0xc74c36), _0xc74c36.code == 0 ? console.log('签到成功：获得：' + _0xc74c36.data.signInCoin) : console.log(_0xc74c36.errMsg));
            } catch (_0x171c12) {
                $.logErr(_0x171c12, _0x52d7e6);
            } finally {
                _0x327960(_0xc74c36);
            }
        });
    });
}
async function _0x5b837f(_0x13ee83, _0x21642d, _0x2e37db) {
    const _0x249495 = {};
    _0x249495.taskType = _0x13ee83, _0x249495.taskId = _0x21642d, _0x249495.channel = 0x4, _0x249495.checkVersion = true, _0x249495.cityId = 0x0, _0x249495.provinceId = 0x0, _0x249495.countyId = 0x0, _0x249495.linkId = 'FIz2zkvbepstVFm3uqLOUA', _0x249495.itemId = _0x2e37db;
    let _0x514748 = _0x249495;
    _0x514748 = await _0x5b0d71('apsDoTask', _0x514748, '54ed7');
    if (!_0x514748) return;
    return new Promise(async _0x2ca4a3 => {
        $.post(_0x2db49f(_0x514748), async (_0x43c665, _0x5d08c7, _0x391ea8) => {
            try {
                if (_0x43c665) console.log('' + JSON.stringify(_0x43c665)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x391ea8 = JSON.parse(_0x391ea8);
                    if (_0x391ea8.code == 0) { } else console.log(_0x391ea8.errMsg);
                }
            } catch (_0x31189e) {
                $.logErr(_0x31189e, _0x5d08c7);
            } finally {
                _0x2ca4a3(_0x391ea8);
            }
        });
    });
}
async function _0x35be28(_0x3c55b7, _0x102d80) {
    const _0x8607fa = {};
    _0x8607fa.taskType = _0x3c55b7, _0x8607fa.taskId = _0x102d80, _0x8607fa.channel = 0x4, _0x8607fa.checkVersion = true, _0x8607fa.cityId = 0x0, _0x8607fa.provinceId = 0x0, _0x8607fa.countyId = 0x0, _0x8607fa.linkId = 'FIz2zkvbepstVFm3uqLOUA';
    let _0x44c0ad = _0x8607fa;
    _0x44c0ad = await _0x5b0d71('apTaskDrawAward', _0x44c0ad, '6f2b6');
    if (!_0x44c0ad) return;
    return new Promise(async _0x95864a => {
        $.post(_0x2db49f(_0x44c0ad), async (_0x52f70a, _0x218452, _0x58c214) => {
            try {
                if (_0x52f70a) console.log('' + JSON.stringify(_0x52f70a)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x58c214 = JSON.parse(_0x58c214);
                    if (_0x58c214.code == 0) console.log('任务完成：获得：' + _0x58c214.data[0].awardGivenNumber + '\n'); else {
                        console.log(_0x58c214.errMsg);
                    }
                }
            } catch (_0x2bf4a4) {
                $.logErr(_0x2bf4a4, _0x218452);
            } finally {
                _0x95864a(_0x58c214);
            }
        });
    });
}
async function _0x52a753(_0x5aaa90) {
    const _0x3d5cc8 = {};
    _0x3d5cc8.activityId = 'FIz2zkvbepstVFm3uqLOUA', _0x3d5cc8.awardType = 0x4, _0x3d5cc8.gear = _0x5aaa90, _0x3d5cc8.linkId = 'FIz2zkvbepstVFm3uqLOUA';
    let _0x35284e = _0x3d5cc8;
    _0x35284e = await _0x5b0d71('bSignInExchange', _0x35284e, 'ff179');
    if (!_0x35284e) return;
    return new Promise(async _0x2c592c => {
        $.post(_0x2db49f(_0x35284e), async (_0x3b0807, _0x1e8747, _0x302af0) => {
            try {
                if (_0x3b0807) {
                    console.log('' + JSON.stringify(_0x3b0807)), console.log(' API请求失败，请检查网路重试');
                } else _0x302af0 = JSON.parse(_0x302af0), _0x302af0.code == 0 ? _0x302af0.data.msg.includes('提现') && $.log('提现成功！') : console.log(_0x302af0.errMsg);
            } catch (_0x5c0ed6) {
                $.logErr(_0x5c0ed6, _0x1e8747);
            } finally {
                _0x2c592c(_0x302af0);
            }
        });
    });
}
async function _0x294775() {
    const _0x4e71fb = {};
    _0x4e71fb.Host = 'api.m.jd.com', _0x4e71fb.Origin = 'https://h5.m.jd.com', _0x4e71fb['User-Agent'] = $.UA, _0x4e71fb.Cookie = _0x16fe21;
    let _0x5d2687 = {
        'url': 'https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22%3A%22FIz2zkvbepstVFm3uqLOUA%22%7D&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=12.1.0&loginType=2&loginWQBiz=wegame',
        'headers': _0x4e71fb
    };
    return new Promise(async _0x2f1cbe => {
        $.get(_0x5d2687, async (_0x1736be, _0x48d416, _0x13a013) => {
            try {
                _0x1736be ? (console.log('' + JSON.stringify(_0x1736be)), console.log(' API请求失败，请检查网路重试')) : (_0x13a013 = JSON.parse(_0x13a013), _0x13a013.code == 0 ? $.tasklist = _0x13a013.data : console.log(_0x13a013.errMsg));
            } catch (_0x4b46cd) {
                $.logErr(_0x4b46cd, _0x48d416);
            } finally {
                _0x2f1cbe(_0x13a013);
            }
        });
    });
}
async function _0x5b0d71(_0x59c4a6, _0x13a045, _0x29394e) {
    let _0x42cfc1 = {
        'appId': _0x29394e,
        'fn': _0x59c4a6,
        'body': _0x13a045,
        'apid': 'activities_platform',
        'ver': $.UA.split(';')[2],
        'cl': 'ios',
        'user': $.UserName,
        'code': 0x1,
        'ua': $.UA
    };
    return _0x13a045 = await _0x8457b8.getbody(_0x42cfc1), _0x13a045;
}
function _0x2db49f(_0x321ad4) {
    const _0x6f9c62 = {};
    _0x6f9c62.Host = 'api.m.jd.com', _0x6f9c62.Origin = 'https://h5.m.jd.com', _0x6f9c62['Content-Type'] = 'application/x-www-form-urlencoded', _0x6f9c62['User-Agent'] = $.UA, _0x6f9c62.Cookie = _0x16fe21;
    const _0x26df57 = {};
    return _0x26df57.url = 'https://api.m.jd.com/api', _0x26df57.body = _0x321ad4 + '&loginType=2&loginWQBiz=wegame', _0x26df57.headers = _0x6f9c62, _0x26df57;
}
function _0x4dbbdb() {
    return new Promise(_0x58bebb => {
        const _0x1ddc0a = {};
        _0x1ddc0a.Cookie = _0x16fe21, _0x1ddc0a['User-Agent'] = $.UA;
        const _0x13f24c = {};
        _0x13f24c.url = 'https://api.m.jd.com/client.action', _0x13f24c.body = 'body=%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&', _0x13f24c.headers = _0x1ddc0a, _0x13f24c.timeout = 0x2710;
        const _0x2b751d = _0x13f24c;
        $.post(_0x2b751d, (_0x3e2fba, _0x299685, _0x2e92e5) => {
            try {
                if (_0x2e92e5) {
                    _0x2e92e5 = JSON.parse(_0x2e92e5);
                    if (_0x2e92e5.islogin === '1') { } else _0x2e92e5.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x17df4c) {
                console.log(_0x17df4c);
            } finally {
                _0x58bebb();
            }
        });
    });
}
function _0x4a505f() {
    return new Promise(_0x4402ca => {
        if (!_0x1084fe) $.msg($.name, '', '' + _0x5a7513); else {
            $.log('京东账号' + $.index + $.nickName + '\n' + _0x5a7513);
        }
        _0x4402ca();
    });
}
function _0x243202(_0x2abac3) {
    try {
        if (typeof JSON.parse(_0x2abac3) == 'object') return true;
    } catch (_0x17e07f) {
        return console.log(_0x17e07f), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}
function _0x4b3eab(_0xa7f27b) {
    if (typeof _0xa7f27b == 'string') try {
        return JSON.parse(_0xa7f27b);
    } catch (_0x1f33f1) {
        return console.log(_0x1f33f1), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }