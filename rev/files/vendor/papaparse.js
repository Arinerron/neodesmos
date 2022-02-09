
define('vendor/papaparse', ['require', 'jquery'], function(require) {
    "use strict";
    var e = require("jquery")
      , t = {
        delimiter: "",
        header: !1,
        dynamicTyping: !1,
        preview: 0,
        step: void 0,
        encoding: "",
        comments: !1,
        complete: void 0,
        error: void 0,
        download: !1,
        chunk: void 0,
        keepEmptyRows: !1
    }
      , n = {};
    function r(e) {
        (e = e || {}).chunkSize || (e.chunkSize = n.RemoteChunkSize);
        var t, r, i = 0, a = "", u = "", c = new o(s(e));
        this.stream = function(n) {
            function o() {
                if (4 == t.readyState)
                    if (t.status < 200 || t.status >= 400)
                        s();
                    else {
                        a += u + t.responseText,
                        u = "";
                        var n = !e.step || i > function(e) {
                            var t = e.getResponseHeader("Content-Range");
                            return parseInt(t.substr(t.lastIndexOf("/") + 1))
                        }(t);
                        if (!n) {
                            var o = a.lastIndexOf("\n");
                            if (o < 0 && (o = a.lastIndexOf("\r")),
                            !(o > -1))
                                return void r();
                            u = a.substring(o + 1),
                            a = a.substring(0, o)
                        }
                        var d = c.parse(a);
                        a = "",
                        f(e.chunk) && (e.chunk(d),
                        d = void 0),
                        n || d.meta.paused || r()
                    }
            }
            function s() {
                f(e.error) && e.error(t.statusText)
            }
            (r = function() {
                !function() {
                    if ((t = new XMLHttpRequest).onload = o,
                    t.onerror = s,
                    t.open("GET", n, !0),
                    e.step) {
                        var r = i + e.chunkSize - 1;
                        0,
                        t.setRequestHeader("Range", "bytes=" + i + "-" + r)
                    }
                    t.send(),
                    i += e.chunkSize
                }()
            }
            )()
        }
    }
    function i(e) {
        (e = e || {}).chunkSize || (e.chunkSize = n.LocalChunkSize);
        var t, r = 0, i = "", a = "", u = new o(s(e)), c = "function" == typeof FileReader;
        this.stream = function(n) {
            var o = n.slice || n.webkitSlice || n.mozSlice;
            function s() {
                var i, a;
                r < n.size && (i = Math.min(r + e.chunkSize, n.size),
                a = t.readAsText(o.call(n, r, i), e.encoding),
                c || d({
                    target: {
                        result: a
                    }
                }))
            }
            function d(t) {
                r += e.chunkSize,
                i += a + t.target.result,
                a = "";
                var o = r >= n.size;
                if (!o) {
                    var c = i.lastIndexOf("\n");
                    if (c < 0 && (c = i.lastIndexOf("\r")),
                    !(c > -1))
                        return void s();
                    a = i.substring(c + 1),
                    i = i.substring(0, c)
                }
                var d = u.parse(i);
                i = "",
                f(e.chunk) && (e.chunk(d, n),
                d = void 0),
                o || d.meta.paused || s()
            }
            c ? ((t = new FileReader).onload = d,
            t.onerror = function() {
                f(e.error) && e.error(t.error, n)
            }
            ) : t = new FileReaderSync,
            s()
        }
    }
    function o(e) {
        var t, r, i, o = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i, u = this, c = !1, d = [], l = {
            data: [],
            errors: [],
            meta: {}
        };
        function p() {
            return l && i && (m("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + n.DefaultDelimiter + "'"),
            i = !1),
            h() && function() {
                if (!l)
                    return;
                for (var e = 0; h() && e < l.data.length; e++)
                    for (var t = 0; t < l.data[e].length; t++)
                        d.push(l.data[e][t]);
                l.data.splice(0, 1)
            }(),
            function() {
                if (!l || !e.header && !e.dynamicTyping)
                    return l;
                for (var t = 0; t < l.data.length; t++) {
                    for (var n = {}, r = 0; r < l.data[t].length; r++) {
                        if (e.dynamicTyping) {
                            var i = l.data[t][r];
                            l.data[t][r] = "true" == i || "false" != i && g(i)
                        }
                        e.header && (r >= d.length ? (n.__parsed_extra || (n.__parsed_extra = []),
                        n.__parsed_extra.push(l.data[t][r])) : n[d[r]] = l.data[t][r])
                    }
                    e.header && (l.data[t] = n,
                    r > d.length ? m("FieldMismatch", "TooManyFields", "Too many fields: expected " + d.length + " fields but parsed " + r, t) : r < d.length && m("FieldMismatch", "TooFewFields", "Too few fields: expected " + d.length + " fields but parsed " + r, t))
                }
                e.header && l.meta && (l.meta.fields = d);
                return l
            }()
        }
        function h() {
            return e.header && 0 == d.length
        }
        function g(e) {
            return o.test(e) ? parseFloat(e) : e
        }
        function m(e, t, n, r) {
            l.errors.push({
                type: e,
                code: t,
                message: n,
                row: r
            })
        }
        e = s(e),
        this.parse = function(o) {
            if (i = !1,
            !e.delimiter) {
                var s = function(t) {
                    for (var r, i, o, s = [",", "\t", "|", ";", n.RECORD_SEP, n.UNIT_SEP], f = 0; f < s.length; f++) {
                        var u = s[f]
                          , c = 0
                          , d = 0;
                        o = void 0;
                        for (var l = new a({
                            delimiter: u,
                            preview: 10
                        }).parse(t), p = 0; p < l.data.length; p++) {
                            var h = l.data[p].length;
                            d += h,
                            void 0 !== o ? h > 1 && (c += Math.abs(h - o),
                            o = h) : o = h
                        }
                        d /= l.data.length,
                        (void 0 === i || c < i) && d > 1.99 && (i = c,
                        r = u)
                    }
                    return e.delimiter = r,
                    {
                        successful: !!r,
                        bestDelimiter: r
                    }
                }(o);
                s.successful ? e.delimiter = s.bestDelimiter : (i = !0,
                e.delimiter = n.DefaultDelimiter),
                l.meta.delimiter = e.delimiter
            }
            if (f(e.step)) {
                var d = e.step;
                e.step = function(e) {
                    l = e,
                    h() ? p() : d(p(), u)
                }
            }
            return e.preview && e.header && e.preview++,
            t = o,
            r = new a(e),
            l = r.parse(t),
            p(),
            f(e.complete) && !c && e.complete(l),
            c ? {
                meta: {
                    paused: !0
                }
            } : l
        }
        ,
        this.pause = function() {
            c = !0,
            r.abort(),
            t = t.substr(r.getCharIndex())
        }
        ,
        this.resume = function() {
            c = !1,
            (r = new a(e)).parse(t),
            f(e.complete) && !c && e.complete(l)
        }
        ,
        this.abort = function() {
            r.abort(),
            f(e.complete) && e.complete(l),
            t = ""
        }
    }
    function a(e) {
        var t, r, i, o, a, s, u, c, d, l, p, h, g, m, y = /^\s*$/, v = !1;
        function b() {
            u++,
            s = t[u]
        }
        function w() {
            _() && !I() ? c = !c : (R(),
            c && I() ? u++ : O("Quotes", "UnexpectedQuotes", "Unexpected quotes"))
        }
        function S() {
            (T(u) || A(u)) && d++,
            R()
        }
        function E() {
            s == r ? x() : T(u) ? (k(),
            b()) : A(u) ? k() : i && (0 == u || A(u - 1) || T(u - 2)) && t[u] === i ? function() {
                for (; !T(u) && !A(u) && u < t.length; )
                    b()
            }() : R()
        }
        function R() {
            l[h][g] += s
        }
        function x() {
            l[h].push(""),
            g = l[h].length - 1
        }
        function k() {
            D(),
            d++,
            m++,
            l.push([]),
            h = l.length - 1,
            x()
        }
        function D() {
            1 == l[h].length && y.test(l[h][0]) && (e.keepEmptyRows ? l[h].splice(0, 1) : l.splice(h, 1),
            h = l.length - 1),
            f(o) && (l[h] && o(M()),
            z())
        }
        function T(e) {
            return e < t.length - 1 && ("\r" == t[e] && "\n" == t[e + 1] || "\n" == t[e] && "\r" == t[e + 1])
        }
        function A(e) {
            return "\r" == t[e] || "\n" == t[e]
        }
        function I() {
            return !_() && u < t.length - 1 && '"' == t[u + 1]
        }
        function _() {
            return !c && C(u - 1) || C(u + 1)
        }
        function C(e) {
            "number" != typeof e && (e = u);
            var n = t[e];
            return e <= -1 || e >= t.length || n == r || "\r" == n || "\n" == n
        }
        function O(e, t, n) {
            p.push({
                type: e,
                code: t,
                message: n,
                line: d,
                row: h,
                index: u
            })
        }
        function z() {
            l = [],
            p = [],
            h = 0,
            g = 0
        }
        function M() {
            return {
                data: l,
                errors: p,
                meta: {
                    lines: d,
                    delimiter: r,
                    aborted: v,
                    truncated: a > 0 && u < t.length
                }
            }
        }
        r = (e = e || {}).delimiter,
        i = e.comments,
        o = e.step,
        a = e.preview,
        ("string" != typeof r || 1 != r.length || n.BAD_DELIMITERS.indexOf(r) > -1) && (r = ","),
        !0 === i ? i = "#" : ("string" != typeof i || 1 != i.length || n.BAD_DELIMITERS.indexOf(i) > -1 || i == r) && (i = !1),
        this.parse = function(e) {
            if ("string" != typeof e)
                throw "Input must be a string";
            return function(e) {
                t = e,
                c = !1,
                u = 0,
                m = 0,
                d = 1,
                z(),
                l = [[""]],
                s = t[u]
            }(e),
            function() {
                for (; u < t.length && !v && !(a > 0 && m >= a); )
                    '"' == s ? w() : c ? S() : E(),
                    b();
                return function() {
                    v && O("Abort", "ParseAbort", "Parsing was aborted by the user's step function");
                    c && O("Quotes", "MissingQuotes", "Unescaped or mismatched quotes");
                    if (D(),
                    !f(o))
                        return M()
                }()
            }()
        }
        ,
        this.abort = function() {
            v = !0
        }
        ,
        this.getCharIndex = function() {
            return u
        }
    }
    function s(e) {
        if ("object" != typeof e)
            return e;
        var t = e instanceof Array ? [] : {};
        for (var n in e)
            t[n] = s(e[n]);
        return t
    }
    function f(e) {
        return "function" == typeof e
    }
    return n.parse = function(e, a) {
        var u = function(e) {
            "object" != typeof e && (e = {});
            var r = s(e);
            ("string" != typeof r.delimiter || 1 != r.delimiter.length || n.BAD_DELIMITERS.indexOf(r.delimiter) > -1) && (r.delimiter = t.delimiter);
            "boolean" != typeof r.header && (r.header = t.header);
            "boolean" != typeof r.dynamicTyping && (r.dynamicTyping = t.dynamicTyping);
            "number" != typeof r.preview && (r.preview = t.preview);
            "function" != typeof r.step && (r.step = t.step);
            "function" != typeof r.complete && (r.complete = t.complete);
            "function" != typeof r.error && (r.error = t.error);
            "string" != typeof r.encoding && (r.encoding = t.encoding);
            "boolean" != typeof r.download && (r.download = t.download);
            "boolean" != typeof r.keepEmptyRows && (r.keepEmptyRows = t.keepEmptyRows);
            return r
        }(a);
        if ("string" == typeof e) {
            if (!u.download)
                return new o(u).parse(e);
            new r(u).stream(e)
        } else if (e instanceof File)
            if (u.step || u.chunk) {
                new i(u).stream(e)
            } else {
                new o(u);
                reader = new FileReader,
                reader.onload = function(e) {
                    new o(u).parse(e.target.result)
                }
                ,
                reader.onerror = function() {
                    f(u.error) && u.error(reader.error, e)
                }
                ,
                reader.readAsText(e, u.encoding)
            }
    }
    ,
    n.unparse = function(e, t) {
        var r = !1
          , i = ","
          , o = "\r\n";
        (function() {
            if ("object" != typeof t)
                return;
            "string" == typeof t.delimiter && 1 == t.delimiter.length && -1 == n.BAD_DELIMITERS.indexOf(t.delimiter) && (i = t.delimiter);
            ("boolean" == typeof t.quotes || t.quotes instanceof Array) && (r = t.quotes);
            "string" == typeof t.newline && (o = t.newline)
        }
        )(),
        "string" == typeof e && (e = JSON.parse(e));
        if (e instanceof Array) {
            if (!e.length || e[0]instanceof Array)
                return s(null, e);
            if ("object" == typeof e[0])
                return s(a(e[0]), e)
        } else if ("object" == typeof e)
            return "string" == typeof e.data && (e.data = JSON.parse(e.data)),
            e.data instanceof Array && (e.fields || (e.fields = e.data[0]instanceof Array ? e.fields : a(e.data[0])),
            e.data[0]instanceof Array || "object" == typeof e.data[0] || (e.data = [e.data])),
            s(e.fields || [], e.data || []);
        throw "exception: Unable to serialize unrecognized input";
        function a(e) {
            if ("object" != typeof e)
                return [];
            var t = [];
            for (var n in e)
                t.push(n);
            return t
        }
        function s(e, t) {
            var n = "";
            "string" == typeof e && (e = JSON.parse(e)),
            "string" == typeof t && (t = JSON.parse(t));
            var r = e instanceof Array && e.length > 0
              , a = !(t[0]instanceof Array);
            if (r) {
                for (var s = 0; s < e.length; s++)
                    s > 0 && (n += i),
                    n += f(e[s], s);
                t.length > 0 && (n += o)
            }
            for (var u = 0; u < t.length; u++) {
                for (var c = r ? e.length : t[u].length, d = 0; d < c; d++) {
                    d > 0 && (n += i);
                    var l = r && a ? e[d] : d;
                    n += f(t[u][l], d)
                }
                u < t.length - 1 && (n += o)
            }
            return n
        }
        function f(e, t) {
            return null == e ? "" : (e = e.toString().replace(/"/g, '""'),
            "boolean" == typeof r && r || r instanceof Array && r[t] || function(e, t) {
                for (var n = 0; n < t.length; n++)
                    if (e.indexOf(t[n]) > -1)
                        return !0;
                return !1
            }(e, n.BAD_DELIMITERS) || e.indexOf(i) > -1 || " " == e.charAt(0) || " " == e.charAt(e.length - 1) ? '"' + e + '"' : e)
        }
    }
    ,
    n.RECORD_SEP = String.fromCharCode(30),
    n.UNIT_SEP = String.fromCharCode(31),
    n.BYTE_ORDER_MARK = "\ufeff",
    n.BAD_DELIMITERS = ["\r", "\n", '"', n.BYTE_ORDER_MARK],
    n.LocalChunkSize = 10485760,
    n.RemoteChunkSize = 5242880,
    n.DefaultDelimiter = ",",
    n.Parser = a,
    n.ParserHandle = o,
    n.NetworkStreamer = r,
    n.FileStreamer = i,
    e.fn.parse = function(t) {
        var r = t.config || {}
          , i = [];
        return this.each(function(t) {
            if (!("INPUT" == e(this).prop("tagName").toUpperCase() && "file" == e(this).attr("type").toLowerCase() && window.FileReader) || !this.files || 0 == this.files.length)
                return !0;
            for (var n = 0; n < this.files.length; n++)
                i.push({
                    file: this.files[n],
                    inputElem: this,
                    instanceConfig: e.extend({}, r)
                })
        }),
        o(),
        this;
        function o() {
            if (0 != i.length) {
                var r, o, s, u, c = i[0];
                if (f(t.before)) {
                    var d = t.before(c.file, c.inputElem);
                    if ("object" == typeof d) {
                        if ("abort" == d.action)
                            return r = "AbortError",
                            o = c.file,
                            s = c.inputElem,
                            u = d.reason,
                            void (f(t.error) && t.error({
                                name: r
                            }, o, s, u));
                        if ("skip" == d.action)
                            return void a();
                        "object" == typeof d.config && (c.instanceConfig = e.extend(c.instanceConfig, d.config))
                    } else if ("skip" == d)
                        return void a()
                }
                var l = c.instanceConfig.complete;
                c.instanceConfig.complete = function(e) {
                    f(l) && l(e, c.file, c.inputElem),
                    a()
                }
                ,
                n.parse(c.file, c.instanceConfig)
            }
        }
        function a() {
            i.splice(0, 1),
            o()
        }
    }
    ,
    n
});