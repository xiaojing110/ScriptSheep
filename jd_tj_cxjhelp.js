/*
#特价版-幸运抽奖

入口：特价版APP  首页 幸运抽奖  大概率现金

需要定义环境变量 krlxjcode 指定助力码  多个@隔开

[task_local]
#特价版-幸运抽奖
11 11 11 11 * jd_tj_cxjhelp.js, tag=特价版-幸运抽奖, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/

const $ = new Env("特价版-幸运抽奖");
const _0x1b8bc2 = $.isNode() ? require("./sendNotify") : "",
      _0x47e84f = $.isNode() ? require("./jdCookie") : "",
      _0x15cb59 = require("./function/h5st41.js"),
      _0x227b9d = require("crypto-js"),
      _0x1ea476 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/";

let _0xfe4323 = [],
    _0x23a926 = "",
    _0x4822d1,
    _0x39a1fe = false,
    _0x39f03c = [],
    _0x232842,
    _0x1decc2 = {};

$.krtyhot = false;
let _0x3dadaf = "Wvzc_VpNTlSkiQdHT8r7QA";

if ($.isNode()) {
  Object.keys(_0x47e84f).forEach(_0x5c3508 => {
    _0xfe4323.push(_0x47e84f[_0x5c3508]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0xfe4323 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x26f604($.getdata("CookiesJD") || "[]").map(_0x40a321 => _0x40a321.cookie)].filter(_0x16bd8b => !!_0x16bd8b);

!(async () => {
  if (!_0xfe4323[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  process.env.krlxjcode && (_0x39f03c = process.env.krlxjcode, krinviter = _0x39f03c.split("@"));
//   authorCodeList = await _0x5893ca("http://code.kingran.cf/yqlxj.json");
  $.authorCode = [];
  $.shareId = $.authorCode;

  if (_0x39f03c.length == 0) {
    console.log("未设置助力码变量，变量：export krlxjcode=\"\"，本次运行不会助力，仅获取助力码");
    _0x39a1fe = true;
  }

  for (let _0x2f4559 = 0; _0x2f4559 < _0xfe4323.length; _0x2f4559++) {
    if (_0xfe4323[_0x2f4559]) {
      _0x23a926 = _0xfe4323[_0x2f4559];
      $.UserName = decodeURIComponent(_0x23a926.match(/pt_pin=([^; ]+)(?=;?)/) && _0x23a926.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2f4559 + 1;
      $.isLogin = true;
      $.nickName = "";
      _0x4822d1 = "";
      _0x232842 = "jdpingou;iPhone;4.13.0;14.4.2;" + _0x3ee29e(40) + ";network/wifi;model/iPhone10,2;appBuild/100609;supportApplePay/1;hasUPPay/0;pushNoticeIsOpen/1;hasOCPay/0;supportBestPay/0;session/" + (Math.random * 98 + 1) + ";pap/JA2019_3111789;brand/apple;supportJDSHWK/1;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148";
      _0x1decc2[$.UserName] = _0x232842;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x1b8bc2.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      _0x543897();

      await _0x1d0204();
      await $.wait(3000);
      if (!_0x39f03c[0] && !_0x39a1fe) break;
      if ($.krtyhot) break;
    }
  }

  console.log("\n开始领取任务奖励...");

  for (let _0x152ffc = 0; _0x152ffc < _0xfe4323.length; _0x152ffc++) {
    if (_0xfe4323[_0x152ffc]) {
      _0x23a926 = _0xfe4323[_0x152ffc];
      $.UserName = decodeURIComponent(_0x23a926.match(/pt_pin=([^; ]+)(?=;?)/) && _0x23a926.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x152ffc + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      await _0xa4202d();
      await $.wait(1000);
      console.log("抽奖次数：" + $.drawPrizeNum);
      if ($.drawPrizeNum > 0) for (m = 1; $.drawPrizeNum--; m++) {
        console.log("进行第" + m + "次APP抽奖");
        await _0x1fda37();
        await $.wait(parseInt(Math.random() * 2000 + 6000, 10));

        if (m >= 10) {
          console.log("抽奖太多次，多余的次数请再执行脚本");
          break;
        }
      }
      await _0x4619c6();
      await $.wait(500);
    }
  }
})().catch(_0x2a6517 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2a6517 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x1d0204() {
  _0x39f03c.length == 0 ? (await _0xa4202d(), await $.wait(parseInt(Math.random() * 2000 + 2000, 10))) : ($.index == 1 && (console.log("CK1默认去助力作者"), await _0xcc33b0(), await $.wait(parseInt(Math.random() * 2000 + 2000, 10))), $.index != 1 && (await _0x409c87(krinviter), await $.wait(parseInt(Math.random() * 2000 + 2000, 10))));
}

function _0x3ee29e(_0x362130, _0x1e7a90 = "qwertyuiopasdfghjklzxcvbnm") {
  let _0x4b4c29 = "";

  for (let _0x3ba9a5 = 0; _0x3ba9a5 < _0x362130; _0x3ba9a5++) {
    _0x4b4c29 += _0x1e7a90[Math.floor(Math.random() * _0x1e7a90.length)];
  }

  return _0x4b4c29;
}

function _0xc64c80(_0x1ba5c1, _0x39f705 = {}) {
  let _0xcbf9d3 = [],
      _0x26e0f8 = _0x39f705.connector || "&",
      _0x7a4d7c = Object.keys(_0x1ba5c1);

  if (_0x39f705.sort) _0x7a4d7c = _0x7a4d7c.sort();

  for (let _0x445edd of _0x7a4d7c) {
    let _0x4691e1 = _0x1ba5c1[_0x445edd];
    if (_0x4691e1 && typeof _0x4691e1 === "object") _0x4691e1 = JSON.stringify(_0x4691e1);
    if (_0x4691e1 && _0x39f705.encode) _0x4691e1 = encodeURIComponent(_0x4691e1);

    _0xcbf9d3.push(_0x445edd + "=" + _0x4691e1);
  }

  return _0xcbf9d3.join(_0x26e0f8);
}

function _0x26f777(_0x16e803) {
  return _0x16e803[Math.floor(Math.random() * _0x16e803.length)];
}

function _0x29be00(_0x482967 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", _0x47edcd = "0123456789abcdef") {
  let _0xcdd364 = "";

  for (let _0x38c92a of _0x482967) {
    if (_0x38c92a == "x") _0xcdd364 += _0x47edcd.charAt(Math.floor(Math.random() * _0x47edcd.length));else _0x38c92a == "X" ? _0xcdd364 += _0x47edcd.charAt(Math.floor(Math.random() * _0x47edcd.length)).toUpperCase() : _0xcdd364 += _0x38c92a;
  }

  return _0xcdd364;
}

function _0x5889be(_0x1e9f27) {
  _0x1e9f27 = _0x1e9f27.replace(/rn/g, "n");
  var _0x1487e4 = "";

  for (var _0x255507 = 0; _0x255507 < _0x1e9f27.length; _0x255507++) {
    var _0x21aaf1 = _0x1e9f27.charCodeAt(_0x255507);

    if (_0x21aaf1 < 128) _0x1487e4 += String.fromCharCode(_0x21aaf1);else _0x21aaf1 > 127 && _0x21aaf1 < 2048 ? (_0x1487e4 += String.fromCharCode(_0x21aaf1 >> 6 | 192), _0x1487e4 += String.fromCharCode(_0x21aaf1 & 63 | 128)) : (_0x1487e4 += String.fromCharCode(_0x21aaf1 >> 12 | 224), _0x1487e4 += String.fromCharCode(_0x21aaf1 >> 6 & 63 | 128), _0x1487e4 += String.fromCharCode(_0x21aaf1 & 63 | 128));
  }

  return _0x1487e4;
}

function _0xbc8d4(_0x3187a8, _0x2be659) {
  _0x2be659 = _0x2be659 || _0x1ea476;
  var _0x423fad = "";

  var _0x145b95, _0x5672ed, _0x3f8dd0, _0x1bf5f5, _0x4a4625, _0x39648a, _0x538ba0;

  var _0x2d6659 = 0;
  _0x3187a8 = _0x5889be(_0x3187a8);

  while (_0x2d6659 < _0x3187a8.length) {
    _0x145b95 = _0x3187a8.charCodeAt(_0x2d6659++);
    _0x5672ed = _0x3187a8.charCodeAt(_0x2d6659++);
    _0x3f8dd0 = _0x3187a8.charCodeAt(_0x2d6659++);
    _0x1bf5f5 = _0x145b95 >> 2;
    _0x4a4625 = (_0x145b95 & 3) << 4 | _0x5672ed >> 4;
    _0x39648a = (_0x5672ed & 15) << 2 | _0x3f8dd0 >> 6;
    _0x538ba0 = _0x3f8dd0 & 63;
    if (isNaN(_0x5672ed)) _0x39648a = _0x538ba0 = 64;else isNaN(_0x3f8dd0) && (_0x538ba0 = 64);
    _0x423fad = _0x423fad + _0x2be659.charAt(_0x1bf5f5) + _0x2be659.charAt(_0x4a4625) + _0x2be659.charAt(_0x39648a) + _0x2be659.charAt(_0x538ba0);
  }

  while (_0x423fad.length % 4 > 1) _0x423fad += "=";

  return _0x423fad;
}

function _0x2dea77(_0x5aed74 = {}) {
  let _0x39b605 = {
    "ciphertype": 5,
    "cipher": {
      "ud": _0xbc8d4(_0x227b9d.SHA1($.UserName).toString()),
      "sv": _0xbc8d4($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(_0x39b605);
}

function _0x543897(_0x1928c5, _0x58827d = {}) {
  const _0xfaf50 = {
    "jd": {
      "app": "jdapp",
      "appBuild": "168392",
      "client": "android",
      "clientVersion": "10.1.0"
    },
    "lite": {
      "app": "jdltapp",
      "appBuild": "1247",
      "client": "ios",
      "clientVersion": "6.0.0"
    }
  },
        _0x3ba190 = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = _0x26f777(_0x3ba190);

  let _0x1bf46a = _0x1928c5 || "jd",
      _0x4bfa1c = _0x58827d?.["ep"] ? _0x58827d?.["ep"] : true;

  if (!_0xfaf50[_0x1bf46a]) {
    console.log("获取[" + _0x1bf46a + "]UA失败");
    return;
  }

  $.client = _0x58827d?.["client"] ? _0x58827d?.["client"] : _0xfaf50[_0x1bf46a].client;
  $.clientVersion = _0x58827d?.["clientVersion"] ? _0x58827d?.["clientVersion"] : _0xfaf50[_0x1bf46a].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let _0x1c95cc = "android";
  $.client == "apple" && (_0x1c95cc = "iPhone");

  _0x2dea77();

  let _0xd2e58f = [_0xfaf50[_0x1bf46a].app, _0x1c95cc, $.clientVersion, "", "rn/" + _0x29be00(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + _0xfaf50[_0x1bf46a].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", _0x4bfa1c ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = _0xd2e58f.join(";");
}

async function _0x1fda37() {
  return new Promise(async _0x224e30 => {
    let _0x2239ce = {
      "ts": Date.now(),
      "ridx": -1,
      "hdid": _0x3ee29e(43) + "=",
      "cipher": {},
      "appname": "wegame",
      "version": "1.0.0",
      "ciphertype": 5
    };

    const _0xe0aa32 = {
      "functionId": "inviteFissionDrawPrize",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": _0x3dadaf,
        "lbs": JSON.stringify(_0x2239ce)
      }
    },
          _0x1acb64 = await _0x3ea88b("c02c6", _0xe0aa32);

    let _0x428758 = {
      "url": "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + _0x1acb64,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926
      },
      "timeout": 30 * 1000
    };
    $.get(_0x428758, async (_0x21ad69, _0xf3c178, _0x211c8d) => {
      try {
        if (_0x21ad69) console.log("" + JSON.stringify(_0x21ad69));else {
          _0x211c8d = JSON.parse(_0x211c8d);

          if (_0x211c8d) {
            if (_0x211c8d.code == 0 && _0x211c8d.success == true) {
              if (_0x211c8d.data) {
                if (_0x211c8d.data.prizeType == 4) console.log("抽中现金：" + _0x211c8d.data.prizeValue);else {
                  if (_0x211c8d.data.prizeType == 2) console.log("抽中红包：" + _0x211c8d.data.prizeValue);else {
                    if (_0x211c8d.data.prizeType == 1) console.log("抽中垃圾卷");else {
                      console.log(JSON.stringify(_0x211c8d.data));
                    }
                  }
                }
              }
            } else {
              if (_0x211c8d.code == 2000 && _0x211c8d.msg == "活动火爆") {
                console.log("不多说了，乌漆嘛黑");
              } else console.log(_0x211c8d.errMsg);
            }
          }
        }
      } catch (_0x18f914) {
        $.logErr(_0x18f914, _0xf3c178);
      } finally {
        _0x224e30();
      }
    });
  });
}

async function _0x409c87(_0x1dbba1) {
  return new Promise(async _0x197ad6 => {
    const _0x3747f5 = {
      "functionId": "inviteFissionBeforeHome",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": _0x3dadaf,
        "isJdApp": true,
        "inviter": _0x1dbba1
      }
    },
          _0x4a7ac6 = await _0x3ea88b("02f8d", _0x3747f5);

    let _0x3f134e = {
      "url": "https://api.m.jd.com/api?" + _0x4a7ac6,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926,
        "x-rp-client": "h5_1.0.0",
        "accept": "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x3f134e, async (_0x1b694d, _0x452f65, _0x4eec93) => {
      try {
        if (_0x1b694d) console.log("" + JSON.stringify(_0x1b694d));else {
          _0x4eec93 = JSON.parse(_0x4eec93);

          if (_0x4eec93) {
            console.log("");
            console.log("去助力 → " + _0x1dbba1);

            if (_0x4eec93.code == 0 && _0x4eec93.success == true) {
              console.log("当前助力：" + _0x4eec93.data.nickName);

              if (_0x4eec93.data.helpResult == 1) {
                console.log("✅ 助力成功");
              } else {
                if (_0x4eec93.data.helpResult != 1) {
                  switch (_0x4eec93.data.helpResult) {
                    case 2:
                      console.log("❌ 活动火爆");
                      break;

                    case 3:
                      console.log("❌ 没有助力次数");
                      break;

                    case 6:
                      console.log("❌ 已助力过了");
                      break;

                    default:
                      console.log("❌ 失败");
                      break;
                  }
                }
              }
            } else console.log(_0x4eec93.errMsg);
          }
        }
      } catch (_0x1e763a) {
        $.logErr(_0x1e763a, _0x452f65);
      } finally {
        _0x197ad6();
      }
    });
  });
}

async function _0xcc33b0() {
  return new Promise(async _0x5cbc48 => {
    const _0x1b5106 = {
      "functionId": "inviteFissionBeforeHome",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": _0x3dadaf,
        "isJdApp": true,
        "inviter": $.shareId
      }
    },
          _0x51aced = await _0x3ea88b("02f8d", _0x1b5106);

    let _0x4234b5 = {
      "url": "https://api.m.jd.com/api?" + _0x51aced,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926,
        "x-rp-client": "h5_1.0.0",
        "accept": "application/json, text/plain, */*",
        "content-type": "application/x-www-form-urlencoded"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x4234b5, async (_0x28dc92, _0x180d04, _0x4dfc72) => {
      try {
        if (_0x28dc92) console.log("" + JSON.stringify(_0x28dc92));else {
          _0x4dfc72 = JSON.parse(_0x4dfc72);

          if (_0x4dfc72) {
            if (_0x4dfc72.code == 0 && _0x4dfc72.success == true) {
              if (_0x4dfc72.data.helpResult == 1) {
                console.log("✅ 助力成功");
              } else switch (_0x4dfc72.data.helpResult) {
                case 2:
                  console.log("❌ 活动火爆");
                  break;

                case 3:
                  console.log("❌ 没有助力次数");
                  break;

                case 6:
                  console.log("❌ 已助力过了");
                  break;

                default:
                  console.log("❌ 失败");
                  break;
              }
            } else {
              console.log(_0x4dfc72.errMsg);
            }
          }
        }
      } catch (_0x519d69) {
        $.logErr(_0x519d69, _0x180d04);
      } finally {
        _0x5cbc48();
      }
    });
  });
}

async function _0xa4202d() {
  return new Promise(async _0x633fe1 => {
    const _0x235d4b = {
      "functionId": "inviteFissionHome",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": _0x3dadaf,
        "inviter": ""
      }
    },
          _0x2e9933 = await _0x3ea88b("eb67b", _0x235d4b);

    let _0x54b1bf = {
      "url": "https://api.m.jd.com/?functionId=inviteFissionHome&" + _0x2e9933,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926
      },
      "timeout": 30 * 1000
    };
    $.post(_0x54b1bf, async (_0x1bf898, _0x57cb13, _0x271e01) => {
      try {
        if (_0x1bf898) console.log("" + JSON.stringify(_0x1bf898));else {
          _0x271e01 = JSON.parse(_0x271e01);

          if (_0x271e01) {
            if (_0x271e01.code == 0 && _0x271e01.success == true) {
              $.drawPrizeNum = _0x271e01.data.prizeNum || 0;

              let _0x1bc9c5 = _0x271e01.data.inviter || "";

              console.log("【助力码】" + _0x1bc9c5 + "\n【抽奖次数】" + $.drawPrizeNum);
            } else _0x271e01.code == 2000 && _0x271e01.errMsg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(_0x271e01.errMsg);
          }
        }
      } catch (_0x5d5b00) {
        $.logErr(_0x5d5b00, _0x57cb13);
      } finally {
        _0x633fe1();
      }
    });
  });
}

async function _0x4619c6() {
  return new Promise(async _0x34439b => {
    const _0x265e4b = {
      "functionId": "superRedBagList",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": _0x3dadaf,
        "pageNum": 1,
        "pageSize": 100,
        "business": "fission"
      }
    },
          _0x13f3d4 = await _0x3ea88b("f2b1d", _0x265e4b);

    let _0x5b9fd5 = {
      "url": "https://api.m.jd.com/?" + _0x13f3d4,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926
      },
      "timeout": 30 * 1000
    };
    $.get(_0x5b9fd5, async (_0xec2754, _0x55230e, _0x5e5f87) => {
      try {
        if (_0xec2754) console.log("" + JSON.stringify(_0xec2754));else {
          _0x5e5f87 = JSON.parse(_0x5e5f87);

          if (_0x5e5f87) {
            if (_0x5e5f87.code == 0 && _0x5e5f87.success == true) {
              const _0x4277a5 = (_0x5e5f87.data.items || []).filter(_0x3711e7 => _0x3711e7.prizeType === 4 && _0x3711e7.state === 0);

              for (let _0x44d016 of _0x4277a5) {
                console.log("特价版-幸运抽奖提现，去提现" + _0x44d016.amount + "现金");
                await _0xc1572(_0x44d016.id, _0x44d016.poolBaseId, _0x44d016.prizeGroupId, _0x44d016.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
              }
            } else console.log("特价版-幸运抽奖查询奖品：异常:" + JSON.stringify(_0x5e5f87));
          }
        }
      } catch (_0x4b2161) {
        $.logErr(_0x4b2161, _0x55230e);
      } finally {
        _0x34439b();
      }
    });
  });
}

function _0xc1572(_0x125e01, _0x1e9a73, _0x2fe2a8, _0x102fe7) {
  return new Promise(_0x1aa4b3 => {
    const _0x3fd4b8 = {
      "linkId": _0x3dadaf,
      "businessSource": "NONE",
      "base": {
        "prizeType": 4,
        "business": "fission",
        "id": _0x125e01,
        "poolBaseId": _0x1e9a73,
        "prizeGroupId": _0x2fe2a8,
        "prizeBaseId": _0x102fe7
      }
    },
          _0x397a4d = {
      "url": "https://api.m.jd.com",
      "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(_0x3fd4b8)) + "&_t=" + +new Date() + "&appid=activities_platform",
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": _0x23a926
      },
      "timeout": 30 * 1000
    };
    $.post(_0x397a4d, async (_0x4350c9, _0x1ddbfd, _0x21b093) => {
      try {
        if (_0x4350c9) {
          console.log("" + JSON.stringify(_0x4350c9));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (_0x381410(_0x21b093)) {
            _0x21b093 = $.toObj(_0x21b093);

            if (_0x21b093.code === 0) {
              if (_0x21b093.data.status === "310") {
                console.log("提现现金成功！");
              } else console.log("提现现金：失败:" + JSON.stringify(_0x21b093.data.message));
            } else console.log("提现现金：异常:" + JSON.stringify(_0x21b093));
          }
        }
      } catch (_0x554eb7) {
        $.logErr(_0x554eb7, _0x1ddbfd);
      } finally {
        _0x1aa4b3(_0x21b093);
      }
    });
  });
}

function _0x2d1d72(_0x4b1bc2) {
  return _0x4b1bc2.then(_0x534177 => {
    return [null, _0x534177];
  }).catch(_0x5b542b => [_0x5b542b]);
}

async function _0x3ea88b(_0x3d2629, _0x38e5e0) {
  try {
    let _0x2319b3 = new _0x15cb59({
      "appId": _0x3d2629,
      "appid": "activities_platform",
      "clientVersion": _0x38e5e0?.["clientVersion"],
      "client": _0x38e5e0?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });

    return await _0x2319b3.genAlgo(), body = await _0x2319b3.genUrlParams(_0x38e5e0.functionId, _0x38e5e0.body), body;
  } catch (_0x3fdba4) {}
}

function _0x3ee29e(_0x4a8526) {
  _0x4a8526 = _0x4a8526 || 32;
  let _0x2d1c34 = "0123456789abcdef",
      _0x34988a = _0x2d1c34.length,
      _0x5a7afc = "";

  for (let _0x12443e = 0; _0x12443e < _0x4a8526; _0x12443e++) _0x5a7afc += _0x2d1c34.charAt(Math.floor(Math.random() * _0x34988a));

  return _0x5a7afc;
}

function _0x26f604(_0x3c370f) {
  if (typeof _0x3c370f == "string") try {
    return JSON.parse(_0x3c370f);
  } catch (_0x5556ba) {
    return console.log(_0x5556ba), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function _0x5893ca(_0x1add80) {
  return new Promise(_0x300b53 => {
    const _0x54dce8 = {
      "url": _0x1add80 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x54dce8, async (_0xe1c84, _0x330e1f, _0x333520) => {
      try {
        if (_0xe1c84) $.getAuthorCodeListerr = false;else {
          if (_0x333520) _0x333520 = JSON.parse(_0x333520);
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x3c99e4) {
        $.logErr(_0x3c99e4, _0x330e1f);
        _0x333520 = null;
      } finally {
        _0x300b53(_0x333520);
      }
    });
  });
}

function _0x387d22(_0x23aa1c, _0x525ebc) {
  return Math.floor(Math.random() * (_0x525ebc - _0x23aa1c)) + _0x23aa1c;
}

function _0x381410(_0x1fea5c) {
  try {
    if (typeof JSON.parse(_0x1fea5c) == "object") return true;
  } catch (_0x4a63cf) {
    return console.log(_0x4a63cf), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

// prettier-ignore
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({ url: t }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: { script_text: t, mock_type: "cron", timeout: r },
                    headers: { "X-Key": o, Accept: "*/*" }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => {
                const { message: s, response: i } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
                const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                e(null, { status: s, statusCode: i, headers: r, body: o }, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(t => {
                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                    e(null, { status: s, statusCode: i, headers: r, body: o }, o)
                }, t => {
                    const { message: s, response: i } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
