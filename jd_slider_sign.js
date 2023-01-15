/*
需要滑块验证的签到
43 1,16 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_slider_sign.js 
updatetime: 2022/10/5
author: https://github.com/6dylan6/jdpro
*/


const signList = [
    //{ "name": "京东商城-健康", "id": 527, "url": "https://prodev.m.jd.com/mall/active/w2oeK5yLdHqHvwef7SMMy4PL8LF/index.html" },
    //{ "name": "京东商城-清洁", "id": 446, "url": "https://prodev.m.jd.com/mall/active/2Tjm6ay1ZbZ3v7UbriTj6kHy9dn6/index.html" },
    { "name": "京东个护", "id": 336, "url": "https://prodev.m.jd.com/mall/active/2tZssTgnQsiUqhmg5ooLSHY9XSeN/index.html" },
    //{ "name": "京东母婴", "code": "db88825f745a493a831c99a08dde077f", "url": "https://prodev.m.jd.com/mall/active/3BbAVGQPDd6vTyHYjmAutXrKAos6/index.html" },
    { "name": "京东宠物", "code": "9178cced8d184bba8e7d970a4492d0a8", "url": "https://prodev.m.jd.com/mall/active/2TY2j1yJ9T2QKiQekTpHgvv68HiD/index.html" },
    { "name": "京东奢品", "code": "c679761d4f41429383e043ac3e00b6a9", "url": "https://prodev.m.jd.com/mall/active/24mfJCMuf9d32RkVHNcebAhhxywF/index.html" },
    { "name": "京东电器", "id": 347, "url": "https://prodev.m.jd.com/mall/active/4SWjnZSCTHPYjE5T7j35rxxuMTb6/index.html" },
    //{ "name": "京东酒行", "code": "f6a1fc4be1df43d6ae3f282b6716f7c8", "url": "https://prodev.m.jd.com/mall/active/3kcHLz7wd93eRJBhCuojcnukNFcy/index.html" },
    { "name": "手机好店", "code": 'f72d6cd7e1a64f2fa27e4b8f0c2cf1a9', "url": "https://prodev.m.jd.com/mall/active/3HNF5DKia1F6QJdJNaL9ddMWnZCD/index.html" },
    { "name": "PLUS天天领京豆", "id": 1265, "url": "https://pro.m.jd.com/mall/active/N9MpLQdxZgiczZaMx2SzmSfZSvF/index.html" }
]

const $ = new Env('京东滑块签到-加密');
const b4 = $.isNode() ? require('./sendNotify') : '',
      b5 = $.isNode() ? require('./jdCookie.js') : '';

const b6 = require('crypto-js');

let b7 = [],
    b8 = '';

const b9 = require('png-js'),
      ba = require('https'),
      bb = require('stream'),
      bc = require('zlib'),
      bd = require('vm'),
      be = 50;

let bf = '',
    bh = '',
    bi = 0,
    bj = '';
let bk = '',
    bl = false,
    bm = 0,
    bn = 0;

if ($.isNode()) {
  process.env.JOY_HOST && (JD_API_HOST = process.env.JOY_HOST);
  Object.keys(b5).forEach(a => {
    b7.push(b5[a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else b7 = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...bw($.getdata('CookiesJD') || '[]').map(a => a.cookie)].filter(a => !!a);

!(async () => {
  if (!b7[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
      'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
  }


  for (let g = 0; g < 5; g++) {
    if (b7[g]) {
      b8 = b7[g], $.UserName = decodeURIComponent(b8.match(/pt_pin=(.+?);/) && b8.match(/pt_pin=(.+?);/)[1]), $.index = g + 1, $.nickName = '', console.log('\n开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n'), bi = 0, bm = 0, bn = 0, invalidNum = 0, bh = '', lkt = new Date().getTime(), bx(), $.uuid = bR('xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx'), await bq();
      const j = new Date().getTime() + new Date().getTimezoneOffset() * 60000 + 28800000,
            k = {
        'hour12': false
      };
      $.beanSignTime = new Date(j).toLocaleString('zh', k).replace(' 24:', ' 00:');
      let l = '【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '\n【签到时间】:  ' + $.beanSignTime + '\n【签到概览】:  成功' + 0 + '个, 失败' + 0 + '个' + (invalidNum && '，失效' + invalidNum + '个' || '') + '\n';
      bf += l + '\n', console.log('【签到总计】:  ' + signList.length + '个\n' + l);
    }
  }
})().catch(a => {
  $.log('', '❌ ' + $.name + ', 失败! 原因: ' + a + '!', '');
}).finally(() => {
  $.done();
});

async function bp() {
  $.msg($.name, '【签到总计】:  ' + signList.length + '个\n' + bf);
}

async function bq() {
  for (let b in signList) {
    $.validatorUrl = signList[b].url || '', bl = 0, console.log('开始 ' + signList[b].name + ' 签到...'), await br(b);
    bn++;
    let e = Math.random() * 5000 + 10000;
    console.log('随机等待' + (e / 1000).toFixed(0) + '秒\n'), await $.wait(parseInt(e, 10));
  }
}

function br(a) {
  return new Promise(async e => {
    {
      let g = await bu(signList[a].id || signList[a].code);
      $.get(g, async (h, j, k) => {
        try {
          if (h) console.log('\n' + signList[a].name + ' 登录: API查询请求失败 ‼️‼️'), console.log('' + JSON.stringify(h));else {
            if (k) {
              k = JSON.parse(k);

              if (k.success && k.data) {
                k = k.data;

                if (k.hasSign === false) {
                  let r = 0;
                  $.validate = '';
                  await bz();
                  await $.wait(500);
                  if ($.validate === '') return;
                  await bs(a, 1);
                } else {
                  if (k.hasSign === true) {
                    if (k.records && k.records[0]) {
                      for (let s in k.records) {
                        let t = k.records[s];

                        if (t.hasSign == false && t.index != 1 || s == k.records.length - 1) {
                          if (t.hasSign == false) s = s - 1;
                          break;
                        }
                      }
                    }

                    bl = 1, console.log(signList[a].name + ' 今日已签到');
                  } else {
                    bl = 2, console.log(signList[a].name + ' 无法签到\n签到地址:' + signList[a].url + '\n');
                  }
                }
              } else k.errorMessage ? ((k.errorMessage.indexOf('已签到') > -1 || k.errorMessage.indexOf('今天已经签到') > -1) && (bl = 1), console.log(signList[a].name + ' ' + k.errorMessage)) : console.log(signList[a].name + ' ' + JSON.stringify(k));
            } else console.log('京豆api返回数据为空，请检查自身原因');
          }
        } catch (I) {
          $.logErr(I, j);
        } finally {
          e(k);
        }
      });
    }
  });
}

function bs(a, b) {
  return new Promise(async f => {
    {
      let j = await bv(signList[a].id || signList[a].code);
      $.post(j, async (k, l, m) => {
        try {
          if (k) {
            console.log('\n' + signList[a].name + ' 签到: API查询请求失败 ‼️‼️');
            throw new Error(k);
          } else {
            let r = $.toObj(m, m);

            if (typeof r === 'object') {
              if (r.success && r.data) {
                let u = r.data;
                if (Number(u.jdBeanQuantity) > 0) bi += Number(u.jdBeanQuantity);
                bl = true, console.log(signList[a].name + ' 签到成功:获得 ' + Number(u.jdBeanQuantity) + '京豆');
              } else {
                if (r.errorMessage) {
                  if (r.errorMessage.indexOf('已签到') > -1 || r.errorMessage.indexOf('今天已经签到') > -1) bl = true;else {
                    console.log(signList[a].name + ' ' + r.errorMessage);
                  }
                } else {
                  console.log(signList[a].name + ' ' + m);
                }
              }
            } else {
              console.log(signList[a].name + ' ' + m);
            }
          }
        } catch (F) {
          $.logErr(F, l);
        } finally {
          f(m);
        }
      });
    }
  });
}

function bt(a) {
  return new Promise(e => {
    {
      const g = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
      };
      g['User-Agent'] = $.UA;
      const h = {};
      h.url = 'https://gia.jd.com/fcf.html?a=' + a.a, h.body = 'd=' + a.d, h.headers = g;
      const i = h;
      $.post(i, async (j, k, l) => {
        try {
          if (j) {
            console.log('\n' + signList[i].name + ' 登录: API查询请求失败 ‼️‼️');
            throw new Error(j);
          } else {
            if (l.indexOf('*_*') > 0) l = l.split('*_*', 2), l = JSON.parse(l[1]), bk = l.eid;else {
              console.log('京豆api返回数据为空，请检查自身原因');
            }
          }
        } catch (t) {
          $.logErr(t, k);
        } finally {
          e(l);
        }
      });
    }
  });
}

async function bu(i) {
  let k = Date.now(),
      l;

  if (i.length === 32) {
    const v = {};
    v.code = '' + i, l = v;
  } else {
    const z = {};
    z.turnTableId = '' + i, l = z;
  }

  let m = await bL('turncardChannelDetail', l, '9a4de');
  const n = {
    'key': 'appid',
    'value': 'jdchoujiang_h5'
  };
  const o = {
    'key': 't'
  };
  o.value = k;
  let p = [n, {
    'key': 'body',
    'value': b6.SHA256($.toStr(l, l)).toString()
  }, {
    'key': 'client',
    'value': ''
  }, {
    'key': 'clientVersion',
    'value': ''
  }, {
    'key': 'functionId',
    'value': 'turncardChannelDetail'
  }, o],
      q = 'https://api.m.jd.com/api?client=android&clientVersion=11.0.2&appid=jdchoujiang_h5&functionId=turncardChannelDetail&body=' + encodeURIComponent(JSON.stringify(l)) + '&h5st=' + m;
  const r = {
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-cn',
    'Origin': 'https://prodev.m.jd.com',
    'Referer': 'https://prodev.m.jd.com/'
  };
  r.Cookie = b8;
  r['User-Agent'] = $.UA;
  const s = {};
  s.url = q;
  return s.headers = r, s;
}

async function bv(j) {
  let l = Date.now(),
      m;

  if (j.length === 32) {
    const v = {
      'openid': -1,
      'osVersion': '9',
      'model': '',
      'client': 'android',
      'clientVersion': '11.0.2',
      'brand': 'XIAOMI',
      'networkType': 'wifi'
    };
    v.uuid = $.uuid;
    const w = {
      'validate': '',
      'fp': ''
    };
    w.code = '' + j, w.eid = bk, w.deviceInfoVO = v, m = w;
  } else {
    const B = {
      'validate': '',
      'fp': ''
    };
    B.turnTableId = '' + j, B.eid = bk, m = B;
  }

  if ($.validate) {
    m.validate = $.validate;
  }

  const n = {
    'key': 'appid',
    'value': 'jdchoujiang_h5'
  };
  const o = {
    'key': 't'
  };
  o.value = l;
  let p = [n, {
    'key': 'body',
    'value': b6.SHA256($.toStr(m, m)).toString()
  }, {
    'key': 'client',
    'value': ''
  }, {
    'key': 'clientVersion',
    'value': ''
  }, {
    'key': 'functionId',
    'value': 'turncardChannelSign'
  }, o],
      q = await bL('turncardChannelSign', m, 'b342e'),
      r = 'https://api.m.jd.com/api?client=android&clientVersion=11.0.2&appid=jdchoujiang_h5&functionId=turncardChannelSign&body=' + encodeURIComponent(JSON.stringify(m)) + '&' + q;
  const s = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Origin': 'https://prodev.m.jd.com',
    'Referer': 'https://prodev.m.jd.com/'
  };
  s.Cookie = b8, s['User-Agent'] = $.UA;
  const u = {};
  return u.url = r, u.headers = s, u;
}

function bw(f) {
  if (typeof f == 'string') {
    try {
      return JSON.parse(f);
    } catch (l) {
      return console.log(l), $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'), [];
    }
  }
}

function bx() {
  $.UA = 'jdapp;android;11.0.2;;;appBuild/97565;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1663720079628%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22EG%3D%3D%22%2C%22ad%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%2C%22od%22%3A%22ZQHuZtc3CzCjZtdvZM1rEQO5BJvsD2OjCzPsZwHsZQU2YzKz%22%2C%22ov%22%3A%22Ctq%3D%22%2C%22ud%22%3A%22ZwS1ZQC4ZwVrZJZuDzC0ZK%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 9; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046011 Mobile Safari/537.36';
}

function by(f) {
  f = f || 32;
  let i = 'abcdef0123456789',
      j = 'abcdef0123456789'.length,
      k = '';

  for (i = 0; i < f; i++) k += i.charAt(Math.floor(Math.random() * j));

  return k;
}

async function bz(b = 'cww') {
  console.log('滑块验证中...');
  let g = await new bJ().run(b, bk);
  g.validate && ($.validate = g.validate);
}

Math.avg = function bS() {
  var f = 0,
      g = this.length;

  for (var h = 0; h < g; h++) {
    f += this[h];
  }

  return f / g;
};

function bA(a) {
  return new Promise(b => setTimeout(b, a));
}

class bB extends b9 {
  constructor(a) {
    super(a);
    this.pixels = [];
  }

  ['decodeToPixels']() {
    return new Promise(b => {
      this.decode(g => {
        this.pixels = g, b();
      });
    });
  }

  ['getImageData'](b, e, f, g) {
    const {
      pixels: k
    } = this,
          l = f * g * 4;
    const m = b * 4 + e * (f * 4);
    return {
      'data': k.slice(m, m + l)
    };
  }

}

const bC = 8,
      bD = 10;

class bE {
  constructor(b, e, f) {
    const i = new bB(Buffer.from(b, 'base64')),
          j = new bB(Buffer.from(e, 'base64'));
    this.bg = i, this.patch = j;
    this.rawBg = b;
    this.rawPatch = e, this.y = f, this.w = i.width, this.h = i.height;
  }

  async ['run']() {
    await this.bg.decodeToPixels();
    return await this.patch.decodeToPixels(), this.recognize();
  }

  ['recognize']() {
    const {
      ctx: e,
      w: f,
      bg: h
    } = this,
          {
      width: j,
      height: k
    } = this.patch;
    const l = this.y + 10 + (k - 10) / 2 - 4,
          m = h.getImageData(0, l, f, 8).data,
          o = [];

    for (let C = 0; C < f; C++) {
      var p = 0;

      for (let D = 0; D < 8; D++) {
        let G = 0;
        var s = C * 4 + D * (f * 4);
        var q = m[s];
        var u = m[s + 1];
        var t = m[s + 2];
        var v = 0.2126 * q + 0.7152 * u + 0.0722 * t;
        p += v;
      }

      o.push(p / 8);
    }

    const w = 2,
          z = j - 10,
          A = 20,
          B = 10;

    for (let I = 0, J = o.length - 8; I < J; I++) {
      const L = (o[I] + o[I + 1]) / 2,
            M = (o[I + 2] + o[I + 3]) / 2,
            N = z + I,
            O = (o[N] + o[N + 1]) / 2,
            P = (o[N + 2] + o[N + 3]) / 2;

      if (L - M > 20 && O - P < -20) {
        const R = o.slice(I + 2, z + I + 2),
              S = R.sort((U, V) => U - V)[20],
              T = Math.avg(R);
        if (S > L || S > P) return;
        if (T > 100) return;
        return I + 2 - 10;
      }
    }

    return -1;
  }

  ['runWithCanvas']() {
    const {
      createCanvas: e,
      Image: f
    } = require('canvas'),
          j = e(),
          k = j.getContext('2d'),
          l = new f(),
          m = new f();

    l.src = 'data:image/png;base64,' + this.rawBg, m.src = 'data:image/png;base64,' + this.rawPatch;
    const {
      naturalWidth: p,
      naturalHeight: q
    } = l;
    j.width = p, j.height = q, k.clearRect(0, 0, p, q), k.drawImage(l, 0, 0, p, q);
    const s = p,
          {
      naturalWidth: t,
      naturalHeight: u
    } = m,
          v = this.y + 10 + (u - 10) / 2 - 4;
    const z = k.getImageData(0, v, s, 8).data,
          A = [];

    for (let L = 0; L < s; L++) {
      var B = 0;

      for (let M = 0; M < 8; M++) {
        let O = 0;
        var D = L * 4 + M * (s * 4);
        var G = z[D];
        var F = z[D + 1];
        var E = z[D + 2];
        var C = 0.2126 * G + 0.7152 * F + 0.0722 * E;
        B += C;
      }

      A.push(B / 8);
    }

    const H = 2,
          I = t - 10;
    const J = 20,
          K = 10;

    for (let R = 0, S = A.length - 8; R < S; R++) {
      const U = (A[R] + A[R + 1]) / 2,
            V = (A[R + 2] + A[R + 3]) / 2,
            W = I + R,
            X = (A[W] + A[W + 1]) / 2,
            Y = (A[W + 2] + A[W + 3]) / 2;

      if (U - V > 20 && X - Y < -20) {
        const a0 = A.slice(R + 2, I + R + 2),
              a1 = a0.sort((a3, a4) => a3 - a4)[20],
              a2 = Math.avg(a0);
        if (a1 > U || a1 > Y) return;
        if (a2 > 100) return;
        return R + 2 - 10;
      }
    }

    return -1;
  }

}

function bF(b) {
  let f = {
    'version': '3.1',
    'fp': $.dy[b].fp,
    'appId': b,
    'timestamp': Date.now(),
    'platform': 'web',
    'expandParams': ''
  };
  f.expandParams = $.expandParams || '';
  const g = {
    'Host': 'cactus.jd.com',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  g['User-agent'] = $.UA;
  let h = {
    'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
    'body': JSON.stringify(f),
    'headers': g,
    'timeout': 0x2710
  };
  return new Promise(async i => {
    $.post(h, (l, m, n) => {
      try {
        if (l) {
          console.log('' + JSON.stringify(l)), console.log('algo请求失败，请检查网路重试');
        } else {
          n = JSON.parse(n);
          let s = n.data.result;
          $.dy[b].tk = s.tk, $.dy[b].test = new Function('return ' + s.algo)();
        }
      } catch (t) {
        $.logErr(t, m);
      } finally {
        i(n);
      }
    });
  });
}

const bG = {
  'appId': '17839d5db83',
  'product': 'embed',
  'lang': 'zh_CN'
};
const bH = bG,
      bI = 'iv.jd.com';

class bJ {
  constructor() {
    this.data = {}, this.x = 0;
    this.t = Date.now(), this.count = 0;
  }

  async ['run'](b = 'cww', e = '') {
    const g = async () => {
      {
        const m = await this.recognize(b, e);

        if (m > 0) {
          return m;
        }

        return await g();
      }
    },
          h = await g();

    const i = new bN(h).run(),
          j = bK(i);
    await bA(i[i.length - 1][2] - Date.now()), this.count++;
    const k = {
      'd': j,
      ...this.data
    },
          l = await bJ.jsonp('/slide/s.html', k, b);

    if (l.message === 'success') {
      return $.validatorTime = ((Date.now() - this.t) / 1000).toFixed(0), console.log('\n滑块验证耗时: ' + $.validatorTime + '秒'), l;
    } else {
      process.stdout.write('.');

      if (this.count >= 50) {
        return console.log('\n滑块验证失败过多，退出本次验证'), l;
      } else {
        return await bA(1000), await this.run(b, e);
      }
    }
  }

  async ['recognize'](f, g) {
    const j = {};
    j.e = g;
    const k = await bJ.jsonp('/slide/g.html', j, f);
    const {
      bg: l,
      patch: m,
      y: n
    } = k,
          o = new bE(l, m, n),
          p = await o.run();

    if (p > 0) {
      const q = {
        's': '',
        'o': '',
        'o1': 0x0
      };
      q.c = k.challenge, q.w = o.w, q.e = g, q.u = $.validatorUrl || 'https://prodev.m.jd.com', this.data = q, this.x = p;
    }

    return p;
  }

  async ['report'](b) {
    console.time('PuzzleRecognizer');
    let g = 0;

    for (let h = 0; h < b; h++) {
      const k = await this.recognize();
      if (k > 0) g++;

      if (h % 50 === 0) {}
    }

    console.log('验证成功: %f%', g / b * 100), console.clear();
    console.timeEnd('PuzzleRecognizer');
  }

  static ['jsonp'](a, b = {}, e) {
    return new Promise((h, i) => {
      {
        const k = 'jsonp_' + String(Math.random()).replace('.', ''),
              l = {};
        l.callback = k;
        const m = l,
              n = {};
        n.scene = e;
        const o = { ...bH,
          ...n,
          ...b,
          ...m
        },
              p = new URLSearchParams(o).toString(),
              q = 'https://iv.jd.com' + a + '?' + p,
              r = {
          'Accept': '*/*',
          'Accept-Encoding': 'gzip,deflate,br',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Connection': 'keep-alive',
          'Host': 'iv.jd.com',
          'Referer': 'https://prodev.m.jd.com/'
        };
        r['User-Agent'] = $.UA;
        const s = r,
              t = {};
        t.headers = s;
        const u = ba.get(q, t, v => {
          {
            let z = v;

            if (z.headers['content-encoding'] === 'gzip') {
              const C = new bb.PassThrough();
              bb.pipeline(v, bc.createGunzip(), C, i), z = C;
            }

            z.setEncoding('utf8');
            let A = '';
            z.on('data', D => A += D), z.on('end', () => {
              try {
                const F = {
                  [k]: G => F.data = G,
                  'data': {}
                };
                bd.createContext(F), bd.runInContext(A, F), z.resume(), h(F.data);
              } catch (G) {
                i(G);
              }
            });
          }
        });
        u.on('error', i), u.end();
      }
    });
  }

}

function bK(g) {
  function i(q) {
    {
      var s = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-~'.split(''),
          t = s.length,
          u = +q,
          v = [];

      do {
        mod = u % t, u = (u - mod) / t, v.unshift(s[mod]);
      } while (u);

      return v.join('');
    }
  }

  function j(q, r) {
    return (Array(r).join(0) + q).slice(-r);
  }

  function k(q, r, s) {
    {
      var u = i(Math.abs(q)),
          v = '';

      if (!s) {
        v += q > 0 ? '1' : '0';
      }

      return v += j(u, r), v;
    }
  }

  var l = new Array();

  for (var m = 0; m < g.length; m++) {
    if (m == 0) l.push(k(g[m][0] < 262143 ? g[m][0] : 262143, 3, true)), l.push(k(g[m][1] < 16777215 ? g[m][1] : 16777215, 4, true)), l.push(k(g[m][2] < 4398046511103 ? g[m][2] : 4398046511103, 7, true));else {
      let u = 0;
      var p = g[m][0] - g[m - 1][0];
      var n = g[m][1] - g[m - 1][1];
      var o = g[m][2] - g[m - 1][2];
      l.push(k(p < 4095 ? p : 4095, 2, false));
      l.push(k(n < 4095 ? n : 4095, 2, false));
      l.push(k(o < 16777215 ? o : 16777215, 4, true));
    }
  }

  return l.join('');
}

async function bL(g, h, i) {
  let l = bO('3.1');
  const m = {};
  m.fp = l;
  const n = {};
  n[i] = m, $.dy = n;
  let o = ['wc', 'wd', 'l', 'ls', 'ml', 'pl', 'av', 'ua', 'sua', 'pp', 'pp1', 'w', 'h', 'ow', 'oh', 'url', 'og', 'pr', 're'],
      p = {},
      q = {},
      r = [1, 0, 'zh-CN', 'zh-CN', 0, 0, '', $.UA, {
    'p1': $.UserName
  }, '', '', 393, 873, 393, 373, '', '', 2.75, ''];

  for (let H in o) {
    q[o[H]] = r[H];
  }

  const s = {};
  s.ai = i, s.fp = l;
  const t = { ...q,
    ...s
  };
  let u = t,
      v = b6.AES.encrypt(JSON.stringify(u, null, 2), b6.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
    'iv': b6.enc.Utf8.parse('0102030405060708'),
    'mode': b6.mode.CBC,
    'padding': b6.pad.Pkcs7
  });
  $.expandParams = v.ciphertext.toString();
  let w = new Date().getTime();
  await bF(i);
  let z = new Date().getTime(),
      A = bQ(z, 'yyyyMMddhhmmssSSS');
  p = $.dy[i], p.enc = await p.test(p.tk, l, A, i, b6).toString(b6.enc.Hex);
  let B = {
    'appid': 'jdchoujiang_h5',
    'functionId': g,
    'body': JSON.stringify(h),
    'clientVersion': '11.0.2',
    'client': 'android',
    't': w
  },
      C = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'];
  let D = C.filter(J => B[J]).map(J => J + ':' + (J == 'body' ? b6.SHA256(B[J]).toString() : B[J])).join('&');
  let E = b6.HmacSHA256(D, p.enc).toString(b6.enc.Hex),
      F = '';
  {
    let K = {};
    K.sua = $.UA.match(/\(([^\)]+)\)/)[1], K.pp = {}, K.fp = l, K.pp.p1 = $.UserName;
    let L = b6.AES.encrypt(JSON.stringify(K, null, 2), b6.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
      'iv': b6.enc.Utf8.parse('0102030405060708'),
      'mode': b6.mode.CBC,
      'padding': b6.pad.Pkcs7
    });
    F = L.ciphertext.toString();
  }
  let G = [A, l, i, p.tk, E, '3.1', z, F].join(';');
  return 't=' + w + '&h5st=' + encodeURIComponent(G);
}

const bM = 20;

class bN {
  constructor(a) {
    this.x = parseInt(Math.random() * 20 + 20, 10);
    this.y = parseInt(Math.random() * 80 + 80, 10);
    this.t = Date.now();
    this.pos = [[this.x, this.y, this.t]];
    this.minDuration = parseInt(50, 10);
    this.puzzleX = a + parseInt(Math.random() * 2 - 1, 10);
    this.STEP = parseInt(Math.random() * 6 + 5, 10);
    this.DURATION = parseInt(Math.random() * 7 + 14, 10) * 100;
    this.STEP = 9;
  }

  ['run']() {
    const b = this.puzzleX / this.STEP,
          e = this.DURATION / this.STEP;
    const f = [this.x - parseInt(Math.random() * 6, 10), this.y + parseInt(Math.random() * 11, 10), this.t];
    this.pos.unshift(f), this.stepPos(b, e), this.fixPos();
    const g = parseInt(60 + Math.random() * 100, 10);
    const h = this.pos.length - 1,
          i = [this.pos[h][0], this.pos[h][1], this.pos[h][2] + g];
    return this.pos.push(i), this.pos;
  }

  ['stepPos'](b, e) {
    let g = 0;
    const h = Math.sqrt(2);

    for (let j = 1; j <= this.STEP; j++) {
      g += 1 / j;
    }

    for (let l = 0; l < this.STEP; l++) {
      b = this.puzzleX / (g * (l + 1));
      const m = parseInt(Math.random() * 30 - 15 + b, 10),
            o = parseInt(Math.random() * 7 - 3, 10),
            p = parseInt((Math.random() * 0.4 + 0.8) * e, 10),
            q = {};
      q.x = m, q.y = o, q.duration = p, this.moveToAndCollect(q);
    }
  }

  ['fixPos']() {
    const b = this.pos[this.pos.length - 1][0] - this.pos[1][0],
          e = this.puzzleX - b;
    Math.abs(e) > 4 && this.moveToAndCollect({
      'x': e,
      'y': parseInt(Math.random() * 8 - 3, 10),
      'duration': 0xfa
    });
  }

  ['moveToAndCollect']({
    x: a,
    y: b,
    duration: e
  }) {
    let g = 0,
        h = 0,
        i = 0;
    const j = e / this.minDuration;
    let k = a / j,
        l = b / j;
    let m = 0;
    Math.abs(k) < 1 && (m = e / Math.abs(a) - this.minDuration, k = 1, l = b / Math.abs(a));

    while (Math.abs(g) < Math.abs(a)) {
      const p = parseInt(m + Math.random() * 16 - 4, 10);
      g += k + Math.random() * 2 - 1, h += l, i += this.minDuration + p;
      const q = parseInt(this.x + g, 10),
            r = parseInt(this.y + h, 10),
            s = this.t + i;
      this.pos.push([q, r, s]);
    }

    this.x += a, this.y += b;
    this.t += Math.max(e, i);
  }

}

function bO(g) {
  if (g === '3.1') {
    var i = '',
        j = '0123456789',
        k = '0123456789',
        l = Math.floor(Math.random() * 10),
        m,
        n = 12;

    do {
      const t = {
        'size': 0x1,
        'num': '0123456789'
      };
      m = bP(t), i.indexOf(m) == -1 && (i += m);
    } while (i.length < 3);

    for (let u of i.slice()) {
      k = k.replace(u, '');
    }

    const r = {};
    r.size = l, r.num = k;
    var o = bP(r) + i + bP({
      'size': 12 - l,
      'num': k
    }) + l,
        p = o.split(''),
        q = [];

    for (; p.length;) {
      q.push(9 - parseInt(p.pop()));
    }

    o = q.join('');
  } else {
    var n = 12,
        i = '',
        j = '0123456789',
        k = '0123456789',
        l = Math.floor(Math.random() * 10),
        m;

    do {
      const A = {
        'size': 0x1,
        'num': '0123456789'
      };
      m = bP(A), i.indexOf(m) == -1 && (i += m);
    } while (i.length < 3);

    for (let B of i.slice()) {
      k = k.replace(B, '');
    }

    const z = {};
    z.size = l, z.num = k;
    var o = bP(z) + i + bP({
      'size': 12 - l,
      'num': k
    }) + l;
  }

  return o;
}

function bP() {
  var f,
      g = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
      h = g.size,
      i = 'undefined' === h ? 10 : h,
      l = g.num,
      m = '';
  if (l && 'string' == typeof l) f = l;

  for (; i--;) m += f[Math.floor(Math.random() * f.length)];

  return m;
}

function bQ() {
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
    if (new RegExp('('.concat(m, ')')).test(k)) {
      var o = 'S+' === m ? '000' : '00';
      k = k.replace(RegExp.$1, 1 == RegExp.$1.length ? l[m] : ''.concat(o).concat(l[m]).substr(''.concat(l[m]).length));
    }
  }), k;
}

function bR(b = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', e = 0) {
  return b.replace(/[xy]/g, function (h) {
    var i = Math.random() * 10 | 0,
        j = h == 'x' ? i : i & 3 | 8;
    e ? uuid = j.toString(36).toUpperCase() : uuid = j.toString(36);
    return uuid;
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }