define('mygraphs/wrapper', ["require", "exports", "lib/app-bridge", "tslib", "dcgview", "./mygraphs"], function(require, r, n, e, o, t) {
    "use strict";
    Object.defineProperty(r, "__esModule", {
        value: !0
    }),
    r.MygraphsWrapper = void 0;
    var l = function(r) {
        function l() {
            return null !== r && r.apply(this, arguments) || this
        }
        return e.__extends(l, r),
        l.prototype.init = function() {
            this.controller = this.props.controller(),
            this.graphsController = this.controller.graphsController,
            this.mygraphsController = this.controller.mygraphsController
        }
        ,
        l.prototype.template = function() {
            var r = this;
            return o.createElement(t.Mygraphs, {
                isOpen: function() {
                    return r.mygraphsController.isMygraphsOpen()
                },
                graphsController: function() {
                    return r.graphsController
                },
                maintenanceMode: function() {
                    return r.controller.isInMaintenanceMode()
                },
                previewMode: function() {
                    return r.controller.getPreviewParams()
                },
                accountsEnabled: this.const(!0),
                controller: function() {
                    return r.controller
                },
                closeDrawer: function() {
                    return r.controller.dispatch({
                        type: "close-mygraphs"
                    })
                },
                openBlankGraph: function() {
                    return r.mygraphsController.openBlankGraph()
                },
                onOpenGraph: function(n) {
                    return r.mygraphsController.onOpenGraph(n)
                },
                openGraphBehindCover: function(n) {
                    return r.mygraphsController.openGraphBehindCover(n)
                },
                onLogout: function() {
                    return r.controller.userController.logout()
                },
                onEditAccount: function() {
                    return r.controller.dispatch({
                        type: "show-modal",
                        modal: "account-settings",
                        device: "mouse"
                    })
                },
                onCreateAccount: function() {
                    return r.controller.dispatch({
                        type: "show-modal",
                        modal: "signup",
                        device: "mouse"
                    })
                },
                onSignIn: function() {
                    return r.controller.dispatch({
                        type: "show-modal",
                        modal: "login",
                        device: "mouse"
                    })
                },
                refreshGraphs: function() {
                    return r.graphsController.refreshGraphs()
                },
                getThumbnail: function() {
                    return r.mygraphsController.getThumbnail()
                },
                simpleSave: function() {
                    return r.controller.simpleSave()
                },
                openSaveDialog: function() {
                    return r.controller.openSaveDialog({
                        fromSaveInProgress: !0
                    })
                },
                versionNumber: function() {
                    return n.versionNumber
                },
                isSaveEnabled: function() {
                    return r.controller.isSaveEnabled()
                },
                makeAPI: this.props.makeAPI
            })
        }
        ,
        l
    }(o.Class);
    r.MygraphsWrapper = l
});
!function(e) {
    if ("object" == typeof exports && "undefined" != typeof module)
        module.exports = e();
    else if ("function" == typeof define && define.amd)
        define('vendor/bugsnag', [], e);
    else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).bugsnag = e()
    }
}(function() {
    var e = function(e, t, n) {
        for (var r = n, o = 0, i = e.length; o < i; o++)
            r = t(r, e[o], o, e);
        return r
    }
      , t = !{
        toString: null
    }.propertyIsEnumerable("toString")
      , n = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"]
      , r = function(e) {
        return e < 10 ? "0" + e : e
    }
      , o = function(t, n) {
        return e(t, function(e, t, r, o) {
            return e.concat(n(t, r, o))
        }, [])
    }
      , i = e
      , a = function(t, n) {
        return e(t, function(e, t, r, o) {
            return n(t, r, o) ? e.concat(t) : e
        }, [])
    }
      , s = function(t, n) {
        return e(t, function(e, t, r, o) {
            return !0 === e || t === n
        }, !1)
    }
      , u = function(e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }
      , c = function() {
        var e = new Date;
        return e.getUTCFullYear() + "-" + r(e.getUTCMonth() + 1) + "-" + r(e.getUTCDate()) + "T" + r(e.getUTCHours()) + ":" + r(e.getUTCMinutes()) + ":" + r(e.getUTCSeconds()) + "." + (e.getUTCMilliseconds() / 1e3).toFixed(3).slice(2, 5) + "Z"
    }
      , f = {
        intRange: function(e, t) {
            return void 0 === e && (e = 1),
            void 0 === t && (t = 1 / 0),
            function(n) {
                return "number" == typeof n && parseInt("" + n, 10) === n && n >= e && n <= t
            }
        },
        stringWithLength: function(e) {
            return "string" == typeof e && !!e.length
        }
    }
      , l = {}
      , d = a
      , g = i
      , p = function(e) {
        var r, o = [];
        for (r in e)
            Object.prototype.hasOwnProperty.call(e, r) && o.push(r);
        if (!t)
            return o;
        for (var i = 0, a = n.length; i < a; i++)
            Object.prototype.hasOwnProperty.call(e, n[i]) && o.push(n[i]);
        return o
    }
      , h = u
      , v = s
      , m = f.intRange
      , y = f.stringWithLength;
    function b() {
        return (b = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    l.schema = {
        apiKey: {
            defaultValue: function() {
                return null
            },
            message: "is required",
            validate: y
        },
        appVersion: {
            defaultValue: function() {
                return null
            },
            message: "should be a string",
            validate: function(e) {
                return null === e || y(e)
            }
        },
        appType: {
            defaultValue: function() {
                return null
            },
            message: "should be a string",
            validate: function(e) {
                return null === e || y(e)
            }
        },
        autoNotify: {
            defaultValue: function() {
                return !0
            },
            message: "should be true|false",
            validate: function(e) {
                return !0 === e || !1 === e
            }
        },
        beforeSend: {
            defaultValue: function() {
                return []
            },
            message: "should be a function or array of functions",
            validate: function(e) {
                return "function" == typeof e || h(e) && d(e, function(e) {
                    return "function" == typeof e
                }).length === e.length
            }
        },
        endpoints: {
            defaultValue: function() {
                return {
                    notify: "https://notify.bugsnag.com",
                    sessions: "https://sessions.bugsnag.com"
                }
            },
            message: "should be an object containing endpoint URLs { notify, sessions }. sessions is optional if autoCaptureSessions=false",
            validate: function(e, t) {
                return e && "object" == typeof e && y(e.notify) && (!1 === t.autoCaptureSessions || y(e.sessions)) && 0 === d(p(e), function(e) {
                    return !v(["notify", "sessions"], e)
                }).length
            }
        },
        autoCaptureSessions: {
            defaultValue: function(e, t) {
                return void 0 === t.endpoints || !!t.endpoints && !!t.endpoints.sessions
            },
            message: "should be true|false",
            validate: function(e) {
                return !0 === e || !1 === e
            }
        },
        notifyReleaseStages: {
            defaultValue: function() {
                return null
            },
            message: "should be an array of strings",
            validate: function(e) {
                return null === e || h(e) && d(e, function(e) {
                    return "string" == typeof e
                }).length === e.length
            }
        },
        releaseStage: {
            defaultValue: function() {
                return "production"
            },
            message: "should be a string",
            validate: function(e) {
                return "string" == typeof e && e.length
            }
        },
        maxBreadcrumbs: {
            defaultValue: function() {
                return 20
            },
            message: "should be a number ≤40",
            validate: function(e) {
                return m(0, 40)(e)
            }
        },
        autoBreadcrumbs: {
            defaultValue: function() {
                return !0
            },
            message: "should be true|false",
            validate: function(e) {
                return "boolean" == typeof e
            }
        },
        user: {
            defaultValue: function() {
                return null
            },
            message: "(object) user should be an object",
            validate: function(e) {
                return "object" == typeof e
            }
        },
        metaData: {
            defaultValue: function() {
                return null
            },
            message: "should be an object",
            validate: function(e) {
                return "object" == typeof e
            }
        },
        logger: {
            defaultValue: function() {},
            message: "should be null or an object with methods { debug, info, warn, error }",
            validate: function(e) {
                return !e || e && g(["debug", "info", "warn", "error"], function(t, n) {
                    return t && "function" == typeof e[n]
                }, !0)
            }
        },
        filters: {
            defaultValue: function() {
                return ["password"]
            },
            message: "should be an array of strings|regexes",
            validate: function(e) {
                return h(e) && e.length === d(e, function(e) {
                    return "string" == typeof e || e && "function" == typeof e.test
                }).length
            }
        }
    },
    l.mergeDefaults = function(e, t) {
        if (!e || !t)
            throw new Error("opts and schema objects are required");
        return g(p(t), function(n, r) {
            return n[r] = void 0 !== e[r] ? e[r] : t[r].defaultValue(e[r], e),
            n
        }, {})
    }
    ,
    l.validate = function(e, t) {
        if (!e || !t)
            throw new Error("opts and schema objects are required");
        var n = g(p(t), function(n, r) {
            return t[r].validate(e[r], e) ? n : n.concat({
                key: r,
                message: t[r].message,
                value: e[r]
            })
        }, []);
        return {
            valid: !n.length,
            errors: n
        }
    }
    ;
    var S = l.schema
      , w = o
      , O = {
        releaseStage: {
            defaultValue: function() {
                return /^localhost(:\d+)?$/.test(window.location.host) ? "development" : "production"
            },
            message: "should be set",
            validate: f.stringWithLength
        },
        logger: b({}, S.logger, {
            defaultValue: function() {
                return "undefined" != typeof console && "function" == typeof console.debug ? j() : void 0
            }
        })
    }
      , j = function() {
        var e = {}
          , t = console.log;
        return w(["debug", "info", "warn", "error"], function(n) {
            var r = console[n];
            e[n] = "function" == typeof r ? r.bind(console, "[bugsnag]") : t.bind(console, "[bugsnag]")
        }),
        e
    }
      , E = c
      , N = function() {
        function e(e, t, n, r) {
            void 0 === e && (e = "[anonymous]"),
            void 0 === t && (t = {}),
            void 0 === n && (n = "manual"),
            void 0 === r && (r = E()),
            this.type = n,
            this.name = e,
            this.metaData = t,
            this.timestamp = r
        }
        return e.prototype.toJSON = function() {
            return {
                type: this.type,
                name: this.name,
                timestamp: this.timestamp,
                metaData: this.metaData
            }
        }
        ,
        e
    }()
      , B = function(e) {
        return e.app && "string" == typeof e.app.releaseStage ? e.app.releaseStage : e.config.releaseStage
    };
    var R = function(e) {
        switch (Object.prototype.toString.call(e)) {
        case "[object Error]":
        case "[object Exception]":
        case "[object DOMException]":
            return !0;
        default:
            return e instanceof Error
        }
    }
      , k = function(e, t) {
        return e.isIgnored() || !1 === t
    }
      , _ = {};
    !function(e, t) {
        "use strict";
        "object" == typeof _ ? _ = t() : e.StackFrame = t()
    }(this, function() {
        "use strict";
        function e(e) {
            return !isNaN(parseFloat(e)) && isFinite(e)
        }
        function t(e) {
            return e.charAt(0).toUpperCase() + e.substring(1)
        }
        function n(e) {
            return function() {
                return this[e]
            }
        }
        var r = ["isConstructor", "isEval", "isNative", "isToplevel"]
          , o = ["columnNumber", "lineNumber"]
          , i = ["fileName", "functionName", "source"]
          , a = r.concat(o, i, ["args"]);
        function s(e) {
            if (e instanceof Object)
                for (var n = 0; n < a.length; n++)
                    e.hasOwnProperty(a[n]) && void 0 !== e[a[n]] && this["set" + t(a[n])](e[a[n]])
        }
        s.prototype = {
            getArgs: function() {
                return this.args
            },
            setArgs: function(e) {
                if ("[object Array]" !== Object.prototype.toString.call(e))
                    throw new TypeError("Args must be an Array");
                this.args = e
            },
            getEvalOrigin: function() {
                return this.evalOrigin
            },
            setEvalOrigin: function(e) {
                if (e instanceof s)
                    this.evalOrigin = e;
                else {
                    if (!(e instanceof Object))
                        throw new TypeError("Eval Origin must be an Object or StackFrame");
                    this.evalOrigin = new s(e)
                }
            },
            toString: function() {
                return (this.getFunctionName() || "{anonymous}") + ("(" + (this.getArgs() || []).join(",") + ")") + (this.getFileName() ? "@" + this.getFileName() : "") + (e(this.getLineNumber()) ? ":" + this.getLineNumber() : "") + (e(this.getColumnNumber()) ? ":" + this.getColumnNumber() : "")
            }
        };
        for (var u = 0; u < r.length; u++)
            s.prototype["get" + t(r[u])] = n(r[u]),
            s.prototype["set" + t(r[u])] = function(e) {
                return function(t) {
                    this[e] = Boolean(t)
                }
            }(r[u]);
        for (var c = 0; c < o.length; c++)
            s.prototype["get" + t(o[c])] = n(o[c]),
            s.prototype["set" + t(o[c])] = function(t) {
                return function(n) {
                    if (!e(n))
                        throw new TypeError(t + " must be a Number");
                    this[t] = Number(n)
                }
            }(o[c]);
        for (var f = 0; f < i.length; f++)
            s.prototype["get" + t(i[f])] = n(i[f]),
            s.prototype["set" + t(i[f])] = function(e) {
                return function(t) {
                    this[e] = String(t)
                }
            }(i[f]);
        return s
    });
    var D = {};
    !function(e, t) {
        "use strict";
        "object" == typeof D ? D = t(_) : e.ErrorStackParser = t(e.StackFrame)
    }(this, function(e) {
        "use strict";
        var t = /(^|@)\S+\:\d+/
          , n = /^\s*at .*(\S+\:\d+|\(native\))/m
          , r = /^(eval@)?(\[native code\])?$/;
        return {
            parse: function(e) {
                if (void 0 !== e.stacktrace || void 0 !== e["opera#sourceloc"])
                    return this.parseOpera(e);
                if (e.stack && e.stack.match(n))
                    return this.parseV8OrIE(e);
                if (e.stack)
                    return this.parseFFOrSafari(e);
                throw new Error("Cannot parse given Error object")
            },
            extractLocation: function(e) {
                if (-1 === e.indexOf(":"))
                    return [e];
                var t = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/.exec(e.replace(/[\(\)]/g, ""));
                return [t[1], t[2] || void 0, t[3] || void 0]
            },
            parseV8OrIE: function(t) {
                return t.stack.split("\n").filter(function(e) {
                    return !!e.match(n)
                }, this).map(function(t) {
                    t.indexOf("(eval ") > -1 && (t = t.replace(/eval code/g, "eval").replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, ""));
                    var n = t.replace(/^\s+/, "").replace(/\(eval code/g, "(").split(/\s+/).slice(1)
                      , r = this.extractLocation(n.pop())
                      , o = n.join(" ") || void 0
                      , i = ["eval", "<anonymous>"].indexOf(r[0]) > -1 ? void 0 : r[0];
                    return new e({
                        functionName: o,
                        fileName: i,
                        lineNumber: r[1],
                        columnNumber: r[2],
                        source: t
                    })
                }, this)
            },
            parseFFOrSafari: function(t) {
                return t.stack.split("\n").filter(function(e) {
                    return !e.match(r)
                }, this).map(function(t) {
                    if (t.indexOf(" > eval") > -1 && (t = t.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ":$1")),
                    -1 === t.indexOf("@") && -1 === t.indexOf(":"))
                        return new e({
                            functionName: t
                        });
                    var n = /((.*".+"[^@]*)?[^@]*)(?:@)/
                      , r = t.match(n)
                      , o = r && r[1] ? r[1] : void 0
                      , i = this.extractLocation(t.replace(n, ""));
                    return new e({
                        functionName: o,
                        fileName: i[0],
                        lineNumber: i[1],
                        columnNumber: i[2],
                        source: t
                    })
                }, this)
            },
            parseOpera: function(e) {
                return !e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length ? this.parseOpera9(e) : e.stack ? this.parseOpera11(e) : this.parseOpera10(e)
            },
            parseOpera9: function(t) {
                for (var n = /Line (\d+).*script (?:in )?(\S+)/i, r = t.message.split("\n"), o = [], i = 2, a = r.length; i < a; i += 2) {
                    var s = n.exec(r[i]);
                    s && o.push(new e({
                        fileName: s[2],
                        lineNumber: s[1],
                        source: r[i]
                    }))
                }
                return o
            },
            parseOpera10: function(t) {
                for (var n = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i, r = t.stacktrace.split("\n"), o = [], i = 0, a = r.length; i < a; i += 2) {
                    var s = n.exec(r[i]);
                    s && o.push(new e({
                        functionName: s[3] || void 0,
                        fileName: s[2],
                        lineNumber: s[1],
                        source: r[i]
                    }))
                }
                return o
            },
            parseOpera11: function(n) {
                return n.stack.split("\n").filter(function(e) {
                    return !!e.match(t) && !e.match(/^Error created at/)
                }, this).map(function(t) {
                    var n, r = t.split("@"), o = this.extractLocation(r.pop()), i = r.shift() || "", a = i.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^\)]*\)/g, "") || void 0;
                    i.match(/\(([^\)]*)\)/) && (n = i.replace(/^[^\(]+\(([^\)]*)\)$/, "$1"));
                    var s = void 0 === n || "[arguments not available]" === n ? void 0 : n.split(",");
                    return new e({
                        functionName: a,
                        args: s,
                        fileName: o[0],
                        lineNumber: o[1],
                        columnNumber: o[2],
                        source: t
                    })
                }, this)
            }
        }
    });
    var x = D
      , L = function(e) {
        return !(!e || !e.stack && !e.stacktrace && !e["opera#sourceloc"] || "string" != typeof (e.stack || e.stacktrace || e["opera#sourceloc"]) || e.stack === e.name + ": " + e.message)
    }
      , q = {};
    function C() {
        return (C = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    !function(e, t) {
        "use strict";
        "object" == typeof q ? q = t(_) : e.StackGenerator = t(e.StackFrame)
    }(this, function(e) {
        return {
            backtrace: function(t) {
                var n = []
                  , r = 10;
                "object" == typeof t && "number" == typeof t.maxStackSize && (r = t.maxStackSize);
                for (var o = arguments.callee; o && n.length < r && o.arguments; ) {
                    for (var i = new Array(o.arguments.length), a = 0; a < i.length; ++a)
                        i[a] = o.arguments[a];
                    /function(?:\s+([\w$]+))+\s*\(/.test(o.toString()) ? n.push(new e({
                        functionName: RegExp.$1 || void 0,
                        args: i
                    })) : n.push(new e({
                        args: i
                    }));
                    try {
                        o = o.caller
                    } catch (e) {
                        break
                    }
                }
                return n
            }
        }
    });
    var T = i
      , M = a
      , P = function() {
        function e(e, t, n, r, o) {
            void 0 === n && (n = []),
            void 0 === r && (r = H()),
            this.__isBugsnagReport = !0,
            this._ignored = !1,
            this._handledState = r,
            this.app = void 0,
            this.apiKey = void 0,
            this.breadcrumbs = [],
            this.context = void 0,
            this.device = void 0,
            this.errorClass = U(e, "[no error class]"),
            this.errorMessage = U(t, "[no error message]"),
            this.groupingHash = void 0,
            this.metaData = {},
            this.request = void 0,
            this.severity = this._handledState.severity,
            this.stacktrace = T(n, function(e, t) {
                var n = A(t);
                try {
                    return "{}" === JSON.stringify(n) ? e : e.concat(n)
                } catch (t) {
                    return e
                }
            }, []),
            this.user = void 0,
            this.session = void 0,
            this.originalError = o
        }
        var t = e.prototype;
        return t.ignore = function() {
            this._ignored = !0
        }
        ,
        t.isIgnored = function() {
            return this._ignored
        }
        ,
        t.updateMetaData = function(e) {
            var t, n;
            return e ? null === (arguments.length <= 1 ? void 0 : arguments[1]) ? this.removeMetaData(e) : null === (arguments.length <= 2 ? void 0 : arguments[2]) ? this.removeMetaData(e, arguments.length <= 1 ? void 0 : arguments[1], arguments.length <= 2 ? void 0 : arguments[2]) : ("object" == typeof (arguments.length <= 1 ? void 0 : arguments[1]) && (n = arguments.length <= 1 ? void 0 : arguments[1]),
            "string" == typeof (arguments.length <= 1 ? void 0 : arguments[1]) && ((t = {})[arguments.length <= 1 ? void 0 : arguments[1]] = arguments.length <= 2 ? void 0 : arguments[2],
            n = t),
            n ? (this.metaData[e] || (this.metaData[e] = {}),
            this.metaData[e] = C({}, this.metaData[e], n),
            this) : this) : this
        }
        ,
        t.removeMetaData = function(e, t) {
            return "string" != typeof e ? this : t ? this.metaData[e] ? (delete this.metaData[e][t],
            this) : this : (delete this.metaData[e],
            this)
        }
        ,
        t.toJSON = function() {
            return {
                payloadVersion: "4",
                exceptions: [{
                    errorClass: this.errorClass,
                    message: this.errorMessage,
                    stacktrace: this.stacktrace,
                    type: "browserjs"
                }],
                severity: this.severity,
                unhandled: this._handledState.unhandled,
                severityReason: this._handledState.severityReason,
                app: this.app,
                device: this.device,
                breadcrumbs: this.breadcrumbs,
                context: this.context,
                user: this.user,
                metaData: this.metaData,
                groupingHash: this.groupingHash,
                request: this.request,
                session: this.session
            }
        }
        ,
        e
    }()
      , A = function(e) {
        var t = {
            file: e.fileName,
            method: V(e.functionName),
            lineNumber: e.lineNumber,
            columnNumber: e.columnNumber,
            code: void 0,
            inProject: void 0
        };
        return t.lineNumber > -1 && !t.file && !t.method && (t.file = "global code"),
        t
    }
      , V = function(e) {
        return /^global code$/i.test(e) ? "global code" : e
    }
      , H = function() {
        return {
            unhandled: !1,
            severity: "warning",
            severityReason: {
                type: "handledException"
            }
        }
    }
      , U = function(e, t) {
        return "string" == typeof e && e ? e : t
    };
    P.getStacktrace = function(e, t, n) {
        return void 0 === t && (t = 0),
        void 0 === n && (n = 0),
        L(e) ? x.parse(e).slice(t) : M(q.backtrace(), function(e) {
            return -1 === (e.functionName || "").indexOf("StackGenerator$$")
        }).slice(1 + n)
    }
    ,
    P.ensureReport = function(e, t, n) {
        if (void 0 === t && (t = 0),
        void 0 === n && (n = 0),
        e.__isBugsnagReport)
            return e;
        try {
            var r = P.getStacktrace(e, t, 1 + n);
            return new P(e.name,e.message,r,void 0,e)
        } catch (t) {
            return new P(e.name,e.message,[],void 0,e)
        }
    }
    ;
    var $ = P
      , F = function(e, t) {
        var n = "000000000" + e;
        return n.substr(n.length - t)
    }
      , K = "object" == typeof window ? window : self
      , I = 0;
    for (var X in K)
        Object.hasOwnProperty.call(K, X) && I++;
    var J = navigator.mimeTypes ? navigator.mimeTypes.length : 0
      , z = F((J + navigator.userAgent.length).toString(36) + I.toString(36), 4)
      , G = function() {
        return z
    }
      , W = 0
      , Y = Math.pow(36, 4);
    function Z() {
        return F((Math.random() * Y << 0).toString(36), 4)
    }
    function Q() {
        return "c" + (new Date).getTime().toString(36) + F((W = W < Y ? W : 0,
        ++W - 1).toString(36), 4) + G() + (Z() + Z())
    }
    Q.fingerprint = G;
    var ee = Q
      , te = c
      , ne = function() {
        function e() {
            this.id = ee(),
            this.startedAt = te(),
            this._handled = 0,
            this._unhandled = 0
        }
        var t = e.prototype;
        return t.toJSON = function() {
            return {
                id: this.id,
                startedAt: this.startedAt,
                events: {
                    handled: this._handled,
                    unhandled: this._unhandled
                }
            }
        }
        ,
        t.trackError = function(e) {
            this[e._handledState.unhandled ? "_unhandled" : "_handled"] += 1
        }
        ,
        e
    }();
    function re() {
        return (re = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var oe = o
      , ie = s
      , ae = u
      , se = function() {
        function e(t) {
            if (!(t && t.name && t.version && t.url))
                throw new Error("`notifier` argument is required");
            this.notifier = t,
            this._configured = !1,
            this._opts = {},
            this.config = {},
            this._delivery = {
                sendSession: function() {},
                sendReport: function() {}
            },
            this._logger = {
                debug: function() {},
                info: function() {},
                warn: function() {},
                error: function() {}
            },
            this._plugins = {},
            this._session = null,
            this.breadcrumbs = [],
            this.app = {},
            this.context = void 0,
            this.device = void 0,
            this.metaData = void 0,
            this.request = void 0,
            this.user = {},
            this.BugsnagClient = e,
            this.BugsnagReport = $,
            this.BugsnagBreadcrumb = N,
            this.BugsnagSession = ne;
            var n = this
              , r = this.notify;
            this.notify = function() {
                return r.apply(n, arguments)
            }
        }
        var t = e.prototype;
        return t.setOptions = function(e) {
            this._opts = re({}, this._opts, e)
        }
        ,
        t.configure = function(e) {
            void 0 === e && (e = l.schema);
            var t = l.mergeDefaults(this._opts, e)
              , n = l.validate(t, e);
            if (!0 == !n.valid)
                throw new Error(fe(n.errors));
            return "function" == typeof t.beforeSend && (t.beforeSend = [t.beforeSend]),
            t.appVersion && (this.app.version = t.appVersion),
            t.appType && (this.app.type = t.appType),
            t.metaData && (this.metaData = t.metaData),
            t.user && (this.user = t.user),
            t.logger && this.logger(t.logger),
            this.config = re({}, this.config, t),
            this._configured = !0,
            this
        }
        ,
        t.use = function(e) {
            if (!this._configured)
                throw new Error("client not configured");
            e.configSchema && this.configure(e.configSchema);
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                n[r - 1] = arguments[r];
            var o = e.init.apply(e, [this].concat(n));
            return e.name && (this._plugins["~" + e.name + "~"] = o),
            this
        }
        ,
        t.getPlugin = function(e) {
            return this._plugins["~" + e + "~"]
        }
        ,
        t.delivery = function(e) {
            return this._delivery = e,
            this
        }
        ,
        t.logger = function(e, t) {
            return this._logger = e,
            this
        }
        ,
        t.sessionDelegate = function(e) {
            return this._sessionDelegate = e,
            this
        }
        ,
        t.startSession = function() {
            return this._sessionDelegate ? this._sessionDelegate.startSession(this) : (this._logger.warn("No session implementation is installed"),
            this)
        }
        ,
        t.leaveBreadcrumb = function(e, t, n, r) {
            if (!this._configured)
                throw new Error("client not configured");
            if (n = "string" == typeof n ? n : void 0,
            r = "string" == typeof r ? r : void 0,
            t = "object" == typeof t && null !== t ? t : void 0,
            "string" == typeof (e = e || void 0) || t) {
                var o = new N(e,t,n,r);
                return this.breadcrumbs.push(o),
                this.breadcrumbs.length > this.config.maxBreadcrumbs && (this.breadcrumbs = this.breadcrumbs.slice(this.breadcrumbs.length - this.config.maxBreadcrumbs)),
                this
            }
        }
        ,
        t.notify = function(e, t, n) {
            var r = this;
            if (void 0 === t && (t = {}),
            void 0 === n && (n = function() {}
            ),
            !this._configured)
                throw new Error("client not configured");
            var o = B(this)
              , i = ue(e, t, this._logger)
              , a = i.err
              , s = i.errorFramesToSkip
              , u = i._opts;
            u && (t = u),
            "object" == typeof t && null !== t || (t = {});
            var c = $.ensureReport(a, s, 2);
            if (c.app = re({}, {
                releaseStage: o
            }, c.app, this.app),
            c.context = c.context || t.context || this.context || void 0,
            c.device = re({}, c.device, this.device, t.device),
            c.request = re({}, c.request, this.request, t.request),
            c.user = re({}, c.user, this.user, t.user),
            c.metaData = re({}, c.metaData, this.metaData, t.metaData),
            c.breadcrumbs = this.breadcrumbs.slice(0),
            this._session && (this._session.trackError(c),
            c.session = this._session),
            void 0 !== t.severity && (c.severity = t.severity,
            c._handledState.severityReason = {
                type: "userSpecifiedSeverity"
            }),
            ae(this.config.notifyReleaseStages) && !ie(this.config.notifyReleaseStages, o))
                return this._logger.warn("Report not sent due to releaseStage/notifyReleaseStages configuration"),
                n(null, c);
            var f = c.severity
              , l = [].concat(t.beforeSend).concat(this.config.beforeSend)
              , d = function(e) {
                r._logger.error("Error occurred in beforeSend callback, continuing anyway…"),
                r._logger.error(e)
            };
            !function(e, t, n) {
                var r = e.length
                  , o = 0
                  , i = function() {
                    if (o >= r)
                        return n(null, !1);
                    t(e[o], function(e, t) {
                        return e ? n(e, !1) : !0 === t ? n(null, !0) : (o++,
                        void i())
                    })
                };
                i()
            }(l, function(e, t) {
                return function(n, r) {
                    if ("function" != typeof n)
                        return r(null, !1);
                    try {
                        if (2 !== n.length) {
                            var o = n(e);
                            return o && "function" == typeof o.then ? o.then(function(t) {
                                return setTimeout(function() {
                                    return r(null, k(e, t))
                                }, 0)
                            }, function(e) {
                                setTimeout(function() {
                                    return t(e),
                                    r(null, !1)
                                })
                            }) : r(null, k(e, o))
                        }
                        n(e, function(n, o) {
                            if (n)
                                return t(n),
                                r(null, !1);
                            r(null, k(e, o))
                        })
                    } catch (e) {
                        t(e),
                        r(null, !1)
                    }
                }
            }(c, d), function(e, t) {
                if (e && d(e),
                t)
                    return r._logger.debug("Report not sent due to beforeSend callback"),
                    n(null, c);
                r.config.autoBreadcrumbs && r.leaveBreadcrumb(c.errorClass, {
                    errorClass: c.errorClass,
                    errorMessage: c.errorMessage,
                    severity: c.severity
                }, "error"),
                f !== c.severity && (c._handledState.severityReason = {
                    type: "userCallbackSetSeverity"
                }),
                r._delivery.sendReport(r._logger, r.config, {
                    apiKey: c.apiKey || r.config.apiKey,
                    notifier: r.notifier,
                    events: [c]
                }, function(e) {
                    return n(e, c)
                })
            })
        }
        ,
        e
    }()
      , ue = function(e, t, n) {
        var r, o, i = function(e) {
            var t = le(e);
            return n.warn("Usage error. " + t),
            new Error("Bugsnag usage error. " + t)
        }, a = 0;
        switch (typeof e) {
        case "string":
            "string" == typeof t ? (r = i("string/string"),
            o = {
                metaData: {
                    notifier: {
                        notifyArgs: [e, t]
                    }
                }
            }) : (r = new Error(String(e)),
            a = 3);
            break;
        case "number":
        case "boolean":
            r = new Error(String(e));
            break;
        case "function":
            r = i("function");
            break;
        case "object":
            null !== e && (R(e) || e.__isBugsnagReport) ? r = e : null !== e && ce(e) ? ((r = new Error(e.message || e.errorMessage)).name = e.name || e.errorClass,
            a = 3) : r = i(null === e ? "null" : "unsupported object");
            break;
        default:
            r = i("nothing")
        }
        return {
            err: r,
            errorFramesToSkip: a,
            _opts: o
        }
    }
      , ce = function(e) {
        return !("string" != typeof e.name && "string" != typeof e.errorClass || "string" != typeof e.message && "string" != typeof e.errorMessage)
    }
      , fe = function(e) {
        return "Bugsnag configuration error\n" + oe(e, function(e) {
            return '"' + e.key + '" ' + e.message + " \n    got " + de(e.value)
        }).join("\n\n")
    }
      , le = function(e) {
        return "notify() expected error/opts parameters, got " + e
    }
      , de = function(e) {
        return "object" == typeof e ? JSON.stringify(e) : String(e)
    }
      , ge = se
      , pe = function(e, t, n, r) {
        var o = r && r.filterKeys ? r.filterKeys : []
          , i = r && r.filterPaths ? r.filterPaths : [];
        return JSON.stringify(function(e, t, n) {
            var r = []
              , o = 0;
            function i(e, a) {
                function s() {
                    return a.length > 8 && o > 25e3
                }
                if (o++,
                a.length > 20)
                    return he;
                if (s())
                    return he;
                if (null === e || "object" != typeof e)
                    return e;
                if (function(e, t) {
                    for (var n = 0, r = e.length; n < r; n++)
                        if (e[n] === t)
                            return !0;
                    return !1
                }(r, e))
                    return "[Circular]";
                if (r.push(e),
                "function" == typeof e.toJSON)
                    try {
                        o--;
                        var u = i(e.toJSON(), a);
                        return r.pop(),
                        u
                    } catch (e) {
                        return ve(e)
                    }
                var c;
                if ((c = e)instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(c))) {
                    o--;
                    var f = i({
                        name: e.name,
                        message: e.message
                    }, a);
                    return r.pop(),
                    f
                }
                if (function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }(e)) {
                    for (var l = [], d = 0, g = e.length; d < g; d++) {
                        if (s()) {
                            l.push(he);
                            break
                        }
                        l.push(i(e[d], a.concat("[]")))
                    }
                    return r.pop(),
                    l
                }
                var p = {};
                try {
                    for (var h in e)
                        if (Object.prototype.hasOwnProperty.call(e, h))
                            if (me(n, a.join(".")) && ye(t, h))
                                p[h] = "[Filtered]";
                            else {
                                if (s()) {
                                    p[h] = he;
                                    break
                                }
                                p[h] = i(be(e, h), a.concat(h))
                            }
                } catch (e) {}
                return r.pop(),
                p
            }
            return i(e, [])
        }(e, o, i), t, n)
    }
      , he = "...";
    function ve(e) {
        return "[Throws: " + (e ? e.message : "?") + "]"
    }
    function me(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            if (0 === t.indexOf(e[n]))
                return !0;
        return !1
    }
    function ye(e, t) {
        for (var n = 0, r = e.length; n < r; n++) {
            if ("string" == typeof e[n] && e[n] === t)
                return !0;
            if (e[n] && "function" == typeof e[n].test && e[n].test(t))
                return !0
        }
        return !1
    }
    function be(e, t) {
        try {
            return e[t]
        } catch (e) {
            return ve(e)
        }
    }
    var Se = {}
      , we = ["events.[].app", "events.[].metaData", "events.[].user", "events.[].breadcrumbs", "events.[].request", "events.[].device"]
      , Oe = ["device", "app", "user"];
    Se.report = function(e, t) {
        var n = pe(e, null, null, {
            filterPaths: we,
            filterKeys: t
        });
        if (n.length > 1e6 && (delete e.events[0].metaData,
        e.events[0].metaData = {
            notifier: "WARNING!\nSerialized payload was " + n.length / 1e6 + "MB (limit = 1MB)\nmetaData was removed"
        },
        (n = pe(e, null, null, {
            filterPaths: we,
            filterKeys: t
        })).length > 1e6))
            throw new Error("payload exceeded 1MB limit");
        return n
    }
    ,
    Se.session = function(e, t) {
        var n = pe(e, null, null, {
            filterPaths: Oe,
            filterKeys: t
        });
        if (n.length > 1e6)
            throw new Error("payload exceeded 1MB limit");
        return n
    }
    ;
    var je, Ee = c;
    je = function(e) {
        return void 0 === e && (e = window),
        {
            sendReport: function(t, n, r, o) {
                void 0 === o && (o = function() {}
                );
                var i = Ne(n, "notify", "4", e)
                  , a = new e.XDomainRequest;
                a.onload = function() {
                    o(null)
                }
                ,
                a.open("POST", i),
                setTimeout(function() {
                    try {
                        a.send(Se.report(r, n.filters))
                    } catch (e) {
                        t.error(e),
                        o(e)
                    }
                }, 0)
            },
            sendSession: function(t, n, r, o) {
                void 0 === o && (o = function() {}
                );
                var i = Ne(n, "sessions", "1", e)
                  , a = new e.XDomainRequest;
                a.onload = function() {
                    o(null)
                }
                ,
                a.open("POST", i),
                setTimeout(function() {
                    try {
                        a.send(Se.session(r, n.filters))
                    } catch (e) {
                        t.error(e),
                        o(e)
                    }
                }, 0)
            }
        }
    }
    ;
    var Ne = function(e, t, n, r) {
        return Be(e.endpoints[t], r.location.protocol) + "?apiKey=" + encodeURIComponent(e.apiKey) + "&payloadVersion=" + n + "&sentAt=" + encodeURIComponent(Ee())
    }
      , Be = je._matchPageProtocol = function(e, t) {
        return "http:" === t ? e.replace(/^https:/, "http:") : e
    }
      , Re = c
      , ke = {
        init: function(e, t) {
            void 0 === t && (t = window),
            e.config.beforeSend.unshift(function(e) {
                e.context || (e.context = t.location.pathname)
            })
        }
    };
    function _e() {
        return (_e = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var De = c
      , xe = {
        init: function(e, t) {
            void 0 === t && (t = navigator);
            var n = {
                locale: t.browserLanguage || t.systemLanguage || t.userLanguage || t.language,
                userAgent: t.userAgent
            };
            e.device = _e({}, n, e.device),
            e.config.beforeSend.unshift(function(e) {
                e.device = _e({}, e.device, {
                    time: De()
                })
            })
        }
    };
    function Le() {
        return (Le = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var qe = {
        init: function(e, t) {
            void 0 === t && (t = window),
            e.config.beforeSend.unshift(function(e) {
                e.request && e.request.url || (e.request = Le({}, e.request, {
                    url: t.location.href
                }))
            })
        }
    };
    function Ce() {
        return (Ce = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var Te = u
      , Me = s
      , Pe = {
        init: function(e) {
            return e.sessionDelegate(Ae)
        }
    }
      , Ae = {
        startSession: function(e) {
            var t = e;
            t._session = new e.BugsnagSession;
            var n = B(t);
            return Te(t.config.notifyReleaseStages) && !Me(t.config.notifyReleaseStages, n) ? (t._logger.warn("Session not sent due to releaseStage/notifyReleaseStages configuration"),
            t) : t.config.endpoints.sessions ? (t._delivery.sendSession(t._logger, t.config, {
                notifier: t.notifier,
                device: t.device,
                app: Ce({}, {
                    releaseStage: n
                }, t.app),
                sessions: [{
                    id: t._session.id,
                    startedAt: t._session.startedAt,
                    user: t.user
                }]
            }),
            t) : (t._logger.warn("Session not sent due to missing endpoints.sessions configuration"),
            t)
        }
    };
    function Ve() {
        return (Ve = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var He = {
        init: function(e) {
            e.config.collectUserIp || e.config.beforeSend.push(function(e) {
                e.user && void 0 === e.user.id && delete e.user.id,
                e.user = Ve({
                    id: "[NOT COLLECTED]"
                }, e.user),
                e.request = Ve({
                    clientIp: "[NOT COLLECTED]"
                }, e.request)
            })
        },
        configSchema: {
            collectUserIp: {
                defaultValue: function() {
                    return !0
                },
                message: "should be true|false",
                validate: function(e) {
                    return !0 === e || !1 === e
                }
            }
        }
    }
      , Ue = {}
      , $e = o
      , Fe = i
      , Ke = a;
    Ue.init = function(e) {
        var t = /^dev(elopment)?$/.test(e.config.releaseStage)
          , n = !1 === e.config.consoleBreadcrumbsEnabled
          , r = (!1 === e.config.autoBreadcrumbs || t) && !0 !== e.config.consoleBreadcrumbsEnabled;
        n || r || $e(Ie, function(t) {
            var n = console[t];
            console[t] = function() {
                for (var r = arguments.length, o = new Array(r), i = 0; i < r; i++)
                    o[i] = arguments[i];
                e.leaveBreadcrumb("Console output", Fe(o, function(e, t, n) {
                    var r = "[Unknown value]";
                    try {
                        r = String(t)
                    } catch (e) {}
                    if ("[object Object]" === r)
                        try {
                            r = JSON.stringify(t)
                        } catch (e) {}
                    return e["[" + n + "]"] = r,
                    e
                }, {
                    severity: 0 === t.indexOf("group") ? "log" : t
                }), "log"),
                n.apply(console, o)
            }
            ,
            console[t]._restore = function() {
                console[t] = n
            }
        })
    }
    ,
    Ue.configSchema = {
        consoleBreadcrumbsEnabled: {
            defaultValue: function() {},
            validate: function(e) {
                return !0 === e || !1 === e || void 0 === e
            },
            message: "should be true|false"
        }
    };
    var Ie = Ke(["log", "debug", "info", "warn", "error"], function(e) {
        return "undefined" != typeof console && "function" == typeof console[e]
    })
      , Xe = {}
      , Je = i
      , ze = /^.*<script.*?>/
      , Ge = /<\/script>.*$/
      , We = (Xe = {
        init: function(e, t, n) {
            void 0 === t && (t = document),
            void 0 === n && (n = window);
            var r = ""
              , o = !1
              , i = function() {
                return t.documentElement.outerHTML
            }
              , a = n.location.href;
            r = i();
            var s = t.onreadystatechange;
            t.onreadystatechange = function() {
                "interactive" === t.readyState && (r = i(),
                o = !0),
                "function" == typeof s && s.apply(this, arguments)
            }
            ,
            e.config.beforeSend.unshift(function(e) {
                var t = e.stacktrace[0];
                if (!t || !t.file || !t.lineNumber)
                    return t;
                if (t.file.replace(/#.*$/, "") !== a.replace(/#.*$/, ""))
                    return t;
                o && r || (r = i());
                var n = ["\x3c!-- DOC START --\x3e"].concat(r.split("\n"))
                  , s = We(n, t.lineNumber - 1)
                  , u = s.script
                  , c = s.start
                  , f = Je(u, function(e, n, r) {
                    return Math.abs(c + r + 1 - t.lineNumber) > 10 || (e["" + (c + r + 1)] = n),
                    e
                }, {});
                t.code = f,
                e.updateMetaData("script", {
                    content: u.join("\n")
                })
            })
        }
    }).extractScriptContent = function(e, t) {
        for (var n = t; n < e.length && !Ge.test(e[n]); )
            n++;
        for (var r = n; n > 0 && !ze.test(e[n]); )
            n--;
        var o = n
          , i = e.slice(o, r + 1);
        return i[0] = i[0].replace(ze, ""),
        i[i.length - 1] = i[i.length - 1].replace(Ge, ""),
        {
            script: i,
            start: o
        }
    }
      , Ye = {
        init: function(e, t) {
            if (void 0 === t && (t = window),
            "addEventListener"in t) {
                var n = !1 === e.config.interactionBreadcrumbsEnabled
                  , r = !1 === e.config.autoBreadcrumbs && !0 !== e.config.interactionBreadcrumbsEnabled;
                n || r || t.addEventListener("click", function(n) {
                    var r, o;
                    try {
                        r = Ze(n.target),
                        o = Qe(n.target, t)
                    } catch (t) {
                        r = "[hidden]",
                        o = "[hidden]",
                        e._logger.error("Cross domain error when tracking click event. See docs: https://tinyurl.com/y94fq5zm")
                    }
                    e.leaveBreadcrumb("UI click", {
                        targetText: r,
                        targetSelector: o
                    }, "user")
                }, !0)
            }
        },
        configSchema: {
            interactionBreadcrumbsEnabled: {
                defaultValue: function() {},
                validate: function(e) {
                    return !0 === e || !1 === e || void 0 === e
                },
                message: "should be true|false"
            }
        }
    }
      , Ze = function(e) {
        var t, n, r, o = e.textContent || e.innerText || "";
        return o || "submit" !== e.type && "button" !== e.type || (o = e.value),
        o = o.replace(/^\s+|\s+$/g, ""),
        n = 140,
        r = "(...)",
        (t = o) && t.length <= n ? t : t.slice(0, n - r.length) + r
    };
    function Qe(e, t) {
        var n = [e.tagName];
        if (e.id && n.push("#" + e.id),
        e.className && e.className.length && n.push("." + e.className.split(" ").join(".")),
        !t.document.querySelectorAll || !Array.prototype.indexOf)
            return n.join("");
        try {
            if (1 === t.document.querySelectorAll(n.join("")).length)
                return n.join("")
        } catch (e) {
            return n.join("")
        }
        if (e.parentNode.childNodes.length > 1) {
            var r = Array.prototype.indexOf.call(e.parentNode.childNodes, e) + 1;
            n.push(":nth-child(" + r + ")")
        }
        return 1 === t.document.querySelectorAll(n.join("")).length ? n.join("") : e.parentNode ? Qe(e.parentNode, t) + " > " + n.join("") : n.join("")
    }
    var et, tt, nt = {
        init: function(e, t) {
            if (void 0 === t && (t = window),
            "addEventListener"in t) {
                var n = !1 === e.config.navigationBreadcrumbsEnabled
                  , r = !1 === e.config.autoBreadcrumbs && !0 !== e.config.navigationBreadcrumbsEnabled;
                if (!n && !r) {
                    var o = function(t) {
                        return function() {
                            return e.leaveBreadcrumb(t, {}, "navigation")
                        }
                    };
                    t.addEventListener("pagehide", o("Page hidden"), !0),
                    t.addEventListener("pageshow", o("Page shown"), !0),
                    t.addEventListener("load", o("Page loaded"), !0),
                    t.document.addEventListener("DOMContentLoaded", o("DOMContentLoaded"), !0),
                    t.addEventListener("load", function() {
                        return t.addEventListener("popstate", o("Navigated back"), !0)
                    }),
                    t.addEventListener("hashchange", function(n) {
                        var r = n.oldURL ? {
                            from: rt(n.oldURL, t),
                            to: rt(n.newURL, t),
                            state: it(t)
                        } : {
                            to: rt(t.location.href, t)
                        };
                        e.leaveBreadcrumb("Hash changed", r, "navigation")
                    }, !0),
                    t.history.replaceState && ot(e, t.history, "replaceState", t),
                    t.history.pushState && ot(e, t.history, "pushState", t),
                    e.leaveBreadcrumb("Bugsnag loaded", {}, "navigation")
                }
            }
        },
        configSchema: {
            navigationBreadcrumbsEnabled: {
                defaultValue: function() {},
                validate: function(e) {
                    return !0 === e || !1 === e || void 0 === e
                },
                message: "should be true|false"
            }
        }
    }, rt = function(e, t) {
        var n = t.document.createElement("A");
        return n.href = e,
        "" + n.pathname + n.search + n.hash
    }, ot = function(e, t, n, r) {
        var o = t[n];
        t[n] = function(i, a, s) {
            e.leaveBreadcrumb("History " + n, function(e, t, n, r) {
                var o = rt(e.location.href, e);
                return {
                    title: n,
                    state: t,
                    prevState: it(e),
                    to: r || o,
                    from: o
                }
            }(r, i, a, s), "navigation"),
            "function" == typeof e.refresh && e.refresh(),
            e.config.autoCaptureSessions && e.startSession(),
            o.apply(t, [i, a].concat(void 0 !== s ? s : []))
        }
        ,
        t[n]._restore = function() {
            t[n] = o
        }
    }, it = function(e) {
        try {
            return e.history.state
        } catch (e) {}
    }, at = {}, st = "request", ut = s, ct = function() {
        return [et.config.endpoints.notify, et.config.endpoints.sessions]
    };
    at.init = function(e, t) {
        void 0 === t && (t = window);
        var n = !1 === e.config.networkBreadcrumbsEnabled
          , r = !1 === e.config.autoBreadcrumbs && !0 !== e.config.networkBreadcrumbsEnabled;
        n || r || (et = e,
        tt = t,
        ft(),
        gt())
    }
    ,
    at.configSchema = {
        networkBreadcrumbsEnabled: {
            defaultValue: function() {},
            validate: function(e) {
                return !0 === e || !1 === e || void 0 === e
            },
            message: "should be true|false"
        }
    };
    var ft = function() {
        if ("addEventListener"in tt.XMLHttpRequest.prototype) {
            var e = tt.XMLHttpRequest.prototype.open;
            tt.XMLHttpRequest.prototype.open = function(t, n) {
                this["BS~~U"] = n,
                this["BS~~M"] = t,
                this["BS~~S"] && (this.removeEventListener("load", lt),
                this.removeEventListener("error", dt)),
                this.addEventListener("load", lt),
                this.addEventListener("error", dt),
                this["BS~~S"] = !0,
                e.apply(this, arguments)
            }
        }
    };
    function lt() {
        if (!ut(ct(), this["BS~~U"])) {
            var e = {
                status: this.status,
                request: this["BS~~M"] + " " + this["BS~~U"]
            };
            this.status >= 400 ? et.leaveBreadcrumb("XMLHttpRequest failed", e, st) : et.leaveBreadcrumb("XMLHttpRequest succeeded", e, st)
        }
    }
    function dt() {
        ut(ct(), this["BS~~U"]) || et.leaveBreadcrumb("XMLHttpRequest error", {
            request: this["BS~~M"] + " " + this["BS~~U"]
        }, st)
    }
    var gt = function() {
        if ("fetch"in tt) {
            var e = tt.fetch;
            tt.fetch = function() {
                for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                    n[r] = arguments[r];
                var o = n[0]
                  , i = n[1]
                  , a = "GET";
                return i && i.method && (a = i.method),
                new Promise(function(t, r) {
                    e.apply(void 0, n).then(function(e) {
                        pt(e, a, o),
                        t(e)
                    }).catch(function(e) {
                        ht(a, o),
                        r(e)
                    })
                }
                )
            }
        }
    }
      , pt = function(e, t, n) {
        var r = {
            status: e.status,
            request: t + " " + n
        };
        e.status >= 400 ? et.leaveBreadcrumb("fetch() failed", r, st) : et.leaveBreadcrumb("fetch() succeeded", r, st)
    }
      , ht = function(e, t) {
        et.leaveBreadcrumb("fetch() error", {
            request: e + " " + t
        }, st)
    }
      , vt = f.intRange
      , mt = {
        init: function(e) {
            var t = 0;
            e.config.beforeSend.push(function(n) {
                if (t >= e.config.maxEvents)
                    return n.ignore();
                t++
            }),
            e.refresh = function() {
                t = 0
            }
        },
        configSchema: {
            maxEvents: {
                defaultValue: function() {
                    return 10
                },
                message: "should be a positive integer ≤100",
                validate: function(e) {
                    return vt(1, 100)(e)
                }
            }
        }
    }
      , yt = {};
    function bt() {
        return (bt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var St = o
      , wt = (yt = {
        init: function(e) {
            e.config.beforeSend.push(function(e) {
                e.stacktrace = St(e.stacktrace, function(e) {
                    return bt({}, e, {
                        file: wt(e.file)
                    })
                })
            })
        }
    })._strip = function(e) {
        return "string" == typeof e ? e.replace(/\?.*$/, "").replace(/#.*$/, "") : e
    }
      , Ot = {
        init: function(e, t) {
            void 0 === t && (t = window);
            var n = t.onerror;
            t.onerror = function(t, r, o, i, a) {
                if (0 === o && /Script error\.?/.test(t))
                    e._logger.warn("Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/y94fq5zm");
                else {
                    var s, u = {
                        severity: "error",
                        unhandled: !0,
                        severityReason: {
                            type: "unhandledException"
                        }
                    };
                    if (a)
                        a.name && a.message ? s = new e.BugsnagReport(a.name,a.message,jt(e.BugsnagReport.getStacktrace(a), r, o, i),u,a) : (s = new e.BugsnagReport("window.onerror",String(a),jt(e.BugsnagReport.getStacktrace(a, 1), r, o, i),u,a)).updateMetaData("window onerror", {
                            error: a
                        });
                    else if ("object" != typeof t || null === t || r && "string" == typeof r || o || i || a)
                        (s = new e.BugsnagReport("window.onerror",String(t),jt(e.BugsnagReport.getStacktrace(a, 1), r, o, i),u,t)).updateMetaData("window onerror", {
                            event: t
                        });
                    else {
                        var c = t.type ? "Event: " + t.type : "window.onerror"
                          , f = t.message || t.detail || "";
                        (s = new e.BugsnagReport(c,f,e.BugsnagReport.getStacktrace(new Error, 1).slice(1),u,t)).updateMetaData("window onerror", {
                            event: t,
                            extraParameters: r
                        })
                    }
                    e.notify(s)
                }
                "function" == typeof n && n.apply(this, arguments)
            }
        }
    }
      , jt = function(e, t, n, r) {
        var o = e[0];
        return o ? (o.fileName || "string" != typeof t || o.setFileName(t),
        !o.lineNumber && Et(n) && o.setLineNumber(n),
        o.columnNumber || (Et(r) ? o.setColumnNumber(r) : window.event && Et(window.event.errorCharacter) && o.setColumnNumber(window.event.errorCharacter)),
        e) : e
    }
      , Et = function(e) {
        return "number" == typeof e && "NaN" !== String.call(e)
    }
      , Nt = {}
      , Bt = i;
    Nt.init = function(e, t) {
        void 0 === t && (t = window);
        var n = function(t) {
            var n = t.reason
              , r = !1;
            try {
                t.detail && t.detail.reason && (n = t.detail.reason,
                r = !0)
            } catch (e) {}
            var o, i = {
                severity: "error",
                unhandled: !0,
                severityReason: {
                    type: "unhandledPromiseRejection"
                }
            };
            if (n && L(n))
                o = new e.BugsnagReport(n.name,n.message,x.parse(n),i,n),
                r && (o.stacktrace = Bt(o.stacktrace, _t(n), []));
            else {
                (o = new e.BugsnagReport(n && n.name ? n.name : "UnhandledRejection",n && n.message ? n.message : 'Rejection reason was not an Error. See "Promise" tab for more detail.',[],i,n)).updateMetaData("promise", "rejection reason", kt(n))
            }
            e.notify(o)
        };
        "addEventListener"in t ? t.addEventListener("unhandledrejection", n) : t.onunhandledrejection = function(e, t) {
            n({
                detail: {
                    reason: e,
                    promise: t
                }
            })
        }
        ,
        n
    }
    ;
    var Rt, kt = function(e) {
        return null == e ? "undefined (or null)" : R(e) ? ((t = {})[Object.prototype.toString.call(e)] = {
            name: e.name,
            message: e.message,
            code: e.code,
            stack: e.stack
        },
        t) : e;
        var t
    }, _t = function(e) {
        return function(t, n) {
            return n.file === e.toString() ? t : (n.method && (n.method = n.method.replace(/^\s+/, "")),
            t.concat(n))
        }
    };
    function Dt() {
        return (Dt = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n)
                    Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }
        ).apply(this, arguments)
    }
    var xt = o
      , Lt = Dt({}, l.schema, O);
    return (Rt = function(e) {
        "string" == typeof e && (e = {
            apiKey: e
        });
        var t = [];
        e.sessionTrackingEnabled && (t.push("deprecated option sessionTrackingEnabled is now called autoCaptureSessions"),
        e.autoCaptureSessions = e.sessionTrackingEnabled),
        !e.endpoint && !e.sessionEndpoint || e.endpoints || (t.push("deprecated options endpoint/sessionEndpoint are now configured in the endpoints object"),
        e.endpoints = {
            notify: e.endpoint,
            sessions: e.sessionEndpoint
        }),
        e.endpoints && e.endpoints.notify && !e.endpoints.sessions && t.push("notify endpoint is set but sessions endpoint is not. No sessions will be sent.");
        var n = new ge({
            name: "Bugsnag JavaScript",
            version: "6.1.0",
            url: "https://github.com/bugsnag/bugsnag-js"
        });
        return n.setOptions(e),
        n.delivery(window.XDomainRequest ? je() : function(e) {
            return void 0 === e && (e = window),
            {
                sendReport: function(t, n, r, o) {
                    void 0 === o && (o = function() {}
                    );
                    try {
                        var i = n.endpoints.notify
                          , a = new e.XMLHttpRequest;
                        a.onreadystatechange = function() {
                            a.readyState === e.XMLHttpRequest.DONE && o(null)
                        }
                        ,
                        a.open("POST", i),
                        a.setRequestHeader("Content-Type", "application/json"),
                        a.setRequestHeader("Bugsnag-Api-Key", r.apiKey || n.apiKey),
                        a.setRequestHeader("Bugsnag-Payload-Version", "4"),
                        a.setRequestHeader("Bugsnag-Sent-At", Re()),
                        a.send(Se.report(r, n.filters))
                    } catch (e) {
                        t.error(e)
                    }
                },
                sendSession: function(t, n, r, o) {
                    void 0 === o && (o = function() {}
                    );
                    try {
                        var i = n.endpoints.sessions
                          , a = new e.XMLHttpRequest;
                        a.onreadystatechange = function() {
                            a.readyState === e.XMLHttpRequest.DONE && o(null)
                        }
                        ,
                        a.open("POST", i),
                        a.setRequestHeader("Content-Type", "application/json"),
                        a.setRequestHeader("Bugsnag-Api-Key", n.apiKey),
                        a.setRequestHeader("Bugsnag-Payload-Version", "1"),
                        a.setRequestHeader("Bugsnag-Sent-At", Re()),
                        a.send(Se.session(r, n.filters))
                    } catch (e) {
                        t.error(e)
                    }
                }
            }
        }()),
        n.configure(Lt),
        xt(t, function(e) {
            return n._logger.warn(e)
        }),
        n.use(xe),
        n.use(ke),
        n.use(qe),
        n.use(Xe),
        n.use(mt),
        n.use(Pe),
        n.use(He),
        n.use(yt),
        !1 !== n.config.autoNotify && (n.use(Ot),
        n.use(Nt)),
        n.use(nt),
        n.use(Ye),
        n.use(at),
        n.use(Ue),
        n._logger.debug("Loaded!"),
        n.config.autoCaptureSessions ? n.startSession() : n
    }
    ).Bugsnag = {
        Client: ge,
        Report: $,
        Session: ne,
        Breadcrumb: N
    },
    Rt.default = Rt,
    Rt
});