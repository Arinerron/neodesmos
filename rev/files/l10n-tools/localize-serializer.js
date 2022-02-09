
define('l10n-tools/localize-serializer', ["require", "exports"], function(require, e) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.serializeToTemplateString = e.variableRegexp = void 0,
    e.variableRegexp = /\{\$([a-zA-Z0-9\-]+([a-zA-Z0-9\-]+_)*[a-zA-Z0-9\-]+)\}/,
    e.serializeToTemplateString = function(i, n) {
        var r = 0
          , t = 0
          , a = {}
          , d = {}
          , o = function o(l) {
            if (n.isConst(l))
                return n.getConstValue(l);
            if (n.isNamedBinding(l)) {
                var u = "{$" + (f = s(a, n.getBindingName(l))) + "}";
                if (!e.variableRegexp.test(u))
                    throw new Error("Invalid <Localize> variable: " + u + ".");
                return n.addBinding && n.addBinding(f, l),
                a[f] = !0,
                u
            }
            if (l !== i && n.isView(l)) {
                var f = s(d, n.getViewName(l));
                if (!/[a-zA-Z0-9\-_]/.test(f))
                    throw new Error("Invalid <Localize> subview identifier: " + f + ".");
                return n.addView && n.addView(f, l),
                d[f] = !0,
                "<" + f + "/>"
            }
            if (n.isBinding(l)) {
                u = "{$" + (f = s(a, "v" + r++)) + "}";
                return n.addBinding && n.addBinding(f, l),
                a[f] = !0,
                u
            }
            f = "" + t++;
            n.addElement && n.addElement(f, l);
            var g = [];
            return n.forEachChild(l, function(e) {
                g.push(o(e))
            }),
            d[f] = !0,
            g.length > 0 ? "<" + f + ">" + g.join("") + "</" + f + ">" : "<" + f + "/>"
        }(i);
        if (!/^<0>/.test(o) || !/<\/0>$/.test(o))
            throw new Error("Expected template string to start and end with <0> and </0>, but found " + JSON.stringify(o));
        return o.slice(3, -4).trim();
        function s(e, i) {
            for (var n = 0, r = i; e[r]; )
                r = i + "-" + ++n;
            return r
        }
    }
});