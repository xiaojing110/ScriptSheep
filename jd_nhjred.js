/*
京东领红包
添加环境变量 export FLCODNHJ='xxx'

0 0,20 * * * jd_nhjred.js

*/
const $ = new Env('红包');
const jdCookieNode=$.isNode()?require('./jdCookie.js'):'';
const flCode=$.isNode()?process.env['FLCODNHJ']?process.env['FLCODNHJ']:'':'';
const endTime=1673794800000;
if ($.flCode=='') {
    console.log('请填写FLCODNHJ环境变量,无内置码');
    return;
}
let cookiesArr=[];
if($.isNode()){
	Object.keys(jdCookieNode)['forEach'](_0x283b9d=>{
		cookiesArr.push(jdCookieNode[_0x283b9d]);
	});
}else{
	cookiesArr=[$.getdata('CookieJD'),$.getdata('CookieJD2'),...$.toObj($.getdata('CookiesJD')||'[]')['map'](_0x4d3898=>_0x4d3898.cookie)]['filter'](_0x5d82e2=>!!_0x5d82e2);
}
let UA='';
const CryptoJS=require('crypto-js');
!(async()=>{
	if(cookiesArr.length===0){
		return;
	}
	$.nowTime=Date.now();
	if($.nowTime>endTime){
		console.log('结束时间 '+endTime);
		console.log('当前时间 '+$.nowTime);
		return;
	}
	$.url='https://prodev.m.jd.com/mall/active/3re5ajBZWA71ygjVnAz9kbaU1tfw/index.html';
	$.origin='https://prodev.m.jd.com';
	$.stk='appid,body,client,clientVersion,functionId';
	UA=getUA();
	let _0x20d907='https://api.m.jd.com/api?functionId=getCoupons&appid=u&_='+Date.now()+'&loginType=2&body='+encodeURIComponent(JSON.stringify({}))+'&client=iPhone&clientVersion=&osVersion=iOS&screen=414*736&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=';
	await getH5st($,getRandomArrayElements(cookiesArr,1)[0],_0x20d907,'6a98d',UA);
	let _0x30c95c=1;
	var _0xf56a74=[];
	for(let _0xef1e4d=0;_0xef1e4d<cookiesArr.length;_0xef1e4d+=_0x30c95c){
		_0xf56a74.push(cookiesArr.slice(_0xef1e4d,_0xef1e4d+_0x30c95c));
	}
	for(let _0x114508=0;_0x114508<_0xf56a74.length;_0x114508++){
		console.log('-------------------'+(_0x114508+1)+'----------------------------------');
		const _0x55de2e=_0xf56a74[_0x114508]['map']((_0x1470c6,_0x5db10f)=>main(_0x1470c6));
		await Promise.all(_0x55de2e);
	}
})()['catch'](_0x5134d6=>{
	$.log('','❌ '+$.name+', 失败! 原因: '+_0x5134d6+'!','');
})['finally'](()=>{
	$.done();
});
async function main(_0x181b2,_0x24eb0b=''){
	if(flCode){
		_0x24eb0b=flCode;
	}
	let _0x425951=decodeURIComponent(_0x181b2.match(/pt_pin=([^; ]+)(?=;?)/)&&_0x181b2.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
	let _0x4eb3d5=getUA();
	let _0x4b81b2=await getInfoByUrl($,_0x181b2,_0x24eb0b);
	_0x181b2=_0x4b81b2.ck;
	let _0x19a677=_0x4b81b2.url;
	let _0x1cfdfe=_0x19a677.match(/mall\/active\/([^\/]+)\/index\.html/)&&_0x19a677.match(/mall\/active\/([^\/]+)\/index\.html/)[1]||'2UboZe4RXkJPrpkp6SkpJJgtRmod';
	await getHtml(_0x4eb3d5,_0x19a677,_0x181b2);
	let _0xfad01c=3;
	let _0x1c0358='';
	do{
		let _0x55f4bc=await takeRequest(_0x4eb3d5,_0x181b2,_0x425951,_0x1cfdfe,_0x24eb0b);
		if(_0x55f4bc&&JSON.parse(_0x55f4bc)){
			_0x1c0358=JSON.parse(_0x55f4bc);
		}
		_0xfad01c--;
	}while(_0x1c0358.msg!=='达到领取上限'&&_0x1c0358.msg!=='用户未登录'&&_0xfad01c>0);
	await takeRequest(_0x4eb3d5,_0x181b2,_0x425951,_0x1cfdfe,_0x24eb0b);
}
async function getInfoByUrl(_0xe6a01d,_0x1f2602,_0x3fb5c7){
	let _0x177f06={'url':'','ck':''};
	let _0x324a7d='';
	let _0x44ea95=await getInfo(_0xe6a01d,''+_0x1f2602,_0x3fb5c7);
	let _0xddff9a=_0x44ea95.resp['headers']['set-cookie']||_0x44ea95.resp['headers']['Set-Cookie']||'';
	let _0x1e52d6='';
	if(_0xddff9a){
		if(typeof _0xddff9a!='object'){
			_0x1e52d6=_0xddff9a.split(',');
		}else{
			_0x1e52d6=_0xddff9a;
		}
		for(let _0x1f2602 of _0x1e52d6){
			let _0x244585=_0x1f2602.split(';')[0]['trim']();
			if(_0x244585.split('=')[1]){
				if(_0x324a7d.indexOf(_0x244585.split('=')[1])===-1)_0x324a7d+=_0x244585.replace(/ /g,'')+'; ';
			}
		}
	}
	let _0x4852d2=_0x44ea95.data['match'](/(https:\/\/u\.jd\.com\/jda[^']+)/)&&_0x44ea95.data['match'](/(https:\/\/u\.jd\.com\/jda[^']+)/)[1]||'';
	if(!_0x4852d2){
		console.log('初始化1失败');
		return _0x177f06;
	}
	let _0x5afc59=await getInfo(_0xe6a01d,''+_0x324a7d+_0x1f2602,_0x4852d2,2);
	_0xddff9a=_0x5afc59.resp&&_0x5afc59.resp['headers']&&(_0x5afc59.resp['headers']['set-cookie']||_0x5afc59.resp['headers']['Set-Cookie']||'')||'';
	_0x1e52d6='';
	if(_0xddff9a){
		if(typeof _0xddff9a!='object'){
			_0x1e52d6=_0xddff9a.split(',');
		}else{
			_0x1e52d6=_0xddff9a;
		}
		for(let _0x1f2602 of _0x1e52d6){
			let _0x244585=_0x1f2602.split(';')[0]['trim']();
			if(_0x244585.split('=')[1]){
				if(_0x324a7d.indexOf(_0x244585.split('=')[1])===-1)_0x324a7d+=_0x244585.replace(/ /g,'')+'; ';
			}
		}
	}
	let _0x479387=_0x5afc59.resp&&_0x5afc59.resp['headers']&&(_0x5afc59.resp['headers']['location']||_0x5afc59.resp['headers']['Location']||'')||'';
	_0x479387=decodeURIComponent(_0x479387);
	if(!_0x479387){
		console.log('初始化2失败');
		return _0x177f06;
	}
	_0x177f06.url=_0x479387;
	_0x177f06.ck=''+_0x324a7d+_0x1f2602;
	return _0x177f06;
}
async function getInfo(_0x2f2484,_0x2d9f87,_0x21185a,_0x139a30=1){
	let _0x5f0635=_0x21185a;
	if(_0x139a30===1){
		if(_0x21185a.indexOf('https://u.jd.com')!==-1){
			_0x5f0635=_0x21185a;
		}else{
			_0x5f0635='https://u.jd.com/'+_0x21185a;
		}
	}
	return new Promise(_0x20d1f5=>{
		const _0x3298b9={'url':_0x5f0635,'followRedirect':false,'headers':{'Cookie':_0x2d9f87,'user-agent':'JD4iPhone/10.2.4 CFNetwork/1240.0.4 Darwin/20.5.0'}};
		_0x2f2484.get(_0x3298b9,async(_0x190fd5,_0x2a88ea,_0x389c6b)=>{
			try{
				_0x20d1f5({'resp':_0x2a88ea,'data':_0x389c6b});
			}catch(_0xa34e59){
				_0x2f2484.logErr(_0xa34e59,_0x2a88ea);
			}finally{
				_0x20d1f5();
			}
		});
	});
}
async function takeRequest(_0x55d52c,_0x3d860e,_0x43f906,_0x319e12,_0x46066e){
	let _0x3ba624={'platform':2,'unionActId':'31155','actId':_0x319e12,'d':_0x46066e,'unionShareId':'','type':1,'eid':'-1'};
	let _0x1df49b='https://api.m.jd.com/api?functionId=getCoupons&appid=u&_='+Date.now()+'&loginType=2&body='+encodeURIComponent(JSON.stringify(_0x3ba624))+'&client=iPhone&clientVersion=&osVersion=iOS&screen=414*736&d_brand=iPhone&d_model=iPhone&lang=zh-cn&sdkVersion=&openudid=';
	let _0x99b855=await getH5st($,_0x3d860e,_0x1df49b,'6a98d',_0x55d52c);
	_0x1df49b+='&h5st='+_0x99b855;
	const _0x89bed6={'Accept':'*/*','Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Cookie':_0x3d860e,'user-agent':_0x55d52c,'referer':'https://prodev.m.jd.com/mall/active/2GdKXzvywVytLvcJTk2K3pLtDEHq/index.html'};
	let _0x2a8625={'url':_0x1df49b,'headers':_0x89bed6};
	return new Promise(async _0x53e9d6=>{
		$.get(_0x2a8625,(_0x3fb2e8,_0x345f08,_0x312761)=>{
			try{
				if(_0x3fb2e8){
					console.log(''+$.toStr(_0x3fb2e8));
					console.log(_0x43f906+' API请求失败，请检查网路重试');
				}else{
					let _0x2c6b82=$.toObj(_0x312761,_0x312761);
					if(typeof _0x2c6b82=='object'){
						if(_0x2c6b82.code==0&&_0x2c6b82.data&&_0x2c6b82.data['couponList']){
							let _0x75352c=_0x2c6b82.data['couponList'];
							for(let _0x11fbfd=0;_0x11fbfd<_0x75352c.length;_0x11fbfd++){
								let _0x251371=_0x75352c[_0x11fbfd];
								if(_0x251371.type==1){
									console.log(_0x43f906+',获得红包：'+_0x251371.discount+'元');
								}else if(_0x251371.type==3){
									console.log(_0x43f906+',获得优惠券：️满'+_0x251371.quota+'减'+_0x251371.discount);
								}else if(_0x251371.type==6){
									console.log(_0x43f906+',获得打折券：满'+_0x251371.quota+'打'+_0x251371.discount*10+'折');
								}else{
									console.log(_0x43f906+',获得未知'+(_0x251371.quota||'')+' '+_0x251371.discount);
								}
							}
						}else{
							console.log(_0x43f906+','+_0x2c6b82.msg);
						}
					}else{
						console.log(_0x312761);
					}
				}
			}catch(_0x233bde){
				$.logErr(_0x233bde,_0x345f08);
			}finally{
				_0x53e9d6(_0x312761);
			}
		});
	});
}
async function getHtml(_0x2ec0e5,_0x589598,_0x301c09){
	let _0x225c4a={'url':_0x589598,'headers':{'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8','Cookie':_0x301c09,'User-Agent':_0x2ec0e5,'Accept-Language':'zh-cn','Accept-Encoding':'gzip, deflate, br','Connection':'keep-alive'}};
	return new Promise(_0x50158f=>{
		$.get(_0x225c4a,(_0x2b2b68,_0x1d82fa,_0x296a10)=>{
			try{}catch(_0x150411){
				$.logErr(_0x150411,_0x1d82fa);
			}finally{
				_0x50158f(_0x296a10);
			}
		});
	});
}
function getRandomArrayElements(_0x5de720,_0x4c5c03){
	var _0x137277=_0x5de720.slice(0),_0x31cd13=_0x5de720.length,_0x51e444=_0x31cd13-_0x4c5c03,_0x1ad881,_0x7e10c9;
	while(_0x31cd13-->_0x51e444){
		_0x7e10c9=Math.floor((_0x31cd13+1)*Math.random());
		_0x1ad881=_0x137277[_0x7e10c9];
		_0x137277[_0x7e10c9]=_0x137277[_0x31cd13];
		_0x137277[_0x31cd13]=_0x1ad881;
	}
	return _0x137277.slice(_0x51e444);
}
function getUA(){
	$.UUID=randomString(40);
	const _0x3ccd32={'167814':'10.1.4','167841':'10.1.6'};
	$.osVersion=randomNum(12,14)+'.'+randomNum(0,6);
	let _0x534f3a='network/'+['4g','5g','wifi'][randomNum(0,2)];
	$.mobile='iPhone'+randomNum(9,13)+','+randomNum(1,3);
	$.bnouild=['167814','167841','167894'][randomNum(0,1)];
	$.appVersion=_0x3ccd32[$.build];
	return 'jdapp;iPhone;'+$.appVersion+';'+$.osVersion+';'+$.UUID+';'+_0x534f3a+';model/'+$.mobile+';addressid/'+randomNum(1000000000)+';appBuild/'+$.build+';jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS '+$.osVersion['replace'](/\./g,'_')+' like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1';
}
function randomString(_0x73145e,_0x14bb81=0){
	var _0x2887a4='',_0x11b09f=_0x73145e,_0x567b24=[...Array(35)['keys']()]['map'](_0x3a4717=>_0x3a4717.toString(36));
	if(_0x14bb81){
		_0x11b09f=Math.floor(Math.random()*(_0x14bb81-_0x73145e+1)+_0x73145e);
	}
	for(let _0x1cc90b=0;_0x1cc90b<_0x11b09f;){
		let _0x375031=Math.random()['toString'](16)['substring'](2);
		if(_0x11b09f-_0x1cc90b>_0x375031.length){
			_0x2887a4+=_0x375031;
			_0x1cc90b+=_0x375031.length;
		}else{
			_0x2887a4+=_0x375031.slice(_0x1cc90b-_0x11b09f);
			_0x1cc90b+=_0x375031.length;
		}
	}
	return _0x2887a4;
}
function randomNum(_0x268b48,_0x5edfff){
	if(arguments.length===0)return Math.random();
	if(!_0x5edfff)_0x5edfff=10**(Math.log(_0x268b48)*Math.LOG10E+0x1|0x0)-1;
	return Math.floor(Math.random()*(_0x5edfff-_0x268b48+1)+_0x268b48);
}
async function getH5st(_0x15190a,_0x19efda,_0x40dec3,_0x4904a4,_0x4190d4=''){
	_0x15190a.appId=_0x4904a4;
	if(!_0x4904a4){
		throw new Error('appId不能是空');
	}
	if(_0x15190a.UA){
		_0x15190a.ua=_0x15190a.UA;
	}else{
		_0x15190a.ua=_0x4190d4;
	}
	if(!_0x15190a.ua){
		throw new Error('$.ua不能是空');
	}
	if(!_0x15190a.url){
		throw new Error('$.url不能是空(活动referer)');
	}
	if(!_0x15190a.origin){
		throw new Error('$.origin不能是空');
	}
	let _0x1dd524=decodeURIComponent(_0x19efda.match(/pt_pin=(.+?);/)&&_0x19efda.match(/pt_pin=(.+?);/)[1]);
	if(!_0x15190a.h5stInfo){
		_0x15190a.h5stInfo={};
	}
	let _0x3edf58=_0x4904a4;
	if(!_0x15190a.h5stInfo[_0x3edf58]){
		_0x15190a.fingerprint=getFp();
		await requestAlgo(_0x15190a,_0x4904a4,_0x15190a.fingerprint);
		_0x15190a.h5stInfo[_0x3edf58]={'fingerprint':_0x15190a.fingerprint,'token':_0x15190a.h5token,'enCryptMethodJD':_0x15190a.enCryptMethodJD};
	}else{
		_0x15190a.fingerprint=_0x15190a.h5stInfo[_0x3edf58]['fingerprint'];
		_0x15190a.h5token=_0x15190a.h5stInfo[_0x3edf58]['token'];
		_0x15190a.enCryptMethodJD=_0x15190a.h5stInfo[_0x3edf58]['enCryptMethodJD'];
	}
	let _0x532662=getUrlData(_0x40dec3,'body');
	if(_0x532662){
		const _0x32165b=CryptoJS.SHA256(_0x532662)['toString'](CryptoJS.enc['Hex']);
		_0x40dec3=replaceParamVal(_0x40dec3,'body',_0x32165b);
	}
	const _0x343afd=_0x15190a.stk||(_0x40dec3?getUrlData(_0x40dec3,'_stk'):'');
	if(!_0x343afd){
		throw new Error('找不到stk');
	}
	const _0x55dfd0=getUrlData(_0x40dec3,'t')?getUrlData(_0x40dec3,'t'):Date.now();
	if(!_0x55dfd0){
		throw new Error('t');
	}
	const _0x40b819=timeString('yyyyMMddhhmmssSSS',new Date(Number(_0x55dfd0)));
	let _0x150e6e=_0x15190a.enCryptMethodJD(_0x15190a.h5token,_0x15190a.fingerprint['toString'](),_0x40b819.toString(),_0x15190a.appId['toString'](),CryptoJS)['toString'](CryptoJS.enc['Hex']);
	let _0x22d54c='';
	_0x343afd.split(',')['map']((_0x534b2b,_0xcdca4e)=>{
		_0x22d54c+=_0x534b2b+':'+getUrlData(_0x40dec3,_0x534b2b)+(_0xcdca4e===_0x343afd.split(',')['length']-1?'':'&');
	});
	const _0x194463=CryptoJS.HmacSHA256(_0x22d54c,_0x150e6e.toString())['toString'](CryptoJS.enc['Hex']);
	const _0x16871d={'sua':'','pp':{'p1':_0x1dd524},'fp':_0x15190a.fingerprint['toString']()};
	const _0x15164d=encrypt(_0x16871d,'wm0!@w_s#ll1flo(');
	let _0x3d4a39=[''['concat'](_0x40b819.toString()),''['concat'](_0x15190a.fingerprint['toString']()),''['concat'](_0x15190a.appId['toString']()),''['concat'](_0x15190a.h5token),''['concat'](_0x194463),''['concat']('3.1'),''['concat'](_0x55dfd0),''['concat'](_0x15164d)]['join'](';');
	return encodeURIComponent(_0x3d4a39);
}
function getFp(){
	const _0x51dee4='0123456789',_0x5245da=3,_0x111fa8=Math.random()*0xa|0x0;
	let _0x10f962='',_0x13e996='';
	!((_0x153a9c,_0x51dee4)=>{
		let _0x53cab6=_0x51dee4.split(''),_0x377982=[];
		for(let _0x37bced=0;_0x37bced<_0x153a9c;_0x37bced++){
			let _0x111fa8=Math.random()*(_0x53cab6.length-1)|0x0;
			_0x377982.push(_0x53cab6[_0x111fa8]);
			_0x53cab6.splice(_0x111fa8,1);
		}
		_0x10f962=_0x377982.join(''),_0x13e996=_0x53cab6.join('');
	})(_0x5245da,_0x51dee4);
	return((_0x5d2354,_0x1a2a1a)=>{
		let _0x1b01e2=_0x5d2354,_0x3d4bce=14-(_0x5d2354+_0x5245da)+1,_0x373af6='';
		while(_0x1b01e2--)_0x373af6+=_0x1a2a1a[Math.random()*_0x1a2a1a.length|0x0];
		_0x373af6+=_0x10f962;
		while(_0x3d4bce--)_0x373af6+=_0x1a2a1a[Math.random()*_0x1a2a1a.length|0x0];
		_0x373af6+=_0x5d2354;
		let _0x10d038=_0x373af6.split('');
		let _0x217ac4=[];
		while(_0x10d038.length>0)_0x217ac4.push(9-parseInt(_0x10d038.pop()));
		_0x10d038=_0x217ac4.join('');
		return _0x10d038;
	})(_0x111fa8,_0x13e996);
}
async function requestAlgo(_0xe13794,_0x4e0dd9,_0x3d3aad){
	const _0x33f87c={'wc':0,'wd':0,'l':'zh-cn','ls':'zh-cn','ml':0,'pl':0,'av':'','ua':_0xe13794.ua,'sua':'','pp':{'p1':''},'pp1':'','w':414,'h':736,'ow':414,'oh':672,'url':_0xe13794.url,'og':_0xe13794.origin,'pr':3,'re':'','ai':_0x4e0dd9,'fp':_0x3d3aad.toString()};
	let _0x5aa6f1=encrypt(_0x33f87c,'wm0!@w-s#ll1flo(');
	let _0x4b3997=JSON.stringify({'version':'3.1','fp':_0x3d3aad,'appId':_0x4e0dd9,'timestamp':Date.now(),'platform':'web','expandParams':_0x5aa6f1});
	const _0x1aea7a={'url':'https://cactus.jd.com/request_algo?g_ty=ajax','body':_0x4b3997,'headers':{'Authority':'cactus.jd.com','Accept':'application/json','Content-Type':'application/json','Origin':_0xe13794.origin,'Content-Length':_0x4b3997.length,'Accept-Language':'zh-cn','User-Agent':_0xe13794.ua,'Referer':_0xe13794.url,'accept-encoding':'gzip, deflate, br'}};
	return new Promise(async _0x4313bb=>{
		_0xe13794.post(_0x1aea7a,(_0x12b393,_0x4b7c00,_0x14a661)=>{
			try{
				if(_0x12b393){
					console.log(''+JSON.stringify(_0x12b393));
					console.log('request_algo 签名参数API请求失败，请检查网路重试');
				}else{
					if(_0x14a661){
						_0x14a661=JSON.parse(_0x14a661);
						if(_0x14a661.status===200){
							_0xe13794.h5token=_0x14a661.data['result']['tk'];
							let _0x52c333=_0x14a661.data['result']['algo'];
							if(_0x52c333)_0xe13794.enCryptMethodJD=new Function('return '+_0x52c333)();
						}else{
							console.log('request_algo 签名参数API请求失败:');
						}
					}else{
						console.log('京东服务器返回空数据');
					}
				}
			}catch(_0x509e27){
				_0xe13794.logErr(_0x509e27,_0x4b7c00);
			}finally{
				_0x4313bb();
			}
		});
	});
}
function encrypt(_0x2bc14e={},_0x4b9db3){
	if(typeof _0x2bc14e==='object'){
		try{
			_0x2bc14e=JSON.stringify(_0x2bc14e,null,2);
		}catch(_0x233f6f){
			console.log('encrypt error:',_0x233f6f);
		}
	}
	const _0x197577=CryptoJS.enc['Utf8']['parse'](_0x4b9db3);
	const _0x1b6f87=CryptoJS.enc['Utf8']['parse']('0102030405060708');
	const _0x201790=CryptoJS.enc['Utf8']['parse'](_0x2bc14e);
	const _0x3d0d1e=CryptoJS.AES['encrypt'](_0x201790,_0x197577,{'iv':_0x1b6f87,'mode':CryptoJS.mode['CBC'],'padding':CryptoJS.pad['Pkcs7']});
	return _0x3d0d1e.ciphertext['toString']();
}
function getUrlData(_0x3f4fa9,_0x5ea925){
	if(typeof URL!=='undefined'){
		let _0x52ec05=new URL(_0x3f4fa9);
		let _0xb5a8f8=_0x52ec05.searchParams['get'](_0x5ea925);
		return _0xb5a8f8?_0xb5a8f8:'';
	}else{
		const _0x1a798c=_0x3f4fa9.match(/\?.*/)[0]['substring'](1);
		const _0x24fb20=_0x1a798c.split('&');
		for(let _0x27e23c=0;_0x27e23c<_0x24fb20.length;_0x27e23c++){
			const _0x3afbbf=_0x24fb20[_0x27e23c]['split']('=');
			if(_0x3afbbf[0]===_0x5ea925){
				return _0x24fb20[_0x27e23c]['substr'](_0x24fb20[_0x27e23c]['indexOf']('=')+1);
			}
		}
		return'';
	}
}
function replaceParamVal(_0x5294c0,_0x45b99b,_0x4fe574){
	var _0x2684b5=eval('/('+_0x45b99b+'=)([^&]*)/gi');
	var _0x5a7753=_0x5294c0.replace(_0x2684b5,_0x45b99b+'='+_0x4fe574);
	return _0x5a7753;
}
function timeString(_0x1aa78c,_0x41fc0c){
	var _0x24decb=_0x1aa78c,_0x110c73={'M+':_0x41fc0c.getMonth()+1,'d+':_0x41fc0c.getDate(),'D+':_0x41fc0c.getDate(),'h+':_0x41fc0c.getHours(),'H+':_0x41fc0c.getHours(),'m+':_0x41fc0c.getMinutes(),'s+':_0x41fc0c.getSeconds(),'w+':_0x41fc0c.getDay(),'q+':Math.floor((_0x41fc0c.getMonth()+3)/3),'S+':_0x41fc0c.getMilliseconds()};
	/(y+)/i.test(_0x24decb)&&(_0x24decb=_0x24decb.replace(RegExp.$1,''['concat'](_0x41fc0c.getFullYear())['substr'](4-RegExp.$1['length'])));
	for(var _0xcdf76f in _0x110c73){
		if(new RegExp('('['concat'](_0xcdf76f,')'))['test'](_0x24decb)){
			var _0x43527e,_0x5bdb21='S+'===_0xcdf76f?'000':'00';
			_0x24decb=_0x24decb.replace(RegExp.$1,1==RegExp.$1['length']?_0x110c73[_0xcdf76f]:(''['concat'](_0x5bdb21)+_0x110c73[_0xcdf76f])['substr'](''['concat'](_0x110c73[_0xcdf76f])['length']));
		}
	}
	return _0x24decb;
};
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
