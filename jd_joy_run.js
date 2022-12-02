/*
默认倍数0.04，成功8次以后0.01
倍数变量JOY_RUN_ASSETS='0.01'
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_joy_run.js
定时自定义
updatetime: 2022/12/1
*/

const $ = new Env('汪汪赛跑-加密');

const _0x4ac65a = $.isNode() ? require('./sendNotify') : '';

const _0x2620ea = $.isNode() ? require('./jdCookie.js') : '',
      _0x908fda = require('./function/dylany.js');

let _0x1856cb = true,
    _0xb2a77a = [],
    _0x8b659b = '',
    _0x13b11d = '';

if ($.isNode()) {
  Object.keys(_0x2620ea).forEach(_0x2d4757 => {
    _0xb2a77a.push(_0x2620ea[_0x2d4757]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0xb2a77a = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x23ae56($.getdata('CookiesJD') || '[]').map(_0x52b164 => _0x52b164.cookie)].filter(_0x46dc55 => !!_0x46dc55);

!(async () => {
  if (!_0xb2a77a[0]) {
    const _0x4613f4 = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4613f4);
    return;
  }

  console.log('最大0.04倍，问题建议：https://t.me/dylan_jdpro');
  let _0x22ab20 = '';

  for (let _0x2815bc = 0; _0x2815bc < _0xb2a77a.length; _0x2815bc++) {
    if (_0xb2a77a[_0x2815bc]) {
      _0x8b659b = _0xb2a77a[_0x2815bc], $.UserName = decodeURIComponent(_0x8b659b.match(/pt_pin=([^; ]+)(?=;?)/) && _0x8b659b.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x2815bc + 1, $.isLogin = true, $.nickName = '', $.UA = require('./USER_AGENTS').UARAM(), await _0x45892d(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x22987a = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x22987a);

        if ($.isNode()) {
          await _0x4ac65a.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
      }

      let _0x416698 = parseFloat(process.env.JOY_RUN_ASSETS || '0.04'),
          _0x411cad = await _0x3299cd('runningMyPrize', '{"linkId": "L-sOanK_5RJCz7I314FpnQ","pageSize": 30,"time": null,"ids": null}'),
          _0x1ed1cb = 0,
          _0x2c17f1 = 0;

      await $.wait(500);

      for (let _0x496af4 of _0x411cad?.['data']?.['detailVos'] || []) {
        if (_0x496af4.amount > 0 && new Date(_0x496af4.createTime).getDate() === new Date().getDate()) _0x1ed1cb = _0x1ed1cb + _0x496af4.amount, _0x2c17f1++;else break;
      }

      console.log('今日成功：', _0x2c17f1, '次'), console.log('今日收益：', _0x1ed1cb.toFixed(2), '元'), _0x416698 >= 0.04 && (_0x416698 = 0.04), _0x411cad = await _0x3299cd('runningTeamInfo', '{"linkId":"L-sOanK_5RJCz7I314FpnQ"}'), await $.wait(500);

      if (!_0x22ab20) {
        if (_0x411cad.data.members.length === 0) console.log('成为队长！'), _0x22ab20 = _0x411cad.data.captainId;else _0x411cad.data.members.length !== 6 ? (console.log('队伍人员：', _0x411cad.data.members.length, '人'), console.log('战队收益：', _0x411cad.data.teamSumPrize, '元'), _0x22ab20 = _0x411cad.data.captainId) : (console.log('队伍已满：', _0x411cad.data.members.length, '人'), console.log('战队收益：', _0x411cad.data.teamSumPrize, '元'));
      } else {
        if (_0x22ab20 && _0x411cad.data.members.length === 0) {
          console.log('已有队伍ID，去加入');
          const _0x87287a = {
            'linkId': 'L-sOanK_5RJCz7I314FpnQ'
          };
          _0x87287a.captainId = _0x22ab20, _0x411cad = await _0x22d7f6('runningJoinTeam', _0x87287a);

          if (_0x411cad.code === 0) {
            console.log('组队成功！');

            for (let _0x53aa95 of _0x411cad.data.members) {
              if (_0x53aa95.captain) {
                console.log('队长：', _0x53aa95.nickName);
                break;
              }
            }

            _0x411cad.data.members.length === 6 && (console.log('队伍已满！'), _0x22ab20 = '');
          } else console.log('组队失败：' + JSON.stringify(_0x411cad));
        } else console.log('已组队：', _0x411cad.data.members.length, '人'), console.log('战队收益：', _0x411cad.data.teamSumPrize, '元');
      }

      if (_0x416698 > 0.05) _0x416698 = 0.04;
      _0x411cad = await _0x3299cd('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), await $.wait(500), console.log('🧧总金额：', _0x411cad.data.runningHomeInfo.prizeValue, '元');
      let _0x260879 = _0x411cad.data.runningHomeInfo.energy;
      console.log('💊 X', _0x260879, '个能量棒');

      if (_0x411cad.data.runningHomeInfo.nextRunningTime) {
        console.log('⏳体力恢复中，还有', _0x486a99(_0x411cad.data.runningHomeInfo.nextRunningTime / 1000));
        if (_0x411cad.data.runningHomeInfo.nextRunningTime / 1000 < 300) await $.wait(_0x411cad.data.runningHomeInfo.nextRunningTime), _0x411cad = await _0x3299cd('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), console.log('体力恢复完成，开始跑步....'), await $.wait(1000);else {
          console.log('⏳等体力恢复在跑吧！');
          continue;
        }
      } else console.log('体力已恢复，开始跑步....');

      _0x2c17f1 >= 8 && (_0x416698 = 0.01), await _0xe6b1a8(_0x411cad, _0x416698);

      for (let _0x5c9ebf = 0; _0x5c9ebf < _0x260879; _0x5c9ebf++) {
        console.log('💉消耗能量棒跑步....');
        const _0xd6c02f = {
          'linkId': 'L-sOanK_5RJCz7I314FpnQ'
        };
        _0x411cad = await _0x2c0c3e('runningUseEnergyBar', _0xd6c02f);
        _0x411cad = await _0x3299cd('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}');
        await _0xe6b1a8(_0x411cad, _0x416698);
        await $.wait(1000);
      }

      _0x411cad = await _0x3299cd('runningPageHome', '{"linkId":"L-sOanK_5RJCz7I314FpnQ","isFromJoyPark":false,"joyLinkId":""}'), console.log('🧧总金额：', _0x411cad.data.runningHomeInfo.prizeValue, '元'), await $.wait(2000);
    }
  }
})().catch(_0x32997a => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x32997a + '!', '');
}).finally(() => {
  $.done();
});

function _0x3299cd(_0xd8b915, _0x23e290) {
  let _0x5af13e = {
    'url': 'https://api.m.jd.com/?functionId=' + _0xd8b915 + '&body=' + encodeURIComponent(_0x23e290) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2',
    'headers': {
      'Origin': 'https://h5platform.jd.com',
      'User-Agent': $.UA,
      'Cookie': _0x8b659b
    }
  };
  return new Promise(async _0x166f79 => {
    $.get(_0x5af13e, async (_0x2942de, _0x577f18, _0x5ba7c5) => {
      try {
        if (_0x2942de) console.log('' + JSON.stringify(_0x2942de)), console.log(' API请求失败，请检查网路重试');else {
          _0x5ba7c5 = JSON.parse(_0x5ba7c5);

          if (_0x5ba7c5.success) {} else console.log(_0x5ba7c5);
        }
      } catch (_0x1668a1) {
        $.logErr(_0x1668a1, _0x577f18);
      } finally {
        _0x166f79(_0x5ba7c5);
      }
    });
  });
}

async function _0x22d7f6(_0x41fa85, _0x3b67ce) {
  const _0x3a4541 = {
    'appId': '448de',
    'cl': 'android',
    'code': 0x1,
    'apid': 'activities_platform',
    'ver': '3.9.2'
  };
  _0x3a4541.fn = _0x41fa85, _0x3a4541.body = _0x3b67ce, _0x3a4541.user = $.UserName, _0x3a4541.ua = $.UA;
  let _0x4775d0 = _0x3a4541;
  _0x3b67ce = await _0x908fda.getbody(_0x4775d0);
  const _0x99346f = {
    'Origin': 'https://h5platform.jd.com'
  };
  _0x99346f['User-Agent'] = $.UA, _0x99346f.Cookie = _0x8b659b;
  const _0x4149e4 = {};
  _0x4149e4.url = 'https://api.m.jd.com/?' + _0x3b67ce, _0x4149e4.headers = _0x99346f;
  let _0x5bbe47 = _0x4149e4;
  return new Promise(async _0x62d6fc => {
    $.get(_0x5bbe47, async (_0x57d22d, _0x158f25, _0x3414a8) => {
      try {
        if (_0x57d22d) console.log('' + JSON.stringify(_0x57d22d)), console.log(' API请求失败，请检查网路重试');else {
          _0x3414a8 = JSON.parse(_0x3414a8);
        }
      } catch (_0x5e1cd1) {
        $.logErr(_0x5e1cd1, _0x158f25);
      } finally {
        _0x62d6fc(_0x3414a8);
      }
    });
  });
}

async function _0xe6b1a8(_0x1f06c5, _0x14daca) {
  if (!_0x1f06c5.data.runningHomeInfo.nextRunningTime) {
    console.log('终点目标', _0x14daca);
    let _0x368e51 = '__jd_ref_cls=Allrun_Run;';

    for (let _0x188fd3 = 0; _0x188fd3 < 5; _0x188fd3++) {
      if (_0x188fd3 > 0) _0x368e51 = '__jd_ref_cls=CommonSecurityOnSign;';
      const _0x4fc69b = {
        'linkId': 'L-sOanK_5RJCz7I314FpnQ'
      };
      _0x1f06c5 = await _0x794583('runningOpenBox', _0x4fc69b, 'b6ac3', _0x368e51);

      if (parseFloat(_0x1f06c5.data.assets) >= _0x14daca) {
        _0x14daca = parseFloat(_0x1f06c5.data.assets), await $.wait(500);
        const _0xe25122 = {
          'linkId': 'L-sOanK_5RJCz7I314FpnQ'
        };
        _0x1f06c5 = await _0x2c0c3e('runningPreserveAssets', _0xe25122), console.log('领取成功', _0x14daca);
        break;
      } else {
        if (_0x1f06c5.data.doubleSuccess) console.log('翻倍成功', parseFloat(_0x1f06c5.data.assets)), await $.wait(10000);else {
          if (!_0x1f06c5.data.doubleSuccess && !_0x1f06c5.data.runningHomeInfo.runningFinish) {
            console.log('开始跑步', parseFloat(_0x1f06c5.data.assets)), await $.wait(10000);
          } else {
            console.log('翻倍失败');
            break;
          }
        }
      }
    }
  }
}

async function _0x2c0c3e(_0x210b6f, _0x3d45bd) {
  _0x3d45bd = 'functionId=' + _0x210b6f + '&body=' + JSON.stringify(_0x3d45bd) + '&t=' + Date.now() + '&appid=activities_platform&client=android&clientVersion=3.9.2';
  const _0xe48f88 = {
    'origin': 'https://h5platform.jd.com',
    'referer': 'https://h5platform.jd.com/',
    'content-type': 'application/x-www-form-urlencoded'
  };
  _0xe48f88.cookie = _0x8b659b, _0xe48f88['user-agent'] = $.UA;
  const _0x598369 = {
    'url': 'https://api.m.jd.com'
  };
  _0x598369.body = _0x3d45bd, _0x598369.headers = _0xe48f88;
  let _0x33f28c = _0x598369;
  return new Promise(async _0x5696c8 => {
    $.post(_0x33f28c, async (_0xcf8289, _0x5a955e, _0x48dc79) => {
      try {
        if (_0xcf8289) console.log('' + JSON.stringify(_0xcf8289)), console.log(' API请求失败，请检查网路重试');else {
          _0x48dc79 = JSON.parse(_0x48dc79);

          if (_0x48dc79.success) {} else console.log(_0x48dc79);
        }
      } catch (_0x1f1a93) {
        $.logErr(_0x1f1a93, _0x5a955e);
      } finally {
        _0x5696c8(_0x48dc79);
      }
    });
  });
}

async function _0x794583(_0x4a8082, _0x2b25be, _0x2ebca1, _0x5a8073 = '') {
  const _0x201f33 = {
    'apid': 'activities_platform',
    'cl': 'android',
    'code': 0x1,
    'ver': '3.9.2'
  };
  _0x201f33.appId = _0x2ebca1, _0x201f33.fn = _0x4a8082, _0x201f33.body = _0x2b25be;
  _0x201f33.user = $.UserName, _0x201f33.ua = $.UA;
  let _0x191867 = _0x201f33;
  _0x2b25be = await _0x908fda.getbody(_0x191867);
  const _0xe84caf = {
    'origin': 'https://h5platform.jd.com',
    'content-type': 'application/x-www-form-urlencoded',
    'referer': 'https://h5platform.jd.com/'
  };
  _0xe84caf.cookie = _0x8b659b + _0x5a8073, _0xe84caf['user-agent'] = $.UA;
  const _0x5ed7d2 = {
    'url': 'https://api.m.jd.com'
  };
  _0x5ed7d2.body = _0x2b25be, _0x5ed7d2.headers = _0xe84caf;
  let _0xaa4fe1 = _0x5ed7d2;
  return new Promise(async _0x2f163d => {
    $.post(_0xaa4fe1, async (_0x12709b, _0x2ef78e, _0x36e04e) => {
      try {
        if (_0x12709b) console.log('' + JSON.stringify(_0x12709b)), console.log(' API请求失败，请检查网路重试');else {
          _0x36e04e = JSON.parse(_0x36e04e);

          if (_0x36e04e.success) {} else console.log(_0x36e04e);
        }
      } catch (_0x2dc7eb) {
        $.logErr(_0x2dc7eb, _0x2ef78e);
      } finally {
        _0x2f163d(_0x36e04e);
      }
    });
  });
}

function _0x45892d() {
  return new Promise(_0x11776d => {
    {
      const _0x14cd7d = {
        'referer': 'https://h5.m.jd.com/'
      };
      _0x14cd7d.Cookie = _0x8b659b, _0x14cd7d['User-Agent'] = $.UA;
      const _0x5c7410 = {
        'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
        'timeout': 0x2710
      };
      _0x5c7410.headers = _0x14cd7d;
      const _0xc4ff2b = _0x5c7410;
      $.get(_0xc4ff2b, (_0x2e8b36, _0x50a165, _0x4cd948) => {
        try {
          if (_0x4cd948) {
            _0x4cd948 = JSON.parse(_0x4cd948);

            if (_0x4cd948.islogin === '1') {} else _0x4cd948.islogin === '0' && ($.isLogin = false);
          }
        } catch (_0x39edc9) {
          console.log(_0x39edc9);
        } finally {
          _0x11776d();
        }
      });
    }
  });
}

function _0x3d298e() {
  return new Promise(_0x1926f7 => {
    !_0x1856cb ? $.msg($.name, '', '' + _0x13b11d) : $.log('京东账号' + $.index + $.nickName + '\n' + _0x13b11d);

    _0x1926f7();
  });
}

function _0x47ed50(_0x2808ad) {
  try {
    if (typeof JSON.parse(_0x2808ad) == 'object') return true;
  } catch (_0x348c0a) {
    return console.log(_0x348c0a), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x23ae56(_0x5c9396) {
  const _0x4e079a = function () {
    {
      let _0x113bdf = true;
      return function (_0x54716e, _0x4636a7) {
        const _0x3ed4a2 = _0x113bdf ? function () {
          {
            if (_0x4636a7) {
              const _0x278805 = _0x4636a7.apply(_0x54716e, arguments);

              return _0x4636a7 = null, _0x278805;
            }
          }
        } : function () {};

        _0x113bdf = false;
        return _0x3ed4a2;
      };
    }
  }();

  const _0x1ef3cd = _0x4e079a(this, function () {
    return _0x1ef3cd.toString().search('(((.+)+)+)+$').toString().constructor(_0x1ef3cd).search('(((.+)+)+)+$');
  });

  _0x1ef3cd();

  if (typeof _0x5c9396 == 'string') try {
    return JSON.parse(_0x5c9396);
  } catch (_0x2a901d) {
    return console.log(_0x2a901d), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}

function _0x486a99(_0x108a97) {
  let _0x227c38 = Math.floor(_0x108a97 / 60),
      _0x341c57 = Math.floor(_0x108a97 % 60);

  return _0x227c38 + '分' + _0x341c57 + '秒';
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }