/*
LZ让福袋飞通用活动

会自动开卡店铺会员

请求太频繁会被黑ip

变量：
//export jd_wxUnPackingActivity_activityId="活动ID"
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId=<活动id>

cron:6 6 6 6 *
============Quantumultx===============
[task_local]
#LZ让福袋飞通用活动
6 6 6 6 * jd_wxUnPackingActivity.js, tag=LZ让福袋飞通用活动, enabled=true

*/

const $ = new Env('LZ让福袋飞');
var _a = {};

(function (_0xd642x1) {
  _0xd642x1._decode = 'http://www.sojson.com/javascriptobfuscator.html';
})(_a);

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let lz_cookie = {};
let cookiesArr = [],
    cookie = '';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x9808x6 => {
    cookiesArr.push(jdCookieNode[_0x9808x6]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x9808x6 => {
    return _0x9808x6.cookie;
  })].filter(_0x9808x6 => {
    return !!_0x9808x6;
  });
}

;
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let activityCookie = '';
let jd_wxUnPackingActivity_activityId = '';
jd_wxUnPackingActivity_activityId = $.isNode() ? process.env.jd_wxUnPackingActivity_activityId ? process.env.jd_wxUnPackingActivity_activityId : `${''}${jd_wxUnPackingActivity_activityId}${''}` : $.getdata('jd_wxUnPackingActivity_activityId') ? $.getdata('jd_wxUnPackingActivity_activityId') : `${''}${jd_wxUnPackingActivity_activityId}${''}`;
!(async () => {
  if (!jd_wxUnPackingActivity_activityId) {
    console.log(`${'\\n衰仔、请填写让福袋飞的活动ID,变量是jd_wxUnPackingActivity_activityId\\n'}`);
    return;
  }


  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": 'https://bean.m.jd.com/'
    });
    return;
  }

  $.activityId = jd_wxUnPackingActivity_activityId;
  $.shareUuid = '';
  console.log('活动入口: https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId=' + $.activityId);

  for (let _0x9808xb = 0; _0x9808xb < cookiesArr.length; _0x9808xb++) {
    cookie = cookiesArr[_0x9808xb];
    originCookie = cookiesArr[_0x9808xb];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0x9808xb + 1;
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = '';
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await getUA();
      await run();
      await $.wait(4000);

      if (_0x9808xb == 0 && !$.actorUuid) {
        break;
      }

      if ($.outFlag || $.activityEnd) {
        break;
      }

      if ($.hasEnd) {
        break;
      }
    }
  }


  if ($.outFlag) {
    $.msg($.name, `${''}`, `${''}${'此ip已被限制，请过10分钟后再执行脚本'}${''}`);

    if ($.isNode()) {
      await notify.sendNotify(`${''}${$.name}${''}`, `${''}${'此ip已被限制，请过10分钟后再执行脚本'}${''}`);
    }
  }


  if (allMessage) {
    $.msg($.name, `${''}`, `${''}${allMessage}${''}`);
  }
})().catch(_0x9808xa => {
  return $.logErr(_0x9808xa);
}).finally(() => {
  return $.done();
});

async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    $.Token = '';
    $.Pin = '';
    await takePostRequest('isvObfuscator');

    if ($.Token == '') {
      console.log('获取[token]失败！');
      return;
    }

    await getCk();

    if ($.activityEnd === true) {
      console.log('活动结束');
      return;
    }


    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n');
      return;
    }

    await takePostRequest('getSimpleActInfoVo');
    await $.wait(1500);
    await takePostRequest('getMyPing');

    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    await takePostRequest('accessLogWithAD');
    await $.wait(1500);
    await takePostRequest('getActMemberInfo');

    if (!$.openCard) {
      $.shopactivityId = '';
      $.joinVenderId = $.venderId;
      await getshopactivityId();

      for (let _0x9808xb = 0; _0x9808xb < Array(5).length; _0x9808xb++) {
        if (_0x9808xb > 0) {
          console.log(`${'第'}${_0x9808xb}${'次 重新开卡'}`);
        }

        await joinShop();
        await $.wait(500);

        if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') == -1) {
          break;
        }
      }
    }

    await takePostRequest('getUserInfo');
    await $.wait(1000);
    await takePostRequest('activityContent');
    await takePostRequest('shopInfo');
    await $.wait(1000);

    if ($.index == 1) {
      console.log('活动获取成功，助力码：' + $.actorUuid);
      console.log('\n活动店铺：' + $.shopName + '\n开始时间：' + $.startTime + '\n结束时间：' + $.endTime + '\n助力次数：' + $.unpackingPeople);
      console.log('\n已有助力：' + $.hasUnpackingPeople + '\n还需助力：' + $.needUnpackingPeople);
    }


    if ($.index != 1) {
      await takePostRequest('getMyFriendInfo');
      await $.wait(1500);
      await takePostRequest('unpackingInfo');
      await takePostRequest('unPacking');
      console.log($.helpStatus == 1 ? '助力成功' : $.helpStatus == 3 ? '已助力他人' : $.helpStatus == 2 ? '已助力' : '其他情况' + $.helpStatus);
    }


    if ($.index == 1) {
      $.helpCount = $.hasUnpackingPeople;
    } else {
      if ($.helpStatus == 1) {
        $.helpCount++;
      }
    }

    console.log('\n');
    console.log(`${'【账号'}${$.index}${'】已有助力：'}${$.hasUnpackingPeople}${''}${$.index != 1 && ' 【账号1】已有助力：' + $.helpCount || ''}${''}`);

    if ($.helpCount >= $.unpackingPeople) {
      $.hasEnd = true;
    }


    if ($.hotFlag) {
      return;
    }


    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n');
      return;
    }


    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log(`${'全部助力 → '}${$.shareUuid}${''}`);
    }


    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}

async function takePostRequest(_0x9808x10) {
  if ($.outFlag) {
    return;
  }

  let _0x9808x12 = `${''}`;

  switch (_0x9808x10) {
    case 'isvObfuscator':
      url = `${'https://api.m.jd.com/client.action?functionId=isvObfuscator'}`;
      _0x9808x12 = `${'body=%7B%22url%22%3A%20%22https%3A//lzkj-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=hjudwgohxzVu96krv&client=apple&clientVersion=9.4.0&st=1620476162000&sv=111&sign=f9d1b7e3b943b6a136d54fe4f892af05'}`;
      break;

    case 'getMyPing':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/customer/getMyPing'}`;
      _0x9808x12 = `${'token='}${$.Token}${'&fromType=APP&userId='}${$.venderId}${''}`;
      break;

    case 'shopInfo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/shopInfo'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'getSimpleActInfoVo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/customer/getSimpleActInfoVo'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'getActMemberInfo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxCommonInfo/getActMemberInfo'}`;
      _0x9808x12 = `${'venderId='}${$.venderId}${'&activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'accessLogWithAD':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/common/accessLogWithAD'}`;
      let _0x9808x15 = `${'https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId='}${$.activityId}${'&friendUuid='}${$.shareUuid}${''}`;
      _0x9808x12 = `${'venderId='}${$.venderId}${'&code='}${$.activityType}${'&pin='}${encodeURIComponent($.Pin)}${'&activityId='}${$.activityId}${'&pageUrl='}${encodeURIComponent(_0x9808x15)}${'&subType=app&adSource='}`;
      break;

    case 'getUserInfo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxActionCommon/getUserInfo'}`;
      _0x9808x12 = `${'pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'getMyFriendInfo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/getMyFriendInfo'}`;
      _0x9808x12 = `${'friendUuid='}${$.shareUuid}${''}`;
      break;

    case 'activityContent':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/activityContent'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${'&buyerNick='}${encodeURIComponent($.Pin)}${'&friendUuid='}${$.shareUuid}${''}`;
      break;

    case 'unpackingInfo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/unpackingInfo'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${'&friendUuid='}${$.shareUuid}${'&mySelfUuid='}${$.actorUuid}${''}`;
      break;

    case 'unPacking':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/unPacking'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${'&friendUuid='}${$.shareUuid}${'&mySelfId='}${$.actorUuid}${''}`;
      break;

    case 'getPrize':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/wxUnPackingActivity/getPrize'}`;
      _0x9808x12 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    default:
      console.log(`${'错误'}${_0x9808x10}${''}`);
  }


  let _0x9808x16 = getPostRequest(url, _0x9808x12, 'POST');

  return new Promise(async _0x9808x17 => {
    $.post(_0x9808x16, (_0x9808x18, _0x9808x19, _0x9808x1a) => {
      try {
        setActivityCookie(_0x9808x19);

        if (_0x9808x18) {
          if (_0x9808x19 && typeof _0x9808x19.statusCode != 'undefined') {
            if (_0x9808x19.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          console.log(`${''}${$.toStr(_0x9808x18, _0x9808x18)}${''}`);
          console.log(`${''}${_0x9808x10}${' API请求失败，请检查网路重试'}`);
        } else {
          dealReturn(_0x9808x10, _0x9808x1a);
        }
      } catch (e) {
        console.log(e, _0x9808x19);
      } finally {
        _0x9808x17();
      }
    });
  });
}

async function dealReturn(_0x9808x10, _0x9808x1a) {
  let _0x9808x1c = '';

  try {
    if (_0x9808x10 != 'accessLogWithAD' || _0x9808x10 != 'drawContent') {
      if (_0x9808x1a) {
        _0x9808x1c = JSON.parse(_0x9808x1a);
      }
    }
  } catch (e) {
    console.log(`${''}${_0x9808x10}${' 执行任务异常'}`);
    console.log(_0x9808x1a);
    $.runFalag = false;
  }


  try {
    switch (_0x9808x10) {
      case 'isvObfuscator':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.errcode == 0) {
            if (typeof _0x9808x1c.token != 'undefined') {
              $.Token = _0x9808x1c.token;
            }
          } else {
            if (_0x9808x1c.message) {
              console.log(`${'isvObfuscator '}${_0x9808x1c.message || ''}${''}`);
            } else {
              console.log(_0x9808x1a);
            }
          }
        } else {
          console.log(_0x9808x1a);
        }

        break;

      case 'getMyPing':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            if (_0x9808x1c.data && typeof _0x9808x1c.data.secretPin != 'undefined') {
              $.Pin = _0x9808x1c.data.secretPin;
            }


            if (_0x9808x1c.data && typeof _0x9808x1c.data.nickname != 'undefined') {
              $.nickname = _0x9808x1c.data.nickname;
            }
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {}

        break;

      case 'shopInfo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.shopName = _0x9808x1c.data.shopName || '';
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'getSimpleActInfoVo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            if (typeof _0x9808x1c.data.shopId != 'undefined') {
              $.shopId = _0x9808x1c.data.shopId;
            }


            if (typeof _0x9808x1c.data.venderId != 'undefined') {
              $.venderId = _0x9808x1c.data.venderId;
            }

            $.activityType = _0x9808x1c.data.activityType;
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {}

        break;

      case 'getUserInfo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.pinImg = _0x9808x1c.data.yunMidImageUrl || '';
            $.jdNick = _0x9808x1c.data.nickname || '';
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'activityContent':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.actorUuid = _0x9808x1c.data.wucvo.mySelfId || '';
            $.unpackingPeople = _0x9808x1c.data.wucvo.unpackingPeople || 0;
            $.collectionCondition = _0x9808x1c.data.wucvo.collectionCondition || true;
            $.startTime = _0x9808x1c.data.wucvo.startTime || '';
            $.endTime = _0x9808x1c.data.wucvo.endTime || '';
            $.hasUnpackingPeople = _0x9808x1c.data.wuivo.hasUnpackingPeople || 0;
            $.needUnpackingPeople = _0x9808x1c.data.wuivo.needUnpackingPeople || 0;
            $.jpname = _0x9808x1c.data.wdifo.name || '';
          } else {
            if (_0x9808x1c.errorMessage) {
              if (_0x9808x1c.errorMessage.indexOf('结束') > -1) {
                $.activityEnd = true;
              }

              console.log(`${''}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x1a}${''}`);
        }

        break;

      case 'getMyFriendInfo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            console.log(`${'准备助力 => '}${_0x9808x1c.data.nickname || ''}${''}`);
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'unpackingInfo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.helpStatus = _0x9808x1c.data.shareStatus || 0;
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x1a}${''}`);
            }
          }
        } else {}

        break;

      case 'unPacking':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            console.log(`${' '}${_0x9808x1c.errorMessage || ''}${''}`);
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'drawContent':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.content = _0x9808x1c.data.content || [];
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'getActMemberInfo':
        if (typeof _0x9808x1c == 'object') {
          if (_0x9808x1c.result && _0x9808x1c.result === true) {
            $.openCard = _0x9808x1c.data.openCard || false;
          } else {
            if (_0x9808x1c.errorMessage) {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0x9808x10}${' '}${_0x9808x1a}${''}`);
        }

        break;

      case 'accessLogWithAD':

      case 'drawContent':
        break;

      default:
        console.log(`${''}${_0x9808x10}${'-> '}${_0x9808x1a}${''}`);
    }


    if (typeof _0x9808x1c == 'object') {
      if (_0x9808x1c.errorMessage) {
        if (_0x9808x1c.errorMessage.indexOf('火爆') > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function getPostRequest(_0x9808x1e, _0x9808x12, _0x9808x13 = 'POST') {
  let _0x9808x1f = {
    "Accept": 'application/json, text/javascript, */*; q=0.01',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    "Connection": 'keep-alive',
    "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8',
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": 'XMLHttpRequest'
  };

  if (_0x9808x1e.indexOf('https://lzkjdz-isv.isvjcloud.com') > -1) {
    _0x9808x1f.Origin = `${'https://lzkjdz-isv.isvjcloud.com'}`;
    _0x9808x1f.Referer = `${'https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId='}${$.activityId}${'&friendUuid='}${$.shareUuid}${''}`;
    _0x9808x1f.Cookie = `${''}${''}${''}${$.Pin && 'AUTH_C_USER=' + $.Pin + ';' || ''}${''}${''}${''}`;
  }

  return {
    url: _0x9808x1e,
    method: _0x9808x13,
    headers: _0x9808x1f,
    body: _0x9808x12,
    timeout: 30000
  };
}

function getCk() {
  return new Promise(_0x9808x17 => {
    let _0x9808x21 = {
      url: `${'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjcloud.com/wxUnPackingActivity/activity/activity?activityId='}${$.activityId}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x9808x21, async (_0x9808x18, _0x9808x19, _0x9808x1a) => {
      try {
        if (_0x9808x18) {
          if (_0x9808x19 && typeof _0x9808x19.statusCode != 'undefined') {
            if (_0x9808x19.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          console.log(`${''}${$.toStr(_0x9808x18)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0x9808x22 = _0x9808x1a.match(/(活动已经结束)/) && _0x9808x1a.match(/(活动已经结束)/)[0x1] || '';

          if (_0x9808x22) {
            $.activityEnd = true;
            console.log('活动已结束');
          }

          setActivityCookie(_0x9808x19);
        }
      } catch (e) {
        $.logErr(e, _0x9808x19);
      } finally {
        _0x9808x17();
      }
    });
  });
}

function setActivityCookie(_0x9808x19) {
  if (_0x9808x19.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0x9808x24 of _0x9808x19.headers['set-cookie']) {
      lz_cookie[_0x9808x24.split(';')[0x0].substr(0, _0x9808x24.split(';')[0x0].indexOf('='))] = _0x9808x24.split(';')[0x0].substr(_0x9808x24.split(';')[0x0].indexOf('=') + 1);
    }


    for (const _0x9808x25 of Object.keys(lz_cookie)) {
      cookie += _0x9808x25 + '=' + lz_cookie[_0x9808x25] + ';';
    }

    activityCookie = cookie;
  }
}

