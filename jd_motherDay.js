/*
* 蚊子腿活动，一天跑2次
* 入口：11:/￥N5AleF6WnrlF￥，母亲节抽奖
* 活动结束日期 22.5.8
cron 23 5,9 6-8 5 * https://raw.githubusercontent.com/star261/jd/main/scripts/jd_motherDay.js
* * */
const $ = new Env('我和妈妈的幸福合拍');
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
let cookiesArr = [];
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let helpCodeList=[];
!(async()=>{
	console.log('活动入口：11:/￥N5AleF6WnrlF￥，母亲节抽奖');
	$.useInfo={};
	$.thisActivityUrl='https://xinruimz-dz.isvjcloud.com/mother_day/?inviter_id=&type=invite&channel=share&sid=&un_area=';
	$.host='xinruimz-dz.isvjcloud.com';
	$.helpFalg=true;
	for(let _0x534288=0;(_0x534288<cookiesArr.length)&&(Date.now()<1652025600000);_0x534288++){
		if(_0x534288===0){
			doInfo();
		}
		$.index=(_0x534288+1);
		$.cookie=cookiesArr[_0x534288];
		$.userName=decodeURIComponent($.cookie.match(/pt_pin=(.+?);/)&&$.cookie.match(/pt_pin=(.+?);/)[1]);
		console.log('\n********开始【京东账号'+$.index+'】'+$.userName+'********\n');
		$.useInfo[$.userName]={};
		await main();
	}if(Date.now()>1652025600000){
		console.log('活动已结束');
	}if($.helpFalg){
		doInfo();
	}for(let _0x3effc3=0;_0x3effc3<cookiesArr.length;_0x3effc3++){
		$.index=_0x3effc3+1;
		$.cookie=cookiesArr[_0x3effc3];
		$.userName=decodeURIComponent($.cookie.match(/pt_pin=(.+?);/)&&$.cookie.match(/pt_pin=(.+?);/)[1]);
		if(!$.useInfo[$.userName]){
			continue;
		}
		$.UA=$.useInfo[$.userName].UA;
		$.jcloud_alb_route=$.useInfo[$.userName].jcloud_alb_route;
		$.access_token=$.useInfo[$.userName].access_token;
		$.token_type=$.useInfo[$.userName].token_type;
		$.canhelp=true;
		let _0x1cd6eb=[];
		for(let _0x21447e=0;(_0x21447e<helpCodeList.length)&&$.canhelp;_0x21447e++){
			if($.useInfo[$.userName].openid===helpCodeList[_0x21447e]){
				continue;
			}
			if(_0x1cd6eb.indexOf(helpCodeList[_0x21447e])!==-1){
				continue;
			}
			console.log('\n'+$.userName+'去助力：'+helpCodeList[_0x21447e]);
			let _0x4e0547=await takePost('invite','{"inviter_openid":"'+helpCodeList[_0x21447e]+'","channel":2,"source":"share"}');
			if(_0x4e0547){
				if(_0x4e0547.message){
					console.log(_0x4e0547.message);
					if(_0x4e0547.message==='好友今日被助力次数已达上限'){
						await $.wait(3000);
						_0x1cd6eb.push(helpCodeList[_0x21447e]);
						continue;
					}else if(_0x4e0547.message==='您今日助力次数已达上限'){
						$.canhelp=false;
					}
				}else{
					console.log(JSON.stringify(_0x4e0547));
				}
			}
			await $.wait(3000);
		}
	}
})().catch(_0x158c1a=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x158c1a+'!','');
}).finally(()=>{
	$.done();
});
async function main(){
	$.token='';
	$.jcloud_alb_route='';
	$.access_token='';
	$.token_type='';
	$.UA=getUA();
	$.body='body=%7B%22id%22%3A%22%22%2C%22url%22%3A%22https%3A%2F%2Fxinruimz-dz.isvjcloud.com%22%7D&client=apple&clientVersion=10.5.0&st=1651706560521&sv=120&ep=%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22screen%22%3A%22CJOyDIeyDNC2%22%2C%22wifiBssid%22%3A%22CtcyZWTrCtcmENGmDNLvCNu0YWHtYzHrYzU5CWUzDWY%3D%22%2C%22osVersion%22%3A%22CJCkDG%3D%3D%22%2C%22area%22%3A%22CJvpCJYyD18zDzq2DV8zDzq4CK%3D%3D%22%2C%22openudid%22%3A%22YtTsDJGzCWOzZNc0EQYmCWYnCtduDQZuYJVuDWHvZNC0YwG0YtqzZG%3D%3D%22%2C%22uuid%22%3A%22YtTsDJGzCWOzZNc0EQYmCWYnCtduDQZuYJVuDWHvZNC0YwG0YtqzZG%3D%3D%22%7D%2C%22ts%22%3A1651706560521%2C%22hdid%22%3A%22%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D&ef=1&sign=34d2f377d3737718958eab6f85ad3bb3';
	$.token=await getToken();
	if(!$.token){
		console.log('初始化失败1');
		return;
	}
	await getHtml();
	if(!$.jcloud_alb_route){
		console.log('初始化失败1');
		return;
	}
	await auth();
	let _0x46c8b3=await takeGet('get_user_info','loading/');
	if(_0x46c8b3&&_0x46c8b3.id){
		console.log('获取用户信息成功，'+_0x46c8b3.nickname+',助力码:'+_0x46c8b3.openid);
	}else if(_0x46c8b3&&_0x46c8b3.message){
		console.log(_0x46c8b3.message);
		return;
	}else{
		console.log(JSON.stringify(_0x46c8b3));
		return;
	}
	$.coins=_0x46c8b3.coins;
	await doTask(_0x46c8b3);
	for(let _0x13a5c9=0;_0x13a5c9<$.coins;_0x13a5c9++){
		console.log('\n执行一次抽奖');
		let _0x522a54=await takePost('draw_prize');
		console.log(JSON.stringify(_0x522a54));
		await $.wait(3000);
	}
	let _0xa5cf6e=await takeGet('get_prize_list?type=2&page=1&page_num=10');
	if(_0xa5cf6e.length>0){
		await notify.sendNotify('我和妈妈的幸福合拍','京东账号'+$.index+$.userName+'\n抽取到了优惠券，请手动今日活动查看');
	}
	await $.wait(3000);
	_0xa5cf6e=await takeGet('get_prize_list?type=3&page=1&page_num=10');
	let _0x1f19a7='';
	for(let _0x3a2bc9=0;_0x3a2bc9<_0xa5cf6e.length;_0x3a2bc9++){
		_0x1f19a7+=(_0xa5cf6e[_0x3a2bc9].prize_name+';');
	}
	if(_0xa5cf6e.length>0){
		await notify.sendNotify('我和妈妈的幸福合拍','京东账号'+$.index+$.userName+'\n抽取到了实物，'+_0x1f19a7);
	}
	$.useInfo[$.userName]={'UA':$.UA,'jcloud_alb_route':$.jcloud_alb_route,'access_token':$.access_token,'token_type':$.token_type,'openid':_0x46c8b3.openid};
}
async function doInfo(){
	$.helpFalg=false;
	for(let _0x1b7615=0;_0x1b7615<cookiesArr.length;_0x1b7615++){
		let _0x3d0dbd=['','','',''];
		let _0x4b1067=getRandomArrayElements(_0x3d0dbd,1)[0];
		await doTask1(cookiesArr[_0x1b7615],_0x4b1067);
		await doTask2(cookiesArr[_0x1b7615],_0x4b1067);
		await doTask3(cookiesArr[_0x1b7615],_0x4b1067);
		await doTask4(cookiesArr[_0x1b7615],_0x4b1067);
	}
}
async function doTask1(_0x595c0c,_0x2bfcfb){
	let _0x2b9892=+new Date();
	let _0x3a1278={'url':'https://api.m.jd.com/?t='+_0x2b9892,'body':'functionId=InviteFriendChangeAssertsService&body='+JSON.stringify({'method':'attendInviteActivity','data':{'inviterPin':encodeURIComponent(_0x2bfcfb),'channel':1,'token':'','frontendInitStatus':''}})+'&referer=-1&eid=eidI9b2981202fsec83iRW1nTsOVzCocWda3YHPN471AY78%2FQBhYbXeWtdg%2F3TCtVTMrE1JjM8Sqt8f2TqF1Z5P%2FRPGlzA1dERP0Z5bLWdq5N5B2VbBO&aid=&client=ios&clientVersion=14.4.2&networkType=wifi&fp=-1&uuid=ab048084b47df24880613326feffdf7eee471488&osVersion=14.4.2&d_brand=iPhone&d_model=iPhone10,2&agent=-1&pageClickKey=-1&platform=3&lang=zh_CN&appid=market-task-h5&_t='+_0x2b9892,'headers':{'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-type':'application/x-www-form-urlencoded','Origin':'https://invite-reward.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://invite-reward.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':_0x595c0c}};
	$.post(_0x3a1278,(_0x27f01c,_0x5e1a72,_0x5a6287)=>{});
}
async function doTask2(_0x3ac5e8,_0x26e34a){
	let _0x16c818={'url':'https://api.m.jd.com/','body':'functionId=TaskInviteService&body='+JSON.stringify({'method':'participateInviteTask','data':{'channel':'1','encryptionInviterPin':encodeURIComponent(_0x26e34a),'type':1}})+'&appid=market-task-h5&uuid=&_t='+Date.now(),'headers':{'Host':'api.m.jd.com','Accept':'application/json, text/plain, */*','Content-Type':'application/x-www-form-urlencoded','Origin':'https://assignment.jd.com','Accept-Language':'zh-CN,zh-Hans;q=0.9','User-Agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','Referer':'https://assignment.jd.com/','Accept-Encoding':'gzip, deflate, br','Cookie':_0x3ac5e8}};
	$.post(_0x16c818,(_0x140122,_0x16b0e7,_0x20b578)=>{});
}
async function doTask3(_0x116c32,_0x3c9b16){
	let _0x445b26=Date.now();
	var _0x453858={
		'Host':'api.m.jd.com','accept':'application/json, text/plain, */*','content-type':'application/x-www-form-urlencoded','origin':'https://invite-reward.jd.com','accept-language':'zh-cn','user-agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','referer':'https://invite-reward.jd.com/','Cookie':_0x116c32
	};
	var _0x46d0d1='functionId=InviteFriendApiService&body={"method":"attendInviteActivity","data":{"inviterPin":"'+encodeURIComponent(_0x3c9b16)+'","channel":1,"token":"","frontendInitStatus":""}}&referer=-1&eid=eidIf3dd8121b7sdmiBLGdxRR46OlWyh62kFAZogTJFnYqqRkwgr63%2BdGmMlcv7EQJ5v0HBic81xHXzXLwKM6fh3i963zIa7Ym2v5ehnwo2B7uDN92Q0&aid=&client=ios&clientVersion=14.4&networkType=wifi&fp=-1&appid=market-task-h5&_t='+_0x445b26;
	var _0xec15eb={'url':'https://api.m.jd.com/?t='+Date.now(),'headers':_0x453858,'body':_0x46d0d1};
	$.post(_0xec15eb,(_0x1dda01,_0x16a056,_0x4699ed)=>{});
}
async function doTask4(_0x42495d,_0x4145a5){
	let _0x3d43f1=Date.now();
	let _0x2fcd29={
		'Host':'api.m.jd.com','accept':'application/json, text/plain, */*','content-type':'application/x-www-form-urlencoded','origin':'https://assignment.jd.com','accept-language':'zh-cn','user-agent':$.isNode()?process.env.JS_USER_AGENT?process.env.JS_USER_AGENT:require('./JS_USER_AGENTS').USER_AGENT:$.getdata('JSUA')?$.getdata('JSUA'):'\'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1','referer':'https://assignment.jd.com/?inviterId='+encodeURIComponent(_0x4145a5),'Cookie':_0x42495d
	};
	let _0x569b16='functionId=TaskInviteService&body={"method":"participateInviteTask","data":{"channel":"1","encryptionInviterPin":"'+encodeURIComponent(_0x4145a5)+'","type":1}}&appid=market-task-h5&uuid=&_t='+_0x3d43f1;
	var _0x55ac2c={'url':'https://api.m.jd.com/','headers':_0x2fcd29,'body':_0x569b16};
	$.post(_0x55ac2c,(_0x3b89ea,_0x4aa85d,_0x1e8f60)=>{});
}
async function doTask(_0x35d508){
	await takeGet('get_ad_list?source=share');
	await takeGet('get_rotation?source=share');
	await takeGet('prize_show?source=share');
	let _0xd211f0=await takeGet('get_content_list?page=1&source=share');
	await $.wait(3000);
	let _0x222e16=await takeGet('state?source=share');
	let _0x404428=await takeGet('task_info?source=share');
	await takePost('open_card');
	await $.wait(3000);
	if(_0x222e16.sign_in===0){
		console.log('任务：签到,去执行');
		let _0x4e1d2d=await takePost('sign');
		if(_0x4e1d2d&&_0x4e1d2d.add_coins){
			console.log('任务：签到,获得一次抽奖');
			$.coins++;
		}else{
			console.log(JSON.stringify(_0x4e1d2d));
		}
	}
	_0xd211f0=getRandomArrayElements(_0xd211f0,_0xd211f0.length);
	for(let _0xe2e32e=0;_0xe2e32e<_0xd211f0.length&&_0x222e16.view_story<3&&(_0xe2e32e<5);_0xe2e32e++){
		console.log('任务：浏览内容,去执行');
		let _0x4e1d2d=await takeGet('get_content_detail?id='+_0xd211f0[_0xe2e32e].id+'&source=share');
		if(_0x4e1d2d&&_0x4e1d2d.add_coins){
			console.log('任务：浏览内容,获得一次抽奖');
			$.coins++;
			break;
		}
		await $.wait(2000);
	}for(let _0x4277ca=0;_0x4277ca<_0x404428.shops.length;_0x4277ca++){
		if(_0x222e16.view_shop.indexOf(_0x404428.shops[_0x4277ca].id.toString())===-1){
			console.log('任务：浏览店铺,'+_0x404428.shops[_0x4277ca].name+',去执行');
			let _0x4e1d2d=await takePost('view_shop','{"id":'+_0x404428.shops[_0x4277ca].id+'}');
			if(_0x4e1d2d&&_0x4e1d2d.add_coins){
				console.log('任务：浏览店铺,获得一次抽奖');
				$.coins++;
				break;
			}
			await $.wait(2000);
		}
	}for(let _0x1b73f7=0;_0x1b73f7<_0x404428.products.length;_0x1b73f7++){
		if(_0x222e16.view_product.indexOf(_0x404428.products[_0x1b73f7].id.toString())===-1){
			console.log('任务：浏览加购,'+_0x404428.products[_0x1b73f7].name+',去执行');
			let _0x4e1d2d=await takePost('view_product','{"id":'+_0x404428.products[_0x1b73f7].id+'}');
			if(_0x4e1d2d&&_0x4e1d2d.add_coins){
				console.log('任务：浏览加购,获得一次抽奖');
				$.coins++;
				break;
			}
			await $.wait(2000);
		}
	}if(_0x222e16.invite.length<5){
		helpCodeList.push(_0x35d508.openid);
	}else{
		console.log('\n助力已满');
	}
}
async function takePost(_0x2d8762,_0x4b73c4=''){
	let _0x102646={'url':'https://xinruimz-dz.isvjcloud.com/mother-day-api/'+_0x2d8762,'body':_0x4b73c4,'headers':{'Host':'xinruimz-dz.isvjcloud.com','Accept':'application/x.jd-school-raffle.v1+json','App-Key':'JVy4efS8','Authorization':''+$.token_type+$.access_token,'Source':'02','Accept-Encoding':'zh-cn','Accept-Language':'gzip, deflate, br','Content-Type':'application/json;charset=utf-8','Origin':'https://xinruimz-dz.isvjcloud.com','User-Agent':$.UA,'Referer':'https://xinruimz-dz.isvjcloud.com/mother_day/','Cookie':$.jcloud_alb_route+'jd-mother-day='+$.access_token+';'}};
	return new Promise(_0x55da26=>{
		$.post(_0x102646,async(_0x1cdecd,_0x2af49d,_0x397b45)=>{
			try{
				if(_0x1cdecd&&!_0x397b45){
					console.log(''+JSON.stringify(_0x1cdecd));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x397b45=JSON.parse(_0x397b45);
				}
			}catch(_0xd0ad87){
				$.logErr(_0xd0ad87,_0x2af49d);
			}
			finally{
				_0x55da26(_0x397b45||'');
			}
		});
	});
}
async function takeGet(_0x25cd3a,_0x2d446e=''){
	let _0x5762c1={'url':'https://xinruimz-dz.isvjcloud.com/mother-day-api/'+_0x25cd3a,'headers':{'Host':'xinruimz-dz.isvjcloud.com','Connection':'keep-alive','Accept':'application/json, text/plain, */*','App-Key':'JVy4efS8','Authorization':''+$.token_type+$.access_token,'Source':'02','User-Agent':$.UA,'X-Requested-With':'com.jingdong.app.mall','Sec-Fetch-Site':'same-origin','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://xinruimz-dz.isvjcloud.com/mother_day/'+_0x2d446e,'Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','Cookie':$.jcloud_alb_route+'jd-mother-day='+$.access_token+';'}};
	return new Promise(_0x55176f=>{
		$.get(_0x5762c1,async(_0x4401f5,_0x572b7b,_0x8ed62e)=>{
			try{
				if(_0x4401f5){
					console.log(''+JSON.stringify(_0x4401f5));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x8ed62e=JSON.parse(_0x8ed62e);
				}
			}catch(_0x5e881a){
				$.logErr(_0x5e881a,_0x572b7b);
			}
			finally{
				_0x55176f(_0x8ed62e||'');
			}
		});
	});
}
async function auth(){
	let _0x58d151='token='+$.token+'&jd_source=01&source=';
	let _0xa4c092={'url':'https://xinruimz-dz.isvjcloud.com/auth/jos','body':_0x58d151,'headers':{'Host':'xinruimz-dz.isvjcloud.com','Connection':'keep-alive','Content-Length':_0x58d151.length,'Accept':'application/json, text/plain, */*','App-Key':'JVy4efS8','Authorization':'Bearer undefined','Source':'02','User-Agent':$.UA,'Content-Type':'application/x-www-form-urlencoded','Origin':'https://xinruimz-dz.isvjcloud.com','X-Requested-With':'com.jingdong.app.mall','Sec-Fetch-Site':'same-origin','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://xinruimz-dz.isvjcloud.com/mother_day/logined_jd/','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','Cookie':''+$.jcloud_alb_route}};
	return new Promise(_0x4a9011=>{
		$.post(_0xa4c092,async(_0x272555,_0x19bf60,_0x4bfd57)=>{
			try{
				if(_0x272555){
					console.log(''+JSON.stringify(_0x272555));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x4bfd57=JSON.parse(_0x4bfd57);
					if(_0x4bfd57&&_0x4bfd57.body&&_0x4bfd57.body.access_token){
						$.access_token=_0x4bfd57.body.access_token;
						$.token_type=_0x4bfd57.body.token_type;
					}
				}
			}catch(_0x2d2cff){
				$.logErr(_0x2d2cff,_0x19bf60);
			}
			finally{
				_0x4a9011('');
			}
		});
	});
}
async function getToken(){
	let _0x5d457c={'url':'https://api.m.jd.com/client.action?functionId=isvObfuscator','body':$.body,'headers':{'Host':'api.m.jd.com','accept':'*/*','user-agent':'JD4iPhone/167490 (iPhone; iOS 14.2; Scale/3.00)','accept-language':'zh-Hans-JP;q=1, en-JP;q=0.9, zh-Hant-TW;q=0.8, ja-JP;q=0.7, en-US;q=0.6','content-type':'application/x-www-form-urlencoded','Cookie':$.cookie}};
	return new Promise(_0x2049a9=>{
		$.post(_0x5d457c,async(_0x3185f4,_0x10398b,_0x4b109a)=>{
			try{
				if(_0x3185f4){
					console.log(''+JSON.stringify(_0x3185f4));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x4b109a=JSON.parse(_0x4b109a);
				}
			}catch(_0x12a115){
				$.logErr(_0x12a115,_0x10398b);
			}
			finally{
				_0x2049a9(_0x4b109a.token||'');
			}
		});
	});
}
async function getHtml(){
	let _0x3a6e56={'url':$.thisActivityUrl,'headers':{'Host':$.host,'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':'IsvToken='+$.token+';'+$.cookie,'User-Agent':$.UA,'Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Connection':'keep-alive'}};
	return new Promise(_0x50c9ed=>{
		$.get(_0x3a6e56,(_0x7b6e79,_0x3d5462,_0x1fb449)=>{
			try{
				dealCK(_0x3d5462);
			}catch(_0x4adea7){
				$.logErr(_0x4adea7,_0x3d5462);
			}
			finally{
				_0x50c9ed(_0x1fb449);
			}
		});
	});
}
function dealCK(_0x3b8fe0){
	if(_0x3b8fe0===undefined){
		return;
	}
	let _0x2e14f7=_0x3b8fe0.headers['set-cookie']||_0x3b8fe0.headers['Set-Cookie']||'';
	if(_0x2e14f7){
		let _0x122f6d=_0x2e14f7.filter(_0x46ffdd=>_0x46ffdd.indexOf('jcloud_alb_route')!==-1)[0];
		if(_0x122f6d&&(_0x122f6d.indexOf('jcloud_alb_route=')>-1)){
			$.jcloud_alb_route=_0x122f6d.split(';')&&(_0x122f6d.split(';')[0]+';')||'';
		}
	}
}
function getRandomArrayElements(_0x1a1b25,_0x2355c7){
	var _0x30f19d=_0x1a1b25.slice(0),_0x1e124a=_0x1a1b25.length,_0x38da26=(_0x1e124a-_0x2355c7),_0x47b4c0,_0x280608;
	while(_0x1e124a-->_0x38da26){
		_0x280608=Math.floor(_0x1e124a+1*Math.random());
		_0x47b4c0=_0x30f19d[_0x280608];
		_0x30f19d[_0x280608]=_0x30f19d[_0x1e124a];
		_0x30f19d[_0x1e124a]=_0x47b4c0;
	}
	return _0x30f19d.slice(_0x38da26);
}
function getUA(){
	$.UUID=randomString(40);
	const _0x60930f={'167814':'10.1.4','167841':'10.1.6'};
	$.osVersion=randomNum(12,14)+'.'+randomNum(0,6);
	let _0x584937='network/'+['4g','5g','wifi'][randomNum(0,2)];
	$.mobile='iPhone'+randomNum(9,13)+','+randomNum(1,3);
	$.build=['167814','167841','167894'][randomNum(0,1)];
	$.appVersion=_0x60930f[$.build];
	return'jdapp;iPhone;'+$.appVersion+';'+$.osVersion+';'+$.UUID+';'+_0x584937+';model/'+$.mobile+';addressid/'+randomNum(1000000000)+';appBuild/'+$.build+';jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS '+$.osVersion.replace(/\./g,'_')+' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x10ef14,_0x5439bd=0){
	var _0x478e8d='',_0x4375d1=_0x10ef14,_0x2b4f97=[...Array(35).keys()].map(_0x3b9bfd=>_0x3b9bfd.toString(36));
	if(_0x5439bd){
		_0x4375d1=Math.floor(Math.random()*(_0x5439bd-_0x10ef14+1)+_0x10ef14);
	}
	for(let _0x28de39=0;_0x28de39<_0x4375d1;){
		let _0x323f20=Math.random().toString(16).substring(2);
		if(_0x4375d1-_0x28de39>_0x323f20.length){
			_0x478e8d+=_0x323f20;
			_0x28de39+=_0x323f20.length;
		}else{
			_0x478e8d+=_0x323f20.slice(_0x28de39-_0x4375d1);
			_0x28de39+=_0x323f20.length;
		}
	}
	return _0x478e8d;
}
function randomNum(_0x269d75,_0x4a6225){
	if(arguments.length===0)return Math.random();
	if(!_0x4a6225)_0x4a6225=10**((Math.log(_0x269d75)*Math.LOG10E+1)|0x0)-1;
	return Math.floor(Math.random()*_0x4a6225-_0x269d75+1+_0x269d75);
};

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
