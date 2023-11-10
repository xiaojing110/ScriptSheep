/*
10.28-11.12 签到瓜分京豆
————————————————

无助力  更新瓜分    差不多10豆的样子

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#10.28-11.12 签到瓜分京豆
1 1 1 1 * jd_dlgf.js, tag=10.28-11.12 签到瓜分京豆, enabled=true

*/

const $ = new Env('10.28-11.12 签到瓜分京豆');
const ll1lIl = $.isNode() ? require('./jdCookie.js') : '',
    I1IIl1 = $.isNode() ? require('./sendNotify') : '';
CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
const l1I1l1 = require('./function/krgetToken'),
    ll1lIi = require('./function/krh5st'),
    lIi1i = require('./function/jdCommon');
let iIIIil = 'https://mpdz-act-dz.isvjcloud.com',
    Ii1Ii1 = 'false',
    IIll1I = [],
    liii1I = '';
if ($.isNode()) {
    Object.keys(ll1lIl).forEach(iIIIl1 => {
        IIll1I.push(ll1lIl[iIIIl1]);
    });
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else IIll1I = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...liii1i($.getdata('CookiesJD') || '[]').map(li11iI => li11iI.cookie)].filter(liliIl => !!liliIl);
Ii1Ii1 = $.isNode() ? process.env.opencard_toShop ? process.env.opencard_toShop : '' + Ii1Ii1 : $.getdata('opencard_toShop') ? $.getdata('opencard_toShop') : '' + Ii1Ii1, $.exchangePostawardId = process.env.jd_zqyb_exchangeid ? process.env.jd_zqyb_exchangeid : 'e3c9834ac90b46ba8060d3ad40fd5708';
let lI1iIi = '30';
lI1iIi = $.isNode() ? process.env.retrynum ? process.env.retrynum : lI1iIi : $.getdata('retrynum') ? $.getdata('retrynum') : lI1iIi;
const lIi1l = process.env.JD_PROXY_TUNNRL,
    iIIIii = process.env.MPDZ_WAIT || '2';
let li11ii = '0';
li11ii = $.isNode() ? process.env.jd_mpdz_draw ? process.env.jd_mpdz_draw : li11ii : $.getdata('jd_mpdz_draw') ? $.getdata('jd_mpdz_draw') : li11ii;
let I1iiIi = parseInt(iIIIii) * 0x3e8;
lIi1l && (I1iiIi = 0x64);
allMessage = '', message = '';
let li1i1 = '';
$.hotFlag = false, $.outFlag = false, $.activityEnd = false;
let I1iiIl = '',
    liliII = '';
;
!(async () => {
    if (!IIll1I[0x0]) {
        $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
            'open-url': 'https://bean.m.jd.com/'
        });
        return;
    }
    process.env.jd_jinggeng_address ? UserAdd_Data_Arr = process.env.jd_jinggeng_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : '';
    if (UserAdd_Data_Arr && UserAdd_Data_Arr != '') {
        let li1iI = [];
        li1iI = UserAdd_Data_Arr.split('|');
        var I1iiII = Math.floor(Math.random() * li1iI.length);
        if (li1iI[I1iiII] == '') {
            console.log('随机抽取到的收货地址信息为空，请正确使用 "|" 管道符以用于分割多个收货地址！');
            return;
        } else li1iI = li1iI[I1iiII];
        if (process.env.jd_jinggeng_address) {
            li1iI = li1iI.split('@');
            if (li1iI.length != 0x6) {
                console.log('随机抽取到的收货地址信息格式存在错误（参数不足或过多）');
                return;
            }
            for (let ll1lI1 = 0x0; ll1lI1 < 0x6; ll1lI1++) {
                if (li1iI[ll1lI1] == '') {
                    console.log('随机抽取到的收货地址信息格式存在错误（参数不能为空）');
                    return;
                }
            }
        } else {
            li1iI = li1iI.split('@');
            if (li1iI.length != 0x8) {
                console.log('随机抽取到的收货地址信息格式存在错误（参数不足或过多）');
                return;
            }
            for (let liii11 = 0x0; liii11 < 0x7; liii11++) {
                if (li1iI[liii11] == '') {
                    console.log('随机抽取到的收货地址信息格式存在错误（参数不能为空）');
                    return;
                }
            }
        }
        $.receiver = li1iI[0x0], $.phone = li1iI[0x1], $.province = li1iI[0x2], $.city = li1iI[0x3], $.county = li1iI[0x4], $.address = li1iI[0x5];
    }
    authorCodeList = await lI1iII('http://code.kingran.cf/dplh.json');
    if (authorCodeList) console.log('❖ 测试连通性中...\n❖ 服务状态正常...\n'), $.authorCode = li1i1 ? li1i1 : authorCodeList[IIll1l(0x0, authorCodeList.length)]; else {
        let Il1I11 = ['F4eV+FtcEdTNOCLwmRgOEl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==', 'vThkfQk2CxFps0RdT0r7tl4tLNYA4seuA67MOIYQxEk3Vl9+AVo4NF+tgyeIc6A6kdK3rLBQpEQH9V4tdrrh0w==', 'k1Nobb+P0er+C2sysxnx/P2KELO9izRVpwCyqu0eqVZ5aW7RHzlMobrzJ/e9r/uf'];
        $.authorCode = li1i1 ? li1i1 : Il1I11[IIll1l(0x0, Il1I11.length)], console.log('❖ 准备就绪...\n');
    }
    $.appkey = '8bd7eeb6c96e4145864af794bb2cadd0', $.userId = '10299171', $.actId = 'jdGeLiKongTiao231111', $.MixNicks = '', $.inviteNick = $.authorCode;
    for (let lIl1II = 0x0; lIl1II < IIll1I.length; lIl1II++) {
        liii1I = IIll1I[lIl1II], $.ownCookie = IIll1I[lIl1II];
        if (liii1I) {
            $.UserName = decodeURIComponent(liii1I.match(/pt_pin=([^; ]+)(?=;?)/) && liii1I.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]), $.index = lIl1II + 0x1, message = '', $.bean = 0x0, $.hotFlag = false, $.nickName = '', console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), $.UA = lIi1i.genUA($.UserName), await lI1iIl();
            if ($.outFlag || $.activityEnd) break;
            await $.wait(I1iiIi);
        }
    }
    if ($.outFlag) {
        let Ii1Ili = '此ip已被限制，请过10分钟后再执行脚本';
        $.msg($.name, '', '' + Ii1Ili);
        if ($.isNode()) await I1IIl1.sendNotify('' + $.name, '' + Ii1Ili);
    }
})().catch(IIiI11 => $.logErr(IIiI11)).finally(() => $.done());
async function lI1iIl() {
    try {
        $.hasEnd = true, $.endTime = 0x0, I1iiIl = '', $.Token = '', $.Pin = '', $.MixNick = '';
        let iII111 = false;
        if ($.activityEnd) return;
        if ($.outFlag) {
            console.log('此ip已被限制，请过10分钟后再执行脚本\n');
            return;
        }
        $.Token = await l1I1l1(liii1I, iIIIil);
        if (!$.Token) for (let Ili1ii = 0x0; Ili1ii < 0x3; Ili1ii++) {
            lIi1l && (console.log('Token没有成功获取，重试中'), $.Token = await l1I1l1(liii1I, iIIIil), $.Token && ($.flag = true));
            if ($.flag) break;
        }
        if ($.Token == '') {
            console.log('获取[token]失败！');
            return;
        }
        await iIiiII('activity_load');
        if ($.hotFlag) return;
        if ($.MixNick == '') {
            console.log('获取cookie失败');
            return;
        }
        $.toBind = 0x0, $.openLists = [0x3b9ad775], await iIiiII('绑定'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa)), await iIiiII('completeState');
        for (let IiIili = 0x0; IiIili < $.renwulists.length; IiIili++) {
            $.missionType = $.renwulists[IiIili].type;
            if (!$.renwulists[IiIili].isComplete) switch ($.missionType) {
                case 'buyHotProducts':
                case 'payTrade':
                    break;
                case 'openCard':
                    for (let llIiil = 0x0; llIiil < $.openLists.length; llIiil++) {
                        $.missionType = 'openCard', $.open = false, $.joinVenderId = $.openLists[llIiil], await iIiiII('kaika'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                        if ($.open == false) {
                            $.errorJoinShop = '', await IIll1i(), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                            if ($.errorJoinShop.indexOf('您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑') > -0x1) {
                                break;
                            }
                            $.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -0x1 && (console.log('😤 呜呜呜，重试开卡'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa)), await IIll1i(), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa)));
                            if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -0x1) {
                                console.log('💔 无法开卡,跳过运行');
                                break;
                            }
                            await iIiiII('activity_load'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                        }
                    }
                    break;
                case 'uniteAddCart':
                    for (let iIIlIl = 0x0; iIIlIl < 0x1; iIIlIl++) {
                        $.missionType = 'uniteAddCart', await iIiiII('mission'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                case 'specialSignGeLi':
                    for (let iilIll = 0x0; iilIll < 0x1; iilIll++) {
                        $.missionType = 'specialSignGeLi', await iIiiII('mission'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                case 'collectShop':
                    for (let iilIli = 0x0; iilIli < 0x1; iilIli++) {
                        $.missionType = 'collectShop', await iIiiII('mission'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                case 'viewOneHuiChang':
                    for (let IlIi1I = 0x0; IlIi1I < 0x1; IlIi1I++) {
                        $.missionType = 'viewOneHuiChang', await iIiiII('mission'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                case 'viewCommodity':
                    for (let llIiiI = 0x0; llIiiI < 0x1; llIiiI++) {
                        $.missionType = 'viewCommodity', $.goodsNumId = $.renwulists[IiIili].linkUrl, await iIiiII('mission1'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                case 'shareAct':
                    for (let IiIilI = 0x0; IiIilI < 0x1; IiIilI++) {
                        $.missionType = 'shareAct', await iIiiII('绑定'), await $.wait(parseInt(I1iiIi * 0x1 + 0x1f4, 0xa));
                    }
                    break;
                default:
                    await $.wait(0x3e8);
            }
        }
        await iIiiII('activity_load'), console.log('\n当前积分：' + $.remainPoint + '\n'), await iIiiII('unlockLoad');
        for (let lIiIl1 = 0x0; lIiIl1 < $.cusUnlockSettings.length; lIiIl1++) {
            $.cusUnlockSettings[lIiIl1].unlockType && ($.unlockId = $.cusUnlockSettings[lIiIl1].id, await iIiiII('unlockCarveUp'), await $.wait(0xbb8));
        }
        $.index == 0x1 && ($.inviteNick = $.MixNick, console.log('后面的号都会助力:' + $.inviteNick));
    } catch (iilIl1) {
        console.log(iilIl1);
    }
}
async function iIiiII(l1II1) {
    if ($.outFlag) return;
    let IlI1 = 'https://mpdz-act-dz.isvjcloud.com',
        I1IlIl = '',
        l1I1i1 = 'POST',
        I1IlIi = '';
    switch (l1II1) {
        case 'activity_load':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/activity/load?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {
                'jdToken': $.Token,
                'inviteNick': $.inviteNick || '',
                'userId': '10299171'
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/activity/load', I1IlIi);
            break;
        case 'mission':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {
                'missionType': $.missionType,
                'inviterNick': $.inviteNick || '',
                'shopId': '1000003445'
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/mission/completeMission', I1IlIi);
            break;
        case 'mission1':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {
                'missionType': $.missionType,
                'inviterNick': $.inviteNick || '',
                'shopId': '1000003445',
                'goodsNumId': '' + $.goodsNumId
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/mission/completeMission', I1IlIi);
            break;
        case '绑定':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/customer/inviteRelation?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {
                'inviterNick': $.inviteNick || ''
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/customer/inviteRelation', I1IlIi);
            break;
        case 'kaika':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/mission/completeMission?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {
                'missionType': $.missionType,
                'shopId': '1000003445',
                'userId': '10299171',
                'inviterNick': $.inviteNick || ''
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/mission/completeMission', I1IlIi);
            break;
        case 'completeState':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/mission/completeState?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&bizExtString=&user_id=10299171', I1IlIi = {}, I1IlIl = iIIIlI('/jdGeLiKongTiao/mission/completeState', I1IlIi);
            break;
        case '抽奖':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/interactive/drawPost?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || ''), I1IlIi = {
                'dataType': 'draw'
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/interactive/drawPost', I1IlIi);
            break;
        case 'updateAddress':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/awards/updateAddress?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || '') + '&user_id=10299171', I1IlIi = {
                'receiverName': $.receiver,
                'receiverMobile': $.phone,
                'receiverProvince': $.province,
                'receiverCity': $.city,
                'receiverDistrict': $.county,
                'receiverAddress': $.address,
                'logId': $.actLogId
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/awards/updateAddress', I1IlIi);
            break;
        case 'getAwardSettingList':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/awards/getAwardSettingList?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || ''), I1IlIi = {
                'dataType': 'exchange'
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/awards/getAwardSettingList', I1IlIi);
            break;
        case 'unlockLoad':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/valueUnlockLoad/unlockLoad?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || ''), I1IlIi = {}, I1IlIl = iIIIlI('/jdGeLiKongTiao/valueUnlockLoad/unlockLoad', I1IlIi);
            break;
        case 'unlockCarveUp':
            url = IlI1 + '/dm/front/jdGeLiKongTiao/valueUnlockCarveUp/unlockCarveUp?open_id=&mix_nick=' + ($.MixNick || $.MixNicks || ''), I1IlIi = {
                'unlockId': $.unlockId
            }, I1IlIl = iIIIlI('/jdGeLiKongTiao/valueUnlock/unlockCarveUp', I1IlIi);
            break;
        default:
            console.log('错误' + l1II1);
    }
    let l1ll1i = I1IIii(url, I1IlIl, l1I1i1);
    l1I1i1 === 'GET' && (delete l1ll1i.body, delete l1ll1i['Content-Type']);
    const IiIil1 = lI1iIi;
    let i111l = 0x0,
        lIiIlI = null,
        iilIlI = false;
    while (i111l < IiIil1) {
        i111l > 0x0 && (await $.wait(0x3e8));
        const {
            err: IIi1,
            res: illl1i,
            data: l1iiii
        } = await ilIll1(l1ll1i, l1I1i1);
        if (IIi1) {
            if (typeof IIi1 === 'string' && IIi1.includes('Timeout awaiting \'request\'')) lIiIlI = l1II1 + ' 请求超时，请检查网络重试'; else {
                const illl1l = illl1i?.['statusCode'];
                if (illl1l) {
                    if ([0x193, 0x1ed].includes(illl1l)) lIiIlI = l1II1 + ' 请求失败，IP被限制（Response code ' + illl1l + '）', iilIlI = true; else[0x190, 0x194].includes(illl1l) ? lIiIlI = l1II1 + ' 请求配置参数错误，请联系开发者进行反馈（Response code ' + illl1l + '）' : lIiIlI = l1II1 + ' 请求失败（Response code ' + illl1l + '）';
                } else lIiIlI = l1II1 + ' 请求失败 => ' + (IIi1.message || IIi1);
            }
            i111l++;
        } else {
            const IiIIi = lIi1i.getResponseCookie(illl1i),
                li1lli = false;
            if (li1lli) {
                console.log('\n---------------------------------------------------\n');
                console.log('🔧 ' + l1II1 + ' 响应Body => ' + (l1iiii || '无') + '\n');
                console.log('🔧 ' + l1II1 + ' 响应Cookie => ' + (IiIIi || '无') + '\n');
                console.log('🔧 ' + l1II1 + ' 请求参数');
                console.log(requestOptions);
                console.log('\n---------------------------------------------------\n');
            }
            if (!['accessLog', 'accessLogWithAD'].includes(l1II1)) {
                try {
                    const l1ili = JSON.parse(l1iiii);
                    I1IIil(l1II1, l1ili);
                    break;
                } catch (i1Ii11) {
                    lIiIlI = '❌ ' + l1II1 + ' 接口响应数据解析失败: ' + i1Ii11.message, console.log('🚫 ' + l1II1 + ' => ' + String(l1iiii || '无响应数据')), li1lli && (console.log('\n---------------------------------------------------\n'), console.log('\n---------------------------------------------------\n')), i111l++;
                }
            } else break;
            iilIlI = false;
        }
    }
    i111l >= IiIil1 && (console.log(lIiIlI), iilIlI && !hotbreak && ($.outFlag = true));
}
async function ilIll1(l1iili, illIIi = 'POST') {
    if (illIIi === 'POST') return new Promise(async I1i11 => {
        $.post(l1iili, (llIiIi, IIil, IIii) => {
            I1i11({
                'err': llIiIi,
                'res': IIil,
                'data': IIii
            });
        });
    }); else {
        if (illIIi === 'GET') return new Promise(async llIiIl => {
            $.get(l1iili, (I1i1i, lIi1II, iiiIii) => {
                llIiIl({
                    'err': I1i1i,
                    'res': lIi1II,
                    'data': iiiIii
                });
            });
        }); else {
            const IllI1 = '不支持的请求方法';
            return {
                'err': IllI1,
                'res': null,
                'data': null
            };
        }
    }
}
async function I1IIil(iiiIil, lilll) {
    try {
        let i11l1l = '';
        switch (iiiIil) {
            case 'completeState':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) lilll.data.status && lilll.data.status == 0xc8 && ($.renwulists = lilll.data.data || []); else {
                        if (lilll.message) {
                            console.log('' + (lilll.message || ''));
                        } else {
                            console.log(data);
                        }
                    }
                } else console.log(data);
                break;
            case '抽奖':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) {
                            if (lilll.data.data.sendResult) console.log('抽中：' + lilll.data.data.awardSetting.awardName), lilll.data.data.awardSetting.awardType == 'goods' && process.env.jd_jinggeng_address && ($.actLogId = lilll.data.data.awardSendLog.id, console.log('抽中实物啦，奖品领取ID：' + $.actLogId), await iIiiII('updateAddress'), await $.wait(0xfa0)); else !lilll.data.data.result ? console.log('💔 空气') : console.log(lilll.data.data);
                        } else lilll.data.status && lilll.data.status == 0x1f4 && console.log('' + (lilll.data.msg || ''));
                    } else lilll.message ? console.log('' + (lilll.message || '')) : console.log(data);
                } else console.log(data);
                break;
            case 'getAwardSettingList':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) lilll.data.status && lilll.data.status == 0xc8 && ($.getAwardSettingList = lilll.data.data.awardSettings || []); else lilll.errorMessage ? console.log('' + (lilll.errorMessage || '')) : console.log(data);
                } else console.log(data);
                break;
            case 'unlockLoad':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) {
                            $.cusUnlockSettings = lilll.data.data.cusUnlockSettings || [];
                        }
                    } else lilll.errorMessage ? console.log('' + (lilll.errorMessage || '')) : console.log(data);
                } else console.log(data);
                break;
            case 'unlockCarveUp':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) console.log('瓜分获得：' + (lilll.data.data.awardSetting.awardName || '')); else lilll.data.status && lilll.data.status == 0x1f4 && console.log('' + (lilll.data.msg || ''));
                    } else lilll.errorMessage ? console.log('' + (lilll.errorMessage || '')) : console.log(data);
                } else console.log(data);
                break;
            case 'exchangePost':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) {
                            if (lilll.data.data.sendResult) {
                                console.log('兑换成功，获得：' + lilll.data.data.awardSetting.awardName);
                                if (lilll.data.data.awardSetting.awardType == 'goods') {
                                    if (process.env.jd_jinggeng_address) {
                                        $.actLogId = lilll.data.data.awardSendLog.id, console.log('兑换实物成功，奖品领取ID：' + $.actLogId), await iIiiII('updateAddress'), await $.wait(0xfa0);
                                    }
                                }
                            } else {
                                if (!lilll.data.data.result) {
                                    console.log('兑换成功，💔 空气 （只能兑换一次）');
                                } else console.log(lilll.data.data);
                            }
                        } else {
                            if (lilll.data.status && lilll.data.status == 0x1f4) {
                                console.log('' + (lilll.data.msg || ''));
                            }
                        }
                    } else {
                        if (lilll.message) console.log('' + (lilll.message || '')); else {
                            console.log(data);
                        }
                    }
                } else console.log(data);
                break;
            case 'updateAddress':
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) lilll.data.data.result ? console.log('地址填写成功，返回：' + lilll.data.data.msg) : console.log(lilll.data.data); else lilll.data.status && lilll.data.status == 0x1f4 && console.log('' + (lilll.data.msg || ''));
                    } else lilll.message ? console.log('' + (lilll.message || '')) : console.log(data);
                } else {
                    console.log(data);
                }
                break;
            case 'activity_load':
            case 'mission':
            case 'mission1':
            case 'shopList':
            case 'kaika':
            case '绑定':
            case '助力':
                i11l1l = '';
                if (typeof lilll == 'object') {
                    if (lilll.success && lilll.success === true && lilll.data) {
                        if (lilll.data.status && lilll.data.status == 0xc8) {
                            lilll = lilll.data;
                            if (lilll.msg || lilll.data.isOpenCard || lilll.data.remark) console.log('' + (i11l1l && i11l1l + ':' || '') + (lilll.msg || lilll.data.isOpenCard || lilll.data.remark || ''));
                            if (iiiIil == 'activity_load') {
                                if (lilll.data) {
                                    $.endTime = lilll.data.cusActivity.endTime || 0x0;
                                    $.MixNick = lilll.data.missionCustomer.buyerNick || '';
                                    $.remainPoint = lilll.data.missionCustomer.remainPoint || 0x0;
                                    $.remainChance = lilll.data.missionCustomer.remainChance || 0x0;
                                    $.usedPoint = lilll.data.missionCustomer.usedPoint || 0x0;
                                    $.hasCollectShop = lilll.data.missionCustomer.hasCollectShop || 0x0;
                                    $.hasAddCart = lilll.data.missionCustomer.hasAddCart || 0x0;
                                }
                            } else {
                                if (iiiIil == 'shopList') lilll.data && ($.openLists = lilll.data); else {
                                    if (iiiIil == 'mission') {
                                        lilll.data.remark.indexOf('赶紧去开卡吧') > -0x1 ? $.open = true : $.open = false;
                                    }
                                }
                            }
                        } else {
                            if (lilll.data.msg) lilll.errorMessage.indexOf('活动未开始') > -0x1 && ($.activityEnd = true), lilll.data.msg.indexOf('浏览已达上限') > -0x1 && ($.vimetims = true), console.log('' + (lilll.data.msg || '')); else {
                                if (lilll.errorMessage) {
                                    if (lilll.errorMessage.indexOf('火爆') > -0x1) { }
                                    console.log('' + (lilll.errorMessage || ''));
                                } else console.log('' + data);
                            }
                        }
                    } else lilll.errorMessage ? console.log('' + (lilll.errorMessage || '')) : console.log('' + data);
                } else {
                    console.log('' + data);
                }
                break;
            default:
                console.log((i11l1l || iiiIil) + '-> ' + data);
        }
        if (typeof lilll == 'object') {
            if (lilll.errorMessage) {
                if (lilll.errorMessage.indexOf('火爆') > -0x1) { }
            }
        }
    } catch (Ii1lII) {
        console.log(Ii1lII);
    }
}
function I1IIii(iliI11, ii1iI1, ll111I = 'POST') {
    let IIl111 = {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': liii1I,
        'User-Agent': $.UA,
        'X-Requested-With': 'XMLHttpRequest'
    };
    return iliI11.indexOf('https://mpdz-act-dz.isvjcloud.com') > -0x1 && (IIl111.Origin = 'https://mpdz-act-dz.isvjcloud.com', IIl111['Content-Type'] = 'application/json; charset=utf-8', delete IIl111.Cookie), {
        'url': iliI11,
        'method': ll111I,
        'headers': IIl111,
        'body': ii1iI1,
        'timeout': 0x7530
    };
}
function iIIIlI(ii1iII, ll1111) {
    d = {
        'actId': $.actId,
        ...ll1111,
        'method': ii1iII,
        'userId': $.userId,
        'buyerNick': $.MixNick || ''
    }, sign2 = li11i1(d);
    const i11IIl = {
        'jsonRpc': '2.0',
        'params': {
            'commonParameter': {
                'm': 'POST',
                'sign': sign2.sign,
                'timestamp': sign2.timeStamp,
                'userId': $.userId
            },
            'admJson': {
                'actId': $.actId,
                ...ll1111,
                'method': ii1iII,
                'userId': $.userId,
                'buyerNick': $.MixNick || ''
            }
        }
    };
    return ii1iII.indexOf('missionInviteList') > -0x1 && delete i11IIl.params.admJson.actId, $.toStr(i11IIl, i11IIl);
}
function li11i1(Il1iii) {
    AppSecret = '5f3752ed46754c55a57192f960a8b387';
    key = 'dd2ebaa5ded5415a9453ef1f37059131';
    time2 = new Date().valueOf();
    s2 = encodeURIComponent(JSON.stringify(Il1iii));
    c = new RegExp('\'', 'g');
    A = new RegExp('~', 'g');
    s2 = s2.replace(c, '%27');
    s2 = s2.replace(A, '%7E');
    signBody = key + 'a' + key + 'b' + s2 + 'c' + time2 + AppSecret;
    sign = CryptoJS.MD5(signBody.toLowerCase()).toString();
    return {
        'sign': sign,
        'timeStamp': time2
    };
}
function II1l1(illIII) {
    illIII = illIII || 0x20;
    let ii1iIi = 'abcdef0123456789',
        iliI1i = ii1iIi.length,
        IIl11i = '';
    for (i = 0x0; i < illIII; i++) IIl11i += ii1iIi.charAt(Math.floor(Math.random() * iliI1i));
    return IIl11i;
}
function liii1i(iIiiI) {
    if (typeof iIiiI == 'string') try {
        return JSON.parse(iIiiI);
    } catch (l1iii1) {
        return console.log(l1iii1), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
}
async function IIll1i() {
    if (!$.joinVenderId) return;
    return new Promise(async liIl1l => {
        $.errorJoinShop = '活动太火爆，请稍后再试';
        let IIiII1 = '';
        if ($.shopactivityId) IIiII1 = ',"activityId":' + $.shopactivityId;
        const lIi1I = '{"venderId":"' + $.joinVenderId + '","shopId":"' + $.joinVenderId + '","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0' + IIiII1 + ',"channel":406}',
            Ii1111 = {
                'appid': 'shopmember_m_jd_com',
                'functionId': 'bindWithVender',
                'clientVersion': '9.2.0',
                'client': 'H5',
                'body': JSON.parse(lIi1I)
            },
            Ill1li = await ll1lIi('27004', Ii1111),
            Ililii = {
                'url': 'https://api.m.jd.com/client.action?appid=shopmember_m_jd_com&functionId=bindWithVender&body=' + lIi1I + '&clientVersion=9.2.0&client=H5&uuid=88888&h5st=' + encodeURIComponent(Ill1li),
                'headers': {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Origin': 'https://api.m.jd.com',
                    'Host': 'api.m.jd.com',
                    'accept': '*/*',
                    'User-Agent': $.UA,
                    'Cookie': liii1I
                },
                'timeout': 0x4e20
            };
        $.get(Ililii, async (I111ll, I1liIi, I1ii1i) => {
            try {
                if (I111ll) console.log(I111ll); else {
                    const I1ii1l = JSON.parse(I1ii1i);
                    if (typeof I1ii1l === 'object') {
                        if (I1ii1l.success === true) {
                            console.log(I1ii1l.message), $.errorJoinShop = I1ii1l.message;
                            if (I1ii1l.result && I1ii1l.result.giftInfo) for (let Il1il1 of I1ii1l.result.giftInfo.giftList) {
                                console.log('入会获得：' + Il1il1.discountString + Il1il1.prizeName + Il1il1.secondLineDesc);
                            }
                        } else typeof I1ii1l == 'object' && I1ii1l.message ? ($.errorJoinShop = I1ii1l.message, console.log('' + (I1ii1l.message || ''))) : console.log(I1ii1i);
                    } else console.log(I1ii1i);
                }
            } catch (Ililil) {
                $.logErr(Ililil, I1liIi);
            } finally {
                liIl1l();
            }
        });
    });
}
function lI1iII(I1liIl) {
    return new Promise(iiii1 => {
        const iIlli1 = {
            'url': '' + I1liIl,
            'timeout': 0x2710,
            'headers': {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'
            }
        };
        $.get(iIlli1, async (lI11, li11I1, i1I111) => {
            try {
                if (lI11) { } else {
                    if (i1I111) {
                        i1I111 = JSON.parse(i1I111);
                    } else console.log('未获取到数据,请重新运行');
                }
            } catch (Ii1li) {
                $.logErr(Ii1li, li11I1), i1I111 = null;
            } finally {
                iiii1(i1I111);
            }
        });
    });
}
function IIll1l(iIllI, iIiIl1) {
    return Math.floor(Math.random() * (iIiIl1 - iIllI)) + iIllI;
}
function l1I1lI(Ii1lI, iIiIlI) {
    if (iIiIlI === 'max') return Math.max.apply(Math, Ii1lI); else {
        if (iIiIlI === 'min') return Math.min.apply(Math, Ii1lI);
    }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
