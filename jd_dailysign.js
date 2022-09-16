
/*
京东日常签到
updateTime：2022-07-11 By Dylan
1 0,8 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_dailysign.js
 */

const $ = new Env('京东翻盘签到');


const _0x325977 = $.isNode() ? require('./sendNotify') : ''
const _0x329826 = $.isNode() ? require('./jdCookie.js') : ''
let _0x570eb4 = true
let _0x30bfd4 = [],
  _0x4a2394 = '',
  _0x116778 = ''
let _0x17b896 = [
  "4SWjnZSCTHPYjE5T7j35rxxuMTb6",
  "3HNF5DKia1F6QJdJNaL9ddMWnZCD",
  "3kcHLz7wd93eRJBhCuojcnukNFcy",
  "24mfJCMuf9d32RkVHNcebAhhxywF",
  "2TY2j1yJ9T2QKiQekTpHgvv68HiD",
  "2tZssTgnQsiUqhmg5ooLSHY9XSeN",
  "N9MpLQdxZgiczZaMx2SzmSfZSvF",
  "3BbAVGQPDd6vTyHYjmAutXrKAos6"
]
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
  };
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
const _0x210294 = 'https://api.m.jd.com/client.action'
!(async () => {
  if (!_0x30bfd4[0]) {
    $.msg(
      $.name,
      '\u3010提示\u3011请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取',
      'https://bean.m.jd.com/bean/signIndex.action',
      { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' }
    )
    return
  }

  for (let _0x562045 = 0; _0x562045 < _0x30bfd4.length; _0x562045++) {
    if (_0x30bfd4[_0x562045]) {
      _0x4a2394 = _0x30bfd4[_0x562045]
      $.UserName = decodeURIComponent(
        _0x4a2394.match(/pt_pin=([^; ]+)(?=;?)/) &&
          _0x4a2394.match(/pt_pin=([^; ]+)(?=;?)/)[1]
      )
      $.index = _0x562045 + 1
      $.isLogin = true
      $.nickName = ''
      await _0x439b28()
      console.log(
        '\n******开始\u3010京东账号' +
          $.index +
          '\u3011' +
          ($.nickName || $.UserName) +
          '*********\n'
      )
      if (!$.isLogin) {
        $.msg(
          $.name,
          '\u3010提示\u3011cookie已失效',
          '京东账号' +
            $.index +
            ' ' +
            ($.nickName || $.UserName) +
            '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',
          { 'open-url': 'https://bean.m.jd.com/bean/signIndex.action' }
        )
        if ($.isNode()) {
          await _0x325977.sendNotify(
            $.name + 'cookie已失效 - ' + $.UserName,
            '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie'
          )
        }
        continue
      }
      await _0x49da80()
    }
  }
})()
  .catch((_0x41aff9) => {
    $.log('', '\u274C ' + $.name + ', 失败! 原因: ' + _0x41aff9 + '!', '')
  })
  .finally(() => {
    $.done()
  })
async function _0x49da80() {
  try {
    for (i = 0; i < _0x17b896.length; i++) {
      await _0x510a31(_0x17b896[i])
      await $.wait(2000)
    }
  } catch (_0x196062) {
    $.logErr(_0x196062)
  }
}
function _0x105df3(_0xab7d7d) {
  return new Promise(async (_0x44ed4d) => {
    $.appId = '9a4de'
    await _0x2d9f6d()
    $.get(
      _0x4a7537(turnTableId[_0xab7d7d].id),
      async (_0x222c3f, _0x180105, _0xa951e3) => {
        try {
          if (_0x222c3f) {
            console.log(
              '\n' +
                turnTableId[_0xab7d7d].name +
                ' 登录: API查询请求失败 \u203C️\u203C️'
            )
            console.log('' + JSON.stringify(_0x222c3f))
          } else {
            if (_0xa951e3) {
              _0xa951e3 = JSON.parse(_0xa951e3)
              if (_0xa951e3.success && _0xa951e3.data) {
                _0xa951e3 = _0xa951e3.data
                if (_0xa951e3.hasSign === false) {
                  $.appId = 'b342e'
                  await _0x2d9f6d()
                  await _0x15fda0(_0xab7d7d, 1)
                  if ($.validate) {
                    if ($.validatorTime < 33) {
                      let _0x5046d9 =
                        Math.random() * 5000 + 33000 - $.validatorTime * 1000
                      console.log('等待' + (_0x5046d9 / 1000).toFixed(3) + '秒')
                      await $.wait(parseInt(_0x5046d9, 10))
                    }
                    await _0x15fda0(_0xab7d7d, 3)
                  }
                  let _0x55bc0c = Math.random() * 5000 + 32000
                  console.log('等待' + (_0x55bc0c / 1000).toFixed(3) + '秒')
                  await $.wait(parseInt(_0x55bc0c, 10))
                } else {
                  if (_0xa951e3.hasSign === true) {
                    if (_0xa951e3.records && _0xa951e3.records[0]) {
                      for (let _0xab7d7d in _0xa951e3.records) {
                        let _0x14c877 = _0xa951e3.records[_0xab7d7d]
                        if (
                          (_0x14c877.hasSign == false &&
                            _0x14c877.index != 1) ||
                          _0xab7d7d == _0xa951e3.records.length - 1
                        ) {
                          if (_0x14c877.hasSign == false) {
                            _0xab7d7d = _0xab7d7d - 1
                          }
                          break
                        }
                      }
                    }
                    signFlag = 1
                    console.log(turnTableId[_0xab7d7d].name + ' 已签到')
                  } else {
                    signFlag = 2
                    console.log(
                      turnTableId[_0xab7d7d].name +
                        ' 无法签到\n签到地址:' +
                        turnTableId[_0xab7d7d].url +
                        '\n'
                    )
                  }
                }
              } else {
                if (_0xa951e3.errorMessage) {
                  if (
                    _0xa951e3.errorMessage.indexOf('已签到') > -1 ||
                    _0xa951e3.errorMessage.indexOf('今天已经签到') > -1
                  ) {
                    signFlag = 1
                  }
                  console.log(
                    turnTableId[_0xab7d7d].name + ' ' + _0xa951e3.errorMessage
                  )
                } else {
                  console.log(
                    turnTableId[_0xab7d7d].name +
                      ' ' +
                      JSON.stringify(_0xa951e3)
                  )
                }
              }
            } else {
              console.log('京豆api返回数据为空\uFF0C请检查自身原因')
            }
          }
        } catch (_0x184512) {
          $.logErr(_0x184512, _0x180105)
        } finally {
          _0x44ed4d(_0xa951e3)
        }
      }
    )
  })
}
function _0x15fda0(_0x1db901, _0x15f60f) {
  return new Promise((_0x3dbf78) => {
    let _0x15f0a1 = _0x801f5f(turnTableId[_0x1db901].id)
    $.post(_0x15f0a1, async (_0x2bd418, _0x355611, _0x34fd5b) => {
      try {
        if (_0x2bd418) {
          console.log(
            '\n' +
              turnTableId[_0x1db901].name +
              ' 签到: API查询请求失败 \u203C️\u203C️'
          )
          throw new Error(_0x2bd418)
        } else {
          $.validate = ''
          let _0x2d9f02 = $.toObj(_0x34fd5b, _0x34fd5b)
          if (typeof _0x2d9f02 === 'object') {
            if (_0x2d9f02.success && _0x2d9f02.data) {
              let _0x19a7c7 = _0x2d9f02.data
              if (Number(_0x19a7c7.jdBeanQuantity) > 0) {
                beanNum += Number(_0x19a7c7.jdBeanQuantity)
              }
              signFlag = true
              console.log(
                turnTableId[_0x1db901].name +
                  ' 签到成功:获得 ' +
                  Number(_0x19a7c7.jdBeanQuantity) +
                  '京豆'
              )
            } else {
              if (_0x2d9f02.errorMessage) {
                if (
                  _0x2d9f02.errorMessage.indexOf('已签到') > -1 ||
                  _0x2d9f02.errorMessage.indexOf('今天已经签到') > -1
                ) {
                  signFlag = true
                } else {
                  if (_0x2d9f02.errorMessage.indexOf('进行验证') > -1) {
                    await injectToRequest('channelSign')
                  } else {
                    if (
                      _0x2d9f02.errorMessage.indexOf('火爆') > -1 &&
                      _0x15f60f == 2
                    ) {
                      await _0x15fda0(_0x1db901, 2)
                    } else {
                      console.log(
                        turnTableId[_0x1db901].name +
                          ' ' +
                          _0x2d9f02.errorMessage
                      )
                    }
                  }
                }
              } else {
                console.log(turnTableId[_0x1db901].name + ' ' + _0x34fd5b)
              }
            }
          } else {
            console.log(turnTableId[_0x1db901].name + ' ' + _0x34fd5b)
          }
        }
      } catch (_0x1699d6) {
        $.logErr(_0x1699d6, _0x355611)
      } finally {
        _0x3dbf78(_0x34fd5b)
      }
    })
  })
}
function _0x3c4417(_0x55282e) {
  return new Promise((_0x4d3fc4) => {
    const _0x3e0e06 = {
      url: 'https://gia.jd.com/fcf.html?a=' + _0x55282e.a,
      body: 'd=' + _0x55282e.d,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'User-Agent': $.UA,
      },
    }
    $.post(_0x3e0e06, async (_0x3ea131, _0x422f7f, _0x5cb46f) => {
      try {
        if (_0x3ea131) {
          console.log(
            '\n' + turnTableId[i].name + ' 登录: API查询请求失败 \u203C️\u203C️'
          )
          throw new Error(_0x3ea131)
        } else {
          if (_0x5cb46f.indexOf('*_*') > 0) {
            _0x5cb46f = _0x5cb46f.split('*_*', 2)
            _0x5cb46f = JSON.parse(_0x5cb46f[1])
            eid = _0x5cb46f.eid
          } else {
            console.log('京豆api返回数据为空\uFF0C请检查自身原因')
          }
        }
      } catch (_0x4b4221) {
        $.logErr(_0x4b4221, _0x422f7f)
      } finally {
        _0x4d3fc4(_0x5cb46f)
      }
    })
  })
}
function _0x5467ca(_0x4d1859) {
  let _0x477a43 = Date.now()
  let _0x272102 = { turnTableId: '' + _0x4d1859 }
  let _0x28c023 = [
    {
      key: 'appid',
      value: 'jdchoujiang_h5',
    },
    {
      key: 'body',
      value: $.CryptoJS.SHA256($.toStr(_0x272102, _0x272102)).toString(),
    },
    {
      key: 'client',
      value: '',
    },
    {
      key: 'clientVersion',
      value: '',
    },
    {
      key: 'functionId',
      value: 'turncardChannelDetail',
    },
    {
      key: 't',
      value: _0x477a43,
    },
  ]
  let _0x10cf60 = _0x3e999f(_0x28c023) || 'undefined'
  let _0x3a1b71 =
    'https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=' +
    _0x477a43 +
    '&functionId=turncardChannelDetail&body=' +
    JSON.stringify(_0x272102) +
    '&h5st=' +
    _0x10cf60
  return {
    url: _0x3a1b71,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-cn',
      Connection: 'keep-alive',
      Cookie: _0x4a2394,
      Origin: 'https://prodev.m.jd.com',
      Referer: 'https://prodev.m.jd.com/',
      'User-Agent': $.UA,
    },
  }
}
function _0x801f5f(_0x38a155) {
  let _0x427163 = Date.now()
  let _0x2e171d = {
    turnTableId: '' + _0x38a155,
    fp: fp,
    eid: eid,
  }
  if ($.validate) {
    _0x2e171d.validate = $.validate
  }
  let _0x2a1f03 = [
    {
      key: 'appid',
      value: 'jdchoujiang_h5',
    },
    {
      key: 'body',
      value: $.CryptoJS.SHA256($.toStr(_0x2e171d, _0x2e171d)).toString(),
    },
    {
      key: 'client',
      value: '',
    },
    {
      key: 'clientVersion',
      value: '',
    },
    {
      key: 'functionId',
      value: 'turncardChannelSign',
    },
    {
      key: 't',
      value: _0x427163,
    },
  ]
  let _0x5bf700 = _0x3e999f(_0x2a1f03) || 'undefined'
  let _0x4539e1 =
    'https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&functionId=turncardChannelSign&t=' +
    _0x427163 +
    '&body=' +
    JSON.stringify(_0x2e171d) +
    '&h5st=' +
    _0x5bf700
  return {
    url: _0x4539e1,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      Cookie: _0x4a2394,
      Origin: 'https://prodev.m.jd.com',
      Referer: 'https://prodev.m.jd.com/',
      'User-Agent': $.UA,
    },
  }
}
async function _0x2d9f6d() {
  var _0x1e8b18 = '',
    _0x463e35 = '0123456789',
    _0x1f91f8 = _0x463e35,
    _0x2ad5db = (Math.random() * 10) | 0
  do {
    ss =
      _0x490ee1({
        size: 1,
        customDict: _0x463e35,
      }) + ''
    if (_0x1e8b18.indexOf(ss) == -1) {
      _0x1e8b18 += ss
    }
  } while (_0x1e8b18.length < 3)
  for (let _0x13ce15 of _0x1e8b18.slice())
    _0x1f91f8 = _0x1f91f8.replace(_0x13ce15, '')
  $.fp =
    _0x490ee1({
      size: _0x2ad5db,
      customDict: _0x1f91f8,
    }) +
    '' +
    _0x1e8b18 +
    _0x490ee1({
      size: 14 - (_0x2ad5db + 3) + 1,
      customDict: _0x1f91f8,
    }) +
    _0x2ad5db +
    ''
  let _0x2e2fa0 = {
    url: 'https://cactus.jd.com/request_algo?g_ty=ajax',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      Origin: 'https://prodev.m.jd.com',
      Referer: 'https://prodev.m.jd.com/',
      'User-Agent': $.UA,
    },
    body:
      '{"version":"3.0","fp":"' +
      $.fp +
      '","appId":"' +
      $.appId +
      '","timestamp":' +
      Date.now() +
      ',"platform":"web","expandParams":""}',
  }
  return new Promise(async (_0x446d1a) => {
    $.post(_0x2e2fa0, (_0x3c8bf1, _0x1a6bbf, _0x36b9bc) => {
      try {
        const { ret, msg, data: { result } = {} } = JSON.parse(data)
        $.token = result.tk
        $.genKey = new Function('return ' + result.algo)()
      } catch (_0x197c86) {
        $.logErr(_0x197c86, _0x1a6bbf)
      } finally {
        _0x446d1a()
      }
    })
  })
}
function _0x490ee1() {
  var _0x51e9b4,
    _0x10025e,
    _0x138ff1 =
      void 0 ===
      (_0x2596dd = (_0x10025e =
        0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {})
        .size)
        ? 10
        : _0x2596dd,
    _0x2596dd =
      void 0 === (_0x2596dd = _0x10025e.dictType) ? 'number' : _0x2596dd,
    _0x57309b = ''
  if ((_0x10025e = _0x10025e.customDict) && 'string' == typeof _0x10025e) {
    _0x51e9b4 = _0x10025e
  } else {
    switch (_0x2596dd) {
      case 'alphabet':
        _0x51e9b4 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
        break
      case 'max':
        _0x51e9b4 =
          '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-'
        break
      case 'number':
      default:
        _0x51e9b4 = '0123456789'
    }
  }
  for (; _0x138ff1--; ) {
    _0x57309b += _0x51e9b4[(Math.random() * _0x51e9b4.length) | 0]
  }
  return _0x57309b
}
function _0x3e999f(_0x99b0af) {
  let _0x3565ea = _0x99b0af
    .map(function (_0x31bafc) {
      return _0x31bafc.key + ':' + _0x31bafc.value
    })
    .join('&')
  let _0x2d200d = Date.now()
  let _0x24e173 = ''
  let _0x5efcf3 = format('yyyyMMddhhmmssSSS', _0x2d200d)
  _0x24e173 = $.genKey(
    $.token,
    $.fp.toString(),
    _0x5efcf3.toString(),
    $.appId.toString(),
    $.CryptoJS
  ).toString()
  const _0x4c0d6a = $.CryptoJS.HmacSHA256(
    _0x3565ea,
    _0x24e173.toString()
  ).toString()
  let _0x53e013 = [
    ''.concat(_0x5efcf3.toString()),
    ''.concat($.fp.toString()),
    ''.concat($.appId.toString()),
    ''.concat($.token),
    ''.concat(_0x4c0d6a),
    '3.0',
    ''.concat(_0x2d200d),
  ].join(';')
  return _0x53e013
}
async function _0x510a31(_0x2e1258) {
  return new Promise((_0x44e05e) => {
    $.get(
      {
        url: 'https://pro.m.jd.com/mall/active/' + _0x2e1258 + '/index.html',
        headers: {
          Cookie: _0x4a2394,
          'User-Agent': 'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)',
        },
      },
      async (_0x1c19aa, _0x5c0357, _0x264399) => {
        try {
          $.title = _0x5c0357.body.match(/"title":"(.*?)"/)
            ? _0x5c0357.body.match(/"title":"(.*?)"/)[1]
            : '无title'
          console.log($.title)
          $.encryptProjectId = _0x5c0357.body.match(
            /"encryptProjectId\\":\\"(.*?)\\"/
          )
            ? _0x5c0357.body.match(/"encryptProjectId\\":\\"(.*?)\\"/)[1]
            : ''
          $.encryptAssignmentId = _0x5c0357.body.match(
            /"encryptAssignmentId\\":\\"(.*?)\\"/
          )
            ? _0x5c0357.body.match(/"encryptAssignmentId\\":\\"(.*?)\\"/)[1]
            : ''
          if ($.encryptProjectId) {
            await _0x318fef($.encryptProjectId, $.encryptAssignmentId)
          } else {
            console.log(_0x2e1258 + '---失效')
          }
          _0x44e05e()
        } catch (_0x3686b5) {
          console.log(_0x3686b5)
        }
      }
    )
  })
}
const _0x472b77 = require('fs')
const _0x375c4c = require('vm')
let _0x61d86a = _0x472b77.readFileSync('./function/signdps.js', 'utf-8')
const _0x33ac66 = new Function(),
  _0x4ea4e4 = {
    window: { addEventListener: _0x33ac66 },
    document: {
      addEventListener: _0x33ac66,
      removeEventListener: _0x33ac66,
    },
    navigator: {
      userAgent:
        'okhttp/3.12.1;jdmall;android;version/9.5.4;build/88136;screen/1440x3007;os/11;network/wifi;',
    },
  }
_0x375c4c.createContext(_0x4ea4e4)
_0x375c4c.runInContext(_0x61d86a, _0x4ea4e4)
_0x3b3b38 = _0x4ea4e4.window.smashUtils
function _0x4e1237(_0x53018f) {
  let _0x4f6882 = _0x3b3b38.getRandom(8),
    _0x543053 = _0x3b3b38.get_risk_result({
      id: _0x4f6882,
      data: { random: _0x4f6882 },
    }).log,
    _0x246959 = {
      extParam: {
        forceBot: '1',
        businessData: { random: _0x4f6882 },
        signStr: _0x543053,
      },
    }
  return {
    ..._0x246959,
    ..._0x53018f,
  }
}
async function _0x318fef(_0x2a5e69, _0x5d84ab) {
  return new Promise(async (_0x59d580) => {
    $.post(
      _0x4a7537('doInteractiveAssignment', {
        encryptProjectId: _0x2a5e69,
        encryptAssignmentId: _0x5d84ab,
        activity_id: '3SC6rw5iBg66qrXPGmZMqFDwcyXi',
        sourceCode: 'acetttsign',
        itemId: '1',
        completionFlag: 'true',
        template_id: '00019605',
        floor_id: '76228505',
        enc: 'CB9D2ACCB912AC9FE1DC40B8CE3E7AC42D969450D3750BC68D0EA5C042367859799CEFECDD011CC8FD70756EE3AEC447',
      }),
      async (_0xa6f229, _0x3091d9, _0x699bfe) => {
        try {
          if (_0xa6f229) {
            console.log('' + JSON.stringify(_0xa6f229))
            console.log(
              'doInteractiveAssignment API请求失败\uFF0C请检查网路重试'
            )
          } else {
            if (_0x387ee6(_0x699bfe)) {
              _0x699bfe = JSON.parse(_0x699bfe)
              if (_0x699bfe.subCode == '0' && _0x699bfe.rewardsInfo) {
                if (
                  _0x699bfe.rewardsInfo.successRewards['3'] &&
                  _0x699bfe.rewardsInfo.successRewards['3'].length != 0
                ) {
                  console.log(
                    _0x699bfe.rewardsInfo.successRewards['3'][0].rewardName +
                      ',获得' +
                      _0x699bfe.rewardsInfo.successRewards['3'][0].quantity +
                      '京豆'
                  )
                } else {
                  if (_0x699bfe.rewardsInfo.failRewards.length != 0) {
                    console.log(
                      '失败\uFF1A' + _0x699bfe.rewardsInfo.failRewards[0].msg
                    )
                  }
                }
              } else {
                console.log(_0x699bfe.msg)
              }
            }
          }
        } catch (_0x431441) {
          $.logErr(_0x431441, _0x3091d9)
        } finally {
          _0x59d580(_0x699bfe)
        }
      }
    )
  })
}
function _0x4a7537(_0x1db6c1, _0x367db3 = {}) {
  _0x367db3 = _0x4e1237(_0x367db3)
  return {
    url:
      _0x210294 +
      '?functionId=' +
      _0x1db6c1 +
      '&body=' +
      JSON.stringify(_0x367db3) +
      '&appid=babelh5&sign=11&t=1653132222710}',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1',
      Referer: 'https://pro.m.jd.com',
      Cookie: _0x4a2394,
    },
  }
}
function _0x439b28() {
  return new Promise(async (_0x8be85e) => {
    const _0x2c302c = {
      url: 'https://wq.jd.com/user_new/info/GetJDUserInfoUnion?sceneval=2',
      headers: {
        Host: 'wq.jd.com',
        Accept: '*/*',
        Connection: 'keep-alive',
        Cookie: _0x4a2394,
        'User-Agent': $.isNode()
          ? process.env.JD_USER_AGENT
            ? process.env.JD_USER_AGENT
            : require('./USER_AGENTS').USER_AGENT
          : $.getdata('JDUA')
          ? $.getdata('JDUA')
          : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
        'Accept-Language': 'zh-cn',
        Referer: 'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&',
        'Accept-Encoding': 'gzip, deflate, br',
      },
    }
    $.get(_0x2c302c, (_0x496469, _0xeee054, _0x34f1c0) => {
      try {
        if (_0x496469) {
          $.logErr(_0x496469)
        } else {
          if (_0x34f1c0) {
            _0x34f1c0 = JSON.parse(_0x34f1c0)
            if (_0x34f1c0.retcode === 1001) {
              $.isLogin = false
              return
            }
            if (
              _0x34f1c0.retcode === 0 &&
              _0x34f1c0.data &&
              _0x34f1c0.data.hasOwnProperty('userInfo')
            ) {
              $.nickName = _0x34f1c0.data.userInfo.baseInfo.nickname
            }
          } else {
            console.log('京东服务器返回空数据')
          }
        }
      } catch (_0x2cbb52) {
        $.logErr(_0x2cbb52)
      } finally {
        _0x8be85e()
      }
    })
  })
}
function _0x5f06a5() {
  return new Promise((_0xc9cec0) => {
    if (!_0x570eb4) {
      $.msg($.name, '', '' + _0x116778)
    } else {
      $.log('京东账号' + $.index + $.nickName + '\n' + _0x116778)
    }
    _0xc9cec0()
  })
}
function _0x387ee6(_0x482433) {
  try {
    if (typeof JSON.parse(_0x482433) == 'object') {
      return true
    }
  } catch (_0x1d4711) {
    console.log(_0x1d4711)
    console.log('京东服务器访问数据为空\uFF0C请检查自身设备网络情况')
    return false
  }
}

// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }