/**
微定制瓜分京豆
感谢之前提供此脚本的作者，将就也还可以跑跑
变量含义：
activityId 活动id
activityUrl 活动url
pin 用户名
num 跑多少ck
againUserIndex 需要重新跑的ck

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

function openCardActivity(activityId, activityUrl, pin, num, againUserIndex) {
  return new Promise((resolve) => {
	const prefix = activityUrl.includes("cjhydz") ? "cjhydz" : "lzkjdz";
    const $ = new Env("微定制瓜分京豆");
    const notify = $.isNode() ? require("./sendNotify") : "";
    const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
    let cookiesArr = [],
      cookie = "",
      message = "",
      messageTitle = "",
      activityCookie = "";

    if (process.env.jd_wdz_activityId)
      activityId = process.env.jd_wdz_activityId;
    if (process.env.jd_wdz_activityUrl)
      activityUrl = process.env.jd_wdz_activityUrl;
    if (process.env.jd_wdz_pin)
      pin = process.env.jd_wdz_pin;
    if (process.env.jd_wdz_num)
      num = process.env.jd_wdz_num;
    Object.keys(jdCookieNode).forEach((item) =>
      cookiesArr.push(jdCookieNode[item])
    );

    if(pin) {
      const idx = cookiesArr.findIndex((v) => v.includes(pin));
      const currentCookie = cookiesArr.splice(idx, 1);
      cookiesArr = [...currentCookie, ...cookiesArr.slice(1, num)];
    }


    if (againUserIndex.length > 0) {
      cookiesArr = cookiesArr.filter((v, idx) => againUserIndex.includes(idx));
    }

    !(async () => {
	console.log("\n【如果显示：奖品与您擦肩而过了哟，可能是 此活动黑了！ 】\n【如果显示：Response code 493 ，可能是 变量不正确！ 】\n【还是显示：Response code 493 ，那么 此容器IP黑了！ 】\n");
      if (!activityId) {
        $.msg($.name, "", "活动id不存在");
        $.done();
        return;
      }
      if (!cookiesArr[0]) {
        $.msg(
          $.name,
          "【提示】请先获取京东账号一cookie\x0a直接使用NobyDa的京东签到获取",
          "https://bean.m.jd.com/",
          {
            "open-url": "https://bean.m.jd.com/",
          }
        );
        return;
      }
      $.memberCount = 0;
      messageTitle += "活动id:\n" + activityId + "\n";
      $.toactivity = [];
      for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
          cookie = cookiesArr[i];
          $.UserName = decodeURIComponent(
            cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]
          );
          $.index = i + 1;
          $.isLogin = true;
          $.nickName = "";

          console.log(
            "\n******开始【京东账号" +
              $.index +
              "】" +
              ($.nickName || $.UserName) +
              "*********\n"
          );
          await jrzd();
          if ($.end) {
            break;
          }
          if (!$.toactivity || $.maxTeam) {
            break;
          }
        }
      }
      if (againUserIndex.length > 0) {
        console.log(
          `${againUserIndex.join("、")} 用户需要重新跑！即将开始重新跑~`
        );
        await openCardActivity(
          activityId,
          activityUrl,
          pin,
          num,
          againUserIndex
        );
      }
      resolve();
    })()
      .catch((e) => {
        $.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
      })
      .finally(() => {
        $.done();
      });

    async function jrzd() {
      getUA();
      $.sid = "";
      $.userId = "599119";
      $.Token = "";
      $.Pin = "";
      $.hisPin = "";
      $.card = [];

      await getCk();
      await getToken();
      if ($.Token == "") {
        console.log("获取[token]失败！");
        return;
      }
      await $.wait(1000);
      await getSimpleActInfoVo();
      if ($.userId) {
        await $.wait(1000);
        if ($.Token) await getPin();
        console.log("pin:" + $.Pin);
        await accessLog();
        if (prefix !== "cjhydz") {
          await $.wait(1000);
          await getActMemberInfo();
        }
        await $.wait(1000);
        await getUserInfo();
        await $.wait(1000);
        await getOpenCardAllStatuesNew();

        if ($.index === 1) {
          $.his = $.Pin;
          $.hisNickName = $.nickName;
          $.hisInviterImg = $.attrTouXiang;
        }

        await $.wait(1000);
        await joinTeam();

        if ($.card.length > 0) {
          let i = 0;
          do {
			$.errorJoinShop = '';
            await joinShop($.card[i]);
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
				console.log('第1次 重新开卡')
				await $.wait(1000)
				await joinShop($.card[i]);
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
				console.log('第2次 重新开卡')
				await $.wait(1000)
				await joinShop($.card[i]);
			}
			if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
				console.log('第3次 重新开卡')
				await $.wait(1000)
				await joinShop($.card[i]);
			}
            await $.wait(1000);
            i++;
          } while (i < $.card.length);
        }
        await $.wait(1000);
        await getOpenCardAllStatuesNew();
        if ($.maxTeam) {
          console.log("队伍已满员");
          return;
        }
      } else {
        console.log("【京东账号" + $.index + "】 未能获取活动信息");
        message += "【京东账号" + $.index + "】 未能获取活动信息\n";
      }
    }

    function getUA() {
      $.UA = `jdapp;iPhone;10.0.10;14.3;${randomString(
        40
      )};network/wifi;model/iPhone12,1;addressid/4199175193;appBuild/167741;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1`;
    }

    function getSimpleActInfoVo() {
      return new Promise((resolve) => {
        let body = `activityId=${activityId}`;
        $.post(
          taskPostUrl("/customer/getSimpleActInfoVo", body),
          async (err, resp, data) => {
            try {
              if (err) {
                console.log(`${$.toStr(err)}`);
                console.log(
                  `${$.name} getSimpleActInfoVo API请求失败，请检查网路重试`
                );
              } else {
                if (resp.status == 200) {
                  refreshToken(resp);
                }
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve();
            }
          }
        );
      });
    }

    function randomString(e) {
      e = e || 32;
      let t = "abcdef0123456789",
        a = t.length,
        n = "";
      for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
      return n;
    }

    function getCk() {
      return new Promise((resolve) => {
        let options = {
          url:
            activityUrl +
            "/microDz/invite/activity/wx/view/index?activityId=" +
            activityId,
          headers: {
            Cookie: cookie,
            "User-Agent": $.UA,
          },
        };
        $.get(options, async (err, resp, data) => {
          try {
            if (err) {
              console.log("" + JSON.stringify(err));
              console.log($.name + " cookie API请求失败，请检查网路重试");
            } else {
              if (resp.status == 200) {
                refreshToken(resp);
              }
            }
          } catch (e) {
            $.logErr(e, resp);
          } finally {
            resolve();
          }
        });
      });
    }

    function getToken() {
      return new Promise((resolve) => {
        let body = `adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2`;
        $.post(
          taskUrl("?functionId=isvObfuscator", body),
          async (err, resp, data) => {
            try {
              if (err) {
                console.log("" + JSON.stringify(err));
                console.log($.name + " 2 API请求失败，请检查网路重试");
              } else {
                if (safeGet(data)) {
                  data = JSON.parse(data);
                  if (data.code == 0 && data.token) {
                    $.Token = data.token;
                  } else {
                    console.log("异常2：" + JSON.stringify(data));
                  }
                }
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve();
            }
          }
        );
      });
    }

    function getPin() {
      return new Promise((resolve) => {
        let body = "userId=" + $.userId + "&token=" + $.Token + "&fromType=APP";
        $.post(
          taskPostUrl("/customer/getMyPing", body),
          async (err, resp, data) => {
            try {
              if (err) {
                console.log("" + JSON.stringify(err));
                console.log($.name + " 3 API请求失败，请检查网路重试");
              } else {
                if (safeGet(data)) {
                  data = JSON.parse(data);
                  if (data.result && data.data) {
                    $.Pin = data.data.secretPin;
                    $.AUTH_C_USER = $.Pin;
                  } else {
                    console.log("异常3：" + JSON.stringify(data));
                  }
                }
              }
            } catch (e) {
              $.logErr(e, resp);
            } finally {
              resolve();
            }
          }
        );
      });
    }

function joinShop(openCardLink) {
  return new Promise(async resolve => {
          $.joinVenderId = openCardLink.match(/venderId=(\d+)/)[1];
		  let body = `{
			  "venderId":"${$.joinVenderId}",
			  "shopId":"${$.joinVenderId}",
			  "bindByVerifyCodeFlag":1,
			  "registerExtend":{},
			  "writeChildFlag":0,
			  "channel":401
			  }`
	$.errorJoinShop = '';
    await $.wait(1000)
    await getshopactivityId()
    let activityId = ``
    //let h5st = "20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157"
    let h5st = await geth5st()
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=${body}&clientVersion=9.2.0&client=H5&uuid=88888&h5st=${h5st}`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        let res = $.toObj(data,data);
        if(typeof res == 'object'){
          if(res.success === true){
            console.log(res.message)
            $.errorJoinShop = res.message
            if(res.result && res.result.giftInfo){
              for(let i of res.result.giftInfo.giftList){
                console.log(`入会获得:${i.discountString}${i.prizeName}${i.secondLineDesc}`)
              }
            }
          }else if(typeof res == 'object' && res.message){
            $.errorJoinShop = res.message
            console.log(`${res.message || ''}`)
          }else{
            console.log(data)
          }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}
function getshopactivityId() {
  return new Promise(resolve => {
    const options = {
      url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22${$.joinVenderId}%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888`,
      headers: {
        'Content-Type': 'text/plain; Charset=UTF-8',
        'Origin': 'https://api.m.jd.com',
        'Host': 'api.m.jd.com',
        'accept': '*/*',
        'User-Agent': $.UA,
        'content-type': 'application/x-www-form-urlencoded',
        'Cookie': cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        let res = $.toObj(data,data);
        if(typeof res == 'object'){
          if(res.success == true){
            console.log(`入会:${res.result.shopMemberCardInfo.venderCardName || ''}`)
           }
        }else{
          console.log(data)
        }
      } catch (e) {
        $.logErr(e, resp)
      } finally {
        resolve();
      }
    })
  })
}

function generateFp(){
	let _0x29b403='0123456789';
	let _0xb1ece4=13;
	let _0x17b84a='';
	for(;_0xb1ece4--;)_0x17b84a+=_0x29b403[Math.random()*_0x29b403.length|0x0];
	return (_0x17b84a+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x2beee2=Date.now();
	let _0x1b782c=generateFp();
	let _0x14e516=new Date(_0x2beee2).Format('yyyyMMddhhmmssSSS');
	let _0x49d9e2=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0x5ee515=_0x49d9e2[random(0,_0x49d9e2.length)];
	return encodeURIComponent((_0x14e516+';')+_0x1b782c+_0x5ee515+Date.now());
}
Date.prototype.Format=function(_0x1ec4bb){
	var _0x2273ef,_0x25ac60=this,_0x334d9c=_0x1ec4bb,_0x3fc1ee={'M+':_0x25ac60.getMonth()+1,'d+':_0x25ac60.getDate(),'D+':_0x25ac60.getDate(),'h+':_0x25ac60.getHours(),'H+':_0x25ac60.getHours(),'m+':_0x25ac60.getMinutes(),'s+':_0x25ac60.getSeconds(),'w+':_0x25ac60.getDay(),'q+':Math.floor(_0x25ac60.getMonth()+3/3),'S+':_0x25ac60.getMilliseconds()};
	/(y+)/i.test(_0x334d9c)&&(_0x334d9c=_0x334d9c.replace(RegExp.$1,''.concat(_0x25ac60.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0xd76021 in _0x3fc1ee){
		if(new RegExp('('.concat(_0xd76021,')')).test(_0x334d9c)){
			var _0x6ee06d,_0x2c5f41=('S+'===_0xd76021)?'000':'00';
			_0x334d9c=_0x334d9c.replace(RegExp.$1,(1==RegExp.$1.length)?_0x3fc1ee[_0xd76021]:(''.concat(_0x2c5f41)+_0x3fc1ee[_0xd76021]).substr(''.concat(_0x3fc1ee[_0xd76021]).length));
		}
	}
	return _0x334d9c;
};
function random(_0x49d667,_0x34bf6a){
	return Math.floor(Math.random()*_0x34bf6a-_0x49d667)+_0x49d667;
};

function getActMemberInfo() {
	return new Promise((resolve) => {
		let options = {
			url: `https://lzkjdz-isv.isvjd.com/wxCommonInfo/getActMemberInfo`,
			headers: {
				cookie:
					activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.Pin,
				Connection: `keep-alive`,
				"Accept-Encoding": `gzip, deflate, br`,
				"Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`,
				Origin: `https://lzkj-isv.isvjd.com`,
				"User-Agent": $.UA,
				"Accept-Language": `zh-cn`,
				Host: `lzkjdz-isv.isvjd.com`,
				Referer: `https://lzkjdz-isv.isvjd.com/wxTeam/activity2/${activityId}?activityId=${activityId}&adsource=cjhdc&isOpenCardBack=iocb`,
				Accept: `application/json, text/javascript, */*; q=0.01`,
			},
			body: `venderId=${$.userId}&activityId=${activityId}&pin=${encodeURIComponent($.Pin)}`,
		};
		$.post(options, async (err, resp, data) => {
			try {
				if (err) {
					console.log("" + JSON.stringify(err));
					console.log($.name + " 1 API请求失败，请检查网路重试");
				} else {
					if (data && safeGet(data)) {
						data = JSON.parse(data);
						if (data.data) {
							if (data.data.openCard) return;
							if (data.data.openCardUrl) {
								$.channel = data.data.openCardUrl
									.match(/channel=\d+/)[0]
									.split("=")[1];
							} else {
								console.log("店家不返回开卡地址。活动有问题。。");
								$.end = true;
								return;
							}
						} else {
							console.log("异常1：" + JSON.stringify(data));
						}
					}
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve();
			}
		});
	});
}

function getUserInfo() {
	return new Promise((resolve) => {
		let body = `pin=${
			prefix === "cjhydz"
				? encodeURIComponent(encodeURIComponent($.Pin))
				: encodeURIComponent($.Pin)
		}`;
		$.post(
			taskPostUrl("/wxActionCommon/getUserInfo", body),
			async (err, resp, data) => {
				try {
					if (err) {
						console.log("" + JSON.stringify(err));
						console.log($.name + "\x206-1\x20API请求失败，请检查网路重试");
					} else {
						if (safeGet(data)) {
							data = JSON.parse(data);
							if (data.result && data.data) {
								$.attrTouXiang = data.data.yunMidImageUrl
									? data.data.yunMidImageUrl
									: "https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg";
								$.nickName = data.data.nickname;
							} else {
								console.log("异常6-2：" + JSON.stringify(data));
							}
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				} finally {
					resolve();
				}
			}
		);
	});
}

function joinTeam(count = 0x0) {
	return new Promise((resolve) => {
		let pin = encodeURIComponent($.Pin);
		let hisPin = encodeURIComponent(encodeURIComponent($.his));
		if (count == 1) {
			pin = encodeURIComponent(encodeURIComponent($.Pin));
		}
		let body = `activityId=${activityId}&inviterNick=${encodeURIComponent(
			$.hisNickName
		)}&inviteeNick=${encodeURIComponent(
			$.nickName
		)}&inviter=${hisPin}&invitee=${pin}&inviterImg=${encodeURIComponent(
			$.hisInviterImg
		)}&inviteeImg=${encodeURIComponent($.attrTouXiang)}`;
		$.post(
			taskPostUrl("/microDz/invite/activity/wx/acceptInvite", body),
			async (err, resp, data) => {
				try {
					if (err) {
						console.log("" + JSON.stringify(err));
						console.log($.name + "\x207\x20API请求失败，请检查网路重试");
					} else {
						if (safeGet(data)) {
							data = JSON.parse(data);
							if (data.result && data.data) {
								message += "【京东账号" + $.index + "】 加入队伍\n";
								$.log("加入队伍成功");
							} else {
								if (
									data.errorMessage.indexOf("店铺会员") > -1 &&
									count != 3
								) {
									$.errorJoinShop = '';
				await joinShop();
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
					console.log('第1次 重新开卡')
					await $.wait(1000)
					await joinShop()
				}
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
					console.log('第2次 重新开卡')
					await $.wait(1000)
					await joinShop()
				}
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试') > -1){
					console.log('第3次 重新开卡')
					await $.wait(1000)
					await joinShop()
				}
									await joinTeam(3);
								} else if (data.errorMessage.indexOf("队伍已经满员") > -1) {
									$.maxTeam = true;
								} else if (
									data.errorMessage.indexOf("奖品与您擦肩而过") > -1 &&
									count == 0
								) {
									await joinTeam(1);
								} else {
									console.log("异常7：" + JSON.stringify(data));
									if (!data.data.rewardPoint) againUserIndex.push($.index);
									if (data.errorMessage.includes("奖品发送完毕"))
										process.exit(1);
									message +=
										"【京东账号" +
										$.index +
										"】\x20" +
										data.errorMessage +
										"\x0a";
								}
							}
						}
					}
				} catch (e) {
					$.logErr(e, resp);
				} finally {
					resolve();
				}
			}
		);
	});
}

function getOpenCardAllStatuesNew() {
	return new Promise((resolve) => {
		let options = {
			url: `https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/getOpenCardAllStatuesNew`,
			headers: {
				cookie:
					activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.Pin,
				Connection: `keep-alive`,
				"Accept-Encoding": `gzip, deflate, br`,
				"Content-Type": `application/x-www-form-urlencoded; charset=UTF-8`,
				"User-Agent": $.UA,
				"Accept-Language": `zh-cn`,
				Referer: `https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index?activityId=${activityId}`,
				Accept: `application/json, text/javascript, */*; q=0.01`,
			},
			body: `isInvited=1&activityId=${activityId}&pin=${encodeURIComponent(
				encodeURIComponent($.Pin)
			)}`,
		};
		$.post(options, async (err, resp, data) => {
			try {
				if (err) {
					console.log("" + JSON.stringify(err));
					console.log($.name + " 1 API请求失败，请检查网路重试");
				} else {
					if (data && safeGet(data)) {
						data = JSON.parse(data);
						if (data.data && data.data.isCanJoin) {
							(data.data.list || []).forEach((v) => {
								if (v.openCardLink) {
									$.card.push(v.openCardLink);
								}
							});
							//console.log($.card)
						}
					}
				}
			} catch (e) {
				// $.card = [
				//   'https://shopmember.m.jd.com/shopcard/?venderId=1000006644&shopId=1000006644&channel=8802',
				//   'https://shopmember.m.jd.com/shopcard/?venderId=1000000192&shopId=1000000192&channel=8802',
				//   'https://shopmember.m.jd.com/shopcard/?venderId=1000099547&shopId=1000099547&channel=8802'
				// ]
				$.logErr(e, resp);
			} finally {
				resolve();
			}
		});
	});
}

function taskPostUrl(url, body) {
	return {
		url: "" + activityUrl + url,
		body: body,
		headers: {
			Accept: "application/json",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-cn",
			Connection: "keep-alive",
			Host: `${prefix}-isv.isvjcloud.com`,
			Origin: `https://${prefix}-isv.isvjcloud.com`,
			"Content-Type": "application/x-www-form-urlencoded",
			Referer:
				activityUrl +
				"/microDz/invite/activity/wx/view/index?activityId=" +
				activityId,
			Cookie:
				cookie +
				activityCookie +
				";IsvToken=" +
				$.Token +
				";AUTH_C_USER=" +
				$.AUTH_C_USER,
			"User-Agent": $.UA,
		},
	};
}

function taskUrl(url, body) {
	return {
		url: "https://api.m.jd.com/client.action" + url,
		body: body,
		headers: {
			Accept: "*/*",
			"Accept-Encoding": "gzip, deflate, br",
			"Accept-Language": "zh-cn",
			Connection: "keep-alive",
			"Content-Type": "application/x-www-form-urlencoded",
			Host: "api.m.jd.com",
			Cookie: cookie,
			"User-Agent": $.UA,
		},
	};
}

function safeGet(data) {
	try {
		if (typeof JSON.parse(data) == "object") {
			return true;
		}
	} catch (e) {
		console.log(e);
		console.log("京东服务器访问数据为空，请检查自身设备网络情况");
		return false;
	}
}

function accessLog() {
	return new Promise(async (resolve) => {
		const options = {
			url: `https://${prefix}-isv.isvjcloud.com/common/accessLog`,
			headers: {
				Accept: "application/json",
				"Accept-Encoding": "gzip, deflate, br",
				"Accept-Language": "zh-cn",
				Connection: "keep-alive",
				Host: `${prefix}-isv.isvjcloud.com`,
				Origin: `https://${prefix}-isv.isvjcloud.com`,
				"Content-Type": "application/x-www-form-urlencoded",
				Referer:
					activityUrl +
					"/microDz/invite/activity/wx/view/index?activityId=" +
					activityId,
				Cookie:
					cookie +
					activityCookie +
					";IsvToken=" +
					$.Token +
					";AUTH_C_USER=" +
					$.AUTH_C_USER,
				"User-Agent": $.UA,
			},
			body: `venderId=1&code=99&pin=${encodeURIComponent(
				encodeURIComponent($.Pin)
			)}&activityId=${activityId}&pageUrl=https%3A%2F%2F${prefix}-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D${activityId}&subType=app`,
		};
		$.post(options, (err, resp, data) => {
			try {
				if (err) {
					console.log("" + JSON.stringify(err));
					console.log($.name + "\x20API请求失败，请检查网路重试");
				} else {
					if (resp.status == 200) {
						refreshToken(resp);
					}
				}
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve();
			}
		});
	});
}

function refreshToken(resp) {
	let cookies = resp.headers["set-cookie"];
	if (cookies) {
		activityCookie = cookies
			.map((v) => {
				return v.split(";")[0];
			})
			.join(";");
			}
		}
	});
}
function getUA(){
  $.UA = `jdapp;iPhone;10.2.2;14.3;${randomString(40)};M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;`
}
function randomString(e) {
  e = e || 32;
  let t = "abcdef0123456789", a = t.length, n = "";
  for (i = 0; i < e; i++)
    n += t.charAt(Math.floor(Math.random() * a));
  return n
}
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == "object") {
      return true;
    }
  } catch (e) {
    console.log(e);
    console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
    return false;
  }
}

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }


// 修改下方的 7051ebbb5d6f44a4a081ab5b738ee470 是微定制的的代码 pt_pin 是你账号的值  60 是人数 

(async () => {
  await openCardActivity(
    "d2e7d12554aa4cbead58f5280ac5c9c2",
    "https://cjhydz-isv.isvjcloud.com",
    "pt_pin",
    60,
    []
  );
  console.log("开卡已完成！");
})();

// module.exports = { joinTeam }
