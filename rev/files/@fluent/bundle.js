define('@fluent/bundle', ["exports"], function(r) {
    "use strict";
    var e = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    function n(r) {
        return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r
    }
    function t(r) {
        if (r.__esModule)
            return r;
        var e = Object.defineProperty({}, "__esModule", {
            value: !0
        });
        return Object.keys(r).forEach(function(n) {
            var t = Object.getOwnPropertyDescriptor(r, n);
            Object.defineProperty(e, n, t.get ? t : {
                enumerable: !0,
                get: function() {
                    return r[n]
                }
            })
        }),
        e
    }
    function o(r) {
        return (o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
            return typeof r
        }
        : function(r) {
            return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r
        }
        )(r)
    }
    function i(r, e) {
        if (!(r instanceof e))
            throw new TypeError("Cannot call a class as a function")
    }
    function a(r, e) {
        for (var n = 0; n < e.length; n++) {
            var t = e[n];
            t.enumerable = t.enumerable || !1,
            t.configurable = !0,
            "value"in t && (t.writable = !0),
            Object.defineProperty(r, t.key, t)
        }
    }
    function u(r, e, n) {
        return e && a(r.prototype, e),
        n && a(r, n),
        r
    }
    var s = function(r) {
        if (!r)
            return [];
        Array.isArray(r) || (r = [r]);
        for (var e = {}, n = 0; n < r.length; ++n) {
            var t = r[n];
            if (t && "object" === o(t) && (t = String(t)),
            "string" != typeof t) {
                var i = "Locales should be strings, ".concat(JSON.stringify(t), " isn't.");
                throw new TypeError(i)
            }
            if ("*" !== t[0]) {
                if (!t.split("-").every(function(r) {
                    return /[a-z0-9]+/i.test(r)
                })) {
                    var a = JSON.stringify(t)
                      , u = "The locale ".concat(a, " is not a structurally valid BCP 47 language tag.");
                    throw new RangeError(u)
                }
                e[t] = !0
            }
        }
        return Object.keys(e)
    }
      , l = function(r) {
        if (!r)
            return "cardinal";
        if ("cardinal" === r || "ordinal" === r)
            return r;
        throw new RangeError("Not a valid plural type: " + JSON.stringify(r))
    };
    var c = Object.freeze({
        __proto__: null,
        default: function(r, e, n) {
            var t = function(r) {
                do {
                    if (e(r))
                        return r;
                    r = r.replace(/-?[^-]*$/, "")
                } while (r);
                return null
            }
              , o = function(r) {
                for (var e = s(r), n = 0; n < e.length; ++n) {
                    var o = t(e[n]);
                    if (o)
                        return o
                }
                return t("undefined" != typeof navigator && navigator && (navigator.userLanguage || navigator.language) || "en-US")
            }
              , a = function() {
                function a(n) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    i(this, a),
                    this._locale = o(n),
                    this._select = e(this._locale),
                    this._type = l(t.type),
                    this._nf = new r("en",t)
                }
                return u(a, null, [{
                    key: "supportedLocalesOf",
                    value: function(r) {
                        return s(r).filter(t)
                    }
                }]),
                u(a, [{
                    key: "resolvedOptions",
                    value: function() {
                        var r = this._nf.resolvedOptions()
                          , e = r.minimumIntegerDigits
                          , t = r.minimumFractionDigits
                          , o = r.maximumFractionDigits
                          , i = r.minimumSignificantDigits
                          , a = r.maximumSignificantDigits
                          , u = {
                            locale: this._locale,
                            minimumIntegerDigits: e,
                            minimumFractionDigits: t,
                            maximumFractionDigits: o,
                            pluralCategories: n(this._locale, "ordinal" === this._type),
                            type: this._type
                        };
                        return "number" == typeof i && (u.minimumSignificantDigits = i,
                        u.maximumSignificantDigits = a),
                        u
                    }
                }, {
                    key: "select",
                    value: function(r) {
                        if (!(this instanceof a))
                            throw new TypeError("select() called on incompatible ".concat(this));
                        if ("number" != typeof r && (r = Number(r)),
                        !isFinite(r))
                            return "other";
                        var e = this._nf.format(Math.abs(r));
                        return this._select(e, "ordinal" === this._type)
                    }
                }]),
                a
            }();
            return Object.defineProperty(a, "prototype", {
                writable: !1
            }),
            a
        }
    });
    function f(r, e) {
        for (var n = 0; n < e.length; n++) {
            var t = e[n];
            t.enumerable = t.enumerable || !1,
            t.configurable = !0,
            "value"in t && (t.writable = !0),
            Object.defineProperty(r, t.key, t)
        }
    }
    var h, m, p = function() {
        function r(e, n) {
            var t = n.minimumIntegerDigits
              , o = n.minimumFractionDigits
              , i = n.maximumFractionDigits
              , a = n.minimumSignificantDigits
              , u = n.maximumSignificantDigits;
            !function(r, e) {
                if (!(r instanceof e))
                    throw new TypeError("Cannot call a class as a function")
            }(this, r),
            this._minID = "number" == typeof t ? t : 1,
            this._minFD = "number" == typeof o ? o : 0,
            this._maxFD = "number" == typeof i ? i : Math.max(this._minFD, 3),
            "number" != typeof a && "number" != typeof u || (this._minSD = "number" == typeof a ? a : 1,
            this._maxSD = "number" == typeof u ? u : 21)
        }
        var e, n, t;
        return e = r,
        (n = [{
            key: "resolvedOptions",
            value: function() {
                var r = {
                    minimumIntegerDigits: this._minID,
                    minimumFractionDigits: this._minFD,
                    maximumFractionDigits: this._maxFD
                };
                return "number" == typeof this._minSD && (r.minimumSignificantDigits = this._minSD,
                r.maximumSignificantDigits = this._maxSD),
                r
            }
        }, {
            key: "format",
            value: function(r) {
                if (this._minSD) {
                    for (var e = String(r), n = 0, t = 0; t < e.length; ++t) {
                        var o = e[t];
                        o >= "0" && o <= "9" && ++n
                    }
                    return n < this._minSD ? r.toPrecision(this._minSD) : n > this._maxSD ? r.toPrecision(this._maxSD) : e
                }
                return this._minFD > 0 ? r.toFixed(this._minFD) : 0 === this._maxFD ? r.toFixed(0) : String(r)
            }
        }]) && f(e.prototype, n),
        t && f(e, t),
        r
    }(), d = t(c), y = n((function(r) {
        function n(r) {
            return r && "object" == typeof r && "default"in r ? r : {
                default: r
            }
        }
        var t = n(d)
          , o = n(p);
        function i(r) {
            return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(r) {
                return typeof r
            }
            : function(r) {
                return r && "function" == typeof Symbol && r.constructor === Symbol && r !== Symbol.prototype ? "symbol" : typeof r
            }
            )(r)
        }
        function a(r) {
            return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r
        }
        function u(r, e, n) {
            return r(n = {
                path: e,
                exports: {},
                require: function(r, e) {
                    return function() {
                        throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
                    }(null == e && n.path)
                }
            }, n.exports),
            n.exports
        }
        "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : void 0 !== e || "undefined" != typeof self && self;
        var s = u(function(r, e) {
            function n(r, e) {
                return e ? "other" : 1 == r ? "one" : "other"
            }
            function t(r, e) {
                return e ? "other" : 0 == r || 1 == r ? "one" : "other"
            }
            function o(r, e) {
                var n = !String(r).split(".")[1];
                return e ? "other" : 1 == r && n ? "one" : "other"
            }
            function i(r, e) {
                return "other"
            }
            function a(r, e) {
                return e ? "other" : 1 == r ? "one" : 2 == r ? "two" : "other"
            }
            !function(e, n) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }),
                r.exports = n
            }(0, {
                _in: i,
                af: n,
                ak: t,
                am: function(r, e) {
                    return e ? "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                an: n,
                ar: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r && n[0].slice(-2);
                    return e ? "other" : 0 == r ? "zero" : 1 == r ? "one" : 2 == r ? "two" : t >= 3 && t <= 10 ? "few" : t >= 11 && t <= 99 ? "many" : "other"
                },
                ars: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r && n[0].slice(-2);
                    return e ? "other" : 0 == r ? "zero" : 1 == r ? "one" : 2 == r ? "two" : t >= 3 && t <= 10 ? "few" : t >= 11 && t <= 99 ? "many" : "other"
                },
                as: function(r, e) {
                    return e ? 1 == r || 5 == r || 7 == r || 8 == r || 9 == r || 10 == r ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : 6 == r ? "many" : "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                asa: n,
                ast: o,
                az: function(r, e) {
                    var n = String(r).split(".")[0]
                      , t = n.slice(-1)
                      , o = n.slice(-2)
                      , i = n.slice(-3);
                    return e ? 1 == t || 2 == t || 5 == t || 7 == t || 8 == t || 20 == o || 50 == o || 70 == o || 80 == o ? "one" : 3 == t || 4 == t || 100 == i || 200 == i || 300 == i || 400 == i || 500 == i || 600 == i || 700 == i || 800 == i || 900 == i ? "few" : 0 == n || 6 == t || 40 == o || 60 == o || 90 == o ? "many" : "other" : 1 == r ? "one" : "other"
                },
                be: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r
                      , o = t && n[0].slice(-1)
                      , i = t && n[0].slice(-2);
                    return e ? 2 != o && 3 != o || 12 == i || 13 == i ? "other" : "few" : 1 == o && 11 != i ? "one" : o >= 2 && o <= 4 && (i < 12 || i > 14) ? "few" : t && 0 == o || o >= 5 && o <= 9 || i >= 11 && i <= 14 ? "many" : "other"
                },
                bem: n,
                bez: n,
                bg: n,
                bho: t,
                bm: i,
                bn: function(r, e) {
                    return e ? 1 == r || 5 == r || 7 == r || 8 == r || 9 == r || 10 == r ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : 6 == r ? "many" : "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                bo: i,
                br: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r
                      , o = t && n[0].slice(-1)
                      , i = t && n[0].slice(-2)
                      , a = t && n[0].slice(-6);
                    return e ? "other" : 1 == o && 11 != i && 71 != i && 91 != i ? "one" : 2 == o && 12 != i && 72 != i && 92 != i ? "two" : (3 == o || 4 == o || 9 == o) && (i < 10 || i > 19) && (i < 70 || i > 79) && (i < 90 || i > 99) ? "few" : 0 != r && t && 0 == a ? "many" : "other"
                },
                brx: n,
                bs: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = t.slice(-2)
                      , s = o.slice(-1)
                      , l = o.slice(-2);
                    return e ? "other" : i && 1 == a && 11 != u || 1 == s && 11 != l ? "one" : i && a >= 2 && a <= 4 && (u < 12 || u > 14) || s >= 2 && s <= 4 && (l < 12 || l > 14) ? "few" : "other"
                },
                ca: function(r, e) {
                    var n = !String(r).split(".")[1];
                    return e ? 1 == r || 3 == r ? "one" : 2 == r ? "two" : 4 == r ? "few" : "other" : 1 == r && n ? "one" : "other"
                },
                ce: n,
                ceb: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = o.slice(-1);
                    return e ? "other" : i && (1 == t || 2 == t || 3 == t) || i && 4 != a && 6 != a && 9 != a || !i && 4 != u && 6 != u && 9 != u ? "one" : "other"
                },
                cgg: n,
                chr: n,
                ckb: n,
                cs: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1];
                    return e ? "other" : 1 == r && o ? "one" : t >= 2 && t <= 4 && o ? "few" : o ? "other" : "many"
                },
                cy: function(r, e) {
                    return e ? 0 == r || 7 == r || 8 == r || 9 == r ? "zero" : 1 == r ? "one" : 2 == r ? "two" : 3 == r || 4 == r ? "few" : 5 == r || 6 == r ? "many" : "other" : 0 == r ? "zero" : 1 == r ? "one" : 2 == r ? "two" : 3 == r ? "few" : 6 == r ? "many" : "other"
                },
                da: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = Number(n[0]) == r;
                    return e || 1 != r && (o || 0 != t && 1 != t) ? "other" : "one"
                },
                de: o,
                dsb: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-2)
                      , u = o.slice(-2);
                    return e ? "other" : i && 1 == a || 1 == u ? "one" : i && 2 == a || 2 == u ? "two" : i && (3 == a || 4 == a) || 3 == u || 4 == u ? "few" : "other"
                },
                dv: n,
                dz: i,
                ee: n,
                el: n,
                en: function(r, e) {
                    var n = String(r).split(".")
                      , t = !n[1]
                      , o = Number(n[0]) == r
                      , i = o && n[0].slice(-1)
                      , a = o && n[0].slice(-2);
                    return e ? 1 == i && 11 != a ? "one" : 2 == i && 12 != a ? "two" : 3 == i && 13 != a ? "few" : "other" : 1 == r && t ? "one" : "other"
                },
                eo: n,
                es: n,
                et: o,
                eu: n,
                fa: function(r, e) {
                    return e ? "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                ff: function(r, e) {
                    return e ? "other" : r >= 0 && r < 2 ? "one" : "other"
                },
                fi: o,
                fil: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = o.slice(-1);
                    return e ? 1 == r ? "one" : "other" : i && (1 == t || 2 == t || 3 == t) || i && 4 != a && 6 != a && 9 != a || !i && 4 != u && 6 != u && 9 != u ? "one" : "other"
                },
                fo: n,
                fr: function(r, e) {
                    return e ? 1 == r ? "one" : "other" : r >= 0 && r < 2 ? "one" : "other"
                },
                fur: n,
                fy: o,
                ga: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? 1 == r ? "one" : "other" : 1 == r ? "one" : 2 == r ? "two" : t && r >= 3 && r <= 6 ? "few" : t && r >= 7 && r <= 10 ? "many" : "other"
                },
                gd: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? 1 == r || 11 == r ? "one" : 2 == r || 12 == r ? "two" : 3 == r || 13 == r ? "few" : "other" : 1 == r || 11 == r ? "one" : 2 == r || 12 == r ? "two" : t && r >= 3 && r <= 10 || t && r >= 13 && r <= 19 ? "few" : "other"
                },
                gl: o,
                gsw: n,
                gu: function(r, e) {
                    return e ? 1 == r ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : 6 == r ? "many" : "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                guw: t,
                gv: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = t.slice(-1)
                      , a = t.slice(-2);
                    return e ? "other" : o && 1 == i ? "one" : o && 2 == i ? "two" : !o || 0 != a && 20 != a && 40 != a && 60 != a && 80 != a ? o ? "other" : "many" : "few"
                },
                ha: n,
                haw: n,
                he: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = Number(n[0]) == r
                      , a = i && n[0].slice(-1);
                    return e ? "other" : 1 == r && o ? "one" : 2 == t && o ? "two" : o && (r < 0 || r > 10) && i && 0 == a ? "many" : "other"
                },
                hi: function(r, e) {
                    return e ? 1 == r ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : 6 == r ? "many" : "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                hr: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = t.slice(-2)
                      , s = o.slice(-1)
                      , l = o.slice(-2);
                    return e ? "other" : i && 1 == a && 11 != u || 1 == s && 11 != l ? "one" : i && a >= 2 && a <= 4 && (u < 12 || u > 14) || s >= 2 && s <= 4 && (l < 12 || l > 14) ? "few" : "other"
                },
                hsb: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-2)
                      , u = o.slice(-2);
                    return e ? "other" : i && 1 == a || 1 == u ? "one" : i && 2 == a || 2 == u ? "two" : i && (3 == a || 4 == a) || 3 == u || 4 == u ? "few" : "other"
                },
                hu: function(r, e) {
                    return e ? 1 == r || 5 == r ? "one" : "other" : 1 == r ? "one" : "other"
                },
                hy: function(r, e) {
                    return e ? 1 == r ? "one" : "other" : r >= 0 && r < 2 ? "one" : "other"
                },
                ia: o,
                id: i,
                ig: i,
                ii: i,
                io: o,
                is: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = Number(n[0]) == r
                      , i = t.slice(-1)
                      , a = t.slice(-2);
                    return e ? "other" : o && 1 == i && 11 != a || !o ? "one" : "other"
                },
                it: function(r, e) {
                    var n = !String(r).split(".")[1];
                    return e ? 11 == r || 8 == r || 80 == r || 800 == r ? "many" : "other" : 1 == r && n ? "one" : "other"
                },
                iu: a,
                iw: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = Number(n[0]) == r
                      , a = i && n[0].slice(-1);
                    return e ? "other" : 1 == r && o ? "one" : 2 == t && o ? "two" : o && (r < 0 || r > 10) && i && 0 == a ? "many" : "other"
                },
                ja: i,
                jbo: i,
                jgo: n,
                ji: o,
                jmc: n,
                jv: i,
                jw: i,
                ka: function(r, e) {
                    var n = String(r).split(".")[0]
                      , t = n.slice(-2);
                    return e ? 1 == n ? "one" : 0 == n || t >= 2 && t <= 20 || 40 == t || 60 == t || 80 == t ? "many" : "other" : 1 == r ? "one" : "other"
                },
                kab: function(r, e) {
                    return e ? "other" : r >= 0 && r < 2 ? "one" : "other"
                },
                kaj: n,
                kcg: n,
                kde: i,
                kea: i,
                kk: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r
                      , o = t && n[0].slice(-1);
                    return e ? 6 == o || 9 == o || t && 0 == o && 0 != r ? "many" : "other" : 1 == r ? "one" : "other"
                },
                kkj: n,
                kl: n,
                km: i,
                kn: function(r, e) {
                    return e ? "other" : r >= 0 && r <= 1 ? "one" : "other"
                },
                ko: i,
                ks: n,
                ksb: n,
                ksh: function(r, e) {
                    return e ? "other" : 0 == r ? "zero" : 1 == r ? "one" : "other"
                },
                ku: n,
                kw: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r
                      , o = t && n[0].slice(-2)
                      , i = t && n[0].slice(-3)
                      , a = t && n[0].slice(-5)
                      , u = t && n[0].slice(-6);
                    return e ? t && r >= 1 && r <= 4 || o >= 1 && o <= 4 || o >= 21 && o <= 24 || o >= 41 && o <= 44 || o >= 61 && o <= 64 || o >= 81 && o <= 84 ? "one" : 5 == r || 5 == o ? "many" : "other" : 0 == r ? "zero" : 1 == r ? "one" : 2 == o || 22 == o || 42 == o || 62 == o || 82 == o || t && 0 == i && (a >= 1e3 && a <= 2e4 || 4e4 == a || 6e4 == a || 8e4 == a) || 0 != r && 1e5 == u ? "two" : 3 == o || 23 == o || 43 == o || 63 == o || 83 == o ? "few" : 1 == r || 1 != o && 21 != o && 41 != o && 61 != o && 81 != o ? "other" : "many"
                },
                ky: n,
                lag: function(r, e) {
                    var n = String(r).split(".")[0];
                    return e ? "other" : 0 == r ? "zero" : 0 != n && 1 != n || 0 == r ? "other" : "one"
                },
                lb: n,
                lg: n,
                lkt: i,
                ln: t,
                lo: function(r, e) {
                    return e && 1 == r ? "one" : "other"
                },
                lt: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[1] || ""
                      , o = Number(n[0]) == r
                      , i = o && n[0].slice(-1)
                      , a = o && n[0].slice(-2);
                    return e ? "other" : 1 == i && (a < 11 || a > 19) ? "one" : i >= 2 && i <= 9 && (a < 11 || a > 19) ? "few" : 0 != t ? "many" : "other"
                },
                lv: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[1] || ""
                      , o = t.length
                      , i = Number(n[0]) == r
                      , a = i && n[0].slice(-1)
                      , u = i && n[0].slice(-2)
                      , s = t.slice(-2)
                      , l = t.slice(-1);
                    return e ? "other" : i && 0 == a || u >= 11 && u <= 19 || 2 == o && s >= 11 && s <= 19 ? "zero" : 1 == a && 11 != u || 2 == o && 1 == l && 11 != s || 2 != o && 1 == l ? "one" : "other"
                },
                mas: n,
                mg: t,
                mgo: n,
                mk: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = t.slice(-2)
                      , s = o.slice(-1)
                      , l = o.slice(-2);
                    return e ? 1 == a && 11 != u ? "one" : 2 == a && 12 != u ? "two" : 7 != a && 8 != a || 17 == u || 18 == u ? "other" : "many" : i && 1 == a && 11 != u || 1 == s && 11 != l ? "one" : "other"
                },
                ml: n,
                mn: n,
                mo: function(r, e) {
                    var n = String(r).split(".")
                      , t = !n[1]
                      , o = Number(n[0]) == r && n[0].slice(-2);
                    return e ? 1 == r ? "one" : "other" : 1 == r && t ? "one" : !t || 0 == r || o >= 2 && o <= 19 ? "few" : "other"
                },
                mr: function(r, e) {
                    return e ? 1 == r ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : "other" : 1 == r ? "one" : "other"
                },
                ms: function(r, e) {
                    return e && 1 == r ? "one" : "other"
                },
                mt: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r && n[0].slice(-2);
                    return e ? "other" : 1 == r ? "one" : 0 == r || t >= 2 && t <= 10 ? "few" : t >= 11 && t <= 19 ? "many" : "other"
                },
                my: i,
                nah: n,
                naq: a,
                nb: n,
                nd: n,
                ne: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? t && r >= 1 && r <= 4 ? "one" : "other" : 1 == r ? "one" : "other"
                },
                nl: o,
                nn: n,
                nnh: n,
                no: n,
                nqo: i,
                nr: n,
                nso: t,
                ny: n,
                nyn: n,
                om: n,
                or: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? 1 == r || 5 == r || t && r >= 7 && r <= 9 ? "one" : 2 == r || 3 == r ? "two" : 4 == r ? "few" : 6 == r ? "many" : "other" : 1 == r ? "one" : "other"
                },
                os: n,
                osa: i,
                pa: t,
                pap: n,
                pl: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = t.slice(-1)
                      , a = t.slice(-2);
                    return e ? "other" : 1 == r && o ? "one" : o && i >= 2 && i <= 4 && (a < 12 || a > 14) ? "few" : o && 1 != t && (0 == i || 1 == i) || o && i >= 5 && i <= 9 || o && a >= 12 && a <= 14 ? "many" : "other"
                },
                prg: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[1] || ""
                      , o = t.length
                      , i = Number(n[0]) == r
                      , a = i && n[0].slice(-1)
                      , u = i && n[0].slice(-2)
                      , s = t.slice(-2)
                      , l = t.slice(-1);
                    return e ? "other" : i && 0 == a || u >= 11 && u <= 19 || 2 == o && s >= 11 && s <= 19 ? "zero" : 1 == a && 11 != u || 2 == o && 1 == l && 11 != s || 2 != o && 1 == l ? "one" : "other"
                },
                ps: n,
                pt: function(r, e) {
                    var n = String(r).split(".")[0];
                    return e ? "other" : 0 == n || 1 == n ? "one" : "other"
                },
                pt_PT: o,
                rm: n,
                ro: function(r, e) {
                    var n = String(r).split(".")
                      , t = !n[1]
                      , o = Number(n[0]) == r && n[0].slice(-2);
                    return e ? 1 == r ? "one" : "other" : 1 == r && t ? "one" : !t || 0 == r || o >= 2 && o <= 19 ? "few" : "other"
                },
                rof: n,
                root: i,
                ru: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = t.slice(-1)
                      , a = t.slice(-2);
                    return e ? "other" : o && 1 == i && 11 != a ? "one" : o && i >= 2 && i <= 4 && (a < 12 || a > 14) ? "few" : o && 0 == i || o && i >= 5 && i <= 9 || o && a >= 11 && a <= 14 ? "many" : "other"
                },
                rwk: n,
                sah: i,
                saq: n,
                sc: function(r, e) {
                    var n = !String(r).split(".")[1];
                    return e ? 11 == r || 8 == r || 80 == r || 800 == r ? "many" : "other" : 1 == r && n ? "one" : "other"
                },
                scn: function(r, e) {
                    var n = !String(r).split(".")[1];
                    return e ? 11 == r || 8 == r || 80 == r || 800 == r ? "many" : "other" : 1 == r && n ? "one" : "other"
                },
                sd: n,
                sdh: n,
                se: a,
                seh: n,
                ses: i,
                sg: i,
                sh: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = t.slice(-2)
                      , s = o.slice(-1)
                      , l = o.slice(-2);
                    return e ? "other" : i && 1 == a && 11 != u || 1 == s && 11 != l ? "one" : i && a >= 2 && a <= 4 && (u < 12 || u > 14) || s >= 2 && s <= 4 && (l < 12 || l > 14) ? "few" : "other"
                },
                shi: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? "other" : r >= 0 && r <= 1 ? "one" : t && r >= 2 && r <= 10 ? "few" : "other"
                },
                si: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || "";
                    return e ? "other" : 0 == r || 1 == r || 0 == t && 1 == o ? "one" : "other"
                },
                sk: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1];
                    return e ? "other" : 1 == r && o ? "one" : t >= 2 && t <= 4 && o ? "few" : o ? "other" : "many"
                },
                sl: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = t.slice(-2);
                    return e ? "other" : o && 1 == i ? "one" : o && 2 == i ? "two" : o && (3 == i || 4 == i) || !o ? "few" : "other"
                },
                sma: a,
                smi: a,
                smj: a,
                smn: a,
                sms: a,
                sn: n,
                so: n,
                sq: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r
                      , o = t && n[0].slice(-1)
                      , i = t && n[0].slice(-2);
                    return e ? 1 == r ? "one" : 4 == o && 14 != i ? "many" : "other" : 1 == r ? "one" : "other"
                },
                sr: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = t.slice(-2)
                      , s = o.slice(-1)
                      , l = o.slice(-2);
                    return e ? "other" : i && 1 == a && 11 != u || 1 == s && 11 != l ? "one" : i && a >= 2 && a <= 4 && (u < 12 || u > 14) || s >= 2 && s <= 4 && (l < 12 || l > 14) ? "few" : "other"
                },
                ss: n,
                ssy: n,
                st: n,
                su: i,
                sv: function(r, e) {
                    var n = String(r).split(".")
                      , t = !n[1]
                      , o = Number(n[0]) == r
                      , i = o && n[0].slice(-1)
                      , a = o && n[0].slice(-2);
                    return e ? 1 != i && 2 != i || 11 == a || 12 == a ? "other" : "one" : 1 == r && t ? "one" : "other"
                },
                sw: o,
                syr: n,
                ta: n,
                te: n,
                teo: n,
                th: i,
                ti: t,
                tig: n,
                tk: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r && n[0].slice(-1);
                    return e ? 6 == t || 9 == t || 10 == r ? "few" : "other" : 1 == r ? "one" : "other"
                },
                tl: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = n[1] || ""
                      , i = !n[1]
                      , a = t.slice(-1)
                      , u = o.slice(-1);
                    return e ? 1 == r ? "one" : "other" : i && (1 == t || 2 == t || 3 == t) || i && 4 != a && 6 != a && 9 != a || !i && 4 != u && 6 != u && 9 != u ? "one" : "other"
                },
                tn: n,
                to: i,
                tr: n,
                ts: n,
                tzm: function(r, e) {
                    var n = String(r).split(".")
                      , t = Number(n[0]) == r;
                    return e ? "other" : 0 == r || 1 == r || t && r >= 11 && r <= 99 ? "one" : "other"
                },
                ug: n,
                uk: function(r, e) {
                    var n = String(r).split(".")
                      , t = n[0]
                      , o = !n[1]
                      , i = Number(n[0]) == r
                      , a = i && n[0].slice(-1)
                      , u = i && n[0].slice(-2)
                      , s = t.slice(-1)
                      , l = t.slice(-2);
                    return e ? 3 == a && 13 != u ? "few" : "other" : o && 1 == s && 11 != l ? "one" : o && s >= 2 && s <= 4 && (l < 12 || l > 14) ? "few" : o && 0 == s || o && s >= 5 && s <= 9 || o && l >= 11 && l <= 14 ? "many" : "other"
                },
                ur: o,
                uz: n,
                ve: n,
                vi: function(r, e) {
                    return e && 1 == r ? "one" : "other"
                },
                vo: n,
                vun: n,
                wa: t,
                wae: n,
                wo: i,
                xh: n,
                xog: n,
                yi: o,
                yo: i,
                yue: i,
                zh: i,
                zu: function(r, e) {
                    return e ? "other" : r >= 0 && r <= 1 ? "one" : "other"
                }
            })
        })
          , l = a(s)
          , c = Object.freeze(Object.assign(Object.create(null), s, {
            default: l
        }))
          , f = u(function(r, e) {
            var n = "zero"
              , t = "one"
              , o = "two"
              , i = "few"
              , a = "many"
              , u = "other"
              , s = {
                cardinal: [t, u],
                ordinal: [u]
            }
              , l = {
                cardinal: [u],
                ordinal: [u]
            }
              , c = {
                cardinal: [t, i, a, u],
                ordinal: [u]
            }
              , f = {
                cardinal: [t, u],
                ordinal: [t, u]
            }
              , h = {
                cardinal: [t, o, u],
                ordinal: [u]
            };
            !function(e, n) {
                Object.defineProperty(n, "__esModule", {
                    value: !0
                }),
                r.exports = n
            }(0, {
                _in: l,
                af: s,
                ak: s,
                am: s,
                an: s,
                ar: {
                    cardinal: [n, t, o, i, a, u],
                    ordinal: [u]
                },
                ars: {
                    cardinal: [n, t, o, i, a, u],
                    ordinal: [u]
                },
                as: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, a, u]
                },
                asa: s,
                ast: s,
                az: {
                    cardinal: [t, u],
                    ordinal: [t, i, a, u]
                },
                be: {
                    cardinal: [t, i, a, u],
                    ordinal: [i, u]
                },
                bem: s,
                bez: s,
                bg: s,
                bho: s,
                bm: l,
                bn: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, a, u]
                },
                bo: l,
                br: {
                    cardinal: [t, o, i, a, u],
                    ordinal: [u]
                },
                brx: s,
                bs: {
                    cardinal: [t, i, u],
                    ordinal: [u]
                },
                ca: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, u]
                },
                ce: s,
                ceb: s,
                cgg: s,
                chr: s,
                ckb: s,
                cs: c,
                cy: {
                    cardinal: [n, t, o, i, a, u],
                    ordinal: [n, t, o, i, a, u]
                },
                da: s,
                de: s,
                dsb: {
                    cardinal: [t, o, i, u],
                    ordinal: [u]
                },
                dv: s,
                dz: l,
                ee: s,
                el: s,
                en: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, u]
                },
                eo: s,
                es: s,
                et: s,
                eu: s,
                fa: s,
                ff: s,
                fi: s,
                fil: f,
                fo: s,
                fr: f,
                fur: s,
                fy: s,
                ga: {
                    cardinal: [t, o, i, a, u],
                    ordinal: [t, u]
                },
                gd: {
                    cardinal: [t, o, i, u],
                    ordinal: [t, o, i, u]
                },
                gl: s,
                gsw: s,
                gu: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, a, u]
                },
                guw: s,
                gv: {
                    cardinal: [t, o, i, a, u],
                    ordinal: [u]
                },
                ha: s,
                haw: s,
                he: {
                    cardinal: [t, o, a, u],
                    ordinal: [u]
                },
                hi: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, a, u]
                },
                hr: {
                    cardinal: [t, i, u],
                    ordinal: [u]
                },
                hsb: {
                    cardinal: [t, o, i, u],
                    ordinal: [u]
                },
                hu: f,
                hy: f,
                ia: s,
                id: l,
                ig: l,
                ii: l,
                io: s,
                is: s,
                it: {
                    cardinal: [t, u],
                    ordinal: [a, u]
                },
                iu: h,
                iw: {
                    cardinal: [t, o, a, u],
                    ordinal: [u]
                },
                ja: l,
                jbo: l,
                jgo: s,
                ji: s,
                jmc: s,
                jv: l,
                jw: l,
                ka: {
                    cardinal: [t, u],
                    ordinal: [t, a, u]
                },
                kab: s,
                kaj: s,
                kcg: s,
                kde: l,
                kea: l,
                kk: {
                    cardinal: [t, u],
                    ordinal: [a, u]
                },
                kkj: s,
                kl: s,
                km: l,
                kn: s,
                ko: l,
                ks: s,
                ksb: s,
                ksh: {
                    cardinal: [n, t, u],
                    ordinal: [u]
                },
                ku: s,
                kw: {
                    cardinal: [n, t, o, i, a, u],
                    ordinal: [t, a, u]
                },
                ky: s,
                lag: {
                    cardinal: [n, t, u],
                    ordinal: [u]
                },
                lb: s,
                lg: s,
                lkt: l,
                ln: s,
                lo: {
                    cardinal: [u],
                    ordinal: [t, u]
                },
                lt: c,
                lv: {
                    cardinal: [n, t, u],
                    ordinal: [u]
                },
                mas: s,
                mg: s,
                mgo: s,
                mk: {
                    cardinal: [t, u],
                    ordinal: [t, o, a, u]
                },
                ml: s,
                mn: s,
                mo: {
                    cardinal: [t, i, u],
                    ordinal: [t, u]
                },
                mr: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, u]
                },
                ms: {
                    cardinal: [u],
                    ordinal: [t, u]
                },
                mt: c,
                my: l,
                nah: s,
                naq: h,
                nb: s,
                nd: s,
                ne: f,
                nl: s,
                nn: s,
                nnh: s,
                no: s,
                nqo: l,
                nr: s,
                nso: s,
                ny: s,
                nyn: s,
                om: s,
                or: {
                    cardinal: [t, u],
                    ordinal: [t, o, i, a, u]
                },
                os: s,
                osa: l,
                pa: s,
                pap: s,
                pl: c,
                prg: {
                    cardinal: [n, t, u],
                    ordinal: [u]
                },
                ps: s,
                pt: s,
                pt_PT: s,
                rm: s,
                ro: {
                    cardinal: [t, i, u],
                    ordinal: [t, u]
                },
                rof: s,
                root: l,
                ru: c,
                rwk: s,
                sah: l,
                saq: s,
                sc: {
                    cardinal: [t, u],
                    ordinal: [a, u]
                },
                scn: {
                    cardinal: [t, u],
                    ordinal: [a, u]
                },
                sd: s,
                sdh: s,
                se: h,
                seh: s,
                ses: l,
                sg: l,
                sh: {
                    cardinal: [t, i, u],
                    ordinal: [u]
                },
                shi: {
                    cardinal: [t, i, u],
                    ordinal: [u]
                },
                si: s,
                sk: c,
                sl: {
                    cardinal: [t, o, i, u],
                    ordinal: [u]
                },
                sma: h,
                smi: h,
                smj: h,
                smn: h,
                sms: h,
                sn: s,
                so: s,
                sq: {
                    cardinal: [t, u],
                    ordinal: [t, a, u]
                },
                sr: {
                    cardinal: [t, i, u],
                    ordinal: [u]
                },
                ss: s,
                ssy: s,
                st: s,
                su: l,
                sv: f,
                sw: s,
                syr: s,
                ta: s,
                te: s,
                teo: s,
                th: l,
                ti: s,
                tig: s,
                tk: {
                    cardinal: [t, u],
                    ordinal: [i, u]
                },
                tl: f,
                tn: s,
                to: l,
                tr: s,
                ts: s,
                tzm: s,
                ug: s,
                uk: {
                    cardinal: [t, i, a, u],
                    ordinal: [i, u]
                },
                ur: s,
                uz: s,
                ve: s,
                vi: {
                    cardinal: [u],
                    ordinal: [t, u]
                },
                vo: s,
                vun: s,
                wa: s,
                wae: s,
                wo: l,
                xh: s,
                xog: s,
                yi: s,
                yo: l,
                yue: l,
                zh: l,
                zu: s
            })
        })
          , h = a(f)
          , m = l || c
          , y = h || Object.freeze(Object.assign(Object.create(null), f, {
            default: h
        }))
          , g = "object" === ("undefined" == typeof Intl ? "undefined" : i(Intl)) && Intl.NumberFormat || o.default
          , v = function(r) {
            return "in" === r ? "_in" : "pt-PT" === r ? "pt_PT" : r
        }
          , w = t.default(g, function(r) {
            return m[v(r)]
        }, function(r, e) {
            return y[v(r)][e ? "ordinal" : "cardinal"]
        });
        r.exports = w
    }(m = {
        path: h,
        exports: {},
        require: function(r, e) {
            return function() {
                throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")
            }(null == e && m.path)
        }
    }, m.exports),
    m.exports)), g = Intl.PluralRules || y, v = function(r) {
        this.value = r
    };
    v.prototype.valueOf = function() {
        return this.value
    }
    ;
    var w = function(r) {
        function e(e) {
            void 0 === e && (e = "???"),
            r.call(this, e)
        }
        return r && (e.__proto__ = r),
        e.prototype = Object.create(r && r.prototype),
        e.prototype.constructor = e,
        e.prototype.toString = function(r) {
            return "{" + this.value + "}"
        }
        ,
        e
    }(v)
      , b = function(r) {
        function e(e, n) {
            void 0 === n && (n = {}),
            r.call(this, e),
            this.opts = n
        }
        return r && (e.__proto__ = r),
        e.prototype = Object.create(r && r.prototype),
        e.prototype.constructor = e,
        e.prototype.toString = function(r) {
            try {
                return r.memoizeIntlObject(Intl.NumberFormat, this.opts).format(this.value)
            } catch (e) {
                return r.reportError(e),
                this.value.toString(10)
            }
        }
        ,
        e
    }(v)
      , S = function(r) {
        function e(e, n) {
            void 0 === n && (n = {}),
            r.call(this, e),
            this.opts = n
        }
        return r && (e.__proto__ = r),
        e.prototype = Object.create(r && r.prototype),
        e.prototype.constructor = e,
        e.prototype.toString = function(r) {
            try {
                return r.memoizeIntlObject(Intl.DateTimeFormat, this.opts).format(this.value)
            } catch (e) {
                return r.reportError(e),
                new Date(this.value).toISOString()
            }
        }
        ,
        e
    }(v);
    function _(r, e, n) {
        if (n === e)
            return !0;
        if (n instanceof b && e instanceof b && n.value === e.value)
            return !0;
        if (e instanceof b && "string" == typeof n && n === r.memoizeIntlObject(g, e.opts).select(e.value))
            return !0;
        return !1
    }
    function k(r, e, n) {
        return e[n] ? D(r, e[n].value) : (r.reportError(new RangeError("No default")),
        new w)
    }
    function x(r, e) {
        for (var n = [], t = Object.create(null), o = 0, i = e; o < i.length; o += 1) {
            var a = i[o];
            "narg" === a.type ? t[a.name] = E(r, a.value) : n.push(E(r, a))
        }
        return {
            positional: n,
            named: t
        }
    }
    function E(r, e) {
        switch (e.type) {
        case "str":
            return e.value;
        case "num":
            return new b(e.value,{
                minimumFractionDigits: e.precision
            });
        case "var":
            return function(r, e) {
                var n, t = e.name;
                if (r.params) {
                    if (!Object.prototype.hasOwnProperty.call(r.params, t))
                        return new w("$" + t);
                    n = r.params[t]
                } else {
                    if (!r.args || !Object.prototype.hasOwnProperty.call(r.args, t))
                        return r.reportError(new ReferenceError("Unknown variable: $" + t)),
                        new w("$" + t);
                    n = r.args[t]
                }
                if (n instanceof v)
                    return n;
                switch (typeof n) {
                case "string":
                    return n;
                case "number":
                    return new b(n);
                case "object":
                    if (n instanceof Date)
                        return new S(n.getTime());
                default:
                    return r.reportError(new TypeError("Variable type not supported: $" + t + ", " + typeof n)),
                    new w("$" + t)
                }
            }(r, e);
        case "mesg":
            return function(r, e) {
                var n = e.name
                  , t = e.attr
                  , o = r.bundle._messages.get(n);
                if (!o)
                    return r.reportError(new ReferenceError("Unknown message: " + n)),
                    new w(n);
                if (t) {
                    var i = o.attributes[t];
                    return i ? D(r, i) : (r.reportError(new ReferenceError("Unknown attribute: " + t)),
                    new w(n + "." + t))
                }
                if (o.value)
                    return D(r, o.value);
                return r.reportError(new ReferenceError("No value: " + n)),
                new w(n)
            }(r, e);
        case "term":
            return function(r, e) {
                var n = e.name
                  , t = e.attr
                  , o = e.args
                  , i = "-" + n
                  , a = r.bundle._terms.get(i);
                if (!a)
                    return r.reportError(new ReferenceError("Unknown term: " + i)),
                    new w(i);
                if (t) {
                    var u = a.attributes[t];
                    if (u) {
                        r.params = x(r, o).named;
                        var s = D(r, u);
                        return r.params = null,
                        s
                    }
                    return r.reportError(new ReferenceError("Unknown attribute: " + t)),
                    new w(i + "." + t)
                }
                r.params = x(r, o).named;
                var l = D(r, a.value);
                return r.params = null,
                l
            }(r, e);
        case "func":
            return function(r, e) {
                var n = e.name
                  , t = e.args
                  , o = r.bundle._functions[n];
                if (!o)
                    return r.reportError(new ReferenceError("Unknown function: " + n + "()")),
                    new w(n + "()");
                if ("function" != typeof o)
                    return r.reportError(new TypeError("Function " + n + "() is not callable")),
                    new w(n + "()");
                try {
                    var i = x(r, t);
                    return o(i.positional, i.named)
                } catch (e) {
                    return r.reportError(e),
                    new w(n + "()")
                }
            }(r, e);
        case "select":
            return function(r, e) {
                var n = e.selector
                  , t = e.variants
                  , o = e.star
                  , i = E(r, n);
                if (i instanceof w)
                    return k(r, t, o);
                for (var a = 0, u = t; a < u.length; a += 1) {
                    var s = u[a];
                    if (_(r, i, E(r, s.key)))
                        return D(r, s.value)
                }
                return k(r, t, o)
            }(r, e);
        default:
            return new w
        }
    }
    function j(r, e) {
        if (r.dirty.has(e))
            return r.reportError(new RangeError("Cyclic reference")),
            new w;
        r.dirty.add(e);
        for (var n = [], t = r.bundle._useIsolating && e.length > 1, o = 0, i = e; o < i.length; o += 1) {
            var a = i[o];
            if ("string" != typeof a) {
                if (r.placeables++,
                r.placeables > 100)
                    throw r.dirty.delete(e),
                    new RangeError("Too many placeables expanded: " + r.placeables + ", max allowed is 100");
                t && n.push("⁨"),
                n.push(E(r, a).toString(r)),
                t && n.push("⁩")
            } else
                n.push(r.bundle._transform(a))
        }
        return r.dirty.delete(e),
        n.join("")
    }
    function D(r, e) {
        return "string" == typeof e ? r.bundle._transform(e) : j(r, e)
    }
    var O = function(r, e, n) {
        this.dirty = new WeakSet,
        this.params = null,
        this.placeables = 0,
        this.bundle = r,
        this.errors = e,
        this.args = n
    };
    function N(r, e) {
        for (var n = Object.create(null), t = 0, o = Object.entries(r); t < o.length; t += 1) {
            var i = o[t]
              , a = i[0]
              , u = i[1];
            e.includes(a) && (n[a] = u.valueOf())
        }
        return n
    }
    O.prototype.reportError = function(r) {
        if (!this.errors)
            throw r;
        this.errors.push(r)
    }
    ,
    O.prototype.memoizeIntlObject = function(r, e) {
        var n = this.bundle._intls.get(r);
        n || (n = {},
        this.bundle._intls.set(r, n));
        var t = JSON.stringify(e);
        return n[t] || (n[t] = new r(this.bundle.locales,e)),
        n[t]
    }
    ;
    var z = ["unitDisplay", "currencyDisplay", "useGrouping", "minimumIntegerDigits", "minimumFractionDigits", "maximumFractionDigits", "minimumSignificantDigits", "maximumSignificantDigits"];
    function F(r, e) {
        var n = r[0];
        if (n instanceof w)
            return new w("NUMBER(" + n.valueOf() + ")");
        if (n instanceof b || n instanceof S)
            return new b(n.valueOf(),Object.assign({}, n.opts, N(e, z)));
        throw new TypeError("Invalid argument to NUMBER")
    }
    var I = ["dateStyle", "timeStyle", "fractionalSecondDigits", "dayPeriod", "hour12", "weekday", "era", "year", "month", "day", "hour", "minute", "second", "timeZoneName"];
    function T(r, e) {
        var n = r[0];
        if (n instanceof w)
            return new w("DATETIME(" + n.valueOf() + ")");
        if (n instanceof b || n instanceof S)
            return new S(n.valueOf(),Object.assign({}, n.opts, N(e, I)));
        throw new TypeError("Invalid argument to DATETIME")
    }
    var P = function(r, e) {
        void 0 === e && (e = {});
        var n = e.functions
          , t = e.useIsolating;
        void 0 === t && (t = !0);
        var o = e.transform;
        void 0 === o && (o = function(r) {
            return r
        }
        ),
        this._terms = new Map,
        this._messages = new Map,
        this._intls = new WeakMap,
        this.locales = Array.isArray(r) ? r : [r],
        this._functions = Object.assign({}, {
            NUMBER: F,
            DATETIME: T
        }, n),
        this._useIsolating = t,
        this._transform = o
    };
    P.prototype.hasMessage = function(r) {
        return this._messages.has(r)
    }
    ,
    P.prototype.getMessage = function(r) {
        return this._messages.get(r)
    }
    ,
    P.prototype.addResource = function(r, e) {
        void 0 === e && (e = {});
        var n = e.allowOverrides;
        void 0 === n && (n = !1);
        for (var t = [], o = 0; o < r.body.length; o++) {
            var i = r.body[o];
            if (i.id.startsWith("-")) {
                if (!1 === n && this._terms.has(i.id)) {
                    t.push(new Error('Attempt to override an existing term: "' + i.id + '"'));
                    continue
                }
                this._terms.set(i.id, i)
            } else {
                if (!1 === n && this._messages.has(i.id)) {
                    t.push(new Error('Attempt to override an existing message: "' + i.id + '"'));
                    continue
                }
                this._messages.set(i.id, i)
            }
        }
        return t
    }
    ,
    P.prototype.formatPattern = function(r, e, n) {
        if (void 0 === e && (e = null),
        void 0 === n && (n = null),
        "string" == typeof r)
            return this._transform(r);
        var t = new O(this,n,e);
        try {
            return j(t, r).toString(t)
        } catch (r) {
            if (t.errors)
                return t.errors.push(r),
                (new w).toString(t);
            throw r
        }
    }
    ;
    var M = /^(-?[a-zA-Z][\w-]*) *= */gm
      , A = /\.([a-zA-Z][\w-]*) *= */y
      , R = /\*?\[/y
      , U = /(-?[0-9]+(?:\.([0-9]+))?)/y
      , q = /([a-zA-Z][\w-]*)/y
      , $ = /([$-])?([a-zA-Z][\w-]*)(?:\.([a-zA-Z][\w-]*))?/y
      , Z = /^[A-Z][A-Z0-9_-]*$/
      , C = /([^{}\n\r]+)/y
      , B = /([^\\"\n\r]*)/y
      , J = /\\([\\"])/y
      , L = /\\u([a-fA-F0-9]{4})|\\U([a-fA-F0-9]{6})/y
      , W = /^\n+/
      , G = / +$/
      , V = / *\r?\n/g
      , H = /( *)$/
      , K = /{\s*/y
      , Q = /\s*}/y
      , X = /\[\s*/y
      , Y = /\s*] */y
      , rr = /\s*\(\s*/y
      , er = /\s*->\s*/y
      , nr = /\s*:\s*/y
      , tr = /\s*,?\s*/y
      , or = /\s+/y
      , ir = function(r, e) {
        this.value = r,
        this.length = e
    };
    r.FluentBundle = P,
    r.FluentDateTime = S,
    r.FluentNumber = b,
    r.FluentResource = function(r) {
        this.body = [],
        M.lastIndex = 0;
        for (var e = 0; ; ) {
            var n = M.exec(r);
            if (null === n)
                break;
            e = M.lastIndex;
            try {
                this.body.push(s(n[1]))
            } catch (r) {
                if (r instanceof SyntaxError)
                    continue;
                throw r
            }
        }
        function t(n) {
            return n.lastIndex = e,
            n.test(r)
        }
        function o(n, t) {
            if (r[e] === n)
                return e++,
                !0;
            if (t)
                throw new t("Expected " + n);
            return !1
        }
        function i(r, n) {
            if (t(r))
                return e = r.lastIndex,
                !0;
            if (n)
                throw new n("Expected " + r.toString());
            return !1
        }
        function a(n) {
            n.lastIndex = e;
            var t = n.exec(r);
            if (null === t)
                throw new SyntaxError("Expected " + n.toString());
            return e = n.lastIndex,
            t
        }
        function u(r) {
            return a(r)[1]
        }
        function s(r) {
            var e = l()
              , n = function() {
                var r = Object.create(null);
                for (; t(A); ) {
                    var e = u(A)
                      , n = l();
                    if (null === n)
                        throw new SyntaxError("Expected attribute value");
                    r[e] = n
                }
                return r
            }();
            if (null === e && 0 === Object.keys(n).length)
                throw new SyntaxError("Expected message value or attributes");
            return {
                id: r,
                value: e,
                attributes: n
            }
        }
        function l() {
            var n;
            if (t(C) && (n = u(C)),
            "{" === r[e] || "}" === r[e])
                return c(n ? [n] : [], 1 / 0);
            var o = v();
            return o ? n ? c([n, o], o.length) : (o.value = w(o.value, W),
            c([o], o.length)) : n ? w(n, G) : null
        }
        function c(n, o) {
            for (void 0 === n && (n = []); ; )
                if (t(C))
                    n.push(u(C));
                else if ("{" !== r[e]) {
                    if ("}" === r[e])
                        throw new SyntaxError("Unbalanced closing brace");
                    var i = v();
                    if (!i)
                        break;
                    n.push(i),
                    o = Math.min(o, i.length)
                } else
                    n.push(f());
            var a = n.length - 1
              , s = n[a];
            "string" == typeof s && (n[a] = w(s, G));
            for (var l = [], c = 0, h = n; c < h.length; c += 1) {
                var m = h[c];
                m instanceof ir && (m = m.value.slice(0, m.value.length - o)),
                m && l.push(m)
            }
            return l
        }
        function f() {
            i(K, SyntaxError);
            var r = h();
            if (i(Q))
                return r;
            if (i(er)) {
                var e = function() {
                    var r, e = [], n = 0;
                    for (; t(R); ) {
                        o("*") && (r = n);
                        var i = p()
                          , a = l();
                        if (null === a)
                            throw new SyntaxError("Expected variant value");
                        e[n++] = {
                            key: i,
                            value: a
                        }
                    }
                    if (0 === n)
                        return null;
                    if (void 0 === r)
                        throw new SyntaxError("Expected default variant");
                    return {
                        variants: e,
                        star: r
                    }
                }();
                return i(Q, SyntaxError),
                Object.assign({}, {
                    type: "select",
                    selector: r
                }, e)
            }
            throw new SyntaxError("Unclosed placeable")
        }
        function h() {
            if ("{" === r[e])
                return f();
            if (t($)) {
                var n = a($)
                  , o = n[1]
                  , u = n[2]
                  , s = n[3];
                if (void 0 === s && (s = null),
                "$" === o)
                    return {
                        type: "var",
                        name: u
                    };
                if (i(rr)) {
                    var l = function() {
                        var n = [];
                        for (; ; ) {
                            switch (r[e]) {
                            case ")":
                                return e++,
                                n;
                            case void 0:
                                throw new SyntaxError("Unclosed argument list")
                            }
                            n.push(m()),
                            i(tr)
                        }
                    }();
                    if ("-" === o)
                        return {
                            type: "term",
                            name: u,
                            attr: s,
                            args: l
                        };
                    if (Z.test(u))
                        return {
                            type: "func",
                            name: u,
                            args: l
                        };
                    throw new SyntaxError("Function names must be all upper-case")
                }
                return "-" === o ? {
                    type: "term",
                    name: u,
                    attr: s,
                    args: []
                } : {
                    type: "mesg",
                    name: u,
                    attr: s
                }
            }
            return d()
        }
        function m() {
            var r = h();
            return "mesg" !== r.type ? r : i(nr) ? {
                type: "narg",
                name: r.name,
                value: d()
            } : r
        }
        function p() {
            var r;
            return i(X, SyntaxError),
            r = t(U) ? y() : {
                type: "str",
                value: u(q)
            },
            i(Y, SyntaxError),
            r
        }
        function d() {
            if (t(U))
                return y();
            if ('"' === r[e])
                return function() {
                    o('"', SyntaxError);
                    var n = "";
                    for (; ; ) {
                        if (n += u(B),
                        "\\" !== r[e]) {
                            if (o('"'))
                                return {
                                    type: "str",
                                    value: n
                                };
                            throw new SyntaxError("Unclosed string literal")
                        }
                        n += g()
                    }
                }();
            throw new SyntaxError("Invalid expression")
        }
        function y() {
            var r = a(U)
              , e = r[1]
              , n = r[2];
            void 0 === n && (n = "");
            var t = n.length;
            return {
                type: "num",
                value: parseFloat(e),
                precision: t
            }
        }
        function g() {
            if (t(J))
                return u(J);
            if (t(L)) {
                var r = a(L)
                  , e = r[1]
                  , n = r[2]
                  , o = parseInt(e || n, 16);
                return o <= 55295 || 57344 <= o ? String.fromCodePoint(o) : "�"
            }
            throw new SyntaxError("Unknown escape sequence")
        }
        function v() {
            var n = e;
            switch (i(or),
            r[e]) {
            case ".":
            case "[":
            case "*":
            case "}":
            case void 0:
                return !1;
            case "{":
                return b(r.slice(n, e))
            }
            return " " === r[e - 1] && b(r.slice(n, e))
        }
        function w(r, e) {
            return r.replace(e, "")
        }
        function b(r) {
            var e = r.replace(V, "\n")
              , n = H.exec(r)[1].length;
            return new ir(e,n)
        }
    }
    ,
    r.FluentType = v,
    Object.defineProperty(r, "__esModule", {
        value: !0
    })
});