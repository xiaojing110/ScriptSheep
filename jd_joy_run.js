/*
默认0.04倍，9点后自动0.01倍
倍数变量JOY_RUN_ASSETS='0.01'
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_joy_run.js
定时自定义
updatetime: 2022/12/4 fix
*/

const $ = new Env('汪汪赛跑-加密');
const _0x12ebca = $.isNode() ? require('./sendNotify') : '',
      _0x229cec = $.isNode() ? require('./jdCookie.js') : '',
      _0x5d3e7b = require('./function/dylany.js');

let _0x4839f2 = true,
    _0x4d1daf = [],
    _0xbf3dbd = '',
    _0x311949 = '';

if ($.isNode()) {
  Object.keys(_0x229cec).forEach(_0x105498 => {
    _0x4d1daf.push(_0x229cec[_0x105498]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x4d1daf = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x46f61b($.getdata('CookiesJD') || '[]').map(_0x4831a9 => _0x4831a9.cookie)].filter(_0x1af78f => !!_0x1af78f);

let _0x8eb091 = parseFloat(process.env.JOY_RUN_ASSETS || '0.04');

!(async () => {
  if (!_0x4d1daf[0]) {
    const _0x1c979b = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x1c979b);
    return;
  }

  console.log('最大0.04倍，9点后0.01档，问题建议：https://t.me/dylan_jdpro');
  let _0x4f3265 = '';

  for (let _0x2b50bc = 0; _0x2b50bc < _0x4d1daf.length; _0x2b50bc++) {
    if (_0x4d1daf[_0x2b50bc]) {
      _0xbf3dbd = _0x4d1daf[_0x2b50bc], $.UserName = decodeURIComponent(_0xbf3dbd.match(/pt_pin=([^; ]+)(?=;?)/) && _0xbf3dbd.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2b50bc + 1, $.isLogin = true, $.nickName = '', $.UA = require('./USER_AGENTS').UARAM(), await _0x14536b(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x2330d1 = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x2330d1);
        $.isNode() && (await _0x12ebca.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      let _0x1f66b7 = await _0x3fba1c('runningMyPrize', '{"linkId": "L-sOanK_5RJCz7I314FpnQ","pageSize": 30,"time": null,"ids": null}'),
          _0x4f206a = 0,
          _0x44f52e = 0;

      await $.wait(500);

      for (let _0x2461b2 of _0x1f66b7?.['data']?.['detailVos'] || []) {
        if (_0x2461b2.amount > 0 && new Date(_0x2461b2.createTime).getDate() === new Date().getDate()) _0x4f206a = _0x4f206a + _0x2461b2.amount, _0x44f52e++;else {
          break;
        }
      }

      console.log('今日成功：', _0x44f52e, '次'), console.log('今日收益：', _0x4f206a.toFixed(2), '元'), _0x8eb091 >= '0.04' && (_0x8eb091 = '0.04'), _0x1f66b7 = await _0x3fba1c('runningTeamInfo', '{"linkId":"L-sOanK_5RJCz7I314FpnQ"}'), await $.wait(500);

      if (!_0x4f3265) {
        if (_0x1f66b7.data.members.length === 0) console.log('成为队长！'), _0x4f3265 = _0x1f66b7.data.captainId;else _0x1f66b7.data.members.length !== 6 ? (console.log('队伍人员：', _0x1f66b7.data.members.length, '人'), console.log('战队收益：', _0x1f66b7.data.teamSumPrize, '元'), _0x4f3265 = _0x1f66b7.data.captainId) : (console.log('队伍已满：', _0x1f66b7.data.members.length, '人'), console.log('战队收益：', _0x1f66b7.data.teamSumPrize, '元'));
      } else {
        if (_0x4f3265 && _0x1f66b7.data.members.length === 0) {
          console.log('已有队伍ID，去加入');
          const _0x4b270d = {
            'linkId': 'L-sOanK_5RJCz7I314FpnQ'
          };
          _0x4b270d.captainId = _0x4f3265, _0x1f66b7 = await _0x2e1d22('runningJoinTeam', _0x4b270d);

          if (_0x1f66b7.code === 0) {
            console.log('组队成功！');

            for (let _0x9c5b4f of _0x1f66b7.data.members) {
              if (_0x9c5b4f.captain) {
                console.log('队长：', _0x9c5b4f.nickName);
                break;
              }
            }

            _0x1f66b7.data.members.length === 6 && (console.log('队伍已满！'), _0x4f3265 = '');
          } else console.log('组队失败：' + JSON.stringify(_0x1f66b7));
        } else console.log('已组队：', _0x1f66b7.data.members.length, '人'), console.log('战队收益：', _0x1f66b7.data.teamSumPrize, '元');
      }

      if (_0x8eb091 > '0.05') _0x8eb091 = '0.04';
      _0x1f66b7 = await _0x3fba1c('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), await $.wait(500), console.log('🧧总金额：', _0x1f66b7.data.runningHomeInfo.prizeValue, '元');
      let _0x34f65e = _0x1f66b7.data.runningHomeInfo.energy;
      console.log('💊 X', _0x34f65e, '个能量棒');

      if (_0x1f66b7.data.runningHomeInfo.nextRunningTime) {
        console.log('⏳体力恢复中，还有', _0x446bbb(_0x1f66b7.data.runningHomeInfo.nextRunningTime / 1000));
        if (_0x1f66b7.data.runningHomeInfo.nextRunningTime / 1000 < 300) await $.wait(_0x1f66b7.data.runningHomeInfo.nextRunningTime), _0x1f66b7 = await _0x3fba1c('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), console.log('体力恢复完成，开始跑步....'), await $.wait(1000);else {
          console.log('⏳等体力恢复在跑吧！');
          continue;
        }
      } else console.log('体力已恢复，开始跑步....');

      new Date().getHours() > '9' && (_0x8eb091 = '0.01'), await _0x84c164(_0x1f66b7, _0x8eb091);

      for (let _0x2daa05 = 0; _0x2daa05 < _0x34f65e; _0x2daa05++) {
        console.log('💉消耗能量棒跑步....');
        const _0x2e87d5 = {
          'linkId': 'L-sOanK_5RJCz7I314FpnQ'
        };
        _0x1f66b7 = await _0x299de4('runningUseEnergyBar', _0x2e87d5);
        _0x1f66b7 = await _0x3fba1c('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}');
        await _0x84c164(_0x1f66b7, _0x8eb091);
        await $.wait(1000);
      }

      _0x1f66b7 = await _0x3fba1c('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), console.log('🧧总金额：', _0x1f66b7.data.runningHomeInfo.prizeValue, '元'), await $.wait(2000);
    }
  }
})().catch(_0x1875ab => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1875ab + '!', '');
}).finally(() => {
  $.done();
});

function _0x3fba1c(_0x42c778, _0x198998) {
  const _0x26fb9b = {
    'Origin': 'https://h5platform.jd.com'
  };
  _0x26fb9b['User-Agent'] = $.UA, _0x26fb9b.Cookie = _0xbf3dbd;
  let _0x1f9cce = {
    'url': 'https://api.m.jd.com/?functionId=' + _0x42c778 + '&body=' + encodeURIComponent(_0x198998) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2',
    'headers': _0x26fb9b
  };
  return new Promise(async _0x1f5bd4 => {
    $.get(_0x1f9cce, async (_0x17a408, _0x3f8c5b, _0x18c937) => {
      try {
        if (_0x17a408) console.log('' + JSON.stringify(_0x17a408)), console.log(' API请求失败，请检查网路重试');else {
          _0x18c937 = JSON.parse(_0x18c937);

          if (_0x18c937.success) {} else console.log(_0x18c937);
        }
      } catch (_0x39bcd1) {
        $.logErr(_0x39bcd1, _0x3f8c5b);
      } finally {
        _0x1f5bd4(_0x18c937);
      }
    });
  });
}

async function _0x2e1d22(_0x22a7fc, _0x59b817) {
  const _0x32c45d = {
    'apid': 'activities_platform',
    'ver': '3.9.2',
    'code': 0x1,
    'appId': '448de',
    'cl': 'android'
  };
  _0x32c45d.fn = _0x22a7fc, _0x32c45d.body = _0x59b817;
  _0x32c45d.user = $.UserName, _0x32c45d.ua = $.UA;
  let _0x38fb7e = _0x32c45d;
  _0x59b817 = await _0x5d3e7b.getbody(_0x38fb7e);
  const _0x2b7b0d = {
    'Origin': 'https://h5platform.jd.com'
  };
  _0x2b7b0d['User-Agent'] = $.UA, _0x2b7b0d.Cookie = _0xbf3dbd;
  const _0x4637ec = {};
  _0x4637ec.url = 'https://api.m.jd.com/?' + _0x59b817;
  _0x4637ec.headers = _0x2b7b0d;
  let _0x1abc66 = _0x4637ec;
  return new Promise(async _0x5e6be1 => {
    $.get(_0x1abc66, async (_0x1a0320, _0x4b0053, _0x59281c) => {
      try {
        _0x1a0320 ? (console.log('' + JSON.stringify(_0x1a0320)), console.log(' API请求失败，请检查网路重试')) : _0x59281c = JSON.parse(_0x59281c);
      } catch (_0x3de66e) {
        $.logErr(_0x3de66e, _0x4b0053);
      } finally {
        _0x5e6be1(_0x59281c);
      }
    });
  });
}

async function _0x84c164(_0xe5f3a2, _0x290092) {
  if (!_0xe5f3a2.data.runningHomeInfo.nextRunningTime) {
    console.log('终点目标', _0x290092);
    let _0x132e40 = '__jd_ref_cls=Allrun_Run;';

    for (let _0x35da34 = 0; _0x35da34 < 5; _0x35da34++) {
      if (_0x35da34 > 0) _0x132e40 = '__jd_ref_cls=CommonSecurityOnSign;';
      const _0x5baf96 = {
        'linkId': 'L-sOanK_5RJCz7I314FpnQ'
      };
      _0xe5f3a2 = await _0xe359f4('runningOpenBox', _0x5baf96, 'b6ac3', _0x132e40);

      if (parseFloat(_0xe5f3a2.data.assets) >= _0x290092) {
        await $.wait(500);
        const _0x41a855 = {
          'linkId': 'L-sOanK_5RJCz7I314FpnQ'
        };
        _0xe5f3a2 = await _0x299de4('runningPreserveAssets', _0x41a855), console.log('领取成功', parseFloat(_0xe5f3a2.data.assets));
        break;
      } else {
        if (_0xe5f3a2.data.doubleSuccess) console.log('翻倍成功', parseFloat(_0xe5f3a2.data.assets)), await $.wait(10000);else {
          if (!_0xe5f3a2.data.doubleSuccess && !_0xe5f3a2.data.runningHomeInfo.runningFinish) console.log('开始跑步', parseFloat(_0xe5f3a2.data.assets)), await $.wait(10000);else {
            console.log('翻倍失败');
            break;
          }
        }
      }
    }
  }
}

async function _0x299de4(_0x39b1f1, _0x304ffb) {
  _0x304ffb = 'functionId=' + _0x39b1f1 + '&body=' + JSON.stringify(_0x304ffb) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2';
  const _0x5a0740 = {
    'content-type': 'application/x-www-form-urlencoded',
    'origin': 'https://h5platform.jd.com',
    'referer': 'https://h5platform.jd.com/'
  };
  _0x5a0740.cookie = _0xbf3dbd;
  _0x5a0740['user-agent'] = $.UA;
  const _0x461db9 = {
    'url': 'https://api.m.jd.com'
  };
  _0x461db9.body = _0x304ffb, _0x461db9.headers = _0x5a0740;
  let _0x3451c0 = _0x461db9;
  return new Promise(async _0x231fb2 => {
    $.post(_0x3451c0, async (_0x44fc09, _0xf5c6d6, _0x5b1477) => {
      try {
        if (_0x44fc09) console.log('' + JSON.stringify(_0x44fc09)), console.log(' API请求失败，请检查网路重试');else {
          _0x5b1477 = JSON.parse(_0x5b1477);

          if (_0x5b1477.success) {} else {
            console.log(_0x5b1477);
          }
        }
      } catch (_0x44aefb) {
        $.logErr(_0x44aefb, _0xf5c6d6);
      } finally {
        _0x231fb2(_0x5b1477);
      }
    });
  });
}

async function _0xe359f4(_0x57bbc1, _0x3e4693, _0x5adb0d, _0x3ab7b8 = '') {
  let _0x487fe3 = 1;
  if (_0x8eb091 > '0.04') _0x487fe3 = 0;
  const _0x32fe72 = {
    'apid': 'activities_platform',
    'ver': '3.9.2',
    'cl': 'android'
  };
  _0x32fe72.appId = _0x5adb0d, _0x32fe72.fn = _0x57bbc1, _0x32fe72.body = _0x3e4693;
  _0x32fe72.user = $.UserName, _0x32fe72.code = _0x487fe3, _0x32fe72.ua = $.UA;
  let _0x20afb5 = _0x32fe72;
  _0x3e4693 = await _0x5d3e7b.getbody(_0x20afb5);
  let _0x408be2 = {
    'url': 'https://api.m.jd.com',
    'body': _0x3e4693,
    'headers': {
      'content-type': 'application/x-www-form-urlencoded',
      'cookie': _0xbf3dbd + _0x3ab7b8,
      'origin': 'https://h5platform.jd.com',
      'referer': 'https://h5platform.jd.com/',
      'user-agent': $.UA
    }
  };
  return new Promise(async _0x232c43 => {
    $.post(_0x408be2, async (_0x1f5472, _0x15694d, _0x3eaa02) => {
      try {
        if (_0x1f5472) console.log('' + JSON.stringify(_0x1f5472)), console.log(' API请求失败，请检查网路重试');else {
          _0x3eaa02 = JSON.parse(_0x3eaa02);

          if (_0x3eaa02.success) {} else console.log(_0x3eaa02);
        }
      } catch (_0x5bec3b) {
        $.logErr(_0x5bec3b, _0x15694d);
      } finally {
        _0x232c43(_0x3eaa02);
      }
    });
  });
}

function _0x14536b() {
  return new Promise(_0x132021 => {
    {
      const _0x17e67b = {
        'referer': 'https://h5.m.jd.com/'
      };
      _0x17e67b.Cookie = _0xbf3dbd, _0x17e67b['User-Agent'] = $.UA;
      const _0xfac30f = {
        'timeout': 0x2710,
        'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin'
      };
      _0xfac30f.headers = _0x17e67b;
      const _0x3fb6c4 = _0xfac30f;
      $.get(_0x3fb6c4, (_0x16c7dd, _0x255dfd, _0x547854) => {
        try {
          if (_0x547854) {
            _0x547854 = JSON.parse(_0x547854);

            if (_0x547854.islogin === '1') {} else _0x547854.islogin === '0' && ($.isLogin = false);
          }
        } catch (_0x430b98) {
          console.log(_0x430b98);
        } finally {
          _0x132021();
        }
      });
    }
  });
}

function _0x3a82dc() {
  return new Promise(_0x3689a8 => {
    {
      if (!_0x4839f2) {
        $.msg($.name, '', '' + _0x311949);
      } else $.log('京东账号' + $.index + $.nickName + '\n' + _0x311949);

      _0x3689a8();
    }
  });
}

function _0xfae162(_0x49789b) {
  try {
    if (typeof JSON.parse(_0x49789b) == 'object') {
      return true;
    }
  } catch (_0xccc9c8) {
    return console.log(_0xccc9c8), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x46f61b(_0x552d0e) {
  const _0x4da763 = function () {
    let _0x36b9b8 = true;
    return function (_0x3e471f, _0x5cb15d) {
      {
        const _0x454e1c = _0x36b9b8 ? function () {
          {
            if (_0x5cb15d) {
              const _0x2c3581 = _0x5cb15d.apply(_0x3e471f, arguments);

              return _0x5cb15d = null, _0x2c3581;
            }
          }
        } : function () {};

        return _0x36b9b8 = false, _0x454e1c;
      }
    };
  }();

  const _0x4006ea = _0x4da763(this, function () {
    return _0x4006ea.toString().search('(((.+)+)+)+$').toString().constructor(_0x4006ea).search('(((.+)+)+)+$');
  });

  _0x4006ea();

  if (typeof _0x552d0e == 'string') try {
    return JSON.parse(_0x552d0e);
  } catch (_0x22fd5e) {
    return console.log(_0x22fd5e), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}

function _0x446bbb(_0x41eb57) {
  let _0x16ae69 = Math.floor(_0x41eb57 / 60),
      _0x515565 = Math.floor(_0x41eb57 % 60);

  return _0x16ae69 + '分' + _0x515565 + '秒';
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }