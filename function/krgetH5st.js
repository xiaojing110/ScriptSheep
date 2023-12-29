/*
new Env('getH5st');
*/
const lIill1 = require("fs"),
      iiI1i1 = require("jsdom");

class ilIlII {
  constructor() {
    this.domWindow3_1 = null;
    this.domWindow3_1_UA = null;
    this.domWindow4_1 = null;
    this.domWindow4_1_UA = null;
    this.domWindow4_2 = null;
    this.domWindow4_2_UA = null;
    this.domWindow4_3 = null;
    this.domWindow4_3_UA = null;
  }

  async ["_sleep"](iIiil1) {
    return new Promise((I1iil1, lIillI) => {
      setTimeout(() => {
        I1iil1(iIiil1);
      }, iIiil1);
    });
  }

  async ["_loadH5Sdk"](iIiiii, ilIlIi) {
    const {
      JSDOM: l1lI1I
    } = iiI1i1;
    let ll1llI = new iiI1i1.ResourceLoader({
      "userAgent": ilIlIi
    }),
        i11lIl = new iiI1i1.VirtualConsole(),
        l1lI11 = {
      "url": "http://localhost",
      "userAgent": ilIlIi,
      "runScripts": "dangerously",
      "resources": ll1llI,
      "includeNodeLocations": true,
      "storageQuota": 1000000000,
      "pretendToBeVisual": true,
      "virtualConsole": i11lIl
    },
        lI1iii = "";

    switch (iIiiii) {
      case "3.1":
        lI1iii = "<script>" + lIill1.readFileSync(__dirname + "/assets/h5_3_1_src.js", "utf-8") + "</script>";
        break;

      case "4.1":
        lI1iii = "<script>" + lIill1.readFileSync(__dirname + "/assets/h5_4_1_src.js", "utf-8") + "</script>";
        break;

      case "4.2":
        lI1iii = "<script>" + lIill1.readFileSync(__dirname + "/assets/h5_4_2_src.js", "utf-8") + "</script>";
        break;

      case "4.3":
        lI1iii = "<script>" + lIill1.readFileSync(__dirname + "/assets/h5_4_3_src.js", "utf-8") + "</script>";
        break;
    }

    const i11lIi = new l1lI1I("<body>\n    " + lI1iii + "\n</body>", l1lI11);

    do {
      await this._sleep(100);
    } while (!i11lIi.window.ParamsSign);

    switch (iIiiii) {
      case "3.1":
        this.domWindow3_1 = i11lIi.window;
        break;

      case "4.1":
        this.domWindow4_1 = i11lIi.window;
        break;

      case "4.2":
        this.domWindow4_2 = i11lIi.window;
        break;

      case "4.3":
        this.domWindow4_3 = i11lIi.window;
        break;
    }
  }

  async ["_signWaap"](iIiiiI, ilI11i, ilI11l) {
    const IIliil = new ilI11l.ParamsSign({
      "appId": iIiiiI,
      "preRequest": false,
      "debug": false,

      "onSign"({
        code: llli1i,
        message: iiI1l1,
        data: i11lI1
      }) {},

      "onRequestTokenRemotely"({
        code: liliiI,
        message: ilIIiI
      }) {},

      "onRequestToken"({
        code: lIl1ii,
        message: lIl1il
      }) {}

    });
    let ll1liI = {
      "appid": ilI11i.appid,
      "body": this._SHA256(JSON.stringify(ilI11i.body)).toString(),
      "client": ilI11i.client,
      "clientVersion": ilI11i.clientVersion,
      "functionId": ilI11i.functionId
    };

    if (ilI11i?.["t"]) {
      ll1liI.t = ilI11i.t;
    }

    let lI1iiI = await IIliil.sign(ll1liI);
    return (!lI1iiI?.["h5st"] || lI1iiI.h5st === "null") && (console.log("❌ getH5st 签名生成失败"), lI1iiI.h5st = ""), lI1iiI?.["h5st"] || "";
  }

