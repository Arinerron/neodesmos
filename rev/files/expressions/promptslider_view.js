
define('expressions/promptslider_view', ["require", "exports", "tslib", "core/lib/label", "jquery", "lib/aria", "dcgview", "graphing-calc/models/list", "graphing-calc/models/ticker", "loadcss!prompt-sliders"], function(require, t, e, r, i, n, s, l, o) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var a = s.Components
      , c = a.For
      , d = a.If
      , u = function(t) {
        function a() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(a, t),
        a.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        a.prototype.template = function() {
            var t = this;
            return s.createElement("div", {
                class: s.const("dcg-create-sliders dcg-action-createslider"),
                handleEvent: s.const("true"),
                onTap: this.bindFn(this.onCreateSlider)
            }, s.createElement("span", {
                class: s.const("dcg-msg")
            }, function() {
                return t.controller.s("graphing-calculator-label-add-slider")
            }), s.createElement("span", {
                class: s.const("btns")
            }, s.createElement(c, {
                each: function() {
                    return t.getMissingVariables().slice(0, 4)
                }
            }, s.createElement("span", null, function(e) {
                return s.createElement("div", {
                    class: s.const("dcg-slider-btn-container"),
                    var_name: t.const(e)
                }, s.createElement("div", {
                    role: s.const("button"),
                    tabindex: s.const("0"),
                    class: function() {
                        return {
                            "dcg-btn-slider": !0,
                            "dcg-btn-blue": 1 === t.getMissingVariables().length,
                            "dcg-btn-light-gray": 1 !== t.getMissingVariables().length
                        }
                    },
                    didMount: function(t) {
                        t.innerHTML = r.identifierToHTML(e)
                    }
                }))
            })), s.createElement(d, {
                predicate: function() {
                    return t.getMissingVariables().length > 1
                }
            }, function() {
                return s.createElement("div", {
                    class: s.const("dcg-slider-btn-container dcg-all")
                }, s.createElement("div", {
                    role: s.const("button"),
                    tabindex: s.const("0"),
                    class: s.const("dcg-btn-slider dcg-btn-blue")
                }, function() {
                    return t.controller.s("graphing-calculator-button-slider-add-all-variables")
                }))
            })))
        }
        ,
        a.prototype.onCreateSlider = function(t) {
            if (this.controller.dispatch({
                type: "set-none-selected"
            }),
            t.target) {
                var e = i(t.target).closest(".dcg-slider-btn-container");
                if (e.length) {
                    var r = e.hasClass("dcg-all")
                      , n = r ? this.getMissingVariables() : [e.attr("var_name")];
                    if ("ticker" === this.model.type ? this.controller.dispatch({
                        type: "create-sliders-for-ticker",
                        variables: this.getMissingVariables()
                    }) : this.controller.dispatch({
                        type: "create-sliders-for-item",
                        id: this.model.id,
                        variables: n
                    }),
                    "keyboard" === t.device) {
                        var s = this.model.id
                          , l = this.props.controller().getItemSelectorById(s);
                        if (!l)
                            return;
                        r ? this.controller.dispatch({
                            type: "move-focus-to-item",
                            id: s
                        }) : l.find(".dcg-btn-blue").trigger("focus")
                    }
                }
            }
        }
        ,
        a.prototype.getMissingVariables = function() {
            return "ticker" === this.model.type ? o.getMissingVariables(this.model) : l.getMissingVariablesForItem(this.model)
        }
        ,
        a.prototype.didMount = function() {
            var t = this;
            this.promptAlertTimeout && clearTimeout(this.promptAlertTimeout),
            this.promptAlertTimeout = setTimeout(function() {
                for (var e = [], r = t.getMissingVariables(), i = 0; i < r.length; i++)
                    e.push('"' + r[i] + '"');
                n.alert(t.controller.s("graphing-calculator-narration-add-slider-prompt", {
                    vars: e.join(",")
                })),
                t.promptAlertTimeout = 0
            }, 2e3)
        }
        ,
        a.prototype.didUnmount = function() {
            this.promptAlertTimeout && clearTimeout(this.promptAlertTimeout)
        }
        ,
        a
    }(s.Class);
    t.default = u
});
