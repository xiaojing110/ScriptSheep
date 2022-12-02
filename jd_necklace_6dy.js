/*
点点券
入口：京东APP-领券-左上角领券中心
35 16 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_necklace_6dy.js
updatetime:2022/11/28 新增每日签到
 */
const $ = new Env('点点券-加密');
const Bi = require('./function/dylant.js'),
      BD = require('./function/dylanx.js'),
      Bu = require('crypto-js');

let BF = '';
const BJ = $.isNode() ? require('./sendNotify') : '',
      Bf = $.isNode() ? require('./jdCookie.js') : '',
      BT = 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/41Lkp7DumXYCFmPYtU3LTcnTTXTX/index.html%22%20%7D';
let BM = '';
$.appid = '50082';
$.scid = 'DDhomePageh5';
$.suc = 'yes';
let BH = [],
    Bq = '';

if ($.isNode()) {
  Object.keys(Bf).forEach(B => {
    BH.push(Bf[B]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else BH = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...c0($.getdata('CookiesJD') || '[]').map(B => B.cookie)].filter(B => !!B);

const BX = 'https://api.m.jd.com/api';
!(async () => {
  if (!BH[0]) {
    const V = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', V);
    return;
  }

  console.log('只跑前6个CK，问题建议：https://t.me/dylan_jdpro');

  for (let a = 0; a < 6; a++) {
    BH[a] && (Bq = BH[a], $.UserName = decodeURIComponent(Bq.match(/pt_pin=([^; ]+)(?=;?)/) && Bq.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = a + 1, $.isLogin = true, $.nickName = '', BM = '', errorMsgLllegal = 0, $.jdk = c2('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'), $.joyytoken = '', $.joyytoken_count = 1, c1(), console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), await Bm(), await BE(), await $.wait(3000), console.countReset('收取成功'));
  }

  if ($.isNode() && BF) {
    const L = {};
    L.url = BT, await BJ.sendNotify('' + $.name, '' + BF, L);
  }
})().catch(B => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + B + '!', '');
}).finally(() => {
  $.done();
});

async function BE() {
  try {
    await Bd(), await $.wait(1000), await BC(), await $.wait(1000), await Bz(), await $.wait(1000), await Bd(), await $.wait(1000), await BI(), await $.wait(1000), await Bw(), await BW();
  } catch (c) {
    $.logErr(c);
  }
}

function BW() {
  return new Promise(async c => {
    $.msg('京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n当前点点券：' + $.totalScore + '个\n可兑换红包：' + $.totalScore / 1000 + '元'), c();
  });
}

async function Bz() {
  console.log('\n开始任务...');

  for (let c of $.taskConfigVos) {
    if (c.taskStage === 0) {
      console.log('【' + c.taskName + '】 任务未领取,开始领任务');
      let l = await BY(c.id);
      l && l.rtn_code == 0 && (console.log('【' + c.taskName + '】 任务领取成功,开始做任务'), await $.wait(2000), await Bk(c), await $.wait(2000));
    } else {
      if (c.taskStage === 2) console.log('【' + c.taskName + '】 任务已完成,未领奖');else {
        if (c.taskStage === 3) console.log(c.taskName + '任务已完成');else c.taskStage === 1 && (console.log('\n【' + c.taskName + '】 任务已领取但未完成,开始做任务'), await Bk(c), await $.wait(2000));
      }
    }
  }
}

async function BI() {
  $.scorenum = 0, console.log('\n开始收取点点券...');

  for (let c of $.bubbles) {
    await By(c.id), await $.wait(2000);
  }

  if ($.scorenum) console.log('明日额外赠送' + $.scorenum + '\n');
}

async function BC() {
  if ($.signInfo && !$.signInfo.signed) {
    let a = 0;
    console.log('开始每日签到...');
    await Bh();
    await $.wait(200);
    await BP();
    await $.wait(500);
  } else $.signInfo && console.log('今日已签到！');
}

async function Bk(B = {}) {
  B.taskType === 2 && (B.requireBrowseSeconds && (await BY(B.id, 'necklace_timedTask'), await $.wait(B.requireBrowseSeconds * 1000)), await BY(B.id, 'necklace_reportTask'));
  await $.wait(100);

  if (B.taskType === 6 || B.taskType === 8 || B.taskType === 5 || B.taskType === 9 || B.taskType === 7) {
    await Bv(B.id), $.taskItems = $.taskItems.filter(a => !!a && a.status === 0);

    for (let a of $.taskItems) {
      console.log('浏览【' + a.title + '】');

      if (B.requireBrowseSeconds) {
        await BY(B.id, 'necklace_timedTask', a.id), await $.wait(B.requireBrowseSeconds * 1000);
      }

      await BY(B.id, 'necklace_reportTask', a.id), await $.wait(500);
    }
  }

  if (B.taskType === 3) await Bs('3', B.id);
  if (B.taskType === 4) await Bs('4', B.id);
}

function BP() {
  return new Promise(async V => {
    let a = Bu.MD5($.UserName).toString().substring(8, 24),
        L = BN($.UserName, a);
    const G = {
      'eid': '',
      'monitorRefer': 'appClient',
      'sessionId': '',
      'shshshfpb': '',
      'verifyToken': '',
      'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
      'monitorSource': 'cc_sign_android_index_config',
      'pageClickKey': 'Coupons_GetCenter'
    };
    G.pin = L;
    G.signature = $.singarute;
    let n = G;
    n = BD.getbody('ccSignInNecklace', n);
    const g = {
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
    };
    g.Cookie = Bq;
    const U = {
      'url': 'https://api.m.jd.com/client.action?functionId=ccSignInNecklace'
    };
    U.body = n, U.headers = g;
    let e = U;
    $.post(e, async (b, j, Q) => {
      try {
        b ? (console.log('' + JSON.stringify(b)), console.log('necklace_sign API请求失败，请检查网路重试')) : BZ(Q) && (Q = JSON.parse(Q), Q.busiCode == 0 ? console.log('签到成功，获得：' + Q.result.signResult.signData.necklaceScore) : console.log('签到失败：' + Q.message + '\n'));
      } catch (K) {
        $.logErr(K, j);
      } finally {
        V(Q);
      }
    });
  });
}

function Bh() {
  return new Promise(async a => {
    const n = {
      'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
      'eid': '',
      'incentiveShowTimes': 0x0,
      'lat': '',
      'lng': '',
      'monitorRefer': '',
      'rewardShowTimes': 0x0,
      'shshshfpb': '',
      'sourceFrom': '1',
      'monitorSource': 'ccresource_android_index_config',
      'pageClickKey': 'Coupons_GetCenter'
    };
    let g = n;
    g = BD.getbody('getCouponConfig', g);
    const U = {
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
    };
    U.Cookie = Bq;
    const e = {
      'url': 'https://api.m.jd.com/client.action?functionId=getCouponConfig'
    };
    e.body = g, e.headers = U;
    let b = e;
    $.post(b, async (j, Q, O) => {
      try {
        if (j) console.log('' + JSON.stringify(j)), console.log('necklace_sign API请求失败，请检查网路重试');else {
          BZ(O) && (O = JSON.parse(O), $.singarute = O.result.couponConfig.signNecklaceDomain.signature);
        }
      } catch (u) {
        $.logErr(u, Q);
      } finally {
        a(O);
      }
    });
  });
}

function Br() {
  return new Promise(async a => {
    const G = {
      'benefitId': '',
      'channel': '',
      'couponSource': '',
      'couponSourceDetail': '',
      'lat': '6d0e2f283aac67aba54651b9c39f8864',
      'pageClickKey': 'Coupons_GetCenter',
      'shshshfpb': 'JD012145b9gUnYyoyQw9166912783633505nbKNPTQT9r8ls9K5XcxhxsU9iQS-6u124BPZuBJB1ZpJVbrVscMaGUJTlqRy1SnZFufacc5uNSLianID39Kro4DkUSXHVvNL7_Qiu5hG9wI1w9c2o9~qyeHwreBcOdaH-ME74-6Nb8WnLJXPSGz9tjvg2_PZMQu0-oC6nVyfjjZ51wrk5AEk6d4UaDUQ4ZqtpK9R14BWS02aMEigspoIwqhL2tIZihalc9MURLG3f4xc43Tr5po4RkXTnuD0dTZ0n8NW6q5qU_X3d0elFZuuqUJ1CsD_OLs',
      'subChannel': '',
      'childActivityUrl': 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
      'eid': 'eidAc9cd812261sbyDcaPLf/Q+265AkRhEojp8g3G7tZXQti3rJiCvgAq/Q9CI5W6SHUS29KulUr1gOMrqymtiyFFxfSSnz/PWo2q0Jphq0rdiXEZ9Jw',
      'encryptedParam': '5xR83AftQlCt2ohMnMZg3+AVM1XSwxciq5xLYXJmZUPKG2UeZkqDw3Sg7sqLho0u0H40QCWO5TQ0FWDvVMGsOtCnJng2miYjV7DPsmZ3rkC84p73CS3kUEevxtE7yT3sWO0jm3BOQAt5cvUJVambdR/+6armJQZ7w6wnklQAGy/Ehl4SxRtXSW9IWd9OYMkhSXsPj+/OOu6Wj7Gva06Ejg==',
      'lng': '0461bd6793680fce5da576f949c15fb0',
      'platform': 'coupon-center',
      'source': 'ccmain'
    };
    let n = G;
    n = dylan.getbody('getBenefit', n);
    const g = {
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
    };
    g.Cookie = Bq;
    const U = {
      'url': 'https://api.m.jd.com/client.action?functionId=getBenefit'
    };
    U.body = n, U.headers = g;
    let e = U;
    $.post(e, async (b, j, Q) => {
      try {
        if (b) console.log('' + JSON.stringify(b)), console.log('getBenefit API请求失败，请检查网路重试');else {
          if (BZ(Q)) {
            Q = JSON.parse(Q);
            if (Q.rtn_code === 0) Q.data.biz_code === 0 && console.log('签到成功，时间：' + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString());else {
              if (Q.rtn_code === 403 || Q.rtn_msg.indexOf('非法请求') > -1) {
                console.log('每日签到失败：' + Q.rtn_msg + '\n'), errorMsgLllegal += 1, c1();
              } else console.log('每日签到失败：' + JSON.stringify(Q) + '\n');
            }
          }
        }
      } catch (F) {
        $.logErr(F, j);
      } finally {
        a(Q);
      }
    });
  });
}

function BS(B) {
  return new Promise(l => {
    const a = {
      'scoreNums': B,
      'giftConfigId': 0x1f,
      'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
    };
    $.post(BR('necklace_exchangeGift', a), async (L, G, n) => {
      try {
        if (L) console.log('' + JSON.stringify(L)), console.log('necklace_exchangeGift API请求失败，请检查网路重试');else {
          if (BZ(n)) {
            n = JSON.parse(n);

            if (n.rtn_code === 0) {
              if (n.data.biz_code === 0) {
                const {
                  result: U
                } = n.data;
                BM += U.redpacketTitle + '：' + U.redpacketAmount + '元兑换成功\n';
                const b = {
                  'hour12': false
                };
                BM += '红包有效期：' + new Date(U.endTime + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString('zh', b), console.log(BM);
              }
            }
          }
        }
      } catch (j) {
        $.logErr(j, G);
      } finally {
        l(n);
      }
    });
  });
}

function Bw() {
  return new Promise(V => {
    {
      const L = {};
      $.post(BR('necklace_expiringScoreDetails', L), async (G, n, g) => {
        try {
          if (G) console.log('' + JSON.stringify(G)), console.log('necklace_expiringScoreDetails API请求失败，请检查网路重试');else {
            if (BZ(g)) {
              g = JSON.parse(g);

              if (g.rtn_code === 0) {
                if (g.data.result) {
                  console.log('近七天将过期数量：' + g.data.result.totalExpiringScore);
                }
              }
            }
          }
        } catch (O) {
          $.logErr(O, n);
        } finally {
          V(g);
        }
      });
    }
  });
}

function By(B) {
  return new Promise(async l => {
    $.id = B, $.action = 'chargeScores';
    const L = await Bi.geturl($);
    $.post(BR('necklace_chargeScores', L), async (G, n, g) => {
      try {
        if (G) console.log('' + JSON.stringify(G)), console.log('necklace_chargeScores API请求失败，请检查网路重试');else {
          if (BZ(g)) {
            g = JSON.parse(g);

            if (g.rtn_code === 0) {
              if (g.data.biz_code === 0) {
                console.count('收取成功'), $.scorenum = g.data.result.giftScoreNum, $.totalScore = g.data.result.totalScoreNum;
              }
            } else g.rtn_code === 403 || g.rtn_msg.indexOf('非法请求') > -1 ? (console.log('领取奖励失败：' + g.rtn_msg + '\n'), errorMsgLllegal += 1, c1()) : console.log('领取奖励失败：' + JSON.stringify(g) + '\n');
          }
        }
      } catch (K) {
        $.logErr(K, n);
      } finally {
        l(g);
      }
    });
  });
}

function BY(c, l = 'necklace_startTask', V = '') {
  return new Promise(async G => {
    let g = {
      'taskId': c,
      'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
    };

    if (l == 'necklace_startTask') {
      $.id = c, $.action = 'startTask', g = await Bi.geturl($);
    } else {
      if (V) g.itemId = V;
    }

    $.post(BR(l, g), async (b, j, Q) => {
      try {
        if (b) console.log('' + JSON.stringify(b)), console.log('necklace_startTask API请求失败，请检查网路重试');else {
          if (BZ(Q)) {
            Q = JSON.parse(Q), console.log((l === 'necklace_startTask' ? '领任务结果' : '做任务结果') + '：' + Q.rtn_msg);

            if (Q.rtn_code === 0) {
              if (Q.data.biz_code === 0) {}
            } else {
              if (Q.rtn_code === 403 || Q.rtn_msg.indexOf('非法请求') > -1) {
                console.log((l === 'necklace_startTask' ? '领任务失败' : '做任务失败') + '：' + Q.rtn_msg + '\n'), errorMsgLllegal += 1;
              } else console.log((l === 'necklace_startTask' ? '领取任务失败' : '做任务失败') + '：' + JSON.stringify(Q) + '\n');
            }
          }
        }
      } catch (u) {
        $.logErr(u, j);
      } finally {
        G(Q);
      }
    });
  });
}

function Bv(B) {
  return new Promise(l => {
    {
      const L = {
        'taskId': B,
        'currentDate': $.lastRequestTime.replace(/:/g, '%3A')
      };
      $.taskItems = [], $.post(BR('necklace_getTask', L), async (G, n, g) => {
        try {
          if (G) console.log('' + JSON.stringify(G)), console.log('necklace_getTask API请求失败，请检查网路重试');else {
            if (BZ(g)) {
              g = JSON.parse(g);
              if (g.rtn_code === 0) g.data.biz_code === 0 && ($.taskItems = g.data.result && g.data.result.taskItems);else g.rtn_code === 403 || g.rtn_msg.indexOf('非法请求') > -1 ? (console.log('失败：' + g.rtn_msg + '\n'), errorMsgLllegal += 1, c1()) : console.log('失败：' + JSON.stringify(g) + '\n');
            }
          }
        } catch (O) {
          $.logErr(O, n);
        } finally {
          l();
        }
      });
    }
  });
}

function Bd() {
  $.taskConfigVos = [];
  $.bubbles = [], $.signInfo = {};
  return new Promise(c => {
    $.post(BR('necklace_homePage'), async (a, L, G) => {
      try {
        if (a) {
          console.log('' + JSON.stringify(a)), console.log('necklace_homePage API请求失败，请检查网路重试');
        } else BZ(G) && (G = JSON.parse(G), G.rtn_code === 0 && G.data.biz_code === 0 && ($.taskConfigVos = G.data.result.taskConfigVos, $.exchangeGiftConfigs = G.data.result.exchangeGiftConfigs, $.lastRequestTime = G.data.result.lastRequestTime, $.bubbles = G.data.result.bubbles, $.signInfo = G.data.result.newSignInfo, $.totalScore = G.data.result.totalScore));
      } catch (j) {
        $.logErr(j, L);
      } finally {
        c();
      }
    });
  });
}

function BN(c, l) {
  let L = Bu.enc.Utf8.parse(l),
      G = Bu.enc.Utf8.parse(c);
  let n = Bu.AES.encrypt(G, L, {
    'iv': Bu.enc.Utf8.parse('1111111111111111'.substr(0, 16)),
    'mode': Bu.mode.CBC,
    'padding': Bu.pad.Pkcs7
  });
  return n.ciphertext.toString();
}

async function Bs(c = '3', l) {
  let a, L;

  if (c === '4') {
    let n = 0;
    a = 'getSinkTaskList';
    L = '&appid=XPMSGC2019&monitorSource=&functionId=getSinkTaskList&body=%7B%22platformType%22%3A%221%22%2C%22sinkIconFrom%22%3A%22%22%7D&client=m&clientVersion=5.8.0&area=14_1116_1119_50040&eu=3356364313533373&fv=0356539313538326';
    await BA(a, L, c);
    a = 'reportSinkTask';
    L = '&appid=XPMSGC2019&monitorSource=&functionId=reportSinkTask&body=%7B%22platformType%22%3A%221%22%2C%22taskId%22%3A%22necklace_' + l + '%22%7D&client=m&clientVersion=5.8.0&eu=3356364313533374&fv=0356539313538327';
  } else {
    let U = 0;
    a = 'getCcTaskList';
    L = BD.getbody(a, {});
    await BA(a, L, c);
    a = 'reportCcTask';
    const e = {
      'monitorRefer': '',
      'monitorSource': 'ccgroup_android_index_task',
      'taskType': '2'
    };
    e.taskId = 'necklace_' + l, L = BD.getbody('reportCcTask', e);
  }

  console.log('等待15秒...'), await $.wait(16000), await BA(a, L, c);
}

function BA(c, l, V = '3') {
  let G = 'https://api.m.jd.com/client.action?functionId=' + c;
  return new Promise(n => {
    (c === 'reportSinkTask' || c === 'getSinkTaskList') && (G += l, l = '');
    const U = {
      'url': G,
      'body': l,
      'headers': {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.m.jd.com',
        'Origin': 'https://h5.m.jd.com',
        'Cookie': Bq + ('joyytoken=' + ('50082' + $.joyytoken) + ';'),
        'Referer': 'https://h5.m.jd.com/',
        'User-Agent': $.UA
      }
    };
    $.post(U, async (b, j, Q) => {
      try {
        if (b) console.log('' + JSON.stringify(b)), console.log($.name + ' API请求失败，请检查网路重试');else {
          if (BZ(Q)) {
            Q = JSON.parse(Q);
            if (V === '3' && c === 'reportCcTask') console.log('点击首页领券图标任务:' + Q.message);
            if (V === '4' && c === 'reportSinkTask') console.log('点击“券后9.9”任务:' + Q.message);
          }
        }
      } catch (i) {
        $.logErr(i, j);
      } finally {
        n();
      }
    });
  });
}

function BR(B, c = {}) {
  let a = Bq.match(/pt_key=([^; ]+)(?=;?)/)[1];
  return {
    'url': BX + '?functionId=' + B + '&appid=coupon-necklace&loginType=2&t=' + Date.now(),
    'body': 'body=' + encodeURIComponent(JSON.stringify(c)),
    'headers': {
      'Host': 'api.m.jd.com',
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/x-www-form-urlencoded',
      'Origin': 'https://h5.m.jd.com',
      'User-Agent': $.UA,
      'Referer': 'https://h5.m.jd.com/',
      'Cookie': 'pt_key=app_open' + a + ';' + Bq + ('joyytoken=' + ('50082' + $.joyytoken) + ';')
    }
  };
}

function Bm() {
  const l = {
    'url': 'https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy',
    'timeout': 0x7530
  };
  let V = l;
  return new Promise(a => {
    $.get(V, async (L, G, n) => {
      try {
        if (L) {
          console.log('\n服务连接失败，终止执行！'), process.exit(111);
        } else n && (n = JSON.parse(n), n.code === 200 ? ($.suc = 'no', $.ver = n.version) : (console.log('\n' + n.msg), process.exit(111)));
      } catch (j) {
        $.logErr(j, G);
      } finally {
        a(n);
      }
    });
  });
}

function BZ(B) {
  try {
    if (typeof JSON.parse(B) == 'object') return true;
  } catch (l) {
    return console.log(l), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function c0(V) {
  const G = function () {
    {
      let U = true;
      return function (b, j) {
        const O = U ? function () {
          if (j) {
            const t = j.apply(b, arguments);
            return j = null, t;
          }
        } : function () {};
        return U = false, O;
      };
    }
  }(),
        n = G(this, function () {
    return n.toString().search('(((.+)+)+)+$').toString().constructor(n).search('(((.+)+)+)+$');
  });

  n();
  if (typeof V == 'string') try {
    return JSON.parse(V);
  } catch (g) {
    return console.log(g), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}

function c1() {
  let c = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
      l = ['9', '10', '11', '12'];
  let V = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
      a = ['98413', '98416', '98415', '98417', '98450'];
  $.dv = c[Math.floor(Math.random() * c.length)], $.iv = l[Math.floor(Math.random() * l.length)];
  $.av = V[Math.floor(Math.random() * V.length)], $.bv = a[Math.floor(Math.random() * a.length)];

  getstr = function (g) {
    let U = '',
        b = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let j = 0; j < g; j++) {
      let O = Math.round(Math.random() * (b.length - 1));
      U += b.substring(O, O + 1);
    }

    return U;
  };

  let L = Buffer.from(getstr(16), 'utf8').toString('base64'),
      G = Buffer.from(getstr(16), 'utf8').toString('base64');
  let n = encodeURIComponent(JSON.stringify({
    'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    'ts': Date.now(),
    'ridx': -1,
    'cipher': {
      'sv': 'CJS=',
      'ad': L,
      'od': G,
      'ov': 'CzO=',
      'ud': L
    },
    'ciphertype': 0x5,
    'version': '1.2.0',
    'appname': 'com.jingdong.app.mall'
  }));
  $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';ef/1;ep/' + n + ';jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36';
}

function c2(c = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', l = 0) {
  return c.replace(/[xy]/g, function (L) {
    var G = 16 * Math.random() | 0,
        g = 'x' == L ? G : 3 & G | 8;
    return uuid = l ? g.toString(36).toUpperCase() : g.toString(36), uuid;
  });
}

function c3(c) {
  c = c || 32;
  let L = 'abcdef0123456789',
      G = L.length,
      g = '';

  for (i = 0; i < c; i++) g += L.charAt(Math.floor(Math.random() * G));

  return g;
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}