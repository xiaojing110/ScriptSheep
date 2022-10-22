/*
东东爱消除
入口： APP-我的--更多游戏
日常任务，开宝箱，每日挑战，助力，转盘抽奖，游戏，新手福利领取，后续兑换
新手福利3天内70星兑换京豆礼包
默认定时不跑，自己改，一天5次就行，一起冲就炸了
8 8 8 8 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_moxigame.js 
updatetime: 2022/9/27 领取7日签到奖励
author: https://github.com/6dylan6/jdpro
*/
const $ = new Env("东哥爱消除");
const JA = require('crypto-js'),
      Jn = $.isNode() ? require('./jdCookie.js') : '';

const JP = $.isNode() ? require('./sendNotify') : '';
let JK = [],
    JH = '';

if ($.isNode()) {
  Object.keys(Jn).forEach(J => {
    JK.push(Jn[J]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  JK = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...C2($.getdata('CookiesJD') || '[]').map(J => J.cookie)].filter(J => !!J);
}

$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let Ja = ['4708215'];
let JU = 0;
JU = Math.floor(Math.random() * Ja.length);
!(async () => {
  $.log('入口： APP-我的-更多游戏,只运行前10个CK，未进过游戏的，第一次运行可能有问题，建议手动进游戏完成新手引导！');
  $.log('\n问题建议：https://t.me/dylan_jdpro\n');

  if (!JK[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/'
    });
    return;
  }

  for (let X = 0; X < JK.length; X++) {}

  await C3();

  for (let k = 0; k < 10; k++) {
    JH = JK[k];

    if (JH) {
      $.UserName = decodeURIComponent(JH.match(/pt_pin=([^; ]+)(?=;?)/) && JH.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = k + 1;
      $.hotFlag = false;
      console.log('\n\n******开始【京东账号' + $.index + '】' + $.UserName + '*********\n');
      await JM();

      if ($.outFlag) {
        break;
      }
    }
  }

  if ($.outFlag) {
    let m = '此ip已被限制，请过10分钟后再执行脚本';
    $.msg($.name, m);

    if ($.isNode()) {
      await JP.sendNotify('' + $.name, '' + m);
    }
  }

  $.log('\n开始内部互助...');

  for (let e = 0; e < 10; e++) {
    JH = JK[e];

    if (!JH) {
      break;
    }

    $.UserName = decodeURIComponent(JH.match(/pt_pin=([^; ]+)(?=;?)/) && JH.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = e + 1;
    $.full = false;
    console.log('\n******开始【账号' + $.index + '】' + $.UserName + '*********\n');

    for (let V of $.invitercode) {
      if ($.full) {
        break;
      }

      console.log('去助力：' + V);
      await JG('token');
      await $.wait(500);
      await JG('lkToken');
      await $.wait(500);
      await JG('inviter', {
        inviter: V,
        activeId: 'A_112790_R_1_D_20201028',
        scene: 'wojing',
        inviterSource: 'dailyShare',
        lkToken: $.lkToken,
        token: $.Token,
        openId: 'oPcgJ43zJhf4ZUgglKExqFNrYn7Q',
        lkAppId: 'wxccb5c536b0ecd1bf',
        refid: '2',
        deviceType: 'weixin',
        source: '2'
      });
      $.datalist = {
        loginToken: $.token2,
        pltId: $.pltId,
        loginEnc: $.token2.slice(8, 16) + $.token2.slice(24, 32),
        loginDec: JA.MD5($.pltId).toString().slice(0, 16),
        authCode: $.authCode
      };
      await $.wait(500);
      await JG('inviterAward', {
        id: $.datalist.pltId,
        activeId: 'A_112790_R_1_D_20201028',
        authcode: $.datalist.authCode,
        token: $.token2,
        inviter: V
      });
    }
  }
})().catch(J => $.logErr(J)).finally(() => $.done());

async function JM() {
  try {
    $.hasEnd = true;
    $.Token = '';
    $.Pin = '';

    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本');
      return;
    }

    await JG('token');

    if ($.Token == '') {
      console.log('获取token失败！');
      return;
    }

    await $.wait(500);
    await JG('lkToken');

    if (!$.lkToken) {
      return;
    }

    await $.wait(500);
    await JG('login');

    if (!$.info) {
      return;
    }

    await $.wait(500);
    console.log('当前星星数量', $.starnum, '个');
    await JG('logincheck');

    if (!$.token3) {
      return;
    }

    await JG('queryUserBirthDay');
    await $.wait(500);
    let I = await JG('loadMail');

    for (let Q of I.data) {
      if (!Q.read) {
        await JG('readMail', {
          mailid: Q._id,
          id: $.pltId,
          activeId: 'A_112790_R_1_D_20201028',
          authcode: $.authCode,
          token: $.token2
        });
        console.log('邮件奖励获取！');
        await $.wait(500);
        await JG('applyMail', {
          mailid: Q._id,
          id: $.pltId,
          activeid: 'A_112790_R_1_D_20201028',
          activeId: 'A_112790_R_1_D_20201028',
          authcode: $.authCode,
          token: $.token2
        });
      } else {
        console.log('邮件奖励已领取');
      }
    }

    await JG('sevenDaySignIn');
    await $.wait(500);
    let V = await JG('getSevenDaySignInfo');
    await $.wait(500);
    console.log('已签到:', V.curSignDay + 1, '天');

    if (V.curSignDay == 6 && V.finalSignStatus == 1) {
      $.log('领取7天签到奖励...');
      await JG('getConsecutiveSignAwards');
      await $.wait(500);
    } else {
      V.finalSignStatus == 2 && $.log('7天签到奖励已领取！');
    }

    let p = await JG('openChest');
    await $.wait(500);

    if (p.code == 0) {
      for (let Y of p.gameAward) {
        console.log('开宝箱获得:', Y.sName);
      }
    }

    await JG('marketgoods');
    await $.wait(500);

    if ($.starnum >= 70 && $.goodlist[0].res.sID === 'P001') {
      $.log('开始领取新手福利');
      let s = await JG('marketbuy', {
        consumeid: 'P001',
        id: $.pltId,
        activeid: 'A_112790_R_1_D_20201028',
        activeId: 'A_112790_R_1_D_20201028',
        authcode: $.authCode,
        token: $.token2
      });

      if (s.code === 0) {
        console.log('领取成功：京豆*166');
      }
    }

    let O = await JG('gametasks');
    await $.wait(1000);
    $.log('\n开始日常任务...');

    for (let q of O.tasks) {
      if (q.state.iFreshTimes) {
        console.log(q.res.sName, '---任务已完成！');
      } else {
        await JG('uploadtask', {
          taskId: q.res.sID,
          taskType: q.res.eType,
          value: q.res.iValue,
          id: $.pltId,
          activeid: 'A_112790_R_1_D_20201028',
          activeId: 'A_112790_R_1_D_20201028',
          authcode: $.authCode,
          token: $.token2
        });
        await $.wait(500);
        await JG('finishtask', {
          taskid: q.res.sID,
          id: $.pltId,
          activeid: 'A_112790_R_1_D_20201028',
          activeId: 'A_112790_R_1_D_20201028',
          authcode: $.authCode,
          token: $.token2
        });
      }
    }

    $.levelId = Number($.Maxlevel.id) || $.curLevelId;
    let v = false,
        L = [];

    for (let A = 0; A < 50; A++) {
      $.levelId = $.levelId + 1;

      if (v) {
        $.levelId = C5(L, 1)[0];
        L = L.filter(f => f != $.levelId);
      }

      let P = await JG('beginLevel');
      await $.wait(500);

      if (!P.enegryStartGrowTime) {
        if (P.errMsg == 'level is not unlocked!') {
          $.levelId = $.levelId - 1;
          P = await JG('beginLevel');

          if (!P.enegryStartGrowTime) {
            console.log(P.errMsg);
            break;
          }
        } else {
          if (P.errMsg == 'level res is not found!') {
            v = true;

            for (let z = 0; z < parseInt(Number($.Maxlevel.id) / $.drawInterval) - 1; z++) {
              L.push($.drawLevelStart + $.drawInterval * z);
            }

            $.levelId = C5(L, 1)[0];
            L = L.filter(J0 => J0 != $.levelId);
          } else {
            $.log('\n能量不足,退出游戏！');
            break;
          }
        }
      }

      $.log('\n开始游戏：' + $.levelId + '关');
      await $.wait(5000);
      process.stdout.write('...');
      const K = {
        gameId: $.gameId,
        token: $.token3,
        gameInfo: {},
        reqsId: 29
      };
      K.gameInfo.failCount = $.failCount;
      await JG('setsingleinfo', K);
      await $.wait(5000);
      process.stdout.write('...');
      await JG('makeRandomAdData');
      await $.wait(5000);
      process.stdout.write('...');
      const H = {
        gameId: $.gameId,
        token: $.token3,
        gameInfo: {},
        reqsId: 31
      };
      H.gameInfo.guideId = $.guideId;
      H.gameInfo.levelId = $.levelId;
      H.gameInfo.isShowRSGuide = false;
      await JG('setsingleinfo', H);
      await $.wait(5000);
      process.stdout.write('...');
      const t = {
        matchlevelId: U(40101, 40107),
        gameId: $.gameId,
        token: $.token3,
        gameInfo: {},
        reqsId: 32
      };
      t.gameInfo.guideId = $.guideId;
      t.gameInfo.levelId = $.levelId;
      t.gameInfo.isShowRSGuide = false;
      await JG('setsingleinfo', t);
      await $.wait(5000);
      process.stdout.write('...\n');
      let a = await JG('endLevel');
      await $.wait(1000);
      const U = {
        gameId: $.gameId,
        token: $.token3,
        gameInfo: {},
        reqsId: 34
      };
      U.gameInfo.failCount = $.failCount;
      await JG('setsingleinfo', U);

      if (!a.enegryStartGrowTime) {
        $.log('结束游戏:', a.errMsg);
        break;
      }

      $.log('游戏完成：' + $.levelId + '关');
    }

    await JG('getDailyMatch');

    for (let J4 = 0; J4 < 10; J4++) {
      J4 == 0 ? $.matchlevelId = 40103 : $.matchlevelId = C1(40101, 40107);
      let J5 = await JG('beginDailyMatch');

      if (J5.dayInfo && J5.dayInfo.curLevel) {
        $.log('开始每日挑战...');
        await $.wait(5000);
        process.stdout.write('...');
        const JC = {};
        JC.gameId = $.gameId;
        JC.token = $.token3;
        JC.gameInfo = {};
        JC.reqsId = 29;
        JC.gameInfo.failCount = $.failCount;
        await JG('setsingleinfo', JC);
        await $.wait(5000);
        process.stdout.write('...');
        await JG('makeRandomAdData');
        await $.wait(5000);
        process.stdout.write('...');
        const Jw = {};
        Jw.gameId = $.gameId;
        Jw.token = $.token3;
        Jw.gameInfo = {};
        Jw.reqsId = 31;
        Jw.gameInfo.guideId = $.guideId;
        Jw.gameInfo.levelId = $.matchlevelId;
        Jw.gameInfo.isShowRSGuide = false;
        await JG('setsingleinfo', Jw);
        await $.wait(5000);
        process.stdout.write('...');
        const JJ = {};
        JJ.gameId = $.gameId;
        JJ.token = $.token3;
        JJ.gameInfo = {};
        JJ.reqsId = 32;
        JJ.gameInfo.guideId = $.guideId;
        JJ.gameInfo.levelId = $.matchlevelId;
        JJ.gameInfo.isShowRSGuide = false;
        await JG('setsingleinfo', JJ);
        await $.wait(5000);
        process.stdout.write('...\n');
        await JG('endDailyMatch');
        await $.wait(1000);
        const Jc = {};
        Jc.gameId = $.gameId;
        Jc.token = $.token3;
        Jc.gameInfo = {};
        Jc.reqsId = 34;
        Jc.gameInfo.failCount = $.failCount;
        await JG('setsingleinfo', Jc);
        await $.wait(1000);
      } else {
        console.log('没有挑战次数！');
        break;
      }
    }

    $.log('挑战奖励领取...');

    for (let JR of Array(10)) {
      let Jm = await JG('getDailyMatchAward');

      if (Jm.reward) {
        process.stdout.write('...'), $.log('领取成功！'), await $.wait(1000);
      } else {
        $.log('没有奖励可领取！');
        break;
      }
    }

    $.log('大转盘抽奖...');
    let h = await JG('exchangeres');
    await $.wait(1000);
    let g = {
      Token: x.data,
      pltId: x.info.pltId
    };
    h.aShowItems.forEach((Jo, JI, JV) => {
      g[Jo.value] = JV[JI];
    });

    for (let Jo of Array(15)) {
      let JI = await JG('exchange');
      await $.wait(1000);

      if (!JI.rollAwards) {
        break;
      }

      for (let JV of JI.rollAwards) {
        console.log('抽奖获得:', g[JV.value].name);
      }
    }
  } catch (Jv) {
    console.log(Jv);
  }
}

async function JG(g, x) {
  if ($.outFlag) {
    return;
  }

  let j = 'POST';

  switch (g) {
    case 'token':
      url = 'https://jdjoy.jd.com/saas/framework/user/token?appId=dafbe42d5bff9d82298e5230eb8c3f79&client=m&url=pengyougou.m.jd.com';
      break;

    case 'lkToken':
      url = 'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=dafbe42d5bff9d82298e5230eb8c3f79';
      break;

    case 'login':
      url = 'https://jd.moxigame.cn/platform/active/role/login';
      const S = {};
      S.activeId = 'A_112790_R_1_D_20201028', S.refid = 'wojing', S.lkToken = $.lkToken, S.token = $.Token, S.deviceType = 'h5', S.scene = '3', S.source = 'wojing', x = S;
      break;

    case 'logincheck':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/logincheck';
      const F = {};
      F.info = $.info, F.reqsId = 1, x = F;
      break;

    case 'beginDailyMatch':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/beginDailyMatch';
      const T = {};
      T.gameId = $.gameId, T.token = $.token3, T.levelId = $.matchlevelId, T.reqsId = 28, x = T;
      break;

    case 'setsingleinfo':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/setsingleinfo';
      const r = {};
      r.gameId = $.gameId, r.token = $.token3, r.gameInfo = {}, r.reqsId = 29, r.gameInfo.failCount = $.failCount, x = r;
      break;

    case 'endLevel':
      ;
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/endLevel', x = {
        gameId: $.gameId,
        token: $.token3,
        levelId: $.levelId,
        score: C1(250000, 500000),
        reqsId: 33
      };
      break;

    case 'openChest':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/openChest';
      const Y = {};
      Y.gameId = $.gameId, Y.token = $.token3, Y.reqsId = 36, x = Y;
      break;

    case 'applyMail':
      url = 'https://jd.moxigame.cn/platform/active/role/applyMail';
      break;

    case 'makeRandomAdData':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/makeRandomAdData';
      const b = {};
      b.gameId = $.gameId, b.token = $.token3, b.reqsId = 30, x = b;
      break;

    case 'endDailyMatch':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/endDailyMatch';
      const W = {};
      W.gameId = $.gameId, W.token = $.token3, W.levelId = $.matchlevelId, W.score = 120, W.reqsId = 33, x = W;
      break;

    case 'getDailyMatchAward':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/getDailyMatchAward';
      const s = {};
      s.gameId = $.gameId, s.token = $.token3, s.reqsId = 28, x = s;
      break;

    case 'getDailyMatch':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/getDailyMatch';
      const q = {};
      q.gameId = $.gameId, q.token = $.token3, q.reqsId = 28, x = q;
      break;

    case 'queryUserBirthDay':
      url = 'https://jd.moxigame.cn/platform/active/role/queryUserBirthDay';
      const Z = {};
      Z.id = $.pltId, Z.activeid = 'A_112790_R_1_D_20201028', Z.activeId = 'A_112790_R_1_D_20201028', Z.authcode = $.authCode, Z.token = $.token2, x = Z;
      break;

    case 'loadMail':
      url = 'https://jd.moxigame.cn/platform/active/role/loadMail';
      const y = {};
      y.id = $.pltId, y.activeid = 'A_112790_R_1_D_20201028', y.activeId = 'A_112790_R_1_D_20201028', y.authcode = $.authCode, y.token = $.token2, x = y;
      break;

    case 'readMail':
      url = 'https://jd.moxigame.cn/platform/active/role/readMail';
      break;

    case 'sevenDaySignIn':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/sevenDaySignIn';
      const d = {};
      d.gameId = $.gameId, d.token = $.token3, d.way = 1, d.reqsId = 27, x = d;
      break;

    case 'getSevenDaySignInfo':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/getSevenDaySignInfo';
      const A = {};
      A.gameId = $.gameId, A.token = $.token3, A.reqsId = 24, x = A;
      break;

    case 'exchangeres':
      url = 'https://jd.moxigame.cn/platform/active/role/exchangeres';
      const P = {};
      P.id = $.pltId, P.activeid = 'A_112790_R_1_D_20201028', P.activeId = 'A_112790_R_1_D_20201028', P.authcode = $.authCode, P.token = $.token2, x = P;
      break;

    case 'exchange':
      url = 'https://jd.moxigame.cn/platform/active/role/exchange';
      const K = {};
      K.batch = false, K.id = $.pltId, K.activeid = 'A_112790_R_1_D_20201028', K.activeId = 'A_112790_R_1_D_20201028', K.authcode = $.authCode, K.token = $.token2, x = K;
      break;

    case 'gametasks':
      url = 'https://jd.moxigame.cn/platform/active/jingdong/gametasks';
      const H = {};
      H.id = $.pltId, H.activeid = 'A_112790_R_1_D_20201028', H.activeId = 'A_112790_R_1_D_20201028', H.authcode = $.authCode, H.token = $.token2, x = H;
      break;

    case 'uploadtask':
      url = 'https://jd.moxigame.cn/platform/role/base/uploadtask';
      break;

    case 'finishtask':
      url = 'https://jd.moxigame.cn/platform/active/jingdong/finishtask';
      break;

    case 'beginLevel':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/beginLevel';
      const t = {};
      t.gameId = $.gameId, t.token = $.token3, t.levelId = $.levelId, t.reqsId = 28, x = t;
      break;

    case 'inviter':
      url = 'https://jd.moxigame.cn/platform/active/role/login';
      break;

    case 'inviterAward':
      url = 'https://jd.moxigame.cn/platform/active/role/inviterAward';
      break;

    case 'marketbuy':
      url = 'https://jd.moxigame.cn/platform/active/role/marketbuy';
      break;

    case 'marketgoods':
      url = 'https://jd.moxigame.cn/platform/active/role/marketgoods';
      const a = {};
      a.id = $.pltId, a.activeid = 'A_112790_R_1_D_20201028', a.activeId = 'A_112790_R_1_D_20201028', a.authcode = $.authCode, a.token = $.token2, x = a;
      break;

    case 'getConsecutiveSignAwards':
      url = 'https://jd.moxigame.cn/eliminate_jd/game/local/getConsecutiveSignAwards';
      const U = {};
      U.gameId = $.gameId, U.token = $.token3, U.reqsId = 6, x = U;
      break;

    default:
      console.log('错误' + g);
  }

  if (x && x.token && g !== 'login' && g !== 'inviter') {
    let M = x.token == $.datalist.loginToken ? 1 : 2,
        G = C0(16);
    x = {
      __data__: C4(x, G, M),
      __iv__: G,
      __id__: M == 1 ? $.datalist.pltId : $.datalist.gameId
    };
    $._id_ = x.__id__;
  }

  let B = Ju(url, x, j);
  return new Promise(async z => {
    $.post(B, (J1, J2, J3) => {
      try {
        J1 ? (J2 && J2.statusCode && J2.statusCode == 493 && (console.log('此ip已被限制，请过10分钟后再执行脚本'), $.outFlag = true), console.log('' + $.toStr(J1, J1)), console.log(' API请求失败，请检查网路重试')) : J3 = Jz(g, J3);
      } catch (JJ) {
        console.log(JJ, J2);
      } finally {
        z(J3);
      }
    });
  });
}

async function Jz(J, C) {
  let X = '';

  try {
    if (C) {
      X = JSON.parse(C);

      if (X.__data__) {
        let R = $._id_ == $.datalist.gameId ? 4 : 3,
            N = C4(X, X.__iv__, R);
        X = JSON.parse(N);
      }
    }
  } catch (o) {
    console.log(J + ' 执行任务异常');
    $.runFalag = false;
  }

  try {
    switch (J) {
      case 'token':
        if (typeof X == 'object') {
          if (X.success) {
            if (typeof X.data != 'undefined') {
              $.Token = X.data;
            }
          } else {
            X.errorMessage ? console.log('token ' + X.errorMessage) : console.log(C);
          }
        } else {
          console.log(C);
        }

        break;

      case 'lkToken':
        if (typeof X == 'object') {
          if (X.success && X.data) {
            $.lkToken = X.data.lkToken;
          } else {
            if (X.message) {
              console.log(J + ' ' + X.message);
            } else {
              console.log(C);
            }
          }
        } else {
          console.log(C);
        }

        break;

      case 'login':
        if (typeof X == 'object') {
          if (X.code === 0) {
            $.info = X.info;
            $.token2 = X.token;
            $.authCode = X.authcode;
            $.pltId = X.info.pltId;
            $.starnum = JSON.parse(X.info.platform).money;
            $.invitercode.push($.pltId);
          } else {
            console.log(C);
          }
        } else {
          console.log(C);
        }

        break;

      case 'logincheck':
        if (typeof X == 'object') {
          if (X.code === 0) {
            $.gameId = X.role.gameId;
            $.token3 = X.token;
            $.failCount = X.role.gameInfo.failCount;
            $.guideId = X.role.gameInfo.guideId;
            $.Maxlevel = X.role.allLevels.pop();
            $.curLevelId = X.role.gameInfo.levelId;
            $.drawLevelStart = X.draw.drawLevelStart;
            $.drawInterval = X.draw.drawInterval;
            $.datalist = {
              gameId: $.gameId,
              token: $.token3,
              enc: $.token3.slice(8, 16) + $.token3.slice(24, 32),
              dec: JA.MD5($.gameId).toString().slice(0, 16),
              loginToken: $.token2,
              pltId: $.pltId,
              loginEnc: $.token2.slice(8, 16) + $.token2.slice(24, 32),
              loginDec: JA.MD5($.pltId).toString().slice(0, 16),
              authCode: $.authCode
            };
          } else {
            console.log(C);
          }
        } else {
          console.log(C);
        }

        break;

      case 'inviter':
        if (typeof X == 'object') {
          let d = X.invitinfo.type;
          $.token2 = X.token;
          $.authCode = X.authcode;
          $.pltId = X.info.pltId;

          if (d == 'overflow') {
            $.full = true;
            console.log('助力已用尽！');
          } else {
            if (d == 'new') {
              console.log('助力成功！');
            } else {
              if (d == 'repeat') {
                console.log('已经助力过TA了！');
              } else {
                d == 'none' && console.log('不能助力自己！');
              }
            }
          }
        } else {
          console.log(X);
        }

        break;

      case 'marketgoods':
        typeof X == 'object' ? X.code === 0 && ($.goodlist = X.list) : console.log(C);
        break;

      case 'sendGameAward':
        if (typeof X == 'object') {
          if (X.success && X.data) {
            console.log('游戏完成，获得' + $.point.point + '能量!');
          } else {
            X.message ? console.log(J + ' ' + X.message) : console.log(C);
          }
        } else {
          console.log(C);
        }

        break;

      case 'accessLogWithAD':
      case 'drawContent':
        break;

      case 'specialSign':
      case 'activity_load':
      case 'setMixNick':
      case 'followShop':
      case 'doTask':
      case 'addCart':
      case 'missionInviteList':
      case '绑定':
      case '助力':
        let V = '';

        if (J == 'followShop') {
          V = '关注';
        }

        if (J == 'addCart') {
          V = '加购';
        }

        if (J == 'specialSign') {
          V = '签到';
        }

        if (typeof X == 'object') {
          if (X.success && X.success === true && X.data) {
            if (X.data.status && X.data.status == 200) {
              X = X.data;
              J != 'setMixNick' && (X.msg || X.data.remark) && console.log((V && V + ':' || '') + (X.msg || X.data.isOpenCard || X.data.remark || ''));

              if (J == 'activity_load') {
                X.data && ($.MixNick = X.data.missionCustomer.buyerNick || '', $.hasCollectShop = X.data.missionCustomer.hasCollectShop || 0, $.totalPoint = X.data.missionCustomer.totalPoint || 0, $.remainChance = X.data.missionCustomer.remainChance || 0);
              } else {
                J == 'missionInviteList' && console.log('本月已邀请助力(' + X.data.total + ')');
              }
            } else {
              if (X.data.msg) {
                console.log(X.data.msg);
              } else {
                X.errorMessage ? console.log(J + ' ' + X.errorMessage) : console.log(C);
              }
            }
          } else {
            X.errorMessage ? console.log(J + ' ' + X.errorMessage) : console.log(C);
          }
        } else {
          console.log(C);
        }

        break;

      default:
        return X;
    }
  } catch (J4) {
    console.log(J4);
  }
}

function Ju(D, X, k = 'POST') {
  const m = {
    Accept: '*/*',
    Connection: 'keep-alive',
    Cookie: JH,
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-cn',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  m['User-Agent'] = $.UA;
  let E = m;
  return D.indexOf('moxigame') > -1 && (E.Origin = 'https://game-cdn.moxigame.cn', delete E.Cookie), {
    url: D,
    method: k,
    headers: E,
    body: JSON.stringify(X),
    timeout: 30000
  };
}

function C0(C) {
  C = C || 32;
  let k = 'abcdef0123456789',
      R = k.length,
      N = '';

  for (let m = 0; m < C; m++) {
    N += k.charAt(Math.floor(Math.random() * R));
  }

  return N;
}

function C1(C, D) {
  var R = Math.floor(Math.random() * (D - C + 1) + C);
  return R;
}

function C2(D) {
  const k = function () {
    let N = true;
    return function (m, E) {
      const o = N ? function () {
        if (E) {
          const I = E.apply(m, arguments);
          return E = null, I;
        }
      } : function () {};
      return N = false, o;
    };
  }(),
        R = k(this, function () {
    return R.toString().search('(((.+)+)+)+$').toString().constructor(R).search('(((.+)+)+)+$');
  });

  R();

  if (typeof D == 'string') {
    try {
      return JSON.parse(D);
    } catch (N) {
      return console.log(N), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

async function C3() {
  $.UA = 'jdapp;iPhone;10.1.4;13.1.2;' + C0(40) + ';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}

function C4(C, D, X) {
  ;
  (X == 1 || X == 2) && typeof C == 'object' && (C = JSON.stringify(C));

  switch (X) {
    case 1:
      var N = $.datalist.loginEnc;
      break;

    case 2:
      var N = $.datalist.enc;
      break;

    case 3:
      var N = $.datalist.loginDec;
      break;

    case 4:
      var N = $.datalist.dec;
      break;
  }

  if (!C.__data__) {
    var m = JA.AES.encrypt(C, JA.enc.Utf8.parse(N), {
      iv: JA.enc.Utf8.parse(D),
      mode: JA.mode.CBC,
      padding: JA.pad.Pkcs7
    }),
        E = m.toString();
    return E;
  } else {
    var e = JA.AES.decrypt(C.__data__, JA.enc.Utf8.parse(N), {
      iv: JA.enc.Utf8.parse(D),
      mode: JA.mode.CBC,
      padding: JA.pad.Pkcs7
    }),
        o = e.toString(JA.enc.Utf8);
    return o.toString();
  }
}

function C5(C, D) {
  var R = C.slice(0),
      N = C.length,
      m = N - D,
      E,
      e;

  while (N-- > m) {
    e = Math.floor((N + 1) * Math.random());
    E = R[e];
    R[e] = R[N];
    R[N] = E;
  }

  return R.slice(m);
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }