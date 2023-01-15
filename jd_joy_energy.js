/*
领2-5个能量棒
1 1 1 12 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_joy_energy.js
updatetime: 2023/1/14
*/

const $ = new Env('汪汪赛跑领能量');
const notify = $.isNode() ? require('./sendNotify') : '',
    jdCookieNode = $.isNode() ? require('./jdCookie.js') : '',
    dylany = require('./function/dylany.js');

let jdNotify = true,
    cookiesArr = [],
    cookie = '',
    message = '';

if ($.isNode()) {
    Object.keys(jdCookieNode).forEach(_0x513c14 => {
        cookiesArr.push(jdCookieNode[_0x513c14]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x204031 => _0x204031.cookie)].filter(_0x118ebc => !!_0x118ebc);

!(async () => {
    if (!cookiesArr[0]) {
        const _0x570dbc = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x570dbc);
        return;
    }

    for (let _0xb7604e = 0; _0xb7604e < cookiesArr.length; _0xb7604e++) {
        if (cookiesArr[_0xb7604e]) {
            cookie = cookiesArr[_0xb7604e], $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0xb7604e + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.UA = require('./USER_AGENTS').UARAM(), await TotalBean(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x24511a = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x24511a);
                $.isNode() && (await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            res = await api('joyBaseInfo', {
                'taskId': '',
                'inviteType': '',
                'inviterPin': '',
                'linkId': 'LsQNxL7iWDlXUs6cFl-AAg'
            }, '4abce'), await $.wait(500);
            if ($.hotflag) continue;
            res = await getapi('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"LsQNxL7iWDlXUs6cFl-AAg"}'), res.data.runningJoyUserVo && console.log('恭喜获得' + res.data.runningJoyUserVo.energy + '个能量棒！'), await $.wait(2000);
        }
    }
})().catch(_0x2b416f => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x2b416f + '!', '');
}).finally(() => {
    $.done();
});

function getapi(_0x1765be, _0x1f4cc6) {
    let _0x2ffab6 = {
        'url': 'https://api.m.jd.com/?functionId=' + _0x1765be + '&body=' + encodeURIComponent(_0x1f4cc6) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2',
        'headers': {
            'Origin': 'https://h5platform.jd.com',
            'User-Agent': $.UA,
            'Cookie': cookie
        }
    };
    return new Promise(async _0x477cf8 => {
        $.get(_0x2ffab6, async (_0x582c1d, _0x4b889f, _0x26fcea) => {
            try {
                if (_0x582c1d) console.log('' + JSON.stringify(_0x582c1d)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x26fcea = JSON.parse(_0x26fcea);

                    if (_0x26fcea.success) { } else console.log(_0x26fcea);
                }
            } catch (_0x48e288) {
                $.logErr(_0x48e288, _0x4b889f);
            } finally {
                _0x477cf8(_0x26fcea);
            }
        });
    });
}

async function jointeam(_0xd33a73, _0x5051b8) {
    const _0x5a8bba = {
        'code': 0x1,
        'appId': '448de',
        'apid': 'activities_platform',
        'ver': '3.9.2',
        'cl': 'android'
    };
    _0x5a8bba.fn = _0xd33a73, _0x5a8bba.body = _0x5051b8;
    _0x5a8bba.user = $.UserName, _0x5a8bba.ua = $.UA;
    let _0x550901 = _0x5a8bba;
    _0x5051b8 = await dylany.getbody(_0x550901);
    const _0x4ed752 = {
        'Origin': 'https://h5platform.jd.com'
    };
    _0x4ed752['User-Agent'] = $.UA, _0x4ed752.Cookie = cookie;
    const _0x492d12 = {};
    _0x492d12.url = 'https://api.m.jd.com/?' + _0x5051b8, _0x492d12.headers = _0x4ed752;
    let _0x5766d5 = _0x492d12;
    return new Promise(async _0x48ec63 => {
        $.get(_0x5766d5, async (_0x31f7e7, _0x994031, _0x282cd9) => {
            try {
                if (_0x31f7e7) {
                    console.log('' + JSON.stringify(_0x31f7e7)), console.log(' API请求失败，请检查网路重试');
                } else _0x282cd9 = JSON.parse(_0x282cd9);
            } catch (_0x65790a) {
                $.logErr(_0x65790a, _0x994031);
            } finally {
                _0x48ec63(_0x282cd9);
            }
        });
    });
}

