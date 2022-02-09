define('lib/prefix-css', ['require', 'vendor/css'], function(require) {
    "use strict";
    var e = require("vendor/css");
    function t(e, t) {
        return Object.assign({}, e, {
            rules: r(e.rules, t)
        })
    }
    function r(e, t) {
        return e.map(function(e) {
            return e.rules ? Object.assign({}, e, {
                rules: r(e.rules, t)
            }) : e.selectors ? Object.assign({}, e, {
                selectors: s(e.selectors, t)
            }) : e
        })
    }
    function s(e, t) {
        for (var r = [], s = 0; s < e.length; s++) {
            var n = e[s];
            if ("html" === n)
                r.push(n);
            else if (/dcg(-mq)?-aria-alert/.test(n))
                r.push(n);
            else if (/^html body( |$)/.test(n))
                r.push("html" + t + " body" + n.slice("html body".length)),
                r.push("html body " + t + n.slice("html body".length));
            else {
                if (/^html/.test(n))
                    throw new Error("Cannot correctly prefix selector " + n);
                r.push(t + " " + n)
            }
        }
        return r
    }
    return function(r, s) {
        if (s) {
            var n = "." + s;
            return function(e) {
                if (!/\.-?[_a-zA-Z]+[_a-zA-Z0-9-]*/.test(e))
                    throw new Error("Illegal css selector prefix " + e)
            }(n),
            function(r, s) {
                var n = e.parse(r)
                  , l = Object.assign({}, n, {
                    stylesheet: t(n.stylesheet, s)
                });
                return e.stringify(l)
            }(r, n)
        }
        return r
    }
});