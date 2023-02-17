/*
星系牧场
活动入口：QQ星儿童牛奶京东自营旗舰店->品牌会员->星系牧场
快捷入口：10:/！Z09vG2bHdD！【最新版】ㅠD○σδng星系牧场养牛牛，可获得DHA专属奶！
号1默认作者助力,后续 2给1 3给2 接龙,助力需要新用户，已助力过的不能在助力
#伊利星系牧场
1 12 1 12 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_qqxing.js
*/

const $ = new Env('伊利星系牧场');
const _0x495312 = $.isNode() ? require('./jdCookie.js') : '';

const _0x478335 = $.isNode() ? require('./sendNotify') : '',
      _0x49fc78 = require('./function/dylanx.js');

let _0x286e11 = [],
    _0x75f0e5 = '';
let Exchange = true;
function _0x10fc48(_0x55423a, _0x34c3c9) {
  try {
    return _0x55423a();
  } catch (_0x3d78f6) {
    return undefined;
  }
}

if ($.isNode()) {
  Object.keys(_0x495312).forEach(_0x5f543a => {
    _0x286e11.push(_0x495312[_0x5f543a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x286e11 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x1a8ad3($.getdata('CookiesJD') || '[]').map(_0x3732e6 => _0x3732e6.cookie)].filter(_0x377955 => !!_0x377955);

console.log('\n活动快捷入口：10:/！Z09vG2bHdD！【最新版】ㅠD○σδng星系牧场养牛牛，可获得DHA专属奶！'), !(async () => {
  if (!_0x286e11[0]) {
    $.msg($.name, '【提示】请先获取cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
      'open-url': 'https://bean.m.jd.com/'
    });
    return;
  }

  let _0x5627ff = [''];
  $.shareUuid = _0x5627ff[Math.floor(Math.random() * _0x5627ff.length)];

  for (let _0x1d4a9c = 0; _0x1d4a9c < 10; _0x1d4a9c++) {
    _0x75f0e5 = _0x286e11[_0x1d4a9c];

    if (_0x75f0e5) {
      $.UserName = decodeURIComponent(_0x75f0e5.match(/pt_pin=([^; ]+)(?=;?)/) && _0x75f0e5.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x1d4a9c + 1, $.cando = true, $.cow = '', $.openCard = true, $.isLogin = true, $.needhelp = true, $.foodNum = 0, $.nickName = '', $.drawresult = '', $.exchange = 0, console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x596a0e = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x596a0e);
        $.isNode() && (await _0x478335.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await _0x5892a3(), await _0x24829e(), await _0x49ffcf(), await _0x1ab088(), await _0x27ea6d(), await _0x4e4f39(), await _0x59e7dc();

      if ($.cando) {
        await _0x1119f1($.shareuuid), await _0x6da168();

        let _0x93175e = Math.floor($.foodNum / 1000);

        console.log('可兑换 ' + _0x93175e + ' 次 20京🐶');

        for (q = 0; q < 1 && Exchange; q++) {
          await _0x3c7699(13);
        }

        !Exchange && console.log('你设置的不兑换东西,请自行进去活动兑换');
        taskList = [...$.taskList, ...$.taskList2];

        for (j = 0; j < taskList.length; j++) {
          task = taskList[j], console.log(task.taskname);

          if (task.taskid == 'interact') {
            for (l = 0; l < 20 - task.curNum; l++) {
              await _0x267e96(task.taskid, task.params), await $.wait(5000);
            }

            console.log('互动完成');
          } else {
            if (task.taskid == 'scansku') await _0x4cd315(), await _0x2914e3($.vid), await _0x267e96(task.taskid, $.pparam);else task.taskid !== 'add2cart' && (await _0x267e96(task.taskid, task.params), await $.wait(3000));
          }
        }

        await _0x6da168();

        for (k = 0; k < $.drawchance; k++) {
          await _0x1201cf(), await $.wait(1000);
        }

        message += '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n' + $.cow + ' 兑换京🐶 ' + $.exchange + '  ' + $.drawresult + '\n', console.log('休息休息~'), await $.wait(20000);
      } else $.msg($.name, ' 跑不起来~手动进活动看看吧');
    }
  }

  if (message.length != 0) {
    if ($.isNode()) {} else $.msg($.name, '', '星系牧场' + message);
  }
})().catch(_0x4cdf82 => $.logErr(_0x4cdf82)).finally(() => $.done());

function _0x56ec4e(_0xf5b332) {
  if (!_0x10fc48(() => _0xf5b332.headers['set-cookie'])) return;
  let _0x5997c8 = {},
      _0x5b6e75 = {};

  let _0x4528e9 = _0x75f0e5.split(';');

  for (let _0x1753e9 of _0x4528e9) {
    const _0x5eda35 = _0x1753e9.split('=');

    _0x5997c8[_0x5eda35[0]] = _0x1753e9.replace(_0x5eda35[0] + '=', '');
  }

  for (let _0x12b799 of _0xf5b332.headers['set-cookie']) {
    const _0x4613fb = _0x12b799.split(';')[0],
          _0x1edec0 = _0x4613fb.split('=');

    _0x5997c8[_0x1edec0[0]] = _0x4613fb.replace(_0x1edec0[0] + '=', '');
  }

  const _0x1a787a = { ..._0x5b6e75,
    ..._0x5997c8
  },
        _0x1677c8 = _0x1a787a;
  _0x75f0e5 = '';

  for (let _0x505910 in _0x1677c8) {
    _0x505910 && (_0x75f0e5 = _0x75f0e5 + (_0x505910 + '=' + _0x1677c8[_0x505910] + ';'));
  }
}

function _0x3372a4(_0x244d8a, _0x3adb0d) {
  const _0x46c471 = {
    'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
    'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
    'content-type': 'application/x-www-form-urlencoded',
    'Host': 'api.m.jd.com',
    'accept': '*/*'
  };
  _0x46c471.Cookie = _0x75f0e5;
  const _0x1d09cb = {};
  _0x1d09cb.url = 'https://api.m.jd.com/client.action?functionId=' + _0x244d8a, _0x1d09cb.body = _0x3adb0d, _0x1d09cb.headers = _0x46c471;
  return _0x1d09cb;
}

function _0x5892a3() {
  const _0x78fa5b = {
    'url': 'https://api.m.jd.com/client.action?functionId=genToken',
    'body': '&body=%7B%22to%22%3A%22https%3A%5C/%5C/lzdz-isv.isvjcloud.com%5C/dingzhi%5C/qqxing%5C/pasture%5C/activity?activityId%3D90121061401%22%2C%22action%22%3A%22to%22%7D&build=167588&client=apple&clientVersion=9.4.4&d_brand=apple&d_model=iPhone9%2C2&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=1805a3ab499eebc088fd9ed1c67f5eaf350856d4&osVersion=12.0&partner=apple&rfs=0000&scope=11&screen=1242%2A2208&sign=73af724a6be5f3cb89bf934dfcde647f&st=1624887881842&sv=111'
  };
  _0x78fa5b.headers = {}, _0x78fa5b.headers.Host = 'api.m.jd.com', _0x78fa5b.headers.accept = '*/*', _0x78fa5b.headers['user-agent'] = 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)';
  _0x78fa5b.headers['accept-language'] = 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6', _0x78fa5b.headers['content-type'] = 'application/x-www-form-urlencoded';
  _0x78fa5b.headers.Cookie = _0x75f0e5;
  let _0x415e48 = _0x78fa5b;
  return new Promise(_0x4399ba => {
    $.post(_0x415e48, async (_0x35e2e7, _0x1fb6fe, _0x350260) => {
      _0x56ec4e(_0x1fb6fe);

      try {
        _0x35e2e7 ? (console.log($.name + ' API请求失败，请检查网路重试'), console.log('' + JSON.stringify(_0x35e2e7))) : (_0x350260 = JSON.parse(_0x350260), $.isvToken = _0x350260.tokenKey, _0x75f0e5 += 'IsvToken=' + _0x350260.tokenKey);
      } catch (_0x292999) {
        $.logErr(_0x292999, _0x1fb6fe);
      } finally {
        _0x4399ba(_0x350260);
      }
    });
  });
}

function _0x49ffcf() {
  const _0x599c32 = {
    'id': '',
    'url': 'https://lzdz-isv.isvjcloud.com'
  };
  let _0xe317b4 = {
    'url': 'https://api.m.jd.com/client.action?functionId=isvObfuscator',
    'body': _0x49fc78.getbody('isvObfuscator', _0x599c32),
    'headers': {
      'Host': 'api.m.jd.com',
      'accept': '*/*',
      'user-agent': 'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)',
      'accept-language': 'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6',
      'content-type': 'application/x-www-form-urlencoded',
      'Cookie': _0x75f0e5
    }
  };
  return new Promise(_0x452fc4 => {
    $.post(_0xe317b4, async (_0x9ef1b4, _0x55861b, _0x383c65) => {
      {
        _0x56ec4e(_0x55861b);

        try {
          _0x9ef1b4 ? (console.log('' + JSON.stringify(_0x9ef1b4)), console.log($.name + ' API请求失败，请检查网路重试')) : (_0x383c65 = JSON.parse(_0x383c65), $.token2 = _0x383c65.token);
        } catch (_0x260857) {
          $.logErr(_0x260857, _0x55861b);
        } finally {
          _0x452fc4(_0x383c65);
        }
      }
    });
  });
}

function _0x24829e() {
  return new Promise(_0x3593ee => {
    $.get(_0x4436f9('/dingzhi/qqxing/pasture/activity', 'activityId=90121061401'), (_0x19825b, _0x2ed7c9, _0x37bc93) => {
      _0x56ec4e(_0x2ed7c9);

      try {
        if (_0x19825b) console.log($.name + ' API请求失败，请检查网路重试');else {}
      } catch (_0x3ac6d6) {
        $.logErr(_0x3ac6d6, _0x2ed7c9);
      } finally {
        _0x3593ee(_0x37bc93);
      }
    });
  });
}

function _0x1ab088() {
  let _0xf48afc = _0x31f1e1('/dz/common/getSimpleActInfoVo', 'activityId=90121061401');

  return new Promise(_0x1b7452 => {
    $.post(_0xf48afc, async (_0x3a0800, _0x310460, _0x541b8d) => {
      _0x56ec4e(_0x310460);

      try {
        if (_0x3a0800) console.log('' + JSON.stringify(_0x3a0800)), console.log($.name + ' API请求失败，请检查网路重试');else {
          _0x541b8d = JSON.parse(_0x541b8d), _0x541b8d.result && ($.shopid = _0x541b8d.data.shopId);
        }
      } catch (_0x2edb37) {
        $.logErr(_0x2edb37, _0x310460);
      } finally {
        _0x1b7452(_0x541b8d);
      }
    });
  });
}

function _0x27ea6d() {
  let _0x448650 = _0x31f1e1('/dingzhi/bd/common/getMyPing', 'userId=' + $.shopid + '&token=' + encodeURIComponent($.token2) + '&fromType=APP&activityId=90121061401');

  return new Promise(_0x594140 => {
    $.post(_0x448650, async (_0xd7f5ff, _0x467a50, _0x3b5129) => {
      _0x56ec4e(_0x467a50);

      try {
        _0xd7f5ff ? (console.log('' + JSON.stringify(_0xd7f5ff)), console.log($.name + ' API请求失败，请检查网路重试')) : (_0x3b5129 = JSON.parse(_0x3b5129), _0x3b5129.data && _0x3b5129.data.secretPin && ($.pin = _0x3b5129.data.secretPin, $.nickname = _0x3b5129.data.nickname, console.log('欢迎回来~  ' + $.nickname)));
      } catch (_0x1e70dc) {
        $.logErr(_0x1e70dc, _0x467a50);
      } finally {
        _0x594140(_0x3b5129);
      }
    });
  });
}

function _0x4e4f39() {
  let _0x3c1071 = _0x31f1e1('/common/accessLogWithAD', 'venderId=1000361242&code=99&pin=' + encodeURIComponent($.pin) + '&activityId=90121061401&pageUrl=https%3A%2F%2Flzdz-isv.isvjcloud.com%2Fdingzhi%2Fqqxing%2Fpasture%2Factivity%3FactivityId%3D90121061401%26lng%3D107.146945%26lat%3D33.255267%26sid%3Dcad74d1c843bd47422ae20cadf6fe5aw%26un_area%3D27_2442_2444_31912&subType=app&adSource=');

  return new Promise(_0x48475b => {
    $.post(_0x3c1071, async (_0x5f0c28, _0x52e406, _0x12f04b) => {
      _0x56ec4e(_0x52e406);

      try {
        if (_0x5f0c28) console.log('' + JSON.stringify(_0x5f0c28)), console.log($.name + ' API请求失败，请检查网路重试');else {
          if ($.isNode()) for (let _0x565cd6 of _0x52e406.headers['set-cookie']) {
            _0x75f0e5 = _0x75f0e5 + '; ' + _0x565cd6.split(';')[0] + ';';
          } else for (let _0x427a22 of _0x52e406.headers['Set-Cookie'].split(',')) {
            _0x75f0e5 = _0x75f0e5 + '; ' + _0x427a22.split(';')[0] + ';';
          }
        }
      } catch (_0x14176e) {
        $.logErr(_0x14176e, _0x52e406);
      } finally {
        _0x48475b(_0x12f04b);
      }
    });
  });
}

function _0x59e7dc() {
  return new Promise(_0x1436e3 => {
    let _0x1d1315 = 'pin=' + encodeURIComponent($.pin),
        _0x17f3b9 = _0x31f1e1('/wxActionCommon/getUserInfo', _0x1d1315);

    $.post(_0x17f3b9, async (_0x246e6c, _0x5f4998, _0x51816a) => {
      _0x56ec4e(_0x5f4998);

      try {
        _0x246e6c ? console.log($.name + ' API请求失败，请检查网路重试') : (_0x51816a = JSON.parse(_0x51816a), _0x51816a.data ? ($.userId = _0x51816a.data.id, $.pinImg = _0x51816a.data.yunMidImageUrl, $.nick = _0x51816a.data.nickname) : $.cando = false);
      } catch (_0x14e3f1) {
        $.logErr(_0x14e3f1, _0x5f4998);
      } finally {
        _0x1436e3(_0x51816a);
      }
    });
  });
}

function _0x1119f1() {
  return new Promise(_0x4a378e => {
    {
      let _0x367c3b = 'activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&pinImg=' + $.pinImg + '&nick=' + encodeURIComponent($.nick) + '&cjyxPin=&cjhyPin=&shareUuid=' + $.shareuuid;

      $.post(_0x31f1e1('/dingzhi/qqxing/pasture/activityContent', _0x367c3b), async (_0x37380b, _0x1dd8cb, _0x2ebf86) => {
        _0x56ec4e(_0x1dd8cb);

        try {
          _0x37380b ? console.log($.name + ' API请求失败，请检查网路重试') : (_0x2ebf86 = JSON.parse(_0x2ebf86), _0x2ebf86.result && (_0x2ebf86.data.openCardStatus != 3 && console.log('当前未开卡,无法助力和兑换奖励哦'), $.shareuuid = _0x2ebf86.data.uid, console.log('\n【（' + $.UserName + '）的' + $.name + '互助码】' + $.shareuuid + '\n')));
        } catch (_0x47d3ca) {
          $.logErr(_0x47d3ca, _0x1dd8cb);
        } finally {
          _0x4a378e(_0x2ebf86);
        }
      });
    }
  });
}

function _0x6da168() {
  let _0x59cada = _0x31f1e1('/dingzhi/qqxing/pasture/myInfo', 'activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&pinImg=' + $.pinImg + '&nick=' + $.nick + '&cjyxPin=&cjhyPin=&shareUuid=' + $.shareuuid);

  return new Promise(_0x23bf71 => {
    $.post(_0x59cada, async (_0x5d3c34, _0x320521, _0x5a4d1e) => {
      _0x56ec4e(_0x320521);

      try {
        if (_0x5d3c34) console.log('' + JSON.stringify(_0x5d3c34)), console.log($.name + ' API请求失败，请检查网路重试');else {
          _0x5a4d1e = JSON.parse(_0x5a4d1e);

          if (_0x5a4d1e.result) {
            $.taskList = _0x5a4d1e.data.task.filter(_0xc48634 => _0xc48634.maxNeed == 1 && _0xc48634.curNum == 0 || _0xc48634.taskid == 'interact'), $.taskList2 = _0x5a4d1e.data.task.filter(_0x269ce4 => _0x269ce4.maxNeed != 1 && _0x269ce4.type == 0), $.draw = _0x5a4d1e.data.bags.filter(_0xa8f364 => _0xa8f364.bagId == 'drawchance')[0], $.food = _0x5a4d1e.data.bags.filter(_0x2f7ee3 => _0x2f7ee3.bagId == 'food')[0], $.sign = _0x5a4d1e.data.bags.filter(_0x3f5357 => _0x3f5357.bagId == 'signDay')[0], $.score = _0x5a4d1e.data.score;

            let _0x5890ab = _0x5a4d1e.data.task.filter(_0x31fdb3 => _0x31fdb3.taskid == 'share2help')[0];

            _0x5890ab && _0x5890ab.curNum == 20 && ($.needhelp = false), $.cow = '当前🐮🐮成长值：' + $.score + '  饲料：' + ($.food.totalNum - $.food.useNum) + '  抽奖次数：' + ($.draw.totalNum - $.draw.useNum) + '  签到天数：' + $.sign.totalNum, $.foodNum = $.food.totalNum - $.food.useNum, console.log($.cow), $.drawchance = $.draw.totalNum - $.draw.useNum;
          } else $.cando = false, console.log(_0x5a4d1e.errorMessage);
        }
      } catch (_0x497941) {
        $.logErr(_0x497941, _0x320521);
      } finally {
        _0x23bf71(_0x5a4d1e);
      }
    });
  });
}

function _0x4cd315() {
  return new Promise(_0x5cbe8c => {
    let _0x43fadc = 'type=4&activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&actorUuid=' + $.uuid + '&userUuid=' + $.uuid;

    $.post(_0x31f1e1('/dingzhi/qqxing/pasture/getproduct', _0x43fadc), async (_0x24c257, _0x422ed7, _0x2b8aff) => {
      {
        _0x56ec4e(_0x422ed7);

        try {
          if (_0x24c257) {
            console.log($.name + ' API请求失败，请检查网路重试');
          } else _0x2b8aff = JSON.parse(_0x2b8aff), _0x2b8aff.data && _0x2b8aff.data[0] && ($.pparam = _0x2b8aff.data[0].id, $.vid = _0x2b8aff.data[0].venderId);
        } catch (_0x12432f) {
          $.logErr(_0x12432f, _0x422ed7);
        } finally {
          _0x5cbe8c(_0x2b8aff);
        }
      }
    });
  });
}

function _0x2914e3(_0x286d6b) {
  return new Promise(_0x4db138 => {
    let _0x422ab5 = 'jdActivityId=1404370&pin=' + encodeURIComponent($.pin) + '&actionType=5&venderId=' + _0x286d6b + '&activityId=90121061401';

    $.post(_0x31f1e1('/interaction/write/writePersonInfo', _0x422ab5), async (_0xbfdba1, _0x150979, _0x2e8fbd) => {
      _0x56ec4e(_0x150979);

      try {
        _0xbfdba1 ? console.log($.name + ' API请求失败，请检查网路重试') : (console.log('浏览：' + $.vid), console.log(_0x2e8fbd));
      } catch (_0x9bc7e0) {
        $.logErr(_0x9bc7e0, _0x150979);
      } finally {
        _0x4db138(_0x2e8fbd);
      }
    });
  });
}

function _0x3c7699(_0x1ada61) {
  return new Promise(_0x4294c3 => {
    let _0x436b0c = 'pid=' + _0x1ada61 + '&activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&actorUuid=&userUuid=';

    $.post(_0x31f1e1('/dingzhi/qqxing/pasture/exchange?_', _0x436b0c), async (_0x770492, _0x253978, _0x52f62c) => {
      _0x56ec4e(_0x253978);

      try {
        _0x770492 ? console.log($.name + ' API请求失败，请检查网路重试') : (_0x52f62c = JSON.parse(_0x52f62c), _0x52f62c.result ? (console.log('兑换 ' + _0x52f62c.data.rewardName + '成功'), $.exchange += 20) : console.log(_0x52f62c.errorMessage, '\n'));
      } catch (_0xd2afdb) {
        $.logErr(_0xd2afdb, _0x253978);
      } finally {
        _0x4294c3(_0x52f62c);
      }
    });
  });
}

function _0x267e96(_0x12e350, _0x478870) {
  let _0x5efccf = _0x31f1e1('/dingzhi/qqxing/pasture/doTask', 'taskId=' + _0x12e350 + '&' + (_0x478870 ? 'param=' + _0x478870 + '&' : '') + 'activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&actorUuid=' + $.uuid + '&userUuid=' + $.shareuuid);

  return new Promise(_0x1aaa02 => {
    $.post(_0x5efccf, async (_0x1bfa07, _0x459bef, _0x22a6a6) => {
      {
        _0x56ec4e(_0x459bef);

        try {
          if (_0x1bfa07) console.log('' + JSON.stringify(_0x1bfa07)), console.log($.name + ' API请求失败，请检查网路重试');else {
            _0x22a6a6 = JSON.parse(_0x22a6a6);
            if (_0x22a6a6.result) _0x22a6a6.data.food && console.log('操作成功,获得饲料： ' + _0x22a6a6.data.food + '  抽奖机会：' + _0x22a6a6.data.drawChance + '  成长值：' + _0x22a6a6.data.growUp);else {
              console.log(_0x22a6a6.errorMessage);
            }
          }
        } catch (_0x19fe82) {
          $.logErr(_0x19fe82, _0x459bef);
        } finally {
          _0x1aaa02(_0x22a6a6);
        }
      }
    });
  });
}

function _0x1201cf() {
  let _0x5ae596 = _0x31f1e1('/dingzhi/qqxing/pasture/luckydraw', 'activityId=90121061401&pin=' + encodeURIComponent($.pin) + '&actorUuid=&userUuid=');

  return new Promise(_0x4088e7 => {
    $.post(_0x5ae596, async (_0xbc20f3, _0x59ce7b, _0x35137c) => {
      _0x56ec4e(_0x59ce7b);

      try {
        if (_0xbc20f3) console.log('' + JSON.stringify(_0xbc20f3)), console.log($.name + ' API请求失败，请检查网路重试');else {
          _0x35137c = JSON.parse(_0x35137c);
          if (_0x35137c.result) Object.keys(_0x35137c.data).length == 0 ? console.log('抽奖成功,恭喜你抽了个寂寞： ') : (console.log('恭喜你抽中 ' + _0x35137c.data.prize.rewardName), $.drawresult += '恭喜你抽中 ' + _0x35137c.data.prize.rewardName + ' ');else {
            console.log(_0x35137c.errorMessage);
          }
        }
      } catch (_0x4f1f75) {
        $.logErr(_0x4f1f75, _0x59ce7b);
      } finally {
        _0x4088e7(_0x35137c);
      }
    });
  });
}

function _0x4436f9(_0x215ea4, _0xbfb0c3) {
  const _0x1dbe52 = {
    'Host': 'lzdz-isv.isvjcloud.com',
    'Accept': 'application/json',
    'Referer': 'https://lzdz-isv.isvjcloud.com',
    'user-agent': 'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded'
  };
  _0x1dbe52.Cookie = _0x75f0e5;
  const _0xbd94b8 = {};
  return _0xbd94b8.url = 'https://lzdz-isv.isvjcloud.com' + _0x215ea4 + '?' + _0xbfb0c3, _0xbd94b8.headers = _0x1dbe52, _0xbd94b8;
}

function _0x31f1e1(_0x282a86, _0x4cc43e) {
  const _0x2fdd51 = {
    'Host': 'lzdz-isv.isvjcloud.com',
    'X-Requested-With': 'XMLHttpRequest',
    'Referer': 'https://lzdz-isv.isvjcloud.com',
    'Accept': 'application/json',
    'user-agent': 'jdapp;android;10.0.4;11;2393039353533623-7383235613364343;network/wifi;model/Redmi K30;addressid/138549750;aid/290955c2782e1c44;oaid/b30cf82cacfa8972;osVer/30;appBuild/88641;partner/xiaomi001;eufv/1;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 11; Redmi K30 Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045537 Mobile Safari/537.36',
    'content-type': 'application/x-www-form-urlencoded'
  };
  _0x2fdd51.Cookie = _0x75f0e5;
  const _0x1a8740 = {};
  return _0x1a8740.url = 'https://lzdz-isv.isvjcloud.com' + _0x282a86, _0x1a8740.body = _0x4cc43e, _0x1a8740.headers = _0x2fdd51, _0x1a8740;
}

function _0x1a8ad3(_0x250199) {
  if (typeof _0x250199 == 'string') try {
    return JSON.parse(_0x250199);
  } catch (_0x12a851) {
    return console.log(_0x12a851), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}