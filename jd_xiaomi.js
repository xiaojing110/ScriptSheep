/*
6.28-7.4 预约小米新品赢手机


做任务，邀请，抽奖


入口：[ 6.28-7.4 预约小米新品赢手机]

请求太频繁会被黑ip
过10分钟再执行

cron:1 8 28-30,1-4 6,7 *
============Quantumultx===============
[task_local]
#6.28-7.4 预约小米新品赢手机
1 8 28-30,1-4 6,7 * jd_xiaomi.js, tag=6.28-7.4 预约小米新品赢手机, enabled=true

*/

const $ = new Env('6.28-7.4 预约小米新品赢手机')
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(QO0OOO=>{
		cookiesArr.push(jdCookieNode[QO0OOO]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(QO0OOQ=>QO0OOQ.cookie)].filter(O0OQO0=>!!O0OQO0);
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
	$.activityId='dz14c2fe0d64254263ba500a26a89d';
	$.shareUuid='';
	console.log('入口:\nhttps://lzdz1-isv.isvjcloud.com/dingzhi/xiaomi/reservedraw/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid);
	let Q00OQO=['','',''];
	let OQQOQ0=Math.floor(Math.random()*3);
	let OQ0O00=0;
	OQ0O00=Math.floor(Math.random()*Q00OQO.length);
	$.shareUuid=Q00OQO[OQ0O00]?Q00OQO[OQ0O00]:$.shareUuid;
	for(let OQ0OQ0=0;OQ0OQ0<cookiesArr.length;OQ0OQ0++){
		cookie=cookiesArr[OQ0OQ0];
		originCookie=cookiesArr[OQ0OQ0];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=OQ0OQ0+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'\n');
			await getUA();
			await run();
			await $.wait(3000);
			if(OQ0OQ0==0&&!$.actorUuid)break;
			if($.outFlag||$.activityEnd)break;
		}
	}if($.outFlag){
		let Q0QOQ0='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+Q0QOQ0);
		if($.isNode())await notify.sendNotify(''+$.name,''+Q0QOQ0);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(Q0QO00=>$.logErr(Q0QO00)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let OOOOO0=false;
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
		console.log('开始做日常任务......');
		$.log('预约: '+$.reserveStatus);
		if(!$.reserveStatus&&!$.outFlag){
			OOOOO0=true;
			await takePostRequest('reserve');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		$.log('关注: '+$.followShop);
		if(!$.followShop&&!$.outFlag){
			OOOOO0=true;
			await takePostRequest('followShop');
			await $.wait(parseInt((Math.random()*2000)+1000,10));
		}
		$.log('加购: '+$.skuAddStatus);
		if(!$.skuAddStatus&&!$.outFlag){
			OOOOO0=true;
			await takePostRequest('addSku');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		$.mainActiveList=[1,2,3];
		if($.toMainCount!=3&&!$.outFlag){
			OOOOO0=true;
			for(let OOOOOO=0;OOOOOO<$.mainActiveList.length;OOOOOO++){
				if($.runFalag==false)break;
				$.visitSkuValue=$.mainActiveList[OOOOOO];
				await takePostRequest('mainActive');
				await $.wait(parseInt(Math.random()*3000+3000,10));
			}
		}else{
			console.log('已完成浏览会场');
		}
		if($.visitSkuCount!=5&&!$.outFlag){
			OOOOO0=true;
			for(const OQQOQO of $.visitSkulist){
				if($.runFalag==false)break;
				$.venderIds=OQQOQO.value;
				$.visitSkuValue=$.venderIds;
				await takePostRequest('浏览商品');
				await $.wait(parseInt((Math.random()*3000)+3000,10));
			}
		}else{
			console.log('已完成浏览商品');
		}
		if(($.shareActiveCount!=2)&&!$.outFlag){
			OOOOO0=true;
			await takePostRequest('邀请好友');
			await $.wait(parseInt(Math.random()*3000+3000,10));
			await takePostRequest('邀请好友');
			await $.wait(parseInt(Math.random()*3000+3000,10));
		}else{
			console.log('已完成邀请好友');
		}
		await takePostRequest('activityContent');
		console.log('\n目前可抽奖次数：'+$.score+'\n');
		$.runFalag=true;
		let Q0OQ0Q=parseInt($.score/1);
		for(m=1;Q0OQ0Q--;m++){
			console.log('第'+m+'次抽奖');
			await takePostRequest('draw');
			if($.runFalag==false)break;
			if(Number(Q0OQ0Q)<=0)break;
			if(m>=5){
				console.log('抽奖太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt(Math.random()*5000+5000,10));
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getDrawRecordHasCoupon');
		await $.wait(parseInt((Math.random()*1000)+2000,10));
		if($.index%3==0)console.log('休息一下，别被黑ip了\n可持续发展');
		if(($.index%3)==0)await $.wait(parseInt(Math.random()*5000+10000,10));
	}catch(Q0OQ0O){
		console.log(Q0OQ0O);
	}
}
async function takePostRequest(QQ0QO0){
	if($.outFlag)return;
	let Q0OOOO='https://lzdz1-isv.isvjcloud.com';
	let Q0OOOQ='';
	let OQO0O0='POST';
	let OQOQOO='';
	switch(QQ0QO0){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			Q0OOOQ='body=%7B%22url%22%3A%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=ab640b5dc76b89426f72115f5b2e06e934a5fbe9&client=apple&clientVersion=10.1.4&st=1650250640876&sv=102&sign=7ea66dcb2969eff53c43b5b8a4937dbe';
			break;
		case 'getSimpleActInfoVo':
			url=Q0OOOO+'/dz/common/getSimpleActInfoVo';
			Q0OOOQ='activityId='+$.activityId;
			break;
		case 'getMyPing':
			url=Q0OOOO+'/customer/getMyPing';
			Q0OOOQ='userId='+($.shopId||$.venderId||'')+'&token='+$.Token+'&fromType=APP';
			break;
		case 'accessLogWithAD':
			url=Q0OOOO+'/common/accessLogWithAD';
			let OQOQOQ=Q0OOOO+'/dingzhi/xiaomi/reservedraw/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			Q0OOOQ='venderId='+($.shopId||$.venderId||'')+'&code=99&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(OQOQOQ)+'&subType=app&adSource=';
			break;
		case 'getUserInfo':
			url=Q0OOOO+'/wxActionCommon/getUserInfo';
			Q0OOOQ='pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/activityContent';
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&pinImg='+encodeURIComponent($.attrTouXiang)+'&nick='+encodeURIComponent($.nickname)+'&cjyxPin=&cjhyPin=&shareUuid='+$.shareUuid;
			break;
		case 'drawContent':
			url=Q0OOOO+'/dingzhi/taskact/common/drawContent';
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'reserve':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/reserve';
			Q0OOOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case '浏览商品':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/saveTask';
			Q0OOOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=5&taskValue='+$.visitSkuValue;
			break;
		case 'mainActive':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/saveTask';
			Q0OOOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin)+'&taskType=12&taskValue='+$.visitSkuValue;
			break;
		case 'draw':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/draw';
			Q0OOOQ='activityId='+$.activityId+'&actorUuid='+$.actorUuid+'&pin='+encodeURIComponent($.Pin);
			break;
		case'addCart':
		case 'browseGoods':
			url=Q0OOOO+'/dingzhi/opencard/'+QQ0QO0;
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			if(QQ0QO0=='browseGoods')Q0OOOQ+='&value='+$.visitSkuValue;
			break;
		case'邀请':
		case'助力':
			if(QQ0QO0=='助力'){
			url=Q0OOOO+'/dingzhi/linkgame/assist';
		}else{
			url=Q0OOOO+'/dingzhi/linkgame/assist/status';
		}
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid;
			break;
		case 'followShop':
		case'邀请好友':
		case 'visitSku':
		case 'toShop':
		case 'addSku':
			url=Q0OOOO+'/dingzhi/xiaomi/reservedraw/saveTask';
			let QQOQ00='';
			let QQO0OQ='';
			if(QQ0QO0=='邀请好友'){
			QQOQ00=8;
			QQO0OQ=8;
		}else if(QQ0QO0=='followShop'){
			QQOQ00=1;
			QQO0OQ=$.visitSkuValue||1;
		}else if(QQ0QO0=='visitSku'){
			QQOQ00=5;
			QQO0OQ=$.visitSkuValue||5;
		}else if(QQ0QO0=='toShop'){
			QQOQ00=14;
			QQO0OQ=$.toShopValue||14;
		}else if(QQ0QO0=='addSku'){
			QQOQ00=21;
			QQO0OQ=$.addSkuValue||21;
		}
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid+'&taskType='+QQOQ00+'&taskValue='+$.visitSkuValue;
			break;
		case 'getDrawRecordHasCoupon':
			url=Q0OOOO+'/dingzhi/taskact/common/getDrawRecordHasCoupon';
			Q0OOOQ='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&actorUuid='+$.actorUuid;
			break;
		default:
			console.log('错误'+QQ0QO0);
	}
	let QQOQQ0=getPostRequest(url,Q0OOOQ,OQO0O0);
	return new Promise(async QQO0OO=>{
		$.post(QQOQQ0,(OQQQOO,OQOOQO,OQOO0Q)=>{
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
					console.log(QQ0QO0+' API请求失败，请检查网路重试');
				}else{
					dealReturn(QQ0QO0,OQOO0Q);
				}
			}catch(OQ0Q00){
				console.log(OQ0Q00,OQOOQO);
			}
			finally{
				QQO0OO();
			}
		});
	});
}
async function dealReturn(OQ0QQ0,O0QO0Q){
	let OOOOQQO='';
	try{
		if((OQ0QQ0!='accessLogWithAD')||(OQ0QQ0!='drawContent')){
			if(O0QO0Q){
				OOOOQQO=JSON.parse(O0QO0Q);
			}
		}
	}catch(Q00QQQ0){
		console.log(OQ0QQ0+' 执行任务异常');
		console.log(O0QO0Q);
		$.runFalag=false;
	}try{
		switch(OQ0QQ0){
			case'isvObfuscator':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.errcode==0){
					if(typeof OOOOQQO.token!='undefined')$.Token=OOOOQQO.token;
				}else if(OOOOQQO.message){
					console.log('isvObfuscator '+(OOOOQQO.message||''));
				}else{
					console.log(O0QO0Q);
				}
				}else{
					console.log(O0QO0Q);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					if(typeof OOOOQQO.data.shopId!='undefined')$.shopId=OOOOQQO.data.shopId;
					if(typeof OOOOQQO.data.venderId!='undefined')$.venderId=OOOOQQO.data.venderId;
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'getMyPing':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					if(OOOOQQO.data&&(typeof OOOOQQO.data.secretPin!='undefined'))$.Pin=OOOOQQO.data.secretPin;
					if(OOOOQQO.data&&typeof OOOOQQO.data.nickname!='undefined')$.nickname=OOOOQQO.data.nickname;
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case'getUserInfo':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					if(OOOOQQO.data&&typeof OOOOQQO.data.yunMidImageUrl!='undefined')$.attrTouXiang=OOOOQQO.data.yunMidImageUrl||'https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'activityContent':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					$.endTime=OOOOQQO.data.endTime||OOOOQQO.data.activityVo&&OOOOQQO.data.activityVo.endTime||OOOOQQO.data.activity.endTime||0;
					$.hasEnd=OOOOQQO.data.hasEnd||false;
					$.score=OOOOQQO.data.score||0;
					$.followShop=OOOOQQO.data.followShop||false;
					$.visitSkulist=OOOOQQO.data.visitSkuList||[];
					$.mainActivelist=OOOOQQO.data.toMainSkuList||[];
					$.addSkulist=OOOOQQO.data.goodSkuList||[];
					$.skuAddStatus=OOOOQQO.data.skuAddStatus||false;
					$.reserveStatus=OOOOQQO.data.reserveStatus||false;
					$.toMainCount=OOOOQQO.data.toMainCount||0;
					$.visitSkuCount=OOOOQQO.data.visitSkuCount||0;
					$.shareActiveCount=OOOOQQO.data.shareActiveCount||0;
					$.actorUuid=OOOOQQO.data.actorUuid||0;
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'reserve':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					console.log('预约成功');
				}else if(OOOOQQO.errorMessage){}else{}
				}else{}
				break;
			case'关注店铺':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					console.log('任务完成');
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'followShop':
			case 'addSku':
			case 'mainActive':
			case '浏览商品':
			case '邀请好友':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					console.log('任务完成，获得抽奖次数：'+OOOOQQO.data.addScore);
				}else if(OOOOQQO.errorMessage){
					console.log(''+(OOOOQQO.errorMessage||''));
				}else{
					console.log(''+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'checkOpenCard':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					let OOQ0OOO=OOOOQQO.data.openInfo||[];
					$.openList=[...OOQ0OOO];
					$.allOpenCard=OOOOQQO.data.allOpenCard||OOOOQQO.data.isOpenCardStatus||false;
					if(OOOOQQO.data.beans||OOOOQQO.data.addBeanNum)console.log('开卡获得:'+(OOOOQQO.data.beans||OOOOQQO.data.addBeanNum)+'豆');
				}else if(OOOOQQO.errorMessage){
					console.log(OQ0QQ0+' '+(OOOOQQO.errorMessage||''));
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
				break;
			case 'draw':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					if(OOOOQQO.data.wdsrvo.drawOk===true){}else{}
				}else if(OOOOQQO.errorMessage){}else{}
				}else{}
				break;
			case'邀请':
			case'助力':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.data.status==200){
					if(OQ0QQ0=='助力'){
						console.log('助力成功');
					}else{
						$.yaoqing=true;
					}
				}else if(OOOOQQO.data.status==105){
					console.log('已经助力过');
				}else if(OOOOQQO.data.status==104){
					console.log('已经助力其他人');
				}else if(OOOOQQO.data.status==101){}else{
					console.log(O0QO0Q);
				}
				}else{
					console.log(OQ0QQ0+' '+O0QO0Q);
				}
			case 'getDrawRecordHasCoupon':
				if(typeof OOOOQQO=='object'){
					if(OOOOQQO.result&&(OOOOQQO.result===true)){
					console.log('我的奖品：');
					let Q00Q00O=0;
					let QOQ00OQ=0;
					let OOQQQQ0=0;
					for(let OOOOQOO in OOOOQQO.data.recordList){
						let QQ0O0QQ=OOOOQQO.data.recordList[OOOOQOO];
						console.log(''+(QQ0O0QQ.infoType!=10&&QQ0O0QQ.value&&QQ0O0QQ.value+':'||'')+QQ0O0QQ.infoName);
					}
				}else if(OOOOQQO.errorMessage){
					console.log(''+(OOOOQQO.errorMessage||''));
				}else{
					console.log(''+O0QO0Q);
				}
				}else{
					console.log(''+O0QO0Q);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
			case 'getRankList':
				break;
			default:
				console.log(OQ0QQ0+'-> '+O0QO0Q);
		}
		if(typeof OOOOQQO=='object'){
			if(OOOOQQO.errorMessage){
				if(OOOOQQO.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(QQ0O0QO){
		console.log(QQ0O0QO);
	}
}
function getPostRequest(OOQ000O,Q00Q00Q,O0QOQOQ='POST'){
	let O00Q0OQ={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(OOQ000O.indexOf('https://lzdz1-isv.isvjcloud.com')>-1){
		O00Q0OQ.Referer='https://lzdz1-isv.isvjcloud.com/dingzhi/xiaomi/reservedraw/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		O00Q0OQ.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':OOQ000O,'method':O0QOQOQ,'headers':O00Q0OQ,'body':Q00Q00Q,'timeout':30000};
}
function getCk(){
	return new Promise(OOO0000=>{
		let QQ0OQ00={'url':'https://lzdz1-isv.isvjcloud.com/dingzhi/xiaomi/reservedraw/activity/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'followRedirect':false,'headers':{'User-Agent':$.UA},'timeout':30000};
		$.get(QQ0OQ00,async(QQ0O0OQ,OOOQQOQ,QQ0O0OO)=>{
			try{
				if(QQ0O0OQ){
					if(OOOQQOQ&&(typeof OOOQQOQ.statusCode!='undefined')){
						if(OOOQQOQ.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(QQ0O0OQ));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let OOOQQOO=QQ0O0OO.match(/(活动已经结束)/)&&QQ0O0OO.match(/(活动已经结束)/)[1]||'';
					if(OOOQQOO){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(OOOQQOQ);
				}
			}catch(OOO0QQQ){
				$.logErr(OOO0QQQ,OOOQQOQ);
			}
			finally{
				OOO0000();
			}
		});
	});
}
function setActivityCookie(Q00O00O){
	if(Q00O00O.headers['set-cookie']){
		cookie=originCookie+';';
		for(let Q00000Q of Q00O00O.headers['set-cookie']){
			lz_cookie[Q00000Q.split(';')[0].substr(0,Q00000Q.split(';')[0].indexOf('='))]=Q00000Q.split(';')[0].substr(Q00000Q.split(';')[0].indexOf('=')+1);
		}
		for(const O00Q0QQ of Object.keys(lz_cookie)){
			cookie+=(O00Q0QQ+'='+lz_cookie[O00Q0QQ]+';');
		}
		activityCookie=cookie;
	}
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(QOQQ0OQ){
	QOQQ0OQ=(QOQQ0OQ||32);
	let OOQQOQO='abcdef0123456789',Q00OOOO=OOQQOQO.length,QQOQO00='';
	for(i=0;i<QOQQ0OQ;i++)QQOQO00+=OOQQOQO.charAt(Math.floor(Math.random()*Q00OOOO));
	return QQOQO00;
}
function random(O000O00,QOQ0O00){
	return Math.floor(Math.random()*QOQ0O00-O000O00)+O000O00;
}
function jsonParse(QOQQQ0O){
	if(typeof QOQQQ0O=='string'){
		try{
			return JSON.parse(QOQQQ0O);
		}catch(QOOO0OO){
			console.log(QOOO0OO);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

