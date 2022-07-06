/*
LZ关注抽奖通用活动

第一个CK失效会退出脚本

请求太频繁会被黑ip

变量：
//export jd_wxShopFollowActivity_activityId="活动ID"

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#LZ关注抽奖通用活动
1 1 1 1 * jd_wxShopFollowActivity.js, tag=LZ关注抽奖通用活动, enabled=true

*/

const $ = new Env('LZ关注抽奖通用活动');

const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let lz_cookie = {};
let cookiesArr = [],
    cookie = '';

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xe6cbx6 => {
    cookiesArr.push(jdCookieNode[_0xe6cbx6]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0xe6cbx6 => {
    return _0xe6cbx6.cookie;
  })].filter(_0xe6cbx6 => {
    return !!_0xe6cbx6;
  });
}

$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = '';
let activityCookie = '';
let jd_wxShopFollowActivity_activityId = '';
jd_wxShopFollowActivity_activityId = $.isNode() ? process.env.jd_wxShopFollowActivity_activityId ? process.env.jd_wxShopFollowActivity_activityId : `${''}${jd_wxShopFollowActivity_activityId}${''}` : $.getdata('jd_wxShopFollowActivity_activityId') ? $.getdata('jd_wxShopFollowActivity_activityId') : `${''}${jd_wxShopFollowActivity_activityId}${''}`;
!(async () => {
  if (!jd_wxShopFollowActivity_activityId) {
    console.log('\n请填写LZ关注抽奖的活动ID,变量是jd_wxShopFollowActivity_activityId\n');
    return;
  }


  if (!cookiesArr[0x0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      "open-url": 'https://bean.m.jd.com/'
    });
    return;
  }

  $.activityId = jd_wxShopFollowActivity_activityId;
  console.log('入口:\nhttps://lzkj-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId=' + $.activityId);

  for (let _0xe6cbxb = 0; _0xe6cbxb < cookiesArr.length; _0xe6cbxb++) {
    cookie = cookiesArr[_0xe6cbxb];
    originCookie = cookiesArr[_0xe6cbxb];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0xe6cbxb + 1;
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = '';
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await getUA();
      await run();

      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }

  if ($.outFlag) {
    let _0xe6cbxc = '此ip已被限制，请过10分钟后再执行脚本';
    $.msg($.name, `${''}`, `${''}${_0xe6cbxc}${''}`);

    if ($.isNode()) {
      await notify.sendNotify(`${''}${$.name}${''}`, `${''}${_0xe6cbxc}${''}`);
    }
  }

  if (allMessage) {
    $.msg($.name, `${''}`, `${''}${allMessage}${''}`);
  }
})().catch(_0xe6cbxa => {
  return $.logErr(_0xe6cbxa);
}).finally(() => {
  return $.done();
});

async function run() {
  try {
    $.endTime = 0;
    lz_jdpin_token_cookie = '';
    $.Token = '';
    $.Pin = '';
    await takePostRequest('isvObfuscator');

    if ($.Token == '') {
      console.log('获取[token]失败！');
      return;
    }

    await getCk();

    if (activityCookie == '') {
      console.log(`${'获取cookie失败'}`);
      return;
    }

    if ($.activityEnd === true) {
      console.log('活动结束');
      return;
    }


    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n');
      return;
    }

    await takePostRequest('getSimpleActInfoVo');
    await takePostRequest('getMyPing');

    if (!$.Pin) {
      console.log('获取[Pin]失败！');
      return;
    }

    await takePostRequest('accessLogWithAD');
    await $.wait(1000);
    await takePostRequest('getActMemberInfo');

    if ($.openCard == false) {
      console.log(`${'抱歉，没有开通此店铺的会员，可能无法参加活动~'}`);
    }

    await takePostRequest('activityContent');

    if ($.hotFlag) {
      return;
    }

    await takePostRequest('follow');
    await $.wait(1000);
    await takePostRequest('getPrize');

    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本\n');
      return;
    }

    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 3000 + 3000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}

async function takePostRequest(_0xe6cbx10) {
  if ($.outFlag) {
    return;
  }

  let _0xe6cbx11 = 'https://lzkj-isv.isvjcloud.com';
  let _0xe6cbx12 = `${''}`;
  let _0xe6cbx13 = 'POST';

  switch (_0xe6cbx10) {
    case 'isvObfuscator':
      url = `${'https://api.m.jd.com/client.action?functionId=isvObfuscator'}`;
      _0xe6cbx12 = `${'body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954'}`;
      break;

    case 'getMyPing':
      url = `${''}${_0xe6cbx11}${'/customer/getMyPing'}`;
      _0xe6cbx12 = `${'token='}${$.Token}${'&fromType=APP&userId='}${$.venderId}${''}`;
      break;

    case 'getSimpleActInfoVo':
      url = `${''}${_0xe6cbx11}${'/customer/getSimpleActInfoVo'}`;
      _0xe6cbx12 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'getActMemberInfo':
      url = `${''}${_0xe6cbx11}${'/wxCommonInfo/getActMemberInfo'}`;
      _0xe6cbx12 = `${'venderId='}${$.venderId}${'&activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'accessLogWithAD':
      url = `${''}${_0xe6cbx11}${'/common/accessLogWithAD'}`;
      let _0xe6cbx15 = `${'https://lzkj-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId='}${$.activityId}${''}`;
      _0xe6cbx12 = `${'venderId='}${$.shopId || $.venderId || ''}${'&code='}${$.activityType}${'&pin='}${encodeURIComponent($.Pin)}${'&activityId='}${$.activityId}${'&pageUrl='}${encodeURIComponent(_0xe6cbx15)}${'&subType=app&adSource='}`;
      break;

    case 'activityContent':
      url = `${''}${_0xe6cbx11}${'/wxShopFollowActivity/activityContentOnly'}`;
      _0xe6cbx12 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'follow':
      url = `${''}${_0xe6cbx11}${'/wxShopFollowActivity/follow'}`;
      _0xe6cbx12 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'getPrize':
      url = `${''}${_0xe6cbx11}${'/wxShopFollowActivity/getPrize'}`;
      _0xe6cbx12 = `${'activityId='}${$.activityId}${'&pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    case 'getShareRecord':
      url = `${''}${_0xe6cbx11}${'/wxShopFollowActivity/shopInfo'}`;
      _0xe6cbx12 = `${'activityId='}${$.activityId}${''}`;
      break;

    case 'getUserInfo':
      url = `${''}${_0xe6cbx11}${'/wxActionCommon/getUserInfo'}`;
      _0xe6cbx12 = `${'pin='}${encodeURIComponent($.Pin)}${''}`;
      break;

    default:
      console.log(`${'错误'}${_0xe6cbx10}${''}`);
  }

  let _0xe6cbx16 = getPostRequest(url, _0xe6cbx12, _0xe6cbx13);

  return new Promise(async _0xe6cbx17 => {
    $.post(_0xe6cbx16, (_0xe6cbx18, _0xe6cbx19, _0xe6cbx1a) => {
      try {
        setActivityCookie(_0xe6cbx19);

        if (_0xe6cbx18) {
          if (_0xe6cbx19 && typeof _0xe6cbx19.statusCode != 'undefined') {
            if (_0xe6cbx19.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          console.log(`${''}${$.toStr(_0xe6cbx18, _0xe6cbx18)}${''}`);
          console.log(`${''}${_0xe6cbx10}${' API请求失败，请检查网路重试'}`);
        } else {
          dealReturn(_0xe6cbx10, _0xe6cbx1a);
        }
      } catch (e) {
        console.log(e, _0xe6cbx19);
      } finally {
        _0xe6cbx17();
      }
    });
  });
}

async function dealReturn(_0xe6cbx10, _0xe6cbx1a) {
  let _0xe6cbx1c = '';

  try {
    if (_0xe6cbx10 != 'accessLogWithAD' || _0xe6cbx10 != 'drawContent') {
      if (_0xe6cbx1a) {
        _0xe6cbx1c = JSON.parse(_0xe6cbx1a);
      }
    }
  } catch (e) {
    console.log(`${''}${_0xe6cbx10}${' 执行任务异常'}`);
    console.log(_0xe6cbx1a);
    $.runFalag = false;
  }


  try {
    switch (_0xe6cbx10) {
      case 'isvObfuscator':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.errcode == 0) {
            if (typeof _0xe6cbx1c.token != 'undefined') {
              $.Token = _0xe6cbx1c.token;
            }
          } else {
            if (_0xe6cbx1c.message) {
              console.log(`${'isvObfuscator '}${_0xe6cbx1c.message || ''}${''}`);
            } else {
              console.log(_0xe6cbx1a);
            }
          }
        } else {
          console.log(_0xe6cbx1a);
        }

        break;

      case 'getMyPing':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true) {
            if (_0xe6cbx1c.data && typeof _0xe6cbx1c.data.secretPin != 'undefined') {
              $.Pin = _0xe6cbx1c.data.secretPin;
            }

            if (_0xe6cbx1c.data && typeof _0xe6cbx1c.data.nickname != 'undefined') {
              $.nickname = _0xe6cbx1c.data.nickname;
            }
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'getSimpleActInfoVo':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true) {
            if (typeof _0xe6cbx1c.data.shopId != 'undefined') {
              $.shopId = _0xe6cbx1c.data.shopId;
            }

            if (typeof _0xe6cbx1c.data.venderId != 'undefined') {
              $.venderId = _0xe6cbx1c.data.venderId;
            }

            $.activityType = _0xe6cbx1c.data.activityType;
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'follow':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true && _0xe6cbx1c.count === 0) {
            console.log(`${'关注成功'}`);
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'getActMemberInfo':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true) {
            $.openCard = _0xe6cbx1c.data.openCard || false;
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'getUserInfo':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true) {
            if (_0xe6cbx1c.data && typeof _0xe6cbx1c.data.yunMidImageUrl != 'undefined') {
              $.attrTouXiang = _0xe6cbx1c.data.yunMidImageUrl || 'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
            }

            $.jdNick = _0xe6cbx1c.data.nickname || '';
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'activityContent':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true) {
            $.canJoin = _0xe6cbx1c.data.canJoin || false;
            $.needFollow = _0xe6cbx1c.data.needFollow || false;
            $.hasFollow = _0xe6cbx1c.data.hasFollow || false;
          } else {
            if (_0xe6cbx1c.errorMessage) {
              if (_0xe6cbx1c.errorMessage.indexOf('结束') > -1 && _0xe6cbx1c.errorMessage.indexOf('仅限') > -1) {
                $.activityEnd = true;
              }

              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'getPrize':
        if (typeof _0xe6cbx1c == 'object') {
          if (_0xe6cbx1c.result && _0xe6cbx1c.result === true && _0xe6cbx1c.data.drawOk === true) {
            console.log(`${''}${_0xe6cbx1c.data.name}${''}`);
          } else {
            if (_0xe6cbx1c.errorMessage) {
              console.log(`${''}${_0xe6cbx1c.errorMessage || ''}${''}`);
            } else {
              console.log(`${'什么也没有~~'}`);
            }
          }
        } else {
          console.log(`${''}${_0xe6cbx10}${' '}${_0xe6cbx1a}${''}`);
        }

        break;

      case 'accessLogWithAD':

      case 'drawContent':
        break;

      default:
        console.log(`${''}${_0xe6cbx10}${'-> '}${_0xe6cbx1a}${''}`);
    }

    if (typeof _0xe6cbx1c == 'object') {
      if (_0xe6cbx1c.errorMessage) {
        if (_0xe6cbx1c.errorMessage.indexOf('火爆') > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function getPostRequest(_0xe6cbx1e, _0xe6cbx12, _0xe6cbx13 = 'POST') {
  let _0xe6cbx1f = {
    "Accept": 'application/json',
    "Accept-Encoding": 'gzip, deflate, br',
    "Accept-Language": 'zh-cn',
    "Connection": 'keep-alive',
    "Content-Type": 'application/x-www-form-urlencoded',
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": 'XMLHttpRequest'
  };

  if (_0xe6cbx1e.indexOf('https://lzkj-isv.isvjcloud.com') > -1) {
    _0xe6cbx1f.Referer = `${'https://lzkj-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId='}${$.activityId}${''}`;
    _0xe6cbx1f.Cookie = `${''}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ''}${''}${$.Pin && 'AUTH_C_USER=' + $.Pin + ';' || ''}${''}${activityCookie}${''}`;
  }

  return {
    url: _0xe6cbx1e,
    method: _0xe6cbx13,
    headers: _0xe6cbx1f,
    body: _0xe6cbx12,
    timeout: 30000
  };
}

function getCk() {
  return new Promise(_0xe6cbx17 => {
    let _0xe6cbx21 = {
      url: `${'https://lzkj-isv.isvjcloud.com/wxCommonInfo/token'}`,
      headers: {
        "Accept": 'application/json, text/plain, */*',
        "Accept-Encoding": 'gzip, deflate, br',
        "Accept-Language": 'zh-cn',
        "Connection": 'keep-alive',
        "Content-Type": 'application/x-www-form-urlencoded',
        "Cookie": cookie,
        "Referer": `${'https://lzkj-isv.isvjcloud.com/wxShopFollowActivity/activity?activityId='}${$.activityId}${''}`,
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0xe6cbx21, async (_0xe6cbx18, _0xe6cbx19, _0xe6cbx1a) => {
      try {
        if (_0xe6cbx18) {
          if (_0xe6cbx19 && typeof _0xe6cbx19.statusCode != 'undefined') {
            if (_0xe6cbx19.statusCode == 493) {
              console.log('此ip已被限制，请过10分钟后再执行脚本\n');
              $.outFlag = true;
            }
          }

          ;
          console.log(`${''}${$.toStr(_0xe6cbx18)}${''}`);
          console.log(`${''}${$.name}${' cookie API请求失败，请检查网路重试'}`);
        } else {
          let _0xe6cbx22 = _0xe6cbx1a.match(/(活动已经结束)/) && _0xe6cbx1a.match(/(活动已经结束)/)[0x1] || '';

          if (_0xe6cbx22) {
            $.activityEnd = true;
            console.log('活动已结束');
          }

          ;
          setActivityCookie(_0xe6cbx19);
        }
      } catch (e) {
        $.logErr(e, _0xe6cbx19);
      } finally {
        _0xe6cbx17();
      }
    });
  });
}

function setActivityCookie(_0xe6cbx19) {
  if (_0xe6cbx19.headers['set-cookie']) {
    cookie = `${''}${originCookie}${';'}`;

    for (let _0xe6cbx24 of _0xe6cbx19.headers['set-cookie']) {
      lz_cookie[_0xe6cbx24.split(';')[0x0].substr(0, _0xe6cbx24.split(';')[0x0].indexOf('='))] = _0xe6cbx24.split(';')[0x0].substr(_0xe6cbx24.split(';')[0x0].indexOf('=') + 1);
    }

    for (const _0xe6cbx25 of Object.keys(lz_cookie)) {
      cookie += _0xe6cbx25 + '=' + lz_cookie[_0xe6cbx25] + ';';
    }

    activityCookie = cookie;
  }
}

async function getUA() {
  $.UA = `${'jdapp;iPhone;10.1.4;13.1.2;'}${randomString(40)}${';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}`;
}

function randomString(_0xe6cbxa) {
  _0xe6cbxa = _0xe6cbxa || 32;
  let _0xe6cbx28 = 'abcdef0123456789',
      _0xe6cbx29 = _0xe6cbx28.length,
      _0xe6cbx2a = '';

  for (i = 0; i < _0xe6cbxa; i++) {
    _0xe6cbx2a += _0xe6cbx28.charAt(Math.floor(Math.random() * _0xe6cbx29));
  }

  return _0xe6cbx2a;
}

function jsonParse(_0xe6cbx2c) {
  if (typeof _0xe6cbx2c == 'string') {
    try {
      return JSON.parse(_0xe6cbx2c);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}


// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

