define('expressions/circular-icon-view', ["require", "exports", "lib/color-distance", "tslib", "dcgview", "./expression-menus/color-swatch", "loadcss!./circular-icon-view"], function(require, e, o, n, r, i) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.CircularIconView = void 0;
    var c = r.Components.If
      , t = function(e) {
        function o() {
            return null !== e && e.apply(this, arguments) || this
        }
        return n.__extends(o, e),
        o.prototype.template = function() {
            var e = this;
            return r.createElement("span", {
                class: function() {
                    var o;
                    return (o = {
                        "dcg-do-not-blur": !0,
                        "dcg-circular-icon": !0,
                        "dcg-thick-outline": e.isThickOutline(),
                        "dcg-white-icon": !!e.props.whiteIcon && e.props.whiteIcon(),
                        "dcg-hidden": e.isHidden(),
                        "dcg-semi-transparent": e.props.semiTransparent && e.props.semiTransparent(),
                        "dcg-colored-icon": e.isColoredIcon(),
                        "dcg-has-background-image": e.hasBackgroundImage()
                    })[e.iconModifier()] = e.iconModifier().length > 0,
                    o
                },
                style: function() {
                    return {
                        background: Array.isArray(e.getBackgroundColor()) ? void 0 : e.getBackgroundColor()
                    }
                }
            }, r.createElement(c, {
                predicate: function() {
                    return Array.isArray(e.getBackgroundColor())
                }
            }, function() {
                return r.createElement(i.ColorSwatch, {
                    color: function() {
                        return e.getBackgroundColor()
                    }
                })
            }), r.createElement(c, {
                predicate: this.bindFn(this.hasBackgroundImage)
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-background-image"),
                    style: function() {
                        return {
                            "background-image": e.props.backgroundImage && e.props.backgroundImage(),
                            opacity: e.props.backgroundOpacity && e.props.backgroundOpacity()
                        }
                    }
                })
            }), r.createElement(c, {
                predicate: function() {
                    return !!e.backgroundIcon()
                }
            }, function() {
                return r.createElement("i", {
                    class: function() {
                        var o;
                        return (o = {})[e.backgroundIcon()] = !0,
                        o["dcg-layered-icon"] = !0,
                        o
                    },
                    style: function() {
                        return {
                            opacity: e.backgroundOpacity()
                        }
                    }
                })
            }), r.createElement(c, {
                predicate: function() {
                    return !!e.primaryIcon()
                }
            }, function() {
                return r.createElement("i", {
                    class: function() {
                        var o;
                        return (o = {})[e.primaryIcon()] = !0,
                        o["dcg-layered-icon"] = !0,
                        o
                    },
                    style: function() {
                        return {
                            color: e.props.foregroundColor && e.props.foregroundColor()
                        }
                    }
                })
            }), r.createElement(c, {
                predicate: function() {
                    return "loading" === e.props.iconType()
                }
            }, function() {
                return r.createElement("span", {
                    class: r.const("dcg-spinner")
                })
            }))
        }
        ,
        o.prototype.isColoredIcon = function() {
            return !this.isThickOutline() && !this.isHidden() && !this.hasBackgroundImage() && "loading" !== this.props.iconType()
        }
        ,
        o.prototype.iconModifier = function() {
            if (!this.props.iconModifier)
                return "";
            switch (this.props.iconModifier()) {
            case "medium":
                return "dcg-modifier-size-medium";
            case "large":
                return "dcg-modifier-size-large";
            case "small":
                return "dcg-modifier-size-small";
            case "rotated":
                return "dcg-modifier-rotated";
            case "none":
                return ""
            }
        }
        ,
        o.prototype.getBackgroundColor = function() {
            if (!this.isHidden() && this.props.backgroundColor)
                return this.props.backgroundColor()
        }
        ,
        o.prototype.isHidden = function() {
            return "hidden" === this.props.iconType()
        }
        ,
        o.prototype.isThickOutline = function() {
            var e = this.props.iconType();
            return "folder" === e || "pause" === e || "play" === e || "fraction" === e || "action" === e || "metronome" === e
        }
        ,
        o.prototype.hasBackgroundImage = function() {
            return !!this.props.backgroundImage && !this.isHidden() && !!this.props.backgroundImage()
        }
        ,
        o.prototype.primaryIcon = function() {
            var e = this.props.iconType();
            switch (e) {
            case "folder":
                return "dcg-icon-folder";
            case "pause":
                return "dcg-icon-pause";
            case "play":
                return "dcg-icon-play";
            case "polygon-dashed":
            case "polygon-dashed-filled":
                return "dcg-icon-polygon-dashed";
            case "polygon-dotted":
            case "polygon-dotted-filled":
                return "dcg-icon-polygon-dotted";
            case "polygon-default":
            case "polygon-default-filled":
                return "dcg-icon-polygon-solid";
            case "graph-dashed":
            case "parametric-dashed-filled":
                return "dcg-icon-parametric-dashed";
            case "graph-dotted":
            case "parametric-dotted-filled":
                return "dcg-icon-parametric-dotted";
            case "graph-default":
            case "parametric-default-filled":
                return "dcg-icon-parametric-solid";
            case "movable-vertical":
                return "dcg-icon-move-vertical";
            case "movable-both":
                return "dcg-icon-move";
            case "movable-horizontal":
                return "dcg-icon-move-horizontal";
            case "point-open":
                return "dcg-icon-open";
            case "point-cross":
                return "dcg-icon-cross";
            case "point-default":
                return "dcg-icon-point";
            case "table-points":
            case "table-points-and-lines":
                return "dcg-icon-points";
            case "table-lines":
                return "dcg-icon-lines-solid";
            case "shaded-inequality":
            case "inequality":
                return "dcg-icon-shaded-inequality-dash";
            case "check":
                return "dcg-icon-check";
            case "none":
            case "background":
            case "hidden":
            case "polygon-none-filled":
            case "parametric-none-filled":
            case "loading":
                return "";
            case "fraction":
                return "dcg-icon-fraction";
            case "boxplot":
                return "dcg-icon-boxplot";
            case "dotplot-cross":
                return "dcg-icon-dotplot-cross";
            case "dotplot-default":
                return "dcg-icon-dotplot-default";
            case "dotplot-open":
                return "dcg-icon-dotplot-open";
            case "histogram":
                return "dcg-icon-histogram";
            case "unfilled-distribution":
            case "filled-distribution":
                return "dcg-icon-distribution";
            case "action":
                return "dcg-icon-chevron-right";
            case "metronome":
                return "dcg-icon-metronome-2";
            default:
                return e
            }
        }
        ,
        o.prototype.backgroundOpacity = function() {
            var e = this.backgroundIcon();
            return "dcg-icon-polygon-filled" === e || "dcg-icon-parametric-filled" === e || "dcg-icon-shaded-inequality-shade2" === e || "dcg-icon-distribution-fill" === e || "dcg-icon-histogram-fill" === e ? .5 : 1
        }
        ,
        o.prototype.backgroundIcon = function() {
            var e = this.props.iconType();
            return "filled-distribution" === e ? "dcg-icon-distribution-fill" : "histogram" === e ? "dcg-icon-histogram-fill" : "polygon-dashed-filled" === e || "polygon-dotted-filled" === e || "polygon-default-filled" === e || "polygon-none-filled" === e ? "dcg-icon-polygon-filled" : "parametric-dashed-filled" === e || "parametric-dotted-filled" === e || "parametric-default-filled" === e || "parametric-none-filled" === e ? "dcg-icon-parametric-filled" : "table-points-and-lines" === e ? "dcg-icon-lines-solid" : "shaded-inequality" === e ? "dcg-icon-shaded-inequality-shade2" : "action" === e ? "dcg-icon-minus" : ""
        }
        ,
        o
    }(r.Class);
    e.CircularIconView = t
});