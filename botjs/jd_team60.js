/**
微定制瓜分京豆
感谢之前提供此脚本的作者，将就也还可以跑跑
变量含义：
activityId 活动id
activityUrl 活动url
pin 用户名
num 跑多少ck

如果查询活动剩余瓜分为0，请务必手动停止脚本。否则会一直运行，因为 需要重新跑的ck 会一直重复跑。

修改文件最下方： d2e7d12554aa4cbead58f5280ac5c9c2 是微定制的的代码 pt_pin 是你账号的值  60 是人数

配置文件或者环境变量中添加变量：## 微定制组队瓜分-jd_wdzgf.js
//export jd_wdz_activityId=""
//export jd_wdz_activityUrl="https://cjhydz-isv.isvjcloud.com"

指定PIN变量：（京东用户名）
//export jd_wdz_pin="pin值"

指定跑多少人变量：
//export jd_wdz_num="60"

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#微定制瓜分京豆
1 1 1 1 * jd_opencardL151.js, tag=微定制瓜分京豆, enabled=true
*/

function openCardActivity(OO0O0O0, QOOO00Q, QOOOOO0, OQO0O00) {
  return new Promise(O0O00OO => {
    const $$O$O$ = QOOO00Q.includes('cjhydz') ? 'cjhydz' : 'lzkjdz';
    const Q$O$$0 = new Env('微定制瓜分京豆');
    const Q0$0O$ = Q$O$$0.isNode() ? require('./sendNotify') : '';
    const Q$O$$$ = Q$O$$0.isNode() ? require('./jdCookie.js') : '';
    let $$O$O0 = [], $O$$0 = '', O$0$O$ = '', $00$OO = '', $00$OQ = '';
    if (process.env.jd_wdz_activityId) OO0O0O0 = process.env.jd_wdz_activityId;
    if (process.env.jd_wdz_activityUrl) QOOO00Q = process.env.jd_wdz_activityUrl;
    if (process.env.jd_wdz_pin) QOOOOO0 = process.env.jd_wdz_pin;
    if (process.env.jd_wdz_num) OQO0O00 = process.env.jd_wdz_num;
    Object.keys(Q$O$$$).forEach($0Q$O$ => $$O$O0.push(Q$O$$$[$0Q$O$]));
    if (QOOOOO0) {
      const O0OQ$ = $$O$O0.findIndex($00$Q0 => $00$Q0.includes(QOOOOO0));
      const $O$$Q = $$O$O0.splice(O0OQ$, 1);
      $$O$O0 = [...$O$$Q, ...$$O$O0.slice(0, OQO0O00)];
    }
    !(async () => {
      console.log('\n【如果显示：奖品与您擦肩而过了哟，可能是 此活动黑了！ 】\n【如果显示：Response code 493 ，可能是 变量不正确！ 】\n【还是显示：Response code 493 ，那么 此容器IP黑了！ 】\n');
      console.log('【当前活动入口】\nhttps://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index/8882761?activityId=' + OO0O0O0);
      if (!OO0O0O0) {
        Q$O$$0.msg(Q$O$$0.name, '', '活动id不存在');
        Q$O$$0.done();
        return;
      }
      if (!$$O$O0[0]) {
        Q$O$$0.msg(Q$O$$0.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', { 'open-url': 'https://bean.m.jd.com/' });
        return;
      }
      Q$O$$0.memberCount = 0;
      $00$OO += ('活动id:\n' + OO0O0O0 + '\n');
      Q$O$$0.toactivity = [];
      for (let Q$0$$ = 0; Q$0$$ < $$O$O0.length; Q$0$$++) {
        if ($$O$O0[Q$0$$]) {
          $O$$0 = $$O$O0[Q$0$$];
          Q$O$$0.UserName = decodeURIComponent($O$$0.match(/pt_pin=(.+?);/) && $O$$0.match(/pt_pin=(.+?);/)[1]);
          Q$O$$0.index = (Q$0$$ + 1);
          Q$O$$0.isLogin = true;
          Q$O$$0.nickName = '';
          console.log('\n******开始【京东账号' + Q$O$$0.index + '】' + Q$O$$0.nickName || Q$O$$0.UserName + '*********\n');
          await $00$O0();
          if (Q$O$$0.end) {
            break;
          } if (!Q$O$$0.toactivity || Q$O$$0.maxTeam) {
            break;
          }
        }
      }
      O0O00OO();
    })().catch(OOQ0Q$ => {
      Q$O$$0.log('', '❌ ' + Q$O$$0.name + ', 失败! 原因: ' + OOQ0Q$ + '!', '');
    }).finally(() => {
      Q$O$$0.done();
    });
    async function $00$O0() {
      QOQOO$();
      Q$O$$0.sid = '';
      Q$O$$0.userId = '599119';
      Q$O$$0.Token = '';
      Q$O$$0.Pin = '';
      Q$O$$0.hisPin = '';
      Q$O$$0.card = [];
      await Q0O$Q0();
      await O000$O();
      if (Q$O$$0.Token == '') {
        console.log('获取[token]失败！');
        return;
      }
      await Q$O$$0.wait(1000);
      await QQO$$$();
      if (Q$O$$0.userId) {
        await Q$O$$0.wait(1000);
        if (Q$O$$0.Token) await QQ$Q$0();
        if (!Q$O$$0.Pin) {
          console.log('获取[Pin]失败！');
          return;
        }
        await OQO$Q$();
        if ($$O$O$ !== 'cjhydz') {
          await Q$O$$0.wait(1000);
          await $$O$$Q();
        }
        await Q$O$$0.wait(1000);
        await OQQOO$();
        await Q$O$$0.wait(1000);
        await $0$$$Q();
        if (Q$O$$0.index === 1) {
          Q$O$$0.his = Q$O$$0.Pin;
          Q$O$$0.hisNickName = Q$O$$0.nickName;
          Q$O$$0.hisInviterImg = Q$O$$0.attrTouXiang;
        }
        await Q$O$$0.wait(1000);
        await Q$$Q$O();
        if (Q$O$$0.card.length > 0) {
          let QO0OO$ = 0;
          do {
            Q$O$$0.errorJoinShop = '';
            await Q0OOO$(Q$O$$0.card[QO0OO$]);
            if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
              console.log('第1次 重新开卡');
              await Q$O$$0.wait(1000);
              await Q0OOO$(Q$O$$0.card[QO0OO$]);
            }
            if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
              console.log('第2次 重新开卡');
              await Q$O$$0.wait(1000);
              await Q0OOO$(Q$O$$0.card[QO0OO$]);
            }
            if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
              console.log('第3次 重新开卡');
              await Q$O$$0.wait(1000);
              await Q0OOO$(Q$O$$0.card[QO0OO$]);
            }
            await Q$O$$0.wait(1000);
            QO0OO$++;
          } while (QO0OO$ < Q$O$$0.card.length);
        }
        await Q$O$$0.wait(1000);
        await $0$$$Q();
        if (Q$O$$0.maxTeam) {
          console.log('队伍已满员');
          return;
        }
      } else {
        console.log('【京东账号' + Q$O$$0.index + '】 未能获取活动信息');
        O$0$O$ += ('【京东账号' + Q$O$$0.index + '】 未能获取活动信息\n');
      }
    }
    function QOQOO$() {
      Q$O$$0.UA = 'jdapp;iPhone;10.0.10;14.3;' + Q0O$Q$(40) + ';network/wifi;model/iPhone12,1;addressid/4199175193;appBuild/167741;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
    }
    function QQO$$$() {
      return new Promise(O0O00OO => {
        let O$O0$$ = 'activityId=' + OO0O0O0;
        Q$O$$0.post(QO$0Q0('/customer/getSimpleActInfoVo', O$O0$$), async (QO0OQ$, $0OQQ$, O0O0O$) => {
          try {
            if (QO0OQ$) {
              console.log('' + Q$O$$0.toStr(QO0OQ$));
              console.log(Q$O$$0.name + ' getSimpleActInfoVo API请求失败，请检查网路重试');
            } else { }
          } catch ($0Q$QO) {
            Q$O$$0.logErr($0Q$QO, $0OQQ$);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function Q0O$Q$($0Q$QQ) {
      $0Q$QQ = ($0Q$QQ || 32);
      let $0OQOQ = 'abcdef0123456789', $QQ$$$ = $0OQOQ.length, $O$$$0 = '';
      for (i = 0; i < $0Q$QQ; i++)$O$$$0 += $0OQOQ.charAt(Math.floor(Math.random() * $QQ$$$));
      return $O$$$0;
    }
    function Q0O$Q0() {
      return new Promise(O0O00OO => {
        let Q$$0$$ = { 'url': (QOOO00Q + '/microDz/invite/activity/wx/view/index?activityId=' + OO0O0O0), 'headers': { 'Cookie': $O$$0, 'User-Agent': Q$O$$0.UA } };
        Q$O$$0.get(Q$$0$$, async (O$O00O, O0$O$0, O$O00$) => {
          try {
            if (O$O00O) {
              console.log('' + JSON.stringify(O$O00O));
              console.log(Q$O$$0.name + ' cookie API请求失败，请检查网路重试');
            } else {
              if (O0$O$0.status == 200) {
                QOOOQ$(O0$O$0);
              }
            }
          } catch (O0$$00) {
            Q$O$$0.logErr(O0$$00, O0$O$0);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function O000$O() {
      return new Promise(O0O00OO => {
        let OO$OOO = 'adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
        Q$O$$0.post(Q$QQO$('?functionId=isvObfuscator', OO$OOO), async ($O000O, OO$OOQ, O$OQOQ) => {
          try {
            if ($O000O) {
              console.log('' + JSON.stringify($O000O));
              console.log(Q$O$$0.name + ' 2 API请求失败，请检查网路重试');
            } else {
              if (Q$$O00(O$OQOQ)) {
                O$OQOQ = JSON.parse(O$OQOQ);
                if ((O$OQOQ.code == 0) && O$OQOQ.token) {
                  Q$O$$0.Token = O$OQOQ.token;
                } else {
                  console.log('异常2：' + JSON.stringify(O$OQOQ));
                }
              }
            }
          } catch (OOQ0O$) {
            Q$O$$0.logErr(OOQ0O$, OO$OOQ);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function QQ$Q$0() {
      return new Promise(O0O00OO => {
        let O$0$OO = ('userId=' + Q$O$$0.userId + '&token=' + Q$O$$0.Token + '&fromType=APP');
        Q$O$$0.post(QO$0Q0('/customer/getMyPing', O$0$OO), async (O$0$OQ, $O$O0O, $OQQO$) => {
          try {
            if (O$0$OQ) {
              console.log('' + JSON.stringify(O$0$OQ));
              console.log(Q$O$$0.name + ' 3 API请求失败，请检查网路重试');
            } else {
              if ($O$O0O.status == 200) {
                QOOOQ$($O$O0O);
              }
              if (Q$$O00($OQQO$)) {
                $OQQO$ = JSON.parse($OQQO$);
                if ($OQQO$.result && $OQQO$.data) {
                  Q$O$$0.Pin = $OQQO$.data.secretPin;
                  Q$O$$0.AUTH_C_USER = Q$O$$0.Pin;
                } else {
                  console.log('异常3：' + JSON.stringify($OQQO$));
                }
              }
            }
          } catch ($O0QO0) {
            Q$O$$0.logErr($O0QO0, $O$O0O);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function Q0OOO$(Q$Q0) {
      return new Promise(async O0O00OO => {
        Q$O$$0.joinVenderId = Q$Q0.match(/venderId=(\d+)/)[1];
        let O$0OQO = '{\n			  "venderId":"' + Q$O$$0.joinVenderId + '",\n			  "shopId":"' + Q$O$$0.joinVenderId + '",\n			  "bindByVerifyCodeFlag":1,\n			  "registerExtend":{},\n			  "writeChildFlag":0,\n			  "channel":401\n			  }';
        Q$O$$0.errorJoinShop = '';
        await Q$$QQ0();
        let OO0O0O0 = '';
        let $$$00Q = await $QQO0O();
        const Q$OO$Q = { 'url': 'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=' + O$0OQO + '&clientVersion=9.2.0&client=H5&uuid=88888&h5st=' + $$$00Q, 'headers': { 'Content-Type': 'text/plain; Charset=UTF-8', 'Origin': 'https://api.m.jd.com', 'Host': 'api.m.jd.com', 'accept': '*/*', 'User-Agent': Q$O$$0.UA, 'content-type': 'application/x-www-form-urlencoded', 'Cookie': $O$$0 } };
        Q$O$$0.get(Q$OO$Q, async (QO0$OO, QO0$OQ, OQQ$0O) => {
          try {
            let OO$$OO = Q$O$$0.toObj(OQQ$0O, OQQ$0O);
            if (typeof OO$$OO == 'object') {
              if (OO$$OO.success === true) {
                console.log(OO$$OO.message);
                Q$O$$0.errorJoinShop = OO$$OO.message;
                if (OO$$OO.result && OO$$OO.result.giftInfo) {
                  for (let OO$$OQ of OO$$OO.result.giftInfo.giftList) {
                    console.log('入会获得:' + OO$$OQ.discountString + OO$$OQ.prizeName + OO$$OQ.secondLineDesc);
                  }
                }
              } else if ((typeof OO$$OO == 'object') && OO$$OO.message) {
                Q$O$$0.errorJoinShop = OO$$OO.message;
                console.log('' + (OO$$OO.message || ''));
              } else {
                console.log(OQQ$0O);
              }
            } else {
              console.log(OQQ$0O);
            }
          } catch (Q$$QQ$) {
            Q$O$$0.logErr(Q$$QQ$, QO0$OQ);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function Q$$QQ0() {
      return new Promise(O0O00OO => {
        const O0$$$0 = { 'url': 'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22' + Q$O$$0.joinVenderId + '%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888', 'headers': { 'Content-Type': 'text/plain; Charset=UTF-8', 'Origin': 'https://api.m.jd.com', 'Host': 'api.m.jd.com', 'accept': '*/*', 'User-Agent': Q$O$$0.UA, 'content-type': 'application/x-www-form-urlencoded', 'Cookie': $O$$0 } };
        Q$O$$0.get(O0$$$0, async ($QOOO$, Q$$QO$, Q$00$) => {
          try {
            let $QOOOO = Q$O$$0.toObj(Q$00$, Q$00$);
            if (typeof $QOOOO == 'object') {
              if ($QOOOO.success == true) {
                console.log('入会:' + ($QOOOO.result.shopMemberCardInfo.venderCardName || ''));
              }
            } else {
              console.log(Q$00$);
            }
          } catch ($QOOOQ) {
            Q$O$$0.logErr($QOOOQ, Q$$QO$);
          }
          finally {
            O0O00OO();
          }
        });
      });
    }
    function generateFp() {
      let _0x12ac7e = '0123456789';
      let _0x109ede = 13;
      let _0xee57cd = '';
      for (; _0x109ede--;)_0xee57cd += _0x12ac7e[Math.random() * _0x12ac7e.length | 0x0];
      return (_0xee57cd + Date.now()).slice(0, 16);
    }
    function geth5st() {
      let _0x5b102d = Date.now();
      let _0x4617c8 = generateFp();
      let _0x14cd4a = new Date(_0x5b102d).Format('yyyyMMddhhmmssSSS');
      let _0x20a237 = [';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;', ';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
      let _0xb1ba92 = _0x20a237[random(0, _0x20a237.length)];
      return encodeURIComponent((_0x14cd4a + ';' + _0x4617c8 + _0xb1ba92) + Date.now());
    }
    Date.prototype.Format = function (_0x47fb06) {
      var _0x506f28, _0x3343c4 = this, _0x23e2fb = _0x47fb06, _0x403bf9 = { 'M+': _0x3343c4.getMonth() + 1, 'd+': _0x3343c4.getDate(), 'D+': _0x3343c4.getDate(), 'h+': _0x3343c4.getHours(), 'H+': _0x3343c4.getHours(), 'm+': _0x3343c4.getMinutes(), 's+': _0x3343c4.getSeconds(), 'w+': _0x3343c4.getDay(), 'q+': Math.floor((_0x3343c4.getMonth() + 3) / 3), 'S+': _0x3343c4.getMilliseconds() };
      /(y+)/i.test(_0x23e2fb) && (_0x23e2fb = _0x23e2fb.replace(RegExp.$1, ''.concat(_0x3343c4.getFullYear()).substr(4 - RegExp.$1.length)));
      for (var _0x2cee3b in _0x403bf9) {
        if (new RegExp('('.concat(_0x2cee3b, ')')).test(_0x23e2fb)) {
          var _0x58bbf0, _0xb845f2 = ('S+' === _0x2cee3b) ? '000' : '00';
          _0x23e2fb = _0x23e2fb.replace(RegExp.$1, 1 == RegExp.$1.length ? _0x403bf9[_0x2cee3b] : (''.concat(_0xb845f2) + _0x403bf9[_0x2cee3b]).substr(''.concat(_0x403bf9[_0x2cee3b]).length));
        }
      }
      return _0x23e2fb;
    };
    function random(_0x27fdb8, _0x2fb8ca) {
      return Math.floor(Math.random() * (_0x2fb8ca - _0x27fdb8)) + _0x27fdb8;
    };
    function $$O$$Q() {
      return new Promise(O0O00OO => {
        let QOQ$$O = { 'url': 'https://lzkjdz-isv.isvjd.com/wxCommonInfo/getActMemberInfo', 'headers': { 'cookie': ($00$OQ + ';IsvToken=' + Q$O$$0.Token + ';AUTH_C_USER=' + Q$O$$0.Pin), 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'Origin': 'https://lzkj-isv.isvjd.com', 'User-Agent': Q$O$$0.UA, 'Accept-Language': 'zh-cn', 'Host': 'lzkjdz-isv.isvjd.com', 'Referer': 'https://lzkjdz-isv.isvjd.com/wxTeam/activity2/' + OO0O0O0 + '?activityId=' + OO0O0O0 + '&adsource=cjhdc&isOpenCardBack=iocb', 'Accept': 'application/json, text/javascript, */*; q=0.01' }, 'body': 'venderId=' + Q$O$$0.userId + '&activityId=' + OO0O0O0 + '&pin=' + encodeURIComponent(Q$O$$0.Pin) };
        Q$O$$0.post(QOQ$$O, async ($$0$Q, OO$Q0O, $$0$O) => {
          try {
            if ($$0$Q) {
              console.log('' + JSON.stringify($$0$Q));
              console.log(Q$O$$0.name + ' 1 API请求失败，请检查网路重试');
            } else {
              if ($$0$O && Q$$O00($$0$O)) {
                $$0$O = JSON.parse($$0$O);
                if ($$0$O.data) {
                  if ($$0$O.data.openCard) return;
                  if ($$0$O.data.openCardUrl) {
                    Q$O$$0.channel = $$0$O.data.openCardUrl.match(/channel=\d+/)[0].split('=')[1];
                  } else {
                    console.log('店家不返回开卡地址。活动有问题。。');
                    Q$O$$0.end = true;
                    return;
                  }
                } else {
                  console.log('异常1：' + JSON.stringify($$0$O));
                }
              }
            }
          } catch (O$O0Q0) {
            Q$O$$0.logErr(O$O0Q0, OO$Q0O);
          }
          finally {
            O0O00OO();
          }
        });
      });
    } function OQQOO$() {
      return new Promise(O0O00OO => {
        let OO0$$ = 'pin=' + (($$O$O$ === 'cjhydz') ? encodeURIComponent(encodeURIComponent(Q$O$$0.Pin)) : encodeURIComponent(Q$O$$0.Pin));
        Q$O$$0.post(QO$0Q0('/wxActionCommon/getUserInfo', OO0$$), async ($OO$0, $OQ0Q$, $O00Q$) => {
          try {
            if ($OO$0) {
              console.log('' + JSON.stringify($OO$0));
              console.log(Q$O$$0.name + ' 6-1 API请求失败，请检查网路重试');
            } else {
              if (Q$$O00($O00Q$)) {
                $O00Q$ = JSON.parse($O00Q$);
                if ($O00Q$.result && $O00Q$.data) {
                  Q$O$$0.attrTouXiang = $O00Q$.data.yunMidImageUrl ? $O00Q$.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
                  Q$O$$0.nickName = $O00Q$.data.nickname;
                } else {
                  console.log('异常6-2：' + JSON.stringify($O00Q$));
                }
              }
            }
          } catch ($O$OQ0) {
            Q$O$$0.logErr($O$OQ0, $OQ0Q$);
          }
          finally {
            O0O00OO();
          }
        });
      });
    } function Q$$Q$O($O$OQ$ = 0) {
      return new Promise(O0O00OO => {
        let QOOOOO0 = encodeURIComponent(Q$O$$0.Pin);
        let $$QOQ = encodeURIComponent(encodeURIComponent(Q$O$$0.his));
        if ($O$OQ$ == 1) {
          QOOOOO0 = encodeURIComponent(encodeURIComponent(Q$O$$0.Pin));
        }
        let $QQO$O = 'activityId=' + OO0O0O0 + '&inviterNick=' + encodeURIComponent(Q$O$$0.hisNickName) + '&inviteeNick=' + encodeURIComponent(Q$O$$0.nickName) + '&inviter=' + $$QOQ + '&invitee=' + QOOOOO0 + '&inviterImg=' + encodeURIComponent(Q$O$$0.hisInviterImg) + '&inviteeImg=' + encodeURIComponent(Q$O$$0.attrTouXiang);
        Q$O$$0.post(QO$0Q0('/microDz/invite/activity/wx/acceptInvite', $QQO$O), async (QQ$OO$, O$QQ0O, $QOQ00) => {
          try {
            if (QQ$OO$) {
              console.log('' + JSON.stringify(QQ$OO$));
              console.log(Q$O$$0.name + ' 7 API请求失败，请检查网路重试');
            } else {
              if (Q$$O00($QOQ00)) {
                $QOQ00 = JSON.parse($QOQ00);
                if ($QOQ00.result && $QOQ00.data) {
                  O$0$O$ += ('【京东账号' + Q$O$$0.index + '】 加入队伍\n');
                  Q$O$$0.log('加入队伍成功');
                } else {
                  if (($QOQ00.errorMessage.indexOf('店铺会员') > -1) && ($O$OQ$ != 3)) {
                    Q$O$$0.errorJoinShop = '';
                    await Q0OOO$();
                    if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
                      console.log('第1次 重新开卡');
                      await Q$O$$0.wait(1000);
                      await Q0OOO$();
                    }
                    if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
                      console.log('第2次 重新开卡');
                      await Q$O$$0.wait(1000);
                      await Q0OOO$();
                    }
                    if (Q$O$$0.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1) {
                      console.log('第3次 重新开卡');
                      await Q$O$$0.wait(1000);
                      await Q0OOO$();
                    }
                    await Q$$Q$O(3);
                  } else if ($QOQ00.errorMessage.indexOf('队伍已经满员') > -1) {
                    Q$O$$0.maxTeam = true;
                  } else if (($QOQ00.errorMessage.indexOf('奖品与您擦肩而过') > -1) && ($O$OQ$ == 0)) {
                    await Q$$Q$O(1);
                  } else {
                    console.log('异常7：' + JSON.stringify($QOQ00));
                    if ($QOQ00.errorMessage.includes('奖品发送完毕')) process.exit(1);
                    O$0$O$ += ('【京东账号' + Q$O$$0.index + '】 ' + $QOQ00.errorMessage + '\n');
                  }
                }
              }
            }
          } catch (OOQO$) {
            Q$O$$0.logErr(OOQO$, O$QQ0O);
          }
          finally {
            O0O00OO();
          }
        });
      });
    } function $0$$$Q() {
      return new Promise(O0O00OO => {
        let O0$OQ = { 'url': 'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/getOpenCardAllStatuesNew', 'headers': { 'cookie': ($00$OQ + ';IsvToken=' + Q$O$$0.Token + ';AUTH_C_USER=' + Q$O$$0.Pin), 'Connection': 'keep-alive', 'Accept-Encoding': 'gzip, deflate, br', 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8', 'User-Agent': Q$O$$0.UA, 'Accept-Language': 'zh-cn', 'Referer': 'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index?activityId=' + OO0O0O0, 'Accept': 'application/json, text/javascript, */*; q=0.01' }, 'body': 'isInvited=1&activityId=' + OO0O0O0 + '&pin=' + encodeURIComponent(encodeURIComponent(Q$O$$0.Pin)) };
        Q$O$$0.post(O0$OQ, async (O0$OO, O$0Q0O, O$0Q0Q) => {
          try {
            if (O0$OO) {
              console.log('' + JSON.stringify(O0$OO));
              console.log(Q$O$$0.name + ' 1 API请求失败，请检查网路重试');
            } else {
              if (O$0Q0Q && Q$$O00(O$0Q0Q)) {
                O$0Q0Q = JSON.parse(O$0Q0Q);
                if (O$0Q0Q.data && O$0Q0Q.data.isCanJoin) {
                  (O$0Q0Q.data.list || []).forEach(O$0Q0$ => {
                    if (O$0Q0$.openCardLink) {
                      Q$O$$0.card.push(O$0Q0$.openCardLink);
                    }
                  });
                }
              }
            }
          } catch (QOOOO$) {
            Q$O$$0.logErr(QOOOO$, O$0Q0O);
          }
          finally {
            O0O00OO();
          }
        });
      });
    } function QO$0Q0(Q$0QQ$, Q$QQO0) {
      return { 'url': ('' + QOOO00Q + Q$0QQ$), 'body': Q$QQO0, 'headers': { 'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'zh-cn', 'Connection': 'keep-alive', 'Host': $$O$O$ + '-isv.isvjcloud.com', 'Origin': 'https://' + $$O$O$ + '-isv.isvjcloud.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': (QOOO00Q + '/microDz/invite/activity/wx/view/index?activityId=' + OO0O0O0), 'Cookie': ($O$$0 + $00$OQ + ';IsvToken=' + Q$O$$0.Token + ';AUTH_C_USER=' + Q$O$$0.AUTH_C_USER), 'User-Agent': Q$O$$0.UA } };
    } function Q$QQO$(O0QO$, Q$$O0$) {
      return { 'url': ('https://api.m.jd.com/client.action' + O0QO$), 'body': Q$$O0$, 'headers': { 'Accept': '*/*', 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'zh-cn', 'Connection': 'keep-alive', 'Content-Type': 'application/x-www-form-urlencoded', 'Host': 'api.m.jd.com', 'Cookie': $O$$0, 'User-Agent': Q$O$$0.UA } };
    } function Q$$O00(OQO$QO) {
      try {
        if (typeof JSON.parse(OQO$QO) == 'object') {
          return true;
        }
      } catch (O00O0$) {
        console.log(O00O0$);
        console.log('京东服务器访问数据为空，请检查自身设备网络情况');
        return false;
      }
    } function OQO$Q$() {
      return new Promise(async O0O00OO => {
        const Q$0000 = { 'url': 'https://' + $$O$O$ + '-isv.isvjcloud.com/common/accessLog', 'headers': { 'Accept': 'application/json', 'Accept-Encoding': 'gzip, deflate, br', 'Accept-Language': 'zh-cn', 'Connection': 'keep-alive', 'Host': $$O$O$ + '-isv.isvjcloud.com', 'Origin': 'https://' + $$O$O$ + '-isv.isvjcloud.com', 'Content-Type': 'application/x-www-form-urlencoded', 'Referer': (QOOO00Q + '/microDz/invite/activity/wx/view/index?activityId=' + OO0O0O0), 'Cookie': ($O$$0 + $00$OQ + ';IsvToken=' + Q$O$$0.Token + ';AUTH_C_USER=' + Q$O$$0.AUTH_C_USER), 'User-Agent': Q$O$$0.UA }, 'body': 'venderId=1&code=99&pin=' + encodeURIComponent(encodeURIComponent(Q$O$$0.Pin)) + '&activityId=' + OO0O0O0 + '&pageUrl=https%3A%2F%2F' + $$O$O$ + '-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D' + OO0O0O0 + '&subType=app' };
        Q$O$$0.post(Q$0000, (Q$$O0Q, Q$0QQQ, OQO$Q0) => {
          try {
            if (Q$$O0Q) {
              console.log('' + JSON.stringify(Q$$O0Q));
              console.log(Q$O$$0.name + ' API请求失败，请检查网路重试');
            } else { }
          } catch (QO$0Q$) {
            Q$O$$0.logErr(QO$0Q$, Q$0QQQ);
          }
          finally {
            O0O00OO();
          }
        });
      });
    } function QOOOQ$(O0QO0$) {
      let QQQ00$ = O0QO0$ && O0QO0$.headers && (O0QO0$.headers['set-cookie'] || O0QO0$.headers['Set-Cookie'] || '') || '';
      if (QQQ00$) {
        $00$OQ = QQQ00$.map(Q0$Q$$ => {
          return Q0$Q$$.split(';')[0];
        }).join(';');
      }
    }
  });
}
function getUA() {
  $.UA = 'jdapp;iPhone;10.2.2;14.3;' + randomString(40) + ';M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function randomString(QQ$O00) {
  QQ$O00 = (QQ$O00 || 32);
  let Q$QQQ0 = 'abcdef0123456789', O$O00 = Q$QQQ0.length, QQ000$ = '';
  for (i = 0; i < QQ$O00; i++)QQ000$ += Q$QQQ0.charAt(Math.floor(Math.random() * O$O00));
  return QQ000$;
}
function safeGet(O0QQ$) {
  try {
    if (typeof JSON.parse(O0QQ$) == 'object') {
      return true;
    }
  } catch ($QQOQO) {
    console.log($QQOQO);
    console.log('京东服务器访问数据为空，请检查自身设备网络情况');
    return false;
  }
}
function jsonParse($QQOQQ) {
  if (typeof $QQOQQ == 'string') {
    try {
      return JSON.parse($QQOQQ);
    } catch ($0$O$0) {
      console.log($0$O$0);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
      return [];
    }
  }
};

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


(async () => {
  await openCardActivity(
    "d2e7d12554aa4cbead58f5280ac5c9c2",
    "https://cjhydz-isv.isvjcloud.com",
    "pt_pin",
    90,
    []
  );
  console.log("开卡已完成！");
})();

// module.exports = { joinTeam }
