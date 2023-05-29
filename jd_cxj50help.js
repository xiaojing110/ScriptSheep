/*
京东app抽现金50
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJ50TOP='10'
多少助力换下一个，默认25个 ，可调整变量CXJ50NUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxj50help.js
updatetime:2023/5/28 
 */

const $ = new Env('JD抽现金50');
const _0x354cd9 = $.isNode() ? require('./sendNotify') : '';
const _0xe0e25b = $.isNode() ? require('./jdCookie.js') : '',
  _0x5a3c4e = require('./function/dylany'),
  _0x860915 = require('./USER_AGENTS');
let _0x8bcc69 = true,
  _0x399be8 = [],
  _0x10339d = [],
  _0x33ddbc = '',
  _0x337d64 = '',
  _0x2ad963 = '',
  _0x416993,
  _0x1d4f83 = [],
  _0x47f3d0 = [],
  _0x1903fc = process.env.CXJ50NUM || '25',
  _0x3d87ae = process.env.CXJ50TOP || '5';
if ($.isNode()) {
  Object.keys(_0xe0e25b).forEach(_0x2cc9c3 => {
    _0x10339d.push(_0xe0e25b[_0x2cc9c3]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x10339d = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x4f4545($.getdata('CookiesJD') || '[]').map(_0x4e2def => _0x4e2def.cookie)].filter(_0x2559b7 => !!_0x2559b7);
!(async () => {
  if (!_0x10339d[0]) {
    const _0x44e046 = {};
    _0x44e046['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x44e046);
    return;
  }
  $.log('\n当前版本：1.0.2 抽奖统计'), console.log('执行流程，前' + _0x3d87ae + 'CK车头--助力--抽奖--检查提现');
  console.log('问题建议：https://t.me/dylan_jdpro');
//   let _0x1ad09f = await _0x4b8cd9();
  for (let _0x24b885 = 0; _0x24b885 < _0x3d87ae; _0x24b885++) {
    if (_0x10339d[_0x24b885]) {
      _0x33ddbc = _0x10339d[_0x24b885], $.UserName = decodeURIComponent(_0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x24b885 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x860915.UARAM ? _0x860915.UARAM() : _0x860915.USER_AGENT, await _0x263fa1(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0xecc103 = {};
        _0xecc103['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0xecc103);
        $.isNode() && (await _0x354cd9.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }
      await _0x409b21(1), await $.wait(1000);
    }
  }
//   if (_0x1ad09f.length != 0) {
//     let _0xefb64d = _0x1ad09f[Math.floor(Math.random() * _0x1ad09f.length)];
//     console.log('\nCk1去助力作者：'), _0x33ddbc = _0x10339d[0], $.UserName = decodeURIComponent(_0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0x860915.UARAM ? _0x860915.UARAM() : _0x860915.USER_AGENT, await _0x5f59bf(_0xefb64d), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：'), _0x416993 = 1;
  for (let _0xd7676c of _0x399be8) {
    console.log('\n去助力-> ' + _0xd7676c), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x2be277 = _0x416993; _0x2be277 < _0x10339d.length; _0x2be277++) {
      if (_0x10339d[_0x2be277]) {
        _0x33ddbc = _0x10339d[_0x2be277], $.UserName = decodeURIComponent(_0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2be277 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x860915.UARAM ? _0x860915.UARAM() : _0x860915.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x5f59bf(_0xd7676c);
        if ($.suc > Number(_0x1903fc) + 1) {
          $.log('已达目标助力数，跳出！'), _0x416993 = _0x2be277 + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0x10339d.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x1e66fd = 0; _0x1e66fd < _0x10339d.length; _0x1e66fd++) {
    if (_0x10339d[_0x1e66fd]) {
      _0x33ddbc = _0x10339d[_0x1e66fd], $.UserName = decodeURIComponent(_0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x33ddbc.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x1e66fd + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x1d4f83 = [], _0x47f3d0 = []), $.UA = _0x860915.UARAM ? _0x860915.UARAM() : _0x860915.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x409b21(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x55be8c = 0; _0x55be8c < $.times; _0x55be8c++) {
        $.log('开始第' + (_0x55be8c + 1) + '次抽奖:');
        let _0x458b46 = 0;
        do {
          let _0x17b1bb = await _0x2f667b();
          if (_0x17b1bb.indexOf('火爆') == -1 || _0x458b46 > 2) break;
          await $.wait(1000), $.log('火爆重试 ' + ++_0x458b46);
        } while (_0x458b46 < 5);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x47f3d0.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x47f3d0.reduce((_0xfc0842, _0x4478d3) => _0xfc0842 + _0x4478d3 * 100, 0) / 100 + '元'), _0x1d4f83.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x1d4f83.reduce((_0x51719d, _0x4bac4e) => _0x51719d + _0x4bac4e * 100, 0) / 100 + '元');
      for (let _0x42fb55 = 0; _0x42fb55 < 15; _0x42fb55++) {
        await _0x463c6a(_0x42fb55 + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0xba0bb5 of $.baglist) {
          _0xba0bb5.prizeType == 4 && _0xba0bb5.state == 0 && ($.log('\n开始提现 ' + _0xba0bb5.amount), await _0x1db307(_0xba0bb5), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x3ccf9e => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x3ccf9e + '!', '');
}).finally(() => {
  $.done();
});
async function _0x409b21(_0x850642) {
  let _0xbb7f09 = 'functionId=inviteFissionHome&body={"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x3e0ca1 => {
    $.post(_0x5d9f84(_0xbb7f09), async (_0x393ef6, _0x8aee96, _0x49ab85) => {
      try {
        if (_0x393ef6) console.log('' + JSON.stringify(_0x393ef6)), console.log(' API请求失败，请检查网路重试');else {
          _0x49ab85 = JSON.parse(_0x49ab85);
          if (_0x49ab85.code == 0) {
            $.times = _0x49ab85.data.prizeNum;
            if (_0x850642) console.log('助力码：' + _0x49ab85.data.inviter);
            _0x399be8.push(_0x49ab85.data.inviter);
          } else console.log(_0x49ab85.errMsg);
        }
      } catch (_0x347d12) {
        $.logErr(_0x347d12, _0x8aee96);
      } finally {
        _0x3e0ca1(_0x49ab85);
      }
    });
  });
}
async function _0x2f667b() {
  const _0x24928b = {};
  _0x24928b.linkId = 's9UT-99Aj2UjWRkU5k1Ksg';
  let _0x13b885 = _0x24928b;
  let _0x434286 = {
    'appId': 'c02c6',
    'fn': 'inviteFissionDrawPrize',
    'body': _0x13b885,
    'apid': 'activities_platform',
    'ver': $.UA.split(';')[2],
    'cl': 'ios',
    'user': $.UserName,
    'code': 0x1,
    'ua': $.UA
  };
  _0x13b885 = await _0x2cd34d(_0x434286)// : 'functionId=inviteFissionDrawPrize&body=' + _0x13b885 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x13b885) return;
  return new Promise(async _0x549a3f => {
    $.post(_0x5d9f84(_0x13b885), async (_0x537544, _0x2b92eb, _0x3b08fc) => {
      try {
        if (_0x537544) console.log('' + JSON.stringify(_0x537544)), console.log(' API请求失败，请检查网路重试');else {
          _0x3b08fc = JSON.parse(_0x3b08fc);
          if (_0x3b08fc.code == 0) {
            const _0xb73113 = _0x3b08fc.data.prizeType;
            if (!_0xb73113) fail++;
            switch (_0xb73113) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x4c3176 = parseFloat(_0x3b08fc.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x4c3176 + ' 💴'), _0x1d4f83.push(_0x4c3176), $.fail = 0;
                break;
              case 2:
                let _0x466623 = parseFloat(_0x3b08fc.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x466623 + ' 🧧'), _0x47f3d0.push(_0x466623), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x3b08fc.data));
            }
          } else console.log(_0x3b08fc.errMsg);
        }
      } catch (_0x5248f4) {
        $.logErr(_0x5248f4, _0x2b92eb);
      } finally {
        _0x549a3f(JSON.stringify(_0x3b08fc));
      }
    });
  });
}
async function _0x463c6a(_0x41eda6) {
  let _0x52a45b = 'functionId=superRedBagList&body={"pageNum":' + _0x41eda6 + ',"pageSize":20,"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x2023ce => {
    $.get(_0x5d9f84(_0x52a45b), async (_0x32755d, _0x314191, _0x2a6dfb) => {
      try {
        if (_0x32755d) {
          console.log('' + JSON.stringify(_0x32755d)), console.log(' API请求失败，请检查网路重试');
        } else {
          _0x2a6dfb = JSON.parse(_0x2a6dfb), _0x2a6dfb.code == 0 ? $.baglist = _0x2a6dfb.data.items : console.log(_0x2a6dfb.errMsg);
        }
      } catch (_0x2c10f1) {
        $.logErr(_0x2c10f1, _0x314191);
      } finally {
        _0x2023ce(_0x2a6dfb);
      }
    });
  });
}
async function _0x5f59bf(_0x1ed8f1) {
  const _0x229dff = {};
  _0x229dff.linkId = 's9UT-99Aj2UjWRkU5k1Ksg', _0x229dff.isJdApp = true;
  _0x229dff.inviter = _0x1ed8f1;
  let _0x3a7446 = _0x229dff,
    _0x3ee2e0 = {
      'appId': '02f8d',
      'fn': 'inviteFissionBeforeHome',
      'body': _0x3a7446,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x3a7446 = await _0x2cd34d(_0x3ee2e0)// : 'functionId=inviteFissionBeforeHome&body=' + _0x3a7446 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x3a7446) return;
  return new Promise(async _0x3b4954 => {
    $.post(_0x5d9f84(_0x3a7446), async (_0x1dd865, _0x282969, _0x5bb8c9) => {
      try {
        if (_0x1dd865) console.log('' + JSON.stringify(_0x1dd865)), console.log(' API请求失败，请检查网路重试');else {
          _0x5bb8c9 = JSON.parse(_0x5bb8c9);
          if (_0x5bb8c9.code == 0) {
            if (!_0x5bb8c9.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x5bb8c9.data.helpResult == 1) {
              $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));
            } else {
              if (_0x5bb8c9.data.helpResult == 6) console.log('结果：已经助力过TA！'), $.alr++;else {
                if (_0x5bb8c9.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x5bb8c9.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x5bb8c9.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else {
                      if (_0x5bb8c9.data.helpResult == 8) {
                        $.log('结果：TA未开启新的一轮 💤');
                      } else console.log(JSON.stringify(_0x5bb8c9));
                    }
                  }
                }
              }
            }
          } else console.log(_0x5bb8c9.errMsg);
        }
      } catch (_0x421930) {
        $.logErr(_0x421930, _0x282969);
      } finally {
        _0x3b4954(_0x5bb8c9);
      }
    });
  });
}
async function _0x1db307(_0x375081) {
  let _0x48fd04 = 'functionId=apCashWithDraw&body={"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","businessSource":"NONE","base":{"id":' + _0x375081.id + ',"business":"fission","poolBaseId":' + _0x375081.poolBaseId + ',"prizeGroupId":' + _0x375081.prizeGroupId + ',"prizeBaseId":' + _0x375081.prizeBaseId + ',"prizeType":' + _0x375081.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x34ab19 => {
    $.post(_0x5d9f84(_0x48fd04), async (_0x1e9a3e, _0x384539, _0x50f07a) => {
      try {
        if (_0x1e9a3e) console.log('' + JSON.stringify(_0x1e9a3e)), console.log(' API请求失败，请检查网路重试');else {
          _0x50f07a = JSON.parse(_0x50f07a);
          if (_0x50f07a.code == 0) _0x50f07a.data.message.indexOf('提现') > -1 ? console.log('----提现成功 🤑') : console.log(_0x50f07a.data.message);else {
            console.log(_0x50f07a.errMsg);
          }
        }
      } catch (_0x20dda9) {
        $.logErr(_0x20dda9, _0x384539);
      } finally {
        _0x34ab19(_0x50f07a);
      }
    });
  });
}
function _0x5d9f84(_0xe815df) {
  const _0x4813f8 = {};
  _0x4813f8.Host = 'api.m.jd.com', _0x4813f8.Origin = 'https://prodev.m.jd.com';
  _0x4813f8['Content-Type'] = 'application/x-www-form-urlencoded', _0x4813f8['User-Agent'] = $.UA, _0x4813f8.Cookie = _0x33ddbc;
  const _0x3fce56 = {};
  _0x3fce56.url = 'https://api.m.jd.com/?' + _0xe815df;
  _0x3fce56.headers = _0x4813f8;
  return _0x3fce56;
}
function _0x263fa1() {
  return new Promise(_0x17c193 => {
    const _0x4c746e = {};
    _0x4c746e.Cookie = _0x33ddbc, _0x4c746e.referer = 'https://h5.m.jd.com/', _0x4c746e['User-Agent'] = $.UA;
    const _0x3c7ad1 = {};
    _0x3c7ad1.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin';
    _0x3c7ad1.headers = _0x4c746e, _0x3c7ad1.timeout = 0x2710;
    const _0xd7e0ef = _0x3c7ad1;
    $.get(_0xd7e0ef, (_0x649d9d, _0x11edaf, _0x48a2c4) => {
      try {
        if (_0x48a2c4) {
          _0x48a2c4 = JSON.parse(_0x48a2c4);
          if (_0x48a2c4.islogin === '1') {} else _0x48a2c4.islogin === '0' && ($.isLogin = false);
        }
      } catch (_0x95ea1b) {
        console.log(_0x95ea1b);
      } finally {
        _0x17c193();
      }
    });
  });
}
function _0x259799() {
  return new Promise(_0x2db8de => {
    !_0x8bcc69 ? $.msg($.name, '', '' + _0x337d64) : $.log('京东账号' + $.index + $.nickName + '\n' + _0x337d64);
    _0x2db8de();
  });
}
function _0x5231ff(_0x5e723d) {
  try {
    if (typeof JSON.parse(_0x5e723d) == 'object') {
      return true;
    }
  } catch (_0x2fbe0c) {
    return console.log(_0x2fbe0c), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}
function _0x4f4545(_0x34283f) {
  if (typeof _0x34283f == 'string') try {
    return JSON.parse(_0x34283f);
  } catch (_0x9bcce4) {
    return console.log(_0x9bcce4), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}
function _0x2cd34d(_0x975324) {
  const _0x4eed55 = {};
  _0x4eed55['Content-Type'] = 'application/json';
  let _0x36b8b7 = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x975324),
      'headers': _0x4eed55,
      'timeout': 0x2710
    },
    _0x5e0605 = '';
  return new Promise(_0x46c154 => {
    $.post(_0x36b8b7, (_0x2ce6f4, _0xa3e23d, _0x9a03fc) => {
      try {
        _0x2ce6f4 ? console.log('获取失败') : (_0x9a03fc = JSON.parse(_0x9a03fc), _0x9a03fc.code == 200 ? _0x5e0605 = _0x9a03fc.data : $.log(_0x9a03fc.msg));
      } catch (_0x4c776f) {
        console.log(_0x4c776f, _0xa3e23d);
      } finally {
        _0x46c154(_0x5e0605);
      }
    });
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }