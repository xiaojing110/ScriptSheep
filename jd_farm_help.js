/*
东东农场助力
20 2,6 * * * jd_farm_help.js
updatetime:2023/6/14
dlan
变量
epxort FRUIT_DELAY = '1000',设置等待时间(毫秒)，默认请求5次接口等待10秒（1000）
*/
const $ = new Env('东东农场-助力');
let cookiesArr = [], cookie = '', jdFruitShareArr = [], isBox = false, notify, newShareCodes, allMessage = '';
//助力好友分享码(最多3个,否则后面的助力失败),原因:京东农场每人每天只有3次助力机会
//此此内容是IOS用户下载脚本到本地使用，填写互助码的地方，同一京东账号的好友互助码请使用@符号隔开。
//下面给出两个账号的填写示例（iOS只支持2个京东账号）
let shareCodes = [ // 这个列表填入你要助力的好友的shareCode
    ''
]

let message = '', subTitle = '', fulled = [], option = {}, isFruitFinished = false, ct=0;
const retainWater = 100;//保留水滴大于多少g,默认100g;
let jdNotify = false;//是否关闭通知，false打开通知推送，true关闭通知推送
let jdFruitBeanCard = false;//农场使用水滴换豆卡(如果出现限时活动时100g水换20豆,此时比浇水划算,推荐换豆),true表示换豆(不浇水),false表示不换豆(继续浇水),脚本默认是浇水
let randomCount = $.isNode() ? 20 : 5;
const _0x109498 = require("fs"),
      _0xe1c11 = "https://api.m.jd.com/client.action",
      _0x186cf6 = process.env.FRUIT_DELAY || 10000,
      _0x10652e = require("./function/dylany");

$.reqnum = 1;

async function _0x52b637() {
  subTitle = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

  try {
    await _0x35fba1("", 1);

    if ($.farmInfo.farmUserPro) {
      await _0x40b49e();
      await _0x17a56d();
    } else {
      if (JSON.stringify($.farmInfo).includes("winTexts")) {
        console.log("初始化农场数据异常, 请确认此账号是否开通农场");
        message = "【数据异常】请确认此账号是否开通农场";
      } else {
        console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo));
        message = "【数据异常】请手动登录京东app查看此账号" + $.name + "是否正常";
      }
    }
  } catch (_0x397b38) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️");
    $.logErr(_0x397b38);
  }

  await _0x52b78f();
}

async function _0x17a56d() {
  await _0x1f8dbc();
  await _0x150f0f();
}

async function _0x150f0f() {
  console.log("开始天天抽奖--好友助力--每人每天只有三次助力机会.");

  for (let _0x6dff3 of newShareCodes) {
    if (_0x6dff3 === $.farmInfo.farmUserPro.shareCode) {
      console.log("天天抽奖-不能自己给自己助力\n");
      continue;
    }

    await _0x40f10a(_0x6dff3);
    await $.wait(1000);

    if ($.lotteryMasterHelpRes.helpResult === undefined) {
      break;
    }

    if ($.lotteryMasterHelpRes.helpResult.code === "0") {
      console.log("天天抽奖-助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "成功\n");
    } else {
      if ($.lotteryMasterHelpRes.helpResult.code === "11") {
        console.log("天天抽奖-不要重复助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "\n");
      } else {
        if ($.lotteryMasterHelpRes.helpResult.code === "13") {
          console.log("天天抽奖-助力" + $.lotteryMasterHelpRes.helpResult.masterUserInfo.nickName + "失败,助力次数耗尽\n");
          break;
        }
      }
    }
  }
}

async function _0x40b49e() {
  console.log("开始助力好友");
  let _0x1dbc51 = 0,
      _0x2f188b = 3,
      _0xe23019 = "";

  for (let _0x234b30 of newShareCodes) {
    console.log("去助力: " + _0x234b30);

    if (!_0x234b30) {
      continue;
    }

    if (_0x234b30 === $.farmInfo.farmUserPro.shareCode) {
      console.log("不能为自己助力哦，跳过自己的shareCode\n");
      continue;
    }

    await _0x25972e(_0x234b30);
    await $.wait(1000);

    if ($.helpResult.code === "0") {
      if ($.helpResult.helpResult.code === "0") {
        _0x1dbc51 += $.helpResult.helpResult.salveHelpAddWater;
        console.log("【助力结果】: 助力成功");
        console.log("助力获得" + $.helpResult.helpResult.salveHelpAddWater + "g水滴");
        _0xe23019 += ($.helpResult.helpResult.masterUserInfo.nickName || "匿名用户") + ",";
      } else {
        if ($.helpResult.helpResult.code === "8") {
          console.log("【助力结果】: 助力失败，今天助力次数已耗尽");
        } else {
          if ($.helpResult.helpResult.code === "9") {
            console.log("【助力结果】: 已经助力过TA了");
          } else {
            $.helpResult.helpResult.code === "10" ? (console.log("【助力结果】: 对方已满助力"), fulled.push(_0x234b30)) : console.log("助力其他情况：" + JSON.stringify($.helpResult.helpResult));
          }
        }
      }

      console.log("【助力次数还剩】" + $.helpResult.helpResult.remainTimes + "次\n");
      _0x2f188b = $.helpResult.helpResult.remainTimes;

      if ($.helpResult.helpResult.remainTimes === 0) {
        console.log("您当前助力次数已耗尽，跳出助力");
        break;
      }
    } else {
      console.log("助力失败::" + JSON.stringify($.helpResult));
      break;
    }
  }

  if ($.isLoon() || $.isQuanX() || $.isSurge()) {
    let _0x56cdb4 = _0x297a20() + $.farmInfo.farmUserPro.shareCode;

    !$.getdata(_0x56cdb4) && ($.setdata("", _0x297a20(Date.now() - 86400000) + $.farmInfo.farmUserPro.shareCode), $.setdata("", _0x56cdb4));
    _0xe23019 && ($.getdata(_0x56cdb4) ? $.setdata($.getdata(_0x56cdb4) + "," + _0xe23019, _0x56cdb4) : $.setdata(_0xe23019, _0x56cdb4));
    _0xe23019 = $.getdata(_0x56cdb4);
  }

  _0x1dbc51 > 0 && console.log("【助力好友👬】获得" + _0x1dbc51 + "g💧\n");
  message += "【今日剩余助力👬】" + _0x2f188b + "次\n";
  console.log("助力好友结束，即将开始领取额外水滴奖励\n");
}

async function _0x1f8dbc() {
  await _0xed1f68();

  if ($.friendList) {
    console.log("\n今日已邀请好友" + $.friendList.inviteFriendCount + "个 / 每日邀请上限" + $.friendList.inviteFriendMax + "个");
    await _0xaa2af9();

    if ($.friendList.inviteFriendCount > 0) {
      if ($.friendList.inviteFriendCount > $.friendList.inviteFriendGotAwardCount) {
        console.log("开始领取邀请好友的奖励");
        await _0x45c881();
        console.log("领取邀请好友的奖励结果：：" + JSON.stringify($.awardInviteFriendRes));
      }
    } else {
      console.log("今日未邀请过好友");
    }
  } else {
    console.log("查询好友列表失败\n");
  }
}

async function _0xaa2af9() {
  for (let _0x32cc2e of newShareCodes) {
    if (_0x32cc2e === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }

    if (newShareCodes.findIndex(_0x130126 => _0x130126 === _0x32cc2e) >= 5) {
      break;
    }

    await _0x3dfa91(_0x32cc2e);

    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") {
      console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");
    } else {
      $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
    }
  }
}

async function _0x40f10a() {
  const _0x4f30ff = {
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-3",
    babelChannel: "3",
    version: 24,
    channel: 1
  };
  $.lotteryMasterHelpRes = await _0x35fba1(_0x4f30ff);
}

async function _0x3dfa91() {
  $.inviteFriendRes = await _0x35fba1({
    imageUrl: "",
    nickName: "",
    shareCode: arguments[0] + "-inviteFriend",
    version: 24,
    channel: 2
  });
}

async function _0x25972e() {
  const _0xc93bd5 = {
    sid: "",
    mpin: "",
    shareCode: arguments[0],
    babelChannel: "121",
    version: 24,
    channel: 1,
    lat: "0",
    lng: "0"
  };
  $.helpResult = await _0x35fba1(_0xc93bd5);
}

async function _0x35fba1(_0x2e85a4, _0x1c0aa2) {
  $.reqnum % 5 == 0 && (console.log("\n等待" + _0x186cf6 / 1000 + "秒......\n"), timeout = _0x186cf6);
  $.reqnum++;

  if (ct > "1") {
    return;
  }

  if (!_0x2e85a4) {
    _0x2e85a4 = _0x5c54c3;
  }

  let _0x35f1e0 = {
    appId: "8a2af",
    fn: "initForFarm",
    body: _0x2e85a4,
    apid: "signed_wh5",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  _0x2e85a4 = await _0x10652e.getbody(_0x35f1e0);
  return new Promise(_0x3d4427 => {
    const _0x28da60 = {
      cookie: cookie,
      origin: "https://carry.m.jd.com",
      referer: "https://carry.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x2ec261 = {
      url: "https://api.m.jd.com/client.action?functionId=initForFarm&" + _0x2e85a4,
      headers: _0x28da60,
      timeout: 10000
    };
    const _0x499fca = _0x2ec261;
    $.get(_0x499fca, async (_0x4e9a32, _0x911563, _0x160ef3) => {
      try {
        if (_0x4e9a32) {
          console.log("initForFarm: 请求失败 ‼️‼️");
          console.log(JSON.stringify(_0x4e9a32));
        } else {
          if (_0x16b8ff(_0x160ef3)) {
            _0x160ef3 = JSON.parse(_0x160ef3);

            if (_0x1c0aa2) {
              $.farmInfo = _0x160ef3;

              if ($.farmInfo.code != 0) {
                ct++;
                await _0x35fba1();
                return;
              }

              ct = 0;
            }
          }
        }
      } catch (_0x192fb5) {
        $.logErr(_0x192fb5, _0x911563);
      } finally {
        _0x3d4427(_0x160ef3);
      }
    });
  });
}

async function _0xed1f68() {
  $.friendList = await _0x3bde28("friendListInitForFarm", _0x2c2e8a);
}

async function _0x45c881() {
  $.awardInviteFriendRes = await _0x3bde28("awardInviteFriendForFarm");
}

async function _0x52b78f() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) {
    $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";
  } else {
    if ($.getdata("jdFruitNotify")) {
      $.ctrTemp = $.getdata("jdFruitNotify") === "false";
    } else {
      $.ctrTemp = "" + jdNotify === "false";
    }
  }

  $.ctrTemp ? ($.msg($.name, subTitle, message, option), $.isNode() && (allMessage += subTitle + "\n" + message + ($.index !== cookiesArr.length ? "\n\n" : ""))) : $.log("\n" + message + "\n");
}

function _0x297a20(_0x332adc) {
  let _0x4b2b4f;

  _0x332adc ? _0x4b2b4f = new Date(_0x332adc) : _0x4b2b4f = new Date();
  return _0x4b2b4f.getFullYear() + "-" + (_0x4b2b4f.getMonth() + 1 >= 10 ? _0x4b2b4f.getMonth() + 1 : "0" + (_0x4b2b4f.getMonth() + 1)) + "-" + (_0x4b2b4f.getDate() >= 10 ? _0x4b2b4f.getDate() : "0" + _0x4b2b4f.getDate());
}

function _0x409bd2() {
  return new Promise(async _0x279f2d => {
    newShareCodes = [];

    if ($.shareCodesArr[$.index - 1]) {
      newShareCodes = $.shareCodesArr[$.index - 1].split("@");
    } else {
      const _0x15e536 = $.index > shareCodes.length ? shareCodes.length - 1 : $.index - 1;

      newShareCodes = shareCodes[_0x15e536].split("@");
    }

    newShareCodes = newShareCodes.filter(_0x3fe719 => fulled.indexOf(_0x3fe719) == -1 && !!_0x3fe719);

    let _0x2d70c3 = _0x109498.existsSync("./fruit_helpcode");

    newShareCodes.length === 0 && _0x2d70c3 && ($.log("使用本地缓存\n"), newShareCodes = _0x109498.readFileSync("./fruit_helpcode", "utf-8"), newShareCodes = JSON.parse(newShareCodes));
    console.log("您提供了" + newShareCodes.length + "个农场助力码\n");
    console.log("第" + $.index + "个账号将要助力的好友" + JSON.stringify(newShareCodes));

    _0x279f2d();
  });
}

function _0x41b21c() {
  return new Promise(_0xcd3d3d => {
    console.log("开始获取配置文件\n");
    notify = $.isNode() ? require("./sendNotify") : "";

    const _0x4d7e6b = $.isNode() ? require("./jdCookie.js") : "";

    if ($.isNode()) {
      if (process.env.FRUITSHARECODES) {
        process.env.FRUITSHARECODES.indexOf("\n") > -1 ? shareCodes = process.env.FRUITSHARECODES.split("\n") : shareCodes = process.env.FRUITSHARECODES.split("&");
      }
    }

    if ($.isNode()) {
      Object.keys(_0x4d7e6b).forEach(_0x56c231 => {
        _0x4d7e6b[_0x56c231] && cookiesArr.push(_0x4d7e6b[_0x56c231]);
      });

      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x227172($.getdata("CookiesJD") || "[]").map(_0x53f877 => _0x53f877.cookie)].filter(_0x346983 => !!_0x346983);
    }

    $.shareCodesArr = [];

    if ($.isNode()) {
      Object.keys(shareCodes).forEach(_0x5432ef => {
        shareCodes[_0x5432ef] && $.shareCodesArr.push(shareCodes[_0x5432ef]);
      });
    } else {
      if ($.getdata("jd_fruit_inviter")) {
        $.shareCodesArr = $.getdata("jd_fruit_inviter").split("\n").filter(_0x3e66a5 => !!_0x3e66a5);
      }

      console.log("\nBoxJs设置的" + $.name + "好友邀请码:" + ($.getdata("jd_fruit_inviter") ? $.getdata("jd_fruit_inviter") : "暂无") + "\n");
    }

    _0xcd3d3d();
  });
}

function _0x59835a() {
  return new Promise(_0x277ead => {
    const _0xf451bc = {
      Cookie: cookie,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x231223 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0xf451bc,
      timeout: 10000
    };
    const _0x441b73 = _0x231223;
    $.get(_0x441b73, (_0x11a957, _0x4279d4, _0x20f325) => {
      try {
        if (_0x20f325) {
          _0x20f325 = JSON.parse(_0x20f325);

          if (!(_0x20f325.islogin === "1")) {
            _0x20f325.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x52daf) {
        console.log(_0x52daf);
      } finally {
        _0x277ead();
      }
    });
  });
}

function _0x3bde28(_0x348f82, _0x328783 = {}, _0xf6afcf = 1000) {
  $.reqnum % 5 == 0 && (console.log("\n等待" + _0x186cf6 / 1000 + "秒......\n"), _0xf6afcf = _0x186cf6);
  $.reqnum++;
  return new Promise(_0x27651f => {
    setTimeout(() => {
      $.get(_0xe3b0d1(_0x348f82, _0x328783), (_0x292968, _0x487d52, _0xfbfd2b) => {
        try {
          if (_0x292968) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(_0x292968));
            console.log("function_id:" + _0x348f82);
            $.logErr(_0x292968);
          } else {
            if (_0x16b8ff(_0xfbfd2b)) {
              _0xfbfd2b = JSON.parse(_0xfbfd2b);
            }
          }
        } catch (_0xd611f8) {
          $.logErr(_0xd611f8, _0x487d52);
        } finally {
          _0x27651f(_0xfbfd2b);
        }
      });
    }, _0xf6afcf);
  });
}

function _0x16b8ff(_0x4b81da) {
  try {
    if (typeof JSON.parse(_0x4b81da) == "object") {
      return true;
    }
  } catch (_0xf1f5f8) {
    console.log(_0xf1f5f8);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function _0xe3b0d1(_0x172b4c, _0x6768dc = {}) {
  const _0x175a5b = {
    "Host": "api.m.jd.com",
    "Accept": "*/*",
    "Origin": "https://carry.m.jd.com",
    "Accept-Encoding": "gzip, deflate, br",
    "User-Agent": $.UA,
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "Referer": "https://carry.m.jd.com/",
    "Cookie": cookie
  };
  return {
    url: _0xe1c11 + "?functionId=" + _0x172b4c + "&body=" + encodeURIComponent(JSON.stringify(_0x6768dc)) + "&appid=wh5",
    headers: _0x175a5b,
    timeout: 10000
  };
}

function _0x227172(_0x59d2b7) {
  if (typeof _0x59d2b7 == "string") {
    try {
      return JSON.parse(_0x59d2b7);
    } catch (_0x3d8d34) {
      console.log(_0x3d8d34);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }