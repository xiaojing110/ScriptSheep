/*
金融签到，领取双签礼包
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jrsign.js
只运行前10，多了也是黑ip
* */

const $ = new Env('金融签到');
const _0x2d0108 = $.isNode() ? require('jsdom') : '',
    _0x596fab = 'https://ms.jr.jd.com/gw/generic/hy/h5/m',
    _0xfed4ef = $.isNode() ? require('./sendNotify') : '',
    _0x1d48f3 = $.isNode() ? require('./jdCookie.js') : '';

let _0x12ff05 = [],
    _0xf63665 = '';

if ($.isNode()) {
    Object.keys(_0x1d48f3).forEach(_0xefa552 => {
        _0x12ff05.push(_0x1d48f3[_0xefa552]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x12ff05 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x4c2da7($.getdata('CookiesJD') || '[]').map(_0x75ddbc => _0x75ddbc.cookie)].filter(_0x353af0 => !!_0x353af0);

!(async () => {
    if (!_0x12ff05[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }

    console.log('只跑前10，多了也是黑ip！！！'), $.getid = {}, await _0x5a43aa();
    JSON.stringify($.getid) == '{}' && ($.getid.jstub = 'BW6T4437AB2RMXKMPMWZOV3PBU6KWRQV2GIOLTKZKUEYGJ44RCKTUZXGZQ7N553SU4HPEDYDHP7B6SWDOVCGYDKRQTC3NGZC2OCTQ5Q', $.getid.sdkToken = '', $.getid.token = '4NZZKHI4EJTZ5OP4Y7S7B4WZBA243SHJSMLKFKPWIX4G27GYSEZU2XJKGBOQERJIDIIWEUF7ILI2M');
    $.getid.eid = '';

    for (let _0x2f8259 = 0; _0x2f8259 < '10'; _0x2f8259++) {
        if (_0x12ff05[_0x2f8259]) {
            _0xf63665 = _0x12ff05[_0x2f8259], $.UserName = decodeURIComponent(_0xf63665.match(/pt_pin=([^; ]+)(?=;?)/) && _0xf63665.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2f8259 + 1, $.isLogin = true, $.nickName = '', $.stopNext = false, $.getid.fp = _0x2e47f8('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), $.UA = require('./USER_AGENTS').UARAM(), await _0x2983ca(), console.log('\n***********开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '********\n');

            if (!$.isLogin) {
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                });
                $.isNode() && (await _0xfed4ef.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            await _0x171b47(), await $.wait(10000);
        }
    }
})().catch(_0x51f59d => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x51f59d + '!', '');
}).finally(() => {
    $.done();
});

async function _0x171b47() {
    await _0x442dc1();
    await $.wait(500);
    await _0x24db3b();
    await $.wait(500);
    await _0x583d1a();
}

function _0x442dc1() {
    const _0x18a2f4 = {
        'channel': 'sy',
        'channelLv': 'sy'
    };
    body = _0x18a2f4;
    return new Promise(async _0xa75536 => {
        $.post(_0x33dc24('getRSAPubKey', body), (_0x2c5068, _0x5bbbef, _0x3106a7) => {
            try {
                _0x2c5068 ? (console.log('' + JSON.stringify(_0x2c5068)), console.log('getRSAPubKey API请求失败，请检查网路重试')) : _0x3106a7 ? (_0x3106a7 = JSON.parse(_0x3106a7), _0x3106a7.resultData && _0x3106a7.resultCode === 0 && ($.rsaKey = _0x3106a7.resultData.resBusiData)) : console.log('京东服务器返回空数据');
            } catch (_0x563d18) {
                $.logErr(_0x563d18, _0x5bbbef);
            } finally {
                _0xa75536();
            }
        });
    });
}

function _0x1ca23d() {
    const _0x3e8ee7 = {
        'site': 'JD_JR_APP',
        'channel': 'sy',
        'channelLv': 'sy',
        'channelSource': 'JRAPP6.0',
        'riskDeviceParam': '{"eid":"","fp":"","sdkToken":"","token":""}'
    };
    return body = _0x3e8ee7, new Promise(async _0x1e89b7 => {
        $.post(_0x33dc24('querySignCalendar', body), (_0x274120, _0x1272a3, _0x1e1dcf) => {
            try {
                if (_0x274120) console.log('' + JSON.stringify(_0x274120)), console.log('queryDrawChance API请求失败，请检查网路重试'); else {
                    if (_0x1e1dcf) _0x1e1dcf = JSON.parse(_0x1e1dcf), _0x1e1dcf.resultData && _0x1e1dcf.resultCode === 0 && ($.noa = _0x1e1dcf.resultData.resBusiData.noa); else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (_0x1c65d6) {
                $.logErr(_0x1c65d6, _0x1272a3);
            } finally {
                _0x1e89b7();
            }
        });
    });
}

function _0x24db3b() {
    let _0x1c21e6 = $.ar2.nonce(),
        _0x153e71 = {
            'videoId': '311372930347370496',
            'channelSource': 'JRAPP6.0',
            'noa': _0x1c21e6
        };

    $.cry.setPublicKeyString($.rsaKey);
    let _0x4c0ee8 = $.cry.encryptData(JSON.stringify(_0x153e71)).cipher;
    const _0x366fa8 = {
        ...$.getid
    };
    let _0x38f774 = {
        'site': 'JD_JR_APP',
        'videoId': '311372930347370496',
        'channelSource': 'JRAPP6.0',
        'encryptData': _0x4c0ee8,
        'riskDeviceParam': _0x366fa8,
        'deviceInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'adInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'clientType': 'android',
        'arrEncrypt': true
    };
    sign = $.ar2.sign(JSON.stringify(_0x38f774), _0x1c21e6);
    const _0x38cbdb = {
        ...$.getid
    };
    return body = {
        'site': 'JD_JR_APP',
        'videoId': '311372930347370496',
        'channelSource': 'JRAPP6.0',
        'encryptData': _0x4c0ee8,
        'riskDeviceParam': JSON.stringify(_0x38cbdb),
        'deviceInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'adInfo': JSON.stringify({
            'deviceId': '',
            'clientType': 'android',
            'user_agent': $.UA,
            'iosType': 'android',
            'osv': '12',
            'brand': 'Redmi',
            'hwv': '',
            'network': 0x1,
            'mac': '',
            'androidId': '',
            'oaid': ''
        }),
        'clientType': 'android',
        'arrEncrypt': true,
        'signData': JSON.stringify(_0x38f774),
        'signature': sign,
        'nonce': _0x1c21e6,
        'channel': 'sy',
        'channelLv': 'sy'
    }, new Promise(async _0x3a1c56 => {
        $.post(_0x33dc24('jrSign', body), (_0x40d221, _0x1a5870, _0x489d76) => {
            try {
                if (_0x40d221) console.log('' + JSON.stringify(_0x40d221)), console.log('jrSign API请求失败，请检查网路重试'); else {
                    if (_0x489d76) {
                        _0x489d76 = JSON.parse(_0x489d76);

                        if (_0x489d76.resultData && _0x489d76.resultCode === 0) {
                            if (_0x489d76.resultData.resBusiCode == 0) console.log('签到成功！'); else _0x489d76.resultData.resBusiCode == 15 ? console.log('今日已签到！') : console.log(_0x489d76.resultData.resBusiMsg);
                        }
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x3828ea) {
                $.logErr(_0x3828ea, _0x1a5870);
            } finally {
                _0x3a1c56();
            }
        });
    });
}

function _0x583d1a(_0x384022 = false) {
    let _0x22ff12 = $.ar2.nonce(),
        _0x4e793f = Date.now(),
        _0x564ab6 = $.ar2.sign(JSON.stringify({
            't': _0x4e793f
        }), _0x22ff12),
        _0x3968d8 = {
            'channel': 'JD',
            'actCode': 'F68B2C3E71',
            'type': 0x4,
            'frontParam': {
                'channel': 'JD',
                'belong': 'jingdou',
                'signData': JSON.stringify({
                    't': _0x4e793f
                }),
                'nonce': _0x22ff12,
                'signature': _0x564ab6,
                'riskDeviceParam': {
                    ...$.getid
                }
            },
            'riskDeviceParam': {}
        },
        _0x20ed16 = {
            'url': 'https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?_=' + new Date().getTime(),
            'headers': {
                'Host': 'nu.jr.jd.com',
                'Accept': 'application/json',
                'User-Agent': $.UA,
                'Origin': 'https://m.jr.jd.com',
                'Referer': 'https://m.jr.jd.com/',
                'cookie': _0xf63665,
                'X-Requested-With': 'com.jingdong.app.mall'
            },
            'body': 'reqData=' + encodeURIComponent(JSON.stringify(_0x3968d8))
        };

    return new Promise(async _0xf96b83 => {
        $.post(_0x20ed16, (_0xc7a3a9, _0x2ff444, _0x16be59) => {
            try {
                if (_0xc7a3a9) console.log('' + JSON.stringify(_0xc7a3a9)), console.log('signaward API请求失败，请检查网路重试'); else {
                    if (_0x16be59) {
                        _0x16be59 = JSON.parse(_0x16be59);

                        if (_0x16be59.resultData && _0x16be59.resultCode === 0) {
                            _0x16be59.resultData.data.businessData.businessCode == '000sq' ? console.log('双签礼包：' + _0x16be59.resultData.data.businessData.businessData.awardListVo[0].name) : console.log('双签礼包：' + _0x16be59.resultData.data.businessData.businessMsg);
                        }
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x599d26) {
                $.logErr(_0x599d26, _0x2ff444);
            } finally {
                _0xf96b83();
            }
        });
    });
}

function _0x2983ca() {
    return new Promise(_0xeaa258 => {
        const _0x17d20d = {
            'timeout': 0x2710,
            'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin'
        };
        _0x17d20d.headers = {};
        _0x17d20d.headers.Cookie = _0xf63665, _0x17d20d.headers.referer = 'https://h5.m.jd.com/';
        _0x17d20d.headers['User-Agent'] = $.UA;
        const _0x3f9e5b = _0x17d20d;
        $.get(_0x3f9e5b, (_0x3f7585, _0x1fa4a0, _0x4d0ac8) => {
            try {
                if (_0x4d0ac8) {
                    _0x4d0ac8 = JSON.parse(_0x4d0ac8);

                    if (_0x4d0ac8.islogin === '1') { } else _0x4d0ac8.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x34c026) {
                console.log(_0x34c026);
            } finally {
                _0xeaa258();
            }
        });
    });
}

function _0x33dc24(_0x3d950f, _0x4c6a48) {
    return {
        'url': 'https://ms.jr.jd.com/gw/generic/hy/h5/m/' + _0x3d950f,
        'headers': {
            'Host': 'ms.jr.jd.com',
            'Accept': 'application/json',
            'User-Agent': $.UA,
            'Origin': 'https://member.jr.jd.com',
            'Referer': 'https://member.jr.jd.com/',
            'cookie': _0xf63665
        },
        'body': 'reqData=' + encodeURIComponent(JSON.stringify(_0x4c6a48))
    };
}

async function _0x5a43aa() {
    const {
        JSDOM: _0x577cda
    } = _0x2d0108,
        _0x2dcdbc = {
            'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
            'referer': 'https://u.jr.jd.com/'
        };

    let _0x12852b = new _0x2d0108.ResourceLoader(_0x2dcdbc),
        _0x2e9aef = new _0x2d0108.VirtualConsole();

    const _0x923b8a = {
        'includeNodeLocations': true,
        'storageQuota': 0x989680,
        'pretendToBeVisual': true,
        'url': 'https://u.jr.jd.com/uc-fe-wxgrowing/18-quan-yi-day/index.html',
        'referer': 'https://u.jr.jd.com/',
        'userAgent': 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36',
        'runScripts': 'dangerously'
    };
    _0x923b8a.resources = _0x12852b, _0x923b8a.virtualConsole = _0x2e9aef;
    let _0x23050e = _0x923b8a;

    const _0x29ca75 = new _0x577cda('<body>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js"></script>\n  <script src="https://m.jr.jd.com/common/jssdk/jrbridge/2.0.0/jrbridge.js"></script>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js"></script>\n  <script src="//gia.jd.com/m.html"></script>\n  <script src="//gias.jd.com/js/m.js"></script>\n  </body>', _0x23050e);

    await $.wait(1500);

    try {
        $.getid = _0x29ca75.window.getJdEid(), _0x29ca75.window.AAR2.init(), $.ar2 = new _0x29ca75.window.AAR2(), $.cry = _0x29ca75.window.cryptico;
    } catch (_0x1abdc0) { }
}

function _0x4c2da7(_0x4aaf6f) {
    if (typeof _0x4aaf6f == 'string') try {
        return JSON.parse(_0x4aaf6f);
    } catch (_0x518ca4) {
        return console.log(_0x518ca4), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

function _0x2e47f8(_0x1490b2 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0xffc2b = 0) {
    return _0x1490b2.replace(/[xy]/g, function (_0x3dede1) {
        {
            var _0x400764 = Math.random() * 16 | 0,
                _0xc68dbc = _0x3dede1 == 'x' ? _0x400764 : _0x400764 & 3 | 8;

            if (_0xffc2b) {
                uuid = _0xc68dbc.toString(36).toUpperCase();
            } else uuid = _0xc68dbc.toString(36);

            return uuid;
        }
    });
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
