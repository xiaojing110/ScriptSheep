/*
新百货大楼
APP-主页-新百货频道-底部中间
日常任务，签到，盖楼，离线奖励领取，每日抽奖
8 8 8 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_xbhdl.js 
默认定时不跑，自定义, 不要太频繁，主要收离线收益
默认不抽奖，如不需要设置变量XBHROLL='true'
updatetime: 2022/10/21 修复报错，优化
author: https://github.com/6dylan6/jdpro
*/
const $ = new Env("新百货盖楼-加密");
const aH = $.isNode() ? require('./jdCookie.js') : '',
      aI = $.isNode() ? require('./sendNotify') : '';
let aJ = [],
    aK = '',
    aL = process.env.XBHROLL || false;

if ($.isNode()) {
  Object.keys(aH).forEach(a => {
    aJ.push(aH[a]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  aJ = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...aW($.getdata('CookiesJD') || '[]').map(a => a.cookie)].filter(a => !!a);
}

$.hotFlag = false;
$.outFlag = false;
$.full = false;
$.invitercode = [];
let aN = ['4708215'],
    aO = 0;
aO = Math.floor(Math.random() * aN.length);
!(async () => {
  $.log('入口： APP-主页-新百货频道-底部中间,只运行前10个CK');
  $.log('\n问题建议TG：https://t.me/dylan_jdpro');

  if (!aJ[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/'
    });
    return;
  }

  await $.wait(10);

  for (let f = 0; f < aJ.length; f++) {}

  await aX();

  for (let g = 0; g < 10; g++) {
    aK = aJ[g];

    if (aK) {
      $.UserName = decodeURIComponent(aK.match(/pt_pin=([^; ]+)(?=;?)/) && aK.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = g + 1;
      $.hotFlag = false;
      $.uid = '';
      $.nochuzi = false;
      $.notimes = false;
      console.log('\n\n******开始【京东账号' + $.index + '】' + $.UserName + '*********\n');
      await aQ();

      if ($.outFlag) {
        break;
      }

      await $.wait(parseInt(Math.random() * 2000 + 2000, 10));
    }
  }

  if ($.outFlag) {
    let k = '此ip已被限制，请过10分钟后再执行脚本';
    $.msg($.name, k);

    if ($.isNode()) {
      await aI.sendNotify('' + $.name, '' + k);
    }
  }
})().catch(a => $.logErr(a)).finally(() => $.done());

async function aQ() {
  try {
    $.hasEnd = true;
    $.Token = '';
    $.Pin = '';

    if ($.outFlag) {
      console.log('此ip已被限制，请过10分钟后再执行脚本');
      return;
    }

    await aR('token');

    if ($.Token == '') {
      console.log('获取token失败！');
      return;
    }

    await $.wait(1000);
    await aR('lkToken');

    if (!$.lkToken) {
      return;
    }

    await aR('GetSaveByToken');

    if (Object.keys($.info).length === 0) {
      return;
    }

    await $.wait(1000);
    console.log('当前大楼', $.floornum + 1, '层');
    console.log('当前金币', $.score, '个');
    console.log('当前锤子', $.chuizi, '个');
    console.log('\n开始签到>>>>>>');
    $.signstate == 0 ? await aR('GetSignInReward') : $.log('今日签到已完成');
    await $.wait(500);
    $.signtaskstate == 0 ? await aR('GetSignTaskReward') : $.log('今日签到任务已完成');
    await $.wait(500);
    console.log('\n领取离线收益>>>>>>');
    await aR('Produce');
    await $.wait(500);
    await aR('GetOfflineRenevue');
    await $.wait(500);
    $.log('\n开始漂浮任务>>>>>>');

    if ($.eggTimes < 2) {
      for (let m = 1; m < 3; m++) {
        $.log('第' + m + '次');
        await aR('AddShowTime');
        await $.wait(500);
        await aR('GetNormalReward');
        await $.wait(500);
        await aR('EastReward');
        await $.wait(2500);
      }
    } else {
      $.log('漂浮任务已完成！');
    }

    $.log('\n开始日常任务>>>>>>');
    await aR('GetTaskList');
    await $.wait(500);
    await aR('GetBrowseList');
    await $.wait(500);

    for (let s of $.tasklist) {
      if ($.taskstatelist[s.type] >= s.rewardTimes) {
        console.log(s.name, '----已完成');
        continue;
      }

      switch (s.type) {
        case 'BrowseShop':
          for (let v = 0; v < s.rewardTimes - ($.taskstatelist[s.type] || 0); v++) {
            console.log(s.name);
            $.type = s.type;
            $.iid = $.Shoplist[v].entityList[0].shopId;
            $.taskId = s._id;
            await aR('AddStep');
            await $.wait(1000);
            await aR('GetReward');
          }

          break;

        case 'BrowseSku':
          for (let z = 0; z < s.rewardTimes - ($.taskstatelist[s.type] || 0); z++) {
            console.log(s.name);
            $.type = s.type;
            $.iid = $.Skulist[z].entityList[0].skuId;
            $.taskId = s._id;
            await aR('AddStep');
            await $.wait(1000);
            await aR('GetReward');
          }

          break;

        case 'BrowseVender':
          for (let D = 0; D < s.rewardTimes - ($.taskstatelist[s.type] || 0); D++) {
            console.log(s.name);
            $.type = s.type;
            $.iid = $.Venderlist[D].entityList[0].venderId;
            $.taskId = s._id;
            await aR('AddStep');
            await $.wait(1000);
            await aR('GetReward');
          }

          break;

        case 'BrowseChannel':
          for (let H = 0; H < s.rewardTimes - ($.taskstatelist[s.type] || 0); H++) {
            console.log(s.name);
            $.type = s.type;
            $.iid = $.Channelist[Math.floor(Math.random() * $.Channelist.length)].entityList[0].channelId;
            $.taskId = s._id;
            await aR('AddStep');
            await $.wait(1000);
            await aR('GetReward');
          }

          break;

        case 'FollowShop':
          for (let L = 0; L < s.rewardTimes - ($.taskstatelist[s.type] || 0); L++) {
            console.log(s.name);
            $.type = s.type;
            await aR('GetFollowShopList');
            await $.wait(500);
            $.iid = $.folowshopid;
            $.taskId = s._id;
            await aR('AddStep');
            await $.wait(1000);
            await aR('GetReward');
          }

          break;
      }
    }

    console.log('\n开始盖楼>>>>>>');

    for (let P = 0; P < 5; P++) {
      if ($.nochuzi) {
        break;
      }

      await aR('Upgrade');
      await $.wait(1000);
    }

    aL ? $.lotterytimes < 3 && (console.log('\n开始抽奖>>>>>>'), await aR('Roll')) : $.log('\n默认不抽奖，跳出');
  } catch (V) {
    console.log(V);
  }
}

async function aR(a, b) {
  if ($.outFlag) {
    return;
  }

  let g = 'POST';

  switch (a) {
    case 'token':
      url = 'https://jdjoy.jd.com/saas/framework/user/token?appId=f3576dcf13b52805bb78cc02450ffc26&client=m&url=pengyougou.m.jd.com';
      break;

    case 'lkToken':
      url = 'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=f3576dcf13b52805bb78cc02450ffc26';
      break;

    case 'GetSaveByToken':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Save/GetSaveByToken', b = {
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {
          lkToken: $.lkToken,
          channel: 'release',
          babelChannel: null
        },
        clientReqId: aY()
      };
      break;

    case 'GetOfflineRenevue':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/GetOfflineRenevue', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'GetSignInReward':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/SignIn/GetSignInReward', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'GetSignTaskReward':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/SignIn/GetTaskReward', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'GetTaskList':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetTaskList', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'GetBrowseList':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetBrowseList', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'AddStep':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/AddStep', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {
          taskType: $.type,
          entityIds: [$.iid]
        },
        clientReqId: aY()
      };
      break;

    case 'GetReward':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetReward', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {
          taskId: $.taskId
        },
        clientReqId: aY()
      };
      break;

    case 'Produce':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/Produce', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {},
        clientReqId: aY()
      };
      break;

    case 'GetFollowShopList':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetFollowShopList', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {},
        clientReqId: aY()
      };
      break;

    case 'GetFollowShopStatus':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetFollowShopStatus', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {
          lkToken: $.lkToken,
          ids: [1000002483, 1000005125, 1000005205, 1000005193, 956228, 1000005174, 1000305465, 1000002626]
        },
        clientReqId: aY()
      };
      break;

    case 'Upgrade':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/Upgrade', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {},
        clientReqId: aY()
      };
      break;

    case 'RefreshOnline':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Save/RefreshOnline', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {},
        clientReqId: aY()
      };
      break;

    case 'AddShowTime':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/EasterEggTask/AddShowTime', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'GetNormalReward':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/EasterEggTask/GetNormalReward', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'EastReward':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/EasterEggTask/GetTaskReward', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        clientReqId: aY()
      };
      break;

    case 'Roll':
      ;
      url = 'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Lottery/Roll', b = {
        uid: $.uid,
        uv: $.uv,
        version: '1.1.5',
        channel: 'release',
        env: 'jdApp',
        isPre: false,
        meta: {
          uid: $.uid,
          uv: $.uv,
          version: '1.1.5',
          channel: 'release',
          env: 'jdApp',
          isPre: false
        },
        ...aZ(),
        encrypt: true,
        data: {
          lkToken: $.lkToken
        },
        clientReqId: aY()
      };
      break;

    default:
      console.log('错误' + a);
  }

  b && b.meta && (b.meta = b1.aesEncrypt(JSON.stringify(b.meta), '8a5e4h2x5d6g9e5a', 'h4a1e8h4z1a2g5e8'));
  b && b.encrypt && (b.data = b1.aesEncrypt(JSON.stringify(b.data), '8a5e4h2x5d6g9e5a', 'h4a1e8h4z1a2g5e8'));
  let h = aT(url, b, g);
  return new Promise(async k => {
    $.post(h, (o, p, q) => {
      try {
        if (o) {
          if (p && p.statusCode && p.statusCode == 493) {
            console.log('此ip已被限制，请过10分钟后再执行脚本');
            $.outFlag = true;
          }

          console.log('' + $.toStr(o, o));
          console.log(' API请求失败，请检查网路重试');
        } else {
          q = aS(a, q);
        }
      } catch (x) {
        console.log(x, p);
      } finally {
        k(q);
      }
    });
  });
}

async function aS(a, b) {
  let g = '';

  try {
    b && (g = JSON.parse(b));
  } catch (j) {
    console.log(a + ' 执行任务异常'), $.runFalag = false;
  }

  try {
    switch (a) {
      case 'token':
        if (typeof g == 'object') {
          if (g.success) {
            if (typeof g.data != 'undefined') {
              $.Token = g.data;
            }
          } else {
            g.errorMessage ? console.log('token ' + g.errorMessage) : console.log(b);
          }
        } else {
          console.log(b);
        }

        break;

      case 'lkToken':
        if (typeof g == 'object') {
          if (g.success && g.data) {
            ;
            $.lkToken = g.data.lkToken, $.lkEPin = g.data.lkEPin;
          } else {
            g.errorMessage ? console.log(a + ' ' + g.errorMessage) : console.log(b);
          }
        } else {
          console.log(b);
        }

        break;

      case 'GetSaveByToken':
        if (typeof g == 'object') {
          $.info = {};

          if (g.success) {
            $.uid = g.data.uid;
            $.info = b1.aesDecrypt(g.data.save, 'k4ug8ayehg5a8e96', 'g8err4a5g23a5e8g');
            $.info = JSON.parse($.info);
            $.score = $.info.items.data[101001001];
            $.taskstatelist = $.info.task.daySteps;
            $.chuizi = $.info.items.data[101001002];
            $.uv = $.info.updateVersion;
            $.signstate = $.info.signIn.getSignReward;
            $.signtaskstate = $.info.signIn.getTaskReward;
            $.floornum = $.info.building.floorNum;
            $.eggstate = $.info.easterEggTask.completeTask;
            $.eggTimes = $.info.easterEggTask.getRewardTimes;
            $.lotterytimes = $.info.lottery.todayRollCount;
          } else {
            console.log('获取信息失败，跳出');
          }
        } else {
          console.log(b);
        }

        break;

      case 'GetOfflineRenevue':
        typeof g == 'object' ? $.offscore && ($.uv += 1, console.log('获取离线收益：', $.offscore)) : console.log(b);
        break;

      case 'GetTaskList':
        if (typeof g == 'object') {
          if (g.success) {
            $.tasklist = g.data;
          } else {
            $.log(g);
          }
        } else {
          console.log(g);
        }

        break;

      case 'GetBrowseList':
        if (typeof g == 'object') {
          if (g.success) {
            $.Skulist = g.data.browseSku;
            $.Shoplist = g.data.browseShop;
            $.Venderlist = g.data.browseVender;
            $.Channelist = g.data.browseChannel;
          } else {
            $.log(g);
          }
        } else {
          console.log(b);
        }

        break;

      case 'GetFollowShopList':
        if (typeof g == 'object') {
          if (g.success) {
            $.folowshopid = g.data[0].entityList[0].shopId;
          } else {
            console.log(b);
          }
        } else {
          console.log(b);
        }

        break;

      case 'GetSignInReward':
      case 'GetSignTaskReward':
        $.uv += 1;
        typeof g == 'object' ? g.success ? console.log('签到完成，获得锤子 ', g.data.reward) : console.log(b) : console.log(b);
        break;

      case 'GetReward':
      case 'EastReward':
      case 'GetNormalReward':
        $.uv += 1;

        if (typeof g == 'object') {
          if (g.success) {
            console.log('任务完成，获得锤子 ', g.data.reward.num || g.data.reward);
          } else {
            console.log(b);
          }
        } else {
          console.log(b);
        }

        break;

      case 'AddStep':
      case 'AddShowTime':
        $.uv += 1;
        break;

      case 'Upgrade':
        typeof g == 'object' ? g.success ? ($.uv += 1, console.log('盖楼成功'), g = JSON.parse(b1.aesDecrypt(g.extraData, '8a5e4h2x5d6g9e5a', 'h4a1e8h4z1a2g5e8')), console.log('剩余锤子：', g.dsl[0].value)) : ($.nochuzi = true, g.errorMessage.indexOf('enough') > -1 ? $.log('锤子不足！') : console.log(g.errorMessage)) : console.log(b);
        break;

      case 'Produce':
        $.uv += 1;

        if (typeof g == 'object') {
          if (g.success) {
            $.offscore = '';
            g.data.isOfflineRenevue && ($.offscore = g.data.produce);
          } else {
            console.log(g.errorMessage);
          }
        } else {
          console.log(b);
        }

        break;

      case 'RefreshOnline':
        if (typeof g == 'object') {
          if (g.success) {} else {
            console.log(g.errorMessage);
          }
        } else {
          console.log(b);
        }

        break;

      case 'Roll':
        if (typeof g == 'object') {
          if (g.success) {
            $.uv += 1;
            $.log('花费 ' + g.data.record.cost + ' 金币，获得 ' + g.data.record.num + ' ' + (g.data.record.rewardType ? '京豆!' : '金币!') + ' ');
          } else {
            ;
            $.notimes = true, g.errorMessage.indexOf('enough') > -1 ? $.log('金币不足！') : console.log(g.errorMessage);
          }
        } else {
          console.log(b);
        }

        break;

      case 'followShop':
      case 'doTask':
      case 'addCart':
      case 'missionInviteList':
      case '绑定':
      case '助力':
        let l = '';

        if (a == 'followShop') {
          l = '关注';
        }

        if (a == 'addCart') {
          l = '加购';
        }

        if (a == 'specialSign') {
          l = '签到';
        }

        if (typeof g == 'object') {
          if (g.success && g.success === true && g.data) {
            if (g.data.status && g.data.status == 200) {
              g = g.data;
              a != 'setMixNick' && (g.msg || g.data.remark) && console.log((l && l + ':' || '') + (g.msg || g.data.isOpenCard || g.data.remark || ''));

              if (a == 'activity_load') {
                g.data && ($.MixNick = g.data.missionCustomer.buyerNick || '', $.hasCollectShop = g.data.missionCustomer.hasCollectShop || 0, $.totalPoint = g.data.missionCustomer.totalPoint || 0, $.remainChance = g.data.missionCustomer.remainChance || 0);
              } else {
                a == 'missionInviteList' && console.log('本月已邀请助力(' + g.data.total + ')');
              }
            } else {
              if (g.data.msg) {
                console.log(g.data.msg);
              } else {
                g.errorMessage ? console.log(a + ' ' + g.errorMessage) : console.log(b);
              }
            }
          } else {
            if (g.errorMessage) {
              console.log(a + ' ' + g.errorMessage);
            } else {
              console.log(b);
            }
          }
        } else {
          console.log(b);
        }

        break;

      default:
        return g;
    }
  } catch (aq) {
    console.log(aq);
  }
}

function aT(e, f, g = 'POST') {
  const j = {
    Accept: '*/*',
    Connection: 'keep-alive',
    Cookie: aK,
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'com.jingdong.app.mall'
  };
  j['User-Agent'] = $.UA;
  let k = j;
  return e.indexOf('moxigame') > -1 && (k.Origin = 'https://jddl.gamecatstudio.com', delete k.Cookie), {
    url: e,
    method: g,
    headers: k,
    body: JSON.stringify(f),
    timeout: 30000
  };
}

function aU(f) {
  f = f || 32;
  let j = 'abcdef0123456789',
      k = j.length,
      l = '';

  for (let m = 0; m < f; m++) {
    l += j.charAt(Math.floor(Math.random() * k));
  }

  return l;
}

function aV(b, e) {
  var h = Math.floor(Math.random() * (e - b + 1) + b);
  return h;
}

function aW(f) {
  const h = function () {
    let j = true;
    return function (k, l) {
      const m = j ? function () {
        if (l) {
          const o = l.apply(k, arguments);
          return l = null, o;
        }
      } : function () {};
      return j = false, m;
    };
  }(),
        i = h(this, function () {
    return i.toString().search('(((.+)+)+)+$').toString().constructor(i).search('(((.+)+)+)+$');
  });

  i();

  if (typeof f == 'string') {
    try {
      return JSON.parse(f);
    } catch (j) {
      return console.log(j), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

async function aX() {
  $.UA = 'jdapp;iPhone;10.1.4;13.1.2;' + aU(40) + ';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}

function aY() {
  function b() {
    return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
  }

  return b() + b() + b() + b() + b() + b() + b() + b();
}

function aZ() {
  let e = b1.aesEncrypt(String(Date.now()), 'a8ge9g5r8a4d1g5r', '5e8g8r6a32z1d5ge'),
      f = b1.aesEncrypt(e + ($.uid || '') + '1.1.5releasejdApp', 'a8ge9g5r8a4d1g5r', '5e8g8r6a32z1d5ge');
  const g = {
    t: e,
    s: f
  };
  return g;
}

const b0 = require('crypto-js');

var b1 = function () {
  function a() {}

  return a.aesEncrypt = function (b, f, g) {
    var h = b0.enc.Utf8.parse(f),
        j = b0.enc.Utf8.parse(g);
    return b0.AES.encrypt(b, h, {
      iv: j,
      mode: b0.mode.CBC,
      padCRng: b0.pad.Pkcs7
    }).toString(b0.format.Hex);
  }, a.aesDecrypt = function (b, f, g) {
    var h = b0.enc.Utf8.parse(f),
        j = b0.enc.Utf8.parse(g),
        k = b0.enc.Hex.parse(b),
        l = b0.enc.Base64.stringify(k);
    return b0.AES.decrypt(l, h, {
      iv: j,
      mode: b0.mode.CBC,
      padCRng: b0.pad.Pkcs7
    }).toString(b0.enc.Utf8);
  }, a;
}();
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }