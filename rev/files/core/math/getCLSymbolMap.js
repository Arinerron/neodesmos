
define('core/math/getCLSymbolMap', ["require", "exports", "underscore", "core/lib/label"], function(require, e, t, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getCLSymbolMap = void 0,
    e.getCLSymbolMap = function() {
        var e = {}
          , a = {}
          , s = {}
          , i = [];
        for (var n in this.statements) {
            if (this.statements.hasOwnProperty(n))
                switch ((u = this.statements[n]).type) {
                case "Error":
                    break;
                case "Regression":
                    s[n] = [],
                    i.push(n);
                    break;
                default:
                    var o = u.getLegalExports(this.policy);
                    if (o) {
                        for (var p = 0, l = o; p < l.length; p++) {
                            var c = l[p];
                            u.exportPenalty > 0 ? a[c] = n : e[c] = n
                        }
                        s[n] = t.difference(u.getDependencies(), u.getDummyDependencies(), o)
                    }
                }
        }
        for (var d = 0, f = i; d < f.length; d++) {
            n = f[d];
            var u = this.statements[n]
              , h = r.latexToIdentifier(u.userData.residualVariable);
            h && (a[h] = n);
            var v = u.getDependencies().slice()
              , g = {};
            for (c = void 0; c = v.pop(); )
                if (!g[c]) {
                    g[c] = !0;
                    var y = e[c] || a[c];
                    y ? (v.push.apply(v, s[y]),
                    s[n].push(c)) : a[c] = n
                }
        }
        return {
            exportMap: e,
            weakExportMap: a,
            dependencyMap: s
        }
    }
});