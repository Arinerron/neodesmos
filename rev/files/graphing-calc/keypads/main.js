define('graphing-calc/keypads/main', ["require", "exports", "tslib", "dcgview", "./dcgview-graphing", "./qwerty", "./qwerty-capital", "./numbers", "./letters", "./letters-capital", "./audio", "./functions-popover", "jquery", "underscore", "../../shared-components/tooltip", "loadcss!./graphing-keypad-container"], function(require, t, e, o, n, r, i, l, c, a, s, d, p, u, f) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var h = o.Components
      , y = h.SwitchUnion
      , g = h.If
      , m = function(t) {
        function n() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(n, t),
        n.prototype.template = function() {
            var t = this;
            return o.createElement("div", {
                class: o.const("dcg-keypad"),
                role: o.const("complementary"),
                "aria-label": o.const("Keypad")
            }, o.createElement("div", {
                class: o.const("dcg-keys-container"),
                style: this.bindFn(this.computeStyles),
                didMount: this.bindFn(this.didMountContainer),
                "aria-hidden": function() {
                    return !t.controller.isKeypadOpen()
                }
            }, o.createElement("div", {
                class: o.const("dcg-keys-background dcg-do-not-blur"),
                style: function() {
                    return {
                        background: t.controller.getPillboxBackgroundColor()
                    }
                }
            }, o.createElement("div", {
                class: o.const("dcg-keys")
            }, y(function() {
                return t.controller.getKeypadLayout()
            }, {
                letters: function() {
                    return o.createElement(r.default, {
                        controller: t.props.controller
                    })
                },
                capitalLetters: function() {
                    return o.createElement(i.default, {
                        controller: t.props.controller
                    })
                },
                mainNumbers: function() {
                    return o.createElement(l.default, {
                        controller: t.props.controller
                    })
                },
                noQwertyLetters: function() {
                    return o.createElement(c.default, {
                        controller: t.props.controller
                    })
                },
                noQwertyCapitalLetters: function() {
                    return o.createElement(a.default, {
                        controller: t.props.controller
                    })
                },
                audio: function() {
                    return o.createElement(s.default, {
                        controller: t.props.controller
                    })
                }
            }), o.createElement(g, {
                predicate: function() {
                    return t.controller.isKeypadFunctionsPopoverOpen()
                }
            }, function() {
                return o.createElement(d.default, {
                    controller: t.props.controller
                })
            })), o.createElement(g, {
                predicate: this.bindFn(this.isHideKeypadButtonVisible)
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-minimize-keypad-container")
                }, o.createElement(f.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-hide-keypad")
                    },
                    gravity: t.const("ne"),
                    offset: t.const({
                        left: 6
                    })
                }, o.createElement("div", {
                    role: o.const("button"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-hide-keypad")
                    },
                    class: o.const("dcg-minimize-keypad"),
                    style: function() {
                        return {
                            "border-bottom-color": t.controller.getPillboxBackgroundColor(),
                            background: t.controller.getPillboxBackgroundColor()
                        }
                    },
                    onTap: function() {
                        t.controller.dispatch({
                            type: "keypad/set-minimized",
                            minimized: !0
                        })
                    }
                }, o.createElement("i", {
                    class: o.const("dcg-icon-keyboard")
                }), o.createElement("i", {
                    class: o.const("dcg-icon-caret-down")
                }))))
            }))), o.createElement(g, {
                predicate: this.bindFn(this.isShowKeypadButtonVisible)
            }, function() {
                return o.createElement("div", {
                    class: o.const("dcg-show-keypad-container")
                }, o.createElement(f.Tooltip, {
                    tooltip: function() {
                        return t.controller.s("graphing-calculator-label-show-keypad")
                    },
                    gravity: t.const("ne")
                }, o.createElement("div", {
                    role: o.const("button"),
                    "aria-label": function() {
                        return t.controller.s("graphing-calculator-narration-show-keypad")
                    },
                    class: o.const("dcg-btn-flat-gray dcg-show-keypad dcg-do-not-blur"),
                    style: function() {
                        return {
                            background: t.controller.getPillboxBackgroundColor()
                        }
                    },
                    onTap: function() {
                        t.controller.dispatch({
                            type: "keypad/set-minimized",
                            minimized: !1
                        })
                    }
                }, o.createElement("i", {
                    class: o.const("dcg-icon-keyboard")
                }), o.createElement("i", {
                    class: o.const("dcg-icon-caret-up dcg-do-not-blur")
                }))))
            }))
        }
        ,
        n.prototype.didMountContainer = function(t) {
            this.containerElt = t
        }
        ,
        n.prototype.isShowKeypadButtonVisible = function() {
            return "none" === this.controller.getBrailleMode() && (!this.controller.isKeypadOpen() && !this.controller.isNarrow() && !this.controller.isInEditListMode() && (this.controller.isListVisible() || this.controller.inAudioTraceMode()))
        }
        ,
        n.prototype.isHideKeypadButtonVisible = function() {
            return "none" === this.controller.getBrailleMode() && this.controller.isKeypadOpen() && (!this.controller.isNarrow() || this.controller.inAudioTraceMode())
        }
        ,
        n.prototype.didMount = function() {
            this.updatePopoverPosition()
        }
        ,
        n.prototype.didUpdate = function() {
            this.updatePopoverPosition()
        }
        ,
        n.prototype.computeStyles = function() {
            var t = {};
            return this.controller.isNarrow() || (t.transition = "transform .3s, opacity .3s"),
            this.controller.isKeypadOpen() || (t.opacity = "0",
            t.transform = "translate3d(0, 255px, 0)"),
            t
        }
        ,
        n.prototype.updatePopoverPosition = function() {
            if (this.controller.isKeypadFunctionsPopoverOpen()) {
                var t = this.controller.computeMajorLayout()
                  , e = {
                    keypadTop: t.keypad.top,
                    keypadWidth: t.keypad.width,
                    keypadHeight: t.keypad.height,
                    showToLeft: t.grapher.height < 525
                };
                if (!u.isEqual(e, this.__popoverCache)) {
                    this.__popoverCache = e;
                    var o = p(this.containerElt)
                      , n = o.find("[dcg-command=functions]")
                      , r = o.find(".dcg-functions-popover")
                      , i = o.find(".dcg-arrow");
                    if (e.showToLeft) {
                        r.removeClass("dcg-top").addClass("dcg-left");
                        var l = e.keypadHeight - (n.offset().top - o.offset().top) - n.outerHeight() / 2 - 2 - 10;
                        i.css({
                            left: "auto",
                            bottom: l
                        })
                    } else
                        r.removeClass("dcg-left").addClass("dcg-top"),
                        i.css({
                            left: r.width() - n.width() / 2,
                            bottom: "auto"
                        })
                }
            } else
                this.__popoverCache = void 0
        }
        ,
        n
    }(n.default);
    t.default = m
});
