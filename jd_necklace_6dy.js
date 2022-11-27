/*
点点券
入口：京东APP-领券-左上角领券中心
45 14 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_necklace_6dy.js
updatetime:2022/11/24 
 */
const $ = new Env('点点券-加密');
const _0x1c9da5 = require('./function/dylant.js');
let _0xdbe227 = '';
const _0x422cae = $.isNode() ? require('./sendNotify') : '';
const _0x537cd7 = $.isNode() ? require('./jdCookie.js') : '';
const _0x301a50 = 'openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/41Lkp7DumXYCFmPYtU3LTcnTTXTX/index.html%22%20%7D';
let _0x2b81a9 = '';

$.appid = '50082';
$.scid = 'DDhomePageh5';
$.suc = 'yes';
let _0x415655 = [],
    _0x2402aa = '';

if ($.isNode()) {
  Object.keys(_0x537cd7).forEach(_0x538a7b => {
    _0x415655.push(_0x537cd7[_0x538a7b]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }
} else {
  _0x415655 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x1f1cab($.getdata('CookiesJD') || '[]').map(_0x552ff2 => _0x552ff2.cookie)].filter(_0x44209e => !!_0x44209e);
}

const _0x1630d0 = 'https://api.m.jd.com/api';
!(async () => {
  if (!_0x415655[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  console.log('只跑前6个CK，问题建议：https://t.me/dylan_jdpro');

  for (let _0x599ef8 = 0; _0x599ef8 < 6; _0x599ef8++) {
    if (_0x415655[_0x599ef8]) {
      _0x2402aa = _0x415655[_0x599ef8];
      $.UserName = decodeURIComponent(_0x2402aa.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2402aa.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x599ef8 + 1;
      $.isLogin = true;
      $.nickName = '';
      _0x2b81a9 = '';
      errorMsgLllegal = 0;
      $.jdk = _0xc664af('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      $.joyytoken = '';
      $.joyytoken_count = 1;

      _0xaccb43();

      console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n');
      await _0x4d5b59();
      await _0x498ab1();
      await $.wait(3000);
    }
  }

  if ($.isNode() && _0xdbe227) {
    const _0x5c006f = {
      url: _0x301a50
    };
    await _0x422cae.sendNotify('' + $.name, '' + _0xdbe227, _0x5c006f);
  }
})().catch(_0xdf0453 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0xdf0453 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x498ab1() {
  try {
    await _0x473b81();
    await $.wait(1000);
    await _0x4bb73b();
    await $.wait(1000);
    await _0x473b81();
    await $.wait(1000);
    await _0x1d120f();
    await $.wait(1000);
    await _0x473b81();
    await $.wait(500);
    await _0x91689d();
    await _0x452003();
  } catch (_0x5db133) {
    $.logErr(_0x5db133);
  }
}

function _0x452003() {
  return new Promise(async _0x16e69a => {
    $.msg('京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n当前点点券：' + $.totalScore + '个\n可兑换红包：' + $.totalScore / 1000 + '元'), _0x16e69a();
  });
}

async function _0x4bb73b() {
  for (let _0x3bb1b1 of $.taskConfigVos) {
    if (_0x3bb1b1.taskStage === 0) {
      console.log('【' + _0x3bb1b1.taskName + '】 任务未领取,开始领任务');

      let _0xef7f0a = await _0x343fed(_0x3bb1b1.id);

      if (_0xef7f0a && _0xef7f0a.rtn_code == 0) {
        console.log('【' + _0x3bb1b1.taskName + '】 任务领取成功,开始做任务');
        await $.wait(2000);
        await _0x2290b2(_0x3bb1b1);
        await $.wait(2000);
      }
    } else {
      if (_0x3bb1b1.taskStage === 2) {
        console.log('【' + _0x3bb1b1.taskName + '】 任务已完成,未领奖');
      } else {
        if (_0x3bb1b1.taskStage === 3) {
          console.log(_0x3bb1b1.taskName + '任务已完成');
        } else {
          _0x3bb1b1.taskStage === 1 && (console.log('\n【' + _0x3bb1b1.taskName + '】 任务已领取但未完成,开始做任务'), await _0x2290b2(_0x3bb1b1), await $.wait(2000));
        }
      }
    }
  }
}

async function _0x1d120f() {
  $.scorenum = 0;
  console.log('\n开始收取...');

  for (let _0xdb2195 of $.bubbles) {
    await _0x23c719(_0xdb2195.id);
    await $.wait(2000);
  }

  console.log('本次总计收取' + $.scorenum + '\n');
}

async function _0x46effa() {
  if ($.signInfo && !$.signInfo.signed) {
    console.log('\n开始每日签到...'), await _0x328bfc();
  } else {
    $.signInfo && console.log('当前' + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString() + '已签到');
  }
}

async function _0x2290b2(_0x9fa37b = {}) {
  _0x9fa37b.taskType === 2 && (_0x9fa37b.requireBrowseSeconds && (await _0x343fed(_0x9fa37b.id, 'necklace_timedTask'), await $.wait(_0x9fa37b.requireBrowseSeconds * 1000)), await _0x343fed(_0x9fa37b.id, 'necklace_reportTask'));
  await $.wait(100);

  if (_0x9fa37b.taskType === 6 || _0x9fa37b.taskType === 8 || _0x9fa37b.taskType === 5 || _0x9fa37b.taskType === 9 || _0x9fa37b.taskType === 7) {
    await _0x242e09(_0x9fa37b.id);
    $.taskItems = $.taskItems.filter(_0xcf2780 => !!_0xcf2780 && _0xcf2780.status === 0);

    for (let _0x2c125d of $.taskItems) {
      console.log('浏览【' + _0x2c125d.title + '】');
      _0x9fa37b.requireBrowseSeconds && (await _0x343fed(_0x9fa37b.id, 'necklace_timedTask', _0x2c125d.id), await $.wait(_0x9fa37b.requireBrowseSeconds * 1000));
      await _0x343fed(_0x9fa37b.id, 'necklace_reportTask', _0x2c125d.id);
      await $.wait(500);
    }
  }
}

function _0x328bfc() {
  return new Promise(async _0x48a8d7 => {
    const _0x5720ee = {
      childActivityUrl: 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
      eid: '-1',
      monitorRefer: 'appClient',
      monitorSource: 'cc_sign_android_index_config',
      pageClickKey: 'Coupons_GetCenter',
      pin: '',
      sessionId: '',
      shshshfpb: '-1',
      signature: '',
      verifyToken: ''
    };
    let _0x4f310c = _0x5720ee;
    _0x4f310c = dylan.getbody('ccSignInNecklace', _0x4f310c);
    const _0x4b4094 = {
      Cookie: _0x2402aa,
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
    };
    const _0xd3cea = {
      url: 'https://api.m.jd.com/client.action?functionId=ccSignInNecklace&eid=-1',
      body: _0x4f310c,
      headers: _0x4b4094
    };
    let _0x12dd5f = _0xd3cea;
    $.post(_0x12dd5f, async (_0x26e13b, _0x4c8399, _0x3eff2d) => {
      try {
        if (_0x26e13b) {
          console.log('' + JSON.stringify(_0x26e13b)), console.log('necklace_sign API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x3eff2d)) {
            _0x3eff2d = JSON.parse(_0x3eff2d);

            if (_0x3eff2d.rtn_code === 0) {
              _0x3eff2d.data.biz_code === 0 && console.log('签到成功，时间：' + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString());
            } else {
              _0x3eff2d.rtn_code === 403 || _0x3eff2d.rtn_msg.indexOf('非法请求') > -1 ? (console.log('每日签到失败：' + _0x3eff2d.rtn_msg + '\n'), errorMsgLllegal += 1, _0xaccb43()) : console.log('每日签到失败：' + JSON.stringify(_0x3eff2d) + '\n');
            }
          }
        }
      } catch (_0x880421) {
        $.logErr(_0x880421, _0x4c8399);
      } finally {
        _0x48a8d7(_0x3eff2d);
      }
    });
  });
}

function _0x2e33f7() {
  return new Promise(async _0x2e380a => {
    const _0x32ecc5 = {
      benefitId: '',
      channel: '',
      childActivityUrl: 'openapp.jdmobile://virtual?params={"category":"jump","des":"couponCenter"}',
      couponSource: '',
      couponSourceDetail: '',
      eid: 'eidAc9cd812261sbyDcaPLf/Q+265AkRhEojp8g3G7tZXQti3rJiCvgAq/Q9CI5W6SHUS29KulUr1gOMrqymtiyFFxfSSnz/PWo2q0Jphq0rdiXEZ9Jw',
      encryptedParam: '5xR83AftQlCt2ohMnMZg3+AVM1XSwxciq5xLYXJmZUPKG2UeZkqDw3Sg7sqLho0u0H40QCWO5TQ0FWDvVMGsOtCnJng2miYjV7DPsmZ3rkC84p73CS3kUEevxtE7yT3sWO0jm3BOQAt5cvUJVambdR/+6armJQZ7w6wnklQAGy/Ehl4SxRtXSW9IWd9OYMkhSXsPj+/OOu6Wj7Gva06Ejg==',
      lat: '6d0e2f283aac67aba54651b9c39f8864',
      lng: '0461bd6793680fce5da576f949c15fb0',
      pageClickKey: 'Coupons_GetCenter',
      platform: 'coupon-center',
      shshshfpb: 'JD012145b9gUnYyoyQw9166912783633505nbKNPTQT9r8ls9K5XcxhxsU9iQS-6u124BPZuBJB1ZpJVbrVscMaGUJTlqRy1SnZFufacc5uNSLianID39Kro4DkUSXHVvNL7_Qiu5hG9wI1w9c2o9~qyeHwreBcOdaH-ME74-6Nb8WnLJXPSGz9tjvg2_PZMQu0-oC6nVyfjjZ51wrk5AEk6d4UaDUQ4ZqtpK9R14BWS02aMEigspoIwqhL2tIZihalc9MURLG3f4xc43Tr5po4RkXTnuD0dTZ0n8NW6q5qU_X3d0elFZuuqUJ1CsD_OLs',
      source: 'ccmain',
      subChannel: ''
    };
    let _0xa82984 = _0x32ecc5;
    _0xa82984 = dylan.getbody('getBenefit', _0xa82984);
    const _0x21d36f = {
      Cookie: _0x2402aa,
      'content-type': 'application/x-www-form-urlencoded',
      'User-Agent': 'okhttp/3.12.1;jdmall;android;version/11.3.0;build/98413;'
    };
    const _0xc8126d = {
      url: 'https://api.m.jd.com/client.action?functionId=getBenefit',
      body: _0xa82984,
      headers: _0x21d36f
    };
    let _0xc33869 = _0xc8126d;
    $.post(_0xc33869, async (_0x56bf33, _0x31765d, _0x3bc467) => {
      try {
        if (_0x56bf33) {
          console.log('' + JSON.stringify(_0x56bf33));
          console.log('getBenefit API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x3bc467)) {
            _0x3bc467 = JSON.parse(_0x3bc467);

            if (_0x3bc467.rtn_code === 0) {
              if (_0x3bc467.data.biz_code === 0) {
                console.log('签到成功，时间：' + new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString());
              }
            } else {
              if (_0x3bc467.rtn_code === 403 || _0x3bc467.rtn_msg.indexOf('非法请求') > -1) {
                console.log('每日签到失败：' + _0x3bc467.rtn_msg + '\n');
                errorMsgLllegal += 1;

                _0xaccb43();
              } else {
                console.log('每日签到失败：' + JSON.stringify(_0x3bc467) + '\n');
              }
            }
          }
        }
      } catch (_0x44a7e1) {
        $.logErr(_0x44a7e1, _0x31765d);
      } finally {
        _0x2e380a(_0x3bc467);
      }
    });
  });
}

function _0x177463(_0x5c76a9) {
  return new Promise(_0x53c56d => {
    const _0x23f584 = {
      scoreNums: _0x5c76a9,
      giftConfigId: 31,
      currentDate: $.lastRequestTime.replace(/:/g, '%3A')
    };
    $.post(_0x1fecb2('necklace_exchangeGift', _0x23f584), async (_0x4666d2, _0x4cbc3a, _0x1b0901) => {
      try {
        if (_0x4666d2) {
          console.log('' + JSON.stringify(_0x4666d2)), console.log('necklace_exchangeGift API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x1b0901)) {
            _0x1b0901 = JSON.parse(_0x1b0901);

            if (_0x1b0901.rtn_code === 0) {
              if (_0x1b0901.data.biz_code === 0) {
                const {
                  result: _0xd21c02
                } = _0x1b0901.data;
                _0x2b81a9 += _0xd21c02.redpacketTitle + '：' + _0xd21c02.redpacketAmount + '元兑换成功\n';
                const _0x197f4f = {
                  hour12: false
                };
                _0x2b81a9 += '红包有效期：' + new Date(_0xd21c02.endTime + new Date().getTimezoneOffset() * 60 * 1000 + 28800000).toLocaleString('zh', _0x197f4f);
                console.log(_0x2b81a9);
              }
            }
          }
        }
      } catch (_0x578e24) {
        $.logErr(_0x578e24, _0x4cbc3a);
      } finally {
        _0x53c56d(_0x1b0901);
      }
    });
  });
}

function _0x91689d() {
  return new Promise(_0x3920b4 => {
    const _0x50cc92 = {};
    $.post(_0x1fecb2('necklace_expiringScoreDetails', _0x50cc92), async (_0x57cf4b, _0x36a091, _0x25e366) => {
      try {
        _0x57cf4b ? (console.log('' + JSON.stringify(_0x57cf4b)), console.log('necklace_expiringScoreDetails API请求失败，请检查网路重试')) : _0x19198e(_0x25e366) && (_0x25e366 = JSON.parse(_0x25e366), _0x25e366.rtn_code === 0 && _0x25e366.data.result && console.log('近七天将过期数量：' + _0x25e366.data.result.totalExpiringScore));
      } catch (_0x551bc0) {
        $.logErr(_0x551bc0, _0x36a091);
      } finally {
        _0x3920b4(_0x25e366);
      }
    });
  });
}

function _0x23c719(_0x138b36) {
  return new Promise(async _0x2a8606 => {
    $.id = _0x138b36;
    $.action = 'chargeScores';

    const _0x4554ea = await _0x1c9da5.geturl($);

    $.post(_0x1fecb2('necklace_chargeScores', _0x4554ea), async (_0xf33f28, _0x36b9cb, _0x44015d) => {
      try {
        if (_0xf33f28) {
          console.log('' + JSON.stringify(_0xf33f28));
          console.log('necklace_chargeScores API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x44015d)) {
            _0x44015d = JSON.parse(_0x44015d);

            if (_0x44015d.rtn_code === 0) {
              _0x44015d.data.biz_code === 0 && (console.count('收取成功'), $.scorenum = _0x44015d.data.result.giftScoreNum);
            } else {
              _0x44015d.rtn_code === 403 || _0x44015d.rtn_msg.indexOf('非法请求') > -1 ? (console.log('领取奖励失败：' + _0x44015d.rtn_msg + '\n'), errorMsgLllegal += 1, _0xaccb43()) : console.log('领取奖励失败：' + JSON.stringify(_0x44015d) + '\n');
            }
          }
        }
      } catch (_0x1bfc41) {
        $.logErr(_0x1bfc41, _0x36b9cb);
      } finally {
        _0x2a8606(_0x44015d);
      }
    });
  });
}

function _0x343fed(_0x1548ad, _0x567e94 = 'necklace_startTask', _0x582129 = '') {
  return new Promise(async _0x1caaf0 => {
    let _0x94f742 = {
      taskId: _0x1548ad,
      currentDate: $.lastRequestTime.replace(/:/g, '%3A')
    };

    if (_0x567e94 == 'necklace_startTask') {
      $.id = _0x1548ad;
      $.action = 'startTask';
      _0x94f742 = await _0x1c9da5.geturl($);
    } else {
      if (_0x582129) {
        _0x94f742.itemId = _0x582129;
      }
    }

    $.post(_0x1fecb2(_0x567e94, _0x94f742), async (_0x3513f4, _0x3470bc, _0x572454) => {
      try {
        if (_0x3513f4) {
          console.log('' + JSON.stringify(_0x3513f4));
          console.log('necklace_startTask API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x572454)) {
            _0x572454 = JSON.parse(_0x572454);
            console.log((_0x567e94 === 'necklace_startTask' ? '领任务结果' : '做任务结果') + '：' + _0x572454.rtn_msg);

            if (_0x572454.rtn_code === 0) {
              if (_0x572454.data.biz_code === 0) {}
            } else {
              _0x572454.rtn_code === 403 || _0x572454.rtn_msg.indexOf('非法请求') > -1 ? (console.log((_0x567e94 === 'necklace_startTask' ? '领任务失败' : '做任务失败') + '：' + _0x572454.rtn_msg + '\n'), errorMsgLllegal += 1) : console.log((_0x567e94 === 'necklace_startTask' ? '领取任务失败' : '做任务失败') + '：' + JSON.stringify(_0x572454) + '\n');
            }
          }
        }
      } catch (_0x2583cf) {
        $.logErr(_0x2583cf, _0x3470bc);
      } finally {
        _0x1caaf0(_0x572454);
      }
    });
  });
}

function _0x242e09(_0x4f5044) {
  return new Promise(_0xdf01b9 => {
    const _0xad7e63 = {
      taskId: _0x4f5044,
      currentDate: $.lastRequestTime.replace(/:/g, '%3A')
    };
    $.taskItems = [];
    $.post(_0x1fecb2('necklace_getTask', _0xad7e63), async (_0x1ea6c2, _0x4452f6, _0x5cd6e3) => {
      try {
        if (_0x1ea6c2) {
          console.log('' + JSON.stringify(_0x1ea6c2)), console.log('necklace_getTask API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x5cd6e3)) {
            _0x5cd6e3 = JSON.parse(_0x5cd6e3);

            if (_0x5cd6e3.rtn_code === 0) {
              _0x5cd6e3.data.biz_code === 0 && ($.taskItems = _0x5cd6e3.data.result && _0x5cd6e3.data.result.taskItems);
            } else {
              _0x5cd6e3.rtn_code === 403 || _0x5cd6e3.rtn_msg.indexOf('非法请求') > -1 ? (console.log('失败：' + _0x5cd6e3.rtn_msg + '\n'), errorMsgLllegal += 1, _0xaccb43()) : console.log('失败：' + JSON.stringify(_0x5cd6e3) + '\n');
            }
          }
        }
      } catch (_0x10620d) {
        $.logErr(_0x10620d, _0x4452f6);
      } finally {
        _0xdf01b9();
      }
    });
  });
}

function _0x473b81() {
  return $.taskConfigVos = [], $.bubbles = [], $.signInfo = {}, new Promise(_0x4f405 => {
    $.post(_0x1fecb2('necklace_homePage'), async (_0x14ab81, _0x49d8a2, _0x3b08f9) => {
      try {
        if (_0x14ab81) {
          console.log('' + JSON.stringify(_0x14ab81));
          console.log('necklace_homePage API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x3b08f9)) {
            _0x3b08f9 = JSON.parse(_0x3b08f9);

            if (_0x3b08f9.rtn_code === 0) {
              if (_0x3b08f9.data.biz_code === 0) {
                $.taskConfigVos = _0x3b08f9.data.result.taskConfigVos;
                $.exchangeGiftConfigs = _0x3b08f9.data.result.exchangeGiftConfigs;
                $.lastRequestTime = _0x3b08f9.data.result.lastRequestTime;
                $.bubbles = _0x3b08f9.data.result.bubbles;
                $.signInfo = _0x3b08f9.data.result.newSignInfo;
                $.totalScore = _0x3b08f9.data.result.totalScore;
              }
            }
          }
        }
      } catch (_0x287993) {
        $.logErr(_0x287993, _0x49d8a2);
      } finally {
        _0x4f405();
      }
    });
  });
}

async function _0x1208d2(_0x5361ed = '3', _0x34e2b9) {
  console.log(_0x34e2b9);
  let _0x2381f5 = 'getCcTaskList';
  let _0x1e2f8f = 'area=16_1315_3486_59648&body=%7B%22pageClickKey%22%3A%22CouponCenter%22%2C%22shshshfpb%22%3A%22dPH6zeJy%5C/HFogCIf0ZGFYqSDOShGwmpjVOPM%5C/ViCGC5fgBLL9JoI9mjgUt46vjSFeSkmU9DZLEjFaeFTWBj4Axg%3D%3D%22%2C%22eid%22%3A%22eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY%5C/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0%5C/dGmOJzfbLuyNo%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22lat%22%3A%2224.49441271645999%22%2C%22globalLat%22%3A%2224.49335%22%2C%22lng%22%3A%22118.1447713674174%22%2C%22globalLng%22%3A%22118.1423%22%7D&build=167707&client=apple&clientVersion=10.0.4&d_brand=apple&d_model=iPhone12%2C1&eid=eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0/dGmOJzfbLuyNo&isBackground=N&joycious=70&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=8a0d1837f803a12eb217fcf5e1f8769cbb3f898d&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=75afd018b5751e9ac4cba0b51b8adb3c&st=1624535152771&sv=101&uemps=0-0&uts=0f31TVRjBStsz%2BC9YKuTtbGZPv/xrvQQdSUKvavez1nEbzXO4dLo%2BXEvUHAXAd0VPmZqkUNAf2yO/fBM7ImhPYnyBrotzw06Kk7qP6mG42fhA1t5BkW3ZGLaQgPtiuosYOHPMyHpg%2BJ9ZQBP4g3zsSFq2DUWsTOZbb85I4ThMCgqvymyLl48ebUg7aQTle9CfTJVWu5gx0YZ/ScklgN9Pg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b';
  await _0x1c90b6(_0x2381f5, _0x1e2f8f, _0x5361ed);

  if (Number(_0x34e2b9) == 229) {
    _0x1e2f8f = 'area=16_1315_3486_59648&body=%7B%22shshshfpb%22%3A%22dPH6zeJy%5C/HFogCIf0ZGFYqSDOShGwmpjVOPM%5C/ViCGC5fgBLL9JoI9mjgUt46vjSFeSkmU9DZLEjFaeFTWBj4Axg%3D%3D%22%2C%22globalLng%22%3A%22118.1423%22%2C%22globalLat%22%3A%2224.49335%22%2C%22monitorSource%22%3A%22ccgroup_ios_index_task%22%2C%22monitorRefer%22%3A%22%22%2C%22taskType%22%3A%222%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22pageClickKey%22%3A%22CouponCenter%22%2C%22lat%22%3A%2224.49441271645999%22%2C%22taskId%22%3A%22necklace_229%22%2C%22lng%22%3A%22118.1447713674174%22%2C%22eid%22%3A%22eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY%5C/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0%5C/dGmOJzfbLuyNo%22%7D&build=167707&client=apple&clientVersion=10.0.4&d_brand=apple&d_model=iPhone12%2C1&eid=eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0/dGmOJzfbLuyNo&isBackground=N&joycious=70&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=8a0d1837f803a12eb217fcf5e1f8769cbb3f898d&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=57453a76ffe9440d7961b05405fb4f13&st=1624535165882&sv=110&uemps=0-0&uts=0f31TVRjBStsz%2BC9YKuTtbGZPv/xrvQQdSUKvavez1nEbzXO4dLo%2BXEvUHAXAd0VPmZqkUNAf2yO/fBM7ImhPYnyBrotzw06Kk7qP6mG42fhA1t5BkW3ZGLaQgPtiuosYOHPMyHpg%2BJ9ZQBP4g3zsSFq2DUWsTOZbb85I4ThMCgqvymyLl48ebUg7aQTle9CfTJVWu5gx0YZ/ScklgN9Pg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b';
  } else {
    if (Number(_0x34e2b9) == 260) {
      _0x1e2f8f = 'area=16_1315_3486_59648&body=%7B%22shshshfpb%22%3A%22hRRVbEkLST%2BoqUB6fhir%2BfMoJS814u0eqASGoy8xq0vV1m9X9zKoAVYtaZjcO4UsQaWNyUrMVkZK5HBZ5aJo5zQ%3D%3D%22%2C%22globalLng%22%3A%22118.1423%22%2C%22globalLat%22%3A%2224.49335%22%2C%22monitorSource%22%3A%22ccgroup_ios_index_task%22%2C%22monitorRefer%22%3A%22%22%2C%22taskType%22%3A%222%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22pageClickKey%22%3A%22CouponCenter%22%2C%22lat%22%3A%2224.49435886957707%22%2C%22taskId%22%3A%22necklace_260%22%2C%22lng%22%3A%22118.144791637343%22%2C%22eid%22%3A%22eidI0faa812328s1AvGqBpW%2BSouJeXiZIORi9gLxq36FvXhk6SQPmtUFPglIaTIxGXnVzVAwHm%5C/QEwj14SR2vxSgH5tw4rWGdLJtHzSh8bloRLoX8mFY%22%7D&build=167568&client=apple&clientVersion=9.4.2&d_brand=apple&d_model=iPhone12%2C1&eid=eidI0faa812328s1AvGqBpW%2BSouJeXiZIORi9gLxq36FvXhk6SQPmtUFPglIaTIxGXnVzVAwHm/QEwj14SR2vxSgH5tw4rWGdLJtHzSh8bloRLoX8mFY&isBackground=N&joycious=51&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=ebf4ce8ecbb641054b00c00483b1cee85660d196&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=93249982ced7ec850c69de8b3e859dab&st=1624610691429&sv=110&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJSTfJm3Nbyn7GqB7OtrJRuHoZMYV%2Bs0mkEZsSwjxzwlDPXLeepml5BnM5XPZQmPVomYBHlkSfLJWR5D1y0Ovgf60fpjMS2gXL5aLh50cNO3cmx2GvVTaTeYxvRUl%2BpaW7HXsuBhxJgA6pUzd01tBX9yiFih8xvToesg91Nl8KcWGYzXJ2/hWKXg%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b';
    } else {
      if (Number(_0x34e2b9) == 267) {
        _0x1e2f8f = 'area=16_1315_3486_59648&body=%7B%22shshshfpb%22%3A%22dPH6zeJy%5C/HFogCIf0ZGFYqSDOShGwmpjVOPM%5C/ViCGC5fgBLL9JoI9mjgUt46vjSFeSkmU9DZLEjFaeFTWBj4Axg%3D%3D%22%2C%22globalLng%22%3A%22118.1423%22%2C%22globalLat%22%3A%2224.49335%22%2C%22monitorSource%22%3A%22ccgroup_ios_index_task%22%2C%22monitorRefer%22%3A%22%22%2C%22taskType%22%3A%222%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22pageClickKey%22%3A%22CouponCenter%22%2C%22lat%22%3A%2224.49437467152672%22%2C%22taskId%22%3A%22necklace_267%22%2C%22lng%22%3A%22118.1447981202065%22%2C%22eid%22%3A%22eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY%5C/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0%5C/dGmOJzfbLuyNo%22%7D&build=167707&client=apple&clientVersion=10.0.4&d_brand=apple&d_model=iPhone12%2C1&eid=eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0/dGmOJzfbLuyNo&isBackground=N&joycious=70&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=8a0d1837f803a12eb217fcf5e1f8769cbb3f898d&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=64e2361aa2a81068930c0c3325fd45ef&st=1624950832218&sv=111&uemps=0-0&uts=0f31TVRjBSsMGLCxYS3UIqlZl8dbXmnuZ4ayfhN43Ot1QaV41onc66czNm7agt5ZxuI/ZiEjTyLMd9C68bu6j250BhqFBz9aHYMZHRsZRt99av4Tsia77GOWxlDaSYf5ixm0pZhBRR4OQ%2BUBD6%2BPW4wCMOS5CO3/VI2cFHPfi%2BdGNinbfncIha86vGUGuGKiHSAf4rUFY4wrafX6Rksw7g%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b';
      } else {
        if (Number(_0x34e2b9) == 273) {
          _0x1e2f8f = 'area=16_1315_3486_59648&body=%7B%22shshshfpb%22%3A%22dPH6zeJy%5C/HFogCIf0ZGFYqSDOShGwmpjVOPM%5C/ViCGC5fgBLL9JoI9mjgUt46vjSFeSkmU9DZLEjFaeFTWBj4Axg%3D%3D%22%2C%22globalLng%22%3A%22118.1423%22%2C%22globalLat%22%3A%2224.49335%22%2C%22monitorSource%22%3A%22ccgroup_ios_index_task%22%2C%22monitorRefer%22%3A%22%22%2C%22taskType%22%3A%222%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22pageClickKey%22%3A%22CouponCenter%22%2C%22lat%22%3A%2224.494383110087%22%2C%22taskId%22%3A%22necklace_273%22%2C%22lng%22%3A%22118.1447767134287%22%2C%22eid%22%3A%22eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY%5C/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0%5C/dGmOJzfbLuyNo%22%7D&build=167741&client=apple&clientVersion=10.0.8&d_brand=apple&d_model=iPhone12%2C1&eid=eidIeb54812323sf%2BAJEbj5LR0Kf6GUzM9DKXvgCReTpKTRyRwiuxY/uvRHBqebAAKCAXkJFzhWtPj5uoHxNeK3DjTumb%2BrfXOt1w0/dGmOJzfbLuyNo&isBackground=N&joycious=71&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=8a0d1837f803a12eb217fcf5e1f8769cbb3f898d&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=c5f1773c699259a32596629ff17c77af&st=1627034890276&sv=101&uemps=0-0&uts=0f31TVRjBSuc9dw/M%2Bj%2BYjMPuoLDUbUPjPag%2BZ5OSbdXPyIGbVBxfPOWG8Z24KZdpryfyfoAUE5oYfYi1SuqGZ5atF1ARqzdFrPeo%2BZQVMmuwn/nYDGsLdj0Q9HcidhJXAaY1ti0j023Mv4f/ls51fJl5ypecBgw2sWtd8KiGQncYOe9GxCz6tlkHuSHDk3zN6hF%2BN0deRJOqJP8OOrJog%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b';
        } else {
          Number(_0x34e2b9) == 281 && (_0x1e2f8f = 'area=16_1332_42932_43102&body=%7B%22shshshfpb%22%3A%22hRRVbEkLST%2BoqUB6fhir%2BfMoJS814u0eqASGoy8xq0vV1m9X9zKoAVYtaZjcO4UsQaWNyUrMVkZK5HBZ5aJo5zQ%3D%3D%22%2C%22globalLng%22%3A%22118.541458%22%2C%22globalLat%22%3A%2224.609455%22%2C%22monitorSource%22%3A%22ccgroup_ios_index_task%22%2C%22monitorRefer%22%3A%22%22%2C%22taskType%22%3A%222%22%2C%22childActivityUrl%22%3A%22openapp.jdmobile%253a%252f%252fvirtual%253fparams%253d%257b%255c%2522category%255c%2522%253a%255c%2522jump%255c%2522%252c%255c%2522des%255c%2522%253a%255c%2522couponCenter%255c%2522%257d%22%2C%22pageClickKey%22%3A%22CouponCenter%22%2C%22lat%22%3A%2224.49440185204448%22%2C%22taskId%22%3A%22necklace_281%22%2C%22lng%22%3A%22118.1448096802756%22%2C%22eid%22%3A%22eidI0faa812328s1AvGqBpW%2BSouJeXiZIORi9gLxq36FvXhk6SQPmtUFPglIaTIxGXnVzVAwHm%5C/QEwj14SR2vxSgH5tw4rWGdLJtHzSh8bloRLoX8mFY%22%7D&build=167741&client=apple&clientVersion=10.0.8&d_brand=apple&d_model=iPhone12%2C1&eid=eidI0faa812328s1AvGqBpW%2BSouJeXiZIORi9gLxq36FvXhk6SQPmtUFPglIaTIxGXnVzVAwHm/QEwj14SR2vxSgH5tw4rWGdLJtHzSh8bloRLoX8mFY&isBackground=N&joycious=51&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=ebf4ce8ecbb641054b00c00483b1cee85660d196&osVersion=14.3&partner=apple&rfs=0000&scope=11&screen=828%2A1792&sign=6bf1da7e3c218998ae5bd34a5b9b0d5c&st=1627088377408&sv=122&uemps=0-1&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJPuQXd3Iw2YAKsnsGHXGtpI6DTtbcnaz7p7QeCmsoL2Cl/BMWopi0bEL/HBdhfK3iH/oMP6POfCzGYqGUp9HjUx/7lG%2BGpzuUJ%2B7ZrAQF4UMuG2/9epLOLCkpw4w6EgF4FqamAtXxTBCJZ82M%2Bkm26wJx996BKm7JCzdQfT6pJ0aFbovPOlp71A%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=796606e8e181aa5865ec20728a27238b');
        }
      }
    }
  }

  if (_0x5361ed === '4') {
    console.log('需等待30秒');
    _0x2381f5 = 'reportSinkTask';
    _0x1e2f8f = '&appid=XPMSGC2019&monitorSource=&uuid=16245525345801334814959&body=%7B%22platformType%22%3A%221%22%2C%22taskId%22%3A%22necklace_' + _0x34e2b9 + '%22%7D&client=m&clientVersion=4.6.0&area=16_1315_1316_59175&geo=%5Bobject%20Object%5D';
    await $.wait(15000);
  } else {
    console.log('需等待15秒');
    _0x2381f5 = 'reportCcTask';
  }

  await $.wait(1600);
  await _0x1c90b6(_0x2381f5, _0x1e2f8f, _0x5361ed);
}

function _0x1c90b6(_0x317b00, _0x11d116, _0x4ee56a = '3') {
  let _0x859d76 = 'https://api.m.jd.com/client.action?functionId=' + _0x317b00;

  return new Promise(_0x3346b1 => {
    if (_0x317b00 === 'getCcTaskList') {}

    if (_0x317b00 === 'reportCcTask') {}

    _0x317b00 === 'reportSinkTask' && (_0x859d76 += _0x11d116, _0x11d116 = '');
    const _0x1cde05 = {
      url: _0x859d76,
      body: _0x11d116,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        Connection: 'keep-alive',
        'Content-Length': '63',
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'api.m.jd.com',
        Origin: 'https://h5.m.jd.com',
        Cookie: _0x2402aa + ('joyytoken=' + ('50082' + $.joyytoken) + ';'),
        Referer: 'https://h5.m.jd.com/babelDiy/Zeus/4ZK4ZpvoSreRB92RRo8bpJAQNoTq/index.html',
        'User-Agent': $.UA
      }
    };
    $.post(_0x1cde05, async (_0x390015, _0x36069a, _0x1bbf02) => {
      try {
        if (_0x390015) {
          console.log('' + JSON.stringify(_0x390015));
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x19198e(_0x1bbf02)) {
            if (_0x4ee56a === '3' && _0x317b00 === 'reportCcTask') {
              console.log('点击首页领券图标(进入领券中心浏览15s)任务:' + _0x1bbf02);
            }

            if (_0x4ee56a === '4' && _0x317b00 === 'reportSinkTask') {
              console.log('点击“券后9.9”任务:' + _0x1bbf02);
            }
          }
        }
      } catch (_0x2597ba) {
        $.logErr(_0x2597ba, _0x36069a);
      } finally {
        _0x3346b1();
      }
    });
  });
}

function _0x1fecb2(_0xe00e36, _0x21bcb9 = {}) {
  const _0x122363 = new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 28800000;

  let _0x171b22 = _0x2402aa.match(/pt_key=([^; ]+)(?=;?)/)[1];

  return {
    url: _0x1630d0 + '?functionId=' + _0xe00e36 + '&appid=coupon-necklace&loginType=2&t=' + Date.now(),
    body: 'body=' + encodeURIComponent(JSON.stringify(_0x21bcb9)),
    headers: {
      Host: 'api.m.jd.com',
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/x-www-form-urlencoded',
      Origin: 'https://h5.m.jd.com',
      'User-Agent': $.UA,
      Referer: 'https://h5.m.jd.com/',
      Cookie: 'pt_key=app_open' + _0x171b22 + ';' + _0x2402aa + ('joyytoken=' + ('50082' + $.joyytoken) + ';')
    }
  };
}

function _0x4d5b59() {
  const _0x5c520c = {
    url: 'https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy',
    timeout: 30000
  };
  let _0x5c0878 = _0x5c520c;
  return new Promise(_0x1235a1 => {
    $.get(_0x5c0878, async (_0x5e034f, _0x33d2b7, _0x3c7584) => {
      try {
        if (_0x5e034f) {
          console.log('\n服务连接失败，终止执行！');
          process.exit(111);
        } else {
          _0x3c7584 && (_0x3c7584 = JSON.parse(_0x3c7584), _0x3c7584.code === 200 ? ($.suc = 'no', $.ver = _0x3c7584.version) : (console.log('\n' + _0x3c7584.msg), process.exit(111)));
        }
      } catch (_0x466172) {
        $.logErr(_0x466172, _0x33d2b7);
      } finally {
        _0x1235a1(_0x3c7584);
      }
    });
  });
}

function _0x19198e(_0x33e265) {
  try {
    if (typeof JSON.parse(_0x33e265) == 'object') {
      return true;
    }
  } catch (_0x1bc805) {
    return console.log(_0x1bc805), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x1f1cab(_0x48aa70) {
  const _0x43f4e2 = function () {
    let _0x471f79 = true;
    return function (_0x474e73, _0x4d8eef) {
      const _0x314728 = _0x471f79 ? function () {
        if (_0x4d8eef) {
          const _0x12a384 = _0x4d8eef.apply(_0x474e73, arguments);

          return _0x4d8eef = null, _0x12a384;
        }
      } : function () {};

      return _0x471f79 = false, _0x314728;
    };
  }(),
        _0xfece2a = _0x43f4e2(this, function () {
    return _0xfece2a.toString().search('(((.+)+)+)+$').toString().constructor(_0xfece2a).search('(((.+)+)+)+$');
  });

  _0xfece2a();

  if (typeof _0x48aa70 == 'string') {
    try {
      return JSON.parse(_0x48aa70);
    } catch (_0x458102) {
      return console.log(_0x458102), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

function _0xaccb43() {
  let _0x13234a = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
      _0x189f0c = ['9', '10', '11', '12'];
  let _0x15e7ec = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
      _0x37408f = ['98413', '98416', '98415', '98417', '98450'];
  $.dv = _0x13234a[Math.floor(Math.random() * _0x13234a.length)];
  $.iv = _0x189f0c[Math.floor(Math.random() * _0x189f0c.length)];
  $.av = _0x15e7ec[Math.floor(Math.random() * _0x15e7ec.length)];
  $.bv = _0x37408f[Math.floor(Math.random() * _0x37408f.length)];

  getstr = function (_0x11e3da) {
    let _0x4ef053 = '',
        _0x14cac1 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let _0x18c6d9 = 0; _0x18c6d9 < _0x11e3da; _0x18c6d9++) {
      let _0x68ab82 = Math.round(Math.random() * (_0x14cac1.length - 1));

      _0x4ef053 += _0x14cac1.substring(_0x68ab82, _0x68ab82 + 1);
    }

    return _0x4ef053;
  };

  let _0x1b4b61 = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x31cf6c = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x4a5733 = encodeURIComponent(JSON.stringify({
    hdid: 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    ts: Date.now(),
    ridx: -1,
    cipher: {
      sv: 'CJS=',
      ad: _0x1b4b61,
      od: _0x31cf6c,
      ov: 'CzO=',
      ud: _0x1b4b61
    },
    ciphertype: 5,
    version: '1.2.0',
    appname: 'com.jingdong.app.mall'
  }));

  $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';ef/1;ep/' + _0x4a5733 + ';jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046141 Mobile Safari/537.36';
}

function _0xc664af(_0x5499c6 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x319231 = 0) {
  return _0x5499c6.replace(/[xy]/g, function (_0x267b8e) {
    var _0x46bbd6 = 16 * Math.random() | 0,
        _0x2d5e79 = 'x' == _0x267b8e ? _0x46bbd6 : 3 & _0x46bbd6 | 8;

    return uuid = _0x319231 ? _0x2d5e79.toString(36).toUpperCase() : _0x2d5e79.toString(36), uuid;
  });
}

function _0x29230a(_0x4afbd6) {
  _0x4afbd6 = _0x4afbd6 || 32;
  let _0x2fbb4b = 'abcdef0123456789',
      _0x3efb58 = _0x2fbb4b.length,
      _0x53413b = '';

  for (i = 0; i < _0x4afbd6; i++) {
    _0x53413b += _0x2fbb4b.charAt(Math.floor(Math.random() * _0x3efb58));
  }

  return _0x53413b;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}