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
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
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
        !cookiesArr[0] && $.msg("【京东账号一】取关京东店铺商品失败", "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        await _0x5533a2();

        for (let _0x1869af = 0; _0x1869af < cookiesArr.length; _0x1869af++) {
            if (cookiesArr[_0x1869af]) {
                cookie = cookiesArr[_0x1869af];
                $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
                $.index = _0x1869af + 1;
                $.isLogin = true;
                $.nickName = "";
                await _0x2846f5();
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
                await _0x29d155();
                await $.wait(args_xh.unSubscribeInterval);

                if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) {
                    let _0x9bacf0 = $.commIdList.split(",").filter(_0x3a2f1d => !!_0x3a2f1d);

                    $.log("开始取关商品...\n");

                    for (let _0x1eec5a = 0; _0x1eec5a < 20; _0x1eec5a++) {
                        if (_0x9bacf0.length === 0) break;
                        $.log("第" + (_0x1eec5a + 1) + "次取关商品->");

                        let _0x43fe8b = _0x9bacf0.splice(0, 20);

                        _0x43fe8b = _0x43fe8b.join(",");
                        await _0x512485(_0x43fe8b);
                        await $.wait(2000);
                    }
                } else console.log("不执行取消收藏商品\n");

                await $.wait(args_xh.unSubscribeInterval);
                await _0x5c2cda();
                await $.wait(args_xh.unSubscribeInterval);
                if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x319d99(); else console.log("不执行取消收藏店铺\n");

                do {
                    if (parseInt($.shopsTotalNum) === 0) break; else {
                        if (parseInt($.shopsTotalNum) === parseInt($.shopsKeyWordsNum)) break; else {
                            $.shopIdList = "";
                            await _0x5c2cda();
                            await $.wait(args_xh.unSubscribeInterval);
                            if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await _0x319d99(); else console.log("不执行取消收藏店铺\n");
                        }
                    }

                    if ($.failTimes >= args_xh.failTimes) {
                        console.log("失败次数到达设定值，触发防死循环机制，该帐号已跳过");
                        break;
                    }
                } while (true);

                await _0x2cbd6a();
            }
        }
    } else $.log("\n默认不执行,请设置变量JD_UNSUB = 'true'");
})().catch(_0x4cd60c => {
    $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4cd60c + "!", "");
}).finally(() => {
    $.done();
});

function _0x5533a2() {
    return new Promise(_0xfbee29 => {
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

        _0xfbee29();
    });
}

function _0x2cbd6a() {
    if (args_xh.isNotify) {
        $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
    } else $.log("【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
}

function _0x32818e(_0x8598e, _0x11359d, _0x173fe4) {
    let _0xc5663e = _0x8598e.indexOf(_0x11359d),
        _0x2c5ec6 = _0x8598e.indexOf(_0x173fe4, _0xc5663e);

    if (_0xc5663e < 0 || _0x2c5ec6 < _0xc5663e) return "";
    return _0x8598e.substring(_0xc5663e + _0x11359d.length, _0x2c5ec6);
}

function _0x29d155() {
    return new Promise(async _0x506249 => {
        console.log("获取已关注的商品...");

        const _0x2fa2d1 = require("./function/dylanx.js");

        let _0x14df94 = {
            "page": "1",
            "pagesize": "300",
            "sortType": "time_desc"
        },
            _0x39d682 = await _0x2fa2d1.getbody("favoriteList", _0x14df94),
            _0x353a07 = {
                "url": "https://api.m.jd.com/client.action",
                "body": "functionId=favoriteList&" + _0x39d682 + "&lmt=0",
                "headers": {
                    "Host": "api.m.jd.com",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "okhttp/3.12.13",
                    "Cookie": cookie
                }
            };

        $.post(_0x353a07, async (_0xd3d456, _0x18baa2, _0x2ca598) => {
            try {
                if (_0xd3d456) {
                    console.log(_0xd3d456);
                    return;
                }

                _0x2ca598 = JSON.parse(_0x2ca598);

                if (_0x2ca598.code === "0") {
                    $.goodsTotalNum = parseInt(_0x2ca598.favoriteList.length);
                    console.log("当前已关注商品：" + $.goodsTotalNum + "个");
                    $.goodsKeyWordsNum = 0;

                    for (let _0x40ccac of _0x2ca598.favoriteList) {
                        if (args_xh.goodsKeyWords.some(_0x5f4ab2 => _0x40ccac.wname.includes(_0x5f4ab2))) args_xh.printLog ? console.log(_0x40ccac.wname + " ") : "", args_xh.printLog ? console.log("商品被过滤，含有关键词\n") : "", $.goodsKeyWordsNum += 1; else {
                            $.commIdList += _0x40ccac.fid + ",";
                            $.unsubscribeGoodsNum++;
                        }
                    }
                } else $.endGoods = true, console.log("无商品可取消收藏\n");
            } catch (_0x2c7a3a) {
                $.logErr(_0x2c7a3a, _0x18baa2);
            } finally {
                _0x506249(_0x2ca598);
            }
        });
    });
}

function _0x512485(_0x240ab0) {
    return new Promise(_0x38f3a7 => {
        let _0x712a5d = {
            "commId": _0x240ab0,
            "tenantCode": "jgminise",
            "bizModelCode": "6",
            "bizModeClientType": "WxMiniProgram",
            "externalLoginType": ""
        };
        const _0x456ef2 = {
            "url": "https://api.m.jd.com/api?appid=jd-cphdeveloper-m&functionId=delFollowProduct&body=" + encodeURIComponent(JSON.stringify(_0x712a5d)) + "&loginType=2&g_login_type=2&g_tk=891942062&g_ty=ajax&appCode=msd95910c4",
            "headers": {
                "Cookie": cookie,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Referer": "https://wqs.jd.com/"
            }
        };
        $.get(_0x456ef2, (_0x81ac9, _0x40f792, _0x8e3d4a) => {
            try {
                if (_0x81ac9) {
                    console.log(_0x81ac9);
                    return;
                }

                _0x8e3d4a = JSON.parse(_0x8e3d4a);
                _0x8e3d4a.errorCode === 0 ? (console.log("成功取关商品：" + _0x240ab0.split(",").length + "个\n"), $.failTimes = 0) : console.log("批量取关商品失败，失败次数：" + ++$.failTimes + "\n", JSON.stringify(_0x8e3d4a));
            } catch (_0x3d5992) {
                $.logErr(_0x3d5992, _0x40f792);
            } finally {
                _0x38f3a7(_0x8e3d4a);
            }
        });
    });
}

function _0x5c2cda() {
    return new Promise(_0x4d0779 => {
        console.log("正在获取已关注的店铺...");
        const _0x45b364 = {
            "url": "https://wq.jd.com/fav/shop/QueryShopFavList?cp=1&pageSize=" + args_xh.shopPageSize + "&sceneval=2&g_login_type=1&callback=jsonpCBKA",
            "headers": {
                "Cookie": cookie,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Referer": "https://wqs.jd.com/"
            }
        };
        $.get(_0x45b364, (_0x5a410f, _0x2ce5e, _0x41e784) => {
            try {
                if (_0x41e784.indexOf("Authorization") !== -1) {
                    console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
                    return;
                }

                _0x41e784 = JSON.parse(_0x32818e(_0x41e784, "try{jsonpCBKA(", ");}catch(e){}"));

                if (_0x41e784.iRet === "0") {
                    $.shopsTotalNum = parseInt(_0x41e784.totalNum);
                    console.log("当前已关注店铺：" + $.shopsTotalNum + "个");

                    if (_0x41e784.data.length > 0) {
                        $.shopsKeyWordsNum = 0;

                        for (let _0x21efc2 of _0x41e784.data) {
                            if (args_xh.shopKeyWords.some(_0xae9965 => _0x21efc2.shopName.includes(_0xae9965))) {
                                args_xh.printLog ? console.log("店铺被过滤，含有关键词") : "";
                                args_xh.printLog ? console.log(_0x21efc2.shopName + "\n") : "";
                                $.shopsKeyWordsNum += 1;
                            } else $.shopIdList += _0x21efc2.shopId + ",", $.unsubscribeShopsNum++;
                        }
                    } else $.endShops = true, console.log("无店铺可取消关注\n");
                } else console.log("获取已关注店铺失败：" + JSON.stringify(_0x41e784));
            } catch (_0x5814c2) {
                $.logErr(_0x5814c2, _0x2ce5e);
            } finally {
                _0x4d0779(_0x41e784);
            }
        });
    });
}

function _0x319d99() {
    return new Promise(_0x2bb685 => {
        console.log("正在执行批量取消关注店铺...");
        const _0x44a221 = {
            "url": "https://wq.jd.com/fav/shop/batchunfollow?shopId=" + $.shopIdList + "&sceneval=2&g_login_type=1",
            "headers": {
                "Cookie": cookie,
                "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
                "Referer": "https://wqs.jd.com/"
            }
        };
        $.get(_0x44a221, (_0xca7491, _0xd2b2b0, _0x26ed52) => {
            try {
                if (_0x26ed52.indexOf("Authorization") !== -1) {
                    console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
                    return;
                }

                _0x26ed52 = JSON.parse(_0x26ed52);

                if (_0x26ed52.iRet === "0") {
                    console.log("已成功取消关注店铺：" + $.unsubscribeShopsNum + "个\n");
                    $.failTimes = 0;
                } else console.log("批量取消关注店铺失败，失败次数：" + ++$.failTimes + "\n");
            } catch (_0x4e4df2) {
                $.logErr(_0x4e4df2, _0xd2b2b0);
            } finally {
                _0x2bb685(_0x26ed52);
            }
        });
    });
}

function _0x2846f5() {
    return new Promise(async _0x4a9a6f => {
        const _0x10862f = {
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
        $.post(_0x10862f, (_0x40aa18, _0x3552d2, _0x4fa619) => {
            try {
                if (_0x40aa18) console.log("" + JSON.stringify(_0x40aa18)), console.log($.name + " API请求失败，请检查网路重试"); else {
                    if (_0x4fa619) {
                        _0x4fa619 = JSON.parse(_0x4fa619);

                        if (_0x4fa619.retcode === 13) {
                            $.isLogin = false;
                            return;
                        }

                        if (_0x4fa619.retcode === 0) {
                            $.nickName = _0x4fa619.base && _0x4fa619.base.nickname || $.UserName;
                        } else $.nickName = $.UserName;
                    } else {
                        console.log("京东服务器返回空数据");
                    }
                }
            } catch (_0x237fab) {
                $.logErr(_0x237fab, _0x3552d2);
            } finally {
                _0x4a9a6f();
            }
        });
    });
}

function _0x93df1(_0x20543c) {
    if (typeof _0x20543c == "string") try {
        return JSON.parse(_0x20543c);
    } catch (_0x46fd9a) {
        return console.log(_0x46fd9a), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
}
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
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

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch { }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
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

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => { })) {
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
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
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

        post(t, e = (() => { })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
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
            else if (this.isNode()) {
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

        time(t, e = null) {
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
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
