
define('graphing-calc/keypads/audio', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "keypad/keys", "keypad/keypad", "keypad/btn", "../../shared-components/tooltip", "graphing/audiograph", "shared/dcgviews/localize", "loadcss!./audio"], function(require, e, t, n, o, a, c, i, r, s, l) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var d = n.Components
      , u = d.If
      , p = d.IfElse
      , g = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return t.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return n.createElement(c.default, {
                controller: this.props.controller
            }, n.createElement("div", {
                class: n.const("dcg-audio-keypad-container")
            }, n.createElement("div", {
                class: n.const("dcg-audio-keypad-column dcg-playback-column")
            }, p(function() {
                return e.controller.isAudioTracing()
            }, {
                true: function() {
                    return n.createElement(i.default, {
                        command: n.const("stop-graph"),
                        colspan: e.const(1),
                        style: e.const("blue"),
                        onTap: function() {
                            e.dispatch({
                                type: "keypad/audio-trace",
                                command: "stop-graph"
                            })
                        }
                    }, n.createElement("span", {
                        class: n.const("dcg-stop-icon-container")
                    }, n.createElement("span", {
                        class: n.const("dcg-stop-icon")
                    })), n.createElement("span", null, function() {
                        return e.controller.s("graphing-calculator-button-audio-trace-stop-graph")
                    }))
                },
                false: function() {
                    return n.createElement(i.default, {
                        command: n.const("hear-graph"),
                        colspan: e.const(1),
                        style: e.const("blue"),
                        onTap: function() {
                            e.dispatch({
                                type: "keypad/audio-trace",
                                command: "hear-graph"
                            })
                        }
                    }, n.createElement("span", {
                        class: n.const("dcg-play-icon-container")
                    }, n.createElement("i", {
                        class: n.const("dcg-icon-play")
                    })), n.createElement("span", null, function() {
                        return e.controller.s("graphing-calculator-button-audio-trace-hear-graph")
                    }))
                }
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section")
            }, a.view(this, "volume-down", {
                disabled: this.bindFn(this.isVolumeDownDisabled)
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section-title-container"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, n.createElement("span", {
                class: n.const("dcg-key-nav-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-label-audio-trace-volume")
            }), n.createElement("span", {
                class: n.const("dcg-keypad-volume-value dcg-key-nav-section-value")
            }, function() {
                return e.getAudioTraceVolume()
            })), a.view(this, "volume-up", {
                disabled: this.bindFn(this.isVolumeUpDisabled)
            })), n.createElement("div", {
                class: n.const("dcg-key-nav-section")
            }, a.view(this, "speed-down", {
                disabled: this.bindFn(this.isSpeedDownDisabled)
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section-title-container"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, n.createElement("span", {
                class: n.const("dcg-key-nav-section-title")
            }, function() {
                return e.controller.s("graphing-calculator-label-audio-trace-speed")
            }), n.createElement("span", {
                class: n.const("dcg-keypad-speed-value dcg-key-nav-section-value")
            }, function() {
                return e.getAudioTraceSpeed()
            })), a.view(this, "speed-up", {
                disabled: this.bindFn(this.isSpeedUpDisabled)
            })), a.view(this, "audio-trace-off", {
                style: "highlight"
            })), n.createElement("div", {
                class: n.const("dcg-audio-keypad-spacer")
            }), n.createElement("div", {
                class: n.const("dcg-audio-keypad-column dcg-navigation-column")
            }, n.createElement("span", {
                class: n.const("dcg-key-section-title dcg-center-col"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, function() {
                return e.controller.s("graphing-calculator-heading-audio-trace-navigation")
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section dcg-center-col")
            }, a.view(this, "previous-point", {
                disabled: this.bindFn(this.isPrevPointDisabled)
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section-title-container"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, function() {
                return e.controller.s("graphing-calculator-label-audio-trace-point")
            }), a.view(this, "next-point", {
                disabled: this.bindFn(this.isNextPointDisabled)
            })), n.createElement("div", {
                class: n.const("dcg-key-nav-section")
            }, a.view(this, "previous-poi", {
                disabled: this.bindFn(this.isPrevPOIDisabled)
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section-title-container dcg-poi-section-container"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, n.createElement(l.Localize, {
                i18n: this.const(this.controller),
                key: this.const("graphing-calculator-heading-keypad-audio-trace-point-of-interest")
            }, n.createElement("span", {
                class: n.const("dcg-key-nav-section-value")
            }, n.const("Point")), n.createElement("span", {
                class: n.const("dcg-key-nav-section-title")
            }, n.const("of Interest")))), a.view(this, "next-poi", {
                disabled: this.bindFn(this.isNextPOIDisabled)
            })), n.createElement("div", {
                class: n.const("dcg-key-nav-section dcg-center-col")
            }, a.view(this, "previous-curve", {
                disabled: this.bindFn(this.isPrevCurveDisabled)
            }), n.createElement("div", {
                class: n.const("dcg-key-nav-section-title-container"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, function() {
                return e.controller.s("graphing-calculator-label-audio-trace-curve")
            }), a.view(this, "next-curve", {
                disabled: this.bindFn(this.isNextCurveDisabled)
            }))), n.createElement("div", {
                class: n.const("dcg-audio-keypad-spacer")
            }), n.createElement("div", {
                class: n.const("dcg-audio-keypad-column dcg-screenreader-options")
            }, n.createElement("span", {
                class: n.const("dcg-key-section-title"),
                role: n.const("heading"),
                "aria-level": n.const("2")
            }, function() {
                return e.layoutWidth() <= 460 ? e.controller.s("graphing-calculator-heading-audio-trace-describe") : e.controller.s("graphing-calculator-heading-audio-trace-screen-reader")
            }, n.createElement(r.Tooltip, {
                tooltip: function() {
                    return e.controller.s("graphing-calculator-label-audio-trace-need-screen-reader")
                },
                gravity: this.const("s"),
                sticky: this.const(!0)
            }, n.createElement("i", {
                class: n.const("dcg-icon-question-sign")
            }))), n.createElement(i.default, {
                command: n.const("describe-point"),
                colspan: this.const(1),
                style: this.const("default"),
                onTap: function() {
                    e.dispatch({
                        type: "keypad/audio-trace",
                        command: "describe-point"
                    })
                }
            }, n.createElement("span", null, function() {
                return e.layoutWidth() <= 460 ? e.controller.s("graphing-calculator-button-audio-trace-describe-point-short") : e.controller.s("graphing-calculator-button-audio-trace-describe-point")
            })), n.createElement(i.default, {
                command: n.const("describe-curve"),
                colspan: this.const(1),
                style: this.const("default"),
                onTap: function() {
                    e.dispatch({
                        type: "keypad/audio-trace",
                        command: "describe-curve"
                    })
                }
            }, n.createElement("span", null, function() {
                return e.layoutWidth() <= 460 ? e.controller.s("graphing-calculator-button-audio-trace-describe-curve-short") : e.controller.s("graphing-calculator-button-audio-trace-describe-curve")
            })), n.createElement(u, {
                predicate: function() {
                    return e.controller.getCanShowKeyboardShortcuts()
                }
            }, function() {
                return n.createElement("div", {
                    class: n.const("dcg-keypad-btn-container dcg-keypad-link")
                }, n.createElement("a", {
                    class: n.const("dcg-shared-dark-gray-link"),
                    role: n.const("link"),
                    "dcg-command": n.const("keyboard-shortcuts"),
                    onTap: function() {
                        e.dispatch({
                            type: "keypad/audio-trace",
                            command: "keyboard-shortcuts"
                        })
                    }
                }, n.createElement("i", {
                    class: n.const("dcg-icon-keyboard")
                }), n.createElement("span", null, function() {
                    return e.layoutWidth() <= 700 ? e.controller.s("graphing-calculator-link-audio-trace-shortcuts") : e.controller.s("graphing-calculator-link-audio-trace-keyboard-shortcuts")
                })))
            }))))
        }
        ,
        o.prototype.layoutWidth = function() {
            return this.controller.getLayoutMeasurements().width
        }
        ,
        o.prototype.isPrevPointDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToPrevPoint()
        }
        ,
        o.prototype.isNextPointDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToNextPoint()
        }
        ,
        o.prototype.isPrevPOIDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToPrevPOI()
        }
        ,
        o.prototype.isNextPOIDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToNextPOI()
        }
        ,
        o.prototype.isPrevCurveDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToPrevCurve()
        }
        ,
        o.prototype.isNextCurveDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || !e.agNavigator.canMoveToNextCurve()
        }
        ,
        o.prototype.getAudioTraceVolume = function() {
            var e = this.controller.getAudioGraph();
            return e ? 100 * e.tonegen.getAudioVolume() + "%" : ""
        }
        ,
        o.prototype.isVolumeDownDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || e.tonegen.getAudioVolume() <= 0
        }
        ,
        o.prototype.isVolumeUpDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || e.tonegen.getAudioVolume() >= 1
        }
        ,
        o.prototype.getAudioTraceSpeed = function() {
            var e = this.controller.getAudioGraph();
            return e ? s.audioSpeedOptions[e.getAudioSpeedIndex()].displayedSpeed : ""
        }
        ,
        o.prototype.isSpeedDownDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || e.getAudioSpeedIndex() <= 0
        }
        ,
        o.prototype.isSpeedUpDisabled = function() {
            var e = this.controller.getAudioGraph();
            return !e || e.getAudioSpeedIndex() === s.audioSpeedOptions.length - 1
        }
        ,
        o
    }(o.default);
    e.default = g
});
