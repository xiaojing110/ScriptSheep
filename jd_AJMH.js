/*
安佳做任务开盲盒，赢好礼

变量：jd_AJMH_id // 活动id   7月id：export jd_AJMH_id="dz61340bc3efcd43e2b986c8be"

做任务，邀请，抽奖


请求太频繁会被黑ip
过10分钟再执行

cron:11 11 11 11 *
============Quantumultx===============
[task_local]
#安佳做任务开盲盒，赢好礼
11 11 11 11 * jd_AJMH.js, tag=安佳做任务开盲盒，赢好礼, enabled=true

*/

const $ = new Env('安佳做任务开盲盒，赢好礼')
const IIll1I = $.isNode() ? require("./jdCookie.js") : "",
      liii1I = $.isNode() ? require("./sendNotify") : "",
      lI1iIi = require("./function/krgetToken");

let iIIIii = "https://lzdz1-isv.isvjcloud.com",
    li11ii = process.env.jd_AJMH_id ? process.env.jd_AJMH_id : "",
    I1iiIi = [],
    li1i1 = "";

if ($.isNode()) {
  Object.keys(IIll1I).forEach(l1I1lI => {
    I1iiIi.push(IIll1I[l1I1lI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1iiIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIll1l($.getdata("CookiesJD") || "[]").map(iIIIl1 => iIIIl1.cookie)].filter(li11iI => !!li11iI);

allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let I1iiIl = "",
    liliII = "",
    lI1iIl = {};
!(async () => {
  if (!li11ii) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }

  if (!I1iiIi[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }

  $.activityId = li11ii;
  console.log("每期活动自行去 安佳 店铺查看，有水无水自测");
  console.log("变量：export jd_AJMH_id=\"活动ID\"");
  console.log("入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId);
  console.log("\n规则:\n1.每天完成任务共计：50积分。\n2.邀请一名好友50积分，不上限。\n3.每300积分可以开盲盒一次，每天限制开三次，每天限制中奖一次。");

  for (let Ii1lIi = 0; Ii1lIi < I1iiIi.length; Ii1lIi++) {
    li1i1 = I1iiIi[Ii1lIi];
    originCookie = I1iiIi[Ii1lIi];

    if (li1i1) {
      $.UserName = decodeURIComponent(li1i1.match(/pt_pin=([^; ]+)(?=;?)/) && li1i1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ii1lIi + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await liii1i();
      await iIiiII();
      await $.wait(3000);
      if (Ii1lIi == 0 && !$.actorUuid) break;
      if ($.outFlag || $.activityEnd) break;
    }
  }

  if ($.outFlag) {
    let ll1lII = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + ll1lII);
    if ($.isNode()) await liii1I.sendNotify("" + $.name, "" + ll1lII);
  }

  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(iIIIiI => $.logErr(iIIIiI)).finally(() => $.done());

async function iIiiII() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    I1iiIl = "";
    $.Token = "";
    $.Pin = "";
    let ll1IiI = false;
    $.Token = await lI1iIi(li1i1, iIIIii);

    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }

    await iIIIlI();

    if (liliII == "") {
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

    await ilIll1("getMyPing");

    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }

    await ilIll1("accessLogWithAD");
    await ilIll1("getUserInfo");
    await ilIll1("activityContent");
    await ilIll1("drawContent");
    if ($.hotFlag) return;
    console.log($.actorUuid);

    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }

    if ($.hasEnd === true || Date.now() > $.endTime) {
      $.activityEnd = true;
      console.log("活动结束");
      return;
    }

    await $.wait(1000);
    console.log("开始做日常任务......");
    $.log("关注: " + $.followShop);
    !$.followShop && !$.outFlag && (ll1IiI = true, await ilIll1("followShop"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("加购: " + $.addSku);
    !$.addSku && !$.outFlag && (ll1IiI = true, await ilIll1("addSku"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    $.log("逛一逛: " + $.visitSkulist);
    !$.visitSkulist && !$.outFlag && (ll1IiI = true, await ilIll1("toShoplist"), await $.wait(parseInt(Math.random() * 2000 + 1000, 10)));
    await ilIll1("activityContent");
    console.log("\n目前分值为：" + $.score + "\n");
    $.runFalag = true;
    let li1li = parseInt($.score / 300);

    for (m = 1; li1li--; m++) {
      console.log("第" + m + "次抽奖");
      await ilIll1("draw");
      if ($.runFalag == false) break;
      if (Number(li1li) <= 0) break;

      if (m >= 1) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }

      await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
    }

    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));

    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }

    console.log("当前助力:" + ($.shareUuid || "未获取到助力邀请码"));
    $.index == 1 && ($.shareUuid = $.actorUuid, console.log("后面的号都会助力:" + $.shareUuid));
    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
  } catch (i1IiI) {
    console.log(i1IiI);
  }
}

async function ilIll1(lIllil) {
  if ($.outFlag) return;
  let I111 = "https://lzdz1-isv.isvjcloud.com",
      I1I11l = "",
      I1I11i = "POST";

  switch (lIllil) {
    case "getSimpleActInfoVo":
      url = I111 + "/dz/common/getSimpleActInfoVo", I1I11l = "activityId=" + $.activityId;
      break;

    case "getMyPing":
      url = I111 + "/customer/getMyPing", I1I11l = "userId=1000014486&token=" + $.Token + "&fromType=APP";
      break;

    case "accessLogWithAD":
      url = I111 + "/common/accessLogWithAD";
      let lIllli = I111 + "/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid;
      I1I11l = "venderId=1000014486&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lIllli) + "&subType=app&adSource=";
      break;

    case "getUserInfo":
      url = I111 + "/wxActionCommon/getUserInfo", I1I11l = "pin=" + encodeURIComponent($.Pin);
      break;

    case "activityContent":
      url = I111 + "/dingzhi/box618/activityContent", I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent($.attrTouXiang) + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;

    case "drawContent":
      url = I111 + "/dingzhi/taskact/common/drawContent", I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      break;

    case "draw":
      url = I111 + "/dingzhi/box618/startDraw", I1I11l = "activityId=" + $.activityId + "&actorUuid=" + $.actorUuid + "&pin=" + encodeURIComponent($.Pin);
      break;

    case "toShoplist":
      url = I111 + "/dingzhi/box618/saveTask", I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=14&taskValue=1000014486";
      break;

    case "addCart":
    case "browseGoods":
      url = I111 + "/dingzhi/opencard/" + lIllil, I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin);
      if (lIllil == "browseGoods") I1I11l += "&value=" + $.visitSkuValue;
      break;

    case "邀请":
    case "助力":
      lIllil == "助力" ? url = I111 + "/dingzhi/linkgame/assist" : url = I111 + "/dingzhi/linkgame/assist/status";
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&shareUuid=" + $.shareUuid;
      break;

    case "followShop":
    case "visitSku":
    case "toShop":
    case "addSku":
      url = I111 + "/dingzhi/box618/saveTask";
      let lIllll = "",
          I11I = "";
      if (lIllil == "followShop") lIllll = 22, I11I = "";else {
        if (lIllil == "visitSku") {
          lIllll = 5;
          I11I = $.visitSkuValue || 5;
        } else {
          if (lIllil == "toShop") lIllll = 14, I11I = $.visitSkuValue || 1000014486;else lIllil == "addSku" && (lIllll = 21, I11I = "");
        }
      }
      I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&taskType=" + lIllll + "&taskValue=" + $.visitSkuValue;
      break;

    case "getDrawRecordHasCoupon":
      url = I111 + "/dingzhi/taskact/common/getDrawRecordHasCoupon", I1I11l = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;

    default:
      console.log("错误" + lIllil);
  }

  let III1ll = I1IIii(url, I1I11l, I1I11i);
  return new Promise(async i1IiIl => {
    $.post(III1ll, (iIIlIl, iIIlIi, iilIll) => {
      try {
        li11i1(iIIlIi);
        iIIlIl ? (iIIlIi && typeof iIIlIi.statusCode != "undefined" && iIIlIi.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iIIlIl, iIIlIl)), console.log(lIllil + " API请求失败，请检查网路重试")) : I1IIil(lIllil, iilIll);
      } catch (i111I) {
        console.log(i111I, iIIlIi);
      } finally {
        i1IiIl();
      }
    });
  });
}

async function I1IIil(lIiIl1, iilIl1) {
  let III1i1 = "";

  try {
    (lIiIl1 != "accessLogWithAD" || lIiIl1 != "drawContent") && iilIl1 && (III1i1 = JSON.parse(iilIl1));
  } catch (l1iiil) {
    console.log(lIiIl1 + " 执行任务异常");
    console.log(iilIl1);
    $.runFalag = false;
  }

  try {
    switch (lIiIl1) {
      case "getSimpleActInfoVo":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (typeof III1i1.data.shopId != "undefined") $.shopId = III1i1.data.shopId;
            if (typeof III1i1.data.venderId != "undefined") $.venderId = III1i1.data.venderId;
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);

        break;

      case "getMyPing":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (III1i1.data && typeof III1i1.data.secretPin != "undefined") $.Pin = III1i1.data.secretPin;
            if (III1i1.data && typeof III1i1.data.nickname != "undefined") $.nickname = III1i1.data.nickname;
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);

        break;

      case "getUserInfo":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            if (III1i1.data && typeof III1i1.data.yunMidImageUrl != "undefined") $.attrTouXiang = III1i1.data.yunMidImageUrl || "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);

        break;

      case "activityContent":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            $.endTime = III1i1.data.endTime || III1i1.data.activityVo && III1i1.data.activityVo.endTime || III1i1.data.activity.endTime || 0;
            $.hasEnd = III1i1.data.hasEnd || false;
            $.score = III1i1.data.score || 0;
            $.settings = III1i1.data.openCardData.settings || [];
            $.assistStatus = III1i1.data.assistStatus || 0;
            $.followShop = III1i1.data.taskData.followSku.allStatus || false;
            $.visitSkulist = III1i1.data.taskData.toShop.allStatus || false;
            $.addSkulist = III1i1.data.taskData.addSku.settings || [];
            $.addSku = III1i1.data.taskData.addSku.allStatus || false;
            $.actorUuid = III1i1.data.actorUuid || 0;
          } else {
            if (III1i1.errorMessage) console.log(lIiIl1 + " " + (III1i1.errorMessage || ""));else {
              console.log(lIiIl1 + " " + iilIl1);
            }
          }
        } else {
          console.log(lIiIl1 + " " + iilIl1);
        }

        break;

      case "followShop":
      case "addSku":
      case "toShoplist":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            console.log("任务完成，获得分值：" + III1i1.data.addScore);
          } else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);

        break;

      case "checkOpenCard":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            let illIIi = III1i1.data.openInfo || [];
            $.openList = [...illIIi];
            $.allOpenCard = III1i1.data.allOpenCard || III1i1.data.isOpenCardStatus || false;
            if (III1i1.data.beans || III1i1.data.addBeanNum) console.log("开卡获得:" + (III1i1.data.beans || III1i1.data.addBeanNum) + "豆");
          } else III1i1.errorMessage ? console.log(lIiIl1 + " " + (III1i1.errorMessage || "")) : console.log(lIiIl1 + " " + iilIl1);
        } else console.log(lIiIl1 + " " + iilIl1);

        break;

      case "draw":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) III1i1.data.drawOk === true ? console.log("获得：" + III1i1.data.name) : console.log("什么也没有~");else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log("" + iilIl1);

        break;

      case "邀请":
      case "助力":
        if (typeof III1i1 == "object") {
          if (III1i1.data.status == 200) {
            if (lIiIl1 == "助力") console.log("助力成功");else {
              $.yaoqing = true;
            }
          } else {
            if (III1i1.data.status == 105) {
              console.log("已经助力过");
            } else {
              if (III1i1.data.status == 104) console.log("已经助力其他人");else {
                if (III1i1.data.status == 101) {} else console.log(iilIl1);
              }
            }
          }
        } else console.log(lIiIl1 + " " + iilIl1);

      case "getDrawRecordHasCoupon":
        if (typeof III1i1 == "object") {
          if (III1i1.result && III1i1.result === true) {
            console.log("我的奖品：");

            for (let IllII in III1i1.data.recordList) {
              let Ill1il = III1i1.data.recordList[IllII];
              console.log("" + (Ill1il.infoType != 10 && Ill1il.value && Ill1il.value + ":" || "") + Ill1il.infoName);
            }
          } else III1i1.errorMessage ? console.log("" + (III1i1.errorMessage || "")) : console.log("" + iilIl1);
        } else console.log("" + iilIl1);

        break;

      case "accessLogWithAD":
      case "drawContent":
      case "getRankList":
        break;

      default:
        console.log(lIiIl1 + "-> " + iilIl1);
    }

    if (typeof III1i1 == "object") {
      if (III1i1.errorMessage) {
        if (III1i1.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (i1Ii1I) {
    console.log(i1Ii1I);
  }
}

function I1IIii(llIiIl, I1i1i, lIi1II = "POST") {
  let IllI1 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": li1i1,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return llIiIl.indexOf("https://lzdz1-isv.isvjcloud.com") > -1 && (IllI1.Referer = "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid, IllI1.Cookie = "" + (I1iiIl && I1iiIl || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + liliII), {
    "url": llIiIl,
    "method": lIi1II,
    "headers": IllI1,
    "body": I1i1i,
    "timeout": 30000
  };
}

function iIIIlI() {
  return new Promise(Iil1l => {
    let Iil1i = {
      "url": "https://lzdz1-isv.isvjcloud.com/dingzhi/box618/activity/activity?activityId=" + $.activityId + "&shareUuid=" + $.shareUuid,
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(Iil1i, async (i1i1i1, iiiIli, IllIl) => {
      try {
        if (i1i1i1) iiiIli && typeof iiiIli.statusCode != "undefined" && iiiIli.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(i1i1i1)), console.log($.name + " cookie API请求失败，请检查网路重试");else {
          let IlIiI = IllIl.match(/(活动已经结束)/) && IllIl.match(/(活动已经结束)/)[1] || "";
          IlIiI && ($.activityEnd = true, console.log("活动已结束"));
          li11i1(iiiIli);
        }
      } catch (l1I1I) {
        $.logErr(l1I1I, iiiIli);
      } finally {
        Iil1l();
      }
    });
  });
}

function li11i1(iillil) {
  if (iillil) {
    if (iillil.headers["set-cookie"]) {
      li1i1 = originCookie + ";";

      for (let Il1ill of iillil.headers["set-cookie"]) {
        lI1iIl[Il1ill.split(";")[0].substr(0, Il1ill.split(";")[0].indexOf("="))] = Il1ill.split(";")[0].substr(Il1ill.split(";")[0].indexOf("=") + 1);
      }

      for (const Il1ili of Object.keys(lI1iIl)) {
        li1i1 += Il1ili + "=" + lI1iIl[Il1ili] + ";";
      }

      liliII = li1i1;
    }
  }
}

function II1l1(liIIII) {
  return new Promise(I111ii => {
    const I1liII = {
      "url": liIIII + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(I1liII, async (i1i1l1, iIii1i, IIil1i) => {
      try {
        if (i1i1l1) $.log(i1i1l1);else {
          if (IIil1i) IIil1i = JSON.parse(IIil1i);
        }
      } catch (IIllIl) {
        $.logErr(IIllIl, iIii1i);
        IIil1i = null;
      } finally {
        I111ii(IIil1i);
      }
    });
  });
}

async function liii1i() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + IIll1i(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function IIll1i(iIliII) {
  iIliII = iIliII || 32;
  let I1liI1 = "abcdef0123456789",
      I1ii11 = I1liI1.length,
      IlIil = "";

  for (i = 0; i < iIliII; i++) IlIil += I1liI1.charAt(Math.floor(Math.random() * I1ii11));

  return IlIil;
}

function lI1iII(iii11i, iii11l) {
  return Math.floor(Math.random() * (iii11l - iii11i)) + iii11i;
}

function IIll1l(lIl1i1) {
  if (typeof lIl1i1 == "string") {
    try {
      return JSON.parse(lIl1i1);
    } catch (IlIli) {
      return console.log(IlIli), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

