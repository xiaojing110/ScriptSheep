/*

一共有2个变量
jd_zdjr_activityId  活动ID 必需
jd_zdjr_activityUrl 活动地址 必需

已适配docker

加密脚本

需要配合重写获取=>活动id、活动地址

https://\w+-isv.isvjcloud.com/wxTeam/shopInfo url script-request-body jd_zdjr.js

mitm
*-isv.isvjcloud.com
[task_local]
组队瓜分京豆
40 11 * * * jd_zdjr.js, tag=组队瓜分京豆, enabled=true
================Loon==============
[Script]
cron "40 11 * * *" script-path=jd_zdjr.js,tag=组队瓜分京豆

*/

let jd_zdjr_activityId = ''// 活动ID
let jd_zdjr_activityUrl = ''// 活动地址
const $ = new Env('LZ组队瓜分京豆');

const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_zdjr_activityId')?$.getdata('jd_kr_zdjr_activityId'):jd_zdjr_activityId;
activityUrl=$.getdata('jd_kr_zdjr_activityUrl')?$.getdata('jd_kr_zdjr_activityUrl'):jd_zdjr_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_zdjr_activityId)activityId=process.env.jd_zdjr_activityId;
	if(process.env.jd_zdjr_activityUrl)activityUrl=process.env.jd_zdjr_activityUrl;
	Object.keys(jdCookieNode).forEach(_0x3cc8a4=>{
		cookiesArr.push(jdCookieNode[_0x3cc8a4]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x5b89cd=>_0x5b89cd.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x2ea98c=>!!_0x2ea98c);
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
	console.log('【当前活动入口】\nhttps://lzkjdz-isv.isvjcloud.com/wxTeam/activity?activityId='+activityId);
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.memberCount=0;
	messageTitle+='活动id:\n'+activityId+'\n';
	$.toactivity=true;
	for(let _0x49fac9=0;_0x49fac9<cookiesArr.length;_0x49fac9++){
		if(cookiesArr[_0x49fac9]){
			cookie=cookiesArr[_0x49fac9];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(_0x49fac9+1);
			$.isLogin=true;
			$.nickName='';
			console.log(('\n******开始【京东账号'+$.index)+'】'+($.nickName||$.UserName)+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效','京东账号'+$.index+' '+$.nickName||$.UserName+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify(($.name+'cookie已失效 - ')+$.UserName,('京东账号'+$.index)+' '+$.UserName+'\n请重新登录获取cookie');
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
})().catch(_0x1d1917=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0x1d1917+'!','');
}).finally(()=>{
	$.done();
});
async function jrzd(){
	$.sid='',$.userId='',$.Token='',$.Pin='';
	$.saveTeam=false;
	await getCk();
	await getshopInfo();
	if($.sid&&$.userId){
		await getToken();
		if($.Token)await getPin();
		console.log('pin:'+$.Pin);
		await getUserInfo();
		await $.wait(500);
		await getOpenCardInfo();
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
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x16b952){
	_0x16b952=_0x16b952||32;
	let _0x202c90='abcdef0123456789',_0x229e9c=_0x202c90.length,_0x2605e1='';
	for(i=0;i<_0x16b952;i++)_0x2605e1+=_0x202c90.charAt(Math.floor(Math.random()*_0x229e9c));
	return _0x2605e1;
}
function showMsg(){
	return new Promise(_0x47737b=>{
		let _0x23f426=openAppUrl();
		console.log('运行完毕');
		console.log(_0x23f426);
		$.msg($.name,''+$.shopName,''+messageTitle+message+' \n点击弹窗跳转到京东APP活动页面',{'open-url':_0x23f426});
		_0x47737b();
	});
}
function openAppUrl(){
	let _0x21740a=(activityUrl+'/wxTeam/activity?activityId='+activityId);
	let _0x37340c=_0x21740a;
	if(_0x21740a.substr(0,5)==='https'){
		let _0x175a7f={'category':'jump','des':'getCoupon','url':_0x21740a.substr(8)};
		_0x37340c=('openApp.jdMobile://virtual?params='+encodeURIComponent(JSON.stringify(_0x175a7f)));
	}else if(_0x21740a.substr(0,4)==='http'){
		let _0x1a9cf2={'category':'jump','des':'getCoupon','url':_0x21740a.substr(7)};
		_0x37340c=('openApp.jdMobile://virtual?params='+encodeURIComponent(JSON.stringify(_0x1a9cf2)));
	}
	return _0x37340c;
}
function getCk(){
	return new Promise(_0x3a7d15=>{
		let _0xd2cc3={'url':'https://lzkjdz-isv.isvjcloud.com/wxTeam/activity?activityId='+$.activityId+'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxTeam/activity?activityId='+$.activityId+'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0','User-Agent':$.UA},'timeout':30000};
		$.get(_0xd2cc3,async(_0x3e2fa2,_0x2910a2,_0x87aec1)=>{
			try{
				if(_0x3e2fa2){
					console.log(''+$.toStr(_0x3e2fa2));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					setActivityCookie(_0x2910a2);
				}
			}catch(_0x3ffc59){
				$.logErr(_0x3ffc59,_0x2910a2);
			}
			finally{
				_0x3a7d15();
			}
		});
	});
}
function setActivityCookie(_0x22ac67){
	let _0x4a5779='';
	let _0x5edd8f='';
	let _0x11fa27='';
	let _0x448cc9=_0x22ac67&&_0x22ac67.headers&&(_0x22ac67.headers['set-cookie']||_0x22ac67.headers['Set-Cookie']||'')||'';
	let _0x455c6b='';
	if(_0x448cc9){
		if(typeof _0x448cc9!='object'){
			_0x455c6b=_0x448cc9.split(',');
		}else _0x455c6b=_0x448cc9;
		for(let _0x30b8f5 of _0x455c6b){
			let _0x2c3d5f=_0x30b8f5.split(';')[0].trim();
			if(_0x2c3d5f.split('=')[1]){
				if(_0x2c3d5f.indexOf('LZ_TOKEN_KEY=')>-1)_0x4a5779=(_0x2c3d5f.replace(/ /g,'')+';');
				if(_0x2c3d5f.indexOf('LZ_TOKEN_VALUE=')>-1)_0x5edd8f=(_0x2c3d5f.replace(/ /g,'')+';');
				if(_0x2c3d5f.indexOf('lz_jdpin_token=')>-1)_0x11fa27=(''+_0x2c3d5f.replace(/ /g,'')+';');
			}
		}
	}
	if(_0x4a5779&&_0x5edd8f)activityCookie=_0x4a5779+' '+_0x5edd8f;
	if(_0x11fa27)lz_jdpin_token_cookie=_0x11fa27;
}
function getToken(){
	return new Promise(_0xd50eed=>{
		let _0x2717c4='adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator',_0x2717c4),async(_0x904724,_0x5d50b5,_0x469829)=>{
			try{
				if(_0x904724){
					console.log(''+JSON.stringify(_0x904724));
					console.log($.name+' 2 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x469829)){
						_0x469829=JSON.parse(_0x469829);
						if(_0x469829.code==0&&_0x469829.token){
							$.Token=_0x469829.token;
						}else{
							console.log('异常2：'+JSON.stringify(_0x469829));
						}
					}
				}
			}catch(_0x14092f){
				$.logErr(_0x14092f,_0x5d50b5);
			}
			finally{
				_0xd50eed();
			}
		});
	});
}
function getPin(){
	return new Promise(_0xb41fe8=>{
		let _0xc2fef=(('userId='+$.userId)+'&token='+$.Token+'&fromType=APP');
		$.post(taskPostUrl('/customer/getMyPing',_0xc2fef),async(_0x5d034a,_0x42c0cf,_0x447427)=>{
			try{
				if(_0x5d034a){
					console.log(''+JSON.stringify(_0x5d034a));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x447427)){
						_0x447427=JSON.parse(_0x447427);
						if(_0x447427.result&&_0x447427.data){
							$.Pin=_0x447427.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(_0x447427));
						}
					}
				}
			}catch(_0x56c665){
				$.logErr(_0x56c665,_0x42c0cf);
			}
			finally{
				_0xb41fe8();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(_0x16fce3=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(_0x95fcb7,_0x333b59,_0x2b58f5)=>{
			try{
				if(_0x95fcb7){
					console.log(''+JSON.stringify(_0x95fcb7));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(_0x2b58f5&&safeGet(_0x2b58f5)){
						_0x2b58f5=JSON.parse(_0x2b58f5);
						if(_0x2b58f5.data){
							$.sid=_0x2b58f5.data.sid;
							$.userId=_0x2b58f5.data.userId;
							$.shopName=_0x2b58f5.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(_0x2b58f5));
						}
					}
				}
			}catch(_0x4ea4bf){
				$.logErr(_0x4ea4bf,_0x333b59);
			}
			finally{
				_0x16fce3();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(_0x56d7d0=>{
		let _0x4c781d='venderId='+$.userId+'&activityId='+activityId+'&pin='+encodeURIComponent($.Pin);
		$.post(taskPostUrl('/wxCommonInfo/getActMemberInfo',_0x4c781d),async(_0x4c9c98,_0x2a75c1,_0x17e9cb)=>{
			try{
				if(_0x4c9c98){
					console.log(''+JSON.stringify(_0x4c9c98));
					console.log($.name+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x17e9cb)){
						_0x17e9cb=JSON.parse(_0x17e9cb);
						let _0xba3b86=_0x17e9cb.data.openCard||false;
						if(_0x17e9cb.result&&_0x17e9cb.data){
							if(_0x17e9cb.data.openCardUrl){
								$.channel=_0x17e9cb.data.openCardUrl.match(/channel=(\d+)/)[1];
								$.joinVenderId=_0x17e9cb.data.openCardUrl.match(/venderId=(\d+)/)[1];
							}else{
								console.log('异常4：'+JSON.stringify(_0x17e9cb));
							}
						}
					}
				}
			}catch(_0x389253){
				$.logErr(_0x389253,_0x2a75c1);
			}
			finally{
				_0x56d7d0();
			}
		});
	});
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x58a526=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let _0x1193be='';
		if($.shopactivityId)_0x1193be=',"activityId":'+$.shopactivityId;
		let _0x429603='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x1193be+',"channel":406}';
		let _0x2eb32f=await geth5st();
		const _0x5f1d81={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x429603+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x2eb32f,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x5f1d81,async(_0x2b7ca4,_0x35b0a6,_0x1b0fd9)=>{
			try{
				_0x1b0fd9=_0x1b0fd9&&_0x1b0fd9.match(/jsonp_.*?\((.*?)\);/)&&_0x1b0fd9.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1b0fd9;
				let _0x1d3871=$.toObj(_0x1b0fd9,_0x1b0fd9);
				if(_0x1d3871&&typeof _0x1d3871=='object'){
					if(_0x1d3871&&_0x1d3871.success===true){
						console.log(_0x1d3871.message);
						$.errorJoinShop=_0x1d3871.message;
						if(_0x1d3871.result&&_0x1d3871.result.giftInfo){
							for(let _0x5024b7 of _0x1d3871.result.giftInfo.giftList){
								console.log('入会获得:'+_0x5024b7.discountString+_0x5024b7.prizeName+_0x5024b7.secondLineDesc);
							}
						}
					}else if(_0x1d3871&&(typeof _0x1d3871=='object')&&_0x1d3871.message){
						$.errorJoinShop=_0x1d3871.message;
						console.log(''+(_0x1d3871.message||''));
					}else{
						console.log(_0x1b0fd9);
					}
				}else{
					console.log(_0x1b0fd9);
				}
			}catch(_0x23b1e0){
				$.logErr(_0x23b1e0,_0x35b0a6);
			}
			finally{
				_0x58a526();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0xc55282=>{
		let _0x33cdaa='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let _0x38a5c4=await geth5st();
		const _0x28edae={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x33cdaa+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x38a5c4,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x28edae,async(_0x2c6794,_0x4ea915,_0x27da1f)=>{
			try{
				_0x27da1f=_0x27da1f&&_0x27da1f.match(/jsonp_.*?\((.*?)\);/)&&_0x27da1f.match(/jsonp_.*?\((.*?)\);/)[1]||_0x27da1f;
				let _0x232b52=$.toObj(_0x27da1f,_0x27da1f);
				if(_0x232b52&&typeof _0x232b52=='object'){
					if(_0x232b52&&(_0x232b52.success==true)){
						console.log('入会:'+(_0x232b52.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x232b52.result.interestsRuleList&&_0x232b52.result.interestsRuleList[0]&&_0x232b52.result.interestsRuleList[0].interestsInfo&&_0x232b52.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x27da1f);
				}
			}catch(_0x20352a){
				$.logErr(_0x20352a,_0x4ea915);
			}
			finally{
				_0xc55282();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0x331946=>{
		let _0x686697='pin='+encodeURIComponent($.Pin);
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',_0x686697),async(_0x8f8044,_0x201598,_0x40004a)=>{
			try{
				if(_0x8f8044){
					console.log(''+JSON.stringify(_0x8f8044));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x40004a)){
						_0x40004a=JSON.parse(_0x40004a);
						if(_0x40004a.result&&_0x40004a.data){
							$.attrTouXiang=_0x40004a.data.yunMidImageUrl?_0x40004a.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify(_0x40004a));
						}
					}
				}
			}catch(_0xd6ad35){
				$.logErr(_0xd6ad35,_0x201598);
			}
			finally{
				_0x331946();
			}
		});
	});
}
function getTeam(){
	return new Promise(_0x27a877=>{
		let _0x298605=('activityId='+activityId+'&pin=')+encodeURIComponent($.Pin);
		if($.signUuid)_0x298605+=('&signUuid='+$.signUuid);
		$.post(taskPostUrl('/wxTeam/activityContent',_0x298605),async(_0x472d4b,_0xe608fd,_0x5ea2ce)=>{
			try{
				if(_0x472d4b){
					console.log(''+JSON.stringify(_0x472d4b));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5ea2ce)){
						_0x5ea2ce=JSON.parse(_0x5ea2ce);
						if(_0x5ea2ce.result&&_0x5ea2ce.data){
							if(new Date(_0x5ea2ce.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								_0x27a877();
							}else{
								if(!_0x5ea2ce.data.canCreate&&(_0x5ea2ce.data.list==null))message+='人数已满\n';
								if(_0x5ea2ce.data.share){
									$.memberCount=parseInt(_0x5ea2ce.data.share.memberCount,10)+1;
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=_0x5ea2ce.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+=('最多可以组建'+$.teamNum+'个战队');
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									await joinTeam();
								}if($.saveTeam){
									if(_0x5ea2ce.data.canCreate){
										await saveTeam();
									}else{
										$.signUuid=_0x5ea2ce.data.signUuid;
										messageTitle+=('队伍id: '+$.signUuid+'\n');
										message+=(('【京东账号'+$.index)+'】 创建队伍id: '+$.signUuid);
										$.log('队伍id: '+$.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: '+$.signUuid);
										await joinTeam();
									}
								}
							}
						}else{
							console.log('异常5：'+JSON.stringify(_0x5ea2ce));
						}
					}
				}
			}catch(_0x277566){
				$.logErr(_0x277566,_0xe608fd);
			}
			finally{
				_0x27a877(_0x27a877);
			}
		});
	});
}
function saveTeam(_0x23bef8=0){
	return new Promise(_0x58d781=>{
		let _0x1b8da6=encodeURIComponent($.Pin);
		if(_0x23bef8==1)_0x1b8da6=encodeURIComponent($.Pin);
		let _0x47dc57=('activityId='+activityId+'&pin='+_0x1b8da6+'&pinImg='+encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveCaptain',_0x47dc57),async(_0x1c4448,_0x59c32a,_0x3767ae)=>{
			try{
				if(_0x1c4448){
					console.log(''+JSON.stringify(_0x1c4448));
					console.log($.name+' 6 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x3767ae)){
						_0x3767ae=JSON.parse(_0x3767ae);
						if(_0x3767ae.result&&_0x3767ae.data){
							message+=(('【京东账号'+$.index)+'】 创建队伍id: '+_0x3767ae.data.signUuid)+' ';
							console.log('创建队伍成功 id: '+_0x3767ae.data.signUuid);
							$.signUuid=_0x3767ae.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid)+' ';
						}else{
							console.log('异常6：'+JSON.stringify(_0x3767ae));
							if((_0x3767ae.errorMessage.indexOf('店铺会员')>-1)&&(_0x23bef8!=3)){
								$.errorJoinShop='';
								await joinShop();
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第1次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await saveTeam(3);
							}else if((_0x3767ae.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&_0x23bef8==0){
								await saveTeam(1);
							}
						}
					}
				}
			}catch(_0xf40479){
				$.logErr(_0xf40479,_0x59c32a);
			}
			finally{
				_0x58d781();
			}
		});
	});
}
function joinTeam(_0xea0419=0){
	return new Promise(_0x767ef9=>{
		let _0x4ed2e6=encodeURIComponent($.Pin);
		if(_0xea0419==1)_0x4ed2e6=encodeURIComponent($.Pin);
		let _0x176281=((('activityId='+activityId)+'&signUuid='+$.signUuid+'&pin=')+_0x4ed2e6+'&pinImg='+encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveMember',_0x176281),async(_0x13be17,_0x56abf4,_0x2749a7)=>{
			try{
				if(_0x13be17){
					console.log(''+JSON.stringify(_0x13be17));
					console.log($.name+' 7 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2749a7)){
						_0x2749a7=JSON.parse(_0x2749a7);
						if(_0x2749a7.result&&_0x2749a7.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((_0x2749a7.errorMessage.indexOf('店铺会员')>-1)&&(_0xea0419!=3)){
								$.errorJoinShop='';
								await joinShop();
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第1次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await joinTeam(3);
							}else if(_0x2749a7.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if((_0x2749a7.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&(_0xea0419==0)){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(_0x2749a7));
								message+=(('【京东账号'+$.index)+'】 '+_0x2749a7.errorMessage+'\n');
							}
						}
					}
				}
			}catch(_0x1776d4){
				$.logErr(_0x1776d4,_0x56abf4);
			}
			finally{
				_0x767ef9();
			}
		});
	});
}
function taskPostUrl(_0x282f0b,_0x4f488f){
	return{'url':(''+activityUrl+_0x282f0b),'body':_0x4f488f,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId=')+activityId,'Cookie':cookie+activityCookie,'User-Agent':$.UA}};
}
function taskPostUrl(_0x1a5a2a,_0x41b22e){
	return{'url':(''+activityUrl+_0x1a5a2a),'body':_0x41b22e,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'lzkjdz-isv.isvjcloud.com','Origin':'https://lzkjdz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(((cookie+activityCookie)+';IsvToken='+$.Token)+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA}};
}
function taskUrl(_0xb97c5b,_0x12f19c){
	return{'url':('https://api.m.jd.com/client.action'+_0xb97c5b),'body':_0x12f19c,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async _0x114134=>{
		const _0x4da751={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post(_0x4da751,(_0x2a8d55,_0x2f31c1,_0x521ff5)=>{
			try{
				if(_0x2a8d55){
					console.log(''+JSON.stringify(_0x2a8d55));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x521ff5){
						_0x521ff5=JSON.parse(_0x521ff5);
						if(_0x521ff5.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x4566b4){
				$.logErr(_0x4566b4,_0x2f31c1);
			}
			finally{
				_0x114134();
			}
		});
	});
}
function safeGet(_0x309aa2){
	try{
		if(typeof JSON.parse(_0x309aa2)=='object'){
			return true;
		}
	}catch(_0x248036){
		console.log(_0x248036);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0xfa1194){
	if(typeof strv=='string'){
		try{
			return JSON.parse(_0xfa1194);
		}catch(_0x548ce0){
			console.log(_0x548ce0);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let _0x18c90b=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(_0x18c90b){
				let _0x24ec93=$request.url.split('/');
				console.log('activityId: '+_0x18c90b[1]);
				console.log('activityUrl: '+_0x24ec93[0]+'//'+_0x24ec93[2]);
				$.setdata(_0x18c90b[1],'jd_kr_zdjr_activityId');
				$.setdata((_0x24ec93[0]+'//')+_0x24ec93[2],'jd_kr_zdjr_activityId');
				$.msg($.name,'获取activityId: 成功',('activityId:'+_0x18c90b[1]+'\nactivityUrl:')+_0x24ec93[0]+'//'+_0x24ec93[2]);
			}else{
				$.msg($.name,'找不到activityId','');
			}
		}
	}
};
function generateFp(){
	let _0xab5478='0123456789';
	let _0x396925=13;
	let _0x367b73='';
	for(;_0x396925--;)_0x367b73+=_0xab5478[Math.random()*_0xab5478.length|0x0];
	return (_0x367b73+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x129320=Date.now();
	let _0xc75537=generateFp();
	let _0x2d1aba=new Date(_0x129320).Format('yyyyMMddhhmmssSSS');
	let _0x42186a=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0x17c063=_0x42186a[random(0,_0x42186a.length)];
	return encodeURIComponent(((_0x2d1aba+';')+_0xc75537+_0x17c063)+Date.now());
}
Date.prototype.Format=function(_0x12206d){
	var _0x45d38c,_0x5d1733=this,_0x31d558=_0x12206d,_0x52396c={'M+':(_0x5d1733.getMonth()+1),'d+':_0x5d1733.getDate(),'D+':_0x5d1733.getDate(),'h+':_0x5d1733.getHours(),'H+':_0x5d1733.getHours(),'m+':_0x5d1733.getMinutes(),'s+':_0x5d1733.getSeconds(),'w+':_0x5d1733.getDay(),'q+':Math.floor((_0x5d1733.getMonth()+3)/3),'S+':_0x5d1733.getMilliseconds()};
	/(y+)/i.test(_0x31d558)&&(_0x31d558=_0x31d558.replace(RegExp.$1,''.concat(_0x5d1733.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0x4d0bc1 in _0x52396c){
		if(new RegExp('('.concat(_0x4d0bc1,')')).test(_0x31d558)){
			var _0x58e8d6,_0x3e735d=('S+'===_0x4d0bc1)?'000':'00';
			_0x31d558=_0x31d558.replace(RegExp.$1,(1==RegExp.$1.length)?_0x52396c[_0x4d0bc1]:(''.concat(_0x3e735d)+_0x52396c[_0x4d0bc1]).substr(''.concat(_0x52396c[_0x4d0bc1]).length));
		}
	}
	return _0x31d558;
};
function random(_0x57e221,_0x17fb3a){
	return Math.floor(Math.random()*(_0x17fb3a-_0x57e221))+_0x57e221;
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
