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
const _0x3fb200 = $.isNode() ? require('./sendNotify') : '',
  _0x2bf0be = $.isNode() ? require('./jdCookie.js') : '',
  _0x2acb6e = require('./USER_AGENTS');
let _0x1c090d = true,
  _0x55cf4a = [],
  _0x159ead = [],
  _0x544a4c = [],
  _0x3d17c0 = [],
  _0x304333 = '',
  _0x54a411 = '',
  _0xfe2207 = '',
  _0x57653d,
  _0x2f7959 = process.env.JXCXJNUM || '50',
  _0x4f09a9 = process.env.JXCXJTOP || '5';
if ($.isNode()) {
  Object.keys(_0x2bf0be).forEach(_0x7ebbf2 => {
    _0x3d17c0.push(_0x2bf0be[_0x7ebbf2]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x3d17c0 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0xbfba35($.getdata('CookiesJD') || '[]').map(_0x363617 => _0x363617.cookie)].filter(_0x1e4610 => !!_0x1e4610);
!(async () => {
  if (!_0x3d17c0[0]) {
    const _0x4aa39e = {};
    _0x4aa39e['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4aa39e);
    return;
  }
  $.log('\n当前版本：3.0.4 fix小问题新增抽奖统计');
  console.log('执行流程，前' + _0x4f09a9 + 'CK车头--助力--抽奖--检查提现'), console.log('问题建议：https://t.me/dylan_jdpro');
//   let _0x2c3542 = await _0x321c6a();
  for (let _0x401d88 = 0; _0x401d88 < _0x4f09a9; _0x401d88++) {
    if (_0x3d17c0[_0x401d88]) {
      _0x304333 = _0x3d17c0[_0x401d88], $.UserName = decodeURIComponent(_0x304333.match(/pt_pin=([^; ]+)(?=;?)/) && _0x304333.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x401d88 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x2acb6e.UARAM ? _0x2acb6e.UARAM(1) : _0x2acb6e.USER_AGENT, await _0x524a62(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      if (!$.isLogin) {
        const _0x5ea15f = {};
        _0x5ea15f['open-url'] = 'https://bean.m.jd.com/bean/signIndex.action', $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x5ea15f);
        $.isNode() && (await _0x3fb200.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }
      await _0x3ccebd(1), await $.wait(1000);
    }
  }
//   if (_0x2c3542.length != 0) {
//     let _0x4afd1a = _0x2c3542[Math.floor(Math.random() * _0x2c3542.length)];
//     console.log('\nCk1去助力作者：'), _0x304333 = _0x3d17c0[0], $.UserName = decodeURIComponent(_0x304333.match(/pt_pin=([^; ]+)(?=;?)/) && _0x304333.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.UA = _0x2acb6e.UARAM ? _0x2acb6e.UARAM(1) : _0x2acb6e.USER_AGENT, await _0x5d85b2(_0x4afd1a), await $.wait(2000);
//   }
  console.log('\n\n开始内部助力：'), _0x57653d = 1;
  for (let _0x28fe1a of _0x55cf4a) {
    console.log('\n去助力-> ' + _0x28fe1a), $.suc = 0, $.alr = 0, $.nhp = 0;
    for (let _0x3bd7bf = _0x57653d; _0x3bd7bf < _0x3d17c0.length; _0x3bd7bf++) {
      if (_0x3d17c0[_0x3bd7bf]) {
        _0x304333 = _0x3d17c0[_0x3bd7bf], $.UserName = decodeURIComponent(_0x304333.match(/pt_pin=([^; ]+)(?=;?)/) && _0x304333.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3bd7bf + 1, $.isLogin = true, $.nickName = '', $.UA = _0x2acb6e.UARAM ? _0x2acb6e.UARAM(1) : _0x2acb6e.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x5d85b2(_0x28fe1a);
        if ($.suc > Number(_0x2f7959) + 1) {
          $.log('已达目标助力数，跳出！'), _0x57653d = _0x3bd7bf + 1;
          break;
        }
        ;
        await $.wait(1000);
      }
    }
    if ($.index === _0x3d17c0.length) {
      console.log('\n没有可用于助力的ck，跳出！');
      break;
    }
    ;
  }
  console.log('\n\n开始抽奖和提现：');
  for (let _0x1725c7 = 0; _0x1725c7 < _0x3d17c0.length; _0x1725c7++) {
    if (_0x3d17c0[_0x1725c7]) {
      _0x304333 = _0x3d17c0[_0x1725c7], $.UserName = decodeURIComponent(_0x304333.match(/pt_pin=([^; ]+)(?=;?)/) && _0x304333.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x1725c7 + 1, $.isLogin = true, $.nickName = '', $.fail = 0, (_0x159ead = [], _0x544a4c = []), $.UA = _0x2acb6e.UARAM ? _0x2acb6e.UARAM(1) : _0x2acb6e.USER_AGENT, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await _0x3ccebd(0), $.log('当前有' + $.times + '次抽奖机会！');
      for (let _0x1d5bdd = 0; _0x1d5bdd < $.times; _0x1d5bdd++) {
        $.log('开始第' + (_0x1d5bdd + 1) + '次抽奖:'), await _0x22969d(), await $.wait(1000);
        if ($.fail > 2) {
          $.log('连续3次优惠券，不继续抽了');
          break;
        }
        ;
      }
      _0x544a4c.length !== 0 && $.log('\n本次抽奖获得红包总计：' + _0x544a4c.reduce((_0x20a0cb, _0x44b8b8) => _0x20a0cb + _0x44b8b8 * 100, 0) / 100 + '元'), _0x159ead.length !== 0 && $.log('\n本次抽奖获得现金总计：' + _0x159ead.reduce((_0x1d3b2b, _0x164e28) => _0x1d3b2b + _0x164e28 * 100, 0) / 100 + '元');
      for (let _0x29a36f = 0; _0x29a36f < 15; _0x29a36f++) {
        await _0x1a7abe(_0x29a36f + 1), await $.wait(400);
        if (!$.baglist || $.baglist.length === 0) break;
        for (let _0x4129b5 of $.baglist) {
          _0x4129b5.prizeType == 4 && _0x4129b5.state == 0 && ($.log('\n开始提现 ' + _0x4129b5.prizeConfigName), await _0x3c5dd6(_0x4129b5), _0x159ead.push(parseFloat(_0x4129b5.amount)), await $.wait(5000));
        }
      }
      await $.wait(2000);
    }
  }
})().catch(_0x515ed1 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x515ed1 + '!', '');
}).finally(() => {
  $.done();
});
async function _0x3ccebd(_0x4932d8) {
  let _0x141936 = 'functionId=inviteFissionHome&body={"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","inviter":""}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0xa766c8 => {
    $.post(_0x4ff42d(_0x141936), async (_0x2781c2, _0x182139, _0x226537) => {
      try {
        if (_0x2781c2) console.log('' + JSON.stringify(_0x2781c2)), console.log(' API请求失败，请检查网路重试');else {
          _0x226537 = JSON.parse(_0x226537);
          if (_0x226537.code == 0) {
            $.times = _0x226537.data.prizeNum;
            if (_0x4932d8) console.log('助力码：' + _0x226537.data.inviter);
            _0x55cf4a.push(_0x226537.data.inviter);
          } else console.log(_0x226537.errMsg);
        }
      } catch (_0x4f8841) {
        $.logErr(_0x4f8841, _0x182139);
      } finally {
        _0xa766c8(_0x226537);
      }
    });
  });
}
async function _0x22969d() {
  const _0x17bb68 = {};
  _0x17bb68.linkId = 'Wvzc_VpNTlSkiQdHT8r7QA';
  let _0x172234 = _0x17bb68,
    _0x640a54 = {
      'appId': 'c02c6',
      'fn': 'inviteFissionDrawPrize',
      'body': _0x172234,
      'apid': 'activities_platform',
      'ver': $.UA.split(';')[2],
      'cl': 'ios',
      'user': $.UserName,
      'code': 0x1,
      'ua': $.UA
    };
  _0x172234 =await _0x599b5f(_0x640a54)// : 'functionId=inviteFissionDrawPrize&body=' + _0x172234 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x172234) return;
  return new Promise(async _0x9f26db => {
    $.post(_0x4ff42d(_0x172234), async (_0x14bda3, _0x2916b4, _0x401bdc) => {
      try {
        if (_0x14bda3) console.log('' + JSON.stringify(_0x14bda3)), console.log(' API请求失败，请检查网路重试');else {
          _0x401bdc = JSON.parse(_0x401bdc);
          if (_0x401bdc.code == 0) {
            const _0x21028d = _0x401bdc.data.prizeType;
            if (!_0x21028d) fail++;
            switch (_0x21028d) {
              case 1:
                console.log('----获得：垃圾卷 😤'), $.fail++;
                break;
              case 4:
                let _0x1a8ccc = parseFloat(_0x401bdc.data.prizeValue).toFixed(2);
                console.log('----获得现金：' + _0x1a8ccc + ' 💴'), _0x159ead.push(_0x1a8ccc), $.fail = 0;
                break;
              case 2:
                let _0x136401 = parseFloat(_0x401bdc.data.prizeValue).toFixed(2);
                console.log('----获得红包：' + _0x136401 + ' 🧧'), _0x544a4c.push(_0x136401), $.fail = 0;
                break;
              default:
                console.log(JSON.stringify(_0x401bdc.data));
            }
          } else console.log(_0x401bdc.errMsg);
        }
      } catch (_0xe9ac5b) {
        $.logErr(_0xe9ac5b, _0x2916b4);
      } finally {
        _0x9f26db(_0x401bdc);
      }
    });
  });
}
async function _0x1a7abe(_0x532fae) {
  let _0xace6b9 = 'functionId=superRedBagList&body={"pageNum":' + _0x532fae + ',"pageSize":20,"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","business":"fission"}&t=' + Date.now() + '&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2] + '&loginType=2&loginWQBiz=wegame&x-api-eid-token=jdd03UQGO66D2XTA5KWVGHZWLKZMJDRVQ5RRE7Q27ZFZT6TAHVRJ4VPJSYN5MCTO5SRE76FNP6WTRI4SZTRNP4NC5663E6IAAAAMILDIBNKQAAAAACT7CEBEHA6D5CQX';
  return new Promise(async _0x298317 => {
    $.get(_0x4ff42d(_0xace6b9), async (_0x28c622, _0x4f01c1, _0x15efe1) => {
      try {
        if (_0x28c622) console.log('' + JSON.stringify(_0x28c622)), console.log(' API请求失败，请检查网路重试');else {
          _0x15efe1 = JSON.parse(_0x15efe1), _0x15efe1.code == 0 ? $.baglist = _0x15efe1.data.items : console.log(_0x15efe1.errMsg);
        }
      } catch (_0x31763b) {
        $.logErr(_0x31763b, _0x4f01c1);
      } finally {
        _0x298317(_0x15efe1);
      }
    });
  });
}
async function _0x5d85b2(_0x88f758) {
  const _0x2abda5 = {};
  _0x2abda5.linkId = 'Wvzc_VpNTlSkiQdHT8r7QA', _0x2abda5.isJdApp = true, _0x2abda5.inviter = _0x88f758;
  let _0x556aa0 = _0x2abda5;
  let _0x1bd4f5 = {
    'appId': '02f8d',
    'fn': 'inviteFissionBeforeHome',
    'body': _0x556aa0,
    'apid': 'activities_platform',
    'ver': $.UA.split(';')[2],
    'cl': 'ios',
    'user': $.UserName,
    'code': 0x1,
    'ua': $.UA
  };
  _0x556aa0 = await _0x599b5f(_0x1bd4f5) //: 'functionId=inviteFissionBeforeHome&body=' + _0x556aa0 + '&appid=activities_platform&client=ios&clientVersion=5.5.3&t=' + Date.now();
  if (!_0x556aa0) return;
  return new Promise(async _0x257333 => {
    $.post(_0x4ff42d(_0x556aa0), async (_0x18af37, _0x5c20fa, _0x4a956c) => {
      try {
        if (_0x18af37) console.log('' + JSON.stringify(_0x18af37)), console.log(' API请求失败，请检查网路重试');else {
          _0x4a956c = JSON.parse(_0x4a956c);
          if (_0x4a956c.code == 0) {
            if (!_0x4a956c.data.helpFlg) {
              $.log('结果：不能助力自己！');
              return;
            }
            ;
            if (_0x4a956c.data.helpResult == 1) $.suc++, $.alr = 0, console.log('结果：助力成功 ✅ ' + ($.suc || ''));else {
              if (_0x4a956c.data.helpResult == 6) console.log('结果：已经助力过TA！'), $.alr++;else {
                if (_0x4a956c.data.helpResult == 3) console.log('结果：没有次数了！'), $.nohelp = true, $.nhp++;else {
                  if (_0x4a956c.data.helpResult == 2) $.log('结果：助力黑了 💣'), $.hot = true;else {
                    if (_0x4a956c.data.helpResult == 4) $.log('结果：没有助力次数！'), $.nhp++;else _0x4a956c.data.helpResult == 8 ? $.log('结果：TA未开启新的一轮 💤') : console.log(JSON.stringify(_0x4a956c));
                  }
                }
              }
            }
          } else console.log(_0x4a956c.errMsg);
        }
      } catch (_0x24c045) {
        $.logErr(_0x24c045, _0x5c20fa);
      } finally {
        _0x257333(_0x4a956c);
      }
    });
  });
}
async function _0x3c5dd6(_0x4acfb5) {
  let _0x45c996 = 'functionId=apCashWithDraw&body={"linkId":"Wvzc_VpNTlSkiQdHT8r7QA","businessSource":"NONE","base":{"id":' + _0x4acfb5.id + ',"business":"fission","poolBaseId":' + _0x4acfb5.poolBaseId + ',"prizeGroupId":' + _0x4acfb5.prizeGroupId + ',"prizeBaseId":' + _0x4acfb5.prizeBaseId + ',"prizeType":' + _0x4acfb5.prizeType + '}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=' + $.UA.split(';')[2];
  return new Promise(async _0x362be3 => {
    $.post(_0x4ff42d(_0x45c996), async (_0x770a73, _0x3cab55, _0x221a9c) => {
      try {
        _0x770a73 ? (console.log('' + JSON.stringify(_0x770a73)), console.log(' API请求失败，请检查网路重试')) : (_0x221a9c = JSON.parse(_0x221a9c), _0x221a9c.code == 0 ? _0x221a9c.data.message.indexOf('提现') > -1 ? console.log('----提现成功 🤑') : console.log(_0x221a9c.data.message) : console.log(_0x221a9c.errMsg));
      } catch (_0xbb33) {
        $.logErr(_0xbb33, _0x3cab55);
      } finally {
        _0x362be3(_0x221a9c);
      }
    });
  });
}
function _0x4ff42d(_0x48d961) {
  const _0x148c4c = {};
  _0x148c4c.Host = 'api.m.jd.com', _0x148c4c.Origin = 'https://prodev.m.jd.com', _0x148c4c['Content-Type'] = 'application/x-www-form-urlencoded';
  _0x148c4c['User-Agent'] = $.UA, _0x148c4c.Cookie = _0x304333;
  const _0xbc9672 = {};
  return _0xbc9672.url = 'https://api.m.jd.com/?' + _0x48d961, _0xbc9672.headers = _0x148c4c, _0xbc9672;
}
function _0x524a62() {
  return new Promise(_0x18994d => {
    const _0x234cd8 = {};
    _0x234cd8.Cookie = _0x304333, _0x234cd8.referer = 'https://h5.m.jd.com/', _0x234cd8['User-Agent'] = $.UA;
    const _0xad4207 = {};
    _0xad4207.url = 'https://plogin.m.jd.com/cgi-bin/ml/islogin';
    _0xad4207.headers = _0x234cd8, _0xad4207.timeout = 0x2710;
    const _0x260100 = _0xad4207;
    $.get(_0x260100, (_0x920fa3, _0x5c73b7, _0x493854) => {
      try {
        if (_0x493854) {
          _0x493854 = JSON.parse(_0x493854);
          if (_0x493854.islogin === '1') {} else {
            if (_0x493854.islogin === '0') {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x5356e9) {
        console.log(_0x5356e9);
      } finally {
        _0x18994d();
      }
    });
  });
}
function _0x31f3df() {
  return new Promise(_0x18884d => {
    !_0x1c090d ? $.msg($.name, '', '' + _0x54a411) : $.log('京东账号' + $.index + $.nickName + '\n' + _0x54a411), _0x18884d();
  });
}
function _0x15907d(_0x37be6c) {
  try {
    if (typeof JSON.parse(_0x37be6c) == 'object') return true;
  } catch (_0x146c56) {
    return console.log(_0x146c56), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}
function _0x321c6a() {
  const _0x2a6e1d = {};
  _0x2a6e1d.url = 'https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jxcxj', _0x2a6e1d.timeout = 0x7530;
  let _0x43c9c9 = _0x2a6e1d;
  return new Promise(_0x33a574 => {
    $.get(_0x43c9c9, async (_0xd36394, _0x36a4ff, _0x175047) => {
      try {
        if (_0xd36394) console.log('\n服务连接失败，终止执行！'), process.exit(111);else {
          if (_0x175047) {
            _0x175047 = JSON.parse(_0x175047);
            if (_0x175047.code === 200) _0xfe2207 = _0x175047.data;else {}
          }
        }
      } catch (_0x290bbf) {
        $.logErr(_0x290bbf, _0x36a4ff);
      } finally {
        _0x33a574(_0xfe2207);
      }
    });
  });
}
function _0xbfba35(_0x5b6eba) {
  if (typeof _0x5b6eba == 'string') {
    try {
      return JSON.parse(_0x5b6eba);
    } catch (_0x1897d6) {
      return console.log(_0x1897d6), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}
function _0x599b5f(_0x165ff3) {
  const _0x2b0eaa = {};
  _0x2b0eaa['Content-Type'] = 'application/json';
  let _0xd3c063 = {
      'url': 'http://123.57.164.4:8080/cxj',
      'body': JSON.stringify(_0x165ff3),
      'headers': _0x2b0eaa,
      'timeout': 0x2710
    },
    _0x4c90c9 = '';
  return new Promise(_0x5d22a6 => {
    $.post(_0xd3c063, (_0x53e042, _0x5ee737, _0x1640d4) => {
      try {
        _0x53e042 ? console.log('连接失败') : (_0x1640d4 = JSON.parse(_0x1640d4), _0x1640d4.code == 200 ? _0x4c90c9 = _0x1640d4.data : $.log(_0x1640d4.msg));
      } catch (_0x3b9703) {
        console.log(_0x3b9703, _0x5ee737);
      } finally {
        _0x5d22a6(_0x4c90c9);
      }
    });
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }