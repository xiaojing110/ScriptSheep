/*
秒秒币兑换,17号0点清零，有需要的执行兑换；
入口：京东APP 首页秒杀
默认将全部秒币兑换为红包
12 12 12 12 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_ms_reward.js
 */
const $ = new Env('秒秒币兑换');
const notify = $.isNode() ? require('./sendNotify') : '',
      dylant = require('./function/dylant.js'),
      jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';

var timestamp = Math.round(new Date().getTime()).toString();
let cookiesArr = [],
    cookie = '',
    message;

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xe0fdbb => {
    cookiesArr.push(jdCookieNode[_0xe0fdbb]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || '[]').map(_0x279e48 => _0x279e48.cookie)].filter(_0x3388a2 => !!_0x3388a2);

const JD_API_HOST = 'https://api.m.jd.com/client.action';
$.appid = '50086', $.scid = 'MShPageh5', $.suc = 'yes', !(async () => {
  if (!cookiesArr[0]) {
    const _0x4168b9 = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x4168b9);
    return;
  }

  await check();

  for (let _0x3b0af8 = 0; _0x3b0af8 < cookiesArr.length; _0x3b0af8++) {
    if (cookiesArr[_0x3b0af8]) {
      cookie = cookiesArr[_0x3b0af8], $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3b0af8 + 1, $.isLogin = true, $.nickName = '', message = '', $.jdk = getUUID('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), getUA(), $.joyytoken = '', await TotalBean(), console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0xeb7515 = {
          'open-url': 'https://bean.m.jd.com/'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/', _0xeb7515);
        $.isNode() && (await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await jdMs(), await $.wait(2000);
    }
  }
})().catch(_0x3fa474 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x3fa474 + '!', '');
}).finally(() => {
  $.done();
});

async function jdMs() {
  $.score = 0;
  await getUserInfo();
  await $.wait(500);

  if ($.score < 100) {
    console.log('金币不足无需兑换！');
    return;
  }

  ;
  console.log('\n去兑换...');
  await doTask($.score);
  await showMsg();
}

function getUserInfo(_0x272ffe = true) {
  return new Promise(_0x36867e => {
    $.post(taskPostUrl('homePageV2', {}, 'appid=SecKill2020'), (_0x477ff3, _0x532fee, _0x147f60) => {
      try {
        if (_0x477ff3) console.log(_0x477ff3 + ',' + jsonParse(_0x532fee.body).message), console.log($.name + ' API请求失败，请检查网路重试');else {
          if (safeGet(_0x147f60)) {
            _0x147f60 = JSON.parse(_0x147f60), $.score = _0x147f60.result.assignment.assignmentPoints || 0;
            if (_0x272ffe) console.log('当前秒秒币' + $.score);
          }
        }
      } catch (_0xd20229) {
        $.logErr(_0xd20229, _0x532fee);
      } finally {
        _0x36867e(_0x147f60);
      }
    });
  });
}

async function doTask(_0x1d3cb) {
  _0x1d3cb = Math.floor(_0x1d3cb / 1000 * 10);

  let _0xf62c15 = await dylant.geturl($);

  const _0x46fb3e = {
    'platform': '1',
    'eid': '',
    'referUrl': '',
    'userAgent': ''
  };
  _0x46fb3e.exchangeNum = _0x1d3cb;
  const _0xb0f146 = {
    'encryptProjectId': '3YufBFnZFs3CMvWNhGPuMAzwozRz',
    'completionFlag': true,
    'actionType': 0x0,
    'encryptAssignmentId': '4YCdbkafL75sPVbbkgrKpH8ahyJ3',
    'sourceCode': 'ace35880'
  };
  _0xb0f146.extParam = _0xf62c15;
  _0xb0f146.ext = _0x46fb3e, body = _0xb0f146;
  return new Promise(_0x974105 => {
    $.post(taskPostUrl('doInteractiveAssignment', body), (_0xde3427, _0x553edd, _0x2c027d) => {
      try {
        if (_0xde3427) console.log(_0xde3427 + ',' + jsonParse(_0x553edd.body).message), console.log($.name + ' API请求失败，请检查网路重试');else {
          if (safeGet(_0x2c027d)) {
            _0x2c027d = JSON.parse(_0x2c027d);
            _0x2c027d.subCode == 0 ? console.log('成功兑换' + _0x1d3cb / 10 + '元无门槛红包') : console.log(_0x2c027d.msg);
            if (_0x2c027d.msg === '风险等级未通过') $.risk = 1;
          }
        }
      } catch (_0x44bf36) {
        $.logErr(_0x44bf36, _0x553edd);
      } finally {
        _0x974105(_0x2c027d);
      }
    });
  });
}

function showMsg() {
  return new Promise(_0x22fdc2 => {
    message += '本次运行获得秒秒币' + ($.score - $.cur) + '枚，共' + $.score + '枚', $.msg($.name, '', '京东账号' + $.index + $.nickName + '\n' + message), _0x22fdc2();
  });
}

function taskPostUrl(_0x194739, _0x3ecfbe = {}, _0x3e89f5 = '', _0x58477b) {
  let _0x4442a4 = '' + JD_API_HOST;

  _0x58477b && (_0x4442a4 += '?functionId=' + _0x58477b);
  _0x3ecfbe = 'functionId=' + _0x194739 + '&body=' + JSON.stringify(_0x3ecfbe) + '&client=wh5&clientVersion=1.0.0';

  if (_0x3e89f5) {
    _0x3ecfbe = 'functionId=' + _0x194739 + '&body=' + encodeURIComponent(JSON.stringify(_0x3ecfbe)) + '&client=wh5&clientVersion=1.0.0&' + _0x3e89f5;
  }

  let _0x387490 = cookie.match(/pt_key=([^; ]+)(?=;?)/)[1];
  return {
    'url': _0x4442a4,
    'body': _0x3ecfbe,
    'headers': {
      'Cookie': 'pt_key=app_open' + _0x387490 + ';' + cookie + ('joyytoken=' + ('50082' + $.joyytoken) + ';'),
      'Origin': 'https://seckill-bonus-pro.pf.jd.com',
      'Referer': 'https://seckill-bonus-pro.pf.jd.com/',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': $.UA
    }
  };
}

function check() {
  const _0x18702d = {
    'timeout': 0x7530,
    'url': 'https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy'
  };
  let _0x312a10 = _0x18702d;
  return new Promise(_0x5e662f => {
    $.get(_0x312a10, async (_0x505fb6, _0x3f4c26, _0x1cb4f0) => {
      try {
        if (_0x505fb6) console.log('\n服务连接失败，终止执行！'), process.exit(111);else {
          if (_0x1cb4f0) {
            _0x1cb4f0 = JSON.parse(_0x1cb4f0);

            if (_0x1cb4f0.code === 200) {
              $.suc = 'no', $.ver = _0x1cb4f0.version;
            } else {
              console.log('\n' + _0x1cb4f0.msg), process.exit(111);
            }
          }
        }
      } catch (_0x5f2ac6) {
        $.logErr(_0x5f2ac6, _0x3f4c26);
      } finally {
        _0x5e662f(_0x1cb4f0);
      }
    });
  });
}

