const _0x5cc050 = require("got");

let _0x1d04a6,
    _0x1f2dd4,
    _0x5e309c = true;

try {
    _0x1d04a6 = require("https-proxy-agent").HttpsProxyAgent;
} catch (_0xe9a851) {
    console.log("未安装https-proxy-agent依赖，无法启用代理");
    process.exit();
}

const _0x3ec821 = process.env.DY_PROXY,
    _0x2dee8e = process.env.DY_SOCKS,
    _0xed24bc = process.env.PERMIT_API ? (process.env.PERMIT_API + "&test").split("&") : "",
    _0x15f7d1 = true;

let _0x20c1af = 1;

if (_0x2dee8e) {
    try {
        _0x1f2dd4 = require("socks-proxy-agent");
    } catch (_0x3c9919) {
        console.log(_0x3c9919);
    }

    console.log("代理模式为SOCKS5\n");
}

if (_0xed24bc == "") {
    console.log("\n---------------API代理模式（非白名单）已开启---------------\n");
} else {
    _0xed24bc && _0xed24bc.filter(_0x31e615 => process.mainModule.filename.includes(_0x31e615)).length != 0 ? console.log("\n---------------API代理模式（白名单）已开启---------------\n") : _0x5e309c = false;
}

async function _0x15c4f4(_0x257ea3) {
    const _0x24f2b6 = {
        request: 30000
    };
    const _0x5e8776 = {
        timeout: _0x24f2b6
    };

    const _0x18ea5f = await _0x5cc050.get(_0x257ea3, _0x5e8776).catch(_0x4cae8a => {
        console.log(_0x4cae8a);
    });

    return _0x18ea5f.body.replace("\n", "").replace(/^.*:\/\//, "");
}

async function _0x235e05(_0x2dbde7) {
    return new Promise(_0x431ab1 => {
        setTimeout(_0x431ab1, _0x2dbde7);
    });
}

function _0xf96b16(_0x39e17c, _0x4a63ef = false) {
    this.failnum = 0;
    return ddd = async (_0x3ecaa5, _0x17031c) => {
        if (_0x3ec821 && _0x5e309c && (this.failed || _0x4a63ef || _0x20c1af == 1 && _0x15f7d1)) {
            let _0xc0418d = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

            for (let _0x4878b2 of Array(3)) {
                this.ip = await _0x15c4f4(_0x3ec821);

                if (_0xc0418d.test(this.ip) !== false) {
                    break;
                }

                this.ip = undefined;
            }

            if (!this.ip) {
                console.log("\n连续三次获取IP失败，请检查API是否正常❗ ❗ ❗\n");
            }

            this.agent = this.ip ? new _0x1d04a6("http://" + this.ip) : undefined;
            this.agent ? console.log("使用代理IP：" + this.ip) : "";
        }

        const _0x5a922d = {
            https: this.agent,
            http: this.agent
        };
        _0x3ecaa5.agent = _0x5a922d;
        const _0x16f8f8 = {
            request: 30000
        };
        _0x3ecaa5.timeout = _0x16f8f8;

        _0x39e17c(_0x3ecaa5, async (_0x4c7d45, _0x10790e, _0x88024e) => {
            try {
                if (_0x4c7d45) {
                    if (this.failnum < 1) {
                        this.failed = true;
                        this.failnum++;
                        await _0x235e05(1000);
                        await ddd(_0x3ecaa5, _0x17031c);
                    } else {
                        this.failed = true;
                        this.failnum = 0;

                        _0x17031c(_0x4c7d45, _0x10790e, _0x88024e);
                    }
                } else {
                    _0x20c1af++;
                    this.failed = false;
                    this.failnum = 0;

                    _0x17031c(_0x4c7d45, _0x10790e, _0x88024e);
                }
            } catch (_0x39bc6d) {
                console.log(_0x39bc6d);
            }
        });
    };
}

const _0x197eeb = {
    intoRequest: _0xf96b16
};
module.exports = _0x197eeb;