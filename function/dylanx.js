const _0x302d24 = require('got');
let _0x32220e = 'https://6dy.nbplay.site/sign';
// if (!__filename.includes('6dy')) _0x32220e = 'http://api.nolanstore.cc/sign';
const _0x4dbb71 = process.env.SIGN_URL ? process.env.SIGN_URL : _0x32220e;
async function _0xc9cb0f(_0x1ea9d2, _0x44de46, _0x2c4333) {
    const _0x919427 = {};
    _0x919427.fn = _0x1ea9d2, _0x919427.body = _0x44de46;
    let _0x338f82 = '',
        _0x4f8240 = '',
        _0x5cb9db = _0x919427;
    _0x2c4333 && (_0x5cb9db.ver = _0x2c4333);
    const _0x31fd71 = {};
    _0x31fd71.limit = 0x1, _0x31fd71.methods = ['GET', 'POST'];
    const _0x27d8f6 = {};
    return _0x27d8f6.request = 0x7530, _0x338f82 = await _0x302d24.post(_0x4dbb71, {
        'json': _0x5cb9db,
        'retry': _0x31fd71,
        'hooks': {
            'beforeRetry': [(_0x586fba, _0x4e306a) => {
                if (_0x4e306a) { }
            }]
        },
        'timeout': _0x27d8f6
    }).json().catch(async _0x24152e => {
        console.log('sign获取失败,重试...\n'), _0x4f8240 = await _0x5f6def(_0x1ea9d2, _0x44de46);
    }), _0x4f8240 ? _0x4f8240.body : _0x338f82.body;
}
async function _0x5f6def(_0x423ed8, _0x3d6d73) {
    const _0x419f27 = {};
    _0x419f27.fn = _0x423ed8, _0x419f27.body = _0x3d6d73;
    const _0x44cbde = {};
    _0x44cbde.request = 0x7530;
    let _0x343cbb = await _0x302d24.post('http://api.nolanstore.cc/sign', {
        'json': _0x419f27,
        'retry': {
            'limit': 0x1,
            'methods': ['GET', 'POST']
        },
        'hooks': {
            'beforeRetry': [(_0x34a430, _0x17520b) => {
                if (_0x17520b) { }
            }]
        },
        'timeout': _0x44cbde
    }).json().catch(_0x215b63 => {
        console.log(_0x215b63.message), console.log('sign获取失败,请检查网络！\n');
    });
    return _0x343cbb;
}
async function _0x5e0eb9(_0x368efd, _0x3b5205) {
    const _0x57c7e5 = {};
    _0x57c7e5.fn = _0x368efd, _0x57c7e5.body = _0x3b5205;
    const _0x29edaa = {};
    _0x29edaa.limit = 0x1, _0x29edaa.methods = ['GET', 'POST'];
    const _0x2b2548 = {};
    _0x2b2548.beforeRetry = [(_0x1e85e4, _0x405c7d) => {
        if (_0x405c7d) { }
    }];
    const _0x23d0da = {};
    _0x23d0da.request = 0x7530;
    const _0x5a6a00 = {};
    _0x5a6a00.json = _0x57c7e5, _0x5a6a00.retry = _0x29edaa, _0x5a6a00.hooks = _0x2b2548, _0x5a6a00.timeout = _0x23d0da;
    let _0x10e883 = await _0x302d24.post('http://api.nolanstore.cc/sign', _0x5a6a00).json().catch(_0x381607 => {
        console.log(_0x381607.message), console.log('sign获取失败,请检查网络！\n');
    });
    return _0x10e883.body;
}
const _0x17787a = {};
_0x17787a.getbody = _0xc9cb0f, _0x17787a.getbody2 = _0x5e0eb9, module.exports = _0x17787a;