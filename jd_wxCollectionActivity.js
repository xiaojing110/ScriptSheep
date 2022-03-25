/*
https://lzkj-isv.isvjcloud.com/wxgame/activity/8530275?activityId=

TG https://t.me/duckjobs

不能并发

JD_CART_REMOVESIZE || 20; // 运行一次取消多全部已关注的商品。数字0表示不取关任何商品
JD_CART_REMOVEALL || true;    //是否清空，如果为false，则上面设置了多少就只删除多少条
7 7 7 7 7 jd_wxCollectionActivity.js

活动环境变量参考 ACTIVITY_ID="" 多id & 分开, ACTIVITY_ALL 不判断黑号,默认判断,如果不需要判断 ACTIVITY_ALL = false

脚本加密!!!介意别跑!!!
脚本加密!!!介意别跑!!!
脚本加密!!!介意别跑!!!
脚本加密!!!介意别跑!!!
*/
const $ = new Env('加购物车抽奖');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = message = '', isPush = false;
let activityIdList = [];
let activity_all = false;
let lz_cookie = {}

if (process.env.ACTIVITY_ALL && process.env.ACTIVITY_ALL != "") {
    activity_all = process.env.ACTIVITY_ALL;
}
if (process.env.ACTIVITY_ID && process.env.ACTIVITY_ID != "") {
    if (process.env.ACTIVITY_ID.indexOf('&') > -1) {
        activityIdList = process.env.ACTIVITY_ID.split('&');
    } else {
        activityIdList = [process.env.ACTIVITY_ID];
    }
}
activityIdList = [...new Set(activityIdList.filter(item => !!item))]
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}
let doPush = process.env.DoPush || false; // 设置为 false 每次推送, true 跑完了推送
let removeSize = process.env.JD_CART_REMOVESIZE || 20; // 运行一次取消多全部已关注的商品。数字0表示不取关任何商品
let isRemoveAll = process.env.JD_CART_REMOVEALL || true;    //是否清空，如果为false，则上面设置了多少就只删除多少条
$.keywords = process.env.JD_CART_KEYWORDS || []
$.keywordsNum = 0;
console.log("脚本加密!!!介意别跑!!!脚本加密!!!介意别跑!!!")
console.log("环境变量参考脚本")
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' });
        return;
    }
    for (let _0x526c22 in activityIdList) {
        activityId = activityIdList[_0x526c22];
        console.log('开起第 ' + _0x526c22 + ' 个活动，活动id：' + activityId);
        for (let _0x5042f8 = 0; _0x5042f8 < cookiesArr.length; _0x5042f8++) {
            if (cookiesArr[_0x5042f8]) {
                cookie = cookiesArr[_0x5042f8];
                originCookie = cookiesArr[_0x5042f8];
                newCookie = '';
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
                $.index = (_0x5042f8 + 1);
                $.isLogin = true;
                $.nickName = '';
                await checkCookie();
                console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
                if (!$.isLogin) {
                    $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' });
                    if ($.isNode()) {
                        await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
                    }
                    continue;
                }
                authorCodeList = [''];
                $.bean = 0;
                $.ADID = getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx', 1);
                $.UUID = getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
                $.authorCode = authorCodeList[random(0, authorCodeList.length)];
                $.authorNum = '' + random(1000000, 9999999);
                $.activityId = activityId;
                $.activityUrl = 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/activity2/' + $.authorNum + '?activityId=' + $.activityId + '&shareUuid=' + encodeURIComponent($.authorCode) + '&adsource=null&sid=&un_area=';
                $.drawInfoName = false;
                $.getPrize = null;
                await addCart();
                if (activity_all) {
                    console.log('当前设置 activity_all ' + activity_all + ' 如果需要全跑 ACTIVITY_ALL = true');
                    if (($.drawInfoName === false) || ($.getPrize === null)) {
                        break;
                    } else if (($.getPrize != null) && !$.getPrize.includes('京豆')) {
                        break;
                    }
                } else {
                    console.log('当前设置 activity_all ' + activity_all);
                }
                await $.wait(500);
                await requireConfig();
                do {
                    await getCart_xh();
                    $.keywordsNum = 0;
                    if ($.beforeRemove !== '0') {
                        await cartFilter_xh(venderCart);
                        if (parseInt($.beforeRemove) !== $.keywordsNum) await removeCart(); else {
                            console.log('由于购物车内的商品均包含关键字，本次执行将不删除购物车数据');
                            break;
                        }
                    } else break;
                } while (isRemoveAll && ($.keywordsNum !== $.beforeRemove));
                if ($.bean > 0) {
                    message += '\n【京东账号' + $.index + '】' + ($.nickName || $.UserName) + ' \n       └ 获得 ' + $.bean + ' 京豆。';
                }
            }
        }
        await $.wait(500);
    } if (message !== '') {
        if ($.isNode()) {
            await notify.sendNotify($.name, message, '\n');
        } else {
            $.msg($.name, '有点儿收获', message);
        }
    }
})().catch(_0x3dd7ef => {
    $.log('❌ ' + $.name + ', 失败! 原因: ' + _0x3dd7ef + '!', '');
}).finally(() => {
    $.done();
});
async function addCart() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', 'venderId=' + $.venderId + '&code=6&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            await task('activityContent', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            if ($.activityContent.drawInfo.name.includes('京豆')) {
                $.log('-> 加入购物车');
                for (let _0x3074e7 in $.activityContent.cpvos) {
                    await $.wait(500);
                    await task('addCart', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin) + '&productId=' + $.activityContent.cpvos[_0x3074e7].skuId);
                }
                $.log('-> 抽奖');
                await $.wait(500);
                await task('getPrize', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            } else {
                $.log('未能成功获取到活动信息');
            }
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
async function addCarta() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', 'venderId=' + $.venderId + '&code=6&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            await task('activityContent', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            if ($.activityContent.drawInfo.name.includes('京豆')) {
                $.log('-> 加入购物车');
                for (let _0x5eb768 in $.activityContent.cpvos) {
                    await $.wait(500);
                    await task('addCart', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin) + '&productId=' + $.activityContent.cpvos[_0x5eb768].skuId);
                }
                $.log('-> 抽奖');
                await $.wait(500);
                await task('getPrize', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            } else {
                $.log('未能成功获取到活动信息');
            }
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
async function addCartb() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', 'venderId=' + $.venderId + '&code=6&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            await task('activityContent', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            if ($.activityContent.drawInfo.name.includes('京豆')) {
                $.log('-> 加入购物车');
                for (let _0x2dd435 in $.activityContent.cpvos) {
                    await $.wait(500);
                    await task('addCart', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin) + '&productId=' + $.activityContent.cpvos[_0x2dd435].skuId);
                }
                $.log('-> 抽奖');
                await $.wait(500);
                await task('getPrize', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            } else {
                $.log('未能成功获取到活动信息');
            }
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
async function addCartc() {
    $.token = null;
    $.secretPin = null;
    $.venderId = null;
    await getFirstLZCK();
    await getToken();
    await task('customer/getSimpleActInfoVo', 'activityId=' + $.activityId, 1);
    if ($.token) {
        await getMyPing();
        if ($.secretPin) {
            await task('common/accessLogWithAD', 'venderId=' + $.venderId + '&code=6&pin=' + encodeURIComponent($.secretPin) + '&activityId=' + $.activityId + '&pageUrl=' + $.activityUrl + '&subType=app&adSource=tg_xuanFuTuBiao', 1);
            await task('activityContent', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            if ($.activityContent.drawInfo.name.includes('京豆')) {
                $.log('-> 加入购物车');
                for (let _0x2213cf in $.activityContent.cpvos) {
                    await $.wait(500);
                    await task('addCart', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin) + '&productId=' + $.activityContent.cpvos[_0x2213cf].skuId);
                }
                $.log('-> 抽奖');
                await $.wait(500);
                await task('getPrize', 'activityId=' + $.activityId + '&pin=' + encodeURIComponent($.secretPin));
            } else {
                $.log('未能成功获取到活动信息');
            }
        } else {
            $.log('没有成功获取到用户信息');
        }
    } else {
        $.log('没有成功获取到用户鉴权信息');
    }
}
function task(_0x50fd4b, _0x357533, _0x52e7bf = 0) {
    return new Promise(_0x38f5ff => {
        $.post(taskUrl(_0x50fd4b, _0x357533, _0x52e7bf), async (_0x3d3cc9, _0x41bbb0, _0x294529) => {
            try {
                if (_0x3d3cc9) {
                    $.log(_0x3d3cc9);
                } else {
                    if (_0x294529) {
                        _0x294529 = JSON.parse(_0x294529);
                        if (_0x41bbb0.headers['set-cookie']) {
                            cookie = originCookie + ';';
                            for (let _0x38d01f of _0x41bbb0.headers['set-cookie']) {
                                lz_cookie[_0x38d01f.split(';')[0].substr(0, _0x38d01f.split(';')[0].indexOf('='))] = _0x38d01f.split(';')[0].substr(_0x38d01f.split(';')[0].indexOf('=') + 1);
                            } for (const _0x2104bf of Object.keys(lz_cookie)) {
                                cookie += (_0x2104bf + '=' + lz_cookie[_0x2104bf] + ';');
                            }
                        } if (_0x294529.result) {
                            switch (_0x50fd4b) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = _0x294529.data.jdActivityId;
                                    $.venderId = _0x294529.data.venderId;
                                    $.activityShopId = _0x294529.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = _0x294529.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes('京豆');
                                    break;
                                case 'addCart':
                                    console.log(_0x294529.data);
                                    break;
                                case 'getPrize':
                                    console.log(_0x294529.data.name);
                                    $.getPrize = _0x294529.data.name;
                                    if (doPush === true) {
                                        if (_0x294529.data.name) {
                                            message += (_0x294529.data.name + ' ');
                                        }
                                    } else { }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x294529));
                                    break;
                            }
                        }
                    } else { }
                }
            } catch (_0xaaaed0) {
                $.log(_0xaaaed0);
            }
            finally {
                _0x38f5ff();
            }
        });
    });
}
function taska(_0x3a17f6, _0xe7eea7, _0xc9079d = 0) {
    return new Promise(_0x51c2a8 => {
        $.post(taskUrl(_0x3a17f6, _0xe7eea7, _0xc9079d), async (_0x485670, _0x2faaaf, _0x111ef6) => {
            try {
                if (_0x485670) {
                    $.log(_0x485670);
                } else {
                    if (_0x111ef6) {
                        _0x111ef6 = JSON.parse(_0x111ef6);
                        if (_0x2faaaf.headers['set-cookie']) {
                            cookie = originCookie + ';';
                            for (let _0x402fe1 of _0x2faaaf.headers['set-cookie']) {
                                lz_cookie[_0x402fe1.split(';')[0].substr(0, _0x402fe1.split(';')[0].indexOf('='))] = _0x402fe1.split(';')[0].substr(_0x402fe1.split(';')[0].indexOf('=') + 1);
                            } for (const _0x5a1393 of Object.keys(lz_cookie)) {
                                cookie += (_0x5a1393 + '=' + lz_cookie[_0x5a1393] + ';');
                            }
                        } if (_0x111ef6.result) {
                            switch (_0x3a17f6) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = _0x111ef6.data.jdActivityId;
                                    $.venderId = _0x111ef6.data.venderId;
                                    $.activityShopId = _0x111ef6.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = _0x111ef6.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes('京豆');
                                    break;
                                case 'addCart':
                                    console.log(_0x111ef6.data);
                                    break;
                                case 'getPrize':
                                    console.log(_0x111ef6.data.name);
                                    $.getPrize = _0x111ef6.data.name;
                                    if (doPush === true) {
                                        if (_0x111ef6.data.name) {
                                            message += (_0x111ef6.data.name + ' ');
                                        }
                                    } else { }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x111ef6));
                                    break;
                            }
                        }
                    } else { }
                }
            } catch (_0x1aa605) {
                $.log(_0x1aa605);
            }
            finally {
                _0x51c2a8();
            }
        });
    });
}
function taskb(_0x4f5b2d, _0xd75e6d, _0x3b44f2 = 0) {
    return new Promise(_0x17ae0a => {
        $.post(taskUrl(_0x4f5b2d, _0xd75e6d, _0x3b44f2), async (_0x59b10e, _0x15a80d, _0x4ae067) => {
            try {
                if (_0x59b10e) {
                    $.log(_0x59b10e);
                } else {
                    if (_0x4ae067) {
                        _0x4ae067 = JSON.parse(_0x4ae067);
                        if (_0x15a80d.headers['set-cookie']) {
                            cookie = originCookie + ';';
                            for (let _0x3059f7 of _0x15a80d.headers['set-cookie']) {
                                lz_cookie[_0x3059f7.split(';')[0].substr(0, _0x3059f7.split(';')[0].indexOf('='))] = _0x3059f7.split(';')[0].substr(_0x3059f7.split(';')[0].indexOf('=') + 1);
                            } for (const _0x5de748 of Object.keys(lz_cookie)) {
                                cookie += (_0x5de748 + '=' + lz_cookie[_0x5de748] + ';');
                            }
                        } if (_0x4ae067.result) {
                            switch (_0x4f5b2d) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = _0x4ae067.data.jdActivityId;
                                    $.venderId = _0x4ae067.data.venderId;
                                    $.activityShopId = _0x4ae067.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = _0x4ae067.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes('京豆');
                                    break;
                                case 'addCart':
                                    console.log(_0x4ae067.data);
                                    break;
                                case 'getPrize':
                                    console.log(_0x4ae067.data.name);
                                    $.getPrize = _0x4ae067.data.name;
                                    if (doPush === true) {
                                        if (_0x4ae067.data.name) {
                                            message += (_0x4ae067.data.name + ' ');
                                        }
                                    } else { }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x4ae067));
                                    break;
                            }
                        }
                    } else { }
                }
            } catch (_0x437932) {
                $.log(_0x437932);
            }
            finally {
                _0x17ae0a();
            }
        });
    });
}
function taskc(_0x488e87, _0x5064bd, _0x3d7ae8 = 0) {
    return new Promise(_0x2397e5 => {
        $.post(taskUrl(_0x488e87, _0x5064bd, _0x3d7ae8), async (_0x4cb8d7, _0x198e91, _0x91e930) => {
            try {
                if (_0x4cb8d7) {
                    $.log(_0x4cb8d7);
                } else {
                    if (_0x91e930) {
                        _0x91e930 = JSON.parse(_0x91e930);
                        if (_0x198e91.headers['set-cookie']) {
                            cookie = originCookie + ';';
                            for (let _0x125e28 of _0x198e91.headers['set-cookie']) {
                                lz_cookie[_0x125e28.split(';')[0].substr(0, _0x125e28.split(';')[0].indexOf('='))] = _0x125e28.split(';')[0].substr(_0x125e28.split(';')[0].indexOf('=') + 1);
                            } for (const _0x3bd2c9 of Object.keys(lz_cookie)) {
                                cookie += (_0x3bd2c9 + '=' + lz_cookie[_0x3bd2c9] + ';');
                            }
                        } if (_0x91e930.result) {
                            switch (_0x488e87) {
                                case 'customer/getSimpleActInfoVo':
                                    $.jdActivityId = _0x91e930.data.jdActivityId;
                                    $.venderId = _0x91e930.data.venderId;
                                    $.activityShopId = _0x91e930.data.venderId;
                                    break;
                                case 'activityContent':
                                    $.activityContent = _0x91e930.data;
                                    $.drawInfoName = $.activityContent.drawInfo.name.includes('京豆');
                                    break;
                                case 'addCart':
                                    console.log(_0x91e930.data);
                                    break;
                                case 'getPrize':
                                    console.log(_0x91e930.data.name);
                                    $.getPrize = _0x91e930.data.name;
                                    if (doPush === true) {
                                        if (_0x91e930.data.name) {
                                            message += (_0x91e930.data.name + ' ');
                                        }
                                    } else { }
                                    break;
                                default:
                                    $.log(JSON.stringify(_0x91e930));
                                    break;
                            }
                        }
                    } else { }
                }
            } catch (_0x256fb7) {
                $.log(_0x256fb7);
            }
            finally {
                _0x2397e5();
            }
        });
    });
}
function taskUrl(_0x240e67, _0x2a0afe, _0x30f585) {
    return {
        'url': _0x30f585 ? 'https://lzkj-isv.isvjcloud.com/' + _0x240e67 : 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/' + _0x240e67, 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.comm', 'User-Agent': 'jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x2a0afe
    };
}
function taskUrla(_0x24fb46, _0x4e6a5e, _0x27bc72) {
    return {
        'url': _0x27bc72 ? 'https://lzkj-isv.isvjcloud.com/' + _0x24fb46 : 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/' + _0x24fb46, 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.comm', 'User-Agent': 'jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x4e6a5e
    };
}
function taskUrlb(_0x181a07, _0x161589, _0x4c6c0b) {
    return {
        'url': _0x4c6c0b ? 'https://lzkj-isv.isvjcloud.com/' + _0x181a07 : 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/' + _0x181a07, 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.comm', 'User-Agent': 'jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x161589
    };
}
function taskUrlc(_0x41c61a, _0x12b737, _0x1d4a83) {
    return {
        'url': _0x1d4a83 ? 'https://lzkj-isv.isvjcloud.com/' + _0x41c61a : 'https://lzkj-isv.isvjcloud.com/wxCollectionActivity/' + _0x41c61a, 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.comm', 'User-Agent': 'jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': _0x12b737
    };
}
function getMyPing() {
    let _0x190cc5 = { 'url': 'https://lzkj-isv.isvjcloud.com/customer/getMyPing', 'headers': { 'Host': 'lzkj-isv.isvjcloud.com', 'Accept': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'Accept-Language': 'zh-cn', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded', 'Origin': 'https://lzkj-isv.isvjcloud.com', 'User-Agent': 'jdapp;iPhone;9.5.4;13.6;' + $.UUID + ';network/wifi;ADID/' + $.ADID + ';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1', 'Connection': 'keep-alive', 'Referer': $.activityUrl, 'Cookie': cookie }, 'body': 'userId=' + $.activityShopId + '&token=' + $.token + '&fromType=APP&riskType=1' };
    return new Promise(_0x21a9c9 => {
        $.post(_0x190cc5, (_0x1e34b3, _0x27b181, _0x16c908) => {
            try {
                if (_0x1e34b3) {
                    $.log(_0x1e34b3);
                } else {
                    if (_0x27b181.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x31aa10 of _0x27b181.headers['set-cookie']) {
                            lz_cookie[_0x31aa10.split(';')[0].substr(0, _0x31aa10.split(';')[0].indexOf('='))] = _0x31aa10.split(';')[0].substr(_0x31aa10.split(';')[0].indexOf('=') + 1);
                        } for (const _0x13bd0f of Object.keys(lz_cookie)) {
                            cookie += (_0x13bd0f + '=' + lz_cookie[_0x13bd0f] + ';');
                        }
                    }
                    if (_0x16c908) {
                        _0x16c908 = JSON.parse(_0x16c908);
                        if (_0x16c908.result) {
                            $.log('你好：' + _0x16c908.data.nickname);
                            $.pin = _0x16c908.data.nickname;
                            $.secretPin = _0x16c908.data.secretPin;
                        } else {
                            $.log(_0x16c908.errorMessage);
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x2423f0) {
                $.log(_0x2423f0);
            }
            finally {
                _0x21a9c9();
            }
        });
    });
}
function getFirstLZCK() {
    return new Promise(_0x1ed9c7 => {
        $.get({ 'url': $.activityUrl, 'headers': { 'user-agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1' } }, (_0x2d272c, _0x465f92, _0x400577) => {
            try {
                if (_0x2d272c) {
                    console.log(_0x2d272c);
                } else {
                    if (_0x465f92.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x407071 of _0x465f92.headers['set-cookie']) {
                            lz_cookie[_0x407071.split(';')[0].substr(0, _0x407071.split(';')[0].indexOf('='))] = _0x407071.split(';')[0].substr(_0x407071.split(';')[0].indexOf('=') + 1);
                        } for (const _0x26e940 of Object.keys(lz_cookie)) {
                            cookie += (_0x26e940 + '=' + lz_cookie[_0x26e940] + ';');
                        }
                    }
                }
            } catch (_0x50a4e0) {
                console.log(_0x50a4e0);
            }
            finally {
                _0x1ed9c7();
            }
        });
    });
}
function getFirstLZCKa() {
    return new Promise(_0x33b1bd => {
        $.get({ 'url': $.activityUrl, 'headers': { 'user-agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1' } }, (_0x520437, _0x1f8962, _0x1ef496) => {
            try {
                if (_0x520437) {
                    console.log(_0x520437);
                } else {
                    if (_0x1f8962.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x432f4f of _0x1f8962.headers['set-cookie']) {
                            lz_cookie[_0x432f4f.split(';')[0].substr(0, _0x432f4f.split(';')[0].indexOf('='))] = _0x432f4f.split(';')[0].substr(_0x432f4f.split(';')[0].indexOf('=') + 1);
                        } for (const _0x2ede93 of Object.keys(lz_cookie)) {
                            cookie += (_0x2ede93 + '=' + lz_cookie[_0x2ede93] + ';');
                        }
                    }
                }
            } catch (_0xde0414) {
                console.log(_0xde0414);
            }
            finally {
                _0x33b1bd();
            }
        });
    });
}
function getFirstLZCKb() {
    return new Promise(_0x60f57a => {
        $.get({ 'url': $.activityUrl, 'headers': { 'user-agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1' } }, (_0x56ab37, _0x2056ef, _0x455a22) => {
            try {
                if (_0x56ab37) {
                    console.log(_0x56ab37);
                } else {
                    if (_0x2056ef.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x1c610f of _0x2056ef.headers['set-cookie']) {
                            lz_cookie[_0x1c610f.split(';')[0].substr(0, _0x1c610f.split(';')[0].indexOf('='))] = _0x1c610f.split(';')[0].substr(_0x1c610f.split(';')[0].indexOf('=') + 1);
                        } for (const _0x26bef7 of Object.keys(lz_cookie)) {
                            cookie += (_0x26bef7 + '=' + lz_cookie[_0x26bef7] + ';');
                        }
                    }
                }
            } catch (_0x22ad6f) {
                console.log(_0x22ad6f);
            }
            finally {
                _0x60f57a();
            }
        });
    });
}
function getFirstLZCKc() {
    return new Promise(_0x47f755 => {
        $.get({ 'url': $.activityUrl, 'headers': { 'user-agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1' } }, (_0x38b379, _0x48d04d, _0x825206) => {
            try {
                if (_0x38b379) {
                    console.log(_0x38b379);
                } else {
                    if (_0x48d04d.headers['set-cookie']) {
                        cookie = originCookie + ';';
                        for (let _0x2bf74f of _0x48d04d.headers['set-cookie']) {
                            lz_cookie[_0x2bf74f.split(';')[0].substr(0, _0x2bf74f.split(';')[0].indexOf('='))] = _0x2bf74f.split(';')[0].substr(_0x2bf74f.split(';')[0].indexOf('=') + 1);
                        } for (const _0x177c0e of Object.keys(lz_cookie)) {
                            cookie += (_0x177c0e + '=' + lz_cookie[_0x177c0e] + ';');
                        }
                    }
                }
            } catch (_0x55957d) {
                console.log(_0x55957d);
            }
            finally {
                _0x47f755();
            }
        });
    });
}
function getToken() {
    let _0x6806e5 = { 'url': 'https://api.m.jd.com/client.action?functionId=isvObfuscator', 'headers': { 'Host': 'api.m.jd.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': cookie, 'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)', 'Accept-Language': 'zh-Hans-CN;q=1', 'Accept-Encoding': 'gzip, deflate, br' }, 'body': 'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988' };
    return new Promise(_0x78c131 => {
        $.post(_0x6806e5, (_0xda1327, _0x4b4bdd, _0x76719f) => {
            try {
                if (_0xda1327) {
                    $.log(_0xda1327);
                } else {
                    if (_0x76719f) {
                        _0x76719f = JSON.parse(_0x76719f);
                        if (_0x76719f.code === '0') {
                            $.token = _0x76719f.token;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x6e9f67) {
                $.log(_0x6e9f67);
            }
            finally {
                _0x78c131();
            }
        });
    });
}
function random(_0x322e44, _0x34896d) {
    return Math.floor(Math.random() * _0x34896d - _0x322e44) + _0x322e44;
}
function strToJson(_0x2c4d7a) {
    var _0x3d0e24 = eval('(' + _0x2c4d7a + ')');
    return _0x3d0e24;
}
function requireConfig() {
    return new Promise(_0x5d46f5 => {
        if ($.isNode() && process.env.JD_CART) {
            if (process.env.JD_CART_KEYWORDS) {
                $.keywords = process.env.JD_CART_KEYWORDS.split('@');
            }
        }
        _0x5d46f5();
    });
}
function getCart_xh() {
    console.log('正在获取购物车数据...');
    return new Promise(_0x2227c0 => {
        const _0x288c55 = { 'url': 'https://p.m.jd.com/cart/cart.action?fromnav=1&sceneval=2', 'headers': { 'Cookie': cookie, 'User-Agent': 'jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)' } };
        $.get(_0x288c55, async (_0x249840, _0x41cdf8, _0x12dd94) => {
            try {
                var _0x412e0a = '6|1|3|2|5|4|0'.split('|'), _0x2eb6d1 = 0;
                while (true) {
                    switch (_0x412e0a[_0x2eb6d1++]) {
                        case '0':
                            console.log('获取到购物车数据 ' + $.beforeRemove + ' 条');
                            continue;
                        case '1':
                            $.areaId = _0x12dd94.areaId;
                            continue;
                        case '2':
                            venderCart = _0x12dd94.cart.venderCart;
                            continue;
                        case '3':
                            $.traceId = _0x12dd94.traceId;
                            continue;
                        case '4':
                            $.beforeRemove = _0x12dd94.cartJson.num;
                            continue;
                        case '5':
                            postBody = 'pingouchannel=0&commlist=';
                            continue;
                        case '6':
                            _0x12dd94 = strToJson(getSubstr(_0x12dd94, 'window.cartData = ', 'window._PFM_TIMING'));
                            continue;
                    }
                    break;
                }
            } catch (_0x101a7f) {
                $.logErr(_0x101a7f, _0x41cdf8);
            }
            finally {
                _0x2227c0(_0x12dd94);
            }
        });
    });
}
function cartFilter_xh(_0x1720d3) {
    console.log('正在整理数据...');
    let _0x4c2568;
    $.pushed = 0;
    for (let _0x1a9103 of _0x1720d3) {
        if ($.pushed === removeSize) break;
        for (let _0x3da3fd of _0x1a9103.sortedItems) {
            if ($.pushed === removeSize) break;
            _0x4c2568 = (typeof _0x3da3fd.polyItem.promotion !== 'undefined') ? _0x3da3fd.polyItem.promotion.pid : '';
            for (let _0x1a8e41 of _0x3da3fd.polyItem.products) {
                if ($.pushed === removeSize) break;
                let _0x16d4d1 = _0x1a8e41.mainSku.name;
                $.isKeyword = false;
                $.isPush = true;
                for (let _0x466c2d of $.keywords) {
                    if (_0x16d4d1.indexOf(_0x466c2d) !== -1) {
                        $.keywordsNum += 1;
                        $.isPush = false;
                        $.keyword = _0x466c2d;
                        break;
                    } else $.isPush = true;
                } if ($.isPush) {
                    let _0x465ffb = _0x1a8e41.skuUuid;
                    let _0x21798b = _0x1a8e41.mainSku['id'];
                    if (_0x4c2568 === '') postBody += _0x21798b + ',,1,' + _0x21798b + ',1,,0,skuUuid:' + _0x465ffb + '@@useUuid:0$'; else postBody += _0x21798b + ',,1,' + _0x21798b + ',11,' + _0x4c2568 + ',0,skuUuid:' + _0x465ffb + '@@useUuid:0$';
                    $.pushed += 1;
                } else {
                    console.log('\n' + _0x16d4d1);
                    console.log('商品已被过滤，原因：包含关键字 ' + $.keyword);
                    $.isKeyword = true;
                }
            }
        }
    }
    postBody += '&type=0&checked=0&locationid=' + $.areaId + '&templete=1&reg=1&scene=0&version=20190418&traceid=' + $.traceId + '&tabMenuType=1&sceneval=2';
}
function removeCart() {
    console.log('正在删除购物车数据...');
    return new Promise(_0x58912d => {
        const _0x1a91e0 = { 'url': 'https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax', 'body': postBody, 'headers': { 'Cookie': cookie, 'User-Agent': 'jdapp;JD4iPhone/167724 (iPhone; iOS 15.0; Scale/3.00)', 'referer': 'https://p.m.jd.com/', 'origin': 'https://p.m.jd.com/' } };
        $.post(_0x1a91e0, async (_0x204db9, _0x3de8f7, _0x225833) => {
            try {
                _0x225833 = JSON.parse(_0x225833);
                $.afterRemove = _0x225833.cartJson.num;
                if ($.afterRemove < $.beforeRemove) {
                    console.log('删除成功，当前购物车剩余数据 ' + $.afterRemove + ' 条\n');
                    $.beforeRemove = $.afterRemove;
                } else {
                    console.log('删除失败');
                    console.log(_0x225833.errMsg);
                    isRemoveAll = false;
                }
            } catch (_0x35cc30) {
                $.logErr(_0x35cc30, _0x3de8f7);
            }
            finally {
                _0x58912d(_0x225833);
            }
        });
    });
}
function getSubstr(_0x95236b, _0x41f1d0, _0x231a4d) {
    let _0x380adc = _0x95236b.indexOf(_0x41f1d0);
    let _0x439a0c = _0x95236b.indexOf(_0x231a4d, _0x380adc);
    if ((_0x380adc < 0) || (_0x439a0c < _0x380adc)) return '';
    return _0x95236b.substring(_0x380adc + _0x41f1d0.length, _0x439a0c);
}
function getActivityIdList(_0x7a715d) {
    return new Promise(_0x16aa7b => {
        const _0x5c8673 = { 'url': _0x7a715d + '?' + new Date(), 'timeout': 10000, 'headers': { 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88' } };
        $.get(_0x5c8673, async (_0x4766b6, _0x44d296, _0x5af537) => {
            try {
                if (_0x4766b6) {
                    $.log(_0x4766b6);
                } else {
                    if (_0x5af537) _0x5af537 = JSON.parse(_0x5af537);
                }
            } catch (_0x1c7200) {
                $.logErr(_0x1c7200, _0x44d296);
            }
            finally {
                _0x16aa7b(_0x5af537);
            }
        });
    });
}
function getUUID(_0x156b0f = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x83ee09 = 0) {
    return _0x156b0f.replace(/[xy]/g, function (_0x46407b) {
        var _0x3c1f6a = (Math.random() * 0x10 | 0x0), _0x2625e4 = (_0x46407b == 'x') ? _0x3c1f6a : (_0x3c1f6a & 0x3 | 0x8);
        if (_0x83ee09) {
            uuid = _0x2625e4.toString(36).toUpperCase();
        } else {
            uuid = _0x2625e4.toString(36);
        }
        return uuid;
    });
}
function checkCookie() {
    const _0x47d9b6 = { 'url': 'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion', 'headers': { 'Host': 'me-api.jd.com', 'Accept': '*/*', 'Connection': 'keep-alive', 'Cookie': cookie, 'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1', 'Accept-Language': 'zh-cn', 'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&', 'Accept-Encoding': 'gzip, deflate, br' } };
    return new Promise(_0x20eb39 => {
        $.get(_0x47d9b6, (_0x1ea487, _0x7a110f, _0x43beec) => {
            try {
                if (_0x1ea487) {
                    $.logErr(_0x1ea487);
                } else {
                    if (_0x43beec) {
                        _0x43beec = JSON.parse(_0x43beec);
                        if (_0x43beec.retcode === '1001') {
                            $.isLogin = false;
                            return;
                        } if ((_0x43beec.retcode === '0') && _0x43beec.data.hasOwnProperty('userInfo')) {
                            $.nickName = _0x43beec.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        $.log('京东返回了空数据');
                    }
                }
            } catch (_0x4e3d1e) {
                $.logErr(_0x4e3d1e);
            }
            finally {
                _0x20eb39();
            }
        });
    });
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
