/*
京喜特价抽现金
入口：特价版app-百元生活费-赚金币-邀请抽奖
执行流程，前5ck输出助力码--助力--抽奖--检查提现
前5个ck做车头，ck1助力作者， 变量JXCXJTOP='10'
多少助力换下一个，默认50个，不知道多少助力满, ，可调整变量JXCXJNUM='100';
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_cxjhelp.js
updatetime:2023/6/20 fix
 */

const $ = new Env('JX特价抽现金');
const IililIll = $.isNode() ? require("./sendNotify") : "",
      IliII1Il = $.isNode() ? require("./jdCookie.js") : "",
      iII1Ill = require("./USER_AGENTS");

let IiI1iIli = true,
    i1IlIl1 = [],
    ii1iIiii = [],
    iiIli1 = [],
    iii1i1Il = [],
    llII11ii = [],
    IiI1i1il = "",
    lI1IiiiI = "",
    iIIIi1 = "",
    iI1iiii,
    iiI1II1I = process.env.JXCXJNUM || "50",
    IilII11 = process.env.JXCXJTOP || "5";

if ($.isNode()) {
  Object.keys(IliII1Il).forEach(i1l1i => {
    llII11ii.push(IliII1Il[i1l1i]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else llII11ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ii1i1Iil($.getdata("CookiesJD") || "[]").map(llI1Ill1 => llI1Ill1.cookie)].filter(i1lIi1i1 => !!i1lIi1i1);

!(async () => {
  if (!llII11ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：3.3.1 优化输出");
  console.log("执行流程，前" + IilII11 + "CK车头--助力--抽奖--检查提现");
  console.log("问题建议：https://t.me/dylan_jdpro");
  let iIil1IlI = [];

  for (let lIIilIil = 0; lIIilIil < IilII11; lIIilIil++) {
    if (llII11ii[lIIilIil]) {
      IiI1i1il = llII11ii[lIIilIil];
      $.UserName = decodeURIComponent(IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/) && IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIIilIil + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = iII1Ill.UARAM ? iII1Ill.UARAM(1) : iII1Ill.USER_AGENT;
      await l11II();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IililIll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await Il1lIiI1(1);
      await $.wait(1000);
    }
  }

//   if (iIil1IlI.length != 0) {
//     let IlilIlII = iIil1IlI[Math.floor(Math.random() * iIil1IlI.length)];
//     console.log("\nCK1去助力作者：");
//     IiI1i1il = llII11ii[0];
//     $.UserName = decodeURIComponent(IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/) && IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
//     $.UA = iII1Ill.UARAM ? iII1Ill.UARAM(1) : iII1Ill.USER_AGENT;
//     await l1IlI1Il(IlilIlII);
//     await $.wait(2000);
//   }

  console.log("\n\n开始内部助力...");
  iI1iiii = 1;

  for (let Il11i of i1IlIl1) {
    console.log("\n去助力-> " + Il11i);
    $.suc = 0;
    $.alr = 0;
    $.nhp = 0;

    for (let lII1illI = iI1iiii; lII1illI < llII11ii.length; lII1illI++) {
      if (llII11ii[lII1illI]) {
        IiI1i1il = llII11ii[lII1illI];
        $.UserName = decodeURIComponent(IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/) && IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = lII1illI + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = iII1Ill.UARAM ? iII1Ill.UARAM(1) : iII1Ill.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await l1IlI1Il(Il11i);

        if ($.suc > Number(iiI1II1I) + 1) {
          $.log("已达目标助力数，跳出！");
          iI1iiii = lII1illI + 1;
          break;
        }

        await $.wait(1000);
      }
    }

    if ($.index === llII11ii.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  console.log("\n\n开始抽奖和提现...");

  for (let l1llllll = 0; l1llllll < llII11ii.length; l1llllll++) {
    if (llII11ii[l1llllll]) {
      IiI1i1il = llII11ii[l1llllll];
      $.UserName = decodeURIComponent(IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/) && IiI1i1il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1llllll + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = 0;
      ii1iIiii = [];
      iiIli1 = [];
      $.txj = true;
      $.UA = iII1Ill.UARAM ? iII1Ill.UARAM(1) : iII1Ill.USER_AGENT;
      console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");
      let lii11lli = await Il1lIiI1(0);
      $.log("本轮已抽奖次数：" + lii11lli.data.drawPrizeNum);
      $.log("当前剩余抽奖次数：" + $.times);
      $.log("本轮结束时间： " + new Date(Date.now() + lii11lli.data.countDownTime).toLocaleString() + "\n");

      for (let iIiilI11 = 0; iIiilI11 < $.times; iIiilI11++) {
        $.log("开始第" + (iIiilI11 + 1) + "次抽奖:");
        await lli11l11();
        await $.wait(1000);

        if ($.fail > 2) {
          $.log("连续3次优惠券，不继续抽了");
          break;
        }
      }

      iiIli1.length !== 0 && $.log("\n本次抽奖获得红包总计：" + iiIli1.reduce((IiiiIII, lilIilIl) => IiiiIII + lilIilIl * 100, 0) / 100 + "元");
      ii1iIiii.length !== 0 && $.log("\n本次抽奖获得现金总计：" + ii1iIiii.reduce((liiI1ii1, liI1l1i) => liiI1ii1 + liI1l1i * 100, 0) / 100 + "元");
      if (iii1i1Il.length) $.log("\n开始提现(仅对本次抽奖所得现金)...");

      for (let i1lliIii of iii1i1Il) {
        process.stdout.write("" + i1lliIii.prizeValue);
        await illlIii(i1lliIii);
        await $.wait(5000);
      }

      iii1i1Il = [];
      await $.wait(2000);
    }
  }
})().catch(iI1lili => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iI1lili + "!", "");
}).finally(() => {
  $.done();
});

async function Il1lIiI1(l11i1111) {
  let il1i1ii = "functionId=inviteFissionHome&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"inviter\":\"\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  return new Promise(async Il1llIil => {
    $.post(iill1ill(il1i1ii), async (IIIil, i1l1iIii, IIil1iIi) => {
      try {
        if (IIIil) {
          console.log("" + JSON.stringify(IIIil));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          IIil1iIi = JSON.parse(IIil1iIi);

          if (IIil1iIi.code == 0) {
            $.times = IIil1iIi.data.prizeNum;
            if (l11i1111) console.log("助力码：" + IIil1iIi.data.inviter);
            i1IlIl1.push(IIil1iIi.data.inviter);
          } else console.log(IIil1iIi.errMsg);
        }
      } catch (l1lIiII1) {
        $.logErr(l1lIiII1, i1l1iIii);
      } finally {
        Il1llIil(IIil1iIi);
      }
    });
  });
}

async function iiiIi1() {
  let lI1Ili1l = {
    "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
  },
      i1iiiil1 = {
    "appId": "b8469",
    "fn": "inviteFissionReceive",
    "body": lI1Ili1l,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  lI1Ili1l = await i1liii11(i1iiiil1) //: "functionId=inviteFissionReceive&body=" + lI1Ili1l + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();
  if (!lI1Ili1l) return;
  return new Promise(async iil1liii => {
    $.post(iill1ill(lI1Ili1l), async (Iii1Ii1, I11llIl, IiiIiliI) => {
      try {
        Iii1Ii1 ? (console.log("" + JSON.stringify(Iii1Ii1)), console.log("receive请求失败，请检查网路重试")) : (IiiIiliI = JSON.parse(IiiIiliI), IiiIiliI.code == 0 ? $.log("------提现金：" + IiiIiliI.data.amount) : $.txj = false);
      } catch (illllI11) {
        $.logErr(illllI11, I11llIl);
      } finally {
        iil1liii(IiiIiliI);
      }
    });
  });
}

async function lli11l11() {
  let IiIlI1II = {
    "linkId": "Wvzc_VpNTlSkiQdHT8r7QA"
  },
      Il1i1I1l = {
    "appId": "c02c6",
    "fn": "inviteFissionDrawPrize",
    "body": IiIlI1II,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  IiIlI1II =  await i1liii11(Il1i1I1l) //: "functionId=inviteFissionDrawPrize&body=" + IiIlI1II + "&appid=activities_platform&client=ios&clientVersion=5.5.3&t=" + Date.now();
  if (!IiIlI1II) return;
  return new Promise(async IlII11I => {
    $.post(iill1ill(IiIlI1II), async (l1Ili1Il, Iii1iili, i1il1lIi) => {
      try {
        if (l1Ili1Il) {
          console.log("" + JSON.stringify(l1Ili1Il));
          console.log("lottery请求失败，请检查网路重试");
        } else {
          i1il1lIi = JSON.parse(i1il1lIi);

          if (i1il1lIi.code == 0) {
            const lIIiIlI = i1il1lIi.data.prizeType;
            if (!lIIiIlI) fail++;

            switch (lIIiIlI) {
              case 1:
                console.log("----获得：垃圾卷 😤");
                $.fail++;
                break;

              case 4:
                let Ii1iIlil = parseFloat(i1il1lIi.data.prizeValue).toFixed(2);
                console.log("----获得现金：" + Ii1iIlil + " 💴");
                ii1iIiii.push(Ii1iIlil);
                iii1i1Il.push({
                  "prizeValue": i1il1lIi.data.prizeValue,
                  "id": i1il1lIi.data.id,
                  "poolBaseId": i1il1lIi.data.poolBaseId,
                  "prizeGroupId": i1il1lIi.data.prizeGroupId,
                  "prizeBaseId": i1il1lIi.data.prizeBaseId
                });
                $.fail = 0;
                break;

              case 2:
                let IIi1lii1 = parseFloat(i1il1lIi.data.prizeValue).toFixed(2);
                console.log("----获得红包：" + IIi1lii1 + " 🧧");
                iiIli1.push(IIi1lii1);
                $.fail = 0;
                break;

              default:
                console.log(JSON.stringify(i1il1lIi.data));
            }
          } else console.log(i1il1lIi.errMsg);
        }
      } catch (IiII1iil) {
        $.logErr(IiII1iil, Iii1iili);
      } finally {
        IlII11I(i1il1lIi);
      }
    });
  });
}

async function IliI1iii(IilIIlI1) {
  let l1I1lI1i = {
    "pageNum": IilIIlI1,
    "pageSize": 20,
    "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
    "business": "fission"
  },
      II1I11II = {
    "appId": "f2b1d",
    "fn": "superRedBagList",
    "body": l1I1lI1i,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  l1I1lI1i = await i1liii11(II1I11II) //: "functionId=superRedBagList&body=" + l1I1lI1i + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2] + "&t=" + Date.now();
  if (!l1I1lI1i) return;
  return new Promise(async lIIIiI1i => {
    $.get(iill1ill(l1I1lI1i), async (ilIiliIi, l1llilil, lilIillI) => {
      try {
        ilIiliIi ? (console.log("" + JSON.stringify(ilIiliIi)), console.log(" API请求失败，请检查网路重试")) : (lilIillI = JSON.parse(lilIillI), lilIillI.code == 0 ? $.baglist = lilIillI.data.items : console.log(lilIillI.errMsg));
      } catch (IlII1iI1) {
        $.logErr(IlII1iI1, l1llilil);
      } finally {
        lIIIiI1i(lilIillI);
      }
    });
  });
}

async function l1IlI1Il(iI1Ii1) {
  let I1IilI11 = {
    "linkId": "Wvzc_VpNTlSkiQdHT8r7QA",
    "isJdApp": true,
    "inviter": iI1Ii1
  },
      IIllll = {
    "appId": "02f8d",
    "fn": "inviteFissionBeforeHome",
    "body": I1IilI11,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  I1IilI11 = await i1liii11(IIllll)//: "functionId=inviteFissionBeforeHome&body=" + I1IilI11 + "&appid=activities_platform&client=ios&clientVersion=5.5.3&t=" + Date.now();
  if (!I1IilI11) return;
  return new Promise(async lI11111i => {
    $.post(iill1ill(I1IilI11), async (Il1I, Iil1iii, lI11ll) => {
      try {
        if (Il1I) {
          console.log("" + JSON.stringify(Il1I));
          console.log("help请求失败，请检查网路重试");
        } else {
          lI11ll = JSON.parse(lI11ll);

          if (lI11ll.code == 0) {
            if (!lI11ll.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (lI11ll.data.helpResult == 1) {
              $.suc++;
              $.alr = 0;
              console.log("结果：助力成功 ✅ " + ($.suc || ""));
            } else {
              if (lI11ll.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
                $.alr++;
              } else {
                if (lI11ll.data.helpResult == 3) {
                  console.log("结果：没有次数了！");
                  $.nohelp = true;
                  $.nhp++;
                } else {
                  if (lI11ll.data.helpResult == 2) {
                    $.log("结果：助力黑了 💣");
                    $.hot = true;
                  } else {
                    if (lI11ll.data.helpResult == 4) {
                      $.log("结果：没有助力次数！");
                      $.nhp++;
                    } else lI11ll.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log(JSON.stringify(lI11ll));
                  }
                }
              }
            }
          } else console.log(lI11ll.errMsg);
        }
      } catch (iiiiliiI) {
        $.logErr(iiiiliiI, Iil1iii);
      } finally {
        lI11111i(lI11ll);
      }
    });
  });
}

async function illlIii(IiIIli) {
  let lIl1liiI = "functionId=apCashWithDraw&body={\"linkId\":\"Wvzc_VpNTlSkiQdHT8r7QA\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + IiIIli.id + ",\"business\":\"fission\",\"poolBaseId\":" + IiIIli.poolBaseId + ",\"prizeGroupId\":" + IiIIli.prizeGroupId + ",\"prizeBaseId\":" + IiIIli.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];
  return new Promise(async iliiI1I1 => {
    $.post(iill1ill(lIl1liiI), async (lii1liil, lIilIIl, l1lI1lIi) => {
      try {
        if (lii1liil) {
          console.log("" + JSON.stringify(lii1liil));
          console.log("apCashWithDraw请求失败，请检查网路重试");
        } else {
          l1lI1lIi = JSON.parse(l1lI1lIi);

          if (l1lI1lIi.code == 0) {
            l1lI1lIi.data.message.indexOf("提现") > -1 ? process.stdout.write("✅ ") : console.log(l1lI1lIi.data.message);
          } else {
            console.log(l1lI1lIi.errMsg);
          }
        }
      } catch (I1iIilii) {
        $.logErr(I1iIilii, lIilIIl);
      } finally {
        iliiI1I1(l1lI1lIi);
      }
    });
  });
}

function iill1ill(iIlI1I1) {
  return {
    "url": "https://api.m.jd.com/?" + iIlI1I1,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://prodev.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": IiI1i1il
    }
  };
}

function l11II() {
  return new Promise(IIlI1i1 => {
    const IIIIIilI = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": IiI1i1il,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(IIIIIilI, (IliiIIIi, IIII1Il, lIIiiI1i) => {
      try {
        if (lIIiiI1i) {
          lIIiiI1i = JSON.parse(lIIiiI1i);

          if (lIIiiI1i.islogin === "1") {} else {
            if (lIIiiI1i.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (Ii1llli) {
        console.log(Ii1llli);
      } finally {
        IIlI1i1();
      }
    });
  });
}

function l1iii1i1() {
  return new Promise(llIliI1l => {
    !IiI1iIli ? $.msg($.name, "", "" + lI1IiiiI) : $.log("京东账号" + $.index + $.nickName + "\n" + lI1IiiiI);
    llIliI1l();
  });
}

function IIlii(li1IliII) {
  try {
    if (typeof JSON.parse(li1IliII) == "object") {
      return true;
    }
  } catch (lliiIIii) {
    return console.log(lliiIIii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function iI11lilI() {
  let IlliIIll = {
    "url": "https://src-dy-server-dmujhfwxmu.cn-hangzhou.fcapp.run/jxcxj",
    "timeout": 30000
  };
  return new Promise(IIil1i11 => {
    $.get(IlliIIll, async (l11Iilll, iilIIIli, li1IlliI) => {
      try {
        if (l11Iilll) {
          console.log("\n服务连接失败，终止执行！");
          process.exit(111);
        } else {
          if (li1IlliI) {
            li1IlliI = JSON.parse(li1IlliI);
            if (li1IlliI.code === 200) iIIIi1 = li1IlliI.data;else {}
          }
        }
      } catch (l1i1Ili1) {
        $.logErr(l1i1Ili1, iilIIIli);
      } finally {
        IIil1i11(iIIIi1);
      }
    });
  });
}

function ii1i1Iil(lll1i11I) {
  if (typeof lll1i11I == "string") try {
    return JSON.parse(lll1i11I);
  } catch (Iii11i) {
    return console.log(Iii11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function i1liii11(iiiiilI1) {
  let lI1l1I11 = {
    "url": "http://123.57.164.4:8080/cxj",
    "body": JSON.stringify(iiiiilI1),
    "headers": {
      "Content-Type": "application/json"
    },
    "timeout": 10000
  },
      I1Ii1liI = "";
  return new Promise(illllII => {
    $.post(lI1l1I11, (liIllii1, l1Ii1lIi, IilIiIlI) => {
      try {
        liIllii1 ? console.log("连接失败") : (IilIiIlI = JSON.parse(IilIiIlI), IilIiIlI.code == 200 ? I1Ii1liI = IilIiIlI.data : $.log(IilIiIlI.msg));
      } catch (I1lilllI) {
        console.log(I1lilllI, l1Ii1lIi);
      } finally {
        illllII(I1Ii1liI);
      }
    });
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }