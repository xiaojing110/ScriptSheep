
/*
入口：京喜首页-领红包
运行流程：助力--任务--抽奖,抽到空气不显示
未设置助力码变量运行会输出助力码
也可通过分享口令使用口令转链接获得
10 10 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jx_festivalhb.js
变量格式(多个@分割):
export TYCODE='shareId=XXXXXXXXXXXXXXXXXXXXXXX&itemId=XXXXXXX'
updatetime: 2023/3/3 助力45个即可
 */

const $ = new Env('京喜团圆红包');
const _0x4de92a = $.isNode() ? require('./sendNotify') : '',
      _0x17dddd = $.isNode() ? require('./jdCookie.js') : '',
      _0x19b846 = require('./function/dylany.js');

let _0x195ae2 = true,
    _0x5aeceb = [],
    _0x201ddb = '',
    _0x1ac15d = '';

if ($.isNode()) {
  Object.keys(_0x17dddd).forEach(_0x1c2130 => {
    _0x5aeceb.push(_0x17dddd[_0x1c2130]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else _0x5aeceb = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x5e4cd3($.getdata('CookiesJD') || '[]').map(_0x594a10 => _0x594a10.cookie)].filter(_0x407e4a => !!_0x407e4a);

let _0x47a430 = '';
process.env.TYCODE && (process.env.TYCODE.indexOf('@') > -1 ? _0x47a430 = process.env.TYCODE.split('@') : _0x47a430 = [process.env.TYCODE]);
let _0x3981ab = [];
!(async () => {
  if (!_0x5aeceb[0]) {
    const _0x49b3f8 = {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    };
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', _0x49b3f8);
    return;
  }

  console.log('当前版本：V2.0.0'), console.log('运行流程：助力--任务--抽奖'), console.log('问题建议：https://t.me/dylan_jdpro\n');
  let _0x23bfb8 = '';

  if (_0x47a430) {
    console.log('开始助力...');
    let _0x1d3462 = 0;

    for (let _0x368df5 of _0x47a430) {
      if (_0x368df5 == undefined) continue;
      $.full = false, $.hnum = 0;

      let _0x394817 = _0x368df5.split('&')[0],
          _0x27f35e = _0x368df5.split('&')[1];

      for (let _0x444783 = 0; _0x444783 < _0x5aeceb.length; _0x444783++) {
        if (_0x5aeceb[_0x444783]) {
          _0x201ddb = _0x5aeceb[_0x444783], $.UserName = decodeURIComponent(_0x201ddb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x201ddb.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x444783 + 1, $.isLogin = true, $.nickName = '', $.UA = _0x4255d5(), $.nohelp = false, console.log('\n开始【账号' + $.index + '】' + ($.nickName || $.UserName));

          if ($.index == 1 && _0x23bfb8) {
            console.log('当前CK1去助力作者');

            let _0x5f3d75 = _0x23bfb8.split('&')[0],
                _0x34e445 = _0x23bfb8.split('&')[1];

            await _0x4d6e3b(_0x5f3d75, _0x34e445);
          } else console.log('去助力 ' + _0x368df5), await _0x4d6e3b(_0x394817, _0x27f35e);

          if ($.full || $.hnum >= '45') {
            _0x1d3462 = _0x444783 + 1;
            break;
          }

          ;
          await $.wait(2000);
        }
      }

      if ($.index == _0x5aeceb.length) break;
    }
  } else {
    console.log('未设置助力码,开始任务和抽奖');
  }

  console.log('\n开始任务和抽奖......');

  for (let _0x3b9dc9 = 0; _0x3b9dc9 < _0x5aeceb.length; _0x3b9dc9++) {
    if (_0x5aeceb[_0x3b9dc9]) {
      _0x201ddb = _0x5aeceb[_0x3b9dc9], $.UserName = decodeURIComponent(_0x201ddb.match(/pt_pin=([^; ]+)(?=;?)/) && _0x201ddb.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x3b9dc9 + 1, $.isLogin = true, $.nickName = '', $.flag = 1, $.UA = _0x4255d5(), console.log('\n******开始【账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');

      if (!$.isLogin) {
        const _0x1c1a26 = {
          'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        };
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', _0x1c1a26);
        $.isNode() && (await _0x4de92a.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'));
        continue;
      }

      await _0x4f2827();
      if ($.tasklist === undefined) continue;
      $.flag = 0, await $.wait(500), await _0x1f327b(), await $.wait(500), console.log('\n开始做浏览任务。。。');

      for (let _0x51ee13 of $.tasklist) {
        if (_0x51ee13.completionFlag) {
          console.log(_0x51ee13.assignmentName + '---已完成');
          continue;
        }

        ;
        console.log('去做 ' + _0x51ee13.assignmentName), await _0x22fb19(_0x51ee13.encryptAssignmentId, _0x51ee13.shoppingActivityList[0].itemId), await $.wait(1000);
      }

      console.log('\n开始抽奖...');

      for (let _0x3d5ce2 = 0; _0x3d5ce2 < $.lottery; _0x3d5ce2++) {
        await _0x4317d4(), await $.wait(1000);
      }

      await $.wait(2000);
    }
  }
})().catch(_0x5c50a0 => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x5c50a0 + '!', '');
}).finally(() => {
  $.done();
});

async function _0x4f2827(_0x417e68 = true) {
  const _0x26d955 = {
    'ver': '1.0',
    'code': 0x1,
    'appId': '99062',
    'fn': 'festivalhb_home',
    'apid': 'jx_h5',
    'cl': 'jx_h5'
  };
  _0x26d955.body = {}, _0x26d955.user = $.UserName, _0x26d955.flag = $.flag, _0x26d955.ua = $.UA, _0x26d955.body.activeId = '63ef4e50c800b87f7a99e144';
  let _0x5b4eb5 = _0x26d955;

  let _0x41bdf9 = await _0x19b846.getbody(_0x5b4eb5);

  return new Promise(async _0x1ea238 => {
    $.get(_0x4f483e(_0x41bdf9), async (_0x2ba129, _0x311291, _0x950487) => {
      try {
        _0x2ba129 ? (console.log('' + JSON.stringify(_0x2ba129)), console.log(' API请求失败，请检查网路重试')) : (_0x950487 = JSON.parse(_0x950487), _0x950487.code == 0 ? (_0x950487 = _0x950487.data, $.shareid = _0x950487.shareId, _0x3981ab.push($.shareid), $.lottery = _0x950487.drawChanceNum, $.tasklist = _0x950487.browseTaskList, $.helpid = _0x950487.helpTask.itemId, $.cash = _0x950487.totalCoinAmount, $.red = _0x950487.totalHbAmount, $.helpnum = _0x950487.helpTask.completionCnt, _0x417e68 && console.log('助力码:\nshareId=' + $.shareid + '&itemId=' + $.helpid), console.log('已邀请：' + $.helpnum)) : console.log(_0x950487.msg));
      } catch (_0x3901e2) {
        $.logErr(_0x3901e2, _0x311291);
      } finally {
        _0x1ea238(_0x950487);
      }
    });
  });
}

async function _0x1f327b() {
  const _0x1148df = {
    'Origin': 'https://st.jingxi.com'
  };
  _0x1148df['User-Agent'] = $.UA, _0x1148df.Cookie = _0x201ddb;
  const _0x1a61f6 = {
    'url': 'https://api.jingxi.com/api?functionId=festivalhb_querymyprizelist&appid=jx_h5&t=1677806115621&channel=jxapp&cv=1.2.5&clientVersion=1.2.5&client=jxapp&uuid=30988114080298885&cthr=1&loginType=2&body=%7B%22activeId%22%3A%2263ef4e50c800b87f7a99e144%22%2C%22type%22%3A1%2C%22isExpire%22%3A1%2C%22ptag%22%3A%22138631.26.134%22%2C%22%24taroTimestamp%22%3A1677804984936%2C%22sceneval%22%3A2%2C%22buid%22%3A325%2C%22appCode%22%3A%22msd1188198%22%2C%22time%22%3A1677806115621%2C%22signStr%22%3A%220aeab59aa8165574c334c0147dccacb7%22%7D'
  };
  _0x1a61f6.headers = _0x1148df;
  let _0x5a1e8b = _0x1a61f6;
  return new Promise(async _0x8bb7a4 => {
    $.get(_0x5a1e8b, async (_0x4d20dd, _0x347038, _0x2180c5) => {
      try {
        if (_0x4d20dd) console.log('' + JSON.stringify(_0x4d20dd)), console.log(' API请求失败，请检查网路重试');else {
          _0x2180c5 = JSON.parse(_0x2180c5), _0x2180c5.code == 0 ? console.log('\n已获得红包总计：' + _0x2180c5.data.totalHbAmount + ',现金总计：' + _0x2180c5.data.totalCoinAmount + ',可提现金额剩余：' + _0x2180c5.data.canUseCoinAmount) : console.log(_0x2180c5.msg);
        }
      } catch (_0xa04b98) {
        $.logErr(_0xa04b98, _0x347038);
      } finally {
        _0x8bb7a4(_0x2180c5);
      }
    });
  });
}

async function _0x22fb19(_0x358bbb, _0x5d588f) {
  const _0x34c387 = {
    'appId': '99062',
    'ver': '1.0',
    'cl': 'jx_h5',
    'code': 0x1,
    'fn': 'festivalhb_browse',
    'apid': 'jx_h5'
  };
  _0x34c387.body = {}, _0x34c387.user = $.UserName, _0x34c387.flag = $.flag, _0x34c387.ua = $.UA, _0x34c387.body.activeId = '63ef4e50c800b87f7a99e144', _0x34c387.body.taskId = _0x358bbb, _0x34c387.body.itemId = _0x5d588f;

  let _0x8d1578 = _0x34c387,
      _0x33cd3a = await _0x19b846.getbody(_0x8d1578);

  return new Promise(async _0x29ed08 => {
    $.get(_0x4f483e(_0x33cd3a), async (_0x738c03, _0x16c0a7, _0x261cc6) => {
      try {
        if (_0x738c03) console.log('' + JSON.stringify(_0x738c03)), console.log(' API请求失败，请检查网路重试');else {
          _0x261cc6 = JSON.parse(_0x261cc6);

          if (_0x261cc6.code == 0) {
            console.log('任务完成，' + _0x261cc6.data.drawChanceNum + '抽奖次数'), $.lottery = _0x261cc6.data.drawChanceNum;
          } else console.log(_0x261cc6.msg);
        }
      } catch (_0x5add5e) {
        $.logErr(_0x5add5e, _0x16c0a7);
      } finally {
        _0x29ed08(_0x261cc6);
      }
    });
  });
}

async function _0x4317d4() {
  const _0x1c378e = {
    'code': 0x1,
    'appId': '99062',
    'fn': 'festivalhb_draw',
    'apid': 'jx_h5',
    'ver': '1.0',
    'cl': 'jx_h5'
  };
  _0x1c378e.body = {};
  _0x1c378e.user = $.UserName, _0x1c378e.flag = $.flag, _0x1c378e.ua = $.UA, _0x1c378e.body.activeId = '63ef4e50c800b87f7a99e144';

  let _0x3be038 = _0x1c378e,
      _0x411cbc = await _0x19b846.getbody(_0x3be038);

  return new Promise(async _0x38e682 => {
    $.get(_0x4f483e(_0x411cbc), async (_0x359959, _0x1a896e, _0x4d406a) => {
      try {
        if (_0x359959) console.log('' + JSON.stringify(_0x359959)), console.log(' API请求失败，请检查网路重试');else {
          _0x4d406a = JSON.parse(_0x4d406a);

          if (_0x4d406a.code == 0) {
            if (_0x4d406a.data.prize.length == 0) return;

            switch (_0x4d406a.data.prize[0].prizeType) {
              case 1:
                console.log('获得优惠券');
                break;

              case 2:
              case 3:
                console.log('获得' + _0x4d406a.data.prize[0].desc);
                break;

              default:
                break;
            }
          } else {
            console.log(_0x4d406a.msg);
          }
        }
      } catch (_0x21dc81) {
        $.logErr(_0x21dc81, _0x1a896e);
      } finally {
        _0x38e682(_0x4d406a);
      }
    });
  });
}

async function _0x4d6e3b(_0x4f810f, _0x4e451e) {
  _0x4f810f = _0x4f810f.split('=')[1], _0x4e451e = _0x4e451e.split('=')[1];
  const _0x276a7e = {
    'apid': 'jx_h5',
    'ver': '1.0',
    'code': 0x1,
    'flag': 0x1,
    'appId': '99062',
    'fn': 'festivalhb_help',
    'cl': 'jx_h5'
  };
  _0x276a7e.body = {}, _0x276a7e.user = $.UserName, _0x276a7e.ua = $.UA, _0x276a7e.body.activeId = '63ef4e50c800b87f7a99e144', _0x276a7e.body.shareId = _0x4f810f, _0x276a7e.body.itemId = _0x4e451e;

  let _0x202884 = _0x276a7e,
      _0x5c03b2 = await _0x19b846.getbody(_0x202884);

  return new Promise(async _0xf301bd => {
    $.get(_0x4f483e(_0x5c03b2), async (_0x517d1a, _0x475e32, _0x523954) => {
      try {
        if (_0x517d1a) console.log('' + JSON.stringify(_0x517d1a)), console.log(' API请求失败，请检查网路重试');else {
          _0x523954 = JSON.parse(_0x523954);

          if (_0x523954.code == 0) {
            if ($.index > 1) $.hnum++;
            console.log('助力成功 ' + ($.index > 1 ? $.hnum : ''));
          } else {
            if (_0x523954.code == 104) {
              console.log('已助力过TA'), $.nohelp = true;
            } else {
              if (_0x523954.code == 108) console.log('无助力次数'), $.nohelp = true;else {
                if (_0x523954.code == 103) {
                  console.log('对方助力已满');
                  if ($.index > 1) $.full = true;
                } else {
                  if (_0x523954.code == -120) console.log('不能助力自己');else {
                    console.log(_0x523954.msg);
                  }
                }
              }
            }
          }
        }
      } catch (_0x340110) {
        $.logErr(_0x340110, _0x475e32);
      } finally {
        _0xf301bd(_0x523954);
      }
    });
  });
}

function _0x4f483e(_0x220b51) {
  const _0x3b4dc3 = {
    'Host': 'api.jingxi.com',
    'Origin': 'https://st.jingxi.com'
  };
  _0x3b4dc3['User-Agent'] = $.UA, _0x3b4dc3.Cookie = _0x201ddb;
  const _0x21d9e7 = {};
  return _0x21d9e7.url = 'https://api.jingxi.com/api?g_ty=h5&g_tk=&appCode=msd1188198&' + _0x220b51 + '&loginType=2&sceneval=2', _0x21d9e7.headers = _0x3b4dc3, _0x21d9e7;
}


function _0x5e4cd3(_0x268d10) {
  if (typeof _0x268d10 == 'string') {
    try {
      return JSON.parse(_0x268d10);
    } catch (_0x4ff3d0) {
      return console.log(_0x4ff3d0), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

function _0x4255d5() {
  getstr = function (_0x15f6b5) {
    let _0x16d96e = '';

    for (let _0x5671a5 = 0; _0x5671a5 < _0x15f6b5; _0x5671a5++) {
      let _0x45f8c8 = Math.round(Math.random() * ('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.length - 1));

      _0x16d96e += '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.substring(_0x45f8c8, _0x45f8c8 + 1);
    }

    return _0x16d96e;
  };

  let _0x5c218f = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x41a07 = Buffer.from(getstr(16), 'utf8').toString('base64'),
      _0x4ac831 = encodeURIComponent(JSON.stringify({
    'hdid': 'JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=',
    'ts': Date.now(),
    'ridx': -1,
    'cipher': {
      'sv': 'CJS=',
      'ad': _0x5c218f,
      'od': _0x41a07,
      'ov': 'CzO=',
      'ud': _0x5c218f
    },
    'ciphertype': 0x5,
    'version': '1.2.0',
    'appname': 'com.jingdong.pingou'
  }));

  return 'jdpingou;android;5.50.2;;;appBuild/22435;session/26;pap/JA2019_3111789;ef/1;ep/' + _0x4ac831 + ';jdSupportDarkMode/0;Mozilla / 5.0(Linux; Android 12; 22021211RC Build / SKQ1.211006.001; wv) AppleWebKit / 537.36(KHTML, like Gecko) Version / 4.0 Chrome / 96.0.4664.104 Mobile Safari / 537.36';
}


Array.prototype.remove = function (_0x2795fd) {
  var _0x52a5c8 = this.indexOf(_0x2795fd);

  _0x52a5c8 > -1 && this.splice(_0x52a5c8, 1);
};

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }