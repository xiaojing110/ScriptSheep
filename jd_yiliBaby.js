/*
7.4-9.30 集碳豆赢大奖

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

每天邀请3个之后无奖励，具体请查看活动规则

————————————————
入口：[ 7.4-9.30 集碳豆赢大奖 ]

请求太频繁会被黑ip
过10分钟再执行

cron:30 10 * * *
============Quantumultx===============
[task_local]
#7.4-9.30 集碳豆赢大奖
30 10 * * * jd_yiliBaby.js, tag=7.4-9.30 集碳豆赢大奖, enabled=true

*/

const $ = new Env('7.4-9.30 集碳豆赢大奖');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [],
    cookie = '';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xa422x5 => {
    cookiesArr.push(jdCookieNode[_0xa422x5]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0xa422x5 => {
    return _0xa422x5.cookie;
  })].filter(_0xa422x5 => {
    return !!_0xa422x5;
  });
}

;
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = '';
let activityCookie = '';
let lz_cookie = {};
!(async () => {
  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": 'https://bean.m.jd.com/'
    });
    return;
  }

  ;
  authorCodeList = [""]
  $.activityId = '2207100000357001';
  $.authorCode = authorCodeList[random(0, authorCodeList.length)];
  $.shareUuid = $.authorCode;
  console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000003570/99/' + $.activityId + '/?helpUuid=' + $.shareUuid);

  for (let _0xa422xa = 0; _0xa422xa < cookiesArr.length; _0xa422xa++) {
    cookie = cookiesArr[_0xa422xa];
    originCookie = cookiesArr[_0xa422xa];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0xa422xa + 1;
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = '';
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await getUA();
      await run();
      await $.wait(3000);

      if (_0xa422xa == 0 && !$.actorUuid) {
        break;
      }

      ;

      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }

  ;

  if ($.outFlag) {
    let _0xa422xb = '此ip已被限制，请过10分钟后再执行脚本';
    $.msg($.name, `${''}`, `${''}${_0xa422xb}${''}`);

    if ($.isNode()) {
      await notify.sendNotify(`${''}${$.name}${''}`, `${''}${_0xa422xb}${''}`);
    }
  }

  ;

  if (allMessage) {
    $.msg($.name, `${''}`, `${''}${allMessage}${''}`);
  }
})().catch(_0xa422x9 => {
  return $.logErr(_0xa422x9);
}).finally(() => {
  return $.done();
});

async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = '';
    $.Token = '';
    $.Pin = '';
    let _0xa422xd = false;
    await takePostRequest('isvObfuscator');

    if ($.Token == '') {
      console.log('获取[token]失败！');
      return;
    }

    ;
    await getCk();

    if (activityCookie == '') {
      console.log(`${'获取cookie失败'}`);
      return;
    }

    ;

    if ($.activityEnd === true) {
      console.log('活动结束');
      return;
    }

    ;

    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n');
      return;
    }

    ;
    await getSimpleActInfoVo();
    await takePostRequest('getMyPing');

    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    ;
    await takePostRequest('accessLogWithAD');
    await takePostRequest('getOpenCardStatusWithOutSelf');
    await takePostRequest('activityContent');
    await $.wait(1000);

    if ($.hotFlag) {
      return;
    }

    ;

    if (!$.actorUuid) {
      console.log('获取不到[actorUuid]退出执行，请重新执行');
      return;
    }

    ;

    if ($.openStatus == 0) {
      console.log('开卡');
      $.joinVenderId = $.venderId;
      await joinShop();

      if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
        console.log('第1次 重新开卡');
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        await joinShop();
      }

      ;

      if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
        console.log('第2次 重新开卡');
        await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
        await joinShop();
      }

      ;

      if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
        console.log('第3次 重新开卡');
        await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
        await joinShop();
      }

      ;

      if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
        console.log('开卡失败❌ ，重新执行脚本');
      }

      ;
      await takePostRequest('activityContent');
    }

    ;
    console.log($.openStatus === 1 ? '已开卡' : $.openStatus === 0 ? '未开卡' : '未知-' + $.openStatus);
    console.log($.helpStatus === 2 ? '助力成功' : $.helpStatus === 3 ? '已助力' : $.helpStatus === 5 ? '已开卡 无法助力' : $.helpStatus === 1 ? '未助力' : $.helpStatus === 0 ? '不能助力自己' : '未知-' + $.helpStatus);

    for (const _0xa422xe of $.giftVOS) {
      if (_0xa422xe.taskFinishCnt == 0 && _0xa422xe.taskType != 3 && _0xa422xe.taskType != 6) {
        if ($.runFalag == false) {
          break;
        }

        ;
        $.taskIds = _0xa422xe.taskId;
        $.taskTypes = _0xa422xe.taskType;
        await takePostRequest('giftVOSlist');
        await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
      }
    }

    ;
    console.log(`${'合计当前碳豆为：'}${$.score}${''}`);

    if (_0xa422xd) {
      await takePostRequest('activityContent');
    }

    ;
    console.log(`${''}${$.score}${'值'}`);
    $.runFalag = true;

    let _0xa422xf = parseInt($.score / 1000);

    console.log(`${'抽奖次数为:'}${_0xa422xf}${''}`);

    for (m = 1; _0xa422xf--; m++) {
      console.log(`${'第'}${m}${'次抽奖'}`);
      await takePostRequest('抽奖');

      if ($.runFalag == false) {
        break;
      }

      ;

      if (Number(_0xa422xf) <= 0) {
        break;
      }

      ;

      if (m >= 4) {
        console.log('抽奖太多次，多余的次数请再执行脚本');
        break;
      }

      ;
      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }

    ;
    console.log(`${'【账号'}${$.index}${'】助力人数：'}${$.assistCount}${''}`);
    console.log($.actorUuid);
    console.log(`${'当前助力:'}${$.shareUuid}${''}`);

    if ($.index == 1) {
      $.shareUuid = $.actorUuid;
      console.log(`${'后面的号都会助力:'}${$.shareUuid}${''}`);
    }

    ;

    if ($.index % 3 == 0) {
      console.log('休息一下，别被黑ip了\n可持续发展');
    }

    ;

    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}

async function takePostRequest(_0xa422x11) {
  if ($.outFlag) {
    return;
  }

  ;
  let _0xa422x12 = 'https://lzkjdz-isv.isvjcloud.com';
  let _0xa422x13 = `${''}`;
  let _0xa422x14 = 'POST';

  switch (_0xa422x11) {
    case 'isvObfuscator':
      url = `${'https://api.m.jd.com/client.action?functionId=isvObfuscator'}`;
      _0xa422x13 = `${'body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954'}`;
      break;

    case 'getMyPing':
      url = `${''}${_0xa422x12}${'/customer/getMyPing'}`;
      _0xa422x13 = `${'token='}${$.Token}${'&fromType=APP&userId=1000003570&pin='}`;
      break;

    case 'getSimpleActInfoVo':
      url = `${''}${_0xa422x12}${'/common/brand/getSimpleActInfoVo'}`;
      _0xa422x13 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'accessLogWithAD':
      url = `${''}${_0xa422x12}${'/common/accessLogWithAD'}`;
      let _0xa422x16 = `${'https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`;
      _0xa422x13 = `${'venderId=1000003570&code=99&pin='}${encodeURIComponent($.Pin)}${'&activityId='}${$.activityId}${'&pageUrl='}${encodeURIComponent(_0xa422x16)}${''}`;
      break;

    case 'getOpenCardStatusWithOutSelf':
      url = `${''}${_0xa422x12}${'/crmCard/common/coupon/getOpenCardStatusWithOutSelf'}`;
      _0xa422x13 = `${'venderId=1000003570&activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'activityContent':
      url = `${''}${_0xa422x12}${'/yiliBaby/space/activityContent'}`;
      _0xa422x13 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${'&inviterUuid='}${$.shareUuid}${''}`;
      break;

    case '抽奖':
      url = `${''}${_0xa422x12}${'/yiliBaby/space/startDraw'}`;
      _0xa422x13 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'giftVOSlist':
      url = `${''}${_0xa422x12}${'/yiliBaby/space/startTask'}`;
      _0xa422x13 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${'&taskId='}${$.taskIds}${''}`;
      break;

    case '奖品':
      url = `${''}${_0xa422x12}${'/yiliBaby/space/getDrawRecord'}`;
      _0xa422x13 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    default:
      console.log(`${'错误'}${_0xa422x11}${''}`);
  }

  ;

  let _0xa422x17 = getPostRequest(url, _0xa422x13, _0xa422x14);

  return new Promise(async _0xa422x18 => {
    $.post(_0xa422x17, (_0xa422x19, _0xa422x1a, _0xa422x1b) => {
      try {
        setActivityCookie(_0xa422x1a);

        if (_0xa422x19) {
          if (_0xa422x1a && typeof _0xa422x1a.statusCode != 'undefined') {
            if (_0xa422x1a.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xa422x19, _0xa422x19)}${''}`);
          console.log(`${''}${_0xa422x11}${' API请求失败，请检查网路重试'}`);
        } else {
          dealReturn(_0xa422x11, _0xa422x1b);
        }
      } catch (e) {
        console.log(e, _0xa422x1a);
      } finally {
        _0xa422x18();
      }
    });
  });
}

async function dealReturn(_0xa422x11, _0xa422x1b) {
  let _0xa422x1d = '';

  try {
    if (_0xa422x11 != 'accessLogWithAD' || _0xa422x11 != 'drawContent') {
      if (_0xa422x1b) {
        _0xa422x1d = JSON.parse(_0xa422x1b);
      }
    }
  } catch (e) {
    console.log(`${''}${_0xa422x11}${' 执行任务异常'}`);
    console.log(_0xa422x1b);
    $.runFalag = false;
  }

  ;

  try {
    switch (_0xa422x11) {
      case 'isvObfuscator':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.errcode == 0) {
            if (typeof _0xa422x1d.token != 'undefined') {
              $.Token = _0xa422x1d.token;
            }
          } else {
            if (_0xa422x1d.message) {
              console.log(`${'isvObfuscator '}${_0xa422x1d.message || ''}${''}`);
            } else {
              console.log(_0xa422x1b);
            }
          }
        } else {
          console.log(_0xa422x1b);
        }

        ;
        break;

      case 'getMyPing':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.result && _0xa422x1d.result === true) {
            if (_0xa422x1d.data && typeof _0xa422x1d.data.secretPin != 'undefined') {
              $.Pin = _0xa422x1d.data.secretPin;
            }

            ;

            if (_0xa422x1d.data && typeof _0xa422x1d.data.nickname != 'undefined') {
              $.nickname = _0xa422x1d.data.nickname;
            }
          } else {
            if (_0xa422x1d.errorMessage) {
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1d.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
        }

        ;
        break;

      case 'activityContent':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.result && _0xa422x1d.result === true) {
            $.actorUuid = _0xa422x1d.data.customerId || '';
            $.helpStatus = _0xa422x1d.data.helpStatus || 0;
            $.openStatus = _0xa422x1d.data.openStatus || 0;
            $.assistCount = _0xa422x1d.data.assistCount || 0;
            $.score = _0xa422x1d.data.score || 0;
            $.giftVOS = _0xa422x1d.data.giftVOS || [];
          } else {
            if (_0xa422x1d.errorMessage) {
              if (_0xa422x1d.errorMessage.indexOf('结束') > -1) {
                $.activityEnd = true;
              }

              ;
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1d.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
        }

        ;
        break;

      case 'giftVOSlist':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.result && _0xa422x1d.result === true) {
            console.log(`${'当前碳豆为：'}${_0xa422x1d.data || ''}${''}`);
          } else {
            if (_0xa422x1d.errorMessage) {
              console.log(`${''}${_0xa422x1d.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xa422x1b}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xa422x1b}${''}`);
        }

        ;
        break;

      case '抽奖':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.result && _0xa422x1d.result === true) {
            if (_0xa422x1d.data.drawOk === true) {
              console.log(`${'获得：'}${_0xa422x1d.data.name || ''}${''}`);
            } else {
              console.log(`${'中奖：一大坨空气~~~~~~~~'}`);
            }
          } else {
            if (_0xa422x1d.errorMessage) {
              console.log(`${''}${_0xa422x1d.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xa422x1b}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xa422x1b}${''}`);
        }

        ;
        break;

      case 'getOpenCardStatusWithOutSelf':
        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.isOk) {
            $.allOpenCard = _0xa422x1d.openCard || false;
          } else {
            if (_0xa422x1d.errorMessage || _0xa422x1d.msg) {
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1d.errorMessage || _0xa422x1d.msg || ''}${''}`);
            } else {
              console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xa422x11}${' '}${_0xa422x1b}${''}`);
        }

        ;
        break;

      case 'accessLogWithAD':
        ;

      case 'drawContent':
        break;

      default:
        console.log(`${''}${_0xa422x11}${'-> '}${_0xa422x1b}${''}`);
    }

    ;

    if (typeof _0xa422x1d == 'object') {
      if (_0xa422x1d.errorMessage) {
        if (_0xa422x1d.errorMessage.indexOf('火爆') > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function getPostRequest(_0xa422x1f, _0xa422x13, _0xa422x14 = 'POST') {
  let _0xa422x20 = {
    "Accept": 'application/json',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    "Connection": 'keep-alive',
    "Content-Type": 'application/x-www-form-urlencoded',
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": 'XMLHttpRequest'
  };

  if (_0xa422x1f.indexOf('https://lzkjdz-isv.isvjcloud.com') > -1) {
    _0xa422x20.Referer = `${'https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`;
    _0xa422x20.Cookie = `${''}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ''}${''}${$.Pin && 'AUTH_C_USER=' + $.Pin + ';' || ''}${''}${activityCookie}${''}`;
  }

  ;
  return {
    url: _0xa422x1f,
    method: _0xa422x14,
    headers: _0xa422x20,
    body: _0xa422x13,
    timeout: 30000
  };
}

function getSimpleActInfoVo() {
  return new Promise(_0xa422x18 => {
    let _0xa422x22 = {
      url: `${'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId='}${$.activityId}${''}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xa422x22, async (_0xa422x19, _0xa422x1a, _0xa422x1b) => {
      try {
        if (_0xa422x19) {
          if (_0xa422x1a && typeof _0xa422x1a.statusCode != 'undefined') {
            if (_0xa422x1a.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xa422x19)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0xa422x1d = $.toObj(_0xa422x1b, _0xa422x1b);

          if (typeof _0xa422x1d == 'object') {
            if (_0xa422x1d.result && _0xa422x1d.result === true) {
              $.endTime = _0xa422x1d.data.endTime || 0;
              $.startTimes = _0xa422x1d.data.startTime || Date.now();

              if (typeof _0xa422x1d.data.shopId != 'undefined') {
                $.shopId = _0xa422x1d.data.shopId;
              }

              ;

              if (typeof _0xa422x1d.data.venderId != 'undefined') {
                $.venderId = _0xa422x1d.data.venderId;
              }
            } else {
              if (_0xa422x1d.errorMessage) {
                console.log(`${''}${_0xa422x1d.errorMessage || ''}${''}`);
              } else {
                console.log(`${''}${_0xa422x1b}${''}`);
              }
            }
          } else {
            console.log(`${''}${_0xa422x1b}${''}`);
          }
        }
      } catch (e) {
        $.logErr(e, _0xa422x1a);
      } finally {
        _0xa422x18();
      }
    });
  });
}

function getCk() {
  return new Promise(_0xa422x18 => {
    let _0xa422x22 = {
      url: `${'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjcloud.com/m/1000003570/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xa422x22, async (_0xa422x19, _0xa422x1a, _0xa422x1b) => {
      try {
        if (_0xa422x19) {
          if (_0xa422x1a && typeof _0xa422x1a.statusCode != 'undefined') {
            if (_0xa422x1a.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xa422x19)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0xa422x24 = _0xa422x1b.match(/(活动已经结束)/) && _0xa422x1b.match(/(活动已经结束)/)[0x1] || '';

          if (_0xa422x24) {
            $.activityEnd = true;
            console.log('活动已结束');
          }

          ;
          setActivityCookie(_0xa422x1a);
        }
      } catch (e) {
        $.logErr(e, _0xa422x1a);
      } finally {
        _0xa422x18();
      }
    });
  });
}

function setActivityCookie(_0xa422x1a) {
  if (_0xa422x1a.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0xa422x26 of _0xa422x1a.headers['set-cookie']) {
      lz_cookie[_0xa422x26.split(';')[0x0].substr(0, _0xa422x26.split(';')[0x0].indexOf('='))] = _0xa422x26.split(';')[0x0].substr(_0xa422x26.split(';')[0x0].indexOf('=') + 1);
    }

    ;

    for (const _0xa422xe of Object.keys(lz_cookie)) {
      cookie += _0xa422xe + '=' + lz_cookie[_0xa422xe] + ';';
    }

    ;
    activityCookie = cookie;
  }
}

async function getUA() {
  $.UA = `${'jdapp;iPhone;10.1.4;13.1.2;'}${randomString(40)}${';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}`;
}

function randomString(_0xa422x9) {
  _0xa422x9 = _0xa422x9 || 32;
  let _0xa422x29 = 'abcdef0123456789',
      _0xa422x2a = _0xa422x29.length,
      _0xa422x2b = '';

  for (i = 0; i < _0xa422x9; i++) {
    _0xa422x2b += _0xa422x29.charAt(Math.floor(Math.random() * _0xa422x2a));
  }

  ;
  return _0xa422x2b;
}

function joinShop() {
  if (!$.joinVenderId) {
    return;
  }

  ;
  return new Promise(async _0xa422x18 => {
    $.shopactivityId = '';
    $.errorJoinShop = '';
    await $.wait(1000);
    await getshopactivityId();
    let _0xa422x2d = `${''}`;

    if ($.shopactivityId) {
      _0xa422x2d = `${',"activityId":'}${$.shopactivityId}${''}`;
    }

    ;

    let _0xa422x2e = await geth5st();

    const _0xa422x2f = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"'}${$.joinVenderId}${'","shopId":"'}${$.joinVenderId}${'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'}${_0xa422x2d}${',"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888&h5st='}${_0xa422x2e}${''}`,
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
    $.get(_0xa422x2f, async (_0xa422x19, _0xa422x1a, _0xa422x1b) => {
      try {
        let _0xa422x1d = $.toObj(_0xa422x1b, _0xa422x1b);

        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.success === true) {
            console.log(_0xa422x1d.message);
            $.errorJoinShop = _0xa422x1d.message;

            if (_0xa422x1d.result && _0xa422x1d.result.giftInfo) {
              for (let _0xa422xa of _0xa422x1d.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0xa422xa.discountString}${''}${_0xa422xa.prizeName}${''}${_0xa422xa.secondLineDesc}${''}`);
              }
            }
          } else {
            if (typeof _0xa422x1d == 'object' && _0xa422x1d.message) {
              $.errorJoinShop = _0xa422x1d.message;
              console.log(`${''}${_0xa422x1d.message || ''}${''}`);
            } else {
              console.log(_0xa422x1b);
            }
          }
        } else {
          console.log(_0xa422x1b);
        }
      } catch (e) {
        $.logErr(e, _0xa422x1a);
      } finally {
        _0xa422x18();
      }
    });
  });
}

function getshopactivityId() {
  return new Promise(_0xa422x18 => {
    const _0xa422x2f = {
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
    $.get(_0xa422x2f, async (_0xa422x19, _0xa422x1a, _0xa422x1b) => {
      try {
        let _0xa422x1d = $.toObj(_0xa422x1b, _0xa422x1b);

        if (typeof _0xa422x1d == 'object') {
          if (_0xa422x1d.success == true) {
            console.log(`${'入会:'}${_0xa422x1d.result.shopMemberCardInfo.venderCardName || ''}${''}`);
            $.shopactivityId = _0xa422x1d.result.interestsRuleList && _0xa422x1d.result.interestsRuleList[0x0] && _0xa422x1d.result.interestsRuleList[0x0].interestsInfo && _0xa422x1d.result.interestsRuleList[0x0].interestsInfo.activityId || '';
          }
        } else {
          console.log(_0xa422x1b);
        }
      } catch (e) {
        $.logErr(e, _0xa422x1a);
      } finally {
        _0xa422x18();
      }
    });
  });
}

function jsonParse(_0xa422x32) {
  if (typeof _0xa422x32 == 'string') {
    try {
      return JSON.parse(_0xa422x32);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}


function random(_0xa422x35, _0xa422x36) {
  return Math.floor(Math.random() * (_0xa422x36 - _0xa422x35)) + _0xa422x35;
}
function generateFp(){
	let _0x29b403='0123456789';
	let _0xb1ece4=13;
	let _0x17b84a='';
	for(;_0xb1ece4--;)_0x17b84a+=_0x29b403[Math.random()*_0x29b403.length|0x0];
	return (_0x17b84a+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x2beee2=Date.now();
	let _0x1b782c=generateFp();
	let _0x14e516=new Date(_0x2beee2).Format('yyyyMMddhhmmssSSS');
	let _0x49d9e2=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0x5ee515=_0x49d9e2[random(0,_0x49d9e2.length)];
	return encodeURIComponent((_0x14e516+';')+_0x1b782c+_0x5ee515+Date.now());
}
Date.prototype.Format=function(_0x1ec4bb){
	var _0x2273ef,_0x25ac60=this,_0x334d9c=_0x1ec4bb,_0x3fc1ee={'M+':_0x25ac60.getMonth()+1,'d+':_0x25ac60.getDate(),'D+':_0x25ac60.getDate(),'h+':_0x25ac60.getHours(),'H+':_0x25ac60.getHours(),'m+':_0x25ac60.getMinutes(),'s+':_0x25ac60.getSeconds(),'w+':_0x25ac60.getDay(),'q+':Math.floor(_0x25ac60.getMonth()+3/3),'S+':_0x25ac60.getMilliseconds()};
	/(y+)/i.test(_0x334d9c)&&(_0x334d9c=_0x334d9c.replace(RegExp.$1,''.concat(_0x25ac60.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0xd76021 in _0x3fc1ee){
		if(new RegExp('('.concat(_0xd76021,')')).test(_0x334d9c)){
			var _0x6ee06d,_0x2c5f41=('S+'===_0xd76021)?'000':'00';
			_0x334d9c=_0x334d9c.replace(RegExp.$1,(1==RegExp.$1.length)?_0x3fc1ee[_0xd76021]:(''.concat(_0x2c5f41)+_0x3fc1ee[_0xd76021]).substr(''.concat(_0x3fc1ee[_0xd76021]).length));
		}
	}
	return _0x334d9c;
};
function random(_0x49d667,_0x34bf6a){
	return Math.floor(Math.random()*_0x34bf6a-_0x49d667)+_0x49d667;
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

