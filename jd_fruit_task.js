/*
东东水果:脚本更新地址 jd_fruit_task.js
更新时间：2021-5-18
活动入口：京东APP我的-更多工具-东东农场
==========================Quantumultx=========================
[task_local]
#东东农场日常任务
5 6-18/6 * * * jd_fruit_task.js, tag=东东农场日常任务, img-url=https://raw.githubusercontent.com/58xinian/icon/master/jdnc.png, enabled=true
=========================Loon=============================
[Script]
cron "5 6-18/6 * * *" script-path=jd_fruit_task.js,tag=东东农场日常任务

=========================Surge============================
东东农场日常任务 = type=cron,cronexp="5 6-18/6 * * *",wake-system=1,timeout=3600,script-path=jd_fruit_task.js

=========================小火箭===========================
东东农场日常任务 = type=cron,script-path=jd_fruit_task.js, cronexpr="5 6-18/6 * * *", timeout=3600, enable=true

默认浇水,不浇水设置变量export jd_fruit_Water='true'
export DO_TEN_WATER_AGAIN="" 默认再次浇水

需要关闭通知 在第39行  false  改成  true

*/
const $ = new Env('东东农场日常任务');
let cookiesArr = [],
    cookie = '',
    jdFruitShareArr = [],
    isBox = false,
    notify,
    newShareCodes,
    allMessage = '';
let shareCodes = [];
let message = '',
    subTitle = '',
    option = {},
    isFruitFinished = false;
const retainWater = $.isNode() ? (process.env.retainWater ? process.env.retainWater : 100) : $.getdata('retainWater') ? $.getdata('retainWater') : 100; //保留水滴大于多少g,默认100g;
let jdNotify = false; //是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false; //农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
let iliIii1l = process.env.jd_fruit_Water === "true" ? true : false;

const ll1lIll = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D",
      lIli1Il1 = require("./function/jdCommon"),
      I1lllIl1 = require("./function/h5st41.js");

let IIiiIiI1 = IIi1l1I1(32, "1234567890qwertyuiopasdfghjklzxcvbnm"),
    II11i11i = IIi1l1I1(2, "1234567890") + "-" + IIi1l1I1(4, "1234567890") + "-" + IIi1l1I1(4, "1234567890") + "-" + IIi1l1I1(5, "1234567890"),
    i1IIIIl1 = "106.475" + Math.floor(Math.random() * 899 + 100),
    liilIi1l = "29.503" + Math.floor(Math.random() * 899 + 100),
    i1lIilll = 0;
!(async () => {
  await llIiIl1l();

  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  console.log("\n【若多次提示403，务必更换IP运行.....】\n");

  for (let l11liiI1 = 0; l11liiI1 < cookiesArr.length; l11liiI1++) {
    if (cookiesArr[l11liiI1]) {
      cookie = cookiesArr[l11liiI1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l11liiI1 + 1;
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

      message = "";
      subTitle = "";
      option = {};
      $.UA = lIli1Il1.genUA($.UserName);
      $.retry = 0;
      i1lIilll++;
      await lli1I1I();
      i1lIilll == 3 && (console.log("\n【访问接口次数达到3次，休息一分钟.....】\n"), await $.wait(60 * 1000), i1lIilll = 0);
      await $.wait(30 * 1000);
    }
  }

  $.isNode() && allMessage && $.ctrTemp && (await notify.sendNotify("" + $.name, "" + allMessage));
})().catch(ii1I1IIl => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ii1I1IIl + "!", "");
}).finally(() => {
  $.done();
});

async function lli1I1I() {
  subTitle = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);

  try {
    await Ii1iIiI();

    if ($.farmInfo?.["farmUserPro"]) {
      message = "【水果名称】" + $.farmInfo?.["farmUserPro"]?.["name"] + "\n";
      console.log("\n【已成功兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n");
      message += "【已兑换水果】" + $.farmInfo?.["farmUserPro"]?.["winTimes"] + "次\n";

      if ($.farmInfo?.["treeState"] === 2 || $.farmInfo?.["treeState"] === 3) {
        option["open-url"] = ll1lIll;
        $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option);

        if ($.isNode()) {
          await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看");
        }

        return;
      } else {
        if ($.farmInfo?.["treeState"] === 1) console.log("\n当前种植：" + $.farmInfo?.["farmUserPro"]?.["name"] + "（等级" + $.farmInfo?.["farmUserPro"]?.["prizeLevel"] + "）\n");else {
          if ($.farmInfo?.["treeState"] === 0) {
            option["open-url"] = ll1lIll;
            $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果\n点击弹窗即达", option);
            $.isNode() && (await notify.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP或微信小程序选购并种植新的水果"));
            return;
          }
        }
      }

      await illIi1Il();
      if (!iliIii1l) await li11III1();else {
        console.log("默认浇水,不浇水设置变量export jd_fruit_Water='true'");
      }
      await Iii1l11I();
      await lIiiiII();
      await l1IiIl1i();
      $.farmInfo?.["newUserSendWater"] && (await l1IiIIli());
      await iI1lI1lI();
      !process.env.DO_TEN_WATER_AGAIN ? (console.log("执行再次浇水"), await li1lli1i()) : console.log("不执行再次浇水，攒水滴");
      await IlIIllii();
    } else {
      if ($.farmInfo?.["code"] == 3) console.log("农场异常: " + $.farmInfo?.["code"] + ",未登录");else {
        if ($.farmInfo?.["code"] == 6) console.log("农场异常: " + $.farmInfo?.["code"] + ",活动太火爆");else $.farmInfo?.["code"] == 2 ? console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["echo"]) : console.log("农场异常: " + $.farmInfo?.["code"] + "," + $.farmInfo?.["message"]);
      }
      ($.farmInfo?.["code"] == 402 || $.farmInfo?.["code"] == 403) && (await $.wait(parseInt(Math.random() * 2000 + 30000, 10)));
      $.retry < 1 && ($.retry++, console.log("等待3秒后重试,第:" + $.retry + "次"), await $.wait(3000), await lli1I1I());
    }
  } catch (Iilill) {
    $.logErr(Iilill);
  }

  await lIiIiIii();
}

