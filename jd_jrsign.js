/*
金融签到双签
50 0 * * * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_jrsign.js
* */

const $=new Env('金融签到-加密');

const _0x440643 = $.isNode() ? require('jsdom') : '';

const _0x1e01e7 = 'https://ms.jr.jd.com/gw/generic/hy/h5/m';

const _0x461c59 = $.isNode() ? require('./sendNotify') : '';

const _0x554831 = $.isNode() ? require('./jdCookie.js') : '';

let _0x32ecea = [],
    _0x26fba7 = '';

if ($.isNode()) {
Object.keys(_0x554831).forEach(_0xf0e0aa => {
    _0x32ecea.push(_0x554831[_0xf0e0aa]);
});
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
_0x32ecea = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ..._0x419670($.getdata('CookiesJD') || '[]').map(_0x2c96c5 => _0x2c96c5.cookie)].filter(_0x17e366 => !!_0x17e366);
}

!(async () => {
if (!_0x32ecea[0x0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {
    'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
    });
    return;
}

await _0x4eadc4();

for (let _0x45a9db = 0x0; _0x45a9db < _0x32ecea.length; _0x45a9db++) {
    if (_0x32ecea[_0x45a9db]) {
    _0x26fba7 = _0x32ecea[_0x45a9db];
    $.UserName = decodeURIComponent(_0x26fba7.match(/pt_pin=([^; ]+)(?=;?)/) && _0x26fba7.match(/pt_pin=([^; ]+)(?=;?)/)[0x1]);
    $.index = _0x45a9db + 0x1;
    $.isLogin = true;
    $.nickName = '';
    $.stopNext = false;
    await _0x1ed36b();
    console.log('\n***********开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '********\n');

    if (!$.isLogin) {
        $.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action', {
        'open-url': 'https://bean.m.jd.com/bean/signIndex.action'
        });

        if ($.isNode()) {
        await _0x461c59.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
        }

        continue;
    }

    await _0xe2a1ec();
    }
}
})().catch(_0x3cb8c1 => {
$.log('', '❌ ' + $.name + ', 失败! 原因: ' + _0x3cb8c1 + '!', '');
}).finally(() => {
$.done();
});

async function _0xe2a1ec() {
await _0x50a05b();
await _0x13283b();
await _0x394566();
await _0x5a9feb();
}

function _0x13283b() {
body = {
    'channel': 'sy',
    'channelLv': 'sy'
};
return new Promise(async _0x513cea => {
    $.post(_0x34218a('getRSAPubKey', body), (_0xa3052b, _0x3467c6, _0x550773) => {
    try {
        if (_0xa3052b) {
        console.log('' + JSON.stringify(_0xa3052b));
        console.log('getRSAPubKey API请求失败，请检查网路重试');
        } else {
        if (_0x550773) {
            _0x550773 = JSON.parse(_0x550773);

            if (_0x550773.resultData && _0x550773.resultCode === 0x0) {
            $.rsaKey = _0x550773.resultData.resBusiData;
            }
        } else {
            console.log('京东服务器返回空数据');
        }
        }
    } catch (_0x5cf141) {
        $.logErr(_0x5cf141, _0x3467c6);
    } finally {
        _0x513cea();
    }
    });
});
}

function _0x50a05b() {
body = {
    'channelSource': 'JRAPP6.0',
    'riskDeviceParam': '{"eid":"","fp":"","sdkToken":"","token":""}',
    'site': 'JD_JR_APP',
    'channel': 'sy',
    'channelLv': 'sy'
};
return new Promise(async _0x1bd50d => {
    $.post(_0x34218a('querySignCalendar', body), (_0x3d0691, _0x45cec9, _0xf1f835) => {
    {
        try {
        if (_0x3d0691) {
            console.log('' + JSON.stringify(_0x3d0691));
            console.log('queryDrawChance API请求失败，请检查网路重试');
        } else {
            if (_0xf1f835) {
            _0xf1f835 = JSON.parse(_0xf1f835);

            if (_0xf1f835.resultData && _0xf1f835.resultCode === 0x0) {
                $.noa = _0xf1f835.resultData.resBusiData.noa;
            }
            } else {
            console.log('京东服务器返回空数据');
            }
        }
        } catch (_0x235fd8) {
        $.logErr(_0x235fd8, _0x45cec9);
        } finally {
        _0x1bd50d();
        }
    }
    });
});
}

function _0x394566() {
bodyinfo = {
    'videoId': '311372930347370496',
    'channelSource': 'JRAPP6.0',
    'noa': $.noa
};
$.cry.setPublicKeyString($.rsaKey);
sign = $.cry.encryptData(JSON.stringify(bodyinfo)).cipher;
body = {
    'site': 'JD_JR_APP',
    'videoId': '311372930347370496',
    'channelSource': 'JRAPP6.0',
    'encryptData': sign,
    'riskDeviceParam': '{}',
    'channel': 'sy',
    'channelLv': 'sy'
};
return new Promise(async _0x138719 => {
    $.post(_0x34218a('jrSign', body), (_0x4861ea, _0x135435, _0x1f4fa3) => {
    try {
        if (_0x4861ea) {
        console.log('' + JSON.stringify(_0x4861ea));
        console.log('jrSign API请求失败，请检查网路重试');
        } else {
        if (_0x1f4fa3) {
            _0x1f4fa3 = JSON.parse(_0x1f4fa3);

            if (_0x1f4fa3.resultData && _0x1f4fa3.resultCode === 0x0) {
            if (_0x1f4fa3.resultData.resBusiCode == 0x0) {
                result = $.cry.decryptData(_0x1f4fa3.resultData.resBusiData).plaintext;
                console.log('签到成功！');
            } else {
                console.log('今天已经签到！');
            }
            }
        } else {
            console.log('京东服务器返回空数据');
        }
        }
    } catch (_0x4e0d66) {
        $.logErr(_0x4e0d66, _0x135435);
    } finally {
        _0x138719();
    }
    });
});
}

function _0x5a9feb() {
body = {
    'actCode': 'F68B2C3E71',
    'type': 0x4,
    'frontParam': {
    'belong': 'jingdou'
    },
    'riskDeviceParam': '{"fp":"","eid":"","sdkToken":"","sid":""}'
};
opts = {
    'url': 'https://nu.jr.jd.com/gw/generic/jrm/h5/m/process?_=' + new Date().getTime(),
    'headers': {
    'Host': 'nu.jr.jd.com',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'Origin': 'https://m1.jr.jd.com',
    'X-Requested-With': 'com.jd.jrapp',
    'Referer': 'https://m1.jr.jd.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3',
    'cookie': _0x26fba7
    },
    'body': 'reqData=' + encodeURIComponent(JSON.stringify(body))
};
return new Promise(async _0x30803c => {
    {
    $.post(opts, (_0x4db310, _0x13a1e6, _0x4d2450) => {
        {
        try {
            if (_0x4db310) {
            console.log('' + JSON.stringify(_0x4db310));
            console.log('signaward API请求失败，请检查网路重试');
            } else {
            if (_0x4d2450) {
                _0x4d2450 = JSON.parse(_0x4d2450);

                if (_0x4d2450.resultData && _0x4d2450.resultCode === 0x0) {
                if (_0x4d2450.resultData.data.businessData.businessCode == '000sq') {
                    console.log('双签礼包：' + _0x4d2450.resultData.data.businessData.businessData.awardListVo[0x0].name);
                } else {
                    console.log('双签礼包：' + _0x4d2450.resultData.data.businessData.businessMsg);
                }
                }
            } else {
                console.log('京东服务器返回空数据');
            }
            }
        } catch (_0x3f7db2) {
            $.logErr(_0x3f7db2, _0x13a1e6);
        } finally {
            _0x30803c();
        }
        }
    });
    }
});
}

function _0x1ed36b() {
return new Promise(async _0x4af1c8 => {
    {
    const _0x22016a = {
        'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
        'headers': {
        'Accept': 'application/json,text/plain, */*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-cn',
        'Connection': 'keep-alive',
        'Cookie': _0x26fba7,
        'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
        'User-Agent': $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require('./USER_AGENTS').USER_AGENT : $.getdata('JDUA') ? $.getdata('JDUA') : 'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
        }
    };
    $.post(_0x22016a, (_0x3c88c4, _0x1db4bc, _0x5bb1b5) => {
        {
        try {
            if (_0x3c88c4) {
            console.log('' + JSON.stringify(_0x3c88c4));
            console.log($.name + ' API请求失败，请检查网路重试');
            } else {
            if (_0x5bb1b5) {
                _0x5bb1b5 = JSON.parse(_0x5bb1b5);

                if (_0x5bb1b5.retcode === 0xd) {
                $.isLogin = false;
                return;
                }

                if (_0x5bb1b5.retcode === 0x0) {
                $.nickName = _0x5bb1b5.base && _0x5bb1b5.base.nickname || $.UserName;
                } else {
                $.nickName = $.UserName;
                }
            } else {
                console.log('京东服务器返回空数据');
            }
            }
        } catch (_0xf5dee9) {
            $.logErr(_0xf5dee9, _0x1db4bc);
        } finally {
            _0x4af1c8();
        }
        }
    });
    }
});
}

function _0x34218a(_0x59a07b, _0x5b9469) {
return {
    'url': _0x1e01e7 + '/' + _0x59a07b,
    'headers': {
    'Host': 'ms.jr.jd.com',
    'Connection': 'keep-alive',
    'Accept': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'Origin': 'https://member.jr.jd.com',
    'X-Requested-With': 'com.jd.jrapp',
    'Referer': 'https://member.jr.jd.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,th-CN;q=0.8,th;q=0.7,vi-CN;q=0.6,vi;q=0.5,en-US;q=0.4,en;q=0.3',
    'cookie': _0x26fba7
    },
    'body': 'reqData=' + encodeURIComponent(JSON.stringify(_0x5b9469))
};
}

async function _0x4eadc4() {
const {
    JSDOM
} = _0x440643;

let _0x40cd41 = new _0x440643.ResourceLoader({
    'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0',
    'referrer': 'https://eco.jr.jd.com/'
});

let _0x4810a4 = new _0x440643.VirtualConsole();

let _0x46964f = {
    'url': 'https://eco.jr.jd.com/baitiao_lottery/#/?actNo=211213202243400000003999&channel=w01',
    'referrer': 'https://eco.jr.jd.com/',
    'userAgent': 'Mozilla/5.0 (Linux; Android 10; HarmonyOS; WLZ-AN00; HMSCore 6.2.0.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.2.301 Mobile Safari/537.36',
    'runScripts': 'dangerously',
    'resources': _0x40cd41,
    'includeNodeLocations': true,
    'storageQuota': 0x989680,
    'pretendToBeVisual': true,
    'virtualConsole': _0x4810a4
};

const _0x41f400 = new JSDOM('<body>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/aar2.min.js"></script>\n  <script src="https://m.jr.jd.com/common/jssdk/jrbridge/2.0.0/jrbridge.js"></script>\n  <script src="https://jrsecstatic.jdpay.com/jr-sec-dev-static/cryptico.min.js"></script>\n  <script src="//gia.jd.com/m.html"></script>\n  <script src="//gias.jd.com/js/m.js"></script>\n  </body>', _0x46964f);

await $.wait(0x5dc);

try {
    $.getid = _0x41f400.window.getJdEid();

    _0x41f400.window.AAR2.init();

    $.ar2 = new _0x41f400.window.AAR2();
    $.cry = _0x41f400.window.cryptico;
} catch (_0x16563c) {}
}

function _0x419670(_0x554ff8) {
if (typeof _0x554ff8 == 'string') {
    try {
    return JSON.parse(_0x554ff8);
    } catch (_0x31f86c) {
    console.log(_0x31f86c);
    $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
    return [];
    }
}
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
