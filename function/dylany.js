const _0x1e42d6 = require('crypto-js'),
    _0x1bb818 = require('got'),
    _0x462a26 = {};

function _0x14ff6e(_0x298c6b) {
    if (_0x298c6b === '3.1') {
        var _0x216410 = '',
            _0x10a265 = '0123456789',
            _0x52715f = _0x10a265,
            _0x2f6ea9 = Math.floor(Math.random() * 10),
            _0x4d9ac3,
            _0x32de6d = 12;

        do {
            const _0x8da738 = {
                'size': 0x1
            };
            _0x8da738.num = _0x10a265, (_0x4d9ac3 = _0x43ef6f(_0x8da738), _0x216410.indexOf(_0x4d9ac3) == -1 && (_0x216410 += _0x4d9ac3));
        } while (_0x216410.length < 3);

        for (let _0x5e0807 of _0x216410.slice()) {
            _0x52715f = _0x52715f.replace(_0x5e0807, '');
        }

        const _0x38515a = {};
        _0x38515a.size = _0x2f6ea9, _0x38515a.num = _0x52715f;

        var _0x54b59b = _0x43ef6f(_0x38515a) + _0x216410 + _0x43ef6f({
            'size': _0x32de6d - _0x2f6ea9,
            'num': _0x52715f
        }) + _0x2f6ea9,
            _0x1fec71 = _0x54b59b.split(''),
            _0x3d504f = [];

        for (; _0x1fec71.length;) {
            _0x3d504f.push(9 - parseInt(_0x1fec71.pop()));
        }

        _0x54b59b = _0x3d504f.join('');
    } else {
        var _0x32de6d = 12,
            _0x216410 = '',
            _0x10a265 = '0123456789',
            _0x52715f = _0x10a265,
            _0x2f6ea9 = Math.floor(Math.random() * 10),
            _0x4d9ac3;

        do {
            const _0x5c1274 = {
                'size': 0x1
            };
            _0x5c1274.num = _0x10a265, (_0x4d9ac3 = _0x43ef6f(_0x5c1274), _0x216410.indexOf(_0x4d9ac3) == -1 && (_0x216410 += _0x4d9ac3));
        } while (_0x216410.length < 3);

        for (let _0x5804c8 of _0x216410.slice()) {
            _0x52715f = _0x52715f.replace(_0x5804c8, '');
        }

        const _0x26bc26 = {};
        _0x26bc26.size = _0x2f6ea9, _0x26bc26.num = _0x52715f;

        var _0x54b59b = _0x43ef6f(_0x26bc26) + _0x216410 + _0x43ef6f({
            'size': _0x32de6d - _0x2f6ea9,
            'num': _0x52715f
        }) + _0x2f6ea9;
    }

    return _0x54b59b;
}

function _0x43ef6f() {
    var _0x11899e,
        _0x5c7fce = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        _0x36a125 = _0x5c7fce.size,
        _0x137527 = 'undefined' === _0x36a125 ? 10 : _0x36a125,
        _0x4f50ee = _0x5c7fce.num,
        _0x1a66af = '';

    if (_0x4f50ee && 'string' == typeof _0x4f50ee) _0x11899e = _0x4f50ee;

    for (; _0x137527--;) _0x1a66af += _0x11899e[Math.floor(Math.random() * _0x11899e.length)];

    return _0x1a66af;
}

