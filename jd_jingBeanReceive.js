/*
专属礼 

6 10 * * * jd_jingBeanReceive.js

*/
const $=new Env('专属礼');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const fs=require('fs');
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x3fd5a4=>{
		cookiesArr.push(jdCookieNode[_0x3fd5a4]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x1daed7=>_0x1daed7.cookie)].filter(_0x3de35e=>!!_0x3de35e);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
	for(let _0xded5d3=0;_0xded5d3<cookiesArr.length;_0xded5d3++){
		UA='jdapp;iPhone;10.0.8;14.6;'+UUID+';network/wifi;JDEbook/openapp.jdreader;model/iPhone9,2;addressid/2214222493;appBuild/168841;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/16E158;supportJDSHWK/1';
		if(cookiesArr[_0xded5d3]){
			cookie=cookiesArr[_0xded5d3];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0xded5d3+1);
			$.isLogin=true;
			$.nickName='';
			$.maxPage='1';
			message='';
			
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){}
				continue;
			}
			await main();
			await $.time(1000);
		}
	}
})().catch(_0x5c8e24=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x5c8e24+'!','');
}).finally(()=>{
	$.done();
});
async function main(){
	await getJoyInfo();
	await jingBeanReceive();
}
async function getJoyInfo(){
	return new Promise(_0x47e7b7=>{
		$.post(taskUrl('getJoyInfo','body=%7B%22firstType%22%3A-100%2C%22plugin_version%22%3A90558%7D&client=apple&clientVersion=11.0.2&st=1658045052725&sv=102&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJOyDIeyDNC2%22%2C%22wifiBssid%22%3A%22ZJuyD2SyCWTwYJq2DNU2ZNruEWTsYzSnCtc4CNVsYJu%3D%22%2C%22osVersion%22%3A%22CJGkCK%3D%3D%22%2C%22area%22%3A%22CJPpCJUmXzUnDtSzXzOyDzK0%22%2C%22openudid%22%3A%22Y2Y5CQYmCJuzCzq3CwG2ZNVtYtOzCzGnZNPvCzq3D2HvCJCnEJHuEK%3D%3D%22%2C%22uuid%22%3A%22Y2Y5CQYmCJuzCzq3CwG2ZNVtYtOzCzGnZNPvCzq3D2HvCJCnEJHuEK%3D%3D%22%7D%2C%22ts%22%3A1658045052725%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ef=1&sign=bf95f42f6b3d06076c3f40dfd92b4e7b'),(_0x42c18f,_0x5abde4,_0x21f8c9)=>{
			try{
				if(_0x42c18f){
					console.log(_0x42c18f);
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x21f8c9=JSON.parse(_0x21f8c9);
					if(_0x21f8c9.floors){
						for(const _0x2e82cf of _0x21f8c9.floors){
							if(_0x2e82cf.mId==='jingBean'){
								$.encryptAssignmentId=_0x2e82cf.data.jingBeanInfo.encryptAssignmentId;
							}
						}
					}else{
						console.log(JSON.stringify(_0x21f8c9));
					}
				}
			}catch(_0x2302a3){
				$.logErr(_0x2302a3,_0x5abde4);
			}
			finally{
				_0x47e7b7(_0x21f8c9);
			}
		});
	});
}
async function jingBeanReceive(){
	return new Promise(_0x4f3779=>{
		$.post(taskUrl('jingBeanReceive','body=%7B%22encryptAssignmentId%22%3A%226bzcu8ZNPHFhuWZC55MhLgJCPiW%22%2C%22firstType%22%3A-100%2C%22plugin_version%22%3A90558%7D&client=apple&clientVersion=11.0.2&st=1658045053068&sv=111&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJOyDIeyDNC2%22%2C%22wifiBssid%22%3A%22YtS5CJS4DtK2YJcmDNZwD2S2CNO2ZWOzEWG0ENU2ZNY%3D%22%2C%22osVersion%22%3A%22CJUkCK%3D%3D%22%2C%22area%22%3A%22CtZpCJY2XzSmDzKnXzO2DJc3%22%2C%22openudid%22%3A%22DWVtYtCmDtS4CWS3DJUzDzPuZtC1EJq1EQZwYzS2Ctc4ZNGnZJGzZG%3D%3D%22%2C%22uuid%22%3A%22DWVtYtCmDtS4CWS3DJUzDzPuZtC1EJq1EQZwYzS2Ctc4ZNGnZJGzZG%3D%3D%22%7D%2C%22ts%22%3A1658045053068%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ef=1&sign=5a21a6f2180765f348512357c67b8f5b'),(_0x4ec997,_0xa18bd1,_0xc4bac0)=>{
			try{
				if(_0x4ec997){
					console.log(_0x4ec997);
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0xc4bac0=JSON.parse(_0xc4bac0);
					if(_0xc4bac0.code===0){
						if(_0xc4bac0.isSuccess){
							console.log(_0xc4bac0.data.windowsContent);
						}else{
							console.log(_0xc4bac0.message);
						}
					}else{
						console.log(JSON.stringify(_0xc4bac0));
					}
				}
			}catch(_0x4c45b2){
				$.logErr(_0x4c45b2,_0xa18bd1);
			}
			finally{
				_0x4f3779(_0xc4bac0);
			}
		});
	});
}
function taskUrl(_0x13905d,_0x5d09b7){
	return{'url':'https://api.m.jd.com/client.action?functionId='+_0x13905d,'body':_0x5d09b7,'headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','User-Agent':UA,'Accept-language':'zh-Hans-CN;q=1','Cookie':cookie}};
}
function random(_0x2bb0c2,_0x26cbc0){
	return parseInt(_0x26cbc0-_0x2bb0c2*Math.random());
}
function TotalBean(){
	return new Promise(async _0x5e50ea=>{
		const _0x43eae3={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1'}};
		$.post(_0x43eae3,(_0x33e7e0,_0xd57885,_0x56881e)=>{
			try{
				if(_0x33e7e0){
					console.log(''+JSON.stringify(_0x33e7e0));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x56881e){
						_0x56881e=JSON.parse(_0x56881e);
						if(_0x56881e.retcode===13){
							$.isLogin=false;
							return;
						}if(_0x56881e.retcode===0){
							$.nickName=_0x56881e.base&&_0x56881e.base.nickname||$.UserName;
						}else{
							$.nickName=$.UserName;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x17e977){
				$.logErr(_0x17e977,_0xd57885);
			}
			finally{
				_0x5e50ea();
			}
		});
	});
}
function getUUID(_0x1f7017='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x52f24f=0){
	return _0x1f7017.replace(/[xy]/g,function(_0x1f7017){
		var _0x383d2b=(16*Math.random()|0x0),_0x428170=('x'==_0x1f7017)?_0x383d2b:(0x3&_0x383d2b|0x8);
		return uuid=_0x52f24f?_0x428170.toString(36).toUpperCase():_0x428170.toString(36),uuid;
	});
};

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
