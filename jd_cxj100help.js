/*
京东app抽现金
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJ100TOP='10'
多少助力换下一个，默认25个 ，可调整变量CXJ100NUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxj100help.js
updatetime:2023/5/28 fix
 */

const $ = new Env('JD抽现金100');
const _0x3ed0de = $.isNode() ? require('./sendNotify') : '',
  _0x4847af = $.isNode() ? require('./jdCookie.js') : '',
  _0x20fe30 = require('./function/dylany'),
  _0x897638 = require('./USER_AGENTS');
let _0x3c93f1 = true,
  _0x1d49e2 = [],
  _0x4f8894 = [],
  _0x28bae5 = '',
  _0x321994 = '',
  _0x581e66 = '',
  _0x1afccc,
  _0x1d5961 = [],
  _0x163de2 = [],
  _0x54f78e = process.env.CXJ100NUM || '25',
  _0x5ddf67 = process.env.CXJ100TOP || '5';
if ($.isNode()) {
  Object.keys(_0x4847af).forEach(_0x55a543 => {
    _0x4f8894.push(_0x4847af[_0x55a543]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x4f8894 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x47207a($.getdata('CookiesJD') || '[]').map(_0x1511f0 => _0x1511f0.cookie)].filter(_0x1a6d4e => !!_0x1a6d4e);
!(async () => {
  if (!_0x4f8894[0]) {
    const _0x4a1343 = {};
    _0x4a1343['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4a1343);
    return;
  }
  $.log('\n当前版本：2.1.2 抽奖统计');
  console.log('执行流程，前' + _0x5ddf67 + 'CK车头--助力--抽奖--检查提现');
  console.log('问题建议：https://t.me/dylan_jdpro');
//   let _0x1a7d98 = await _0x3040ae();
  for (let _0x17443b = 0; _0x17443b < _0x5ddf67; _0x17443b++) {
    if (_0x4f8894[_0x17443b]) {
      _0x28bae5 = _0x4f8894[_0x17443b], $.UserName = decodeURIComponent(_0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x17443b + 1, $.isLogin = true, $.nickName = '', $.UA = _0x897638.UARAM ? _0x897638.UARAM() : _0x897638.USER_AGENT, await _0x423364(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0xc74a30 = {};
        _0xc74a30['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0xc74a30);
        $.isNode() && (await _0x3ed0de.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }
      await _0x2df9b8(1), await $.wait(1000);
    }
  }
//   if (_0x1a7d98.length != 0) {
//     let _0x55e00a = _0x1a7d98[Math.floor(Math.random() * _0x1a7d98.length)];
//     console.log('\nCk1去助力作者：'), _0x28bae5 = _0x4f8894[0], $.UserName = decodeURIComponent(_0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0x897638.UARAM ? _0x897638.UARAM() : _0x897638.USER_AGENT, await _0x5c2afd(_0x55e00a), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：'), _0x1afccc = 1;
  for (let _0x174403 of _0x1d49e2) {
    console.log('\n去助力-> ' + _0x174403), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x305899 = _0x1afccc; _0x305899 < _0x4f8894.length; _0x305899++) {
      if (_0x4f8894[_0x305899]) {
        _0x28bae5 = _0x4f8894[_0x305899], $.UserName = decodeURIComponent(_0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x305899 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x897638.UARAM ? _0x897638.UARAM() : _0x897638.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x5c2afd(_0x174403);
        if ($.suc > Number(_0x54f78e) + 1) {
          $.log('已达目标助力数，跳出！'), _0x1afccc = _0x305899 + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0x4f8894.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x2cafc6 = 0; _0x2cafc6 < _0x4f8894.length; _0x2cafc6++) {
    if (_0x4f8894[_0x2cafc6]) {
      _0x28bae5 = _0x4f8894[_0x2cafc6], $.UserName = decodeURIComponent(_0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x28bae5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2cafc6 + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x1d5961 = [], _0x163de2 = []), $.UA = _0x897638.UARAM ? _0x897638.UARAM() : _0x897638.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x2df9b8(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x479a86 = 0; _0x479a86 < $.times; _0x479a86++) {
        $.log('开始第' + (_0x479a86 + 1) + '次抽奖:'), await _0x3b3ede(), await $.wait(1000);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x163de2.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x163de2.reduce((_0x5a3cc0, _0x400ef5) => _0x5a3cc0 + _0x400ef5 * 100, 0) / 100 + '元'), _0x1d5961.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x1d5961.reduce((_0x947590, _0x337f9b) => _0x947590 + _0x337f9b * 100, 0) / 100 + '元');
      for (let _0x48ee5d = 0; _0x48ee5d < 15; _0x48ee5d++) {
        await _0x2f9b23(_0x48ee5d + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0x3503be of $.baglist) {
          _0x3503be.prizeType == 4 && _0x3503be.state == 0 && ($.log('\n开始提现 ' + _0x3503be.amount), await _0x570dca(_0x3503be), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x1a6d7e => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1a6d7e + '!', '');
}).finally(() => {
  $.done();
});
async function _0x2df9b8(_0x5f1e17) {
  let _0x2f775c = 'functionId=inviteFissionHome&body={"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x1302fc => {
    $.post(_0x304094(_0x2f775c), async (_0x384f92, _0x47d88a, _0x33fd80) => {
      try {
        if (_0x384f92) console.log('' + JSON.stringify(_0x384f92)), console.log(' API请求失败，请检查网路重试');else {
          _0x33fd80 = JSON.parse(_0x33fd80);
          if (_0x33fd80.code == 0) {
            $.times = _0x33fd80.data.prizeNum;
            if (_0x5f1e17) console.log('助力码：' + _0x33fd80.data.inviter);
            _0x1d49e2.push(_0x33fd80.data.inviter);
          } else console.log(_0x33fd80.errMsg);
        }
      } catch (_0xb47a8d) {
        $.logErr(_0xb47a8d, _0x47d88a);
      } finally {
        _0x1302fc(_0x33fd80);
      }
    });
  });
}
async function _0x3b3ede() {
  const _0x272725 = {};
  _0x272725.linkId = 'c6Bkpjp7dYcvQwO9-PR7-g';
  let _0x33109f = _0x272725;
  let _0x36d364 = {
    'appId': 'c02c6',
    'fn': 'inviteFissionDrawPrize',
    'body': _0x33109f,
    'apid': 'activities_platform',
    'ver': $.UA.split(';')[2],
    'cl': 'ios',
    'user': $.UserName,
    'code': 0x1,
    'ua': $.UA
  };
  _0x33109f = await _0x3232e7(_0x36d364) //: 'functionId=inviteFissionDrawPrize&body=' + _0x33109f + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x33109f) return;
  return new Promise(async _0x32d051 => {
    $.post(_0x304094(_0x33109f), async (_0x5786cc, _0x28491d, _0x349290) => {
      try {
        if (_0x5786cc) console.log('' + JSON.stringify(_0x5786cc)), console.log(' API请求失败，请检查网路重试');else {
          _0x349290 = JSON.parse(_0x349290);
          if (_0x349290.code == 0) {
            const _0x3315b2 = _0x349290.data.prizeType;
            if (!_0x3315b2) fail++;
            switch (_0x3315b2) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x2e587f = parseFloat(_0x349290.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x2e587f + ' 💴'), _0x1d5961.push(_0x2e587f), $.fail = 0;
                break;
              case 2:
                let _0x5f25f9 = parseFloat(_0x349290.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x5f25f9 + ' 🧧'), _0x163de2.push(_0x5f25f9), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x349290.data));
            }
          } else console.log(_0x349290.errMsg);
        }
      } catch (_0x23f6d8) {
        $.logErr(_0x23f6d8, _0x28491d);
      } finally {
        _0x32d051(_0x349290);
      }
    });
  });
}
async function _0x2f9b23(_0x1d781d) {
  let _0x5bb1ed = 'functionId=superRedBagList&body={"pageNum":' + _0x1d781d + ',"pageSize":20,"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x30ab84 => {
    $.get(_0x304094(_0x5bb1ed), async (_0xef6868, _0x5e4415, _0x4270d4) => {
      try {
        _0xef6868 ? (console.log('' + JSON.stringify(_0xef6868)), console.log(' API请求失败，请检查网路重试')) : (_0x4270d4 = JSON.parse(_0x4270d4), _0x4270d4.code == 0 ? $.baglist = _0x4270d4.data.items : console.log(_0x4270d4.errMsg));
      } catch (_0x4eacfa) {
        $.logErr(_0x4eacfa, _0x5e4415);
      } finally {
        _0x30ab84(_0x4270d4);
      }
    });
  });
}
async function _0x5c2afd(_0x376057) {
  const _0x27db15 = {};
  _0x27db15.linkId = 'c6Bkpjp7dYcvQwO9-PR7-g', _0x27db15.isJdApp = true, _0x27db15.inviter = _0x376057;
  let _0x1b2b65 = _0x27db15,
    _0x3fe424 = {
      'appId': '02f8d',
      'fn': 'inviteFissionBeforeHome',
      'body': _0x1b2b65,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x1b2b65 = await _0x3232e7(_0x3fe424) //: 'functionId=inviteFissionBeforeHome&body=' + _0x1b2b65 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x1b2b65) return;
  return new Promise(async _0x41fcbb => {
    $.post(_0x304094(_0x1b2b65), async (_0x16fcb8, _0x20bda6, _0x4d64ce) => {
      try {
        if (_0x16fcb8) console.log('' + JSON.stringify(_0x16fcb8)), console.log(' API请求失败，请检查网路重试');else {
          _0x4d64ce = JSON.parse(_0x4d64ce);
          if (_0x4d64ce.code == 0) {
            if (!_0x4d64ce.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x4d64ce.data.helpResult == 1) $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));else {
              if (_0x4d64ce.data.helpResult == 6) console.log('结果：已经助力过TA！'), $.alr++;else {
                if (_0x4d64ce.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x4d64ce.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x4d64ce.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else _0x4d64ce.data.helpResult == 8 ? $.log('结果：TA未开启新的一轮 💤') : console.log(JSON.stringify(_0x4d64ce));
                  }
                }
              }
            }
          } else console.log(_0x4d64ce.errMsg);
        }
      } catch (_0x29ddf3) {
        $.logErr(_0x29ddf3, _0x20bda6);
      } finally {
        _0x41fcbb(_0x4d64ce);
      }
    });
  });
}
async function _0x570dca(_0x2f1632) {
  let _0x2c5f54 = 'functionId=apCashWithDraw&body={"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","businessSource":"NONE","base":{"id":' + _0x2f1632.id + ',"business":"fission","poolBaseId":' + _0x2f1632.poolBaseId + ',"prizeGroupId":' + _0x2f1632.prizeGroupId + ',"prizeBaseId":' + _0x2f1632.prizeBaseId + ',"prizeType":' + _0x2f1632.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x5a0f2b => {
    $.post(_0x304094(_0x2c5f54), async (_0x12a7e9, _0x502655, _0x11a94d) => {
      try {
        if (_0x12a7e9) console.log('' + JSON.stringify(_0x12a7e9)), console.log(' API请求失败，请检查网路重试');else {
          _0x11a94d = JSON.parse(_0x11a94d);
          if (_0x11a94d.code == 0) {
            if (_0x11a94d.data.message.indexOf('提现') > -1) console.log('----提现成功 🤑');else {
              console.log(_0x11a94d.data.message);
            }
          } else console.log(_0x11a94d.errMsg);
        }
      } catch (_0x8115b0) {
        $.logErr(_0x8115b0, _0x502655);
      } finally {
        _0x5a0f2b(_0x11a94d);
      }
    });
  });
}
function _0x304094(_0x5cbec6) {
  const _0x273427 = {};
  _0x273427.Host = 'api.m.jd.com', _0x273427.Origin = 'https://prodev.m.jd.com', _0x273427['Content-Type'] = 'application/x-www-form-urlencoded', _0x273427['User-Agent'] = $.UA, _0x273427.Cookie = _0x28bae5;
  const _0x180311 = {};
  _0x180311.url = 'https://api.m.jd.com/?' + _0x5cbec6;
  return _0x180311.headers = _0x273427, _0x180311;
}
function _0x423364() {
  return new Promise(_0x2d9e59 => {
    const _0x2b39f1 = {};
    _0x2b39f1.Cookie = _0x28bae5, _0x2b39f1.referer = 'https://h5.m.jd.com/';
    _0x2b39f1['User-Agent'] = $.UA;
    const _0x268865 = {};
    _0x268865.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x268865.headers = _0x2b39f1, _0x268865.timeout = 0x2710;
    const _0x533f8a = _0x268865;
    $.get(_0x533f8a, (_0x690b59, _0x4f5564, _0x53019d) => {
      try {
        if (_0x53019d) {
          _0x53019d = JSON.parse(_0x53019d);
          if (_0x53019d.islogin === '1') {} else _0x53019d.islogin === '0' && ($.isLogin = false);
        }
      } catch (_0x1f6417) {
        console.log(_0x1f6417);
      } finally {
        _0x2d9e59();
      }
    });
  });
}
function _0x38dde7() {
  return new Promise(_0x140125 => {
    if (!_0x3c93f1) $.msg($.name, '', '' + _0x321994);else {
      $.log('京东账号' + $.index + $.nickName + '\n' + _0x321994);
    }
    _0x140125();
  });
}
function _0x130d59(_0x7e3b23) {
  try {
    if (typeof JSON.parse(_0x7e3b23) == 'object') return true;
  } catch (_0x4aaeb8) {
    return console.log(_0x4aaeb8), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}
function _0x47207a(_0x5c6c0d) {
  if (typeof _0x5c6c0d == 'string') {
    try {
      return JSON.parse(_0x5c6c0d);
    } catch (_0x10d259) {
      return console.log(_0x10d259), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}
function _0x3232e7(_0x1f2e48) {
  const _0x54d3b2 = {};
  _0x54d3b2['Content-Type'] = 'application/json';
  let _0xe5ee7e = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x1f2e48),
      'headers': _0x54d3b2,
      'timeout': 0x2710
    },
    _0x22ec24 = '';
  return new Promise(_0x6526e0 => {
    $.post(_0xe5ee7e, (_0x563c2d, _0x3e2d67, _0xdd4ca6) => {
      try {
        _0x563c2d ? console.log('获取失败') : (_0xdd4ca6 = JSON.parse(_0xdd4ca6), _0xdd4ca6.code == 200 ? _0x22ec24 = _0xdd4ca6.data : $.log(_0xdd4ca6.msg));
      } catch (_0x42af8b) {
        console.log(_0x42af8b, _0x3e2d67);
      } finally {
        _0x6526e0(_0x22ec24);
      }
    });
  });
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }