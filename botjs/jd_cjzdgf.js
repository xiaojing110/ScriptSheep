/*
活动地址为：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=xxxxx
一共有2个变量
jd_cjhy_activityId  活动ID 必需
jd_cjhy_activityUrl 活动地址 必需

cron:10 10 10 10 *
============Quantumultx===============
[task_local]
#CJ组队瓜分京豆
1 1 1 1 * jd_cjzdgf.js, tag=CJ组队瓜分京豆, enabled=true

*/

let jd_cjhy_activityId="2584bc5fb137415c87cedbb2e56bda3c" // 活动ID
let jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

const $ = new Env('CJ组队瓜分京豆');


const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let lz_cookie = {};
let cookiesArr = [],
    cookie = '',
    message = '',
    messageTitle = '';
activityId = $.getdata('jd_kr_cjhy_activityId') ? $.getdata('jd_kr_cjhy_activityId') : jd_cjhy_activityId;
activityUrl = $.getdata('jd_kr_cjhy_activityUrl') ? $.getdata('jd_kr_cjhy_activityUrl') : jd_cjhy_activityUrl;
let activityCookie = '';

if ($.isNode()) {
if (process.env.jd_cjhy_activityId) {
    activityId = process.env.jd_cjhy_activityId;
}


if (process.env.jd_cjhy_activityUrl) {
    activityUrl = process.env.jd_cjhy_activityUrl;
}


if (JSON.stringify(process.env).indexOf('GITHUB') > -0x1) {
    process.exit(0);
}

Object.keys(jdCookieNode).forEach(_0x2b77x9 => {
    cookiesArr.push(jdCookieNode[_0x2b77x9]);
});

if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
}
} else {
cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...$.toObj($.getdata('CookiesJD') || '[]').map(_0x2b77x9 => {
    return _0x2b77x9.cookie;
})].filter(_0x2b77x9 => {
    return !!_0x2b77x9;
});
}

let isGetCookie = typeof $request !== 'undefined';

if (isGetCookie) {
GetCookie();
$.done();
}

!(async () => {
if (!activityId) {
    $.msg($.name, '', '活动id不存在');
    $.done();
    return;
}

console.log('【当前活动入口】\nhttps://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=' + activityId);

if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
    'open-url': 'https://bean.m.jd.com/'
    });
    return;
}

$.memberCount = 0;
messageTitle += '活动id:\n' + activityId + '\n';
$.toactivity = [];

for (let _0x2b77xd = 0; _0x2b77xd < cookiesArr.length; _0x2b77xd++) {
    if (cookiesArr[_0x2b77xd]) {
    cookie = cookiesArr[_0x2b77xd];
    originCookie = cookiesArr[_0x2b77xd];
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[0x1]);
    $.index = _0x2b77xd + 1;
    $.isLogin = true;
    $.nickName = '';
    console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

    if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
        'open-url': 'https://bean.m.jd.com/'
        });

        if ($.isNode()) {
        await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
    }
    await jrzd();
    await $.wait(1000);

    if (!$.toactivity || $.maxTeam) {
        break;
    }
    }
}

messageTitle += '队伍人数 ' + $.memberCount + '\n';
await showMsg();
})().catch(_0x2b77xc => {
$.log('', `${' '}${$.name}${', 失败! 原因: '}${_0x2b77xc}${'!'}`, '');
}).finally(() => {
$.done();
});

async function jrzd() {
getUA();
$.sid = '';
$.userId = '';
$.Token = '';
$.Pin = '';
$.hisPin = '';
$.card = [];
$.saveTeam = false;
await getCk();
await getSimpleActInfoVo();
await getshopInfo();
await $.wait(1000);

if ($.sid && $.userId) {
    await getToken();

    if ($.Token) {
    await getPin();
    }

    if (!$.Pin) {
    console.log('获取[Pin]失败！');
    return;
    }
    await $.wait(1000);
    await accessLog();
    await getUserInfo();
    await $.wait(1000);
    await getOpenCardInfo();
    await $.wait(1000);
    await getTeam();

    if ($.maxTeam) {
    console.log('队伍已满员');
    return;
    }
} else {
    console.log('【京东账号' + $.index + '】 未能获取活动信息');
    message += '【京东账号' + $.index + '】 未能获取活动信息\n';
}
}

function getUA() {
$.UA = `${'jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;'}`;
}

function showMsg() {
return new Promise(_0x2b77x11 => {
    $.msg($.name, '', '【京东账号' + $.index + '】' + $.nickName + '\n' + message);

    _0x2b77x11();
});
}

function getSimpleActInfoVo() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x13 = `${'activityId='}${activityId}${''}`;
    $.post(taskPostUrl('/customer/getSimpleActInfoVo', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log(`${''}${$.toStr(_0x2b77x14)}${''}`);
        console.log(`${''}${$.name}${' getSimpleActInfoVo API请求失败，请检查网路重试'}`);
        } else {}
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function randomString(_0x2b77xc) {
_0x2b77xc = _0x2b77xc || 32;
let _0x2b77x19 = 'abcdef0123456789'.length,
    _0x2b77x1a = '';

for (i = 0; i < _0x2b77xc; i++) {
    _0x2b77x1a += 'abcdef0123456789'.charAt(Math.floor(Math.random() * _0x2b77x19));
}

return _0x2b77x1a;
}

function getCk() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x1c = {
    url: activityUrl + '/wxTeam/activity?activityId=' + activityId,
    headers: {
        Cookie: cookie,
        "User-Agent": $.UA
    }
    };
    $.get(_0x2b77x1c, async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' cookie API请求失败，请检查网路重试');
        } else {
        if (_0x2b77x15.status == 200) {
            refreshToken(_0x2b77x15);
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getToken() {
return new Promise(_0x2b77x11 => {
    $.post(taskUrl('?functionId=isvObfuscator', 'body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f'), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' 2 API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.code == 0 && _0x2b77x16.token) {
            $.Token = _0x2b77x16.token;
            } else {
            console.log('异常2：' + JSON.stringify(_0x2b77x16));
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getPin() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x13 = 'userId=' + $.userId + '&token=' + $.Token + '&fromType=APP&riskType=1';

    $.post(taskPostUrl('/customer/getMyPing', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' 3 API请求失败，请检查网路重试');
        } else {
        if (_0x2b77x15.status == 200) {
            refreshToken(_0x2b77x15);
        }


        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            $.Pin = _0x2b77x16.data.secretPin;
            } else {
            console.log('异常3：' + JSON.stringify(_0x2b77x16));
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getshopInfo() {
return new Promise(_0x2b77x11 => {
    $.post(taskPostUrl('/wxTeam/shopInfo', 'activityId=' + activityId), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' 1 API请求失败，请检查网路重试');
        } else {
        if (_0x2b77x16 && safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.data) {
            $.sid = _0x2b77x16.data.sid;
            $.userId = _0x2b77x16.data.userId;
            $.shopName = _0x2b77x16.data.shopName;
            } else {
            console.log('异常1：' + JSON.stringify(_0x2b77x16));
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getOpenCardInfo() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x13 = 'venderId=' + $.userId + '&buyerPin=' + encodeURIComponent($.Pin);

    $.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.getOpenCardInfo + 'API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            if (_0x2b77x16.data.openCardLink) {
                $.channel = _0x2b77x16.data.openCardLink.match(/channel=(\d+)/)[0x1];
                $.joinVenderId = _0x2b77x16.data.openCardLink.match(/venderId=(\d+)/)[0x1];
            } else {}
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function joinShop() {
return new Promise(async _0x2b77x11 => {
    let _0x2b77x13 = `${'{\n\t\t\t  "venderId":"'}${$.joinVenderId}${'",\n\t\t\t  "shopId":"'}${$.joinVenderId}${'",\n\t\t\t  "bindByVerifyCodeFlag":1,\n\t\t\t  "registerExtend":{},\n\t\t\t  "writeChildFlag":0,\n\t\t\t  "channel":'}${$.channel}${'\n\t\t\t  }'}`;
    $.errorJoinShop = '';
    await getshopactivityId();

    let _0x2b77x23 = await geth5st();

    const _0x2b77x1c = {
    url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='}${_0x2b77x13}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x2b77x23}${''}`,
    headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
    }
    };
    $.get(_0x2b77x1c, async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        let _0x2b77x24 = $.toObj(_0x2b77x16, _0x2b77x16);

        if (typeof _0x2b77x24 == 'object') {
        if (_0x2b77x24.success === true) {
            console.log(_0x2b77x24.message);
            $.errorJoinShop = _0x2b77x24.message;

            if (_0x2b77x24.result && _0x2b77x24.result.giftInfo) {
            for (let _0x2b77xd of _0x2b77x24.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0x2b77xd.discountString}${''}${_0x2b77xd.prizeName}${''}${_0x2b77xd.secondLineDesc}${''}`);
            }
            }
        } else {
            if (typeof _0x2b77x24 == 'object' && _0x2b77x24.message) {
            $.errorJoinShop = _0x2b77x24.message;
            console.log(`${''}${_0x2b77x24.message || ''}${''}`);
            } else {
            console.log(_0x2b77x16);
            }
        }
        } else {
        console.log(_0x2b77x16);
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getshopactivityId() {
return new Promise(_0x2b77x11 => {
    const _0x2b77x1c = {
    url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'}${$.joinVenderId}${'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888'}`,
    headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
    }
    };
    $.get(_0x2b77x1c, async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        let _0x2b77x24 = $.toObj(_0x2b77x16, _0x2b77x16);

        if (typeof _0x2b77x24 == 'object') {
        if (_0x2b77x24.success == true) {
            console.log(`${'入会:'}${_0x2b77x24.result.shopMemberCardInfo.venderCardName || ''}${''}`);
        }
        } else {
        console.log(_0x2b77x16);
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getUserInfo() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x13 = 'pin=' + encodeURIComponent(encodeURIComponent($.Pin));

    $.post(taskPostUrl('/wxActionCommon/getUserInfo', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' 6-1 API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            $.attrTouXiang = _0x2b77x16.data.yunMidImageUrl ? _0x2b77x16.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
            } else {
            console.log('异常6-2：' + JSON.stringify(_0x2b77x16));
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function getTeam() {
return new Promise(_0x2b77x11 => {
    let _0x2b77x13 = 'activityId=' + activityId + '&pin=' + encodeURIComponent(encodeURIComponent($.Pin));

    if ($.signUuid) {
    _0x2b77x13 += '&signUuid=' + $.signUuid;
    }
    $.post(taskPostUrl('/wxTeam/activityContent', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + ' 5 API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            if (new Date(_0x2b77x16.data.active.endTimeStr.replace(/-/g, '/')).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log('活动结束');
                messageTitle += '活动结束\n';

                _0x2b77x11();
            } else {
                if (!_0x2b77x16.data.canCreate && _0x2b77x16.data.list == null) {
                message += '人数已满\n';
                }

                ;

                if (_0x2b77x16.data.share) {
                $.memberCount = parseInt(_0x2b77x16.data.share.memberCount, 10) + 1;
                } else {
                $.memberCount = 0;
                }

                ;

                if ($.index == 1) {
                $.saveTeam = true;
                $.teamNum = _0x2b77x16.data.active.actRule.match(/最多可以组建(\d+)个战队/);

                if ($.teamNum) {
                    $.teamNum = $.teamNum[0x1];
                    messageTitle += '最多可以组建' + $.teamNum + '个战队';
                }
                }

                ;

                if ($.signUuid) {
                $.log('加入队伍 id: ' + $.signUuid);
                $.wait(600);
                await joinTeam();
                }

                ;

                if ($.saveTeam) {
                if (_0x2b77x16.data.canCreate) {
                    await saveTeam();
                } else {
                    $.signUuid = _0x2b77x16.data.signUuid;
                    messageTitle += '队伍id: ' + $.signUuid + '\n';
                    message += '【京东账号' + $.index + '】 创建队伍id: ' + $.signUuid;
                    $.log('队伍id: ' + $.signUuid);
                    $.wait(1000);
                    $.log('加入队伍 id: ' + $.signUuid);
                    await joinTeam();
                }
                }
            }
            } else {
            console.log('异常5：' + JSON.stringify(_0x2b77x16));
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11(_0x2b77x11);
    }
    });
});
}

function saveTeam(_0x2b77x29 = 0x0) {
return new Promise(_0x2b77x11 => {
    let _0x2b77x2a = encodeURIComponent(encodeURIComponent($.Pin));

    if (_0x2b77x29 == 1) {
    _0x2b77x2a = encodeURIComponent(encodeURIComponent($.Pin));
    }

    let _0x2b77x13 = 'activityId=' + activityId + '&pin=' + _0x2b77x2a + '&pinImg=' + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + '&venderId=' + $.userId;

    $.post(taskPostUrl('/wxTeam/saveCaptain', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + 'saveTeam API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            message += '【京东账号' + $.index + '】 创建队伍id: ' + _0x2b77x16.data.signUuid + ' ';
            console.log('创建队伍成功 id: ' + _0x2b77x16.data.signUuid);
            $.signUuid = _0x2b77x16.data.signUuid;
            messageTitle += '队伍id: ' + $.signUuid + ' ';
            } else {
            console.log('异常6：' + JSON.stringify(_0x2b77x16));

            if (_0x2b77x16.errorMessage.indexOf('不是店铺会员') > -1 && _0x2b77x29 != 3) {
                $.errorJoinShop = '';
                await joinShop();

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第1次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第2次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第3次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第4次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;
                await $.wait(800);
                await saveTeam(3);
            } else {
                if (_0x2b77x16.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x2b77x29 == 0) {
                await $.wait(800);
                await saveTeam(1);
                }
            }
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function joinTeam(_0x2b77x29 = 0x0) {
return new Promise(_0x2b77x11 => {
    let _0x2b77x2a = encodeURIComponent(encodeURIComponent($.Pin));

    if (_0x2b77x29 == 1) {
    _0x2b77x2a = encodeURIComponent(encodeURIComponent($.Pin));
    }

    let _0x2b77x13 = 'activityId=' + activityId + '&signUuid=' + $.signUuid + '&pin=' + _0x2b77x2a + '&pinImg=' + encodeURIComponent(encodeURIComponent($.attrTouXiang)) + '&venderId=' + $.userId;

    $.post(taskPostUrl('/wxTeam/saveMember', _0x2b77x13), async (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + 'joinTeam API请求失败，请检查网路重试');
        } else {
        if (safeGet(_0x2b77x16)) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.result && _0x2b77x16.data) {
            message += '【京东账号' + $.index + '】 加入队伍\n';
            $.log('加入队伍成功');
            } else {
            if (_0x2b77x16.errorMessage.indexOf('不是店铺会员') > -1 && _0x2b77x29 != 3) {
                $.errorJoinShop = '';
                await joinShop();

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第1次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第2次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第3次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
                console.log('第4次 重新开卡');
                await $.wait(1000);
                await joinShop();
                }

                ;
                await joinTeam(3);
            } else {
                if (_0x2b77x16.errorMessage.indexOf('队伍已经满员') > -1) {
                $.maxTeam = true;
                } else {
                if (_0x2b77x16.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x2b77x29 == 0) {
                    await joinTeam(1);
                } else {
                    console.log('异常7：' + JSON.stringify(_0x2b77x16));
                    message += '【京东账号' + $.index + '】 ' + _0x2b77x16.errorMessage + '\n';
                }
                }
            }
            }
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function taskPostUrl(_0x2b77x2d, _0x2b77x13) {
return {
    url: '' + activityUrl + _0x2b77x2d,
    body: _0x2b77x13,
    headers: {
    Accept: 'application/json',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    Connection: 'keep-alive',
    Host: `${'cjhydz-isv.isvjcloud.com'}`,
    Origin: `${'https://cjhydz-isv.isvjcloud.com'}`,
    "Content-Type": 'application/x-www-form-urlencoded',
    Referer: activityUrl + '/wxTeam/activity?activityId=' + activityId,
    Cookie: cookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
    "User-Agent": $.UA
    }
};
}

function taskUrl(_0x2b77x2d, _0x2b77x13) {
return {
    url: 'https://api.m.jd.com/client.action' + _0x2b77x2d,
    body: _0x2b77x13,
    headers: {
    Accept: '*/*',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    Connection: 'keep-alive',
    "Content-Type": 'application/x-www-form-urlencoded',
    Host: 'api.m.jd.com',
    Cookie: cookie,
    "User-Agent": $.UA
    }
};
}

function TotalBean() {
return new Promise(async _0x2b77x11 => {
    const _0x2b77x1c = {
    'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
    'headers': {
        'Accept': 'application/json,text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        'Cookie': cookie,
        'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'User-Agent': $.UA
    }
    };
    $.post(_0x2b77x1c, (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + 'TotalBean API请求失败，请检查网路重试');
        } else {
        if (_0x2b77x16) {
            _0x2b77x16 = JSON.parse(_0x2b77x16);

            if (_0x2b77x16.retcode === 0xd) {
            $.isLogin = false;
            return;
            }
        } else {
            console.log('京东服务器返回空数据');
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function safeGet(_0x2b77x16) {
try {
    if (typeof JSON.parse(_0x2b77x16) == 'object') {
    return true;
    }
} catch (e) {
    console.log(e);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
}
}

function accessLog() {
return new Promise(async _0x2b77x11 => {
    const _0x2b77x1c = {
    url: `${'https://cjhydz-isv.isvjcloud.com/common/accessLog'}`,
    headers: {
        Accept: 'application/json',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        Connection: 'keep-alive',
        Host: `${'cjhydz-isv.isvjcloud.com'}`,
        Origin: `${'https://cjhydz-isv.isvjcloud.com'}`,
        "Content-Type": 'application/x-www-form-urlencoded',
        Referer: activityUrl + '/wxTeam/activity?activityId' + activityId,
        Cookie: cookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
        "User-Agent": $.UA
    },
    body: `${'venderId=691399&code=102&pin='}${encodeURIComponent(encodeURIComponent($.Pin))}${'&activityId='}${activityId}${'&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'}${activityId}${'&subType=app'}`
    };
    $.post(_0x2b77x1c, (_0x2b77x14, _0x2b77x15, _0x2b77x16) => {
    try {
        if (_0x2b77x14) {
        console.log('' + JSON.stringify(_0x2b77x14));
        console.log($.name + 'accessLog API请求失败，请检查网路重试');
        } else {
        if (_0x2b77x15.status == 200) {
            refreshToken(_0x2b77x15);
        }
        }
    } catch (e) {
        $.logErr(e, _0x2b77x15);
    } finally {
        _0x2b77x11();
    }
    });
});
}

function refreshToken(_0x2b77x15) {
if (_0x2b77x15.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0x2b77x33 of _0x2b77x15.headers['set-cookie']) {
    lz_cookie[_0x2b77x33.split(';')[0x0].substr(0, _0x2b77x33.split(';')[0x0].indexOf('='))] = _0x2b77x33.split(';')[0x0].substr(_0x2b77x33.split(';')[0x0].indexOf('=') + 1);
    }

    for (const _0x2b77x34 of Object.keys(lz_cookie)) {
    cookie += _0x2b77x34 + '=' + lz_cookie[_0x2b77x34] + ';';
    }
    activityCookie = cookie;
}
}

function jsonParse(_0x2b77x36) {
if (typeof strv == 'string') {
    try {
    return JSON.parse(_0x2b77x36);
    } catch (e) {
    console.log(e);
    $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie');
    return [];
    }
}
}

function GetCookie() {
if ($request.url.indexOf('/wxTeam/shopInfo') > -1) {
    if ($request.body) {
    let _0x2b77x22 = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);

    if (_0x2b77x22) {
        let _0x2b77x38 = $request.url.split('/');

        console.log('activityId: ' + _0x2b77x22[0x1]);
        console.log('activityUrl: ' + _0x2b77x38[0x0] + '//' + _0x2b77x38[0x2]);
        $.setdata(_0x2b77x22[0x1], 'jd_kr_cjhy_activityId');
        $.setdata(_0x2b77x38[0x0] + '//' + _0x2b77x38[0x2], 'jd_kr_cjhy_activityUrl');
        $.msg($.name, '获取activityId: 成功', 'activityId:' + _0x2b77x22[0x1] + '\nactivityUrl:' + _0x2b77x38[0x0] + '//' + _0x2b77x38[0x2]);
    } else {
        $.msg($.name, '找不到activityId', '');
    }
    }
}
}

function generateFp(){
	let _0xab5478='0123456789';
	let _0x396925=13;
	let _0x367b73='';
	for(;_0x396925--;)_0x367b73+=_0xab5478[Math.random()*_0xab5478.length|0x0];
	return (_0x367b73+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x129320=Date.now();
	let _0xc75537=generateFp();
	let _0x2d1aba=new Date(_0x129320).Format('yyyyMMddhhmmssSSS');
	let _0x42186a=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0x17c063=_0x42186a[random(0,_0x42186a.length)];
	return encodeURIComponent(((_0x2d1aba+';')+_0xc75537+_0x17c063)+Date.now());
}
Date.prototype.Format=function(_0x12206d){
	var _0x45d38c,_0x5d1733=this,_0x31d558=_0x12206d,_0x52396c={'M+':(_0x5d1733.getMonth()+1),'d+':_0x5d1733.getDate(),'D+':_0x5d1733.getDate(),'h+':_0x5d1733.getHours(),'H+':_0x5d1733.getHours(),'m+':_0x5d1733.getMinutes(),'s+':_0x5d1733.getSeconds(),'w+':_0x5d1733.getDay(),'q+':Math.floor((_0x5d1733.getMonth()+3)/3),'S+':_0x5d1733.getMilliseconds()};
	/(y+)/i.test(_0x31d558)&&(_0x31d558=_0x31d558.replace(RegExp.$1,''.concat(_0x5d1733.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0x4d0bc1 in _0x52396c){
		if(new RegExp('('.concat(_0x4d0bc1,')')).test(_0x31d558)){
			var _0x58e8d6,_0x3e735d=('S+'===_0x4d0bc1)?'000':'00';
			_0x31d558=_0x31d558.replace(RegExp.$1,(1==RegExp.$1.length)?_0x52396c[_0x4d0bc1]:(''.concat(_0x3e735d)+_0x52396c[_0x4d0bc1]).substr(''.concat(_0x52396c[_0x4d0bc1]).length));
		}
	}
	return _0x31d558;
};
function random(_0x57e221,_0x17fb3a){
	return Math.floor(Math.random()*(_0x17fb3a-_0x57e221))+_0x57e221;
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


