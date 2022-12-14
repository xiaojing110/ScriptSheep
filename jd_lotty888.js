/*
入口：京东app-搜小时购-抽888
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_lotty888.js
updatetime:2022/12/9 fix
 */
const $ = new Env('小时购抽888豆-加密');
const _0xd17853 = $.isNode() ? require('./sendNotify') : '',
    _0x4d1197 = require('./function/dylant.js');

const _0x51b668 = $.isNode() ? require('./jdCookie.js') : '';

let _0x407398 = [],
    _0x15e8e8 = '';

if ($.isNode()) {
    Object.keys(_0x51b668).forEach(_0x2cadaa => {
        _0x407398.push(_0x51b668[_0x2cadaa]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else _0x407398 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x907038 => _0x907038.cookie)].filter(_0xac2ecc => !!_0xac2ecc);

$.appid = '50091', $.scid = 'XMFhPageh5', $.suc = 'yes', $.projectId = '3iGVUA3HQDpUvpGihdZEoKSBJqd6';
!(async () => {
    if (!_0x407398[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });
        return;
    }

    for (let _0x387d19 = 0; _0x387d19 < _0x407398.length; _0x387d19++) {
        if (_0x407398[_0x387d19]) {
            _0x15e8e8 = _0x407398[_0x387d19], $.UserName = decodeURIComponent(_0x15e8e8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x15e8e8.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x387d19 + 1, $.isLogin = true, $.nickName = '', $.hotflag = false, $.limit = false, $.UUID = _0x338d4b('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), $.jdk = _0x338d4b('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), _0x1e3a4c(), $.joytoken = '', await _0xb2407b(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

            if (!$.isLogin) {
                const _0x455cb0 = {
                    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
                };
                $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x455cb0);
                $.isNode() && (await _0xd17853.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }

            if ($.hotflag) {
                console.log('\n开始火爆了，等段时间再运行吧！\n');
                return;
            }

            await _0x24f9d5(), await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
        }
    }
})().catch(_0xadab2d => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0xadab2d + '!', '');
}).finally(() => {
    $.done();
});

async function _0x24f9d5() {
    await _0xef1682(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    if ($.taskList) {
        for (const _0x4a5de4 of $.taskList) {
            if ($.limit) break;

            if (_0x4a5de4.ext.extraType !== 'brandMemberList' && _0x4a5de4.ext.extraType !== 'assistTaskDetail' && !$.hotflag) {
                if (_0x4a5de4.completionCnt < _0x4a5de4.assignmentTimesLimit) {
                    let _0x46d67e = _0x4a5de4.assignmentTimesLimit - _0x4a5de4.completionCnt;

                    $.log('任务：' + _0x4a5de4.assignmentName + ',去完成');

                    if (_0x4a5de4.ext) {
                        _0x4a5de4.ext.extraType === 'sign1' && (await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x4a5de4.ext.sign1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));

                        for (let _0xd9d8a1 of _0x4a5de4.ext.productsInfo || []) {
                            if (_0x46d67e === 0) break;
                            _0xd9d8a1.status === 1 && (await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0xd9d8a1.itemId), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x46d67e--;
                        }

                        for (let _0x5c5741 of _0x4a5de4.ext.shoppingActivity || []) {
                            if (_0x46d67e === 0) break;
                            _0x5c5741.status === 1 && (await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x5c5741.advId, 1), _0x4a5de4.ext.waitDuration && (await $.wait(_0x4a5de4.ext.waitDuration * 1000), await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x5c5741.advId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x46d67e--;
                        }

                        for (let _0x5ab887 of _0x4a5de4.ext.browseShop || []) {
                            if (_0x46d67e === 0) break;
                            _0x5ab887.status === 1 && (await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x5ab887.itemId, 1), _0x4a5de4.ext.waitDuration && (await $.wait(_0x4a5de4.ext.waitDuration * 1000), await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x5ab887.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))), _0x46d67e--;
                        }

                        for (let _0x426668 of _0x4a5de4.ext.addCart || []) {
                            if (_0x46d67e === 0) break;

                            if (_0x426668.status === 1) {
                                await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x426668.itemId, 1), _0x4a5de4.ext.waitDuration && (await $.wait(_0x4a5de4.ext.waitDuration * 1000), await _0x49896c($.projectId, _0x4a5de4.encryptAssignmentId, _0x426668.itemId, 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
                            }

                            _0x46d67e--;
                        }
                    }
                } else $.log('任务：' + _0x4a5de4.assignmentName + ',已完成');
            }
        }
    } else $.log('没有获取到活动信息');

    $.nolotty = false, console.log('\n开始抽奖...');

    for (let _0x2d952f of Array(4)) {
        if ($.nolotty) break;
        await _0x1b5f62($.projectId), await $.wait(1000);
    }
}

async function _0x49896c(_0x51f602, _0x14d6fc, _0x4ea0f5, _0x1077a5) {
    let _0x5d6e3e = await _0x4d1197.geturl($);

    const _0x2e22f5 = {
        'forceBot': '1',
        ..._0x5d6e3e
    };
    const _0x304fe6 = {
        'enc': '',
        'sourceCode': 'acerwq20220316',
        'activity_id': '2T8MxyGmn4CQtGJ1asZybjMvakmR',
        'template_id': '00026961',
        'floor_id': '86763556'
    };
    _0x304fe6.encryptProjectId = _0x51f602, _0x304fe6.encryptAssignmentId = _0x14d6fc, _0x304fe6.itemId = _0x4ea0f5, _0x304fe6.extParam = _0x2e22f5;
    let _0x56432d = _0x304fe6;
    return new Promise(_0x254f5a => {
        $.post(_0x2e64e1('doInteractiveAssignment', _0x56432d), async (_0x1b58a0, _0x5075da, _0x1683ee) => {
            try {
                if (_0x1b58a0) {
                    $.log('' + _0x1b58a0), $.log($.name + ' API请求失败，请检查网路重试');
                } else {
                    if (_0x1683ee) {
                        _0x1683ee = JSON.parse(_0x1683ee), console.log(_0x4ea0f5 + ' ' + _0x1683ee.msg);
                        if (_0x1683ee.msg.indexOf('火爆') > -1) $.hotflag = true;
                        if (_0x1683ee.msg.indexOf('未通过') > -1) $.limit = true;
                    } else {
                        $.log('没有返回数据');
                    }
                }
            } catch (_0x7c6403) {
                $.logErr(_0x7c6403, _0x5075da);
            } finally {
                _0x254f5a(_0x1683ee);
            }
        });
    });
}

async function _0x1b5f62(_0x41563f) {
    let _0x1c3d6a = await _0x4d1197.geturl($);

    const _0x14de77 = {
        'exchangeNum': 0x1
    };
    const _0x4d3436 = {
        'forceBot': '1',
        ..._0x1c3d6a
    },
        _0x504a66 = {
            'completionFlag': true,
            'lat': '',
            'lng': '',
            'enc': '',
            'sourceCode': 'acerwq20220316',
            'encryptAssignmentId': '2V1ndxzxvaLHr7sKNCdW59S9sVYw',
            'activity_id': '2T8MxyGmn4CQtGJ1asZybjMvakmR',
            'template_id': '00026961',
            'floor_id': '86763556'
        };
    _0x504a66.encryptProjectId = _0x41563f;
    _0x504a66.ext = _0x14de77;
    _0x504a66.extParam = _0x4d3436;
    let _0x3f4ea0 = _0x504a66;
    return new Promise(_0x42d645 => {
        $.post(_0x2e64e1('doInteractiveAssignment', _0x3f4ea0), async (_0x3b7a32, _0x17b855, _0x2f117a) => {
            try {
                if (_0x3b7a32) $.log('' + _0x3b7a32), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    _0x2f117a = JSON.parse(_0x2f117a);

                    if (_0x2f117a.subCode == 0) {
                        if (_0x2f117a.subCode == 0 && _0x2f117a.rewardsInfo.successRewards['3']) $.log('中奖啦：' + _0x2f117a.rewardsInfo.successRewards['3'][0].rewardName); else {
                            if (JSON.stringify(_0x2f117a.rewardsInfo.successRewards) === '{}') {
                                $.log('啥都没有！');
                            } else $.log(_0x2f117a.msg), $.nolotty = true;
                        }
                    } else {
                        $.log(_0x2f117a.msg), $.nolotty = true;
                    }
                }
            } catch (_0x2dd066) {
                $.logErr(_0x2dd066, _0x17b855);
            } finally {
                _0x42d645(_0x2f117a);
            }
        });
    });
}

function _0xef1682(_0x18b458) {
    const _0x5f912e = {
        'lat': '3',
        'lng': '',
        'sourceCode': 'acerwq20220316',
        'encryptProjectId': '3iGVUA3HQDpUvpGihdZEoKSBJqd6'
    };
    _0x5f912e.ext = {};
    _0x5f912e.ext.rewardEncryptAssignmentId = '2V1ndxzxvaLHr7sKNCdW59S9sVYw', _0x5f912e.ext.needNum = 0x32;
    let _0x3e252f = _0x5f912e;
    return new Promise(_0x1e71b8 => {
        $.post(_0x2e64e1('queryInteractiveInfo', _0x3e252f), async (_0x3fbd18, _0x112502, _0x2ec797) => {
            try {
                _0x3fbd18 ? ($.log('' + _0x3fbd18), $.log($.name + ' API请求失败，请检查网路重试')) : _0x2ec797 ? (_0x2ec797 = JSON.parse(_0x2ec797), $.taskList = _0x2ec797.assignmentList) : $.log('没有返回数据');
            } catch (_0x2fee58) {
                $.logErr(_0x2fee58, _0x112502);
            } finally {
                _0x1e71b8(_0x2ec797);
            }
        });
    });
}

function _0x2e64e1(_0xa8d215, _0x5147da) {
    return {
        'url': 'https://api.m.jd.com/client.action/?functionId=' + _0xa8d215 + '&body=' + escape(JSON.stringify(_0x5147da)) + '&appid=babelh5&sign=11',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://prodev.m.jd.com',
            'User-Agent': $.UA,
            'Referer': 'https://prodev.m.jd.com/',
            'Cookie': _0x15e8e8
        }
    };
}

function _0x338d4b(_0xf5016d = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x11b79d = 0) {
    return _0xf5016d.replace(/[xy]/g, function (_0x2cc34a) {
        var _0x33b4c4 = 16 * Math.random() | 0,
            _0x47c960 = 'x' == _0x2cc34a ? _0x33b4c4 : 3 & _0x33b4c4 | 8;

        return uuid = _0x11b79d ? _0x47c960.toString(36).toUpperCase() : _0x47c960.toString(36), uuid;
    });
}

function _0x1e3a4c() {
    let _0x5c32da = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'];
    let _0x319d33 = ['9', '10', '11', '12'];
    let _0x1026cd = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
        _0x363cfc = ['98413', '98416', '98415', '98417', '98450'];
    $.dv = _0x5c32da[Math.floor(Math.random() * _0x5c32da.length)];
    $.iv = _0x319d33[Math.floor(Math.random() * _0x319d33.length)], $.av = _0x1026cd[Math.floor(Math.random() * _0x1026cd.length)], $.bv = _0x363cfc[Math.floor(Math.random() * _0x363cfc.length)], getstr = function (_0x5757d5) {
        let _0x13118e = '',
            _0x1bcb66 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let _0x47c197 = 0; _0x47c197 < _0x5757d5; _0x47c197++) {
            let _0x25aaa0 = Math.round(Math.random() * (_0x1bcb66.length - 1));

            _0x13118e += _0x1bcb66.substring(_0x25aaa0, _0x25aaa0 + 1);
        }

        return _0x13118e;
    };
    $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0xb2407b() {
    return new Promise(async _0x29788a => {
        const _0x518391 = {
            'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
            'headers': {
                'Host': 'wq.jd.com',
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Cookie': _0x15e8e8,
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
                'Accept-Language': 'zh-cn',
                'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
                'Accept-Encoding': 'gzip, deflate, br'
            }
        };
        $.get(_0x518391, (_0x4581bf, _0x527cb2, _0x261863) => {
            try {
                if (_0x4581bf) $.logErr(_0x4581bf); else {
                    if (_0x261863) {
                        _0x261863 = JSON.parse(_0x261863);

                        if (_0x261863.retcode === 1001) {
                            $.isLogin = false;
                            return;
                        }

                        _0x261863.retcode === 0 && _0x261863.data && _0x261863.data.hasOwnProperty('userInfo') && ($.nickName = _0x261863.data.userInfo.baseInfo.nickname);
                    } else $.log('京东服务器返回空数据');
                }
            } catch (_0x51f5ac) {
                $.logErr(_0x51f5ac);
            } finally {
                _0x29788a();
            }
        });
    });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }