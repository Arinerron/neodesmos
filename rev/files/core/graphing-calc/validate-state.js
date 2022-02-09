
define('core/graphing-calc/validate-state', ["require", "exports", "core/lib/deepCopy"], function(require, e, i) {
    "use strict";
    function t(e) {
        e.slider && function(e) {
            "number" == typeof e.min && (e.min = "" + e.min),
            "number" == typeof e.max && (e.max = "" + e.max),
            "number" == typeof e.step && (e.step = "" + e.step)
        }(e.slider),
        "string" != typeof e.id && (e.id = "" + e.id)
    }
    function r(e) {
        for (var i, r, o = function(e) {
            for (var i = 0, t = 0, r = e; t < r.length; t++) {
                var o = r[t];
                if (i = d(i, o.id),
                "table" === o.type)
                    for (var n = 0, f = o.columns; n < f.length; n++) {
                        d(i, f[n].id)
                    }
            }
            return i
        }(e) + 1, n = {}, f = 0, a = e; f < a.length; f++) {
            var l = a[f];
            if (t(l),
            "folder" === l.type)
                i = l.id,
                n[l.id] && (l.id = "" + o,
                o += 1),
                r = l.id,
                n[l.id] = !0,
                l.hasOwnProperty("folderId") && delete l.folderId;
            else {
                if (void 0 !== i && l.folderId === i ? l.folderId = r : (l.folderId && (l.folderId = ""),
                i = void 0,
                r = void 0),
                "table" === l.type)
                    for (var u = 0, s = l.columns; u < s.length; u++) {
                        var p = s[u];
                        n[p.id] && (p.id = "" + o,
                        o += 1),
                        n[p.id] = !0
                    }
                n[l.id] && (l.id = "" + o,
                o += 1),
                n[l.id] = !0
            }
        }
    }
    function d(e, i) {
        var t = parseFloat(i);
        return t !== Math.floor(t) ? e : Math.max(e, t)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.validateState = void 0,
    e.validateState = function(e) {
        var t = i.default(e);
        return r(t.expressions.list),
        t
    }
});