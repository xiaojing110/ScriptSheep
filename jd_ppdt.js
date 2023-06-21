/*
18 11,19 * * * jd_ppdt.js
 */

const $ = new Env('超级品牌殿堂');
const i1li1Il1 = $.isNode() ? require("./sendNotify") : "",
      liiIiiiI = $.isNode() ? require("./jdCookie.js") : "";
let IIi11I11 = true,
    l1I1111 = [],
    i1lI1lll = "",
    iliIlI = "";

if ($.isNode()) {
  Object.keys(liiIiiiI).forEach(Il1iIIl1 => {
    l1I1111.push(liiIiiiI[Il1iIIl1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1I1111 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1l1iIi1($.getdata("CookiesJD") || "[]").map(lIi11iil => lIi11iil.cookie)].filter(I1lI1IIl => !!I1lI1IIl);

!(async () => {
  if (!l1I1111[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let lIiiliIl = 0; lIiiliIl < l1I1111.length; lIiiliIl++) {
    if (l1I1111[lIiiliIl]) {
      i1lI1lll = l1I1111[lIiiliIl];
      $.UserName = decodeURIComponent(i1lI1lll.match(/pt_pin=([^; ]+)(?=;?)/) && i1lI1lll.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIiiliIl + 1;
      $.isLogin = true;
      $.nickName = "";
      $.ban = "";
      $.donep = "";
      $.UA = require("./USER_AGENTS").UARAM();
      await llliIl1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1li1Il1.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await li1IiIIl();
      let ilIliill = await Ii1i1i($.activityId);

      if (ilIliill) {
        console.log("" + ilIliill.activityName);
        $.pid = ilIliill.encryptProjectId;
        $.aid = ilIliill.activityId;
      } else {
        console.log("获取活动信息失败！！");
        continue;
      }

      await $.wait(500);
      await l1liI1II($.aid);
      await $.wait(500);

      for (let liiI1l1l of $.tasklist) {
        $.log("去做任务-> " + liiI1l1l.assignmentName);

        if (liiI1l1l.completionCnt) {
          $.log("任务已完成");
          continue;
        }

        let iiI1I1I1;

        for (let ll1iI1il = 0; ll1iI1il < liiI1l1l.assignmentTimesLimit; ll1iI1il++) {
          iiI1I1I1 = await lil1li1l(liiI1l1l.encryptAssignmentId);
          await $.wait(500);
        }

        iiI1I1I1.length ? iiI1I1I1[0].awardType === 3 ? console.log("----恭喜获得 " + iiI1I1I1[0].beanNum + " 京豆") : console.log(JSON.stringify(iiI1I1I1)) : $.log("----空气");
      }

      await $.wait(2000);
    }
  }
})().catch(iI1iI1i1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iI1iI1i1 + "!", "");
}).finally(() => {
  $.done();
});

async function Ii1i1i(lIliI1II) {
  let i1lliI1l = {
    "url": "https://api.m.jd.com/?client=wh5&appid=superbrand-main&functionId=superBrandHall1111Page&t=1681289234365&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A" + lIliI1II + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(async IiIllIIl => {
    let IilII1ii;
    $.post(i1lliI1l, async (i111Il1i, IIi1ilIi, l11iilil) => {
      try {
        i111Il1i ? (console.log("" + JSON.stringify(i111Il1i)), console.log(" API请求失败，请检查网路重试")) : (l11iilil = JSON.parse(l11iilil), l11iilil.code == 0 ? l11iilil.data.bizCode == 0 && (IilII1ii = l11iilil.data.result.activityBaseInfo || "") : console.log(JSON.stringify(l11iilil)));
      } catch (IIIliii1) {
        $.logErr(IIIliii1, IIi1ilIi);
      } finally {
        IiIllIIl(IilII1ii);
      }
    });
  });
}

async function l1liI1II(IliIilI) {
  let l11I1liI = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandTaskList&t=1681289234496&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + IliIilI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(async l1iiIliI => {
    $.post(l11I1liI, async (I1Ili1ii, ii11IiI, iIilIil1) => {
      try {
        if (I1Ili1ii) {
          console.log("" + JSON.stringify(I1Ili1ii));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iIilIil1 = JSON.parse(iIilIil1);

          if (iIilIil1.code == 0) {
            iIilIil1.data.bizCode == 0 ? $.tasklist = iIilIil1.data.result.taskList : console.log(iIilIil1.data.bizMsg);
          } else console.log(JSON.stringify(iIilIil1));
        }
      } catch (II1iiIiI) {
        $.logErr(II1iiIiI, ii11IiI);
      } finally {
        l1iiIliI(iIilIil1);
      }
    });
  });
}

async function lil1li1l(I11Ill) {
  let IIl1Il = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1681289234224&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + $.aid + ",%22completionFlag%22:1,%22encryptProjectId%22:%22" + $.pid + "%22,%22encryptAssignmentId%22:%22" + I11Ill + "%22,%22assignmentType%22:0,%22actionType%22:0%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/",
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  },
      i1ilI1li = "";
  return new Promise(async ill1111l => {
    $.post(IIl1Il, async (II1lll11, l111ll1i, Ii11I11l) => {
      try {
        if (II1lll11) {
          console.log("" + JSON.stringify(II1lll11));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii11I11l = JSON.parse(Ii11I11l);

          if (Ii11I11l.code == 0) {
            if (Ii11I11l.data.bizCode == 0) {
              i1ilI1li = Ii11I11l.data?.["result"]?.["rewards"];
            } else console.log(Ii11I11l.data.bizMsg);
          } else console.log(JSON.stringify(Ii11I11l));
        }
      } catch (l11I1i11) {
        $.logErr(l11I1i11, l111ll1i);
      } finally {
        ill1111l(i1ilI1li);
      }
    });
  });
}

function li1IiIIl() {
  let iIIi1ll = {
    "url": "https://prodev.m.jd.com/mall/active/rw8ewMzsDMevpVnuCJ7EgXS4PM9/index.html",
    "headers": {
      "User-Agent": $.UA,
      "Cookie": i1lI1lll
    }
  };
  return new Promise(II1liIil => {
    $.get(iIIi1ll, (iIliiiII, lliIII1, iilil1i1) => {
      try {
        iIliiiII ? $.log(JSON.stringify(iIliiiII)) : $.activityId = iilil1i1.match(/"cmsActivityId":"(\d+)"/)[1];
      } catch (ill1llIl) {
        $.log(JSON.stringify(ill1llIl));
      } finally {
        II1liIil();
      }
    });
  });
}

function llliIl1() {
  return new Promise(I11iIIl => {
    const li1I1I1i = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": i1lI1lll,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(li1I1I1i, (l1iI1iIi, illll1ll, lIlii111) => {
      try {
        if (lIlii111) {
          lIlii111 = JSON.parse(lIlii111);

          if (lIlii111.islogin === "1") {} else lIlii111.islogin === "0" && ($.isLogin = false);
        }
      } catch (iIlIiIIi) {
        console.log(iIlIiIIi);
      } finally {
        I11iIIl();
      }
    });
  });
}

function i1iiI11i() {
  return new Promise(IIli1IiI => {
    !IIi11I11 ? $.msg($.name, "", "" + iliIlI) : $.log("京东账号" + $.index + $.nickName + "\n" + iliIlI);
    IIli1IiI();
  });
}

function i1Iiil(iill1lIl) {
  try {
    if (typeof JSON.parse(iill1lIl) == "object") {
      return true;
    }
  } catch (iIIIlI1l) {
    return console.log(iIIIlI1l), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function l1l1iIi1(Ii1Ii11l) {
  if (typeof Ii1Ii11l == "string") try {
    return JSON.parse(Ii1Ii11l);
  } catch (li1liii) {
    return console.log(li1liii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }