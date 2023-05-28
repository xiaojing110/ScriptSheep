/*
京喜特价抽现金
入口：特价版app-百元生活费-赚金币-邀请抽奖
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，ck1助力作者， 变量JXCXJTOP='10'
多少助力换下一个，默认50个，不知道多少助力满, ，可调整变量JXCXJNUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_cxjhelp.js
updatetime:2023/5/28 fix
 */

const $ = new Env('JX抽现金');
const _0x23580d = $.isNode() ? require('./sendNotify') : '',
  _0x22d835 = $.isNode() ? require('./jdCookie.js') : '',
  _0x4dcc59 = require('./USER_AGENTS');
let _0x3a0dfb = true,
  _0x27d019 = [],
  _0x407eae = [],
  _0x5e0d5b = [],
  _0xe7865a = [],
  _0x5890c5 = '',
  _0x5c3a27 = '',
  _0x9b7ee3 = '',
  _0x22c2c5,
  _0x588eb0 = process.env.JXCXJNUM || '50',
  _0x3ec91e = process.env.JXCXJTOP || '5';
if ($.isNode()) {
  Object.keys(_0x22d835).forEach(_0x229483 => {
    _0xe7865a.push(_0x22d835[_0x229483]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0xe7865a = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x1b6044($.getdata('CookiesJD') || '[]').map(_0x3639ec => _0x3639ec.cookie)].filter(_0x4b646c => !!_0x4b646c);
!(async () => {
  if (!_0xe7865a[0]) {
    const _0xc24686 = {};
    _0xc24686['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0xc24686);
    return;
  }
  $.log('\n当前版本：3.0.4 fix小问题新增抽奖统计'), console.log('执行流程，前' + _0x3ec91e + 'CK车头--助力--抽奖--检查提现');
  console.log('问题建议：https://t.me/dylan_jdpro');
  for (let _0x5aaa3f = 0; _0x5aaa3f < _0x3ec91e; _0x5aaa3f++) {
    if (_0xe7865a[_0x5aaa3f]) {
      _0x5890c5 = _0xe7865a[_0x5aaa3f], $.UserName = decodeURIComponent(_0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x5aaa3f + 1, $.isLogin = true, $.nickName = '', $.UA = _0x4dcc59.UARAM ? _0x4dcc59.UARAM(1) : _0x4dcc59.USER_AGENT, await _0x43f0ba(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0x1c56f0 = {};
        _0x1c56f0['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x1c56f0);
        $.isNode() && (await _0x23580d.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }
      await _0x5c1351(1), await $.wait(1000);
    }
  }
//   if (_0xd53dbc.length != 0) {
//     let _0x33cfa0 = _0xd53dbc[Math.floor(Math.random() * _0xd53dbc.length)];
//     console.log('\nCk1去助力作者：'), _0x5890c5 = _0xe7865a[0], $.UserName = decodeURIComponent(_0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0x4dcc59.UARAM ? _0x4dcc59.UARAM(1) : _0x4dcc59.USER_AGENT, await _0x35611f(_0x33cfa0), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：');
  _0x22c2c5 = 1;
  for (let _0x312eaa of _0x27d019) {
    console.log('\n去助力-> ' + _0x312eaa), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x2f526f = _0x22c2c5; _0x2f526f < _0xe7865a.length; _0x2f526f++) {
      if (_0xe7865a[_0x2f526f]) {
        _0x5890c5 = _0xe7865a[_0x2f526f], $.UserName = decodeURIComponent(_0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2f526f + 1, $.isLogin = true, $.nickName = '', $.UA = _0x4dcc59.UARAM ? _0x4dcc59.UARAM(1) : _0x4dcc59.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x35611f(_0x312eaa);
        if ($.suc > Number(_0x588eb0) + 1) {
          $.log('已达目标助力数，跳出！'), _0x22c2c5 = _0x2f526f + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0xe7865a.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x2d5a37 = 0; _0x2d5a37 < _0xe7865a.length; _0x2d5a37++) {
    if (_0xe7865a[_0x2d5a37]) {
      _0x5890c5 = _0xe7865a[_0x2d5a37], $.UserName = decodeURIComponent(_0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5890c5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2d5a37 + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x407eae = [], _0x5e0d5b = []), $.UA = _0x4dcc59.UARAM ? _0x4dcc59.UARAM(1) : _0x4dcc59.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x5c1351(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x3f0005 = 0; _0x3f0005 < $.times; _0x3f0005++) {
        $.log('开始第' + (_0x3f0005 + 1) + '次抽奖:'), await _0x3ca1a9(), await $.wait(1000);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x5e0d5b.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x5e0d5b.reduce((_0x32e017, _0x868c02) => _0x32e017 + _0x868c02 * 100, 0) / 100 + '元'), _0x407eae.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x407eae.reduce((_0x22fe1e, _0x1fcb85) => _0x22fe1e + _0x1fcb85 * 100, 0) / 100 + '元');
      for (let _0x2597d9 = 0; _0x2597d9 < 15; _0x2597d9++) {
        await _0x55c90e(_0x2597d9 + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0x102a2b of $.baglist) {
          _0x102a2b.prizeType == 4 && _0x102a2b.state == 0 && ($.log('\n开始提现 ' + _0x102a2b.prizeConfigName), await _0x179af7(_0x102a2b), _0x407eae.push(parseFloat(_0x102a2b.amount)), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x20a4e4 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x20a4e4 + '!', '');
}).finally(() => {
  $.done();
});
async function _0x5c1351(_0xb93c8b) {
  let _0x2ec3a5 = 'functionId=inviteFissionHome&body={"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x372009 => {
    $.post(_0x4f5179(_0x2ec3a5), async (_0x11a837, _0x3a5615, _0x211247) => {
      try {
        if (_0x11a837) console.log('' + JSON.stringify(_0x11a837)), console.log(' API请求失败，请检查网路重试');else {
          _0x211247 = JSON.parse(_0x211247);
          if (_0x211247.code == 0) {
            $.times = _0x211247.data.prizeNum;
            if (_0xb93c8b) console.log('助力码：' + _0x211247.data.inviter);
            _0x27d019.push(_0x211247.data.inviter);
          } else console.log(_0x211247.errMsg);
        }
      } catch (_0x504bca) {
        $.logErr(_0x504bca, _0x3a5615);
      } finally {
        _0x372009(_0x211247);
      }
    });
  });
}
async function _0x3ca1a9() {
  const _0x407642 = {};
  _0x407642.linkId = 'Wvzc_VpNTlSkiQdHT8r7QA';
  let _0x500777 = _0x407642,
    _0x116931 = {
      'appId': 'c02c6',
      'fn': 'inviteFissionDrawPrize',
      'body': _0x500777,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x500777 =  await _0x13e919(_0x116931)// : 'functionId=inviteFissionDrawPrize&body=' + _0x500777 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x500777) return;
  return new Promise(async _0x3172b1 => {
    $.post(_0x4f5179(_0x500777), async (_0x3a4897, _0x341c14, _0x5f5dcb) => {
      try {
        if (_0x3a4897) console.log('' + JSON.stringify(_0x3a4897)), console.log(' API请求失败，请检查网路重试');else {
          _0x5f5dcb = JSON.parse(_0x5f5dcb);
          if (_0x5f5dcb.code == 0) {
            const _0x55ed24 = _0x5f5dcb.data.prizeType;
            if (!_0x55ed24) fail++;
            switch (_0x55ed24) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x5d9710 = parseFloat(_0x5f5dcb.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x5d9710 + ' 💴'), _0x407eae.push(_0x5d9710), $.fail = 0;
                break;
              case 2:
                let _0x58c232 = parseFloat(_0x5f5dcb.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x58c232 + ' 🧧'), _0x5e0d5b.push(_0x58c232), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x5f5dcb.data));
            }
          } else console.log(_0x5f5dcb.errMsg);
        }
      } catch (_0x39b746) {
        $.logErr(_0x39b746, _0x341c14);
      } finally {
        _0x3172b1(_0x5f5dcb);
      }
    });
  });
}
async function _0x55c90e(_0x6bbdf0) {
  let _0xa12fd2 = 'functionId=superRedBagList&body={"pageNum":' + _0x6bbdf0 + ',"pageSize":20,"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x111860 => {
    $.get(_0x4f5179(_0xa12fd2), async (_0x4ee9ba, _0x240308, _0x38098a) => {
      try {
        if (_0x4ee9ba) console.log('' + JSON.stringify(_0x4ee9ba)), console.log(' API请求失败，请检查网路重试');else {
          _0x38098a = JSON.parse(_0x38098a);
          if (_0x38098a.code == 0) {
            $.baglist = _0x38098a.data.items;
          } else console.log(_0x38098a.errMsg);
        }
      } catch (_0x4c5d68) {
        $.logErr(_0x4c5d68, _0x240308);
      } finally {
        _0x111860(_0x38098a);
      }
    });
  });
}
async function _0x35611f(_0x208f02) {
  const _0x3c2a4a = {};
  _0x3c2a4a.linkId = 'Wvzc_VpNTlSkiQdHT8r7QA';
  _0x3c2a4a.isJdApp = true, _0x3c2a4a.inviter = _0x208f02;
  let _0x19586c = _0x3c2a4a,
    _0x385d82 = {
      'appId': '02f8d',
      'fn': 'inviteFissionBeforeHome',
      'body': _0x19586c,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x19586c = await _0x13e919(_0x385d82) //: 'functionId=inviteFissionBeforeHome&body=' + _0x19586c + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x19586c) return;
  return new Promise(async _0x117a22 => {
    $.post(_0x4f5179(_0x19586c), async (_0x475c81, _0x56d60e, _0x1d2284) => {
      try {
        if (_0x475c81) console.log('' + JSON.stringify(_0x475c81)), console.log(' API请求失败，请检查网路重试');else {
          _0x1d2284 = JSON.parse(_0x1d2284);
          if (_0x1d2284.code == 0) {
            if (!_0x1d2284.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x1d2284.data.helpResult == 1) {
              $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));
            } else {
              if (_0x1d2284.data.helpResult == 6) {
                console.log('结果：已经助力过TA！'), $.alr++;
              } else {
                if (_0x1d2284.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x1d2284.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x1d2284.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else _0x1d2284.data.helpResult == 8 ? $.log('结果：TA未开启新的一轮 💤') : console.log(JSON.stringify(_0x1d2284));
                  }
                }
              }
            }
          } else {
            console.log(_0x1d2284.errMsg);
          }
        }
      } catch (_0x48e27f) {
        $.logErr(_0x48e27f, _0x56d60e);
      } finally {
        _0x117a22(_0x1d2284);
      }
    });
  });
}
async function _0x179af7(_0x37a0dd) {
  let _0x5ca2c = 'functionId=apCashWithDraw&body={"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","businessSource":"NONE","base":{"id":' + _0x37a0dd.id + ',"business":"fission","poolBaseId":' + _0x37a0dd.poolBaseId + ',"prizeGroupId":' + _0x37a0dd.prizeGroupId + ',"prizeBaseId":' + _0x37a0dd.prizeBaseId + ',"prizeType":' + _0x37a0dd.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x209fe3 => {
    $.post(_0x4f5179(_0x5ca2c), async (_0x59c431, _0x2ac562, _0x4c27eb) => {
      try {
        if (_0x59c431) console.log('' + JSON.stringify(_0x59c431)), console.log(' API请求失败，请检查网路重试');else {
          _0x4c27eb = JSON.parse(_0x4c27eb);
          if (_0x4c27eb.code == 0) {
            if (_0x4c27eb.data.message.indexOf('提现') > -1) console.log('----提现成功 🤑');else {
              console.log(_0x4c27eb.data.message);
            }
          } else {
            console.log(_0x4c27eb.errMsg);
          }
        }
      } catch (_0x400f11) {
        $.logErr(_0x400f11, _0x2ac562);
      } finally {
        _0x209fe3(_0x4c27eb);
      }
    });
  });
}
function _0x4f5179(_0x5cdf80) {
  const _0x7502f9 = {};
  _0x7502f9.Host = 'api.m.jd.com', _0x7502f9.Origin = 'https://prodev.m.jd.com', _0x7502f9['Content-Type'] = 'application/x-www-form-urlencoded';
  _0x7502f9['User-Agent'] = $.UA;
  _0x7502f9.Cookie = _0x5890c5;
  const _0x265202 = {};
  return _0x265202.url = 'https://api.m.jd.com/?' + _0x5cdf80, _0x265202.headers = _0x7502f9, _0x265202;
}
function _0x43f0ba() {
  return new Promise(_0x5072b1 => {
    const _0x9bcb81 = {};
    _0x9bcb81.Cookie = _0x5890c5, _0x9bcb81.referer = 'https://h5.m.jd.com/', _0x9bcb81['User-Agent'] = $.UA;
    const _0x124272 = {};
    _0x124272.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin';
    _0x124272.headers = _0x9bcb81, _0x124272.timeout = 0x2710;
    const _0x19cb3e = _0x124272;
    $.get(_0x19cb3e, (_0x4ed778, _0x3a503e, _0x40057c) => {
      try {
        if (_0x40057c) {
          _0x40057c = JSON.parse(_0x40057c);
          if (_0x40057c.islogin === '1') {} else _0x40057c.islogin === '0' && ($.isLogin = false);
        }
      } catch (_0xe531ee) {
        console.log(_0xe531ee);
      } finally {
        _0x5072b1();
      }
    });
  });
}
function _0xfa7236() {
  return new Promise(_0x5198b2 => {
    !_0x3a0dfb ? $.msg($.name, '', '' + _0x5c3a27) : $.log('京东账号' + $.index + $.nickName + '\n' + _0x5c3a27);
    _0x5198b2();
  });
}
function _0x1e38dc(_0x2879be) {
  try {
    if (typeof JSON.parse(_0x2879be) == 'object') return true;
  } catch (_0x27183a) {
    return console.log(_0x27183a), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x1b6044(_0x4594b6) {
  if (typeof _0x4594b6 == 'string') {
    try {
      return JSON.parse(_0x4594b6);
    } catch (_0x2387e4) {
      return console.log(_0x2387e4), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}
function _0x13e919(_0x4b16d6) {
  const _0x2316b7 = {};
  _0x2316b7['Content-Type'] = 'application/json';
  let _0x1d6536 = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x4b16d6),
      'headers': _0x2316b7,
      'timeout': 0x2710
    },
    _0x3d407f = '';
  return new Promise(_0x2c9fd0 => {
    $.post(_0x1d6536, (_0x49056c, _0x45c859, _0x4c9a2f) => {
      try {
        _0x49056c ? console.log('连接失败') : (_0x4c9a2f = JSON.parse(_0x4c9a2f), _0x4c9a2f.code == 200 ? _0x3d407f = _0x4c9a2f.data : $.log(_0x4c9a2f.msg));
      } catch (_0x13c7a7) {
        console.log(_0x13c7a7, _0x45c859);
      } finally {
        _0x2c9fd0(_0x3d407f);
      }
    });
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }