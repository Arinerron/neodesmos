
define('core/vendor/d3-color', ['require'], function(require) {
    function e(e, t, r) {
        e.prototype = t.prototype = r,
        r.constructor = e
    }
    function t(e, t) {
        var r = Object.create(e.prototype);
        for (var n in t)
            r[n] = t[n];
        return r
    }
    function r() {}
    var n = .7
      , i = 1 / n
      , a = "\\s*([+-]?\\d+)\\s*"
      , o = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*"
      , s = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*"
      , l = /^#([0-9a-f]{3,8})$/
      , h = new RegExp("^rgb\\(" + [a, a, a] + "\\)$")
      , u = new RegExp("^rgb\\(" + [s, s, s] + "\\)$")
      , g = new RegExp("^rgba\\(" + [a, a, a, o] + "\\)$")
      , c = new RegExp("^rgba\\(" + [s, s, s, o] + "\\)$")
      , d = new RegExp("^hsl\\(" + [o, s, s] + "\\)$")
      , b = new RegExp("^hsla\\(" + [o, s, s, o] + "\\)$")
      , p = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    };
    function m() {
        return this.rgb().formatHex()
    }
    function f() {
        return this.rgb().formatRgb()
    }
    function y(e) {
        var t, r;
        return e = (e + "").trim().toLowerCase(),
        (t = l.exec(e)) ? (r = t[1].length,
        t = parseInt(t[1], 16),
        6 === r ? w(t) : 3 === r ? new v(t >> 8 & 15 | t >> 4 & 240,t >> 4 & 15 | 240 & t,(15 & t) << 4 | 15 & t,1) : 8 === r ? k(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (255 & t) / 255) : 4 === r ? k(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | 240 & t, ((15 & t) << 4 | 15 & t) / 255) : null) : (t = h.exec(e)) ? new v(t[1],t[2],t[3],1) : (t = u.exec(e)) ? new v(255 * t[1] / 100,255 * t[2] / 100,255 * t[3] / 100,1) : (t = g.exec(e)) ? k(t[1], t[2], t[3], t[4]) : (t = c.exec(e)) ? k(255 * t[1] / 100, 255 * t[2] / 100, 255 * t[3] / 100, t[4]) : (t = d.exec(e)) ? E(t[1], t[2] / 100, t[3] / 100, 1) : (t = b.exec(e)) ? E(t[1], t[2] / 100, t[3] / 100, t[4]) : p.hasOwnProperty(e) ? w(p[e]) : "transparent" === e ? new v(NaN,NaN,NaN,0) : null
    }
    function w(e) {
        return new v(e >> 16 & 255,e >> 8 & 255,255 & e,1)
    }
    function k(e, t, r, n) {
        return n <= 0 && (e = t = r = NaN),
        new v(e,t,r,n)
    }
    function N(e) {
        return e instanceof r || (e = y(e)),
        e ? new v((e = e.rgb()).r,e.g,e.b,e.opacity) : new v
    }
    function x(e, t, r, n) {
        return 1 === arguments.length ? N(e) : new v(e,t,r,null == n ? 1 : n)
    }
    function v(e, t, r, n) {
        this.r = +e,
        this.g = +t,
        this.b = +r,
        this.opacity = +n
    }
    function M() {
        return "#" + q(this.r) + q(this.g) + q(this.b)
    }
    function R() {
        var e = this.opacity;
        return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (1 === e ? ")" : ", " + e + ")")
    }
    function q(e) {
        return ((e = Math.max(0, Math.min(255, Math.round(e) || 0))) < 16 ? "0" : "") + e.toString(16)
    }
    function E(e, t, r, n) {
        return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN),
        new C(e,t,r,n)
    }
    function $(e) {
        if (e instanceof C)
            return new C(e.h,e.s,e.l,e.opacity);
        if (e instanceof r || (e = y(e)),
        !e)
            return new C;
        if (e instanceof C)
            return e;
        var t = (e = e.rgb()).r / 255
          , n = e.g / 255
          , i = e.b / 255
          , a = Math.min(t, n, i)
          , o = Math.max(t, n, i)
          , s = NaN
          , l = o - a
          , h = (o + a) / 2;
        return l ? (s = t === o ? (n - i) / l + 6 * (n < i) : n === o ? (i - t) / l + 2 : (t - n) / l + 4,
        l /= h < .5 ? o + a : 2 - o - a,
        s *= 60) : l = h > 0 && h < 1 ? 0 : s,
        new C(s,l,h,e.opacity)
    }
    function H(e, t, r, n) {
        return 1 === arguments.length ? $(e) : new C(e,t,r,null == n ? 1 : n)
    }
    function C(e, t, r, n) {
        this.h = +e,
        this.s = +t,
        this.l = +r,
        this.opacity = +n
    }
    function j(e, t, r) {
        return 255 * (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t)
    }
    return e(r, y, {
        copy: function(e) {
            return Object.assign(new this.constructor, this, e)
        },
        displayable: function() {
            return this.rgb().displayable()
        },
        hex: m,
        formatHex: m,
        formatHsl: function() {
            return $(this).formatHsl()
        },
        formatRgb: f,
        toString: f
    }),
    e(v, x, t(r, {
        brighter: function(e) {
            return e = null == e ? i : Math.pow(i, e),
            new v(this.r * e,this.g * e,this.b * e,this.opacity)
        },
        darker: function(e) {
            return e = null == e ? n : Math.pow(n, e),
            new v(this.r * e,this.g * e,this.b * e,this.opacity)
        },
        rgb: function() {
            return this
        },
        displayable: function() {
            return -.5 <= this.r && this.r < 255.5 && -.5 <= this.g && this.g < 255.5 && -.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1
        },
        hex: M,
        formatHex: M,
        formatRgb: R,
        toString: R
    })),
    e(C, H, t(r, {
        brighter: function(e) {
            return e = null == e ? i : Math.pow(i, e),
            new C(this.h,this.s,this.l * e,this.opacity)
        },
        darker: function(e) {
            return e = null == e ? n : Math.pow(n, e),
            new C(this.h,this.s,this.l * e,this.opacity)
        },
        rgb: function() {
            var e = this.h % 360 + 360 * (this.h < 0)
              , t = isNaN(e) || isNaN(this.s) ? 0 : this.s
              , r = this.l
              , n = r + (r < .5 ? r : 1 - r) * t
              , i = 2 * r - n;
            return new v(j(e >= 240 ? e - 240 : e + 120, i, n),j(e, i, n),j(e < 120 ? e + 240 : e - 120, i, n),this.opacity)
        },
        displayable: function() {
            return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1
        },
        formatHsl: function() {
            var e = this.opacity;
            return (1 === (e = isNaN(e) ? 1 : Math.max(0, Math.min(1, e))) ? "hsl(" : "hsla(") + (this.h || 0) + ", " + 100 * (this.s || 0) + "%, " + 100 * (this.l || 0) + "%" + (1 === e ? ")" : ", " + e + ")")
        }
    })),
    {
        Color: r,
        darker: n,
        brighter: i,
        color: y,
        rgbConvert: N,
        rgb: x,
        Rgb: v,
        hslConvert: $,
        hsl: H
    }
});