/**
微定制瓜分京豆-加密

目前实现：

1.指定首位账号即指定PIN变量：（京东用户名）：
//export jd_wdz_pin="pin值"  (不填写，默认首位账号以 jd_wdz_mixnu 为准)

2.指定从账号几跑到账号几变量：(jd_wdz_mixnu代表开始，jd_wdz_maxnum代表结束)
//export jd_wdz_mixnum="0" 0代表青龙排位为1的账号
//export jd_wdz_maxnum="90"

PS：jd_wdz_maxnum必须大于jd_wdz_mixnum  才能生效  不填写默认运行0-90账号

3.活动进度条剩余 0 时 或者 京豆剩余数量小于 50 时，自动退出脚本。

4.当指定账号或者首位账号奖励满了将自动退出脚本。

5.每运行 5 个账号休息 10 秒钟，避免493

6.IP被限流自动退出脚本、账号是黑号自动跳过。

7.优化大量重复请求。


必须条件：配置文件或者环境变量中添加变量：
## 微定制瓜分京豆-jd_wdz.js
//export jd_wdz_activityId="活动ID"
//export jd_wdz_activityUrl="https://cjhydz-isv.isvjcloud.com"

cron:7 7 7 7 *
============Quantumultx===============
[task_local]
#微定制瓜分京豆-加密
7 7 7 7 * jd_wdz.js, tag=微定制瓜分京豆-加密, enabled=true
*/

let jd_wdz_activityId="" // 活动ID
let jd_wdz_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

const $ = new Env("微定制瓜分京豆-加密");

const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jd Cookie.js') : '';
let lz_cookie = {};
let activityCookie = '';
let mixnum = 0;
let maxnum = 90;
let pin = '';
$.activityEnd = false;
let cookiesArr = [],
    cookie = '';
activityId = $.getdata('jd_kr_wdz_activityId') ? $.getdata('jd_kr_wdz_activityId') : jd_wdz_activityId;
activityUrl = $.getdata('jd_kr_wdz_activityUrl') ? $.getdata('jd_kr_wdz_activityUrl') : jd_wdz_activityUrl;

if ($.isNode()) {
  if (process.env.jd_wdz_activityId) {
    activityId = process.env.jd_wdz_activityId;
  }


  if (process.env.jd_wdz_activityUrl) {
    activityUrl = process.env.jd_wdz_activityUrl;
  }


  if (process.env.jd_wdz_pin) {
    pin = process.env.jd_wdz_pin;
  }


  if (process.env.jd_wdz_mixnum) {
    mixnum = process.env.jd_wdz_mixnum;
  }


  if (process.env.jd_wdz_maxnum) {
    maxnum = process.env.jd_wdz_maxnum;
  }


  if (JSON.stringify(process.env).indexOf('GITHUB') > -0x1) {
    process.exit(0);
  }

  Object.keys(jdCookieNode).forEach(_0x6328xc => {
    cookiesArr.push(jdCookieNode[_0x6328xc]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...$.toObj($.getdata('CookiesJD') || '[]').map(_0x6328xc => {
    return _0x6328xc.cookie;
  })].filter(_0x6328xc => {
    return !!_0x6328xc;
  });
}


if (pin) {
  const idx = cookiesArr.findIndex(_0x6328xe => {
    return _0x6328xe.includes(pin);
  });
  const currentCookie = cookiesArr.splice(idx, 1);
  cookiesArr = [...currentCookie, ...cookiesArr.slice(mixnum, maxnum)];
  console.log('\n✪✪本次实际运行' + cookiesArr.length + '个京东账号✪✪\n');
} else {
  cookiesArr = [...cookiesArr.slice(mixnum, maxnum)];
  console.log('\n✪✪本次实际运行' + cookiesArr.length + '个京东账号✪✪\n');
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

  console.log('♚♚活动入口♚♚\nhttps://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index/8882761?activityId=' + activityId);
  console.log('\n✿✿当前指定首位账号✿✿ ：' + pin + '\n❤❤当前指定从账号' + mixnum + '运行至账号' + maxnum + '停止❤❤');

  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/'
    });
    return;
  }


  for (let _0x6328x12 = 0; _0x6328x12 < cookiesArr.length; _0x6328x12++) {
    if (cookiesArr[_0x6328x12]) {
      cookie = cookiesArr[_0x6328x12];
      originCookie = cookiesArr[_0x6328x12];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[0x1]);
      $.index = _0x6328x12 + 1;
      $.isLogin = true;
      $.nickName = '';
      console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n');

      if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
          'open-url': 'https://bean.m.jd.com/'
        });

        if ($.isNode()) {
          await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
      }

      await getUA();
      await wdz();
      await $.wait(2000);

      if ($.residualPercentageEnd || $.maxinviterGetBeans || $.outFlag) {
        break;
      }
    }
  }
})().catch(_0x6328x11 => {
  $.log('', `${' '}${$.name}${', 失败! 原因: '}${_0x6328x11}${'!'}`, '');
}).finally(() => {
  $.done();
});

