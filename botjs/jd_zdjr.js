/*

一共有2个变量
jd_zdjr_activityId  活动ID 必需
jd_zdjr_activityUrl 活动地址 必需

已适配docker

加密脚本

需要配合重写获取=>活动id、活动地址

https://\w+-isv.isvjcloud.com/wxTeam/shopInfo url script-request-body jd_zdjr.js

mitm
*-isv.isvjcloud.com
[task_local]
组队瓜分京豆
40 11 * * * jd_zdjr.js, tag=组队瓜分京豆, enabled=true
================Loon==============
[Script]
cron "40 11 * * *" script-path=jd_zdjr.js,tag=组队瓜分京豆

*/

let jd_zdjr_activityId = ''// 活动ID
let jd_zdjr_activityUrl = ''// 活动地址
const $ = new Env('LZ组队瓜分京豆');

const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let lz_cookie = {};
let cookiesArr = [],
    cookie = '',
    message = '',
    messageTitle = '';
activityId = $.getdata('jd_kr_zdjr_activityId') ? $.getdata('jd_kr_zdjr_activityId') : jd_zdjr_activityId;
activityUrl = $.getdata('jd_kr_zdjr_activityUrl') ? $.getdata('jd_kr_zdjr_activityUrl') : jd_zdjr_activityUrl;
let activityCookie = '';

if ($.isNode()) {
  if (process.env.jd_zdjr_activityId) {
    activityId = process.env.jd_zdjr_activityId;
  }


  if (process.env.jd_zdjr_activityUrl) {
    activityUrl = process.env.jd_zdjr_activityUrl;
  }

  Object.keys(jdCookieNode).forEach(_0x5a88x9 => {
    cookiesArr.push(jdCookieNode[_0x5a88x9]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }


  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) {
    process.exit(0);
  }
} else {
  let cookiesData = $.getdata('CookiesJD') || '[]';
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x5a88x9 => {
    return _0x5a88x9.cookie;
  });
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x5a88x9 => {
    return !!_0x5a88x9;
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

  console.log('【当前活动入口】\nhttps://lzkjdz-isv.isvjd.com/wxTeam/activity2/activity?activityId=' + activityId);

  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/'
    });
    return;
  }

  $.memberCount = 0;
  messageTitle += '活动id:\n' + activityId + '\n';
  $.toactivity = true;

  for (let _0x5a88xe = 0; _0x5a88xe < cookiesArr.length; _0x5a88xe++) {
    if (cookiesArr[_0x5a88xe]) {
      cookie = cookiesArr[_0x5a88xe];
      originCookie = cookiesArr[_0x5a88xe];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[0x1]);
      $.index = _0x5a88xe + 1;
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

      await getUA();
      await jrzd();

      if (!$.toactivity || $.maxTeam) {
        break;
      }
    }
  }

  messageTitle += '队伍人数 ' + $.memberCount + '\n';
  await showMsg();
})().catch(_0x5a88xd => {
  $.log('', `${' '}${$.name}${', 失败! 原因: '}${_0x5a88xd}${'!'}`, '');
}).finally(() => {
  $.done();
});

async function jrzd() {
  $.sid = '', $.userId = '', $.Token = '', $.Pin = '';
  $.saveTeam = false;
  await getCk();
  await getshopInfo();

  if ($.sid && $.userId) {
    await getToken();

    if ($.Token) {
      await getPin();
    }


    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    await getUserInfo();
    await $.wait(500);
    await getOpenCardInfo();
    await getTeam();
    await $.wait(1000);

    if ($.maxTeam) {
      console.log('队伍已满员');
      return;
    }
  } else {
    console.log('【京东账号' + $.index + '】 未能获取活动信息');
    message += '【京东账号' + $.index + '】 未能获取活动信息\n';
  }
}

async function getUA() {
  $.UA = `${'jdapp;iPhone;10.1.4;13.1.2;'}${randomString(40)}${';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}`;
}

function randomString(_0x5a88xd) {
  _0x5a88xd = _0x5a88xd || 32;
  let _0x5a88x13 = 'abcdef0123456789'.length,
      _0x5a88x14 = '';

  for (i = 0; i < _0x5a88xd; i++) {
    _0x5a88x14 += 'abcdef0123456789'.charAt(Math.floor(Math.random() * _0x5a88x13));
  }

  return _0x5a88x14;
}

function showMsg() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x17 = openAppUrl();

    console.log('运行完毕');
    console.log(_0x5a88x17);
    $.msg($.name, '' + $.shopName, '' + messageTitle + message + ' \n点击弹窗跳转到京东APP活动页面', {
      'open-url': _0x5a88x17
    });

    _0x5a88x16();
  });
}

function openAppUrl() {
  let _0x5a88x19 = activityUrl + '/wxTeam/activity?activityId=' + activityId;

  let _0x5a88x1a = _0x5a88x19;

  if (_0x5a88x19.substr(0, 5) === 'https') {
    let _0x5a88x1b = {
      'category': 'jump',
      'des': 'getCoupon',
      'url': _0x5a88x19.substr(8)
    };
    _0x5a88x1a = 'openApp.jdMobile://virtual?params=' + encodeURIComponent(JSON.stringify(_0x5a88x1b));
  } else {
    if (_0x5a88x19.substr(0, 4) === 'http') {
      let _0x5a88x1c = {
        'category': 'jump',
        'des': 'getCoupon',
        'url': _0x5a88x19.substr(7)
      };
      _0x5a88x1a = 'openApp.jdMobile://virtual?params=' + encodeURIComponent(JSON.stringify(_0x5a88x1c));
    }
  }

  return _0x5a88x1a;
}

function getCk() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x1e = {
      url: `${'https://lzkjdz-isv.isvjd.com/wxTeam/activity?activityId='}${$.activityId}${'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkjdz-isv.isvjd.com/wxTeam/activity?activityId='}${$.activityId}${'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0'}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x5a88x1e, async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log(`${''}${$.toStr(_0x5a88x1f)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          setActivityCookie(_0x5a88x20);
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function setActivityCookie(_0x5a88x20) {
  if (_0x5a88x20.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0x5a88x23 of _0x5a88x20.headers['set-cookie']) {
      lz_cookie[_0x5a88x23.split(';')[0x0].substr(0, _0x5a88x23.split(';')[0x0].indexOf('='))] = _0x5a88x23.split(';')[0x0].substr(_0x5a88x23.split(';')[0x0].indexOf('=') + 1);
    }


    for (const _0x5a88x24 of Object.keys(lz_cookie)) {
      cookie += _0x5a88x24 + '=' + lz_cookie[_0x5a88x24] + ';';
    }

    activityCookie = cookie;
  }
}

function getToken() {
  return new Promise(_0x5a88x16 => {
    $.post(taskUrl('?functionId=isvObfuscator', 'body=%7B%22url%22%3A%22https%3A%2F%2Flzkj-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=1d9f7760c9ffaad4eb&client=apple&clientVersion=10.0.10&st=1646999134752&sv=112&sign=d14c9517190f8a8b0e253e3dbbdee87a'), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 2 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.code == 0 && _0x5a88x21.token) {
              $.Token = _0x5a88x21.token;
            } else {
              console.log('异常2：' + JSON.stringify(_0x5a88x21));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function getPin() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x26 = 'userId=' + $.userId + '&token=' + $.Token + '&fromType=APP';

    $.post(taskPostUrl('/customer/getMyPing', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x20.status == 200) {
          setActivityCookie(_0x5a88x20);
        }


        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 3 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              $.Pin = _0x5a88x21.data.secretPin;
            } else {
              console.log('异常3：' + JSON.stringify(_0x5a88x21));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function getshopInfo() {
  return new Promise(_0x5a88x16 => {
    $.post(taskPostUrl('/wxTeam/shopInfo', 'activityId=' + activityId), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 1 API请求失败，请检查网路重试');
        } else {
          if (_0x5a88x21 && safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.data) {
              $.sid = _0x5a88x21.data.sid;
              $.userId = _0x5a88x21.data.userId;
              $.shopName = _0x5a88x21.data.shopName;
            } else {
              console.log('异常1：' + JSON.stringify(_0x5a88x21));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function getOpenCardInfo() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x26 = `${'venderId='}${$.userId}${'&activityId='}${activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
    $.post(taskPostUrl('/wxCommonInfo/getActMemberInfo', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + 'API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              if (_0x5a88x21.data.openCardUrl) {
                $.channel = _0x5a88x21.data.openCardUrl.match(/channel=(\d+)/)[0x1];
                $.joinVenderId = _0x5a88x21.data.openCardUrl.match(/venderId=(\d+)/)[0x1];
              } else {}
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }

  return new Promise(async _0x5a88x16 => {
    $.errorJoinShop = '活动太火爆，请稍后再试';
    let _0x5a88x2c = `${''}`;

    if ($.shopactivityId) {
      _0x5a88x2c = `${',"activityId":'}${$.shopactivityId}${''}`;
    }

    let _0x5a88x26 = `${'{"venderId":"'}${$.joinVenderId}${'","shopId":"'}${$.joinVenderId}${'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'}${_0x5a88x2c}${',"channel":406}'}`;

    let _0x5a88x2d = await geth5st();

    const _0x5a88x2e = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='}${_0x5a88x26}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x5a88x2d}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0x5a88x2e, async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        _0x5a88x21 = _0x5a88x21 && _0x5a88x21.match(/jsonp_.*?\((.*?)\);/) && _0x5a88x21.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0x5a88x21;

        let _0x5a88x2f = $.toObj(_0x5a88x21, _0x5a88x21);

        if (_0x5a88x2f && typeof _0x5a88x2f == 'object') {
          if (_0x5a88x2f && _0x5a88x2f.success === true) {
            console.log(_0x5a88x2f.message);
            $.errorJoinShop = _0x5a88x2f.message;

            if (_0x5a88x2f.result && _0x5a88x2f.result.giftInfo) {
              for (let _0x5a88xe of _0x5a88x2f.result.giftInfo.giftList) {
                console.log(`${'入会获得:'}${_0x5a88xe.discountString}${''}${_0x5a88xe.prizeName}${''}${_0x5a88xe.secondLineDesc}${''}`);
              }
            }
          } else {
            if (_0x5a88x2f && typeof _0x5a88x2f == 'object' && _0x5a88x2f.message) {
              $.errorJoinShop = _0x5a88x2f.message;
              console.log(`${''}${_0x5a88x2f.message || ''}${''}`);
            } else {
              console.log(_0x5a88x21);
            }
          }
        } else {
          console.log(_0x5a88x21);
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

async function getshopactivityId() {
  return new Promise(async _0x5a88x16 => {
    let _0x5a88x26 = `${'{"venderId":"'}${$.joinVenderId}${'","channel":406,"payUpShop":true}'}`;

    let _0x5a88x2d = await geth5st();

    const _0x5a88x2e = {
      url: `${'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='}${_0x5a88x26}${'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='}${_0x5a88x2d}${''}`,
      headers: {
        'accept': '*/*',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'cookie': cookie,
        'origin': 'https://shopmember.m.jd.com/',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
      }
    };
    $.get(_0x5a88x2e, async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        _0x5a88x21 = _0x5a88x21 && _0x5a88x21.match(/jsonp_.*?\((.*?)\);/) && _0x5a88x21.match(/jsonp_.*?\((.*?)\);/)[0x1] || _0x5a88x21;

        let _0x5a88x2f = $.toObj(_0x5a88x21, _0x5a88x21);

        if (_0x5a88x2f && typeof _0x5a88x2f == 'object') {
          if (_0x5a88x2f && _0x5a88x2f.success == true) {
            console.log(`${'入会:'}${_0x5a88x2f.result.shopMemberCardInfo.venderCardName || ''}${''}`);
            $.shopactivityId = _0x5a88x2f.result.interestsRuleList && _0x5a88x2f.result.interestsRuleList[0x0] && _0x5a88x2f.result.interestsRuleList[0x0].interestsInfo && _0x5a88x2f.result.interestsRuleList[0x0].interestsInfo.activityId || '';
          }
        } else {
          console.log(_0x5a88x21);
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function getUserInfo() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x26 = 'pin=' + encodeURIComponent($.Pin);

    $.post(taskPostUrl('/wxActionCommon/getUserInfo', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 6-1 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              $.attrTouXiang = _0x5a88x21.data.yunMidImageUrl ? _0x5a88x21.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
            } else {
              console.log('异常6-2：' + JSON.stringify(_0x5a88x21));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function getTeam() {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x26 = 'activityId=' + activityId + '&pin=' + encodeURIComponent($.Pin);

    if ($.signUuid) {
      _0x5a88x26 += '&signUuid=' + $.signUuid;
    }

    $.post(taskPostUrl('/wxTeam/activityContent', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 5 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              if (new Date(_0x5a88x21.data.active.endTimeStr.replace(/-/g, '/')).getTime() < new Date().getTime()) {
                $.toactivity = false;
                console.log('活动结束');
                messageTitle += '活动结束\n';

                _0x5a88x16();
              } else {
                if (!_0x5a88x21.data.canCreate && _0x5a88x21.data.list == null) {
                  message += '人数已满\n';
                }


                if (_0x5a88x21.data.share) {
                  $.memberCount = parseInt(_0x5a88x21.data.share.memberCount, 10) + 1;
                } else {
                  $.memberCount = 0;
                }


                if ($.index == 1) {
                  $.saveTeam = true;
                  $.teamNum = _0x5a88x21.data.active.actRule.match(/最多可以组建(\d+)个战队/);

                  if ($.teamNum) {
                    $.teamNum = $.teamNum[0x1];
                    messageTitle += '最多可以组建' + $.teamNum + '个战队';
                  }
                }


                if ($.signUuid) {
                  $.log('加入队伍 id: ' + $.signUuid);
                  await joinTeam();
                }


                if ($.saveTeam) {
                  if (_0x5a88x21.data.canCreate) {
                    await saveTeam();
                  } else {
                    $.signUuid = _0x5a88x21.data.signUuid;
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
              console.log('异常5：' + JSON.stringify(_0x5a88x21));
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16(_0x5a88x16);
      }
    });
  });
}

function saveTeam(_0x5a88x34 = 0x0) {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x35 = encodeURIComponent($.Pin);

    if (_0x5a88x34 == 1) {
      _0x5a88x35 = encodeURIComponent($.Pin);
    }


    let _0x5a88x26 = 'activityId=' + activityId + '&pin=' + _0x5a88x35 + '&pinImg=' + encodeURIComponent($.attrTouXiang);

    $.post(taskPostUrl('/wxTeam/saveCaptain', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 6 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              message += '【京东账号' + $.index + '】 创建队伍id: ' + _0x5a88x21.data.signUuid + ' ';
              console.log('创建队伍成功 id: ' + _0x5a88x21.data.signUuid);
              $.signUuid = _0x5a88x21.data.signUuid;
              messageTitle += '队伍id: ' + $.signUuid + ' ';
            } else {
              console.log('异常6：' + JSON.stringify(_0x5a88x21));

              if (_0x5a88x21.errorMessage.indexOf('店铺会员') > -1 && _0x5a88x34 != 3) {
                $.errorJoinShop = '';
                await joinShop();

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
                  console.log('第1次 重新开卡');
                  await $.wait(1000);
                  await joinShop();
                }

                await saveTeam(3);
              } else {
                if (_0x5a88x21.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x5a88x34 == 0) {
                  await saveTeam(1);
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function joinTeam(_0x5a88x34 = 0x0) {
  return new Promise(_0x5a88x16 => {
    let _0x5a88x35 = encodeURIComponent($.Pin);

    if (_0x5a88x34 == 1) {
      _0x5a88x35 = encodeURIComponent($.Pin);
    }


    let _0x5a88x26 = 'activityId=' + activityId + '&signUuid=' + $.signUuid + '&pin=' + _0x5a88x35 + '&pinImg=' + encodeURIComponent($.attrTouXiang);

    $.post(taskPostUrl('/wxTeam/saveMember', _0x5a88x26), async (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' 7 API请求失败，请检查网路重试');
        } else {
          if (safeGet(_0x5a88x21)) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.result && _0x5a88x21.data) {
              message += '【京东账号' + $.index + '】 加入队伍\n';
              $.log('加入队伍成功');
            } else {
              if (_0x5a88x21.errorMessage.indexOf('店铺会员') > -1 && _0x5a88x34 != 3) {
                $.errorJoinShop = '';
                await joinShop();

                if ($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
                  console.log('第1次 重新开卡');
                  await $.wait(1000);
                  await joinShop();
                }

                await joinTeam(3);
              } else {
                if (_0x5a88x21.errorMessage.indexOf('队伍已经满员') > -1) {
                  $.maxTeam = true;
                } else {
                  if (_0x5a88x21.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x5a88x34 == 0) {
                    await joinTeam(1);
                  } else {
                    console.log('异常7：' + JSON.stringify(_0x5a88x21));
                    message += '【京东账号' + $.index + '】 ' + _0x5a88x21.errorMessage + '\n';
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function taskPostUrl(_0x5a88x19, _0x5a88x26) {
  return {
    url: '' + activityUrl + _0x5a88x19,
    body: _0x5a88x26,
    headers: {
      Accept: 'application/json',
      "Accept-Encoding": 'gzip, deflate, br',
      "Accept-Language": 'zh-cn',
      Connection: 'keep-alive',
      Host: `${'lzkjdz-isv.isvjd.com'}`,
      Origin: `${'https://lzkjdz-isv.isvjd.com'}`,
      "Content-Type": 'application/x-www-form-urlencoded',
      Referer: activityUrl + '/wxTeam/activity?activityId=' + activityId,
      Cookie: cookie + activityCookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
      "User-Agent": $.UA
    }
  };
}

function taskUrl(_0x5a88x19, _0x5a88x26) {
  return {
    'url': 'https://api.m.jd.com/client.action' + _0x5a88x19,
    'body': _0x5a88x26,
    'headers': {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-cn',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'api.m.jd.com',
      'Cookie': cookie,
      'User-Agent': $.UA
    }
  };
}

function TotalBean() {
  return new Promise(async _0x5a88x16 => {
    const _0x5a88x2e = {
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
    $.post(_0x5a88x2e, (_0x5a88x1f, _0x5a88x20, _0x5a88x21) => {
      try {
        if (_0x5a88x1f) {
          console.log('' + JSON.stringify(_0x5a88x1f));
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5a88x21) {
            _0x5a88x21 = JSON.parse(_0x5a88x21);

            if (_0x5a88x21.retcode === 0xd) {
              $.isLogin = false;
              return;
            }
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e, _0x5a88x20);
      } finally {
        _0x5a88x16();
      }
    });
  });
}

function safeGet(_0x5a88x21) {
  try {
    if (typeof JSON.parse(_0x5a88x21) == 'object') {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

function jsonParse(_0x5a88x3c) {
  if (typeof strv == 'string') {
    try {
      return JSON.parse(_0x5a88x3c);
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
      let _0x5a88x2c = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);

      if (_0x5a88x2c) {
        let _0x5a88x3e = $request.url.split('/');

        console.log('activityId: ' + _0x5a88x2c[0x1]);
        console.log('activityUrl: ' + _0x5a88x3e[0x0] + '//' + _0x5a88x3e[0x2]);
        $.setdata(_0x5a88x2c[0x1], 'jd_kr_zdjr_activityId');
        $.setdata(_0x5a88x3e[0x0] + '//' + _0x5a88x3e[0x2], 'jd_kr_zdjr_activityId');
        $.msg($.name, '获取activityId: 成功', 'activityId:' + _0x5a88x2c[0x1] + '\nactivityUrl:' + _0x5a88x3e[0x0] + '//' + _0x5a88x3e[0x2]);
      } else {
        $.msg($.name, '找不到activityId', '');
      }
    }
  }
}

function generateFp() {
  let _0x5a88xd = '0123456789';
  let _0x5a88x13 = 13;
  let _0x5a88xe = '';

  for (; _0x5a88x13--;) {
    _0x5a88xe += _0x5a88xd[Math.random() * '0123456789'.length | 0];
  }

  return (_0x5a88xe + Date.now()).slice(0, 16);
}

function geth5st() {
  let _0x5a88x41 = Date.now();

  let _0x5a88x42 = generateFp();

  let _0x5a88x43 = new Date(_0x5a88x41).Format('yyyyMMddhhmmssSSS');

  let _0x5a88x44 = [';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;', ';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];

  let _0x5a88x45 = _0x5a88x44[random(0, _0x5a88x44.length)];

  return encodeURIComponent(_0x5a88x43 + ';' + _0x5a88x42 + _0x5a88x45 + Date.now());
}

Date.prototype.Format = function (_0x5a88x46) {
  var _0x5a88x14 = this,
      _0x5a88x47 = _0x5a88x46,
      _0x5a88x48 = {
    "M+": _0x5a88x14.getMonth() + 1,
    "d+": _0x5a88x14.getDate(),
    "D+": _0x5a88x14.getDate(),
    "h+": _0x5a88x14.getHours(),
    "H+": _0x5a88x14.getHours(),
    "m+": _0x5a88x14.getMinutes(),
    "s+": _0x5a88x14.getSeconds(),
    "w+": _0x5a88x14.getDay(),
    "q+": Math.floor((_0x5a88x14.getMonth() + 3) / 3),
    "S+": _0x5a88x14.getMilliseconds()
  };

  /(y+)/i.test(_0x5a88x47) && (_0x5a88x47 = _0x5a88x47.replace(RegExp.$1, ''.concat(_0x5a88x14.getFullYear()).substr(4 - RegExp.$1.length)));

  for (var _0x5a88x49 in _0x5a88x48) {
    if (new RegExp('('.concat(_0x5a88x49, ')')).test(_0x5a88x47)) {
      var _0x5a88x13 = 'S+' === _0x5a88x49 ? '000' : '00';

      _0x5a88x47 = _0x5a88x47.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5a88x48[_0x5a88x49] : (''.concat(_0x5a88x13) + _0x5a88x48[_0x5a88x49]).substr(''.concat(_0x5a88x48[_0x5a88x49]).length));
    }
  }

  return _0x5a88x47;
};

function random(_0x5a88x4b, _0x5a88x4c) {
  return Math.floor(Math.random() * (_0x5a88x4c - _0x5a88x4b)) + _0x5a88x4b;
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
