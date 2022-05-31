'use strict'
var _0x2a0cf8 =
  (this && this.__assign) ||
  function () {
    _0x2a0cf8 =
      Object.assign ||
      function (_0x40053e) {
        for (
          var _0x46c934, _0x58a8e4 = 1, _0x2eff3f = arguments.length;
          _0x58a8e4 < _0x2eff3f;
          _0x58a8e4++
        ) {
          _0x46c934 = arguments[_0x58a8e4]
          for (var _0x10e23b in _0x46c934)
            if (Object.prototype.hasOwnProperty.call(_0x46c934, _0x10e23b)) {
              _0x40053e[_0x10e23b] = _0x46c934[_0x10e23b]
            }
        }
        return _0x40053e
      }
    return _0x2a0cf8.apply(this, arguments)
  }
var _0x37038f =
  (this && this.__awaiter) ||
  function (_0x55193, _0x4ccbaa, _0x4056ac, _0xcb886a) {
    function _0x2d8071(_0x418e7a) {
      return _0x418e7a instanceof _0x4056ac
        ? _0x418e7a
        : new _0x4056ac(function (_0x2ce1b8) {
            _0x2ce1b8(_0x418e7a)
          })
    }
    return new (_0x4056ac || (_0x4056ac = Promise))(function (
      _0x47b097,
      _0x17e79f
    ) {
      function _0x2e4946(_0x500b0a) {
        try {
          _0x5eead2(_0xcb886a.next(_0x500b0a))
        } catch (_0x47e85c) {
          _0x17e79f(_0x47e85c)
        }
      }
      function _0xead3be(_0x4ec743) {
        try {
          _0x5eead2(_0xcb886a.throw(_0x4ec743))
        } catch (_0x3fac8b) {
          _0x17e79f(_0x3fac8b)
        }
      }
      function _0x5eead2(_0x2e04b9) {
        _0x2e04b9.done
          ? _0x47b097(_0x2e04b9.value)
          : _0x2d8071(_0x2e04b9.value).then(_0x2e4946, _0xead3be)
      }
      _0x5eead2((_0xcb886a = _0xcb886a.apply(_0x55193, _0x4ccbaa || [])).next())
    })
  }
var _0x1969ad =
  (this && this.__generator) ||
  function (_0x57d3b2, _0x5432ee) {
    var _0x1cfd03 = {
        label: 0,
        sent: function () {
          if (_0x5b4238[0] & 1) {
            throw _0x5b4238[1]
          }
          return _0x5b4238[1]
        },
        trys: [],
        ops: [],
      },
      _0x4ecdae,
      _0xe5ecf6,
      _0x5b4238,
      _0x42a33e
    return (
      (_0x42a33e = {
        next: _0xce4b10(0),
        throw: _0xce4b10(1),
        return: _0xce4b10(2),
      }),
      typeof Symbol === 'function' &&
        (_0x42a33e[Symbol.iterator] = function () {
          return this
        }),
      _0x42a33e
    )
    function _0xce4b10(_0x4accc8) {
      return function (_0x2764a4) {
        return _0x960b41([_0x4accc8, _0x2764a4])
      }
    }
    function _0x960b41(_0x48729e) {
      if (_0x4ecdae) {
        throw new TypeError('Generator is already executing.')
      }
      while (_0x1cfd03) {
        try {
          if (
            ((_0x4ecdae = 1),
            _0xe5ecf6 &&
              (_0x5b4238 =
                _0x48729e[0] & 2
                  ? _0xe5ecf6.return
                  : _0x48729e[0]
                  ? _0xe5ecf6.throw ||
                    ((_0x5b4238 = _0xe5ecf6.return) &&
                      _0x5b4238.call(_0xe5ecf6),
                    0)
                  : _0xe5ecf6.next) &&
              !(_0x5b4238 = _0x5b4238.call(_0xe5ecf6, _0x48729e[1])).done)
          ) {
            return _0x5b4238
          }
          if (((_0xe5ecf6 = 0), _0x5b4238)) {
            _0x48729e = [_0x48729e[0] & 2, _0x5b4238.value]
          }
          switch (_0x48729e[0]) {
            case 0:
            case 1:
              _0x5b4238 = _0x48729e
              break
            case 4:
              _0x1cfd03.label++
              return {
                value: _0x48729e[1],
                done: false,
              }
            case 5:
              _0x1cfd03.label++
              _0xe5ecf6 = _0x48729e[1]
              _0x48729e = [0]
            case 7:
              _0x48729e = _0x1cfd03.ops.pop()
              _0x1cfd03.trys.pop()
              continue
            default:
              if (
                !((_0x5b4238 = _0x1cfd03.trys),
                (_0x5b4238 =
                  _0x5b4238.length > 0 && _0x5b4238[_0x5b4238.length - 1])) &&
                (_0x48729e[0] === 6 || _0x48729e[0] === 2)
              ) {
                _0x1cfd03 = 0
                continue
              }
              if (
                _0x48729e[0] === 3 &&
                (!_0x5b4238 ||
                  (_0x48729e[1] > _0x5b4238[0] && _0x48729e[1] < _0x5b4238[3]))
              ) {
                _0x1cfd03.label = _0x48729e[1]
                break
              }
              if (_0x48729e[0] === 6 && _0x1cfd03.label < _0x5b4238[1]) {
                _0x1cfd03.label = _0x5b4238[1]
                _0x5b4238 = _0x48729e
                break
              }
              if (_0x5b4238 && _0x1cfd03.label < _0x5b4238[2]) {
                _0x1cfd03.label = _0x5b4238[2]
                _0x1cfd03.ops.push(_0x48729e)
                break
              }
              if (_0x5b4238[2]) {
                _0x1cfd03.ops.pop()
              }
              _0x1cfd03.trys.pop()
              continue
          }
          _0x48729e = _0x5432ee.call(_0x57d3b2, _0x1cfd03)
        } catch (_0x4228de) {
          _0x48729e = [6, _0x4228de]
          _0xe5ecf6 = 0
        } finally {
          _0x4ecdae = _0x5b4238 = 0
        }
      }
      if (_0x48729e[0] & 5) {
        throw _0x48729e[1]
      }
      return {
        value: _0x48729e[0] ? _0x48729e[1] : void 0,
        done: true,
      }
    }
  }
var _0x4469c4 =
  (this && this.__values) ||
  function (_0xf25bf3) {
    var _0x470f12 = typeof Symbol === 'function' && Symbol.iterator,
      _0x2ac0f8 = _0x470f12 && _0xf25bf3[_0x470f12],
      _0x15d7f9 = 0
    if (_0x2ac0f8) {
      return _0x2ac0f8.call(_0xf25bf3)
    }
    if (_0xf25bf3 && typeof _0xf25bf3.length === 'number') {
      return {
        next: function () {
          if (_0xf25bf3 && _0x15d7f9 >= _0xf25bf3.length) {
            _0xf25bf3 = void 0
          }
          return {
            value: _0xf25bf3 && _0xf25bf3[_0x15d7f9++],
            done: !_0xf25bf3,
          }
        },
      }
    }
    throw new TypeError(
      _0x470f12 ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
    )
  }
var _0x42b563 =
  (this && this.__read) ||
  function (_0x382b7e, _0x1227d2) {
    var _0x3376b6 = typeof Symbol === 'function' && _0x382b7e[Symbol.iterator]
    if (!_0x3376b6) {
      return _0x382b7e
    }
    var _0x2b8bd5 = _0x3376b6.call(_0x382b7e),
      _0x52b4ee,
      _0x27e189 = [],
      _0xc0e0e6
    try {
      while (
        (_0x1227d2 === void 0 || _0x1227d2-- > 0) &&
        !(_0x52b4ee = _0x2b8bd5.next()).done
      ) {
        _0x27e189.push(_0x52b4ee.value)
      }
    } catch (_0x1240b8) {
      _0xc0e0e6 = { error: _0x1240b8 }
    } finally {
      try {
        if (_0x52b4ee && !_0x52b4ee.done && (_0x3376b6 = _0x2b8bd5.return)) {
          _0x3376b6.call(_0x2b8bd5)
        }
      } finally {
        if (_0xc0e0e6) {
          throw _0xc0e0e6.error
        }
      }
    }
    return _0x27e189
  }
var _0x586c2e =
  (this && this.__spreadArray) ||
  function (_0x47a7d9, _0x224dcb, _0x4c485a) {
    if (_0x4c485a || arguments.length === 2) {
      for (
        var _0x271e4d = 0, _0x1d46cb = _0x224dcb.length, _0x47a8ab;
        _0x271e4d < _0x1d46cb;
        _0x271e4d++
      ) {
        if (_0x47a8ab || !(_0x271e4d in _0x224dcb)) {
          if (!_0x47a8ab) {
            _0x47a8ab = Array.prototype.slice.call(_0x224dcb, 0, _0x271e4d)
          }
          _0x47a8ab[_0x271e4d] = _0x224dcb[_0x271e4d]
        }
      }
    }
    return _0x47a7d9.concat(_0x47a8ab || Array.prototype.slice.call(_0x224dcb))
  }
exports.__esModule = true
exports.JDHelloWorld = void 0
var _0x190bb3 = require('path')
var _0x2cd665 = require('dotenv')
var _0x27d72a = require('axios')
var _0x150de3 = require('child_process')
var _0x5c46be = require('fs')
var _0x5e1365 = require('./sendNotify')
var _0x3a01bb = require('ts-md5')
var _0x3e0935 = (function () {
  var _0x46113a = (function (_0x409ec1) {
    var _0x3dee3f = true
    return function (_0x50e382, _0x491b8e) {
      var _0xe034bf = _0x3dee3f
        ? function () {
            if (true && _0x491b8e) {
              var _0x2c077e = _0x491b8e.apply(_0x50e382, arguments)
              _0x491b8e = null
              return _0x2c077e
            }
          }
        : function (_0x409ec1) {}
      _0x3dee3f = false
      return _0xe034bf
    }
  })()
  var _0x1c620d = _0x46113a(this, function () {
    var _0x5c730c = function () {
        return 'dev'
      },
      _0x4aaba6 = function () {
        return 'window'
      }
    var _0x54c394 = function () {
      var _0x24d88f = new RegExp('\\w+ *\\(\\) *{\\w+ *[\'|"].+[\'|"];? *}')
      return !_0x24d88f.test(_0x5c730c.toString())
    }
    var _0x558288 = function () {
      var _0x5111e5 = new RegExp('(\\\\[x|u](\\w){2,4})+')
      return _0x5111e5.test(_0x4aaba6.toString())
    }
    var _0x5e6212 = function (_0x20917b) {
      var _0x55b9cd = ~-1 >> (1 + (255 % 0))
      if (_0x20917b.indexOf('i' === _0x55b9cd)) {
        _0x31544f(_0x20917b)
      }
    }
    var _0x31544f = function (_0x44aaf5) {
      var _0xc7bbb9 = ~-4 >> (1 + (255 % 0))
      if (_0x44aaf5.indexOf((true + '')[3]) !== _0xc7bbb9) {
        _0x5e6212(_0x44aaf5)
      }
    }
    if (!_0x54c394()) {
      if (!_0x558288()) {
        _0x5e6212('indеxOf')
      } else {
        _0x5e6212('indexOf')
      }
    } else {
      _0x5e6212('indеxOf')
    }
  })
  _0x1c620d()
  function _0x3e0935(_0x1e87a8) {
    if (_0x1e87a8 === void 0) {
      _0x1e87a8 = '...'
    }
    this.cookiesArr = []
    this.users = []
    this.scriptName = _0x1e87a8
    _0x2cd665.config({ path: ''.concat(__dirname, '/.env') })
  }
  _0x3e0935.prototype.getCookie = function () {
    return _0x37038f(this, void 0, void 0, function () {
      var _0x5bc982, _0x38a6eb, _0x2cc8c7, _0x200dd2, _0x4e5984, _0x2f3bcf
      var _0x177054, _0x1d63d6
      return _0x1969ad(this, function (_0x30bd8c) {
        _0x5bc982 = __dirname
        _0x38a6eb = require('./jdCookie.js')
        try {
          for (
            _0x2cc8c7 = _0x4469c4(Object.keys(_0x38a6eb)),
              _0x200dd2 = _0x2cc8c7.next();
            !_0x200dd2.done;
            _0x200dd2 = _0x2cc8c7.next()
          ) {
            _0x4e5984 = _0x200dd2.value
            this.cookiesArr.push(_0x38a6eb[_0x4e5984])
          }
        } catch (_0x8241f5) {
          _0x177054 = { error: _0x8241f5 }
        } finally {
          try {
            if (
              _0x200dd2 &&
              !_0x200dd2.done &&
              (_0x1d63d6 = _0x2cc8c7.return)
            ) {
              _0x1d63d6.call(_0x2cc8c7)
            }
          } finally {
            if (_0x177054) {
              throw _0x177054.error
            }
          }
        }
        if (Date.now() < 1654157635000) {
          if (
            _0x5bc982.includes('/ql/') &&
            _0x5bc982.includes('JDHelloWorld_jd_scripts')
          ) {
            try {
              ;(0, _0x5c46be.accessSync)(
                ''.concat(_0x5bc982, '/tsconfig.json'),
                _0x5c46be.constants.R_OK
              )
            } catch (_0x15dff4) {
              console.log('缺少tsconfig.json文件\uFF0C请检查')
              process.exit(0)
            }
          } else {
            try {
              _0x2f3bcf = ''
              try {
                ;(0, _0x5c46be.accessSync)(
                  ''.concat(_0x5bc982, '/.git'),
                  _0x5c46be.constants.R_OK
                )
                process.chdir(_0x5bc982)
                _0x2f3bcf = (0, _0x150de3.execSync)('git remote -v')
                  .toString()
                  .trim()
              } catch (_0x54be7f) {
                this.cookiesArr = []
              }
              if (!_0x2f3bcf.includes('JDHelloWorld/jd_scripts')) {
                this.cookiesArr = []
              }
            } catch (_0x3c8b90) {
              this.cookiesArr = []
            }
          }
        } else {
          this.cookiesArr = []
        }
        console.log('共'.concat(this.cookiesArr.length, '个京东账号'))
        return [2]
      })
    })
  }
  _0x3e0935.prototype.exceptCookie = function (_0x2b6626) {
    if (_0x2b6626 === void 0) {
      _0x2b6626 = 'x.ts'
    }
    var _0x359f7e = []
    try {
      ;(0, _0x5c46be.accessSync)(
        './utils/exceptCookie.json',
        _0x5c46be.constants.R_OK
      )
      _0x359f7e =
        JSON.parse(
          (0, _0x5c46be.readFileSync)('./utils/exceptCookie.json').toString() ||
            '{}'
        )[_0x2b6626] || []
    } catch (_0x442a0d) {}
    return _0x359f7e
  }
  _0x3e0935.prototype.get = function (_0x527232, _0x30e63e) {
    return new Promise(function (_0x72ec2e, _0x16ecd7) {
      _0x27d72a.default
        .get(_0x527232, { headers: _0x30e63e })
        .then(function (_0x2dcb52) {
          _0x72ec2e(_0x2dcb52.data)
        })
        .catch(function (_0xc4df21) {
          _0x16ecd7(_0xc4df21)
        })
    })
  }
  _0x3e0935.prototype.post = function (_0x1c3bbc, _0x978091, _0x492899) {
    return new Promise(function (_0x38f51b, _0x78f0cf) {
      _0x27d72a.default
        .post(_0x1c3bbc, _0x978091, { headers: _0x492899 })
        .then(function (_0x2c0662) {
          _0x38f51b(_0x2c0662.data)
        })
        .catch(function (_0x5bb716) {
          _0x78f0cf(_0x5bb716)
        })
    })
  }
  _0x3e0935.prototype.wait = function (_0x2eae16) {
    if (_0x2eae16 === void 0) {
      _0x2eae16 = 1000
    }
    return new Promise(function (_0x559657) {
      setTimeout(_0x559657, _0x2eae16)
    })
  }
  _0x3e0935.prototype.o2s = function (_0x119ed2, _0x25f89a) {
    console.log(
      _0x25f89a
        ? _0x25f89a + JSON.stringify(_0x119ed2)
        : JSON.stringify(_0x119ed2)
    )
  }
  _0x3e0935.prototype.getShareCodePool = function (_0x5260cf, _0x1d3555) {
    return _0x37038f(this, void 0, void 0, function () {
      var _0x27c53c, _0x232efe, _0x427af4, _0x530f30
      return _0x1969ad(this, function (_0x29bd78) {
        switch (_0x29bd78.label) {
          case 0:
            _0x27c53c = []
            _0x232efe = 0
            _0x29bd78.label = 1
          case 1:
            if (!(_0x232efe < 3)) {
              return [3, 7]
            }
            _0x29bd78.label = 2
          case 2:
            _0x29bd78.trys.push([2, 4, , 6])
            return [
              4,
              _0x27d72a.default.get(
                'https://api.jdsharecode.xyz/api/'
                  .concat(_0x5260cf, '/')
                  .concat(_0x1d3555)
              ),
            ]
          case 3:
            _0x427af4 = _0x29bd78.sent().data
            _0x27c53c = _0x427af4.data || []
            console.log(
              '随机获取'
                .concat(_0x1d3555, '个')
                .concat(_0x5260cf, '成功\uFF1A')
                .concat(JSON.stringify(_0x27c53c))
            )
            if (_0x27c53c.length !== 0) {
              return [3, 7]
            }
            return [3, 6]
          case 4:
            _0x530f30 = _0x29bd78.sent()
            console.log('getShareCodePool Error, Retry...')
            return [4, this.wait(this.getRandomNumberByRange(2000, 6000))]
          case 5:
            _0x29bd78.sent()
            return [3, 6]
          case 6:
            _0x232efe++
            return [3, 1]
          case 7:
            return [2, _0x27c53c]
        }
      })
    })
  }
  _0x3e0935.prototype.getshareCodeHW = function (_0x2dabf1) {
    return _0x37038f(this, void 0, void 0, function () {
      var _0x161b8b, _0x42dfd4, _0x21246a, _0x41f7fc
      return _0x1969ad(this, function (_0x5e9f58) {
        switch (_0x5e9f58.label) {
          case 0:
            _0x161b8b = []
            _0x42dfd4 = 0
            _0x5e9f58.label = 1
          case 1:
            if (!(_0x42dfd4 < 5)) {
              return [3, 7]
            }
            _0x5e9f58.label = 2
          case 2:
            _0x5e9f58.trys.push([2, 4, , 6])
            return [4, this.get('https://api.jdsharecode.xyz/api/HW_CODES')]
          case 3:
            _0x21246a = _0x5e9f58.sent()
            _0x161b8b = _0x21246a[_0x2dabf1] || []
            if (_0x161b8b.length !== 0) {
              return [3, 7]
            }
            return [3, 6]
          case 4:
            _0x41f7fc = _0x5e9f58.sent()
            console.log('getshareCodeHW Error, Retry...', _0x41f7fc)
            return [4, this.wait(this.getRandomNumberByRange(2000, 6000))]
          case 5:
            _0x5e9f58.sent()
            return [3, 6]
          case 6:
            _0x42dfd4++
            return [3, 1]
          case 7:
            return [2, _0x161b8b]
        }
      })
    })
  }
  _0x3e0935.prototype.getRandomNumberByRange = function (_0x232958, _0x37780e) {
    _0x37780e <= _0x232958 && (_0x37780e = _0x232958 + 100)
    return Math.floor(Math.random() * (_0x37780e - _0x232958) + _0x232958)
  }
  _0x3e0935.prototype.getRandomNumString = function (_0x47c4b1) {
    _0x47c4b1 = _0x47c4b1 || 32
    var _0x144866 = '0123456789'.length,
      _0x2bf4db = ''
    for (var _0x500966 = 0; _0x500966 < _0x47c4b1; _0x500966++) {
      _0x2bf4db += '0123456789'.charAt(Math.floor(Math.random() * _0x144866))
    }
    return _0x2bf4db
  }
  _0x3e0935.prototype.getEncStr = function (_0x156a51, _0x440b8f) {
    console.log('getEncStr fn: '.concat(_0x156a51))
    var _0x17669b = Date.now()
    var _0x2316d6 = _0x440b8f.id
      ? _0x440b8f.taskType
        ? ''.concat(_0x440b8f.id).concat(_0x440b8f.taskType)
        : _0x440b8f.id
      : ''
    var _0x332327 = !['abcdefg'].includes(_0x156a51)
      ? 'e9c398ffcb2d4824b4d0a703e38yffdd'
      : 'e7c398ffcb2d4824b4d0a703e38eb0bb'
    _0x332327 = ''.concat(_0x2316d6).concat(_0x17669b).concat(_0x332327)
    return _0x2a0cf8(_0x2a0cf8({}, _0x440b8f), {
      t: _0x17669b,
      encStr: _0x3a01bb.Md5.hashStr(_0x332327).toString(),
    })
  }
  _0x3e0935.prototype.cashDoSign = function () {
    return _0x37038f(this, void 0, void 0, function () {
      return _0x1969ad(this, function (_0x52e883) {
        switch (_0x52e883.label) {
          case 0:
            return [
              4,
              this.get(
                'https://api.jdsharecode.xyz/api/cashDoSign_owieklcalsd89023c?pwd='.concat(
                  __dirname
                )
              ),
            ]
          case 1:
            return [2, _0x52e883.sent()]
        }
      })
    })
  }
  _0x3e0935.prototype.run = function (_0x31bb95, _0x3dd47a, _0xf6e023) {
    return _0x37038f(this, void 0, void 0, function () {
      var _0x142cb9,
        _0x11e2a9,
        _0x3ffe7c,
        _0x448f15,
        _0x123870,
        _0x289f4d,
        _0x41ecda,
        _0x4de538,
        _0xabcfee,
        _0x2b8e4f,
        _0x3e21f8,
        _0x2c206f,
        _0x2edeb6,
        _0x47697a,
        _0x1e3a21,
        _0x4d994d,
        _0x49678e,
        _0x53938c,
        _0x2c5232,
        _0x365e98,
        _0x169b9f,
        _0x166e00
      var _0x2f2661, _0x3bfb8f
      return _0x1969ad(this, function (_0x5f21d7) {
        switch (_0x5f21d7.label) {
          case 0:
            _0x142cb9 = new Date().toLocaleString('zh-CN', {
              timeZone: 'Asia/Shanghai',
            })
            ;(_0x11e2a9 = __dirname), (_0x3ffe7c = _0x11e2a9.length + 20)
            ;(_0x448f15 = (_0x3ffe7c - 12) / 2),
              (_0x123870 = (_0x3ffe7c - 18) / 2)
            ;(_0x289f4d = '='.repeat(_0x448f15)),
              (_0x41ecda = '='.repeat(_0x123870))
            console.log(
              ''
                .concat(_0x289f4d, ' JDHelloWorld ')
                .concat(
                  _0x11e2a9.length % 2 === 0 ? _0x289f4d : _0x289f4d + '=',
                  '\n'
                )
                .concat(_0x41ecda, ' ')
                .concat(_0x142cb9, ' ')
                .concat(
                  _0x11e2a9.length % 2 !== 0 ? _0x41ecda + '=' : _0x41ecda,
                  '\n========== '
                )
                .concat(__dirname, ' ==========\n')
            )
            _0xf6e023 && _0x31bb95.tips()
            _0x4de538 = ''
            _0xabcfee = [
              'jdapp;iPhone;10.0.2;13.6;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.6;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.5;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;14.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.7;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;14.1;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;13.4;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
              'jdapp;iPhone;10.0.2;14.3;network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1',
            ]
            _0x2b8e4f = _0x586c2e(
              [],
              _0x42b563(
                this.exceptCookie(_0x190bb3.basename(require.main.filename))
              ),
              false
            )
            _0x2b8e4f.length > 0 && this.o2s(_0x2b8e4f, 'except username:')
            return [4, this.getCookie()]
          case 1:
            _0x5f21d7.sent()
            _0x5f21d7.label = 2
          case 2:
            _0x5f21d7.trys.push([2, 13, 14, 15])
            ;(_0x3e21f8 = _0x4469c4(this.cookiesArr.entries())),
              (_0x2c206f = _0x3e21f8.next())
            _0x5f21d7.label = 3
          case 3:
            if (!!_0x2c206f.done) {
              return [3, 12]
            }
            ;(_0x2edeb6 = _0x42b563(_0x2c206f.value, 2)),
              (_0x47697a = _0x2edeb6[0]),
              (_0x1e3a21 = _0x2edeb6[1])
            _0x5f21d7.label = 4
          case 4:
            _0x5f21d7.trys.push([4, 6, , 7])
            _0x4d994d = decodeURIComponent(_0x1e3a21.match(/pt_pin=([^;]*)/)[1])
            _0x49678e = _0xabcfee[(Math.random() * _0xabcfee.length) | 0]
            console.log(
              '\n开始\u3010京东账号'
                .concat(_0x47697a + 1, '\u3011')
                .concat(_0x4d994d, '\n')
            )
            if (_0x2b8e4f.includes(encodeURIComponent(_0x4d994d))) {
              console.log('已设置跳过')
              return [3, 11]
            }
            _0x53938c = {
              index: _0x47697a,
              UserName: _0x4d994d,
              cookie: _0x1e3a21,
              UserAgent: _0x49678e,
              end: _0x47697a === this.cookiesArr.length - 1,
            }
            this.users.push(_0x53938c)
            return [4, _0x31bb95.main(_0x53938c)]
          case 5:
            _0x2c5232 = _0x5f21d7.sent()
            if (
              _0x2c5232 === null || _0x2c5232 === void 0
                ? void 0
                : _0x2c5232.msg
            ) {
              _0x4de538 += _0x2c5232.msg + '\n'
            }
            return [3, 7]
          case 6:
            _0x365e98 = _0x5f21d7.sent()
            console.log(_0x365e98)
            return [3, 7]
          case 7:
            if (!(_0x47697a === this.cookiesArr.length - 1 && _0x4de538)) {
              return [3, 9]
            }
            return [
              4,
              (0, _0x5e1365.sendNotify)(this.scriptName, _0x4de538.trim()),
            ]
          case 8:
            _0x5f21d7.sent()
            _0x5f21d7.label = 9
          case 9:
            return [4, this.wait(3000)]
          case 10:
            _0x5f21d7.sent()
            _0x5f21d7.label = 11
          case 11:
            _0x2c206f = _0x3e21f8.next()
            return [3, 3]
          case 12:
            return [3, 15]
          case 13:
            _0x169b9f = _0x5f21d7.sent()
            _0x2f2661 = { error: _0x169b9f }
            return [3, 15]
          case 14:
            try {
              if (
                _0x2c206f &&
                !_0x2c206f.done &&
                (_0x3bfb8f = _0x3e21f8.return)
              ) {
                _0x3bfb8f.call(_0x3e21f8)
              }
            } finally {
              if (_0x2f2661) {
                throw _0x2f2661.error
              }
            }
            return [7]
          case 15:
            _0x166e00 = _0x31bb95.help
            if (!_0x166e00) {
              return [3, 17]
            }
            return [4, _0x31bb95.help(this.users)]
          case 16:
            _0x166e00 = _0x5f21d7.sent()
            _0x5f21d7.label = 17
          case 17:
            _0x166e00
            return [2]
        }
      })
    })
  }
  return _0x3e0935
})()
exports.JDHelloWorld = _0x3e0935
