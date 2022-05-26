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

const notify=$.isNode()?require('./sendNotify'):'';
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_zdjr_activityId')?$.getdata('jd_kr_zdjr_activityId'):jd_zdjr_activityId;
activityUrl=$.getdata('jd_kr_zdjr_activityUrl')?$.getdata('jd_kr_zdjr_activityUrl'):jd_zdjr_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_zdjr_activityId)activityId=process.env.jd_zdjr_activityId;
	if(process.env.jd_zdjr_activityUrl)activityUrl=process.env.jd_zdjr_activityUrl;
	Object.keys(jdCookieNode).forEach(_0x55127f=>{
		cookiesArr.push(jdCookieNode[_0x55127f]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x153b17=>_0x153b17.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0xb4eac5=>!!_0xb4eac5);
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
	messageTitle+=('活动id:\n'+activityId+'\n');
	$.toactivity=true;
	for(let _0x3bef9c=0;_0x3bef9c<cookiesArr.length;_0x3bef9c++){
		if(cookiesArr[_0x3bef9c]){
			cookie=cookiesArr[_0x3bef9c];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(_0x3bef9c+1);
			$.isLogin=true;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+$.nickName||$.UserName+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效',('京东账号'+$.index+' ')+($.nickName||$.UserName)+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,'京东账号'+$.index+' '+$.UserName+'\n请重新登录获取cookie');
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
})().catch(_0x3be7fb=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0x3be7fb+'!','');
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
function randomString(_0x159d9e){
	_0x159d9e=(_0x159d9e||32);
	let _0x52b415='abcdef0123456789',_0x3263ab=_0x52b415.length,_0xf81e20='';
	for(i=0;i<_0x159d9e;i++)_0xf81e20+=_0x52b415.charAt(Math.floor(Math.random()*_0x3263ab));
	return _0xf81e20;
}
function showMsg(){
	return new Promise(_0xc858d0=>{
		let _0x3e8125=openAppUrl();
		console.log('运行完毕');
		console.log(_0x3e8125);
		$.msg($.name,''+$.shopName,''+messageTitle+message+' \n点击弹窗跳转到京东APP活动页面',{'open-url':_0x3e8125});
		_0xc858d0();
	});
}
function openAppUrl(){
	let _0x2ed89d=(activityUrl+'/wxTeam/activity?activityId='+activityId);
	let _0xe90a09=_0x2ed89d;
	if(_0x2ed89d.substr(0,5)==='https'){
		let _0x3146f7={'category':'jump','des':'getCoupon','url':_0x2ed89d.substr(8)};
		_0xe90a09='openApp.jdMobile://virtual?params='+encodeURIComponent(JSON.stringify(_0x3146f7));
	}else if(_0x2ed89d.substr(0,4)==='http'){
		let _0x49d20a={'category':'jump','des':'getCoupon','url':_0x2ed89d.substr(7)};
		_0xe90a09=('openApp.jdMobile://virtual?params='+encodeURIComponent(JSON.stringify(_0x49d20a)));
	}
	return _0xe90a09;
}
function getCk(){
	return new Promise(_0x4e00c7=>{
		let _0x392963={'url':'https://lzkjdz-isv.isvjcloud.com/wxTeam/activity?activityId='+$.activityId+'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxTeam/activity?activityId='+$.activityId+'&sid=3d5f94d1c9eb8ba773902612d12c608w&un_area=4_133_58530_0','User-Agent':$.UA},'timeout':30000};
		$.get(_0x392963,async(_0x313240,_0x1bf587,_0x3fdd22)=>{
			try{
				if(_0x313240){
					console.log(''+$.toStr(_0x313240));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					setActivityCookie(_0x1bf587);
				}
			}catch(_0x36e669){
				$.logErr(_0x36e669,_0x1bf587);
			}
			finally{
				_0x4e00c7();
			}
		});
	});
}
function setActivityCookie(_0x55859b){
	let _0x5e9685='';
	let _0x67037b='';
	let _0x21ffb3='';
	let _0x864ceb=_0x55859b&&_0x55859b.headers&&(_0x55859b.headers['set-cookie']||_0x55859b.headers['Set-Cookie']||'')||'';
	let _0x2d141b='';
	if(_0x864ceb){
		if(typeof _0x864ceb!='object'){
			_0x2d141b=_0x864ceb.split(',');
		}else _0x2d141b=_0x864ceb;
		for(let _0x54a9bb of _0x2d141b){
			let _0x1b7ca4=_0x54a9bb.split(';')[0].trim();
			if(_0x1b7ca4.split('=')[1]){
				if(_0x1b7ca4.indexOf('LZ_TOKEN_KEY=')>-1)_0x5e9685=(_0x1b7ca4.replace(/ /g,'')+';');
				if(_0x1b7ca4.indexOf('LZ_TOKEN_VALUE=')>-1)_0x67037b=(_0x1b7ca4.replace(/ /g,'')+';');
				if(_0x1b7ca4.indexOf('lz_jdpin_token=')>-1)_0x21ffb3=(''+_0x1b7ca4.replace(/ /g,'')+';');
			}
		}
	}
	if(_0x5e9685&&_0x67037b)activityCookie=_0x5e9685+' '+_0x67037b;
	if(_0x21ffb3)lz_jdpin_token_cookie=_0x21ffb3;
}
function getToken(){
	return new Promise(_0x1c9d87=>{
		let _0x40446b='adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator',_0x40446b),async(_0x3aaaf1,_0x5c709a,_0x181a8f)=>{
			try{
				if(_0x3aaaf1){
					console.log(''+JSON.stringify(_0x3aaaf1));
					console.log($.name+' 2 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x181a8f)){
						_0x181a8f=JSON.parse(_0x181a8f);
						if(_0x181a8f.code==0&&_0x181a8f.token){
							$.Token=_0x181a8f.token;
						}else{
							console.log('异常2：'+JSON.stringify(_0x181a8f));
						}
					}
				}
			}catch(_0x160fe1){
				$.logErr(_0x160fe1,_0x5c709a);
			}
			finally{
				_0x1c9d87();
			}
		});
	});
}
function getPin(){
	return new Promise(_0x3907c3=>{
		let _0x51f447=('userId='+$.userId+'&token='+$.Token)+'&fromType=APP';
		$.post(taskPostUrl('/customer/getMyPing',_0x51f447),async(_0x1a4711,_0x1f2fb8,_0x35bd32)=>{
			try{
				if(_0x1a4711){
					console.log(''+JSON.stringify(_0x1a4711));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x35bd32)){
						_0x35bd32=JSON.parse(_0x35bd32);
						if(_0x35bd32.result&&_0x35bd32.data){
							$.Pin=_0x35bd32.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(_0x35bd32));
						}
					}
				}
			}catch(_0x278eb9){
				$.logErr(_0x278eb9,_0x1f2fb8);
			}
			finally{
				_0x3907c3();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(_0x356f91=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(_0x80ef9d,_0x44f9e4,_0x2f020c)=>{
			try{
				if(_0x80ef9d){
					console.log(''+JSON.stringify(_0x80ef9d));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(_0x2f020c&&safeGet(_0x2f020c)){
						_0x2f020c=JSON.parse(_0x2f020c);
						if(_0x2f020c.data){
							$.sid=_0x2f020c.data.sid;
							$.userId=_0x2f020c.data.userId;
							$.shopName=_0x2f020c.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(_0x2f020c));
						}
					}
				}
			}catch(_0x426ed9){
				$.logErr(_0x426ed9,_0x44f9e4);
			}
			finally{
				_0x356f91();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(_0x511ba5=>{
		let _0xd71b63='venderId='+$.userId+'&activityId='+activityId+'&pin='+encodeURIComponent($.Pin);
		$.post(taskPostUrl('/wxCommonInfo/getActMemberInfo',_0xd71b63),async(_0x1b38da,_0x57b8fa,_0x50ca06)=>{
			try{
				if(_0x1b38da){
					console.log(''+JSON.stringify(_0x1b38da));
					console.log($.name+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x50ca06)){
						_0x50ca06=JSON.parse(_0x50ca06);
						let _0x1705d3=_0x50ca06.data.openCard||false;
						if(_0x50ca06.result&&_0x50ca06.data){
							if(_0x50ca06.data.openCardUrl){
								$.channel=_0x50ca06.data.openCardUrl.match(/channel=(\d+)/)[1];
								$.joinVenderId=_0x50ca06.data.openCardUrl.match(/venderId=(\d+)/)[1];
							}else{
								console.log('异常4：'+JSON.stringify(_0x50ca06));
							}
						}
					}
				}
			}catch(_0x254df5){
				$.logErr(_0x254df5,_0x57b8fa);
			}
			finally{
				_0x511ba5();
			}
		});
	});
}
async function joinShop(){
	return new Promise(async _0x1e74c4=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		await getshopactivityId();
		let _0x339810='';
		let _0x1cd4ab='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x339810+',"channel":'+$.channel+'}';
		let _0x3b42d9='20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157';
		const _0x559963={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1cd4ab+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x3b42d9,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x559963,async(_0x1e9c3e,_0x5c93e3,_0x36dbec)=>{
			try{
				_0x36dbec=_0x36dbec&&_0x36dbec.match(/jsonp_.*?\((.*?)\);/)&&_0x36dbec.match(/jsonp_.*?\((.*?)\);/)[1]||_0x36dbec;
				let _0x2390c9=$.toObj(_0x36dbec,_0x36dbec);
				if(_0x2390c9&&(typeof _0x2390c9=='object')){
					if(_0x2390c9&&_0x2390c9.success===true){
						console.log(_0x2390c9.message);
						$.errorJoinShop=_0x2390c9.message;
						if(_0x2390c9.result&&_0x2390c9.result.giftInfo){
							for(let _0xa44ebf of _0x2390c9.result.giftInfo.giftList){
								console.log('入会获得:'+_0xa44ebf.discountString+_0xa44ebf.prizeName+_0xa44ebf.secondLineDesc);
							}
						}
					}else if(_0x2390c9&&typeof _0x2390c9=='object'&&_0x2390c9.message){
						$.errorJoinShop=_0x2390c9.message;
						console.log(''+(_0x2390c9.message||''));
					}else{
						console.log(_0x36dbec);
					}
				}else{
					console.log(_0x36dbec);
				}
			}catch(_0x2f1457){
				$.logErr(_0x2f1457,_0x5c93e3);
			}
			finally{
				_0x1e74c4();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async _0x10ae5c=>{
		let _0x2f263a='{"venderId":"'+$.joinVenderId+'","channel":'+$.channel+',"payUpShop":true}';
		let _0x551121='20220412164641157%3B197ee697d50ca316f3582488c7fa9d34%3B169f1%3Btk02wd9451deb18n1P31JunSGTfZhmebuivwsEwYWUQF1ZkpdtuSmKOES5DnIMFdyOvKikdguelIiBUnJbeCgoNlcEvv%3B6e090cbde337590b51a514718fee391d46fece6b953ed1084a052f6d76ffbd92%3B3.0%3B1649753201157';
		const _0x21bb4b={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+_0x2f263a+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x551121,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(_0x21bb4b,async(_0x4cefa8,_0x28a40b,_0x1fa38c)=>{
			try{
				_0x1fa38c=_0x1fa38c&&_0x1fa38c.match(/jsonp_.*?\((.*?)\);/)&&_0x1fa38c.match(/jsonp_.*?\((.*?)\);/)[1]||_0x1fa38c;
				let _0x2f075f=$.toObj(_0x1fa38c,_0x1fa38c);
				if(_0x2f075f&&(typeof _0x2f075f=='object')){
					if(_0x2f075f&&(_0x2f075f.success==true)){
						console.log('入会:'+(_0x2f075f.result.shopMemberCardInfo.venderCardName||''));
					}
				}else{
					console.log(_0x1fa38c);
				}
			}catch(_0x1def81){
				$.logErr(_0x1def81,_0x28a40b);
			}
			finally{
				_0x10ae5c();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0x3cba13=>{
		let _0xf05c1c=('pin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',_0xf05c1c),async(_0x4f3c89,_0x45a1a9,_0x2294d3)=>{
			try{
				if(_0x4f3c89){
					console.log(''+JSON.stringify(_0x4f3c89));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2294d3)){
						_0x2294d3=JSON.parse(_0x2294d3);
						if(_0x2294d3.result&&_0x2294d3.data){
							$.attrTouXiang=_0x2294d3.data.yunMidImageUrl?_0x2294d3.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify(_0x2294d3));
						}
					}
				}
			}catch(_0x54f4a8){
				$.logErr(_0x54f4a8,_0x45a1a9);
			}
			finally{
				_0x3cba13();
			}
		});
	});
}
function getTeam(){
	return new Promise(_0x496ce6=>{
		let _0x59177c=('activityId='+activityId+'&pin=')+encodeURIComponent($.Pin);
		if($.signUuid)_0x59177c+='&signUuid='+$.signUuid;
		$.post(taskPostUrl('/wxTeam/activityContent',_0x59177c),async(_0x5f02b5,_0x1a434a,_0x12f82c)=>{
			try{
				if(_0x5f02b5){
					console.log(''+JSON.stringify(_0x5f02b5));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x12f82c)){
						_0x12f82c=JSON.parse(_0x12f82c);
						if(_0x12f82c.result&&_0x12f82c.data){
							if(new Date(_0x12f82c.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								_0x496ce6();
							}else{
								if(!_0x12f82c.data.canCreate&&(_0x12f82c.data.list==null))message+='人数已满\n';
								if(_0x12f82c.data.share){
									$.memberCount=(parseInt(_0x12f82c.data.share.memberCount,10)+1);
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=_0x12f82c.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+=('最多可以组建'+$.teamNum)+'个战队';
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									await joinTeam();
								}if($.saveTeam){
									if(_0x12f82c.data.canCreate){
										await saveTeam();
									}else{
										$.signUuid=_0x12f82c.data.signUuid;
										messageTitle+=('队伍id: '+$.signUuid)+'\n';
										message+=('【京东账号'+$.index+'】 创建队伍id: '+$.signUuid);
										$.log('队伍id: '+$.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: '+$.signUuid);
										await joinTeam();
									}
								}
							}
						}else{
							console.log('异常5：'+JSON.stringify(_0x12f82c));
						}
					}
				}
			}catch(_0x76d047){
				$.logErr(_0x76d047,_0x1a434a);
			}
			finally{
				_0x496ce6(_0x496ce6);
			}
		});
	});
}
function saveTeam(_0x1b8edb=0){
	return new Promise(_0x544d76=>{
		let _0x55fe66=encodeURIComponent($.Pin);
		if(_0x1b8edb==1)_0x55fe66=encodeURIComponent($.Pin);
		let _0x1035f0=(('activityId='+activityId+'&pin=')+_0x55fe66+'&pinImg='+encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveCaptain',_0x1035f0),async(_0x57388d,_0x5480a1,_0x401087)=>{
			try{
				if(_0x57388d){
					console.log(''+JSON.stringify(_0x57388d));
					console.log($.name+' 6 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x401087)){
						_0x401087=JSON.parse(_0x401087);
						if(_0x401087.result&&_0x401087.data){
							message+=(('【京东账号'+$.index)+'】 创建队伍id: '+_0x401087.data.signUuid+' ');
							console.log('创建队伍成功 id: '+_0x401087.data.signUuid);
							$.signUuid=_0x401087.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid+' ');
						}else{
							console.log('异常6：'+JSON.stringify(_0x401087));
							if(_0x401087.errorMessage.indexOf('店铺会员')>-1&&(_0x1b8edb!=3)){
								$.errorJoinShop='';
								await joinShop();
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第1次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await saveTeam(3);
							}else if((_0x401087.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&_0x1b8edb==0){
								await saveTeam(1);
							}
						}
					}
				}
			}catch(_0x210080){
				$.logErr(_0x210080,_0x5480a1);
			}
			finally{
				_0x544d76();
			}
		});
	});
}
function joinTeam(_0x20bfd3=0){
	return new Promise(_0x627724=>{
		let _0x1add6d=encodeURIComponent($.Pin);
		if(_0x20bfd3==1)_0x1add6d=encodeURIComponent($.Pin);
		let _0x211f23=((('activityId='+activityId+'&signUuid=')+$.signUuid+'&pin=')+_0x1add6d+'&pinImg='+encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveMember',_0x211f23),async(_0x414f69,_0xe7bec7,_0x3fd725)=>{
			try{
				if(_0x414f69){
					console.log(''+JSON.stringify(_0x414f69));
					console.log($.name+' 7 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x3fd725)){
						_0x3fd725=JSON.parse(_0x3fd725);
						if(_0x3fd725.result&&_0x3fd725.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((_0x3fd725.errorMessage.indexOf('店铺会员')>-1)&&(_0x20bfd3!=3)){
								$.errorJoinShop='';
								await joinShop();
								if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')>-1){
									console.log('第1次 重新开卡');
									await $.wait(1000);
									await joinShop();
								}
								await joinTeam(3);
							}else if(_0x3fd725.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if((_0x3fd725.errorMessage.indexOf('奖品与您擦肩而过')>-1)&&_0x20bfd3==0){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(_0x3fd725));
								message+=('【京东账号'+$.index+'】 '+_0x3fd725.errorMessage+'\n');
							}
						}
					}
				}
			}catch(_0x8df4a9){
				$.logErr(_0x8df4a9,_0xe7bec7);
			}
			finally{
				_0x627724();
			}
		});
	});
}
function taskPostUrl(_0x43da0c,_0x1bcf62){
	return{'url':(''+activityUrl)+_0x43da0c,'body':_0x1bcf62,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(cookie+activityCookie),'User-Agent':$.UA}};
}
function taskPostUrl(_0x2a41b1,_0x339589){
	return{'url':(''+activityUrl+_0x2a41b1),'body':_0x339589,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'lzkjdz-isv.isvjcloud.com','Origin':'https://lzkjdz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER='+$.AUTH_C_USER),'User-Agent':$.UA}};
}
function taskUrl(_0x14e1ae,_0x3dc617){
	return{'url':('https://api.m.jd.com/client.action'+_0x14e1ae),'body':_0x3dc617,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async _0x10148d=>{
		const _0x8b82ca={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post(_0x8b82ca,(_0x2c1e7f,_0x28c3bf,_0x24cf67)=>{
			try{
				if(_0x2c1e7f){
					console.log(''+JSON.stringify(_0x2c1e7f));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x24cf67){
						_0x24cf67=JSON.parse(_0x24cf67);
						if(_0x24cf67.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x349cc0){
				$.logErr(_0x349cc0,_0x28c3bf);
			}
			finally{
				_0x10148d();
			}
		});
	});
}
function safeGet(_0x5e2fa7){
	try{
		if(typeof JSON.parse(_0x5e2fa7)=='object'){
			return true;
		}
	}catch(_0xfaadcf){
		console.log(_0xfaadcf);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function jsonParse(_0xcb0166){
	if(typeof strv=='string'){
		try{
			return JSON.parse(_0xcb0166);
		}catch(_0x23a0e0){
			console.log(_0x23a0e0);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let _0x2d0f65=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(_0x2d0f65){
				let _0x128dec=$request.url.split('/');
				console.log('activityId: '+_0x2d0f65[1]);
				console.log('activityUrl: '+_0x128dec[0]+'//'+_0x128dec[2]);
				$.setdata(_0x2d0f65[1],'jd_kr_zdjr_activityId');
				$.setdata(_0x128dec[0]+'//'+_0x128dec[2],'jd_kr_zdjr_activityId');
				$.msg($.name,'获取activityId: 成功',('activityId:'+_0x2d0f65[1]+'\nactivityUrl:'+_0x128dec[0])+'//'+_0x128dec[2]);
			}else{
				$.msg($.name,'找不到activityId','');
			}
		}
	}
};

// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
