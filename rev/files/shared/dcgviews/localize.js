
define('shared/dcgviews/localize', ["require", "exports", "tslib", "dcgview", "vendor/html-parse-stringify2", "l10n-tools/localize-serializer", "lib/i18n"], function(require, e, t, n, i, r, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: true
    });
    e.Localize = void 0;
    function o(e) {
        return e.__DCGViewLocalizeBindingName
    }
    function s(e) {
        return typeof e === "function" && e.__DCGViewLocalizeViewName
    }
    var u = function(e) {
        t.__extends(u, e);
        function u() {
            return e !== null && e.apply(this, arguments) || this
        }
        u.prototype.init = function() {
            this.viewMap = {};
            this.elementMap = {};
            this.bindingMap = {};
            this.i18n = this.props.i18n();
            this.templateString = this.serializeToTemplateString(n.createElement("div", null, this.children))
        }
        ;
        u.prototype.template = function() {
            var e = this;
            return n.createElement(n.Components.If, {
                predicate: function() {
                    return e.shouldShow()
                }
            }, function() {
                return n.createElement(n.Components.Switch, {
                    key: function() {
                        return c(e.translatedString())
                    }
                }, function(t) {
                    return e.renderDeserializedTemplateNode(e.parseAndValidate(t))
                })
            })
        }
        ;
        u.prototype.shouldShow = function() {
            var e = this.props.options && this.props.options();
            if (e && e.hideUntranslatedView && this.i18n.hasTranslation) {
                return this.i18n.hasTranslation(this.props.key())
            }
            return true
        }
        ;
        u.prototype.translatedString = function() {
            var e = {};
            for (var t in this.bindingMap) {
                e[t] = a.raw("{$" + t + "}")
            }
            return this.i18n.s(this.props.key(), e)
        }
        ;
        u.variable = function(e, t) {
            var n = function() {
                return t()
            };
            n.__DCGViewLocalizeBindingName = e;
            return n
        }
        ;
        u.subview = function(e, t) {
            var n = function() {
                return t()
            };
            n.__DCGViewLocalizeViewName = e;
            return n
        }
        ;
        u.prototype.parseAndValidate = function(e) {
            var t = i.parse(e);
            var n = {};
            var r = {};
            o(t);
            for (var a in this.elementMap) {
                if (!r[a]) {
                    return i.parse(c(this.templateString))
                }
            }
            for (var a in this.bindingMap) {
                if (!n[a]) {
                    return i.parse(c(this.templateString))
                }
            }
            return t;
            function o(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, i = e; t < i.length; t++) {
                        var a = i[t];
                        o(a)
                    }
                    return
                }
                if (e.name === "token") {
                    n[e.attrs.id] = true
                } else if (e.type !== "text") {
                    r[e.name] = true;
                    o(e.children)
                }
            }
        }
        ;
        u.prototype.renderDeserializedTemplateNode = function(e) {
            var t = this;
            if (Array.isArray(e)) {
                return e.map(function(e) {
                    return t.renderDeserializedTemplateNode(e)
                })
            }
            if (e.type === "text") {
                return n.const(e.content || "")
            } else if (e.name === "token") {
                var i = this.bindingMap[e.attrs.id];
                if (!i) {
                    return function() {
                        return ""
                    }
                }
                return i
            } else {
                if (this.elementMap[e.name]) {
                    var r = this.elementMap[e.name];
                    var a = e.children.map(function(e) {
                        return t.renderDeserializedTemplateNode(e)
                    });
                    return p(r.type, r.attrs, a)
                } else if (this.viewMap[e.name]) {
                    return this.viewMap[e.name]()
                } else {
                    return p("span", {}, [])
                }
            }
        }
        ;
        u.prototype.serializeToTemplateString = function(e) {
            var t = this;
            return r.serializeToTemplateString(e, {
                isView: s,
                isConst: l,
                isBinding: function(e) {
                    return typeof e === "function"
                },
                isNamedBinding: o,
                getConstValue: function(e) {
                    return e()
                },
                getBindingName: function(e) {
                    return e.__DCGViewLocalizeBindingName
                },
                getViewName: function(e) {
                    return e.__DCGViewLocalizeViewName
                },
                addBinding: function(e, n) {
                    t.bindingMap[e] = n
                },
                addElement: function(e, n) {
                    t.elementMap[e] = {
                        type: n.tagName,
                        attrs: n.attrs
                    }
                },
                addView: function(e, n) {
                    if (t.viewMap[e]) {
                        throw new Error("Unexpected duplicate view " + e + ".")
                    }
                    t.viewMap[e] = n
                },
                forEachChild: function(e, t) {
                    for (var n = 0, i = e.children; n < i.length; n++) {
                        var r = i[n];
                        if (!l(r) && typeof r !== "function" && r._isDCGView) {
                            throw new Error("Bare DCGViews are not allowed inside <Localize>. Use Localize.subview().")
                        }
                        t(r)
                    }
                }
            })
        }
        ;
        return u
    }(n.Class);
    e.Localize = u;
    function l(e) {
        return typeof e === "function" && e.isDCGViewConst
    }
    function p(e, t, i) {
        var r = n;
        return r.createElement(e, t, i)
    }
    function c(e) {
        var t = "<0>" + e + "</0>";
        return t.replace(new RegExp(r.variableRegexp.source,"g"), function(e, t) {
            return '<token id="' + t + '"/>'
        })
    }
});
