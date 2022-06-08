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
var timestamp=new Date().getTime();
let cookiesArr=[],cookie='',message='',messageTitle='';
activityId=$.getdata('jd_kr_cjhy_activityId')?$.getdata('jd_kr_cjhy_activityId'):jd_cjhy_activityId;
activityUrl=$.getdata('jd_kr_cjhy_activityUrl')?$.getdata('jd_kr_cjhy_activityUrl'):jd_cjhy_activityUrl;
let activityCookie='';
if($.isNode()){
	if(process.env.jd_cjhy_activityId)activityId=process.env.jd_cjhy_activityId;
	if(process.env.jd_cjhy_activityUrl)activityUrl=process.env.jd_cjhy_activityUrl;
	if(JSON.stringify(process.env).indexOf('GITHUB')>-1)process.exit(0);
	Object.keys(jdCookieNode).forEach(_0x4ee609=>{
		cookiesArr.push(jdCookieNode[_0x4ee609]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0x5cb8c6=>_0x5cb8c6.cookie)].filter(_0x1f1afc=>!!_0x1f1afc);
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
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.memberCount=0;
	messageTitle+=('活动id:\n'+activityId+'\n');
	$.toactivity=[];
	for(let _0x135e05=0;_0x135e05<cookiesArr.length;_0x135e05++){
		if(cookiesArr[_0x135e05]){
			cookie=cookiesArr[_0x135e05];
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=_0x135e05+1;
			$.isLogin=true;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+$.nickName||$.UserName+'*********\n');
			if(!$.isLogin){
				$.msg($.name,'【提示】cookie已失效',('京东账号'+$.index)+' '+$.nickName||$.UserName+'\n请重新登录获取\nhttps://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
				if($.isNode()){
					await notify.sendNotify($.name+'cookie已失效 - '+$.UserName,('京东账号'+$.index)+' '+$.UserName+'\n请重新登录获取cookie');
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
})().catch(_0x2d7201=>{
	$.log('',' '+$.name+', 失败! 原因: '+_0x2d7201+'!','');
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
	if($.Token==''){
		console.log('获取[token]失败！');
		return;
	}
	$.AUTH_C_USER='F4eV+FtcEdTNOCLwmRgOEtA1Drq3za4lh6LFLfledF1cdSiqMbCx5edEEaL3RnCSkdK3rLBQpEQH9V4tdrrh0w==';
	await getSimpleActInfoVo();
	await getshopInfo();
	await $.wait(800);
	if($.sid&&$.userId){
		await getToken();
		if($.Token)await getPin();
		console.log('pin:'+$.Pin);
		await $.wait(800);
		await accessLog();
		await getUserInfo();
		await $.wait(800);
		await getOpenCardInfo();
		await $.wait(600);
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
function token(){
	return new Promise(_0x1cb310=>{
		let _0x1c3f45={'url':'https://cjhydz-isv.isvjcloud.com/wxCommonInfo/getSystemConfig','headers':{'Cookie':activityCookie+' '+cookie,'Referer':'https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'User-Agent':$.UA}};
		$.get(_0x1c3f45,async(_0x4940e0,_0x46b654,_0x449fb3)=>{
			try{
				if(_0x4940e0){
					console.log(''+$.toStr(_0x4940e0));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let _0x1c18f3='';
					let _0x42081a='';
					let _0x1f0c96=_0x46b654.headers['set-cookie']||_0x46b654.headers['Set-Cookie']||'';
					let _0x500842='';
					if(_0x1f0c96){
						if(typeof _0x1f0c96!='object'){
							_0x500842=_0x1f0c96.split(',');
						}else _0x500842=_0x1f0c96;
						for(let _0x580eef of _0x500842){
							let _0x396f1c=_0x580eef.split(';')[0].trim();
							if(_0x396f1c.split('=')[1]){
								if(_0x396f1c.indexOf('LZ_TOKEN_KEY=')>-1)_0x1c18f3=(_0x396f1c.replace(/ /g,'')+';');
								if(_0x396f1c.indexOf('LZ_TOKEN_VALUE=')>-1)_0x42081a=_0x396f1c.replace(/ /g,'')+';';
							}
						}
					}
					if(_0x1c18f3&&_0x42081a)activityCookie=_0x1c18f3+' '+_0x42081a;
				}
			}catch(_0x2200d6){
				$.logErr(_0x2200d6,_0x46b654);
			}
			finally{
				_0x1cb310();
			}
		});
	});
}
function getUA(){
	$.UA='jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}
function showMsg(){
	return new Promise(_0x54326b=>{
		$.msg($.name,'','【京东账号'+$.index+'】'+$.nickName+'\n'+message);
		_0x54326b();
	});
}
function getSimpleActInfoVo(){
	return new Promise(_0x2b31f4=>{
		let _0x379582='activityId='+activityId;
		$.post(taskPostUrl('/customer/getSimpleActInfoVo',_0x379582),async(_0x20b61f,_0x2e5b30,_0x855720)=>{
			try{
				if(_0x20b61f){
					console.log(''+$.toStr(_0x20b61f));
					console.log($.name+' getSimpleActInfoVo API请求失败，请检查网路重试');
				}else{
					if(_0x2e5b30.status==200){
						refreshToken(_0x2e5b30);
					}
				}
			}catch(_0x2befc1){
				$.logErr(_0x2befc1,_0x2e5b30);
			}
			finally{
				_0x2b31f4();
			}
		});
	});
}
function randomString(_0x2599ca){
	_0x2599ca=(_0x2599ca||32);
	let _0xf3c7b6='abcdef0123456789',_0x284733=_0xf3c7b6.length,_0x5a6491='';
	for(i=0;i<_0x2599ca;i++)_0x5a6491+=_0xf3c7b6.charAt(Math.floor(Math.random()*_0x284733));
	return _0x5a6491;
}
function getCk(){
	return new Promise(_0x1621dd=>{
		let _0x5554dc={'url':(activityUrl+'/wxTeam/activity?activityId='+activityId),'headers':{'Cookie':cookie,'User-Agent':$.UA}};
		$.get(_0x5554dc,async(_0x51fc36,_0x478acb,_0x885809)=>{
			try{
				if(_0x51fc36){
					console.log(''+JSON.stringify(_0x51fc36));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					if(_0x478acb.status==200){
						refreshToken(_0x478acb);
					}
				}
			}catch(_0x500b49){
				$.logErr(_0x500b49,_0x478acb);
			}
			finally{
				_0x1621dd();
			}
		});
	});
}
function getToken(){
	return new Promise(_0x599e4d=>{
		let _0x1e2996='adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator',_0x1e2996),async(_0x4f5056,_0x1f90d0,_0x1c15d7)=>{
			try{
				if(_0x4f5056){
					console.log(''+JSON.stringify(_0x4f5056));
					console.log($.name+' 2 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x1c15d7)){
						_0x1c15d7=JSON.parse(_0x1c15d7);
						if((_0x1c15d7.code==0)&&_0x1c15d7.token){
							$.Token=_0x1c15d7.token;
						}else{
							console.log('异常2：'+JSON.stringify(_0x1c15d7));
						}
					}
				}
			}catch(_0x152a23){
				$.logErr(_0x152a23,_0x1f90d0);
			}
			finally{
				_0x599e4d();
			}
		});
	});
}
function getPin(){
	return new Promise(_0x4ab253=>{
		let _0x52631b=('userId='+$.userId+'&token='+$.Token)+'&fromType=APP&riskType=1';
		$.post(taskPostUrl('/customer/getMyPing',_0x52631b),async(_0x4f4d92,_0x419016,_0x44d696)=>{
			try{
				if(_0x4f4d92){
					console.log(''+JSON.stringify(_0x4f4d92));
					console.log($.name+' 3 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x44d696)){
						_0x44d696=JSON.parse(_0x44d696);
						if(_0x44d696.result&&_0x44d696.data){
							$.Pin=_0x44d696.data.secretPin;
						}else{
							console.log('异常3：'+JSON.stringify(_0x44d696));
						}
					}
				}
			}catch(_0xd2a61){
				$.logErr(_0xd2a61,_0x419016);
			}
			finally{
				_0x4ab253();
			}
		});
	});
}
function getshopInfo(){
	return new Promise(_0x51ea93=>{
		$.post(taskPostUrl('/wxTeam/shopInfo','activityId='+activityId),async(_0xd86830,_0x169bde,_0x888adb)=>{
			try{
				if(_0xd86830){
					console.log(''+JSON.stringify(_0xd86830));
					console.log($.name+' 1 API请求失败，请检查网路重试');
				}else{
					if(_0x888adb&&safeGet(_0x888adb)){
						_0x888adb=JSON.parse(_0x888adb);
						if(_0x888adb.data){
							$.sid=_0x888adb.data.sid;
							$.userId=_0x888adb.data.userId;
							$.shopName=_0x888adb.data.shopName;
						}else{
							console.log('异常1：'+JSON.stringify(_0x888adb));
						}
					}
				}
			}catch(_0x35f251){
				$.logErr(_0x35f251,_0x169bde);
			}
			finally{
				_0x51ea93();
			}
		});
	});
}
function getOpenCardInfo(){
	return new Promise(_0x3f96bd=>{
		let _0x5a02be=('venderId='+$.userId+'&buyerPin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo',_0x5a02be),async(_0x4687bd,_0x31d3ef,_0x39c846)=>{
			try{
				if(_0x4687bd){
					console.log(''+JSON.stringify(_0x4687bd));
					console.log($.name+'API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x39c846)){
						_0x39c846=JSON.parse(_0x39c846);
						if(_0x39c846.result&&_0x39c846.data){
							if(_0x39c846.data.openCardLink){
								$.channel=_0x39c846.data.openCardLink.match(/channel=(\d+)/)[1];
								$.joinVenderId=_0x39c846.data.openCardLink.match(/venderId=(\d+)/)[1];
							}else{}
						}
					}
				}
			}catch(_0x5925ce){
				$.logErr(_0x5925ce,_0x31d3ef);
			}
			finally{
				_0x3f96bd();
			}
		});
	});
}
function joinShop(){
	return new Promise(async _0x516f8f=>{
		let _0x1c5722='{\n			  "venderId":"'+$.joinVenderId+'",\n			  "shopId":"'+$.joinVenderId+'",\n			  "bindByVerifyCodeFlag":1,\n			  "registerExtend":{},\n			  "writeChildFlag":0,\n			  "channel":'+$.channel+'\n			  }';
		$.errorJoinShop='';
		await getshopactivityId();
		let _0x201890='';
		let _0x5741fd=await geth5st();
		const _0x4add06={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+_0x1c5722+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+_0x5741fd,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x4add06,async(_0x4fd4d6,_0x3e6f57,_0x59b7ec)=>{
			try{
				let _0xa31b17=$.toObj(_0x59b7ec,_0x59b7ec);
				if(typeof _0xa31b17=='object'){
					if(_0xa31b17.success===true){
						console.log(_0xa31b17.message);
						$.errorJoinShop=_0xa31b17.message;
						if(_0xa31b17.result&&_0xa31b17.result.giftInfo){
							for(let _0x5a89f9 of _0xa31b17.result.giftInfo.giftList){
								console.log('入会获得:'+_0x5a89f9.discountString+_0x5a89f9.prizeName+_0x5a89f9.secondLineDesc);
							}
						}
					}else if((typeof _0xa31b17=='object')&&_0xa31b17.message){
						$.errorJoinShop=_0xa31b17.message;
						console.log(''+(_0xa31b17.message||''));
					}else{
						console.log(_0x59b7ec);
					}
				}else{
					console.log(_0x59b7ec);
				}
			}catch(_0x2aecf0){
				$.logErr(_0x2aecf0,_0x3e6f57);
			}
			finally{
				_0x516f8f();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(_0x3023b8=>{
		const _0x40d68c={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$.UA,'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x40d68c,async(_0x2d3e40,_0x24f292,_0x3014b9)=>{
			try{
				let _0x2c039b=$.toObj(_0x3014b9,_0x3014b9);
				if(typeof _0x2c039b=='object'){
					if(_0x2c039b.success==true){
						console.log('入会:'+(_0x2c039b.result.shopMemberCardInfo.venderCardName||''));
					}
				}else{
					console.log(_0x3014b9);
				}
			}catch(_0x50cb2f){
				$.logErr(_0x50cb2f,_0x24f292);
			}
			finally{
				_0x3023b8();
			}
		});
	});
}
function getUserInfo(){
	return new Promise(_0x5eca13=>{
		let _0x56357f=('pin='+encodeURIComponent($.Pin));
		$.post(taskPostUrl('/wxActionCommon/getUserInfo',_0x56357f),async(_0xa3491a,_0x208cf5,_0x3537b0)=>{
			try{
				if(_0xa3491a){
					console.log(''+JSON.stringify(_0xa3491a));
					console.log($.name+' 6-1 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x3537b0)){
						_0x3537b0=JSON.parse(_0x3537b0);
						if(_0x3537b0.result&&_0x3537b0.data){
							$.attrTouXiang=_0x3537b0.data.yunMidImageUrl?_0x3537b0.data.yunMidImageUrl:'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						}else{
							console.log('异常6-2：'+JSON.stringify(_0x3537b0));
						}
					}
				}
			}catch(_0xc5db2e){
				$.logErr(_0xc5db2e,_0x208cf5);
			}
			finally{
				_0x5eca13();
			}
		});
	});
}
function getTeam(){
	return new Promise(_0x11edc4=>{
		let _0x55f3b0=('activityId='+activityId+'&pin=')+encodeURIComponent(encodeURIComponent($.Pin));
		if($.signUuid)_0x55f3b0+='&signUuid='+$.signUuid;
		$.post(taskPostUrl('/wxTeam/activityContent',_0x55f3b0),async(_0x29e6a0,_0x3d3fb7,_0x5ac36f)=>{
			try{
				if(_0x29e6a0){
					console.log(''+JSON.stringify(_0x29e6a0));
					console.log($.name+' 5 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x5ac36f)){
						_0x5ac36f=JSON.parse(_0x5ac36f);
						if(_0x5ac36f.result&&_0x5ac36f.data){
							if(new Date(_0x5ac36f.data.active.endTimeStr.replace(/-/g,'/')).getTime()<new Date().getTime()){
								$.toactivity=false;
								console.log('活动结束');
								messageTitle+='活动结束\n';
								_0x11edc4();
							}else{
								if(!_0x5ac36f.data.canCreate&&_0x5ac36f.data.list==null)message+='人数已满\n';
								if(_0x5ac36f.data.share){
									$.memberCount=(parseInt(_0x5ac36f.data.share.memberCount,10)+1);
								}else{
									$.memberCount=0;
								}if($.index==1){
									$.saveTeam=true;
									$.teamNum=_0x5ac36f.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if($.teamNum){
										$.teamNum=$.teamNum[1];
										messageTitle+=('最多可以组建'+$.teamNum+'个战队');
									}
								}if($.signUuid){
									$.log('加入队伍 id: '+$.signUuid);
									$.wait(600);
									await joinTeam();
								}if($.saveTeam){
									if(_0x5ac36f.data.canCreate){
										await saveTeam();
									}else{
										$.signUuid=_0x5ac36f.data.signUuid;
										messageTitle+='队伍id: '+$.signUuid+'\n';
										message+=('【京东账号'+$.index+'】 创建队伍id: '+$.signUuid);
										$.log('队伍id: '+$.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: '+$.signUuid);
										await joinTeam();
									}
								}
							}
						}else{
							console.log('异常5：'+JSON.stringify(_0x5ac36f));
						}
					}
				}
			}catch(_0x10a269){
				$.logErr(_0x10a269,_0x3d3fb7);
			}
			finally{
				_0x11edc4(_0x11edc4);
			}
		});
	});
}
function saveTeam(_0x4450cb=0){
	return new Promise(_0x5a88f9=>{
		let _0x59cdbb=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x4450cb==1)_0x59cdbb=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x2e2a76=(('activityId='+activityId+'&pin=')+_0x59cdbb+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang)));
		$.post(taskPostUrl('/wxTeam/saveCaptain',_0x2e2a76),async(_0x4a6ee9,_0x2975b0,_0x2f1540)=>{
			try{
				if(_0x4a6ee9){
					console.log(''+JSON.stringify(_0x4a6ee9));
					console.log($.name+' 6 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x2f1540)){
						_0x2f1540=JSON.parse(_0x2f1540);
						if(_0x2f1540.result&&_0x2f1540.data){
							message+=(('【京东账号'+$.index)+'】 创建队伍id: '+_0x2f1540.data.signUuid+' ');
							console.log('创建队伍成功 id: '+_0x2f1540.data.signUuid);
							$.signUuid=_0x2f1540.data.signUuid;
							messageTitle+=('队伍id: '+$.signUuid+' ');
						}else{
							console.log('异常6：'+JSON.stringify(_0x2f1540));
							if(_0x2f1540.errorMessage.indexOf('不是店铺会员')>-1&&(_0x4450cb!=3)){
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
							}else if(_0x2f1540.errorMessage.indexOf('奖品与您擦肩而过')>-1&&(_0x4450cb==0)){
								await $.wait(800);
								await saveTeam(1);
							}
						}
					}
				}
			}catch(_0x20285b){
				$.logErr(_0x20285b,_0x2975b0);
			}
			finally{
				_0x5a88f9();
			}
		});
	});
}
function joinTeam(_0x2d3530=0){
	return new Promise(_0x3f5786=>{
		let _0xf1f2be=encodeURIComponent(encodeURIComponent($.Pin));
		if(_0x2d3530==1)_0xf1f2be=encodeURIComponent(encodeURIComponent($.Pin));
		let _0x5afa76=('activityId='+activityId+'&signUuid='+$.signUuid+'&pin=')+_0xf1f2be+'&pinImg='+encodeURIComponent(encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveMember',_0x5afa76),async(_0x4ae61d,_0x648ce4,_0x3bafde)=>{
			try{
				if(_0x4ae61d){
					console.log(''+JSON.stringify(_0x4ae61d));
					console.log($.name+' 7 API请求失败，请检查网路重试');
				}else{
					if(safeGet(_0x3bafde)){
						_0x3bafde=JSON.parse(_0x3bafde);
						if(_0x3bafde.result&&_0x3bafde.data){
							message+=('【京东账号'+$.index+'】 加入队伍\n');
							$.log('加入队伍成功');
						}else{
							if((_0x3bafde.errorMessage.indexOf('不是店铺会员')>-1)&&(_0x2d3530!=3)){
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
							}else if(_0x3bafde.errorMessage.indexOf('队伍已经满员')>-1){
								$.maxTeam=true;
							}else if(_0x3bafde.errorMessage.indexOf('奖品与您擦肩而过')>-1&&_0x2d3530==0){
								await joinTeam(1);
							}else{
								console.log('异常7：'+JSON.stringify(_0x3bafde));
								message+=('【京东账号'+$.index+'】 '+_0x3bafde.errorMessage)+'\n';
							}
						}
					}
				}
			}catch(_0x34cb2a){
				$.logErr(_0x34cb2a,_0x648ce4);
			}
			finally{
				_0x3f5786();
			}
		});
	});
}
function taskPostUrl(_0x19142c,_0x2fc794){
	return{'url':(''+activityUrl+_0x19142c),'body':_0x2fc794,'headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId='+activityId),'Cookie':(cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER=')+$.AUTH_C_USER,'User-Agent':$.UA}};
}
function taskUrl(_0x418620,_0x2f3b56){
	return{'url':('https://api.m.jd.com/client.action'+_0x418620),'body':_0x2f3b56,'headers':{'Accept':'*/*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Host':'api.m.jd.com','Cookie':cookie,'User-Agent':$.UA}};
}
function TotalBean(){
	return new Promise(async _0x4ad057=>{
		const _0x39f678={'url':'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2','headers':{'Accept':'application/json,text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Cookie':cookie,'Referer':'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2','User-Agent':$.UA}};
		$.post(_0x39f678,(_0x599d87,_0x42bbf0,_0x3b50c5)=>{
			try{
				if(_0x599d87){
					console.log(''+JSON.stringify(_0x599d87));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x3b50c5){
						_0x3b50c5=JSON.parse(_0x3b50c5);
						if(_0x3b50c5.retcode===13){
							$.isLogin=false;
							return;
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x5b2cfa){
				$.logErr(_0x5b2cfa,_0x42bbf0);
			}
			finally{
				_0x4ad057();
			}
		});
	});
}
function safeGet(_0x274934){
	try{
		if(typeof JSON.parse(_0x274934)=='object'){
			return true;
		}
	}catch(_0xbb1626){
		console.log(_0xbb1626);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}
function accessLog(){
	return new Promise(async _0x4123cd=>{
		const _0x327ac9={'url':'https://cjhydz-isv.isvjcloud.com/common/accessLog','headers':{'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Host':'cjhydz-isv.isvjcloud.com','Origin':'https://cjhydz-isv.isvjcloud.com','Content-Type':'application/x-www-form-urlencoded','Referer':(activityUrl+'/wxTeam/activity?activityId'+activityId),'Cookie':(cookie+activityCookie+';IsvToken='+$.Token+';AUTH_C_USER=')+$.AUTH_C_USER,'User-Agent':$.UA},'body':'venderId=691399&code=102&pin='+encodeURIComponent(encodeURIComponent($.Pin))+'&activityId='+activityId+'&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D'+activityId+'&subType=app'};
		$.post(_0x327ac9,(_0x5b30b8,_0x418499,_0x4ca94e)=>{
			try{
				if(_0x5b30b8){
					console.log(''+JSON.stringify(_0x5b30b8));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					if(_0x418499.status==200){
						refreshToken(_0x418499);
					}
				}
			}catch(_0x447dc5){
				$.logErr(_0x447dc5,_0x418499);
			}
			finally{
				_0x4123cd();
			}
		});
	});
}
function refreshToken(_0x87f11c){
	let _0xce9e7e=_0x87f11c.headers['set-cookie'];
	if(_0xce9e7e){
		activityCookie=_0xce9e7e.map(_0x464b6=>{
			return _0x464b6.split(';')[0];
		}).join(';');
	}
}
function jsonParse(_0x47d631){
	if(typeof strv=='string'){
		try{
			return JSON.parse(_0x47d631);
		}catch(_0x475a84){
			console.log(_0x475a84);
			$.msg($.name,'','不要在BoxJS手动复制粘贴修改cookie');
			return[];
		}
	}
}
function GetCookie(){
	if($request.url.indexOf('/wxTeam/shopInfo')>-1){
		if($request.body){
			let _0x2addca=$request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if(_0x2addca){
				let _0x450581=$request.url.split('/');
				console.log('activityId: '+_0x2addca[1]);
				console.log(('activityUrl: '+_0x450581[0]+'//')+_0x450581[2]);
				$.setdata(_0x2addca[1],'jd_kr_cjhy_activityId');
				$.setdata(_0x450581[0]+'//'+_0x450581[2],'jd_kr_cjhy_activityUrl');
				$.msg($.name,'获取activityId: 成功',('activityId:'+_0x2addca[1]+'\nactivityUrl:')+_0x450581[0]+'//'+_0x450581[2]);
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


