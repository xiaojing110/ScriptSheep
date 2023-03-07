
/*
赛跑兑10红包
1 1 1 1 * jd_joyrunred.js
fix
 */

const $ = new Env('赛跑兑10红包');
const _0x18223c = $.isNode() ? require('./sendNotify') : '',
      _0x5ca62b = $.isNode() ? require('./jdCookie.js') : '';

let _0x2fb323 = true;

const _0x2deda6 = new Date();

_0x2deda6.setDate(_0x2deda6.getDate() + 1), _0x2deda6.setHours(0, 0, 0, 0);
let _0x4808f1 = [],
    _0x2cda1f = '',
    _0x17c0ad = '';

if ($.isNode()) {
  Object.keys(_0x5ca62b).forEach(_0x497276 => {
    _0x4808f1.push(_0x5ca62b[_0x497276]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x4808f1 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x42346e($.getdata('CookiesJD') || '[]').map(_0xa35ed9 => _0xa35ed9.cookie)].filter(_0x193452 => !!_0x193452);

!(async () => {
  if (!_0x4808f1[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  await _0x3ad43f();

  for (let _0x5fe5cf = 0; _0x5fe5cf < _0x4808f1.length; _0x5fe5cf++) {
    if (_0x4808f1[_0x5fe5cf]) {
      _0x2cda1f = _0x4808f1[_0x5fe5cf], $.UserName = decodeURIComponent(_0x2cda1f.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2cda1f.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x5fe5cf + 1, $.isLogin = true, $.nickName = '', $.UA = require('./USER_AGENTS').UARAM(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x151caa = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x151caa);
        $.isNode() && (await _0x18223c.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      let _0x354efe = _0x2deda6.getTime() - Date.now() + ($.difftime || 0);

      console.log(_0x354efe);
      if (_0x354efe > 60000) _0x354efe = 0;
      await $.wait(0);

      for (let _0x548912 of Array(5)) {
        await _0x959f1a(), await $.wait(200);
      }

      await $.wait(1000);
    }
  }
})().catch(_0x2cd002 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x2cd002 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x959f1a() {
  return new Promise(async _0x16da57 => {
    $.post(_0x5b8cc3(), async (_0x4115e9, _0x1fbb52, _0x3d018a) => {
      try {
        _0x4115e9 ? (console.log('' + JSON.stringify(_0x4115e9)), console.log(' API请求失败，请检查网路重试')) : console.log(_0x3d018a);
      } catch (_0x1c032c) {
        $.logErr(_0x1c032c, _0x1fbb52);
      } finally {
        _0x16da57(_0x3d018a);
      }
    });
  });
}

function _0x5b8cc3() {
  const _0x542f62 = {
    'Host': 'api.m.jd.com',
    'Origin': 'https://h5platform.jd.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  _0x542f62['User-Agent'] = $.UA;
  _0x542f62.Cookie = _0x2cda1f;
  const _0x5db23b = {
    'url': 'https://api.m.jd.com',
    'body': 'functionId=runningPrizeDraw&body={"linkId":"L-sOanK_5RJCz7I314FpnQ","type":1,"level":3}&t=1676473011489&appid=activities_platform&client=android&clientVersion=4.8.2&cthr=1&screen=393*873&networkType=wifi&lang=zh_CN&partner=xiaomi&eid='
  };
  _0x5db23b.headers = _0x542f62;
  return _0x5db23b;
}

function _0xb5779a() {
  return new Promise(_0x15d09c => {
    const _0x5bef1f = {
      'referer': 'https://h5.m.jd.com/'
    };
    _0x5bef1f.Cookie = _0x2cda1f, _0x5bef1f['User-Agent'] = $.UA;
    const _0x982263 = {
      'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
      'timeout': 0x2710
    };
    _0x982263.headers = _0x5bef1f;
    const _0x1bd029 = _0x982263;
    $.get(_0x1bd029, (_0x44ee0, _0x5e217c, _0x243c94) => {
      try {
        if (_0x243c94) {
          _0x243c94 = JSON.parse(_0x243c94);

          if (_0x243c94.islogin === '1') {} else {
            if (_0x243c94.islogin === '0') {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x14cc37) {
        console.log(_0x14cc37);
      } finally {
        _0x15d09c();
      }
    });
  });
}

function _0x3ad43f() {
  return new Promise(_0x1b2b60 => {
    {
      const _0x32c93d = {};
      _0x32c93d['User-Agent'] = $.UA;
      const _0x1d31cf = {
        'timeout': 0x2710,
        'url': 'https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1'
      };
      _0x1d31cf.headers = _0x32c93d;
      const _0x2e0590 = _0x1d31cf;
      $.get(_0x2e0590, (_0x4fdf57, _0x17772d, _0x2478c6) => {
        try {
          _0x2478c6 && (_0x2478c6 = JSON.parse(_0x2478c6), $.difftime = Date.now() - _0x2478c6.timestamp);
        } catch (_0x3bf9fa) {
          console.log(_0x3bf9fa);
        } finally {
          _0x1b2b60();
        }
      });
    }
  });
}

function _0x381a41() {
  return new Promise(_0x555e50 => {
    $.log('京东账号' + $.index + $.nickName + '\n');

    _0x555e50();
  });
}

function _0x2012c7(_0x3d473f) {
  try {
    if (typeof JSON.parse(_0x3d473f) == 'object') return true;
  } catch (_0x3740b9) {
    return console.log(_0x3740b9), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x42346e(_0x2ea1ad) {
  if (typeof _0x2ea1ad == 'string') {
    try {
      return JSON.parse(_0x2ea1ad);
    } catch (_0x2fb541) {
      return console.log(_0x2fb541), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }