const _0x1fe702 = require('crypto-js'),
    _0x53bf8e = require('got'),
    _0xfe4479 = {};
function _0x2a6c39() {
    var _0x563431,
        _0x5b409 = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        _0x3e9981 = _0x5b409.size,
        _0x3ab072 = 'undefined' === _0x3e9981 ? 10 : _0x3e9981,
        _0x261be9 = _0x5b409.dictType,
        _0x554d37 = 'undefined' === _0x261be9 ? 'number' : _0x261be9,
        _0x3ce6f3 = _0x5b409.num,
        _0x500144 = '';
    if (_0x3ce6f3 && 'string' == typeof _0x3ce6f3) _0x563431 = _0x3ce6f3;
    for (; _0x3ab072--;) _0x500144 += _0x563431[Math.floor(Math.random() * _0x563431.length)];
    return _0x500144;
}
function _0x598873(_0x421d11) {
    let _0x241f45 = _0x421d11.type,
        _0x3a07ac = '',
        _0x5e0b50 = _0x421d11.customDict;
    if (_0x5e0b50 && 'string' == typeof _0x5e0b50) _0x241f45 = _0x5e0b50; else switch (_0x241f45) {
        case 'alphabet':
            _0x241f45 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'max':
            _0x241f45 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
            break;
        case 'number':
        default:
            _0x241f45 = '0123456789';
    }
    for (; _0x421d11.size--;) _0x3a07ac += _0x241f45[Math.random() * _0x241f45.length | 0];
    return _0x3a07ac;
}
function _0x2a39fd() {
    var _0x3c64fa = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
        _0xcc1e1d = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
        _0x5b2e71 = new Date(_0x3c64fa),
        _0x5822ba = _0xcc1e1d,
        _0x2cfb06 = {
            'M+': _0x5b2e71.getMonth() + 1,
            'd+': _0x5b2e71.getDate(),
            'D+': _0x5b2e71.getDate(),
            'h+': _0x5b2e71.getHours(),
            'H+': _0x5b2e71.getHours(),
            'm+': _0x5b2e71.getMinutes(),
            's+': _0x5b2e71.getSeconds(),
            'w+': _0x5b2e71.getDay(),
            'q+': Math.floor((_0x5b2e71.getMonth() + 3) / 3),
            'S+': _0x5b2e71.getMilliseconds()
        };
    return /(y+)/i.test(_0x5822ba) && (_0x5822ba = _0x5822ba.replace(RegExp.$1, ''.concat(_0x5b2e71.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x2cfb06).forEach(function (_0x99a702) {
        if (new RegExp('('.concat(_0x99a702, ')')).test(_0x5822ba)) {
            var _0x303663 = 'S+' === _0x99a702 ? '000' : '00';
            _0x5822ba = _0x5822ba.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x2cfb06[_0x99a702] : ''.concat(_0x303663).concat(_0x2cfb06[_0x99a702]).substr(''.concat(_0x2cfb06[_0x99a702]).length));
        }
    }), _0x5822ba;
}
function _0x3e14e6(_0x243df3, _0x3d9faa, _0x4eac2b, _0x43c7f2) {
    let _0x372fbb = {
        'version': '4.1',
        'fp': _0x3d9faa,
        'appId': _0x243df3,
        'timestamp': Date.now(),
        'platform': 'applet',
        'expandParams': ''
    };
    _0x372fbb.expandParams = _0x43c7f2 || '';
    const _0x4cd672 = {};
    _0x4cd672.Host = 'cactus.jd.com', _0x4cd672['Content-Type'] = 'application/json', _0x4cd672['User-agent'] = _0x4eac2b;
    let _0x55e130 = {
        'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
        'body': JSON.stringify(_0x372fbb),
        'headers': _0x4cd672,
        'timeout': 0x7530
    };
    return new Promise(async _0x5d6ef3 => {
        _0x322e20(_0x55e130, (_0x3b4855, _0x5dc544, _0x280399) => {
            try {
                _0x3b4855 ? (console.log('' + JSON.stringify(_0x3b4855)), console.log('algo请求失败，请检查网路重试')) : (_0x280399 = JSON.parse(_0x280399), _0x280399 = _0x280399.data.result);
            } catch (_0x19d900) {
                console(_0x19d900, _0x5dc544);
            } finally {
                _0x5d6ef3(_0x280399);
            }
        });
    });
}
function _0x5c73d2(_0x26dbbc) {
    let _0x48a3b7 = _0x26dbbc.size,
        _0x3e0c21 = _0x26dbbc.num,
        _0x654823 = _0x3e0c21,
        _0x57e007 = '';
    for (; _0x48a3b7--;) _0x57e007 += _0x654823[Math.random() * _0x654823.length | 0];
    return _0x57e007;
}
function _0xe0974d(_0x144c59, _0x5a64fe) {
    for (let _0xa907b2 = 0; _0xa907b2 < _0x5a64fe.length; _0xa907b2++) {
        let _0x55af60 = _0x144c59.indexOf(_0x5a64fe[_0xa907b2]);
        _0x55af60 !== -1 && (_0x144c59 = _0x144c59.replace(_0x5a64fe[_0xa907b2], ''));
    }
    return _0x144c59;
}
function _0x33ac05(_0x26d328, _0x65ae0b) {
    let _0xcc9110 = [],
        _0x31e402 = _0x26d328.length;
    for (let _0x2651ef = 0; _0x2651ef < 10; _0x2651ef++) {
        let _0x56500e = _0x26d328[_0x2651ef];
        if (Math.random() * _0x31e402 < _0x65ae0b && (_0xcc9110.push(_0x56500e), --_0x65ae0b == 0)) break;
        _0x31e402--;
    }
    let _0x2be2dc = '';
    for (let _0x210e0c = 0; _0x210e0c < _0xcc9110.length; _0x210e0c++) {
        let _0x2ed012 = Math.random() * (_0xcc9110.length - _0x210e0c) | 0;
        _0x2be2dc += _0xcc9110[_0x2ed012], _0xcc9110[_0x2ed012] = _0xcc9110[_0xcc9110.length - _0x210e0c - 1];
    }
    return _0x2be2dc;
}
function _0x4e8b9d() {
    let _0x88ef03 = 'uct6d0jhqw',
        _0xbc882f = _0x33ac05(_0x88ef03, 6),
        _0x2984c0 = Math.random() * 10 | 0,
        _0x56930f = _0xe0974d(_0x88ef03, _0xbc882f),
        _0x2e6eca = {};
    _0x2e6eca.size = _0x2984c0, _0x2e6eca.num = _0x56930f;
    let _0x3f068d = _0x5c73d2(_0x2e6eca) + _0xbc882f + _0x5c73d2({
        'size': 10 - _0x2984c0 - 1,
        'num': _0x56930f
    }) + _0x2984c0,
        _0x230a4e = _0x3f068d.split(''),
        _0x19724a = _0x230a4e.slice(0, 14),
        _0x27e419 = _0x230a4e.slice(14),
        _0x5cb3c8 = [];
    for (; _0x19724a.length > 0;) _0x5cb3c8.push((35 - parseInt(_0x19724a.pop(), 36)).toString(36));
    _0x5cb3c8 = _0x5cb3c8.concat(_0x27e419);
    let _0x27cab6 = _0x5cb3c8.join('');
    return _0x27cab6;
}
function _0x16a913(_0x221b14) {
    let _0x113267 = _0x221b14.size,
        _0x54fe53 = _0x221b14.num,
        _0x21dd95 = '';
    for (; _0x113267--;) _0x21dd95 += _0x54fe53[Math.random() * _0x54fe53.length | 0];
    return _0x21dd95;
}
async function _0x560b92() {
    let {
        body: _0x596f83,
        ua: _0xd2f990,
        user: _0x2013f8,
        ver: _0x498979,
        cl: _0x359595,
        fn: _0x2c4edd,
        appId: _0x36a924,
        code: _0x296cd2,
        apid: _0x27ffee,
        xcr: _0x5f2eec,
        nco: _0x28f0f4
    } = arguments[0];
    const _0x1dcb63 = {};
    _0x1dcb63.size = 0xa, _0x1dcb63.type = 'max';
    let _0x564782 = _0x598873(_0x1dcb63);
    const _0x557473 = {};
    _0x557473.size = 0xa, _0x557473.type = 'max';
    let _0x4530c1 = _0x598873(_0x557473);
    (!_0xfe4479[_0x36a924] || _0x5f2eec) && (_0xfe4479[_0x36a924] = {}, _0xfe4479[_0x36a924].fp = _0x4e8b9d());
    _0x596f83 = typeof _0x596f83 !== 'string' ? JSON.stringify(_0x596f83) : _0x596f83;
    let _0x532af4 = ['wc', 'wd', 'l', 'ls', 'ml', 'pl', 'av', 'ua', 'sua', 'pp', 'pp1', 'w', 'h', 'ow', 'oh', 'url', 'og', 'pr', 're', 'random'],
        _0xeb739 = {};
    const _0x26d023 = {};
    _0x26d023.p1 = _0x2013f8;
    let _0x16b87f = [1, 0, 'zh-CN', 'zh-CN', 0, 0, '', _0xd2f990, _0xd2f990.match(/\(([^\)]+)\)/)[1], _0x26d023, '', 393, 873, 393, 779, '', '', 2.75, '', _0x564782];
    for (let _0x2e6f12 in _0x532af4) {
        _0xeb739[_0x532af4[_0x2e6f12]] = _0x16b87f[_0x2e6f12];
    }
    const _0x1855d8 = {};
    _0x1855d8.referer = '', _0x1855d8.v = 'v3.2.0', _0x1855d8.ai = _0x36a924, _0x1855d8.fp = _0xfe4479[_0x36a924].fp;
    const _0x55fb12 = {
        ..._0xeb739,
        ..._0x1855d8
    };
    let _0x3ad5f2 = _0x55fb12,
        _0x294716 = _0x1fe702.AES.encrypt(JSON.stringify(_0x3ad5f2, null, 2), _0x1fe702.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            'iv': _0x1fe702.enc.Utf8.parse('0102030405060708'),
            'mode': _0x1fe702.mode.CBC,
            'padding': _0x1fe702.pad.Pkcs7
        }),
        _0x33eaca = _0x294716.ciphertext.toString(),
        _0x54c60a = new Date().getTime();
    if (!_0xfe4479[_0x36a924].tk || _0x5f2eec) {
        let _0x2df1c3 = await _0x3e14e6(_0x36a924, _0xfe4479[_0x36a924].fp, _0xd2f990, _0x33eaca);
        if (!_0x2df1c3) _0x2df1c3 = await _0x3e14e6(_0x36a924, _0xfe4479[_0x36a924].fp, _0xd2f990, _0x33eaca);
        if (!_0x2df1c3) return 'functionId=' + _0x2c4edd + '&appid=' + _0x27ffee + '&body=' + _0x596f83;
        _0xfe4479[_0x36a924].tk = _0x2df1c3.tk, _0xfe4479[_0x36a924].algo = _0x2df1c3.algo;
    }
    let _0x1959f4 = new Date().getTime(),
        _0x57bd8f = _0x2a39fd(_0x1959f4, 'yyyyMMddhhmmssSSS'),
        _0xa8e909 = _0xfe4479[_0x36a924].tk,
        _0x394346 = new Function('return ' + _0xfe4479[_0x36a924].algo)(),
        _0x5246a4 = _0x57bd8f + '04',
        _0x55d729 = await _0x394346(_0xa8e909, _0xfe4479[_0x36a924].fp, _0x5246a4, _0x36a924, _0x1fe702).toString();
    const _0x488d19 = {};
    _0x488d19.appid = _0x27ffee, _0x488d19.functionId = _0x2c4edd, _0x488d19.body = _0x596f83;
    let _0x366f59 = _0x488d19;
    _0x296cd2 && (_0x366f59.t = _0x54c60a), _0x498979 && (_0x366f59.clientVersion = _0x498979), _0x359595 && (_0x366f59.client = _0x359595);
    let _0x384890 = _0x366f59,
        _0xf83546 = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'],
        _0x429b75 = _0xf83546.filter(_0x13d94a => _0x366f59[_0x13d94a]).map(_0x780c78 => _0x780c78 + ':' + (_0x780c78 == 'body' ? _0x1fe702.SHA256(_0x366f59[_0x780c78]).toString() : _0x366f59[_0x780c78])).join('&'),
        _0x18acb5 = Date.now() > '1698768000000' ? _0x1fe702.MD5(_0x429b75).toString(_0x1fe702.enc.Hex) : _0x1fe702.MD5(_0x55d729 + _0x429b75 + _0x55d729).toString(_0x1fe702.enc.Hex),
        _0x21cdcd = '',
        _0x25fcd9 = {};
    _0x25fcd9.sua = _0xd2f990.match(/\(([^\)]+)\)/)[1], _0x25fcd9.pp = {}, _0x25fcd9.fp = _0xfe4479[_0x36a924].fp, _0x25fcd9.pp.p1 = _0x2013f8, _0x25fcd9.random = _0x4530c1, _0x25fcd9.referer = '', _0x25fcd9.v = 'v3.2.0';
    let _0x16a228 = _0x1fe702.AES.encrypt(JSON.stringify(_0x25fcd9, null, 2), _0x1fe702.enc.Utf8.parse('HL4|FW#Chc3#q?0)'), {
        'iv': _0x1fe702.enc.Utf8.parse('0102030405060708'),
        'mode': _0x1fe702.mode.CBC,
        'padding': _0x1fe702.pad.Pkcs7
    });
    _0x21cdcd = _0x16a228.ciphertext.toString();
    let _0x2065f3 = [_0x57bd8f, _0xfe4479[_0x36a924].fp, _0x36a924, _0xa8e909, _0x18acb5, 4.1, _0x1959f4, _0x21cdcd].join(';'),
        _0x469cd4 = Object.entries(_0x384890).map(([_0x1c1c0b, _0xe323f6]) => _0x1c1c0b + '=' + (typeof _0xe323f6 == 'string' ? encodeURIComponent(_0xe323f6) : encodeURIComponent(JSON.stringify(_0xe323f6)))).join('&');
    return _0x469cd4 + '&h5st=' + encodeURIComponent(_0x2065f3);
}
function _0x322e20(_0x2aeae9, _0xbbfeea = () => { }) {
    const {
        url: _0x2d3c39,
        ..._0x579773
    } = _0x2aeae9;
    _0x53bf8e.post(_0x2d3c39, _0x579773).then(_0x217d2b => {
        const {
            statusCode: _0x1e392b,
            statusCode: _0x466f2f,
            headers: _0x4ae669,
            body: _0x4ba593
        } = _0x217d2b,
            _0xca0eb1 = {};
        _0xca0eb1.status = _0x1e392b, _0xca0eb1.statusCode = _0x466f2f, _0xca0eb1.headers = _0x4ae669, _0xca0eb1.body = _0x4ba593, _0xbbfeea(null, _0xca0eb1, _0x4ba593);
    }, _0x1ea9d7 => {
        const {
            message: _0x5eb694,
            response: _0x16a28e
        } = _0x1ea9d7;
        _0xbbfeea(_0x5eb694, _0x16a28e, _0x16a28e && _0x16a28e.body);
    });
}
class _0x2aa573 {
    constructor(_0x272a59, _0x10c699, _0x33a7d2) {
        this.appId = _0x272a59, this.ua = _0x10c699, this.fp = _0x33a7d2 || this.__genFp();
    }
    ['__genFp']() {
        let _0xe219eb = '0123456789',
            _0x219256 = 13,
            _0x5e8974 = '';
        for (; _0x219256--;) _0x5e8974 += _0xe219eb[Math.random() * _0xe219eb.length | 0];
        return (_0x5e8974 + Date.now()).slice(0, 16);
    }
    async ['__genAlgo']() {
        this.time = Date.now(), this.timestamp = format(this.time, 'yyyyMMddHHmmssSSS');
        let {
            data: _0x5ca557
        } = await axios.post('https://cactus.jd.com/request_algo?g_ty=ajax', {
            'version': '3.0',
            'fp': this.fp,
            'appId': this.appId.toString(),
            'timestamp': this.time,
            'platform': 'web',
            'expandParams': ''
        }, {
            'headers': {
                'Host': 'cactus.jd.com',
                'accept': 'application/json',
                'content-type': 'application/json',
                'user-agent': this.ua
            }
        });
        this.tk = _0x5ca557.data.result.tk, this.rd = _0x5ca557.data.result.algo.match(/rd='(.*)'/)[1], this.enc = _0x5ca557.data.result.algo.match(/algo\.(.*)\(/)[1];
    }
    ['__genKey'](_0x18dc11, _0x21cf6c, _0x37f423, _0x1cdb30, _0x18129a) {
        let _0x48f4fb = '' + _0x18dc11 + _0x21cf6c + _0x37f423 + _0x1cdb30 + this.rd;
        return _0x18129a[this.enc](_0x48f4fb, _0x18dc11);
    }
    ['__genH5st'](_0x436295) {
        let _0x403014 = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
            _0x237e08 = '';
        for (let _0x3c9004 of Object.keys(_0x436295)) {
            _0x3c9004 === 'body' ? _0x237e08 += _0x3c9004 + ':' + CryptoJS.SHA256(_0x436295[_0x3c9004]).toString(CryptoJS.enc.Hex) + '&' : _0x237e08 += _0x3c9004 + ':' + _0x436295[_0x3c9004] + '&';
        }
        return _0x237e08 = _0x237e08.slice(0, -1), _0x237e08 = CryptoJS.HmacSHA256(_0x237e08, _0x403014).toString(CryptoJS.enc.Hex), encodeURIComponent(this.timestamp + ';' + this.fp + ';' + this.appId.toString() + ';' + this.tk + ';' + _0x237e08 + ';3.0;' + this.time.toString());
    }
}
const _0x250074 = {};
_0x250074.getbody = _0x560b92, _0x250074.H5ST = _0x2aa573, module.exports = _0x250074;