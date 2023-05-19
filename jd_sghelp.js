
/*
数钱助力
前5个ck做车头, 变量SQTOP='10'，10个助力满
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_sqhelp.js
updatetime:2023/4/28
 */

const $ = new Env('数钱助力');
const i1ilI1ii = $.isNode() ? require("./sendNotify") : "",
      Il111III = $.isNode() ? require("./jdCookie.js") : "",
      lIIiIIII = require("./USER_AGENTS");

let iii1Ilii = true,
    lIiIIl1 = [],
    Iil11I1I = [];
let Illl1ll = [],
    lI111iI = "",
    illiillI = "",
    iIi11l1I = process.env.SQTOP || "5";

if ($.isNode()) {
  Object.keys(Il111III).forEach(i1I1lI1 => {
    Illl1ll.push(Il111III[i1I1lI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Illl1ll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lIliIIli($.getdata("CookiesJD") || "[]").map(iil1iliI => iil1iliI.cookie)].filter(I111IIiI => !!I111IIiI);

!(async () => {
  if (!Illl1ll[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  console.log("当前版本：V1.0.1");
  console.log("入口：京东购物微信小程序--领现金");
  console.log("问题建议：https://t.me/dylan_jdpro\n");
  Iil11I1I = [];
  Iil11I1I = Iil11I1I[Math.floor(Math.random() * Iil11I1I.length)];

  for (let l1111111 = 0; l1111111 < iIi11l1I; l1111111++) {
    if (Illl1ll[l1111111]) {
      lI111iI = Illl1ll[l1111111];
      $.UserName = decodeURIComponent(lI111iI.match(/pt_pin=([^; ]+)(?=;?)/) && lI111iI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1111111 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = 0;
      $.UA = lIIiIIII.UARAM ? lIIiIIII.UARAM() : lIIiIIII.USER_AGENT;
      await iiI1i1I();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1ilI1ii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await Il1l1lIi();
      await $.wait(1000);
    }
  }

  console.log("\n\n开始助力：");
  let il1iIIil = 0;

  for (let Ii11llI1 of lIiIIl1) {
    console.log("\n去助力-> " + Ii11llI1);
    $.hnum = 0;
    $.full = false;

    for (let ilI1l11 = il1iIIil; ilI1l11 < Illl1ll.length; ilI1l11++) {
      if (Illl1ll[ilI1l11]) {
        lI111iI = Illl1ll[ilI1l11];
        $.UserName = decodeURIComponent(lI111iI.match(/pt_pin=([^; ]+)(?=;?)/) && lI111iI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = ilI1l11 + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = lIIiIIII.UARAM ? lIIiIIII.UARAM() : lIIiIIII.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

        if ($.index == 1) {
          $.log("CK1不助力");
        //   await i111i1l(Iil11I1I);
        } else {
          await i111i1l(Ii11llI1);
        }

        if ($.full) {
          il1iIIil = ilI1l11;
          break;
        }

        if ($.hnum == 10) {
          il1iIIil = ilI1l11 + 1;
          break;
        }

        await $.wait(2000);
      }
    }

    if ($.index === Illl1ll.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }
})().catch(i1ilI1li => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + i1ilI1li + "!", "");
}).finally(() => {
  $.done();
});

async function i111i1l(i1llil1) {
  let I1l1lIi1 = {
    "version": "1",
    "channel": "applet",
    "type": 2,
    "inviteCode": "" + i1llil1,
    "lng": "",
    "lat": ""
  };
  return new Promise(async I1i1l1li => {
    $.post(lIliIlii("cash_qr_code_assist", I1l1lIi1), async (liI1iiII, iIilI1l, lI11illi) => {
      try {
        if (liI1iiII) {
          console.log("" + JSON.stringify(liI1iiII));
          console.log(" API请求失败，请检查网路重试");
        } else {
          lI11illi = JSON.parse(lI11illi);

          if (lI11illi.code == 0) {
            switch (lI11illi.data.bizCode) {
              case 0:
                if ($.index > 1) $.hnum++;
                console.log("助力成功 " + ($.index > 1 ? $.hnum : ""));
                break;

              case 208:
                console.log("对方助力已满！");
                if ($.index > 1) $.full = true;
                break;

              case 206:
                $.log("已助力过TA！");
                break;

              case 207:
                $.log("无助力次数！");
                break;

              case 210:
                $.log("不能助力自己！");
                break;

              default:
                console.log(JSON.stringify(lI11illi));
            }
          } else {
            console.log(lI11illi.msg);
          }
        }
      } catch (llllIlil) {
        $.logErr(llllIlil, iIilI1l);
      } finally {
        I1i1l1li(lI11illi);
      }
    });
  });
}

function Il1l1lIi() {
  let l1lI1l1 = {
    "version": "1",
    "channel": "applet"
  };
  return new Promise(async lI1lI1ii => {
    $.post(lIliIlii("cash_mob_home", l1lI1l1), async (IiiIi1l1, i11lIiII, Iili1li1) => {
      try {
        IiiIi1l1 ? (console.log("" + JSON.stringify(IiiIi1l1)), console.log(" API请求失败，请检查网路重试")) : (Iili1li1 = JSON.parse(Iili1li1), Iili1li1.code == 0 ? Iili1li1.data.bizCode == 0 ? (console.log("邀请码：" + Iili1li1.data.result.inviteCode), lIiIIl1.push(Iili1li1.data.result.inviteCode)) : console.log(Iili1li1.data.bizMsg) : console.log(Iili1li1.msg));
      } catch (lIIII11i) {
        $.logErr(lIIII11i, i11lIiII);
      } finally {
        lI1lI1ii(Iili1li1);
      }
    });
  });
}

function lIliIlii(i1iii1i1, liIIiliI) {
  return {
    "url": "https://api.m.jd.com/?g_ty=ls&g_tk=616816427",
    "body": "loginType=2&clientType=wxapp&client=wh5&clientVersion=1.0.0&d_brand=&d_model=&lang=zh_CN&uuid=&appid=signed_mp&t=" + Date.now + "&functionId=" + i1iii1i1 + "&body=" + encodeURIComponent(JSON.stringify(liIIiliI)) + "&loginWQBiz=pet-town&h5st=20230428215402232%3B8517094924558639%3Bc8815%3Btk02a8bf41be318pMXgzMWdxUk9FzVTwIa1Y5BN3GYXDFTCU37w9xPVffVC32ViGDe33QLt8JhzryaMoLDnWAMtJulav%3Ba339ec95c0fbabca4fd585fcfce78090d8bbe2672806805600cde4d8bc142ec3%3B3.1%3B1682690042232%3B4a21f21f3b5dd7c0338578afd557db584a2d1619854d3e9c4d89d2beb1b1333d9f6d38da5567917561654a3437b4c71a",
    "headers": {
      "Host": "api.m.jd.com",
      "Referer": "https://servicewechat.com/wx91d27dbf599dff74/706/page-frame.html",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": lI111iI
    }
  };
}

function iiI1i1I() {
  return new Promise(lIlI1iiI => {
    const IIl1iI1 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": lI111iI,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(IIl1iI1, (l1li1i1i, li1l11, l1lilIIi) => {
      try {
        if (l1lilIIi) {
          l1lilIIi = JSON.parse(l1lilIIi);

          if (l1lilIIi.islogin === "1") {} else l1lilIIi.islogin === "0" && ($.isLogin = false);
        }
      } catch (I1IlII1l) {
        console.log(I1IlII1l);
      } finally {
        lIlI1iiI();
      }
    });
  });
}

function i11ii() {
  return new Promise(iIilIlIl => {
    !iii1Ilii ? $.msg($.name, "", "" + illiillI) : $.log("京东账号" + $.index + $.nickName + "\n" + illiillI);
    iIilIlIl();
  });
}

function lilI11ll(Il1Iil1l) {
  try {
    if (typeof JSON.parse(Il1Iil1l) == "object") return true;
  } catch (IIll1i1I) {
    return console.log(IIll1i1I), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function lIliIIli(i1lll1l) {
  const II1IllIi = function () {
    let liIIiii = true;
    return function (i1liIil1, Ili1Iiii) {
      const Ii1l1l1I = liIIiii ? function () {
        if (Ili1Iiii) {
          const II111l11 = Ili1Iiii.apply(i1liIil1, arguments);
          return Ili1Iiii = null, II111l11;
        }
      } : function () {};
      return liIIiii = false, Ii1l1l1I;
    };
  }(),
        iIli1ii = II1IllIi(this, function () {
    return iIli1ii.toString().search("(((.+)+)+)+$").toString().constructor(iIli1ii).search("(((.+)+)+)+$");
  });

  iIli1ii();
  if (typeof i1lll1l == "string") try {
    return JSON.parse(i1lll1l);
  } catch (l1ili1Ii) {
    return console.log(l1ili1Ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }