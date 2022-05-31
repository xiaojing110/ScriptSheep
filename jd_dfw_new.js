/*
大富翁new
cron 0 0,10,20 * * * jd_dfw_new.js
*/
const $=new Env('大富翁new');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
let cookiesArr=[];
$.flCode=$.isNode()?process.env.FLCODE?process.env.FLCODE:'9999':'9999';
if($.isNode()){
	Object.keys(jdCookieNode).forEach(_0x396bc9=>{
		cookiesArr.push(jdCookieNode[_0x396bc9]);
	});
	if(process.env.JD_DEBUG&&process.env.JD_DEBUG==='false')console.log=()=>{};
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]').map(_0x466cb5=>_0x466cb5.cookie)].filter(_0x23fa0d=>!!_0x23fa0d);
}
let appId,fingerprint,token,enCryptMethodJD;
!(async()=>{
	$.CryptoJS=$.isNode()?require('crypto-js'):CryptoJS;
	appId='6a98d';
	let _0x3928a2=['6289931560897925','0403403318679778','1390288884563462'];
	fingerprint=getRandomArrayElements(_0x3928a2,1)[0];
	await requestAlgo();
	if($.flCode!=='9999'){
		$.show=false;
	}else{
		$.show=true;
	}
	let _0xbc3aa7=[];
	for(let _0x148ac5=0;_0x148ac5<cookiesArr.length;_0x148ac5+=10){
		_0xbc3aa7.push(cookiesArr.slice(_0x148ac5,_0x148ac5+10));
	}for(let _0x51a40b=0;_0x51a40b<_0xbc3aa7.length;_0x51a40b++){
		const _0xf4e016=_0xbc3aa7[_0x51a40b].map((_0x123feb,_0x3cad16)=>main(_0x123feb));
		await Promise.all(_0xf4e016);
	}for(let _0x35add5=0;_0x35add5<cookiesArr.length;_0x35add5++){
		var _0x30fd8e='3|7|6|4|1|2|0|5'.split('|'),_0x1132af=0;
		while(true){
			switch(_0x30fd8e[_0x1132af++]){
				case'0':
					try{
							await maintask($.cookie);
						}catch(_0x4263c0){
							$.logErr(_0x4263c0);
						}
					continue;
				case'1':
					$.UserName=decodeURIComponent($.cookie.match(/pt_pin=([^; ]+)(?=;?)/)&&$.cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
					continue;
				case'2':
					console.log('\n*****开始【京东账号'+$.index+'】'+($.nickName||$.UserName)+'*****\n');
					continue;
				case'3':
					$.index=(_0x35add5+1);
					continue;
				case'4':
					$.nickName='';
					continue;
				case'5':
					await $.wait(2000);
					continue;
				case'6':
					$.isLogin=true;
					continue;
				case'7':
					$.cookie=cookiesArr[_0x35add5];
					continue;
			}
			break;
		}
	}
})().catch(_0xf9f2c9=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0xf9f2c9+'!','');
}).finally(()=>{
	$.done();
});
async function maintask(_0x595d57){
	let _0x5f3754=getUA();
	let _0xd03580=false;
	let _0x13ba72=decodeURIComponent(_0x595d57.match(/pt_pin=(.+?);/)&&_0x595d57.match(/pt_pin=(.+?);/)[1]);
	let _0x49f9a6=await qryCompositeMaterials(_0x5f3754,_0x595d57);
	if(_0x49f9a6&&_0x49f9a6.selfBrandList0&&_0x49f9a6.selfBrandList0.list){
		await $.wait(2000);
		let _0x47f7f0=[];
		for(let _0x67cd2c=0;_0x67cd2c<6;_0x67cd2c++){
			_0x47f7f0=[..._0x47f7f0,..._0x49f9a6['selfBrandList'+_0x67cd2c].list];
		}
		_0x47f7f0=getRandomArrayElements(_0x47f7f0,_0x47f7f0.length);
		let _0x1359f1={};
		console.log('店铺总数：'+_0x47f7f0.length);
		for(let _0x3a8358=0;(_0x3a8358<_0x47f7f0.length)&&!_0xd03580;_0x3a8358++){
			let _0x25b95b=_0x47f7f0[_0x3a8358];
			let _0xbf18e4=_0x25b95b.link;
			let _0x1a2723=_0x25b95b.extension.shopInfo.venderId;
			if(!_0xbf18e4||!_0x1a2723){
				return;
			}
			console.log('\n'+_0x13ba72+',第'+(_0x3a8358+1)+'个店铺，'+_0x25b95b.name+',ID:'+_0xbf18e4);
			let _0x3a8ba6=await takeRequest(_0x595d57,_0x5f3754,'jm_promotion_queryPromotionInfoByShopId','appid=signed_mp&client=xcx&clientVersion=-1&functionId=jm_promotion_queryPromotionInfoByShopId&body=%7B%22shopId%22%3A%22'+_0xbf18e4+'%22%2C%22channel%22%3A20%7D&loginType=2&loginWQBiz=dacu');
			if(_0x3a8ba6&&_0x3a8ba6.innerLink&&_0x3a8ba6.innerLink.match(/{\"appId\":\"(.*)\",\"category/)&&_0x3a8ba6.innerLink.match(/{\"appId\":\"(.*)\",\"category/)[1]){
				let _0x6855fc=_0x3a8ba6.innerLink.match(/,\"projectId\":(.*),\"shopId/)[1];
				let _0x1ed455='functionId=jm_marketing_maininfo&body=%7B%22shopId%22%3A%22'+_0xbf18e4+'%22%2C%22venderId%22%3A%22'+_0x1a2723+'%22%2C%22projectId%22%3A%22'+_0x6855fc+'%22%7D&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart';
				let _0x57caec=await takeRequest2(_0x595d57,_0x5f3754,_0x1ed455);
				if(!_0x57caec.userInfo.attention){
					console.log(_0x13ba72+',去关注');
					_0x1ed455='functionId=followShop&body='+encodeURIComponent(JSON.stringify({'shopId':_0xbf18e4,'follow':true,'type':0,'sourceRpc':'shop_app_myfollows_shop','refer':'https://wq.jd.com/wxapp/pages/shopfans/pages/index/index'}))+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart';
					await takeRequest2(_0x595d57,_0x5f3754,_0x1ed455);
					await $.wait(2000);
				}else{
					console.log(_0x13ba72+',已关注');
				}
				let _0x2494c2=false;
				let _0x31e372=_0x57caec.project.viewTaskVOS;
				for(let _0x1ce04c=0;_0x1ce04c<_0x31e372.length;_0x1ce04c++){
					let _0x1e4717=_0x31e372[_0x1ce04c];
					if((_0x1e4717.type===1)||(_0x1e4717.type===7)||(_0x1e4717.type===2)||(_0x1e4717.type===6)){
						continue;
					}if(_0x1e4717.finishCount!==0){
						console.log(_0x13ba72+',任务:'+_0x1e4717.name+',已完成');
						continue;
					}if((_0x1e4717.type===5)||(_0x1e4717.type===3)){
						console.log(_0x13ba72+',任务:'+_0x1e4717.name+',去执行');
						let _0x471b9b=(_0x1e4717.totalCount-_0x1e4717.finishCount);
						_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x1e4717['id']+'}';
						let _0x3fff08=await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_goods_taskGoods&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
						await $.wait(2000);
						let _0x1762ea=_0x3fff08.skuList;
						for(let _0x1db63e=0;(_0x1db63e<_0x1762ea.length)&&(_0x1db63e<_0x471b9b);_0x1db63e++){
							_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x1e4717['id']+',"token":"'+_0x1e4717.token+'","opType":1,"referSource":'+_0x1762ea[_0x1db63e].skuId+'}';
							await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_task_process&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
							await $.wait(6000);
							_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x1e4717['id']+',"token":"'+_0x1e4717.token+'","opType":2,"referSource":'+_0x1762ea[_0x1db63e].skuId+'}';
							let _0x3a5f15=await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_task_process&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
							if(_0x3a5f15&&_0x3a5f15.awardVO){
								console.log(_0x13ba72+',获得：'+_0x3a5f15.awardVO.name);
							}else{
								_0xd03580=true;
							}
							console.log(JSON.stringify(_0x3a5f15)+'\n');
						}
						await $.wait(2000);
						_0x2494c2=true;
					}else if((_0x1e4717.type===8)||(_0x1e4717.type===4)){
						console.log(_0x13ba72+',任务:'+_0x1e4717.name+',去执行');
						_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x1e4717['id']+',"token":"'+_0x1e4717.token+'","opType":1}';
						await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_task_process&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
						await $.wait(5000);
						_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x1e4717['id']+',"token":"'+_0x1e4717.token+'","opType":2}';
						let _0x46df25=await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_task_process&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
						if(_0x46df25&&_0x46df25.awardVO){
							console.log(_0x13ba72+',获得：'+_0x46df25.awardVO.name);
						}else{
							console.log(JSON.stringify(_0x46df25));
							_0xd03580=true;
						}
						await $.wait(2000);
						_0x2494c2=true;
					}else{
						console.log(_0x13ba72+',任务:'+_0x1e4717.name+',不执行');
					}
				}
				if(_0x2494c2){
					_0x1ed455='functionId=jm_marketing_maininfo&body=%7B%22shopId%22%3A%22'+_0xbf18e4+'%22%2C%22venderId%22%3A%22'+_0x1a2723+'%22%2C%22projectId%22%3A%22'+_0x6855fc+'%22%7D&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart';
					_0x57caec=await takeRequest2(_0x595d57,_0x5f3754,_0x1ed455);
					_0x31e372=_0x57caec.project.viewTaskVOS;
				}
				let _0x38e843=_0x57caec.userInfo.fansIcon;
				let _0x36be18='';
				let _0x2682d7='';
				for(let _0x8fcf9=0;_0x8fcf9<_0x31e372.length;_0x8fcf9++){
					if(_0x31e372[_0x8fcf9].type===1){
						_0x36be18=_0x31e372[_0x8fcf9]['id'];
						_0x2682d7=_0x31e372[_0x8fcf9].token;
					}
				}
				await $.wait(2000);
				for(let _0x464b49=0;_0x464b49<_0x38e843;_0x464b49++){
					console.log(_0x13ba72+',丢一次骰子');
					_0x1359f1='{"shopId":"'+_0xbf18e4+'","venderId":"'+_0x1a2723+'","projectId":"'+_0x6855fc+'","taskId":'+_0x36be18+',"token":"'+_0x2682d7+'","opType":2}';
					let _0x46df25=await takeRequest2(_0x595d57,_0x5f3754,'functionId=jm_task_process&body='+encodeURIComponent(_0x1359f1)+'&t='+Date.now()+'&appid=wx_mini_app&clientVersion=10.0.0&client=wh5&uuid=-1&loginType=2&loginWQBiz=mshop-smart');
					if(_0x46df25&&_0x46df25.awardVO){
						console.log(_0x13ba72+',获得：'+_0x46df25.awardVO.name);
					}
					if(JSON.stringify(_0x46df25)==='{}'){
						console.log('\n已满');
						_0xd03580=true;
					}
					console.log(JSON.stringify(_0x46df25)+'\n');
					await $.wait(2000);
				}
			}
		}
	}else{
		console.log(_0x13ba72+',获取店铺列表失败');
	}
}
async function takeRequest(_0x137585,_0xb9762b,_0x3437d0,_0x5e3f66){
	const _0x2fd452='https://api.m.jd.com/';
	const _0x5067a2={'Cookie':_0x137585,'content-type':'application/x-www-form-urlencoded','Connection':'keep-alive','Accept-Encoding':'gzip,compress,br,deflate','Referer':'https://servicewechat.com/wx91d27dbf599dff74/621/page-frame.html','Host':'api.m.jd.com','User-Agent':_0xb9762b};
	let _0x5383d2={'url':_0x2fd452,'headers':_0x5067a2,'body':_0x5e3f66};
	return new Promise(async _0x42d630=>{
		$.post(_0x5383d2,(_0x2e3460,_0x12711d,_0x2822e2)=>{
			try{
				if(_0x2e3460){
					console.log(_0x2e3460);
				}else{
					_0x2822e2=JSON.parse(_0x2822e2);
				}
			}catch(_0x1f0986){
				console.log(_0x2822e2);
				$.logErr(_0x1f0986,_0x12711d);
			}
			finally{
				_0x42d630(_0x2822e2.data||{});
			}
		});
	});
}
async function takeRequest2(_0xeee28f,_0x40a31c,_0x346691){
	const _0x27bd01='https://api.m.jd.com/client.action';
	const _0x37d806={'Accept-Encoding':'gzip,compress,br,deflate','content-type':'application/x-www-form-urlencoded','Connection':'keep-alive','Cookie':_0xeee28f,'wqreferer':'https://wq.jd.com/wxapp/pages/shopfans/pages/index/index','Host':'api.m.jd.com','User-Agent':_0x40a31c,'Referer':'https://servicewechat.com/wx91d27dbf599dff74/621/page-frame.html'};
	let _0x9495d2={'url':_0x27bd01,'headers':_0x37d806,'body':_0x346691};
	return new Promise(async _0x262805=>{
		$.post(_0x9495d2,(_0x24022b,_0x542ab3,_0x3d5e7c)=>{
			try{
				if(_0x24022b){
					console.log(_0x24022b);
				}else{
					_0x3d5e7c=JSON.parse(_0x3d5e7c);
				}
			}catch(_0x9be411){
				console.log(_0x3d5e7c);
				$.logErr(_0x9be411,_0x542ab3);
			}
			finally{
				_0x262805(_0x3d5e7c.data||{});
			}
		});
	});
}
async function qryCompositeMaterials(_0xda7e43,_0x94ad9a){
	const _0x2b9fd4='appid=signed_mp&client=xcx&clientVersion=-1&functionId=qryCompositeMaterials&body=%7B%22qryParam%22%3A%22%5B%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206111633%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22feedsLogo%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110848%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList0%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110849%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList1%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110876%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList2%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110889%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList3%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110899%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList4%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110902%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22POPBrandList5%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110898%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList0%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110893%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList1%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110890%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList2%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110887%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList3%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110872%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList4%5C%22%7D%2C%7B%5C%22type%5C%22%3A%5C%22advertGroup%5C%22%2C%5C%22id%5C%22%3A%5C%2206110862%5C%22%2C%5C%22mapTo%5C%22%3A%5C%22selfBrandList5%5C%22%7D%5D%22%2C%22openid%22%3A%22oA1P50F-fyKFkiN_z87AMebF3w-0%22%2C%22applyKey%22%3A%22jd_star_vx%22%7D&loginType=2&loginWQBiz=dacu';
	const _0x53741d='https://api.m.jd.com/';
	const _0x50bf36={'Cookie':_0x94ad9a,'content-type':'application/x-www-form-urlencoded','Connection':'keep-alive','Accept-Encoding':'gzip,compress,br,deflate','Referer':'https://servicewechat.com/wx91d27dbf599dff74/621/page-frame.html','Host':'api.m.jd.com','User-Agent':_0xda7e43};
	const _0x14377f={'url':_0x53741d,'headers':_0x50bf36,'body':_0x2b9fd4};
	return new Promise(_0xd13b0c=>{
		$.post(_0x14377f,async(_0x3b0d0c,_0xefc69c,_0x3676a3)=>{
			try{
				if(_0x3b0d0c&&!_0x3676a3){
					console.log(''+JSON.stringify(_0x3b0d0c));
					console.log($.name+' API请求失败，请检查网路重试');
				}else{
					_0x3676a3=JSON.parse(_0x3676a3);
				}
			}catch(_0x35ea37){
				$.logErr(_0x35ea37,_0xefc69c);
			}
			finally{
				_0xd13b0c(_0x3676a3.data||'');
			}
		});
	});
}
function getUA(){
	let _0x16885e=randomString(40);
	const _0xe7811d={'167814':'10.1.4','167841':'10.1.6'};
	let _0x299493=randomNum(12,14)+'.'+randomNum(0,6);
	let _0x214a47='network/'+['4g','5g','wifi'][randomNum(0,2)];
	let _0x4c4325='iPhone'+randomNum(9,13)+','+randomNum(1,3);
	let _0x5bcf78=['167814','167841'][randomNum(0,1)];
	let _0x4045d3=_0xe7811d[_0x5bcf78];
	return 'jdapp;iPhone;'+_0x4045d3+';'+_0x299493+';'+_0x16885e+';'+_0x214a47+';model/'+_0x4c4325+';addressid/'+randomNum(1000000000)+';appBuild/'+_0x5bcf78+';jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS '+_0x299493.replace(/\./g,'_')+' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x320e1a,_0x126589=0){
	var _0x34469c='',_0xabb975=_0x320e1a,_0x312adf=[...Array(35).keys()].map(_0x3e018f=>_0x3e018f.toString(36));
	if(_0x126589){
		_0xabb975=Math.floor(Math.random()*_0x126589-_0x320e1a+1+_0x320e1a);
	}
	for(let _0x48cba2=0;_0x48cba2<_0xabb975;){
		let _0x4c20db=Math.random().toString(16).substring(2);
		if(_0xabb975-_0x48cba2>_0x4c20db.length){
			_0x34469c+=_0x4c20db;
			_0x48cba2+=_0x4c20db.length;
		}else{
			_0x34469c+=_0x4c20db.slice(_0x48cba2-_0xabb975);
			_0x48cba2+=_0x4c20db.length;
		}
	}
	return _0x34469c;
}
function randomNum(_0x2289ea,_0x1fe5df){
	if(arguments.length===0)return Math.random();
	if(!_0x1fe5df)_0x1fe5df=(10**Math.log(_0x2289ea)*Math.LOG10E+0x1|0x0-1);
	return Math.floor(Math.random()*_0x1fe5df-_0x2289ea+1+_0x2289ea);
}
function getRandomArrayElements(_0x1d0010,_0x48d2fc){
	var _0x3a47c7=_0x1d0010.slice(0),_0x1195b8=_0x1d0010.length,_0x13722d=(_0x1195b8-_0x48d2fc),_0x2e2d7c,_0x411c05;
	while(_0x1195b8-->_0x13722d){
		_0x411c05=Math.floor(_0x1195b8+1*Math.random());
		_0x2e2d7c=_0x3a47c7[_0x411c05];
		_0x3a47c7[_0x411c05]=_0x3a47c7[_0x1195b8];
		_0x3a47c7[_0x1195b8]=_0x2e2d7c;
	}
	return _0x3a47c7.slice(_0x13722d);
}
async function main(_0x4f43d0,_0x264f27='JdhENNw'){
	const _0x4ac1a8=['JdhENNw','JKhfec3'];
	_0x264f27=_0x4ac1a8[random(0,_0x4ac1a8.length)];
	let _0x50163c=decodeURIComponent(_0x4f43d0.match(/pt_pin=([^; ]+)(?=;?)/)&&_0x4f43d0.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
	let _0x567c60=await getInfoByUrl($,_0x4f43d0,_0x264f27);
	_0x4f43d0=_0x567c60['ck'];
	let _0x3af06a=_0x567c60.url;
	let _0x4e44eb=getUA();
	let _0x33bc93=_0x3af06a.match(/mall\/active\/([^\/]+)\/index\.html/)&&_0x3af06a.match(/mall\/active\/([^\/]+)\/index\.html/)[1]||'2UboZe4RXkJPrpkp6SkpJJgtRmod';
	await getHtml(_0x3af06a,_0x4f43d0,_0x4e44eb);
	await takeRequest(_0x4f43d0,_0x4e44eb,_0x50163c,_0x33bc93,_0x264f27);
}
function random(_0x423fc3,_0x50cc0){
	return Math.floor(Math.random()*_0x50cc0-_0x423fc3)+_0x423fc3;
}
function randomNum(_0x3cb673,_0x5bc8fd){
	if(arguments.length===0)return Math.random();
	if(!_0x5bc8fd)_0x5bc8fd=(10**Math.log(_0x3cb673)*Math.LOG10E+0x1|0x0-1);
	return Math.floor(Math.random()*_0x5bc8fd-_0x3cb673+1+_0x3cb673);
}
async function getInfoByUrl(_0x231637,_0xaa9c70,_0x294529){
	let _0x7a92d9=getCookieStr(_0x231637,_0xaa9c70);
	let _0xb64441={'url':'','ck':''};
	let _0x5bab79='';
	let _0x13a249=await getInfo(_0x231637,''+_0xaa9c70+_0x7a92d9,_0x294529);
	let _0x554671=_0x13a249.resp.headers['set-cookie']||_0x13a249.resp.headers['Set-Cookie']||'';
	let _0x52e5dc='';
	if(_0x554671){
		if(typeof _0x554671!='object'){
			_0x52e5dc=_0x554671.split(',');
		}else{
			_0x52e5dc=_0x554671;
		}
		for(let _0xaa9c70 of _0x52e5dc){
			let _0x3d04a5=_0xaa9c70.split(';')[0].trim();
			if(_0x3d04a5.split('=')[1]){
				if(_0x5bab79.indexOf(_0x3d04a5.split('=')[1])===-1)_0x5bab79+=(_0x3d04a5.replace(/ /g,'')+'; ');
			}
		}
	}
	let _0x198af3=_0x13a249.data.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)&&_0x13a249.data.match(/(https:\/\/u\.jd\.com\/jda[^']+)/)[1]||'';
	if(!_0x198af3){
		console.log('初始化1失败');
		return _0xb64441;
	}
	let _0x38fc4c=await getInfo(_0x231637,''+_0xaa9c70+_0x7a92d9+_0x5bab79,_0x198af3,2);
	_0x554671=_0x38fc4c.resp&&_0x38fc4c.resp.headers&&(_0x38fc4c.resp.headers['set-cookie']||_0x38fc4c.resp.headers['Set-Cookie']||'')||'';
	_0x52e5dc='';
	if(_0x554671){
		if(typeof _0x554671!='object'){
			_0x52e5dc=_0x554671.split(',');
		}else{
			_0x52e5dc=_0x554671;
		}
		for(let _0xaa9c70 of _0x52e5dc){
			let _0x3d04a5=_0xaa9c70.split(';')[0].trim();
			if(_0x3d04a5.split('=')[1]){
				if(_0x5bab79.indexOf(_0x3d04a5.split('=')[1])===-1)_0x5bab79+=(_0x3d04a5.replace(/ /g,'')+'; ');
			}
		}
	}
	let _0x42e3dd=_0x38fc4c.resp&&_0x38fc4c.resp.headers&&(_0x38fc4c.resp.headers.location||_0x38fc4c.resp.headers.Location||'')||'';
	_0x42e3dd=decodeURIComponent(_0x42e3dd);
	if(!_0x42e3dd){
		console.log('初始化2失败');
		return _0xb64441;
	}
	_0xb64441.url=_0x42e3dd;
	_0xb64441['ck']=''+_0xaa9c70+_0x7a92d9+_0x5bab79;
	return _0xb64441;
}
function getCookieStr(_0x296957,_0x5f058a){
	if(!_0x296957.ckInfo){
		_0x296957.ckInfo={};
	}
	if(_0x296957.ckInfo[_0x5f058a]){
		return _0x296957.ckInfo[_0x5f058a];
	}
	let _0x364083=123;
	let _0x46ab66=(new Date().getTime()+''+parseInt(2147483647*Math.random()));
	let _0xf916c5=_0x46ab66.substr(0,10);
	let _0x4fa0d4=1;
	let _0x37ab88=[_0x364083,_0x46ab66,_0xf916c5,_0xf916c5,_0xf916c5,_0x4fa0d4].join('.');
	let _0x4e8ce1='__jda='+_0x37ab88+';';
	_0x296957.ckInfo[_0x5f058a]=_0x4e8ce1;
	return _0x4e8ce1;
}
async function getInfo(_0x5d126d,_0x3e3966,_0x376cf9,_0xe0157c=1){
	let _0x5701c4=_0x376cf9;
	if(_0xe0157c===1){
		if(_0x376cf9.indexOf('https://u.jd.com')!==-1){
			_0x5701c4=_0x376cf9;
		}else{
			_0x5701c4='https://u.jd.com/'+_0x376cf9;
		}
	}
	return new Promise(_0x3c6a09=>{
		const _0x2eba90={'url':_0x5701c4,'followRedirect':false,'headers':{'Cookie':_0x3e3966,'user-agent':'JD4iPhone/10.2.4 CFNetwork/1240.0.4 Darwin/20.5.0'}};
		_0x5d126d.get(_0x2eba90,async(_0x3e9043,_0x28ddb3,_0x2f2526)=>{
			try{
				_0x3c6a09({'resp':_0x28ddb3,'data':_0x2f2526});
			}catch(_0x5c0365){
				_0x5d126d.logErr(_0x5c0365,_0x28ddb3);
			}
			finally{
				_0x3c6a09();
			}
		});
	});
}
async function takeRequest(_0x4b7fb7,_0x57a8a7,_0x3332bc,_0x3950db,_0x35d038){
	let _0x43473f={'platform':4,'unionActId':'31142','actId':_0x3950db,'d':_0x35d038,'unionShareId':'','type':1,'eid':'-1'};
	let _0x584e88='functionId=getCoupons&appid=u&_='+Date.now()+'&loginType=2&body='+JSON.stringify(_0x43473f)+'&client=apple&clientVersion=8.3.6';
	let _0x308511=await getH5st('https://api.m.jd.com?'+_0x584e88);
	let _0x56a138='https://api.m.jd.com?functionId=getCoupons&appid=u&_='+Date.now()+'&loginType=2&body='+JSON.stringify(_0x43473f)+'&client=apple&clientVersion=8.3.6';
	_0x56a138+='&h5st='+_0x308511;
	const _0x286aab={'Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':_0x4b7fb7,'user-agent':_0x57a8a7};
	let _0x459359={'url':_0x56a138,'headers':_0x286aab};
	return new Promise(async _0xa3d0e4=>{
		$.get(_0x459359,(_0x38a784,_0x26ab57,_0x48d927)=>{
			try{
				if($.show){
					if(_0x38a784){}else{
						let _0x266f36=$.toObj(_0x48d927,_0x48d927);
						if(typeof _0x266f36=='object'){
							if(_0x266f36.msg.indexOf('上限')!==-1){
								$.max=true;
							}
							if($.shareId&&(typeof _0x266f36.data!=='undefined')&&(typeof _0x266f36.data.joinNum!=='undefined')){}if((_0x266f36.code==0)&&_0x266f36.data){
								if(_0x266f36.data.type==1){}else if(_0x266f36.data.type==3){}else if(_0x266f36.data.type==6){}else{}
							}
						}else{}
					}
				}
			}catch(_0x3f618f){}
			finally{
				_0xa3d0e4(_0x48d927.data||{});
			}
		});
	});
}
async function getHtml(_0x594805,_0x5d9a90,_0x502c67){
	let _0x4d91f1={'url':_0x594805,'headers':{'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':_0x5d9a90,'User-Agent':_0x502c67,'Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Connection':'keep-alive'}};
	return new Promise(_0x86ab61=>{
		$.get(_0x4d91f1,(_0x2ff13f,_0x5b64cd,_0x16c6df)=>{
			try{}catch(_0x159550){
				$.logErr(_0x159550,_0x5b64cd);
			}
			finally{
				_0x86ab61(_0x16c6df);
			}
		});
	});
}
function randomString(_0x274f81,_0x494ccc=0){
	var _0x2e96eb='',_0x2a2f04=_0x274f81,_0x44675a=[...Array(35).keys()].map(_0xe3d6d6=>_0xe3d6d6.toString(36));
	if(_0x494ccc){
		_0x2a2f04=Math.floor(Math.random()*_0x494ccc-_0x274f81+1+_0x274f81);
	}
	for(let _0x5736fa=0;_0x5736fa<_0x2a2f04;){
		let _0xb4bf9b=Math.random().toString(16).substring(2);
		if(_0x2a2f04-_0x5736fa>_0xb4bf9b.length){
			_0x2e96eb+=_0xb4bf9b;
			_0x5736fa+=_0xb4bf9b.length;
		}else{
			_0x2e96eb+=_0xb4bf9b.slice(_0x5736fa-_0x2a2f04);
			_0x5736fa+=_0xb4bf9b.length;
		}
	}
	return _0x2e96eb;
}
function getRandomArrayElements(_0x3d64c7,_0x29e699){
	var _0x1a8f28=_0x3d64c7.slice(0),_0x1defc2=_0x3d64c7.length,_0x970da8=(_0x1defc2-_0x29e699),_0x16ffc0,_0x55da72;
	while(_0x1defc2-->_0x970da8){
		_0x55da72=Math.floor(_0x1defc2+1*Math.random());
		_0x16ffc0=_0x1a8f28[_0x55da72];
		_0x1a8f28[_0x55da72]=_0x1a8f28[_0x1defc2];
		_0x1a8f28[_0x1defc2]=_0x16ffc0;
	}
	return _0x1a8f28.slice(_0x970da8);
}
async function requestAlgo(){
	const _0x3dc909={'url':'https://cactus.jd.com/request_algo?g_ty=ajax','headers':{'Authority':'cactus.jd.com','Pragma':'no-cache','Cache-Control':'no-cache','Accept':'application/json','User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1','Content-Type':'application/json','Origin':'https://daily-redpacket.jd.com','Sec-Fetch-Site':'cross-site','Sec-Fetch-Mode':'cors','Sec-Fetch-Dest':'empty','Referer':'https://daily-redpacket.jd.com/','Accept-Language':'zh-CN,zh;q=0.9,zh-TW;q=0.8,en;q=0.7'},'body':JSON.stringify({'version':'3.0','fp':fingerprint,'appId':appId,'timestamp':Date.now(),'platform':'web','expandParams':''})};
	return new Promise(async _0x183125=>{
		$.post(_0x3dc909,(_0x5de103,_0x9998ed,_0x45010a)=>{
			try{
				if(_0x5de103){}else{
					if(_0x45010a){
						_0x45010a=JSON.parse(_0x45010a);
						if(_0x45010a.status===200){
							token=_0x45010a.data.result['tk'];
							let _0x18502f=_0x45010a.data.result.algo;
							if(_0x18502f)enCryptMethodJD=new Function('return '+_0x18502f)();
						}else{}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x2d01e8){
				$.logErr(_0x2d01e8,_0x9998ed);
			}
			finally{
				_0x183125();
			}
		});
	});
}
async function getH5st(_0x560b82){
	let _0x38633d=getUrlData(_0x560b82,'body');
	const _0x205381=$.CryptoJS.SHA256(_0x38633d).toString($.CryptoJS.enc.Hex);
	_0x560b82=replaceParamVal(_0x560b82,'body',_0x205381);
	const _0x24139f='appid,body,client,clientVersion,functionId';
	let _0x400126=Date.now();
	const _0x42c860=timeString('yyyyMMddhhmmssSSS',new Date(Number(_0x400126)));
	let _0x515940=enCryptMethodJD(token,fingerprint.toString(),_0x42c860.toString(),appId.toString(),$.CryptoJS).toString($.CryptoJS.enc.Hex);
	let _0x43bc61='';
	_0x24139f.split(',').map((_0x5478f5,_0x361526)=>{
		_0x43bc61+=_0x5478f5+':'+getUrlData(_0x560b82,_0x5478f5)+((_0x361526===_0x24139f.split(',').length-1)?'':'&');
	});
	const _0x40f441=$.CryptoJS.HmacSHA256(_0x43bc61,_0x515940.toString()).toString($.CryptoJS.enc.Hex);
	let _0x2b42cc=[''.concat(_0x42c860.toString()),''.concat(fingerprint.toString()),''.concat(appId.toString()),''.concat(token),''.concat(_0x40f441),''.concat('3.0'),''.concat(_0x400126)].join(';');
	return encodeURIComponent(_0x2b42cc);
}
function replaceParamVal(_0x59534,_0x3b01fc,_0x1f66b1){
	var _0x33c5ae=eval('/('+_0x3b01fc+'=)([^&]*)/gi');
	var _0x1bf074=_0x59534.replace(_0x33c5ae,_0x3b01fc+'='+_0x1f66b1);
	return _0x1bf074;
}
function timeString(_0x5dc593,_0x543121){
	var _0x38f526=_0x5dc593,_0x1dcf3a={'M+':(_0x543121.getMonth()+1),'d+':_0x543121.getDate(),'D+':_0x543121.getDate(),'h+':_0x543121.getHours(),'H+':_0x543121.getHours(),'m+':_0x543121.getMinutes(),'s+':_0x543121.getSeconds(),'w+':_0x543121.getDay(),'q+':Math.floor(_0x543121.getMonth()+3/3),'S+':_0x543121.getMilliseconds()};
	/(y+)/i.test(_0x38f526)&&(_0x38f526=_0x38f526.replace(RegExp['$1'],''.concat(_0x543121.getFullYear()).substr(4-RegExp['$1'].length)));
	for(var _0x165060 in _0x1dcf3a){
		if(new RegExp('('.concat(_0x165060,')')).test(_0x38f526)){
			var _0x9fbd40,_0x470df9=('S+'===_0x165060)?'000':'00';
			_0x38f526=_0x38f526.replace(RegExp['$1'],(1==RegExp['$1'].length)?_0x1dcf3a[_0x165060]:(''.concat(_0x470df9)+_0x1dcf3a[_0x165060]).substr(''.concat(_0x1dcf3a[_0x165060]).length));
		}
	}
	return _0x38f526;
}
function getUrlData(_0x485cef,_0x43f002){
	if(typeof URL!=='undefined'){
		let _0x2375b7=new URL(_0x485cef);
		let _0x1cea1e=_0x2375b7.searchParams.get(_0x43f002);
		return _0x1cea1e?_0x1cea1e:'';
	}else{
		const _0x5209cc=_0x485cef.match(/\?.*/)[0].substring(1);
		const _0x468252=_0x5209cc.split('&');
		for(let _0x506a57=0;_0x506a57<_0x468252.length;_0x506a57++){
			const _0x397d92=_0x468252[_0x506a57].split('=');
			if(_0x397d92[0]===_0x43f002){
				return _0x468252[_0x506a57].substr(_0x468252[_0x506a57].indexOf('=')+1);
			}
		}
		return'';
	}
};

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}