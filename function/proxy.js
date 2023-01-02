const _0x468a29 = require('got');

let _0x5533ad;

try {
    _0x5533ad = require('https-proxy-agent');
} catch (_0x2d36a0) {
    console.log('\n缺少https-proxy-agent依赖，请运行依赖安装或手动安装!\n');
    return;
}

let _0x26e195 = process.env.DY_PROXY,
    _0x5b979c = 0;

async function _0x3908e4(_0x89915b) {
    const _0xc43cb = await _0x468a29(_0x89915b, {});

    return _0xc43cb.body.replace('\n', '');
}

function _0x14a6ad(_0x399f48) {
    return ddd = async (_0x306283, _0x18be73) => {
        {
            _0x26e195 && (_0x5b979c % 10 == 0 || this.failed) && (this.ip = await _0x3908e4(_0x26e195), this.agent = new _0x5533ad('http://' + this.ip), _0x5b979c = 0);
            const _0x127172 = {};
            _0x127172.https = this.agent, _0x127172.http = this.agent, _0x306283.agent = _0x127172, _0x306283.timeout = 10000, _0x399f48(_0x306283, async (_0x28df4a, _0x1cacf6, _0x3b69a5) => {
                try {
                    _0x28df4a ? (console.log(JSON.stringify(_0x28df4a)), this.failed = true, await ddd(_0x306283, _0x18be73)) : (_0x5b979c++, _0x26e195 ? console.log('当前使用代理：' + this.ip) : '', this.failed = false, _0x18be73(_0x28df4a, _0x1cacf6, _0x3b69a5));
                } catch (_0xa509ff) {
                    console.log(_0xa509ff);
                }
            });
        }
    };
}

const _0x45d234 = {};
_0x45d234.intoRequest = _0x14a6ad, module.exports = _0x45d234;