async function getUA() {
  $.UA = `${'jdapp;iPhone;10.1.4;13.1.2;'}${randomString(40)}${';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}`;
}

function randomString(_0x9808xa) {
  _0x9808xa = _0x9808xa || 32;
  let _0x9808x29 = 'abcdef0123456789'.length,
      _0x9808x2a = '';

  for (i = 0; i < _0x9808xa; i++) {
    _0x9808x2a += 'abcdef0123456789'.charAt(Math.floor(Math.random() * _0x9808x29));
  }

  return _0x9808x2a;
}

function getMaxMin(_0x9808x2c, _0x9808x2d) {
  if (_0x9808x2d === 'max') {
    return Math.max.apply(Math, _0x9808x2c);
  } else {
    if (_0x9808x2d === 'min') {
      return Math.min.apply(Math, _0x9808x2c);
    }
  }
}

function jsonParse(_0x9808x2f) {
  if (typeof _0x9808x2f == 'string') {
    try {
      return JSON.parse(_0x9808x2f);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}

async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }

  return new Promise(async _0x9808x17 => {
    $.errorJoinShop = '活动太火爆，请稍后再试';
    let _0x9808x31 = `${''}`;

    if ($.shopactivityId) {
      _0x9808x31 = `${',"activityId":'}${$.shopactivityId}${''}`;
    }

    let _0x9808x12 = `${'{"venderId":"'}${$.joinVenderId}${'","shopId":"'}${$.joinVenderId}${'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'}${_0x9808x31}${',"channel":406}'}`;

    let _0x9808x32 = await geth5st();

    const _0x9808x33 = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='}${_0x9808x12}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x9808x32}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0x9808x33, async (_0x9808x18, _0x9808x19, _0x9808x1a) => {
      try {
        _0x9808x1a = _0x9808x1a && _0x9808x1a.match(/jsonp_.*?\((.*?)\);/) && _0x9808x1a.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0x9808x1a;

        let _0x9808x1c = $.toObj(_0x9808x1a, _0x9808x1a);

        if (_0x9808x1c && typeof _0x9808x1c == 'object') {
          if (_0x9808x1c && _0x9808x1c.success === true) {
            console.log(_0x9808x1c.message);
            $.errorJoinShop = _0x9808x1c.message;

            if (_0x9808x1c.result && _0x9808x1c.result.giftInfo) {
              for (let _0x9808xb of _0x9808x1c.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0x9808xb.discountString}${''}${_0x9808xb.prizeName}${''}${_0x9808xb.secondLineDesc}${''}`);
              }
            }
          } else {
            if (_0x9808x1c && typeof _0x9808x1c == 'object' && _0x9808x1c.message) {
              $.errorJoinShop = _0x9808x1c.message;
              console.log(`${''}${_0x9808x1c.message || ''}${''}`);
            } else {
              console.log(_0x9808x1a);
            }
          }
        } else {
          console.log(_0x9808x1a);
        }
      } catch (e) {
        $.logErr(e, _0x9808x19);
      } finally {
        _0x9808x17();
      }
    });
  });
}

async function getshopactivityId() {
  return new Promise(async _0x9808x17 => {
    let _0x9808x12 = `${'{"venderId":"'}${$.joinVenderId}${'","channel":406,"payUpShop":true}'}`;

    let _0x9808x32 = await geth5st();

    const _0x9808x33 = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='}${_0x9808x12}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x9808x32}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0x9808x33, async (_0x9808x18, _0x9808x19, _0x9808x1a) => {
      try {
        _0x9808x1a = _0x9808x1a && _0x9808x1a.match(/jsonp_.*?\((.*?)\);/) && _0x9808x1a.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0x9808x1a;

        let _0x9808x1c = $.toObj(_0x9808x1a, _0x9808x1a);

        if (_0x9808x1c && typeof _0x9808x1c == 'object') {
          if (_0x9808x1c && _0x9808x1c.success == true) {
            console.log(`${'入会:'}${_0x9808x1c.result.shopMemberCardInfo.venderCardName || ''}${''}`);
            $.shopactivityId = _0x9808x1c.result.interestsRuleList && _0x9808x1c.result.interestsRuleList[0x0] && _0x9808x1c.result.interestsRuleList[0x0].interestsInfo && _0x9808x1c.result.interestsRuleList[0x0].interestsInfo.activityId || '';
          }
        } else {
          console.log(_0x9808x1a);
        }
      } catch (e) {
        $.logErr(e, _0x9808x19);
      } finally {
        _0x9808x17();
      }
    });
  });
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
