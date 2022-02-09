define('lib/fluent-bundle-sequence', ["require", "exports", "tslib", "@fluent/bundle"], function(require, e, n, r) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.FluentBundleSequence = e.LocalizableNumericValue = e.RTL_LANGUAGES = void 0,
    e.RTL_LANGUAGES = ["ae", "ar", "arc", "bcc", "bqi", "ckb", "dv", "fa", "glk", "he", "ku", "mzn", "nqo", "pnb", "ps", "sd", "ug", "ur", "yi"];
    var t = function(e) {
        this.value = e
    };
    e.LocalizableNumericValue = t;
    var o = function() {
        function o(e, n) {
            this.bundles = e,
            this.onError = n
        }
        return o.fromSources = function(t, a, i) {
            for (var u = [], l = 0, s = t; l < s.length; l++) {
                var c = s[l]
                  , d = c.lang
                  , f = c.source
                  , h = d.split("-")[0]
                  , m = new r.FluentBundle(d,n.__assign(n.__assign({}, i), {
                    useIsolating: e.RTL_LANGUAGES.indexOf(h) >= 0
                }));
                m.addResource(new r.FluentResource(f), {
                    allowOverrides: !1
                }),
                m.addResource(new r.FluentResource('\nl10n-internal-date-day-month-year = {DATETIME($d, month: "short", day: "numeric", year: "numeric")}\nl10n-internal-date-day-month = {DATETIME($d, month: "short", day: "numeric")}\nl10n-internal-time = {DATETIME($d, minute: "numeric", hour: "numeric")}\n      '), {
                    allowOverrides: !1
                }),
                u.push(m)
            }
            return new o(u,a)
        }
        ,
        o.prototype.format = function(e, n) {
            for (var r = 0, t = this.bundles; r < t.length; r++) {
                var o = t[r];
                if (o.hasMessage(e)) {
                    var a = o.getMessage(e);
                    if (!(null == a ? void 0 : a.value))
                        return;
                    for (var i = [], u = o.formatPattern(a.value, this.coerceNumericVariables(n), i), l = 0, s = i; l < s.length; l++) {
                        var c = s[l];
                        this.onError("Error formatting " + e + " for locale " + o.locales.join(",") + ": " + c)
                    }
                    return u
                }
            }
            this.onError("Couldn't find message for key " + e + " for locales " + this.getLocales().join(","))
        }
        ,
        o.prototype.formatDate = function(e, n) {
            return n.showYear ? this.format("l10n-internal-date-day-month-year", {
                d: e
            }) : this.format("l10n-internal-date-day-month", {
                d: e
            })
        }
        ,
        o.prototype.formatTime = function(e) {
            var n = this.format("l10n-internal-time", {
                d: e
            });
            return "en" === this.getLocales()[0] ? null == n ? void 0 : n.toLowerCase() : n
        }
        ,
        o.prototype.hasTranslation = function(e, n) {
            for (var r = 0, t = this.bundles; r < t.length; r++) {
                var o = t[r];
                if (o.locales.indexOf(n) >= 0)
                    return o.hasMessage(e)
            }
            return !1
        }
        ,
        o.prototype.coerceNumericVariables = function(e) {
            var n = {};
            for (var r in e) {
                var o = e[r];
                n[r] = o instanceof t ? o.value : "number" == typeof o ? "" + o : o
            }
            return n
        }
        ,
        o.prototype.getLocales = function() {
            return this.bundles.reduce(function(e, n) {
                return e.concat(n.locales)
            }, [])
        }
        ,
        o
    }();
    e.FluentBundleSequence = o
});