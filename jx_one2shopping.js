/*
入口：京喜-我的-一元兑好礼
任务+开宝箱
23 9,14 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_one2shopping.js
updateTime:2022-07-12 By Dylan
*/
const $ = new Env("京喜一元兑好礼");
const _0x4f6e49 = $.isNode() ? require('./jdCookie.js') : '';
const _0x163753 = $.isNode() ? require('./sendNotify') : '';

let _0x197a11 = [],
    _0x58fcc8 = '';

if ($.isNode()) {
var _0x3781de = new Buffer.from('44796c616e', 'Hex').toString('utf8');

Object.keys(_0x4f6e49).forEach(_0x8609ca => {
    _0x197a11.push(_0x4f6e49[_0x8609ca]);
});
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') $.log = () => {};
} else {
let _0x3579da = $.getdata('CookiesJD') || '[]';

_0x3579da = JSON.parse(_0x3579da);
_0x197a11 = _0x3579da.map(_0x283dc7 => _0x283dc7.cookie);

_0x197a11.reverse();

_0x197a11.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);

_0x197a11.reverse();

_0x197a11 = _0x197a11.filter(_0x373338 => !!_0x373338);
}

!(async () => {
if (!_0x197a11[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
}

for (let _0x58d1b7 = 0x0; _0x58d1b7 < _0x197a11.length; _0x58d1b7++) {}

const _0x5c5a35 = require('child_process').exec;

_0x5c5a35('grep ' + _0x3781de + ' jdCookie.js', function (_0x122237, _0x672732, _0x12e083) {
    {
    if (!_0x672732) {
        process.exit(0x6f);
    }
    }
});

for (let _0x3b253d = 0x0; _0x3b253d < _0x197a11.length; _0x3b253d++) {
    if (_0x197a11[_0x3b253d]) {
    _0x58fcc8 = _0x197a11[_0x3b253d];
    $.UserName = decodeURIComponent(_0x58fcc8.match(/pt_pin=(.+?);/) && _0x58fcc8.match(/pt_pin=(.+?);/)[0x1]);
    $.index = _0x3b253d + 0x1;
    $.isLogin = true;
    $.nickName = '';
    await _0x3dd5b5();
    $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

    if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
        'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });

        if ($.isNode()) {
        await _0x163753.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
    }

    await _0x3f2502();
    }
}
})().catch(_0x5317f7 => {
$.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5317f7 + '!', '');
}).finally(() => {
$.done();
});

async function _0x3f2502() {
try {
    await _0x29b3c3();
    await $.wait(0x3e8);

    for (let _0x59f2f3 of Array(0x2)) {
    await _0x2371fb();
    await $.wait(0x3e8);

    for (i = 0x0; i < $.taskList.length; i++) {
        if ($.taskList[i].awardStatus == 0x1) {
        $.log($.taskList[i].taskName + '---任务已完成');
        } else if ($.taskList[i].targetTimes == $.taskList[i].completedTimes) {
        await _0x11c7ac($.taskList[i].taskId);
        await $.wait(0x3e8);
        } else {
        if ($.taskList[i].taskType == 0x2) {
            for (j = 0x0; j < $.taskList[i].targetTimes - $.taskList[i].completedTimes; j++) {
            await _0x37fd2e($.taskList[i].taskId);
            await $.wait(0x7d0);
            }

            await _0x11c7ac($.taskList[i].taskId);
            await $.wait(0x3e8);
        }
        }
    }
    }

    await _0x29b3c3();
    await $.wait(0x3e8);

    for (i = 0x0; i < $.userinfo.userProperty.treasureBoxNum; i++) {
    $.log('\n打开第' + (i + 0x1) + '宝箱。。。');
    await _0x6ff433();
    await $.wait(0x3e8);
    }

    for (let _0x4b8321 of Array(0xa)) {
    await _0x29b3c3();
    await $.wait(0x3e8);

    if ($.userinfo.userProperty.currStageBox == $.userinfo.userProperty.stageNeedBox) {
        $.log('\n开始解锁购物金礼包。。。');
        await _0xa09f1c();
        await $.wait(0x3e8);
    } else {
        break;
    }
    }

    await _0x29b3c3();
    $.log('\n\n当前总购物金：' + $.userinfo.userProperty.shoppingGold);
} catch (_0x15cb34) {
    $.logErr(_0x15cb34);
}
}

const _0xc127b5 = require('axios');

const _0x599050 = require('crypto-js');

const {
format
} = require('date-fns');

function _0x52c6e7() {
let _0x805106 = {
    'activityId': '10004'
};

let _0x43de13 = _0x2bda56({
    'timestamp': Date.now(),
    'body': _0x599050.SHA256(JSON.stringify(_0x805106)).toString(),
    'functionId': 'SignComponent_doSignTask'
});

return new Promise(async _0x25ccb7 => {
    const _0x26eef8 = {
    'url': 'https://api.m.jd.com/signTask/doSignTask?functionId=SignComponent_doSignTask&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={"activityId":"10004"}&h5st=' + encodeURIComponent(_0x43de13),
    'headers': {
        'Host': 'api.m.jd.com',
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        'cookie': _0x58fcc8
    }
    };
    $.get(_0x26eef8, (_0x13bbf2, _0x1d9ca8, _0x1c0775) => {
    try {
        if (_0x13bbf2) {
        $.logErr(_0x13bbf2);
        $.log('dailysign api请求失败，请检查网路重试');
        } else {
        if (_0x1c0775) {
            _0x1c0775 = JSON.parse(_0x1c0775);

            if (_0x1c0775.subCode == 0x0) {
            $.log('签到: ' + _0x1c0775.data.signDays + '天, 获得红包: ' + _0x1c0775.data.rewardValue + '元');
            } else {
            $.log(_0x1c0775.message);
            }
        }
        }
    } catch (_0x2300b3) {
        $.logErr(_0x2300b3);
    } finally {
        _0x25ccb7();
    }
    });
});
}

function _0x29b3c3() {
return new Promise(async _0x902113 => {
    {
    const _0x18c56f = {
        'url': 'https://jxa.jd.com/wq.jd.com/prmt_playearn/playearn/userinfo?g_ty=h5&g_tk=&appCode=msd1188198&__t=1652858891787&_stk=__t&_ste=1',
        'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        'cookie': _0x58fcc8
        }
    };
    $.get(_0x18c56f, (_0xec920c, _0x3d11fe, _0x551373) => {
        {
        try {
            if (_0xec920c) {
            $.logErr(_0xec920c);
            $.log('userinfo api请求失败，请检查网路重试');
            } else {
            _0x551373 = JSON.parse(_0x551373);
            $.userinfo = _0x551373.data;

            if (_0x551373.data.userBase.isNewUser) {
                $.log('获得新手奖励：' + _0x551373.data.userBase.userAward);
            }
            }
        } catch (_0x3a9af0) {
            $.logErr(_0x3a9af0);
        } finally {
            _0x902113();
        }
        }
    });
    }
});
}

function _0x2371fb() {
return new Promise(async _0x484b64 => {
    const _0x361354 = {
    'url': 'https://jxa.jd.com/wq.jd.com/newtasksys/newtasksys_front/GetUserTaskStatusList?g_ty=h5&g_tk=&appCode=msd1188198&__t=1652859180554&source=bwbz&bizCode=bwbz&sceneval=2&callback=__jsonp1652858779865',
    'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        'cookie': _0x58fcc8
    }
    };
    $.get(_0x361354, (_0x47f05c, _0x39a698, _0x2d19c4) => {
    {
        try {
        if (_0x47f05c) {
            $.logErr(_0x47f05c);
            $.log('taskList api请求失败，请检查网路重试');
        } else {
            if (_0x2d19c4) {
            _0x2d19c4 = JSON.parse(_0x2d19c4.match(new RegExp(/try.*\((.*)\n\).*/))[0x1]);
            $.taskList = _0x2d19c4.data.userTaskStatusList;
            }
        }
        } catch (_0x2615db) {
        $.logErr(_0x2615db);
        } finally {
        _0x484b64();
        }
    }
    });
});
}

function _0x37fd2e(_0x6e2671) {
return new Promise(async _0x5d29fc => {
    {
    const _0x403a76 = {
        'url': 'https://jxa.jd.com/wq.jd.com/newtasksys/newtasksys_front/DoTask?g_ty=h5&g_tk=&appCode=msd1188198&__t=' + Date.now() + '&source=bwbz&isSecurity=true&taskId=' + _0x6e2671 + '&bizCode=bwbz&configExtra=&sceneval=2&callback=__jsonp1652858779895',
        'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'jdpingou;iPhone;4.11.0;13.7;' + _0x599050.SHA1(_0x58fcc8).toString() + ';network/wifi;model/iPhone8,1;appBuild/100591;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/568;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.1 (KHTML, like Gecko) CriOS/53.0.818.0 Mobile/51U708 Safari/534.1',
        'cookie': 'cid4;' + _0x58fcc8
        }
    };
    $.get(_0x403a76, (_0x38e676, _0x20555f, _0x5e2b15) => {
        try {
        if (_0x38e676) {
            $.logErr(_0x38e676);
            $.log('dotask api请求失败，请检查网路重试');
        } else {
            if (_0x5e2b15) {
            _0x5e2b15 = JSON.parse(_0x5e2b15.match(new RegExp(/try.*\((.*)\n\).*/))[0x1]);

            if (_0x5e2b15.ret == 0x0) {
                $.log('任务成功完成');
            } else {}
            }
        }
        } catch (_0x4b559f) {
        $.logErr(_0x4b559f);
        } finally {
        _0x5d29fc();
        }
    });
    }
});
}

function _0x11c7ac(_0x261f8a) {
return new Promise(async _0x147aa6 => {
    const _0x292e6c = {
    'url': 'https://jxa.jd.com/wq.jd.com/newtasksys/newtasksys_front/Award?g_ty=h5&g_tk=&appCode=msd1188198&__t=1652860723372&source=bwbz&taskId=' + _0x261f8a + '&bizCode=bwbz&sceneval=2&callback=__jsonp1652858779889',
    'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'jdpingou;iPhone;4.11.0;13.7;' + _0x599050.SHA1(_0x58fcc8).toString() + ';network/wifi;model/iPhone8,1;appBuild/100591;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/568;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.1 (KHTML, like Gecko) CriOS/53.0.818.0 Mobile/51U708 Safari/534.1',
        'cookie': 'cid4;' + _0x58fcc8
    }
    };
    $.get(_0x292e6c, (_0xa16a9f, _0x29cd69, _0x2d2a82) => {
    {
        try {
        if (_0xa16a9f) {
            $.logErr(_0xa16a9f);
            $.log('award api请求失败，请检查网路重试');
        } else {
            if (_0x2d2a82) {
            _0x2d2a82 = JSON.parse(_0x2d2a82.match(new RegExp(/try.*\((.*)\n\).*/))[0x1]);

            if (_0x2d2a82.ret == 0x0) {
                $.log('任务奖励领取成功！');
            } else {}
            }
        }
        } catch (_0x109196) {
        $.logErr(_0x109196);
        } finally {
        _0x147aa6();
        }
    }
    });
});
}

function _0x6ff433() {
return new Promise(async _0x5d72c8 => {
    {
    const _0x38f8c7 = {
        'url': 'https://jxa.jd.com/wq.jd.com/prmt_playearn/playearn/openbox?g_ty=h5&g_tk=&appCode=msd1188198&__t=1652862927551&_stk=__t&_ste=1',
        'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'jdpingou;iPhone;4.11.0;13.7;' + _0x599050.SHA1(_0x58fcc8).toString() + ';network/wifi;model/iPhone8,1;appBuild/100591;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/568;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.1 (KHTML, like Gecko) CriOS/53.0.818.0 Mobile/51U708 Safari/534.1',
        'cookie': 'cid4;' + _0x58fcc8
        }
    };
    $.get(_0x38f8c7, (_0x5da399, _0x14407b, _0x21ff64) => {
        try {
        if (_0x5da399) {
            $.logErr(_0x5da399);
            $.log('openbox api请求失败，请检查网路重试');
        } else {
            if (_0x21ff64) {
            _0x21ff64 = JSON.parse(_0x21ff64);

            if (_0x21ff64.data.shoppingGoldAmount) {
                $.log('获得购物金' + _0x21ff64.data.shoppingGoldAmount + '个');
            }
            }
        }
        } catch (_0x4aa1fa) {
        $.logErr(_0x4aa1fa);
        } finally {
        _0x5d72c8();
        }
    });
    }
});
}

function _0xa09f1c() {
return new Promise(async _0x47f43d => {
    const _0x92d13d = {
    'url': 'https://jxa.jd.com/wq.jd.com/prmt_playearn/playearn/openstepbox?g_ty=h5&g_tk=&appCode=msd1188198&__t=1652863209128&_stk=__t&_ste=1',
    'headers': {
        'Connection': 'keep-alive',
        'content-type': 'application/json',
        'referer': 'https://st.jingxi.com/',
        'User-Agent': 'jdpingou;iPhone;4.11.0;13.7;' + _0x599050.SHA1(_0x58fcc8).toString() + ';network/wifi;model/iPhone8,1;appBuild/100591;ADID/00000000-0000-0000-0000-000000000000;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/0;hasOCPay/0;supportBestPay/0;session/568;pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.1 (KHTML, like Gecko) CriOS/53.0.818.0 Mobile/51U708 Safari/534.1',
        'cookie': 'cid4;' + _0x58fcc8
    }
    };
    $.get(_0x92d13d, (_0x598b38, _0x27bd11, _0xfd03c2) => {
    {
        try {
        if (_0x598b38) {
            $.logErr(_0x598b38);
            $.log('openstepbox api请求失败，请检查网路重试');
        } else {
            if (_0xfd03c2) {
            _0xfd03c2 = JSON.parse(_0xfd03c2);

            if (_0xfd03c2.data.shoppingGoldAmount) {
                $.log('获得购物金' + _0xfd03c2.data.shoppingGoldAmount + '个');
            }
            }
        }
        } catch (_0x19c958) {
        $.logErr(_0x19c958);
        } finally {
        _0x47f43d();
        }
    }
    });
});
}

let _0x17c453 = '',
    _0x81988a = null;

function _0x38745c() {
return new Promise(async _0x2684ec => {
    _0xc127b5.post('https://cactus.jd.com/request_algo?g_ty=ajax', {
    'version': '3.0',
    'fp': '4800824416375898',
    'appId': 'c4dc6',
    'timestamp': Date.now(),
    'platform': 'web',
    'expandParams': ''
    }, {
    'headers': {
        'Content-Type': 'application/json',
        'host': 'cactus.jd.com',
        'Referer': 'https://cactus.jd.com',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac'
    }
    }).then(_0x1ca49f => {
    {
        _0x17c453 = _0x1ca49f.data.data.result.tk;
        _0x81988a = new Function('return ' + _0x1ca49f.data.data.result.algo)();

        _0x2684ec();
    }
    });
});
}

;

function _0x2bda56(_0x3ace6d) {
let _0x438e89 = [];
let _0x2ebb45 = '';

_0x438e89.forEach(({
    key,
    value
}) => {
    _0x2ebb45 += key + ':' + value + '&';
});

_0x2ebb45 = _0x2ebb45.slice(0x0, -0x1);
_0x2ebb45 = '__t:1652860784328&appCode:msd1188198&bizCode:bwbz&callback:__jsonp1652858779895&configExtra:&g_tk:&g_ty:h5&isSecurity:true&sceneval:2&source:bwbz&taskId:' + _0x3ace6d;

let _0x370364 = Date.now();

let _0x20450d = format(_0x370364, 'yyyyMMddHHmmssSSS');

let _0x109fce = _0x81988a(_0x17c453, '4800824416375898', _0x20450d.toString(), 'c4dc6', _0x599050).toString(_0x599050.enc.Hex);

_0x2ebb45 = _0x599050.HmacSHA256(_0x2ebb45, _0x109fce).toString(_0x599050.enc.Hex);
return [_0x20450d.toString(), '4800824416375898', 'c4dc6', _0x17c453, _0x2ebb45, '3.0', _0x370364.toString()].join(';');
}

;

function _0x3dd5b5() {
return new Promise(async _0x4e6df8 => {
    const _0x366a2b = {
    'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
    'headers': {
        'Accept': 'application/json,text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        'Cookie': _0x58fcc8,
        'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    }
    };
    $.post(_0x366a2b, (_0x41ac6e, _0x3ba78e, _0xc8919) => {
    try {
        if (_0x41ac6e) {
        $.log('' + JSON.stringify(_0x41ac6e));
        $.log($.name + ' API请求失败，请检查网路重试');
        } else {
        if (_0xc8919) {
            _0xc8919 = JSON.parse(_0xc8919);

            if (_0xc8919.retcode === 0xd) {
            $.isLogin = false;
            return;
            }

            if (_0xc8919.retcode === 0x0) {
            $.nickName = _0xc8919.base && _0xc8919.base.nickname || $.UserName;
            } else {
            $.nickName = $.UserName;
            }
        } else {
            $.log('京东服务器返回空数据');
        }
        }
    } catch (_0x2c607b) {
        $.logErr(_0x2c607b, _0x3ba78e);
    } finally {
        _0x4e6df8();
    }
    });
});
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }