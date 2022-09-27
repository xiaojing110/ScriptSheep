/*
新百货大楼
APP-主页-新百货频道-底部中间
日常任务，签到，盖楼，离线奖励领取
20 8-20/2 0 0 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_xbhdl.js 
20 8-20/2 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_xbhdl.js 
默认定时不跑，自定义
updatetime: 2022/9/24
author: https://github.com/6dylan6/jdpro
*/
const $ = new Env("新百货盖楼");
const JV = require('crypto-js'),
  Jp = $.isNode() ? require('./jdCookie.js') : '',
  JO = $.isNode() ? require('./sendNotify') : ''
let Jv = [],
  JL = ''
if ($.isNode()) {
  
  Object.keys(Jp).forEach((J) => {
    Jv.push(Jp[J])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') {
    console.log = () => {}
  }
} else {
  Jv = [
    $.getdata('CookieJD'),
    $.getdata('CookieJD2'),
    ...JT($.getdata('CookiesJD') || '[]').map((J) => J.cookie),
  ].filter((J) => !!J)
}
allMessage = ''
message = ''
$.hotFlag = false
$.outFlag = false
$.full = false
$.invitercode = []
let Jh = ['4708215'],
  Jg = 0
Jg = Math.floor(Math.random() * Jh.length)
let Jx = Jh[Jg] || ''
!(async () => {
  $.log('入口\uFF1A APP-主页-新百货频道-底部中间,只运行前10个CK')
  $.log('\n问题建议\uFF1Ahttps://t.me/dylan_jdpro')
  if (!Jv[0]) {
    $.msg(
      $.name,
      '\u3010提示\u3011请先获取cookie\n直接使用NobyDa的京东签到获取',
      'https://bean.m.jd.com/',
      { 'open-url': 'https://bean.m.jd.com/' }
    )
    return
  }
  await $.wait(10)
  for (let w = 0; w < Jv.length; w++) {}
  await Jr()
  for (let k = 0; k < 10; k++) {
    JL = Jv[k]
    if (JL) {
      $.UserName = decodeURIComponent(
        JL.match(/pt_pin=([^; ]+)(?=;?)/) &&
          JL.match(/pt_pin=([^; ]+)(?=;?)/)[1]
      )
      $.index = k + 1
      $.hotFlag = false
      $.uid = ''
      $.nochuzi = false
      console.log(
        '\n\n******开始\u3010京东账号' +
          $.index +
          '\u3011' +
          $.UserName +
          '*********\n'
      )
      await Jl()
      if ($.outFlag) {
        break
      }
    }
    await $.wait(parseInt(Math.random() * 2000 + 2000, 10))
  }
  if ($.outFlag) {
    let m = '此ip已被限制\uFF0C请过10分钟后再执行脚本'
    $.msg($.name, m)
    if ($.isNode()) {
      await JO.sendNotify('' + $.name, '' + m)
    }
  }
})()
  .catch((J) => $.logErr(J))
  .finally(() => $.done())
async function Jl() {
  try {
    $.hasEnd = true
    $.Token = ''
    $.Pin = ''
    if ($.outFlag) {
      console.log('此ip已被限制\uFF0C请过10分钟后再执行脚本')
      return
    }
    await JQ('token')
    if ($.Token == '') {
      console.log('获取token失败\uFF01')
      return
    }
    await $.wait(1000)
    await JQ('lkToken')
    if (!$.lkToken) {
      return
    }
    await JQ('GetSaveByToken')
    if (Object.keys($.info).length === 0) {
      return
    }
    await $.wait(1000)
    console.log('当前楼层', $.floornum, '层')
    console.log('当前金币', $.score, '个')
    console.log('当前锤子', $.chuizi, '个')
    console.log('开始签到')
    if ($.signstate == 0) {
      await JQ('GetSignInReward')
    } else {
      $.log('今日签到已完成')
    }
    await $.wait(1000)
    $.signtaskstate == 0
      ? await JQ('GetSignTaskReward')
      : $.log('今日签到任务已完成')
    await $.wait(1000)
    console.log('领取离线收益')
    await JQ('Produce')
    await $.wait(1000)
    await JQ('GetOfflineRenevue')
    console.log('开始任务')
    await JQ('GetTaskList')
    await $.wait(500)
    await JQ('GetBrowseList')
    for (let E of $.tasklist) {
      if ($.taskstatelist[E.type] >= E.rewardTimes) {
        console.log(E.name, '----已完成')
        continue
      }
      switch (E.type) {
        case 'BrowseShop':
          for (let V = 0; V < E.rewardTimes; V++) {
            console.log(E.name)
            $.type = E.type
            $.iid = $.Shoplist[V].entityList[0].shopId
            $.taskId = E['_id']
            await JQ('AddStep')
            await $.wait(1000)
            await JQ('GetReward')
          }
          break
        case 'BrowseSku':
          for (let L = 0; L < E.rewardTimes; L++) {
            console.log(E.name)
            $.type = E.type
            $.iid = $.Skulist[L].entityList[0].skuId
            $.taskId = E['_id']
            await JQ('AddStep')
            await $.wait(1000)
            await JQ('GetReward')
          }
          break
        case 'BrowseVender':
          for (let l = 0; l < E.rewardTimes; l++) {
            console.log(E.name)
            $.type = E.type
            $.iid = $.Venderlist[l].entityList[0].venderId
            $.taskId = E['_id']
            await JQ('AddStep')
            await $.wait(1000)
            await JQ('GetReward')
          }
          break
        case 'BrowseChannel':
          for (let S = 0; S < E.rewardTimes; S++) {
            console.log(E.name)
            $.type = E.type
            $.iid = $.Channelist[S].entityList[0].channelId
            $.taskId = E['_id']
            await JQ('AddStep')
            await $.wait(1000)
            await JQ('GetReward')
          }
          break
        case 'FollowShop':
          for (let Y = 0; Y < E.rewardTimes; Y++) {
            console.log(E.name)
            $.type = E.type
            await JQ('GetFollowShopList')
            await $.wait(500)
            $.iid = $.folowshopid
            $.taskId = E['_id']
            await JQ('AddStep')
            await $.wait(1000)
            await JQ('GetReward')
          }
          break
      }
    }
    console.log('开始盖楼')
    for (let q = 0; q < 10; q++) {
      if ($.nochuzi) {
        break
      }
      await JQ('Upgrade')
      await $.wait(1000)
    }
  } catch (y) {
    console.log(y)
  }
}
async function JQ(J, C) {
  if ($.outFlag) {
    return
  }
  let k = 'POST'
  switch (J) {
    case 'token':
      url =
        'https://jdjoy.jd.com/saas/framework/user/token?appId=f3576dcf13b52805bb78cc02450ffc26&client=m&url=pengyougou.m.jd.com'
      break
    case 'lkToken':
      url =
        'https://jdjoy.jd.com/saas/framework/encrypt/pin?appId=f3576dcf13b52805bb78cc02450ffc26'
      break
    case 'GetSaveByToken':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Save/GetSaveByToken'),
        (C = {
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {
            lkToken: $.lkToken,
            channel: 'release',
            babelChannel: null,
          },
          clientReqId: JY(),
        })
      break
    case 'GetOfflineRenevue':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/GetOfflineRenevue'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          clientReqId: JY(),
        })
      break
    case 'GetSignInReward':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/SignIn/GetSignInReward'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          clientReqId: JY(),
        })
      break
    case 'GetSignTaskReward':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/SignIn/GetTaskReward'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          clientReqId: JY(),
        })
      break
    case 'GetTaskList':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetTaskList'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          clientReqId: JY(),
        })
      break
    case 'GetBrowseList':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetBrowseList'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          clientReqId: JY(),
        })
      break
    case 'AddStep':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/AddStep'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {
            taskType: $.type,
            entityIds: [$.iid],
          },
          clientReqId: JY(),
        })
      break
    case 'GetReward':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetReward'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: { taskId: $.taskId },
          clientReqId: JY(),
        })
      break
    case 'Produce':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/Produce'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {},
          clientReqId: JY(),
        })
      break
    case 'GetFollowShopList':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetFollowShopList'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {},
          clientReqId: JY(),
        })
      break
    case 'GetFollowShopStatus':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Task/GetFollowShopStatus'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {
            lkToken: $.lkToken,
            ids: [
              1000002483, 1000005125, 1000005205, 1000005193, 956228,
              1000005174, 1000305465, 1000002626,
            ],
          },
          clientReqId: JY(),
        })
      break
    case 'Upgrade':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Building/Upgrade'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {},
          clientReqId: JY(),
        })
      break
    case 'RefreshOnline':
      ;(url =
        'https://gameserver-2174841-1307535713.ap-shanghai.run.tcloudbase.com/Save/RefreshOnline'),
        (C = {
          uid: $.uid,
          uv: $.uv,
          version: '1.0.3',
          channel: 'release',
          env: 'jdApp',
          isPre: false,
          ...Jb(),
          encrypt: true,
          data: {},
          clientReqId: JY(),
        })
      break
    default:
      console.log('错误' + J)
  }
  C &&
    C.encrypt &&
    (C.data = Js.aesEncrypt(
      JSON.stringify(C.data),
      '8a5e4h2x5d6g9e5a',
      'h4a1e8h4z1a2g5e8'
    ))
  let R = JB(url, C, k)
  return new Promise(async (m) => {
    $.post(R, (o, I, V) => {
      try {
        o
          ? (I &&
              I.statusCode &&
              I.statusCode == 493 &&
              (console.log('此ip已被限制\uFF0C请过10分钟后再执行脚本'),
              ($.outFlag = true)),
            console.log('' + $.toStr(o, o)),
            console.log(' API请求失败\uFF0C请检查网路重试'))
          : (V = Jj(J, V))
      } catch (g) {
        console.log(g, I)
      } finally {
        m(V)
      }
    })
  })
}
async function Jj(J, C) {
  let w = ''
  try {
    C && (w = JSON.parse(C))
  } catch (N) {
    console.log(J + ' 执行任务异常'), ($.runFalag = false)
  }
  try {
    switch (J) {
      case 'token':
        if (typeof w == 'object') {
          if (w.success) {
            if (typeof w.data != 'undefined') {
              $.Token = w.data
            }
          } else {
            w.errorMessage
              ? console.log('token ' + w.errorMessage)
              : console.log(C)
          }
        } else {
          console.log(C)
        }
        break
      case 'lkToken':
        if (typeof w == 'object') {
          if (w.success && w.data) {
            $.lkToken = w.data.lkToken
            $.lkEPin = w.data.lkEPin
          } else {
            if (w.errorMessage) {
              console.log(J + ' ' + w.errorMessage)
            } else {
              console.log(C)
            }
          }
        } else {
          console.log(C)
        }
        break
      case 'GetSaveByToken':
        if (typeof w == 'object') {
          $.info = {}
          if (w.success) {
            $.uid = w.data.uid
            $.info = Js.aesDecrypt(
              w.data.save,
              'k4ug8ayehg5a8e96',
              'g8err4a5g23a5e8g'
            )
            $.info = JSON.parse($.info)
            $.score = $.info.items.data[101001001]
            $.taskstatelist = $.info.task.daySteps
            $.chuizi = $.info.items.data[101001002]
            $.uv = $.info.updateVersion
            $.signstate = $.info.signIn.getSignReward
            $.signtaskstate = $.info.signIn.getTaskReward
            $.floornum = $.info.building.floorNum
          } else {
            console.log('获取信息失败\uFF0C跳出')
          }
        } else {
          console.log(C)
        }
        break
      case 'GetOfflineRenevue':
        typeof w == 'object'
          ? $.offscore &&
            (($.uv += 1), console.log('获取离线收益\uFF1A', $.offscore))
          : console.log(C)
        break
      case 'GetTaskList':
        if (typeof w == 'object') {
          if (w.success) {
            $.tasklist = w.data
          } else {
            $.log(w)
          }
        } else {
          console.log(w)
        }
        break
      case 'GetBrowseList':
        typeof w == 'object'
          ? w.success
            ? (($.Skulist = w.data.browseSku),
              ($.Shoplist = w.data.browseShop),
              ($.Venderlist = w.data.browseVender),
              ($.Channelist = w.data.browseChannel))
            : $.log(w)
          : console.log(C)
        break
      case 'GetFollowShopList':
        if (typeof w == 'object') {
          if (w.success) {
            $.folowshopid = w.data[0].entityList[0].shopId
          } else {
            console.log(C)
          }
        } else {
          console.log(C)
        }
        break
      case 'GetSignInReward':
      case 'GetSignTaskReward':
        $.uv += 1
        if (typeof w == 'object') {
          w.success
            ? console.log('签到完成\uFF0C获得锤子 ', w.data.reward)
            : console.log(C)
        } else {
          console.log(C)
        }
        break
      case 'GetReward':
        $.uv += 1
        if (typeof w == 'object') {
          if (w.success) {
            console.log('任务完成\uFF0C获得锤子 ', w.data.reward.num)
          } else {
            console.log(C)
          }
        } else {
          console.log(C)
        }
        break
      case 'AddStep':
        $.uv += 1
        break
      case 'Upgrade':
        $.uv += 1
        if (typeof w == 'object') {
          w.success
            ? (console.log('盖楼成功'),
              console.log('剩余锤子\uFF1A', w.extraData.dsl[0].value))
            : (($.nochuzi = true), console.log(w.errorMessage))
        } else {
          console.log(C)
        }
        break
      case 'Produce':
        $.uv += 1
        if (typeof w == 'object') {
          if (w.success) {
            $.offscore = ''
            if (w.data.isOfflineRenevue) {
              $.offscore = w.data.produce
            }
          } else {
            console.log(w.errorMessage)
          }
        } else {
          console.log(C)
        }
        break
      case 'RefreshOnline':
        if (typeof w == 'object') {
          if (w.success) {
          } else {
            console.log(w.errorMessage)
          }
        } else {
          console.log(C)
        }
        break
      case 'followShop':
      case 'doTask':
      case 'addCart':
      case 'missionInviteList':
      case '绑定':
      case '助力':
        let E = ''
        if (J == 'followShop') {
          E = '关注'
        }
        if (J == 'addCart') {
          E = '加购'
        }
        if (J == 'specialSign') {
          E = '签到'
        }
        if (typeof w == 'object') {
          if (w.success && w.success === true && w.data) {
            if (w.data.status && w.data.status == 200) {
              w = w.data
              J != 'setMixNick' &&
                (w.msg || w.data.remark) &&
                console.log(
                  ((E && E + ':') || '') +
                    (w.msg || w.data.isOpenCard || w.data.remark || '')
                )
              if (J == 'activity_load') {
                w.data &&
                  (($.MixNick = w.data.missionCustomer.buyerNick || ''),
                  ($.hasCollectShop =
                    w.data.missionCustomer.hasCollectShop || 0),
                  ($.totalPoint = w.data.missionCustomer.totalPoint || 0),
                  ($.remainChance = w.data.missionCustomer.remainChance || 0))
              } else {
                J == 'missionInviteList' &&
                  console.log('本月已邀请助力(' + w.data.total + ')')
              }
            } else {
              if (w.data.msg) {
                console.log(w.data.msg)
              } else {
                w.errorMessage
                  ? console.log(J + ' ' + w.errorMessage)
                  : console.log(C)
              }
            }
          } else {
            w.errorMessage
              ? console.log(J + ' ' + w.errorMessage)
              : console.log(C)
          }
        } else {
          console.log(C)
        }
        break
      default:
        return w
    }
  } catch (Jy) {
    console.log(Jy)
  }
}
function JB(C, c, w = 'POST') {
  const R = {
    Accept: '*/*',
    Connection: 'keep-alive',
    Cookie: JL,
  }
  R['Accept-Encoding'] = 'gzip, deflate, br'
  R['Accept-Language'] = 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
  R['Content-Type'] = 'application/x-www-form-urlencoded'
  R['User-Agent'] = $.UA
  R['X-Requested-With'] = 'com.jingdong.app.mall'
  let N = R
  C.indexOf('moxigame') > -1 &&
    ((N.Origin = 'https://jddl.gamecatstudio.com'), delete N.Cookie)
  return {
    url: C,
    method: w,
    headers: N,
    body: JSON.stringify(c),
    timeout: 30000,
  }
}
function JS(C) {
  C = C || 32
  let k = 'abcdef0123456789',
    R = k.length,
    N = ''
  for (let m = 0; m < C; m++) {
    N += k.charAt(Math.floor(Math.random() * R))
  }
  return N
}
function JF(C, c) {
  var R = Math.floor(Math.random() * (c - C + 1) + C)
  return R
}
function JT(k) {
  const N = (function () {
    let p = true
    return function (O, v) {
      const i = p
        ? function () {
            if (v) {
              const g = v.apply(O, arguments)
              return (v = null), g
            }
          }
        : function () {}
      return (p = false), i
    }
  })()
  const m = N(this, function () {
    return m
      .toString()
      .search('(((.+)+)+)+$')
      .toString()
      .constructor(m)
      .search('(((.+)+)+)+$')
  })
  m()
  const E = (function () {
      let I = true
      return function (V, p) {
        const O = I
          ? function () {
              if (p) {
                const v = p.apply(V, arguments)
                return (p = null), v
              }
            }
          : function () {}
        return (I = false), O
      }
    })(),
    o = E(this, function () {
      const V = function () {
        let L
        try {
          L = Function(
            'return (function() {}.constructor("return this")( ));'
          )()
        } catch (i) {
          L = window
        }
        return L
      }
      const p = V(),
        O = (p.console = p.console || {})
      const v = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace']
      for (let L = 0; L < v.length; L++) {
        const i = E.constructor.prototype.bind(E),
          h = v[L],
          g = O[h] || i
        i['__proto__'] = E.bind(E)
        i.toString = g.toString.bind(g)
      }
    })
  o()
  if (typeof k == 'string') {
    try {
      return JSON.parse(k)
    } catch (I) {
      return (
        console.log(I),
        $.msg(
          $.name,
          '',
          '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie'
        ),
        []
      )
    }
  }
}
async function Jr() {
  $.UA =
    'jdapp;iPhone;10.1.4;13.1.2;' +
    JS(40) +
    ';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
}
function JY() {
  function C() {
    return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)
  }
  return C() + C() + C() + C() + C() + C() + C() + C()
}
function Jb() {
  let c = Js.aesEncrypt(
      String(Date.now()),
      'a8ge9g5r8a4d1g5r',
      '5e8g8r6a32z1d5ge'
    ),
    w = Js.aesEncrypt(
      c + ($.uid || '') + '1.0.3' + 'release' + 'jdApp',
      'a8ge9g5r8a4d1g5r',
      '5e8g8r6a32z1d5ge'
    )
  const k = {
    t: c,
    s: w,
  }
  return k
}
const JW = require('crypto-js')
var Js = (function () {
  function J() {}
  return (
    (J.aesEncrypt = function (C, c, w) {
      var k = JW.enc.Utf8.parse(c),
        R = JW.enc.Utf8.parse(w)
      return JW.AES.encrypt(C, k, {
        iv: R,
        mode: JW.mode.CBC,
        padCRng: JW.pad.Pkcs7,
      }).toString(JW.format.Hex)
    }),
    (J.aesDecrypt = function (C, c, w) {
      var k = JW.enc.Utf8.parse(c),
        R = JW.enc.Utf8.parse(w),
        N = JW.enc.Hex.parse(C),
        m = JW.enc.Base64.stringify(N)
      return JW.AES.decrypt(m, k, {
        iv: R,
        mode: JW.mode.CBC,
        padCRng: JW.pad.Pkcs7,
      }).toString(JW.enc.Utf8)
    }),
    J
  )
})()

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }