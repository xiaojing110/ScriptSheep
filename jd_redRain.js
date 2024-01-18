/*
红包雨
cron "7 7 7 7 *" jd_redRain.js
 */
const $ = new Env('红包雨');


const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
    cookie = "",
    message;

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x4c05df => {
    cookiesArr.push(jdCookieNode[_0x4c05df]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x33dfb1 => _0x33dfb1.cookie)].filter(_0x185b31 => !!_0x185b31);
}

$.taskList = [];
!(async () => {
  if (process.env.PRO_REDIS_URL) {
    try {
      $.redis = require("redis");
      pro_redis_url = process.env.PRO_REDIS_URL;
      const _0x247765 = {
        url: pro_redis_url
      };
      $.client = $.redis.createClient(_0x247765);

      if ($.client) {
        console.log("本地Redis已检测到配置链接");
        await $.client.connect();
      }
    } catch (_0x4488b8) {
      console.log(_0x4488b8);
      console.log("本地Redis连接失败, 退出执行！！！");
      process.exit(1);
    }
  }

  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    process.exit(1);
    return;
  }

  console.log("加入环境频道: https://t.me/proenvc");

  for (let _0xb65069 = 0; _0xb65069 < cookiesArr.length; _0xb65069++) {
    if (cookiesArr[_0xb65069]) {
      cookie = cookiesArr[_0xb65069];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xb65069 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UUID = getUUID("xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx");
      $.UUIDSTR = getUUIDSTR(16);
      message = "";
      console.log("******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********");
      $.blackFlag = false;
      await getUA();
      await redRainStartLottery();
      await $.wait(parseInt(Math.random() * 1500 + 1500, 10));

      if ($.blackFlag == true) {
        console.log("可能是黑号， 跳过此账号");
        continue;
      }
    }

    await $.wait(parseInt(Math.random() * 3500 + 2500, 10));
  }

  process.exit(1);
})().catch(_0x2ee25c => $.logErr(_0x2ee25c)).finally(() => $.done());

async function redRainInitProjectScene() {
  return new Promise(_0x2e2039 => {
    const _0x314b04 = {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://h5.m.jd.com",
      "User-Agent": $.UA,
      "accept-language": "zh-Hans-CN;q=1",
      cookie: cookie,
      referer: "https://h5.m.jd.com/mall/active/2sKEp9uxmhP4SjFWJpgrouwnrG11/index.html"
    };
    const _0x2169ab = {
      url: "https://api.m.jd.com/client.action",
      body: "functionId=redRainInitProjectScene&networkType=wifi&appid=publicUseApi&body={\"babelProjectId\":\"01485197\",\"babelPageId\":\"4418739\",\"activityNo\":\"poZswD8GeMAXgQE5HxPE_\"}&client=wh5&clientVersion=1.0.0&sid=&t=" + Date.now() + "&area=&ext={\"prstate\":\"0\"}&loginWQBiz=hongbaoyu",
      headers: _0x314b04
    };
    options = _0x2169ab;
    $.post(options, async (_0x1ce86e, _0x186f6f, _0x239507) => {
      try {
        if (_0x1ce86e) {
          console.log("" + JSON.stringify(_0x1ce86e));
          console.log($.name + " redRainInitProjectScene，请检查网路重试");
        }
      } catch (_0x2a6630) {
        $.logErr(_0x2a6630, _0x186f6f);
      } finally {
        _0x2e2039();
      }
    });
  });
}

async function redRainStartLottery() {
  return new Promise(_0x2ae0eb => {
    const _0x28b1cc = {
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded",
      origin: "https://h5.m.jd.com",
      "User-Agent": $.UA,
      "accept-language": "zh-Hans-CN;q=1",
      cookie: cookie,
      referer: "https://h5.m.jd.com/"
    };
    const _0x5e5035 = {
      url: "https://api.m.jd.com/api?appid=hongbaoyu&functionId=redRainStartLottery&body=%7B%22projectId%22%3A%2253502837741836050%22%2C%22activityId%22%3A%22e9da21edde954beea153be96135126d6%22%7D&h5st=20240117201326614%3B0556894771401373%3B16073%3Btk02wb5b31c4d18nmZWFICDPPtlpToQ9Y0dOndsCrQmuZ%2FBd%2BqZzab68h8e5TzyKKyRW9Zyo1LMQ0ApBQRgniFvLa5j8%3Bb27bbd2922c2e9d0fffeab1b9308386c0b8adf854d3031791a1e58b45bd6b484%3B3.0%3B1705493606614",
      headers: _0x28b1cc
    };
    options = _0x5e5035;
    $.post(options, async (_0x214e9b, _0x2c1c11, _0x2bad92) => {
      try {
        if (_0x214e9b) {
          console.log("" + JSON.stringify(_0x214e9b));
          console.log($.name + " redRainStartLottery请求失败，请检查网路重试");
        } else {
          console.log(_0x2bad92);
        }
      } catch (_0x39a17b) {
        $.logErr(_0x39a17b, _0x2c1c11);
      } finally {
        _0x2ae0eb();
      }
    });
  });
}

function safeGet(_0x59a2ab) {
  try {
    if (typeof JSON.parse(_0x59a2ab) == "object") {
      return true;
    }
  } catch (_0x17ede9) {
    console.log(_0x17ede9);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function jsonParse(_0x51006c) {
  if (typeof _0x51006c == "string") {
    try {
      return JSON.parse(_0x51006c);
    } catch (_0x1f5cd9) {
      console.log(_0x1f5cd9);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

async function getUA() {
  $.UA = "jdapp;iPhone;10.4.5;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function randomString(_0x42fec8) {
  _0x42fec8 = _0x42fec8 || 32;
  let _0x4a9e81 = "abcdef0123456789",
      _0x14048d = _0x4a9e81.length,
      _0x51f55a = "";

  for (i = 0; i < _0x42fec8; i++) {
    _0x51f55a += _0x4a9e81.charAt(Math.floor(Math.random() * _0x14048d));
  }

  return _0x51f55a;
}

function randomWord(_0x343e67, _0x40f8c7, _0x52139b) {
  var _0x4db9f6 = "",
      _0x263df6 = _0x40f8c7,
      _0x4238b3 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  if (_0x343e67) {
    _0x263df6 = Math.round(Math.random() * (_0x52139b - _0x40f8c7)) + _0x40f8c7;
  }

  for (var _0x51ec99 = 0; _0x51ec99 < _0x263df6; _0x51ec99++) {
    pos = Math.round(Math.random() * (_0x4238b3.length - 1));
    _0x4db9f6 += _0x4238b3[pos];
  }

  return _0x4db9f6;
}

function getUUID(_0x4dd465 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x2c4387 = 0) {
  return _0x4dd465.replace(/[xy]/g, function (_0x1a69e8) {
    var _0x2711ec = 16 * Math.random() | 0,
        _0x3c3c40 = "x" == _0x1a69e8 ? _0x2711ec : 3 & _0x2711ec | 8;

    uuid = _0x2c4387 ? _0x3c3c40.toString(36).toUpperCase() : _0x3c3c40.toString(36);
    return uuid;
  });
}

function getJSUA() {
  return "jdltapp;android;3.8.10;10;network/wifi;model/MI 8;addressid/1969998059;aid/8566972dfd9a795d;oaid/4a8b773c3e307386;osVer/29;appBuild/1436;psn/PhYbUtCsCJor1b8hwxjnY8rEv5S8XC|383;psq/14;adk/;ads/;pap/JA2020_3112531|3.8.10|ANDROID 10;osv/10;pv/374.14;jdv/0|iosapp|t_335139774|liteshare|CopyURL|1609306590175|1609306596;ref/com.jd.jdlite.lib.jdlitemessage.view.activity.MessageCenterMainActivity;partner/jsxdlyqj09;apprpd/MessageCenter_MessageMerge;eufv/1;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045140 Mobile Safari/537.36";
}

function getUUIDSTR(_0x58e96f) {
  let _0x1601ae = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  let _0x13851c = "";

  for (let _0x581866 = 0; _0x581866 < _0x58e96f; _0x581866++) {
    let _0x232e53 = parseInt(Math.random() * _0x1601ae.length - 1);

    _0x13851c += _0x1601ae[_0x232e53];
  }

  return _0x13851c;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }