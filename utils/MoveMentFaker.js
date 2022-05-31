const https = require('https');
const fs = require('fs/promises');
const { R_OK } = require('fs').constants;
const vm = require('vm');
const UA = require('../USER_AGENTS.js').USER_AGENT;

const URL = 'https://wbbny.m.jd.com/babelDiy/Zeus/2fUope8TDN3dUJfNzQswkBLc7uE8/index.html';
// const REG_MODULE = /(\d+)\:function\(.*(?=smashUtils\.get_risk_result)/gm;
const SYNTAX_MODULE = '!function(n){var r={};function o(e){if(r[e])';
// const REG_SCRIPT = /<script type="text\/javascript" src="([^><]+\/(app\.\w+\.js))\">/gm;
const REG_SCRIPT = "https://storage.360buyimg.com/babel/01226981/3536473/production/dev/index.6560e51e0868c9e0078a.js"
const REG_ENTRY = /(__webpack_require__\(__webpack_require__\.s=)(\d+)(?=\)})/;
const needModuleId = 356
const DATA = {appid:'50074',sceneid:'RAhomePageh5'};
let smashUtils;

class MoveMentFaker {
  constructor(cookie) {
    // this.secretp = secretp;
    this.cookie = cookie;
  }

  async run() {
    if (!smashUtils) {
      console.log(111);
      await this.init();
    }

    var t = Math.floor(1e7 + 9e7 * Math.random()).toString();
    var e = smashUtils.get_risk_result({
      id: t,
      data: {
        random: t
      }
    }).log;
    var o = JSON.stringify({
      extraData: {
        log: e || -1,
          // log: encodeURIComponent(e),
          sceneid: DATA.sceneid,
      },
      // secretp: this.secretp,
      random: t
    })

    // console.log(o);
    return o;
  }

  async init() {
    try {
      process.chdir(__dirname);
      const jsContent = await this.getJSContent(path.basename(SCRIPT_URL), SCRIPT_URL);
      const fnMock = new Function;
      const ctx = {
        window: { addEventListener: fnMock },
        document: {
          addEventListener: fnMock,
          removeEventListener: fnMock,
          cookie: this.cookie
        },
        navigator: { userAgent: UA }
      };

      vm.createContext(ctx);
      vm.runInContext(jsContent, ctx);
      smashUtils = ctx.window.smashUtils;
      smashUtils.init();

    } catch (e) {
      console.log(e)
    }
  }
  async getJSContent(cacheKey, url) {
    try {
      await fs.access(cacheKey, R_OK);
      const rawFile = await fs.readFile(cacheKey, { encoding: 'utf8' });
      return rawFile;
    } catch (e) {
      let jsContent = await MoveMentFaker.httpGet(url);
      let matchResult = jsContent;
      if (matchResult && matchResult.length != 0) {
        jsContent = matchResult[3];
      }
      fs.writeFile(cacheKey, jsContent);
      return jsContent;
    }
  }

  static httpGet(url) {
    return new Promise((resolve, reject) => {
      const protocol = url.indexOf('http') !== 0 ? 'https:' : '';
      const req = https.get(protocol + url, (res) => {
        res.setEncoding('utf-8');

        let rawData = '';

        res.on('error', reject);
        res.on('data', chunk => rawData += chunk);
        res.on('end', () => resolve(rawData));
      });

      req.on('error', reject);
      req.end();
    });
  }
}

async function getBody($) {
  const zf = new MoveMentFaker($.cookie);
  // const zf = new MoveMentFaker($.secretp, $.cookie);
  const ss = await zf.run();

  return ss;
}

MoveMentFaker.getBody = getBody;
module.exports = MoveMentFaker;
