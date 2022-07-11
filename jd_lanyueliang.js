/*
7.7-7.31 洁净星愿


只做任务 邀请


入口：[ 7.7-7.31 洁净星愿]

请求太频繁会被黑ip
过10分钟再执行

cron:33 3 7-31 7 *
============Quantumultx===============
[task_local]
#7.7-7.31 洁净星愿
33 6 7-31 7 * jd_lanyueliang.js, tag=7.7-7.31 洁净星愿, enabled=true

*/

const $ = new Env('7.7-7.31 洁净星愿')
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(OQ0O0O=>{
		cookiesArr.push(jdCookieNode[OQ0O0O]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(Q0QO0Q=>Q0QO0Q.cookie)].filter(Q0QO0O=>!!Q0QO0O);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let lz_cookie={};
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId='dzb594a1b836d1414082b935d66ee0';
	$.shareUuid='';
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/lanyueliang/sakura/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	let OQ000Q=[''];
	let OQ00QO=Math.floor(Math.random()*3);
	let OQ000O=0;
	OQ000O=Math.floor(Math.random()*OQ000Q.length);
	$.shareUuid=OQ000Q[OQ000O]?OQ000Q[OQ000O]:$.shareUuid;
	for(let OQQ0OO=0;OQQ0OO<cookiesArr.length;OQQ0OO++){
		cookie=cookiesArr[OQQ0OO];
		originCookie=cookiesArr[OQQ0OO];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(OQQ0OO+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if(OQQ0OO==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}if($.outFlag){
		let OQQQ00='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+OQQQ00);
		if($.isNode())await notify.sendNotify(''+$.name,''+OQQQ00);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(OQQ0OQ=>$.logErr(OQQ0OQ)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let Q0OQQQ=false;
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
		await takePostRequest('getUserInfo');
		await takePostRequest('activityContent');
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		if(($.hasEnd===true)||(Date.now()>$.endTime)){
			$.activityEnd=true;
			console.log('活动结束');
			return;
		}
		await $.wait(1000);
		console.log('活动获取成功，助力码：'+$.actorUuid+'\n默认不开卡，请手动进入活动页面开卡\n');
		await takePostRequest('drawContent');
		await takePostRequest('getRankList');
		console.log('开始做日常任务......');
		$.log('浏览会场: '+$.mainActive);
		if(!$.mainActive&&!$.outFlag){
			Q0OQQQ=true;
			await takePostRequest('浏览积分换购');
			await $.wait(parseInt(Math.random()*2000+3000,10));
			await takePostRequest('浏览会员页');
			await $.wait(parseInt((Math.random()*2000)+3000,10));
			await takePostRequest('浏览积分抽奖');
			await $.wait(parseInt(Math.random()*2000+3000,10));
			await takePostRequest('浏览积分兑京豆');
			await $.wait(parseInt((Math.random()*2000)+3000,10));
		}
		$.log('每日签到: '+$.sign);
		if(!$.sign&&!$.outFlag){
			Q0OQQQ=true;
			await takePostRequest('每日签到');
			await $.wait(parseInt(Math.random()*2000+3000,10));
		}
		$.log('加购: '+$.addSku);
		if(!$.addSku&&!$.outFlag){
			Q0OQQQ=true;
			await takePostRequest('加购');
			await $.wait(parseInt(Math.random()*2000+3000,10));
		}
		$.log('关注店铺: '+$.followShop);
		if(!$.followShop&&!$.outFlag){
			Q0OQQQ=true;
			await takePostRequest('关注店铺');
			await $.wait(parseInt((Math.random()*2000)+3000,10));
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
		}
		await $.wait(parseInt(Math.random()*1000+5000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if(($.index%3)==0)await $.wait(parseInt((Math.random()*5000)+30000,10));
	}catch(OQOQ0O){
		console.log(OQOQ0O);
	}
}
async function takePostRequest(OQO000){
	if($.outFlag)return;
	let OQOQOO='https://lzdz1-isv.isvjcloud.com';
	let OQOQOQ='';
	let QQOQ00='POST';
	let QQO0OQ='';
	switch(OQO000){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			OQOQOQ='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=OQOQOO+'/dz/common/getSimpleActInfoVo';
			OQOQOQ='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=OQOQOO+'/customer/getMyPing';
			OQOQOQ='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=OQOQOO+'/common/accessLogWithAD';
			let QQOQQ0=OQOQOO+'/dingzhi/lanyueliang/sakura/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			OQOQOQ='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(QQOQQ0)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=OQOQOO+'/wxActionCommon/getUserInfo';
			OQOQOQ='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/activityContent';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=OQOQOO+'/dingzhi/taskact/common/drawContent';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'getRankList':
			url=OQOQOO+'/dingzhi/taskact/common/getRankList';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid;
			break;
		case 'checkOpenCard':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/initOpenCard';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'info':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/task/opencard/info';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'startDraw':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&drawType=1';
			break;
		case'关注店铺':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=23&taskValue=1000001195';
			break;
		case '浏览积分换购':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=12&taskValue=1';
			break;
		case '浏览会员页':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=12&taskValue=2';
			break;
		case '浏览积分抽奖':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=12&taskValue=3';
			break;
		case '浏览积分兑京豆':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=12&taskValue=4';
			break;
		case '每日签到':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=0&taskValue=1000001195';
			break;
		case'加购':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/saveTask';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=21&taskValue=';
			break;
		case 'getPrize':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/getPrize';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'sign':
		case 'addCart':
		case 'browseGoods':
			url=OQOQOO+'/dingzhi/opencard/'+OQO000;
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(OQO000=='browseGoods')OQOQOQ+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(OQO000=='助力'){
			url=OQOQOO+'/dingzhi/linkgame/assist';
		}else{
			url=OQOQOO+'/dingzhi/linkgame/assist/status';
		}
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'viewVideo':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=OQOQOO+'/dingzhi/opencard/'+OQO000;
			let Q0OO00='';
			let Q0QQO0='';
			if(OQO000=='viewVideo'){
			Q0OO00=31;
			Q0QQO0=31;
		}else if(OQO000=='visitSku'){
			Q0OO00=5;
			Q0QQO0=$.visitSkuValue||5;
		}else if(OQO000=='toShop'){
			Q0OO00=14;
			Q0QQO0=$.toShopValue||14;
		}else if(OQO000=='addSku'){
			Q0OO00=2;
			Q0QQO0=$.addSkuValue||2;
		}
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+Q0OO00+'&taskValue='+Q0QQO0;
			break;
		case 'getDrawRecordHasCoupon':
			url=OQOQOO+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		case 'getShareRecord':
			url=OQOQOO+'/dingzhi/lanyueliang/sakura/help/list';
			OQOQOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case'抽奖':
			url=OQOQOO+'/dingzhi/opencard/draw';
			OQOQOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		default:
			console.log('错误'+OQO000);
	}
	let OQOQO0=getPostRequest(url,OQOQOQ,QQOQ00);
	return new Promise(async QQO0QO=>{
		$.post(OQOQO0,(OQQQOO,OQOOQO,OQOO0Q)=>{
			try{
				setActivityCookie(OQOOQO);
				if(OQQQOO){
					if(OQOOQO&&typeof OQOOQO.statusCode!='undefined'){
						if(OQOOQO.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(OQQQOO,OQQQOO));
					console.log(OQO000+' API请求失败，请检查网路重试');
				}else{
					dealReturn(OQO000,OQOO0Q);
				}
			}catch(OQ0QQ0){
				console.log(OQ0QQ0,OQOOQO);
			}
			finally{
				QQO0QO();
			}
		});
	});
}
async function dealReturn(Q0Q0OO,Q0QQQ0){
	let Q00Q00O='';
	try{
		if((Q0Q0OO!='accessLogWithAD')||Q0Q0OO!='drawContent'){
			if(Q0QQQ0){
				Q00Q00O=JSON.parse(Q0QQQ0);
			}
		}
	}catch(OOQQQQ0){
		console.log(Q0Q0OO+' 执行任务异常');
		console.log(Q0QQQ0);
		$.runFalag=false;
	}try{
		switch(Q0Q0OO){
			case'isvObfuscator':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.errcode==0){
					if(typeof Q00Q00O.token!='undefined')$.Token=Q00Q00O.token;
				}else if(Q00Q00O.message){
					console.log('isvObfuscator '+(Q00Q00O.message||''));
				}else{
					console.log(Q0QQQ0);
				}
				}else{
					console.log(Q0QQQ0);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&Q00Q00O.result===true){
					if(typeof Q00Q00O.data.shopId!='undefined')$.shopId=Q00Q00O.data.shopId;
					if(typeof Q00Q00O.data.venderId!='undefined')$.venderId=Q00Q00O.data.venderId;
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'getMyPing':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					if(Q00Q00O.data&&(typeof Q00Q00O.data.secretPin!='undefined'))$.Pin=Q00Q00O.data.secretPin;
					if(Q00Q00O.data&&(typeof Q00Q00O.data.nickname!='undefined'))$.nickname=Q00Q00O.data.nickname;
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'getUserInfo':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&Q00Q00O.result===true){
					if(Q00Q00O.data&&(typeof Q00Q00O.data.yunMidImageUrl!='undefined'))$.attrTouXiang=Q00Q00O.data.yunMidImageUrl||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'activityContent':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					$.endTime=Q00Q00O.data.endTime||Q00Q00O.data.activityVo&&Q00Q00O.data.activityVo.endTime||Q00Q00O.data.activity.endTime||0;
					$.hasEnd=Q00Q00O.data.isEnd||false;
					$.score=Q00Q00O.data.score||0;
					$.score2=Q00Q00O.data.score2||0;
					$.score3=Q00Q00O.data.score3||0;
					$.score4=Q00Q00O.data.score4||0;
					$.score5=Q00Q00O.data.score5||0;
					$.sign=Q00Q00O.data.sign.allStatus||false;
					$.addSku=Q00Q00O.data.addSku.allStatus||false;
					$.mainActive=Q00Q00O.data.mainActive.allStatus||false;
					$.followShop=Q00Q00O.data.followShop.allStatus||false;
					$.actorUuid=Q00Q00O.data.actorUuid||'';
					$.assistCount=Q00Q00O.data.assistCount||0;
					$.assistStatus=Q00Q00O.data.assistStatus||0;
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'getPrize':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					$.exchangePriceList=Q00Q00O.data.exchangePriceList||[];
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'startGame':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					$.gameId=Q00Q00O.data.gameId;
					console.log('游戏ID：'+$.gameId);
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'endGame':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&Q00Q00O.result===true){
					console.log('任务完成，获得奖励：'+Q00Q00O.data.addScore);
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'info':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					$.addCart=Q00Q00O.data.addCart||false;
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case '关注店铺':
			case '浏览积分换购':
			case '每日签到':
			case '浏览会员页':
			case '浏览积分兑京豆':
			case '浏览积分抽奖':
			case '浏览会员页':
			case'加购':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					console.log('任务完成，获得游戏次数：'+Q00Q00O.data.addScore);
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'checkOpenCard':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					let QQ0O0O0=Q00Q00O.data.openInfo||[];
					$.openList=[...QQ0O0O0];
					$.allOpenCard=Q00Q00O.data.allOpenCard||Q00Q00O.data.isOpenCardStatus||false;
					if(Q00Q00O.data.beans||Q00Q00O.data.addBeanNum)console.log('开卡获得:'+(Q00Q00O.data.beans||Q00Q00O.data.addBeanNum)+'豆');
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'startDraw':
			case 'followShop':
			case 'viewVideo':
			case 'visitSku':
			case 'toShop':
			case 'addSku':
			case 'sign':
			case 'addCart':
			case 'browseGoods':
			case'抽奖':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&Q00Q00O.result===true){
					if(typeof Q00Q00O.data=='object'){
						let QQO0O00='';
						let O00Q0OO='抽奖';
						if(Q00Q00O.data.addBeanNum){
							QQO0O00=Q00Q00O.data.addBeanNum+'京豆';
						}
						if(Q00Q00O.data.addPoint){
							QQO0O00+=' '+Q00Q00O.data.addPoint+'游戏机会';
						}
						if(Q0Q0OO=='followShop'){
							O00Q0OO='关注';
							if(Q00Q00O.data.beanNumMember&&Q00Q00O.data.assistSendStatus){
								QQO0O00+=' 额外获得:'+Q00Q00O.data.beanNumMember+'京豆';
							}
						}else if(Q0Q0OO=='addSku'||(Q0Q0OO=='addCart')){
							O00Q0OO='加购';
						}else if(Q0Q0OO=='viewVideo'){
							O00Q0OO='热门文章';
						}else if(Q0Q0OO=='toShop'){
							O00Q0OO='浏览店铺';
						}else if(Q0Q0OO=='visitSku'||(Q0Q0OO=='browseGoods')){
							O00Q0OO='浏览商品';
						}else if(Q0Q0OO=='sign'){
							O00Q0OO='签到';
						}else{
							let O0000Q0=typeof Q00Q00O.data.drawOk==='object'&&Q00Q00O.data.drawOk||Q00Q00O.data;
							QQO0O00=(O0000Q0.drawOk==true)&&O0000Q0.name||'';
						}
						if(O00Q0OO=='抽奖'&&QQO0O00&&QQO0O00.indexOf('京豆')==-1){
							if($.isNode())await notify.sendNotify(''+$.name,'【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n'+O00Q0OO+'成功,获得 '+QQO0O00+'\n活动地址: https://3.cn/-106MEjSh');
						}
						if(!QQO0O00){
							QQO0O00='空气💨';
						}
						console.log(O00Q0OO+'获得:'+(QQO0O00||Q0QQQ0));
					}else{
						console.log(Q0Q0OO+' '+Q0QQQ0);
					}
				}else if(Q00Q00O.errorMessage){
					$.runFalag=false;
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'getDrawRecordHasCoupon':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)){
					console.log('我的奖品：');
					let Q000OOO=0;
					let QQO0O0O=0;
					let O00OO0Q=0;
					for(let Q000OOQ in Q00Q00O.data.recordList){
						let QQO0O0Q=Q00Q00O.data.recordList[Q000OOQ];
						if((QQO0O0Q.infoName=='20京豆')&&(QQO0O0Q.drawStatus==0)){
							Q000OOO++;
							QQO0O0O=QQO0O0Q.infoName.replace('京豆','');
							O00OO0Q=O00OO0Q<QQO0O0Q.createTime?QQO0O0Q.createTime:O00OO0Q;
						}else{
							console.log(''+((QQO0O0Q.infoType!=10)&&QQO0O0Q.value&&(QQO0O0Q.value+':')||'')+QQO0O0Q.infoName);
						}
					}
					if(O00OO0Q>0)console.log('最新邀请奖励时间:'+$.time('yyyy-MM-dd HH:mm:ss',O00OO0Q));
					if(Q000OOO>0)console.log('邀请好友('+Q000OOO+'):'+((Q000OOO*parseInt(QQO0O0O,10))||30)+'京豆');
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case 'getShareRecord':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.result&&(Q00Q00O.result===true)&&Q00Q00O.data){
					$.ShareCount=Q00Q00O.data.shareList.length;
					$.log('=========== 你邀请了:'+$.ShareCount+'个\n由于接口数据只有30个 故邀请大于30个的需要自行判断\n');
				}else if(Q00Q00O.errorMessage){
					console.log(Q0Q0OO+' '+(Q00Q00O.errorMessage||''));
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
				break;
			case'邀请':
			case'助力':
				if(typeof Q00Q00O=='object'){
					if(Q00Q00O.data.status==200){
					if(Q0Q0OO=='助力'){
						console.log('助力成功');
					}else{
						$.yaoqing=true;
					}
				}else if(Q00Q00O.data.status==105){
					console.log('已经助力过');
				}else if(Q00Q00O.data.status==104){
					console.log('已经助力其他人');
				}else if(Q00Q00O.data.status==101){}else{
					console.log(Q0QQQ0);
				}
				}else{
					console.log(Q0Q0OO+' '+Q0QQQ0);
				}
			case 'accessLogWithAD':
			case 'drawContent':
			case 'getRankList':
				break;
			default:
				console.log(Q0Q0OO+'-> '+Q0QQQ0);
		}
		if(typeof Q00Q00O=='object'){
			if(Q00Q00O.errorMessage){
				if(Q00Q00O.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(QOQ0O0Q){
		console.log(QOQ0O0Q);
	}
}
function getPostRequest(OOOOOO0,Q00000O,Q000OO0='POST'){
	let QOQQ0OQ={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(OOOOOO0.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		QOQQ0OQ.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/lanyueliang/sakura/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		QOQQ0OQ.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':OOOOOO0,'method':Q000OO0,'headers':QOQQ0OQ,'body':Q00000O,'timeout':30000};
}
function getCk(){
	return new Promise(QOQ0O00=>{
		let QOOO0OO={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/lanyueliang/sakura/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(QOOO0OO,async(QOQQQ0Q,OOQQOQ0,OOO0QOQ)=>{
			try{
				if(QOQQQ0Q){
					if(OOQQOQ0&&(typeof OOQQOQ0.statusCode!='undefined')){
						if(OOQQOQ0.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(QOQQQ0Q));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let QQOOO00=OOO0QOQ.match(/(活动已经结束)/)&&OOO0QOQ.match(/(活动已经结束)/)[1]||'';
					if(QQOOO00){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(OOQQOQ0);
				}
			}catch(Q0O0000){
				$.logErr(Q0O0000,OOQQOQ0);
			}
			finally{
				QOQ0O00();
			}
		});
	});
}
function setActivityCookie(Q0OOOQQ){
	if(Q0OOOQQ.headers['set-cookie']){
		cookie=originCookie+';';
		for(let O0OQO0Q of Q0OOOQQ.headers['set-cookie']){
			lz_cookie[O0OQO0Q.split(';')[0].substr(0,O0OQO0Q.split(';')[0].indexOf('='))]=O0OQO0Q.split(';')[0].substr(O0OQO0Q.split(';')[0].indexOf('=')+1);
		}
		for(const Q0O0QQO of Object.keys(lz_cookie)){
			cookie+=(Q0O0QQO+'='+lz_cookie[Q0O0QQO]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(OOO0OQQ){
	OOO0OQQ=(OOO0OQQ||32);
	let O00OQ0O='abcdef0123456789',QQO0Q0O=O00OQ0O.length,Q0OQ000='';
	for(i=0;i<OOO0OQQ;i++)Q0OQ000+=O00OQ0O.charAt(Math.floor(Math.random()*QQO0Q0O));
	return Q0OQ000;
}
function random(QQO00Q0,OQOQOQQ){
	return Math.floor(Math.random()*OQOQOQQ-QQO00Q0)+QQO00Q0;
}
function jsonParse(QOOO0QO){
	if(typeof QOOO0QO=='string'){
		try{
			return JSON.parse(QOOO0QO);
		}catch(OQO0OQ0){
			console.log(OQO0OQ0);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

