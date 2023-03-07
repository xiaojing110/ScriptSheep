/**
2022/8/17 兑换物流积分失败不在执行兑换京豆
2022/8/24 兑回京豆调整为兑换剩余全部积分，不按兑换积分计
2022/8/28 修复已知问题
2022/9/15 兑换失败重试一次
2023/2/6  一些优化
2023/2/7  分离积分换豆;换积分失败重试2次
2023/2/8  优化延时
默认不执行，如需执行请设置变量 DY_WASHBEANS='true'
7天内过期京豆大于10个豆子才洗！
每次最低兑100积分，最多500积分
33 5 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_washbeans.js
问题建议TG -> https://t.me/dylan_jdpro
*/
if (process.env.DY_WASHBEANS != "true") {
    console.log('\n默认不运行,设置变量export DY_WASHBEANS="true"来运行\n')
    return
}
const $ = new Env('临期京豆换积分');


const _0x3dcdaa = $.isNode() ? require('./sendNotify') : '',
    _0x139fe9 = $.isNode() ? require('./jdCookie.js') : '';

let _0x550ac0 = [],
    _0x190924 = '',
    _0x712d1 = '',
    _0x5d5209;

if ($.isNode()) {
    Object.keys(_0x139fe9).forEach(_0x518487 => {
        _0x550ac0.push(_0x139fe9[_0x518487]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x550ac0 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x5cb667 => _0x5cb667.cookie)].filter(_0x427c44 => !!_0x427c44);

!(async () => {
    if (!_0x550ac0[0]) {
        const _0x438f8d = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x438f8d);
        return;
    }

    $.log('\n有问题联系TG-> https://t.me/dylan_jdpro\n');

    for (let _0xdf5811 = 0; _0xdf5811 < _0x550ac0.length; _0xdf5811++) {
        if (_0x550ac0[_0xdf5811]) {
            _0x190924 = _0x550ac0[_0xdf5811], $.UserName = decodeURIComponent(_0x190924.match(/pt_pin=([^; ]+)(?=;?)/) && _0x190924.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0xdf5811 + 1, $.isLogin = true, $.nickName = '', await _0x206617(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x3235ed = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x3235ed);
                $.isNode() && (await _0x3dcdaa.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            await _0x1d0270(), await $.wait(500);
            if (_0x5d5209 > 10) await _0x4fa6a9(); else {
                $.log('过期不到10个，不洗也罢，留给需要的人！\n');
                continue;
            }
            await $.wait(500), await _0x1d8e42(), await $.wait(2000);
        }
    }
})().catch(_0x8b6d98 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x8b6d98 + '!', '');
}).finally(() => {
    $.done();
});

async function _0x4fa6a9() {
    let _0x108a86 = Math.ceil(_0x5d5209 / 100) * 100;

    if (_0x5d5209 >= 100) _0x108a86 = _0x5d5209;
    if (_0x108a86 >= 500) _0x108a86 = 500;
    $.log('开始兑换500积分\n'), await _0x43b5d3(1, 500);

    for (let _0x79e5a4 = 0; _0x79e5a4 < 3 && $.sflag; _0x79e5a4++) {
        await $.wait(2000), await _0x43b5d3(1, 500);
    }
}

function _0x1d0270() {
    return new Promise(async _0x577ef4 => {
        const _0x1940fd = {
            'Accept': '*/*',
            'Host': 'wq.jd.com',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-cn',
            'Connection': 'keep-alive',
            'Referer': 'https://wqs.jd.com/promote/201801/bean/mybean.html',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.1 Mobile/15E148 Safari/604.1'
        };
        _0x1940fd.Cookie = _0x190924;
        const _0x36be2e = {
            'url': 'https://wq.jd.com/activep3/singjd/queryexpirejingdou?_=' + Date.now() + '&g_login_type=1&sceneval=2',
            'headers': _0x1940fd
        };
        $.get(_0x36be2e, (_0x1ccdd8, _0x7ef06d, _0x3c556e) => {
            try {
                _0x1ccdd8 ? (console.log('' + JSON.stringify(_0x1ccdd8)), console.log('getexpirebeans API请求失败，请检查网路重试')) : _0x3c556e ? (_0x3c556e = JSON.parse(_0x3c556e.slice(23, -13)), _0x5d5209 = 0, _0x3c556e.ret === 0 && (_0x3c556e.expirejingdou.forEach(_0x1aca43 => {
                    _0x5d5209 += _0x1aca43.expireamount;
                }), $.log('近七天将过期京豆' + _0x5d5209 + '个\n'))) : console.log('京东服务器返回空数据');
            } catch (_0x3850c0) {
                $.logErr(_0x3850c0, _0x7ef06d);
            } finally {
                _0x577ef4();
            }
        });
    });
}

function _0x1d8e42() {
    return new Promise(async _0x2f7ba2 => {
        $.post(_0xa54a6f('integralHistory', '[{"pin":"$cooMrdGatewayUid$", "pageSize":10,"pageNo":1}]'), (_0x3e08e1, _0x4b031d, _0x567a1e) => {
            try {
                if (_0x3e08e1) {
                    $.log('' + JSON.stringify(_0x3e08e1)), $.log(' API请求失败，请检查网路重试');
                } else {
                    _0x567a1e = JSON.parse(_0x567a1e);

                    if (_0x567a1e.success) {
                        $.log('积分收支记录：');

                        let _0x37c0d3 = _0x567a1e.content.slice(0, 7);

                        _0x37c0d3.forEach(_0x3dcf25 => {
                            console.log(_0x3dcf25.sceneName + '：' + _0x3dcf25.integration + ' at ' + new Date(_0x3dcf25.createTime).toLocaleString());
                        });
                    }
                }
            } catch (_0x214990) {
                $.log(_0x214990, _0x4b031d);
            } finally {
                _0x2f7ba2();
            }
        });
    });
}

function _0x43b5d3(_0x4485a6, _0xda4064) {
    let _0x32094e;

    $.sflag = false, _0x4485a6 == 1 ? _0x32094e = '京豆兑换物流积分' : _0x32094e = '物流积分兑换京豆';

    let _0x499d15 = _0x528ac0('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

    let _0x5a198c = '[{"businessNo":"' + _0x499d15 + '","title":"' + _0x32094e + '","pin" : "$cooMrdGatewayUid$","type":' + _0x4485a6 + ',"transferNumber":' + _0xda4064 + ' }]';

    return new Promise(_0x4eac2b => {
        $.post(_0xa54a6f('transfer', _0x5a198c), (_0x46eb0f, _0x33a373, _0x347be0) => {
            try {
                if (_0x46eb0f) $.log(JSON.stringify(_0x46eb0f)), $.log('请求失败'); else {
                    _0x347be0 = JSON.parse(_0x347be0);

                    if (_0x347be0.code == 1) {
                        $.log('兑换成功！\n');
                    } else _0x347be0.code == 2005 ? $.log('今日兑换额度已达上限，明日赶早！\n') : ($.sflag = true, console.log(JSON.stringify(_0x347be0)), console.log('\n兑换失败，重试\n'));
                }
            } catch (_0x17c97d) {
                $.log(_0x17c97d, _0x33a373);
            } finally {
                _0x4eac2b();
            }
        });
    });
}


function _0xa54a6f(_0x568460, _0x204654) {
    const _0x4809e8 = {
        'Accept-Encoding': 'gzip, deflate, br',
        'access': 'H5',
        'Accept-Language': 'zh-cn',
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=utf-8',
        'Referer': 'https://jingcai-h5.jd.com/',
        'AppParams': '{"appid":158,"ticket_type":"m"}',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.1 Mobile/16A366 Safari/604.1',
        'LOP-DN': 'jingcai.jd.com'
    };
    _0x4809e8.Accept = '*/*', _0x4809e8.Cookie = _0x190924;
    _0x4809e8['Accept-Language'] = 'zh-cn';
    const _0x224465 = {};
    return _0x224465.url = 'https://lop-proxy.jd.com/JingIntegralApi/' + _0x568460, _0x224465.headers = _0x4809e8, _0x224465.body = _0x204654, _0x224465;
}

function _0x528ac0(_0x3ec19f = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x4649b7 = 0) {
    return _0x3ec19f.replace(/[xy]/g, function (_0x2b2780) {
        {
            var _0x288a38 = Math.random() * 16 | 0,
                _0x73c8e3 = _0x2b2780 == 'x' ? _0x288a38 : _0x288a38 & 3 | 8;

            return _0x4649b7 ? busNo = _0x73c8e3.toString(36).toUpperCase() : busNo = _0x73c8e3.toString(36), busNo;
        }
    });
}

function _0x206617() {
    return new Promise(async _0x40375c => {
        const _0x389380 = {
            'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
            'headers': {
                'Host': 'wq.jd.com',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': _0x190924,
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Accept-Language': 'zh-cn',
                'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
        $.get(_0x389380, (_0xac0bd8, _0x504b39, _0x264976) => {
            try {
                if (_0xac0bd8) $.logErr(_0xac0bd8); else {
                    if (_0x264976) {
                        _0x264976 = JSON.parse(_0x264976);

                        if (_0x264976.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }

                        _0x264976.retcode === 0 && _0x264976.data && _0x264976.data.hasOwnProperty('userInfo') && ($.nickName = _0x264976.data.userInfo.baseInfo.nickname);
                    } else console.log('京东服务器返回空数据');
                }
            } catch (_0x283473) {
                $.logErr(_0x283473);
            } finally {
                _0x40375c();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }