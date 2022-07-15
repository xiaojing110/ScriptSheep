/*
7.13-7.23 倩碧邀请礼


1.邀请满3人30豆，邀请5人50，邀请15人 有机会获得盲盒
2.开1张卡
3.已开卡的不算有效人数

第一个账号助力作者 其他依次助力CK1
第一个CK失效会退出脚本

————————————————
入口：[ 7.13-7.23 倩碧邀请礼 ]

请求太频繁会被黑ip
过10分钟再执行

cron:50 11 13-23 7 *
============Quantumultx===============
[task_local]
#7.13-7.23 倩碧邀请礼
50 11 13-23 7 * jd_qbyql.js, tag=7.13-7.23 倩碧邀请礼, enabled=true

*/

const $ = new Env('7.13-7.23 倩碧邀请礼');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let lz_cookie = {};
let cookiesArr = [],
    cookie = '';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xad2ax6 => {
    cookiesArr.push(jdCookieNode[_0xad2ax6]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0xad2ax6 => {
    return _0xad2ax6.cookie;
  })].filter(_0xad2ax6 => {
    return !!_0xad2ax6;
  });
}

;
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let activityCookie = '';
!(async () => {
  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": 'https://bean.m.jd.com/'
    });
    return;
  }

  $.activityId = '2201100037643108';
  authorCodeList = [''];


  $.shareUuid = authorCodeList[Math.floor(Math.random() * authorCodeList.length)];
  console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/m/1000376431/99/2201100037643108/?helpUuid=' + $.shareUuid);

  for (let _0xad2axa = 0; _0xad2axa < cookiesArr.length; _0xad2axa++) {
    cookie = cookiesArr[_0xad2axa];
    originCookie = cookiesArr[_0xad2axa];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0xad2axa + 1;
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = '';
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await getUA();
      await run();
      await $.wait(3000);

      if (_0xad2axa == 0 && !$.actorUuid) {
        break;
      }

      ;

      if ($.outFlag || $.activityEnd) {
        break;
      }

      ;

      if ($.hasEnd) {
        break;
      }
    }
  }

  ;

  if ($.outFlag) {
    $.msg($.name, `${''}`, `${''}${'此ip已被限制，请过10分钟后再执行脚本'}${''}`);

    if ($.isNode()) {
      await notify.sendNotify(`${''}${$.name}${''}`, `${''}${'此ip已被限制，请过10分钟后再执行脚本'}${''}`);
    }
  }

  ;

  if (allMessage) {
    $.msg($.name, `${''}`, `${''}${allMessage}${''}`);
  }
})().catch(_0xad2ax9 => {
  return $.logErr(_0xad2ax9);
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

    ;
    await getCk();
    {
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
    await takePostRequest('getMyPing');

    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    ;
    await takePostRequest('accessLogWithAD');
    await takePostRequest('getOpenCardStatusWithOutSelf');
    await takePostRequest('activityContent');
    await getSimpleActInfoVo();

    if ($.hotFlag) {
      return;
    }

    ;

    if (!$.actorUuid) {
      console.log('获取不到[actorUuid]退出执行，请重新执行');
      return;
    }

    ;

    if ($.openStatus == false) {
      console.log('开卡');
      $.joinVenderId = 1000376431;
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
      } else {
        $.assistStatus = true;
      }

      ;
      await takePostRequest('getOpenCardStatusWithOutSelf');
      await takePostRequest('activityContent');
    }

    ;
    await $.wait(1000);
    await takePostRequest('getInviteSend');

    if ($.thirtyBeans == 1) {
      console.log(`${'开始领取第一档奖励'}`);
      $.prizFlag = 1;
      await takePostRequest('sendGift');
      await $.wait(1000);
    }

    ;

    if ($.fiftyBeans == 1) {
      console.log(`${'开始领取第二档奖励'}`);
      $.prizFlag = 2;
      await takePostRequest('sendGift');
      await $.wait(1000);
    }

    ;

    if ($.fifteen === 1) {
      console.log(`${'第三档奖励需自行进入活动页面领取'}`);
    }

    ;
    console.log($.openStatus === true ? '已开卡' : $.openStatus === false ? '未开卡' : '未知-' + $.openStatus);
    console.log($.helpStatus === 1 ? '助力成功' : $.helpStatus === 0 ? '已助力,或者已开卡无法助力' : $.helpStatus === 2 ? '不能助力自己' : '未知-' + $.helpStatus);

    if ($.index == 1) {
      $.helpCount = $.assistCount;
    } else {
      if ($.helpStatus == 1) {
        $.helpCount++;
      }
    }

    ;
    console.log(`${'【账号'}${$.index}${'】助力人数：'}${$.assistCount}${''}${$.index != 1 && ' 【账号1】助力人数：' + $.helpCount || ''}${''}`);

    if ($.helpCount >= 15) {
      $.hasEnd = true;
    }

    ;
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

async function takePostRequest(_0xad2axf) {
  if ($.outFlag) {
    return;
  }

  ;
  let _0xad2ax11 = `${''}`;

  switch (_0xad2axf) {
    case 'isvObfuscator':
      url = `${'https://api.m.jd.com/client.action?functionId=isvObfuscator'}`;
      _0xad2ax11 = `${'body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954'}`;
      break;

    case 'getMyPing':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/customer/getMyPing'}`;
      _0xad2ax11 = `${'token='}${$.Token}${'&fromType=APP&userId=1000376431&pin='}`;
      break;

    case 'getSimpleActInfoVo':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/common/brand/getSimpleActInfoVo'}`;
      _0xad2ax11 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'accessLogWithAD':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/common/accessLogWithAD'}`;
      let _0xad2ax14 = `${'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`;
      _0xad2ax11 = `${'venderId=1000376431&code=99&pin='}${encodeURIComponent($.Pin)}${'&activityId='}${$.activityId}${'&pageUrl='}${encodeURIComponent(_0xad2ax14)}${''}`;
      break;

    case 'getOpenCardStatusWithOutSelf':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/crmCard/common/coupon/getOpenCardStatusWithOutSelf'}`;
      _0xad2ax11 = `${'venderId=1000376431&activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'activityContent':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/clinique/invite/wx/activityContent'}`;
      _0xad2ax11 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${'&helpUuid='}${$.shareUuid}${''}`;
      break;

    case 'sendGift':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/clinique/invite/wx/sendGift'}`;
      _0xad2ax11 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${'&prizFlag='}${$.prizFlag}${''}`;
      break;

    case 'getInviteSend':
      url = `${''}${'https://lzkjdz-isv.isvjcloud.com'}${'/clinique/invite/wx/getInviteSend'}`;
      _0xad2ax11 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    default:
      console.log(`${'错误'}${_0xad2axf}${''}`);
  }

  ;

  let _0xad2ax15 = getPostRequest(url, _0xad2ax11, 'POST');

  return new Promise(async _0xad2ax16 => {
    $.post(_0xad2ax15, (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        setActivityCookie(_0xad2ax18);

        if (_0xad2ax17) {
          if (_0xad2ax18 && typeof _0xad2ax18.statusCode != 'undefined') {
            if (_0xad2ax18.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xad2ax17, _0xad2ax17)}${''}`);
          console.log(`${''}${_0xad2axf}${' API请求失败，请检查网路重试'}`);
        } else {
          dealReturn(_0xad2axf, _0xad2ax19);
        }
      } catch (e) {
        console.log(e, _0xad2ax18);
      } finally {
        _0xad2ax16();
      }
    });
  });
}

async function dealReturn(_0xad2axf, _0xad2ax19) {
  let _0xad2ax1b = '';

  try {
    if (_0xad2axf != 'accessLogWithAD' || _0xad2axf != 'drawContent') {
      if (_0xad2ax19) {
        _0xad2ax1b = JSON.parse(_0xad2ax19);
      }
    }
  } catch (e) {
    console.log(`${''}${_0xad2axf}${' 执行任务异常'}`);
    console.log(_0xad2ax19);
    $.runFalag = false;
  }

  ;

  try {
    switch (_0xad2axf) {
      case 'isvObfuscator':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.errcode == 0) {
            if (typeof _0xad2ax1b.token != 'undefined') {
              $.Token = _0xad2ax1b.token;
            }
          } else {
            if (_0xad2ax1b.message) {
              console.log(`${'isvObfuscator '}${_0xad2ax1b.message || ''}${''}`);
            } else {
              console.log(_0xad2ax19);
            }
          }
        } else {
          console.log(_0xad2ax19);
        }

        ;
        break;

      case 'getMyPing':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.result && _0xad2ax1b.result === true) {
            if (_0xad2ax1b.data && typeof _0xad2ax1b.data.secretPin != 'undefined') {
              $.Pin = _0xad2ax1b.data.secretPin;
            }

            ;

            if (_0xad2ax1b.data && typeof _0xad2ax1b.data.nickname != 'undefined') {
              $.nickname = _0xad2ax1b.data.nickname;
            }
          } else {
            if (_0xad2ax1b.errorMessage) {
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax1b.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
        }

        ;
        break;

      case 'getInviteSend':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.result && _0xad2ax1b.result === true) {
            $.thirtyBeans = _0xad2ax1b.data.thirtyBeans || 0;
            $.fiftyBeans = _0xad2ax1b.data.fiftyBeans || 0;
            $.fifteen = _0xad2ax1b.data.fifteen || 0;
          } else {
            if (_0xad2ax1b.errorMessage) {
              console.log(`${''}${_0xad2ax1b.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xad2ax19}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xad2ax19}${''}`);
        }

        ;
        break;

      case 'sendGift':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.result && _0xad2ax1b.result === true) {
            console.log(`${''}${_0xad2ax1b.data}${''}`);
          } else {
            if (_0xad2ax1b.errorMessage) {
              console.log(`${''}${_0xad2ax1b.errorMessage || ''}${''}`);
            } else {
              console.log(`${' '}${_0xad2ax19}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xad2ax19}${''}`);
        }

        ;
        break;

      case 'activityContent':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.result && _0xad2ax1b.result === true) {
            $.actorUuid = _0xad2ax1b.data.customerId || '';
            $.helpStatus = _0xad2ax1b.data.helpStatus || 0;
            $.assistCount = _0xad2ax1b.data.inviteNum || 0;

            if (_0xad2ax1b.data.sendBeanNum) {
              console.log(`${'获得'}${_0xad2ax1b.data.sendBeanNum}${'豆'}`);
              allMessage += `${'【账号'}${$.index}${'】获得'}${_0xad2ax1b.data.sendBeanNum}${'豆\\n'}`;
            }
          } else {
            if (_0xad2ax1b.errorMessage) {
              if (_0xad2ax1b.errorMessage.indexOf('结束') > -1) {
                $.activityEnd = true;
              }

              ;
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax1b.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
        }

        ;
        break;

      case 'getOpenCardStatusWithOutSelf':
        if (typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b.isOk) {
            $.openStatus = _0xad2ax1b.openCard || false;
          } else {
            if (_0xad2ax1b.errorMessage || _0xad2ax1b.msg) {
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax1b.errorMessage || _0xad2ax1b.msg || ''}${''}`);
            } else {
              console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xad2axf}${' '}${_0xad2ax19}${''}`);
        }

        ;
        break;

      case 'accessLogWithAD':
        ;

      case 'drawContent':
        break;

      default:
        console.log(`${''}${_0xad2axf}${'-> '}${_0xad2ax19}${''}`);
    }

    ;

    if (typeof _0xad2ax1b == 'object') {
      if (_0xad2ax1b.errorMessage) {
        if (_0xad2ax1b.errorMessage.indexOf('火爆') > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function getPostRequest(_0xad2ax1d, _0xad2ax11, _0xad2ax12 = 'POST') {
  let _0xad2ax1e = {
    "Accept": 'application/json',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    "Connection": 'keep-alive',
    "Content-Type": 'application/x-www-form-urlencoded',
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": 'XMLHttpRequest'
  };

  if (_0xad2ax1d.indexOf('https://lzkjdz-isv.isvjcloud.com') > -1) {
    _0xad2ax1e.Referer = `${'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`;
    _0xad2ax1e.Cookie = `${''}${''}${''}${$.Pin && 'AUTH_C_USER=' + $.Pin + ';' || ''}${''}${''}${''}`;
  }

  ;
  return {
    url: _0xad2ax1d,
    method: _0xad2ax12,
    headers: _0xad2ax1e,
    body: _0xad2ax11,
    timeout: 30000
  };
}

function getSimpleActInfoVo() {
  return new Promise(_0xad2ax16 => {
    let _0xad2ax20 = {
      url: `${'https://lzkjdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=2201100037643108'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xad2ax20, async (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        if (_0xad2ax17) {
          if (_0xad2ax18 && typeof _0xad2ax18.statusCode != 'undefined') {
            if (_0xad2ax18.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xad2ax17)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0xad2ax1b = $.toObj(_0xad2ax19, _0xad2ax19);

          if (typeof _0xad2ax1b == 'object') {
            if (_0xad2ax1b.result && _0xad2ax1b.result === true) {
              $.endTime = _0xad2ax1b.data.endTime || 0;
              $.startTimes = _0xad2ax1b.data.startTime || Date.now();
            } else {
              if (_0xad2ax1b.errorMessage) {
                console.log(`${''}${_0xad2ax1b.errorMessage || ''}${''}`);
              } else {
                console.log(`${''}${_0xad2ax19}${''}`);
              }
            }
          } else {
            console.log(`${''}${_0xad2ax19}${''}`);
          }
        }
      } catch (e) {
        $.logErr(e, _0xad2ax18);
      } finally {
        _0xad2ax16();
      }
    });
  });
}

function getCk() {
  return new Promise(_0xad2ax16 => {
    let _0xad2ax20 = {
      url: `${'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjcloud.com/m/1000376431/99/'}${$.activityId}${'/?helpUuid='}${$.shareUuid}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xad2ax20, async (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        if (_0xad2ax17) {
          if (_0xad2ax18 && typeof _0xad2ax18.statusCode != 'undefined') {
            if (_0xad2ax18.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xad2ax17)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0xad2ax22 = _0xad2ax19.match(/(活动已经结束)/) && _0xad2ax19.match(/(活动已经结束)/)[0x1] || '';

          if (_0xad2ax22) {
            $.activityEnd = true;
            console.log('活动已结束');
          }

          ;
          setActivityCookie(_0xad2ax18);
        }
      } catch (e) {
        $.logErr(e, _0xad2ax18);
      } finally {
        _0xad2ax16();
      }
    });
  });
}

function setActivityCookie(_0xad2ax18) {
  if (_0xad2ax18.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0xad2ax24 of _0xad2ax18.headers['set-cookie']) {
      lz_cookie[_0xad2ax24.split(';')[0x0].substr(0, _0xad2ax24.split(';')[0x0].indexOf('='))] = _0xad2ax24.split(';')[0x0].substr(_0xad2ax24.split(';')[0x0].indexOf('=') + 1);
    }

    ;

    for (const _0xad2ax25 of Object.keys(lz_cookie)) {
      cookie += _0xad2ax25 + '=' + lz_cookie[_0xad2ax25] + ';';
    }

    ;
    activityCookie = cookie;
  }
}

async function getUA() {
  $.UA = `${'jdapp;iPhone;10.1.4;13.1.2;'}${randomString(40)}${';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}`;
}

function randomString(_0xad2ax9) {
  _0xad2ax9 = _0xad2ax9 || 32;
  let _0xad2ax29 = 'abcdef0123456789'.length,
      _0xad2ax2a = '';

  for (i = 0; i < _0xad2ax9; i++) {
    _0xad2ax2a += 'abcdef0123456789'.charAt(Math.floor(Math.random() * _0xad2ax29));
  }

  ;
  return _0xad2ax2a;
}

async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }

  ;
  return new Promise(async _0xad2ax16 => {
    $.errorJoinShop = '活动太火爆，请稍后再试';
    let _0xad2ax2c = `${''}`;

    if ($.shopactivityId) {
      _0xad2ax2c = `${',"activityId":'}${$.shopactivityId}${''}`;
    }

    ;
    let _0xad2ax11 = `${'{"venderId":"'}${$.joinVenderId}${'","shopId":"'}${$.joinVenderId}${'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'}${_0xad2ax2c}${',"channel":406}'}`;

    let _0xad2ax2d = await geth5st();

    const _0xad2ax2e = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='}${_0xad2ax11}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0xad2ax2d}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0xad2ax2e, async (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        _0xad2ax19 = _0xad2ax19 && _0xad2ax19.match(/jsonp_.*?\((.*?)\);/) && _0xad2ax19.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0xad2ax19;

        let _0xad2ax1b = $.toObj(_0xad2ax19, _0xad2ax19);

        if (_0xad2ax1b && typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b && _0xad2ax1b.success === true) {
            console.log(_0xad2ax1b.message);
            $.errorJoinShop = _0xad2ax1b.message;

            if (_0xad2ax1b.result && _0xad2ax1b.result.giftInfo) {
              for (let _0xad2axa of _0xad2ax1b.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0xad2axa.discountString}${''}${_0xad2axa.prizeName}${''}${_0xad2axa.secondLineDesc}${''}`);
              }
            }
          } else {
            if (_0xad2ax1b && typeof _0xad2ax1b == 'object' && _0xad2ax1b.message) {
              $.errorJoinShop = _0xad2ax1b.message;
              console.log(`${''}${_0xad2ax1b.message || ''}${''}`);
            } else {
              console.log(_0xad2ax19);
            }
          }
        } else {
          console.log(_0xad2ax19);
        }
      } catch (e) {
        $.logErr(e, _0xad2ax18);
      } finally {
        _0xad2ax16();
      }
    });
  });
}

async function getshopactivityId() {
  return new Promise(async _0xad2ax16 => {
    let _0xad2ax11 = `${'{"venderId":"'}${$.joinVenderId}${'","channel":406,"payUpShop":true}'}`;

    let _0xad2ax2d = await geth5st();

    const _0xad2ax2e = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='}${_0xad2ax11}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0xad2ax2d}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0xad2ax2e, async (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        _0xad2ax19 = _0xad2ax19 && _0xad2ax19.match(/jsonp_.*?\((.*?)\);/) && _0xad2ax19.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0xad2ax19;

        let _0xad2ax1b = $.toObj(_0xad2ax19, _0xad2ax19);

        if (_0xad2ax1b && typeof _0xad2ax1b == 'object') {
          if (_0xad2ax1b && _0xad2ax1b.success == true) {
            console.log(`${'入会:'}${_0xad2ax1b.result.shopMemberCardInfo.venderCardName || ''}${''}`);
            $.shopactivityId = _0xad2ax1b.result.interestsRuleList && _0xad2ax1b.result.interestsRuleList[0x0] && _0xad2ax1b.result.interestsRuleList[0x0].interestsInfo && _0xad2ax1b.result.interestsRuleList[0x0].interestsInfo.activityId || '';
          }
        } else {
          console.log(_0xad2ax19);
        }
      } catch (e) {
        $.logErr(e, _0xad2ax18);
      } finally {
        _0xad2ax16();
      }
    });
  });
}

function getAuthorCodeList(_0xad2ax1d) {
  return new Promise(_0xad2ax16 => {
    const _0xad2ax2e = {
      url: `${''}${_0xad2ax1d}${'?'}${new Date()}${''}`,
      "timeout": 10000,
      headers: {
        "User-Agent": 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'
      }
    };
    $.get(_0xad2ax2e, async (_0xad2ax17, _0xad2ax18, _0xad2ax19) => {
      try {
        if (_0xad2ax17) {
          $.log(_0xad2ax17);
        } else {
          if (_0xad2ax19) {
            _0xad2ax19 = JSON.parse(_0xad2ax19);
          }
        }
      } catch (e) {
        $.logErr(e, _0xad2ax18);
        _0xad2ax19 = null;
      } finally {
        _0xad2ax16(null);
      }
    });
  });
}

function jsonParse(_0xad2ax32) {
  if (typeof _0xad2ax32 == 'string') {
    try {
      return JSON.parse(_0xad2ax32);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
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

