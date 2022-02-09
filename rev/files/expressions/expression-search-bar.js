
define('expressions/expression-search-bar', ["require", "exports", "tslib", "dcgview", "../dcgview-helpers/mathquill-view", "main/mathquill-operators", "loadcss!./expression-search-bar"], function(require, e, t, r, o, n) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ExpressionSearchBar = void 0;
    var s = r.Components.If
      , c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return r.createElement("div", {
                class: function() {
                    return {
                        "dcg-expression-search-bar": !0,
                        "dcg-expressions-scrolled": e.props.expsScrolled() && !e.controller.getTickerOpen()
                    }
                },
                role: r.const("search")
            }, r.createElement("div", {
                class: r.const("dcg-search-mathquill-container")
            }, r.createElement(o.default, {
                hasError: this.const(!1),
                capExpressionSize: this.const(!1),
                onUserChangedLatex: this.bindFn(this.onChange),
                latex: function() {
                    return e.controller.getExpressionSearchStr()
                },
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-label-search-expressions")
                },
                getAriaPostLabel: function() {
                    return 0 === e.controller.getExpressionSearchStr().length ? e.controller.raw("") : e.controller.s("graphing-calculator-narration-expression-search-results", {
                        count: e.controller.getExpressionSearchCount()
                    })
                },
                isFocused: this.bindFn(this.isFocused),
                config: this.bindFn(this.getMQConfig),
                onFocusedChanged: this.bindFn(this.onFocusChanged),
                selectOnFocus: this.const(!0),
                noFadeout: this.const(!0),
                onUserPressedKey: function(t, r) {
                    if ("Esc" === t)
                        e.closeSearch();
                    else if ("Enter" === t)
                        e.controller.dispatch({
                            type: "update-expression-search-str",
                            str: e.controller.getExpressionSearchStr()
                        });
                    else {
                        var n = o.default.getFocusedMathquill();
                        if (!n)
                            return;
                        n.keystroke(t, r),
                        e.onChange(n.latex())
                    }
                }
            }), r.createElement("i", {
                class: r.const("dcg-icon-search")
            }), r.createElement(s, {
                predicate: function() {
                    return 0 === e.controller.getExpressionSearchStr().length
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-search-placeholder")
                }, function() {
                    return e.controller.s("graphing-calculator-label-search-expressions")
                })
            })), r.createElement("i", {
                onTap: function() {
                    return e.closeSearch()
                },
                tabindex: r.const(0),
                "aria-label": function() {
                    return e.controller.s("account-shell-button-cancel")
                },
                role: r.const("button"),
                class: r.const("dcg-icon-remove dcg-do-not-blur")
            }))
        }
        ,
        c.prototype.closeSearch = function() {
            this.controller.dispatch({
                type: "close-expression-search"
            })
        }
        ,
        c.prototype.onChange = function(e) {
            this.controller.dispatch({
                type: "update-expression-search-str",
                str: e
            })
        }
        ,
        c.prototype.onFocusChanged = function(e) {
            e ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "search-expressions"
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "search-expressions"
                }
            })
        }
        ,
        c.prototype.isFocused = function() {
            var e = this.controller.getFocusLocation();
            return !!e && "search-expressions" === e.type
        }
        ,
        c.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: n.getAutoOperators()
            }
        }
        ,
        c
    }(r.Class);
    e.ExpressionSearchBar = c
});
