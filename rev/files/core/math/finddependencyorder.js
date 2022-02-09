define('core/math/finddependencyorder', ["require", "exports", "core/math/builtinframe", "underscore"], function(require, e, r, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.findDependencyOrder = void 0,
    e.findDependencyOrder = function(e, i, t) {
        var o = []
          , a = {}
          , l = {}
          , p = {}
          , s = {}
          , f = {}
          , h = 0
          , u = []
          , d = [];
        if (!t)
            for (var v in t = [],
            i)
                i.hasOwnProperty(v) && t.push(v);
        for (var v in i)
            if (i.hasOwnProperty(v)) {
                for (var c = i[v].exportPenalty || 0; o.length < c + 1; )
                    o.push([]);
                o[c].push(v)
            }
        for (var y = 0, g = o; y < g.length; y++) {
            for (var w = {}, k = 0, O = g[y]; k < O.length; k++) {
                v = O[k];
                for (var x = 0, P = i[v].getLegalExports(e); x < P.length; x++) {
                    var m = P[x];
                    r[m] || (a[m] || (w[m] = w[m] || [],
                    w[m].push(v),
                    w[m].length > 1 && (!l[m] && i[v].isTable && (p[m] = !0),
                    l[m] = !0)))
                }
            }
            for (var m in w)
                p[m] || (a[m] = w[m])
        }
        for (var D = 0, b = t; D < b.length; D++) {
            m = b[D];
            f.hasOwnProperty(m) || M(m)
        }
        function M(r) {
            f[r] = f[r] || {};
            var t, o = f[r];
            o.id = r,
            o.index = h,
            o.lowlink = h,
            u.push(o),
            o.instack = !0,
            h++;
            for (var l = 0, p = i[r].getDependencies(); l < p.length; l++) {
                var v = p[l];
                if (a.hasOwnProperty(v))
                    for (var c = 0, y = a[v]; c < y.length; c++) {
                        var g = y[c];
                        f.hasOwnProperty(g) ? (t = f[g]).instack && (o.lowlink = Math.min(o.lowlink, t.index)) : (M(g),
                        t = f[g],
                        o.lowlink = Math.min(o.lowlink, t.lowlink))
                    }
            }
            if (o.lowlink === o.index)
                if ((t = u.pop()).instack = !1,
                t === o)
                    !function(e) {
                        d.push(e.id)
                    }(o);
                else {
                    for (var w = [t]; (t = u.pop()).instack = !1,
                    w.push(t),
                    t !== o; )
                        ;
                    !function(r) {
                        for (var t = [], o = r.length - 1; o >= 0; o--) {
                            var a = r[o]
                              , l = i[a.id].getLegalExports(e);
                            Array.prototype.push.apply(t, l),
                            t.push(l[0]),
                            d.push(a.id)
                        }
                        (t = n.unique(t)).sort();
                        for (var p = 0, f = t; p < f.length; p++) {
                            var h = f[p];
                            s[h] = t
                        }
                    }(w)
                }
        }
        return {
            resolved: d,
            multiplyDefined: l,
            multiplyDefinedByTables: p,
            cyclicallyDefined: s
        }
    }
});