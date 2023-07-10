/*
特物Z_超级品牌殿堂
cron:18 0,18 * * *
18 0,18 * * * jd_superBrandz.js

 */
const $ = new Env('特物Z_超级品牌殿堂');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
      notify = $.isNode() ? require("./sendNotify") : "";
let cookiesArr = [],
    cookie = "";

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ililII => {
    cookiesArr.push(jdCookieNode[ililII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(lI1II1 => lI1II1.cookie)].filter(i1ilII => !!i1ilII);

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }

  $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
  $.UUID = getUUID("xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx");

  for (let lill1l = 0; lill1l < cookiesArr.length; lill1l++) {
    cookie = cookiesArr[lill1l];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lill1l + 1;
      $.isLogin = true;
      $.nickName = "";
      $.beans = 0;
      message = "";
      UA = await getUa();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await superBrandSecondFloorMainPage();
      await $.wait(parseInt(Math.random() * 500 + 500, 10));
    }
  }
})().catch(i1iiI => $.logErr(i1iiI)).finally(() => $.done());

async function superBrandSecondFloorMainPage() {
  let llI11I = Date.now();
  body = "{\"source\":\"hall_1111\"}";
  let Il1i11 = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandSecondFloorMainPage&t=" + llI11I + "&body=" + encodeURIComponent(body),
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
  return new Promise(async I1llIl => {
    $.post(Il1i11, async (l1l1ii, Il1i1I, Ii1iii) => {
      try {
        if (l1l1ii) console.log(" API请求失败，请检查网路重试");else {
          let iili1 = JSON.parse(Ii1iii);

          if (iili1.data && iili1.code == "0") {
            let II11ii = iili1?.["data"]?.["bizCode"] || -1;

            if (II11ii == 0) {
              let Iil1iI = iili1?.["data"]?.["result"]?.["activityBaseInfo"];
              $.activityId = Iil1iI?.["activityId"];
              $.encryptProjectId = Iil1iI?.["encryptProjectId"];
              $.activityName = Iil1iI?.["activityName"];
              console.log($.activityName);
              await getid($.activityId);
            } else {
              let II11il = iili1?.["data"]?.["bizMsg"] || iili1?.["message"] || iili1?.["echo"] || "火爆";
              console.log("" + II11il);
              II11ii == "2001" && console.log("风控");
              II11il?.["includes"]("没有查询到活动信息") && console.log("没有查询到活动信息");
            }
          } else console.log("没有查询到活动信息");
        }
      } catch (I1il1I) {
        $.logErr(I1il1I, Il1i1I);
      } finally {
        I1llIl(Ii1iii);
      }
    });
  });
}

function getid(I11i11) {
  return new Promise(async lI1l11 => {
    const II11i = taskPostUrl("superBrandTaskList", "{\"source\":\"hall_1111\",\"activityId\":" + I11i11 + "}");
    $.post(II11i, async (ll1I1, Ii1ili, iI1Ii1) => {
      try {
        if (ll1I1) console.log($.name + " API请求失败，请检查网路重试");else {
          iI1Ii1 = JSON.parse(iI1Ii1);

          if (iI1Ii1.data && iI1Ii1.code === "0" && iI1Ii1.data.result) {
            $.result = iI1Ii1.data.result.taskList || [];

            for (const iiIi1I of $.result) {
              $.assignmentName = iiIi1I.assignmentName;
              $.assignmentType = iiIi1I.assignmentType;
              $.encryptAssignmentId = iiIi1I.encryptAssignmentId;
              console.log("去做任务" + $.assignmentName);
              await $.wait(parseInt(Math.random() * 500 + 500, 10));

              if ($.assignmentName == "浏览2场精彩在线活动") {
                $.conut = 2;
              }

              let IllIl1 = $.conut || 1;

              for (let ll1Il = 0; ll1Il < IllIl1; ll1Il++) {
                await doTask();
              }
            }
          } else lI1l11();
        }
      } catch (ill1II) {
        $.logErr(ill1II, Ii1ili);
      } finally {
        lI1l11();
      }
    });
  });
}

function doTask() {
  return new Promise(async IllIii => {
    let Ii1I11 = "{\"source\":\"hall_1111\",\"activityId\":" + $.activityId + ",\"encryptProjectId\":\"" + $.encryptProjectId + "\",\"completionFlag\":1,\"encryptAssignmentId\":\"" + $.encryptAssignmentId + "\",\"assignmentType\":" + $.assignmentType + ",\"actionType\":0}";
    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    const IllIli = taskPostUrls("superBrandDoTask", Ii1I11);
    $.post(IllIli, async (ii1Ii, ii1Il, l1iII) => {
      try {
        if (ii1Ii) console.log($.name + " API请求失败，请检查网路重试");else {
          l1iII = JSON.parse(l1iII);

          if (l1iII && l1iII.code === "0") {
            if (l1iII.data.bizCode === "0") {
              $.results = l1iII.data.result.rewards || [];

              for (const i1llll of $.results) {
                krtype = i1llll.awardType;
                if (i1llll.awardType == 2) console.log("获得：" + i1llll.awardName);else {
                  if (i1llll.awardType == 3) {
                    console.log("获得：️" + i1llll.beanNum + " 豆子");
                  } else {
                    if (i1llll.awardType == 6) console.log("获得：" + i1llll.awardName);else {
                      if (i1llll.awardType == 5) {
                        console.log("获得：" + i1llll.awardName);
                      } else {
                        console.log("不知道获得了啥");
                        console.log(l1iII);
                      }
                    }
                  }
                }
              }

              console.log("任务成功啦~");
            } else console.log(l1iII.data.bizMsg);

            IllIii(l1iII.data.bizCode);
          } else console.log(l1iII);
        }
      } catch (I1I1lI) {
        $.logErr(I1I1lI, ii1Il);
      } finally {
        IllIii();
      }
    });
  });
}

function taskPostUrls(l1lli1, IiiIi) {
  const l1iIl1 = Date.now();
  return {
    "url": "https://api.m.jd.com/api?client=wh5&functionId=" + l1lli1 + "&appid=ProductZ4Brand&t=" + l1iIl1 + "&body=" + encodeURIComponent(IiiIi),
    "body": "",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
}

function taskPostUrl(IIIii, iI111i) {
  const iI111l = Date.now();
  return {
    "url": "https://api.m.jd.com/?client=wh5&functionId=" + IIIii + "&appid=ProductZ4Brand&t=" + iI111l + "&body=" + encodeURIComponent(iI111i),
    "body": "",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "Cookie": cookie
    }
  };
}

function jsonParse(i1lIil) {
  if (typeof i1lIil == "string") {
    try {
      return JSON.parse(i1lIil);
    } catch (IiiII) {
      return console.log(IiiII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

async function getUa() {
  for (var Iiii = "", llIl11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", IIIll = 0; IIIll < 16; IIIll++) {
    var I1I1il = Math.round(Math.random() * (llIl11.length - 1));
    Iiii += llIl11.substring(I1I1il, I1I1il + 1);
  }

  return uuid = Buffer.from(Iiii, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "ud": uuid,
      "sv": "CJCkDq==",
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;11.4.4;;;M/5.0;appBuild/168500;jdSupportDarkMode/1;ef/1;ep/" + ep + ";;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}

function getAuthorCodeList(IiiI) {
  return new Promise(iIi1l => {
    const l1lliI = {
      "url": IiiI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1lliI, async (iiIiI1, ili1Il, ili1Ii) => {
      try {
        if (iiIiI1) $.log(iiIiI1);else {
          if (ili1Ii) ili1Ii = JSON.parse(ili1Ii);
        }
      } catch (ll11I) {
        $.logErr(ll11I, ili1Il);
        ili1Ii = null;
      } finally {
        iIi1l(ili1Ii);
      }
    });
  });
}

function getUUID(iIi1I = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", liIIl = 0) {
  return iIi1I.replace(/[xy]/g, function (i1lIll) {
    var liIlii = Math.random() * 16 | 0,
        llii1l = i1lIll == "x" ? liIlii : liIlii & 3 | 8;

    if (liIIl) {
      uuid = llii1l.toString(36).toUpperCase();
    } else uuid = llii1l.toString(36);

    return uuid;
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }