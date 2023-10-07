/*
东东农场助力
20 2,6,11 * * * jd_farm_help.js
updatetime:2023/9/27
变量
epxort FRUIT_DELAY='1000',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）
export FRUITCODES='xxx&xxx' 指定助力码助力，多个用&分割，不指定则自动搜集任务助力码
*/

let shareCodes = [];
const _0xde0d61 = new Env('东东农场-助力');
let _0x2b85c3 = [],
    _0x4b0e9d = '',
    _0x5b276b,
    _0x29db93,
    _0x31eabc = '',
    _0x39f0ab = '',
    _0x3d8364 = '',
    _0x215f36 = [],
    _0x2f164f = {},
    _0x6241e5 = 0,
    _0x37ba97 = false;
const _0x44e72f = require('fs'),
    _0x101c6d = 'https://api.m.jd.com/client.action',
    _0x3479e5 = process.env.FRUIT_DELAY ? process.env.FRUIT_DELAY * 1 : 5000,
    _0x3b3ea2 = require('./function/dylany');
_0xde0d61.reqnum = 1, !(async () => {
    await _0x53b093();
    if (_0x29db93.length == 0) {
        _0xde0d61.log('没有助力码,请变量FRUITCODES指定或执行农场任务自动收集助力码');
        return;
    }
    if (!_0x2b85c3[0]) {
        const _0x1551b1 = {};
        _0x1551b1['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', 
        _0xde0d61.msg(_0xde0d61.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x1551b1);
        return;
    }
    _0xde0d61.log('\n当前版本：2023/9/27'), 
    _0xde0d61.log('问题建议：https://t.me/dylan_jdpro\n'), 
    _0xde0d61.log('\n环境变量：'), 
    _0xde0d61.log('export DY_PROXY=\'api_url\' 可使用代理api'), 
    _0xde0d61.log('export FRUITCODES = \'xxx&xxx\' 指定助力码助力，多个用&分割，不指定则自动搜集任务助力码'), 
    _0xde0d61.log('epxort FRUIT_DELAY=\'1000\',设置等待时间(毫秒)，默认请求5次接口等待5秒（5000）\n\n');
    for (let _0x4e23c2 = 0; _0x4e23c2 < _0x2b85c3.length; _0x4e23c2++) {
        if (_0x2b85c3[_0x4e23c2]) {
            _0x4b0e9d = _0x2b85c3[_0x4e23c2], 
            _0xde0d61.UserName = decodeURIComponent(_0x4b0e9d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4b0e9d.match(/pt_pin=([^; ]+)(?=;?)/)[1]), 
            _0xde0d61.index = _0x4e23c2 + 1, 
            _0xde0d61.isLogin = true, 
            _0xde0d61.nickName = '', 
            await _0x23e212(), 
            console.log('\n开始【京东账号' + _0xde0d61.index + '】' + (_0xde0d61.nickName || _0xde0d61.UserName) + '\n');
            if (!_0xde0d61.isLogin) {
                const _0x49f455 = {};
                _0x49f455['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', 
                _0xde0d61.msg(_0xde0d61.name, '【提示】cookie已失效', '京东账号' + _0xde0d61.index + ' ' + (_0xde0d61.nickName || _0xde0d61.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x49f455);
                _0xde0d61.isNode() && (await _0x5b276b.sendNotify(_0xde0d61.name + 'cookie已失效 - ' + _0xde0d61.UserName, '京东账号' + _0xde0d61.index + ' ' + _0xde0d61.UserName + '\n请重新登录获取cookie'));
                continue;
            }
            _0x39f0ab = '', 
            _0x3d8364 = '', 
            _0x2f164f = {}, 
            _0xde0d61.UA = require('./USER_AGENTS').UARAM(), 
            await _0x3807c4(),
            await _0xda9b7b(), 
            await _0xde0d61.wait(2000);
        }
    }
})().catch(_0x2bc912 => {
    _0xde0d61.log('', '❌ ' + _0xde0d61.name + ', 失败! 原因: ' + _0x2bc912 + '!', '');
}).finally(() => {
    _0xde0d61.done();
});
async function _0xda9b7b() {
    _0x3d8364 = '【京东账号' + _0xde0d61.index + '🆔】' + (_0xde0d61.nickName || _0xde0d61.UserName);
    try {
        await _0x315778('', 1);
        if (_0xde0d61.farmInfo.farmUserPro) await _0x2a006f(), await _0xa3d7af(); else JSON.stringify(_0xde0d61.farmInfo).includes('winTexts') ? (console.log('初始化农场数据异常, 请确认此账号是否开通农场'), _0x39f0ab = '【数据异常】请确认此账号是否开通农场\n') : (console.log('初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: ' + JSON.stringify(_0xde0d61.farmInfo)), _0x39f0ab = '【数据异常】请手动登录京东app查看此账号' + _0xde0d61.name + '是否正常');
    } catch (_0x1704d3) {
        console.log('任务执行异常，请检查执行日志 ‼️‼️'), _0xde0d61.logErr(_0x1704d3);
        const _0x15b891 = '京东账号' + _0xde0d61.index + ' ' + (_0xde0d61.nickName || _0xde0d61.UserName) + '\n任务执行异常，请检查执行日志 ‼️‼️';
    }
    await _0x557295();
}
async function _0xa3d7af() {
    await _0x27fc1d(), await _0x5e25ae();
}
async function _0x5e25ae() {
    console.log('\n开始天天抽奖助力...');
    for (let _0x4960dd of _0x29db93) {
        if (_0x4960dd === _0xde0d61.farmInfo.farmUserPro.shareCode) {
            console.log('跳过自己\n');
            continue;
        }
        await _0x1df469(_0x4960dd), await _0xde0d61.wait(1000);
        if (_0xde0d61.lotteryMasterHelpRes.helpResult === undefined) break;
        if (_0xde0d61.lotteryMasterHelpRes.helpResult.code === '0') console.log('助力' + _0xde0d61.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + '成功\n'); else {
            if (_0xde0d61.lotteryMasterHelpRes.helpResult.code === '11') console.log('不要重复助力' + _0xde0d61.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + '\n'); else {
                if (_0xde0d61.lotteryMasterHelpRes.helpResult.code === '13') {
                    console.log('助力' + _0xde0d61.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + '失败,助力次数耗尽\n');
                    break;
                }
            }
        }
    }
}
async function _0x2a006f() {
    console.log('\n开始助力好友...');
    let _0x38bdce = 0,
        _0x28164c = 3,
        _0x4930b7 = '';
    for (let _0x197c57 of _0x29db93) {
        console.log('去助力: ' + _0x197c57);
        if (!_0x197c57) continue;
        if (_0x197c57 === _0xde0d61.farmInfo.farmUserPro.shareCode) {
            console.log('不能为自己助力哦，跳过\n');
            continue;
        }
        await _0x4f96bb(_0x197c57), await _0xde0d61.wait(2000);
        if (_0xde0d61.helpResult.code === '0') {
            if (_0xde0d61.helpResult.helpResult.code === '0') _0x38bdce += _0xde0d61.helpResult.helpResult.salveHelpAddWater, console.log('【助力结果】: 助力成功'), console.log('助力获得' + _0xde0d61.helpResult.helpResult.salveHelpAddWater + 'g水滴'), _0x4930b7 += (_0xde0d61.helpResult.helpResult.masterUserInfo.nickName || '匿名用户') + ','; else {
                if (_0xde0d61.helpResult.helpResult.code === '8') console.log('【助力结果】: 助力失败，今天助力次数已耗尽'); else {
                    if (_0xde0d61.helpResult.helpResult.code === '9') console.log('【助力结果】: 已经助力过TA了'); else _0xde0d61.helpResult.helpResult.code === '10' ? (console.log('【助力结果】: 对方已满助力'), _0x215f36.push(_0x197c57)) : console.log('助力其他情况：' + JSON.stringify(_0xde0d61.helpResult.helpResult));
                }
            }
            console.log('【助力次数还剩】' + _0xde0d61.helpResult.helpResult.remainTimes + '次\n'), _0x28164c = _0xde0d61.helpResult.helpResult.remainTimes;
            if (_0xde0d61.helpResult.helpResult.remainTimes === 0) {
                console.log('您当前助力次数已耗尽，跳出助力');
                break;
            }
        } else {
            console.log('助力失败::' + JSON.stringify(_0xde0d61.helpResult));
        }
    }
    if (_0xde0d61.isLoon() || _0xde0d61.isQuanX() || _0xde0d61.isSurge()) {
        let _0x503705 = _0xaed8fa() + _0xde0d61.farmInfo.farmUserPro.shareCode;
        if (!_0xde0d61.getdata(_0x503705)) {
            _0xde0d61.setdata('', _0xaed8fa(Date.now() - 86400000) + _0xde0d61.farmInfo.farmUserPro.shareCode), _0xde0d61.setdata('', _0x503705);
        }
        if (_0x4930b7) {
            _0xde0d61.getdata(_0x503705) ? _0xde0d61.setdata(_0xde0d61.getdata(_0x503705) + ',' + _0x4930b7, _0x503705) : _0xde0d61.setdata(_0x4930b7, _0x503705);
        }
        _0x4930b7 = _0xde0d61.getdata(_0x503705);
    }
    if (_0x38bdce > 0) {
        console.log('【助力好友👬】获得' + _0x38bdce + 'g💧\n');
    }
    _0x39f0ab += '【今日剩余助力👬】' + _0x28164c + '次\n', console.log('助力好友结束，即将开始领取额外水滴奖励\n');
}
async function _0x27fc1d() {
    await _0xe31141();
    if (_0xde0d61.friendList) {
        console.log('\n今日已邀请好友' + _0xde0d61.friendList.inviteFriendCount + '个 / 每日邀请上限' + _0xde0d61.friendList.inviteFriendMax + '个'), await _0x17fbd5();
        if (_0xde0d61.friendList.inviteFriendCount > 0) {
            if (_0xde0d61.friendList.inviteFriendCount > _0xde0d61.friendList.inviteFriendGotAwardCount) {
                console.log('开始领取邀请好友的奖励'), await _0x511c5c(), console.log('领取邀请好友的奖励结果：：' + JSON.stringify(_0xde0d61.awardInviteFriendRes));
            }
        } else console.log('今日未邀请过好友');
    } else console.log('查询好友列表失败\n');
}
async function _0x17fbd5() {
    for (let _0x6fc0bb of _0x29db93) {
        if (_0x6fc0bb === _0xde0d61.farmInfo.farmUserPro.shareCode) {
            console.log('自己不能邀请自己成为好友噢\n');
            continue;
        }
        if (_0x29db93.findIndex(_0x31a944 => _0x31a944 === _0x6fc0bb) >= 5) break;
        await _0x3dc87e(_0x6fc0bb);
        if (_0xde0d61.inviteFriendRes && _0xde0d61.inviteFriendRes.helpResult && _0xde0d61.inviteFriendRes.helpResult.code === '0') console.log('接收邀请成为好友结果成功,您已成为' + _0xde0d61.inviteFriendRes.helpResult.masterUserInfo.nickName + '的好友'); else _0xde0d61.inviteFriendRes && _0xde0d61.inviteFriendRes.helpResult && _0xde0d61.inviteFriendRes.helpResult.code === '17' && console.log('接收邀请成为好友结果失败,对方已是您的好友');
    }
}
async function _0x1df469() {
    _0xde0d61.lotteryMasterHelpRes = await _0x315778({
        'imageUrl': '',
        'nickName': '',
        'shareCode': arguments[0] + '-3',
        'babelChannel': '3',
        'version': 0x18,
        'channel': 0x1
    });
}
async function _0x3dc87e() {
    _0xde0d61.inviteFriendRes = await _0x315778({
        'imageUrl': '',
        'nickName': '',
        'shareCode': arguments[0] + '-inviteFriend',
        'version': 0x18,
        'channel': 0x1
    });
}
async function _0x4f96bb() {
    for (let _0x4e8814 of Array(3)) {
        const _0x1b1c7f = {};
        _0x1b1c7f.sid = '', _0x1b1c7f.mpin = '', _0x1b1c7f.shareCode = arguments[0], _0x1b1c7f.babelChannel = '121', _0x1b1c7f.version = 0x18, _0x1b1c7f.channel = 0x1, _0x1b1c7f.lat = '0', _0x1b1c7f.lng = '0', _0xde0d61.helpResult = await _0x315778(_0x1b1c7f);
        if (_0xde0d61.helpResult.code == '0') break;
        await _0xde0d61.wait(2000);
    }
}
async function _0x315778(_0x1d0bc4, _0x566345, _0x1f7663 = 1500) {
    _0xde0d61.reqnum % 5 == 0 && (console.log('\n等待' + _0x3479e5 / 1000 + '秒......\n'), _0x1f7663 = _0x3479e5);
    ;
    _0xde0d61.reqnum++;
    if (_0x6241e5 > '1') return;
    const _0x3fdd4c = {};
    _0x3fdd4c.babelChannel = '121', _0x3fdd4c.sid = '', _0x3fdd4c.un_area = '', _0x3fdd4c.version = 0x18, _0x3fdd4c.channel = 0x1, _0x3fdd4c.lat = '0', _0x3fdd4c.lng = '0';
    if (!_0x1d0bc4) _0x1d0bc4 = _0x3fdd4c;
    let _0x5023d3 = {
        'appId': '8a2af',
        'fn': 'initForFarm',
        'body': _0x1d0bc4,
        'apid': 'signed_wh5',
        'ver': _0xde0d61.UA.split(';')[2],
        'cl': 'ios',
        'user': _0xde0d61.UserName,
        'code': 0x1,
        'ua': _0xde0d61.UA
    },
        _0x2ff572 = await _0x3b3ea2.getbody(_0x5023d3);
    return new Promise(_0x1f2007 => {
        const _0x48bd8c = {};
        _0x48bd8c.cookie = _0x4b0e9d, _0x48bd8c.origin = 'https://carry.m.jd.com', _0x48bd8c.referer = 'https://carry.m.jd.com/', _0x48bd8c['User-Agent'] = _0xde0d61.UA;
        const _0x4a99ea = {};
        _0x4a99ea.url = 'https://api.m.jd.com/client.action?functionId=initForFarm&' + _0x2ff572, _0x4a99ea.headers = _0x48bd8c, _0x4a99ea.timeout = 0x2710;
        const _0x11ecc9 = _0x4a99ea;
        setTimeout(() => {
            _0xde0d61.get(_0x11ecc9, async (_0x1283b9, _0x12aecd, _0x887a0d) => {
                try {
                    if (_0x1283b9) console.log('initForFarm: 请求失败 ‼️‼️'), console.log(JSON.stringify(_0x1283b9)); else {
                        if (_0x15f3df(_0x887a0d)) {
                            _0x887a0d = JSON.parse(_0x887a0d);
                            if (_0x887a0d.code != '0') { }
                            _0x566345 && (_0xde0d61.farmInfo = _0x887a0d);
                        }
                    }
                } catch (_0x36a36e) {
                    _0xde0d61.logErr(_0x36a36e, _0x12aecd);
                } finally {
                    _0x1f2007(_0x887a0d);
                }
            });
        }, _0x1f7663);
    });
}
async function _0xe31141() {
    const _0x15dd07 = {};
    _0x15dd07.version = 0x18, _0x15dd07.channel = 0x1, _0xde0d61.friendList = await _0xe4d52c('friendListInitForFarm', _0x15dd07);
}
async function _0x511c5c() {
    _0xde0d61.awardInviteFriendRes = await _0xe4d52c('awardInviteFriendForFarm');
}
async function _0x557295() {
    if (_0xde0d61.isNode() && process.env.FRUIT_NOTIFY_CONTROL) _0xde0d61.ctrTemp = '' + process.env.FRUIT_NOTIFY_CONTROL === 'false'; else _0xde0d61.getdata('jdFruitNotify') ? _0xde0d61.ctrTemp = _0xde0d61.getdata('jdFruitNotify') === 'false' : _0xde0d61.ctrTemp = '' + _0x37ba97 === 'false';
    _0xde0d61.ctrTemp ? (_0xde0d61.msg(_0xde0d61.name, _0x3d8364, _0x39f0ab, _0x2f164f), _0xde0d61.isNode() && (_0x31eabc += _0x3d8364 + '\n' + _0x39f0ab + (_0xde0d61.index !== _0x2b85c3.length ? '\n\n' : ''))) : _0xde0d61.log('\n' + _0x39f0ab + '\n');
}
function _0xaed8fa(_0x260d9b) {
    let _0x2101ad;
    if (_0x260d9b) _0x2101ad = new Date(_0x260d9b); else {
        _0x2101ad = new Date();
    }
    return _0x2101ad.getFullYear() + '-' + (_0x2101ad.getMonth() + 1 >= 10 ? _0x2101ad.getMonth() + 1 : '0' + (_0x2101ad.getMonth() + 1)) + '-' + (_0x2101ad.getDate() >= 10 ? _0x2101ad.getDate() : '0' + _0x2101ad.getDate());
}
function _0x3807c4() {
    return new Promise(async _0x13ba49 => {
        _0x29db93 = _0x29db93.filter(_0x4f0761 => _0x215f36.indexOf(_0x4f0761) == -1 && !!_0x4f0761), console.log('您提供了' + _0x29db93.length + '个农场助力码\n'), console.log('将要助力的好友' + JSON.stringify(_0x29db93)), _0x13ba49();
    });
}
function _0x53b093() {
    return new Promise(_0x15e810 => {
        console.log('开始获取配置文件...\n'), _0x5b276b = _0xde0d61.isNode() ? require('./sendNotify') : '';
        const _0x337afb = _0xde0d61.isNode() ? require('./jdCookie.js') : '';
        if (process.env.DY_PROXY) {
            const _0x2ea992 = require('./function/proxy.js');
            _0xde0d61.get = _0x2ea992.intoRequest(_0xde0d61.get.bind(_0xde0d61)), _0xde0d61.post = _0x2ea992.intoRequest(_0xde0d61.post.bind(_0xde0d61));
        }
        _0x29db93 = [];
        _0xde0d61.isNode() && process.env.FRUITCODES && (shareCodes = process.env.FRUITCODES.split('&'));
        if (_0xde0d61.isNode()) {
            Object.keys(_0x337afb).forEach(_0x285958 => {
                _0x337afb[_0x285958] && _0x2b85c3.push(_0x337afb[_0x285958]);
            });
            if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
        } else _0x2b85c3 = [_0xde0d61.getdata('CookieJD'), _0xde0d61.getdata('CookieJD2'), ..._0x30649e(_0xde0d61.getdata('CookiesJD') || '[]').map(_0x2fa7ad => _0x2fa7ad.cookie)].filter(_0x3fb21c => !!_0x3fb21c);
        if (_0xde0d61.isNode()) Object.keys(shareCodes).forEach(_0x44e2aa => {
            shareCodes[_0x44e2aa] && _0x29db93.push(shareCodes[_0x44e2aa]);
        }); else {
            if (_0xde0d61.getdata('jd_fruit_inviter')) _0xde0d61.shareCodesArr = _0xde0d61.getdata('jd_fruit_inviter').split('\n').filter(_0xd628a1 => !!_0xd628a1);
            console.log('\nBoxJs设置的' + _0xde0d61.name + '好友邀请码:' + (_0xde0d61.getdata('jd_fruit_inviter') ? _0xde0d61.getdata('jd_fruit_inviter') : '暂无') + '\n');
        }
        let _0x1b7b94 = _0x44e72f.existsSync('./fruit_helpcode');
        shareCodes.length == 0 && _0x1b7b94 ? (_0xde0d61.log('使用本地缓存的助力码\n'), _0x29db93 = _0x44e72f.readFileSync('./fruit_helpcode', 'utf-8'), _0x29db93 = JSON.parse(_0x29db93)) : _0xde0d61.log('使用指定的助力码\n'), _0x15e810();
    });
}
function _0x23e212() {
    return new Promise(_0x41a473 => {
        const _0x1d986a = {};
        _0x1d986a.Cookie = _0x4b0e9d, _0x1d986a.referer = 'https://h5.m.jd.com/', _0x1d986a['User-Agent'] = _0xde0d61.UA;
        const _0x58d897 = {};
        _0x58d897.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x58d897.headers = _0x1d986a, _0x58d897.timeout = 0x2710;
        const _0x2e2666 = _0x58d897;
        _0xde0d61.get(_0x2e2666, (_0x34b7f2, _0x34690e, _0x4c3638) => {
            try {
                if (_0x4c3638) {
                    _0x4c3638 = JSON.parse(_0x4c3638);
                    if (_0x4c3638.islogin === '1') { } else _0x4c3638.islogin === '0' && (_0xde0d61.isLogin = false);
                }
            } catch (_0x169f69) {
                console.log(_0x169f69);
            } finally {
                _0x41a473();
            }
        });
    });
}
function _0xe4d52c(_0x418043, _0x1828ab = {}, _0x4177c4 = 1500) {
    _0xde0d61.reqnum % 5 == 0 && (console.log('\n等待' + _0x3479e5 / 1000 + '秒......\n'), _0x4177c4 = _0x3479e5);
    ;
    return _0xde0d61.reqnum++, new Promise(_0x271c7e => {
        setTimeout(() => {
            _0xde0d61.get(_0x33452d(_0x418043, _0x1828ab), (_0x22f6b6, _0x26f02b, _0x23c641) => {
                try {
                    _0x22f6b6 ? (console.log('\n东东农场: API查询请求失败 ‼️‼️'), console.log(JSON.stringify(_0x22f6b6)), console.log('function_id:' + _0x418043), _0xde0d61.logErr(_0x22f6b6)) : _0x15f3df(_0x23c641) && (_0x23c641 = JSON.parse(_0x23c641));
                } catch (_0x5530be) {
                    _0xde0d61.logErr(_0x5530be, _0x26f02b);
                } finally {
                    _0x271c7e(_0x23c641);
                }
            });
        }, _0x4177c4);
    });
}
function _0x15f3df(_0x268b55) {
    try {
        if (typeof JSON.parse(_0x268b55) == 'object') {
            return true;
        }
    } catch (_0x297407) {
        return console.log(_0x297407), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
    }
}
function _0x33452d(_0x3fa33d, _0x15df3e = {}) {
    const _0x4a3ca7 = {};
    return _0x4a3ca7.Host = 'api.m.jd.com', _0x4a3ca7.Accept = '*/*', _0x4a3ca7.Origin = 'https://carry.m.jd.com', _0x4a3ca7['Accept-Encoding'] = 'gzip, deflate, br', _0x4a3ca7['User-Agent'] = _0xde0d61.UA, _0x4a3ca7['Accept-Language'] = 'zh-CN,zh-Hans;q=0.9', _0x4a3ca7.Referer = 'https://carry.m.jd.com/', _0x4a3ca7.Cookie = _0x4b0e9d, {
        'url': _0x101c6d + '?functionId=' + _0x3fa33d + '&body=' + encodeURIComponent(JSON.stringify(_0x15df3e)) + '&appid=wh5',
        'headers': _0x4a3ca7,
        'timeout': 0x2710
    };
}
function _0x30649e(_0x3530c2) {
    if (typeof _0x3530c2 == 'string') {
        try {
            return JSON.parse(_0x3530c2);
        } catch (_0x2ef1bc) {
            return console.log(_0x2ef1bc), _0xde0d61.msg(_0xde0d61.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
        }
    }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }