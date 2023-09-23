/*
任务，抽奖
6 2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/9/23
 */


const wudoutimes = '30';//连续几次没有豆就不抽奖只做任务
const $ = new Env('派对狂欢城');
const _0x33f159 = $.isNode() ? require('./sendNotify') : '',
    _0x4dc4a7 = $.isNode() ? require('./jdCookie.js') : '',
    _0x46865b = require('./function/dylany.js'),
    _0x4cebf2 = require('./USER_AGENTS'),
    _0x2450b1 = require('crypto-js');
let _0x138340 = [],
    _0x1b2983 = '',
    _0x5df697 = false,
    _0x2709c5 = true;
if ($.isNode()) {
    Object.keys(_0x4dc4a7).forEach(_0x531d3a => {
        _0x138340.push(_0x4dc4a7[_0x531d3a]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x138340 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x16a098($.getdata('CookiesJD') || '[]').map(_0x391211 => _0x391211.cookie)].filter(_0x4cd501 => !!_0x4cd501);
!(async () => {
    if (!_0x138340[0]) {
        const _0xd464ee = {};
        _0xd464ee['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0xd464ee);
        return;
    }
    $.log('\n当前版本：V3.0.0 开启抽奖'), $.log('问题建议TG：https://t.me/dylan_jdpro');
    for (let _0x59f638 = 0; _0x59f638 < _0x138340.length; _0x59f638++) {
        if (_0x138340[_0x59f638]) {
            _0x1b2983 = _0x138340[_0x59f638], $.UserName = decodeURIComponent(_0x1b2983.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1b2983.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x59f638 + 1, $.isLogin = true, $.nickName = '', $.notimes = false, $.airnum = 0, $.UA = _0x4cebf2.UARAM ? _0x4cebf2.UARAM() : _0x4cebf2.USER_AGENT, await _0xdc940d(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
            if (!$.isLogin) {
                const _0x246079 = {};
                _0x246079['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x246079);
                $.isNode() && (await _0x33f159.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x1938cb(), await $.wait(200), await _0x58fa6c(), await $.wait(200), await _0x222e40(), await $.wait(200), await _0x3600e6(), await $.wait(200);
            if ($.taskList) {
                $.log('去做任务...');
                for (let _0x2c8278 of $.taskList) {
                    if (!!_0x2c8278.assignmentName && _0x2c8278.assignmentName !== '积分兑换' && _0x2c8278.assignmentName.indexOf('抽奖奖池') == -1 && _0x2c8278.assignmentName.indexOf('加购') == -1 && _0x2c8278.assignmentName.indexOf('会员') == -1) {
                        $.log('\n----' + _0x2c8278.assignmentName);
                        if (_0x2c8278.completionFlag) {
                            $.log('----已完成');
                            continue;
                        }
                        ;
                        if (_0x2c8278.ext.shoppingActivity || _0x2c8278.ext.followShop) {
                            for (let _0x31a976 = 0; _0x31a976 < _0x2c8278.assignmentTimesLimit - _0x2c8278.completionCnt; _0x31a976++) {
                                let _0x49df81 = _0x2c8278.ext.shoppingActivity ? _0x2c8278.ext.shoppingActivity[_0x31a976]?.['itemId'] : _0x2c8278.ext.followShop[_0x31a976]?.['itemId'];
                                if (!_0x49df81) _0x49df81 = _0x2c8278.ext.shoppingActivity ? _0x2c8278.ext.shoppingActivity[Math.floor(Math.random(0, _0x2c8278.ext.shoppingActivity.length))].itemId : _0x2c8278.ext.followShop[Math.floor(Math.random(0, _0x2c8278.ext.followShop.length))].itemId;
                                await _0x5a42e6(_0x2c8278.encryptAssignmentId, _0x49df81), await $.wait(1000);
                            }
                            continue;
                        }
                        await _0x5a42e6(_0x2c8278.encryptAssignmentId), await $.wait(500);
                    }
                }
            }
            if (_0x2709c5) {
                $.log('\n\n元宝抽奖...');
                for (let _0x2ec529 of Array(50)) {
                    if ($.notimes) break;
                    if ($.airnum > wudoutimes) {
                        $.log('\n\n连续无豆达到设定值, 不抽奖只做任务！！！'), _0x2709c5 = false;
                        break;
                    }
                    ;
                    await _0x223cbb(), await $.wait(2000);
                }
            }
            await $.wait(5000);
        }
    }
})().catch(_0x1b37e5 => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1b37e5 + '!', '');
}).finally(() => {
    $.done();
});
async function _0x1938cb() {
    return new Promise(async _0x3d905e => {
        const _0x7fe773 = {};
        _0x7fe773.templateId = '790088977', $.post(_0x43b957('arvrMeta2RoomSortListByTemplateId', _0x7fe773), async (_0x510705, _0x4acebf, _0x81ba2) => {
            const _0x153935 = _0x59651d;
            try {
                if (_0x510705) console.log('' + JSON.stringify(_0x510705)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x5df697 && console.log(_0x81ba2), _0x81ba2 = JSON.parse(_0x81ba2);
                    if (_0x81ba2.code == 0) {
                        $.roomId = _0x81ba2.data[0].roomId;
                    } else console.log(_0x81ba2.msg);
                }
            } catch (_0x4bfe9e) {
                $.logErr(_0x4bfe9e, _0x4acebf);
            } finally {
                _0x3d905e(_0x81ba2);
            }
        });
    });
}
async function _0x58fa6c() {
    return new Promise(async _0x1d5bde => {
        $.post(_0x43b957('meta2LoginGame', {
            'channel': '1',
            'roomId': $.roomId
        }), async (_0x37ff8c, _0x34221c, _0x225f3d) => {
            try {
                if (_0x37ff8c) console.log('' + JSON.stringify(_0x37ff8c)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x5df697 && console.log(_0x225f3d), _0x225f3d = JSON.parse(_0x225f3d);
                    if (_0x225f3d.code == 0) { } else console.log(_0x225f3d.msg);
                }
            } catch (_0xfa4f1b) {
                $.logErr(_0xfa4f1b, _0x34221c);
            } finally {
                _0x1d5bde(_0x225f3d);
            }
        });
    });
}
async function _0x222e40() {
    const _0x45450b = {};
    _0x45450b.rewardType = 0x6, _0x45450b.activityId = 'ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0', _0x45450b.appId = 'app_440';
    let _0x10b556 = _0x45450b;
    return _0x10b556 = _0xd37d68(_0x10b556), new Promise(async _0x1a686b => {
        $.post(_0x43b957('arvr_getRequestToken', _0x10b556), async (_0xa17cc1, _0x22536a, _0x32a030) => {
            try {
                _0xa17cc1 ? (console.log('' + JSON.stringify(_0xa17cc1)), console.log(' API请求失败，请检查网路重试')) : (_0x5df697 && console.log(_0x32a030), _0x32a030 = JSON.parse(_0x32a030), _0x32a030.code == 200 ? $.token = _0x32a030.data : console.log(_0x32a030.msg));
            } catch (_0x132cf4) {
                $.logErr(_0x132cf4, _0x22536a);
            } finally {
                _0x1a686b(_0x32a030);
            }
        });
    });
}
async function _0x3600e6() {
    const _0x4f7f79 = {};
    _0x4f7f79.projectId = '1563959', _0x4f7f79.sourceCode = 0x2;
    let _0x2c24da = _0x4f7f79;
    return _0x2c24da = _0xd37d68(_0x2c24da), new Promise(async _0x424e6c => {
        $.post(_0x43b957('arvr_queryInteractiveInfo', _0x2c24da), async (_0x49cf0a, _0x3d014c, _0x599124) => {
            try {
                _0x49cf0a ? (console.log('' + JSON.stringify(_0x49cf0a)), console.log(' API请求失败，请检查网路重试')) : (_0x5df697 && console.log(_0x599124), _0x599124 = JSON.parse(_0x599124), _0x599124.subCode == 0 ? $.taskList = _0x599124.assignmentList : console.log(_0x599124.msg));
            } catch (_0x1f7def) {
                $.logErr(_0x1f7def, _0x3d014c);
            } finally {
                _0x424e6c(_0x599124);
            }
        });
    });
}
async function _0x223cbb() {
    const _0x3f0dc5 = {};
    _0x3f0dc5.projectId = '1563959', _0x3f0dc5.sourceCode = 0x2, _0x3f0dc5.accessToken = $.token, _0x3f0dc5.subTaskId = 'o5mVnPZZChSZyaD1qcXXXfWwhEb', _0x3f0dc5.subTaskIdSecret = true, _0x3f0dc5.exchangeNum = 0x1;
    let _0x1125dc = _0x3f0dc5;
    _0x1125dc = _0xd37d68(_0x1125dc);
    const _0x339eb1 = {};
    _0x339eb1.appId = 'e5749', _0x339eb1.fn = 'arvr_doInteractiveAssignment', _0x339eb1.body = _0x1125dc, _0x339eb1.apid = 'commonActivity', _0x339eb1.user = $.UserName, _0x339eb1.code = 0x1, _0x339eb1.ua = $.UA;
    let _0x4c1012 = _0x339eb1,
        _0x38d654 = await _0x46865b.getbody(_0x4c1012);
    const _0x2b92e2 = {};
    _0x2b92e2.Host = 'api.m.jd.com', _0x2b92e2.Origin = 'https://prodev.m.jd.com', _0x2b92e2['Content-Type'] = 'application/x-www-form-urlencoded', _0x2b92e2['User-Agent'] = $.UA, _0x2b92e2.Cookie = _0x1b2983;
    const _0x40bc63 = {};
    _0x40bc63.url = 'https://api.m.jd.com/api/arvr_doInteractiveAssignment', _0x40bc63.body = '' + _0x38d654, _0x40bc63.headers = _0x2b92e2;
    let _0x25ca54 = _0x40bc63;
    return new Promise(async _0x24e664 => {
        $.post(_0x25ca54, async (_0x4b0eba, _0x3b46b5, _0x241efb) => {
            try {
                if (_0x4b0eba) console.log('' + JSON.stringify(_0x4b0eba)), console.log(' API请求失败，请检查网路重试'); else {
                    _0x241efb = JSON.parse(_0x241efb);
                    if (_0x241efb.subCode == 0) {
                        if (_0x241efb.rewardsInfo.failRewards && _0x241efb.rewardsInfo.failRewards.length != 0) {
                            if (_0x241efb.rewardsInfo.failRewards[0].msg.indexOf('风控') > -1) {
                                process.stdout.write('黑号，不继续抽了！'), $.notimes = true;
                                return;
                            }
                        }
                        _0x241efb.rewardsInfo.successRewards && JSON.stringify(_0x241efb.rewardsInfo.successRewards) != '{}' ? (process.stdout.write(Object.values(_0x241efb.rewardsInfo.successRewards)[0][0].rewardName + ' '), Object.values(_0x241efb.rewardsInfo.successRewards)[0][0].rewardName.indexOf('京豆') == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write('💨 '), $.airnum++);
                    } else _0x241efb.msg.includes('不足') ? (console.log(_0x241efb.msg), $.notimes = true) : console.log(_0x241efb.msg);
                }
            } catch (_0x512559) {
                $.logErr(_0x512559, _0x3b46b5);
            } finally {
                _0x24e664(_0x241efb);
            }
        });
    });
}
async function _0x5a42e6(_0x4205d5, _0x260afe) {
    const _0x25c276 = {};
    _0x25c276.projectId = '1563959', _0x25c276.sourceCode = 0x2, _0x25c276.accessToken = $.token, _0x25c276.subTaskId = _0x4205d5, _0x25c276.subTaskIdSecret = true, _0x25c276.itemId = _0x260afe;
    let _0x523066 = _0x25c276;
    if (!_0x260afe) delete _0x523066.itemId;
    _0x523066 = _0xd37d68(_0x523066);
    const _0xfaa918 = {};
    _0xfaa918.appId = 'e5749', _0xfaa918.fn = 'arvr_doInteractiveAssignment', _0xfaa918.body = _0x523066, _0xfaa918.apid = 'commonActivity', _0xfaa918.user = $.UserName, _0xfaa918.code = 0x1, _0xfaa918.ua = $.UA;
    let _0x1b8fcb = _0xfaa918,
        _0x2dfbc2 = await _0x46865b.getbody(_0x1b8fcb);
    const _0x54147c = {};
    _0x54147c.Host = 'api.m.jd.com', _0x54147c.Origin = 'https://prodev.m.jd.com', _0x54147c.Referer = 'https://prodev.m.jd.com/', _0x54147c['Content-Type'] = 'application/x-www-form-urlencoded', _0x54147c['User-Agent'] = $.UA, _0x54147c.Cookie = _0x1b2983;
    const _0x1a02d2 = {};
    _0x1a02d2.url = 'https://api.m.jd.com/api/arvr_doInteractiveAssignment', _0x1a02d2.body = '' + _0x2dfbc2, _0x1a02d2.headers = _0x54147c;
    let _0x3fd1a4 = _0x1a02d2;
    return new Promise(async _0x33fb2c => {
        $.post(_0x3fd1a4, async (_0x4ffb10, _0x11da03, _0x16c79a) => {
            try {
                _0x4ffb10 ? (console.log('' + JSON.stringify(_0x4ffb10)), console.log('dotask 请求失败，请检查网路重试')) : (_0x5df697 && console.log(_0x16c79a), _0x16c79a = JSON.parse(_0x16c79a), _0x16c79a.subCode == 0 ? _0x16c79a.rewardsInfo.successRewards && process.stdout.write('' + _0x16c79a.rewardsInfo.successRewards[1].quantityDetails[0].quantity + _0x16c79a.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + ' ') : console.log(_0x16c79a.msg));
            } catch (_0xd120a2) {
                $.logErr(_0xd120a2, _0x11da03);
            } finally {
                _0x33fb2c(_0x16c79a);
            }
        });
    });
}
function _0x43b957(_0x101283, _0x30f409) {
    const _0x5495f5 = {};
    return _0x5495f5.Host = 'api.m.jd.com', _0x5495f5.Origin = 'https://pro.m.jd.com', _0x5495f5['Content-Type'] = 'application/x-www-form-urlencoded', _0x5495f5['User-Agent'] = $.UA, _0x5495f5.Cookie = _0x1b2983, {
        'url': 'https://api.m.jd.com/api/' + _0x101283,
        'body': 'appid=commonActivity&functionId=' + _0x101283 + '&body=' + encodeURIComponent(JSON.stringify(_0x30f409)) + '&t=' + Date.now(),
        'headers': _0x5495f5
    };
}
function _0xd37d68(_0x373e6b) {
    let _0xc7ee26 = '',
        _0x39dd7a = Object.keys(_0x373e6b).sort(function (_0x591076, _0x24ee33) {
            return _0x591076.localeCompare(_0x24ee33);
        });
    for (let _0x3cfc77 of _0x39dd7a) {
        _0xc7ee26 = _0xc7ee26.concat(_0x373e6b[_0x3cfc77]);
    }
    let _0x1cafe6 = Date.now();
    r = ''.concat('c4491f13dce9c71f').concat(_0xc7ee26).concat(_0x1cafe6);
    let _0x16679c = _0x2450b1.MD5(r).toString();
    return _0x373e6b.timestamp = _0x1cafe6, _0x373e6b.sign = _0x16679c, _0x373e6b.signKey = 'c4491f13dce9c71f', _0x373e6b;
}
function _0xdc940d() {
    return new Promise(_0x1dac9d => {
        const _0x51a846 = {};
        _0x51a846.Cookie = _0x1b2983, _0x51a846.referer = 'https://h5.m.jd.com/', _0x51a846['User-Agent'] = $.UA;
        const _0xb87890 = {};
        _0xb87890.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0xb87890.headers = _0x51a846, _0xb87890.timeout = 0x2710;
        const _0x13bc88 = _0xb87890;
        $.get(_0x13bc88, (_0xea0f0f, _0x3cdbbd, _0x506073) => {
            try {
                if (_0x506073) {
                    _0x506073 = JSON.parse(_0x506073);
                    if (_0x506073.islogin === '1') { } else _0x506073.islogin === '0' && ($.isLogin = false);
                }
            } catch (_0x1068de) {
                console.log(_0x1068de);
            } finally {
                _0x1dac9d();
            }
        });
    });
}
return;
function _0x16a098(_0xcb3402) {
    if (typeof _0xcb3402 == 'string') {
        try {
            return JSON.parse(_0xcb3402);
        } catch (_0x3b68aa) {
            return console.log(_0x3b68aa), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }