/*
东东水果:脚本更新地址 jd_fruit_friend.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场好友删减奖励
10 2 * * * jd_fruit_friend.js, tag=东东农场好友删减奖励, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "10 2 * * *" script-path=jd_fruit_friend.js,tag=东东农场好友删减奖励

=========================Surge============================
东东农场好友删减奖励 = type=cron,cronexp="10 2 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_friend.js

=========================小火箭===========================
东东农场好友删减奖励 = type=cron,script-path=jd_fruit_friend.js, cronexpr="10 2 * * *", timeout=3600, enable=true


*/
const $ = new Env('东东农场好友删减奖励');
let cookiesArr = [],
    cookie = '',
    isBox = false,
    notify,
    allMessage = '';
let newShareCodes = [];
let llIilII = "",
    liI111li = "",
    iililI1i = {};
let IlIii1ii = true;

const llI1I = require("./function/jdCommon"),
      II1ll1Ii = require("./function/h5st41.js");

let i1iIlII1 = lI111Ill(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
    IIli1ii = lI111Ill(2, "1234567890") + "-" + lI111Ill(4, "1234567890") + "-" + lI111Ill(4, "1234567890") + "-" + lI111Ill(5, "1234567890"),
    IlI1Ii11 = "106.475" + Math.floor(Math.random() * 899 + 100),
    II1IlIIi = "29.503" + Math.floor(Math.random() * 899 + 100),
    IilllIl = true;

const liiili11 = require("fs");

let IllilIi = false,
    ii1i1lIi = "./Fruit_ShareCache.json",
    illl1IlI = liiili11.existsSync(ii1i1lIi),
    liiIlili = [];
illl1IlI && (console.log("检测到东东农场缓存文件Fruit_ShareCache.json，载入..."), liiIlili = liiili11.readFileSync(ii1i1lIi, "utf-8"), liiIlili && (liiIlili = liiIlili.toString(), liiIlili = JSON.parse(liiIlili)));
let l1lIiliI = 0,
    iIlIIlii = false;
!(async () => {
  await lllI1II();

  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  console.log("\n【若多次提示403，务必更换IP运行.....】\n");

  if (IilllIl) {
    console.log("\n【开始收集您的互助码，用于好友删除与加好友操作】\n");

    for (let l1lli11 = 0; l1lli11 < cookiesArr.length; l1lli11++) {
      if (cookiesArr[l1lli11]) {
        cookie = cookiesArr[l1lli11];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = l1lli11 + 1;
        $.isLogin = true;
        $.nickName = "";

        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }

        llIilII = "";
        liI111li = "";
        iililI1i = {};
        $.UA = llI1I.genUA($.UserName);
        $.retry = 0;
        iIlIIlii = false;
        await iI1I11II();
        iIlIIlii && (await $.wait(5000), l1lIiliI++);
        l1lIiliI == 10 && (console.log("\n【访问接口次数达到10次，休息一分钟.....】\n"), await $.wait(60 * 1000), l1lIiliI = 0);
      }
    }

    if (IllilIi) {
      var lII1lIii = JSON.stringify(liiIlili, null, 2);
      liiili11.writeFile(ii1i1lIi, lII1lIii, function (I1llIIIl) {
        I1llIIIl ? (console.log(I1llIIIl), console.log("\n【缓存文件Fruit_ShareCache.json更新失败!】\n")) : console.log("\n【缓存文件Fruit_ShareCache.json更新成功!】\n");
      });
    }
  }

  console.log("\n【互助码已经收集完毕，现在开始账号内部互助，请稍等...】\n");

  for (let lliI1llI = 0; lliI1llI < cookiesArr.length; lliI1llI++) {
    if (cookiesArr[lliI1llI]) {
      cookie = cookiesArr[lliI1llI];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lliI1llI + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      llIilII = "";
      liI111li = "";
      iililI1i = {};
      $.UA = llI1I.genUA($.UserName);
      $.retry = 0;
      l1lIiliI++;
      await lliiIIl1();
      l1lIiliI == 5 && (console.log("\n【访问接口次数达到5次，休息一分钟.....】\n"), await $.wait(60 * 1000), l1lIiliI = 0);
    }
  }

  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(llllIIi1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + llllIIi1 + "!", "");
}).finally(() => {
  $.done();
});

async function lliiIIl1() {
  liI111li = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);

  try {
    await IIlllli1();
    await I1II1l1l();

    if ($.farmInfo?.["farmUserPro"]) {
      llIilII = "删除好友与接受好友邀请已完成";
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else {
          if ($.farmInfo?.["code"] == 2) console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]);else {
            console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
          }
        }
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
    }
  } catch (lIiii1i) {
    $.logErr(lIiii1i);
  }
}

async function I1II1l1l() {
  await l1li11ii();

  if ($.friendList) {
    console.log("\n今日已邀请好友" + $.friendList?.["inviteFriendCount"] + "个 / 每日邀请上限" + $.friendList?.["inviteFriendMax"] + "个");
    console.log("开始删除" + ($.friendList?.["friends"] && $.friendList?.["friends"]["length"]) + "个好友,可拿每天的邀请奖励");
    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) for (let llI1Il1l of $.friendList?.["friends"]) {
      console.log("\n开始删除好友 [" + llI1Il1l?.["shareCode"] + "]");
      const llIli1l = await lIilIiI1("deleteFriendForFarm", {
        "shareCode": "" + llI1Il1l?.["shareCode"],
        "version": 8,
        "channel": 1
      });
      llIli1l && llIli1l?.["code"] === "0" && console.log("删除好友 [" + llI1Il1l?.["shareCode"] + "] 成功\n");
    }
    await II1I1Iii();
    $.friendList?.["inviteFriendCount"] > 0 ? $.friendList?.["inviteFriendCount"] > $.friendList?.["inviteFriendGotAwardCount"] && (console.log("开始领取邀请好友的奖励"), await i11iIIIl(), console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes))) : console.log("今日未邀请过好友");
  } else console.log("查询好友列表失败\n");
}

async function II1I1Iii() {
  for (let llIilIii of newShareCodes) {
    if (llIilIii === $.farmInfo.farmUserPro?.["shareCode"]) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }

    await iiiiI1l(llIilIii);
    if ($.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes?.["helpResult"]?.["masterUserInfo"]?.["nickName"] + "的好友");else $.inviteFriendRes && $.inviteFriendRes?.["helpResult"] && $.inviteFriendRes?.["helpResult"]?.["code"] === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}

async function iI1I11II() {
  try {
    console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】");
    var iiiIIIi = false,
        li1ili11 = "";

    if (liiIlili) {
      for (let IiiI1iIl = 0; IiiI1iIl < liiIlili.length; IiiI1iIl++) {
        liiIlili[IiiI1iIl].pt_pin == $.UserName && (iiiIIIi = true, li1ili11 = liiIlili[IiiI1iIl].ShareCode);
      }
    }

    if (!iiiIIIi) {
      console.log($.UserName + "该账号无缓存，尝试联网获取互助码.....");
      iIlIIlii = true;
      await IIlllli1();

      if ($.farmInfo?.["farmUserPro"]) {
        var ii1iIII1 = {};
        li1ili11 = $.farmInfo?.["farmUserPro"]?.["shareCode"];
        ii1iIII1 = {
          "pt_pin": $.UserName,
          "ShareCode": li1ili11
        };
        liiIlili.push(ii1iIII1);
        IllilIi = true;
      }
    }

    li1ili11 ? (console.log("\n" + li1ili11), newShareCodes.push(li1ili11)) : console.log("\n数据异常");
  } catch (IlI1I1l) {
    $.logErr(IlI1I1l);
  }
}

async function i1i1iiii() {
  $.duckRes = await lIilIiI1("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}

async function Il1i11ii() {
  $.totalWaterReward = await lIilIiI1("totalWaterTaskForFarm");
}

async function lIIl11il() {
  $.firstWaterReward = await lIilIiI1("firstWaterTaskForFarm");
}

async function ill11IIl() {
  $.waterFriendGotAwardRes = await lIilIiI1("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}

async function II1IilIi() {
  $.myCardInfoRes = await lIilIiI1("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}

async function iII1ii1I(i1l1I1ii) {
  $.userMyCardRes = await lIilIiI1("userMyCardForFarm", {
    "cardType": i1l1I1ii
  });
}

async function liiiIIi1(lI1ill1I) {
  $.gotStageAwardForFarmRes = await lIilIiI1("gotStageAwardForFarm", {
    "type": lI1ill1I
  });
}

async function iilIii() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await lIilIiI1("waterGoodForFarm");
}

async function i11Ii1li() {
  $.initForTurntableFarmRes = await lIilIiI1("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}

async function lIII111() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await lIilIiI1("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}

async function Iiilll1i() {
  $.timingAwardRes = await lIilIiI1("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}

async function I1i1ii1I(llII11l1, IIIl1lII) {
  llII11l1 === 1 && console.log("浏览爆品会场");
  llII11l1 === 2 && console.log("天天抽奖浏览任务领取水滴");
  const Iii1I1I1 = {
    "type": llII11l1,
    "adId": IIIl1lII,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await lIilIiI1("browserForTurntableFarm", Iii1I1I1);
}

async function IiillIii(lIillIii) {
  const llli1Iii = {
    "type": 2,
    "adId": lIillIii,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await lIilIiI1("browserForTurntableFarm", llli1Iii);
}

async function ilIl1lii() {
  $.lotteryMasterHelpRes = await lIilIiI1("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}

async function IIlil1iI() {
  $.masterGotFinished = await lIilIiI1("masterGotFinishedTaskForFarm");
}

async function l1l11i1() {
  $.masterHelpResult = await lIilIiI1("masterHelpTaskInitForFarm");
}

async function l1Il11II() {
  $.farmAssistResult = await lIilIiI1("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}

async function iIll1lIl() {
  $.receiveStageEnergy = await lIilIiI1("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}

async function iiiiI1l() {
  $.inviteFriendRes = await lIilIiI1("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}

async function iiIii1II() {
  $.helpResult = await lIilIiI1("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}

async function llill11() {
  const l1li11 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await lIilIiI1("waterRainForFarm", l1li11);
}

async function l11i11II() {
  $.clockInInit = await lIilIiI1("clockInInitForFarm");
}

async function i11lIiI() {
  $.clockInForFarmRes = await lIilIiI1("clockInForFarm", {
    "type": 1
  });
}

async function IIIliIli(l11i11I, llliiiii, ii111Il) {
  let l11Illli = {
    "id": l11i11I,
    "type": llliiiii,
    "step": ii111Il
  };

  if (llliiiii === "theme") {
    if (ii111Il === "1") $.themeStep1 = await lIilIiI1("clockInFollowForFarm", l11Illli);else {
      if (ii111Il === "2") {
        $.themeStep2 = await lIilIiI1("clockInFollowForFarm", l11Illli);
      }
    }
  } else {
    if (llliiiii === "venderCoupon") {
      if (ii111Il === "1") $.venderCouponStep1 = await lIilIiI1("clockInFollowForFarm", l11Illli);else {
        if (ii111Il === "2") {
          $.venderCouponStep2 = await lIilIiI1("clockInFollowForFarm", l11Illli);
        }
      }
    }
  }
}

async function iil11Il() {
  $.gotClockInGiftRes = await lIilIiI1("gotClockInGift", {
    "type": 2
  });
}

async function l1ilIl1i() {
  $.threeMeal = await lIilIiI1("gotThreeMealForFarm");
}

async function illI1l1i(iiil11iI, il1ii1II) {
  if (il1ii1II === 0) $.browseResult = await lIilIiI1("browseAdTaskForFarm", {
    "advertId": iiil11iI,
    "type": il1ii1II
  });else il1ii1II === 1 && ($.browseRwardResult = await lIilIiI1("browseAdTaskForFarm", {
    "advertId": iiil11iI,
    "type": il1ii1II
  }));
}

async function lliil1ll(iIillII1) {
  const Iliil1 = {
    "type": iIillII1,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (iIillII1 === 1) $.treasureResult = await lIilIiI1("ddnc_getTreasureBoxAward", Iliil1);else iIillII1 === 2 && ($.treasureRwardResult = await lIilIiI1("ddnc_getTreasureBoxAward", Iliil1));
}

async function l11IliII() {
  $.goalResult = await lIilIiI1("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}

async function i1lI1i1l() {
  $.signResult = await lIilIiI1("signForFarm");
}

async function Ilii1() {
  const l1l111ii = {
    "babelChannel": "10",
    "version": 24,
    "lat": II1IlIIi,
    "lng": IlI1Ii11
  };
  $.gotNewUserTaskForFarmResult = await lIilIiI1("gotNewUserTaskForFarm", l1l111ii);
}

async function IIlllli1() {
  $.farmInfo = await lIilIiI1("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": i1iIlII1,
    "un_area": IIli1ii,
    "version": 22,
    "lat": II1IlIIi,
    "lng": IlI1Ii11,
    "channel": 1
  });
}

async function II1il1I() {
  console.log("\n初始化任务列表");
  $.farmTask = await lIilIiI1("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function l1li11ii() {
  $.friendList = await lIilIiI1("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}

async function i11iIIIl() {
  $.awardInviteFriendRes = await lIilIiI1("awardInviteFriendForFarm");
}

async function l1Ii1111(lii1I1il) {
  const iliIiI1l = {
    "shareCode": lii1I1il,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await lIilIiI1("waterFriendForFarm", iliIiI1l);
}

async function Iii1l1II() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + IlIii1ii === "false";
  $.ctrTemp ? ($.msg($.name, liI111li, llIilII, iililI1i), $.isNode() && (allMessage += liI111li + "\n" + llIilII + ($.index !== cookiesArr.length ? "" : ""))) : $.log("" + llIilII);
}

function Il1i11i1(iiI1IIII) {
  let lii1iII1;
  return iiI1IIII ? lii1iII1 = new Date(iiI1IIII) : lii1iII1 = new Date(), lii1iII1.getFullYear() + "-" + (lii1iII1.getMonth() + 1 >= 10 ? lii1iII1.getMonth() + 1 : "0" + (lii1iII1.getMonth() + 1)) + "-" + (lii1iII1.getDate() >= 10 ? lii1iII1.getDate() : "0" + lii1iII1.getDate());
}

function lllI1II() {
  return new Promise(Ii1111ll => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const lII1Illl = $.isNode() ? require("./jdCookie.js") : "";

    if ($.isNode()) {
      Object.keys(lII1Illl).forEach(iliIi11i => {
        lII1Illl[iliIi11i] && cookiesArr.push(lII1Illl[iliIi11i]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1il1lii($.getdata("CookiesJD") || "[]").map(IIllIll => IIllIll.cookie)].filter(lI1lIi11 => !!lI1lIi11);

    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    Ii1111ll();
  });
}

function lIilIiI1(llii1I, II1ill = {}, ili11lil = 10000) {
  return new Promise(IlIili1i => {
    setTimeout(async () => {
      $.post(await iIil1lII(llii1I, II1ill), (liiI1Ii1, il1ll1i1, IiiiIi1l) => {
        try {
          if (liiI1Ii1) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(liiI1Ii1));
            console.log("function_id:" + llii1I);
            $.logErr(liiI1Ii1);
          } else {
            iIiIiil1(IiiiIi1l) && (IiiiIi1l = JSON.parse(IiiiIi1l));
          }
        } catch (IIi1il1l) {
          $.logErr(IIi1il1l, il1ll1i1);
        } finally {
          IlIili1i(IiiiIi1l);
        }
      });
    }, ili11lil);
  });
}

function iIiIiil1(l1l11Ili) {
  if (!l1l11Ili) return console.log("京东服务器返回数据为空"), false;

  try {
    if (typeof JSON.parse(l1l11Ili) == "object") {
      return true;
    }
  } catch (lIiilliI) {
    return console.log(lIiilliI), false;
  }
}

const iIIliIl1 = {
  "initForFarm": "8a2af",
  "taskInitForFarm": "fcb5a",
  "browseAdTaskForFarm": "53f09",
  "firstWaterTaskForFarm": "0cf1e",
  "waterFriendGotAwardForFarm": "d08ff",
  "ddnc_getTreasureBoxAward": "67dfc",
  "totalWaterTaskForFarm": "102f5",
  "gotThreeMealForFarm": "57b30",
  "waterGoodForFarm": "0c010",
  "choiceGoodsForFarm": "5f4ca",
  "gotCouponForFarm": "b1515",
  "gotStageAwardForFarm": "81591",
  "followVenderForBrand": "71547",
  "gotWaterGoalTaskForFarm": "c901b",
  "gotNewUserTaskForFarm": "de8f8",
  "orderTaskGotWaterForFarm": "eed5c",
  "clockInForFarm": "32b94",
  "clockInFollowForFarm": "4a0b4",
  "waterFriendForFarm": "673a0",
  "awardFirstFriendForFarm": "9b655",
  "awardInviteFriendForFarm": "2b5ca",
  "awardCallOrInviteFriendForFarm": "b0b03",
  "userMyCardForFarm": "86ba5",
  "getCallUserCardForFarm": "2ca57",
  "deleteFriendForFarm": "eaf91",
  "gotLowFreqWaterForFarm": "8172b",
  "getFullCollectionReward": "5c767",
  "getOrderPayLotteryWater": "ef089",
  "receiveStageEnergy": "15507",
  "exchangeGood": "52963",
  "farmAssistInit": "92354",
  "myCardInfoForFarm": "157b6",
  "gotPopFirstPurchaseTaskForFarm": "d432f",
  "limitWaterInitForFarm": "6bdc2",
  "ddnc_surpriseModal": "e81c1",
  "friendInitForFarm": "a5a9c",
  "clockInInitForFarm": "08dc3",
  "guideTaskAward": "59bc4",
  "signForFarm": "32b94",
  "gotNewUserTaskForFarm": "de8f8"
};

async function iIil1lII(iI1iilIi, IllIiiIi = {}) {
  let l1llIil1 = "";
  if (!iIIliIl1[iI1iilIi]) l1llIil1 = "https://api.m.jd.com/client.action?functionId=" + iI1iilIi + "&body=" + encodeURIComponent(JSON.stringify(IllIiiIi)) + "&appid=wh5";else {
    const iIllIiI = {
      "appid": "signed_wh5",
      "client": "iOS",
      "clientVersion": "10.1.0",
      "functionId": iI1iilIi,
      "body": IllIiiIi
    },
          l1lIiII1 = await i1Ilill(iIIliIl1[iI1iilIi], iIllIiI);
    l1llIil1 = "https://api.m.jd.com/client.action?" + l1lIiII1;
  }
  return {
    "url": l1llIil1,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": cookie
    },
    "timeout": 30000
  };
}

async function i1Ilill(iiiIiIII, iil1IIII) {
  try {
    let iIi1liII = new II1ll1Ii({
      "appId": iiiIiIII,
      "appid": "signed_wh5",
      "clientVersion": iil1IIII?.["clientVersion"],
      "client": iil1IIII?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await iIi1liII.genAlgo(), body = await iIi1liII.genUrlParams(iil1IIII.functionId, iil1IIII.body), body;
  } catch (i11III1i) {}
}

async function Ili1li(llI11I1, I1ilii1I) {
  let IllI1ll = {
    "searchParams": { ...I1ilii1I,
      "appId": llI11I1
    },
    "pt_pin": $.UserName,
    "client": I1ilii1I?.["client"],
    "clientVersion": I1ilii1I?.["clientVersion"]
  },
      lll1liiI = {
    "Content-Type": "application/json",
    "User-Agent": $.UA
  },
      iill11II = {
    "url": "http://h5st.kingran.cf/api/h5st",
    "body": JSON.stringify(IllI1ll),
    "headers": lll1liiI,
    "timeout": 30000
  };
  return new Promise(async iIi1i1ll => {
    $.post(iill11II, (llliIIi, i1i1ll1, lliiII1I) => {
      let I1IIi = "";

      try {
        if (llliIIi) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          lliiII1I = JSON.parse(lliiII1I);
          console.log(JSON.stringify(lliiII1I));

          if (typeof lliiII1I === "object" && lliiII1I && lliiII1I.body) {
            if (lliiII1I.body) I1IIi = lliiII1I || "";
          } else lliiII1I.code == 400 ? console.log("\n" + lliiII1I.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (i1lIlIl1) {
        $.logErr(i1lIlIl1, i1i1ll1);
      } finally {
        iIi1i1ll(i1iiilil(I1IIi));
      }
    });
  });
}

function i1iiilil(iilll1i, lliilIl = {}) {
  let II1lII1l = [],
      i1ll1lI = lliilIl.connector || "&",
      I11l1lii = Object.keys(iilll1i);
  if (lliilIl.sort) I11l1lii = I11l1lii.sort();

  for (let l1i1lIi1 of I11l1lii) {
    let IIIli1iI = iilll1i[l1i1lIi1];
    if (IIIli1iI && typeof IIIli1iI === "object") IIIli1iI = JSON.stringify(IIIli1iI);
    if (IIIli1iI && lliilIl.encode) IIIli1iI = encodeURIComponent(IIIli1iI);
    II1lII1l.push(l1i1lIi1 + "=" + IIIli1iI);
  }

  return II1lII1l.join(i1ll1lI);
}

function lI111Ill(iIilIl11, iiiIIIi1 = "qwertyuiopasdfghjklzxcvbnm") {
  let l1IIlIlI = "";

  for (let IlIIliiI = 0; IlIIliiI < iIilIl11; IlIIliiI++) {
    l1IIlIlI += iiiIIIi1[Math.floor(Math.random() * iiiIIIi1.length)];
  }

  return l1IIlIlI;
}

function i1il1lii(IIl1I11i) {
  if (typeof IIl1I11i == "string") {
    try {
      return JSON.parse(IIl1I11i);
    } catch (lli1I1i) {
      return console.log(lli1I1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
