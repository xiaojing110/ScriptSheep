/*
半点京豆雨
更新时间：2022-4-1
脚本兼容: Quantumult X, Surge, Loon, JSBox, Node.js
by：msechen
半点京豆雨id更新频道：https://t.me/jdrain
==============Quantumult X==============
[task_local]
#半点京豆雨
31 21,22 * * * https://raw.githubusercontent.com/msechen/jdrain/main/jd_live_redrain.js, tag=半点京豆雨, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true
==============Loon==============
[Script]
cron "31 21,22 * * * " script-path=https://raw.githubusercontent.com/msechen/jdrain/main/jd_redrain_half.js,tag=半点京豆雨
================Surge===============
半点京豆雨 = type=cron,cronexp="31 21,22 * * * ",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/msechen/jdrain/main/jd_redrain_half.js
===============小火箭==========
半点京豆雨 = type=cron,script-path=https://raw.githubusercontent.com/msechen/jdrain/main/jd_redrain_half.js, cronexpr="31 21,22 * * * ", timeout=3600, enable=true
*/
const $=new Env('半点京豆雨');
let allMessage='',id='';
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message='';
let jd_redrain_half_url='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x2e7074=>{
		cookiesArr.push(jdCookieNode[_0x2e7074]);
	});
	if(process.env.jd_redrain_half_url)jd_redrain_half_url=process.env.jd_redrain_half_url;
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x20f7f4=>_0x20f7f4.cookie)].filter(_0x47b6e6=>!!_0x47b6e6);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	if(!jd_redrain_half_url){
		$.log('\n甘露殿【https://t.me/jdredrain】提醒你:今日龙王🐲出差，天气晴朗☀️，改日再来～\n');
		return;
	}
	let _0x121eb4=(new Date().getUTCHours()+8%24);
	$.log('\n甘露殿【https://t.me/jdredrain】提醒你:正在远程获取'+_0x121eb4+'点30分京豆雨ID\n');
	await $.wait(1000);
	let _0x3c7a54=await getRedRainIds(jd_redrain_half_url);
	if(!_0x3c7a54.length){
		$.log('\n甘露殿【https://t.me/jdredrain】提醒你:今日龙王🐲出差，天气晴朗☀️，改日再来～\n');
		return;
	}
	console.log('\n甘露殿【https://t.me/jdredrain】提醒你:龙王就位:'+_0x3c7a54+'，正在领取'+_0x121eb4+'点30分京豆雨\n');
	let _0x1f7a3b='https://prodev.m.jd.com/mall/active/'+_0x3c7a54+'/index.html';
	for(let _0x6477b7=0;_0x6477b7<5;_0x6477b7++){
		if(cookiesArr[_0x6477b7]){
			cookie=cookiesArr[_0x6477b7];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0x6477b7+1);
			$.isLogin=true;
			$.nickName='';
			await TotalBean();
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await jd_redrain_half();
		}
	}if(allMessage){
		if($.isNode())await notify.sendNotify(''+$.name,''+allMessage);
		$.msg($.name,'',allMessage);
	}
})().catch(_0x239a5f=>{
	$.log('','? '+$.name+', 失败! 原因: '+_0x239a5f+'!','');
}).finally(()=>{
	$.done();
});
async function jd_redrain_half(){
	try{
		await getInfo(half_url);
	}catch(_0x13d902){
		$.logErr(_0x13d902);
	}
}
async function getInfo(_0x969e1b){
	return new Promise(_0x421c4d=>{
		$.get({'url':_0x969e1b,'headers':{'Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)'}},async(_0x41a94d,_0x17f332,_0x2ed08c)=>{
			try{
				$.encryptProjectId=_0x17f332.body.match(/"encryptProjectId\\":\\"(.*?)\\"/)[1];
				$.encryptAssignmentId=_0x17f332.body.match(/"encryptAssignmentId\\":\\"(.*?)\\"/)[1];
				console.log($.encryptProjectId);
				console.log($.encryptAssignmentId);
				await doInteractiveAssignment($.encryptProjectId,$.encryptAssignmentId);
				_0x421c4d();
			}catch(_0x26c8c5){
				console.log(_0x26c8c5);
			}
		});
	});
}
function doInteractiveAssignment(_0x1c9894,_0x487584){
	const _0x5a5985={'encryptProjectId':_0x1c9894,'encryptAssignmentId':_0x487584,'completionFlag':true,'sourceCode':'acehby20210924'};
	return new Promise(async _0x2ac38d=>{
		const _0x2d7ebc={'url':'https://api.m.jd.com/client.action?appid=redrain-2021&functionId=doInteractiveAssignment&client=wh5&clientVersion=1.0.0&body='+encodeURIComponent(JSON.stringify(_0x5a5985))+'&_='+new Date().getTime(),'headers':{'Host':'api.m.jd.com','origin':'https://h5.m.jd.com/','Accept':'*/*','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':cookie,'User-Agent':'Mozilla/5.0 (Linux; Android 10; WLZ-AN00 Build/HUAWEIWLZ-AN00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045811 Mobile Safari/537.36 MMWEBID/2874 MicroMessenger/8.0.15.2020(0x28000F39) Process/tools WeChat/arm64 Weixin NetType/4G Language/zh_CN ABI/arm64','Referer':'https://h5.m.jd.com/'}};
		$.get(_0x2d7ebc,async(_0x358270,_0x282f89,_0x5dabf8)=>{
			try{
				if(_0x358270){
					console.log(''+JSON.stringify(_0x358270));
					console.log('doInteractiveAssignment api请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5dabf8)){
						_0x5dabf8=JSON.parse(_0x5dabf8);
						console.log(_0x5dabf8);
						if(_0x5dabf8.subCode=='0'){
							console.log(_0x5dabf8.rewardsInfo.successRewards[3][0].quantity+'京豆');
							allMessage+='京东账号'+$.index+($.nickName||$.UserName)+'\n领取成功，获得【'+_0x5dabf8.rewardsInfo.successRewards[3][0].quantity+'】京豆'+(($.index!==cookiesArr.length)?'\n\n':'');
						}else{
							console.log(_0x5dabf8);
						}
					}
				}
			}catch(_0x5df645){
				$.logErr(_0x5df645,_0x282f89);
			}
			finally{
				_0x2ac38d();
			}
		});
	});
}
function getRedRainIds(_0xbb7854){
	return new Promise(async _0xa35cc3=>{
		const _0x282137={'url':_0xbb7854+'?'+new Date(),'timeout':10000,'headers':{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88'}};
		if($.isNode()&&process.env.TG_PROXY_HOST&&process.env.TG_PROXY_PORT){
			const _0x47418b=require('tunnel');
			const _0x36e039={'https':_0x47418b.httpsOverHttp({'proxy':{'host':process.env.TG_PROXY_HOST,'port':(process.env.TG_PROXY_PORT*1)}})};
			Object.assign(_0x282137,{'agent':_0x36e039});
		}
		$.get(_0x282137,async(_0x45fd77,_0x1c430f,_0x22c951)=>{
			try{
				if(_0x45fd77){}else{
					if(_0x22c951)_0x22c951=JSON.parse(_0x22c951);
				}
			}catch(_0x4f1d18){}
			finally{
				_0xa35cc3(_0x22c951);
			}
		});
		await $.wait(10000);
		_0xa35cc3([]);
	});
}
function taskUrl(_0x4637b2,_0x265cc2={}){
	return{'url':JD_API_HOST+'?functionId='+_0x4637b2+'&body='+escape(JSON.stringify(_0x265cc2))+'&client=wh5&clientVersion=1.0.0&_='+((new Date().getTime()+new Date().getTimezoneOffset()*60*1000)+(8*60*60*1000)),'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Referer':'https://h5.m.jd.com/active/redrain/index.html?id='+$.activityId+'&lng=0.000000&lat=0.000000&sid=&un_area=','Cookie':cookie,'User-Agent':'JD4iPhone/9.4.5 CFNetwork/1209 Darwin/20.2.0'}};
}
function TotalBean(){
	return new Promise(async _0x55f00d=>{
		const _0x40c52c={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}};
		$.post(_0x40c52c,(_0x2ec674,_0xdd7c75,_0x484d25)=>{
			try{
				if(_0x2ec674){
					console.log(''+JSON.stringify(_0x2ec674));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x484d25)){
						_0x484d25=JSON.parse(_0x484d25);
						if(_0x484d25.retcode===13){
							$.isLogin=false;
							return;
						}if(_0x484d25.retcode===0){
							$.nickName=_0x484d25.base&&_0x484d25.base.nickname||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x4b0e51){
				$.logErr(_0x4b0e51,_0xdd7c75);
			}
			finally{
				_0x55f00d();
			}
		});
	});
}
function safeGet(_0x5d534f){
	try{
		if(typeof JSON.parse(_0x5d534f)=='object'){
			return true;
		}
	}catch(_0x13222d){
		console.log(_0x13222d);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0x271fee){
	if(typeof _0x271fee=='string'){
		try{
			return JSON.parse(_0x271fee);
		}catch(_0x47d552){
			console.log(_0x47d552);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function jsonpToJson(_0x4ce395){
	let _0x56578c=null;
	if(typeof _0x4ce395==='string'){
		const _0x52cbf4=/^\w+\((\{[^()]+\})\)$/;
		const _0x570530=_0x4ce395.match(_0x52cbf4);
		if(_0x570530){
			_0x56578c=JSON.parse(_0x570530[1]);
		}
	}
	return _0x56578c;
};
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
