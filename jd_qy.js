/*
#临时小豆

只运行一次即可，多次无效

[task_local]
#临时小豆
31 11 25 8 * jd_qy.js, tag=临时小豆, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/

const $ = new Env("临时小豆");
const I1lIii = $.isNode() ? require("./jdCookie") : "",
      illlIl = require("./function/jdCommon"),
      i11ill = require("./function/h5st41.js");

let IIIIIi = [],
    IIIIIl = "";

if ($.isNode()) {
  Object.keys(I1lIii).forEach(lllill => {
    IIIIIi.push(I1lIii[lllill]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIIIIi = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...lllli($.getdata("CookiesJD") || "[]").map(ill11l => ill11l.cookie)].filter(I1lIiI => !!I1lIiI);

!(async () => {
  if (!IIIIIi[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let i11il1 = 0; i11il1 < IIIIIi.length; i11il1++) {
    if (IIIIIi[i11il1]) {
      IIIIIl = IIIIIi[i11il1];
      $.UserName = decodeURIComponent(IIIIIl.match(/pt_pin=([^; ]+)(?=;?)/) && IIIIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = i11il1 + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      $.UA = illlIl.genUA($.UserName);

      for (m = 0; m < 3; m++) {
        console.log("进行第" + m + "次APP抽奖");
        await IIIl1l();
        await $.wait(parseInt(Math.random() * 1500 + 1500, 10));

        if (m > 10) {
          console.log("抽太多次了，下次运行再抽");
          break;
        }
      }

      await $.wait(500);
    }
  }
})().catch(ii1iiI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + ii1iiI + "!", "");
}).finally(() => {
  $.done();
});

async function IIIl1l() {
  return new Promise(async Iliii1 => {
    const iil1ll = {
      "functionId": "wheelsLottery",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": "dcifGEju5TQw38c_Gg8-ug"
      }
    },
          iiilil = await i11ili("bd6c8", iil1ll);
    let iil1li = {
      "url": "https://api.m.jd.com//api?" + iiilil,
      "headers": {
        "Referer": "https://pro.m.jd.com/mall/active/z6zjePGNASpeqTEbTBPDkJR3mNp/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": IIIIIl + "cid=8"
      }
    };
    $.get(iil1li, async (lllI1i, li1i1l, II1i1) => {
      try {
        II1i1 = JSON.parse(II1i1);

        if (II1i1) {
          if (II1i1.code == 0 && II1i1.success == true) {
            if (II1i1.data.rewardType == 3) console.log("抽中：" + II1i1.data.rewardValue + " " + II1i1.data.prizeName);else {
              if (II1i1.data.rewardType == 1) {
                console.log("抽中：" + II1i1.data.limitStr + " " + II1i1.data.prizeName);
              } else II1i1.data.rewardType == 0 ? console.log("抽中：空气") : console.log(JSON.stringify(II1i1));
            }
          } else II1i1.code == 2000 && II1i1.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(II1i1.errMsg);
        }
      } catch (li1i1I) {
        $.logErr(li1i1I, li1i1l);
      } finally {
        Iliii1();
      }
    });
  });
}

async function lllll() {
  return new Promise(async llI1I1 => {
    const lillII = {
      "functionId": "wheelsHome",
      "appid": "activities_platform",
      "clientVersion": "10.1.0",
      "client": "ios",
      "body": {
        "linkId": "dcifGEju5TQw38c_Gg8-ug"
      }
    },
          ii1ilI = await i11ili("c06b7", lillII);
    let lI1ll1 = {
      "url": "https://api.m.jd.com//api?" + ii1ilI,
      "headers": {
        "Referer": "https://pro.m.jd.com/mall/active/z6zjePGNASpeqTEbTBPDkJR3mNp/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": IIIIIl + "cid=8"
      }
    };
    $.get(lI1ll1, async (iIiI1, liil1I, i11ii1) => {
      try {
        i11ii1 = JSON.parse(i11ii1);

        if (i11ii1) {
          if (i11ii1.code == 0 && i11ii1.success == true) $.drawChanceNum = i11ii1.data.lotteryChances || 0;else i11ii1.code == 2000 && i11ii1.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : console.log(i11ii1.errMsg);
        }
      } catch (iiill1) {
        $.logErr(iiill1, liil1I);
      } finally {
        llI1I1();
      }
    });
  });
}

async function i11ili(lIli1l, lillIi) {
  try {
    let liil1i = new i11ill({
      "appId": lIli1l,
      "appid": "activities_platform",
      "clientVersion": lillIi?.["clientVersion"],
      "client": lillIi?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await liil1i.genAlgo(), body = await liil1i.genUrlParams(lillIi.functionId, lillIi.body), body;
  } catch (lI1lil) {}
}

function iil1l1(i1l1iI) {
  i1l1iI = i1l1iI || 32;
  let lI1lii = "0123456789abcdef",
      Iiili1 = lI1lii.length,
      Iil1l1 = "";

  for (let I1l11i = 0; I1l11i < i1l1iI; I1l11i++) Iil1l1 += lI1lii.charAt(Math.floor(Math.random() * Iiili1));

  return Iil1l1;
}

function lllli(iIIiiI) {
  if (typeof iIIiiI == "string") try {
    return JSON.parse(iIIiiI);
  } catch (ililIl) {
    return console.log(ililIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function iiili1(liiI1l) {
  return new Promise(i1i11l => {
    const II11l1 = {
      "url": liiI1l + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(II11l1, async (Iil1lI, IiiliI, iii1iI) => {
      try {
        if (Iil1lI) $.getAuthorCodeListerr = false;else {
          if (iii1iI) iii1iI = JSON.parse(iii1iI);
          $.getAuthorCodeListerr = true;
        }
      } catch (IlllIl) {
        $.logErr(IlllIl, IiiliI);
        iii1iI = null;
      } finally {
        i1i11l(iii1iI);
      }
    });
  });
}

function ill11i(I1l11I, Ilil1l) {
  return Math.floor(Math.random() * (Ilil1l - I1l11I)) + I1l11I;
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
