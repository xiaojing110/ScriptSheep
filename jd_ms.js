/*
秒秒币
入口：京东APP 首页秒杀
只能使用appck运行，签到+任务
38 9 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_ms.js
updatetime: 2022-11-24 支持mck
 */
const $ = new Env('秒秒币-加密');
const _0x4166e2 = $.isNode() ? require('./sendNotify') : '',
      _0x28d40b = require('./function/dylant.js'),
      _0x5b8a46 = $.isNode() ? require('./jdCookie.js') : '';

var _0x3acc33 = Math.round(new Date().getTime()).toString();

let _0xdb1ca = [],
    _0x568eba = '',
    _0x263c21;

if ($.isNode()) {
  Object.keys(_0x5b8a46).forEach(_0x28e517 => {
    _0xdb1ca.push(_0x5b8a46[_0x28e517]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {};
  }

  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) {
    process.exit(0);
  }
} else {
  _0xdb1ca = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x4e997e($.getdata('CookiesJD') || '[]').map(_0x25f64f => _0x25f64f.cookie)].filter(_0x44d881 => !!_0x44d881);
}

const _0x49efcd = 'https://api.m.jd.com/client.action';
$.appid = '50086';
$.scid = 'MShPageh5';
$.suc = 'yes';
!(async () => {
  if (!_0xdb1ca[0]) {
    const _0x531ee0 = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x531ee0);
    return;
  }

  console.log('\n只跑前6个CK，问题建议：https://t.me/dylan_jdpro');
  await _0x5c6144();

  for (let _0x557bca = 0; _0x557bca < 6; _0x557bca++) {
    if (_0xdb1ca[_0x557bca]) {
      _0x568eba = _0xdb1ca[_0x557bca];
      $.UserName = decodeURIComponent(_0x568eba.match(/pt_pin=([^; ]+)(?=;?)/) && _0x568eba.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x557bca + 1;
      $.isLogin = true;
      $.nickName = '';
      _0x263c21 = '';
      $.jdk = _0x580278('--xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

      _0x52af04();

      $.joytoken = '';
      await _0x385992();
      console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x4fe0eb = {
          'open-url': 'https://bean.m.jd.com/'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/', _0x4fe0eb);
        $.isNode() && (await _0x4166e2.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await _0x2b8641();
      await $.wait(2000);
    }
  }
})().catch(_0x3251b9 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x3251b9 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x2b8641() {
  $.score = 0;
  await _0x39d963();
  await $.wait(500);
  await _0xa09460();
  await $.wait(500);
  $.cur = $.score;

  if ($.encryptProjectId) {
    console.log('领红包签到');
    await _0x546734();
    await $.wait(500);
    await _0x278d1b();
    await $.wait(500);
  }

  await _0xa09460(false);
  await _0x84dee4();
}

function _0x39d963() {
  return new Promise(_0x1e29de => {
    $.post(_0x52a794('assignmentList', {}, 'appid=jwsp'), (_0xcf2fa2, _0xb2a46, _0x2b1dcb) => {
      try {
        if (_0xcf2fa2) {
          console.log(_0xcf2fa2 + ',' + _0x4e997e(_0xb2a46.body).message), console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          _0x5b0841(_0x2b1dcb) && (_0x2b1dcb = JSON.parse(_0x2b1dcb), _0x2b1dcb.code === 200 && ($.encryptProjectId = _0x2b1dcb.result.assignmentResult.encryptProjectId, console.log('活动名称：' + _0x2b1dcb.result.assignmentResult.projectName), sourceCode = _0x2b1dcb.result.sourceCode));
        }
      } catch (_0x18fe44) {
        $.logErr(_0x18fe44, _0xb2a46);
      } finally {
        _0x1e29de(_0x2b1dcb);
      }
    });
  });
}

function _0xa09460(_0x59fc26 = true) {
  return new Promise(_0x3644e1 => {
    $.post(_0x52a794('homePageV2', {}, 'appid=SecKill2020'), (_0x137ba6, _0x29cd4b, _0x3ee3dc) => {
      try {
        if (_0x137ba6) {
          console.log(_0x137ba6 + ',' + _0x4e997e(_0x29cd4b.body).message);
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5b0841(_0x3ee3dc)) {
            _0x3ee3dc = JSON.parse(_0x3ee3dc);
            $.score = _0x3ee3dc.result.assignment.assignmentPoints || 0;

            if (_0x59fc26) {
              console.log('当前秒秒币' + $.score);
            }
          }
        }
      } catch (_0x43a576) {
        $.logErr(_0x43a576, _0x29cd4b);
      } finally {
        _0x3644e1(_0x3ee3dc);
      }
    });
  });
}

function _0x278d1b() {
  const _0x7037a1 = {
    encryptProjectId: $.encryptProjectId,
    sourceCode: 'wh5'
  };
  let _0x207b52 = _0x7037a1;
  return new Promise(_0x360e92 => {
    $.post(_0x52a794('queryInteractiveInfo', _0x207b52), async (_0x5ee567, _0x4d4304, _0x479718) => {
      try {
        if (_0x5ee567) {
          console.log(_0x5ee567 + ',' + _0x4e997e(_0x4d4304.body).message);
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5b0841(_0x479718)) {
            _0x479718 = JSON.parse(_0x479718);
            $.risk = false;

            if (_0x479718.code === '0') {
              for (let _0x4cfc50 of _0x479718.assignmentList) {
                if ($.risk) {
                  break;
                }

                if (_0x4cfc50.assignmentName.indexOf('科技导流2') > -1) {
                  continue;
                }

                if (_0x4cfc50.completionCnt < _0x4cfc50.assignmentTimesLimit) {
                  if (_0x4cfc50.assignmentType === 1) {
                    if (_0x4cfc50.ext[_0x4cfc50.ext.extraType].length === 0) {
                      continue;
                    }

                    for (let _0x5e295c = _0x4cfc50.completionCnt; _0x5e295c < _0x4cfc50.assignmentTimesLimit; ++_0x5e295c) {
                      console.log('去做' + _0x4cfc50.assignmentName + '任务：' + (_0x5e295c + 1) + '/' + _0x4cfc50.assignmentTimesLimit);
                      const _0x38f415 = {
                        encryptAssignmentId: _0x4cfc50.encryptAssignmentId,
                        itemId: _0x4cfc50.ext[_0x4cfc50.ext.extraType][_0x5e295c].itemId,
                        actionType: 1,
                        completionFlag: ''
                      };
                      let _0xcdc589 = _0x38f415;
                      await _0x102007(_0xcdc589);
                      await $.wait(_0x4cfc50.ext.waitDuration * 1000 + 500);
                      _0xcdc589.actionType = 0;
                      await _0x102007(_0xcdc589);
                    }
                  } else {
                    if (_0x4cfc50.assignmentType === 0) {
                      for (let _0x2f016c = _0x4cfc50.completionCnt; _0x2f016c < _0x4cfc50.assignmentTimesLimit; ++_0x2f016c) {
                        console.log('去做' + _0x4cfc50.assignmentName + '任务：' + (_0x2f016c + 1) + '/' + _0x4cfc50.assignmentTimesLimit);
                        const _0x3ab05f = {
                          encryptAssignmentId: _0x4cfc50.encryptAssignmentId,
                          itemId: '',
                          actionType: '0',
                          completionFlag: true
                        };
                        let _0x308c21 = _0x3ab05f;
                        await _0x102007(_0x308c21);
                        await $.wait(1000);
                      }
                    } else {
                      if (_0x4cfc50.assignmentType === 3) {
                        for (let _0x21fe58 = _0x4cfc50.completionCnt; _0x21fe58 < _0x4cfc50.assignmentTimesLimit; ++_0x21fe58) {
                          console.log('去做' + _0x4cfc50.assignmentName + '任务：' + (_0x21fe58 + 1) + '/' + _0x4cfc50.assignmentTimesLimit);
                          const _0x59f228 = {
                            encryptAssignmentId: _0x4cfc50.encryptAssignmentId,
                            itemId: _0x4cfc50.ext[_0x4cfc50.ext.extraType][_0x21fe58].itemId,
                            actionType: 0,
                            completionFlag: ''
                          };
                          let _0x46e9c7 = _0x59f228;
                          await _0x102007(_0x46e9c7);
                          await $.wait(1000);
                        }
                      }
                    }
                  }
                }
              }
            } else {
              console.log(_0x479718);
            }
          }
        }
      } catch (_0x56deed) {
        $.logErr(_0x56deed, _0x4d4304);
      } finally {
        _0x360e92(_0x479718);
      }
    });
  });
}

async function _0x102007(_0x131b66) {
  let _0x2891f7 = await _0x28d40b.geturl($);

  return _0x131b66 = {
    extParam: _0x2891f7,
    ..._0x131b66,
    encryptProjectId: $.encryptProjectId,
    sourceCode: sourceCode,
    ext: {}
  }, new Promise(_0x4fa50e => {
    $.post(_0x52a794('doInteractiveAssignment', _0x131b66), (_0x277331, _0x2b3101, _0x2a010d) => {
      try {
        if (_0x277331) {
          console.log(_0x277331 + ',' + _0x4e997e(_0x2b3101.body).message), console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5b0841(_0x2a010d)) {
            _0x2a010d = JSON.parse(_0x2a010d);
            console.log(_0x2a010d.msg);

            if (_0x2a010d.msg === '风险等级未通过') {
              $.risk = 1;
            }
          }
        }
      } catch (_0x242a86) {
        $.logErr(_0x242a86, _0x2b3101);
      } finally {
        _0x4fa50e(_0x2a010d);
      }
    });
  });
}

function _0x6f91aa() {
  return new Promise(_0x1a1d0c => {
    body = 'appid=babelh5&body=%7B%22encryptProjectId%22%3A%224NzhoLbAJtBXbyRj5zGwprtf6GDv%22%2C%22encryptAssignmentId%22%3A%223yRMFkp3SN8nXpX49xAdCWsdy5XP%22%2C%22completionFlag%22%3Atrue%2C%22itemId%22%3A%221%22%2C%22sourceCode%22%3A%22aceaceqingzhan%22%7D&sign=11&t=1642929553660';
    $.post(_0x3bf51b(body), (_0x2e9eab, _0x1a23bd, _0x28121e) => {
      try {
        if (_0x2e9eab) {
          console.log(_0x2e9eab + ',' + _0x4e997e(_0x1a23bd.body).message), console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5b0841(_0x28121e)) {
            _0x28121e = JSON.parse(_0x28121e);

            if (_0x28121e.code === 0) {
              rewardsInfo = _0x28121e.rewardsInfo.failRewards[0].msg;
              console.log('' + rewardsInfo);
            } else {
              console.log(_0x28121e.msg);
            }
          }
        }
      } catch (_0xf0dde7) {
        $.logErr(_0xf0dde7, _0x1a23bd);
      } finally {
        _0x1a1d0c(_0x28121e);
      }
    });
  });
}

async function _0x546734() {
  let _0x37f559 = await _0x28d40b.geturl($);

  let _0x13fd96 = 'uuid=88888888&clientVersion=11.2.2&client=wh5&osVersion=&networkType=unknown&functionId=signRedPackage&body={"random":"' + _0x37f559.businessData.random + '","log":"' + _0x37f559.signStr + '","sceneid":"MShPageh5","ext":{"platform":"1","eid":"","referUrl":-1,"userAgent":-1}}&appid=SecKill2020';

  return new Promise(_0xfe440b => {
    $.post(_0x40428(_0x13fd96), (_0xda176f, _0x155e78, _0x23f9a3) => {
      try {
        if (_0xda176f) {
          console.log(_0xda176f + ',' + _0x4e997e(_0x155e78.body).message);
          console.log($.name + ' API请求失败，请检查网路重试');
        } else {
          if (_0x5b0841(_0x23f9a3)) {
            _0x23f9a3 = JSON.parse(_0x23f9a3);

            if (_0x23f9a3.code === 200) {
              rewardsInfo = _0x23f9a3.result.assignmentResult.msg;
              console.log('' + rewardsInfo);
            } else {
              console.log('今日签到红包已领');
            }
          }
        }
      } catch (_0x44fc5a) {
        $.logErr(_0x44fc5a, _0x155e78);
      } finally {
        _0xfe440b(_0x23f9a3);
      }
    });
  });
}

function _0x84dee4() {
  return new Promise(_0x45389a => {
    _0x263c21 += '本次运行获得秒秒币' + ($.score - $.cur) + '枚，共' + $.score + '枚';
    $.msg($.name, '', '京东账号' + $.index + $.nickName + '\n' + _0x263c21);

    _0x45389a();
  });
}

function _0x52a794(_0x3a2432, _0x4e09ea = {}, _0x2851ad = '', _0x3969d0) {
  let _0x2ff00d = '' + _0x49efcd;

  _0x3969d0 && (_0x2ff00d += '?functionId=' + _0x3969d0);
  _0x4e09ea = 'functionId=' + _0x3a2432 + '&body=' + JSON.stringify(_0x4e09ea) + '&client=wh5&clientVersion=1.0.0';
  _0x2851ad && (_0x4e09ea = 'functionId=' + _0x3a2432 + '&body=' + encodeURIComponent(JSON.stringify(_0x4e09ea)) + '&client=wh5&clientVersion=1.0.0&' + _0x2851ad);

  let _0x4ae2ae = _0x568eba.match(/pt_key=([^; ]+)(?=;?)/)[1];

  return {
    url: _0x2ff00d,
    body: _0x4e09ea,
    headers: {
      Cookie: 'pt_key=app_open' + _0x4ae2ae + ';' + _0x568eba + ('joyytoken=' + ('50082' + $.joyytoken) + ';'),
      Origin: 'https://seckill-bonus-pro.pf.jd.com',
      Referer: 'https://seckill-bonus-pro.pf.jd.com/',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': $.UA
    }
  };
}

function _0x5c6144() {
  const _0x111ae4 = {
    url: 'https://verify-dy-server-hqbjkuhrsu.cn-hangzhou.fcapp.run/dy',
    timeout: 30000
  };
  let _0x54226b = _0x111ae4;
  return new Promise(_0x5a3b01 => {
    $.get(_0x54226b, async (_0xa97f23, _0x21b495, _0x53a902) => {
      try {
        _0xa97f23 ? (console.log('\n服务连接失败，终止执行！'), process.exit(111)) : _0x53a902 && (_0x53a902 = JSON.parse(_0x53a902), _0x53a902.code === 200 ? ($.suc = 'no', $.ver = _0x53a902.version) : (console.log('\n' + _0x53a902.msg), process.exit(111)));
      } catch (_0x146e67) {
        $.logErr(_0x146e67, _0x21b495);
      } finally {
        _0x5a3b01(_0x53a902);
      }
    });
  });
}

function _0x385992() {
  return new Promise(_0x2568ab => {
    const _0x391eaf = {
      Cookie: _0x568eba,
      referer: 'https://h5.m.jd.com/'
    };
    _0x391eaf['User-Agent'] = $.UA;
    const _0x2f4423 = {
      url: 'https://plogin.m.jd.com/cgi-bin/ml/islogin',
      headers: _0x391eaf,
      timeout: 10000
    };
    const _0x454e5c = _0x2f4423;
    $.get(_0x454e5c, (_0x5c46aa, _0x5483, _0x5f0ab7) => {
      try {
        if (_0x5f0ab7) {
          _0x5f0ab7 = JSON.parse(_0x5f0ab7);

          if (_0x5f0ab7.islogin === '1') {} else {
            _0x5f0ab7.islogin === '0' && ($.isLogin = false);
          }
        }
      } catch (_0x3ab836) {
        console.log(_0x3ab836);
      } finally {
        _0x2568ab();
      }
    });
  });
}

function _0x5b0841(_0x2a9c3f) {
  try {
    if (typeof JSON.parse(_0x2a9c3f) == 'object') {
      return true;
    }
  } catch (_0x4a9166) {
    return console.log(_0x4a9166), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function _0x4e997e(_0x16fc2e) {
  const _0xd3c01b = function () {
    let _0x3b24e1 = true;
    return function (_0x575297, _0x46bc03) {
      const _0x285885 = _0x3b24e1 ? function () {
        if (_0x46bc03) {
          const _0x53f6c4 = _0x46bc03.apply(_0x575297, arguments);

          return _0x46bc03 = null, _0x53f6c4;
        }
      } : function () {};

      return _0x3b24e1 = false, _0x285885;
    };
  }(),
        _0x2daa90 = _0xd3c01b(this, function () {
    return _0x2daa90.toString().search('(((.+)+)+)+$').toString().constructor(_0x2daa90).search('(((.+)+)+)+$');
  });

  _0x2daa90();

  if (typeof _0x16fc2e == 'string') {
    try {
      return JSON.parse(_0x16fc2e);
    } catch (_0x4a4da2) {
      return console.log(_0x4a4da2), $.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie'), [];
    }
  }
}

function _0x52af04() {
  let _0x1a5b7e = ['MI9 Build/QKQ1.190825.002', 'MI8 Build/OPM1.171019.026', 'HLK-AL00 Build/HONORHLK-AL00', 'SM-G9750 Build/QP1A.190711.020', 'LIO-AL00 Build/HUAWEILIO-AL00', 'ELE-AL00 Build/HUAWEIELE-AL00', 'ANE-AL00 Build/HUAWEIANE-AL00', '22021211RC Build/SKQ1.211006.001'],
      _0x2f315d = ['9', '10', '11', '12'],
      _0x3dea84 = ['11.2.8', '11.2.6', '11.2.5', '11.2.4', '11.2.3', '11.1.4', '11.1.3', '11.1.0', '11.3.0'],
      _0x5eab48 = ['98413', '98416', '98415', '98417', '98450'];
  $.dv = _0x1a5b7e[Math.floor(Math.random() * _0x1a5b7e.length)];
  $.iv = _0x2f315d[Math.floor(Math.random() * _0x2f315d.length)];
  $.av = _0x3dea84[Math.floor(Math.random() * _0x3dea84.length)];
  $.bv = _0x5eab48[Math.floor(Math.random() * _0x5eab48.length)];

  getstr = function (_0x3adffe) {
    let _0x9a72f0 = '',
        _0x1a56ed = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let _0x4b7a17 = 0; _0x4b7a17 < _0x3adffe; _0x4b7a17++) {
      let _0x4c7c23 = Math.round(Math.random() * (_0x1a56ed.length - 1));

      _0x9a72f0 += _0x1a56ed.substring(_0x4c7c23, _0x4c7c23 + 1);
    }

    return _0x9a72f0;
  };

  let _0x103e6a = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x3f88b5 = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x514ac7 = encodeURIComponent(JSON.stringify({
    hdid: 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    ts: Date.now(),
    ridx: -1,
    cipher: {
      sv: 'CJS=',
      ad: _0x103e6a,
      od: _0x3f88b5,
      ov: 'CzO=',
      ud: _0x103e6a
    },
    ciphertype: 5,
    version: '1.2.0',
    appname: 'com.jingdong.app.mall'
  }));

  $.UA = 'jdapp;android;' + $.av + ';;;appBuild/' + $.bv + ';Mozilla/5.0 (Linux; Android ' + $.iv + '; ' + $.dv + '; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/76.0.3809.89 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36';
}

function _0x580278(_0xbc13a7 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', _0x390d22 = 0) {
  return _0xbc13a7.replace(/[xy]/g, function (_0x262068) {
    var _0x321af9 = 10 * Math.random() | 0,
        _0x1fd085 = 'x' == _0x262068 ? _0x321af9 : 3 & _0x321af9 | 8;

    return uuid = _0x390d22 ? _0x1fd085.toString(36).toUpperCase() : _0x1fd085.toString(36), uuid;
  });
}

function _0x3bf51b(_0xb79d2f) {
  let _0x744550 = _0x49efcd + 'client.action?functionId=doInteractiveAssignment';

  return {
    url: _0x744550,
    body: _0xb79d2f,
    headers: {
      Cookie: _0x568eba,
      origin: 'https://prodev.m.jd.com',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
    }
  };
}

function _0x40428(_0x1dae62) {
  let _0x3614c0 = _0x49efcd + 'client.action',
      _0x2943be = _0x568eba.match(/pt_key=([^; ]+)(?=;?)/)[1];

  const _0xce0cac = {
    Cookie: _0x568eba,
    Origin: 'https://seckill-bonus-pro.pf.jd.com',
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  _0xce0cac['User-Agent'] = $.UA;
  const _0x485b87 = {};
  return _0x485b87.url = _0x3614c0, _0x485b87.body = _0x1dae62, _0x485b87.headers = _0xce0cac, _0x485b87;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}