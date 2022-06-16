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
	Object.keys(jdCookieNode).forEach(OOOQOQQ=>{
		cookiesArr.push(jdCookieNode[OOOQOQQ]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(QOO0O0O=>QOO0O0O.cookie)].filter(OQO000O=>!!OQO000O);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
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
	for(let QO0OQQO=0;QO0OQQO<cookiesArr.length;QO0OQQO++){
		cookie=cookiesArr[QO0OQQO];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(QO0OQQO+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			await getUA();
			await run();
			await $.wait(3000);
			if((QO0OQQO==0)&&!$.actorUuid)break;
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
		let Q0QQ000='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+Q0QQ000);
		if($.isNode())await notify.sendNotify(''+$.name,''+Q0QQ000);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(QQQ0Q0Q=>$.logErr(QQQ0Q0Q)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let QQQQQ00=false;
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
			for(let QQOO0O0=0;QQOO0O0<Array(5).length;QQOO0O0++){
				if(QQOO0O0>0)console.log('第'+QQOO0O0+'次 重新开卡');
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
			for(const QQQQ0OQ of $.cardList){
				QQQQQ00=true;
				$.cardName=QQQQ0OQ.cardName;
				$.count=QQQQ0OQ.count;
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
	}catch(O0QQ00O){
		console.log(O0QQ00O);
	}
}
async function runs(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let QO00QQO=false;
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
		const OQQQ0Q0=new Set();
		for(const OO0OOOO of $.cardList){
			QO00QQO=true;
			$.cardName=OO0OOOO.cardName;
			$.count=OO0OOOO.count;
			(OO0OOOO.count>=0)?OQQQ0Q0.add(OO0OOOO.count):'';
			console.log('卡片：'+$.cardName+' , '+$.count+'张');
		}
		console.log('\n当前活动每人可抽卡：'+$.drawCounts+'次');
		await takePostRequest('drawCard3');
		for(let O0OQQQ0=0;O0OQQQ0<$.canShakeTimes;O0OQQQ0++){
			console.log('第'+O0OQQQ0+'次抽奖');
			await takePostRequest('drawCard3');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		var QQQO0OO=Array.from(OQQQ0Q0);
		var O0QQOOO=getMaxMin(QQQO0OO,'min');
		console.log('\n目前已集齐可抽奖：'+O0QQOOO+' 次');
		for(let QQQO0OQ=0;QQQO0OQ<O0QQOOO;QQQO0OQ++){
			console.log('第'+QQQO0OQ+'次抽奖');
			await takePostRequest('getPrize');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		if($.hotFlag)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(Q0O0QOO){
		console.log(Q0O0QOO);
	}
}
async function takePostRequest(OQQ0Q00){
	if($.outFlag)return;
	let Q0OOOO0='https://lzkjdz-isv.isvjcloud.com';
	let Q0QQOOQ='';
	let OQQOO0Q='POST';
	let QQQ00O0='';
	switch(OQQ0Q00){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			Q0QQOOQ='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=Q0OOOO0+'/customer/getMyPing';
			Q0QQOOQ='token='+$.Token+'&fromType=APP&userId='+$.venderId;
			break;
		case 'shopInfo':
			url=Q0OOOO0+'/wxCollectCard/shopInfo';
			Q0QQOOQ='activityId='+$.activityId;
			break;
		case 'getSimpleActInfoVo':
			url=Q0OOOO0+'/customer/getSimpleActInfoVo';
			Q0QQOOQ='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=Q0OOOO0+'/wxCommonInfo/getActMemberInfo';
			Q0QQOOQ='venderId='+$.venderId+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=Q0OOOO0+'/common/accessLogWithAD';
			let Q0OO00O='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			Q0QQOOQ='venderId='+($.shopId||$.venderId||'')+'&code=42&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(Q0OO00O)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=Q0OOOO0+'/wxActionCommon/getUserInfo';
			Q0QQOOQ='pin='+encodeURIComponent($.Pin);
			break;
		case 'drawCard':
			url=Q0OOOO0+'/wxCollectCard/drawCard';
			Q0QQOOQ='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick)+'&type=1';
			break;
		case 'drawCard2':
			url=Q0OOOO0+'/wxCollectCard/drawCard';
			Q0QQOOQ='&sourceId='+$.shareUuid+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&type=2';
			break;
		case 'drawCard3':
			url=Q0OOOO0+'/wxCollectCard/drawCard';
			Q0QQOOQ='&sourceId='+$.actorUuid+'&activityId='+$.activityId+'&type=0';
			break;
		case 'drawContent':
			url=Q0OOOO0+'/wxCollectCard/drawContent';
			Q0QQOOQ='activityId='+$.activityId;
			break;
		case 'activityContent':
			url=Q0OOOO0+'/wxCollectCard/activityContent';
			Q0QQOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.shareUuid;
			break;
		case 'saveSource':
			url=Q0OOOO0+'/wxCollectCard/saveSource';
			Q0QQOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+$.pinImg+'&jdNick='+encodeURIComponent($.jdNick);
			break;
		case 'drawResult':
			url=Q0OOOO0+'/wxCollectCard/drawResult';
			Q0QQOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'followShop':
			url=Q0OOOO0+'/wxActionCommon/followShop';
			Q0QQOOQ='userId='+$.venderId+'&activityType=70&buyerNick='+encodeURIComponent($.Pin)+'&activityId='+$.activityId;
			break;
		case 'getPrize':
			url=Q0OOOO0+'/wxCollectCard/getPrize';
			Q0QQOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+OQQ0Q00);
	}
	let OQQQ0O0=getPostRequest(url,Q0QQOOQ,OQQOO0Q);
	return new Promise(async QO00QOO=>{
		$.post(OQQQ0O0,(OQQOO0O,OO0OOQQ,OO0QQOO)=>{
			try{
				setActivityCookie(OO0OOQQ);
				if(OQQOO0O){
					if(OO0OOQQ&&(typeof OO0OOQQ.statusCode!='undefined')){
						if(OO0OOQQ.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(OQQOO0O,OQQOO0O));
					console.log(OQQ0Q00+' API请求失败，请检查网路重试');
				}else{
					dealReturn(OQQ0Q00,OO0QQOO);
				}
			}catch(O0OOOQ0){
				console.log(O0OOOQ0,OO0OOQQ);
			}
			finally{
				QO00QOO();
			}
		});
	});
}
async function dealReturn(OQQ00Q0,OQ0OQ00){
	let OQ0Q0QO='';
	try{
		if((OQQ00Q0!='accessLogWithAD')||(OQQ00Q0!='drawContent')){
			if(OQ0OQ00){
				OQ0Q0QO=JSON.parse(OQ0OQ00);
			}
		}
	}catch(OOQOOO0){
		console.log(OQQ00Q0+' 执行任务异常');
		console.log(OQ0OQ00);
		$.runFalag=false;
	}try{
		switch(OQQ00Q0){
			case 'isvObfuscator':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.errcode==0){
					if(typeof OQ0Q0QO.token!='undefined')$.Token=OQ0Q0QO.token;
				}else if(OQ0Q0QO.message){
					console.log('isvObfuscator '+(OQ0Q0QO.message||''));
				}else{
					console.log(OQ0OQ00);
				}
				}else{
					console.log(OQ0OQ00);
				}
				break;
			case 'getMyPing':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					if(OQ0Q0QO.data&&(typeof OQ0Q0QO.data.secretPin!='undefined'))$.Pin=OQ0Q0QO.data.secretPin;
					if(OQ0Q0QO.data&&(typeof OQ0Q0QO.data.nickname!='undefined'))$.nickname=OQ0Q0QO.data.nickname;
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{}
				break;
			case 'shopInfo':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.shopName=OQ0Q0QO.data.shopName||'';
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					if(typeof OQ0Q0QO.data.shopId!='undefined')$.shopId=OQ0Q0QO.data.shopId;
					if(typeof OQ0Q0QO.data.venderId!='undefined')$.venderId=OQ0Q0QO.data.venderId;
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{}
				break;
			case 'getUserInfo':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.pinImg=OQ0Q0QO.data.yunMidImageUrl||'';
					$.jdNick=OQ0Q0QO.data.nickname||'';
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'activityContent':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.cardList=OQ0Q0QO.data.cardList||[];
					$.helpStatus=OQ0Q0QO.data.canDraw||false;
					$.canShake=OQ0Q0QO.data.canShake||true;
					$.canCreate=OQ0Q0QO.data.canCreate||true;
					$.canAssist=OQ0Q0QO.data.canAssist||true;
					$.gatherCount=OQ0Q0QO.data.gatherCount||0;
					$.drawCount=OQ0Q0QO.data.rule.match(/每人每天可获得(\d+)次/);
					if($.drawCount){
						$.drawCounts=$.drawCount[1];
					}
				}else if(OQ0Q0QO.errorMessage){
					if(OQ0Q0QO.errorMessage.indexOf('结束')>-1)$.activityEnd=true;
					console.log(''+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(''+OQ0OQ00);
				}
				}else{
					console.log(''+OQ0OQ00);
				}
				break;
			case 'saveSource':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.actorUuid=OQ0Q0QO.data||'';
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'drawCard':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					console.log('获得：'+(OQ0Q0QO.data.reward.cardName||''));
				}else if(OQ0Q0QO.errorMessage){
					console.log(''+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(''+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'drawCard2':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					console.log('获得：'+(OQ0Q0QO.data.reward.cardName||''));
				}else if(OQ0Q0QO.errorMessage){
					console.log(''+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(''+OQ0OQ00);
				}
				}else{}
				break;
			case 'drawCard3':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.canShakeTimes=OQ0Q0QO.data.canShakeTimes||0;
					console.log('获得：'+(OQ0Q0QO.data.reward.cardName||''));
				}else if(OQ0Q0QO.errorMessage){
					console.log(' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(''+OQ0OQ00);
				}
				}else{}
				break;
			case 'getPrize':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)&&(OQ0Q0QO.result.drawOk===true)){
					console.log('获得：'+(OQ0Q0QO.data.name||''));
				}else if(OQ0Q0QO.errorMessage){
					console.log(' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(''+OQ0OQ00);
				}
				}else{}
				break;
			case 'drawContent':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.content=OQ0Q0QO.data.content||[];
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'getActMemberInfo':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					$.openCard=OQ0Q0QO.data.openCard||false;
				}else if(OQ0Q0QO.errorMessage){
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'drawResult':
				if(typeof OQ0Q0QO=='object'){
					if(OQ0Q0QO.result&&(OQ0Q0QO.result===true)){
					if(typeof OQ0Q0QO.data=='object'){
						let OOQ0O00='';
						if(OQ0Q0QO.data.drawName){
							OOQ0O00=''+OQ0Q0QO.data.drawName;
						}
						if(!OOQ0O00){
							OOQ0O00='空气💨';
						}
						console.log('获得:'+(OOQ0O00||OQ0OQ00));
					}else{
						console.log(OQQ00Q0+' '+OQ0OQ00);
					}
				}else if(OQ0Q0QO.errorMessage){
					$.runFalag=false;
					console.log(OQQ00Q0+' '+(OQ0Q0QO.errorMessage||''));
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				}else{
					console.log(OQQ00Q0+' '+OQ0OQ00);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(OQQ00Q0+'-> '+OQ0OQ00);
		}
		if(typeof OQ0Q0QO=='object'){
			if(OQ0Q0QO.errorMessage){
				if(OQ0Q0QO.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(O000OQQ){
		console.log(O000OQQ);
	}
}
function getPostRequest(QOQ0QQQ,OQ0QO0Q,Q00Q0Q0='POST'){
	let OQ000QO={'Accept':'application/json, text/javascript, */*; q=0.01','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded; charset=UTF-8','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(QOQ0QQQ.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		OQ000QO.Origin='https://lzkjdz-isv.isvjcloud.com';
		OQ000QO.Referer='https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		OQ000QO.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':QOQ0QQQ,'method':Q00Q0Q0,'headers':OQ000QO,'body':OQ0QO0Q,'timeout':30000};
}
function getCk(){
	return new Promise(OOOO0O0=>{
		let QOQ0OOO={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxCollectCard/activity/activity?activityId='+$.activityId,'User-Agent':$.UA},'timeout':30000};
		$.get(QOQ0OOO,async(QQ0OQOO,Q000O00,QQO0OQ0)=>{
			try{
				if(QQ0OQOO){
					if(Q000O00&&(typeof Q000O00.statusCode!='undefined')){
						if(Q000O00.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(QQ0OQOO));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let OQ000OO=QQO0OQ0.match(/(活动已经结束)/)&&QQO0OQ0.match(/(活动已经结束)/)[1]||'';
					if(OQ000OO){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(Q000O00);
				}
			}catch(QOQQ00Q){
				$.logErr(QOQQ00Q,Q000O00);
			}
			finally{
				OOOO0O0();
			}
		});
	});
}
function setActivityCookie(O00QQQ0){
	let O00QQOQ='';
	let QQO0OQQ='';
	let O00QQOO='';
	let OQ000O0=O00QQQ0&&O00QQQ0.headers&&(O00QQQ0.headers['set-cookie']||O00QQQ0.headers['Set-Cookie']||'')||'';
	let QOQQOOQ='';
	if(OQ000O0){
		if(typeof OQ000O0!='object'){
			QOQQOOQ=OQ000O0.split(',');
		}else QOQQOOQ=OQ000O0;
		for(let QOOOQO0 of QOQQOOQ){
			let O00OOQQ=QOOOQO0.split(';')[0].trim();
			if(O00OOQQ.split('=')[1]){
				if(O00OOQQ.indexOf('LZ_TOKEN_KEY=')>-1)O00QQOQ=(O00OOQQ.replace(/ /g,'')+';');
				if(O00OOQQ.indexOf('LZ_TOKEN_VALUE=')>-1)QQO0OQQ=(O00OOQQ.replace(/ /g,'')+';');
				if(O00OOQQ.indexOf('lz_jdpin_token=')>-1)O00QQOO=(''+O00OOQQ.replace(/ /g,'')+';');
			}
		}
	}
	if(O00QQOQ&&QQO0OQQ)activityCookie=O00QQOQ+' '+QQO0OQQ;
	if(O00QQOO)lz_jdpin_token_cookie=O00QQOO;
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(OOO0Q0Q){
	OOO0Q0Q=(OOO0Q0Q||32);
	let Q0000QQ='abcdef0123456789',O00Q00Q=Q0000QQ.length,O00QOO0='';
	for(i=0;i<OOO0Q0Q;i++)O00QOO0+=Q0000QQ.charAt(Math.floor(Math.random()*O00Q00Q));
	return O00QOO0;
}
function getMaxMin(QOQQQQ0,Q0000QO){
	if(Q0000QO==='max'){
		return Math.max.apply(Math,QOQQQQ0);
	}else if(Q0000QO==='min'){
		return Math.min.apply(Math,QOQQQQ0);
	}
}
function jsonParse(OOOO0QO){
	if(typeof OOOO0QO=='string'){
		try{
			return JSON.parse(OOOO0QO);
		}catch(O000OQ0){
			console.log(O000OQ0);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async QQOOOQ0=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let QQOQQOQ='';
		if($.shopactivityId)QQOQQOQ=',"activityId":'+$.shopactivityId;
		let QQOOOQO='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+QQOQQOQ+',"channel":406}';
		let QOO0QOQ=await geth5st();
		const Q0O00OQ={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+QQOOOQO+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+QOO0QOQ,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(Q0O00OQ,async(OOO0O0Q,QOO0QOO,OOO0O0O)=>{
			try{
				OOO0O0O=OOO0O0O&&OOO0O0O.match(/jsonp_.*?\((.*?)\);/)&&OOO0O0O.match(/jsonp_.*?\((.*?)\);/)[1]||OOO0O0O;
				let Q0OOO00=$.toObj(OOO0O0O,OOO0O0O);
				if(Q0OOO00&&(typeof Q0OOO00=='object')){
					if(Q0OOO00&&(Q0OOO00.success===true)){
						console.log(Q0OOO00.message);
						$.errorJoinShop=Q0OOO00.message;
						if(Q0OOO00.result&&Q0OOO00.result.giftInfo){
							for(let Q0OQQ0O of Q0OOO00.result.giftInfo.giftList){
								console.log('入会获得:'+Q0OQQ0O.discountString+Q0OQQ0O.prizeName+Q0OQQ0O.secondLineDesc);
							}
						}
					}else if(Q0OOO00&&(typeof Q0OOO00=='object')&&Q0OOO00.message){
						$.errorJoinShop=Q0OOO00.message;
						console.log(''+(Q0OOO00.message||''));
					}else{
						console.log(OOO0O0O);
					}
				}else{
					console.log(OOO0O0O);
				}
			}catch(QOOO00O){
				$.logErr(QOOO00O,QOO0QOO);
			}
			finally{
				QQOOOQ0();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async QQO000O=>{
		let Q0O00QQ='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let O000QOQ=await geth5st();
		const QOO0QQQ={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+Q0O00QQ+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+O000QOQ,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(QOO0QQQ,async(QOO0000,QOO0QQO,O0O0OQ0)=>{
			try{
				O0O0OQ0=O0O0OQ0&&O0O0OQ0.match(/jsonp_.*?\((.*?)\);/)&&O0O0OQ0.match(/jsonp_.*?\((.*?)\);/)[1]||O0O0OQ0;
				let OOOQQ0Q=$.toObj(O0O0OQ0,O0O0OQ0);
				if(OOOQQ0Q&&(typeof OOOQQ0Q=='object')){
					if(OOOQQ0Q&&(OOOQQ0Q.success==true)){
						console.log('入会:'+(OOOQQ0Q.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=OOOQQ0Q.result.interestsRuleList&&OOOQQ0Q.result.interestsRuleList[0]&&OOOQQ0Q.result.interestsRuleList[0].interestsInfo&&OOOQQ0Q.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(O0O0OQ0);
				}
			}catch(Q0OQ0O0){
				$.logErr(Q0OQ0O0,QOO0QQO);
			}
			finally{
				QQO000O();
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

