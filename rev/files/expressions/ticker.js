define('expressions/ticker', ["require", "exports", "tslib", "dcgview", "../dcgview-helpers/mathquill-view", "main/mathquill-operators", "../dcgview-helpers/tooltipped-error", "../graphing-calc/models/ticker", "./promptslider_view", "./circular-icon-view", "../shared-components/tooltip", "lib/conditional_blur", "loadcss!./ticker"], function(require, e, t, n, r, o, i, c, l, a, s, d) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.Ticker = void 0;
    var u = n.Components
      , p = u.If
      , g = u.IfDefined
      , h = function(e) {
        function u() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(u, e),
        u.prototype.init = function() {
            this.controller = this.props.controller()
        }
        ,
        u.prototype.template = function() {
            var e = this;
            return n.createElement("div", {
                class: function() {
                    return {
                        "dcg-ticker": !0,
                        "dcg-expressions-scrolled": e.props.expsScrolled()
                    }
                }
            }, n.createElement("div", {
                class: n.const("dcg-ticker-settings-container")
            }, n.createElement("div", {
                class: n.const("dcg-ticker-settings-internal")
            }, n.createElement("div", {
                class: n.const("dcg-editable-mathquill-container dcg-action-definition")
            }, n.createElement("span", {
                class: n.const("dcg-ticker-label")
            }, function() {
                return e.controller.raw("Run")
            }), n.createElement(r.default, {
                hasError: function() {
                    return !!e.getHandlerErrorString()
                },
                getAriaPostLabel: function() {
                    var t = e.getHandlerErrorString();
                    return t ? e.controller.unpack(t) : ""
                },
                capExpressionSize: this.const(!1),
                onUserChangedLatex: function(t) {
                    return e.dispatchHandlerLatexIfChanged(t)
                },
                latex: function() {
                    return e.getHandlerLatex()
                },
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-narration-tick-action")
                },
                isFocused: function() {
                    return "handler" === e.getFocusedInput()
                },
                config: function() {
                    return e.getMQConfig()
                },
                onFocusedChanged: function(t) {
                    return e.handleFocusedChanged("handler", t)
                },
                selectOnFocus: this.const(!0),
                noFadeout: this.const(!0),
                onUserPressedKey: function(t, n) {
                    e.handlePressedKey("handler", t, n)
                }
            }), g(function() {
                return e.getHandlerErrorString()
            }, function(t) {
                return n.createElement("span", {
                    class: n.const("dcg-clickable-info-error-container")
                }, n.createElement(i.TooltippedError, {
                    error: function() {
                        return e.controller.unpack(t())
                    },
                    gravity: e.const("s"),
                    size: e.const("small")
                }))
            })), n.createElement("div", {
                class: n.const("dcg-editable-mathquill-container dcg-action-frequency")
            }, n.createElement("span", {
                class: n.const("dcg-ticker-label")
            }, function() {
                return e.controller.raw("every")
            }), n.createElement(r.default, {
                hasError: function() {
                    return !!e.getMinStepErrorString()
                },
                getAriaPostLabel: function() {
                    var t = e.getMinStepErrorString();
                    return t ? e.controller.unpack(t) : ""
                },
                capExpressionSize: this.const(!1),
                onUserChangedLatex: function(t) {
                    return e.dispatchMinStepLatexIfChanged(t)
                },
                latex: function() {
                    return e.getMinStepLatex()
                },
                getAriaLabel: function() {
                    return e.controller.s("graphing-calculator-label-ticker-min-step")
                },
                isFocused: function() {
                    return "minstep" === e.getFocusedInput()
                },
                config: this.bindFn(this.getMQConfig),
                onFocusedChanged: function(t) {
                    return e.handleFocusedChanged("minstep", t)
                },
                selectOnFocus: this.const(!0),
                placeholder: this.const("0"),
                noFadeout: this.const(!0),
                onUserPressedKey: function(t, n) {
                    e.handlePressedKey("minstep", t, n)
                }
            }), function() {
                return e.controller.raw("ms")
            }, n.createElement(s.Tooltip, {
                tooltip: function() {
                    return e.controller.s("graphing-calculator-label-ticker-help-tooltip")
                },
                gravity: this.const("s")
            }, n.createElement("a", {
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-label-ticker-help-tooltip")
                },
                class: n.const("dcg-ticker-toggle-help"),
                target: n.const("_blank"),
                href: n.const("https://help.desmos.com/hc/en-us/articles/4407725009165")
            }, n.createElement("i", {
                class: n.const("dcg-icon-question-sign")
            })))), n.createElement(p, {
                predicate: this.bindFn(this.shouldShowSliderPrompt)
            }, function() {
                return n.createElement(l.default, {
                    model: function() {
                        return e.props.controller().getTicker()
                    },
                    controller: e.props.controller
                })
            })), n.createElement("div", {
                class: function() {
                    return {
                        "dcg-circular-icon-container": !0,
                        "dcg-disabled": e.iconDisabled()
                    }
                },
                "aria-label": this.bindFn(this.getIconAriaLabel),
                role: n.const("button"),
                tabindex: function() {
                    return e.iconDisabled() ? -1 : 0
                },
                "aria-disabled": this.bindFn(this.iconDisabled),
                "aria-pressed": function() {
                    return e.controller.getTickerPlaying() && !e.iconDisabled()
                },
                onTap: this.bindFn(this.toggleTicker),
                onTapStart: function() {
                    d.default()
                }
            }, n.createElement(a.CircularIconView, {
                iconType: this.const("metronome")
            }), n.createElement("div", {
                class: function() {
                    return {
                        "dcg-metronome-bar": !0,
                        "dcg-metronome-playing": e.controller.getTickerPlaying() && !e.iconDisabled()
                    }
                }
            }), n.createElement(p, {
                predicate: function() {
                    return !e.iconDisabled()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-mini-play-pause")
                }, n.createElement(a.CircularIconView, {
                    iconType: e.bindFn(e.getPlayIcon)
                }))
            }))), n.createElement("i", {
                onTap: this.bindFn(this.closeTicker),
                tabindex: function() {
                    return e.controller.isInEditListMode() ? 0 : -1
                },
                "aria-label": function() {
                    return e.controller.s("graphing-calculator-label-ticker-close")
                },
                role: n.const("link"),
                class: n.const("dcg-icon-remove dcg-do-not-blur")
            }))
        }
        ,
        u.prototype.iconDisabled = function() {
            return !!this.getMinStepErrorString() || (!!this.getHandlerErrorString() || !this.isHandlerMaybeValid())
        }
        ,
        u.prototype.isHandlerMaybeValid = function() {
            var e;
            return "maybe-valid" === (null === (e = this.controller.getTicker().formula) || void 0 === e ? void 0 : e.handler.status)
        }
        ,
        u.prototype.closeTicker = function() {
            this.controller.dispatch({
                type: "close-ticker"
            })
        }
        ,
        u.prototype.toggleTicker = function() {
            this.iconDisabled() || this.controller.dispatch({
                type: "toggle-ticker"
            })
        }
        ,
        u.prototype.getPlayIcon = function() {
            return this.controller.getTickerPlaying() ? "pause" : "play"
        }
        ,
        u.prototype.getIconAriaLabel = function() {
            return this.controller.getTickerPlaying() ? this.controller.s("graphing-calculator-label-ticker-pause") : this.controller.s("graphing-calculator-label-ticker-play")
        }
        ,
        u.prototype.getFocusedInput = function() {
            var e = this.controller.getFocusLocation();
            if (e && "ticker" === e.type)
                return e.location
        }
        ,
        u.prototype.handlePressedKey = function(e, t, n) {
            var o = r.default.getFocusedMathquill();
            if (o) {
                if ("Enter" === t && this.shouldShowSliderPrompt() && this.controller.dispatch({
                    type: "create-sliders-for-ticker",
                    variables: c.getMissingVariables(this.props.controller().getTicker())
                }),
                "Right" === t && "handler" === e || "Left" === t && "minstep" === e || "Down" === t) {
                    if (!r.default.applyArrowKeyAndReturnIfWasAtBounds(o, t, n))
                        return;
                    if ("Down" === t)
                        return this.controller.dispatch({
                            type: "on-special-key-pressed",
                            key: t
                        });
                    if ("Right" === t)
                        return void this.handleFocusedChanged("minstep", !0);
                    if ("Left" === t)
                        return void this.handleFocusedChanged("handler", !0)
                }
                o.keystroke(t, n),
                "handler" === e ? this.dispatchHandlerLatexIfChanged(o.latex()) : "minstep" === e && this.dispatchMinStepLatexIfChanged(o.latex())
            }
        }
        ,
        u.prototype.handleFocusedChanged = function(e, t) {
            t ? this.controller.dispatch({
                type: "set-focus-location",
                location: {
                    type: "ticker",
                    location: e
                }
            }) : this.controller.dispatch({
                type: "blur-focus-location",
                location: {
                    type: "ticker",
                    location: e
                }
            })
        }
        ,
        u.prototype.dispatchHandlerLatexIfChanged = function(e) {
            this.getHandlerLatex() !== e && this.controller.dispatch({
                type: "update-ticker-handlerlatex",
                latex: e
            })
        }
        ,
        u.prototype.dispatchMinStepLatexIfChanged = function(e) {
            this.getMinStepLatex() !== e && this.controller.dispatch({
                type: "update-ticker-minsteplatex",
                latex: e
            })
        }
        ,
        u.prototype.getHandlerLatex = function() {
            return this.controller.getTickerHandlerLatex()
        }
        ,
        u.prototype.getMinStepLatex = function() {
            return this.controller.getTickerMinStepLatex()
        }
        ,
        u.prototype.getMQConfig = function() {
            return {
                autoOperatorNames: o.getAutoOperators({
                    additionalOperators: ["dt"]
                }),
                autoCommands: o.getAutoCommands()
            }
        }
        ,
        u.prototype.getHandlerErrorString = function() {
            return this.getHandlerLatex() ? c.getHandlerPackedError(this.controller.getTicker()) : void 0
        }
        ,
        u.prototype.getMinStepErrorString = function() {
            return c.getMinStepPackedError(this.controller.getTicker())
        }
        ,
        u.prototype.shouldShowSliderPrompt = function() {
            return !!this.controller.areSlidersEnabled() && c.getMissingVariables(this.controller.getTicker()).length > 0
        }
        ,
        u
    }(n.Class);
    e.Ticker = h
});
