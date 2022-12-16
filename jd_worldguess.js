/*
默认随机选胜出队伍，12/17克罗地亚-摩洛哥
如需指定，变量GUESS='法国'
11 11 11 11 * jd_worldguess.js
 */

const $ = new Env('京彩足球季-手动');

const _0x4eb620 = $.isNode() ? require('./sendNotify') : '';

const _0x2a9150 = $.isNode() ? require('./jdCookie.js') : '';

const _0x3cbc6f = require('./function/dylany');

let _0x4d8d50 = true;
let _0x50d898 = [],
    _0x2a4015 = '',
    _0x453696 = '';

if ($.isNode()) {
  Object.keys(_0x2a9150).forEach(_0x5b9b88 => {
    _0x50d898.push(_0x2a9150[_0x5b9b88]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  _0x50d898 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x1c3e4b($.getdata('CookiesJD') || '[]').map(_0x220ba5 => _0x220ba5.cookie)].filter(_0xb6184 => !!_0xb6184);
}

let _0x153fa1 = ['克罗地亚'];
!(async () => {
  if (!_0x50d898[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  console.log('默认随机选胜出队伍,如需指定变量GUESS=\'法国\'');

  for (let _0x12b38d = 0x0; _0x12b38d < _0x50d898.length; _0x12b38d++) {
    if (_0x50d898[_0x12b38d]) {
      _0x2a4015 = _0x50d898[_0x12b38d];
      $.UserName = decodeURIComponent(_0x2a4015.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2a4015.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0x12b38d + 0x1;
      $.isLogin = true;
      $.nickName = '';
      $.UA = require('./USER_AGENTS').UARAM();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });

        if ($.isNode()) {
          await _0x4eb620.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
      }

      let _0x408951 = _0x153fa1[Math.floor(Math.random() * _0x153fa1.length)];

      if (process.env.GUESS) {
        console.log('指定模式！！\n');
        _0x408951 = process.env.GUESS;
      }

      console.log('去投' + _0x408951 + '\n');
      await _0x327ad6({
        'linkId': '60bQu5byhjPMksWXB2cYRw',
        'roundId': 0xe9d9,
        'actId': 0x256,
        'bankId': 0x59,
        'questionId': '172',
        'userChoice': _0x408951
      });
      await $.wait(0x7d0);
    }
  }
})().catch(_0x5b914b => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5b914b + '!', '');
}).finally(() => {
  $.done();
});

async function _0x327ad6(_0x68754a) {
  let _0x522b29 = {
    'appId': '45eb1',
    'fn': 'worldCupGuessBet',
    'body': _0x68754a,
    'apid': 'activities_platform',
    'ver': $.UA.split(';')[0x2],
    'cl': 'android',
    'user': $.UserName,
    'code': 0x0,
    'ua': $.UA
  };
  _0x68754a = await _0x3cbc6f.getbody(_0x522b29);
  return new Promise(async _0x35bcc3 => {
    {
      $.get(_0x134350(_0x68754a), async (_0x287ca9, _0x15cab9, _0x526cf5) => {
        {
          try {
            if (_0x287ca9) {
              console.log('' + JSON.stringify(_0x287ca9));
              console.log(' API请求失败，请检查网路重试');
            } else {
              _0x526cf5 = JSON.parse(_0x526cf5);

              if (_0x526cf5.success) {
                console.log('成功！！');
              } else {
                console.log(JSON.stringify(_0x526cf5));
              }

              ;
            }
          } catch (_0x356c02) {
            $.logErr(_0x356c02, _0x15cab9);
          } finally {
            _0x35bcc3(_0x526cf5);
          }
        }
      });
    }
  });
}

function _0x134350(_0x3e7c67) {
  return {
    'url': 'https://api.m.jd.com/?' + _0x3e7c67,
    'headers': {
      'Host': 'api.m.jd.com',
      'Origin': 'https://prodev.m.jd.com',
      'User-Agent': $.UA,
      'Cookie': _0x2a4015
    }
  };
}

function _0xbad630() {
  return new Promise(_0x332e95 => {
    {
      const _0x400d3d = {
        'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
        'headers': {
          'Cookie': _0x2a4015,
          'referer': 'https://h5.m.jd.com/',
          'User-Agent': $.UA
        },
        'timeout': 0x2710
      };
      $.get(_0x400d3d, (_0x367f52, _0x29b6e4, _0x5b34f4) => {
        {
          try {
            if (_0x5b34f4) {
              _0x5b34f4 = JSON.parse(_0x5b34f4);

              if (_0x5b34f4.islogin === '1') {} else if (_0x5b34f4.islogin === '0') {
                $.isLogin = false;
              }
            }
          } catch (_0x3b5997) {
            console.log(_0x3b5997);
          } finally {
            _0x332e95();
          }
        }
      });
    }
  });
}

function _0x1a495b() {
  return new Promise(_0x409b3d => {
    {
      if (!_0x4d8d50) {
        $.msg($.name, '', '' + _0x453696);
      } else {
        $.log('京东账号' + $.index + $.nickName + '\n' + _0x453696);
      }

      _0x409b3d();
    }
  });
}

function _0x539d67(_0x48e30e) {
  try {
    if (typeof JSON.parse(_0x48e30e) == 'object') {
      return true;
    }
  } catch (_0x56792b) {
    console.log(_0x56792b);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

function _0x1c3e4b(_0x5d880f) {
  if (typeof _0x5d880f == 'string') {
    try {
      return JSON.parse(_0x5d880f);
    } catch (_0x29e08c) {
      console.log(_0x29e08c);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }