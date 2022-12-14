/*
默认随机选胜出队伍，12/15法国-摩洛哥
指定变量GUESS='法国'
11 11 11 11 * jd_worldguess.js
 */

const $ = new Env('京彩足球季竞猜-手动');

const _0x111e21 = $.isNode() ? require('./sendNotify') : '';

const _0x2a6789 = $.isNode() ? require('./jdCookie.js') : '';

const _0x49e1b8 = require('./function/dylany');

let _0x5e9817 = true;
let _0x269038 = [],
    _0x23ef4e = '',
    _0x556344 = '';

if ($.isNode()) {
  Object.keys(_0x2a6789).forEach(_0x175c97 => {
    _0x269038.push(_0x2a6789[_0x175c97]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  _0x269038 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0xd886e5($.getdata('CookiesJD') || '[]').map(_0x4a9682 => _0x4a9682.cookie)].filter(_0x288127 => !!_0x288127);
}

!(async () => {
  if (!_0x269038[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  console.log('默认随机选胜出队伍,如需指定变量GUESS=\'法国\'');

  for (let _0x117694 = 0x0; _0x117694 < _0x269038.length; _0x117694++) {
    if (_0x269038[_0x117694]) {
      _0x23ef4e = _0x269038[_0x117694];
      $.UserName = decodeURIComponent(_0x23ef4e.match(/pt_pin=([^; ]+)(?=;?)/) && _0x23ef4e.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0x117694 + 0x1;
      $.isLogin = true;
      $.nickName = '';
      $.UA = require('./USER_AGENTS').UARAM();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });

        if ($.isNode()) {
          await _0x111e21.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
      }

      let _0x30a77e = ['法国'];

      let _0x223e19 = _0x30a77e[Math.floor(Math.random() * _0x30a77e.length)];

      if (process.env.GUESS) {
        console.log('指定模式！！\n');
        _0x223e19 = process.env.GUESS;
      }

      console.log('去投' + _0x223e19 + '\n');
      await _0x4be017({
        'linkId': '60bQu5byhjPMksWXB2cYRw',
        'roundId': 0xe9d1,
        'actId': 0x256,
        'bankId': 0x58,
        'questionId': '171',
        'userChoice': _0x223e19
      });
      await $.wait(0x7d0);
    }
  }
})().catch(_0x5d4935 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5d4935 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x4be017(_0x41497b) {
  let _0x229d20 = {
    'appId': '45eb1',
    'fn': 'worldCupGuessBet',
    'body': _0x41497b,
    'apid': 'activities_platform',
    'ver': $.UA.split(';')[0x2],
    'cl': 'android',
    'user': $.UserName,
    'code': 0x0,
    'ua': $.UA
  };
  _0x41497b = await _0x49e1b8.getbody(_0x229d20);
  return new Promise(async _0x3bde76 => {
    $.get(_0x6933ab(_0x41497b), async (_0x1db652, _0x27be90, _0x54befc) => {
      {
        try {
          if (_0x1db652) {
            console.log('' + JSON.stringify(_0x1db652));
            console.log(' API请求失败，请检查网路重试');
          } else {
            _0x54befc = JSON.parse(_0x54befc);

            if (_0x54befc.success) {
              console.log('成功！！');
            } else {
              console.log(JSON.stringify(_0x54befc));
            }

            ;
          }
        } catch (_0xfb2f3a) {
          $.logErr(_0xfb2f3a, _0x27be90);
        } finally {
          _0x3bde76(_0x54befc);
        }
      }
    });
  });
}

function _0x6933ab(_0x17259c) {
  return {
    'url': 'https://api.m.jd.com/?' + _0x17259c,
    'headers': {
      'Host': 'api.m.jd.com',
      'Origin': 'https://prodev.m.jd.com',
      'User-Agent': $.UA,
      'Cookie': _0x23ef4e
    }
  };
}

function _0x4bc5a1() {
  return new Promise(_0x4dbec7 => {
    {
      const _0x20f4cb = {
        'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
        'headers': {
          'Cookie': _0x23ef4e,
          'referer': 'https://h5.m.jd.com/',
          'User-Agent': $.UA
        },
        'timeout': 0x2710
      };
      $.get(_0x20f4cb, (_0x399cf4, _0x54d34e, _0x2f4540) => {
        try {
          if (_0x2f4540) {
            _0x2f4540 = JSON.parse(_0x2f4540);

            if (_0x2f4540.islogin === '1') {} else if (_0x2f4540.islogin === '0') {
              $.isLogin = false;
            }
          }
        } catch (_0x319a78) {
          console.log(_0x319a78);
        } finally {
          _0x4dbec7();
        }
      });
    }
  });
}

function _0xbdc88e() {
  return new Promise(_0x201ddd => {
    if (!_0x5e9817) {
      $.msg($.name, '', '' + _0x556344);
    } else {
      $.log('京东账号' + $.index + $.nickName + '\n' + _0x556344);
    }

    _0x201ddd();
  });
}

function _0x5391f9(_0x11af19) {
  try {
    if (typeof JSON.parse(_0x11af19) == 'object') {
      return true;
    }
  } catch (_0x57da3c) {
    console.log(_0x57da3c);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

function _0xd886e5(_0x331a3c) {
  if (typeof _0x331a3c == 'string') {
    try {
      return JSON.parse(_0x331a3c);
    } catch (_0x3e1bf6) {
      console.log(_0x3e1bf6);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}


// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }