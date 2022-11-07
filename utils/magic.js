//问题反馈:https://t.me/Wall_E_Channel
let mode = __dirname.includes('magic')

let testMode = process.env.M_TEST_MODE?.includes('on') ? true : mode
let tokenCacheMin = parseInt(process.env?.M_WX_TOKEN_CACHE_MIN || 5)
let tokenCacheMax = parseInt(process.env?.M_WX_TOKEN_CACHE_MAX || 10)
let enableCacheToken = parseInt(process.env?.M_WX_ENABLE_CACHE_TOKEN || 1)
let enableCacheTokenTip = parseInt(process.env?.M_WX_ENABLE_CACHE_TOKEN_TIP || 1)
let isvObfuscatorRetry = parseInt(process.env?.M_WX_ISVOBFUSCATOR_RETRY || 2)
let isvObfuscatorRetryWait = parseInt(process.env?.M_WX_ISVOBFUSCATOR_RETRY_WAIT || 2)
//模式
let signMode = process.env.M_SIGN_MODE ? process.env.M_SIGN_MODE : "local"
let apiToken = process.env.M_API_TOKEN ? process.env.M_API_TOKEN : ""
let apiSignUrl = process.env.M_API_SIGN_URL ? process.env.M_API_SIGN_URL : "http://ailoveu.eu.org:19840/sign"
let wskeyFile = process.env.M_WSKEY_FILE ? process.env.M_WSKEY_FILE : mode ? '/home/magic/Work/wools/doc/config.sh' : ''
//无线pt_pin黑名单
let blackPinConfig = {
    'cjhy-isv.isvjcloud.com': process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : '',
    'cjhydz-isv.isvjcloud.com': process.env.M_WX_CJ_BLACK_COOKIE_PIN ? process.env.M_WX_CJ_BLACK_COOKIE_PIN : '',
    'lzkj-isv.isvjcloud.com': process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : '',
    'lzkjdz-isv.isvjcloud.com': process.env.M_WX_LZ_BLACK_COOKIE_PIN ? process.env.M_WX_LZ_BLACK_COOKIE_PIN : '',
    '*': process.env.M_WX_BLACK_COOKIE_PIN ? process.env.M_WX_BLACK_COOKIE_PIN : ''
}

//跳出关键词
let stopKeywords = ['来晚了', '已发完', '参数缺失或无效', '超出活动计划时间', '奖品发送失败', '发放完', '全部被领取', '余额不足', '已结束', '活动已经结束', '未开始']
process.env.M_WX_STOP_KEYWORD ? process.env.M_WX_STOP_KEYWORD.split(/[@,&|]/).forEach((item) => stopKeywords.push(item)) : ''

//是否打印地址信息
let M_WX_ADDRESS_LOG = parseInt(process.env?.M_WX_ADDRESS_LOG || 2);
//不填地址关键词,
let addressStopKeywords = ['京豆', '红包', '券', '再来一次', '客服', '积分', '晒图', '不发放', '购物', '购买']
process.env.M_WX_ADDRESS_STOP_KEYWORD ? process.env.M_WX_ADDRESS_STOP_KEYWORD.split(/[@,&|]/).forEach(
    (item) => addressStopKeywords.push(item))
    : ''

//无线白名单列表
let wxWhitelist = []
process.env.M_WX_WHITELIST ? process.env.M_WX_WHITELIST.split(/[@,&|]/).forEach(
    (item) => wxWhitelist.push(item.includes('-') ? item : item * 1))
    : [];
//无线不支持文件列表
let wxWhitelistNotSupportFile = ['m_jd_wx_collectCard.js', 'm_jd_wx_unPackDraw.js', 'm_jd_wx_microDz.js', 'm_jd_wx_share.js']
process.env.M_WX_WHITELIST_NOT_SUPPORT_FILE ? process.env.M_WX_WHITELIST_NOT_SUPPORT_FILE.split(/[@,&|]/).forEach(
    (item) => wxWhitelistNotSupportFile.push(item)) : '';

const axios = require('axios'),
    fs = require('fs'),
    { format } = require('date-fns'),
    notify = require('./sendNotify'),
    jdCookieNode = require('./jdCookie.js'),
    CryptoJS = require('crypto-js'),
    h5sts = require('./h5sts.js');

let cookies = [];
Object.keys(jdCookieNode).length > 0 && Object.keys(jdCookieNode).forEach(b => {
    cookies.push(jdCookieNode[b]);
});
const JDAPP_USER_AGENTS = [
    `jdapp;android;10.0.2;9;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 9; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;9;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;9;${uuid()};network/4g;Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;9;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 9; 16T Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; GM1910 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Premium Edition Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;11;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K20 Pro Premium Edition Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045513 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;10;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; MI 8 Build/QKQ1.190828.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;11;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 11; Redmi K30 5G Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045511 Mobile Safari/537.36`,
    `jdapp;iPhone;10.0.2;14.2;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.3;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.2;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;11.4;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 11_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15F79`,
    `jdapp;android;10.0.2;10;;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36`,
    `jdapp;iPhone;10.0.2;14.3;${uuid()};network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.6;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.6;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.5;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.1;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.3;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.7;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.1;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.3;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;13.4;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 13_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.3;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.3;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.3;${uuid()};network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;iPhone;10.0.2;14.1;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;android;10.0.2;8.1.0;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36`,
    `jdapp;android;10.0.2;8.0.0;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 8.0.0; HTC U-3w Build/OPR6.170623.013; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36`,
    `jdapp;iPhone;10.0.2;14.0.1;${uuid()};network/wifi;Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`,
    `jdapp;android;10.0.2;8.1.0;${uuid()};network/wifi;Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36`,
]

const $ = axios.create({ timeout: 30000 });
$.defaults.headers['Accept'] = '*/*';
$.defaults.headers['Connection'] = 'keep-alive';
$.defaults.headers['Accept-Language'] = "zh-CN,zh-Hans;q=0.9";
$.defaults.headers['Accept-Encoding'] = "gzip, deflate, br";


function uuid(x = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    return x.replace(/[xy]/g, function (x) {
        const r = 16 * Math.random() | 0, n = "x" === x ? r : 3 & r | 8;
        return n.toString(36)
    })
}

class Env {
    constructor(name) {
        this.name = name;
        this.username = '';
        this.cookie = '';
        this.wskey = '';
        this.wskeys = new Map();
        this.cookies = cookies;
        this.index = '';
        this.ext = [];
        this.msg = [];
        this.delimiter = '';
        this.filename = '';
        this.ticket = '';
        this.appId = '';
        this.algo = {};
        this.bot = false;
        this.expire = false;
        this.breakBefore = false;
        this.skipNum = 0;
        this.accounts = {};
        this.domain = '';
        this.activityUrl = '';
        this.tickets = new Map();
        this.addressIndex = 1;
    }

    async run(data = {
        wait: [1000, 2000],
        bot: false,
        delimiter: '',
        o2o: false,
        random: false,
        once: false,
        wskey: false,
        blacklist: [],
        whitelist: [],
    }) {
        if (process.env.M_SYS_INFO) {
            console.log('-----------------系统参数-----------------');
            for (let j in process.env) {
                if (!j.startsWith('M_') || j.includes('URL') || j.includes('TOKEN') || j.includes('ARGV')) {
                    continue;
                }
                console.log(j + '="' + process.env[j] + '"');
            }
            console.log('-----------------系统参数-----------------');
        }

        console.log('运行参数：', data);
        this.filename = process.argv[1];
        console.log(this.now() + ' ' + this.name + ' ' + this.filename + ' 开始运行...');
        this.start = this.timestamp();
        let accounts = '';
        try {
            if (mode) {
                accounts = this.readFileSync(
                    '/home/magic/Work/wools/doc/account.json');
            } else {
                if (fs.existsSync('utils/account.json')) {
                    accounts = this.readFileSync('utils/account.json');
                } else {
                    fs.existsSync('/jd/config/account.json') ? accounts = this.readFileSync('/jd/config/account.json') : accounts = this.readFileSync('account.json');
                }
            }
            accounts ? JSON.parse(accounts).forEach(C => this.accounts[C.pt_pin] = C) : '';
        } catch (C) {
            console.log('account.json读取异常', C);
            this.msg.push('account.json读取异常');
        }

        await this.config();
        data?.delimiter && (this.delimiter = data?.delimiter);
        data?.bot && (this.bot = data.bot);
        console.log('原始ck长度', cookies.length);

        if (data?.blacklist?.length > 0) {
            for (const cki of this.__as(data.blacklist)) {
                delete cookies[cki - 1];
            }
        }

        console.log('排除黑名单后ck长度', cookies.length);
        wxWhitelist.length > 0 && wxWhitelistNotSupportFile.filter(E =>
            this.filename.includes(E)).length === 0 && this.filename.includes('_wx_') && (console.log('支持全局无线ck长度:' + wxWhitelist),
                console.log('支持全局无线ck长度:' + wxWhitelistNotSupportFile),
                data.whitelist = wxWhitelist);

        if (data?.whitelist?.length > 0) {
            let cks = [];

            for (const cki of this.__as(data.whitelist)) {
                cki - 1 < cookies.length && cks.push(cookies[cki - 1]);
            }
            cookies = cks;
        }

        console.log('设置白名单后ck长度', cookies.length);
        this.delBlackCK();
        console.log('排除PIN黑名单后ck长度', cookies.length);
        data?.random && (cookies = this.randomArray(cookies));

        if (data?.wskey) {
            try {
                let wsck = fs.existsSync(wskeyFile) ? this.readFileSync(wskeyFile).split('\n') : process.env?.JD_WSCK?.split('&') || [];

                for (let ws of wsck) {
                    !ws.endsWith(';') && (ws += ';');

                    if (ws.startsWith('pin')) {
                        this.wskeys.set(ws.match(/pin=([^; ]+)(?=;?)/)[1], ws.match(/(pin=.*?;wskey=.*?;)/)[1]);
                    } else {
                        ws.startsWith('wskey') && this.wskeys.set(ws.match(/pin=([^; ]+)(?=;?)/)[1], ws.match(/(pin=.*?;wskey=.*?;)/)[1]);
                    }
                }

                console.log('当前wskey共计' + this.wskeys.size + '个');
            } catch (e) {
                console.log('wkeys读取异常', e);
                this.msg.push('wkeys读取异常');
            }
        }

        await this.verify();
        this.cookies = cookies;

        if (data?.before) {
            for (let i = 0; i <= this.cookies.length; i++) {
                if (!this.cookies[i]) {
                    continue;
                }

                if (this.breakBefore) {
                    break;
                }

                let ck = this.cookies[i];
                this.cookie = ck;
                let pt_pin = ck.match(/pt_pin=([^; ]+)(?=;?)/)[1];
                this.username = decodeURIComponent(pt_pin);
                this.wskey = this.wskeys.get(pt_pin);
                $.defaults.headers.Cookie = this.cookie;
                this.index = i + 1;
                let me = {
                    username: this.username,
                    index: this.index,
                    cookie: this.cookie
                };
                try {
                    this.ext.push(Object.assign(me, await this.before()));
                } catch (e) {
                    console.log(e);
                }
                if (data?.wait?.length > 0 && this.index
                    !== cookies.length) {
                    await this.wait(data?.wait[0], data?.wait[1])
                }
            }
        }

        let once = false;

        for (let i = 0; i <= this.cookies.length; i++) {
            if (this.cookies[i] && !this.expire) {
                this.index = i + 1;
                if (data?.once && this.index !== data.once) {
                    once = true;
                    continue;
                }
                let cookie = this.cookies[i];
                this.cookie = cookie;
                let pt_pin = cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1];
                this.username = decodeURIComponent(pt_pin);

                if (this.skipNum > 0 && this.skipNum-- > 0) {
                    this.log('跳过当前ck skipNum=' + this.skipNum);
                    continue;
                }

                this.wskey = this.wskeys.get(pt_pin);
                $.defaults.headers.Cookie = this.cookie;
                this.index = i + 1;
                !data?.before ? this.ext.push({
                    username: this.username,
                    index: this.index,
                    cookie: this.cookie
                }) : '';

                try {
                    this.index < 5 ? this.appId === 'wx' ? await this._algo() : '' : '';
                    await this.logic();
                    if (data?.o2o) {
                        await this.send();
                        testMode ? this.log(this.msg.join("\n")) : ''
                        this.msg = [];
                    }
                    if (once) {
                        break;
                    }
                } catch (e) {
                    this.log('捕获异常', e?.response?.status, e?.response?.statusText);
                    this.log('捕获异常', e);
                    e?.response?.status === 493 && (this.expire = true, this.msg.push('IP 493 493 493'));
                    e?.response?.status === 403 && this.msg.push('IP 403 403 403');
                }
                if (data?.wait?.length > 0 && this.index !== cookies.length) {
                    await this.wait(data?.wait[0], data?.wait[1])
                }
            }
        }

        try {
            await this.after();
        } catch (e) {
            console.log(e);
        }

        console.log(this.now() + ' ' + this.name + ' 运行结束,耗时 ' + (this.timestamp() - this.start) + 'ms\n');
        testMode && this.msg.length > 0 ? console.log(this.msg.join('\n')) : '';
        if (!data?.o2o) {
            await this.send();
        }
    }

    async config() {

    }

    delBlackCK() {
        let strArrTemp = [];

        for (let i = 0; i < cookies.length; i++) {
            if (cookies[i]) {
                let cookie = cookies[i],
                    pt_pin = cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1];
                if (blackPinConfig[this.domain] === undefined && blackPinConfig['*']?.includes(pt_pin) || blackPinConfig[this.domain]?.includes(pt_pin)) {
                    continue;
                }
                strArrTemp.push(cookie);
            }
        }
        cookies = strArrTemp;
    }

    me() {
        return this.ext[this.index - 1];
    }

    __as(es) {
        let b = [];

        for (let e of es) {
            if (typeof e === 'string') {
                let start = e.split('-')[0] * 1,
                    end = e.split('-')[1] * 1;

                if (end - start === 1) {
                    b.push(start);
                    b.push(end);
                } else {
                    for (let i = start; i <= end; i++) {
                        b.push(i);
                    }
                }
            } else {
                b.push(e);
            }
        }
        return b;
    }

    deleteCookie() {
        delete this.cookies[this.index - 1]
        return {};
    }

    groupBy(arr, fn) {
        const data = {};
        arr.forEach(function (o) {
            const k = fn(o);
            data[k] = data[k] || []
            data[k].push(o)
        })

        return data;
    }

    async send() {
        if (this.msg?.length > 0) {
            this.msg.push(
                `\n时间：${this.now()} 时长：${((this.timestamp() - this.start)
                    / 1000).toFixed(2)}s`)
            if (this.bot) {
                await notify.sendNotify("/" + this.name,
                    this.msg.join(this.delimiter || ''))
            } else {
                await notify.sendNotify(this.name, this.msg.join("\n"))
            }
        }
    }

    async verify() {
        let fn = this.filename;

        function av(s) {
            return s.trim().match(/([a-z_])*$/)[0];
        }

        let x = '109M95O106F120V95B',
            y = '99M102F100O',
            z = '109H99V',
            j = '102N97I99D116T111G114A121B',
            k = '112C112U',
            l = '109N95G106B100K95U',
            m = '119V120M';
        x.concat(y).split(/[A-Z]/).map(o => +o).filter(o => o > 0).forEach(o => y += String.fromCharCode(o));
        x.concat(z).split(/[A-Z]/).map(o => +o).filter(o => o > 0).forEach(o => z += String.fromCharCode(o));
        x.concat(j).split(/[A-Z]/).map(o => +o).filter(o => o > 0).forEach(o => j += String.fromCharCode(o));
        x.concat(k).split(/[A-Z]/).map(o => +o).filter(o => o > 0).forEach(o => k += String.fromCharCode(o));
        l.concat(m).split(/[A-Z]/).map(o => +o).filter(o => o > 0).forEach(o => m += String.fromCharCode(o));
        this.appId = fn ? this.name.slice(0, 1)
            === String.fromCharCode(77)
            ? (fn.includes(av(y)) ? '10032' :
                fn.includes(av(z)) ? '10028' :
                    fn.includes(av(j)) ? '10001' :
                        fn.includes(av(k)) ? '10038' :
                            fn.includes(av(m)) ? 'wx' : '') : ''
            : '';
        this.appId ? this.algo = await this._algo() : '';
    }

    async wait(min, max) {
        if (min <= 0) {
            return;
        }
        if (max) {
            return new Promise(
                (resolve) => setTimeout(resolve, this.random(min, max)));
        } else {
            return new Promise((resolve) => setTimeout(resolve, min));
        }
    }

    putMsg(msg, username = '') {
        msg += '';
        this.log(msg);
        let r = [[' ', ''], ['优惠券', '券'], ['东券', '券'], ['店铺', ''], ['恭喜', ''], ['获得', '']];

        for (let ele of r) {
            msg = msg.replace(ele[0], ele[1]);
        }

        if (this.bot) {
            this.msg.push(msg);
        } else {

            username = username ? username : (this.accounts[this.username]?.remarks || this.username) + this.index;
            if (this.msg.length > 0 && this.msg.filter(C => C.includes(username)).length > 0) {
                for (let length = 0; length < this.msg.length; length++) {
                    if (this.msg[length].includes(username)) {
                        this.msg[length] = this.msg[length].split(' ')[0] + '' + [this.msg[length].split(' ')[1], msg].join(',');
                        break;
                    }
                }
            } else {
                this.msg.push(`【${username}】${msg}`)
            }
        }
    }

    getRemarks(b) {
        return this.accounts[b]?.remarks || b;
    }

    md5(str) {
        return CryptoJS.MD5(str).toString();
    }

    HmacSHA256(param, key) {
        return CryptoJS.HmacSHA256(param, key).toString();
    }

    log(...msg) {
        this.s ? console.log(...msg) : console.log(
            this.now() + ' cookie' + this.index + ' ' + (this.accounts[this.username]?.remarks || this.username),
            ...msg);
    }

    //并
    union(a, b) {
        return a.concat(b.filter(o => !a.includes(o)))
    }

    //交
    intersection(a, b) {
        return a.filter(o => b.includes(o))
    }

    //交
    different(a, b) {
        return a.concat(b).filter(o => a.includes(o) && !b.includes(o))
    }


    build(url) {
        if (url.match(/&callback=(jsonpCBK(.*))&/)) {
            let cb = url.match(/&callback=(jsonpCBK(.*))&/);
            url = url.replace(cb[1], this.randomCallback(cb[2].length || 0))
        }
        let stk = decodeURIComponent(this.getQueryString(url, '_stk') || '');
        if (stk) {
            let ens, hash, st = '',
                ts = this.now('yyyyMMddHHmmssSSS').toString(),
                tk = this.algo.tk, fp = this.algo.fp, em = this.algo.em;
            if (tk && fp && em) {
                hash = em(tk, fp, ts, this.appId, CryptoJS).toString(
                    CryptoJS.enc.Hex)
            } else {
                const random = '5gkjB6SpmC9s';
                tk = 'tk01wcdf61cb3a8nYUtHcmhSUFFCfddDPRvKvYaMjHkxo6Aj7dhzO+GXGFa9nPXfcgT+mULoF1b1YIS1ghvSlbwhE0Xc';
                fp = '9686767825751161';
                hash = CryptoJS.SHA512(
                    `${tk}${fp}${ts}${this.appId}${random}`,
                    tk).toString(CryptoJS.enc.Hex);
            }
            stk.split(',').map((item, index) => {
                st += `${item}:${this.getQueryString(url, item)}${index
                    === stk.split(',').length - 1 ? '' : '&'}`;
            })
            ens = encodeURIComponent(
                [''.concat(ts), ''.concat(fp),
                ''.concat(this.appId), ''.concat(tk),
                ''.concat(CryptoJS.HmacSHA256(st, hash.toString()).toString(
                    CryptoJS.enc.Hex))].join(';'));
            if (url.match(/[?|&]h5st=(.*?)&/)) {
                url = url.replace(url.match(/[?|&]h5st=(.*?)&/)[1], 'H5ST')
                    .replace(/H5ST/, ens)
            }
            let matchArr = [/[?|&]_time=(\d+)/, /[?|&]__t=(\d+)/,
                /[?|&]_ts=(\d+)/,
                /[?|&]_=(\d+)/, /[?|&]t=(\d+)/, /[?|&]_cfd_t=(\d+)/]
            for (let ms of matchArr) {
                if (url.match(ms)) {
                    url = url.replace(url.match(ms)[1], Date.now())
                }
            }
            let t = this._tk();
            if (url.match(/strPgUUNum=(.*?)&/)) {
                url = url.replace(url.match(/strPgUUNum=(.*?)&/)[1], t.tk)
                if (url.match(/strPhoneID=(.*?)&/)) {
                    url = url.replace(url.match(/strPhoneID=(.*?)&/)[1], t.id)
                }
                if (url.match(/strPgtimestamp=(.*?)&/)) {
                    url = url.replace(url.match(/strPgtimestamp=(.*?)&/)[1],
                        t.ts)
                }
            }
            if (url.match(/jxmc_jstoken=(.*?)&/)) {
                url = url.replace(url.match(/jxmc_jstoken=(.*?)&/)[1], t.tk)
                if (url.match(/phoneid=(.*?)&/)) {
                    url = url.replace(url.match(/phoneid=(.*?)&/)[1], t.id)
                }
                if (url.match(/timestamp=(.*?)&/)) {
                    url = url.replace(url.match(/timestamp=(.*?)&/)[1], t.ts)
                }
            }
        }
        return url;
    }

    getQueryString(url, name) {
        let reg = new RegExp("(^|[&?])" + name + "=([^&]*)(&|$)");
        let r = url.match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return '';
    }

    unique(arr) {
        return Array.from(new Set(arr))
    }

    async logic() {
        console.log("default logic")
    }

    async before() {
        return -1;
    }

    async after() {
        return -1;
    }

    tryLock(username, key) {
        try {
            fs.accessSync(`/jd/log/lock/${key}_${username}`);
            return false;
        } catch (e) {
            return true;
        }
    }

    setLock(username, key) {
        try {
            try {
                fs.accessSync(`/jd/log/lock`);
            } catch (e) {
                fs.mkdirSync(`/jd/log/lock`);
            }
            fs.mkdirSync(`/jd/log/lock/${key}_${username}`);
            return false;
        } catch (e) {
            return true;
        }
    }

    match(pattern, string) {
        pattern = (pattern instanceof Array) ? pattern : [pattern];
        for (let pat of pattern) {
            const match = pat.exec(string);
            if (match) {
                const len = match.length;
                if (len === 1) {
                    return match;
                } else if (len === 2) {
                    return match[1];
                } else {
                    const r = [];
                    for (let i = 1; i < len; i++) {
                        r.push(match[i])
                    }
                    return r;
                }
            }
        }
        return '';
    }

    matchAll(pattern, string) {
        pattern = (pattern instanceof Array) ? pattern : [pattern];
        let match;
        let result = [];
        for (let p of pattern) {
            while ((match = p.exec(string)) != null) {
                let len = match.length;
                if (len === 1) {
                    result.push(match);
                } else if (len === 2) {
                    result.push(match[1]);
                } else {
                    let r = [];
                    for (let i = 1; i < len; i++) {
                        r.push(match[i])
                    }
                    result.push(r);
                }
            }
        }
        return result;
    }

    async countdown(mode = 1, s = 200) {
        let d = new Date();
        switch (mode) {
            case 1:
                d.setHours(d.getHours() + 1);
                d.setMinutes(0)
                break
            case 2:
                d.setMinutes(30)
                break
            case 3:
                d.setMinutes(15)
                break
            case 4:
                d.setMinutes(10)
                break
            case 5:
                d.setMinutes(5)
                break
            default:
                console.log("不支持")
        }
        d.setSeconds(0)
        d.setMilliseconds(0)
        let st = d.getTime() - Date.now() - 200
        if (st > 0) {
            console.log(`需要等待时间${st / 1000} 秒`);
            await this.wait(st)
        }
    }

    readFileSync(path) {
        try {
            return fs.readFileSync(path).toString();
        } catch (e) {
            console.log(path, '文件不存在进行创建')
            this.writeFileSync(path, '');
            return '';
        }
    }

    writeFileSync(path, data) {
        fs.writeFileSync(path, data)
    }

    random(min, max) {
        return Math.min(Math.floor(min + Math.random() * (max - min)), max);

    }

    async notify(text, desc) {
        return notify.sendNotify(text, desc);
    }

    async get(url, headers) {
        url = this.appId ? this.build(url) : url
        return new Promise((resolve, reject) => {
            $.get(url, { headers: headers }).then(
                data => resolve(this.handler(data) || data))
                .catch(e => reject(e))
        })
    }

    async post(url, body, headers) {
        url = this.appId ? this.build(url) : url
        return new Promise((resolve, reject) => {
            $.post(url, body, { headers: headers })
                .then(data => resolve(this.handler(data) || data))
                .catch(e => reject(e));
        })
    }

    async request(url, headers, body) {
        return new Promise((resolve, reject) => {
            let __config = headers?.headers ? headers : { headers: headers };
            (body ? $.post(url, body, __config) : $.get(url, __config))
                .then(data => {
                    this.__lt(data);
                    resolve(data)
                })
                .catch(e => reject(e));
        })
    }

    __lt(data) {
        if (this.appId.length !== 2) {
            return
        }
        let scs = data?.headers['set-cookie'] || data?.headers['Set-Cookie']
            || ''
        if (!scs) {
            if (data?.data?.LZ_TOKEN_KEY && data?.data?.LZ_TOKEN_VALUE) {
                this.ticket = `LZ_TOKEN_KEY=${data.data.LZ_TOKEN_KEY};LZ_TOKEN_VALUE=${data.data.LZ_TOKEN_VALUE};`;
            }
            return;
        }
        let LZ_TOKEN_KEY = '', LZ_TOKEN_VALUE = '', JSESSIONID = '',
            jcloud_alb_route = '', ci_session = '', LZ_AES_PIN = ''
        let sc = typeof scs != 'object' ? scs.split(',') : scs
        for (let ck of sc) {
            let name = ck.split(";")[0].trim()
            if (name.split("=")[1]) {
                name.includes('LZ_TOKEN_KEY=') ? LZ_TOKEN_KEY = name.replace(
                    / /g, '') + ';' : ''
                name.includes('LZ_TOKEN_VALUE=')
                    ? LZ_TOKEN_VALUE = name.replace(/ /g, '') + ';' : ''
                name.includes('JSESSIONID=') ? JSESSIONID = name.replace(/ /g,
                    '') + ';' : ''
                // name.includes('jcloud_alb_route=')
                //     ? jcloud_alb_route = name.replace(/ /g, '') + ';' : ''
                // name.includes('ci_session=') ? ci_session = name.replace(/ /g,
                //     '') + ';' : ''
                name.includes('LZ_AES_PIN=') ? this.LZ_AES_PIN = name.replace(/ /g, '')
                    + ';' : ''

            }
        }

        if (JSESSIONID && LZ_TOKEN_KEY && LZ_TOKEN_VALUE) {
            this.ticket = `${JSESSIONID}${LZ_TOKEN_KEY}${LZ_TOKEN_VALUE}${this.LZ_AES_PIN || ''}`
        } else if (LZ_TOKEN_KEY && LZ_TOKEN_VALUE) {
            this.ticket = `${LZ_TOKEN_KEY}${LZ_TOKEN_VALUE}${this.LZ_AES_PIN || ''}`
        }
        !this.ticket.includes('LZ_AES_PIN=') && this.LZ_AES_PIN && (this.ticket = this.ticket + this.LZ_AES_PIN);
        // testMode ? this.log('lz', this.lz) : ''
    }

    handler(res) {
        let data = res?.data || res?.body || res;
        if (!data) {
            return;
        }
        if (typeof data === 'string') {
            data = data.replace(/[\n\r| ]/g, '');
            if (data.includes("try{jsonpCB")) {
                data = data.replace(/try{jsonpCB.*\({/, '{')
                    .replace(/}\)([;])?}catch\(e\){}/, '}')
            } else if (data.includes('jsonpCB')) {
                let st = data.replace(/[\n\r]/g, '').replace(/jsonpCB.*\({/,
                    '{');
                data = st.substring(0, st.length - 1)
            } else if (data.match(/try{.*\({/)) {
                data = data.replace(/try{.*\({/, '{')
                    .replace(/}\)([;])?}catch\(e\){}/, '}')
            } else {
                testMode ? console.log('例外', data) : ''
                data = /.*?({.*}).*/g.exec(data)[1]
            }
            testMode ? console.log(data) : ''
            testMode ? console.log('----------------分割线--------------------')
                : ''
            return JSON.parse(data)
        }
        testMode ? console.log(JSON.stringify(data)) : ''
        testMode ? console.log('----------------分割线---------------------') : ''
        return data;
    }

    randomNum(length) {
        length = length || 32;
        let t = "0123456789", a = t.length, n = '';
        for (let i = 0; i < length; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return n
    }

    randomString(e) {
        return this.uuid()
    }

    randomCallback(e = 1) {
        let t = "abcdefghigklmnopqrstuvwsyz", a = t.length, n = '';
        for (let i = 0; i < e; i++) {
            n += t.charAt(Math.floor(Math.random() * a));
        }
        return "jsonpCBK" + n.toUpperCase()
    }

    randomArray(arr, count) {
        count = count || arr.length
        let shuffled = arr.slice(0), i = arr.length, min = i - count, temp,
            index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    now(fmt) {
        return format(Date.now(), fmt || 'yyyy-MM-dd HH:mm:ss.SSS');
    }

    formatDate(data, fmt) {
        return format(typeof data === 'object' ? data : new Date(typeof data === 'string' ? data * 1 : data), fmt || 'yyyy-MM-dd');
    }

    parseDate(date) {
        return new Date(Date.parse(date.replace(/-/g, '/')));
    }

    timestamp() {
        return new Date().getTime();
    }

    uuid(x = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx') {
        return uuid(x);
    }

    async unfollow(shopId = this.shopId) {
        return
        let url = 'https://api.m.jd.com/client.action?g_ty=ls&g_tk=518274330'
        let body = `functionId=followShop&body={"follow":"false","shopId":"${shopId
            || this.shopId}","award":"true","sourceRpc":"shop_app_home_follow"}&osVersion=13.7&appid=wh5&clientVersion=9.2.0&loginType=2&loginWQBiz=interact`
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.m.jd.com',
            'Connection': 'keep-alive',
            'Accept-Language': 'zh-cn',
            'Cookie': this.cookie
        }
        headers['User-Agent'] = `Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.4(0x1800042c) NetType/4G Language/zh_CN miniProgram`
        let { data } = await this.request(url, headers, body);
        this.log(data.msg)
        return data;
    }

    async getShopInfo(venderId = this.venderId) {
        try {
            let url = 'https://wq.jd.com/mshop/QueryShopMemberInfoJson?venderId=' + (venderId || this.venderId);
            const headers = {
                Accept: '*/*',
                Referer: 'https://h5.m.jd.com/',
                Cookie: this.cookie,
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'User-Agent': 'Mozilla/5.0 (Linux; U; Android 10; zh-cn; MI 8 Build/QKQ1.190828.002) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/79.0.3945.147 Mobile Safari/537.36 XiaoMi/MiuiBrowser/13.5.40'
            }
            return await this.get(url, headers);
        } catch (e) {
            return {};
        }
    }

    async sendMessage(d, i, j = 1) {
        let C = 'https://api.telegram.org/bot' + process.env.TG_BOT_TOKEN + '/sendMessage';
        const D = {
            chat_id: d,
            text: i,
            disable_web_page_preview: true
        };
        let E = D;
        const F = {
            Cookie: '10089',
            'Content-Type': 'application/json'
        };
        let G = F,
            {
                data: H
            } = await this.request(C, G, E);
        this.log('发送数据', i);
        !H?.ok && j === 1 && ($.log('重试中', i), await $.wait(1000, 2000), await this.sendMessage(d, i, j++));
    }

    ua(type = 'jd') {
        return JDAPP_USER_AGENTS[this.random(0, JDAPP_USER_AGENTS.length)];
    }

    async wxStop(err) {
        let flag = false;

        for (let e of stopKeywords) {
            if (e && err?.includes(e)) {
                flag = true;
                this.expire = true;
                break;
            }
        }

        return flag;
    }

    async wxAddressStop(err) {
        let flag = false;

        for (let e of addressStopKeywords) {
            if (e && err?.includes(e)) {
                flag = true;
                break;
            }
        }

        return flag;
    }

    _tk() {
        let id = function (n) {
            let src = 'abcdefghijklmnopqrstuvwxyz1234567890',
                res = '';
            for (let i = 0; i < n; i++) {
                res += src[Math.floor(src.length * Math.random())];
            }
            return res;
        }(40), ts = Date.now().toString(), tk = this.md5(
            '' + decodeURIComponent(this.username) + ts + id
            + 'tPOamqCuk9NLgVPAljUyIHcPRmKlVxDy');

        const j = {
            ts: ts,
            id: id,
            tk: tk
        };
        return j;
    }

    async _algo(d = 0) {
        if (this.appId === 'wx') {
            try {
                if (this.domain.includes('lzkj') || this.domain.includes('lzdz')
                    || this.domain.includes('cjhy')) {
                    let url = `https://${this.domain}/wxTeam/activity?activityId=${this.activityId}`
                    await this.request(url, {
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Connection': 'keep-alive',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1 Mobile/15E148 Safari/604.1",
                        'Accept-Language': 'zh-cn',
                        'Cookie': this.cookie
                    })
                }
            } catch (e) {
                d++ < 3 && (await this.wait(1200, 3000), await this._algo(d));
            }

            return '';
        } else {
            let fp = function () {
                let e = '0123456789',
                    a = 13,
                    i = '';

                for (; a--;) {
                    i += e[Math.random() * e.length | 0];
                }

                return (i + Date.now()).slice(0, 16);
            }();

            let data = await this.post('https://cactus.jd.com/request_algo?g_ty=ajax', JSON.stringify({
                'version': '1.0',
                'fp': fp,
                'appId': this.appId,
                'timestamp': this.timestamp(),
                'platform': 'web',
                'expandParams': ''
            }), {
                'Authority': 'cactus.jd.com',
                'Origin': 'https://st.jingxi.com',
                'Referer': 'https://st.jingxi.com/',
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                'Content-Type': 'application/json'
            });
            return {
                fp: fp.toString(),
                tk: data?.data?.result?.tk || data?.result?.tk,
                em: new Function('return ' + (data?.data?.result?.algo || data?.result?.algo))()
            };
        }
    }

    async isvObfuscator(cache = enableCacheToken, retries = isvObfuscatorRetry, cookie = this.cookie) {
        let pt_pin = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);

        if (cache) {
            !fs.existsSync('tokens') && fs.mkdirSync('tokens');
            let cacheObj = JSON.parse(this.readFileSync('tokens/' + pt_pin + '.json') || '{}');
            this.log('缓存token结果' + pt_pin + ': ' + JSON.stringify(cacheObj));

            if (cacheObj && cacheObj.token && cacheObj?.expireTime > this.timestamp()) {
                enableCacheTokenTip === 2 ? this.putMsg('缓存') : '';
                return { code: '0', token: cacheObj.token };
            }
        }

        let body = 'body=%7B%22url%22%3A%22https%3A%2F%2Fcjhy-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=b024526b380d35c9e3&client=apple&clientVersion=10.0.10&st=1646999134786&sv=111&sign=fd9417f9d8e872da6c55102bd69da99f';

        try {
            let newVar = await this.sign('isvObfuscator', { 'id': '', 'url': `https://${this.domain}` });

            newVar.sign && (body = newVar.sign);
            let url = 'https://api.m.jd.com/client.action?functionId=isvObfuscator';
            const headers = {
                'Accept': '*/*',
                'Connection': 'keep-alive',
                'Host': 'api.m.jd.com',
                'Cookie': cookie,
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'zh-cn',
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'JD4iPhone/168069 (iPhone; iOS 13.7; Scale/3.00)'
            };
            let { data } = await this.request(url, headers, body);
            // console.log(data)
            this.log('接口获取token结果' + pt_pin + ':', JSON.stringify(data));

            if (cache && data?.code === '0' && data.token) {
                enableCacheTokenTip === 2 ? this.putMsg('实时') : '';

                if (cache) {
                    let tokens = {
                        expireTime: this.timestamp() + this.random(tokenCacheMin, tokenCacheMax) * 60 * 1000,
                        token: data.token
                    };
                    this.writeFileSync('tokens/' + pt_pin + '.json', JSON.stringify(tokens));
                    this.log('更新' + pt_pin + '.json文件完成');
                }
            } else if (data?.code === '3' && data?.errcode === 264) {
                this.putMsg(`CK过期`);
            } else {
                console.log(data)
            }
            return data;
        } catch (e) {
            if (retries-- > 0) {
                console.log(`第${isvObfuscatorRetry - retries}去重试isvObfuscator接口,等待${isvObfuscatorRetryWait}秒`)
                await this.wait(isvObfuscatorRetryWait * 1000)
                await this.isvObfuscator(cache, retries);
            }
        }

        return { code: '1', token: '' };
    }

    async getSimpleActInfoVo(fn = 'customer/getSimpleActInfoVo') {
        if (this.venderId && this.shopId && this.activityType) {
            return;
        }

        let data = await this.api(fn, 'activityId=' + this.activityId);
        console.log(data)
        if (!data.result || !data.data) {
            this.putMsg('活动已结束');
            this.expire = true
            return;
        }

        this.venderId = data.data.venderId;
        this.shopId = data.data.shopId;
        this.activityType = data.data.activityType;
    }

    async getMyPing(fn = 'customer/getMyPing') {
        let data = await this.api(fn, 'userId=' + this.venderId + '&token=' + this.Token + '&fromType=APP');
        this.Pin = '';

        if (!data.result) {
            this.putMsg('获取pin失败');
            return;
        }

        let secretPin = data.data.secretPin;
        this.nickname = data.data.nickname;
        this.Pin = this.domain.includes('cjhy') ? encodeURIComponent(encodeURIComponent(secretPin)) : encodeURIComponent(secretPin);
    }

    async accessLog(fn = 'common/' + (this.domain.includes('cjhy') ? 'accessLog' : 'accessLogWithAD')) {
        await this.api(fn,
            'venderId=' + this.venderId
            + '&code=' + this.activityType
            + '&pin=' + this.Pin
            + '&activityId=' + this.activityId
            + '&pageUrl=' + encodeURIComponent(this.activityUrl)
            + '&subType=app&adSource=');
    }

    async sign(fn, body = {}) {
        let back;
        const b = {
            'fn': fn,
            'body': body
        };
        const h = {
            'token': apiToken,
            'Cookie': '123'
        };

        try {
            let { data } = await this.request(signMode.includes('server') ? 'http://172.17.0.1:17840/sign' : apiSignUrl, h, b);
            const K = {
                fn: data.fn,
                sign: data.body
            };
            back = K;
        } catch (e) {
            try {
                const { data } = await this.request('http://imagic.eu.org:17840/sign', h, b),
                    N = {
                        fn: data.fn,
                        sign: data.body
                    };
                back = N;
            } catch (O) {
                console.log('sign解析接口失效');
            }
        }

        return back;
    }

    async ['api'](c, d) {
        let i = 'https://' + this.domain + '/' + c,
            j = '';
        !this.domain.includes('lorealjdcampaign-rc.isvjcloud.com') && (j = 'IsvToken=' + this.Token + ';' + this.ticket + (this.Pin && 'AUTH_C_USER=' + this.Pin + ';' || ''), this.domain.includes('cjhy') ? j += 'APP_ABBR=CJHY;' : '');
        const C = {
            Host: this.domain,
            Accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive',
            Origin: 'https://' + this.domain,
            Cookie: j,
            Referer: this.activityUrl + '&sid=&un_area=',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-cn'
        };
        C['Content-Type'] = typeof d == 'string' ? 'application/x-www-form-urlencoded' : 'application/json;charset=utf-8';
        C['User-Agent'] = this.UA;
        let D = C;
        this.domain.includes('lorealjdcampaign-rc.isvjcloud.com') && this.Token?.startsWith('ey') && (D.token = this.Token);
        await this.wait(200, 300);
        let {
            data: E
        } = await this.request(i, D, d);
        return E;
    }


    async saveAddress(address = this.accounts[this.username]?.address || '', d = '') {
        if (!address) {
            console.log('未配置自动填地址，退出');
            return;
        }

        if (await this.wxAddressStop(this.prizeName)) {
            this.putMsg('命中关键词，不填写地址！');
            return;
        }

        // const i = {
        //   token: apiToken,
        //   Cookie: '123'
        // };
        // let j = i;
        // let C = [];

        // try {
        //   let {
        //     data: D
        //   } = await this.request(this.match(/(https?:\/\/[^/]+)/, apiSignUrl) + '/list_md5_pin', j);
        //   C = D.data;
        // } catch (E) {
        //   console.log('获取授权信息失败');
        //   return;
        // }

        // if (C.length === 0) {
        //   return;
        // }

        // for (let F in this.accounts) {
        //   this.accounts[F].md5 = this.md5(encodeURIComponent(F));
        // }

        // if (!C.includes(this.accounts[this.username].md5)) {
        //   this.log('当前' + this.username + '未注册，退出自动填地址');
        //   return;
        // }

        address = this.accounts[this.username].address;
        M_WX_ADDRESS_LOG === 1 && this.log('当前地址详情' + JSON.stringify(address));

        try {
            let data = await this.api('wxAddress/save', 'venderId=' + this.venderId + '&pin=' + this.Pin + '&activityId=' + this.activityId + '&actType=' + this.activityType + '&prizeName=' + encodeURIComponent(this.prizeName) + '&receiver=' + encodeURIComponent(address.receiver) + '&phone=' + address.phone + '&province=' + encodeURIComponent(address.province) + '&city=' + encodeURIComponent(address.city) + '&address=' + encodeURIComponent(address.address) + '&generateId=' + this.addressId + '&postalCode=' + address.postalCode + '&areaCode=' + encodeURIComponent(address.areaCode) + '&county=' + encodeURIComponent(address.county));
            data?.result ? this.putMsg('已填地址', d) : this.putMsg('' + data?.errorMessage, d);
        } catch (e) { }
    }

    async carData() {
        let url = 'https://wq.jd.com/deal/mshopcart/uncheckcmdy?sceneval=2&g_login_type=1&g_ty=ajax';
        let body = 'commlist=&pingouchannel=0&all=1&scene=0&locationid=&type=0&templete=1&reg=1&version=20190418&traceid=&tabMenuType=4&sceneval=2';
        const headers = {
            'Accept': 'application/json',
            'Origin': 'https://p.m.jd.com',
            'Cookie': this.cookie,
            'Host': 'wq.jd.com',
            'Referer': 'https://p.m.jd.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'jdpingou;5.5.2;;session/9;brand/apple',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
        };
        let { data } = await this.request(url, headers, body);
        return data.errId === '0' ? data : '';
    }

    async carRmv(c = []) {
        let d = [],
            data = await this.carData();

        if (data) {
            for (let H of data.cart.venderCart) {
                for (let I of H.sortedItems) {
                    for (let J of I.polyItem.products) {
                        if (c.length > 0 && c.includes(J.mainSku.id.toString()) || c.length === 0) {
                            const K = I.polyItem?.promotion?.pid;
                            K ? d.push(J.mainSku.id + ',,1,' + J.mainSku.id + ',11,' + I.polyItem.promotion.pid + ',0,skuUuid:' + J.skuUuid + '@@useUuid:0') : d.push(J.mainSku.id + ',,1,' + J.mainSku.id + ',1,,0,skuUuid:' + J.skuUuid + '@@useUuid:0');
                        }
                    }
                }
            }
        }

        if (d.length === 0) {
            return;
        }

        this.log('即将删除' + d.length + '件商品');
        let url = 'https://wq.jd.com/deal/mshopcart/rmvCmdy?sceneval=2&g_login_type=1&g_ty=ajax',
            body = 'pingouchannel=0&commlist=' + encodeURIComponent(d.join('$')) + '&type=0&checked=0&locationid=&templete=1&reg=1&scene=0&version=20190418&traceid=&tabMenuType=4&sceneval=2';
        const headers = {
            'Accept': 'application/json',
            'Origin': 'https://p.m.jd.com',
            'Cookie': this.cookie,
            'Host': 'wq.jd.com',
            'Referer': 'https://p.m.jd.com/',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'jdpingou;5.5.2;;session/9;brand/apple',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9'
        };
        let {
            data: G
        } = await this.request(url, headers, body);
        return G.errId === '0' ? G : {};
    }

    async openCardInfo(venderId = this.venderId) {
        let url = 'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22' + venderId + '%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=&jsonp=jsonp_' + this.timestamp() + '_' + this.random(10000, 99999) + '&' + (await this.h5st());
        return await this.get(url, {
            'Accept': '*/*',
            'Connection': 'close',
            'Referer': 'https://shopmember.m.jd.com/shopcard/?',
            'Accept-Encoding': 'gzip, deflate, br',
            'Host': 'api.m.jd.com',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1',
            'Accept-Language': 'zh-cn',
            'Cookie': this.cookie
        });
    }

    async openCard(channel = 401, activityId = '', venderId = this.venderId, times = 0) {
        this.log(this.venderId + ' ' + channel + ' ' + activityId + ' ' + times + ' ');
        let ts = 'jsonp_' + this.timestamp() + '_' + this.random(10000, 99999),
            body = '{"venderId":' + venderId + ',"bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0,' + (activityId ? '"activityId":' + activityId + ',' : '') + ' "channel":' + channel + '}',
            url = 'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=' + encodeURIComponent(body) + '&client=H5&clientVersion=9.2.0&uuid=&jsonp=' + ts + '&' + (await this.h5st());
        const headers = {
            'Accept': '*/*',
            'Referer': 'https://shopmember.m.jd.com/shopcard/?venderId=' + venderId + '&channel=' + channel + (this.activityUrl ? '&returnUrl=' + this.activityUrl : ''),
            'Host': 'api.m.jd.com',
            'Cookie': this.cookie,
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'zh-cn',
            'User-Agent': this.UA
        };
        let data = await this.get(url, headers);

        if ((data?.message?.includes('火爆') || data?.message?.includes('失败')) && times < 10) {
            this.log(JSON.stringify(data));
            await this.openCard(channel, activityId, venderId, ++times);
        } else {
            data?.code === 0 && data?.success ? this.log(data?.message) : this.log('开卡成功', JSON.stringify(data));
        }

        return data;
    }

    async h5st() {
        return h5sts.random();
    }

}

module.exports = { Env, CryptoJS, notify };