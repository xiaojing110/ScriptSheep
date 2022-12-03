/*
入口：京东app-搜小时购-抽888
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_lotty888.js
updatetime:2022/12/2
 */
const $ = new Env('小时购抽888豆-加密');

const _0x3604c8 = $.isNode() ? require('./sendNotify') : '',
    _0x20ef7b = require('./function/dylant.js'),
    _0x5a19d7 = $.isNode() ? require('./jdCookie.js') : '';

let _0xd9b249 = [],
    _0x56d58c = '';

if ($.isNode()) {
    Object.keys(_0x5a19d7).forEach(_0x25bbba => {
        _0xd9b249.push(_0x5a19d7[_0x25bbba]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else _0xd9b249 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x6135dc => _0x6135dc.cookie)].filter(_0x63596f => !!_0x63596f);

$.appid = '50091', $.scid = 'XMFhPageh5', $.suc = 'yes', $.projectId = '3iGVUA3HQDpUvpGihdZEoKSBJqd6', !(async () => {
    if (!_0xd9b249[0]) {
        const _0x5a72df = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x5a72df);
        return;
    }

    for (let _0x125c04 = 0; _0x125c04 < _0xd9b249.length; _0x125c04++) {
        if (_0xd9b249[_0x125c04]) {
            _0x56d58c = _0xd9b249[_0x125c04], $.UserName = decodeURIComponent(_0x56d58c.match(/pt_pin=([^; ]+)(?=;?)/) && _0x56d58c.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x125c04 + 1, $.isLogin = true, $.nickName = '', message = '', $.hotflag = false, $.limit = false, $.UUID = _0x5d9995('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), $.jdk = _0x5d9995('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), _0x3cd4f9(), $.joytoken = '', await _0x5cfe98(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x53140a = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x53140a);
                $.isNode() && (await _0x3604c8.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            if ($.hotflag) {
                console.log('\n开始火爆了，等段时间再运行吧！\n');
                return;
            }

            await _0x940af2(), await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0xaf9996 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0xaf9996 + '!', '');
}).finally(() => {
    $.done();
});

async function _0x940af2() {
    await _0x552e4f(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    if ($.taskList) {
        for (const _0x53fe3b of $.taskList) {
            if ($.limit) break;

            if (_0x53fe3b.ext.extraType !== 'brandMemberList' && _0x53fe3b.ext.extraType !== 'assistTaskDetail' && !$.hotflag) {
                if (_0x53fe3b.completionCnt < _0x53fe3b.assignmentTimesLimit) {
                    let _0x1b572f = _0x53fe3b.assignmentTimesLimit - _0x53fe3b.completionCnt;

                    $.log('任务：' + _0x53fe3b.assignmentName + ',去完成');

                    if (_0x53fe3b.ext) {
                        _0x53fe3b.ext.extraType === 'sign1' && (await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x53fe3b.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                        for (let _0x136be7 of _0x53fe3b.ext.productsInfo || []) {
                            if (_0x1b572f === 0) break;
                            _0x136be7.status === 1 && (await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x136be7.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x1b572f--;
                        }

                        for (let _0x314268 of _0x53fe3b.ext.shoppingActivity || []) {
                            if (_0x1b572f === 0) break;

                            if (_0x314268.status === 1) {
                                await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x314268.advId, 1), _0x53fe3b.ext.waitDuration && (await $.wait(_0x53fe3b.ext.waitDuration * 1000), await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x314268.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }

                            _0x1b572f--;
                        }

                        for (let _0x4dec14 of _0x53fe3b.ext.browseShop || []) {
                            if (_0x1b572f === 0) break;
                            _0x4dec14.status === 1 && (await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x4dec14.itemId, 1), _0x53fe3b.ext.waitDuration && (await $.wait(_0x53fe3b.ext.waitDuration * 1000), await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x4dec14.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x1b572f--;
                        }

                        for (let _0x4e1d01 of _0x53fe3b.ext.addCart || []) {
                            if (_0x1b572f === 0) break;
                            _0x4e1d01.status === 1 && (await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x4e1d01.itemId, 1), _0x53fe3b.ext.waitDuration && (await $.wait(_0x53fe3b.ext.waitDuration * 1000), await _0x2bda52($.projectId, _0x53fe3b.encryptAssignmentId, _0x4e1d01.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x1b572f--;
                        }
                    }
                } else $.log('任务：' + _0x53fe3b.assignmentName + ',已完成');
            }
        }
    } else $.log('没有获取到活动信息');

    $.nolotty = false;
    console.log('\n开始抽奖...');

    for (let _0x180469 of Array(4)) {
        if ($.nolotty) break;
        await _0x532a00($.projectId), await $.wait(1000);
    }
}

async function _0x2bda52(_0x1a3283, _0x1ef3c2, _0x1ba8f1, _0x576214) {
    let _0x5dcb24 = await _0x20ef7b.geturl($);

    const _0x289853 = {
        'forceBot': '1',
        ..._0x5dcb24
    },
        _0x1d4cab = {
            'sourceCode': 'acerwq20220316',
            'activity_id': '2T8MxyGmn4CQtGJ1asZybjMvakmR',
            'template_id': '00026961',
            'floor_id': '86763556',
            'enc': ''
        };
    _0x1d4cab.encryptProjectId = _0x1a3283, _0x1d4cab.encryptAssignmentId = _0x1ef3c2;
    _0x1d4cab.itemId = _0x1ba8f1, _0x1d4cab.extParam = _0x289853;
    let _0x34ee81 = _0x1d4cab;
    return new Promise(_0x3d4f80 => {
        $.post(_0x3a24e6('doInteractiveAssignment', _0x34ee81), async (_0x369032, _0x2fe1b7, _0x182fd7) => {
            try {
                if (_0x369032) {
                    $.log('' + _0x369032), $.log($.name + ' API请求失败，请检查网路重试');
                } else {
                    if (_0x182fd7) {
                        _0x182fd7 = JSON.parse(_0x182fd7), console.log(_0x1ba8f1 + ' ' + _0x182fd7.msg);
                        if (_0x182fd7.msg.indexOf('火爆') > -1) $.hotflag = true;
                        if (_0x182fd7.msg.indexOf('未通过') > -1) $.limit = true;
                    } else $.log('没有返回数据');
                }
            } catch (_0x4f4d48) {
                $.logErr(_0x4f4d48, _0x2fe1b7);
            } finally {
                _0x3d4f80(_0x182fd7);
            }
        });
    });
}

async function _0x532a00(_0x31997d) {
    let _0x1687c7 = await _0x20ef7b.geturl($);

    const _0xd7ff75 = {
        'exchangeNum': 0x1
    };
    const _0x41faaf = {
        'forceBot': '1',
        ..._0x1687c7
    };
    const _0x2cbe5f = {
        'sourceCode': 'acerwq20220316',
        'completionFlag': true,
        'lat': '',
        'lng': '',
        'enc': '',
        'encryptAssignmentId': '2V1ndxzxvaLHr7sKNCdW59S9sVYw',
        'activity_id': '2T8MxyGmn4CQtGJ1asZybjMvakmR',
        'template_id': '00026961',
        'floor_id': '86763556'
    };
    _0x2cbe5f.encryptProjectId = _0x31997d;
    _0x2cbe5f.ext = _0xd7ff75, _0x2cbe5f.extParam = _0x41faaf;
    let _0x127aea = _0x2cbe5f;
    return new Promise(_0x202bc2 => {
        $.post(_0x3a24e6('doInteractiveAssignment', _0x127aea), async (_0x5092da, _0x1b7479, _0x46d5d2) => {
            try {
                if (_0x5092da) $.log('' + _0x5092da), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x46d5d2 = JSON.parse(_0x46d5d2);

                    if (_0x46d5d2.code == 0) {
                        if (_0x46d5d2.subCode == 0 && _0x46d5d2.rewardsInfo.successRewards['3']) $.log('中奖啦：' + _0x46d5d2.rewardsInfo.successRewards['3'][0].rewardName); else {
                            if (JSON.stringify(_0x46d5d2.rewardsInfo.successRewards) === '{}') $.log('啥都没有！'); else {
                                $.log(_0x46d5d2.msg), $.nolotty = true;
                            }
                        }
                    } else $.log('抽奖错误！'), $.nolotty = true;
                }
            } catch (_0x157b9e) {
                $.logErr(_0x157b9e, _0x1b7479);
            } finally {
                _0x202bc2(_0x46d5d2);
            }
        });
    });
}

function _0x552e4f(_0x4fdb3a) {
    const _0x36df6d = {
        'encryptProjectId': '3iGVUA3HQDpUvpGihdZEoKSBJqd6',
        'lat': '3',
        'lng': '',
        'sourceCode': 'acerwq20220316'
    };
    _0x36df6d.ext = {}, _0x36df6d.ext.rewardEncryptAssignmentId = '2V1ndxzxvaLHr7sKNCdW59S9sVYw', _0x36df6d.ext.needNum = 0x32;
    let _0x4765f7 = _0x36df6d;
    return new Promise(_0x5a38df => {
        $.post(_0x3a24e6('queryInteractiveInfo', _0x4765f7), async (_0x4674e9, _0x10f34e, _0x30befd) => {
            try {
                _0x4674e9 ? ($.log('' + _0x4674e9), $.log($.name + ' API请求失败，请检查网路重试')) : _0x30befd ? (_0x30befd = JSON.parse(_0x30befd), $.taskList = _0x30befd.assignmentList) : $.log('没有返回数据');
            } catch (_0x10315a) {
                $.logErr(_0x10315a, _0x10f34e);
            } finally {
                _0x5a38df(_0x30befd);
            }
        });
    });
}

function _0x3a24e6(_0x44c057, _0xaf9b18) {
    const _0x30799f = {
        'Origin': 'https://prodev.m.jd.com',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Referer': 'https://prodev.m.jd.com/'
    };
    _0x30799f['User-Agent'] = $.UA;
    return _0x30799f.Cookie = _0x56d58c, {
        'url': 'https://api.m.jd.com/client.action/?functionId=' + _0x44c057 + '&body=' + escape(JSON.stringify(_0xaf9b18)) + '&appid=babelh5&sign=11',
        'headers': _0x30799f
    };
}

function _0x5d9995(_0x7c1bae = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x44da2d = 0) {
    return _0x7c1bae.replace(/[xy]/g, function (_0x3b06ef) {
        {
            var _0x4eddd4 = 16 * Math.random() | 0,
                _0x1dffd8 = 'x' == _0x3b06ef ? _0x4eddd4 : 3 & _0x4eddd4 | 8;

            return uuid = _0x44da2d ? _0x1dffd8.toString(36).toUpperCase() : _0x1dffd8.toString(36), uuid;
        }
    });
}

function _0x3cd4f9() {
    let _0x143066 = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
        _0x1b738a = ['9', '10', '11', '12'],
        _0x2bd2b6 = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x12c32c = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0x143066[Math.floor(Math.random() * _0x143066.length)];
    $.iv = _0x1b738a[Math.floor(Math.random() * _0x1b738a.length)], $.av = _0x2bd2b6[Math.floor(Math.random() * _0x2bd2b6.length)], $.bv = _0x12c32c[Math.floor(Math.random() * _0x12c32c.length)], getstr = function (_0x10ebe6) {
        let _0x30ffbc = '',
            _0x11194c = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x2df7e5 = 0; _0x2df7e5 < _0x10ebe6; _0x2df7e5++) {
            let _0x248810 = Math.round(Math.random() * (_0x11194c.length - 1));

            _0x30ffbc += _0x11194c.substring(_0x248810, _0x248810 + 1);
        }

        return _0x30ffbc;
    };

    let _0x4d495c = Buffer.from(getstr(16), 'utf8').toString('base64'),
        _0x265195 = Buffer.from(getstr(16), 'utf8').toString('base64');

    let _0x5c8f43 = encodeURIComponent(JSON.stringify({
        'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
        'ts': Date.now(),
        'ridx': -1,
        'cipher': {
            'sv': 'CJS=',
            'ad': _0x4d495c,
            'od': _0x265195,
            'ov': 'CzO=',
            'ud': _0x4d495c
        },
        'ciphertype': 0x5,
        'version': '1.2.0',
        'appname': 'com.jingdong.app.mall'
    }));

    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0x5cfe98() {
    return new Promise(async _0x3ffccd => {
        const _0x45d63f = {
            'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
            'headers': {
                'Host': 'wq.jd.com',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': _0x56d58c,
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Accept-Language': 'zh-cn',
                'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
        $.get(_0x45d63f, (_0x1e3abb, _0x5367ca, _0x18f11e) => {
            try {
                if (_0x1e3abb) $.logErr(_0x1e3abb); else {
                    if (_0x18f11e) {
                        _0x18f11e = JSON.parse(_0x18f11e);

                        if (_0x18f11e.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }

                        _0x18f11e.retcode === 0 && _0x18f11e.data && _0x18f11e.data.hasOwnProperty('userInfo') && ($.nickName = _0x18f11e.data.userInfo.baseInfo.nickname);
                    } else $.log('京东服务器返回空数据');
                }
            } catch (_0x243b81) {
                $.logErr(_0x243b81);
            } finally {
                _0x3ffccd();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }