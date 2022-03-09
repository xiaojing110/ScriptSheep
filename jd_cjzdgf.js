/*
活动地址为：https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=xxxxx
一共有2个变量
jd_cjhy_activityId  活动ID 必需
jd_cjhy_activityUrl 活动地址 必需

cron:10 10 10 10 *
============Quantumultx===============
[task_local]
#CJ组队瓜分京豆
10 10 10 10 * jd_cjzdgf.js, tag=CJ组队瓜分京豆, enabled=false

*/

// let jd_cjhy_activityId="2584bc5fb137415c87cedbb2e56bda3c" // 活动ID
// let jd_cjhy_activityUrl="https://cjhydz-isv.isvjcloud.com" // 活动地址

const notify = $.isNode() ? require('./sendNotify') : '';
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [],
	cookie = '',
	message = '',
	messageTitle = '';
activityId = $.getdata('jd_kr_cjhy_activityId') ? $.getdata('jd_kr_cjhy_activityId') : jd_cjhy_activityId;
activityUrl = $.getdata('jd_kr_cjhy_activityUrl') ? $.getdata('jd_kr_cjhy_activityUrl') : jd_cjhy_activityUrl;
let activityCookie = '';
if ($.isNode()) {
	if (process.env.jd_cjhy_activityId) activityId = process.env.jd_cjhy_activityId;
	if (process.env.jd_cjhy_activityUrl) activityUrl = process.env.jd_cjhy_activityUrl;
	if (JSON.stringify(process.env)
		.indexOf('GITHUB') > -1) process.exit(0);
	Object.keys(jdCookieNode)
		.forEach(_0x513741 => {
			cookiesArr.push(jdCookieNode[_0x513741]);
		});
	if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
	cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...$.toObj($.getdata('CookiesJD') || '[]')
		.map(_0x5be7e0 => _0x5be7e0.cookie)
	].filter(_0x285009 => !!_0x285009);
}
const JD_API_HOST = 'https://api.m.jd.com/client.action';
let isGetCookie = typeof $request !== 'undefined';
if (isGetCookie) {
	GetCookie();
	$.done();
}!(async () => {
	console.log('\n【如果显示：奖品与您擦肩而过了哟，恭喜你 此脚本不用跑了！ 】\n【如果显示：Response code 493 ，恭喜你 此容器 IP 黑了！ 】\n');
	if (!activityId) {
		$.msg($.name, '', '活动id不存在');
		$.done();
		return;
	}
	if (!cookiesArr[0]) {
		$.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/', {
			'open-url': 'https://bean.m.jd.com/'
		});
		return;
	}
	$.memberCount = 0;
	messageTitle += '活动id:\n' + activityId + '\n';
	$.toactivity = [];
	for (let _0x133ac2 = 0; _0x133ac2 < cookiesArr.length; _0x133ac2++) {
		if (cookiesArr[_0x133ac2]) {
			cookie = cookiesArr[_0x133ac2];
			$.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
			$.index = _0x133ac2 + 1;
			$.isLogin = true;
			$.nickName = '';
			console.log('\n******开始【京东账号' + $.index + '】' + ($.nickName || $.UserName) + '*********\n');
			if (!$.isLogin) {
				$.msg($.name, '【提示】cookie已失效', '京东账号' + $.index + ' ' + ($.nickName || $.UserName) + '\n请重新登录获取\nhttps://bean.m.jd.com/', {
					'open-url': 'https://bean.m.jd.com/'
				});
				if ($.isNode()) {
					await notify.sendNotify($.name + 'cookie已失效 - ' + $.UserName, '京东账号' + $.index + ' ' + $.UserName + '\n请重新登录获取cookie');
				}
				continue;
			}
			await jrzd();
			if (!$.toactivity || $.maxTeam) {
				break;
			}
		}
	}
	messageTitle += '队伍人数 ' + $.memberCount + '\n';
	await showMsg();
})()
.catch(_0x4e25ff => {
		$.log('', ' ' + $.name + ', 失败! 原因: ' + _0x4e25ff + '!', '');
	})
	.finally(() => {
		$.done();
	});
async function jrzd() {
	getUA();
	$.sid = '';
	$.userId = '691399';
	$.Token = '';
	$.Pin = '';
	$.hisPin = '';
	$.card = [];
	$.saveTeam = false;
	await getCk();
	await getToken();
	if ($.Token == '') {
		console.log('获取[token]失败！');
		return;
	}
	$.AUTH_C_USER = 'F4eV+FtcEdTNOCLwmRgOEtA1Drq3za4lh6LFLfledF1cdSiqMbCx5edEEaL3RnCSkdK3rLBQpEQH9V4tdrrh0w==';
	await getSimpleActInfoVo();
	await getshopInfo();
	await $.wait(1000);
	if ($.sid && $.userId) {
		await getToken();
		if ($.Token) await getPin();
		console.log('pin:' + $.Pin);
		await $.wait(1000);
		await accessLog();
		await $.wait(1000);
		await getUserInfo();
		await $.wait(1000);
		await getTeam();
		await $.wait(1000);
		if ($.maxTeam) {
			console.log('队伍已满员');
			return;
		}
	} else {
		console.log('【京东账号' + $.index + '】 未能获取活动信息');
		message += '【京东账号' + $.index + '】 未能获取活动信息\n';
	}
}

function token() {
	return new Promise(_0xfb2c5e => {
		let _0x9de708 = {
			'url': 'https://cjhydz-isv.isvjcloud.com/wxCommonInfo/getSystemConfig',
			'headers': {
				'Cookie': activityCookie + ' ' + cookie,
				'Referer': 'https://cjhydz-isv.isvjcloud.com/wxTeam/activity?activityId=' + $.activityId + '&shareUuid=' + $.shareUuid,
				'User-Agent': $['UA']
			}
		};
		$.get(_0x9de708, async (_0x1ddd9e, _0x3c3c45, _0x570f5a) => {
			try {
				if (_0x1ddd9e) {
					console.log('' + $.toStr(_0x1ddd9e));
					console.log($.name + ' cookie API请求失败，请检查网路重试');
				} else {
					let _0x26e76a = '';
					let _0x120d21 = '';
					let _0x15d895 = _0x3c3c45.headers['set-cookie'] || _0x3c3c45.headers['Set-Cookie'] || '';
					let _0x52de31 = '';
					if (_0x15d895) {
						if (typeof _0x15d895 != 'object') {
							_0x52de31 = _0x15d895.split(',');
						} else _0x52de31 = _0x15d895;
						for (let _0x31bee3 of _0x52de31) {
							let _0x2b0b45 = _0x31bee3.split(';')[0].trim();
							if (_0x2b0b45.split('=')[1]) {
								if (_0x2b0b45.indexOf('LZ_TOKEN_KEY=') > -1) _0x26e76a = _0x2b0b45.replace(/ /g, '') + ';';
								if (_0x2b0b45.indexOf('LZ_TOKEN_VALUE=') > -1) _0x120d21 = _0x2b0b45.replace(/ /g, '') + ';';
							}
						}
					}
					if (_0x26e76a && _0x120d21) activityCookie = _0x26e76a + ' ' + _0x120d21;
				}
			} catch (_0x446f49) {
				$.logErr(_0x446f49, _0x3c3c45);
			} finally {
				_0xfb2c5e();
			}
		});
	});
}

function getUA() {
	$['UA'] = 'jdapp;iPhone;10.3.0;;;M/5.0;appBuild/167903;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22ZWY5YtTvYwVsCzY4DWYnY2VtDNU0ZtVwCNU2EQTtZtY1DtTuDtu4Dm%3D%3D%22%2C%22sv%22%3A%22CJGkEK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1645068549%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;';
}

function showMsg() {
	return new Promise(_0x110eb5 => {
		$.msg($.name, '', '\n' + message);
		_0x110eb5();
	});
}

function getSimpleActInfoVo() {
	return new Promise(_0x2e3214 => {
		let _0x44d6ae = 'activityId=' + activityId;
		$.post(taskPostUrl('/customer/getSimpleActInfoVo', _0x44d6ae), async (_0x5f3d67, _0x1e8f79, _0x1c7fae) => {
			try {
				if (_0x5f3d67) {
					console.log('' + $.toStr(_0x5f3d67));
					console.log($.name + ' getSimpleActInfoVo API请求失败，请检查网路重试');
				} else {
					if (_0x1e8f79.status == 200) {
						refreshToken(_0x1e8f79);
					}
				}
			} catch (_0x403beb) {
				$.logErr(_0x403beb, _0x1e8f79);
			} finally {
				_0x2e3214();
			}
		});
	});
}

function randomString(_0x351484) {
	_0x351484 = _0x351484 || 32;
	let _0x202c60 = 'abcdef0123456789',
		_0x54ac18 = _0x202c60.length,
		_0x5d9a4f = '';
	for (i = 0; i < _0x351484; i++) _0x5d9a4f += _0x202c60.charAt(Math.floor(Math.random() * _0x54ac18));
	return _0x5d9a4f;
}

function getCk() {
	return new Promise(_0x366608 => {
		let _0x1d82bf = {
			'url': activityUrl + '/wxTeam/activity?activityId=' + activityId,
			'headers': {
				'Cookie': cookie,
				'User-Agent': $['UA']
			}
		};
		$.get(_0x1d82bf, async (_0x2dd02b, _0xebd70c, _0x3b9fdf) => {
			try {
				if (_0x2dd02b) {
					console.log('' + JSON.stringify(_0x2dd02b));
					console.log($.name + ' cookie API请求失败，请检查网路重试');
				} else {
					if (_0xebd70c.status == 200) {
						refreshToken(_0xebd70c);
					}
				}
			} catch (_0x43b948) {
				$.logErr(_0x43b948, _0xebd70c);
			} finally {
				_0x366608();
			}
		});
	});
}

function getToken() {
	return new Promise(_0x1eadd2 => {
		let _0x4d30d6 = 'adid=7B411CD9-D62C-425B-B083-9AFC49B94228&area=16_1332_42932_43102&body=%7B%22url%22%3A%22https%3A%5C/%5C/cjhydz-isv.isvjcloud.com%22%2C%22id%22%3A%22%22%7D&build=167541&client=apple&clientVersion=9.4.0&d_brand=apple&d_model=iPhone8%2C1&eid=eidId10b812191seBCFGmtbeTX2vXF3lbgDAVwQhSA8wKqj6OA9J4foPQm3UzRwrrLdO23B3E2wCUY/bODH01VnxiEnAUvoM6SiEnmP3IPqRuO%2By/%2BZo&isBackground=N&joycious=48&lang=zh_CN&networkType=wifi&networklibtype=JDNetworkBaseAF&openudid=2f7578cb634065f9beae94d013f172e197d62283&osVersion=13.1.2&partner=apple&rfs=0000&scope=11&screen=750%2A1334&sign=60bde51b4b7f7ff6e1bc1f473ecf3d41&st=1613720203903&sv=110&uts=0f31TVRjBStG9NoZJdXLGd939Wv4AlsWNAeL1nxafUsZqiV4NLsVElz6AjC4L7tsnZ1loeT2A8Z5/KfI/YoJAUfJzTd8kCedfnLG522ydI0p40oi8hT2p2sNZiIIRYCfjIr7IAL%2BFkLsrWdSiPZP5QLptc8Cy4Od6/cdYidClR0NwPMd58K5J9narz78y9ocGe8uTfyBIoA9aCd/X3Muxw%3D%3D&uuid=hjudwgohxzVu96krv/T6Hg%3D%3D&wifiBssid=9cf90c586c4468e00678545b16176ed2';
		$.post(taskUrl('?functionId=isvObfuscator', _0x4d30d6), async (_0x14e1cb, _0x2f5027, _0x1a7df6) => {
			try {
				if (_0x14e1cb) {
					console.log('' + JSON.stringify(_0x14e1cb));
					console.log($.name + ' 2 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x1a7df6)) {
						_0x1a7df6 = JSON.parse(_0x1a7df6);
						if (_0x1a7df6.code == 0 && _0x1a7df6.token) {
							$.Token = _0x1a7df6.token;
						} else {
							console.log('异常2：' + JSON.stringify(_0x1a7df6));
						}
					}
				}
			} catch (_0x1bd054) {
				$.logErr(_0x1bd054, _0x2f5027);
			} finally {
				_0x1eadd2();
			}
		});
	});
}

function getPin() {
	return new Promise(_0x10159b => {
		let _0x22b315 = 'userId=' + $.userId + '&token=' + $.Token + '&fromType=APP&riskType=1';
		$.post(taskPostUrl('/customer/getMyPing', _0x22b315), async (_0x467dba, _0x36ab7d, _0xb014b0) => {
			try {
				if (_0x467dba) {
					console.log('' + JSON.stringify(_0x467dba));
					console.log($.name + ' 3 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0xb014b0)) {
						_0xb014b0 = JSON.parse(_0xb014b0);
						if (_0xb014b0.result && _0xb014b0.data) {
							$.Pin = _0xb014b0.data.secretPin;
						} else {
							console.log('异常3：' + JSON.stringify(_0xb014b0));
						}
					}
				}
			} catch (_0x33d60a) {
				$.logErr(_0x33d60a, _0x36ab7d);
			} finally {
				_0x10159b();
			}
		});
	});
}

function getshopInfo() {
	return new Promise(_0x1ffe20 => {
		$.post(taskPostUrl('/wxTeam/shopInfo', 'activityId=' + activityId), async (_0x2e3326, _0x44eec1, _0x180400) => {
			try {
				if (_0x2e3326) {
					console.log('' + JSON.stringify(_0x2e3326));
					console.log($.name + ' 1 API请求失败，请检查网路重试');
				} else {
					if (_0x180400 && safeGet(_0x180400)) {
						_0x180400 = JSON.parse(_0x180400);
						if (_0x180400.data) {
							$.sid = _0x180400.data.sid;
							$.userId = _0x180400.data.userId;
							$.shopName = _0x180400.data.shopName;
						} else {
							console.log('异常1：' + JSON.stringify(_0x180400));
						}
					}
				}
			} catch (_0x22de7f) {
				$.logErr(_0x22de7f, _0x44eec1);
			} finally {
				_0x1ffe20();
			}
		});
	});
}

function joinShop() {
	return new Promise(_0x12ec18 => {
		let _0x205e01 = 'venderId=' + $.userId + '&buyerPin=' + encodeURIComponent($.Pin);
		$.post(taskPostUrl('/mc/new/brandCard/common/shopAndBrand/getOpenCardInfo', _0x205e01), async (_0x16272d, _0x3e6338, _0x3d0cb7) => {
			try {
				if (_0x16272d) {
					console.log('' + JSON.stringify(_0x16272d));
					console.log($.name + 'API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x3d0cb7)) {
						_0x3d0cb7 = JSON.parse(_0x3d0cb7);
						if (_0x3d0cb7.result && _0x3d0cb7.data) {
							if (_0x3d0cb7.data.openCardLink) {
								let _0x4a5fb9 = _0x3d0cb7.data.openCardLink.match(/channel=(\d+)/);
								const _0x205e01 = {
									'venderId': $.userId,
									'shopId': $.sid,
									'bindByVerifyCodeFlag': 1,
									'registerExtend': {},
									'writeChildFlag': 0,
									'channel': _0x4a5fb9[1]
								};
								let _0x31c727 = 'https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=' + encodeURIComponent(JSON.stringify(_0x205e01)) + '&client=H5&clientVersion=9.2.0&uuid=88888&jsonp=jsonp_1613718333317_54489';
								let _0x5846d1 = '' + _0x3d0cb7.data.openCardLink;
								await jiaru(_0x31c727, _0x5846d1);
							}
						} else {
							console.log('异常4：' + JSON.stringify(_0x3d0cb7));
						}
					}
				}
			} catch (_0x13131c) {
				$.logErr(_0x13131c, _0x3e6338);
			} finally {
				_0x12ec18();
			}
		});
	});
}

function jiaru(_0x4a560c, _0x27d7b9) {
	return new Promise(_0x308896 => {
		let _0xd77753 = {
			'url': _0x4a560c,
			'headers': {
				'Accept': '*/*',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'zh-cn',
				'Connection': 'keep-alive',
				'Host': 'api.m.jd.com',
				'Referer': _0x27d7b9,
				'Cookie': cookie,
				'User-Agent': $['UA']
			}
		};
		$.get(_0xd77753, async (_0x402a01, _0x2f05bc, _0x3e3617) => {
			try {
				if (_0x402a01) {
					console.log('' + JSON.stringify(_0x402a01));
					console.log($.name + ' 入会 API请求失败，请检查网路重试');
				} else {
					$.log(_0x3e3617);
				}
			} catch (_0x251417) {
				$.logErr(_0x251417, _0x2f05bc);
			} finally {
				_0x308896();
			}
		});
	});
}

function getUserInfo() {
	return new Promise(_0x108e5b => {
		let _0x2d0f4b = 'pin=' + encodeURIComponent($.Pin);
		$.post(taskPostUrl('/wxActionCommon/getUserInfo', _0x2d0f4b), async (_0x2ceb3e, _0x12f750, _0x17807e) => {
			try {
				if (_0x2ceb3e) {
					console.log('' + JSON.stringify(_0x2ceb3e));
					console.log($.name + ' 6-1 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x17807e)) {
						_0x17807e = JSON.parse(_0x17807e);
						if (_0x17807e.result && _0x17807e.data) {
							$.attrTouXiang = _0x17807e.data.yunMidImageUrl ? _0x17807e.data.yunMidImageUrl : 'https://img10.360buyimg.com/imgzone/jfs/t1/21383/2/6633/3879/5c5138d8E0967ccf2/91da57c5e2166005.jpg';
						} else {
							console.log('异常6-2：' + JSON.stringify(_0x17807e));
						}
					}
				}
			} catch (_0x15fae2) {
				$.logErr(_0x15fae2, _0x12f750);
			} finally {
				_0x108e5b();
			}
		});
	});
}

function getTeam() {
	return new Promise(_0x14f16b => {
		let _0x2aaaa6 = 'activityId=' + activityId + '&pin=' + encodeURIComponent(encodeURIComponent($.Pin));
		if ($.signUuid) _0x2aaaa6 += '&signUuid=' + $.signUuid;
		$.post(taskPostUrl('/wxTeam/activityContent', _0x2aaaa6), async (_0x1d40b8, _0x5d942d, _0x93f3c4) => {
			try {
				if (_0x1d40b8) {
					console.log('' + JSON.stringify(_0x1d40b8));
					console.log($.name + ' 5 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x93f3c4)) {
						_0x93f3c4 = JSON.parse(_0x93f3c4);
						if (_0x93f3c4.result && _0x93f3c4.data) {
							if (new Date(_0x93f3c4.data.active.endTimeStr.replace(/-/g, '/'))
								.getTime() < new Date()
								.getTime()) {
								$.toactivity = false;
								console.log('活动结束');
								messageTitle += '活动结束\n';
								message += '活动结束\n';
								_0x14f16b();
							} else {
								if (!_0x93f3c4.data.canCreate && _0x93f3c4.data.list == null) message += '人数已满\n';
								if (_0x93f3c4.data.share) {
									$.memberCount = parseInt(_0x93f3c4.data.share.memberCount, 10) + 1;
								} else {
									$.memberCount = 0;
								}
								if ($.index == 1) {
									$.saveTeam = true;
									$.teamNum = _0x93f3c4.data.active.actRule.match(/最多可以组建(\d+)个战队/);
									if ($.teamNum) {
										$.teamNum = $.teamNum[1];
										messageTitle += '最多可以组建' + $.teamNum + '个战队';
									}
								}
								if ($.signUuid) {
									$.log('加入队伍 id: ' + $.signUuid);
									await $.wait(1000);
									await joinTeam();
								}
								if ($.saveTeam) {
									if (_0x93f3c4.data.canCreate) {
										await $.wait(1000);
										await saveTeam();
									} else {
										$.signUuid = _0x93f3c4.data.signUuid;
										messageTitle += '队伍id: ' + $.signUuid + '\n';
										message += '【京东账号' + $.index + '】 创建队伍id: ' + $.signUuid;
										$.log('队伍id: ' + $.signUuid);
										$.wait(1000);
										$.log('加入队伍 id: ' + $.signUuid);
										await joinTeam();
									}
								}
							}
						} else {
							console.log('异常5：' + JSON.stringify(_0x93f3c4));
						}
					}
				}
			} catch (_0x53c698) {
				$.logErr(_0x53c698, _0x5d942d);
			} finally {
				_0x14f16b(_0x14f16b);
			}
		});
	});
}

function saveTeam(_0x5239da = 0) {
	return new Promise(_0x256b35 => {
		let _0x13e2ab = encodeURIComponent(encodeURIComponent($.Pin));
		if (_0x5239da == 1) _0x13e2ab = encodeURIComponent(encodeURIComponent($.Pin));
		let _0x2f667f = 'activityId=' + activityId + '&pin=' + _0x13e2ab + '&pinImg=' + encodeURIComponent(encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveCaptain', _0x2f667f), async (_0x2d1805, _0x2ef96f, _0x5de006) => {
			try {
				if (_0x2d1805) {
					console.log('' + JSON.stringify(_0x2d1805));
					console.log($.name + ' 6 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x5de006)) {
						_0x5de006 = JSON.parse(_0x5de006);
						if (_0x5de006.result && _0x5de006.data) {
							message += '【京东账号' + $.index + '】 创建队伍id: ' + _0x5de006.data.signUuid + ' ';
							console.log('创建队伍成功 id: ' + _0x5de006.data.signUuid);
							$.signUuid = _0x5de006.data.signUuid;
							messageTitle += '队伍id: ' + $.signUuid + ' ';
						} else {
							console.log('异常6：' + JSON.stringify(_0x5de006));
							if (_0x5de006.errorMessage.indexOf('不是店铺会员') > -1 && _0x5239da != 3) {
								await joinShop();
								await $.wait(1000);
								await saveTeam(3);
							} else if (_0x5de006.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x5239da == 0) {
								await $.wait(1000);
								await saveTeam(1);
							}
						}
					}
				}
			} catch (_0x5c00c8) {
				$.logErr(_0x5c00c8, _0x2ef96f);
			} finally {
				_0x256b35();
			}
		});
	});
}

function joinTeam(_0x55e58b = 0) {
	return new Promise(_0xc53c87 => {
		let _0x28bd76 = encodeURIComponent(encodeURIComponent($.Pin));
		if (_0x55e58b == 1) _0x28bd76 = encodeURIComponent(encodeURIComponent($.Pin));
		let _0x3a4a6e = 'activityId=' + activityId + '&signUuid=' + $.signUuid + '&pin=' + _0x28bd76 + '&pinImg=' + encodeURIComponent(encodeURIComponent($.attrTouXiang));
		$.post(taskPostUrl('/wxTeam/saveMember', _0x3a4a6e), async (_0x2b0d71, _0x1b77c2, _0x283bab) => {
			try {
				if (_0x2b0d71) {
					console.log('' + JSON.stringify(_0x2b0d71));
					console.log($.name + ' 7 API请求失败，请检查网路重试');
				} else {
					if (safeGet(_0x283bab)) {
						_0x283bab = JSON.parse(_0x283bab);
						if (_0x283bab.result && _0x283bab.data) {
							message += '【京东账号' + $.index + '】 加入队伍\n';
							$.log('加入队伍成功');
						} else {
							if (_0x283bab.errorMessage.indexOf('不是店铺会员') > -1 && _0x55e58b != 3) {
								await joinShop();
								await joinTeam(3);
							} else if (_0x283bab.errorMessage.indexOf('队伍已经满员') > -1) {
								$.maxTeam = true;
							} else if (_0x283bab.errorMessage.indexOf('奖品与您擦肩而过') > -1 && _0x55e58b == 0) {
								await joinTeam(1);
							} else {
								console.log('异常7：' + JSON.stringify(_0x283bab));
								message += '【京东账号' + $.index + '】 ' + _0x283bab.errorMessage + '\n';
							}
						}
					}
				}
			} catch (_0x28bd78) {
				$.logErr(_0x28bd78, _0x1b77c2);
			} finally {
				_0xc53c87();
			}
		});
	});
}

function getOpenCardAllStatuesNew() {
	return new Promise(_0x44d1d2 => {
		let _0x12e89d = {
			'url': 'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/getOpenCardAllStatuesNew',
			'headers': {
				'cookie': activityCookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.Pin,
				'Connection': 'keep-alive',
				'Accept-Encoding': 'gzip, deflate, br',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'User-Agent': $['UA'],
				'Accept-Language': 'zh-cn',
				'Referer': 'https://cjhydz-isv.isvjcloud.com/microDz/invite/activity/wx/view/index?activityId=' + activityId,
				'Accept': 'application/json, text/javascript, */*; q=0.01'
			},
			'body': 'isInvited=0&activityId=' + activityId + '&pin=' + encodeURIComponent(encodeURIComponent($.Pin))
		};
		$.post(_0x12e89d, async (_0x4d7bca, _0x34cec7, _0x25a95b) => {
			try {
				if (_0x4d7bca) {
					console.log('' + JSON.stringify(_0x4d7bca));
					console.log($.name + ' 1 API请求失败，请检查网路重试');
				} else {
					if (_0x25a95b && safeGet(_0x25a95b)) {
						_0x25a95b = JSON.parse(_0x25a95b);
						if (_0x25a95b.data && _0x25a95b.data.isCanJoin) {
							(_0x25a95b.data.list || [])
							.forEach(_0x9f2e0f => {
								if (_0x9f2e0f.openCardLink) {
									$.card.push(_0x9f2e0f.openCardLink);
								}
							});
						}
					}
				}
			} catch (_0x248887) {
				$.logErr(_0x248887, _0x34cec7);
			} finally {
				_0x44d1d2();
			}
		});
	});
}

function taskPostUrl(_0x44a3e1, _0xf5b08a) {
	return {
		'url': '' + activityUrl + _0x44a3e1,
		'body': _0xf5b08a,
		'headers': {
			'Accept': 'application/json',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'zh-cn',
			'Connection': 'keep-alive',
			'Host': 'cjhydz-isv.isvjcloud.com',
			'Origin': 'https://cjhydz-isv.isvjcloud.com',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': activityUrl + '/wxTeam/activity?activityId=' + activityId,
			'Cookie': cookie + activityCookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
			'User-Agent': $['UA']
		}
	};
}

function taskUrl(_0x1674f7, _0x3ede66) {
	return {
		'url': 'https://api.m.jd.com/client.action' + _0x1674f7,
		'body': _0x3ede66,
		'headers': {
			'Accept': '*/*',
			'Accept-Encoding': 'gzip, deflate, br',
			'Accept-Language': 'zh-cn',
			'Connection': 'keep-alive',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Host': 'api.m.jd.com',
			'Cookie': cookie,
			'User-Agent': $['UA']
		}
	};
}

function TotalBean() {
	return new Promise(async _0x24076a => {
		const _0x1222eb = {
			'url': 'https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2',
			'headers': {
				'Accept': 'application/json,text/plain, */*',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'zh-cn',
				'Connection': 'keep-alive',
				'Cookie': cookie,
				'Referer': 'https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2',
				'User-Agent': $['UA']
			}
		};
		$.post(_0x1222eb, (_0x2c2ad7, _0x5e1ac5, _0x3faaca) => {
			try {
				if (_0x2c2ad7) {
					console.log('' + JSON.stringify(_0x2c2ad7));
					console.log($.name + ' API请求失败，请检查网路重试');
				} else {
					if (_0x3faaca) {
						_0x3faaca = JSON.parse(_0x3faaca);
						if (_0x3faaca.retcode === 13) {
							$.isLogin = false;
							return;
						}
					} else {
						console.log('京东服务器返回空数据');
					}
				}
			} catch (_0xda122) {
				$.logErr(_0xda122, _0x5e1ac5);
			} finally {
				_0x24076a();
			}
		});
	});
}

function safeGet(_0x2b652c) {
	try {
		if (typeof JSON.parse(_0x2b652c) == 'object') {
			return true;
		}
	} catch (_0x3d61e8) {
		console.log(_0x3d61e8);
		console.log('京东服务器访问数据为空，请检查自身设备网络情况');
		return false;
	}
}

function accessLog() {
	return new Promise(async _0xa09041 => {
		const _0x589565 = {
			'url': 'https://cjhydz-isv.isvjcloud.com/common/accessLog',
			'headers': {
				'Accept': 'application/json',
				'Accept-Encoding': 'gzip, deflate, br',
				'Accept-Language': 'zh-cn',
				'Connection': 'keep-alive',
				'Host': 'cjhydz-isv.isvjcloud.com',
				'Origin': 'https://cjhydz-isv.isvjcloud.com',
				'Content-Type': 'application/x-www-form-urlencoded',
				'Referer': activityUrl + '/wxTeam/activity?activityId' + activityId,
				'Cookie': cookie + activityCookie + ';IsvToken=' + $.Token + ';AUTH_C_USER=' + $.AUTH_C_USER,
				'User-Agent': $['UA']
			},
			'body': 'venderId=691399&code=102&pin=' + encodeURIComponent(encodeURIComponent($.Pin)) + '&activityId=' + activityId + '&pageUrl=https%3A%2F%2Fcjhydz-isv.isvjcloud.com%2FmicroDz%2Finvite%2Factivity%2Fwx%2Fview%2Findex%3FactivityId%3D' + activityId + '&subType=app'
		};
		$.post(_0x589565, (_0x5d1077, _0x3d92dc, _0x2c25ab) => {
			try {
				if (_0x5d1077) {
					console.log('' + JSON.stringify(_0x5d1077));
					console.log($.name + ' API请求失败，请检查网路重试');
				} else {
					if (_0x3d92dc.status == 200) {
						refreshToken(_0x3d92dc);
					}
				}
			} catch (_0x4093a4) {
				$.logErr(_0x4093a4, _0x3d92dc);
			} finally {
				_0xa09041();
			}
		});
	});
}

function refreshToken(_0xa8b7c3) {
	let _0x31718f = _0xa8b7c3.headers['set-cookie'];
	if (_0x31718f) {
		activityCookie = _0x31718f.map(_0x33a43e => {
				return _0x33a43e.split(';')[0];
			})
			.join(';');
	}
}

function jsonParse(_0x4a6660) {
	if (typeof strv == 'string') {
		try {
			return JSON.parse(_0x4a6660);
		} catch (_0x225064) {
			console.log(_0x225064);
			$.msg($.name, '', '不要在BoxJS手动复制粘贴修改cookie');
			return [];
		}
	}
}

function GetCookie() {
	if ($request.url.indexOf('/wxTeam/shopInfo') > -1) {
		if ($request.body) {
			let _0xa00798 = $request.body.match(/activityId=([a-zA-Z0-9._-]+)/);
			if (_0xa00798) {
				let _0x8a7c27 = $request.url.split('/');
				console.log('activityId: ' + _0xa00798[1]);
				console.log('activityUrl: ' + _0x8a7c27[0] + '//' + _0x8a7c27[2]);
				$.setdata(_0xa00798[1], 'jd_kr_cjhy_activityId');
				$.setdata(_0x8a7c27[0] + '//' + _0x8a7c27[2], 'jd_kr_cjhy_activityUrl');
				$.msg($.name, '获取activityId: 成功', 'activityId:' + _0xa00798[1] + '\nactivityUrl:' + _0x8a7c27[0] + '//' + _0x8a7c27[2]);
			} else {
				$.msg($.name, '找不到activityId', '');
			}
		}
	}
};
// prettier-ignore
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
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `${this.name}, 开始!`)
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
                let t = ["", "==============系统通知=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `${this.name}, 错误!`, t.stack) : this.log("", `${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `${this.name}, 结束!  ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
