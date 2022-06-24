/*

2022.6.24 改，去助力
原脚本：https://raw.githubusercontent.com/hyzaw/AllJDScripts/3e6ae2d71bf715cd015fb7861d355a3300c87cdb/jd_wuxian_sign.js

说明: 超级无线店铺签到多合一

不能并发,不能并发,不能并发,不能并发

环境变量:
SEVENDAY_LIST,SEVENDAY_LIST2,SEVENDAY_LIST3, 多活动id , 分开&活动具体看连接
0 0 * * * jd_sevenDay.js

自行添加签到ID,部份ID需要签到几天才给奖品,先到先得



*/
const $ = new Env('超级无线店铺签到');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
let activityIdList = [];
let activityIdList2 = [];
let activityIdList3 = [];
let lz_cookie = {};
if (process.env.SEVENDAY_LIST && process.env.SEVENDAY_LIST != '') {
    activityIdList = process.env.SEVENDAY_LIST.split('&');
}
if (process.env.SEVENDAY_LIST2 && process.env.SEVENDAY_LIST2 != '') {
    activityIdList2 = process.env.SEVENDAY_LIST.split('&');
}
if (process.env.SEVENDAY_LIST3 && process.env.SEVENDAY_LIST3 != '') {
    activityIdList3 = process.env.SEVENDAY_LIST.split('&');
}
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach(_0x29cbbb => {
        cookiesArr.push(jdCookieNode[_0x29cbbb]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || '[]';
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(_0x25948c => _0x25948c.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(_0x263d96 => !!_0x263d96);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' });
        return;
    }
    $.getTokenErr = true;
    for (let _0x4c43f3 = 0; _0x4c43f3 < cookiesArr.length; _0x4c43f3++) {
        if (cookiesArr[_0x4c43f3]) {
            cookie = cookiesArr[_0x4c43f3];
            originCookie = cookiesArr[_0x4c43f3];
            newCookie = '';
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
            $.index = (_0x4c43f3 + 1);
            $.isLogin = true;
            $.nickName = '';
            await checkCookie();
            if (!$.isLogin) {
                $.msg($.name, '【提示】cookie已失效', ('京东账号' + $.index + ' ' + $.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' });
                if ($.isNode()) {
                    await notify.sendNotify(($.name + 'cookie已失效 - ') + $.UserName, (('京东账号' + $.index) + ' ' + $.UserName) + '\n请重新登录获取cookie');
                }
                continue;
            }
            $.bean = 0;
            $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
            $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
            for (let _0x2ae467 in activityIdList) {
                $.activityUrl = (('https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=' + $.activityId + '&venderId=') + $.venderId + '&adsource=&sid=&un_area=');
                $.activityId = activityIdList[_0x2ae467];
                await $.wait(2000);
            }
            for (let _0x7d08a0 in activityIdList2) {
                $.activityUrl = ('https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=' + $.activityId + '&venderId=' + $.venderId) + '&adsource=&sid=&un_area=';
                $.activityId = activityIdList2[_0x7d08a0];
                await $.wait(2000);
            }
            for (let _0x482b81 in activityIdList3) {
                $.activityUrl = ('https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=' + $.activityId + '&venderId=' + $.venderId + '&adsource=&sid=&un_area=');
                $.activityId = activityIdList3[_0x482b81];
                await $.wait(2000);
            }
            $.nowTime = Date.now();
            $.endTime = 1656518400000;
            $.CryptoJS = require('crypto-js');
            $.cookie = cookiesArr[_0x4c43f3];
            if ($.getTokenErr) {
                await main();
            } if ($.bean > 0) {
                message += (('\n【京东账号' + $.index) + '】' + ($.nickName || $.UserName) + ' \n       └ 获得 ' + $.bean) + ' 京豆。';
            }
        }
    } if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '', '\n');
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})().catch(_0x42c3bc => {
    $.log('', ('❌ ' + $.name + ', 失败! 原因: ') + _0x42c3bc + '!', '');
}).finally(() => {
    $.done();
});
async function signActivity() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', (('venderId=' + $.venderId + '&code=' + $.activityType) + '&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId) + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            console.log('签到 -> ' + $.activityId);
            await task('sign/sevenDay/wx/signUp', 'actId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin), 1);
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
async function signActivity2() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', (('venderId=' + $.venderId) + '&code=' + $.activityType + '&pin=') + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            console.log('签到 -> ' + $.activityId);
            await task('sign/wx/signUp', ('actId=' + $.activityId) + '&pin=' + encodeURIComponent($.secretPin), 1);
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
async function signActivity3() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task2('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing2();
        if ($.secretPin) {
            await task2('common/accessLogWithAD', ((('venderId=' + $.venderId) + '&code=' + $.activityType) + '&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=') + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            console.log('签到 -> ' + $.activityId);
            await task2('sign/wx/signUp', 'actId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin), 1);
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
function task(_0x507f86, _0xee3464, _0x524c2f = 0) {
    return new Promise(_0x475671 => {
        $.post(taskUrl(_0x507f86, _0xee3464, _0x524c2f), async (_0x461418, _0x5e3dc9, _0x334f93) => {
            try {
                if (_0x461418) {
                    $.log(_0x461418);
                } else {
                    if (_0x334f93) {
                        _0x334f93 = JSON.parse(_0x334f93);
                        if (_0x5e3dc9.headers['set-cookie']) {
                            cookie = originCookie + ';';
                            for (let _0x58df13 of _0x5e3dc9.headers['set-cookie']) {
                                lz_cookie[_0x58df13.split(';')[0].substr(0, _0x58df13.split(';')[0].indexOf('='))] = _0x58df13.split(';')[0].substr(_0x58df13.split(';')[0].indexOf('=') + 1);
                            } for (const _0x508448 of Object.keys(lz_cookie)) {
                                cookie += (_0x508448 + '=' + lz_cookie[_0x508448] + ';');
                            }
                        } if (_0x334f93) {
                            switch (_0x507f86) {
                                case 'customer/getSimpleActInfoVo':
                                    $.activityId = _0x334f93.data.activityId;
                                    $.jdActivityId = _0x334f93.data.jdActivityId;
                                    $.venderId = _0x334f93.data.venderId;
                                    $.shopId = _0x334f93.data.shopId;
                                    $.activityType = _0x334f93.data.activityType;
                                    break;
                                case 'sign/sevenDay/wx/signUp':
                                    if (_0x334f93) {
                                        if (_0x334f93.isOk) {
                                            console.log('签到成功');
                                        } else {
                                            console.log(_0x334f93);
                                        }
                                    }
                                    break;
                                case 'sign/wx/signUp':
                                    if (_0x334f93) {
                                        if (_0x334f93.isOk) {
                                            console.log('签到成功');
                                        } else {
                                            console.log(_0x334f93);
                                        }
                                    }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x334f93));
                                    break;
                            }
                        }
                    }
                }
            } catch (_0x3799f9) {
                $.log(_0x3799f9);
            }
            finally {
                _0x475671();
            }
        });
    });
}
function task2(_0x429f41, _0x2f9fc3, _0x341f49 = 0) {
    return new Promise(_0x31d8ed => {
        $.post(taskUrl2(_0x429f41, _0x2f9fc3, _0x341f49), async (_0x3e1682, _0x4ea1cd, _0x294474) => {
            try {
                if (_0x3e1682) {
                    $.log(_0x3e1682);
                } else {
                    if (_0x294474) {
                        _0x294474 = JSON.parse(_0x294474);
                        if (_0x4ea1cd.headers['set-cookie']) {
                            cookie = (originCookie + ';');
                            for (let _0x2e6e20 of _0x4ea1cd.headers['set-cookie']) {
                                lz_cookie[_0x2e6e20.split(';')[0].substr(0, _0x2e6e20.split(';')[0].indexOf('='))] = _0x2e6e20.split(';')[0].substr(_0x2e6e20.split(';')[0].indexOf('=') + 1);
                            } for (const _0x5ea843 of Object.keys(lz_cookie)) {
                                cookie += (_0x5ea843 + '=' + lz_cookie[_0x5ea843] + ';');
                            }
                        } if (_0x294474) {
                            switch (_0x429f41) {
                                case 'customer/getSimpleActInfoVo':
                                    $.activityId = _0x294474.data.activityId;
                                    $.jdActivityId = _0x294474.data.jdActivityId;
                                    $.venderId = _0x294474.data.venderId;
                                    $.shopId = _0x294474.data.shopId;
                                    $.activityType = _0x294474.data.activityType;
                                    break;
                                case 'sign/sevenDay/wx/signUp':
                                    if (_0x294474) {
                                        if (_0x294474.isOk) {
                                            console.log('签到成功');
                                            if (_0x294474.signResult.giftName) {
                                                console.log(_0x294474.signResult.giftName);
                                            }
                                        } else {
                                            console.log(_0x294474.msg);
                                        }
                                    }
                                    break;
                                case 'sign/wx/signUp':
                                    if (_0x294474) {
                                        if (_0x294474.isOk) {
                                            console.log('签到成功');
                                            if (_0x294474.gift.giftName) {
                                                console.log(_0x294474.gift.giftName);
                                            }
                                        } else {
                                            console.log(_0x294474.msg);
                                        }
                                    }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x294474));
                                    break;
                            }
                        }
                    }
                }
            } catch (_0xe1463) {
                $.log(_0xe1463);
            }
            finally {
                _0x31d8ed();
            }
        });
    });
}
function taskUrl(_0x43798c, _0x1fb7e8, _0x14cbdf) {
    return {
        'url': _0x14cbdf ? ('https://lzkj-isv.isvjcloud.com/' + _0x43798c) : ('https://lzkj-isv.isvjcloud.com/sign/wx/' + _0x43798c), 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.comm', 'User-Agent': ('jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'), 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x1fb7e8
    };
}
function taskUrl2(_0x354022, _0x324f34, _0xe6302b) {
    return {
        'url': _0xe6302b ? ('https://cjhy-isv.isvjcloud.com/' + _0x354022) : 'https://cjhy-isv.isvjcloud.com/sign/wx/' + _0x354022, 'headers': { 'Host': 'cjhy-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://cjhy-isv.isvjcloud.comm', 'User-Agent': ('jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'), 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x324f34
    };
}
function getMyPing() {
    let _0x320a56 = { 'url': 'https://lzkj-isv.isvjcloud.com/customer/getMyPing', 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.com', 'User-Agent': (('jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/') + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'), 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': ('userId=' + $.venderId + '&token=') + $.token + '&fromType=APP' };
    return new Promise(_0x172672 => {
        $.post(_0x320a56, (_0x333f5f, _0x61737e, _0xf09649) => {
            try {
                if (_0x333f5f) {
                    $.log(_0x333f5f);
                } else {
                    if (_0x61737e.headers['set-cookie']) {
                        cookie = (originCookie + ';');
                        for (let _0x1f8910 of _0x61737e.headers['set-cookie']) {
                            lz_cookie[_0x1f8910.split(';')[0].substr(0, _0x1f8910.split(';')[0].indexOf('='))] = _0x1f8910.split(';')[0].substr(_0x1f8910.split(';')[0].indexOf('=') + 1);
                        } for (const _0xcfa0cf of Object.keys(lz_cookie)) {
                            cookie += (_0xcfa0cf + '=' + lz_cookie[_0xcfa0cf] + ';');
                        }
                    }
                    if (_0xf09649) {
                        _0xf09649 = JSON.parse(_0xf09649);
                        if (_0xf09649.result) {
                            $.log('你好：' + _0xf09649.data.nickname);
                            $.pin = _0xf09649.data.nickname;
                            $.secretPin = _0xf09649.data.secretPin;
                        } else {
                            $.log(_0xf09649.errorMessage);
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x3e77b5) {
                $.log(_0x3e77b5);
            }
            finally {
                _0x172672();
            }
        });
    });
}
function getMyPing2() {
    let _0x311154 = { 'url': 'https://cjhy-isv.isvjcloud.com/customer/getMyPing', 'headers': { 'Host': 'cjhy-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://cjhy-isv.isvjcloud.com', 'User-Agent': (('jdapp;iPhone;9.5.4;13.6;' + $.UUID) + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'), 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': ('userId=' + $.venderId + '&token=' + $.token) + '&fromType=APP&riskType=1' };
    return new Promise(_0x248ed4 => {
        $.post(_0x311154, (_0x4d73cf, _0x32a7cc, _0x392ae5) => {
            try {
                if (_0x4d73cf) {
                    $.log(_0x4d73cf);
                } else {
                    if (_0x32a7cc.headers['set-cookie']) {
                        cookie = (originCookie + ';');
                        for (let _0x1b4f7f of _0x32a7cc.headers['set-cookie']) {
                            lz_cookie[_0x1b4f7f.split(';')[0].substr(0, _0x1b4f7f.split(';')[0].indexOf('='))] = _0x1b4f7f.split(';')[0].substr(_0x1b4f7f.split(';')[0].indexOf('=') + 1);
                        } for (const _0x166375 of Object.keys(lz_cookie)) {
                            cookie += (_0x166375 + '=' + lz_cookie[_0x166375] + ';');
                        }
                    }
                    if (_0x392ae5) {
                        _0x392ae5 = JSON.parse(_0x392ae5);
                        if (_0x392ae5.result) {
                            $.log('你好：' + _0x392ae5.data.nickname);
                            $.pin = _0x392ae5.data.nickname;
                            $.secretPin = _0x392ae5.data.secretPin;
                        } else {
                            $.log(_0x392ae5.errorMessage);
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x17598f) {
                $.log(_0x17598f);
            }
            finally {
                _0x248ed4();
            }
        });
    });
}
function getFirstLZCK() {
    return new Promise(_0xde8e31 => {
        $.get({
            'url': $.activityUrl, 'headers': {
                'user-agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
            }
        }, (_0x37810f, _0x57b76d, _0xda295d) => {
            try {
                if (_0x37810f) {
                    console.log(_0x37810f);
                } else {
                    if (_0x57b76d.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x432529 of _0x57b76d.headers['set-cookie']) {
                            lz_cookie[_0x432529.split(';')[0].substr(0, _0x432529.split(';')[0].indexOf('='))] = _0x432529.split(';')[0].substr(_0x432529.split(';')[0].indexOf('=') + 1);
                        } for (const _0xe9cee6 of Object.keys(lz_cookie)) {
                            cookie += ((_0xe9cee6 + '=') + lz_cookie[_0xe9cee6] + ';');
                        }
                    }
                }
            } catch (_0x8e1c30) {
                console.log(_0x8e1c30);
            }
            finally {
                _0xde8e31();
            }
        });
    });
}
function getToken() {
    let _0x4ddb0a = { 'url': 'https://api.m.jd.com/client.action?functionId=isvObfuscator', 'headers': { 'Host': 'api.m.jd.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': cookie, 'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)', 'Accept-Language': 'zh-Hans-CN;q=1', 'Accept-Encoding': 'gzip, deflate, br' }, 'body': 'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988' };
    return new Promise(_0x2c9184 => {
        $.post(_0x4ddb0a, (_0x34283c, _0x1e0086, _0x11f936) => {
            try {
                if (_0x34283c) {
                    $.log(_0x34283c);
                } else {
                    if (_0x11f936) {
                        _0x11f936 = JSON.parse(_0x11f936);
                        if (_0x11f936.code === '0') {
                            $.token = _0x11f936.token;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x18330a) {
                $.log(_0x18330a);
            }
            finally {
                _0x2c9184();
            }
        });
    });
}
function random(_0x50ba14, _0x6ca726) {
    return Math.floor((Math.random() * _0x6ca726) - _0x50ba14) + _0x50ba14;
}
function getUUID(_0x47f2b0 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x3ae625 = 0) {
    return _0x47f2b0.replace(/[xy]/g, function (_0x3457f4) {
        var _0x2cac8c = (Math.random() * 0x10 | 0x0), _0x24f6af = _0x3457f4 == 'x' ? _0x2cac8c : (_0x2cac8c & 0x3 | 0x8);
        if (_0x3ae625) {
            uuid = _0x24f6af.toString(36).toUpperCase();
        } else {
            uuid = _0x24f6af.toString(36);
        }
        return uuid;
    });
}
function checkCookie() {
    const _0x41ad4e = { 'url': 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', 'headers': { 'Host': 'me-api.jd.com', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': cookie, 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1', 'Accept-Language': 'zh-cn', 'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&', 'Accept-Encoding': 'gzip, deflate, br' } };
    return new Promise(_0x507258 => {
        $.get(_0x41ad4e, (_0x48c976, _0x515708, _0x5d814a) => {
            try {
                if (_0x48c976) {
                    $.logErr(_0x48c976);
                } else {
                    if (_0x5d814a) {
                        _0x5d814a = JSON.parse(_0x5d814a);
                        if (_0x5d814a.retcode === '1001') {
                            $.isLogin = false;
                            return;
                        } if ((_0x5d814a.retcode === '0') && _0x5d814a.data.hasOwnProperty('userInfo')) {
                            $.nickName = _0x5d814a.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x2ae133) {
                $.logErr(_0x2ae133);
            }
            finally {
                _0x507258();
            }
        });
    });
}
async function main() {
    $.token = '';
    $.dm_fans = '';
    $.UA = getUA();
    $.body = 'body=%7B%22url%22%3A%22https%3A%5C/%5C/hdb-isv.isvjcloud.com%5C/h5%5C/pages%5C/inviteJoin%5C/inviteJoin?id%3D82f04760a42ce9ef7f29756d06be0730%26userId%3D1000085868%26inviterNick%3D371ece17e569bfc7e06f25ab158ec11dc3da0e367309f2954a37cfa81a874895d7045a9b3a655171e4660df754fa1b9825ce984ab1890a6bf2a66a6530826e2d202b479aec830eb455bcc780b3596c6474f680bfa090fcdc3258593eadf48e6b%26from%3Dkouling%26sid%3D196a371f51286dbf473d6306576427bw%26un_area%3D22_1930_49324_49411%22%2C%22id%22%3A%22%22%7D&build=168113&client=apple&clientVersion=11.0.6&d_brand=apple&d_model=iPhone9%2C1&ef=1&eid=eidIe8a6812240seKRvnMp7GTeq%2BrsGw5e0UOikb6Kdc9AOtZBGMmTPUOCWpGCp9ll8Q8zFY7AuISl/zmcY0/FVC7CRch3NwVcfzQC7nhi4j9PlCvxpK&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22DzUmAtOzCzG%3D%22%2C%22wifiBssid%22%3A%22YtDwDzHrEWO2ZwS1C2C2CNCyEJY2Ctc2EJK5ZNTvDWG%3D%22%2C%22osVersion%22%3A%22CJUkDG%3D%3D%22%2C%22area%22%3A%22CtTpCJuzCP80EJCyDP80EJGnCG%3D%3D%22%2C%22openudid%22%3A%22YzVvYtY0CWYnZJGmYtCzEWUyZJOnCJYnEWYyCwVwCWU1ZwHtDzqzDK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1655664646%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=94&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=10ccccf3797a5d90a3a4eb242837fffd&st=1655664650712&sv=102&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJWa9KCUMZ70VnoHOcdE4MOucPTSWS1AhbeBFpXD2u0ZBcWdpTcxipVXj45co/m4S9HBzPnh2b70ZcYMCkZM1hsvVRuB771BA1n%2BisMgXm6K7C3Cl3y3VStu8bHf9v42kVgEayYBMxqXB5eH1lZKg%2Bl6/QtfcW4doe3Kkhn0WymUDldHEX8CxFQg%3D%3D';
    $.token = await getToke();
    if (!$.token) {
        return;
    }
    $.buyernick = undefined;
    let _0xd5f9a4 = await takePost('fans/login', { 'method': '/front/fans/login', 'token': $.token, 'source': '01' });
    if (_0xd5f9a4 && _0xd5f9a4.aesBuyerNick) { } else {
        return;
    }
    $.buyernick = _0xd5f9a4.aesBuyerNick;
    await takePost('activity/loadFrontAct', { 'method': '/front/activity/loadFrontAct', 'buyerNick': $.buyernick });
    await takePost('activity/reportPVUV', { 'method': '/front/activity/reportPVUV', 'buyerNick': $.buyernick });
    await takePost('activity/loadFrontAward', { 'method': '/front/activity/loadFrontAward', 'buyerNick': $.buyernick });
    await takePost('activity/loadFrontItems', { 'method': '/front/activity/loadFrontItems', 'buyerNick': $.buyernick });
}
async function takePost(_0x5e9a22, _0x62f33c) {
    let _0x58a672 = /[^\u4e00-\u9fa5\w]/g;
    let _0x541d66 = JSON.stringify(_0x62f33c.method).replace(_0x58a672, '');
    let _0x581e3d = Date.now();
    let _0x489df8 = ('actid82f04760a42ce9ef7f29756d06be0730buyernick' + $.buyernick + 'sysmethod' + _0x541d66 + 'timestamp' + _0x581e3d);
    let _0x218f77 = $.CryptoJS.HmacSHA256(_0x489df8, '893121509DFEF0E741895AA615D9B262').toString($.CryptoJS.enc.Hex);
    let _0x43e237 = {
        'appJsonParams': {
            'id': '82f04760a42ce9ef7f29756d06be0730', 'userId': 1000085868, ..._0x62f33c
        }, 'sysParams': { 'sign': _0x218f77, 'timestamp': _0x581e3d, 'sysmethod': _0x541d66, 'actid': '82f04760a42ce9ef7f29756d06be0730' }
    };
    if ($.buyernick) {
        _0x43e237.sysParams.buyernick = $.buyernick;
    }
    let _0x3fcff2 = { 'url': ('https://hdb-isv.isvjcloud.com/front/' + _0x5e9a22), 'body': JSON.stringify(_0x43e237), 'headers': { 'Host': 'hdb-isv.isvjcloud.com', 'Connection': 'keep-alive', 'Content-Length': JSON.stringify(_0x43e237).length, 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'User-Agent': $.UA, 'Content-Type': 'application/json; charset=UTF-8', 'Origin': 'https://hdb-isv.isvjcloud.com', 'Sec-Fetch-Site': 'same-origin', 'Sec-Fetch-Mode': 'cors', 'Sec-Fetch-Dest': 'empty', 'Referer': $.thisActivityUrl, 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7', 'Cookie': '' + $.dm_fans } };
    return new Promise(_0x48ea88 => {
        $.post(_0x3fcff2, async (_0x4898bd, _0x58d3ab, _0xa84010) => {
            try {
                dealCK(_0x58d3ab);
                if (_0x4898bd && !_0xa84010) { } else {
                    _0xa84010 = JSON.parse(_0xa84010);
                }
            } catch (_0x33bae5) { }
            finally {
                _0x48ea88(_0xa84010.result || '');
            }
        });
    });
}
function dealCK(_0xb48b4e) {
    if (_0xb48b4e === undefined) {
        return;
    }
    let _0x4a88c0 = _0xb48b4e.headers['set-cookie'] || _0xb48b4e.headers['Set-Cookie'] || '';
    if (_0x4a88c0) {
        let _0xb7ba58 = _0x4a88c0.filter(_0x5a8467 => _0x5a8467.indexOf('dm_fans') !== -1)[0];
        if (_0xb7ba58 && (_0xb7ba58.indexOf('dm_fans=') > -1)) {
            $.dm_fans = _0xb7ba58.split(';') && (_0xb7ba58.split(';')[0] + ';') || '';
        }
    }
}
async function getToke() {
    let _0x3fc51f = { 'url': 'https://api.m.jd.com/client.action?functionId=isvObfuscator', 'body': $.body, 'headers': { 'Host': 'api.m.jd.com', 'accept': '*/*', 'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)', 'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6', 'content-type': 'application/x-www-form-urlencoded', 'Cookie': $.cookie } };
    return new Promise(_0x441085 => {
        $.post(_0x3fc51f, async (_0x46c1b5, _0x5951b5, _0x470a3e) => {
            try {
                if (_0x46c1b5) {
                    $.getTokenErr = false;
                } else {
                    _0x470a3e = JSON.parse(_0x470a3e);
                }
            } catch (_0x5bd104) { }
            finally {
                _0x441085(_0x470a3e.token || '');
            }
        });
    });
}
function getUA() {
    $.UUID = randomString(40);
    const _0x580339 = { '167814': '10.1.4', '167841': '10.1.6' };
    $.osVersion = (randomNum(12, 14) + '.' + randomNum(0, 6));
    let _0x1f941d = ('network/' + ['4g', '5g', 'wifi'][randomNum(0, 2)]);
    $.mobile = ('iPhone' + randomNum(9, 13)) + ',' + randomNum(1, 3);
    $.build = ['167814', '167841', '167894'][randomNum(0, 1)];
    $.appVersion = _0x580339[$.build];
    return (((('jdapp;iPhone;' + $.appVersion) + ';' + $.osVersion + ';' + $.UUID + ';') + _0x1f941d + ';model/') + $.mobile + ';addressid/' + randomNum(1000000000) + ';appBuild/' + $.build) + ';jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS ' + $.osVersion.replace(/\./g, '_') + ' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x10a452, _0x33b17 = 0) {
    var _0x189285 = '', _0xfc1fd1 = _0x10a452, _0x49f510 = [...Array(35).keys()].map(_0xc05bff => _0xc05bff.toString(36));
    if (_0x33b17) {
        _0xfc1fd1 = Math.floor((Math.random() * _0x33b17 - _0x10a452) + 1 + _0x10a452);
    }
    for (let _0x5417dc = 0; _0x5417dc < _0xfc1fd1;) {
        let _0x54cada = Math.random().toString(16).substring(2);
        if (_0xfc1fd1 - _0x5417dc > _0x54cada.length) {
            _0x189285 += _0x54cada;
            _0x5417dc += _0x54cada.length;
        } else {
            _0x189285 += _0x54cada.slice(_0x5417dc - _0xfc1fd1);
            _0x5417dc += _0x54cada.length;
        }
    }
    return _0x189285;
}
function randomNum(_0x33f190, _0x409e45) {
    if (arguments.length === 0) return Math.random();
    if (!_0x409e45) _0x409e45 = 10 ** Math.log(_0x33f190) * Math.LOG10E + 0x1 | (0 - 1);
    return Math.floor((Math.random() * _0x409e45) - _0x33f190 + 1 + _0x33f190);
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