function TotalBean() {
  return new Promise(_0x2fadc8 => {
    const _0x112c71 = {
      'timeout': 0x2710,
      'url': 'https://plogin.m.jd.com/cgi-bin/ml/islogin'
    };
    _0x112c71.headers = {};
    _0x112c71.headers.Cookie = cookie, _0x112c71.headers.referer = 'https://h5.m.jd.com/';
    _0x112c71.headers['User-Agent'] = $.UA;
    const _0x4dac6a = _0x112c71;
    $.get(_0x4dac6a, (_0x480e79, _0x2b0fcb, _0x50bff5) => {
      try {
        if (_0x50bff5) {
          _0x50bff5 = JSON.parse(_0x50bff5);

          if (_0x50bff5.islogin === '1') {} else {
            if (_0x50bff5.islogin === '0') {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x340a59) {
        console.log(_0x340a59);
      } finally {
        _0x2fadc8();
      }
    });
  });
}

function safeGet(_0x2d6df6) {
  try {
    if (typeof JSON.parse(_0x2d6df6) == 'object') return true;
  } catch (_0x916725) {
    return console.log(_0x916725), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function jsonParse(_0x8678e) {
  if (typeof _0x8678e == 'string') {
    try {
      return JSON.parse(_0x8678e);
    } catch (_0x25b601) {
      return console.log(_0x25b601), $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie'), [];
    }
  }
}

function getUA() {
  let _0xe9bd42 = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
      _0x247f78 = ['9', '10', '11', '12'],
      _0x5c679e = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
      _0x4606fd = ['98413', '98416', '98415', '98417', '98450'];
  $.dv = _0xe9bd42[Math.floor(Math.random() * _0xe9bd42.length)], $.iv = _0x247f78[Math.floor(Math.random() * _0x247f78.length)], $.av = _0x5c679e[Math.floor(Math.random() * _0x5c679e.length)], $.bv = _0x4606fd[Math.floor(Math.random() * _0x4606fd.length)], getstr = function (_0xc19a6a) {
    let _0x59805e = '',
        _0xbe6a43 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let _0x4fa6d3 = 0; _0x4fa6d3 < _0xc19a6a; _0x4fa6d3++) {
      let _0x37fd68 = Math.round(Math.random() * (_0xbe6a43.length - 1));

      _0x59805e += _0xbe6a43.substring(_0x37fd68, _0x37fd68 + 1);
    }

    return _0x59805e;
  };

  let _0x5e9fcb = Buffer.from(getstr(16), 'utf8').toString('base64');

  let _0x439454 = Buffer.from(getstr(16), 'utf8').toString('base64');

  let _0x4ca033 = encodeURIComponent(JSON.stringify({
    'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    'ts': Date.now(),
    'ridx': -1,
    'cipher': {
      'sv': 'CJS=',
      'ad': _0x5e9fcb,
      'od': _0x439454,
      'ov': 'CzO=',
      'ud': _0x5e9fcb
    },
    'ciphertype': 0x5,
    'version': '1.2.0',
    'appname': 'com.jingdong.app.mall'
  }));

  $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function getUUID(_0x5ace05 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x1e8b72 = 0) {
  return _0x5ace05.replace(/[xy]/g, function (_0x1fc7f2) {
    var _0x48568f = 10 * Math.random() | 0,
        _0xe6d57 = 'x' == _0x1fc7f2 ? _0x48568f : 3 & _0x48568f | 8;

    return uuid = _0x1e8b72 ? _0xe6d57.toString(36).toUpperCase() : _0xe6d57.toString(36), uuid;
  });
}

function ttt(_0x39ffd8) {
  let _0x230cfe = JD_API_HOST + 'client.action?functionId=doInteractiveAssignment';

  return {
    'url': _0x230cfe,
    'body': _0x39ffd8,
    'headers': {
      'Cookie': cookie,
      'origin': 'https://prodev.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    }
  };
}

function readpack(_0x56a63b) {
  let _0xb5f2a = JD_API_HOST + 'client.action';

  const _0x74dfa6 = {
    'Origin': 'https://seckill-bonus-pro.pf.jd.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  _0x74dfa6.Cookie = cookie, _0x74dfa6['User-Agent'] = $.UA;
  const _0x4ada20 = {};
  return _0x4ada20.url = _0xb5f2a, _0x4ada20.body = _0x56a63b, _0x4ada20.headers = _0x74dfa6, _0x4ada20;
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }