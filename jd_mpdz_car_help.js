/*

16 16,17,18 * * * jd_mpdz_help.js
*/
const $ = new Env("头文字j助力");
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
const CryptoJS = require("crypto-js")
let ownCode = null;
let mpdzHelp = process.env.mpdzHelpCode ?? '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    let cookiesData = $.getdata('CookiesJD') || "[]";
    cookiesData = JSON.parse(cookiesData);
    cookiesArr = cookiesData.map(item => item.cookie);
    cookiesArr.reverse();
    cookiesArr.push(...[$.getdata('CookieJD2'), $.getdata('CookieJD')]);
    cookiesArr.reverse();
    cookiesArr = cookiesArr.filter(item => !!item);
}

if (process.env.mpdzHelpCode) {
    if (process.env.mpdzHelpCode.indexOf('&') > -1) {
        mpdzHelp = process.env.mpdzHelpCode.split('&');
    } else if (process.env.mpdzHelpCode.indexOf('\n') > -1) {
        mpdzHelp = process.env.mpdzHelpCode.split('\n');
    } else {
        mpdzHelp = [process.env.mpdzHelpCode];
    }
}

!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.actCode=0;
	let _0x5f13ae=[];
	for(let _0x12eba3=0;_0x12eba3<cookiesArr.length;_0x12eba3+=15){
		_0x5f13ae.push(cookiesArr.slice(_0x12eba3,_0x12eba3+15));
	}for(let _0x5a44b8=0;_0x5a44b8<_0x5f13ae.length;_0x5a44b8++){
		try{
			let _0x3a0933=_0x5f13ae[_0x5a44b8];
			const _0x3e6357=_0x3a0933.map((_0x7799c3,_0x471ad0)=>main(_0x7799c3));
			await Promise.all(_0x3e6357);
		}catch(_0x1beb62){}
	}if($.actCode===1){
		for(let _0x57766e=0;_0x57766e<cookiesArr.length;_0x57766e++){
			if(mpdzHelp.length===0){
				console.log('头文字j纯助力 环境变量 mpdzHelp 多助力码 & 分开');
				break;
			}
			if(cookiesArr[_0x57766e]){
				cookie=cookiesArr[_0x57766e];
				originCookie=cookiesArr[_0x57766e];
				newCookie='';
				$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
				$.index=(_0x57766e+1);
				$.isLogin=true;
				$.nickName='';
				await checkCookie();
				console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
				if(!$.isLogin){
					$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
					if($.isNode()){}
					continue;
				}
				$.bean=0;
				$.ADID=getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',1);
				$.UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
				authorCodeList=mpdzHelp;
				$.appkey='21699045';
				$.userId='10299171';
				$.actId='1760007';
				$.authorCode=authorCodeList[random(0,authorCodeList.length)];
				await mpdz();
				await $.wait(2000);
				if($.bean>0){
					message+='\n【京东账号'+$.index+'】'+($.nickName||$.UserName)+' \n       └ 获得 '+$.bean+' 京豆。';
				}
			}
		}
	}
})().catch(_0x1a997e=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x1a997e+'!','');
}).finally(()=>{
	$.done();
});
async function mpdz(){
	$.token=null;
	$.buyerNick=null;
	$.activityInfo=null;
	$.taskList=null;
	await getToken();
	console.log($.token);
	if($.token){
		await $.wait(3000);
		await task('activity/load',{'inviteNick':$.authorCode,'jdToken':$.token,'shopId':null},0);
		await $.wait(3000);
		if($.buyerNick){
			console.log('1.助力码 -> '+$.buyerNick);
			await $.wait(3000);
			console.log('2.去助力 ->');
			await task('mission/completeMission',{'missionType':'shareAct','inviterNick':$.authorCode});
			await $.wait(3000);
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
function task(_0x45075a,_0x319918,_0x20aa2a=1){
	body={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','userId':$.userId},'admJson':{
				'actId':$.actId,'method':'/jdCardRunning/'+_0x45075a,'userId':$.userId,'buyerNick':$.buyerNick?$.buyerNick:''
			}}};
	Object.assign(body.params.admJson,_0x319918);
	let _0x4e4456=getSign(body.params.admJson);
	body.params.commonParameter.sign=_0x4e4456.sign;
	body.params.commonParameter.timestamp=_0x4e4456.timeStamp;
	return new Promise(_0x4d0bd8=>{
		$.post(taskUrl(_0x45075a,body,_0x20aa2a),async(_0x37bc95,_0x18c346,_0x17d174)=>{
			try{
				if(_0x37bc95){
					$.log(_0x37bc95);
				}else{
					if(_0x17d174){
						_0x17d174=JSON.parse(_0x17d174);
						if(_0x17d174.success){
							if(_0x17d174.data.status){
								switch(_0x45075a){
									case 'activity/load':
										$.buyerNick=_0x17d174.data.data.missionCustomer.buyerNick;
										$.user_id=_0x17d174.data.data.cusActivity.actUpLoadId;
										$.missionCustomer=_0x17d174.data.data.missionCustomer;
										$.remainChance=_0x17d174.data.data.missionCustomer.remainChance;
										break;
									case 'mission/completeMission':
										if(_0x17d174.data.status===500){
																	console.log(_0x17d174.data.msg);
																}else if(_0x17d174.data.status===200){
																	console.log(_0x17d174.data.data.remark);
																}
										break;
									case 'mission/completeState':
										if(_0x17d174.data.status){
																	$.taskList=_0x17d174.data.data;
																}
										break;
									case 'cusShop/getCusShop':
										if(_0x17d174.data.status){
																	$.getCusShopshopId=_0x17d174.data.data.cusShop.shopId;
																}
										break;
									case 'cusShop/getCusShopProduct':
										if(_0x17d174.data.status){
																	$.getCusShopProductnumId=_0x17d174.data.data.cusShopProduct.numId;
																}
										break;
									case 'game/playGame':
										if(_0x17d174.data.status){
																	$.gameLogId=_0x17d174.data.data.gameLogId;
																}
										break;
									case 'report/temporary':
										if(_0x17d174.data.status){
																	console.log(_0x17d174.data);
																}
										break;
									case 'game/sendGameAward':
										if(_0x17d174.data.status){
																	console.log(_0x17d174.data);
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
			}catch(_0x461920){
				$.log(_0x461920);
			}
			finally{
				_0x4d0bd8();
			}
		});
	});
}
function taskUrl(_0x4effe2,_0xaba463,_0x3a9e84=1){
	return{
		'url':_0x3a9e84?'https://mpdz-car-dz.isvjcloud.com/dm/front/jdCardRunning/'+_0x4effe2+'?open_id=&mix_nick='+($.buyerNick?$.buyerNick:'')+'&user_id='+($.user_id?$.user_id:''):'https://mpdz-car-dz.isvjcloud.com/dm/front/jdCardRunning/'+_0x4effe2+'?open_id=&mix_nick='+($.buyerNick?$.buyerNick:'')+'&push_way=1&user_id='+($.user_id?$.user_id:''),'headers':{'Host':'mpdz-car-dz.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-CN,zh-Hans;q=0.9','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/json; charset=utf-8','Origin':'https://mpdz-car-dz.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':'https://mpdz-car-dz.isvjcloud.com/jdbeverage/pages/paoku/paoku?bizExtString=&from=kouling&sid=&un_area=','Cookie':cookie},'body':JSON.stringify(_0xaba463)
	};
}
async function main(_0xfae1b2){
	$.actCode=1;
	$.appidSign='activities_platform';
	const _0x5bea6b=['4AVQao+eH8Q8kvmXnWmkG8ef/fNr5fdejnD9+9Ugbec='];
	let _0x20e24=_0x5bea6b[Math.floor(Math.random()*_0x5bea6b.length)];
	let _0xb89e4e={'url':'https://api.m.jd.com/','body':'functionId=TaskInviteService&body='+JSON.stringify({'method':'participateInviteTask','data':{'channel':'1','encryptionInviterPin':encodeURIComponent(_0x20e24),'type':1}})+'&appid=market-task-h5&uuid=&_t='+Date.now(),'headers':{
			'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://assignment.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://assignment.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':_0xfae1b2
		}};
	$.post(_0xb89e4e,(_0x422e7d,_0x2d9bdc,_0x1c1923)=>{});
}
function getToken(){
	let _0x23edd4={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':'body=%7B%22url%22%3A%20%22https%3A//lzkj-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=hjudwgohxzVu96krv&client=apple&clientVersion=9.4.0&st=1620476162000&sv=111&sign=f9d1b7e3b943b6a136d54fe4f892af05'};
	return new Promise(_0x445b48=>{
		$.post(_0x23edd4,(_0x4dc3b0,_0x425918,_0xa5dc33)=>{
			try{
				if(_0x4dc3b0){
					$.log(_0x4dc3b0);
				}else{
					if(_0xa5dc33){
						_0xa5dc33=JSON.parse(_0xa5dc33);
						if(_0xa5dc33.code==='0'){
							$.token=_0xa5dc33.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x405aaf){
				$.log(_0x405aaf);
			}
			finally{
				_0x445b48();
			}
		});
	});
}
function random(_0x1336f0,_0x3bd272){
	return Math.floor(Math.random()*_0x3bd272-_0x1336f0)+_0x1336f0;
}
function getUUID(_0x4accb7='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x33f40f=0){
	return _0x4accb7.replace(/[xy]/g,function(_0x51cd39){
		var _0x4c9148=(Math.random()*0x10|0x0),_0x48d94e=(_0x51cd39=='x')?_0x4c9148:(_0x4c9148&0x3|0x8);
		if(_0x33f40f){
			uuid=_0x48d94e.toString(36).toUpperCase();
		}else{
			uuid=_0x48d94e.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x28c377={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x4508cd=>{
		$.get(_0x28c377,(_0x2024aa,_0x266217,_0x41ddea)=>{
			try{
				if(_0x2024aa){
					$.logErr(_0x2024aa);
				}else{
					if(_0x41ddea){
						_0x41ddea=JSON.parse(_0x41ddea);
						if(_0x41ddea.retcode==='1001'){
							$.isLogin=false;
							return;
						}if((_0x41ddea.retcode==='0')&&_0x41ddea.data.hasOwnProperty('userInfo')){
							$.nickName=_0x41ddea.data.userInfo.baseInfo.nickname;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x454d05){
				$.logErr(_0x454d05);
			}
			finally{
				_0x4508cd();
			}
		});
	});
}
function getSign(_0x62c294){
	var _0x359ad3=new Date().valueOf(),_0x539261='85623312044258464325227666883546',_0x4286ed='25747717',_0x423184=JSON.stringify(_0x62c294),_0x42f6c4=encodeURIComponent(_0x423184),_0x2838f1=new RegExp('\'','g'),_0x580404=new RegExp('~','g'),_0x42f6c4=_0x42f6c4.replace(_0x2838f1,'%27'),_0x42f6c4=_0x42f6c4.replace(_0x580404,'%7E'),_0x194dce=(_0x4286ed+'admjson'+_0x42f6c4+'appkey'+_0x4286ed+'timestamp'+_0x359ad3+_0x539261);
	return{'sign':CryptoJS.MD5(_0x194dce.toLowerCase()).toString(),'timeStamp':_0x359ad3};
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
