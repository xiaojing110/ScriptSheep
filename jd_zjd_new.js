/*

2 12-14 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zjd_new.js

默认前3个CK开团，如需修改，变量export DY_ZJDTOP=数量

一组30豆，一天最多开三组，至少5个CK才能保证成一次！

2022-9-19 

author:https://github.com/6dylan6/jdpro
 */
 
const $ = new Env('赚京豆');
const d = $.isNode() ? require('./sendNotify') : '',
      A = $.isNode() ? require('./jdCookie.js') : '';
let n = true,
    P = [],
    K = '',
    H,
    t = process.env.DY_ZJDTOP || 3;
$.tuanList = [];

if ($.isNode()) {

  Object.keys(A).forEach(J => {
    P.push(A[J]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }

  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) {
    process.exit(0);
  }
} else {
  P = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...J3($.getdata('CookiesJD') || '[]').map(J => J.cookie)].filter(J => !!J);
}

$.UA = 'jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36';
!(async () => {
  if (!P[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  await $.wait(500);
  console.log('默认前3个CK开团，设置变量DY_ZJDTOP控制数量，至少5个ck才能保证成一组！\n');
  console.log('====================开始开团====================\n');

  for (let k = 0; k < t; k++) {
    if (P[k]) {
      K = P[k];
      $.UserName = decodeURIComponent(K.match(/pt_pin=([^; ]+)(?=;?)/) && K.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = k + 1;
      $.isLogin = true;
      $.nickName = '';
      H = '';
      await J1();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const N = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', N);
        $.isNode() && (await d.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await f();
      await $.wait(1000);
    }
  }

  console.log('\n====================开始团助力====================\n');

  for (let o = 0; o < P.length; o++) {
    $.canHelp = true;

    if (P[o]) {
      K = P[o];
      $.index = o + 1;
      $.UserName = decodeURIComponent(K.match(/pt_pin=([^; ]+)(?=;?)/) && K.match(/pt_pin=([^; ]+)(?=;?)/)[1]);

      if ($.canHelp && P.length > $.assistNum) {
        if ($.tuanList && $.tuanList.length) {
          console.log('账号' + $.index + '开始助力 ');

          for (let I = 0; I < $.tuanList.length; I++) {
            console.log($.UserName + ' 给【' + $.tuanList[I].assistedPinEncrypted + '】助力');
            $.max = false;
            await G($.tuanList[I]);

            if ($.max) {
              $.tuanList.splice(I, 1);
              I--;
              continue;
            }

            if (!$.canHelp) {
              break;
            }

            await $.wait(Math.random() * 1000 + 500);
          }
        } else {
          console.log('助力已满，结束运行\n');
          break;
        }
      } else {
        console.log('CK数量不足，助力个毛\n');
        break;
      }
    }
  }
})().catch(J => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + J + '!', '');
}).finally(() => {
  $.done();
});

function U() {
  return new Promise(C => {
    if (H) {
      $.msg($.name, '', '【京东账号' + $.index + '】' + $.nickName + '\n' + H);
    }

    C();
  });
}

async function f() {
  try {
    await M(), await U();
  } catch (D) {
    $.logErr(D);
  }
}

async function M() {
  try {
    $.tuan = '';
    $.hasOpen = false;
    $.assistStatus = 0;
    await z();
    await $.wait(500);

    if (!$.tuan && ($.assistStatus === 3 || $.assistStatus === 2 || $.assistStatus === 0) && $.canStartNewAssist) {
      console.log('准备再次开团');
      await u();
      await $.wait(500);

      if ($.hasOpen) {
        await z();
      }
    }

    if ($.tuan && $.tuan.hasOwnProperty('assistedPinEncrypted') && $.assistStatus !== 3) {
      $.tuanList.push($.tuan);
    }
  } catch (k) {
    $.logErr(k);
  }
}

async function G(J) {
  for (let X = 0; X < 3; X++) {
    var D = await J4('vvipclub_distributeBean_assist', J, '03064');

    if (D) {
      break;
    }

    await $.wait(3000);
  }

  return new Promise(R => {
    $.post(J0(D.fn, D.body), async (E, o, I) => {
      try {
        if (E) {
          console.log('' + JSON.stringify(E)), console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (J2(I)) {
            I = JSON.parse(I);

            if (I.success) {
              console.log('助力结果：助力成功\n');
            } else {
              if (I.resultCode === '9200008') {
                console.log('助力结果：不能助力自己\n');
              } else {
                if (I.resultCode === '9200011') {
                  console.log('助力结果：已助力过TA且没次数了\n');
                } else {
                  if (I.resultCode === '2400205') {
                    console.log('助力结果：团已满\n'), $.max = true;
                  } else {
                    if (I.resultCode === '90000014') {
                      console.log('助力结果：助力次数已耗尽\n'), $.canHelp = false;
                    } else {
                      if (I.resultCode === '2400203') {
                        console.log('助力结果：已助力过TA，还有助力次数\n');
                      } else {
                        if (I.resultCode === '9000013') {
                          console.log('助力结果：活动火爆，跳出\n'), $.canHelp = false;
                        } else {
                          if (I.resultCode === '101') {
                            console.log('助力结果：未登录，跳出\n');
                            $.canHelp = false;
                          } else {
                            console.log('助力结果：未知错误\n' + JSON.stringify(I) + '\n\n');
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (F) {
        $.logErr(F, o);
      } finally {
        R(I);
      }
    });
  });
}

async function z() {
  for (let D = 0; D < 3; D++) {
    var C = await J4('distributeBeanActivityInfo', {
      paramData: {
        channel: 'FISSION_BEAN'
      }
    }, 'aea1e');

    if (C) {
      break;
    }

    await $.wait(3000);
  }

  return new Promise(k => {
    $.post(J0(C.fn, C.body), async (N, m, E) => {
      try {
        if (N) {
          console.log('' + JSON.stringify(N)), console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (J2(E)) {
            E = JSON.parse(E);

            if (E.success) {
              $.log('\n当前账号能否再次开团: ' + (E.data.canStartNewAssist ? '可以' : '否'));

              if (E.data.assistStatus === 1 && !E.data.canStartNewAssist) {
                console.log('已开团，团成员人未满\n');
              } else {
                if (E.data.assistStatus === 2 && E.data.canStartNewAssist) {
                  console.log('当前没有团\n');
                } else {
                  if (E.data.assistStatus === 3 && E.data.canStartNewAssist) {
                    console.log('上一次已成团\n');
                  } else {
                    E.data.assistStatus === 3 && !E.data.canStartNewAssist && console.log('今日开团已达上限，且当前团成员人已满\n');
                  }
                }
              }

              if (E.data && !E.data.canStartNewAssist) {
                const l = {
                  activityIdEncrypted: E.data.id,
                  assistStartRecordId: E.data.assistStartRecordId,
                  assistedPinEncrypted: E.data.encPin,
                  channel: 'FISSION_BEAN',
                  launchChannel: ''
                };
                $.tuan = l;
              }

              $.tuanActId = E.data.id;
              $.assistNum = E.data.assistNum || 4;
              $.assistStatus = E.data.assistStatus;
              $.canStartNewAssist = E.data.canStartNewAssist;
            } else {
              ;
              $.tuan = true, console.log('当前账号活动信息失败 ' + JSON.stringify(E) + '\n');
            }
          }
        }
      } catch (B) {
        $.logErr(B, m);
      } finally {
        k(E);
      }
    });
  });
}

async function u() {
  for (let D = 0; D < 3; D++) {
    var C = await J4('vvipclub_distributeBean_startAssist', {
      activityIdEncrypted: $.tuanActId,
      channel: 'FISSION_BEAN'
    }, '82703', 0);

    if (C) {
      break;
    }

    await $.wait(3000);
  }

  return new Promise(k => {
    $.post(J0(C.fn, C.body), async (N, m, E) => {
      try {
        if (N) {
          console.log('' + JSON.stringify(N));
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (J2(E)) {
            E = JSON.parse(E);

            if (E.success) {
              console.log('>>>>>>>>>>>>>>>>>>>>>>>开团成功'), $.hasOpen = true;
            } else {
              console.log('\n开团失败：' + JSON.stringify(E) + '\n');
            }
          }
        }
      } catch (g) {
        $.logErr(g, m);
      } finally {
        k(E);
      }
    });
  });
}

function J0(X, k) {
  const m = {
    Host: 'api.m.jd.com',
    Connection: 'keep-alive',
    Cookie: K,
    Referer: 'https://h5platform.jd.com/',
    Origin: 'https://h5platform.jd.com/',
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip,compress,br,deflate'
  };
  m['User-Agent'] = $.UA;
  const E = {
    url: 'https://api.m.jd.com/api',
    body: k,
    headers: m
  };
  return E;
}

function J1() {
  return new Promise(async C => {
    const X = {
      url: 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
      headers: {
        Host: 'wq.jd.com',
        Accept: '*/*',
        Connection: 'keep-alive',
        Cookie: K,
        'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'Accept-Language': 'zh-cn',
        Referer: 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
        'Accept-Encoding': 'gzip, deflate, br'
      }
    };
    $.get(X, (k, R, N) => {
      try {
        if (k) {
          $.logErr(k);
        } else {
          if (N) {
            N = JSON.parse(N);

            if (N.retcode === 1001) {
              $.isLogin = false;
              return;
            }

            N.retcode === 0 && N.data && N.data.hasOwnProperty('userInfo') && ($.nickName = N.data.userInfo.baseInfo.nickname);
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (m) {
        $.logErr(m);
      } finally {
        C();
      }
    });
  });
}

function J2(C) {
  try {
    if (typeof JSON.parse(C) == 'object') {
      return true;
    }
  } catch (k) {
    return console.log(k), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function J3(D) {
  const k = function () {
    let N = true;
    return function (m, E) {
      const o = N ? function () {
        if (E) {
          const I = E.apply(m, arguments);
          return E = null, I;
        }
      } : function () {};
      return N = false, o;
    };
  }();

  const R = k(this, function () {
    return R.toString().search('(((.+)+)+)+$').toString().constructor(R).search('(((.+)+)+)+$');
  });
  R();

  if (typeof D == 'string') {
    try {
      return JSON.parse(D);
    } catch (N) {
      return console.log(N), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

function J4(D, X, k) {
  const N = {
    appId: k,
    fn: D,
    body: X,
    pin: $.UserName
  };
  const m = {
    'Content-Type': 'application/json'
  };
  let E = {
    url: 'https://zjdhst-hst-tdorbathyh.cn-hangzhou.fcapp.run/h5st',
    body: JSON.stringify(N),
    headers: m,
    timeout: 10000
  },
      e = '';
  return new Promise(o => {
    $.post(E, (I, V, p) => {
      try {
        I ? console.log(JSON.stringify(I)) : (p = JSON.parse(p), p.code == 200 ? e = p.data : $.log(p.msg + '重试一次'));
      } catch (O) {
        console.log(O, V);
      } finally {
        o(e);
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