  async ["getH5st"](iiI1lI) {
    let IIliiI = { ...iiI1lI,
      "h5st": "",
      "params": ""
    };

    try {
      if (!(typeof iiI1lI === "object" && iiI1lI !== null)) return console.log("❌ getH5st 传入参数有误"), IIliiI;else {
        const l1lII = ["appId", "appid", "body", "client", "clientVersion", "functionId"],
              lilI1l = l1lII.filter(l1liiI => !iiI1lI[l1liiI]);
        if (lilI1l.length > 0) return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + lilI1l.join(", ")), IIliiI;
      }

      switch (iiI1lI?.["version"]) {
        case "3.1":
        case "4.1":
        case "4.2":
        case "4.3":
          break;

        default:
          iiI1lI.version = "4.1";
          break;
      }

      const {
        appId: Ili1I1,
        appid: lI1I1i,
        body: liI1II,
        client: i1Iii1,
        clientVersion: l1liii,
        functionId: I1Ili1,
        version: l1liil
      } = iiI1lI,
            i1ll1 = Math.floor(Date.now() / 1000),
            lilI1I = "jdapp;iPhone;12.2.0;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + i1ll1 + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
            lI1I1l = iiI1lI?.["ua"] || lilI1I,
            Il1Il = "domWindow" + l1liil.replace(".", "_"),
            i1IiiI = Il1Il + "_UA";

      if (!this[Il1Il] || this[i1IiiI] && this[i1IiiI] !== lI1I1l) {
        await this._loadH5Sdk(l1liil, lI1I1l);
        this[i1IiiI] = lI1I1l;
      }

      if (iiI1lI?.["t"] && typeof iiI1lI.t === "boolean") {
        iiI1lI.t = Date.now();
        IIliiI.t = iiI1lI.t;
      } else iiI1lI.t = "";

      IIliiI.params = "functionId=" + I1Ili1 + "&body=" + encodeURIComponent(JSON.stringify(liI1II)) + (iiI1lI?.["t"] ? "&t=" + iiI1lI.t : "") + "&appid=" + lI1I1i + "&client=" + i1Iii1 + "&clientVersion=" + l1liii + "&h5st=";
      let lI1I1I = await this._signWaap(Ili1I1, iiI1lI, this[Il1Il]);
      return IIliiI.h5st = lI1I1I || "", IIliiI.params += lI1I1I || "", IIliiI;
    } catch (iIIli1) {
      console.log("❌ getH5st 遇到了错误 " + (iIIli1.message || iIIli1));
    }

    return IIliiI;
  }

  ["_SHA256"](i1Iiii) {
    var l1lili = 8,
        IIlI1l = 0;

    function lI1I11(Il11, iiil11) {
      var llII1I = (Il11 & 65535) + (iiil11 & 65535),
          ilI1II = (Il11 >> 16) + (iiil11 >> 16) + (llII1I >> 16);
      return ilI1II << 16 | llII1I & 65535;
    }

    function IilIl(i11l1, IlllI) {
      return i11l1 >>> IlllI | i11l1 << 32 - IlllI;
    }

    function IilIi(iliIl, ii1i11) {
      return iliIl >>> ii1i11;
    }

    function Ili1Il(liIlII, Il1I, iii1i) {
      return liIlII & Il1I ^ ~liIlII & iii1i;
    }

    function i1liI(iii1l, iliIi, iiil1I) {
      return iii1l & iliIi ^ iii1l & iiil1I ^ iliIi & iiil1I;
    }

    function iilIIi(llII11) {
      return IilIl(llII11, 2) ^ IilIl(llII11, 13) ^ IilIl(llII11, 22);
    }

    function I1iII(lIiI1) {
      return IilIl(lIiI1, 6) ^ IilIl(lIiI1, 11) ^ IilIl(lIiI1, 25);
    }

    function IIlI1i(IiIi1i) {
      return IilIl(IiIi1i, 7) ^ IilIl(IiIi1i, 18) ^ IilIi(IiIi1i, 3);
    }

    function iiiI1i(llII1l) {
      return IilIl(llII1l, 17) ^ IilIl(llII1l, 19) ^ IilIi(llII1l, 10);
    }

    function iiiI1l(iil11l, IiIi1l) {
      var llII1i = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
          illI1I = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
          ilI1Ii = new Array(64),
          ilI1Il,
          illI11,
          ll11Ii,
          ll11Il,
          i11lI,
          Illl1,
          iii1I,
          iliII,
          ii1i1I,
          liIlI1,
          iillIl,
          IiIi1I;
      iil11l[IiIi1l >> 5] |= 128 << 24 - IiIi1l % 32;
      iil11l[(IiIi1l + 64 >> 9 << 4) + 15] = IiIi1l;

      for (var ii1i1I = 0; ii1i1I < iil11l.length; ii1i1I += 16) {
        ilI1Il = illI1I[0];
        illI11 = illI1I[1];
        ll11Ii = illI1I[2];
        ll11Il = illI1I[3];
        i11lI = illI1I[4];
        Illl1 = illI1I[5];
        iii1I = illI1I[6];
        iliII = illI1I[7];

        for (var liIlI1 = 0; liIlI1 < 64; liIlI1++) {
          if (liIlI1 < 16) ilI1Ii[liIlI1] = iil11l[liIlI1 + ii1i1I];else ilI1Ii[liIlI1] = lI1I11(lI1I11(lI1I11(iiiI1i(ilI1Ii[liIlI1 - 2]), ilI1Ii[liIlI1 - 7]), IIlI1i(ilI1Ii[liIlI1 - 15])), ilI1Ii[liIlI1 - 16]);
          iillIl = lI1I11(lI1I11(lI1I11(lI1I11(iliII, I1iII(i11lI)), Ili1Il(i11lI, Illl1, iii1I)), llII1i[liIlI1]), ilI1Ii[liIlI1]);
          IiIi1I = lI1I11(iilIIi(ilI1Il), i1liI(ilI1Il, illI11, ll11Ii));
          iliII = iii1I;
          iii1I = Illl1;
          Illl1 = i11lI;
          i11lI = lI1I11(ll11Il, iillIl);
          ll11Il = ll11Ii;
          ll11Ii = illI11;
          illI11 = ilI1Il;
          ilI1Il = lI1I11(iillIl, IiIi1I);
        }

        illI1I[0] = lI1I11(ilI1Il, illI1I[0]);
        illI1I[1] = lI1I11(illI11, illI1I[1]);
        illI1I[2] = lI1I11(ll11Ii, illI1I[2]);
        illI1I[3] = lI1I11(ll11Il, illI1I[3]);
        illI1I[4] = lI1I11(i11lI, illI1I[4]);
        illI1I[5] = lI1I11(Illl1, illI1I[5]);
        illI1I[6] = lI1I11(iii1I, illI1I[6]);
        illI1I[7] = lI1I11(iliII, illI1I[7]);
      }

      return illI1I;
    }

    function Ili1Ii(i11iI) {
      var lIiII = Array(),
          l1lii1 = (1 << l1lili) - 1;

      for (var ii1i1i = 0; ii1i1i < i11iI.length * l1lili; ii1i1i += l1lili) {
        lIiII[ii1i1i >> 5] |= (i11iI.charCodeAt(ii1i1i / l1lili) & l1lii1) << 24 - ii1i1i % 32;
      }

      return lIiII;
    }

    function Ii1l1I(ii1i1l) {
      ii1i1l = ii1i1l.replace(/\r\n/g, "\n");
      var Illli = "";

      for (var i11il = 0; i11il < ii1i1l.length; i11il++) {
        var ilI1I1 = ii1i1l.charCodeAt(i11il);
        if (ilI1I1 < 128) Illli += String.fromCharCode(ilI1I1);else {
          if (ilI1I1 > 127 && ilI1I1 < 2048) {
            Illli += String.fromCharCode(ilI1I1 >> 6 | 192);
            Illli += String.fromCharCode(ilI1I1 & 63 | 128);
          } else Illli += String.fromCharCode(ilI1I1 >> 12 | 224), Illli += String.fromCharCode(ilI1I1 >> 6 & 63 | 128), Illli += String.fromCharCode(ilI1I1 & 63 | 128);
        }
      }

      return Illli;
    }

    function iilII1(ilIIli) {
      var ilIIll = IIlI1l ? "0123456789ABCDEF" : "0123456789abcdef",
          iIliil = "";

      for (var IIiill = 0; IIiill < ilIIli.length * 4; IIiill++) {
        iIliil += ilIIll.charAt(ilIIli[IIiill >> 2] >> (3 - IIiill % 4) * 8 + 4 & 15) + ilIIll.charAt(ilIIli[IIiill >> 2] >> (3 - IIiill % 4) * 8 & 15);
      }

      return iIliil;
    }

    return i1Iiii = Ii1l1I(i1Iiii), iilII1(iiiI1l(Ili1Ii(i1Iiii), i1Iiii.length * l1lili));
  }

}

module.exports = new ilIlII();