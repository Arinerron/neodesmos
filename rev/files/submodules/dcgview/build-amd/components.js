define('submodules/dcgview/build-amd/components', ["./for", "./switch", "./switch-union", "./if", "./if-defined", "./if-else", "./textarea", "./input", "./checkbox"], function(e, t, f, u, i, a, n, d, l) {
    "use strict";
    function c(e) {
        return e && "object" == typeof e && "default"in e ? e : {
            default: e
        }
    }
    var o = c(e)
      , r = c(t)
      , h = c(f)
      , s = c(u)
      , w = c(i)
      , x = c(a)
      , I = c(n)
      , b = c(d)
      , p = c(l);
    return {
        For: o.default,
        Switch: r.default,
        SwitchUnion: h.default,
        If: s.default,
        IfDefined: w.default,
        IfElse: x.default,
        Textarea: I.default,
        Input: b.default,
        Checkbox: p.default
    }
});