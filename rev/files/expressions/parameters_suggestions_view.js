
define('expressions/parameters_suggestions_view', ["require", "exports", "tslib", "dcgview", "graphing-calc/models/expression", "loadcss!./parameter_suggestions_view"], function(require, e, t, r, a) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.ParametersSuggestionsView = void 0;
    var n = r.Components
      , i = n.If
      , s = n.For
      , o = n.SwitchUnion
      , l = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(n, e),
        n.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model(),
            this.id = this.model.id
        }
        ,
        n.prototype.template = function() {
            var e = this;
            return o(this.bindFn(this.getSuggestionType), {
                list: function() {
                    return r.createElement(s, {
                        each: e.bindFn(e.getListOfParameters)
                    }, r.createElement("div", {
                        class: function() {
                            return {
                                "dcg-parameter-suggestion-container": !0,
                                "dcg-parameter-suggestion-braille": "none" !== e.controller.getBrailleMode()
                            }
                        }
                    }, function(t) {
                        return r.createElement("span", {
                            class: r.const("dcg-parameter-name")
                        }, function() {
                            return e.getParamName(t)
                        })
                    }))
                },
                listWithDefault: function() {
                    return r.createElement(s, {
                        each: e.bindFn(e.getListOfParameters)
                    }, r.createElement("div", {
                        class: function() {
                            return {
                                "dcg-parameter-suggestion-container": !0,
                                "dcg-parameter-suggestion-braille": "none" !== e.controller.getBrailleMode()
                            }
                        },
                        onTap: e.bindFn(e.fillInDefaults)
                    }, function(t) {
                        return r.createElement("span", {
                            class: r.const("dcg-parameter-name")
                        }, function() {
                            return e.getParamName(t)
                        }, r.createElement(i, {
                            predicate: function() {
                                return e.shouldShowDefaultValue(t)
                            }
                        }, function() {
                            return r.createElement("span", {
                                class: r.const("dcg-default-marker")
                            }, r.const("= "), function() {
                                return e.getDefaultValue(t)
                            })
                        }))
                    }))
                },
                individual: function() {
                    return r.createElement("div", {
                        class: function() {
                            return {
                                "dcg-parameter-suggestion-container": !0,
                                "dcg-parameter-suggestion-braille": "none" !== e.controller.getBrailleMode()
                            }
                        }
                    }, e.bindFn(e.getMissingRequiredParamText))
                },
                none: function() {}
            })
        }
        ,
        n.prototype.getExtractedAndDefaultArgString = function(e) {
            var t = e.params
              , r = e.values
              , a = e.defaults;
            return t.map(function(e, t) {
                var n = r[e]
                  , i = a[t];
                return n || i || ""
            }).join(",")
        }
        ,
        n.prototype.fillInDefaults = function() {
            var e = a.parseToplevelFunction(this.model);
            if (e) {
                var t = e.symbol
                  , r = e.span
                  , n = r.input
                  , i = r.start
                  , s = r.end
                  , o = "\\operatorname{" + t + "}\\left(" + this.getExtractedAndDefaultArgString(e) + "\\right)"
                  , l = "" + n.slice(0, i) + o + n.slice(s);
                this.controller.dispatch({
                    type: "set-item-latex",
                    id: this.id,
                    latex: l
                }),
                this.controller.dispatch({
                    type: "set-focus-location",
                    location: {
                        type: "expression",
                        id: this.id
                    }
                }),
                this.controller.dispatch({
                    type: "keypad/press-key",
                    key: "Left"
                })
            }
        }
        ,
        n.prototype.isMissingDefault = function() {
            if (!a.isPrimaryLatexValid(this.model))
                return !1;
            var e = a.parseToplevelFunction(this.model);
            if (!e)
                return !1;
            for (var t = 0; t < e.params.length; t++)
                if (this.shouldShowDefaultValue(e.params[t]))
                    return !0;
            return !1
        }
        ,
        n.prototype.getSuggestionType = function() {
            return this.getListOfParameters().length > 1 ? this.isMissingDefault() ? "listWithDefault" : "list" : this.missingRequiredParam() ? "individual" : "none"
        }
        ,
        n.prototype.missingRequiredParam = function() {
            var e = a.parseToplevelFunction(this.model);
            if (e && 1 === e.params.length) {
                var t = e.params[0];
                if (!this.getDefaultValue(t) && !this.getParameterExtractedValue(t))
                    return t
            }
        }
        ,
        n.prototype.getMissingRequiredParamText = function() {
            var e = this.missingRequiredParam();
            return e ? this.controller.s("graphing-calculator-text-enter-pareneter", {
                param: this.getParamName(e)
            }) : ""
        }
        ,
        n.prototype.getDefaultValue = function(e) {
            var t = a.parseToplevelFunction(this.model);
            if (!t || !t.params)
                return "";
            for (var r = 0; r < t.params.length; r++)
                if (t.params[r] === e)
                    return t.defaults[r] || "";
            return ""
        }
        ,
        n.prototype.getParameterExtractedValue = function(e) {
            var t = a.parseToplevelFunction(this.model);
            return t && t.values[e] || ""
        }
        ,
        n.prototype.shouldShowDefaultValue = function(e) {
            return !this.getParameterExtractedValue(e) && !!this.getDefaultValue(e)
        }
        ,
        n.prototype.getListOfParameters = function() {
            var e = a.parseToplevelFunction(this.model);
            return e ? e.params : []
        }
        ,
        n.prototype.getParamName = function(e) {
            switch (e) {
            case "mean":
                return this.controller.s("graphing-calculator-text-parameter-name-mean");
            case "stdev":
                return this.controller.s("graphing-calculator-text-parameter-name-stddev");
            case "dof":
                return this.controller.s("graphing-calculator-text-parameter-name-dof");
            case "probsuccess":
                return this.controller.s("graphing-calculator-text-parameter-name-probsuccess");
            case "trials":
                return this.controller.s("graphing-calculator-text-parameter-name-trials");
            case "data":
                return this.controller.s("graphing-calculator-text-parameter-name-data");
            case "binwidth":
                return this.controller.s("graphing-calculator-text-parameter-name-binwidth");
            case "min":
                return this.controller.s("graphing-calculator-text-parameter-name-min");
            case "max":
                return this.controller.s("graphing-calculator-text-parameter-name-max");
            case "height":
                return this.controller.s("graphing-calculator-text-parameter-name-height");
            case "offset":
                return this.controller.s("graphing-calculator-text-parameter-name-offset");
            default:
                return e
            }
        }
        ,
        n
    }(r.Class);
    e.ParametersSuggestionsView = l
});
