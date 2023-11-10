const _0x2176ab = require("crypto-js"),
    _0x4d4e99 = require("got"),
    _0x34200d = {};

function _0x1c4291(_0xf11402) {
    if (_0xf11402 === "3.1") {
        var _0x239e14 = "",
            _0x4db48e = "0123456789",
            _0x109f48 = _0x4db48e,
            _0xeec54c = Math.floor(Math.random() * 10),
            _0x416cc9,
            _0x591479 = 12;

        do {
            const _0x340ab3 = {
                size: 1,
                num: _0x4db48e
            };
            _0x416cc9 = _0xab43af(_0x340ab3);
            _0x239e14.indexOf(_0x416cc9) == -1 && (_0x239e14 += _0x416cc9);
        } while (_0x239e14.length < 3);

        for (let _0x4887c0 of _0x239e14.slice()) {
            _0x109f48 = _0x109f48.replace(_0x4887c0, "");
        }

        const _0x545cbc = {
            size: _0xeec54c,
            num: _0x109f48
        };
        const _0xc9de5e = {
            size: _0x591479 - _0xeec54c,
            num: _0x109f48
        };

        var _0x4c0763 = _0xab43af(_0x545cbc) + _0x239e14 + _0xab43af(_0xc9de5e) + _0xeec54c,
            _0x5d785a = _0x4c0763.split(""),
            _0x84e9fd = [];

        for (; _0x5d785a.length;) {
            _0x84e9fd.push(9 - parseInt(_0x5d785a.pop()));
        }

        _0x4c0763 = _0x84e9fd.join("");
    } else {
        var _0x591479 = 12,
            _0x239e14 = "",
            _0x4db48e = "0123456789",
            _0x109f48 = _0x4db48e,
            _0xeec54c = Math.floor(Math.random() * 10),
            _0x416cc9;

        do {
            const _0x51c172 = {
                size: 1,
                num: _0x4db48e
            };
            _0x416cc9 = _0xab43af(_0x51c172);
            _0x239e14.indexOf(_0x416cc9) == -1 && (_0x239e14 += _0x416cc9);
        } while (_0x239e14.length < 3);

        for (let _0x1b9d76 of _0x239e14.slice()) {
            _0x109f48 = _0x109f48.replace(_0x1b9d76, "");
        }

        const _0x38fd37 = {
            size: _0xeec54c,
            num: _0x109f48
        };
        const _0x5e4755 = {
            size: _0x591479 - _0xeec54c,
            num: _0x109f48
        };

        var _0x4c0763 = _0xab43af(_0x38fd37) + _0x239e14 + _0xab43af(_0x5e4755) + _0xeec54c;
    }

    return _0x4c0763;
}

function _0xab43af() {
    var _0x2fe7ae,
        _0x3b51ba = arguments.length > 0 && "undefined" !== arguments[0] ? arguments[0] : {},
        _0x468f6b = _0x3b51ba.size,
        _0x3f29e0 = "undefined" === _0x468f6b ? 10 : _0x468f6b,
        _0x140c0d = _0x3b51ba.num,
        _0x62f45c = "";

    if (_0x140c0d && "string" == typeof _0x140c0d) {
        _0x2fe7ae = _0x140c0d;
    }

    for (; _0x3f29e0--;) {
        _0x62f45c += _0x2fe7ae[Math.floor(Math.random() * _0x2fe7ae.length)];
    }

    return _0x62f45c;
}

function _0x163df0() {
    var _0x2232d8 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : Date.now(),
        _0xd82981 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "yyyy-MM-dd",
        _0x49d4b1 = new Date(_0x2232d8),
        _0x2bd7e6 = _0xd82981,
        _0x5a85d6 = {
            "M+": _0x49d4b1.getMonth() + 1,
            "d+": _0x49d4b1.getDate(),
            "D+": _0x49d4b1.getDate(),
            "h+": _0x49d4b1.getHours(),
            "H+": _0x49d4b1.getHours(),
            "m+": _0x49d4b1.getMinutes(),
            "s+": _0x49d4b1.getSeconds(),
            "w+": _0x49d4b1.getDay(),
            "q+": Math.floor((_0x49d4b1.getMonth() + 3) / 3),
            "S+": _0x49d4b1.getMilliseconds()
        };

    /(y+)/i.test(_0x2bd7e6) && (_0x2bd7e6 = _0x2bd7e6.replace(RegExp.$1, "".concat(_0x49d4b1.getFullYear()).substr(4 - RegExp.$1.length)));
    Object.keys(_0x5a85d6).forEach(function (_0x4d37e8) {
        if (new RegExp("(".concat(_0x4d37e8, ")")).test(_0x2bd7e6)) {
            var _0x32f434 = "S+" === _0x4d37e8 ? "000" : "00";

            _0x2bd7e6 = _0x2bd7e6.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x5a85d6[_0x4d37e8] : "".concat(_0x32f434).concat(_0x5a85d6[_0x4d37e8]).substr("".concat(_0x5a85d6[_0x4d37e8]).length));
        }
    });
    return _0x2bd7e6;
}

function _0x170467(_0x53780d, _0x3b5baf, _0x1eb50, _0x238cad, _0x9ab366) {
    let _0x2392b2 = {
        version: _0x9ab366,
        fp: _0x3b5baf,
        appId: _0x53780d,
        timestamp: Date.now(),
        platform: "web",
        expandParams: ""
    };
    _0x2392b2.expandParams = _0x238cad || "";
    const _0x162dfb = {
        Host: "cactus.jd.com",
        "Content-Type": "application/json",
        "User-agent": _0x1eb50
    };
    let _0x376cdd = {
        url: "https://cactus.jd.com/request_algo?g_ty=ajax",
        body: JSON.stringify(_0x2392b2),
        headers: _0x162dfb,
        timeout: 30000
    };
    return new Promise(async _0x4ddc26 => {
        _0x58e150(_0x376cdd, (_0x35cf70, _0x3c2fc9, _0xebff61) => {
            try {
                _0x35cf70 ? (console.log("" + JSON.stringify(_0x35cf70)), console.log("getgo 请求失败，请检查网路重试")) : (_0xebff61 = JSON.parse(_0xebff61), _0xebff61 = _0xebff61.data.result);
            } catch (_0x4d132f) {
                console(_0x4d132f, _0x3c2fc9);
            } finally {
                _0x4ddc26(_0xebff61);
            }
        });
    });
}

async function _0x4effd2(_0x16352b) {
    let _0x545204 = "3.1",
        {
            body: _0x47d401,
            ua: _0x4b9d95,
            user: _0xa86e05,
            ver: _0xa9e21c,
            cl: _0x2edec7,
            fn: _0x11997b,
            appId: _0x13abe3,
            code: _0x20ed3e,
            apid: _0x263d96,
            flag: _0x472fb4
        } = _0x16352b;
    (!_0x34200d[_0x13abe3] || _0x472fb4) && (_0x34200d[_0x13abe3] = {}, _0x34200d[_0x13abe3].fp = _0x1c4291(_0x545204));
    _0x47d401 = typeof _0x47d401 !== "string" ? JSON.stringify(_0x47d401) : _0x47d401;
    let _0x5c361d = ["wc", "wd", "l", "ls", "ml", "pl", "av", "ua", "sua", "pp", "pp1", "w", "h", "ow", "oh", "url", "og", "pr", "re"],
        _0x53b5f4 = {};
    const _0x11a556 = {
        p1: _0xa86e05
    };
    let _0x3041a7 = [1, 0, "zh-CN", "zh-CN", 0, 0, "", _0x4b9d95, _0x4b9d95.match(/\(([^\)]+)\)/)[1], _0x11a556, "", 393, 873, 393, 779, "", "", 2.75, ""];

    for (let _0x553c97 in _0x5c361d) {
        _0x53b5f4[_0x5c361d[_0x553c97]] = _0x3041a7[_0x553c97];
    }

    const _0x517c66 = {
        ai: _0x13abe3,
        fp: _0x34200d[_0x13abe3].fp
    };
    const _0x5468bc = {
        ..._0x53b5f4,
        ..._0x517c66
    };

    let _0x42d5d3 = _0x5468bc,
        _0x2b354c = _0x2176ab.AES.encrypt(JSON.stringify(_0x42d5d3, null, 2), _0x2176ab.enc.Utf8.parse("wm0!@w-s#ll1flo("), {
            iv: _0x2176ab.enc.Utf8.parse("0102030405060708"),
            mode: _0x2176ab.mode.CBC,
            padding: _0x2176ab.pad.Pkcs7
        }),
        _0x54f9b9 = _0x2b354c.ciphertext.toString(),
        _0x5e797a = new Date().getTime();

    if (!_0x34200d[_0x13abe3].tk || _0x472fb4) {
        let _0x1eec27 = await _0x170467(_0x13abe3, _0x34200d[_0x13abe3].fp, _0x4b9d95, _0x54f9b9, _0x545204);

        if (!_0x1eec27) {
            _0x1eec27 = await _0x170467(_0x13abe3, _0x34200d[_0x13abe3].fp, _0x4b9d95, _0x54f9b9, _0x545204);
        }

        if (!_0x1eec27) {
            return "functionId=" + _0x11997b + "&appid=" + _0x263d96 + "&body=" + _0x47d401;
        }

        _0x34200d[_0x13abe3].tk = _0x1eec27.tk;
        _0x34200d[_0x13abe3].algo = _0x1eec27.algo;
    }

    let _0xab03fb = new Date().getTime(),
        _0x3513f9 = _0x163df0(_0xab03fb, "yyyyMMddhhmmssSSS"),
        _0x5e4f74 = _0x34200d[_0x13abe3].tk,
        _0xb13dd5 = new Function("return " + _0x34200d[_0x13abe3].algo)(),
        _0x219f2e = await _0xb13dd5(_0x5e4f74, _0x34200d[_0x13abe3].fp, _0x3513f9, _0x13abe3, _0x2176ab).toString();

    const _0x3ce142 = {
        appid: _0x263d96,
        functionId: _0x11997b,
        body: _0x47d401
    };
    _0xa9e21c && (_0x3ce142.clientVersion = _0xa9e21c);
    _0x2edec7 && (_0x3ce142.client = _0x2edec7);

    if (_0x20ed3e) {
        _0x3ce142.t = _0x5e797a;
    }

    let _0x208382 = _0x3ce142,
        _0x144ae8 = ["appid", "body", "client", "clientVersion", "functionId", "t"],
        _0x356548 = _0x144ae8.filter(_0x5f584e => _0x3ce142[_0x5f584e]).map(_0x2580bb => _0x2580bb + ":" + (_0x2580bb == "body" ? _0x2176ab.SHA256(_0x3ce142[_0x2580bb]).toString() : _0x3ce142[_0x2580bb])).join("&"),
        _0x3ae943 = Date.now() > "1709563237000" ? _0x2176ab.MD5(_0x356548, _0x219f2e).toString(_0x2176ab.enc.Hex) : _0x2176ab.HmacSHA256(_0x356548, _0x219f2e).toString(_0x2176ab.enc.Hex),
        _0x26d4fd = "";

    let _0x1477f9 = {};
    _0x1477f9.sua = _0x4b9d95.match(/\(([^\)]+)\)/)[1];
    _0x1477f9.pp = {};
    _0x1477f9.fp = _0x34200d[_0x13abe3].fp;
    _0x1477f9.pp.p1 = _0xa86e05;

    let _0x2ca499 = _0x2176ab.AES.encrypt(JSON.stringify(_0x1477f9, null, 2), _0x2176ab.enc.Utf8.parse("wm0!@w_s#ll1flo("), {
        iv: _0x2176ab.enc.Utf8.parse("0102030405060708"),
        mode: _0x2176ab.mode.CBC,
        padding: _0x2176ab.pad.Pkcs7
    });

    _0x26d4fd = _0x2ca499.ciphertext.toString();

    let _0x2b461f = [_0x3513f9, _0x34200d[_0x13abe3].fp, _0x13abe3, _0x5e4f74, _0x3ae943, _0x545204, _0xab03fb, _0x26d4fd].join(";"),
        _0x56f61f = Object.entries(_0x208382).map(([_0x58ce44, _0x25aaff]) => _0x58ce44 + "=" + (typeof _0x25aaff == "string" ? encodeURIComponent(_0x25aaff) : encodeURIComponent(JSON.stringify(_0x25aaff)))).join("&");

    return _0x56f61f + "&h5st=" + encodeURIComponent(_0x2b461f);
}

function _0x58e150(_0x2f022b, _0x404c4f = () => { }) {
    const {
        url: _0x12033e,
        ..._0x40f1f1
    } = _0x2f022b;

    _0x4d4e99.post(_0x12033e, _0x40f1f1).then(_0x37e463 => {
        const {
            statusCode: _0x46e1e7,
            statusCode: _0x1a3374,
            headers: _0x5171c9,
            body: _0x10af3a
        } = _0x37e463,
            _0x1cdd9a = {
                status: _0x46e1e7,
                statusCode: _0x1a3374,
                headers: _0x5171c9,
                body: _0x10af3a
            };

        _0x404c4f(null, _0x1cdd9a, _0x10af3a);
    }, _0x21f64c => {
        const {
            message: _0x4708b8,
            response: _0x1ba65c
        } = _0x21f64c;

        _0x404c4f(_0x4708b8, _0x1ba65c, _0x1ba65c && _0x1ba65c.body);
    });
}

class _0x122441 {
    constructor(_0xbfde9f, _0x54f40b, _0x3987a6) {
        this[_0xbfde9f] = _0xbfde9f;
        this.ua = _0x54f40b;
        this.fp = _0x3987a6 || this.__genFp();
    }

    __genFp() {
        let _0x3b3600 = "0123456789",
            _0x53bf9a = 13,
            _0x3a9512 = "";

        for (; _0x53bf9a--;) {
            _0x3a9512 += _0x3b3600[Math.random() * _0x3b3600.length | 0];
        }

        return (_0x3a9512 + Date.now()).slice(0, 16);
    }

    async __genAlgo() {
        this.time = Date.now();
        this.timestamp = format(this.time, "yyyyMMddHHmmssSSS");
        let {
            data: _0x3f0d11
        } = await axios.post("https://cactus.jd.com/request_algo?g_ty=ajax", {
            version: "3.0",
            fp: this.fp,
            appId: this[appId].toString(),
            timestamp: this.time,
            platform: "web",
            expandParams: ""
        }, {
            headers: {
                Host: "cactus.jd.com",
                accept: "application/json",
                "content-type": "application/json",
                "user-agent": this.ua
            }
        });
        this.tk = _0x3f0d11.data.result.tk;
        this.rd = _0x3f0d11.data.result.algo.match(/rd='(.*)'/)[1];
        this.enc = _0x3f0d11.data.result.algo.match(/algo\.(.*)\(/)[1];
    }

    __genKey(_0x2b6918, _0x3ec16a, _0x36ca52, _0x2515ac, _0x541a27) {
        let _0x37d018 = "" + _0x2b6918 + _0x3ec16a + _0x36ca52 + _0x2515ac + this.rd;

        return _0x541a27[this.enc](_0x37d018, _0x2b6918);
    }

    __genH5st(_0x313b7c) {
        let _0x5bd6e9 = this.__genKey(this.tk, this.fp, this.timestamp, this[appId], CryptoJS).toString(CryptoJS.enc.Hex),
            _0x3b236c = "";

        for (let _0x52cf27 of Object.keys(_0x313b7c)) {
            _0x52cf27 === "body" ? _0x3b236c += _0x52cf27 + ":" + CryptoJS.SHA256(_0x313b7c[_0x52cf27]).toString(CryptoJS.enc.Hex) + "&" : _0x3b236c += _0x52cf27 + ":" + _0x313b7c[_0x52cf27] + "&";
        }

        _0x3b236c = _0x3b236c.slice(0, -1);
        _0x3b236c = CryptoJS.HmacSHA256(_0x3b236c, _0x5bd6e9).toString(CryptoJS.enc.Hex);
        return encodeURIComponent(this.timestamp + ";" + this.fp + ";" + this[appId].toString() + ";" + this.tk + ";" + _0x3b236c + ";3.0;" + this.time.toString());
    }

}

const _0x37ca35 = {
    getbody: _0x4effd2
};
module.exports = _0x37ca35;