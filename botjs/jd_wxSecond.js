/*
读秒拼手速通用活动

第一个CK失效会退出脚本

请求太频繁会被黑ip

6.14更新：自动开通店铺会员，做任务、游戏

变量：
//export jd_wxSecond_activityId="活动ID"

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#读秒拼手速通用活动
1 1 1 1 * jd_wxSecond.js, tag=读秒拼手速通用活动, enabled=true

*/

const $ = new Env('读秒拼手速通用活动');

const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const notify=$.isNode()?require('./sendNotify'):'';
let cookiesArr=[],cookie='';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(QOOQ0Q0=>{
		cookiesArr.push(jdCookieNode[QOOQ0Q0]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...jsonParse($.getdata('CookiesJD')||'[]').map(QQQ0O00=>QQQ0O00.cookie)].filter(Q0OQOQ0=>!!Q0OQOQ0);
}
allMessage='';
message='';
$.hotFlag=false;
$.outFlag=false;
$.activityEnd=false;
let lz_jdpin_token_cookie='';
let activityCookie='';
let jd_wxSecond_activityId='';
jd_wxSecond_activityId=$.isNode()?process.env.jd_wxSecond_activityId?process.env.jd_wxSecond_activityId:''+jd_wxSecond_activityId:$.getdata('jd_wxSecond_activityId')?$.getdata('jd_wxSecond_activityId'):''+jd_wxSecond_activityId;
!(async()=>{
	if(!cookiesArr[0]){
		$.msg($.name,'【提示】请先获取cookie\n直接使用NobyDa的京东签到获取','https://bean.m.jd.com/',{'open-url':'https://bean.m.jd.com/'});
		return;
	}
	$.activityId=jd_wxSecond_activityId;
	$.shareUuid='';
	$.activityUrl='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId;
	console.log('活动入口: '+$.activityUrl);
	for(let QQQ0O0O=0;QQQ0O0O<cookiesArr.length;QQQ0O0O++){
		cookie=cookiesArr[QQQ0O0O];
		if(cookie){
			$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
			$.index=(QQQ0O0O+1);
			message='';
			$.bean=0;
			$.hotFlag=false;
			$.nickName='';
			console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'******\n');
			await getUA();
			await run();
			await $.wait(2000);
			if($.outFlag)break;
		}
	}
	cookie=cookiesArr[0];
	if(cookie&&$.assistStatus&&!$.outFlag&&!$.activityEnd){
		$.UserName=decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
		$.index=1;
		message='';
		$.bean=0;
		$.hotFlag=false;
		$.nickName='';
		console.log('\n******开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'******\n');
		await $.wait(parseInt(Math.random()*2000+4000,10));
		await getUA();
		await run();
	}if($.outFlag){
		let OQO0QQ0='此ip已被限制，请过10分钟后再执行脚本';
		$.msg($.name,'',''+OQO0QQ0);
		if($.isNode())await notify.sendNotify(''+$.name,''+OQO0QQ0);
	}if(allMessage){
		$.msg($.name,'',''+allMessage);
	}
})().catch(QQQQ0QQ=>$.logErr(QQQQ0QQ)).finally(()=>$.done());
async function run(){
	try{
		$.assistCount=0;
		$.endTime=0;
		lz_jdpin_token_cookie='';
		$.Token='';
		$.Pin='';
		let Q0OOQOQ=false;
		await takePostRequest('isvObfuscator');
		await $.wait(500);
		if($.Token==''){
			console.log('获取[token]失败！');
			return;
		}
		await getCk();
		if(activityCookie==''){
			console.log('获取cookie失败');
			return;
		}
		if($.activityEnd===true){
			console.log('活动结束');
			return;
		}
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		await takePostRequest('getSimpleActInfoVo');
		await takePostRequest('getMyPing');
		if(!$.Pin){
			console.log('获取[Pin]失败！');
			return;
		}
		await takePostRequest('accessLogWithAD');
		await takePostRequest('getActMemberInfo');
		if(!$.openCard){
			$.shopactivityId='';
			$.joinVenderId=$.venderId;
			await getshopactivityId();
			for(let OQOOQ00=0;OQOOQ00<Array(5).length;OQOOQ00++){
				if(OQOOQ00>0)console.log('第'+OQOOQ00+'次 重新开卡');
				await joinShop();
				await $.wait(500);
				if($.errorJoinShop.indexOf('活动太火爆，请稍后再试')==-1){
					break;
				}
			}
		}
		await takePostRequest('activityContent');
		await $.wait(500);
		if($.hotFlag)return;
		if(!$.actorUuid){
			console.log('获取不到[actorUuid]退出执行，请重新执行');
			return;
		}
		console.log('助力码：'+$.actorUuid);
		for(let Q0QQQO0=0;Q0QQQO0<3;Q0QQQO0++){
			if(Q0QQQO0==0){
				await takePostRequest('getTaskGame');
			}else if(Q0QQQO0==1){
				await takePostRequest('getTaskDay');
			}else{
				await takePostRequest('getTask');
			}
			await $.wait(500);
			var QQQ00QO=[2,3,4,5];
			if($.tasklist.length>0){
				for(let OQOOQ00=0;OQOOQ00<$.tasklist.length;OQOOQ00++){
					$.taskType=$.tasklist[OQOOQ00].taskType;
					$.commodity=$.tasklist[OQOOQ00].commodity;
					$.dayMaxNumber=$.tasklist[OQOOQ00].dayMaxNumber;
					$.finishNumber=$.tasklist[OQOOQ00].finishNumber;
					$.needTimes=($.commodity*$.dayMaxNumber);
					if($.dayMaxNumber==$.finishNumber)continue;
					console.log('');
					if(QQQ00QO.includes($.taskType)){
						var OQO00O0='';
						switch($.taskType){
							case 2:
								OQO00O0='加购';
								break;
							case 3:
								OQO00O0='关注';
								break;
							case 4:
								OQO00O0='预约';
								break;
							case 5:
								OQO00O0='浏览';
								break;
							default:
								break;
						}
						$.activityTaskGoods=$.tasklist[OQOOQ00].activityTaskGoods;
						for(let OO00OQO=0;OO00OQO<$.activityTaskGoods.length;OO00OQO++){
							console.log('去'+OQO00O0+'商品：'+$.activityTaskGoods[OO00OQO].skuNameShort);
							$.skuId=$.activityTaskGoods[OO00OQO].skuId;
							await takePostRequest('finishTask');
							await $.wait(500);
							if($.taskResult)$.score+=$.newScore;
							if(OO00OQO==$.needTimes-1)break;
						}
					}else{
						$.skuId='';
						switch($.taskType){
							case 1:
								console.log('去关注店铺');
								await takePostRequest('finishTask');
								await $.wait(500);
								if($.taskResult)$.score+=$.newScore;
								break;
							case 9:
								break;
							case 12:
								console.log('去逛会场：'+$.tasklist[OQOOQ00].name);
								await takePostRequest('finishTask');
								await $.wait(500);
								if($.taskResult)$.score+=$.newScore;
								break;
							case 99:
								break;
							default:
								break;
						}
					}
				}
			}
		}
		console.log('剩余次数: '+$.score+'次\n读秒时长: '+$.targetTime+'\n');
		if($.score>0){
			let OQQ0O00=parseInt($.score/1);
			for(m=1;OQQ0O00--;m++){
				console.log('开始第'+m+'次挑战');
				await takePostRequest('start');
				if($.runFalag==false)break;
				if(Number(OQQ0O00)<=0)break;
				if(m>=10){
					console.log('游戏太多次，多余的次数请再执行脚本');
					break;
				}
				await $.wait(parseInt(Math.random()*3000+1000,10));
			}
		}else{
			$.assistStatus=true;
		}
		await $.wait(1000);
		if($.outFlag){
			console.log('此ip已被限制，请过10分钟后再执行脚本\n');
			return;
		}
		if($.index==1){
			$.shareUuid=$.actorUuid;
			console.log('\n后面的号都会助力 => '+$.shareUuid);
		}
		if($.index%3==0)await $.wait(parseInt(Math.random()*3000+3000,10));
	}catch(Q0QOOQQ){
		console.log(Q0QOOQQ);
	}
}
async function takePostRequest(Q0OOQO0){
	if($.outFlag)return;
	let QO0000Q='https://lzkjdz-isv.isvjcloud.com';
	let OQQQ0OO='';
	let Q0QQOQ0='POST';
	let QO0000O='';
	switch(Q0OOQO0){
		case 'isvObfuscator':
			url='https://api.m.jd.com/client.action?functionId=isvObfuscator';
			OQQQ0OO='body=%7B%22url%22%3A%22https%3A//lzkjdz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&uuid=9a79133855e4ed42e83cda6c58b51881c4519236&client=apple&clientVersion=10.1.4&st=1647263148203&sv=102&sign=53ee02a59dece3c480e3fcb067c49954';
			break;
		case 'getMyPing':
			url=QO0000Q+'/customer/getMyPing';
			OQQQ0OO='token='+$.Token+'&fromType=APP&userId='+$.venderId+'&pin=';
			break;
		case 'getSimpleActInfoVo':
			url=QO0000Q+'/customer/getSimpleActInfoVo';
			OQQQ0OO='activityId='+$.activityId;
			break;
		case 'getActMemberInfo':
			url=QO0000Q+'/wxCommonInfo/getActMemberInfo';
			OQQQ0OO='venderId='+($.venderId||$.shopId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'accessLogWithAD':
			url=QO0000Q+'/common/accessLogWithAD';
			let OO0QQO0='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
			OQQQ0OO='venderId='+($.venderId||$.shopId||'')+'&code=71&pin='+encodeURIComponent($.Pin)+'&activityId='+$.activityId+'&pageUrl='+encodeURIComponent(OO0QQO0)+'&subType=app&adSource=';
			break;
		case 'getOpenCardStatusWithOutSelf':
			url=QO0000Q+'/crmCard/common/coupon/getOpenCardStatusWithOutSelf';
			OQQQ0OO='venderId='+($.venderId||$.shopId||'')+'&activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin);
			break;
		case 'activityContent':
			url=QO0000Q+'/wxSecond/getData';
			OQQQ0OO='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&shareUuid='+$.shareUuid+'&activityStatus=';
			break;
		case 'getTaskGame':
			url=QO0000Q+'/wxSecond/getTaskGame';
			OQQQ0OO='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'getTaskDay':
			url=QO0000Q+'/wxSecond/getTaskDay';
			OQQQ0OO='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'getTask':
			url=QO0000Q+'/wxSecond/getTask';
			OQQQ0OO='activityId='+$.activityId+'&pin='+encodeURIComponent($.Pin)+'&uuid='+$.actorUuid;
			break;
		case 'finishTask':
			url=QO0000Q+'/wxSecond/finishTask';
			OQQQ0OO='activityId='+$.activityId+'&uuid='+$.actorUuid+'&taskType='+$.taskType+'&skuId='+$.skuId;
			break;
		case 'start':
			url=QO0000Q+'/wxSecond/start';
			OQQQ0OO='activityId='+$.activityId+'&uuid='+$.actorUuid+'&seconds='+$.targetTime;
			break;
		default:
			console.log('错误'+Q0OOQO0);
	}
	let O0OQQQO=getPostRequest(url,OQQQ0OO,Q0QQOQ0);
	return new Promise(async QQQOQ0O=>{
		$.post(O0OQQQO,(O0OQQQQ,OQQ00QO,O0OQ000)=>{
			try{
				setActivityCookie(OQQ00QO);
				if(O0OQQQQ){
					if(OQQ00QO&&(typeof OQQ00QO.statusCode!='undefined')){
						if(OQQ00QO.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(O0OQQQQ,O0OQQQQ));
					console.log(Q0OOQO0+' API请求失败，请检查网路重试');
				}else{
					dealReturn(Q0OOQO0,O0OQ000);
				}
			}catch(QO0OOQO){
				console.log(QO0OOQO,OQQ00QO);
			}
			finally{
				QQQOQ0O();
			}
		});
	});
}
async function dealReturn(OO00QQ0,QO0QQOQ){
	let OQQ00O0='';
	try{
		if((OO00QQ0!='accessLogWithAD')||(OO00QQ0!='drawContent')){
			if(QO0QQOQ){
				OQQ00O0=JSON.parse(QO0QQOQ);
			}
		}
	}catch(QO0QOOQ){
		console.log(OO00QQ0+' 执行任务异常');
		console.log(QO0QQOQ);
		$.runFalag=false;
	}try{
		switch(OO00QQ0){
			case 'isvObfuscator':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.errcode==0){
					if(typeof OQQ00O0.token!='undefined')$.Token=OQQ00O0.token;
				}else if(OQQ00O0.message){
					console.log('isvObfuscator '+(OQQ00O0.message||''));
				}else{
					console.log(QO0QQOQ);
				}
				}else{
					console.log(QO0QQOQ);
				}
				break;
			case 'getMyPing':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					if(OQQ00O0.data&&(typeof OQQ00O0.data.secretPin!='undefined'))$.Pin=OQQ00O0.data.secretPin;
					if(OQQ00O0.data&&(typeof OQQ00O0.data.nickname!='undefined')){
						$.nickname=OQQ00O0.data.nickname;
						console.log('你好，'+$.nickname);
					}
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'getSimpleActInfoVo':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					if(typeof OQQ00O0.data.shopId!='undefined')$.shopId=OQQ00O0.data.shopId;
					if(typeof OQQ00O0.data.venderId!='undefined')$.venderId=OQQ00O0.data.venderId;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'getActMemberInfo':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.openCard=OQQ00O0.data.openCard||false;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'activityContent':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.actorUuid=OQQ00O0.data.uuid||'';
					$.name=OQQ00O0.data.secondActive.name||'';
					$.targetTime=OQQ00O0.data.secondActive.targetTime||'';
					$.score=OQQ00O0.data.score||0;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'getTaskGame':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.tasklist=OQQ00O0.data;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'getTaskDay':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.tasklist=OQQ00O0.data;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'getTask':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.tasklist=OQQ00O0.data;
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'finishTask':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					$.taskResult=OQQ00O0.data;
					$.newScore=$.taskResult.score;
					console.log('  >> 任务完成');
				}else if(OQQ00O0.errorMessage){
					console.log('  >> '+(OQQ00O0.errorMessage||'任务失败'));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'start':
				if(typeof OQQ00O0=='object'){
					if(OQQ00O0.result&&(OQQ00O0.result===true)){
					if(OQQ00O0.data.draw.drawOk===true){
						console.log('获得：'+OQQ00O0.data.draw.name);
					}else{
						console.log('空气💨');
					}
				}else if(OQQ00O0.errorMessage){
					console.log(OO00QQ0+' '+(OQQ00O0.errorMessage||''));
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				}else{
					console.log(OO00QQ0+' '+QO0QQOQ);
				}
				break;
			case 'accessLogWithAD':
			case 'drawContent':
				break;
			default:
				console.log(OO00QQ0+'-> '+QO0QQOQ);
		}
		if(typeof OQQ00O0=='object'){
			if(OQQ00O0.errorMessage){
				if(OQQ00O0.errorMessage.indexOf('火爆')>-1){
					$.hotFlag=true;
				}
			}
		}
	}catch(QO00OOO){
		console.log(QO00OOO);
	}
}
function getPostRequest(Q000OQO,QQ0QO00,O0QQQQO='POST'){
	let Q0QO00Q={'Accept':'application/json','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'User-Agent':$.UA,'X-Requested-With':'XMLHttpRequest'};
	if(Q000OQO.indexOf('https://lzkjdz-isv.isvjcloud.com')>-1){
		Q0QO00Q.Referer='https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid;
		Q0QO00Q.Cookie=''+((lz_jdpin_token_cookie&&lz_jdpin_token_cookie)||'')+($.Pin&&('AUTH_C_USER='+$.Pin+';')||'')+activityCookie;
	}
	return{'url':Q000OQO,'method':O0QQQQO,'headers':Q0QO00Q,'body':QQ0QO00,'timeout':30000};
}
function getCk(){
	return new Promise(Q0QOOOO=>{
		let Q0QOOOQ={'url':'https://lzkjdz-isv.isvjcloud.com/wxCommonInfo/token','headers':{'Accept':'application/json, text/plain, */*','Accept-Encoding':'gzip, deflate, br','Accept-Language':'zh-cn','Connection':'keep-alive','Content-Type':'application/x-www-form-urlencoded','Cookie':cookie,'Referer':'https://lzkjdz-isv.isvjcloud.com/wxSecond/activity?activityId='+$.activityId+'&shareUuid='+$.shareUuid,'User-Agent':$.UA},'timeout':30000};
		$.get(Q0QOOOQ,async(OQQO0O0,QOQOQQO,QQ0Q0QQ)=>{
			try{
				if(OQQO0O0){
					if(QOQOQQO&&(typeof QOQOQQO.statusCode!='undefined')){
						if(QOQOQQO.statusCode==493){
							console.log('此ip已被限制，请过10分钟后再执行脚本\n');
							$.outFlag=true;
						}
					}
					console.log(''+$.toStr(OQQO0O0));
					console.log($.name+' cookie API请求失败，请检查网路重试');
				}else{
					let OQ0QQ0Q=QQ0Q0QQ.match(/(活动已经结束)/)&&QQ0Q0QQ.match(/(活动已经结束)/)[1]||'';
					if(OQ0QQ0Q){
						$.activityEnd=true;
						console.log('活动已结束');
					}
					setActivityCookie(QOQOQQO);
				}
			}catch(OQ0QQ0O){
				$.logErr(OQ0QQ0O,QOQOQQO);
			}
			finally{
				Q0QOOOO();
			}
		});
	});
}
function setActivityCookie(QQ000Q0){
	let OQ0Q0QQ='';
	let OOQO00O='';
	let OQ0Q0QO='';
	let OOQO00Q=QQ000Q0&&QQ000Q0.headers&&(QQ000Q0.headers['set-cookie']||QQ000Q0.headers['Set-Cookie']||'')||'';
	let OOQOOO0='';
	if(OOQO00Q){
		if(typeof OOQO00Q!='object'){
			OOQOOO0=OOQO00Q.split(',');
		}else OOQOOO0=OOQO00Q;
		for(let Q0QOQQO of OOQOOO0){
			let QQ0QQ00=Q0QOQQO.split(';')[0].trim();
			if(QQ0QQ00.split('=')[1]){
				if(QQ0QQ00.indexOf('LZ_TOKEN_KEY=')>-1)OQ0Q0QQ=(QQ0QQ00.replace(/ /g,'')+';');
				if(QQ0QQ00.indexOf('LZ_TOKEN_VALUE=')>-1)OOQO00O=(QQ0QQ00.replace(/ /g,'')+';');
				if(QQ0QQ00.indexOf('lz_jdpin_token=')>-1)OQ0Q0QO=(''+QQ0QQ00.replace(/ /g,'')+';');
			}
		}
	}
	if(OQ0Q0QQ&&OOQO00O)activityCookie=OQ0Q0QQ+' '+OOQO00O;
	if(OQ0Q0QO)lz_jdpin_token_cookie=OQ0Q0QO;
}
async function getUA(){
	$.UA='jdapp;iPhone;10.1.4;13.1.2;'+randomString(40)+';network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(QQ0Q0OO){
	QQ0Q0OO=(QQ0Q0OO||32);
	let QOQ0QOO='abcdef0123456789',QOQ0QOQ=QOQ0QOO.length,OOOOQ00='';
	for(i=0;i<QQ0Q0OO;i++)OOOOQ00+=QOQ0QOO.charAt(Math.floor(Math.random()*QOQ0QOQ));
	return OOOOQ00;
}
function jsonParse(OOQ0O0O){
	if(typeof OOQ0O0O=='string'){
		try{
			return JSON.parse(OOQ0O0O);
		}catch(Q0000OQ){
			console.log(Q0000OQ);
			$.msg($.name,'','请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie');
			return[];
		}
	}
}
async function joinShop(){
	if(!$.joinVenderId)return;
	return new Promise(async OOOOQ0O=>{
		$.errorJoinShop='活动太火爆，请稍后再试';
		let O000OQQ='';
		if($.shopactivityId)O000OQQ=',"activityId":'+$.shopactivityId;
		let QOQ0000='{"venderId":"'+$.joinVenderId+'","shopId":"'+$.joinVenderId+'","bindByVerifyCodeFlag":1,"registerExtend":{},"writeChildFlag":0'+O000OQQ+',"channel":406}';
		let QOQ0QQQ=await geth5st();
		const OQ0QO0Q={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body='+QOQ0000+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+QOQ0QQQ,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(OQ0QO0Q,async(Q00Q0Q0,OQ0QO0O,OOQQQ0Q)=>{
			try{
				OOQQQ0Q=OOQQQ0Q&&OOQQQ0Q.match(/jsonp_.*?\((.*?)\);/)&&OOQQQ0Q.match(/jsonp_.*?\((.*?)\);/)[1]||OOQQQ0Q;
				let QQ0OQQQ=$.toObj(OOQQQ0Q,OOQQQ0Q);
				if(QQ0OQQQ&&(typeof QQ0OQQQ=='object')){
					if(QQ0OQQQ&&(QQ0OQQQ.success===true)){
						console.log(QQ0OQQQ.message);
						$.errorJoinShop=QQ0OQQQ.message;
						if(QQ0OQQQ.result&&QQ0OQQQ.result.giftInfo){
							for(let QQ0O000 of QQ0OQQQ.result.giftInfo.giftList){
								console.log('入会获得:'+QQ0O000.discountString+QQ0O000.prizeName+QQ0O000.secondLineDesc);
							}
						}
					}else if(QQ0OQQQ&&(typeof QQ0OQQQ=='object')&&QQ0OQQQ.message){
						$.errorJoinShop=QQ0OQQQ.message;
						console.log(''+(QQ0OQQQ.message||''));
					}else{
						console.log(OOQQQ0Q);
					}
				}else{
					console.log(OOQQQ0Q);
				}
			}catch(OQ000QO){
				$.logErr(OQ000QO,OQ0QO0O);
			}
			finally{
				OOOOQ0O();
			}
		});
	});
}
async function getshopactivityId(){
	return new Promise(async OOQ00QO=>{
		let Q00Q0QQ='{"venderId":"'+$.joinVenderId+'","channel":406,"payUpShop":true}';
		let O0QO0O0=await geth5st();
		const QQ00QO0={'url':'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body='+Q00Q0QQ+'&clientVersion=9.2.0&client=H5&uuid=88888&h5st='+O0QO0O0,'headers':{'accept':'*/*','accept-encoding':'gzip, deflate, br','accept-language':'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7','cookie':cookie,'origin':'https://shopmember.m.jd.com/','user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'}};
		$.get(QQ00QO0,async(QOQ0OOQ,O00000O,OOO00OO)=>{
			try{
				OOO00OO=OOO00OO&&OOO00OO.match(/jsonp_.*?\((.*?)\);/)&&OOO00OO.match(/jsonp_.*?\((.*?)\);/)[1]||OOO00OO;
				let QOQ0OOO=$.toObj(OOO00OO,OOO00OO);
				if(QOQ0OOO&&(typeof QOQ0OOO=='object')){
					if(QOQ0OOO&&(QOQ0OOO.success==true)){
						console.log('入会:'+(QOQ0OOO.result.shopMemberCardInfo.venderCardName||''));
						$.shopactivityId=QOQ0OOO.result.interestsRuleList&&QOQ0OOO.result.interestsRuleList[0]&&QOQ0OOO.result.interestsRuleList[0].interestsInfo&&QOQ0OOO.result.interestsRuleList[0].interestsInfo.activityId||'';
					}
				}else{
					console.log(OOO00OO);
				}
			}catch(Q000O00){
				$.logErr(Q000O00,O00000O);
			}
			finally{
				OOQ00QO();
			}
		});
	});
}
function generateFp(){
	let _0x29b403='0123456789';
	let _0xb1ece4=13;
	let _0x17b84a='';
	for(;_0xb1ece4--;)_0x17b84a+=_0x29b403[Math.random()*_0x29b403.length|0x0];
	return (_0x17b84a+Date.now()).slice(0,16);
}
function geth5st(){
	let _0x2beee2=Date.now();
	let _0x1b782c=generateFp();
	let _0x14e516=new Date(_0x2beee2).Format('yyyyMMddhhmmssSSS');
	let _0x49d9e2=[';ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;',';169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;'];
	let _0x5ee515=_0x49d9e2[random(0,_0x49d9e2.length)];
	return encodeURIComponent((_0x14e516+';')+_0x1b782c+_0x5ee515+Date.now());
}
Date.prototype.Format=function(_0x1ec4bb){
	var _0x2273ef,_0x25ac60=this,_0x334d9c=_0x1ec4bb,_0x3fc1ee={'M+':_0x25ac60.getMonth()+1,'d+':_0x25ac60.getDate(),'D+':_0x25ac60.getDate(),'h+':_0x25ac60.getHours(),'H+':_0x25ac60.getHours(),'m+':_0x25ac60.getMinutes(),'s+':_0x25ac60.getSeconds(),'w+':_0x25ac60.getDay(),'q+':Math.floor(_0x25ac60.getMonth()+3/3),'S+':_0x25ac60.getMilliseconds()};
	/(y+)/i.test(_0x334d9c)&&(_0x334d9c=_0x334d9c.replace(RegExp.$1,''.concat(_0x25ac60.getFullYear()).substr(4-RegExp.$1.length)));
	for(var _0xd76021 in _0x3fc1ee){
		if(new RegExp('('.concat(_0xd76021,')')).test(_0x334d9c)){
			var _0x6ee06d,_0x2c5f41=('S+'===_0xd76021)?'000':'00';
			_0x334d9c=_0x334d9c.replace(RegExp.$1,(1==RegExp.$1.length)?_0x3fc1ee[_0xd76021]:(''.concat(_0x2c5f41)+_0x3fc1ee[_0xd76021]).substr(''.concat(_0x3fc1ee[_0xd76021]).length));
		}
	}
	return _0x334d9c;
};
function random(_0x49d667,_0x34bf6a){
	return Math.floor(Math.random()*_0x34bf6a-_0x49d667)+_0x49d667;
};
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

