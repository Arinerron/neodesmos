
define('shared-components/tooltip', ["require", "exports", "tslib", "keys", "dcgview", "jquery", "underscore", "loadcss!./tooltip"], function(require, t, e, o, r, i, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }),
    t.Tooltip = void 0;
    var s = r.Components
      , p = s.IfElse
      , a = s.Switch
      , l = function(t) {
        function o() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(o, t),
        o.prototype.init = function() {
            this.latexKey = 0
        }
        ,
        o.prototype.template = function() {
            var t = this;
            return r.createElement("div", {
                class: function() {
                    var e;
                    return (e = {})[t.getCustomClassName()] = !0,
                    e["dcg-tooltip-positioning-container"] = !0,
                    e["dcg-latex-tooltip-positioning-container"] = !!t.props.renderAsLatex,
                    e["dcg-tooltip-gravity-ne-se"] = "ne" === t.props.gravity() || "se" === t.props.gravity(),
                    e["dcg-tooltip-gravity-nw-sw"] = "nw" === t.props.gravity() || "sw" === t.props.gravity(),
                    e["dcg-tooltip-gravity-n-s"] = "n" === t.props.gravity() || "s" === t.props.gravity(),
                    e["dcg-tooltip-gravity-e-w"] = "e" === t.props.gravity() || "w" === t.props.gravity(),
                    e
                },
                style: function() {
                    return {
                        top: t.props.hitAreaRect().top + (t.props.offset().top || 0) + "px",
                        left: t.props.hitAreaRect().left + (t.props.offset().left || 0) + "px",
                        width: t.props.hitAreaRect().width + "px",
                        height: t.props.hitAreaRect().height + "px"
                    }
                }
            }, r.createElement("div", {
                role: r.const("tooltip"),
                class: r.const("dcg-tooltip-message-container"),
                style: this.bindFn(this.getMessageStyle)
            }, p(function() {
                return !!t.props.renderAsLatex
            }, {
                true: function() {
                    return r.createElement("div", {
                        class: function() {
                            return {
                                "dcg-tooltip-message": !0,
                                "dcg-latex": !0,
                                "dcg-sticky-not-stuck": t.props.isStickyAndNotStuck(),
                                "dcg-tooltip-overflow": t.messageOverflows()
                            }
                        },
                        style: function() {
                            return {
                                "max-width": t.getMaxWidth() + "px"
                            }
                        },
                        didMount: function(e) {
                            t.tooltipMessage = e
                        }
                    }, r.createElement(a, {
                        key: function() {
                            return t.latexKey
                        }
                    }, function() {
                        return t.props.renderAsLatex().view(t.props.tooltip())
                    }))
                },
                false: function() {
                    return r.createElement("div", {
                        class: r.const("dcg-tooltip-message"),
                        style: function() {
                            return {
                                background: t.getBackgroundColor(),
                                cursor: t.props.isStickyAndNotStuck() ? "pointer" : "default"
                            }
                        }
                    }, t.props.tooltip)
                }
            })), r.createElement("div", {
                class: function() {
                    var e;
                    return (e = {
                        "dcg-tooltip-arrow": !0
                    })["dcg-tooltip-gravity-" + t.props.gravity()[0]] = !0,
                    e
                },
                style: function() {
                    return t.props.renderAsLatex ? t.getArrowWithBorderStyle() : t.getSolidArrowStyle()
                }
            }))
        }
        ,
        o.prototype.willUpdate = function() {
            this.latexKey++
        }
        ,
        o.prototype.getCustomClassName = function() {
            return this.props.class ? this.props.class() : ""
        }
        ,
        o.prototype.messageOverflows = function() {
            return this.tooltipMessage && this.tooltipMessage.getBoundingClientRect().width >= this.getMaxWidth()
        }
        ,
        o.prototype.getArrowWithBorderStyle = function() {
            var t = this.props.gravity()
              , o = "10px"
              , r = {
                width: "8px",
                height: "8px",
                border: "1px solid #bbb",
                background: this.getBackgroundColor(),
                opacity: this.props.isStickyAndNotStuck() ? ".95" : "1"
            };
            switch (t) {
            case "s":
                return e.__assign(e.__assign({}, r), {
                    top: "100%",
                    left: "50%",
                    "margin-top": "1px",
                    "border-right": "0",
                    "border-bottom": "0"
                });
            case "sw":
                return e.__assign(e.__assign({}, r), {
                    top: "100%",
                    right: o,
                    "margin-top": "1px",
                    "border-right": "0",
                    "border-bottom": "0"
                });
            case "se":
                return e.__assign(e.__assign({}, r), {
                    top: "100%",
                    left: o,
                    "margin-top": "1px",
                    "border-right": "0",
                    "border-bottom": "0"
                });
            case "n":
                return e.__assign(e.__assign({}, r), {
                    bottom: "100%",
                    left: "50%",
                    "margin-bottom": "1px",
                    "border-left": "0",
                    "border-top": "0"
                });
            case "nw":
                return e.__assign(e.__assign({}, r), {
                    bottom: "100%",
                    right: o,
                    "margin-bottom": "1px",
                    "border-left": "0",
                    "border-top": "0"
                });
            case "ne":
                return e.__assign(e.__assign({}, r), {
                    bottom: "100%",
                    left: o,
                    "margin-bottom": "1px",
                    "border-left": "0",
                    "border-top": "0"
                });
            case "e":
                return e.__assign(e.__assign({}, r), {
                    top: "50%",
                    left: "100%",
                    "margin-left": "1px",
                    "border-right": "0",
                    "border-top": "0"
                });
            case "w":
                return e.__assign(e.__assign({}, r), {
                    top: "50%",
                    right: "100%",
                    "margin-right": "1px",
                    "border-left": "0",
                    "border-bottom": "0"
                });
            default:
                return t
            }
        }
        ,
        o.prototype.getSolidArrowStyle = function() {
            var t = this.props.gravity()
              , e = this.props.hitAreaRect().width / 2 + "px"
              , o = this.getBackgroundColor()
              , r = "transparent transparent " + o + " transparent"
              , i = o + " transparent transparent transparent"
              , n = "transparent " + o + " transparent transparent"
              , s = "transparent transparent transparent " + o
              , p = "-5px";
            switch (t) {
            case "s":
                return {
                    top: "100%",
                    left: "50%",
                    border: "5px solid transparent",
                    "border-color": r,
                    "margin-top": p,
                    "margin-left": p
                };
            case "sw":
                return {
                    top: "100%",
                    right: e,
                    border: "5px solid transparent",
                    "border-color": r,
                    "margin-top": p,
                    "margin-right": p
                };
            case "se":
                return {
                    top: "100%",
                    left: e,
                    border: "5px solid transparent",
                    "border-color": r,
                    "margin-top": p,
                    "margin-left": p
                };
            case "n":
                return {
                    bottom: "100%",
                    left: "50%",
                    border: "5px solid transparent",
                    "border-color": i,
                    "margin-bottom": p,
                    "margin-left": p
                };
            case "nw":
                return {
                    bottom: "100%",
                    right: e,
                    border: "5px solid transparent",
                    "border-color": i,
                    "margin-bottom": p,
                    "margin-right": p
                };
            case "ne":
                return {
                    bottom: "100%",
                    left: e,
                    border: "5px solid transparent",
                    "border-color": i,
                    "margin-bottom": p,
                    "margin-left": p
                };
            case "e":
                return {
                    top: "50%",
                    left: "100%",
                    border: "5px solid transparent",
                    "border-color": n,
                    "margin-left": "-5px",
                    "margin-top": p
                };
            case "w":
                return {
                    top: "50%",
                    right: "100%",
                    border: "5px solid transparent",
                    "border-color": s,
                    "margin-right": p,
                    "margin-top": p
                };
            default:
                return t
            }
        }
        ,
        o.prototype.getBackgroundColor = function() {
            return this.props.renderAsLatex ? "#fff" : this.props.isStickyAndNotStuck() ? "#666" : "#000"
        }
        ,
        o.prototype.getMaxWidth = function() {
            var t = this.props.gravity()
              , e = this.props.hitAreaRect().left + (this.props.offset().left || 0)
              , o = e + this.props.hitAreaRect().width
              , r = .5 * this.props.hitAreaRect().width + e
              , i = window.innerWidth - 5;
            switch (t) {
            case "se":
            case "ne":
            case "e":
                return i - e;
            case "sw":
            case "nw":
            case "w":
                return o - 5;
            case "s":
            case "n":
                return 2 * Math.min(i - r, r - 5);
            default:
                return t
            }
        }
        ,
        o.prototype.getMessageStyle = function() {
            var t = this.props.hitAreaRect()
              , e = this.props.gravity()
              , o = this.props.maxWidth();
            switch (e) {
            case "s":
                return {
                    top: "100%",
                    width: o + "px",
                    transform: "translate(-50%, 0)",
                    left: .5 * t.width + "px",
                    "margin-top": "5px",
                    "text-align": "center"
                };
            case "sw":
                return {
                    top: "100%",
                    width: o + "px",
                    right: "0",
                    "margin-top": "5px",
                    "text-align": "right"
                };
            case "se":
                return {
                    top: "100%",
                    width: o + "px",
                    "margin-top": "5px",
                    "text-align": "left"
                };
            case "n":
                return {
                    bottom: "100%",
                    width: o + "px",
                    transform: "translate(-50%, 0)",
                    left: .5 * t.width + "px",
                    "margin-bottom": "5px",
                    "text-align": "center"
                };
            case "nw":
                return {
                    bottom: "100%",
                    right: "0",
                    width: o + "px",
                    "margin-bottom": "5px",
                    "text-align": "right"
                };
            case "ne":
                return {
                    bottom: "100%",
                    width: o + "px",
                    "margin-bottom": "5px",
                    "text-align": "left"
                };
            case "e":
                return {
                    transform: "translate(0, -50%)",
                    left: "100%",
                    width: o + "px",
                    top: .5 * t.height + "px",
                    "margin-left": "5px",
                    "text-align": "left"
                };
            case "w":
                return {
                    transform: "translate(0, -50%)",
                    right: "100%",
                    width: o + "px",
                    top: .5 * t.height + "px",
                    "margin-right": "5px",
                    "text-align": "right"
                };
            default:
                return e
            }
        }
        ,
        o
    }(r.Class);
    var c = function(t) {
        function s() {
            return null !== t && t.apply(this, arguments) || this
        }
        return e.__extends(s, t),
        s.prototype.init = function() {
            this.uuid = n.uniqueId()
        }
        ,
        s.prototype.template = function() {
            var t = this;
            return r.createElement("div", {
                class: r.const("dcg-tooltip-hit-area-container"),
                handleevent: r.const("true"),
                didMount: function(e) {
                    t.isMounted = !0,
                    t.hitAreaNode = e,
                    t.setupEventListeners(t.hitAreaNode)
                },
                onTap: function() {
                    if (t.shouldStickOnTargetClick())
                        if (t.isStuck)
                            t.clearTimeouts(),
                            t.hideTooltip();
                        else {
                            if (t.props.disabled && t.props.disabled())
                                return;
                            t.showTooltip(),
                            t.stickTooltip()
                        }
                    else if (t.shouldShowOnTapstart()) {
                        if (t.props.disabled && t.props.disabled())
                            return;
                        t.showTooltip(),
                        t.setUpHideOnExternalMousedown()
                    }
                }
            }, this.children)
        }
        ,
        s.prototype.shouldShowOnTapstart = function() {
            return this.props.showOnTapstart && this.props.showOnTapstart()
        }
        ,
        s.prototype.didUpdate = function() {
            this.updateTooltip()
        }
        ,
        s.prototype.updateTooltip = function() {
            if (this.wrapperRef)
                if (this.props.tooltip()) {
                    var t = this.hitAreaNode.getBoundingClientRect()
                      , e = this.wrapperRef.elt.getBoundingClientRect()
                      , o = this.wrapperRef
                      , r = o.originalTop
                      , i = o.originalLeft
                      , n = t.top - e.top
                      , s = t.left - e.left;
                    Math.abs(n - r) > 3 || Math.abs(s - i) > 3 ? this.hideTooltip() : this.wrapperRef.view.update()
                } else
                    this.hideTooltip()
        }
        ,
        s.prototype.handleShowEvent = function(t) {
            if (!this.props.disabled || !this.props.disabled()) {
                var e = this.props.delay ? this.props.delay() : 500;
                this.clearTimeouts(),
                this.showTooltipTimeout = setTimeout(t, e)
            }
        }
        ,
        s.prototype.handleHideEvent = function() {
            this.clearTimeouts(),
            this.hideTooltipTimeout = setTimeout(this.bindFn(this.hideTooltip), 150)
        }
        ,
        s.prototype.setupEventListeners = function(t) {
            var e = this;
            i(t).on("tipsyshow", function(o) {
                o.target === t && e.handleShowEvent(function() {
                    e.showTooltip()
                })
            }).on("tipsyhide", function(o) {
                o.target !== t || e.isStuck || e.handleHideEvent()
            })
        }
        ,
        s.prototype.willUnmount = function() {
            this.clearTimeouts(),
            this.isMounted = !1,
            this.hideTooltip()
        }
        ,
        s.prototype.setUpHideOnExternalMousedown = function() {
            var t = this;
            i(document).on("mousedown.dcg-tooltip-" + this.uuid + " touchstart.dcg-tooltip-" + this.uuid + " pointerdown.dcg-tooltip-" + this.uuid, function(e) {
                t.wrapperRef && (i(e.target).closest(t.hitAreaNode).length || i(e.target).closest(t.wrapperRef.elt).length || t.hideTooltip())
            })
        }
        ,
        s.prototype.stickTooltip = function() {
            this.isMounted && this.wrapperRef && (this.isStuck || (this.setUpHideOnExternalMousedown(),
            this.isStuck = !0,
            this.updateTooltip()))
        }
        ,
        s.prototype.clearTimeouts = function() {
            clearTimeout(this.showTooltipTimeout),
            clearTimeout(this.hideTooltipTimeout)
        }
        ,
        s.prototype.showTooltip = function() {
            var t = this;
            if (this.isMounted && !this.wrapperRef && this.props.tooltip()) {
                var e = this.hitAreaNode.getBoundingClientRect()
                  , n = document.createElement("div");
                n.className = "dcg-tooltip-mount-pt";
                var s = i(this.hitAreaNode).closest(".dcg-tap-container")[0]
                  , p = document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
                (!!p && i(this.hitAreaNode).closest(p).length > 0 && i(p).closest(".dcg-tap-container").length > 0 ? p : s).appendChild(n);
                var a = n.getBoundingClientRect()
                  , c = e.left - a.left
                  , d = e.top - a.top
                  , h = Math.min(200, this.props.maxParentWidthOverflow ? e.width + 2 * this.props.maxParentWidthOverflow() : 1 / 0)
                  , u = {
                    tooltip: this.props.tooltip,
                    class: this.props.class,
                    isStickyAndNotStuck: function() {
                        return t.shouldStickOnTargetClick() && !t.isStuck
                    },
                    offset: function() {
                        return t.props.offset ? t.props.offset() : {}
                    },
                    gravity: function() {
                        return t.props.gravity ? t.props.gravity() : "s"
                    },
                    renderAsLatex: this.props.renderAsLatex,
                    maxWidth: function() {
                        return h
                    },
                    hitAreaRect: function() {
                        return {
                            top: d || 0,
                            left: c || 0,
                            width: e.width || 0,
                            height: e.height || 0
                        }
                    }
                };
                this.setupEventListeners(n),
                i(n).on("dcg-tap", function() {
                    t.shouldStickOnTargetClick() && t.stickTooltip()
                });
                var g = r.mountToNode(l, n, u);
                i(document).on("keydown.dcg-tooltip-" + this.uuid, function(e) {
                    o.lookup(e) === o.ESCAPE && t.hideTooltip()
                });
                var f = function() {
                    return t.updateTooltip()
                };
                window.addEventListener("scroll", f, !0),
                this.wrapperRef = {
                    elt: n,
                    view: g,
                    originalLeft: c,
                    originalTop: d,
                    onScroll: f
                }
            }
        }
        ,
        s.prototype.hideTooltip = function() {
            this.clearTimeouts(),
            this.wrapperRef && (this.isStuck = !1,
            i(document).off(".dcg-tooltip-" + this.uuid),
            window.removeEventListener("scroll", this.wrapperRef.onScroll, !0),
            r.unmountFromNode(this.wrapperRef.elt),
            this.wrapperRef.elt.parentNode && this.wrapperRef.elt.parentNode.removeChild(this.wrapperRef.elt),
            this.wrapperRef = void 0)
        }
        ,
        s.prototype.shouldStickOnTargetClick = function() {
            return !!this.props.sticky && this.props.sticky()
        }
        ,
        s
    }(r.Class);
    t.Tooltip = c
});
