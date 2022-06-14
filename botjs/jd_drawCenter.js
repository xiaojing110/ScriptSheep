/*
LZ刮刮乐抽奖通用活动

https://lzkj-isv.isvjcloud.com/drawCenter/activity/8530275?activityId=xxxxxx

活动ID环境变量：
// export jd_drawCenter_activityId="活动ID"

打破常规，不开通会员照样领取奖励

6.9更新：优化日志输出，感谢某大佬的付出

即时任务，无需cron,短期或者长期请参考活动规则设置cron
============Quantumultx===============
[task_local]
#LZ刮刮乐抽奖通用活动
31 1 1 1 1 https://raw.githubusercontent.com/KingRan/KR/main/jd_drawCenter.js, tag=LZ刮刮乐抽奖通用活动, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "31 1 1 1 1" script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_drawCenter.js,tag=LZ刮刮乐抽奖通用活动

===============Surge=================
LZ刮刮乐抽奖通用活动 = type=cron,cronexp="31 1 1 1 1",wake-system=1,timeout=3600,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_drawCenter.js

============小火箭=========
LZ刮刮乐抽奖通用活动 = type=cron,script-path=https://raw.githubusercontent.com/KingRan/KR/main/jd_drawCenter.js, cronexpr="31 1 1 1 1", timeout=3600, enable=true
*/
const $ = new Env('LZ刮刮乐抽奖通用活动-加密');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='',message='';
let ownCode={};
let isdoTask=true;
let isdraw=true;
let lz_cookie={};
let drawCenterActivityId='';
let llnothing=true;
let Allmessage='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(OOOOQQ=>{
		cookiesArr.push(jdCookieNode[OOOOQQ]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(OOQQOO=>OOQQOO.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(OOQQQ0=>!!OOQQQ0);
}
if(process.env.jd_drawCenter_activityId&&process.env.jd_drawCenter_activityId!=''){
	drawCenterActivityId=process.env.jd_drawCenter_activityId.split(',');
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	console.log('入口: https://lzkj-isv.isvjd.com/drawCenter/activity/entry.html?activityId='+drawCenterActivityId);
	for(let Q0OQ0O=0;Q0OQ0O<cookiesArr.length;Q0OQ0O++){
		if(cookiesArr[Q0OQ0O]){
			cookie=cookiesArr[Q0OQ0O];
			originCookie=cookiesArr[Q0OQ0O];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(Q0OQ0O+1);
			$.isLogin=true;
			$.nickName='';
			await checkCookie();
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			// await randomsb();
			authorCodeList=[''];
			$.bean=0;
			$.ADID=getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',1);
			$.UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
			$.authorCode=ownCode?ownCode:authorCodeList[random(0,authorCodeList.length)];
			$.authorNum=''+random(1000000,9999999);
			$.activityId=drawCenterActivityId;
			$.activityShopId='';
			$.activityUrl='https://lzkj-isv.isvjcloud.com/drawCenter/activity/'+$.authorNum+'?activityId='+$.activityId+'&shareUuid='+encodeURIComponent($.authorCode)+'&shareuserid4minipg=null&shopid='+$.activityShopId;
			message='';
			await run();
			await $.wait(1000);
			if(Allmessage!==''){
				if($.isNode()){
					await notify.sendNotify($.name,message,'','\n');
				}
			}
		}
	}if(Allmessage!==''){
		if($.isNode()){
			await notify.sendNotify($.name,message,'','\n');
		}
	}
})().catch(OQO000=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+OQO000+'!','');
}).finally(()=>{
	$.done();
});
async function run(){
	await $.wait(500);
	$.token=null;
	$.secretPin=null;
	await getFirstLZCK();
	await getToken();
	await task('customer/getSimpleActInfoVo','activityId='+$.activityId,1);
	if($.token){
		await getMyPing();
		if($.secretPin){
			await task('common/accessLogWithAD','venderId='+$.activityShopId+'&code=99&pin='+encodeURIComponent($.secretPin)+'&activityId='+$.activityId+'&pageUrl='+$.activityUrl+'&subType=app&adSource=null',1);
			await task('wxActionCommon/getUserInfo','pin='+encodeURIComponent($.secretPin),1);
			await $.wait(500);
			await task('activityContent','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&pinImg='+encodeURIComponent($.pinImg)+'&nick='+encodeURIComponent($.pin)+'&cjyxPin=&cjhyPin=&shareUuid='+encodeURIComponent($.authorCode));
			if($.index===1){
				console.log('助力码：'+ownCode);
			}
			$.log('当前活动：'+$.activityName+'\n');
			if($.activityContent){
				if(isdoTask){
					await $.wait(500);
					await task('myInfo','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
					for(var OOQ0OQO=0;OOQ0OQO<$.taskList.length;OOQ0OQO++){
						$.maxNeed=$.taskList[OOQ0OQO].maxNeed;
						$.curNum=$.taskList[OOQ0OQO].curNum;
						$.remaining=($.maxNeed-$.curNum);
						if($.curNum==$.maxNeed)continue;
						await $.wait(500);
						switch($.taskList[OOQ0OQO].taskType){
							case 'share2help':
								if($.index===1)break;
								$.log('去助力 -> '+ownCode);
								await task('helpFriend','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&shareUuid='+encodeURIComponent($.authorCode));
								break;
							case 'dailysign':
								$.log('每日签到');
								await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=dailysign&param=');
								break;
							case 'followshop':
								$.log('去关注店铺');
								await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=followshop&param=');
								break;
							case 'scanshop':
								$.log('去浏览店铺');
								await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=scanshop&param=');
								break;
							case 'add2cart':
								await task('getProduct','type=1&activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
								for(let OQ00OQO=0;OQ00OQO<$.getProduct.length;OQ00OQO++){
													await $.wait(500);
													$.log('去加购商品：'+$.getProduct[OQ00OQO].name);
													await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=add2cart&param='+$.getProduct[OQ00OQO].skuId);
													if(OQ00OQO==$.remaining-1)break;
												}
								break;
							case 'ordersku':
								await task('getProduct','type=2&activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
								for(let Q000QQ0=0;Q000QQ0<$.getProduct.length;Q000QQ0++){
													await $.wait(500);
													$.log('去预约商品：'+$.getProduct[Q000QQ0].name);
													await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=ordersku&param='+$.getProduct[Q000QQ0].skuId);
													if(Q000QQ0==$.remaining-1)break;
												}
								break;
							case 'followsku':
								await task('getProduct','type=3&activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
								for(let OQ00OQQ=0;OQ00OQQ<$.getProduct.length;OQ00OQQ++){
													await $.wait(500);
													$.log('去关注商品：'+$.getProduct[OQ00OQQ].name);
													await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=followsku&param='+$.getProduct[OQ00OQQ].skuId);
													if(OQ00OQQ==$.remaining-1)break;
												}
								break;
							case 'scansku':
								await task('getProduct','type=4&activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
								for(let O00QO00=0;O00QO00<$.getProduct.length;O00QO00++){
													await $.wait(500);
													$.log('去浏览商品：'+$.getProduct[O00QO00].name);
													await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId=scansku&param='+$.getProduct[O00QO00].skuId);
													if(O00QO00==$.remaining-1)break;
												}
								break;
							case 'scanurl':
								$.venue_name=JSON.parse($.taskList[OOQ0OQO].params).name;
								$.log('去浏览会场：'+$.venue_name);
								await task('doTask','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&taskId='+$.taskList[OOQ0OQO].taskId+'&param=');
								break;
							default:
								break;
						}
					}
				}
				if(isdraw){
					await task('activityContent','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin)+'&pinImg='+encodeURIComponent($.pinImg)+'&nick='+encodeURIComponent($.pin)+'&cjyxPin=&cjhyPin=&shareUuid='+encodeURIComponent($.authorCode));
					if($.chance>=1){
						$.log('\n任务做完了，当前共有 '+$.chance+' 次抽奖机会，开始抽奖吧～\n');
					}else{
						$.log('没有抽奖机会了~');
					}
					await $.wait(500);
					for(let Q00QQOQ=0;Q00QQOQ<$.chance;Q00QQOQ++){
						await task('draw/luckyDraw','activityId='+$.activityId+'&pin='+encodeURIComponent($.secretPin));
						await $.wait(2500);
					}
				}
			}else{
				$.log('未能成功获取到活动信息');
			}
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
function task(QQ000O0,OQ0QOQ0,OOQQOO0=0){
	return new Promise(OQ0QOQO=>{
		$.post(taskUrl(QQ000O0,OQ0QOQ0,OOQQOO0),async(O0QOQOQ,Q00QOO0,O0QOQOO)=>{
			try{
				if(O0QOQOQ){
					$.log(O0QOQOQ);
				}else{
					if(O0QOQOO){
						O0QOQOO=JSON.parse(O0QOQOO);
						if(Q00QOO0.headers['set-cookie']){
							cookie=originCookie+';';
							for(let O00QQ00 of Q00QOO0.headers['set-cookie']){
								lz_cookie[O00QQ00.split(';')[0].substr(0,O00QQ00.split(';')[0].indexOf('='))]=O00QQ00.split(';')[0].substr(O00QQ00.split(';')[0].indexOf('=')+1);
							}for(const Q000OQ0 of Object.keys(lz_cookie)){
								cookie+=(Q000OQ0+'='+lz_cookie[Q000OQ0]+';');
							}
						}if(O0QOQOO.result){
							switch(QQ000O0){
								case 'customer/getSimpleActInfoVo':
									$.jdActivityId=O0QOQOO.data.jdActivityId;
									$.venderId=O0QOQOO.data.venderId;
									$.activityShopId=O0QOQOO.data.venderId;
									break;
								case 'activityContent':
									$.activityContent=O0QOQOO.data.activityId;
									$.chance=O0QOQOO.data.chance||0;
									$.activityName=O0QOQOO.data.activityName||'';
									if($.index===1){
															ownCode=O0QOQOO.data.uid;
														}
									break;
								case 'myInfo':
									$.taskList=O0QOQOO.data.taskList;
									break;
								case 'wxActionCommon/getUserInfo':
									if(O0QOQOO.data.yunMidImageUrl){
															if($.index===1){
										ownCode.pinImg=O0QOQOO.data.yunMidImageUrl;
										ownCode.nickname=O0QOQOO.data.nickname;
									}
															$.pinImg=O0QOQOO.data.yunMidImageUrl;
														}else{
															if($.index===1){
										ownCode.pinImg='https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
										ownCode.nickname=O0QOQOO.data.nickname;
									}
															$.pinImg='https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png';
														}
									break;
								case 'helpFriend':
									$.helpFriend=O0QOQOO.data.helpFriendMsg;
									console.log('  >> '+$.helpFriend);
									break;
								case 'wxAssemblePage/shopinfo':
									break;
								case 'doTask':
									if(O0QOQOO.result){
															console.log('  >> 任务完成');
														}else{
															$.log(O0QOQOO.result);
														}
									break;
								case 'getProduct':
									$.getProduct=O0QOQOO.data;
									break;
								case 'draw/luckyDraw':
									if(O0QOQOO.data.drawOk){
															console.log(''+O0QOQOO.data.name);
															message+=O0QOQOO.data.name;
															llnothing=false;
														}else{
															console.log('谢谢参与');
														}
									break;
								default:
									$.log(JSON.stringify(O0QOQOO));
									break;
							}
							await $.wait(2000);
						}
					}else{}
				}
			}catch(QQOQ0QQ){
				$.log(QQOQ0QQ);
			}
			finally{
				OQ0QOQO();
			}
		});
	});
}
function taskUrl(O0000Q0,QOQ00QO,OOO0QQO){
	return{
		'url':OOO0QQO?'https://lzkj-isv.isvjcloud.com/'+O0000Q0:'https://lzkj-isv.isvjcloud.com/drawCenter/'+O0000Q0,'headers':{'Host':'lzkj-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkj-isv.isvjcloud.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':QOQ00QO
	};
}
function getMyPing(){
	let Q00OOO0={'url':'https://lzkj-isv.isvjcloud.com/customer/getMyPing','headers':{'Host':'lzkj-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkj-isv.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.activityShopId+'&token='+$.token+'&fromType=APP&riskType=1'};
	return new Promise(Q00O00Q=>{
		$.post(Q00OOO0,(QOOOQ0O,OOQQOQQ,Q00OOOQ)=>{
			try{
				if(QOOOQ0O){
					$.log(QOOOQ0O);
				}else{
					if(OOQQOQQ.headers['set-cookie']){
						cookie=originCookie+';';
						for(let OOO0QO0 of OOQQOQQ.headers['set-cookie']){
							lz_cookie[OOO0QO0.split(';')[0].substr(0,OOO0QO0.split(';')[0].indexOf('='))]=OOO0QO0.split(';')[0].substr(OOO0QO0.split(';')[0].indexOf('=')+1);
						}for(const Q00OOOO of Object.keys(lz_cookie)){
							cookie+=(Q00OOOO+'='+lz_cookie[Q00OOOO]+';');
						}
					}
					if(Q00OOOQ){
						Q00OOOQ=JSON.parse(Q00OOOQ);
						if(Q00OOOQ.result){
							$.log('你好，'+Q00OOOQ.data.nickname);
							$.pin=Q00OOOQ.data.nickname;
							$.secretPin=Q00OOOQ.data.secretPin;
						}else{
							$.log(Q00OOOQ.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(Q000QQQ){
				$.log(Q000QQQ);
			}
			finally{
				Q00O00Q();
			}
		});
	});
}
function getFirstLZCK(){
	return new Promise(Q00OOQ0=>{
		$.get({'url':$.activityUrl,'headers':{
				'user-agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
			}},(OOO0QOO,QQOQO0O,QQOQO0Q)=>{
			try{
				if(OOO0QOO){
					console.log(OOO0QOO);
				}else{
					if(QQOQO0O.headers['set-cookie']){
						cookie=originCookie+';';
						for(let QQOOO00 of QQOQO0O.headers['set-cookie']){
							lz_cookie[QQOOO00.split(';')[0].substr(0,QQOOO00.split(';')[0].indexOf('='))]=QQOOO00.split(';')[0].substr(QQOOO00.split(';')[0].indexOf('=')+1);
						}
						for(const Q0O0QQQ of Object.keys(lz_cookie)){
							cookie+=(Q0O0QQQ+'='+lz_cookie[Q0O0QQQ]+';');
						}
						$.cookie=cookie;
					}
				}
			}catch(Q0O0000){
				console.log(Q0O0000);
			}
			finally{
				Q00OOQ0();
			}
		});
	});
}
function getToken(){
	let Q0O0QQO={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988'};
	return new Promise(OQO0OQO=>{
		$.post(Q0O0QQO,(OOO0OQQ,QOO00O0,OOO0OQO)=>{
			try{
				if(OOO0OQQ){
					$.log(OOO0OQQ);
				}else{
					if(OOO0OQO){
						OOO0OQO=JSON.parse(OOO0OQO);
						if(OOO0OQO.code==='0'){
							$.token=OOO0OQO.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(QOOO0QO){
				$.log(QOOO0QO);
			}
			finally{
				OQO0OQO();
			}
		});
	});
}
function random(O0OQO00,Q00OQO0){
	return Math.floor(Math.random()*Q00OQO0-O0OQO00)+O0OQO00;
}
function randomsb(){
	let OQOQ00O=['','','','','','',''];
	let OQOQOO0=OQOQ00O[Math.floor(Math.random()*OQOQ00O.length)];
	let O0O0O0O={'url':'https://api.m.jd.com/','body':'functionId=TaskInviteService&body='+JSON.stringify({'method':'participateInviteTask','data':{'channel':'1','encryptionInviterPin':encodeURIComponent(OQOQOO0),'type':1}})+'&appid=market-task-h5&uuid=&_t='+Date.now(),'headers':{
			'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://assignment.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://assignment.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':cookie
		}};
	$.post(O0O0O0O,(O0O0O0Q,QQO00QO,QQO00QQ)=>{});
}
function getUUID(OQOQ00Q='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',O00OO00=0){
	return OQOQ00Q.replace(/[xy]/g,function(QQOQ0OO){
		var O0000OQ=(Math.random()*0x10|0x0),Q0O0OOO=(QQOQ0OO=='x')?O0000OQ:(O0000OQ&0x3|0x8);
		if(O00OO00){
			uuid=Q0O0OOO.toString(36).toUpperCase();
		}else{
			uuid=Q0O0OOO.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const OO0O000={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(OOOQQQQ=>{
		$.get(OO0O000,(QQOQ0Q0,O0OQ0QQ,Q0O000O)=>{
			try{
				if(QQOQ0Q0){
					$.logErr(QQOQ0Q0);
				}else{
					if(Q0O000O){
						Q0O000O=JSON.parse(Q0O000O);
						if(Q0O000O.retcode==='1001'){
							$.isLogin=false;
							return;
						}if((Q0O000O.retcode==='0')&&Q0O000O.data.hasOwnProperty('userInfo')){
							$.nickName=Q0O000O.data.userInfo.baseInfo.nickname;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(Q0OQOQ0){
				$.logErr(Q0OQOQ0);
			}
			finally{
				OOOQQQQ();
			}
		});
	});
};
OＯ0$='jsjiami.com.v6';
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
