/*
 * @Author: X1a0He
 * @LastEditors: 6dy
 * @Description: 批量取关京东店铺和商品
 * @Fixed: 不再支持Qx，仅支持Node.js,修复取关商品
 * @Updatetime: 2023/4/18
 */
const $ = new Env('批量取关店铺和商品');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if($.isNode()){
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if(process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let args_xh = {
    /*
     * 跳过某个指定账号，默认为全部账号清空
     * 填写规则：例如当前Cookie1为pt_key=key; pt_pin=pin1;则环境变量填写pin1即可，此时pin1的购物车将不会被清空
     * 若有更多，则按照pin1@pin2@pin3进行填写
     * 环境变量名称：XH_UNSUB_EXCEPT
     */
    except: process.env.XH_UNSUB_EXCEPT && process.env.XH_UNSUB_EXCEPT.split('@') || [],
    /*
     * 是否执行取消关注，默认true
     * 可通过环境变量控制：JD_UNSUB
     * */
    isRun: process.env.JD_UNSUB === 'true' || true,
    /*
     * 执行完毕是否进行通知，默认false
     * 可用环境变量控制：JD_UNSUB_NOTIFY
     * */
    isNotify: process.env.JD_UNSUB_NOTIFY === 'true' || false,
    /*
     * 每次获取已关注的商品数
     * 可设置环境变量：JD_UNSUB_GPAGESIZE，默认为20，不建议超过20
     * */
    goodPageSize: process.env.JD_UNSUB_GPAGESIZE * 1 || 20,
    /*
     * 每次获取已关注的店铺数
     * 可设置环境变量：JD_UNSUB_SPAGESIZE，默认为20，不建议超过20
     * */
    shopPageSize: process.env.JD_UNSUB_SPAGESIZE * 1 || 20,
    /*
     * 商品类过滤关键词，只要商品名内包含关键词，则不会被取消关注
     * 可设置环境变量：JD_UNSUB_GKEYWORDS，用@分隔
     * */
    goodsKeyWords: process.env.JD_UNSUB_GKEYWORDS && process.env.JD_UNSUB_GKEYWORDS.split('@') || [],
    /*
     * 店铺类过滤关键词，只要店铺名内包含关键词，则不会被取消关注
     * 可设置环境变量：JD_UNSUB_SKEYWORDS，用@分隔
     * */
    shopKeyWords: process.env.JD_UNSUB_SKEYWORDS && process.env.JD_UNSUB_SKEYWORDS.split('@') || [],
    /*
     * 间隔，防止提示操作频繁，单位毫秒(1秒 = 1000毫秒)
     * 可用环境变量控制：JD_UNSUB_INTERVAL，默认为3000毫秒
     * */
    unSubscribeInterval: process.env.JD_UNSUB_INTERVAL * 1 || 1000,
    /*
     * 是否打印日志
     * 可用环境变量控制：JD_UNSUB_PLOG，默认为true
     * */
    printLog: process.env.JD_UNSUB_PLOG === 'true' || true,
    /*
     * 失败次数，当取关商品或店铺时，如果连续 x 次失败，则结束本次取关，防止死循环
     * 可用环境变量控制：JD_UNSUB_FAILTIMES，默认为3次
     * */
    failTimes: process.env.JD_UNSUB_FAILTIMES || 3
}
!(async () => {
if (args_xh.isRun) {
    if (!cookiesArr[0]) {
    $.msg("【京东账号一】取关京东店铺商品失败", "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
        "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    }

    await iI1il1II();

    for (let ilii1lli = 0; ilii1lli < cookiesArr.length; ilii1lli++) {
    if (cookiesArr[ilii1lli]) {
        cookie = cookiesArr[ilii1lli];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = ilii1lli + 1;
        $.isLogin = true;
        $.nickName = "";
        await i111iil1();
        console.log("\n****开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*****\n");

        if (args_xh.except.includes($.UserName)) {
        console.log("跳过账号：" + ($.nickName || $.UserName));
        continue;
        }

        if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
        }

        $.shopsKeyWordsNum = 0;
        $.goodsKeyWordsNum = 0;
        $.unsubscribeGoodsNum = 0;
        $.unsubscribeShopsNum = 0;
        $.goodsTotalNum = 0;
        $.shopsTotalNum = 0;
        $.commIdList = "";
        $.shopIdList = "";
        $.endGoods = $.endShops = false;
        $.failTimes = 0;
        await iIilIiII();
        await $.wait(args_xh.unSubscribeInterval);

        if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) {
        let lll1i1ll = $.commIdList.split(",").filter(ililii1i => !!ililii1i);
        $.log("开始取关商品...\n");

        for (let ii1l1iII = 0; ii1l1iII < 20; ii1l1iII++) {
            if (lll1i1ll.length === 0) break;
            $.log("第" + (ii1l1iII + 1) + "次取关商品->");
            let iiIIliII = lll1i1ll.splice(0, 20);
            iiIIliII = iiIIliII.join(",");
            await i1lll1i1(iiIIliII);
            await $.wait(1000);
        }
        } else console.log("不执行取消收藏商品\n");

        await $.wait(args_xh.unSubscribeInterval);
        await lliiIliI();
        await $.wait(args_xh.unSubscribeInterval);
        if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await ii1illl1();else console.log("不执行取消收藏店铺\n");

        do {
        if (parseInt($.goodsTotalNum) === 0 && parseInt($.shopsTotalNum) === 0) break;else {
            if (parseInt($.goodsTotalNum) !== 0) {
            if (parseInt($.goodsTotalNum) === parseInt($.goodsKeyWordsNum)) break;else {
                $.commIdList = "";
                await iIilIiII();
                await $.wait(args_xh.unSubscribeInterval);
                if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) await i1lll1i1();else console.log("不执行取消收藏商品\n");
            }
            } else {
            if (parseInt($.shopsTotalNum) !== 0) {
                if (parseInt($.shopsTotalNum) === parseInt($.shopsKeyWordsNum)) break;else {
                $.shopIdList = "";
                await lliiIliI();
                await $.wait(args_xh.unSubscribeInterval);
                if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await ii1illl1();else console.log("不执行取消收藏店铺\n");
                }
            }
            }
        }

        if ($.failTimes >= args_xh.failTimes) {
            console.log("失败次数到达设定值，触发防死循环机制，该帐号已跳过");
            break;
        }
        } while (true);

        await llii1Il();
    }
    }
}
})().catch(IlIlllI1 => {
$.log("", "❌ " + $.name + ", 失败! 原因: " + IlIlllI1 + "!", "");
}).finally(() => {
$.done();
});

function iI1il1II() {
return new Promise(liii1iIl => {
    if ($.isNode() && process.env.JD_UNSUB) {
    console.log("=====环境变量配置如下=====");
    console.log("except: " + typeof args_xh.except + ", " + args_xh.except);
    console.log("isNotify: " + typeof args_xh.isNotify + ", " + args_xh.isNotify);
    console.log("goodPageSize: " + typeof args_xh.goodPageSize + ", " + args_xh.goodPageSize);
    console.log("shopPageSize: " + typeof args_xh.shopPageSize + ", " + args_xh.shopPageSize);
    console.log("goodsKeyWords: " + typeof args_xh.goodsKeyWords + ", " + args_xh.goodsKeyWords);
    console.log("shopKeyWords: " + typeof args_xh.shopKeyWords + ", " + args_xh.shopKeyWords);
    console.log("unSubscribeInterval: " + typeof args_xh.unSubscribeInterval + ", " + args_xh.unSubscribeInterval);
    console.log("printLog: " + typeof args_xh.printLog + ", " + args_xh.printLog);
    console.log("failTimes: " + typeof args_xh.failTimes + ", " + args_xh.failTimes);
    console.log("=======================");
    }

    liii1iIl();
});
}

function llii1Il() {
args_xh.isNotify ? $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个") : $.log("【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
}

function l1liiIli(I1lIilll, I1ii11il, II1iIIli) {
let ii1iil1 = I1lIilll.indexOf(I1ii11il),
    ii1lllli = I1lIilll.indexOf(II1iIIli, ii1iil1);
if (ii1iil1 < 0 || ii1lllli < ii1iil1) return "";
return I1lIilll.substring(ii1iil1 + I1ii11il.length, ii1lllli);
}

function iIilIiII() {
return new Promise(async l1I11iIl => {
    console.log("获取已关注的商品...");

    const l1l1illi = require("./function/dylanx.js");

    let IiliiiI1 = {
    "page": "1",
    "pagesize": "300",
    "sortType": "time_desc"
    },
        Illlli1I = await l1l1illi.getbody("favoriteList", IiliiiI1),
        Ili11I1l = {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=favoriteList&" + Illlli1I + "&lmt=0",
    "headers": {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "okhttp/3.12.13",
        "Cookie": cookie
    }
    };
    $.post(Ili11I1l, async (IiI11Ii, iillI1, I1llIiI) => {
    try {
        if (IiI11Ii) {
        console.log(IiI11Ii);
        return;
        }

        I1llIiI = JSON.parse(I1llIiI);

        if (I1llIiI.code === "0") {
        $.goodsTotalNum = parseInt(I1llIiI.favoriteList.length);
        console.log("当前已关注商品：" + $.goodsTotalNum + "个");
        $.goodsKeyWordsNum = 0;

        for (let iiI1llli of I1llIiI.favoriteList) {
            args_xh.goodsKeyWords.some(II1I1i1I => iiI1llli.wname.includes(II1I1i1I)) ? (args_xh.printLog ? console.log(iiI1llli.wname + " ") : "", args_xh.printLog ? console.log("商品被过滤，含有关键词\n") : "", $.goodsKeyWordsNum += 1) : ($.commIdList += iiI1llli.fid + ",", $.unsubscribeGoodsNum++);
        }
        } else {
        $.endGoods = true;
        console.log("无商品可取消收藏\n");
        }
    } catch (i11Ii1ii) {
        $.logErr(i11Ii1ii, iillI1);
    } finally {
        l1I11iIl(I1llIiI);
    }
    });
});
}

function i1lll1i1(Ii1iiIil) {
return new Promise(Ii1ilI => {
    const Iilii1iI = {
    "url": "https://wq.jd.com/fav/comm/FavCommBatchDel?commId=" + Ii1iiIil + "&sceneval=2&g_login_type=1",
    "headers": {
        "Cookie": cookie,
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://wqs.jd.com/"
    }
    };
    $.get(Iilii1iI, (Iiii1Iii, iIiI111I, il1liI11) => {
    try {
        if (Iiii1Iii) {
        console.log(Iiii1Iii);
        return;
        }

        il1liI11 = JSON.parse(il1liI11);
        il1liI11.iRet === "0" && il1liI11.errMsg === "success" ? (console.log("成功取关商品：" + Ii1iiIil.split(",").length + "个\n"), $.failTimes = 0) : console.log("批量取关商品失败，失败次数：" + ++$.failTimes + "\n", il1liI11);
    } catch (iIlli1li) {
        $.logErr(iIlli1li, iIiI111I);
    } finally {
        Ii1ilI(il1liI11);
    }
    });
});
}

function lliiIliI() {
return new Promise(IIiiilii => {
    console.log("正在获取已关注的店铺...");
    const ilill1Il = {
    "url": "https://wq.jd.com/fav/shop/QueryShopFavList?cp=1&pageSize=" + args_xh.shopPageSize + "&sceneval=2&g_login_type=1&callback=jsonpCBKA",
    "headers": {
        "Cookie": cookie,
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://wqs.jd.com/"
    }
    };
    $.get(ilill1Il, (iiIilIl, I1lili1I, I1liiI1I) => {
    try {
        if (I1liiI1I.indexOf("Authorization") !== -1) {
        console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
        return;
        }

        I1liiI1I = JSON.parse(l1liiIli(I1liiI1I, "try{jsonpCBKA(", ");}catch(e){}"));

        if (I1liiI1I.iRet === "0") {
        $.shopsTotalNum = parseInt(I1liiI1I.totalNum);
        console.log("当前已关注店铺：" + $.shopsTotalNum + "个");

        if (I1liiI1I.data.length > 0) {
            $.shopsKeyWordsNum = 0;

            for (let iiil1 of I1liiI1I.data) {
            if (args_xh.shopKeyWords.some(il11ilII => iiil1.shopName.includes(il11ilII))) {
                args_xh.printLog ? console.log("店铺被过滤，含有关键词") : "";
                args_xh.printLog ? console.log(iiil1.shopName + "\n") : "";
                $.shopsKeyWordsNum += 1;
            } else {
                $.shopIdList += iiil1.shopId + ",";
                $.unsubscribeShopsNum++;
            }
            }
        } else {
            $.endShops = true;
            console.log("无店铺可取消关注\n");
        }
        } else console.log("获取已关注店铺失败：" + JSON.stringify(I1liiI1I));
    } catch (lIiIlIIi) {
        $.logErr(lIiIlIIi, I1lili1I);
    } finally {
        IIiiilii(I1liiI1I);
    }
    });
});
}

function ii1illl1() {
return new Promise(iI1liiIi => {
    console.log("正在执行批量取消关注店铺...");
    const l1Ili1ll = {
    "url": "https://wq.jd.com/fav/shop/batchunfollow?shopId=" + $.shopIdList + "&sceneval=2&g_login_type=1",
    "headers": {
        "Cookie": cookie,
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Referer": "https://wqs.jd.com/"
    }
    };
    $.get(l1Ili1ll, (liIIllil, iIi1li, l11Ii) => {
    try {
        if (l11Ii.indexOf("Authorization") !== -1) {
        console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
        return;
        }

        l11Ii = JSON.parse(l11Ii);

        if (l11Ii.iRet === "0") {
        console.log("已成功取消关注店铺：" + $.unsubscribeShopsNum + "个\n");
        $.failTimes = 0;
        } else {
        console.log("批量取消关注店铺失败，失败次数：" + ++$.failTimes + "\n");
        }
    } catch (iiii1iI) {
        $.logErr(iiii1iI, iIi1li);
    } finally {
        iI1liiIi(l11Ii);
    }
    });
});
}

function i111iil1() {
return new Promise(async ii1liiiI => {
    const lill1l1 = {
    "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
    "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
    }
    };
    $.post(lill1l1, (IlIlil11, lIi1iIi1, iiil1Ili) => {
    try {
        if (IlIlil11) {
        console.log("" + JSON.stringify(IlIlil11));
        console.log($.name + " API请求失败，请检查网路重试");
        } else {
        if (iiil1Ili) {
            iiil1Ili = JSON.parse(iiil1Ili);

            if (iiil1Ili.retcode === 13) {
            $.isLogin = false;
            return;
            }

            iiil1Ili.retcode === 0 ? $.nickName = iiil1Ili.base && iiil1Ili.base.nickname || $.UserName : $.nickName = $.UserName;
        } else console.log("京东服务器返回空数据");
        }
    } catch (IIIIi1ii) {
        $.logErr(IIIIi1ii, lIi1iIi1);
    } finally {
        ii1liiiI();
    }
    });
});
}

function Iil1iiii(liIii1l) {
if (typeof liIii1l == "string") {
    try {
    return JSON.parse(liIii1l);
    } catch (iilii11) {
    return console.log(iilii11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
}
  function Env(t, e){
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s{
        constructor(t){
            this.env = t
        }

        send(t, e = "GET"){
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t){
            return this.send.call(this.env, t)
        }

        post(t){
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class{
        constructor(t, e){
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode(){
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX(){
            return "undefined" != typeof $task
        }

        isSurge(){
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon(){
            return "undefined" != typeof $loon
        }

        toObj(t, e = null){
            try{
                return JSON.parse(t)
            } catch{
                return e
            }
        }

        toStr(t, e = null){
            try{
                return JSON.stringify(t)
            } catch{
                return e
            }
        }

        getjson(t, e){
            let s = e;
            const i = this.getdata(t);
            if(i) try{
                s = JSON.parse(this.getdata(t))
            } catch{}
            return s
        }

        setjson(t, e){
            try{
                return this.setdata(JSON.stringify(t), e)
            } catch{
                return !1
            }
        }

        getScript(t){
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e){
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata(){
            if(!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if(!s && !i) return {};
                {
                    const i = s ? t : e;
                    try{
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch(t){
                        return {}
                    }
                }
            }
        }

        writedata(){
            if(this.isNode()){
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s){
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for(const t of i)
                if(r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s){
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t){
            let e = this.getval(t);
            if(/^@/.test(t)){
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if(r) try{
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch(t){
                    e = ""
                }
            }
            return e
        }

        setdata(t, e){
            let s = !1;
            if(/^@/.test(e)){
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try{
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch(e){
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t){
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e){
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t){
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {})){
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try{
                    if(t.headers["set-cookie"]){
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch(t){
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {})){
            if(t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if(this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if(this.isNode()){
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null){
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for(let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r){
            const o = t => {
                if(!t) return t;
                if("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if("object" == typeof t){
                    if(this.isLoon()){
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if(this.isQuanX()){
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if(this.isSurge()){
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if(this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog){
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t){
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e){
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t){
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}){
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