function _0x1a44f8() {
    var _0x191425 = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
        _0x376e0d = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
        _0x4f2a38 = new Date(_0x191425),
        _0x3f2484 = _0x376e0d,
        _0x73ddfd = {
            'M+': _0x4f2a38.getMonth() + 1,
            'd+': _0x4f2a38.getDate(),
            'D+': _0x4f2a38.getDate(),
            'h+': _0x4f2a38.getHours(),
            'H+': _0x4f2a38.getHours(),
            'm+': _0x4f2a38.getMinutes(),
            's+': _0x4f2a38.getSeconds(),
            'w+': _0x4f2a38.getDay(),
            'q+': Math.floor((_0x4f2a38.getMonth() + 3) / 3),
            'S+': _0x4f2a38.getMilliseconds()
        };

    return /(y+)/i.test(_0x3f2484) && (_0x3f2484 = _0x3f2484.replace(RegExp.$1, ''.concat(_0x4f2a38.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x73ddfd).forEach(function (_0x25df6e) {
        {
            if (new RegExp('('.concat(_0x25df6e, ')')).test(_0x3f2484)) {
                var _0x5718f9 = 'S+' === _0x25df6e ? '000' : '00';

                _0x3f2484 = _0x3f2484.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x73ddfd[_0x25df6e] : ''.concat(_0x5718f9).concat(_0x73ddfd[_0x25df6e]).substr(''.concat(_0x73ddfd[_0x25df6e]).length));
            }
        }
    }), _0x3f2484;
}

function _0x7a3d5d(_0x388baa, _0x4464ca) {
    let _0x4cf1f3 = {
        'version': '3.1',
        'fp': _0x462a26.dy[_0x388baa].fp,
        'appId': _0x388baa,
        'timestamp': Date.now(),
        'platform': 'web',
        'expandParams': ''
    };
    _0x4cf1f3.expandParams = _0x462a26.expandParams || '';
    const _0xbe27fd = {
        'Host': 'cactus.jd.com',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    _0xbe27fd['User-agent'] = _0x4464ca;
    let _0x2caf28 = {
        'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
        'body': JSON.stringify(_0x4cf1f3),
        'headers': _0xbe27fd,
        'timeout': 0x2710
    };
    return new Promise(async _0x3ce9e2 => {
        _0x415414(_0x2caf28, (_0x52b7d0, _0x1bd052, _0x525971) => {
            try {
                if (_0x52b7d0) console.log('' + JSON.stringify(_0x52b7d0)), console.log('algo请求失败，请检查网路重试'); else {
                    _0x525971 = JSON.parse(_0x525971);
                    let _0xb69b49 = _0x525971.data.result;
                    _0x462a26.dy[_0x388baa].tk = _0xb69b49.tk, _0x462a26.dy[_0x388baa].test = new Function('return ' + _0xb69b49.algo)();
                }
            } catch (_0x94120f) {
                console(_0x94120f, _0x1bd052);
            } finally {
                _0x3ce9e2(_0x525971);
            }
        });
    });
}

async function _0x23aea3(_0x2cdb54) {
    let _0x50b66d = '3.1',
        _0x49c7c7 = _0x14ff6e(_0x50b66d);

    const _0x331351 = {};
    _0x331351.fp = _0x49c7c7;
    const _0xd0add8 = {
        [_0x2cdb54.appId]: _0x331351
    };
    _0x462a26.dy = _0xd0add8;

    let _0x3890b0 = typeof _0x2cdb54.body !== 'string' ? JSON.stringify(_0x2cdb54.body) : _0x2cdb54.body;

    let _0x35ca19 = ['wc', 'wd', 'l', 'ls', 'ml', 'pl', 'av', 'ua', 'sua', 'pp', 'pp1', 'w', 'h', 'ow', 'oh', 'url', 'og', 'pr', 're'],
        _0x31bee2 = {},
        _0x3a6c8b = {},
        _0x258157 = [1, 0, 'zh-CN', 'zh-CN', 0, 0, '', _0x2cdb54.ua, {
            'p1': _0x2cdb54.user
        }, '', '', 393, 873, 393, 373, '', '', 2.75, ''];

    for (let _0x412529 in _0x35ca19) {
        _0x3a6c8b[_0x35ca19[_0x412529]] = _0x258157[_0x412529];
    }

    const _0x44b037 = {};
    _0x44b037.ai = _0x2cdb54.appId;
    _0x44b037.fp = _0x49c7c7;
    const _0x4d2ffb = {
        ..._0x3a6c8b,
        ..._0x44b037
    };

    let _0x3cb95f = _0x4d2ffb,
        _0x501839 = _0x1e42d6.AES.encrypt(JSON.stringify(_0x3cb95f, null, 2), _0x1e42d6.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            'iv': _0x1e42d6.enc.Utf8.parse('0102030405060708'),
            'mode': _0x1e42d6.mode.CBC,
            'padding': _0x1e42d6.pad.Pkcs7
        });

    _0x462a26.expandParams = _0x501839.ciphertext.toString();

    let _0x27a124 = new Date().getTime();

    await _0x7a3d5d(_0x2cdb54.appId, _0x2cdb54.ua);

    let _0x1b8040 = new Date().getTime(),
        _0x4d332d = _0x1a44f8(_0x1b8040, 'yyyyMMddhhmmssSSS');

    _0x31bee2 = _0x462a26.dy[_0x2cdb54.appId], _0x31bee2.enc = await _0x31bee2.test(_0x31bee2.tk, _0x49c7c7, _0x4d332d, _0x2cdb54.appId, _0x1e42d6).toString(_0x1e42d6.enc.Hex);
    const _0x4e22bf = {};
    _0x4e22bf.appid = _0x2cdb54.apid, _0x4e22bf.functionId = _0x2cdb54.fn, _0x4e22bf.body = _0x3890b0, _0x4e22bf.clientVersion = _0x2cdb54.ver, _0x4e22bf.client = _0x2cdb54.cl;
    let _0xdccce7 = _0x4e22bf;
    if (_0x2cdb54.code) _0xdccce7.t = _0x27a124;
    let _0x3c5699 = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'];

    let _0x1ef55b = _0x3c5699.filter(_0x46e7be => _0xdccce7[_0x46e7be]).map(_0x3acbab => _0x3acbab + ':' + (_0x3acbab == 'body' ? _0x1e42d6.SHA256(_0xdccce7[_0x3acbab]).toString() : _0xdccce7[_0x3acbab])).join('&');

    let _0x517a50 = _0x1e42d6.HmacSHA256(_0x1ef55b, _0x31bee2.enc).toString(_0x1e42d6.enc.Hex);

    Date.now() > 1672399375000 && (_0x4d332d = _0x4d332d - 1);
    let _0x59fa30 = '';

    if (_0x50b66d === '3.1') {
        let _0x53c5a7 = {};
        _0x53c5a7.sua = _0x2cdb54.ua.match(/\(([^\)]+)\)/)[1], _0x53c5a7.pp = {}, _0x53c5a7.fp = _0x49c7c7, _0x53c5a7.pp.p1 = _0x2cdb54.user;

        let _0x3cabb0 = _0x1e42d6.AES.encrypt(JSON.stringify(_0x53c5a7, null, 2), _0x1e42d6.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
            'iv': _0x1e42d6.enc.Utf8.parse('0102030405060708'),
            'mode': _0x1e42d6.mode.CBC,
            'padding': _0x1e42d6.pad.Pkcs7
        });

        _0x59fa30 = _0x3cabb0.ciphertext.toString();
    }

    __dirname.split(/[\\/]/).pop() !== 'function' && (_0x4d332d = _0x4d332d - 1);

    let _0x231259 = [_0x4d332d, _0x49c7c7, _0x2cdb54.appId, _0x31bee2.tk, _0x517a50, _0x50b66d, _0x1b8040, _0x59fa30].join(';');

    return 'functionId=' + _0x2cdb54.fn + '&body=' + encodeURIComponent(_0x3890b0) + '&t=' + _0x27a124 + '&appid=' + _0x2cdb54.apid + '&client=' + _0x2cdb54.cl + '&clientVersion=' + _0x2cdb54.ver + '&h5st=' + encodeURIComponent(_0x231259);
}

function _0x415414(_0x5ac876, _0x2bfecd = () => { }) {
    const {
        url: _0x380685,
        ..._0x72adec
    } = _0x5ac876;

    _0x1bb818.post(_0x380685, _0x72adec).then(_0x2190e7 => {
        {
            const {
                statusCode: _0x2092ec,
                statusCode: _0x2b39cc,
                headers: _0x1a1d98,
                body: _0x5748eb
            } = _0x2190e7,
                _0x5e374b = {};
            _0x5e374b.status = _0x2092ec, _0x5e374b.statusCode = _0x2b39cc, _0x5e374b.headers = _0x1a1d98, _0x5e374b.body = _0x5748eb, _0x2bfecd(null, _0x5e374b, _0x5748eb);
        }
    }, _0x4026a9 => {
        {
            const {
                message: _0x3e3de4,
                response: _0x521971
            } = _0x4026a9;

            _0x2bfecd(_0x3e3de4, _0x521971, _0x521971 && _0x521971.body);
        }
    });
}

class _0x3dc3e5 {
    constructor(_0x209616, _0x2a4d35, _0x428159) {
        this.appId = _0x209616, this.ua = _0x2a4d35;
        this.fp = _0x428159 || this.__genFp();
    }

    ['__genFp']() {
        let _0x202507 = '0123456789',
            _0x4efb7b = 13;
        let _0x819eac = '';

        for (; _0x4efb7b--;) _0x819eac += _0x202507[Math.random() * _0x202507.length | 0];

        return (_0x819eac + Date.now()).slice(0, 16);
    }

    async ['__genAlgo']() {
        this.time = Date.now();
        this.timestamp = format(this.time, 'yyyyMMddHHmmssSSS');
        let {
            data: _0x5ea86a
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
        this.tk = _0x5ea86a.data.result.tk;
        this.rd = _0x5ea86a.data.result.algo.match(/rd='(.*)'/)[1], this.enc = _0x5ea86a.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    ['__genKey'](_0xad41ca, _0x29edf7, _0x5da426, _0x5ecaa6, _0x3d38d4) {
        let _0x40fab9 = '' + _0xad41ca + _0x29edf7 + _0x5da426 + _0x5ecaa6 + this.rd;

        return _0x3d38d4[this.enc](_0x40fab9, _0xad41ca);
    }

    ['__genH5st'](_0x2ee2dc) {
        let _0x4ff99c = this.__genKey(this.tk, this.fp, this.timestamp, this.appId, CryptoJS).toString(CryptoJS.enc.Hex),
            _0xbfc6cb = '';

        for (let _0x52aea5 of Object.keys(_0x2ee2dc)) {
            _0x52aea5 === 'body' ? _0xbfc6cb += _0x52aea5 + ':' + CryptoJS.SHA256(_0x2ee2dc[_0x52aea5]).toString(CryptoJS.enc.Hex) + '&' : _0xbfc6cb += _0x52aea5 + ':' + _0x2ee2dc[_0x52aea5] + '&';
        }

        _0xbfc6cb = _0xbfc6cb.slice(0, -1);
        _0xbfc6cb = CryptoJS.HmacSHA256(_0xbfc6cb, _0x4ff99c).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ';' + this.fp + ';' + this.appId.toString() + ';' + this.tk + ';' + _0xbfc6cb + ';3.0;' + this.time.toString());
    }

}

const _0x74ed9b = {};
_0x74ed9b.getbody = _0x23aea3, module.exports = _0x74ed9b;