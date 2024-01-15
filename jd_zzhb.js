/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头(只能1个)，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true' 
updatetime:2023/11/16
 */

const $ = new Env('Jd转赚红包');
const _0x4b124 = $.isNode() ? require("./sendNotify") : "",
      _0x15ace5 = $.isNode() ? require("./jdCookie.js") : "",
      _0xb94598 = require("./function/dylano"),
      _0x2a1d71 = require("./USER_AGENTS");

let _0x288f5f = true,
    _0x312daa = [],
    _0x135d9e = [],
    _0x1c9f07 = [],
    _0x3cfd43 = [],
    _0x5b3e5e,
    _0x247044 = [],
    _0x1d83ec = "",
    _0x2a6da9 = "",
    _0x1524ed = "",
    _0x1c0234 = "",
    _0x270d38;

const _0x42567a = process.env.JDZHBNUM || "9999",
      _0x5b0c9c = process.env.JDZHBLTNUM || "-1",
      _0x3f412e = process.env.JDZHBDELAY || "1",
      _0x4c0ac9 = process.env.TXDELAY || "5",
      _0x34f70d = process.env.TXIVAL || "1",
      _0x23c5cb = process.env.JDZHBTORED || false,
      _0x534d02 = process.env.JDZHBTOPPIN || "",
      _0x3f0e17 = process.env.TXSILENT || false,
      _0x496d35 = process.env.ZZHBCODE || "",
      _0x5ddd00 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) try {
  require("https-proxy-agent");

  _0x5b3e5e = require("./function/proxy.js");
  $.dget = _0x5b3e5e.intoRequest($.get.bind($));
  $.dpost = _0x5b3e5e.intoRequest($.post.bind($));
} catch {
  $.log("未安装https-proxy-agent依赖，无法启用代理");
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
  Object.keys(_0x15ace5).forEach(_0x23c53c => {
    _0x247044.push(_0x15ace5[_0x23c53c]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x247044 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1f2e8e($.getdata("CookiesJD") || "[]").map(_0x17856a => _0x17856a.cookie)].filter(_0x34c817 => !!_0x34c817);

!(async () => {
  if (!_0x247044[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n❗❗❗每天1次助力次数，个别没次数可能被jd吃币❗❗❗");
  $.log("\n当前版本：2023110");
  console.log("执行流程，车头开团--助力--抽奖--提现");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  指定PIN车头，不指定默认CK1  JDZHBTOPPIN='jdpin'\n  指定助力CODE，都去助力TA  ZZHBCODE='xxx'\n  多少助力停止，默认9999个  JDZHBNUM='100'\n  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='3'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");

  let _0x4d730e = [];

  if (_0x534d02) {
    console.log("\n已指定PIN：" + _0x534d02);

    let _0xfc4680 = _0x247044.findIndex(_0x39806c => _0x39806c.includes(_0x534d02));

    if (_0xfc4680 == -1) {
      console.log("运行的CK中没找到指定的PIN，停止执行");
      return;
    }

    _0x2a6da9 = _0x247044[_0xfc4680];
  } else console.log("\n未指定PIN默认CK1车头"), _0x2a6da9 = _0x247044[0];

  _0x1d83ec = _0x2a6da9;
  $.UserName = decodeURIComponent(_0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.UA = _0x2a1d71.UARAM ? _0x2a1d71.UARAM() : _0x2a1d71.USER_AGENT;
  console.log("\n————————————————————车头开团————————————————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0x31d13d();

  if (!$.isLogin) {
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    $.isNode() && (await _0x4b124.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }

  await _0x34b852(1);
  await $.wait(1000);

  if (_0x4d730e.length != 0) {
    let _0x1ce911 = _0x4d730e[Math.floor(Math.random() * _0x4d730e.length)];

    console.log("车头去助力 -> 作者");
    $.UserName = decodeURIComponent(_0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x2a1d71.UARAM ? _0x2a1d71.UARAM() : _0x2a1d71.USER_AGENT;
    await _0x174906(_0x1ce911);
    await $.wait(2000);
  }

  console.log("————————————————————————————————————————————————————");
  console.log("\n\n———————————————————开始助力车头—————————————————————");

  if (_0x496d35) {
    console.log("\n已指定助力CODE,那抛弃车头去助力TA");
    _0x312daa = [];

    _0x312daa.push(_0x496d35);
  }

  _0x270d38 = 0;

  for (let _0x422934 of _0x312daa) {
    if (_0x247044.length === 1) {
      console.log("");
      break;
    }

    console.log("\n去助力-> " + _0x422934);
    $.suc = 0;

    for (let _0x2af02a = _0x270d38; _0x2af02a < _0x247044.length; _0x2af02a++) {
      if (_0x247044[_0x2af02a]) {
        _0x1d83ec = _0x247044[_0x2af02a];
        $.UserName = decodeURIComponent(_0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x2af02a + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0x2a1d71.UARAM ? _0x2a1d71.UARAM() : _0x2a1d71.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x174906(_0x422934);

        if ($.suc > Number(_0x42567a) + 1) {
          $.log("已达目标助力数，跳出！");
          _0x270d38 = _0x2af02a + 1;
          break;
        }

        await $.wait(1000);
      }
    }

    if ($.index === _0x247044.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
  _0x5b0c9c > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x5b0c9c);

  let _0x1046e8 = new Date();

  _0x1046e8.setDate(_0x1046e8.getDate() - _0x34f70d);

  _0x1d83ec = _0x2a6da9;
  $.UserName = decodeURIComponent(_0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1d83ec.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.fail = 0;
  _0x135d9e = [];
  _0x1c9f07 = [];
  txjscore = [];
  $.txj = true;
  $.fg = 1;
  $.txfull = false;
  $.nocashnum = 0;
  $.end = false;
  $.hotflag = false;
  $.toredfailnum = 0;
  $.txjsuc = false;
  $.UA = _0x2a1d71.UARAM ? _0x2a1d71.UARAM() : _0x2a1d71.USER_AGENT;

  let _0x27f72a = await _0x34b852(0);

  await $.wait(1000);
  if (_0x27f72a.code != "0") return;
  $.log("本轮已抽奖次数：" + _0x27f72a.data.drawPrizeNum);
  $.log("本轮剩余抽奖次数：" + $.times);

  if (_0x27f72a.data.cashVo) {
    if (_0x27f72a.data?.["cashVo"]?.["state"] === 1) $.log("本轮提现金进度：" + _0x27f72a.data.cashVo.amount + "/" + _0x27f72a.data.cashVo.totalAmount + "(-" + _0x27f72a.data.cashVo.leftAmount + ")");else _0x27f72a.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x27f72a.data.cashVo.amount + "/" + _0x27f72a.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
  } else $.txj = false;

  $.log("本轮结束时间： " + _0x409017(new Date(Date.now() + _0x27f72a.data.countDownTime)));

  for (let _0x3fc5ce = 0; _0x3fc5ce < (_0x5b0c9c > -1 && _0x5b0c9c < $.times ? _0x5b0c9c : $.times); _0x3fc5ce++) {
    process.stdout.write("\n第" + (_0x3fc5ce + 1) + "次抽奖结果：");

    for (let _0x3e4a01 of Array(3)) {
      await _0x3b0bd6(_0x3e4a01 + 1);
      if (!$.hotflag) break;
      await $.wait(Math.random() * 500 + _0x3f412e * 1000);
    }

    if ($.end) break;
    $.txj && (await _0x17757c());
    await $.wait(Math.random() * 500 + _0x3f412e * 1000);

    if ($.fail > 2) {
      $.log("连续3次优惠券，不继续抽了");
      break;
    }
  }

  _0x1c9f07.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x1c9f07.reduce((_0x39791d, _0x33fec2) => _0x39791d + _0x33fec2 * 100, 0) / 100 + "元");
  _0x135d9e.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x135d9e.reduce((_0x47c966, _0xc26bfa) => _0x47c966 + _0xc26bfa * 100, 0) / 100 + "元");

  if (txjscore.length !== 0) {
    let _0x3d3240 = txjscore.reduce((_0x3b72f5, _0x2dc3ad) => _0x3b72f5 + _0x2dc3ad * 100, 0) / 100;

    $.log("\n\n本次抽奖获得提现金：" + _0x3d3240 + "个, 平均" + (_0x3d3240 / (_0x5b0c9c > -1 ? Math.min.apply(null, [_0x5b0c9c, $.times]) : $.times)).toFixed(4) + "个/抽");
  }

  if (_0x5ddd00 != "true") {
    if (new Date().getHours() < 6 && _0x3f0e17) return;
    $.log("\n——————————开始提现（间隔" + _0x4c0ac9 + "秒，范围" + _0x34f70d + "天内）——————");
    _0x23c5cb && $.log("\n已开启转红包，提现上限会自动转红包！！\n");
    $.txsuc = [];
    $.toredsuc = [];

    for (let _0x11d97c = 0; _0x11d97c < 50; _0x11d97c++) {
      if ($.nocashnum > 2 || $.toredfailnum > 4) break;

      let _0x2c3f37 = await _0x22b4a4(_0x11d97c + 1);

      if (_0x2c3f37 == "") {
        await $.wait(5000);
        await _0x22b4a4(_0x11d97c + 1);
      }

      if (!$.baglist || $.baglist.length === 0) break;

      for (let _0x13986c of $.baglist) {
        if (Math.max.apply(null, [new Date(_0x13986c.createTime), new Date(_0x13986c.startTime)]) < _0x1046e8 || $.toredfailnum > 4) {
          $.nocashnum = 5;
          break;
        }

        if (_0x13986c.prizeType == 4) {
          if (_0x13986c.state == 0 || _0x13986c.state == 2) {
            process.stdout.write("" + Number(_0x13986c.amount));

            let _0x206f7c = await _0x112d24(_0x13986c, Number(_0x13986c.amount));

            $.txfail && (await $.wait(5000), _0x206f7c = await _0x112d24(_0x13986c, Number(_0x13986c.amount)));
            if (_0x206f7c.data.message.includes("上限") && _0x23c5cb == "true" && $.toredfailnum < 5) await _0x5cc2ce(_0x13986c, Number(_0x13986c.amount));
            await $.wait(_0x4c0ac9 * 1000);
          } else {
            if (_0x13986c.state == 8) {}
          }
        }
      }

      await $.wait(2000);
    }

    $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x360b98, _0x43f96e) => _0x360b98 + _0x43f96e * 100, 0) / 100 + "元");
    $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0xc738a6, _0x57ab12) => _0xc738a6 + _0x57ab12 * 100, 0) / 100 + "元");
  } else $.log("\n\n⚠已设置不提现！");

  _0x3cfd43 = [];
  await $.wait(2000);
})().catch(_0x41b981 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x41b981 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x34b852(_0x125089) {
  let _0x50b5e7 = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ",
    "inviter": ""
  },
      _0x5b83e8 = {
    "appId": "eb67b",
    "fn": "inviteFissionHome",
    "body": _0x50b5e7,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x50b5e7 = await _0xb94598.getbody(_0x5b83e8);
  if (!_0x50b5e7) return;
  return new Promise(async _0x3fbc4c => {
    $.dpost(_0x25f03d(_0x50b5e7), async (_0x48d88b, _0x113302, _0x5ad5a8) => {
      try {
        if (_0x48d88b) console.log("" + JSON.stringify(_0x48d88b)), console.log("homeinfo请求失败，请检查网路重试");else {
          _0x5ad5a8 = JSON.parse(_0x5ad5a8);

          if (_0x5ad5a8.code == 0) {
            $.times = _0x5ad5a8.data.prizeNum;
            if (_0x125089) console.log("我的助力码：" + _0x5ad5a8.data.inviter);

            _0x312daa.push(_0x5ad5a8.data.inviter);
          } else console.log(_0x5ad5a8.errMsg);
        }
      } catch (_0x157885) {
        $.logErr(_0x157885, _0x113302);
      } finally {
        _0x3fbc4c(_0x5ad5a8);
      }
    });
  });
}

async function _0x17757c() {
  let _0x295eea = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ"
  },
      _0x4f7b2e = {
    "appId": "b8469",
    "fn": "inviteFissionReceive",
    "body": _0x295eea,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x295eea = await _0xb94598.getbody(_0x4f7b2e);
  if (!_0x295eea) return;
  return new Promise(async _0x31be6d => {
    $.dpost(_0x25f03d(_0x295eea), async (_0x532287, _0x5ba58b, _0x3cd1f1) => {
      try {
        if (_0x532287) console.log("" + JSON.stringify(_0x532287)), console.log("receive请求失败，请检查网路重试"), _0x532287.includes("403") && ($.banip = true);else {
          _0x3cd1f1 = JSON.parse(_0x3cd1f1);

          if (_0x3cd1f1.code == 0) {
            process.stdout.write("----提现金" + _0x3cd1f1.data.amount + "(+" + _0x3cd1f1.data.receiveList[0].amount + ")");
            txjscore.push(_0x3cd1f1.data.receiveList[0].amount);
            _0x3cd1f1.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
          } else {
            if (_0x3cd1f1.code == 80208) process.stdout.write("----送的抽奖次数没有提现金");else _0x3cd1f1.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x3cd1f1));
          }
        }
      } catch (_0x116013) {
        $.logErr(_0x116013, _0x5ba58b);
      } finally {
        _0x31be6d(_0x3cd1f1);
      }
    });
  });
}

async function _0x3b0bd6(_0x46c5f2) {
  let _0x1afd64 = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ"
  },
      _0x39a5f4 = {
    "appId": "c02c6",
    "fn": "inviteFissionDrawPrize",
    "body": _0x1afd64,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x1afd64 = await _0xb94598.getbody(_0x39a5f4);
  if (!_0x1afd64) return;
  return new Promise(async _0x4dc7b0 => {
    $.dpost(_0x25f03d(_0x1afd64), async (_0x9f7761, _0x3b20d1, _0x510573) => {
      try {
        if (_0x9f7761) {
          console.log("" + JSON.stringify(_0x9f7761));
          console.log("lottery请求失败，请检查网路重试");

          if (_0x9f7761.includes("403")) {
            $.banip = true;
          }
        } else {
          _0x510573 = JSON.parse(_0x510573);

          if (_0x510573.code == 0) {
            const _0x103b4a = _0x510573.data.prizeType;
            if (!_0x103b4a) fail++;

            switch (_0x103b4a) {
              case 1:
                process.stdout.write("垃.圾.券😤"), $.txjsuc && $.fail++, $.hotflag = false;
                break;

              case 4:
                let _0x3720a6 = parseFloat(_0x510573.data.prizeValue).toFixed(2);

                process.stdout.write(_0x3720a6 + "现金💰️"), _0x135d9e.push(_0x3720a6), _0x3cfd43.push({
                  "prizeValue": _0x510573.data.prizeValue,
                  "id": _0x510573.data.id,
                  "poolBaseId": _0x510573.data.poolBaseId,
                  "prizeGroupId": _0x510573.data.prizeGroupId,
                  "prizeBaseId": _0x510573.data.prizeBaseId
                }), $.fail = 0, $.hotflag = false;
                break;

              case 2:
                let _0x39f662 = parseFloat(_0x510573.data.prizeValue).toFixed(2);

                process.stdout.write(_0x39f662 + "红包🧧"), _0x1c9f07.push(_0x39f662), $.fail = 0, $.hotflag = false;
                break;

              default:
                $.hotflag = false, console.log(JSON.stringify(_0x510573.data));
            }
          } else {
            if (_0x510573.errMsg.includes("火爆")) process.stdout.write("未中奖 "), $.hotflag = true;else _0x510573.errMsg.includes("结束") ? ($.end = true, $.hotflag = false, console.log(_0x510573.errMsg)) : ($.hotflag = false, console.log(_0x510573.errMsg));
          }
        }
      } catch (_0x20c47a) {
        $.logErr(_0x20c47a, _0x3b20d1);
      } finally {
        _0x4dc7b0(_0x510573);
      }
    });
  });
}

async function _0x22b4a4(_0x4c500d) {
  let _0x4758a7 = {
    "pageNum": _0x4c500d,
    "pageSize": 100,
    "linkId": "3orGfh1YkwNLksxOcN8zWQ",
    "business": "fission"
  },
      _0x1b83d0 = {
    "appId": "f2b1d",
    "fn": "superRedBagList",
    "body": _0x4758a7,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  _0x4758a7 = await _0xb94598.getbody(_0x1b83d0);
  if (!_0x4758a7) return;
  return new Promise(async _0x64efd2 => {
    $.dget(_0x25f03d(_0x4758a7), async (_0x363e90, _0x526616, _0x57c28a) => {
      try {
        _0x363e90 ? (console.log("" + JSON.stringify(_0x363e90)), console.log(" API请求失败，请检查网路重试"), _0x363e90.includes("403") && ($.banip = true), _0x57c28a = "") : (_0x57c28a = JSON.parse(_0x57c28a), _0x57c28a.code == 0 ? $.baglist = _0x57c28a.data.items : console.log(_0x57c28a.errMsg));
      } catch (_0x2de81f) {
        $.logErr(_0x2de81f, _0x526616);
      } finally {
        _0x64efd2(_0x57c28a);
      }
    });
  });
}

async function _0x174906(_0x4d6685) {
  let _0x278b73 = {
    "linkId": "3orGfh1YkwNLksxOcN8zWQ",
    "isJdApp": true,
    "inviter": _0x4d6685
  },
      _0xb611a7 = {
    "appId": "c5389",
    "fn": "inviteFissionhelp",
    "body": _0x278b73,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x278b73 = await _0xb94598.getbody(_0xb611a7);
  if (!_0x278b73) return;
  return new Promise(async _0x35d313 => {
    $.dpost(_0x25f03d(_0x278b73), async (_0x1df09c, _0x5ef8c7, _0x1d07b9) => {
      try {
        if (_0x1df09c) console.log("" + JSON.stringify(_0x1df09c)), console.log("help请求失败，请检查网路重试"), _0x1df09c.includes("403") && ($.banip = true);else {
          _0x1d07b9 = JSON.parse(_0x1d07b9);

          if (_0x1d07b9.code == 0) {
            if (!_0x1d07b9.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (_0x1d07b9.data.helpResult == 1) $.suc++, console.log("结果：助力成功 ✅ " + ($.suc || ""));else {
              if (_0x1d07b9.data.helpResult == 6) console.log("结果：已经助力过TA！");else {
                if (_0x1d07b9.data.helpResult == 3) console.log("结果：没有次数！");else {
                  if (_0x1d07b9.data.helpResult == 2) $.log("结果：助力黑了 💣"), $.hot = true;else {
                    if (_0x1d07b9.data.helpResult == 4) $.log("结果：没有助力次数！");else _0x1d07b9.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log("结果：" + _0x1d07b9.data?.["helpResult"]);
                  }
                }
              }
            }
          } else console.log(_0x1d07b9.errMsg);
        }
      } catch (_0x5dec38) {
        $.logErr(_0x5dec38, _0x5ef8c7);
      } finally {
        _0x35d313(_0x1d07b9);
      }
    });
  });
}

async function _0x112d24(_0x175d0e, _0x3eb0a4) {
  let _0x2998cd = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x175d0e.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x175d0e.poolBaseId + ",\"prizeGroupId\":" + _0x175d0e.prizeGroupId + ",\"prizeBaseId\":" + _0x175d0e.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x19ea80 => {
    $.dpost(_0x25f03d(_0x2998cd), async (_0x22fcf3, _0x50c6a8, _0x326916) => {
      try {
        if (_0x22fcf3) console.log("" + JSON.stringify(_0x22fcf3)), console.log("apCashWithDraw请求失败，请检查网路重试"), _0x22fcf3.includes("403") && ($.banip = true);else {
          _0x326916 = JSON.parse(_0x326916);

          if (_0x326916.code == 0) {
            if (_0x326916.data.message.indexOf("待发放") > -1) process.stdout.write("❎"), $.txfail = true;else {
              if (_0x326916.data.message.includes("上限")) !_0x23c5cb && console.log("提现到上限"), $.txfull = true, $.txfail = false;else _0x326916.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x3eb0a4), $.txfail = false) : console.log(_0x326916.data.message);
            }
          } else console.log(_0x326916.errMsg);
        }
      } catch (_0x5c699d) {
        $.logErr(_0x5c699d, _0x50c6a8);
      } finally {
        _0x19ea80(_0x326916);
      }
    });
  });
}

async function _0x5cc2ce(_0x577ab3, _0x4cd223) {
  let _0x2fd7e0 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x577ab3.id + ",\"business\":\"fission\",\"poolId\":" + _0x577ab3.poolBaseId + ",\"prizeGroupId\":" + _0x577ab3.prizeGroupId + ",\"prizeId\":" + _0x577ab3.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2],
      _0x325b3f = {
    "url": "https://api.m.jd.com/api",
    "body": _0x2fd7e0,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://prodev.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x1d83ec
    }
  };

  return new Promise(async _0x11ee93 => {
    $.dpost(_0x325b3f, async (_0xec7c46, _0x20c922, _0x4ced32) => {
      try {
        if (_0xec7c46) console.log("" + JSON.stringify(_0xec7c46)), console.log("apRecompenseDrawPrize 请求失败，请检查网路重试"), _0xec7c46.includes("403") && ($.banip = true);else {
          _0x4ced32 = JSON.parse(_0x4ced32);
          if (_0x4ced32.code == 0) _0x4ced32.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x4cd223)) : (process.stdout.write("❎ "), $.toredfailnum++);else _0x4ced32.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x4ced32.errMsg);
        }
      } catch (_0x9757ec) {
        $.logErr(_0x9757ec, _0x20c922);
      } finally {
        _0x11ee93(_0x4ced32);
      }
    });
  });
}

function _0x25f03d(_0x3e8d85) {
  return {
    "url": "https://api.m.jd.com/?" + _0x3e8d85,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://prodev.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x1d83ec
    }
  };
}

function _0x31d13d() {
  return new Promise(_0x16848d => {
    const _0x124531 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x1d83ec,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x124531, (_0x1768f8, _0x5aa162, _0x575ba5) => {
      try {
        if (_0x575ba5) {
          _0x575ba5 = JSON.parse(_0x575ba5);

          if (_0x575ba5.islogin === "1") {} else _0x575ba5.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x3ff775) {
        console.log(_0x3ff775);
      } finally {
        _0x16848d();
      }
    });
  });
}

function _0x507cd9() {
  return new Promise(_0x390f63 => {
    !_0x288f5f ? $.msg($.name, "", "" + _0x1524ed) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x1524ed);

    _0x390f63();
  });
}

function _0x4aadd2(_0x44cf62) {
  try {
    if (typeof JSON.parse(_0x44cf62) == "object") return true;
  } catch (_0x2e2721) {
    return console.log(_0x2e2721), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x409017(_0x4ebdbb) {
  const _0x4eeabf = _0x4ebdbb.getFullYear(),
        _0x384477 = ("0" + (_0x4ebdbb.getMonth() + 1)).slice(-2),
        _0xc5a1c2 = ("0" + _0x4ebdbb.getDate()).slice(-2),
        _0x26c691 = ("0" + _0x4ebdbb.getHours()).slice(-2),
        _0x565e8a = ("0" + _0x4ebdbb.getMinutes()).slice(-2),
        _0x12ae1c = ("0" + _0x4ebdbb.getSeconds()).slice(-2);

  return _0x4eeabf + "/" + _0x384477 + "/" + _0xc5a1c2 + " " + _0x26c691 + ":" + _0x565e8a + ":" + _0x12ae1c;
}

function _0x1f2e8e(_0x395739) {
  if (typeof _0x395739 == "string") try {
    return JSON.parse(_0x395739);
  } catch (_0x2f563b) {
    return console.log(_0x2f563b), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }