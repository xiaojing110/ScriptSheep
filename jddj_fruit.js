/*
v6.3
京东到家果园任务脚本,支持qx,loon,shadowrocket,surge,nodejs
兼容京东jdCookie.js
手机设备在boxjs里填写cookie
boxjs订阅地址:https://gitee.com/passerby-b/javascript/raw/master/JD/passerby-b.boxjs.json

[task_local]
10 0,3,8,11,17 * * * https://raw.githubusercontent.com/passerby-b/JDDJ/main/jddj_fruit.js

[Script]
cron "10 0,3,8,11,17 * * *" script-path=https://raw.githubusercontent.com/passerby-b/JDDJ/main/jddj_fruit.js,tag=京东到家果园任务

*/

let isNotify = true;//是否通知,仅限nodejs
let ckPath = './jdCookie.js';//ck路径,环境变量:JDDJ_CKPATH

const _0x3bfb29 = (function () {
    let _0x59f41c = true
    return function (_0x2b89d6, _0x332be3) {
      const _0x294e8a = _0x59f41c
        ? function () {
            if (_0x332be3) {
              const _0x29c5b3 = _0x332be3.apply(_0x2b89d6, arguments)
              return (_0x332be3 = null), _0x29c5b3
            }
          }
        : function () {}
      return (_0x59f41c = false), _0x294e8a
    }
  })(),
  _0x12808f = _0x3bfb29(this, function () {
    return _0x12808f
      .toString()
      .search('(((.+)+)+)+$')
      .toString()
      .constructor(_0x12808f)
      .search('(((.+)+)+)+$')
  })
_0x12808f()
const $ = new API('jddj_fruit')
let thiscookie = '',
  deviceid = '',
  nickname = '',
  lat = '30.' + Math.round(Math.random() * 89999 + 10000),
  lng = '114.' + Math.round(Math.random() * 89999 + 10000),
  cityid = Math.round(Math.random() * 500 + 1000),
  cookies = [],
  notify = ''
waterNum = 0
waterTimes = 0
shareCode = ''
hzstr = ''
msgStr = ''
!(async () => {
  if (cookies.length == 0) {
    if ($.env.isNode) {
      if (process.env.JDDJ_CKPATH) {
        ckPath = process.env.JDDJ_CKPATH
      }
      delete require.cache[ckPath]
      let _0x213d57 = require(ckPath)
      for (let _0x4d4768 in _0x213d57)
        if (!!_0x213d57[_0x4d4768]) {
          cookies.push(_0x213d57[_0x4d4768])
        }
    } else {
      let _0x53407c = $.read('#jddj_cookies')
      if (!!_0x53407c) {
        if (_0x53407c.indexOf(',') < 0) {
          cookies.push(_0x53407c)
        } else {
          cookies = _0x53407c.split(',')
        }
      }
    }
  }
  if (cookies.length == 0) {
    console.log('\r\n请先填写cookie')
    return
  }
  if (!$.env.isNode) {
    isNotify = $.read('#jddj_isNotify')
  } else {
    notify = require('./sendNotify')
  }
  let _0x1b718a =
    cookies.length > Math.sqrt(400) ? Math.sqrt(400) : cookies.length
  for (let _0x1a8ae6 = 0; _0x1a8ae6 < _0x1b718a; _0x1a8ae6++) {
    console.log(
      '\r\n\u2605\u2605\u2605\u2605\u2605开始执行第' +
        (_0x1a8ae6 + 1) +
        '个账号,共' +
        cookies.length +
        '个账号\u2605\u2605\u2605\u2605\u2605'
    )
    thiscookie = cookies[_0x1a8ae6]
    if (!thiscookie) {
      continue
    }
    waterNum = 0
    waterTimes = 0
    thiscookie = thiscookie.replace(/ /g, '').replace(/\n/g, '')
    thiscookie = await taskLoginUrl(thiscookie)
    if (!thiscookie) {
      console.log('京东ck转到家ck失败!')
      continue
    }
    let _0x1aba97 = await userinfo()
    if (_0x1aba97 != 0) {
      $.notify(
        '第' + (_0x1a8ae6 + 1) + '个账号cookie过期',
        '请访问\nhttps://bean.m.jd.com/bean/signIndex.action\n抓取cookie',
        { url: 'https://bean.m.jd.com/bean/signIndex.action' }
      )
      $.env.isNode &&
        '' + isNotify + '' == 'true' &&
        (await notify.sendNotify(
          '第' + (_0x1a8ae6 + 1) + '个账号cookie过期',
          '请访问\nhttps://bean.m.jd.com/bean/signIndex.action\n抓取cookie'
        ))
      continue
    }
    await $.wait(1000)
    await treeInfo(0)
    await $.wait(1000)
    let _0x268d45 = await taskList()
    await $.wait(1000)
    await waterBottle()
    await $.wait(1000)
    await runTask(_0x268d45)
    await $.wait(1000)
    await zhuLi()
    await $.wait(1000)
    await water()
    await $.wait(1000)
    hzstr = ''
    _0x268d45 = await taskList()
    if (_0x268d45 && _0x268d45.result && _0x268d45.result.taskInfoList) {
      for (
        let _0x288a92 = 0;
        _0x288a92 < _0x268d45.result.taskInfoList.length;
        _0x288a92++
      ) {
        let _0x2a88e4 = _0x268d45.result.taskInfoList[_0x288a92]
        if (_0x2a88e4.taskId == '23eee1c043c01bc') {
          shareCode += '@' + _0x2a88e4.uniqueId + ','
          hzstr =
            ',助力' +
            _0x2a88e4.finishNum +
            '/' +
            _0x2a88e4.totalNum +
            ',助力你的好友:'
          _0x2a88e4.fissionUserInfoList &&
            _0x2a88e4.fissionUserInfoList.length > 0 &&
            (_0x2a88e4.fissionUserInfoList.forEach((_0x36e884) => {
              hzstr += _0x36e884.nickName + ','
            }),
            (hzstr = hzstr.substr(0, hzstr.length - 1)))
          break
        }
      }
    }
    await treeInfo(2)
    await $.wait(1000)
  }
  console.log('京东到家果园互助码:/dj_fruit ' + shareCode)
  if ((new Date().getUTCHours() + 8) % 24 < 8) {
    $.notify('京东到家果园互助码:', '', shareCode)
    $.env.isNode &&
      '' + isNotify + '' == 'true' &&
      notify.sendNotify('京东到家果园互助码:', '/dj_fruit ' + shareCode)
  }
  if ($.env.isNode && '' + isNotify + '' == 'true') {
    await notify.sendNotify('京东到家果园信息', msgStr)
  }
  if (!process.env.SCF_NAMESPACE) {
    $.write(shareCode, 'shareCodes')
  } else {
    console.log('\u25C6\u25C6\u25C6云函数无法内部助力!\u25C6\u25C6\u25C6')
  }
  new Date(getZoneTime(8)).getHours() == 12 &&
    shareCode &&
    (await $.http
      .post({
        url: 'http://106.13.233.51:8080/commitJddjCode',
        headers: { 'Content-Type': 'application/json' },
        body: '{"codes":"' + shareCode + '"}',
      })
      .then((_0x5036a2) => {
        console.log('\u3010提交助力码\u3011:' + _0x5036a2.body)
      }))
})()
  .catch(async (_0xae515a) => {
    console.log('', '\u274C失败! 原因:' + _0xae515a + '!', '')
    $.env.isNode &&
      '' + isNotify + '' == 'true' &&
      notify.sendNotify('京东到家果园', '\u274C失败! 原因:' + _0xae515a + '!')
  })
  .finally(() => {
    $.done()
  })
async function userinfo() {
  return new Promise(async (_0x4071b5) => {
    try {
      let _0x580ecc = Math.round(new Date()),
        _0x179950 = urlTask(
          'https://daojia.jd.com/client?channel=wx_xcx&platform=5.0.0&platCode=mini&mpChannel=wx_xcx&appVersion=8.10.5&xcxVersion=8.10.1&appName=paidaojia&functionId=mine%2FgetUserAccountInfo&isForbiddenDialog=false&isNeedDealError=false&isNeedDealLogin=false&body=%7B%22cityId%22%3A' +
            cityid +
            '%2C%22fromSource%22%3A%225%22%7D&afsImg=&lat_pos=' +
            lat +
            '&lng_pos=' +
            lng +
            '&lat=' +
            lat +
            '&lng=' +
            lng +
            '&city_id=' +
            cityid +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid +
            '&deviceModel=appmodel&business=&traceId=' +
            deviceid +
            _0x580ecc +
            '&channelCode=',
          ''
        ),
        _0x3f5a79 = 1
      await $.http.get(_0x179950).then((_0x1776f6) => {
        let _0x12466e = JSON.parse(_0x1776f6.body)
        _0x3f5a79 = _0x12466e.code
        if (_0x12466e.code == 0) {
          try {
            ;(nickname = _0x12466e.result.userInfo.userBaseInfo.nickName),
              console.log(
                '\u25CF\u25CF\u25CF' + nickname + '\u25CF\u25CF\u25CF'
              )
          } catch (_0xfca1a0) {
            nickname = '昵称获取失败'
          }
        } else {
          nickname = '昵称获取失败'
        }
      })
      _0x4071b5(_0x3f5a79)
    } catch (_0x5bbb14) {
      console.log('\n\u3010个人信息\u3011:' + _0x5bbb14), _0x4071b5(1)
    }
  })
}
async function taskList() {
  return new Promise(async (_0x86ff8) => {
    try {
      let _0x5d6723 = Math.round(new Date()),
        _0x34b0f2 = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            _0x5d6723 +
            '&_funid_=task/list',
          'functionId=task%2Flist&isNeedDealError=true&body=%7B%22modelId%22%3A%22M10007%22%2C%22plateCode%22%3A4%7D&lat=' +
            lat +
            '&lng=' +
            lng +
            '&lat_pos=' +
            lat +
            '&lng_pos=' +
            lng +
            '&city_id=' +
            cityid +
            '&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            _0x5d6723 +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid +
            '&_jdrandom=' +
            _0x5d6723 +
            '&_funid_=task%2Flist'
        )
      _0x34b0f2.url += '&' + _0x34b0f2.body
      $.http.get(_0x34b0f2).then((_0x4c6289) => {
        let _0x195dec = JSON.parse(_0x4c6289.body)
        _0x86ff8(_0x195dec)
      })
    } catch (_0x24cb1d) {
      console.log('\n\u3010任务列表\u3011:' + _0x24cb1d)
      _0x86ff8({})
    }
  })
}
async function water() {
  return new Promise(async (_0x9ffc6) => {
    try {
      let _0x5d3a4b = Math.round(new Date()),
        _0x41f337 = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            _0x5d3a4b +
            '&_funid_=fruit/watering',
          'functionId=fruit%2Fwatering&isNeedDealError=true&method=POST&body=%7B%22waterTime%22%3A1%7D&lat=' +
            lat +
            '&lng=' +
            lng +
            '&lat_pos=' +
            lat +
            '&lng_pos=' +
            lng +
            '&city_id=1381&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            _0x5d3a4b +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid +
            '&_jdrandom=' +
            _0x5d3a4b +
            '&_funid_=fruit%2Fwatering'
        ),
        _0x4a191a = 1,
        _0x347b47 = 0
      do {
        _0x347b47++
        console.log('\n**********开始执行第' + _0x347b47 + '次浇水**********')
        await $.http.post(_0x41f337).then((_0x40b1d2) => {
          let _0xb83957 = JSON.parse(_0x40b1d2.body)
          console.log('\n\u3010浇水\u3011:' + _0xb83957.msg)
          _0x4a191a = _0xb83957.code
          if (_0xb83957.code == 0) {
            waterTimes++
          }
        })
        await $.wait(1000)
      } while (_0x4a191a == 0)
      _0x9ffc6()
    } catch (_0x386603) {
      console.log('\n\u3010浇水\u3011:' + _0x386603)
      _0x9ffc6()
    }
  })
}
async function sign() {
  return new Promise(async (_0x15f207) => {
    try {
      let _0x30ed5f = urlTask(
        'https://daojia.jd.com/client?_jdrandom=' +
          Math.round(new Date()) +
          '&functionId=signin%2FuserSigninNew&isNeedDealError=true&body=%7B%22channel%22%3A%22daojiaguoyuan%22%2C%22cityId%22%3A' +
          cityid +
          '%2C%22longitude%22%3A' +
          lng +
          '%2C%22latitude%22%3A' +
          lat +
          '%2C%22ifCic%22%3A0%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
          deviceid +
          '&deviceToken=' +
          deviceid +
          '&deviceId=' +
          deviceid,
        ''
      )
      $.http.get(_0x30ed5f).then((_0x5cbed3) => {
        let _0x51ec45 = JSON.parse(_0x5cbed3.body)
        console.log('\n\u3010到家签到\u3011:' + _0x51ec45.msg)
        _0x15f207()
      })
    } catch (_0x7d29b6) {
      console.log('\n\u3010到家签到领水滴\u3011:' + _0x7d29b6)
      _0x15f207()
    }
  })
}
async function waterBottle() {
  return new Promise(async (_0x28c54f) => {
    try {
      let _0x588706,
        _0xf25483 = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            Math.round(new Date()) +
            '&functionId=fruit%2FgetWaterBottleInfo&isNeedDealError=true&body=%7B%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            Math.round(new Date()) +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid,
          ''
        )
      await $.http.get(_0xf25483).then((_0x31a011) => {
        const _0x214bc3 = JSON.parse(_0x31a011.body)
        _0x214bc3.code == 0
          ? ((_0x588706 = _0x214bc3.result.receiveStatus),
            console.log(
              '\n\u3010收玻璃瓶水滴\u3011:水瓶中有:' +
                _0x214bc3.result.yesterdayAccumulate +
                '水滴'
            ))
          : console.log('\n\u3010收玻璃瓶水滴\u3011:水瓶信息错误')
      })
      if (_0x588706 == 0) {
        ;(_0xf25483 = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            Math.round(new Date()) +
            '&functionId=fruit%2FreceiveWaterBottle&isNeedDealError=true&body=%7B%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            Math.round(new Date()) +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid,
          ''
        )),
          await $.http.get(_0xf25483).then((_0x203380) => {
            const _0x400053 = JSON.parse(_0x203380.body)
            if (_0x400053.code == 0) {
              console.log('\n\u3010收玻璃瓶水滴\u3011:水瓶收取成功')
            } else {
              console.log('\n\u3010收玻璃瓶水滴\u3011:水瓶收取错误')
            }
          })
      } else {
        if (_0x588706 == 1) {
          console.log('\n\u3010收玻璃瓶水滴\u3011:水瓶已经收取过')
        } else {
          if (_0x588706 == -2) {
            console.log('\n\u3010收玻璃瓶水滴\u3011:收取时间未到')
          } else {
            console.log('\n\u3010收玻璃瓶水滴\u3011:水瓶状态错误或暂不可收取:')
          }
        }
      }
      _0x28c54f()
    } catch (_0x245d6d) {
      console.log('\n\u3010收玻璃瓶水滴\u3011:' + _0x245d6d), _0x28c54f()
    }
  })
}
async function zhuLi() {
  return new Promise(async (resolve) => {
    try {
      let _0x36a493 = [],
        _0x411d4c = ''
      try {
        await $.http
          .get({
            url: '',
            timeout: 20000,
          })
          .then((_0x5e86d1) => {
            _0x411d4c += _0x5e86d1.body
          })
        if (new Date().getHours() < 8 && $.read('shareCodes')) {
          _0x411d4c += $.read('shareCodes')
        }
      } catch (_0x41d707) {}
      _0x411d4c = _0x411d4c.replace(/ /g, '').replace(/\n/g, '')
      !!_0x411d4c &&
        ((_0x411d4c = _0x411d4c.substr(0, _0x411d4c.length - 1)),
        (_0x36a493 = _0x411d4c.split(',')))
      for (let _0x427f8e = 0; _0x427f8e < _0x36a493.length; _0x427f8e++) {
        let _0x304267 = urlTask(
            'https://daojia.jd.com/client?lat=' +
              lat +
              '&lng=' +
              lng +
              '&lat_pos=' +
              lat +
              '&lng_pos=' +
              lng +
              '&city_id=' +
              cityid +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid +
              '&channel=wx_xcx&mpChannel=wx_xcx&platform=5.0.0&platCode=mini&appVersion=5.0.0&appName=paidaojia&deviceModel=appmodel&xcxVersion=9.2.0&isNeedDealError=true&business=djgyzhuli&functionId=task%2Ffinished&body=%7B%22modelId%22%3A%22M10007%22%2C%22taskType%22%3A1201%2C%22taskId%22%3A%2223eee1c043c01bc%22%2C%22plateCode%22%3A5%2C%22assistTargetPin%22%3A%22' +
              _0x36a493[_0x427f8e].split('@')[0] +
              '%22%2C%22uniqueId%22%3A%22' +
              _0x36a493[_0x427f8e].split('@')[1] +
              '%22%7D',
            ''
          ),
          _0x2be02b = 0
        await $.http.get(_0x304267).then((_0x217f3d) => {
          let _0x204205 = JSON.parse(_0x217f3d.body)
          if (_0x204205.code == 0) {
            console.log('\n\u3010助力\u3011:' + _0x204205.msg)
          } else {
            console.log(
              '\n\u3010助力\u3011:' +
                _0x204205.msg +
                ',你的助力次数已用完或对方助力已满!'
            )
            _0x2be02b = 1
          }
        })
        await $.wait(1000)
        if (_0x2be02b == 1) {
          break
        }
      }
      resolve()
    } catch (e) {
      console.log('\n\u3010助力\u3011:' + e), resolve()
    }
  })
}
async function _runTask(_0x1a941d) {
  return new Promise(async (_0x57cf2c) => {
    try {
      for (
        let _0x38fedd = 0;
        _0x38fedd < _0x1a941d.result.taskInfoList.length;
        _0x38fedd++
      ) {
        const _0x4f6a6b = _0x1a941d.result.taskInfoList[_0x38fedd]
        if (_0x4f6a6b.taskType == 307 || _0x4f6a6b.taskType == 901) {
          let _0x1512b0 = urlTask(
            'https://daojia.jd.com/client?_jdrandom=' +
              Math.round(new Date()) +
              '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
              _0x4f6a6b.modelId +
              '%22%2C%22taskId%22%3A%22' +
              encodeURIComponent(_0x4f6a6b.taskId) +
              '%22%2C%22taskType%22%3A' +
              _0x4f6a6b.taskType +
              '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
              deviceid +
              Math.round(new Date()) +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid,
            ''
          )
          await $.http.get(_0x1512b0).then((_0x36ba1b) => {
            var _0x4edb42 = JSON.parse(_0x36ba1b.body),
              _0x18370c = ''
            _0x4edb42.code == 0
              ? (_0x18370c =
                  _0x4edb42.msg + ',奖励:' + _0x4edb42.result.awardValue)
              : (_0x18370c = _0x4edb42.msg)
            console.log(
              '\n领取任务\u3010' + _0x4f6a6b.taskTitle + '\u3011:' + _0x18370c
            )
          })
        }
        if (_0x4f6a6b.browseTime > -1) {
          for (
            let _0x300707 = 0;
            _0x300707 < parseInt(_0x4f6a6b.browseTime);
            _0x300707++
          ) {
            await $.wait(1000), console.log('计时:' + (_0x300707 + 1) + '秒...')
          }
        }
        option = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            Math.round(new Date()) +
            '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
            _0x4f6a6b.modelId +
            '%22%2C%22taskId%22%3A%22' +
            encodeURIComponent(_0x4f6a6b.taskId) +
            '%22%2C%22taskType%22%3A' +
            _0x4f6a6b.taskType +
            '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            Math.round(new Date()) +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid,
          ''
        )
        await $.http.get(option).then((_0x3be443) => {
          var _0x17f026 = JSON.parse(_0x3be443.body),
            _0x361903 = ''
          _0x17f026.code == 0
            ? (_0x361903 =
                _0x17f026.msg + ',奖励:' + _0x17f026.result.awardValue)
            : (_0x361903 = _0x17f026.msg)
          console.log(
            '\n任务完成\u3010' + _0x4f6a6b.taskTitle + '\u3011:' + _0x361903
          )
        })
        option = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            Math.round(new Date()) +
            '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
            _0x4f6a6b.modelId +
            '%22%2C%22taskId%22%3A%22' +
            encodeURIComponent(_0x4f6a6b.taskId) +
            '%22%2C%22taskType%22%3A' +
            _0x4f6a6b.taskType +
            '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            Math.round(new Date()) +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid,
          ''
        )
        await $.http.get(option).then((_0x5a5b30) => {
          var _0x32e0fd = JSON.parse(_0x5a5b30.body),
            _0x17f67a = ''
          if (_0x32e0fd.code == 0) {
            _0x17f67a = _0x32e0fd.msg + ',奖励:' + _0x32e0fd.result.awardValue
          } else {
            _0x17f67a = _0x32e0fd.msg
          }
          console.log(
            '\n领取奖励\u3010' + _0x4f6a6b.taskTitle + '\u3011:' + _0x17f67a
          )
        })
      }
      _0x57cf2c()
    } catch (_0x193879) {
      console.log('\n\u3010执行任务\u3011:' + _0x193879), _0x57cf2c()
    }
  })
}
const do_tasks = [307, 901, 1102, 1105, 1103, 0, 1101]
async function runTask(_0x3363d1) {
  return new Promise(async (_0x298764) => {
    try {
      if (!_0x3363d1 || !_0x3363d1.result || !_0x3363d1.result.taskInfoList) {
        console.log('\n任务列表获取失败,跳过做任务.....')
        _0x298764()
        return
      }
      for (
        let _0x17fcea = 0;
        _0x17fcea < _0x3363d1.result.taskInfoList.length;
        _0x17fcea++
      ) {
        const _0x3c1682 = _0x3363d1.result.taskInfoList[_0x17fcea]
        if (_0x3c1682.status == 3 || _0x3c1682.status == 2) {
          console.log(
            '\n\u3010' + _0x3c1682.taskTitle + '\u3011: 任务已完成,跳过做任务'
          )
        } else {
          if (_0x3c1682.taskType == 502) {
            await sign()
          } else {
            if (do_tasks.includes(_0x3c1682.taskType)) {
              if (_0x3c1682.status == 0) {
                let _0x1833b1 = urlTask(
                  'https://daojia.jd.com/client?_jdrandom=' +
                    Math.round(new Date()) +
                    '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
                    _0x3c1682.modelId +
                    '%22%2C%22taskId%22%3A%22' +
                    encodeURIComponent(_0x3c1682.taskId) +
                    '%22%2C%22taskType%22%3A' +
                    _0x3c1682.taskType +
                    '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
                    deviceid +
                    Math.round(new Date()) +
                    '&deviceToken=' +
                    deviceid +
                    '&deviceId=' +
                    deviceid,
                  ''
                )
                await $.http.get(_0x1833b1).then((_0xf459ea) => {
                  let _0x10c3ba = JSON.parse(_0xf459ea.body),
                    _0x2c95f6 = ''
                  if (_0x10c3ba.code == 0) {
                    _0x2c95f6 =
                      _0x10c3ba.msg + ',奖励:' + _0x10c3ba.result.awardValue
                  } else {
                    _0x2c95f6 = _0x10c3ba.msg
                  }
                  console.log(
                    '\n领取任务\u3010' +
                      _0x3c1682.taskTitle +
                      '\u3011:' +
                      _0x2c95f6
                  )
                })
                if (_0x3c1682.browseTime > -1) {
                  for (
                    let _0x4315d7 = 0;
                    _0x4315d7 < parseInt(_0x3c1682.browseTime);
                    _0x4315d7++
                  ) {
                    await $.wait(1000),
                      console.log('计时:' + (_0x4315d7 + 1) + '秒...')
                  }
                }
              } else {
                console.log(
                  '\n\u3010' +
                    _0x3c1682.taskTitle +
                    '\u3011: 任务已领取或不需要领取'
                )
              }
              _0x3c1682.taskType != 0 &&
                ((option = urlTask(
                  'https://daojia.jd.com/client?_jdrandom=' +
                    Math.round(new Date()) +
                    '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
                    _0x3c1682.modelId +
                    '%22%2C%22taskId%22%3A%22' +
                    encodeURIComponent(_0x3c1682.taskId) +
                    '%22%2C%22taskType%22%3A' +
                    _0x3c1682.taskType +
                    '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
                    deviceid +
                    Math.round(new Date()) +
                    '&deviceToken=' +
                    deviceid +
                    '&deviceId=' +
                    deviceid,
                  ''
                )),
                await $.http.get(option).then((_0x1a0179) => {
                  let _0x4a22a1 = JSON.parse(_0x1a0179.body),
                    _0x29bd85 = ''
                  if (_0x4a22a1.code == 0) {
                    _0x29bd85 =
                      _0x4a22a1.msg + ',奖励:' + _0x4a22a1.result.awardValue
                    _0x3c1682.status = 2
                  } else {
                    _0x29bd85 = _0x4a22a1.msg
                  }
                  console.log(
                    '\n任务完成\u3010' +
                      _0x3c1682.taskTitle +
                      '\u3011:' +
                      _0x29bd85
                  )
                }))
            } else {
              console.log(
                '\n\u3010' +
                  _0x3c1682.taskTitle +
                  '\u3011: 脚本无法执行此任务或任务不需要主动完成'
              )
            }
          }
        }
        if (_0x3c1682.status == 2 || _0x3c1682.taskTypes == 1102) {
          ;(option = urlTask(
            'https://daojia.jd.com/client?_jdrandom=' +
              Math.round(new Date()) +
              '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
              _0x3c1682.modelId +
              '%22%2C%22taskId%22%3A%22' +
              encodeURIComponent(_0x3c1682.taskId) +
              '%22%2C%22taskType%22%3A' +
              _0x3c1682.taskType +
              '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
              deviceid +
              Math.round(new Date()) +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid,
            ''
          )),
            await $.http.get(option).then((_0x2ddfbb) => {
              let _0xa035db = JSON.parse(_0x2ddfbb.body),
                _0x267898 = ''
              if (_0xa035db.code == 0) {
                _0x267898 =
                  _0xa035db.msg + ',奖励:' + _0xa035db.result.awardValue
              } else {
                _0x267898 = _0xa035db.msg
              }
              console.log(
                '\n领取奖励\u3010' + _0x3c1682.taskTitle + '\u3011:' + _0x267898
              )
            })
        } else {
          if (_0x3c1682.status == 3) {
            console.log(
              '\n\u3010' + _0x3c1682.taskTitle + '\u3011: 奖励已领取,跳过领奖励'
            )
          } else {
            console.log(
              '\n\u3010' + _0x3c1682.taskTitle + '\u3011: 任务未完成,跳过领奖励'
            )
          }
        }
      }
      _0x298764()
    } catch (_0x12b76f) {
      console.log('\n\u3010执行任务\u3011:' + _0x12b76f)
      _0x298764()
    }
  })
}
async function runTask2(_0x2e0db0) {
  return new Promise(async (_0xf5c5b3) => {
    try {
      for (
        let _0x586125 = 0;
        _0x586125 < _0x2e0db0.result.taskInfoList.length;
        _0x586125++
      ) {
        const _0xa85e58 = _0x2e0db0.result.taskInfoList[_0x586125]
        if (_0xa85e58.taskTitle.indexOf('限时') > -1) {
          let _0xdc7129 = urlTask(
            'https://daojia.jd.com/client?_jdrandom=' +
              Math.round(new Date()) +
              '&functionId=task%2Freceived&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
              _0xa85e58.modelId +
              '%22%2C%22taskId%22%3A%22' +
              encodeURIComponent(_0xa85e58.taskId) +
              '%22%2C%22taskType%22%3A' +
              _0xa85e58.taskType +
              '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
              deviceid +
              Math.round(new Date()) +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid,
            ''
          )
          await $.http.get(_0xdc7129).then((_0x3dc81f) => {
            var _0x1706bd = JSON.parse(_0x3dc81f.body),
              _0x2fa7a6 = ''
            _0x1706bd.code == 0
              ? (_0x2fa7a6 =
                  _0x1706bd.msg + ',奖励:' + _0x1706bd.result.awardValue)
              : (_0x2fa7a6 = _0x1706bd.msg)
            console.log(
              '\n领取任务\u3010' + _0xa85e58.taskTitle + '\u3011:' + _0x2fa7a6
            )
          })
          if (_0xa85e58.browseTime > -1) {
            for (
              let _0x5771a9 = 0;
              _0x5771a9 < parseInt(_0xa85e58.browseTime);
              _0x5771a9++
            ) {
              await $.wait(1000)
              console.log('计时:' + (_0x5771a9 + 1) + '秒...')
            }
          }
          _0xdc7129 = urlTask(
            'https://daojia.jd.com/client?_jdrandom=' +
              Math.round(new Date()) +
              '&functionId=task%2Ffinished&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
              _0xa85e58.modelId +
              '%22%2C%22taskId%22%3A%22' +
              encodeURIComponent(_0xa85e58.taskId) +
              '%22%2C%22taskType%22%3A' +
              _0xa85e58.taskType +
              '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
              deviceid +
              Math.round(new Date()) +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid,
            ''
          )
          await $.http.get(_0xdc7129).then((_0x4dabc9) => {
            var _0x2a7833 = JSON.parse(_0x4dabc9.body),
              _0x3a7118 = ''
            _0x2a7833.code == 0
              ? (_0x3a7118 =
                  _0x2a7833.msg + ',奖励:' + _0x2a7833.result.awardValue)
              : (_0x3a7118 = _0x2a7833.msg)
            console.log(
              '\n任务完成\u3010' + _0xa85e58.taskTitle + '\u3011:' + _0x3a7118
            )
          })
          _0xdc7129 = urlTask(
            'https://daojia.jd.com/client?_jdrandom=' +
              Math.round(new Date()) +
              '&functionId=task%2FsendPrize&isNeedDealError=true&body=%7B%22modelId%22%3A%22' +
              _0xa85e58.modelId +
              '%22%2C%22taskId%22%3A%22' +
              encodeURIComponent(_0xa85e58.taskId) +
              '%22%2C%22taskType%22%3A' +
              _0xa85e58.taskType +
              '%2C%22plateCode%22%3A1%2C%22subNode%22%3Anull%7D&channel=ios&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
              deviceid +
              Math.round(new Date()) +
              '&deviceToken=' +
              deviceid +
              '&deviceId=' +
              deviceid,
            ''
          )
          await $.http.get(_0xdc7129).then((_0x2f1c96) => {
            var _0x5bd475 = JSON.parse(_0x2f1c96.body),
              _0xb688e5 = ''
            _0x5bd475.code == 0
              ? (_0xb688e5 =
                  _0x5bd475.msg + ',奖励:' + _0x5bd475.result.awardValue)
              : (_0xb688e5 = _0x5bd475.msg)
            console.log(
              '\n领取奖励\u3010' + _0xa85e58.taskTitle + '\u3011:' + _0xb688e5
            )
          })
        }
      }
      _0xf5c5b3()
    } catch (_0x41ef26) {
      console.log('\n\u3010执行任务\u3011:' + _0x41ef26)
      _0xf5c5b3()
    }
  })
}
async function treeInfo(_0x48097e) {
  return new Promise(async (_0x168d59) => {
    try {
      let _0x30e0f7 = Math.round(new Date()),
        _0xdabc25 = urlTask(
          'https://daojia.jd.com/client?_jdrandom=' +
            _0x30e0f7 +
            '&_funid_=fruit/initFruit',
          'functionId=fruit%2FinitFruit&isNeedDealError=true&method=POST&body=%7B%22cityId%22%3A%22' +
            cityid +
            '%22%2C%22longitude%22%3A' +
            lng +
            '%2C%22latitude%22%3A' +
            lat +
            '%7D&lat=' +
            lat +
            '&lng=' +
            lng +
            '&lat_pos=' +
            lat +
            '&lng_pos=' +
            lng +
            '&city_id=' +
            cityid +
            '&channel=rn&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&traceId=' +
            deviceid +
            _0x30e0f7 +
            '&deviceToken=' +
            deviceid +
            '&deviceId=' +
            deviceid +
            '&_jdrandom=' +
            _0x30e0f7 +
            '&_funid_=fruit%2FinitFruit'
        )
      await $.http.post(_0xdabc25).then(async (_0xdcc81e) => {
        let _0x3bfdf1 = JSON.parse(_0xdcc81e.body)
        if (_0x3bfdf1.code == 0) {
          _0x48097e == 0 &&
            ((waterNum = _0x3bfdf1.result.userResponse.waterBalance),
            (shareCode += _0x3bfdf1.result.activityInfoResponse.userPin))
          if (_0x48097e == 2) {
            waterNum =
              waterTimes * 10 +
              _0x3bfdf1.result.userResponse.waterBalance -
              waterNum
            if (waterNum < 0) {
              waterNum = 0
            }
            _0x3bfdf1.result.activityInfoResponse.curStageLeftProcess == 0 &&
              (console.log(
                '\n京东到家果园\u3010' +
                  nickname +
                  '\u3011:' +
                  _0x3bfdf1.result.activityInfoResponse.fruitName +
                  '已成熟,快去收取!'
              ),
              $.notify(
                '京东到家果园',
                '\u3010' + nickname + '\u3011',
                '京东到家果园' +
                  _0x3bfdf1.result.activityInfoResponse.fruitName +
                  '已成熟,快去收取!'
              ),
              $.env.isNode &&
                '' + isNotify + '' == 'true' &&
                (msgStr +=
                  '\r\n\u3010' +
                  nickname +
                  '\u3011\r\n京东到家果园' +
                  _0x3bfdf1.result.activityInfoResponse.fruitName +
                  '已成熟,快去收取!'))
            if (_0x3bfdf1.result.activityInfoResponse.curStageLeftProcess > 0) {
              let _0x57f1ec = '次'
              if (_0x3bfdf1.result.activityInfoResponse.growingStage == 5) {
                _0x57f1ec = '%'
              }
              console.log(
                '\n京东到家果园\u3010' +
                  nickname +
                  '\u3011:' +
                  _0x3bfdf1.result.activityInfoResponse.fruitName +
                  ',本次领取' +
                  waterNum +
                  '滴水,浇水' +
                  waterTimes +
                  '次,还需浇水' +
                  _0x3bfdf1.result.activityInfoResponse.curStageLeftProcess +
                  _0x57f1ec +
                  _0x3bfdf1.result.activityInfoResponse.stageName +
                  ',还剩' +
                  _0x3bfdf1.result.userResponse.waterBalance +
                  '滴水' +
                  hzstr
              )
              $.notify(
                '京东到家果园',
                '\u3010' + nickname + '\u3011',
                _0x3bfdf1.result.activityInfoResponse.fruitName +
                  ',本次领取' +
                  waterNum +
                  '滴水,浇水' +
                  waterTimes +
                  '次,还需浇水' +
                  _0x3bfdf1.result.activityInfoResponse.curStageLeftProcess +
                  _0x57f1ec +
                  _0x3bfdf1.result.activityInfoResponse.stageName +
                  ',还剩' +
                  _0x3bfdf1.result.userResponse.waterBalance +
                  '滴水' +
                  hzstr
              )
              $.env.isNode &&
                '' + isNotify + '' == 'true' &&
                (msgStr +=
                  '\r\n\u3010' +
                  nickname +
                  '\u3011\r\n' +
                  _0x3bfdf1.result.activityInfoResponse.fruitName +
                  ',本次领取' +
                  waterNum +
                  '滴水,浇水' +
                  waterTimes +
                  '次,还需浇水' +
                  _0x3bfdf1.result.activityInfoResponse.curStageLeftProcess +
                  _0x57f1ec +
                  _0x3bfdf1.result.activityInfoResponse.stageName +
                  ',还剩' +
                  _0x3bfdf1.result.userResponse.waterBalance +
                  '滴水' +
                  hzstr)
            }
          }
        }
        _0x168d59()
      })
    } catch (_0x3524fb) {
      console.log('\n\u3010果树信息\u3011:' + _0x3524fb)
      _0x168d59()
    } finally {
      treeInfoTimes = true
    }
  })
}
function urlTask(_0x51acf7, _0x2b6f19) {
  let _0x251c3e = decodeURIComponent(_0x2b6f19).split('&'),
    _0x2663ab = ''
  if (_0x2b6f19 && _0x251c3e.length > 0) {
    let _0x47c42e = {},
      _0x49488f = [],
      _0x53856d = []
    for (const _0x42b1f5 of _0x251c3e) {
      let _0x171461 = _0x42b1f5.split('=')
      !!_0x171461[1] &&
        _0x171461[0] != 'functionId' &&
        _0x171461[0] != 'signKeyV1' &&
        ((_0x47c42e[_0x171461[0]] = _0x171461[1]), _0x49488f.push(_0x171461[0]))
    }
    _0x49488f = _0x49488f.sort()
    _0x49488f.forEach((_0x32b2db) => {
      _0x53856d.push(_0x47c42e[_0x32b2db])
    })
    const _0x2836d3 = '923047ae3f8d11d8b19aeb9f3d1bc200'
    _0x2663ab = hex_hmac_sha256(_0x2836d3, _0x53856d.join('&'))
  }
  let _0x5eeeeb = {
    url: _0x51acf7,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;',
      Cookie: thiscookie,
      Connection: 'keep-alive',
      Accept: '*/*',
      'User-Agent':
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148________appName=jdLocal&platform=iOS&deviceId=' +
        deviceid +
        '&commonParams={"cityId":"' +
        cityid +
        '","djAppVersion":"8.11.0","latitude":"' +
        lat +
        '","longitude":"' +
        lng +
        '","sharePackageVersion":"2"}&djAppVersion=8.11.0&supportDJSHWK&isElderEnable=0&isElderBigFont=0',
      'Accept-Language': 'zh-cn',
    },
    body: _0x2b6f19 + '&signKeyV1=' + _0x2663ab,
  }
  return _0x5eeeeb
}
async function taskLoginUrl(_0x2afe38) {
  return new Promise(async (_0x4a98f7) => {
    try {
      if (_0x2afe38.indexOf('deviceid_pdj_jd') > -1) {
        let _0x15c843 = _0x2afe38.split(';')
        for (const _0x55ad80 of _0x15c843) {
          _0x55ad80.indexOf('deviceid_pdj_jd') > -1 &&
            (deviceid = _0x55ad80.split('=')[1])
        }
        _0x4a98f7(_0x2afe38)
      } else {
        deviceid = _uuid()
        let _0x3a910b = {
            url: encodeURI(
              'http://daojia.jd.com/client?_jdrandom=' +
                +new Date() +
                '&_funid_=login/treasure&functionId=login/treasure&body={}&lat=&lng=&lat_pos=&lng_pos=&city_id=&channel=h5&platform=6.6.0&platCode=h5&appVersion=6.6.0&appName=paidaojia&deviceModel=appmodel&isNeedDealError=false&traceId=' +
                deviceid +
                '&deviceToken=' +
                deviceid +
                '&deviceId=' +
                deviceid +
                '&_jdrandom=' +
                +new Date() +
                '&_funid_=login/treasure'
            ),
            headers: {
              Cookie: 'deviceid_pdj_jd=' + deviceid + ';' + _0x2afe38 + ';',
              Host: 'daojia.jd.com',
              'Content-Type': 'application/x-www-form-urlencoded;',
              'User-Agent':
                'jdapp;iPhone;10.0.10;14.1;' +
                deviceid +
                ';network/wifi;model/iPhone11,6;appBuild/167764;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            },
          },
          _0x15b248 = ''
        await $.http.get(_0x3a910b).then(async (_0x5640a2) => {
          let _0x32f1db = JSON.parse(_0x5640a2.body)
          if (_0x32f1db.code == 0) {
            for (const _0xbc34af in _0x5640a2.headers) {
              _0xbc34af.toLowerCase().indexOf('cookie') > -1 &&
                (_0x15b248 = _0x5640a2.headers[_0xbc34af].toString())
            }
            _0x15b248 += ';deviceid_pdj_jd=' + deviceid
          } else {
            console.log(_0x32f1db.msg)
          }
        })
        _0x4a98f7(_0x15b248)
      }
    } catch (_0x5a1f78) {
      console.log(_0x5a1f78)
      _0x4a98f7('')
    }
  })
}
function _uuid() {
  function _0x52652a() {
    return Math.floor((1 + Math.random()) * 65536)
      .toString(16)
      .substring(1)
  }
  return (
    _0x52652a() +
    _0x52652a() +
    '-' +
    _0x52652a() +
    '-' +
    _0x52652a() +
    '-' +
    _0x52652a() +
    '-' +
    _0x52652a() +
    _0x52652a() +
    _0x52652a()
  )
}
function getZoneTime(_0x2cc281) {
  var _0x2432ca = new Date()
  var _0x1829b1 = _0x2432ca.getTime()
  var _0x5c0c07 = _0x2432ca.getTimezoneOffset() * 60000
  var _0x267a40 = _0x5c0c07 + _0x1829b1
  var _0x5f3487 = _0x267a40 + 3600000 * _0x2cc281
  var _0xb22d60 = new Date(_0x5f3487)
  return (
    _0xb22d60.toDateString() +
    ' ' +
    _0xb22d60.getHours() +
    ':' +
    _0xb22d60.getMinutes() +
    ':' +
    _0xb22d60.getSeconds()
  )
}

/*********************************** API *************************************/
function ENV() { const e = "undefined" != typeof $task, t = "undefined" != typeof $loon, s = "undefined" != typeof $httpClient && !t, i = "function" == typeof require && "undefined" != typeof $jsbox; return { isQX: e, isLoon: t, isSurge: s, isNode: "function" == typeof require && !i, isJSBox: i, isRequest: "undefined" != typeof $request, isScriptable: "undefined" != typeof importModule } } function HTTP(e = { baseURL: "" }) { const { isQX: t, isLoon: s, isSurge: i, isScriptable: n, isNode: o } = ENV(), r = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/; const u = {}; return ["GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS", "PATCH"].forEach(l => u[l.toLowerCase()] = (u => (function (u, l) { l = "string" == typeof l ? { url: l } : l; const h = e.baseURL; h && !r.test(l.url || "") && (l.url = h ? h + l.url : l.url); const a = (l = { ...e, ...l }).timeout, c = { onRequest: () => { }, onResponse: e => e, onTimeout: () => { }, ...l.events }; let f, d; if (c.onRequest(u, l), t) f = $task.fetch({ method: u, ...l }); else if (s || i || o) f = new Promise((e, t) => { (o ? require("request") : $httpClient)[u.toLowerCase()](l, (s, i, n) => { s ? t(s) : e({ statusCode: i.status || i.statusCode, headers: i.headers, body: n }) }) }); else if (n) { const e = new Request(l.url); e.method = u, e.headers = l.headers, e.body = l.body, f = new Promise((t, s) => { e.loadString().then(s => { t({ statusCode: e.response.statusCode, headers: e.response.headers, body: s }) }).catch(e => s(e)) }) } const p = a ? new Promise((e, t) => { d = setTimeout(() => (c.onTimeout(), t(`${u} URL: ${l.url} exceeds the timeout ${a} ms`)), a) }) : null; return (p ? Promise.race([p, f]).then(e => (clearTimeout(d), e)) : f).then(e => c.onResponse(e)) })(l, u))), u } function API(e = "untitled", t = !1) { const { isQX: s, isLoon: i, isSurge: n, isNode: o, isJSBox: r, isScriptable: u } = ENV(); return new class { constructor(e, t) { this.name = e, this.debug = t, this.http = HTTP(), this.env = ENV(), this.node = (() => { if (o) { return { fs: require("fs") } } return null })(), this.initCache(); Promise.prototype.delay = function (e) { return this.then(function (t) { return ((e, t) => new Promise(function (s) { setTimeout(s.bind(null, t), e) }))(e, t) }) } } initCache() { if (s && (this.cache = JSON.parse($prefs.valueForKey(this.name) || "{}")), (i || n) && (this.cache = JSON.parse($persistentStore.read(this.name) || "{}")), o) { let e = "root.json"; this.node.fs.existsSync(e) || this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.root = {}, e = `${this.name}.json`, this.node.fs.existsSync(e) ? this.cache = JSON.parse(this.node.fs.readFileSync(`${this.name}.json`)) : (this.node.fs.writeFileSync(e, JSON.stringify({}), { flag: "wx" }, e => console.log(e)), this.cache = {}) } } persistCache() { const e = JSON.stringify(this.cache, null, 2); s && $prefs.setValueForKey(e, this.name), (i || n) && $persistentStore.write(e, this.name), o && (this.node.fs.writeFileSync(`${this.name}.json`, e, { flag: "w" }, e => console.log(e)), this.node.fs.writeFileSync("root.json", JSON.stringify(this.root, null, 2), { flag: "w" }, e => console.log(e))) } write(e, t) { if (this.log(`SET ${t}`), -1 !== t.indexOf("#")) { if (t = t.substr(1), n || i) return $persistentStore.write(e, t); if (s) return $prefs.setValueForKey(e, t); o && (this.root[t] = e) } else this.cache[t] = e; this.persistCache() } read(e) { return this.log(`READ ${e}`), -1 === e.indexOf("#") ? this.cache[e] : (e = e.substr(1), n || i ? $persistentStore.read(e) : s ? $prefs.valueForKey(e) : o ? this.root[e] : void 0) } delete(e) { if (this.log(`DELETE ${e}`), -1 !== e.indexOf("#")) { if (e = e.substr(1), n || i) return $persistentStore.write(null, e); if (s) return $prefs.removeValueForKey(e); o && delete this.root[e] } else delete this.cache[e]; this.persistCache() } notify(e, t = "", l = "", h = {}) { const a = h["open-url"], c = h["media-url"]; if (s && $notify(e, t, l, h), n && $notification.post(e, t, l + `${c ? "\n多媒体:" + c : ""}`, { url: a }), i) { let s = {}; a && (s.openUrl = a), c && (s.mediaUrl = c), "{}" === JSON.stringify(s) ? $notification.post(e, t, l) : $notification.post(e, t, l, s) } if (o || u) { const s = l + (a ? `\n点击跳转: ${a}` : "") + (c ? `\n多媒体: ${c}` : ""); if (r) { require("push").schedule({ title: e, body: (t ? t + "\n" : "") + s }) } else console.log(`${e}\n${t}\n${s}\n\n`) } } log(e) { this.debug && console.log(`[${this.name}] LOG: ${this.stringify(e)}`) } info(e) { console.log(`[${this.name}] INFO: ${this.stringify(e)}`) } error(e) { console.log(`[${this.name}] ERROR: ${this.stringify(e)}`) } wait(e) { return new Promise(t => setTimeout(t, e)) } done(e = {}) { console.log('done!'); s || i || n ? $done(e) : o && !r && "undefined" != typeof $context && ($context.headers = e.headers, $context.statusCode = e.statusCode, $context.body = e.body) } stringify(e) { if ("string" == typeof e || e instanceof String) return e; try { return JSON.stringify(e, null, 2) } catch (e) { return "[object Object]" } } }(e, t) }
/*****************************************************************************/

/*********************************** SHA256 *************************************/
var hexcase=0;var b64pad="";function hex_sha256(s){return rstr2hex(rstr_sha256(str2rstr_utf8(s)))}function b64_sha256(s){return rstr2b64(rstr_sha256(str2rstr_utf8(s)))}function any_sha256(s,e){return rstr2any(rstr_sha256(str2rstr_utf8(s)),e)}function hex_hmac_sha256(k,d){return rstr2hex(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)))}function b64_hmac_sha256(k,d){return rstr2b64(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)))}function any_hmac_sha256(k,d,e){return rstr2any(rstr_hmac_sha256(str2rstr_utf8(k),str2rstr_utf8(d)),e)}function sha256_vm_test(){return hex_sha256("abc").toLowerCase()=="ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"}function rstr_sha256(s){return binb2rstr(binb_sha256(rstr2binb(s),s.length*8))}function rstr_hmac_sha256(key,data){var bkey=rstr2binb(key);if(bkey.length>16)bkey=binb_sha256(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C}var hash=binb_sha256(ipad.concat(rstr2binb(data)),512+data.length*8);return binb2rstr(binb_sha256(opad.concat(hash),512+256))}function rstr2hex(input){try{hexcase}catch(e){hexcase=0}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F)}return output}function rstr2b64(input){try{b64pad}catch(e){b64pad=''}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F)}}return output}function rstr2any(input,encoding){var divisor=encoding.length;var remainders=Array();var i,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1)}while(dividend.length>0){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)quotient[quotient.length]=q}remainders[remainders.length]=x;dividend=quotient}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));for(i=output.length;i<full_length;i++)output=encoding[0]+output;return output}function str2rstr_utf8(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++}if(x<=0x7F)output+=String.fromCharCode(x);else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F))}return output}function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output}function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output}function rstr2binb(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++)output[i]=0;for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(24-i%32);return output}function binb2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(24-i%32))&0xFF);return output}function sha256_S(X,n){return(X>>>n)|(X<<(32-n))}function sha256_R(X,n){return(X>>>n)}function sha256_Ch(x,y,z){return((x&y)^((~x)&z))}function sha256_Maj(x,y,z){return((x&y)^(x&z)^(y&z))}function sha256_Sigma0256(x){return(sha256_S(x,2)^sha256_S(x,13)^sha256_S(x,22))}function sha256_Sigma1256(x){return(sha256_S(x,6)^sha256_S(x,11)^sha256_S(x,25))}function sha256_Gamma0256(x){return(sha256_S(x,7)^sha256_S(x,18)^sha256_R(x,3))}function sha256_Gamma1256(x){return(sha256_S(x,17)^sha256_S(x,19)^sha256_R(x,10))}function sha256_Sigma0512(x){return(sha256_S(x,28)^sha256_S(x,34)^sha256_S(x,39))}function sha256_Sigma1512(x){return(sha256_S(x,14)^sha256_S(x,18)^sha256_S(x,41))}function sha256_Gamma0512(x){return(sha256_S(x,1)^sha256_S(x,8)^sha256_R(x,7))}function sha256_Gamma1512(x){return(sha256_S(x,19)^sha256_S(x,61)^sha256_R(x,6))}var sha256_K=new Array(1116352408,1899447441,-1245643825,-373957723,961987163,1508970993,-1841331548,-1424204075,-670586216,310598401,607225278,1426881987,1925078388,-2132889090,-1680079193,-1046744716,-459576895,-272742522,264347078,604807628,770255983,1249150122,1555081692,1996064986,-1740746414,-1473132947,-1341970488,-1084653625,-958395405,-710438585,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,-2117940946,-1838011259,-1564481375,-1474664885,-1035236496,-949202525,-778901479,-694614492,-200395387,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,-2067236844,-1933114872,-1866530822,-1538233109,-1090935817,-965641998);function binb_sha256(m,l){var HASH=new Array(1779033703,-1150833019,1013904242,-1521486534,1359893119,-1694144372,528734635,1541459225);var W=new Array(64);var a,b,c,d,e,f,g,h;var i,j,T1,T2;m[l>>5]|=0x80<<(24-l%32);m[((l+64>>9)<<4)+15]=l;for(i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(j=0;j<64;j++){if(j<16)W[j]=m[j+i];else W[j]=safe_add(safe_add(safe_add(sha256_Gamma1256(W[j-2]),W[j-7]),sha256_Gamma0256(W[j-15])),W[j-16]);T1=safe_add(safe_add(safe_add(safe_add(h,sha256_Sigma1256(e)),sha256_Ch(e,f,g)),sha256_K[j]),W[j]);T2=safe_add(sha256_Sigma0256(a),sha256_Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2)}HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7])}return HASH}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF)}
/*********************************** SHA256 *************************************/