async function wdz() {
  $.sid = '';
  $.userId = '599119';
  $.Token = '';
  $.Pin = '';
  $.hisPin = '';
  $.card = [];
  await getCk();

  if ($.outFlag) {
    console.log('此ip已被限制，请过更换IP后或者等待一会儿再执行脚本\n');
    return;
  }

  await getToken();

  if ($.Token == '') {
    console.log('获取[token]失败！');
    return;
  }

  await $.wait(1000);

  if ($.userId) {
    await $.wait(1000);

    if ($.Token) {
      await getPin();
    }


    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    await accessLog();
    await $.wait(1000);
    await getOpenCardAllStatuesNew();
    await $.wait(1000);

    if ($.index === 1) {
      $.his = $.Pin;
      $.hisNickName = $.nickName;
      $.hisInviterImg = $.attrTouXiang;
      await getActivityInfo();

      if ($.residualPercentage <= 0 || $.beansResidueByDay <= 50) {
        return;
      }

      await inviteRecord();

      if ($.inviterGetBeans >= $.maxinviterGetBeans) {
        return;
      }
    }

    await joinTeam();
    await $.wait(2000);

    if ($.card.length > 0) {
      let _0x6328x12 = 0;

      do {
        $.errorJoinShop = '';
        await joinShop($.card[_0x6328x12]);

        if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
          console.log('第1次 重新开卡');
          await $.wait(500);
          await joinShop($.card[_0x6328x12]);
        }


        if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
          console.log('第2次 重新开卡');
          await $.wait(500);
          await joinShop($.card[_0x6328x12]);
        }


        if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1 && $.errorJoinShop.indexOf('加入店铺会员失败') > -1) {
          console.log('第3次 重新开卡');
          await $.wait(500);
          await joinShop($.card[_0x6328x12]);
        }

        await $.wait(500);
        _0x6328x12++;
      } while (_0x6328x12 < $.card.length);
    }

    await $.wait(2000);
    await getOpenCardAllStatuesNew();

    if ($.index % 5 == 0) {
      console.log('\n每运行 5 个账号休息 10 秒钟，避免493哦~~');
    }


    if ($.index % 5 == 0) {
      await $.wait(parseInt(Math.random() * 4000 + 10000, 10));
    }
  } else {
    console.log('【京东账号' + $.index + '】 未能获取活动信息');
  }
}

function showMsg() {
  return new Promise(_0x6328x15 => {
    $.msg($.name, '', '【京东账号' + $.index + '】' + $.nickName + '\n');

    _0x6328x15();
  });
}

function getSimpleActInfoVo() {
  return new Promise(_0x6328x15 => {
    let _0x6328x17 = `${'activityId='}${activityId}${''}`;
    $.post(taskPostUrl('/customer/getSimpleActInfoVo', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log(`${''}${$.toStr(_0x6328x18)}${''}`);
          console.log(`${''}${$.name}${' getSimpleActInfoVo API请求失败，请检查网路重试'}`);
        } else {}
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getCk() {
  return new Promise(_0x6328x15 => {
    let _0x6328x1c = {
      url: activityUrl + '/microDz/invite/activity/wx/view/index?activityId=' + activityId,
      headers: {
        Cookie: cookie,
        "User-Agent": $.UA
      }
    };
    $.get(_0x6328x1c, async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          if (_0x6328x19 && typeof _0x6328x19.statusCode != 'undefined') {
            if (_0x6328x19.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' cookie API请求失败，请检查网路重试');
        } else {
          if (_0x6328x19.status == 200) {
            refreshToken(_0x6328x19);
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getToken() {
  return new Promise(_0x6328x15 => {
    $.post(taskUrl('?functionId=isvObfuscator', 'body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f'), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' 2 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.code == 0 && _0x6328x1a.token) {
              $.Token = _0x6328x1a.token;
            } else {}
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getPin() {
  return new Promise(_0x6328x15 => {
    let _0x6328x17 = 'userId=' + $.userId + '&token=' + $.Token + '&fromType=APP';

    $.post(taskPostUrl('/customer/getMyPing', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' 3 API请求失败，请检查网路重试');
        } else {
          if (_0x6328x19.status == 200) {
            refreshToken(_0x6328x19);
          }


          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.result && _0x6328x1a.data) {
              $.Pin = _0x6328x1a.data.secretPin;
              $.AUTH_C_USER = $.Pin;
              $.attrTouXiang = _0x6328x1a.data.yunMidImageUrl ? _0x6328x1a.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
            } else {}
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function joinShop(_0x6328x20) {
  return new Promise(async _0x6328x15 => {
    $.joinVenderId = _0x6328x20.match(/venderId=(\d+)/)[0x1];
    console.log(`${'入会ID:'}${$.joinVenderId}${''}`);
    let _0x6328x17 = `${'{\n\t\t\t"venderId":"'}${$.joinVenderId}${'",\n\t\t\t"shopId":"'}${$.joinVenderId}${'",\n\t\t\t"bindByVerifyCodeFlag":1,\n\t\t\t"registerExtend":{},\n\t\t\t"writeChildFlag":0,\n\t\t\t"channel":401\n\t\t}'}`;
    $.errorJoinShop = '';
    await getshopactivityId();

    let _0x6328x23 = await geth5st();

    const _0x6328x1c = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='}${_0x6328x17}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x6328x23}${''}`,
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
    $.get(_0x6328x1c, async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        let _0x6328x24 = $.toObj(_0x6328x1a, _0x6328x1a);

        if (typeof _0x6328x24 == 'object') {
          if (_0x6328x24.success === true) {
            console.log(_0x6328x24.message);
            $.errorJoinShop = _0x6328x24.message;

            if (_0x6328x24.result && _0x6328x24.result.giftInfo) {
              for (let _0x6328x12 of _0x6328x24.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0x6328x12.discountString}${''}${_0x6328x12.prizeName}${''}${_0x6328x12.secondLineDesc}${''}`);
              }
            }
          } else {
            if (typeof _0x6328x24 == 'object' && _0x6328x24.message) {
              $.errorJoinShop = _0x6328x24.message;
              console.log(`${''}${_0x6328x24.message || ''}${''}`);
            } else {
              console.log(_0x6328x1a);
            }
          }
        } else {
          console.log(_0x6328x1a);
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getshopactivityId() {
  return new Promise(_0x6328x15 => {
    const _0x6328x1c = {
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
    $.get(_0x6328x1c, async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        let _0x6328x24 = $.toObj(_0x6328x1a, _0x6328x1a);

        if (typeof _0x6328x24 == 'object') {
          if (_0x6328x24.success == true) {
            console.log(`${'去加入店铺会员:'}${_0x6328x24.result.shopMemberCardInfo.venderCardName || ''}${''}`);
          }
        } else {
          console.log(_0x6328x1a);
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getUserInfo() {
  return new Promise(_0x6328x15 => {
    let _0x6328x17 = 'pin=' + encodeURIComponent(encodeURIComponent($.Pin));

    $.post(taskPostUrl('/wxActionCommon/getUserInfo', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' 6-1 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.result && _0x6328x1a.data) {
              $.attrTouXiang = _0x6328x1a.data.yunMidImageUrl ? _0x6328x1a.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
            } else {
              console.log('异常6-2：' + JSON.stringify(_0x6328x1a));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function inviteRecord() {
  return new Promise(_0x6328x15 => {
    let _0x6328x17 = `${'activityId='}${activityId}${'&inviter='}${encodeURIComponent(encodeURIComponent($.Pin))}${'&pageNo=1&pageSize=15&type=0'}`;
    $.post(taskPostUrl('/microDz/invite/activity/wx/inviteRecord', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + 'inviteRecord 请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.result && _0x6328x1a.data) {
              $.inviterGetBeans = _0x6328x1a.data.inviterGetBeans || 0;
              console.log(`${'当前已邀请人数：'}${_0x6328x1a.data.count}${''}`);
              console.log(`${'当前获得奖励：'}${_0x6328x1a.data.inviterGetBeans}${''}`);
              $.maxinviterGetBeans = parseInt($.teamNum * 50);

              if ($.inviterGetBeans >= $.maxinviterGetBeans) {
                console.log('太棒了，你已经活动了活动最大奖励，退出运行~');
                $.maxinviterGetBeans = true;
              }
            } else {
              console.log(JSON.stringify(_0x6328x1a));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getActivityInfo() {
  return new Promise(_0x6328x15 => {
    let _0x6328x17 = `${'activityId='}${activityId}${''}`;
    $.post(taskPostUrl('/microDz/invite/activity/wx/getActivityInfo', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + 'inviteRecord 请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.result && _0x6328x1a.data) {
              $.residualPercentage = _0x6328x1a.data.residualPercentage || 0;
              $.beansResidueByDay = _0x6328x1a.data.beansResidueByDay || 0;
              $.actRule = _0x6328x1a.data.actRule;
              $.teamNum = _0x6328x1a.data.actRule.match(/每人每天最多可组队(\d+)次/);

              if ($.teamNum) {
                $.teamNum = $.teamNum[0x1];
              } else {
                $.teamNum = 10;
              }

              ;
              console.log(`${'当前活动开卡ID：'}` + _0x6328x1a.data.venderIds.replace(/\,/g, '&'));
              console.log(`${'当前活动剩余：'}${_0x6328x1a.data.residualPercentage}${''}`);
              console.log(`${'当日剩余京豆数：'}${$.beansResidueByDay}${''}`);
              console.log('当前活动最多组队:' + $.teamNum + '次');

              if ($.residualPercentage <= 0 || $.beansResidueByDay <= 50) {
                console.log('活动已无奖励啦，退出运行~');
                $.residualPercentageEnd = true;
              }
            } else {
              console.log(JSON.stringify(_0x6328x1a));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function joinTeam(_0x6328x2a = 0x0) {
  return new Promise(_0x6328x15 => {
    let pin = encodeURIComponent($.Pin);

    let _0x6328x2b = encodeURIComponent(encodeURIComponent($.his));

    if (_0x6328x2a == 1) {
      pin = encodeURIComponent(encodeURIComponent($.Pin));
    }

    let _0x6328x17 = `${'activityId='}${activityId}${'&inviterNick='}${encodeURIComponent($.hisNickName)}${'&inviteeNick='}${encodeURIComponent($.nickName)}${'&inviter='}${_0x6328x2b}${'&invitee='}${pin}${'&inviterImg='}${encodeURIComponent($.hisInviterImg)}${'&inviteeImg='}${encodeURIComponent($.attrTouXiang)}${''}`;
    $.post(taskPostUrl('/microDz/invite/activity/wx/acceptInvite', _0x6328x17), async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + 'joinTeam 请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.result && _0x6328x1a.data) {
              $.log('加入队伍成功');
            } else {
              if (_0x6328x1a.errorMessage.indexOf('店铺会员') > -1 && _0x6328x2a != 3) {
                $.errorJoinShop = '';
                await joinShop();
                await joinTeam(3);
              } else {
                if (_0x6328x1a.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x6328x2a == 0) {
                  await joinTeam(1);
                } else {
                  console.log(_0x6328x1a.errorMessage || '');

                  if (_0x6328x1a.errorMessage.includes('奖品发送完毕')) {
                    process.exit(1);
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function getOpenCardAllStatuesNew() {
  return new Promise(_0x6328x15 => {
    let _0x6328x1c = {
      url: `${'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/getOpenCardAllStatuesNew'}`,
      headers: {
        cookie: ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.Pin,
        Connection: `${'keep-alive'}`,
        "Accept-Encoding": `${'gzip, deflate, br'}`,
        "Content-Type": `${'application/x-www-form-urlencoded; charset=UTF-8'}`,
        "User-Agent": $.UA,
        "Accept-Language": `${'zh-cn'}`,
        Referer: `${'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index?activityId='}${activityId}${''}`,
        Accept: `${'application/json, text/javascript, */*; q=0.01'}`
      },
      body: `${'isInvited=1&activityId='}${activityId}${'&pin='}${encodeURIComponent(encodeURIComponent($.Pin))}${''}`
    };
    $.post(_0x6328x1c, async (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' 1 API请求失败，请检查网路重试');
        } else {
          if (_0x6328x1a && safeGet(_0x6328x1a)) {
            _0x6328x1a = JSON.parse(_0x6328x1a);

            if (_0x6328x1a.data && _0x6328x1a.data.isCanJoin) {
              (_0x6328x1a.data.list || []).forEach(_0x6328xe => {
                if (_0x6328xe.openCardLink) {
                  $.card.push(_0x6328xe.openCardLink);
                }
              });
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function taskPostUrl(_0x6328x2e, _0x6328x17) {
  return {
    url: '' + activityUrl + _0x6328x2e,
    body: _0x6328x17,
    headers: {
      Accept: 'application/json',
      "Accept-Encoding": 'gzip, deflate, br',
      "Accept-Language": 'zh-cn',
      Connection: 'keep-alive',
      Host: `${'cjhydz-isv.isvjcloud.com'}`,
      Origin: `${'https://cjhydz-isv.isvjcloud.com'}`,
      "Content-Type": 'application/x-www-form-urlencoded',
      Referer: activityUrl + '/microDz/invite/activity/wx/view/index?activityId=' + activityId,
      Cookie: cookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}

function taskUrl(_0x6328x2e, _0x6328x17) {
  return {
    url: 'https://api.m.jd.com/client.action' + _0x6328x2e,
    body: _0x6328x17,
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

function accessLog() {
  return new Promise(async _0x6328x15 => {
    const _0x6328x1c = {
      url: `${'https://cjhydz-isv.isvjcloud.com/common/accessLog'}`,
      headers: {
        Accept: 'application/json',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        Connection: 'keep-alive',
        Host: `${'cjhydz-isv.isvjcloud.com'}`,
        Origin: `${'https://cjhydz-isv.isvjcloud.com'}`,
        "Content-Type": 'application/x-www-form-urlencoded',
        Referer: activityUrl + '/microDz/invite/activity/wx/view/index?activityId=' + activityId,
        Cookie: cookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
        "User-Agent": $.UA
      },
      body: `${'venderId=1&code=99&pin='}${encodeURIComponent(encodeURIComponent($.Pin))}${'&activityId='}${activityId}${'&pageUrl=https%3A%2F%2F$cjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'}${activityId}${'&subType=app'}`
    };
    $.post(_0x6328x1c, (_0x6328x18, _0x6328x19, _0x6328x1a) => {
      try {
        if (_0x6328x18) {
          console.log('' + JSON.stringify(_0x6328x18));
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x6328x19.status == 200) {
            refreshToken(_0x6328x19);
          }
        }
      } catch (e) {
        $.logErr(e, _0x6328x19);
      } finally {
        _0x6328x15();
      }
    });
  });
}

function refreshToken(_0x6328x19) {
  if (_0x6328x19.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0x6328x32 of _0x6328x19.headers['set-cookie']) {
      lz_cookie[_0x6328x32.split(';')[0x0].substr(0, _0x6328x32.split(';')[0x0].indexOf('='))] = _0x6328x32.split(';')[0x0].substr(_0x6328x32.split(';')[0x0].indexOf('=') + 1);
    }


    for (const _0x6328x33 of Object.keys(lz_cookie)) {
      cookie += _0x6328x33 + '=' + lz_cookie[_0x6328x33] + ';';
    }

    activityCookie = cookie;
  }
}

function getUA() {
  $.UA = `${'jdapp;iPhone;10.2.2;14.3;'}${randomString(40)}${';M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;'}`;
}

function randomString(_0x6328x11) {
  _0x6328x11 = _0x6328x11 || 32;
  let _0x6328x37 = 'abcdef0123456789'.length,
      _0x6328x38 = '';

  for (i = 0; i < _0x6328x11; i++) {
    _0x6328x38 += 'abcdef0123456789'.charAt(Math.floor(Math.random() * _0x6328x37));
  }

  return _0x6328x38;
}

function safeGet(_0x6328x1a) {
  try {
    if (typeof JSON.parse(_0x6328x1a) == 'object') {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`${'京东服务器访问数据为空，请检查自身设备网络情况'}`);
    return false;
  }
}

function jsonParse(_0x6328x3b) {
  if (typeof _0x6328x3b == 'string') {
    try {
      return JSON.parse(_0x6328x3b);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
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