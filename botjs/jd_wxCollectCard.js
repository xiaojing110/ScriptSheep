/*
集卡抽奖通用活动

第一个CK失效会退出脚本

6.15更新：自动开通店铺会员

请求太频繁会被黑ip

变量：
//export jd_wxCollectCard_activityId="活动ID"
活动网址：
//https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId=xxxxxxx

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#集卡抽奖通用活动
1 1 1 1 * jd_wxCollectCard.js, tag=集卡抽奖通用活动, enabled=true

*/

const $ = new Env('集卡抽奖通用活动');

const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x5785c6=>{
		cookiesArr.push(jdCookieNode[_0x5785c6]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(_0x1b2700=>_0x1b2700.cookie)].filter(_0x22a28b=>!!_0x22a28b);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let lz_cookie={};
let jd_wxCollectCard_activityId='';
jd_wxCollectCard_activityId=$.isNode()?process.env.jd_wxCollectCard_activityId?process.env.jd_wxCollectCard_activityId:''+jd_wxCollectCard_activityId:$.getdata('jd_wxCollectCard_activityId')?$.getdata('jd_wxCollectCard_activityId'):''+jd_wxCollectCard_activityId;
!(async()=>{
	if(!jd_wxCollectCard_activityId){
		console.log('\n衰仔、请填写集卡抽奖的活动ID,变量是jd_wxCollectCard_activityId\n');
		return;
	}
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxCollectCard_activityId;
	$.shareUuid='';
	console.log('入口:\nhttps://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId);
	for(let _0x31de34=0;_0x31de34<cookiesArr.length;_0x31de34++){
		cookie=cookiesArr[_0x31de34];
		originCookie=cookiesArr[_0x31de34];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(_0x31de34+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((_0x31de34==0)&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
			if($.hasEnd)break;
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
		console.log('\n\n开始抽奖【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		await getUA();
		await runs();
		await $.wait(3000);
	}if($.outFlag){
		let _0x36ddad='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x36ddad);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x36ddad);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(_0x15cad6=>$.logErr(_0x15cad6)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xfba1a4=false;
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
		await $.wait(1000);
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		if(!$.openCard){
			$.shopactivityId='';
			$.joinVenderId=$.venderId;
			await getshopactivityId();
			for(let _0x22a6bf=0;_0x22a6bf<Array(5).length;_0x22a6bf++){
				if(_0x22a6bf>0)console.log('第'+_0x22a6bf+'次 重新开卡');
				await joinShop();
				await $.wait(500);
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
		}
		await takePostRequest('getUserInfo');
		await $.wait(1000);
		await takePostRequest('activityContent');
		await takePostRequest('shopInfo');
		await takePostRequest('saveSource');
		await $.wait(1000);
		if($.index==1){
			console.log('活动获取成功，助力码：'+$.actorUuid+'\n');
			console.log('\n当前活动店铺：'+$.shopName+'\n当前集卡成功人数：'+$.gatherCount+'\n');
			console.log('目前已集齐卡片详情：');
			for(const _0x137605 of $.cardList){
				_0xfba1a4=true;
				$.cardName=_0x137605.cardName;
				$.count=_0x137605.count;
				console.log('卡片：'+$.cardName+' , '+$.count+'张');
			}
			$.assistStatus=true;
		}
		if($.index!=1){
			await takePostRequest('drawCard');
			await takePostRequest('drawCard2');
		}
		if($.hotFlag)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('\n衰仔、全部助力→:'+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x268d46){
		console.log(_0x268d46);
	}
}
async function runs(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let _0xd41ae6=false;
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
		await $.wait(1000);
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await $.wait(1000);
		await takePostRequest('getActMemberInfo');
		await takePostRequest('getUserInfo');
		await $.wait(1000);
		await takePostRequest('activityContent');
		await takePostRequest('shopInfo');
		await $.wait(1000);
		await takePostRequest('saveSource');
		await $.wait(1000);
		console.log('\n当前活动店铺：'+$.shopName+'\n当前集卡成功人数：'+$.gatherCount+'\n');
		console.log('目前已集齐卡片详情：');
		const _0x340660=new Set();
		for(const _0xb5c181 of $.cardList){
			_0xd41ae6=true;
			$.cardName=_0xb5c181.cardName;
			$.count=_0xb5c181.count;
			(_0xb5c181.count>=0)?_0x340660.add(_0xb5c181.count):'';
			console.log('卡片：'+$.cardName+' , '+$.count+'张');
		}
		console.log('\n当前活动每人可抽卡：'+$.drawCounts+'次');
		await takePostRequest('drawCard3');
		for(let _0x6c3814=0;_0x6c3814<$.canShakeTimes;_0x6c3814++){
			console.log('第'+(_0x6c3814+1)+'次抽奖');
			await takePostRequest('drawCard3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		var _0x577622=Array.from(_0x340660);
		var _0x31b056=getMaxMin(_0x577622,'min');
		console.log('\n目前已集齐可抽奖：'+_0x31b056+' 次');
		for(let _0x1a4d71=0;_0x1a4d71<_0x31b056;_0x1a4d71++){
			console.log('第'+(_0x1a4d71+1)+'次抽奖');
			await takePostRequest('getPrize');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.hotFlag)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(_0x3bc9e7){
		console.log(_0x3bc9e7);
	}
}
async function takePostRequest(_0x867f58){
	if($.outFlag)return;
	let _0x13cd73='https://lzkjdz-isv.isvjcloud.com';
	let _0x27b4b0='';
	let _0x46e476='POST';
	let _0x5722c4='';
	switch(_0x867f58){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x27b4b0='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=_0x13cd73+'/customer/getMyPing';
			_0x27b4b0='token='+$.Token+'&fromType=APP&userId='+$.venderId;
			break;
		case 'shopInfo':
			url=_0x13cd73+'/wxCollectCard/shopInfo';
			_0x27b4b0='activityId='+$.activityId;
			break;
		case 'getSimpleActInfoVo':
			url=_0x13cd73+'/customer/getSimpleActInfoVo';
			_0x27b4b0='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=_0x13cd73+'/wxCommonInfo/getActMemberInfo';
			_0x27b4b0='venderId='+$.venderId+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=_0x13cd73+'/common/accessLogWithAD';
			let _0x595400='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			_0x27b4b0='venderId='+($.shopId||$.venderId||'')+'&code=42&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(_0x595400)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=_0x13cd73+'/wxActionCommon/getUserInfo';
			_0x27b4b0='pin='+encodeURIComponent($.Pin);
			break;
		case 'drawCard':
			url=_0x13cd73+'/wxCollectCard/drawCard';
			_0x27b4b0='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick)+'&type=1';
			break;
		case 'drawCard2':
			url=_0x13cd73+'/wxCollectCard/drawCard';
			_0x27b4b0='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&type=2';
			break;
		case 'drawCard3':
			url=_0x13cd73+'/wxCollectCard/drawCard';
			_0x27b4b0='&sourceId='+$.actorUuid+'&activityId='+$.activityId+'&type=0';
			break;
		case 'drawContent':
			url=_0x13cd73+'/wxCollectCard/drawContent';
			_0x27b4b0='activityId='+$.activityId;
			break;
		case 'activityContent':
			url=_0x13cd73+'/wxCollectCard/activityContent';
			_0x27b4b0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		case 'saveSource':
			url=_0x13cd73+'/wxCollectCard/saveSource';
			_0x27b4b0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick);
			break;
		case 'drawResult':
			url=_0x13cd73+'/wxCollectCard/drawResult';
			_0x27b4b0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'followShop':
			url=_0x13cd73+'/wxActionCommon/followShop';
			_0x27b4b0='userId='+$.venderId+'&activityType=70&buyerNick='+encodeURIComponent($.Pin)+'&activityId='+$.activityId;
			break;
		case 'getPrize':
			url=_0x13cd73+'/wxCollectCard/getPrize';
			_0x27b4b0='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+_0x867f58);
	}
	let _0x539cb4=getPostRequest(url,_0x27b4b0,_0x46e476);
	return new Promise(async _0xd2ac35=>{
		$.post(_0x539cb4,(_0x2957ca,_0x2242ab,_0x3d9737)=>{
			try{
				setActivityCookie(_0x2242ab);
				if(_0x2957ca){
					if(_0x2242ab&&(typeof _0x2242ab.statusCode!='undefined')){
						if(_0x2242ab.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x2957ca,_0x2957ca));
					console.log(_0x867f58+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x867f58,_0x3d9737);
				}
			}catch(_0x34e1f1){
				console.log(_0x34e1f1,_0x2242ab);
			}
			finally{
				_0xd2ac35();
			}
		});
	});
}
async function dealReturn(_0x188610,_0x4db31d){
	let _0x15c35c='';
	try{
		if((_0x188610!='accessLogWithAD')||(_0x188610!='drawContent')){
			if(_0x4db31d){
				_0x15c35c=JSON.parse(_0x4db31d);
			}
		}
	}catch(_0x41b872){
		console.log(_0x188610+' 执行任务异常');
		console.log(_0x4db31d);
		$.runFalag=false;
	}try{
		switch(_0x188610){
			case 'isvObfuscator':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.errcode==0){
					if(typeof _0x15c35c.token!='undefined')$.Token=_0x15c35c.token;
				}else if(_0x15c35c.message){
					console.log('isvObfuscator '+(_0x15c35c.message||''));
				}else{
					console.log(_0x4db31d);
				}
				}else{
					console.log(_0x4db31d);
				}
				break;
			case 'getMyPing':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					if(_0x15c35c.data&&(typeof _0x15c35c.data.secretPin!='undefined'))$.Pin=_0x15c35c.data.secretPin;
					if(_0x15c35c.data&&(typeof _0x15c35c.data.nickname!='undefined'))$.nickname=_0x15c35c.data.nickname;
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{}
				break;
			case 'shopInfo':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.shopName=_0x15c35c.data.shopName||'';
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					if(typeof _0x15c35c.data.shopId!='undefined')$.shopId=_0x15c35c.data.shopId;
					if(typeof _0x15c35c.data.venderId!='undefined')$.venderId=_0x15c35c.data.venderId;
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{}
				break;
			case 'getUserInfo':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.pinImg=_0x15c35c.data.yunMidImageUrl||'';
					$.jdNick=_0x15c35c.data.nickname||'';
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'activityContent':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.cardList=_0x15c35c.data.cardList||[];
					$.helpStatus=_0x15c35c.data.canDraw||false;
					$.canShake=_0x15c35c.data.canShake||true;
					$.canCreate=_0x15c35c.data.canCreate||true;
					$.canAssist=_0x15c35c.data.canAssist||true;
					$.gatherCount=_0x15c35c.data.gatherCount||0;
					$.drawCount=_0x15c35c.data.rule.match(/每人每天可获得(\d+)次/);
					if($.drawCount){
						$.drawCounts=$.drawCount[1];
					}
				}else if(_0x15c35c.errorMessage){
					if(_0x15c35c.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(''+(_0x15c35c.errorMessage||''));
				}else{
					console.log(''+_0x4db31d);
				}
				}else{
					console.log(''+_0x4db31d);
				}
				break;
			case 'saveSource':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.actorUuid=_0x15c35c.data||'';
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'drawCard':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					console.log('获得：'+(_0x15c35c.data.reward.cardName||''));
				}else if(_0x15c35c.errorMessage){
					console.log(''+(_0x15c35c.errorMessage||''));
				}else{
					console.log(''+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'drawCard2':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					console.log('获得：'+(_0x15c35c.data.reward.cardName||''));
				}else if(_0x15c35c.errorMessage){
					console.log(''+(_0x15c35c.errorMessage||''));
				}else{
					console.log(''+_0x4db31d);
				}
				}else{}
				break;
			case 'drawCard3':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.canShakeTimes=_0x15c35c.data.canShakeTimes||0;
					console.log('获得：'+(_0x15c35c.data.reward.cardName||''));
				}else if(_0x15c35c.errorMessage){
					console.log(' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(''+_0x4db31d);
				}
				}else{}
				break;
			case 'getPrize':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)&&(_0x15c35c.result.drawOk===true)){
					console.log('获得：'+(_0x15c35c.data.name||''));
				}else if(_0x15c35c.errorMessage){
					console.log(' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(''+_0x4db31d);
				}
				}else{}
				break;
			case 'drawContent':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.content=_0x15c35c.data.content||[];
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'getActMemberInfo':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					$.openCard=_0x15c35c.data.openCard||false;
				}else if(_0x15c35c.errorMessage){
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'drawResult':
				if(typeof _0x15c35c=='object'){
					if(_0x15c35c.result&&(_0x15c35c.result===true)){
					if(typeof _0x15c35c.data=='object'){
						let _0xad7d0e='';
						if(_0x15c35c.data.drawName){
							_0xad7d0e=''+_0x15c35c.data.drawName;
						}
						if(!_0xad7d0e){
							_0xad7d0e='空气💨';
						}
						console.log('获得:'+(_0xad7d0e||_0x4db31d));
					}else{
						console.log(_0x188610+' '+_0x4db31d);
					}
				}else if(_0x15c35c.errorMessage){
					$.runFalag=false;
					console.log(_0x188610+' '+(_0x15c35c.errorMessage||''));
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				}else{
					console.log(_0x188610+' '+_0x4db31d);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(_0x188610+'-> '+_0x4db31d);
		}
		if(typeof _0x15c35c=='object'){
			if(_0x15c35c.errorMessage){
				if(_0x15c35c.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(_0x2be751){
		console.log(_0x2be751);
	}
}
function getPostRequest(_0x1a1d59,_0x540af6,_0x385840='POST'){
	let _0x158960={'Accept':'application/json, text/javascript, */*; q=0.01','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(_0x1a1d59.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		_0x158960.Origin='https://lzkjdz-isv.isvjcloud.com';
		_0x158960.Referer='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		_0x158960.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':_0x1a1d59,'method':_0x385840,'headers':_0x158960,'body':_0x540af6,'timeout':30000};
}
function getCk(){
	return new Promise(_0x1a2e57=>{
		let _0x259709={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId,'User-Agent':$.UA},'timeout':30000};
		$.get(_0x259709,async(_0x4c8c0d,_0xf61fe4,_0x3ecf58)=>{
			try{
				if(_0x4c8c0d){
					if(_0xf61fe4&&(typeof _0xf61fe4.statusCode!='undefined')){
						if(_0xf61fe4.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(_0x4c8c0d));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x417900=_0x3ecf58.match(/(活动已经结束)/)&&_0x3ecf58.match(/(活动已经结束)/)[1]||'';
					if(_0x417900){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(_0xf61fe4);
				}
			}catch(_0x315928){
				$.logErr(_0x315928,_0xf61fe4);
			}
			finally{
				_0x1a2e57();
			}
		});
	});
}
function setActivityCookie(_0x9a019a){
	if(_0x9a019a.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x119743 of _0x9a019a.headers['set-cookie']){
			lz_cookie[_0x119743.split(';')[0].substr(0,_0x119743.split(';')[0].indexOf('='))]=_0x119743.split(';')[0].substr(_0x119743.split(';')[0].indexOf('=')+1);
		}
		for(const _0xb764bf of Object.keys(lz_cookie)){
			cookie+=(_0xb764bf+'='+lz_cookie[_0xb764bf]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x2f6f2c){
	_0x2f6f2c=(_0x2f6f2c||32);
	let _0x49a3ac='abcdef0123456789',_0xcccaf9=_0x49a3ac.length,_0x3ba979='';
	for(i=0;i<_0x2f6f2c;i++)_0x3ba979+=_0x49a3ac.charAt(Math.floor(Math.random()*_0xcccaf9));
	return _0x3ba979;
}
function getMaxMin(_0x2aa5df,_0x3d3c62){
	if(_0x3d3c62==='max'){
		return Math.max.apply(Math,_0x2aa5df);
	}else if(_0x3d3c62==='min'){
		return Math.min.apply(Math,_0x2aa5df);
	}
}
function jsonParse(_0x38e0d4){
	if(typeof _0x38e0d4=='string'){
		try{
			return JSON.parse(_0x38e0d4);
		}catch(_0x163ae1){
			console.log(_0x163ae1);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x83dbc8=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x41bc43='';
		if($.shopactivityId)_0x41bc43=',"activityId":'+$.shopactivityId;
		let _0x863f9a='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x41bc43+',"channel":406}';
		let _0x57b077=await geth5st();
		const _0x74fa59={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x863f9a+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x57b077,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x74fa59,async(_0x573338,_0x64b708,_0x1bb1fc)=>{
			try{
				_0x1bb1fc=_0x1bb1fc&&_0x1bb1fc.match(/jsonp_.*?\((.*?)\);/)&&_0x1bb1fc.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1bb1fc;
				let _0x2e110c=$.toObj(_0x1bb1fc,_0x1bb1fc);
				if(_0x2e110c&&(typeof _0x2e110c=='object')){
					if(_0x2e110c&&(_0x2e110c.success===true)){
						console.log(_0x2e110c.message);
						$.errorJoinShop=_0x2e110c.message;
						if(_0x2e110c.result&&_0x2e110c.result.giftInfo){
							for(let _0x2955b6 of _0x2e110c.result.giftInfo.giftList){
								console.log('入会获得:'+_0x2955b6.discountString+_0x2955b6.prizeName+_0x2955b6.secondLineDesc);
							}
						}
					}else if(_0x2e110c&&(typeof _0x2e110c=='object')&&_0x2e110c.message){
						$.errorJoinShop=_0x2e110c.message;
						console.log(''+(_0x2e110c.message||''));
					}else{
						console.log(_0x1bb1fc);
					}
				}else{
					console.log(_0x1bb1fc);
				}
			}catch(_0x2fe5f4){
				$.logErr(_0x2fe5f4,_0x64b708);
			}
			finally{
				_0x83dbc8();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x1d4f93=>{
		let _0x1dd312='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x2b61a1=await geth5st();
		const _0x8cc6c={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x1dd312+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x2b61a1,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x8cc6c,async(_0xe3759e,_0x1b9bc5,_0x11f2e8)=>{
			try{
				_0x11f2e8=_0x11f2e8&&_0x11f2e8.match(/jsonp_.*?\((.*?)\);/)&&_0x11f2e8.match(/jsonp_.*?\((.*?)\);/)[1]||_0x11f2e8;
				let _0x5316ba=$.toObj(_0x11f2e8,_0x11f2e8);
				if(_0x5316ba&&(typeof _0x5316ba=='object')){
					if(_0x5316ba&&(_0x5316ba.success==true)){
						console.log('入会:'+(_0x5316ba.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x5316ba.result.interestsRuleList&&_0x5316ba.result.interestsRuleList[0]&&_0x5316ba.result.interestsRuleList[0].interestsInfo&&_0x5316ba.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x11f2e8);
				}
			}catch(_0x3d7567){
				$.logErr(_0x3d7567,_0x1b9bc5);
			}
			finally{
				_0x1d4f93();
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

