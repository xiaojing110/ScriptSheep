function qC(f, g) {
    var j = (f & 65535) + (g & 65535),
        k = (f >> 16) + (g >> 16) + (j >> 16);
    return k << 16 | j & 65535;
}

function qD(f, g) {
    return f << g | f >>> 32 - g;
}

function qE(e, f, g) {
    if (!f) {
        if (!g) {
            return qI(e);
        }

        return qJ(e);
    }

    if (!g) {
        return hexHMACMD5(f, e);
    }

    return rawHMACMD5(f, e);
}

function qF(f) {
    var j = '0123456789abcdef';
    var k = '',
        l;
    var m;

    for (m = 0; m < f.length; m += 1) {
        l = f.charCodeAt(m), k += j.charAt(l >>> 4 & 15) + j.charAt(l & 15);
    }

    return k;
}

function qG(e) {
    return unescape(encodeURIComponent(e));
}

function qH(e) {
    return qQ(qP(qR(e), e.length * 8));
}

function qI(e) {
    return qF(qJ(e));
}

function qJ(e) {
    return qH(qG(e));
}

function qK(e, f, g, h, i, j) {
    return qC(qD(qC(qC(f, e), qC(h, j)), i), g);
}

function qL(e, f, g, h, i, j, k) {
    return qK(f & g | ~f & h, e, f, i, j, k);
}

function qM(e, f, g, h, i, j, k) {
    return qK(f & h | g & ~h, e, f, i, j, k);
}

function qN(e, f, g, h, i, j, k) {
    return qK(f ^ g ^ h, e, f, i, j, k);
}

function qO(e, f, g, h, i, j, k) {
    return qK(g ^ (f | ~h), e, f, i, j, k);
}

function qP(e, f) {
    e[f >> 5] |= 128 << f % 32, e[(f + 64 >>> 9 << 4) + 14] = f;
    var h;
    var j, k, l, m;
    var n = 1732584193,
        o = -271733879,
        p = -1732584194;
    var q = 271733878;

    for (h = 0; h < e.length; h += 16) {
        j = n;
        k = o;
        l = p;
        m = q;
        n = qL(n, o, p, q, e[h], 7, -680876936);
        q = qL(q, n, o, p, e[h + 1], 12, -389564586);
        p = qL(p, q, n, o, e[h + 2], 17, 606105819);
        o = qL(o, p, q, n, e[h + 3], 22, -1044525330);
        n = qL(n, o, p, q, e[h + 4], 7, -176418897);
        q = qL(q, n, o, p, e[h + 5], 12, 1200080426);
        p = qL(p, q, n, o, e[h + 6], 17, -1473231341);
        o = qL(o, p, q, n, e[h + 7], 22, -45705983);
        n = qL(n, o, p, q, e[h + 8], 7, 1770035416);
        q = qL(q, n, o, p, e[h + 9], 12, -1958414417);
        p = qL(p, q, n, o, e[h + 10], 17, -42063);
        o = qL(o, p, q, n, e[h + 11], 22, -1990404162);
        n = qL(n, o, p, q, e[h + 12], 7, 1804603682);
        q = qL(q, n, o, p, e[h + 13], 12, -40341101);
        p = qL(p, q, n, o, e[h + 14], 17, -1502002290);
        o = qL(o, p, q, n, e[h + 15], 22, 1236535329);
        n = qM(n, o, p, q, e[h + 1], 5, -165796510);
        q = qM(q, n, o, p, e[h + 6], 9, -1069501632);
        p = qM(p, q, n, o, e[h + 11], 14, 643717713);
        o = qM(o, p, q, n, e[h], 20, -373897302);
        n = qM(n, o, p, q, e[h + 5], 5, -701558691);
        q = qM(q, n, o, p, e[h + 10], 9, 38016083);
        p = qM(p, q, n, o, e[h + 15], 14, -660478335);
        o = qM(o, p, q, n, e[h + 4], 20, -405537848);
        n = qM(n, o, p, q, e[h + 9], 5, 568446438);
        q = qM(q, n, o, p, e[h + 14], 9, -1019803690);
        p = qM(p, q, n, o, e[h + 3], 14, -187363961);
        o = qM(o, p, q, n, e[h + 8], 20, 1163531501);
        n = qM(n, o, p, q, e[h + 13], 5, -1444681467);
        q = qM(q, n, o, p, e[h + 2], 9, -51403784);
        p = qM(p, q, n, o, e[h + 7], 14, 1735328473);
        o = qM(o, p, q, n, e[h + 12], 20, -1926607734);
        n = qN(n, o, p, q, e[h + 5], 4, -378558);
        q = qN(q, n, o, p, e[h + 8], 11, -2022574463);
        p = qN(p, q, n, o, e[h + 11], 16, 1839030562);
        o = qN(o, p, q, n, e[h + 14], 23, -35309556);
        n = qN(n, o, p, q, e[h + 1], 4, -1530992060);
        q = qN(q, n, o, p, e[h + 4], 11, 1272893353);
        p = qN(p, q, n, o, e[h + 7], 16, -155497632);
        o = qN(o, p, q, n, e[h + 10], 23, -1094730640);
        n = qN(n, o, p, q, e[h + 13], 4, 681279174);
        q = qN(q, n, o, p, e[h], 11, -358537222);
        p = qN(p, q, n, o, e[h + 3], 16, -722521979);
        o = qN(o, p, q, n, e[h + 6], 23, 76029189);
        n = qN(n, o, p, q, e[h + 9], 4, -640364487);
        q = qN(q, n, o, p, e[h + 12], 11, -421815835);
        p = qN(p, q, n, o, e[h + 15], 16, 530742520);
        o = qN(o, p, q, n, e[h + 2], 23, -995338651);
        n = qO(n, o, p, q, e[h], 6, -198630844);
        q = qO(q, n, o, p, e[h + 7], 10, 1126891415);
        p = qO(p, q, n, o, e[h + 14], 15, -1416354905);
        o = qO(o, p, q, n, e[h + 5], 21, -57434055);
        n = qO(n, o, p, q, e[h + 12], 6, 1700485571);
        q = qO(q, n, o, p, e[h + 3], 10, -1894986606);
        p = qO(p, q, n, o, e[h + 10], 15, -1051523);
        o = qO(o, p, q, n, e[h + 1], 21, -2054922799);
        n = qO(n, o, p, q, e[h + 8], 6, 1873313359);
        q = qO(q, n, o, p, e[h + 15], 10, -30611744);
        p = qO(p, q, n, o, e[h + 6], 15, -1560198380);
        o = qO(o, p, q, n, e[h + 13], 21, 1309151649);
        n = qO(n, o, p, q, e[h + 4], 6, -145523070);
        q = qO(q, n, o, p, e[h + 11], 10, -1120210379);
        p = qO(p, q, n, o, e[h + 2], 15, 718787259);
        o = qO(o, p, q, n, e[h + 9], 21, -343485551);
        n = qC(n, j);
        o = qC(o, k);
        p = qC(p, l);
        q = qC(q, m);
    }

    return [n, o, p, q];
}

function qQ(e) {
    var g,
        h = '',
        j = e.length * 32;

    for (g = 0; g < j; g += 8) {
        h += String.fromCharCode(e[g >> 5] >>> g % 32 & 255);
    }

    return h;
}

function qR(e) {
    var g,
        h = [];
    h[(e.length >> 2) - 1] = undefined;

    for (g = 0; g < h.length; g += 1) {
        h[g] = 0;
    }

    var j = e.length * 8;

    for (g = 0; g < j; g += 8) {
        h[g >> 5] |= (e.charCodeAt(g / 8) & 255) << g % 32;
    }

    return h;
}

function qS(f) {
    return function (h) {
        {
            if (Array.isArray(h)) return qT(h);
        }
    }(f) || function (h) {
        {
            if ('undefined' != typeof Symbol && Symbol.iterator in Object(h)) return Array.from(h);
        }
    }(f) || function (h, i) {
        {
            if (h) {
                if ('string' == typeof h) return qT(h, i);
                var l = Object.prototype.toString.call(h).slice(8, -1);
                return 'Object' === l && h.constructor && (l = h.constructor.name), 'Map' === l || 'Set' === l ? Array.from(h) : 'Arguments' === l || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(l) ? qT(h, i) : undefined;
            }
        }
    }(f) || function () {
        throw new TypeError('Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.');
    }();
}

function qT(g, h) {
    (null == h || h > g.length) && (h = g.length);

    for (var k = 0, l = new Array(h); k < h; k++) l[k] = g[k];

    return l;
}

function qU(f, g) {
    return g >>> f | g << 32 - f;
}

function qV(f, g, h) {
    return f & g ^ ~f & h;
}

function qW(f, g, h) {
    return f & g ^ f & h ^ g & h;
}

function qX(e) {
    return qU(2, e) ^ qU(13, e) ^ qU(22, e);
}

function qY(e) {
    return qU(6, e) ^ qU(11, e) ^ qU(25, e);
}

function qZ(e) {
    return qU(7, e) ^ qU(18, e) ^ e >>> 3;
}

function r0(e) {
    return qU(17, e) ^ qU(19, e) ^ e >>> 10;
}

function r1(e, f) {
    return e[f & 15] += r0(e[f + 14 & 15]) + e[f + 9 & 15] + qZ(e[f + 1 & 15]);
}

var r2 = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
    r3,
    r4,
    r5,
    r6 = '0123456789abcdef';

function r7(f, g) {
    var j = (f & 65535) + (g & 65535),
        k = (f >> 16) + (g >> 16) + (j >> 16);
    return k << 16 | j & 65535;
}

function r8() {
    r3 = new Array(8);
    r4 = new Array(2);
    r5 = new Array(64);
    r4[0] = r4[1] = 0;
    r3[0] = 1779033703;
    r3[1] = 3144134277;
    r3[2] = 1013904242;
    r3[3] = 2773480762;
    r3[4] = 1359893119;
    r3[5] = 2600822924;
    r3[6] = 528734635;
    r3[7] = 1541459225;
}

function r9() {
    var l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u,
        v = new Array(16);
    l = r3[0], m = r3[1];
    n = r3[2], o = r3[3], p = r3[4], q = r3[5];
    r = r3[6], s = r3[7];

    for (var w = 0; w < 16; w++) v[w] = r5[(w << 2) + 3] | r5[(w << 2) + 2] << 8 | r5[(w << 2) + 1] << 16 | r5[w << 2] << 24;

    for (var x = 0; x < 64; x++) {
        t = s + qY(p) + qV(p, q, r) + r2[x];
        if (x < 16) t += v[x]; else t += r1(v, x);
        u = qX(l) + qW(l, m, n);
        s = r;
        r = q;
        q = p;
        p = r7(o, t);
        o = n;
        n = m;
        m = l;
        l = r7(t, u);
    }

    r3[0] += l, r3[1] += m;
    r3[2] += n;
    r3[3] += o, r3[4] += p, r3[5] += q, r3[6] += r, r3[7] += s;
}

function ra(e, f) {
    var h,
        k,
        l = 0;
    k = r4[0] >> 3 & 63;
    var m = f & 63;
    if ((r4[0] += f << 3) < f << 3) r4[1]++;
    r4[1] += f >> 29;

    for (h = 0; h + 63 < f; h += 64) {
        for (var n = k; n < 64; n++) r5[n] = e.charCodeAt(l++);

        r9(), k = 0;
    }

    for (var n = 0; n < m; n++) r5[n] = e.charCodeAt(l++);
}

async function rb(l) {
    let n = rh.getTouchSession();
    await l.wait(300);

    if (!l.joyytoken || l.joyytoken_count > 15) {
        l.joyytoken = JSON.parse(await rh.gettoken(l)).joyytoken, l.joyytoken_count = 0;
    }

    l.joyytoken_count++;
    let o;

    switch (l.action) {
        case 'startTask':
            var p = {};
            p.taskId = l.id, o = p;
            break;

        case 'chargeScores':
            var q = {};
            q.bubleId = l.id, o = q;
            break;

        case 'sign':
            o = {};

        default:
            break;
    }

    let r = this.getCurrentDate().getTime(),
        s,
        t,
        u;

    switch (l.scid) {
        case 'DDhomePageh5':
            u = rf(6);
            var v = {
                'pin': l.UserName,
                'random': u,
                ...o
            };
            s = rh.objToString2(rh.RecursiveSorting(v)), t = '{"tm":[],"tnm":[],"grn":' + l.joyytoken_count + ',"ss":"' + n + '","wed":"ttttt","wea":"ffttttua","pdn":[8,' + (Math.floor(Math.random() * 100000000) % 1800 + 1) + ',6,11,1,1],"jj":1,"cs":"6c3a3a33d00cc689b35ffc9624afdefb","np":"Linux aarch64","t":' + r + ',"jk":"' + l.jdk + '","fpb":"zMkkeN2jxE5pKr8yZbKVeMQ","nv":"Google Inc.","nav":"' + l.bv + '","scr":[873,393],"ro":["' + l.dv.split(' ')[0] + '","android","' + l.iv + '","' + l.av + '","' + l.bv + '","1346466673661656-1333131346037313","1"],"ioa":"fffffftt","aj":"u","ci":"w3.1.0","cf_v":"02","bd":"' + s + '","mj":[0,0,0],"blog":"' + rh.get_blog(l.UserName) + '","msg":""}';
            break;

        case 'XMFhPageh5':
            u = rg(8);
            var w = {};
            w.random = u, s = rh.objToString2(rh.RecursiveSorting(w)), t = '{"tm":[],"tnm":[],"grn":' + l.joyytoken_count + ',"ss":"' + n + '","wed":"tttttfuf","wea":"ffttttua","pdn":[7,' + (Math.floor(Math.random() * 100000000) % 1800 + 1) + ',8,8,1,1],"jj":1,"cs":"bbce24b486769155d248ed48e5854ab9","np":"Linux aarch64","t":' + r + ',"jk":"' + l.jdk + '","fpb":"zMkkeN2jxE5pKr8yZbKVeMQ","nv":"Google Inc.","nav":"' + l.bv + '","scr":[873,393],"ro":["' + l.dv.split(' ')[0] + '","android","' + l.iv + '","' + l.av + '","' + l.bv + '","1346466673661656-1333131346037313","1"],"ioa":"fffffftt","aj":"u","ci":"w3.2.4","cf_v":"01","bd":"' + s + '","mj":[0,0,0],"blog":"' + rh.get_blog(l.UserName) + '","msg":""}';
            break;

        case 'MShPageh5':
            u = rf(8);
            var x = {};
            x.random = u, s = rh.objToString2(rh.RecursiveSorting(x)), t = '{"tm":[],"tnm":[],"grn":' + l.joyytoken_count + ',"ss":"' + n + '","wed":"tttttfuf","wea":"ffttttua","pdn":[8,' + (Math.floor(Math.random() * 100000000) % 1800 + 1) + ',6,7,1,1],"jj":1,"cs":"798b7cdc0393d8f96a9b7cc9eb09f9e8","np":"Linux aarch64","t":' + r + ',"jk":"' + l.jdk + '","fpb":"zMkkeN2jxE5pKr8yZbKVeMQ","nv":"Google Inc.","nav":"' + l.bv + '","scr":[873,393],"ro":["' + l.dv.split(' ')[0] + '","android","' + l.iv + '","' + l.av + '","' + l.bv + '","1346466673661656-1333131346037313","1"],"ioa":"fffffftt","aj":"u","ci":"w3.5.4","cf_v":"02","bd":"' + s + '","mj":[0,0,0],"blog":"' + rh.get_blog(l.UserName) + '","msg":""}';
            break;
    }

    let y = rh.decipherJoyToken(l.appid + l.joyytoken, l.appid).encrypt_id.split(','),
        z = rh.getRandomWord(10);
    var A = rh.getKey(y[2], z, r);
    let B = s + '&token=' + l.joyytoken + '&time=' + r + '&nonce_str=' + z + '&key=' + A + '&is_trust=1';
    y[3] == 1 ? B = rh.sha1(B) : B = rh.sha2(B);
    var C = [r, '1' + z + l.joyytoken, y[2] + ',' + y[3]];
    C.push(B), C.push(rh.getCrcCode(B)), C.push('C');
    let D = '{"tm":[],"tnm":["d1-7R,JI,4OD,u,t","d5-9L,AC,6GU,1.000,t","d7-9L,AC,6HM,1.000,t"],"grn":1,"ss":"16672715829285809","wed":"tttttfuf","wea":"ffttttua","pdn":[7,2428,8,8,1,1],"jj":3,"cs":"bbce24b486769155d248ed48e5854ab9","np":"Linux aarch64","t":1669278112024,"jk":"--6439a2ade61a4db4-16c7a93794da15b4590ab94b96aca28fd7467","fpb":"hZhCA7-iaPtXb9MOk3FUBuA","nv":"Google Inc.","nav":"98247","scr":[873,393],"ro":["HLK-AL00 Build/HONORHLK-AL00","android","10","11.2.3","98413","4bcadd3156406678-b666b02fbba0bd9e","1"],"ioa":"fffffftt","aj":"u","ci":"w3.2.4","cf_v":"01","bd":"random=88733526","mj":[2,0,0],"blog":"","msg":""}';
    t = new Buffer.from(rh.xorEncrypt(t, A)).toString('base64');
    let E = rh.getCrcCode(t);

    if (l.ver !== '1.0.1' || l.suc !== 'no') {
        E = rh.getRandomWord(7);
    }

    ;
    C.push(t), C.push(E);

    switch (l.scid) {
        case 'DDhomePageh5':
            return {
                'extraData': {
                    'log': C.join('~'),
                    'sceneid': 'DDhomePageh5'
                },
                ...o,
                'random': u
            };

        case 'MShPageh5':
            var F = {};
            F.random = u;
            return {
                'businessData': F,
                'signStr': C.join('~'),
                'sceneid': 'MShPageh5'
            };

        case 'XMFhPageh5':
            var G = {};
            G.random = u;
            return {
                'businessData': G,
                'signStr': C.join('~'),
                'sceneid': 'XMFhPageh5'
            };
    }
}

function rc() {
    var f = r4[0] >> 3 & 63;
    r5[f++] = 128;

    if (f <= 56) {
        for (var g = f; g < 56; g++) r5[g] = 0;
    } else {
        for (var g = f; g < 64; g++) r5[g] = 0;

        r9();

        for (var g = 0; g < 56; g++) r5[g] = 0;
    }

    r5[56] = r4[1] >>> 24 & 255;
    r5[57] = r4[1] >>> 16 & 255, r5[58] = r4[1] >>> 8 & 255, r5[59] = r4[1] & 255;
    r5[60] = r4[0] >>> 24 & 255, r5[61] = r4[0] >>> 16 & 255, r5[62] = r4[0] >>> 8 & 255, r5[63] = r4[0] & 255, r9();
}

function rd() {
    var h = 0;
    var k = new Array(32);

    for (var l = 0; l < 8; l++) {
        k[h++] = r3[l] >>> 24 & 255, k[h++] = r3[l] >>> 16 & 255, k[h++] = r3[l] >>> 8 & 255, k[h++] = r3[l] & 255;
    }

    return k;
}

function re() {
    var h = new String();

    for (var k = 0; k < 8; k++) {
        for (var l = 28; l >= 0; l -= 4) h += r6.charAt(r3[k] >>> l & 15);
    }

    return h;
}

function rf(g) {
    let j = '';

    for (let l = 0; l < g; l++) j = '' + Math.floor(10 * Math.random()) + j;

    return j;
}

function rg(g) {
    let j = '';
    if (g) for (let k = 0; k < g; k++) {
        let m = 10 * Math.random() << 0;
        0 !== k && k !== g - 1 || 0 !== m ? j += '' + m : k--;
    }
    return j;
}

let rh = {
    'getDefaultVal': function (g) {
        try {
            var i = {
                'undefined': 'u',
                'false': 'f',
                'true': 't'
            };
            return i[g] || g;
        } catch (k) {
            return g;
        }
    },
    'requestUrl': {
        'gettoken': ''.concat('https://', 'bh.m.jd.com/gettoken'),
        'bypass': ''.concat('https://blackhole', '.m.jd.com/bypass')
    },
    'getTouchSession': function () {
        var g = new Date().getTime(),
            h = this.getRandomInt(1000, 9999);
        return String(g) + String(h);
    },
    'sha256': function (e) {
        r8(), ra(e, e.length);
        rc();
        return re().toUpperCase();
    },
    'atobPolyfill': function (f) {
        return function (h) {
            {
                var m = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                if (h = String(h).replace(/[\t\n\f\r ]+/g, ''), !/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/.test(h)) throw new TypeError('解密错误');
                h += '=='.slice(2 - (3 & h.length));

                for (var p, q, s, u = '', v = 0; v < h.length;) p = m.indexOf(h.charAt(v++)) << 18 | m.indexOf(h.charAt(v++)) << 12 | (q = m.indexOf(h.charAt(v++))) << 6 | (s = m.indexOf(h.charAt(v++))), u += 64 === q ? String.fromCharCode(p >> 16 & 255) : 64 === s ? String.fromCharCode(p >> 16 & 255, p >> 8 & 255) : String.fromCharCode(p >> 16 & 255, p >> 8 & 255, 255 & p);

                return u;
            }
        }(f);
    },
    'btoaPolyfill': function (f) {
        var h = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        return function (j) {
            {
                for (var k, l, m, p, q = '', v = 0, w = (j = String(j)).length % 3; v < j.length;) {
                    if ((l = j.charCodeAt(v++)) > 255 || (m = j.charCodeAt(v++)) > 255 || (p = j.charCodeAt(v++)) > 255) throw new TypeError('Failed to execute \'btoa\' on \'Window\': The string to be encoded contains characters outside of the Latin1 range.');
                    q += h.charAt((k = l << 16 | m << 8 | p) >> 18 & 63) + h.charAt(k >> 12 & 63) + h.charAt(k >> 6 & 63) + h.charAt(63 & k);
                }

                return w ? q.slice(0, w - 3) + '==='.substring(w) : q;
            }
        }(unescape(encodeURIComponent(f)));
    },
    'xorEncrypt': function (g, h) {
        for (var l = h.length, m = '', o = 0; o < g.length; o++) m += String.fromCharCode(g[o].charCodeAt() ^ h[o % l].charCodeAt());

        return m;
    },
    'encrypt1': function (g, h) {
        for (var l = g.length, m = h.toString(), p = [], q = '', u = 0, v = 0; v < m.length; v++) u >= l && (u %= l), q = (m.charCodeAt(v) ^ g.charCodeAt(u)) % 10, p.push(q), u += 1;

        return p.join().replace(/,/g, '');
    },
    'len_Fun': function (g, h) {
        return ''.concat(g.substring(h, g.length)) + ''.concat(g.substring(0, h));
    },
    'encrypt2': function (f, g) {
        var j = g.toString(),
            k = g.toString().length,
            l = parseInt((k + f.length) / 3),
            m = '',
            p = '';
        return k > f.length ? (m = this.len_Fun(j, l), p = this.encrypt1(f, m)) : (m = this.len_Fun(f, l), p = this.encrypt1(j, m)), p;
    },
    'addZeroFront': function (f) {
        return f && f.length >= 5 ? f : ('00000' + String(f)).substr(-5);
    },
    'addZeroBack': function (f) {
        return f && f.length >= 5 ? f : (String(f) + '00000').substr(0, 5);
    },
    'encrypt3': function (f, g) {
        var j = this.addZeroBack(g).toString().substring(0, 5),
            k = this.addZeroFront(f).substring(f.length - 5),
            l = j.length,
            m = qS(Array(l).keys()),
            p = [];
        return m.forEach(function (q) {
            p.push(Math.abs(j.charCodeAt(q) - k.charCodeAt(q)));
        }), p.join().replace(/,/g, '');
    },
    'encrypt7': function (g, i) {
        try {
            let k = g.split('').reverse().join(''),
                n = (String(i) + '000000').slice(0, 13),
                o = n.slice(9, 12),
                q = ''.concat(k).concat(o),
                r = [],
                s = '';

            for (let v = 0; v < n.length; v++) {
                let x = (n.charCodeAt(v) & q.charCodeAt(v)).toString(16);
                r.push(x);
            }

            return s = r.join(''), s;
        } catch (z) {
            return null;
        }
    },
    getCurrentDate: function () {
        return new Date();
    },
    'getCurrentTime': function () {
        return this.getCurrentDate().getTime();
    },
    'getRandomInt': function () {
        var i = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : 0,
            j = arguments.length > 1 && undefined !== arguments[1] ? arguments[1] : 9;
        return i = Math.ceil(i), j = Math.floor(j), Math.floor(Math.random() * (j - i + 1)) + i;
    },
    'getRandomWord': function (f) {
        for (var h = '', j = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', k = 0; k < f; k++) {
            var l = Math.round(Math.random() * (j.length - 1));
            h += j.substring(l, l + 1);
        }

        return h;
    },
    'getNumberInString': function (f) {
        return Number(f.replace(/[^0-9]/gi, ''));
    },
    'getSpecialPosition': function (f) {
        for (var h = !(arguments.length > 1 && undefined !== arguments[1]) || arguments[1], j = ((f = String(f)).length, h ? 1 : 0), k = '', l = 0; l < f.length; l++) l % 2 === j && (k += f[l]);

        return k;
    },
    'getLastAscii': function (g) {
        var j = g.charCodeAt(0).toString();
        return j[j.length - 1];
    },
    'toAscii': function (g) {
        var k = '';

        for (var l in g) {
            var m = g[l],
                o = /[a-zA-Z]/.test(m);
            g.hasOwnProperty(l) && (k += o ? this.getLastAscii(m) : m);
        }

        return k;
    },
    'add0': function (f, g) {
        return (Array(g).join('0') + f).slice(-g);
    },
    'minusByByte': function (g, h) {
        var l = g.length,
            m = h.length,
            p = Math.max(l, m),
            q = this.toAscii(g),
            v = this.toAscii(h),
            w = '',
            x = 0;

        for (l !== m && (q = this.add0(q, p), v = this.add0(v, p)); x < p;) w += Math.abs(q[x] - v[x]), x++;

        return w;
    },
    'Crc32': function (f) {
        var j = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';
        crc = -1;
        var k = 0,
            l = 0;

        for (var m = 0, o = f.length; m < o; m++) {
            k = (crc ^ f.charCodeAt(m)) & 255, l = '0x' + j.substr(k * 9, 8), crc = crc >>> 8 ^ l;
        }

        return (crc ^ -1) >>> 0;
    },
    'getCrcCode': function (g) {
        var j = '0000000',
            k = '';

        try {
            k = this.Crc32(g).toString(36), j = this.addZeroToSeven(k);
        } catch (m) { }

        return j;
    },
    'addZeroToSeven': function (f) {
        return f && f.length >= 7 ? f : ('0000000' + String(f)).substr(-7);
    },
    'getInRange': function (f, g, h) {
        var j = [];
        return f.map(function (k, l) {
            k >= g && k <= h && j.push(k);
        }), j;
    },
    'RecursiveSorting': function () {
        var g = this,
            h = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {},
            j = {},
            k = h;

        if ('[object Object]' == Object.prototype.toString.call(k)) {
            var l = Object.keys(k).sort(function (o, p) {
                return o < p ? -1 : o > p ? 1 : 0;
            });
            l.forEach(function (p) {
                {
                    var v = k[p];

                    if ('[object Object]' === Object.prototype.toString.call(v)) {
                        var w = g.RecursiveSorting(v);
                        j[p] = w;
                    } else {
                        if ('[object Array]' === Object.prototype.toString.call(v)) {
                            for (var x = [], y = 0; y < v.length; y++) {
                                var z = v[y];

                                if ('[object Object]' === Object.prototype.toString.call(z)) {
                                    var A = g.RecursiveSorting(z);
                                    x[y] = A;
                                } else x[y] = z;
                            }

                            j[p] = x;
                        } else j[p] = v;
                    }
                }
            });
        } else j = h;

        return j;
    },
    'objToString2': function () {
        var i = arguments.length > 0 && undefined !== arguments[0] ? arguments[0] : {},
            j = '';
        return Object.keys(i).forEach(function (k) {
            {
                var m = i[k];
                null != m && (j += m instanceof Object || m instanceof Array ? ''.concat('' === j ? '' : '&').concat(k, '=').concat(JSON.stringify(m)) : ''.concat('' === j ? '' : '&').concat(k, '=').concat(m));
            }
        }), j;
    },
    'getKey': function (f, g, h) {
        let j = this;
        return {
            0x1: function () {
                {
                    var k = j.getNumberInString(g),
                        l = j.getSpecialPosition(h);
                    return Math.abs(k - l);
                }
            },
            0x2: function () {
                {
                    var l = j.getSpecialPosition(g, false),
                        m = j.getSpecialPosition(h);
                    return j.minusByByte(l, m);
                }
            },
            0x3: function () {
                {
                    var m = g.slice(0, 5),
                        o = String(h).slice(-5);
                    return j.minusByByte(m, o);
                }
            },
            0x4: function () {
                return j.encrypt1(g, h);
            },
            0x5: function () {
                return j.encrypt2(g, h);
            },
            0x6: function () {
                return j.encrypt3(g, h);
            },
            0x7: function () {
                return j.encrypt7(g, h);
            },
            0x8: function () {
                return j.encrypt8(g, h);
            }
        }[f]();
    },
    'decipherJoyToken': function (g, h) {
        let p = this;
        var q = {
            'jjt': 'a',
            'expire': p.getCurrentTime(),
            'outtime': 0x3,
            'time_correction': false
        };
        var v = '',
            w = g.indexOf(h) + h.length,
            x = g.length;

        if ((v = (v = g.slice(w, x).split('.')).map(function (F) {
            return p.atobPolyfill(F);
        }))[1] && v[0] && v[2]) {
            var C = v[0].slice(2, 7),
                D = v[0].slice(7, 9),
                E = p.xorEncrypt(v[1] || '', C).split('~');
            q.outtime = E[3] - 0, q.encrypt_id = E[2], q.jjt = 't';
            var A = E[0] - 0 || 0;
            A && 'number' == typeof A && (q.time_correction = true, q.expire = A);
            var B = A - p.getCurrentTime() || 0;
            return q.q = B, q.cf_v = D, q;
        }

        return q;
    },
    'nn': {
        'bin': {
            'stringToBytes': function (f) {
                f = unescape(encodeURIComponent(f));
                let h = [];

                for (let i = 0; i < f.length; i++) h.push(255 & f.charCodeAt(i));

                return h;
            },
            'bytesToString': function (f) {
                let h = [];

                for (let i = 0; i < f.length; i++) h.push(String.fromCharCode(f[i]));

                return decodeURIComponent(escape(h.join('')));
            }
        }
    },
    'r': {
        'rotl': function (g, h) {
            return g << h | g >>> 32 - h;
        },
        'rotr': function (g, h) {
            return g << 32 - h | g >>> h;
        },
        'endian': function (g) {
            if (g.constructor == Number) return 16711935 & r.rotl(g, 8) | 4278255360 & r.rotl(g, 24);

            for (let j = 0; j < g.length; j++) g[j] = r.endian(g[j]);

            return g;
        },
        'randomBytes': function (g) {
            let j = [];

            for (; 0 < g; g--) j.push(Math.floor(256 * Math.random()));

            return j;
        },
        'bytesToWords': function (g) {
            let j = [];

            for (let k = 0, l = 0; k < g.length; k++, l += 8) j[l >>> 5] |= g[k] << 24 - l % 32;

            return j;
        },
        'wordsToBytes': function (g) {
            let j = [];

            for (let k = 0; k < 32 * g.length; k += 8) j.push(g[k >>> 5] >>> 24 - k % 32 & 255);

            return j;
        },
        'bytesToHex': function (g) {
            let j = [];

            for (let k = 0; k < g.length; k++) j.push((g[k] >>> 4).toString(16)), j.push((15 & g[k]).toString(16));

            return j.join('');
        },
        'bytesToHex1': function (f) {
            return f.map(function (h) {
                return t = h.toString(16), h = 2, t.length > h ? t : Array(h - t.length + 1).join('0') + t;
            }).join('').toUpperCase();
        },
        'hexToBytes': function (f) {
            let h = [];

            for (let i = 0; i < f.length; i += 2) h.push(parseInt(f.substr(i, 2), 16));

            return h;
        },
        'bytesToString': function (g) {
            return g.map(function (j) {
                return String.fromCharCode(j);
            }).join('');
        },
        'bytesToBase64': function (g) {
            let k = [];

            for (let l = 0; l < g.length; l += 3) for (let m = g[l] << 16 | g[l + 1] << 8 | g[l + 2], n = 0; n < 4; n++) 8 * l + 6 * n <= 8 * g.length ? k.push(n.charAt(m >>> 6 * (3 - n) & 63)) : k.push('=');

            return k.join('');
        },
        'base64ToBytes': function (g) {
            g = g.replace(/[^A-Z0-9+\/]/gi, '');
            let j = [];

            for (let k = 0, l = 0; k < g.length; l = ++k % 4) 0 != l && j.push((n.indexOf(g.charAt(k - 1)) & Math.pow(2, -2 * l + 8) - 1) << 2 * l | n.indexOf(g.charAt(k)) >>> 6 - 2 * l);

            return j;
        }
    },
    'a': function (g, j, k) {
        let q = [];

        for (let H, I = 2, J = 0; J < 64;) {
            !function (L) {
                {
                    for (let O = Math.sqrt(L), P = 2; P <= O; P++) if (!(L % P)) return;

                    return 1;
                }
            }(I) || (q[J] = 4294967296 * ((H = Math.pow(I, 0.3333333333333333)) - (0 | H)) | 0, J++), I++;
        }

        let w = g[0],
            x = g[1],
            y = g[2],
            z = g[3],
            A = g[4],
            B = g[5],
            C = g[6],
            D = g[7],
            E = [],
            F,
            G;

        for (let L = 0; L < 64; L++) {
            L < 16 ? E[L] = 0 | j[k + L] : (F = E[L - 15], G = E[L - 2], E[L] = ((F << 25 | F >>> 7) ^ (F << 14 | F >>> 18) ^ F >>> 3) + E[L - 7] + ((G << 15 | G >>> 17) ^ (G << 13 | G >>> 19) ^ G >>> 10) + E[L - 16]), (F = w & x ^ w & y ^ x & y, G = D + ((A << 26 | A >>> 6) ^ (A << 21 | A >>> 11) ^ (A << 7 | A >>> 25)) + (A & B ^ ~A & C) + q[L] + E[L]), (D = C, C = B, B = A, A = z + G | 0, z = y, y = x, x = w, w = G + (((w << 30 | w >>> 2) ^ (w << 19 | w >>> 13) ^ (w << 10 | w >>> 22)) + F) | 0);
        }

        g[0] = g[0] + w | 0, g[1] = g[1] + x | 0, g[2] = g[2] + y | 0, g[3] = g[3] + z | 0, g[4] = g[4] + A | 0, g[5] = g[5] + B | 0, g[6] = g[6] + C | 0, g[7] = g[7] + D | 0;
    },
    'sha1': function (e) {
        var h = new Uint8Array(this.encodeUTF8(e)),
            n,
            p,
            q,
            r = (h.length + 8 >>> 6 << 4) + 16,
            e = new Uint8Array(r << 2);
        e.set(new Uint8Array(h.buffer)), e = new Uint32Array(e.buffer);

        for (q = new DataView(e.buffer), n = 0; n < r; n++) e[n] = q.getUint32(n << 2);

        e[h.length >> 2] |= 128 << 24 - (h.length & 3) * 8;
        e[r - 1] = h.length << 3;

        var u = [],
            v = [function () {
                return z[1] & z[2] | ~z[1] & z[3];
            }, function () {
                return z[1] ^ z[2] ^ z[3];
            }, function () {
                return z[1] & z[2] | z[1] & z[3] | z[2] & z[3];
            }, function () {
                return z[1] ^ z[2] ^ z[3];
            }],
            x = function (C, D) {
                return C << D | C >>> 32 - D;
            },
            y = [1518500249, 1859775393, -1894007588, -899497514],
            z = [1732584193, -271733879, null, null, -1009589776];

        z[2] = ~z[0], z[3] = ~z[1];

        for (var n = 0; n < e.length; n += 16) {
            var A = z.slice(0);

            for (p = 0; p < 80; p++) u[p] = p < 16 ? e[n + p] : x(u[p - 3] ^ u[p - 8] ^ u[p - 14] ^ u[p - 16], 1), q = x(z[0], 5) + v[p / 20 | 0]() + z[4] + u[p] + y[p / 20 | 0] | 0, z[1] = x(z[1], 30), z.pop(), z.unshift(q);

            for (p = 0; p < 5; p++) z[p] = z[p] + A[p] | 0;
        }

        ;
        q = new DataView(new Uint32Array(z).buffer);

        for (var n = 0; n < 5; n++) z[n] = q.getUint32(n << 2);

        var B = Array.prototype.map.call(new Uint8Array(new Uint32Array(z).buffer), function (D) {
            return (D < 16 ? '0' : '') + D.toString(16);
        }).join('');
        return B.toString().toUpperCase();
    },
    'sha2': function (f, g) {
        f.constructor === String && (f = this.nn.bin.stringToBytes(f));

        let j = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
            k = function (l) {
                {
                    let m = [];

                    for (let p = 0, q = 0; p < l.length; p++, q += 8) {
                        m[q >>> 5] |= l[p] << 24 - q % 32;
                    }

                    return m;
                }
            }(f);

        k[(f = 8 * f.length) >> 5] |= 128 << 24 - f % 32, k[15 + (64 + f >> 9 << 4)] = f;

        for (let l = 0; l < k.length; l += 16) this.a(j, k, l);

        return f = function (m) {
            {
                let r = [];

                for (let s = 0; s < 32 * m.length; s += 8) r.push(m[s >>> 5] >>> 24 - s % 32 & 255);

                return r;
            }
        }(j), this.r.bytesToHex1(f);
    },
    'encodeUTF8': function (f) {
        var j,
            k = [],
            l,
            m;

        for (j = 0; j < f.length; j++) if ((l = f.charCodeAt(j)) < 128) k.push(l); else {
            if (l < 2048) k.push(192 + (l >> 6 & 31), 128 + (l & 63)); else {
                if ((m = l ^ 55296) >> 10 == 0) l = (m << 10) + (f.charCodeAt(++j) ^ 56320) + 65536, k.push(240 + (l >> 18 & 7), 128 + (l >> 12 & 63)); else k.push(224 + (l >> 12 & 15));
                k.push(128 + (l >> 6 & 63), 128 + (l & 63));
            }
        }

        ;
        return k;
    },
    'gettoken': function (e) {
        const g = require('https');

        var h = 'content={"appname":"' + e.appid + '","whwswswws":"zMkkeN2jxE5pKr8yZbKVeMQ","jdkey":"' + e.jdk + '","body":{"platform":"1"}}';
        return new Promise((i, j) => {
            {
                var l = {
                    'port': 0x1bb,
                    'rejectUnauthorized': false,
                    'hostname': 'rjsb-token-m.jd.com',
                    'path': '/gettoken',
                    'method': 'POST'
                };
                l.headers = {}, l.headers['Content-Type'] = 'text/plain;charset=UTF-8', l.headers.Host = 'rjsb-token-m.jd.com', l.headers.Origin = 'https://h5.m.jd.com', l.headers['X-Requested-With'] = 'com.jingdong.app.mall', l.headers.Referer = 'https://h5.m.jd.com/', l.headers['User-Agent'] = e.UA;
                let n = l;
                const o = g.request(n, p => {
                    {
                        p.setEncoding('utf-8');
                        let q = '';
                        p.on('error', j), p.on('data', r => q += r), p.on('end', () => i(q));
                    }
                });
                o.write(h), o.on('error', j), o.end();
            }
        });
    },
    'getblogtoken': function (e) {
        const g = require('https');

        var h = 'content={"appname":"50999","whwswswws":"","jdkey":"","body":{"platform":"2"}}';
        return new Promise((i, j) => {
            {
                var l = {
                    'port': 0x1bb,
                    'rejectUnauthorized': false,
                    'hostname': 'rjsb-token-m.jd.com',
                    'path': '/gettoken',
                    'method': 'POST'
                };
                l.headers = {}, l.headers['Content-Type'] = 'text/plain;charset=UTF-8', l.headers.Host = 'rjsb-token-m.jd.com', l.headers['User-Agent'] = e.UA;
                let m = l;
                const n = g.request(m, o => {
                    {
                        o.setEncoding('utf-8');
                        let q = '';
                        o.on('error', j), o.on('data', r => q += r), o.on('end', () => i(q));
                    }
                });
                n.write(h), n.on('error', j), n.end();
            }
        });
    },
    'get_blog': function (e) {
        let g = {
            'z': function (q, r) {
                {
                    var s = '';

                    for (var t = 0; t < q.length; t++) {
                        s += (q.charCodeAt(t) ^ r.charCodeAt(t % r.length)).toString('16');
                    }

                    return s;
                }
            },
            'y': function (q, r) {
                {
                    var t = '';

                    for (var u = 0; u < q.length; u++) {
                        t += (q.charCodeAt(u) & r.charCodeAt(u % r.length)).toString('16');
                    }

                    return t;
                }
            },
            'x': function (q, r) {
                {
                    q = q.substring(1) + q.substring(0, 1), r = r.substring(r.length - 1) + r.substring(0, r.length - 1);
                    var t = '';

                    for (var u = 0; u < q.length; u++) {
                        t += (q.charCodeAt(u) ^ r.charCodeAt(u % r.length)).toString('16');
                    }

                    return t;
                }
            },
            'jiami': function (q, r) {
                {
                    var t = '';

                    for (vi = 0; vi < q.length; vi++) {
                        t += String.fromCharCode(q.charCodeAt(vi) ^ r.charCodeAt(vi % r.length));
                    }

                    return new Buffer.from(t).toString('base64');
                }
            }
        };
        const h = ['x', 'y', 'z'];
        let i = h[Math.floor(Math.random() * 100000000) % h.length],
            j = this.getCurrentTime();
        let k = this.getRandomWord(10);
        let l = 'B';
        refer = 'com.miui.home';
        var m = {
            'r': refer,
            'a': 'cn.litiaotiao.app',
            'c': 'a',
            'cf_v': '02',
            't': j.toString().substring(j.toString().length - 4),
            'ir': '1,1',
            'mp': '0101',
            'm': '28,28,28',
            'ci': 'c3.4'
        };
        let n = qE(e),
            o = g[i](j.toString(), k);
        let p = g.jiami(JSON.stringify(m), o);
        return j + '~1' + (k + n) + '~' + i + ',1~~~' + l + '~' + p + '~' + this.getCrcCode(p);
    }
};
var ri = {};
ri.geturl = rb, module.exports = ri;