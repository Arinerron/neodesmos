define('core/math/parser/precspec', ["require", "exports", "./expression-token-tables"], function(require, e, r) {
    "use strict";
    function t(e, t) {
        for (var n = 0, i = r.allTokenTypes; n < i.length; n++) {
            var o = i[n];
            if (void 0 === t[o])
                throw new Error("Programming Error: token " + o + " must be a assigned a " + e + " precedence")
        }
    }
    function n(e, r, t, n) {
        if (void 0 !== r[t])
            throw new Error("Programming Error: duplicate " + e + " entry for token " + t + ".");
        r[t] = n
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.precSpec = e.ra = e.la = e.r = e.l = e.initial = void 0,
    e.initial = function(e) {
        return {
            type: "initial",
            tokenType: e
        }
    }
    ,
    e.l = function(e) {
        return {
            type: "l",
            tokenType: e
        }
    }
    ,
    e.r = function(e) {
        return {
            type: "r",
            tokenType: e
        }
    }
    ,
    e.la = function(e) {
        return {
            type: "la",
            tokenType: e
        }
    }
    ,
    e.ra = function(e) {
        return {
            type: "ra",
            tokenType: e
        }
    }
    ,
    e.precSpec = function(e) {
        for (var r = {}, i = {}, o = {}, a = 0; a < e.length; a++)
            for (var c = 0, l = e[a]; c < l.length; c++) {
                var u = l[c]
                  , f = u.type
                  , p = u.tokenType;
                switch (f) {
                case "initial":
                    n("initial", r, p, a);
                    break;
                case "l":
                    n("left", i, p, a);
                    break;
                case "r":
                    n("right", o, p, a);
                    break;
                case "la":
                    n("left", i, p, a),
                    n("right", o, p, a);
                    break;
                case "ra":
                    n("left", i, p, a),
                    n("right", o, p, a - 1)
                }
            }
        function s(e) {
            return o[e]
        }
        return t("left", i),
        t("right", o),
        {
            rightPrec: s,
            leftPrec: function(e) {
                return i[e]
            },
            initialPrec: function(e) {
                var t = r[e];
                return void 0 === t ? s(e) : t
            }
        }
    }
});