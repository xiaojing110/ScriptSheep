/*
读秒拼手速通用活动

第一个CK失效会退出脚本

请求太频繁会被黑ip

6.14更新：自动开通店铺会员，做任务、游戏

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
let lz_cookie={};
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x4c1e80=>{
		cookiesArr.push(jdCookieNode[_0x4c1e80]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x39beb4=>_0x39beb4.cookie)].filter(_0x86fd18=>!!_0x86fd18);
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
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxSecond_activityId;
	$.shareUuid='';
	$.activityUrl='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId;
	console.log('活动入口: '+$.activityUrl);
	for(let _0x219801=0;_0x219801<cookiesArr.length;_0x219801++){
		cookie=cookiesArr[_0x219801];
		originCookie=cookiesArr[_0x219801];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0x219801+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'******\n');
			await getUA();
			await run();
			await $.wait(2000);
			if($.outFlag)break;
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
		console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'******\n');
		await $.wait(parseInt(Math.random()*2000+4000,10));
		await getUA();
		await run();
	}if($.outFlag){
		let _0x56039e='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x56039e);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x56039e);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x50c454=>$.logErr(_0x50c454)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0x3e491e=false;
		await takePostRequest('isvObfuscator');
		await $.wait(500);
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
		await takePostRequest('getActMemberInfo');
		if(!$.openCard){
			$.shopactivityId='';
			$.joinVenderId=$.venderId;
			await getshopactivityId();
			for(let _0x426d59=0;_0x426d59<Array(5).length;_0x426d59++){
				if(_0x426d59>0)console.log('第'+_0x426d59+'次 重新开卡');
				await joinShop();
				await $.wait(500);
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
		}
		await takePostRequest('activityContent');
		await $.wait(500);
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		console.log('助力码：'+$.actorUuid);
		for(let _0x4c91a2=0;_0x4c91a2<3;_0x4c91a2++){
			if(_0x4c91a2==0){
				await takePostRequest('getTaskGame');
			}else if(_0x4c91a2==1){
				await takePostRequest('getTaskDay');
			}else{
				await takePostRequest('getTask');
			}
			await $.wait(500);
			var _0x48ca75=[2,3,4,5];
			if($.tasklist.length>0){
				for(let _0x426d59=0;_0x426d59<$.tasklist.length;_0x426d59++){
					$.taskType=$.tasklist[_0x426d59].taskType;
					$.commodity=$.tasklist[_0x426d59].commodity;
					$.dayMaxNumber=$.tasklist[_0x426d59].dayMaxNumber;
					$.finishNumber=$.tasklist[_0x426d59].finishNumber;
					$.needTimes=($.commodity*$.dayMaxNumber);
					if($.dayMaxNumber==$.finishNumber)continue;
					if(_0x48ca75.includes($.taskType)){
						console.log('');
						var _0x46015d='';
						switch($.taskType){
							case 2:
								_0x46015d='加购';
								break;
							case 3:
								_0x46015d='关注';
								break;
							case 4:
								_0x46015d='预约';
								break;
							case 5:
								_0x46015d='浏览';
								break;
							default:
								break;
						}
						$.activityTaskGoods=$.tasklist[_0x426d59].activityTaskGoods;
						for(let _0x52c76b=0;_0x52c76b<$.activityTaskGoods.length;_0x52c76b++){
							console.log('去'+_0x46015d+'商品：'+$.activityTaskGoods[_0x52c76b].skuNameShort);
							$.skuId=$.activityTaskGoods[_0x52c76b].skuId;
							await takePostRequest('finishTask');
							await $.wait(500);
							if($.taskResult)$.score+=$.newScore;
							if(_0x52c76b==$.needTimes-1)break;
						}
					}else{
						$.skuId='';
						switch($.taskType){
							case 1:
								console.log('\n去关注店铺');
								await takePostRequest('finishTask');
								await $.wait(500);
								if($.taskResult)$.score+=$.newScore;
								break;
							case 9:
								break;
							case 12:
								console.log('\n去逛会场：'+$.tasklist[_0x426d59].name);
								await takePostRequest('finishTask');
								await $.wait(500);
								if($.taskResult)$.score+=$.newScore;
								break;
							case 99:
								break;
							default:
								break;
						}
					}
				}
			}
		}
		console.log('\n剩余次数: '+$.score+'次\n读秒时长: '+$.targetTime+'\n');
		if($.score>0){
			let _0x18f548=parseInt($.score/1);
			for(m=1;_0x18f548--;m++){
				console.log('开始第'+m+'次挑战');
				await takePostRequest('start');
				if($.runFalag==false)break;
				if(Number(_0x18f548)<=0)break;
				if(m>=10){
					console.log('\n挑战太多次了，下次再继续吧～');
					break;
				}
				await $.wait(parseInt(Math.random()*3000+1000,10));
			}
		}else{
			$.assistStatus=true;
		}
		await $.wait(1000);
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('\n后面的号都会助力 => '+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x4176e9){
		console.log(_0x4176e9);
	}
}
async function takePostRequest(_0x5a98ec){
	if($.outFlag)return;
	let _0x594fab='https://lzkjdz-isv.isvjcloud.com';
	let _0x259719='';
	let _0x596c35='POST';
	let _0x449d1c='';
	switch(_0x5a98ec){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x259719='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=_0x594fab+'/customer/getMyPing';
			_0x259719='token='+$.Token+'&fromType=APP&userId='+$.venderId+'&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=_0x594fab+'/customer/getSimpleActInfoVo';
			_0x259719='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=_0x594fab+'/wxCommonInfo/getActMemberInfo';
			_0x259719='venderId='+($.venderId||$.shopId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=_0x594fab+'/common/accessLogWithAD';
			let _0x27cdec='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x259719='venderId='+($.venderId||$.shopId||'')+'&code=71&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x27cdec)+'&subType=app&adSource=';
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=_0x594fab+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			_0x259719='venderId='+($.venderId||$.shopId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=_0x594fab+'/wxSecond/getData';
			_0x259719='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid+'&activityStatus=';
			break;
		case 'getTaskGame':
			url=_0x594fab+'/wxSecond/getTaskGame';
			_0x259719='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'getTaskDay':
			url=_0x594fab+'/wxSecond/getTaskDay';
			_0x259719='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'getTask':
			url=_0x594fab+'/wxSecond/getTask';
			_0x259719='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'finishTask':
			url=_0x594fab+'/wxSecond/finishTask';
			_0x259719='activityId='+$.activityId+'&uuid='+$.actorUuid+'&taskType='+$.taskType+'&skuId='+$.skuId;
			break;
		case 'start':
			url=_0x594fab+'/wxSecond/start';
			_0x259719='activityId='+$.activityId+'&uuid='+$.actorUuid+'&seconds='+$.targetTime;
			break;
		default:
			console.log('错误'+_0x5a98ec);
	}
	let _0x5d9885=getPostRequest(url,_0x259719,_0x596c35);
	return new Promise(async _0x2b6809=>{
		$.post(_0x5d9885,(_0x2a3f42,_0x461c95,_0x5c0e55)=>{
			try{
				setActivityCookie(_0x461c95);
				if(_0x2a3f42){
					if(_0x461c95&&(typeof _0x461c95.statusCode!='undefined')){
						if(_0x461c95.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2a3f42,_0x2a3f42));
					console.log(_0x5a98ec+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x5a98ec,_0x5c0e55);
				}
			}catch(_0xa120f2){
				console.log(_0xa120f2,_0x461c95);
			}
			finally{
				_0x2b6809();
			}
		});
	});
}
async function dealReturn(_0x4188e3,_0x6b7924){
	let _0x3fd814='';
	try{
		if((_0x4188e3!='accessLogWithAD')||(_0x4188e3!='drawContent')){
			if(_0x6b7924){
				_0x3fd814=JSON.parse(_0x6b7924);
			}
		}
	}catch(_0x8e9114){
		console.log(_0x4188e3+' 执行任务异常');
		console.log(_0x6b7924);
		$.runFalag=false;
	}try{
		switch(_0x4188e3){
			case 'isvObfuscator':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.errcode==0){
					if(typeof _0x3fd814.token!='undefined')$.Token=_0x3fd814.token;
				}else if(_0x3fd814.message){
					console.log('isvObfuscator '+(_0x3fd814.message||''));
				}else{
					console.log(_0x6b7924);
				}
				}else{
					console.log(_0x6b7924);
				}
				break;
			case 'getMyPing':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					if(_0x3fd814.data&&(typeof _0x3fd814.data.secretPin!='undefined'))$.Pin=_0x3fd814.data.secretPin;
					if(_0x3fd814.data&&(typeof _0x3fd814.data.nickname!='undefined')){
						$.nickname=_0x3fd814.data.nickname;
						console.log('你好，'+$.nickname);
					}
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					if(typeof _0x3fd814.data.shopId!='undefined')$.shopId=_0x3fd814.data.shopId;
					if(typeof _0x3fd814.data.venderId!='undefined')$.venderId=_0x3fd814.data.venderId;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'getActMemberInfo':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.openCard=_0x3fd814.data.openCard||false;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'activityContent':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.actorUuid=_0x3fd814.data.uuid||'';
					$.name=_0x3fd814.data.secondActive.name||'';
					$.targetTime=_0x3fd814.data.secondActive.targetTime||'';
					$.score=_0x3fd814.data.score||0;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'getTaskGame':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.tasklist=_0x3fd814.data;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'getTaskDay':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.tasklist=_0x3fd814.data;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'getTask':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.tasklist=_0x3fd814.data;
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'finishTask':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					$.taskResult=_0x3fd814.data;
					$.newScore=$.taskResult.score;
					console.log('  >> 任务完成');
				}else if(_0x3fd814.errorMessage){
					console.log('  >> '+(_0x3fd814.errorMessage||'任务失败'));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				break;
			case 'start':
				if(typeof _0x3fd814=='object'){
					if(_0x3fd814.result&&(_0x3fd814.result===true)){
					if(_0x3fd814.data.draw.drawOk===true){
						console.log('获得：'+_0x3fd814.data.draw.name);
					}else{
						console.log('空气💨');
					}
				}else if(_0x3fd814.errorMessage){
					console.log(_0x4188e3+' '+(_0x3fd814.errorMessage||''));
				}else{
					console.log(_0x4188e3+' '+_0x6b7924);
				}
				}else{
					console.log('抽了个寂寞～');
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x4188e3+'-> '+_0x6b7924);
		}
		if(typeof _0x3fd814=='object'){
			if(_0x3fd814.errorMessage){
				if(_0x3fd814.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x1bc14e){
		console.log(_0x1bc14e);
	}
}
function getPostRequest(_0x3b09ef,_0x49cc1f,_0x30f29e='POST'){
	let _0x433f41={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x3b09ef.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x433f41.Referer='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x433f41.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':_0x3b09ef,'method':_0x30f29e,'headers':_0x433f41,'body':_0x49cc1f,'timeout':30000};
}
function getCk(){
	return new Promise(_0x2482f3=>{
		let _0x146129={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x146129,async(_0x31d62a,_0x38b30a,_0x3de88f)=>{
			try{
				if(_0x31d62a){
					if(_0x38b30a&&(typeof _0x38b30a.statusCode!='undefined')){
						if(_0x38b30a.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x31d62a));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x286afa=_0x3de88f.match(/(活动已经结束)/)&&_0x3de88f.match(/(活动已经结束)/)[1]||'';
					if(_0x286afa){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0x38b30a);
				}
			}catch(_0x11af28){
				$.logErr(_0x11af28,_0x38b30a);
			}
			finally{
				_0x2482f3();
			}
		});
	});
}
function setActivityCookie(_0x173507){
	if(_0x173507.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x226412 of _0x173507.headers['set-cookie']){
			lz_cookie[_0x226412.split(';')[0].substr(0,_0x226412.split(';')[0].indexOf('='))]=_0x226412.split(';')[0].substr(_0x226412.split(';')[0].indexOf('=')+1);
		}
		for(const _0x3c91df of Object.keys(lz_cookie)){
			cookie+=(_0x3c91df+'='+lz_cookie[_0x3c91df]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x299059){
	_0x299059=(_0x299059||32);
	let _0x312b69='abcdef0123456789',_0x9dada9=_0x312b69.length,_0x395657='';
	for(i=0;i<_0x299059;i++)_0x395657+=_0x312b69.charAt(Math.floor(Math.random()*_0x9dada9));
	return _0x395657;
}
function jsonParse(_0x4d8b13){
	if(typeof _0x4d8b13=='string'){
		try{
			return JSON.parse(_0x4d8b13);
		}catch(_0x30e267){
			console.log(_0x30e267);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x53e988=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x45284e='';
		if($.shopactivityId)_0x45284e=',"activityId":'+$.shopactivityId;
		let _0x44740c='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x45284e+',"channel":406}';
		let _0x269a29=await geth5st();
		const _0x3278ed={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x44740c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x269a29,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x3278ed,async(_0x2d6f2e,_0x1555d5,_0x1ab7c1)=>{
			try{
				_0x1ab7c1=_0x1ab7c1&&_0x1ab7c1.match(/jsonp_.*?\((.*?)\);/)&&_0x1ab7c1.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1ab7c1;
				let _0xc8aaad=$.toObj(_0x1ab7c1,_0x1ab7c1);
				if(_0xc8aaad&&(typeof _0xc8aaad=='object')){
					if(_0xc8aaad&&(_0xc8aaad.success===true)){
						console.log(_0xc8aaad.message);
						$.errorJoinShop=_0xc8aaad.message;
						if(_0xc8aaad.result&&_0xc8aaad.result.giftInfo){
							for(let _0x4dd096 of _0xc8aaad.result.giftInfo.giftList){
								console.log('入会获得:'+_0x4dd096.discountString+_0x4dd096.prizeName+_0x4dd096.secondLineDesc);
							}
						}
					}else if(_0xc8aaad&&(typeof _0xc8aaad=='object')&&_0xc8aaad.message){
						$.errorJoinShop=_0xc8aaad.message;
						console.log(''+(_0xc8aaad.message||''));
					}else{
						console.log(_0x1ab7c1);
					}
				}else{
					console.log(_0x1ab7c1);
				}
			}catch(_0x14ca9d){
				$.logErr(_0x14ca9d,_0x1555d5);
			}
			finally{
				_0x53e988();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1c9f0d=>{
		let _0x1af8b0='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x4b0fe4=await geth5st();
		const _0x2be6ec={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1af8b0+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x4b0fe4,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x2be6ec,async(_0x11ae04,_0x3efcb5,_0x3f23b8)=>{
			try{
				_0x3f23b8=_0x3f23b8&&_0x3f23b8.match(/jsonp_.*?\((.*?)\);/)&&_0x3f23b8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x3f23b8;
				let _0x9991af=$.toObj(_0x3f23b8,_0x3f23b8);
				if(_0x9991af&&(typeof _0x9991af=='object')){
					if(_0x9991af&&(_0x9991af.success==true)){
						console.log('入会:'+(_0x9991af.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x9991af.result.interestsRuleList&&_0x9991af.result.interestsRuleList[0]&&_0x9991af.result.interestsRuleList[0].interestsInfo&&_0x9991af.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x3f23b8);
				}
			}catch(_0xe31ebf){
				$.logErr(_0xe31ebf,_0x3efcb5);
			}
			finally{
				_0x1c9f0d();
			}
		});
	});
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
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

