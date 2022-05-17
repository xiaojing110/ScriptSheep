/*
读秒拼手速通用活动

第一个CK失效会退出脚本

请求太频繁会被黑ip

变量：
//export jd_wxSecond_activityId="活动ID"

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#读秒拼手速通用活动
1 1 1 1 * jd_wxSecond.js, tag=读秒拼手速通用活动, enabled=true

*/

const $ = new Env('读秒拼手速通用活动');

const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x5edc90=>{
		cookiesArr.push(jdCookieNode[_0x5edc90]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x4dd446=>_0x4dd446.cookie)].filter(_0x239ce6=>!!_0x239ce6);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let jd_wxSecond_activityId='';
jd_wxSecond_activityId=$.isNode()?process.env.jd_wxSecond_activityId?process.env.jd_wxSecond_activityId:''+jd_wxSecond_activityId:$.getdata('jd_wxSecond_activityId')?$.getdata('jd_wxSecond_activityId'):''+jd_wxSecond_activityId;
!(async()=>{
	if(!jd_wxSecond_activityId){
		console.log('\n请填写读秒拼手速的活动ID,变量是jd_wxSecond_activityId\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxSecond_activityId;
	$.shareUuid='';
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId);
	for(let _0x4f1330=0;_0x4f1330<cookiesArr.length;_0x4f1330++){
		cookie=cookiesArr[_0x4f1330];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x4f1330+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((_0x4f1330==0)&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}
	cookie=cookiesArr[0];
	if(cookie&&$.assistStatus&&!$.outFlag&&!$.activityEnd){
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.index=1;
		message='';
		$.bean=0;
		$.hotFlag=false;
		$.nickName='';
		console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
		await $.wait(parseInt(Math.random()*2000+4000,10));
		await getUA();
		await run();
		await $.wait(3000);
	}if($.outFlag){
		let _0x342948='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x342948);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x342948);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0xc2da9=>$.logErr(_0xc2da9)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x4aec8d=false;
		await takePostRequest('isvObfuscator');
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await getCk();
		if(activityCookie==''){
			console.log('获取cookie失败');
			return;
		}
		if($.activityEnd===true){
			console.log('活动结束');
			return;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		if($.openCard==false){
			console.log('抱歉，没有开通此店铺的会员，无法参与活动');
			return;
		}
		await takePostRequest('activityContent');
		await $.wait(1000);
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		console.log('活动获取成功，助力码：'+$.actorUuid+'\n默认不开卡，请手动进入活动页面开卡\n');
		console.log('当前参加活动：'+$.name+'\n当前可游戏次数：'+$.score+'次\n游戏读秒：'+$.targetTime+'\n');
		if($.score>0){
			console.log('开始游戏......');
			let _0x496ddb=parseInt($.score/1);
			console.log('当前可游戏次数为:'+_0x496ddb);
			for(m=1;_0x496ddb--;m++){
				console.log('第'+m+'次游戏');
				await takePostRequest('start');
				if($.runFalag==false)break;
				if(Number(_0x50d9c2)<=0)break;
				if(m>=5){
					console.log('游戏太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*3000+3000,10));
			}
		}else{
			$.assistStatus=true;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('后面的号都会助力:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x161e39){
		console.log(_0x161e39);
	}
}
async function takePostRequest(_0x12ab2c){
	if($.outFlag)return;
	let _0x543224='https://lzkjdz-isv.isvjcloud.com';
	let _0x4ad01e='';
	let _0x50ca40='POST';
	let _0x35eec6='';
	switch(_0x12ab2c){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x4ad01e='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=_0x543224+'/customer/getMyPing';
			_0x4ad01e='token='+$.Token+'&fromType=APP&userId='+($.shopId||$.venderId||'')+'&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x543224+'/customer/getSimpleActInfoVo';
			_0x4ad01e='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=_0x543224+'/wxCommonInfo/getActMemberInfo';
			_0x4ad01e='venderId='+($.shopId||$.venderId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=_0x543224+'/common/accessLogWithAD';
			let _0x1fe4e5='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x4ad01e='venderId='+($.shopId||$.venderId||'')+'&code=71&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x1fe4e5)+'&subType=app&adSource=';
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x543224+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x4ad01e='venderId='+($.shopId||$.venderId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x543224+'/wxSecond/getData';
			_0x4ad01e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid+'&activityStatus=';
			break;
		case 'getDrawRecordHasCoupon':
			url=_0x543224+'/wxSecond/myPrize';
			_0x4ad01e='activityId='+$.activityId+'&uuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=_0x543224+'/dingzhi/taskact/common/getShareRecord';
			_0x4ad01e='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case'start':
			url=_0x543224+'/wxSecond/start';
			_0x4ad01e='activityId='+$.activityId+'&uuid='+$.actorUuid+'&seconds='+$.targetTime;
			break;
		default:
			console.log('错误'+_0x12ab2c);
	}
	let _0x39e069=getPostRequest(url,_0x5703a3,_0x50ca40);
	return new Promise(async _0x54df7e=>{
		$.post(_0x39e069,(_0x15e77f,_0x3ea548,_0x30dfb9)=>{
			try{
				setActivityCookie(_0x3ea548);
				if(_0x15e77f){
					if(_0x3ea548&&(typeof _0x3ea548.statusCode!='undefined')){
						if(_0x3ea548.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x15e77f,_0x15e77f));
					console.log(_0x12ab2c+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x12ab2c,_0x30dfb9);
				}
			}catch(_0x2802a9){
				console.log(_0x2802a9,_0x3ea548);
			}
			finally{
				_0x54df7e();
			}
		});
	});
}
async function dealReturn(_0x4d2451,_0x188cbc){
	let _0x159985='';
	try{
		if(_0x4d2451!='accessLogWithAD'||(_0x4d2451!='drawContent')){
			if(_0x188cbc){
				_0x159985=JSON.parse(_0x188cbc);
			}
		}
	}catch(_0x37a275){
		console.log(_0x4d2451+' 执行任务异常');
		console.log(_0x188cbc);
		$.runFalag=false;
	}try{
		switch(_0x4d2451){
			case 'isvObfuscator':
				if(typeof _0x159985=='object'){
					if(_0x159985.errcode==0){
					if(typeof _0x159985.token!='undefined')$.Token=_0x159985.token;
				}else if(_0x159985.message){
					console.log('isvObfuscator '+(_0x159985.message||''));
				}else{
					console.log(_0x188cbc);
				}
				}else{
					console.log(_0x188cbc);
				}
				break;
			case 'getMyPing':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&(_0x159985.result===true)){
					if(_0x159985.data&&(typeof _0x159985.data.secretPin!='undefined'))$.Pin=_0x159985.data.secretPin;
					if(_0x159985.data&&(typeof _0x159985.data.nickname!='undefined'))$.nickname=_0x159985.data.nickname;
				}else if(_0x159985.errorMessage){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&(_0x159985.result===true)){
					if(typeof _0x159985.data.shopId!='undefined')$.shopId=_0x159985.data.shopId;
					if(typeof _0x159985.data.venderId!='undefined')$.venderId=_0x159985.data.venderId;
				}else if(_0x159985.errorMessage){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'getActMemberInfo':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&(_0x159985.result===true)){
					$.openCard=_0x159985.data.openCard||false;
				}else if(_0x159985.errorMessage){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'activityContent':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&_0x159985.result===true){
					$.actorUuid=_0x159985.data.uuid||'';
					$.name=_0x159985.data.secondActive.name||'';
					$.targetTime=_0x159985.data.secondActive.targetTime||'';
					$.score=_0x159985.data.score||0;
					if(_0x159985.data.sendBeanNum){
						console.log('获得'+_0x159985.data.sendBeanNum+'豆');
						allMessage+='【账号'+$.index+'】获得'+_0x159985.data.sendBeanNum+'豆\n';
					}
				}else if(_0x159985.errorMessage){
					if(_0x159985.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'getOpenCardStatusWithOutSelf':
				if(typeof _0x159985=='object'){
					if(_0x159985.isOk){
					$.allOpenCard=_0x159985.openCard||false;
				}else if(_0x159985.errorMessage||_0x159985.msg){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||_0x159985.msg||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case'getDrawRecordHasCoupon':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&_0x159985.result===true){
					console.log('我的奖品：');
					for(let _0x36a0cb in _0x159985.data){
						$.item=_0x36a0cb.name;
						console.log(''+$.item);
					}
				}else if(_0x159985.errorMessage){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'getShareRecord':
				if(typeof _0x159985=='object'){
					if(_0x159985.result&&(_0x159985.result===true)&&_0x159985.data){
					$.ShareCount=_0x159985.data.length;
					$.log('=========== 你邀请了:'+_0x159985.data.length+'个');
				}else if(_0x159985.errorMessage){
					console.log(_0x4d2451+' '+(_0x159985.errorMessage||''));
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				}else{
					console.log(_0x4d2451+' '+_0x188cbc);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x4d2451+'-> '+_0x188cbc);
		}
		if(typeof _0x159985=='object'){
			if(_0x159985.errorMessage){
				if(_0x159985.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1fcf38){
		console.log(_0x1fcf38);
	}
}
function getPostRequest(_0x2b09ae,_0x258a94,_0x4c0dc5='POST'){
	let _0x4d8468={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x2b09ae.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x4d8468.Referer='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x4d8468.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin)+';'||'')+activityCookie;
	}
	return{'url':_0x2b09ae,'method':_0x4c0dc5,'headers':_0x4d8468,'body':_0x258a94,'timeout':30000};
}
function getCk(){
	return new Promise(_0xfa5e35=>{
		let _0xc9f45d={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0xc9f45d,async(_0xb5abdb,_0x5ea693,_0x4ba5e5)=>{
			try{
				if(_0xb5abdb){
					if(_0x5ea693&&(typeof _0x5ea693.statusCode!='undefined')){
						if(_0x5ea693.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0xb5abdb));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0xd1d16c=_0x4ba5e5.match(/(活动已经结束)/)&&_0x4ba5e5.match(/(活动已经结束)/)[1]||'';
					if(_0xd1d16c){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x5ea693);
				}
			}catch(_0x297f6a){
				$.logErr(_0x297f6a,_0x5ea693);
			}
			finally{
				_0xfa5e35();
			}
		});
	});
}
function setActivityCookie(_0x488cbd){
	let _0x539c87='';
	let _0x4194fb='';
	let _0x148e34='';
	let _0x123f5c=_0x488cbd&&_0x488cbd.headers&&(_0x488cbd.headers['set-cookie']||_0x488cbd.headers['Set-Cookie']||'')||'';
	let _0x8aafa7='';
	if(_0x123f5c){
		if(typeof _0x123f5c!='object'){
			_0x8aafa7=_0x123f5c.split(',');
		}else _0x8aafa7=_0x123f5c;
		for(let _0x37b8b9 of _0x8aafa7){
			let _0x24b7e1=_0x37b8b9.split(';')[0].trim();
			if(_0x24b7e1.split('=')[1]){
				if(_0x24b7e1.indexOf('LZ_TOKEN_KEY=')>-1)_0x539c87=(_0x24b7e1.replace(/ /g,'')+';');
				if(_0x24b7e1.indexOf('LZ_TOKEN_VALUE=')>-1)_0x4194fb=(_0x24b7e1.replace(/ /g,'')+';');
				if(_0x24b7e1.indexOf('lz_jdpin_token=')>-1)_0x148e34=(''+_0x236621+';');
			}
		}
	}
	if(_0x539c87&&_0x4194fb)activityCookie=_0x539c87+' '+_0x4194fb;
	if(_0x148e34)lz_jdpin_token_cookie=_0x148e34;
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x4077c6){
	_0x4077c6=_0x4077c6||32;
	let _0x281de8='abcdef0123456789',_0x5e6aad=_0x281de8.length,_0x2b9c18='';
	for(i=0;i<_0x53e8f8;i++)_0x2b9c18+=_0x281de8.charAt(Math.floor(Math.random()*_0x5e6aad));
	return _0x2b9c18;
}
function jsonParse(_0x37f565){
	if(typeof _0x37f565=='string'){
		try{
			return JSON.parse(_0x37f565);
		}catch(_0xc6fa61){
			console.log(_0xc6fa61);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

