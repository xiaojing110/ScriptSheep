/*
超级无线店铺签到
不能并发,超级无线黑号不能跑,建议别跑太多号
环境变量:
SEVENDAY_LIST 连接类型 https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=
SEVENDAY_LIST2 连接类型 https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=
SEVENDAY_LIST3 连接类型 https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=
多活动id & 分开

10 0,12 * * * jd_wuxian_sign.js
改一下cron 防止炸🐔
*/
const $ = new Env('超级无线店铺签到');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [], cookie = '', message = '';
// https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=
let activityIdList = [
    '7cb2275e8eab4681bd063799f3f47633'
]
// https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId=
let activityIdList2 = [
    "f898849bd25c46f78137cdd7ca118baa",
    "6614a0b3ca8c4e2090aa15e151123087",
    "a23a6e7078d74cd9ac8c2609af922936",

];
// https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=
let activityIdList3 = [
    "53fbc9c79d1c43bda33e203c6eedcb76",
    "76b32564e4be45348963467252659872",
    "70d4c6c97c404a3090ece3fde9e33ba4"
];
let lz_cookie = {}

if (process.env.SEVENDAY_LIST && process.env.SEVENDAY_LIST != "") {
    activityIdList = process.env.SEVENDAY_LIST.split('&');
}
if (process.env.SEVENDAY_LIST2 && process.env.SEVENDAY_LIST2 != "") {
    activityIdList2 = process.env.SEVENDAY_LIST.split('&');
}
if (process.env.SEVENDAY_LIST3 && process.env.SEVENDAY_LIST3 != "") {
    activityIdList3 = process.env.SEVENDAY_LIST.split('&');
}

if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x16a39a=>{
		cookiesArr.push(jdCookieNode[_0x16a39a]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	let cookiesData=$.getdata('CookiesJD')||'[]';
	cookiesData=JSON.parse(cookiesData);
	cookiesArr=cookiesData.map(_0x386628=>_0x386628.cookie);
	cookiesArr.reverse();
	cookiesArr.push(...[$.getdata('CookieJD2'),$.getdata('CookieJD')]);
	cookiesArr.reverse();
	cookiesArr=cookiesArr.filter(_0x677ae=>!!_0x677ae);
}
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/bean/signIndex.action',{'open-url':'https://bean.m.jd.com/bean/signIndex.action'});
		return;
	}
	$.getTokenErr=true;
	for(let _0x4c9f44=0;_0x4c9f44<cookiesArr.length;_0x4c9f44++){
		if(cookiesArr[_0x4c9f44]){
			cookie=cookiesArr[_0x4c9f44];
			originCookie=cookiesArr[_0x4c9f44];
			newCookie='';
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=(.+?);/)&&cookie.match(/pt_pin=(.+?);/)[1]);
			$.index=(_0x4c9f44+1);
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
			$.bean=0;
			$.ADID=getUUID('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',1);
			$.UUID=getUUID('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
			console.log('签到类型1');
			for(let _0x5cf71f in activityIdList){
				$.activityUrl='https://lzkj-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId='+$.activityId+'&venderId='+$.venderId+'&adsource=&sid=&un_area=';
				$.activityId=activityIdList[_0x5cf71f];
				await signActivity();
				await $.wait(2000);
			}
			console.log('签到类型2');
			for(let _0x1a717d in activityIdList2){
				$.activityUrl='https://lzkj-isv.isvjcloud.com/sign/signActivity2?activityId='+$.activityId+'&venderId='+$.venderId+'&adsource=&sid=&un_area=';
				$.activityId=activityIdList2[_0x1a717d];
				await signActivity2();
				await $.wait(2000);
			}
			console.log('签到类型3');
			for(let _0x4ac20f in activityIdList3){
				$.activityUrl='https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId='+$.activityId+'&venderId='+$.venderId+'&adsource=&sid=&un_area=';
				$.activityId=activityIdList3[_0x4ac20f];
				await signActivity3();
				await $.wait(2000);
			}
            if($.bean>0){
				message+='\n【京东账号'+$.index+'】'+($.nickName||$.UserName)+' \n       └ 获得 '+$.bean+' 京豆。';
			}
		}
	}if(message!==''){
		if($.isNode()){
			await notify.sendNotify($.name,message,'','\n');
		}else{
			$.msg($.name,'有点儿收获',message);
		}
	}
})().catch(_0x143683=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x143683+'!','');
}).finally(()=>{
	$.done();
});
async function signActivity(){
	$.token=null;
	$.secretPin=null;
	$.venderId=null;
	await getFirstLZCK();
	await getToken();
	await task('customer/getSimpleActInfoVo','activityId='+$.activityId,1);
	if($.token){
		await getMyPing();
		if($.secretPin){
			await task('common/accessLogWithAD','venderId='+$.venderId+'&code='+$.activityType+'&pin='+encodeURIComponent($.secretPin)+'&activityId='+$.activityId+'&pageUrl='+$.activityUrl+'&subType=app&adSource=tg_xuanFuTuBiao',1);
			console.log('签到 -> '+$.activityId);
			await task('sign/sevenDay/wx/signUp','actId='+$.activityId+'&pin='+encodeURIComponent($.secretPin),1);
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
async function signActivity2(){
	$.token=null;
	$.secretPin=null;
	$.venderId=null;
	await getFirstLZCK();
	await getToken();
	await task('customer/getSimpleActInfoVo','activityId='+$.activityId,1);
	if($.token){
		await getMyPing();
		if($.secretPin){
			await task('common/accessLogWithAD','venderId='+$.venderId+'&code='+$.activityType+'&pin='+encodeURIComponent($.secretPin)+'&activityId='+$.activityId+'&pageUrl='+$.activityUrl+'&subType=app&adSource=tg_xuanFuTuBiao',1);
			console.log('签到 -> '+$.activityId);
			await task('sign/wx/signUp','actId='+$.activityId+'&pin='+encodeURIComponent($.secretPin),1);
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
async function signActivity3(){
	$.token=null;
	$.secretPin=null;
	$.venderId=null;
	await getFirstLZCK();
	await getToken();
	await task2('customer/getSimpleActInfoVo','activityId='+$.activityId,1);
	if($.token){
		await getMyPing2();
		if($.secretPin){
			await task2('common/accessLogWithAD','venderId='+$.venderId+'&code='+$.activityType+'&pin='+encodeURIComponent($.secretPin)+'&activityId='+$.activityId+'&pageUrl='+$.activityUrl+'&subType=app&adSource=tg_xuanFuTuBiao',1);
			console.log('签到 -> '+$.activityId);
			await task2('sign/wx/signUp','actId='+$.activityId+'&pin='+encodeURIComponent($.secretPin),1);
		}else{
			$.log('没有成功获取到用户信息');
		}
	}else{
		$.log('没有成功获取到用户鉴权信息');
	}
}
function task(_0xc46371,_0x25311a,_0x55bb8d=0){
	return new Promise(_0x3f67c4=>{
		$.post(taskUrl(_0xc46371,_0x25311a,_0x55bb8d),async(_0x56bcb3,_0x288f5b,_0x1da1d4)=>{
			try{
				if(_0x56bcb3){
					$.log(_0x56bcb3);
				}else{
					if(_0x1da1d4){
						_0x1da1d4=JSON.parse(_0x1da1d4);
						if(_0x288f5b.headers['set-cookie']){
							cookie=originCookie+';';
							for(let _0x5660ef of _0x288f5b.headers['set-cookie']){
								lz_cookie[_0x5660ef.split(';')[0].substr(0,_0x5660ef.split(';')[0].indexOf('='))]=_0x5660ef.split(';')[0].substr(_0x5660ef.split(';')[0].indexOf('=')+1);
							}for(const _0x3f243d of Object.keys(lz_cookie)){
								cookie+=(_0x3f243d+'='+lz_cookie[_0x3f243d]+';');
							}
						}if(_0x1da1d4){
							switch(_0xc46371){
								case 'customer/getSimpleActInfoVo':
									$.activityId=_0x1da1d4.data.activityId;
									$.jdActivityId=_0x1da1d4.data.jdActivityId;
									$.venderId=_0x1da1d4.data.venderId;
									$.shopId=_0x1da1d4.data.shopId;
									$.activityType=_0x1da1d4.data.activityType;
									break;
								case 'sign/sevenDay/wx/signUp':
									if(_0x1da1d4){
															if(_0x1da1d4.isOk){
										console.log('签到成功');
									}else{
										console.log(_0x1da1d4);
									}
														}
									break;
								case 'sign/wx/signUp':
                                    // console.log(lz_cookie);
									if(_0x1da1d4){
															if(_0x1da1d4.isOk){
										console.log('签到成功');
									}else{
										console.log(_0x1da1d4);
									}
														}
									break;
								default:
									$.log(JSON.stringify(_0x1da1d4));
									break;
							}
						}
					}
				}
			}catch(_0x524516){
				$.log(_0x524516);
			}
			finally{
				_0x3f67c4();
			}
		});
	});
}
function task2(_0x3b7781,_0x5d39d0,_0x10cf42=0){
	return new Promise(_0x52cd9b=>{
		$.post(taskUrl2(_0x3b7781,_0x5d39d0,_0x10cf42),async(_0x393707,_0x265951,data)=>{
			try{
                // console.log(data)
				if(_0x393707){
					$.log(_0x393707);
				}else{
					if(data){
						data=JSON.parse(data);
						if(_0x265951.headers['set-cookie']){
							cookie=originCookie+';';
							for(let _0x258bd6 of _0x265951.headers['set-cookie']){
								lz_cookie[_0x258bd6.split(';')[0].substr(0,_0x258bd6.split(';')[0].indexOf('='))]=_0x258bd6.split(';')[0].substr(_0x258bd6.split(';')[0].indexOf('=')+1);
							}for(const _0x197095 of Object.keys(lz_cookie)){
								cookie+=(_0x197095+'='+lz_cookie[_0x197095]+';');
							}
						}if(data){
							switch(_0x3b7781){
								case 'customer/getSimpleActInfoVo':
									$.activityId=data.data.activityId;
									$.jdActivityId=data.data.jdActivityId;
									$.venderId=data.data.venderId;
									$.shopId=data.data.shopId;
									$.activityType=data.data.activityType;
									break;
								case 'sign/sevenDay/wx/signUp':
									if(data){
															if(data.isOk){
										console.log('签到成功');
										if(data.signResult.giftName){
											console.log(data.signResult.giftName);
										}
									}else{
										console.log(data.msg);
									}
														}
									break;
								case 'sign/wx/signUp':
									if(data){
															if(data.isOk){
										console.log('签到成功');
										if(data.gift.giftName){
											console.log(data.gift.giftName);
										}
									}else{
										console.log(data.msg);
									}
														}
									break;
								default:
									$.log(JSON.stringify(data));
									break;
							}
						}
					}
				}
			}catch(_0x5bd333){
				$.log(_0x5bd333);
			}
			finally{
				_0x52cd9b();
			}
		});
	});
}
function taskUrl(_0x8dbe94,_0x4c1d3c,_0x28391e){
	return{
		'url':_0x28391e?'https://lzkj-isv.isvjcloud.com/'+_0x8dbe94:'https://lzkj-isv.isvjcloud.com/sign/wx/'+_0x8dbe94,'headers':{'Host':'lzkj-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkj-isv.isvjcloud.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':_0x4c1d3c
	};
}
function taskUrl2(_0x9f2ca5,_0x5a9145,_0x4a51c6){
    // console.log(_0x5a9145);
	return{
		'url':_0x4a51c6?'https://cjhy-isv.isvjcloud.com/'+_0x9f2ca5:'https://cjhy-isv.isvjcloud.com/sign/wx/'+_0x9f2ca5,'headers':{'Host':'cjhy-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://cjhy-isv.isvjcloud.comm','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':_0x5a9145
	};
}
function getMyPing(){
	let _0x4174db={'url':'https://lzkj-isv.isvjcloud.com/customer/getMyPing','headers':{'Host':'lzkj-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://lzkj-isv.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.venderId+'&token='+$.token+'&fromType=APP'};
	return new Promise(_0x1f0534=>{
		$.post(_0x4174db,(_0x3f49be,_0x102432,_0x124e1e)=>{
			try{
				if(_0x3f49be){
					$.log(_0x3f49be);
				}else{
					if(_0x102432.headers['set-cookie']){
						cookie=originCookie+';';
						for(let _0x4f6f80 of _0x102432.headers['set-cookie']){
							lz_cookie[_0x4f6f80.split(';')[0].substr(0,_0x4f6f80.split(';')[0].indexOf('='))]=_0x4f6f80.split(';')[0].substr(_0x4f6f80.split(';')[0].indexOf('=')+1);
						}for(const _0x579564 of Object.keys(lz_cookie)){
							cookie+=(_0x579564+'='+lz_cookie[_0x579564]+';');
						}
					}
					if(_0x124e1e){
						_0x124e1e=JSON.parse(_0x124e1e);
						if(_0x124e1e.result){
							$.log('你好：'+_0x124e1e.data.nickname);
							$.pin=_0x124e1e.data.nickname;
							$.secretPin=_0x124e1e.data.secretPin;
						}else{
							$.log(_0x124e1e.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x26861b){
				$.log(_0x26861b);
			}
			finally{
				_0x1f0534();
			}
		});
	});
}
function getMyPing2(){
	let _0x41074c={'url':'https://cjhy-isv.isvjcloud.com/customer/getMyPing','headers':{'Host':'cjhy-isv.isvjcloud.com','Accept':'application/json','X-Requested-With':'XMLHttpRequest','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Content-Type':'application/x-www-form-urlencoded','Origin':'https://cjhy-isv.isvjcloud.com','User-Agent':'jdapp;iPhone;9.5.4;13.6;'+$.UUID+';network/wifi;ADID/'+$.ADID+';model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Connection':'keep-alive','Referer':$.activityUrl,'Cookie':cookie},'body':'userId='+$.venderId+'&token='+$.token+'&fromType=APP&riskType=1'};
	return new Promise(_0x513e8c=>{
		$.post(_0x41074c,(_0x105185,_0x51adc6,_0x3d9c73)=>{
			try{
				if(_0x105185){
					$.log(_0x105185);
				}else{
					if(_0x51adc6.headers['set-cookie']){
						cookie=originCookie+';';
						for(let _0xef0dc9 of _0x51adc6.headers['set-cookie']){
							lz_cookie[_0xef0dc9.split(';')[0].substr(0,_0xef0dc9.split(';')[0].indexOf('='))]=_0xef0dc9.split(';')[0].substr(_0xef0dc9.split(';')[0].indexOf('=')+1);
						}for(const _0x1e6376 of Object.keys(lz_cookie)){
							cookie+=(_0x1e6376+'='+lz_cookie[_0x1e6376]+';');
						}
					}
					if(_0x3d9c73){
						_0x3d9c73=JSON.parse(_0x3d9c73);
						if(_0x3d9c73.result){
							$.log('你好：'+_0x3d9c73.data.nickname);
							$.pin=_0x3d9c73.data.nickname;
							$.secretPin=_0x3d9c73.data.secretPin;
						}else{
							$.log(_0x3d9c73.errorMessage);
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x14ecd4){
				$.log(_0x14ecd4);
			}
			finally{
				_0x513e8c();
			}
		});
	});
}
function getFirstLZCK(){
	return new Promise(_0xa753b3=>{
		$.get({'url':$.activityUrl,'headers':{
				'user-agent':$.isNode()?process.env.JD_USER_AGENT?process.env.JD_USER_AGENT:require('./USER_AGENTS').USER_AGENT:$.getdata('JDUA')?$.getdata('JDUA'):'jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1'
			}},(_0x4a45d9,_0x335e15,_0x43a39e)=>{
			try{
				if(_0x4a45d9){
					console.log(_0x4a45d9);
				}else{
					if(_0x335e15.headers['set-cookie']){
						cookie=originCookie+';';
						for(let _0x180a96 of _0x335e15.headers['set-cookie']){
							lz_cookie[_0x180a96.split(';')[0].substr(0,_0x180a96.split(';')[0].indexOf('='))]=_0x180a96.split(';')[0].substr(_0x180a96.split(';')[0].indexOf('=')+1);
						}for(const _0x673be6 of Object.keys(lz_cookie)){
							cookie+=(_0x673be6+'='+lz_cookie[_0x673be6]+';');
						}
					}
				}
			}catch(_0x324110){
				console.log(_0x324110);
			}
			finally{
				_0xa753b3();
			}
		});
	});
}
function getToken(){
	let _0x1d3038={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':'body=%7B%22url%22%3A%20%22https%3A//lzdz1-isv.isvjcloud.com%22%2C%20%22id%22%3A%20%22%22%7D&uuid=72124265217d48b7955781024d65bbc4&client=apple&clientVersion=9.4.0&st=1621796702000&sv=120&sign=14f7faa31356c74e9f4289972db4b988'};
	return new Promise(_0x1f0b4b=>{
		$.post(_0x1d3038,(_0x1f215b,_0x3e79fe,_0x57aeb4)=>{
			try{
				if(_0x1f215b){
					$.log(_0x1f215b);
				}else{
					if(_0x57aeb4){
						_0x57aeb4=JSON.parse(_0x57aeb4);
						if(_0x57aeb4.code==='0'){
							$.token=_0x57aeb4.token;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x302b82){
				$.log(_0x302b82);
			}
			finally{
				_0x1f0b4b();
			}
		});
	});
}
function random(_0x2626a1,_0x3cb4cf){
	return Math.floor(Math.random()*_0x3cb4cf-_0x2626a1)+_0x2626a1;
}
function getUUID(_0x1cbc2b='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',_0x30138a=0){
	return _0x1cbc2b.replace(/[xy]/g,function(_0x1faa42){
		var _0x4a9c98=(Math.random()*0x10|0x0),_0x3288c6=(_0x1faa42=='x')?_0x4a9c98:(_0x4a9c98&0x3|0x8);
		if(_0x30138a){
			uuid=_0x3288c6.toString(36).toUpperCase();
		}else{
			uuid=_0x3288c6.toString(36);
		}
		return uuid;
	});
}
function checkCookie(){
	const _0x5e7cd7={'url':'https://me-api.jd.com/user_new/info/GetJDUserInfoUnion','headers':{'Host':'me-api.jd.com','Accept':'*/*','Connection':'keep-alive','Cookie':cookie,'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1','Accept-Language':'zh-cn','Referer':'https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&','Accept-Encoding':'gzip, deflate, br'}};
	return new Promise(_0x4e9171=>{
		$.get(_0x5e7cd7,(_0x2a0124,_0x90a101,_0x331f2d)=>{
			try{
				if(_0x2a0124){
					$.logErr(_0x2a0124);
				}else{
					if(_0x331f2d){
						_0x331f2d=JSON.parse(_0x331f2d);
						if(_0x331f2d.retcode==='1001'){
							$.isLogin=false;
							return;
						}if((_0x331f2d.retcode==='0')&&_0x331f2d.data.hasOwnProperty('userInfo')){
							$.nickName=_0x331f2d.data.userInfo.baseInfo.nickname;
						}
					}else{
						$.log('京东返回了空数据');
					}
				}
			}catch(_0x4c166f){
				$.logErr(_0x4c166f);
			}
			finally{
				_0x4e9171();
			}
		});
	});
}

// prettier-ignore
!function (n) { "use strict"; function t(n, t) { var r = (65535 & n) + (65535 & t); return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r } function r(n, t) { return n << t | n >>> 32 - t } function e(n, e, o, u, c, f) { return t(r(t(t(e, n), t(u, f)), c), o) } function o(n, t, r, o, u, c, f) { return e(t & r | ~t & o, n, t, u, c, f) } function u(n, t, r, o, u, c, f) { return e(t & o | r & ~o, n, t, u, c, f) } function c(n, t, r, o, u, c, f) { return e(t ^ r ^ o, n, t, u, c, f) } function f(n, t, r, o, u, c, f) { return e(r ^ (t | ~o), n, t, u, c, f) } function i(n, r) { n[r >> 5] |= 128 << r % 32, n[14 + (r + 64 >>> 9 << 4)] = r; var e, i, a, d, h, l = 1732584193, g = -271733879, v = -1732584194, m = 271733878; for (e = 0; e < n.length; e += 16)i = l, a = g, d = v, h = m, g = f(g = f(g = f(g = f(g = c(g = c(g = c(g = c(g = u(g = u(g = u(g = u(g = o(g = o(g = o(g = o(g, v = o(v, m = o(m, l = o(l, g, v, m, n[e], 7, -680876936), g, v, n[e + 1], 12, -389564586), l, g, n[e + 2], 17, 606105819), m, l, n[e + 3], 22, -1044525330), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 4], 7, -176418897), g, v, n[e + 5], 12, 1200080426), l, g, n[e + 6], 17, -1473231341), m, l, n[e + 7], 22, -45705983), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 8], 7, 1770035416), g, v, n[e + 9], 12, -1958414417), l, g, n[e + 10], 17, -42063), m, l, n[e + 11], 22, -1990404162), v = o(v, m = o(m, l = o(l, g, v, m, n[e + 12], 7, 1804603682), g, v, n[e + 13], 12, -40341101), l, g, n[e + 14], 17, -1502002290), m, l, n[e + 15], 22, 1236535329), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 1], 5, -165796510), g, v, n[e + 6], 9, -1069501632), l, g, n[e + 11], 14, 643717713), m, l, n[e], 20, -373897302), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 5], 5, -701558691), g, v, n[e + 10], 9, 38016083), l, g, n[e + 15], 14, -660478335), m, l, n[e + 4], 20, -405537848), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 9], 5, 568446438), g, v, n[e + 14], 9, -1019803690), l, g, n[e + 3], 14, -187363961), m, l, n[e + 8], 20, 1163531501), v = u(v, m = u(m, l = u(l, g, v, m, n[e + 13], 5, -1444681467), g, v, n[e + 2], 9, -51403784), l, g, n[e + 7], 14, 1735328473), m, l, n[e + 12], 20, -1926607734), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 5], 4, -378558), g, v, n[e + 8], 11, -2022574463), l, g, n[e + 11], 16, 1839030562), m, l, n[e + 14], 23, -35309556), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 1], 4, -1530992060), g, v, n[e + 4], 11, 1272893353), l, g, n[e + 7], 16, -155497632), m, l, n[e + 10], 23, -1094730640), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 13], 4, 681279174), g, v, n[e], 11, -358537222), l, g, n[e + 3], 16, -722521979), m, l, n[e + 6], 23, 76029189), v = c(v, m = c(m, l = c(l, g, v, m, n[e + 9], 4, -640364487), g, v, n[e + 12], 11, -421815835), l, g, n[e + 15], 16, 530742520), m, l, n[e + 2], 23, -995338651), v = f(v, m = f(m, l = f(l, g, v, m, n[e], 6, -198630844), g, v, n[e + 7], 10, 1126891415), l, g, n[e + 14], 15, -1416354905), m, l, n[e + 5], 21, -57434055), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 12], 6, 1700485571), g, v, n[e + 3], 10, -1894986606), l, g, n[e + 10], 15, -1051523), m, l, n[e + 1], 21, -2054922799), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 8], 6, 1873313359), g, v, n[e + 15], 10, -30611744), l, g, n[e + 6], 15, -1560198380), m, l, n[e + 13], 21, 1309151649), v = f(v, m = f(m, l = f(l, g, v, m, n[e + 4], 6, -145523070), g, v, n[e + 11], 10, -1120210379), l, g, n[e + 2], 15, 718787259), m, l, n[e + 9], 21, -343485551), l = t(l, i), g = t(g, a), v = t(v, d), m = t(m, h); return [l, g, v, m] } function a(n) { var t, r = "", e = 32 * n.length; for (t = 0; t < e; t += 8)r += String.fromCharCode(n[t >> 5] >>> t % 32 & 255); return r } function d(n) { var t, r = []; for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1)r[t] = 0; var e = 8 * n.length; for (t = 0; t < e; t += 8)r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32; return r } function h(n) { return a(i(d(n), 8 * n.length)) } function l(n, t) { var r, e, o = d(n), u = [], c = []; for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1)u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r]; return e = i(u.concat(d(t)), 512 + 8 * t.length), a(i(c.concat(e), 640)) } function g(n) { var t, r, e = ""; for (r = 0; r < n.length; r += 1)t = n.charCodeAt(r), e += "0123456789abcdef".charAt(t >>> 4 & 15) + "0123456789abcdef".charAt(15 & t); return e } function v(n) { return unescape(encodeURIComponent(n)) } function m(n) { return h(v(n)) } function p(n) { return g(m(n)) } function s(n, t) { return l(v(n), v(t)) } function C(n, t) { return g(s(n, t)) } function A(n, t, r) { return t ? r ? s(t, n) : C(t, n) : r ? m(n) : p(n) } $.md5 = A }(this);
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
