/*
领2-5个能量棒
汪汪乐园可能会黑，自己决定！
1 1 1 12 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_joy_energy.js
updatetime: 2022/12/1
*/

const $ = new Env('汪汪赛跑领能量-加密');
console.log('汪汪乐园可能会黑，自己决定！');
const _0x3be5cb = $.isNode() ? require('./sendNotify') : '',
    _0x4cc526 = $.isNode() ? require('./jdCookie.js') : '',
    _0x3e0870 = require('./function/dylany.js');

let _0x593f6f = true,
    _0x541317 = [],
    _0x139fb9 = '',
    _0x2fcafd = '';

if ($.isNode()) {
    Object.keys(_0x4cc526).forEach(_0x565fe9 => {
        _0x541317.push(_0x4cc526[_0x565fe9]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x541317 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x49c81e($.getdata('CookiesJD') || '[]').map(_0x4da696 => _0x4da696.cookie)].filter(_0x57992a => !!_0x57992a);

!(async () => {
    if (!_0x541317[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }

    for (let _0x3b66a3 = 0; _0x3b66a3 < _0x541317.length; _0x3b66a3++) {
        if (_0x541317[_0x3b66a3]) {
            _0x139fb9 = _0x541317[_0x3b66a3], $.UserName = decodeURIComponent(_0x139fb9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x139fb9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3b66a3 + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.UA = require('./USER_AGENTS').UARAM(), await _0x1b7f32(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x42e03b = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x42e03b);
                $.isNode() && (await _0x3be5cb.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            const _0x1f2b79 = {
                'taskId': '',
                'inviteType': '',
                'inviterPin': '',
                'linkId': 'LsQNxL7iWDlXUs6cFl-AAg'
            };
            res = await _0x2a94ef('joyBaseInfo', _0x1f2b79, '4abce'), await $.wait(500);
            if ($.hotflag) continue;
            res = await _0x2eb336(), await $.wait(500), res = await _0x51d4e7('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":true,"joyLinkId":"LsQNxL7iWDlXUs6cFl-AAg"}');

            if (res.data.runningJoyUserVo) {
                console.log('恭喜获得' + res.data.runningJoyUserVo.energy + '个能量棒！');
            }

            await $.wait(2000);
        }
    }
})().catch(_0x12bc57 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x12bc57 + '!', '');
}).finally(() => {
    $.done();
});

function _0x51d4e7(_0x1f1dcc, _0xafd247) {
    const _0x41217e = {
        'Origin': 'https://h5platform.jd.com'
    };
    _0x41217e['User-Agent'] = $.UA, _0x41217e.Cookie = _0x139fb9;
    let _0x2c9fb0 = {
        'url': 'https://api.m.jd.com/?functionId=' + _0x1f1dcc + '&body=' + encodeURIComponent(_0xafd247) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2',
        'headers': _0x41217e
    };
    return new Promise(async _0x3835ad => {
        $.get(_0x2c9fb0, async (_0x540485, _0x4322e6, _0x21493c) => {
            try {
                if (_0x540485) console.log('' + JSON.stringify(_0x540485)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x21493c = JSON.parse(_0x21493c);

                    if (_0x21493c.success) { } else console.log(_0x21493c);
                }
            } catch (_0x4d54be) {
                $.logErr(_0x4d54be, _0x4322e6);
            } finally {
                _0x3835ad(_0x21493c);
            }
        });
    });
}

async function _0x2a4e8b(_0x22a62b, _0x412c44) {
    const _0x5637c9 = {
        'cl': 'android',
        'code': 0x1,
        'appId': '448de',
        'apid': 'activities_platform',
        'ver': '3.9.2'
    };
    _0x5637c9.fn = _0x22a62b, _0x5637c9.body = _0x412c44, _0x5637c9.user = $.UserName, _0x5637c9.ua = $.UA;
    let _0x2da6d5 = _0x5637c9;
    _0x412c44 = await _0x3e0870.getbody(_0x2da6d5);
    const _0x28de2f = {
        'Origin': 'https://h5platform.jd.com'
    };
    _0x28de2f['User-Agent'] = $.UA, _0x28de2f.Cookie = _0x139fb9;
    const _0x5df4e9 = {};
    _0x5df4e9.url = 'https://api.m.jd.com/?' + _0x412c44, _0x5df4e9.headers = _0x28de2f;
    let _0x11c282 = _0x5df4e9;
    return new Promise(async _0x4b7b31 => {
        $.get(_0x11c282, async (_0x2bbff2, _0x514c6c, _0x1a68a9) => {
            try {
                _0x2bbff2 ? (console.log('' + JSON.stringify(_0x2bbff2)), console.log(' API请求失败，请检查网路重试')) : _0x1a68a9 = JSON.parse(_0x1a68a9);
            } catch (_0x3e91e4) {
                $.logErr(_0x3e91e4, _0x514c6c);
            } finally {
                _0x4b7b31(_0x1a68a9);
            }
        });
    });
}

async function _0x418ab0(_0x5d959d, _0x44573e) {
    if (!_0x5d959d.data.runningHomeInfo.nextRunningTime) {
        console.log('终点目标', _0x44573e);
        let _0x385c12 = '__jd_ref_cls=Allrun_Run;';

        for (let _0xa879ef = 0; _0xa879ef < 5; _0xa879ef++) {
            if (_0xa879ef > 0) _0x385c12 = '__jd_ref_cls=CommonSecurityOnSign;';
            _0x5d959d = await _0x2a94ef('runningOpenBox', {
                'linkId': 'L-sOanK_5RJCz7I314FpnQ'
            }, 'b6ac3', _0x385c12);

            if (parseFloat(_0x5d959d.data.assets) >= _0x44573e) {
                _0x44573e = parseFloat(_0x5d959d.data.assets), await $.wait(500), _0x5d959d = await _0x2cb605('runningPreserveAssets', {
                    'linkId': 'L-sOanK_5RJCz7I314FpnQ'
                }), console.log('领取成功', _0x44573e);
                break;
            } else {
                if (_0x5d959d.data.doubleSuccess) console.log('翻倍成功', parseFloat(_0x5d959d.data.assets)), await $.wait(10000); else {
                    if (!_0x5d959d.data.doubleSuccess && !_0x5d959d.data.runningHomeInfo.runningFinish) console.log('开始跑步', parseFloat(_0x5d959d.data.assets)), await $.wait(10000); else {
                        console.log('翻倍失败');
                        break;
                    }
                }
            }
        }
    }
}

async function _0x2cb605(_0x3d2c3f, _0x225b03) {
    _0x225b03 = 'functionId=' + _0x3d2c3f + '&body=' + JSON.stringify(_0x225b03) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2';
    const _0x5ca088 = {
        'origin': 'https://h5platform.jd.com',
        'referer': 'https://h5platform.jd.com/',
        'content-type': 'application/x-www-form-urlencoded'
    };
    _0x5ca088.cookie = _0x139fb9;
    _0x5ca088['user-agent'] = $.UA;
    const _0x59bd90 = {
        'url': 'https://api.m.jd.com'
    };
    _0x59bd90.body = _0x225b03, _0x59bd90.headers = _0x5ca088;
    let _0x19c327 = _0x59bd90;
    return new Promise(async _0x6cbbd => {
        $.post(_0x19c327, async (_0x2265f9, _0x1d5065, _0x1a9343) => {
            try {
                if (_0x2265f9) {
                    console.log('' + JSON.stringify(_0x2265f9)), console.log(' API请求失败，请检查网路重试');
                } else {
                    _0x1a9343 = JSON.parse(_0x1a9343);

                    if (_0x1a9343.success) { } else console.log(_0x1a9343);
                }
            } catch (_0x3f4bd5) {
                $.logErr(_0x3f4bd5, _0x1d5065);
            } finally {
                _0x6cbbd(_0x1a9343);
            }
        });
    });
}

async function _0x2eb336() {
    body = 'functionId=apDoTask&body={"taskType":"BROWSE_CHANNEL","taskId":662,"openUdId":"","cityId":2813,"provinceId":2,"countyId":61130,"itemId":"https%3A%2F%2Fh5platform.jd.com%2Fswm-stable%2Fpeople-run%2Findex%3FactivityId%3DL-sOanK_5RJCz7I314FpnQ%26joyLinkId%3DLsQNxL7iWDlXUs6cFl-AAg","linkId":"LsQNxL7iWDlXUs6cFl-AAg"}&t=1669805752543&appid=activities_platform&client=android&clientVersion=3.8.20&h5st=&cthr=1';
    const _0x140bb9 = {
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://joypark.jd.com',
        'referer': 'https://joypark.jd.com/'
    };
    _0x140bb9.cookie = _0x139fb9;
    _0x140bb9['user-agent'] = $.UA;
    const _0x715804 = {
        'url': 'https://api.m.jd.com'
    };
    _0x715804.body = body, _0x715804.headers = _0x140bb9;
    let _0x2494e0 = _0x715804;
    return new Promise(async _0x24ef6c => {
        $.post(_0x2494e0, async (_0x1c8f05, _0xe91be4, _0x2e77a9) => {
            try {
                if (_0x1c8f05) console.log('' + JSON.stringify(_0x1c8f05)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x2e77a9 = JSON.parse(_0x2e77a9);

                    if (_0x2e77a9.success) { } else console.log(_0x2e77a9);
                }
            } catch (_0x5844ae) {
                $.logErr(_0x5844ae, _0xe91be4);
            } finally {
                _0x24ef6c(_0x2e77a9);
            }
        });
    });
}

async function _0x2a94ef(_0x3573ce, _0x58ae92, _0x3bf6b6, _0x1bed49 = '') {
    const _0x29e540 = {
        'ver': '3.9.2',
        'code': 0x1,
        'apid': 'activities_platform',
        'cl': 'android'
    };
    _0x29e540.appId = _0x3bf6b6, _0x29e540.fn = _0x3573ce, _0x29e540.body = _0x58ae92;
    _0x29e540.user = $.UserName, _0x29e540.ua = $.UA;
    let _0x3d4541 = _0x29e540;
    _0x58ae92 = await _0x3e0870.getbody(_0x3d4541);
    const _0x50038c = {
        'referer': 'https://h5platform.jd.com/',
        'content-type': 'application/x-www-form-urlencoded',
        'origin': 'https://h5platform.jd.com'
    };
    _0x50038c.cookie = _0x139fb9 + _0x1bed49, _0x50038c['user-agent'] = $.UA;
    const _0x122a7c = {
        'url': 'https://api.m.jd.com'
    };
    _0x122a7c.body = _0x58ae92, _0x122a7c.headers = _0x50038c;
    let _0x29e02a = _0x122a7c;
    return new Promise(async _0x2fbb0e => {
        $.post(_0x29e02a, async (_0x5ef363, _0x74add0, _0x1161d2) => {
            try {
                if (_0x5ef363) console.log('' + JSON.stringify(_0x5ef363)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x1161d2 = JSON.parse(_0x1161d2);

                    if (_0x1161d2.success) { } else console.log(_0x1161d2);
                }
            } catch (_0x43f530) {
                $.logErr(_0x43f530, _0x74add0);
            } finally {
                _0x2fbb0e(_0x1161d2);
            }
        });
    });
}

function _0x1b7f32() {
    return new Promise(_0x22702f => {
        {
            const _0x43921a = {
                'referer': 'https://h5.m.jd.com/'
            };
            _0x43921a.Cookie = _0x139fb9, _0x43921a['User-Agent'] = $.UA;
            const _0x548d74 = {
                'timeout': 0x2710,
                'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin'
            };
            _0x548d74.headers = _0x43921a;
            const _0x216759 = _0x548d74;
            $.get(_0x216759, (_0x58eb6d, _0x3b003b, _0x2096fa) => {
                try {
                    if (_0x2096fa) {
                        _0x2096fa = JSON.parse(_0x2096fa);

                        if (_0x2096fa.islogin === '1') { } else _0x2096fa.islogin === '0' && ($.isLogin = false);
                    }
                } catch (_0x23678e) {
                    console.log(_0x23678e);
                } finally {
                    _0x22702f();
                }
            });
        }
    });
}

function _0x4c52f3() {
    return new Promise(_0x451af6 => {
        {
            if (!_0x593f6f) $.msg($.name, '', '' + _0x2fcafd); else {
                $.log('京东账号' + $.index + $.nickName + '\n' + _0x2fcafd);
            }

            _0x451af6();
        }
    });
}

function _0x1d571c(_0x21e39d) {
    try {
        if (typeof JSON.parse(_0x21e39d) == 'object') {
            return true;
        }
    } catch (_0x26a426) {
        return console.log(_0x26a426), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}

function _0x49c81e(_0x1dd2d9) {
    const _0x5cf9d7 = function () {
        {
            let _0x1edc6a = true;
            return function (_0x30fee0, _0xd34b93) {
                {
                    const _0x3e63ac = _0x1edc6a ? function () {
                        if (_0xd34b93) {
                            const _0x34e841 = _0xd34b93.apply(_0x30fee0, arguments);

                            return _0xd34b93 = null, _0x34e841;
                        }
                    } : function () { };

                    return _0x1edc6a = false, _0x3e63ac;
                }
            };
        }
    }();

    const _0x436b7d = _0x5cf9d7(this, function () {
        return _0x436b7d.toString().search('(((.+)+)+)+$').toString().constructor(_0x436b7d).search('(((.+)+)+)+$');
    });

    _0x436b7d();

    if (typeof _0x1dd2d9 == 'string') try {
        return JSON.parse(_0x1dd2d9);
    } catch (_0x4d5b82) {
        return console.log(_0x4d5b82), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}

function _0x3c5a39(_0x145211) {
    let _0x1de9a3 = Math.floor(_0x145211 / 60);

    let _0x3a5af5 = Math.floor(_0x145211 % 60);

    return _0x1de9a3 + '分' + _0x3a5af5 + '秒';
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }