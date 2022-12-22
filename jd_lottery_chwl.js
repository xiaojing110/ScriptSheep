/*
入口：https://prodev.m.jd.com/mall/active/3YDEucGmCvu1uNmyq4GHMMgwczjE/index.html
45 2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_lottery_chwl.js
updatetime:2022/12/20
 */
const $ = new Env('吃喝玩乐抽豆');


const _0xa183f0 = $.isNode() ? require('./sendNotify') : '',
    _0x115091 = require('./function/dylant.js'),
    _0x2ef079 = $.isNode() ? require('./jdCookie.js') : '';

let _0x53294d = [],
    _0x25757f = '';

if ($.isNode()) {
    Object.keys(_0x2ef079).forEach(_0x5d33db => {
        _0x53294d.push(_0x2ef079[_0x5d33db]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else _0x53294d = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x53736c => _0x53736c.cookie)].filter(_0x4e947a => !!_0x4e947a);

$.appid = 'babel_3YDEucGmCvu1uNmyq4GHMMgwczjE';
$.scid = 'lottery', $.suc = 'no', $.projectId = 'Lqn2eAQKCqPcMNwBG18H1smAF3y', $.rewardid = '387ZpY3xjL4MnZuwMWnSDtGYU24V', $.activity_id = $.appid.split('_')[1], $.ver = '1.0.1';
!(async () => {
    if (!_0x53294d[0]) {
        const _0x1300b5 = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x1300b5);
        return;
    }

    for (let _0x11f9db = 0; _0x11f9db < _0x53294d.length; _0x11f9db++) {
        if (_0x53294d[_0x11f9db]) {
            _0x25757f = _0x53294d[_0x11f9db], $.UserName = decodeURIComponent(_0x25757f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x25757f.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x11f9db + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.limit = false, $.UUID = _0x1ae34b('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), $.jdk = _0x1ae34b('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), _0x4ed478(), $.joytoken = '', await _0x5f41ce(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x1177e3 = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x1177e3);
                $.isNode() && (await _0xa183f0.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            if ($.hotflag) {
                console.log('\n开始火爆了，等段时间再运行吧！\n');
                return;
            }

            await _0x20e73e(), await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0x1aa40e => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1aa40e + '!', '');
}).finally(() => {
    $.done();
});

async function _0x20e73e() {
    await _0x524546($.projectId, $.rewardid), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskList) for (const _0x521e4e of $.taskList) {
        if ($.limit) break;

        if (_0x521e4e.ext.extraType !== 'brandMemberList' && _0x521e4e.ext.extraType !== 'assistTaskDetail' && !$.hotflag) {
            if (_0x521e4e.completionCnt < _0x521e4e.assignmentTimesLimit) {
                let _0xab09a5 = _0x521e4e.assignmentTimesLimit - _0x521e4e.completionCnt;

                $.log('任务：' + _0x521e4e.assignmentName + ',去完成');

                if (_0x521e4e.ext) {
                    _0x521e4e.ext.extraType === 'sign1' && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x521e4e.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                    for (let _0x4b2b93 of _0x521e4e.ext.productsInfo || []) {
                        if (_0xab09a5 === 0) break;
                        _0x4b2b93.status === 1 && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x4b2b93.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0xab09a5--;
                    }

                    for (let _0x1d207d of _0x521e4e.ext.shoppingActivity || []) {
                        if (_0xab09a5 === 0) break;
                        _0x1d207d.status === 1 && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x1d207d.advId, 1), _0x521e4e.ext.waitDuration && (await $.wait(_0x521e4e.ext.waitDuration * 1000), await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x1d207d.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0xab09a5--;
                    }

                    for (let _0x215178 of _0x521e4e.ext.browseShop || []) {
                        if (_0xab09a5 === 0) break;
                        _0x215178.status === 1 && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x215178.itemId, 1), _0x521e4e.ext.waitDuration && (await $.wait(_0x521e4e.ext.waitDuration * 1000), await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x215178.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0xab09a5--;
                    }

                    for (let _0x2a5e4f of _0x521e4e.ext.followShop || []) {
                        if (_0xab09a5 === 0) break;
                        _0x2a5e4f.status === 1 && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x2a5e4f.itemId, 1), _0x521e4e.ext.waitDuration && (await $.wait(_0x521e4e.ext.waitDuration * 1000), await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x2a5e4f.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0xab09a5--;
                    }

                    for (let _0x5b884b of _0x521e4e.ext.addCart || []) {
                        if (_0xab09a5 === 0) break;
                        _0x5b884b.status === 1 && (await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x5b884b.itemId, 1), _0x521e4e.ext.waitDuration && (await $.wait(_0x521e4e.ext.waitDuration * 1000), await _0x41e9b2($.projectId, _0x521e4e.encryptAssignmentId, _0x5b884b.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0xab09a5--;
                    }
                }
            } else $.log('任务：' + _0x521e4e.assignmentName + ',已完成');
        }
    } else $.log('没有获取到活动信息');
    $.nolotty = false;
    console.log('\n开始抽奖...');

    for (let _0x9eff64 of Array(4)) {
        if ($.nolotty) break;
        await _0x516dec($.projectId), await $.wait(1000);
    }
}

async function _0x41e9b2(_0x1500ea, _0x8c0e13, _0x26eae4, _0x483b31) {
    let _0xb1486 = await _0x115091.geturl($);

    const _0x2781db = {
        'forceBot': '1',
        ..._0xb1486
    };
    const _0x21397d = {
        'sourceCode': 'acerwq20220316',
        'activity_id': '3YDEucGmCvu1uNmyq4GHMMgwczjE',
        'template_id': '00026961',
        'floor_id': '88627972',
        'enc': '3CA595760B6BD6BFD70D027AB831682E3BA51D2B12E7B6B61C968EADE2E0BEF03F6370DC6660E852C72FC05C7E4FAF3F2579F353F6EC191FFC8F2DC3858E563B'
    };
    _0x21397d.encryptProjectId = _0x1500ea, _0x21397d.encryptAssignmentId = _0x8c0e13;
    _0x21397d.itemId = _0x26eae4, _0x21397d.extParam = _0x2781db;
    let _0x1f9a28 = _0x21397d;
    return new Promise(_0x362aac => {
        $.post(_0x43a895('doInteractiveAssignment', _0x1f9a28), async (_0x509c0a, _0x443a59, _0x1e7293) => {
            try {
                if (_0x509c0a) $.log('' + _0x509c0a), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x1e7293 = JSON.parse(_0x1e7293);

                    if (_0x1e7293.subCode == 0) {
                        console.log(_0x26eae4 + ' ' + _0x1e7293.msg);
                        if (_0x1e7293.msg.indexOf('火爆') > -1) $.hotflag = true;
                        if (_0x1e7293.msg.indexOf('未通过') > -1) $.limit = true;
                    } else $.log(JSON.stringify(_0x1e7293));
                }
            } catch (_0x398829) {
                $.logErr(_0x398829, _0x443a59);
            } finally {
                _0x362aac(_0x1e7293);
            }
        });
    });
}

async function _0x516dec(_0x52d4c8) {
    let _0x276790 = await _0x115091.geturl($);

    const _0x37dd95 = {
        'exchangeNum': 0x1
    };
    const _0x198196 = {
        'forceBot': '1',
        ..._0x276790
    },
        _0x3aa2af = {
            'sourceCode': 'acerwq20220316',
            'encryptAssignmentId': '387ZpY3xjL4MnZuwMWnSDtGYU24V',
            'completionFlag': true,
            'lat': '',
            'lng': '',
            'template_id': '00026961',
            'floor_id': '88627972',
            'enc': '3CA595760B6BD6BFD70D027AB831682E3BA51D2B12E7B6B61C968EADE2E0BEF03F6370DC6660E852C72FC05C7E4FAF3F2579F353F6EC191FFC8F2DC3858E563B'
        };
    _0x3aa2af.encryptProjectId = _0x52d4c8, _0x3aa2af.ext = _0x37dd95;
    _0x3aa2af.extParam = _0x198196;
    _0x3aa2af.activity_id = $.activity_id;
    let _0x43db83 = _0x3aa2af;
    return new Promise(_0x2c6337 => {
        $.post(_0x43a895('doInteractiveAssignment', _0x43db83), async (_0xf7d522, _0x4af7ed, _0x464f51) => {
            try {
                if (_0xf7d522) $.log('' + _0xf7d522), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x464f51 = JSON.parse(_0x464f51);

                    if (_0x464f51.subCode == 0) {
                        if (_0x464f51.rewardsInfo.successRewards && JSON.stringify(_0x464f51.rewardsInfo.successRewards) !== '{}') $.log('中奖啦：' + _0x464f51.rewardsInfo.successRewards['3'][0].rewardName); else JSON.stringify(_0x464f51.rewardsInfo.successRewards) === '{}' || _0x464f51.rewardsInfo.successRewards === undefined ? $.log('啥都没有！') : ($.log(_0x464f51.msg), $.nolotty = true);
                    } else $.log(_0x464f51.msg), $.nolotty = true;
                }
            } catch (_0x3cae81) {
                $.logErr(_0x3cae81, _0x4af7ed);
            } finally {
                _0x2c6337(_0x464f51);
            }
        });
    });
}

function _0x524546(_0x4d9a57, _0x32c8d3) {
    const _0x14727e = {
        'needNum': 0x32
    };
    _0x14727e.rewardEncryptAssignmentId = _0x32c8d3;
    const _0xef6118 = {
        'sourceCode': 'acerwq20220316',
        'lat': '3',
        'lng': ''
    };
    _0xef6118.encryptProjectId = _0x4d9a57;
    _0xef6118.ext = _0x14727e;
    let _0x3264ea = _0xef6118;
    return new Promise(_0x1d58e9 => {
        $.post(_0x43a895('queryInteractiveInfo', _0x3264ea), async (_0x1cf13b, _0x46fb08, _0x502530) => {
            try {
                _0x1cf13b ? ($.log('' + _0x1cf13b), $.log($.name + ' API请求失败，请检查网路重试')) : _0x502530 ? (_0x502530 = JSON.parse(_0x502530), $.taskList = _0x502530.assignmentList) : $.log('没有返回数据');
            } catch (_0x1b11c9) {
                $.logErr(_0x1b11c9, _0x46fb08);
            } finally {
                _0x1d58e9(_0x502530);
            }
        });
    });
}

function _0x43a895(_0x6ffd72, _0x2cfadf) {
    const _0x450760 = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://prodev.m.jd.com',
        'Referer': 'https://prodev.m.jd.com/'
    };
    _0x450760['User-Agent'] = $.UA;
    return _0x450760.Cookie = _0x25757f, {
        'url': 'https://api.m.jd.com/client.action/?functionId=' + _0x6ffd72 + '&body=' + escape(JSON.stringify(_0x2cfadf)) + '&appid=babelh5&sign=11',
        'headers': _0x450760
    };
}

function _0x1ae34b(_0x4b1ebe = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x4cc76a = 0) {
    return _0x4b1ebe.replace(/[xy]/g, function (_0x447a16) {
        var _0x275cac = 16 * Math.random() | 0,
            _0x4c1485 = 'x' == _0x447a16 ? _0x275cac : 3 & _0x275cac | 8;

        return uuid = _0x4cc76a ? _0x4c1485.toString(36).toUpperCase() : _0x4c1485.toString(36), uuid;
    });
}

function _0x4ed478() {
    let _0x429028 = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'];
    let _0xb33799 = ['9', '10', '11', '12'];
    let _0x306e3f = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x1142a6 = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0x429028[Math.floor(Math.random() * _0x429028.length)];
    $.iv = _0xb33799[Math.floor(Math.random() * _0xb33799.length)], $.av = _0x306e3f[Math.floor(Math.random() * _0x306e3f.length)], $.bv = _0x1142a6[Math.floor(Math.random() * _0x1142a6.length)], getstr = function (_0x4dd892) {
        let _0x2d0e93 = '',
            _0x441104 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x3a95c9 = 0; _0x3a95c9 < _0x4dd892; _0x3a95c9++) {
            let _0x39edb9 = Math.round(Math.random() * (_0x441104.length - 1));

            _0x2d0e93 += _0x441104.substring(_0x39edb9, _0x39edb9 + 1);
        }

        return _0x2d0e93;
    };

    let _0x58e8d4 = Buffer.from(getstr(16), 'utf8').toString('base64'),
        _0x5e5519 = Buffer.from(getstr(16), 'utf8').toString('base64');

    const _0x2d76a5 = {
        'sv': 'CJS=',
        'ov': 'CzO='
    };
    _0x2d76a5.ad = _0x58e8d4, _0x2d76a5.od = _0x5e5519, _0x2d76a5.ud = _0x58e8d4;
    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0x5f41ce() {
    return new Promise(_0x3a5fca => {
        const _0x16fd63 = {
            'referer': 'https://h5.m.jd.com/'
        };
        _0x16fd63.Cookie = _0x25757f;
        _0x16fd63['User-Agent'] = $.UA;
        const _0x13f9ce = {
            'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
            'timeout': 0x2710
        };
        _0x13f9ce.headers = _0x16fd63;
        const _0x45d998 = _0x13f9ce;
        $.get(_0x45d998, (_0x12ecd3, _0x2a5959, _0x484bb9) => {
            try {
                if (_0x484bb9) {
                    _0x484bb9 = JSON.parse(_0x484bb9);

                    if (_0x484bb9.islogin === '1') { } else _0x484bb9.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x72117e) {
                console.log(_0x72117e);
            } finally {
                _0x3a5fca();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }