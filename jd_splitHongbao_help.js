/*
ck1助力作者，其他助力ck1
变量可指定多个被助力CODE
export NZJCODE='xxx1&xxx2'
默认为前6个车头助力码助力,可变量调整
export NZJNUM='20'
10 6,19 8-12 12 * jd_splitHongbao_help.js
fix
 */

const $ = new Env('年终奖补贴助力');

const _0x3c6169 = $.isNode() ? require('./sendNotify') : '';
const _0x339e59 = $.isNode() ? require('./jdCookie.js') : '';

let _0x50a22c = true;
let _0x574b7f = [],
    _0x2400e8 = '',
    _0x314681 = '';

if ($.isNode()) {
  Object.keys(_0x339e59).forEach(_0xb270d1 => {
    _0x574b7f.push(_0x339e59[_0xb270d1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  _0x574b7f = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x2e84d5($.getdata('CookiesJD') || '[]').map(_0x15a335 => _0x15a335.cookie)].filter(_0x1235ca => !!_0x1235ca);
}

let _0x31fc70 = '';

if (process.env.NZJCODE) {
  if (process.env.NZJCODE.indexOf('&') > -0x1) {
    _0x31fc70 = process.env.NZJCODE.split('&');
  } else {
    _0x31fc70 = [process.env.NZJCODE];
  }
}

let _0x4f132c = process.env.NZJNUM || 0x6;

let _0x1308d9 = [];
!(async () => {
  if (!_0x574b7f[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

//   let _0x3495e4 = await _0x4727c3();

  _0x3495e4 = _0x3495e4[Math.floor(Math.random() * _0x3495e4.length)];
  $.hotnum = 0x0;

  if (_0x31fc70.length === 0x0) {
    console.log('开始收集前' + _0x4f132c + '个助力码...');

    for (let _0x3b4771 = 0x0; _0x3b4771 < _0x4f132c; _0x3b4771++) {
      if (_0x574b7f[_0x3b4771]) {
        _0x2400e8 = _0x574b7f[_0x3b4771];
        $.UserName = decodeURIComponent(_0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
        $.index = _0x3b4771 + 0x1;
        $.isLogin = true;
        $.nickName = '';
        $.UA = require('./USER_AGENTS').UARAM();
        await _0x48d917();
        console.log('\n******开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

        if (!$.isLogin) {
          $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
            'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
          });

          if ($.isNode()) {
            await _0x3c6169.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
          }

          continue;
        }

        let _0x5e24db = await _0x4a5a56();

        _0x1308d9.push(_0x5e24db);

        await $.wait(0x3e8);
      }
    }
  }

  console.log('\n开始助力...');

  if (_0x31fc70.length === 0x0) {
    console.log('当前为助力车头模式！！！');
  } else {
    console.log('当前为指定助力模式！！！');
  }

  for (let _0xaecf77 = 0x0; _0xaecf77 < _0x574b7f.length; _0xaecf77++) {
    if (_0x574b7f[_0xaecf77]) {
      _0x2400e8 = _0x574b7f[_0xaecf77];
      $.UserName = decodeURIComponent(_0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0xaecf77 + 0x1;
      $.isLogin = true;
      $.nickName = '';
      $.UA = require('./USER_AGENTS').UARAM();

      if ($.hotnum >= 0x3) {
        console.log('\n火爆次数过多，可能限制ip了，退出！！');
        break;
      }

      ;
      console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '\n');
      $.nohelp = false;

      if (_0xaecf77 == 0x0) {
        await _0x55e5e1(_0x3495e4, 0x0);
      }

      if (_0x31fc70.length > 0x0) {
        _0x1308d9 = _0x31fc70;
      }

      for (let _0x774839 = 0x0; _0x774839 < _0x1308d9.length; _0x774839++) {
        $.helpfull = false;

        if ($.nohelp) {
          console.log('\n无助力机会，跳出！！');
          break;
        }

        ;
        if (_0x1308d9[_0x774839]) await _0x55e5e1(_0x1308d9[_0x774839], 0x1);

        if ($.helpfull) {
          delete _0x1308d9[_0x774839];
        }

        ;
        await $.wait(0x3e8);
      }

      if (_0x1308d9[_0x1308d9.length - 0x1] === undefined) {
        console.log('\n没有需要助力的了，跳出！！');
        break;
      }

      await $.wait(0x3e8);
    }
  }

  console.log('\n\n开始领取助力红包...');

  for (let _0x53db31 = 0x0; _0x53db31 < _0x574b7f.length; _0x53db31++) {
    if (_0x574b7f[_0x53db31]) {
      _0x2400e8 = _0x574b7f[_0x53db31];
      $.UserName = decodeURIComponent(_0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2400e8.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0x53db31 + 0x1;
      $.isLogin = true;
      $.nickName = '';
      $.UA = require('./USER_AGENTS').UARAM();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
      await _0x4a5a56();
      await $.wait(0x1f4);
      console.log('可领取' + ($.lotteryNum || 0x0) + '次助力红包...');

      for (let _0x1787b8 = 0x0; _0x1787b8 < $.lotteryNum; _0x1787b8++) {
        await _0x4214cc();
        await $.wait(0x1f4);
      }

      await $.wait(0x3e8);
    }
  }
})().catch(_0x1b0c7b => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x1b0c7b + '!', '');
}).finally(() => {
  $.done();
});

async function _0x4a5a56() {
  return new Promise(async _0x50931b => {
    {
      $.post(_0x190386('splitHongbao_getHomeData', {
        'appId': '1EFVXyw',
        'taskToken': ''
      }), async (_0x4fa3ef, _0x504d1b, _0x405fac) => {
        {
          try {
            if (_0x4fa3ef) {
              console.log('' + JSON.stringify(_0x4fa3ef));
              console.log(' API请求失败，请检查网路重试');
            } else {
              _0x405fac = JSON.parse(_0x405fac);

              if (_0x405fac.code == 0x0) {
                $.lotteryNum = _0x405fac.data.result.userInfo.lotteryNum;
                _0x405fac = _0x405fac.data.result.taskVos[0x5].assistTaskDetailVo.taskToken;
                console.log(_0x405fac);
              } else {
                console.log(_0x405fac.msg);
              }
            }
          } catch (_0x11c28b) {
            $.logErr(_0x11c28b, _0x504d1b);
          } finally {
            _0x50931b(_0x405fac);
          }
        }
      });
    }
  });
}

function _0x4727c3() {
  let _0x54d250 = {
    'url': 'https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/nzj',
    'timeout': 0x7530
  };
  return new Promise(_0x4851bf => {
    {
      $.get(_0x54d250, async (_0xd9f6dd, _0x147ced, _0x5de706) => {
        {
          try {
            if (_0xd9f6dd) {} else {
              if (_0x5de706) {
                _0x5de706 = JSON.parse(_0x5de706);

                if (_0x5de706.code === 0xc8) {
                  authcode = _0x5de706.data;
                } else {}
              }
            }
          } catch (_0xbbce) {
            $.logErr(_0xbbce, _0x147ced);
          } finally {
            _0x4851bf(authcode);
          }
        }
      });
    }
  });
}

async function _0x55e5e1(_0x5cc03f, _0x1c9c76) {
  console.log('去助力--> ' + _0x5cc03f);
  return new Promise(async _0x416902 => {
    $.post(_0x190386('harmony_collectScore', {
      'appId': '1EFVXyw',
      'taskToken': _0x5cc03f,
      'taskId': 0x6,
      'actionType': '0'
    }), async (_0x30c698, _0x3fd162, _0xf753b3) => {
      {
        try {
          if (_0x30c698) {
            console.log('' + JSON.stringify(_0x30c698));
            console.log('help API请求失败，请检查网路重试');
          } else {
            _0xf753b3 = JSON.parse(_0xf753b3);

            if (_0xf753b3.code == 0x0) {
              if (_0xf753b3.data.bizCode == 0x0) {
                $.hotnum = 0x0;
                console.log('成功！');
              } else if (_0xf753b3.data.bizMsg.indexOf('满员') > -0x1) {
                if (_0x1c9c76) $.helpfull = true;
                console.log(_0xf753b3.data.bizMsg);
              } else if (_0xf753b3.data.bizMsg.indexOf('火爆') > -0x1) {
                $.hotnum++;
                console.log(_0xf753b3.data.bizMsg);
              } else if (_0xf753b3.data.bizMsg.indexOf('上限') > -0x1) {
                $.nohelp = true;
              } else {
                console.log(_0xf753b3.data.bizMsg);
              }
            } else {
              console.log(_0xf753b3.msg);
            }
          }
        } catch (_0x360b32) {
          $.logErr(_0x360b32, _0x3fd162);
        } finally {
          _0x416902(_0xf753b3);
        }
      }
    });
  });
}

async function _0x15f8b9(_0x28c80a, _0x1b6540, _0x5efc71, _0x156da7) {
  return new Promise(async _0x129066 => {
    $.post(_0x190386('harmony_collectScore', {
      'appId': '1EFVXyw',
      'taskToken': _0x28c80a,
      'taskId': _0x1b6540,
      'itemId': _0x5efc71,
      'actionType': _0x156da7
    }), async (_0x545f1d, _0x416f08, _0x2fa88b) => {
      {
        try {
          if (_0x545f1d) {
            console.log('' + JSON.stringify(_0x545f1d));
            console.log(' API请求失败，请检查网路重试');
          } else {
            _0x2fa88b = JSON.parse(_0x2fa88b);

            if (_0x2fa88b.code == 0x0) {
              _0x156da7 == 0x0 && console.log(_0x2fa88b.data.bizMsg);
            } else {
              console.log(_0x2fa88b.msg);
            }
          }
        } catch (_0x10a95e) {
          $.logErr(_0x10a95e, _0x416f08);
        } finally {
          _0x129066(_0x2fa88b);
        }
      }
    });
  });
}

async function _0x4214cc() {
  return new Promise(async _0x4e7120 => {
    $.post(_0x190386('splitHongbao_getLotteryResult', {
      'appId': '1EFVXyw',
      'taskId': ''
    }), async (_0x2a08f0, _0x19b73f, _0x5856ae) => {
      try {
        if (_0x2a08f0) {
          console.log('' + JSON.stringify(_0x2a08f0));
          console.log(' API请求失败，请检查网路重试');
        } else {
          _0x5856ae = JSON.parse(_0x5856ae);

          if (_0x5856ae.code == 0x0) {
            if (_0x5856ae.data.result.userAwardsCacheDto) {
              console.log(_0x5856ae.data.result.userAwardsCacheDto.jBeanAwardVo ? _0x5856ae.data.result.userAwardsCacheDto.jBeanAwardVo.prizeDesc : _0x5856ae.data.result.userAwardsCacheDto.redpacketVo.value + '红包');
            }
          } else {
            console.log(_0x5856ae.msg);
          }
        }
      } catch (_0x373bd0) {
        $.logErr(_0x373bd0, _0x19b73f);
      } finally {
        _0x4e7120(_0x5856ae);
      }
    });
  });
}

function _0x190386(_0x4d63b4, _0x58e529) {
  return {
    'url': 'https://api.m.jd.com/client.action',
    'body': 'functionId=' + _0x4d63b4 + '&appid=&area=&body=' + JSON.stringify(_0x58e529) + '&client=wh5&clientVersion=1.0.0',
    'headers': {
      'Origin': 'https://h5.m.jd.com',
      'Referer': 'https://h5.m.jd.com/',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': $.UA,
      'Cookie': _0x2400e8
    }
  };
}

function _0x48d917() {
  return new Promise(_0x47f0e7 => {
    const _0x132e43 = {
      'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
      'headers': {
        'Cookie': _0x2400e8,
        'referer': 'https://h5.m.jd.com/',
        'User-Agent': $.UA
      },
      'timeout': 0x2710
    };
    $.get(_0x132e43, (_0x4c0b1f, _0x173925, _0x1503f0) => {
      try {
        if (_0x1503f0) {
          _0x1503f0 = JSON.parse(_0x1503f0);

          if (_0x1503f0.islogin === '1') {} else if (_0x1503f0.islogin === '0') {
            $.isLogin = false;
          }
        }
      } catch (_0x34fc55) {
        console.log(_0x34fc55);
      } finally {
        _0x47f0e7();
      }
    });
  });
}

function _0x3ee38a() {
  return new Promise(_0x1de476 => {
    {
      if (!_0x50a22c) {
        $.msg($.name, '', '' + _0x314681);
      } else {
        $.log('京东账号' + $.index + $.nickName + '\n' + _0x314681);
      }

      _0x1de476();
    }
  });
}

function _0x117999(_0x41c5da) {
  try {
    if (typeof JSON.parse(_0x41c5da) == 'object') {
      return true;
    }
  } catch (_0x554343) {
    console.log(_0x554343);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }