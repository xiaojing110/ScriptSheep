/*
7.22-7.25 格力巅峰24小时

任务脚本，默认做任务，抽奖

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:29 1,8 22-25 7 *
============Quantumultx===============
[task_local]
#7.22-7.25 格力巅峰24小时
29 1,8 22-25 7 * jd_opencardL201.js, tag=7.22-7.25 格力巅峰24小时, enabled=true
*/
let opencard_toShop = "false"
const $ = new Env("7.22-7.25 格力巅峰24小时");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(Q00QQO=>{
		cookiesArr.push(jdCookieNode[Q00QQO]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(Q000Q0=>Q000Q0.cookie)].filter(OOQQO0=>!!OOQQO0);
}
opencard_toShop=$.isNode()?process.env.opencard_toShop?process.env.opencard_toShop:''+opencard_toShop:$.getdata('opencard_toShop')?$.getdata('opencard_toShop'):''+opencard_toShop;
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let shareUuidArr=[''];
let s=Math.floor(Math.random()*3);
let n=0;
n=Math.floor(Math.random()*shareUuidArr.length);
let helpnum=shareUuidArr[n]?shareUuidArr[n]:$.shareUuid;
!(async()=>{
	console.log('\n请自行确认账号一是否黑号，黑号会全部助力当前助力');
	console.log('\n当前助力：'+helpnum);
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='21699045';
	$.userId='10299171';
	$.actId='greePeak24h';
	$.MixNicks='';
	$.inviteNick=helpnum;
	for(let OOQQOO=0;OOQQOO<cookiesArr.length;OOQQOO++){
		cookie=cookiesArr[OOQQOO];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=OOQQOO+1;
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			await getUA();
			await run();
			if($.outFlag||$.activityEnd)break;
		}
	}if($.outFlag){
		let Q00QOO='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+Q00QOO);
		if($.isNode())await notify.sendNotify(''+$.name,''+Q00QOO);
	}
})().catch(Q000O0=>$.logErr(Q000O0)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let OQOO0Q=false;
		if($.activityEnd)return;
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('isvObfuscator');
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await takePostRequest('activity_load');
		await $.wait(parseInt(Math.random()*1000+1000,10));
		if($.hotFlag)return;
		if($.MixNick==''){
			console.log('获取cookie失败');
			return;
		}
		$.toBind=0;
		$.openLists=[];
		await takePostRequest('绑定');
		await $.wait(parseInt(Math.random()*1000+5000,10));
		await takePostRequest('completeState');
		console.log('\n【衰仔，开始刷任务拉.....】\n');
		for(let OQQ0O0=0;OQQ0O0<$.renwulists.length;OQQ0O0++){
			$.missionType=$.renwulists[OQQ0O0].type;
			if(!$.renwulists[OQQ0O0].isComplete){
				switch($.missionType){
					case 'shareAct':
						for(let OQQQOQ=0;OQQQOQ<1;OQQQOQ++){
									$.missionType='shareAct';
									await takePostRequest('绑定');
									await $.wait(parseInt(Math.random()*1000+2000,10));
								}
						break;
					case 'collectShop':
						for(let QQOQO0=0;QQOQO0<1;QQOQO0++){
									$.missionType='collectShop';
									await takePostRequest('mission');
									await $.wait(parseInt(Math.random()*1000+2000,10));
								}
						break;
					case 'collectCommodity':
						for(let OQ0Q00=0;OQ0Q00<1;OQ0Q00++){
									$.missionType='collectCommodity';
									await takePostRequest('mission');
									await $.wait(parseInt(Math.random()*1000+2000,10));
								}
						break;
					case 'joinMember':
						for(let OQ0QQ0=0;OQ0QQ0<1;OQ0QQ0++){
									$.missionType='joinMember';
									$.joinVenderId=1000003445;
									await takePostRequest('ruhui');
									await $.wait(parseInt((Math.random()*2000)+2000,10));
									$.errorJoinShop='';
									await joinShop();
									if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
							console.log('第1次 重新开卡');
							await $.wait(1000);
							await joinShop();
						}
									if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
							console.log('第2次 重新开卡');
							await $.wait(1000);
							await joinShop();
						}
									if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
							console.log('第3次 重新开卡');
							await $.wait(1000);
							await joinShop();
						}
									if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
							console.log('第4次 重新开卡');
							await $.wait(1000);
							await joinShop();
						}
									await takePostRequest('activity_load');
									await takePostRequest('completeState');
									await takePostRequest('ruhui');
									await $.wait(parseInt(Math.random()*1000+2000,10));
								}
						break;
					case 'sendBarrage':
						for(let Q0QQ00=0;Q0QQ00<1;Q0QQ00++){
									$.missionType='sendBarrage';
									await takePostRequest('bulletChat');
									await $.wait(parseInt((Math.random()*1000)+2000,10));
								}
						break;
					case 'addCarCommodity':
						for(let OQ00OQ=0;OQ00OQ<1;OQ00OQ++){
									$.missionType='addCarCommodity';
									await takePostRequest('mission');
									await $.wait(parseInt(Math.random()*1000+2000,10));
								}
						break;
					default:
						await takePostRequest('mission');
						await $.wait(1000);
				}
			}
		}
		await takePostRequest('getCurrentInfo');
		console.log('当前打榜人数：'+$.supportNumber+' 人');
		if(!$.isSupport){
			await takePostRequest('dabang');
			await $.wait(parseInt((Math.random()*2000)+1000,10));
		}else{
			console.log('已经打榜过了~');
		}
		await takePostRequest('activity_load');
		$.runFalag=true;
		let OQQQO0=parseInt($.remainPoint/1);
		console.log('抽卡次数为:'+OQQQO0);
		for(m=1;OQQQO0--;m++){
			console.log('第'+m+'次抽卡');
			await takePostRequest('kaika');
			if($.runFalag==false)break;
			if(Number(OQQQO0)<=0)break;
			if(m>=5){
				console.log('抽卡太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt((Math.random()*2000)+2000,10));
		}
		await takePostRequest('getCardStock');
		console.log('目前已集齐卡片详情：');
		const QQOQOO=new Set();
		for(const QQOQOQ of $.cardLists){
			OQOO0Q=true;
			$.cardName=QQOQOQ.ownCardsImg;
			$.cardCount=QQOQOQ.cardCount;
			(QQOQOQ.cardCount>=0)?QQOQOO.add(QQOQOQ.cardCount):'';
			console.log('卡片：'+$.cardName+' , '+$.cardCount+'张');
		}
		var OQ0000=Array.from(QQOQOO);
		var OQ0QQQ=getMaxMin(OQ0000,'min');
		console.log('\n目前已集齐可合成：'+OQ0QQQ+' 次');
		for(let OQ0Q0O=0;OQ0Q0O<OQ0QQQ;OQ0Q0O++){
			console.log('第'+(OQ0Q0O+1)+'次合成');
			await takePostRequest('compositeCard');
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		await takePostRequest('activity_load');
		await $.wait(parseInt(Math.random()*2000+2000,10));
		$.runFalag=true;
		let OQ00Q0=parseInt($.remainChance/1);
		console.log('抽奖次数为：'+OQ00Q0+' 次');
		for(m=1;OQ00Q0--;m++){
			console.log('第'+m+'次抽奖');
			await takePostRequest('抽奖');
			if($.runFalag==false)break;
			if(Number(OQ00Q0)<=0)break;
			if(m>=2){
				console.log('抽奖太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt((Math.random()*2000)+2000,10));
		}
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(Q0QQ0O){
		console.log(Q0QQ0O);
	}
}
async function takePostRequest(Q0QQQQ){
	if($.outFlag)return;
	let OQ0QOOO='https://mpdz6-dz.isvjcloud.com';
	let Q00OOQO='';
	let QOQ00O0='POST';
	let OOQQOOQ='';
	switch(Q0QQQQ){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			Q00OOQO='body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/sign51%5C/sign51?bizExtString%3Dc2hhcmVOaWNrOjh0WFJQTEFobk8yaEU4V1VPUHByY2M3VHdKQ21OZThORnZocEkwWG1KRFVMVlUxMDglMkJVeGxIdzdxb1V1SEE0RiZoZWFkUGljVXJsOmh0dHAlM0ElMkYlMkZzdG9yYWdlLjM2MGJ1eWltZy5jb20lMkZpLmltYWdlVXBsb2FkJTJGNzc3NTY4NjU2ZTczNzQ2MTcyMzEzNjMwMzQzOTM4MzczODMxMzMzMTMxMzNfbWlkLmpwZyZuaWNrTmFtZTolRTYlOEMlOUElRTclODglQjElRTclOEYlOEElRTUlQUUlOUQlRTUlQUUlOUQ%3D%26sid%3D8476480e8271ba209c055afca63a924w%26un_area%3D4_50950_50957_0%22%2C%22id%22%3A%22%22%7D&build=167963&client=apple&clientVersion=10.3.6&d_brand=apple&d_model=iPhone8%2C2&ef=1&eid=eidI994b812123s1PRhmb/36RNW2uQJarJ271z0YZ%2Bv4APcrj75ymDe%2B0Z6%2BnTWSLykYTnpR8p/NwxporPY8JdbEwVIoH6%2BtJTHm/uL08tuO6g10hmNP&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22osVersion%22%3A%22CJGkEK%3D%3D%22%2C%22openudid%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22area%22%3A%22DP81CNu1CP81CNu1D18m%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1651115073%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=116&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=a872218a0b5b8bbf20718217f084b1ed&st=1651205710814&sv=120&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJGDvIUMS36N/l7mJ1NVzSiKCsJDs6WgecFid6ckXh2O65h6Up5mRVfM9FxyqSf7AnAUkkxZuCEelMJweKE0qmxKo6RbZPmvFcsO%2BBSivc5EiXDNGR2/Plyt5HCOw4YhV3l8R5RbDUOvqt4fdTRkK6bkQ28k%2B8Lf73/CiUHR%2ByZjLjlf/p50Zq9A%3D%3D';
			break;
		case 'activity_load':
			url=OQ0QOOO+'/dm/front/jdPeakedness/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)OOQQOOQ={
			...OOQQOOQ,'shopId':''+$.joinVenderId
		};
			Q00OOQO=taskPostUrl('/jdPeakedness/activity/load',OOQQOOQ);
			break;
		case 'shopList':
			url=OQ0QOOO+'/dm/front/jdPeakedness/shop/shopList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/shop/shopList',OOQQOOQ);
			break;
		case'绑定':
			url=OQ0QOOO+'/dm/front/jdPeakedness/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OOQQOOQ={'missionType':'shareAct','inviterNick':$.inviteNick||'','userId':10299171};
			Q00OOQO=taskPostUrl('/jdCardRunning/mission/completeMission',OOQQOOQ);
			break;
		case'助力':
			url=OQ0QOOO+'/dm/front/jdUnionLover/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'inviteListRequest':{'actId':'unionLover20220804','missionType':'shareAct','buyerNick':$.MixNick||'','inviteType':0},'inviterNick':$.inviteNick||''};
			Q00OOQO=taskPostUrl('/jdUnionLover/customer/inviteList',OOQQOOQ);
			break;
		case 'mission':
			url=OQ0QOOO+'/dm/front/jdPeakedness/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'missionType':$.missionType};
			Q00OOQO=taskPostUrl('/jdPeakedness/mission/completeMission',OOQQOOQ);
			break;
		case 'ruhui':
			url=OQ0QOOO+'/dm/front/jdPeakedness/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'missionType':$.missionType,'userId':$.joinVenderId,'inviterNick':$.inviteNick||''};
			Q00OOQO=taskPostUrl('/jdPeakedness/mission/completeMission',OOQQOOQ);
			break;
		case 'kaika':
			url=OQ0QOOO+'/dm/front/jdPeakedness/card/drawCard?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/card/drawCard',OOQQOOQ);
			break;
		case'抽奖':
			url=OQ0QOOO+'/dm/front/jdPeakedness/interactive/drawPost?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OOQQOOQ={'dataType':'draw'};
			Q00OOQO=taskPostUrl('/jdPeakedness/interactive/drawPost',OOQQOOQ);
			break;
		case 'followShop':
			url=OQ0QOOO+'/dm/front/jdUnionLover/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'actId':$.actId,'missionType':'uniteCollectShop'};
			Q00OOQO=taskPostUrl('/jdUnionLover/mission/completeMission',OOQQOOQ);
			break;
		case 'bulletChat':
			url=OQ0QOOO+'/dm/front/jdPeakedness/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={'missionType':'sendBarrage','barrageId':1,'actId':$.actId};
			Q00OOQO=taskPostUrl('/jdPeakedness/mission/completeMission',OOQQOOQ);
			break;
		case 'completeState':
			url=OQ0QOOO+'/dm/front/jdPeakedness/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/mission/completeState',OOQQOOQ);
			break;
		case 'compositeCard':
			url=OQ0QOOO+'/dm/front/jdPeakedness/card/compositeCard?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/card/compositeCard',OOQQOOQ);
			break;
		case 'dabang':
			url=OQ0QOOO+'/dm/front/jdPeakedness/support/post?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/support/post',OOQQOOQ);
			break;
		case 'getCurrentInfo':
			url=OQ0QOOO+'/dm/front/jdPeakedness/support/getCurrentInfo?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/support/getCurrentInfo',OOQQOOQ);
			break;
		case 'getCardStock':
			url=OQ0QOOO+'/dm/front/jdPeakedness/card/getCardStock?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&bizExtString=&user_id=10299171';
			OOQQOOQ={};
			Q00OOQO=taskPostUrl('/jdPeakedness/card/getCardStock',OOQQOOQ);
			break;
		case 'myAward':
			url=OQ0QOOO+'/dm/front/jdRiceNoodleFestival/awards/list?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OOQQOOQ={'pageNo':1,'pageSize':9999};
			Q00OOQO=taskPostUrl('/jdRiceNoodleFestival/awards/list',OOQQOOQ);
			break;
		case 'missionInviteList':
			url=OQ0QOOO+'/dm/front/jdRiceNoodleFestival/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OOQQOOQ={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			Q00OOQO=taskPostUrl('/jdRiceNoodleFestival/customer/inviteList',OOQQOOQ);
			break;
		default:
			console.log('错误'+Q0QQQQ);
	}
	let OOQ0OQO=getPostRequest(url,Q00OOQO,QOQ00O0);
	return new Promise(async OOOOQQ0=>{
		$.post(OOQ0OQO,(OOQQOO0,OOQQ00Q,OOOOQQQ)=>{
			try{
				if(OOQQOO0){
					if(OOQQ00Q&&OOQQ00Q.statusCode&&(OOQQ00Q.statusCode==493)){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(OOQQOO0,OOQQOO0));
					console.log(Q0QQQQ+' API请求失败，请检查网路重试');
				}else{
					dealReturn(Q0QQQQ,OOOOQQQ);
				}
			}catch(QOQOO0Q){
				console.log(QOQOO0Q,OOQQ00Q);
			}
			finally{
				OOOOQQ0();
			}
		});
	});
}
async function dealReturn(QQ00Q00,O000O0O){
	let Q00OQQQ='';
	try{
		if((QQ00Q00!='accessLogWithAD')||(QQ00Q00!='drawContent')){
			if(O000O0O){
				Q00OQQQ=JSON.parse(O000O0O);
			}
		}
	}catch(QQOQ0QO){
		console.log(QQ00Q00+' 执行任务异常');
		console.log(O000O0O);
		$.runFalag=false;
	}try{
		let QQOQ0QQ='';
		switch(QQ00Q00){
			case 'isvObfuscator':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.errcode==0){
					if(typeof Q00OQQQ.token!='undefined')$.Token=Q00OQQQ.token;
				}else if(Q00OQQQ.message){
					console.log(QQ00Q00+' '+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case 'completeState':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&Q00OQQQ.success===true&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&Q00OQQQ.data.status==200){
						$.renwulists=Q00OQQQ.data.data||[];
					}
				}else if(Q00OQQQ.message){
					console.log(''+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case 'getCardStock':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&(Q00OQQQ.success===true)&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&(Q00OQQQ.data.status==200)){
						$.cardLists=Q00OQQQ.data.data.cardList||[];
					}
				}else if(Q00OQQQ.message){
					console.log(''+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case 'getCurrentInfo':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&(Q00OQQQ.success===true)&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&Q00OQQQ.data.status==200){
						$.isSupport=Q00OQQQ.data.data.isSupport||false;
						$.supportNumber=Q00OQQQ.data.data.supportNumber||0;
					}
				}else if(Q00OQQQ.message){
					console.log(''+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case'抽奖':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&(Q00OQQQ.success===true)&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&(Q00OQQQ.data.status==200)){
						if(Q00OQQQ.data.data&&Q00OQQQ.data.data.awardSetting){
							console.log('获得：'+(Q00OQQQ.data.data.awardSetting.awardName||''));
						}else{
							console.log('谢谢参与');
						}
					}
				}else if(Q00OQQQ.message){
					console.log(''+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case 'kaika':
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&Q00OQQQ.success===true&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&(Q00OQQQ.data.status==200)){
						console.log('抽中：'+(Q00OQQQ.data.data.award.name||''));
					}
				}else if(Q00OQQQ.message){
					console.log(''+(Q00OQQQ.message||''));
				}else{
					console.log(O000O0O);
				}
				}else{
					console.log(O000O0O);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			case 'activity_load':
			case 'mission':
			case 'shopList':
			case 'loadUniteOpenCard':
			case 'setMixNick':
			case 'uniteOpenCardOne':
			case 'checkOpenCard':
			case 'followShop':
			case 'addCart':
			case 'dabang':
			case 'missionInviteList':
			case 'compositeCard':
			case 'ruhui':
			case'绑定':
			case 'bulletChat':
			case 'specialSign':
				QQOQ0QQ='';
				if(QQ00Q00=='followShop')QQOQ0QQ='关注';
				if(QQ00Q00=='addCart')QQOQ0QQ='加购';
				if(typeof Q00OQQQ=='object'){
					if(Q00OQQQ.success&&(Q00OQQQ.success===true)&&Q00OQQQ.data){
					if(Q00OQQQ.data.status&&(Q00OQQQ.data.status==200)){
						Q00OQQQ=Q00OQQQ.data;
						if((QQ00Q00!='setMixNick')&&(Q00OQQQ.msg||Q00OQQQ.data.isOpenCard||Q00OQQQ.data.remark))console.log(''+(QQOQ0QQ&&(QQOQ0QQ+':')||'')+(Q00OQQQ.msg||Q00OQQQ.data.isOpenCard||Q00OQQQ.data.remark||''));
						if(QQ00Q00=='activity_load'){
							if(Q00OQQQ.data){
								$.endTime=Q00OQQQ.data.cusActivity.endTime||0;
								$.MixNick=Q00OQQQ.data.missionCustomer.buyerNick||'';
								$.remainPoint=Q00OQQQ.data.missionCustomer.remainPoint||0;
								$.usedPoint=Q00OQQQ.data.missionCustomer.usedPoint||0;
								$.remainChance=Q00OQQQ.data.missionCustomer.remainChance||0;
								$.usedChance=Q00OQQQ.data.missionCustomer.usedChance||0;
								$.hasCollectShop=Q00OQQQ.data.missionCustomer.hasCollectShop||0;
								$.hasAddCart=Q00OQQQ.data.missionCustomer.hasAddCart||0;
							}
						}else if(QQ00Q00=='shopList'){
							if(Q00OQQQ.data){
								$.openLists=Q00OQQQ.data;
							}
						}else if(QQ00Q00=='mission'){
							if(Q00OQQQ.data.remark.indexOf('赶紧去开卡吧')>-1){
								$.open=true;
							}else{
								$.open=false;
							}
						}else if(QQ00Q00=='uniteOpenCardOne'){
							$.uniteOpenCar=Q00OQQQ.msg||Q00OQQQ.data.msg||'';
						}else if(QQ00Q00=='myAward'){
							console.log('我的奖品：');
							let OOOOOO0=0;
							let Q00000O=0;
							for(let Q000OO0 in Q00OQQQ.data.list||[]){
								let Q00000Q=Q00OQQQ.data.list[Q000OO0];
								Q00000O+=Number(Q00000Q.awardDes);
							}
							if(Q00000O>0)console.log('共获得'+Q00000O+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
						}else if(QQ00Q00=='missionInviteList'){
							console.log('邀请人数('+Q00OQQQ.data.total+')');
						}
					}else if(Q00OQQQ.data.msg){
						if(Q00OQQQ.errorMessage.indexOf('活动未开始')>-1){
							$.activityEnd=true;
						}
						console.log(''+(Q00OQQQ.data.msg||''));
					}else if(Q00OQQQ.errorMessage){
						if(Q00OQQQ.errorMessage.indexOf('火爆')>-1){}
						console.log(''+(Q00OQQQ.errorMessage||''));
					}else{
						console.log(''+O000O0O);
					}
				}else if(Q00OQQQ.errorMessage){
					console.log(''+(Q00OQQQ.errorMessage||''));
				}else{
					console.log(''+O000O0O);
				}
				}else{
					console.log(''+O000O0O);
				}
				break;
			default:
				console.log((QQOQ0QQ||QQ00Q00)+'-> '+O000O0O);
		}if(typeof Q00OQQQ=='object'){
			if(Q00OQQQ.errorMessage){
				if(Q00OQQQ.errorMessage.indexOf('火爆')>-1){}
			}
		}
	}catch(QOQQ0OQ){
		console.log(QOQQ0OQ);
	}
}
function getPostRequest(QOOOQ0O,OOQQOQQ,Q00OOOQ='POST'){
	let Q000QQO={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(QOOOQ0O.indexOf('https://mpdz6-dz.isvjcloud.com')>-1){
		Q000QQO.Origin='https://mpdz6-dz.isvjcloud.com';
		Q000QQO['Content-Type']='application/json; charset=utf-8';
		delete Q000QQO.Cookie;
	}
	return{'url':QOOOQ0O,'method':Q00OOOQ,'headers':Q000QQO,'body':OOQQOQQ,'timeout':60000};
}
function taskPostUrl(Q000QQQ,O00QQ0Q){
	const O00Q0Q0={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'2de37640fb772a9c563a3c81c4faa48c','timestamp':Date.now(),'userId':$.userId},'admJson':{
				'actId':$.actId,'userId':$.userId,...O00QQ0Q,'method':Q000QQQ,'buyerNick':$.MixNick||''
			}}};
	if(Q000QQQ.indexOf('missionInviteList')>-1){
		delete O00Q0Q0.params.admJson.actId;
	}
	return $.toStr(O00Q0Q0,O00Q0Q0);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(QOOO0OO){
	QOOO0OO=(QOOO0OO||32);
	let OOO0QOO='abcdef0123456789',QQOQO0O=OOO0QOO.length,QQOQO0Q='';
	for(i=0;i<QOOO0OO;i++)QQOQO0Q+=OOO0QOO.charAt(Math.floor(Math.random()*QQOQO0O));
	return QQOQO0Q;
}
function jsonParse(QQOOO00){
	if(typeof QQOOO00=='string'){
		try{
			return JSON.parse(QQOOO00);
		}catch(QQO00OQ){
			console.log(QQO00OQ);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
function getMaxMin(QQO0Q00,O00O0QO){
	if(O00O0QO==='max'){
		return Math.max.apply(Math,QQO0Q00);
	}else if(O00O0QO==='min'){
		return Math.min.apply(Math,QQO0Q00);
	}
}
function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async OOO0OQQ=>{
		$.errorJoinShop='';
		$.shopactivityId='';
		await $.wait(1000);
		await getshopactivityId();
		let QOOO0QQ='';
		if($.shopactivityId)QOOO0QQ=',"activityId":'+$.shopactivityId;
		let O0OQO00='20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306';
		const Q00OQO0={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+QOOO0QQ+',"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888&h5st='+O0OQO00,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(Q00OQO0,async(OQO0OQ0,QQOQ0O0,QQOOO0Q)=>{
			try{
				let QOO00OO=$.toObj(QQOOO0Q,QQOOO0Q);
				if(typeof QOO00OO=='object'){
					if(QOO00OO.success===true){
						console.log(QOO00OO.message);
						$.errorJoinShop=QOO00OO.message;
						if($.errorJoinShop==='手机号已经在此店铺下绑定过'){
							console.log('无用账号，退出');
							return;
						}if(QOO00OO.result&&QOO00OO.result.giftInfo){
							for(let OQOQOO0 of QOO00OO.result.giftInfo.giftList){
								console.log('入会获得:'+OQOQOO0.discountString+OQOQOO0.prizeName+OQOQOO0.secondLineDesc);
							}
						}
					}else if((typeof QOO00OO=='object')&&QOO00OO.message){
						$.errorJoinShop=QOO00OO.message;
						console.log(''+(QOO00OO.message||''));
					}else{
						console.log(QQOOO0Q);
					}
				}else{
					console.log(QQOOO0Q);
				}
			}catch(Q0OQQO0){
				$.logErr(Q0OQQO0,QQOQ0O0);
			}
			finally{
				OOO0OQQ();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(OO00QO0=>{
		const O0O0O00={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(O0O0O00,async(OQOQOOQ,OQOQOOO,Q0OQQOO)=>{
			try{
				let Q0OQQOQ=$.toObj(Q0OQQOO,Q0OQQOO);
				if(typeof Q0OQQOQ=='object'){
					if(Q0OQQOQ.success==true){
						console.log('入会:'+(Q0OQQOQ.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=Q0OQQOQ.result.interestsRuleList&&Q0OQQOQ.result.interestsRuleList[0]&&Q0OQQOQ.result.interestsRuleList[0].interestsInfo&&Q0OQQOQ.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(Q0OQQOO);
				}
			}catch(OO0OQQO){
				$.logErr(OO0OQQO,OQOQOOO);
			}
			finally{
				OO00QO0();
			}
		});
	});
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

