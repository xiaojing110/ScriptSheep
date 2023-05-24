/*
京东app抽现金
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，不知道多少助力满,变量CXJTOP='10'
多少助力换下一个，默认50个 ，可调整变量CXJNUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jdcxjhelp.js
updatetime:2023/5/23
 */

const $ = new Env('京东抽现金');
const IIlli1l = $.isNode() ? require("./sendNotify") : "",
      II1ll1lI = $.isNode() ? require("./jdCookie.js") : "",
      llllllI = require("./function/dylany"),
      Ili1lI1I = require("./USER_AGENTS");

let iiilIl11 = true,
    llIIliI = [],
    i1lIllI = [],
    lIII1il1 = "",
    ll1l1lll = "",
    llII1i1I = "",
    ii1l1IlI,
    iII1IlI1 = process.env.CXJNUM || "50",
    illi11i = process.env.CXJtop || "5";

if ($.isNode()) {
  Object.keys(II1ll1lI).forEach(IIll1Iil => {
    i1lIllI.push(II1ll1lI[IIll1Iil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1lIllI = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiliIiI1($.getdata("CookiesJD") || "[]").map(lIIlI1II => lIIlI1II.cookie)].filter(li111I1I => !!li111I1I);

!(async () => {
  if (!i1lIllI[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：1.0.0");
  console.log("执行流程，前" + illi11i + "CK车头--助力--抽奖--检查提现");
  console.log("问题建议：https://t.me/dylan_jdpro");
//   let l11i1l1 = await ilIllIlI();

  for (let lili1ilI = 0; lili1ilI < illi11i; lili1ilI++) {
    if (i1lIllI[lili1ilI]) {
      lIII1il1 = i1lIllI[lili1ilI];
      $.UserName = decodeURIComponent(lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/) && lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lili1ilI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = Ili1lI1I.UARAM ? Ili1lI1I.UARAM() : Ili1lI1I.USER_AGENT;
      await iIIi1l();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IIlli1l.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await illIIii(1);
      await $.wait(1000);
    }
  }

//   if (l11i1l1.length != 0) {
//     let IliiilIi = l11i1l1[Math.floor(Math.random() * l11i1l1.length)];
//     console.log("\nCk1去助力作者：");
//     lIII1il1 = i1lIllI[0];
//     $.UserName = decodeURIComponent(lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/) && lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
//     $.UA = Ili1lI1I.UARAM ? Ili1lI1I.UARAM() : Ili1lI1I.USER_AGENT;
//     await l1ill1ll(IliiilIi);
//     await $.wait(2000);
//   }

  console.log("\n\n开始内部助力：");
  ii1l1IlI = 1;

  for (let IIliI1I1 of llIIliI) {
    console.log("\n去助力-> " + IIliI1I1);
    $.suc = 0;
    $.alr = 0;
    $.nhp = 0;

    for (let liIlii1I = ii1l1IlI; liIlii1I < i1lIllI.length; liIlii1I++) {
      if (i1lIllI[liIlii1I]) {
        lIII1il1 = i1lIllI[liIlii1I];
        $.UserName = decodeURIComponent(lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/) && lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = liIlii1I + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = Ili1lI1I.UARAM ? Ili1lI1I.UARAM() : Ili1lI1I.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
        await l1ill1ll(IIliI1I1);

        if ($.suc > iII1IlI1 + 1) {
          ii1l1IlI = liIlii1I + 1;
          break;
        }

        await $.wait(2000);
      }
    }

    if ($.index === i1lIllI.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  console.log("\n\n开始抽奖和提现：");

  for (let l1lI1lil = 0; l1lI1lil < i1lIllI.length; l1lI1lil++) {
    if (i1lIllI[l1lI1lil]) {
      lIII1il1 = i1lIllI[l1lI1lil];
      $.UserName = decodeURIComponent(lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/) && lIII1il1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1lI1lil + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = 0;
      $.UA = Ili1lI1I.UARAM ? Ili1lI1I.UARAM() : Ili1lI1I.USER_AGENT;
      console.log("\n开始【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await illIIii(0);
      $.log("当前有" + $.times + "次抽奖机会！");

      for (let I1lliI1I = 0; I1lliI1I < $.times; I1lliI1I++) {
        $.log("开始第" + (I1lliI1I + 1) + "次抽奖:");
        await iIllIII();
        await $.wait(500);

        if ($.fail > 2) {
          $.log("连续3次优惠券，不继续抽了");
          return;
        }
      }

      for (let I1III1iI = 0; I1III1iI < 5; I1III1iI++) {
        await l1Iiliil(I1III1iI + 1);
        await $.wait(400);
        if ($.baglist.length === 0) break;

        for (let lIlIii1I of $.baglist) {
          lIlIii1I.prizeType == 4 && lIlIii1I.state == 0 && ($.log("\n开始提现 " + lIlIii1I.amount), await iIllIlll(lIlIii1I), await $.wait(5000));
        }
      }

      await $.wait(2000);
    }
  }
})().catch(I111i11I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + I111i11I + "!", "");
}).finally(() => {
  $.done();
});

async function illIIii(II1I111) {
  let iIl1Iill = "functionId=inviteFissionHome&body={\"linkId\":\"c6Bkpjp7dYcvQwO9-PR7-g\",\"inviter\":\"\"}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  return new Promise(async i1illi => {
    $.post(Iilli1l(iIl1Iill), async (lil1l11i, l1IlliIl, iIiIlI1i) => {
      try {
        if (lil1l11i) {
          console.log("" + JSON.stringify(lil1l11i));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iIiIlI1i = JSON.parse(iIiIlI1i);

          if (iIiIlI1i.code == 0) {
            $.times = iIiIlI1i.data.prizeNum;
            if (II1I111) console.log("助力码：" + iIiIlI1i.data.inviter);
            llIIliI.push(iIiIlI1i.data.inviter);
          } else console.log(iIiIlI1i.errMsg);
        }
      } catch (lIIi1IiI) {
        $.logErr(lIIi1IiI, l1IlliIl);
      } finally {
        i1illi(iIiIlI1i);
      }
    });
  });
}

async function iIllIII() {
  let I1llll1I = {
    "linkId": "c6Bkpjp7dYcvQwO9-PR7-g"
  },
      il11iI1l = {
    "appId": "c02c6",
    "fn": "inviteFissionDrawPrize",
    "body": I1llll1I,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  return I1llll1I = await llllllI.getbody(il11iI1l), new Promise(async il1iill1 => {
    $.post(Iilli1l(I1llll1I), async (iiII1Il, Illiii1l, iIlIl11) => {
      try {
        if (iiII1Il) {
          console.log("" + JSON.stringify(iiII1Il));
          console.log(" API请求失败，请检查网路重试");
        } else {
          iIlIl11 = JSON.parse(iIlIl11);

          if (iIlIl11.code == 0) {
            const I1lil1l1 = iIlIl11.data.prizeType;
            if (!I1lil1l1) fail++;

            switch (I1lil1l1) {
              case 1:
                console.log("----获得优惠券");
                $.fail++;
                break;

              case 4:
                console.log("----获得现金：" + iIlIl11.data.prizeValue);
                $.fail = 0;
                break;

              case 2:
                console.log("----获得红包：" + iIlIl11.data.prizeValue);
                $.fail = 0;
                break;

              default:
                console.log(JSON.stringify(iIlIl11.data));
            }
          } else {
            console.log(iIlIl11.errMsg);
          }
        }
      } catch (lli1il1i) {
        $.logErr(lli1il1i, Illiii1l);
      } finally {
        il1iill1(iIlIl11);
      }
    });
  });
}

async function l1Iiliil(l1I1l1Ii) {
  let ll1IlIli = "functionId=superRedBagList&body={\"linkId\":\"c6Bkpjp7dYcvQwO9-PR7-g\",\"pageNum\":" + l1I1l1Ii + ",\"pageSize\":10,\"business\":\"fission\"}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  return new Promise(async I1I1iii1 => {
    $.get(Iilli1l(ll1IlIli), async (IIiIl1I1, i1i1iii1, lliiiI) => {
      try {
        if (IIiIl1I1) {
          console.log("" + JSON.stringify(IIiIl1I1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          lliiiI = JSON.parse(lliiiI);
          lliiiI.code == 0 ? $.baglist = lliiiI.data.items : console.log(lliiiI.errMsg);
        }
      } catch (II1ll1Ii) {
        $.logErr(II1ll1Ii, i1i1iii1);
      } finally {
        I1I1iii1(lliiiI);
      }
    });
  });
}

async function l1ill1ll(l1I1iIi) {
  let llllIII = {
    "linkId": "c6Bkpjp7dYcvQwO9-PR7-g",
    "isJdApp": true,
    "inviter": l1I1iIi
  },
      I11iIiI = {
    "appId": "02f8d",
    "fn": "inviteFissionBeforeHome",
    "body": llllIII,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  return llllIII = await llllllI.getbody(I11iIiI), new Promise(async Ii1IIlII => {
    $.post(Iilli1l(llllIII), async (i1l1l1II, il1ili11, llIlIl1i) => {
      try {
        if (i1l1l1II) {
          console.log("" + JSON.stringify(i1l1l1II));
          console.log(" API请求失败，请检查网路重试");
        } else {
          llIlIl1i = JSON.parse(llIlIl1i);

          if (llIlIl1i.code == 0) {
            if (!llIlIl1i.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (llIlIl1i.data.helpResult == 1) {
              console.log("结果：助力成功！");
              $.suc++;
              $.alr = 0;
            } else {
              if (llIlIl1i.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
                $.alr++;
              } else {
                if (llIlIl1i.data.helpResult == 3) {
                  console.log("结果：没有次数了！");
                  $.nohelp = true;
                  $.nhp++;
                } else {
                  if (llIlIl1i.data.helpResult == 2) {
                    $.log("结果：助力黑了！");
                    $.hot = true;
                  } else llIlIl1i.data.helpResult == 4 ? ($.log("结果：没有助力次数！"), $.nhp++) : console.log(JSON.stringify(llIlIl1i));
                }
              }
            }
          } else {
            console.log(llIlIl1i.errMsg);
          }
        }
      } catch (iIiIIi11) {
        $.logErr(iIiIIi11, il1ili11);
      } finally {
        Ii1IIlII(llIlIl1i);
      }
    });
  });
}

async function iIllIlll(ii1l1ii) {
  let ii1ii1I = "functionId=apCashWithDraw&body={\"linkId\":\"c6Bkpjp7dYcvQwO9-PR7-g\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + ii1l1ii.id + ",\"business\":\"fission\",\"poolBaseId\":" + ii1l1ii.poolBaseId + ",\"prizeGroupId\":" + ii1l1ii.prizeGroupId + ",\"prizeBaseId\":" + ii1l1ii.prizeBaseId + ",\"prizeType\":" + ii1l1ii.prizeType + "}}&t=1680164158100&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  return new Promise(async liI1I111 => {
    $.post(Iilli1l(ii1ii1I), async (iil1illl, llIlIlil, lii1il1) => {
      try {
        iil1illl ? (console.log("" + JSON.stringify(iil1illl)), console.log(" API请求失败，请检查网路重试")) : (lii1il1 = JSON.parse(lii1il1), lii1il1.code == 0 ? lii1il1.data.message.indexOf("提现") > -1 ? console.log("----提现成功！") : console.log(lii1il1.data.message) : console.log(lii1il1.errMsg));
      } catch (Il1iiIiI) {
        $.logErr(Il1iiIiI, llIlIlil);
      } finally {
        liI1I111(lii1il1);
      }
    });
  });
}

function Iilli1l(i1llI11) {
  return {
    "url": "https://api.m.jd.com/?" + i1llI11,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://prodev.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": lIII1il1
    }
  };
}

function iIIi1l() {
  return new Promise(iiiii1il => {
    const Ii1Ii11I = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": lIII1il1,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Ii1Ii11I, (IIIll1l1, l1IllIlI, iIlII1li) => {
      try {
        if (iIlII1li) {
          iIlII1li = JSON.parse(iIlII1li);

          if (iIlII1li.islogin === "1") {} else iIlII1li.islogin === "0" && ($.isLogin = false);
        }
      } catch (llIIilI1) {
        console.log(llIIilI1);
      } finally {
        iiiii1il();
      }
    });
  });
}

function llili1li() {
  return new Promise(llIilIl => {
    !iiilIl11 ? $.msg($.name, "", "" + ll1l1lll) : $.log("京东账号" + $.index + $.nickName + "\n" + ll1l1lll);
    llIilIl();
  });
}

function illIiIIi(II1iiiiI) {
  try {
    if (typeof JSON.parse(II1iiiiI) == "object") return true;
  } catch (liI1i11) {
    return console.log(liI1i11), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function ilIllIlI() {
  let lIIlIii = {
    "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jdcxj",
    "timeout": 30000
  };
  return new Promise(I1il1II1 => {
    $.get(lIIlIii, async (iiilI1i, II11Ii1I, IlilIlIl) => {
      try {
        if (iiilI1i) {
          console.log("\n服务连接失败，终止执行！");
          process.exit(111);
        } else {
          if (IlilIlIl) {
            IlilIlIl = JSON.parse(IlilIlIl);
            if (IlilIlIl.code === 200) llII1i1I = IlilIlIl.data;else {}
          }
        }
      } catch (lliiI) {
        $.logErr(lliiI, II11Ii1I);
      } finally {
        I1il1II1(llII1i1I);
      }
    });
  });
}

function iiliIiI1(lilI11i1) {
  if (typeof lilI11i1 == "string") {
    try {
      return JSON.parse(lilI11i1);
    } catch (il1III) {
      return console.log(il1III), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }