
define('lib/mathspeak', ["require", "exports", "vendor/mathquill", "jquery"], function(require, t, e, r) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.getMathspeakFromText = void 0;
    var n = /`[^`]*`/g
      , i = /^[\+\-]?[\d]*(\.\d+)?$/
      , l = e.MQ.StaticMath(r("<span/>")[0]);
    function a(t) {
        var e = "";
        return i.test(t) ? (/^\+/.test(t) ? (e = "positive ",
        t = t.slice(1)) : /^\-/.test(t) && (e = "negative ",
        t = t.slice(1)),
        e += t.replace(/(\.)([0-9]+)/g, function(t, e, r) {
            return e + r.split("").join(" ").trim()
        })) : (l.latex(t),
        e = l.mathspeak().trim()),
        e
    }
    t.getMathspeakFromText = function(t) {
        for (var e = "", r = 0, i = function(t) {
            if (null != t) {
                var e = t.match(/`/g);
                return (null != e && e.length || 0) % 2 == 0
            }
            return !0
        }(t) ? function(t) {
            var e = [];
            if (null == t || 0 == t.length)
                return e;
            for (var r, i = 0; r = n.exec(t); ) {
                var l = t.slice(i, r.index);
                l.length > 0 && e.push({
                    from: i,
                    to: r.index,
                    type: "text",
                    text: l
                }),
                i = r.index + r[0].length,
                e.push({
                    from: r.index,
                    to: i,
                    type: "math",
                    text: r[0].slice(1, -1)
                })
            }
            var a = t.slice(i);
            return a.length > 0 && e.push({
                from: i,
                to: t.length,
                type: "text",
                text: a
            }),
            e
        }(t) : [{
            from: 0,
            to: t.length,
            type: "text",
            text: t
        }]; r < i.length; r++) {
            var l = i[r];
            e += "text" === l.type ? l.text : a(l.text)
        }
        return e
    }
});