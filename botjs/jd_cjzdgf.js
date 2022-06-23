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
let lz_cookie={};
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_cjhy_activityId')?$.getdata('jd_kr_cjhy_activityId'):jd_cjhy_activityId;
activityUrl=$.getdata('jd_kr_cjhy_activityUrl')?$.getdata('jd_kr_cjhy_activityUrl'):jd_cjhy_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_cjhy_activityId)activityId=process.env.jd_cjhy_activityId;
	if(process.env.jd_cjhy_activityUrl)activityUrl=process.env.jd_cjhy_activityUrl;
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
	Object.keys(jdCookieNode).forEach(_0x2dae68=>{
		cookiesArr.push(jdCookieNode[_0x2dae68]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0x102bdf=>_0x102bdf.cookie)].filter(_0x44eb42=>!!_0x44eb42);
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
	for(let _0x3ce468=0;_0x3ce468<cookiesArr.length;_0x3ce468++){
		if(cookiesArr[_0x3ce468]){
			cookie=cookiesArr[_0x3ce468];
			originCookie=cookiesArr[_0x3ce468];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(_0x3ce468+1);
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
			await $.wait(1000);
			if(!$.toactivity||$.maxTeam){
				break;
			}
		}
	}
	messageTitle+=('队伍人数 '+$.memberCount+'\n');
	await showMsg();
})().catch(_0xc4c3de=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0xc4c3de+'!','');
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
	return new Promise(_0x4421f2=>{
		$.msg($.name,'','【京东账号'+$.index+'】'+$.nickName+'\n'+message);
		_0x4421f2();
	});
}
function getSimpleActInfoVo(){
	return new Promise(_0x549dec=>{
		let _0x1cd822='activityId='+activityId;
		$.post(taskPostUrl('/customer/getSimpleActInfoVo',_0x1cd822),async(_0x244850,_0x39bd44,_0x41732c)=>{
			try{
				if(_0x244850){
					console.log(''+$.toStr(_0x244850));
					console.log($.name+' getSimpleActInfoVo API请求失败，请检查网路重试');
				}else{}
			}catch(_0x292418){
				$.logErr(_0x292418,_0x39bd44);
			}
			finally{
				_0x549dec();
			}
		});
	});
}
function randomString(_0x3dbf83){
	_0x3dbf83=(_0x3dbf83||32);
	let _0x88ce34='abcdef0123456789',_0x59f20f=_0x88ce34.length,_0x41f58f='';
	for(i=0;i<_0x3dbf83;i++)_0x41f58f+=_0x88ce34.charAt(Math.floor(Math.random()*_0x59f20f));
	return _0x41f58f;
}
function getCk(){
	return new Promise(_0x45dd59=>{
		let _0xbf4c3e={'url':(activityUrl+'/wxTeam/activity?activityId='+activityId),'headers':{'Cookie':cookie,'User-Agent':$.UA}};
		$.get(_0xbf4c3e,async(_0x6378fb,_0x3ede6f,_0x299143)=>{
			try{
				if(_0x6378fb){
					console.log(''+JSON.stringify(_0x6378fb));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					if(_0x3ede6f.status==200){
						refreshToken(_0x3ede6f);
					}
				}
			}catch(_0x4afa47){
				$.logErr(_0x4afa47,_0x3ede6f);
			}
			finally{
				_0x45dd59();
			}
		});
	});
}
function getToken(){
	return new Promise(_0x5e0876=>{
		let _0x34dda2='adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator',_0x34dda2),async(_0x597da2,_0x4558ca,_0xa66240)=>{
			try{
				if(_0x597da2){
					console.log(''+JSON.stringify(_0x597da2));
					console.log($.name+' 2 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0xa66240)){
						_0xa66240=JSON.parse(_0xa66240);
						if((_0xa66240.code==0)&&_0xa66240.token){
							$.Token=_0xa66240.token;
						}else{
							console.log('异常2：'+JSON.stringify(_0xa66240));
						}
					}
				}
			}catch(_0x37d530){
				$.logErr(_0x37d530,_0x4558ca);
			}
			finally{
				_0x5e0876();
			}
		});
	});
}
function getPin(){
	return new Promise(_0x4f1211=>{
		let _0x4ffd1c=('userId='+$.userId+'&token='+$.Token+'&fromType=APP&riskType=1');
		$.post(taskPostUrl('/customer/getMyPing',_0x4ffd1c),async(_0x173301,_0x4652f3,_0x32ab8c)=>{
			try{
				if(_0x173301){
					console.log(''+JSON.stringify(_0x173301));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(_0x4652f3.status==200){
						refreshToken(_0x4652f3);
					}
					if(safeGet(_0x32ab8c)){
						_0x32ab8c=JSON.parse(_0x32ab8c);
						if(_0x32ab8c.result&&_0x32ab8c.data){
							$.Pin=_0x32ab8c.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(_0x32ab8c));
						}
					}
				}
			}catch(_0x13fdc4){
				$.logErr(_0x13fdc4,_0x4652f3);
			}
			finally{
				_0x4f1211();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(_0x3f431c=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(_0x18b7d1,_0x2dbc83,_0x27f7a2)=>{
			try{
				if(_0x18b7d1){
					console.log(''+JSON.stringify(_0x18b7d1));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(_0x27f7a2&&safeGet(_0x27f7a2)){
						_0x27f7a2=JSON.parse(_0x27f7a2);
						if(_0x27f7a2.data){
							$.sid=_0x27f7a2.data.sid;
							$.userId=_0x27f7a2.data.userId;
							$.shopName=_0x27f7a2.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(_0x27f7a2));
						}
					}
				}
			}catch(_0x5ee206){
				$.logErr(_0x5ee206,_0x2dbc83);
			}
			finally{
				_0x3f431c();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(_0x24b1dc=>{
		let _0x17b64b=('venderId='+$.userId+'&buyerPin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo',_0x17b64b),async(_0x11940a,_0x44703a,_0x2a6025)=>{
			try{
				if(_0x11940a){
					console.log(''+JSON.stringify(_0x11940a));
					console.log($.getOpenCardInfo+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2a6025)){
						_0x2a6025=JSON.parse(_0x2a6025);
						if(_0x2a6025.result&&_0x2a6025.data){
							if(_0x2a6025.data.openCardLink){
								$.channel=_0x2a6025.data.openCardLink.match(/channel=(\d+)/)[1];
								$.joinVenderId=_0x2a6025.data.openCardLink.match(/venderId=(\d+)/)[1];
							}else{}
						}
					}
				}
			}catch(_0xb7d81){
				$.logErr(_0xb7d81,_0x44703a);
			}
			finally{
				_0x24b1dc();
			}
		});
	});
}
function joinShop(){
	return new Promise(async _0x59fc8b=>{
		let _0xaf0ef3='{\n			  "venderId":"'+$.joinVenderId+'",\n			  "shopId":"'+$.joinVenderId+'",\n			  "bindByVerifyCodeFlag":1,\n			  "registerExtend":{},\n			  "writeChildFlag":0,\n			  "channel":'+$.channel+'\n			  }';
		$.errorJoinShop='';
		await getshopactivityId();
		let _0x124cc7='';
		let _0x2f1098=await geth5st();
		const _0x13919c={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0xaf0ef3+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x2f1098,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x13919c,async(_0x5db9cb,_0xe9e1ce,_0x48721f)=>{
			try{
				let _0x1507fe=$.toObj(_0x48721f,_0x48721f);
				if(typeof _0x1507fe=='object'){
					if(_0x1507fe.success===true){
						console.log(_0x1507fe.message);
						$.errorJoinShop=_0x1507fe.message;
						if(_0x1507fe.result&&_0x1507fe.result.giftInfo){
							for(let _0x52e44a of _0x1507fe.result.giftInfo.giftList){
								console.log('入会获得:'+_0x52e44a.discountString+_0x52e44a.prizeName+_0x52e44a.secondLineDesc);
							}
						}
					}else if((typeof _0x1507fe=='object')&&_0x1507fe.message){
						$.errorJoinShop=_0x1507fe.message;
						console.log(''+(_0x1507fe.message||''));
					}else{
						console.log(_0x48721f);
					}
				}else{
					console.log(_0x48721f);
				}
			}catch(_0x1f34cb){
				$.logErr(_0x1f34cb,_0xe9e1ce);
			}
			finally{
				_0x59fc8b();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(_0x1f7d34=>{
		const _0x3baf4d={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x3baf4d,async(_0x427caa,_0x312617,_0x56e1f1)=>{
			try{
				let _0x59e40c=$.toObj(_0x56e1f1,_0x56e1f1);
				if(typeof _0x59e40c=='object'){
					if(_0x59e40c.success==true){
						console.log('入会:'+(_0x59e40c.result.shopMemberCardInfo.venderCardName||''));
					}
				}else{
					console.log(_0x56e1f1);
				}
			}catch(_0x2a8dc5){
				$.logErr(_0x2a8dc5,_0x312617);
			}
			finally{
				_0x1f7d34();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0x1ee23a=>{
		let _0x4de5b3=('pin='+encodeURIComponent(encodeURIComponent($.Pin)));
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',_0x4de5b3),async(_0x469be2,_0x348fed,_0x17e9eb)=>{
			try{
				if(_0x469be2){
					console.log(''+JSON.stringify(_0x469be2));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x17e9eb)){
						_0x17e9eb=JSON.parse(_0x17e9eb);
						if(_0x17e9eb.result&&_0x17e9eb.data){
							$.attrTouXiang=_0x17e9eb.data.yunMidImageUrl?_0x17e9eb.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify(_0x17e9eb));
						}
					}
				}
			}catch(_0x3c6723){
				$.logErr(_0x3c6723,_0x348fed);
			}
			finally{
				_0x1ee23a();
			}
		});
	});
}
function getTeam(){
	return new Promise(_0x6ac9b9=>{
		let _0x422519=('activityId='+activityId+'&pin='+encodeURIComponent(encodeURIComponent($.Pin)));
		if($.signUuid)_0x422519+=('&signUuid='+$.signUuid);
		$.post(taskPostUrl('/wxTeam/activityContent',_0x422519),async(_0x50a112,_0x28e19d,_0x2adf4a)=>{
			try{
				if(_0x50a112){
					console.log(''+JSON.stringify(_0x50a112));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2adf4a)){
						_0x2adf4a=JSON.parse(_0x2adf4a);
						if(_0x2adf4a.result&&_0x2adf4a.data){
							if(new Date(_0x2adf4a.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								_0x6ac9b9();
							}else{
								if(!_0x2adf4a.data.canCreate&&(_0x2adf4a.data.list==null))message+='人数已满\n';
								if(_0x2adf4a.data.share){
									$.memberCount=(parseInt(_0x2adf4a.data.share.memberCount,10)+1);
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=_0x2adf4a.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+=('最多可以组建'+$.teamNum+'个战队');
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									$.wait(600);
									await joinTeam();
								}if($.saveTeam){
									if(_0x2adf4a.data.canCreate){
										await saveTeam();
									}else{
										$.signUuid=_0x2adf4a.data.signUuid;
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
							console.log('异常5：'+JSON.stringify(_0x2adf4a));
						}
					}
				}
			}catch(_0x40d26b){
				$.logErr(_0x40d26b,_0x28e19d);
			}
			finally{
				_0x6ac9b9(_0x6ac9b9);
			}
		});
	});
}
function saveTeam(_0x49d825=0){
	return new Promise(_0x35a0b3=>{
		let _0x228a11=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x49d825==1)_0x228a11=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x5929ac=('activityId='+activityId+'&pin='+_0x228a11+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveCaptain',_0x5929ac),async(_0x280073,_0x58ac94,_0x244a0a)=>{
			try{
				if(_0x280073){
					console.log(''+JSON.stringify(_0x280073));
					console.log($.name+'saveTeam API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x244a0a)){
						_0x244a0a=JSON.parse(_0x244a0a);
						if(_0x244a0a.result&&_0x244a0a.data){
							message+=('【京东账号'+$.index+'】 创建队伍id: '+_0x244a0a.data.signUuid+' ');
							console.log('创建队伍成功 id: '+_0x244a0a.data.signUuid);
							$.signUuid=_0x244a0a.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid+' ');
						}else{
							console.log('异常6：'+JSON.stringify(_0x244a0a));
							if((_0x244a0a.errorMessage.indexOf('不是店铺会员')>-1)&&(_0x49d825!=3)){
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
							}else if((_0x244a0a.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&(_0x49d825==0)){
								await $.wait(800);
								await saveTeam(1);
							}
						}
					}
				}
			}catch(_0x1ba2a0){
				$.logErr(_0x1ba2a0,_0x58ac94);
			}
			finally{
				_0x35a0b3();
			}
		});
	});
}
function joinTeam(_0x4dd127=0){
	return new Promise(_0x18c0ea=>{
		let _0x1f0c69=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x4dd127==1)_0x1f0c69=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x1c9bcb=('activityId='+activityId+'&signUuid='+$.signUuid+'&pin='+_0x1f0c69+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveMember',_0x1c9bcb),async(_0x4406bd,_0x217eda,_0x4973eb)=>{
			try{
				if(_0x4406bd){
					console.log(''+JSON.stringify(_0x4406bd));
					console.log($.name+'joinTeam API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x4973eb)){
						_0x4973eb=JSON.parse(_0x4973eb);
						if(_0x4973eb.result&&_0x4973eb.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((_0x4973eb.errorMessage.indexOf('不是店铺会员')>-1)&&(_0x4dd127!=3)){
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
							}else if(_0x4973eb.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if((_0x4973eb.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&(_0x4dd127==0)){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(_0x4973eb));
								message+=('【京东账号'+$.index+'】 '+_0x4973eb.errorMessage+'\n');
							}
						}
					}
				}
			}catch(_0x25b9b3){
				$.logErr(_0x25b9b3,_0x217eda);
			}
			finally{
				_0x18c0ea();
			}
		});
	});
}
function taskPostUrl(_0x2c1734,_0x480854){
	return{'url':(''+activityUrl+_0x2c1734),'body':_0x480854,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA}};
}
function taskUrl(_0x422460,_0x4940fa){
	return{'url':('https://api.m.jd.com/client.action'+_0x422460),'body':_0x4940fa,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async _0x1ec9ec=>{
		const _0x1cd804={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post(_0x1cd804,(_0xcc41e1,_0x300103,_0x5d8c88)=>{
			try{
				if(_0xcc41e1){
					console.log(''+JSON.stringify(_0xcc41e1));
					console.log($.name+'TotalBean API请求失败，请检查网路重试');
				}else{
					if(_0x5d8c88){
						_0x5d8c88=JSON.parse(_0x5d8c88);
						if(_0x5d8c88.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x5f37a2){
				$.logErr(_0x5f37a2,_0x300103);
			}
			finally{
				_0x1ec9ec();
			}
		});
	});
}
function safeGet(_0x2f5622){
	try{
		if(typeof JSON.parse(_0x2f5622)=='object'){
			return true;
		}
	}catch(_0x453d24){
		console.log(_0x453d24);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function accessLog(){
	return new Promise(async _0x34f9ca=>{
		const _0x122beb={'url':'https://cjhydz-isv.isvjcloud.com/common/accessLog','headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId'+activityId),'Cookie':(cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA},'body':'venderId=691399&code=102&pin='+encodeURIComponent(encodeURIComponent($.Pin))+'&activityId='+activityId+'&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'+activityId+'&subType=app'};
		$.post(_0x122beb,(_0x44d190,_0x1cb6cd,_0x55fef4)=>{
			try{
				if(_0x44d190){
					console.log(''+JSON.stringify(_0x44d190));
					console.log($.name+'accessLog API请求失败，请检查网路重试');
				}else{
					if(_0x1cb6cd.status==200){
						refreshToken(_0x1cb6cd);
					}
				}
			}catch(_0x116c09){
				$.logErr(_0x116c09,_0x1cb6cd);
			}
			finally{
				_0x34f9ca();
			}
		});
	});
}
function refreshToken(_0x2058f5){
	if(_0x2058f5.headers['set-cookie']){
		cookie=originCookie+';';
		for(let _0x2600ba of _0x2058f5.headers['set-cookie']){
			lz_cookie[_0x2600ba.split(';')[0].substr(0,_0x2600ba.split(';')[0].indexOf('='))]=_0x2600ba.split(';')[0].substr(_0x2600ba.split(';')[0].indexOf('=')+1);
		}
		for(const _0x114512 of Object.keys(lz_cookie)){
			cookie+=(_0x114512+'='+lz_cookie[_0x114512]+';');
		}
		activityCookie=cookie;
	}
}
function jsonParse(_0x48a3c4){
	if(typeof strv=='string'){
		try{
			return JSON.parse(_0x48a3c4);
		}catch(_0x2e6e60){
			console.log(_0x2e6e60);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let _0x5d7325=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(_0x5d7325){
				let _0xd44a80=$request.url.split('/');
				console.log('activityId: '+_0x5d7325[1]);
				console.log('activityUrl: '+_0xd44a80[0]+'//'+_0xd44a80[2]);
				$.setdata(_0x5d7325[1],'jd_kr_cjhy_activityId');
				$.setdata(_0xd44a80[0]+'//'+_0xd44a80[2],'jd_kr_cjhy_activityUrl');
				$.msg($.name,'获取activityId: 成功','activityId:'+_0x5d7325[1]+'\nactivityUrl:'+_0xd44a80[0]+'//'+_0xd44a80[2]);
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


