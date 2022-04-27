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

const $ = new Env('CJ组队瓜分京豆-加密');
const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_cjhy_activityId')?$.getdata('jd_kr_cjhy_activityId'):jd_cjhy_activityId;
activityUrl=$.getdata('jd_kr_cjhy_activityUrl')?$.getdata('jd_kr_cjhy_activityUrl'):jd_cjhy_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_cjhy_activityId)activityId=process.env.jd_cjhy_activityId;
	if(process.env.jd_cjhy_activityUrl)activityUrl=process.env.jd_cjhy_activityUrl;
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
	Object.keys(jdCookieNode).forEach(_0x11fc32=>{
		cookiesArr.push(jdCookieNode[_0x11fc32]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0x3d8cc3=>_0x3d8cc3.cookie)].filter(_0x4fcc13=>!!_0x4fcc13);
}
const JD_API_HOST='https://api.m.jd.com/client.action';
let isGetCookie=typeof $request!=='undefined';
if(isGetCookie){
	GetCookie();
	$.done();
}
!(async()=>{
	console.log('\n【如果显示：奖品与您擦肩而过了哟，可能是 此活动黑了！ 】\n【如果显示：Response code 493 ，可能是 变量不正确！ 】\n【还是显示：Response code 493 ，那么 此容器IP黑了！ 】\n');
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
	for(let _0x3a2ba1=0;_0x3a2ba1<cookiesArr.length;_0x3a2ba1++){
		if(cookiesArr[_0x3a2ba1]){
			cookie=cookiesArr[_0x3a2ba1];
			originCookie=cookiesArr[_0x3a2ba1];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(_0x3a2ba1+1);
			$.isLogin=true;
			$.nickName='';
			$.hotFlag=false;
			console.log(('\n******开始【京东账号'+$.index+'】'+$.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效',('京东账号'+$.index+' ')+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify(($.name+'cookie已失效 - ')+$.UserName,('京东账号'+$.index+' ')+$.UserName+'\n请重新登录获取cookie');
				}
				continue;
			}
			await getUA();
			await jrzd();
			if(!$.toactivity||$.maxTeam){
				break;
			}
		}
	}
	messageTitle+=('队伍人数 '+$.memberCount+'\n');
	await showMsg();
})().catch(_0x303549=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0x303549+'!','');
}).finally(()=>{
	$.done();
});
async function jrzd(){
	getUA();
	$.sid='';
	$.userId='691399';
	$.Token='';
	$.Pin='';
	$.hisPin='';
	$.card=[];
	$.saveTeam=false;
	await getCk();
	await getToken();
	await $.wait(1000);
	if($.Token==''){
		console.log('获取[token]失败！');
		return;
	}
	await getSimpleActInfoVo();
	await getshopInfo();
	await $.wait(1000);
	if($.sid&&$.userId){
		await getToken();
		if($.Token)await getPin();
		if($.hotFlag)return;
		console.log('pin:'+$.Pin);
		await $.wait(1000);
		await accessLog();
		await getUserInfo();
		await $.wait(1000);
		await getOpenCardInfo();
		await $.wait(1000);
		await getTeam();
		await $.wait(1000);
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
	return new Promise(_0x2fe124=>{
		$.msg($.name,'','【京东账号'+$.index+'】'+$.nickName+'\n'+message);
		_0x2fe124();
	});
}
function getSimpleActInfoVo(){
	return new Promise(_0x3a1a08=>{
		let _0xb9f818='activityId='+activityId;
		$.post(taskPostUrl('/customer/getSimpleActInfoVo',_0xb9f818),async(_0x54e393,_0x2c9a79,_0xb9bdf1)=>{
			try{
				if(_0x54e393){
					console.log(''+$.toStr(_0x54e393));
					console.log($.name+' getSimpleActInfoVo API请求失败，请检查网路重试');
				}else{
					if(_0x2c9a79.status==200){
						refreshToken(_0x2c9a79);
					}
				}
			}catch(_0x1f81e5){
				$.logErr(_0x1f81e5,_0x2c9a79);
			}
			finally{
				_0x3a1a08();
			}
		});
	});
}
function getCk(){
	return new Promise(_0x34dc4d=>{
		$.get({'url':(activityUrl+'/wxTeam/activity?activityId='+activityId),'headers':{'user-agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'}},(_0x68c985,_0x189e84,_0x2ab156)=>{
			try{
				if(_0x68c985){
					console.log(_0x68c985);
				}else{
					if(_0x189e84.headers['set-cookie']){
						cookie=''+originCookie;
						if($.isNode()){
							for(let _0x395ae3 of _0x189e84.headers['set-cookie']){
								cookie=''+cookie+_0x395ae3.split(';')[0]+';';
							}
						}else{
							for(let _0x58f7f7 of _0x189e84.headers['Set-Cookie'].split(',')){
								cookie=''+cookie+_0x58f7f7.split(';')[0]+';';
							}
						}
					}
					if(_0x189e84.headers['Set-Cookie']){
						cookie=''+originCookie;
						if($.isNode()){
							for(let _0x1d70eb of _0x189e84.headers['set-cookie']){
								cookie=''+cookie+_0x1d70eb.split(';')[0]+';';
							}
						}else{
							for(let _0x14e838 of _0x189e84.headers['Set-Cookie'].split(',')){
								cookie=''+cookie+_0x14e838.split(';')[0]+';';
							}
						}
					}
				}
			}catch(_0x28aaf5){
				console.log(_0x28aaf5);
			}
			finally{
				_0x34dc4d();
			}
		});
	});
}
function getToken(){
	let _0x3e8189={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988'};
	return new Promise(_0x3a1a87=>{
		$.post(_0x3e8189,(_0xec4fc0,_0x9fca5e,_0x387877)=>{
			try{
				if(_0xec4fc0){
					$.log(_0xec4fc0);
				}else{
					if(_0x387877){
						_0x387877=JSON.parse(_0x387877);
						if(_0x387877.code==='0'){
							$.Token=_0x387877.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x1b6bcb){
				$.log(_0x1b6bcb);
			}
			finally{
				_0x3a1a87();
			}
		});
	});
}
function getPin(){
	return new Promise(_0xd6fbad=>{
		let _0x57469f=(('userId='+$.userId+'&token=')+$.Token+'&fromType=APP&riskType=1');
		$.post(taskPostUrl('/customer/getMyPing',_0x57469f),async(_0x3483bd,_0x52a37e,_0x38ca5b)=>{
			try{
				if(_0x3483bd){
					console.log(''+JSON.stringify(_0x3483bd));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x38ca5b)){
						_0x38ca5b=JSON.parse(_0x38ca5b);
						if(_0x38ca5b.result&&_0x38ca5b.data){
							$.Pin=_0x38ca5b.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(_0x38ca5b));
							$.hotFlag=true;
						}
					}
				}
			}catch(_0x1bfcb8){
				$.logErr(_0x1bfcb8,_0x52a37e);
			}
			finally{
				_0xd6fbad();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(_0x1b8863=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(_0x48af28,_0x26465d,_0x4df64b)=>{
			try{
				if(_0x48af28){
					console.log(''+JSON.stringify(_0x48af28));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(_0x4df64b&&safeGet(_0x4df64b)){
						_0x4df64b=JSON.parse(_0x4df64b);
						if(_0x4df64b.data){
							$.sid=_0x4df64b.data.sid;
							$.userId=_0x4df64b.data.userId;
							$.shopName=_0x4df64b.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(_0x4df64b));
						}
					}
				}
			}catch(_0x274df2){
				$.logErr(_0x274df2,_0x26465d);
			}
			finally{
				_0x1b8863();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(_0x4ed741=>{
		let _0x13b719=(('venderId='+$.userId)+'&buyerPin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo',_0x13b719),async(_0x20e7c5,_0x145c9e,_0x2df8e3)=>{
			try{
				if(_0x20e7c5){
					console.log(''+JSON.stringify(_0x20e7c5));
					console.log($.name+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2df8e3)){
						_0x2df8e3=JSON.parse(_0x2df8e3);
						if(_0x2df8e3.result&&_0x2df8e3.data){
							if(_0x2df8e3.data.openCardLink){
								$.channel=_0x2df8e3.data.openCardLink.match(/channel=(\d+)/)[1];
								$.joinVenderId=_0x2df8e3.data.openCardLink.match(/venderId=(\d+)/)[1];
							}else{}
						}
					}
				}
			}catch(_0x432021){
				$.logErr(_0x432021,_0x145c9e);
			}
			finally{
				_0x4ed741();
			}
		});
	});
}
async function joinShop(){
	return new Promise(async _0x26ce35=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		await getshopactivityId();
		let _0x19ff4d='';
		let _0x4cd50c='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x19ff4d+',"channel":'+$.channel+'}';
		let _0x110336='20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157';
		const _0x27047f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x4cd50c+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x110336,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x27047f,async(_0x5b8c84,_0x5eaaaa,_0x14f158)=>{
			try{
				_0x14f158=_0x14f158&&_0x14f158.match(/jsonp_.*?\((.*?)\);/)&&_0x14f158.match(/jsonp_.*?\((.*?)\);/)[1]||_0x14f158;
				let _0x401f2a=$.toObj(_0x14f158,_0x14f158);
				if(_0x401f2a&&(typeof _0x401f2a=='object')){
					if(_0x401f2a&&(_0x401f2a.success===true)){
						console.log(_0x401f2a.message);
						$.errorJoinShop=_0x401f2a.message;
						if(_0x401f2a.result&&_0x401f2a.result.giftInfo){
							for(let _0x1cf41f of _0x401f2a.result.giftInfo.giftList){
								console.log('入会获得:'+_0x1cf41f.discountString+_0x1cf41f.prizeName+_0x1cf41f.secondLineDesc);
							}
						}
					}else if(_0x401f2a&&(typeof _0x401f2a=='object')&&_0x401f2a.message){
						$.errorJoinShop=_0x401f2a.message;
						console.log(''+(_0x401f2a.message||''));
					}else{
						console.log(_0x14f158);
					}
				}else{
					console.log(_0x14f158);
				}
			}catch(_0x11f9cc){
				$.logErr(_0x11f9cc,_0x5eaaaa);
			}
			finally{
				_0x26ce35();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x5dd2c6=>{
		let _0x43d80f='{"venderId":"'+$.joinVenderId+'","channel":'+$.channel+',"payUpShop":true}';
		let _0x3bc996='20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157';
		const _0x126ef3={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x43d80f+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x3bc996,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x126ef3,async(_0x521086,_0x385c4d,_0x1a6adf)=>{
			try{
				_0x1a6adf=_0x1a6adf&&_0x1a6adf.match(/jsonp_.*?\((.*?)\);/)&&_0x1a6adf.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1a6adf;
				let _0x114f4a=$.toObj(_0x1a6adf,_0x1a6adf);
				if(_0x114f4a&&(typeof _0x114f4a=='object')){
					if(_0x114f4a&&_0x114f4a.success==true){
						console.log('入会:'+(_0x114f4a.result.shopMemberCardInfo.venderCardName||''));
					}
				}else{
					console.log(_0x1a6adf);
				}
			}catch(_0x3daba8){
				$.logErr(_0x3daba8,_0x385c4d);
			}
			finally{
				_0x5dd2c6();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0x3d77b9=>{
		let _0x545d8f='pin='+encodeURIComponent($.Pin);
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',_0x545d8f),async(_0x4e5e41,_0x39d8aa,_0x5dd542)=>{
			try{
				if(_0x4e5e41){
					console.log(''+JSON.stringify(_0x4e5e41));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5dd542)){
						_0x5dd542=JSON.parse(_0x5dd542);
						if(_0x5dd542.result&&_0x5dd542.data){
							$.attrTouXiang=_0x5dd542.data.yunMidImageUrl?_0x5dd542.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify(_0x5dd542));
						}
					}
				}
			}catch(_0x3ed765){
				$.logErr(_0x3ed765,_0x39d8aa);
			}
			finally{
				_0x3d77b9();
			}
		});
	});
}
function getTeam(){
	return new Promise(_0x50021a=>{
		let _0xfdca93=(('activityId='+activityId)+'&pin='+encodeURIComponent(encodeURIComponent($.Pin)));
		if($.signUuid)_0xfdca93+=('&signUuid='+$.signUuid);
		$.post(taskPostUrl('/wxTeam/activityContent',_0xfdca93),async(_0x1dd857,_0x396cd0,_0x26dbcd)=>{
			try{
				if(_0x1dd857){
					console.log(''+JSON.stringify(_0x1dd857));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x26dbcd)){
						_0x26dbcd=JSON.parse(_0x26dbcd);
						if(_0x26dbcd.result&&_0x26dbcd.data){
							if(new Date(_0x26dbcd.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								_0x50021a();
							}else{
								if(!_0x26dbcd.data.canCreate&&(_0x26dbcd.data.list==null))message+='人数已满\n';
								if(_0x26dbcd.data.share){
									$.memberCount=(parseInt(_0x26dbcd.data.share.memberCount,10)+1);
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=_0x26dbcd.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+='最多可以组建'+$.teamNum+'个战队';
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									await $.wait(1000);
									await joinTeam();
								}if($.saveTeam){
									if(_0x26dbcd.data.canCreate){
										await $.wait(1000);
										await saveTeam();
									}else{
										$.signUuid=_0x26dbcd.data.signUuid;
										messageTitle+=('队伍id: '+$.signUuid)+'\n';
										message+=('【京东账号'+$.index+'】 创建队伍id: ')+$.signUuid;
										$.log('队伍id: '+$.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: '+$.signUuid);
										await joinTeam();
									}
								}
							}
						}else{
							console.log('异常5：'+JSON.stringify(_0x26dbcd));
						}
					}
				}
			}catch(_0xe94c13){
				$.logErr(_0xe94c13,_0x396cd0);
			}
			finally{
				_0x50021a(_0x50021a);
			}
		});
	});
}
function saveTeam(_0x2b470e=0){
	return new Promise(_0x5121b0=>{
		let _0x4ef101=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x2b470e==1)_0x4ef101=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x32ae0a=(('activityId='+activityId)+'&pin='+_0x4ef101+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveCaptain',_0x32ae0a),async(_0xcb34db,_0x5c7ddb,_0x131815)=>{
			try{
				if(_0xcb34db){
					console.log(''+JSON.stringify(_0xcb34db));
					console.log($.name+' 6 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x131815)){
						_0x131815=JSON.parse(_0x131815);
						if(_0x131815.result&&_0x131815.data){
							message+=(('【京东账号'+$.index)+'】 创建队伍id: '+_0x131815.data.signUuid+' ');
							console.log('创建队伍成功 id: '+_0x131815.data.signUuid);
							$.signUuid=_0x131815.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid)+' ';
						}else{
							console.log('异常6：'+JSON.stringify(_0x131815));
							if((_0x131815.errorMessage.indexOf('不是店铺会员')>-1)&&(_0x2b470e!=3)){
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
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第5次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await $.wait(1000);
								await saveTeam(3);
							}else if((_0x131815.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&_0x2b470e==0){
								await $.wait(1000);
								await saveTeam(1);
							}
						}
					}
				}
			}catch(_0x2b6f51){
				$.logErr(_0x2b6f51,_0x5c7ddb);
			}
			finally{
				_0x5121b0();
			}
		});
	});
}
function joinTeam(_0x5ee033=0){
	return new Promise(_0x503715=>{
		let _0x2ed5bb=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x5ee033==1)_0x2ed5bb=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x34bc8f=(('activityId='+activityId+'&signUuid='+$.signUuid)+'&pin='+_0x2ed5bb+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveMember',_0x34bc8f),async(_0x4abcdf,_0x124685,_0x51cb7e)=>{
			try{
				if(_0x4abcdf){
					console.log(''+JSON.stringify(_0x4abcdf));
					console.log($.name+' 7 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x51cb7e)){
						_0x51cb7e=JSON.parse(_0x51cb7e);
						if(_0x51cb7e.result&&_0x51cb7e.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((_0x51cb7e.errorMessage.indexOf('不是店铺会员')>-1)&&(_0x5ee033!=3)){
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
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第5次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await joinTeam(3);
							}else if(_0x51cb7e.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if((_0x51cb7e.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&_0x5ee033==0){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(_0x51cb7e));
								message+=(('【京东账号'+$.index)+'】 '+_0x51cb7e.errorMessage+'\n');
							}
						}
					}
				}
			}catch(_0x2d0d52){
				$.logErr(_0x2d0d52,_0x124685);
			}
			finally{
				_0x503715();
			}
		});
	});
}
function taskPostUrl(_0x1dfdbe,_0x33a645){
	return{'url':(''+activityUrl+_0x1dfdbe),'body':_0x33a645,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':activityUrl+'/wxTeam/activity?activityId='+activityId,'Cookie':((cookie+activityCookie+';IsvToken='+$.Token)+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA}};
}
function taskUrl(_0x3af63a,_0x52b053){
	return{'url':'https://api.m.jd.com/client.action'+_0x3af63a,'body':_0x52b053,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async _0x5438f9=>{
		const _0x558a6e={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post(_0x558a6e,(_0x32a5ab,_0x1214a5,_0x4d864b)=>{
			try{
				if(_0x32a5ab){
					console.log(''+JSON.stringify(_0x32a5ab));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x4d864b){
						_0x4d864b=JSON.parse(_0x4d864b);
						if(_0x4d864b.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x4987cd){
				$.logErr(_0x4987cd,_0x1214a5);
			}
			finally{
				_0x5438f9();
			}
		});
	});
}
function safeGet(_0x19df08){
	try{
		if(typeof JSON.parse(_0x19df08)=='object'){
			return true;
		}
	}catch(_0x791b1){
		console.log(_0x791b1);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function accessLog(){
	return new Promise(async _0x4cf92a=>{
		const _0x3047bc={'url':'https://cjhydz-isv.isvjcloud.com/common/accessLog','headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId'+activityId),'Cookie':((cookie+activityCookie)+';IsvToken='+$.Token)+';AUTH_C_USER='+$.AUTH_C_USER,'User-Agent':$.UA},'body':'venderId=691399&code=102&pin='+encodeURIComponent(encodeURIComponent($.Pin))+'&activityId='+activityId+'&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'+activityId+'&subType=app'};
		$.post(_0x3047bc,(_0x305dcb,_0x4c08e5,_0x321a60)=>{
			try{
				if(_0x305dcb){
					console.log(''+JSON.stringify(_0x305dcb));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x4c08e5.status==200){
						refreshToken(_0x4c08e5);
					}
				}
			}catch(_0x261db1){
				$.logErr(_0x261db1,_0x4c08e5);
			}
			finally{
				_0x4cf92a();
			}
		});
	});
}
function refreshToken(_0x476d23){
	let _0x1072cf=_0x476d23.headers['set-cookie'];
	if(_0x1072cf){
		activityCookie=_0x1072cf.map(_0xbed38=>{
			return _0xbed38.split(';')[0];
		}).join(';');
	}
}
function jsonParse(_0x3e9bf9){
	if(typeof strv=='string'){
		try{
			return JSON.parse(_0x3e9bf9);
		}catch(_0x9fc090){
			console.log(_0x9fc090);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let _0x60607d=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(_0x60607d){
				let _0x5f4479=$request.url.split('/');
				console.log('activityId: '+_0x60607d[1]);
				console.log('activityUrl: '+_0x5f4479[0]+'//'+_0x5f4479[2]);
				$.setdata(_0x60607d[1],'jd_kr_cjhy_activityId');
				$.setdata(_0x5f4479[0]+'//'+_0x5f4479[2],'jd_kr_cjhy_activityUrl');
				$.msg($.name,'获取activityId: 成功',('activityId:'+_0x60607d[1]+'\nactivityUrl:'+_0x5f4479[0])+'//'+_0x5f4479[2]);
			}else{
				$.msg($.name,'找不到activityId','');
			}
		}
	}
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}


