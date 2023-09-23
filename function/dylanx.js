const _0x5a4cfc = require("got");
let _0xfcb753 = "https://6dy.nbplay.site/sign";
// if (!__filename.includes("6dy")) {
//     _0xfcb753 = "http://api.nolanstore.cc/sign";
// }
const _0x1a61db = process.env.SIGN_URL ? process.env.SIGN_URL : _0xfcb753;
async function _0x3f28ed(_0x52d35e, _0x443cb6, _0x5a6bf6) {
    const _0x51034e = {
        fn: _0x52d35e,
        body: _0x443cb6
    };
    let _0x204a83 = "";
    let _0x600ea5 = "";
    let _0x5e5a31 = _0x51034e;
    if (_0x5a6bf6) {
        _0x5e5a31.ver = _0x5a6bf6;
    }
    const _0x310bac = {
        beforeRetry: [(_0x23f4b8, _0x446bb4) => {
            if (_0x446bb4) { }
        }]
    };
    const _0x37aac0 = {
        json: _0x5e5a31,
        retry: {
            limit: 1,
            methods: ["GET", "POST"]
        },
        hooks: _0x310bac,
        timeout: {
            lookup: 100,
            connect: 10000,
            secureConnect: 10000,
            socket: 10000,
            send: 10000,
            response: 10000,
            request: 10000
        }
    };
    _0x204a83 = await _0x5a4cfc.post(_0x1a61db, _0x37aac0).json().catch(async _0x57008e => {
        console.log("sign获取失败,重试...\n");
        _0x600ea5 = await _0x48198e(_0x52d35e, _0x443cb6);
    });
    if (_0x600ea5) {
        return _0x600ea5.body;
    } else {
        return _0x204a83.body;
    }
}
async function _0x48198e(_0x47c29b, _0x1bf785) {
    const _0x530ea9 = {
        fn: _0x47c29b,
        body: _0x1bf785
    };
    let _0x60e088 = await _0x5a4cfc.post("http://api.nolanstore.cc/sign", {
        json: _0x530ea9,
        retry: {
            limit: 1,
            methods: ["GET", "POST"]
        },
        hooks: {
            beforeRetry: [(_0x30d8c6, _0xb07e03) => {
                if (_0xb07e03) { }
            }]
        },
        timeout: {
            request: 30000
        }
    }).json().catch(_0x64dfe5 => {
        console.log(_0x64dfe5.message);
        console.log("sign获取失败,请检查网络！\n");
    });
    return _0x60e088;
}
async function _0x2e7915(_0x55e3ce, _0x537c79) {
    const _0x332e0c = {
        fn: _0x55e3ce,
        body: _0x537c79
    };
    const _0x4cfa26 = {
        beforeRetry: [(_0xd467b8, _0xec41b9) => {
            if (_0xec41b9) { }
        }]
    };
    const _0x47b2c2 = {
        json: _0x332e0c,
        retry: {
            limit: 1,
            methods: ["GET", "POST"]
        },
        hooks: _0x4cfa26,
        timeout: {
            request: 30000
        }
    };
    let _0x2fd2dd = await _0x5a4cfc.post("http://api.nolanstore.cc/sign", _0x47b2c2).json().catch(_0x1f991e => {
        console.log(_0x1f991e.message);
        console.log("sign获取失败,请检查网络！\n");
    });
    return _0x2fd2dd.body;
}
const _0x2097a5 = {
    getbody: _0x3f28ed,
    getbody2: _0x2e7915
};
module.exports = _0x2097a5;