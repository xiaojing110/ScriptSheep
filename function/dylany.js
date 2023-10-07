const _0x4089bd = require('crypto-js'),
    _0x581eb2 = require('got'),
    _0x355bfe = {};
function _0x93515c(_0x1538dc) {
    if (_0x1538dc === '3.1') {
        var _0x62a993 = '',
            _0x463018 = '0123456789',
            _0x2b34ed = _0x463018,
            _0xb1a754 = Math.floor(Math.random() * 10),
            _0x79eb4e,
            _0x26c170 = 12;
        do {
            const _0x8219d3 = {};
            _0x8219d3.size = 0x1, _0x8219d3.num = _0x463018, (_0x79eb4e = _0x33da12(_0x8219d3), _0x62a993.indexOf(_0x79eb4e) == -1 && (_0x62a993 += _0x79eb4e));
        } while (_0x62a993.length < 3);
        for (let _0x2f6257 of _0x62a993.slice()) {
            _0x2b34ed = _0x2b34ed.replace(_0x2f6257, '');
        }
        const _0x40aff6 = {};
        _0x40aff6.size = _0xb1a754, _0x40aff6.num = _0x2b34ed;
        var _0x19b870 = _0x33da12(_0x40aff6) + _0x62a993 + _0x33da12({
            'size': _0x26c170 - _0xb1a754,
            'num': _0x2b34ed
        }) + _0xb1a754,
            _0x625762 = _0x19b870.split(''),
            _0x28eb99 = [];
        for (; _0x625762.length;) {
            _0x28eb99.push(9 - parseInt(_0x625762.pop()));
        }
        _0x19b870 = _0x28eb99.join('');
    } else {
        var _0x26c170 = 12,
            _0x62a993 = '',
            _0x463018 = '0123456789',
            _0x2b34ed = _0x463018,
            _0xb1a754 = Math.floor(Math.random() * 10),
            _0x79eb4e;
        do {
            const _0x6985f8 = {};
            _0x6985f8.size = 0x1, _0x6985f8.num = _0x463018, (_0x79eb4e = _0x33da12(_0x6985f8), _0x62a993.indexOf(_0x79eb4e) == -1 && (_0x62a993 += _0x79eb4e));
        } while (_0x62a993.length < 3);
        for (let _0x3cdb26 of _0x62a993.slice()) {
            _0x2b34ed = _0x2b34ed.replace(_0x3cdb26, '');
        }
        const _0x4601b4 = {};
        _0x4601b4.size = _0xb1a754, _0x4601b4.num = _0x2b34ed;
        var _0x19b870 = _0x33da12(_0x4601b4) + _0x62a993 + _0x33da12({
            'size': _0x26c170 - _0xb1a754,
            'num': _0x2b34ed
        }) + _0xb1a754;
    }
    return _0x19b870;
}
function _0x33da12() {
    var _0x1eb361,
        _0x4cf38c = arguments.length > 0 && 'undefined' !== arguments[0] ? arguments[0] : {},
        _0x4fe60d = _0x4cf38c.size,
        _0x1208ff = 'undefined' === _0x4fe60d ? 10 : _0x4fe60d,
        _0x3f51ef = _0x4cf38c.dictType,
        _0x2f6284 = 'undefined' === _0x3f51ef ? 'number' : _0x3f51ef,
        _0x3dfae2 = _0x4cf38c.num,
        _0x1208ee = '';
    if (_0x3dfae2 && 'string' == typeof _0x3dfae2) _0x1eb361 = _0x3dfae2;
    for (; _0x1208ff--;) _0x1208ee += _0x1eb361[Math.floor(Math.random() * _0x1eb361.length)];
    return _0x1208ee;
}
function _0x2e7e12() {
    var _0x1bc226 = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : Date.now(),
        _0x41f558 = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 'yyyy-MM-dd',
        _0x5e56e9 = new Date(_0x1bc226),
        _0x40be74 = _0x41f558,
        _0x103081 = {
            'M+': _0x5e56e9.getMonth() + 1,
            'd+': _0x5e56e9.getDate(),
            'D+': _0x5e56e9.getDate(),
            'h+': _0x5e56e9.getHours(),
            'H+': _0x5e56e9.getHours(),
            'm+': _0x5e56e9.getMinutes(),
            's+': _0x5e56e9.getSeconds(),
            'w+': _0x5e56e9.getDay(),
            'q+': Math.floor((_0x5e56e9.getMonth() + 3) / 3),
            'S+': _0x5e56e9.getMilliseconds()
        };
    return /(y+)/i.test(_0x40be74) && (_0x40be74 = _0x40be74.replace(RegExp.$1, ''.concat(_0x5e56e9.getFullYear()).substr(4 - RegExp.$1.length))), Object.keys(_0x103081).forEach(function (_0x3b070d) {
        if (new RegExp('('.concat(_0x3b070d, ')')).test(_0x40be74)) {
            var _0x1c2696 = 'S+' === _0x3b070d ? '000' : '00';
            _0x40be74 = _0x40be74.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x103081[_0x3b070d] : ''.concat(_0x1c2696).concat(_0x103081[_0x3b070d]).substr(''.concat(_0x103081[_0x3b070d]).length));
        }
    }), _0x40be74;
}
function _0x4e0463(_0x54ab00, _0x3254b9, _0xdeb611, _0x2351ad, _0x3cfa11) {
    let _0x4a7ad7 = {
        'version': _0x3cfa11,
        'fp': _0x3254b9,
        'appId': _0x54ab00,
        'timestamp': Date.now(),
        'platform': 'web',
        'expandParams': ''
    };
    _0x4a7ad7.expandParams = _0x2351ad || '';
    const _0x476689 = {};
    _0x476689.Host = 'cactus.jd.com', _0x476689['Content-Type'] = 'application/json', _0x476689['User-agent'] = _0xdeb611;
    let _0x3edfad = {
        'url': 'https://cactus.jd.com/request_algo?g_ty=ajax',
        'body': JSON.stringify(_0x4a7ad7),
        'headers': _0x476689,
        'timeout': 0x7530
    };
    return new Promise(async _0x5a2236 => {
        _0x3d9aa6(_0x3edfad, (_0x42fed0, _0x53b617, _0x334e45) => {
            try {
                if (_0x42fed0) {
                    console.log('' + JSON.stringify(_0x42fed0)), console.log('getgo 请求失败，请检查网路重试');
                } else {
                    _0x334e45 = JSON.parse(_0x334e45), _0x334e45 = _0x334e45.data.result;
                }
            } catch (_0x29e8de) {
                console(_0x29e8de, _0x53b617);
            } finally {
                _0x5a2236(_0x334e45);
            }
        });
    });
}
async function _0x22e5cb(_0x54689e) {
    let _0x5e48f3 = '3.1',
        {
            body: _0x4511c4,
            ua: _0x33b29c,
            user: _0x2188e8,
            ver: _0x47d445,
            cl: _0x288c94,
            fn: _0x3a2957,
            appId: _0x2fdc57,
            code: _0x48e0cc,
            apid: _0x4aa1bc,
            flag: _0x40df6e
        } = _0x54689e;
    (!_0x355bfe[_0x2fdc57] || _0x40df6e) && (_0x355bfe[_0x2fdc57] = {}, _0x355bfe[_0x2fdc57].fp = _0x93515c(_0x5e48f3));
    _0x4511c4 = typeof _0x4511c4 !== 'string' ? JSON.stringify(_0x4511c4) : _0x4511c4;
    let _0x104b91 = ['wc', 'wd', 'l', 'ls', 'ml', 'pl', 'av', 'ua', 'sua', 'pp', 'pp1', 'w', 'h', 'ow', 'oh', 'url', 'og', 'pr', 're'],
        _0x50cc07 = {};
    const _0x343cdb = {};
    _0x343cdb.p1 = _0x2188e8;
    let _0x2dcd41 = [1, 0, 'zh-CN', 'zh-CN', 0, 0, '', _0x33b29c, _0x33b29c.match(/\(([^\)]+)\)/)[1], _0x343cdb, '', 393, 873, 393, 779, '', '', 2.75, ''];
    for (let _0x203c25 in _0x104b91) {
        _0x50cc07[_0x104b91[_0x203c25]] = _0x2dcd41[_0x203c25];
    }
    const _0xbe7045 = {};
    _0xbe7045.ai = _0x2fdc57, _0xbe7045.fp = _0x355bfe[_0x2fdc57].fp;
    const _0x9c0862 = {
        ..._0x50cc07,
        ..._0xbe7045
    };
    let _0x4112f7 = _0x9c0862,
        _0x895865 = _0x4089bd.AES.encrypt(JSON.stringify(_0x4112f7, null, 2), _0x4089bd.enc.Utf8.parse('wm0!@w-s#ll1flo('), {
            'iv': _0x4089bd.enc.Utf8.parse('0102030405060708'),
            'mode': _0x4089bd.mode.CBC,
            'padding': _0x4089bd.pad.Pkcs7
        }),
        _0x349fc5 = _0x895865.ciphertext.toString(),
        _0x4290a7 = new Date().getTime();
    if (!_0x355bfe[_0x2fdc57].tk || _0x40df6e) {
        let _0x30c677 = await _0x4e0463(_0x2fdc57, _0x355bfe[_0x2fdc57].fp, _0x33b29c, _0x349fc5, _0x5e48f3);
        if (!_0x30c677) _0x30c677 = await _0x4e0463(_0x2fdc57, _0x355bfe[_0x2fdc57].fp, _0x33b29c, _0x349fc5, _0x5e48f3);
        if (!_0x30c677) return 'functionId=' + _0x3a2957 + '&appid=' + _0x4aa1bc + '&body=' + _0x4511c4;
        _0x355bfe[_0x2fdc57].tk = _0x30c677.tk, _0x355bfe[_0x2fdc57].algo = _0x30c677.algo;
    }
    let _0x18a8c6 = new Date().getTime(),
        _0x1c512d = _0x2e7e12(_0x18a8c6, 'yyyyMMddhhmmssSSS'),
        _0x3ac649 = _0x355bfe[_0x2fdc57].tk,
        _0x426154 = new Function('return ' + _0x355bfe[_0x2fdc57].algo)(),
        _0x200180 = await _0x426154(_0x3ac649, _0x355bfe[_0x2fdc57].fp, _0x1c512d, _0x2fdc57, _0x4089bd).toString();
    const _0x44587a = {};
    _0x44587a.appid = _0x4aa1bc, _0x44587a.functionId = _0x3a2957, _0x44587a.body = _0x4511c4;
    let _0x5470dc = _0x44587a;
    _0x47d445 && (_0x5470dc.clientVersion = _0x47d445), _0x288c94 && (_0x5470dc.client = _0x288c94);
    if (_0x48e0cc) _0x5470dc.t = _0x4290a7;
    let _0x2316bc = _0x5470dc,
        _0x5c4a2a = ['appid', 'body', 'client', 'clientVersion', 'functionId', 't'],
        _0x7b8e63 = _0x5c4a2a.filter(_0x54704d => _0x5470dc[_0x54704d]).map(_0x4248b2 => _0x4248b2 + ':' + (_0x4248b2 == 'body' ? _0x4089bd.SHA256(_0x5470dc[_0x4248b2]).toString() : _0x5470dc[_0x4248b2])).join('&'),
        _0x1a9978 = Date.now() > '1698768000000' ? _0x4089bd.MD5(_0x7b8e63, _0x200180).toString(_0x4089bd.enc.Hex) : _0x4089bd.HmacSHA256(_0x7b8e63, _0x200180).toString(_0x4089bd.enc.Hex),
        _0x519d14 = '';
    if (_0x5e48f3 === '3.1') {
        let _0x28157a = {};
        _0x28157a.sua = _0x33b29c.match(/\(([^\)]+)\)/)[1], _0x28157a.pp = {}, _0x28157a.fp = _0x355bfe[_0x2fdc57].fp, _0x28157a.pp.p1 = _0x2188e8;
        let _0x5174cd = _0x4089bd.AES.encrypt(JSON.stringify(_0x28157a, null, 2), _0x4089bd.enc.Utf8.parse('wm0!@w_s#ll1flo('), {
            'iv': _0x4089bd.enc.Utf8.parse('0102030405060708'),
            'mode': _0x4089bd.mode.CBC,
            'padding': _0x4089bd.pad.Pkcs7
        });
        _0x519d14 = _0x5174cd.ciphertext.toString();
    }
    let _0x33a8bb = [_0x1c512d, _0x355bfe[_0x2fdc57].fp, _0x2fdc57, _0x3ac649, _0x1a9978, _0x5e48f3, _0x18a8c6, _0x519d14].join(';'),
        _0x3e2d01 = Object.entries(_0x2316bc).map(([_0x1704f7, _0xabbae2]) => _0x1704f7 + '=' + (typeof _0xabbae2 == 'string' ? encodeURIComponent(_0xabbae2) : encodeURIComponent(JSON.stringify(_0xabbae2)))).join('&');
    return _0x3e2d01 + '&h5st=' + encodeURIComponent(_0x33a8bb);
}
function _0x3d9aa6(_0x5a26d5, _0x1cef82 = () => { }) {
    const {
        url: _0x16f57c,
        ..._0x33e828
    } = _0x5a26d5;
    _0x581eb2.post(_0x16f57c, _0x33e828).then(_0x47a1bf => {
        const {
            statusCode: _0x1c9114,
            statusCode: _0x4abc0f,
            headers: _0x13a23a,
            body: _0x4c6c29
        } = _0x47a1bf,
            _0x1e2b1e = {};
        _0x1e2b1e.status = _0x1c9114, _0x1e2b1e.statusCode = _0x4abc0f, _0x1e2b1e.headers = _0x13a23a, _0x1e2b1e.body = _0x4c6c29, _0x1cef82(null, _0x1e2b1e, _0x4c6c29);
    }, _0x598a73 => {
        const {
            message: _0x2e34b0,
            response: _0xf003d5
        } = _0x598a73;
        _0x1cef82(_0x2e34b0, _0xf003d5, _0xf003d5 && _0xf003d5.body);
    });
}
class _0x2941a5 {
    constructor(_0x58e4c6, _0x5a61d4, _0x115f1a) {
        this[_0x58e4c6] = _0x58e4c6, this.ua = _0x5a61d4, this.fp = _0x115f1a || this.__genFp();
    }
    ['__genFp']() {
        let _0x5cef40 = '0123456789',
            _0x323e26 = 13,
            _0x5d84b8 = '';
        for (; _0x323e26--;) _0x5d84b8 += _0x5cef40[Math.random() * _0x5cef40.length | 0];
        return (_0x5d84b8 + Date.now()).slice(0, 16);
    }
    async ['__genAlgo']() {
        this.time = Date.now(), this.timestamp = format(this.time, 'yyyyMMddHHmmssSSS');
        let {
            data: _0x216378
        } = await axios.post('https://cactus.jd.com/request_algo?g_ty=ajax', {
            'version': '3.0',
            'fp': this.fp,
            'appId': this[appId].toString(),
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
        this.tk = _0x216378.data.result.tk, this.rd = _0x216378.data.result.algo.match(/rd='(.*)'/)[1], this.enc = _0x216378.data.result.algo.match(/algo\.(.*)\(/)[1];
    }
    ['__genKey'](_0x10a5d5, _0x5a835d, _0x44e346, _0x30202b, _0x5e1f17) {
        let _0x2bcbea = '' + _0x10a5d5 + _0x5a835d + _0x44e346 + _0x30202b + this.rd;
        return _0x5e1f17[this.enc](_0x2bcbea, _0x10a5d5);
    }
    ['__genH5st'](_0x24bf1e) {
        let _0x312eaf = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex),
            _0xd56e27 = '';
        for (let _0x3c17e7 of Object.keys(_0x24bf1e)) {
            _0x3c17e7 === 'body' ? _0xd56e27 += _0x3c17e7 + ':' + CryptoJS.SHA256(_0x24bf1e[_0x3c17e7]).toString(CryptoJS.enc.Hex) + '&' : _0xd56e27 += _0x3c17e7 + ':' + _0x24bf1e[_0x3c17e7] + '&';
        }
        return _0xd56e27 = _0xd56e27.slice(0, -1), _0xd56e27 = CryptoJS.HmacSHA256(_0xd56e27, _0x312eaf).toString(CryptoJS.enc.Hex), encodeURIComponent(this.timestamp + ';' + this.fp + ';' + this[appId].toString() + ';' + this.tk + ';' + _0xd56e27 + ';3.0;' + this.time.toString());
    }
}
const _0x3941c7 = {};
_0x3941c7.getbody = _0x22e5cb, module.exports = _0x3941c7;
