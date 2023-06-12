/*
任务，抽奖
晚了没水
入口：https://pro.m.jd.com/mall/active/4BybhXN5cfWZfXktap24KHAV2tCv/index.html
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/6/12
 */
const $ = new Env('派对狂欢城');
const lIllIi11 = $.isNode() ? require("./sendNotify") : "",
      lIi1lIi1 = $.isNode() ? require("./jdCookie.js") : "",
      I1Ilii1i = require("./USER_AGENTS"),
      I1lilIl1 = require("crypto-js");

let ilIlIli = true,
    i1llllll = [],
    iiIIIlIl = "",
    iiiillI1 = "",
    Ii1iIiII = false,
    lil11lII = true;

if ($.isNode()) {
  Object.keys(lIi1lIi1).forEach(iIiIl1i => {
    i1llllll.push(lIi1lIi1[iIiIl1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1llllll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...il1iI1Il($.getdata("CookiesJD") || "[]").map(IIll11l1 => IIll11l1.cookie)].filter(IlIil1ii => !!IlIil1ii);

!(async () => {
  if (!i1llllll[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：V1.2.0 连续15次空气后只做任务不抽奖");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");

  for (let i1lIIiI = 0; i1lIIiI < i1llllll.length; i1lIIiI++) {
    if (i1llllll[i1lIIiI]) {
      iiIIIlIl = i1llllll[i1lIIiI];
      $.UserName = decodeURIComponent(iiIIIlIl.match(/pt_pin=([^; ]+)(?=;?)/) && iiIIIlIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i1lIIiI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.notimes = false;
      $.airnum = 0;
      $.UA = I1Ilii1i.UARAM ? I1Ilii1i.UARAM() : I1Ilii1i.USER_AGENT;
      await ilil1l();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lIllIi11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await i1iili1();
      await $.wait(200);
      await iIIill1i();
      await $.wait(200);
      await lliliIli();
      await $.wait(200);
      await iI1l1ilI();
      await $.wait(200);

      if ($.taskList) {
        $.log("去做任务...");

        for (let llii1l1 of $.taskList) {
          if (!!llii1l1.assignmentName && llii1l1.assignmentName !== "积分抽奖" && llii1l1.assignmentName.indexOf("抽奖奖池") == -1 && llii1l1.assignmentName.indexOf("加购") == -1 && llii1l1.assignmentName.indexOf("会员") == -1) {
            $.log("\n----" + llii1l1.assignmentName);

            if (llii1l1.completionFlag) {
              $.log("----已完成");
              continue;
            }

            if (llii1l1.ext.shoppingActivity || llii1l1.ext.followShop) {
              for (let l1liili1 = 0; l1liili1 < llii1l1.assignmentTimesLimit - llii1l1.completionCnt; l1liili1++) {
                await l1llilI(llii1l1.encryptAssignmentId, llii1l1.ext.shoppingActivity ? llii1l1.ext.shoppingActivity[l1liili1].itemId : llii1l1.ext.followShop[l1liili1].itemId);
                await $.wait(1000);
              }

              continue;
            }

            await l1llilI(llii1l1.encryptAssignmentId);
            await $.wait(500);
          }
        }
      }

      if (lil11lII) {
        $.log("\n\n元宝抽奖...");

        for (let I1Iillii of Array(50)) {
          if ($.notimes) break;

          if ($.airnum > 15) {
            $.log("\n\n连续15次无豆, 不抽奖只做任务！！！");
            lil11lII = false;
            break;
          }

          await lIiIIIi1();
          await $.wait(3000);
        }
      }

      await $.wait(5000);
    }
  }
})().catch(Ii11II1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Ii11II1I + "!", "");
}).finally(() => {
  $.done();
});

async function i1iili1() {
  return new Promise(async iI1il1lI => {
    $.post(il1I1lIl("arvrMeta2RoomSortListByTemplateId", {
      "templateId": "790088977"
    }), async (lli1lIlI, lIIllliI, iII1il1) => {
      try {
        if (lli1lIlI) {
          console.log("" + JSON.stringify(lli1lIlI));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii1iIiII && console.log(iII1il1);
          iII1il1 = JSON.parse(iII1il1);
          iII1il1.code == 0 ? $.roomId = iII1il1.data[0].roomId : console.log(iII1il1.msg);
        }
      } catch (IlIIIIi) {
        $.logErr(IlIIIIi, lIIllliI);
      } finally {
        iI1il1lI(iII1il1);
      }
    });
  });
}

async function iIIill1i() {
  return new Promise(async ll1I1l1I => {
    $.post(il1I1lIl("meta2LoginGame", {
      "channel": "1",
      "roomId": $.roomId
    }), async (liilIl1, lIli1I1l, Il11l1I) => {
      try {
        if (liilIl1) {
          console.log("" + JSON.stringify(liilIl1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii1iIiII && console.log(Il11l1I);
          Il11l1I = JSON.parse(Il11l1I);

          if (Il11l1I.code == 0) {} else console.log(Il11l1I.msg);
        }
      } catch (ii1li11i) {
        $.logErr(ii1li11i, lIli1I1l);
      } finally {
        ll1I1l1I(Il11l1I);
      }
    });
  });
}

async function lliliIli() {
  let I1lII1l1 = {
    "rewardType": 6,
    "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
    "appId": "app_440"
  };
  return I1lII1l1 = i1li(I1lII1l1), new Promise(async I1Ii1i1I => {
    $.post(il1I1lIl("arvr_getRequestToken", I1lII1l1), async (III1I11l, IiIllIil, iliii1ll) => {
      try {
        III1I11l ? (console.log("" + JSON.stringify(III1I11l)), console.log(" API请求失败，请检查网路重试")) : (Ii1iIiII && console.log(iliii1ll), iliii1ll = JSON.parse(iliii1ll), iliii1ll.code == 200 ? $.token = iliii1ll.data : console.log(iliii1ll.msg));
      } catch (IllI111) {
        $.logErr(IllI111, IiIllIil);
      } finally {
        I1Ii1i1I(iliii1ll);
      }
    });
  });
}

async function iI1l1ilI() {
  let Iill11Il = {
    "projectId": "1452563",
    "sourceCode": 2
  };
  return Iill11Il = i1li(Iill11Il), new Promise(async iIill11I => {
    $.post(il1I1lIl("arvr_queryInteractiveInfo", Iill11Il), async (llI11I1, ii1IlIi1, liIliI1l) => {
      try {
        llI11I1 ? (console.log("" + JSON.stringify(llI11I1)), console.log(" API请求失败，请检查网路重试")) : (Ii1iIiII && console.log(liIliI1l), liIliI1l = JSON.parse(liIliI1l), liIliI1l.subCode == 0 ? $.taskList = liIliI1l.assignmentList : console.log(liIliI1l.msg));
      } catch (ll1I11I) {
        $.logErr(ll1I11I, ii1IlIi1);
      } finally {
        iIill11I(liIliI1l);
      }
    });
  });
}

async function lIiIIIi1() {
  let liIIIiiI = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": "jBnYHuyBu5krJWNKCcPJEHzR5a7",
    "subTaskIdSecret": true,
    "exchangeNum": 1
  };
  return liIIIiiI = i1li(liIIIiiI), new Promise(async iI1IiII1 => {
    $.post(il1I1lIl("arvr_doInteractiveAssignment", liIIIiiI), async (Iii1iilI, IiiI11i1, i111ll1) => {
      try {
        if (Iii1iilI) {
          console.log("" + JSON.stringify(Iii1iilI));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii1iIiII && console.log(i111ll1);
          i111ll1 = JSON.parse(i111ll1);

          if (i111ll1.subCode == 0) {
            if (i111ll1.rewardsInfo.failRewards && i111ll1.rewardsInfo.failRewards.length != 0) {
              if (i111ll1.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                process.stdout.write("黑号，不继续抽了！");
                $.notimes = true;
                return;
              }
            }

            i111ll1.rewardsInfo.successRewards && JSON.stringify(i111ll1.rewardsInfo.successRewards) != "{}" ? (process.stdout.write(Object.values(i111ll1.rewardsInfo.successRewards)[0][0].rewardName + " "), Object.values(i111ll1.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write("空气 "), $.airnum++);
          } else {
            if (i111ll1.msg.includes("不足")) {
              console.log(i111ll1.msg);
              $.notimes = true;
            } else console.log(i111ll1.msg);
          }
        }
      } catch (iII1l1i) {
        $.logErr(iII1l1i, IiiI11i1);
      } finally {
        iI1IiII1(i111ll1);
      }
    });
  });
}

async function l1llilI(iI1iIl11, iil11li1) {
  let iIIiI1i1 = {
    "projectId": "1452563",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": iI1iIl11,
    "subTaskIdSecret": true,
    "itemId": iil11li1
  };
  if (!iil11li1) delete iIIiI1i1.itemId;
  return iIIiI1i1 = i1li(iIIiI1i1), new Promise(async I1ii1llI => {
    $.post(il1I1lIl("arvr_doInteractiveAssignment", iIIiI1i1), async (llIill1, illIiii, Ill11lii) => {
      try {
        if (llIill1) {
          console.log("" + JSON.stringify(llIill1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          Ii1iIiII && console.log(Ill11lii);
          Ill11lii = JSON.parse(Ill11lii);
          Ill11lii.subCode == 0 ? Ill11lii.rewardsInfo.successRewards && process.stdout.write("" + Ill11lii.rewardsInfo.successRewards[1].quantityDetails[0].quantity + Ill11lii.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ") : console.log(Ill11lii.msg);
        }
      } catch (lIli1il1) {
        $.logErr(lIli1il1, illIiii);
      } finally {
        I1ii1llI(Ill11lii);
      }
    });
  });
}

function il1I1lIl(l1l1iiI, il1IiiI1) {
  return {
    "url": "https://api.m.jd.com/api/" + l1l1iiI,
    "body": "appid=commonActivity&functionId=" + l1l1iiI + "&body=" + encodeURIComponent(JSON.stringify(il1IiiI1)) + "&t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": iiIIIlIl
    }
  };
}

function i1li(il11IIll) {
  let iIlIiIiI = "",
      lIiill = Object.keys(il11IIll).sort(function (ilIlIl1l, iilliiII) {
    return ilIlIl1l.localeCompare(iilliiII);
  });

  for (let lii1li1i of lIiill) {
    iIlIiIiI = iIlIiIiI.concat(il11IIll[lii1li1i]);
  }

  let IiIillIi = Date.now();
  r = "".concat("c4491f13dce9c71f").concat(iIlIiIiI).concat(IiIillIi);
  let ilIIIii = I1lilIl1.MD5(r).toString();
  return il11IIll.timestamp = IiIillIi, il11IIll.sign = ilIIIii, il11IIll.signKey = "c4491f13dce9c71f", il11IIll;
}

function ilil1l() {
  return new Promise(IiiI1Il1 => {
    const lliliI11 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": iiIIIlIl,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(lliliI11, (ll1lIll1, l1II1lli, IilIIl1l) => {
      try {
        if (IilIIl1l) {
          IilIIl1l = JSON.parse(IilIIl1l);

          if (IilIIl1l.islogin === "1") {} else IilIIl1l.islogin === "0" && ($.isLogin = false);
        }
      } catch (ll1li1lI) {
        console.log(ll1li1lI);
      } finally {
        IiiI1Il1();
      }
    });
  });
}

function li1ii11() {
  return new Promise(li111ii1 => {
    !ilIlIli ? $.msg($.name, "", "" + iiiillI1) : $.log("京东账号" + $.index + $.nickName + "\n" + iiiillI1);
    li111ii1();
  });
}

function i111iIil(ilI1IIIl) {
  try {
    if (typeof JSON.parse(ilI1IIIl) == "object") return true;
  } catch (l11ili1I) {
    return console.log(l11ili1I), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function il1iI1Il(iIIiiI11) {
  if (typeof iIIiiI11 == "string") {
    try {
      return JSON.parse(iIIiiI11);
    } catch (III11lii) {
      return console.log(III11lii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }