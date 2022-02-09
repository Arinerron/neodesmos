define('expressions/play-pause-icon-view', ["require", "exports", "tslib", "dcgview", "lib/aria", "./circular-icon-view", "main/manage-focus-helper", "graphing-calc/models/expression", "core/types/slider-loop-modes", "../shared-components/tooltip", "jquery.handleevent", "loadcss!./play-pause-icon-view"], function(require, e, t, i, n, o, r, l, a, s) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.PlayPauseIconView = void 0;
    var c = function(e) {
        function c() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(c, e),
        c.prototype.init = function() {
            this.controller = this.props.controller(),
            this.model = this.props.model()
        }
        ,
        c.prototype.template = function() {
            var e = this;
            return i.createElement("div", {
                class: i.const("dcg-play-pause-icon-view")
            }, i.createElement(s.Tooltip, {
                gravity: this.const("se"),
                tooltip: function() {
                    return e.controller.s("graphing-calculator-label-slider-disabled-while-ticker-playing")
                },
                disabled: function() {
                    return !e.controller.getTickerPlaying()
                },
                sticky: this.const(!0)
            }, i.createElement("div", {
                class: function() {
                    return {
                        "dcg-circular-icon-container": !0,
                        "dcg-disabled": e.controller.getTickerPlaying()
                    }
                },
                "aria-label": this.bindFn(this.getAriaLabel),
                role: i.const("button"),
                tabindex: i.const("0"),
                onTap: function(t) {
                    t.wasHandled("dragdrop") || e.toggleSliderIsPlaying()
                },
                manageFocus: this.const(r.manageFocusHelper({
                    controller: this.controller,
                    location: {
                        type: "slider-icon",
                        id: this.model.id
                    }
                }))
            }, i.createElement(o.CircularIconView, {
                iconType: function() {
                    return e.getIconType()
                },
                whiteIcon: function() {
                    return !e.controller.isInEditListMode() && e.controller.isItemSelected(e.model.id) || e.controller.isItemBeingDragged(e.model.id)
                }
            }))), i.createElement("div", {
                class: i.const("dcg-slider-menu-container")
            }, i.createElement(s.Tooltip, {
                tooltip: function() {
                    return e.controller.s("graphing-calculator-label-animation-properties-tooltip")
                },
                gravity: this.const("e")
            }, i.createElement("div", {
                class: function() {
                    return {
                        "dcg-slider-menu-opener": !0,
                        "dcg-menu-open": e.myOptionsOpen()
                    }
                },
                tabindex: i.const(0),
                "model-id": function() {
                    return e.model.id
                },
                role: i.const("button"),
                "aria-label": function() {
                    return e.myOptionsOpen() ? e.controller.s("graphing-calculator-narration-hide-animation-properties") : e.controller.s("graphing-calculator-narration-show-animation-properties")
                },
                onTap: function(t) {
                    t.wasHandled("dragdrop") || t.wasLongheld() || e.toggleOptions(t)
                },
                manageFocus: this.const(r.manageFocusHelper({
                    controller: this.controller,
                    location: {
                        type: "slider-animation-properties-icon",
                        id: this.model.id
                    }
                }))
            }, i.createElement("i", {
                class: this.bindFn(this.getIcon)
            })))))
        }
        ,
        c.prototype.getIcon = function() {
            return a.getSliderIcon(this.model.slider.loopMode)
        }
        ,
        c.prototype.getIconType = function() {
            return this.model.slider.isPlaying ? l.isSliderAtEndOfPlayOnce(this.model) ? "play" : "pause" : "play"
        }
        ,
        c.prototype.myOptionsOpen = function() {
            var e = this.controller.getOpenItemMenu();
            return !!e && e.model === this.model
        }
        ,
        c.prototype.toggleOptions = function(e) {
            this.controller.dispatch({
                type: "toggle-item-settings-menu",
                menu: {
                    type: "slider",
                    model: this.model,
                    focusFirstOption: "keyboard" === e.device
                }
            })
        }
        ,
        c.prototype.getAriaLabel = function() {
            if (!this.model.sliderExists)
                return "";
            var e = l.getAssignment(this.model);
            return e ? this.model.slider.isPlaying ? this.controller.s("graphing-calculator-narration-pause-variable-animation", {
                variable: e
            }) : this.controller.s("graphing-calculator-narration-play-variable-animation", {
                variable: e
            }) : ""
        }
        ,
        c.prototype.toggleSliderIsPlaying = function() {
            if (this.model.sliderExists) {
                var e = ""
                  , t = l.getAssignment(this.model);
                l.isSliderAtEndOfPlayOnce(this.model) ? ("string" == typeof t && (e = this.controller.s("graphing-calculator-narration-slider-variable-restarted", {
                    variable: t
                })),
                this.controller.dispatch({
                    type: "play-slider-from-min",
                    id: this.model.id
                })) : this.model.slider.isPlaying ? ("string" == typeof t && (e = this.controller.s("graphing-calculator-narration-slider-variable-playing", {
                    variable: t
                })),
                this.controller.dispatch({
                    type: "set-slider-isplaying",
                    id: this.model.id,
                    isPlaying: !1
                })) : ("string" == typeof t && (e = this.controller.s("graphing-calculator-narration-slider-variable-paused", {
                    variable: t
                })),
                this.controller.dispatch({
                    type: "set-slider-isplaying",
                    id: this.model.id,
                    isPlaying: !0
                })),
                "" !== e && n.alert(e)
            }
        }
        ,
        c
    }(i.Class);
    e.PlayPauseIconView = c
});