async function illIi1Il() {
  await lIlIl1l1();
  console.log("被水滴砸中： " + ($.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] ? "是" : "否"));
  $.farmInfo?.["todayGotWaterGoalTask"]?.["canPop"] && (await ilII11lI(), $.goalResult?.["code"] === "0" && console.log("【被水滴砸中】获得" + $.goalResult?.["addEnergy"] + "g💧\\n"));
  console.log("签到结束,开始广告浏览任务");

  if (!$.farmTask?.["gotBrowseTaskAdInit"]["f"]) {
    let liI111I1 = $.farmTask?.["gotBrowseTaskAdInit"]?.["userBrowseTaskAds"],
        liii1I1I = 0,
        l11lil1l = 0,
        l11I1Ii = 0;

    for (let iI1I1Iii of liI111I1) {
      if (iI1I1Iii.limit <= iI1I1Iii?.["hadFinishedTimes"]) {
        console.log(iI1I1Iii?.["mainTitle"] + "+ ' 已完成");
        continue;
      }

      console.log("正在进行广告浏览任务: " + iI1I1Iii?.["mainTitle"]);
      await liIlIlIi(iI1I1Iii?.["advertId"], 0);
      $.browseResult?.["code"] === "0" ? (console.log(iI1I1Iii?.["mainTitle"] + "浏览任务完成"), await liIlIlIi(iI1I1Iii?.["advertId"], 1), $.browseRwardResult?.["code"] === "0" ? (console.log("领取浏览" + iI1I1Iii?.["mainTitle"] + "广告奖励成功,获得" + $.browseRwardResult?.["amount"] + "g"), liii1I1I += $.browseRwardResult?.["amount"], l11lil1l++) : (l11I1Ii++, console.log("领取浏览广告奖励结果:  " + JSON.stringify($.browseRwardResult)))) : (l11I1Ii++, console.log("广告浏览任务结果:   " + JSON.stringify($.browseResult)));
    }

    l11I1Ii > 0 ? console.log("【广告浏览】完成" + l11lil1l + "个,失败" + l11I1Ii + ",获得" + liii1I1I + "g💧\\n") : console.log("【广告浏览】完成" + l11lil1l + "个,获得" + liii1I1I + "g💧\n");
  } else {
    console.log("今天已经做过浏览广告任务\n");
  }

  !$.farmTask?.["gotThreeMealInit"]?.["f"] ? (await illl1iil(), $.threeMeal?.["code"] === "0" ? console.log("【定时领水】获得" + $.threeMeal?.["amount"] + "g💧\n") : console.log("定时领水成功结果:  " + JSON.stringify($.threeMeal))) : console.log("当前不在定时领水时间断或者已经领过\n");
  !$.farmTask?.["waterFriendTaskInit"]["f"] ? $.farmTask?.["waterFriendTaskInit"]?.["waterFriendCountKey"] < $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] && (await l1ill1Ii()) : console.log("给" + $.farmTask?.["waterFriendTaskInit"]?.["waterFriendMax"] + "个好友浇水任务已完成\n");
  await lliii111();
  await IlIl1ill();
  await iIiliI();
  await lili1iil();
  await i11Il1iI();
}

async function lliii111() {
  await lIlIl1l1();
  const Ill1Iil = $.farmTask["treasureBoxInit-getBean"];

  if (!Ill1Iil) {
    console.log("此帐号不支持去首页逛逛“领京豆”任务");
    return;
  }

  !Ill1Iil.f ? (console.log("正在进行任务：" + Ill1Iil?.["taskMainTitle"]), await lii1iii(1), $.treasureResult?.["code"] == "0" && (await I1ilIIiI(), await $.wait(1000), await lii1iii(2), $.treasureRwardResult?.["code"] == "0" ? console.log("领取" + Ill1Iil?.["taskMainTitle"] + "奖励：" + $.treasureRwardResult?.["waterGram"] + "g水滴") : console.log("领取" + Ill1Iil?.["taskMainTitle"] + "奖励失败"))) : console.log(Ill1Iil?.["taskMainTitle"] + " 已完成");
}

async function l1IiIIli() {
  await I1iiIIii();
  $.gotNewUserTaskForFarmResult?.["code"] === "0" ? console.log("领取回归礼包成功，" + $.gotNewUserTaskForFarmResult?.["addEnergy"] + "g") : console.log("领取回归礼包失败：" + JSON.stringify($.gotNewUserTaskForFarmResult));
}

async function IlIIllii() {
  console.log("开始预测水果成熟时间\n");
  await Ii1iIiI();
  await lIlIl1l1();
  let iIIilI1l = $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"];
  message += "【今日共浇水】" + iIIilI1l + "次\n";
  message += "【剩余 水滴】" + $.farmInfo?.["farmUserPro"]?.["totalEnergy"] + "g💧\n";
  message += "【水果🍉进度】" + ($.farmInfo?.["farmUserPro"]?.["treeEnergy"] / $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] * 100).toFixed(2) + "%，已浇水" + $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 + "次,还需" + ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10 + "次\n";
  if ($.farmInfo?.["toFlowTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) message += "【开花进度】再浇水" + ($.farmInfo?.["toFlowTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次开花\n";else $.farmInfo?.["toFruitTimes"] > $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10 && (message += "【结果进度】再浇水" + ($.farmInfo?.["toFruitTimes"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] / 10) + "次结果\n");
  let IiiiI1i1 = ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"] - $.farmInfo?.["farmUserPro"]?.["totalEnergy"]) / 10,
      i1ilIll1 = Math.ceil(IiiiI1i1 / iIIilI1l);
  message += "【预测】" + (i1ilIll1 === 1 ? "明天" : i1ilIll1 === 2 ? "后天" : i1ilIll1 + "天之后") + "(" + Ii111I1i(24 * 60 * 60 * 1000 * i1ilIll1 + Date.now()) + "日)可兑换水果🍉";
}

async function li11III1() {
  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);
  await lii1l11I();
  const {
    fastCard: l1ll1lIi,
    doubleCard: IIl1i11,
    beanCard: iI1I1,
    signCard: l1illlII
  } = $.myCardInfoRes;

  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍") && iI1I1 > 0) {
    console.log("您设置的是使用水滴换豆卡，且背包有水滴换豆卡" + iI1I1 + "张, 跳过10次浇水任务");
    return;
  }

  if ($.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) {
    console.log("\n准备浇水十次");
    let liliil1l = 0;
    isFruitFinished = false;

    for (; liliil1l < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] - $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"]; liliil1l++) {
      console.log("第" + (liliil1l + 1) + "次浇水");
      await l1liIiil();
      await $.wait(2000);
      console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

      if ($.waterResult?.["code"] === "0") {
        console.log("剩余水滴" + $.waterResult?.["totalEnergy"] + "g");

        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        } else {
          if ($.waterResult?.["totalEnergy"] < 10) {
            console.log("水滴不够，结束浇水");
            break;
          }

          await i111IlII();
        }
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }

    isFruitFinished && (option["open-url"] = ll1lIll, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else console.log("\n今日已完成10次浇水任务\n");
}

async function Iii1l11I() {
  await lIlIl1l1();
  !$.farmTask?.["firstWaterInit"]["f"] && $.farmTask?.["firstWaterInit"]?.["totalWaterTimes"] > 0 ? (await iII1l1I1(), $.firstWaterReward?.["code"] === "0" ? console.log("【首次浇水奖励】获得" + $.firstWaterReward?.["amount"] + "g💧\n") : console.log("领取首次浇水奖励结果:  " + JSON.stringify($.firstWaterReward))) : console.log("首次浇水奖励已领取\n");
}

async function lIiiiII() {
  if (!$.farmTask?.["totalWaterTaskInit"]?.["f"] && $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] >= $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"]) await I1lIII11(), $.totalWaterReward?.["code"] === "0" ? console.log("【十次浇水奖励】获得" + $.totalWaterReward?.["totalWaterTaskEnergy"] + "g💧\n") : console.log("领取10次浇水奖励结果:  " + JSON.stringify($.totalWaterReward));else $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] < $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskLimit"] && console.log("【十次浇水奖励】任务未完成，今日浇水" + $.farmTask?.["totalWaterTaskInit"]?.["totalWaterTaskTimes"] + "次\n");
  console.log("finished 水果任务完成!");
}

async function li1lli1i() {
  console.log("开始检查剩余水滴能否再次浇水再次浇水\n");
  await Ii1iIiI();
  let IlI1lIl1 = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  console.log("剩余水滴" + IlI1lIl1 + "g\n");
  await lii1l11I();
  const {
    fastCard: Iiili111,
    doubleCard: l1IilliI,
    beanCard: llIl1liI,
    signCard: iI1iIII1
  } = $.myCardInfoRes;
  console.log("背包已有道具:\n快速浇水卡:" + (Iiili111 === -1 ? "未解锁" : Iiili111 + "张") + "\n水滴翻倍卡:" + (l1IilliI === -1 ? "未解锁" : l1IilliI + "张") + "\n水滴换京豆卡:" + (llIl1liI === -1 ? "未解锁" : llIl1liI + "张") + "\n加签卡:" + (iI1iIII1 === -1 ? "未解锁" : iI1iIII1 + "张") + "\n");

  if (IlI1lIl1 >= 100 && l1IilliI > 0) {
    for (let iiIli1i1 = 0; iiIli1i1 < new Array(l1IilliI).fill("").length; iiIli1i1++) {
      await I1i1ilI("doubleCard");
      console.log("使用翻倍水滴卡结果:" + JSON.stringify($.userMyCardRes));
    }

    await Ii1iIiI();
    IlI1lIl1 = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }

  if (iI1iIII1 > 0) {
    for (let ll111li1 = 0; ll111li1 < new Array(iI1iIII1).fill("").length; ll111li1++) {
      await I1i1ilI("signCard");
      console.log("使用加签卡结果:" + JSON.stringify($.userMyCardRes));
    }

    await Ii1iIiI();
    IlI1lIl1 = $.farmInfo?.["farmUserPro"]?.["totalEnergy"];
  }

  jdFruitBeanCard = $.getdata("jdFruitBeanCard") ? $.getdata("jdFruitBeanCard") : jdFruitBeanCard;
  $.isNode() && process.env.FRUIT_BEAN_CARD && (jdFruitBeanCard = process.env.FRUIT_BEAN_CARD);

  if ("" + jdFruitBeanCard === "true" && JSON.stringify($.myCardInfoRes).match("限时翻倍")) {
    console.log("\n您设置的是水滴换豆功能,现在为您换豆");

    if (IlI1lIl1 >= 100 && $.myCardInfoRes?.["beanCard"] > 0) {
      await I1i1ilI("beanCard");
      console.log("使用水滴换豆卡结果:" + JSON.stringify($.userMyCardRes));

      if ($.userMyCardRes.code === "0") {
        message += "【水滴换豆卡】获得" + $.userMyCardRes?.["beanCount"] + "个京豆\n";
        return;
      }
    } else console.log("您目前水滴:" + IlI1lIl1 + "g,水滴换豆卡" + $.myCardInfoRes?.["beanCard"] + "张,暂不满足水滴换豆的条件,为您继续浇水");
  }

  if (IlI1lIl1 < retainWater) {
    console.log("保留水滴不足,停止继续浇水");
    return;
  }

  let liiII11 = IlI1lIl1 - retainWater;

  if (liiII11 >= $.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) {
    isFruitFinished = false;

    for (let l1llIiii = 0; l1llIiii < ($.farmInfo?.["farmUserPro"]?.["treeTotalEnergy"] - $.farmInfo?.["farmUserPro"]?.["treeEnergy"]) / 10; l1llIiii++) {
      await l1liIiil();
      console.log("本次浇水结果(水果马上就可兑换了):   " + JSON.stringify($.waterResult));

      if ($.waterResult?.["code"] === "0") {
        console.log("\n浇水10g成功\n");

        if ($.waterResult?.["finished"]) {
          isFruitFinished = true;
          break;
        } else console.log("目前水滴【" + $.waterResult?.["totalEnergy"] + "】g,继续浇水，水果马上就可以兑换了");
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }

    isFruitFinished && (option["open-url"] = ll1lIll, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
  } else {
    if (liiII11 >= 10) {
      console.log("目前剩余水滴：【" + IlI1lIl1 + "】g，可继续浇水");
      isFruitFinished = false;

      for (let iIIli11l = 0; iIIli11l < parseInt(liiII11 / 10); iIIli11l++) {
        await l1liIiil();
        console.log("本次浇水结果:   " + JSON.stringify($.waterResult));

        if ($.waterResult?.["code"] === "0") {
          console.log("\n浇水10g成功,剩余" + $.waterResult?.["totalEnergy"] + "\n");

          if ($.waterResult?.["finished"]) {
            isFruitFinished = true;
            break;
          } else await i111IlII();
        } else {
          console.log("浇水出现失败异常,跳出不在继续浇水");
          break;
        }
      }

      isFruitFinished && (option["open-url"] = ll1lIll, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取\n请去京东APP或微信小程序查看\n点击弹窗即达", option), $.done(), $.isNode() && (await notify.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n" + $.farmInfo?.["farmUserPro"]?.["name"] + "已可领取")));
    } else console.log("目前剩余水滴：【" + IlI1lIl1 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");
  }
}

function i111IlII() {
  return new Promise(async llliI1iI => {
    if ($.waterResult?.["waterStatus"] === 0 && $.waterResult?.["treeEnergy"] === 10) console.log("果树发芽了,奖励30g水滴"), await liIilI1i("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "\n");else {
      if ($.waterResult?.["waterStatus"] === 1) console.log("果树开花了,奖励40g水滴"), await liIilI1i("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n");else $.waterResult?.["waterStatus"] === 2 && (console.log("果树长出小果子啦, 奖励50g水滴"), await liIilI1i("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes?.["code"] === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes?.["addEnergy"] + "g💧\n"));
    }
    llliI1iI();
  });
}

async function i11Il1iI() {
  await l1II111l();

  if ($.initForTurntableFarmRes.code === "0") {
    let {
      timingIntervalHours: IlII11,
      timingLastSysTime: iIi1iliI,
      sysTime: lIi111Il,
      timingGotStatus: lIi1lI1l,
      remainLotteryTimes: ill11il1,
      turntableInfos: I1IllIii
    } = $.initForTurntableFarmRes;
    !lIi1lI1l ? (console.log("是否到了领取免费赠送的抽奖机会----" + (lIi111Il > iIi1iliI + 60 * 60 * IlII11 * 1000)), lIi111Il > iIi1iliI + 60 * 60 * IlII11 * 1000 ? (await iI1i1i11(), console.log("领取定时奖励结果" + JSON.stringify($.timingAwardRes)), await l1II111l(), ill11il1 = $.initForTurntableFarmRes?.["remainLotteryTimes"]) : console.log("免费赠送的抽奖机会未到时间")) : console.log("4小时候免费赠送的抽奖机会已领取");
    if ($.initForTurntableFarmRes?.["turntableBrowserAds"] && $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"] > 0) for (let IIlliliI = 0; IIlliliI < $.initForTurntableFarmRes?.["turntableBrowserAds"]["length"]; IIlliliI++) {
      !$.initForTurntableFarmRes?.["turntableBrowserAds"][IIlliliI]["status"] ? (console.log("开始浏览天天抽奖的第" + (IIlliliI + 1) + "个逛会场任务"), await IilI1ill(1, $.initForTurntableFarmRes?.["turntableBrowserAds"][IIlliliI]["adId"]), $.browserForTurntableFarmRes?.["code"] === "0" && $.browserForTurntableFarmRes?.["status"] && (console.log("第" + (IIlliliI + 1) + "个逛会场任务完成，开始领取水滴奖励\n"), await IilI1ill(2, $.initForTurntableFarmRes?.["turntableBrowserAds"][IIlliliI]["adId"]), $.browserForTurntableFarmRes?.["code"] === "0" && (console.log("第" + (IIlliliI + 1) + "个逛会场任务领取水滴奖励完成\n"), await l1II111l(), ill11il1 = $.initForTurntableFarmRes?.["remainLotteryTimes"]))) : console.log("浏览天天抽奖的第" + (IIlliliI + 1) + "个逛会场任务已完成");
    }
    console.log("---天天抽奖次数----" + ill11il1 + "次");

    if (ill11il1 > 0) {
      console.log("开始抽奖");
      let IliIi = "";

      for (let I1I1ill1 = 0; I1I1ill1 < new Array(ill11il1).fill("").length; I1I1ill1++) {
        await IIi1I1II();
        console.log("第" + (I1I1ill1 + 1) + "次抽奖结果" + JSON.stringify($.lotteryRes));

        if ($.lotteryRes?.["code"] === "0") {
          I1IllIii.map(IiiI1I1l => {
            if (IiiI1I1l.type === $.lotteryRes?.["type"]) {
              console.log("lotteryRes.type" + $.lotteryRes.type);
              if ($.lotteryRes.type.match(/bean/g) && $.lotteryRes.type.match(/bean/g)[0] === "bean") IliIi += IiiI1I1l.name + "个，";else $.lotteryRes.type.match(/water/g) && $.lotteryRes.type.match(/water/g)[0] === "water" ? IliIi += IiiI1I1l.name + "，" : IliIi += IiiI1I1l.name + "，";
            }
          });
          if ($.lotteryRes?.["remainLotteryTimes"] === 0) break;
        }
      }

      IliIi && console.log("【天天抽奖】" + IliIi.substr(0, IliIi.length - 1) + "\n");
    } else console.log("天天抽奖--抽奖机会为0次");
  } else console.log("初始化天天抽奖得好礼失败");
}

async function lili1iil() {
  await IiilIIii();

  if ($.farmAssistResult?.["code"] === "0") {
    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]?.["length"] >= 2) {
      if ($.farmAssistResult?.["status"] === 2) {
        let Il1iIIII = 0;

        for (let I1i1i1lI of Object.keys($.farmAssistResult.assistStageList)) {
          let Iii1li = $.farmAssistResult?.["assistStageList"][I1i1i1lI];
          Iii1li.stageStaus === 2 && (await ii1(), $.receiveStageEnergy.code === "0" && (console.log("已成功领取第" + (I1i1i1lI + 1) + "阶段好友助力奖励：【" + $.receiveStageEnergy?.["amount"] + "】g水"), Il1iIIII += $.receiveStageEnergy?.["amount"]));
        }

        message += "【额外奖励】" + Il1iIIII + "g水领取成功\n";
      } else $.farmAssistResult?.["status"] === 3 && (console.log("已经领取过8好友助力额外奖励"), message += "【额外奖励】已被领取过\n");
    } else console.log("助力好友未达到2个"), message += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

    if ($.farmAssistResult?.["assistFriendList"] && $.farmAssistResult?.["assistFriendList"]["length"] > 0) {
      let Iil1il1i = "";
      $.farmAssistResult?.["assistFriendList"]["map"]((iil1lII1, IIIIi1Ii) => {
        IIIIi1Ii === $.farmAssistResult?.["assistFriendList"]["length"] - 1 ? Iil1il1i += iil1lII1.nickName || "匿名用户" : Iil1il1i += (iil1lII1.nickName || "匿名用户") + ",";
        let II1Il11i = new Date(iil1lII1.time),
            IlI1lI1 = II1Il11i.getFullYear() + "-" + (II1Il11i.getMonth() + 1) + "-" + II1Il11i.getDate() + " " + II1Il11i.getHours() + ":" + II1Il11i.getMinutes() + ":" + II1Il11i.getMinutes();
        console.log("\n京东昵称【" + (iil1lII1.nickName || "匿名用户") + "】 在 " + IlI1lI1 + " 给您助过力\n");
      });
      message += "【助力您的好友】" + Iil1il1i + "\n";
    }

    console.log("领取额外奖励水滴结束\n");
  } else {
    await iIIIli11();

    if ($.masterHelpResult?.["code"] === "0") {
      $.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] >= 5 ? !$.masterHelpResult?.["masterGotFinal"] ? (await i1iii1i(), $.masterGotFinished?.["code"] === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished?.["amount"] + "】g水"), message += "【额外奖励】" + $.masterGotFinished?.["amount"] + "g水领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), message += "【额外奖励】已被领取过\n") : (console.log("助力好友未达到5个"), message += "【额外奖励】领取失败,原因：给您助力的人未达5个\n");

      if ($.masterHelpResult?.["masterHelpPeoples"] && $.masterHelpResult?.["masterHelpPeoples"]["length"] > 0) {
        let lIiI1ilI = "";
        $.masterHelpResult?.["masterHelpPeoples"]["map"]((I1iI1I11, ll1ilIl1) => {
          ll1ilIl1 === $.masterHelpResult?.["masterHelpPeoples"]["length"] - 1 ? lIiI1ilI += I1iI1I11.nickName || "匿名用户" : lIiI1ilI += (I1iI1I11.nickName || "匿名用户") + ",";
          let lli1lIIl = new Date(I1iI1I11.time),
              IIIlliii = lli1lIIl.getFullYear() + "-" + (lli1lIIl.getMonth() + 1) + "-" + lli1lIIl.getDate() + " " + lli1lIIl.getHours() + ":" + lli1lIIl.getMinutes() + ":" + lli1lIIl.getMinutes();
          console.log("\n京东昵称【" + (I1iI1I11.nickName || "匿名用户") + "】 在 " + IIIlliii + " 给您助过力\n");
        });
        message += "【助力您的好友】" + lIiI1ilI + "\n";
      }

      console.log("领取额外奖励水滴结束\n");
    }
  }
}

async function iIiliI() {
  let IIlIi11 = !$.farmTask?.["waterRainInit"]?.["f"];
  if (IIlIi11) console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask?.["waterRainInit"]?.["f"] ? "是" : "否")), $.farmTask?.["waterRainInit"]?.["lastTime"] && Date.now() < $.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000 && (IIlIi11 = false, console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】未到时间，请" + new Date($.farmTask?.["waterRainInit"]?.["lastTime"] + 3 * 60 * 60 * 1000).toLocaleTimeString() + "再试\n")), IIlIi11 && (console.log("开始水滴雨任务,这是第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次，剩余" + (2 - ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1)) + "次"), await i1i1I(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain?.["addEnergy"] + "g"), console.log("【第" + ($.farmTask?.["waterRainInit"]?.["winTimes"] + 1) + "次水滴雨】获得" + $.waterRain?.["addEnergy"] + "g水滴\n")));else {}
}

async function IlIl1ill() {
  console.log("开始打卡领水活动（签到，关注，领券）");
  await iIlIlil1();

  if ($.clockInInit.code === "0") {
    if (!$.clockInInit.todaySigned) {
      console.log("开始今日签到");
      await lI1ilI1i();
      console.log("打卡结果" + JSON.stringify($.clockInForFarmRes));

      if ($.clockInForFarmRes?.["code"] === "0") {
        console.log("【第" + $.clockInForFarmRes?.["signDay"] + "天签到】获得" + $.clockInForFarmRes?.["amount"] + "g💧\n");
        $.clockInForFarmRes?.["signDay"] === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await l1i1i11I(), $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"));
      }
    }

    $.clockInInit?.["todaySigned"] && $.clockInInit?.["totalSigned"] === 7 && (console.log("开始领取--惊喜礼包38g水滴"), await l1i1i11I(), $.gotClockInGiftRes?.["code"] === "0" && console.log("【惊喜礼包】获得" + $.gotClockInGiftRes?.["amount"] + "g💧\n"));
    if ($.clockInInit?.["themes"] && $.clockInInit?.["themes"]["length"] > 0) for (let iIllIII of $.clockInInit?.["themes"]) {
      !iIllIII?.["hadGot"] && (console.log("关注ID" + iIllIII?.["id"]), await lll1IIlI(iIllIII?.["id"], "theme", "1"), console.log("themeStep1--结果" + JSON.stringify($.themeStep1)), $.themeStep1?.["code"] === "0" && (await lll1IIlI(iIllIII.id, "theme", "2"), console.log("themeStep2--结果" + JSON.stringify($.themeStep2)), $.themeStep2.code === "0" && console.log("关注" + iIllIII.name + "，获得水滴" + $.themeStep2?.["amount"] + "g")));
    }
    if ($.clockInInit?.["venderCoupons"] && $.clockInInit?.["venderCoupons"]["length"] > 0) for (let l1i1i1ii of $.clockInInit?.["venderCoupons"]) {
      !l1i1i1ii.hadGot && (console.log("领券的ID" + l1i1i1ii.id), await lll1IIlI(l1i1i1ii.id, "venderCoupon", "1"), console.log("venderCouponStep1--结果" + JSON.stringify($.venderCouponStep1)), $.venderCouponStep1?.["code"] === "0" && (await lll1IIlI(l1i1i1ii.id, "venderCoupon", "2"), $.venderCouponStep2?.["code"] === "0" && (console.log("venderCouponStep2--结果" + JSON.stringify($.venderCouponStep2)), console.log("从" + l1i1i1ii.name + "领券，获得水滴" + $.venderCouponStep2?.["amount"] + "g"))));
    }
  }

  console.log("开始打卡领水活动（签到，关注，领券）结束\n");
}

async function l1ill1Ii() {
  await I1Iii1();
  console.log("开始给好友浇水...");
  await lIlIl1l1();
  const {
    waterFriendCountKey: liI111ll,
    waterFriendMax: IliIIiil
  } = $.farmTask?.["waterFriendTaskInit"];
  console.log("今日已给" + liI111ll + "个好友浇水");

  if (liI111ll < IliIIiil) {
    let lIi11ll = [];

    if ($.friendList?.["friends"] && $.friendList?.["friends"]["length"] > 0) {
      $.friendList.friends.map((Ii1Il1Ii, iI1IIlI1) => {
        Ii1Il1Ii.friendState === 1 && lIi11ll.length < IliIIiil - liI111ll && lIi11ll.push(Ii1Il1Ii.shareCode);
      });
      console.log("需要浇水的好友列表shareCodes:" + JSON.stringify(lIi11ll));
      let lIIl111i = 0,
          iIIiII1i = "";

      for (let lI1lIlI1 = 0; lI1lIlI1 < lIi11ll.length; lI1lIlI1++) {
        await IIi1lIl1(lIi11ll[lI1lIlI1]);
        console.log("为第" + (lI1lIlI1 + 1) + "个好友浇水结果:" + JSON.stringify($.waterFriendForFarmRes) + "\n");

        if ($.waterFriendForFarmRes?.["code"] === "0") {
          lIIl111i++;

          if ($.waterFriendForFarmRes?.["cardInfo"]) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIiII1i += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIiII1i += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIiII1i += "水滴翻倍卡,";else $.waterFriendForFarmRes?.["cardInfo"]?.["type"] === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes?.["cardInfo"]?.["rule"]), iIIiII1i += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes?.["code"] === "11" && console.log("水滴不够,跳出浇水");
      }

      console.log("【好友浇水】已给" + lIIl111i + "个好友浇水,消耗" + lIIl111i * 10 + "g水\n");
      iIIiII1i && iIIiII1i.length > 0 && console.log("【好友浇水奖励】" + iIIiII1i.substr(0, iIIiII1i.length - 1) + "\n");
    } else console.log("您的好友列表暂无好友,快去邀请您的好友吧!");
  } else console.log("今日已为好友浇水量已达" + IliIIiil + "个");
}

async function l1IiIl1i() {
  await lIlIl1l1();
  const {
    waterFriendCountKey: I111ll,
    waterFriendMax: I1iil111,
    waterFriendSendWater: lIIiIii,
    waterFriendGotAward: iI1I1il
  } = $.farmTask.waterFriendTaskInit;

  if (I111ll >= I1iil111) {
    if (!iI1I1il) {
      await liI1I1il();
      console.log("领取给" + I1iil111 + "个好友浇水后的奖励水滴::" + JSON.stringify($.waterFriendGotAwardRes));
      $.waterFriendGotAwardRes?.["code"] === "0" && console.log("【给" + I1iil111 + "好友浇水】奖励" + $.waterFriendGotAwardRes?.["addWater"] + "g水滴\n");
    } else console.log("给好友浇水的" + lIIiIii + "g水滴奖励已领取\n");
  } else console.log("暂未给" + I1iil111 + "个好友浇水\n");
}

async function iI1lI1lI() {
  for (let Il1IilIi = 0; Il1IilIi < 10; Il1IilIi++) {
    await lIIil1I1();

    if ($.duckRes?.["code"] === "0") {
      if (!$.duckRes?.["hasLimit"]) console.log("小鸭子游戏:" + $.duckRes?.["title"]);else {
        console.log("" + $.duckRes?.["title"]);
        break;
      }
    } else {
      if ($.duckRes?.["code"] === "10") {
        console.log("小鸭子游戏达到上限");
        break;
      }
    }
  }
}

async function IilIilli() {
  try {
    await Ii1iIiI();
    if ($.farmInfo.farmUserPro) console.log("\n【京东账号" + $.index + "（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo?.["farmUserPro"]?.["shareCode"] + "\n"), jdFruitShareArr.push($.farmInfo.farmUserPro.shareCode);else {}
  } catch (ii1I1i1i) {
    $.logErr(ii1I1i1i);
  }
}

function I1ilIIiI() {
  return new Promise(IIIlI1li => {
    const l1ill1i = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList",
      "body": "body=%7B%22viewChannel%22%3A%22AppHome%22%7D&build=167853&client=apple&clientVersion=10.2.0&d_brand=apple&d_model=iPhone11%2C8&ef=1&eid=eidIf12a8121eas2urxgGc%2BzS5%2BUYGu1Nbed7bq8YY%2BgPd0Q0t%2BiviZdQsxnK/HTA7AxZzZBrtu1ulwEviYSV3QUuw2XHHC%2BPFHdNYx1A/3Zt8xYR%2Bd3&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22ENS4AtO3EJS%3D%22%2C%22osVersion%22%3A%22CJGkDy4n%22%2C%22openudid%22%3A%22ENq3CzTwENGmYtc3ENSnYtC0DWTwCNdwZNcnZtYmEWU2ZwYnCwY0Cm%3D%3D%22%2C%22area%22%3A%22CJvpCJYmCV81CNS1EP82Ctq1EK%3D%3D%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1637625634%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%7D&isBackground=N&joycious=117&lang=zh_CN&networkType=4g&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=11&sign=778b3d3d83e0d3f45508a958f306abda&st=1637627411874&sv=101&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJ1DpIH6AlcMry0eQsMwEN/GgP2FpcEJvoNVODK8ho6G6xfFEYSmOOdwauVOUqIQFPdxhcdWdM05U%2BMN5h6umteQ78SpJGXOymjKiTiGjvSOiTpoqO8k%2BT6stsfe0WS9QQ41HfWeVF6cdpDTzsmufz0XDdJ6CcltPUazK5UqRSuo0UyDMBmw/oWg%3D%3D",
      "headers": {
        "Cookie": cookie,
        "Host": "api.m.jd.com",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
        "Accept-Encoding": "gzip,deflate,br",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    $.post(l1ill1i, (iiiiIill, IIliIiiI, iIiIi11) => {
      try {
        if (iiiiIill) {
          console.log("" + JSON.stringify(iiiiIill));
          console.log($.name + " beanTaskList API请求失败，请检查网路重试");
        } else iIiIi11 = $.toObj(iIiIi11);
      } catch (i1IiilI) {
        $.logErr(i1IiilI, IIliIiiI);
      } finally {
        IIIlI1li();
      }
    });
  });
}

async function lIIil1I1() {
  $.duckRes = await iIlI1IlI("totalWaterTaskForFarm", {
    "type": 2,
    "version": 6,
    "channel": 2
  });
}

async function I1lIII11() {
  $.totalWaterReward = await iIlI1IlI("totalWaterTaskForFarm");
}

async function iII1l1I1() {
  $.firstWaterReward = await iIlI1IlI("firstWaterTaskForFarm");
}

async function liI1I1il() {
  $.waterFriendGotAwardRes = await iIlI1IlI("waterFriendGotAwardForFarm", {
    "version": 4,
    "channel": 1
  });
}

async function lii1l11I() {
  $.myCardInfoRes = await iIlI1IlI("myCardInfoForFarm", {
    "version": 5,
    "channel": 1
  });
}

async function I1i1ilI(IlIl1liI) {
  $.userMyCardRes = await iIlI1IlI("userMyCardForFarm", {
    "cardType": IlIl1liI
  });
}

async function liIilI1i(I1lIi1l) {
  $.gotStageAwardForFarmRes = await iIlI1IlI("gotStageAwardForFarm", {
    "type": I1lIi1l
  });
}

async function l1liIiil() {
  await $.wait(1000);
  console.log("等待了1秒");
  $.waterResult = await iIlI1IlI("waterGoodForFarm");
}

async function l1II111l() {
  $.initForTurntableFarmRes = await iIlI1IlI("initForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}

async function IIi1I1II() {
  await $.wait(2000);
  console.log("等待了2秒");
  $.lotteryRes = await iIlI1IlI("lotteryForTurntableFarm", {
    "type": 1,
    "version": 4,
    "channel": 1
  });
}

async function iI1i1i11() {
  $.timingAwardRes = await iIlI1IlI("timingAwardForTurntableFarm", {
    "version": 4,
    "channel": 1
  });
}

async function IilI1ill(il1iil1l, illIIlII) {
  il1iil1l === 1 && console.log("浏览爆品会场");
  il1iil1l === 2 && console.log("天天抽奖浏览任务领取水滴");
  const IiiIiII1 = {
    "type": il1iil1l,
    "adId": illIIlII,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarmRes = await iIlI1IlI("browserForTurntableFarm", IiiIiII1);
}

async function i1111il1(IiilliIl) {
  const IIIl1l1I = {
    "type": 2,
    "adId": IiilliIl,
    "version": 4,
    "channel": 1
  };
  $.browserForTurntableFarm2Res = await iIlI1IlI("browserForTurntableFarm", IIIl1l1I);
}

async function IIiIIllI() {
  $.lotteryMasterHelpRes = await iIlI1IlI("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 4,
    "channel": 1
  });
}

async function i1iii1i() {
  $.masterGotFinished = await iIlI1IlI("masterGotFinishedTaskForFarm");
}

async function iIIIli11() {
  $.masterHelpResult = await iIlI1IlI("masterHelpTaskInitForFarm");
}

async function IiilIIii() {
  $.farmAssistResult = await iIlI1IlI("farmAssistInit", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}

async function ii1() {
  $.receiveStageEnergy = await iIlI1IlI("receiveStageEnergy", {
    "version": 14,
    "channel": 1,
    "babelChannel": "120"
  });
}

async function li1lli11() {
  $.inviteFriendRes = await iIlI1IlI("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}

async function I1iil1lI() {
  $.helpResult = await iIlI1IlI("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}

async function i1i1I() {
  const IIliI11I = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 3
  };
  $.waterRain = await iIlI1IlI("waterRainForFarm", IIliI11I);
}

async function iIlIlil1() {
  $.clockInInit = await iIlI1IlI("clockInInitForFarm");
}

async function lI1ilI1i() {
  $.clockInForFarmRes = await iIlI1IlI("clockInForFarm", {
    "type": 1
  });
}

async function lll1IIlI(iiil1iIl, l1liii, iIil11Il) {
  let li1lIllI = {
    "id": iiil1iIl,
    "type": l1liii,
    "step": iIil11Il
  };

  if (l1liii === "theme") {
    if (iIil11Il === "1") $.themeStep1 = await iIlI1IlI("clockInFollowForFarm", li1lIllI);else iIil11Il === "2" && ($.themeStep2 = await iIlI1IlI("clockInFollowForFarm", li1lIllI));
  } else {
    if (l1liii === "venderCoupon") {
      if (iIil11Il === "1") $.venderCouponStep1 = await iIlI1IlI("clockInFollowForFarm", li1lIllI);else iIil11Il === "2" && ($.venderCouponStep2 = await iIlI1IlI("clockInFollowForFarm", li1lIllI));
    }
  }
}

async function l1i1i11I() {
  $.gotClockInGiftRes = await iIlI1IlI("gotClockInGift", {
    "type": 2
  });
}

async function illl1iil() {
  $.threeMeal = await iIlI1IlI("gotThreeMealForFarm");
}

async function liIlIlIi(iillll1, Il11il1l) {
  if (Il11il1l === 0) $.browseResult = await iIlI1IlI("browseAdTaskForFarm", {
    "advertId": iillll1,
    "type": Il11il1l
  });else Il11il1l === 1 && ($.browseRwardResult = await iIlI1IlI("browseAdTaskForFarm", {
    "advertId": iillll1,
    "type": Il11il1l
  }));
}

async function lii1iii(l1iiiiI) {
  const iII1lII = {
    "type": l1iiiiI,
    "babelChannel": "45",
    "line": "getBean",
    "version": 18,
    "channel": 1
  };
  if (l1iiiiI === 1) $.treasureResult = await iIlI1IlI("ddnc_getTreasureBoxAward", iII1lII);else l1iiiiI === 2 && ($.treasureRwardResult = await iIlI1IlI("ddnc_getTreasureBoxAward", iII1lII));
}

async function ilII11lI() {
  $.goalResult = await iIlI1IlI("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}

async function iIllIIIi() {
  $.signResult = await iIlI1IlI("signForFarm");
}

async function I1iiIIii() {
  const ilI1I1il = {
    "babelChannel": "10",
    "version": 24,
    "lat": liilIi1l,
    "lng": i1IIIIl1
  };
  $.gotNewUserTaskForFarmResult = await iIlI1IlI("gotNewUserTaskForFarm", ilI1I1il);
}

async function Ii1iIiI() {
  $.farmInfo = await iIlI1IlI("initForFarm", {
    "mpin": "",
    "utm_campaign": "",
    "utm_medium": "appshare",
    "shareCode": "",
    "utm_term": "Wxfriends",
    "utm_source": "iosapp",
    "imageUrl": "",
    "nickName": "",
    "babelChannel": "10",
    "sid": IIiiIiI1,
    "un_area": II11i11i,
    "version": 22,
    "lat": liilIi1l,
    "lng": i1IIIIl1,
    "channel": 1
  });
}

async function lIlIl1l1() {
  console.log("\n初始化任务列表");
  $.farmTask = await iIlI1IlI("taskInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function I1Iii1() {
  $.friendList = await iIlI1IlI("friendListInitForFarm", {
    "version": 18,
    "channel": 1,
    "babelChannel": "45"
  });
}

async function IIilIi1l() {
  $.awardInviteFriendRes = await iIlI1IlI("awardInviteFriendForFarm");
}

async function IIi1lIl1(lli11iiI) {
  const Ill1i1i = {
    "shareCode": lli11iiI,
    "version": 18,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await iIlI1IlI("waterFriendForFarm", Ill1i1i);
}

async function lIiIiIii() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + jdNotify === "false";

  if ($.ctrTemp) {
    $.msg($.name, subTitle, message, option);

    if ($.isNode()) {
      allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n" : "");
    }
  } else $.log("" + message);
}

function Ii111I1i(ii1i11l) {
  let IlI1ili;
  if (ii1i11l) IlI1ili = new Date(ii1i11l);else {
    IlI1ili = new Date();
  }
  return IlI1ili.getFullYear() + "-" + (IlI1ili.getMonth() + 1 >= 10 ? IlI1ili.getMonth() + 1 : "0" + (IlI1ili.getMonth() + 1)) + "-" + (IlI1ili.getDate() >= 10 ? IlI1ili.getDate() : "0" + IlI1ili.getDate());
}

function llIiIl1l() {
  return new Promise(iIIIl1ll => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";
    const IIiIill1 = $.isNode() ? require("./jdCookie.js") : "";

    if ($.isNode()) {
      Object.keys(IIiIill1).forEach(IiIiliiI => {
        IIiIill1[IiIiliiI] && cookiesArr.push(IIiIill1[IiIiliiI]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiIIIIi1($.getdata("CookiesJD") || "[]").map(ililii11 => ililii11.cookie)].filter(lI11Iii1 => !!lI11Iii1);

    console.log("共" + cookiesArr.length + "个京东账号\n");
    $.shareCodesArr = [];
    iIIIl1ll();
  });
}

function iIlI1IlI(liilI11l, il1lI1I = {}, lli1lII = 10000) {
  return new Promise(ililiI1i => {
    setTimeout(async () => {
      $.post(await II111iI1(liilI11l, il1lI1I), (liI1llii, I11lII11, IllIi1li) => {
        try {
          liI1llii ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(liI1llii)), console.log("function_id:" + liilI11l), $.logErr(liI1llii)) : Illll1l1(IllIi1li) && (IllIi1li = JSON.parse(IllIi1li));
        } catch (ilIlIiil) {
          $.logErr(ilIlIiil, I11lII11);
        } finally {
          ililiI1i(IllIi1li);
        }
      });
    }, lli1lII);
  });
}

function Illll1l1(ll1iIIll) {
  if (!ll1iIIll) return console.log("京东服务器返回数据为空"), false;

  try {
    if (typeof JSON.parse(ll1iIIll) == "object") return true;
  } catch (i11iI1ll) {
    return console.log(i11iI1ll), false;
  }
}

const l11l11li = {
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

async function II111iI1(i1Illi1l, Iil11Il = {}) {
  let l1lIii11 = "";
  if (!l11l11li[i1Illi1l]) l1lIii11 = "https://api.m.jd.com/client.action?functionId=" + i1Illi1l + "&body=" + encodeURIComponent(JSON.stringify(Iil11Il)) + "&appid=wh5";else {
    const illIilii = {
      "appid": "signed_wh5",
      "client": "iOS",
      "clientVersion": "10.1.0",
      "functionId": i1Illi1l,
      "body": Iil11Il
    },
          I1Iiliii = await ll1ilI11(l11l11li[i1Illi1l], illIilii);
    l1lIii11 = "https://api.m.jd.com/client.action?" + I1Iiliii;
  }
  return {
    "url": l1lIii11,
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

async function ll1ilI11(iii1111, I1lIliiI) {
  try {
    let llllIIli = new I1lllIl1({
      "appId": iii1111,
      "appid": "signed_wh5",
      "clientVersion": I1lIliiI?.["clientVersion"],
      "client": I1lIliiI?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await llllIIli.genAlgo(), body = await llllIIli.genUrlParams(I1lIliiI.functionId, I1lIliiI.body), body;
  } catch (i1Ii1il1) {}
}

async function i1i1I111(IIiilII, liIlIiII) {
  let IIIlIIi1 = {
    "searchParams": { ...liIlIiII,
      "appId": IIiilII
    },
    "pt_pin": $.UserName,
    "client": liIlIiII?.["client"],
    "clientVersion": liIlIiII?.["clientVersion"]
  },
      i1iI1i = {
    "Content-Type": "application/json",
    "User-Agent": $.UA
  },
      IlII1iI = {
    "url": "http://h5st.kingran.cf/api/h5st",
    "body": JSON.stringify(IIIlIIi1),
    "headers": i1iI1i,
    "timeout": 30000
  };
  return new Promise(async iIlI1iiI => {
    $.post(IlII1iI, (l1llIlil, iIiil1il, iI1iIIii) => {
      let iI1I1l1I = "";

      try {
        if (l1llIlil) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iI1iIIii = JSON.parse(iI1iIIii);
          console.log(JSON.stringify(iI1iIIii));

          if (typeof iI1iIIii === "object" && iI1iIIii && iI1iIIii.body) {
            if (iI1iIIii.body) iI1I1l1I = iI1iIIii || "";
          } else iI1iIIii.code == 400 ? console.log("\n" + iI1iIIii.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (ilIiIlI1) {
        $.logErr(ilIiIlI1, iIiil1il);
      } finally {
        iIlI1iiI(iilil1i(iI1I1l1I));
      }
    });
  });
}

function iilil1i(il1i1lIl, IlIlIIl = {}) {
  let lIl1llI1 = [],
      IiIlI1lI = IlIlIIl.connector || "&",
      I1iIl1li = Object.keys(il1i1lIl);
  if (IlIlIIl.sort) I1iIl1li = I1iIl1li.sort();

  for (let II1ii11l of I1iIl1li) {
    let lIIi1111 = il1i1lIl[II1ii11l];
    if (lIIi1111 && typeof lIIi1111 === "object") lIIi1111 = JSON.stringify(lIIi1111);
    if (lIIi1111 && IlIlIIl.encode) lIIi1111 = encodeURIComponent(lIIi1111);
    lIl1llI1.push(II1ii11l + "=" + lIIi1111);
  }

  return lIl1llI1.join(IiIlI1lI);
}

function IIi1l1I1(lliiIIIi, li1IIilI = "qwertyuiopasdfghjklzxcvbnm") {
  let Il1IIli = "";

  for (let iIllIllI = 0; iIllIllI < lliiIIIi; iIllIllI++) {
    Il1IIli += li1IIilI[Math.floor(Math.random() * li1IIilI.length)];
  }

  return Il1IIli;
}

function iiIIIIi1(lliIIIII) {
  if (typeof lliIIIII == "string") try {
    return JSON.parse(lliIIIII);
  } catch (lI1l11i) {
    return console.log(lI1l11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