async function startRunning(_0x1a8224, _0x22bfee) {
    if (!_0x1a8224.data.runningHomeInfo.nextRunningTime) {
        console.log('终点目标', _0x22bfee);
        let _0x136c30 = '__jd_ref_cls=Allrun_Run;';

        for (let _0x142db7 = 0; _0x142db7 < 5; _0x142db7++) {
            if (_0x142db7 > 0) _0x136c30 = '__jd_ref_cls=CommonSecurityOnSign;';
            _0x1a8224 = await api('runningOpenBox', {
                'linkId': 'L-sOanK_5RJCz7I314FpnQ'
            }, 'b6ac3', _0x136c30);

            if (parseFloat(_0x1a8224.data.assets) >= _0x22bfee) {
                _0x22bfee = parseFloat(_0x1a8224.data.assets), await $.wait(500), _0x1a8224 = await postapi('runningPreserveAssets', {
                    'linkId': 'L-sOanK_5RJCz7I314FpnQ'
                }), console.log('领取成功', _0x22bfee);
                break;
            } else {
                if (_0x1a8224.data.doubleSuccess) console.log('翻倍成功', parseFloat(_0x1a8224.data.assets)), await $.wait(10000); else {
                    if (!_0x1a8224.data.doubleSuccess && !_0x1a8224.data.runningHomeInfo.runningFinish) console.log('开始跑步', parseFloat(_0x1a8224.data.assets)), await $.wait(10000); else {
                        console.log('翻倍失败');
                        break;
                    }
                }
            }
        }
    }
}

async function postapi(_0x5b21d4, _0x143f9d) {
    _0x143f9d = 'functionId=' + _0x5b21d4 + '&body=' + JSON.stringify(_0x143f9d) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2';
    const _0x3d135c = {
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://h5platform.jd.com',
        'referer': 'https://h5platform.jd.com/'
    };
    _0x3d135c.cookie = cookie, _0x3d135c['user-agent'] = $.UA;
    const _0x14ee20 = {
        'url': 'https://api.m.jd.com'
    };
    _0x14ee20.body = _0x143f9d, _0x14ee20.headers = _0x3d135c;
    let _0xf1246 = _0x14ee20;
    return new Promise(async _0x2630c3 => {
        $.post(_0xf1246, async (_0x537072, _0x20a559, _0x2a3efc) => {
            try {
                if (_0x537072) console.log('' + JSON.stringify(_0x537072)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x2a3efc = JSON.parse(_0x2a3efc);

                    if (_0x2a3efc.success) { } else console.log(_0x2a3efc);
                }
            } catch (_0x5a8a6a) {
                $.logErr(_0x5a8a6a, _0x20a559);
            } finally {
                _0x2630c3(_0x2a3efc);
            }
        });
    });
}

async function dotask() {
    body = 'functionId=apDoTask&body={"taskType":"BROWSE_CHANNEL","taskId":662,"openUdId":"","cityId":2813,"provinceId":2,"countyId":61130,"itemId":"https%3A%2F%2Fh5platform.jd.com%2Fswm-stable%2Fpeople-run%2Findex%3FactivityId%3DL-sOanK_5RJCz7I314FpnQ%26joyLinkId%3DLsQNxL7iWDlXUs6cFl-AAg","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=1669805752543&appid=activities_platform&client=android&clientVersion=3.8.20&h5st=&cthr=1';
    const _0x3f4a6c = {
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://joypark.jd.com',
        'referer': 'https://joypark.jd.com/'
    };
    _0x3f4a6c.cookie = cookie, _0x3f4a6c['user-agent'] = $.UA;
    const _0x18657e = {
        'url': 'https://api.m.jd.com'
    };
    _0x18657e.body = body, _0x18657e.headers = _0x3f4a6c;
    let _0x242c51 = _0x18657e;
    return new Promise(async _0x311010 => {
        $.post(_0x242c51, async (_0x8ed718, _0x2044a4, _0x46a933) => {
            try {
                if (_0x8ed718) console.log('' + JSON.stringify(_0x8ed718)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x46a933 = JSON.parse(_0x46a933);

                    if (_0x46a933.success) { } else console.log(_0x46a933);
                }
            } catch (_0x26469f) {
                $.logErr(_0x26469f, _0x2044a4);
            } finally {
                _0x311010(_0x46a933);
            }
        });
    });
}

async function api(_0x10acf7, _0x4dd1c8, _0x50e22d, _0x44e44e = '') {
    const _0x59634c = {
        'apid': 'activities_platform',
        'code': 0x1,
        'ver': '3.9.2',
        'cl': 'android'
    };
    _0x59634c.appId = _0x50e22d;
    _0x59634c.fn = _0x10acf7;
    _0x59634c.body = _0x4dd1c8, _0x59634c.user = $.UserName, _0x59634c.ua = $.UA;
    let _0x5d261e = _0x59634c;
    _0x4dd1c8 = await dylany.getbody(_0x5d261e);
    let _0x2a2ff3 = {
        'url': 'https://api.m.jd.com',
        'body': _0x4dd1c8,
        'headers': {
            'content-type': 'application/x-www-form-urlencoded',
            'cookie': cookie + _0x44e44e,
            'origin': 'https://h5platform.jd.com',
            'referer': 'https://h5platform.jd.com/',
            'user-agent': $.UA
        }
    };
    return new Promise(async _0x599b82 => {
        $.post(_0x2a2ff3, async (_0x2ecbb3, _0x5ae2db, _0x36f0d5) => {
            try {
                if (_0x2ecbb3) console.log('' + JSON.stringify(_0x2ecbb3)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x36f0d5 = JSON.parse(_0x36f0d5);

                    if (_0x36f0d5.success) { } else {
                        console.log(_0x36f0d5);
                    }
                }
            } catch (_0x3c633) {
                $.logErr(_0x3c633, _0x5ae2db);
            } finally {
                _0x599b82(_0x36f0d5);
            }
        });
    });
}

function TotalBean() {
    return new Promise(_0x21f7fd => {
        {
            const _0x32ca8 = {
                'referer': 'https://h5.m.jd.com/'
            };
            _0x32ca8.Cookie = cookie, _0x32ca8['User-Agent'] = $.UA;
            const _0x5d797d = {
                'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
                'timeout': 0x2710
            };
            _0x5d797d.headers = _0x32ca8;
            const _0x47eee9 = _0x5d797d;
            $.get(_0x47eee9, (_0x44755f, _0x43cd8c, _0x38dc45) => {
                try {
                    if (_0x38dc45) {
                        _0x38dc45 = JSON.parse(_0x38dc45);

                        if (_0x38dc45.islogin === '1') { } else {
                            if (_0x38dc45.islogin === '0') {
                                $.isLogin = false;
                            }
                        }
                    }
                } catch (_0x516bb1) {
                    console.log(_0x516bb1);
                } finally {
                    _0x21f7fd();
                }
            });
        }
    });
}

function showMsg() {
    return new Promise(_0x34e905 => {
        !jdNotify ? $.msg($.name, '', '' + message) : $.log('京东账号' + $.index + $.nickName + '\n' + message);

        _0x34e905();
    });
}

function safeGet(_0x2d60c8) {
    try {
        if (typeof JSON.parse(_0x2d60c8) == 'object') return true;
    } catch (_0x18cdec) {
        return console.log(_0x18cdec), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}

function jsonParse(_0x551eaa) {

    if (typeof _0x551eaa == 'string') try {
        return JSON.parse(_0x551eaa);
    } catch (_0x1be6ef) {
        return console.log(_0x1be6ef), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

function secondsToMinutes(_0x8e2c8) {
    let _0x5357b3 = Math.floor(_0x8e2c8 / 60);

    let _0x5602ae = Math.floor(_0x8e2c8 % 60);

    return _0x5357b3 + '分' + _0x5602ae + '秒';
}


// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }