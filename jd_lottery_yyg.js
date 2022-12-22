/*
入口：https://prodev.m.jd.com/mall/active/2u1ZhLtcmRWeBPLf8mWqPRWwvXQV/index.html
32 1 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_lottery_yyg.js
updatetime:2022/12/20
 */
const $ = new Env('医药馆抽豆');




const _0x489f45 = $.isNode() ? require('./sendNotify') : '',
    _0x8ae135 = require('./function/dylant.js'),
    _0x53e02a = $.isNode() ? require('./jdCookie.js') : '';

let _0xf21b18 = [],
    _0x3a7545 = '';

if ($.isNode()) {
    Object.keys(_0x53e02a).forEach(_0x117632 => {
        _0xf21b18.push(_0x53e02a[_0x117632]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else _0xf21b18 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x3cf1c2 => _0x3cf1c2.cookie)].filter(_0x255165 => !!_0x255165);

$.appid = 'babel_2VHitkF6cFidt2V7Asbg13JKG7Pw', $.scid = 'lottery', $.suc = 'no', $.projectId = '3mJmSwhYEknWd71Mu3CaHkEbTHHm', $.activity_id = $.appid.split('_')[1], $.ver = '1.0.1';
$.encdata = 'AF4FCDFFB27D9E693CB1DAB42958D17D4318C0B7822E193F649E3A9A118CBFA90AB5E6CD3E0BF0F5D558A13D5C43A9044F929339FBFE0D5B0CDE4AB0973D2F1E', !(async () => {
    if (!_0xf21b18[0]) {
        const _0x5579b7 = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x5579b7);
        return;
    }

    for (let _0x2f4298 = 0; _0x2f4298 < _0xf21b18.length; _0x2f4298++) {
        if (_0xf21b18[_0x2f4298]) {
            _0x3a7545 = _0xf21b18[_0x2f4298], $.UserName = decodeURIComponent(_0x3a7545.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3a7545.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2f4298 + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.limit = false, $.UUID = _0x4ccf0e('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), $.jdk = _0x4ccf0e('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), _0x24898a(), $.joytoken = '', await _0x4c425f(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x47f2c1 = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x47f2c1);
                $.isNode() && (await _0x489f45.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            if ($.hotflag) {
                console.log('\n开始火爆了，等段时间再运行吧！\n');
                return;
            }

            await _0x4da170(), await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0x41471e => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x41471e + '!', '');
}).finally(() => {
    $.done();
});

async function _0x4da170() {
    await _0x257602($.projectId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskList) for (const _0x2a3923 of $.taskList) {
        if ($.limit) break;

        if (_0x2a3923.ext.extraType !== 'brandMemberList' && _0x2a3923.ext.extraType !== 'assistTaskDetail' && !$.hotflag) {
            if (_0x2a3923.assignmentName.indexOf('抽奖') > -1) $.rewardId = _0x2a3923.encryptAssignmentId;

            if (_0x2a3923.completionCnt < _0x2a3923.assignmentTimesLimit) {
                let _0x3936d2 = _0x2a3923.assignmentTimesLimit - _0x2a3923.completionCnt;

                $.log('任务：' + _0x2a3923.assignmentName + ',去完成');

                if (_0x2a3923.ext) {
                    _0x2a3923.ext.extraType === 'sign1' && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x2a3923.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                    for (let _0x31f3b8 of _0x2a3923.ext.productsInfo || []) {
                        if (_0x3936d2 === 0) break;
                        _0x31f3b8.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x31f3b8.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }

                    for (let _0x284a81 of _0x2a3923.ext.shoppingActivity || []) {
                        if (_0x3936d2 === 0) break;
                        _0x284a81.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x284a81.advId, 1), _0x2a3923.ext.waitDuration && (await $.wait(_0x2a3923.ext.waitDuration * 1000), await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x284a81.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }

                    for (let _0x1df2d5 of _0x2a3923.ext.browseShop || []) {
                        if (_0x3936d2 === 0) break;
                        _0x1df2d5.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x1df2d5.itemId, 1), _0x2a3923.ext.waitDuration && (await $.wait(_0x2a3923.ext.waitDuration * 1000), await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x1df2d5.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }

                    for (let _0x4e231b of _0x2a3923.ext.followShop || []) {
                        if (_0x3936d2 === 0) break;
                        _0x4e231b.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x4e231b.itemId, 1), _0x2a3923.ext.waitDuration && (await $.wait(_0x2a3923.ext.waitDuration * 1000), await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x4e231b.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }

                    for (let _0x232283 of _0x2a3923.ext.addCart || []) {
                        if (_0x3936d2 === 0) break;
                        _0x232283.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x232283.itemId, 1), _0x2a3923.ext.waitDuration && (await $.wait(_0x2a3923.ext.waitDuration * 1000), await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x232283.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }

                    for (let _0x106cab of _0x2a3923.ext.followChannel || []) {
                        if (_0x3936d2 === 0) break;
                        _0x106cab.status === 1 && (await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x106cab.itemId, 1), _0x2a3923.ext.waitDuration && (await $.wait(_0x2a3923.ext.waitDuration * 1000), await _0x266d37($.projectId, _0x2a3923.encryptAssignmentId, _0x106cab.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x3936d2--;
                    }
                }
            } else $.log('任务：' + _0x2a3923.assignmentName + ',已完成');
        }
    } else $.log('没有获取到活动信息');
    $.nolotty = false, console.log('\n开始抽奖...');

    for (let _0x50b5a7 of Array(5)) {
        if ($.nolotty) break;
        await _0x434515($.projectId, $.rewardId), await $.wait(1000);
    }
}

async function _0x266d37(_0x241b9a, _0x471140, _0x58dad5, _0x3c1e80) {
    let _0x4f5d88 = await _0x8ae135.geturl($);

    const _0x567f1f = {
        'forceBot': '1',
        ..._0x4f5d88
    },
        _0x46173d = {
            'sourceCode': 'acerwq20220316',
            'activity_id': '3YDEucGmCvu1uNmyq4GHMMgwczjE',
            'template_id': '00026961',
            'floor_id': '88627972'
        };
    _0x46173d.encryptProjectId = _0x241b9a, _0x46173d.encryptAssignmentId = _0x471140, _0x46173d.itemId = _0x58dad5;
    _0x46173d.extParam = _0x567f1f;
    _0x46173d.enc = $.enc;
    let _0x533e5e = _0x46173d;
    return new Promise(_0x1a4324 => {
        $.post(_0x406896('doInteractiveAssignment', _0x533e5e), async (_0x2018c0, _0x58ea06, _0x3e20d1) => {
            try {
                if (_0x2018c0) $.log('' + _0x2018c0), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x3e20d1 = JSON.parse(_0x3e20d1);

                    if (_0x3e20d1.subCode == 0) {
                        console.log(_0x58dad5 + ' ' + _0x3e20d1.msg);
                        if (_0x3e20d1.msg.indexOf('火爆') > -1) $.hotflag = true;
                        if (_0x3e20d1.msg.indexOf('未通过') > -1) $.limit = true;
                    } else $.log(JSON.stringify(_0x3e20d1));
                }
            } catch (_0x88b5f0) {
                $.logErr(_0x88b5f0, _0x58ea06);
            } finally {
                _0x1a4324(_0x3e20d1);
            }
        });
    });
}

async function _0x434515(_0x43242a, _0x271088) {
    let _0x3eacb2 = await _0x8ae135.geturl($);

    const _0x5635e9 = {
        'exchangeNum': 0x1
    };
    const _0x44da2d = {
        'forceBot': '1',
        ..._0x3eacb2
    },
        _0x23e921 = {
            'sourceCode': 'acerwq20220316',
            'completionFlag': true,
            'lat': '',
            'lng': '',
            'template_id': '00026961',
            'floor_id': '88627972'
        };
    _0x23e921.encryptProjectId = _0x43242a, _0x23e921.encryptAssignmentId = _0x271088;
    _0x23e921.ext = _0x5635e9;
    _0x23e921.extParam = _0x44da2d, _0x23e921.activity_id = $.activity_id;
    _0x23e921.enc = $.enc;
    let _0x393310 = _0x23e921;
    return new Promise(_0x249064 => {
        $.post(_0x406896('doInteractiveAssignment', _0x393310), async (_0x19d4fa, _0x33df72, _0x370ea6) => {
            try {
                if (_0x19d4fa) $.log('' + _0x19d4fa), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x370ea6 = JSON.parse(_0x370ea6);

                    if (_0x370ea6.subCode == 0) {
                        if (_0x370ea6.rewardsInfo.successRewards && JSON.stringify(_0x370ea6.rewardsInfo.successRewards) !== '{}') _0x370ea6.rewardsInfo.successRewards['3'][0] ? $.log('中奖啦：' + _0x370ea6.rewardsInfo.successRewards['3'][0].rewardName) : $.log('空气！'); else _0x370ea6.rewardsInfo.failRewards !== undefined || _0x370ea6.rewardsInfo.successRewards === undefined ? $.log('啥都没有！') : ($.log(_0x370ea6.msg), $.nolotty = true);
                    } else $.log(_0x370ea6.msg), $.nolotty = true;
                }
            } catch (_0x1f8270) {
                $.logErr(_0x1f8270, _0x33df72);
            } finally {
                _0x249064(_0x370ea6);
            }
        });
    });
}

function _0x257602(_0x25545b) {
    const _0x9a16bc = {
        'rewardEncryptAssignmentId': null,
        'needNum': 0x32
    };
    const _0x479ab0 = {
        'sourceCode': 'acerwq20220316',
        'lat': '3',
        'lng': ''
    };
    _0x479ab0.encryptProjectId = _0x25545b;
    _0x479ab0.ext = _0x9a16bc;
    let _0x37215a = _0x479ab0;
    return new Promise(_0x49a83e => {
        $.post(_0x406896('queryInteractiveInfo', _0x37215a), async (_0x335c0c, _0x1bda33, _0xfd8a96) => {
            try {
                _0x335c0c ? ($.log('' + _0x335c0c), $.log($.name + ' API请求失败，请检查网路重试')) : _0xfd8a96 ? (_0xfd8a96 = JSON.parse(_0xfd8a96), $.taskList = _0xfd8a96.assignmentList) : $.log('没有返回数据');
            } catch (_0xccc898) {
                $.logErr(_0xccc898, _0x1bda33);
            } finally {
                _0x49a83e(_0xfd8a96);
            }
        });
    });
}

function _0x406896(_0x1656c9, _0x2ccee8) {
    const _0xc7a2fb = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://prodev.m.jd.com',
        'Referer': 'https://prodev.m.jd.com/'
    };
    _0xc7a2fb['User-Agent'] = $.UA, _0xc7a2fb.Cookie = _0x3a7545;
    return {
        'url': 'https://api.m.jd.com/client.action/?functionId=' + _0x1656c9 + '&body=' + escape(JSON.stringify(_0x2ccee8)) + '&appid=babelh5&sign=11',
        'headers': _0xc7a2fb
    };
}

function _0x4ccf0e(_0x25ea5b = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x497319 = 0) {
    return _0x25ea5b.replace(/[xy]/g, function (_0x2ec39a) {
        var _0x5f342e = 16 * Math.random() | 0,
            _0x2b9c15 = 'x' == _0x2ec39a ? _0x5f342e : 3 & _0x5f342e | 8;

        return uuid = _0x497319 ? _0x2b9c15.toString(36).toUpperCase() : _0x2b9c15.toString(36), uuid;
    });
}

function _0x24898a() {
    let _0xced1f9 = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
        _0x3eb92a = ['9', '10', '11', '12'],
        _0x335536 = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x409784 = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0xced1f9[Math.floor(Math.random() * _0xced1f9.length)], $.iv = _0x3eb92a[Math.floor(Math.random() * _0x3eb92a.length)], $.av = _0x335536[Math.floor(Math.random() * _0x335536.length)], $.bv = _0x409784[Math.floor(Math.random() * _0x409784.length)], getstr = function (_0x4f19d9) {
        let _0x44373d = '',
            _0x5346a9 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x417bcc = 0; _0x417bcc < _0x4f19d9; _0x417bcc++) {
            let _0x2951db = Math.round(Math.random() * (_0x5346a9.length - 1));

            _0x44373d += _0x5346a9.substring(_0x2951db, _0x2951db + 1);
        }

        return _0x44373d;
    };

    let _0x93ea0b = Buffer.from(getstr(16), 'utf8').toString('base64'),
        _0x413797 = Buffer.from(getstr(16), 'utf8').toString('base64');

    const _0x418d68 = {
        'sv': 'CJS=',
        'ov': 'CzO='
    };
    _0x418d68.ad = _0x93ea0b, _0x418d68.od = _0x413797;
    _0x418d68.ud = _0x93ea0b;
    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0x4c425f() {
    return new Promise(_0x15a62b => {
        const _0x11bc31 = {
            'referer': 'https://h5.m.jd.com/'
        };
        _0x11bc31.Cookie = _0x3a7545;
        _0x11bc31['User-Agent'] = $.UA;
        const _0x46f062 = {
            'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
            'timeout': 0x2710
        };
        _0x46f062.headers = _0x11bc31;
        const _0x1095cb = _0x46f062;
        $.get(_0x1095cb, (_0x5bf5ea, _0x5e6ae0, _0x34f014) => {
            try {
                if (_0x34f014) {
                    _0x34f014 = JSON.parse(_0x34f014);

                    if (_0x34f014.islogin === '1') { } else _0x34f014.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x5a71ec) {
                console.log(_0x5a71ec);
            } finally {
                _0x15a62b();
            }
        });
    });
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }