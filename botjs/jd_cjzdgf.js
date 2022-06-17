/*
活动地址为：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=xxxxx
一共有2个变量
jd_cjhy_activityId  活动ID 必需
jd_cjhy_activityUrl 活动地址 必需

cron:10 10 10 10 *
============Quantumultx===============
[task_local]
#CJ组队瓜分京豆
1 1 1 1 * jd_cjzdgf.js, tag=CJ组队瓜分京豆, enabled=true

*/

let jd_cjhy_activityId="2584bc5fb137415c87cedbb2e56bda3c" // 活动ID
let jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

const $ = new Env('CJ组队瓜分京豆');

const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
var timestamp=new Date().getTime();
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_cjhy_activityId')?$.getdata('jd_kr_cjhy_activityId'):jd_cjhy_activityId;
activityUrl=$.getdata('jd_kr_cjhy_activityUrl')?$.getdata('jd_kr_cjhy_activityUrl'):jd_cjhy_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_cjhy_activityId)activityId=process.env.jd_cjhy_activityId;
	if(process.env.jd_cjhy_activityUrl)activityUrl=process.env.jd_cjhy_activityUrl;
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
	Object.keys(jdCookieNode).forEach(O0OQ00Q=>{
		cookiesArr.push(jdCookieNode[O0OQ00Q]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(QQOQ000=>QQOQ000.cookie)].filter(Q00O0OQ=>!!Q00O0OQ);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
let isGetCookie=typeof $request!=='undefined';
if(isGetCookie){
	GetCookie();
	$.done();
}
!(async()=>{
	if(!activityId){
		$.msg($.name,'','活动id不存在');
		$.done();
		return;
	}
	console.log('【当前活动入口】\nhttps://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId='+activityId);
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.memberCount=0;
	messageTitle+=('活动id:\n'+activityId+'\n');
	$.toactivity=[];
	for(let QQQQOQ0=0;QQQQOQ0<cookiesArr.length;QQQQOQ0++){
		if(cookiesArr[QQQQOQ0]){
			cookie=cookiesArr[QQQQOQ0];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(QQQQOQ0+1);
			$.isLogin=true;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+$.nickName||$.UserName+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+$.nickName||$.UserName+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await jrzd();
			await $.wait(800);
			if(!$.toactivity||$.maxTeam){
				break;
			}
		}
	}
	messageTitle+=('队伍人数 '+$.memberCount+'\n');
	await showMsg();
})().catch(OQOOO0Q=>{
	$.log('',' '+$.name+', 失败! 原因: '+OQOOO0Q+'!','');
}).finally(()=>{
	$.done();
});
async function jrzd(){
	getUA();
	$.sid='';
	$.userId='';
	$.Token='';
	$.Pin='';
	$.hisPin='';
	$.card=[];
	$.saveTeam=false;
	await getCk();
	await getSimpleActInfoVo();
	await getshopInfo();
	await $.wait(1000);
	if($.sid&&$.userId){
		await getToken();
		if($.Token)await getPin();
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await $.wait(1000);
		await accessLog();
		await getUserInfo();
		await $.wait(1000);
		await getOpenCardInfo();
		await $.wait(1000);
		await getTeam();
		if($.maxTeam){
			console.log('队伍已满员');
			return;
		}
	}else{
		console.log('【京东账号'+$.index+'】 未能获取活动信息');
		message+=('【京东账号'+$.index+'】 未能获取活动信息\n');
	}
}
function getUA(){
	$.UA='jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function showMsg(){
	return new Promise(Q0Q00QO=>{
		$.msg($.name,'','【京东账号'+$.index+'】'+$.nickName+'\n'+message);
		Q0Q00QO();
	});
}
function getSimpleActInfoVo(){
	return new Promise(QQQQQO0=>{
		let QO0OQ00='activityId='+activityId;
		$.post(taskPostUrl('/customer/getSimpleActInfoVo',QO0OQ00),async(QO0O0OQ,OO00O0Q,Q0QOO00)=>{
			try{
				if(QO0O0OQ){
					console.log(''+$.toStr(QO0O0OQ));
					console.log($.name+' getSimpleActInfoVo API请求失败，请检查网路重试');
				}else{}
			}catch(OQQQOOQ){
				$.logErr(OQQQOOQ,OO00O0Q);
			}
			finally{
				QQQQQO0();
			}
		});
	});
}
function randomString(OQQQ00O){
	OQQQ00O=(OQQQ00O||32);
	let QQOOQO0='abcdef0123456789',QQQQQQQ=QQOOQO0.length,Q0Q0Q00='';
	for(i=0;i<OQQQ00O;i++)Q0Q0Q00+=QQOOQO0.charAt(Math.floor(Math.random()*QQQQQQQ));
	return Q0Q0Q00;
}
function getCk(){
	return new Promise(QQOOQOQ=>{
		let OQQ000Q={'url':(activityUrl+'/wxTeam/activity?activityId='+activityId),'headers':{'Cookie':cookie,'User-Agent':$.UA}};
		$.get(OQQ000Q,async(QO0QQ00,QO0Q0OO,O0QQ0QQ)=>{
			try{
				if(QO0QQ00){
					console.log(''+JSON.stringify(QO0QQ00));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					if(QO0Q0OO.status==200){
						refreshTokens(QO0Q0OO);
					}
				}
			}catch(Q0QQO00){
				$.logErr(Q0QQO00,QO0Q0OO);
			}
			finally{
				QQOOQOQ();
			}
		});
	});
}
function getToken(){
	return new Promise(Q0OO0OQ=>{
		let OQQQQOQ='adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator',OQQQQOQ),async(OQQOOQ0,Q0QQ0QO,OO0Q0OQ)=>{
			try{
				if(OQQOOQ0){
					console.log(''+JSON.stringify(OQQOOQ0));
					console.log($.name+' 2 API请求失败，请检查网路重试');
				}else{
					if(safeGet(OO0Q0OQ)){
						OO0Q0OQ=JSON.parse(OO0Q0OQ);
						if((OO0Q0OQ.code==0)&&OO0Q0OQ.token){
							$.Token=OO0Q0OQ.token;
						}else{
							console.log('异常2：'+JSON.stringify(OO0Q0OQ));
						}
					}
				}
			}catch(OO0OO0O){
				$.logErr(OO0OO0O,Q0QQ0QO);
			}
			finally{
				Q0OO0OQ();
			}
		});
	});
}
function getPin(){
	return new Promise(O0Q00OO=>{
		let O0Q0Q0Q=('userId='+$.userId+'&token='+$.Token+'&fromType=APP&riskType=1');
		$.post(taskPostUrl('/customer/getMyPing',O0Q0Q0Q),async(OQ0O00Q,O0QOO0Q,O0QQ0O0)=>{
			try{
				if(OQ0O00Q){
					console.log(''+JSON.stringify(OQ0O00Q));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(O0QOO0Q.status==200){
						refreshTokens(O0QOO0Q);
					}
					if(safeGet(O0QQ0O0)){
						O0QQ0O0=JSON.parse(O0QQ0O0);
						if(O0QQ0O0.result&&O0QQ0O0.data){
							$.Pin=O0QQ0O0.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(O0QQ0O0));
						}
					}
				}
			}catch(OOQO0O0){
				$.logErr(OOQO0O0,O0QOO0Q);
			}
			finally{
				O0Q00OO();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(OQQOQQQ=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(Q000O0O,QQ0QOQ0,O0QQQ0O)=>{
			try{
				if(Q000O0O){
					console.log(''+JSON.stringify(Q000O0O));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(O0QQQ0O&&safeGet(O0QQQ0O)){
						O0QQQ0O=JSON.parse(O0QQQ0O);
						if(O0QQQ0O.data){
							$.sid=O0QQQ0O.data.sid;
							$.userId=O0QQQ0O.data.userId;
							$.shopName=O0QQQ0O.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(O0QQQ0O));
						}
					}
				}
			}catch(OOQOO0Q){
				$.logErr(OOQOO0Q,QQ0QOQ0);
			}
			finally{
				OQQOQQQ();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(OQQOQOO=>{
		let Q00QO0Q=('venderId='+$.userId+'&buyerPin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo',Q00QO0Q),async(QQ00000,QQ00QQQ,O0QO0QQ)=>{
			try{
				if(QQ00000){
					console.log(''+JSON.stringify(QQ00000));
					console.log($.getOpenCardInfo+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(O0QO0QQ)){
						O0QO0QQ=JSON.parse(O0QO0QQ);
						if(O0QO0QQ.result&&O0QO0QQ.data){
							if(O0QO0QQ.data.openCardLink){
								$.channel=O0QO0QQ.data.openCardLink.match(/channel=(\d+)/)[1];
								$.joinVenderId=O0QO0QQ.data.openCardLink.match(/venderId=(\d+)/)[1];
							}else{}
						}
					}
				}
			}catch($Q$0QQ){
				$.logErr($Q$0QQ,QQ00QQQ);
			}
			finally{
				OQQOQOO();
			}
		});
	});
}
function joinShop(){
	return new Promise(async $O$$00=>{
		let O00Q0$='{\n			  "venderId":"'+$.joinVenderId+'",\n			  "shopId":"'+$.joinVenderId+'",\n			  "bindByVerifyCodeFlag":1,\n			  "registerExtend":{},\n			  "writeChildFlag":0,\n			  "channel":'+$.channel+'\n			  }';
		$.errorJoinShop='';
		await getshopactivityId();
		let OQQ$OO='';
		let $$O$QO=await geth5st();
		const OQQ$OQ={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+O00Q0$+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+$$O$QO,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(OQQ$OQ,async(OQQ$O$,QOQ$O0,OQ0$QQ)=>{
			try{
				let OQ0$O$=$.toObj(OQ0$QQ,OQ0$QQ);
				if(typeof OQ0$O$=='object'){
					if(OQ0$O$.success===true){
						console.log(OQ0$O$.message);
						$.errorJoinShop=OQ0$O$.message;
						if(OQ0$O$.result&&OQ0$O$.result.giftInfo){
							for(let QOQ$QO of OQ0$O$.result.giftInfo.giftList){
								console.log('入会获得:'+QOQ$QO.discountString+QOQ$QO.prizeName+QOQ$QO.secondLineDesc);
							}
						}
					}else if((typeof OQ0$O$=='object')&&OQ0$O$.message){
						$.errorJoinShop=OQ0$O$.message;
						console.log(''+(OQ0$O$.message||''));
					}else{
						console.log(OQ0$QQ);
					}
				}else{
					console.log(OQ0$QQ);
				}
			}catch(OQ0$OO){
				$.logErr(OQ0$OO,QOQ$O0);
			}
			finally{
				$O$$00();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(Q0$0O$=>{
		const $00$OQ={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get($00$OQ,async($0Q$O$,O0OQ$,$00$Q0)=>{
			try{
				let $$O$OQ=$.toObj($00$Q0,$00$Q0);
				if(typeof $$O$OQ=='object'){
					if($$O$OQ.success==true){
						console.log('入会:'+($$O$OQ.result.shopMemberCardInfo.venderCardName||''));
					}
				}else{
					console.log($00$Q0);
				}
			}catch($O$$O){
				$.logErr($O$$O,O0OQ$);
			}
			finally{
				Q0$0O$();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(QO0OO$=>{
		let $0OQQ$=('pin='+encodeURIComponent(encodeURIComponent($.Pin)));
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',$0OQQ$),async(O0O0O$,$0Q$QO,$QQ$$0)=>{
			try{
				if(O0O0O$){
					console.log(''+JSON.stringify(O0O0O$));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet($QQ$$0)){
						$QQ$$0=JSON.parse($QQ$$0);
						if($QQ$$0.result&&$QQ$$0.data){
							$.attrTouXiang=$QQ$$0.data.yunMidImageUrl?$QQ$$0.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify($QQ$$0));
						}
					}
				}
			}catch($0OQOO){
				$.logErr($0OQOO,$0Q$QO);
			}
			finally{
				QO0OO$();
			}
		});
	});
}
function getTeam(){
	return new Promise(Q$O$0$=>{
		let Q$O$=('activityId='+activityId+'&pin='+encodeURIComponent(encodeURIComponent($.Pin)));
		if($.signUuid)Q$O$+=('&signUuid='+$.signUuid);
		$.post(taskPostUrl('/wxTeam/activityContent',Q$O$),async(Q$$0$0,$O$O00,OO$OQO)=>{
			try{
				if(Q$$0$0){
					console.log(''+JSON.stringify(Q$$0$0));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(OO$OQO)){
						OO$OQO=JSON.parse(OO$OQO);
						if(OO$OQO.result&&OO$OQO.data){
							if(new Date(OO$OQO.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								Q$O$0$();
							}else{
								if(!OO$OQO.data.canCreate&&(OO$OQO.data.list==null))message+='人数已满\n';
								if(OO$OQO.data.share){
									$.memberCount=(parseInt(OO$OQO.data.share.memberCount,10)+1);
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=OO$OQO.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+=('最多可以组建'+$.teamNum+'个战队');
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									$.wait(600);
									await joinTeam();
								}if($.saveTeam){
									if(OO$OQO.data.canCreate){
										await saveTeam();
									}else{
										$.signUuid=OO$OQO.data.signUuid;
										messageTitle+=('队伍id: '+$.signUuid+'\n');
										message+=('【京东账号'+$.index+'】 创建队伍id: '+$.signUuid);
										$.log('队伍id: '+$.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: '+$.signUuid);
										await joinTeam();
									}
								}
							}
						}else{
							console.log('异常5：'+JSON.stringify(OO$OQO));
						}
					}
				}
			}catch($O$O0Q){
				$.logErr($O$O0Q,$O$O00);
			}
			finally{
				Q$O$0$(Q$O$0$);
			}
		});
	});
}
function saveTeam($O0QQO=0){
	return new Promise(Q0OOQ$=>{
		let Q$$QQ0=encodeURIComponent(encodeURIComponent($.Pin));
		if($O0QQO==1)Q$$QQ0=encodeURIComponent(encodeURIComponent($.Pin));
		let $$Q00=('activityId='+activityId+'&pin='+Q$$QQ0+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveCaptain',$$Q00),async(QOO0$0,Q$QOQ,O$0OO$)=>{
			try{
				if(QOO0$0){
					console.log(''+JSON.stringify(QOO0$0));
					console.log($.name+'saveTeam API请求失败，请检查网路重试');
				}else{
					if(safeGet(O$0OO$)){
						O$0OO$=JSON.parse(O$0OO$);
						if(O$0OO$.result&&O$0OO$.data){
							message+=('【京东账号'+$.index+'】 创建队伍id: '+O$0OO$.data.signUuid+' ');
							console.log('创建队伍成功 id: '+O$0OO$.data.signUuid);
							$.signUuid=O$0OO$.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid+' ');
						}else{
							console.log('异常6：'+JSON.stringify(O$0OO$));
							if((O$0OO$.errorMessage.indexOf('不是店铺会员')>-1)&&($O0QQO!=3)){
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
								await $.wait(800);
								await saveTeam(3);
							}else if((O$0OO$.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&($O0QQO==0)){
								await $.wait(800);
								await saveTeam(1);
							}
						}
					}
				}
			}catch(OQQ$Q){
				$.logErr(OQQ$Q,Q$QOQ);
			}
			finally{
				Q0OOQ$();
			}
		});
	});
}
function joinTeam(OQQ$O=0){
	return new Promise(Q$00O$=>{
		let $$$QOQ=encodeURIComponent(encodeURIComponent($.Pin));
		if(OQQ$O==1)$$$QOQ=encodeURIComponent(encodeURIComponent($.Pin));
		let QQ$OQ0=('activityId='+activityId+'&signUuid='+$.signUuid+'&pin='+$$$QOQ+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveMember',QQ$OQ0),async($QQO0$,$$$QOO,QOQ$)=>{
			try{
				if($QQO0$){
					console.log(''+JSON.stringify($QQO0$));
					console.log($.name+'joinTeam API请求失败，请检查网路重试');
				}else{
					if(safeGet(QOQ$)){
						QOQ$=JSON.parse(QOQ$);
						if(QOQ$.result&&QOQ$.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((QOQ$.errorMessage.indexOf('不是店铺会员')>-1)&&(OQQ$O!=3)){
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
								await joinTeam(3);
							}else if(QOQ$.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if((QOQ$.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&(OQQ$O==0)){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(QOQ$));
								message+=('【京东账号'+$.index+'】 '+QOQ$.errorMessage+'\n');
							}
						}
					}
				}
			}catch($QQO00){
				$.logErr($QQO00,$$$QOO);
			}
			finally{
				Q$00O$();
			}
		});
	});
}
function taskPostUrl($Q0O$Q,$00Q$$){
	return{'url':(''+activityUrl+$Q0O$Q),'body':$00Q$$,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(cookie+activityCookies+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA}};
}
function taskUrl($Q0O$O,O0$O0O){
	return{'url':('https://api.m.jd.com/client.action'+$Q0O$O),'body':O0$O0O,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async $Q0$0$=>{
		const $0QQ$0={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post($0QQ$0,(Q0$QQ0,QOQO0$,Q0$00$)=>{
			try{
				if(Q0$QQ0){
					console.log(''+JSON.stringify(Q0$QQ0));
					console.log($.name+'TotalBean API请求失败，请检查网路重试');
				}else{
					if(Q0$00$){
						Q0$00$=JSON.parse(Q0$00$);
						if(Q0$00$.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch($0QQ$$){
				$.logErr($0QQ$$,QOQO0$);
			}
			finally{
				$Q0$0$();
			}
		});
	});
}
function safeGet(O$0Q$O){
	try{
		if(typeof JSON.parse(O$0Q$O)=='object'){
			return true;
		}
	}catch(Q0$QO0){
		console.log(Q0$QO0);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function accessLog(){
	return new Promise(async $0O0O$=>{
		const $$O$$Q={'url':'https://cjhydz-isv.isvjcloud.com/common/accessLog','headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId'+activityId),'Cookie':(cookie+activityCookies+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA},'body':'venderId=691399&code=102&pin='+encodeURIComponent(encodeURIComponent($.Pin))+'&activityId='+activityId+'&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'+activityId+'&subType=app'};
		$.post($$O$$Q,(QQ$$Q$,$$O$$O,$$0$0)=>{
			try{
				if(QQ$$Q$){
					console.log(''+JSON.stringify(QQ$$Q$));
					console.log($.name+'accessLog API请求失败，请检查网路重试');
				}else{}
			}catch(O$O0QQ){
				$.logErr(O$O0QQ,$$O$$O);
			}
			finally{
				$0O0O$();
			}
		});
	});
}
function refreshTokens(QO0$$$){
	let $00Q00=QO0$$$&&QO0$$$.headers&&(QO0$$$.headers['set-cookie']||QO0$$$.headers['Set-Cookie']||'')||'';
	if($00Q00){
		activityCookies=$00Q00.map(O0$$Q0=>{
			return O0$$Q0.split(';')[0];
		}).join(';');
	}
}
function jsonParse($00Q0$){
	if(typeof strv=='string'){
		try{
			return JSON.parse($00Q0$);
		}catch(O$O0OO){
			console.log(O$O0OO);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let Q$$Q$Q=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(Q$$Q$Q){
				let $O$OQ0=$request.url.split('/');
				console.log('activityId: '+Q$$Q$Q[1]);
				console.log('activityUrl: '+$O$OQ0[0]+'//'+$O$OQ0[2]);
				$.setdata(Q$$Q$Q[1],'jd_kr_cjhy_activityId');
				$.setdata($O$OQ0[0]+'//'+$O$OQ0[2],'jd_kr_cjhy_activityUrl');
				$.msg($.name,'获取activityId: 成功','activityId:'+Q$$Q$Q[1]+'\nactivityUrl:'+$O$OQ0[0]+'//'+$O$OQ0[2]);
			}else{
				$.msg($.name,'找不到activityId','');
			}
		}
	}
};
function generateFp(){
	let _0x12ac7e='0123456789';
	let _0x109ede=13;
	let _0xee57cd='';
	for(;_0x109ede--;)_0xee57cd+=_0x12ac7e[Math.random()*_0x12ac7e.length|0x0];
	return (_0xee57cd+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x5b102d=Date.now();
	let _0x4617c8=generateFp();
	let _0x14cd4a=new Date(_0x5b102d).Format('yyyyMMddhhmmssSSS');
	let _0x20a237=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0xb1ba92=_0x20a237[random(0,_0x20a237.length)];
	return encodeURIComponent((_0x14cd4a+';'+_0x4617c8+_0xb1ba92)+Date.now());
}
Date.prototype.Format=function(_0x47fb06){
	var _0x506f28,_0x3343c4=this,_0x23e2fb=_0x47fb06,_0x403bf9={'M+':_0x3343c4.getMonth()+1,'d+':_0x3343c4.getDate(),'D+':_0x3343c4.getDate(),'h+':_0x3343c4.getHours(),'H+':_0x3343c4.getHours(),'m+':_0x3343c4.getMinutes(),'s+':_0x3343c4.getSeconds(),'w+':_0x3343c4.getDay(),'q+':Math.floor((_0x3343c4.getMonth()+3)/3),'S+':_0x3343c4.getMilliseconds()};
	/(y+)/i.test(_0x23e2fb)&&(_0x23e2fb=_0x23e2fb.replace(RegExp.$1,''.concat(_0x3343c4.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0x2cee3b in _0x403bf9){
		if(new RegExp('('.concat(_0x2cee3b,')')).test(_0x23e2fb)){
			var _0x58bbf0,_0xb845f2=('S+'===_0x2cee3b)?'000':'00';
			_0x23e2fb=_0x23e2fb.replace(RegExp.$1,1==RegExp.$1.length?_0x403bf9[_0x2cee3b]:(''.concat(_0xb845f2)+_0x403bf9[_0x2cee3b]).substr(''.concat(_0x403bf9[_0x2cee3b]).length));
		}
	}
	return _0x23e2fb;
};
function random(_0x27fdb8,_0x2fb8ca){
	return Math.floor(Math.random()*(_0x2fb8ca-_0x27fdb8))+_0x27fdb8;
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


