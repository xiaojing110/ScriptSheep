/*
入口：京东app-搜小时购-抽888
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_lotty888.js
updatetime:2022/12/20 fix
 */
const $ = new Env('小时购抽888豆-加密');

const _0x187ef2 = $.isNode() ? require('./sendNotify') : '';

const _0x5cf8a5 = require('./function/dylant.js'),
    _0x2c2f70 = $.isNode() ? require('./jdCookie.js') : '';

let _0x5047cf = [],
    _0x5ad1b7 = '';

if ($.isNode()) {
    Object.keys(_0x2c2f70).forEach(_0x2431e2 => {
        _0x5047cf.push(_0x2c2f70[_0x2431e2]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else _0x5047cf = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x3cfdb6 => _0x3cfdb6.cookie)].filter(_0x2f6404 => !!_0x2f6404);

$.appid = 'babel_2T8MxyGmn4CQtGJ1asZybjMvakmR', $.scid = 'lottery';
$.suc = 'no', $.projectId = '3iGVUA3HQDpUvpGihdZEoKSBJqd6', $.enc = 'BB363561D6F82DC5CF2D785E7513E8E867C2D95DDE7CB6DBAA09FF3118D166607E92D476574D8A296263E5ACCDF7216F3D6C222D1E5EAE668D8E9EC463062982', $.ver = '1.0.1', !(async () => {
    if (!_0x5047cf[0]) {
        const _0x5dae56 = {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x5dae56);
        return;
    }

    for (let _0x3884e1 = 0; _0x3884e1 < _0x5047cf.length; _0x3884e1++) {
        if (_0x5047cf[_0x3884e1]) {
            _0x5ad1b7 = _0x5047cf[_0x3884e1], $.UserName = decodeURIComponent(_0x5ad1b7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5ad1b7.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3884e1 + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.limit = false, $.UUID = _0x3dae07('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), $.jdk = _0x3dae07('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), _0x48b361(), $.joytoken = '', await _0x14188a(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x311fec = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x311fec);
                $.isNode() && (await _0x187ef2.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            if ($.hotflag) {
                console.log('\n开始火爆了，等段时间再运行吧！\n');
                return;
            }

            await _0x3f87d5(), await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0xa70180 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0xa70180 + '!', '');
}).finally(() => {
    $.done();
});

async function _0x3f87d5() {
    await _0x3a2be8($.projectId);
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    if ($.taskList) for (const _0x5bbc57 of $.taskList) {
        if ($.limit) break;

        if (_0x5bbc57.ext.extraType !== 'brandMemberList' && _0x5bbc57.ext.extraType !== 'assistTaskDetail' && !$.hotflag) {
            if (_0x5bbc57.assignmentName.indexOf('抽奖') > -1) $.rewardId = _0x5bbc57.encryptAssignmentId;

            if (_0x5bbc57.completionCnt < _0x5bbc57.assignmentTimesLimit) {
                let _0x59b6ab = _0x5bbc57.assignmentTimesLimit - _0x5bbc57.completionCnt;

                $.log('任务：' + _0x5bbc57.assignmentName + ',去完成');

                if (_0x5bbc57.ext) {
                    _0x5bbc57.ext.extraType === 'sign1' && (await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x5bbc57.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                    for (let _0x5599d5 of _0x5bbc57.ext.productsInfo || []) {
                        if (_0x59b6ab === 0) break;
                        _0x5599d5.status === 1 && (await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x5599d5.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x59b6ab--;
                    }

                    for (let _0x104413 of _0x5bbc57.ext.shoppingActivity || []) {
                        if (_0x59b6ab === 0) break;
                        _0x104413.status === 1 && (await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x104413.advId, 1), _0x5bbc57.ext.waitDuration && (await $.wait(_0x5bbc57.ext.waitDuration * 1000), await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x104413.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x59b6ab--;
                    }

                    for (let _0x5a00b0 of _0x5bbc57.ext.browseShop || []) {
                        if (_0x59b6ab === 0) break;
                        _0x5a00b0.status === 1 && (await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x5a00b0.itemId, 1), _0x5bbc57.ext.waitDuration && (await $.wait(_0x5bbc57.ext.waitDuration * 1000), await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x5a00b0.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x59b6ab--;
                    }

                    for (let _0x54cca4 of _0x5bbc57.ext.addCart || []) {
                        if (_0x59b6ab === 0) break;
                        _0x54cca4.status === 1 && (await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x54cca4.itemId, 1), _0x5bbc57.ext.waitDuration && (await $.wait(_0x5bbc57.ext.waitDuration * 1000), await _0x17c735($.projectId, _0x5bbc57.encryptAssignmentId, _0x54cca4.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x59b6ab--;
                    }
                }
            } else $.log('任务：' + _0x5bbc57.assignmentName + ',已完成');
        }
    } else $.log('没有获取到活动信息');
    $.nolotty = false;
    console.log('\n开始抽奖...');

    for (let _0x23518a of Array(4)) {
        if ($.nolotty) break;
        await _0x876d32($.projectId), await $.wait(1000);
    }
}

async function _0x17c735(_0x5a4e18, _0x48602c, _0x132358, _0x5d8035) {
    let _0xd4f0f2 = await _0x5cf8a5.geturl($);

    const _0x2230b4 = {
        'forceBot': '1',
        ..._0xd4f0f2
    },
        _0x322c25 = {
            'sourceCode': 'acerwq20220316',
            'activity_id': '2T8MxyGmn4CQtGJ1asZybjMvakmR',
            'template_id': '00026961',
            'floor_id': '86763556'
        };
    _0x322c25.encryptProjectId = _0x5a4e18, _0x322c25.encryptAssignmentId = _0x48602c, _0x322c25.itemId = _0x132358, _0x322c25.extParam = _0x2230b4;
    _0x322c25.enc = $.encdata;
    let _0x2f4fec = _0x322c25;
    return new Promise(_0x4065fa => {
        $.post(_0x5dd9a5('doInteractiveAssignment', _0x2f4fec), async (_0x1d906e, _0x5583de, _0x3fb2fd) => {
            try {
                if (_0x1d906e) $.log('' + _0x1d906e), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    if (_0x3fb2fd) {
                        _0x3fb2fd = JSON.parse(_0x3fb2fd), console.log(_0x132358 + ' ' + _0x3fb2fd.msg);
                        if (_0x3fb2fd.msg.indexOf('火爆') > -1) $.hotflag = true;
                        if (_0x3fb2fd.msg.indexOf('未通过') > -1) $.limit = true;
                    } else $.log('没有返回数据');
                }
            } catch (_0x106fe1) {
                $.logErr(_0x106fe1, _0x5583de);
            } finally {
                _0x4065fa(_0x3fb2fd);
            }
        });
    });
}

async function _0x876d32(_0x13913a) {
    let _0x2dd583 = await _0x5cf8a5.geturl($);

    const _0x41e348 = {
        'exchangeNum': 0x1
    };
    const _0xe2bc9 = {
        'forceBot': '1',
        ..._0x2dd583
    },
        _0x52bc1f = {
            'sourceCode': 'acerwq20220316',
            'completionFlag': true,
            'lat': '',
            'lng': '',
            'template_id': '00026961',
            'floor_id': '86763556'
        };
    _0x52bc1f.encryptProjectId = _0x13913a, _0x52bc1f.encryptAssignmentId = $.rewardId, _0x52bc1f.ext = _0x41e348, _0x52bc1f.extParam = _0xe2bc9;
    _0x52bc1f.activity_id = $.activity_id;
    _0x52bc1f.enc = $.encdata;
    let _0x582d96 = _0x52bc1f;
    return new Promise(_0x4d2507 => {
        $.post(_0x5dd9a5('doInteractiveAssignment', _0x582d96), async (_0x2e891d, _0x1fb998, _0x492f94) => {
            try {
                if (_0x2e891d) $.log('' + _0x2e891d), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x492f94 = JSON.parse(_0x492f94);

                    if (_0x492f94.subCode == 0) {
                        if (_0x492f94.subCode == 0 && _0x492f94.rewardsInfo.successRewards['3']) $.log('中奖啦：' + _0x492f94.rewardsInfo.successRewards['3'][0].rewardName); else JSON.stringify(_0x492f94.rewardsInfo.successRewards) === '{}' ? $.log('啥都没有！') : ($.log(_0x492f94.msg), $.nolotty = true);
                    } else $.log(_0x492f94.msg), $.nolotty = true;
                }
            } catch (_0x21467d) {
                $.logErr(_0x21467d, _0x1fb998);
            } finally {
                _0x4d2507(_0x492f94);
            }
        });
    });
}

function _0x3a2be8(_0xebfcf1) {
    const _0xcd532a = {
        'rewardEncryptAssignmentId': null,
        'needNum': 0x32
    };
    const _0x34a78a = {
        'sourceCode': 'acerwq20220316',
        'lat': '3',
        'lng': ''
    };
    _0x34a78a.encryptProjectId = _0xebfcf1, _0x34a78a.ext = _0xcd532a;
    let _0x328248 = _0x34a78a;
    return new Promise(_0x1ed73e => {
        $.post(_0x5dd9a5('queryInteractiveInfo', _0x328248), async (_0x135747, _0x5a5c19, _0x345298) => {
            try {
                _0x135747 ? ($.log('' + _0x135747), $.log($.name + ' API请求失败，请检查网路重试')) : _0x345298 ? (_0x345298 = JSON.parse(_0x345298), $.taskList = _0x345298.assignmentList) : $.log('没有返回数据');
            } catch (_0x52fe08) {
                $.logErr(_0x52fe08, _0x5a5c19);
            } finally {
                _0x1ed73e(_0x345298);
            }
        });
    });
}

function _0x5dd9a5(_0x341090, _0x3e89ae) {
    const _0x30e520 = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://prodev.m.jd.com',
        'Referer': 'https://prodev.m.jd.com/'
    };
    _0x30e520['User-Agent'] = $.UA;
    _0x30e520.Cookie = _0x5ad1b7;
    return {
        'url': 'https://api.m.jd.com/client.action/?functionId=' + _0x341090 + '&body=' + escape(JSON.stringify(_0x3e89ae)) + '&appid=babelh5&sign=11',
        'headers': _0x30e520
    };
}

function _0x3dae07(_0x4a0798 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x2ba147 = 0) {
    return _0x4a0798.replace(/[xy]/g, function (_0x540c63) {
        var _0x13b57e = 16 * Math.random() | 0,
            _0xa18221 = 'x' == _0x540c63 ? _0x13b57e : 3 & _0x13b57e | 8;

        return uuid = _0x2ba147 ? _0xa18221.toString(36).toUpperCase() : _0xa18221.toString(36), uuid;
    });
}

function _0x48b361() {
    let _0x226f2d = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
        _0x954a89 = ['9', '10', '11', '12'];
    let _0x2c21d9 = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x7aa8de = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0x226f2d[Math.floor(Math.random() * _0x226f2d.length)], $.iv = _0x954a89[Math.floor(Math.random() * _0x954a89.length)], $.av = _0x2c21d9[Math.floor(Math.random() * _0x2c21d9.length)], $.bv = _0x7aa8de[Math.floor(Math.random() * _0x7aa8de.length)], getstr = function (_0x7dfac6) {
        let _0x27947d = '',
            _0x58c403 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x7440e5 = 0; _0x7440e5 < _0x7dfac6; _0x7440e5++) {
            let _0x2ff1f1 = Math.round(Math.random() * (_0x58c403.length - 1));

            _0x27947d += _0x58c403.substring(_0x2ff1f1, _0x2ff1f1 + 1);
        }

        return _0x27947d;
    };

    let _0x319cb0 = Buffer.from(getstr(16), 'utf8').toString('base64'),
        _0x2d7c0b = Buffer.from(getstr(16), 'utf8').toString('base64');

    const _0x4301ba = {
        'sv': 'CJS=',
        'ov': 'CzO='
    };
    _0x4301ba.ad = _0x319cb0, _0x4301ba.od = _0x2d7c0b;
    _0x4301ba.ud = _0x319cb0;
    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0x14188a() {
    return new Promise(async _0x30b157 => {
        const _0x1648eb = {
            'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
            'headers': {
                'Host': 'wq.jd.com',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': _0x5ad1b7,
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Accept-Language': 'zh-cn',
                'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
        $.get(_0x1648eb, (_0x247adb, _0x3afa95, _0x52b5b3) => {
            try {
                if (_0x247adb) $.logErr(_0x247adb); else {
                    if (_0x52b5b3) {
                        _0x52b5b3 = JSON.parse(_0x52b5b3);

                        if (_0x52b5b3.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }

                        _0x52b5b3.retcode === 0 && _0x52b5b3.data && _0x52b5b3.data.hasOwnProperty('userInfo') && ($.nickName = _0x52b5b3.data.userInfo.baseInfo.nickname);
                    } else $.log('京东服务器返回空数据');
                }
            } catch (_0x55f671) {
                $.logErr(_0x55f671);
            } finally {
                _0x30b157();
            }
        });
    });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }