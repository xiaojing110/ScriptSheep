/*
头文字J

任务，助力，游戏

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码

cron:37 8,11,14,19 * * *
============Quantumultx===============
[task_local]
#头文字J
37 8,11,14,19 * * * jd_carplay.js, tag=头文字J, enabled=true
*/
const $ = new Env("头文字J");
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(QOQQQO=>{
		cookiesArr.push(jdCookieNode[QOQQQO]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(QOQ0Q0=>QOQ0Q0.cookie)].filter(QO0OOO=>!!QO0OOO);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let shareUuidArr=['','','','','','',''];
let s=Math.floor(Math.random()*3);
let n=0;
n=Math.floor(Math.random()*shareUuidArr.length);
let helpnum=shareUuidArr[n]?shareUuidArr[n]:$.shareUuid;
!(async()=>{
	console.log('\n请自行确认账号一是否黑号，黑号会全部助力当前助力');
	console.log('\n当前助力：'+helpnum);
	console.log('\n当前活动口令： 16:/(B3tU33OD5Ti) ，【鯨〤Dσδδng】参与头文字J，集能量兑换京豆');
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='33694314';
	$.userId='10299171';
	$.actId='1760007';
	$.MixNicks='';
	$.inviteNick=helpnum;
	for(let Q0QO00=0;Q0QO00<cookiesArr.length;Q0QO00++){
		cookie=cookiesArr[Q0QO00];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(Q0QO00+1);
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
		let OQQ00O='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+OQQ00O);
		if($.isNode())await notify.sendNotify(''+$.name,''+OQQ00O);
	}
})().catch(OQQ00Q=>$.logErr(OQQ00Q)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let OO00Q0=false;
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
		if($.hotFlag)return;
		if($.MixNick==''){
			console.log('获取cookie失败');
			return;
		}
		$.toBind=0;
		await takePostRequest('绑定');
		await $.wait(500);
		await takePostRequest('shopList');
		console.log('\n【衰仔，开始刷任务中.....】\n');
		for(let OOOOOQ=0;OOOOOQ<renwulists.length;OOOOOQ++){
			$.missionType=renwulists[OOOOOQ].type;
			if(!renwulists[OOOOOQ].isComplete){
				switch($.missionType){
					case 'bingCar':
					case 'openCard':
					case 'shareAct':
						break;
					case 'viewCommodity':
						for(let OOOOOQ=0;OOOOOQ<3;OOOOOQ++){
									$.missionType='viewCommodity';
									await takePostRequest('renwulist');
									await $.wait(parseInt(Math.random()*1000+1000,10));
								}
						break;
					case 'collectShop':
						for(let OOOOOQ=0;OOOOOQ<3;OOOOOQ++){
									await takePostRequest('getCusShop');
									$.missionType='collectShop';
									await takePostRequest('关注');
									await $.wait(parseInt(Math.random()*1000+1000,10));
								}
						break;
					case 'addCart':
						if(process.env.carplay_addsku&&(process.env.carplay_addsku==='true')){
									for(let OOOOOQ=0;OOOOOQ<3;OOOOOQ++){
							await takePostRequest('getCusShopProduct');
							$.missionType='addCart';
							await takePostRequest('加购');
							await $.wait(parseInt(Math.random()*1000+1000,10));
						}
								}else{
									console.log('默认不加购,请设置变量export carplay_addsku=\'true\'做加购任务');
								}
						break;
					default:
						await takePostRequest('renwulist');
						await $.wait(1000);
				}
			}
		}
		console.log('\n【衰仔，开始选择合适车辆中.....】\n');
		await takePostRequest('getCarInfo');
		for(let Q0OQ0Q=(carlist.length-1);Q0OQ0Q>=0;Q0OQ0Q--){
			if(carlist[Q0OQ0Q].isUnlock==true){
				$.carName=carlist[Q0OQ0Q].carName;
				$.carid=carlist[Q0OQ0Q].id;
				break;
			}
		}
		console.log('当前选择车辆：'+$.carName);
		console.log('\n【衰仔，开始刷游戏中.....】\n');
		for(let Q0OQ0O=0;Q0OQ0O<$.remainChance;Q0OQ0O++){
			await takePostRequest('playGame');
			await $.wait(parseInt(Math.random()*2000+5000,10));
			await takePostRequest('sendGameAward');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}
		await takePostRequest('助力');
		await $.wait(500);
		await takePostRequest('activity_load');
		console.log('目前分值：'+$.totalPoint);
		await takePostRequest('missionInviteList');
		console.log($.MixNick);
		console.log('当前助力:'+$.inviteNick);
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(OQO0Q0){
		console.log(OQO0Q0);
	}
}
async function takePostRequest(OQO000){
	if($.outFlag)return;
	let OQOO0Q='https://mpdz-car-dz.isvjcloud.com';
	let OQOOQQ='';
	let OQQ0O0='POST';
	let OQQQOQ='';
	switch(OQO000){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			OQOOQQ='body=%7B%22url%22%3A%22https%3A%5C/%5C/mpdz-dz.isvjcloud.com%5C/jdbeverage%5C/pages%5C/sign51%5C/sign51?bizExtString%3Dc2hhcmVOaWNrOjh0WFJQTEFobk8yaEU4V1VPUHByY2M3VHdKQ21OZThORnZocEkwWG1KRFVMVlUxMDglMkJVeGxIdzdxb1V1SEE0RiZoZWFkUGljVXJsOmh0dHAlM0ElMkYlMkZzdG9yYWdlLjM2MGJ1eWltZy5jb20lMkZpLmltYWdlVXBsb2FkJTJGNzc3NTY4NjU2ZTczNzQ2MTcyMzEzNjMwMzQzOTM4MzczODMxMzMzMTMxMzNfbWlkLmpwZyZuaWNrTmFtZTolRTYlOEMlOUElRTclODglQjElRTclOEYlOEElRTUlQUUlOUQlRTUlQUUlOUQ%3D%26sid%3D8476480e8271ba209c055afca63a924w%26un_area%3D4_50950_50957_0%22%2C%22id%22%3A%22%22%7D&build=167963&client=apple&clientVersion=10.3.6&d_brand=apple&d_model=iPhone8%2C2&ef=1&eid=eidI994b812123s1PRhmb/36RNW2uQJarJ271z0YZ%2Bv4APcrj75ymDe%2B0Z6%2BnTWSLykYTnpR8p/NwxporPY8JdbEwVIoH6%2BtJTHm/uL08tuO6g10hmNP&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJS0CseyCtK4%22%2C%22osVersion%22%3A%22CJGkEK%3D%3D%22%2C%22openudid%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22area%22%3A%22DP81CNu1CP81CNu1D18m%22%2C%22uuid%22%3A%22aQf1ZRdxb2r4ovZ1EJZhcxYlVNZSZz09%22%7D%2C%22ts%22%3A1651115073%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ext=%7B%22prstate%22%3A%220%22%2C%22pvcStu%22%3A%221%22%7D&isBackground=N&joycious=116&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&partner=apple&rfs=0000&scope=01&sign=a872218a0b5b8bbf20718217f084b1ed&st=1651205710814&sv=120&uemps=0-0&uts=0f31TVRjBSsqndu4/jgUPz6uymy50MQJGDvIUMS36N/l7mJ1NVzSiKCsJDs6WgecFid6ckXh2O65h6Up5mRVfM9FxyqSf7AnAUkkxZuCEelMJweKE0qmxKo6RbZPmvFcsO%2BBSivc5EiXDNGR2/Plyt5HCOw4YhV3l8R5RbDUOvqt4fdTRkK6bkQ28k%2B8Lf73/CiUHR%2ByZjLjlf/p50Zq9A%3D%3D';
			break;
		case 'activity_load':
			url=OQOO0Q+'/dm/front/jdCardRunning/activity/load?open_id=&mix_nick='+($.MixNick||$.MixNicks||'')+'&push_way=1&user_id=';
			OQQQOQ={'jdToken':$.Token,'inviteNick':$.inviteNick||''};
			if($.joinVenderId)OQQQOQ={
			...OQQQOQ,'shopId':''+$.joinVenderId
		};
			OQOOQQ=taskPostUrl('/jdCardRunning/activity/load',OQQQOQ);
			break;
		case 'shopList':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeState?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeState',OQQQOQ);
			break;
		case'绑定':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'missionType':'shareAct','inviterNick':$.inviteNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeState',OQQQOQ);
			break;
		case'助力':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'missionType':'shareAct','inviterNick':$.inviteNick||'','userId':10299171};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeMission',OQQQOQ);
			break;
		case'关注':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'missionType':$.missionType,'userId':10299171,'shopId':$.userIds,'buyerNick':$.inviteNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeMission',OQQQOQ);
			break;
		case'加购':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'missionType':$.missionType,'userId':10299171,'goodsNumId':$.goodsNumId,'buyerNick':$.inviteNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeMission',OQQQOQ);
			break;
		case 'getCusShop':
			url=OQOO0Q+'/dm/front/jdCardRunning/cusShop/getCusShop?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={};
			OQOOQQ=taskPostUrl('/jdCardRunning/cusShop/getCusShop',OQQQOQ);
			break;
		case 'getCusShopProduct':
			url=OQOO0Q+'/dm/front/jdCardRunning/cusShop/getCusShopProduct?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={};
			OQOOQQ=taskPostUrl('/jdCardRunning/cusShop/getCusShop',OQQQOQ);
			break;
		case 'getCarInfo':
			url=OQOO0Q+'/dm/front/jdCardRunning/carInfo/getCarInfo?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={};
			OQOOQQ=taskPostUrl('/jdCardRunning/cusShop/getCusShop',OQQQOQ);
			break;
		case 'renwulist':
			url=OQOO0Q+'/dm/front/jdCardRunning/mission/completeMission?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'actId':$.actId,'missionType':$.missionType};
			OQOOQQ=taskPostUrl('/jdCardRunning/mission/completeMission',OQQQOQ);
			break;
		case 'playGame':
			url=OQOO0Q+'/dm/front/jdCardRunning/game/playGame?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'actId':$.actId,'carId':$.carid,'carName':$.carName,'userId':10299171,'buyerNick':$.inviteNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/game/playGame',OQQQOQ);
			break;
		case 'sendGameAward':
			url=OQOO0Q+'/dm/front/jdCardRunning/game/sendGameAward?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			$.point=random(400,600);
			OQQQOQ={'actId':$.actId,'point':$.point,'gameLogId':$.gameLogId,'userId':10299171,'buyerNick':$.inviteNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/game/sendGameAward',OQQQOQ);
			break;
		case 'missionInviteList':
			url=OQOO0Q+'/dm/front/jdCardRunning/customer/inviteList?open_id=&mix_nick='+($.MixNick||$.MixNicks||'');
			OQQQOQ={'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteNum':1,'buyerNick':$.MixNick||''};
			OQOOQQ=taskPostUrl('/jdCardRunning/customer/inviteList',OQQQOQ);
			break;
		default:
			console.log('错误'+OQO000);
	}
	let QQOQO0=getPostRequest(url,OQOOQQ,OQQ0O0);
	return new Promise(async OQ0Q00=>{
		$.post(QQOQO0,(Q0QQ00,OQ00OQ,Q0Q0OQ)=>{
			try{
				if(Q0QQ00){
					if(OQ00OQ&&OQ00OQ.statusCode&&(OQ00OQ.statusCode==493)){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(Q0QQ00,Q0QQ00));
					console.log(OQO000+' API请求失败，请检查网路重试');
				}else{
					dealReturn(OQO000,Q0Q0OQ);
				}
			}catch(OQ0QQQ){
				console.log(OQ0QQQ,OQ00OQ);
			}
			finally{
				OQ0Q00();
			}
		});
	});
}
async function dealReturn(OQ00Q0,Q0QQ0O){
	let OOOOQOO='';
	try{
		if((OQ00Q0!='accessLogWithAD')||(OQ00Q0!='drawContent')){
			if(Q0QQ0O){
				OOOOQOO=JSON.parse(Q0QQ0O);
			}
		}
	}catch(QQ0O0QQ){
		console.log(OQ00Q0+' 执行任务异常');
		console.log(Q0QQ0O);
		$.runFalag=false;
	}try{
		let OQ00000='';
		switch(OQ00Q0){
			case 'isvObfuscator':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.errcode==0){
					if(typeof OOOOQOO.token!='undefined')$.Token=OOOOQOO.token;
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'getCusShop':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						$.userIds=OOOOQOO.data.data.cusShop.userId;
					}
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'getCusShopProduct':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						$.goodsNumId=OOOOQOO.data.data.cusShopProduct.numId;
					}
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'shopList':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						renwulists=OOOOQOO.data.data||[];
					}
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'getCarInfo':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						carlist=OOOOQOO.data.data||[];
					}
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'playGame':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						$.gameLogId=OOOOQOO.data.data.gameLogId;
						console.log('游戏ID： '+$.gameLogId);
					}
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'sendGameAward':
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&OOOOQOO.data){
					console.log('太棒了，衰仔，游戏完成，当前分值：'+OOOOQOO.data.data.totalPoint);
				}else if(OOOOQOO.message){
					console.log(OQ00Q0+' '+(OOOOQOO.message||''));
				}else{
					console.log(Q0QQ0O);
				}
				}else{
					console.log(Q0QQ0O);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			case 'activity_load':
			case 'mission':
			case 'setMixNick':
			case 'followShop':
			case 'renwulist':
			case 'addCart':
			case 'myAward':
			case 'missionInviteList':
			case'关注':
			case'加购':
			case'绑定':
			case'助力':
			case 'specialSign':
				OQ00000='';
				if(OQ00Q0=='followShop')OQ00000='关注';
				if(OQ00Q0=='addCart')OQ00000='加购';
				if(typeof OOOOQOO=='object'){
					if(OOOOQOO.success&&(OOOOQOO.success===true)&&OOOOQOO.data){
					if(OOOOQOO.data.status&&(OOOOQOO.data.status==200)){
						OOOOQOO=OOOOQOO.data;
						if((OQ00Q0!='setMixNick')&&(OOOOQOO.msg||OOOOQOO.data.isOpenCard||OOOOQOO.data.remark))console.log(''+(OQ00000&&(OQ00000+':')||'')+(OOOOQOO.msg||OOOOQOO.data.isOpenCard||OOOOQOO.data.remark||''));
						if(OQ00Q0=='activity_load'){
							if(OOOOQOO.data){
								$.endTime=OOOOQOO.data.cusActivity.endTime||0;
								$.MixNick=OOOOQOO.data.missionCustomer.buyerNick||'';
								$.hasCollectShop=OOOOQOO.data.missionCustomer.hasCollectShop||0;
								$.totalPoint=OOOOQOO.data.missionCustomer.totalPoint||0;
								$.remainChance=OOOOQOO.data.missionCustomer.remainChance||0;
							}
						}else if(OQ00Q0=='shopList'){
							$.openList=OOOOQOO.data.cusShopList||[];
							renwulists=OOOOQOO.data.data||[];
						}else if(OQ00Q0=='missionInviteList'){
							console.log('邀请人数('+OOOOQOO.data.total+')');
						}
					}else if(OOOOQOO.data.msg){
						if(OOOOQOO.errorMessage.indexOf('活动未开始')>-1){
							$.activityEnd=true;
						}
						console.log(''+(OOOOQOO.data.msg||''));
					}else if(OOOOQOO.errorMessage){
						if(OOOOQOO.errorMessage.indexOf('火爆')>-1){}
						console.log(''+(OOOOQOO.errorMessage||''));
					}else{
						console.log(''+Q0QQ0O);
					}
				}else if(OOOOQOO.errorMessage){
					console.log(''+(OOOOQOO.errorMessage||''));
				}else{
					console.log(''+Q0QQ0O);
				}
				}else{
					console.log(''+Q0QQ0O);
				}
				break;
			default:
				console.log(''+Q0QQ0O);
		}if(typeof OOOOQOO=='object'){
			if(OOOOQOO.errorMessage){
				if(OOOOQOO.errorMessage.indexOf('火爆')>-1){}
			}
		}
	}catch(O0000Q0){
		console.log(O0000Q0);
	}
}
function getPostRequest(OOO0QQO,OOO0000,QQ0OQ00='POST'){
	let QQO0O0Q={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(OOO0QQO.indexOf('https://mpdz-car-dz.isvjcloud.com')>-1){
		QQO0O0Q.Origin='https://mpdz-car-dz.isvjcloud.com';
		QQO0O0Q['Content-Type']='application/json; charset=utf-8';
		delete QQO0O0Q.Cookie;
	}
	return{'url':OOO0QQO,'method':QQ0OQ00,'headers':QQO0O0Q,'body':OOO0000,'timeout':60000};
}
function taskPostUrl(OOOOOQO,OOOQQOO){
	const O000Q0O={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','sign':'','timestamp':Date.now(),'userId':$.userId},'admJson':{
				'actId':$.actId,'userId':$.userId,...OOOQQOO,'method':OOOOOQO,'buyerNick':$.MixNick||''
			}}};
	if(OOOOOQO.indexOf('missionInviteList')>-1){
		delete O000Q0O.params.admJson.actId;
	}
	return $.toStr(O000Q0O,O000Q0O);
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(Q00000O){
	Q00000O=(Q00000O||32);
	let QOOO0Q0='abcdef0123456789',QOQQ0OQ=QOOO0Q0.length,OOOO00O='';
	for(i=0;i<Q00000O;i++)OOOO00O+=QOOO0Q0.charAt(Math.floor(Math.random()*QOQQ0OQ));
	return OOOO00O;
}
function random(QOOOQ0O,OOQQOQQ){
	return Math.floor(Math.random()*OOQQOQQ-QOOOQ0O)+QOOOQ0O;
}
function jsonParse(OOOOOOQ){
	if(typeof OOOOOOQ=='string'){
		try{
			return JSON.parse(OOOOOOQ);
		}catch(QOOO0OQ){
			console.log(QOOO0OQ);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

