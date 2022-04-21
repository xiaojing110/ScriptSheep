/*
大牌联合通用开卡
新增开卡脚本，一次性脚本

通用大牌联合通用开卡：
活动地址：https://jinggengjcq-isv.isvjcloud.com/xxxx/xxx/xxx

变量填写：
//export DPLHTY="活动ID"
如：
//export DPLHTY="04c1bf1191d044c6ae059e_22040802"

如需做浏览任务请设置环境变量：
//export opencard_toShop="true"

活动ID自行查找

第一个账号助力作者 其他依次助力CK1
注意：第一个CK黑号会全部助力所填写的助力码


============Quantumultx===============
[task_local]
#大牌联合通用开卡
1 1 1 1 * jd_opencardDPLHTY.js, tag=大牌联合通用开卡, enabled=true
*/
//如需做浏览任务请设置环境变量，默认关闭
let opencard_toShop = "false"
const $ = new Env("大牌联合通用开卡-加密");
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';

//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [],
    cookie = '';
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
opencard_toShop = $.isNode() ? (process.env.opencard_toShop ? process.env.opencard_toShop : `${opencard_toShop}`) : ($.getdata('opencard_toShop') ? $.getdata('opencard_toShop') : `${opencard_toShop}`);

allMessage = ""
message = ""
$.hotFlag = false
$.outFlag = false
$.activityEnd = false
let lz_jdpin_token_cookie =''
let activityCookie =''
//此处修改助力码
let helpnum = ''
let DPLHTY = "";
DPLHTY = $.isNode() ? (process.env.DPLHTY ? process.env.DPLHTY : `${DPLHTY}`) : ($.getdata('DPLHTY') ? $.getdata('DPLHTY') : `${DPLHTY}`);
if (!DPLHTY){
    console.log(`\n请填写大牌联合通用开卡的活动ID,变量是DPLHTY\n`)
    return;
}

!(async()=>{
	console.log('\n请自行确认账号一是否黑号，黑号会全部助力当前助力');
	console.log('\n默认关闭浏览任务，请在有水的情况下开启变量\n');
	console.log('当前ID：'+DPLHTY);
	console.log('\n当前助力：'+helpnum);
	console.log('\n当前默认抽奖次数：5');
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.appkey='51B59BB805903DA4CE513D29EC448375';
	$.userId='10299171';
	$.actId=DPLHTY;
	$.MixNicks='';
	$.inviteNick=helpnum;
	for(let _0x3a1ccb=0;_0x3a1ccb<cookiesArr.length;_0x3a1ccb++){
		cookie=cookiesArr[_0x3a1ccb];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=_0x3a1ccb+1;
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
		let _0x158c88='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+_0x158c88);
		if($.isNode())await notify.sendNotify(''+$.name,''+_0x158c88);
	}
})().catch(_0x2fc726=>$.logErr(_0x2fc726)).finally(()=>$.done());
async function run(){
	try{
		$.hasEnd=true;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		$.MixNick='';
		let _0x4cf6fb=false;
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
		$.openList=[];
		await takePostRequest('绑定');
		await takePostRequest('shopList');
		if($.activityEnd)return;
		for(o of $.openList){
			$.missionType='openCard';
			if(o.open!=true&&o.openCardUrl){
				if($.activityEnd)return;
				$.openCard=false;
				$.joinVenderId=o.userId;
				await takePostRequest('mission');
				await $.wait(parseInt(Math.random()*2000+2000,10));
				if($.openCard==true){
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
					await takePostRequest('activity_load');
					await $.wait(parseInt(Math.random()*2000+1000,10));
				}
				$.joinVenderId='';
			}
		}
		$.joinVenderId='';
		if($.hasCollectShop===0){
			$.missionType='uniteCollectShop';
			await takePostRequest('mission');
			await $.wait(parseInt(Math.random()*2000+1000,10));
		}else{
			console.log('已经关注');
		}
		$.missionType='uniteAddCart';
		await takePostRequest('mission');
		await $.wait(parseInt(Math.random()*2000+1000,10));
		if(opencard_toShop+''=='true'){
			let _0x21be9f=3;
			console.log('默认浏览任务次数:'+_0x21be9f);
			for(m=1;_0x21be9f--;m++){
				console.log('第'+m+'次浏览');
				$.missionType='viewShop';
				await takePostRequest('mission');
				await $.wait(parseInt(Math.random()*2000+1000,10));
				$.missionType='viewGoods';
				await takePostRequest('mission');
				await $.wait(parseInt(Math.random()*2000+1000,10));
				if(m>=3){
					console.log('抽奖太多次，多余的次数请再执行脚本');
					break;
				}
			}
		}else{
			console.log('如需浏览店铺请设置环境变量[opencard_toShop]为"true"');
		}
		await takePostRequest('activity_load');
		$.runFalag=true;
		let _0x2384de=parseInt($.usedChance,10);
		console.log('抽奖次数为:'+_0x2384de);
		for(m=1;_0x2384de--;m++){
			console.log('第'+m+'次抽奖');
			await takePostRequest('抽奖');
			if($.runFalag==false)break;
			if(Number(_0x2384de)<=0)break;
			if(m>=5){
				console.log('抽奖太多次，多余的次数请再执行脚本');
				break;
			}
			await $.wait(parseInt(Math.random()*2000+2000,10));
		}
		await takePostRequest('myAward');
		await takePostRequest('missionInviteList');
		console.log($.MixNick);
		console.log('当前助力:'+$.inviteNick);
		if($.index==1){
			$.inviteNick=$.MixNick;
			console.log('后面的号都会助力:'+$.inviteNick);
		}
		await $.wait(parseInt(Math.random()*1000+2000,10));
	}catch(_0x57054b){
		console.log(_0x57054b);
	}
}
async function takePostRequest(_0x499985){
	if($.outFlag)return;
	let _0x22b42c='https://jinggengjcq-isv.isvjcloud.com';
	let _0x2f7ee5='';
	let _0x4ea924='POST';
	let _0x429655='';
	switch(_0x499985){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			_0x2f7ee5='body=%7B%22url%22%3A%22https%3A//jinggengjcq-isv.isvjcloud.com/fronth5/%3Flng%3D0%26lat%3D0%26sid%3D49687cd64aca2ae93aa43748a04e8f6w%26un_area%3D16_1315_1316_53522%23/pages/unitedCardNew20211010-ka/unitedCardNew20211010-ka%3FactId%3D9150e1d16b9d40_10101%22%2C%22id%22%3A%22%22%7D&uuid=b9b4ce69d42dacb64084279d51cdee764d7781fa&client=apple&clientVersion=10.1.4&st=1634100732991&sv=111&sign=67e254ffbcb13be9e12a9782c9cdf398';
			break;
		case 'activity_load':
			url=_0x22b42c+'/dm/front/openCardNew/activity_load?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'jdToken':$.Token,'source':'01','inviteNick':$.inviteNick||''};
			if($.joinVenderId)_0x429655={
			..._0x429655,'shopId':''+$.joinVenderId
		};
			_0x2f7ee5=taskPostUrl('/openCardNew/activity_load',_0x429655);
			break;
		case 'shopList':
			url=_0x22b42c+'/dm/front/openCardNew/shopList?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={};
			_0x2f7ee5=taskPostUrl('/openCardNew/shopList',_0x429655);
			break;
		case'绑定':
			url=_0x22b42c+'/dm/front/openCardNew/complete/mission?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'missionType':'relationBind','inviterNick':$.inviteNick||''};
			_0x2f7ee5=taskPostUrl('/openCardNew/complete/mission',_0x429655);
			break;
		case 'mission':
			url=_0x22b42c+'/dm/front/openCardNew/complete/mission?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'missionType':$.missionType};
			if($.joinVenderId)_0x429655={
			..._0x429655,'shopId':$.joinVenderId
		};
			_0x2f7ee5=taskPostUrl('/openCardNew/complete/mission',_0x429655);
			break;
		case'抽奖':
			url=_0x22b42c+'/dm/front/openCardNew/draw/post?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'dataType':'draw','usedGameNum':'2'};
			_0x2f7ee5=taskPostUrl('/openCardNew/draw/post',_0x429655);
			break;
		case 'followShop':
			url=_0x22b42c+'/dm/front/openCardNew/followShop?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'actId':$.actId,'missionType':'collectShop'};
			_0x2f7ee5=taskPostUrl('/openCardNew/followShop',_0x429655);
			break;
		case 'addCart':
			url=_0x22b42c+'/dm/front/openCardNew/addCart?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'actId':$.actId,'missionType':'addCart'};
			_0x2f7ee5=taskPostUrl('/openCardNew/addCart',_0x429655);
			break;
		case 'myAward':
			url=_0x22b42c+'/dm/front/openCardNew/myAwards?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'pageNo':1,'pageSize':9999};
			_0x2f7ee5=taskPostUrl('/openCardNew/myAwards',_0x429655);
			break;
		case 'missionInviteList':
			url=_0x22b42c+'/dm/front/openCardNew/missionInviteList?mix_nick='+($.MixNick||$.MixNicks||'');
			_0x429655={'inviteListRequest':{'actId':$.actId,'userId':10299171,'missionType':'shareAct','inviteType':1,'buyerNick':$.MixNick||''}};
			_0x2f7ee5=taskPostUrl('/openCardNew/missionInviteList',_0x429655);
			break;
		default:
			console.log('错误'+_0x499985);
	}
	let _0x338d68=getPostRequest(url,_0x2f7ee5,_0x4ea924);
	return new Promise(async _0x1ce225=>{
		$.post(_0x338d68,(_0x1740ae,_0x32b673,_0x3bac34)=>{
			try{
				if(_0x1740ae){
					if(_0x32b673&&_0x32b673.statusCode&&_0x32b673.statusCode==493){
						console.log('此ip已被限制，请过10分钟后再执行脚本\n');
						$.outFlag=true;
					}
					console.log(''+$.toStr(_0x1740ae,_0x1740ae));
					console.log(_0x499985+' API请求失败，请检查网路重试');
				}else{
					dealReturn(_0x499985,_0x3bac34);
				}
			}catch(_0x98f183){
				console.log(_0x98f183,_0x32b673);
			}
			finally{
				_0x1ce225();
			}
		});
	});
}
async function dealReturn(_0x355869,_0x1551ff){
	let _0x4dfc79='';
	try{
		if(_0x355869!='accessLogWithAD'||_0x355869!='drawContent'){
			if(_0x1551ff){
				_0x4dfc79=JSON.parse(_0x1551ff);
			}
		}
	}catch(_0x16d596){
		console.log(_0x355869+' 执行任务异常');
		console.log(_0x1551ff);
		$.runFalag=false;
	}try{
		let _0x48d8d9='';
		switch(_0x355869){
			case 'isvObfuscator':
				if(typeof _0x4dfc79=='object'){
					if(_0x4dfc79.errcode==0){
					if(typeof _0x4dfc79.token!='undefined')$.Token=_0x4dfc79.token;
				}else if(_0x4dfc79.message){
					console.log(_0x355869+' '+(_0x4dfc79.message||''));
				}else{
					console.log(_0x1551ff);
				}
				}else{
					console.log(_0x1551ff);
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
			case 'myAward':
			case 'missionInviteList':
			case'抽奖':
				_0x48d8d9='';
				if(_0x355869=='followShop')_0x48d8d9='关注';
				if(_0x355869=='addCart')_0x48d8d9='加购';
				if(typeof _0x4dfc79=='object'){
					if(_0x4dfc79.success&&_0x4dfc79.success===true&&_0x4dfc79.data){
					if(_0x4dfc79.data.status&&_0x4dfc79.data.status==200){
						_0x4dfc79=_0x4dfc79.data;
						if(_0x355869!='setMixNick'&&(_0x4dfc79.msg||_0x4dfc79.data.isOpenCard||_0x4dfc79.data.remark))console.log(''+(_0x48d8d9&&_0x48d8d9+':'||'')+(_0x4dfc79.msg||_0x4dfc79.data.isOpenCard||_0x4dfc79.data.remark||''));
						if(_0x355869=='activity_load'){
							if(_0x4dfc79.msg||_0x4dfc79.data.isOpenCard){
								if((_0x4dfc79.msg||_0x4dfc79.data.isOpenCard||'').indexOf('绑定成功')>-1)$.toBind=1;
							}
							if(_0x4dfc79.data){
								$.endTime=_0x4dfc79.data.cusActivity.endTime||0;
								$.MixNick=_0x4dfc79.data.buyerNick||'';
								$.usedChance=_0x4dfc79.data.missionCustomer.usedChance||0;
								$.hasCollectShop=_0x4dfc79.data.missionCustomer.hasCollectShop||0;
							}
						}else if(_0x355869=='shopList'){
							$.openList=_0x4dfc79.data.cusShops||[];
						}else if(_0x355869=='mission'){
							if(_0x4dfc79.data.remark.indexOf('不是会员')>-1){
								$.openCard=true;
							}else{
								$.openCard=false;
							}
						}else if(_0x355869=='uniteOpenCardOne'){
							$.uniteOpenCar=_0x4dfc79.msg||_0x4dfc79.data.msg||'';
						}else if(_0x355869=='myAward'){
							console.log('我的奖品：');
							let _0x13893a=0;
							let _0x2cca37=0;
							for(let _0x46befb in _0x4dfc79.data.list||[]){
								let _0x518d1d=_0x4dfc79.data.list[_0x46befb];
								_0x2cca37+=Number(_0x518d1d.awardDes);
							}
							if(_0x2cca37>0)console.log('共获得'+_0x2cca37+'京豆\n无法判断奖励是否为邀请奖励，所以直接显示获得多少豆\n');
						}else if(_0x355869=='missionInviteList'){
							console.log('邀请人数('+_0x4dfc79.data.invitedLogList.total+')');
						}
					}else if(_0x4dfc79.data.msg){
						if(_0x4dfc79.errorMessage.indexOf('活动未开始')>-1){
							$.activityEnd=true;
						}
						console.log((_0x48d8d9||_0x355869)+' '+(_0x4dfc79.data.msg||''));
					}else if(_0x4dfc79.errorMessage){
						if(_0x4dfc79.errorMessage.indexOf('火爆')>-1){}
						console.log((_0x48d8d9||_0x355869)+' '+(_0x4dfc79.errorMessage||''));
					}else{
						console.log((_0x48d8d9||_0x355869)+' '+_0x1551ff);
					}
				}else if(_0x4dfc79.errorMessage){
					console.log((_0x48d8d9||_0x355869)+' '+(_0x4dfc79.errorMessage||''));
				}else{
					console.log((_0x48d8d9||_0x355869)+' '+_0x1551ff);
				}
				}else{
					console.log((_0x48d8d9||_0x355869)+' '+_0x1551ff);
				}
				break;
			default:
				console.log((_0x48d8d9||_0x355869)+'-> '+_0x1551ff);
		}if(typeof _0x4dfc79=='object'){
			if(_0x4dfc79.errorMessage){
				if(_0x4dfc79.errorMessage.indexOf('火爆')>-1){}
			}
		}
	}catch(_0xfcf4cc){
		console.log(_0xfcf4cc);
	}
}
function getPostRequest(_0x2b8e31,_0x5f4a8a,_0x44b855='POST'){
	let _0x5455d3={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$['UA'],'X-Requested-With':'XMLHttpRequest'};
	if(_0x2b8e31.indexOf('https://jinggengjcq-isv.isvjcloud.com')>-1){
		_0x5455d3.Origin='https://jinggengjcq-isv.isvjcloud.com';
		_0x5455d3['Content-Type']='application/json; charset=utf-8';
		delete _0x5455d3.Cookie;
	}
	return{'url':_0x2b8e31,'method':_0x44b855,'headers':_0x5455d3,'body':_0x5f4a8a,'timeout':60000};
}
function taskPostUrl(_0x1237f0,_0x3b22ad){
	const _0x528867={'jsonRpc':'2.0','params':{'commonParameter':{'appkey':$.appkey,'m':'POST','timestamp':Date.now(),'userId':$.userId},'admJson':{'actId':$.actId,'userId':$.userId,..._0x3b22ad,'method':_0x1237f0,'buyerNick':$.MixNick||''}}};
	if(_0x1237f0.indexOf('missionInviteList')>-1){
		delete _0x528867.params.admJson.actId;
	}
	return $.toStr(_0x528867,_0x528867);
}
async function getUA(){
	$['UA']='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x5b2b7a){
	_0x5b2b7a=_0x5b2b7a||32;
	let _0x4beeb5='abcdef0123456789',_0xdd4e83=_0x4beeb5.length,_0x1af28c='';
	for(i=0;i<_0x5b2b7a;i++)_0x1af28c+=_0x4beeb5.charAt(Math.floor(Math.random()*_0xdd4e83));
	return _0x1af28c;
}
function jsonParse(_0x2fa999){
	if(typeof _0x2fa999=='string'){
		try{
			return JSON.parse(_0x2fa999);
		}catch(_0x33ad65){
			console.log(_0x33ad65);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async _0x137ea5=>{
		$.errorJoinShop='';
		$.shopactivityId='';
		await $.wait(1000);
		await getshopactivityId();
		let _0x57299c='';
		if($.shopactivityId)_0x57299c=',"activityId":'+$.shopactivityId;
		let _0x539bce='20220412164634306%3Bf5299392a200d6d9ffced997e5790dcc%3B169f1%3Btk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E%2FgujGAB50kyO7hwByWK%3B77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7%3B3.0%3B1649753194306';
		const _0x49fc5f={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body={"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+_0x57299c+',"channel":401}&client=H5&clientVersion=9.2.0&uuid=88888&h5st='+_0x539bce,'headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$['UA'],'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x49fc5f,async(_0x43d8f0,_0x43c207,_0x3afd2d)=>{
			try{
				let _0x515dfe=$.toObj(_0x3afd2d,_0x3afd2d);
				if(typeof _0x515dfe=='object'){
					if(_0x515dfe.success===true){
						console.log(_0x515dfe.message);
						$.errorJoinShop=_0x515dfe.message;
						if(_0x515dfe.result&&_0x515dfe.result.giftInfo){
							for(let _0x4f604e of _0x515dfe.result.giftInfo.giftList){
								console.log('入会获得:'+_0x4f604e.discountString+_0x4f604e.prizeName+_0x4f604e.secondLineDesc);
							}
						}
					}else if(typeof _0x515dfe=='object'&&_0x515dfe.message){
						$.errorJoinShop=_0x515dfe.message;
						console.log(''+(_0x515dfe.message||''));
					}else{
						console.log(_0x3afd2d);
					}
				}else{
					console.log(_0x3afd2d);
				}
			}catch(_0x16591d){
				$.logErr(_0x16591d,_0x43c207);
			}
			finally{
				_0x137ea5();
			}
		});
	});
}
function getshopactivityId(){
	return new Promise(_0x57dcdf=>{
		const _0x243e3e={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22'+$.joinVenderId+'%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888','headers':{'Content-Type':'text/plain; Charset=UTF-8','Origin':'https://api.m.jd.com','Host':'api.m.jd.com','accept':'*/*','User-Agent':$['UA'],'content-type':'application/x-www-form-urlencoded','Cookie':cookie}};
		$.get(_0x243e3e,async(_0xbfdd4c,_0x4deed7,_0x38dbe7)=>{
			try{
				let _0x3b924b=$.toObj(_0x38dbe7,_0x38dbe7);
				if(typeof _0x3b924b=='object'){
					if(_0x3b924b.success==true){
						console.log('入会:'+(_0x3b924b.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=_0x3b924b.result.interestsRuleList&&_0x3b924b.result.interestsRuleList[0]&&_0x3b924b.result.interestsRuleList[0].interestsInfo&&_0x3b924b.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(_0x38dbe7);
				}
			}catch(_0x19e7db){
				$.logErr(_0x19e7db,_0x4deed7);
			}
			finally{
				_0x57dcdf();
			}
		});
	});
};
// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
