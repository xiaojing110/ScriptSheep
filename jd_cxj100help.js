/*
京东app抽现金
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJ100TOP='10'
多少助力换下一个，默认25个 ，可调整变量CXJ100NUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cxj100help.js
updatetime:2023/5/28 fix
 */

const $ = new Env('JD抽现金100');
const _0x20b4e3 = $.isNode() ? require('./sendNotify') : '',
  _0x54aa3a = $.isNode() ? require('./jdCookie.js') : '',
  _0x1dfdc9 = require('./function/dylany'),
  _0xe672fb = require('./USER_AGENTS');
let _0x59e8f5 = true,
  _0x36799c = [],
  _0x415136 = [],
  _0x4607f9 = '',
  _0x1e4862 = '',
  _0x13ba57 = '',
  _0x4dcc6f,
  _0x461392 = [],
  _0x3600a1 = [],
  _0x477f08 = process.env.CXJ100NUM || '25',
  _0x391e93 = process.env.CXJ100TOP || '5';
if ($.isNode()) {
  Object.keys(_0x54aa3a).forEach(_0x201b48 => {
    _0x415136.push(_0x54aa3a[_0x201b48]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x415136 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x5d7f32($.getdata('CookiesJD') || '[]').map(_0xd1eb6 => _0xd1eb6.cookie)].filter(_0x58e51b => !!_0x58e51b);
!(async () => {
  if (!_0x415136[0]) {
    const _0x4b76ab = {};
    _0x4b76ab['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4b76ab);
    return;
  }
  $.log('\n当前版本：2.1.2 抽奖统计'), console.log('执行流程，前' + _0x391e93 + 'CK车头--助力--抽奖--检查提现'), console.log('问题建议：https://t.me/dylan_jdpro');
//   let _0x56d5da = await _0x24ce56();
  for (let _0x574156 = 0; _0x574156 < _0x391e93; _0x574156++) {
    if (_0x415136[_0x574156]) {
      _0x4607f9 = _0x415136[_0x574156], $.UserName = decodeURIComponent(_0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x574156 + 1, $.isLogin = true, $.nickName = '', $.UA = _0xe672fb.UARAM ? _0xe672fb.UARAM() : _0xe672fb.USER_AGENT, await _0x486b93(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0x3f7336 = {};
        _0x3f7336['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x3f7336);
        if ($.isNode()) {
          await _0x20b4e3.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }
        continue;
      }
      await _0x474da4(1), await $.wait(1000);
    }
  }
//   if (_0x56d5da.length != 0) {
//     let _0x2a77f9 = _0x56d5da[Math.floor(Math.random() * _0x56d5da.length)];
//     console.log('\nCk1去助力作者：'), _0x4607f9 = _0x415136[0], $.UserName = decodeURIComponent(_0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0xe672fb.UARAM ? _0xe672fb.UARAM() : _0xe672fb.USER_AGENT, await _0x21df30(_0x2a77f9), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：'), _0x4dcc6f = 1;
  for (let _0x1b1a91 of _0x36799c) {
    console.log('\n去助力-> ' + _0x1b1a91), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x5922d0 = _0x4dcc6f; _0x5922d0 < _0x415136.length; _0x5922d0++) {
      if (_0x415136[_0x5922d0]) {
        _0x4607f9 = _0x415136[_0x5922d0], $.UserName = decodeURIComponent(_0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x5922d0 + 1, $.isLogin = true, $.nickName = '', $.UA = _0xe672fb.UARAM ? _0xe672fb.UARAM() : _0xe672fb.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x21df30(_0x1b1a91);
        if ($.suc > Number(_0x477f08) + 1) {
          $.log('已达目标助力数，跳出！'), _0x4dcc6f = _0x5922d0 + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0x415136.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x3b1e4d = 0; _0x3b1e4d < _0x415136.length; _0x3b1e4d++) {
    if (_0x415136[_0x3b1e4d]) {
      _0x4607f9 = _0x415136[_0x3b1e4d], $.UserName = decodeURIComponent(_0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4607f9.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3b1e4d + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x461392 = [], _0x3600a1 = []), $.UA = _0xe672fb.UARAM ? _0xe672fb.UARAM() : _0xe672fb.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x474da4(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x461f43 = 0; _0x461f43 < $.times; _0x461f43++) {
        $.log('开始第' + (_0x461f43 + 1) + '次抽奖:'), await _0x2a400b(), await $.wait(1000);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x3600a1.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x3600a1.reduce((_0x354857, _0x617df4) => _0x354857 + _0x617df4 * 100, 0) / 100 + '元'), _0x461392.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x461392.reduce((_0x3ac3a0, _0x33e149) => _0x3ac3a0 + _0x33e149 * 100, 0) / 100 + '元');
      for (let _0x1599d9 = 0; _0x1599d9 < 15; _0x1599d9++) {
        await _0x88519f(_0x1599d9 + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0x2741f0 of $.baglist) {
          _0x2741f0.prizeType == 4 && _0x2741f0.state == 0 && ($.log('\n开始提现 ' + _0x2741f0.amount), await _0x5e5170(_0x2741f0), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x29f157 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x29f157 + '!', '');
}).finally(() => {
  $.done();
});
async function _0x474da4(_0xf34a84) {
  let _0x559a3d = 'functionId=inviteFissionHome&body={"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x3dcbfc => {
    $.post(_0x5958b8(_0x559a3d), async (_0x44f07e, _0x2ad59e, _0x5b3d12) => {
      try {
        if (_0x44f07e) console.log('' + JSON.stringify(_0x44f07e)), console.log(' API请求失败，请检查网路重试');else {
          _0x5b3d12 = JSON.parse(_0x5b3d12);
          if (_0x5b3d12.code == 0) {
            $.times = _0x5b3d12.data.prizeNum;
            if (_0xf34a84) console.log('助力码：' + _0x5b3d12.data.inviter);
            _0x36799c.push(_0x5b3d12.data.inviter);
          } else console.log(_0x5b3d12.errMsg);
        }
      } catch (_0x4e31d8) {
        $.logErr(_0x4e31d8, _0x2ad59e);
      } finally {
        _0x3dcbfc(_0x5b3d12);
      }
    });
  });
}
async function _0x2a400b() {
  const _0xb6d551 = {};
  _0xb6d551.linkId = 'c6Bkpjp7dYcvQwO9-PR7-g';
  let _0x3e4381 = _0xb6d551,
    _0x424474 = {
      'appId': 'c02c6',
      'fn': 'inviteFissionDrawPrize',
      'body': _0x3e4381,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x3e4381 =  await _0x178722(_0x424474) //: 'functionId=inviteFissionDrawPrize&body=' + _0x3e4381 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x3e4381) return;
  return new Promise(async _0x56b3bd => {
    $.post(_0x5958b8(_0x3e4381), async (_0x20ca10, _0x55a851, _0x353df6) => {
      try {
        if (_0x20ca10) {
          console.log('' + JSON.stringify(_0x20ca10)), console.log(' API请求失败，请检查网路重试');
        } else {
          _0x353df6 = JSON.parse(_0x353df6);
          if (_0x353df6.code == 0) {
            const _0x1c0c8c = _0x353df6.data.prizeType;
            if (!_0x1c0c8c) fail++;
            switch (_0x1c0c8c) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x35db46 = parseFloat(_0x353df6.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x35db46 + ' 💴'), _0x461392.push(_0x35db46), $.fail = 0;
                break;
              case 2:
                let _0x501a2e = parseFloat(_0x353df6.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x501a2e + ' 🧧'), _0x3600a1.push(_0x501a2e), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x353df6.data));
            }
          } else console.log(_0x353df6.errMsg);
        }
      } catch (_0x479e62) {
        $.logErr(_0x479e62, _0x55a851);
      } finally {
        _0x56b3bd(_0x353df6);
      }
    });
  });
}
async function _0x88519f(_0x5ac1da) {
  let _0x5c5213 = 'functionId=superRedBagList&body={"pageNum":' + _0x5ac1da + ',"pageSize":20,"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x2ed2cd => {
    $.get(_0x5958b8(_0x5c5213), async (_0x62af7f, _0x2f2946, _0x4971ef) => {
      try {
        _0x62af7f ? (console.log('' + JSON.stringify(_0x62af7f)), console.log(' API请求失败，请检查网路重试')) : (_0x4971ef = JSON.parse(_0x4971ef), _0x4971ef.code == 0 ? $.baglist = _0x4971ef.data.items : console.log(_0x4971ef.errMsg));
      } catch (_0x2db8ef) {
        $.logErr(_0x2db8ef, _0x2f2946);
      } finally {
        _0x2ed2cd(_0x4971ef);
      }
    });
  });
}
async function _0x21df30(_0x173008) {
  const _0x417244 = {};
  _0x417244.linkId = 'c6Bkpjp7dYcvQwO9-PR7-g', _0x417244.isJdApp = true, _0x417244.inviter = _0x173008;
  let _0x41c2c7 = _0x417244,
    _0xdf2a79 = {
      'appId': '02f8d',
      'fn': 'inviteFissionBeforeHome',
      'body': _0x41c2c7,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x41c2c7 = await _0x178722(_0xdf2a79)//: 'functionId=inviteFissionBeforeHome&body=' + _0x41c2c7 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x41c2c7) return;
  return new Promise(async _0x50dc69 => {
    $.post(_0x5958b8(_0x41c2c7), async (_0x1dc50f, _0x45d4fc, _0x135b05) => {
      try {
        if (_0x1dc50f) console.log('' + JSON.stringify(_0x1dc50f)), console.log(' API请求失败，请检查网路重试');else {
          _0x135b05 = JSON.parse(_0x135b05);
          if (_0x135b05.code == 0) {
            if (!_0x135b05.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x135b05.data.helpResult == 1) $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));else {
              if (_0x135b05.data.helpResult == 6) console.log('结果：已经助力过TA！'), $.alr++;else {
                if (_0x135b05.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x135b05.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x135b05.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else _0x135b05.data.helpResult == 8 ? $.log('结果：TA未开启新的一轮 💤') : console.log(JSON.stringify(_0x135b05));
                  }
                }
              }
            }
          } else console.log(_0x135b05.errMsg);
        }
      } catch (_0x5f4b6c) {
        $.logErr(_0x5f4b6c, _0x45d4fc);
      } finally {
        _0x50dc69(_0x135b05);
      }
    });
  });
}
async function _0x5e5170(_0x3c4f5d) {
  let _0x2609e4 = 'functionId=apCashWithDraw&body={"linkId":"c6Bkpjp7dYcvQwO9-PR7-g","businessSource":"NONE","base":{"id":' + _0x3c4f5d.id + ',"business":"fission","poolBaseId":' + _0x3c4f5d.poolBaseId + ',"prizeGroupId":' + _0x3c4f5d.prizeGroupId + ',"prizeBaseId":' + _0x3c4f5d.prizeBaseId + ',"prizeType":' + _0x3c4f5d.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x15c074 => {
    $.post(_0x5958b8(_0x2609e4), async (_0x87395b, _0x3553ce, _0x4c8da8) => {
      try {
        if (_0x87395b) console.log('' + JSON.stringify(_0x87395b)), console.log(' API请求失败，请检查网路重试');else {
          _0x4c8da8 = JSON.parse(_0x4c8da8);
          if (_0x4c8da8.code == 0) _0x4c8da8.data.message.indexOf('提现') > -1 ? console.log('----提现成功 🤑') : console.log(_0x4c8da8.data.message);else {
            console.log(_0x4c8da8.errMsg);
          }
        }
      } catch (_0x2411ec) {
        $.logErr(_0x2411ec, _0x3553ce);
      } finally {
        _0x15c074(_0x4c8da8);
      }
    });
  });
}
function _0x5958b8(_0x38a3ee) {
  const _0x20e55e = {};
  _0x20e55e.Host = 'api.m.jd.com', _0x20e55e.Origin = 'https://prodev.m.jd.com', _0x20e55e['Content-Type'] = 'application/x-www-form-urlencoded';
  _0x20e55e['User-Agent'] = $.UA, _0x20e55e.Cookie = _0x4607f9;
  const _0x1a2600 = {};
  _0x1a2600.url = 'https://api.m.jd.com/?' + _0x38a3ee;
  return _0x1a2600.headers = _0x20e55e, _0x1a2600;
}
function _0x486b93() {
  return new Promise(_0x13e142 => {
    {
      const _0x529ed1 = {};
      _0x529ed1.Cookie = _0x4607f9, _0x529ed1.referer = 'https://h5.m.jd.com/', _0x529ed1['User-Agent'] = $.UA;
      const _0x161755 = {};
      _0x161755.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin', _0x161755.headers = _0x529ed1, _0x161755.timeout = 0x2710;
      const _0x21e922 = _0x161755;
      $.get(_0x21e922, (_0x164b15, _0x4b86ab, _0x210d41) => {
        try {
          if (_0x210d41) {
            _0x210d41 = JSON.parse(_0x210d41);
            if (_0x210d41.islogin === '1') {} else _0x210d41.islogin === '0' && ($.isLogin = false);
          }
        } catch (_0x3c961e) {
          console.log(_0x3c961e);
        } finally {
          _0x13e142();
        }
      });
    }
  });
}
function _0x34465e() {
  return new Promise(_0x4a7617 => {
    !_0x59e8f5 ? $.msg($.name, '', '' + _0x1e4862) : $.log('京东账号' + $.index + $.nickName + '\n' + _0x1e4862), _0x4a7617();
  });
}
function _0x39c05e(_0x5e7d0d) {
  try {
    if (typeof JSON.parse(_0x5e7d0d) == 'object') {
      return true;
    }
  } catch (_0x5be6c2) {
    return console.log(_0x5be6c2), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}
function _0x5d7f32(_0x392da4) {
  if (typeof _0x392da4 == 'string') try {
    return JSON.parse(_0x392da4);
  } catch (_0x53d169) {
    return console.log(_0x53d169), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}
function _0x178722(_0x303cb5) {
  const _0x1e05bc = {};
  _0x1e05bc['Content-Type'] = 'application/json';
  let _0x507160 = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x303cb5),
      'headers': _0x1e05bc,
      'timeout': 0x2710
    },
    _0x36d8c9 = '';
  return new Promise(_0x52a6e1 => {
    $.post(_0x507160, (_0x284b9a, _0x49738d, _0x58e678) => {
      try {
        _0x284b9a ? console.log('获取失败') : (_0x58e678 = JSON.parse(_0x58e678), _0x58e678.code == 200 ? _0x36d8c9 = _0x58e678.data : $.log(_0x58e678.msg));
      } catch (_0x4425a7) {
        console.log(_0x4425a7, _0x49738d);
      } finally {
        _0x52a6e1(_0x36d8c9);
      }
    });
  });
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }