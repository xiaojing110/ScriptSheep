/*
变量：CODE11='7位字母'
export CODE11="xxxxxxx"

每次领取红包次数
export RedCount="5"
每个账号之间延时单位毫秒
export RedTimes="5000"
59 59 23,9,19 * * * jd_11red.js
*/




const $ = new Env('11领红包');
const _0x365542 = $.isNode() ? require('./jdCookie.js') : '';
let _0x5dc37d = '',
    _0x2e966c = 5000,
    _0x9ff2f6 = 4,
    _0x28a4d4 = 0;
$.CryptoJS = require('crypto-js');
if (process.env.DY_PROXY) try {
    require('https-proxy-agent'), ccc = require('./function/proxy.js'), $.dget = ccc.intoRequest($.get.bind($)), $.dpost = ccc.intoRequest($.post.bind($));
} catch {
    $.log('未安装https-proxy-agent依赖，无法启用代理'), $.dget = $.get, $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;
let _0x4c5d95 = [],
    _0x2fc6d4 = '';
if ($.isNode()) {
    Object.keys(_0x365542).forEach(_0x523636 => {
        _0x4c5d95.push(_0x365542[_0x523636]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else _0x4c5d95 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x44b258($.getdata('CookiesJD') || '[]').map(_0x5cdc8b => _0x5cdc8b.cookie)].filter(_0x1a566e => !!_0x1a566e);
let _0x3f0895 = '';
if (!_0x3f0895) _0x3f0895 = '';
_0x3f0895 = $.isNode() ? process.env.JD_nhj_rebatePin ? process.env.JD_nhj_rebatePin : '' + _0x3f0895 : $.getdata('JD_nhj_rebatePin') ? $.getdata('JD_nhj_rebatePin') : '' + _0x3f0895, _0x9ff2f6 = $.isNode() ? process.env.JD_231111_RedCount ? process.env.JD_231111_RedCount : '' + _0x9ff2f6 : $.getdata('JD_231111_RedCount') ? $.getdata('JD_231111_RedCount') : '' + _0x9ff2f6, _0x2e966c = $.isNode() ? process.env.JD_231111_RedTimes ? process.env.JD_231111_RedTimes : '' + _0x2e966c : $.getdata('JD_231111_RedTimes') ? $.getdata('JD_231111_RedTimes') : '' + _0x2e966c, $.shareCount = $.isNode() ? process.env.JD_nhj_shareHelpCount ? process.env.JD_nhj_shareHelpCount : '' + _0x28a4d4 : $.getdata('JD_nhj_shareHelpCount') ? $.getdata('JD_nhj_shareHelpCount') : '' + _0x28a4d4, $.shareCount = parseInt($.shareCount, 10) || 0;
let _0x4a4d9e = _0x3f0895 && _0x3f0895.split(',') || [];
$.time('yyyy-MM-dd HH:mm:ss'), message = '';
let _0x35a8dd = '';
resMsg = '', $.uiUpdateTime = '', $.endFlag = false, $.runEnd = false;
let _0x33d2e9 = {};
$.getH5st_WQ_Arr = {}, $.runArr = {};
let _0x366c39 = '';
const _0x1fc13e = '2023/11/12 00:00:00+08:00';
let _0x205bc0 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
$.UVCookieArr = {}, lr = {}, $.UVCookie = '';
let _0x3d5ece = '',
    _0x7083e9 = 2;
_0x2e966c = Number(_0x2e966c), $.time('yyyy-MM-dd'), _0x416e0a(), !(async () => {
    $.log('\nDY_PROXY=\'代理api_url\'');
    // let _0x521c7e = await _0x10bd78();
    if (_0x521c7e.length === 0) _0x521c7e = [''];
    _0x521c7e = _0x521c7e[Math.floor(Math.random() * _0x521c7e.length)];
    if (!_0x5dc37d) _0x5dc37d = 'https://u.jd.com/' + (_0x521c7e || '');
    _0x5dc37d = $.isNode() ? process.env.CODE11 ? process.env.CODE11 : '' + _0x5dc37d : $.getdata('CODE11') ? $.getdata('CODE11') : '' + _0x5dc37d, ii1I11 = _0x5dc37d + '';
    if (/https:\/\/u\.jd\.com\/.+/.test(ii1I11)) {
        if (ii1I11.split('/').pop()) ii1I11 = ii1I11.split('/').pop().split('?').shift(); else {
            console.log('请填写正确的rebateCode');
            return;
        }
    }
    if (!_0x4c5d95[0]) {
        const _0x2de451 = {};
        _0x2de451['open-url'] = 'https://bean.m.jd.com/', $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', _0x2de451);
        return;
    }
    if (_0x205bc0 > new Date(_0x1fc13e).getTime()) {
        $.msg($.name, '活动已结束', '请删除此脚本'), $.setdata('', 'JD_231111_Red'), $.setdata('', 'JD_231111_Red_pin');
        return;
    }
    console.log('CODE：' + ii1I11.replace(/.+(.{3})/, '***$1')), $.shareCodeArr = {}, $.shareCodePinArr = $.getdata('JD_231111_Red_pin') || {}, $.shareCode = '', $.again = false;
    if ($.end) return;
    for (let _0x5e58c7 = 0; _0x5e58c7 < _0x4c5d95.length && !$.runEnd; _0x5e58c7++) {
        if ($.endFlag) break;
        _0x2fc6d4 = _0x4c5d95[_0x5e58c7];
        if (_0x2fc6d4) {
            $.UserName = decodeURIComponent(_0x2fc6d4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2fc6d4.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x5e58c7 + 1;
            if ($.runArr[$.UserName]) continue;
            console.log('\n\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
            let _0x1d5ee7 = 1;
            _0x7083e9 = 4, $.eid_token = '', _0x54c44e(_0x1d5ee7), await _0x584515(), await _0x5b46b8();
            if ($.endFlag) break;
        }
        $.setdata($.shareCodePinArr, 'JD_231111_Red_pin');
    }
    $.setdata($.shareCodePinArr, 'JD_231111_Red_pin');
    if (message) {
        if ($.isNode()) { }
    }
})().catch(_0x45ad3d => $.logErr(_0x45ad3d)).finally(() => {
    $.done();
});
async function _0x5b46b8(_0x595121 = 0) {
    try {
        _0x595121 == 0 && (_0xbf2196('c822a', $.UA), await _0x366c39.__genAlgo()), $.UVCookie = $.UVCookieArr[$.UserName] || '', !$.UVCookie && _0x416e0a(), resMsg = '';
        let _0x58ff87 = false,
            _0x31e34e = 0,
            _0x5da43e = 0,
            _0x2b9a9d = 0;
        $.shareFlag = true;
        do {
            if (_0x5da43e > 2) _0x31e34e = 0;
            $.flag = 0, _0x35a8dd = '', $.url1 = '', await _0xccd24();
            if (!$.url1) {
                console.log('获取url1失败'), $.end = true;
                break;
            }
            $.url2 = '', $.UVCookie = _0x3d5ece.getUVCookie('', '', $.url1, $.UVCookie), $.UVCookieArr[$.UserName] = $.UVCookie + '', await _0x1fcd50();
            if (!$.url2) {
                console.log('获取不到红包页面');
                break;
            }
            if (!/unionActId=\d+/.test($.url2) && !new RegExp('&d=' + ii1I11).test($.url2)) {
                console.log('url：https://u.jd.com/' + ii1I11 + ' 可能不是红包页面'), $.runEnd = true;
                return;
            }
            if (!$.url2) $.url2 = 'https://pro.m.jd.com/mall/active/2AFDsGQNAcLxkw5i9L87sGDEdPvE/index.html?unionActId=31165&d=' + ii1I11 + '&cu=true&utm_source=kong&utm_medium=jingfen';
            $.actId = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/mall\/active\/([^/]+)\/index\.html/)[1] || '2AFDsGQNAcLxkw5i9L87sGDEdPvE', $.UVCookie = _0x3d5ece.getUVCookie('', '', $.url2, $.UVCookie), $.origin = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com)/)[1] || 'https://pro.m.jd.com', $.UVCookieArr[$.UserName] = $.UVCookie + '', $.eid = '', !$.eid && ($.eid = -1);
            if (_0x595121 == 0) {
                let _0x31aeab = 0,
                    _0x49986d = true,
                    _0x50022b = 0;
                if (Object.getOwnPropertyNames(_0x33d2e9).length > _0x31e34e && $.shareFlag) for (let _0xf60a44 in _0x33d2e9 || {}) {
                    if (_0xf60a44 == $.UserName) {
                        $.flag = 1;
                        continue;
                    }
                    if (_0x31aeab == _0x31e34e) {
                        $.flag = 0, $.shareCode = _0x33d2e9[_0xf60a44] || '';
                        if ($.shareCodePinArr[_0xf60a44] && $.shareCodePinArr[_0xf60a44].includes($.UserName)) {
                            _0x50022b++;
                            continue;
                        }
                        if ($.shareCode.count >= $.shareCodeArr.shareCount) {
                            _0x50022b++;
                            continue;
                        }
                        $.getlj = false;
                        if ($.shareCode) console.log('助力[' + _0xf60a44 + ']');
                        let _0x419275 = await _0x43c16e($.shareCode.code, 1);
                        if (/重复助力/.test(_0x419275)) {
                            if (!$.shareCodePinArr[_0xf60a44]) $.shareCodePinArr[_0xf60a44] = [];
                            $.shareCodePinArr[_0xf60a44].push($.UserName), _0x31e34e--, _0x2b9a9d--;
                        } else {
                            if (/助力/.test(_0x419275) && /上限/.test(_0x419275)) $.shareFlag = false; else {
                                if (!/领取上限/.test(_0x419275) && $.getlj == true) {
                                    if (!$.shareCodePinArr[_0xf60a44]) $.shareCodePinArr[_0xf60a44] = [];
                                    !$.shareCodePinArr[_0xf60a44].includes($.UserName) && $.shareCodePinArr[_0xf60a44].push($.UserName), _0x31e34e--;
                                } else _0x49986d = false;
                            }
                        }
                    }
                    _0x31aeab++;
                }
                _0x49986d && _0x50022b == Object.getOwnPropertyNames(_0x33d2e9).length && (_0x58ff87 = true);
                if (_0x31aeab == 0) {
                    $.getlj = false;
                    let _0xd2d93b = await _0x43c16e('', 1);
                    !/领取上限/.test(_0xd2d93b) && $.getlj == true && _0x31e34e--;
                }
                if ($.endFlag) break;
            } else {
                let _0x441b88 = await _0x243ce5();
                if (!$.endFlag && _0x441b88 && $.again == false) await _0x57c7f5();
                if ($.again == false) break;
            }
            $.again == true && _0x5da43e < 1 && (_0x5da43e++, $.again = false), _0x31e34e++, _0x2b9a9d++, $.flag == 1 && (await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
            if (_0x9ff2f6 > 0 && _0x9ff2f6 <= _0x2b9a9d) break;
        } while ($.flag == 1 && _0x31e34e < 4);
        if ($.endFlag) return;
        resMsg && (message += '【京东账号' + $.index + '】\n' + resMsg);
        if (_0x58ff87) { }
        if ($.index % 10 == 0) {
            let _0x48c042 = parseInt(Math.random() * 1000 + _0x2e966c, 10);
            console.log('等待 ' + _0x48c042 / 1000 + ' 秒'), await $.wait(_0x48c042);
        } else await $.wait(Math.random() * 2000 + 3000, 10);
    } catch (_0x1c384a) {
        console.log(_0x1c384a);
    }
}
async function _0x4bdbc0(_0x34d66b = 0) {
    try {
        let _0x5d24c6 = 2;
        if (_0x34d66b == 1) _0x5d24c6 = 1;
        let _0xc87bfc = 0;
        for (let _0x5acc5b in $.shareCodeArr || {}) {
            if (_0x5acc5b === 'flag' || _0x5acc5b === 'updateTime' || _0x5acc5b === 'shareCount') continue;
            if ($.shareCodeArr[_0x5acc5b] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x5acc5b].count < $.shareCodeArr.shareCount) _0xc87bfc++;
        }
        for (let _0x3167f8 = 0; _0x3167f8 < _0x4c5d95.length && !$.runEnd; _0x3167f8++) {
            _0x2fc6d4 = _0x4c5d95[_0x3167f8];
            if (_0x2fc6d4) {
                $.UserName = decodeURIComponent(_0x2fc6d4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2fc6d4.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                if (_0x4a4d9e.length > 0 && _0x4a4d9e.indexOf($.UserName) == -1 || $.shareCodeArr[$.UserName]) continue;
                $.index = _0x3167f8 + 1, $.eid_token = '', _0x54c44e(), await _0x584515(), await _0x5b46b8(1);
                let _0x31f492 = 0;
                for (let _0x2f292f in $.shareCodeArr || {}) {
                    if (_0x2f292f === 'flag' || _0x2f292f === 'updateTime' || _0x2f292f === 'shareCount') continue;
                    if ($.shareCodeArr[_0x2f292f] && $.shareCodeArr.shareCount && $.shareCodeArr[_0x2f292f].count < $.shareCodeArr.shareCount) _0x31f492++;
                }
                if ($.endFlag || _0x31f492 - _0xc87bfc >= _0x5d24c6 || $.end) break;
            }
        }
    } catch (_0x27aaa8) {
        console.log(_0x27aaa8);
    }
    if (Object.getOwnPropertyNames($.shareCodeArr).length > 0) for (let _0xb013a5 in $.shareCodeArr || {}) {
        if (_0xb013a5 === 'flag' || _0xb013a5 === 'updateTime' || _0xb013a5 === 'shareCount') continue;
        if ($.shareCodeArr[_0xb013a5]) _0x33d2e9[_0xb013a5] = $.shareCodeArr[_0xb013a5];
    }
}
function _0x43c16e(_0x5d45a4 = '', _0x25ba55 = 1) {
    return new Promise(async _0x155af9 => {
        $.UVCookie = _0x3d5ece.getUVCookie('', '', $.url2, $.UVCookie), $.UVCookieArr[$.UserName] = $.UVCookie + '';
        let _0x21cc94 = '',
            _0xfc3d57 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;
        const _0x4e3100 = {};
        _0x4e3100.platform = _0x7083e9, _0x4e3100.unionActId = '31165', _0x4e3100.actId = $.actId, _0x4e3100.d = ii1I11, _0x4e3100.unionShareId = _0x5d45a4, _0x4e3100.type = _0x25ba55, _0x4e3100.qdPageId = 'MO-J2011-1', _0x4e3100.mdClickId = 'jxhongbao_ck';
        const _0x5988b0 = _0x4e3100,
            _0x1189f0 = {
                'appid': 'u_hongbao',
                'body': JSON.stringify(_0x5988b0),
                'client': 'apple',
                'clientVersion': $.UA.split(';')[2] || '1.1.0',
                'functionId': 'getCoupons'
            };
        let _0xea9077 = _0x366c39.__genH5st(_0x1189f0, $.UserName);
        _0x21cc94 = _0xea9077.h5st || '';
        let _0x3eabc1 = '',
            _0xb9e9ef = {
                'url': 'https://api.m.jd.com/api',
                'body': 'functionId=getCoupons&appid=u_hongbao&_=' + _0xfc3d57 + '&loginType=2&body=' + encodeURIComponent($.toStr(_0x5988b0)) + '&client=apple&clientVersion=' + _0x1189f0.clientVersion + '&h5st=' + encodeURIComponent(_0x21cc94) + ($.eid_token ? '&x-api-eid-token=' + $.eid_token : ''),
                'headers': {
                    'accept': '*/*',
                    'Accept-Language': 'zh-cn',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Cookie': '' + $.UVCookie + _0x35a8dd + ' ' + _0x2fc6d4,
                    'origin': $.origin,
                    'Referer': $.origin + '/',
                    'User-Agent': $.UA
                }
            };
        _0xb9e9ef.headers.Cookie = _0xb9e9ef.headers.Cookie.replace(/;\s*$/, ''), _0xb9e9ef.headers.Cookie = _0xb9e9ef.headers.Cookie.replace(/;([^\s])/g, '; $1');
        if ($.url2) _0xb9e9ef.headers.Referer = $.url2;
        $.dpost(_0xb9e9ef, async (_0x515dc1, _0x45195a, _0x29b5ec) => {
            try {
                if (_0x515dc1) console.log('' + $.toStr(_0x515dc1)), console.log($.name + ' API请求失败，请检查网路重试'); else {
                    let _0x372e85 = $.toObj(_0x29b5ec, _0x29b5ec);
                    if (typeof _0x372e85 == 'object') {
                        _0x372e85.msg && (_0x3eabc1 = _0x372e85.msg, console.log(_0x372e85.msg));
                        if (_0x372e85.msg.indexOf('不展示弹层') > -1 && _0x25ba55 == 1) $.again = true;
                        if (_0x372e85.msg.indexOf('领取上限') === -1 && _0x372e85.msg.indexOf('登录') === -1) {
                            if (_0x25ba55 == 1) $.flag = 1;
                        }
                        if (_0x372e85.msg.indexOf('活动已结束') > -1 || _0x372e85.msg.indexOf('活动未开始') > -1) {
                            $.endFlag = true;
                            return;
                        }
                        _0x5d45a4 && typeof _0x372e85.data !== 'undefined' && typeof _0x372e85.data.joinNum !== 'undefined' && console.log('当前' + _0x372e85.data.joinSuffix + ':' + _0x372e85.data.joinNum);
                        if (_0x372e85.code == 0 && _0x372e85.data) {
                            if (_0x25ba55 == 1) $.shareCode.count++;
                            let _0x2fc171 = '';
                            for (let _0x18b93c of _0x372e85.data.couponList) {
                                if (_0x18b93c.type == 1) $.getlj = true, _0x2fc171 += (_0x2fc171 ? '\n' : '') + '获得[红包]🧧' + _0x18b93c.discount + '元 使用时间:' + $.time('yyyy-MM-dd', _0x18b93c.beginTime) + ' ' + $.time('yyyy-MM-dd', _0x18b93c.endTime); else {
                                    if (_0x18b93c.type == 3) $.getlj = true, _0x2fc171 += (_0x2fc171 ? '\n' : '') + '获得[优惠券]🎟️满' + _0x18b93c.quota + '减' + _0x18b93c.discount + ' 使用时间:' + $.time('yyyy-MM-dd', _0x18b93c.beginTime) + ' ' + $.time('yyyy-MM-dd', _0x18b93c.endTime); else _0x18b93c.type == 6 ? ($.getlj = true, _0x2fc171 += (_0x2fc171 ? '\n' : '') + '获得[打折券]]🎫满' + _0x18b93c.quota + '打' + _0x18b93c.discount * 10 + '折 使用时间:' + $.time('yyyy-MM-dd', _0x18b93c.beginTime) + ' ' + $.time('yyyy-MM-dd', _0x18b93c.endTime)) : ($.getlj = true, _0x2fc171 += (_0x2fc171 ? '\n' : '') + '获得[未知]🎉' + (_0x18b93c.quota || '') + ' ' + _0x18b93c.discount + ' 使用时间:' + $.time('yyyy-MM-dd', _0x18b93c.beginTime) + ' ' + $.time('yyyy-MM-dd', _0x18b93c.endTime), console.log(_0x18b93c));
                                }
                            }
                            _0x2fc171 && (resMsg += _0x2fc171 + '\n', console.log(_0x2fc171));
                        }
                        if (_0x25ba55 == 1 && typeof _0x372e85.data !== 'undefined' && typeof _0x372e85.data.groupData !== 'undefined' && typeof _0x372e85.data.groupData.groupInfo !== 'undefined') for (let _0x23855b of _0x372e85.data.groupData.groupInfo || []) {
                            _0x23855b.status == 2 && (console.log('助力满可以领取' + _0x23855b.info + '元红包🧧'), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x43c16e('', 2));
                        }
                    } else console.log(_0x29b5ec);
                }
            } catch (_0x1586e7) {
                $.logErr(_0x1586e7, _0x45195a);
            } finally {
                _0x155af9(_0x3eabc1);
            }
        });
    });
}
function _0x243ce5(_0x51a713 = '') {
    let _0x403c92 = true;
    return new Promise(_0x41814d => {
        $.UVCookie = _0x3d5ece.getUVCookie('', '', $.url2, $.UVCookie), $.UVCookieArr[$.UserName] = $.UVCookie + '';
        let _0x3adac7 = {
            'url': 'https://api.m.jd.com/api?functionId=showCoupon&appid=u_hongbao&_=' + Date.now() + '&loginType=2&body={%22actId%22:%22' + $.actId + '%22,%22unionActId%22:%2231165%22,%22unpl%22:%22' + $.unpl + '%22,%22platform%22:' + _0x7083e9 + ',%22unionShareId%22:%22%22,' + ($.uiUpdateTime ? '%22uiUpdateTime%22:' + $.uiUpdateTime + ',' : '') + '%22d%22:%22' + ii1I11 + '%22,%22eid%22:%22' + $.eid + '%22}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=' + ($.eid_token ? '&x-api-eid-token=' + $.eid_token : ''),
            'headers': {
                'accept': '*/*',
                'Accept-Language': 'zh-cn',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '' + $.UVCookie + _0x35a8dd + ' ' + _0x2fc6d4,
                'origin': $.origin,
                'Referer': $.origin + '/',
                'User-Agent': $.UA
            }
        };
        _0x3adac7.headers.Cookie = _0x3adac7.headers.Cookie.replace(/;\s*$/, ''), _0x3adac7.headers.Cookie = _0x3adac7.headers.Cookie.replace(/;([^\s])/g, '; $1');
        if ($.url2) _0x3adac7.headers.Referer = $.url2;
        $.dget(_0x3adac7, async (_0x5b0b37, _0x5c48e4, _0xd0604b) => {
            try {
                if (_0x5b0b37) console.log('' + $.toStr(_0x5b0b37)), console.log($.name + ' API请求失败，请检查网路重试'); else {
                    let _0xdb2174 = $.toObj(_0xd0604b, _0xd0604b);
                    if (typeof _0xdb2174 == 'object') {
                        if (_0xdb2174.msg) console.log(_0xdb2174.msg);
                        if (_0xdb2174.msg.indexOf('不展示弹层') > -1) $.again = true;
                        if (_0xdb2174.msg.indexOf('领取上限') > -1) $.runArr[$.UserName] = true;
                        _0xdb2174.msg.indexOf('上限') === -1 && _0xdb2174.msg.indexOf('登录') === -1 && ($.flag = 1);
                        if (_0xdb2174.msg.indexOf('活动已结束') > -1 || _0xdb2174.msg.indexOf('活动未开始') > -1) {
                            $.endFlag = true;
                            return;
                        }
                        if (_0xdb2174.data.uiUpdateTime) $.uiUpdateTime = _0xdb2174.data.uiUpdateTime;
                        if (typeof _0xdb2174.data !== 'undefined' && typeof _0xdb2174.data.groupData !== 'undefined' && typeof _0xdb2174.data.groupData.joinNum !== 'undefined') {
                            $.joinNum = _0xdb2174.data.groupData.joinNum;
                            let _0x2011d2 = 0;
                            for (let _0x20a265 of _0xdb2174.data.groupData.groupInfo) {
                                if (_0x2011d2 < _0x20a265.num) _0x2011d2 = _0x20a265.num;
                            }
                            if ($.shareCount > 0 && _0x2011d2 > $.shareCount) _0x2011d2 = $.shareCount;
                            $.shareCodeArr[$.UserName] && ($.shareCodeArr[$.UserName].count = _0x2011d2), $.shareCodeArr.shareCount = _0x2011d2;
                            if (_0x2011d2 <= $.joinNum) {
                                if (!$.shareCodeArr[$.UserName]) $.shareCodeArr[$.UserName] = {};
                                $.shareCodeArr[$.UserName].count = $.joinNum, _0x403c92 = false;
                            }
                            console.log('【账号' + $.index + '】' + ($.nickName || $.UserName) + ' ' + $.joinNum + '/' + _0x2011d2 + '人');
                        }
                        _0xdb2174.msg.indexOf('活动已结束') > -1 && (_0x403c92 = false);
                        if (typeof _0xdb2174.data !== 'undefined' && typeof _0xdb2174.data.groupData !== 'undefined' && typeof _0xdb2174.data.groupData.groupInfo !== 'undefined') for (let _0x4a5d79 of _0xdb2174.data.groupData.groupInfo || []) {
                            _0x4a5d79.status == 2 && (console.log('助力满可以领取' + _0x4a5d79.info + '元红包🧧'), await $.wait(parseInt(Math.random() * 2000 + 2000, 10)), await _0x43c16e('', 2));
                        }
                    } else console.log(_0xd0604b);
                }
            } catch (_0x1aff66) {
                $.logErr(_0x1aff66, _0x5c48e4);
            } finally {
                _0x41814d(_0x403c92);
            }
        });
    });
}
function _0x57c7f5() {
    if ($.shareCodeArr[$.UserName]) {
        console.log('【账号' + $.index + '】缓存分享码:' + $.shareCodeArr[$.UserName].code.replace(/.+(.{3})/, '***$1'));
        return;
    }
    return new Promise(_0x3cbcfb => {
        let _0x5f43cc = {
            'url': 'https://api.m.jd.com/api?functionId=shareUnionCoupon&appid=u_hongbao&_=' + Date.now() + '&loginType=2&body={%22unionActId%22:%2231165%22,%22actId%22:%22' + $.actId + '%22,%22platform%22:4,%22unionShareId%22:%22%22,%22d%22:%22' + ii1I11 + '%22,%22supportPic%22:2}&client=iPhone&clientVersion=&osVersion=iOS&d_brand=iPhone&d_model=iPhone&lang=zh-cn&openudid=' + ($.eid_token ? '&x-api-eid-token=' + $.eid_token : ''),
            'headers': {
                'accept': '*/*',
                'Accept-Language': 'zh-cn',
                'Accept-Encoding': 'gzip, deflate, br',
                'Cookie': '' + $.UVCookie + _0x35a8dd + ' ' + _0x2fc6d4,
                'origin': $.origin,
                'Referer': $.origin + '/',
                'User-Agent': $.UA
            }
        };
        _0x5f43cc.headers.Cookie = _0x5f43cc.headers.Cookie.replace(/;\s*$/, ''), _0x5f43cc.headers.Cookie = _0x5f43cc.headers.Cookie.replace(/;([^\s])/g, '; $1'), $.dget(_0x5f43cc, async (_0x2fc96e, _0x5a7541, _0x16d854) => {
            try {
                if (_0x2fc96e) console.log('' + $.toStr(_0x2fc96e)), console.log($.name + ' API请求失败，请检查网路重试'); else {
                    let _0x13b7dc = $.toObj(_0x16d854, _0x16d854);
                    if (typeof _0x13b7dc == 'object') {
                        if (_0x13b7dc.code == 0 && _0x13b7dc.data && _0x13b7dc.data.shareUrl) {
                            let _0x24ce7e = _0x13b7dc.data.shareUrl.match(/\?s=([^&]+)/) && _0x13b7dc.data.shareUrl.match(/\?s=([^&]+)/)[1] || '';
                            _0x24ce7e && (console.log('【账号' + $.index + '】分享码：' + _0x24ce7e.replace(/.+(.{3})/, '***$1')), $.shareCodeArr[$.UserName] = {
                                'code': _0x24ce7e,
                                'count': $.joinNum
                            });
                        }
                    } else console.log(_0x16d854);
                }
            } catch (_0x2e9319) {
                $.logErr(_0x2e9319, _0x5a7541);
            } finally {
                _0x3cbcfb();
            }
        });
    });
}
function _0x1fcd50() {
    return new Promise(_0x43edff => {
        const _0x283340 = {};
        _0x283340.url = $.url1, _0x283340.followRedirect = false, _0x283340.headers = {}, _0x283340.headers.Cookie = '' + $.UVCookie + _0x35a8dd + ' ' + _0x2fc6d4, _0x283340.headers['User-Agent'] = $.UA;
        const _0x4350cc = _0x283340;
        $.dget(_0x4350cc, async (_0x195f61, _0x21bfa0, _0x162d8a) => {
            try {
                _0x1c4122(_0x21bfa0), $.url2 = _0x21bfa0 && _0x21bfa0.headers && (_0x21bfa0.headers.location || _0x21bfa0.headers.Location || '') || '', $.url2 = decodeURIComponent($.url2), $.url2 = $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/) && $.url2.match(/(https:\/\/\S{3,7}[\.m]{0,}\.jd\.com\/mall[^'"]+)/)[1] || '';
            } catch (_0x2d500d) {
                $.logErr(_0x2d500d, _0x21bfa0);
            } finally {
                _0x43edff(_0x162d8a);
            }
        });
    });
}
function _0xccd24() {
    return new Promise(_0x42a73e => {
        const _0x599f82 = {};
        _0x599f82.url = 'https://u.jd.com/' + ii1I11 + ($.shareCode && '?s=' + $.shareCode || ''), _0x599f82.followRedirect = false, _0x599f82.headers = {}, _0x599f82.headers.Cookie = '' + $.UVCookie + _0x35a8dd + ' ' + _0x2fc6d4, _0x599f82.headers['User-Agent'] = $.UA;
        const _0x13391e = _0x599f82;
        $.dget(_0x13391e, async (_0x4357d1, _0x219bcc, _0x1f512c) => {
            try {
                _0x1c4122(_0x219bcc), $.url1 = _0x1f512c && _0x1f512c.match(/(https:\/\/u\.jd\.com\/jda[^']+)/) && _0x1f512c.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1] || '';
            } catch (_0x4c012c) {
                $.logErr(_0x4c012c, _0x219bcc);
            } finally {
                _0x42a73e(_0x1f512c);
            }
        });
    });
}
function _0x1c4122(_0x15647d) {
    let _0x43dfa7 = _0x15647d && _0x15647d.headers && (_0x15647d.headers['set-cookie'] || _0x15647d.headers['Set-Cookie'] || '') || '',
        _0x5aa1db = '';
    if (_0x43dfa7) {
        if (typeof _0x43dfa7 != 'object') _0x5aa1db = _0x43dfa7.split(','); else _0x5aa1db = _0x43dfa7;
        for (let _0x1d97b5 of _0x5aa1db) {
            let _0x17ffcd = _0x1d97b5.split(';')[0].trim();
            if (_0x17ffcd.split('=')[1]) {
                _0x17ffcd.split('=')[0] == 'unpl' && _0x17ffcd.split('=')[1] && ($.unpl = _0x17ffcd.split('=')[1]);
                if (_0x35a8dd.indexOf(_0x17ffcd.split('=')[1]) == -1) _0x35a8dd += _0x17ffcd.replace(/ /g, '') + '; ';
            }
        }
    }
}
function _0xb13458(_0xb6c988 = 1) {
    const _0x5a7f9a = {};
    _0x5a7f9a.ud = '', _0x5a7f9a.sv = 'CJGkCm==', _0x5a7f9a.iad = '', $.UA = 'jdapp;iPhone;12.0.2;;;M/5.0;appBuild/168698;jdSupportDarkMode/0;ef/1;ep/' + encodeURIComponent(JSON.stringify({
        'ciphertype': 0x5,
        'cipher': _0x5a7f9a,
        'ts': Math.floor(new Date().getTime() / 1000),
        'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
        'version': '1.0.3',
        'appname': 'com.360buy.jdmobile',
        'ridx': -1
    })) + ';Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function _0x33495a(_0x2525d9) {
    let _0x1e23c0 = '0123456789abcdef',
        _0x8f0d2f = '';
    for (let _0x4f0c77 = 0; _0x4f0c77 < _0x2525d9; _0x4f0c77++) {
        _0x8f0d2f += _0x1e23c0[Math.ceil(100000000 * Math.random()) % _0x1e23c0.length];
    }
    return _0x8f0d2f;
}
function _0x210912(_0x400609, _0x1c695c) {
    let _0x5a575f = new Array();
    for (let _0x3793cf in _0x400609) {
        _0x5a575f.push(_0x400609[_0x3793cf]);
    }
    let _0x28b66c = new Array();
    for (let _0x57c0de = 0; _0x57c0de < _0x1c695c; _0x57c0de++) {
        if (_0x5a575f.length > 0) {
            let _0x17c45a = Math.floor(Math.random() * _0x5a575f.length);
            _0x28b66c[_0x57c0de] = _0x5a575f[_0x17c45a], _0x5a575f.splice(_0x17c45a, 1);
        } else break;
    }
    return _0x28b66c;
}
function _0x54c44e(_0x29b270) {
    const _0x147366 = {};
    _0x147366.A = 'K', _0x147366.B = 'L', _0x147366.C = 'M', _0x147366.D = 'N', _0x147366.E = 'O', _0x147366.F = 'P', _0x147366.G = 'Q', _0x147366.H = 'R', _0x147366.I = 'S', _0x147366.J = 'T', _0x147366.K = 'A', _0x147366.L = 'B', _0x147366.M = 'C', _0x147366.N = 'D', _0x147366.O = 'E', _0x147366.P = 'F', _0x147366.Q = 'G', _0x147366.R = 'H', _0x147366.S = 'I', _0x147366.T = 'J', _0x147366.e = 'o', _0x147366.f = 'p', _0x147366.g = 'q', _0x147366.h = 'r', _0x147366.i = 's', _0x147366.j = 't', _0x147366.k = 'u', _0x147366.l = 'v', _0x147366.m = 'w', _0x147366.n = 'x', _0x147366.o = 'e', _0x147366.p = 'f', _0x147366.q = 'g', _0x147366.r = 'h', _0x147366.s = 'i', _0x147366.t = 'j', _0x147366.u = 'k', _0x147366.v = 'l', _0x147366.w = 'm', _0x147366.x = 'n';
    const _0x8ea42d = {};
    _0x8ea42d.ud = '', _0x8ea42d.sv = '', _0x8ea42d.iad = '';
    let _0x3cc807 = _0x147366,
        _0x505cec = _0x210912([12, 13, 14, 15, 16], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1),
        _0x5ee5a1 = _0x210912([9, 10, 11], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5, 6, 7, 8], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5], 1),
        _0x2e44bd = _0x210912([4, 5, 6], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1) + '.' + _0x210912([0, 1, 2, 3, 4, 5], 1),
        _0x2f05a1 = {
            'ciphertype': 0x5,
            'cipher': _0x8ea42d,
            'ts': parseInt(new Date().getTime() / 1000),
            'hdid': '',
            'version': '1.0.3',
            'appname': '',
            'ridx': -1
        };
    _0x2f05a1.cipher.sv = new Buffer.from(_0x505cec).toString('base64').split('').map(_0x1fe9b2 => _0x3cc807[_0x1fe9b2] || _0x1fe9b2).join(''), _0x2f05a1.cipher.ud = new Buffer.from(_0x33495a(40)).toString('base64').split('').map(_0x584635 => _0x3cc807[_0x584635] || _0x584635).join(''), _0x2f05a1.appname = 'com.360buy.jdmobile', _0x2f05a1.hdid = 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=', $.UA = 'jdapp;iPhone;' + _0x5ee5a1 + ';;;M/5.0;appBuild/168341;jdSupportDarkMode/0;ef/1;ep/' + encodeURIComponent(JSON.stringify(_0x2f05a1)) + ';Mozilla/5.0 (iPhone; CPU iPhone OS ' + _0x505cec.replace(/\./g, '_') + ' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function _0x44b258(_0x423e46) {
    if (typeof _0x423e46 == 'string') try {
        return JSON.parse(_0x423e46);
    } catch (_0x227835) {
        return console.log(_0x227835), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}
async function _0x584515() {
    var _0x13eab1 = function () {
        function _0x391e04(_0x3cbea1, _0x20c970) {
            _0x3cbea1 = [_0x3cbea1[0] >>> 16, 65535 & _0x3cbea1[0], _0x3cbea1[1] >>> 16, 65535 & _0x3cbea1[1]], _0x20c970 = [_0x20c970[0] >>> 16, 65535 & _0x20c970[0], _0x20c970[1] >>> 16, 65535 & _0x20c970[1]];
            var _0x1b9acd = [0, 0, 0, 0];
            return _0x1b9acd[3] += _0x3cbea1[3] + _0x20c970[3], _0x1b9acd[2] += _0x1b9acd[3] >>> 16, _0x1b9acd[3] &= 65535, _0x1b9acd[2] += _0x3cbea1[2] + _0x20c970[2], _0x1b9acd[1] += _0x1b9acd[2] >>> 16, _0x1b9acd[2] &= 65535, _0x1b9acd[1] += _0x3cbea1[1] + _0x20c970[1], _0x1b9acd[0] += _0x1b9acd[1] >>> 16, _0x1b9acd[1] &= 65535, _0x1b9acd[0] += _0x3cbea1[0] + _0x20c970[0], _0x1b9acd[0] &= 65535, [_0x1b9acd[0] << 16 | _0x1b9acd[1], _0x1b9acd[2] << 16 | _0x1b9acd[3]];
        }
        function _0x59912d(_0x2c1421, _0x8ab285) {
            _0x2c1421 = [_0x2c1421[0] >>> 16, 65535 & _0x2c1421[0], _0x2c1421[1] >>> 16, 65535 & _0x2c1421[1]], _0x8ab285 = [_0x8ab285[0] >>> 16, 65535 & _0x8ab285[0], _0x8ab285[1] >>> 16, 65535 & _0x8ab285[1]];
            var _0x5ee910 = [0, 0, 0, 0];
            return _0x5ee910[3] += _0x2c1421[3] * _0x8ab285[3], _0x5ee910[2] += _0x5ee910[3] >>> 16, _0x5ee910[3] &= 65535, _0x5ee910[2] += _0x2c1421[2] * _0x8ab285[3], _0x5ee910[1] += _0x5ee910[2] >>> 16, _0x5ee910[2] &= 65535, _0x5ee910[2] += _0x2c1421[3] * _0x8ab285[2], _0x5ee910[1] += _0x5ee910[2] >>> 16, _0x5ee910[2] &= 65535, _0x5ee910[1] += _0x2c1421[1] * _0x8ab285[3], _0x5ee910[0] += _0x5ee910[1] >>> 16, _0x5ee910[1] &= 65535, _0x5ee910[1] += _0x2c1421[2] * _0x8ab285[2], _0x5ee910[0] += _0x5ee910[1] >>> 16, _0x5ee910[1] &= 65535, _0x5ee910[1] += _0x2c1421[3] * _0x8ab285[1], _0x5ee910[0] += _0x5ee910[1] >>> 16, _0x5ee910[1] &= 65535, _0x5ee910[0] += _0x2c1421[0] * _0x8ab285[3] + _0x2c1421[1] * _0x8ab285[2] + _0x2c1421[2] * _0x8ab285[1] + _0x2c1421[3] * _0x8ab285[0], _0x5ee910[0] &= 65535, [_0x5ee910[0] << 16 | _0x5ee910[1], _0x5ee910[2] << 16 | _0x5ee910[3]];
        }
        function _0x5b5342(_0x11e5fb, _0x9656c) {
            return 32 === (_0x9656c %= 64) ? [_0x11e5fb[1], _0x11e5fb[0]] : 32 > _0x9656c ? [_0x11e5fb[0] << _0x9656c | _0x11e5fb[1] >>> 32 - _0x9656c, _0x11e5fb[1] << _0x9656c | _0x11e5fb[0] >>> 32 - _0x9656c] : (_0x9656c -= 32, [_0x11e5fb[1] << _0x9656c | _0x11e5fb[0] >>> 32 - _0x9656c, _0x11e5fb[0] << _0x9656c | _0x11e5fb[1] >>> 32 - _0x9656c]);
        }
        function _0xac8026(_0x4b6db7, _0x3de0c2) {
            return 0 === (_0x3de0c2 %= 64) ? _0x4b6db7 : 32 > _0x3de0c2 ? [_0x4b6db7[0] << _0x3de0c2 | _0x4b6db7[1] >>> 32 - _0x3de0c2, _0x4b6db7[1] << _0x3de0c2] : [_0x4b6db7[1] << _0x3de0c2 - 32, 0];
        }
        function _0x4a8ac8(_0x3adcb3, _0x4b95d9) {
            return [_0x3adcb3[0] ^ _0x4b95d9[0], _0x3adcb3[1] ^ _0x4b95d9[1]];
        }
        function _0x5c0971(_0x33f3d8) {
            return _0x4a8ac8(_0x33f3d8 = _0x59912d(_0x33f3d8 = _0x4a8ac8(_0x33f3d8 = _0x59912d(_0x33f3d8 = _0x4a8ac8(_0x33f3d8, [0, _0x33f3d8[0] >>> 1]), [4283543511, 3981806797]), [0, _0x33f3d8[0] >>> 1]), [3301882366, 444984403]), [0, _0x33f3d8[0] >>> 1]);
        }
        return {
            'hash128': function (_0x57f574, _0x539d16) {
                var _0x412c9a = _0x539d16 || 0;
                _0x539d16 = (_0x57f574 = _0x57f574 || '').length % 16;
                var _0xa4afdc = _0x57f574.length - _0x539d16,
                    _0xb1a546 = [0, _0x412c9a];
                _0x412c9a = [0, _0x412c9a];
                for (var _0x386760, _0x4bd304, _0x52d077 = [2277735313, 289559509], _0x3a5ce0 = [1291169091, 658871167], _0x414f65 = 0; _0x414f65 < _0xa4afdc; _0x414f65 += 16) {
                    _0x386760 = [255 & _0x57f574.charCodeAt(_0x414f65 + 4) | (255 & _0x57f574.charCodeAt(_0x414f65 + 5)) << 8 | (255 & _0x57f574.charCodeAt(_0x414f65 + 6)) << 16 | (255 & _0x57f574.charCodeAt(_0x414f65 + 7)) << 24, 255 & _0x57f574.charCodeAt(_0x414f65) | (255 & _0x57f574.charCodeAt(_0x414f65 + 1)) << 8 | (255 & _0x57f574.charCodeAt(_0x414f65 + 2)) << 16 | (255 & _0x57f574.charCodeAt(_0x414f65 + 3)) << 24], _0x4bd304 = [255 & _0x57f574.charCodeAt(_0x414f65 + 12) | (255 & _0x57f574.charCodeAt(_0x414f65 + 13)) << 8 | (255 & _0x57f574.charCodeAt(_0x414f65 + 14)) << 16 | (255 & _0x57f574.charCodeAt(_0x414f65 + 15)) << 24, 255 & _0x57f574.charCodeAt(_0x414f65 + 8) | (255 & _0x57f574.charCodeAt(_0x414f65 + 9)) << 8 | (255 & _0x57f574.charCodeAt(_0x414f65 + 10)) << 16 | (255 & _0x57f574.charCodeAt(_0x414f65 + 11)) << 24], _0xb1a546 = _0x391e04(_0x59912d(_0xb1a546 = _0x391e04(_0xb1a546 = _0x5b5342(_0xb1a546 = _0x4a8ac8(_0xb1a546, _0x386760 = _0x59912d(_0x386760 = _0x5b5342(_0x386760 = _0x59912d(_0x386760, _0x52d077), 31), _0x3a5ce0)), 27), _0x412c9a), [0, 5]), [0, 1390208809]), _0x412c9a = _0x391e04(_0x59912d(_0x412c9a = _0x391e04(_0x412c9a = _0x5b5342(_0x412c9a = _0x4a8ac8(_0x412c9a, _0x4bd304 = _0x59912d(_0x4bd304 = _0x5b5342(_0x4bd304 = _0x59912d(_0x4bd304, _0x3a5ce0), 33), _0x52d077)), 31), _0xb1a546), [0, 5]), [0, 944331445]);
                }
                switch (_0x386760 = [0, 0], _0x4bd304 = [0, 0], _0x539d16) {
                    case 15:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 14)], 48));
                    case 14:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 13)], 40));
                    case 13:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 12)], 32));
                    case 12:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 11)], 24));
                    case 11:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 10)], 16));
                    case 10:
                        _0x4bd304 = _0x4a8ac8(_0x4bd304, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 9)], 8));
                    case 9:
                        _0x412c9a = _0x4a8ac8(_0x412c9a, _0x4bd304 = _0x59912d(_0x4bd304 = _0x5b5342(_0x4bd304 = _0x59912d(_0x4bd304 = _0x4a8ac8(_0x4bd304, [0, _0x57f574.charCodeAt(_0x414f65 + 8)]), _0x3a5ce0), 33), _0x52d077));
                    case 8:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 7)], 56));
                    case 7:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 6)], 48));
                    case 6:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 5)], 40));
                    case 5:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 4)], 32));
                    case 4:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 3)], 24));
                    case 3:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 2)], 16));
                    case 2:
                        _0x386760 = _0x4a8ac8(_0x386760, _0xac8026([0, _0x57f574.charCodeAt(_0x414f65 + 1)], 8));
                    case 1:
                        _0xb1a546 = _0x4a8ac8(_0xb1a546, _0x386760 = _0x59912d(_0x386760 = _0x5b5342(_0x386760 = _0x59912d(_0x386760 = _0x4a8ac8(_0x386760, [0, _0x57f574.charCodeAt(_0x414f65)]), _0x52d077), 31), _0x3a5ce0));
                }
                return _0xb1a546 = _0x4a8ac8(_0xb1a546, [0, _0x57f574.length]), _0x412c9a = _0x391e04(_0x412c9a = _0x4a8ac8(_0x412c9a, [0, _0x57f574.length]), _0xb1a546 = _0x391e04(_0xb1a546, _0x412c9a)), _0xb1a546 = _0x5c0971(_0xb1a546), _0x412c9a = _0x391e04(_0x412c9a = _0x5c0971(_0x412c9a), _0xb1a546 = _0x391e04(_0xb1a546, _0x412c9a)), ('00000000' + (_0xb1a546[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (_0xb1a546[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (_0x412c9a[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (_0x412c9a[1] >>> 0).toString(16)).slice(-8);
            }
        };
    }();
    function _0x2f8473(_0x42f2f4) {
        _0x42f2f4 = JSON.stringify(_0x42f2f4), _0x42f2f4 = encodeURIComponent(_0x42f2f4);
        var _0x47903f = '',
            _0x4037c1 = 0;
        do {
            var _0x444766 = _0x42f2f4.charCodeAt(_0x4037c1++),
                _0x2ec0dc = _0x42f2f4.charCodeAt(_0x4037c1++),
                _0x190ffa = _0x42f2f4.charCodeAt(_0x4037c1++),
                _0x41680a = _0x444766 >> 2;
            _0x444766 = (3 & _0x444766) << 4 | _0x2ec0dc >> 4;
            var _0xe74a76 = (15 & _0x2ec0dc) << 2 | _0x190ffa >> 6,
                _0x336b17 = 63 & _0x190ffa;
            isNaN(_0x2ec0dc) ? _0xe74a76 = _0x336b17 = 64 : isNaN(_0x190ffa) && (_0x336b17 = 64), _0x47903f = _0x47903f + '23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(_0x41680a) + '23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(_0x444766) + '23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(_0xe74a76) + '23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-'.charAt(_0x336b17);
        } while (_0x4037c1 < _0x42f2f4.length);
        return _0x47903f + '/';
    }
    var _0x1e21c2 = [$.UA.substring(0, 90), 'zh-CN', 'applewebkit_chrome', '605.1.15', 'NA', 'NA', 32, '896x414', -480, 'sessionStorageKey', 'localStorageKey', 'indexedDbKey', 'openDatabase', 'NA', 'iPhone', 10, 'NA', '', null, null],
        _0x2010bb = _0x13eab1.hash128(_0x1e21c2.join('~~~'), 31),
        _0x31e82c = {
            'pin': '',
            'oid': '',
            'bizId': 'jd-babelh5',
            'fc': '',
            'mode': 'strict',
            'p': 's',
            'fp': _0x2010bb,
            'ctype': 0x1,
            'v': '3.1.1.0',
            'f': '3',
            'o': 'prodev.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html',
            'qs': '',
            'jsTk': '',
            'qi': ''
        },
        _0x2049a9 = _0x2f8473(_0x31e82c),
        _0x7b4eb6 = {},
        _0x1e21c2 = new Date();
    _0x7b4eb6.ts = {}, _0x7b4eb6.ts.deviceTime = _0x1e21c2.getTime();
    const _0x110bf0 = {};
    _0x110bf0.tdHash = null, _0x7b4eb6.ca = _0x110bf0;
    const _0x161255 = {};
    _0x161255.compatMode = 'CSS1Compat', _0x7b4eb6.m = _0x161255, _0x7b4eb6.fo = ['Arial Black', 'Bauhaus 93', 'Chalkduster', 'GungSeo', 'Hiragino Sans GB', 'Impact', 'Menlo', 'Papyrus', 'Rockwell'], _0x7b4eb6.n = {
        'vendorSub': '',
        'productSub': '20030107',
        'vendor': 'Apple Computer, Inc.',
        'maxTouchPoints': 0x1,
        'pdfViewerEnabled': false,
        'hardwareConcurrency': 0xa,
        'cookieEnabled': true,
        'appCodeName': 'Mozilla',
        'appName': 'Netscape',
        'appVersion': /\/(.+)/g.exec($.UA) && /\/(.+)/g.exec($.UA)[1] || $.UA,
        'platform': 'iPhone',
        'product': 'Gecko',
        'userAgent': $.UA,
        'language': 'zh-CN',
        'onLine': true,
        'webdriver': false,
        'javaEnabled': false,
        'deviceMemory': 0x8,
        'enumerationOrder': ['vendorSub', 'productSub', 'vendor', 'maxTouchPoints', 'scheduling', 'userActivation', 'doNotTrack', 'geolocation', 'connection', 'plugins', 'mimeTypes', 'pdfViewerEnabled', 'webkitTemporaryStorage', 'webkitPersistentStorage', 'hardwareConcurrency', 'cookieEnabled', 'appCodeName', 'appName', 'appVersion', 'platform', 'product', 'userAgent', 'language', 'languages', 'onLine', 'webdriver', 'getGamepads', 'javaEnabled', 'sendBeacon', 'vibrate', 'bluetooth', 'clipboard', 'credentials', 'keyboard', 'managed', 'mediaDevices', 'storage', 'serviceWorker', 'virtualKeyboard', 'wakeLock', 'deviceMemory', 'ink', 'hid', 'locks', 'mediaCapabilities', 'mediaSession', 'permissions', 'presentation', 'serial', 'gpu', 'usb', 'windowControlsOverlay', 'xr', 'userAgentData', 'clearAppBadge', 'getBattery', 'getUserMedia', 'requestMIDIAccess', 'requestMediaKeySystemAccess', 'setAppBadge', 'webkitGetUserMedia', 'getInstalledRelatedApps', 'registerProtocolHandler', 'unregisterProtocolHandler']
    }, _0x7b4eb6.p = [];
    const _0x467ded = {};
    _0x467ded.devicePixelRatio = 0x1, _0x467ded.screenTop = 0x0, _0x467ded.screenLeft = 0x0, _0x7b4eb6.w = _0x467ded;
    const _0x5d3bba = {};
    _0x5d3bba.availHeight = 0x380, _0x5d3bba.availWidth = 0x19e, _0x5d3bba.colorDepth = 0x18, _0x5d3bba.height = 0x380, _0x5d3bba.width = 0x19e, _0x5d3bba.pixelDepth = 0x18, _0x7b4eb6.s = _0x5d3bba;
    const _0xadbd1c = {};
    _0xadbd1c.ActiveBorder = 'rgb(118, 118, 118)', _0xadbd1c.ActiveCaption = 'rgb(0, 0, 0)', _0xadbd1c.AppWorkspace = 'rgb(255, 255, 255)', _0xadbd1c.Background = 'rgb(255, 255, 255)', _0xadbd1c.ButtonFace = 'rgb(239, 239, 239)', _0xadbd1c.ButtonHighlight = 'rgb(239, 239, 239)', _0xadbd1c.ButtonShadow = 'rgb(239, 239, 239)', _0xadbd1c.ButtonText = 'rgb(0, 0, 0)', _0xadbd1c.CaptionText = 'rgb(0, 0, 0)', _0xadbd1c.GrayText = 'rgb(128, 128, 128)', _0xadbd1c.Highlight = 'rgb(181, 213, 255)', _0xadbd1c.HighlightText = 'rgb(0, 0, 0)', _0xadbd1c.InactiveBorder = 'rgb(118, 118, 118)', _0xadbd1c.InactiveCaption = 'rgb(255, 255, 255)', _0xadbd1c.InactiveCaptionText = 'rgb(128, 128, 128)', _0xadbd1c.InfoBackground = 'rgb(255, 255, 255)', _0xadbd1c.InfoText = 'rgb(0, 0, 0)', _0xadbd1c.Menu = 'rgb(255, 255, 255)', _0xadbd1c.MenuText = 'rgb(0, 0, 0)', _0xadbd1c.Scrollbar = 'rgb(255, 255, 255)', _0xadbd1c.ThreeDDarkShadow = 'rgb(118, 118, 118)', _0xadbd1c.ThreeDFace = 'rgb(239, 239, 239)', _0xadbd1c.ThreeDHighlight = 'rgb(118, 118, 118)', _0xadbd1c.ThreeDLightShadow = 'rgb(118, 118, 118)', _0xadbd1c.ThreeDShadow = 'rgb(118, 118, 118)', _0xadbd1c.Window = 'rgb(255, 255, 255)', _0xadbd1c.WindowFrame = 'rgb(118, 118, 118)', _0xadbd1c.WindowText = 'rgb(0, 0, 0)', _0x7b4eb6.sc = _0xadbd1c;
    const _0x19d032 = {};
    _0x19d032.cookie = true, _0x19d032.localStorage = true, _0x19d032.sessionStorage = true, _0x19d032.globalStorage = false, _0x19d032.indexedDB = true, _0x7b4eb6.ss = _0x19d032, _0x7b4eb6.tz = -480, _0x7b4eb6.lil = '', _0x7b4eb6.wil = '', _0x7b4eb6.ts.deviceEndTime = new Date().getTime();
    var _0x14d31a = _0x2f8473(_0x7b4eb6);
    const _0x5d59c0 = {};
    _0x5d59c0.Accept = '*/*', _0x5d59c0['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8', _0x5d59c0.Origin = 'https://pro.m.jd.com', _0x5d59c0.Referer = 'https://pro.m.jd.com/', _0x5d59c0['User-Agent'] = $.UA;
    const _0x2e6190 = {};
    _0x2e6190.url = 'https://gia.jd.com/jsTk.do?a=' + _0x2049a9, _0x2e6190.body = 'd=' + _0x14d31a, _0x2e6190.headers = _0x5d59c0;
    const _0x5f1ce1 = _0x2e6190;
    return new Promise(_0x2b7ca4 => {
        $.dpost(_0x5f1ce1, async (_0x1fe842, _0x58541a, _0x46cc56) => {
            try {
                if (_0x1fe842) console.log(_0x1fe842); else {
                    let _0x264013 = $.toObj(_0x46cc56, _0x46cc56);
                    _0x264013 && typeof _0x264013 === 'object' && _0x264013.code == 0 && _0x264013.data && _0x264013.data.token ? $.eid_token = _0x264013.data.token : console.log(_0x46cc56);
                }
            } catch (_0x2bc749) {
                $.logErr(_0x2bc749, _0x58541a);
            } finally {
                _0x2b7ca4();
            }
        });
    });
}
function _0xbf2196(_0x22f838, _0x41085e, _0xa3dd39 = '') {
    class _0x40c2a6 {
        constructor(_0x2cea5c = '', _0x4ca66d = '', _0x25ccce = '') {
            this.appId = _0x2cea5c, this.v = '3.1', _0x4ca66d ? this.ua = _0x4ca66d : this.ua = this.__genUA(), this.fp = _0x25ccce ? _0x25ccce : this.__genFp();
        }
        ['__format'](_0x209485, _0x1263e9) {
            if (!_0x209485) _0x209485 = 'yyyy-MM-dd';
            var _0x45237c;
            !_0x1263e9 ? _0x45237c = Date.now() : _0x45237c = new Date(_0x1263e9);
            var _0x26baa3 = new Date(_0x45237c),
                _0x46d8e1 = _0x209485,
                _0x1ba0d6 = {
                    'M+': _0x26baa3.getMonth() + 1,
                    'd+': _0x26baa3.getDate(),
                    'D+': _0x26baa3.getDate(),
                    'h+': _0x26baa3.getHours(),
                    'H+': _0x26baa3.getHours(),
                    'm+': _0x26baa3.getMinutes(),
                    's+': _0x26baa3.getSeconds(),
                    'w+': _0x26baa3.getDay(),
                    'q+': Math.floor((_0x26baa3.getMonth() + 3) / 3),
                    'S+': _0x26baa3.getMilliseconds()
                };
            return /(y+)/i.test(_0x46d8e1) && (_0x46d8e1 = _0x46d8e1.replace(RegExp.$1, ''.concat(_0x26baa3.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x1ba0d6).forEach(_0x293406 => {
                if (new RegExp('('.concat(_0x293406, ')')).test(_0x46d8e1)) {
                    var _0x1ff2d5 = 'S+' === _0x293406 ? '000' : '00';
                    _0x46d8e1 = _0x46d8e1.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x1ba0d6[_0x293406] : ''.concat(_0x1ff2d5).concat(_0x1ba0d6[_0x293406]).substr(''.concat(_0x1ba0d6[_0x293406]).length));
                }
            }), _0x46d8e1;
        }
        ['__genUA']() {
            this.uid = $.CryptoJS.SHA1($.UserName + 'red').toString();
            let _0x26183c = this.uid,
                _0x5a01a7 = ['14.3'],
                _0x159050 = _0x5a01a7[Math.floor(Math.random() * _0x5a01a7.length)],
                _0x2f2b8f = ['12,1'],
                _0x2be4e3 = _0x2f2b8f[Math.floor(Math.random() * _0x2f2b8f.length)],
                _0x5db884 = ['wifi'],
                _0x4379d4 = _0x5db884[Math.floor(Math.random() * _0x5db884.length)],
                _0x668b04 = _0x159050.replace(/\./g, '_'),
                _0x3fb075 = [];
            _0x3fb075 = [['10.1.4', '167814']];
            let _0x37ed79 = Math.floor(Math.random() * _0x3fb075.length),
                _0x37d573 = _0x3fb075[_0x37ed79] ? _0x3fb075[_0x37ed79] : _0x3fb075[0];
            _0x2be4e3 = 'iPhone' + _0x2be4e3;
            let _0x56fbab = '';
            return _0x56fbab = 'jdapp;iPhone;' + _0x37d573[0] + ';' + _0x159050 + ';' + _0x26183c + ';network/' + _0x4379d4 + ';model/' + _0x2be4e3 + ';addressid/;appBuild/' + _0x37d573[1] + ';jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ' + _0x668b04 + ' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', _0x56fbab;
        }
        ['__genFp']() {
            function _0x2641e3(_0x295a16, _0x2fd740) {
                var _0x23f097 = [],
                    _0x28a42f = _0x295a16.length,
                    _0x41450f = _0x295a16.split(''),
                    _0x1be6c4 = '';
                for (; _0x1be6c4 = _0x41450f.shift();) {
                    if (Math.random() * _0x28a42f < _0x2fd740) {
                        _0x23f097.push(_0x1be6c4);
                        if (--_0x2fd740 == 0) break;
                    }
                    _0x28a42f--;
                }
                for (var _0x5fb9b8 = '', _0x46955e = 0; _0x46955e < _0x23f097.length; _0x46955e++) {
                    var _0xd9c822 = Math.random() * (_0x23f097.length - _0x46955e) | 0;
                    _0x5fb9b8 += _0x23f097[_0xd9c822], _0x23f097[_0xd9c822] = _0x23f097[_0x23f097.length - _0x46955e - 1];
                }
                return _0x5fb9b8;
            }
            function _0x87ad59(_0x4d9e8c, _0x5af594) {
                for (let _0x496316 of _0x5af594.slice()) _0x4d9e8c = _0x4d9e8c.replace(_0x496316, '');
                return _0x4d9e8c;
            }
            var _0x2c1bf7 = '0123456789',
                _0x43a310 = _0x2641e3(_0x2c1bf7, 3),
                _0x243a62 = Math.random() * 10 | 0,
                _0xb37f9 = _0x87ad59(_0x2c1bf7, _0x43a310),
                _0x3657d0 = {};
            _0x3657d0.size = _0x243a62, _0x3657d0.customDict = _0xb37f9;
            const _0x5b8be8 = {};
            _0x5b8be8.size = 14 - (_0x243a62 + 3) + 1, _0x5b8be8.customDict = _0xb37f9;
            var _0x1da6d7 = this.getRandomIDPro(_0x3657d0) + _0x43a310 + this.getRandomIDPro(_0x5b8be8) + _0x243a62,
                _0x3a80d8 = _0x1da6d7.split(''),
                _0x9c23fc = [];
            for (; _0x3a80d8.length > 0;) _0x9c23fc.push(9 - parseInt(_0x3a80d8.pop()));
            var _0x37376d = _0x9c23fc.join('');
            return _0x37376d;
        }
        ['getRandomIDPro']() {
            var _0x635b6a,
                _0xa6fae9,
                _0x4272af = undefined === (_0x5992df = (_0xa6fae9 = 0 < arguments.length && undefined !== arguments[0] ? arguments[0] : {}).size) ? 10 : _0x5992df,
                _0x5992df = undefined === (_0x5992df = _0xa6fae9.dictType) ? 'number' : _0x5992df,
                _0x17c02e = '';
            if ((_0xa6fae9 = _0xa6fae9.customDict) && 'string' == typeof _0xa6fae9) _0x635b6a = _0xa6fae9; else switch (_0x5992df) {
                case 'alphabet':
                    _0x635b6a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    break;
                case 'max':
                    _0x635b6a = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
                    break;
                case 'number':
                default:
                    _0x635b6a = '0123456789';
            }
            for (; _0x4272af--;) _0x17c02e += _0x635b6a[Math.random() * _0x635b6a.length | 0];
            return _0x17c02e;
        }
        ['Encrypt'](_0x5f040b, _0x53c549) {
            let _0x612c30 = $.CryptoJS.AES.encrypt(_0x5f040b, $.CryptoJS.enc.Utf8.parse(_0x53c549.key), {
                'iv': $.CryptoJS.enc.Utf8.parse(_0x53c549.iv),
                'mode': $.CryptoJS.mode.CBC,
                'padding': $.CryptoJS.pad.Pkcs7
            });
            return _0x612c30.ciphertext.toString();
        }
        async ['__genAlgo']() {
            const _0x443731 = {};
            _0x443731.ps = 'prompt', _0x443731.np = 'default';
            const _0x5f8b91 = {};
            _0x5f8b91.key = 'wm0!@w-s#ll1flo(', _0x5f8b91.iv = '0102030405060708';
            let _0x4e19d7 = {
                'wc': 0x0,
                'wd': 0x0,
                'l': 'zh-cn',
                'ls': 'zh-cn',
                'ml': 0x0,
                'pl': 0x0,
                'av': /\/(.+)/g.exec(this.ua) && /\/(.+)/g.exec(this.ua)[1] || this.ua,
                'ua': this.ua,
                'sua': /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || '',
                'pp': {},
                'pp1': '',
                'pm': _0x443731,
                'w': 0x19e,
                'h': 0x380,
                'ow': 0x19e,
                'oh': 0x380,
                'url': 'https://pro.m.jd.com/mall/active/2AFDsGQNAcLxkw5i9L87sGDEdPvE/index.html?unionActId=31165&d=&s=&cu=true&utm_source=kong&utm_medium=jingfen',
                'og': 'https://pro.m.jd.com',
                'pr': 0x3,
                're': 'https://u.jd.com/',
                'ai': this.appId,
                'fp': this.fp
            },
                _0x2b0625 = JSON.stringify(_0x4e19d7, null, 2),
                _0x24e8ac = this.Encrypt(_0x2b0625, _0x5f8b91);
            var _0x2bd8b5 = {
                'version': this.v,
                'fp': this.fp,
                'appId': this.appId.toString(),
                'timestamp': Date.now(),
                'platform': 'web',
                'expandParams': _0x24e8ac || ''
            };
            return new Promise(_0x59af00 => {
                const _0x47557d = {};
                _0x47557d.Accept = 'application/json', _0x47557d['Content-Type'] = 'application/json', _0x47557d['Accept-Encoding'] = 'gzip, deflate, br', _0x47557d['Accept-Language'] = 'zh-cn', _0x47557d.Origin = 'https://pro.m.jd.com', _0x47557d.Referer = 'https://pro.m.jd.com/', _0x47557d['user-agent'] = this.ua;
                let _0x354c99 = {
                    'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
                    'body': JSON.stringify(_0x2bd8b5),
                    'headers': _0x47557d,
                    'timeout': 0x7530
                };
                $.dpost(_0x354c99, async (_0xaff16e, _0x4aaa5d, _0xba33c2) => {
                    try {
                        if (_0xaff16e) console.log(_0xaff16e); else {
                            let _0x3fc5eb = $.toObj(_0xba33c2, _0xba33c2);
                            _0x3fc5eb && typeof _0x3fc5eb === 'object' && _0x3fc5eb.data && _0x3fc5eb.data.result && _0x3fc5eb.data.result.tk && (this.tk = _0x3fc5eb.data.result.tk, this.genKey = new Function('return ' + _0x3fc5eb.data.result.algo)());
                        }
                    } catch (_0x3855ec) {
                        $.logErr(_0x3855ec, _0x4aaa5d);
                    } finally {
                        _0x59af00();
                    }
                });
            });
        }
        ['__genH5st'](_0x49e231 = {}, _0x1f99f5 = '') {
            const _0x2509a9 = {};
            _0x2509a9.ua = this.ua, _0x2509a9.uid = this.uid;
            let _0x26cbfa = undefined,
                _0x167bb7 = _0x2509a9;
            if (this.tk && this.genKey) {
                this.time = Date.now(), this.timestamp = this.__format('yyyyMMddhhmmssSSS', this.time);
                let _0x380eaf = this.genKey(this.tk, this.fp.toString(), this.timestamp.toString(), this.appId.toString(), $.CryptoJS).toString();
                var _0x135bce = {},
                    _0x4a6b4e = null;
                _0x4a6b4e = Object.keys(_0x49e231).sort().map(function (_0x5a603d) {
                    var _0x372f8b = {};
                    return _0x372f8b.key = _0x5a603d, _0x372f8b.value = _0x49e231[_0x5a603d], _0x372f8b;
                }).filter(function (_0x16d09d) {
                    var _0x2e8b52 = _0x16d09d.value,
                        _0x353a57 = 'number' == typeof _0x2e8b52 && !isNaN(_0x2e8b52) || 'string' == typeof _0x2e8b52 || 'boolean' == typeof _0x2e8b52 || 'body' == _0x16d09d.key;
                    if (_0x353a57) {
                        if ('body' == _0x16d09d.key && typeof _0x16d09d.value == 'object') _0x16d09d.value = JSON.stringify(_0x16d09d.value);
                        _0x135bce[_0x16d09d.key] = _0x16d09d.value;
                    }
                    return _0x353a57;
                }), _0x49e231 = _0x135bce;
                let _0x523159 = '';
                _0x523159 = Object.keys(_0x49e231).map(function (_0x2ebad6) {
                    return _0x2ebad6 + ':' + (_0x2ebad6 == 'body' && _0x49e231[_0x2ebad6].length !== 64 && _0x49e231[_0x2ebad6].slice(0, 1) == '{' ? $.CryptoJS.SHA256(_0x49e231[_0x2ebad6]).toString($.CryptoJS.enc.Hex) : _0x49e231[_0x2ebad6]);
                }).join('&'), _0x523159 = $.CryptoJS.HmacSHA256(_0x523159, _0x380eaf).toString($.CryptoJS.enc.Hex);
                let _0x3da337 = {
                    'sua': /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua) && /\((i[^;]+;( U;)? CPU.+Mac OS X)/g.exec(this.ua)[1] || /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua) && /\((M[^;]+;( U;)? Intel.+Mac OS X [0-9_]+)/g.exec(this.ua)[1] || '',
                    'pp': {}
                };
                _0x1f99f5 && (_0x3da337.pp.p1 = _0x1f99f5), _0x3da337.fp = this.fp;
                const _0x26d389 = {};
                _0x26d389.key = 'wm0!@w_s#ll1flo(', _0x26d389.iv = '0102030405060708';
                let _0x183f91 = JSON.stringify(_0x3da337, null, 2),
                    _0x5a34a2 = this.Encrypt(_0x183f91, _0x26d389);
                _0x26cbfa = [this.timestamp, this.fp, this.appId.toString(), this.tk, _0x523159, this.v, this.time.toString(), _0x5a34a2].join(';'), _0x167bb7.t = _0x49e231.t;
            }
            return _0x167bb7.h5st = _0x26cbfa, _0x167bb7;
        }
    }
    _0x366c39 = new _0x40c2a6(_0x22f838, _0x41085e, _0xa3dd39);
}
function _0x416e0a() {
    class _0x50c764 {
        constructor() {
            this.UVCookie = '', this.ltr = 0, this.mr = [1, 0];
            const _0x1ecf82 = {};
            _0x1ecf82.href = 'https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html', _0x1ecf82.hrefs = 'https://pro.m.jd.com/mall/active/2KxaKmeh5hQkkGY6PGF6etgSFUp4/index.html';
            const _0x5d7d6c = {};
            _0x5d7d6c.cookie = '', _0x5d7d6c.cookies = '__jdc=123;', _0x5d7d6c.domain = 'prodev.m.jd.com', _0x5d7d6c.referrer = 'https://u.jd.com/', _0x5d7d6c.location = _0x1ecf82, this.document = _0x5d7d6c;
            const _0x17812e = {};
            _0x17812e.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', _0x17812e.userAgents = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', this.navigator = _0x17812e, this.window = {};
        }
        ['getUVCookie'](_0xf0a0e = '', _0xfe8c22 = '', _0x291311 = '', _0x32dff0 = '') {
            try {
                this.document.location.href = this.document.location.hrefs + '', this.document.cookie = this.document.cookies + '';
                if (_0x291311) this.document.location.href = _0x291311;
                if (_0x32dff0) this.document.cookie = _0x32dff0;
                this.UVCookie = '', this.navigator.userAgent = this.navigator.userAgents + '', this.ltr = 1011 + Math.round(31 * Math.random());
                if (_0xf0a0e) this.navigator.userAgent = _0xf0a0e;
                const _0x275fd3 = {};
                return _0x275fd3.ckJda = '__jda', _0x275fd3.ckJdb = '__jdb', _0x275fd3.ckJdv = '__jdv', _0x275fd3.ckJdc = '__jdc', _0x275fd3.refUrl = 'https://u.jd.com/', (this.lr = _0x275fd3, this.q(), this.s(_0xfe8c22), this.UVCookie);
            } catch (_0x4dc6b3) {
                console.log(_0x4dc6b3);
            }
        }
        ['s'](_0x50f4ab = '') {
            var _0x3d7fb2,
                _0x49698b,
                _0x41a748,
                _0x425f5b,
                _0x128533 = (this.getCookie(this.lr.ckJda) || '').split('.'),
                _0x4dcc60 = (this.getCookie(this.lr.ckJdb) || '').split('.'),
                _0x151e6e = (this.getCookie(this.lr.ckJdv) || '').split('|'),
                _0x1ddabe = this.getCookie(this.lr.ckJdc) || '',
                _0x42455f = parseInt((new Date().getTime() - this.ltr) / 1000),
                _0x5e9573 = 0,
                _0x39d7ca = 1,
                _0x5e4b50 = 'direct',
                _0x18c099 = '-',
                _0x2feebf = 'none',
                _0x557cf5 = '-';
            if (_0x128533.length > 3) for (var _0x1113db = 2; _0x1113db < 5 && _0x1113db < _0x128533.length; _0x1113db++) {
                var _0x3071ad = _0x128533[_0x1113db];
                _0x3071ad.length > 10 && (_0x128533[_0x1113db] = _0x3071ad.substr(0, 10));
            }
            _0x128533.length > 5 ? (_0x41a748 = _0x128533[0], _0x425f5b = _0x128533[1], _0x3d7fb2 = parseInt(_0x128533[2], 10), _0x49698b = parseInt(_0x128533[3], 10), _0x42455f = parseInt(_0x128533[4], 10), _0x39d7ca = parseInt(_0x128533[5], 10) || _0x39d7ca) : (_0x425f5b = this.genUuid(), _0x3d7fb2 = _0x42455f, _0x49698b = _0x42455f), this.lr.uuid = _0x425f5b, _0x4dcc60.length > 3 && (_0x41a748 || (_0x41a748 = _0x4dcc60[0]), _0x5e9573 = parseInt(_0x4dcc60[1], 10) || 0), _0x151e6e.length > 4 && (_0x41a748 || (_0x41a748 = _0x151e6e[0]), _0x5e4b50 = _0x151e6e[1], _0x18c099 = _0x151e6e[2], _0x2feebf = _0x151e6e[3], _0x557cf5 = _0x151e6e[4]), _0x1ddabe && '' !== _0x1ddabe && (_0x41a748 || (_0x41a748 = _0x1ddabe));
            var _0x28f63e,
                _0x3c72f6 = [],
                _0x572c04 = _0x4dcc60.length < 4,
                _0x3fe111 = this.getParameter('utm_source'),
                _0xdde1cc = false;
            if (_0x3fe111) {
                var _0x27aa77 = this.getParameter('utm_campaign'),
                    _0x280351 = this.getParameter('utm_medium'),
                    _0x173512 = this.getParameter('utm_term');
                _0x3c72f6.push(_0x3fe111 || _0x5e4b50), _0x3c72f6.push(_0x27aa77 || _0x18c099), _0x3c72f6.push(_0x280351 || _0x2feebf), _0x3c72f6.push(_0x173512 || _0x557cf5), _0x557cf5 = _0x3c72f6[3], _0xdde1cc = true;
            } else {
                var _0x3608f0,
                    _0x109e54 = this.lr.refUrl && this.lr.refUrl.split('/')[2],
                    _0x35eefa = false;
                if (_0x109e54 && _0x109e54.indexOf(this.lr.ckDomain) < 0) {
                    for (_0x3608f0 = this.lr.seo, _0x1113db = 0; _0x1113db < _0x3608f0.length; _0x1113db++) {
                        var _0x2153d4 = _0x3608f0[_0x1113db].split(':');
                        if (_0x109e54.indexOf(_0x2153d4[0].toLowerCase()) > -1 && this.lr.refUrl.indexOf((_0x2153d4[1] + '=').toLowerCase()) > -1) {
                            var _0xd92fa0 = this.getParameter(_0x2153d4[1], this.lr.refUrl);
                            /[^\x00-ÿ]/.test(_0xd92fa0) && (_0xd92fa0 = encodeURIComponent(_0xd92fa0)), _0x3c72f6.push(_0x2153d4[0]), _0x3c72f6.push('-'), _0x3c72f6.push('organic'), _0x3c72f6.push(_0xd92fa0 || 'not set'), _0x557cf5 = _0x3c72f6[3], _0x35eefa = true;
                            break;
                        }
                    }
                    _0x35eefa || (_0x109e54.indexOf('zol.com.cn') > -1 ? (_0x3c72f6.push('zol.com.cn'), _0x3c72f6.push('-'), _0x3c72f6.push('cpc'), _0x3c72f6.push('not set')) : (_0x3c72f6.push(_0x109e54), _0x3c72f6.push('-'), _0x3c72f6.push('referral'), _0x3c72f6.push('-')));
                }
            }
            _0x28f63e = _0x3c72f6.length > 0 && (_0x3c72f6[0] !== _0x5e4b50 || _0x3c72f6[1] !== _0x18c099 || _0x3c72f6[2] !== _0x2feebf) && 'referral' !== _0x3c72f6[2], _0x572c04 || !_0x572c04 && _0x28f63e ? (_0x5e4b50 = _0x3c72f6[0] || _0x5e4b50, _0x18c099 = _0x3c72f6[1] || _0x18c099, _0x2feebf = _0x3c72f6[2] || _0x2feebf, _0x557cf5 = _0x3c72f6[3] || _0x557cf5, _0x128533.length > 5 ? (_0x3d7fb2 = parseInt(_0x128533[2], 10), _0x49698b = parseInt(_0x128533[4], 10), _0x42455f = parseInt((new Date().getTime() - this.ltr) / 1000), _0x39d7ca++, _0x5e9573 = 1) : (_0x39d7ca = 1, _0x5e9573 = 1)) : _0x5e9573++;
            var _0x1af4fc = this.getPageParamFromSdk();
            if (_0x1af4fc && _0x1af4fc.vts) {
                var _0x518916 = 1 * _0x1af4fc.vts,
                    _0x55419a = 1 * _0x1af4fc.seq;
                (_0x518916 > _0x39d7ca || _0x518916 === _0x39d7ca && _0x55419a >= _0x5e9573) && (_0x39d7ca = _0x518916, _0x5e9573 = _0x55419a + 1);
            }
            if (_0x41a748 || (_0x41a748 = this.genHash(this.lr.ckDomain)), this.setCookie(this.lr.ckJda, [_0x41a748, _0x425f5b, _0x3d7fb2, _0x49698b, _0x42455f, _0x39d7ca || 1].join('.'), this.lr.ckDomain, this.lr.ckJdaExp), this.setCookie(this.lr.ckJdb, [_0x41a748, _0x5e9573, _0x425f5b + '|' + _0x39d7ca, _0x42455f].join('.'), this.lr.ckDomain, this.lr.ckJdbExp), _0xdde1cc || _0x28f63e || _0x151e6e.length < 5) {
                var _0x1a77cd = [_0x41a748, _0x5e4b50 || 'direct', _0x18c099 || '-', _0x2feebf || 'none', _0x557cf5 || '-', new Date().getTime() - this.ltr].join('|');
                this.setJdv(_0x1a77cd = encodeURIComponent(_0x1a77cd), _0x41a748);
            }
            this.setCookie(this.lr.ckJdc, _0x41a748, this.lr.ckDomain);
        }
        ['q']() {
            this.lr.rpDomain = this.lr.rpDomain || 'uranus.jd.com', this.lr.logUrl = '//' + this.lr.rpDomain + '/log/m';
            const _0x2edc6b = {};
            _0x2edc6b.pv = '1', _0x2edc6b.pf = '2', _0x2edc6b.cl = '3', _0x2edc6b.od = '4', _0x2edc6b.pd = '5', _0x2edc6b.hm = '6', _0x2edc6b.magic = '000001', this.lr.logType = _0x2edc6b, this.lr.useTmpCookie ? (this.lr.ckJda = '__tra', this.lr.ckJdb = '__trb', this.lr.ckJdc = '__trc', this.lr.ckJdu = '__tru') : (this.lr.ckJda = '__jda', this.lr.ckJdb = '__jdb', this.lr.ckJdc = '__jdc', this.lr.ckJdu = '__jdu'), this.lr.ckJdv = '__jdv', this.lr.ckWxAppCk = '__jdwxapp', this.lr.ckRefCls = '__jd_ref_cls', this.lr.ckJdaExp = 15552000000, this.lr.ckJdbExp = 1800000, this.lr.ckJduExp = 15552000000, this.lr.ckJdvExp = 1296000000, this.lr.ckJdvEmbeddedExp = 86400000, this.lr.ckWxAppCkExp = 15552000000, this.lr.mtSubsiteExp = 31536000000, this.lr.ckDomain = (this.document.domain.match(/[^.]+\.(com.cn|net.cn|org.cn|gov.cn|edu.cn)$/) || [''])[0] || this.document.domain.replace(/.*?([^.]+\.[^.]+)$/, '$1'), this.lr.title = this.document.title, this.lr.refUrl = this.document.referrer, this.lr.seo = ['i.easou.com:q', 'm.baidu.com:word', 'm.sm.cn:q', 'm.so.com:q', 'wap.sogou.com:keyword', 'm.sogou.com:keyword', 'wap.sogo.com:keyword', 'm.sogo.com:keyword', 'page.roboo.com:q', 'ask.com:q', 'baidu:word', 'baidu:wd', 'bing:q', 'easou:q', 'google:q', 'roboo:word', 'roboo:q', 'sm.cn:q', 'so.com:q', 'sogou:keyword', 'sogou:query', 'sogo.com:keyword', 'sogo.com:query', 'yahoo:p', 'yandex:text', 'yicha:key'];
        }
        ['setCookie'](_0x4ec1e0, _0x13ba37, _0x5d7b6c, _0x19b830) {
            if (_0x4ec1e0) {
                var _0x4a67b1 = '';
                if (_0x19b830) {
                    var _0x2f3b77 = new Date();
                    _0x2f3b77.setTime(_0x2f3b77.getTime() - this.ltr + _0x19b830), _0x4a67b1 = ';expires=' + _0x2f3b77.toGMTString();
                }
                this.UVCookie += _0x4ec1e0 + '=' + _0x13ba37 + '; ';
            }
        }
        ['setJdv'](_0x50d046, _0x1929c3, _0x139bb6) {
            var _0x167d54 = '';
            _0x167d54 = this.isPrey(10) && (!_0x50d046 || _0x50d046.length > 400) ? _0x1929c3 + '|direct|-|none|-|' + (new Date().getTime() - this.ltr) : _0x50d046;
            var _0x29bfe4 = _0x139bb6 || this.isEmbedded() ? this.lr.ckJdvEmbeddedExp : this.lr.ckJdvExp;
            this.setCookie(this.lr.ckJdv || '__jdv', _0x167d54, this.lr.ckDomain, _0x29bfe4);
        }
        ['getCookie'](_0x20a5be, _0x2470cd) {
            var _0x53042d = this.document.cookie.match(new RegExp('(^| )' + _0x20a5be + '=([^;]*)(;|$)'));
            return null !== _0x53042d ? _0x2470cd ? _0x53042d[2] : this.urlDecode(_0x53042d[2]) : '';
        }
        ['genUuid']() {
            return new Date().getTime() - this.ltr + '' + parseInt(2147483647 * Math.random());
        }
        ['getParameter'](_0x1cfd82, _0x2af503) {
            var _0x2d24ee = _0x2af503 || this.document.location.href,
                _0x232a57 = new RegExp('(?:^|&|[?]|[/])' + _0x1cfd82 + '=([^&]*)').exec(_0x2d24ee);
            return _0x232a57 ? this.urlDecode(_0x232a57[1]) : null;
        }
        ['urlDecode'](_0x125e83) {
            try {
                return decodeURIComponent(_0x125e83);
            } catch (_0x927724) {
                return _0x125e83;
            }
        }
        ['genHash'](_0x38e70c) {
            var _0x4cc47b,
                _0x4d1135 = 1,
                _0x308291 = 0;
            if (_0x38e70c) for (_0x4d1135 = 0, _0x4cc47b = _0x38e70c.length - 1; _0x4cc47b >= 0; _0x4cc47b--) {
                _0x4d1135 = 0 !== (_0x308291 = 266338304 & (_0x4d1135 = (_0x4d1135 << 6 & 268435455) + (_0x308291 = _0x38e70c.charCodeAt(_0x4cc47b)) + (_0x308291 << 14))) ? _0x4d1135 ^ _0x308291 >> 21 : _0x4d1135;
            }
            return _0x4d1135;
        }
        ['isPrey'](_0x58d44a) {
            if (_0x58d44a >= 100) return true;
            var _0x4de6f6 = this.lr.uuid,
                _0x4d2dd4 = _0x4de6f6.substr(_0x4de6f6.length - 2);
            return !!_0x4d2dd4 && 1 * _0x4d2dd4 < _0x58d44a;
        }
        ['isEmbedded']() {
            var _0x506058 = this.navigator.userAgent || '';
            return /^(jdapp|jdltapp|jdpingou);/.test(_0x506058) || this.isJdLog();
        }
        ['isJdLog']() {
            return (this.navigator.userAgent || '').indexOf(';jdlog;') > -1;
        }
        ['getPageParamFromSdk']() {
            var _0x185830, _0x551ba5;
            try {
                this.window.JDMAUnifyBridge && this.window.JDMAUnifyBridge.JDMAGetMPageParam ? _0x551ba5 = JDMAUnifyBridge.JDMAGetMPageParam() : this.window.JDMAGetMPageParam ? _0x551ba5 = JDMAGetMPageParam() : this.window.webkit && this.window.webkit.messageHandlers && this.window.webkit.messageHandlers.JDMASetMPageParam && (_0x551ba5 = this.window.prompt('JDMAGetMPageParam', '')), _0x551ba5 && (_0x185830 = JSON.parse(_0x551ba5));
            } catch (_0x17c6bb) { }
            return _0x185830;
        }
        ['time'](_0x16e1cd, _0x4ecc6e = null) {
            const _0x477f50 = _0x4ecc6e ? new Date(_0x4ecc6e) : new Date();
            let _0x51fe22 = {
                'M+': _0x477f50.getMonth() + 1,
                'd+': _0x477f50.getDate(),
                'H+': _0x477f50.getHours(),
                'm+': _0x477f50.getMinutes(),
                's+': _0x477f50.getSeconds(),
                'q+': Math.floor((_0x477f50.getMonth() + 3) / 3),
                'S': _0x477f50.getMilliseconds()
            };
            /(y+)/.test(_0x16e1cd) && (_0x16e1cd = _0x16e1cd.replace(RegExp.$1, (_0x477f50.getFullYear() + '').substr(4 - RegExp.$1.length)));
            for (let _0x45e743 in _0x51fe22) new RegExp('(' + _0x45e743 + ')').test(_0x16e1cd) && (_0x16e1cd = _0x16e1cd.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x51fe22[_0x45e743] : ('00' + _0x51fe22[_0x45e743]).substr(('' + _0x51fe22[_0x45e743]).length)));
            return _0x16e1cd;
        }
    }
    _0x3d5ece = new _0x50c764();
}

function _0x339ede(_0x105d2a) {
    if (typeof _0x105d2a == 'string') try {
        return JSON.parse(_0x105d2a);
    } catch (_0x2ab23c) {
        return console.log(_0x2ab23c), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}
function _0x5d6ca5(_0x454e3c) {
    _0x454e3c = _0x454e3c || 32;
    let _0x4aea4f = 'abcdef0123456789',
        _0x2f793f = _0x4aea4f.length,
        _0x44ac23 = '';
    for (i = 0; i < _0x454e3c; i++) _0x44ac23 += _0x4aea4f.charAt(Math.floor(Math.random() * _0x2f793f));
    return _0x44ac23;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000); let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

