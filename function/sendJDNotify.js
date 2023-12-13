/*
一个强大的推送通知库，主要用于汇总多条账号消息后集中推送通知
默认情况下账号消息指的是单一账号的消息，它由“<前缀><用户名><消息内容>”组成，其中消息内容由一条或多条组成最后用指定字符拼接成一条合并内容
脚本最终汇总多条账号消息后集中触发推送通知业务，每个账号的消息占用一行，排列顺序以优先触发记录为原则
此库封装了多条方法，推送通知业务调用自 sendNotify.js，可引用此模块来平替引用它，支持单消息推送

账号消息自定义功能如下（环境变量）
1。关键词过滤，触发时不推送对应单条账号消息 JD_NOTIFY_FILTER_KEYWORDS
  例：export JD_NOTIFY_FILTER_KEYWORDS="空气@会员"，多个关键词用@分割
2。消息内容分隔符 JD_NOTIFY_DELIMITER，默认为中文逗号
  例：export JD_NOTIFY_DELIMITER="、"，此分隔符用于分隔多条账号消息
3。设置替换用户名为昵称 JD_NOTIFY_NICKNAMES
  例：export JD_NOTIFY_NICKNAMES="userpin_α@哥哥,userpin_β@弟弟"，多个昵称配置用英文逗号分割，用户名和昵称用@分割
4。是否显示用户名 JD_NOTIFY_SHOW_USERNAME（true/false），默认显示
  例：export JD_NOTIFY_SHOW_USERNAME="false"
5. 设置推送通知的用户名是否脱敏 JD_NOTIFY_USERNAME_DESENSITIZATION（true/false），默认不脱敏，根据用户名长度动态将部分字符用*替换
  例：JD_NOTIFY_USERNAME_DESENSITIZATION="true"
6。设置消息前缀格式 JD_NOTIFY_PREFIX_FORMATA，默认为 "【京东账号<序号>】"
  例：export JD_NOTIFY_PREFIX_FORMATA="[账号%]"，%代表账号序号
7。设置自动合并消息中用数字开头表示数量的内容 JD_NOTIFY_AUTO_MERGE_TYPE
  例：export JD_NOTIFY_AUTO_MERGE_TYPE="积分 🎟️"，多个规则用@分割，正则匹配

new Env('sendJDNotify');
*/

class lI1IIi {
  constructor() {
    this.title = "";
    this.content = "";
    this.sendNotify = require("../sendNotify").sendNotify;
    this._accountsArray = [];
    this._messageDelimiter = "";
    this._messageFilterKeywords = [];
    this._showUserName = true;
    this._userNameDesensitization = false;
    this._nicknames = {};
    this._prefixFormat = "【京东账号%】";
    this._autoMergeType = "";

    this._Init();
  }

  ["_Init"]() {
    process.env.JD_NOTIFY_FILTER_KEYWORDS && (this._messageFilterKeywords = process.env.JD_NOTIFY_FILTER_KEYWORDS.split("@").map(lI1IIl => lI1IIl.trim()).filter(Boolean));
    this._messageDelimiter = process.env.JD_NOTIFY_DELIMITER || "，";

    if (process.env.JD_NOTIFY_NICKNAMES) {
      const i1ilI = process.env.JD_NOTIFY_NICKNAMES.split(",");
      i1ilI.forEach(iii1lI => {
        let i1ilI1 = iii1lI.split("@");
        i1ilI1.length === 2 && i1ilI1[0] && i1ilI1[1] && (this._nicknames[i1ilI1[0]] = i1ilI1[1]);
      });
    }

    this._showUserName = !(process.env.JD_NOTIFY_SHOW_USERNAME === "false");
    this._userNameDesensitization = process.env.JD_NOTIFY_USERNAME_DESENSITIZATION === "true";
    process.env.JD_NOTIFY_PREFIX_FORMATA && (this._prefixFormat = process.env.JD_NOTIFY_PREFIX_FORMATA);
    process.env.JD_NOTIFY_AUTO_MERGE_TYPE && (this._autoMergeType = process.env.JD_NOTIFY_AUTO_MERGE_TYPE);
  }

  ["_mergeMessages"](lI1III, IIliIi) {
    const i1il1 = lI1III;

    try {
      function iliIii(il1li) {
        const iIIill = il1li.match(/(\d+)(.+)/);
        return iIIill ? {
          "count": parseInt(iIIill[1]),
          "name": iIIill[2].trim()
        } : {
          "count": null,
          "name": il1li
        };
      }

      function lill1i(iilii, Ill11i, iilil) {
        return Ill11i !== null && iilil.split("@").includes(iilii);
      }

      for (let il1ll = 0; il1ll < lI1III.length; il1ll++) {
        const {
          count: i1ilIi,
          name: lill1l
        } = iliIii(lI1III[il1ll]);
        if (lill1i(lill1l, i1ilIi, IIliIi)) for (let l1l1i1 = il1ll + 1; l1l1i1 < lI1III.length; l1l1i1++) {
          const {
            count: i1iiI,
            name: i1ilIl
          } = iliIii(lI1III[l1l1i1]);
          lill1l === i1ilIl && (lI1III[il1ll] = "" + (i1ilIi + i1iiI) + lill1l, lI1III.splice(l1l1i1, 1), l1l1i1--);
        }
      }

      return lI1III;
    } catch {
      return i1il1;
    }
  }

  ["_desensitizingUserName"](Iil1i1) {
    if (Iil1i1.length < 5) {
      switch (Iil1i1.length) {
        case 1:
          return Iil1i1;

        case 2:
          return Iil1i1.slice(0, 1) + "*";

        case 3:
          return Iil1i1.slice(0, 1) + "*" + Iil1i1.slice(-1);

        case 4:
          return Iil1i1.slice(0, 2) + "**";
      }
    } else {
      return Iil1i1.slice(0, 2) + "*".repeat(Iil1i1.length - 4) + Iil1i1.slice(-2);
    }
  }

  ["_formatAcountsMessage"]() {
    let lI1l1i = [];

    for (let {
      userName: llI11i,
      index: i1iIi1,
      messages: l1l1il
    } of this._accountsArray) {
      l1l1il = l1l1il.filter(iliIi1 => iliIi1 !== null && iliIi1 !== undefined && iliIi1 !== "");
      const I11i1I = lI1l1i.find(l1l1ii => l1l1ii.userName === llI11i);

      if (I11i1I) {
        I11i1I.index === "" && (I11i1I.index = i1iIi1);

        if (l1l1il.length > 0) {
          I11i1I.messages.push(...l1l1il);
        }
      } else lI1l1i.push({
        "userName": llI11i,
        "index": i1iIi1,
        "messages": l1l1il
      });
    }

    lI1l1i = lI1l1i.filter(il1l1 => il1l1.messages.length > 0);
    this._autoMergeType && lI1l1i.forEach(Ii1iil => {
      Ii1iil.messages = this._mergeMessages(Ii1iil.messages, this._autoMergeType);
    });
    this._accountsArray = lI1l1i;
  }

  ["config"]({
    title: Ilil1i,
    content: iili1,
    messageDelimiter: II11ii
  }) {
    Ilil1i !== undefined && (this.title = Ilil1i);
    iili1 !== undefined && (this.content = iili1);
    II11ii !== undefined && (this._messageDelimiter = II11ii);
  }

  ["updateTitle"](liI1i1) {
    this.title = liI1i1;
  }

  ["updateContent"](I11i11) {
    this.content = I11i11;
  }

  ["create"](I1llII, Iil1il) {
    const l1l1iI = this._messageFilterKeywords,
      I1llI1 = this._prefixFormat,
      I11i1l = this._nicknames,
      il1il = this._showUserName;
    I1llII === undefined && (I1llII = "");
    const Il1i1i = {
      "index": "" + I1llII,
      "userName": Iil1il,
      "fixed": false,
      "messages": [],
      "originMessages": [],

      "insert"(llI111) {
        if (!llI111) return;
        if (Il1i1i.fixed) return;
        Il1i1i.originMessages.push(llI111);
        if (l1l1iI.length > 0 && l1l1iI.some(I1il11 => llI111.includes(I1il11))) return;
        Il1i1i.messages.push(llI111);
      },

      "fix"(lI1l11) {
        if (!lI1l11) return;
        Il1i1i.fixed = true;
        Il1i1i.originMessages = [lI1l11];
        if (l1l1iI.length > 0 && l1l1iI.some(liI1ii => lI1l11.includes(liI1ii))) return;
        Il1i1i.messages = [lI1l11];
      },

      "updateIndex"(lIIiIl) {
        Il1i1i.index = "" + lIIiIl;
      },

      "updateUsername"(iI1Iil) {
        Il1i1i.userName = iI1Iil;
      },

      "getInlineContent"() {
        let i1iIii = this.originMessages.join(this._messageDelimiter).trim();

        if (this._autoMergeType) {
          i1iIii = this._mergeMessages(i1iIii, this._autoMergeType);
        }

        const i1iIil = I1llI1.replace("%", this.index),
          liI1il = decodeURIComponent(I11i1l[this.userName] || this.userName),
          llIlIi = il1il ? liI1il + "：" : "";
        return "" + i1iIil + llIlIi + (i1iIii || "无");
      }

    };
    return this._accountsArray.push(Il1i1i), Il1i1i;
  }

  ["dispose"](i1iIlI) {
    this._accountsArray = this._accountsArray.filter(li111 => li111 !== i1iIlI);
  }

  ["disposeByUsername"](liI1lI) {
    const lIIiI1 = this._accountsArray.find(ll1I1 => decodeURIComponent(ll1I1.userName) === decodeURIComponent(liI1lI));

    lIIiI1 && this.dispose(lIIiI1);
  }

  ["disposeByIndex"](Ii1ili) {
    const iI1Ii1 = this._accountsArray.find(Ii1ill => Ii1ill.index === "" + Ii1ili);

    iI1Ii1 && this.dispose(iI1Ii1);
  }

  ["getMessage"](llIlI1 = false) {
    if (this._accountsArray.length === 0) return "";

    this._formatAcountsMessage();

    if (this._accountsArray.length === 0) return "";
    let IIlI1 = "";

    for (const {
      userName: IllIlI,
      index: IiillI,
      messages: ili11I
    } of this._accountsArray) {
      const lliiIl = this._prefixFormat.replace("%", IiillI),
        li11i = decodeURIComponent(this._nicknames[IllIlI] || IllIlI),
        lliiIi = this._showUserName ? (this._userNameDesensitization && llIlI1 ? this._desensitizingUserName(li11i) : li11i) + "：" : "",
        iiIi1I = ili11I.join(this._messageDelimiter).trim();

      IIlI1 += "" + lliiIl + lliiIi + iiIi1I + "\n";
    }

    return IIlI1.trim();
  }

  async ["send"](IllIl1, ll1Ii) {
    await this.sendNotify(IllIl1, ll1Ii);
  }

  async ["sendNotify"](ll1Il, iiIi11) {
    await this.send(ll1Il, iiIi11);
  }

  async ["push"]() {
    this.content = this.content.trim();
    let i1llil = this.content;
    const i1llii = this.getMessage(true);
    if (i1llii) i1llil = i1llii.trim() + "\n\n" + i1llil;
    await this.send(this.title, i1llil);
  }

}

module.exports = new lI1IIi();