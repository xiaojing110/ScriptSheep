/*
天天来赚钱，入口：小程序
updatetime：2023/9/16
author：https://github.com/6dylan6/jdpro
*/
const $ = new Env("天天来赚钱");

const _0x15654d = $.isNode() ? require('./jdCookie.js') : '',
    _0x1d9b8d = $.isNode() ? require('./sendNotify') : '';
let _0x29f38b = [],
    _0x1ca82a = '';
if ($.isNode()) {
    // var _0x354e54 = new Buffer.from('44796c616e', 'Hex').toString('utf8');
    Object.keys(_0x15654d).forEach(_0x5ac6df => {
        _0x29f38b.push(_0x15654d[_0x5ac6df]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => { };
} else {
    let _0x2c5c0e = $.getdata('CookiesJD') || '[]';
    _0x2c5c0e = JSON.parse(_0x2c5c0e), _0x29f38b = _0x2c5c0e.map(_0x4d8d38 => _0x4d8d38.cookie), _0x29f38b.reverse(), _0x29f38b.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]), _0x29f38b.reverse(), _0x29f38b = _0x29f38b.filter(_0x4cf35d => !!_0x4cf35d);
}
let _0x1bec20 = true;
!(async () => {
    if (!_0x29f38b[0]) {
        const _0x5522bf = {};
        _0x5522bf['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x5522bf);
        return;
    }
    $.log('\nTG频道：https://t.me/dylan_jdpro');
    const _0x20810e = require('child_process').exec;
    // _0x20810e('grep ' + _0x354e54 + ' jdCookie.js', function (_0x3d996c, _0x3ac9e3, _0x4ad8c6) {
    //     !_0x3ac9e3 && (_0x1bec20 = false);
    // }), 
    await $.wait(100);
    for (let _0x464079 = 0; _0x464079 < _0x29f38b.length; _0x464079++) {
        if (_0x29f38b[_0x464079]) {
            _0x1ca82a = _0x29f38b[_0x464079], $.UserName = decodeURIComponent(_0x1ca82a.match(/pt_pin=(.+?);/) && _0x1ca82a.match(/pt_pin=(.+?);/)[1]), $.index = _0x464079 + 1, $.isLogin = true, $.nickName = '', await _0x332365(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
            if (!$.isLogin) {
                const _0x56044f = {};
                _0x56044f['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x56044f);
                $.isNode() && (await _0x1d9b8d.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            await _0x35b7af();
        }
    }
})().catch(_0x2468ae => {
    $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x2468ae + '!', '');
}).finally(() => {
    $.done();
});
async function _0x35b7af() {
    try {
        await _0x42303b(), await $.wait(1000);
        _0x1bec20 && (await _0x1ca1fb($.signscene), await $.wait(1000), await _0xa80820($.signscene), await $.wait(1000), await _0x1ca1fb($.taskonescene), await $.wait(1000), await _0x123903($.taskonescene), await $.wait(500));
        $.log('\n开始任务...');
        for (let _0x20d95c of $.taskList) {
            if (_0x20d95c.status === 0) $.log('去做---' + _0x20d95c.title), await _0x3e922a(_0x20d95c.itemId, _0x20d95c.scanAssignmentId, 1), $.log('等待' + _0x20d95c.times + '秒'), await $.wait(_0x20d95c.times * 1000 + 500), await _0x3e922a(_0x20d95c.itemId, _0x20d95c.scanAssignmentId, 0), $.log('领取奖励...'), await $.wait(1000), await _0x28a14(_0x20d95c.scanAssignmentId); else {
                if (_0x20d95c.status === 1) {
                    await _0x28a14(_0x20d95c.scanAssignmentId);
                } else {
                    $.log(_0x20d95c.title + '---已完成');
                }
            }
        }
        await $.wait(2000);
    } catch (_0x130653) {
        $.logErr(_0x130653);
    }
}
async function _0xa80820(_0x34c5a4) {
    let _0x6688bd = 'mini_doSign';
    const _0x5b6030 = {};
    _0x5b6030.itemId = '1';
    let _0x14f2c3 = _0x5b6030;
    _0x14f2c3 = await _0x13dc6d(_0x6688bd, _0x14f2c3, '60d61');
    let _0x4aa6b0 = _0x1ca82a.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x2c2ca5 => {
        const _0x433caf = {
            'url': 'https://api.m.jd.com/mini_doSign?' + _0x14f2c3 + '&clientType=wxapp&loginType=2&_ste=2',
            'headers': {
                'Host': 'api.m.jd.com',
                'Referer': 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
                'cookie': _0x1ca82a + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x34c5a4 + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x4aa6b0 + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x4aa6b0 + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;')
            }
        };
        $.post(_0x433caf, (_0x395752, _0x2aa97c, _0x27a7db) => {
            try {
                if (_0x395752) {
                    $.logErr(_0x395752), $.log('dailysign api请求失败，请检查网路重试');
                } else {
                    _0x27a7db = JSON.parse(_0x27a7db);
                    if (_0x27a7db.subCode == 0) $.log('签到成功: ' + _0x27a7db.data.signDays + '天, ' + _0x27a7db.data.toastMsg); else {
                        $.log('签到失败：' + JSON.stringify(_0x27a7db) + '\n');
                    }
                }
            } catch (_0xde51e2) {
                $.logErr(_0xde51e2);
            } finally {
                _0x2c2ca5();
            }
        });
    });
}
async function _0x123903(_0x6f950b) {
    let _0x4d598b = 'miniTask_getDrainageTaskReward';
    const _0x249694 = {};
    _0x249694.rewardAssignmentId = '79dRvBQWmT2Dwyu4vvyZUt1Pa6W';
    let _0x196e4c = _0x249694;
    _0x196e4c = await _0x13dc6d(_0x4d598b, _0x196e4c, '60d61');
    let _0x1d604f = _0x1ca82a.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x453052 => {
        const _0x5bdb6b = {};
        _0x5bdb6b.Host = 'api.m.jd.com', _0x5bdb6b.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x5bdb6b['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x5bdb6b.cookie = _0x1ca82a + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x6f950b + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x1d604f + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x1d604f + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;');
        const _0x57bc7b = {};
        _0x57bc7b.url = 'https://api.m.jd.com/miniTask_getDrainageTaskReward?' + _0x196e4c + '&clientType=wxapp&loginType=2&_ste=2', _0x57bc7b.headers = _0x5bdb6b;
        const _0x177257 = _0x57bc7b;
        $.post(_0x177257, (_0x548691, _0x107cc3, _0x55d181) => {
            try {
                if (_0x548691) {
                    $.logErr(_0x548691), $.log('taskone api请求失败，请检查网路重试');
                } else {
                    _0x55d181 = JSON.parse(_0x55d181);
                    if (_0x55d181.subCode == 0) $.log('指定入口获得: ' + _0x55d181.data.rewardAmount + '金币'); else {
                        $.log('失败：' + JSON.stringify(_0x55d181) + '\n');
                    }
                }
            } catch (_0x7d8e85) {
                $.logErr(_0x7d8e85);
            } finally {
                _0x453052();
            }
        });
    });
}
async function _0x42303b() {
    let _0x485372 = 'MiniTask_ChannelPage',
        _0x2bc914 = {};
    return _0x2bc914 = await _0x13dc6d(_0x485372, _0x2bc914, '60d61'), new Promise(async _0x26f45a => {
        const _0x5bb33a = {};
        _0x5bb33a.Host = 'api.m.jd.com', _0x5bb33a.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x5bb33a['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x5bb33a.cookie = _0x1ca82a;
        const _0x22f206 = {};
        _0x22f206.url = 'https://api.m.jd.com/MiniTask_ChannelPage?' + _0x2bc914 + '&clientType=wxapp&loginType=2&_ste=2', _0x22f206.headers = _0x5bb33a;
        const _0x199dfd = _0x22f206;
        $.post(_0x199dfd, (_0x1a992d, _0x277b80, _0x4ab602) => {
            try {
                if (_0x1a992d) $.logErr(_0x1a992d), $.log('querySignList api请求失败，请检查网路重试'); else {
                    _0x4ab602 = JSON.parse(_0x4ab602);
                    if (_0x4ab602.subCode == 0) {
                        $.taskList = _0x4ab602.data.scanTaskList;
                        $.signscene = _0x4ab602.data?.['userSignScene'];
                        $.taskonescene = _0x4ab602.data?.['drainageTask']?.['scene'];
                        $.log('当前金币数量：' + _0x4ab602.data.point + ', 约为' + (_0x4ab602.data.totalAmount || 0) + '元\n');
                        _0x26f45a($.taskList);
                    } else $.log(JSON.stringify(_0x4ab602));
                }
            } catch (_0x2ee4bc) {
                $.logErr(_0x2ee4bc);
            } finally {
                _0x26f45a();
            }
        });
    });
}
async function _0x1ca1fb(_0x146901) {
    let _0x158de5 = 'MiniTask_ChannelPage';
    const _0x1ac355 = {};
    _0x1ac355.source = 'task';
    let _0x481d87 = _0x1ac355;
    _0x481d87 = await _0x13dc6d(_0x158de5, _0x481d87, '60d61');
    let _0x49002c = _0x1ca82a.match(/pt_pin=(.+?);/)[1];
    return new Promise(async _0x3be0ad => {
        const _0x467b31 = {};
        _0x467b31.Host = 'api.m.jd.com', _0x467b31.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x467b31['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x467b31.cookie = _0x1ca82a + ('buildtime=20221201;wxapp_type=1;wxapp_version=7.24.10;wxapp_scene=' + _0x146901 + ';cid=5;visitkey=26129130095591661082849656;gender=1;province=Guangdong;city=Shenzhen;country=China;nickName=' + _0x49002c + ';avatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;wxNickName=' + _0x49002c + ';wxAvatarUrl=https%3A%2F%2Fthirdwx.qlogo.cn%2Fmmopen%2Fvi_32%2FPOgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg%2F132;');
        const _0x2cc713 = {};
        _0x2cc713.url = 'https://api.m.jd.com/MiniTask_ChannelPage?' + _0x481d87 + '&clientType=wxapp&loginType=2&_ste=2', _0x2cc713.headers = _0x467b31;
        const _0xa5bd6 = _0x2cc713;
        $.post(_0xa5bd6, (_0x9c8543, _0x1f52c5, _0x51fb09) => {
            try {
                if (_0x9c8543) {
                    $.logErr(_0x9c8543), $.log('querySignList api请求失败，请检查网路重试');
                } else {
                    _0x51fb09 = JSON.parse(_0x51fb09);
                    if (_0x51fb09.subCode == 0) { } else $.log(JSON.stringify(_0x51fb09));
                }
            } catch (_0x5896fc) {
                $.logErr(_0x5896fc);
            } finally {
                _0x3be0ad();
            }
        });
    });
}
async function _0x3e922a(_0x39c076, _0x1f85cb, _0x4f1c9a) {
    let _0x6481d2 = 'MiniTask_ScanTask';
    const _0x404eee = {};
    _0x404eee.itemId = _0x39c076, _0x404eee.scanAssignmentId = _0x1f85cb, _0x404eee.actionType = _0x4f1c9a;
    let _0x5a99df = _0x404eee;
    return _0x5a99df = await _0x13dc6d(_0x6481d2, _0x5a99df, '60d61'), new Promise(async _0x3d05b6 => {
        const _0x5f00be = {};
        _0x5f00be.Host = 'api.m.jd.com', _0x5f00be.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0x5f00be['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0x5f00be.cookie = _0x1ca82a;
        const _0x25d7e2 = {};
        _0x25d7e2.url = 'https://api.m.jd.com/MiniTask_ScanTask?' + _0x5a99df + '&clientType=wxapp&loginType=2&_ste=2', _0x25d7e2.headers = _0x5f00be;
        const _0x43d3ee = _0x25d7e2;
        $.post(_0x43d3ee, (_0x767330, _0x199f1b, _0x220fab) => {
            try {
                _0x767330 ? ($.logErr(_0x767330), $.log('dotask api请求失败，请检查网路重试')) : _0x220fab && (_0x220fab = JSON.parse(_0x220fab), _0x220fab.subCode === 0 ? _0x4f1c9a ? '' : $.log('任务完成！') : $.log(_0x220fab.message));
            } catch (_0x1bb915) {
                $.logErr(_0x1bb915);
            } finally {
                _0x3d05b6();
            }
        });
    });
}
async function _0x28a14(_0x241cfb) {
    let _0x4be35f = 'MiniTask_ScanReward';
    const _0x90340e = {};
    _0x90340e.scanAssignmentId = _0x241cfb;
    let _0x3dfce9 = _0x90340e;
    return _0x3dfce9 = await _0x13dc6d(_0x4be35f, _0x3dfce9, '60d61'), new Promise(async _0x5ad8ee => {
        const _0xde8748 = {};
        _0xde8748.Host = 'api.m.jd.com', _0xde8748.Referer = 'https://servicewechat.com/wx91d27dbf599dff74/672/page-frame.html', _0xde8748['User-Agent'] = 'Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4365 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8970 MicroMessenger/8.0.28.2240(0x28001C57) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android', _0xde8748.cookie = _0x1ca82a;
        const _0x34d4c0 = {};
        _0x34d4c0.url = 'https://api.m.jd.com/MiniTask_ScanReward?' + _0x3dfce9 + '&clientType=wxapp&loginType=2&_ste=2', _0x34d4c0.headers = _0xde8748;
        const _0x409eb2 = _0x34d4c0;
        $.post(_0x409eb2, (_0x631f7b, _0x220cd9, _0x3d38f2) => {
            try {
                _0x631f7b ? ($.logErr(_0x631f7b), $.log('dotask api请求失败，请检查网路重试')) : _0x3d38f2 && (_0x3d38f2 = JSON.parse(_0x3d38f2), _0x3d38f2.subCode === 0 ? $.log('获得' + _0x3d38f2.data[0].discount + '金币！') : $.log(_0x3d38f2.message));
            } catch (_0x4f1837) {
                $.logErr(_0x4f1837);
            } finally {
                _0x5ad8ee();
            }
        });
    });
}
function _0x332365() {
    return new Promise(async _0x1a9cb6 => {
        const _0x240583 = {
            'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
            'headers': {
                'Accept': 'application/json,text/plain, */*',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-cn',
                'Connection': 'keep-alive',
                'Cookie': _0x1ca82a,
                'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
                'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
            }
        };
        $.post(_0x240583, (_0x2fec89, _0x310fc7, _0x293dc5) => {
            try {
                if (_0x2fec89) $.log('' + JSON.stringify(_0x2fec89)), $.log($.name + ' API请求失败，请检查网路重试'); else {
                    if (_0x293dc5) {
                        _0x293dc5 = JSON.parse(_0x293dc5);
                        if (_0x293dc5.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }
                        _0x293dc5.retcode === 0 ? $.nickName = _0x293dc5.base && _0x293dc5.base.nickname || $.UserName : $.nickName = $.UserName;
                    } else $.log('京东服务器返回空数据');
                }
            } catch (_0x5429af) {
                $.logErr(_0x5429af, _0x310fc7);
            } finally {
                _0x1a9cb6();
            }
        });
    });
}
const _0x23197f = require('crypto-js');
$.UA = 'jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36';
function _0x7c0ac2(_0xa1bc69) {
    if (_0xa1bc69 === '3.1') {
        var _0x2d3111 = '',
            _0x1cbf43 = '0123456789',
            _0x35f59d = _0x1cbf43,
            _0x26ca41 = Math.floor(Math.random() * 10),
            _0x10bc63,
            _0x4877a6 = 12;
        do {
            const _0x4e91d0 = {};
            _0x4e91d0.size = 0x1, _0x4e91d0.num = _0x1cbf43, (_0x10bc63 = _0x3c293c(_0x4e91d0), _0x2d3111.indexOf(_0x10bc63) == -1 && (_0x2d3111 += _0x10bc63));
        } while (_0x2d3111.length < 3);
        for (let _0x10c196 of _0x2d3111.slice()) {
            _0x35f59d = _0x35f59d.replace(_0x10c196, '');
        }
        const _0x378441 = {};
        _0x378441.size = _0x26ca41, _0x378441.num = _0x35f59d;
        const _0x4fc0e1 = {};
        _0x4fc0e1.size = _0x4877a6 - _0x26ca41, _0x4fc0e1.num = _0x35f59d;
        var _0x22e676 = _0x3c293c(_0x378441) + _0x2d3111 + _0x3c293c(_0x4fc0e1) + _0x26ca41,
            _0x4d59b8 = _0x22e676.split(''),
            _0x1b4de1 = [];
        for (; _0x4d59b8.length;) {
            _0x1b4de1.push(9 - parseInt(_0x4d59b8.pop()));
        }
        _0x22e676 = _0x1b4de1.join('');
    } else {
        var _0x4877a6 = 12,
            _0x2d3111 = '',
            _0x1cbf43 = '0123456789',
            _0x35f59d = _0x1cbf43,
            _0x26ca41 = Math.floor(Math.random() * 10),
            _0x10bc63;
        do {
            const _0x3d88fa = {};
            _0x3d88fa.size = 0x1, _0x3d88fa.num = _0x1cbf43, (_0x10bc63 = _0x3c293c(_0x3d88fa), _0x2d3111.indexOf(_0x10bc63) == -1 && (_0x2d3111 += _0x10bc63));
        } while (_0x2d3111.length < 3);
        for (let _0x296ec5 of _0x2d3111.slice()) {
            _0x35f59d = _0x35f59d.replace(_0x296ec5, '');
        }
        const _0x36460c = {};
        _0x36460c.size = _0x26ca41, _0x36460c.num = _0x35f59d;
        var _0x22e676 = _0x3c293c(_0x36460c) + _0x2d3111 + _0x3c293c({
            'size': _0x4877a6 - _0x26ca41,
            'num': _0x35f59d
        }) + _0x26ca41;
    }
    return _0x22e676;
}
function _0x3c293c() {
    var _0x1868d3,
        _0x18d0ae = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        _0x3075a7 = _0x18d0ae.size,
        _0x12ca77 = 'undefined' === _0x3075a7 ? 10 : _0x3075a7,
        _0x58f2d9 = _0x18d0ae.dictType,
        _0x5f0377 = 'undefined' === _0x58f2d9 ? 'number' : _0x58f2d9,
        _0x2ffc2e = _0x18d0ae.num,
        _0x4c511a = '';
    if (_0x2ffc2e && 'string' == typeof _0x2ffc2e) _0x1868d3 = _0x2ffc2e;
    for (; _0x12ca77--;) _0x4c511a += _0x1868d3[Math.floor(Math.random() * _0x1868d3.length)];
    return _0x4c511a;
}
function _0x2686d4() {
    var _0x387699 = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
        _0x5687d3 = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
        _0x53dfcb = new Date(_0x387699),
        _0xea18db = _0x5687d3,
        _0x4b6879 = {
            'M+': _0x53dfcb.getMonth() + 1,
            'd+': _0x53dfcb.getDate(),
            'D+': _0x53dfcb.getDate(),
            'h+': _0x53dfcb.getHours(),
            'H+': _0x53dfcb.getHours(),
            'm+': _0x53dfcb.getMinutes(),
            's+': _0x53dfcb.getSeconds(),
            'w+': _0x53dfcb.getDay(),
            'q+': Math.floor((_0x53dfcb.getMonth() + 3) / 3),
            'S+': _0x53dfcb.getMilliseconds()
        };
    return /(y+)/i.test(_0xea18db) && (_0xea18db = _0xea18db.replace(RegExp.$1, ''.concat(_0x53dfcb.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x4b6879).forEach(function (_0x6cc87c) {
        if (new RegExp('('.concat(_0x6cc87c, ')')).test(_0xea18db)) {
            var _0x1da76e = 'S+' === _0x6cc87c ? '000' : '00';
            _0xea18db = _0xea18db.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x4b6879[_0x6cc87c] : ''.concat(_0x1da76e).concat(_0x4b6879[_0x6cc87c]).substr(''.concat(_0x4b6879[_0x6cc87c]).length));
        }
    }), _0xea18db;
}
function _0xd53051(_0x23958b) {
    let _0x2ddf2c = {
        'version': '3.1',
        'fp': $.dy[_0x23958b].fp,
        'appId': _0x23958b,
        'timestamp': Date.now(),
        'platform': 'applet',
        'expandParams': ''
    };
    _0x2ddf2c.expandParams = $.expandParams || '';
    const _0xc7a59e = {};
    _0xc7a59e.Host = 'cactus.jd.com', _0xc7a59e.Accept = 'application/json', _0xc7a59e['Content-Type'] = 'application/json', _0xc7a59e['User-agent'] = $.UA;
    let _0x3fd8d4 = {
        'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
        'body': JSON.stringify(_0x2ddf2c),
        'headers': _0xc7a59e,
        'timeout': 0x2710
    };
    return new Promise(async _0xdbcd9c => {
        $.post(_0x3fd8d4, (_0x3cf40f, _0x4e9605, _0x256a12) => {
            try {
                if (_0x3cf40f) console.log('' + JSON.stringify(_0x3cf40f)), console.log('algo请求失败，请检查网路重试'); else {
                    _0x256a12 = JSON.parse(_0x256a12);
                    let _0x34afbb = _0x256a12.data.result;
                    $.dy[_0x23958b].tk = _0x34afbb.tk, $.dy[_0x23958b].test = new Function('return ' + _0x34afbb.algo)();
                }
            } catch (_0x3fa4e5) {
                $.logErr(_0x3fa4e5, _0x4e9605);
            } finally {
                _0xdbcd9c(_0x256a12);
            }
        });
    });
}
async function _0x13dc6d(_0x2d8556, _0x12e502, _0x54eb1d) {
    let _0x56959e = '3.1',
        _0x2cdffe = _0x7c0ac2(_0x56959e);
    const _0x222f16 = {};
    _0x222f16.fp = _0x2cdffe;
    const _0x25140c = {};
    _0x25140c[_0x54eb1d] = _0x222f16, $.dy = _0x25140c;
    let _0x456848 = ['pp'],
        _0x3e5e4d = {},
        _0x30758b = {},
        _0x4d2977 = [{}];
    for (let _0x30eeb1 in _0x456848) {
        _0x30758b[_0x456848[_0x30eeb1]] = _0x4d2977[_0x30eeb1];
    }
    const _0x172fd1 = {};
    _0x172fd1.ai = _0x54eb1d, _0x172fd1.fp = _0x2cdffe;
    const _0x5a6aca = {
        ..._0x30758b,
        ..._0x172fd1
    };
    let _0x47e305 = _0x5a6aca,
        _0x4ccb6d = _0x23197f.AES.encrypt(JSON.stringify(_0x47e305, null, 2), _0x23197f.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            'iv': _0x23197f.enc.Utf8.parse('0102030405060708'),
            'mode': _0x23197f.mode.CBC,
            'padding': _0x23197f.pad.Pkcs7
        });
    $.expandParams = _0x4ccb6d.ciphertext.toString();
    let _0x4a51b0 = new Date().getTime();
    await _0xd53051(_0x54eb1d);
    let _0x22a813 = new Date().getTime(),
        _0x383d7a = _0x2686d4(_0x22a813, 'yyyyMMddhhmmssSSS');
    _0x3e5e4d = $.dy[_0x54eb1d], _0x3e5e4d.enc = await _0x3e5e4d.test(_0x3e5e4d.tk, _0x2cdffe, _0x383d7a, _0x54eb1d, _0x23197f).toString(_0x23197f.enc.Hex);
    let _0x2eb613 = {
        'appid': 'hot_channel',
        'functionId': _0x2d8556,
        'body': JSON.stringify(_0x12e502),
        'clientVersion': '7.24.10',
        'client': 'android',
        't': _0x4a51b0
    },
        _0x321f73 = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'],
        _0x2ac9db = _0x321f73.filter(_0x1f2995 => _0x2eb613[_0x1f2995]).map(_0x3ec357 => _0x3ec357 + ':' + (_0x3ec357 == 'body' ? _0x23197f.SHA256(_0x2eb613[_0x3ec357]).toString() : _0x2eb613[_0x3ec357])).join('&'),
        _0x14abbc = _0x23197f.HmacSHA256(_0x2ac9db, _0x3e5e4d.enc).toString(_0x23197f.enc.Hex),
        _0x4a9dea = '';
    if (_0x56959e === '3.1') {
        let _0x5f0943 = {};
        _0x5f0943.pp = {}, _0x5f0943.fp = _0x2cdffe;
        let _0x169d2e = _0x23197f.AES.encrypt(JSON.stringify(_0x5f0943, null, 2), _0x23197f.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
            'iv': _0x23197f.enc.Utf8.parse('0102030405060708'),
            'mode': _0x23197f.mode.CBC,
            'padding': _0x23197f.pad.Pkcs7
        });
        _0x4a9dea = _0x169d2e.ciphertext.toString();
    }
    let _0x7cc3fe = [_0x383d7a, _0x2cdffe, _0x54eb1d, _0x3e5e4d.tk, _0x14abbc, _0x56959e, _0x22a813, _0x4a9dea].join(';');
    return 'functionId=' + _0x2d8556 + '&body=' + encodeURIComponent(JSON.stringify(_0x12e502)) + '&h5st=' + encodeURIComponent(_0x7cc3fe) + '&client=android&appid=hot_channel&t=' + _0x4a51b0 + '&clientVersion=7.24.10';
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }