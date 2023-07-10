/*
京东国际签到
cron:31 1 * * *
============Quantumultx===============
[task_local]
#京东国际签到
31 1 * * * jd_jdgj_sign.js, tag=京东国际签到, enabled=true
 */

const $ = new Env('京东国际签到');
const III111 = $.isNode() ? require("./sendNotify") : "",
      liIll1 = $.isNode() ? require("./jdCookie.js") : "",
      l1llli = require("crypto-js"),
      iI1lII = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
      l1i1I = require("./function/krgetSign"),
      l1llll = process.env.JD_SIGN_KRAPI || "";

let I1I1ll = [],
    lil1i = "";

if ($.isNode()) {
  Object.keys(liIll1).forEach(l1ilI1 => {
    I1I1ll.push(liIll1[l1ilI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1I1ll = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Iliil($.getdata("CookiesJD") || "[]").map(l1l1Il => l1l1Il.cookie)].filter(lil1I => !!lil1I);

let liiiil = "";
const IIIIli = "https://api.m.jd.com/client.action";
!(async () => {
  if (!I1I1ll[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let lllII = 0; lllII < I1I1ll.length; lllII++) {
    if (I1I1ll[lllII]) {
      lil1i = I1I1ll[lllII];
      $.UserName = decodeURIComponent(lil1i.match(/pt_pin=([^; ]+)(?=;?)/) && lil1i.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lllII + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await III111.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      l1i1l();
      await lllIi();
      await $.wait(1500);
    }
  }

  if (liiiil) {
    if ($.isNode()) await III111.sendNotify("" + $.name, "" + liiiil);
    $.msg($.name, "", liiiil);
  }
})().catch(l1i11i => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1i11i + "!", "");
}).finally(() => {
  $.done();
});

async function lllIi() {
  await I1iI1l();
  await $.wait(500);
  await illlil();
  await $.wait(1500);
}

function lil1l(lI111i, I1lIII = "qwertyuiopasdfghjklzxcvbnm") {
  let I1iI1I = "";

  for (let liiii1 = 0; liiii1 < lI111i; liiii1++) {
    I1iI1I += I1lIII[Math.floor(Math.random() * I1lIII.length)];
  }

  return I1iI1I;
}

function lllIl(l1ilIl, IIiiIi = {}) {
  let l11iIi = [],
      ll11li = IIiiIi.connector || "&",
      iliIlI = Object.keys(l1ilIl);
  if (IIiiIi.sort) iliIlI = iliIlI.sort();

  for (let II1l of iliIlI) {
    let liiiiI = l1ilIl[II1l];
    if (liiiiI && typeof liiiiI === "object") liiiiI = JSON.stringify(liiiiI);
    if (liiiiI && IIiiIi.encode) liiiiI = encodeURIComponent(liiiiI);
    l11iIi.push(II1l + "=" + liiiiI);
  }

  return l11iIi.join(ll11li);
}

function Iliii(II1i) {
  return II1i[Math.floor(Math.random() * II1i.length)];
}

function illlii(I1iI11 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", II11 = "0123456789abcdef") {
  let ii1II1 = "";

  for (let i11iIi of I1iI11) {
    if (i11iIi == "x") ii1II1 += II11.charAt(Math.floor(Math.random() * II11.length));else i11iIi == "X" ? ii1II1 += II11.charAt(Math.floor(Math.random() * II11.length)).toUpperCase() : ii1II1 += i11iIi;
  }

  return ii1II1;
}

function I1lIIi(II1I) {
  II1I = II1I.replace(/rn/g, "n");
  var Ilil1 = "";

  for (var IliII1 = 0; IliII1 < II1I.length; IliII1++) {
    var l1iIi1 = II1I.charCodeAt(IliII1);

    if (l1iIi1 < 128) {
      Ilil1 += String.fromCharCode(l1iIi1);
    } else l1iIi1 > 127 && l1iIi1 < 2048 ? (Ilil1 += String.fromCharCode(l1iIi1 >> 6 | 192), Ilil1 += String.fromCharCode(l1iIi1 & 63 | 128)) : (Ilil1 += String.fromCharCode(l1iIi1 >> 12 | 224), Ilil1 += String.fromCharCode(l1iIi1 >> 6 & 63 | 128), Ilil1 += String.fromCharCode(l1iIi1 & 63 | 128));
  }

  return Ilil1;
}

function l1i1i(llIlI, l1iIil) {
  l1iIil = l1iIil || iI1lII;
  var lI1lIi = "";
  var ii1l11, IIIIii, liiill, IIIIil, lI1lIl, liiili, I1ll11;
  var Iii1Ii = 0;
  llIlI = I1lIIi(llIlI);

  while (Iii1Ii < llIlI.length) {
    ii1l11 = llIlI.charCodeAt(Iii1Ii++);
    IIIIii = llIlI.charCodeAt(Iii1Ii++);
    liiill = llIlI.charCodeAt(Iii1Ii++);
    IIIIil = ii1l11 >> 2;
    lI1lIl = (ii1l11 & 3) << 4 | IIIIii >> 4;
    liiili = (IIIIii & 15) << 2 | liiill >> 6;
    I1ll11 = liiill & 63;
    if (isNaN(IIIIii)) liiili = I1ll11 = 64;else isNaN(liiill) && (I1ll11 = 64);
    lI1lIi = lI1lIi + l1iIil.charAt(IIIIil) + l1iIil.charAt(lI1lIl) + l1iIil.charAt(liiili) + l1iIil.charAt(I1ll11);
  }

  while (lI1lIi.length % 4 > 1) lI1lIi += "=";

  return lI1lIi;
}

function I1iI1i(iIiilI = {}) {
  let iIiiii = {
    "ciphertype": 5,
    "cipher": {
      "ud": l1i1i(l1llli.SHA1($.UserName).toString()),
      "sv": l1i1i($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(iIiiii);
}

function l1i1l(l1lI1I, ll1llI = {}) {
  const l1lI11 = {
    "jd": {
      "app": "jdapp",
      "appBuild": "168392",
      "client": "android",
      "clientVersion": "10.1.0"
    },
    "lite": {
      "app": "jdltapp",
      "appBuild": "1247",
      "client": "ios",
      "clientVersion": "6.0.0"
    }
  },
        lI1iii = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = Iliii(lI1iii);
  let i11lIi = l1lI1I || "jd",
      ll1ll1 = ll1llI?.["ep"] ? ll1llI?.["ep"] : true;

  if (!l1lI11[i11lIi]) {
    console.log("获取[" + i11lIi + "]UA失败");
    return;
  }

  $.client = ll1llI?.["client"] ? ll1llI?.["client"] : l1lI11[i11lIi].client;
  $.clientVersion = ll1llI?.["clientVersion"] ? ll1llI?.["clientVersion"] : l1lI11[i11lIi].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let lilil1 = "android";
  $.client == "apple" && (lilil1 = "iPhone");
  I1iI1i();
  let lIilli = [l1lI11[i11lIi].app, lilil1, $.clientVersion, "", "rn/" + illlii(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + l1lI11[i11lIi].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", ll1ll1 ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = lIilli.join(";");
}

async function I1iI1l() {
  const ilI11l = "{\"businessId\":\"1\",\"type\":\"1\",\"themeId\":\"331\",\"uuid\":\"\"}";
  sign = await l1i1I("userFollow", JSON.parse(ilI11l));
  l1llll ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let li1I = {
    "url": IIIIli + "?functionId=userFollow&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": lil1i,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(lI1ii1 => {
    $.get(li1I, (iiI1li, IIliii, i1111I) => {
      try {
        if (iiI1li) $.log(iiI1li);else {
          i1111I = JSON.parse(i1111I);
          if (i1111I.code == 0 && !i1111I?.["message"]) console.log("" + i1111I?.["guideFollowText"]);else {
            if (i1111I.code == 3) {
              console.log("关注失败,可能未登录");
            } else {
              console.log("关注失败," + i1111I);
            }
          }
        }
      } catch (i1lll) {
        $.log(i1lll);
      } finally {
        lI1ii1();
      }
    });
  });
}

async function illlil() {
  const i1lli = "{\"floorId\": \"83596202\"}";
  sign = await l1i1I("signInWithPrize", JSON.parse(i1lli));

  if (l1llll) {
    $.signStr = sign?.["data"]?.["convertUrl"] || "";
  } else $.signStr = sign?.["body"] || "";

  !$.signStr && console.log("接口获取失败，跳过");
  let i11111 = {
    "url": IIIIli + "?functionId=signInWithPrize&" + $.signStr,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": lil1i,
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "timeout": 10 * 1000
  };
  return new Promise(IliIll => {
    $.get(i11111, (lilI1I, lI1I1l, Il1Il) => {
      try {
        if (lilI1I) {
          $.log(lilI1I);
        } else {
          Il1Il = JSON.parse(Il1Il);
          if (Il1Il.code == 0 && !Il1Il?.["message"]) console.log("签到成功: " + Il1Il?.["result"]?.["signInText"]);else {
            if (Il1Il.code == 3) console.log("签到失败,可能未登录");else {
              console.log("签到失败," + Il1Il?.["message"]);
            }
          }
        }
      } catch (i1Iiil) {
        $.log(i1Iiil);
      } finally {
        IliIll();
      }
    });
  });
}

function Iliil(i1Iiii) {
  if (typeof i1Iiii == "string") try {
    return JSON.parse(i1Iiii);
  } catch (IilIi) {
    return console.log(IilIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function I1lIIl(i1liI, iilIIi) {
  let IIlI1i = new RegExp("(^|[&?])" + iilIIi + "=([^&]*)(&|$)"),
      iiiI1i = i1liI.match(IIlI1i);
  if (iiiI1i != null) return unescape(iiiI1i[2]);
  return "";
}

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}