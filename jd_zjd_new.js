/*
定时自定义，一天三次

https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zjd_new.js

默认前3个CK开团，如需修改，变量export DY_ZJDTOP=数量

一组30豆，一天最多开三组，至少5个CK才能保证成一次！

updatetime: 2022-10-2 优化

author: https://github.com/6dylan6/jdpro
 */
 
const $ = new Env('赚京豆-加密');
const Q = $.isNode() ? require('./sendNotify') : '',
      R = $.isNode() ? require('./jdCookie.js') : '';
let T = [],
    U = '',
    V,
    W = process.env.DY_ZJDTOP || 3;
$.tuanList = [], $.userlist = [], $.bj = '';

if ($.isNode()) {
  Object.keys(R).forEach(a => {
    T.push(R[a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else T = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...ad($.getdata('CookiesJD') || '[]').map(a => a.cookie)].filter(a => !!a);

const X = require('crypto-js'),
      Y = require('axios');

$.UA = 'jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36', !(async () => {
  if (!T[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }

  $.log('默认前3个CK开团，调整设置变量DY_ZJDTOP ,定时自定义，一天三次'), $.log('有问题TG喊我: https://t.me/dylan_jdpro\n');
  $.log('====================开始开团====================');
  await af('distributeBeanActivityInfo', {
    'paramData': {
      'channel': 'FISSION_BEAN'
    }
  }, 'aea1e');

  for (let g = 0; g < W; g++) {
    if (T[g]) {
      U = T[g], $.UserName = decodeURIComponent(U.match(/pt_pin=([^; ]+)(?=;?)/) && U.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = g + 1, $.isLogin = true, $.nickName = '', V = '', await aa(), $.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        var e = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', e);
        $.isNode() && (await Q.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await a0();
    }
  }

  $.log('\n====================开始团助力====================\n');

  for (let n = 0; n < T.length; n++) {
    $.canHelp = true;

    if (T[n]) {
      U = T[n], $.index = n + 1, $.UserName = decodeURIComponent(U.match(/pt_pin=([^; ]+)(?=;?)/) && U.match(/pt_pin=([^; ]+)(?=;?)/)[1]);

      if ($.canHelp && T.length > $.assistNum) {
        if ($.tuanList && $.tuanList.length) {
          $.log('\n账号' + $.index + ' ' + $.UserName + ' 开始助力 ');

          for (let q = 0; q < $.tuanList.length; q++) {
            console.log('去助力 => 【' + $.userlist[q] + '】'), $.max = false, await a2($.tuanList[q]);

            if ($.max) {
              $.tuanList.splice(q, 1), $.userlist.splice(q, 1), q--;
              continue;
            }

            if (!$.canHelp) break;
            await $.wait(Math.random() * 1000 + 500);
          }
        } else {
          $.log('\n没有需助力的团，结束运行\n');
          break;
        }
      } else {
        $.log('CK数量不足，助力个毛\n');
        break;
      }

      ;
    }
  }
})().catch(a => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + a + '!', '');
}).finally(() => {
  $.done();
});

function Z() {
  return new Promise(b => {
    {
      if (V) $.msg($.name, '', '【京东账号' + $.index + '】' + $.nickName + '\n' + V);
      b();
    }
  });
}

async function a0() {
  try {
    await a1(), await Z();
  } catch (f) {
    $.logErr(f);
  }
}

async function a1() {
  try {
    $.tuan = '', $.hasOpen = false, $.assistStatus = 0, await a3(), await $.wait(500);

    if (!$.tuan && ($.assistStatus === 3 || $.assistStatus === 2 || $.assistStatus === 0) && $.canStartNewAssist) {
      $.log('准备再次开团'), await a7(), await $.wait(500);
      if ($.hasOpen) await a3();
    }

    $.tuan && $.tuan.hasOwnProperty('assistedPinEncrypted') && $.assistStatus !== 3 && $.tuanList.push($.tuan);
  } catch (h) {
    $.logErr(h);
  }
}

async function a2(a) {
  return h5st = await ae('vvipclub_distributeBean_assist', a, '03064'), new Promise(e => {
    $.post(a8(h5st.fn, h5st.body), async (g, h, i) => {
      try {
        if (g) console.log('' + JSON.stringify(g)), console.log($.name + ' API请求失败，请检查网路重试');else {
          if (ab(i)) {
            i = JSON.parse(i);

            if (i.success) {
              $.log('助力结果：助力成功');
            } else {
              if (i.resultCode === '9200008') $.log('助力结果：不能助力自己');else {
                if (i.resultCode === '9200011') $.log('助力结果：已助力过TA且没次数了');else {
                  if (i.resultCode === '2400205') {
                    $.log('助力结果：团已满'), $.max = true;
                  } else {
                    if (i.resultCode === '90000014') $.log('助力结果：助力次数已耗尽'), $.canHelp = false;else {
                      if (i.resultCode === '2400203') $.log('助力结果：已助力过TA，还有助力次数');else {
                        if (i.resultCode === '9000013') {
                          $.log('助力结果：活动火爆，跳出'), $.canHelp = false;
                        } else {
                          if (i.resultCode === '101') $.log('助力结果：未登录，跳出'), $.canHelp = false;else console.log('助力结果：未知错误\n' + JSON.stringify(i) + '\n\n');
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      } catch (v) {
        $.logErr(v, h);
      } finally {
        e(i);
      }
    });
  });
}

async function a3() {
  return h5st = await ae('distributeBeanActivityInfo', {
    'paramData': {
      'channel': 'FISSION_BEAN'
    }
  }, 'aea1e'), new Promise(b => {
    $.post(a8(h5st.fn, h5st.body), async (g, h, i) => {
      try {
        if (g) console.log('' + JSON.stringify(g)), $.log('getUserTuanInfo API请求失败，请检查网路重试');else {
          if (ab(i)) {
            i = JSON.parse(i);

            if (i.success) {
              $.log('\n当前账号能否再次开团: ' + (i.data.canStartNewAssist ? '是' : '否'));
              if (i.data.assistStatus === 1 && !i.data.canStartNewAssist) $.log('已开团，团成员人未满\n');else {
                if (i.data.assistStatus === 2 && !i.data.canStartNewAssist) {
                  $.log('当前没有团或上一次未成团\n');
                } else {
                  if (i.data.assistStatus === 3 && i.data.canStartNewAssist) {
                    $.log('上一次已成团\n');
                  } else i.data.assistStatus === 3 && !i.data.canStartNewAssist && $.log('今日开团已达上限，且当前团成员人已满\n');
                }
              }

              if (!i.data.canStartNewAssist && i.data.assistValidMilliseconds !== 0) {
                var k = {
                  'launchChannel': '',
                  'channel': 'FISSION_BEAN'
                };
                k.activityIdEncrypted = i.data.id, k.assistStartRecordId = i.data.assistStartRecordId, k.assistedPinEncrypted = i.data.encPin, $.tuan = k, $.userlist.push($.UserName);
              }

              $.tuanActId = i.data.id, $.assistNum = i.data.assistNum || 4, $.assistStatus = i.data.assistStatus, $.canStartNewAssist = i.data.canStartNewAssist;
            } else $.tuan = true, $.log('当前账号活动信息失败 ' + JSON.stringify(i) + '\n');
          }
        }
      } catch (x) {
        $.logErr(x, h);
      } finally {
        b(i);
      }
    });
  });
}

function a4() {
  var f,
      g = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
      h = g.size,
      i = 'undefined' === h ? 10 : h,
      j = g.num,
      k = '';
  if (j && 'string' == typeof j) f = j;

  for (; i--;) k += f[Math.floor(Math.random() * f.length)];

  return k;
}

function a5(b) {
  var g = new Date(b),
      h = g.getFullYear(),
      i = g.getMonth() + 1 < 10 ? '0' + (g.getMonth() + 1) : g.getMonth() + 1,
      j = g.getDate() < 10 ? '0' + g.getDate() : g.getDate(),
      k = g.getHours() < 10 ? '0' + g.getHours() : g.getHours(),
      l = g.getMinutes() < 10 ? '0' + g.getMinutes() : g.getMinutes(),
      m = g.getSeconds() < 10 ? '0' + g.getSeconds() : g.getSeconds(),
      n = b.toString().substring(10);
  return h + i + j + k + l + m + n;
}

function a6() {
  var g = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
      h = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
      j = new Date(g),
      k = h,
      l = {
    'M+': j.getMonth() + 1,
    'd+': j.getDate(),
    'D+': j.getDate(),
    'h+': j.getHours(),
    'H+': j.getHours(),
    'm+': j.getMinutes(),
    's+': j.getSeconds(),
    'w+': j.getDay(),
    'q+': Math.floor((j.getMonth() + 3) / 3),
    'S+': j.getMilliseconds()
  };
  return /(y+)/i.test(k) && (k = k.replace(RegExp.$1, ''.concat(j.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(l).forEach(function (m) {
    {
      if (new RegExp('('.concat(m, ')')).test(k)) {
        var p = 'S+' === m ? '000' : '00';
        k = k.replace(RegExp.$1, 1 == RegExp.$1.length ? l[m] : ''.concat(p).concat(l[m]).substr(''.concat(l[m]).length));
      }
    }
  }), k;
}

async function a7() {
  return h5st = await ae('vvipclub_distributeBean_startAssist', {
    'activityIdEncrypted': $.tuanActId,
    'channel': 'FISSION_BEAN'
  }, '82703', 0), new Promise(b => {
    $.post(a8(h5st.fn, h5st.body), async (f, g, h) => {
      try {
        if (f) {
          console.log('' + JSON.stringify(f)), $.log('openTuan API请求失败，请检查网路重试');
        } else {
          if (ab(h)) {
            h = JSON.parse(h), h.success ? ($.log('>>>>>>>>>>>>>>>>>>>>>>>开团成功'), $.hasOpen = true) : console.log('\n开团失败：' + JSON.stringify(h) + '\n');
          }
        }
      } catch (q) {
        $.logErr(q, g);
      } finally {
        b(h);
      }
    });
  });
}

function a8(f, g) {
  var j = {
    'Host': 'api.m.jd.com',
    'Connection': 'keep-alive',
    'content-type': 'application/x-www-form-urlencoded',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'Referer': 'https://h5platform.jd.com/',
    'Origin': 'https://h5platform.jd.com/'
  };
  j.Cookie = U, j['User-Agent'] = $.UA;
  var k = {
    'url': 'https://api.m.jd.com/api'
  };
  return k.body = g, k.headers = j, k;
}

async function a9(f) {
  _0x8a8aa8 = {
    'version': $.version,
    'fp': $.fp,
    'appId': $.appId,
    'timestamp': Date.now(),
    'platform': 'web',
    'expandParams': ''
  };
  _0x8a8aa8.expandParams = $.expandParams || '';
  var i = {
    'Host': 'cactus.jd.com',
    'accept': 'application/json',
    'content-type': 'application/json'
  };
  i['user-agent'] = $.UA;
  var j = {};
  j.headers = i;
  let {
    data: k
  } = await Y.post('https://cactus.jd.com/request_algo?g_ty=ajax', _0x8a8aa8, j);
  let l = k,
      m = l.data.result,
      n = new Function('return ' + m.algo)();
  $.dict[f].tk = m.tk, $.dict[f].func = n;
}

function aa() {
  return new Promise(async b => {
    {
      const f = {
        'url': 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
        'headers': {
          'Host': 'wq.jd.com',
          'Accept': '*/*',
          'Connection': 'keep-alive',
          'Cookie': U,
          'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
          'Accept-Language': 'zh-cn',
          'Referer': 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
          'Accept-Encoding': 'gzip, deflate, br'
        }
      };
      $.get(f, (g, h, i) => {
        try {
          if (g) $.logErr(g);else {
            if (i) {
              i = JSON.parse(i);

              if (i.retcode === 1001) {
                $.isLogin = false;
                return;
              }

              i.retcode === 0 && i.data && i.data.hasOwnProperty('userInfo') && ($.nickName = i.data.userInfo.baseInfo.nickname);
            } else console.log('京东服务器返回空数据');
          }
        } catch (s) {
          $.logErr(s);
        } finally {
          b();
        }
      });
    }
  });
}

function ab(a) {
  try {
    if (typeof JSON.parse(a) == 'object') {
      return true;
    }
  } catch (h) {
    return console.log(h), console.log('京东服务器访问数据为空，请检查自身设备网络情况'), false;
  }
}

function ac(g) {
  if (g === '3.1') {
    var i = '',
        j = '0123456789',
        k = j,
        l = Math.floor(Math.random() * 10),
        m,
        n = 12;

    do {
      var o = {
        'size': 0x1
      };
      o.num = j, (m = a4(o), i.indexOf(m) == -1 && (i += m));
    } while (i.length < 3);

    for (let x of i.slice()) {
      k = k.replace(x, '');
    }

    var p = {};
    p.size = l, p.num = k;
    var q = a4(p) + i + a4({
      'size': n - l,
      'num': k
    }) + l,
        r = q.split(''),
        s = [];

    for (; r.length;) {
      s.push(9 - parseInt(r.pop()));
    }

    q = s.join('');
  } else {
    var n = 12,
        i = '',
        j = '0123456789',
        k = j,
        l = Math.floor(Math.random() * 10),
        m;

    do {
      var t = {
        'size': 0x1
      };
      t.num = j, (m = a4(t), i.indexOf(m) == -1 && (i += m));
    } while (i.length < 3);

    for (let B of i.slice()) {
      k = k.replace(B, '');
    }

    var u = {};
    u.size = l, u.num = k;
    var q = a4(u) + i + a4({
      'size': n - l,
      'num': k
    }) + l;
  }

  return q;
}

function ad(f) {
  var h = function () {
    {
      var k = true;
      return function (m, n) {
        {
          var o = k ? function () {
            {
              if (n) {
                var q = n.apply(m, arguments);
                return n = null, q;
              }
            }
          } : function () {};
          return k = false, o;
        }
      };
    }
  }(),
      i = h(this, function () {
    return i.toString().search('(((.+)+)+)+$').toString().constructor(i).search('(((.+)+)+)+$');
  });

  i();
  if (typeof f == 'string') try {
    return JSON.parse(f);
  } catch (k) {
    return console.log(k), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
  }
}

async function ae(e, f, g) {
  $.version = '3.1', $.fp = ac($.version), $.appId = g, $.dict = {
    [$.appId]: {}
  };
  var i = ['wc', 'wd', 'l', 'ls', 'ml', 'pl', 'av', 'ua', 'sua', 'pp', 'pp1', 'w', 'h', 'ow', 'oh', 'url', 'og', 'pr', 're'],
      j = {},
      k = [1, 0, 'zh-CN', 'zh-CN', 0, 0, '', $.UA, {
    'p1': $.UserName
  }, '', '', 393, 873, 393, 373, 'https://h5platform.jd.com/swm-static/exchange-equity/index.html#/pages/divideBean/divideBean?activeId=782884133873115136', 'https://h5platform.jd.com', 2.75, ''],
      l = {};

  for (let E in i) {
    l[i[E]] = k[E];
  }

  var m = {};
  m.ai = $.appId, m.fp = $.fp;
  var n = { ...l,
    ...m
  },
      o = n,
      p = 'wm0!@w-s#ll1flo(',
      q = '0102030405060708',
      r = X.AES.encrypt(JSON.stringify(o, null, 2), X.enc.Utf8.parse(p), {
    'iv': X.enc.Utf8.parse(q),
    'mode': X.mode.CBC,
    'padding': X.pad.Pkcs7
  });
  $.expandParams = r.ciphertext.toString(), ($.timestamp = new Date().getTime(), $.ts = a6($.timestamp, 'yyyyMMddhhmmssSSS')), await a9($.appId), $.time1 = new Date().getTime(), j = $.dict[$.appId], j.encrypt = await j.func(j.tk, $.fp, $.ts, $.appId, X).toString(X.enc.Hex);
  var s = {
    'appid': 'vipMiddle',
    'functionId': e,
    'body': JSON.stringify(f),
    'clientVersion': '3.1.3',
    'client': 'tjj_m'
  },
      t,
      u;
  let v = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'];
  delete s.h5st, u = s, t = v.filter(F => u[F]).map(F => F + ':' + (F == 'body' ? X.SHA256(s[F]) : s[F])).join('&');
  if (!$.bj) return 'abc';
  var w = X.HmacSHA256(t, j.encrypt).toString(X.enc.Hex);
  var x = '0102030405060708';

  if ($.version === '3.1') {
    var B = '';
    var A = {};
    var C = 'Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv';
    A.sua = C;
    A.pp = {};
    A.fp = $.fp;
    A.pp.p1 = $.UserName;
    var r = X.AES.encrypt(JSON.stringify(A, null, 2), X.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
      'iv': X.enc.Utf8.parse(x),
      'mode': X.mode.CBC,
      'padding': X.pad.Pkcs7
    });
    B = r.ciphertext.toString();
  }

  var D = $.ts + ';' + $.fp + ';' + $.appId + ';' + j.tk + ';' + w + ';' + $.version + ';' + $.timestamp + ';' + B;
  return {
    'body': 'functionId=' + e + '&h5st=' + encodeURIComponent(D) + '&body=' + encodeURIComponent(JSON.stringify(f)) + '&client=tjj_m&appid=vipMiddle&_t=' + $.time1 + '&clientVersion=3.1.3',
    'fn': e
  };
}

function af(e, f, g) {
  var i = {};
  i.appId = g, i.fn = e, i.body = f, i.pin = $.UserName;
  var j = {
    'Content-Type': 'application/json'
  };
  let k = {
    'url': 'https://test-hst-dlboogtocl.cn-hangzhou.fcapp.run/h5st',
    'body': JSON.stringify(i),
    'headers': j,
    'timeout': 0x2710
  },
      l = '';
  return new Promise(m => {
    $.post(k, (o, p, q) => {
      try {
        o ? (console.log(JSON.stringify(o)), console.log('连接服务失败，结束运行！'), process.exit(111)) : (q = JSON.parse(q), q.code == 200 ? (l = q.data, $.bj = 'suc') : $.log(q.msg));
      } catch (r) {
        console.log(r, p);
      } finally {
        m(l);
      }
    });
  });
}

function ag(a, b) {
  return new Promise(f => {
    let h = tasPostkUrl(turnTableId[a].id);
    $.post(h, async (j, k, l) => {
      try {
        if (j) {
          console.log('\n' + turnTableId[a].name + ' 签到: API查询请求失败 ‼️‼️');
          throw new Error(j);
        } else {
          $.validate = '';
          let m = $.toObj(l, l);

          if (typeof m === 'object') {
            if (m.success && m.data) {
              let n = m.data;
              if (Number(n.jdBeanQuantity) > 0) beanNum += Number(n.jdBeanQuantity);
              console.log(turnTableId[a].name + ' 签到成功:获得 ' + Number(n.jdBeanQuantity) + '京豆');
            } else {
              if (m.errorMessage) {
                if (m.errorMessage.indexOf('已签到') > -1 || m.errorMessage.indexOf('今天已经签到') > -1) {} else {
                  if (m.errorMessage.indexOf('进行验证') > -1) await injectToRequest('channelSign');else m.errorMessage.indexOf('火爆') > -1 && b == 2 ? await ag(a, 2) : console.log(turnTableId[a].name + ' ' + m.errorMessage);
                }
              } else console.log(turnTableId[a].name + ' ' + l);
            }
          } else console.log(turnTableId[a].name + ' ' + l);
        }
      } catch (o) {
        $.logErr(o, k);
      } finally {
        f(l);
      }
    });
  });
}

function ah(a) {
  return new Promise(e => {
    var f = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    };
    f['User-Agent'] = $.UA;
    var g = {};
    g.url = 'https://gia.jd.com/fcf.html?a=' + a.a, g.body = 'd=' + a.d;
    g.headers = f;
    const h = g;
    $.post(h, async (i, j, k) => {
      try {
        if (i) {
          console.log('\n' + turnTableId[i].name + ' 登录: API查询请求失败 ‼️‼️');
          throw new Error(i);
        } else k.indexOf('*_*') > 0 ? (k = k.split('*_*', 2), k = JSON.parse(k[1]), eid = k.eid) : console.log('京豆api返回数据为空，请检查自身原因');
      } catch (l) {
        $.logErr(l, j);
      } finally {
        e(k);
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
