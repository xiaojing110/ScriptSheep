/*
星粉玩家
因为炸api,重新命名一下
30 4,5,6 * * * jd_xfwj.js
*/
const $ = new Env("星粉玩家");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message='';
let userInfo='';
let bindWithVender='';
let venderId='1000003443';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x11172d=>{
		cookiesArr.push(jdCookieNode[_0x11172d]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x43a9b4=>_0x43a9b4.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x55f7ca=>!!_0x55f7ca);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.error='';
	console.log('由于活动炸api,开始随机跑...');
	cookiesArr=cookiesArr.sort(function(){
		return 0.5-Math.random();
	});
	for(let _0x3214d4=0;_0x3214d4<cookiesArr.length;_0x3214d4++){
		if(cookiesArr[_0x3214d4]){
			cookie=cookiesArr[_0x3214d4];
			originCookie=cookiesArr[_0x3214d4];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0x3214d4+1;
			$.isLogin=true;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){}
				continue;
			}
			$.bean=0;
			$.ADID=getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',1);
			$.UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
			authorCodeList=[''];
			$.userId='1000003443';
			$.actId='jdNewProducts20221016';
			$.authorCode=authorCodeList[random(0,authorCodeList.length)];
			userInfo=await taskPost('getShopOpenCardInfo',{'venderId':venderId,'channel':406,'payUpShop':true,'queryVersion':'10.5.2'});
			if(userInfo.success){
				$.openCardStatus=userInfo.result[0].userInfo.openCardStatus;
			}
			if($.openCardStatus===0){
				bindWithVender=await taskPost('bindWithVender',{'venderId':venderId,'shopId':venderId,'bindByVerifyCodeFlag':1});
			}
			await mpdz();
			$.timesleep=random(20000,90000);
			console.log('随机冷却 '+$.timesleep+' ms');
			await $.wait($.timesleep);
		}
	}
})().catch(_0x27a808=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x27a808+'!','');
}).finally(()=>{
	$.done();
});
async function mpdz(){
	$.token=null;
	$.buyerNick=null;
	$.activityInfo=null;
	$.taskList=null;
	await getToken();
	console.log('$.token '+$.token);
	if($.token){
		await task('activity/load',{'jdToken':$.token});
		await $.wait(1000);
		if($.buyerNick){
			// await $.wait(1000);
			// await task('customer/inviteRelation',{'inviterNick':$.authorCode});
			await $.wait(1000);
			console.log('2.任务 ->');
			await task('mission/completeMission',{'missionType':'bulletChat','bulletChat':'真正的旗舰折叠屏手机，三星Galaxy Z Fold4','shopId':'1000003443'});
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
function task(_0x2af90c,_0x23df8c,_0x5f43a1=1){
	body={'jsonRpc':'2.0','params':{'commonParameter':{'m':'POST','sign':'60417856463095d4304359d7244e39d6','timestamp':new Date(),'userId':$.userId},'admJson':{'actId':$.actId,'method':'/jdNewProducts/'+_0x2af90c,'userId':$.userId,'buyerNick':$.buyerNick?$.buyerNick:''}}};
	Object.assign(body.params.admJson,_0x23df8c);
	let _0x563135=getSign(body.params.admJson);
	body.params.commonParameter.sign=_0x563135.sign;
	body.params.commonParameter.timestamp=_0x563135.timeStamp;
	return new Promise(_0x152be0=>{
		$.post(taskUrl(_0x2af90c,body,_0x5f43a1),async(_0x2f95b9,_0x209e70,_0x4a7ab2)=>{
			try{
				if(_0x2f95b9){
					$.log(_0x2f95b9);
				}else{
					if(_0x4a7ab2){
						_0x4a7ab2=JSON.parse(_0x4a7ab2);
						if(_0x4a7ab2.success){
							if(_0x4a7ab2.data.status){
								switch(_0x2af90c){
									case 'activity/load':
										$.buyerNick=_0x4a7ab2.data.data.missionCustomer.buyerNick;
										$.user_id=_0x4a7ab2.data.data.cusActivity.actUpLoadId;
										$.missionCustomer=_0x4a7ab2.data.data.missionCustomer;
										$.remainChance=_0x4a7ab2.data.data.missionCustomer.remainChance;
										break;
									case 'mission/completeMission':
										if(_0x4a7ab2.data.status===500){
											console.log(_0x4a7ab2.data.msg);
										}else if(_0x4a7ab2.data.status===200){
											console.log(_0x4a7ab2.data.data.remark);
										}
										break;
									case 'mission/completeState':
										if(_0x4a7ab2.data.status){
											$.taskList=_0x4a7ab2.data.data;
										}
										break;
									case 'customer/inviteRelation':
										break;
									case 'cusShop/getCusShopProduct':
										if(_0x4a7ab2.data.status){
											$.getCusShopProductnumId=_0x4a7ab2.data.data.cusShopProduct.numId;
										}
										break;
									case 'game/playGame':
										if(_0x4a7ab2.data.status){
											$.gameLogId=_0x4a7ab2.data.data.gameLogId;
										}
										break;
									case 'report/temporary':
										if(_0x4a7ab2.data.status){
											console.log(_0x4a7ab2.data);
										}
										break;
									case 'game/sendGameAward':
										if(_0x4a7ab2.data.status){
											console.log(_0x4a7ab2.data);
										}
										break;
									default:
										break;
								}
							}
						}
					}else{
						$.log('京东没有返回数据');
					}
				}
			}catch(_0x337541){
				$.log(_0x337541);
				$.error=_0x337541;
			}finally{
				_0x152be0();
			}
		});
	});
}
function taskUrl(_0x2c9408,_0x561ae4){
	return{'url':'https://mpdz-sanxing-dz.isvjcloud.com/dm/front/jdNewProducts/'+_0x2c9408+'?open_id=&mix_nick='+($.buyerNick?$.buyerNick:'')+'&user_id='+($.user_id?$.user_id:''),'headers':{'Host':'mpdz-sanxing-dz.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-CN,zh-Hans;q=0.9','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/json; charset=utf-8','Origin':'https://mpdz-sanxing-dz.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':'https://mpdz-sanxing-dz.isvjcloud.com/jdbeverage/pages/paoku/paoku?bizExtString=&from=kouling&sid=&un_area=','Cookie':cookie},'body':JSON.stringify(_0x561ae4)};
}
async function getToken(){
	let _0x25bc08=await getSign('isvObfuscator',{'url':'https://mpdz-sanxing-dz.isvjcloud.com/jdbeverage/pages/samsung/samsung?actId=jdNewProducts20221016&bizExtString=c2hhcmVOaWNrOkcweFRlM3ExdiUyQm9lNDRJVkdudWtERjR0TE5ZQTRzZXVBNjdNT0lZUXhFazNWbDklMkJBVm80TkYlMkJ0Z3llSWM2QTZrZEszckxCUXBFUUg5VjR0ZHJyaDB3JTNEJTNEJmhlYWRQaWNVcmw6dW5kZWZpbmVkJm5pY2tOYW1lOnVuZGVmaW5lZA==&from=kouling&sid=ec6980d154f53aab7e8817d8a201ee1w&un_area=22_1930_50949_60587','id':''});
	let _0xc697d4={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':_0x25bc08.body};
	return new Promise(_0x4b2144=>{
		$.post(_0xc697d4,(_0x183f45,_0x2ad59f,_0x422a58)=>{
			try{
				if(_0x183f45){
					$.log(_0x183f45);
				}else{
					if(_0x422a58){
						_0x422a58=JSON.parse(_0x422a58);
						if(_0x422a58.code==='0'){
							$.token=_0x422a58.token;
						}
					}
				}
			}catch(_0x4adde2){
				$.log(_0x4adde2);
			}finally{
				_0x4b2144();
			}
		});
	});
}
function random(_0xad03e2,_0x5707ec){
	return Math.floor(Math.random()*(_0x5707ec-_0xad03e2))+_0xad03e2;
}
function getUUID(_0x377280='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x5052d8=0){
	return _0x377280.replace(/[xy]/g,function(_0x4a0fc9){
		var _0x478b7d=Math.random()*0x10|0x0,_0x1b3dce=_0x4a0fc9=='x'?_0x478b7d:_0x478b7d&0x3|0x8;
		if(_0x5052d8){
			uuid=_0x1b3dce.toString(36).toUpperCase();
		}else{
			uuid=_0x1b3dce.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x33c96a={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x30820b=>{
		$.get(_0x33c96a,(_0x5b9ad5,_0x13d871,_0x52888a)=>{
			try{
				if(_0x5b9ad5){
					$.logErr(_0x5b9ad5);
				}else{
					if(_0x52888a){
						_0x52888a=JSON.parse(_0x52888a);
						if(_0x52888a.retcode==='1001'){
							$.isLogin=false;
							return;
						}
						if(_0x52888a.retcode==='0'&&_0x52888a.data.hasOwnProperty('userInfo')){
							$.nickName=_0x52888a.data.userInfo.baseInfo.nickname;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x4a997b){
				$.logErr(_0x4a997b);
			}finally{
				_0x30820b();
			}
		});
	});
}
function getSign(_0x2582bd,_0x4dc8fa){
	const _0x49a81d={'url':'http://fakermetaverse.xyz/sign','body':JSON.stringify({'fn':_0x2582bd,'body':_0x4dc8fa}),'headers':{'Content-Type':'application/json'}};
	return new Promise(_0x2582bd=>{
		$.post(_0x49a81d,async(_0x4dc8fa,_0x339c11,_0x4378a0)=>{
			try{
				_0x4dc8fa?console.log(_0x4dc8fa):_0x4378a0=JSON.parse(_0x4378a0);
			}catch(_0x188af7){
				$.logErr(_0x188af7,_0x339c11);
			}finally{
				_0x2582bd(_0x4378a0||'');
			}
		});
	});
}
async function taskPost(_0x1211e2,_0xdf3850){
	return s=await getSign(_0x1211e2,_0xdf3850),opt={'url':'https://api.m.jd.com/client.action?functionId='+s.fn,'body':s.body,'headers':{'Host':'api.m.jd.com','Accept':'*/*','Accept-Encoding':'gzip','Content-Type':'application/x-www-form-urlencoded','Accept-Language':'zh-Hans-HK;q=1, zh-Hant-HK;q=0.9','User-Agent':'JD4iPhone/168221%20(iPhone;%20iOS;%20Scale/3.00)','Referer':'','Connection':'keep-alive','Cookie':cookie}},new Promise(_0x478877=>{
		$.post(opt,(_0x46afa8,_0x5a3ba3,_0x414f94)=>{
			try{
				_0x46afa8?console.log(_0x46afa8):_0x414f94=JSON.parse(_0x414f94);
			}catch(_0x7999e8){
				console.log(_0x7999e8);
			}finally{
				_0x478877(_0x414f94||'');
			}
		});
	});
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
