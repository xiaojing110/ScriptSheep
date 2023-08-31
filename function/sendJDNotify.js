/*
一个自定义的推送通知库，主要用于发送多账号的汇总消息推送通知，也支持单消息推送，推送通知业务调用自sendNotify.js，可引用此模块来平替引用sendNotify.js
账号消息支持关键词过滤，定义环境变量 JD_NOTIFY_FILTER_KEYWORDS 即可，多个关键词用@分割
例：export JD_NOTIFY_FILTER_KEYWORDS="空气@会员"

new Env('sendJDNotify');
*/
class lIIiI1Ii {
    constructor() {
        this.title = "";
        this.content = "";
        this.accounts = [];
        this.messageDelimiter = "，";
        this.parseMessageFilterKeywords();
        this.sendNotify = require("../sendNotify").sendNotify;
    }

    ["parseMessageFilterKeywords"]() {
        const iIiIiili = process.env.JD_NOTIFY_FILTER_KEYWORDS || "";
        this.messageFilterKeywords = iIiIiili.split("@").map(iilil1I1 => iilil1I1.trim()).filter(Boolean);
    }

    ["config"]({
        title: liilllIi,
        content: ilIiliII,
        messageDelimiter: Iilll1ll
    }) {
        if (liilllIi !== undefined) {
            this.title = liilllIi;
        }

        ilIiliII !== undefined && (this.content = ilIiliII);
        Iilll1ll !== undefined && (this.messageDelimiter = Iilll1ll);
    }

    ["updateTitle"](I1IiI1il) {
        this.title = I1IiI1il;
    }

    ["updateContent"](lllIIlIl) {
        this.content = lllIIlIl;
    }

    ["create"](i1IlII1l, IIl111l1) {
        let I1Il1Iii = this.accounts.find(iil1iIl => decodeURIComponent(iil1iIl.userName) === decodeURIComponent(IIl111l1));

        if (I1Il1Iii) {
            return I1Il1Iii;
        }

        i1IlII1l === undefined && (i1IlII1l = "");
        const Iiil1I1 = this.messageFilterKeywords,
            l1iIl111 = {
                "index": i1IlII1l,
                "userName": IIl111l1,
                "fixed": false,
                "messages": [],

                "insert"(llIil1I) {
                    if (Iiil1I1.length > 0 && Iiil1I1.some(l1iii1l1 => llIil1I.includes(l1iii1l1))) return;

                    if (l1iIl111.fixed) {
                        return;
                    }

                    l1iIl111.messages.push(llIil1I);
                },

                "updateUsername"(IIIilill) {
                    l1iIl111.userName = IIIilill;
                },

                "fix"(iillli1) {
                    if (Iiil1I1.length > 0 && Iiil1I1.some(ilI1lll1 => iillli1.includes(ilI1lll1))) {
                        return;
                    }

                    l1iIl111.fixed = true;
                    l1iIl111.messages = [iillli1];
                },

                "getInlineContent"() {
                    const Il1iIIi = this.messages.join(this.messageDelimiter);
                    if (Il1iIIi.trim() !== "") return "【京东账号" + i1IlII1l + "】" + IIl111l1 + "：" + Il1iIIi;
                    return "";
                }

            };
        return this.accounts.push(l1iIl111), l1iIl111;
    }

    ["dispose"](ii1Iil11) {
        this.accounts = this.accounts.filter(IiiIl111 => IiiIl111 !== ii1Iil11);
    }

    ["disposeByUsername"](i1IlIil1) {
        const ll1ll1il = this.accounts.find(iIlI11Il => decodeURIComponent(iIlI11Il.userName) === decodeURIComponent(i1IlIil1));
        ll1ll1il && this.dispose(ll1ll1il);
    }

    ["disposeByIndex"](lillllI) {
        const ill1Iil1 = this.accounts.find(IlilIl1l => IlilIl1l.index === lillllI);
        ill1Iil1 && this.dispose(ill1Iil1);
    }

    ["getMessage"]() {
        let i1iiIil1 = "";
        const Ii1I1i1 = new Map();

        for (const II11ll1I of this.accounts) {
            const lI1IlI1I = II11ll1I.index + "-" + II11ll1I.userName;
            Ii1I1i1.has(lI1IlI1I) ? Ii1I1i1.get(lI1IlI1I).push(...II11ll1I.messages) : Ii1I1i1.set(lI1IlI1I, II11ll1I.messages.slice());
        }

        for (const [Iii1iII, Ii1iIiii] of Ii1I1i1) {
            const [I1i1Ili1, Il1lliiI] = Iii1iII.split("-"),
                IIl1iii = Ii1iIiii.join(this.messageDelimiter);
            IIl1iii.trim() !== "" && (i1iiIil1 += "【京东账号" + I1i1Ili1 + "】" + Il1lliiI + "：" + IIl1iii + "\n");
        }

        return i1iiIil1 = i1iiIil1.trim(), i1iiIil1;
    }

    async ["send"](i1IIl1i, iI11Illl) {
        await this.sendNotify(i1IIl1i, iI11Illl);
    }

    async ["sendNotify"](lI1Il1ll, llllIIi1) {
        await this.send(lI1Il1ll, llllIIi1);
    }

    async ["push"]() {
        let l1i1IIlI = "";
        const li1Iii1 = new Map();

        for (const i1IIIIl of this.accounts) {
            const llIIIIi = i1IIIIl.index + "-" + i1IIIIl.userName;
            li1Iii1.has(llIIIIi) ? li1Iii1.get(llIIIIi).push(...i1IIIIl.messages) : li1Iii1.set(llIIIIi, i1IIIIl.messages.slice());
        }

        for (const [I1iiI11, Iii1lli] of li1Iii1) {
            const [lilliIii, i1l1IilI] = I1iiI11.split("-"),
                IlIiii1i = Iii1lli.join(this.messageDelimiter);
            IlIiii1i.trim() !== "" && (l1i1IIlI += "【京东账号" + lilliIii + "】" + i1l1IilI + "：" + IlIiii1i + "\n");
        }

        let IilillI1 = "";

        if (l1i1IIlI.length > 0) {
            IilillI1 = l1i1IIlI.trim() + "\n\n" + this.content.trim();
        } else IilillI1 = this.content.trim();

        await this.send(this.title, IilillI1);
    }

}

module.exports = new lIIiI1Ii();