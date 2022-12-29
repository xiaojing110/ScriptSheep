
// 3 2 */3 * * jd_gwxj_v.js 

const $ = new Env('购物抵现金20豆');

const _0x13e613 = $.isNode() ? require('./sendNotify') : '';
const _0x261371 = $.isNode() ? require('./jdCookie.js') : '';
const _0x5ab895 = require('./function/dylanx.js');

let _0x385f6d = [],
    _0x1e54fe = '';

if ($.isNode()) {
  Object.keys(_0x261371).forEach(_0x16b952 => {
    _0x385f6d.push(_0x261371[_0x16b952]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  _0x385f6d = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x4590ae($.getdata('CookiesJD') || '[]').map(_0x535615 => _0x535615.cookie)].filter(_0xdc1f7e => !!_0xdc1f7e);
}

!(async () => {
  if (!_0x385f6d[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  for (let _0xb905dc = 0x0; _0xb905dc < _0x385f6d.length; _0xb905dc++) {
    if (_0x385f6d[_0xb905dc]) {
      _0x1e54fe = _0x385f6d[_0xb905dc];
      $.UserName = decodeURIComponent(_0x1e54fe.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1e54fe.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
      $.index = _0xb905dc + 0x1;
      $.isLogin = true;
      $.nickName = '';
      $.UA = require('./USER_AGENTS').UARAM();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });

        if ($.isNode()) {
          await _0x13e613.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
      }

      await _0x2684ff();
      await $.wait(0x3e8);
      await _0x7883d9();
      await $.wait(0x7d0);
    }
  }
})().catch(_0xb2d9e2 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0xb2d9e2 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x2684ff() {
  let _0x464c58 = {};
  _0x464c58 = _0x5ab895.getbody('getNewsComerWindow', _0x464c58);
  return new Promise(async _0x516c42 => {
    $.post(_0x2dda1f('getNewsComerWindow', _0x464c58), async (_0x8ecfc5, _0x28d038, _0x17bb26) => {
      try {
        if (_0x8ecfc5) {
          console.log('' + JSON.stringify(_0x8ecfc5));
          console.log(' API请求失败，请检查网路重试');
        } else {
          _0x17bb26 = JSON.parse(_0x17bb26);

          if (_0x17bb26.code == 0x0) {} else {
            console.log(_0x17bb26.msg);
          }
        }
      } catch (_0x19bade) {
        $.logErr(_0x19bade, _0x28d038);
      } finally {
        _0x516c42(_0x17bb26);
      }
    });
  });
}

async function _0x7883d9() {
  let _0x3e6879 = {
    'encryptAssignmentId': '2hXh9ve7o3gekcA4LqenW982nEie',
    'firstWindow': 0x1,
    'itemId': '1'
  };
  _0x3e6879 = _0x5ab895.getbody('getNewsComerGift', _0x3e6879);
  return new Promise(async _0x3e3a6a => {
    $.post(_0x2dda1f('getNewsComerGift', _0x3e6879), async (_0x53c009, _0x4a81d5, _0x22aaed) => {
      try {
        if (_0x53c009) {
          console.log('' + JSON.stringify(_0x53c009));
          console.log(' API请求失败，请检查网路重试');
        } else {
          _0x22aaed = JSON.parse(_0x22aaed);

          if (_0x22aaed.result.lotteryInfo) {
            console.log(_0x22aaed.result.lotteryInfo.quantity, _0x22aaed.result.lotteryInfo.name);
          } else {
            console.log('啥都没有！！！\n' + JSON.stringify(_0x22aaed));
          }
        }
      } catch (_0x1f4350) {
        $.logErr(_0x1f4350, _0x4a81d5);
      } finally {
        _0x3e3a6a(_0x22aaed);
      }
    });
  });
}

function _0x2dda1f(_0x1ebc8e, _0x1de7e6) {
  return {
    'url': 'https://api.m.jd.com/client.action?functionId=' + _0x1ebc8e + '&' + _0x1de7e6 + '&lmt=0',
    'headers': {
      'Host': 'api.m.jd.com',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.2.2;build/98380;',
      'Cookie': _0x1e54fe
    }
  };
}

function _0x2e8c91() {
  return new Promise(_0x483d0d => {
    {
      const _0x16f592 = {
        'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
        'headers': {
          'Cookie': _0x1e54fe,
          'referer': 'https://h5.m.jd.com/',
          'User-Agent': $.UA
        },
        'timeout': 0x2710
      };
      $.get(_0x16f592, (_0x3268c4, _0x23d38c, _0x5c2fb6) => {
        {
          try {
            if (_0x5c2fb6) {
              _0x5c2fb6 = JSON.parse(_0x5c2fb6);

              if (_0x5c2fb6.islogin === '1') {} else if (_0x5c2fb6.islogin === '0') {
                $.isLogin = false;
              }
            }
          } catch (_0x4d7e1d) {
            console.log(_0x4d7e1d);
          } finally {
            _0x483d0d();
          }
        }
      });
    }
  });
}

function _0x1f99f2() {
  return new Promise(_0x2ad9a5 => {
    {
      $.log('京东账号' + $.index + $.nickName + '\n');
    }

    _0x2ad9a5();
  });
}

function _0x4b0b1d(_0x369f78) {
  try {
    if (typeof JSON.parse(_0x369f78) == 'object') {
      return true;
    }
  } catch (_0x5a320c) {
    console.log(_0x5a320c);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}

function _0x4590ae(_0x4f9eb0) {
  var _0x8f1251 = function () {
    return function (_0x3946d7, _0x3a48e7) {
      var _0x220032 = function () {
        if (_0x3a48e7) {
          var _0x339369 = _0x3a48e7.apply(_0x3946d7, arguments);

          _0x3a48e7 = null;
          return _0x339369;
        }
      };

      return _0x220032;
    };
  }();

  var _0x310dfe = _0x8f1251(this, function () {
    var _0x605b37 = function () {
      return 'dev';
    },
        _0x580fce = function () {
      return 'window';
    };

    var _0x9a3c63 = function () {
      var _0x3518ac = new RegExp('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}');

      return !_0x3518ac.test(_0x605b37.toString());
    };

    var _0x5c294c = function () {
      var _0x2e9bcf = new RegExp('(\\\\[x|u](\\w){2,4})+');

      return _0x2e9bcf.test(_0x580fce.toString());
    };

    var _0x4303b4 = function (_0x24cc2) {
      if (_0x24cc2.indexOf(false)) {
        _0x45278e(_0x24cc2);
      }
    };

    var _0x45278e = function (_0x41a154) {
      if (_0x41a154.indexOf('e') !== 3) {
        _0x4303b4(_0x41a154);
      }
    };

    if (!_0x9a3c63()) {
      if (!_0x5c294c()) {
        _0x4303b4('indеxOf');
      } else {
        _0x4303b4('indexOf');
      }
    } else {
      _0x4303b4('indеxOf');
    }
  });

  _0x310dfe();

  if (typeof _0x4f9eb0 == 'string') {
    try {
      return JSON.parse(_0x4f9eb0);
    } catch (_0x126a5d) {
      console.log(_0x126a5d);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }