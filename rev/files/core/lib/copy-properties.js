
define('core/lib/copy-properties', ["require", "exports", "core/lib/deepCopy"], function(require, r, e) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.makeTrueMap = r.extractPropertiesLike = r.copyAllProperties = r.copyProperties = void 0,
    r.copyProperties = function(r) {
        var o = r.from
          , t = r.to
          , i = r.props;
        for (var n in i)
            i[n] && o.hasOwnProperty(n) && (t[n] = e.default(o[n]))
    }
    ,
    r.copyAllProperties = function(r, e) {
        for (var o in r)
            r.hasOwnProperty(o) && (e[o] = r[o])
    }
    ,
    r.extractPropertiesLike = function(r, e) {
        var o = {};
        for (var t in e)
            e.hasOwnProperty(t) && (o[t] = r[t]);
        return o
    }
    ,
    r.makeTrueMap = function(r) {
        var e = {};
        for (var o in r)
            r.hasOwnProperty(o) && (e[o] = !0);
        return e
    }
});