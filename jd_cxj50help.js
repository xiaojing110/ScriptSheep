/*
京东app抽现金50
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJ50TOP='10'
多少助力换下一个，默认25个 ，可调整变量CXJ50NUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxj50help.js
updatetime:2023/5/28 
 */

const $ = new Env('JD抽现金50');
const _0x9f0665 = $.isNode() ? require('./sendNotify') : '';
const _0x478272 = $.isNode() ? require('./jdCookie.js') : '',
  _0x4772c0 = require('./function/dylany'),
  _0x457af1 = require('./USER_AGENTS');
let _0x1bcd0a = true,
  _0x57bfc1 = [],
  _0x242c8d = [],
  _0x51aab0 = '',
  _0x5e5469 = '',
  _0x5b8509 = '',
  _0x46538b,
  _0x35f54d = [],
  _0x3593bb = [],
  _0x1d5f9e = process.env.CXJ50NUM || '25',
  _0x239b50 = process.env.CXJ50TOP || '5';
if ($.isNode()) {
  Object.keys(_0x478272).forEach(_0x31a28d => {
    _0x242c8d.push(_0x478272[_0x31a28d]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x242c8d = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0xdf8d73($.getdata('CookiesJD') || '[]').map(_0x27ba39 => _0x27ba39.cookie)].filter(_0x4962db => !!_0x4962db);
!(async () => {
  if (!_0x242c8d[0]) {
    const _0x787107 = {};
    _0x787107['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', 
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x787107);
    return;
  }
  $.log('\n当前版本：1.0.2 抽奖统计'), 
  console.log('执行流程，前' + _0x239b50 + 'CK车头--助力--抽奖--检查提现'), 
  console.log('问题建议：https://t.me/dylan_jdpro');
//   let _0x357f16 = await _0x565a95();
  for (let _0x155497 = 0; _0x155497 < _0x239b50; _0x155497++) {
    if (_0x242c8d[_0x155497]) {
      _0x51aab0 = _0x242c8d[_0x155497], $.UserName = decodeURIComponent(_0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/) && _0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x155497 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x457af1.UARAM ? _0x457af1.UARAM() : _0x457af1.USER_AGENT, await _0x15781c(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0x17d86f = {};
        _0x17d86f['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x17d86f);
        $.isNode() && (await _0x9f0665.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }
      await _0x5c6c48(1), await $.wait(1000);
    }
  }
//   if (_0x357f16.length != 0) {
//     let _0x4e82ab = _0x357f16[Math.floor(Math.random() * _0x357f16.length)];
//     console.log('\nCk1去助力作者：'), _0x51aab0 = _0x242c8d[0], $.UserName = decodeURIComponent(_0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/) && _0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0x457af1.UARAM ? _0x457af1.UARAM() : _0x457af1.USER_AGENT, await _0x1ddf18(_0x4e82ab), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：');
  _0x46538b = 1;
  for (let _0x1814a4 of _0x57bfc1) {
    console.log('\n去助力-> ' + _0x1814a4), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x4a13a1 = _0x46538b; _0x4a13a1 < _0x242c8d.length; _0x4a13a1++) {
      if (_0x242c8d[_0x4a13a1]) {
        _0x51aab0 = _0x242c8d[_0x4a13a1], $.UserName = decodeURIComponent(_0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/) && _0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x4a13a1 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x457af1.UARAM ? _0x457af1.UARAM() : _0x457af1.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x1ddf18(_0x1814a4);
        if ($.suc > Number(_0x1d5f9e) + 1) {
          $.log('已达目标助力数，跳出！'), _0x46538b = _0x4a13a1 + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0x242c8d.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x25dc12 = 0; _0x25dc12 < _0x242c8d.length; _0x25dc12++) {
    if (_0x242c8d[_0x25dc12]) {
      _0x51aab0 = _0x242c8d[_0x25dc12], $.UserName = decodeURIComponent(_0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/) && _0x51aab0.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x25dc12 + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x35f54d = [], _0x3593bb = []), $.UA = _0x457af1.UARAM ? _0x457af1.UARAM() : _0x457af1.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x5c6c48(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x2bd1f5 = 0; _0x2bd1f5 < $.times; _0x2bd1f5++) {
        $.log('开始第' + (_0x2bd1f5 + 1) + '次抽奖:');
        let _0xc86b6a = 0;
        do {
          let _0x302eb9 = await _0x294fd7();
          if (_0x302eb9.indexOf('火爆') == -1 || _0xc86b6a > 2) break;
          await $.wait(1000), $.log('火爆重试 ' + ++_0xc86b6a);
        } while (_0xc86b6a < 5);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x3593bb.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x3593bb.reduce((_0xe4b8e7, _0x361508) => _0xe4b8e7 + _0x361508 * 100, 0) / 100 + '元'), _0x35f54d.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x35f54d.reduce((_0x255721, _0x125305) => _0x255721 + _0x125305 * 100, 0) / 100 + '元');
      for (let _0x3d4acf = 0; _0x3d4acf < 15; _0x3d4acf++) {
        await _0x1b11a0(_0x3d4acf + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0x22bd4f of $.baglist) {
          _0x22bd4f.prizeType == 4 && _0x22bd4f.state == 0 && ($.log('\n开始提现 ' + _0x22bd4f.amount), await _0x495297(_0x22bd4f), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x371408 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x371408 + '!', '');
}).finally(() => {
  $.done();
});
async function _0x5c6c48(_0x2b770d) {
  let _0x108874 = 'functionId=inviteFissionHome&body={"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x28697a => {
    $.post(_0x59168a(_0x108874), async (_0x3ee1f0, _0x1e3ef1, _0x3ce277) => {
      try {
        if (_0x3ee1f0) console.log('' + JSON.stringify(_0x3ee1f0)), console.log(' API请求失败，请检查网路重试');else {
          _0x3ce277 = JSON.parse(_0x3ce277);
          if (_0x3ce277.code == 0) {
            $.times = _0x3ce277.data.prizeNum;
            if (_0x2b770d) console.log('助力码：' + _0x3ce277.data.inviter);
            _0x57bfc1.push(_0x3ce277.data.inviter);
          } else console.log(_0x3ce277.errMsg);
        }
      } catch (_0x27876e) {
        $.logErr(_0x27876e, _0x1e3ef1);
      } finally {
        _0x28697a(_0x3ce277);
      }
    });
  });
}
async function _0x294fd7() {
  const _0x58310e = {};
  _0x58310e.linkId = 's9UT-99Aj2UjWRkU5k1Ksg';
  let _0x245e45 = _0x58310e,
    _0xc1e66 = {
      'appId': 'c02c6',
      'fn': 'inviteFissionDrawPrize',
      'body': _0x245e45,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x245e45 = await _0x5c0888(_0xc1e66) //: 'functionId=inviteFissionDrawPrize&body=' + _0x245e45 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x245e45) return;
  return new Promise(async _0x267962 => {
    $.post(_0x59168a(_0x245e45), async (_0x357b28, _0x3da87a, _0x13a8aa) => {
      try {
        if (_0x357b28) console.log('' + JSON.stringify(_0x357b28)), console.log(' API请求失败，请检查网路重试');else {
          _0x13a8aa = JSON.parse(_0x13a8aa);
          if (_0x13a8aa.code == 0) {
            const _0x2c2b03 = _0x13a8aa.data.prizeType;
            if (!_0x2c2b03) fail++;
            switch (_0x2c2b03) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x48cabf = parseFloat(_0x13a8aa.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x48cabf + ' 💴'), _0x35f54d.push(_0x48cabf), $.fail = 0;
                break;
              case 2:
                let _0x41073b = parseFloat(_0x13a8aa.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x41073b + ' 🧧'), _0x3593bb.push(_0x41073b), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x13a8aa.data));
            }
          } else console.log(_0x13a8aa.errMsg);
        }
      } catch (_0x4cbb77) {
        $.logErr(_0x4cbb77, _0x3da87a);
      } finally {
        _0x267962(JSON.stringify(_0x13a8aa));
      }
    });
  });
}
async function _0x1b11a0(_0x4e4166) {
  let _0x58de3a = 'functionId=superRedBagList&body={"pageNum":' + _0x4e4166 + ',"pageSize":20,"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x3caac3 => {
    $.get(_0x59168a(_0x58de3a), async (_0x176db6, _0x3e5040, _0x1c464e) => {
      try {
        _0x176db6 ? (console.log('' + JSON.stringify(_0x176db6)), console.log(' API请求失败，请检查网路重试')) : (_0x1c464e = JSON.parse(_0x1c464e), _0x1c464e.code == 0 ? $.baglist = _0x1c464e.data.items : console.log(_0x1c464e.errMsg));
      } catch (_0x15c401) {
        $.logErr(_0x15c401, _0x3e5040);
      } finally {
        _0x3caac3(_0x1c464e);
      }
    });
  });
}
async function _0x1ddf18(_0x1618c9) {
  const _0x4c8957 = {};
  _0x4c8957.linkId = 's9UT-99Aj2UjWRkU5k1Ksg', _0x4c8957.isJdApp = true, _0x4c8957.inviter = _0x1618c9;
  let _0x2e9a99 = _0x4c8957,
    _0x318378 = {
      'appId': '02f8d',
      'fn': 'inviteFissionBeforeHome',
      'body': _0x2e9a99,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x2e9a99 =  await _0x5c0888(_0x318378)// : 'functionId=inviteFissionBeforeHome&body=' + _0x2e9a99 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x2e9a99) return;
  return new Promise(async _0x182f63 => {
    $.post(_0x59168a(_0x2e9a99), async (_0x2f10c5, _0xade200, _0x2fb8ba) => {
      try {
        if (_0x2f10c5) console.log('' + JSON.stringify(_0x2f10c5)), console.log(' API请求失败，请检查网路重试');else {
          _0x2fb8ba = JSON.parse(_0x2fb8ba);
          if (_0x2fb8ba.code == 0) {
            if (!_0x2fb8ba.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x2fb8ba.data.helpResult == 1) $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));else {
              if (_0x2fb8ba.data.helpResult == 6) console.log('结果：已经助力过TA！'), $.alr++;else {
                if (_0x2fb8ba.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x2fb8ba.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x2fb8ba.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else {
                      if (_0x2fb8ba.data.helpResult == 8) {
                        $.log('结果：TA未开启新的一轮 💤');
                      } else console.log(JSON.stringify(_0x2fb8ba));
                    }
                  }
                }
              }
            }
          } else {
            console.log(_0x2fb8ba.errMsg);
          }
        }
      } catch (_0x1e4478) {
        $.logErr(_0x1e4478, _0xade200);
      } finally {
        _0x182f63(_0x2fb8ba);
      }
    });
  });
}
async function _0x495297(_0x2edb60) {
  let _0x50cf50 = 'functionId=apCashWithDraw&body={"linkId":"s9UT-99Aj2UjWRkU5k1Ksg","businessSource":"NONE","base":{"id":' + _0x2edb60.id + ',"business":"fission","poolBaseId":' + _0x2edb60.poolBaseId + ',"prizeGroupId":' + _0x2edb60.prizeGroupId + ',"prizeBaseId":' + _0x2edb60.prizeBaseId + ',"prizeType":' + _0x2edb60.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x119f61 => {
    $.post(_0x59168a(_0x50cf50), async (_0x53b44f, _0x13a879, _0x5f02e6) => {
      try {
        if (_0x53b44f) {
          console.log('' + JSON.stringify(_0x53b44f)), console.log(' API请求失败，请检查网路重试');
        } else _0x5f02e6 = JSON.parse(_0x5f02e6), _0x5f02e6.code == 0 ? _0x5f02e6.data.message.indexOf('提现') > -1 ? console.log('----提现成功 🤑') : console.log(_0x5f02e6.data.message) : console.log(_0x5f02e6.errMsg);
      } catch (_0x2db86e) {
        $.logErr(_0x2db86e, _0x13a879);
      } finally {
        _0x119f61(_0x5f02e6);
      }
    });
  });
}
function _0x59168a(_0xc5b177) {
  const _0x296ebb = {};
  _0x296ebb.Host = 'api.m.jd.com', _0x296ebb.Origin = 'https://prodev.m.jd.com', _0x296ebb['Content-Type'] = 'application/x-www-form-urlencoded', _0x296ebb['User-Agent'] = $.UA, _0x296ebb.Cookie = _0x51aab0;
  const _0x488ad9 = {};
  return _0x488ad9.url = 'https://api.m.jd.com/?' + _0xc5b177, _0x488ad9.headers = _0x296ebb, _0x488ad9;
}
function _0x15781c() {
  return new Promise(_0x134bc2 => {
    const _0x371768 = {};
    _0x371768.Cookie = _0x51aab0;
    _0x371768.referer = 'https://h5.m.jd.com/', _0x371768['User-Agent'] = $.UA;
    const _0x2d67bf = {};
    _0x2d67bf.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x2d67bf.headers = _0x371768, _0x2d67bf.timeout = 0x2710;
    const _0x54c80b = _0x2d67bf;
    $.get(_0x54c80b, (_0x11b7d7, _0x3048d2, _0x51fe3c) => {
      try {
        if (_0x51fe3c) {
          _0x51fe3c = JSON.parse(_0x51fe3c);
          if (_0x51fe3c.islogin === '1') {} else _0x51fe3c.islogin === '0' && ($.isLogin = false);
        }
      } catch (_0x11bbd0) {
        console.log(_0x11bbd0);
      } finally {
        _0x134bc2();
      }
    });
  });
}
function _0x13adfd() {
  return new Promise(_0x590ebc => {
    if (!_0x1bcd0a) $.msg($.name, '', '' + _0x5e5469);else {
      $.log('京东账号' + $.index + $.nickName + '\n' + _0x5e5469);
    }
    _0x590ebc();
  });
}
function _0x1d8060(_0x23c085) {
  try {
    if (typeof JSON.parse(_0x23c085) == 'object') return true;
  } catch (_0x582d06) {
    return console.log(_0x582d06), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0xdf8d73(_0x3aaf17) {
  if (typeof _0x3aaf17 == 'string') try {
    return JSON.parse(_0x3aaf17);
  } catch (_0x2c53f1) {
    return console.log(_0x2c53f1), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}
function _0x5c0888(_0x28f26d) {
  const _0x54fcb8 = {};
  _0x54fcb8['Content-Type'] = 'application/json';
  let _0x1d4aa2 = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x28f26d),
      'headers': _0x54fcb8,
      'timeout': 0x2710
    },
    _0x4d7e03 = '';
  return new Promise(_0x10c47e => {
    $.post(_0x1d4aa2, (_0x1151e8, _0x44537b, _0x9b0077) => {
      try {
        if (_0x1151e8) console.log('获取失败');else {
          _0x9b0077 = JSON.parse(_0x9b0077), _0x9b0077.code == 200 ? _0x4d7e03 = _0x9b0077.data : $.log(_0x9b0077.msg);
        }
      } catch (_0x588116) {
        console.log(_0x588116, _0x44537b);
      } finally {
        _0x10c47e(_0x4d7e03);
      }
    });
  });
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }