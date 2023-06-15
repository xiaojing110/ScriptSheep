/*
6.20 瓜分500万京豆

保底 1豆

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#6.20 瓜分500万京豆
11 11 11 11 * jd_gf.js, tag=6.20 瓜分500万京豆, enabled=true

*/

const $ = new Env('6.20 瓜分500万京豆');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
      notify = $.isNode() ? require("./sendNotify") : "",
      getToken = require("./function/krgetToken"),
      getH5st = require("./function/krh5st");

let domains = "https://lzdz1-isv.isvjcloud.com",
    krdraw = 0;
krdraw = $.isNode() ? process.env.krdraw ? process.env.krdraw : krdraw : $.getdata("krdraw") ? $.getdata("krdraw") : krdraw;
let opencard_draw = $.isNode() ? process.env.opencard_draw ? process.env.opencard_draw : "0" : $.getdata("opencard_draw") ? $.getdata("opencard_draw") : "0",
    lz_cookie = {},
    cookiesArr = [],
    cookie = "";

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(I1IIii => {
    cookiesArr.push(jdCookieNode[I1IIii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIIIlI => iIIIlI.cookie)].filter(li11i1 => !!li11i1);

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "",
    activityCookie = "",
    activityUrl = "https://lzdz1-isv.isvjd.com/m/1000001285/dz9f923270d7fd4d199e672f531813/";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }

  $.activityId = "dz9f923270d7fd4d199e672f531813";
  $.shareUuid = "";

  for (let I1iiII = 0; I1iiII < cookiesArr.length; I1iiII++) {
    cookie = cookiesArr[I1iiII];
    originCookie = cookiesArr[I1iiII];

    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = I1iiII + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }

  if ($.outFlag) {
    let liliIi = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + liliIi);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + liliIi);
  }

  if (allMessage) {
    $.msg($.name, "", "" + allMessage);
  }
})().catch(li11l1 => $.logErr(li11l1)).finally(() => $.done());

async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(cookie, domains);

    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }

    await getCk();

    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }

    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }

    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }

    await takePostRequest("getMyPing");

    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }

    await takePostRequest("accessLogWithAD");
    await takePostRequest("activityContent");
    await takePostRequest("drawContent");

    if ($.openCard == false) {
      console.log("去开通店铺会员");
      $.joinVenderId = 1000001285;
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(parseInt(Math.random() * 2000 + 3000, 10)), await joinShop());

      if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
        console.log("💔 无法开卡,跳过运行");
        return;
      }

      await takePostRequest("activityContent");
    }

    if ($.hotFlag) return;
    !$.taskBeansStatus && !$.outFlag && (await takePostRequest("visitSku"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));

    if (!$.skuFollowStatus && !$.outFlag) {
      await takePostRequest("followShop");
      await $.wait(parseInt(Math.random() * 1000 + 1200, 10));
    }

    !$.toShopStatus && !$.outFlag && (await takePostRequest("toShopStatus"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    !$.skuAddStatus && !$.outFlag && (await takePostRequest("addSku"), await $.wait(parseInt(Math.random() * 1000 + 1200, 10)));
    await takePostRequest("activityContent");
    await $.wait(parseInt(Math.random() * 1000 + 1200, 10));

    if (opencard_draw + "" !== "0") {
      $.runFalag = true;
      let I1I11l = parseInt($.score / 150);
      opencard_draw = parseInt(opencard_draw, 10);
      if (I1I11l > opencard_draw) I1I11l = opencard_draw;
      console.log("已设置抽奖次数为" + I1I11l + "次，当前有" + $.score + "积分");

      for (m = 1; I1I11l--; m++) {
        console.log("进行第" + m + "次抽奖");
        await takePostRequest("draw");
        if ($.runFalag == false) break;
        if (Number(I1I11l) <= 0) break;

        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }

        await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
      }
    }

    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (l1iI1l) {
    console.log(l1iI1l);
  }
}

async function takePostRequest(III1ll) {
  if ($.outFlag) return;
  let iII11I = "https://lzdz1-isv.isvjd.com",
      IiIii1 = "",
      l1lIIl = "POST";

  switch (III1ll) {
    case "getMyPing":
      url = iII11I + "/customer/getMyCidPing";
      IiIii1 = "token=" + $.Token + "&fromType=APP&userId=1000001285&pin=";
      break;

    case "getSimpleActInfoVo":
      url = iII11I + "/common/brand/getSimpleActInfoVo";
      IiIii1 = "activityId=" + $.activityId;
      break;

    case "accessLogWithAD":
      url = iII11I + "/common/accessLogWithAD";
      let l1ll1I = "https://lzdz1-isv.isvjd.com/m/1000001285/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      IiIii1 = "venderId=1000001285&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(l1ll1I);
      break;

    case "activityContent":
      url = iII11I + "/dingzhi/byhealth/expandBeans/activityContent";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;

    case "toShopStatus":
      url = iII11I + "/dingzhi/byhealth/expandBeans/saveTask";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000001285&shareUuid=" + $.shareUuid;
      break;

    case "addSku":
      url = iII11I + "/dingzhi/byhealth/expandBeans/saveTask";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=21&taskValue=21&shareUuid=" + $.shareUuid;
      break;

    case "followShop":
      url = iII11I + "/dingzhi/byhealth/expandBeans/saveTask";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=22&taskValue=22&shareUuid=" + $.shareUuid;
      break;

    case "visitSku":
      url = iII11I + "/dingzhi/byhealth/expandBeans/saveTask";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=18&taskValue=18&shareUuid=" + $.shareUuid;
      break;

    case "drawContent":
      url = iII11I + "/dingzhi/taskact/common/drawContent";
      IiIii1 = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;

    case "draw":
      url = iII11I + "/dingzhi/byhealth/expandBeans/draw";
      IiIii1 = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;

    default:
      console.log("错误" + III1ll);
  }

  let i1lIi = getPostRequest(url, IiIii1, l1lIIl);
  return new Promise(async i1lI1 => {
    $.post(i1lIi, (llIiii, IlII, IiIili) => {
      try {
        setActivityCookie(IlII);
        llIiii ? (IlII && typeof IlII.statusCode != "undefined" && IlII.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(llIiii, llIiii)), console.log(III1ll + " API请求失败，请检查网路重试")) : dealReturn(III1ll, IiIili);
      } catch (i111I) {
        console.log(i111I, IlII);
      } finally {
        i1lI1();
      }
    });
  });
}

async function dealReturn(l1II1, III1i1) {
  let I1IlIl = "";

  try {
    (l1II1 != "accessLogWithAD" || l1II1 != "drawContent") && III1i1 && (I1IlIl = JSON.parse(III1i1));
  } catch (iIIlI1) {
    console.log(l1II1 + " 执行任务异常");
    console.log(III1i1);
    $.runFalag = false;
  }

  try {
    switch (l1II1) {
      case "getMyPing":
        if (typeof I1IlIl == "object") {
          if (I1IlIl.result && I1IlIl.result === true) {
            if (I1IlIl.data && typeof I1IlIl.data.secretPin != "undefined") $.Pin = I1IlIl.data.secretPin;
            if (I1IlIl.data && typeof I1IlIl.data.nickname != "undefined") $.nickname = I1IlIl.data.nickname;
          } else I1IlIl.errorMessage ? console.log(l1II1 + " " + (I1IlIl.errorMessage || "")) : console.log(l1II1 + " " + III1i1);
        } else console.log(l1II1 + " " + III1i1);

        break;

      case "toShopStatus":
      case "visitSku":
      case "addSku":
      case "followShop":
        if (typeof I1IlIl == "object") {
          if (I1IlIl.result && I1IlIl.result === true) console.log("任务完成，积分：" + I1IlIl.data.addScore + "，京豆：" + I1IlIl.data.addBeansGift);else {
            if (I1IlIl.errorMessage) console.log("" + (I1IlIl.errorMessage || ""));else {
              console.log(" " + III1i1);
            }
          }
        } else console.log("" + III1i1);

        break;

      case "draw":
        if (typeof I1IlIl == "object") {
          if (I1IlIl.result && I1IlIl.result === true && I1IlIl.data.wdsrvo.drawOk) console.log("获得：" + (I1IlIl.data.wdsrvo.name || "") + " ");else I1IlIl.errorMessage ? console.log("" + (I1IlIl.errorMessage || "")) : console.log("空气");
        } else console.log(l1II1 + " " + III1i1);

        break;

      case "activityContent":
        if (typeof I1IlIl == "object") {
          if (I1IlIl.result && I1IlIl.result === true) {
            $.actorUuid = I1IlIl.data.actorUuid || "";
            $.openCard = I1IlIl.data.openCard || false;
            $.skuFollowStatus = I1IlIl.data.skuFollowStatus || false;
            $.skuAddStatus = I1IlIl.data.skuAddStatus || false;
            $.toShopStatus = I1IlIl.data.toShopStatus || false;
            $.taskBeansStatus = I1IlIl.data.taskBeansStatus || false;
            $.guafenStatus = I1IlIl.data.guafenStatus || false;
            $.score = I1IlIl.data.score2 || 0;
            $.assistStatus = I1IlIl.data.assistStatus || 0;
          } else {
            if (I1IlIl.errorMessage) {
              if (I1IlIl.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(l1II1 + " " + (I1IlIl.errorMessage || ""));
            } else console.log(l1II1 + " " + III1i1);
          }
        } else console.log(l1II1 + " " + III1i1);

        break;

      case "accessLogWithAD":
      case "drawContent":
      case "getQuestion":
        break;

      default:
        console.log(l1II1 + "-> " + III1i1);
    }

    typeof I1IlIl == "object" && I1IlIl.errorMessage && I1IlIl.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (iIIlII) {
    console.log(iIIlII);
  }
}

function getPostRequest(IlIi1l, IiIiiI, IlIi1i = "POST") {
  let l1il1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return IlIi1l.indexOf("https://lzdz1-isv.isvjd.com") > -1 && (l1il1.Referer = activityUrl, l1il1.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": IlIi1l,
    "method": IlIi1i,
    "headers": l1il1,
    "body": IiIiiI,
    "timeout": 30000
  };
}

function getSimpleActInfoVo() {
  return new Promise(li1lll => {
    let illIIi = {
      "url": "https://lzdz1-isv.isvjd.com/common/brand/getSimpleActInfoVo?activityId=dz77972988470a953aadc7fb8d1703",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(illIIi, async (iiIi, iiIl, Iil1I) => {
      try {
        if (iiIi) {
          iiIl && typeof iiIl.statusCode != "undefined" && iiIl.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(iiIi));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iiiIlI = $.toObj(Iil1I, Iil1I);

          if (typeof iiiIlI == "object") {
            if (iiiIlI.result && iiiIlI.result === true) {
              $.endTime = iiiIlI.data.endTime || 0;
              $.startTimes = iiiIlI.data.startTime || Date.now();
            } else {
              if (iiiIlI.errorMessage) console.log("" + (iiiIlI.errorMessage || ""));else {
                console.log("" + Iil1I);
              }
            }
          } else console.log("" + Iil1I);
        }
      } catch (Ill1il) {
        $.logErr(Ill1il, iiIl);
      } finally {
        li1lll();
      }
    });
  });
}

function getCk() {
  return new Promise(lilll => {
    let lilli = {
      "url": "https://lzdz1-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(lilli, async (Ill1iI, i1Ii1l, IIll) => {
      try {
        if (Ill1iI) {
          i1Ii1l && typeof i1Ii1l.statusCode != "undefined" && i1Ii1l.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(Ill1iI));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let iiiIll = IIll.match(/(活动已经结束)/) && IIll.match(/(活动已经结束)/)[1] || "";
          iiiIll && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(i1Ii1l);
        }
      } catch (iII1i) {
        $.logErr(iII1i, i1Ii1l);
      } finally {
        lilll();
      }
    });
  });
}

function setActivityCookie(ilI1ii) {
  if (ilI1ii) {
    if (ilI1ii.headers["set-cookie"]) {
      cookie = originCookie + ";";

      for (let IllIi of ilI1ii.headers["set-cookie"]) {
        lz_cookie[IllIi.split(";")[0].substr(0, IllIi.split(";")[0].indexOf("="))] = IllIi.split(";")[0].substr(IllIi.split(";")[0].indexOf("=") + 1);
      }

      for (const l1iI11 of Object.keys(lz_cookie)) {
        cookie += l1iI11 + "=" + lz_cookie[l1iI11] + ";";
      }

      activityCookie = cookie;
    }
  }
}

async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function randomString(i11I1) {
  i11I1 = i11I1 || 32;
  let l1iI1I = "abcdef0123456789",
      ilI1i1 = l1iI1I.length,
      l1I1I = "";

  for (i = 0; i < i11I1; i++) l1I1I += l1iI1I.charAt(Math.floor(Math.random() * ilI1i1));

  return l1I1I;
}

async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i1i1l1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIil1i = "";
    if ($.shopactivityId) IIil1i = ",\"activityId\":" + $.shopactivityId;
    const IlIl1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIil1i + ",\"channel\":406}",
          II1i1I = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(IlIl1)
    },
          iIliI1 = await getH5st("8adfb", II1i1I),
          iIii11 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IlIl1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIliI1),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(iIii11, async (i11l1i, iI11l1, IlIii) => {
      try {
        if (i11l1i) iI11l1 && typeof iI11l1.statusCode != "undefined" && iI11l1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          IlIii = IlIii && IlIii.match(/jsonp_.*?\((.*?)\);/) && IlIii.match(/jsonp_.*?\((.*?)\);/)[1] || IlIii;
          let iIii1I = $.toObj(IlIii, IlIii);

          if (iIii1I && typeof iIii1I == "object") {
            if (iIii1I && iIii1I.success === true) {
              console.log(" >> " + iIii1I.message);
              $.errorJoinShop = iIii1I.message;

              if (iIii1I.result && iIii1I.result.giftInfo) {
                for (let I1ii11 of iIii1I.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + I1ii11.discountString + I1ii11.prizeName + I1ii11.secondLineDesc);
                }
              }
            } else iIii1I && typeof iIii1I == "object" && iIii1I.message ? ($.errorJoinShop = iIii1I.message, console.log("" + (iIii1I.message || ""))) : console.log(IlIii);
          } else console.log(IlIii);
        }
      } catch (iI11i1) {
        $.logErr(iI11i1, iI11l1);
      } finally {
        i1i1l1();
      }
    });
  });
}

async function getshopactivityId() {
  return new Promise(async IlIll => {
    const IIil11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
          iI11iI = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(IIil11)
    },
          l1IliI = await getH5st("8adfb", iI11iI),
          liIIIi = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIil11 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1IliI),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(liIIIi, async (iIilI, liii, iliilI) => {
      try {
        if (iIilI) {
          liii && typeof liii.statusCode != "undefined" && liii.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          iliilI = iliilI && iliilI.match(/jsonp_.*?\((.*?)\);/) && iliilI.match(/jsonp_.*?\((.*?)\);/)[1] || iliilI;
          let II1i1i = $.toObj(iliilI, iliilI);
          II1i1i && typeof II1i1i == "object" ? II1i1i && II1i1i.success == true && (console.log("去加入：" + (II1i1i.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")"), $.shopactivityId = II1i1i.result.interestsRuleList && II1i1i.result.interestsRuleList[0] && II1i1i.result.interestsRuleList[0].interestsInfo && II1i1i.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(iliilI);
        }
      } catch (lIi1Ii) {
        $.logErr(lIi1Ii, liii);
      } finally {
        IlIll();
      }
    });
  });
}

function getMaxMin(IIiIII, lili) {
  if (lili === "max") return Math.max.apply(Math, IIiIII);else {
    if (lili === "min") {
      return Math.min.apply(Math, IIiIII);
    }
  }
}

function getAuthorCodeList(Ill1lI) {
  return new Promise(ii1iII => {
    const liIl11 = {
      "url": Ill1lI + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(liIl11, async (i11IIi, Il1ii1, illII1) => {
      try {
        if (i11IIi) $.getAuthorCodeListerr = false;else {
          if (illII1) illII1 = JSON.parse(illII1);
          $.getAuthorCodeListerr = true;
        }
      } catch (Il1iii) {
        $.logErr(Il1iii, Il1ii1);
        illII1 = null;
      } finally {
        ii1iII(illII1);
      }
    });
  });
}

function random(iIiii, IIiIIl) {
  return Math.floor(Math.random() * (IIiIIl - iIiii)) + iIiii;
}

function jsonParse(l1Ill1) {
  if (typeof l1Ill1 == "string") {
    try {
      return JSON.parse(l1Ill1);
    } catch (illIII) {
      return console.log(illIII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

