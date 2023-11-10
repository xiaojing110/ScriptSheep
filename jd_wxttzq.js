/*
天天来赚钱，入口：小程序
updatetime：2023/11/06
author：https://github.com/6dylan6/jdpro
*/
const $ = new Env("天天来赚钱");

const _0x19ac24 = $.isNode() ? require('./jdCookie.js') : '',
    _0x308223 = $.isNode() ? require('./sendNotify') : '';
let _0xfe2f8 = [],
    _0x10584e = '';
if ($.isNode()) {
    var _0x5a937f = new Buffer.from('44796c616e', 'Hex').toString('utf8');
    Object.keys(_0x19ac24).forEach(_0x6ce3a5 => {
        _0xfe2f8.push(_0x19ac24[_0x6ce3a5]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else {
    let _0x15e94c = $.getdata('CookiesJD') || '[]';
    _0x15e94c = JSON.parse(_0x15e94c), _0xfe2f8 = _0x15e94c.map(_0x4355ed => _0x4355ed.cookie), _0xfe2f8.reverse(), _0xfe2f8.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]), _0xfe2f8.reverse(), _0xfe2f8 = _0xfe2f8.filter(_0x438c52 => !!_0x438c52);
}
let _0x33f02c = true;
!(async () => {
    if (!_0xfe2f8[0]) {
        const _0x326eb0 = {};
        _0x326eb0['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x326eb0);
        return;
    }
    $.log('\nTG频道：https://t.me/dylan_jdpro');
    for (let _0x601fe6 = 0; _0x601fe6 < _0xfe2f8.length; _0x601fe6++) {
        if (_0xfe2f8[_0x601fe6]) {
            _0x10584e = _0xfe2f8[_0x601fe6], $.UserName = decodeURIComponent(_0x10584e.match(/pt_pin=(.+?);/) && _0x10584e.match(/pt_pin=(.+?);/)[1]), $.index = _0x601fe6 + 1, $.isLogin = true, $.nickName = '', await _0x3c6766(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
            if (!$.isLogin) {
                const _0x141614 = {};
                _0x141614['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x141614);
                if ($.isNode()) {
                    await _0x308223.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
                }
                continue;
            }
            await _0x171aad();
        }
    }
})().catch(_0x5c4c6a => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5c4c6a + '!', '');
}).finally(() => {
    $.done();
});
async function _0x171aad() {
    try {
        await _0x4b956a(), await $.wait(1000);
        _0x33f02c && (await _0x480872($.signscene), await $.wait(1000), await _0x31560c($.signscene), await $.wait(1000), await _0x480872($.taskonescene), await $.wait(500));
        $.log('\n开始任务...');
        for (let _0x102909 of $.taskList) {
            if (_0x102909.status === 0) {
                $.log('去做---' + _0x102909.title);
                await _0x23093d(_0x102909.itemId, _0x102909.scanAssignmentId, 1);
                $.log('等待' + _0x102909.times + '秒');
                await $.wait(_0x102909.times * 1000 + 500);
                await _0x23093d(_0x102909.itemId, _0x102909.scanAssignmentId, 0);
                $.log('领取奖励...');
                await $.wait(1000);
                await _0x46d2c9(_0x102909.scanAssignmentId);
            } else _0x102909.status === 1 ? await _0x46d2c9(_0x102909.scanAssignmentId) : $.log(_0x102909.title + '---已完成');
        }
        await $.wait(2000);
    } catch (_0x26f7d3) {
        $.logErr(_0x26f7d3);
    }
}
async function _0x31560c(_0x5b1ba4) {
    let _0x46890c = 'mini_doSign';
    const _0x549c8b = {};
    _0x549c8b.itemId = '1';
    let _0x71bdb9 = _0x549c8b;
    _0x71bdb9 = await _0x2d3986(_0x46890c, _0x71bdb9, '60d61');
    let _0x3c6914 = _0x10584e.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x524923 => {
        const _0x15c0f8 = {};
        _0x15c0f8.Host = 'api.m.jd.com', _0x15c0f8.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x15c0f8['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x15c0f8.cookie = _0x10584e + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x5b1ba4 + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x3c6914 + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x3c6914 + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;');
        const _0x562289 = {};
        _0x562289.url = 'https://api.m.jd.com/mini_doSign?' + _0x71bdb9 + '&clientType=wxapp&loginType=2&_ste=2', _0x562289.headers = _0x15c0f8;
        const _0x107a95 = _0x562289;
        $.post(_0x107a95, (_0x16ff98, _0x13d287, _0x4b84c3) => {
            try {
                _0x16ff98 ? ($.logErr(_0x16ff98), $.log('dailysign api请求失败，请检查网路重试')) : (_0x4b84c3 = JSON.parse(_0x4b84c3), _0x4b84c3.subCode == 0 ? $.log('签到成功: ' + _0x4b84c3.data.signDays + '天, ' + _0x4b84c3.data.toastMsg) : $.log('签到失败：' + JSON.stringify(_0x4b84c3) + '\n'));
            } catch (_0x30a45f) {
                $.logErr(_0x30a45f);
            } finally {
                _0x524923();
            }
        });
    });
}
async function _0x1d47dc(_0x35f6e7) {
    let _0x1d1afb = 'miniTask_getDrainageTaskReward';
    const _0x29ae1b = {};
    _0x29ae1b.rewardAssignmentId = '79dRvBQWmT2Dwyu4vvyZUt1Pa6W';
    let _0x2467db = _0x29ae1b;
    _0x2467db = await _0x2d3986(_0x1d1afb, _0x2467db, '60d61');
    let _0x31ca6a = _0x10584e.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x14683f => {
        const _0x33f99d = {
            'url': 'https://api.m.jd.com/miniTask_getDrainageTaskReward?' + _0x2467db + '&clientType=wxapp&loginType=2&_ste=2',
            'headers': {
                'Host': 'api.m.jd.com',
                'Referer': 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                'cookie': _0x10584e + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x35f6e7 + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x31ca6a + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x31ca6a + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;')
            }
        };
        $.post(_0x33f99d, (_0x3b6e1d, _0x210f7d, _0x5d9895) => {
            try {
                _0x3b6e1d ? ($.logErr(_0x3b6e1d), $.log('taskone api请求失败，请检查网路重试')) : (_0x5d9895 = JSON.parse(_0x5d9895), _0x5d9895.subCode == 0 ? $.log('指定入口获得: ' + _0x5d9895.data.rewardAmount + '金币') : $.log('失败：' + JSON.stringify(_0x5d9895) + '\n'));
            } catch (_0x104470) {
                $.logErr(_0x104470);
            } finally {
                _0x14683f();
            }
        });
    });
}
async function _0x4b956a() {
    let _0x24c894 = 'MiniTask_ChannelPage',
        _0x5c06f2 = {};
    return _0x5c06f2 = await _0x2d3986(_0x24c894, _0x5c06f2, '60d61'), new Promise(async _0x12c018 => {
        const _0x2ceca9 = {};
        _0x2ceca9.Host = 'api.m.jd.com', _0x2ceca9.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x2ceca9['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x2ceca9.cookie = _0x10584e;
        const _0x57f6df = {};
        _0x57f6df.url = 'https://api.m.jd.com/MiniTask_ChannelPage?' + _0x5c06f2 + '&clientType=wxapp&loginType=2&_ste=2', _0x57f6df.headers = _0x2ceca9;
        const _0x576f84 = _0x57f6df;
        $.post(_0x576f84, (_0x178277, _0x2820ba, _0x1abfb3) => {
            try {
                if (_0x178277) $.logErr(_0x178277), $.log('querySignList api请求失败，请检查网路重试'); else {
                    _0x1abfb3 = JSON.parse(_0x1abfb3);
                    if (_0x1abfb3.subCode == 0) {
                        $.taskList = _0x1abfb3.data.scanTaskList;
                        $.signscene = _0x1abfb3.data?.['userSignScene'];
                        $.taskonescene = _0x1abfb3.data?.['drainageTask']?.['scene'];
                        $.log('当前金币数量：' + _0x1abfb3.data.point + ', 约为' + (_0x1abfb3.data.totalAmount || 0) + '元\n');
                        _0x12c018($.taskList);
                    } else {
                        $.log(JSON.stringify(_0x1abfb3));
                    }
                }
            } catch (_0x347251) {
                $.logErr(_0x347251);
            } finally {
                _0x12c018();
            }
        });
    });
}
async function _0x480872(_0x27eec2) {
    let _0x3ce6c4 = 'MiniTask_ChannelPage';
    const _0x37dc71 = {};
    _0x37dc71.source = 'task';
    let _0x4abff5 = _0x37dc71;
    _0x4abff5 = await _0x2d3986(_0x3ce6c4, _0x4abff5, '60d61');
    let _0x48bd66 = _0x10584e.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x1bc9b2 => {
        const _0x4c12b7 = {};
        _0x4c12b7.Host = 'api.m.jd.com', _0x4c12b7.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x4c12b7['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x4c12b7.cookie = _0x10584e + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x27eec2 + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x48bd66 + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x48bd66 + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;');
        const _0x2c6edc = {};
        _0x2c6edc.url = 'https://api.m.jd.com/MiniTask_ChannelPage?' + _0x4abff5 + '&clientType=wxapp&loginType=2&_ste=2', _0x2c6edc.headers = _0x4c12b7;
        const _0x20db09 = _0x2c6edc;
        $.post(_0x20db09, (_0x21aaff, _0x41f69c, _0x2f1209) => {
            try {
                if (_0x21aaff) $.logErr(_0x21aaff), $.log('querySignList api请求失败，请检查网路重试'); else {
                    _0x2f1209 = JSON.parse(_0x2f1209);
                    if (_0x2f1209.subCode == 0) { } else $.log(JSON.stringify(_0x2f1209));
                }
            } catch (_0x16929b) {
                $.logErr(_0x16929b);
            } finally {
                _0x1bc9b2();
            }
        });
    });
}
async function _0x23093d(_0xb536ef, _0x555bcf, _0x1a26d3) {
    let _0x3af9fa = 'MiniTask_ScanTask';
    const _0x23a2c1 = {};
    _0x23a2c1.itemId = _0xb536ef, _0x23a2c1.scanAssignmentId = _0x555bcf, _0x23a2c1.actionType = _0x1a26d3;
    let _0x413048 = _0x23a2c1;
    return _0x413048 = await _0x2d3986(_0x3af9fa, _0x413048, '60d61'), new Promise(async _0xdf4ba8 => {
        const _0x12fa39 = {};
        _0x12fa39.Host = 'api.m.jd.com', _0x12fa39.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x12fa39['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x12fa39.cookie = _0x10584e;
        const _0x40c391 = {};
        _0x40c391.url = 'https://api.m.jd.com/MiniTask_ScanTask?' + _0x413048 + '&clientType=wxapp&loginType=2&_ste=2', _0x40c391.headers = _0x12fa39;
        const _0x5debc4 = _0x40c391;
        $.post(_0x5debc4, (_0x18944d, _0x426f0b, _0x36828e) => {
            try {
                _0x18944d ? ($.logErr(_0x18944d), $.log('dotask api请求失败，请检查网路重试')) : _0x36828e && (_0x36828e = JSON.parse(_0x36828e), _0x36828e.subCode === 0 ? _0x1a26d3 ? '' : $.log('任务完成！') : $.log(_0x36828e.message));
            } catch (_0x53a277) {
                $.logErr(_0x53a277);
            } finally {
                _0xdf4ba8();
            }
        });
    });
}
async function _0x46d2c9(_0xc9929e) {
    let _0x1b1eb1 = 'MiniTask_ScanReward';
    const _0x365308 = {};
    _0x365308.scanAssignmentId = _0xc9929e;
    let _0x17a004 = _0x365308;
    return _0x17a004 = await _0x2d3986(_0x1b1eb1, _0x17a004, '60d61'), new Promise(async _0x5d34b9 => {
        const _0x591074 = {};
        _0x591074.Host = 'api.m.jd.com', _0x591074.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x591074['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x591074.cookie = _0x10584e;
        const _0x54e8e3 = {};
        _0x54e8e3.url = 'https://api.m.jd.com/MiniTask_ScanReward?' + _0x17a004 + '&clientType=wxapp&loginType=2&_ste=2', _0x54e8e3.headers = _0x591074;
        const _0x469a66 = _0x54e8e3;
        $.post(_0x469a66, (_0x3240c8, _0x3aa334, _0x66e642) => {
            try {
                if (_0x3240c8) $.logErr(_0x3240c8), $.log('dotask api请求失败，请检查网路重试'); else {
                    if (_0x66e642) {
                        _0x66e642 = JSON.parse(_0x66e642), _0x66e642.subCode === 0 ? $.log('获得' + _0x66e642.data[0].discount + '金币！') : $.log(_0x66e642.message);
                    }
                }
            } catch (_0x26eb52) {
                $.logErr(_0x26eb52);
            } finally {
                _0x5d34b9();
            }
        });
    });
}
function _0x3c6766() {
    return new Promise(async _0x23ff53 => {
        const _0x481b28 = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': 'application/json,text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-cn',
                'Connection': 'keep-alive',
                'Cookie': _0x10584e,
                'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
            }
        };
        $.post(_0x481b28, (_0x449be6, _0x233fdd, _0x50921) => {
            try {
                if (_0x449be6) $.log('' + JSON.stringify(_0x449be6)), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    if (_0x50921) {
                        _0x50921 = JSON.parse(_0x50921);
                        if (_0x50921.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }
                        _0x50921.retcode === 0 ? $.nickName = _0x50921.base && _0x50921.base.nickname || $.UserName : $.nickName = $.UserName;
                    } else $.log('京东服务器返回空数据');
                }
            } catch (_0x16f91b) {
                $.logErr(_0x16f91b, _0x233fdd);
            } finally {
                _0x23ff53();
            }
        });
    });
}
const _0x59a1f8 = require('crypto-js');
$.UA = 'jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36';
function _0x2a7cf2(_0x296524) {
    if (_0x296524 === '3.1') {
        var _0x334287 = '',
            _0x358c31 = '0123456789',
            _0x5a1226 = _0x358c31,
            _0x13e004 = Math.floor(Math.random() * 10),
            _0x164692,
            _0x2807a1 = 12;
        do {
            const _0x263dd5 = {};
            _0x263dd5.size = 0x1, _0x263dd5.num = _0x358c31, (_0x164692 = _0x14f83e(_0x263dd5), _0x334287.indexOf(_0x164692) == -1 && (_0x334287 += _0x164692));
        } while (_0x334287.length < 3);
        for (let _0x22c363 of _0x334287.slice()) {
            _0x5a1226 = _0x5a1226.replace(_0x22c363, '');
        }
        const _0x33386d = {};
        _0x33386d.size = _0x13e004, _0x33386d.num = _0x5a1226;
        const _0x2fd025 = {};
        _0x2fd025.size = _0x2807a1 - _0x13e004, _0x2fd025.num = _0x5a1226;
        var _0x592a2e = _0x14f83e(_0x33386d) + _0x334287 + _0x14f83e(_0x2fd025) + _0x13e004,
            _0x1e9ed6 = _0x592a2e.split(''),
            _0x4c312 = [];
        for (; _0x1e9ed6.length;) {
            _0x4c312.push(9 - parseInt(_0x1e9ed6.pop()));
        }
        _0x592a2e = _0x4c312.join('');
    } else {
        var _0x2807a1 = 12,
            _0x334287 = '',
            _0x358c31 = '0123456789',
            _0x5a1226 = _0x358c31,
            _0x13e004 = Math.floor(Math.random() * 10),
            _0x164692;
        do {
            const _0xa67ddb = {};
            _0xa67ddb.size = 0x1, _0xa67ddb.num = _0x358c31, (_0x164692 = _0x14f83e(_0xa67ddb), _0x334287.indexOf(_0x164692) == -1 && (_0x334287 += _0x164692));
        } while (_0x334287.length < 3);
        for (let _0x22443c of _0x334287.slice()) {
            _0x5a1226 = _0x5a1226.replace(_0x22443c, '');
        }
        const _0x29db54 = {};
        _0x29db54.size = _0x13e004, _0x29db54.num = _0x5a1226;
        const _0x4dd542 = {};
        _0x4dd542.size = _0x2807a1 - _0x13e004, _0x4dd542.num = _0x5a1226;
        var _0x592a2e = _0x14f83e(_0x29db54) + _0x334287 + _0x14f83e(_0x4dd542) + _0x13e004;
    }
    return _0x592a2e;
}
function _0x14f83e() {
    var _0x4d99d0,
        _0x4c463f = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        _0x4ec7e1 = _0x4c463f.size,
        _0x21defa = 'undefined' === _0x4ec7e1 ? 10 : _0x4ec7e1,
        _0x42a9a3 = _0x4c463f.dictType,
        _0x4157ce = 'undefined' === _0x42a9a3 ? 'number' : _0x42a9a3,
        _0x420e16 = _0x4c463f.num,
        _0x33e4cf = '';
    if (_0x420e16 && 'string' == typeof _0x420e16) _0x4d99d0 = _0x420e16;
    for (; _0x21defa--;) _0x33e4cf += _0x4d99d0[Math.floor(Math.random() * _0x4d99d0.length)];
    return _0x33e4cf;
}
function _0x71f1a8() {
    var _0x217979 = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
        _0x5ab213 = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
        _0x4e2756 = new Date(_0x217979),
        _0x1df591 = _0x5ab213,
        _0xcb2db = {
            'M+': _0x4e2756.getMonth() + 1,
            'd+': _0x4e2756.getDate(),
            'D+': _0x4e2756.getDate(),
            'h+': _0x4e2756.getHours(),
            'H+': _0x4e2756.getHours(),
            'm+': _0x4e2756.getMinutes(),
            's+': _0x4e2756.getSeconds(),
            'w+': _0x4e2756.getDay(),
            'q+': Math.floor((_0x4e2756.getMonth() + 3) / 3),
            'S+': _0x4e2756.getMilliseconds()
        };
    return /(y+)/i.test(_0x1df591) && (_0x1df591 = _0x1df591.replace(RegExp.$1, ''.concat(_0x4e2756.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0xcb2db).forEach(function (_0x1dc442) {
        if (new RegExp('('.concat(_0x1dc442, ')')).test(_0x1df591)) {
            var _0x1e5e48 = 'S+' === _0x1dc442 ? '000' : '00';
            _0x1df591 = _0x1df591.replace(RegExp.$1, 1 == RegExp.$1.length ? _0xcb2db[_0x1dc442] : ''.concat(_0x1e5e48).concat(_0xcb2db[_0x1dc442]).substr(''.concat(_0xcb2db[_0x1dc442]).length));
        }
    }), _0x1df591;
}
function _0x1b4372(_0x5c89b5) {
    let _0x3be3b4 = {
        'version': '3.1',
        'fp': $.dy[_0x5c89b5].fp,
        'appId': _0x5c89b5,
        'timestamp': Date.now(),
        'platform': 'applet',
        'expandParams': ''
    };
    _0x3be3b4.expandParams = $.expandParams || '';
    const _0x3c84f5 = {};
    _0x3c84f5.Host = 'cactus.jd.com', _0x3c84f5.Accept = 'application/json', _0x3c84f5['Content-Type'] = 'application/json', _0x3c84f5['User-agent'] = $.UA;
    let _0x21e595 = {
        'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
        'body': JSON.stringify(_0x3be3b4),
        'headers': _0x3c84f5,
        'timeout': 0x2710
    };
    return new Promise(async _0x1ee70d => {
        $.post(_0x21e595, (_0x2cfd22, _0x2bfc55, _0x28d63a) => {
            try {
                if (_0x2cfd22) console.log('' + JSON.stringify(_0x2cfd22)), console.log('algo请求失败，请检查网路重试'); else {
                    _0x28d63a = JSON.parse(_0x28d63a);
                    let _0x105363 = _0x28d63a.data.result;
                    $.dy[_0x5c89b5].tk = _0x105363.tk, $.dy[_0x5c89b5].test = new Function('return ' + _0x105363.algo)();
                }
            } catch (_0x4fedfe) {
                $.logErr(_0x4fedfe, _0x2bfc55);
            } finally {
                _0x1ee70d(_0x28d63a);
            }
        });
    });
}
async function _0x2d3986(_0x4bf6f4, _0x113c34, _0x34074b) {
    let _0x140ede = '3.1',
        _0x3393ab = _0x2a7cf2(_0x140ede);
    const _0x38f6cf = {};
    _0x38f6cf.fp = _0x3393ab;
    const _0x3b65d1 = {};
    _0x3b65d1[_0x34074b] = _0x38f6cf, $.dy = _0x3b65d1;
    let _0x315b0d = ['pp'],
        _0x5ddb5f = {},
        _0x577ce8 = {},
        _0x446901 = [{}];
    for (let _0x5b676f in _0x315b0d) {
        _0x577ce8[_0x315b0d[_0x5b676f]] = _0x446901[_0x5b676f];
    }
    const _0x31d694 = {};
    _0x31d694.ai = _0x34074b, _0x31d694.fp = _0x3393ab;
    const _0x2ef0b6 = {
        ..._0x577ce8,
        ..._0x31d694
    };
    let _0x21cb42 = _0x2ef0b6,
        _0x5f4780 = _0x59a1f8.AES.encrypt(JSON.stringify(_0x21cb42, null, 2), _0x59a1f8.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            'iv': _0x59a1f8.enc.Utf8.parse('0102030405060708'),
            'mode': _0x59a1f8.mode.CBC,
            'padding': _0x59a1f8.pad.Pkcs7
        });
    $.expandParams = _0x5f4780.ciphertext.toString();
    let _0x1b6224 = new Date().getTime();
    await _0x1b4372(_0x34074b);
    let _0x39e7a2 = new Date().getTime(),
        _0x48bd4f = _0x71f1a8(_0x39e7a2, 'yyyyMMddhhmmssSSS');
    _0x5ddb5f = $.dy[_0x34074b], _0x5ddb5f.enc = await _0x5ddb5f.test(_0x5ddb5f.tk, _0x3393ab, _0x48bd4f, _0x34074b, _0x59a1f8).toString(_0x59a1f8.enc.Hex);
    let _0x4a8438 = {
        'appid': 'hot_channel',
        'functionId': _0x4bf6f4,
        'body': JSON.stringify(_0x113c34),
        'clientVersion': '7.24.10',
        'client': 'android',
        't': _0x1b6224
    },
        _0x4c661d = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'],
        _0x51207a = _0x4c661d.filter(_0x33fd46 => _0x4a8438[_0x33fd46]).map(_0xb310a5 => _0xb310a5 + ':' + (_0xb310a5 == 'body' ? _0x59a1f8.SHA256(_0x4a8438[_0xb310a5]).toString() : _0x4a8438[_0xb310a5])).join('&'),
        _0x2ccb94 = _0x59a1f8.HmacSHA256(_0x51207a, _0x5ddb5f.enc).toString(_0x59a1f8.enc.Hex),
        _0x20a090 = '';
    if (_0x140ede === '3.1') {
        let _0x3e2061 = {};
        _0x3e2061.pp = {}, _0x3e2061.fp = _0x3393ab;
        let _0x888fb9 = _0x59a1f8.AES.encrypt(JSON.stringify(_0x3e2061, null, 2), _0x59a1f8.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
            'iv': _0x59a1f8.enc.Utf8.parse('0102030405060708'),
            'mode': _0x59a1f8.mode.CBC,
            'padding': _0x59a1f8.pad.Pkcs7
        });
        _0x20a090 = _0x888fb9.ciphertext.toString();
    }
    let _0x3841e9 = [_0x48bd4f, _0x3393ab, _0x34074b, _0x5ddb5f.tk, _0x2ccb94, _0x140ede, _0x39e7a2, _0x20a090].join(';');
    return 'functionId=' + _0x4bf6f4 + '&body=' + encodeURIComponent(JSON.stringify(_0x113c34)) + '&h5st=' + encodeURIComponent(_0x3841e9) + '&client=android&appid=hot_channel&t=' + _0x1b6224 + '&clientVersion=7.24.10';
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }