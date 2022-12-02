const Bg = require('crypto-js');

function BU(l = '') {
    return l;
}

function Be(l) {
    let a = [];

    for (let L of l.split('')) {
        let n = L.charCodeAt();
        a = a.concat([(n & 128) >> 7, (n & 64) >> 6, (n & 32) >> 5, (n & 16) >> 4, (n & 8) >> 3, (n & 4) >> 2, (n & 2) >> 1, n & 1]);
    }

    return a;
}

function Bb(l) {
    let a = Array.from({
        'length': parseInt(l.length / 8)
    }).map(L => 0);

    for (let L in a) {
        a[L] = l[L * 8] << 7 | l[L * 8 + 1] << 6 | l[L * 8 + 2] << 5 | l[L * 8 + 3] << 4 | l[L * 8 + 4] << 3 | l[L * 8 + 5] << 2 | l[L * 8 + 6] << 1 | l[L * 8 + 7];
    }

    return BU(a);
}

function Bj(V) {
    let L = [55, 146, 68, 104, 165, 61, 204, 127, 187, 15, 217, 136, 238, 154, 233, 90],
        G = '80306f4370b39fd5630ad0529f77adb6';
    const n = {};
    n.length = V.length;
    let g = Array.from(n).map(Q => 0),
        U,
        e,
        b,
        j;

    for (i in g) {
        U = V[i].charCodeAt(), b = L[i & 15], j = G[i & 7].charCodeAt(), U = b ^ U, U = U ^ j, U = U + b, b = b ^ U, e = G[i & 7].charCodeAt(), b = b ^ e, g[i] = b & 255;
    }

    return BU(g);
}

function BQ(l) {
    let a = [[0, 0], [1, 4], [2, 61], [3, 15], [4, 56], [5, 40], [6, 6], [7, 59], [8, 62], [9, 58], [10, 17], [11, 2], [12, 12], [13, 8], [14, 32], [15, 60], [16, 13], [17, 45], [18, 34], [19, 14], [20, 36], [21, 21], [22, 22], [23, 39], [24, 23], [25, 25], [26, 26], [27, 20], [28, 1], [29, 33], [30, 46], [31, 55], [32, 35], [33, 24], [34, 57], [35, 19], [36, 53], [37, 37], [38, 38], [39, 5], [40, 30], [41, 41], [42, 42], [43, 18], [44, 47], [45, 27], [46, 9], [47, 44], [48, 51], [49, 7], [50, 49], [51, 63], [52, 28], [53, 43], [54, 54], [55, 52], [56, 31], [57, 10], [58, 29], [59, 11], [60, 3], [61, 16], [62, 50], [63, 48]],
        L = Be(l),
        G = Array.from({
            'length': L.length
        }).map(n => 0);

    for (let n in G) {
        G[a[n][1]] = L[a[n][0]];
    }

    return Bb(G);
}

function BO(l) {
    let a = [[0, 6, 0, 1], [1, 4, 1, 0], [2, 5, 0, 1], [3, 0, 0, 1], [4, 2, 0, 1], [5, 3, 0, 1], [6, 1, 1, 0], [7, 7, 0, 1]],
        L = Be(l),
        G = [0, 0, 0, 0, 0, 0, 0, 0];

    for (var n in G) {
        L[n] == 0 ? G[a[n][1]] = a[n][2] : G[a[n][1]] = a[n][3];
    }

    return Bb(G);
}

function Bx(l) {
    let a = [];

    for (let L = 0; L < l.length; L += 8) {
        let n = l.slice(L, L + 8);
        n.length == 1 ? a = a.concat(BO(n)) : a = a.concat(BQ(n));
    }

    return a;
}

function BK(l, V, a) {
    let G = [0, 1, 2];
    a == 1 && (G = [1, 2, 0]), a == 2 && (G = [2, 0, 1]);
    let n = G[V];
    if (n == 0) return Bx(l);
    if (n == 2) return Bj(l);
}

function Bt(l, V, a) {
    let G = __filename.split(/[\\/]/).pop(),
        n = __dirname.split(/[\\/]/).pop();

    let g = 'android',
        U = '11.2.2',
        e = [[0, 0], [0, 2], [1, 1], [1, 2], [2, 0], [2, 1]],
        b,
        j;
    [b, j] = e[Math.floor(Math.random() * e.length)];
    let Q = '1' + b + j,
        O = new Date().getTime();
    V = typeof V == 'string' ? V : JSON.stringify(V);
    let K = new Buffer.from(V).toString('latin1'),
        t = Bg.MD5(a ? String(a) : String(Date.now())).toString().substring(0, 30 - (l + K).length % 8),
        i = 'functionId=' + l + '&body=' + K + '&uuid=' + t + '&client=' + g + '&clientVersion=' + U + '&st=' + O + '&sv=' + Q,
        D = BK(i, b, j),
        u = new Buffer.from(D).toString('base64');
    if (G !== 'dylanx.js' || n !== 'function') u = u + 'BAGA';
    let F = Bg.MD5(u).toString();
    return 'body=' + encodeURIComponent(V) + '&client=' + g + '&clientVersion=' + U + '&uuid=' + t + '&st=' + O + '&sign=' + F + '&sv=' + Q;
}

const Bi = {};
Bi.getbody = Bt;
module.exports = Bi;