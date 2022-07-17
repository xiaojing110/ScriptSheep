/*
微信签到领红包
12 2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_wxSignRed.js
*/
const $ = new Env("微信签到红包");

const _0x594ff4 = $.isNode() ? require('./jdCookie.js') : ''
const _0xce253e = $.isNode() ? require('./sendNotify') : ''
let _0x200e00 = [],
  _0x2a62d4 = ''
if ($.isNode()) {
  var _0x135112 = new Buffer.from('44796c616e', 'Hex').toString('utf8')
  Object.keys(_0x594ff4).forEach((_0x3e9c43) => {
    _0x200e00.push(_0x594ff4[_0x3e9c43])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    $.log = () => {}
  }
} else {
  let _0x1f0649 = $.getdata('CookiesJD') || '[]'
  _0x1f0649 = JSON.parse(_0x1f0649)
  _0x200e00 = _0x1f0649.map((_0x28194e) => _0x28194e.cookie)
  _0x200e00.reverse()
  _0x200e00.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')])
  _0x200e00.reverse()
  _0x200e00 = _0x200e00.filter((_0x2d3023) => !!_0x2d3023)
}
!(async () => {
  if (!_0x200e00[0]) {
    $.msg(
      $.name,
      '\u3010提示\u3011请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
      'https://bean.m.jd.com/bean/signIndex.action',
      { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' }
    )
    return
  }
  const _0x4f3bed = require('child_process').exec
  await _0x4f3bed(
    'grep ' + _0x135112 + ' jdCookie.js',
    async function (_0x19d929, _0x2cd494, _0x2cb205) {
      if (!_0x2cd494) {
        process.exit(111)
      }
    }
  )
  for (let _0x2d9bf9 = 0; _0x2d9bf9 < _0x200e00.length; _0x2d9bf9++) {
    if (_0x200e00[_0x2d9bf9]) {
      _0x2a62d4 = _0x200e00[_0x2d9bf9]
      $.UserName = decodeURIComponent(
        _0x2a62d4.match(/pt_pin=(.+?);/) && _0x2a62d4.match(/pt_pin=(.+?);/)[1]
      )
      $.index = _0x2d9bf9 + 1
      $.isLogin = true
      $.nickName = ''
      await _0x14637a()
      $.log(
        '\n******开始\u3010京东账号' +
          $.index +
          '\u3011' +
          ($.nickName || $.UserName) +
          '*********\n'
      )
      if (!$.isLogin) {
        $.msg(
          $.name,
          '\u3010提示\u3011cookie已失效',
          '京东账号' +
            $.index +
            ' ' +
            ($.nickName || $.UserName) +
            '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',
          { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' }
        )
        if ($.isNode()) {
          await _0xce253e.sendNotify(
            $.name + 'cookie已失效 - ' + $.UserName,
            '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'
          )
        }
        continue
      }
      await _0x2d73f8()
    }
  }
})()
  .catch((_0x577d6b) => {
    $.log('', '\u274C ' + $.name + ', 失败! 原因: ' + _0x577d6b + '!', '')
  })
  .finally(() => {
    $.done()
  })
async function _0x2d73f8() {
  try {
    await _0x250c10()
    await _0x295927()
    await _0x3318aa()
    let _0x281004 = await _0x39644f()
    await $.wait(1000)
    if (_0x281004.completionFlag) {
      $.log('任务已完成')
      return
    }
    await _0x10a38e(_0x281004.itemId, _0x281004.scanAssignmentId, 1)
    $.log('开始做任务...')
    await $.wait(8000)
    await _0x10a38e(_0x281004.itemId, _0x281004.scanAssignmentId, 0)
  } catch (_0x85de72) {
    $.logErr(_0x85de72)
  }
}
const _0x1b031b = require('axios')
const _0x16b199 = require('crypto-js')
const { format } = require('date-fns')
function _0x3318aa() {
  let _0x10d986 = 'SignComponent_doSignTask'
  let _0x50fa4d = { activityId: '10004' }
  let _0x50d1ef = _0x5e4b64({
    timestamp: Date.now(),
    body: _0x16b199.SHA256(JSON.stringify(_0x50fa4d)).toString(),
    functionId: _0x10d986,
  })
  return new Promise(async (_0x189ac4) => {
    const _0x14e67d = {
      url:
        'https://api.m.jd.com/signTask/doSignTask?functionId=' +
        _0x10d986 +
        '&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={"activityId":"10004"}&h5st=' +
        encodeURIComponent(_0x50d1ef),
      headers: {
        Host: 'api.m.jd.com',
        Connection: 'keep-alive',
        'content-type': 'application/json',
        referer:
          'https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        cookie: _0x2a62d4,
      },
    }
    $.post(_0x14e67d, (_0x32a7aa, _0xda254b, _0x33d442) => {
      try {
        if (_0x32a7aa) {
          $.logErr(_0x32a7aa)
          $.log('dailysign api请求失败\uFF0C请检查网路重试')
        } else {
          if (_0x33d442) {
            _0x33d442 = JSON.parse(_0x33d442)
            if (_0x33d442.subCode == 0) {
              $.log(
                '签到: ' +
                  _0x33d442.data.signDays +
                  '天, 获得红包: ' +
                  _0x33d442.data.rewardValue +
                  '元'
              )
            } else {
              $.log(_0x33d442.message)
            }
          }
        }
      } catch (_0x3df7b2) {
        $.logErr(_0x3df7b2)
      } finally {
        _0x189ac4()
      }
    })
  })
}
function _0x39644f() {
  return new Promise(async (_0x5c004b) => {
    const _0xe55e1a = {
      url: 'https://api.m.jd.com/signTask/querySignList?functionId=SignComponent_querySignList&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={"activityId":"10004"}',
      headers: {
        Host: 'api.m.jd.com',
        Connection: 'keep-alive',
        'content-type': 'application/json',
        referer:
          'https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        cookie: _0x2a62d4,
      },
    }
    $.post(_0xe55e1a, (_0x105221, _0x47220f, _0x7bdbfe) => {
      try {
        if (_0x105221) {
          $.logErr(_0x105221)
          $.log('querySignList api请求失败\uFF0C请检查网路重试')
        } else {
          if (_0x7bdbfe) {
            _0x7bdbfe = JSON.parse(_0x7bdbfe)
            if (_0x7bdbfe.subCode == 0) {
              $.taskList = _0x7bdbfe.data.scanTaskInfo
              _0x5c004b($.taskList)
            } else {
              $.log(_0x7bdbfe.message)
            }
          }
        }
      } catch (_0x547d70) {
        $.logErr(_0x547d70)
      } finally {
        _0x5c004b()
      }
    })
  })
}
function _0x10a38e(_0x1d2148, _0x3c0500, _0x21b453) {
  return new Promise(async (_0x1eb5ef) => {
    const _0x50c7f1 = {
      url:
        'https://api.m.jd.com/scanTask/startScanTask?functionId=SignComponent_doScanTask&appid=hot_channel&loginWQBiz=signcomponent&loginType=2&body={"itemId":"' +
        _0x1d2148 +
        '","activityId":"10004","scanAssignmentId":"' +
        _0x3c0500 +
        '","actionType":' +
        _0x21b453 +
        '}',
      headers: {
        Host: 'api.m.jd.com',
        Connection: 'keep-alive',
        'content-type': 'application/json',
        referer:
          'https://servicewechat.com/wx91d27dbf599dff74/616/page-frame.html',
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.1.0.314) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/11.1.5.320 Mobile Safari/537.36',
        cookie: _0x2a62d4,
      },
    }
    $.post(_0x50c7f1, (_0x3a736c, _0x35f620, _0x31a3ee) => {
      try {
        if (_0x3a736c) {
          $.logErr(_0x3a736c)
          $.log('dotask api请求失败\uFF0C请检查网路重试')
        } else {
          if (_0x31a3ee) {
            _0x31a3ee = JSON.parse(_0x31a3ee)
            if (_0x31a3ee.subCode == 0 && _0x31a3ee.data.rewardValue) {
              $.log(
                '任务完成\uFF0C获得红包: ' + _0x31a3ee.data.rewardValue + '元'
              )
            } else {
              $.log(_0x31a3ee.message)
            }
          }
        }
      } catch (_0x9fa3ab) {
        $.logErr(_0x9fa3ab)
      } finally {
        _0x1eb5ef()
      }
    })
  })
}
let _0x3ed00a = '',
  _0x365a98 = null
function _0x295927() {
  return new Promise(async (_0x598566) => {
    _0x1b031b
      .post(
        'https://cactus.jd.com/request_algo?g_ty=ajax',
        {
          version: '3.0',
          fp: $.fp,
          appId: '9a38a',
          timestamp: Date.now(),
          platform: 'web',
          expandParams: '',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            host: 'cactus.jd.com',
            Referer: 'https://cactus.jd.com',
            'User-Agent':
              'Mozilla/5.0 (iPhone; CPU iPhone OS 11_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E217 MicroMessenger/6.8.0(0x16080000) NetType/WIFI Language/en Branch/Br_trunk MiniProgramEnv/Mac',
          },
        }
      )
      .then((_0x536edc) => {
        _0x3ed00a = _0x536edc.data.data.result.tk
        _0x365a98 = new Function('return ' + _0x536edc.data.data.result.algo)()
        _0x598566()
      })
  })
}
function _0x5e4b64(_0x36a3d7) {
  let _0xe52017 = [
    {
      key: 'appid',
      value: 'hot_channel',
    },
    {
      key: 'body',
      value: _0x36a3d7.body,
    },
    {
      key: 'functionId',
      value: _0x36a3d7.functionId,
    },
  ]
  let _0x3d415b = ''
  _0xe52017.forEach(({ key, value }) => {
    _0x3d415b += key + ':' + value + '&'
  })
  _0x3d415b = _0x3d415b.slice(0, -1)
  let _0x4a834a = Date.now()
  let _0x28d0c8 = format(_0x4a834a, 'yyyyMMddHHmmssSSS')
  let _0x47c30d = _0x365a98(
    _0x3ed00a,
    $.fp,
    _0x28d0c8.toString(),
    '9a38a',
    _0x16b199
  ).toString(_0x16b199.enc.Hex)
  _0x3d415b = _0x16b199
    .HmacSHA256(_0x3d415b, _0x47c30d)
    .toString(_0x16b199.enc.Hex)
  return [
    _0x28d0c8.toString(),
    $.fp,
    '9a38a',
    _0x3ed00a,
    _0x3d415b,
    '3.0',
    _0x4a834a.toString(),
  ].join(';')
}
function _0x14637a() {
  return new Promise(async (_0x18c156) => {
    const _0x172cb4 = {
      url: 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
      headers: {
        Accept: 'application/json,text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        Connection: 'keep-alive',
        Cookie: _0x2a62d4,
        Referer: 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'User-Agent': $.isNode()
          ? process.env.JD_USER_AGENT
            ? process.env.JD_USER_AGENT
            : require('./USER_AGENTS').USER_AGENT
          : $.getdata('JDUA')
          ? $.getdata('JDUA')
          : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
      },
    }
    $.post(_0x172cb4, (_0x31158d, _0x4d7924, _0x14be64) => {
      try {
        if (_0x31158d) {
          $.log('' + JSON.stringify(_0x31158d))
          $.log($.name + ' API请求失败\uFF0C请检查网路重试')
        } else {
          if (_0x14be64) {
            _0x14be64 = JSON.parse(_0x14be64)
            if (_0x14be64.retcode === 13) {
              $.isLogin = false
              return
            }
            if (_0x14be64.retcode === 0) {
              $.nickName =
                (_0x14be64.base && _0x14be64.base.nickname) || $.UserName
            } else {
              $.nickName = $.UserName
            }
          } else {
            $.log('京东服务器返回空数据')
          }
        }
      } catch (_0xf640a8) {
        $.logErr(_0xf640a8, _0x4d7924)
      } finally {
        _0x18c156()
      }
    })
  })
}
function _0x250c10() {
  let _0x2e384c = ''
  let _0x194d74 = '0123456789',
    _0x1511b8 = _0x194d74,
    _0x8385f7 = (Math.random() * 10) | 0
  let _0x35b13d
  do {
    _0x35b13d = _0x13afdf({
      size: 1,
      num: _0x194d74,
    })
    _0x2e384c.indexOf(_0x35b13d) == -1 && (_0x2e384c += _0x35b13d)
  } while (_0x2e384c.length < 3)
  for (let _0x29ab6f of _0x2e384c.slice()) {
    _0x1511b8 = _0x1511b8.replace(_0x29ab6f, '')
  }
  $.fp =
    _0x13afdf({
      size: _0x8385f7,
      num: _0x1511b8,
    }) +
    _0x2e384c +
    _0x13afdf({
      size: 12 - _0x8385f7,
      num: _0x1511b8,
    }) +
    _0x8385f7
}
function _0x13afdf() {
  let _0x4f4e8b = arguments.length > 0 ? arguments[0] : {},
    _0xb31a6a = _0x4f4e8b.size,
    _0x2eca61 = _0x4f4e8b.num,
    _0x4af93f = ''
  for (; _0xb31a6a--; ) {
    _0x4af93f += _0x2eca61[(Math.random() * _0x2eca61.length) | 0]
  }
  return _0x4af93f
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }